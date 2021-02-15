var propertiesReader = require('properties-reader');
var prop = propertiesReader('./Properties/prop.properties');
var HTMLReport = require('protractor-html-reporter');

// An example configuration file.
exports.config = {
  directConnect: true,
  //seleniumAddress: 'http://localhost:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    browserName: 'chrome'
  },

  useAllAngular2AppRoots: true,
  // Framework to use. Jasmine is recommended.
  framework: 'jasmine2',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: [prop.get('specPath')],

  // suites: {
  //   smoke: ['./smoke/*.spec.js'],
  //   regression: ['./regression/*.spec.js'],
  //   functional: ['./functional/*.spec.js'],
  //   all: ['./*/*.spec.js'],
  //   selected: ['./functional/addcustomer.spec.js', './regression/openaccount.spec.js']

  // },

  // plugins: [{
  //   package: 'jasmine2-protractor-utils',
  //   disableHTMLReport: true,
  //   disableScreenshot: false,
  //   screenshotPath: './report/screenshots',
  //   screenshotOnExpectFailure: false,
  //   screenshotOnSpecFailure: true,
  //   clearFoldersBeforeTest: true
  // }],

  onPrepare: function () {
    browser.ignoreSynchronization = true
    browser.driver.manage().window().maximize()
    var jasmineReporters = require('jasmine-reporters');
    //     jasmine.getEnv().addReporter(new HtmlReporter({
    //       baseDirectory: 'tmp/screenshots'
    //    }).getJasmine2Reporter());
    //    var reporter = new HtmlReporter({
    //     baseDirectory: 'tmp/screenshots'
    //  });

    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: './xmlResults',
      filePrefix: 'xmlresult'
    }));


    // Below code can be used if the Pulgins are not using
    var fs = require('fs-extra');

    fs.emptyDir('./screenshots/', function (err) {
      console.log(err);
    });

    jasmine.getEnv().addReporter({
      specDone: function (result) {
        if (result.status == 'failed') {
          browser.getCapabilities().then(function (caps) {
            var browserName = caps.get('browserName');

            browser.takeScreenshot().then(function (png) {
              var stream = fs.createWriteStream('./screenshots/' + browserName + '-' + result.fullName + '.png');
              stream.write(new Buffer(png, 'base64'));
              stream.end();
            });
          });
        }
      }
    });
   },
  onComplete: function () {
    var browserName, browserVersion, testPlatform;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');
      testPlatform: caps.get('Testing');

      var HTMLReport = require('protractor-html-reporter');

      testConfig = {
        reportTitle: 'Automation Execution Report',
        outputPath: './',
        outputFilename: 'Protractor Test Execution Report',
        screenshotPath: './screenshots',
        testBrowser: browserName,
        browserVersion: browserVersion,
        testPlatform: testPlatform,
      };
      new HTMLReport().from('./xmlResults/xmlresult.xml', testConfig);

      
      console.log('Sending Mail with reports for the Test execution');
      var sys = require('util')
      var exec = require('child_process').exec;
      function puts(error, stdout, stderr) { sys.puts(stdout) }
      exec("node mail.js", puts);

    });
  }
}


