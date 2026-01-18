// src/core/runtime/pageLoader.js
export async function loadAndRender(page, title, args = [], config) {
  const mod = await import(`../../pages/${page}.js`);
  const cfg = config || window.__config;
  await mod.render(args, cfg);
}
