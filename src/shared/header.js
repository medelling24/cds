import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLOR} from './styleGuide';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CellInformationIcon from './cellInformationIcon';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.1,
    paddingBottom: 30,
  },
  textContainer: {
    color: COLOR.GREY_DARK,
    fontSize: 20,
    fontWeight: '600',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 7,
    paddingLeft: 5,
  },
  markContainer: {
    borderLeftWidth: 3,
    borderLeftColor: COLOR.PRIMARY,
    left: '50%',
    top: 0,
    height: '140%',
    position: 'absolute',
    zIndex: 0,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {backgroundColor: COLOR.GREY_LIGHT, height: 41},
  homeButton: {
    backgroundColor: COLOR.PRIMARY,
    height: 41,
    width: 41,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {bottom: 1},
  homeIcon: {top: 1, left: 1},
  infoButton: {
    alignItems: 'flex-end',
    backgroundColor: COLOR.WHITE,
    borderRadius: 40,
    height: 40,
    width: 40,
    padding: 7,
  },
  text: {
    color: COLOR.GREY_DARK,
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'quicksand-medium',
  },
  horizontalMarkContainer: {
    width: '80%',
    position: 'absolute',
    top: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  markIcon: {color: COLOR.PRIMARY, top: 1, left: 2},
  horizontalMark: {height: 1, width: '120%', backgroundColor: COLOR.PRIMARY},
  extraPadding: {paddingLeft: 20, paddingRight: 20, minHeight: 100},
});

const backButton = (navigation) => (
  <TouchableOpacity
    activeOpacity={0.9}
    style={styles.backButton}
    onPress={() => {
      navigation.goBack();
    }}>
    <Icon
      name="arrow-left-circle"
      size={45}
      color={COLOR.PRIMARY}
      style={styles.backIcon}
    />
  </TouchableOpacity>
);

const circleButton = () => (
  <View style={styles.homeButton}>
    <Icon
      name="lighthouse"
      size={35}
      color={COLOR.GREY_LIGHT}
      style={styles.homeIcon}
    />
  </View>
);

export const Header = ({
  navigation,
  title,
  showInfoColumn = true,
  horizontalMark = false,
  extraPadding = false,
}) => (
  <View style={[styles.headerContainer, extraPadding ? styles.extraPadding : null]}>
    <View style={styles.buttonContainer}>
      {!horizontalMark && <View style={styles.markContainer} />}
      {navigation.dangerouslyGetState().index > 0 && backButton(navigation)}
      {navigation.dangerouslyGetState().index === 0 && circleButton()}
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.text}>{title}</Text>
    </View>
    {showInfoColumn && (
      <TouchableOpacity
        style={styles.infoButton}
        onPress={() => {
          navigation.navigate('About');
        }}>
        <CellInformationIcon style={{color: COLOR.PRIMARY}} />
      </TouchableOpacity>
    )}
    {horizontalMark && (
      <View style={styles.horizontalMarkContainer}>
        <Icon name={'square'} style={styles.markIcon} />
        <View style={styles.horizontalMark} />
      </View>
    )}
  </View>
);
