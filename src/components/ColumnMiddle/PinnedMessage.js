import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import ReplyTile from '../Tile/ReplyTile';
import {canPinMessages} from '../../utils/chat';
import {
  getContent,
  getReplyMinithumbnail,
  getReplyPhotoSize,
  isDeletedMessage,
} from '../../utils/message';
// import { loadMessageContents } from '../../utils/file';
import {openChat} from '../../actions/clientAction';
import AppStore from '../../store/applicationStore';
import ChatStore from '../../store/chatStore';
import FileStore from '../../store/fileStore';
import MessageStore from '../../store/messageStore';
import DBController from '../../controllers/dbController';
import {Base, Colors, Sizes} from '../../theme';
import {Btn} from '../index';
import Svg from '../../lib/svg';

class PinnedMessage extends React.Component {
  static propTypes = {
    chatId: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  static getDerivedStateFromProps(props, state) {
    const {prevPropsChatId} = state;
    const {chatId} = props;

    if (prevPropsChatId !== chatId) {
      const chat = ChatStore.get(chatId);
      return {
        prevPropsChatId: chatId,
        clientData: ChatStore.getClientData(chatId),
        messageId: chat && chat.pinned_message_id ? chat.pinned_message_id : 0,
        confirm: false,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {messageId} = this.state;

    if (messageId && prevState.messageId !== messageId) {
      this.loadContent();
    }
  }

  componentDidMount() {
    this.loadContent();

    AppStore.on('clientUpdateDialogsReady', this.onClientUpdateDialogsReady);
    ChatStore.on(
      'clientUpdateSetChatClientData',
      this.onClientUpdateSetChatClientData,
    );
    ChatStore.on('clientUpdateUnpin', this.onClientUpdateUnpin);
    ChatStore.on('updateChatPinnedMessage', this.onUpdateChatPinnedMessage);
  }

  componentWillUnmount() {
    AppStore.off('clientUpdateDialogsReady', this.onClientUpdateDialogsReady);
    ChatStore.off(
      'clientUpdateSetChatClientData',
      this.onClientUpdateSetChatClientData,
    );
    ChatStore.off('clientUpdateUnpin', this.onClientUpdateUnpin);
    ChatStore.off('updateChatPinnedMessage', this.onUpdateChatPinnedMessage);
  }

  onClientUpdateUnpin = update => {
    const {chatId} = update;

    if (this.props.chatId !== chatId) {
      return;
    }

    this.handleDelete();
  };

  onClientUpdateDialogsReady = update => {
    const {messageId} = this.state;

    if (messageId) {
      this.loadContent();
    }
  };

  onClientUpdateSetChatClientData = update => {
    const {chatId, clientData} = update;

    if (this.props.chatId !== chatId) {
      return;
    }

    this.setState({clientData});
  };

  onUpdateChatPinnedMessage = update => {
    const {chat_id, pinned_message_id: messageId} = update;
    const {chatId} = this.props;

    if (chatId !== chat_id) {
      return;
    }

    this.setState({messageId});
  };

  loadContent = () => {
    const {chatId} = this.props;
    const {messageId} = this.state;

    if (!chatId) {
      return;
    }
    if (!messageId) {
      return;
    }

    const message = MessageStore.get(chatId, messageId);
    if (message) {
      return;
    }

    // DBController.send({
    //   '@type': 'getMessage',
    //   chat_id: chatId,
    //   message_id: messageId,
    // })
    //   .then(result => {
    //     MessageStore.set(result);
    //
    //     const store = FileStore.getStore();
    //     // TODO: loadMessageContents
    //     // loadMessageContents(store, [result]);
    //
    //     this.forceUpdate();
    //   })
    //   .catch(error => {
    //     const {code, message} = error;
    //     if (message !== 'Chat not found') {
    //       const deletedMessage = {
    //         '@type': 'deletedMessage',
    //         chat_id: chatId,
    //         id: messageId,
    //         content: null,
    //       };
    //
    //       MessageStore.set(deletedMessage);
    //       this.forceUpdate();
    //     }
    //   });
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const {chatId, t, theme} = this.props;
    const {clientData, confirm, messageId} = this.state;

    if (nextProps.t !== t) {
      return true;
    }

    if (nextProps.theme !== theme) {
      return true;
    }

    if (nextProps.chatId !== chatId) {
      return true;
    }

    if (nextState.clientData !== clientData) {
      return true;
    }

    if (nextState.confirm !== confirm) {
      return true;
    }

    if (nextState.messageId !== messageId) {
      return true;
    }

    return false;
  }

  handleClick = event => {
    const {chatId} = this.props;
    const {messageId} = this.state;

    if (!messageId) {
      return;
    }

    openChat(chatId, messageId);
  };

  handleDelete = async event => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const {chatId} = this.props;
    const {messageId} = this.state;

    const canPin = canPinMessages(chatId);
    if (canPin) {
      this.setState({confirm: true});
    } else {
      const data = ChatStore.getClientData(chatId);
      await DBController.clientUpdate({
        '@type': 'clientUpdateSetChatClientData',
        chatId: chatId,
        clientData: Object.assign({}, data, {unpinned_message_id: messageId}),
      });
    }
  };

  handleUnpin = async () => {
    const {chatId} = this.props;

    this.handleClose();

    DBController.send({
      '@type': 'unpinChatMessage',
      chat_id: chatId,
    });

    // DBController.clientUpdate({
    //   '@type': 'clientUpdateUnpin',
    //   chat_id: chatId,
    // });
  };

  handleClose = () => {
    this.setState({confirm: false});
  };

  render() {
    const {chatId, t} = this.props;
    const {messageId, confirm} = this.state;

    if (!chatId) {
      return null;
    }

    const clientData = ChatStore.getClientData(chatId);
    if (!clientData) {
      return null;
    }

    const {unpinned_message_id} = clientData;
    if (unpinned_message_id === messageId) {
      return null;
    }

    const message = MessageStore.get(chatId, messageId);
    if (!message) {
      return null;
    }

    let content = !message ? t('Loading') : getContent(message, t);
    const photoSize = getReplyPhotoSize(chatId, messageId);
    const minithumbnail = getReplyMinithumbnail(chatId, messageId);

    if (isDeletedMessage(message)) {
      content = t('DeletedMessage');
    }

    return (
      <>
        <TouchableOpacity onPress={this.handleClick} activeOpacity={1} style={styles.pinnedMessage}>
          <View style={styles.replyBorder} />
          {photoSize && (
            <ReplyTile
              chatId={chatId}
              messageId={messageId}
              photoSize={photoSize}
              minithumbnail={minithumbnail}
            />
          )}
          <View style={styles.pinnedMessageContent}>
            <Text style={styles.pinnedMessageTitle} numberOfLines={1}>
              {t('PinnedMessage')}
            </Text>
            <Text style={styles.pinnedMessageSubtitle} numberOfLines={1}>
              {content}
            </Text>
          </View>
          <View style={[Base.flexCenter, {width: 25}]}>
            <Btn circular={true} onPress={this.handleUnpin}>
              <Svg icon="close" size="18" fill={Colors.gray} />
            </Btn>
          </View>
        </TouchableOpacity>
        {/*{confirm && (*/}
        {/*  <Dialog*/}
        {/*    transitionDuration={0}*/}
        {/*    open*/}
        {/*    onClose={this.handleClose}*/}
        {/*    aria-labelledby='unpin-message-confirmation'>*/}
        {/*    <DialogTitle id='unpin-message-confirmation'>{t('Confirm')}</DialogTitle>*/}
        {/*    <DialogContent>*/}
        {/*      <DialogContentText>{t('UnpinMessageAlert')}</DialogContentText>*/}
        {/*    </DialogContent>*/}
        {/*    <DialogActions>*/}
        {/*      <Button onClick={this.handleClose} color='primary'>*/}
        {/*        {t('Cancel')}*/}
        {/*      </Button>*/}
        {/*      <Button onClick={this.handleUnpin} color='primary'>*/}
        {/*        {t('Ok')}*/}
        {/*      </Button>*/}
        {/*    </DialogActions>*/}
        {/*  </Dialog>*/}
        {/*)}*/}
      </>
    );
  }
}

const styles = StyleSheet.create({
  pinnedMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: Sizes.onePixel,
    borderBottomColor: Colors.borderOne,
    paddingHorizontal: 8,
    backgroundColor: Colors.white,
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  replyBorder: {
    height: 30,
    minWidth: 2,
    backgroundColor: Colors.colorAccentMain,
  },
  pinnedMessageContent: {
    marginLeft: 5,
    flexGrow: 1,
    flexShrink: 1,
  },
  pinnedMessageTitle: {
    color: Colors.colorAccentMain,
    fontWeight: '700',
  },
  pinnedMessageSubtitle: {
    fontSize: 14,
    lineHeight: 16,
    color: Colors.grayText,
  },
});

export default withTranslation()(PinnedMessage);
