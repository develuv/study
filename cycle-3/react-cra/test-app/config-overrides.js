const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const { TARGET, BUNDLE_VISUALIZE } = process.env;
const target = TARGET || 'beta';
const isAddBundleVisualizer = Object.is(BUNDLE_VISUALIZE, 'true');
const publicPath = require(`./config/${target}`).orderClientUrl;
const { RetryChunkLoadPlugin } = require('webpack-retry-chunk-load-plugin');

module.exports = {
  jest: function (config) {
    config.moduleNameMapper['^@config(.*)$'] = `<rootDir>/src/config/${target}$1`;
    config.moduleNameMapper['^@core(.*)$'] = '<rootDir>/core/src$1';

    return config;
  },

  webpack: function (config, env) {
    const isProduct = env === 'production';

    config.resolve.modules = [...(config.resolve.modules || []), path.resolve(__dirname, 'src')];

    config.resolve.alias = {
      '@config': path.resolve(__dirname, `src/config/${target}`),
      '@core': path.resolve(__dirname, `src/core/src`),
      '@coreConfig': path.resolve(__dirname, `src/core/src/config/${target}`),
    };

    if (isProduct) {
      config.output.publicPath = publicPath;
      config.optimization.runtimeChunk = true;
      config.optimization.splitChunks.name = true;

      // ManifestPlugin override
      config.plugins[6].opts.publicPath = publicPath;

      config.plugins.push(
        new RetryChunkLoadPlugin({
          // optional value to set the amount of time in milliseconds before trying to load the chunk again. Default is 0
          retryDelay: 200,
          // optional value to set the maximum number of retries to load the chunk. Default is 1
          maxRetries: 5,
        })
      );

      isAddBundleVisualizer && config.plugins.push(new BundleAnalyzerPlugin());
    }

    return config;
  },
};
