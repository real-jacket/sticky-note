var webpack = require('webpack')
var path = require('path')

module.exports = {
    mode: "development",
    entry: path.join(__dirname, 'js/app/index.js'),
    output: {
        path: path.join(__dirname, '../public/js'),
        filename: "index.js"
    }
}