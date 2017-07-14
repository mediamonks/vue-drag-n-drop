[![Travis](https://img.shields.io/travis/mediamonks/vue-drag-n-drop.svg?maxAge=2592000)](https://travis-ci.org/mediamonks/vue-drag-n-drop)
[![Code Climate](https://img.shields.io/codeclimate/github/mediamonks/vue-drag-n-drop.svg?maxAge=2592000)](https://codeclimate.com/github/mediamonks/vue-drag-n-drop)
[![Coveralls](https://img.shields.io/coveralls/mediamonks/vue-drag-n-drop.svg?maxAge=2592000)](https://coveralls.io/github/mediamonks/vue-drag-n-drop?branch=master)
[![npm](https://img.shields.io/npm/v/vue-drag-n-drop.svg?maxAge=2592000)](https://www.npmjs.com/package/vue-drag-n-drop)
[![npm](https://img.shields.io/npm/dm/vue-drag-n-drop.svg?maxAge=2592000)](https://www.npmjs.com/package/vue-drag-n-drop)

# vue-drag-n-drop

This is a simple plugin for Vue, creating drag and drop functionality for components.
A lot of inspiration was taken from ReactDnd, so if you're familiar with that you will have no trouble using this plugin.


## Installation

Pretty standard procedure. Make sure you have Vue > 2 and Vuex in your project as those are dependencies of this plugin.

### yarn / npm

```sh
yarn add vue-drag-n-drop
```

```sh
npm i -S vue-drag-n-drop
```


## Usage

Register the plugin first.

```ts
    import VueDnD from 'vue-drag-n-drop';
	
    const store = new Vuex.Store({ ... });
	
    Vue.use(VueDnD, { store });
```

### DragSource

The drag source helper makes a component draggable. 

```ts
import { DragSource } from 'vue-drag-n-drop';
import Component from 'Component'; // import your component.

const source = {
    // Get the data that will be passed to the DropTarget once this component is dropped on one
    // First parameter is the instance of your Component.
    dragData: componentInstance => ({
        data1: componentInstance.getData1(),
        data2: componentInstance.data2,
    }),
};

// Make your Component draggable and specify a type for it.
export default DragSource('custom_drag_component', source)(Component);

// The component is now draggable and can be dropped onto DropTargets.

```

### DropTarget

The drop target helper makes a component a drop zone.

```ts
import { DropTarget } from 'vue-drag-n-drop';
import TargetComponent from 'TargetComponent'; // import your component.

const target = {
    // Restrict what components can get dropped on the drop target.
    canDrop(dropTarget, dragMonitor) {
        return dropTarget.id !== dragMonitor.getItem().id;
    },
    
    // This method is called once a drag source is dropped on the drop target.
    drop(dropTarget, dragMonitor) {
    	// do something
    },
};

// Create a drop target, that will accept multiple drag source types.
export default DropTarget(['custom_drag_component', 'other_type'], target)(TargetComponent);

// The component is now a drop target.

```

### DragMonitor

The drag monitor is used to pass information from the drag source to the drop target.

It currently has 3 methods.

getItem() -> Get the drag source Vue instance.

getData() -> Get the data that was generated in the source contract of the drag source.

getType() -> Get the type of the drag source.

### Customizing the drag preview

Sometimes you dont want the default browser ghost image when dragging, but rather some custom element.
You can do that by using the dragPreview() method of the source contract of any drag source.

```ts
const source = {
	dragData() { ... }
	
	dragPreview() {
		// Here you can return any element or image (also canvas) that will then be used as the drag preview.
	}
}
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


