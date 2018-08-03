const webpack = require('webpack');
const path = require('path');
const entryDir = path.resolve(__dirname, 'assets/src');
const buildDir = path.resolve(__dirname, 'assets/dist');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const extractSass = new ExtractTextPlugin({
    filename: '[name]'
});
module.exports = (env, options) => {
    console.log(`env: ${env} mode: ${options.mode}`);
    return {
        entry: {
            'css/index.css': [
                entryDir + '/scss/index.scss',
            ]
        },
        output: {
            path: buildDir,
            publicPath: 'dist/',
            filename: '[name]',
        },
        watch: (options.mode == 'development') ? true : false,
        devtool: (options.mode == 'development') ? 'source-map' : false,
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    loader: extractSass.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    url: false,
                                    sourceMap: (options.mode == 'development') ? true : false,
                                },
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: (options.mode == 'development') ? true : false,
                                },
                            },
                            'postcss-loader'
                        ]
                    }),
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin([buildDir]),
            extractSass
        ]
    }
};