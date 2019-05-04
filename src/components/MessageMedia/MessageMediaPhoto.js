/**
 * @param    id            {long}                Photo identifier
 * @param    access_hash  {long}                Checksum dependent on photo identifier
 * @param    user_id      {int}                Photo sender
 * @param    date          {int}                Date created
 * @param    caption      {string}              Text description
 * @param    geo          {GeoPoint}            GeoPoint
 * @param    sizes        {Vector<PhotoSize}>  List of available images
 * */

/**
 * @type GeoPoint
 * @param long  {double}  Longtitude
 * @param lat  {double}  Latitude
 * */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
  TextInput
} from 'react-native';
import S from '../../public/style'
import ImageAuto from '../../components/ImageAuto'
import Svg from "../../lib/svg";
import { color, screen, } from '../../utils'
import { TextTool } from "../index";

const { H4, Normal } = TextTool;

class MessageMediaPhoto extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pics: [
        { uri: 'https://pic.xiami.net/images/album/img23/89023/5652761355984643.jpg?x-oss-process=image/resize,limit_0,s_410,m_fill' },
        { uri: 'https://pic.xiami.net/images/album/img20/43320/433201439043320.jpg?x-oss-process=image/resize,limit_0,s_410,m_fill' },
        { uri: 'https://pic.xiami.net/images/album/img23/89023/1073148121407314812.jpg?x-oss-process=image/resize,limit_0,s_410,m_fill' },
        { uri: 'https://pic.xiami.net/images/album/img99/951599/9515991412951599.jpg?x-oss-process=image/resize,limit_0,s_410,m_fill' },
        { uri: 'https://pic.xiami.net/images/album/img19/957019/9570191419957019.jpg?x-oss-process=image/resize,limit_0,s_410,m_fill' },
      ]
    }
  }

  renderPicItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={ [styles.imgItem, S.flexCenter] }>
        <ImageAuto height={ 136 } uri={ item.uri }/>
        {this.renderIsCheck(index + 1)}
      </TouchableOpacity>
    )
  }

  renderIsCheck(index) {
    return (
      <TouchableOpacity style={ [styles.itemNum, S.flexCenter] }>
        <H4 title={ index } color={ color.white }/>
      </TouchableOpacity>
    )
  }

  render() {
    const { pics } = this.state
    return (
      <View style={ styles.container }>
        <FlatList
          data={ pics }
          keyExtractor={ (item, index) => `${ index }` }
          renderItem={ this.renderPicItem }
          horizontal={ true }
          showsHorizontalScrollIndicator={ false }
        />
        <View style={ [S.inputBar, styles.inputMenu] }>
          <H4 color={ color.blueLight }>相册</H4>
          <H4 color={ color.blueLight }>发送(3)</H4>
        </View>
      </View>
    )
  }
}

export default MessageMediaPhoto

const styles = StyleSheet.create({
  container: {
    height: 180,
    flexDirection: 'column'
  },
  imgItem: {
    marginHorizontal: 2,
  },
  inputMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
