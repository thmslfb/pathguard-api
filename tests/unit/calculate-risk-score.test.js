import { describe, it, expect } from "vitest";
import calculateRiskScore from "../../utils/risk-scoring";

describe("calculateRiskScore", () => {
  it("returns the base weight for benign inputs (id_card)", () => {
    const score = calculateRiskScore({
      name: "Alice Dupont",
      email: "alice.dupont@company.com",
      documentType: "id_card",
    });
    expect(score).toBe(0.1);
  });

  it("returns higher score for passport than for id_card when inputs are otherwise equal", () => {
    const idCardScore = calculateRiskScore({
      name: "Alice Dupont",
      email: "alice.dupont@company.com",
      documentType: "id_card",
    });
    const passportScore = calculateRiskScore({
      name: "Alice Dupont",
      email: "alice.dupont@company.com",
      documentType: "passport",
    });
    expect(passportScore).toBeGreaterThan(idCardScore);
  });

  it("penalizes invalid email formats on top of document weight", () => {
    const validEmailScore = calculateRiskScore({
      name: "Bob Martin",
      email: "bob.martin@company.com",
      documentType: "id_card",
    });
    const invalidEmailScore = calculateRiskScore({
      name: "Bob Martin",
      email: "bob-at-company.com",
      documentType: "id_card",
    });
    expect(invalidEmailScore).toBeGreaterThan(validEmailScore);
    expect(invalidEmailScore).toBeCloseTo(0.3);
  });

  it("penalizes disposable email domains more than generic ones", () => {
    const genericScore = calculateRiskScore({
      name: "Dana",
      email: "dana@gmail.com",
      documentType: "id_card",
    });
    const disposableScore = calculateRiskScore({
      name: "Dana",
      email: "dana@mailinator.com",
      documentType: "id_card",
    });
    expect(disposableScore).toBeGreaterThan(genericScore);
  });

  it("penalizes names with unusual characters", () => {
    const normalNameScore = calculateRiskScore({
      name: "Charlie Brown",
      email: "charlie@company.com",
      documentType: "id_card",
    });
    const specialCharScore = calculateRiskScore({
      name: "Charlie123!",
      email: "charlie@company.com",
      documentType: "id_card",
    });
    expect(specialCharScore).toBeGreaterThan(normalNameScore);
  });

  it("returns a score > 0.5 for highly suspicious inputs", () => {
    const score = calculateRiskScore({
      name: "",
      email: "spammer@mailinator.com",
      documentType: "unknown",
    });
    expect(score).toBeGreaterThanOrEqual(0.6);
  });

  it("never exceeds a score of 1", () => {
    const score = calculateRiskScore({
      name: "",
      email: "invalid",
      documentType: "unknown",
    });
    expect(score).toBeLessThanOrEqual(1);
  });
});
