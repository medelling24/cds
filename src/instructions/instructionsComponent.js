import {SafeAreaView} from 'react-native-safe-area-context';
import * as React from 'react';
import {connect} from 'react-redux';
import {Linking, ScrollView, Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLOR} from '../shared/styleGuide';
import {Button} from '../shared/button';
import {setInstructionsAccepted} from '../home/actions';

const styles = StyleSheet.create({
  container: {flex: 1, paddingLeft: 20, paddingRight: 20},
  headerContainer: {justifyContent: 'center', alignItems: 'center', flex: 0.1},
  headerText: {
    color: COLOR.PRIMARY,
    fontSize: 30,
    fontWeight: '600',
    paddingBottom: 40,
    fontFamily: 'quicksand-medium',
  },
  instructionsContainer: {flex: 20},
  instructionsText: {
    color: COLOR.GREY_DARK,
    fontSize: 24,
    fontFamily: 'quicksand-medium',
  },
  hyperLinkColor: {color: COLOR.BLUE},
  paddingBottom: {paddingBottom: 20},
  termsAndConditionsContainer: {
    flex: 0.2,
    marginTop: 20,
    marginBottom: 20,
  },
  checkboxContainer: {flexDirection: 'row', alignItems: 'center'},
  checkboxIcon: {flex: 0.1},
  checkboxText: {
    color: COLOR.PRIMARY,
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 10,
    flex: 1,
    fontFamily: 'quicksand-medium',
  },
  buttonContainer: {flex: 1, justifyContent: 'flex-end'},
  button: {
    backgroundColor: COLOR.PRIMARY,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: COLOR.PRIMARY_DISABLED,
  },
  colorWhite: {color: COLOR.WHITE},
});

class InstructionsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: false,
      privacy: false,
    };
  }

  getIcon = (value) => (value ? 'check-square-o' : 'square-o');

  render() {
    const isDisabled = !this.state.privacy || !this.state.terms;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Instrucciones iniciales</Text>
        </View>
        <ScrollView style={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>
            Este test rápido te ayuda a identificar a tiempo cualquier síntoma o
            indicador de contagio de coronavirus (COVID-19) para que puedas
            tomar decisiones adecuadas y recibir atención temprana.
            {'\n\n'}
            Lee cuidadosamente las preguntas y contesta con la verdad y solo la
            información que se te pide. Tus respuestas son estrictamente
            confidenciales y serán mantenidas bajo los lineamientos oficiales de
            privacidad que puedes consultar en la liga ubicada en la parte
            inferior o en
          </Text>
          <Text
            style={[
              styles.instructionsText,
              styles.hyperLinkColor,
              styles.paddingBottom,
            ]}
            onPress={() =>
              Linking.openURL('https://ipicyt.edu.mx/avisos_privacidad/')
            }>
            https://ipicyt.edu.mx/avisos_privacidad/.
          </Text>
          <Text style={[styles.instructionsText, styles.paddingBottom]}>
            Lee detenidamente los Términos y Condiciones.
          </Text>
        </ScrollView>
        <View style={styles.termsAndConditionsContainer}>
          <View style={styles.checkboxContainer}>
            <Icon
              name={this.getIcon(this.state.terms)}
              size={26}
              color={COLOR.GREY_DARK}
              style={styles.checkboxIcon}
              onPress={() => {
                this.setState({terms: !this.state.terms});
              }}
            />
            <Text
              style={styles.checkboxText}
              onPress={() => {
                this.props.navigation.navigate('TermsAndConditions');
              }}>
              He leído y acepto los Términos y Condiciones
            </Text>
          </View>

          <View style={styles.checkboxContainer}>
            <Icon
              name={this.getIcon(this.state.privacy)}
              size={26}
              color={COLOR.GREY_DARK}
              style={styles.checkboxIcon}
              onPress={() => {
                this.setState({privacy: !this.state.privacy});
              }}
            />
            <Text
              style={styles.checkboxText}
              onPress={() => {
                Linking.openURL(
                  'https://ipicyt.edu.mx/storage-sipicyt/general/AVISO_DE_PRIVACIDAD_IPICYT.pdf/',
                );
              }}>
              Leer Aviso de privacidad
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              buttonStyle={[
                styles.button,
                isDisabled ? styles.disabledButton : null,
              ]}
              onPress={() => {
                this.props.setInstructionsAccepted(true);
                this.props.navigation.reset({
                  index: 0,
                  routes: [{name: 'Home'}],
                });
              }}
              text={'Continuar'}
              textStyle={styles.colorWhite}
              disabled={isDisabled}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setInstructionsAccepted: (accepted) =>
      dispatch(setInstructionsAccepted(accepted)),
  };
};

export default connect(null, mapDispatchToProps)(InstructionsComponent);
