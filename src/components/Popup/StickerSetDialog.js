import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Keyboard,
  Animated,
  TouchableOpacity,
  BackHandler,
  Platform,
  ScrollView,
  FlatList,
} from 'react-native';
import {compose} from 'recompose';
import {withTranslation} from 'react-i18next';
import StickerStore from '../../store/stickerStore';
import Sticker, {StickerSourceEnum} from '../Message/Media/Sticker';
import {STICKER_SMALL_DISPLAY_SIZE} from '../../constants/Constants';
import Modal from 'react-native-modal';
import {Base, Colors, Sizes} from '../../theme';
import {isEqual} from 'lodash';

class StickerSetDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stickerSet: null,
      stickerId: 0,
      scrollOffset: 0,
    };
    this.actionMenuAnimated = new Animated.Value(0);
    this.flatListRef = null;
  }

  componentDidMount() {
    const stickerSet = StickerStore.stickerSet;
    this.setState({
      stickerSet,
    });
  }

  handleMouseEnter = event => {};

  handleMouseDown = event => {};

  handleOnScroll = event => {
    const scrollOffset = event.nativeEvent.contentOffset.y;
    this.setState({
      scrollOffset,
    });
  };

  close = () => {
    this.props.handleSetMenuDialog(false);
  };

  handleScrollTo = p => {
    if (this.flatListRef) {
      this.flatListRef.scrollToOffset(p);
    }
  };

  renderStickerList = stickers => {
    return (
      <FlatList
        ref={ref => (this.flatListRef = ref)}
        onScroll={this.handleOnScroll}
        showsVerticalScrollIndicator={false}
        data={stickers}
        extraData={this.state}
        keyExtractor={(_item, index) => `${index}`}
        renderItem={this.renderStickerListItem}
        numColumns={5}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      />
    );
  };

  renderStickerListItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={item.sticker.id}
        data-sticker-id={item.sticker.id}
        style={styles.stickerItemContainer}
        onMouseEnter={this.handleMouseEnter}
        onMouseDown={this.handleMouseDown}>
        <Sticker
          key={item.sticker.id}
          sticker={item}
          autoplay={false}
          blur={false}
          displaySize={STICKER_SMALL_DISPLAY_SIZE}
          // TODO: add preview
          // preview
          source={StickerSourceEnum.STICKER_SET}
        />
        <Text style={styles.itemEmoji}>{item.emoji}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {t, isVisible} = this.props;
    const {stickerSet, sticker, scrollOffset} = this.state;
    if (!stickerSet) {
      return null;
    }
    const {title, stickers, is_installed} = stickerSet;

    return (
      <Modal
        isVisible={isVisible}
        onSwipeComplete={this.close}
        onBackdropPress={this.close}
        onBackButtonPress={this.close}
        onModalWillShow={this.onModalWillShow}
        swipeDirection={['down']}
        scrollTo={this.handleScrollTo}
        scrollOffset={scrollOffset}
        scrollOffsetMax={600 - 400} // content height - ScrollView height
        style={styles.modal}>
        <View style={[styles.thumbImgContainer]}>
          <View style={styles.thumbImgHeader}>
            <View style={styles.thumbImgHeaderTip} />
          </View>
          <View style={styles.dialogHeader}>
            <Text style={styles.dialogTitle}>{title}</Text>
          </View>
          <View style={styles.renderStickerListOuter}>
            {this.renderStickerList(stickers)}
          </View>
        </View>
        <TouchableOpacity activeOpacity={1} style={styles.dialogFooterAction}>
          <Text style={styles.dialogFooterActionText}>
            {is_installed ? t('StickersRemove') : t('Add')}
          </Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  stickerItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: (Sizes.width - 20) / 5,
    height: (Sizes.width - 20) / 5,
    position: 'relative',
  },
  itemEmoji: {
    position: 'absolute',
    right: 6,
    bottom: 6,
  },
  thumbImgContainer: {
    height: 400,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.white,
  },
  renderStickerListOuter: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  dialogHeader: {
    paddingBottom: 8,
    paddingHorizontal: 10,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  thumbImgHeader: {
    ...Base.flexCenter,
    height: 22,
  },
  thumbImgHeaderTip: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
  },
  scrollableModalContent1: {
    height: 600,
    backgroundColor: '#87BBE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText1: {
    fontSize: 20,
    color: 'white',
  },
  actionMenuContent: {
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Sizes.width / 4,
    height: Sizes.width / 4,
    borderTopWidth: Sizes.onePixel,
    borderTopColor: Colors.borderOne,
    backgroundColor: Colors.white,
  },
  actionCircular: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionImg: {
    width: 32,
    height: 32,
  },
  actionText: {
    fontSize: 12,
    color: Colors.gray,
    marginTop: 5,
  },
  imgItem: {
    ...Base.flexCenter,
    width: Sizes.width / 3 - 3,
    marginVertical: 1,
    overflow: 'hidden',
    paddingBottom: 1,
    marginHorizontal: 1,
  },
  inputMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    ...Base.flexCenter,
    width: Sizes.width / 3 - 3,
    height: Sizes.width / 3 - 3,
    overflow: 'hidden',
  },
  photoImg: {
    width: Sizes.width / 3 - 3,
    height: Sizes.width / 3 - 3,
  },
  itemNum: {
    ...Base.flexCenter,
    width: 22,
    height: 22,
    borderRadius: 11,
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: Colors.blueLight,
  },
  dialogFooterAction: {
    ...Base.flexCenter,
    height: 50,
    backgroundColor: Colors.white,
    borderTopWidth: Sizes.onePixel,
    borderTopColor: Colors.borderOne,
  },
  dialogFooterActionText: {
    fontSize: 16,
    color: Colors.colorAccentMain,
  },
});

const enhance = compose(withTranslation());

export default enhance(StickerSetDialog);
