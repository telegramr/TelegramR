import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams} from 'react-navigation';


interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface State {
}


export default class SettingPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  // private navigateTo = (routeName: string, params?: NavigationParams) => {
  //   this.props.navigation.navigate(routeName, params)
  // };

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

