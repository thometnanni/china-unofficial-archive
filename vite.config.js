import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { pdfWorker } from './vite-plugins/pdf-worker.js';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			preprocess: [mdsvex()],
			extensions: ['.svelte', '.svx'],
			compilerOptions: { experimental: { async: true } },
			adapter: adapter()
		}),
		pdfWorker(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			baseLocale: 'zh-cn',
			strategy: ['url', 'cookie', 'preferredLanguage', 'baseLocale'],
			urlPatterns: [
				{
					pattern: '/:path(.*)?',
					localized: [
						['en', '/en/:path(.*)?'],
						['zh-cn', '/zh-cn/:path(.*)?'],
						['zh-hk', '/zh-hk/:path(.*)?']
					]
				}
			]
		})
	]
});
