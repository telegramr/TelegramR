import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  Button,
  AsyncStorage,
} from 'react-native';

export default class SettingScreen extends Component {
  constructor(props) {
    super(props);
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button title="sign out :)" onPress={this._signOutAsync} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
});
