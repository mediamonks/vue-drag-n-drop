import Vue from 'vue';
import IMonitor from '../lib/IMonitor';

/**
 * Create a DnD monitor
 *
 * @param type
 * @param instance
 * @param data
 */
const createMonitor = (type : string, instance : Vue, data : any = null) : IMonitor => ({
    /**
     * Return the component (VueInstance) that was dragged.
     *
     * @returns {*}
     */
    getItem() {
        return instance;
    },

    /**
     * Returns the specified type of the draggable component.
     *
     * @returns {*}
     */
    getType() {
    	return type;
    },

    /**
     * Get additional data that may or may not been sent with the drag.
     * (For example if you select multiple items in a list, you may like to pass all of the items,
     * when dragging one of them)
     *
     * @returns {*}
     */
    getData() {
        return data;
    },
});

export default createMonitor;
