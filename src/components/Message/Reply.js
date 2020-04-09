import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import ReplyTile from '../Tile/ReplyTile';
import {
  getContent,
  getTitle,
  isDeletedMessage,
  getReplyPhotoSize,
  getReplyMinithumbnail,
} from '../../utils/message';
import {openChat} from '../../actions/clientAction';
import MessageStore from '../../store/messageStore';
import {Colors} from '../../theme';

class Reply extends PureComponent {
  static propTypes = {
    chatId: PropTypes.number.isRequired,
    messageId: PropTypes.number.isRequired,
    title: PropTypes.string,
    onClick: PropTypes.func,
  };

  componentDidMount() {
    MessageStore.on('getMessageResult', this.onGetMessageResult);
  }

  componentWillUnmount() {
    MessageStore.off('getMessageResult', this.onGetMessageResult);
  }

  onGetMessageResult = result => {
    const {chatId, messageId} = this.props;

    if (chatId === result.chat_id && messageId === result.id) {
      this.forceUpdate();
    }
  };

  handleClick = event => {
    event.stopPropagation();
  };

  handleOpen = event => {
    if (event.button !== 0) {
      return;
    }

    event.stopPropagation();

    const {chatId, messageId, onClick} = this.props;

    const message = MessageStore.get(chatId, messageId);
    if (!message) {
      return null;
    }
    if (isDeletedMessage(message)) {
      return null;
    }

    openChat(chatId, messageId, false);
    if (onClick) {
      onClick();
    }
  };

  render() {
    const {t, chatId, messageId} = this.props;
    let {title} = this.props;

    const message = MessageStore.get(chatId, messageId);

    title = title || getTitle(message);
    let content = !message ? t('Loading') : getContent(message, t);
    const photoSize = getReplyPhotoSize(chatId, messageId);
    const minithumbnail = getReplyMinithumbnail(chatId, messageId);

    if (isDeletedMessage(message)) {
      title = null;
      content = t('DeletedMessage');
    }

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.reply}
        onMouseDown={this.handleOpen}
        onClick={this.handleClick}>
        <View style={styles.replyWrapper}>
          <View style={styles.replyBorder} />
          {photoSize && (
            <ReplyTile
              chatId={chatId}
              messageId={messageId}
              photoSize={photoSize}
              minithumbnail={minithumbnail}
            />
          )}
          <View style={styles.replyContent}>
            {title && <Text numberOfLines={1} style={styles.replyContentTitle}>{title}</Text>}
            <Text numberOfLines={1} style={styles.replyContentSubtitle}>{content}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  reply: {
    marginVertical: 3,
  },
  replyWrapper: {
    height: 32,
    flexDirection: 'row',
  },
  replyBorder: {
    height: 32,
    minWidth: 2,
    backgroundColor: Colors.colorAccentMain,
  },
  replyContent: {
    marginLeft: 5,
    flexGrow: 1,
    flexShrink: 1,
  },
  replyContentTitle: {
    fontSize: 14,
    color: Colors.colorAccentMain,
    fontWeight: '700',
    lineHeight: 18,
  },
  replyContentSubtitle: {
    fontSize: 14,
    lineHeight: 16,
    color: Colors.grayText,
  },
});

export default withTranslation()(Reply);
