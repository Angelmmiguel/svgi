// Node class
const
  // Native
  path = require('path'),
  fs = require('fs'),
  // Project
  Node = require('./node'),
  { allCategories, allTypes } = require('./utils/nodeTypes');

/**
 * Class that represent a node in the tree of the SVG
 */
class SVG extends Node {
  /**
   * Data of the node.
   */
  constructor(filePath, data) {
    // Base properties
    super('svg', data.svg);

    // Store additional data
    let fileStats = fs.statSync(__dirname, filePath);

    // Store data
    this.filePath = path.resolve(filePath);
    this.fileName = path.basename(filePath);
    this.fileSize = fileStats.size;
  }

  /**
   * Generate the stats of the project!
   *
   * @param {bool} includeAll Include empty elements in the stats
   */
  getStats(includeAll = false) {
    let stats = { totalNodes: this.nodeCount() + 1 };

    // Get type elements
    let count = this.countTypes();

    // The user want to fill the types and categories with 0.
    if (includeAll) {
      // Cache
      stats.types = {};
      stats.categories = {};

      // Types
      allTypes().forEach(type => {
        stats.types[type] = count.types[type] || 0;
      }, this);
      // Categories
      allCategories().forEach(category => {
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
   */
  report(includeAll = false) {
    return {
      file: {
        name: this.fileName,
        path: this.filePath,
        size: this.fileSize,
      },
      stats: this.getStats(includeAll),
      nodes: super.report()
    }
  }
}

// Export the class
module.exports = SVG;
