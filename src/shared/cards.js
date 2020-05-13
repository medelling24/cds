import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLOR} from './styleGuide';
import {IconButton} from './iconButton';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
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
  textPrimary: {color: COLOR.PRIMARY},
  fontSizeM: {fontSize: 20},
  textHeaderTitle: {color: COLOR.WHITE, flexWrap: 'wrap'},
  headerContainer: {flex: 1, flexDirection: 'row', alignItems: 'center'},
  headerMark: {backgroundColor: COLOR.PRIMARY, flex: 1, height: 2},
  headerTextContainer: {
    backgroundColor: COLOR.PRIMARY,
    flex: 3,
    padding: 10,
    borderRadius: 5,
  },
  cardContainer: {
    shadowColor: COLOR.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.0,
    elevation: 1,
    flexDirection: 'row',
    backgroundColor: COLOR.WHITE,
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  fontSizeTitle: {fontSize: 18},
  cardTextContainer: {flex: 7},
  cardIconContainer: {flex: 1, alignItems: 'flex-end'},
  fbCardTextContainer: {flex: 4},
  textFBTitleCard: {fontSize: 24, textAlign: 'center'},
  textFBDescCard: {fontSize: 14, textAlign: 'center'},
  phoneTitle: {fontSize: 20, textAlign: 'center', color: COLOR.PRIMARY},
  phoneDesc: {fontSize: 18, textAlign: 'center'},
  smallCardContainer: {
    width: 150,
    height: 150,
    margin: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  smallCardIcon: {flex: 2, alignItems: 'flex-end'},
  colorGrayDark: {color: COLOR.GREY_DARK},
  smallCardTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallCardText: {fontSize: 16, flexWrap: 'wrap', textAlign: 'center'},
});

export const HeaderInfo = ({text}) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerMark} />
    <View style={styles.headerTextContainer}>
      <Text style={[styles.text, styles.textBold, styles.textHeaderTitle]}>
        {text}
      </Text>
    </View>
  </View>
);

export const CardInfo = ({text, iconName, onPress}) => (
  <View style={styles.cardContainer}>
    <Text
      style={[
        styles.cardTextContainer,
        styles.text,
        styles.textBold,
        styles.fontSizeTitle,
      ]}>
      {text}
    </Text>
    <View style={styles.cardIconContainer}>
      <IconButton
        buttonStyle={styles.shareButton}
        iconStyle={styles.shareText}
        name={iconName}
        iconSize={20}
        onPress={onPress}
      />
    </View>
  </View>
);

export const FBCardInfo = ({title, text, iconName, onPress}) => (
  <View style={styles.cardContainer}>
    <View style={styles.fbCardTextContainer}>
      <Text style={[styles.text, styles.textBold, styles.textFBTitleCard]}>
        {title}
      </Text>
      <Text style={[styles.text, styles.textFBDescCard]}>{text}</Text>
    </View>
    <View style={styles.cardIconContainer}>
      <IconButton
        buttonStyle={styles.fbButton}
        iconStyle={styles.shareText}
        name={iconName}
        iconSize={20}
        onPress={onPress}
      />
    </View>
  </View>
);

export const PhoneCardInfo = ({title, text, iconName, onPress}) => (
  <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
    <View style={styles.cardIconContainer}>
      <IconButton
        buttonStyle={styles.shareButton}
        iconStyle={styles.shareText}
        name={iconName}
        iconSize={20}
        onPress={onPress}
      />
    </View>
    <View style={styles.fbCardTextContainer}>
      <Text style={[styles.text, styles.textBold, styles.phoneTitle]}>
        {title}
      </Text>
      <Text style={[styles.text, styles.phoneDesc]}>{text}</Text>
    </View>
  </TouchableOpacity>
);

export const SmallCardInfo = ({text, iconName, onPress}) => (
  <TouchableOpacity
    style={[styles.cardContainer, styles.smallCardContainer]}
    onPress={onPress}>
    {iconName && (
      <View style={styles.smallCardIcon}>
        <Icon name={iconName} size={60} style={styles.colorGrayDark} />
      </View>
    )}
    <View style={styles.smallCardTextContainer}>
      <Text style={[styles.text, styles.textBold, styles.smallCardText]}>
        {text}
      </Text>
    </View>
  </TouchableOpacity>
);
