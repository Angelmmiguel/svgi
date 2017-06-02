# SVGI

`svgi` is a CLI tool to inspect the content of SVG files. It provides you information about the file, the elements in the SVG and the hierarchy. It also count the number of elements and in the future, it will provide tips to improve the SVG

# Installation

`svgi` is written in javascript ([node](https://nodejs.org/)) and distributed through [npm](https://www.npmjs.com). Both are required to install `svgi`.

To install it, just execute the following command in the terminal:

```
npm install -g svgi
```

Then, `svgi` will be available in your path:


```
svgi --help

  Usage: svgi [options] <file>

  Options:

    -h, --help                output usage information
    -o, --output <formatter>  Select the format of the output: json, yaml, or human
```

# Formatters

You can change the output format with the `-o` option.

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
│ Size │ 170                                 │
└──────┴─────────────────────────────────────┘
Node statistics
┌─────────────┬───┐
│ Total Nodes │ 2 │
└─────────────┴───┘
Node tree
svg
└─ path
```

## JSON

```bash
svgi -o json icon.svg
```

```json
{
  "file": {
    "name": "icon.svg",
    "path": "/Users/angel/projects/svgi/icon.svg",
    "size": 170
  },
  "totalNodes": 2,
  "nodes": {
    "type": "svg",
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
  name: icon.svg
  path: /Users/angel/Projects/svgi/icon.svg
  size: 170
totalNodes: 2
nodes:
  type: svg
  properties:
    viewBox: 0 0 16 16
    xmlns: 'http://www.w3.org/2000/svg'
    fill-rule: evenodd
    clip-rule: evenodd
    stroke-linejoin: round
    stroke-miterlimit: '1.414'
  children:
    - type: path
      properties:
        d: >-
          M5.667 2.667H7V16H5.667V2.667zm4.666 0V16H9V2.667h1.333zM2.333
          0h1.334v10H2.333V0zm10 2.667h1.334V10h-1.334V2.667z
      children: []
```

# License

`svgi` is released under the [Apache License v2.0](http://www.apache.org/licenses/LICENSE-2.0).  Copyright [@Laux_es ;)](https://twitter.com/laux_es).
