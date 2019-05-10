import React, { Component } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  ImageBackground,
  Image,
  ScrollView,
  RefreshControl,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import { Avatar, Btn } from '../components'
import S from "../public/style";
import { color, screen } from "../utils";
import Svg from "../lib/svg";

const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Main' })
  ],
});

const { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, HEADER_SCROLL_DISTANCE } = screen

export default class User2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,
    };
  }

  navigateTo = (routeName, ...params) => {
    const { navigate } = this.props.navigation
    navigate(routeName, ...params)
  };

  renderHeaderBar = () => (
    <View style={ [S.flexSB, S.flexAIC, S.pd10, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: screen.width,
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: '#991010',
    }] }>
      <View style={ [S.flexCenter, { width: 30, height: 30 }] }>
        <Btn circular={ true } onPress={ () => (this.props.navigation.goBack()) }>
          <Svg icon="arrowleft" size="22"/>
        </Btn>
      </View>
      <View style={ [S.flexCenter, { width: 30, height: 30 }] }>
        <Btn circular={ true } onPress={ () => Alert.alert('search') }>
          <Svg icon="ellipsis" size="25"/>
        </Btn>
      </View>
    </View>
  )

  renderHead = () => (
    <ImageBackground source={ require('../static/images/head.png') } style={ styles.headImg }>
      <Avatar size={ 60 }/>
      <Text>this is user</Text>
    </ImageBackground>
  )

  renderPhotographs = () => (
    <View style={ [styles.plate, { marginTop: HEADER_MAX_HEIGHT }] }>
      <View style={ styles.title }>
        <Text style={ styles.textTitle }>精选照片</Text>
        <Image source={ require('../static/images/ico_right.png') } style={ styles.arrowRight }/>
      </View>
      <View style={ styles.photo }>
        <Image source={ require('../static/images/img1.jpg') } style={ styles.imgImg }/>
        <Image source={ require('../static/images/img2.jpg') } style={ styles.imgImg }/>
      </View>
    </View>
  )

  renderGroup = () => {
    const groups = [
      { title: '同性交流群', uri: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4' },
      { title: '同性交流群', uri: 'https://avatars3.githubusercontent.com/u/16267608?s=70&v=4' },
      { title: '同性交流群', uri: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4' },
      { title: '同性交流群', uri: 'https://avatars3.githubusercontent.com/u/16267608?s=70&v=4' },
      { title: '同性交流群', uri: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4' },
    ]
    return (
      <View style={ styles.plate }>
        <View style={ styles.title }>
          <Text style={ styles.textTitle }>加入的群</Text>
          <Image source={ require('../static/images/ico_right.png') } style={ styles.arrowRight }/>
        </View>
        <View style={ styles.group }>
          {
            groups.map((item, index) => (
                <View style={ styles.groupBox } key={ index }>
                  <Image source={ { uri: item.uri } } style={ styles.groupImg }/>
                  <Text style={ styles.groupText }>{ item.title }</Text>
                </View>
              )
            )
          }
        </View>
      </View>
    )
  }

  render() {
    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });
    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });
    const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: 'clamp',
    });
    const avatarScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 1, 1],
      extrapolate: 'clamp',
    })
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={ styles.container }>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.251)"
        />
        <Animated.ScrollView
          style={ styles.fill }
          scrollEventThrottle={ 1 }
          onScroll={ Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          ) }
          contentOffset={ {
            y: -HEADER_MAX_HEIGHT,
          } }
        >
          { this.renderPhotographs() }
          { this.renderGroup() }
        </Animated.ScrollView>
        <Animated.View
          pointerEvents="none"
          style={ [
            styles.header,
            { transform: [{ translateY: headerTranslate }] },
          ] }
        >
          <Animated.Image
            style={ [
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ] }
            source={ { uri: 'http://pic.xiami.net/images/trade/mobile_back/916/594dd7b5397b1_45818524_1498273717.png' } }
          />
          <Animated.View
            style={ [
              styles.userContainer,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ] }
          >
            <View style={ [S.flexCenter, styles.avatarContainer] }>
              <Avatar size={ 80 }/>
            </View>
            <Text>Beats0</Text>
            <Text>this is sign</Text>
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={ [
            styles.bar,
            {
              transform: [
                { translateY: titleTranslate },
              ],
            },
          ] }
        >
          { this.renderHeaderBar() }
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  userContainer: {
    marginTop: HEADER_MAX_HEIGHT / 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarContainer: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden'
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  headImg: {
    width: screen.width,
    height: screen.width * 45 / 95,
    alignItems: 'center',
    paddingTop: screen.width * 0.4,
    marginBottom: 60
  },
  plate: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textTitle: {
    color: '#000',
    fontSize: 16,
  },
  arrowRight: {
    transform: [
      {
        scale: 0.4
      }
    ]
  },
  photo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15
  },
  imgImg: {
    width: screen.width / 2 - 15,
    height: screen.width / 2
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    justifyContent: 'space-between',
    width: screen.width - 30,
    height: screen.width * 0.32,
    overflow: 'hidden',
    flexWrap: 'wrap'
  },
  groupBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupImg: {
    width: screen.width / 4.5,
    height: screen.width / 4.5
  },
  groupText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5
  },
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#517ca2',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 8 : 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
