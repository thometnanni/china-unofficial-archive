// src/lib/hoverable.js
/**
 * hoverable(node, options?)
 *
 *   node      – the element you put `use:hoverable` on
 *   options   – optional config object:
 *                 { preventDefault: true|false }  // default false
 *
 * Emits two custom events on `node`:
 *   - "hover:start"  – when a child receives mouseenter / touchstart
 *   - "hover:end"    – when the same child receives mouseleave / touchend
 *
 * The events bubble, so parent components can listen with `on:hover:start`
 * or `on:hover:end`.
 */
export function hoverable(node, { preventDefault = false } = {}) {
	/** Helper – decides whether the event target is a direct child of `node`. */
	// const isChild = (target) => {
	// 	// `node.contains(target)` is true for the node itself, so we need to exclude it.
	// 	return target !== node && node.contains(target);
	// };

	/** Mouse handlers */
	const onMouseEnter = (e) => {
		// if (!isChild(e.target)) return;
		if (preventDefault) e.preventDefault();
		node.dispatchEvent(new CustomEvent('hover-start', { detail: { source: e.target } }));
	};

	const onMouseLeave = (e) => {
		// if (!isChild(e.target)) return;
		if (preventDefault) e.preventDefault();
		node.dispatchEvent(new CustomEvent('hover-end', { detail: { source: e.target } }));
	};

	/** Touch handlers – we treat a touchstart as “hover start” and touchend/cancel as “hover end”. */
	const onTouchStart = (e) => {
		// Touches can have multiple points; we only care about the first.
		const touch = e.touches[0];
		if (!touch) return;
		const target = document.elementFromPoint(touch.clientX, touch.clientY);
		// if (!isChild(target)) return;
		if (preventDefault) e.preventDefault();
		node.dispatchEvent(new CustomEvent('hover:start', { detail: { source: target } }));
	};

	const onTouchEnd = (e) => {
		// Touchend may have no touches left – we just fire the end event.
		if (preventDefault) e.preventDefault();
		node.dispatchEvent(new CustomEvent('hover:end'));
	};

	/** Attach listeners (using capture phase so we see the event before it bubbles out). */
	node.addEventListener('mouseenter', onMouseEnter, true);
	node.addEventListener('mouseleave', onMouseLeave, true);
	node.addEventListener('touchstart', onTouchStart, { passive: !preventDefault, capture: true });
	node.addEventListener('touchend', onTouchEnd, { passive: !preventDefault, capture: true });
	node.addEventListener('touchcancel', onTouchEnd, { passive: !preventDefault, capture: true });

	/** Return the cleanup function (called when the element is destroyed or the action is removed). */
	return {
		destroy() {
			node.removeEventListener('mouseenter', onMouseEnter, true);
			node.removeEventListener('mouseleave', onMouseLeave, true);
			node.removeEventListener('touchstart', onTouchStart, true);
			node.removeEventListener('touchend', onTouchEnd, true);
			node.removeEventListener('touchcancel', onTouchEnd, true);
		},
		/** Optional – allow runtime changes to options */
		update(newOptions = {}) {
			preventDefault = newOptions.preventDefault ?? false;
		}
	};
}
