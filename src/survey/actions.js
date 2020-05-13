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
