/**
 * Format the result of the CLI.
 *
 * @param {SVG} svg SVG Instance
 */
const format = svg => {
  return svg.report();
}

module.exports = format;
