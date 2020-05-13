export const setInstructionsAccepted = (accepted) => ({
  type: 'LOGIN',
  accepted: accepted,
});

export const setUser = (user) => ({
  type: 'USER',
  user: user,
});

export const setChallenges = (challenges) => ({
  type: 'CHALLENGES',
  challenges: challenges,
});

export const setSurvey = (surveyJson, challengeId) => ({
  type: 'SURVEY',
  surveyJson: surveyJson,
  challengeId: challengeId,
});
