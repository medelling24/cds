import {createSelector} from 'reselect';

const evidenceState = (state) => state.evidences;

export const currentEvidenceSelector = createSelector(
  evidenceState,
  (state) => state.currentEvidence,
);

export const inProgressEvidenceSelector = createSelector(
  evidenceState,
  (state) => state.inProgressEvidence,
);

export const allEvidencesSelector = createSelector(
  evidenceState,
  (state) => state.allEvidences,
);

export const evidencesNotSyncedSelector = createSelector(
  evidenceState,
  (state) => state.allEvidences.filter((e) => !e.isSync),
);
