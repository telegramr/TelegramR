import React, {PureComponent} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Colors} from '../theme';

export default class Badge extends PureComponent {
  static propTypes = {
    num: PropTypes.number,
    style: PropTypes.object,
  };

  render() {
    const {num, style = {}} = this.props;
    return (
      <View style={[styles.badgeContainer, style]}>
        <Text style={styles.badgeNum}>{num}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  badgeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    alignSelf: 'baseline',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 14,
    backgroundColor: Colors.main2,
  },
  badgeNum: {
    color: '#fff',
    fontSize: 14,
  },
});
