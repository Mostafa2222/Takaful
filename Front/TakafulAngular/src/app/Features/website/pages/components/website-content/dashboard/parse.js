const fs = require('fs');

const htmlContent = fs.readFileSync('dashboard.html', 'utf-8');

// Extract all <style> contents
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let styles = '';
let match;
while ((match = styleRegex.exec(htmlContent)) !== null) {
    styles += match[1] + '\n';
}

fs.writeFileSync('dashboard.component.css', styles);

// Extract the content inside <div id="root"> or <body>
let bodyHtml = '';

// Try finding root div content
const rootStartIndex = htmlContent.indexOf('<div id="root">');
if (rootStartIndex !== -1) {
    const start = rootStartIndex + '<div id="root">'.length;
    // Find the end by looking for the last </div> before </body>
    const end = htmlContent.lastIndexOf('</div>', htmlContent.lastIndexOf('</body>'));
    if (end > start) {
        bodyHtml = htmlContent.substring(start, end);
    }
}

if (!bodyHtml) {
    // fallback to body
    const bodyRegex = /<body[^>]*>([\s\S]*?)<\/body>/i;
    const fbMatch = htmlContent.match(bodyRegex);
    if (fbMatch) bodyHtml = fbMatch[1];
}

if (!bodyHtml) {
    bodyHtml = htmlContent;
}

fs.writeFileSync('dashboard.component.html', '<div class="dashboard-container" dir="rtl">\n' + bodyHtml + '\n</div>');

// Write TS file
const tsContent = `import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
  // أضف المتغيرات والدوال الخاصة بلوحة التحكم هنا
}
`;

fs.writeFileSync('dashboard.component.ts', tsContent);

console.log("Extraction complete.");
