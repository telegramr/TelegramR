import React, { Component } from 'react';
import MessageText from './MessageText'
import MessageSticker from './MessageSticker'
import MessageImage from './MessageImage'
import { H4 } from "../TextTool";

interface Props {
  type: string;
  content: object | string | string[]
}

interface State {
  type: string;
}

class Message extends Component<Props, State> {
  // static propTypes = {
  //   type: PropTypes.string,
  //   content: PropTypes.oneOfType([
  //     PropTypes.object,
  //     PropTypes.string,
  //     PropTypes.array,
  //   ]),
  // }

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
