import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Base, Sizes } from '../../theme';
// import { withTranslation } from 'react-i18next';
// import LocalizationStore from '../../Stores/LocalizationStore';

export default class DayMeta extends React.Component {
  static propTypes = {
    date: PropTypes.number.isRequired,
  };

  componentDidMount() {
    // LocalizationStore.on('clientUpdateLanguageChange', this.onClientUpdateLanguage);
  }

  componentWillUnmount() {
    // LocalizationStore.off('clientUpdateLanguageChange', this.onClientUpdateLanguage);
  }

  onClientUpdateLanguage = () => {
    this.forceUpdate();
  };

  render() {
    const {date} = this.props;
    const language = 'ZH';

    return (
      <View style={[Base.flexCenter]}>
        <View style={styles.dayWrapper}>
          <Text style={styles.dayText}>
            {new Date(date * 1000).toLocaleDateString(language, {
              day: 'numeric',
              month: 'long',
            })}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dayWrapper: {
    ...Base.flexCenter,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 8,
  },
  dayText: {
    color: '#fff',
    fontSize: 13,
  },
})
