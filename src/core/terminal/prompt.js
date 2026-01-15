const PROMPT = "guest@dustywright.me:~$>";
const PROMPT_HTML = `<span class="prompt">${PROMPT}</span>`;

export function getPrompt() {
  return PROMPT;
}

export function renderPrompt() {
  return PROMPT_HTML;
}

export function renderLivePrompt() {
  return `
    ${PROMPT_HTML}
    <input id="terminal-input" type="text" autocomplete="off" aria-label="Terminal command input" />
  `;
}
