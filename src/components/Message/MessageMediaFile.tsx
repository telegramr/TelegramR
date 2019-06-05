import React, { Component } from 'react';
import {
  View
} from 'react-native'
import {FileContentTypes} from "../../types";


interface Props {
  file: FileContentTypes[];
  out: boolean;
}

interface State {

}

class MessageMediaFile extends Component<Props, State>{
  constructor(props: Props) {
    super(props)
  }
  render() {
    return (
      <View>

      </View>
    )
  }
}

export default MessageMediaFile
