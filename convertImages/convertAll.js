import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const baseFolder = './public/AboutImages';

async function compressImages(folderPath) {
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const fullPath = path.join(folderPath, file);

    if (fs.lstatSync(fullPath).isDirectory()) {
      await compressImages(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();

      // ✅ Skip already compressed files
      if (ext === '.webp' && !file.includes('-compressed')) {
        try {
          const buffer = await sharp(fullPath)
            .resize(1200)
            .webp({ quality: 50 })
            .toBuffer();

          fs.writeFileSync(fullPath, buffer);

          console.log(`✅ Compressed: ${file}`);
        } catch (err) {
          console.error(`❌ FAILED: ${file}`, err.message);
        }
      }
    }
  }
}

compressImages(baseFolder).then(() => {
  console.log("🎉 DONE");
});