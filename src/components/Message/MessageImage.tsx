import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import {connect} from "react-redux";
import { ImageContentTypes, ImgViewerArrTypes } from "../../types";
import { color, screen } from "../../utils";
import S from "../../public/style";
import * as imageViewerAction from "../../actions/imageViewerAction";
import { ImageViewerActionTypes } from "../../reducers/imageViewerReducer";


interface ImageAutoProps {
  uri: string;
  index: number;
  showImgViewer: typeof imageViewerAction.showImgViewer;
  img: ImageContentTypes[];
}

interface ImageAutoState {
  imgWidth?: number;
  imgHeight?: number;
}

class ImageAuto extends Component<ImageAutoProps, ImageAutoState> {
  state = {
    imgWidth: 0,
    imgHeight: 0,
  };

  componentDidMount() {
    const { uri } = this.props;
    // @ts-ignore
    Image.getSize(`${ uri }`, (w, h) => {
      if (w >= screen.width - 120) {
        const scaleFactor = h / w;
        const imgHeight = scaleFactor * (screen.width - 120);
        this.setState({
          imgWidth: screen.width - 120,
          imgHeight
        });
      } else {
        this.setState({
          imgWidth: w,
          imgHeight: h
        });
      }
    });
  }

  render() {
    const { showImgViewer, index, uri, img} = this.props
    const { imgWidth, imgHeight } = this.state;
    let imgViewerArr = []
    img.map(i => {
      imgViewerArr.push({url: i.uri})
    })
    const imgViewObj = {
      index,
      imgViewerArr
    }
    return (
      <TouchableWithoutFeedback onPress={ () => showImgViewer(imgViewObj) }
                                style={ { marginBottom: 5 } }>
        <Image style={ { width: imgWidth, height: imgHeight } } source={ { uri } }/>
      </TouchableWithoutFeedback>
    );
  }
}

interface Props {
  img: ImageContentTypes[];
  out: boolean;
  showImageViewer: boolean;
  index: number;
  imgViewerArr: ImgViewerArrTypes[];
  showImgViewer: typeof imageViewerAction.showImgViewer;
}

interface State {
  index: number;
  modalVisible: boolean;
}

class MessageImage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      index: 0,
      modalVisible: false
    };
  }

  _closeModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  _saveImg = () => {
    console.log("save");
  };

  _renderLoading = () => {
    return (
      <ActivityIndicator/>
    )
  }

  renderImageFooter = () => {
    return (
      <View style={{ height: 100, backgroundColor: 'red' }}>
        <Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }}>Footer</Text>
      </View>
    )
  };

  render() {
    const { out, imgViewerArr, showImgViewer, img } = this.props;
    return (
      <View style={ [out ? S.chatBubblesRight : S.chatBubblesLeft, S.shadow, {
        backgroundColor: color.white,
        maxWidth: screen.width - 120,
        padding: 3
      }] }>
        {
          img.map((i, _index) => {
            return (
              <ImageAuto {...i}
                         key={ _index }
                         index={ _index }
                         img={img}
                         showImgViewer={ showImgViewer }
              />
            );
          })
        }
        {/*<Modal*/}
        {/*  visible={ this.state.modalVisible }*/}
        {/*  transparent={ true }*/}
        {/*  onRequestClose={ () => this.setState({ modalVisible: false }) }>*/}
        {/*  <ImageViewer imageUrls={ imgViewerArr }*/}
        {/*               index={ this.state.index || 0 }*/}
        {/*               menuContext={ { saveToLocal: "保存到本地相册", cancel: "取消" } }*/}
        {/*               onClick={ this._closeModal }*/}
        {/*               onSave={ this._saveImg }*/}
        {/*               enableSwipeDown={ true }*/}
        {/*               onSwipeDown={ this._closeModal }*/}
        {/*               loadingRender={this._renderLoading}*/}
        {/*               // menus={({cancel,saveToLocal})=><Menus cancel={cancel} saveToLocal={saveToLocal}/>}*/}
        {/*               // footerContainerStyle={{ width: '100%' }}*/}
        {/*               // renderFooter={this.renderImageFooter}*/}
        {/*  />*/}
        {/*</Modal>*/}
      </View>
    );
  }
}


export default connect(
  (state) => ({
    imgViewerArr: state.imageViewer.imgViewerArr,
  }),
  (dispatch) => ({
    showImgViewer: (imgViewObj: ImageViewerActionTypes) => dispatch(imageViewerAction.showImgViewer(imgViewObj)),
  })
)(MessageImage);
