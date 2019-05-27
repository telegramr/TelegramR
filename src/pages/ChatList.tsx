import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import S from '../public/style'
import Svg from '../lib/svg'
import { color, screen } from '../utils'
import { TextTool, Avatar, Badge, TouchableCross, Btn ,StatusBars} from '../components'
import { connect } from 'react-redux';
import * as loginAction from '../actions/loginAction';
import { SafeAreaView,NavigationScreenProp, NavigationState, NavigationParams} from 'react-navigation';

const { H4 } = TextTool;


interface Props {
  name: string;
  navigation: NavigationScreenProp<NavigationState>;
}

interface messageListItem {
    gid: string;
    unread: number;
    name: string;
    avatar: string;
    timeNum: string | number;
    msg: string;
}

interface State {
  data: messageListItem[];
}


// const resetAction = StackActions.reset({
//   index: 0,
//   actions: [
//     NavigationActions.navigate({ routeName: 'Chat' })
//   ],
// });
// FIXME: err
// this.props.navigation.dispatch(resetAction);

class ChatList extends Component<Props, State> {
  // static navigationOptions = ({ navigation, screenProps }) => ({
  //   headerLeft:
  //     <TouchableOpacity  onPress={() => navigation.toggleDrawer()}>
  //       <Svg icon="menu" size="30" fill="#fff" />
  //     </TouchableOpacity>,
  //   headerTitle: <Text>connecting</Text>,
  //   headerRight: <Svg icon="search" size="30" fill="#fff"/>,
  //   headerStyle: {
  //     backgroundColor:"#517ca2",
  //     gesturesEnabled: true
  //   },
  // });

  constructor(props: Props) {
    super(props)
    this.state = {
      data: [
        {
          gid: '1',
          unread: 99,
          name: '摇曳百合',
          avatar: 'https://lain.bgm.tv/pic/cover/l/ec/f2/240193_36yPP.jpg',
          timeNum: '周二',
          msg: '2333'
        },
        {
          gid: '1',
          unread: 99,
          name: 'Anime/img',
          avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4',
          timeNum: '周二',
          msg: '图片'
        },
        {
          gid: '1',
          unread: 99,
          name: '测试组',
          avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4',
          timeNum: '周二',
          msg: '666'
        }
      ]
    }
  }

  componentDidMount() {
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // 登录完成,切成功登录
  //   if (nextProps.status === '登陆成功' && nextProps.isSuccess) {
  //     this.props.navigation.dispatch(resetAction)
  //     return false;
  //   }
  //   return true;
  // }

  private navigateTo = (routeName: string, params?: NavigationParams) => {
    this.props.navigation.navigate(routeName, params)
  };

  renderHeaderBar = () => (
    <View style={ [S.flexSB, S.flexAIC, S.pd10, { backgroundColor: color.theme }] }>
      <View style={ [S.flexCenter, { width: 30, height: 30 }] }>
        <Btn circular={ true } onPress={ () => (this.props.navigation.toggleDrawer()) }>
          <Svg icon="menu" size="22"/>
        </Btn>
      </View>
      <View style={ [S.flexCenter, { width: 30, height: 30 }] }>
        <Btn circular={ true } onPress={ () => Alert.alert('search') }>
          <Svg icon="search" size="25"/>
        </Btn>
      </View>
    </View>
  )

  renderChatList = () => {
    const { data } = this.state
    return (
      <FlatList
        data={ data }
        keyExtractor={ (item, index) => `${ index }` }
        showsHorizontalScrollIndicator={ false }
        removeClippedSubviews={ true }
        // ListHeaderComponent={this.renderHeader()}
        renderItem={ (item) => this.renderChatItem(item) }
        ListEmptyComponent={ this.renderEmpty }
        // onRefresh={() => this._onRefresh()}
        // refreshing={this.state.isRefresh}
        // onEndReached={() => this._onLoadMore()}
        ItemSeparatorComponent={ this._separator }
        onEndReachedThreshold={ 0.5 }
      />
    )
  }

  renderChatItem({ item, index }) {
    return (
      <TouchableCross feed={ true } onPress={ () => this.navigateTo('Chat') }>
        <View style={ [S.pd10, S.flexSB] }>
          <Avatar uri={ item.avatar } mr={ 10 }/>
          <View style={ [S.flexSB, S.flexCol, { width: screen.width - 70 }] }>
            <View style={ [S.flexSB] }>
              <View>
                <H4 title={ item.name } style={ { fontWeight: '500' } }/>
              </View>
              <View>
                <Text>{ item.timeNum }</Text>
              </View>
            </View>
            <View style={ S.flexSB }>
              <View>
                <Text>{ item.msg }</Text>
              </View>
              <Badge num={ 23 }/>
            </View>
          </View>
        </View>
      </TouchableCross>
    )
  }

  renderEmpty() {
    return (
      <View>
        <Text>this is null</Text>
      </View>
    )
  }

  _separator = () => <View style={ { height: screen.onePixel * 2, backgroundColor: '#eee' } }/>

  render() {
    return (
      <SafeAreaView style={ styles.container }>
        <StatusBars />
        { this.renderHeaderBar() }
        { this.renderChatList() }
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginBtn: {
    borderWidth: 1,
    padding: 5,
  }
});

export default connect(
  (state) => ({
    status: state.loginIn.status,
    isSuccess: state.loginIn.isSuccess,
    user: state.loginIn.user,
    count: state.counter.count
  }),
  (dispatch) => ({
    login: () => dispatch(loginAction.login()),
  })
)(ChatList)
