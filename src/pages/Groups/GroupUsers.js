import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  ImageBackground,
  Image,
  ScrollView,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { Avatar, Btn, Label, TouchableCross } from '../../components'
import * as loginAction from '../../actions/loginAction';
import { NavigationActions, SafeAreaView, StackActions, } from 'react-navigation';
import S from "../../public/style";
import { color, screen } from "../../utils";
import Svg from "../../lib/svg";
import { H2, H4, Normal } from "../../components/TextTool";


const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Main' })
  ],
});

export default class GroupUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSearch: false,
      q: '',
      managers: [
        { uname: 'Beats0', avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4', point: 8000 },
        { uname: '赤座あかり', avatar: 'https://lain.bgm.tv/pic/crt/l/19/44/13004_crt_kiafp.jpg', point: 7000 },
        { uname: '歳納京子', avatar: 'https://lain.bgm.tv/pic/crt/s/05/98/13005_crt_o8PHg.jpg', point: 6000 },
        { uname: '船見結衣', avatar: 'https://lain.bgm.tv/pic/crt/s/7f/f6/13006_crt_44395.jpg', point: 5000 },
      ]
    }
  }

  navigateTo = (routeName, ...params) => {
    const { navigate } = this.props.navigation
    navigate(routeName, ...params)
  };

  handleShowSearch = () => {

  }

  renderHeader = () => {
    const { showSearch, q } = this.state
    return (
      <View style={ [S.flexSB, S.flexAIC, S.pd8, { backgroundColor: color.theme }] }>
        <View style={ [S.flex, S.flexCenter, { width: 30, height: 30, position: 'absolute', left: 8 }] }>
          <Btn circular={ true } onPress={ () => (this.props.navigation.goBack()) }>
            <Svg icon="arrowleft" size="22"/>
          </Btn>
        </View>
        <View style={ [S.flexCenter, { width: screen.width - 100, marginLeft: 46 }] }>
          <TextInput
            ref="searchInput"
            placeholder="搜索"
            style={ styles.input }
            placeholderTextColor={ '#fff' }
            onChangeText={ q => this.setState({ q }) }
            // TODO: add debounce function search
            // onFocus={ this.handleCloseMessageMediaModal }
            // onTouchStart={ this.handleCloseMessageMediaModal }
            value={ q }
            numberOfLines={ 1 }/>
        </View>
        <View style={ [S.flex, S.flexCenter, { width: 30, height: 30, position: 'absolute', right: 8 }] }>
          <Btn circular={ true } onPress={ this.handleShowSearch }>
            <Svg icon={ showSearch ? 'close' : 'search' } size="22"/>
          </Btn>
        </View>
      </View>
    )
  }

  renderManagers = () => {
    const { managers } = this.state
    return (
      <View style={ [S.flexCol,] }>
        <View style={ styles.title }>
          <Text>管理员</Text>
        </View>
        {
          managers.map((item, index) => {
            return (
              <TouchableCross feed onPress={ () => this.navigateTo('User') } key={ index }
                              style={ { marginBottom: 10 } }>
                <View style={ [S.flexRow, styles.title] }>
                  <Avatar uri={ item.avatar } size={ 50 } mr={ 10 }/>
                  <View style={ [S.flexRow, { alignItems: 'center' }] }>
                    <Label point={ item.point }/>
                    <H4 title={ item.uname } style={ { marginLeft: 5 } }/>
                  </View>
                </View>
              </TouchableCross>
            )
          })
        }
      </View>
    )
  }

  renderUsers = () => {
    return (
      <FlatList/>
    )
  }


  render() {
    return (
      <SafeAreaView style={ styles.container }>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0,0,0,0.22)"
        />
        { this.renderHeader() }
        { this.renderManagers() }
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fb'
  },
  input: {
    height: 46,
    width: '100%',
    padding: 0,
    color: '#fff',
    backgroundColor: color.theme,
    marginHorizontal: 10,
    fontSize: 16,
  },
  title: {
    padding: 10,
    borderBottomWidth: screen.onePixel,
    borderBottomColor: color.border
  }
});
