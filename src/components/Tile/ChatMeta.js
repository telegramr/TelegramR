import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Status from '../Message/Status';
import {getLastMessageDate} from '../../utils/chat';
import ChatStore from '../../store/chatStore';
import { Base, Colors } from '../../theme';

class ChatMeta extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const {chatId} = this.props;

    if (nextProps.chatId !== chatId) {
      return true;
    }

    return false;
  }

  componentDidMount() {
    // ChatStore.on('clientUpdateFastUpdatingComplete', this.onFastUpdatingComplete);
    // ChatStore.on('clientUpdateClearHistory', this.onClientUpdateClearHistory);
    // ChatStore.on('updateChatDraftMessage', this.onUpdate);
    // ChatStore.on('updateChatLastMessage', this.onUpdate);
    // ChatStore.on('updateChatReadInbox', this.onUpdate);
    // ChatStore.on('updateChatUnreadMentionCount', this.onUpdate);
    // ChatStore.on('updateMessageMentionRead', this.onUpdate);
  }

  componentWillUnmount() {
    // ChatStore.off('clientUpdateFastUpdatingComplete', this.onFastUpdatingComplete);
    // ChatStore.off('clientUpdateClearHistory', this.onClientUpdateClearHistory);
    // ChatStore.off('updateChatDraftMessage', this.onUpdate);
    // ChatStore.off('updateChatLastMessage', this.onUpdate);
    // ChatStore.off('updateChatReadInbox', this.onUpdate);
    // ChatStore.off('updateChatUnreadMentionCount', this.onUpdate);
    // ChatStore.off('updateMessageMentionRead', this.onUpdate);
  }

  onClientUpdateClearHistory = update => {
    const {chatId} = this.props;

    if (chatId === update.chatId) {
      this.clearHistory = update.inProgress;
      this.forceUpdate();
    }
  };

  onFastUpdatingComplete = update => {
    this.forceUpdate();
  };

  onUpdate = update => {
    const {chatId} = this.props;

    if (chatId !== update.chat_id) {
      return;
    }

    this.forceUpdate();
  };

  render() {
    if (this.clearHistory) {
      return null;
    }

    const {chatId} = this.props;

    const chat = ChatStore.get(chatId);
    if (!chat) {
      return null;
    }

    const {last_message} = chat;
    if (!last_message) {
      return null;
    }

    const date = getLastMessageDate(chat);
    if (!date) {
      return null;
    }

    const {id, is_outgoing} = last_message;

    return (
      <View style={Base.flexCenter}>
        {is_outgoing && (
          <>
            <Status chatId={chatId} messageId={id} />
            <Text> </Text>
          </>
        )}
        <Text style={{fontSize: 12, color: Colors.grayText}}>{date}</Text>
      </View>
    );
  }
}

export default ChatMeta;
