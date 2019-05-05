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

export default class Group extends Component {
  constructor(props) {
    super(props)
  }

  renderHeaderBar = () => (
    <View style={ [S.flexSB, S.flexAIC, S.pd10, { backgroundColor: color.theme, justifyContent: 'space-between' }] }>
      <View style={ [S.flexCenter, { width: 30, height: 30 }] }>
        <Btn circular={ true } onPress={ () => (this.props.navigation.toggleDrawer()) }>
          <Image source={ require('../static/images/ico_left.png') } style={ styles.arrowLeft }/>
        </Btn>
      </View>
      <Text style={ styles.headTitle }>加入的群</Text>
      <Text style={ styles.headTitle }>管理</Text>
    </View>
  )
  renderGroup = () => {
    const groups = [
      {
        uri: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4',
        title: '同性交流群',
        people: '455',
        autograph: '这个群主好懒，什么刺都没有留下这个群主好懒，什么刺都没有留下'
      },
      {
        uri: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4',
        title: '同性交流群',
        people: '455',
        autograph: '这个群主好懒，什么刺都没有留下这个群主好懒，什么刺都没有留下'
      },
      {
        uri: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4',
        title: '同性交流群',
        people: '455',
        autograph: '这个群主好懒，什么刺都没有留下这个群主好懒，什么刺都没有留下'
      },
      {
        uri: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4',
        title: '同性交流群',
        people: '455',
        autograph: '这个群主好懒，什么刺都没有留下这个群主好懒，什么刺都没有留下'
      },
    ]
    return (
      <View>
        <Text style={ styles.h1 }>以下的群在个人资料卡中可见:</Text>
        {
          groups.map((item, index) => (
              <View style={ styles.group } key={ index }>
                <Image source={ { uri: item.uri } } style={ styles.groupImg }/>
                <View>
                  <Text
                    style={ { fontSize: 16, color: '#000', fontWeight: 'bold', letterSpacing: 1 } }>{ item.title }</Text>
                  <View style={ styles.number }>
                    <Svg icon="head" size="14"/>
                    <Text style={ { color: '#fff', marginLeft: 5 } }>{ item.people }</Text>
                  </View>
                  <Text numberOfLines={ 1 } style={ styles.textContent }>{ item.autograph }</Text>
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
  headTitle: {
    color: '#fff',
    fontSize: 16
  },
  h1: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#ccc',
    color: '#666',
  },
  group: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center'
  },
  groupImg: {
    width: screen.width * 0.2,
    height: screen.width * 0.2,
    borderRadius: 100,
    marginRight: 15,
  },
  number: {
    width: screen.width * 0.15,
    paddingVertical: 2,
    backgroundColor: '#00cdfa',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    marginVertical: 10
  },
  textContent: {
    width: screen.width * 0.62,
    color: '#a7a7a7',
    fontSize: 16
  }
});
