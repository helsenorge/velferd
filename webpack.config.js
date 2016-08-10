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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new StylelintPlugin({
      failOnError: true,
      quiet: false,
    }),
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
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        loader: 'react-hot!babel',
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite?',
      },
    ],
  },
};
