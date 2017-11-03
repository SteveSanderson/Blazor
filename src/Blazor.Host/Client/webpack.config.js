const path = require('path');
const webpack = require('webpack');

module.exports = {
    resolve: { extensions: ['.ts', '.js'] },
    devtool: 'inline-source-map',
    module: {
        noParse: /[/\\]mono.js$/,
        rules: [{ test: /\.ts?$/, loader: 'awesome-typescript-loader' }]
    },
    entry: { 'Blazor.Host': './src/Boot.ts' },
    output: { path: path.join(__dirname, '/dist'), filename: '[name].js' }
};
