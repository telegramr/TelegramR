import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';
import Btn from '../../components/Btn'

export default class SettingPage extends Component {
  // renderButton = () => {
  //   return (<TouchableNativeFeedback background={ TouchableNativeFeedback.SelectableBackground() }> <View
  //     style={ { width: 150, height: 100, backgroundColor: 'red' } }> <Text style={ { margin: 30 } }>Button</Text>
  //   </View> </TouchableNativeFeedback>);
  // }

  render() {
    return (
      <View>
        <Text>this is setting</Text>
        <Button
          onPress={ () => (this.props.navigation.toggleDrawer()) }
          title="Open Drawer"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Btn: {
    backgroundColor: 'blue'
  },
});
