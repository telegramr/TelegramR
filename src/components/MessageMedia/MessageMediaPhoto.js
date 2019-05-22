/**
 * @param    id             {long}                Photo identifier
 * @param    access_hash    {long}                Checksum dependent on photo identifier
 * @param    user_id        {int}                 Photo sender
 * @param    date           {int}                 Date created
 * @param    caption        {string}              Text description
 * @param    geo            {GeoPoint}            GeoPoint
 * @param    sizes          {Vector<PhotoSize}>   List of available images
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
import { ImageAuto, TouchableCross } from '../../components'
import Svg from "../../lib/svg";
import { color, screen, util } from '../../utils'
import { TextTool } from "../index";
import { connect } from "react-redux";
import * as messageMediaAction from "../../actions/messageMediaAction";

const { H4, Normal } = TextTool;

class MessageMediaPhoto extends Component {
  constructor(props) {
    super(props)
    this.state = {
      photos: [
        { uri: 'https://pic.xiami.net/images/album/img23/89023/5652761355984643.jpg?x-oss-process=image/resize,limit_0,s_410,m_fill' },
        { uri: 'https://pic.xiami.net/images/album/img20/43320/433201439043320.jpg?x-oss-process=image/resize,limit_0,s_410,m_fill' },
        { uri: 'https://pic.xiami.net/images/album/img23/89023/1073148121407314812.jpg?x-oss-process=image/resize,limit_0,s_410,m_fill' },
        { uri: 'https://pic.xiami.net/images/album/img99/951599/9515991412951599.jpg?x-oss-process=image/resize,limit_0,s_410,m_fill' },
        { uri: 'https://pic.xiami.net/images/album/img19/957019/9570191419957019.jpg?x-oss-process=image/resize,limit_0,s_410,m_fill' },
      ],
      selectedPhotos: []
    }
  }

  selectPhoto = (uri) => {
    const { selectedPhotos } = this.state
    let _selectedPhotos = selectedPhotos
    if (_selectedPhotos.some(item => item.uri === uri)) {
      _selectedPhotos = _selectedPhotos.filter(i => i.uri !== uri)
    } else {
      _selectedPhotos.push({ uri, timestamp: Date.now() })
    }
    _selectedPhotos = _selectedPhotos.sort(util.sortBy('timestamp', true))
    console.log(_selectedPhotos);
    this.setState({
      selectedPhotos: _selectedPhotos
    })
  }

  computedIndex = (uri) => {
    const { selectedPhotos } = this.state
    let num = 0
    selectedPhotos.map((item, index) => {
      if (item.uri === uri) {
        num = index + 1
      }
    })
    return num
  }

  handleSendPhoto = () => {
    const { sendMessageMedia } = this.props
    const { selectedPhotos } = this.state
    const photos =  selectedPhotos.map(i => i.uri)
    sendMessageMedia(photos)
    this.setState({
      selectedPhotos: []
    })
  }

  renderPicItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={ () => this.selectPhoto(item.uri) } style={ [styles.imgItem, S.flexCenter] }>
        <ImageAuto height={ 136 } uri={ item.uri }/>
        { this.renderCheckNum(item.uri) }
      </TouchableOpacity>
    )
  }

  renderCheckNum(uri) {
    if (this.computedIndex(uri)) {
      return (
        <TouchableOpacity style={ [styles.itemNum, S.flexCenter] }>
          <H4 title={ this.computedIndex(uri) } color={ color.white }/>
        </TouchableOpacity>
      )
    }
  }

  render() {
    const { photos, selectedPhotos } = this.state
    return (
      <View style={ styles.container }>
        <FlatList
          data={ photos }
          extraData={ this.state }
          keyExtractor={ (item, index) => `${ index }` }
          renderItem={ this.renderPicItem }
          horizontal={ true }
          showsHorizontalScrollIndicator={ false }
        />
        <View style={ [S.inputBar, styles.inputMenu] }>
          <TouchableCross onPress={ () => Alert.alert('lib') }>
            <H4 color={ color.blueLight }>相册</H4>
          </TouchableCross>
          <TouchableCross onPress={ this.handleSendPhoto } disabled={ !selectedPhotos.length }>
            <H4 color={ color.blueLight }>发送({ selectedPhotos.length })</H4>
          </TouchableCross>
        </View>
      </View>
    )
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    sendMessageMedia: (messageObj, mediaType = 'img') => dispatch(messageMediaAction.sendMessageMedia(messageObj, mediaType))
  })
)(MessageMediaPhoto)

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
