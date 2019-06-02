import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity
} from "react-native";
import { StickerContentTypes } from "../../types";
import { screen } from "../../utils";


interface ImageAutoProps {
  uri: string
}

interface ImageAutoState {
  imgWidth: number;
  imgHeight: number;
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
      if (w >= screen.width - 200) {
        const scaleFactor = h / w;
        const imgHeight = scaleFactor * (screen.width - 200);
        this.setState({
          imgWidth: screen.width - 200,
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

  showLarge = () => {

  };

  render() {
    const { imgWidth, imgHeight } = this.state;
    return (
      <TouchableOpacity onPress={ this.showLarge }
                        activeOpacity={ 0.8 }
                        style={ { marginBottom: 5 } }>
        <Image style={ { width: imgWidth, height: imgHeight } } source={ { uri: `${ this.props.uri }` } }/>
      </TouchableOpacity>
    );
  }

}


interface Props {
  sticker: StickerContentTypes;
  out: boolean;
}

interface State {

}

class MessageSticker extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { sticker } = this.props;
    console.log('sticker', sticker)
    return (
      <View style={ [{
        maxWidth: screen.width - 200,
      }] }>
        <ImageAuto uri={ sticker.uri }/>
      </View>
    );
  }
}


export default MessageSticker;
