export function setupResize(node, onResize) {
	if (!node || typeof window === 'undefined') return () => {};

	let frameId = null;

	function handleResize() {
		if (frameId) cancelAnimationFrame(frameId);
		frameId = requestAnimationFrame(onResize);
	}

	const observer = new ResizeObserver(handleResize);
	observer.observe(node);

	window.addEventListener('resize', handleResize);
	handleResize();

	return () => {
		observer.disconnect();
		window.removeEventListener('resize', handleResize);
		if (frameId) cancelAnimationFrame(frameId);
	};
}
