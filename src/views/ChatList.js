import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Platform,
  Image,
  BackHandler,
} from 'react-native';
import {isEqual} from 'lodash'
import {compose} from 'recompose';
import {withTranslation} from 'react-i18next';
import {SharedElement} from 'react-navigation-shared-element';
import ChatStore from '../store/chatStore';
import Svg from '../lib/svg';
import {Sizes, Colors, Base} from '../theme';
import {Btn, StatusBars, TouchableCross} from '../components';
import SwiperRow from '../components/Message/SwiperRow';
import ChatTile from '../components/Tile/ChatTile';
import ChatTitle from '../components/Tile/ChatTitle';
import ChatMeta from '../components/Tile/ChatMeta';
import ChatContent from '../components/Tile/ChatContent';
import ChatBadge from '../components/Tile/ChatBadge';
import HamburgerArrowIcon from '../components/animations/HamburgerArrowIcon';
import * as Animatable from 'react-native-animatable';
import {isIncludes} from '../utils/common';
import DBController from '../controllers/dbController';

const chatsPinIcon = require('../static/images/menu/chats_pin.png');
const chatsUnPinIcon = require('../static/images/menu/chats_unpin.png');
const chatsNotifyOnIcon = require('../static/images/menu/input_notify_on.png');
const chatsNotifyOffIcon = require('../static/images/menu/input_notify_off.png');
const chatsDeleteIcon = require('../static/images/msg/msg_delete.png');
const chatsOther = require('../static/images/ic/ic_ab_other.png');

let drawerLockMode = 'locked-closed';

class ChatListScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Chat',
    defaultNavigationOptions: () => ({
      drawerLockMode,
    }),
  };

  scrollViewStartOffsetY = 0;

  constructor(props) {
    super(props);
    this.state = {
      isRefresh: false,
      // chatList: [],
      showFloatingButton: false,
      chatList: ChatStore.getChatLists(),
      scrollDirection: 'up',
      isCheckMode: false,
      checkedChatArr: [],
    };
    this.flatListRef = null;
    this.floatingButtonRef = null;
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener('willFocus', this.onScreenWillFocus);
    navigation.addListener('willBlur', this.onScreenWillBlur);
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  onBackAndroid = () => {
    const {isCheckMode} = this.state;
    if (isCheckMode) {
      this.setState({
        isCheckMode: false,
        checkedChatArr: [],
      });
      return true;
    }
    return false;
  };

  navigateTo = (routeName: string, params) => {
    this.props.navigation.navigate(routeName, params);
  };

  onScreenWillFocus = () => {
    window.activeScreen = 'ChatListScreen';
    // window.hasFocus = true;
    //
    // DBController.clientUpdate({
    //   '@type': 'clientUpdateFocusWindow',
    //   focused: true,
    // });
  };

  onScreenWillBlur = () => {
    // window.hasFocus = false;
    // DBController.clientUpdate({
    //   '@type': 'clientUpdateFocusWindow',
    //   focused: false,
    // });
  };

  _onRefresh = () => {
    this.setState({
      isRefresh: true,
    });
    setTimeout(() => {
      this.setState({
        isRefresh: false,
      });
    }, 3000);
  };

  _onScroll = event => {
    const {scrollDirection} = this.state;
    const {
      nativeEvent: {
        contentSize: {height: contentSizeHeight},
        contentOffset: {y: contentOffsetY},
        layoutMeasurement: {height: layoutMeasurementHeight},
      },
    } = event;

    if (
      scrollDirection !== 'up' &&
      this.scrollViewStartOffsetY > contentOffsetY
    ) {
      this.setState({
        scrollDirection: 'up',
      });
      this.floatingButtonRef.fadeInUp();
    } else if (
      scrollDirection !== 'down' &&
      this.scrollViewStartOffsetY < contentOffsetY
    ) {
      this.setState({
        scrollDirection: 'down',
      });
      this.floatingButtonRef.fadeOutDown();
    }
  };

  _onScrollBeginDrag = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    this.scrollViewStartOffsetY = offsetY;
  };

  _onScrollEndDrag = event => {
    //console.log('_onScrollEndDrag');
  };

  _onSwipeableRightWillOpen = chatId => {
    // TODO: Archive chat
    // let {chatList} = this.state;
    // chatList = chatList.filter(chat => chat.id !== chatId);
    // this.setState({
    //   chatList,
    // });
  };

  handleCheckChat = chatId => {
    let {checkedChatArr} = this.state;
    checkedChatArr.push(chatId);
    checkedChatArr = Array.from(new Set(checkedChatArr));
    this.setState({
      isCheckMode: true,
      checkedChatArr,
    });
  };

  handleUnCheckChat = () => {
    const {isCheckMode} = this.state;
    this.setState({
      isCheckMode: false,
      checkedChatArr: [],
    });
  };

  handleClickChat = chatId => {
    let {isCheckMode, checkedChatArr} = this.state;
    if (isCheckMode) {
      if (isIncludes(chatId, checkedChatArr)) {
        let findIndex = checkedChatArr.indexOf(chatId);
        findIndex !== -1 && checkedChatArr.splice(findIndex, 1);
      } else {
        checkedChatArr.push(chatId);
        checkedChatArr = Array.from(new Set(checkedChatArr));
      }
      this.setState({
        checkedChatArr,
      });
      if (checkedChatArr.length === 0) {
        this.setState({
          isCheckMode: false,
        });
      }
      return;
    }
    this.navigateTo('Chat', {chatId});
  };

  renderHeader = () => {
    const {isCheckMode, checkedChatArr} = this.state;
    if (isCheckMode) {
      return (
        <View
          style={[
            Base.flexSB,
            Base.flexAIC,
            {
              backgroundColor: Colors.white,
              paddingHorizontal: 15,
              paddingVertical: 8,
              height: 48,
              borderBottomWidth: Sizes.onePixel,
              borderBottomColor: Colors.borderOne,
              shadowColor: 'rgba(58,55,55,0.1)',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              elevation: 2,
            },
          ]}>
          <View style={[Base.flexCenter, {width: 30, height: 30}]}>
            <TouchableOpacity onPress={this.handleUnCheckChat}>
              <HamburgerArrowIcon
                shouldPlay
                speed={3}
                play={[10, 30]}
                style={{width: 100, height: 30, color: Colors.gray}}
              />
            </TouchableOpacity>
            <Text style={{color: Colors.gray}}>{checkedChatArr.length}</Text>
          </View>
          <View style={[Base.flexCenter]}>
            <Btn
              style={styles.toolbarIcon}
              size={30}
              circular={true}
              onPress={() => {}}>
              <Image source={chatsUnPinIcon} style={styles.menuBarIcon} />
            </Btn>
            <Btn style={styles.toolbarIcon} circular={true} onPress={() => {}}>
              <Image source={chatsNotifyOnIcon} style={styles.menuBarIcon} />
            </Btn>
            <Btn style={styles.toolbarIcon} circular={true} onPress={() => {}}>
              <Image source={chatsDeleteIcon} style={styles.menuBarIcon} />
            </Btn>
            <Btn style={{marginLeft: 10}} circular={true} onPress={() => {}}>
              <Image source={chatsOther} style={styles.menuBarIcon} />
            </Btn>
          </View>
        </View>
      );
    }
    return (
      <View
        style={[
          Base.flexSB,
          Base.flexAIC,
          {
            backgroundColor: Colors.theme,
            paddingHorizontal: 10,
            paddingVertical: 8,
            height: 48,
          },
        ]}>
        <TouchableOpacity
          onPress={() => this.props.navigation.toggleDrawer()}
          style={[Base.flexCenter, {width: 30, height: 30}]}>
          <SharedElement id={'search'}>
            <HamburgerArrowIcon
              style={{width: 100, height: 30, color: '#ffffff'}}
            />
          </SharedElement>
        </TouchableOpacity>
        <View style={[Base.flexCenter, {width: 30, height: 30}]}>
          <Btn circular={true} onPress={() => this.navigateTo('Search')}>
            <Svg icon="search" size="25" />
          </Btn>
        </View>
      </View>
    );
  };

  renderChatList = () => {
    const {chatList, scrollDirection} = this.state;
    return (
      <FlatList
        ref={ref => (this.flatListRef = ref)}
        data={chatList}
        keyExtractor={(item, index) => `${index}`}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={true}
        onScroll={this._onScroll}
        onScrollBeginDrag={this._onScrollBeginDrag}
        onScrollEndDrag={this._onScrollEndDrag}
        scrollEventThrottle={100}
        // ListHeaderComponent={this.renderHeader()}
        renderItem={item => this.renderChatItem(item)}
        ListEmptyComponent={this.renderEmpty}
        onRefresh={this._onRefresh}
        refreshing={this.state.isRefresh}
        // onEndReached={() => this._onLoadMore()}
        ItemSeparatorComponent={this._separator}
        onEndReachedThreshold={0.5}
      />
    );
  };

  renderChatItem({item, index}) {
    const {isCheckMode, checkedChatArr} = this.state;
    const canSwipe = !isCheckMode;
    const chatId = item.id;
    return (
      <SwiperRow
        chatId={chatId}
        canSwipe={canSwipe}
        onSwipeableRightWillOpen={this._onSwipeableRightWillOpen}>
        <TouchableCross
          feed={true}
          onPress={() => this.handleClickChat(chatId)}
          onLongPress={() => this.handleCheckChat(chatId)}
          key={index}>
          <View
            style={[
              Base.flexSB,
              {
                paddingHorizontal: 10,
                paddingVertical: 10,
                backgroundColor: '#fff',
              },
            ]}>
            <ChatTile
              chatId={chatId}
              radius={50}
              style={{marginRight: 10}}
              showOnline
              checked={isIncludes(chatId, checkedChatArr)}
            />
            <View style={[Base.flexSB, Base.flexCol, {flexGrow: 1}]}>
              <View style={[Base.flexSB, {alignItems: 'center'}]}>
                <ChatTitle chatId={chatId} />
                <ChatMeta chatId={chatId} />
              </View>
              <View style={Base.flexSB}>
                <ChatContent chatId={chatId} />
                <ChatBadge chatId={chatId} />
              </View>
            </View>
          </View>
        </TouchableCross>
      </SwiperRow>
    );
  }

  renderEmpty() {
    return (
      <View>
        <Text>this is null</Text>
      </View>
    );
  }

  _separator = () => (
    <View style={{height: Sizes.onePixel * 2, backgroundColor: '#eee'}} />
  );

  renderFloatingButton = () => {
    return (
      <Animatable.View
        ref={ref => (this.floatingButtonRef = ref)}
        duration={400}
        style={[styles.floatingButton]}>
        <TouchableOpacity>
          <Svg icon="edit" size="30" fill={Colors.white} />
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBars />
        {this.renderHeader()}
        {this.renderChatList()}
        {this.renderFloatingButton()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  menuBarIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.gray,
  },
  floatingButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    position: 'absolute',
    right: 15,
    bottom: 15,
    ...Colors.FloatingButtonShadow,
    backgroundColor: Colors.SwitchTrackChecked,
    ...Base.flexCenter,
  },
  toolbarIcon: {
    marginHorizontal: 10,
  },
});

const enhance = compose(withTranslation());

export default enhance(ChatListScreen);
