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
          output = JSONFormatter(svg);
          break;
        case 'yaml':
          output = YAMLFormatter(svg);
          break;
        default:
          output = humanFormatter(svg);
      }

      // Display the output
      console.log(output);
    });
  })
}

// Parse options and run the CLI
commander
  .option('-o, --output <formatter>', 'Select the format of the output: json, yaml, or human',
          /^(json|yaml|human)$/i, 'human')
  .arguments('<file>')
  .action(app)
  .parse(process.argv);
