import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {getSrc} from '../../utils/file';
import {isBlurredThumbnail} from '../../utils/media';
import {hasVideoNote} from '../../utils/message';
// import FileStore from '../../store/';

class ReplyTile extends React.Component {
  static ropTypes = {
    chatId: PropTypes.number.isRequired,
    messageId: PropTypes.number.isRequired,
    photoSize: PropTypes.object,
    minithumbnail: PropTypes.object,
  };

  componentDidMount() {
    // FileStore.on('clientUpdateAnimationThumbnailBlob', this.onClientUpdatePhotoBlob);
    // FileStore.on('clientUpdateAudioThumbnailBlob', this.onClientUpdatePhotoBlob);
    // FileStore.on('clientUpdateDocumentThumbnailBlob', this.onClientUpdatePhotoBlob);
    // FileStore.on('clientUpdatePhotoBlob', this.onClientUpdatePhotoBlob);
    // FileStore.on('clientUpdateStickerThumbnailBlob', this.onClientUpdatePhotoBlob);
    // FileStore.on('clientUpdateVideoThumbnailBlob', this.onClientUpdatePhotoBlob);
    // FileStore.on('clientUpdateVideoNoteThumbnailBlob', this.onClientUpdatePhotoBlob);
  }

  componentWillUnmount() {
    // FileStore.off('clientUpdateAnimationThumbnailBlob', this.onClientUpdatePhotoBlob);
    // FileStore.off('clientUpdateAudioThumbnailBlob', this.onClientUpdatePhotoBlob);
    // FileStore.off('clientUpdateDocumentThumbnailBlob', this.onClientUpdatePhotoBlob);
    // FileStore.off('clientUpdatePhotoBlob', this.onClientUpdatePhotoBlob);
    // FileStore.off('clientUpdateStickerThumbnailBlob', this.onClientUpdatePhotoBlob);
    // FileStore.off('clientUpdateVideoThumbnailBlob', this.onClientUpdatePhotoBlob);
    // FileStore.off('clientUpdateVideoNoteThumbnailBlob', this.onClientUpdatePhotoBlob);
  }

  onClientUpdatePhotoBlob = update => {
    const {chatId, messageId, photoSize} = this.props;
    if (!photoSize) {
      return;
    }

    const {photo} = photoSize;
    if (!photo) {
      return;
    }

    if (
      update.chatId === chatId &&
      update.messageId === messageId &&
      update.fileId === photo.id
    ) {
      this.forceUpdate();
    }
  };

  render() {
    const {chatId, messageId, photoSize, minithumbnail} = this.props;
    if (!photoSize) {
      return null;
    }

    const {photo} = photoSize;
    if (!photo) {
      return null;
    }

    const miniSrc = minithumbnail
      ? 'data:image/jpeg;base64, ' + minithumbnail.data
      : null;
    const src = getSrc(photo);
    const isBlurred = (!src && miniSrc) || isBlurredThumbnail(photoSize);
    const isVideoNote = hasVideoNote(chatId, messageId);
    const hasSrc = Boolean(src || miniSrc);

    return (
      <View className="reply-tile">
        {hasSrc && (
          // <Image
          //   className={
          //     ('reply-tile-photo',
          //     {'reply-tile-photo-round': isVideoNote},
          //     {'reply-tile-photo-loading': !src},
          //     {'media-blurred': src && isBlurred},
          //     {'media-mini-blurred': !src && miniSrc && isBlurred})
          //   }
          //   src={src || miniSrc}
          // />
          <Image source={{uri: src || miniSrc}} style={styles.base64} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base64: {
    flex: 1,
    height: 50,
    resizeMode: 'contain',
  },
})
export default ReplyTile;
