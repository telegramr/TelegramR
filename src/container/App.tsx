import React from 'react'
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  SafeAreaView,
  DrawerItems
} from 'react-navigation';
import { color } from '../utils'
import Svg from '../lib/svg'
import LoginPage from '../pages/Login'
import ChatListPage from '../pages/ChatList'
import ChatPage from '../pages/Chat'
import SettingPage from '../pages/Drawers/Setting'
import UserPage from '../pages/User'
import GroupsPage from '../pages/Groups'
import GroupDetailPage from '../pages/Groups/GroupDetail'
import GroupUsersPage from '../pages/Groups/GroupUsers'
import { Avatar } from '../components';


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
  GroupUsers: {screen: GroupUsersPage},
  // DrawerMenuStack
}, {
  navigationOptions: {
    gesturesEnabled: true,
    swipeEnabled: true
  },
  defaultNavigationOptions: {
    gesturesEnabled: true,
  },
  headerMode: 'none',
  initialRouteName: 'ChatList',
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
