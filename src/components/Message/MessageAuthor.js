import React, {PureComponent} from 'react';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {getUserFullName} from '../../utils/user';
import {getChatTitle, isPrivateChat} from '../../utils/chat';
import UserStore from '../../store/userStore';
import ChatStore from '../../store/chatStore';
import {Colors} from '../../theme';

class MessageAuthor extends PureComponent {
  static propTypes = {
    chatId: PropTypes.number,
    userId: PropTypes.number,
    openUser: PropTypes.bool,
    openChat: PropTypes.bool,
  };

  static defaultProps = {
    openUser: false,
    openChat: false,
  };

  handleSelect = event => {
    // console.log('handleSelect', event);
    // const { chatId, userId, openUser, openChat } = this.props;
    //
    // if (openUser && userId) {
    //   event.stopPropagation();
    //
    //   openUserCommand(userId, true);
    //   return;
    // }
    //
    // if (openChat && chatId) {
    //   event.stopPropagation();
    //
    //   openChatCommand(chatId, null, true);
    //   return;
    // }
  };

  render() {
    const {t, chatId, userId, openUser, openChat} = this.props;
    const user = UserStore.get(userId);
    if (user) {
      const tileColor = isPrivateChat(chatId)
        ? styles.authorText
        : {
            ...styles.authorText,
            color: Colors.UserColors[Math.abs(userId) % 8],
          };

      const fullName = getUserFullName(user);

      return openUser ? (
        <Text style={tileColor} onClick={this.handleSelect}>
          {fullName}
        </Text>
      ) : (
        <Text style={tileColor}>{fullName}</Text>
      );
    }

    const chat = ChatStore.get(chatId);
    if (chat) {
      // const className = classNames('message-author-color', 'message-author');
      const fullName = getChatTitle(chatId, false, t);
      return openChat ? (
        <Text style={styles.authorText} onClick={this.handleSelect}>
          {fullName}
        </Text>
      ) : (
        <Text style={styles.authorText}>{fullName}</Text>
      );
    }

    return null;
  }
}

const styles = StyleSheet.create({
  authorText: {
    color: Colors.chat_inAuthor,
  },
});

export default withTranslation()(MessageAuthor);
