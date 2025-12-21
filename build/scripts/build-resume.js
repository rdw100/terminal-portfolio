import fs from 'fs';
import path from 'path';

const inputPath = path.resolve('public/content/resume.txt');
const outputPath = path.resolve('public/pages/resume.html');

if (!fs.existsSync('public/content/resume.txt')) {
  throw new Error('resume.txt not found');
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

// Group items by paragraphs (keep ASCII width if needed)
const html = input
    .split(/\n{2,}/) // double line = new paragraph
    .map(paragraph => {
        const lines = paragraph.split('\n');
        const content = lines.map(line => linkify(line)).join('<br>');
        return `<p>${content}</p>`;
    })
    .join('\n');

fs.writeFileSync(outputPath, html, 'utf8');
console.log('resume.html generated successfully.');