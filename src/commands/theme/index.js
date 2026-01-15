/* Handle "theme" command: show current theme, list themes, or apply a new theme */

import { loadAndRender } from '../../core/pageLoader.js';

const validThemes = ["retro", "azure", "vapor", "minimal", "amber", "dusty"];

function applyTheme(name) {
  if (!validThemes.includes(name)) {
    return `<div>Unknown theme: ${name}. Available: ${validThemes.join(", ")}</div>`;
  }

  document.body.className = `theme-${name}`;
  localStorage.setItem("theme", name);

  return `<div>The new theme is <strong>${name}</strong>.</div>`;
}

function getCurrentTheme() {
  return localStorage.getItem("theme") || "retro";
}

export async function handleTheme(ctx) {
  const [sub] = ctx.args;

  // CASE 1: "theme" → show current theme
  if (!sub) {
    const current = getCurrentTheme();
    ctx.print(`<div>The current theme is <strong>${current}</strong>.</div>`);
    return;
  }

  // CASE 2: "theme list" → render theme.md
  if (sub === "list") {
    await loadAndRender('theme', 'Theme', ctx.args);
    return;
  }

  // CASE 3: "theme <name>" → apply theme + print message + render theme.md
  const result = applyTheme(sub);
  ctx.print(result);

  // Render theme.md after applying theme
  await loadAndRender('theme', 'Theme', ctx.args);
}