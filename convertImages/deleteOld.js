import fs from 'fs';
import path from 'path';

const baseFolder = './public';

function deleteOldImages(folderPath) {
  fs.readdirSync(folderPath).forEach(file => {
    const fullPath = path.join(folderPath, file);

    if (fs.lstatSync(fullPath).isDirectory()) {
      deleteOldImages(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();

      if (['.webp', '.webp', '.webp'].includes(ext)) {
        fs.unlinkSync(fullPath);
        console.log(`🗑 Deleted: ${fullPath}`);
      }
    }
  });
}

deleteOldImages(baseFolder);
console.log("🔥 Old images removed!");