import { dispatchCommand } from '../commandRegistry.js';
import { addToHistory, getPrev, getNext } from './history.js';
import { renderPrompt } from './prompt.js';
import { autoScroll } from './scroll.js';
import { trackCommand } from './telemetry.js';

export function initializeTerminal() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('output');

  renderPrompt(output);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      input.value = getPrev();
      return;
    }

    if (e.key === 'ArrowDown') {
      input.value = getNext();
      return;
    }

    if (e.key === 'Enter') {
      const raw = input.value.trim();
      input.value = '';

      addToHistory(raw);
      trackCommand(raw);

      output.insertAdjacentHTML(
        'beforeend',
        `<div class="cmd">guest@dustywright.me:~$> ${raw}</div>`
      );

      dispatchCommand(raw, { output });

      renderPrompt(output);
      autoScroll(output);
    }
  });
}