import { assert, expect, test } from "vitest";
import SVG from "../lib/svg";

// Test data
const testSVG = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="80" height="80" viewBox="0 0 80 80">
  <rect x="0" y="0" width="48" height="48"/>
  <circle cx="24" cy="24" r="24"/>
  <rect x="16" y="16" width="16" height="16" />
</svg>`;

test("SVG parses SVG file as a string and maintain the ordering of the children nodes", () => {
  const svg = new SVG(testSVG);
  const report = svg.report();

  expect(report.nodes.children[0].type).toBe("rect");
  expect(report.nodes.children[1].type).toBe("circle");
  expect(report.nodes.children[2].type).toBe("rect");
});
