import * as React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {COLOR} from '../shared/styleGuide';

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLOR.PRIMARY,
    height: 130,
    borderRadius: 5,
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    color: COLOR.WHITE,
    fontFamily: 'quicksand-medium',
  },
  titleContainer: {flex: 1, justifyContent: 'center'},
  textTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export const ChallengeCard = ({title, description, onPress}) => (
  <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
    <View style={styles.titleContainer}>
      <Text style={[styles.text, styles.textTitle]}>{title}</Text>
    </View>
    <View style={styles.descriptionContainer}>
      <Text style={[styles.text]}>{description}</Text>
    </View>
  </TouchableOpacity>
);
