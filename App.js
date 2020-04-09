import React, {Component} from 'react';
import {Text, Platform} from 'react-native';
import {withTranslation} from 'react-i18next';
import {compose} from 'recompose';
import 'react-native-gesture-handler';
import NavigationService from './src/NavigationService';
import AppContainer from './src/RootStack';
import withLanguage from './src/Language';
import './src/store/chatStore';
import './src/store/messageStore';
import './src/store/optionStore';
import './src/store/superGroupStore';
import './src/store/basicGroupStore';
import './src/store/userStore';
import './src/store/localizationStore';
import './src/store/notificationStore';
import './src/store/fileStore';
import './src/store/applicationStore';
import './src/store/stickerStore';
import './src/store/instantViewStore';

if (__DEV__) {
  const YellowBox = require('react-native/Libraries/YellowBox/YellowBox');
  YellowBox.ignoreWarnings([
    'Warning: componentWillReceiveProps',
    'shouldComponentUpdate',
    'Failed to',
    '`-[RCTRootView cancelTouches]`',

    // Hide warnings caused by React Native (https://github.com/facebook/react-native/issues/20841)
    'Require cycle: node_modules/react-native/Libraries/Network/fetch.js',
  ]);
}

const setFontFamily = () => {
  // Set a global font for Android
  const defaultFontFamily = {
    style: {
      fontFamily: 'Roboto',
      fontSize: 15,
    },
  };
  const TextRender = Text.render;
  const initialDefaultProps = Text.defaultProps;
  Text.defaultProps = {
    ...initialDefaultProps,
    ...defaultFontFamily,
  };
  Text.render = function render(props, ...args) {
    const oldProps = props;
    let newProps = {...props, style: [defaultFontFamily.style, props.style]};
    try {
      return Reflect.apply(TextRender, this, [newProps, ...args]);
    } finally {
      newProps = oldProps;
    }
  };
};

if (Platform.OS === 'android') {
  setFontFamily();
}

const enhance = compose(
  withLanguage,
  withTranslation(),
  // withTheme,
  // withStyles(styles, { withTheme: true })
);

class App extends Component {
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}

export default enhance(App);
