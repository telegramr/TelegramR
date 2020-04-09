import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {
  clearSelection,
  deleteMessages,
  forwardMessages,
} from '../../actions/clientAction';
import MessageStore from '../../store/messageStore';
import {Base, Colors, Sizes} from '../../theme';
import HamburgerArrowIcon from '../animations/HamburgerArrowIcon';
import {Btn} from '../index';
import NavigationService from '../../NavigationService';
import Svg from '../../lib/svg';

const msgCopyIcon = require('../../static/images/msg/msg_copy.png');
const msgForwardIcon = require('../../static/images/msg/msg_forward.png');
const msgDeleteIcon = require('../../static/images/msg/msg_delete.png');

class HeaderCommand extends React.Component {
  static propTypes = {
    count: PropTypes.number,
  };

  handleCancel = () => {
    clearSelection();
  };

  handleDelete = () => {
    let id = 0;
    let messageIds = [];
    for (let {chatId, messageId} of MessageStore.selectedItems.values()) {
      id = chatId;
      messageIds.push(messageId);
    }

    deleteMessages(id, messageIds);
  };

  handleForward = () => {
    let id;
    const messageIds = [];
    for (let {chatId, messageId} of MessageStore.selectedItems.values()) {
      id = chatId;
      messageIds.push(messageId);
    }

    forwardMessages(id, messageIds);
  };

  render() {
    const {t, count} = this.props;

    let canBeDeleted = true;
    for (let {chatId, messageId} of MessageStore.selectedItems.values()) {
      const message = MessageStore.get(chatId, messageId);
      if (!message) {
        canBeDeleted = false;
        break;
      }
      if (
        !message.can_be_deleted_only_for_self &&
        !message.can_be_deleted_for_all_users
      ) {
        canBeDeleted = false;
        break;
      }
    }

    let canBeForwarded = true;
    for (let {chatId, messageId} of MessageStore.selectedItems.values()) {
      const message = MessageStore.get(chatId, messageId);
      if (!message) {
        canBeForwarded = false;
        break;
      }
      if (!message.can_be_forwarded) {
        canBeForwarded = false;
        break;
      }
    }

    return (
      <View
        style={[
          Base.flexSB,
          Base.flexAIC,
          {
            backgroundColor: Colors.white,
            paddingHorizontal: 15,
            paddingVertical: 8,
            height: 48,
            borderBottomWidth: Sizes.onePixel,
            borderBottomColor: Colors.borderOne,
            shadowColor: 'rgba(58,55,55,0.1)',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0,
            elevation: 2,
          },
        ]}>
        <View style={[Base.flexCenter, {height: 30}]}>
          <Btn
            style={{marginRight: 20}}
            circular={true}
            onPress={this.handleCancel}>
            <Svg icon="close" size="20" fill={Colors.gray} />
          </Btn>
          <Text style={{fontSize: 18, fontWeight: '700', color: Colors.gray}}>
            {count}
          </Text>
        </View>
        <View style={[Base.flexCenter]}>
          <Btn
            style={styles.toolbarIcon}
            size={30}
            circular={true}
            onPress={() => {}}>
            <Image source={msgCopyIcon} style={styles.menuBarIcon} />
          </Btn>
          <Btn style={styles.toolbarIcon} circular={true} onPress={() => {}}>
            <Image source={msgForwardIcon} style={styles.menuBarIcon} />
          </Btn>
          <Btn style={{marginLeft: 10}} circular={true} onPress={() => {}}>
            <Image source={msgDeleteIcon} style={styles.menuBarIcon} />
          </Btn>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuBarIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.gray,
  },
  floatingButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    position: 'absolute',
    right: 15,
    bottom: 15,
    ...Colors.FloatingButtonShadow,
    backgroundColor: Colors.SwitchTrackChecked,
    ...Base.flexCenter,
  },
  toolbarIcon: {
    marginHorizontal: 10,
  },
});

export default withTranslation()(HeaderCommand);
