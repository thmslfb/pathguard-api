const mockVerifications = [
  {
    verification_id: "ver_123e4567-e89b-12d3-a456-426614174000",
    status: "approved",
    risk_score: 0.1,
    created_at: "2025-10-05T14:30:00.000Z",
  },
  {
    verification_id: "ver_987fcdeb-51a2-43f1-b987-123456789abc",
    status: "approved",
    risk_score: 0.2,
    created_at: "2025-10-05T13:15:00.000Z",
  },
  {
    verification_id: "ver_456def78-90ab-12cd-34ef-567890abcdef",
    status: "pending_review",
    risk_score: 0.35,
    created_at: "2025-10-05T12:45:00.000Z",
  },
  {
    verification_id: "ver_789abcde-12fg-34hi-56jk-789012345678",
    status: "rejected",
    risk_score: 0.6,
    created_at: "2025-10-05T11:20:00.000Z",
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

module.exports = { getMockVerifications, getMockVerificationById };
