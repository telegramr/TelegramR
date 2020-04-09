import React, {Component} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
// import ErrorIcon from '../../Assets/Icons/Error';
// import PendingIcon from '../../Assets/Icons/Pending';
// import SentIcon from '../../Assets/Icons/Sent';
// import SucceededIcon from '../../Assets/Icons/Succeeded';
import {isMessageUnread} from '../../utils/message';
import {Base} from '../../theme';
import ChatStore from '../../store/chatStore';
import MessageStore from '../../store/messageStore';
import SentIcon from '../../assets/svgIcons/Sent';
import PinIcon from '../../assets/svgIcons/Pin';
import ErrorIcon from '../../assets/svgIcons/Error';
import SucceededIcon from '../../assets/svgIcons/Succeeded';

class Status extends Component {
  static propTypes = {
    chatId: PropTypes.number.isRequired,
    messageId: PropTypes.number.isRequired,
  };

  state = {};

  static getDerivedStateFromProps(props, state) {
    const {chatId, messageId} = props;

    const message = MessageStore.get(chatId, messageId);
    const sendingState = message ? message.sending_state : null;

    if (chatId !== state.prevChatId || messageId !== state.prevMessageId) {
      return {
        prevChatId: chatId,
        prevMessageId: messageId,
        sendingState,
        unread: isMessageUnread(chatId, messageId),
      };
    }

    return null;
  }

  componentDidMount() {
    // ChatStore.on('updateChatReadOutbox', this.onUpdateChatReadOutbox);
    //
    // MessageStore.on('updateMessageSendFailed', this.onUpdateMessageSend);
    // MessageStore.on('updateMessageSendSucceeded', this.onUpdateMessageSend);
  }

  componentWillUnmount() {
    // ChatStore.off('updateChatReadOutbox', this.onUpdateChatReadOutbox);
    //
    // MessageStore.off('updateMessageSendFailed', this.onUpdateMessageSend);
    // MessageStore.off('updateMessageSendSucceeded', this.onUpdateMessageSend);
  }

  onUpdateMessageSend = update => {
    const {chatId, messageId} = this.props;
    const {old_message_id, message} = update;

    if (messageId !== old_message_id) {
      return;
    }
    if (!message) {
      return;
    }

    const {chat_id, id, sending_state} = message;
    if (chatId !== chat_id) {
      return;
    }

    this.newMessageId = id;
    this.setState({sendingState: sending_state});
  };

  onUpdateChatReadOutbox = update => {
    const {chatId, messageId} = this.props;
    const {chat_id, last_read_outbox_message_id} = update;
    const {newMessageId} = this;

    if (chatId !== chat_id) {
      return;
    }

    if (
      (newMessageId && newMessageId <= last_read_outbox_message_id) ||
      messageId <= last_read_outbox_message_id
    ) {
      this.setState({sendingState: null, unread: false});
    }
  };

  render() {
    const {sendingState, unread} = this.state;
    if (!unread) {
      return (
        <View style={{...Base.flexCenter, width: 18, height: 18}}>
          <SucceededIcon />
        </View>
      );
    }

    if (sendingState) {
      return sendingState['@type'] === 'messageSendingStateFailed' ? (
        <View style={{...Base.flexCenter, width: 18, height: 18}}>
          <ErrorIcon />
        </View>
      ) : (
        <View style={{...Base.flexCenter, width: 18, height: 18}}>
          <PinIcon />
        </View>
      );
    }
    return (
      <View style={{...Base.flexCenter, width: 18, height: 18}}>
        <SentIcon />
      </View>
    );
  }
}

export default Status;
