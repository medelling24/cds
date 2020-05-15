export const createEvidence = (evidence) => ({
  type: 'CREATE',
  evidence: evidence,
});

export const updateEvidence = (evidence) => ({
  type: 'UPDATE',
  evidence: evidence,
});

export const addEvidence = (evidence) => ({
  type: 'ADD',
  evidence: evidence,
});

export const updateSyncEvidence = (evidence) => ({
  type: 'UPDATE_SYNC',
  evidence: evidence,
})
