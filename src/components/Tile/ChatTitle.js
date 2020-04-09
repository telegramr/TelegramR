import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import VerifiedIcon from '../../assets/svgIcons/Verified';
import {getChatTitle, isChatVerified} from '../../utils/chat';
import {Base, Sizes} from '../../theme';
import {PropsStyle} from '../../constants/Types';
// import ChatStore from '../../store/chatStore';

class ChatTitle extends Component {
  static propTypes = {
    chatId: PropTypes.number.isRequired,
    showSavedMessages: PropTypes.bool,
    style: PropsStyle,
  };

  static defaultProps = {
    showSavedMessages: true,
    style: {},
  };

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
    // ChatStore.on('updateChatTitle', this.onUpdateChatTitle);
  }

  componentWillUnmount() {
    // ChatStore.off('clientUpdateFastUpdatingComplete', this.onFastUpdatingComplete);
    // ChatStore.off('updateChatTitle', this.onUpdateChatTitle);
  }

  onFastUpdatingComplete = update => {
    this.forceUpdate();
  };

  onUpdateChatTitle = update => {
    const {chatId} = this.props;

    if (update.chat_id !== chatId) {
      return;
    }

    this.forceUpdate();
  };

  render() {
    const {t, chatId, showSavedMessages, style} = this.props;

    const isVerified = isChatVerified(chatId);
    const title = getChatTitle(chatId, showSavedMessages, t);

    return (
      <View style={styles.container}>
        <Text numberOfLines={1} style={[Base.chatsTitle, style]}>
          {title}
        </Text>
        <View style={styles.verifiedIcon}>
          {isVerified && <VerifiedIcon />}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    maxWidth: Sizes.width - 120,
  },
  verifiedIcon: {
    ...Base.flexCenter,
    width: 15,
    height: 15,
    marginLeft: 4,
  },
});

export default withTranslation()(ChatTitle);
