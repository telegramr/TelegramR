import React, { Component } from 'react';
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import PropTypes from "prop-types";

export default class TouchableCross extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    onLongPress: PropTypes.func,
    disabled: PropTypes.bool,
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]),
    background: PropTypes.object,
    feed: PropTypes.bool
  }

  disableFunc = () => {
  }

  render() {
    const { onPress, onLongPress, style, background, disabled = false, feed = false } = this.props;
    if (Platform.OS === 'android' && feed) {
      return (
        <TouchableNativeFeedback
          disabled={ disabled }
          onPress={ disabled ? this.disableFunc : onPress }
          onLongPress={ disabled ? this.disableFunc : onLongPress }
          style={ style }
          background={ background }>
          { this.props.children }
        </TouchableNativeFeedback>
      )
    }
    return (
      <TouchableOpacity
        onPress={ disabled ? this.disableFunc : onPress }
        onLongPress={ disabled ? this.disableFunc : onLongPress }
        activeOpacity={ disabled ? 1 : 0.2 }
        focusedOpacity={ disabled ? 1 : 0.2 }
        disable={ disabled }
        style={ style }>
        { this.props.children }
      </TouchableOpacity>
    )
  }
}
