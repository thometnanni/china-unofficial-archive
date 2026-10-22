import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Serves pdf.js's worker from the installed package in dev and emits it into
// the client build, so no copy of it has to be committed to static/.
export function pdfWorker() {
	const workerPath = '/workers/pdf.worker.mjs';
	const workerFile = fileURLToPath(
		new URL('../node_modules/pdfjs-dist/build/pdf.worker.mjs', import.meta.url)
	);

	return {
		name: 'pdf-worker',
		configureServer(server) {
			server.middlewares.use(workerPath, (req, res) => {
				res.setHeader('Content-Type', 'text/javascript');
				res.end(readFileSync(workerFile));
			});
		},
		generateBundle() {
			if (this.environment.name !== 'client') return;
			this.emitFile({
				type: 'asset',
				fileName: workerPath.slice(1),
				source: readFileSync(workerFile)
			});
		}
	};
}
