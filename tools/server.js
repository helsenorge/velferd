const webpack = require('webpack');
const WebPackDevServer = require('webpack-dev-server');
const config = require('../webpack.config');

new WebPackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  // It suppress error shown in console, so it has to be set to false.
  quiet: false,
  // It suppress everything except error, so it has to be set to false as well
  // to see success build.
  noInfo: false,
  stats: {
    // Config for minimal console.log mess.
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
  },
}).listen(8080, 'localhost', function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('Listening on localhost:8080');
});