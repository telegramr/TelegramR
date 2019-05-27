'use strict';

import * as types from '../constants/Types';
import { addChatMessage, setIsEnd } from "./chatAction";


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

// 发送普通字符串消息
export function sendMessage() {
  return (dispatch, getState) => {
    const { messageStr } = getState().messageMedia;
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

// 发送media消息
export function sendMessageMedia(messageObj, mediaType) {
  return (dispatch, getState) => {
    const { messageStr } = getState().messageMedia;
    // dispatch(sendingMessage());
    // TODO: 模拟用户登录
    const result = fetch('https://www.baidu.com/')
      .then((res) => {
        dispatch(sendMessageMediaSuccess(messageObj, mediaType));
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
  const newMessageObj = {
    id: '1',
    from_id: '1',
    to_id: '2',
    out: true,
    uname: 'Beats0',
    avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4',
    message: messageStr,
    date: '12: 47'
  }
  return dispatch => {
    dispatch(setMessageStr(''))
    dispatch(addChatMessage(newMessageObj))
    dispatch(setIsEnd(true))
  }
}

function sendMessageMediaSuccess(messageObj, type) {
  console.log('messageObj', messageObj);
  const newMessageObj = {
    id: '1',
    from_id: '1',
    to_id: '2',
    out: true,
    uname: 'Beats0',
    avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4',
    message: messageObj,
    date: '12: 47',
    type
  }
  return dispatch => {
    dispatch(addChatMessage(newMessageObj))
    dispatch(setIsEnd(true))
  }
}

function sendError(error) {
  console.log(error);
  return {
    type: types.SEND_ERROR,
    errorInfo: error
  }
}

