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
    resolve: {
        alias: {
            jquery: path.join(__dirname,'js/lib/jquery.min.js')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $:'jquery'
        })
    ]
}