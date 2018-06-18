const webpack = require('webpack');
const path = require('path');
const entryDir = path.resolve(__dirname, 'assets/src');
const buildDir = path.resolve(__dirname, 'assets/dist');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");



const extractSass = new ExtractTextPlugin({
    filename: '[name]',
    disable: process.env.NODE_ENV === "development"
});

module.exports = (env, options) => {
    console.log(`env: ${env} mode: ${options.mode}`);
    return {
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
        watch: (options.mode == 'development') ? true : false,
        devtool: (options.mode == 'development') ? 'source-map' : false,
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    loader: extractSass.extract({
                        use: [
                            {
                                loader: 'css-loader', options: {
                                    sourceMap: true,
                                    url: false
                                }
                            },
                            'postcss-loader',
                            {
                                loader: 'sass-loader', options: {
                                    sourceMap: true,
                                    url: false
                                }
                            }],
                        fallback: 'style-loader'
                    }),
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(['assets/dist/css']),
            extractSass,
        ]
    }
};