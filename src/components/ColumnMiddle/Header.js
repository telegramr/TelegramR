import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import NavigationService from '../../NavigationService'
import {withTranslation} from 'react-i18next';
import {compose} from 'recompose';
// import MainMenuButton from './MainMenuButton';
import HeaderChat from '../Tile/HeaderChat';
import HeaderCommand from './HeaderCommand';
import HeaderProgress from './HeaderProgress';
import PinnedMessage from './PinnedMessage';
import {
  getChatShortTitle,
  getChatSubtitle,
  getChatTitle,
  isAccentChatSubtitle,
  isPrivateChat,
} from '../../utils/chat';
import {clearSelection, searchChat} from '../../actions/clientAction';
import ChatStore from '../../store/chatStore';
import UserStore from '../../store/userStore';
import BasicGroupStore from '../../store/basicGroupStore';
import SuperGroupStore from '../../store/superGroupStore';
import MessageStore from '../../store/messageStore';
import AppStore from '../../store/applicationStore';
import DBController from '../../controllers/dbController';
import { Base, Colors } from '../../theme';
import { Btn, TouchableCross } from '../index';
import Svg from '../../lib/svg';
import ChatTile from '../Tile/ChatTile';
import ChatTitle from '../Tile/ChatTitle';
import PropTypes from 'prop-types';


class Header extends Component {
  static propTypes = {
    chatId: PropTypes.number.isRequired,
    isSelectedMode: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    isSelectedMode: false
  };

  constructor(props) {
    super(props);

    this.state = {
      authorizationState: AppStore.getAuthorizationState(),
      connectionState: AppStore.getConnectionState(),
      openDeleteDialog: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState !== this.state) {
      return true;
    }

    if (nextProps.theme !== this.props.theme) {
      return true;
    }

    if (nextProps.t !== this.props.t) {
      return true;
    }

    return false;
  }

  componentDidMount() {
    AppStore.on('clientUpdateDeleteMessages', this.onClientUpdateDeleteMessages);
    AppStore.on('updateConnectionState', this.onUpdateConnectionState);
    AppStore.on('updateAuthorizationState', this.onUpdateAuthorizationState);
    AppStore.on('clientUpdateChatId', this.onClientUpdateChatId);

    MessageStore.on('clientUpdateMessageSelected', this.onClientUpdateMessageSelected);
    MessageStore.on('clientUpdateClearSelection', this.onClientUpdateMessageSelected);
  }

  componentWillUnmount() {
    AppStore.off('clientUpdateDeleteMessages', this.onClientUpdateDeleteMessages);
    AppStore.off('updateConnectionState', this.onUpdateConnectionState);
    AppStore.off('updateAuthorizationState', this.onUpdateAuthorizationState);
    AppStore.off('clientUpdateChatId', this.onClientUpdateChatId);

    MessageStore.off('clientUpdateMessageSelected', this.onClientUpdateMessageSelected);
    MessageStore.off('clientUpdateClearSelection', this.onClientUpdateMessageSelected);
  }

  onClientUpdateDeleteMessages = update => {
    const {chatId, messageIds} = update;

    let canBeDeletedForAllUsers = true;
    for (let messageId of messageIds) {
      const message = MessageStore.get(chatId, messageId);
      if (!message) {
        canBeDeletedForAllUsers = false;
        break;
      }
      if (!message.can_be_deleted_for_all_users) {
        canBeDeletedForAllUsers = false;
        break;
      }
    }

    this.setState({
      openDeleteDialog: true,
      chatId,
      messageIds,
      canBeDeletedForAllUsers: canBeDeletedForAllUsers,
      revoke: canBeDeletedForAllUsers,
    });
  };

  handleRevokeChange = () => {
    this.setState({revoke: !this.state.revoke});
  };

  handleCloseDelete = () => {
    this.setState({openDeleteDialog: false});
  };

  handleDeleteContinue = () => {
    const {revoke, chatId, messageIds} = this.state;

    clearSelection();
    this.handleCloseDelete();

    DBController.send({
      '@type': 'deleteMessages',
      chat_id: chatId,
      message_ids: messageIds,
      revoke: revoke,
    });
  };

  onClientUpdateMessageSelected = update => {
    this.setState({selectionCount: MessageStore.selectedItems.size});
  };

  onClientUpdateChatId = update => {
    this.forceUpdate();
  };

  onUpdateConnectionState = update => {
    this.setState({connectionState: update.state});
  };

  onUpdateAuthorizationState = update => {
    this.setState({authorizationState: update.authorization_state});
  };

  openChatDetails = () => {
    const chatId = AppStore.getChatId();
    const chat = ChatStore.get(chatId);
    if (!chat) {
      return;
    }

    AppStore.changeChatDetailsVisibility(true);
  };

  handleSearchChat = () => {
    const chatId = AppStore.getChatId();
    const chat = ChatStore.get(chatId);
    if (!chat) {
      return;
    }

    searchChat(chatId);
  };

  localize = str => {
    const {t} = this.props;

    return t(str)
      .replace('...', '')
      .replace('…', '');
  };

  render() {
    const {t, chatId, isSelectedMode} = this.props;
    const {
      authorizationState,
      connectionState,
      selectionCount,
      openDeleteDialog,
      canBeDeletedForAllUsers,
      revoke,
      messageIds,
    } = this.state;

    const count = messageIds ? messageIds.length : 0;

    let control = null;
    if (selectionCount) {
      control = <HeaderCommand count={selectionCount} />;
    }

    // const chatId = AppStore.getChatId();
    const chat = ChatStore.get(chatId);
    const isAccentSubtitle = isAccentChatSubtitle(chatId);
    let title = getChatTitle(chatId, true, t);
    let subtitle = getChatSubtitle(chatId, true);
    let showProgressAnimation = false;

    if (connectionState) {
      switch (connectionState['@type']) {
        case 'connectionStateConnecting':
          subtitle = this.localize('Connecting');
          showProgressAnimation = true;
          break;
        case 'connectionStateConnectingToProxy':
          subtitle = this.localize('Connecting to proxy');
          showProgressAnimation = true;
          break;
        case 'connectionStateReady':
          break;
        case 'connectionStateUpdating':
          subtitle = this.localize('Updating');
          showProgressAnimation = true;
          break;
        case 'connectionStateWaitingForNetwork':
          subtitle = this.localize('Waiting for network');
          showProgressAnimation = true;
          break;
      }
    } else if (authorizationState) {
      switch (authorizationState['@type']) {
        case 'authorizationStateClosed':
          break;
        case ' authorizationStateClosing':
          break;
        case 'authorizationStateLoggingOut':
          subtitle = this.localize('Logging out');
          showProgressAnimation = true;
          break;
        case 'authorizationStateReady':
          break;
        case 'authorizationStateWaitCode':
          break;
        case 'authorizationStateWaitEncryptionKey':
          subtitle = this.localize('Loading');
          showProgressAnimation = true;
          break;
        case 'authorizationStateWaitPassword':
          break;
        case 'authorizationStateWaitPhoneNumber':
          break;
        case 'authorizationStateWaitTdlibParameters':
          subtitle = this.localize('Loading');
          showProgressAnimation = true;
          break;
      }
    } else {
      subtitle = this.localize('Loading');
      showProgressAnimation = true;
    }
    control = control || (
      <View className="header-details">
        <View
          style={[
            Base.flexSB,
            Base.flexAIC,
            {
              backgroundColor: Colors.actionBarDefault,
              paddingVertical: 5,
              paddingHorizontal: 10,
              height: 48,
            },
          ]}>
          <View style={[Base.flex, Base.flexCenter, {width: 30, height: 30}]}>
            <Btn circular={true} onPress={() => NavigationService.NavigationAction('back')}>
              <Svg icon="arrow_back" size="24" />
            </Btn>
          </View>
          <TouchableCross
            onPress={() => {}}
            noActive={true}
            style={[
              Base.flexSA,
              Base.flexStart,
              Base.flexAIC,
              {flexGrow: 1, marginLeft: 20},
            ]}>
            <ChatTile chatId={chatId} style={{marginRight: 10}} showOnline />
            <View style={[Base.flexCol]}>
              <ChatTitle
                chatId={chatId}
                style={{color: Colors.chat_headerTitle}}
              />
              <Text style={{color: Colors.white}}>{subtitle}{showProgressAnimation && '...'}</Text>
            </View>
          </TouchableCross>
          <View tyle={[Base.flex, Base.flexCenter, {width: 30, height: 30}]}>
            <Btn circular={true} onPress={() => {}}>
              <Svg icon="more_vert" size="24" />
            </Btn>
          </View>
        </View>
        <PinnedMessage chatId={chatId} />
      </View>
    );

    return (
      <>
        {control}
        {/*<Dialog*/}
        {/*  transitionDuration={0}*/}
        {/*  open={openDeleteDialog}*/}
        {/*  onClose={this.handleCloseDelete}*/}
        {/*  aria-labelledby="delete-dialog-title">*/}
        {/*  <DialogTitle id="delete-dialog-title">Confirm</DialogTitle>*/}
        {/*  <DialogContent>*/}
        {/*    <DialogContentText>*/}
        {/*      {count === 1*/}
        {/*        ? 'Are you sure you want to delete 1 message?'*/}
        {/*        : `Are you sure you want to delete ${count} messages?`}*/}
        {/*    </DialogContentText>*/}
        {/*    {canBeDeletedForAllUsers && (*/}
        {/*      <FormControlLabel*/}
        {/*        control={*/}
        {/*          <Checkbox*/}
        {/*            checked={revoke}*/}
        {/*            onChange={this.handleRevokeChange}*/}
        {/*            color="primary"*/}
        {/*          />*/}
        {/*        }*/}
        {/*        label={*/}
        {/*          isPrivateChat(chatId)*/}
        {/*            ? `Delete for ${getChatShortTitle(chatId)}`*/}
        {/*            : 'Delete for all'*/}
        {/*        }*/}
        {/*      />*/}
        {/*    )}*/}
        {/*  </DialogContent>*/}
        {/*  <DialogActions>*/}
        {/*    <Button onClick={this.handleCloseDelete} color="primary">*/}
        {/*      {t('Cancel')}*/}
        {/*    </Button>*/}
        {/*    <Button onClick={this.handleDeleteContinue} color="primary">*/}
        {/*      {t('Ok')}*/}
        {/*    </Button>*/}
        {/*  </DialogActions>*/}
        {/*</Dialog>*/}
      </>
    );
  }
}

const enhance = compose(withTranslation());

export default enhance(Header);
