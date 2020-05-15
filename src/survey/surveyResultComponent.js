import {SafeAreaView} from 'react-native-safe-area-context';
import * as React from 'react';
import {View, StyleSheet, Share, Text, ActivityIndicator} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {Button} from '../shared/button';
import {COLOR} from '../shared/styleGuide';
import {IconButton} from '../shared/iconButton';
import {generateXml} from '../shared/generateXml';
import {createStructuredSelector} from 'reselect';
import {challengesSelector, userSelector} from '../home/selector';
import {inProgressEvidenceSelector} from './selector';
import {addEvidence, createEvidence, updateEvidence} from './actions';
import {connect} from 'react-redux';
import {postSurvey} from '../shared/api';

const styles = StyleSheet.create({
  container: {flex: 1, paddingLeft: 20, paddingRight: 20},
  infoComponent: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  levelComponent: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  buttonComponent: {
    flex: 0.2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  button: {
    backgroundColor: COLOR.PRIMARY,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: COLOR.WHITE,
  },
  text: {
    color: COLOR.GREY_DARK,
    fontFamily: 'quicksand-medium',
  },
  folioTitle: {
    fontSize: 24,
    fontFamily: 'quicksand-bold',
  },
  folio: {
    fontSize: 18,
    color: COLOR.GREY_DARK,
    marginBottom: 15,
  },
  shareText: {fontSize: 18, color: COLOR.PRIMARY, marginBottom: 15},
  shareButton: {
    backgroundColor: COLOR.PRIMARY,
    borderRadius: 100,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  riskText: {fontSize: 18},
  risk: {fontSize: 40, color: COLOR.GREY_DARK, fontFamily: 'quicksand-bold'},
});

class SurveyResultComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };

    NetInfo.fetch().then((state) => {
      //if (state.isConnected && !this.props.user) {
      if (state.isConnected) {
        this.uploadEvidence();
      } else {
        const evidence = this.props.inProgressEvidence;
        this.props.addEvidence(evidence); // Insert in the queue to sync
      }
    });
  }

  uploadEvidence() {
    const evidence = this.props.inProgressEvidence;
    this.setState({loading: true});
    generateXml(evidence).then(() => {
      postSurvey(evidence).then(() => {
        this.setState({loading: false});
        evidence.isSync = true;
        this.props.updateEvidence(evidence);
        this.props.addEvidence(evidence); // Is this need it? maybe keep it to have track for all the evidences
      });
    });
  }

  onShare = async () => {
    try {
      const {id} = this.props.route.params;
      await Share.share({
        message: id.split('.')[0],
      });
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const {id, risk} = this.props.route.params;
    const {loading} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.infoComponent}>
          <Text style={[styles.text, styles.folioTitle]}>Folio</Text>
          <Text style={[styles.text, styles.folio]}>{id.split('.')[0]}</Text>
          <Text style={[styles.text, styles.shareText]}>
            Conserva este folio o compartelo
          </Text>
          <IconButton
            name={'share-alt'}
            iconSize={30}
            iconStyle={styles.buttonText}
            buttonStyle={styles.shareButton}
            onPress={this.onShare}
          />
        </View>
        <View style={styles.levelComponent}>
          <Text style={[styles.text, styles.riskText]}>Nivel de riesgo</Text>
          <Text style={[styles.text, styles.risk]}>{risk}</Text>
        </View>
        <View style={styles.buttonComponent}>
          {!loading && (
            <Button
              buttonStyle={styles.button}
              textStyle={[styles.text, styles.buttonText]}
              text={'Continuar'}
              onPress={() => {
                this.props.navigation.reset({
                  index: 0,
                  routes: [{name: 'Home'}],
                });
              }}
            />
          )}
          {loading && <ActivityIndicator size="large" color={COLOR.PRIMARY} />}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  challenges: challengesSelector,
  user: userSelector,
  inProgressEvidence: inProgressEvidenceSelector,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateEvidence: (evidence) => dispatch(updateEvidence(evidence)),
    addEvidence: (evidence) => dispatch(addEvidence(evidence)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SurveyResultComponent);
