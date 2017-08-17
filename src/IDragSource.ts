import Vue from 'vue';
import IMonitor from './IMonitor';

export interface IDragSourceData {
	isDragging : boolean;
}

interface IDragSource extends Vue {
	startDragging: (monitor: IMonitor) => void;

	stopDragging: () => void;

	isDragging: boolean;

	handleDragStart: (e : DragEvent) => void;

	handleDragEnd: () => void;

	data: () => IDragSourceData;

	isWrapperComponent: boolean;
}

export default IDragSource;
