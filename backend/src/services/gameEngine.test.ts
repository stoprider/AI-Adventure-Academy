import test from "node:test";
import assert from "node:assert/strict";
import { calculatePromptScore, determineLevelFromXp, evaluateMission } from "./gameEngine.js";

test("calculatePromptScore rewards keyword coverage and detail", () => {
  const result = calculatePromptScore("A friendly robot student in a bright classroom", [
    "robot",
    "student",
    "classroom",
    "friendly"
  ]);

  assert.equal(result.matchedKeywords.length, 4);
  assert.ok(result.score >= 70);
});

test("evaluateMission marks a strong answer as completed", () => {
  const result = evaluateMission("lvl3-space-cat", "A cute cat astronaut floating in space near a glowing planet");

  assert.equal(result.completed, true);
  assert.ok(result.score >= 60);
  assert.ok(result.xpEarned > 0);
  assert.ok(result.coinsEarned > 0);
});

test("evaluateMission returns partial rewards for weak answers", () => {
  const result = evaluateMission("lvl3-space-cat", "cat");

  assert.equal(result.completed, false);
  assert.ok(result.xpEarned < 30);
  assert.ok(result.coinsEarned < 20);
});

test("determineLevelFromXp follows expected thresholds", () => {
  assert.equal(determineLevelFromXp(0), 1);
  assert.equal(determineLevelFromXp(50), 2);
  assert.equal(determineLevelFromXp(100), 3);
  assert.equal(determineLevelFromXp(230), 5);
  assert.equal(determineLevelFromXp(999), 7);
});
