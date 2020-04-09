import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {KPAndroidGalleryView} from 'react-native-kpframework-gallery';
import type {Photo} from '../../constants/Types';
import { Sizes } from '../../theme';

export default class ThumbGallery extends React.PureComponent {
  static propTypes = {
    thumbList: PropTypes.array,
    onPageChanged: PropTypes.func,
    onClosePress: PropTypes.func,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    thumbList: [],
    debug: false,
    mode: 'crop',
    orientation: 'auto',
    seek: false,
    onPageChanged: (index: number) => {},
    onClosePress: () => {},
    onClose: () => {},
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  getOverlayOptionProps = () => ({
    debug: this.props.debug,
    mode: this.props.mode,
    orientation: this.props.orientation,
    seek: this.props.seek,
  });

  getOverlayFunctionProps = () => ({
    onPageChanged: this.props.onPageChanged,
    onClosePress: this.props.onClosePress,
    onClose: this.props.onClose,
  });

  render() {
    const thumbList: Photo[] = this.props.thumbList;
    let images = [];
    for (let i = 0; i < thumbList.length; i++) {
      images.push({
        source: {
          uri: thumbList[i].large,
        },
      });
    }
    return (
      <View style={styles.page}>
        <KPAndroidGalleryView
          style={{flex: 1}}
          options={{...this.getOverlayOptionProps(), images}}
          {...this.getOverlayFunctionProps()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: Sizes.width,
        borderWidth: 1,
            borderColor: '#991010',
  },
});
