/**
 * Dynamically loads and renders page modules based on the provided page name.
 * @param {string} page - The name of the page to load and render.
 * @param {string} title - The title to display for the page.
 * @param {Array} args - Arguments to pass to the page's render function.
 * @param {Object} config - Configuration object for the page.
 * @returns {Promise<void>} A promise that resolves when the page has been loaded and rendered.
 */
export async function loadAndRender(page, title, args = [], config) {
  const mod = await import(`../../pages/${page}.js`);
  const cfg = config || window.__config;
  await mod.render(args, cfg);
}
