import fs from 'fs';
import path from 'path';

function rename(folderPath) {
  for (const file of fs.readdirSync(folderPath)) {
    const fullPath = path.join(folderPath, file);

    if (fs.lstatSync(fullPath).isDirectory()) {
      rename(fullPath);
      continue;
    }

    if (file.endsWith('.webp.tmp')) {
      const newPath = fullPath.replace('.webp.tmp', '.webp');
      fs.renameSync(fullPath, newPath);
      console.log(`🔁 Renamed: ${file}`);
    }
  }
}

rename('../public');

console.log('✅ All files converted to .webp');