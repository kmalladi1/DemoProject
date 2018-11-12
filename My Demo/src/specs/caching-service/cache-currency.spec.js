'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: cache-currency', function() {

  // Local function
  var verifyIfCachedDataIsDisplayedWithTodaysDate = function() {

    var arrTileNames = ['Total Returns', 'Performance'];

    arrTileNames.forEach(function(tileName) {

      it('Verifying if text saying "Cached data from" appeared next to "Footnotes" and the timestamp read as today\'s date for' + ' "' + tileName + '" report', function() {
        PA3MainPage.getCachedData(tileName).getText().then(function(text) {
          expect(text.indexOf('Cached data from') > -1).customError('The message saying ' + '"Cached data from..." is not displayed next to Footnotes of "' + tileName + '" report.');
          if (text.indexOf('Cached data from') < 0) {
            CommonFunctions.takeScreenShot();
          } else {
            var date = text.substring(text.indexOf('from') + 5, text.lastIndexOf('at') - 1);

            var currentDate;

            Utilities.getCurrentDate().then(function(val) {
              currentDate = val;
            }).then(function() {
              if (date !== currentDate) {
                expect(false).customError('The timestamp in the Cached message is not displaying today\'s date. ' + 'Expected: "' + currentDate + '" Found: "' + date + '"');
                CommonFunctions.takeScreenShot();
              }
            });
          }
        }, function() {
          expect(false).customError('The message saying ' + '"Cached data from..." is not displayed next to Footnotes of "' + tileName + '" report.');
          CommonFunctions.takeScreenShot();
        });
      });
    });
  };

  // Launch application and verify if Performance Overview is selected in LHP with Large Cap Core Test vs Russell 1000
  var launchApplicationAndVerifyRequired = function() {

    it('Should launch PA3 application with "Client:;Pa3;automation;cache_currency', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('cache-currency');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Total Returns');

    // Wait for the loading icon to disappear and verify if chart is displayed
    CommonPageObjectsForPA3.verifyIfChartIsDisplayed('Performance');

    it('Verifying if "Performance Overview" is highlighted in LHP', function() {
      PA3MainPage.getReports('Performance Overview').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Performance Overview" did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if header text is "Large Cap Core Test vs Russell 1000"', function() {
      PA3MainPage.getHeader().getText().then(function(value) {
        if (value !== 'Large Cap Core Test vs Russell 1000') {
          expect(false).customError('Header text did not "Large Cap Core Test vs Russell 1000"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  };

  describe('Test Step ID: 643231', function() {

    it('Should clear the cache before opening "CACHE_LATEST" document', function() {
      browser.executeAsyncScript(function(callback) {
        callback(angular.element($('#pa3App')).injector().get('paReportCalcCache').deleteServerCache());
      }).then(function(value) {
        expect(value.$$state.status).toEqual(0);
      });
    });

    // Launch application and verify if Performance Overview is selected in LHP with Large Cap Core Test vs Russell 1000
    launchApplicationAndVerifyRequired();
  });

  // Ignoring test step 643232 as per suggestion by QA.

  describe('Test Step ID: 643234', function() {

    it('Should click on the "Hamburger" icon next to "Portfolio" widget', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is no open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "MULTISTRAT_DEMO_ACCT" from the list of accounts', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'MULTISTRAT_DEMO_ACCT').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "MULTISTRAT_DEMO_ACCT" account is selected
      PA3MainPage.getSingleAccountFromList('Portfolio', 'MULTISTRAT_DEMO_ACCT').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"MULTISTRAT_DEMO_ACCT" did not select in Portfolio drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('Class').then(function(text) {
        if (text.indexOf('active') > 0) {
          expect(false).customError('"Portfolio" account drop down did not close');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Total Returns');

    // Wait for the loading icon to disappear and verify if chart is displayed
    CommonPageObjectsForPA3.verifyIfChartIsDisplayed('Performance');

    it('Verifying if header text is "MULTISTRAT_DEMO_ACCT vs MSCI USA"', function() {
      PA3MainPage.getHeader().getText().then(function(value) {
        if (value !== 'MULTISTRAT_DEMO_ACCT vs MSCI USA') {
          expect(false).customError('Header text did not "MULTISTRAT_DEMO_ACCT vs MSCI USA"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 643235', function() {

    // Launch application and verify if Performance Overview is selected in LHP with Large Cap Core Test vs Russell 1000
    launchApplicationAndVerifyRequired();

    // Verify if cached data is displayed next to footnotes with today'/s date
    verifyIfCachedDataIsDisplayedWithTodaysDate();
  });

  describe('Test Step ID: 643237', function() {

    it('Should click on the "Hamburger" icon next to "Portfolio" widget', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is no open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "MULTISTRAT_DEMO_ACCT" from the list of accounts', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'MULTISTRAT_DEMO_ACCT').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "MULTISTRAT_DEMO_ACCT" account is selected
      PA3MainPage.getSingleAccountFromList('Portfolio', 'MULTISTRAT_DEMO_ACCT').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"MULTISTRAT_DEMO_ACCT" did not select in Portfolio drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('Class').then(function(text) {
        if (text.indexOf('active') > 0) {
          expect(false).customError('"Portfolio" account drop down did not close');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Total Returns');

    // Wait for the loading icon to disappear and verify if chart is displayed
    CommonPageObjectsForPA3.verifyIfChartIsDisplayed('Performance');

    it('Verifying if header text is "MULTISTRAT_DEMO_ACCT vs MSCI USA"', function() {
      PA3MainPage.getHeader().getText().then(function(value) {
        if (value !== 'MULTISTRAT_DEMO_ACCT vs MSCI USA') {
          expect(false).customError('Header text did not "MULTISTRAT_DEMO_ACCT vs MSCI USA"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Verify if cached data is displayed next to footnotes with today'/s date
    verifyIfCachedDataIsDisplayedWithTodaysDate();
  });

  // Ignoring test step 643238 as per suggestion by OA
});
