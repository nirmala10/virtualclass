(function (window) {
    /**
     * {virtualclass1} {virtualclass2} are elements you passes with getString function eg:-
     *   virtualclass.lang.getString('operaBrowserIssue', ['opeara', 27]);
     *   opera and 27 will be replaced over the {virtualclass1} and {virtualclass2} resepectively for particular line of language file.
     * @type type
     */
    var message = {
        //'notSupportCanvas': 'This browser does not support <a href="http://en.wikipedia.org/wiki/Canvas_element/">Canvas</a>. Please update your browser with the latest version',
        //'notSupportGetUserMedia': 'The browser does not support <a href="http://dev.w3.org/2011/webrtc/editor/getusermedia.html">getUserMedia</a> for <a href="http://www.webrtc.org/">WebRtc</a>. Please update your browser with the latest version',
        //'notSupportPeerConnect': 'The browser is unable to create a Peer Connection object for <a href="http://www.webrtc.org/">WebRtc</a>. Please update your browser with the latest version.',
        //'notSupportWebSocket': 'This browser does not support <a href="http://www.websocket.org/">WebSocket</a>. Please update your browser with the latest version. ',
        //'notSupportWebRtc': 'This browser does not support <a href="http://www.webrtc.org/">WebRtc</a>. Please update your browser with the latest version.',
        // 'line': 'Line',
        // 'rectangle': 'Rectangle',
        // 'triangle': 'Triangle',
        // 'oval': 'Oval',
        'assign': 'Assign',
        'reclaim': 'Reclaim',
        // 'freeDrawing': 'Free hand',
        // 'text': 'Text',
        // 'replay': 'Replay',
        // 'activeAll': 'Active all',
        // 'clearAll': 'Clear all',
        'drawArea': 'Draw area',
        //'totRcvdPackets' : 'Total Packets Received',
        //'perSecRcvdData' : 'Packet Received Per Second',
        //'totSentPackets': 'Total Packets Sent',
        //'perSecSentPacket': 'Packets Sent Per Second ',
        //'perSecond': 'Per Second',
        'sentPackets': 'Sent <br/><span>Packets</span>',
        'receviedPackets': 'Received <br/><span>Packets</span>',
        'total': 'Total',
        //'dataDetails': 'Data Details',
        //'sentMessageInfo': 'Sent Message <br/><span>Information</span>',
       // 'receivedMessageInfo': 'Received Message <br/><span>Information</span>',
        'wbrtcMsgFireFox': 'You can click on  "Share Selected Devices"' + ' to share your mic and camera feed with other users',
        'wbrtcMsgChrome': 'You can click the deny button for not sharing your microphone and camera  with Congrea.' +  'or click allow button to share them.',
        'canvasDrawMsg': 'You can click on any tool for drawing' + 'click and hold the left mouse button to draw',
        'clearAllWarnMessage': 'Do you really want to clear this whiteboard?',
        'cof': 'connection off',
        //'askForConnect': 'This action can be performed only after another user connects',
        'msgForReload': "Please reload this page to continue editing.",
        'msgStudentForReload': "Please reload this page.",
        'reload': "Reload",
        // 'whiteboard': 'Whiteboard',
        // 'screenshare': 'Screen Share',
        'sessionend': "Close session.",
        'audioTest': "Your voice will be recorded and played back to you. \n Press Ok and speak something for few seconds.",
        'chatEnable': "Disable chat",
        //'chatDisable': "Enable Chat",
        'chatOn' : "Enable chat",
        // 'assignEnable': "Transfer Controls",
        'assignDisable': "Reclaim controls",

        // 'editorRichDisable': "Write Mode",
        // 'editorRichEnable': "Read Only",

        //'editorCodeDisable': "Write Mode",
        //'editorCodeEnable': "Read Only",

        //'audioEnable': "Mute",
        //'audioDisable': "Unmute",
        //'audioOff': "Mute",
        'audioOn': "Mute",
        'audioOff': "Unmute",
        'minCommonChat': "Hide chat window",
        'maxCommonChat': "Show chat window",
        //'miniuserbox': "Hide User Box",
        //'maxuserbox': "Show User Box",
       // 'miniUserList': "Hide User List",
        //'maxUserList': "Show User List",
        'startnewsession': "This session has not been saved, do you really want to end this session?",
        'DevicesNotFoundError': "Please check your Webcam (camera/microphone) connection.",
        'dap' : 'false',
        'PermissionDeniedError': "Webcam access has been denied.",
        'PERMISSION_DENIED': "You denied access to your Webcam(camera/microphone).",
        'notSupportBrowser': "Firefox {virtualclass1} does not support Screen sharing.",
        //'disableSpeaker': "Mute",
        //'enableSpeaker': "Unmute",
        //'notSupportChrome': 'Please update your browser {virtualclass1} {virtualclass2} to Google Chrome 40 or above',
       // 'errcanvas': 'canvas',
        //'errwebSocket': 'Web Socket',
        //'errgetusermedia': 'getUserMedia',
        //'errindexeddb': 'indexedDb',
        //'errwebworker': 'Web worker',
        //'errwebaudio': 'Web audio',
        //'errtypedarray': 'Typed array',
       // 'errscreenshare': 'Screen share',
        'operaBrowserIssue': 'Your browser {virtualclass1} {virtualclass2} is partially supported. You will not be able to share your screen, Congrea fully support chrome and Firefox',
        'commonBrowserIssue': 'Your browser {virtualclass1} {virtualclass2} is not supported, Congrea support Chrome and Firefox.',
        'chFireBrowsersIssue': 'Your browser {virtualclass1} {virtualclass2} needs updation, Congrea support Chrome 40+ and Firefox 35+.',
        'studentSafariBrowserIssue': 'Your browser {virtualclass1} {virtualclass2} cannot  share your webcam with other users, Congrea fully support Chrome  and Firefox.',
        'ieBrowserIssue': 'Internet Explorer is not supported, Congrea fully support Chrome  and Firefox.',
        'ios7support': "For Apple, Virtual Class supports iOS 8 and higher versions.",
        'supportDesktop': "Virtual Class does not support tablets or mobiles. To present please use a desktop.",
        'notSupportIphone': "Sorry. Virtual Class doesn't support mobile phones.",
        'InternalError': "Please ensure that same webcam is not being used <br /> in multiple browsers or multiple applications. ",
        'SourceUnavailableError': 'Please ensure that same webcam is not being used in multiple browsers or multiple applications.',
        'teacherSafariBrowserIssue': 'Safari does not support presenter functionality. Please switch to Chrome or Firefox.',
        'safariBrowserIssue': 'Your browser Safari {virtualclass1} is not supported, We fully support Chrome  and Firefox',
        'savesession': 'Do you want to save current Session?',
        'savesessionTechSupport' : "Do you want to save current Session? <br /> Once you download the session, Updates won't be available on re-downloading of same session.",
        'plswaitwhile': 'Please wait....',
        //'downloadedFile': "Your files are downloading....,  <br />File, {virtualclass1}, has been downloaded",
        // 'overallprogress': 'Overall Progress',
        'playsessionmsg': 'Click ‘play’ to start the session.',
        'askplayMessage': '<span id="askplaymsg"> Should we start playing the session?</span><br /><span id="remaingmsg">Remaining data will be downloaded in the background.</span>',
        'youTubeUrl': 'Enter YouTube video URL.',
        //'shareYouTubeVideo': 'Share YouTube Video',
        'shareAnotherYouTubeVideo': 'Share another YouTube video',
        'editorCode': 'Code editor',
        // 'editorRich': 'Text Editor',
        'teachermayshow': 'YouTube video will be shared shortly.',
        'youtubeshare': 'YouTube video share',
        'writemode': 'Write mode',
        'readonlymode': 'Read only',
        'msgForDownloadStart' : 'Unable to save data. <br /> Preparing data for download',
        'msgForWhiteboard' : 'Empty whiteboard.',
        'educator' : 'Educator',
        'supportDesktopOnly' : 'Sorry, presenter mode only supports desktops. Tablets and Mobile devices are not supported.',
        'download' : 'Download',
        // 'downloadFile' : 'Download File',
        //'synchMessage' : 'Please wait a while.  Syncing new content.',
        'iosAudEnable' : 'Tap here to enable the audio',
        'studentAudEnable' : 'Student audio enabled',
        'screensharealready' : "The Screen is being shared.",
        'screensharemsg' : "The above screen is being shared.",
       // 'editorsynchmsg' : 'Editor is not in sync, please wait a few seconds and try again ',
        'canvasmissing' : 'Canvas is missing in your browsers. Please update the latest version of your browser',
        'downloadFile'  : 'Download file',
        'filenotsave'  : 'Your file could not be saved.',
        'filetsaveTS'  : 'The Session is ready to Save.',
        'muteAll' : 'Mute all',
        'unmuteAll' : 'Unmute all',
        'enablehistory' : '"Browser History" should be enabled during the Session.',
        'becomeTeacher' : 'Become teacher',
        //'pptscreenstudent':"Presentation will be shared shortly",
        'confirmOk' : 'Yes',
        'confirmCancel' : 'No',
       // 'uploadsession' : 'Please wait until processing is complete.',
        // 'VCE2', 'VCE4', 'VCE5', 'VCE6', 'invalidcmid', 'cmidmissing', 'nomdlroot', 'usermissing', 'cnmissing', 'sesseionkeymissing', 'recorddatamissing', 'keymissing'
        'VCE4' : 'Record data is missing',
        'VCE5' : 'There is unable to Record Data.',
        'VCE6' : 'Course module is missing.',
        'invalidcmid' : 'Course Module is invalid.',
        'nomdlroot' : 'There is no url for momodle root.',
        'usermissing' : 'User is missing',
        'cnmissing' : 'Chunk number is missing',
        'sesseionkeymissing' : 'Session key is missing from Front End.', // from javascript
        'keymissing' :  'Your software(LMS/CMS)\'s key is is missing',
        'invalidurl' :  'Your url is invalid',
        //'ppturl' : 'Enter HTML5 Presentation Url.',

        // start pretest from here
        'speakerTest' : 'If you can hear music, speakers are working.',
        'webcamerainfo' : 'If video is visible, webcam is working.',
        'mictesting' : 'Above audio bar shall fluctuate while you speak if your microphone is connected properly.',
        'nowebcam' : 'Webcam is not available, or not connected properly.',
        'NotFoundError' : 'Webcam is not available, or not connected properly.',
        'DevicesNotFoundError' : 'Webcam is not available, or not connected properly.',

        'highBandWidthSpeed' : 'Your bandwidth is good enough.',
        'mediumBandWidthSpeed' : 'Your bandwidth is limited, we are reducing video quality based on your available bandwidth.',
        'lowBandWidthSpeed' : 'Your bandwidth is too low, we are stopping video playback. You will still be able to hear audio and view screen.',

        'SourceUnavailableError' : 'Another application on your computer might be using your webcam. Kindly close all other applications that might be using your webcam.',
        'congreainchrome' : "Your browser is compatible.",
        'notsupportbrowser' : '{virtualclass1} is not fully compatible. For the best experience, use Google Chrome.',

        'rejected' : 'Another application on your computer might be using your webcam. Kindly close all other applications that might be using your webcam.',
        /*For Chrome */
        'PermissionDeniedErrorExt' : '<div class="errorMsg"> Camera access has been blocked.To provide webcam access, kindly follow below procedure <br />'  +
        'Go to camera icon on top right of the screen <br /> ' +
        'Click on "Always allow..." option and select the camera option <br />  ' +
        'Click on done and refresh the screen  </div> <div class="screenImages">' +
        ' <figure class="chrome" > <img src="https://www.congrea.com/wp-content/uploads/2016/10/ff-video.png" > <figcaption>Chrome</figcaption> </figure></div>',

        'SecurityErrorExt' : '<div class="errorMsg"> Camera access has been blocked.To provide webcam access, kindly follow below procedure <br />'  +
        'Go to camera icon on top right of the screen <br /> ' +
        'Click on "Always allow..." option and select the camera option <br />  ' +
        'Click on done and refresh the screen  </div> <div class="screenImages">' +
        ' <figure class="chrome" > <img src="https://www.congrea.com/wp-content/uploads/2016/10/ff-video.png" > <figcaption>Chrome</figcaption> </figure></div>',

        'nopermissionExt' : '<div class="errorMsg"> Camera access has been blocked.To provide webcam access, kindly follow below procedure <br />'  +
        'Go to camera icon on top right of the screen <br /> ' +
        'Click on "Always allow..." option and select the camera option <br />  ' +
        'Click on done and refresh the screen  </div> <div class="screenImages">' +
        ' <figure class="chrome" > <img src="https://www.congrea.com/wp-content/uploads/2016/10/ff-video.png" > <figcaption>Chrome</figcaption> </figure></div>',


        /*For Firefox */
        'PermissionDeniedErrorExtFF' : '<div class="errorMsg"> Camera access has been blocked.To provide webcam access, kindly follow below procedure <br />'  +
        'Go to camera icon on top left of the screen <br /> ' +
        'Click on "Share Selected Device." option.' +
        '<div class="screenImages">' +
        '<figure class="firefox" > <img src="https://www.congrea.com/wp-content/uploads/2016/10/ff-screnshare.png" > <figcaption>Chrome</figcaption> </figure></div>',

        'SecurityErrorExtFF' : '<div class="errorMsg"> Camera access has been blocked.To provide webcam access, kindly follow below procedure <br />'  +
        'Go to camera icon on top left of the screen <br /> ' +
        'Click on "Share Selected Device." option.' +
        '<div class="screenImages">' +
        '<figure class="firefox" > <img src="https://www.congrea.com/wp-content/uploads/2016/10/ff-screnshare.png" > <figcaption>Chrome</figcaption> </figure></div>',

        'nopermissionExtFF' : '<div class="errorMsg"> Camera access has been blocked.To provide webcam access, kindly follow below procedure <br />'  +
        'Go to camera icon on top left of the screen <br /> ' +
        'Click on "Share Selected Device." option.' +
        '<div class="screenImages">' +
        '<figure class="firefox" > <img src="https://www.congrea.com/wp-content/uploads/2016/10/ff-screnshare.png" > <figcaption>Chrome</figcaption> </figure></div>',

        'poll':'Poll',
        'pollCancel':'Close',
        'pollmaybeshown':'Poll will be published',
        // 'videoUpload':"Share video",
        'documentShare' : 'Share document',
        //'congreavideo' : 'This video is already installed, please upload new file.',
        'duplicateUploadMsg' : 'This file is already exist, please upload new file.',
        'someproblem' : 'There\'s a problem uploading file.Pls try again',
        // 'quiz':'Quiz',
        'quizreviewpublish': 'Review & publish Quiz',
        'quizmayshow' : 'Get ready for a quiz',
        'techsupport' : "Tech support",
        'commonChat': "Common chat",
        // 'privateChat':"Private chat",
        // 'privateChat':"User list",
        // 'support':"Tech Support",
        'uploadsession' : 'Please wait until processing is complete',
        'totalprogress' : 'Total progress',
        'indvprogress' : 'Current task',
        'downloadsession' : 'Please wait while the recording is downloaded',
        'askplaymsg' : '<span id="askplaymsg"> "Downloading in progress, click Play to begin </span>"',
        'overallprogress' : 'Overall progress',
        'replay_message' : 'Thanks for watching.',
        'uploadedsession' : 'Your session has ended, you may now close the window.' +
        'Or close this popup to start a new session.',
        'sessionendmsg' : 'Session has been closed. You may now close your browser.',
        // 'play' : 'Play',
        'replay' : 'Re-play',
        'tpAudioTest' : 'Test audio',
        // 'enableAudio' : 'Unmute',
        // 'disableAudio' : 'Mute',
        'waitmsgconnect' : 'Please wait a while. Application is trying to connect.',
        'testingbrowser' : 'Testing browser compatibility',
        'testinginternetspeed' : 'Testing internet speed',
        'testingspeaker' : 'Testing speaker',
        'testingmichrophone' : 'Testing microphone',
        'testingwebcam' : 'Testing webcam connection',
        'proposedspeed' : 'Proposed speed',
        'audiolatency' : 'Audio latency',
        'videoquality' : 'Video quality',
        // 'docName' : 'Document dashboard',
        // 'dsDbheading' : 'Close document dashboard',
        'DocumentSharedbHeading' : 'Document dashboard',
        'SharePresentationdbHeading' : 'Presentation dashboard',
        'VideodbHeading' : 'Video dashboard',
        'bandslow' : 'Bandwidth is low',
        'bandfast' : 'Bandwidth is high',
        'bandmedium' : 'Bandwidth is medium',
        'pclosetag' : '<span>Are you sure you want to close this poll?  </span>',
        'pclose' : 'Are you sure you want to close voting?',
        'stdPublish' : 'stdPublish',
        'votesuccess' : 'Your vote has been submitted successfully',
        'Pclosed' : 'Poll closed',
        'Pdsuccess' : 'Poll deleted successfully',
        'Tmyclose' : 'Teacher may close this poll at any time',
        'ETime' : 'Elapsed time',
        'Rtime' : 'Remaining time',
        'rvtu' : 'Votes received/ Total users',
        'Novote' : 'No vote received for this poll',
        'watstdrespo' : 'Waiting for student response',
        'Controls' : 'Controls',
        'Quizes' : 'Quizes',
        'Time' : 'Time',
        'Quiz/page' : 'Quiz/page',
        'prechkcmplt' : 'Precheck complete',
        // 'Dshare' : 'Document will shared shortly',
        'Quiz' : 'Quiz',
        'Greport' : 'Grade report',
        'Cquiz' : 'Close quiz',
        'PQuiz' : 'Publish quiz',
        'QClosed' : 'Quiz closed',
        'rusureCquiz' : '<span>Are your sure to close this quiz.  </span>',
        'adminusr' : 'Admin user',
        'Chatroom' : 'Chatroom',
        //'pchat' : 'Private chat',
        'Udocument' : 'Upload document',
        'mybsharedoc' : 'Document will shared shortly',
        'status' : 'Status',
        'delete' : 'Delete',
        'collaborate' : 'Collaborate',
        'pleasewaitWhSynNewCont' : 'Please wait a while. Syncing new content.',
        'PEdit' : 'Poll edit',
        // 'Question' : 'Question :',
        //'option' : 'Options :',
        'Addoption' : 'Add option',
        'Reset' : 'Reset',
        'Save' : 'Save',
        'Publish' : 'Publish',
        'createnewpoll' : 'Create new poll',
        'Cpoll' : 'Course poll',
        'Spoll' : 'Site poll',
        'Presult' : 'Poll result',
        'addnew' : 'Add new',
        'PQuestions' : 'Poll questions',
        'Creator' : 'Creator',
        'pollmybpublish' : 'Poll will be published shortly',
        'NAME' : 'NAME',
        'optselectd' : 'OPTION SELECTED',
        'Back' : 'Back',
        'ppoll' : 'Publish Poll',
        'Question' : 'Question',
        'Options' : 'Options',
        'VotedSoFar' : 'Votes received so far',
        'PSetting' : 'Poll setting',
        'ModeclosingPoll' : 'Mode of closing Poll :',
        'ByInstructor' : 'By instructor',
        'ByTimer' : 'By timer',
        'SetTimer' : 'Set timer',
        'minute' : 'Minute',
        'second' : 'Second',
        'Showresulttostudents' : 'Show result to students',
        'cancel' : 'Cancel',
        'EHTMLPresentUrl' : 'Enter HTML5 presentation url.',
        'preWllBshortly' : 'Presentation will be shared shortly',
        'clicktoplay' : 'Play',
        'uploadvideo' : 'Upload video',
        //'onlinevideo' : '+',
        'Vwllbshrshortly' : 'Video will be shared shortly',
        'canvasmissing' : 'Canvas is missing in your browsers. Please update your browser to the latest version',
        'Prev' : 'Prev',
        'Next' : 'Next',
        'JoinSession' : 'Join session',
        'chromeExtMiss' : "Congrea needs 'Desktop Selector' plugin to share the Screen.<br />" +
        "You can download this from <a href='https://chrome.google.com/webstore/detail/desktop-selector/ijhofagnokdeoghaohcekchijfeffbjl' target='_blank'>HERE.</a>",
        'etDisabledA':'Cannt edit,poll attempted',
        'etDisabledCr':'Can be edited by creator of the poll',
        'dltDisabled':'Can be deleted  by creator of the poll',
        'edit':'Edit',
        // 'publish':'Publish',
        'pollHead':'Vote this Poll',
        'share' : 'Share',
        'validateurlmsg' : 'Invalid url',
        "NotSupportedError" : 'Only secure orgins(https) are allowed for Audio and Video.',
        'httpsmissing' : 'Only secure orgins(https) are allowed for Screen sharing',
        'noPoll': "There is no question available for poll. Kindly click on ‘add new’ button to add question",
        'noPollNoAdmin':"There is no question available for poll and only admin can create site level poll",
        'noResultStd':"You are not permitted to see the result",
        //'editTitle':"Edit Title",
        'votesuccessPbt':"Vote has been submitted successfully ,You are not permitted to see the result",
        'pollDel':'Are you sure to delete this poll ?',
        'enable':"Enable",
        'disable':"Disable",
        'edittitle':"Edit title",
        'pollblank':'Question can not be left blank',
        'minoption':'Enter atleast two options',
        'delblank' :'Remove the blank option',
        'NotAllowedError':'Webcam is disabled',
        'Text_Limit_Exeed' : 'Warning: High TX usage',
        'Binary_Limit_Exeed' : 'Warning: High BN usage',
        'Unauthenticated' : 'Error: Access invalid',
        'Multiple_login' : 'Error: Access invalid, Multiple logins',
        'Max_rooms' : 'Error: Max rooms limit reached',
        'Max_users' : 'Error: Max users limit reached',
        //'RaiseHandDisable':'Disable',
        'RaiseHandEnable':'Hand raised',
        'RaiseHandStdEnabled':'Raise hand',
        'RaiseHandStdDisabled':'Undo raise hand',
        'NotReadableError' : 'Please ensure that same webcam is not being used <br /> in multiple browsers or multiple applications.',
        'stdscreenshare' : 'Do you want to share your screen ?',
        'selfview' : "Self view",
        'sharetoall' : "Share to all",
        'coursePoll' :"Created polls are of course level",
        'sitePoll' :"Created polls are of site level",
        'closevideoDashboard' : "Close video dashboard",
        'closeSharePresentationdbHeading' : "Close presentation dashboard",
        'closedsDbheading' : "Close document dashboard",
        'openvideoDashboard' : "Video dashboard",
        'openSharePresentationdbHeading' : "Presentation dashboard",
        'opendsDbheading' : "Document dashboard",
        'Skip':"Close",
        'videooff' : "Video off",
        'raiseHandNotify':"Student(s) raised hand",
        'disableVideoAll':"Disable video all",
        'enableVideoAll':"Enable video all",

        'bulkUserActions':"Bulk user actions",
        'muteAllAudio':"Mute all audio",
        'disableAllVideo':"Disable all videos",
        'general':"General",
        'appPrerequites':"Validate app prerequites",
        'precheckStart':'Start',
        'Precheck':"Precheck",
        "media":"Media",
        'audioInput':"Audio input",
        'audioOutput':"Audio output",
        'videoInput':"Video input",
        'setting':"Setting",
        'transferControls':"Transfer controls",
        'requestScreenShare':"Request screenShare",
        'disabled':"disabled",
        'userList':"User list",
        // 'raiseHand':"raise hand",
        'zoomIn':"Zoom in",
        'zoomOut':"Zoom out",
        'fitToScreen':"Fit to screen",
        'docUploadSuccess':"Document upload success",
        // 'disableAll':"Collaborate",
        // 'enableAll':"Collaborate",
        'receivedVotes':"Received votes",
        'closeVoting':"Close voting",

        'Whiteboard' : "Whiteboard",
        'DocumentSharing' : "Document sharing",
        'ScreenShare' : "Screen share",
        'ShareVideo' : "Share video",
        'Poll' : "Poll",
        // 'Quiz' : "Quiz",
        'TextEditor' : "Text editor",
        'CodeEditor' : "Code editor",
        'SharePresentation' : "Share presentation",
        'SessionEnd' : "Session end",
        'Rectangle': "Rectangle",
        'Line': "Line",
        'Freehand': "Free hand",
        'Oval': "Oval",
        'Triangle': "Triangle",
        'Text': "Text",
        'ActiveAll': "Active all",
        'ClearAll': "Clear all",
        'Play': "Play",
        'Delete': "Delete",
        'Pause': "Pause",
        'FF2': "Fast forward 2",
        'FF8': "Fast forward 8",
        'Replay': "Replay from start.",
        'Finish': "Finish",
        'oncollaboration': "Collaboration on",
        'offcollaboration': "Collaboration off",
        'reloadDoc':"Reload document",
        'ssBtn':"Stop sharing",
        'ssStop':"Stop screen sharing",
        'pollresult' : "Previous result"
        'noQuiz':"No quiz available. Congrea supports only mutliple choice questions",
    };
    window.message = message;
})(window);