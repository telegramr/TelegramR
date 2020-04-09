import React, {PureComponent} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import ChatStore from '../store/chatStore';
import {Base, Colors, Sizes} from '../theme';
import HamburgerArrowIcon from '../components/animations/HamburgerArrowIcon';
import {Btn, StatusBars} from '../components';
import Svg from '../lib/svg';

export default class Search extends PureComponent {
  static sharedElements = (navigation, otherNavigation, showing) => {
    const id = navigation.getParam('id');
    return [{id}];
  };

  constructor(props) {
    super(props);
    this.state = {
      searchStr: '',
    };
    this.inputRef = null;
  }

  componentDidMount() {}

  componentWillUnmount() {}

  setMessageStr = val => {
    this.setState({
      searchStr: val,
    });
  };

  renderHeader = () => {
    const {searchStr} = this.state;
    return (
      <View
        style={[
          Base.flexSB,
          Base.flexAIC,
          {
            backgroundColor: Colors.theme,
            paddingHorizontal: 10,
            paddingVertical: 8,
            height: 48,
          },
        ]}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={[Base.flexCenter, {width: 30, height: 30}]}>
          <SharedElement id={'search'}>
            <HamburgerArrowIcon
              shouldPlay
              play={[10, 30]}
              speed={3}
              autoPlay={true}
              style={{width: 100, height: 30, color: '#ffffff'}}
            />
          </SharedElement>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            ref={ref => (this.inputRef = ref)}
            style={styles.input}
            autoFocus
            placeholder="搜索"
            placeholderTextColor={Colors.white}
            onChangeText={this.setMessageStr}
            // onFocus={this.handleCloseMessageMediaModal}
            // onBlur={() => console.log('onBlur')}
            // isFocused={(isFocused) => console.log('isFocused', isFocused)}
            value={searchStr}
          />
        </View>
        <View style={[Base.flexCenter, {width: 30, height: 30}]}>
          <Btn circular={true} onPress={() => this.setMessageStr('')}>
            <Svg icon="close" size="20" />
          </Btn>
        </View>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBars />
        {this.renderHeader()}
        <View style={styles.searchResultContainer}>
          <View style={styles.searchLoadingContainer}>
            <ActivityIndicator size={50} color={Colors.progressCircle} />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  searchContainer: {
    flexGrow: 1,
    paddingLeft: 20,
    maxWidth: Sizes.width - 100,
    overflow: 'hidden',
  },
  input: {
    minHeight: 48,
    maxHeight: 120,
    padding: 0,
    fontSize: 17,
    color: Colors.white,
    backgroundColor: 'transparent',
  },
  searchResultContainer: {
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  searchLoadingContainer: {
    height: 150,
    width: Sizes.width,
    ...Base.flexCenter,
  },
});
