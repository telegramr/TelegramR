import React, {PureComponent} from 'react';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';
import {PropsStyle} from '../../constants/Types';

const ChatsCheckedDoneData = require('../../assets/animations/chats_checked_done.json');

export default class ChatsCheckedDoneIcon extends PureComponent {
  static propTypes = {
    autoPlay: PropTypes.bool,
    style: PropsStyle,
  };

  static defaultProps = {
    autoPlay: false,
    style: {},
  };

  render() {
    const {autoPlay, style} = this.props;
    return (
      <LottieView
        ref={animation => {
          this.animation = animation;
        }}
        style={style}
        source={ChatsCheckedDoneData}
        autoPlay={autoPlay}
        speed={1.5}
        loop={false}
      />
    );
  }
}
