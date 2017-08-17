import { Component } from 'vue/types';
import IMonitor from './IMonitor';

interface ITarget {
	canDrop ?: (dropTarget : Component, dragMonitor : IMonitor) => boolean;

	drop ?: (dropTarget : Component, dragMonitor : IMonitor) => void;
}

export default ITarget;
