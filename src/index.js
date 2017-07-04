import draggable from './Draggable';
import dropTarget from './DropTarget';
import storeModule from './storeModule';

export const setupDnD = store =>
    store.registerModule('dnd', storeModule);

export const Draggable = draggable;
export const DropTarget = dropTarget;
