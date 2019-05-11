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
import { Avatar, Btn, Label, TouchableCross, Separator } from '../../components'
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
      isRefresh: false,
      managers: [
        { uname: 'Beats0', avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4', point: 8000 },
        { uname: '赤座あかり', avatar: 'https://lain.bgm.tv/pic/crt/l/19/44/13004_crt_kiafp.jpg', point: 7000 },
        { uname: '歳納京子', avatar: 'https://lain.bgm.tv/pic/crt/s/05/98/13005_crt_o8PHg.jpg', point: 6000 },
        { uname: '船見結衣', avatar: 'https://lain.bgm.tv/pic/crt/s/7f/f6/13006_crt_44395.jpg', point: 5000 },
      ],
      users: {
        page: 0,
        pages: 1,
        lists: [
          {
            uname: '吉川ちなつ',
            avatar: 'https://lain.bgm.tv/pic/crt/s/4c/ee/13007_crt_U3Pqv.jpg?r=1444773044',
            point: 5000
          },
          {
            uname: '杉浦綾乃',
            avatar: 'https://lain.bgm.tv/pic/crt/s/69/60/13008_crt_4B7Zn.jpg?r=1447203401',
            point: 5000
          },
          {
            uname: '池田 千鶴',
            avatar: 'https://lain.bgm.tv/pic/crt/s/d9/ec/27904_crt_4Fs21.jpg?r=1425883024',
            point: 5000
          },
          {
            uname: '大室櫻子',
            avatar: 'https://lain.bgm.tv/pic/crt/s/67/49/13012_crt_xrLRL.jpg?r=1445999756',
            point: 5000
          },
          {
            uname: '古谷向日葵',
            avatar: 'https://lain.bgm.tv/pic/crt/s/52/68/13011_crt_Q0abK.jpg?r=1446599422',
            point: 5000
          },
          { uname: '池田千歳', avatar: 'https://lain.bgm.tv/pic/crt/m/c7/dc/16802_crt_a49kW.jpg', point: 5000 },
        ]
      }
    }
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
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
      <View style={ S.flexCol }>
        <View style={ styles.title }>
          <Text>管理员</Text>
        </View>
        {
          managers.map((item, index) => {
            return (
              <TouchableCross feed onPress={ () => this.navigateTo('User') } key={ index }
                              style={ { marginBottom: 10 } }>
                <View style={ [S.flexRow, styles.title] }>
                  <Avatar uri={ item.avatar } mr={ 10 }/>
                  <View style={ [S.flexRow, { alignItems: 'center' }] }>
                    <Label point={ item.point }/>
                    <H4 title={ item.uname } style={ { marginLeft: 5 } }/>
                  </View>
                </View>
              </TouchableCross>
            )
          })
        }
        <Separator height={ 4 } backgroundColor={ '#eee' }/>
      </View>
    )
  }

  renderList = () => {
    const { users, isRefresh } = this.state
    return (
      <FlatList
        data={ users.lists }
        keyExtractor={ (item, index) => `${ index }` }
        showsHorizontalScrollIndicator={ false }
        removeClippedSubviews={ true }
        ListHeaderComponent={ this.renderManagers }
        renderItem={ (item) => this.renderUserCell(item) }
        onRefresh={ this._onRefresh }
        refreshing={ isRefresh }
        // onEndReached={() => this._onLoadMore()}
        onEndReachedThreshold={ 0.5 }
      />
    )
  }

  renderUserCell = ({ item, index }) => {
    return (
      <View style={ [S.flexCol,] }>
        {
          index === 0 ? (
            <View style={ styles.title }>
              <Text>群成员</Text>
            </View>
          ) : null
        }
        <TouchableCross feed onPress={ () => this.navigateTo('User') } key={ index }
                        style={ { marginBottom: 10 } }>
          <View style={ [S.flexRow, styles.title] }>
            <Avatar uri={ item.avatar } mr={ 10 }/>
            <View style={ [S.flexRow, { alignItems: 'center' }] }>
              <Label point={ item.point }/>
              <H4 title={ item.uname } style={ { marginLeft: 5 } }/>
            </View>
          </View>
        </TouchableCross>
      </View>
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
        { this.renderList() }
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
