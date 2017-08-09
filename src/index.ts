import { Store } from 'vuex';
import { Vue } from 'vue/types/vue';
import dragSource from './DragSource';
import dropTarget from './DropTarget';
import storeModule from './storeModule';

interface IOptions {
	store : Store;
}

const install = (Vue : Vue, options : IOptions) => {
	if (!options || !options.store) {
		throw new Error('[VueDnD] Please pass the store in with the options when initializing this plugin.');
	}

	options.store.registerModule('dnd', storeModule);
};

export const DragSource = dragSource;
export const DropTarget = dropTarget;

export default {
	install,
	DragSource: dragSource,
	DropTarget: dropTarget,
};
