import {EventEmitter} from 'events';
import DBController from '../controllers/dbController';

class InstantViewStore extends EventEmitter {
  constructor() {
    super();

    this.reset();

    this.addTdLibListener();
    this.setMaxListeners(Infinity);
  }

  reset = () => {
    this.items = [];
  };

  onUpdate = update => {
    switch (update['@type']) {
      case 'updateAuthorizationState': {
        const {authorization_state} = update;
        if (!authorization_state) {
          break;
        }

        switch (authorization_state['@type']) {
          case 'authorizationStateClosed': {
            this.reset();
            break;
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
      case 'clientUpdateBlocksInView': {
        this.emit('clientUpdateBlocksInView', update);
        break;
      }
      case 'clientUpdateInstantViewContent': {
        const {content} = update;

        if (content) {
          this.items.push(content.instantView);
        } else {
          this.items = [];
        }

        this.emit('clientUpdateInstantViewContent', update);

        break;
      }
      case 'clientUpdateInstantViewUrl': {
        this.emit('clientUpdateInstantViewUrl', update);
        break;
      }
      case 'clientUpdateInstantViewViewerContent': {
        const {content} = update;

        this.viewerContent = content;

        this.emit('clientUpdateInstantViewViewerContent', update);
        break;
      }
      case 'clientUpdatePrevInstantView': {
        if (this.items.length <= 1) {
          return;
        }

        this.items.pop();
        const prevInstantView = this.items.pop();

        DBController.clientUpdate({
          '@type': 'clientUpdateInstantViewContent',
          content: {
            instantView: prevInstantView,
          },
        });

        break;
      }
      default:
        break;
    }
  };

  addTdLibListener = () => {
    DBController.addListener('update', this.onUpdate);
    DBController.addListener('clientUpdate', this.onClientUpdate);
  };

  removeTdLibListener = () => {
    DBController.off('update', this.onUpdate);
    DBController.off('clientUpdate', this.onClientUpdate);
  };

  hasPrev() {
    return this.items.length > 1;
  }

  getCurrent() {
    return this.items.length > 0 ? this.items[this.items.length - 1] : null;
  }
}

const store = new InstantViewStore();
window.instantView = store;
export default store;
