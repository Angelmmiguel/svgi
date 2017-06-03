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
    -o, --output <formatter>  Select the format of the output: json, yaml, or human (default)
    -t, --tree                Display only the node tree
    -b, --basic               Display only the basic information
    -s, --stats               Display only the node statistics
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
│ Size │ 204                                 │
└──────┴─────────────────────────────────────┘

Node statistics
┌─────────────┬────┐
│ Total Nodes │ 14 │
└─────────────┴────┘

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

Just to mention, the output is prettier than this bored block code ;).

<img width="600" alt="Human output" src="https://cloud.githubusercontent.com/assets/4056725/26752798/4eb0d178-4858-11e7-8c9c-be691c5ffbc0.png">

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

## Limit the output

The params `-b, --basic`, `-s, --stats` and `-t, --tree` allow you to limit the output of the command:

```bash
svgi --stats -o json icon.svg
```

```json
{
  "stats": {
    "totalNodes": 14
  }
}
```

# License

`svgi` is released under the [Apache License v2.0](http://www.apache.org/licenses/LICENSE-2.0). Developed by [@Laux_es ;)](https://twitter.com/laux_es).
