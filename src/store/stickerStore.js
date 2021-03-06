import StickerStoreCache from './stickerStoreCache';

import {EventEmitter} from 'events';
import DBController from '../controllers/dbController';

class StickerStore extends EventEmitter {
  constructor() {
    super();

    this.reset();
    this.loadStickerData();
    this.addTdLibListener();
    this.setMaxListeners(Infinity);
  }

  reset = () => {
    this.stickerSet = null;
    this.hint = null;
    this.animationData = new WeakMap();
  };

  loadStickerData = () => {
    this.stickerSet = StickerStoreCache;
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
      case 'updateInstalledStickerSets': {
        const {sticker_set_ids} = update;
        if (this.stickerSet) {
          const {id, is_installed} = this.stickerSet;
          if (is_installed !== sticker_set_ids.some(x => x === id)) {
            this.stickerSet = Object.assign({}, this.stickerSet, {
              is_installed: !is_installed,
            });
          }
        }

        this.emit('updateInstalledStickerSets', update);
        break;
      }
      case 'updateRecentStickers': {
        this.emit('updateRecentStickers', update);
        break;
      }
      default:
        break;
    }
  };

  onClientUpdate = update => {
    switch (update['@type']) {
      case 'clientUpdateStickerSend': {
        this.emit('clientUpdateStickerSend', update);
        break;
      }
      case 'clientUpdateLocalStickersHint': {
        const {hint} = update;

        this.hint = hint;

        this.emit('clientUpdateLocalStickersHint', update);
        break;
      }
      case 'clientUpdateRemoteStickersHint': {
        const {hint} = update;

        if (this.hint && this.hint.timestamp === hint.timestamp) {
          this.hint = Object.assign({}, this.hint, {
            foundStickers: hint.stickers,
          });
        }

        this.emit('clientUpdateRemoteStickersHint', update);
        break;
      }
      case 'clientUpdateStickerSet': {
        const {stickerSet} = update;

        this.stickerSet = stickerSet;

        this.emit('clientUpdateStickerSet', update);
        break;
      }
      case 'clientUpdateStickerSetPosition': {
        this.emit('clientUpdateStickerSetPosition', update);
        break;
      }
      case 'clientUpdateStickerPreview': {
        this.emit('clientUpdateStickerPreview', update);
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

  getAnimationData(key) {
    return this.animationData.get(key);
  }

  setAnimationData(key, data) {
    this.animationData.set(key, data);
  }
}

const store = new StickerStore();
window.sticker = store;
export default store;
