import React, {PureComponent} from 'react';
import {View, StatusBar, Platform, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export default class StatusBars extends PureComponent {
  static propTypes = {
    animated: PropTypes.bool,
    hidden: PropTypes.bool,
    backgroundColor: PropTypes.string,
    translucent: PropTypes.bool,
    barStyle: PropTypes.string,
  };

  render() {
    const {
      animated,
      hidden,
      backgroundColor = 'rgba(66, 99, 129, 0.9)',
      translucent = true,
      barStyle = 'light-content',
    } = this.props;
    const defaultConfig = {
      animated,
      hidden,
      backgroundColor,
      translucent,
      barStyle,
    };
    // enum('default', 'light-content', 'dark-content')
    // TODO: 沉浸模式下页面抖动问题
    // height: hidden ? 10 : STATUSBAR_HEIGHT
    return (
      <View style={[styles.statusBar, {backgroundColor, height: hidden ? 10 : STATUSBAR_HEIGHT}]}>
        <StatusBar {...defaultConfig} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
  },
});
