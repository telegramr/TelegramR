import ChatStore from '../store/chatStore';

function getBasicGroupStatus(basicGroup, chatId) {
  if (!basicGroup) {
    return null;
  }

  const {status, member_count: count} = basicGroup;

  if (
    status &&
    (status['@type'] === 'chatMemberStatusBanned' ||
      status['@type'] === 'chatMemberStatusLeft' ||
      (status['@type'] === 'chatMemberStatusCreator' && !status.is_member))
  ) {
    return 'group is inaccessible';
  }

  if (!count) {
    return '0 members';
  }
  if (count === 1) {
    return '1 member';
  }

  const onlineCount = ChatStore.getOnlineMemberCount(chatId);
  if (onlineCount > 1) {
    return `${count} members, ${onlineCount} online`;
  }

  return `${count} members`;
}

export {getBasicGroupStatus};
