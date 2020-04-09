import {EventEmitter} from 'events';
import OptionStoreCache from './optionStoreCache';
import {KEY_SUGGESTED_LANGUAGE_PACK_ID} from '../constants/Constants';

class OptionStore extends EventEmitter {
  constructor() {
    super();

    this.reset();
    this.loadOptionItemsData();
    this.setMaxListeners(Infinity);
  }

  reset = () => {
    this.items = new Map();
  };

  loadOptionItemsData = () => {
    for (const {key, value} of OptionStoreCache) {
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
      case 'updateOption':
        const {name, value} = update;

        this.set(name, value);

        if (name === KEY_SUGGESTED_LANGUAGE_PACK_ID) {
          // localStorage.setItem(name, value.value);
        }

        this.emit('updateOption', update);
        break;
      default:
        break;
    }
  };

  onClientUpdate = update => {};

  get(name) {
    return this.items.get(name);
  }

  set(name, value) {
    this.items.set(name, value);
  }
}

const store = new OptionStore();
window.option = store;
export default store;
