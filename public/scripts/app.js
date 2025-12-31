import { Analytics } from "../analytics/appinsights.js";

Analytics.init("__TP_INSIGHTS_CONN__");

/* --- DYNAMIC PAGE LOADING USING GENERIC --- */
async function loadAndRender(page, name, args = null) {
  const { render } = await import(`../pages/${page}.js`);
  Analytics.trackPage(name, args);
  await render(args);
  scrollToBottom();
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
  requestAnimationFrame(() => {
    terminal.scrollTop = terminal.scrollHeight;
  });
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
  loadAndRender("welcome", "renderWelcome")
  input.focus();
});

/* --- KEEP FOCUS ON CLICK --- */
terminal.addEventListener('click', () => {
  input.focus();
});

/* --- TERMINAL RESET/CLEAR --- */
function clearTerminal() {
  output.innerHTML = '';
  printCommand('clear');
}

/* --- PRINT COMMAND PROMPT --- */
function printCommand(cmd) {
  output.insertAdjacentHTML(
    'beforeend',
    `<div class="terminal-command"><span class="prompt-user">guest@dustywright.me:</span><span class="prompt-symbol">~$&gt;&nbsp;</span> ${cmd}</div>`
  );
}

/* --- LOADING SPINNER --- */
async function showLoading(duration = 1000) {
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

/* --- COMMAND HANDLERS --- */
const commandHandlers = {
  about: async () => loadAndRender("about", "renderAbout"),
  gui: async () => loadAndRender("gui", "renderGui"),
  resume: async () => { await showLoading(1200); await loadAndRender("resume", "renderResume"); },
  projects: async (args) => { await showLoading(1200); await loadAndRender("projects", "renderProjects", args); },
  socials: async (args) => loadAndRender("socials", "renderSocials", args.join(" ")),
  clear: async () => { clearTerminal(); await loadAndRender("welcome", "renderWelcome"); },
  welcome: async () => loadAndRender("welcome", "renderWelcome"),
  lighthouse: async () => loadAndRender("lighthouse", "renderLighthouse"),
  help: async () => loadAndRender("help", "renderHelp"),
  coin: async (args) => loadAndRender("coin", "renderCoin", args),
  theme: async (args) => loadAndRender("theme", "renderTheme", args),
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
    await loadAndRender("welcome", "renderWelcome");
    input.value = '';
    historyIndex = -1;
    return;
  }

  if (e.key !== 'Enter') return;

  let cmd = input.value.trim();
  const raw = cmd;
  if (cmd) {
    commandHistory.push(cmd);
    if (commandHistory.length > 100) commandHistory.shift();
  }
  input.value = '';
  historyIndex = -1;

  printCommand(cmd);

  const [baseCmd, ...args] = cmd.split(/\s+/);
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