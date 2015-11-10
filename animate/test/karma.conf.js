module.exports = function(config) {
    config.set({
        basePath: '',
        autoWatch: true,
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        files: [
            '../assets/js/src/**/*.js',
            '../test/**/spec-*.js'
        ],
        plugins: [
            'karma-spec-reporter',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-coverage',
            'karma-htmlfile-reporter'
        ],
        reporters: ['spec', 'coverage', 'html'],
        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        },
        htmlReporter: {
            outputFile: 'results/unit-tests.html'
        }
    });
};
