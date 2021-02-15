const logger = require('D:\\Protractor_programs\\TransportalJasmine\\log.js');
var propertiesReader = require('properties-reader');
var prop = propertiesReader('./Properties/prop.properties');
var or = propertiesReader('./Properties/or.properties');

describe("Verifing Title", function () {
  beforeEach(function () {

    browser.get(or.get('URL'));
    logger.log('info', 'Navigating to website');
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
  });

  it("validate title", function () {
    logger.log('info', 'validating the title');
    expect(browser.getTitle()).toBe(or.get('ExpectedTitle'));
  });

  it("validate Exact title", function () {
    logger.log('info', 'validating the exact title');
    expect(browser.getTitle()).toBe(or.get('ExactExpectedTitle'));
  });
});

