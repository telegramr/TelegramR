import * as React from 'react';
import {
  View,
  Text,
  Button,
  Animated,
  Easing,
  StyleSheet,
  Image,
} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {CardStyleInterpolators} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import CustomDrawerContent from './views/CustomDrawerContent';
import ChatListScreen from './views/ChatList';
import ChatScreen from './views/Chat';
import SearchScreen from './views/Search';
import SettingScreen from './views/Setting';
import LoginScreen from './views/Login';
import ThumbViewerScreen from './views/ThumbViewer';
import LottieAnimatedExampleScreen from './views/LottieAnimatedExample';

import AuthLoadingScreen from './views/AuthLoading';
import {Colors, Sizes} from './theme';

const makeNavigationOptions = {
  cardStyleInterpolator: ({current: {progress}}) => {
    const opacity = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return {cardStyle: {opacity}};
  },
  gestureEnabled: false,
  cardStyle: {
    backgroundColor: 'transparent',
  },
}

const LoginStack = createSharedElementStackNavigator(
  {
    // 登录
    Login: {screen: LoginScreen},
  },
  {
    headerMode: 'none',
    mode: 'modal',
    gesturesEnabled: false,
  },
);

const DrawerStack = createDrawerNavigator(
  {
    ChatList: {
      screen: ChatListScreen,
      navigationOptions: {
        drawerLabel: 'Chat',
        drawerIcon: ({tintColor}) => (
          <Image
            source={require('./static/images/menu/menu_chats.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
      },
    },
    Setting: {
      screen: SettingScreen,
      drawerLabel: 'Setting',
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Image
            source={require('./static/images/menu/menu_settings.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
      },
    },
  },
  {
    contentComponent: CustomDrawerContent,
    edgeWidth: Sizes.width / 2,
    contentOptions: {
      activeTintColor: '#000000',
      inactiveTintColor: Colors.gray,
      activeBackgroundColor: '#e6e6e6',
    },
  },
);

const AppStack = createSharedElementStackNavigator(
  {
    ChatList: {
      screen: DrawerStack,
    },
    Chat: {screen: ChatScreen},
    Search: {
      screen: SearchScreen,
      navigationOptions: makeNavigationOptions,
    },
    ThumbViewer: {
      screen: ThumbViewerScreen,
      navigationOptions: makeNavigationOptions,
    },
    LottieAnimatedExample: {
      screen: LottieAnimatedExampleScreen,
    },
  },
  {
    initialRouteName: 'ChatList',
    headerMode: 'none',
    mode: 'modal',
    gesturesEnabled: true,
    defaultNavigationOptions: {
      // cardStyleInterpolator: ({current: {progress}}) => {
      //   const opacity = progress.interpolate({
      //     inputRange: [0, 1],
      //     outputRange: [0, 1],
      //     extrapolate: 'clamp',
      //   });
      //   return {cardStyle: {opacity}};
      // },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      gestureEnabled: true,
      gestureResponseDistance: {horizontal: Sizes.width - 100},
      gestureVelocityImpact: 0.5,
      gestureDirection: 'horizontal',
    },
    // transitionConfig: () => ({
    //   transitionSpec: {
    //     duration: 300,
    //     easing: Easing.out(Easing.poly(5)),
    //     timing: Animated.timing,
    //     useNativeDriver: true,
    //   },
    //   screenInterpolator: sceneProps => {
    //     const {layout, position, scene} = sceneProps;
    //
    //     const thisSceneIndex = scene.index;
    //     const width = layout.initWidth;
    //
    //     const translateX = position.interpolate({
    //       inputRange: [thisSceneIndex - 1, thisSceneIndex],
    //       outputRange: [width, 0],
    //     });
    //
    //     return {transform: [{translateX}]};
    //   },
    // }),
  },
);

// AppStack.navigationOptions = ({ navigation }) => {
//   const routeName = navigation.state.routes[navigation.state.index].routeName;
//   if (routeName === "Chat") {
//     return {
//       tabBarVisible: false,
//     }
//   }
// }

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: LoginStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});
