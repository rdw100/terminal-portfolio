import { Analytics } from "../analytics/appinsights.js";

Analytics.init("__TP_INSIGHTS_CONN__");
/* --- DYNAMIC PAGE LOADERS --- */
// Note: Could use a generic loader, but explicit is clearer for tracking
/* async function loadAndRender(page, name, args = null) {
  const { render } = await import(`../pages/${page}.js`);
  trackRender(name, args);
  await render(args);
} */
async function renderAbout() {
  Analytics.trackPage("renderAbout");  
  const { render } = await import('../pages/about.js');
  await render();
}
async function renderHelp() {
  Analytics.trackPage("renderHelp");
  const { render } = await import('../pages/help.js');  
  await render();
}
async function renderProjects(args = []) {
  Analytics.trackPage("renderProjects", args);
  const { render } = await import('../pages/projects.js');
  await render(args);
}
async function renderWelcome() {
  Analytics.trackPage("renderWelcome");
  const { render } = await import('../pages/welcome.js');
  await render();
}
async function renderSocials(args = []) {
  Analytics.trackPage("renderSocials", args);
  const { render } = await import('../pages/socials.js');
  await render(args);
}
async function renderGui() {
  Analytics.trackPage("renderGui"); // Track page render
  const { render } = await import('../pages/gui.js');
  await render();
}
async function renderLighthouse() {
  Analytics.trackPage("renderLighthouse"); // Track page render
  const { render } = await import('../pages/lighthouse.js');
  await render();
}
async function renderCoin(args = []) {
  Analytics.trackPage("renderCoin", args); // Track page render
  const { render } = await import('../pages/coin.js');
  await render(args);
}
async function renderTheme(args) {
  Analytics.trackPage("renderTheme", args); // Track page render
  const { render } = await import('../pages/theme.js');
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
  'coin',
  'theme'
];

/* --- THEME ENGINE --- */
const validThemes = ["retro", "azure", "vapor", "minimal", "amber", "dusty"];

function setTheme(name) {
  if (!validThemes.includes(name)) {
    output.insertAdjacentHTML(
      "beforeend",
      `<div>Unknown theme: ${name}. Available: ${validThemes.join(", ")}</div>`
    );
    return;
  }

  document.body.className = `theme-${name}`;
  localStorage.setItem("theme", name);

  output.insertAdjacentHTML(
    "beforeend",
    `<div>Theme set to <strong>${name}</strong></div>`
  );
}

/* --- APPLICATION INSIGHTS SETUP BEGINNING --- */
// Persistent user ID
let userId = localStorage.getItem("ai_userId");
if (!userId) {
  userId = crypto.randomUUID();
  localStorage.setItem("ai_userId", userId);
}
// New session each page load
const sessionId = crypto.randomUUID();
/* --- APPLICATION INSIGHTS SETUP ENDING --- */

/* --- SCROLL (FINAL, LOCKED) --- */
function scrollToBottom() {
  if (!terminal) return;
  terminal.scrollTop = terminal.scrollHeight;
}

/* --- INITIAL FOCUS & WELCOME --- */
input.focus();

/* --- LOAD SAVED THEME --- */
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.body.className = `theme-${savedTheme}`;
}

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
    `<div class="terminal-command"><span class="prompt-user">guest@dustywright.me:</span><span class="prompt-symbol">~$&gt;&nbsp;</span> ${cmd}</div>`
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
  theme: async (args) => await renderTheme(args),
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

  const raw = input.value.trim();
  const [baseCmd, ...args] = cmd.split(/\s+/);
  const arg = args.join(' ');
  const handler = commandHandlers[baseCmd];

  if (handler) {
    Analytics.trackEvent("CommandExecuted", {
      raw,
      baseCmd,
      args
    });
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

/* --- APPLICATION INSIGHTS TRACKING BEGINNING --- */
Analytics.trackEvent("AppInitialized", { sessionId, userId });

Analytics.trackEvent({
  name: "SessionStarted",
  properties: {
    sessionId,
    userId
  }
});

window.addEventListener("beforeunload", () => {
  Analytics.trackEvent("SessionEnded", { sessionId, userId });
});
/* --- APPLICATION INSIGHTS TRACKING ENDING --- */

/* setTimeout(() => {
  throw new Error("TestExceptionDusty");
}, 1000); */