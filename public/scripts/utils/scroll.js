export function scrollToBottom(smooth = false) {
  const terminal = document.getElementById('terminal');
  console.log('scrolling', terminal.scrollHeight);
  terminal.scrollTop = terminal.scrollHeight;
}