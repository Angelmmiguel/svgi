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

const parseStdin = () => {
  return new Promise((resolve, reject) => {
    let data = '';
    
    process.stdin.on('data', (chunk) => {
      data += chunk;
    });

    process.stdin.on('error', (error) => {
      reject(`${colors.red('[Error]')} There was an error parsing the STDIN data: ${error}`);
    });

    process.stdin.on('end', function() {
      resolve(data);
    });
  });
};

const parseFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        switch(err.code) {
          case 'ENOENT':
            reject(`${colors.red('[Error]')} There file ${filePath} doesn't exist`);
            break;
          default:
            reject(`${colors.red('[Error]')} There was an error opening the ` +
              `file: ${err.message}`);
        }
      } else {
        resolve(data);
      }
    });
  });
};

// Declare the app
const app = (filePath) => {
  let dataPromise;

  if (!process.stdin.isTTY) {
    dataPromise = parseStdin()
  } else if (filePath) {
    dataPromise = parseFile(filePath)
  } else {
    commander.help();
  }

  dataPromise
    .then((data) => {
        let svg = new SVG(data, filePath);
        let output;

        if(filePath && !process.stdin.isTTY) {
          commander.dualInputs = true;
        };

        switch (commander.output) {
          case 'json':
            output = jsonFormatter(svg, commander);
            break;
          case 'yaml':
            output = yamlFormatter(svg, commander);
            break;
          default:
            output = humanFormatter(svg, commander);
        }

        // Display the output
        console.log(output);
    })
    .catch(console.error);
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
  .arguments('[file]')
  .action(app)
  .parse(process.argv);

// If the argument is not passed, commander does not call app,
// so it must be called manually here
if (commander.args.length === 0) {
  app();
}
