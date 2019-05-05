import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import PropTypes from "prop-types";

export default class Label extends PureComponent {
  static propTypes = {
    point: PropTypes.number,
    mr: PropTypes.number
  }

  render() {
    const {point, mr = 5} = this.props
    const lv = parseInt(point / 1000)
    return (
      <View style={[styles.labelContainer, styles[`level${lv}`], {marginRight: mr}]}>
        <Text style={styles.labelSize}>等级{lv}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderRadius: 2,
  },
  labelSize: {
    color: '#fff',
    fontSize: 12
  },
  level1: {
    backgroundColor: '#969696'
  },
  level2: {
    backgroundColor: '#61c05a'
  },
  level3: {
    backgroundColor: '#61decb'
  },
  level4: {
    backgroundColor: '#5896de'
  },
  level5: {
    backgroundColor: '#a068f1'
  },
  level6: {
    backgroundColor: '#f6be18'
  },
  level7: {
    backgroundColor: '#ff86b2'
  },
  level8: {
    backgroundColor: '#ee0b10'
  },
})
