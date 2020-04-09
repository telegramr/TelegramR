import React, {Component} from 'react';
import {Animated, StyleSheet, Image, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';
export default class SwiperRow extends Component {
  static propTypes = {
    chatId: PropTypes.number.isRequired,
    onSwipeableRightWillOpen: PropTypes.func.isRequired,
    canSwipe: PropTypes.bool,
  };

  renderRightAction = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      this.close();
      alert(text);
    };
    return (
      <Animated.View
        style={{
          paddingHorizontal: 15,
          backgroundColor: color,
          transform: [{translateX: trans}],
        }}>
        <RectButton style={styles.rightAction} onPress={pressHandler}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  renderRightActions = progress => (
    <View style={{flexDirection: 'row'}}>
      {this.renderRightAction('Pin', '#C8C7CD', 192, progress)}
      {this.renderRightAction('Mark as read', '#ffab00', 128, progress)}
      {this.renderRightAction('Archive', '#E56555', 64, progress)}
    </View>
  );

  updateRef = ref => {
    this._swipeableRow = ref;
  };

  close = () => {
    this._swipeableRow.close();
  };

  render() {
    const {children, chatId, canSwipe, onSwipeableRightWillOpen} = this.props;
    if (canSwipe) {
      return (
        <Swipeable
          ref={this.updateRef}
          friction={2}
          leftThreshold={30}
          rightThreshold={40}
          onSwipeableRightWillOpen={() => {
            onSwipeableRightWillOpen(chatId);
          }}
          renderRightActions={this.renderRightActions}>
          {children}
        </Swipeable>
      );
    }
    return <>{children}</>;
  }
}

const styles = StyleSheet.create({
  rightAction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 15,
    backgroundColor: 'transparent',
    paddingTop: 4,
  },
  archiveContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 35,
  },
  archiveImg: {
    width: 26,
    height: 26,
  },
});
