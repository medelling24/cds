import {SafeAreaView} from 'react-native-safe-area-context';
import * as React from 'react';
import {connect} from 'react-redux';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Header} from '../shared/header';
import {COLOR} from '../shared/styleGuide';
import {createStructuredSelector} from 'reselect';
import {Button} from '../shared/button';
import {createEvidence, updateEvidence} from './actions';
import {Evidence} from '../shared/classes';
import {inProgressEvidenceSelector} from './selector';
import {challengesSelector, userSelector} from '../home/selector';
import {calculateRisk} from '../shared/calculateRisk';

const styles = StyleSheet.create({
  container: {flex: 1, paddingLeft: 20, paddingRight: 20},
  mark: {height: 40, width: 3, marginLeft: 21, backgroundColor: COLOR.PRIMARY},
  surveyContainer: {flex: 1, paddingTop: 0},
  button: {
    backgroundColor: COLOR.PRIMARY,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: COLOR.PRIMARY_DISABLED,
  },
  colorWhite: {color: COLOR.WHITE},
  textInput: {
    backgroundColor: COLOR.WHITE,
    height: 45,
    fontSize: 20,
    color: COLOR.GREY_DARK,
    padding: 10,
    borderRadius: 20,
    fontFamily: 'quicksand-medium',
  },
  multioptionContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 30,
  },
  multioption: {
    backgroundColor: COLOR.WHITE,
    width: 120,
    height: 60,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    padding: 5,
  },
  multioptionText: {
    fontWeight: 'bold',
    color: COLOR.GREY_DARK,
    textAlign: 'center',
    fontFamily: 'quicksand-medium',
  },
  questionContainer: {flex: 1},
  questionText: {
    fontSize: 20,
    color: COLOR.GREY_DARK,
    fontWeight: 'bold',
    textAlign: 'justify',
    fontFamily: 'quicksand-medium',
  },
  multioptionNote: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  multioptionNoteText: {
    color: COLOR.PRIMARY_DARK,
    fontWeight: 'bold',
    fontFamily: 'quicksand-medium',
  },
  inputQuestion: {flex: 1, justifyContent: 'flex-end'},
  multioptionQuestion: {justifyContent: 'flex-start'},
  buttonContainer: {flex: 0.1, justifyContent: 'flex-end'},
  keyboardAware: {flex: 1, justifyContent: 'flex-end'},
  disabledText: {color: COLOR.GREY},
});

const placeholder = 'Escribe aquí';

const skipQuestion = [
  {section: 0, question: 0},
  {section: 0, question: 3},
  {section: 3, question: 1},
];

class SurveyComponent extends React.Component {
  constructor(props) {
    super(props);
    const {challengeId} = this.props.route.params;
    const challenge = this.props.challenges.find((c) => (c.id = challengeId));
    const survey = challenge.surveyJson.survey;

    let {sectionIndex, questionIndex} = this.props.route.params;
    if (sectionIndex === undefined || questionIndex === undefined) {
      const {position} = this.props.route.params;
      const evidence = new Evidence();

      const timestamp = parseInt(position.timestamp.toString().split('.')[0]);
      evidence.altitude = position.coords.altitude;
      evidence.latitude = position.coords.latitude;
      evidence.longitude = position.coords.longitude;
      evidence.timestamp = timestamp;
      evidence.id = `${challenge.id}_${timestamp}.xml`;
      evidence.userId = this.props.user.id;
      evidence.challengeId = challenge.id;
      evidence.type = 3;
      evidence.survey = survey;
      evidence.surveyAnswers = [];
      evidence.isSync = false;
      this.props.createEvidence(evidence);
      this.insertAnswer(evidence, 0, 0, null);
      sectionIndex = 0;
      questionIndex = 1; // Skip first question
    }

    const section = survey.sections[0].section[sectionIndex];
    const question = section.questions[0].question[questionIndex];
    this.state = {
      challenge: challenge,
      survey: survey,
      section: section,
      question: question,
      answer: null,
      sectionIndex: sectionIndex,
      questionIndex: questionIndex,
      goToQuestion: null,
    };
  }

  handleChange = (value) => {
    this.setState({answer: value});
  };

  insertAnswer(inProgressEvidence, sectionIndex, questionIndex, answer) {
    const answerObj = {
      section: sectionIndex,
      question: questionIndex,
      answer: answer || 'Sin Respuesta',
    };

    if (
      inProgressEvidence.surveyAnswers.some(
        (s) => s.section === sectionIndex && s.question === questionIndex,
      )
    ) {
      inProgressEvidence.surveyAnswers = inProgressEvidence.surveyAnswers.map(
        (s) => {
          if (s.section === sectionIndex && s.question === questionIndex) {
            return {...s, answer: answer || 'Sin Respuesta'};
          }
          return s;
        },
      );
    } else {
      inProgressEvidence.surveyAnswers.push(answerObj);
    }

    this.props.updateEvidence(inProgressEvidence);
  }

  navigateToNextPage(
    survey,
    challenge,
    section,
    inProgressEvidence,
    newQuestionIndex,
    newSectionIndex,
    goToQuestion,
  ) {
    if (!goToQuestion) {
      // if new index is equal or bigger than current questions, get the next section
      if (newQuestionIndex >= section.questions[0].question.length) {
        newSectionIndex += 1;
        newQuestionIndex = 0;
        if (newSectionIndex >= survey.sections[0].section.length) {
          const risk = calculateRisk(inProgressEvidence.surveyAnswers);
          inProgressEvidence.level = risk.level;
          this.props.updateEvidence(inProgressEvidence);
          return this.props.navigation.navigate('SurveyResult', {
            id: inProgressEvidence.id,
            risk: risk.risk,
          });
        }
      }
    }

    return this.props.navigation.push('Survey', {
      challengeId: challenge.id,
      sectionIndex: newSectionIndex,
      questionIndex: goToQuestion || newQuestionIndex,
    });
  }

  goToNextPage = () => {
    const {
      challenge,
      survey,
      section,
      sectionIndex,
      questionIndex,
      goToQuestion,
      answer,
    } = this.state;
    let newSectionIndex = sectionIndex;
    let newQuestionIndex = questionIndex + 1;
    const inProgressEvidence = this.props.inProgressEvidence;

    this.insertAnswer(inProgressEvidence, sectionIndex, questionIndex, answer);

    if (
      skipQuestion.some(
        (s) => s.section === newSectionIndex && s.question === newQuestionIndex,
      )
    ) {
      this.insertAnswer(
        inProgressEvidence,
        newSectionIndex,
        newQuestionIndex,
        null,
      );
      newQuestionIndex += 1;
    }

    return this.navigateToNextPage(
      survey,
      challenge,
      section,
      inProgressEvidence,
      newQuestionIndex,
      newSectionIndex,
      goToQuestion,
    );
  };

  renderQuestionType(type, isMandatory, options) {
    switch (type) {
      case 'short-text':
      case 'long-text':
        return (
          <TextInput
            autoFocus={isMandatory}
            onChangeText={this.handleChange}
            style={styles.textInput}
            placeholder={placeholder}
          />
        );
      case 'numeric':
        return (
          <TextInput
            autoFocus={isMandatory}
            keyboardType={'numeric'}
            style={styles.textInput}
            placeholder={placeholder}
            returnKeyType={'done'}
            onChangeText={this.handleChange}
          />
        );
      case 'multioption':
        return (
          <View style={styles.multioptionContainer}>
            {options[0].option.map((option, index) => {
              const text = typeof option === 'string' ? option : option._;
              const selected = this.state.answer === text;
              return (
                <Button
                  key={index}
                  buttonStyle={[
                    styles.multioption,
                    selected ? {backgroundColor: COLOR.PRIMARY} : null,
                  ]}
                  text={text}
                  textStyle={[
                    styles.multioptionText,
                    selected ? {color: COLOR.WHITE} : null,
                  ]}
                  onPress={() => {
                    const goToQuestion =
                      typeof option === 'string'
                        ? null
                        : parseInt(option.$.goto, 10) - 1; // minus one because we are on index value
                    this.setState({answer: text, goToQuestion: goToQuestion});
                  }}
                />
              );
            })}
          </View>
        );
    }
  }

  render() {
    const {question, survey, answer} = this.state;
    const {id, type, mandatory} = question.$;
    const {options} = question;
    const isMandatory = mandatory === '1';
    const canContinue = !isMandatory || (isMandatory && answer != null);

    return (
      <SafeAreaView style={styles.container}>
        <Header
          navigation={this.props.navigation}
          title={survey.title[0]}
          showInfoColumn={false}
          horizontalMark={true}
        />
        <View style={styles.surveyContainer}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{`${question.text[0]} ${
              isMandatory ? '*' : ''
            }`}</Text>
            <View style={styles.multioptionNote}>
              {type === 'multioption' && (
                <Text style={styles.multioptionNoteText}>
                  Por favor elige una opción
                </Text>
              )}
            </View>

            <View
              style={[
                styles.inputQuestion,
                type === 'multioption' ? styles.multioptionQuestion : null,
              ]}>
              <KeyboardAwareScrollView
                contentContainerStyle={styles.keyboardAware}>
                {this.renderQuestionType(type, isMandatory, options)}
              </KeyboardAwareScrollView>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              buttonStyle={[
                styles.button,
                !canContinue ? styles.disabledButton : null,
              ]}
              textStyle={[
                styles.colorWhite,
                !canContinue ? styles.disabledText : null,
              ]}
              text={'Siguiente'}
              onPress={this.goToNextPage}
              disabled={!canContinue}
            />
          </View>
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
    createEvidence: (evidence) => dispatch(createEvidence(evidence)),
    updateEvidence: (evidence) => dispatch(updateEvidence(evidence)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyComponent);
