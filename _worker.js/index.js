globalThis.process ??= {}; globalThis.process.env ??= {};
import { r as renderers } from './chunks/_@astro-renderers_4EM0AhW_.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Ckm3pSEb.mjs';
import { manifest } from './manifest_DWvhwOpF.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/mission.astro.mjs');
const _page1 = () => import('./pages/privacy.astro.mjs');
const _page2 = () => import('./pages/team.astro.mjs');
const _page3 = () => import('./pages/terms.astro.mjs');
const _page4 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["src/pages/mission.astro", _page0],
    ["src/pages/privacy.astro", _page1],
    ["src/pages/team.astro", _page2],
    ["src/pages/terms.astro", _page3],
    ["src/pages/index.astro", _page4]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = undefined;
const _exports = createExports(_manifest);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
