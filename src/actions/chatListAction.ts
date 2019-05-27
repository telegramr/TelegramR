'use strict';

import * as types from '../constants/Types';


export function setMessageStr(messageStr: string) {
  return {
    type: types.SET_MESSAGESTR,
    messageStr
  }
}

export function setMessageMedia(currentMessageMedia: string) {
  console.log(currentMessageMedia)
  return {
    type: types.SET_MESSAGEMEDIA,
    currentMessageMedia
  }
}

export function sendMessage() {
  return (dispatch, getState) => {
    const {messageStr} = getState().messageMedia;
    // dispatch(sendingMessage());
    // TODO: 模拟用户登录
    const result = fetch('https://www.baidu.com/')
      .then((res) => {
        dispatch(sendSuccess(messageStr));
      }).catch((error) => {
        dispatch(sendError(error));
      })
  }
}

export function showMessageModalFn() {
  return {
    type: types.SHOW_MESSAGEMODAL
  }
}

export function closeMessageModalFn() {
  return {
    type: types.CLOSE_MESSAGEMODAL
  }
}

function sendSuccess(messageStr: string) {
  console.log('success', messageStr);
  return {
    type: types.LOGIN_IN_DONE,
    messageStr
  }
}

function sendError(error: Error) {
  console.log(error);
  return {
    type: types.SEND_ERROR,
    errorInfo: error
  }
}
