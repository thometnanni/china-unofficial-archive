export function inkFilter(node, options = {}) {
	const defaults = {
		thr: 120,
		noise: 20,
		ink: [0, 0, 0],
		paper: [244, 244, 244],
		bandAmp: 10,
		bandPeriod: 50,
		jitterMax: 1
	};

	let settings = normalize({ ...defaults, ...options });

	function toRGB(c) {
		if (Array.isArray(c)) return c.slice(0, 3).map((n) => Math.max(0, Math.min(255, n | 0)));
		if (typeof c !== 'string') return [0, 0, 0];
		let s = c.trim();

		if (s[0] === '#') {
			let hex = s.slice(1);
			if (hex.length === 3)
				hex = hex
					.split('')
					.map((ch) => ch + ch)
					.join('');
			const n = parseInt(hex, 16);
			return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
		}
		let m = s.match(/rgba?\s*\((\d+)[^0-9]+(\d+)[^0-9]+(\d+)/i);
		if (m) return [+m[1], +m[2], +m[3]];

		if (!toRGB._ctx) {
			const cv = document.createElement('canvas');
			toRGB._ctx = cv.getContext('2d');
		}
		const ctx = toRGB._ctx;
		ctx.fillStyle = '#000';
		ctx.fillStyle = s;
		const norm = ctx.fillStyle;
		if (norm[0] === '#') return toRGB(norm);
		m = norm.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
		if (m) return [+m[1], +m[2], +m[3]];
		return [0, 0, 0];
	}

	function normalize(obj) {
		return {
			...obj,
			ink: toRGB(obj.ink),
			paper: toRGB(obj.paper)
		};
	}

	const gauss = (s) => {
		const u = Math.random(),
			v = Math.random();
		return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) * s;
	};

	async function apply() {
		const { thr, noise, ink, paper, bandAmp, bandPeriod, jitterMax } = settings;

		if (!node.complete)
			await new Promise((r) => {
				const ok = () => {
					cleanup();
					r();
				};
				const cleanup = () => {
					node.removeEventListener('load', ok);
					node.removeEventListener('error', ok);
				};
				node.addEventListener('load', ok, { once: true });
				node.addEventListener('error', ok, { once: true });
			});
		try {
			await node.decode();
		} catch {}
		await new Promise((r) => requestAnimationFrame(r));

		const rect = node.getBoundingClientRect();
		const dwCss = Math.max(1, Math.round(rect.width));
		const dhCss = Math.max(1, Math.round(rect.height));
		const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
		const cw = dwCss * dpr;
		const ch = dhCss * dpr;

		const sw = node.naturalWidth || 1;
		const sh = node.naturalHeight || 1;

		const fit = (getComputedStyle(node).objectFit || 'cover').toLowerCase();

		function destRect(sw, sh, cw, ch, fit) {
			if (fit === 'fill') return { dx: 0, dy: 0, dw: cw, dh: ch };
			if (fit === 'none') {
				const dw = Math.min(sw, cw),
					dh = Math.min(sh, ch);
				return { dx: (cw - dw) / 2, dy: (ch - dh) / 2, dw, dh };
			}

			const scaleContain = Math.min(cw / sw, ch / sh);
			const scaleCover = Math.max(cw / sw, ch / sh);
			let scale =
				fit === 'contain' ? scaleContain : fit === 'cover' ? scaleCover : Math.min(1, scaleContain);
			const dw = sw * scale,
				dh = sh * scale;
			return { dx: (cw - dw) / 2, dy: (ch - dh) / 2, dw, dh };
		}

		const { dx, dy, dw, dh } = destRect(sw, sh, cw, ch, fit);

		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d', { willReadFrequently: true });
		canvas.width = cw;
		canvas.height = ch;

		ctx.fillStyle = `rgb(${paper[0]},${paper[1]},${paper[2]})`;
		ctx.fillRect(0, 0, cw, ch);

		ctx.drawImage(node, 0, 0, sw, sh, dx, dy, dw, dh);

		const src = ctx.getImageData(0, 0, cw, ch);
		const dst = ctx.createImageData(cw, ch);
		const sdata = src.data,
			ddata = dst.data;

		const rowShift = new Int8Array(ch);
		for (let y = 0; y < ch; y++)
			rowShift[y] = ((Math.random() * (2 * jitterMax + 1)) | 0) - jitterMax;

		for (let y = 0; y < ch; y++) {
			const band = bandAmp * Math.sin((2 * Math.PI * y) / bandPeriod) + (Math.random() - 0.5) * 2;
			const dxShift = rowShift[y];
			for (let x = 0; x < cw; x++) {
				const sx = x - dxShift;
				let v;
				if (sx < 0 || sx >= cw) {
					v = 255;
				} else {
					const si = (y * cw + sx) * 4;
					v = (sdata[si] + sdata[si + 1] + sdata[si + 2]) / 3;
				}
				v = Math.max(0, Math.min(255, v + band + gauss(noise)));
				const isInk = v < thr;
				const di = (y * cw + x) * 4;
				ddata[di] = isInk ? ink[0] : paper[0];
				ddata[di + 1] = isInk ? ink[1] : paper[1];
				ddata[di + 2] = isInk ? ink[2] : paper[2];
				ddata[di + 3] = 255;
			}
		}

		ctx.putImageData(dst, 0, 0);
		node.src = canvas.toDataURL('image/png');
	}

	if (node.complete) apply();
	else node.addEventListener('load', apply, { once: true });

	return {
		update(newOpts) {
			settings = normalize({ ...settings, ...newOpts });
			apply();
		}
	};
}
