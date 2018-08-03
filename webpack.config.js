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
            ],
            'js/index.js': [
                entryDir + '/js/index.js'
            ],
            'js/index2.js': [
                entryDir + '/js/index2.js'
            ],
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
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-transform-runtime']
                        }
                    }
                }
            ],
        },
        optimization: {
            splitChunks: {
                chunks: "all"
            }
        },
        plugins: [
            new CleanWebpackPlugin([buildDir]),
            extractSass
        ]
    }
};