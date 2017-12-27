var serverData = {
    rawData : {video:[], ppt:[], docs:[]},
    fetchAllData : function (cb){
        console.log('Fetch all data');
        this.cb = cb;
        var data = "Demo";
        this.requestData("https://api.congrea.net/t/GetDocumentURLs", data);
    },

    requestData :function(url, data, success) {
        var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');

        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open('POST', url);
        var that = this;
        xhr.onreadystatechange = function() {
            if (xhr.readyState > 3 && xhr.status == 200) {
                // console.log(xhr.responseText);
                that.formatRawData(xhr.responseText);
                if(typeof that.cb != 'undefined'){
                    // virtualclass.videoUl.UI.awsVideoList();
                    that.cb();
                }
            }
        };

        xhr.setRequestHeader('x-api-key', 'yJaR3lEhER3470dI88CMD5s0eCUJRINc2lcjKCu2');
        xhr.setRequestHeader('x-congrea-authuser', '46ecba46bc1598c1ec4c');
        xhr.setRequestHeader('x-congrea-authpass', '2bf8d3535fdff8a74c01');
        xhr.setRequestHeader('x-congrea-room', '12323');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(params);
        return xhr;
    },


    /* To move this function */
    formatRawData:function(raw){
        var awsData= JSON.parse(raw);
        this.awsUrlArr(awsData);
    },

    //nirmala aws
    awsUrlArr:function(data){
        var processedArr =[];
        var arr = data.Items;
        var newArr=[];
        var prefix = "https://media.congrea.net/";
        var doc="https://media.congrea.net";
        var  imageUrl,pdfUrl,thnailUrl;

        for(var j =0; j<arr.length; j++) {
            switch(arr[j].filetype.S) {
                case "doc":
                    var obj=this.processObj(arr[j]);
                    // obj.urls={};
                    // obj.urls.image={};
                    // obj.urls.pdf={};
                    // obj.urls.thumbnail={};

                    var docPrefix = doc +"/" +arr[j].processed_data.M.commonpath.S;
                    var count = parseInt(arr[j].processed_data.M.count.N);
                    var prefix, num, noteId;
                    var notes = {};
                    obj.notes = {}
                    obj.notesarr = [];
                    var deletedNotes = [];
                    var disabledNotes = [];
                    if(obj.hasOwnProperty('deletednes')){
                        deletedNotes = obj.deletednes;
                    }

                    if(obj.hasOwnProperty('disablednes')){
                        disabledNotes = obj.disablednes;
                    }


                    for(var i =1 ; i<= count; i++){
                        num =pad(i,3);
                        imageUrl = docPrefix +"/image/"+num+"."+arr[j].processed_data.M.image.M.type.S;
                        pdfUrl = docPrefix +"/pdf/"+num+".pdf";
                        thnailUrl = docPrefix +"/thumbnail/"+num+"."+arr[j].processed_data.M.thumbnail.M.type.S;

                        if(i > 99 ){
                            noteId = obj.fileuuid + '_'+ i;
                        }else if(i > 9){
                            noteId = obj.fileuuid+'_0' + i
                        }else {
                            noteId = obj.fileuuid+'_00' + i;
                        }
                        var tobj = {};
                        if(deletedNotes.length > 0){
                            if(deletedNotes.indexOf(i) > -1){
                                tobj.deletedn = noteId;
                            }
                        }
                        tobj.id = noteId;
                        tobj.pdf = pdfUrl;
                        tobj.image = imageUrl;
                        tobj.thumbnail = thnailUrl;

                        // if(obj.fileuuid == "1b34ab80-3db3-4f86-8a98-b4cd3d024aa1"){
                        //     debugger;
                        // }

                        if(disabledNotes.length > 0){
                            if(disabledNotes.indexOf(i) > -1){
                                tobj.status = 0;
                            }else {
                                tobj.status = 1;
                            }
                        }else {
                            tobj.status = 1;
                        }
                        obj.notes[noteId] = tobj;
                        obj.notesarr.push(tobj);
                    }

                    processedArr.push(obj);
                    this.rawData.docs.push(obj);
                    break;

                case  'video':
                    var obj=this.processObj(arr[j]);
                    var add  = obj.filepath.substr(0,obj.filepath.lastIndexOf("/"));
                    obj.urls={};
                    obj.urls.thumbnail={};
                    obj.urls.videos={};
                    obj.urls.main_video =prefix+ add+"/video/play_video.m3u8";
                    obj.urls.videos["0400k"]=prefix+add+"/video/0400k/video.m3u8";
                    obj.urls.videos["0600k"]=prefix+add+"/video/0600k/video.m3u8";
                    obj.urls.videos["1000k"]=prefix+add+"/video/1000k/video.m3u8";
                    obj.urls.videos["1500k"]=prefix+add+"/video/1500k/video.m3u8";
                    obj.urls.videos["2000k"]=prefix+add+"/video/2000k/video.m3u8";


                    obj.urls.thumbnail["0400k"]=prefix+add+"/video/0400k/thumbs/00001.png";
                    obj.urls.thumbnail["0600k"]=prefix+add+"/video/0600k/thumbs/00001.png";
                    obj.urls.thumbnail["1000k"]=prefix+add+"/video/1000k/thumbs/00001.png";
                    obj.urls.thumbnail["1500k"]=prefix+add+"/video/1500k/thumbs/00001.png";
                    obj.urls.thumbnail["2000k"]=prefix+add+"/video/2000k/thumbs/00001.png";
                    processedArr.push(obj);
                    break;

                case 'video_yts':
                    console.log('Handle youtube');
                    var obj = this.processVidUrlObj(arr[j]);
                    obj.urls={};
                    obj.urls.main_video = obj.URL;
                    processedArr.push(obj);
                    break;
            }
        }

        virtualclass.awsData = processedArr;

        //console.log(virtualclass.awsData);
        function pad(n, length) {
            var len = length - (''+n).length;
            return (len > 0 ? new Array(++len).join('0') : '') + n
        }

    },

    //nirmala aws
    processObj:function(obj){
        var temp = {};
        // temp.filetag= obj.fileetag.S;
        temp.filename= obj.filename.S;
        temp.filepath= obj.filepath.S;
        temp.filetype= obj.filetype.S;
        temp.fileuuid = obj.fileuuid.S;
        temp. key_room= obj.key_room.S;
        temp.fileuuid = obj.fileuuid.S;

        if(obj.hasOwnProperty('deleted')){
            if(obj.deleted.NS[0] == '0'){
                temp.deleted = obj.deleted.NS[0];
            }else {
                temp.deletednes = obj.deleted.NS;
            }
        }

        if(obj.hasOwnProperty('disabled')){
            if(obj.disabled.NS[0] == '0'){
                temp.disabled = obj.disabled.NS[0];
            }else {
                temp.disablednes = obj.disabled.NS;
            }
        }
        return temp;
    },

    processVidUrlObj:function(obj){
        var temp = {};
        // temp.filetag= obj.fileetag.S;
        temp.URL= obj.URL.S;
        temp.filename= temp.URL;
        temp.filetype= obj.filetype.S;
        temp.fileuuid = obj.fileuuid.S;
        temp. key_room= obj.key_room.S;
        temp.fileuuid = obj.fileuuid.S;
        if(obj.hasOwnProperty('deleted')){
            temp.deleted = obj.deleted.NS[0];
        }
        if(obj.hasOwnProperty('disabled')){
            temp.disabled = obj.disabled.NS[0];
        }
        return temp;
    },

    pollingStatus : function (cb){
        var url = 'https://api.congrea.net/t/GetDocumentStatus';

        if(virtualclass.gObj.hasOwnProperty('pollingDocumentStatus')){
            clearTimeout(virtualclass.gObj.pollingDocumentStatus);
        }
        var that = this;
        virtualclass.gObj.pollingDocumentStatus = setTimeout(
            function (){
                virtualclass.xhrn.sendData({uuid : virtualclass.gObj.file.uuid}, url, function (response) {
                    var responseObj = JSON.parse(response).Item;
                    if(responseObj.hasOwnProperty('processed_data') &&
                        (responseObj.processed_data.hasOwnProperty('S') && (responseObj.processed_data.S == 'COMPLETED') ||
                        (responseObj.processed_data.hasOwnProperty('M') && responseObj.processed_data.M.hasOwnProperty('pdf')))){
                        clearTimeout(virtualclass.gObj.pollingDocumentStatus);
                        virtualclass.serverData.fetchAllData(cb);
                    } else {
                        that.pollingStatus(cb);
                    }
                });
            }, 5000
        );
    }
}