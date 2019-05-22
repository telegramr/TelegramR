'use strict';
import {
  Alert
} from 'react-native'
import * as types from '../constants/Types';
import { util } from "../utils";


/**
 * 选择图片, 如果不包含就插入,包含就删除,完成后并按时间戳重新排序
 * @param uri {string}
 * */
export function selectPhoto(uri) {
  return (dispatch, getState) => {
    const { selectedPhotos } = getState().messageMediaPhoto;
    let _selectedPhotos = selectedPhotos
    if (_selectedPhotos.some(item => item.uri === uri)) {
      _selectedPhotos = _selectedPhotos.filter(i => i.uri !== uri)
    } else {
      _selectedPhotos.push({ uri, timestamp: Date.now() })
    }
    _selectedPhotos = _selectedPhotos.sort(util.sortBy('timestamp'))

    console.log(_selectedPhotos);
    Alert.alert(`${_selectedPhotos.length}`)
    return {
      type: types.SELECT_PHOTO,
      selectedPhotos: _selectedPhotos
    }
  }
}

/**
 * 计算当前选择的是第几个(根据时间戳排序)
 * @param   uri {string}
 * @return  {number}
 * */
export function computedIndex(uri) {
  return (dispatch, getState) => {
    const { selectedPhotos } = getState().messageMediaPhoto;
    let num = 0
    selectedPhotos.map((item, index) => {
      if(item.uri === uri) {
        num = index + 1
      }
    })
    return num
  }
}
