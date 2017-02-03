const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false,
};

module.exports = {
  debug: true,
  devtool: 'source-map',
  entry: './src/main',
  target: 'web',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new CopyWebpackPlugin([{ from: './src/config.json' }]),
  ],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'public'),
    publicPath: '/public/',
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        include: path.join(__dirname, 'src'),
        loader: 'json',
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        loader: 'react-hot!babel',
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite?',
      },
    ],
  },
};
