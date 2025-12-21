import { render as renderAbout } from '../pages/about.js';
import { render as renderProjects } from '../pages/projects.js';
import { render as renderWelcome } from '../pages/welcome.js';
import { render as renderHelp } from '../pages/help.js';

const output = document.getElementById('output');
const input = document.getElementById('command');
const terminal = document.getElementById('terminal');

/* --- INITIAL FOCUS & WELCOME --- */
printCommand('welcome');
await renderWelcome();
input.focus();

/* --- KEEP FOCUS ON CLICK --- */
terminal.addEventListener('click', () => {
  input.focus();
});

function clearTerminal() {
  output.innerHTML = '';
  printCommand('welcome');
}

function printCommand(cmd) {
  output.insertAdjacentHTML(
    'beforeend',
    `<div class="terminal-command"><span class="prompt-user">guest@dustywright.me:</span><span class="prompt-symbol">~$&gt;</span> ${cmd}</div>`
  );
}

function showLoading(duration = 1000) {
  const output = document.getElementById('output');
  const spinner = document.createElement('div');
  spinner.textContent = '|';
  output.appendChild(spinner);

  const frames = ['|', '/', '-', '\\'];
  let i = 0;

  const interval = setInterval(() => {
    spinner.textContent = frames[i % frames.length];
    i++;
  }, 100);

  return new Promise(resolve => {
    setTimeout(() => {
      clearInterval(interval);
      spinner.remove();
      resolve();
    }, duration);
  });
}

export async function renderResume() {
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
      showLoading(1200);
      await renderResume();
      break;
    case 'projects':
      showLoading(1200);
      await renderProjects();
      break;
    case 'clear':
      clearTerminal();  
      await renderWelcome();
      break;
    case 'help':
      await renderHelp();
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
