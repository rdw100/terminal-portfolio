/* Renders the resume page by loading a prebuilt HTML file */

export async function render(args = []) {
  const output = document.getElementById('output');

  try {
    // Load prebuilt HTML resume
    const html = await fetch('/src/content/resume.html').then(res => res.text());

    // Insert into terminal
    output.insertAdjacentHTML('beforeend', html);
  } catch (err) {
    output.insertAdjacentHTML(
      'beforeend',
      `<div>Error loading resume: ${err.message}</div><br/>`
    );
  }
}