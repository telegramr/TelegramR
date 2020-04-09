import SupergroupStore from '../store/superGroupStore';
import ChatStore from '../store/chatStore';

function getSupergroupStatus(supergroup, chatId) {
  if (!supergroup) {
    return null;
  }

  let {status, is_channel, member_count: count} = supergroup;

  if (status && status['@type'] === 'chatMemberStatusBanned') {
    return is_channel ? 'channel is inaccessible' : 'group is inaccessible';
  }

  if (!count) {
    const fullInfo = SupergroupStore.getFullInfo(supergroup.id);
    if (fullInfo) {
      count = fullInfo.member_count;
    }
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

export {getSupergroupStatus};
