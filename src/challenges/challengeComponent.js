import * as React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Geolocation from '@react-native-community/geolocation';
import {connect} from 'react-redux';
import {View, StyleSheet, ScrollView, Text, Linking} from 'react-native';
import {Header} from '../shared/header';
import {COLOR} from '../shared/styleGuide';
import {createStructuredSelector} from 'reselect';
import {userSelector, challengesSelector} from '../home/selector';
import {setUser, setChallenges, setSurvey} from '../home/actions';
import {ChallengeCard} from './challengeCard';
import {currentEvidenceSelector} from '../survey/selector';
import {Button} from '../shared/button';
import {IconButton} from '../shared/iconButton';
import {
  PhoneCardInfo,
  CardInfo,
  FBCardInfo,
  HeaderInfo,
  SmallCardInfo,
} from '../shared/cards';
import {
  highRisk,
  lowRisk,
  mediumRisk,
  noRisk,
  respiratoryRisk,
  severeRisk,
} from '../shared/constants';
import {riskTable} from '../shared/calculateRisk';

const styles = StyleSheet.create({
  container: {flex: 1},
  paddingContainer: {paddingLeft: 20, paddingRight: 20},
  mark: {height: 40, width: 3, marginLeft: 21, backgroundColor: COLOR.PRIMARY},
  challengesContainer: {flex: 1},
  button: {
    backgroundColor: COLOR.PRIMARY,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: COLOR.WHITE,
    fontFamily: 'quicksand-medium',
  },
  shareText: {color: COLOR.WHITE},
  shareButton: {
    backgroundColor: COLOR.PRIMARY,
    borderRadius: 100,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fbButton: {
    backgroundColor: COLOR.BLUE,
    borderRadius: 100,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'quicksand-medium',
    color: COLOR.GREY_DARK,
  },
  shareView: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareTextView: {flex: 3, alignItems: 'center'},
  shareButtonView: {flex: 0.5, alignItems: 'flex-end'},
  textCenter: {textAlign: 'center'},
  textBold: {fontFamily: 'quicksand-bold'},
  marginTop60: {marginTop: 60},
  marginTop20: {marginTop: 20},
  textPrimary: {color: COLOR.PRIMARY},
  fontSizeS: {fontSize: 18},
  fontSizeM: {fontSize: 20},
  fontSizeL: {fontSize: 24},
  textHeaderTitle: {color: COLOR.WHITE, flexWrap: 'wrap'},
  resultsContainer: {flex: 1, paddingLeft: 20, paddingRight: 20},
  resultsTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
  },
  resultsMark: {flex: 0.12},
  restultsTitleTextContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paddingTop30: {paddingTop: 30},
});

const firstTitle: string = 'Click aquí';
const firstDesc: string = 'Click aquí para realizar la encuesta nuevamente';
const secondTitle: string =
  'Contesta por primera vez la encuesta para poder brindarte recomendaciones';
const secondDesc: string =
  'Realiza una encuesta para saber el nivel de riesgo al que estas expuesto';

class ChallengeComponent extends React.Component {
  constructor(props) {
    super(props);
    const {challengeId} = this.props.route.params;
    const challenge = this.props.challenges.find((c) => (c.id = challengeId));
    const currentEvidence = this.props.currentEvidence;
    this.state = {
      challenge: challenge,
      currentEvidence: currentEvidence,
      hasEvidence: currentEvidence && currentEvidence.type,
    };
  }

  renderChallenges() {
    const {challenge, hasEvidence} = this.state;
    const titleText = !hasEvidence ? firstTitle : firstDesc;
    const descriptionText = !hasEvidence ? secondTitle : secondDesc;
    return (
      <View style={{paddingLeft: 20, paddingRight: 20}}>
        <ChallengeCard
          title={titleText}
          description={descriptionText}
          onPress={() => {
            Geolocation.getCurrentPosition((position) => {
              this.props.navigation.navigate('Survey', {
                challengeId: challenge.id,
                position: position,
              });
            });
          }}
        />
      </View>
    );
  }

  renderResults() {
    const {currentEvidence} = this.state;
    if (!currentEvidence.level) return;
    const riskTitle = riskTable.find(
      (risk) => risk.level === currentEvidence.level,
    ).risk;
    let recommendationsText = '';
    let riskColor = '';

    switch (currentEvidence.level) {
      case 1:
        recommendationsText = noRisk;
        riskColor = COLOR.GREEN_COLOR;
        break;
      case 2:
        recommendationsText = lowRisk;
        riskColor = COLOR.YELLOW;
        break;
      case 3:
        recommendationsText = mediumRisk;
        riskColor = COLOR.ORANGE;
        break;
      case 4:
        recommendationsText = highRisk;
        riskColor = COLOR.RED;
        break;
      case 5:
        recommendationsText = severeRisk;
        riskColor = COLOR.BROWN;
        break;
      case 6:
        recommendationsText = respiratoryRisk;
        riskColor = COLOR.PURPLE;
        break;
    }

    return (
      <View style={styles.resultsContainer}>
        <View style={styles.resultsTitleContainer}>
          <View style={[styles.resultsMark, {backgroundColor: riskColor}]} />
          <View style={styles.restultsTitleTextContainer}>
            <Text style={[styles.text, styles.textBold, styles.fontSizeL]}>
              {riskTitle}
            </Text>
          </View>
        </View>
        <View style={styles.paddingTop30}>
          <Text style={[styles.text, styles.textBold, styles.fontSizeS]}>
            {recommendationsText}
          </Text>
        </View>
      </View>
    );
  }

  renderEvidenceInfo() {
    return (
      <View style={{flex: 1, marginTop: 10}}>
        <View style={styles.paddingContainer}>
          <Button
            textStyle={styles.buttonText}
            buttonStyle={[styles.button]}
            text={'Ver escala de riesgos'}
            onPress={() => this.props.navigation.navigate('RiskScale')}
          />
          <View style={styles.shareView}>
            <View style={styles.shareTextView}>
              <Text style={[styles.text, styles.textCenter]}>
                Comparte esta app con tus contactos
              </Text>
            </View>
            <View style={styles.shareButtonView}>
              <IconButton
                buttonStyle={styles.shareButton}
                iconStyle={styles.shareText}
                iconSize={20}
                name={'share-alt'}
              />
            </View>
          </View>
          <View style={styles.marginTop60}>
            <Text style={[styles.text, styles.textCenter, styles.textBold]}>
              Revisa el manual para el manejo del aislamiento doméstico que
              encontrarás más abajo y sigue sus recomendaciones estrictamente.
            </Text>
          </View>
          <View style={styles.marginTop60}>
            <Text
              style={[
                styles.text,
                styles.textCenter,
                styles.textBold,
                styles.textPrimary,
                styles.fontSizeM,
              ]}>
              Resultado de la encuesta
            </Text>
          </View>
        </View>
        <View style={styles.marginTop20}>{this.renderResults()}</View>
        <View style={styles.marginTop60}>
          <HeaderInfo text={'Documentos recomendados para contingencia'} />
          <CardInfo
            text={'Manual para el manejo del aislamiento doméstico'}
            iconName={'download'}
            onPress={() =>
              Linking.openURL(
                'http://youilab.ipicyt.edu.mx/cds_store/FT-COVID-Guia-Cuidadores.pdf',
              )
            }
          />
          <CardInfo
            text={'Consulta la revista de recomendaciones ante el COVID-19'}
            iconName={'search'}
            onPress={() =>
              Linking.openURL(
                'https://slpcoronavirus.mx/revista-de-recomendaciones-covid-19/',
              )
            }
          />
        </View>
        <View style={styles.marginTop60}>
          <HeaderInfo text={'Atención por Redes Sociales'} />
          <FBCardInfo
            title={'Programa Virus UASLP'}
            text={
              'Tiene como objetivo el control de la propagación del SARS-Cov-2 a través de la identificación temprana de casos, así como su protección sanitaria.'
            }
            iconName={'facebook'}
            onPress={() =>
              Linking.openURL(
                'https://www.facebook.com/Programa-Virus-UASLP-114416080201472/?notif_id=1585715516427652&notif_t=page_fan',
              )
            }
          />
        </View>
        <View style={styles.marginTop60}>
          <HeaderInfo text={'Líneas de Atención Telefónicas'} />
          <PhoneCardInfo
            title={'Para San Luis Potosí'}
            text={'Teléfono: 800 123 888'}
            iconName={'phone'}
            onPress={() => Linking.openURL('tel:800123888')}
          />
          <PhoneCardInfo
            title={'Resto del País'}
            text={'Click aquí'}
            iconName={'phone'}
            onPress={() => this.props.navigation.navigate('PhoneNumbers')}
          />
        </View>
        <View style={styles.marginTop60}>
          <HeaderInfo text={'Información de consulta'} />
          <View
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <SmallCardInfo
              iconName={'download'}
              text={'Consejos Psicológicos'}
              onPress={() =>
                Linking.openURL(
                  'https://trabajohumanitario.org/wp-content/uploads/2020/03/Consejos-Psicologicos-para-largos-periodosdentro-de-casa.-1.pdf',
                )
              }
            />
            <SmallCardInfo
              iconName={'play-circle'}
              text={'Video Informativo'}
              onPress={() =>
                Linking.openURL(
                  'https://www.youtube.com/watch?time_continue=29&v=Uocm-uZ66T4&feature=emb_logo',
                )
              }
            />
            <SmallCardInfo
              iconName={'map-o'}
              text={'Mapa COVID-19'}
              onPress={() => Linking.openURL('https://covid19.sinave.gob.mx')}
            />
            <SmallCardInfo
              text={'Secretaría de Salud'}
              onPress={() => Linking.openURL('https://slpcoronavirus.mx')}
            />
            <SmallCardInfo
              text={'Organización Mundial de la Salud'}
              onPress={() =>
                Linking.openURL(
                  'https://www.who.int/es/emergencies/diseases/novelcoronavirus-2019/advice-for-public',
                )
              }
            />
            <SmallCardInfo
              text={'Rumores del Covid-19'}
              onPress={() =>
                Linking.openURL(
                  'https://www.who.int/es/emergencies/diseases/novelcoronavirus-2019/advice-for-public/myth-busters',
                )
              }
            />
            <SmallCardInfo
              text={'Prepara tu hogar'}
              onPress={() =>
                Linking.openURL(
                  'https://www.cdc.gov/coronavirus/2019-ncov/community/home/get-your-household-ready-for-COVID-19-sp.html',
                )
              }
            />
            <SmallCardInfo
              text={'Recursos para afrontar la pandemia'}
              onPress={() =>
                Linking.openURL(
                  'https://www.comunidad.madrid/sites/default/files/doc/sanidad/recursos_para_afrontar_efectivamente_y_con_calma_la_pandemia_tabla_200315.pdf-1.pdf',
                )
              }
            />
          </View>
        </View>
      </View>
    );
  }

  render() {
    const {hasEvidence} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Header
            navigation={this.props.navigation}
            title={this.state.challenge.title}
            extraPadding={true}
          />
          <View style={styles.challengesContainer}>
            {this.renderChallenges()}
            {hasEvidence && this.renderEvidenceInfo()}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: userSelector,
  challenges: challengesSelector,
  currentEvidence: currentEvidenceSelector,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
    setChallenges: (challenges) => dispatch(setChallenges(challenges)),
    setSurvey: (surveyJson, challengeId) =>
      dispatch(setSurvey(surveyJson, challengeId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeComponent);
