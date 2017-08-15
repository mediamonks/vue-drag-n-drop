import Vue, { ComponentOptions } from 'vue';
import { mapActions } from 'vuex';
import createMonitor from './createMonitor';
import { pick, getComponentProps, getComponentName, getBaseComponent, assert } from './utils';

import ISource from '../lib/ISource';
import IDragSource, { IDragSourceData } from '../lib/IDragSource';
import { CreateElement } from 'vue/types/vue';

export default (type : string, source : ISource = {}) : (Component : ComponentOptions<Vue>) => ComponentOptions<Vue> => {
	assert(typeof type === 'string', `[VueDnD] Type must be a string, '${typeof type}' given`);
	assert(typeof source === 'object', `[VueDnD] Source must be an object, '${typeof source}' given`);
	assert(!(source instanceof Array), '[VueDnD] Source cannot be an array.');

	/**
	 * Prop keys the wrapper component uses and that will be ignored while getting props from the wrapped component.
	 *
	 * @type {[*]}
	 */
	const propKeys : Array<string> = [
		'isDragging',
	];

	/**
	 * Prop keys, that will be ignored while getting the prop keys from the wrapped component.
	 *
	 * @type {[*]}
	 */
	const ignorePropKeys : Array<string> = [];

	/**
	 * Constructs a wrapper component around the component that was passed into the function.
	 */
	return (Component : ComponentOptions<Vue>) : ComponentOptions<Vue> => {
		const name : string = getComponentName(Component);
		const componentProps = getComponentProps(Component, propKeys, ignorePropKeys);

		const options = {
			name: `DragSource-${name}`,

			props: componentProps,

			components: {
				[name]: Component,
			},

			data(this: IDragSource) : IDragSourceData {
				return {
					isDragging: false,
				};
			},

			created(this: IDragSource) {
				this.isWrapperComponent = true;
			},

			beforeDestroy(this: IDragSource) {
				if (this.isDragging) {
					this.handleDragEnd();
				}
			},

			methods: {
				...mapActions({
					startDragging: 'dnd/startDragging',
					stopDragging: 'dnd/stopDragging',
				}),

				/**
				 * Handle the dragstart event on the wrapped component.
				 *
				 * @param e
				 */
				handleDragStart(this: IDragSource, e) {
					const base = getBaseComponent(this);

					const dragData = typeof source.dragData === 'function' ? source.dragData(base) : null;
					const dragImage = typeof source.dragPreview === 'function' ? source.dragPreview(dragData) : null;

					this.startDragging(createMonitor(type, base, dragData));

					this.isDragging = true;

					e.dataTransfer.effectAllowed = 'move';

					if (dragImage) {
						e.dataTransfer.setDragImage(dragImage, 0, 0);
					}
				},

				/**
				 * Handle the dragend event on the wrapped component.
				 */
				handleDragEnd(this: IDragSource) {
					this.stopDragging();

					this.isDragging = false;
				},
			},

			/**
			 * Render the wrapped component as the only child component.
			 *
			 * @param h
			 * @returns {*}
			 */
			render(this: IDragSource, h: CreateElement) {
				return h(name, {
					props: pick(this, Object.keys(componentProps).concat(propKeys)),

					attrs: {
						draggable: true,
					},

					nativeOn: {
						dragstart: this.handleDragStart,
						dragend: this.handleDragEnd,
					},
				});
			},
		};

		return Vue.extend(options) as ComponentOptions<Vue>;
	};
};
