import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  ImageBackground,
  Image,
  ScrollView,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { Avatar, Btn, TouchableCross } from '../../components'
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

export default class GroupDetail extends Component {
  constructor(props) {
    super(props)
  }

  navigateTo = (routeName, ...params) => {
    const { navigate } = this.props.navigation
    navigate(routeName, ...params)
  };


  renderHead = () => {
    const groupInfo = {
      gAvatar: 'http://lain.bgm.tv/pic/cover/l/43/d9/14588_bDB2r.jpg',
      gTitle: '摇曳百合',
      gId: '12345678'
    }
    return (
      <ImageBackground source={ { uri: groupInfo.gAvatar } }
                       style={ styles.headBox }>
        <View style={ [S.flexSB, S.flexAIC, S.pd10, { justifyContent: 'space-between' }] }>
          <View style={ [S.flexCenter, { width: 30, height: 30 }] }>
            <Btn circular={ true } onPress={ () => (this.props.navigation.goBack()) }>
              <Image source={ require('../../static/images/ico_left.png') } style={ styles.arrowLeft }/>
            </Btn>
          </View>
          <View style={ [S.flexCenter, { width: 30, height: 30 }] }>
            <Btn circular={ true } onPress={ () => Alert.alert('search') }>
              <Svg icon="ellipsis" size="25"/>
            </Btn>
          </View>
        </View>
        <View style={ styles.head }>
          <H2 title={ groupInfo.gTitle } numberOfLines={ 1 } color={ '#fff' }/>
          <H4 title={ groupInfo.gId } numberOfLines={ 1 } color={ '#fff' }/>
        </View>
      </ImageBackground>
    )
  }

  renderGroupInfo = () => {
    const info = '这里是《摇曳百合》群...'
    return (
      <View style={ [S.cell, { marginBottom: 5 }] }>
        <Text>{ info }</Text>
      </View>
    )
  }

  renderGroupUser = () => {
    const groups = [
      { uid: '1', avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4', name: 'Beats0' },
      { uid: '1', avatar: 'https://lain.bgm.tv/pic/crt/l/19/44/13004_crt_kiafp.jpg', name: '赤座あかり' },
      { uid: '1', avatar: 'https://lain.bgm.tv/pic/crt/s/05/98/13005_crt_o8PHg.jpg', name: '歳納京子' },
      { uid: '1', avatar: 'https://lain.bgm.tv/pic/crt/s/7f/f6/13006_crt_44395.jpg', name: '船見結衣' },
      { uid: '1', avatar: 'https://lain.bgm.tv/pic/crt/s/4c/ee/13007_crt_U3Pqv.jpg?r=1444773044', name: '吉川ちなつ' },
      { uid: '1', avatar: 'https://lain.bgm.tv/pic/crt/s/69/60/13008_crt_4B7Zn.jpg?r=1447203401', name: '杉浦綾乃' },
      { uid: '1', avatar: 'https://lain.bgm.tv/pic/crt/s/d9/ec/27904_crt_4Fs21.jpg?r=1425883024', name: '池田 千鶴' },
      { uid: '1', avatar: 'https://lain.bgm.tv/pic/crt/s/67/49/13012_crt_xrLRL.jpg?r=1445999756', name: '大室櫻子' },
      { uid: '1', avatar: 'https://lain.bgm.tv/pic/crt/s/52/68/13011_crt_Q0abK.jpg?r=1446599422', name: '古谷向日葵' },
    ]
    return (
      <View style={ styles.group }>
        <TouchableCross feed onPress={ () => this.navigateTo('GroupUsers') }>
          <View style={ styles.title }>
            <Text style={ styles.textTitle }>群聊成员</Text>
            <View style={ styles.Right }>
              <Text style={ styles.textTitle1 }>共13人</Text>
              <Image source={ require('../../static/images/ico_right.png') } style={ styles.arrowRight }/>
            </View>
          </View>
        </TouchableCross>
        <View style={ styles.groupBox }>
          {
            groups.map((item, index) => (
                <View style={ [S.flexCenter, S.flexCol, styles.groupUserContainer] } key={ index }>
                  <TouchableHighlight onPress={ () => this.navigateTo('User', { uid: item.uid }) }
                                      underlayColor='#828385'
                                      style={ styles.groupImg }>
                    <Avatar uri={ item.avatar } size={ 50 } style={ styles.groupImg }/>
                  </TouchableHighlight>
                  <Normal title={ item.name } numberOfLines={ 1 } color={ color.gray }/>
                </View>
              )
            )
          }
          <View style={ [S.flexCenter, S.flexCol, styles.groupUserContainer] }>
            <TouchableHighlight onPress={ () => Alert.alert('user1111') }
                                underlayColor='#828385'
                                style={ [styles.groupImg, {
                                  backgroundColor: 'rgba(204,204,204,0.5)',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }] }>
              <Svg icon="plus" size="26"/>
            </TouchableHighlight>
            <Normal title='邀请' numberOfLines={ 1 } color={ color.gray }/>
          </View>
        </View>
      </View>
    )
  }

  renderList = () => {
    const groups = [
      { title: '聊天记录', routeName: '' },
      { title: '通知', routeName: '' },
    ]
    return (
      <View>
        {
          groups.map((item, index) => (
              <TouchableCross feed onPress={ () => this.navigateTo(item.routeName) } key={ index }>
                <View style={ [styles.groupBox, S.border, { padding: 10, backgroundColor: '#fff' }] }>
                  <Text style={ styles.textTitle }>{ item.title }</Text>
                  <View style={ styles.Right }>
                    <Image source={ require('../../static/images/ico_right.png') } style={ styles.arrowRight }/>
                  </View>
                </View>
              </TouchableCross>
            )
          )
        }
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
        <ScrollView style={ styles.container }>
          { this.renderHead() }
          { this.renderGroupInfo() }
          { this.renderGroupUser() }
          { this.renderList() }
        </ScrollView>
      </SafeAreaView>
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
    height: 180,
  },
  head: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    borderWidth: 1,
    borderColor: '#991010',
  },
  headImg: {
    width: screen.width * 0.2,
    height: screen.width * 0.2,
    borderRadius: 100,
    marginRight: 20,
  },
  group: {
    backgroundColor: '#fff',
    marginBottom: 5
  },
  title: {
    padding: 10,
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
    alignItems: 'center'
  },
  groupUserContainer: {
    width: (screen.width - 20) / 5,
    marginBottom: 10
  },
  groupImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  name: {
    marginTop: 5,
    fontSize: 12,
    color: '#000'
  }
});
