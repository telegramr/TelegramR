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

export default class User extends Component {
  constructor(props) {
    super(props)
  }

  renderHeaderBar = () => (
    <View style={ [S.flexSB, S.flexAIC, S.pd10, {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 999,
      width: screen.width,
      justifyContent: 'space-between'
    }] }>
      <View style={ [S.flexCenter, { width: 30, height: 30 }] }>
        <Btn circular={ true } onPress={ () => (this.props.navigation.toggleDrawer()) }>
          <Svg icon="arrowleft" size="22"/>
        </Btn>
      </View>
      <View style={ [S.flexCenter, { width: 30, height: 30 }] }>
        <Btn circular={ true } onPress={ () => Alert.alert('search') }>
          <Svg icon="ellipsis" size="25"/>
        </Btn>
      </View>
    </View>
  )
  renderHead = () => (
    <ImageBackground source={ require('../static/images/head.png') } style={ styles.headImg }>
      <Avatar size={ 60 }/>
      <Text>this is user</Text>
    </ImageBackground>
  )
  renderPhotographs = () => (
    <View style={ styles.plate }>
      <View style={ styles.title }>
        <Text style={ styles.textTitle }>精选照片</Text>
        <Image source={ require('../static/images/ico_right.png') } style={ styles.arrowRight }/>
      </View>
      <View style={ styles.photo }>
        <Image source={ require('../static/images/img1.jpg') } style={ styles.imgImg }/>
        <Image source={ require('../static/images/img2.jpg') } style={ styles.imgImg }/>
      </View>
    </View>
  )
  renderGroup = () => {
    const groups = [
      { title: '同性交流群', uri: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4' },
      { title: '同性交流群', uri: 'https://avatars3.githubusercontent.com/u/16267608?s=70&v=4' },
      { title: '同性交流群', uri: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4' },
      { title: '同性交流群', uri: 'https://avatars3.githubusercontent.com/u/16267608?s=70&v=4' },
      { title: '同性交流群', uri: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4' },
    ]
    return (
      <View style={ styles.plate }>
        <View style={ styles.title }>
          <Text style={ styles.textTitle }>加入的群</Text>
          <Image source={ require('../static/images/ico_right.png') } style={ styles.arrowRight }/>
        </View>
        <View style={ styles.group }>
          {
            groups.map((item, index) => (
                <View style={ styles.groupBox } key={ index }>
                  <Image source={ { uri: item.uri } } style={ styles.groupImg }/>
                  <Text style={ styles.groupText }>{ item.title }</Text>
                </View>
              )
            )
          }
        </View>
      </View>
    )

  }

  render() {
    return (
      <ScrollView style={ styles.container }>
        { this.renderHeaderBar() }
        { this.renderHead() }
        { this.renderPhotographs() }
        { this.renderGroup() }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headImg: {
    width: screen.width,
    height: screen.width * 45 / 95,
    alignItems: 'center',
    paddingTop: screen.width * 0.4,
    marginBottom: 60
  },
  plate: {
    paddingHorizontal: 15,
    paddingTop: 15
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textTitle: {
    color: '#000',
    fontSize: 16,
  },
  arrowRight: {
    transform: [
      {
        scale: 0.4
      }
    ]
  },
  photo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15
  },
  imgImg: {
    width: screen.width / 2 - 15,
    height: screen.width / 2
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    justifyContent: 'space-between',
    width: screen.width - 30,
    height: screen.width * 0.32,
    overflow: 'hidden',
    flexWrap: 'wrap'
  },
  groupBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupImg: {
    width: screen.width / 4.5,
    height: screen.width / 4.5
  },
  groupText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5
  }
});
