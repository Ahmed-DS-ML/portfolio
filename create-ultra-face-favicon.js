import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createUltraFaceFavicon() {
  try {
    const inputPath = path.join(__dirname, 'public', 'images', 'profile.jpg');
    
    // Create different favicon sizes with ultra face focus
    const sizes = [
      { size: 16, name: 'favicon-16x16.png' },
      { size: 32, name: 'favicon-32x32.png' },
      { size: 180, name: 'apple-touch-icon.png' },
      { size: 192, name: 'android-chrome-192x192.png' },
      { size: 512, name: 'android-chrome-512x512.png' }
    ];

    console.log('Creating ULTRA face-focused favicon from profile image...');
    console.log('🎯 Your face will be the STAR of the favicon!');
    
    for (const { size, name } of sizes) {
      const outputPath = path.join(__dirname, 'public', name);
      
      await sharp(inputPath)
        .resize(size * 2.5, size * 2.5, { // Make it much larger to crop face
          fit: 'cover',
          position: 'top' // Focus on the top part (face)
        })
        .extract({
          left: Math.floor(size * 0.35), // Start from 35% from left (more centered)
          top: Math.floor(size * 0.1), // Start from 10% from top (more face focus)
          width: size,
          height: size
        })
        .png({ quality: 100 })
        .toFile(outputPath);
      
      console.log(`✅ Created ${name} (${size}x${size}) - ULTRA Face focused`);
    }

    // Create ICO file with ultra face focus
    const icoPath = path.join(__dirname, 'public', 'favicon.ico');
    await sharp(inputPath)
      .resize(80, 80, { // Make it much larger to crop face
        fit: 'cover',
        position: 'top' // Focus on the top part (face)
      })
      .extract({
        left: 28, // Start from 35% from left (more centered)
        top: 8, // Start from 10% from top (more face focus)
        width: 32,
        height: 32
      })
      .png({ quality: 100 })
      .toFile(icoPath);
    
    console.log('✅ Created favicon.ico - ULTRA Face focused');
    console.log('\n🎉 All ULTRA face-focused favicon files created successfully!');
    console.log('📁 Check the public folder for the new favicon files.');
    console.log('👤 Your face will now be the HERO of browser tabs!');
    console.log('⭐ Face visibility: MAXIMUM!');
    
  } catch (error) {
    console.error('Error creating ultra face-focused favicon:', error);
  }
}

createUltraFaceFavicon();
