// Dependencies
const
  // Project
  { typeCategory, colorizeType } = require('./utils/nodeTypes');

/**
 * Identify a node inside the SVG file
 */
class Node {
  /**
   * Initialize the data and the children nodes
   *
   * @param {string} type Type of the SVG node
   * @param {object} data Properties and children of the SVG Node
   */
  constructor(type, data, parent) {
    this.type = type;
    this.properties = data.$;
    this.parent = parent;
    this.text = '';
    this.category = typeCategory(type);
    // Create the array of children
    this.children = [];

    Object.keys(data).filter(el => el !== '$').forEach(childType => {
      // Iterate over child
      if (typeof data[childType] === 'string') {
        this.text = data[childType];
      } else if (Array.isArray(data[childType])) {
        data[childType].forEach(child => {
          this.children.push(new Node(childType, child, this));
        }, this);
      } else {
        throw new Error(`Unknown content for ${this.type}: ${data[childType]}`);
      }
    }, this);
  }

  /**
   * Get siblings
   */
  get siblings() {
    return this.parent.children.filter(node => node !== this, this);
  }

  /**
   * Return the number of Nodes. It iterates over the children and cache the result
   */
  nodeCount() {
    if (this.total) { return this.total; }

    let counter = this.children.length;
    this.children.forEach(child => {
      counter += child.nodeCount()
    }, this);

    // Cache the value
    this.total = counter;
    return this.total;
  }

  /**
   * Return a colored version of the type for the tree view.
   */
  colorizedType() {
    return colorizeType(this.type, this.category);
  }

  /**
   * Return a report of the current node
   */
  report() {
    return {
      type: this.type,
      category: this.category,
      properties: this.properties,
      children: this.childrenReport()
    }
  }

  /**
   * Get the report of the children nodes
   */
  childrenReport() {
    return this.children.map(child => child.report());
  }
}

// Export the class
module.exports = Node;
