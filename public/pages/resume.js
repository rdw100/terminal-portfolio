export async function render() {
  const output = document.getElementById('output');

  try {
    const html = await fetch('./pages/resume.html').then(res => res.text());
    output.insertAdjacentHTML('beforeend', html);
  } catch (err) {
    output.insertAdjacentHTML(
      'beforeend',
      `<div>Error loading resume: ${err.message}</div>`
    );
  }

  requestAnimationFrame(() => {
    const terminal = document.getElementById('terminal');
    terminal.scrollTop = terminal.scrollHeight;
  });
}