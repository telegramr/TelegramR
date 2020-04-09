import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import ChatStore from '../../store/chatStore';
import {
  PHOTO_SIZE,
  PHOTO_DISPLAY_SIZE,
  PHOTO_THUMBNAIL_SIZE,
} from '../../constants/Constants';
// import {getSrc} from '../../utils/file';
// import {getFitSize} from '../../utils/common';
// import {isBlurredThumbnail} from '../../utils/media';
import {Base, Colors} from '../../theme';
import {getChatLetters} from '../../utils/chat';
import CheckMarkIcon from '../animations/CheckMarkIcon';
import {PropsStyle} from '../../constants/Types';

export default class ChatTile extends Component {
  static propTypes = {
    radius: PropTypes.number,
    chatId: PropTypes.number,
    messageId: PropTypes.number,
    photo: PropTypes.object.isRequired,
    openMedia: PropTypes.func,
    showProgress: PropTypes.bool,
    size: PropTypes.number,
    thumbnailSize: PropTypes.number,
    displaySize: PropTypes.number,
    checked: PropTypes.bool,
    style: PropsStyle,
  };

  static defaultProps = {
    size: PHOTO_SIZE,
    radius: 40,
    thumbnailSize: PHOTO_THUMBNAIL_SIZE,
    displaySize: PHOTO_DISPLAY_SIZE,
    showProgress: true,
    checked: false,
    style: {},
  };

  static getDerivedStateFromProps(props, state) {
    // const { photo, size, thumbnailSize } = props;
    // if (photo !== state.prevPhoto) {
    //   return {
    //     prevPhoto: photo,
    //     photoSize: getSize(photo.sizes, size),
    //     thumbSize: getSize(photo.sizes, thumbnailSize),
    //     minithumbnail: photo ? photo.minithumbnail : null
    //   };
    // }

    return null;
  }

  componentDidMount() {}

  componentWillUnmount() {}

  onClientUpdatePhotoBlob = update => {
    // const { photoSize, thumbSize } = this.state;
    // const { fileId } = update;
    //
    // if (photoSize && photoSize.photo && photoSize.photo.id === fileId) {
    //   this.forceUpdate();
    // } else if (thumbSize && thumbSize.photo && thumbSize.photo.id === fileId) {
    //   this.forceUpdate();
    // }
  };

  render() {
    const {
      chatId,
      radius,
      className,
      displaySize,
      openMedia,
      showProgress,
      title,
      caption,
      type,
      checked,
      style,
    } = this.props;
    // const {thumbSize, photoSize, minithumbnail} = this.state;
    //
    // if (!photoSize) {
    //   return null;
    // }
    const styleR = {
      alignSelf: 'flex-end',
      height: radius,
      width: radius,
      borderRadius: radius / 2,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    };
    // const miniSrc = minithumbnail
    //   ? 'data:image/jpeg;base64, ' + minithumbnail.data
    //   : null;
    // const thumbSrc = getSrc(thumbSize ? thumbSize.photo : null);
    // const src = getSrc(photoSize.photo);
    // const isBlurred = (!thumbSrc && miniSrc) || isBlurredThumbnail(thumbSize);
    //
    // const fitPhotoSize = getFitSize(photoSize, displaySize, false);
    // if (!fitPhotoSize) {
    //   return null;
    // }
    //
    // const photoStyle = {
    //   width: fitPhotoSize.width,
    //   height: fitPhotoSize.height,
    //   ...style,
    // };
    //
    // const hasSrc = Boolean(src || thumbSrc || miniSrc);
    //
    // return (
    //   <View
    //     // className={classNames(className, 'photo', {
    //     //   'photo-big': type === 'message',
    //     //   'photo-title': title,
    //     //   'photo-caption': caption,
    //     //   pointer: openMedia,
    //     // })}
    //     style={photoStyle}
    //     onClick={openMedia}>
    //     {hasSrc && (
    //       <Image
    //         // className={classNames('photo-image', {
    //         //   'media-blurred': !src && isBlurred,
    //         //   'media-mini-blurred': !src && !thumbSrc && isBlurred
    //         // })}
    //         src={{uri: src || thumbSrc || miniSrc}}
    //         style={styleR}
    //       />
    //     )}
    //     {/*{showProgress && <FileProgress file={photoSize.photo} download upload cancelButton />}*/}
    //   </View>
    // );
    const chat = ChatStore.get(chatId);
    if (!chat) {
      return null;
    }
    const tileColor = Math.abs(chatId) % 8;
    const letters = getChatLetters(chat);
    return (
      <View>
        <View
          style={[
            styleR,
            style,
            {backgroundColor: Colors.UserColors[tileColor]},
          ]}>
          <View className="tile-photo">
            <Text style={Base.chatsName}>{letters}</Text>
          </View>
        </View>
        {checked && (
          <CheckMarkIcon
            autoPlay={true}
            style={{width: 75, position: 'absolute', right: -10, bottom: -15}}
          />
        )}
      </View>
    );
  }
}
