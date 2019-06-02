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
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
  CameraRoll,
  PermissionsAndroid
} from "react-native";
import S from "../../public/style";
import { ImageAuto, TouchableCross } from "../../components";
import { color, util } from "../../utils";
import { TextTool } from "../index";
import { connect } from "react-redux";
import * as messageMediaAction from "../../actions/messageMediaAction";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";

const { H4 } = TextTool;

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface Photos {
  uri: string;
  width: number;
  height: number;
  hash: string;
}

interface SelectedPhotos extends Photos {
  timestamp: number;
}

interface State {
  photos: Photos[];
  selectedPhotos: SelectedPhotos[];
}


class MessageMediaPhoto extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      photos: [],
      selectedPhotos: []
    };
  }

  componentDidMount() {
    this.getRecentPhotos();
  }

  private navigateTo = (routeName: string, params?: NavigationParams) => {
    this.props.navigation.navigate(routeName, params);
  };


  requestReadPermission = async () => {
    const isChecked = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    console.log(isChecked);
    if (isChecked) return;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "申请文件读取权限",
          message: "获取读取您的文件系统",
          buttonNeutral: "稍后询问",
          buttonNegative: "不允许",
          buttonPositive: "允许",
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("允许");
      } else {
        console.log("不允许");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // see https://reactnative.cn/docs/cameraroll/
  getRecentPhotos = async () => {
    await this.requestReadPermission();
    CameraRoll.getPhotos({
      first: 20,
      assetType: "Photos",
    })
      .then(r => {
        const photos = r.edges.map(p => p.node.image);
        this.setState({ photos });
      })
      .catch((err: Error) => {
        console.log(err);
        // get photos filed
      });
  };

  selectPhoto = (uri: string, width: number, height: number, hash: string = "") => {
    let { selectedPhotos } = this.state;
    if (selectedPhotos.some(item => item.uri === uri)) {
      selectedPhotos = selectedPhotos.filter(i => i.uri !== uri);
    } else {
      selectedPhotos.push({ uri, width, height, hash, timestamp: Date.now() });
    }
    selectedPhotos = selectedPhotos.sort(util.sortBy("timestamp", true));
    this.setState({
      selectedPhotos
    });
  };

  computedIndex = (uri: string) => {
    const { selectedPhotos } = this.state;
    let num = 0;
    selectedPhotos.map((item, index) => {
      if (item.uri === uri) {
        num = index + 1;
      }
    });
    return num;
  };

  handleSendPhoto = () => {
    const { sendMessageMedia } = this.props;
    const { selectedPhotos } = this.state;
    sendMessageMedia({ img: selectedPhotos });
    this.setState({
      selectedPhotos: []
    });
  };

  renderPicItem = ({ item }: ListRenderItemInfo<Photos>) => {
    return (
      <TouchableOpacity onPress={ () => this.selectPhoto(item.uri, item.width, item.height, item.hash) }
                        style={ [styles.imgItem, S.flexCenter] }>
        <ImageAuto height={ 136 } uri={ item.uri }/>
        { this.renderCheckNum(item.uri) }
      </TouchableOpacity>
    );
  };

  renderCheckNum(uri) {
    if (this.computedIndex(uri)) {
      return (
        <TouchableOpacity style={ [styles.itemNum, S.flexCenter] }>
          <H4 title={ this.computedIndex(uri) } color={ color.white }/>
        </TouchableOpacity>
      );
    }
  }

  render() {
    const { photos, selectedPhotos } = this.state;
    return (
      <View style={ styles.container }>
        <FlatList
          data={ photos }
          extraData={ this.state }
          keyExtractor={ (_item, index) => `${ index }` }
          renderItem={ this.renderPicItem }
          horizontal={ true }
          showsHorizontalScrollIndicator={ false }
        />
        <View style={ [S.inputBar, styles.inputMenu] }>
          <TouchableCross onPress={ () => this.navigateTo("ThumbSystem") }>
            <H4 color={ color.blueLight }>相册</H4>
          </TouchableCross>
          <TouchableCross onPress={ this.handleSendPhoto } disabled={ !selectedPhotos.length }>
            <H4 color={ color.blueLight }>发送({ selectedPhotos.length })</H4>
          </TouchableCross>
        </View>
      </View>
    );
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    sendMessageMedia: (messageObj, mediaType = "img") => dispatch(messageMediaAction.sendMessageMedia(messageObj, mediaType))
  })
)(MessageMediaPhoto);

const styles = StyleSheet.create({
  container: {
    height: 180,
    flexDirection: "column"
  },
  imgItem: {
    marginHorizontal: 2,
  },
  inputMenu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  itemNum: {
    width: 22,
    height: 22,
    borderRadius: 11,
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: color.blueLight
  }
});
