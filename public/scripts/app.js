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
async function renderLighthouse() {
  const { render } = await import('../pages/lighthouse.js');
  await render();
}
async function renderCoin(args = []) {
  const { render } = await import('../pages/coin.js');
  await render(args);
}

/* --- TERMINAL SETUP --- */
const output = document.getElementById('output');
const input = document.getElementById('command');
const terminal = document.getElementById('terminal');
const availableCommands = [
  'about',
  'clear',
  'gui',
  'help',
  'lighthouse',
  'projects',
  'resume',
  'socials',
  'welcome',
  'coin'
];

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

/* --- TERMINAL RESET/CLEAR --- */
function clearTerminal() {
  output.innerHTML = '';
  printCommand('welcome');
  requestAnimationFrame(scrollToBottom);
}

/* --- PRINT COMMAND PROMPT --- */ 
function printCommand(cmd) {
  output.insertAdjacentHTML(
    'beforeend',
    `<div class="terminal-command"><span class="prompt-user">guest@dustywright.me:</span><span class="prompt-symbol">~$&gt;</span> ${cmd}</div>`
  );  
}

/* --- LOADING SPINNER --- */
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

/* --- RENDER RESUME PAGE --- */
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

/* --- COMMAND HANDLERS --- */
const commandHandlers = {
  about: async () => await renderAbout(),
  gui: async () => await renderGui(),
  resume: async () => { showLoading(1200); await renderResume(); },
  projects: async (args) => { showLoading(1200); await renderProjects(args); },
  socials: async (args) => await renderSocials(args.join(' ')),
  clear: async () => { clearTerminal(); await renderWelcome(); },
  welcome: async () => await renderWelcome(),
  lighthouse: async () => await renderLighthouse(),
  help: async () => await renderHelp(),
  coin: async (args) => await renderCoin(args),
};

/* --- INPUT EVENT LISTENER KEYDOWN --- */
// --- COMMAND HISTORY ---
const commandHistory = [];
let historyIndex = -1;

input.addEventListener('keydown', async (e) => {
  // Command history navigation
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    if (commandHistory.length === 0) return;
    if (e.key === 'ArrowUp') {
      if (historyIndex === -1) historyIndex = commandHistory.length - 1;
      else if (historyIndex > 0) historyIndex--;
    } else if (e.key === 'ArrowDown') {
      if (historyIndex !== -1 && historyIndex < commandHistory.length - 1) historyIndex++;
      else historyIndex = -1;
    }
    if (historyIndex !== -1) {
      input.value = commandHistory[historyIndex];
    } else {
      input.value = '';
    }
    // Move cursor to end
    setTimeout(() => input.setSelectionRange(input.value.length, input.value.length), 0);
    e.preventDefault();
    return;
  }
   if (e.key === 'Tab') {
     e.preventDefault();
     const value = input.value;
     const parts = value.split(/\s+/);
     const cmd = parts[0];
     const match = availableCommands.find(c => c.startsWith(cmd));
     if (match) {
       input.value = match + (parts.length > 1 ? ' ' + parts.slice(1).join(' ') : '');
     }
     return;
   }
   if (e.key === 'Escape') {
     e.preventDefault();
     clearTerminal();
     await renderWelcome();
     input.value = '';
     historyIndex = -1;
     return;
   }
  if (e.key !== 'Enter') return;

  let cmd = input.value.trim();
  if (cmd) {
    commandHistory.push(cmd);
    if (commandHistory.length > 100) commandHistory.shift();
  }
  input.value = '';
  historyIndex = -1;

  printCommand(cmd);

  const [baseCmd, ...args] = cmd.split(/\s+/);
  const arg = args.join(' ');

  const handler = commandHandlers[baseCmd];
  if (handler) {
    await handler(args);
  } else {
    output.insertAdjacentHTML(
      'beforeend',
      `<div>Command not found</div>`
    );      
  }

  /* --- SCROLL TO BOTTOM AFTER COMMAND --- */
  requestAnimationFrame(() => {
    scrollToBottom(true);
  });

  /* --- REFOCUS INPUT AFTER COMMAND --- */
  input.focus();
});

window.appInsights.trackEvent({ name: "AppInitialized" });

setTimeout(() => {
  throw new Error("TestExceptionDusty");
}, 1000);