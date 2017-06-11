#!/usr/bin/env node

// Requires (Native)
const fs = require('fs');
// External
const commander = require('commander');
const colors = require('colors/safe');
// Project
const humanFormatter = require('../lib/formatters/human');
const jsonFormatter = require('../lib/formatters/json');
const yamlFormatter = require('../lib/formatters/yaml');
const SVG = require('../lib/svg');

// Declare the app
const app = (filePath, options) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      switch (err.code) {
        case 'ENOENT':
          console.error(
            `${colors.red('[Error]')} There file ${filePath} doesn't exist`);
          break;
        default:
          console.error(
            `${colors.red('[Error]')} There was an error opening the ` +
            `file: ${err.message}`);
      }
    } else {
      // Load the SVG
      try {
        let svg = new SVG(data, filePath);
        let output;

        switch (options.output) {
          case 'json':
            output = jsonFormatter(svg, options);
            break;
          case 'yaml':
            output = yamlFormatter(svg, options);
            break;
          default:
            output = humanFormatter(svg, options);
        }

        // Display the output
        console.log(output);
      } catch (err) {
        console.log(err);
      }
    }
  });
};

// Parse options and run the CLI
commander
  .option('-o, --output <formatter>',
          'Select the format of the output: json, yaml, or human (default)',
          /^(json|yaml|human)$/i, 'human')
  .option('-t, --tree', 'Display only the node tree')
  .option('-b, --basic', 'Display only the basic information')
  .option('-s, --stats', 'Display only the node statistics')
  .option('--all-stats', 'Return types and categories with 0 ' +
                         'ocurrences in the stats object')
  .option('--ids', 'Show the IDs of the nodes in the tree view. ' +
                   'Only available for human formatter')
  .option('--props', 'Show the properties of the nodes in the tree view. ' +
                     ' Only available for human formatter')
  .option('--legend', 'Show the tree color legend. Only available for human ' +
                      'formatter')
  .arguments('<file>')
  .action(app)
  .parse(process.argv);
