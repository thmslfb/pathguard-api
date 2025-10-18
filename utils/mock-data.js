const mockVerifications = [
  {
    verification_id: "ver_52042584-e3ff-43c3-a6f0-bb9923dcadb7",
    status: "approved",
    risk_score: "0.100",
    created_at: "2025-10-17T11:34:32.976Z",
    updated_at: "2025-10-17T11:34:32.976Z",
  },
  {
    verification_id: "ver_b894d8c3-b5b4-466e-8116-e3332d2679cf",
    status: "pending_review",
    risk_score: "0.350",
    created_at: "2025-10-17T15:00:24.925Z",
    updated_at: "2025-10-17T15:00:24.925Z",
  },
  {
    verification_id: "ver_6e281e49-cb9c-49f8-9f7b-d0e76003148d",
    status: "rejected",
    risk_score: "0.600",
    created_at: "2025-10-17T15:04:22.055Z",
    updated_at: "2025-10-17T15:04:22.055Z",
  },
];

const getMockVerifications = (limit = 100, offset = 0) => {
  return mockVerifications.slice(offset, offset + limit);
};

const getMockVerificationById = (id) => {
  return (
    mockVerifications.find(
      (verification) => verification.verification_id === id
    ) || null
  );
};

const updateMockVerificationStatus = (id, newStatus) => {
  const verification = mockVerifications.find((v) => v.verification_id === id);
  if (verification) {
    return {
      ...verification,
      status: newStatus,
      updated_at: new Date().toISOString(),
    };
  }
  return null;
};

const deleteMockVerificationById = (id) => {
  const exists = mockVerifications.some((v) => v.verification_id === id);
  return exists ? { message: "Verification deleted successfully" } : null;
};

module.exports = {
  getMockVerifications,
  getMockVerificationById,
  updateMockVerificationStatus,
  deleteMockVerificationById,
};
