import * as types from '../constants/Types';

const initialState = {
  messageStr: '',           // 输入内容
  showMessageModal : false, // 是否显示media modal
  currentMessageMedia: '',  // Media名称
  error: false,             // 发送错误
  errorInfo: null,          // 错误信息
  goToEnd: false            // 滚动到底部
}

export default function messageMedia(state = initialState, action) {
  switch (action.type) {
    case types.SET_MESSAGESTR:
      return {
        ...state,
        messageStr: action.messageStr
      }
    case types.SHOW_MESSAGEMODAL:
      return {
        ...state,
        showMessageModal: true
      }
    case types.CLOSE_MESSAGEMODAL:
      return {
        ...state,
        showMessageModal: false,
        currentMessageMedia: ''
      }
    case types.SET_MESSAGEMEDIA:
      return {
        ...state,
        currentMessageMedia: action.currentMessageMedia
      }
    case types.SEND_SUCCESS:
      return {
        ...state,
        messageStr: ''
      }
    case types.SEND_ERROR:
      return {
        ...state,
        error: true,
        errorInfo: action.errorInfo
      }
    default:
      return state;
  }
}
