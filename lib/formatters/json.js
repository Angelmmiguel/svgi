/**
 * Format the result of the CLI.
 *
 * @param {SVG} svg SVG Instance
 * @param {object} options Options for the formatter from the ARGV
 * @return {String} JSON object as a string ready for display in the console.
 */
const format = (svg, options) => {
  let output = {};
  let report = svg.report(options.allStats);
  let all = (!options.tree && !options.stats && !options.basic);

  if (all || options.basic) {
    output.file = report.file;
  }

  if (all || options.stats) {
    output.stats = report.stats;
  }

  if (all || options.tree) {
    output.nodes = report.nodes;
  }

  return JSON.stringify(output, null, 2);
};

module.exports = format;
