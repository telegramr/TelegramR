import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import { FileContentTypes } from "../../types";
import { color, screen } from "../../utils";
import { H3, H4 } from "../TextTool";
import S from "../../public/style";


interface Props {
  file: FileContentTypes;
  out: boolean;
}

interface State {

}

class MessageFile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  handleDownLoad = (uri: string) => {
    Alert.alert("downLoad", JSON.stringify(uri));
  };

  render() {
    const { file, out } = this.props;
    console.log(file)
    return (
      <TouchableOpacity onPress={ () => this.handleDownLoad(file.uri) }
                        activeOpacity={ 0.8 }
                        style={ [S.flexRow, S.pd5, out ? S.chatBubblesRight : S.chatBubblesLeft, S.shadow, {
                          backgroundColor: color.white,
                          maxWidth: screen.width - 120,
                        }] }>
        <View style={ [S.flexCenter, styles.previewContainer] }>

        </View>
        <View style={ [S.flexCol, { width: screen.width / 3 }] }>
          <H3 title={ file.fileName } color={ color.blueLight } numberOfLines={ 2 }/>
          <H4 title={ file.size } color={ color.gray } numberOfLines={ 1 }/>
        </View>
      </TouchableOpacity>
    );
  }
}

export default MessageFile;

const styles = StyleSheet.create({
  previewContainer: {
    width: 70,
    height: 70,
    padding: 5,
    borderRadius: 4,
    backgroundColor: color.blueLight,
    overflow: "hidden",
    marginRight: 10
  }
});
