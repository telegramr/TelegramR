import React, {PureComponent} from 'react';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';
import {PropsStyle} from '../../constants/Types';
import {Base} from '../../theme';

const HamburgerArrowData = require('../../assets/animations/HamburgerArrow-w400-h300');

export default class HamburgerArrowIcon extends PureComponent {
  static propTypes = {
    autoPlay: PropTypes.bool,
    shouldPlay: PropTypes.bool,
    style: PropsStyle,
    speed: PropTypes.number,
    play: PropTypes.array,
  };

  static defaultProps = {
    autoPlay: false,
    shouldPlay: false,
    style: {
      color: '#ffffff',
    },
    play: [],
    speed: 1,
  };

  componentDidMount() {
    const { play, shouldPlay } = this.props;
    if (shouldPlay && play.length !== 0) {
      this.animation.play(play[0], play[1]);
    }
  }

  render() {
    const {autoPlay, style, speed} = this.props;
    return (
      <LottieView
        ref={animation => {
          this.animation = animation;
        }}
        speed={speed}
        source={HamburgerArrowData}
        style={{
          width: style.width,
          ...Base.flexCenter,
        }}
        autoSize
        colorFilters={[
          {
            keypath: 'A1',
            color: style.color,
          },
          {
            keypath: 'A2',
            color: style.color,
          },
          {
            keypath: 'A3',
            color: style.color,
          },
        ]}
        autoPlay={autoPlay}
        loop={false}
      />
    );
  }
}
