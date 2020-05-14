const RNFS = require('react-native-fs');
const builder = require('xmlbuilder');

export const generateXml = (evidence) => {
  const {survey, surveyAnswers} = evidence;
  let index = 0;
  const topics = survey.sections[0].section.map((s, sectionIndex) => {
    const questions = s.questions[0].question.map((q, questionIndex) => {
      index += 1;
      const answer = surveyAnswers.find(
        (a) => a.section === sectionIndex && a.question === questionIndex,
      );

      return {
        text: q.text[0],
        answer: (answer && answer.answer) || 'Sin respuesta',
        note: q.note[0],
        '@id': index,
      };
    });
    return {
      question: [...questions],
      '@name': s.title[0],
    };
  });
  const xmlObj = {
    survey: {
      '@version': survey.$.version,
    },
    topic: [...topics],
  };
  const feed = builder.create(xmlObj, {encoding: 'utf-8'});
  const xml = feed.end({pretty: true});

  const path = RNFS.DocumentDirectoryPath + '/' + evidence.id;

  // write the file
  return RNFS.writeFile(path, xml, 'utf8');
    /*.then((success) => {
      console.log('FILE WRITTEN!');
    })
    .catch((err) => {
      console.log(err.message);
    });*/
};
