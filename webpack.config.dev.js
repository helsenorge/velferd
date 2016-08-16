const path = require('path');
const webpack = require('webpack');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  debug: true,
  devtool: 'eval-source-map',
  entry: {
    main: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/main',
    ],
  },
  target: 'web',
  plugins: [
    new StylelintPlugin({
      failOnError: false,
      quiet: false,
      syntax: 'scss',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
  ],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'public'),
    publicPath: '/public/',
  },
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loaders: ['eslint'],
      include: path.join(__dirname, 'src'),
    }],
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
