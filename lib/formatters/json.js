/**
 * Format the result of the CLI.
 *
 * @param {SVG} svg SVG Instance
 */
const format = svg => {
  return JSON.stringify(svg.report(), null, 2);
}

module.exports = format;
