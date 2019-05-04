import React, { PureComponent } from 'react'
import {
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
} from 'react-native'
import PropTypes from "prop-types";
import S from '../public/style'

export default class Btn extends PureComponent {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    onLongPress: PropTypes.func,
    circular: PropTypes.bool,
    size: PropTypes.bool,
    background: PropTypes.object,
  }

  render() {
    const { circular = false, size = 24, onPress, onLongPress, background } = this.props
    const styleR = circular ? { width: size, height: size, borderRadius: size / 2 } : { width: size, height: size }
    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback onPress={ onPress } onLongPress={ onLongPress }
                                 background={ background ? background : TouchableNativeFeedback.Ripple('#ccc', circular) }
                                 style={ [S.flexCenter, styleR] }>
          <View style={ [S.flexCenter, styleR] }>
            { this.props.children }
          </View>
        </TouchableNativeFeedback>
      )
    }
    return (
      <TouchableHighlight onPress={ onPress } onLongPress={ onLongPress } style={ [S.flexCenter, styleR] }>
        <View style={ [S.flexCenter, styleR] }>
          { this.props.children }
        </View>
      </TouchableHighlight>
    )
  }
}
