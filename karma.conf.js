// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['mocha', 'chai', 'sinon-chai', 'chai-as-promised', 'chai-things'],

    client: {
      mocha: {
        timeout: 5000 // set default mocha spec timeout
      }
    },

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'client/bower_components/jquery/dist/jquery.js',
      'client/bower_components/angular/angular.js',
      'client/bower_components/bootstrap/dist/js/bootstrap.js',
      'client/bower_components/angular-resource/angular-resource.js',
      'client/bower_components/angular-cookies/angular-cookies.js',
      'client/bower_components/angular-sanitize/angular-sanitize.js',
      'client/bower_components/lodash/dist/lodash.compat.js',
      'client/bower_components/angular-socket-io/socket.js',
      'client/bower_components/angular-ui-router/release/angular-ui-router.js',
      'client/bower_components/angular-validation-match/dist/angular-validation-match.min.js',
      'client/bower_components/ng-table/dist/ng-table.min.js',
      'client/bower_components/api-check/dist/api-check.js',
      'client/bower_components/angular-formly/dist/formly.js',
      'client/bower_components/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.js',
      'client/bower_components/angular-mocks/angular-mocks.js',
      'client/bower_components/angular-validator/dist/angular-validator.js',
      'client/bower_components/angular-validator/dist/angular-validator-rules.js',
      'client/bower_components/toastr/toastr.js',
      'client/bower_components/hammerjs/hammer.js',
      'client/bower_components/jquery-hammerjs/jquery.hammer.js',
      'client/bower_components/angular-local-storage/dist/angular-local-storage.js',
      'client/bower_components/nouislider/distribute/nouislider.js',
      'client/bower_components/select2/dist/js/select2.js',
      'client/bower_components/rangy/rangy-core.js',
      'client/bower_components/rangy/rangy-classapplier.js',
      'client/bower_components/rangy/rangy-highlighter.js',
      'client/bower_components/rangy/rangy-selectionsaverestore.js',
      'client/bower_components/rangy/rangy-serializer.js',
      'client/bower_components/rangy/rangy-textrange.js',
      'client/bower_components/textAngular/dist/textAngular.js',
      'client/bower_components/textAngular/dist/textAngular-sanitize.js',
      'client/bower_components/textAngular/dist/textAngularSetup.js',
      'client/bower_components/ui-select/dist/select.js',
      'client/bower_components/bootstrap3-typeahead/bootstrap3-typeahead.js',
      'client/bower_components/summernote/dist/summernote.js',
      'client/bower_components/moment/moment.js',
      'client/bower_components/moment-timezone/builds/moment-timezone-with-data-2010-2020.js',
      'client/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
      'client/bower_components/bootstrap-validator/dist/validator.min.js',
      'client/bower_components/angular-auto-validate/dist/jcs-auto-validate.js',
      'client/bower_components/angular-animate/angular-animate.js',
      'client/bower_components/angular-loading-bar/build/loading-bar.js',
      'client/bower_components/ngSmoothScroll/angular-smooth-scroll.js',
      'client/bower_components/angular-strap/dist/angular-strap.js',
      'client/bower_components/angular-strap/dist/angular-strap.tpl.js',
      'client/bower_components/velocity/velocity.js',
      'client/bower_components/velocity/velocity.ui.js',
      'client/bower_components/angular-summernote/dist/angular-summernote.js',
      'client/bower_components/angular-elastic/elastic.js',
      'client/bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
      'client/bower_components/d3/d3.js',
      'client/bower_components/c3/c3.js',
      'client/bower_components/c3-angular/c3-angular.min.js',
      'client/bower_components/angular-translate/angular-translate.js',
      'client/bower_components/angular-relative-date/angular-relative-date.js',
      'client/bower_components/momentjs/moment.js',
      'client/bower_components/moment-range/dist/moment-range.js',
      'client/bower_components/bootstrap-daterangepicker/daterangepicker.js',
      'client/bower_components/ng-bs-daterangepicker/src/ng-bs-daterangepicker.js',
      // endbower
      'node_modules/socket.io-client/socket.io.js',
      'client/app/app.js',
      'client/app/**/*.js',
      'client/components/**/*.js',
      'client/app/**/*.jade',
      'client/components/**/*.jade',
      'client/app/**/*.html',
      'client/components/**/*.html'
    ],

    preprocessors: {
      '**/*.jade': 'ng-jade2js',
      '**/*.html': 'html2js',
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'client/'
    },

    ngJade2JsPreprocessor: {
      stripPrefix: 'client/'
    },

    

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // reporter types:
    // - dots
    // - progress (default)
    // - spec (karma-spec-reporter)
    // - junit
    // - growl
    // - coverage
    reporters: ['spec'],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
