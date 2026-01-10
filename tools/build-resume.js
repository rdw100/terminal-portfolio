const fs = require('fs');
const path = require('path');

const inputPath = path.resolve('src/content/resume.txt');
const outputPath = path.resolve('src/pages/resume.html');

if (!fs.existsSync(inputPath)) {
  throw new Error('resume.txt not found at src/content/resume.txt');
}

const input = fs.readFileSync(inputPath, 'utf8');

// Helper: detect URLs, mailto, and plain email addresses
function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const mailRegex = /(mailto:[^\s]+)/g;
  const emailRegex = /\b([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,})\b/g; 
  return text
    .replace(urlRegex, '<a href="$1" target="_blank">$1</a>')
    .replace(mailRegex, '<a href="$1">$1</a>')
    .replace(emailRegex, '<a href="mailto:$1">$1</a>');
}

// Convert spaces → &nbsp; AFTER linkify, BEFORE joining with <br>
function preserveSpaces(text) {
  return text.replace(/ (?![^<]*>)/g, '&nbsp;');
}

// Group items by paragraphs (keep ASCII width)
const html = input
  .split(/\n{2,}/) // double line = new paragraph
  .map(paragraph => {
    const lines = paragraph.split('\n');

    const content = lines
      .map(line => preserveSpaces(linkify(line)))
      .join('<br>');

    return `<p>${content}</p>`;
  })
  .join('\n');

fs.writeFileSync(outputPath, html);
console.log('resume.html generated successfully.');