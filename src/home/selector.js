import {createSelector} from 'reselect';

const authState = (state) => state.auth;

export const hasInstructionsAcceptedSelector = createSelector(
  authState,
  (state) => state.hasInstructionsAccepted,
);

export const userSelector = createSelector(authState, (state) => state.user);

export const challengesSelector = createSelector(
  authState,
  (state) => state.challenges,
);
