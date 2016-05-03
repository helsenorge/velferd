var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
      main: [
        './src/main.js'
      ]
    },    
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
                loader: 'babel'
            },
            { 
                test: /\.scss$/, 
                loaders: ['style', 'css', 'sass'], 
                include: path.join(__dirname, 'src') 
            }
        ]
    }
};