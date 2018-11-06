var webpack = require('webpack')
var path = require('path')
var $ = require('jquery')

module.exports = {
    mode: "development",
    entry: path.join(__dirname, 'js/app/index.js'),
    output: {
        path: path.join(__dirname, '../public/js'),
        filename: "index.js"
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        }]
    }
    ,
    resolve: {
        alias: {
            jquery: path.join(__dirname, 'js/lib/jquery.min.js'),
            less: path.join(__dirname, 'less'),
            module:path.join(__dirname,'js/module')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $:'jquery'
        })
    ]
}