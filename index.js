#!/usr/bin/env node

// Requires (Native)
const fs = require('fs'),
  // External
  xml2js = require('xml2js'),
  ascii = require('colors/safe'),
  commander = require('commander'),
  colors = require('colors/safe'),
  // Project
  humanFormatter = require('./lib/formatters/human'),
  JSONFormatter = require('./lib/formatters/json'),
  YAMLFormatter = require('./lib/formatters/yaml'),
  SVG = require('./lib/svg');

// Parser
const parser = new xml2js.Parser();

// Declare the app
const app = (filePath, options) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      switch(err.code) {
        case 'ENOENT':
          console.error(`${colors.red('[Error]')} There file ${filePath} doesn't exist`);
          break;
        default:
          console.error(`${colors.red('[Error]')} There was an error opening the file: ${err.message}`);
      }
    } else {
      parser.parseString(data, (err, result) => {
        if (err) {
          console.error(`${colors.red('[Error]')} The provided SVG file is not valid. Reason:\n${err.message}`)
        } else {
          // Load the SVG
          let svg = new SVG(filePath, result),
            output;

          switch(options.output) {
            case 'json':
              output = JSONFormatter(svg, options);
              break;
            case 'yaml':
              output = YAMLFormatter(svg, options);
              break;
            default:
              output = humanFormatter(svg, options);
          }

          // Display the output
          console.log(output);
        }
      });
    }
  });
}

// Parse options and run the CLI
commander
  .option('-o, --output <formatter>', 'Select the format of the output: json, yaml, or human (default)',
          /^(json|yaml|human)$/i, 'human')
  .option('-t, --tree', 'Display only the node tree')
  .option('-b, --basic', 'Display only the basic information')
  .option('-s, --stats', 'Display only the node statistics')
  .option('--all-stats', 'Return types and categories with 0 ocurrences in the stats object')
  .option('--ids', 'Show the IDs of the elements in the tree view. Only available for human formatter')
  .option('--legend', 'Show the tree color legend. Only available for human formatter')
  .arguments('<file>')
  .action(app)
  .parse(process.argv);
