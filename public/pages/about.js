import { getConfig } from '../services/configService.js';

export async function render() {
  const output = document.getElementById('output');
  const ascii = await fetch('content/ascii.txt').then(r => r.text());

  const config = await getConfig();
  const legacyUrl = config.site.legacy_url || 'https://example.com';
  const email = config.site.contact_email || 'contact@example.com';

  output.insertAdjacentHTML(
    'beforeend',
    `
<pre>${ascii}</pre>
<p>
  Software engineer focused on data, systems, and tooling.<br>
  <a href="${legacyUrl}" target="_blank" rel="noopener">Legacy Site</a><br>
  <a href="mailto:${email}">${email}</a>
</p>
`
  );
}