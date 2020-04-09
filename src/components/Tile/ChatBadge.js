import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  isChatMuted,
  showChatUnreadCount,
  showChatUnreadMentionCount,
  showChatUnreadMessageIcon,
} from '../../utils/chat';
import ChatStore from '../../store/chatStore';
import {Colors} from '../../theme';
import PinIcon from '../../assets/svgIcons/Pin';
// import NotificationStore from '../../Stores/NotificationStore';

class ChatBadge extends Component {
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
    // ChatStore.on('updateChatIsMarkedAsUnread', this.onUpdate);
    // ChatStore.on('updateChatIsPinned', this.onUpdate);
    // ChatStore.on('updateChatNotificationSettings', this.onUpdate);
    // ChatStore.on('updateChatReadInbox', this.onUpdate);
    // ChatStore.on('updateChatLastMessage', this.onUpdate);
    // ChatStore.on('updateChatReadOutbox', this.onUpdate);
    // ChatStore.on('updateChatUnreadMentionCount', this.onUpdate);
    // ChatStore.on('updateMessageMentionRead', this.onUpdate);
    // NotificationStore.on('updateScopeNotificationSettings', this.onUpdateScopeNotificationSettings);
  }

  componentWillUnmount() {
    // ChatStore.off('clientUpdateFastUpdatingComplete', this.onFastUpdatingComplete);
    // ChatStore.off('clientUpdateClearHistory', this.onClientUpdateClearHistory);
    // ChatStore.off('updateChatDraftMessage', this.onUpdate);
    // ChatStore.off('updateChatIsMarkedAsUnread', this.onUpdate);
    // ChatStore.off('updateChatIsPinned', this.onUpdate);
    // ChatStore.off('updateChatNotificationSettings', this.onUpdate);
    // ChatStore.off('updateChatReadInbox', this.onUpdate);
    // ChatStore.off('updateChatLastMessage', this.onUpdate);
    // ChatStore.off('updateChatReadOutbox', this.onUpdate);
    // ChatStore.off('updateChatUnreadMentionCount', this.onUpdate);
    // ChatStore.off('updateMessageMentionRead', this.onUpdate);
    // NotificationStore.off('updateScopeNotificationSettings', this.onUpdateScopeNotificationSettings);
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

    if (update.chat_id !== chatId) {
      return;
    }

    this.forceUpdate();
  };

  onUpdateScopeNotificationSettings = update => {
    const {chatId} = this.props;

    const chat = ChatStore.get(chatId);
    if (!chat) {
      return;
    }

    switch (update.scope['@type']) {
      case 'notificationSettingsScopeGroupChats': {
        if (
          chat.type['@type'] === 'chatTypeBasicGroup' ||
          chat.type['@type'] === 'chatTypeSupergroup'
        ) {
          this.forceUpdate();
        }
        break;
      }
      case 'notificationSettingsScopePrivateChats': {
        if (
          chat.type['@type'] === 'chatTypePrivate' ||
          chat.type['@type'] === 'chatTypeSecret'
        ) {
          this.forceUpdate();
        }
        break;
      }
    }
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

    const {is_pinned, unread_count} = chat;

    const showUnreadMessageIcon = false; //showChatUnreadMessageIcon(chatId);
    const showUnreadMentionCount = showChatUnreadMentionCount(chatId);
    const showUnreadCount = showChatUnreadCount(chatId);
    const isMuted = isChatMuted(chatId);

    return (
      <>
        {/*{showUnreadMessageIcon && <i className="dialog-badge-unread" />}*/}
        {showUnreadMentionCount && (
          <View className="dialog-badge">
            <Text className="dialog-badge-mention">@</Text>
          </View>
        )}
        {showUnreadCount && (
          <View
            style={[
              styles.chatBadge,
              {
                backgroundColor: isMuted
                  ? Colors.chats_unreadCounterMuted
                  : Colors.chats_unreadCounter,
              },
            ]}>
            <Text style={styles.chatBadgeText}>
              {unread_count > 0 ? unread_count : ''}
            </Text>
          </View>
        )}
        {is_pinned &&
          !showUnreadMessageIcon &&
          !showUnreadCount &&
          !showUnreadMentionCount && (
            <View style={styles.pinnedIcon}>
              <PinIcon />
            </View>
          )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  chatBadge: {
    paddingVertical: 0,
    paddingHorizontal: 5,
    minWidth: 24,
    minHeight: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  chatBadgeText: {
    fontSize: 14,
    color: Colors.chats_unreadCounterText,
  },
  pinnedIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: Colors.borderOne,
  },
});

export default ChatBadge;
