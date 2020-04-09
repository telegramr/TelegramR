import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {getSrc} from '../../../utils/file';
import {getSize, getFitSize, getScaleImageSize} from '../../../utils/common';
import {Sizes} from '../../../theme';
import {ImageAuto} from '../../index';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export default class Photo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoScaleSize: {
        width: 0,
        height: 0,
      },
    };
  }

  static getDerivedStateFromProps(props, state) {
    const {photo, size, thumbnailSize} = props;
    if (photo !== state.prevPhoto) {
      const photoSize = getSize(photo.sizes, size);
      return {
        prevPhoto: photo,
        photoSize: getSize(photo.sizes, size),
        thumbSize: getSize(photo.sizes, thumbnailSize),
        minithumbnail: photo ? photo.minithumbnail : null,
      };
    }

    return null;
  }

  // TODO: react-native-async-function-returns-promise _44 _55
  // see https://stackoverflow.com/questions/45200723/react-native-async-function-returns-promise-but-not-my-json-data
  async componentDidMount() {
    const {chatId, messageId} = this.props;
    console.log('messageId', messageId);
    const photo = getSrc(messageId);
    if (!photo || !photo.src) {
      return;
    }
    const photoScaleSize = await getScaleImageSize(
      photo.src,
      Sizes.width - 120,
    );
    this.setState({
      photoScaleSize,
    });
    // console.log(this.props.photo)
  }

  renderContent = (uri, width) => <ImageAuto uri={uri} width={width} />;

  render() {
    const {chatId, messageId} = this.props;
    const {
      className,
      displaySize = Sizes.width - 120,
      openMedia,
      showProgress,
      title,
      caption,
      type,
      style,
    } = this.props;
    const {thumbSize, photoSize, minithumbnail, photoScaleSize} = this.state;

    if (!photoSize) {
      return null;
    }

    // const miniSrc = minithumbnail ? 'data:image/jpeg;base64, ' + minithumbnail.data : null;
    // const thumbSrc = getSrc(thumbSize ? thumbSize.photo : null);
    // const src = getSrc(photoSize.photo);
    // const isBlurred = (!thumbSrc && miniSrc) || isBlurredThumbnail(thumbSize);

    const fitPhotoSize = getFitSize(photoSize, displaySize, false);
    if (!fitPhotoSize) {
      return null;
    }

    let photo = getSrc(messageId);
    console.log('photo image id', messageId);
    // console.log(photo);
    if (!photo || !photo.src) {
      photo = {
        id: messageId,
        src: 'https://wx2.sinaimg.cn/images/default_d_h_mw690.gif',
        large: 'https://wx2.sinaimg.cn/images/default_d_h_mw690.gif',
      };
    }
    const photoStyle = {
      width: fitPhotoSize.width - 4,
      height: fitPhotoSize.height - 4,
      ...style,
    };
    return (
      <TouchableWithoutFeedback
        onPress={openMedia}
        style={[
          styles.photo,
          type === 'message' && styles.photoBig,
          caption && styles.photoCaption,
        ]}>
        <SharedElement id={messageId} style={{photoStyle}}>
          <Image
            style={{
              flex: 1,
              ...photoStyle,
            }}
            resizeMode="cover"
            source={{uri: photo.src}}
          />
        </SharedElement>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  photo: {
    borderRadius: 6,
    overflow: 'hidden',
  },
  photoBig: {
    marginHorizontal: -7,
    marginVertical: -4,
  },
  photoCaption: {
    marginBottom: 6,
  },
});
