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
    'index.css': [
      entryDir + '/scss/index.scss',
    ],
  },
  output: {
    path: buildDir,
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
                sourceMap: true,
                url: false,
              },
            },
            'postcss-loader',
            {
              loader: 'sass-loader', options: {
                sourceMap: true,
              },
            }],
          // use style-loader in development
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader?name=img/[name].[ext]',
      },
      {
        test: /\.(eot|svg|ttf|woff)$/i,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
    ],
  },
  plugins: [
    extractSass,
  ]
};