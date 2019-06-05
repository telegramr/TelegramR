import React, { Component } from "react";
import {
  StyleSheet,
  Modal,
} from "react-native";
import { connect } from "react-redux";
import { ImgViewerArrTypes } from "../types";
import ImageViewer from "react-native-image-zoom-viewer";
import {SafeAreaView} from "react-navigation";
import * as imageViewerAction from "../actions/imageViewerAction";
import { ImageViewerActionTypes } from "../reducers/imageViewerReducer";
import { AppState } from "../store/ConfigureStore";


interface Props {
  showImageViewer: boolean;
  index: number;
  imgViewerArr: ImgViewerArrTypes[];
  showImgViewer: typeof imageViewerAction.showImgViewer;
  closeImgViewer: typeof imageViewerAction.closeImgViewer;
}

interface State {
}

class ImageViewerC extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const { showImageViewer, imgViewerArr, index, closeImgViewer } = this.props;
    console.log(showImageViewer)
    if(showImageViewer) {
      console.log(showImageViewer, imgViewerArr, index, closeImgViewer)
    }
    return (
      <Modal
        visible={ showImageViewer }
        transparent={ true }
        onRequestClose={ () => closeImgViewer() }>
        <ImageViewer imageUrls={ imgViewerArr }
                     index={ index }
                     menuContext={ { saveToLocal: "保存到本地相册", cancel: "取消" } }
                     onClick={ closeImgViewer }
                     enableSwipeDown={ true }
                     onSwipeDown={ closeImgViewer }
          // onSave={ this._saveImg }
          // loadingRender={this._renderLoading}
          // menus={({cancel,saveToLocal})=><Menus cancel={cancel} saveToLocal={saveToLocal}/>}
          // footerContainerStyle={{ width: '100%' }}
          // renderFooter={this.renderImageFooter}
        />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(
  (state: AppState) => ({
    showImageViewer: state.imageViewer.showImageViewer,
    imgViewerArr: state.imageViewer.imgViewerArr,
    index: state.imageViewer.index,
  }),
  (dispatch) => ({
    showImgViewer: (imgViewObj: ImageViewerActionTypes) => dispatch(imageViewerAction.showImgViewer(imgViewObj)),
    closeImgViewer: () => dispatch(imageViewerAction.closeImgViewer())
  })
)(ImageViewerC);
