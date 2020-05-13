import React from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../shared/header';
import {COLOR} from '../shared/styleGuide';

import {riskScale} from '../shared/constants';

const styles = StyleSheet.create({
  resultsContainer: {flex: 1, paddingLeft: 10, paddingRight: 20},
  resultsTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resultsMark: {flex: 0.15},
  restultsTitleTextContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
  },
  paddingTop30: {paddingTop: 30},
  text: {
    fontFamily: 'quicksand-medium',
    color: COLOR.GREY_DARK,
  },
  textBold: {fontFamily: 'quicksand-bold'},
  fontSizeS: {fontSize: 15},
  fontSizeM: {fontSize: 20},
  fontSizeL: {fontSize: 24},
  paddingBottom10: {paddingBottom: 10}
});

export const RiskScaleComponent = ({navigation}) => (
  <SafeAreaView style={{flex: 1}}>
    <Header
      title={'Escala de Riesgos'}
      showInfoColumn={false}
      navigation={navigation}
      horizontalMark={true}
    />
    <View style={{flex: 1}}>
      <FlatList
        data={riskScale}
        renderItem={({item}) => (
          <View style={styles.resultsContainer}>
            <View style={styles.resultsTitleContainer}>
              <View style={[styles.resultsMark, {backgroundColor: item.color}]} />
              <View style={styles.restultsTitleTextContainer}>
                <Text style={[styles.text, styles.textBold, styles.fontSizeL, styles.paddingBottom10]}>
                  {item.title}
                </Text>
                <Text style={[styles.text, styles.textBold, styles.fontSizeS]}>
                  {item.recommendationsText}
                </Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.title}
      />
    </View>
  </SafeAreaView>
);
