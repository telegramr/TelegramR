import React, { Component } from 'react';
import {MessageContentTypes} from "../../types";
import MessageText from './MessageText'
import MessageSticker from './MessageSticker'
import MessageImage from './MessageImage'
import { H4 } from "../TextTool";

interface Props {
  type: string;
  content: MessageContentTypes;
  out: boolean;
}

interface State {
  type: string;
}

class Message extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      type: 'text'
    }
  }

  render() {
    const { type = 'text', content, out } = this.props
    switch (type) {
      case 'text':
        return <MessageText text={ content.text } out={ out }/>
      case 'sticker':
        return <MessageSticker sticker={ content.sticker } out={ out }/>
      case 'img':
        return <MessageImage img={ content.img } out={ out }/>
      default:
        return <H4 title={ '不支持此类消息' }/>
    }
  }
}


export default Message
