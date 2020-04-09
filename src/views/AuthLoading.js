import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, View} from 'react-native';

export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    await this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  render() {
    return <ActivityIndicator />;
  }
}
