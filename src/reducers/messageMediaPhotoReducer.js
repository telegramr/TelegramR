import * as types from '../constants/Types';

const initialState = {
  photos: [
    { uri: 'https://pic.xiami.net/images/album/img23/89023/5652761355984643.jpg?x-oss-process=image/resize,limit_0,s_410,m_fill' },
    { uri: 'https://pic.xiami.net/images/album/img20/43320/433201439043320.jpg?x-oss-process=image/resize,limit_0,s_410,m_fill' },
    { uri: 'https://pic.xiami.net/images/album/img23/89023/1073148121407314812.jpg?x-oss-process=image/resize,limit_0,s_410,m_fill' },
    { uri: 'https://pic.xiami.net/images/album/img99/951599/9515991412951599.jpg?x-oss-process=image/resize,limit_0,s_410,m_fill' },
    { uri: 'https://pic.xiami.net/images/album/img19/957019/9570191419957019.jpg?x-oss-process=image/resize,limit_0,s_410,m_fill' },
  ],
  selectedPhotos: []
}


export default function messageMediaPhoto(state = initialState, action) {
  switch (action.type) {
    case types.SELECT_PHOTO:
      return {
        ...state,
        selectedPhotos: action.selectedPhotos
      }
    default:
      return state;
  }
}
