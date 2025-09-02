import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createFaceFavicon() {
  try {
    const inputPath = path.join(__dirname, 'public', 'images', 'profile.jpg');
    
    // Create different favicon sizes with face focus
    const sizes = [
      { size: 16, name: 'favicon-16x16.png' },
      { size: 32, name: 'favicon-32x32.png' },
      { size: 180, name: 'apple-touch-icon.png' },
      { size: 192, name: 'android-chrome-192x192.png' },
      { size: 512, name: 'android-chrome-512x512.png' }
    ];

    console.log('Creating face-focused favicon from profile image...');
    
    for (const { size, name } of sizes) {
      const outputPath = path.join(__dirname, 'public', name);
      
      await sharp(inputPath)
        .resize(size * 1.5, size * 1.5, { // Make it larger to crop face
          fit: 'cover',
          position: 'top' // Focus on the top part (face)
        })
        .extract({
          left: Math.floor(size * 0.25), // Start from 25% from left
          top: 0, // Start from top
          width: size,
          height: size
        })
        .png({ quality: 100 })
        .toFile(outputPath);
      
      console.log(`✅ Created ${name} (${size}x${size}) - Face focused`);
    }

    // Create ICO file with face focus
    const icoPath = path.join(__dirname, 'public', 'favicon.ico');
    await sharp(inputPath)
      .resize(48, 48, { // Make it larger to crop face
        fit: 'cover',
        position: 'top' // Focus on the top part (face)
      })
      .extract({
        left: 12, // Start from 25% from left
        top: 0, // Start from top
        width: 32,
        height: 32
      })
      .png({ quality: 100 })
      .toFile(icoPath);
    
    console.log('✅ Created favicon.ico - Face focused');
    console.log('\n🎉 All face-focused favicon files created successfully!');
    console.log('📁 Check the public folder for the new favicon files.');
    console.log('👤 Your face will now be clearly visible in browser tabs!');
    
  } catch (error) {
    console.error('Error creating face-focused favicon:', error);
  }
}

createFaceFavicon();
