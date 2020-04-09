import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Keyboard,
  Animated,
  TouchableOpacity,
  BackHandler,
  Platform,
} from 'react-native';
import DBController from '../../controllers/dbController';
import ApplicationStore from '../../store/applicationStore';
import MessageStore from '../../store/messageStore';
import {Base, Colors, Sizes} from '../../theme';
import MenuDialog from '../../components/Popup/MenuDialog';
import StickerSetDialog from '../Popup/StickerSetDialog';
import {isBlank} from '../../utils/common';
import {getEntities} from '../../utils/message';
import {getChatDraftReplyToMessageId} from '../../utils/chat';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageStr: '',
      keyboardHeightNum: 217,
      showKeyBoard: false,
      currentMenu: '',
      chatId: this.props.chatId,
      replyToMessageId: getChatDraftReplyToMessageId(this.props.chatId),
      editMessageId: 0,
    };
    this.inputRef = null;
    this.keyboardHeight = new Animated.Value(0);
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
    this.keyboardDidShowSub = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  shouldComponentUpdate(nextProps, nextState): boolean {
    const {
      messageStr,
      keyboardHeightNum,
      showKeyBoard,
      currentMenu,
    } = this.state;
    if (nextState.messageStr !== messageStr) {
      return true;
    }
    if (nextState.keyboardHeightNum !== keyboardHeightNum) {
      return true;
    }
    if (nextState.showKeyBoard !== showKeyBoard) {
      return true;
    }
    if (nextState.currentMenu !== currentMenu) {
      return true;
    }
    return false;
  }

  onBackAndroid = () => {};

  keyboardDidShow = event => {
    const {currentMenu} = this.state;
    const height = event.endCoordinates.height;
    this.setState({
      currentMenu: '',
      keyboardHeightNum: height,
      showKeyBoard: true,
    });
    // this.handleCloseMessageMediaModal();
    // if (currentMenu) {
    //   this.setState({
    //     currentMenu: '',
    //   });
    // this.setKeyboardAnimated(0, 0);
    //   return;
    // }
    this.props.keyboardChange(height, true);
  };

  keyboardDidHide = () => {
    const {currentMenu} = this.state;
    const height = this.state.keyboardHeightNum;
    this.setState({
      showKeyBoard: false,
    });
    this.props.keyboardChange(height, false);
  };

  setKeyboardAnimated = (duration = 0, toValue = 0) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration,
        toValue,
      }),
    ]).start();
  };

  setMessageStr = messageStr => {
    this.setState({
      messageStr,
    });
  };

  handleSubmit = () => {
    const {messageStr} = this.state;
    if (isBlank(messageStr)) {
      return;
    }
    const {chatId, editMessageId} = this.state;
    // const element = this.newMessageRef.current;
    // if (!element) return;
    //
    // let { innerHTML } = element;
    //
    // element.innerText = null;
    // this.handleInput();
    DBController.clientUpdate({
      '@type': 'clientUpdateEditMessage',
      chatId,
      messageId: 0,
    });

    // if (!innerHTML) return;
    // if (!innerHTML.trim()) return;
    //
    // innerHTML = innerHTML.replace(/<div><br><\/div>/gi, '<br>');
    // innerHTML = innerHTML.replace(/<div>/gi, '<br>');
    // innerHTML = innerHTML.replace(/<\/div>/gi, '');

    let innerHTML = `
    <html><body>${messageStr}</body></html>`;

    const {text, entities} = getEntities(innerHTML);
    console.log('text', text, entities);
    const formattedText = {
      '@type': 'formattedText',
      text,
      entities,
    };
    const inputContent = {
      // '@type': 'inputMessageText',
      '@type': 'messageText',
      text: formattedText,
      disable_web_page_preview: false,
      clear_draft: true,
    };

    if (editMessageId) {
      const editedMessage = MessageStore.get(chatId, editMessageId);
      if (!editedMessage) {
        return;
      }

      const {content} = editedMessage;
      if (!content) {
        return;
      }

      const {text, caption} = content;
      if (text) {
        this.editMessageText(inputContent, result => {});
      } else if (caption) {
        this.editMessageCaption(formattedText, result => {});
      }
    } else {
      this.sendMessage(inputContent, false, result => {});
    }
  };

  handleSetMenuDialog = currentMenu => {
    this.setState({
      currentMenu,
    });
  };

  async editMessageCaption(caption, callback) {
    const {chatId, editMessageId} = this.state;

    if (!chatId) {
      return;
    }
    if (!editMessageId) {
      return;
    }
    if (!caption) {
      return;
    }

    const result = await DBController.send({
      '@type': 'editMessageCaption',
      chat_id: chatId,
      message_id: editMessageId,
      caption,
    });

    callback(result);
  }

  async editMessageText(content, callback) {
    const {chatId, editMessageId} = this.state;

    if (!chatId) {
      return;
    }
    if (!editMessageId) {
      return;
    }
    if (!content) {
      return;
    }

    try {
      const result = await DBController.send({
        '@type': 'editMessageText',
        chat_id: chatId,
        message_id: editMessageId,
        input_message_content: content,
      });

      callback(result);
    } finally {
    }
  }

  sendMessage = async (content, clearDraft, callback) => {
    const {chatId, replyToMessageId} = this.state;
    if (!chatId) {
      return;
    }
    if (!content) {
      return;
    }

    try {
      await ApplicationStore.invokeScheduledAction(
        `clientUpdateClearHistory chatId=${chatId}`,
      );

      const result = await DBController.send({
        '@type': 'sendMessage',
        chat_id: chatId,
        reply_to_message_id: replyToMessageId,
        input_message_content: content,
      });

      this.setState({replyToMessageId: 0}, () => {
        if (clearDraft) {
          this.saveDraft();
        }
      });
      // set staticResult
      const randomNum = Math.floor(Math.random() * 10) + 1;
      const messageId = 365325975553 + randomNum;
      const dateStr = String(Date.now()).slice(0, -3);
      const updateMessage = {
        '@type': 'updateNewMessage',
        message: {
          id: messageId,
          sender_user_id: 485055289,
          chat_id: chatId,
          is_outgoing: true,
          can_be_edited: false,
          can_be_forwarded: true,
          can_be_deleted_only_for_self: false,
          can_be_deleted_for_all_users: true,
          is_channel_post: false,
          contains_unread_mention: false,
          date: Number(dateStr),
          edit_date: 0,
          reply_to_message_id: 0,
          ttl: 0,
          ttl_expires_in: 0,
          via_bot_user_id: 0,
          author_signature: '',
          views: 0,
          media_album_id: '0',
          restriction_reason: '',
          content: content,
        },
      };
      // MessageStore.set(staticResult);
      MessageStore.onUpdate(updateMessage);
      this.setState({
        messageStr: '',
      });
      DBController.send({
        '@type': 'viewMessages',
        chat_id: chatId,
        // message_ids: [result.id],
      });

      callback(result);
    } catch (error) {
      console.log(error);
      alert('sendMessage error', JSON.stringify(error));
    }
  };

  saveDraft() {
    // const { chatId, editMessageId, replyToMessageId } = this.state;
    //
    // const element = this.newMessageRef.current;
    // if (!element) return;
    //
    // let innerHTML = null;
    // if (editMessageId) {
    //   innerHTML = this.beforeEditText ? this.beforeEditText.innerHTML : null;
    // } else {
    //   innerHTML = element.innerHTML;
    // }
    //
    // const draftMessage = this.getDraftMessage(chatId, replyToMessageId, innerHTML);
    // this.setChatDraftMessage(draftMessage);
  }

  render() {
    const {messageStr, currentMenu} = this.state;
    return (
      <>
        <View style={styles.inputBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.handleSetMenuDialog('StickerMenu')}
            style={styles.panelIconsBtn}>
            <Image
              source={require('../../static/images/input/input_sticker.png')}
              style={[
                styles.panelIcons,
                currentMenu === 'StickerMenu' ? styles.panelIconsActive : null,
              ]}
            />
          </TouchableOpacity>
          <TextInput
            ref={ref => (this.inputRef = ref)}
            style={styles.input}
            placeholder="输入消息"
            placeholderTextColor={Colors.gray}
            onChangeText={this.setMessageStr}
            value={messageStr}
            multiline={true}
          />
          {isBlank(messageStr) && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.handleSetMenuDialog('MenuDialog')}
              style={styles.panelIconsBtn}>
              <Image
                source={require('../../static/images/input/input_attach.png')}
                style={styles.panelIcons}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.handleSubmit}
            style={styles.sendBtn}>
            <Image
              source={require('../../static/images/input/ic_send.png')}
              style={[
                styles.sendIcon,
                {
                  tintColor: isBlank(messageStr)
                    ? Colors.PanelIcons3
                    : Colors.colorAccentMain,
                },
              ]}
            />
          </TouchableOpacity>
        </View>
        <StickerSetDialog
          isVisible={currentMenu === 'StickerMenu'}
          handleSetMenuDialog={this.handleSetMenuDialog}
        />
        <MenuDialog
          isVisible={currentMenu === 'MenuDialog'}
          handleSetMenuDialog={this.handleSetMenuDialog}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: 46,
  },
  panelIconsBtn: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelIcons: {
    width: 27,
    height: 27,
    tintColor: Colors.PanelIcons3,
  },
  panelIconsActive: {
    tintColor: Colors.SwitchTrackChecked,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderTopWidth: Sizes.onePixel,
    borderTopColor: Colors.borderOne,
    backgroundColor: Colors.white,
  },
  input: {
    minHeight: 48,
    maxHeight: 120,
    maxWidth: Sizes.width - 100,
    padding: 0,
    fontSize: 17,
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  sendBtn: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    width: 20,
    height: 20,
  },
});
