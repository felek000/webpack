const webpack = require('webpack');
const path = require('path');
const entryDir = path.resolve(__dirname, 'assets/src');
const buildDir = path.resolve(__dirname, 'assets/dist');

const ExtractTextPlugin = require("extract-text-webpack-plugin");


const extractSass = new ExtractTextPlugin({
  filename: '[name]',
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: {
    'css/index.css': [
      entryDir + '/scss/index.scss',
    ],
  },
  output: {
    path: buildDir,
    // publicPath: 'css/',
    filename: '[name]',
  },
  watch: true,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: extractSass.extract({
          use: [
            {
              loader: 'css-loader', options: {
                url: false,
              },
            },
            'postcss-loader',
            {
              loader: 'sass-loader', options: {
              },
            }],
          fallback: 'style-loader',
        }),
      },
    ],
  },
  plugins: [
    extractSass,
  ]
};