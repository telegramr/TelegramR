import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import PropTypes from "prop-types";
import ImageViewer from "react-native-image-zoom-viewer";
// import { Modal } from "react-native-modal";
import { color, screen } from "../../utils";
import S from "../../public/style";

interface ImageAutoProps {
  uri: string;
  index: number;
  showViewer: void;
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
    const { imgWidth, imgHeight } = this.state;
    return (
      <TouchableWithoutFeedback onPress={ () => this.props.showViewer(this.props.index) }
                                style={ { marginBottom: 5 } }>
        <Image style={ { width: imgWidth, height: imgHeight } } source={ { uri: `${ this.props.uri }` } }/>
      </TouchableWithoutFeedback>
    );
  }
}

interface ImgViewerArr {
  url: string;
  width?: number;
  height?: number;
  // Optional, if you know the image size, you can set the optimization performance
  // You can pass props to <Image />.
  props?: {
    // headers: ...
  }
}

interface Props {
  imgArr: string[];
  out?: boolean;
}

interface State {
  index: number;
  modalVisible: boolean;
}

class MessageImage extends Component<Props, State> {
  static propTypes = {
    imgArr: PropTypes.array.isRequired,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      index: 0,
      modalVisible: false
    };
  }

  showViewer = (index: number) => {
    this.setState({ modalVisible: true, index });
  };

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
    const { imgArr, out } = this.props;
    let imgViewerArr: ImgViewerArr[] = [];
    imgArr.map(i => {
      imgViewerArr.push({ url: i });
    });
    /**
     * TODO: add ImageViewer menu
     * see https://github.com/ascoders/react-native-image-viewer/pull/307
     * */
    return (
      <View style={ [out ? S.chatBubblesRight : S.chatBubblesLeft, S.shadow, {
        backgroundColor: color.white,
        maxWidth: screen.width - 120,
        padding: 3
      }] }>
        {
          imgArr.map((uri, index) => {
            return (
              <ImageAuto uri={ uri }
                         key={ index }
                         index={ index }
                         showViewer={ this.showViewer }
              />
            );
          })
        }
        <Modal
          visible={ this.state.modalVisible }
          transparent={ true }
          onRequestClose={ () => this.setState({ modalVisible: false }) }>
          <ImageViewer imageUrls={ imgViewerArr }
                       index={ this.state.index || 0 }
                       menuContext={ { saveToLocal: "保存到本地相册", cancel: "取消" } }
                       onClick={ this._closeModal }
                       onSave={ this._saveImg }
                       enableSwipeDown={ true }
                       onSwipeDown={ this._closeModal }
                       loadingRender={this._renderLoading}
                       // menus={({cancel,saveToLocal})=><Menus cancel={cancel} saveToLocal={saveToLocal}/>}
                       // footerContainerStyle={{ width: '100%' }}
                       // renderFooter={this.renderImageFooter}
          />
        </Modal>
      </View>
    );
  }
}


export default MessageImage;
