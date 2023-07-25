const { resolve } = require('path')
const webpackNodeExternals = require('webpack-node-externals')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
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
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      
    }
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
  externalsPresets: { node: true },
  externals: [webpackNodeExternals()],
  optimization: {
    minimizer: [
      new TerserPlugin(),
    ]
  },
  target: 'node',
})

module.exports = [client, ssr]