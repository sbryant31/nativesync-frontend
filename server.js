// Imports
const compression = require('compression');
const config = require('./webpack.config');
const express = require('express');
const open = require('open');
const path = require('path');
const webpack = require('webpack');

// Other variables
const app = express();
const compiler = webpack(config);
const PROD = process.env.NODE_ENV === 'production';
const domain = PROD ? '0.0.0.0' : '127.0.0.1';
const port = PROD ? (process.env.PORT || 8080) : 9966;
const baseDir = PROD ? 'build' : 'dist';

// Middleware
if (PROD) {
  app.use(compression());
} else {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(express.static(baseDir));

// Client routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './', baseDir, '/index.html'));
});

app.listen(port, () => {
  open(`http://${domain}:${port}`);
});
