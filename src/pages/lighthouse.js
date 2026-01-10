export async function render(args = []) {
  const output = document.getElementById('output');

  try {
    const res = await fetch('/src/content/lighthouse/scores.json');
    if (!res.ok) throw new Error('Scores not found');

    const scores = await res.json();

    const html = `
<div>
  <h2>Lighthouse Scores (Production)</h2>
  <pre>
    Performance     : ${scores.performance}
    Accessibility   : ${scores.accessibility}
    Best Practices  : ${scores.bestPractices}
    SEO             : ${scores.seo}
  </pre>
</div><br/>
`;

    output.insertAdjacentHTML('beforeend', html);
  } catch (err) {
    output.insertAdjacentHTML(
      'beforeend',
      `<div>Unable to load Lighthouse scores.</div><br/>`
    );
  }
}