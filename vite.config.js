import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
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
