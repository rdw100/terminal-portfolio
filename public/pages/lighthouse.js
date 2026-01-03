export async function render() {
  const output = document.getElementById('output');

  try {
    const res = await fetch('../lighthouse/scores.json');
    if (!res.ok) throw new Error('Scores not found');

    const scores = await res.json();

    output.insertAdjacentHTML(
      'beforeend',
      `
<div>
  <h2>Lighthouse Scores (Production)</h2>
  <pre>    Performance     : ${scores.performance}
    Accessibility   : ${scores.accessibility}
    Best Practices  : ${scores.bestPractices}
    SEO             : ${scores.seo}</pre></div>`
    );
  } catch (err) {
    output.insertAdjacentHTML(
      'beforeend',
      `<div>Unable to load Lighthouse scores.</div>` + '<br/>'
    );
  }
}