import fs from 'fs';
import path from 'path';

const inputPath = path.resolve('public/content/resume.txt');
const outputPath = path.resolve('src/pages/resume.html');

const input = fs.readFileSync(inputPath, 'utf8');

let html = '';
let paragraph = [];

input.split('\n').forEach(line => {
if (!line.trim()) {
if (paragraph.length) {
html += `<p>${paragraph.join('<br>')}</p>`;
paragraph = [];
}
} else {
if (line.startsWith('http') || line.startsWith('mailto:')) {
paragraph.push(`<a href="${line}">${line}</a>`);
} else {
// preserve spacing and ASCII width
paragraph.push(line.replace(/ /g, ' '));
}
}
});

// flush remaining paragraph
if (paragraph.length) {
html += `<p>${paragraph.join('<br>')}</p>`;
}

fs.writeFileSync(outputPath, html);
console.log(`Resume built at ${outputPath}`);
