import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import * as loginAction from '../actions/loginAction';
import { NavigationActions, StackActions } from 'react-navigation';
import { Avatar } from '../components'


class DrawerMenu extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <Avatar/>
        <Text>this is drawerMenu</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  loginBtn: {
    borderWidth: 1,
    padding: 5,
  }
});

export default connect(
  (state) => ({
    status: state.loginIn.status,
    isSuccess: state.loginIn.isSuccess,
    user: state.loginIn.user
  }),
  (dispatch) => ({
    login: () => dispatch(loginAction.login()),
  })
)(DrawerMenu)
