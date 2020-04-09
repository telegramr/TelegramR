import React, {Component} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  PanGestureHandler,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler';
import {SharedElement} from 'react-navigation-shared-element';
import {Base, Colors, Sizes} from '../theme';
import {Btn, StatusBars} from '../components';
import {ViewPager} from '../components/viewPager';
import Svg from '../lib/svg';
import {getThumbIndex, thumbListData} from '../utils/file';
import type {Photo} from '../constants/Types';

const USE_NATIVE_DRIVER = true;
const DRAG_DISMISS_THRESHOLD = 150;

export default class ThumbViewerScreen extends Component {
  static defaultProps = {
    springConfig: {tension: 30, friction: 7},
  };

  static sharedElements = (navigation, otherNavigation, showing) => {
    const id = navigation.getParam('id');
    return [{id}];
  };

  constructor(props) {
    super(props);
    this.state = {
      width: Sizes.width,
      showTip: true,
      activeIndex: 0,
    };
    this.tipHeaderRef = null;
    this.tipFooterRef = null;
    this._translateX = new Animated.Value(0);
    this._translateY = new Animated.Value(0);
    this._lastOffset = {x: 0, y: 0};
    this._onGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this._translateX,
            translationY: this._translateY,
          },
        },
      ],
      {useNativeDriver: USE_NATIVE_DRIVER},
    );
  }

  _onHandlerStateChange = event => {
    console.log('event', event.nativeEvent.state, event.nativeEvent);
    const {translationX, translationY, velocityY} = event.nativeEvent;
    // 点击1次 setShowTipStatus
    if (
      event.nativeEvent.state === State.END &&
      translationX === 0 &&
      translationY === 0
    ) {
      console.log('single');
      this.setShowTipStatus();
      return;
    }

    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastOffset.x += translationX;
      this._lastOffset.y += translationY;
      this._translateX.setOffset(this._lastOffset.x);
      this._translateX.setValue(0);
      this._translateY.setOffset(this._lastOffset.y);
      this._translateY.setValue(0);
      // 上下滑动关闭
      if (Math.abs(translationY) > DRAG_DISMISS_THRESHOLD) {
        this.props.navigation.goBack();
      } else {
        // 取消, 回弹
        this._translateX.setOffset(0);
        this._translateY.setOffset(0);
      }
    }
  };

  _onDoubleTap = event => {
    console.log('_onDoubleTap');
  };

  setShowTipStatus = () => {
    const {showTip} = this.state;
    console.log('showTip', showTip);
    if (showTip) {
      this.tipHeaderRef.fadeOutUp();
      this.tipFooterRef.fadeOutDown();
    } else {
      this.tipHeaderRef.fadeInDown();
      this.tipFooterRef.fadeInUp();
    }
    this.setState({
      showTip: !showTip,
    });
  };

  onItemSelected = index => {
    this.setState({
      activeIndex: index,
    });
  };

  getItemLayout = (item: any, index: number) => {
    const {width} = this.state;
    return {
      length: width,
      offset: width * index,
      index,
    };
  };

  renderHeader = opacity => {
    const {activeIndex} = this.state;
    return (
      <Animatable.View
        ref={ref => (this.tipHeaderRef = ref)}
        duration={400}
        style={[styles.header, {opacity}]}>
        <View style={[Base.flexCenter, {width: 30, height: 30}]}>
          <Btn circular={true} onPress={() => this.props.navigation.goBack()}>
            <Svg icon="arrow_back" size="24" />
          </Btn>
        </View>
        <Text style={styles.tipText}>
          {activeIndex + 1}&nbsp;/&nbsp;{thumbListData.length}
        </Text>
        <View
          tyle={[
            Base.flexCenter,
            {width: 30, height: 30, borderWidth: 1, borderColor: '#991010'},
          ]}>
          <Btn circular={true} onPress={() => {}}>
            <Svg icon="more_vert" size="24" />
          </Btn>
        </View>
      </Animatable.View>
    );
  };

  renderFooter = opacity => {
    const {activeIndex} = this.state;
    const img = thumbListData[activeIndex];
    return (
      <Animatable.View
        ref={ref => (this.tipFooterRef = ref)}
        duration={400}
        style={[styles.footer, {opacity}]}>
        <View style={styles.messageContainer}>
          {/*<Text style={[styles.messageText, {color: Colors.TextBlue3}]}>*/}
          {/*  #狗神煌*/}
          {/*</Text>*/}
        </View>
        {/*{this.renderThumbList()}*/}
        <View style={styles.metaContainer}>
          <View style={styles.metaCell}>
            <Text style={styles.metaText}>{img && img.id}</Text>
            <Text style={styles.metaText}>2020-01-26 12:00</Text>
          </View>
          <View style={styles.shareBtn}>
            <Btn circular={true} onPress={() => {}}>
              <Svg icon="more_vert" size="24" />
            </Btn>
          </View>
        </View>
      </Animatable.View>
    );
  };

  renderItem = ({item}: Photo) => {
    // TODO
    const {width} = this.state;
    const {id, src, large} = item;
    console.log('large===>', large);
    return (
      <SharedElement id={id}>
        <Image style={styles.thumbFullImg} source={{uri: large}} />
      </SharedElement>
    );
  };

  renderPager(items: Photo[], initialIndex: number) {
    return (
      <ViewPager
        style={{flex: 1, width: Sizes.width, marginTop: -48}}
        data={items}
        initialItemIndex={initialIndex}
        renderItem={this.renderItem}
        getItemLayout={this.getItemLayout}
        onItemSelected={this.onItemSelected}
      />
    );
  }

  render() {
    const id = this.props.navigation.getParam('id');
    const initialIndex = getThumbIndex(id);
    console.log('id', id, 'initialIndex', initialIndex);
    const {showTip} = this.state;
    const translateY = this._translateY;
    const scale = translateY.interpolate({
      inputRange: [-Sizes.height / 2, 0, Sizes.height / 2],
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });
    const opacity = translateY.interpolate({
      inputRange: [-400, -120, -50, 50, 120, 400],
      outputRange: [0.5, 0.7, 1, 1, 0.7, 0.5],
    });

    return (
      <SafeAreaView style={styles.container}>
        <StatusBars backgroundColor={'rgba(0, 0, 0, 0.5)'} hidden={!showTip} />
        <Animated.View style={[styles.thumbnailOverlay, {opacity}]} />
        {this.renderHeader(opacity)}
        <PanGestureHandler
          onGestureEvent={this._onGestureEvent}
          onHandlerStateChange={this._onHandlerStateChange}>
          <Animated.View
            style={[
              styles.box,
              {
                transform: [{translateY}],
              },
            ]}>
            {this.renderPager(thumbListData, initialIndex)}
          </Animated.View>
        </PanGestureHandler>
        {this.renderFooter(opacity)}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    zIndex: -1,
  },
  box: {
    alignSelf: 'center',
    margin: 10,
    zIndex: -1,
  },
  img: {
    flex: 1,
    width: Sizes.width,
    maxHeight: Sizes.height / 2,
  },
  header: {
    position: 'absolute',
    top: 24,
    flexDirection: 'row',
    alignItems: 'center',
    width: Sizes.width,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    height: 48,
  },
  tipText: {
    color: Colors.white,
    flexGrow: 1,
    fontSize: 18,
    textAlign: 'left',
    paddingLeft: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: Sizes.width,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  messageContainer: {
    paddingVertical: 6,
  },
  messageText: {
    color: Colors.white,
    fontSize: 16,
  },
  thumbContainer: {
    marginBottom: 4,
  },
  thumbImg: {
    width: 45,
    height: 60,
  },
  thumbImgActive: {
    width: 60,
    height: 60,
    marginHorizontal: 8,
  },
  thumbFullImg: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaCell: {
    flexGrow: 1,
  },
  metaText: {
    color: Colors.white,
    fontSize: 14,
  },
  shareBtn: {
    ...Base.flexCenter,
    width: 36,
    height: 36,
    borderRadius: 18,
  },
});
