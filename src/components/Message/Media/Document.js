import React from 'react';
import {View, Text} from 'react-native';

export default class Document extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {chatId, messageId} = this.props;
    return (
      <View>
        <Text>
          [Document]: chatId: {chatId}, messageId: {messageId}
        </Text>
      </View>
    );
  }
}
