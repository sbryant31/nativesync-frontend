/* eslint-disable no-console */

const fs = require('fs');

// Tiny, fast, and elegant implementation of core jQuery
// designed specifically for the server
const cheerio = require('cheerio');

const PROD = process.env.NODE_ENV === 'production';
const baseDir = PROD ? 'build' : 'dist';

fs.readFile('app/index.html', 'utf8', (err, markup) => {
  const loadMarkup = cheerio.load(markup);

  if (err) {
    return console.log(err);
  }

  if (PROD) {
    loadMarkup('head').prepend('<link rel="stylesheet" href="bundle.css">');
  }

  fs.writeFile(`${baseDir}/index.html`, loadMarkup.html(), 'utf8', (error) => {
    if (error) console.log(error);
    else console.log(`index.html written to /${baseDir}`);
  });
});
