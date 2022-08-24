const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const meteorExternals = require('webpack-meteor-externals');
const nodeExternals = require('webpack-node-externals');

const clientConfig = {
  entry: './startup/client/main.jsx',
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-object-rest-spread']
        },
        loader: 'babel-loader'
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './startup/client/main.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  resolve: {
    extensions: ['*', '.mjs', '.js', '.jsx', '.json', '.gql', '.graphql']
  },
  externals: [meteorExternals()],
  devServer: {
    hot: 'only'
  }
};

const serverConfig = {
  entry: ['./startup/server/index.js'],
  target: 'node',
  devServer: {
    stats: {
      chunks: false
    },
    hot: 'only'
  },
  externals: [meteorExternals(), nodeExternals({ modulesDir: path.resolve(__dirname, 'node_modules') })]
};

module.exports = [clientConfig, serverConfig];