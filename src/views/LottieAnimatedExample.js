import React, {Component} from 'react';
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  Slider,
  Switch,
  Text,
  Picker,
  Platform,
  TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';

const AnimatedSlider = Animated.createAnimatedComponent(Slider);

const makeExample = (name, getJson, width) => ({name, getJson, width});
const EXAMPLES = [
  makeExample('chats_done', () =>
    require('../assets/animations/chats_done.json'),
  ),
  makeExample('chats_checked_done', () =>
    require('../assets/animations/chats_checked_done.json'),
  ),
  makeExample('like', () => require('../assets/animations/like.json')),
  makeExample('chats_archive', () =>
    require('../assets/animations/chats_archive.json'),
  ),
  makeExample('chats_archiveavatar', () =>
    require('../assets/animations/chats_archiveavatar.json'),
  ),
  makeExample('chats_archived', () =>
    require('../assets/animations/chats_archived.json'),
  ),
  makeExample('chats_infotip', () =>
    require('../assets/animations/chats_infotip.json'),
  ),
  makeExample('chats_swipearchive', () =>
    require('../assets/animations/chats_swipearchive.json'),
  ),
  makeExample('chats_unhide', () =>
    require('../assets/animations/chats_unhide.json'),
  ),
  makeExample('contact_check', () =>
    require('../assets/animations/contact_check.json'),
  ),
  makeExample('mapstyle_night', () =>
    require('../assets/animations/mapstyle_night.json'),
  ),
  makeExample('qr_login', () => require('../assets/animations/qr_login.json')),
  makeExample('wallet_allset', () =>
    require('../assets/animations/wallet_allset.json'),
  ),
  makeExample('wallet_congrats', () =>
    require('../assets/animations/wallet_congrats.json'),
  ),
  makeExample('wallet_crystal', () =>
    require('../assets/animations/wallet_crystal.json'),
  ),
  makeExample('wallet_egg', () =>
    require('../assets/animations/wallet_egg.json'),
  ),
  makeExample('wallet_gem', () =>
    require('../assets/animations/wallet_gem.json'),
  ),
  makeExample('wallet_lock', () =>
    require('../assets/animations/wallet_lock.json'),
  ),
  makeExample('wallet_perfect', () =>
    require('../assets/animations/wallet_perfect.json'),
  ),
  makeExample('wallet_science', () =>
    require('../assets/animations/wallet_science.json'),
  ),
  makeExample('wallet_sync', () =>
    require('../assets/animations/wallet_sync.json'),
  ),
  makeExample('wallet_toobad', () =>
    require('../assets/animations/wallet_toobad.json'),
  ),
  makeExample('Hamburger Arrow', () =>
    require('../assets/animations/HamburgerArrow.json'),
  ),
  makeExample(
    'Hamburger Arrow (200 px)',
    () => require('../assets/animations/HamburgerArrow.json'),
    200,
  ),
  makeExample('1592756632805185992', () =>
    require('../assets/stickers/1592756632805185992'),
  ),
  makeExample('1592756632805185993', () =>
    require('../assets/stickers/1592756632805185993'),
  ),
  makeExample('1592756632805185994', () =>
    require('../assets/stickers/1592756632805185994'),
  ),
  makeExample('1592756632805185995', () =>
    require('../assets/stickers/1592756632805185995'),
  ),
  makeExample('1592756632805185996', () =>
    require('../assets/stickers/1592756632805185996'),
  ),
  makeExample('1592756632805185997', () =>
    require('../assets/stickers/1592756632805185997'),
  ),
  makeExample('1592756632805185998', () =>
    require('../assets/stickers/1592756632805185998'),
  ),
  makeExample('1592756632805185999', () =>
    require('../assets/stickers/1592756632805185999'),
  ),
  makeExample('2480667625772810659', () =>
    require('../assets/stickers/2480667625772810659'),
  ),
  makeExample('457590613194309869', () =>
    require('../assets/stickers/457590613194309869'),
  ),
  makeExample('457590613194309870', () =>
    require('../assets/stickers/457590613194309870'),
  ),
  makeExample('457590613194309876', () =>
    require('../assets/stickers/457590613194309876'),
  ),
  makeExample('457590613194309877', () =>
    require('../assets/stickers/457590613194309877'),
  ),
  makeExample('457590613194309878', () =>
    require('../assets/stickers/457590613194309878'),
  ),
  makeExample('457590613194309879', () =>
    require('../assets/stickers/457590613194309879'),
  ),
  makeExample('457590613194309881', () =>
    require('../assets/stickers/457590613194309881'),
  ),
  makeExample('457590613194309882', () =>
    require('../assets/stickers/457590613194309882'),
  ),
  makeExample('457590613194309883', () =>
    require('../assets/stickers/457590613194309883'),
  ),
  makeExample('457590613194309884', () =>
    require('../assets/stickers/457590613194309884'),
  ),
  makeExample('457590613194309885', () =>
    require('../assets/stickers/457590613194309885'),
  ),
  makeExample('457590613194309886', () =>
    require('../assets/stickers/457590613194309886'),
  ),
  makeExample('457590613194309887', () =>
    require('../assets/stickers/457590613194309887'),
  ),
  makeExample('457590613194309888', () =>
    require('../assets/stickers/457590613194309888'),
  ),
  makeExample('457590613194309889', () =>
    require('../assets/stickers/457590613194309889'),
  ),
  makeExample('457590613194309890', () =>
    require('../assets/stickers/457590613194309890'),
  ),
  makeExample('457590613194309891', () =>
    require('../assets/stickers/457590613194309891'),
  ),
  makeExample('457590613194309892', () =>
    require('../assets/stickers/457590613194309892'),
  ),
  makeExample('457590613194309893', () =>
    require('../assets/stickers/457590613194309893'),
  ),
  makeExample('457590613194309894', () =>
    require('../assets/stickers/457590613194309894'),
  ),
  makeExample('457590613194309895', () =>
    require('../assets/stickers/457590613194309895'),
  ),
  makeExample('457590613194309896', () =>
    require('../assets/stickers/457590613194309896'),
  ),
  makeExample('457590613194309897', () =>
    require('../assets/stickers/457590613194309897'),
  ),
  makeExample('457590613194309898', () =>
    require('../assets/stickers/457590613194309898'),
  ),
  makeExample('457590613194309899', () =>
    require('../assets/stickers/457590613194309899'),
  ),
  makeExample('457590613194309900', () =>
    require('../assets/stickers/457590613194309900'),
  ),
  makeExample('457590613194309901', () =>
    require('../assets/stickers/457590613194309901'),
  ),
  makeExample('457590613194309902', () =>
    require('../assets/stickers/457590613194309902'),
  ),
  makeExample('457590613194309883', () =>
    require('../assets/stickers/457590613194309883'),
  ),
  makeExample('457590613194309903', () =>
    require('../assets/stickers/457590613194309903'),
  ),
  makeExample('457590613194309904', () =>
    require('../assets/stickers/457590613194309904'),
  ),
  makeExample('457590613194309905', () =>
    require('../assets/stickers/457590613194309905'),
  ),
  makeExample('457590613194309906', () =>
    require('../assets/stickers/457590613194309906'),
  ),
  makeExample('457590613194309907', () =>
    require('../assets/stickers/457590613194309907'),
  ),
  makeExample('457590613194309908', () =>
    require('../assets/stickers/457590613194309908'),
  ),
  makeExample('457590613194309909', () =>
    require('../assets/stickers/457590613194309909'),
  ),
  makeExample('457590613194309911', () =>
    require('../assets/stickers/457590613194309911'),
  ),
  makeExample('457590613194309912', () =>
    require('../assets/stickers/457590613194309912'),
  ),
  makeExample('457590613194309925', () =>
    require('../assets/stickers/457590613194309925'),
  ),
  makeExample('457590613194309954', () =>
    require('../assets/stickers/457590613194309954'),
  ),
  makeExample('457590613194309955', () =>
    require('../assets/stickers/457590613194309955'),
  ),
];

class ExamplePicker extends Component {
  static propTypes = {
    example: PropTypes.any,
    onChange: PropTypes.func,
    examples: PropTypes.any,
  };

  render() {
    return (
      <Picker
        selectedValue={this.props.example}
        onValueChange={this.props.onChange}
        style={{
          marginBottom: Platform.select({
            ios: -30,
            android: 0,
          }),
        }}>
        {this.props.examples.map(ex => (
          <Picker.Item key={ex.name} label={ex.name} value={ex} />
        ))}
      </Picker>
    );
  }
}

export default class LottieAnimatedExampleScreen extends Component {
  state = {
    example: EXAMPLES[0],
    duration: 3000,
    isPlaying: true,
    isInverse: false,
    loop: true,
  };

  manageAnimation = shouldPlay => {
    if (!this.state.progress) {
      if (shouldPlay) {
        this.anim.play();
      } else {
        this.anim.reset();
      }
    } else {
      this.state.progress.setValue(0);

      if (shouldPlay) {
        Animated.timing(this.state.progress, {
          toValue: 1,
          duration: this.state.duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => {
          this.setState({isPlaying: false});
        });
      }
    }

    this.setState({isPlaying: shouldPlay});
  };

  onPlayPress = () => this.manageAnimation(!this.state.isPlaying);
  stopAnimation = () => this.manageAnimation(false);

  onInversePress = () =>
    this.setState(state => ({isInverse: !state.isInverse}));
  onProgressChange = progress => this.state.progress.setValue(progress);
  onDurationChange = duration => this.setState({duration});

  setAnim = anim => {
    this.anim = anim;
  };

  render() {
    const {
      duration,
      isPlaying,
      isInverse,
      progress,
      loop,
      example,
    } = this.state;
    return (
      <View style={{flex: 1}}>
        <ExamplePicker
          example={example}
          examples={EXAMPLES}
          onChange={(e, index) => {
            this.stopAnimation();
            this.setState({example: EXAMPLES[index]});
          }}
        />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#991010',
          }}>
          <LottieView
            ref={this.setAnim}
            autoPlay={!progress}
            style={[
              example.width && {width: example.width},
              isInverse && styles.lottieViewInvse,
            ]}
            source={example.getJson()}
            progress={progress}
            loop={loop}
            enableMergePathsAndroidForKitKatAndAbove
          />
        </View>
        <View style={{paddingBottom: 20, paddingHorizontal: 10}}>
          <View style={styles.controlsRow}>
            <TouchableOpacity
              onPress={() => {
                this.stopAnimation();
                this.setState(state => ({loop: !state.loop}));
              }}
              disabled={!!progress}>
              <Text>loopIcon</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.playButton}
              onPress={this.onPlayPress}>
              <Text>{isPlaying ? 'pauseIcon' : 'playIcon'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onInversePress}>
              <Text>inverseIcon</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}>
            <Text>Use Imperative API:</Text>
            <View />
            <Switch
              onValueChange={i => {
                this.stopAnimation();
                this.setState(() => ({
                  progress: !i ? new Animated.Value(0) : undefined,
                }));
              }}
              value={!progress}
            />
          </View>
          <View style={{paddingBottom: 10}}>
            <View>
              <Text>Progress:</Text>
            </View>
            <AnimatedSlider
              minimumValue={0}
              maximumValue={1}
              value={progress || 0}
              onValueChange={this.onProgressChange}
              disabled={!progress}
            />
          </View>
          <View>
            <View>
              <Text>Duration: ({Math.round(duration)}ms)</Text>
            </View>
            <Slider
              step={50}
              minimumValue={50}
              maximumValue={4000}
              value={duration}
              onValueChange={this.onDurationChange}
              disabled={!progress}
            />
          </View>
        </View>
      </View>
    );
  }
}

const PLAY_BUTTON_SIZE = 60;
const styles = StyleSheet.create({
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  playButton: {
    width: PLAY_BUTTON_SIZE,
    height: PLAY_BUTTON_SIZE,
    borderRadius: PLAY_BUTTON_SIZE / 2,
    backgroundColor: '#1d8bf1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonIcon: {
    width: 16,
    height: 16,
  },
  controlsIcon: {
    width: 24,
    height: 24,
    padding: 8,
  },
  controlsIconEnabled: {
    tintColor: '#1d8bf1',
  },
  controlsIconDisabled: {
    tintColor: '#aaa',
  },
  lottieView: {
    flex: 1,
  },
  lottieViewInvse: {
    backgroundColor: 'black',
  },
});
