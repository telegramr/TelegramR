import DBController from '../controllers/dbController';

export function viewMessages(chatId, messageIds, forceRead) {
  DBController.send({
    '@type': 'viewMessages',
    chat_id: chatId,
    message_ids: messageIds,
    force_read: forceRead,
  });
}

export function pinMessage(chatId, messageId, disableNotification = false) {
  DBController.send({
    '@type': 'pinChatMessage',
    chat_id: chatId,
    message_id: messageId,
    disable_notification: disableNotification,
  });
}

export function unpinMessage(chatId) {
  DBController.send({
    '@type': 'unpinChatMessage',
    chat_id: chatId,
  });
}
