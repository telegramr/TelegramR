import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {compose} from 'recompose';
import {withTranslation} from 'react-i18next';
import DBController from '../../controllers/dbController';
import MessageStore from '../../store/messageStore';
import Meta from './Meta';
import {Base, Colors, Sizes} from '../../theme';
import {
  openUser,
  openChat,
  selectMessage,
  openReply,
  forwardMessages,
  replyMessage,
  editMessage,
  clearSelection,
  deleteMessages,
} from '../../actions/clientAction';
import {pinMessage, unpinMessage} from '../../actions/messageAction';
import {PHOTO_DISPLAY_SIZE, PHOTO_SIZE} from '../../constants/Constants';
import {
  canMessageBeEdited,
  getEmojiMatches,
  getMedia,
  getText,
  getWebPage,
  isMessagePinned,
  openMedia,
  showMessageForward,
} from '../../utils/message';
import {canPinMessages, canSendMessages} from '../../utils/chat';
import {getSize, getFitSize} from '../../utils/common';
import UserTile from '../Tile/UserTile';
import ChatTile from '../Tile/ChatTile';
import WebPage from './Media/WebPage';
import MessageAuthor from './MessageAuthor';
import Forward from './Forward';
import UnreadSeparator from './UnreadSeparator';
import Reply from './Reply';
import Svg from '../../lib/svg';
import CheckMarkIcon from '../animations/CheckMarkIcon';

const messageShareIcon = require('../../static/images/msg/msg_share.png');

class Message extends Component {
  constructor(props) {
    super(props);
    const {chatId, messageId} = this.props;
    this.state = {
      message: MessageStore.get(chatId, messageId),
      emojiMatches: getEmojiMatches(chatId, messageId),
      selected: false,
      highlighted: false,
    };
  }

  componentDidMount() {
    MessageStore.on(
      'clientUpdateMessageHighlighted',
      this.onClientUpdateMessageHighlighted,
    );
    MessageStore.on(
      'clientUpdateMessageSelected',
      this.onClientUpdateMessageSelected,
    );
    MessageStore.on(
      'clientUpdateClearSelection',
      this.onClientUpdateClearSelection,
    );
    MessageStore.on('updateMessageContent', this.onUpdateMessageContent);
    MessageStore.on('updateMessageEdited', this.onUpdateMessageEdited);
    MessageStore.on('updateMessageViews', this.onUpdateMessageViews);
  }

  componentWillUnmount() {
    MessageStore.off(
      'clientUpdateMessageHighlighted',
      this.onClientUpdateMessageHighlighted,
    );
    MessageStore.off(
      'clientUpdateMessageSelected',
      this.onClientUpdateMessageSelected,
    );
    MessageStore.off(
      'clientUpdateClearSelection',
      this.onClientUpdateClearSelection,
    );
    MessageStore.off('updateMessageContent', this.onUpdateMessageContent);
    MessageStore.off('updateMessageEdited', this.onUpdateMessageEdited);
    MessageStore.off('updateMessageViews', this.onUpdateMessageViews);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      theme,
      chatId,
      messageId,
      sendingState,
      showUnreadSeparator,
      showTail,
      showTitle,
    } = this.props;
    const {
      contextMenu,
      selected,
      highlighted,
      emojiMatches,
      isSelectedMode,
    } = this.state;

    // if (nextProps.theme !== theme) {
    //   // console.log('Message.shouldComponentUpdate true');
    //   return true;
    // }

    if (nextProps.chatId !== chatId) {
      // console.log('Message.shouldComponentUpdate true');
      return true;
    }

    if (nextProps.messageId !== messageId) {
      // console.log('Message.shouldComponentUpdate true');
      return true;
    }

    if (nextProps.isSelectedMode !== isSelectedMode) {
      // console.log('Message.shouldComponentUpdate true');
      return true;
    }
    // if (nextProps.sendingState !== sendingState) {
    //   // console.log('Message.shouldComponentUpdate true');
    //   return true;
    // }

    // if (nextProps.showUnreadSeparator !== showUnreadSeparator) {
    //   // console.log('Message.shouldComponentUpdate true');
    //   return true;
    // }

    // if (nextProps.showTail !== showTail) {
    //   // console.log('Message.shouldComponentUpdate true');
    //   return true;
    // }

    if (nextProps.showTitle !== showTitle) {
      // console.log('Message.shouldComponentUpdate true');
      return true;
    }

    // if (nextState.contextMenu !== contextMenu) {
    //   // console.log('Message.shouldComponentUpdate true');
    //   return true;
    // }

    if (nextState.selected !== selected) {
      // console.log('Message.shouldComponentUpdate true');
      return true;
    }

    if (nextState.highlighted !== highlighted) {
      // console.log('Message.shouldComponentUpdate true');
      return true;
    }

    if (nextState.emojiMatches !== emojiMatches) {
      // console.log('Message.shouldComponentUpdate true');
      return true;
    }

    // console.log('Message.shouldComponentUpdate false');
    return false;
  }

  onClientUpdateClearSelection = update => {
    if (!this.state.selected) {
      return;
    }

    this.setState({selected: false});
  };

  onClientUpdateMessageHighlighted = update => {
    const {chatId, messageId} = this.props;
    const {selected, highlighted} = this.state;

    if (selected) {
      return;
    }

    if (chatId === update.chatId && messageId === update.messageId) {
      if (highlighted) {
        this.setState({highlighted: false}, () => {
          setTimeout(() => {
            this.setState({highlighted: true});
          }, 0);
        });
      } else {
        this.setState({highlighted: true});
      }
    } else if (highlighted) {
      this.setState({highlighted: false});
    }
  };

  onClientUpdateMessageSelected = update => {
    const {chatId, messageId} = this.props;
    const {selected} = update;

    if (chatId === update.chatId && messageId === update.messageId) {
      console.log('onClientUpdateMessageSelected', update);
      this.setState({selected, highlighted: false});
    }
  };

  onUpdateMessageEdited = update => {
    const {chat_id, message_id} = update;
    const {chatId, messageId} = this.props;

    if (chatId === chat_id && messageId === message_id) {
      this.forceUpdate();
    }
  };

  onUpdateMessageViews = update => {
    const {chat_id, message_id} = update;
    const {chatId, messageId} = this.props;

    if (chatId === chat_id && messageId === message_id) {
      this.forceUpdate();
    }
  };

  onUpdateMessageContent = update => {
    const {chat_id, message_id} = update;
    const {chatId, messageId} = this.props;
    const {emojiMatches} = this.state;

    if (chatId !== chat_id) {
      return;
    }
    if (messageId !== message_id) {
      return;
    }

    const newEmojiMatches = getEmojiMatches(chatId, messageId);
    if (newEmojiMatches !== emojiMatches) {
      this.setState({emojiMatches: getEmojiMatches(chatId, messageId)});
    } else {
      this.forceUpdate();
    }
  };

  handleSelectUser = userId => {
    // openUser(userId, true);
    console.log('openUser');
  };

  handleSelectChat = chatId => {
    // openChat(chatId, null, true);
    console.log('openChat');
  };

  handlePressBubble = () => {
    const {isSelectedMode} = this.props;
    if (isSelectedMode) {
      this.handleSelection();
    }
  };

  handleSelection = () => {
    // TODO: check is selection mode
    // const selection = window.getSelection().toString();
    // if (selection) return;

    const {chatId, messageId} = this.props;

    const selected = !MessageStore.selectedItems.has(
      `chatId=${chatId}_messageId=${messageId}`,
    );
    selectMessage(chatId, messageId, selected);
    console.log('handleSelection');
  };

  handleDateClick = e => {
    e.preventDefault();
    e.stopPropagation();

    const {chatId, messageId} = this.props;

    const message = MessageStore.get(chatId, messageId);

    const canBeReplied = canSendMessages(chatId);
    if (canBeReplied) {
      DBController.clientUpdate({
        '@type': 'clientUpdateReply',
        chatId: chatId,
        messageId: messageId,
      });
      return;
    }

    const canBeForwarded = message && message.can_be_forwarded;
    if (canBeForwarded) {
      DBController.clientUpdate({
        '@type': 'clientUpdateForward',
        info: {
          chatId: chatId,
          messageIds: [messageId],
        },
      });
    }
  };

  handleOpenMedia = event => {
    const {isSelectedMode} = this.props;
    const {selected} = this.state;
    if (isSelectedMode) {
      if (selected) {
        return;
      }
      this.handleSelection();
      return;
    }
    const {chatId, messageId} = this.props;
    openMedia(chatId, messageId);
  };

  handleAnimationEnd = () => {
    this.setState({highlighted: false});
  };

  handleMouseDown = () => {
    this.mouseDown = true;
  };

  handleMouseOver = () => {
    this.mouseDown = false;
  };

  handleMouseOut = () => {
    this.mouseOut = false;
  };

  handleReplyClick = () => {
    const {chatId, messageId} = this.props;
    console.log('handleReplyClick', chatId, messageId);
    // openReply(chatId, messageId);
  };

  handleContextMenu = async event => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const {contextMenu} = this.state;

    if (contextMenu) {
      this.setState({contextMenu: false});
    } else {
      if (MessageStore.selectedItems.size > 1) {
        return;
      }
      //
      // const left = event.clientX;
      // const top = event.clientY;
      //
      // this.setState({
      //   contextMenu: true,
      //   left,
      //   top
      // });
    }
  };

  handleCloseContextMenu = event => {
    if (event) {
      event.stopPropagation();
    }

    this.setState({contextMenu: false});
  };

  handleReply = event => {
    const {chatId, messageId} = this.props;

    clearSelection();
    this.handleCloseContextMenu(event);

    replyMessage(chatId, messageId);
  };

  handlePin = event => {
    const {chatId, messageId} = this.props;

    clearSelection();
    this.handleCloseContextMenu(event);

    if (isMessagePinned(chatId, messageId)) {
      unpinMessage(chatId);
    } else {
      pinMessage(chatId, messageId);
    }
  };

  handleForward = event => {
    const {chatId, messageId} = this.props;

    this.handleCloseContextMenu(event);

    forwardMessages(chatId, [messageId]);
  };

  handleEdit = event => {
    const {chatId, messageId} = this.props;

    clearSelection();
    this.handleCloseContextMenu(event);

    editMessage(chatId, messageId);
  };

  handleSelect = event => {
    const {chatId, messageId} = this.props;

    this.handleCloseContextMenu(event);

    selectMessage(chatId, messageId, true);
  };

  handleDelete = event => {
    const {chatId, messageId} = this.props;

    this.handleCloseContextMenu(event);

    deleteMessages(chatId, [messageId]);
  };

  getMessageStyle(chatId, messageId) {
    const message = MessageStore.get(chatId, messageId);
    if (!message) {
      return null;
    }

    const {content} = message;
    if (!content) {
      return null;
    }

    switch (content['@type']) {
      case 'messageAnimation': {
        const {animation} = content;
        if (!animation) {
          return null;
        }

        const {width, height, thumbnail} = animation;

        const size = {width, height} || thumbnail;
        if (!size) {
          return null;
        }

        const fitSize = getFitSize(size, PHOTO_DISPLAY_SIZE, false);
        if (!fitSize) {
          return null;
        }

        return {width: fitSize.width};
      }
      case 'messagePhoto': {
        const {photo} = content;
        if (!photo) {
          return null;
        }

        const size = getSize(photo.sizes, PHOTO_SIZE);
        if (!size) {
          return null;
        }

        const fitSize = getFitSize(size, PHOTO_DISPLAY_SIZE, false);
        if (!fitSize) {
          return null;
        }

        return {width: fitSize.width};
      }
      case 'messageVideo': {
        const {video} = content;
        if (!video) {
          return null;
        }

        const {thumbnail, width, height} = video;

        const size = {width, height} || thumbnail;
        if (!size) {
          return null;
        }

        const fitSize = getFitSize(size, PHOTO_DISPLAY_SIZE);
        if (!fitSize) {
          return null;
        }

        return {width: fitSize.width};
      }
    }

    return null;
  }

  render() {
    const {
      t,
      chatId,
      messageId,
      message,
      showUnreadSeparator,
      showTail,
      showTitle,
      navigation,
    } = this.props;
    const {
      emojiMatches,
      selected,
      highlighted,
      contextMenu,
      left,
      top,
    } = this.state;
    // console.log('MessageStore.selectedItems.size', MessageStore.selectedItems)
    if (!message) {
      return <Text>[empty message]</Text>;
    }
    const {
      is_outgoing,
      views,
      date,
      edit_date,
      reply_to_message_id,
      forward_info,
      sender_user_id,
    } = message;

    const inlineMeta = (
      <Meta
        hidden
        chatId={chatId}
        messageId={messageId}
        date={date}
        editDate={edit_date}
        views={views}
      />
    );
    const text = getText(message, inlineMeta);
    const hasCaption = text !== null && text.length > 0;
    const showForward = showMessageForward(message);
    const hasTitle = showTitle || showForward || Boolean(reply_to_message_id);
    const webPage = getWebPage(message);
    const media = getMedia(
      message,
      this.handleOpenMedia,
      hasTitle,
      hasCaption,
      inlineMeta,
      navigation,
    );

    let tile = null;
    if (!is_outgoing && showTail) {
      tile = sender_user_id ? (
        <UserTile
          small
          userId={sender_user_id}
          onSelect={this.handleSelectUser}
        />
      ) : (
        <ChatTile small chatId={chatId} onSelect={this.handleSelectChat} />
      );
    } else if(!is_outgoing) {
      tile = <View style={styles.hiddenTile} />;
    }

    const canBeReplied = canSendMessages(chatId);
    const canBePinned = canPinMessages(chatId);
    const isPinned = isMessagePinned(chatId, messageId);
    const canBeForwarded = message.can_be_forwarded;
    const canBeDeleted =
      message.can_be_deleted_only_for_self ||
      message.can_be_deleted_for_all_users;
    const canBeSelected = !MessageStore.hasSelectedMessage(chatId, messageId);
    const canBeEdited = canMessageBeEdited(chatId, messageId);
    const withBubble =
      message.content &&
      message.content['@type'] !== 'messageSticker' &&
      message.content['@type'] !== 'messageVideoNote';
    const {isSelectedMode} = this.props;

    let checkIcon = null;
    if (isSelectedMode && selected) {
      checkIcon = (
        <View style={styles.msgCheckIconContainer}>
          <CheckMarkIcon
            autoPlay={true}
            style={{width: 75, position: 'absolute', right: -10, bottom: -8}}
          />
        </View>
      );
    } else {
      checkIcon = (
        <View style={styles.msgCheckIconContainer}>
          <Svg
            icon="check_circle_unchecked"
            size="24"
            style={{position: 'absolute', bottom: 8}}
            fill={Colors.white}
          />
        </View>
      );
    }

    return (
      <TouchableOpacity
        onPress={this.handlePressBubble}
        onLongPress={this.handleSelection}
        activeOpacity={1}>
        {showUnreadSeparator && <UnreadSeparator />}
        <View
          style={[
            styles.msgBody,
            is_outgoing && styles.msgBodyOut,
            selected && styles.messageSelected,
            highlighted && !selected && styles.messageHighlighted,
          ]}>
          {checkIcon}
          <View
            style={[styles.msgWrapper]}>
            {tile}
            <View
              style={[
                styles.msgBase,
                withBubble && styles.msgBubble,
                withBubble && is_outgoing && styles.msgBubbleOut,
              ]}>
              {withBubble && (showTitle || showForward) && (
                <View className="message-title">
                  {showTitle && !showForward && (
                    <MessageAuthor
                      chatId={chatId}
                      openChat
                      userId={sender_user_id}
                      openUser
                    />
                  )}
                  {showForward && <Forward forwardInfo={forward_info} />}
                </View>
              )}
              {Boolean(reply_to_message_id) && (
                <Reply
                  chatId={chatId}
                  messageId={reply_to_message_id}
                  onClick={this.handleReplyClick}
                />
              )}
              {media}
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {text}
              </View>
              {webPage && (
                <WebPage
                  chatId={chatId}
                  messageId={messageId}
                  openMedia={this.handleOpenMedia}
                  meta={inlineMeta}
                />
              )}
              {withBubble && (
                <Meta
                  chatId={chatId}
                  messageId={messageId}
                  date={date}
                  editDate={edit_date}
                  views={views}
                  onDateClick={() => {}}
                />
              )}
            </View>
          </View>
          {/*{canBeForwarded && (*/}
          {/*  <View style={styles.messageActionContainer}>*/}
          {/*    <Image source={messageShareIcon} style={styles.shareIcon} />*/}
          {/*  </View>*/}
          {/*)}*/}
        </View>
      </TouchableOpacity>
    );
  }
}

const enhance = compose(
  // withSaveRef(),
  withTranslation(),
  // withRestoreRef()
);

export default enhance(Message);

const styles = StyleSheet.create({
  msgBody: {
    flexShrink: 1,
    flexGrow: 1,
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  msgBodyOut: {
    justifyContent: 'space-between',
  },
  msgWrapper: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  msgCheckIconContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    width: 40,
    height: 40,
    marginLeft: -10,
  },
  msgBase: {
    flexGrow: 1,
    flexWrap: 'wrap',
    maxWidth: Sizes.width - 120,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  msgBubble: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    backgroundColor: Colors.white,
    borderRadius: 8,
    shadowColor: 'rgba(58,55,55,0.1)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 15,
    elevation: 2,
  },
  msgBubbleOut: {
    backgroundColor: Colors.chat_messageOutBackground,
  },
  goDownImg: {
    width: 30,
    height: 20,
    tintColor: Colors.PanelIcons3,
  },
  messageShortPadding: {
    marginLeft: 40,
  },
  hiddenTile: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  messageSelected: {
    backgroundColor: Colors.chat_messageSelectedBackground,
  },
  messageHighlighted: {
    backgroundColor: Colors.chat_messageSelectedBackground,
  },
  messageActionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginBottom: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colors.chat_messageShareBackground,
  },
  shareIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.white,
  },
});
