
var preCheck = {
  currTest: '',
  playTestAudio: false,
  session: null,
  cNavigator: null,
  handlers: [],
  videoAction: false,
  donePrecheck: false,
  init() {
    // $("#myModal").modal();
    // remove jquery
    // $('#myModal').modal({backdrop: 'static', keyboard: false});

    const modal = document.querySelector('#myModal');
    if (modal) {
      modal.className = 'modal in';
    }


    if (roles.hasControls()) {
      this.videoAction = virtualclass.videoHost.gObj.videoSwitch;
    } else if (virtualclass.videoHost.gObj.hasOwnProperty('stdStopSmallVid')) {
      this.videoAction = !(virtualclass.videoHost.gObj.stdStopSmallVid); // false means video off
    } else {
      this.videoAction = false;
    }

    // $('#myModal').modal({backdrop: 'static', keyboard: false});
    this.totalTest = ['browser', 'bandWidth', 'webcam', 'speaker', 'mic'];
    this.currTest = 'browser';

    const preCheckContainer = document.querySelector('#virtualclassCont #preCheckcontainer');

    if (preCheckContainer != null) {
      preCheckContainer.style.display = 'block';
    }

    const virtualclassApp = document.querySelector('#virtualclassCont #virtualclassApp');
    if (virtualclassApp != null) {
      virtualclassApp.style.display = 'none';
    }

    this.startToCheckWholeSytem();
    console.log('Precheck init skip');
    const skip = document.querySelector('#preCheckcontainer .skip');

    if (skip) {
      skip.removeEventListener('click', this.initSkip);
      skip.addEventListener('click', this.initSkip);
    }

    virtualclass.precheck.donePrecheck = true;

    if (workerAudioSend != null) {
      workerAudioSend.postMessage({ cmd: 'precheck', msg: { precheck: virtualclass.precheck.donePrecheck } });
    }
  },

  initSkip() {
    console.log('Skip clicked');
    micTesting.makeAudioEmpty();
    if (localStorage.getItem('precheck')) {
      var virtualclassPreCheck = document.getElementById('preCheckcontainer');
      virtualclassPreCheck.style.display = 'none';
      var virtualclassApp = document.getElementById('virtualclassApp');
      virtualclassApp.style.display = 'block';
      // virtualclass.videoHost._resetPrecheck();
      // virtualclass.media.audio.initAudiocontext();
    } else {
      // virtualclass.media.audio.initAudiocontext();
      virtualclass.popup.waitMsg();
      virtualclass.makeReadySocket();

      var virtualclassPreCheck = document.getElementById('preCheckcontainer');
      virtualclassPreCheck.style.display = 'none';


      var virtualclassApp = document.getElementById('virtualclassApp');
      virtualclassApp.style.display = 'block';
      localStorage.setItem('precheck', true);
      virtualclass.videoHost.afterSessionJoin();
    }

    // virtualclass.media.audio.initAudiocontext();


    const testAudio = document.getElementById('vcSpeakerCheckAudio');
    if (testAudio) {
      testAudio.pause();
      testAudio.currentTime = 0;
    }

    virtualclass.gObj.precheckScrn = false;
    virtualclass.precheck.afterComplete();
  },

  cancelAudioGraph() {
    if (this.graph != null && this.graph != undefined) {
      this.graph.microphone.stop();
    }
  },

  startToCheckWholeSytem() {
    this[this.totalTest[0]].perform();
  },

  _next(curr, cb) {
    console.log('Clicked next');

    if (curr == 'browser') {
      virtualclass.media.audio.initAudiocontext();
    }
    virtualclass.precheck.cancelAudioGraph();
    micTesting.makeAudioEmpty();

    const test = this[curr].next;
    virtualclass.precheck.currTest = test;
    virtualclass.precheck.updateProgressBar(test);
    if ((!this[test].hasOwnProperty('alreadyDone') || this[test].hasOwnProperty('alreadyDone') && test == 'bandwidth')) {
      // Only perform the test if it's not already done
      this[test].perform();
    } else {
      virtualclass.precheck.display(`#preCheckcontainer .precheck.${test}`);
      if (test == 'speaker') {
        this[test]._play(); // play the audio while next buttong is clicked
      } else if (test == 'mic') {
        // this[test].visualize();
        this[test].audioOperation();
      } else if (test == 'webcam') {
        virtualclass.precheck.webcam.initHandler();
        virtualclass.precheck.webcam.createVideo();
      }
    }

    virtualclass.precheck.hide(`#preCheckcontainer .precheck.${curr}`);
    if (typeof cb !== 'undefined') {
      cb();
    }
    this[test].alreadyDone = true;
  },

  _prev(curr, cb) {
    virtualclass.precheck.cancelAudioGraph();
    micTesting.makeAudioEmpty();
    const test = this[curr].prev;
    virtualclass.precheck.hide(`#preCheckcontainer .precheck.${curr}`);
    virtualclass.precheck.display(`#preCheckcontainer .precheck.${test}`);

    document.querySelector(`#preCheckcontainer  #preCheckProgress .${curr}`).classList.remove('active', 'current');
    document.querySelector(`#preCheckcontainer  #preCheckProgress .${test}`).classList.add('current');

    if (test == 'speaker') {
      this[test]._play(); // play the audio while previous button is clicked
    } else if (test == 'mic') {
      // virtualclass.precheck.cNavigator.mediaDevices.getUserMedia(virtualclass.precheck.session).then(function (stream) {
      //     virtualclass.precheck.mediaStream = stream;
      //     micTesting.manipulateStreamFallback(virtualclass.precheck.mediaStream);
      // });

      // this[test].visualize();
      micTesting.playAudio = true;
      this[test].audioOperation();
    } else if (test == 'webcam') {
      virtualclass.precheck.webcam.initHandler();
    }

    if (typeof cb !== 'undefined') {
      cb();
    }
  },

  display(selector) {
    document.querySelector(selector).style.display = 'block';
  },

  hide(selector) {
    document.querySelector(selector).style.display = 'none';
  },

  createMessage(selector, msg, msgType) {
    const divErr = document.createElement('div');
    divErr.className = msgType;
    divErr.innerHTML = msg;
    document.querySelector(selector).appendChild(divErr);
  },

  initHandler(selector, currSec, cb) {
    console.log('initHandler next/prev');
    const nextButton = document.querySelector(selector);

    if (nextButton != null) {
      const handler = this.triggerInitHandler.bind(nextButton, selector, currSec, cb);
      nextButton.addEventListener('click', handler);
      this.handlers.push({ id: selector, handler });
    }
  },

  removeAllListener() {
    for (let i = 0; i < this.handlers.length; i++) {
      document.querySelector(this.handlers[i].id).removeEventListener('click', this.handlers[i].handler);
    }
    this.handlers = [];
  },


  triggerInitHandler(selector, currSec, cb) {
    if (this.classList.contains('next')) {
      virtualclass.precheck._next(currSec);
      console.log('Trigger handle Next');
    } else if (this.classList.contains('prev')) {
      virtualclass.precheck._prev(currSec);
      console.log('Trigger handle previous');
    }

    if (typeof cb !== 'undefined' && cb != null) {
      cb();
    }
  },

  browser: {
    curr: 'browser',
    next: 'bandwidth',

    // TODO This should be simplyfied with isSystemCompatible() function at isSystemCompatible()

    perform() {
      const preCheck = '#preCheckcontainer .precheck';

      virtualclass.precheck.display(`${preCheck}.${this.curr}`);
      const msgSelector = `${preCheck} .result`;

      if (virtualclass.error.length > 0) {
        const errorMsg = (virtualclass.error.length > 1) ? (virtualclass.error.join('<br />')) : virtualclass.error[0];
        virtualclass.precheck.createMessage(msgSelector, errorMsg, 'error');
      }

      const msg = virtualclass.lang.getString('congreainchrome');
      virtualclass.precheck.createMessage(msgSelector, msg, 'information');
      virtualclass.precheck.initHandler((`${preCheck} #${this.curr}Buttons .next`), this.curr);
    },
  },

  bandwidth: {
    prev: 'browser',
    curr: 'bandwidth',
    next: 'speaker',
    perform() {
      const preCheck = '#preCheckcontainer .precheck';
      virtualclass.precheck.display(`#preCheckcontainer .precheck.${this.curr}`);
      var that = this;

      /** Inspired from, http://stackoverflow.com/questions/5529718/how-to-detect-internet-speed-in-javascript * */

      const msgSelector = `#preCheckcontainer .precheck.${this.curr} .result`;
      this.imageAddr = 'https://dl.congrea.com/bandwidth.jpg';

      this.downloadSize = 1000000; // bytes

      /** TODO,  Remove below that * */

      var that = this;
      this.measureConnectionSpeed((speedKbps) => {
        document.querySelector(msgSelector).innerHTML = '';
        const bandWidthText = that.bandWidthInWords(speedKbps);
        const bandWidthMsg = virtualclass.lang.getString(`${bandWidthText}BandWidthSpeed`);

        virtualclass.precheck.createMessage(msgSelector, bandWidthMsg, 'information');

        virtualclass.precheck.initHandler((`${preCheck} #${that.curr}Buttons .prev`), that.curr);
        virtualclass.precheck.initHandler((`${preCheck} #${that.curr}Buttons .next`), that.curr);
      });

      const mediaDetails = virtualclass.media.sessionConstraints();
      virtualclass.precheck.session = mediaDetails[1];

      if (virtualclass.adpt == null) {
        virtualclass.adpt = new virtualclass.adapter();
      }

      virtualclass.precheck.cNavigator = virtualclass.adpt.init(navigator);
      virtualclass.precheck.cNavigator.mediaDevices.getUserMedia(virtualclass.precheck.session).then((stream) => {
        console.log('GEtting stream');
        virtualclass.precheck.mediaStream = stream;
      });
    },

    bandWidthInWords(speed) {
      console.log(`bandwidth speed ${speed}`);
      let bandwidthText;
      if (speed > 600) {
        bandwidthText = 'high';
        virtualclass.videoHost.gObj.MYSPEED = 1;
      } else if (speed > 400) {
        bandwidthText = 'medium';
        virtualclass.videoHost.gObj.MYSPEED = 2;
      } else {
        virtualclass.videoHost.gObj.MYSPEED = 3;
        bandwidthText = 'low';
      }
      ioAdapter.sendSpeed(virtualclass.videoHost.gObj.MYSPEED);
      return bandwidthText;
    },

    measureConnectionSpeed(cb) {
      const download = new Image();
      const that = this;
      download.onload = function () {
        that.endTime = (new Date()).getTime();
        const speedKbps = that.calculateSpeed();
        console.log('Download speed is occurred');
        cb(speedKbps);
      };

      download.onerror = function (err, msg) {
        ShowProgressMessage('Invalid image, or error downloading');
      };

      this.startTime = (new Date()).getTime();
      const cacheBuster = `?nnn=${this.startTime}`; // everytime the page is refrsh, the browser treat the image file as new file
      download.src = this.imageAddr + cacheBuster;
    },

    calculateSpeed() {
      const duration = (this.endTime - this.startTime) / 1000;
      const bitsLoaded = this.downloadSize * 8;
      const speedBps = (bitsLoaded / duration).toFixed(2);
      const speedKbps = (speedBps / 1024).toFixed(2);
      return Math.round(speedKbps);
    },

  },

  speaker: {
    prev: 'bandwidth',
    curr: 'speaker',
    next: 'mic',
    perform() {
      const speakerLable = document.createElement('div');
      speakerLable.innerHTML = virtualclass.lang.getString('speakerTest');
      const selectorId = `#preCheckcontainer .precheck.${this.curr}`;
      document.querySelector(`${selectorId} .result`).appendChild(speakerLable);
      this._play();
    },

    _play() {
      const preCheck = '#preCheckcontainer .precheck';
      virtualclass.precheck.display(`#preCheckcontainer .precheck.${this.curr}`);

      const audioSrc = document.querySelector('#vcSpeakerCheckAudio source');
      const testAudio = document.getElementById('vcSpeakerCheckAudio');
      testAudio.loop = true;
      testAudio.play();

      if (!this.playTestAudio) {
        virtualclass.precheck.initHandler((`${preCheck} #${this.curr}Buttons .prev`), this.curr, () => {
          // stop the audio
          testAudio.pause();
          testAudio.currentTime = 0;
        });

        virtualclass.precheck.initHandler((`${preCheck} #${this.curr}Buttons .next`), this.curr, () => {
          // stop the audio
          testAudio.pause();
          testAudio.currentTime = 0;
        });
        this.playTestAudio = true;
      }
      virtualclass.precheck.cancelAudioGraph();
    },
  },

  mic: {
    prev: 'speaker',
    curr: 'mic',
    next: 'webcam',
    graphProcessor: null,
    graph: null,
    perform() {
      micTesting.manipulateStreamFallback(virtualclass.precheck.mediaStream);

      const preCheck = '#preCheckcontainer .precheck';

      // virtualclass.precheck.updateProgressBar(this.curr);
      virtualclass.precheck.display(`${preCheck}.${this.curr}`);
      this.visualize();

      if (document.querySelector('#micTest') == null) {
        const micLable = document.createElement('div');
        micLable.id = 'micTest';
        micLable.innerHTML = virtualclass.lang.getString('mictesting');

        const selectorId = `${preCheck}.${this.curr}`;
        document.querySelector(`${selectorId} .result`).appendChild(micLable);
      }

      if (virtualclass.system.mybrowser.name == 'safari' || virtualclass.system.mybrowser.name == 'iOS') {
        // Safari 11 or newer automatically suspends new AudioContext's that aren't
        // created in response to a user-gesture, like a click or tap, so create one
        // here (inc. the script processor)

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.graphContext = new AudioContext();
        this.graphProcessor = this.graphContext.createScriptProcessor(1024, 1, 1);
      }

      this.initAudioGraph();

      // this.graph.microphone.start();
    },

    initAudioGraph() {
      if (this.hasOwnProperty('graph') && this.graph != null) {
        const waveElem = document.querySelector('#audioGraph wave');
        if (waveElem != null) {
          waveElem.parentNode.removeChild(waveElem);
        }
      }

      this.graph = WaveSurfer.create({
        container: '#audioGraph',
        waveColor: 'green',
        interact: false,
        cursorWidth: 0,
        audioContext: this.graphContext || null,
        audioScriptProcessor: this.graphProcessor || null,
        plugins: [WaveSurfer.microphone.create()],
        height: 50,
        maxCanvasWidth: 500,
      });

      this.graph.microphone.on('deviceReady', () => {
        console.info('Device ready!');
      });

      this.graph.microphone.on('deviceError', (code) => {
        console.warn(`Device error: ${code}`);
      });
    },

    audioOperation() {
      micTesting.playAudio = true;
      /**
       * For safari, we need to get the new stream every time after
       * destroying the audio processor node
       */
      // virtualclass.precheck.cNavigator.mediaDevices.getUserMedia(virtualclass.precheck.session).then(function (stream) {
      //     virtualclass.precheck.mediaStream = stream;
      //     micTesting.manipulateStreamFallback(virtualclass.precheck.mediaStream);
      // });

      this.visualize();
    },

    visualize() {
      if (this.graph != null && this.graph != undefined) {
        // this.graph.microphone.start()
      }
      virtualclass.precheck.initHandler((`#preCheckcontainer .precheck #${this.curr}Buttons .prev`), this.curr);
      virtualclass.precheck.initHandler((`#preCheckcontainer .precheck #${this.curr}Buttons .next`), this.curr);
    },

  },


  webcam: {
    test: { 1: 'noWebCam', 2: 'nopermission', 3: 'webcambuys' },
    prev: 'mic',
    curr: 'webcam',

    perform() {
      const preCheck = '#preCheckcontainer .precheck';
      const selectorId = `#preCheckcontainer .precheck.${this.curr}`;

      var videoLable = document.createElement('div');
      let msg; let
        wclassName;

      if (virtualclass.system.mediaDevices.hasWebcam) {
        if (virtualclass.system.mediaDevices.webcamErr.length > 0) {
          msg = virtualclass.system.mediaDevices.webcamErr[virtualclass.system.mediaDevices.webcamErr.length - 1];

          // We want descriptive message only in pre check section
          if (msg == 'PermissionDeniedError' || msg == 'SecurityError' || msg == 'nopermission') {
            msg += 'Ext';
            if (virtualclass.system.mybrowser.name == 'Firefox') {
              msg += 'FF';
            }
          }

          msg = virtualclass.lang.getString(msg);
          wclassName = `${videoLable.className} error`;
        } else {
          wclassName = `${videoLable.className} general`;
          var videoLable = document.createElement('div');
          msg = virtualclass.lang.getString('webcamerainfo');
        }
      } else {
        wclassName = `${videoLable.className} error`;
        msg = virtualclass.lang.getString('nowebcam');
      }

      videoLable.className = wclassName;
      videoLable.innerHTML = msg;

      document.querySelector(`${selectorId} .result`).appendChild(videoLable);

      // virtualclass.precheck.updateProgressBar(this.curr);
      virtualclass.precheck.display(selectorId);

      if (!videoLable.classList.contains('error')) {
        this.createVideo();
      } else {
        const tempVideo = document.getElementById('webcamTempVideo');
        tempVideo.className = 'novideo';
      }

      this.initHandler();
    },

    initHandler() {
      const preCheck = '#preCheckcontainer .precheck';
      virtualclass.precheck.initHandler((`${preCheck} #joinSession .prev`), this.curr);

      const joinSession = document.querySelector('#joinSession .next');
      if (joinSession != null) {
        joinSession.removeEventListener('click', this.joinSession.bind(this));
        joinSession.addEventListener('click', this.joinSession.bind(this));
      } else {
        const precheck = document.querySelector('#joinSession .precheckComplete');
        if (precheck != null) {
          precheck.removeEventListener('click', this.initHidePrecheck.bind(this));
          precheck.addEventListener('click', this.initHidePrecheck.bind(this));
        }
      }
    },

    initHidePrecheck() {
      const virtualclassPreCheck = document.getElementById('preCheckcontainer');
      virtualclassPreCheck.style.display = 'none';

      const virtualclassApp = document.getElementById('virtualclassApp');
      virtualclassApp.style.display = 'block';
      // localStorage.setItem('precheck', true);
      virtualclass.videoHost._resetPrecheck();
      virtualclass.precheck.afterComplete();
    },

    joinSession() {
      virtualclass.popup.waitMsg();
      virtualclass.makeReadySocket();

      var virtualclassPreCheck = document.getElementById('preCheckcontainer');
      virtualclassPreCheck.style.display = 'none';

      var virtualclassPreCheck = document.getElementById('preCheckcontainer');
      virtualclassPreCheck.style.display = 'none';

      const virtualclassApp = document.getElementById('virtualclassApp');
      virtualclassApp.style.display = 'block';
      localStorage.setItem('precheck', true);

      virtualclass.videoHost.afterSessionJoin();
      virtualclass.precheck.afterComplete();
    },

    createVideo() {
      if (virtualclass.system.mediaDevices.hasWebcam && typeof virtualclass.precheck.mediaStream !== 'undefined') {
        const tempVideo = document.getElementById('webcamTempVideo');
        if (virtualclass.system.device == 'mobTab') {
          tempVideo.width = 320;
          tempVideo.height = 100;
        } else {
          tempVideo.width = 320;
          tempVideo.height = 240;
        }

        virtualclass.adpt.attachMediaStream(tempVideo, virtualclass.precheck.mediaStream);
        tempVideo.muted = true;
        tempVideo.play();
      }
    },
  },

  startSession() {
    const virtualclassApp = document.getElementById('virtualclassApp');
    virtualclassApp.style.display = 'block';

    const virtualclassPreCheck = document.getElementById('virtualclassPreCheck');

    if (virtualclassPreCheck != null) {
      virtualclassPreCheck.parentNode.removeChild(virtualclassPreCheck);
    }
  },

  updateProgressBar(screen) {
    const currElement = document.querySelector(`#progressbarScreen .${screen}`);
    const allTestsLists = document.querySelectorAll('#preCheckProgress .progressbar li');

    for (let i = 0; i < allTestsLists.length; i++) {
      allTestsLists[i].classList.add('active');

      if (allTestsLists[i].classList.contains(screen)) {
        if (i > 0) {
          allTestsLists[i - 1].classList.remove('current');
        }

        allTestsLists[i].classList.add('current');
        break;
      }
    }
  },

  afterComplete() {
    if (virtualclass.precheck.hasOwnProperty('mediaStream') && virtualclass.precheck.mediaStream != null) {
      const track = virtualclass.precheck.mediaStream.getTracks()[0]; // if only one media track
      track.stop();
    }
    virtualclass.videoHost._resetPrecheck();
    micTesting.destroyAudioNode();
    virtualclass.precheck.removeAllListener();
    virtualclass.media.isInitiator = false;
    if (typeof workletAudioSend !== 'undefined') {
      workletAudioSend.disconnect();
    } else if (virtualclass.gObj.audioPlayerNode != null) {
      virtualclass.gObj.audioPlayerNode.disconnect(virtualclass.media.audio.Html5Audio.audioContext.destination);
      virtualclass.gObj.audioPlayerNode = null;
    }

    if (typeof virtualclass.media.audioCreatorNode !== 'undefined' && virtualclass.media.audioCreatorNode != null) {
      virtualclass.media.audioCreatorNode.disconnect(virtualclass.media.audio.Html5Audio.audioContext.destination);
      virtualclass.media.audioCreatorNode = null;
    }

    /** Need for safari for iOS ** */
    if ((virtualclass.system.mybrowser.name == 'iOS' || virtualclass.system.mybrowser.name == 'Firefox' || virtualclass.system.mybrowser.name == 'Safari') && virtualclass.media.audio.hasOwnProperty('Html5Audio')
      && virtualclass.media.audio.Html5Audio.hasOwnProperty('audioContext')
      && virtualclass.media.audio.Html5Audio.audioContext != null) {
      virtualclass.media.audio.Html5Audio.audioContext.close();
    }


    if (virtualclass.media.audio.hasOwnProperty('Html5Audio')) {
      delete virtualclass.media.audio.Html5Audio;
    }

    console.log('Fetching media stream');

    const that = this;

    virtualclass.media.init((gotStream) => {
      if (gotStream == 'success') {
        virtualclass.media.audio.initAudiocontext();
        /** Set video status after precheck * */
        const videoAction = that.videoAction ? 'on' : 'off';
        virtualclass.vutil.videoHandler(videoAction, 'notSendStatus');
      } else {
        console.log('Something wrong with stream');
      }
    }, 'fromPrecheck');

    virtualclass.precheck.speaker.playTestAudio = false;

    virtualclass.precheck.donePrecheck = false;
    if (workerAudioSend != null) {
      workerAudioSend.postMessage({ cmd: 'precheck', msg: { precheck: virtualclass.precheck.donePrecheck } });
    }
  },

};
