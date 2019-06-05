"use strict";

import * as types from "../constants/Types";
import {ImageViewerActionTypes} from "../reducers/imageViewerReducer";


export function showImgViewer(imgViewObj: ImageViewerActionTypes) {
  console.log('imgViewObj', imgViewObj)
  return {
    type: types.SHOW_IMAGEVIEWER,
    imgViewObj
  };
}

export function closeImgViewer() {
  return {
    type: types.CLOSE_IMAGEVIEWER
  };
}
