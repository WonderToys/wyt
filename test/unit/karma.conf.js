var webpackConfig = require('../../build/webpack.test.conf')

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
    reporters: ['spec', 'coverage'],
    files: [
      '../../node_modules/es6-promise/dist/es6-promise.auto.js',
      './index.js'
    ],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  })
}
