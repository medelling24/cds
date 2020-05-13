import {SafeAreaView} from 'react-native-safe-area-context';
import * as React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Header} from '../shared/header';

const styles = StyleSheet.create({
  container: {flex: 1, paddingLeft: 20, paddingRight: 20},
  logo: {height: 120, width: 120, resizeMode: 'contain'},
  logosContainer: {flexDirection: 'column', flex: 1},
  logoRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  logoContainer: {justifyContent: 'flex-start'},
});

export class AboutComponent extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          navigation={this.props.navigation}
          title={'Instituciones'}
          showInfoColumn={false}
        />
        <View style={styles.logosContainer}>
          <View style={styles.logoRow}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/img/program.jpg')}
                style={styles.logo}
              />
            </View>

            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/img/uaslp.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/img/ipicyt.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/img/facultad.png')}
                style={styles.logo}
              />
            </View>

            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/img/youilab.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/img/fm.gif')}
                style={styles.logo}
              />
            </View>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/img/ccu.png')}
                style={styles.logo}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
