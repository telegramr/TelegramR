import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Alert
} from "react-native";
import { connect } from "react-redux";
import RNFetchBlob, {RNFetchBlobStat} from "rn-fetch-blob";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { TouchableCross, Btn, StatusBars } from "../../components";
import { screen, util, color } from "../../utils";
import S from "../../public/style";
import Svg from "../../lib/svg";
import { H2, H3, H4 } from "../../components/TextTool";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}


interface State {
  fileLists: RNFetchBlobStat[];
  selectedFileLists?: string[];
}


class FileSystem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fileLists: [],
      selectedFileLists: []
    };
  }

  componentDidMount() {
    let path = "";
    if (this.props.navigation.state.params) {
      path = this.props.navigation.state.params.path;
    } else {
      path = RNFetchBlob.fs.dirs.SDCardDir;
    }
    const re = /^\./g;
    console.log(path)
    RNFetchBlob.fs.lstat(path)
      .then((fileLists: RNFetchBlobStat[]) => {
        console.log(fileLists)
        // 过滤隐藏文件并排序
        fileLists = fileLists.filter(i => !i.filename.match(re));
        this.setState({
          fileLists: fileLists.sort(util.sortBy("filename", true))
        });
      })
      .catch((err: Error) => {
        console.log(err);
      });

    // RNFetchBlob.fs.ls(TRACK_FOLDER).then(files => {
    //   console.log(files);
    // }).catch(error => console.log(error))
    // RNFS.readDir(RNFS.CachesDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    //   .then((result) => {
    //     console.log("GOT RESULT", result);
    // // stat the first file
    // return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    // })
    // .then((statResult) => {
    //   if (statResult[0].isFile()) {
    //     // if we have a file, read it
    //     return RNFS.readFile(statResult[1], "utf8");
    //   }
    //
    //   return "no file";
    // })
    // .then((contents) => {
    //   // log the file contents
    //   console.log(contents);
    // })
    // .catch((err) => {
    //   console.log(err.message, err.code);
    // });
  }

  handlePushTo = (path: string) => {
    this.handleClear();
    this.props.navigation.push("FileSystem", { path });
  };

  handleSelectFile = (path: string) => {
    let { selectedFileLists } = this.state;
    if (selectedFileLists.includes(path)) {
      selectedFileLists = selectedFileLists.filter(i => i !== path);
    } else {
      selectedFileLists.push(path);
    }
    this.setState({
      selectedFileLists
    });
  };

  computedIsSelected = (path: string): boolean => {
    const { selectedFileLists } = this.state;
    return selectedFileLists.includes(path);
  };

  handleClear = () => {
    // 手动清空已选择数据
    this.setState({
      selectedFileLists: []
    });
  };

  handleUploadFile = () => {
    const { selectedFileLists } = this.state;
    Alert.alert("uploadFile", JSON.stringify(selectedFileLists));
  };

  renderHeaderBar = () => {
    const { selectedFileLists } = this.state;
    if (selectedFileLists.length) {
      return (
        <View style={ [S.flexSB, S.flexAIC, S.pd8, {
          height: 48,
          backgroundColor: "#fff",
          borderBottomColor: "#ccc",
          borderBottomWidth: screen.onePixel
        }] }>
          <View style={ [S.flex, S.flexCenter, { width: 30, height: 30, position: "absolute", left: 8 }] }>
            <Btn circular={ true } onPress={ this.handleClear }>
              <Svg icon="close" size="20" color={ "#666" }/>
            </Btn>
          </View>
          <View style={ [S.flexCenter, { position: "absolute", left: 50 }] }>
            <H2 title={ selectedFileLists.length } color={ "#666" }/>
          </View>
          <View style={ [S.flex, S.flexCenter, { width: 30, height: 30, position: "absolute", right: 8 }] }>
            <Btn circular={ true } onPress={ this.handleUploadFile }>
              <Svg icon="check" size="22" color={ "#666" }/>
            </Btn>
          </View>
        </View>
      );
    }
    return (
      <View style={ [S.flexSB, S.flexAIC, S.pd8, { height: 48, backgroundColor: color.theme }] }>
        <View style={ [S.flex, S.flexCenter, { width: 30, height: 30, position: "absolute", left: 8 }] }>
          <Btn circular={ true } onPress={ () => this.props.navigation.goBack() }>
            <Svg icon="arrowleft" size="22"/>
          </Btn>
        </View>
        <View style={ [S.flexCenter, { position: "absolute", left: 50 }] }>
          <H2 title={ "android" } color={ "#fff" }/>
        </View>
      </View>
    );
  };

  renderHeader = () => {
    return (
      <TouchableCross feed onPress={ () => this.props.navigation.goBack() }>
        <View style={ [S.flexRow, styles.cell] }>
          <View style={ [S.flexCenter, styles.round] }>
            <Svg icon="folder-fill" size="22" color={ "#999" }/>
          </View>
          <View style={ [S.flexCol, styles.fileNameCell] }>
            <H3 title={ ".." }/>
            <H4 title={ "返回上一级" } color={ "#999" }/>
          </View>
        </View>
      </TouchableCross>
    );
  };

  renderChatItem = ({ item }) => {
    if (item.type === "directory") {
      return (
        <TouchableCross feed onPress={ () => this.handlePushTo(item.path) }>
          <View style={ [S.flexRow, styles.cell] }>
            <View style={ [S.flexCenter, styles.roundBg] }>
              <Svg icon="folder-fill" size="22" color={ "#999" }/>
            </View>
            <View style={ [S.flexCol, styles.fileNameCell] }>
              <H3 title={ item.filename } numberOfLines={ 1 }/>
              <H4 title={ "文件夹" } color={ "#999" }/>
            </View>
          </View>
        </TouchableCross>
      );
    }
    return (
      <TouchableCross feed onPress={ () => this.handleSelectFile(item.path) }>
        <View style={ [S.flexRow, styles.cell] }>
          <View style={ [S.flexCenter, styles.roundBg] }>
            <Svg icon="file-fill" size="22" color={ "#999" }/>
          </View>
          <View style={ [S.flexCol, styles.fileNameCell] }>
            <H3 title={ item.filename } numberOfLines={ 1 }/>
            <H4 title={ "文件" } color={ "#999" }/>
          </View>
          <View style={ [S.flexCenter, styles.round] }>
            {
              this.computedIsSelected(item.path) ? (
                <Svg icon="check-circle-fill" size="22" color={ "#3da5fb" }/>
              ) : (
                <Svg icon="check-circle-fill" size="22" color={ "#ccc" }/>
              )
            }
          </View>
        </View>
      </TouchableCross>
    );
  };

  render() {
    const { fileLists } = this.state;
    return (
      <View style={ styles.container }>
        <StatusBars backgroundColor={color.theme} />
        { this.renderHeaderBar() }
        <FlatList<RNFetchBlobStat>
          data={ fileLists }
          extraData={ this.state }
          keyExtractor={ (_item, index) => `${ index }` }
          showsHorizontalScrollIndicator={ false }
          removeClippedSubviews={ true }
          ListHeaderComponent={ this.renderHeader() }
          renderItem={ (item) => this.renderChatItem(item) }
          onEndReachedThreshold={ 0.5 }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  loginBtn: {
    borderWidth: 1,
    padding: 5,
  },
  cell: {
    padding: 10,
    alignItems: "center",
  },
  fileName: {
    fontSize: 16,
    color: "#000",
  },
  round: {
    marginHorizontal: 10
  },
  roundBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    backgroundColor: "#EEEEEE",
    overflow: "hidden",
  },
  fileNameCell: {
    width: screen.width - 100
  }
});

export default connect(
)(FileSystem);
