import Vue from 'vue';
import IMonitor from './IMonitor';

interface IDropTargetData {
	isOver : boolean;
}

interface IDropTarget extends Vue {
	handleDragEnter: (e : DragEvent) => void;
	handleDragLeave: (e : DragEvent) => void;
	handleDragOver: (e : DragEvent) => void;
	handleDrop: (e : DragEvent) => void;

	data: () => IDropTargetData;

	isWrapperComponent: boolean;
	isOver: boolean;
	isDragInProgress: boolean;
	dragMonitor: IMonitor;
}

export default IDropTarget;
