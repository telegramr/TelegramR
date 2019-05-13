'use strict';

import * as types from '../constants/Types';

export class messageObjType {
  id: String
  from_id: String
  to_id: String
  out: Boolean
  uname: String
  avatar: String
  message: String | Object | Array
  date: String
}

export function fetchMessagePrevious(currentMessageId: String, maxMessageId: String, count = 10) {
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

export function setRefreshStatus(isRefresh: Boolean) {
  return {
    type: types.SET_REFRESH_STATUS,
    isRefresh
  }
}

export function addChatMessage(messageObj: messageObjType) {
  console.log(messageObj)
  return {
    type: types.ADD_CHAT_MESSAGE,
    messageObj
  }
}

export function removeChatMessage(messageId: String) {
  console.log(messageId)
  return {
    type: types.REMOVE_CHAT_MESSAGE,
    messageId
  }
}

export function setIsEnd(isEnd: Boolean) {
  return {
    type: types.SET_IS_END,
    isEnd
  }
}
