const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // npm i mini-css-extract-plugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // npm i clean-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //-------------------
    //   entry: './src/index.js', //single entry
    //-------------------
    entry: { // multipage
       'hello-world': './src/hello-world.js',
       'image': './src/image.js'
    },
    output: {
        // filename: 'bundle.[contenthash].js', // [contenthash] will add a unique hash key after every file change; useful for browser cache
        filename: '[name].[contenthash].js', //multi name bundles for multipage
        path: path.resolve(__dirname, './dist'),
        //publicPath: 'dist/' //public path to files
    },
    mode: 'production',
    optimization: { // create separate bundle for commonly used dependancy like lodash
        splitChunks: {
            chunks: 'all',
            minSize: 10000 // split and create a new bundle when bundle size exceeds 10kb before minification
        }
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
                    MiniCssExtractPlugin.loader, //added in place of style-loader
                   // 'style-loader', // executed  second,bundle css and js into resultant file like bundle.js
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
        new MiniCssExtractPlugin({
            // filename: 'styles.[contenthash].css'
            filename: '[name].[contenthash].css'
        }), // extract css to a separate file and add link tag in run time instead of style tag
        new  CleanWebpackPlugin({ // clean dist folder before every build
            cleanOnceBeforeBuildPatterns: [
                '**/*', // remove all files and sub directories from dist as mentioned in output config
                path.join(process.cwd(), 'build/**/*') // clean all files under build directory; name can be anything not just 'build'
            ]
        }),
        // ----------------------------
        // multipage config
        // ----------------------------
        new HtmlWebpackPlugin({
            title: 'Hello World',
            filename: 'hello-world.html',
            chunks: ['hello-world'],
            meta: {
                description: 'This is hello world'
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Image',
            filename: 'image.html',
            chunks: ['image'],
            meta: {
                description: 'This is image'
            }
        })
    ]
} 