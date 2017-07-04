[![Travis](https://img.shields.io/travis/mediamonks/vue-drag-n-drop.svg?maxAge=2592000)](https://travis-ci.org/mediamonks/vue-drag-n-drop)
[![Code Climate](https://img.shields.io/codeclimate/github/mediamonks/vue-drag-n-drop.svg?maxAge=2592000)](https://codeclimate.com/github/mediamonks/vue-drag-n-drop)
[![Coveralls](https://img.shields.io/coveralls/mediamonks/vue-drag-n-drop.svg?maxAge=2592000)](https://coveralls.io/github/mediamonks/vue-drag-n-drop?branch=master)
[![npm](https://img.shields.io/npm/v/vue-drag-n-drop.svg?maxAge=2592000)](https://www.npmjs.com/package/vue-drag-n-drop)
[![npm](https://img.shields.io/npm/dm/vue-drag-n-drop.svg?maxAge=2592000)](https://www.npmjs.com/package/vue-drag-n-drop)

# vue-drag-n-drop

Add a description here...


## Installation

### yarn / npm

```sh
yarn add vue-drag-n-drop
```

```sh
npm i -S vue-drag-n-drop
```

### other

We also have browser, amd, commonjs, umd, systemjs and es6 versions of
this module available attached to the [Github Releases](https://github.com/mediamonks/vue-drag-n-drop/releases).

<!---

Note: The below cannot be used yet, as there is no way to link to a
specific version yet without updating this readme manually after each
new version.


### browser

```html
<script src="http://mediamonks-development.s3.amazonaws.com/seng/libs/vue-drag-n-drop/1.2.0/vue-drag-n-drop.min.js"></script>
```
```js
console.log(window.VueDragNDrop)
```

### other

Besides the browser version, there are other versions available for
download as well:

- [browser](http://mediamonks-development.s3.amazonaws.com/seng/libs/vue-drag-n-drop/1.2.0/vue-drag-n-drop.js) (and [minified](http://mediamonks-development.s3.amazonaws.com/seng/libs/vue-drag-n-drop/1.2.0/vue-drag-n-drop.min.js))
- [umd](http://mediamonks-development.s3.amazonaws.com/seng/libs/vue-drag-n-drop/1.2.0/vue-drag-n-drop.js) (and [minified](http://mediamonks-development.s3.amazonaws.com/seng/libs/vue-drag-n-drop/1.2.0/vue-drag-n-drop-umd.min.js))
- [amd](http://mediamonks-development.s3.amazonaws.com/seng/libs/vue-drag-n-drop/1.2.0/vue-drag-n-drop-amd.js)
- [commonjs](http://mediamonks-development.s3.amazonaws.com/seng/libs/vue-drag-n-drop/1.2.0/vue-drag-n-drop-commonjs.js)
- [systemjs](http://mediamonks-development.s3.amazonaws.com/seng/libs/vue-drag-n-drop/1.2.0/vue-drag-n-drop-system.js)
- [es6](http://mediamonks-development.s3.amazonaws.com/seng/libs/vue-drag-n-drop/1.2.0/vue-drag-n-drop-es6.zip)

-->

### manual

Check the **build** section below to see your you can build for all the
targets yourself.

## Usage

```ts
import VueDragNDrop from 'vue-drag-n-drop';
// import VueDragNDrop from 'vue-drag-n-drop/lib/classname';

// do something with VueDragNDrop
```


## Documentation

View the [generated documentation](http://mediamonks.github.io/vue-drag-n-drop/).


## Building

In order to build vue-drag-n-drop, ensure that you have [Git](http://git-scm.com/downloads)
and [Node.js](http://nodejs.org/) installed.

Clone a copy of the repo:
```sh
git clone https://github.com/mediamonks/vue-drag-n-drop.git
```

Change to the vue-drag-n-drop directory:
```sh
cd vue-drag-n-drop
```

Install dev dependencies:
```sh
yarn
```

Use one of the following main scripts:
```sh
yarn build           # build this project
yarn dev             # run dev-watch mode, serving example/index.html in the browser
yarn generate        # generate all artifacts (compiles ts, webpack, docs and coverage)
yarn typings         # install .d.ts dependencies (done on install)
yarn test:unit       # run the unit tests
yarn validate        # runs validation scripts, including test, lint and coverage check
yarn lint            # run tslint on this project
yarn doc             # generate typedoc documentation
```

When installing this module, it adds a pre-push hook, that runs the `validate`
script before committing, so you can be sure that everything checks out.

If you want to create the distribution files yourself, you can run the
`build-dist` script, and the following files will get generated in the
`dist` folder:

- **/dist/vue-drag-n-drop.js**: bundled with webpack, can be loaded from
	a script tag, available as `window.VueDragNDrop`
- **/dist/vue-drag-n-drop.min.js**: same as above, but minified
- **/dist/vue-drag-n-drop-amd.js**: bundled with webpack, can be used
	with e.g. requirejs
- **/dist/vue-drag-n-drop-commonjs.js**: bundled with webpack, can be
	used in systems that support commonjs, but you should just use npm
- **/dist/vue-drag-n-drop-umd.js**: bundled with webpack, works in the
	browser, with requirejs, and in a commonjs system
- **/dist/vue-drag-n-drop-umd.min.js**: same as above, but minified
- **/dist/vue-drag-n-drop-system.js**: bundled with typescript, can be
	used in systems	that support systemjs
- **/dist/vue-drag-n-drop-es6.zip**: transpiled with typescript, only
	types are removed from the source files

## Contribute

View [CONTRIBUTING.md](./CONTRIBUTING.md)


## Changelog

View [CHANGELOG.md](./CHANGELOG.md)


## Authors

View [AUTHORS.md](./AUTHORS.md)


## LICENSE

[MIT](./LICENSE) © MediaMonks


