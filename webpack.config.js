const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    {
                        // translates CSS into CommonJS
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        // compiles Sass to CSS
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    },
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts',
                            publicPath: '/fonts'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    // "file-loader",
                    // "extract-loader",
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ["img:src"]
                        }
                    },
                ]
            },
            {
                test: /\.(jpg|gif|png)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name(file) {
                            return '[hash].[ext]';
                        },
                        limit: 1e5,
                        outputPath: 'imgs',
                        publicPath: '/imgs'
                    },
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "My App",
            filename: path.join(path.resolve(__dirname, "dist"), "index.html"),
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9999,
        watchContentBase: true,
        serveIndex: true,
    },
    watch: true
};