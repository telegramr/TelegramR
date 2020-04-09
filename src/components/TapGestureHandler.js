// @flow
import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import type {PressEvent} from 'react-native/Libraries/Types/CoreEventTypes';

type Props = {
  children?: any,
  onSingleTap: (event: PressEvent) => void,
  onDoubleTap: (event: PressEvent) => void,
};

const MAX_DOUBLE_TOUCH_DISTANCE = 10;
const MAX_DOUBLE_TOUCH_DELAY_TIME = 80

class TapGestureHandler extends React.Component<Props> {
  _timer: TimeoutID;
  _previousPressEvent: ?PressEvent;

  onPress = (event: PressEvent) => {
    if (this._previousPressEvent) {
      this.onReceiveSecondEvent(event);
    } else {
      this.onReceiveFirstEvent(event);
    }
  };

  onReceiveFirstEvent = (event: PressEvent) => {
    this._timer = setTimeout(() => {
      this.props.onSingleTap(event);
      this._previousPressEvent = null;
    }, MAX_DOUBLE_TOUCH_DELAY_TIME);
    this._previousPressEvent = event;
  };

  onReceiveSecondEvent = (event: PressEvent) => {
    if (this._isDoubleTap(event)) {
      this.props.onDoubleTap(event);
    } else {
      this.props.onSingleTap(event);
    }

    this._timer && clearTimeout(this._timer);
    this._previousPressEvent = null;
  };

  _distanceBetweenTouches = (
    touch1: PressEvent,
    touch2: PressEvent,
  ): number => {
    const disX = touch1.nativeEvent.locationX - touch2.nativeEvent.locationX;
    const disY = touch1.nativeEvent.locationY - touch2.nativeEvent.locationY;
    return Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2));
  };

  _isDoubleTap = (currentEvent: PressEvent) => {
    if (!this._previousPressEvent) {
      return false;
    }

    const distance = this._distanceBetweenTouches(
      currentEvent,
      this._previousPressEvent,
    );

    // $FlowFixMe
    const {nativeEvent} = this._previousPressEvent;
    const delay = currentEvent.nativeEvent.timestamp - nativeEvent.timestamp;
    return (
      distance < MAX_DOUBLE_TOUCH_DISTANCE &&
      delay < MAX_DOUBLE_TOUCH_DELAY_TIME
    );
  };

  componentWillUnmount = () => {
    this._timer && clearTimeout(this._timer);
  };

  render() {
    return (
      <TouchableOpacity activeOpacity={1} onPress={this.onPress}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

export default TapGestureHandler;
