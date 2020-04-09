import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Lottie from 'lottie-react-native';
import {isBlurredThumbnail, isValidAnimatedSticker} from '../../../utils/media';
import {getFitSize, getStaticStickerData} from '../../../utils/common';
import {getBlob, getSrc} from '../../../utils/file';
// import { inflateBlob } from '../../../Workers/BlobInflator';
import {STICKER_DISPLAY_SIZE} from '../../../constants/Constants';
import ApplicationStore from '../../../store/applicationStore';
import FileStore from '../../../store/fileStore';
import MessageStore from '../../../store/messageStore';
import StickerStore from '../../../store/stickerStore';
import InstantViewStore from '../../../store/instantViewStore';
import {Colors, Sizes} from '../../../theme';

export const StickerSourceEnum = Object.freeze({
  HINTS: 'HINTS',
  MESSAGE: 'MESSAGE',
  PICKER_HEADER: 'PICKER_HEADER',
  PICKER: 'PICKER',
  PREVIEW: 'PREVIEW',
  STICKER_SET: 'STICKER_SET',
  UNKNOWN: 'UNKNOWN',
});

class Sticker extends Component {
  static propTypes = {
    chatId: PropTypes.number,
    messageId: PropTypes.number,
    sticker: PropTypes.object.isRequired,
    openMedia: PropTypes.func,

    autoplay: PropTypes.bool,
    play: PropTypes.bool,
    blur: PropTypes.bool,
    displaySize: PropTypes.number,
    preview: PropTypes.bool,
    source: PropTypes.string,
  };

  static defaultProps = {
    chatId: 0,
    messageId: 0,
    openMedia: () => {},

    autoplay: true,
    play: true,
    blur: true,
    displaySize: STICKER_DISPLAY_SIZE,
    preview: false,
    source: StickerSourceEnum.UNKNOWN,
  };

  constructor(props) {
    super(props);

    this.lottieRef = React.createRef();
    this.windowFocused = window.hasFocus;
    this.inView = false;
    this.stickerPreview = StickerStore.stickerPreview;
    this.openMediaViewer = Boolean(ApplicationStore.mediaViewerContent);
    this.openProfileMediaViewer = Boolean(
      ApplicationStore.profileMediaViewerContent,
    );
    this.openIV = Boolean(InstantViewStore.getCurrent());
    this.dialogChatId = ApplicationStore.dialogChatId;

    this.state = {
      animationDate: null,
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    console.log('[Sticker] render error', error, errorInfo);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const {chatId, messageId, sticker, blur, displaySize} = this.props;
    const {animationData} = this.state;

    if (animationData !== nextState.animationData) {
      return true;
    }

    if (chatId !== nextProps.chatId) {
      return true;
    }

    if (messageId !== nextProps.messageId) {
      return true;
    }

    if (sticker !== nextProps.sticker) {
      return true;
    }

    if (blur !== nextProps.blur) {
      return true;
    }

    if (displaySize !== nextProps.displaySize) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.sticker !== this.props.sticker) {
      this.loadContent();
    }
  }

  componentDidMount() {
    this.loadContent();

    ApplicationStore.on(
      'clientUpdateDialogChatId',
      this.onClientUpdateDialogChatId,
    );
    ApplicationStore.on(
      'clientUpdateFocusWindow',
      this.onClientUpdateFocusWindow,
    );
    ApplicationStore.on(
      'clientUpdateMediaViewerContent',
      this.onClientUpdateMediaViewerContent,
    );
    ApplicationStore.on(
      'clientUpdateProfileMediaViewerContent',
      this.onClientUpdateProfileMediaViewerContent,
    );
    InstantViewStore.on(
      'clientUpdateInstantViewContent',
      this.onClientUpdateInstantViewContent,
    );
    FileStore.on(
      'clientUpdateStickerThumbnailBlob',
      this.onClientUpdateStickerThumbnailBlob,
    );
    FileStore.on('clientUpdateStickerBlob', this.onClientUpdateStickerBlob);
    MessageStore.on(
      'clientUpdateMessagesInView',
      this.onClientUpdateMessagesInView,
    );
    StickerStore.on(
      'clientUpdateStickerPreview',
      this.onClientUpdateStickerPreview,
    );
    StickerStore.on('clientUpdateStickerSet', this.onClientUpdateStickerSet);
  }

  componentWillUnmount() {
    ApplicationStore.off(
      'clientUpdateDialogChatId',
      this.onClientUpdateDialogChatId,
    );
    ApplicationStore.off(
      'clientUpdateFocusWindow',
      this.onClientUpdateFocusWindow,
    );
    ApplicationStore.off(
      'clientUpdateMediaViewerContent',
      this.onClientUpdateMediaViewerContent,
    );
    ApplicationStore.off(
      'clientUpdateProfileMediaViewerContent',
      this.onClientUpdateProfileMediaViewerContent,
    );
    InstantViewStore.off(
      'clientUpdateInstantViewContent',
      this.onClientUpdateInstantViewContent,
    );
    FileStore.off(
      'clientUpdateStickerThumbnailBlob',
      this.onClientUpdateStickerThumbnailBlob,
    );
    FileStore.off('clientUpdateStickerBlob', this.onClientUpdateStickerBlob);
    MessageStore.off(
      'clientUpdateMessagesInView',
      this.onClientUpdateMessagesInView,
    );
    StickerStore.off(
      'clientUpdateStickerPreview',
      this.onClientUpdateStickerPreview,
    );
    StickerStore.off('clientUpdateStickerSet', this.onClientUpdateStickerSet);
  }

  onClientUpdateInstantViewContent = update => {
    this.openIV = Boolean(InstantViewStore.getCurrent());

    this.startStopAnimation();
  };

  onClientUpdateDialogChatId = update => {
    this.dialogChatId = ApplicationStore.dialogChatId;

    this.startStopAnimation();
  };

  onClientUpdateMediaViewerContent = update => {
    this.openMediaViewer = Boolean(ApplicationStore.mediaViewerContent);

    this.startStopAnimation();
  };

  onClientUpdateProfileMediaViewerContent = update => {
    this.openProfileMediaViewer = Boolean(
      ApplicationStore.profileMediaViewerContent,
    );

    this.startStopAnimation();
  };

  onClientUpdateStickerPreview = update => {
    this.stickerPreview = update.sticker;

    this.startStopAnimation();
  };

  onClientUpdateMessagesInView = update => {
    const {chatId, messageId} = this.props;
    const key = `${chatId}_${messageId}`;

    this.inView = update.messages.has(key);

    this.startStopAnimation();
  };

  onClientUpdateStickerSet = update => {
    const {stickerSet} = update;

    this.openedStickerSet = stickerSet;

    this.startStopAnimation();
  };

  onClientUpdateFocusWindow = update => {
    const {focused} = update;
    const {chatId, messageId, sticker} = this.props;

    const isAnimated = isValidAnimatedSticker(sticker, chatId, messageId);
    if (!isAnimated) {
      return;
    }

    this.windowFocused = focused;
    this.startStopAnimation();
  };

  startStopAnimation() {
    const {autoplay} = this.props;
    const player = this.lottieRef.current;
    if (!player) {
      return;
    }
    player.play();
    // TODO: play and paused
    // true undefined false false false 0
    // console.log('startStopAnimation========================>',
    //   this.windowFocused,
    // this.stickerPreview,
    // this.openMediaViewer,
    // this.openProfileMediaViewer,
    // this.openIV,
    // this.dialogChatId)

    if (
      this.windowFocused &&
      !this.stickerPreview &&
      !this.openMediaViewer &&
      !this.openProfileMediaViewer &&
      !this.openIV &&
      !this.dialogChatId
    ) {
      console.log('[Sticker] play 1');
      if (this.entered) {
        // console.log('[Sticker] play 1');
        player.play();
        this.pause = false;
        return;
      }

      // console.log('[Sticker] startStopAnimation', this.openedStickerSet);
      console.log('[Sticker] startStopAnimation');
      if (!this.openedStickerSet) {
        if (this.paused) {
          console.log('[Sticker] play 2');
          player.play();
          this.paused = false;
          return;
        }

        if (autoplay && this.inView) {
          console.log('[Sticker] play 3');
          player.play();
          this.paused = false;
          return;
        }
      }
    }

    console.log('[Sticker] pause');
    // this.paused = player.pause();
  }

  onClientUpdateStickerBlob = update => {
    const {sticker, is_animated} = this.props.sticker;
    const {fileId} = update;

    if (!sticker) {
      return;
    }

    if (sticker.id === fileId) {
      if (is_animated) {
        this.loadContent();
      } else {
        this.forceUpdate();
      }
    }
  };

  onClientUpdateStickerThumbnailBlob = update => {
    const {thumbnail} = this.props.sticker;
    if (!thumbnail) {
      return;
    }

    const {fileId} = update;

    if (thumbnail.photo && thumbnail.photo.id === fileId) {
      this.forceUpdate();
    }
  };

  loadContent = async () => {
    const {chatId, messageId, sticker: source, autoplay, play} = this.props;
    const {is_animated, sticker} = source;
    const isAnimated = isValidAnimatedSticker(source, chatId, messageId);

    if (!is_animated) {
      return;
    }
    if (!isAnimated) {
      return;
    }
    if (!play) {
      return;
    }
    // const blob = getBlob(sticker);
    // if (!blob) {
    //   return;
    // }

    let animationData = null;
    try {
      let stickerLocalPath = sticker.local.path;
      // TODO: get sticker id
      if (!stickerLocalPath) {
        return;
      }
      let stickerId = stickerLocalPath.match(/\d+/)[0];
      // animationData = StickerStore.getAnimationData(blob);
      // if (animationData) {
      //     this.setState({ animationData });
      //     return;
      // }
      // TODO: worker
      // const result = await inflateBlob(blob);
      const result = getStaticStickerData(stickerId);
      if (!result) {
        return;
      }

      animationData = result.data;
    } catch (err) {
      console.log('[Sticker] loadContent error', err);
    }
    if (!animationData) {
      return;
    }
    if (autoplay) {
      this.setState({animationData});
    } else {
      this.animationData = animationData;
    }
  };

  handleMouseEnter = event => {
    const {animationData} = this;
    // console.log('[Sticker] handleMouseEnter', animationData);
    if (animationData) {
      this.setState({animationData}, () => {
        this.handleAnimationMouseEnter();
      });
    }
  };

  handleAnimationMouseEnter = () => {
    // console.log('[Sticker] handleAnimationMouseEnter 1');
    if (this.props.autoplay) {
      return;
    }

    this.entered = true;

    const player = this.lottieRef.current;
    if (!player) {
      return;
    }

    // console.log('[Sticker] handleAnimationMouseEnter 2');
    this.loopCount = 0;
    this.startStopAnimation();
  };

  handleAnimationLoopComplete = () => {
    if (this.props.autoplay) {
      return;
    }

    const player = this.lottieRef.current;
    if (!player) {
      return;
    }

    if (!this.entered) {
      this.loopCount += 1;
    }
    if (this.loopCount > 2) {
      const {animationData} = this.state;
      if (animationData) {
        this.setState({animationData: null});
      }
    }
  };

  handleAnimationMouseOut = () => {
    this.entered = false;
  };

  render() {
    const {
      chatId,
      messageId,
      autoplay,
      className,
      displaySize,
      blur,
      sticker: source,
      style,
      openMedia,
      preview,
    } = this.props;
    const {thumbnail, sticker, width, height} = source;
    const {animationData, hasError, stickerId} = this.state;

    const isAnimated = isValidAnimatedSticker(source, chatId, messageId);

    const thumbnailSrc = getSrc(thumbnail ? thumbnail.photo : null);
    const remoteId = sticker.remote.id;
    const img = getSrc(remoteId);
    const src = (img && img.src) || '';

    const isBlurred = isBlurredThumbnail(thumbnail);

    if (hasError) {
      const style = {
        width: displaySize,
        height: displaySize,
      };

      if (__DEV__) {
        style.background = '#ff000066';
      }

      return (
        <TouchableOpacity activeOpacity={1} className={'sticker'} style={style} onPress={openMedia}>
          <Image
            // className={classNames('sticker-image', { 'media-blurred': isBlurred && blur })}
            source={{uri: thumbnailSrc}}
          />
        </TouchableOpacity>
      );
    }

    let content = null;
    const fitSize = getFitSize({width: width, height: height}, displaySize);
    if (fitSize) {
      content = isAnimated ? (
        <>
          {animationData ? (
            <Lottie
              ref={this.lottieRef}
              source={animationData}
              autoplay={autoplay}
              loop={true}
              // eventListeners={[
              //   {
              //     eventName: 'loopComplete',
              //     callback: this.handleAnimationLoopComplete,
              //   },
              // ]}
              // onMouseOut={this.handleAnimationMouseOut}
              onAnimationFinish={this.handleAnimationLoopComplete}
              enableMergePathsAndroidForKitKatAndAbove
            />
          ) : (
            <Image
              // className={classNames('sticker-image', { 'media-blurred': isBlurred && blur })}
              source={{uri: thumbnailSrc}}
            />
          )}
        </>
      ) : (
        <>
          {src && !preview ? (
            <Image
              className="sticker-image"
              draggable={false}
              source={{uri: src}}
              style={{flex: 1, width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          ) : (
            <Image
              style={{flex: 1, width: '100%', height: '100%'}}
              resizeMode="cover"
              // className={classNames('sticker-image', { 'media-blurred': isBlurred && blur })}
              source={{uri: thumbnailSrc}}
            />
          )}
        </>
      );
    }

    const stickerStyle = {
      width: fitSize ? fitSize.width : 0,
      height: fitSize ? fitSize.height : 0,
      ...style,
    };
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={stickerStyle}
        onPress={openMedia}
        // onPress={() => this.startStopAnimation()}
        onMouseEnter={this.handleMouseEnter}>
        {content}
      </TouchableOpacity>
    );
  }
}

export default Sticker;
