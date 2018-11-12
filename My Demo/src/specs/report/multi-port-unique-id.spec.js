'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: multi-port-unique-id', function() {

  //Global Variables
  var securityColumnDataArray = [];
  var securityColumnDataArrayAfterSort = [];

  describe('Test Step ID: 575787', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:;Pa3;Accounts;DUPLICATE_SECURITY_MULTI_PORT"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('duplicate-security-multi-port');
    });

    it('Should wait for "Contribution" report to calculate', function() {
      // Waiting for "Contribution" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Contribution'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          expect(false).customError('"Calculation Error" found while report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Contribution" report loaded without any error', function() {

      // Verifying if "Contribution" report calculated
      PA3MainPage.isReportCalculated('Contribution').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"Contribution" report is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Contribution" report: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Contribution" report is highlighted/Selected in LHP', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Weights', 'Contribution').then(function(reportRef) {
        reportRef.getAttribute('class').then(function(reportStatus) {
          if (reportStatus.indexOf('selected') < 0) {
            expect(false).customError('"Contribution" report is not in focus');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 575789', function() {

    it('Should get "Security" column data from "Contribution" report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', '').then(function(securityColumnData) {
        securityColumnData.forEach(function(security, index) {
          if (index > 0) {
            // Pushing securities from "Security" column into "securityColumnDataArray"
            securityColumnDataArray.push(security);
          }
        });
      });
    });

    it('Verifying if "Security" Column data is sorted in "Ascending" order. If "Security" column is not sorted in ' + '"Ascending" order then sort the "Security" column in "Ascending" order by double clicking on the column header', function() {
      var count = 0;
      securityColumnDataArrayAfterSort = securityColumnDataArray.sort();
      browser.call(function() {
        securityColumnDataArray.forEach(function(security, index) {
          if (security !== securityColumnDataArrayAfterSort[index]) {
            count = count + 1;
          }
        });
      }).then(function() {
        if (count > 0) {
          SlickGridFunctions.getHeaderCellReference('Contribution', '').then(function(securityColumnRef) {
            // Double clicking on the cell
            browser.actions().doubleClick(securityColumnRef).perform();
          });
        }
      });
    });

    it('Verifying if that no "Ticker" exists multiple times', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        for (var i = 1; i < tickerColumnData.length; i++) {
          var count = 0;
          var rowArray = [];
          for (var j = 1; j < tickerColumnData.length; j++) {
            if (tickerColumnData[i] === tickerColumnData[j]) {
              rowArray.push(j);
              count = count + 1;
              if (count > 1) {
                expect(false).customError('"' + tickerColumnData[i] + '" exists in "' + rowArray + '" rows');
                CommonFunctions.takeScreenShot();
              }
            }
          }
        }
      });
    });
  });

  describe('Test Step ID: 807674', function() {

    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSetAutomaticCalculation(false);

    it('Should click on "Portfolio" hamburger icon', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.getHamburgerIcon('Portfolio')).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Account Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(found) {
        if (!found) {
          expect(false).customError('"Portfolio" Hamburger icon is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on click on the remove all ("X") icon in the "Portfolio" hamburger widget', function() {
      var xpathRemoveAllIcon = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathRemoveAllIcon, 'Remove All');
      ThiefHelpers.getButtonClassReference(undefined, xpathRemoveAllIcon).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if all accounts from Portfolio Hamburger drop are removed', function() {
      PA3MainPage.getListFromAccountDropdown('Portfolio', true).then(function(arrayOfReferences) {
        if (arrayOfReferences.length !== 0) {
          expect(false).customError('"All the accounts are not removed from the Portfolio Hamburger drop down list');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in Portfolio hamburger drop down', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button in Portfolio hamburger drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('verifying if Portfolio Hamburger drop down is closed', function() {
      ThiefHelpers.isDropDownOpen(1, false).then(function(status) {
        if (status) {
          expect(false).customError('Portfolio Hamburger drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Benchmark" hamburger icon', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.getHamburgerIcon('Benchmark')).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Account Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(found) {
        if (!found) {
          expect(false).customError('"Benchmark" Hamburger icon is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on click on the remove all ("X") icon in the "Benchmark" hamburger widget', function() {
      var xpathRemoveAllIcon = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathRemoveAllIcon, 'Remove All');
      ThiefHelpers.getButtonClassReference(undefined, xpathRemoveAllIcon).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if all accounts from Benchmark Hamburger drop are removed', function() {
      PA3MainPage.getListFromAccountDropdown('Benchmark', true).then(function(arrayOfReferences) {
        if (arrayOfReferences.length !== 0) {
          expect(false).customError('"All the accounts are not removed from the Benchmark Hamburger drop down list');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in Benchmark hamburger drop down', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button in Benchmark hamburger drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('verifying if Benchmark Hamburger drop down is closed', function() {
      ThiefHelpers.isDropDownOpen(1, false).then(function(status) {
        if (status) {
          expect(false).customError('Benchmark Hamburger drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the folder icon and select open and navigate to Client:/default_doc_OLD', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

    it('Should click on button portfolio lookup icon', function() {
      element(by.xpath(PA3MainPage.xpathPortfolioLookupIcon)).click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying "Identifier Lookup" dialog is displayed', function() {
      ThiefHelpers.isDialogOpen('Identifier Lookup').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Identifier Lookup" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Client:/PA3" in the "Available" section', function() {
      FileDialog.expandTree('Client|Pa3');
    });

    it('Should double click on ACCOUNT_A in the Client directory', function() {
      FileDialog.getSlickRow('ACCOUNT_A').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      }, function(error) {
        expect(false).toBe(error);
      });
    });

    it('Should navigate to "Client:/New_pa_test_suite/grouping"', function() {
      FileDialog.expandTree('New_pa_test_suite|Grouping');
    });

    it('Should double click on ACCOUNT_LIMITS in the grouping directory', function() {
      FileDialog.getSlickRow('ACCOUNT_LIMITS').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      }, function(error) {
        expect(false).toBe(error);
      });
    });

    var arrPortfolio = ['ACCOUNT_A ( Charting Test Account )', 'ACCOUNT_LIMITS ( Account for Limits )'];
    var flag1 = 0;
    it('Verifying that ACCOUNT_A.ACCT and ACCOUNT_LIMITS.ACCT is present in the Selected Section', function() {
      IdentifierLookup.getAllRowNamesFromSelectedSection().getText().then(function(ref) {
        for (var i = 0; i < ref.length; i++) {
          if (ref[i] !== arrPortfolio[i]) {
            flag1 = flag1 + 1;
            expect(false).customError(arrPortfolio[i] + ' is not displayed in the selected section instead found ' + ref[i]);
            if (flag1 === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        }
      });
    });
  });

  describe('Test Step ID: 807675', function() {

    it('Should click on "OK" button on the Portfolio look up dialog', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button in Benchmark hamburger drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Portfolio" hamburger icon', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.getHamburgerIcon('Portfolio')).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Account Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(found) {
        if (!found) {
          expect(false).customError('"Portfolio" Hamburger icon is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrPortfolio = ['Account for Limits', 'Charting Test Account'];
    var flag1 = 0;
    arrPortfolio.forEach(function(portfolio) {
      it('Verifying that "' + portfolio + '" is present in the Portfolio dropdown', function() {
        PA3MainPage.getSingleAccountFromList('Portfolio', portfolio).isPresent().then(function(isExist) {
          if (!isExist) {
            flag1 = flag1 + 1;
            expect(false).customError(portfolio + ' is not present in the drop down');
            if (flag1 === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it('Verify that "ACCOUNT_LIMITS.ACCT" is highlighted in "Portfolio" accounts dropdown', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'Account for Limits').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Account for Limits" is not selected in Portfolio drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 807677', function() {

    it('Should click on "Cancel" button in Portfolio hamburger drop down', function() {
      ThiefHelpers.getButtonClassReference('Cancel').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Cancel" button in Portfolio hamburger drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on button portfolio lookup icon', function() {
      element(by.xpath(PA3MainPage.xpathPortfolioLookupIcon)).click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying "Identifier Lookup" dialog is displayed', function() {
      ThiefHelpers.isDialogOpen('Identifier Lookup').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Identifier Lookup" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Client:/PA3/Columns" in the "Available" section', function() {
      FileDialog.expandTree('Client|Pa3|Columns');
    });

    var arrPortfolioAvailable = ['DILTEST1', 'DILTEST2'];
    var flag1 = 0;
    arrPortfolioAvailable.forEach(function(portfolio) {
      it('Should double click on"' + portfolio + '" in the Client directory', function() {
        FileDialog.getSlickRow(portfolio).then(function(ref) {
          browser.actions().doubleClick(ref).perform();
        }, function(error) {
          expect(false).toBe(error);
        });
      });
    });

    var arrPortfolio = ['DILTEST1 ( DILTEST1 )', 'DILTEST2 ( DILTEST2 )'];
    var flag = 0;
    it('Verifying that DILTEST1 and DILTEST2 is present in the Selected Section', function() {
      IdentifierLookup.getAllRowNamesFromSelectedSection().getText().then(function(ref) {
        for (var i = 0; i < ref.length; i++) {
          if (ref[i] !== arrPortfolio[i]) {
            flag1 = flag + 1;
            expect(false).customError(arrPortfolio[i] + ' is not displayed in the selected section instead found ' + ref[i]);
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        }
      });
    });

  });

  describe('Test Step ID: 807678', function() {

    it('Should click on "OK" button in Identifier lookup dialog', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button in identifier lookup dialog');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Portfolio" hamburger icon', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.getHamburgerIcon('Portfolio')).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Account Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(found) {
        if (!found) {
          expect(false).customError('"Portfolio" Hamburger icon is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrPortfolio = ['DILTEST1', 'DILTEST2'];
    var flag1 = 0;
    arrPortfolio.forEach(function(portfolio) {
      it('Verifying that "' + portfolio + '" is present in the Portfolio dropdown', function() {
        PA3MainPage.getSingleAccountFromList('Portfolio', portfolio).isPresent().then(function(isExist) {
          if (!isExist) {
            flag1 = flag1 + 1;
            expect(false).customError(portfolio + ' is not present in the drop down');
            if (flag1 === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it('Verify that "DILTEST2" is highlighted in "Portfolio" accounts dropdown', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'DILTEST2').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"DILTEST2" is not selected in Portfolio drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 807679', function() {

    it('Should click on "OK" button in portfolio dropdown', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button in portfolio dropdown');
        CommonFunctions.takeScreenShot();
      });
    });

    it('verifying if Portfolio Hamburger drop down is closed', function() {
      ThiefHelpers.isDropDownOpen(1, false).then(function(status) {
        if (status) {
          expect(false).customError('Portfolio Hamburger drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Benchmark" hamburger icon', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.getHamburgerIcon('Benchmark')).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Account Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(found) {
        if (!found) {
          expect(false).customError('"Benchmark" Hamburger icon is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on click on the remove all ("X") icon in the "Benchmark" hamburger widget', function() {
      var xpathRemoveAllIcon = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathRemoveAllIcon, 'Remove All');
      ThiefHelpers.getButtonClassReference(undefined, xpathRemoveAllIcon).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if all accounts from Benchmark Hamburger drop are removed', function() {
      PA3MainPage.getListFromAccountDropdown('Benchmark', true).then(function(arrayOfReferences) {
        if (arrayOfReferences.length !== 0) {
          expect(false).customError('"All the accounts are not removed from the Benchmark Hamburger drop down list');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in Benchmark dropdown', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button in Benchmark dropdown');
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSetAutomaticCalculation(true);

    it('Should enter "M4124906" in "Benchmark" widget', function() {
      // Entering the value to Benchmark Widget
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathBenchmarkWidget).setText('M4124906');

      // Verifying that "M4124906" is entered
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathBenchmarkWidget).getText().then(function(val) {
        if (val !== 'M4124906') {
          expect(false).customError('Benchmark widget is not populated with "M4124906", Found: ' + val);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // FYI The below code is a work around for the known issue in RPD:45438350.

    it('Verifying if the Error Setting benchmark dialog appeared', function() {
      ThiefHelpers.isDialogOpen('Error Setting benchmark').then(function(val) {
        if (val) {
          ThiefHelpers.getButtonClassReference('OK').press().then(function() {
          }, function() {

            expect(false).customError('Unable to click on "OK" button in the Error dialog');
            CommonFunctions.takeScreenShot();
          });
        }
      }, function() {
        expect(false).customError('No Error dialog is found. The issue RPD:45438350 is resolved.');
        CommonFunctions.takeScreenShot();
      });
    });

    // FYI The below code performs negative testing since the steps in QAI cannot be performed due to known issue RPD:45438350.

    it('Verifying if no options are present in the Benchmark widget drop down', function() {
      PA3MainPage.getListFromAccountDropdown('Benchmark', true).then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(ref) {
          ref.getText().then(function(text) {
            if (text !== null) {
              expect(false).customError('The Benchmark is populatd with Russell US Large Cap Equity Fund. The issue RPD:45438350 is resolved.');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    // FYI The below code performs negative testing since the steps in QAI cannot be performed due to known issue RPD:45438350.

    it('Verifying if "Weights" report is not loaded', function() {
      PA3MainPage.getReportCalculationDlg('Weights').isPresent().then(function(calculated) {
        if (calculated) {
          expect(false).customError('"Weights" report is calculated. The issue RPD:45438350 is resolved.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "F00000WM5I" in "Benchmark" widget', function() {
      // Entering the value to Benchmark Widget
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathBenchmarkWidget).setText('F00000WM5I');

      // Verifying that "F00000WM5I" is entered
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathBenchmarkWidget).getText().then(function(val) {
        if (val !== 'F00000WM5I') {
          expect(false).customError('Benchmark widget is not populated with "F00000WM5I", Found: ' + val);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // FYI The below code is a work around for the known issue in RPD:45438350.

    it('Verifying if the Error Setting benchmark dialog appeared', function() {
      ThiefHelpers.isDialogOpen('Error Setting benchmark').then(function(val) {
        if (val) {
          ThiefHelpers.getButtonClassReference('OK').press().then(function() {
          }, function() {

            expect(false).customError('Unable to click on "OK" button in the Error dialog');
            CommonFunctions.takeScreenShot();
          });
        }
      }, function() {
        expect(false).customError('No Error dialog is found. The issue RPD:45438350 is resolved.');
        CommonFunctions.takeScreenShot();
      });
    });

    // FYI The below code performs negative testing since the steps in QAI cannot be performed due to known issue RPD:45438350.

    it('Verifying if no options are present in the Benchmark widget drop down', function() {
      PA3MainPage.getListFromAccountDropdown('Benchmark', true).then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(ref) {
          ref.getText().then(function(text) {
            if (text !== null) {
              expect(false).customError('The Benchmark is populatd with Russell US Small Cap Equity Fund. The issue RPD:45438350 is resolved.');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    // FYI The below code performs negative testing since the steps in QAI cannot be performed due to known issue RPD:45438350.

    it('Verifying if "Weights" report is not loaded', function() {
      PA3MainPage.getReportCalculationDlg('Weights').isPresent().then(function(calculated) {
        if (calculated) {
          expect(false).customError('"Weights" report is calculated. The issue RPD:45438350 is resolved.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Benchmark" hamburger icon', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.getHamburgerIcon('Benchmark')).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Account Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(found) {
        if (!found) {
          expect(false).customError('"Benchmark" Hamburger icon is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // FYI The below code performs negative testing since the steps in QAI cannot be performed due to known issue RPD:45438350.

    var arrbenchmark = ['Russell US Large Cap Equity Fund', 'Russell US Small Cap Equity Fund'];
    var flag1 = 0;
    arrbenchmark.forEach(function(item) {
      it('Verifying that "' + item + '" is not present in the Portfolio dropdown', function() {
        PA3MainPage.getSingleAccountFromList('Benchmark', item).isPresent().then(function(isExist) {
          if (isExist) {
            flag1 = flag1 + 1;
            expect(false).customError(item + ' is present in the drop down. The issue RPD:45438350 is resolved.');
            if (flag1 === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    // FYI The below code performs negative testing since the steps in QAI cannot be performed due to known issue RPD:45438350.

    it('Verify that "Russell US Small Cap Equity Fund" is not highlighted in "Benchmark" accounts dropdown', function() {
      PA3MainPage.getListFromAccountDropdown('Benchmark', true).then(function(arrayOfReferences) {
        if (arrayOfReferences.length !== 0) {
          expect(false).customError('The Benchmark drop down is not empty. The issue RPD:45438350 is resolved.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
