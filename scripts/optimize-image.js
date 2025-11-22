const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'public', 'logo-uny.png');
const outputPath = path.join(__dirname, '..', 'public', 'logo-uny-optimized.png');

console.log('Original size:', (fs.statSync(inputPath).size / 1024).toFixed(2), 'KB');

sharp(inputPath)
  .resize(512, 512, { fit: 'inside', withoutEnlargement: true })
  .png({ quality: 90, compressionLevel: 9, effort: 10 })
  .toFile(outputPath)
  .then(() => {
    console.log('Optimized size:', (fs.statSync(outputPath).size / 1024).toFixed(2), 'KB');
    // Replace original
    fs.copyFileSync(outputPath, inputPath);
    fs.unlinkSync(outputPath);
    console.log('Image optimized successfully!');
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
