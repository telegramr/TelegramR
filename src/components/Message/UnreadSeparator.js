import React, {PureComponent} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Base, Colors } from '../../theme';

export default class UnreadSeparator extends PureComponent {
  render() {
    return (
      <View style={styles.unreadSeparator}>
        <Text style={styles.unreadSeparatorText}>Unread messages</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  unreadSeparator: {
    ...Base.flexCenter,
    backgroundColor: Colors.chat_unreadSeparator,
    paddingVertical: 4,
  },
  unreadSeparatorText: {
    color: Colors.chat_unreadSeparatorText,
  },
});
