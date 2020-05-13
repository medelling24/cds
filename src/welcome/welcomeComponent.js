import * as React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLOR} from '../shared/styleGuide';
import {Button} from '../shared/button';

const styles = StyleSheet.create({
  container: {flex: 1, paddingLeft: 20, paddingRight: 20},
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  logo: {height: 150, width: 150, resizeMode: 'contain'},
  text: {color: COLOR.GREY_DARK, fontSize: 24},
  paddingBottom: {paddingBottom: 20},
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLOR.PRIMARY,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  colorWhite: {color: COLOR.WHITE},
});

export function WelcomeComponent({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/img/cdslogo.png')}
          style={styles.logo}
        />
      </View>
      <Text style={[styles.text, styles.paddingBottom]}>
        ¡Te damos la bienvenida!
      </Text>
      <Text style={styles.text}>
        Esta aplicación se pone a tu disposición para ayudar al control de la
        propagación del coronavirus (COVID-19) a través de la identificación
        temprana de casos para protegerte y brindarte información importante.
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.button}
          onPress={() => {
            navigation.navigate('Instructions');
          }}
          text={'Continuar'}
          textStyle={styles.colorWhite}
        />
      </View>
    </SafeAreaView>
  );
}
