import React, {Component} from 'react';
import {Image, View, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {getUserLetters} from '../../utils/user';
import {getSrc} from '../../utils/file';
import UserStore from '../../store/userStore';
import {Colors} from '../../theme';
import {PropsStyle} from '../../constants/Types';

export default class UserTile extends Component {
  static propTypes = {
    size: PropTypes.number,
    radius: PropTypes.number,
    mr: PropTypes.number,
    userId: PropTypes.number.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    onSelect: PropTypes.func,
    small: PropTypes.bool,
    style: PropsStyle,
  };

  static defaultProps = {
    radius: 40,
    mr: 0,
    style: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      user: UserStore.get(this.props.userId),
      loaded: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.userId !== this.props.userId) {
      return true;
    }

    if (nextState.loaded !== this.state.loaded) {
      return true;
    }

    return false;
  }

  render() {
    const {userId, onSelect, small, radius, style} = this.props;
    const {loaded} = this.state;

    const user = UserStore.get(userId);
    const tileColor = Math.abs(userId) % 8;
    const styleR = {
      alignSelf: 'flex-end',
      height: radius,
      width: radius,
      borderRadius: radius / 2,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    };
    if (!user) {
      return (
        <View style={[styleR, {backgroundColor: Colors.UserColors[tileColor]}]}>
          <Text style={styles.tileText}>{userId}</Text>
        </View>
      );
    }
    const {first_name, last_name} = user;
    const letters = getUserLetters(userId, first_name, last_name);
    const src = getSrc(
      user && user.profile_photo ? user.profile_photo.small : null,
    );
    const tileLoaded = src && loaded;

    // console.log('src', src, 'tileLoaded', tileLoaded, 'letters', letters);
    return (
      <View
        style={[
          styleR,
          style,
          {backgroundColor: Colors.UserColors[tileColor]},
        ]}>
        {!tileLoaded && (
          <View className="tile-photo">
            <Text style={styles.tileText}>{letters}</Text>
          </View>
        )}
        {src && (
          <Image className="tile-photo" source={{uri: src}} style={styleR} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tileText: {
    fontSize: 18,
    color: Colors.white,
  },
});
