import {SafeAreaView} from 'react-native-safe-area-context';
import * as React from 'react';
import {View, StyleSheet, Share, Text} from 'react-native';
import {Button} from '../shared/button';
import {COLOR} from '../shared/styleGuide';
import {IconButton} from '../shared/iconButton';

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

export class SurveyResultComponent extends React.Component {
  onShare = async () => {
    try {
      const {id} = this.props.route.params;
      const result = await Share.share({
        message: id,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const {id, risk} = this.props.route.params;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.infoComponent}>
          <Text style={[styles.text, styles.folioTitle]}>Folio</Text>
          <Text style={[styles.text, styles.folio]}>{id}</Text>
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
        </View>
      </SafeAreaView>
    );
  }
}
