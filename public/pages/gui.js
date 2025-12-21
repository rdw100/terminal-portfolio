import { getConfig } from '../services/configService.js';

export async function render() {
  const config = await getConfig();
  const legacyUrl = config.site?.legacy_url;

  if (!legacyUrl) {
    const output = document.getElementById('output');
    output.insertAdjacentHTML(
      'beforeend',
      `<div>Legacy URL not configured.</div>`
    );
    return;
  }

  window.open(legacyUrl, '_blank', 'noopener');
}