const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const GLOBALS = {
  // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  "process.env": {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }
}

const PROD = process.env.NODE_ENV === 'production';

module.exports = {
  debug: false,
  devtool: PROD ? '' : 'eval-source-map',
  noInfo: false,
  entry: PROD ? './app/index' :
    [ // reloads the page if hot module reloading fails
      'webpack-hot-middleware/client?reload=true',
      './app/index',
    ],
  target: 'web',
  output: {
    path: path.join(__dirname, (PROD ? '/build' : '/dist')),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: PROD ? './build' : './app',
  },
  plugins: PROD ? [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.DedupePlugin(),
    // remove for now, uglify is causing memory to go through the roof
    //new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
  ] : [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'app'),
        loaders: ['babel'],
      },
      {
        test: /\.css$/,
        loader: PROD ?
          ExtractTextPlugin.extract('style', 'css?sourceMap') :
          'style!css?sourceMap',
      },
      {
        test: /\.scss$/,
        loader: PROD ?
          ExtractTextPlugin.extract('style', 'css?sourceMap!resolve-url!sass?sourceMap') :
          'style!css?sourceMap!resolve-url!sass?sourceMap',
      },
      {test: /\.(svg|png|jpe?g|gif)(\?\S*)?$/, loader: 'url?limit=100000&name=img/[name].[ext]'},
      {test: /\.(eot|woff|woff2|ttf)(\?\S*)?$/, loader: 'url?limit=100000&name=fonts/[name].[ext]'},
      { test: /\.json$/, loader: 'json-loader' }
    ],
  },
  sassLoader: {
    includePaths: [path.resolve('./app')],
  },
  resolve: {
    root: [path.resolve('./app')],
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
