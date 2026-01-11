const history = [];
let index = -1;

export function addToHistory(cmd) {
  if (cmd.trim() === "") return;
  history.push(cmd);
  index = history.length; // always point to "one past the end"
}

export function getPrev() {
  if (history.length === 0) return "";
  if (index > 0) index--;
  return history[index] || "";
}

export function getNext() {
  if (history.length === 0) return "";
  if (index < history.length - 1) index++;
  else return ""; // past the end = empty input
  return history[index] || "";
}