/* --- DYNAMIC PAGE LOADERS --- */
async function renderAbout() {
  const { render } = await import('../pages/about.js');
  await render();
}
async function renderHelp() {
  const { render } = await import('../pages/help.js');
  await render();
}
async function renderProjects(args = []) {
  const { render } = await import('../pages/projects.js');
  await render(args);
}
async function renderWelcome() {
  const { render } = await import('../pages/welcome.js');
  await render();
}
async function renderSocials(args = []) {
  const { render } = await import('../pages/socials.js');
  await render(args);
}
async function renderGui() {
  const { render } = await import('../pages/gui.js');
  await render();
}

const output = document.getElementById('output');
const input = document.getElementById('command');
const terminal = document.getElementById('terminal');

/* --- SCROLL (FINAL, LOCKED) --- */
function scrollToBottom() {
  if (!terminal) return;
  terminal.scrollTop = terminal.scrollHeight;
}

/* --- INITIAL FOCUS & WELCOME --- */
input.focus();

/* Render welcome AFTER first paint, non-blocking */
requestAnimationFrame(() => {
  printCommand('welcome');

  // Start loading welcome content asynchronously, no blocking
  renderWelcome().then(() => {
    requestAnimationFrame(scrollToBottom);
  });

  input.focus();
});

/* --- KEEP FOCUS ON CLICK --- */
terminal.addEventListener('click', () => {
  input.focus();
});

function clearTerminal() {
  output.innerHTML = '';
  printCommand('welcome');
  requestAnimationFrame(scrollToBottom);
}

function printCommand(cmd) {
  output.insertAdjacentHTML(
    'beforeend',
    `<div class="terminal-command"><span class="prompt-user">guest@dustywright.me:</span><span class="prompt-symbol">~$&gt;</span> ${cmd}</div>`
  );  
}

function showLoading(duration = 1000) {
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

  requestAnimationFrame(scrollToBottom);
}

input.addEventListener('keydown', async (e) => {
  if (e.key !== 'Enter') return;

  let cmd = input.value.trim();
  input.value = '';

  printCommand(cmd);

  const [baseCmd, ...args] = cmd.split(/\s+/);
  const arg = args.join(' ');

  switch (baseCmd) {
    case 'about':
      await renderAbout();
      break;
    case 'gui':
      await renderGui();
      break;
    case 'resume':
      showLoading(1200);
      await renderResume();
      break;
    case 'projects': {
      showLoading(1200);
      const parts = cmd.split(/\s+/);
      await renderProjects(parts.slice(1));
      break;
    }
    case 'socials':
      await renderSocials(arg);
      break;
    case 'clear':
      clearTerminal();
      await renderWelcome();
      break;
    case 'welcome':
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

  requestAnimationFrame(() => {
    scrollToBottom(true);
  });

  input.focus();
});