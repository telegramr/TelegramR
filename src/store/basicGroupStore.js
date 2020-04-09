import {EventEmitter} from 'events';
import BasicGroupStoreCache from './basicGroupStoreCache';

class BasicGroupStore extends EventEmitter {
  constructor() {
    super();

    this.reset();
    this.loadBasicGroupItemsData();
    this.setMaxListeners(Infinity);
  }

  reset = () => {
    this.items = new Map();
    this.fullInfoItems = new Map();
  };

  loadBasicGroupItemsData = () => {
    for (const {key, value} of BasicGroupStoreCache) {
      this.items.set(key, value);
    }
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
      case 'updateBasicGroup': {
        this.set(update.basic_group);

        this.emit(update['@type'], update);
        break;
      }
      case 'updateBasicGroupFullInfo': {
        this.setFullInfo(update.basic_group_id, update.basic_group_full_info);

        this.emit(update['@type'], update);
        break;
      }
      default:
        break;
    }
  };

  onClientUpdate = update => {};

  get(groupId) {
    return this.items.get(groupId);
  }

  set(group) {
    this.items.set(group.id, group);
  }

  getFullInfo(id) {
    return this.fullInfoItems.get(id);
  }

  setFullInfo(id, fullInfo) {
    this.fullInfoItems.set(id, fullInfo);
  }
}

const store = new BasicGroupStore();
window.basicgroup = store;
export default store;
