[![npm version](https://badge.fury.io/js/svgi.svg)](https://badge.fury.io/js/svgi) [![Build Status](https://travis-ci.org/Angelmmiguel/svgi.svg?branch=master)](https://travis-ci.org/Angelmmiguel/svgi) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2FAngelmmiguel%2Fsvgi.svg?type=shield)](https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2FAngelmmiguel%2Fsvgi?ref=badge_shield)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)

# svgi

`svgi` is a CLI tool to inspect the content of SVG files. It provides you information about the file, the elements in the SVG and the hierarchy. It also count the number of elements and in the future, it will provide tips to improve the SVG

[![asciicast](https://asciinema.org/a/123343.png)](https://asciinema.org/a/123343)

# Installation

## CLI

`svgi` is written in javascript ([node](https://nodejs.org/)) and distributed through [npm](https://www.npmjs.com). Both are required to install `svgi`.

To install it, just execute the following command in the terminal:

```
npm install -g svgi
```

Then, `svgi` will be available in your path:


```sh
svgi --help

  Usage: svgi [options] <file>

  Options:

    -h, --help                output usage information
    -o, --output <formatter>  Select the format of the output: json, yaml, or human (default)
    -t, --tree                Display only the node tree
    -b, --basic               Display only the basic information
    -s, --stats               Display only the node statistics
    --all-stats               Return types and categories with 0 ocurrences in the stats object
    --ids                     Show the IDs of the nodes in the tree view. Only available for human formatter
    --props                   Show the properties of the nodes in the tree view. Only available for human formatter
    --legend                  Show the tree color legend. Only available for human formatter
```

### Node Version

`svgi` requires a `> 6` node version because it uses some features from the new versions of ECMAScript.

### Binary files

We are providing executable files for the environments that do not fit within current requirements. Binaries for Linux, macOS, and Windows can be downloaded from [the releases page on GitHub](https://github.com/Angelmmiguel/svgi/releases).

## Library

You can also integrate `svgi` in your projects. This library will provide you a powerful way to get information about SVG files. We only need to install the library and add it as a depedency in our project:

```
npm install --save svgi
```

Now, you can start to inspect SVG files from your code :)

```js
const SVG = require('svgi');

let svg = new SVG('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect x="10" y="10" height="100" width="100" style="fill: #0000ff"/></svg>');
// Get the report
svg.report();
/*
{ stats:
   { totalNodes: 2,
     types: { svg: 1, rect: 1 },
     categories: { containers: 1, shapes: 1 } },
  nodes:
   { type: 'svg',
     category: 'containers',
     properties:
      { xmlns: 'http://www.w3.org/2000/svg',
        'xmlns:xlink': 'http://www.w3.org/1999/xlink' },
     children: [ [Object] ] } }
*/
```

# CLI Output

You can change the output format of the CLI with the `-o` option.

## Human

This is the default option. Also, **we're working on this format**.

```bash
svgi icon.svg
```

```
Basic information
┌──────┬─────────────────────────────────────┐
│ Name │ icon.svg                            │
├──────┼─────────────────────────────────────┤
│ Path │ /Users/angel/Projects/svgi/icon.svg │
├──────┼─────────────────────────────────────┤
│ Size │ 204                                 │
└──────┴─────────────────────────────────────┘

Node statistics
┌─────────────┬────┐
│ Total Nodes │ 14 │
└─────────────┴────┘
┌──────┬───────┐
│ Type │ Count │
├──────┼───────┤
│ svg  │ 1     │
├──────┼───────┤
│ g    │ 4     │
├──────┼───────┤
│ rect │ 3     │
├──────┼───────┤
│ path │ 4     │
├──────┼───────┤
│ text │ 2     │
└──────┴───────┘
┌────────────┬───────┐
│ Category   │ Count │
├────────────┼───────┤
│ containers │ 5     │
├────────────┼───────┤
│ shapes     │ 7     │
├────────────┼───────┤
│ text       │ 2     │
└────────────┴───────┘

Node tree
svg
├─ g
│  └─ g
│     └─ g
│        ├─ rect
│        ├─ rect
│        └─ g
│           ├─ rect
│           ├─ path
│           ├─ path
│           ├─ path
│           └─ path
├─ text
└─ text
```

## JSON

```bash
svgi -o json icon-small.svg
```

```json
{
  "file": {
    "name": "icon-small.svg",
    "path": "/Users/angel/Projects/svgi/icon-small.svg",
    "size": 204
  },
  "stats": {
    "totalNodes": 2,
    "types": {
      "svg": 1,
      "path": 1
    },
    "categories": {
      "containers": 1,
      "shapes": 1
    }
  },
  "nodes": {
    "type": "svg",
    "category": "containers",
    "properties": {
      "viewBox": "0 0 16 16",
      "xmlns": "http://www.w3.org/2000/svg",
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      "stroke-linejoin": "round",
      "stroke-miterlimit": "1.414"
    },
    "children": [
      {
        "type": "path",
        "category": "shapes",
        "properties": {
          "d": "M5.667 2.667H7V16H5.667V2.667zm4.666 0V16H9V2.667h1.333zM2.333 0h1.334v10H2.333V0zm10 2.667h1.334V10h-1.334V2.667z"
        },
        "children": []
      }
    ]
  }
}
```

### Combine JSON output with jq

You can use the well known [jq](https://stedolan.github.io/jq/) command-line JSON processor to read and filter the output of the JSON formatter:

```bash
svgi -o json icon.svg | jq '.nodes.properties'
```

```json
{
  "viewBox": "0 0 16 16",
  "xmlns": "http://www.w3.org/2000/svg",
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  "stroke-linejoin": "round",
  "stroke-miterlimit": "1.414"
}
```

## YAML

```bash
svgi -o yaml icon.svg
```

```yaml
file:
  name: icon-small.svg
  path: /Users/angel/Projects/svgi/icon-small.svg
  size: 204
stats:
  totalNodes: 2
  types:
    svg: 1
    path: 1
  categories:
    containers: 1
    shapes: 1
nodes:
  type: svg
  category: containers
  properties:
    viewBox: 0 0 16 16
    xmlns: 'http://www.w3.org/2000/svg'
    fill-rule: evenodd
    clip-rule: evenodd
    stroke-linejoin: round
    stroke-miterlimit: '1.414'
  children:
    - type: path
      category: shapes
      properties:
        d: >-
          M5.667 2.667H7V16H5.667V2.667zm4.666 0V16H9V2.667h1.333zM2.333
          0h1.334v10H2.333V0zm10 2.667h1.334V10h-1.334V2.667z
      children: []
```

## Limit the output

The params `-b, --basic`, `-s, --stats` and `-t, --tree` allow you to limit the output of the command:

```bash
svgi --stats -o json icon.svg
```

```json
{
  "stats": {
    "totalNodes": 14,
    "types": {
      "svg": 1,
      "g": 4,
      "rect": 3,
      "path": 4,
      "text": 2
    },
    "categories": {
      "containers": 5,
      "shapes": 7,
      "text": 2
    }
  }
}
```

# License

`svgi` is released under the [Apache License v2.0](http://www.apache.org/licenses/LICENSE-2.0). Developed by [@Laux_es ;)](https://twitter.com/laux_es).

# Sponsors

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/Bd3aXba7JBxkLsouBkMJjayn/Angelmmiguel/svgi'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/Bd3aXba7JBxkLsouBkMJjayn/Angelmmiguel/svgi.svg' />
</a>

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars0.githubusercontent.com/u/4056725?v=4" width="100px;"/><br /><sub>Ángel M</sub>](https://irb.rocks)<br />[🐛](https://github.com/Angelmmiguel/svgi/issues?q=author%3AAngelmmiguel "Bug reports") [💻](https://github.com/Angelmmiguel/svgi/commits?author=Angelmmiguel "Code") [🎨](#design-Angelmmiguel "Design") [📖](https://github.com/Angelmmiguel/svgi/commits?author=Angelmmiguel "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/7225802?v=4" width="100px;"/><br /><sub>Aarón García Hervás</sub>](https://aarongarciah.com)<br />[💻](https://github.com/Angelmmiguel/svgi/commits?author=aarongarciah "Code") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!