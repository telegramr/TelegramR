import React, { Component } from 'react';
import {
  TouchableOpacity
} from 'react-native'
import { H4 } from "../TextTool";
import S from "../../public/style";
import { color, screen } from "../../utils";

interface Props {
    messageStr: string;
    out?: boolean;
}

interface State {

}
class MessageText extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
  }

  render() {
    const { messageStr, out } = this.props
    // TODO: add url link...
    return (
      <TouchableOpacity activeOpacity={ 0.8 }
                        style={ [S.pd10, out ? S.chatBubblesRight : S.chatBubblesLeft, S.shadow, {
                          backgroundColor: color.white,
                          maxWidth: screen.width - 120,
                        }] }>
        <H4 title={ messageStr }/>
      </TouchableOpacity>
    )
  }
}


export default MessageText
