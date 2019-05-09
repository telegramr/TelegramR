import React, { PureComponent } from 'react';
import {
  View,
  StatusBar,
  Platform,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types'
import S from '../public/style'
import { screen, color } from '../utils'

export default class StatusBars extends PureComponent {
  static propTypes = {
    animated: PropTypes.bool,
    hidden: PropTypes.bool,
    backgroundColor: PropTypes.string,
    translucent: PropTypes.bool,
    barStyle: PropTypes.string
  }

  render() {
    const { animated, hidden, backgroundColor = 'rgba(66, 99, 129, 0.9)', translucent = true, barStyle = "light-content" } = this.props
    const defaultConfig = { animated, hidden, backgroundColor, translucent, barStyle }
    //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
    //是否隐藏状态栏。
    //状态栏的背景色
    //指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
    // enum('default', 'light-content', 'dark-content')
    return (
      <View style={ [styles.statusBar, { backgroundColor }] }>
        <StatusBar { ...defaultConfig }  />
        {/*<StatusBar translucent backgroundColor={backgroundColor} {...props} />*/ }
      </View>
    )
  }
}

// TODO: add ios status bar https://stackoverflow.com/a/39300715/9002383
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: '#79B45D',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
});
