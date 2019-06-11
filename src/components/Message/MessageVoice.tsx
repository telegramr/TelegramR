import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text,
} from "react-native";
import { VoiceContentTypes } from "../../types";
import { color, screen } from "../../utils";
import S from "../../public/style";


interface Props {
  voice: VoiceContentTypes;
  out: boolean;
}

interface State {
  voiceWidth: number;
}

class MessageVoice extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      voiceWidth: 20
    }
  }

  componentDidMount() {
    this.setState({
      voiceWidth: this.props.voice.duration
    })
  }

  handlePlay = (uri: string) => {
    Alert.alert("\n" +
      "import 'package:flutter/material.dart';\n" +
      "\n" +
      "void main() => runApp(MyApp());\n" +
      "\n" +
      "class MyApp extends StatelessWidget {\n" +
      "  @override\n" +
      "  Widget build(BuildContext context) {\n" +
      "    return MaterialApp(\n" +
      "      title: 'title',\n" +
      "      home: Scaffold(\n" +
      "        body: Center(\n" +
      "          child: Container(\n" +
      "            \n" +
      "          )\n" +
      "      ),\n" +
      "      ),\n" +
      "    );\n" +
      "  }\n" +
      "}", JSON.stringify(uri));
  };

  render() {
    const { voice, out } = this.props;
    const {voiceWidth} = this.state
    return (
      <TouchableOpacity onPress={ () => this.handlePlay(voice.uri) }
                        activeOpacity={ 0.8 }
                        style={ [S.flexRow, S.pd5, out ? S.chatBubblesRight : S.chatBubblesLeft, S.shadow, {
                          backgroundColor: color.white,
                          width: voiceWidth,
                          maxWidth: screen.width - 120,
                        }] }>
        <View style={ [S.flexCenter, styles.previewContainer] }>
          <Text>{voice.duration}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default MessageVoice;

const styles = StyleSheet.create({
  previewContainer: {
    height: 30,
    padding: 5,
    borderRadius: 4,
    overflow: "hidden",
    marginRight: 10
  }
});
