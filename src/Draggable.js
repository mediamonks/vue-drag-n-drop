import Vue from 'vue';
import { mapActions } from 'vuex';
import { pick, getComponentProps, getComponentName, getBaseComponent, createMonitor } from './utils';

export default (type) => {
    /**
     * Prop keys the wrapper component uses and that will be ignored while getting props from the wrapped component.
     *
     * @type {[*]}
     */
    const propKeys = [
        'isDragging',
        'isOver',
    ];

    /**
     * Prop keys, that will be ignored while getting the prop keys from the wrapped component.
     *
     * @type {[*]}
     */
    const ignorePropKeys = [];

    /**
     * Constructs a wrapper component around the component that was passed into the function.
     */
    return (Component) => {
        const name = getComponentName(Component);
        const componentProps = getComponentProps(Component, propKeys, ignorePropKeys);

        return Vue.extend({
            name: `Draggable-${name}`,

            props: componentProps,

            components: {
                [name]: Component,
            },

            data() {
                return {
                    isDragging: false,
                };
            },

            created() {
                this.isWrapperComponent = true;
            },

            beforeDestroy() {
                this.handleDragEnd();
            },

            methods: {
                ...mapActions('dnd', {
                    startDragging: 'startDragging',
                    stopDragging: 'stopDragging',
                }),

                /**
                 * Handle the dragstart event on the wrapped component.
                 *
                 * @param e
                 */
                handleDragStart(e) {
                    e.dataTransfer.effectAllowed = 'move';

                    this.startDragging(createMonitor(type, getBaseComponent(this)));

                    this.isDragging = true;
                },

                /**
                 * Handle the dragend event on the wrapped component.
                 */
                handleDragEnd() {
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
            render(h) {
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
        });
    };
};
