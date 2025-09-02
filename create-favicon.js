import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createFavicon() {
  try {
    const inputPath = path.join(__dirname, 'public', 'images', 'profile.jpg');
    
    // Create different favicon sizes
    const sizes = [
      { size: 16, name: 'favicon-16x16.png' },
      { size: 32, name: 'favicon-32x32.png' },
      { size: 180, name: 'apple-touch-icon.png' },
      { size: 192, name: 'android-chrome-192x192.png' },
      { size: 512, name: 'android-chrome-512x512.png' }
    ];

    console.log('Creating favicon from profile image...');
    
    for (const { size, name } of sizes) {
      const outputPath = path.join(__dirname, 'public', name);
      
      await sharp(inputPath)
        .resize(size, size, {
          fit: 'cover',
          position: 'center'
        })
        .png({ quality: 100 })
        .toFile(outputPath);
      
      console.log(`✅ Created ${name} (${size}x${size})`);
    }

    // Create ICO file (16x16, 32x32)
    const icoPath = path.join(__dirname, 'public', 'favicon.ico');
    await sharp(inputPath)
      .resize(32, 32, {
        fit: 'cover',
        position: 'center'
      })
      .png({ quality: 100 })
      .toFile(icoPath);
    
    console.log('✅ Created favicon.ico');
    console.log('\n🎉 All favicon files created successfully!');
    console.log('📁 Check the public folder for the new favicon files.');
    
  } catch (error) {
    console.error('Error creating favicon:', error);
  }
}

createFavicon();
