const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js',
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
      query: {
        presets: ['es2015'],
      },
    }, {
      test: /style\.scss$/,
      exclude: /node_modules/,
      loader: 'style!css!sass!',
    }],
  },
  resolve: {
    extensions: ['', '.js'],
  },
  output: {
    path: __dirname + '/dist', // eslint-disable-line prefer-template
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
