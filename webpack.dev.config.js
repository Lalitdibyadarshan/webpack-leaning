const path = require('path');
// const TerserPlugin = require('terser-webpack-plugin'); // npm i terser-webpack-plugin
// const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // npm i mini-css-extract-plugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // npm i clean-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.[contenthash].js', // [contenthash] will add a unique hash key after every file change; useful for browser cache
        path: path.resolve(__dirname, './dist'),
        //publicPath: 'dist/' //public path to files
    },
    mode: 'development',
    devServer: { // dev server config
        contentBase: path.resolve(__dirname, './dist'),
        index: 'index.html',
        port: 9000,
        writeToDisk: true
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/, // applies only for png and jpg file
                use: [
                    'file-loader' // helps bundling files
                ]
            },
            {
                test: /\.css$/, // applies only to css file
                use: [
                    // MiniCssExtractPlugin.loader, //added in place of style-loader
                    'style-loader', // executed  second,bundle css and js into resultant file like bundle.js
                    'css-loader' //executed first, read css file
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // npm install @babel/core babel-loader @babel/preset-env @babel/plugin-proposal-class-properties
                    options: {
                        presets: [ '@babel/env' ],
                        plugins: [ '@babel/plugin-proposal-class-properties']
                    }
                }
            }
           /* {
                test: /\.scss$/, // applies only to css file
                use: [
                    'style-loader', // executed  second,bundle css and js into resultant file like bundle.js
                    'css-loader', //executed first, read css file
                    'sass-loader' // install sass-loader and node-sass
                ]
            }*/
        ]
    },
    plugins: [
        // new TerserPlugin(), // to reduce bundle size
        // new MiniCssExtractPlugin({  // not needed in develop mode as it take extra time
        //     filename: 'styles.[contenthash].css'
        // }), // extract css to a separate file and add link tag in run time instead of style tag
        new  CleanWebpackPlugin({ // clean dist folder before every build
            cleanOnceBeforeBuildPatterns: [
                '**/*', // remove all files and sub directories from dist as mentioned in output config
                path.join(process.cwd(), 'build/**/*') // clean all files under build directory; name can be anything not just 'build'
            ]
        }),
        new HtmlWebpackPlugin({
            title: 'Hello World',
            filename: 'index.html',
            meta: {
                description: 'This s hello world'
            }
        })
    ]
} 