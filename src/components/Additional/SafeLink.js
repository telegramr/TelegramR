import React, {PureComponent} from 'react';
import {View, Text, Alert} from 'react-native';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {getDecodedUrl, getHref, isUrlSafe} from '../../Utils/Url';
import MessageStore from '../../Stores/MessageStore';
import TdLibController from '../../Controllers/TdLibController';
import DBControntroller from '../../controllers/dbController'
import './SafeLink.css';
import {openChat} from '../../Actions/Client';
import {openLink} from '../../utils/common';

class SafeLink extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    displayText: PropTypes.string,
    mail: PropTypes.bool,
    onClick: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(props, state) {
    const {displayText, mail, url} = props;

    if (state.prevUrl !== url || state.prevDisplayText !== displayText) {
      return {
        prevUrl: url,
        prevDisplayText: displayText,
        safe: isUrlSafe(displayText, url),
        decodedUrl: getDecodedUrl(url, mail),
        href: getHref(url, mail),
        confirm: false,
      };
    }

    return null;
  }

  handleClose = () => {
    this.setState({confirm: false});
  };

  handleDone = event => {
    this.handleClose();

    const {url, onClick} = this.props;
    if (!url) {
      return;
    }
    openLink(url)
  };

  isTelegramLink(url) {
    if (!url) {
      return false;
    }

    const lowerCaseUrl = url
      .toLowerCase()
      .replace('https://', '')
      .replace('http://', '');

    return lowerCaseUrl.startsWith('t.me') || lowerCaseUrl.startsWith('tg://');
  }

  handleSafeClick = async event => {
    event.stopPropagation();

    const {onClick, url: href} = this.props;

    if (this.isTelegramLink(href)) {
      event.preventDefault();
      try {
        const messageLinkInfo = await TdLibController.send({
          '@type': 'getMessageLinkInfo',
          url: href,
        });

        MessageStore.setItems([messageLinkInfo.message]);

        const {chat_id, message} = messageLinkInfo;
        if (chat_id) {
          openChat(chat_id, message ? message.id : null);
          return;
        }
      } catch (error) {
        console.log('[safeLink] messageLinkInfo error', error);
      }

      if (onClick) {
        onClick(event);
      }
    }

    if (onClick) {
      event.preventDefault();
      onClick(event);
    }
  };

  render() {
    const {className, children, t, url} = this.props;
    const {decodedUrl, href, safe} = this.state;

    if (!url) {
      return null;
    }
    if (!decodedUrl) {
      return null;
    }

    return (
      <>
        {safe ? (
          <Text
            className={className}
            href={href}
            title={decodedUrl}
            target="_blank"
            rel="noopener noreferrer"
            onPress={this.handleSafeClick}>
            {children || url}
          </Text>
        ) : (
          <>
            <Text
              className={className}
              title={decodedUrl}
              onPress={this.handleDone}>
              {children || url}
            </Text>
          </>
        )}
      </>
    );
  }
}

export default withTranslation()(SafeLink);
