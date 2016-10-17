const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

exports.devServer = function(options){
    return {
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            stats: 'errors-only',
            host: options.host,
            port: options.port
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin({
                multiStep: true
            })
        ]
    };
}

exports.setupCSS = function(paths) {
    return {
        plugins: [
            new ExtractTextPlugin('[name].css', {
                allChunks: true
            })
        ],
        module: {
            loaders: [
                {
                    test:  /\.less$/,
                    exclude: /node_modules/,
                    loader: ExtractTextPlugin.extract("css?sourceMap!less?sourceMap"),
                    include: paths
                },

            ]
        }
    };
}

exports.setupES6 = function(paths) {
    return {
        module: {
            loaders: [
                {
                    test: /\.(js|jsx)$/,
                    include: paths,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        cacheDirectory: true,
                        presets: ['es2015', 'react','stage-0']
                    }
                }
            ]
        }
    }
}

exports.clean = function(path) {
    return {
        plugins: [
            new CleanWebpackPlugin([path], {
                // Without `root` CleanWebpackPlugin won't point to our
                // project and will fail to work.
                root: process.cwd()
            }) ]
    };
}
