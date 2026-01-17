/* Display help information for available commands from markdown 
 * template and config */
import { ensureMarked } from '../core/services/markdownService.js';
import { applyTemplate } from '../core/services/templateService.js';
import { commandRegistry } from '../core/terminal/commandRegistry.js'; 

export async function render(args = [], config) {
  const cfg = config || window.__config;
  const output = document.getElementById('output');

  await ensureMarked();

  // Load markdown
  let markdown = await fetch('/src/content/help.md').then(r => r.text());

  // Apply placeholders
  markdown = applyTemplate(markdown, cfg);

  // Inject dynamic command list
  if (markdown.includes('{{commands}}')) {
    const commandsHtml = generateCommandListHtml();
    markdown = markdown.replace('{{commands}}', commandsHtml);
  }

  // Convert to HTML
  const html = marked.parse(markdown, { mangle: false, headerIds: false });

  // Insert into terminal
  output.insertAdjacentHTML('beforeend', html);
}

// Build dynamic command list HTML
function generateCommandListHtml() {
  const entries = Object.entries(commandRegistry);

  // Group commands by category
  const groups = {};
  for (const [name, meta] of entries) {
    const category = meta.category || "Other";
    if (!groups[category]) groups[category] = [];
    groups[category].push([name, meta]);
  }

  // Sort categories alphabetically
  const sortedCategories = Object.keys(groups).sort();

  // Build output
  let output = "";

  for (const category of sortedCategories) {
    output += `\n\n${category}\n\n`;

    // Sort commands inside category
    const commands = groups[category].sort(([a], [b]) => a.localeCompare(b));

    for (const [name, meta] of commands) {
      const desc = meta.description || "";
      output += `- **${name}** — ${desc}\n`;
    }

    output += `\n`;
  }

  return output;
}
