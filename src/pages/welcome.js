export async function render() {
  const output = document.getElementById('output');

  try {
    const md = await fetch('../../public/content/welcome.md')
      .then(res => res.text());

    const html = marked.parse(md);

    output.insertAdjacentHTML('beforeend', html);
  } catch (err) {
    output.insertAdjacentHTML(
      'beforeend',
      `<div>Error loading welcome: ${err.message}</div>`
    );
  }
}
