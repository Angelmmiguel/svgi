// Dependencies
const
  // External
  YAML = require('js-yaml');

/**
 * Format the result of the CLI.
 *
 * @param {SVG} svg SVG Instance
 */
const format = (svg, options) => {
  let output = {},
    report = svg.report(options.allStats),
    all = (!options.tree && !options.stats && !options.basic);

  if (all || options.basic) {
    output.file = report.file;
  }

  if (all || options.stats) {
    output.stats = report.stats;
  }

  if (all || options.tree) {
    output.nodes = report.nodes;
  }

  return YAML.dump(output);
}

module.exports = format;
