import React, { Component } from 'react';
import {
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import { H4 } from "../TextTool";
import S from "../../public/style";
import { color, screen } from "../../utils";

class MessageText extends Component {
  static propTypes = {
    messageStr: PropTypes.string,
  }

  constructor(props) {
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
