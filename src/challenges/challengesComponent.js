import {SafeAreaView} from 'react-native-safe-area-context';
import * as React from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Header} from '../shared/header';
import {COLOR} from '../shared/styleGuide';
import {createStructuredSelector} from 'reselect';
import {challengesSelector} from '../home/selector';
import {ChallengeCard} from './challengeCard';

const styles = StyleSheet.create({
  container: {flex: 1, paddingLeft: 20, paddingRight: 20},
  mark: {height: 40, width: 3, marginLeft: 21, backgroundColor: COLOR.PRIMARY},
  challengesContainer: {flex: 0.9},
});

// TODO: Test better this component when have more than one challenge
class ChallengesComponent extends React.Component {
  renderChallenges() {
    return this.props.challenges.map((challenge, index) => {
      return (
        <View>
          {index > 0 && <View style={styles.mark} />}
          <ChallengeCard
            title={challenge.title}
            description={challenge.description}
            key={challenge.id}
            onPress={() => {
              this.props.navigation.navigate('Challenge', {
                challengeId: challenge.id,
              });
            }}
          />
        </View>
      );
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header navigation={this.props.navigation} title={'Retos'} />
        <ScrollView style={styles.challengesContainer}>
          {this.renderChallenges()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  challenges: challengesSelector,
});

export default connect(mapStateToProps, null)(ChallengesComponent);
