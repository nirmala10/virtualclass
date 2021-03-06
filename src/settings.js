(function (window) {
  const settings = {
    info: { // All settings object
      allowoverride: null,
      disableAttendeeAudio: null,
      disableAttendeePc: null,
      disableAttendeeGc: null,
      disableAttendeeVideo: null,
      disableRaiseHand: null,
      disableUserList: null,
      x8: null,
      x16: null,

      enableRecording: null,

      recAllowpresentorAVcontrol: null,
      recShowPresentorRecordingStatus: null,

      attendeeAV: null,
      recallowattendeeAVcontrol: null,
      showAttendeeRecordingStatus: null,
      trimRecordings: null,
    },

    user: {},
    init() { // default settings applyed from here
      let settings = localStorage.getItem('settings');
      if (!settings) {
        settings = virtualclassSetting.settings;
      }
      settings = virtualclass.settings.onLoadSettings(settings);

      for (const propname in settings) {
        if (virtualclass.settings.info.hasOwnProperty(propname)) {
          virtualclass.settings.info[propname] = settings[propname];
        }
      }

      this.recording.init();
    },

    // settings object values assign to array for get a hax code
    settingsToHex(s) {
      const localSettings = [];
      localSettings[0] = +s.allowoverride;
      localSettings[1] = +s.disableAttendeeAudio;
      localSettings[2] = +s.disableAttendeeVideo;
      localSettings[3] = +s.disableAttendeePc;
      localSettings[4] = +s.disableAttendeeGc;
      localSettings[5] = +s.disableRaiseHand;
      localSettings[6] = +s.disableUserList;
      localSettings[7] = +s.enableRecording;
      localSettings[8] = +s.recAllowpresentorAVcontrol;
      localSettings[9] = +s.recShowPresentorRecordingStatus;
      localSettings[10] = +s.attendeeAV;
      localSettings[11] = +s.recallowattendeeAVcontrol;
      localSettings[12] = +s.showAttendeeRecordingStatus;
      localSettings[13] = +s.trimRecordings;
      localSettings[14] = +s.x8;
      localSettings[15] = +s.x16;
      return virtualclass.settings.binaryToHex(localSettings.join(''));
    },

    // return data into true, false
    // student side
    parseSettings(s) {
      const settings = {};
      let localSettings = virtualclass.settings.hexToBinary(s);
      if (localSettings) {
        localSettings = localSettings.split('');
      }
      settings.allowoverride = !!+localSettings[0];
      settings.disableAttendeeAudio = !!+localSettings[1];
      settings.disableAttendeeVideo = !!+localSettings[2];
      settings.disableAttendeePc = !!+localSettings[3];
      settings.disableAttendeeGc = !!+localSettings[4];
      settings.disableRaiseHand = !!+localSettings[5];
      settings.disableUserList = !!+localSettings[6];
      settings.enableRecording = !!+localSettings[7];
      settings.recAllowpresentorAVcontrol = !!+localSettings[8];
      settings.recShowPresentorRecordingStatus = !!+localSettings[9];
      settings.attendeeAV = !!+localSettings[10];
      settings.recallowattendeeAVcontrol = !!+localSettings[11];
      settings.showAttendeeRecordingStatus = !!+localSettings[12];
      settings.trimRecordings = !!+localSettings[13];
      settings.x8 = !!+localSettings[14];
      settings.x16 = !!+localSettings[15];

      return settings;
    },

    // Hex convert into binary
    hexToBinary(s) {
      let i; let k; let part; let
        ret = '';
      // lookup table for easier conversion. '0' characters are padded for '1' to '7'
      const lookupTable = {
        0: '0000',
        1: '0001',
        2: '0010',
        3: '0011',
        4: '0100',
        5: '0101',
        6: '0110',
        7: '0111',
        8: '1000',
        9: '1001',
        a: '1010',
        b: '1011',
        c: '1100',
        d: '1101',
        e: '1110',
        f: '1111',
        A: '1010',
        B: '1011',
        C: '1100',
        D: '1101',
        E: '1110',
        F: '1111',
      };
      for (i = 0; i < s.length; i += 1) {
        if (lookupTable.hasOwnProperty(s[i])) {
          ret += lookupTable[s[i]];
        } else {
          return false;
        }
      }
      return ret;
    },

    // convert binary into Hex
    binaryToHex(s) {
      let i; let k; let part; let accum; let
        ret = '';
      for (i = s.length - 1; i >= 3; i -= 4) {
        // extract out in substrings of 4 and convert to hex
        part = s.substr(i + 1 - 4, 4);
        accum = 0;
        for (k = 0; k < 4; k += 1) {
          if (part[k] !== '0' && part[k] !== '1') {
            // invalid character
            return false;
          }
          // compute the length 4 substring
          accum = accum * 2 + parseInt(part[k], 10);
        }
        if (accum >= 10) {
          // 'A' to 'F'
          ret = String.fromCharCode(accum - 10 + 'A'.charCodeAt(0)) + ret;
        } else {
          // '0' to '9'
          ret = String(accum) + ret;
        }
      }
      // remaining characters, i = 0, 1, or 2
      if (i >= 0) {
        accum = 0;
        // convert from front
        for (k = 0; k <= i; k += 1) {
          if (s[k] !== '0' && s[k] !== '1') {
            return false;
          }
          accum = accum * 2 + parseInt(s[k], 10);
        }
        // 3 bits, value cannot exceed 2^3 - 1 = 7, just convert
        ret = String(accum) + ret;
      }
      return ret;
    },

    // Object's properties value true or false into binary
    applySettings(value, settingName, userId) {
      const obj = {};
      obj[settingName] = value;
      this._applySettings(obj, userId);
    },

    _applySettings(obj, userId) {
      if (roles.hasControls()) {
        const settingName = Object.keys(obj)[0];
        const value = obj[settingName];
        if ((value === true || value === false) && virtualclass.settings.info.hasOwnProperty(settingName)) {
          if (typeof userId === 'undefined') {
            localStorage.removeItem('userSettings');
            virtualclass.settings.info[settingName] = value;
            const str = virtualclass.settings.settingsToHex(virtualclass.settings.info);
            virtualclass.settings.send(str, userId);
            localStorage.setItem('settings', str);
          } else {
            const individualSetting = {};
            const setting = virtualclass.settings.info;
            for (const propname in setting) {
              individualSetting[propname] = setting[propname];
            }
            individualSetting[settingName] = value;
            const specificSettings = virtualclass.settings.settingsToHex(individualSetting);
            virtualclass.settings.user[userId] = specificSettings;
            virtualclass.settings.send(specificSettings, userId);
            localStorage.setItem('userSettings', JSON.stringify(virtualclass.settings.user));
          }
          return true;
        }
        return false;
      }
      for (const propname in obj) {
        virtualclass.settings.info[propname] = obj[propname];
        if (propname !== 'trimRecordings') { //avoid trim recordings
          virtualclass.settings[propname](obj[propname]);
        }
      }
      const settings = virtualclass.settings.settingsToHex(obj);
      localStorage.setItem('settings', settings);
    },

    // Message send to student
    send(value, userId) {
      if (roles.hasControls()) {
        if (typeof userId !== 'undefined') {
          virtualclass.vutil.beforeSend({ cf: 'settings', Hex: value, toUser: userId }, userId);
        } else {
          virtualclass.vutil.beforeSend({ cf: 'settings', Hex: value });
        }
      }
    },

    // Apply settings on student side
    onMessage(msg) {
      if (typeof msg === 'string') {
        if (roles.isStudent()) {
          const settings = virtualclass.settings.parseSettings(msg);
          this._applySettings(settings);
        }
      } else {
        this.recording.triggerSetting(msg);
      }
    },

    onLoadSettings(str) {
      const hextosettings = virtualclass.settings.parseSettings(str);
      return hextosettings;
    },

    // Mute or Unmute all student audio or particular student mute or unmute
    disableAttendeeAudio(value) {
      if (roles.isStudent()) {
        if (value === true) {
          virtualclass.user.control.audioWidgetEnable(true);
          virtualclass.gObj.audioEnable = true;
        } else if (value === false) {
          const speakerPressOnce = document.querySelector('#speakerPressOnce');
          if (speakerPressOnce.dataset.audioPlaying === true || speakerPressOnce.dataset.audioPlaying === 'true') {
            virtualclass.media.audio.clickOnceSpeaker('speakerPressOnce');
          }
          virtualclass.user.control.audioDisable();
          virtualclass.gObj.audioEnable = false;
        }
      }
    },

    allowoverride() {
      console.log('TO DO');
    },

    disableAttendeePc() {
      console.log('TO DO');
    },

    disableAttendeeGc() {
      console.log('TO DO');
    },

    // All student video enable, disable
    disableAttendeeVideo(value) {
      if (roles.isStudent()) {
        let action;
        const sw = document.querySelector('.videoSwitchCont #videoSwitch');
        if (sw.classList.contains('off') && value === false) {
          console.log('do nothing');
        } else if (sw.classList.contains('on') && value === true) {
          console.log('do nothing');
        } else if (sw.classList.contains('on') && value === false) {
          virtualclass.vutil.videoHandler('off');
        }
        action = (value === false) ? 'disable' : 'enable';
        virtualclass.videoHost.toggleVideoMsg(action);
        // localStorage.setItem("allVideoAction", action);
      }
    },

    disableRaiseHand() {
      console.log('TO DO');
    },

    disableUserList() {
      console.log('TO DO');
    },

    x8() {
      console.log('TO DO');
    },

    enableRecording() {
      console.log('TO DO');
    },

    recAllowpresentorAVcontrol() {
      console.log('TO DO');
    },

    recShowPresentorRecordingStatus() {
      console.log('TO DO');
    },

    attendeeAV() {
      console.log('TO DO');
    },

    recallowattendeeAVcontrol() {
      console.log('TO DO');
    },

    showAttendeeRecordingStatus() {
      console.log('TO DO');
    },

    x16() {
      console.log('TO DO');
    },

    recording: {
      enableRecording: false,
      allowpresentorAVcontrol: false,
      attendeeAV: false,
      allowattendeeAVcontrol: false,
      audioVideo: true,
      statusOnly: false,
      trimRecordings: false,
      allowattendeeAVcontrolByTeacher: false,

      init() {
        this.enableRecording = virtualclass.settings.info.enableRecording;
        if (roles.hasControls()) {
          this.allowpresentorAVcontrol = virtualclass.settings.info.recAllowpresentorAVcontrol;
          this.showPresentorRecordingStatus = (virtualclass.settings.info.allowpresentorAVcontrol) ? true : virtualclass.settings.info.recShowPresentorRecordingStatus;
        } else {
          this.attendeeAV = virtualclass.settings.info.attendeeAV;
          this.allowattendeeAVcontrol = virtualclass.settings.info.recallowattendeeAVcontrol;
          this.showAttendeeRecordingStatus = (virtualclass.settings.info.allowattendeeAVcontrol) ? true : virtualclass.settings.info.showAttendeeRecordingStatus;
        }

        this.trimRecordings = virtualclass.settings.info.trimRecordings;

        this.showStatus = this.showStatus();
        this.showButton();
        this.overrideSettingFromLocalStorage();
      },

      overrideSettingFromLocalStorage() {
        let setting = localStorage.getItem('recsetting');
        if (setting !== null && setting !== undefined) {
          setting = JSON.parse(setting);
          if (roles.hasControls() || setting.statusonly !== true) {
            this.updateSettingAV(false);
          } else {
            virtualclass.settings.onMessage({ ac: false });
          }
        }
      },

      showButton() {
        const recording = document.getElementById('recording');
        if (this.showStatus) {
          recording.classList.remove('hide');
          recording.classList.add('show');
          virtualclassCont.dataset.recording = 'on';
          if (!this.statusOnly) {
            this.attachHandler(recording);
          } else {
            recording.classList.add('statusonly');
          }
          if (this.trimRecordings) {
            recording.classList.add('trimRecording');
          }
        } else {
          recording.classList.remove('show');
          recording.classList.add('hide');
        }
      },

      attachHandler(recording) {
        recording.addEventListener('click', this.recordingButtonAction.bind(this, recording));
      },

      updateSettingAV(setting) {
        const recElem = document.querySelector('#recording');
        const recButton = document.querySelector('#recording .recordingText');

        this.audioVideo = setting;

        if (this.audioVideo) {
          recButton.innerHTML = 'Recording';
          virtualclassCont.dataset.recording = 'on';
          recElem.setAttribute('data-title', 'Recording Started');
          localStorage.removeItem('recsetting');
          if (virtualclass.currApp === 'ScreenShare' && virtualclass.ss != null) {
            virtualclass.ss.initShareScreen('ss', 500);
          }
        } else {
          if (roles.hasControls() && this.trimRecordings) {
            // recButton.innerHTML = "Start Recording";
            recElem.setAttribute('data-title', 'Recording Stopped');
          } else {
            recElem.setAttribute('data-title', 'Recording Stopped');
          }
          virtualclassCont.dataset.recording = 'off';

          localStorage.setItem('recsetting', JSON.stringify({
            statusonly: this.statusOnly,
            rec: virtualclassCont.dataset.recording,
          }));
        }
        ioAdapter.setRecording();
      },

      recordingButtonAction(elem) {
        if (!elem.classList.contains('statusonly')) {
          let recordSetting;
          if (virtualclassCont.dataset.recording === 'off') {
            recordSetting = true;
            this.updateSettingAV(recordSetting);
          } else {
            recordSetting = false;
            this.updateSettingAV(recordSetting);
          }

          if (roles.hasControls()) {
            ioAdapter.mustSend({ ac: recordSetting, cf: 'recs' });
          }
        } else {
          console.log(' Do nothing');
        }
      },

      showStatus() {
        if (roles.hasControls()) {
          if (this.enableRecording && this.allowpresentorAVcontrol && this.showPresentorRecordingStatus) {
            return true;
          } if (this.enableRecording && !this.allowpresentorAVcontrol && this.showPresentorRecordingStatus) {
            this.statusOnly = true;
            return true;
          }
          return false;
        }
        if (this.enableRecording && this.attendeeAV && this.allowattendeeAVcontrol && this.showAttendeeRecordingStatus) {
          return true;
        } if (this.enableRecording && this.attendeeAV && !this.allowpresentorAVcontrol && this.showAttendeeRecordingStatus) {
          this.statusOnly = true;
          return true;
        }
        return false;
      },

      isRecordingOn() {
        if (roles.hasControls()) {
          return (this.enableRecording && this.allowpresentorAVcontrol && this.audioVideo);
        }
        if (this.attendeeAV) {
          if (this.allowattendeeAVcontrol) {
            return this.audioVideo;
          }
          return true;
        }
        return false;
      },

      sendYesOrNo() {
        return (this.isRecordingOn() ? 'yes' : 'no');
      },

      setStatusOnElement() {
        const recording = document.querySelector('#recording');
        if (this.allowattendeeAVcontrolByTeacher) {
          recording.classList.add('statusonly');
          this.statusOnly = true;
        } else {
          recording.classList.remove('statusonly');
          this.statusOnly = false;
        }
      },

      triggerSetting(message) {
        this.allowattendeeAVcontrolByTeacher = (message.ac == false);
        this.setStatusOnElement();
        this.updateSettingAV(message.ac);
      },
    },
  };
  window.settings = settings;
}(window));
