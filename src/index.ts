import { Store } from 'vuex';
import { Vue } from 'vue/types/vue';
import dragSource from './DragSource';
import dropTarget from './DropTarget';
import storeModule from './storeModule';
import IVuexState from './IVuexState';

interface IOptions {
	store : Store<IVuexState>;
}

/* tslint:disable */
const install = (_Vue : Vue, options : IOptions) => {
	/* tslint:enable */
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
