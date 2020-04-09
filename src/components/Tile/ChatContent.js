import React, {Component} from 'react';
import {View, Text, StyleSheet } from 'react-native';
import {withTranslation} from 'react-i18next';
import {
  getChatTypingString,
  getChatDraft,
  getLastMessageSenderName,
  getLastMessageContent,
  showChatDraft,
} from '../../utils/chat';
import ChatStore from '../../store/chatStore';
import { Colors, Sizes } from '../../theme';

class ChatContent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const {chatId, t} = this.props;

    if (nextProps.chatId !== chatId) {
      return true;
    }

    if (nextProps.t !== t) {
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
    // ChatStore.on('updateUserChatAction', this.onUpdate);
  }

  componentWillUnmount() {
    // ChatStore.off('clientUpdateFastUpdatingComplete', this.onFastUpdatingComplete);
    // ChatStore.off('clientUpdateClearHistory', this.onClientUpdateClearHistory);
    // ChatStore.off('updateChatDraftMessage', this.onUpdate);
    // ChatStore.off('updateChatLastMessage', this.onUpdate);
    // ChatStore.off('updateChatReadInbox', this.onUpdate);
    // ChatStore.off('updateUserChatAction', this.onUpdate);
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
    const {chatId, t} = this.props;

    if (this.clearHistory) {
      return <Text numberOfLines={1} className="dialog-content">{'\u00A0'}</Text>;
    }

    const chat = ChatStore.get(chatId);
    if (!chat) {
      return <Text numberOfLines={1} className="dialog-content">{'\u00A0'}</Text>;
    }

    let contentControl = null;
    const typingString = getChatTypingString(chatId);
    if (typingString) {
      contentControl = (
        <Text numberOfLines={1} className="dialog-content-accent">{typingString}</Text>
      );
    }

    if (!contentControl) {
      const draft = getChatDraft(chatId);
      if (showChatDraft(chatId)) {
        const text = draft.text || '\u00A0';

        contentControl = (
          <>
            <Text numberOfLines={1} className="dialog-content-draft">{t('Draft') + ': '}</Text>
            <Text numberOfLines={1}>{text}</Text>
          </>
        );
      }
    }

    if (!contentControl) {
      const content = getLastMessageContent(chat, t) || '\u00A0';
      const senderName = getLastMessageSenderName(chat);
      contentControl = (
        <>
          {senderName && (
            <Text numberOfLines={1} style={styles.contentAccent}>{senderName}: </Text>
          )}
          <Text numberOfLines={1} style={styles.content}>{content}</Text>
        </>
      );
    }

    return <View style={styles.contentContainer}>{contentControl}</View>;
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    maxWidth: Sizes.width - 120,
  },
  content: {
    color: Colors.chats_content,
  },
  contentAccent: {
    color: Colors.chats_contentAccent,
  },
})

export default withTranslation()(ChatContent);
