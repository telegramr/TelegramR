import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Animated,
  Easing,
  PermissionsAndroid,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import {Base, Colors, Sizes} from '../../theme';
import {sortBy} from '../../utils/common';
import {isEqual} from 'lodash';

const menuActions = [
  {
    title: '相册',
    img: require('../../static/images/attach/attach_gallery.png'),
    backgroundColor: Colors.BackgroundBlue,
  },
  {
    title: '文件',
    img: require('../../static/images/attach/attach_file.png'),
    backgroundColor: Colors.BackgroundCyan,
  },
  {
    title: '位置',
    img: require('../../static/images/attach/attach_location.png'),
    backgroundColor: Colors.BackgroundGreen,
  },
  {
    title: '联系人',
    img: require('../../static/images/attach/attach_contact.png'),
    backgroundColor: Colors.BackgroundOrange,
  },
  {
    title: '音乐',
    img: require('../../static/images/attach/attach_audio.png'),
    backgroundColor: Colors.BackgroundRed,
  },
];

export default class MenuDialog extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      selectedPhotos: [],
      scrollOffset: 0,
    };
    this.actionCircularAnimated = new Animated.Value(0);
    this.actionMenuAnimated = new Animated.Value(0);
    this.flatListRef = null;
  }

  componentDidMount() {
    this.getRecentPhotos();
  }

  requestReadPermission = async () => {
    const isChecked = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    console.log(isChecked);
    if (isChecked) {
      return;
    }
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: '申请文件读取权限',
          message: '获取读取您的文件系统',
          buttonNeutral: '稍后询问',
          buttonNegative: '不允许',
          buttonPositive: '允许',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('允许');
      } else {
        console.log('不允许');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  getRecentPhotos = async () => {
    await this.requestReadPermission();
    CameraRoll.getPhotos({
      first: 100,
      assetType: 'Photos',
    })
      .then(r => {
        const photos = r.edges.map(p => p.node.image);
        this.setState({photos});
      })
      .catch((err: Error) => {
        console.log(err);
        // get photos filed
      });
  };

  selectPhoto = (
    uri: string,
    width: number,
    height: number,
    hash: string = '',
  ) => {
    let {selectedPhotos} = this.state;
    if (selectedPhotos.some(item => item.uri === uri)) {
      selectedPhotos = selectedPhotos.filter(i => i.uri !== uri);
    } else {
      selectedPhotos.push({uri, width, height, hash, timestamp: Date.now()});
    }
    selectedPhotos = selectedPhotos.sort(sortBy('timestamp', true));
    this.setState({
      selectedPhotos,
    });
  };

  computedIndex = (uri: string) => {
    const {selectedPhotos} = this.state;
    let num = 0;
    selectedPhotos.map((item, index) => {
      if (item.uri === uri) {
        num = index + 1;
      }
    });
    return num;
  };

  handleClear = () => {
    this.setState({
      selectedPhotos: [],
    });
  };

  close = () => {
    this.props.handleSetMenuDialog(false);
  };

  handleSendPhoto = () => {
    // const { sendMessageMedia } = this.props;
    // const { selectedPhotos } = this.state;
    // sendMessageMedia({ img: selectedPhotos });
    // this.setState({
    //   selectedPhotos: []
    // });
    // this.props.navigation.goBack();
  };

  renderPicItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          this.selectPhoto(item.uri, item.width, item.height, item.hash)
        }
        style={styles.imgItem}>
        <View style={styles.imageContainer}>
          <Image source={{uri: item.uri}} style={styles.photoImg} />
          {this.renderCheckNum(item.uri)}
        </View>
      </TouchableOpacity>
    );
  };

  renderCheckNum(uri: string) {
    if (this.computedIndex(uri)) {
      return (
        <TouchableOpacity activeOpacity={0.8} style={styles.itemNum}>
          <Text style={{color: Colors.white}}>{this.computedIndex(uri)}</Text>
        </TouchableOpacity>
      );
    }
  }

  handleOnScroll = event => {
    const scrollOffset = event.nativeEvent.contentOffset.y;
    console.log('scrollOffset===>', scrollOffset);
    if (scrollOffset > 400) {
      this.setActionMenuAnimated(0);
    }
    this.setState({
      scrollOffset,
    });
  };

  handleScrollTo = p => {
    if (this.flatListRef) {
      this.flatListRef.scrollToOffset(p);
    }
  };

  onModalWillShow = () => {
    this.setActionCircularAnimated();
  };

  setActionCircularAnimated = () => {
    Animated.timing(this.actionCircularAnimated, {
      toValue: 1,
      duration: 300,
      delay: 300,
      easing: Easing.ease,
    }).start();
  };

  setActionMenuAnimated = (toValue, delay = 0, easing = Easing.ease) => {
    Animated.timing(this.actionMenuAnimated, {
      toValue: toValue,
      duration: 300,
      delay,
      easing,
    }).start();
  };

  actionCircularStyle = () => {
    const transform = [
      {
        scale: this.actionCircularAnimated.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.7, 1.2, 1],
        }),
      },
    ];
    return transform;
  };

  render() {
    const {isVisible} = this.props;
    const {photos, scrollOffset} = this.state;
    const thumbImgContainerMaxHeight =
      scrollOffset > Sizes.height - 48 ? Sizes.height - 48 : scrollOffset + 400;
    console.log('thumbImgContainerMaxHeight', thumbImgContainerMaxHeight);
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
          <FlatList
            ref={ref => (this.flatListRef = ref)}
            onScroll={this.handleOnScroll}
            showsVerticalScrollIndicator={false}
            data={photos}
            extraData={this.state}
            keyExtractor={(_item, index) => `${index}`}
            renderItem={this.renderPicItem}
            numColumns={3}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
          />
          <Animated.View style={[styles.actionMenuContent]}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {menuActions.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={styles.actionContainer}
                    activeOpacity={0.8}
                    key={index}>
                    <Animated.View
                      style={[
                        styles.actionCircular,
                        {
                          backgroundColor: item.backgroundColor,
                          transform: this.actionCircularStyle(),
                        },
                      ]}>
                      <Image source={item.img} style={styles.actionImg} />
                    </Animated.View>
                    <Text style={styles.actionText}>{item.title}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  thumbImgContainer: {
    height: 400,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.white,
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
});
