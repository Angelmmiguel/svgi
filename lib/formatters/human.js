// Dependencies
const
  // External
  colors = require('colors/safe'),
  Tree = require('ascii-tree'),
  Table = require('cli-table');

/**
 * Return a title for the given string
 */
const title = str => `\n${colors.cyan(str)}\n`;

/**
 * Return the nodes in a way that ascii-tree understand
 */
const nodesForTree = (node, level = 1) => {
  let output = `${'#'.repeat(level)}${node.type}\n`;
  node.children.forEach(child => {
    output += nodesForTree(child, level + 1);
  }, this);
  // Final output
  return output;
}

/**
 * Format the result of the CLI.
 *
 * @param {SVG} svg SVG Instance
 */
const format = svg => {
  let output = '',
    report = svg.report();

  // Main table
  output += title('Basic information');
  let table = new Table();
  table.push(
    ['Name', report.file.name],
    ['Path', report.file.path],
    ['Size', report.file.size]
  );
  output += table.toString();

  // Statistics
  output += `\n${title('Node statistics')}`;
  table = new Table();
  table.push(
    ['Total Nodes', report.totalNodes]
  );
  output += table.toString();

  // Tree
  output += `\n${title('Node tree')}`;
  output += Tree.generate(nodesForTree(svg));

  return output;
}

module.exports = format;
