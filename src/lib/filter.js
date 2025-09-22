export function inkFilter(node, options = {}) {
	const defaults = {
		thr: 83,
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

	function apply() {
		const { thr, noise, ink, paper, bandAmp, bandPeriod, jitterMax } = settings;
		const w = node.naturalWidth,
			h = node.naturalHeight;
		if (!w || !h) return;

		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		canvas.width = w;
		canvas.height = h;
		ctx.drawImage(node, 0, 0);

		const src = ctx.getImageData(0, 0, w, h);
		const dst = ctx.createImageData(w, h);
		const sdata = src.data,
			ddata = dst.data;

		const rowShift = new Int8Array(h);
		for (let y = 0; y < h; y++)
			rowShift[y] = ((Math.random() * (2 * jitterMax + 1)) | 0) - jitterMax;

		for (let y = 0; y < h; y++) {
			const band = bandAmp * Math.sin((2 * Math.PI * y) / bandPeriod) + (Math.random() - 0.5) * 2;
			const dx = rowShift[y];
			for (let x = 0; x < w; x++) {
				const sx = x - dx;
				let v;
				if (sx < 0 || sx >= w) {
					v = 255;
				} else {
					const si = (y * w + sx) * 4;
					v = (sdata[si] + sdata[si + 1] + sdata[si + 2]) / 3;
				}
				v = Math.max(0, Math.min(255, v + band + gauss(noise)));
				const isInk = v < thr;
				const di = (y * w + x) * 4;
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
