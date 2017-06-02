// Dependencies
const
  // External
  YAML = require('js-yaml');

/**
 * Format the result of the CLI.
 *
 * @param {SVG} svg SVG Instance
 */
const format = svg => {
  return YAML.dump(svg.report());
}

module.exports = format;
