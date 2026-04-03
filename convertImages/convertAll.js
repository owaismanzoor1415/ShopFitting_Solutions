import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const baseFolder = './public';

async function convertImages(folderPath) {
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const fullPath = path.join(folderPath, file);

    if (fs.lstatSync(fullPath).isDirectory()) {
      await convertImages(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();

      if (['.webp', '.webp', '.webp'].includes(ext)) {
        const outputPath = path.join(
          folderPath,
          path.parse(file).name + '.webp'
        );

        try {
          if (fs.existsSync(outputPath)) {
            console.log(`⏭ Skipped: ${file}`);
            continue;
          }

          await sharp(fullPath)
            .webp({ quality: 80 })
            .toFile(outputPath);

          console.log(`✅ Converted: ${fullPath}`);
        } catch (err) {
          console.error(`❌ FAILED: ${fullPath}`);
        }
      }
    }
  }
}

convertImages(baseFolder).then(() => {
  console.log("🎉 ALL DONE");
});