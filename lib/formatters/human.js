// Dependencies
// External
const colors = require('colors/safe');
const Tree = require('ascii-tree');
const Table = require('cli-table');
// Project
const {
  typesByCategory,
  colorizeCategory,
  colorizeType,
} = require('../utils/nodeTypes');

/**
 * Return a title for the given string
 *
 * @param {string} str Title
 * @return {string} Title with the color and linebreaks
 */
const title = (str) => `\n${colors.cyan(str)}\n`;

/**
 * Return the properties of a node to be displayed in the tree view
 *
 * @param {object} node Node instance
 * @return {string} Properties of the given node.
 */
const propertiesForTree = (node) => {
  let output = '';
  Object.keys(node.properties).forEach((prop) => {
    if (prop !== 'id') {
      let value = node.properties[prop];
      value = value.length > 20 ? `${value.substring(0, 17)}...` : value;
      output += `${prop}=${value} `;
    }
  }, this);

  return colors.bold(output);
};

/**
 * Format the nodes in a way that ascii-tree understand
 *
 * @param {object} node Node instance
 * @param {boolean} showId Display the ID of the node
 * @param {boolean} showProps Display the properties of the node
 * @param {integer} level Deep level of the node
 * @return {string} Formatted string for ascii-tree
 */
const nodesForTree = (node, showId, showProps, level = 1) => {
  let output = `${'#'.repeat(level)}${node.colorizedType()}`;

  if (node.properties.id && showId) {
    output += ` ${colors.bold('#' + node.properties.id)}`;
  }

  if (node.properties && showProps) {
    output += ` | ${propertiesForTree(node)}`;
  }

  // Add a \n to jump to the next element
  output += `\n`;

  node.children.forEach((child) => {
    output += nodesForTree(child, showId, showProps, level + 1);
  }, this);
  // Final output
  return output;
};

/**
 * Draw the tree legend
 *
 * @return {string} Table with the legend of colors for the node tree
 */
const treeLegend = () => {
  let table = new Table();
  let categories = [];

  Object.keys(typesByCategory).forEach((category) => {
    categories.push(colorizeCategory(category, category));
  }, this);

  let legend = colors.bold.cyan('Legend');

  table.push(
    {[legend]: categories.slice(0, categories.length / 2)},
    {'': categories.slice((categories.length / 2) + 1)}
  );

  // Return the output of the table
  return table.toString();
};

/**
 * Format the result of the CLI.
 *
 * @param {SVG} svg SVG Instance
 * @param {object} options Options for the formatter from the ARGV
 * @return {string} Information of the SVG as a string ready for
 *                  display in the console.
 */
const format = (svg, options) => {
  let output = '';
  let report = svg.report(options.allStats);
  let all = (!options.tree && !options.stats && !options.basic);

  // Main table
  if (all || options.basic) {
    output += title('Basic information');
    let table = new Table();
    table.push(
      ['Name', report.file.name],
      ['Path', report.file.path],
      ['Size', report.file.size]
    );
    output += `${table.toString()}\n`;
  }

  // Statistics
  if (all || options.stats) {
    output += title('Node statistics');
    table = new Table();
    table.push(
      ['Total Nodes', report.stats.totalNodes]
    );
    output += `${table.toString()}\n`;

    // Add stats by types
    table = new Table({
      head: [colors.bold.cyan('Type'), colors.bold.cyan('Count')],
    });
    Object.keys(report.stats.types).forEach((type) => {
      table.push(
        [colorizeType(type), report.stats.types[type]]
      );
    }, this);
    output += `${table.toString()}\n`;

    // Add stats by category
    table = new Table({
      head: [colors.bold.cyan('Category'), colors.bold.cyan('Count')],
    });
    Object.keys(report.stats.categories).forEach((category) => {
      table.push(
        [colorizeCategory(category, category),
         report.stats.categories[category]]
      );
    }, this);
    output += `${table.toString()}\n`;
  }

  // Tree
  if (all || options.tree) {
    output += title('Node tree');
    output += `${Tree.generate(nodesForTree(svg, options.ids, options.props))}`;

    if (options.legend) {
      output += `\n${treeLegend()}\n`;
    }
  }

  return output;
};

module.exports = format;
