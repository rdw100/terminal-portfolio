const PROMPT = "guest@dustywright.me:~$>";
const PROMPT_HTML = `<span class="prompt">${PROMPT}</span>`;

export function getPrompt() {
  return PROMPT;
}

export function renderPrompt() {
  return PROMPT_HTML;
}