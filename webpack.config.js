const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const environmentParts = require('./config/parts');

var config;

process.env.BABEL_ENV = 'development';

const PATHS = {
    app: path.resolve(__dirname, 'src/app.js'),
    src: path.resolve(__dirname, 'src'),
    style: path.resolve(__dirname, 'src/style/app.less'),
    build: path.resolve(__dirname, 'dist')
};

const _SERVER = {
    host: process.env.HOST,
    port: process.env.PORT
};

const common = {
    entry: {
        app: [PATHS.app, PATHS.style]
    },
    output: {
        path: PATHS.build,
        filename: '[name].[hash].js',
        chunkFilename: '[hash].js',
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    // Generate external sourcemaps for the JS & CSS bundles
    devtool: 'source-map',
    debug: true,
    plugins: [new HtmlWebpackPlugin({
        title: 'Reddit post reader'
    })],

};

switch(process.env.npm_lifecycle_event){
    case 'build':
        config = merge(
            common, 
            environmentParts.setupCSS(PATHS.src),
            environmentParts.setupES6(PATHS.src),
            environmentParts.clean(PATHS.build)
        );
        break;
    default:
        config = merge(
            common,
            environmentParts.devServer(_SERVER),
            environmentParts.setupCSS(PATHS.src),
            environmentParts.setupES6(PATHS.src)
        );
        break;
}


module.exports = validate(config);
