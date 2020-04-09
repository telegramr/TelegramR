import DBController from '../controllers/dbController';

export function editMessage(chatId, messageId) {
  DBController.clientUpdate({
    '@type': 'clientUpdateEditMessage',
    chatId,
    messageId,
  });
}

export function deleteMessages(chatId, messageIds) {
  DBController.clientUpdate({
    '@type': 'clientUpdateDeleteMessages',
    chatId,
    messageIds,
  });
}

export function replyMessage(chatId, messageId) {
  DBController.clientUpdate({
    '@type': 'clientUpdateReply',
    chatId,
    messageId,
  });
}

export function forwardMessages(chatId, messageIds) {
  DBController.clientUpdate({
    '@type': 'clientUpdateForward',
    info: {
      chatId,
      messageIds,
    },
  });
}

export function openUser(userId, popup = false) {
  DBController.clientUpdate({
    '@type': 'clientUpdateOpenUser',
    userId,
    popup,
  });
}

export function openChat(chatId, messageId = null, popup = false) {
  DBController.clientUpdate({
    '@type': 'clientUpdateOpenChat',
    chatId,
    messageId,
    popup,
  });
}

export function closeChat() {
  DBController.clientUpdate({
    '@type': 'clientUpdateOpenChat',
    chatId: 0,
    messageId: null,
    popup: false,
  });
}

export function openReply(chatId, messageId) {
  DBController.clientUpdate({
    '@type': 'clientUpdateOpenReply',
    chatId,
    messageId,
  });
}

export function highlightMessage(chatId, messageId) {
  DBController.clientUpdate({
    '@type': 'clientUpdateMessageHighlighted',
    chatId,
    messageId,
  });
}

export function selectMessage(chatId, messageId, selected) {
  DBController.clientUpdate({
    '@type': 'clientUpdateMessageSelected',
    chatId,
    messageId,
    selected,
  });
}

export function clearSelection() {
  DBController.clientUpdate({'@type': 'clientUpdateClearSelection'});
}

export function setInstantViewViewerContent(content) {
  DBController.clientUpdate({
    '@type': 'clientUpdateInstantViewViewerContent',
    content,
  });
}

export function setMediaViewerContent(content) {
  DBController.clientUpdate({
    '@type': 'clientUpdateMediaViewerContent',
    content,
  });
}

export function setProfileMediaViewerContent(content) {
  DBController.clientUpdate({
    '@type': 'clientUpdateProfileMediaViewerContent',
    content,
  });
}

export function setInstantViewContent(content) {
  DBController.clientUpdate({
    '@type': 'clientUpdateInstantViewContent',
    content,
  });
}

export function searchChat(chatId, query = null) {
  DBController.clientUpdate({
    '@type': 'clientUpdateSearchChat',
    chatId,
    query,
  });
}
