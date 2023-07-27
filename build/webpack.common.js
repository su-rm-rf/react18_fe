const { resolve, join } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  context: resolve(__dirname, '../src'),
  mode: isDev ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['thread-loader', {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: 'entry',
                corejs: 3
              }], 
              '@babel/preset-react', '@babel/preset-typescript'
            ],
            plugins: [
              '@babel/plugin-transform-runtime'
            ]
            // cacheDirectory: resolve(__dirname, '../dist'),
          }
        }]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['postcss-preset-env']
                ]
              }
            }
          },
          'sass-loader',
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 30 * 1024
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.scss', '.less'],
    alias: {
      '@': join(__dirname, '../src/client'),
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      // chunkFilename: '[name].[chunkhash:8].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: resolve(__dirname, '../public'), to: resolve(__dirname, '../dist')}
      ]
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
    })
  ],
}