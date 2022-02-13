import { assert, expect, test } from "vitest";
import SVG from "../lib/svg";

// Test data
const testSVG = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="80" height="80" viewBox="0 0 80 80"><circle cx="0" cy="0" r="40" /></svg>`;

test("SVG parses SVG as a string and provide stats", () => {
  const svg = new SVG(testSVG);
  const stats = svg.getStats();

  expect(stats.totalNodes).toBe(2);
  expect(stats.types.svg).toBe(1);
  expect(stats.types.circle).toBe(1);
  expect(stats.categories.containers).toBe(1);
  expect(stats.categories.shapes).toBe(1);
});
