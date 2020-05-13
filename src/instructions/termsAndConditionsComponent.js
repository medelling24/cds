import {SafeAreaView} from 'react-native-safe-area-context';
import * as React from 'react';
import {Text, ScrollView, StyleSheet} from 'react-native';
import {COLOR} from '../shared/styleGuide';
import {Header} from '../shared/header';

const styles = StyleSheet.create({
  container: {flex: 1, paddingLeft: 20, paddingRight: 20},
  instructionsContainer: {flex: 1},
  instructionsText: {
    color: COLOR.GREY_DARK,
    fontSize: 24,
    fontFamily: 'quicksand-medium',
  },
});

export class TermsAndConditionsComponent extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          navigation={this.props.navigation}
          title={'Términos y condiciones'}
        />
        <ScrollView style={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>
            Todos los datos que se recolectan con esta aplicación son de
            carácter confidencial. Los datos serán utilizados por el Instituto
            Potosino de Investigación Científica y Tecnológica AC, la Facultad
            de Medicina de la Universidad Autónoma de San Luis Potosí y Los
            Servicios de Salud de San Luis Potosí para fines de investigación
            científica para apoyar a las autoridades de salud. Su uso para
            cualquier otro fin está estrictamente prohibido.
            {'\n\n'}
            Se te invita a ver el Aviso de Privacidad en: https://
            ipicyt.edu.mx/avisos_privacidad/
            {'\n\n'}
            El uso de la aplicación es voluntario.
            {'\n\n'}
          </Text>
          <Text style={[styles.instructionsText, styles.textBold]}>
            ACEPTO PARTICIPAR COMO VOLUNTARIO
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
