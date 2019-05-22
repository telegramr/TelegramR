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
import _ from 'lodash'
import S from '../../public/style'
import ImageAuto from '../../components/ImageAuto'
import Svg from "../../lib/svg";
import { color, screen, util } from '../../utils'
import { TextTool } from "../index";
import { connect } from "react-redux";
import * as messageMediaPhotoAction from "../../actions/messageMidiaPhotoAction";

const { H4, Normal } = TextTool;

class MessageMediaPhoto extends Component {
  constructor(props) {
    super(props)
  }

  renderPicItem = ({ item, index }) => {
    const {selectPhoto} = this.props
    return (
      <TouchableOpacity onPress={ () => selectPhoto(item.uri) } style={ [styles.imgItem, S.flexCenter] }>
        <ImageAuto height={ 136 } uri={ item.uri }/>
        { this.renderCheckNum(item.uri) }
      </TouchableOpacity>
    )
  }

  renderCheckNum(uri) {
    const {computedIndex} = this.props
    return (
      <TouchableOpacity style={ [styles.itemNum, S.flexCenter] }>
        {/*<Text>{JSON.stringify(selectedPhotos)}</Text>*/}
        <H4 title={ computedIndex(uri) } color={ color.white }/>
      </TouchableOpacity>
    )
  }

  render() {
    const { photos, selectedPhotos } = this.props
    return (
      <View style={ styles.container }>
        <FlatList
          data={ photos }
          keyExtractor={ (item, index) => `${ index }` }
          renderItem={ this.renderPicItem }
          horizontal={ true }
          showsHorizontalScrollIndicator={ false }
        />
        <View style={ [S.inputBar, styles.inputMenu] }>
          <Text>{JSON.stringify(selectedPhotos)}, {selectedPhotos}</Text>
          {/*<H4 color={ color.blueLight }>相册</H4>*/}
          {/*<H4 color={ color.blueLight }>发送(3)</H4>*/}
        </View>
      </View>
    )
  }
}

export default connect(
  (state) => ({
    photos: state.messageMediaPhoto.photos,
    selectedPhotos: state.messageMediaPhoto.selectedPhotos,
  }),
  (dispatch) => ({
    selectPhoto: (uri) => dispatch(messageMediaPhotoAction.selectPhoto(uri)),
    computedIndex: (uri) => dispatch(messageMediaPhotoAction.computedIndex(uri)),
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
