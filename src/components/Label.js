import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { color } from '../utils';

export default class Label extends PureComponent {
  render() {
    return (
      <View>
        <Text />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  level1: {
    borderColor: '#969696'
  },
  level1label: {
    borderColor: '#969696'
  },
  level2: {
    borderColor: '#61c05a'
  },
  level2label: {
    borderColor: '#61c05a'
  },
  level3: {
    borderColor: '#61decb'
  },
  level3label: {
    borderColor: '#61decb'
  },
  level4: {
    borderColor: '#5896de'
  },
  level4label: {
    borderColor: '#5896de'
  },
  level5: {
    borderColor: '#a068f1'
  },
  level5label: {
    borderColor: '#a068f1'
  },
  level6: {
    borderColor: '#f6be18'
  },
  level6label: {
    borderColor: '#f6be18'
  },
  level7: {
    borderColor: '#ff86b2'
  },
  level7label: {
    borderColor: '#ff86b2'
  },
  level8: {
    borderColor: '#ee0b10'
  },
  level8label: {
    borderColor: '#ee0b10'
  },
})
