const { resolve } = require('path')
const webpackNodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

const client = merge(common, {
  entry: `./client/main.tsx`,
  output: {
    path: resolve(__dirname, `../dist`),
    filename: 'client.bundle.js',
    // chunkFilename: '[name].[chunkhash:8].css',
    publicPath: `/`,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.isClient': true,
      'process.env.isSSR': false,
    })
  ],
  devtool: 'eval-cheap-module-source-map',
  // cache: {
  //   type: 'filesystem',
  //   cacheDirectory: resolve(__dirname, '../dist/.temp_cache'),
  // },
  optimization: {
    minimize: true,
  },
  target: 'web',
})

const ssr = merge(common, {
  entry: `./ssr/main.tsx`,
  output: {
    path: resolve(__dirname, `../dist`),
    filename: 'ssr.bundle.js',
    publicPath: `/`,
    globalObject: 'this',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.isClient': false,
      'process.env.isSSR': true,
    })
  ],
  optimization: {
    minimize: true,
  },
  externalsPresets: { node: true },
  externals: [webpackNodeExternals()],
  target: 'node',
})

module.exports = [client, ssr]