import Vue from 'vue';
import { Component, VNode } from 'vue/types';
import { mapState } from 'vuex';
import ITarget from '../lib/ITarget';
import IMonitor from '../lib/IMonitor';
import IVuexState from '../lib/IVuexState';
import { pick, getComponentProps, getComponentName, getBaseComponent, assert } from './utils';

export default (droppableTypes : string | Array<string>, target : ITarget = {}) : Component => {
	const types : Array<string> = droppableTypes instanceof Array ? droppableTypes : [<string>droppableTypes];

	assert(types instanceof Array, `[VueDnD] Droppable types must either be string or array, '${typeof types}' given`);
	assert(typeof target === 'object', `[VueDnD] Target must be an object, '${typeof target}' given`);
	assert(!(target instanceof Array), '[VueDnD] Target cannot be an array.');

	/**
	 * Prop keys the wrapper component uses and that will be ignored while getting props from the wrapped component.
	 *
	 * @type {[*]}
	 */
	const propKeys = [
		'isOver',
	];

	/**
	 * Prop keys, that will be ignored while getting the prop keys from the wrapped component.
	 *
	 * @type {[*]}
	 */
	const ignorePropKeys = [
		'isDragging',
	];

	/**
	 * Check if the current DragSource can be dropped on this DropTarget.
	 *
	 * @param dropTarget
	 * @param dragMonitor
	 */
	const canDrop = (dropTarget : Component, dragMonitor : IMonitor) : boolean =>
		types.indexOf(dragMonitor.getType()) !== -1
			&& (typeof target.canDrop === 'function' ? target.canDrop(dropTarget, dragMonitor) : true);

	/**
	 * Handle the drop of the DragSource on this DropTarget.
	 *
	 * @param dropTarget
	 * @param dragMonitor
	 */
	const handleDrop = (dropTarget : Component, dragMonitor : IMonitor) : void => {
		if (canDrop(dropTarget, dragMonitor) && typeof target.drop === 'function') {
			target.drop(dropTarget, dragMonitor);
		}
	};

	/**
	 * Constructs a wrapper component around the component that was passed into the function.
	 */
	return (Component) => {
		const name = getComponentName(Component);
		const componentProps = getComponentProps(Component, propKeys, ignorePropKeys);

		return Vue.extend({
			name: `DropTarget-${name}`,

			props: componentProps,

			components: {
				[name]: Component,
			},

			data() {
				return {
					isOver: false,
				};
			},

			created() {
				// used to identify the wrapper component as such
				this.isWrapperComponent = true;
			},

			computed: mapState({
				// get the current drag monitor from the store.
				dragMonitor: (state : IVuexState) => state.dnd.monitor,

				isDragInProgress: (state : IVuexState) => state.dnd.dragging,
			}),

			methods: {
				/**
				 * Handle the dragenter event on the wrapped component.
				 *
				 * @param e
				 */
				handleDragEnter(e : DragEvent) : boolean {
					e.preventDefault();

					if (this.isDragInProgress) {
						this.isOver = canDrop(getBaseComponent(this), this.dragMonitor);
					}

					return false;
				},

				/**
				 * Handle the dragleave event on the wrapped component.
				 *
				 * @param e
				 */
				handleDragLeave(e : DragEvent) : boolean {
					e.preventDefault();

					if (this.isDragInProgress) {
						this.isOver = false;
					}

					return false;
				},

				/**
				 * Handle the drop event on the wrapped component.
				 *
				 * @param e
				 */
				handleDrop(e : DragEvent) : boolean {
					e.stopPropagation();

					if (this.isDragInProgress) {
						handleDrop(getBaseComponent(this), this.dragMonitor);

						this.isOver = false;
					}

					return false;
				},

				/**
				 * Handle the dragover event on the wrapped component.
				 *
				 * @param e
				 * @returns {boolean}
				 */
				handleDragOver(e : DragEvent) : boolean {
					e.preventDefault();

					if (this.isDragInProgress && canDrop(getBaseComponent(this), this.dragMonitor)) {
						e.dataTransfer.dropEffect = 'move';
					} else {
						e.dataTransfer.dropEffect = 'none';
					}

					return false;
				},
			},

			/**
			 * Render the wrapped component as the only child component.
			 *
			 * @param h
			 * @returns {*}
			 */
			render(h) : VNode {
				return h(name, {
					props: pick(this, Object.keys(componentProps).concat(propKeys)),

					nativeOn: {
						dragenter: this.handleDragEnter,
						dragleave: this.handleDragLeave,
						dragover: this.handleDragOver,
						drop: this.handleDrop,
					},
				});
			},
		});
	};
};
