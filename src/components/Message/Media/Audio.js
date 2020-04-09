import React from 'react';
import {View, Text} from 'react-native';

export default class Animation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {chatId, messageId} = this.props;
    return (
      <View>
        <Text>
          [Audio] chatId: {chatId}, messageId: {messageId}
        </Text>
      </View>
    );
  }
}
