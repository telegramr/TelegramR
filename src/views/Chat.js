import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Platform,
  BackHandler,
  Animated,
} from 'react-native';
import {isEqual} from 'lodash';
import {compose} from 'recompose';
import {withTranslation} from 'react-i18next';
import Svg from '../lib/svg';
import {Base, Colors, Sizes} from '../theme';
import MessageStore from '../store/messageStore';
import ChatStore from '../store/chatStore';
import DBController from '../controllers/dbController';
import {Btn, StatusBars, TouchableCross, Badge} from '../components';
import Message from '../components/Message/Message';
import Header from '../components/ColumnMiddle/Header';
import Footer from '../components/ColumnMiddle/Footer';
import {isChannelChat} from '../utils/chat';
import {isServiceMessage} from '../utils/serviceMessage';
import DayMeta from '../components/Message/DayMeta';
import ChatTile from '../components/Tile/ChatTile';
import ChatTitle from '../components/Tile/ChatTitle';
import {clearSelection} from '../actions/clientAction';

const scrollToBottomOffset = 200;
const MESSAGE_SPLIT_MAX_TIME_S = 600;
const SET_CHECK_MODE_MARGIN = 0;
const UNSET_CHECK_MODE_MARGIN = -30;

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatId: this.props.navigation.getParam('chatId'),
      messageId: this.props.navigation.getParam('messageId') || '',
      lists: [],
      separatorMessageId: 0,
      history: [],
      selectionCount: 0,
      isSelectedMode: false,
      isRefresh: false,
      showFloatingButton: false,
      flaListLayoutSize: 0,
      flaListLayoutOffset: 0,
    };
    this.flatListRef = null;
    this.checkModeMargin = new Animated.Value(UNSET_CHECK_MODE_MARGIN);
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener('willFocus', this.onScreenWillFocus);
    navigation.addListener('didBlur', this.onScreenDidBlur);
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
    this.onUpdateNewMessage();
    MessageStore.on('updateNewMessage', this.onUpdateNewMessage);
    MessageStore.on(
      'clientUpdateMessageSelected',
      this.onClientUpdateMessageSelected,
    );
    MessageStore.on(
      'clientUpdateClearSelection',
      this.onClientUpdateMessageSelected,
    );
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
    MessageStore.off(
      'clientUpdateMessageSelected',
      this.onClientUpdateMessageSelected,
    );
    MessageStore.off(
      'clientUpdateClearSelection',
      this.onClientUpdateMessageSelected,
    );
    MessageStore.off('updateNewMessage', this.onUpdateNewMessage);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const {
  //     isRefresh,
  //     lists,
  //     showFloatingButton,
  //     flaListLayoutSize,
  //     flaListLayoutOffset,
  //   } = this.state;
  //   if (nextState.isRefresh !== isRefresh) {
  //     return true;
  //   }
  //   if (isEqual(nextState.lists, lists) === false) {
  //     return true;
  //   }
  //   if (nextProps.showFloatingButton !== showFloatingButton) {
  //     return true;
  //   }
  //   if (nextProps.flaListLayoutSize !== flaListLayoutSize) {
  //     return true;
  //   }
  //   if (nextProps.flaListLayoutOffset !== flaListLayoutOffset) {
  //     return true;
  //   }
  //   return false;
  // }

  onBackAndroid = () => {
    const {isSelectedMode} = this.state;
    if (isSelectedMode) {
      clearSelection();
      return true;
    }
    return false;
  };

  onScreenWillFocus = () => {
    window.activeScreen = 'ChatScreen';
    window.hasFocus = true;
    DBController.clientUpdate({
      '@type': 'clientUpdateFocusWindow',
      focused: true,
    });
  };

  onScreenDidBlur = () => {
    window.hasFocus = false;
    DBController.clientUpdate({
      '@type': 'clientUpdateFocusWindow',
      focused: false,
    });
    clearSelection();
  };

  onUpdateNewMessage = update => {
    console.log('onUpdateNewMessage');
    const {chatId} = this.state;
    const lists = MessageStore.getMessageLists(chatId);
    this.setState({
      lists,
      history: lists,
    });
    // TODO: use scrollBehaviorNone
    if (update && update['@type'] === 'updateNewMessage') {
      setTimeout(() => {
        this.handleGoToBottom();
      }, 200);
    }
  };

  onClientUpdateMessageSelected = update => {
    const selectionCount = MessageStore.selectedItems.size;
    const isSelectedMode = selectionCount >= 1;
    this.setState({
      selectionCount,
      isSelectedMode,
    });
    this.setcheckModeMarginAnimated(
      200,
      isSelectedMode ? SET_CHECK_MODE_MARGIN : UNSET_CHECK_MODE_MARGIN,
    );
  };

  showMessageTitle(message, prevMessage, isFirst) {
    if (!message || !prevMessage) {
      return false;
    }

    const {chat_id, date, sender_user_id, content} = message;

    if (isFirst) {
      return true;
    }

    if (isChannelChat(chat_id)) {
      return true;
    }

    if (!content || !content['@type']) {
      return false;
    }

    return (
      content['@type'] !== 'messageSticker' &&
      prevMessage &&
      (isServiceMessage(prevMessage) ||
        sender_user_id !== prevMessage.sender_user_id ||
        date - prevMessage.date > MESSAGE_SPLIT_MAX_TIME_S)
    );
  }

  showMessageDate(message, prevMessage, isFirst) {
    if (isFirst) {
      return true;
    }

    const date = new Date(message.date * 1000);
    const prevDate = prevMessage ? new Date(prevMessage.date * 1000) : date;

    if (
      date.getFullYear() !== prevDate.getFullYear() ||
      date.getMonth() !== prevDate.getMonth() ||
      date.getDate() !== prevDate.getDate()
    ) {
      return true;
    }

    return false;
  }

  _onRefresh = async () => {
    let {lists} = this.state;
    this.setState({
      isRefresh: true,
    });
    setTimeout(() => {
      lists = [...lists, ...lists];
      this.setState({
        lists,
        isRefresh: false,
      });
    }, 2000);
  };

  _keyExtractor = (item, index) => String(item.id);

  keyboardChange = (keyboardHeight, isOpen) => {
    const {flaListLayoutOffset} = this.state;
    // 键盘展开flatList偏移量计算
    if (isOpen) {
      this.flatListRef.scrollToOffset({
        offset: flaListLayoutOffset + keyboardHeight + 30,
        animated: true,
      });
    } else {
      this.flatListRef.scrollToOffset({
        offset: flaListLayoutOffset - keyboardHeight - 30,
        animated: true,
      });
    }
  };

  handleOnScroll = event => {
    // Keyboard.dismiss()
    const {
      nativeEvent: {
        contentSize: {height: contentSizeHeight},
        contentOffset: {y: contentOffsetY},
        layoutMeasurement: {height: layoutMeasurementHeight},
      },
    } = event;
    this.setState({
      flaListLayoutSize: contentSizeHeight,
      flaListLayoutOffset: contentOffsetY,
    });
    if (
      contentSizeHeight - layoutMeasurementHeight - contentOffsetY >
      scrollToBottomOffset
    ) {
      this.setState({showFloatingButton: true});
    } else {
      this.setState({showFloatingButton: false});
    }
  };

  handleGoToBottom = () => {
    this.flatListRef.scrollToEnd();
  };

  handleSelectUser = e => {
    console.log('handleSelectUser', e);
  };

  handleSelectChat = e => {
    console.log('handleSelectChat', e);
  };

  setcheckModeMarginAnimated = (duration = 0, toValue = 0) => {
    Animated.parallel([
      Animated.timing(this.checkModeMargin, {
        duration,
        toValue,
      }),
    ]).start();
  };

  renderList() {
    // const {lists, isRefresh} = this.state;
    const {isRefresh, chatId, lists} = this.state;
    // const {message} = this.props;
    // const lists = message.get(chatId);
    // TODO: handleScrollToEnd and don't ues onContentSizeChange when init state
    // if (isEnd) {
    //   setTimeout(() => {
    //     this.handleScrollToEnd();
    //     setIsEnd(false);
    //   }, 100);
    // }
    return (
      <FlatList
        ref={ref => (this.flatListRef = ref)}
        data={lists}
        // onLayout={(evt) => {
        //   const {height} = evt.nativeEvent.layout;
        //   this.setState({
        //     flaListLayoutHeight: height,
        //   })
        //   // const {containerHeight} = this.state;
        //   // if(!containerHeight || containerHeight !== height) {
        //   //   this.setState({containerHeight: height})
        //   // }
        // }}f
        extraData={this.state}
        // onTouchStart={ this.closeMessageMediaModal }
        keyExtractor={this._keyExtractor}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={true}
        // keyboardShouldPersistTaps={'handled'}
        onScroll={this.handleOnScroll}
        scrollEventThrottle={100}
        // ListHeaderComponent={this.renderListHeader}
        // ListFooterComponent={this.renderListFooter}
        renderItem={this.renderChatItem}
        onRefresh={this._onRefresh}
        refreshing={isRefresh}
        // onEndReached={() => this._onLoadMore()}
        onEndReachedThreshold={0.5}
        // onContentSizeChange={ this.handleScrollToEnd }
      />
    );
  }

  renderListFooter = () => {
    return (
      <View>
        <Text>[END]</Text>
      </View>
    );
  };

  renderChatItem = ({item, index}) => {
    console.log('render message index:', index);
    const {
      history,
      separatorMessageId,
      clearHistory,
      selectionActive,
      scrollDownVisible,
      selectionCount,
      isSelectedMode,
    } = this.state;
    const message = item;

    // TODO: fix history
    const prevMessage = index > 0 ? history[index - 1] : null;
    const nextMessage = index < history.length - 1 ? history[index + 1] : null;
    const showDate = this.showMessageDate(message, prevMessage, index === 0);

    let m = null;
    let d = null;
    if (isServiceMessage(message)) {
      // TODO: isServiceMessage
    } else {
      let showTitle = this.showMessageTitle(message, prevMessage, index === 0);
      const nextShowTitle = this.showMessageTitle(nextMessage, message, false);
      const showTail =
        !nextMessage || isServiceMessage(nextMessage) || nextShowTitle;

      if (showDate) {
        d = <DayMeta date={message.date} />;
      }
      const {chat_id, id} = message;
      m = (
        <Message
          key={`chat_id=${chat_id} message_id=${id}`}
          // ref={el => this.itemsMap.set(i, el)}
          chatId={chat_id}
          messageId={id}
          message={message}
          sendingState={message.sending_state}
          showTitle={showTitle}
          showTail={showTail}
          isSelectedMode={isSelectedMode}
          showUnreadSeparator={separatorMessageId === id}
        />
      );
    }
    return (
      <Animated.View
        style={[
          Base.flexCol,
          {marginLeft: this.checkModeMargin, marginTop: index === 0 ? 30 : 0},
        ]}
        key={`chat_${index}`}>
        {d}
        {m}
      </Animated.View>
    );
  };

  render() {
    const {showFloatingButton, chatId, lists, isSelectedMode} = this.state;
    const chat = ChatStore.get(chatId);
    const {is_pinned, unread_count} = chat;

    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBars />
        <Header chatId={chatId} isSelectedMode={isSelectedMode} />
        <ImageBackground
          source={require('../../src/static/images/img/wallpaper.jpg')}
          style={styles.wallpaperImg}
        />
        {this.renderList()}
        {showFloatingButton && !!unread_count && (
          <TouchableOpacity
            onPress={this.handleGoToBottom}
            activeOpacity={1}
            style={styles.FloatingButtonContainer}>
            <View style={[Base.flexCenter, {marginBottom: -8, elevation: 3}]}>
              <Badge
                num={unread_count}
                style={{
                  color: Colors.white,
                  backgroundColor: Colors.BackgroundBlue,
                }}
              />
            </View>
            <View style={styles.FloatingButton}>
              <Svg icon="go_down" size="50" fill={Colors.PanelIcons3} />
              {/*<Image source={require('../static/images/msg/go_down.png')} style={styles.goDownImg}/>*/}
            </View>
          </TouchableOpacity>
        )}
        <Footer chatId={chatId} keyboardChange={this.keyboardChange} />
      </SafeAreaView>
    );
  }
}

const enhance = compose(withTranslation());

export default enhance(ChatScreen);

const styles = StyleSheet.create({
  wallpaperImg: {
    flex: 1,
    zIndex: -1,
    height: Sizes.height - 50,
  },
  FloatingButtonContainer: {
    position: 'absolute',
    right: 10,
    bottom: 60,
  },
  FloatingButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...Colors.FloatingButtonShadow,
  },
  goDownImg: {
    width: 30,
    height: 20,
    tintColor: Colors.PanelIcons3,
    borderWidth: 1,
    borderColor: '#991010',
  },
});
