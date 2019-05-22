/**
 * @param    id             {long}                Photo identifier
 * @param    access_hash    {long}                Checksum dependent on photo identifier
 * @param    user_id        {int}                 Photo sender
 * @param    date           {int}                 Date created
 * @param    caption        {string}              Text description
 * @param    sizes          {Vector<PhotoSize}>   List of available images
 * */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import * as messageMediaAction from '../../actions/messageMediaAction'
import S from '../../public/style'
import { ImageAuto, ImageStickerAuto, TouchableCross, TextTool } from '../../components'
import { color, screen } from '../../utils'

const { H4, Normal } = TextTool;

class MessageMediaPhoto extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentId: '1',
      stickers: [
        {
          id: '1', title: 'aaa', thumb: 'https://i0.hdslb.com/bfs/album/1ed54435efcef302bb5582d49447c7d0d75d1a99.jpg',
          stickers: [
            { uri: 'https://i0.hdslb.com/bfs/album/1ed54435efcef302bb5582d49447c7d0d75d1a99.jpg' },
            { uri: 'https://i0.hdslb.com/bfs/album/1af4d7b6e578b485a611ecfff0ee49626ac0d75a.jpg' },
            { uri: 'https://i0.hdslb.com/bfs/album/020b87c07f6e304750bf6f73fd5c271c3118a708.jpg' },
            { uri: 'https://i0.hdslb.com/bfs/album/3ddf77cf601431bea568c38ae3d80bc341ca6e1a.jpg' },
            { uri: 'https://i0.hdslb.com/bfs/album/1821a0c7cc6304bde4cc2e39e2a50b8a2e5a27c1.jpg' },
            { uri: 'https://i0.hdslb.com/bfs/album/1821a0c7cc6304bde4cc2e39e2a50b8a2e5a27c1.jpg' },
            { uri: 'https://i0.hdslb.com/bfs/album/1821a0c7cc6304bde4cc2e39e2a50b8a2e5a27c1.jpg' },
            { uri: 'https://i0.hdslb.com/bfs/album/dedbb88fb4ce6085e5b2b710acd2f49be35e9d28.jpg' },
            { uri: 'https://i0.hdslb.com/bfs/album/32b6d76c36fb45c37133efa42a6f2bb76528c542.jpg@2000w_1e.webp' },
            { uri: 'https://i0.hdslb.com/bfs/album/1d0480153e7f5957c792d40b4f3570cbb6f6a416.jpg@2000w_1e.webp' }
          ]
        },
        {
          id: '2', title: 'bbb', thumb: 'https://i0.hdslb.com/bfs/vip/ce49073ff96606a1a2674b3b4ef8e15fb0a399ff.png',
          stickers: [
            { uri: 'https://i0.hdslb.com/bfs/vip/f80d384875183dfe2e24be13011c595c0210d273.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/05e279abbf3f72d5cc45548504a4220c5514b8b9.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/86ccf6d0b5480169bf80f3582fae09d7ed455c06.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/38456e3bde2839b00b536a8be13934fa57c8e298.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/6fd437f547ef1e4f231ff475d02f58bb94cef5a5.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/5c150cec77eae1b05d5ca46526450ff3beeb44d2.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/de3aee88f7b6cc20ba9480c96c02f83a844381a9.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/05188008ea84c70d94e0076e28de15bf56f4c441.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/938bdf98df945576ae88e2a22931db07ded9e663.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/68d524b7e515396b6563d320fb710c64abfb1063.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/6853161f0eab3332b874ab7c6c0311035b7538f3.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/a695fe1301aab2675ab6f6e34757c25a863a8617.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/fbd12affebfdaadd3d721bffdb685a6b1ee71219.png@56w_56h.webp' }
          ]
        },
        {
          id: '3',
          title: 'ccc',
          thumb: 'https://i0.hdslb.com/bfs/vip/f52830f0c01a4dc91457be5bb2ee49b1b5692cd5.png@44w_44h.webp',
          stickers: [
            { uri: 'https://i0.hdslb.com/bfs/vip/16b8794be990cefa6caeba4d901b934a227ee3b8.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/d1628c43d35b1530c0504a643ff80b6189fa0a43.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/476a2a60f6e337b8c0697a592e0aa82781f6b33b.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/d7178e258a0efc969b65ccc2b1322fb235f5dff4.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/ea893aa25355de95ab4f03c2dad3f0c58d0c159e.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/0b41f509351958dbb63d472fec0132d1bd03bd14.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/247cd9df8cdf84b18368c21e3b2dd374e84c0927.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/714eeb4eae0d0933b4ff08b7df788b1982f6b940.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/f31953119c51b9748016440ac0b632f779929b37.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/d9d0bf9d358af8d5761093ec66d4e3f60d963a63.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/485203fe7100f2c8fc40b2800a18fe20b35f2f1a.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/3754ee6e5985bd0bd7dfb668981f2a8733398ebd.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/695bf5429472049b52c1e0de586f8a2511195a23.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/e999af499edf38a91ca68b1a9d2f97042c1d6734.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/fdb5870f32cfaf7949e0f88a13f6feba4a48b719.png@56w_56h.webp' },
          ]
        },
        {
          id: '4',
          title: 'ddd',
          thumb: 'https://i0.hdslb.com/bfs/vip/2afa12abaad687ee1be56447eb9aa26deba067db.png@44w_44h.webp',
          stickers: [
            { uri: 'https://i0.hdslb.com/bfs/vip/4cd1024d0c2ecee93224477946656d32c1705ccf.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/5d0d6cc54b508d30b4f50b6b5f7b7e1e259d84ea.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/7a4cb0b644214d476ce198ddf6a7a0aa31311199.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/7407634bf67bfe9d7806f15d57608a1b18c2b4c2.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/a4d8f95baaa24821fd591a7dbeee1b869e760f59.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/d3717f10ffe9787336bc39a09214270988521a67.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/e543c0a823ca915df9362283f4ae950e9e9cc2e9.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/8854f1b8a82126e3b87f3a1563da5feb55b23e71.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/40ef7e6d931acb37e5514b70d13663e86dc3698b.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/52543025a070fde5c01a10320c9636ec3173ac99.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/7750b698d15a1b8e83c0f59106e8e9cd5cb57897.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/bf398cbbcfaae107d1b59aaf03895f38422e3d87.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/b7278f750c6f2235f41f37056d727f25d3bf781f.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/a23055546c19eba663b16370b8e072394d87ff53.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/52463ded4f23649db10ba3ced662ed946c5edf0b.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/b6c763c6484ce2e48299ceb21861e46318868871.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/5772d22015e5b2b40a9fe302b5967ec7282ac848.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/7f1a857e9430dcf3050ce0ef5fa19aefebea6dc4.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/52a0dcee66c91bf123bf53bd48a269b1317d17f9.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/1d3355fb89c24ab3c50e5c152d8b990a290dc63e.png@56w_56h.webp' }
          ]
        },
        {
          id: '5',
          title: 'eee',
          thumb: 'https://i0.hdslb.com/bfs/vip/1dfe73e00f40ca42789602e8ee53b58c4f75a838.jpg@44w_44h.webp',
          stickers: [
            { uri: 'https://i0.hdslb.com/bfs/vip/d2acc1227312dd64284d809ab66d3c7f7d8ec020.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/7f482b82a3de44ae14537cbafcbc40cf65f7113e.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/77545a5e420e2c43e0e4a7996a71769638ae3f90.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/0d23b726b084280f941f14919ce63c43f8bc724c.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/0d23b726b084280f941f14919ce63c43f8bc724c.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/a594a91717e28bdcab82821086a41160a1345c45.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/f077d5ecf0e86f24991a104f995b3a652091d529.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/874d2c39a0ca891abce5e65fafc287e0c2d3bbea.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/5ae25cc388c59192133f08345e461098fad4e63b.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/9038d450dbadaf132847d67cb26931aa5bf76d4c.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/6f058f78bce5d1c9b370c3807c891e685bb68a17.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/af8f017e383a1999e26a7f91c3ec3c83fbb7ba77.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/70776b579d2952580249ac6a52e724850d037591.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/1a805b885a1691e9bf4425164a9400e2457f4d1b.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/ee0de8296b20d295b79ea9b70ca4f126eb4aff1d.png@56w_56h.webp' },
            { uri: 'https://i0.hdslb.com/bfs/vip/8bf33ff2f9699286102fb1a256a2523695c17d35.png@56w_56h.webp' }
          ]
        },
      ]
    }
  }

  setCurrentId = currentId => {
    this.setState({
      currentId
    })
  }

  renderPicItem = ({ item, index }) => {
    const { sendMessageMedia } = this.props
    return (
      <TouchableOpacity onPress={() =>  sendMessageMedia(item.uri )}
        activeOpacity={ 0.9 }
        style={ [S.flexCenter, { width: (screen.width - 2 * 10) / 5, margin: 2 }] }>
        <ImageStickerAuto uri={ item.uri }/>
      </TouchableOpacity>
    )
  }

  renderThumbItem = ({ item, index }) => {
    const { currentId } = this.state
    return (
      <TouchableCross onPress={ () => this.setCurrentId(item.id) }
                      style={ {
                        width: 46,
                        height: 46,
                        padding: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: currentId === item.id ? color.grayLight : color.white
                      } }>
        <View>
          <ImageAuto uri={ item.thumb } height={ 30 }/>
        </View>
      </TouchableCross>
    )
  }

  render() {
    const { stickers, currentId } = this.state;
    let thumbs = []
    for (let i = 0; i < stickers.length; i++) {
      thumbs.push({ thumb: stickers[i].thumb, id: stickers[i].id })
    }
    const currentStickers = stickers.filter(item => item.id === currentId)
    return (
      <View style={ styles.container }>
        {/*选中stickers 列表*/}
        <FlatList
          data={ currentStickers[0].stickers }
          style={ styles.stickerContainer }
          keyExtractor={ (item, index) => `${ index }` }
          renderItem={ this.renderPicItem }
          numColumns={ 5 }
          showsHorizontalScrollIndicator={ false }
        />
        {/*sticker 底部*/}
        <View style={ [S.inputBar, styles.inputMenu, { padding: 0 }] }>
          <FlatList
            data={ thumbs }
            style={ styles.stickerBarContainer }
            keyExtractor={ (item, index) => `${ index }` }
            renderItem={ this.renderThumbItem }
            horizontal={ true }
            showsHorizontalScrollIndicator={ false }
          />
        </View>
      </View>
    )
  }
}

export default connect(
  (state) => ({
  }),
  (dispatch) => ({
    sendMessageMedia: (messageObj, mediaType = 'sticker') => dispatch(messageMediaAction.sendMessageMedia(messageObj, mediaType))
  })
)(MessageMediaPhoto)

const styles = StyleSheet.create({
  container: {
    height: 180,
    flexDirection: 'column'
  },
  stickerBarContainer: {
    flexDirection: 'row',
  },
  stickerContainer: {
    flexDirection: 'column',
  },
  stickerItem: {
    marginHorizontal: 2,
    width: 80,
    height: 80
  },
  inputMenu: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemNum: {
    width: 22,
    height: 22,
    borderRadius: 11,
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: color.blueLight
  }
})
