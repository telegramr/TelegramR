import React, { PureComponent } from 'react';
import {
  Image
} from 'react-native';
import PropTypes from 'prop-types'

export default class ImageBgAuto extends PureComponent {
  static propTypes = {
    img: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    size: PropTypes.number
  }

  render() {
    const { uri, size = 80 } = this.props
    return (
      <Image source={ { uri } } style={ {
        flex: 1,
        width: size,
        height: size,
        borderRadius: 4
      } }/>
    );
  }
}
