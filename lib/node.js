// Dependencies
const
  // Project
  {typeCategory, colorizeType} = require('./utils/nodeTypes');

/**
 * Identify a node inside the SVG file
 */
class Node {
  /**
   * Initialize the data and the children nodes
   *
   * @param {string} type Type of the SVG node
   * @param {object} data Properties and children of the SVG Node
   * @param {object} parent Instance of the parent
   */
  constructor(type, data, parent) {
    this.type = type;
    this.properties = data.$ || {};
    this.parent = parent;
    this.text = '';
    this.category = typeCategory(type);
    // Create the array of children
    this.children = [];

    Object.keys(data).filter((el) => el !== '$').forEach((childType) => {
      // Iterate over child
      if (typeof data[childType] === 'string') {
        this.text = data[childType];
      } else if (Array.isArray(data[childType])) {
        data[childType].forEach((child) => {
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
    return this.parent.children.filter((node) => node !== this, this);
  }

  /**
   * Return the number of Nodes. It iterates over the children
   * and cache the result
   *
   * @return {integer} Return the number of children
   */
  nodeCount() {
    if (this.total) {
      return this.total;
    }

    let counter = this.children.length;
    this.children.forEach((child) => {
      counter += child.nodeCount();
    }, this);

    // Cache the value
    this.total = counter;
    return this.total;
  }

  /**
   * Count the type of the element and the children
   *
   * @param {object} types the current types counter
   * @param {object} categories the current categories counter
   * @return {object} The result of counting the type and category
   *                  of all children
   */
  countTypes(types = {}, categories = {}) {
    if (!types[this.type]) {
      types[this.type] = 1;
    } else {
      types[this.type] += 1;
    }

    if (!categories[this.category]) {
      categories[this.category] = 1;
    } else {
      categories[this.category] += 1;
    }

    this.children.forEach((child) => {
      let result = child.countTypes(types, categories);
      types = result.types;
      categories = result.categories;
    }, this);

    return {types, categories};
  }

  /**
   * Return a colored version of the type for the tree view.
   *
   * @return {string} Colorized type of the node for printing in the console
   */
  colorizedType() {
    return colorizeType(this.type, this.category);
  }

  /**
   * Return a report of the current node
   *
   * @return {object} An object with the report of the current node
   */
  report() {
    return {
      type: this.type,
      category: this.category,
      properties: this.properties,
      children: this.childrenReport(),
    };
  }

  /**
   * Get the report of the children nodes
   *
   * @return {object[]} Report of all children nodes
   */
  childrenReport() {
    return this.children.map((child) => child.report());
  }
}

// Export the class
module.exports = Node;
