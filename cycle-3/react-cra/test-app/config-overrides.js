const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const { BUNDLE_VISUALIZE } = process.env;
const isAddBundleVisualizer = Object.is(BUNDLE_VISUALIZE, 'true');
const publicPath = 'https://www.cdn.com/';
const { RetryChunkLoadPlugin } = require('webpack-retry-chunk-load-plugin');

console.log(BUNDLE_VISUALIZE);

module.exports = {
  jest: function (config) {
    // alias 대응을 위한 패스 설정
    config.moduleNameMapper['^@(.*)$'] = '<rootDir>/core/src$1';

    return config;
  },

  webpack: function (config, env) {
    const isProduct = env === 'production';

    // 절대 경로 사용을 위한 패스 설정
    config.resolve.modules = [...(config.resolve.modules || []), path.resolve(__dirname, 'src')];

    // alias 사용을 위한 패스 설정
    config.resolve.alias = {
      '@': path.resolve(__dirname, `src`),
    };

    // build 같은 로컬 개발 용도가 아닌 실무 용도로 사용
    if (isProduct) {
      config.output.publicPath = publicPath;
      config.optimization.runtimeChunk = true;
      config.optimization.splitChunks.name = true;

      // ManifestPlugin override
      config.plugins[6].opts.publicPath = publicPath;

      // dynamic module import 사용 시, 'chunkloaderror loading chunk failed' 오류 방지 목적
      config.plugins.push(
        new RetryChunkLoadPlugin({
          // optional value to set the amount of time in milliseconds before trying to load the chunk again. Default is 0
          retryDelay: 200,
          // optional value to set the maximum number of retries to load the chunk. Default is 1
          maxRetries: 5,
        })
      );

      // bundle 결과를 비쥬얼하게 확인하는 용도
      isAddBundleVisualizer && config.plugins.push(new BundleAnalyzerPlugin());
    }

    return config;
  },
};
