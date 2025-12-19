import fs from 'fs';


const input = fs.readFileSync('public/content/resume.txt', 'utf8');


const html = input
.split('\n')
.map(line => {
if (line.startsWith('http') || line.startsWith('mailto:')) {
return `<a href="${line}">${line}</a>`;
}
return line ? `<p>${line}</p>` : '<br>';
})
.join('\n');


fs.writeFileSync('public/content/resume.html', html);