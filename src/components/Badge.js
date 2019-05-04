import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types'
export default class Badge extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    size: PropTypes.number,
    num: PropTypes.number.isRequired
  }

  render() {
    const { size = 20, num, color = '#fff', backgroundColor= '#ccc' } = this.props;
    const styleR =  { paddingHorizontal: 6, height: size, borderRadius: size / 2 }
    return (
      <View style={ [styles.badgeContainer, styleR, {backgroundColor }] }>
        <Text style={ { color } }>{ num }</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  badgeContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
