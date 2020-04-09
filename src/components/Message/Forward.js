import React, {PureComponent} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {withTranslation} from 'react-i18next';
import {getForwardTitle, isForwardOriginHidden} from '../../utils/message';
import {openUser, openChat} from '../../actions/clientAction';
import {Base} from '../../theme';

class Forward extends PureComponent {
  static propTypes = {
    forwardInfo: PropTypes.object.isRequired,
  };

  state = {
    arrowRef: null,
  };

  handleArrowRef = node => {
    this.setState({
      arrowRef: node,
    });
  };

  openForward = event => {
    event.stopPropagation();

    const {forwardInfo} = this.props;
    if (!forwardInfo) {
      return null;
    }

    const {origin} = forwardInfo;

    switch (origin['@type']) {
      case 'messageForwardOriginUser': {
        const {sender_user_id} = origin;

        openUser(sender_user_id, true);
        break;
      }
      case 'messageForwardOriginHiddenUser': {
        break;
      }
      case 'messageForwardOriginChannel': {
        const {chat_id, message_id} = origin;

        openChat(chat_id, message_id);
        break;
      }
    }
  };

  render() {
    const {t, classes, forwardInfo} = this.props;
    const {arrowRef} = this.state;

    const title = getForwardTitle(forwardInfo, t);
    const tooltip = isForwardOriginHidden(forwardInfo) ? (
      <>
        <View ref={this.handleArrowRef} />
      </>
    ) : null;
    return (
      <View>
        <Text style={Base.accentMainText}>{`${t('ForwardedMessage')}\n${t(
          'From',
        )} `}</Text>
        {tooltip}
        <Text
          numberOfLines={1}
          onPress={this.openForward}
          style={[Base.accentMainText, {}]}>
          {title}
        </Text>
      </View>
    );
  }
}

const enhance = compose(withTranslation());

export default enhance(Forward);
