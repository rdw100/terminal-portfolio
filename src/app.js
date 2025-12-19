import { render as renderAbout } from './pages/about.js';

const output = document.getElementById('output');
const input = document.getElementById('command');
const terminal = document.getElementById('terminal');

/* --- INITIAL FOCUS --- */
input.focus();

/* --- KEEP FOCUS ON CLICK --- */
terminal.addEventListener('click', () => {
  input.focus();
});

function printCommand(cmd) {
  output.insertAdjacentHTML('beforeend', `<div>&gt; ${cmd}</div>`);
}

function clearTerminal() {
  output.innerHTML = '';
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
