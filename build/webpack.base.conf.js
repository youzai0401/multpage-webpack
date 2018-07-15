'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
var glob = require('glob');
const vueLoaderConfig = require('./vue-loader.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const prod = process.env.NODE_ENV === 'production' || false;
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})
var entries = getEntry('./src/pages/**/*.js'); // 获得入口 js 文件
var chunks = Object.keys(entries);

module.exports = {
  context: path.resolve(__dirname, '../'),
  // entry: {
  //   app: './src/index.js'
  // },
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

var pages = getEntry('./src/pages/**/*.html');
for (var pathname in pages) {
  // 配置生成的 html 文件，定义路径等
  var conf = {
    filename: prod ? './' + pathname + '.html' : pathname + '.html', // html 文件输出路径
    template: pages[pathname], // 模板路径
    inject: true,              // js 插入位置
    // minify: {
    //   removeComments: prod ? true : false,
    //   collapseWhitespace: prod ? true : false,
    //   removeAttributeQuotes: prod ? true : false
    // },
    chunksSortMode: 'dependency'
  };
  if (pathname in module.exports.entry) {
    console.log(123, pathname)
    conf.chunks = ['vendors', 'manifest', 'app', pathname];
    conf.hash = false;
  }
  console.log(conf);
  // 需要生成几个 html 文件，就配置几个 HtmlWebpackPlugin 对象
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}


// 根据项目具体需求，输出正确的 js 和 html 路径
function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-3);
    pathname = basename; // 正确输出 js 和 html 的路径
    entries[pathname] = entry;
  });
  console.log(entries);
  return entries;
}
