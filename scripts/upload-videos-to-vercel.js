/**
 * Upload videos to Vercel Blob Storage
 * 
 * Steps to run:
 * 1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
 * 2. Create a new variable: BLOB_READ_WRITE_TOKEN
 * 3. Run: $env:BLOB_READ_WRITE_TOKEN="your-token-here"; node scripts/upload-videos-to-vercel.js
 */

const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

const videos = [
  'white.mp4',
  'garden.mp4',
  'cottage.mp4',
  'hilltop.mp4',
  'sunrise.mp4',
  'chalet.mp4',
  'viewpoint.mp4'
];

async function uploadVideos() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  
  if (!token) {
    console.error('❌ Error: BLOB_READ_WRITE_TOKEN environment variable not set');
    console.log('\nSteps to get your token:');
    console.log('1. Go to https://vercel.com/dashboard');
    console.log('2. Select your project → Settings → Environment Variables');
    console.log('3. Add new variable: BLOB_READ_WRITE_TOKEN');
    console.log('4. Copy the token value');
    console.log('\nThen run:');
    console.log('$env:BLOB_READ_WRITE_TOKEN="your-token"; node scripts/upload-videos-to-vercel.js');
    process.exit(1);
  }

  console.log('🚀 Starting video upload to Vercel Blob Storage...\n');

  const urls = {};

  for (const video of videos) {
    const videoPath = path.join(__dirname, '..', 'public', 'video', video);
    
    if (!fs.existsSync(videoPath)) {
      console.log(`⚠️  Skipping ${video} - file not found`);
      continue;
    }

    const fileBuffer = fs.readFileSync(videoPath);
    const fileSizeMB = (fileBuffer.length / (1024 * 1024)).toFixed(2);
    
    console.log(`📤 Uploading ${video} (${fileSizeMB} MB)...`);

    try {
      const blob = await put(`videos/${video}`, fileBuffer, {
        access: 'public',
        token: token,
      });

      urls[video] = blob.url;
      console.log(`✅ Uploaded: ${blob.url}\n`);
    } catch (error) {
      console.error(`❌ Failed to upload ${video}:`, error.message);
    }
  }

  console.log('\n📋 Video URLs:');
  console.log(JSON.stringify(urls, null, 2));
  
  console.log('\n✅ Upload complete! Copy the URLs above to update your code.');
}

uploadVideos().catch(console.error);
