import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  CameraRoll,
  PermissionsAndroid,
} from "react-native";
// import * as RNFS from "react-native-fs";
import S from "../../public/style";
import { ImageAuto, TouchableCross, Btn, StatusBars } from "../../components";
import { color, screen, util } from "../../utils";
import { connect } from "react-redux";
import * as messageMediaAction from "../../actions/messageMediaAction";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";
import { H2, H4 } from "../../components/TextTool";
import Svg from "../../lib/svg";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface Photos {
  uri: string
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

  getRecentPhotos = async () => {
    await this.requestReadPermission();
    CameraRoll.getPhotos({
      first: 500,
      assetType: "Photos",
    })
      .then(r => {
        const photos = r.edges.map(p => p.node.image);
        console.log(photos);
        this.setState({ photos });
      })
      .catch((err: Error) => {
        console.log(err);
        // get photos filed
      });
  };

  selectPhoto = (uri: string) => {
    const { selectedPhotos } = this.state;
    let _selectedPhotos = selectedPhotos;
    if (_selectedPhotos.some(item => item.uri === uri)) {
      _selectedPhotos = _selectedPhotos.filter(i => i.uri !== uri);
    } else {
      _selectedPhotos.push({ uri, timestamp: Date.now() });
    }
    _selectedPhotos = _selectedPhotos.sort(util.sortBy("timestamp", true));
    this.setState({
      selectedPhotos: _selectedPhotos
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

  handleClear = () => {
    this.setState({
      selectedPhotos: []
    });
  };

  handleSendPhoto = () => {
    const { sendMessageMedia } = this.props;
    const { selectedPhotos } = this.state;
    const photos = selectedPhotos.map(i => i.uri);
    sendMessageMedia(photos);
    this.setState({
      selectedPhotos: []
    });
    this.props.navigation.goBack();
  };

  renderPicItem = ({ item, index }) => {
    return (
      <TouchableCross feed={ true } onPress={ () => this.selectPhoto(item.uri) }
                      style={ [styles.imgItem, S.flexCenter] }>
        <View style={ [S.flexCenter, styles.imageContainer] }>
          <ImageAuto height={ screen.width / 3 - 3 } uri={ item.uri }/>
          { this.renderCheckNum(item.uri) }
        </View>
      </TouchableCross>
    );
  };

  renderCheckNum(uri: string) {
    if (this.computedIndex(uri)) {
      return (
        <TouchableOpacity style={ [styles.itemNum, S.flexCenter] }>
          <H4 title={ this.computedIndex(uri) } color={ color.white }/>
        </TouchableOpacity>
      );
    }
  }

  renderHeaderBar = () => {
    const { selectedPhotos } = this.state;
    if (selectedPhotos.length) {
      return (
        <View style={ [S.flexSB, S.flexAIC, S.pd8, {
          height: 48,
          backgroundColor: "#333",
          borderBottomWidth: screen.onePixel
        }] }>
          <View style={ [S.flex, S.flexCenter, { width: 30, height: 30, position: "absolute", left: 8 }] }>
            <Btn circular={ true } onPress={ this.handleClear }>
              <Svg icon="close" size="20" color={ "#fff" }/>
            </Btn>
          </View>
          <View style={ [S.flexCenter, { position: "absolute", left: 50 }] }>
            <H2 title={ selectedPhotos.length } color={ "#fff" }/>
          </View>
          <View style={ [S.flex, S.flexCenter, { width: 30, height: 30, position: "absolute", right: 8 }] }>
            <Btn circular={ true } onPress={ this.handleSendPhoto }>
              <Svg icon="check" size="22" color={ "#fff" }/>
            </Btn>
          </View>
        </View>
      );
    }
    return (
      <View style={ [S.flexSB, S.flexAIC, S.pd8, { height: 48, backgroundColor: "#333" }] }>
        <View style={ [S.flex, S.flexCenter, { width: 30, height: 30, position: "absolute", left: 8 }] }>
          <Btn circular={ true } onPress={ () => this.props.navigation.goBack() }>
            <Svg icon="arrowleft" color={ "#fff" } size="22"/>
          </Btn>
        </View>
        <View style={ [S.flexCenter, { position: "absolute", left: 50 }] }>
          <H2 title={ "最近文件" } color={ "#fff" }/>
        </View>
      </View>
    );
  };

  render() {
    const { photos, selectedPhotos } = this.state;
    return (
      <View style={ styles.container }>
        <StatusBars backgroundColor={ "#333" }/>
        { this.renderHeaderBar() }
        <FlatList
          data={ photos }
          extraData={ this.state }
          keyExtractor={ (item, index) => `${ index }` }
          renderItem={ this.renderPicItem }
          numColumns={ 3 }
          showsHorizontalScrollIndicator={ false }
        />
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
    flex: 1,
    backgroundColor: "#000",
  },
  imgItem: {
    width: screen.width / 3 - 3,
    marginVertical: 1,
    overflow: "hidden",
    paddingBottom: 1,
    marginHorizontal: 1,
  },
  inputMenu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  imageContainer: {
    width: screen.width / 3 - 3,
    height: screen.width / 3 - 3,
    overflow: "hidden",
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
