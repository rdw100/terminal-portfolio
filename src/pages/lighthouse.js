export async function render(args = []) {
  const output = document.getElementById('output');

  try {
    const res = await fetch('/src/content/lighthouse/scores.json');
    if (!res.ok) throw new Error('Scores not found');

    const scores = await res.json();

    const html = `
    <table id="lighthouse-scores">
    <h2>Lighthouse Scores</h2>
    <thead>
      <tr><th style="text-align: left;">Category</th><th>Score</th></tr>
    </thead>
    <tbody>
      <tr><td>Performance   </td><td class="lsData">${scores.performance}</td></tr>
      <tr><td>Accessibility </td><td class="lsData">${scores.accessibility}</td></tr>
      <tr><td>Best Practices</td><td class="lsData">${scores.bestPractices}</td></tr>
      <tr><td>SEO           </td><td class="lsData">${scores.seo}</td></tr>
    </tbody>
    </table>`;

    output.insertAdjacentHTML('beforeend', html);
  } catch (err) {
    output.insertAdjacentHTML(
      'beforeend',
      `<div>Unable to load Lighthouse scores.</div><br/>`
    );
  }
}