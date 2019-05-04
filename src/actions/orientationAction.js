import * as types from '../constants/Types';

export function changeToPortrait() {
  return {
    type: types.PORTRAIT,
  }
}

export function changeToLandscape() {
  return {
    type: types.LANDSCAPE,
  }
}
