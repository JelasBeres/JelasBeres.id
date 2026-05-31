const fs = require('fs');
const path = require('path');

const replacements = [
  { regex: /bg-white/g, replacement: 'bg-surface' },
  { regex: /bg-\[#F7F7F7\]/g, replacement: 'bg-background' },
  { regex: /bg-\[#FAFAFA\]/g, replacement: 'bg-surface-hover' },
  { regex: /bg-\[#F4F4F4\]/g, replacement: 'bg-surface-hover' },
  { regex: /bg-\[#F0F0F0\]/g, replacement: 'bg-surface-hover' },
  
  { regex: /text-\[#111\]/g, replacement: 'text-foreground' },
  { regex: /text-\[#333\]/g, replacement: 'text-foreground' },
  { regex: /text-\[#555\]/g, replacement: 'text-muted' },
  { regex: /text-\[#666\]/g, replacement: 'text-muted' },
  { regex: /text-\[#888\]/g, replacement: 'text-muted' },
  { regex: /text-\[#AAA\]/g, replacement: 'text-muted' },
  { regex: /text-\[#CCC\]/g, replacement: 'text-muted' },
  { regex: /text-\[#C0C0C0\]/g, replacement: 'text-muted' },
  
  { regex: /border-\[#EBEBEB\]/g, replacement: 'border-border' },
  { regex: /border-\[#E0E0E0\]/g, replacement: 'border-border' },
  { regex: /border-\[#E8E8E8\]/g, replacement: 'border-border' },
  { regex: /border-\[#EEE\]/g, replacement: 'border-border' },
  { regex: /border-\[#CCC\]/g, replacement: 'border-border' },
  { regex: /border-\[#999\]/g, replacement: 'border-border' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      replacements.forEach(({ regex, replacement }) => {
        content = content.replace(regex, replacement);
      });
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  });
}

processDirectory(path.join(__dirname, 'src/app/admin'));
processDirectory(path.join(__dirname, 'src/components/admin'));
console.log('Done!');
