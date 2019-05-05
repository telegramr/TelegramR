import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { Avatar, Btn } from '../components'
import * as loginAction from '../actions/loginAction';
import { NavigationActions, StackActions } from 'react-navigation';
import S from "../public/style";
import { color, screen } from "../utils";
import Svg from "../lib/svg";


const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Main' })
  ],
});
// FIXME: err
// this.props.navigation.dispatch(resetAction);

export default class GroupDetails extends Component {
  constructor(props) {
    super(props)
  }

  renderHeaderBar = () => {
    const groups = [
      {
        uri: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4',
        title: '倍多客科技有限公司',
        number: '12345678'
      }
    ]
    return (
      <ImageBackground source={ require('../static/images/bj.png') } style={ styles.headBox }>
        <View style={ [S.flexSB, S.flexAIC, S.pd10, { justifyContent: 'space-between' }] }>
          <View style={ [S.flexCenter, { width: 30, height: 30 }] }>
            <Btn circular={ true } onPress={ () => (this.props.navigation.toggleDrawer()) }>
              <Image source={ require('../static/images/ico_left.png') } style={ styles.arrowLeft }/>
            </Btn>
          </View>
          <View style={ [S.flexCenter, { width: 30, height: 30 }] }>
            <Btn circular={ true } onPress={ () => Alert.alert('search') }>
              <Svg icon="ellipsis" size="25"/>
            </Btn>
          </View>
        </View>
        {
          groups.map((item, index) => (
              <View style={ styles.head } key={ index }>
                <Text style={ styles.text }>{ item.title }</Text>
                <Text style={ [styles.text, { fontSize: 12, marginTop: 3 }] }>{ item.number }</Text>
              </View>
            )
          )
        }
      </ImageBackground>
    )
  }
  renderGroup = () => {
    const groups = [
      { uri: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4', name: '田鸹貔' },
      { uri: 'https://avatars3.githubusercontent.com/u/16267608?s=70&v=4', name: '周宝宝' },
      { uri: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4', name: '小哥哥' },
      { uri: 'https://avatars3.githubusercontent.com/u/16267608?s=70&v=4', name: '老怪物' }
    ]
    return (
      <View style={ styles.group }>
        <View style={ styles.title }>
          <Text style={ styles.textTitle }>群聊成员</Text>
          <View style={ styles.Right }>
            <Text style={ styles.textTitle1 }>共13人</Text>
            <Image source={ require('../static/images/ico_right.png') } style={ styles.arrowRight }/>
          </View>
        </View>
        <View style={ styles.groupBox }>
          {
            groups.map((item, index) => (
                <View key={ index }>
                  <Image source={ { uri: item.uri } } style={ styles.groupImg }/>
                  <Text style={ styles.name }>{ item.name }</Text>
                </View>
              )
            )
          }
          <View style={ { alignItems: 'center' } }>
            <View style={ [styles.groupImg, {
              backgroundColor: 'rgba(204,204,204,0.5)',
              justifyContent: 'center',
              alignItems: 'center'
            }] }>
              <Svg icon="plus" size="22"/>
            </View>
            <Text style={ styles.name }>邀请</Text>
          </View>
        </View>
      </View>
    )
  }
  renderGroup1 = () => {
    const groups = [
      { uri: '', name: '文件' },
      { uri: '', name: '相册' },
      { uri: '', name: '公告' },
    ]
    return (
      <View style={ [styles.groupBox, {
        paddingHorizontal: 40,
        paddingVertical: 15,
        backgroundColor: '#fff',
        marginTop: 5
      }] }>
        {
          groups.map((item, index) => (
              <View key={ index }>
                <Svg icon="file" size="22" style={ styles.groupIcon }/>
                <Text style={ styles.name }>{ item.name }</Text>
              </View>
            )
          )
        }
      </View>
    )
  }
  renderList = () => {
    const groups = [
      { title: '我的群昵称', text: '小哥哥' },
      { title: '群通知' },
    ]
    return (
      <View>
        {
          groups.map((item, index) => (
              <View style={ [styles.groupBox, { padding: 15, backgroundColor: '#fff', marginTop: 5 }] } key={ index }>
                <Text style={ styles.textTitle }>{ item.title }</Text>
                <View style={ styles.Right }>
                  <Text style={ styles.textTitle1 }>{ item.text }</Text>
                  <Image source={ require('../static/images/ico_right.png') } style={ styles.arrowRight }/>
                </View>
              </View>
            )
          )
        }
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={ styles.container }>
        { this.renderHeaderBar() }
        { this.renderGroup() }
        { this.renderGroup1() }
        { this.renderList() }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fb'
  },
  arrowLeft: {
    transform: [
      {
        scale: 0.6
      }
    ]
  },
  headBox: {
    width: screen.width,
    height: screen.width * 40 / 95,
  },
  head: {
    paddingHorizontal: 15,
    paddingTop: screen.width * 0.18
  },
  headImg: {
    width: screen.width * 0.2,
    height: screen.width * 0.2,
    borderRadius: 100,
    marginRight: 20,
  },
  text: {
    fontSize: 16,
    color: '#fff'
  },
  group: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff'
  },
  title: {
    paddingVertical: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  textTitle: {
    fontSize: 16,
    color: '#000'
  },
  textTitle1: {
    fontSize: 12,
    color: '#999'
  },
  Right: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  arrowRight: {
    transform: [
      {
        scale: 0.4
      }
    ]
  },
  groupBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingVertical: 5
  },
  groupImg: {
    width: screen.width * 0.1,
    height: screen.width * 0.1,
    borderRadius: 100,
  },
  name: {
    marginTop: 5,
    fontSize: 12,
    color: '#000'
  }
});
