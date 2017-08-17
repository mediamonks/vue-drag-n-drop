interface ISource {
	dragData ?: (item : any) => any;
	dragPreview ?: (dragData : any) => HTMLElement;
}

export default ISource;
