import React, { PureComponent } from 'react';
import {
  Image,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types'

export default class Avatar extends PureComponent {
  static propTypes = {
    img: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    uri: PropTypes.string,
    size: PropTypes.number,
    mr: PropTypes.number
  }

  render() {
    const { img = require('../static/images/img/avatar.jpg'), uri, size, mr = 0 } = this.props;
    const styleR = size ? { height: size, width: size, borderRadius: size / 2 } : {};
    if (uri) {
      return (
        <Image
          source={ { uri } }
          style={ [styles.avatar, styleR, { marginRight: mr }] }
        />
      )
    }
    return (
      <Image
        source={ img }
        style={ [styles.avatar, styleR, { marginRight: mr }] }
      />
    )
  }
}

const styles = StyleSheet.create({
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
  }
});
