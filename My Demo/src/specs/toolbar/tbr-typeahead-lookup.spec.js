'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: tbr-typeahead-lookup', function() {
  var value1;
  var value2;
  describe('Test Step ID: 580774', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:/Pa3;Accounts/TBR_TYPEAHEAD_LOOKUP"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('tbr-typeahead-lookup');
    });

    it('Wait for report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if calculated data for "Contribution to Return" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Contribution to Return').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Contribution to Return" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution to Return')).toBeTruthy();
        } else {
          expect(true).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that Contribution Detail report highlighted in LHP', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Performance', 'Contribution Detail').then(function(ele) {
        ele.getAttribute('class').then(function(val) {
          if (val.indexOf('selected') === -1) {
            expect(false).customError('"Contribution Detail" report from LHP is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying a value is displayed under "Port. Ending Market Value" column for ticker "29379VAT0"', function() {
      SlickGridFunctions.getCellReference('Contribution to Return', '29379VAT0', 'Ticker', 'Port. Ending Market Value').then(function(option) {
        option.getText().then(function(value) {
          if (value === '') {
            expect(false).customError('values is not dispayed under "Port. Ending Market Value" column for ticker "29379VAT0"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 580776', function() {

    it('Saving "Port. Ending Market Value" column value for ticker "29379VAT0', function() {
      // Saving "Port. Ending Market Value" column value for ticker "29379VAT0 in variable value1 for future reference
      SlickGridFunctions.getCellReference('Contribution to Return', '29379VAT0', 'Ticker', 'Port. Ending Market Value').then(function(portvalue) {
        portvalue.getText().then(function(value) {
          value1 = value;
          if (value1 === 'NA') {
            expect(false).customError('values is not dispayed under "Port. Ending Market Value" column for ticker "29379VAT0"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on  hamburger icon beside portfolio lookup ', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.xpathHamburgerButton).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Account Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down has not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click "x" icon for the portfolio with TBR displayed in dropdown', function() {
      PA3MainPage.getAccountDeleteButton('Portfolio', 'TBR_TEST_PORTFOLIO').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "TBR_TEST_PORTFOLIO" is not present in hamburger drop down', function() {
      PA3MainPage.getAccountDeleteButton('Portfolio', 'TBR_TEST_PORTFOLIO').isPresent().then(function(value) {
        if (value) {
          expect(false).customError('TBR_TEST_PORTFOLIO" is present in hamburger drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from the "Humburger" dropdown', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait for "Contribution to Return" report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Contribution to Return'), 180000).then(function(value) {
        if (!value) {
          expect(false).customError('Error while calculating the "Contribution to Return" report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Contribution to Return" report is calculated', function() {
      PA3MainPage.isReportCalculated('Contribution to Return').then(function(value) {
        if (!value) {
          expect(false).customError('Calculated data for "Contribution to Return" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution to Return')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Entering value "Client:/pa3/accounts/TBR_TEST_PORTFOLIO.ACCT" in the "Portfolio" widget', function() {
      PA3MainPage.setPortfolio('TBR_TEST_PORTFOLIO', 'TBR_TEST_PORTFOLIO.ACCT | Client:/pa3/accounts/', 'Client:/pa3/accounts/TBR_TEST_PORTFOLIO.ACCT').then(function(value) {
        if (!value) {
          expect(false).customError('"Client:/pa3/accounts/TBR_TEST_PORTFOLIO.ACCT" is not displayed in Portfolio Widget.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying value in the "Portfolio" widget is "Client:/pa3/accounts/TBR_TEST_PORTFOLIO.ACCT"', function() {
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).getText().then(function(value) {
        if (value !== 'Client:/pa3/accounts/TBR_TEST_PORTFOLIO.ACCT') {
          expect(false).customError('"Client:/pa3/accounts/TBR_TEST_PORTFOLIO.ACCT" is not displayed in Portfolio Widget.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on  hamburger icon beside portfolio lookup', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.xpathHamburgerButton).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Account Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should Select on "TBR " option from "B&H" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('TBR', undefined, PA3MainPage.xpathBAndHDropDown);
    });

    it('Verifying "TBR" option is selected from "B&H" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('TBR', undefined, PA3MainPage.xpathBAndHDropDown);
    });

    it('Should click on "OK" button on "Humburger" dropdown', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      browser.ignoreSynchronization = true;
    });

    it('Verifying if loading icon appeared', function() {
      ThiefHelpers.waitUntilSpinnerAppears(PA3MainPage.getProgressIndicatorClassReference('Contribution to Return'), 180000);
      PA3MainPage.getProgressIndicatorClassReference('Contribution to Return').getProgress().then(function(value) {
        if (!value) {
          expect(false).customError('Loading icon did not appeared');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait for "Contribution to Return" report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Contribution to Return'), 180000).then(function(value) {
        if (!value) {
          expect(false).customError('Error while calculating the "Contribution to Return" report.');
          CommonFunctions.takeScreenShot();
        }
      });

      browser.ignoreSynchronization = false;
    });

    it('Verifying that "Contribution to Return" report is calculated', function() {
      PA3MainPage.isReportCalculated('Contribution to Return').then(function(value) {
        if (!value) {
          expect(false).customError('Calculated data for "Contribution to Return" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution to Return')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

      // Handling Stale Element Reference error for the next step to get cell value
      var eleRef = SlickGridFunctions.getCellReference('Contribution to Return', '29379VAT0', 'Ticker', 'Port. Ending Market Value');
      eleRef.then(function() {
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          CommonFunctions.waitUntilElementAppears(eleRef, 4000, 'Cell value for "Port. Ending Market Value" ' + 'column for ticker "29379VAT0 is not appeared even after waiting for 2 seconds.').then(function() {
          }, function(error) {

            if (error.name === 'StaleElementReferenceError') {
              expect(false).customError('StaleElementReferenceError appeared even after waiting for 4 ' + 'seconds to make element appear on web page');
            }
          });
        }
      });
    });
  });

  describe('Test Step ID: 580784', function() {

    it('Saving "Port. Ending Market Value" column value for ticker "29379VAT0', function() {
      // Saving "Port. Ending Market Value" column value for ticker "29379VAT0 in variable value2
      SlickGridFunctions.getCellReference('Contribution to Return', '29379VAT0', 'Ticker', 'Port. Ending Market ' + 'Value').then(function(portvalue) {
        portvalue.getText().then(function(value) {
          value2 = value;
          if (value2 === 'NA') {
            expect(false).customError('values is not displayed under "Port. Ending Market Value" column for' + ' ticker "29379VAT0"');
            CommonFunctions.takeScreenShot();
          }
        });
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          SlickGridFunctions.getCellReference('Contribution to Return', '29379VAT0', 'Ticker', 'Port. Ending ' + 'Market Value').then(function(portvalue) {
            portvalue.getText().then(function(value) {
              value2 = value;
              if (value2 === 'NA') {
                expect(false).customError('values is not displayed under "Port. Ending Market Value" ' + 'column for ticker "29379VAT0"');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        }
      });
    });

    it('Should verify that "Port. Ending Market Value" displayed for ticker "29379VAT0" should be exactly the same as displayed in value1 and value2', function() {
      if (value1 !== value2) {
        expect(false).customError('"Port. Ending Market Value" displayed for ticker "29379VAT0" is not exactly the same as displayed in value1 and value2');
        CommonFunctions.takeScreenShot();
      }
    });
  });
});
