import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  SafeAreaView,
  DrawerItems,
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
} from 'react-navigation';
import { Btn, Avatar } from '../components'
import { color } from '../utils'
import Svg from '../lib/svg'
import LoginPage from '../pages/Login'
import DrawerMenuPage from '../pages/DrawerMenu'
import ChatListPage from '../pages/ChatList'
import ChatPage from '../pages/Chat'
import SettingPage from '../pages/Drawers/Setting'
import UserPage from '../pages/User'
import GroupsPage from '../pages/Groups'
import GroupDetailPage from '../pages/GroupDetail'


export const DrawerMenuStack = createDrawerNavigator({
    ChatList: {
      screen: ChatListPage,
      navigationOptions: {
        drawerLabel: '聊天',
        drawerIcon: ({ tintColor }) => (
          <Svg icon="message" size="22" color={ tintColor } style={ styles.icon }/>
        ),
      }
    },
    Setting: {
      screen: SettingPage,
      navigationOptions: {
        drawerLabel: '设置',
        drawerIcon: ({ tintColor }) => (
          <Svg icon="setting" size="22" color={ tintColor } style={ styles.icon }/>
        ),
      }
    }
  },
  {
    initialRouteName: 'ChatList',
    // TODO: fix drawer
    // drawerLockMode: 'locked-open',
    contentComponent: (props) => (
      <ScrollView style={ { backgroundColor: '#fff', flex: 1 } }>
        <SafeAreaView forceInset={ { top: 'always', horizontal: 'never' } }>
          <TouchableOpacity  onPress={() => props.navigation.navigate('User')}
                             activeOpacity={1}
                             focusedOpacity={1}
                             style={ styles.userContainer }>
            <Avatar size={ 60 }/>
            <Text style={ styles.uname }>TelegramR</Text>
          </TouchableOpacity>
          <DrawerItems { ...props } />
        </SafeAreaView>
      </ScrollView>
    )
  }
);

const AppContainer = createStackNavigator({
  Login: { screen: LoginPage },
  ChatList: { screen: ChatListPage },
  Chat: { screen: ChatPage },
  User: { screen: UserPage },
  Groups: { screen: GroupsPage },
  GroupDetail: { screen: GroupDetailPage },
  DrawerMenuStack
}, {
  navigationOptions: {
    gesturesEnabled: true,
    swipeEnabled: true
  },
  defaultNavigationOptions: {
    gesturesEnabled: true,
  },
  // TODO: transition https://github.com/mochixuan/Mung/blob/master/Mung/app/App.js
  // transitionConfig:(()=>({
  //   screenInterpolator: CardStackStyleInterpolator.forHorizontal
  // })),
  headerMode: 'none',
  initialRouteName: 'DrawerMenuStack',
  mode: 'card',
})

const styles = StyleSheet.create({
  userContainer: {
    height: 150,
    backgroundColor: color.theme,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 20,
  },
  uname: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10
  }
});


export default createAppContainer(AppContainer)
