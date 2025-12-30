import { ensureMarked } from '../services/markdownService.js';

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

export async function render(args) {
  const output = document.getElementById('output');
  await ensureMarked();

  // CASE 1: "theme" → show current theme
  if (!args || !args.length) {
    const current = getCurrentTheme();
    output.insertAdjacentHTML(
      "beforeend",
      `<div>The current theme is <strong>${current}</strong>.</div>`
    );
    return;
  }

  const sub = args[0];

  // CASE 2: "theme list" → render theme.md
  if (sub === "list") {
    const markdown = await fetch('content/theme.md').then(r => r.text());
    const html = marked.parse(markdown, { mangle: false, headerIds: false });
    output.insertAdjacentHTML('beforeend', html);
    return;
  }

  // CASE 3: "theme <name>" → apply theme + print message + render theme.md
  const result = applyTheme(sub);
  output.insertAdjacentHTML("beforeend", result);
  
}