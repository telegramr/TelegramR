import * as types from "../constants/Types";
import { ImgViewerArrTypes, ImgViewerTypes } from "../types";

export interface ImageViewerActionTypes {
  index: number;
  imgViewerArr: ImgViewerArrTypes[];
}

const initialState: ImgViewerTypes = {
  showImageViewer: false,
  index: 0,
  imgViewerArr: [
    { url: "https://lain.bgm.tv/pic/cover/l/f2/9f/28900_PB3pC.jpg" },
    { url: "https://lain.bgm.tv/pic/cover/l/ee/2a/19696_23iP3.jpg" },
    { url: "https://lain.bgm.tv/pic/cover/l/43/d9/14588_bDB2r.jpg" }
  ]
};

export default function imageViewer(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case types.SHOW_IMAGEVIEWER:
      return {
        ...action.imgViewObj,
        showImageViewer: true,
      };
    case types.CLOSE_IMAGEVIEWER:
      return {
        ...state,
        showImageViewer: false
      };
    default:
      return state;
  }
}
