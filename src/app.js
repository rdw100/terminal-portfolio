import { render as renderAbout } from '/src/pages/about.js';
import { render as renderProjects } from '/src/pages/projects.js';
import { render as renderWelcome } from './pages/welcome.js';

const output = document.getElementById('output');
const input = document.getElementById('command');
const terminal = document.getElementById('terminal');

/* --- INITIAL FOCUS & WELCOME --- */
await renderWelcome();
input.focus();

/* --- KEEP FOCUS ON CLICK --- */
terminal.addEventListener('click', () => {
  input.focus();
});

function printCommand(cmd) {
  output.insertAdjacentHTML(
    'beforeend',
    `<div class="terminal-command"><span class="prompt-user">guest@dustywright.me</span>
     <span class="prompt-symbol">~$&gt;</span> ${cmd}</div>`
  );
}

function clearTerminal() {
  output.innerHTML = '';
}

export async function renderResume() {
  const output = document.getElementById('output');

  try {
    const html = await fetch('/src/pages/resume.html').then(res => res.text());
    output.insertAdjacentHTML('beforeend', html);
  } catch (err) {
    output.insertAdjacentHTML(
      'beforeend',
      `<div>Error loading resume: ${err.message}</div>`
    );
  }
}

input.addEventListener('keydown', async (e) => {
  if (e.key !== 'Enter') return;

  const cmd = input.value.trim();
  input.value = '';

  printCommand(cmd);

  switch (cmd) {
    case 'about':
      await renderAbout();
      break;
    case 'resume':
      await renderResume();
      break;
    case 'projects':
      await renderProjects();
      break;
    case 'clear':
      clearTerminal();
      break;

    case 'help':
      output.insertAdjacentHTML(
        'beforeend',
        `<div>Commands: about, resume, projects, clear, help</div>`
      );
      break;

    default:
      output.insertAdjacentHTML(
        'beforeend',
        `<div>Command not found</div>`
      );
  }

  // Ensure cursor always returns
  input.focus();
});
