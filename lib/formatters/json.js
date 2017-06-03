/**
 * Format the result of the CLI.
 *
 * @param {SVG} svg SVG Instance
 */
const format = (svg, options) => {
  let output = {},
    report = svg.report(),
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

  return JSON.stringify(output, null, 2);
}

module.exports = format;
