/**
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {Platform, Alert} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RNPermissions, {
  Permission,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {WelcomeComponent} from './welcome/welcomeComponent';
import InstructionsComponent from './instructions/instructionsComponent';
import HomeComponent from './home/homeComponent';
import {TermsAndConditionsComponent} from './instructions/termsAndConditionsComponent';
import {AboutComponent} from './instructions/aboutComponent';
import {hasInstructionsAcceptedSelector} from './home/selector';
import ChallengesComponent from './challenges/challengesComponent';
import ChallengeComponent from './challenges/challengeComponent';
import SurveyComponent from './survey/surveyComponent';
import {COLOR} from './shared/styleGuide';
import SurveyResultComponent from './survey/surveyResultComponent';
import {PhoneNumbersComponent} from './instructions/phoneNumbersComponent';
import {RiskScaleComponent} from './instructions/riskScaleComponent';

const PLATFORM_PERMISSIONS = Platform.select<
  typeof PERMISSIONS.IOS | typeof PERMISSIONS.ANDROID | {},
>({
  ios: [PERMISSIONS.IOS.LOCATION_ALWAYS],
  android: [PERMISSIONS.ANDROID], // TODO: Define android
  default: {},
});

const PERMISSIONS_VALUES: Permission[] = Object.values(PLATFORM_PERMISSIONS);

const cdsTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLOR.GREY_LIGHT,
  },
};

const Stack = createStackNavigator();

class CDS extends React.Component {
  constructor(props) {
    super(props);
  }

  check = () =>
    RNPermissions.checkMultiple(PERMISSIONS_VALUES)
      .then((statuses) => {
        if (Platform.OS === 'ios') {
          if (statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] !== RESULTS.GRANTED) {
            this.request();
          }
        } else {
          // TODO: Android
        }
      })
      .catch((error) => console.warn(error));

  request = () =>
    RNPermissions.requestMultiple(PERMISSIONS_VALUES).then((statuses) => {
      if (statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] !== RESULTS.GRANTED) {
        Alert.alert(
          'Error',
          'Debes aceptar los permisos para realizar la encuesta',
          [
            {
              text: 'OK',
              style: 'default',
            },
          ],
          {cancelable: false},
        );
      }
    });

  componentDidMount() {
    this.check();
  }

  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer theme={cdsTheme}>
          <Stack.Navigator
            initialRouteName={
              this.props.shouldSkipInstructions ? 'Home' : 'Welcome'
            }>
            <Stack.Screen
              name="Welcome"
              component={WelcomeComponent}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Instructions"
              component={InstructionsComponent}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Home"
              component={HomeComponent}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="TermsAndConditions"
              component={TermsAndConditionsComponent}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="About"
              component={AboutComponent}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Challenges"
              component={ChallengesComponent}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Challenge"
              component={ChallengeComponent}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Survey"
              component={SurveyComponent}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SurveyResult"
              component={SurveyResultComponent}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PhoneNumbers"
              component={PhoneNumbersComponent}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RiskScale"
              component={RiskScaleComponent}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  shouldSkipInstructions: hasInstructionsAcceptedSelector,
});

export default connect(mapStateToProps, null)(CDS);
