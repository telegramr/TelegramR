import {EventEmitter} from 'events';
import ActionScheduler from '../utils/actionScheduler';
import {closeChat} from '../actions/clientAction';
// import { subscribeNotifications } from '../registerServiceWorker';
import DBController from '../controllers/dbController';

class ApplicationStore extends EventEmitter {
  constructor() {
    super();

    this.reset();
    this.loadCacheData();

    this.addTdLibListener();
    this.addStatistics();
    this.setMaxListeners(Infinity);
  }

  reset = () => {
    this.dialogsReady = false;
    this.cacheLoaded = false;
    this.setPhoneNumberRequest = null;
    this.chatId = 0;
    this.dialogChatId = 0;
    this.messageId = null;
    this.statistics = new Map();
    this.authorizationState = null;
    this.defaultPhone = null;
    this.connectionState = null;
    this.isChatDetailsVisible = false;
    this.mediaViewerContent = null;
    this.profileMediaViewerContent = null;
    this.dragging = false;
    this.actionScheduler = new ActionScheduler(
      this.handleScheduledAction,
      this.handleCancelScheduledAction,
    );
  };

  // TODO: load cache data
  loadCacheData = () => {
    const authorizationState = {
      '@type': 'authorizationStateReady',
    };
    const connectionState = {
      '@type': 'connectionStateConnecting',
    };
    this.authorizationState = authorizationState;
    this.connectionState = connectionState;
  };

  addScheduledAction = (key, timeout, action, cancel) => {
    return this.actionScheduler.add(key, timeout, action, cancel);
  };

  invokeScheduledAction = async key => {
    await this.actionScheduler.invoke(key);
  };

  removeScheduledAction = key => {
    this.actionScheduler.remove(key);
  };

  handleScheduledAction = item => {
    console.log('Invoked scheduled action key=', item.key);
  };

  handleCancelScheduledAction = item => {
    console.log('Cancel scheduled action key=', item.key);
  };

  onUpdate = update => {
    switch (update['@type']) {
      case 'updateAuthorizationState': {
        this.authorizationState = update.authorization_state;

        switch (update.authorization_state['@type']) {
          case 'authorizationStateLoggingOut':
            this.loggingOut = true;
            break;
          case 'authorizationStateWaitTdlibParameters':
            DBController.sendTdParameters();
            break;
          case 'authorizationStateWaitEncryptionKey':
            DBController.send({'@type': 'checkDatabaseEncryptionKey'});
            break;
          case 'authorizationStateWaitPhoneNumber': {
            if (this.setPhoneNumberRequest) {
              this.setPhoneNumberRequest();

              this.setPhoneNumberRequest = null;
            }

            break;
          }
          case 'authorizationStateWaitCode':
            break;
          case 'authorizationStateWaitPassword':
            break;
          case 'authorizationStateReady':
            this.loggingOut = false;
            this.setPhoneNumberRequest = null;
            // subscribeNotifications();
            break;
          case 'authorizationStateClosing':
            break;
          case 'authorizationStateClosed':
            this.reset();

            if (!this.loggingOut) {
              document.title += ': Zzz…';

              DBController.clientUpdate({
                '@type': 'clientUpdateAppInactive',
              });
            } else {
              DBController.init();
            }
            break;
          default:
            break;
        }

        this.emit(update['@type'], update);
        break;
      }
      case 'updateChatIsMarkedAsUnread': {
        const {chat_id, is_marked_as_unread} = update;
        if (chat_id === this.chatId && is_marked_as_unread) {
          closeChat();
        }

        break;
      }
      case 'updateConnectionState': {
        this.connectionState = update.state;

        this.emit(update['@type'], update);
        break;
      }
      case 'updateFatalError': {
        this.emit(update['@type'], update);

        break;
      }
      case 'updateServiceNotification': {
        const {type, content} = update;

        if (!content) {
          return;
        }
        if (content['@type'] === 'messageText') {
          const {text} = content;
          if (!text) {
            return;
          }

          if (text['@type'] === 'formattedText' && text.text) {
            switch (type) {
              case 'AUTH_KEY_DROP_DUPLICATE':
                let result = window.confirm(text.text);
                if (result) {
                  DBController.logOut();
                }
                break;
              default:
                alert(text.text);
                break;
            }
          }
        }

        break;
      }
      default:
        break;
    }
  };

  onClientUpdate = update => {
    switch (update['@type']) {
      case 'clientUpdateAppInactive': {
        this.emit('clientUpdateAppInactive');
        break;
      }
      case 'clientUpdateCacheLoaded': {
        this.cacheLoaded = true;
        this.emit('clientUpdateCacheLoaded');
        break;
      }
      case 'clientUpdateChatId': {
        const extendedUpdate = {
          '@type': 'clientUpdateChatId',
          nextChatId: update.chatId,
          nextMessageId: update.messageId,
          previousChatId: this.chatId,
          previousMessageId: this.messageId,
        };

        this.chatId = update.chatId;
        this.messageId = update.messageId;

        this.emit('clientUpdateChatId', extendedUpdate);
        break;
      }
      case 'clientUpdateTdLibDatabaseExists': {
        this.emit('clientUpdateTdLibDatabaseExists', update);
        break;
      }
      case 'clientUpdateDeleteMessages': {
        this.emit('clientUpdateDeleteMessages', update);
        break;
      }
      case 'clientUpdateDialogsReady': {
        this.dialogsReady = true;
        this.emit('clientUpdateDialogsReady', update);
        break;
      }
      case 'clientUpdateEditMessage': {
        this.emit('clientUpdateEditMessage', update);
        break;
      }
      case 'clientUpdateMediaViewerContent': {
        const {content} = update;
        this.mediaViewerContent = content;

        this.emit('clientUpdateMediaViewerContent', update);
        break;
      }
      case 'clientUpdateProfileMediaViewerContent': {
        const {content} = update;
        this.profileMediaViewerContent = content;

        this.emit('clientUpdateProfileMediaViewerContent', update);
        break;
      }
      case 'clientUpdateSearchChat': {
        this.emit('clientUpdateSearchChat', update);
        break;
      }
      case 'clientUpdateSetPhone': {
        const {phone} = update;

        this.defaultPhone = phone;

        if (!phone) {
          this.setPhoneNumberRequest = null;
          DBController.clientUpdate({
            '@type': 'clientUpdateSetPhoneCanceled',
          });
        } else {
          if (
            this.authorizationState &&
            this.authorizationState['@type'] ===
              'authorizationStateWaitPhoneNumber'
          ) {
            this.setPhoneNumber(phone);
          } else {
            this.setPhoneNumberRequest = () => this.setPhoneNumber(phone);
          }
        }

        this.emit('clientUpdateSetPhone', update);
        break;
      }
      case 'clientUpdateSetPhoneResult': {
        this.emit('clientUpdateSetPhoneResult', update);
        break;
      }
      case 'clientUpdateSetPhoneError': {
        this.emit('clientUpdateSetPhoneError', update);
        break;
      }
      case 'clientUpdateDialogChatId': {
        const {chatId} = update;
        this.dialogChatId = chatId;

        this.emit('clientUpdateDialogChatId', update);
        break;
      }
      case 'clientUpdateFocusWindow': {
        if (!this.authorizationState) {
          break;
        }

        DBController.send({
          '@type': 'setOption',
          name: 'online',
          value: {'@type': 'optionValueBoolean', value: update.focused},
        });

        this.emit('clientUpdateFocusWindow', update);
        break;
      }
      case 'clientUpdateForward': {
        this.emit('clientUpdateForward', update);
        break;
      }
      case 'clientUpdateLeaveChat': {
        if (update.inProgress && this.chatId === update.chatId) {
          DBController.setChatId(0);
        }

        break;
      }
    }
  };

  setPhoneNumber = phone => {
    DBController.send({
      '@type': 'setAuthenticationPhoneNumber',
      phone_number: phone,
    })
      .then(result => {
        DBController.clientUpdate({
          '@type': 'clientUpdateSetPhoneResult',
          result,
        });
      })
      .catch(error => {
        DBController.clientUpdate({
          '@type': 'clientUpdateSetPhoneError',
          error,
        });
      });
  };

  onUpdateStatistics = update => {
    // if (!update) return;
    //
    // if (this.statistics.has(update['@type'])) {
    //   const count = this.statistics.get(update['@type']);
    //
    //   this.statistics.set(update['@type'], count + 1);
    // } else {
    //   this.statistics.set(update['@type'], 1);
    // }
  };

  addTdLibListener = () => {
    DBController.addListener('update', this.onUpdate);
    DBController.addListener('clientUpdate', this.onClientUpdate);
  };

  removeTdLibListener = () => {
    DBController.off('update', this.onUpdate);
    DBController.off('clientUpdate', this.onClientUpdate);
  };

  addStatistics = () => {
    DBController.addListener('update', this.onUpdateStatistics);
  };

  setChatId = (chatId, messageId = null) => {
    // const update = {
    //   '@type': 'clientUpdateChatId',
    //   nextChatId: chatId,
    //   nextMessageId: messageId,
    //   previousChatId: this.chatId,
    //   previousMessageId: this.messageId
    // };
    //
    // this.chatId = chatId;
    // this.messageId = messageId;
    // this.emit(update['@type'], update);
  };

  getChatId() {
    return this.chatId;
  }

  getMessageId() {
    return this.messageId;
  }

  changeChatDetailsVisibility(visibility) {
    this.isChatDetailsVisible = visibility;
    this.emit('clientUpdateChatDetailsVisibility', visibility);
  }

  getConnectionState() {
    return this.connectionState;
  }

  getAuthorizationState() {
    return this.authorizationState;
  }

  getDragging = () => {
    return this.dragging;
  };

  setDragging = value => {
    this.dragging = value;
    this.emit('clientUpdateDragging', value);
  };

  assign(source1, source2) {
    Object.assign(source1, source2);
    //this.set(Object.assign({}, source1, source2));
  }
}

const store = new ApplicationStore();
window.app = store;
export default store;
