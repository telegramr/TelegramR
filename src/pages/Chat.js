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
import { TextTool, Avatar, Btn } from '../components'
import { connect } from 'react-redux'; // 引入connect函数
import * as loginAction from '../actions/loginAction';
import * as messageMediaAction from '../actions/messageMidiaAction'
import * as chatAction from '../actions/chatAction'
import { NavigationActions, StackActions } from 'react-navigation';
import { screen, color } from "../utils";
import Svg from "../lib/svg";
import MessageContainer from '../components/MessageMedia'

const { H5, H4, Normal } = TextTool;

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      avatar: 'https://i1.hdslb.com/bfs/face/dd54da4e05d93f6553cbec24437c3d797a3702d5.jpg',
      title: 'Beats0',
      notice: '置顶消息fekofkoefkoefkeofkefke',
      lists: [
        {
          id: '1',
          from_id: '1',
          to_id: '2',
          out: true,
          uname: 'Beats0',
          avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4',
          message: '（￣▽￣）',
          date: '12: 47'
        },
        {
          id: '2',
          from_id: '2',
          to_id: '3',
          out: false,
          uname: '赤座あかり',
          avatar: 'https://lain.bgm.tv/pic/crt/l/19/44/13004_crt_kiafp.jpg',
          message: '因为是个好孩子所以被赐予主人公的宝座，但是存在感却因其他角色而渐渐被淡化中，因此没有多少主角的感觉。',
          date: '12: 47'
        },
        {
          id: '1',
          from_id: '1',
          to_id: '2',
          out: false,
          uname: '歳納京子',
          avatar: 'https://lain.bgm.tv/pic/crt/s/05/98/13005_crt_o8PHg.jpg',
          message: '暴走状态时周围的人完全无法阻止，没人能够跟上她的步调也没问题。实质是从事同人活动的宅女。',
          date: '12: 47'
        },
        {
          id: '1',
          from_id: '1',
          to_id: '2',
          out: false,
          uname: '船見結衣',
          avatar: 'https://lain.bgm.tv/pic/crt/s/7f/f6/13006_crt_44395.jpg',
          message: '负责对京子的吐槽。作为一人独居的少女，有很黑暗、很深的…其实基本没有。',
          date: '12: 47'
        },
        {
          id: '1',
          from_id: '1',
          to_id: '2',
          out: false,
          uname: '吉川ちなつ',
          avatar: 'https://lain.bgm.tv/pic/crt/s/4c/ee/13007_crt_U3Pqv.jpg?r=1444773044',
          message: '与人气动画《小魔女米拉库》的主人公相似，是会装可爱的女孩子。',
          date: '12: 47'
        },
        {
          id: '1',
          from_id: '1',
          to_id: '2',
          out: false,
          uname: '杉浦綾乃',
          avatar: 'https://lain.bgm.tv/pic/crt/s/69/60/13008_crt_4B7Zn.jpg?r=1447203401',
          message: '视京子为对手…这是骗人的，其实是恋爱中的纯情少女。',
          date: '12: 47'
        },
        {
          id: '1',
          from_id: '1',
          to_id: '2',
          out: false,
          uname: '池田 千鶴',
          avatar: 'https://lain.bgm.tv/pic/crt/s/d9/ec/27904_crt_4Fs21.jpg?r=1425883024',
          message: '池田千岁的双胞胎妹妹，讨厌京子，喜欢幻想姐姐×绫乃。',
          date: '12: 47'
        },
        {
          id: '1',
          from_id: '1',
          to_id: '2',
          out: false,
          uname: '大室櫻子',
          avatar: 'https://lain.bgm.tv/pic/crt/s/67/49/13012_crt_xrLRL.jpg?r=1445999756',
          message: '以下届学生会副会长为目标的傲娇少女。与向日葵组成傲娇×傲娇的一对CP！？',
          date: '12: 47'
        },
        {
          id: '1',
          from_id: '1',
          to_id: '2',
          out: false,
          uname: '古谷向日葵',
          avatar: 'https://lain.bgm.tv/pic/crt/s/52/68/13011_crt_Q0abK.jpg?r=1446599422',
          message: '以下届学生会副会长为目标的傲娇少女。另外，是巨乳。',
          date: '12: 47'
        },
        {
          id: '1',
          from_id: '1',
          to_id: '2',
          out: false,
          uname: '池田千歳',
          avatar: 'https://lain.bgm.tv/pic/crt/s/72/33/13010_crt_Z2IdD.jpg?r=1447801919',
          message: '通过过激的百合妄想，而使被忘掉的百合度急剧上升的好人。',
          date: '12: 47'
        },
        {
          id: '1',
          from_id: '1',
          to_id: '2',
          out: false,
          uname: '赤座あかね',
          avatar: 'https://lain.bgm.tv/pic/crt/m/c7/dc/16802_crt_a49kW.jpg',
          message: '灯里的姐姐，19岁的大学生，同灯里一样的发色，不过留长发，长发后还有扎有一小撮短发，绑有一个团子。常以笑脸示人。与千夏的姐姐吉川智子相识。',
          date: '12: 47'
        },
        {
          id: '1',
          from_id: '1',
          to_id: '2',
          out: false,
          uname: '西垣 奈々',
          avatar: 'https://lain.bgm.tv/pic/crt/g/09/6c/27905_crt_2arPK.jpg',
          message: '理科教师，喜欢做奇怪的实验，经常引起爆炸。唯一能解读松本的人。',
          date: '12: 47'
        },
        {
          id: '1',
          from_id: '1',
          to_id: '2',
          out: false,
          uname: '松本 りせ',
          avatar: 'https://lain.bgm.tv/pic/crt/g/d8/7e/27906_crt_R9WqN.jpg?r=1450230204',
          message: '学生会长，比阿卡林更没有存在感的人。',
          date: '12: 47'
        },
        {
          id: '1',
          from_id: '1',
          to_id: '2',
          out: false,
          uname: '古谷楓',
          avatar: 'https://lain.bgm.tv/pic/crt/g/b9/cb/29773_crt_Uf4Mn.jpg?r=1425882930',
          message: '向日葵的妹妹，6岁，同向日葵几乎一样的外貌，不过眉毛较粗，10月30日出生。',
          date: '12: 47'
        },
        {
          id: '1',
          from_id: '1',
          to_id: '2',
          out: false,
          uname: '船见 まり',
          avatar: 'https://i2.hdslb.com/bfs/face/b146565cca5e2e2c78eef6f78c343b066b274ae1.jpg',
          message: '结衣亲戚的小孩，喜欢吃海胆寿司。个性沉默而且成熟，也有小孩天真的一面，崇敬结衣。喜欢看《小魔女米拉库》',
          date: '12: 47'
        },
        {
          id: '1',
          from_id: '1',
          to_id: '2',
          out: false,
          uname: '大室 撫子',
          avatar: 'https://lain.bgm.tv/pic/crt/g/0e/13/30876_crt_Qb116.jpg?r=1448413754',
          message: '櫻子と花子の姉。18歳。1月21日生まれ。 櫻子に比べて冷めた性格であり、櫻子のことを厄介に思っている面がある。櫻子より髪が短い。',
          date: '12: 47'
        },
        {
          id: '1',
          from_id: '1',
          to_id: '2',
          out: false,
          uname: '大室 花子',
          avatar: 'https://lain.bgm.tv/pic/crt/g/a4/de/30880_crt_iKdd9.jpg?r=1425883968',
          message: '櫻子と撫子の妹。8歳。8月7日生まれ。 櫻子のことを呼び捨てにしている。しっかり者で、学校のクラスメイト達からは「花子様」と呼ばれている。',
          date: '12: 47'
        }
      ],
      isRefresh: false
    }
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

  renderHeaderBar = () => {
    const { avatar, title } = this.props
    return (
      <View style={ [S.flexSB, S.flexAIC, S.pd8, { backgroundColor: color.theme }] }>
        <View style={ [S.flex, S.flexCenter, { width: 30, height: 30, position: 'absolute', left: 8 }] }>
          <Btn circular={ true } onPress={ this.backHandler }>
            <Svg icon="arrowleft" size="22"/>
          </Btn>
        </View>
        <TouchableOpacity style={ [S.flexSA, S.flexStart, S.flexAIC, { flex: 6, marginLeft: 46 }] }>
          <Avatar uri={ avatar } mr={ 10 }/>
          {/*<Image source={{uri: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4'}} style={{width: 30, height: 30, marginRight: 10}}/>*/ }
          <View style={ [S.flexCol] }>
            <H4 title={ title } color={ color.white }/>
            <H4 title={ `1999人在线` } color={ color.white }/>
          </View>
        </TouchableOpacity>
        <View tyle={ [S.flex, S.flexCenter, { width: 30, height: 30, position: 'absolute', right: 8 }] }>
          <Btn circular={ true } onPress={ () => Alert.alert('search') }>
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
        <TouchableOpacity style={ [S.flexRow, { flex: 8 }] }>
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
    const { lists, isRefresh, isEnd } = this.props
    return (
      <FlatList
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
        scrollToEnd={ { animated: isEnd } }
        onEndReachedThreshold={ 0.5 }
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
    return (
      <View style={ [S.pd10, S.flexRow] }>
        <TouchableOpacity style={ [S.mr5] }>
          <Avatar uri={ item.avatar }/>
        </TouchableOpacity>
        <View style={ [S.pd5, { marginTop: -10 }] }>
          <View style={ [S.flexRow, S.mb5] }>
            <Normal title={ '等级1' }/>
            <Normal title={ item.uname } color={ color.gray }/>
          </View>
          <TouchableOpacity
            style={ [S.pd10, S.chatBubbles, S.shadow, { backgroundColor: color.white, maxWidth: screen.width - 100 }] }>
            <H4 title={ item.message }/>
            <Normal title={ item.date }/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={ styles.container }>
        { this.renderHeaderBar() }
        { this.renderNotice() }
        { this.renderList() }
        <MessageContainer/>
      </View>
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
    closeMessageModalFn: () => dispatch(messageMediaAction.closeMessageModalFn())
  })
)(Chat)
