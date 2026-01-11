/**
 * This service provides functionality to apply templates to markdown content.
 * It replaces placeholders in the format ${key} with corresponding values from a data object.
 * Nested keys are supported using dot notation (e.g., ${site.legacy_url}). Pre‑processing 
 * template substitution before Markdown rendering via Template Variable Substitution.
 * raw -> applyTemplate -> marked -> HTML
 * @param {string} markdown - The markdown content with placeholders.
 * @param {object} data - The data object containing values for placeholders.
 * @returns {string} - The markdown content with placeholders replaced by actual values. 
 */
export function applyTemplate(markdown, data) {
  return markdown.replace(/\$\{([^}]+)\}/g, (_, key) => {
    // Support nested keys like site.legacy_url
    const parts = key.split('.');
    let value = data;

    for (const part of parts) {
      value = value?.[part];
      if (value === undefined) return '';
    }

    return value;
  });
}