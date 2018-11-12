'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: multi-port-bench-trnpse', function() {

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  describe('Test Step ID: 574327', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:default_doc_OLD"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Weights', undefined, 'isSelected');

  });

  describe('Test Step ID: 574328', function() {

    it('Should type "Client:/pa3/test" into "Portfolio" widget and select "TEST.ACCT | Client:/pa3/" from type ahead', function() {
      PA3MainPage.setPortfolio('Client:/pa3/test', 'TEST.ACCT | Client:/pa3/', 'Client:/pa3/TEST.ACCT')
        .then(function(option) {
          if (!option) {
            expect(false).customError('Not able to Type "Client:/pa3" into "Portfolio"' +
              ' widget and select "TEST.ACCT | Client:/pa3/" from type ahead');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Should remove "Client:/pa3/TEST.ACCT" and type "PA3" into "Portfolio" widget and select "PA3_TEST2.ACCT | Client:/pa3/" ' +
      'from type ahead', function() {
        PA3MainPage.setPortfolio('PA3', 'PA3_TEST2.ACCT | Client:/pa3/', 'Client:/pa3/PA3_TEST2.ACCT')
          .then(function(option) {
            if (!option) {
              expect(false).customError('Not able to Type "PA3" into "Portfolio"' +
                ' widget and select "PA3_TEST2.ACCT | Client:/pa3/" from type ahead');
              CommonFunctions.takeScreenShot();
            }
          }, function(error) {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
      });

    it('Should click on the "Hamburger" icon next to "Portfolio" widget', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Drop down is not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Use Multiple Portfolios" checkbox to check off', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Multiple Portfolios').check();

      // Verifying if "Use Multiple Portfolios" is checked
      ThiefHelpers.getCheckBoxClassReference('Use Multiple Portfolios').isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Use Multiple Portfolios" checkbox did not check off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
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
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Verifying that the header title is "Multiple Portfolios vs Default Benchmark"', function() {
      PA3MainPage.getHeader().getText().then(function(value) {
        if (value !== 'Multiple Portfolios vs Default Benchmark') {
          expect(false).customError('Header title is not displayed as "Multiple Portfolios vs Default ' +
            'Benchmark"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 810582', function() {

    it('Should click on the "Hamburger" icon next to "Benchmark" widget', function() {
      PA3MainPage.getHamburgerIcon('Benchmark').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Drop down is not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Use Default Benchmark" checkbox to un-check it', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Default Benchmark').uncheck();

      // Verifying if "Use Default Benchmark" is un-checked
      ThiefHelpers.getCheckBoxClassReference('Use Default Benchmark').isChecked().then(function(flag) {
        if (flag) {
          expect(false).customError('"Use Default Benchmark" checkbox is checked off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      PA3MainPage.getHamburgerIcon('Benchmark').getAttribute('Class').then(function(text) {
        if (text.indexOf('active') > 0) {
          expect(false).customError('"Benchmark" account drop down did not close');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Verifying if Benchmark is set to RUSSELL:1000
    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Benchmark', PA3MainPage.xpathBenchmarkWidget, 'RUSSELL:1000');
  });

  describe('Test Step ID: 574329', function() {

    it('Should type "Russell 2000" into "Benchmark" widget and select "Russell 2000" from type ahead', function() {
      PA3MainPage.setBenchmark('Russell 2000', true, false, 'Russell 2000 R.2000', 'BENCH:R.2000').then(function(option) {
        if (!option) {
          expect(false).customError('Not able to Type "Russell 2000" into "Benchmark"' +
            ' widget and select "Russell 2000" from type ahead');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on the "Hamburger" icon next to "Benchmark" widget', function() {
      PA3MainPage.getHamburgerIcon('Benchmark').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Drop down is not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Use Multiple Benchmarks" checkbox to check off', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Multiple Benchmarks').check();

      // Verifying if "Use Multiple Benchmarks" is checked
      ThiefHelpers.getCheckBoxClassReference('Use Multiple Benchmarks').isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Use Multiple Benchmarks" checkbox did not check off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      PA3MainPage.getHamburgerIcon('Benchmark').getAttribute('Class').then(function(text) {
        if (text.indexOf('active') > 0) {
          expect(false).customError('"Benchmark" account drop down did not close');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Verifying that the header title is "Multiple Portfolios vs Multiple Benchmarks"', function() {
      PA3MainPage.getHeader().getText().then(function(value) {
        if (value !== 'Multiple Portfolios vs Multiple Benchmarks') {
          expect(false).customError('Header title is not displayed as "Multiple Portfolios vs Default ' +
            'Benchmark"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 574330', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Columns');

    var arrOptions = ['Port. Ending Quantity Held', 'Bench. Ending Quantity Held'];
    arrOptions.forEach(function(columnName) {

      it('Should click on "' + columnName + '" to select from Selected section', function() {
        var objVirtualListbox = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(columnName);

        objVirtualListbox.select(true, false);

        // Verify if 'Variation in Ending Weight' is selected
        ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(columnName).isSelected().then(function(seleted) {
          if (!seleted) {
            expect(false).customError('"' + columnName + '" is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should release "CONTROL" key', function() {
      browser.actions().keyUp(protractor.Key.CONTROL).perform();
    });

    it('Should click on "Show Column" checkbox to check off', function() {
      ThiefHelpers.getCheckBoxClassReference('Show Column').check();

      // Verifying if "Show Column" is checked
      ThiefHelpers.getCheckBoxClassReference('Show Column').isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Show Column" checkbox did not check off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Dates" from the LHP', function() {
      TileOptions.getLHPOption('Dates').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Dates" is selected in LHP
      TileOptions.getLHPOption('Dates').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Dates" did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should Select option "Daily" from "Report frequency" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Daily', 'Report Frequency:');
    });

    it('Verifying "Daily" option is selected from "Report frequency" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Daily', 'Report Frequency');
    });

    it('Should Select "12/7/2015" from start date calender widget', function() {
      ThiefHelpers.setDateInCalendar('12/7/2015', 1);

      //Verifying 12/7/2015 date is selected in start date calender widget
      ThiefHelpers.getDatepickerClassReference('Start Date:').getDate().then(function(value) {
        if (value !== '12/07/2015') {
          expect(false).customError('12/07/2015 date did not set in start date calender widget');
          CommonFunctions.takeScreenShot();
        }
      });

      // Adding delay to wait for request to process(RPD:41035011)
      browser.sleep(1000);
    });

    it('Verifying that "12/07/2015" is set to "Start Date" text box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsDates.xpathStartDateTextBox).getText().then(function(value) {
        if (value !== '12/07/2015') {
          expect(false).customError('"12/07/2015" did not set in Start Date text box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should Select "12/9/2015" from end date calender widget', function() {
      ThiefHelpers.setDateInCalendar('12/9/2015', 2);

      //Verifying 12/7/2015 date is selected in end date calender widget
      ThiefHelpers.getDatepickerClassReference('End Date:').getDate().then(function(value) {
        if (value !== '12/09/2015') {
          expect(false).customError('12/09/2015 date did not set in end date calender widget');
          CommonFunctions.takeScreenShot();
        }
      });

      // Adding delay to wait for request to process(RPD:41035011)
      browser.sleep(1000);
    });

    it('Verifying that "12/09/2015" is set to "End Date" text box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsDates.xpathEndDateTextBox).getText().then(function(value) {
        if (value !== '12/09/2015') {
          expect(false).customError('"12/09/2015" did not set in End Date text box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from Tile Option Page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button from Tile Options page');
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Verifying if "Date" hyperlink is set to "12/07/2015 - 12/09/2015"', function() {
      PA3MainPage.getDateHyperLink('Weights').getText().then(function(text) {
        if (text !== '12/07/2015 - 12/09/2015') {
          expect(false).customError('"Date" hyperlink did not set to "12/07/2015 - 12/09/2015"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var colNames = ['Port. Shares', 'Bench. Shares'];

    colNames.forEach(function(col) {

      it('Verifying if "' + col + '" is displayed in the report', function() {
        SlickGridFunctions.getColumnNames('Weights').then(function(arr) {
          if (arr.indexOf(col) < 0) {
            expect(false).customError('"' + col + '" did not display in reports');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 574331', function() {

    it('Should click on wrench icon from "Weights" report', function() {
      PA3MainPage.selectWrenchIcon('Weights');
    });

    it('Verifying if "Menu" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Menu" drop down did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
      browser.sleep(2000);
    });

    it('Should hover on "Transpose" from menu drop down', function() {
      browser.actions().mouseMove(PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Transpose')).perform();

      // Adding extra time to appear the element
      browser.sleep(2000);
    });

    it('Should click on "Portfolios" checkbox from Transpose menu drop down to check off', function() {
      var porfoliosXpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Portfolios');
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).check();

      // Verifying if "Portfolios" is checked
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Portfolios" checkbox did not check off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Disabling wait for Angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should select "Apply" button to close the "Menu" drop down', function() {
      ThiefHelpers.getButtonClassReference('Apply').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should Wait for "Weights" report is recalculated', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Weights'), 180000);

      PA3MainPage.getReportCalculationDlg('Weights').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

  });

  describe('Test Step ID: 810583', function() {

    it('Should click on the "Hamburger" icon next to "Benchmark" widget', function() {
      PA3MainPage.getHamburgerIcon('Benchmark').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Drop down is not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Use Default Benchmark" checkbox to check off', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Default Benchmark').check();

      // Verifying if "Use Default Benchmark" is checked
      ThiefHelpers.getCheckBoxClassReference('Use Default Benchmark').isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Use Default Benchmark" checkbox is still un-checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      PA3MainPage.getHamburgerIcon('Benchmark').getAttribute('Class').then(function(text) {
        if (text.indexOf('active') > 0) {
          expect(false).customError('"Benchmark" account drop down did not close');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Hamburger" icon next to "Portfolio" widget', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Drop down is not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Use Multiple Portfolios" checkbox to un-check', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Multiple Portfolios').uncheck();

      // Verifying if "Use Multiple Portfolios" is un-checked
      ThiefHelpers.getCheckBoxClassReference('Use Multiple Portfolios').isChecked().then(function(flag) {
        if (flag) {
          expect(false).customError('"Use Multiple Portfolios" checkbox did checked off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
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
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Verifying that the header title is "PA3 Testing vs Multiple Benchmarks"', function() {
      PA3MainPage.getHeader().getText().then(function(value) {
        if (value !== 'PA3 Testing vs Multiple Benchmarks') {
          expect(false).customError('Header title is not displayed as "PA3 Testing vs Multiple Benchmarks"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Verifying if Benchmark is set to RUSSELL:1000
    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Benchmark', PA3MainPage.xpathBenchmarkWidget, 'RUSSELL:1000');
  });

  describe('Test Step ID: 810584', function() {

    it('Should click on the "Hamburger" icon next to "Benchmark" widget', function() {
      PA3MainPage.getHamburgerIcon('Benchmark').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Drop down is not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Use Default Benchmark" checkbox to un-check', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Default Benchmark').uncheck();

      // Verifying if "Use Default Benchmark" is un-checked
      ThiefHelpers.getCheckBoxClassReference('Use Default Benchmark').isChecked().then(function(flag) {
        if (flag) {
          expect(false).customError('"Use Default Benchmark" checkbox is checked off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      PA3MainPage.getHamburgerIcon('Benchmark').getAttribute('Class').then(function(text) {
        if (text.indexOf('active') > 0) {
          expect(false).customError('"Benchmark" account drop down did not close');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Verifying if Benchmark is set to RUSSELL:1000
    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Benchmark', PA3MainPage.xpathBenchmarkWidget, 'RUSSELL:1000');
  });

  describe('Test Step ID: 810585', function() {

    it('Should click on the "Hamburger" icon next to "Benchmark" widget', function() {
      PA3MainPage.getHamburgerIcon('Benchmark').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Drop down is not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Use Default Benchmark" checkbox to check off', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Default Benchmark').check();

      // Verifying if "Use Default Benchmark" is checked
      ThiefHelpers.getCheckBoxClassReference('Use Default Benchmark').isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Use Default Benchmark" checkbox is still un-checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      PA3MainPage.getHamburgerIcon('Benchmark').getAttribute('Class').then(function(text) {
        if (text.indexOf('active') > 0) {
          expect(false).customError('"Benchmark" account drop down did not close');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Hamburger" icon next to "Portfolio" widget', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Drop down is not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Use Multiple Portfolios" checkbox to select', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Multiple Portfolios').check();

      // Verifying if "Use Multiple Portfolios" is checked off
      ThiefHelpers.getCheckBoxClassReference('Use Multiple Portfolios').isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Use Multiple Portfolios" checkbox is un-checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
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
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Verifying that the header title is "Multiple Portfolios vs Multiple Benchmarks"', function() {
      PA3MainPage.getHeader().getText().then(function(value) {
        if (value !== 'Multiple Portfolios vs Multiple Benchmarks') {
          expect(false).customError('Header title is not displayed as "Multiple Portfolios vs Multiple Benchmarks"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Verifying if Benchmark is set to RUSSELL:1000
    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Benchmark', PA3MainPage.xpathBenchmarkWidget, 'DEFAULT');
  });

  describe('Test Step ID: 810586', function() {

    it('Should click on the "Hamburger" icon next to "Benchmark" widget', function() {
      PA3MainPage.getHamburgerIcon('Benchmark').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Drop down is not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Use Default Benchmark" checkbox to un-check', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Default Benchmark').uncheck();

      // Verifying if "Use Default Benchmark" is un-checked
      ThiefHelpers.getCheckBoxClassReference('Use Default Benchmark').isChecked().then(function(flag) {
        if (flag) {
          expect(false).customError('"Use Default Benchmark" checkbox is checked off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      PA3MainPage.getHamburgerIcon('Benchmark').getAttribute('Class').then(function(text) {
        if (text.indexOf('active') > 0) {
          expect(false).customError('"Benchmark" account drop down did not close');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that the header title is "Multiple Portfolios vs Multiple Benchmarks"', function() {
      PA3MainPage.getHeader().getText().then(function(value) {
        if (value !== 'Multiple Portfolios vs Multiple Benchmarks') {
          expect(false).customError('Header title is not displayed as "Multiple Portfolios vs Multiple Benchmarks"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Verifying if Benchmark is set to RUSSELL:1000
    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Benchmark', PA3MainPage.xpathBenchmarkWidget, 'RUSSELL:1000');
  });

  describe('Test Step ID: 810587', function() {

    it('Should click on the "Hamburger" icon next to "Portfolio" widget', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Drop down is not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Large Cap Core Test" from the list of accounts', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'Large Cap Core Test').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Large Cap Core Test" account is selected
      PA3MainPage.getSingleAccountFromList('Portfolio', 'Large Cap Core Test').getAttribute('class').then(function(attribute) {
        if (attribute.indexOf('selected') < 0) {
          expect(false).customError('"Large Cap Core Test" account was not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      PA3MainPage.getHamburgerIcon('Benchmark').getAttribute('Class').then(function(text) {
        if (text.indexOf('active') > 0) {
          expect(false).customError('"Benchmark" account drop down did not close');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Hamburger" icon next to "Benchmark" widget', function() {
      PA3MainPage.getHamburgerIcon('Benchmark').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Drop down is not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Use Multiple Benchmarks" checkbox to un-check', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Multiple Benchmarks').uncheck();

      // Verifying if "Use Multiple Benchmarks" is un-checked
      ThiefHelpers.getCheckBoxClassReference('Use Multiple Benchmarks').isChecked().then(function(flag) {
        if (flag) {
          expect(false).customError('"Use Multiple Benchmarks" checkbox is still checked off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Use Default Benchmark" checkbox to check off', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Default Benchmark').check();

      // Verifying if "Use Default Benchmark" is checked
      ThiefHelpers.getCheckBoxClassReference('Use Default Benchmark').isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Use Default Benchmark" checkbox is still un-checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      PA3MainPage.getHamburgerIcon('Benchmark').getAttribute('Class').then(function(text) {
        if (text.indexOf('active') > 0) {
          expect(false).customError('"Benchmark" account drop down did not close');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that the header title is "Multiple Portfolios vs Default Benchmark"', function() {
      PA3MainPage.getHeader().getText().then(function(value) {
        if (value !== 'Multiple Portfolios vs Default Benchmark') {
          expect(false).customError('Header title is not displayed as "Multiple Portfolios vs Default Benchmark"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Verifying if Benchmark is set to DEFAULT
    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Benchmark', PA3MainPage.xpathBenchmarkWidget, 'DEFAULT');
  });

  describe('Test Step ID: 810588', function() {

    it('Should click on the "Hamburger" icon next to "Portfolio" widget', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Drop down is not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "PA3 Testing" from the list of accounts', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'PA3 Testing').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "PA3 Testing" account is selected
      PA3MainPage.getSingleAccountFromList('Portfolio', 'PA3 Testing').getAttribute('class').then(function(attribute) {
        if (attribute.indexOf('selected') < 0) {
          expect(false).customError('"PA3 Testing" account was not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      PA3MainPage.getHamburgerIcon('Benchmark').getAttribute('Class').then(function(text) {
        if (text.indexOf('active') > 0) {
          expect(false).customError('"Benchmark" account drop down did not close');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Hamburger" icon next to "Benchmark" widget', function() {
      PA3MainPage.getHamburgerIcon('Benchmark').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Drop down is not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Use Default Benchmark" checkbox to un-check', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Default Benchmark').uncheck();

      // Verifying if "Use Default Benchmark" is un-checked
      ThiefHelpers.getCheckBoxClassReference('Use Default Benchmark').isChecked().then(function(flag) {
        if (flag) {
          expect(false).customError('"Use Default Benchmark" checkbox is checked off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      PA3MainPage.getHamburgerIcon('Benchmark').getAttribute('Class').then(function(text) {
        if (text.indexOf('active') > 0) {
          expect(false).customError('"Benchmark" account drop down did not close');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that the header title is "Multiple Portfolios vs Russell 1000"', function() {
      PA3MainPage.getHeader().getText().then(function(value) {
        if (value !== 'Multiple Portfolios vs Russell 1000') {
          expect(false).customError('Header title is not displayed as "Multiple Portfolios vs Russell 1000"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Verifying if Benchmark is set to DEFAULT
    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Benchmark', PA3MainPage.xpathBenchmarkWidget, 'RUSSELL:1000');
  });
});
