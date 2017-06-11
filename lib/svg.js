// Native
const path = require('path');
const fs = require('fs');
// External
const xml2js = require('xml2js');
// Project
const Node = require('./node');
const {allCategories, allTypes} = require('./utils/nodeTypes');

// Parser
const parser = new xml2js.Parser();

/**
 * Class that represent a node in the tree of the SVG
 */
class SVG extends Node {
  /**
   * Data of the node.
   *
   * @param {string} svgString A string with the content of the SVG file
   * @param {string} filePath The path of the current file
   */
  constructor(svgString, filePath = '') {
    // Output
    let error;
    let data;

    // Parse the XML!
    parser.parseString(svgString, (err, result) => {
      if (err) {
        error = err;
      } else {
        data = result;
      }
    });

    // Check the error
    if (error) {
      throw new Error(
        `The provided SVG file is not valid. Reason:\n${error.message}`);
    }

    // Base properties
    super('svg', data.svg);

    if (filePath !== '') {
      // Store additional data
      let fileStats = fs.statSync(__dirname, filePath);

      // Store data
      this.filePath = path.resolve(filePath);
      this.fileName = path.basename(filePath);
      this.fileSize = fileStats.size;
      this.fileInfo = true;
    } else {
      this.fileInfo = false;
    }
  }

  /**
   * Generate the stats of the project!
   *
   * @param {bool} includeAll Include empty elements in the stats
   * @return {object} An object with the stats of the SVG file
   */
  getStats(includeAll = false) {
    let stats = {totalNodes: this.nodeCount() + 1};

    // Get type elements
    let count = this.countTypes();

    // The user want to fill the types and categories with 0.
    if (includeAll) {
      // Cache
      stats.types = {};
      stats.categories = {};

      // Types
      allTypes().forEach((type) => {
        stats.types[type] = count.types[type] || 0;
      }, this);
      // Categories
      allCategories().forEach((category) => {
        stats.categories[category] = count.categories[category] || 0;
      }, this);
    } else {
      // Just add non zero values
      stats.types = count.types;
      stats.categories = count.categories;
    }

    return stats;
  }

  /**
   * Return an object with the result of the node.
   *
   * @param {bool} includeAll Include empty elements in the stats object
   * @return {object} An object with the report of the SVG
   */
  report(includeAll = false) {
    let result = {
      stats: this.getStats(includeAll),
      nodes: super.report(),
    };

    // Only add the file information if it's available
    if (this.fileInfo) {
      result.file = {
        name: this.fileName,
        path: this.filePath,
        size: this.fileSize,
      };
    }

    return result;
  }
}

// Export the class
module.exports = SVG;
