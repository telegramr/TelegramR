import React, { Component } from "react";
import { MessageContentTypes } from "../../types";
import MessageText from "./MessageText";
import MessageSticker from "./MessageSticker";
import MessageImage from "./MessageImage";
import MessageFile from "./MessageFile";
import MessageVoice from "./MessageVoice";
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
    super(props);
  }

  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean {
    return false;
  }

  render() {
    const { type, content, out } = this.props;
    switch (type) {
      case "text":
        return <MessageText text={ content.text } out={ out }/>;
      case "sticker":
        return <MessageSticker sticker={ content.sticker } out={ out }/>;
      case "img":
        return <MessageImage img={ content.img } out={ out }/>;
      case "file":
        return <MessageFile file={ content.file } out={ out }/>;
      case "voice":
        return <MessageVoice voice={ content.voice } out={ out }/>;
      default:
        return <H4 title={ "不支持此类消息" }/>;
    }
  }
}


export default Message;
