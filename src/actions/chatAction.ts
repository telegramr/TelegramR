'use strict';

import * as types from '../constants/Types';

interface MessageObjType {
  id: string;
  from_id: string;
  to_id: string;
  out?: boolean;
  uname: string;
  avatar: string;
  message: string | object | string[]
  date: string
}

export function fetchMessagePrevious(currentMessageId: string, maxMessageId: string, count:number = 10) {
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

export function setRefreshStatus(isRefresh: boolean) {
  return {
    type: types.SET_REFRESH_STATUS,
    isRefresh
  }
}

export function addChatMessage(messageObj: MessageObjType) {
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
