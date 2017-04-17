var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + 'index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  devtool: 'source-map', 
  entry: [
    './app.js'
  ],
  module: {
    loaders: [
      {test: /.jsx?$/, 
        include: __dirname + '/app', 
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: "app_bundle.js",
    path: __dirname + '/dist'
  },
  plugins: [HTMLWebpackPluginConfig,
      new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })], 
  node: {
    fs: "empty",
    net: "empty"
  }
}