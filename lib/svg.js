// Node class
const
  // Native
  path = require('path'),
  fs = require('fs'),
  // Project
  Node = require('./node');

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
   * Return an object with the result of the node.
   */
  report() {
    return {
      file: {
        name: this.fileName,
        path: this.filePath,
        size: this.fileSize,
      },
      totalNodes: this.nodeCount(),
      nodes: super.report()
    }
  }
}

// Export the class
module.exports = SVG;
