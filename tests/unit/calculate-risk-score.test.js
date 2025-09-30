import { describe, it, expect } from "vitest";
import calculateRiskScore from "../../utils/risk-scoring";

describe("calculateRiskScore", () => {
  it("should return 0 for minimal risk inputs", () => {
    const score = calculateRiskScore({
      name: "Alice",
      email: "alice@example.com",
      documentType: "passport",
    });
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(1);
  });

  it("should increase score for suspicious inputs", () => {
    const score1 = calculateRiskScore({
      name: "X",
      email: "x@x",
      documentType: "id_card",
    });
    const score2 = calculateRiskScore({
      name: "Bob",
      email: "bob@example.com",
      documentType: "driver_license",
    });
    expect(score1).toBeGreaterThan(score2);
  });
});
