const ioPingPong = {

  ping(e) {
    // When a new member is added, greet him with both broadcast and individual msg
    if (e.type == 'member_added') {
      if (roles.hasAdmin()) {
        const session = this.sessionName();
        const msg = { ping: 'ping', cf: 'pong', session };
        ioAdapter.sendWithDelayAndDrop(msg, null, 'mustSend', 'pingAll', 3000);
        console.log('PING BROADCAST');
      }
    } else if (e.type == 'member_added' && e.hasOwnProperty('users')) {
      io.sessionSet = true;
    }
  },
  pong(e) {
    if (e.toUser) {
      console.log(`PONG TO ${e.toUser.userid} from ${e.fromUser.userid}`);
      const msg = { ping: 'pong', cf: 'pongAck' };
      ioAdapter.mustSendUser(msg, e.fromUser.userid);
      console.log(`PONG ACK TO ${e.fromUser.userid}`);
    } else {
      console.log(`PONG BROADCAST from ${e.fromUser.userid}`);
      this.verifySession(e);
    }
  },
  pongAck(e) {
    console.log(`PONG ACK FROM ${e.fromUser.userid}`);
  },
  sessionName() {
    let session = localStorage.getItem('mySession');
    if (session === null) {
      // If there is already exisiting session
      // If new session trying to be create from new teacher become eduactor
      if (virtualclass.gObj.hasOwnProperty('doEndSession')) {
        virtualclass.storage.config.endSession();
        console.log('==== session, end session');
      }
      session = this.setSession();
    }
    return session;
  },
  setSession() {
    const session = virtualclass.vutil.randomString(32);
    console.log('==== session, My session is created by setSession');
    localStorage.setItem('mySession', session);
    return session;
  },
  verifySession(e) {
    const msg = e.message;
    const { session } = msg;
    const localSession = localStorage.getItem('mySession');
    if (localSession != null) {
      // only destroy the session when the request comes from teacher
      if (localSession !== session && e.fromUser.role == 't') { // We are good, if same;
        this.sessionDestroy(session, e);
      }
    } else {
      console.log('==== session, start session');
      console.log('My session is created');
      localStorage.setItem('mySession', session);
    }
  },
  /**
   * We will delete all data from local Storage and IndexedDB and begin a new session
   */
  sessionDestroy(session, e) {
    // TODO Finish Session and start gracefully
    if (!virtualclass.isPlayMode) {
      console.log('==== session, start session');
      const uid = e.fromUser.userid;
      localStorage.removeItem('mySession');
      virtualclass.storage.config.endSession();
      localStorage.setItem('mySession', session);
      ioMissingPackets.validateAllVariables(uid);
      console.log('REFRESH SESSION');
    } else {
      console.log('==== session, end session');
      console.log('My session is created');
      localStorage.setItem('mySession', 'thisismyplaymode');
    }
  },
};
