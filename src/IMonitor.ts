import Vue from 'vue';

/**
 * @interface IMonitor
 */
interface IMonitor {
	/**
	 * Return the instance of the currently dragging component.
	 *
	 * @returns
	 */
	getItem : () => Vue;

	/**
	 * Returns the type of the currently dragging component.
	 *
	 * @returns string
	 */
	getType : () => string;

	/**
	 * Returns any additional data, that was sent with the drag.
	 */
	getData : () => any;
}

export default IMonitor;
