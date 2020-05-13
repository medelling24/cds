import {isEqual, intersectionWith} from 'lodash';

export const riskTable = [
  {binary: '00000', risk: 'Sin Riesgo', level: 1},
  {binary: '00001', risk: 'Sin Riesgo', level: 1},
  {binary: '00100', risk: 'Sin Riesgo', level: 1},
  {binary: '00101', risk: 'Sin Riesgo', level: 1},
  {binary: '10000', risk: 'Riesgo Bajo', level: 2},
  {binary: '10001', risk: 'Riesgo Bajo', level: 2},
  {binary: '10100', risk: 'Riesgo Bajo', level: 2},
  {binary: '10101', risk: 'Riesgo Bajo', level: 2},
  {binary: '01000', risk: 'Riesgo Medio', level: 3},
  {binary: '01100', risk: 'Riesgo Medio', level: 3},
  {binary: '11000', risk: 'Riesgo Medio', level: 3},
  {binary: '11100', risk: 'Riesgo Medio', level: 3},
  {binary: '01001', risk: 'Riesgo Alto', level: 4},
  {binary: '01010', risk: 'Riesgo Alto', level: 4},
  {binary: '01101', risk: 'Riesgo Alto', level: 4},
  {binary: '01110', risk: 'Riesgo Alto', level: 4},
  {binary: '10010', risk: 'Riesgo Alto', level: 4},
  {binary: '10110', risk: 'Riesgo Alto', level: 4},
  {binary: '11010', risk: 'Riesgo Alto', level: 4},
  {binary: '11110', risk: 'Riesgo Alto', level: 4},
  {binary: '01011', risk: 'Riesgo Grave', level: 5},
  {binary: '01111', risk: 'Riesgo Grave', level: 5},
  {binary: '10011', risk: 'Riesgo Grave', level: 5},
  {binary: '10111', risk: 'Riesgo Grave', level: 5},
  {binary: '11001', risk: 'Riesgo Grave', level: 5},
  {binary: '11011', risk: 'Riesgo Grave', level: 5},
  {binary: '11101', risk: 'Riesgo Grave', level: 5},
  {binary: '11111', risk: 'Riesgo Grave', level: 5},
  {binary: '00010', risk: 'Riesgo Respiratorio', level: 6},
  {binary: '00011', risk: 'Riesgo Respiratorio', level: 6},
  {binary: '00110', risk: 'Riesgo Respiratorio', level: 6},
  {binary: '00111', risk: 'Riesgo Respiratorio', level: 6},
];

const contact = [
  {section: 1, question: 0},
  {section: 1, question: 1},
  {section: 1, question: 2},
];

const symptoms = [
  {section: 1, question: 3},
  {section: 1, question: 4},
  {section: 1, question: 5},
];

const vulnerability = [
  {section: 1, question: 6},
  {section: 1, question: 7},
];

const getRisk = (binaryString) =>
  riskTable.find((r) => r.binary === binaryString);

const convertArrayToString = (binaryArray) => binaryArray.join('');

const calculateContactValue = (answers) => {
  const questions = intersectionWith(
    answers,
    contact,
    (a, b) => a.section === b.section && a.question === b.question,
  );
  return questions.every((a) => a.answer === 'No') ? 0 : 1;
};

const calculateVulnerabilityValue = (answers) => {
  const questions = intersectionWith(
    answers,
    vulnerability,
    (a, b) => a.section === b.section && a.question === b.question,
  );
  return questions.every((a) => a.answer === 'No') ? 0 : 1;
};

const calculateSymptomsValue = (answers) => {
  const questions = intersectionWith(
    answers,
    symptoms,
    (a, b) => a.section === b.section && a.question === b.question,
  );

  const value = [];
  questions.forEach((a) => {
    value.push(a.answer !== 'No' ? 1 : 0);
  });
  return value;
};

export const calculateRisk = (answers) => {
  const binaryRisk = [
    calculateContactValue(answers),
    ...calculateSymptomsValue(answers),
    calculateVulnerabilityValue(answers),
  ];
  const binaryString = convertArrayToString(binaryRisk);
  return getRisk(binaryString);
}
