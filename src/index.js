import dragSource from './DragSource';
import dropTarget from './DropTarget';
import storeModule from './storeModule';

export const setupDnD = store =>
	store.registerModule('dnd', storeModule);

export const DragSource = dragSource;
export const DropTarget = dropTarget;
