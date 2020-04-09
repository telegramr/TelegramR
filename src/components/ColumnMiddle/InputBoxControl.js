import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  Animated,
} from 'react-native';
import {Sizes, Colors} from '../../theme';

export default class InputBoxControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageStr: '',
    };
    this.keyboardHeight = new Animated.Value(0);
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow',this.keyboardWillShow,);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide',this.keyboardWillHide,);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = event => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
      }),
    ]).start();
  };

  keyboardWillHide = event => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0,
      }),
    ]).start();
  };

  setMessageStr = messageStr => {
    this.setState({
      messageStr,
    });
  };

  render() {
    const {messageStr} = this.state;
    console.log('paddingBottom', this.keyboardHeight);
    return (
      <Animated.View
        style={[styles.container, {paddingBottom: this.keyboardHeight}]}>
        <TextInput
          ref="messageInput"
          style={styles.input}
          placeholder="输入消息"
          placeholderTextColor={Colors.gray}
          onChangeText={this.setMessageStr}
          value={messageStr}
          multiline={true}
          numberOfLines={4}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4c69a5',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 46,
    width: Sizes.width - 50,
    padding: 0,
    marginHorizontal: 10,
    fontSize: 14,
    backgroundColor: Colors.white,
  },
});
