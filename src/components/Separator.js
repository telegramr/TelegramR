import React, { PureComponent } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types'
import S from '../public/style'
import {screen, color} from '../utils'

export default class Separator extends PureComponent {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    backgroundColor: PropTypes.string
  }

  render() {
    const {width, height, backgroundColor = color.border } = this.props
    return (
      <View style={[
        S.flexCenter,
        {width: width || screen.width, height: height || screen.onePixel, backgroundColor }
        ]}>
        <View style={{width: width || screen.width, height: screen.onePixel, backgroundColor }} />
      </View>
    )
  }
}
