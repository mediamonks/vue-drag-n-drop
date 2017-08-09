import { Component } from 'vue/types';

/**
 * Pick some object values from a defined set of object keys.
 *
 * @param obj
 * @param keys
 * @returns {{}}
 */
export const pick = (obj : object, keys : Array<string>) : object => {
	const result : object = {};

	keys.forEach((key) => {
		if (obj[key] !== 'undefined') {
			result[key] = obj[key];
		}
	});

	return result;
};

/**
 * Get all values from object while omitting the given keys.
 *
 * @param obj
 * @param keys
 * @returns {{}}
 */
export const omit = (obj : object, keys : Array<string>) : object => {
	const result : object = {};

	Object.keys(obj).forEach((key) => {
		if (keys.indexOf(key) === -1) {
			result[key] = obj[key];
		}
	});

	return result;
};

/**
 * Get props from Vue component.
 *
 * @param Component
 * @param propKeys
 * @param ignorePropKeys
 */
export const getComponentProps = (Component : Component, propKeys, ignorePropKeys) : object =>
	omit(Component.props || {}, propKeys.concat(ignorePropKeys)); // TODO: Should work

/**
 * Get name of component.
 *
 * @param Component
 */
export const getComponentName = (Component : Component) : string =>
	Component.name || 'anonymous-component'; // TODO: Should work

/**
 * Get the base component of a wrapper component.
 *
 * @param wrapperComponent
 * @returns {*}
 */
export const getBaseComponent = (wrapperComponent) => {
	let base = wrapperComponent;

	while (base.isWrapperComponent === true) {
		base = base.$children[0];
	}

	return base;
};

/**
 * Assert method used to check correctness of values in the dnd module.
 *
 * @param condition
 * @param message
 */
export const assert = (condition : boolean, message ?: string) : void => {
	if (!condition) {
		throw new Error(message || 'Assertion failed');
	}
};
