const initialState = {
  hasInstructionsAccepted: false,
  user: null,
  challenges: [],
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        hasInstructionsAccepted: action.accepted,
      };
    }
    case 'USER': {
      return {
        ...state,
        user: action.user,
      };
    }
    case 'CHALLENGES': {
      return {
        ...state,
        challenges: action.challenges,
      };
    }
    case 'SURVEY': {
      const challenges = state.challenges.map((challenge) =>
        challenge.id === action.challengeId
          ? {...challenge, surveyJson: action.surveyJson}
          : challenge,
      );
      return {
        ...state,
        challenges: challenges,
      };
    }
    default: {
      return state;
    }
  }
};

export default auth;
