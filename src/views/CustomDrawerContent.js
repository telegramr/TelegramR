import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import {Sizes, Colors} from '../theme';

export default class CustomDrawerContent extends Component {
  render() {
    return (
      <ScrollView>
        <StatusBar translucent backgroundColor="rgba(0,0,0,0.2)" />
        <SafeAreaView
          style={styles.container}
          forceInset={{top: 'always', horizontal: 'never'}}>
          <ImageBackground
            source={{
              uri:
                'https://wx2.sinaimg.cn/large/006anXukly1g6zun01qwkj30zk1e80y3.jpg',
            }}
            style={styles.userAccountsDrawerHeaderBgImg}>
            <View style={styles.userAccountsContainer}>
              <Image
                source={{
                  uri:
                    'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4',
                }}
                style={styles.userAccountsDrawerAvatar}
              />
              <Text style={styles.userAccountsUname}>Beats0</Text>
              <Text style={styles.userAccountsBio}>some bio</Text>
            </View>
          </ImageBackground>
          <DrawerItems {...this.props} />
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userAccountsDrawerHeaderBgImg: {
    width: '100%',
    height: ((Sizes.width - 50) * 9) / 16,
  },
  userAccountsContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
  },
  userAccountsDrawerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginVertical: 20,
    overflow: 'hidden',
  },
  userAccountsUname: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.white,
  },
  userAccountsBio: {
    color: Colors.white,
  },
  loginBtn: {
    borderWidth: 1,
    padding: 5,
  },
});
