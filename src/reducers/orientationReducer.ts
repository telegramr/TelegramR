import * as types from '../constants/Types';

const initialState = {
  curOrt : 'PORTRAIT' //默认竖屏
}

export default function counter(state = initialState, action) {
  switch (action.type) {
    case types.PORTRAIT:
      return {
        curOrt: type[PORTRAIT],
      }
      break;
    case types.LANDSCAPE:
      return {
        curOrt: type[LANDSCAPE],
      }
      break;
    default:
      return state;
  }
}
