#!/usr/bin/env node
/**
 * download-fonts.js
 * Downloads Prompt Thai font (Google Fonts) and SpaceMono into assets/fonts/
 * Run: node download-fonts.js
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const FONTS_DIR = path.join(__dirname, 'assets', 'fonts');
if (!fs.existsSync(FONTS_DIR)) fs.mkdirSync(FONTS_DIR, { recursive: true });

const fonts = [
  {
    name: 'Prompt-Regular.ttf',
    url: 'https://fonts.gstatic.com/s/prompt/v10/-W_9XJnvUD7dzB26Z9AskQ.ttf',
  },
  {
    name: 'Prompt-Medium.ttf',
    url: 'https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeJ8akAhbA.ttf',
  },
  {
    name: 'Prompt-SemiBold.ttf',
    url: 'https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2Ket58akAhbA.ttf',
  },
  {
    name: 'Prompt-Bold.ttf',
    url: 'https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZc59akAhbA.ttf',
  },
  {
    name: 'SpaceMono-Regular.ttf',
    url: 'https://fonts.gstatic.com/s/spacemono/v13/i7dPIFZifjKcF5UAWdDRYEF8RQ.ttf',
  },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
        console.log(`✅ Downloaded: ${path.basename(dest)}`);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('📥 Downloading Thai Prompt fonts from Google Fonts...\n');
  for (const font of fonts) {
    const dest = path.join(FONTS_DIR, font.name);
    if (fs.existsSync(dest)) {
      console.log(`⏭️  Already exists: ${font.name}`);
      continue;
    }
    await download(font.url, dest);
  }
  console.log('\n✅ All fonts downloaded to assets/fonts/');
}

main().catch(console.error);
