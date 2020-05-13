import * as React from 'react';
import {connect} from 'react-redux';
import {Text, View, ActivityIndicator, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NetInfo from '@react-native-community/netinfo';
import {COLOR} from '../shared/styleGuide';
import {getUser, getChallenges, getSurvey} from '../shared/api';
import {createStructuredSelector} from 'reselect';
import {userSelector, challengesSelector} from './selector';
import {setUser, setChallenges, setSurvey} from './actions';

const styles = StyleSheet.create({
  loadingContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  text: {fontFamily: 'quicksand-medium'},
  errorText: {textAlign: 'center'},
});

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: null,
    };

    NetInfo.fetch().then((state) => {
      //if (state.isConnected && !this.props.user) {
      if (state.isConnected) {
        this.login();
        this.setState({isConnected: true});
      } else {
        this.setState({isConnected: false});
      }
    });
  }

  login() {
    getUser().then((user) => {
      console.warn(user);
      this.props.setUser(user);
      this.fetchChallenges(user.id);
    });
  }

  fetchChallenges(userId) {
    getChallenges(userId).then((challenges) => {
      console.warn(challenges);
      this.props.setChallenges(challenges);
      this.fetchSurveys(challenges);
    });
  }

  fetchSurveys(challenges) {
    challenges.forEach((challenge) => {
      getSurvey(challenge.survey).then((surveyJson) => {
        console.warn(surveyJson);
        this.props.setSurvey(surveyJson, challenge.id);
      });
      this.navigateToChallenges();
    });
  }

  navigateToChallenges() {
    const screen =
      this.props.challenges.length > 1 ? 'Challenges' : 'Challenge';

    this.props.navigation.reset({
      index: 0,
      routes: [
        {
          name: screen,
          params: {challengeId: this.props.challenges[0].id},
        },
      ],
    });
  }

  render() {
    if (!this.state.isConnected && !this.props.user) {
      return (
        <View style={styles.errorContainer}>
          <Icon name="exclamation-triangle" color={COLOR.RED} size={40} />
          <Text style={[styles.errorText, styles.text]}>
            Debes estar conectado a internet para obtener las encuestas, después
            puedes usar la aplicación sin Internet
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLOR.PRIMARY} />
        <Text style={styles.text}>Cargando</Text>
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: userSelector,
  challenges: challengesSelector,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
    setChallenges: (challenges) => dispatch(setChallenges(challenges)),
    setSurvey: (surveyJson, challengeId) =>
      dispatch(setSurvey(surveyJson, challengeId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
