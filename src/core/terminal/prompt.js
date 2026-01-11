export function getPrompt() {
  return "guest@dustywright.me:~$>";
}

export function renderPrompt() {
  return `<span class="prompt">${getPrompt()}</span>`;
}

export function renderLivePrompt() {
  return `
    <span class="prompt">${getPrompt()}</span>
    <input id="terminal-input" type="text" autocomplete="off" />
  `;
}