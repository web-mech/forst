# ![forst](media/logo-01.png)

> Radix Trie Hierarchical Configurations

[![Build Status: Linux](https://travis-ci.org/web-mech/forst.svg?branch=master)](https://travis-ci.org/web-mech/forst) [![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## Setup

Add Forst as a dependency

    $ npm install --save forst

Create a folder in which your config tree(s) will live

#### Example

    $ mkdir config

## Usage

Consider the following config tree directory

    /conf/
    ├── foo
    │   └── bar
    │       └── baz.json
    ├── test
    │   ├── bar.json
    │   └── foo.json -> { "enabled": false }
    └── test.json -> { "enabled": true, "name": "foo" }

#### Getting the base configuration:

    const forst = require('forst');

    const config = forst('test', './conf');

    console.log(config); // { "enabled": true, "name": "foo" }

#### Getting the nested configuration:

    const forst = require('forst');

    const config = forst(['test', 'test/foo'], './conf');

    console.log(config); // { "enabled": false,  "name": "foo" }

If the config file is not found it will return either the values of the parent configuration if found or an empty object if nothing is found.

### API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

##### Table of Contents

-   [index](#index)
-   [map](#map)

#### index

forst

**Parameters**

-   `path` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>)** Config path
-   `basePath` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Tree base path

#### map

forstMap

**Parameters**

-   `map` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Config path map
-   `basePath` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Tree base path
