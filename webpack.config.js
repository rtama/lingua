const path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/src/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: [
    './src/index.jsx'
  ],
  module: {
    loaders: [
      {test: /\.jsx?$/, 
        include: __dirname + '/src', 
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    filename: "app_bundle.js",
    path: path.join(__dirname, '/dist'),
    publicPath: '/'
  },
  plugins: [HTMLWebpackPluginConfig], 
  node: {
    fs: "empty",
    net: "empty"
  },
  devtool: '#eval-source-map'
  // devServer: {
  //   historyApiFallback: true
  // }
}