import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types'
import MessageText from './MessageText'
import MessageSticker from './MessageSticker'
import MessageImage from './MessageImage'
import { H4 } from "../TextTool";

class Message extends Component {
  static propTypes = {
    type: PropTypes.string,
    content: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.array,
    ]),
  }

  constructor(props) {
    super(props)
    this.state = {
      type: 'text'
    }
  }

  render() {
    const { type = 'text', content, out } = this.props
    switch (type) {
      case 'text':
        return <MessageText messageStr={ content } out={ out }/>
      case 'sticker':
        return <MessageSticker uri={ content } out={ out }/>
      case 'img':
        return <MessageImage imgArr={ content } out={ out }/>
      default:
        return <H4 title={ '不支持此类消息' }/>
    }
  }
}


export default Message
