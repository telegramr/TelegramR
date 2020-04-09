import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import ChatTile from './ChatTile';
// import DialogTitle from './DialogTitle';
import HeaderChatSubtitle from './HeaderChatSubtitle';

class HeaderChat extends React.Component {
  static propTypes = {
    chatId: PropTypes.number.isRequired,
  };

  render() {
    const {chatId, onPress} = this.props;

    return (
      <TouchableOpacity activeOpacity={1} onPress={onPress}>
        <ChatTile chatId={chatId} size={44} />
        <View>
          {/*<DialogTitle chatId={chatId} />*/}
          <HeaderChatSubtitle chatId={chatId} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default HeaderChat;
