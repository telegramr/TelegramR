import dayjs from 'dayjs';
import ChatStore from '../store/chatStore';
import UserStore from '../store/userStore';
import SuperGroupStore from '../store/superGroupStore';
import BasicGroupStore from '../store/basicGroupStore';
import NotificationStore from '../store/notificationStore';
import {getBasicGroupStatus} from './basicGroup';
import {getSupergroupStatus} from './supergroup';
import {getLetters} from './common';
import {
  getUserFullName,
  getUserShortName,
  getUserStatus,
  isUserOnline,
} from './user';
import {isServiceMessage} from './serviceMessage';
import {getContent} from './message';

function getMessageDate(message): string {
  const date = new Date(message.date * 1000);

  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);
  if (date > dayStart) {
    return dayjs(date).format('HH:mm');
  }

  const now = new Date();
  const day = now.getDay();
  const weekStart = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(weekStart));
  if (date > monday) {
    return dayjs(date).format('ddd');
  }
  return dayjs(date).format('MM-DD');
}

function getLastMessageDate(chat): string {
  if (!chat) {
    return null;
  }
  if (!chat.last_message) {
    return null;
  }
  if (!chat.last_message.date) {
    return null;
  }
  // if (showChatDraft(chat.id)) return null;

  return getMessageDate(chat.last_message);
}

function getChatSubtitleWithoutTyping(chatId) {
  const chat = ChatStore.get(chatId);
  if (!chat) {
    return null;
  }

  const {type} = chat;
  if (!type) {
    return null;
  }

  switch (type['@type']) {
    case 'chatTypeBasicGroup': {
      const basicGroup = BasicGroupStore.get(type.basic_group_id);
      if (basicGroup) {
        return getBasicGroupStatus(basicGroup, chatId);
      }

      break;
    }
    case 'chatTypePrivate':
    case 'chatTypeSecret': {
      const user = UserStore.get(type.user_id);
      if (user) {
        return getUserStatus(user);
      }

      break;
    }
    case 'chatTypeSupergroup': {
      const supergroup = SuperGroupStore.get(type.supergroup_id);
      if (supergroup) {
        return getSupergroupStatus(supergroup, chatId);
      }

      break;
    }
  }

  return null;
}

function showChatUnreadCount(chatId): boolean {
  const chat = ChatStore.get(chatId);
  if (!chat) {
    return false;
  }

  const {is_marked_as_unread, unread_count, unread_mention_count} = chat;

  return (
    unread_count > 1 ||
    (unread_count === 1 && unread_mention_count === 0) ||
    (is_marked_as_unread && unread_count === 0 && unread_mention_count === 0)
  );
}

function getChatTitle(chatId, showSavedMessages = false, t = key => key) {
  const chat = ChatStore.get(chatId);
  if (!chat) {
    return null;
  }

  if (isMeChat(chatId) && showSavedMessages) {
    return t('SavedMessages');
  }

  return chat.title || t('HiddenName');
}

function isMeChat(chatId) {
  const fallbackValue = false;

  const chat = ChatStore.get(chatId);
  if (!chat) {
    return fallbackValue;
  }

  switch (chat.type['@type']) {
    case 'chatTypeBasicGroup':
    case 'chatTypeSupergroup': {
      return false;
    }
    case 'chatTypeSecret':
    case 'chatTypePrivate': {
      return UserStore.getMyId() === chat.type.user_id;
    }
  }

  return fallbackValue;
}

function isChannelChat(chatId) {
  const chat = ChatStore.get(chatId);
  if (!chat) {
    return false;
  }
  if (!chat.type) {
    return false;
  }

  switch (chat.type['@type']) {
    case 'chatTypeSupergroup': {
      const supergroup = SuperGroupStore.get(chat.type.supergroup_id);

      return supergroup && supergroup.is_channel;
    }
    case 'chatTypeBasicGroup':
    case 'chatTypePrivate':
    case 'chatTypeSecret': {
      return false;
    }
  }

  return false;
}

function isPrivateChat(chatId) {
  const chat = ChatStore.get(chatId);
  if (!chat) {
    return false;
  }
  if (!chat.type) {
    return false;
  }

  switch (chat.type['@type']) {
    case 'chatTypeBasicGroup':
    case 'chatTypeSupergroup': {
      return false;
    }
    case 'chatTypePrivate':
    case 'chatTypeSecret': {
      return true;
    }
  }

  return false;
}

function canSendDocuments(chatId) {
  const chat = ChatStore.get(chatId);
  if (!chat) {
    return false;
  }

  const {type} = chat;
  if (!type) {
    return false;
  }

  switch (chat.type['@type']) {
    case 'chatTypeBasicGroup': {
      return true;
    }
    case 'chatTypePrivate': {
      return true;
    }
    case 'chatTypeSecret': {
      return true;
    }
    case 'chatTypeSupergroup': {
      const supergroup = SuperGroupStore.get(type.supergroup_id);
      if (supergroup) {
        const {status} = supergroup;
        if (status) {
          switch (supergroup.status['@type']) {
            case 'chatMemberStatusAdministrator': {
              return true;
            }
            case 'chatMemberStatusBanned': {
              return false;
            }
            case 'chatMemberStatusCreator': {
              return true;
            }
            case 'chatMemberStatusLeft': {
              return false;
            }
            case 'chatMemberStatusMember': {
              return !supergroup.is_channel;
            }
            case 'chatMemberStatusRestricted': {
              return status.can_send_media_messages;
            }
          }
        }
      }
    }
  }

  return false;
}

function canSendPolls(chatId) {
  return true;
}

function canSendMessages(chatId) {
  const chat = ChatStore.get(chatId);
  if (!chat) {
    return false;
  }

  const {type} = chat;
  if (!type) {
    return false;
  }

  switch (chat.type['@type']) {
    case 'chatTypeBasicGroup': {
      const basicGroup = BasicGroupStore.get(type.basic_group_id);
      if (basicGroup && basicGroup.status) {
        switch (basicGroup.status['@type']) {
          case 'chatMemberStatusAdministrator': {
            return true;
          }
          case 'chatMemberStatusBanned': {
            return false;
          }
          case 'chatMemberStatusCreator': {
            return true;
          }
          case 'chatMemberStatusLeft': {
            return false;
          }
          case 'chatMemberStatusMember': {
            return true;
          }
          case 'chatMemberStatusRestricted': {
            if (basicGroup.status.can_send_messages) {
              return true;
            } else {
              return false;
            }
          }
        }
      }

      break;
    }
    case 'chatTypePrivate': {
      return true;
    }
    case 'chatTypeSecret': {
      return true;
    }
    case 'chatTypeSupergroup': {
      const supergroup = SuperGroupStore.get(type.supergroup_id);
      if (supergroup && supergroup.status) {
        switch (supergroup.status['@type']) {
          case 'chatMemberStatusAdministrator': {
            return true;
          }
          case 'chatMemberStatusBanned': {
            return false;
          }
          case 'chatMemberStatusCreator': {
            return true;
          }
          case 'chatMemberStatusLeft': {
            return false;
          }
          case 'chatMemberStatusMember': {
            if (supergroup.is_channel) {
              return false;
            } else {
              return true;
            }
          }
          case 'chatMemberStatusRestricted': {
            if (supergroup.status.can_send_messages) {
              return true;
            } else {
              return false;
            }
          }
        }
      }
    }
  }

  return false;
}

function showChatDraft(chatId) {
  const chat = ChatStore.get(chatId);
  const draft = getChatDraft(chatId);

  return draft && chat.unread_count === 0 && chat.unread_mention_count === 0;
}

function getChatDraft(chatId) {
  const chat = ChatStore.get(chatId);

  if (chat) {
    const {draft_message} = chat;
    if (draft_message) {
      const {input_message_text} = draft_message;
      if (input_message_text) {
        return input_message_text.text;
      }
    }
  }

  return null;
}

function getChatLetters(chat) {
  if (!chat) {
    return null;
  }

  let title = chat.title || 'Deleted account';
  if (title.length === 0) {
    return null;
  }

  let letters = getLetters(title);
  if (letters && letters.length > 0) {
    return letters;
  }

  return chat.title.charAt(0);
}

function getChatDraftReplyToMessageId(chatId) {
  let replyToMessageId = 0;
  const chat = ChatStore.get(chatId);
  if (chat) {
    const {draft_message} = chat;
    if (draft_message) {
      replyToMessageId = draft_message.reply_to_message_id;
    }
  }

  return replyToMessageId;
}

function canPinMessages(chatId) {
  const chat = ChatStore.get(chatId);
  if (!chat) {
    return false;
  }

  const {type} = chat;
  if (!type) {
    return false;
  }

  switch (chat.type['@type']) {
    case 'chatTypeBasicGroup': {
      const basicGroup = BasicGroupStore.get(type.basic_group_id);
      if (basicGroup && basicGroup.status) {
        switch (basicGroup.status['@type']) {
          case 'chatMemberStatusAdministrator': {
            return basicGroup.status.can_pin_messages;
          }
          case 'chatMemberStatusBanned': {
            return false;
          }
          case 'chatMemberStatusCreator': {
            return true;
          }
          case 'chatMemberStatusLeft': {
            return false;
          }
          case 'chatMemberStatusMember': {
            return false;
          }
          case 'chatMemberStatusRestricted': {
            return false;
          }
        }
      }

      break;
    }
    case 'chatTypePrivate': {
      return isMeChat(chatId);
    }
    case 'chatTypeSecret': {
      return false;
    }
    case 'chatTypeSupergroup': {
      const supergroup = SuperGroupStore.get(type.supergroup_id);
      if (supergroup && supergroup.status) {
        switch (supergroup.status['@type']) {
          case 'chatMemberStatusAdministrator': {
            return supergroup.status.can_pin_messages;
          }
          case 'chatMemberStatusBanned': {
            return false;
          }
          case 'chatMemberStatusCreator': {
            return true;
          }
          case 'chatMemberStatusLeft': {
            return false;
          }
          case 'chatMemberStatusMember': {
            return false;
          }
          case 'chatMemberStatusRestricted': {
            return false;
          }
        }
      }
    }
  }

  return false;
}

function isChatVerified(chatId) {
  const chat = ChatStore.get(chatId);
  if (!chat) {
    return false;
  }

  const {type} = chat;
  if (!type) {
    return false;
  }

  switch (chat.type['@type']) {
    case 'chatTypeBasicGroup': {
      return false;
    }
    case 'chatTypePrivate':
    case 'chatTypeSecret': {
      const user = UserStore.get(type.user_id);

      return user && user.is_verified;
    }
    case 'chatTypeSupergroup': {
      const supergroup = SuperGroupStore.get(type.supergroup_id);

      return supergroup && supergroup.is_verified;
    }
  }

  return false;
}

function isChatSecret(chatId) {
  const chat = ChatStore.get(chatId);
  if (!chat) {
    return false;
  }

  const {type} = chat;
  if (!type) {
    return false;
  }

  switch (chat.type['@type']) {
    case 'chatTypeBasicGroup': {
      return false;
    }
    case 'chatTypePrivate': {
      return false;
    }
    case 'chatTypeSecret': {
      return true;
    }
    case 'chatTypeSupergroup': {
      return false;
    }
  }

  return false;
}

function getGroupChatTypingString(inputTypingManager) {
  if (!inputTypingManager) {
    return null;
  }

  let size = inputTypingManager.actions.size;
  if (size > 2) {
    return `${size} people are typing`;
  } else if (size > 1) {
    let firstUser;
    let secondUser;
    for (let userId of inputTypingManager.actions.keys()) {
      if (!firstUser) {
        firstUser = UserStore.get(userId);
      } else if (!secondUser) {
        secondUser = UserStore.get(userId);
        break;
      }
    }

    if (!firstUser || !secondUser) {
      return `${size} people are typing`;
    }

    firstUser = firstUser.first_name
      ? firstUser.first_name
      : firstUser.second_name;
    secondUser = secondUser.first_name
      ? secondUser.first_name
      : secondUser.second_name;

    if (!firstUser || !secondUser) {
      return `${size} people are typing`;
    }

    return `${firstUser} and ${secondUser} are typing`;
  } else {
    let firstUser;
    if (inputTypingManager.actions.size >= 1) {
      for (let userId of inputTypingManager.actions.keys()) {
        if (!firstUser) {
          firstUser = UserStore.get(userId);
          break;
        }
      }

      if (!firstUser) {
        return '1 person is typing';
      }

      firstUser = firstUser.first_name
        ? firstUser.first_name
        : firstUser.second_name;

      if (!firstUser) {
        return '1 person is typing';
      }

      let action = inputTypingManager.actions.values().next().value.action;
      switch (action['@type']) {
        case 'chatActionRecordingVideo':
          return `${firstUser} is recording a video`;
        case 'chatActionRecordingVideoNote':
          return `${firstUser} is recording a video message`;
        case 'chatActionRecordingVoiceNote':
          return `${firstUser} is recording a voice message`;
        case 'chatActionStartPlayingGame':
          return `${firstUser} is playing a game`;
        case 'chatActionUploadingDocument':
          return `${firstUser} is sending a file`;
        case 'chatActionUploadingPhoto':
          return `${firstUser} is sending a photo`;
        case 'chatActionUploadingVideo':
          return `${firstUser} is sending a video`;
        case 'chatActionUploadingVideoNote':
          return `${firstUser} is sending a video message`;
        case 'chatActionUploadingVoiceNote':
          return `${firstUser} is sending a voice message`;
        case 'chatActionChoosingContact':
        case 'chatActionChoosingLocation':
        case 'chatActionTyping':
        default:
          return `${firstUser} is typing`;
      }
    }
  }

  return null;
}

function getPrivateChatTypingString(inputTypingManager) {
  if (!inputTypingManager) {
    return null;
  }

  if (inputTypingManager.actions.size >= 1) {
    let action = inputTypingManager.actions.values().next().value.action;
    switch (action['@type']) {
      case 'chatActionRecordingVideo':
        return 'recording a video';
      case 'chatActionRecordingVideoNote':
        return 'recording a video message';
      case 'chatActionRecordingVoiceNote':
        return 'recording a voice message';
      case 'chatActionStartPlayingGame':
        return 'playing a game';
      case 'chatActionUploadingDocument':
        return 'sending a file';
      case 'chatActionUploadingPhoto':
        return 'sending a photo';
      case 'chatActionUploadingVideo':
        return 'sending a video';
      case 'chatActionUploadingVideoNote':
        return 'sending a video message';
      case 'chatActionUploadingVoiceNote':
        return 'sending a voice message';
      case 'chatActionChoosingContact':
      case 'chatActionChoosingLocation':
      case 'chatActionTyping':
      default:
        return 'typing';
    }
  }

  return null;
}

export function getChatTypingString(chatId) {
  const chat = ChatStore.get(chatId);
  if (!chat) {
    return null;
  }
  if (!chat.type) {
    return null;
  }

  let typingManager = ChatStore.getTypingManager(chat.id);
  if (!typingManager) {
    return null;
  }

  switch (chat.type['@type']) {
    case 'chatTypePrivate':
    case 'chatTypeSecret': {
      const typingString = getPrivateChatTypingString(typingManager);
      return typingString ? typingString + '...' : null;
    }
    case 'chatTypeBasicGroup':
    case 'chatTypeSupergroup': {
      const typingString = getGroupChatTypingString(typingManager);
      return typingString ? typingString + '...' : null;
    }
  }

  return null;
}

function getMessageSenderFullName(message) {
  if (!message) {
    return null;
  }
  if (isServiceMessage(message)) {
    return null;
  }
  if (!message.sender_user_id) {
    return null;
  }

  const user = UserStore.get(message.sender_user_id);
  if (!user) {
    return null;
  }

  return getUserFullName(user);
}

function getMessageSenderName(message) {
  if (!message) {
    return null;
  }
  if (isServiceMessage(message)) {
    return null;
  }

  const chat = ChatStore.get(message.chat_id);
  if (
    chat &&
    chat.type['@type'] !== 'chatTypeBasicGroup' &&
    chat.type['@type'] !== 'chatTypeSupergroup'
  ) {
    return null;
  }

  return getUserShortName(message.sender_user_id);
}

function getLastMessageSenderName(chat) {
  if (!chat) {
    return null;
  }

  return getMessageSenderName(chat.last_message);
}

function getLastMessageContent(chat, t = key => key) {
  if (!chat) {
    return null;
  }

  const {last_message} = chat;
  if (!last_message) {
    return null;
  }

  return getContent(last_message, t);
}

function showChatUnreadMessageIcon(chatId) {
  const chat = ChatStore.get(chatId);
  if (!chat) {
    return false;
  }

  const {is_marked_as_unread, last_message, last_read_outbox_message_id} = chat;
  if (!last_message) {
    return false;
  }

  const {is_outgoing} = last_message;

  return (
    is_outgoing &&
    last_message.id > last_read_outbox_message_id &&
    !is_marked_as_unread &&
    !showChatDraft(chatId)
  );
}

function showChatUnreadMentionCount(chatId) {
  const chat = ChatStore.get(chatId);
  if (!chat) {
    return false;
  }

  const {unread_mention_count} = chat;

  return unread_mention_count > 0;
}

function isChatMuted(chatId) {
  return getChatMuteFor(chatId) > 0;
}

function getChatMuteFor(chatId) {
  const chat = ChatStore.get(chatId);
  if (!chat) {
    return 0;
  }

  const {notification_settings} = chat;
  if (!notification_settings) {
    return 0;
  }

  const {use_default_mute_for, mute_for} = notification_settings;

  if (use_default_mute_for) {
    const settings = getScopeNotificationSettings(chatId);

    return settings ? settings.mute_for : false;
  }

  return mute_for;
}

function getScopeNotificationSettings(chatId) {
  const chat = ChatStore.get(chatId);
  if (!chat) {
    return null;
  }

  switch (chat.type['@type']) {
    case 'chatTypePrivate':
    case 'chatTypeSecret': {
      return NotificationStore.settings.get(
        'notificationSettingsScopePrivateChats',
      );
    }
    case 'chatTypeBasicGroup':
    case 'chatTypeSupergroup': {
      let settings = null;
      if (isChannelChat(chatId)) {
        settings = NotificationStore.settings.get(
          'notificationSettingsScopeChannelChats',
        );
      } else {
        settings = NotificationStore.settings.get(
          'notificationSettingsScopeGroupChats',
        );
      }
      return settings;
    }
  }

  return null;
}

function getChatDisableMentionNotifications(chatId) {
  const chat = ChatStore.get(chatId);
  if (!chat) {
    return false;
  }

  const {notification_settings} = chat;
  if (!notification_settings) {
    return false;
  }

  const {
    use_default_disable_mention_notifications,
    disable_mention_notifications,
  } = notification_settings;
  if (use_default_disable_mention_notifications) {
    const settings = getScopeNotificationSettings(chatId);

    return settings ? settings.disable_mention_notifications : false;
  }

  return disable_mention_notifications;
}

function getChatDisablePinnedMessageNotifications(chatId) {
  const chat = ChatStore.get(chatId);
  if (!chat) {
    return false;
  }

  const {notification_settings} = chat;
  if (!chat) {
    return false;
  }

  const {
    use_default_disable_pinned_message_notifications,
    disable_pinned_message_notifications,
  } = notification_settings;
  if (use_default_disable_pinned_message_notifications) {
    const settings = getScopeNotificationSettings(chatId);

    return settings ? settings.disable_pinned_message_notifications : false;
  }

  return disable_pinned_message_notifications;
}

function getChatShortTitle(chatId, showSavedMessages = false) {
  if (isMeChat(chatId) && showSavedMessages) {
    return 'Saved Messages';
  }

  const chat = ChatStore.get(chatId);
  if (!chat) {
    return null;
  }
  if (!chat.type) {
    return null;
  }

  switch (chat.type['@type']) {
    case 'chatTypeBasicGroup': {
      return chat.title;
    }
    case 'chatTypeSupergroup': {
      return chat.title;
    }
    case 'chatTypePrivate':
    case 'chatTypeSecret': {
      return getUserShortName(chat.type.user_id);
    }
  }

  return null;
}

function getChatSubtitle(chatId, showSavedMessages = false) {
  if (isMeChat(chatId) && showSavedMessages) {
    return null;
  }

  const chatTypingString = getChatTypingString(chatId);
  if (chatTypingString) {
    return chatTypingString;
  }

  return getChatSubtitleWithoutTyping(chatId);
}

function isAccentChatSubtitle(chatId) {
  const typingString = getChatTypingString(chatId);
  if (typingString) {
    return false;
  }

  return isAccentChatSubtitleWithoutTyping(chatId);
}

function isAccentChatSubtitleWithoutTyping(chatId) {
  const chat = ChatStore.get(chatId);
  if (!chat) {
    return false;
  }
  if (!chat.type) {
    return false;
  }

  switch (chat.type['@type']) {
    case 'chatTypeBasicGroup': {
      return false;
    }
    case 'chatTypePrivate':
    case 'chatTypeSecret': {
      const user = UserStore.get(chat.type.user_id);
      if (user) {
        return isUserOnline(user);
      }

      break;
    }
    case 'chatTypeSupergroup': {
      return false;
    }
  }

  return false;
}

export {
  getMessageDate,
  getLastMessageDate,
  showChatUnreadCount,
  getChatTitle,
  getChatLetters,
  isMeChat,
  isChannelChat,
  isPrivateChat,
  canSendDocuments,
  canSendPolls,
  canSendMessages,
  showChatDraft,
  getChatDraft,
  getChatDraftReplyToMessageId,
  canPinMessages,
  isChatVerified,
  isChatSecret,
  isChatMuted,
  getLastMessageSenderName,
  getLastMessageContent,
  showChatUnreadMessageIcon,
  showChatUnreadMentionCount,
  getChatDisableMentionNotifications,
  getChatDisablePinnedMessageNotifications,
  getChatShortTitle,
  getChatSubtitle,
  isAccentChatSubtitle,
  isAccentChatSubtitleWithoutTyping,
};
