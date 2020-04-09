import React, {Component} from 'react';
import {View, Button, AsyncStorage} from 'react-native';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }
}
