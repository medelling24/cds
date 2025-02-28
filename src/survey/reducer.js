import {Evidence} from '../shared/classes';

const initialState = {
  inProgressEvidence: Evidence,
  currentEvidence: Evidence,
  allEvidences: [],
};

const evidences = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE': {
      return {
        ...state,
        inProgressEvidence: action.evidence,
      };
    }
    case 'UPDATE': {
      return {
        ...state,
        inProgressEvidence: {...state.currentEvidence, ...action.evidence},
      };
    }
    case 'ADD': {
      return {
        ...state,
        currentEvidence: action.evidence,
        allEvidences: [...state.allEvidences, action.evidence],
      };
    }
    case 'UPDATE_SYNC': {
      return {
        ...state,
        currentEvidence: action.evidence,
        allEvidences: state.allEvidences.map((e) => {
          if (e.id === action.evidence.id) {
            e.isSync = true;
          }
          return e;
        }),
      };
    }
    default: {
      return state;
    }
  }
};

export default evidences;
