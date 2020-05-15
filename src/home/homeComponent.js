import * as React from 'react';
import {connect} from 'react-redux';
import {Text, View, ActivityIndicator, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NetInfo from '@react-native-community/netinfo';
import BackgroundFetch from 'react-native-background-fetch';
import {COLOR} from '../shared/styleGuide';
import {getUser, getChallenges, getSurvey, postSurvey} from '../shared/api';
import {createStructuredSelector} from 'reselect';
import {userSelector, challengesSelector} from './selector';
import {setUser, setChallenges, setSurvey} from './actions';
import {evidencesNotSyncedSelector} from '../survey/selector';
import {generateXml} from '../shared/generateXml';
import {updateSyncEvidence} from '../survey/actions';

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

    // Configure it.
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
        // Android options
        forceAlarmManager: false, // <-- Set true to bypass JobScheduler.
        stopOnTerminate: false,
        startOnBoot: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
        requiresCharging: false, // Default
        requiresDeviceIdle: false, // Default
        requiresBatteryNotLow: false, // Default
        requiresStorageNotLow: false, // Default
      },
      async (taskId) => {
        console.log('[js] Received background-fetch event: ', taskId);
        // Required: Signal completion of your task to native code
        // If you fail to do this, the OS can terminate your app
        // or assign battery-blame for consuming too much background-time
        NetInfo.fetch().then((state) => {
          //if (state.isConnected && !this.props.user) {
          if (state.isConnected) {
            const pendingEvidences = this.props.pendingEvidences;
            if (pendingEvidences && pendingEvidences.length > 0) {
              const xml$ = [];
              pendingEvidences.forEach((evidence) => {
                xml$.push(generateXml(evidence));
              });

              Promise.all(xml$)
                .then(() => {
                  const post$ = [];
                  pendingEvidences.forEach((evidence) => {
                    post$.push(postSurvey(evidence));
                  });
                  Promise.all(post$)
                    .then(() => {
                      pendingEvidences.forEach((evidence) => {
                        this.props.updateSyncEvidence(evidence);
                      });
                      BackgroundFetch.finish(taskId);
                    })
                    .catch(() => {
                      BackgroundFetch.finish(taskId);
                    });
                })
                .catch(() => {
                  BackgroundFetch.finish(taskId);
                });
            } else {
              BackgroundFetch.finish(taskId);
            }
          } else {
            BackgroundFetch.finish(taskId);
          }
        });
      },
      (error) => {
        console.log('[js] RNBackgroundFetch failed to start');
      },
    );
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
  pendingEvidences: evidencesNotSyncedSelector,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
    setChallenges: (challenges) => dispatch(setChallenges(challenges)),
    setSurvey: (surveyJson, challengeId) =>
      dispatch(setSurvey(surveyJson, challengeId)),
    updateSyncEvidence: (evidence) => dispatch(updateSyncEvidence(evidence)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
