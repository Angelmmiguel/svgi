// Dependencies
const
  // External
  colors = require('colors/safe');

/**
 * Available types in SVG
 */

const typesByCategory = {
  'animation': [
    'animate',
    'animateColor',
    'animateMotion',
    'animateTransform',
    'discard',
    'mpath',
    'set',
  ],
  'shapes': [
    'circle',
    'ellipse',
    'line',
    'mesh',
    'path',
    'polygon',
    'polyline',
    'rect',
  ],
  'containers': [
    'a',
    'defs',
    'g',
    'marker',
    'mask',
    'missing-glyph',
    'pattern',
    'svg',
    'switch',
    'symbol',
    'unknown',
  ],
  'descriptive': [
    'desc',
    'metadata',
    'title',
  ],
  'filters': [
    'feBlend',
    'feColorMatrix',
    'feComponentTransfer',
    'feComposite',
    'feConvolveMatrix',
    'feDiffuseLighting',
    'feDisplacementMap',
    'feDropShadow',
    'feFloo',
    'feFuncA',
    'feFuncB',
    'feFuncG',
    'feFunc',
    'feGaussianBlur',
    'feImage',
    'feMerge',
    'feMergeNode',
    'feMorphology',
    'feOffset',
    'feSpecularLighting',
    'feTile',
    'feTurbulence',
  ],
  'font': [
    'font',
    'font-face',
    'font-face-format',
    'font-face-name',
    'font-face-src',
    'font-face-uri',
    'hkern',
    'vkern',
  ],
  'gradient': [
    'linearGradient',
    'meshgradient',
    'radialGradient',
    'stop',
  ],
  'graphics': [
    'image',
  ],
  'html': [
    'audio',
    'canvas',
    'iframe',
    'video',
  ],
  'lights': [
    'feDistantLight',
    'fePointLight',
    'feSpotLight',
  ],
  'paint-server': [
    'hatch',
    'solidcolor',
  ],
  'text': [
    'altGlyph',
    'altGlyphDef',
    'altGlyphItem',
    'glyph',
    'glyphRef',
    'textPath',
    'text',
    'tref',
    'tspan',
  ],
  'uncategorized': [
    'clipPath',
    'color-profile',
    'cursor',
    'filter',
    'foreignObject',
    'hatchpath',
    'meshpatch',
    'meshrow',
    'script',
    'style',
    'view',
  ],
};

// Return an array with all types
const allTypes = () => {
  let all = [];

  Object.keys(typesByCategory).forEach((category) => {
    typesByCategory[category].forEach((type) => all.push(type), this);
  }, this);

  return all;
};

// Return an array with all categories
const allCategories = () => Object.keys(typesByCategory);

// Return the category of the given type
const typeCategory = (type) => {
  let category = '';

  Object.keys(typesByCategory).forEach((_category) => {
    if (category === '' && typesByCategory[_category].indexOf(type) > -1) {
      category = _category;
    }
  }, this);

  return category === '' ? 'uncategorized' : category;
};

// Colorize the text based on the category
const colorizeCategory = (text, category) => {
    switch (category) {
    case 'animation':
      output = colors.red(text);
      break;
    case 'shapes':
      output = colors.green(text);
      break;
    case 'containers':
      output = colors.yellow(text);
      break;
    case 'descriptive':
      output = colors.blue(text);
      break;
    case 'filters':
      output = colors.magenta(text);
      break;
    case 'font':
      output = colors.cyan(text);
      break;
    case 'gradient':
      output = colors.underline.red(text);
      break;
    case 'html':
      output = colors.underline.green(text);
      break;
    case 'lights':
      output = colors.underline.yellow(text);
      break;
    case 'paint-server':
      output = colors.underline.blue(text);
      break;
    case 'text':
      output = colors.underline.magenta(text);
      break;
    default:
      output = colors.underline.cyan(text);
  }
  // Colorized output
  return output;
};

// Return the color of the given type. It will be based on the category
const colorizeType = (type, category) => {
  if (!category) {
    category = typeCategory(type);
  }
  return colorizeCategory(type, category);
};

module.exports = {
  typesByCategory,
  allTypes,
  allCategories,
  typeCategory,
  colorizeCategory,
  colorizeType,
};
