var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval-source-map',
    entry: {
      main: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/main.js'
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],    
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'public'),
        publicPath: '/public/'
    },
    module: {
        loaders: [
            { 
                test: /\.jsx?$/, 
                include: path.join(__dirname, 'src'), 
                loader: 'react-hot!babel'
            },
            { 
                test: /\.scss$/, 
                loaders: ['style', 'css', 'sass'], 
                include: path.join(__dirname, 'src') 
            }
        ]
    }
};