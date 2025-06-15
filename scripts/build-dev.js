const { exec } = require('child_process');
const path = require('path');

// Get the absolute path to contentlayer.config.js
const configPath = path.resolve(__dirname, '../contentlayer.config.js');

// Run contentlayer build with explicit config path
exec(`node_modules/.bin/contentlayer build --config "${configPath}"`, (error, stdout, stderr) => {
  console.log('Contentlayer Build Output:', stdout);
  if (error) {
    console.error('Contentlayer Build Error:', stderr);
    process.exit(1);
  }

  // If contentlayer succeeds, run next build
  exec('next build', (error, stdout, stderr) => {
    console.log('Next.js Build Output:', stdout);
    if (error) {
      console.error('Next.js Build Error:', stderr);
      process.exit(1);
    }
  });
});