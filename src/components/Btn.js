import React, {PureComponent} from 'react';
import {
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import {Base} from '../theme';
import { PropsStyle } from '../constants/Types';

export default class Btn extends PureComponent {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    onLongPress: PropTypes.func,
    circular: PropTypes.bool,
    size: PropTypes.number,
    background: PropTypes.object,
    style: PropsStyle,
  };

  static defaultProps = {
    style: {},
  };

  render() {
    const {
      circular = false,
      size = 30,
      onPress,
      onLongPress,
      background,
      style,
    } = this.props;
    const styleR = circular
      ? {width: size, height: size, borderRadius: size / 2}
      : {width: size, height: size};
    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback
          onPress={onPress}
          onLongPress={onLongPress}
          background={
            background
              ? background
              : TouchableNativeFeedback.Ripple('#ccc', circular)
          }
          style={[Base.flexCenter, styleR]}>
          <View style={[Base.flexCenter, style, styleR]}>{this.props.children}</View>
        </TouchableNativeFeedback>
      );
    }
    return (
      <TouchableHighlight
        onPress={onPress}
        onLongPress={onLongPress}
        style={[Base.flexCenter, style, styleR]}>
        <View style={[Base.flexCenter, styleR]}>{this.props.children}</View>
      </TouchableHighlight>
    );
  }
}
