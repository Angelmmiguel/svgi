// Dependencies
const
  // External
  colors = require('colors/safe'),
  Tree = require('ascii-tree'),
  Table = require('cli-table'),
  // Project
  { typesByCategory, colorizeCategory, colorizeType } = require('../utils/nodeTypes');

/**
 * Return a title for the given string
 */
const title = str => `\n${colors.cyan(str)}\n`;

/**
 * Return the nodes in a way that ascii-tree understand
 */
const nodesForTree = (node, showId, level = 1) => {
  let output = `${'#'.repeat(level)}${node.colorizedType()}`;

  if (node.properties.id && showId) {
    output += ` ${colors.bold('#' + node.properties.id)}\n`;
  }
  // Add a \n to jump to the next element
  output += `\n`;

  node.children.forEach(child => {
    output += nodesForTree(child, showId, level + 1);
  }, this);
  // Final output
  return output;
}

/**
 * Draw the tree legend
 */
const treeLegend = () => {
  let table = new Table(),
    categories = [];

  Object.keys(typesByCategory).forEach(category => {
    categories.push(colorizeCategory(category, category));
  }, this);

  let legend = colors.bold.cyan('Legend');

  table.push(
    { [legend]: categories.slice(0, categories.length / 2) },
    { '': categories.slice((categories.length / 2) + 1) }
  );

  // Return the output of the table
  return table.toString();
}

/**
 * Format the result of the CLI.
 *
 * @param {SVG} svg SVG Instance
 */
const format = (svg, options) => {
  let output = '',
    report = svg.report(options.allStats),
    all = (!options.tree && !options.stats && !options.basic);

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
      head: [colors.bold.cyan('Type'), colors.bold.cyan('Count')]
    });
    Object.keys(report.stats.types).forEach(type => {
      table.push(
        [colorizeType(type), report.stats.types[type]]
      );
    }, this);
    output += `${table.toString()}\n`;

    // Add stats by category
    table = new Table({
      head: [colors.bold.cyan('Category'), colors.bold.cyan('Count')]
    });
    Object.keys(report.stats.categories).forEach(category => {
      table.push(
        [colorizeCategory(category, category), report.stats.categories[category]]
      );
    }, this);
    output += `${table.toString()}\n`;
  }

  // Tree
  if (all || options.tree) {
    output += title('Node tree');
    output += `${Tree.generate(nodesForTree(svg, options.ids))}`;

    if (options.legend) {
      output += `\n${treeLegend()}\n`;
    }
  }

  return output;
}

module.exports = format;
