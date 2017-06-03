#!/usr/bin/env node

// Requires (Native)
const fs = require('fs'),
  // External
  xml2js = require('xml2js'),
  ascii = require('colors/safe'),
  commander = require('commander'),
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
    parser.parseString(data, (err, result) => {
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
    });
  })
}

// Parse options and run the CLI
commander
  .option('-o, --output <formatter>', 'Select the format of the output: json, yaml, or human (default)',
          /^(json|yaml|human)$/i, 'human')
  .option('-t, --tree', 'Display only the node tree')
  .option('-b, --basic', 'Display only the basic information')
  .option('-s, --stats', 'Display only the node statistics')
  .arguments('<file>')
  .action(app)
  .parse(process.argv);
