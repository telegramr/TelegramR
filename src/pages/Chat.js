import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  BackHandler,
  FlatList,
} from 'react-native';
import S from '../public/style'
import Message from '../components/Message'
import { TextTool, Avatar, Btn, Label, Badge, StatusBars, TouchableCross } from '../components'
import { connect } from 'react-redux';
import * as loginAction from '../actions/loginAction';
import * as messageMediaAction from '../actions/messageMidiaAction'
import * as chatAction from '../actions/chatAction'
import { NavigationActions, StackActions, SafeAreaView } from 'react-navigation';
import { screen, color } from "../utils";
import Svg from "../lib/svg";
import MessageContainer from '../components/MessageMedia'


const { H4, Normal } = TextTool

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      avatar: '',
      title: '',
      notice: '',
      lists: [],
      isRefresh: false,
    }
    this.flatList = null
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    }
  }

  onBackAndroid = () => {
    const { showMessageModal, closeMessageModalFn } = this.props
    if (showMessageModal) {
      closeMessageModalFn()
      return true
    }
    return false
  }

  navigateTo = (routeName, ...params) => {
    const { navigate } = this.props.navigation
    navigate(routeName, ...params)
  };

  backHandler = () => {
    this.props.navigation.goBack()
  }

  closeMessageMediaModal = () => {
    const { showMessageModal, closeMessageModalFn } = this.props
    if (showMessageModal) {
      closeMessageModalFn()
    }
  }

  handleScrollToEnd = () => {
    this.flatList.scrollToEnd({ animated: true })
  }

  renderHeaderBar = () => {
    const { avatar, title } = this.props
    return (
      <View style={ [S.flexSB, S.flexAIC, S.pd8, { backgroundColor: color.theme }] }>
        <View style={ [S.flex, S.flexCenter, { width: 30, height: 30, position: 'absolute', left: 8 }] }>
          <Btn circular={ true } onPress={ this.backHandler }>
            <Svg icon="arrowleft" size="22"/>
          </Btn>
        </View>
        <TouchableCross onPress={ () => this.navigateTo('GroupDetail') }
                        noActive={ true }
                        style={ [S.flexSA, S.flexStart, S.flexAIC, { width: screen.width - 100, marginLeft: 46 }] }>
          <Avatar uri={ avatar } mr={ 10 }/>
          <View style={ [S.flexCol] }>
            <H4 title={ title } color={ color.white }/>
            <H4 title={ `1999人在线` } color={ color.white }/>
          </View>
        </TouchableCross>
        <View tyle={ [S.flex, S.flexCenter, { width: 30, height: 30, position: 'absolute', right: 8 }] }>
          <Btn circular={ true } onPress={ () => this.navigateTo('GroupDetail') }>
            <Svg icon="team" size="25"/>
          </Btn>
        </View>
      </View>
    )
  }

  renderNotice = () => {
    const { notice } = this.props
    return (
      <View style={ [S.flexSA, S.flexAIC, S.pd5, { backgroundColor: color.white }] }>
        <TouchableOpacity activeOpacity={ 1 }
                          focusedOpacity={ 1 }
                          style={ [S.flexRow, { width: screen.width - 20 }] }>
          <View style={ [{ backgroundColor: color.theme, width: 2, margin: 5 }] }/>
          <View>
            <Normal title='置顶消息' color={ color.blue }/>
            <Normal title={ notice } color={ color.gray }/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={ [S.btnContainer, S.absolute, { right: 15 }] }>
          <Svg icon="close" size="20" color={ color.gray }/>
        </TouchableOpacity>
      </View>
    )
  }

  _onRefresh = async () => {
    let { lists } = this.state
    this.setState({
      isRefresh: true
    })
    // let {storeId, data, currentType} = this.state
    // let queryData = {type: currentType, page: 1}
    // let resData = await api.shop.store(storeId, queryData)
    // console.log(resData)
    // data[`tab${currentType}`] = resData
    // if(resData.number) {
    //   let storeInfo = {
    //     following: resData.number
    //   }
    //   this.setState({
    //     storeInfo
    //   })
    // }
    setTimeout(() => {
      lists = [...lists, ...lists]
      this.setState({
        lists,
        isRefresh: false
      })
    }, 2000)
  }

  renderList() {
    const { lists, isRefresh, isEnd, setIsEnd } = this.props
    // TODO: handleScrollToEnd and don't ues onContentSizeChange when init state
    // if (isEnd) {
    //   setTimeout(() => {
    //     this.handleScrollToEnd()
    //     setIsEnd(false)
    //   })
    // }
    return (
      <FlatList
        ref={ ref => this.flatList = ref }
        data={ lists }
        onTouchStart={ this.closeMessageMediaModal }
        keyExtractor={ (item, index) => `${ index }` }
        showsHorizontalScrollIndicator={ false }
        removeClippedSubviews={ true }
        // ListHeaderComponent={this.renderHeader()}
        ListFooterComponent={ this.renderListFooter }
        renderItem={ (item) => this.renderChatItem(item) }
        onRefresh={ this._onRefresh }
        refreshing={ isRefresh }
        // onEndReached={() => this._onLoadMore()}
        onEndReachedThreshold={ 0.5 }
        // onContentSizeChange={ this.handleScrollToEnd }
      />
    )
  }

  renderListFooter = () => {
    return (
      <View>
        <Text>fefefef</Text>
      </View>
    )
  }


  renderChatItem = ({ item, index }) => {
    if (item.out) {
      return (
        <View style={ [S.flexCol] }>
          <Badge date={ item.date } color={ '#A7A7A7' }/>
          <View style={ [S.pd10, S.flexRow, { justifyContent: 'flex-end' }] }>
            <View style={ [S.pd5, { marginTop: -10, justifyContent: 'flex-end' }] }>
              <View style={ [S.flexRow, S.mb5, { justifyContent: 'flex-end' }] }>
                <Label point={ 8000 }/>
                <Normal title={ item.uname } color={ color.gray }/>
              </View>
              <Message type={item.type} content={item.message} />
            </View>
            <TouchableOpacity activeOpacity={ 1 }
                              focusedOpacity={ 1 } style={ { marginLeft: 5 } }>
              <Avatar uri={ item.avatar }/>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    return (
      <View style={ [S.flexCol] }>
        <Badge date={ item.date } color={ '#A7A7A7' }/>
        <View style={ [S.pd10, S.flexRow] }>
          <TouchableOpacity style={ [S.mr5] }>
            <Avatar uri={ item.avatar }/>
          </TouchableOpacity>
          <View style={ [S.pd5, { marginTop: -10 }] }>
            <View style={ [S.flexRow, S.mb5] }>
              <Label point={ 2000 }/>
              <Normal title={ item.uname } color={ color.gray }/>
            </View>
            <Message type={item.type} content={item.message} out={item.out} />
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={ styles.container }>
        <StatusBars/>
        { this.renderHeaderBar() }
        { this.renderNotice() }
        { this.renderList() }
        <MessageContainer/>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
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
    count: state.counter.count,
    avatar: state.chat.avatar,
    title: state.chat.title,
    notice: state.chat.notice,
    lists: state.chat.lists,
    isRefresh: state.chat.isRefresh,
    isEnd: state.chat.isEnd,
    messageStr: state.messageMedia.messageStr,
    showMessageModal: state.messageMedia.showMessageModal,
    currentMessageMedia: state.messageMedia.currentMessageMedia,
    error: state.messageMedia.error,
    errorInfo: state.messageMedia.errorInfo,
  }),
  (dispatch) => ({
    login: () => dispatch(loginAction.login()),
    closeMessageModalFn: () => dispatch(messageMediaAction.closeMessageModalFn()),
    setIsEnd: (endStatus) => dispatch(chatAction.setIsEnd(endStatus))
  })
)(Chat)
