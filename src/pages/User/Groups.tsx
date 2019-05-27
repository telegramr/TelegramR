import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import { Avatar, Btn, TouchableCross } from '../../components'
import { NavigationScreenProp, NavigationState, NavigationParams} from 'react-navigation';
import S from "../../public/style";
import { color, screen } from "../../utils";
import Svg from "../../lib/svg";
import { H4, H3, Normal, Tip } from "../../components/TextTool";



interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface State {
}

export default class Groups extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  private navigateTo = (routeName: string, params?: NavigationParams) => {
    this.props.navigation.navigate(routeName, params)
  };

  renderHeaderBar = () => (
    <View style={ [S.flexSB, S.flexAIC, S.pd10, {
      backgroundColor: color.theme,
      justifyContent: 'space-between',
    }] }>
      <View style={ [S.flexCenter, { width: 30, height: 30 }] }>
        <Btn circular={ true } onPress={ () => (this.props.navigation.goBack()) }>
          <Image source={ require('../../static/images/ico_left.png') } style={ styles.arrowLeft }/>
        </Btn>
      </View>
      <Text style={ styles.headTitle }>公开的群</Text>
      <Text style={ styles.headTitle }>管理</Text>
    </View>
  )

  renderGroup = () => {
    const groups = [
      {
        uri: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4',
        title: '组1',
        people: '455',
        sign: '这个群主好懒，什么刺都没有留下这个群主好懒，什么刺都没有留下'
      },
      {
        uri: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4',
        title: '组2',
        people: '455',
        sign: '这个群主好懒，什么刺都没有留下这个群主好懒，什么刺都没有留下'
      },
      {
        uri: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4',
        title: '组3',
        people: '455',
        sign: '这个群主好懒，什么刺都没有留下这个群主好懒，什么刺都没有留下'
      },
      {
        uri: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4',
        title: '组5',
        people: '455',
        sign: '这个群主好懒，什么刺都没有留下这个群主好懒，什么刺都没有留下'
      },
    ]
    return (
      <View>
        <View style={styles.groupNote}>
          <H4 title={'公开的群:'} color={color.gray} numberOfLines={1} />
        </View>
        {
          groups.map((item, index) => (
            <TouchableCross feed={true} onPress={() => this.navigateTo('Chat')} key={ index }>
              <View style={ styles.group } >
                <Avatar uri={ item.uri } size={50} mr={15}/>
                <View style={{maxWidth: screen.width - 90}}>
                  <H3 title={item.title} />
                  <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <View style={ [S.flexCenter, styles.groupLabel] }>
                      <Svg icon="head" size="11"/>
                      <Tip title={item.people} color={'#fff'} numberOfLines={1} style={{marginLeft: 2}} />
                    </View>
                  </View>
                  <Normal title={item.sign} numberOfLines={ 1 } color={color.borderOne}/>
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
      <View style={ styles.container }>
        <ScrollView style={ styles.container }>
          { this.renderHeaderBar() }
          { this.renderGroup() }
        </ScrollView>
      </View>
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
  groupNote: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: color.grayLittle,
    justifyContent: 'flex-start'
  },
  group: {
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: screen.onePixel,
    borderBottomColor: color.borderOne,
    flexDirection: 'row',
    alignItems: 'center'
  },
  groupLabel: {
    paddingHorizontal: 5,
    backgroundColor: '#00cdfa',
    borderRadius: 5,
    marginVertical: 2,
  },
  textContent: {
    width: screen.width * 0.62,
    color: '#a7a7a7',
    fontSize: 16
  }
});
