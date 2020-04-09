import React, {PureComponent} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {withTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import Svg from '../../lib/svg';
import {getDate, isMetaBubble} from '../../utils/message';
import {Colors} from '../../theme';

class Meta extends PureComponent {
  static propTypes = {
    chatId: PropTypes.number.isRequired,
    messageId: PropTypes.number.isRequired,
    views: PropTypes.number,
    date: PropTypes.number.isRequired,
    editDate: PropTypes.number,
    onDateClick: PropTypes.func,
    hidden: PropTypes.bool,
  };

  static defaultProTypes = {
    hidden: false,
  };

  render() {
    const {
      chatId,
      hidden,
      messageId,
      date,
      editDate,
      onDateClick,
      t,
      views,
    } = this.props;

    const message = this.props;
    const {is_outgoing} = message;

    const dateStr = getDate(date);
    const showMetaBubbleMessage = isMetaBubble(chatId, messageId);
    const metaTextStyle = {
      fontSize: 12,
      lineHeight: 14,
      color: showMetaBubbleMessage ? Colors.white : Colors.gray,
    };

    return (
      <View
        style={[
          hidden ? styles.metaHidden : styles.dateContainer,
          {
            backgroundColor: showMetaBubbleMessage
              ? Colors.blackCover
              : 'transparent',
          },
        ]}>
        {views > 0 && (
          <>
            <Svg
              icon="eye-fill"
              size="16"
              fill={showMetaBubbleMessage ? Colors.white : Colors.gray}
              style={{marginHorizontal: 3}}
            />
            <Text style={metaTextStyle}>
              {views}
              &nbsp; &nbsp;
            </Text>
          </>
        )}
        {editDate > 0 && <Text>{t('EditedMessage')}&nbsp;</Text>}
        <Text style={metaTextStyle}>{dateStr}&nbsp;</Text>
        {/*{*/}
        {/*  is_outgoing && <Svg icon="done_all" size="16" style={{marginHorizontal: 3}} />*/}
        {/*}*/}
        {/*{is_outgoing && <Status chatId={chatId} messageId={messageId} />}*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dateContainer: {
    position: 'absolute',
    right: 4,
    bottom: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    borderRadius: 8,
  },
  metaHidden: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    opacity: 0,
  },
});

export default withTranslation()(Meta);
