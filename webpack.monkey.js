const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

function addPlugin(webpackConfig, plugin) {
  webpackConfig.plugins.push(plugin);
}

function findRule(webpackConfig, callback) {
  console.log(webpackConfig.module.rules[2]);
  const rules = webpackConfig.module.rules[2].oneOf;
  const index = rules.findIndex(callback);
  if (index === -1) throw Error('Loader not found');
  return rules[index]
}

const LoadablePlugin = require('@loadable/webpack-plugin');
const webpackConfig = require('react-scripts/config/webpack.config');

module.exports = function(webpackConfig, isDevelopment) {
  // const babelRule = findBabelRule(webpackConfig);
  const babelRule = webpackConfig.module.rules[2].oneOf[1]
  babelRule.options.babelrc = true;
  setNameWithoutHash(webpackConfig);
  addPlugin(webpackConfig, new LoadablePlugin());
};

function setNameWithoutHash(webpackConfig) {
  const output = webpackConfig.output;
  const mode = webpackConfig.mode;

  setJsFolder(output, mode);
  setCssFolder(webpackConfig, mode);
  setMediaFolder(webpackConfig);
}

function setJsFolder(output, mode) {
  output.filename = mode === 'production'
  ? 'static/js/[name].js?v=[hash:8]'
  : mode === 'development' && 'static/js/bundle.js?v=[hash:8]';
  output.chunkFilename = mode === 'production'
  ? 'static/js/[name].chunk.js?v=[hash:8]'
  : mode === 'development' && 'static/js/[name].chunk.js?v=[hash:8]';
}

function setCssFolder(webpackConfig, mode) {
  if (mode === 'production') {
    webpackConfig.optimization.minimizer.push(new CssMinimizerPlugin())
  }

  webpackConfig.plugins.forEach((plugin, index) => {
    if (plugin.constructor.name === 'MiniCssExtractPlugin') {
      webpackConfig.plugins.splice(index, 1);
    }
  });

  addPlugin(webpackConfig, new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: 'static/css/[name].css',
    chunkFilename: 'static/css/[name].chunk.css?v=[hash:8]',
  }));
}

function setMediaFolder(webpackConfig) {
  const oneOf = webpackConfig.module.rules[2].oneOf;
  oneOf[oneOf.length - 1].options.name = 'static/media/[name].[ext]?v=[hash:8]';
}
