'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: port-display-toggle', function() {

  describe('Test Step ID: 691313', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should navigate the "PA3 application" with "Client:;pa3;general;port_description"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('port-description');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should click the Hamburger icon next to the benchmark widget', function() {
      PA3MainPage.getHamburgerIcon('Benchmark').click();

      // Verifying if Account Drop Down is opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account drop down is not opened.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Composite Style Benchmark (SB_TEST)" from the list of accounts', function() {
      PA3MainPage.getSingleAccountFromList('Benchmark', 'Composite Style Benchmark (SB_TEST)')
        .click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Composite Style Benchmark (SB_TEST)" account is selected
      PA3MainPage.getSingleAccountFromList('Benchmark', 'Composite Style Benchmark (SB_TEST)')
        .getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Composite Style Benchmark (SB_TEST)" did not select in Benchmark drop down');
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
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if the report header is "SB_TEST vs Composite Style Benchmark (SB_TEST)"', function() {
      PA3MainPage.getHeader().getText().then(function(header) {
        if (header !== 'SB_TEST vs Composite Style Benchmark (SB_TEST)') {
          expect(false).customError('Header text is not set as "SB_TEST vs Composite Style Benchmark (SB_TEST)"; Found: ' + header);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Wrench" button from the application toolbar', function() {
      PA3MainPage.selectWrenchIcon();
    });

    it('Should verify if "Display Description" is selected in "Format Options>Portfolio" from wrench drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Format Options|Portfolio|Display Description').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Display Description" is not present in "Format Options>Portfolio"');
          CommonFunctions.takeScreenShot();
        } else {
          ThiefHelpers.getMenuClassReference(3, true).getRadioState('Display Description').then(function(selected) {
            if (!selected) {
              expect(false).customError('"Display Description" is not selected in "Format Options>Portfolio"');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    // Clicking on 'Exposures' report to as the action asked to click on blank space in the report
    it('Should click on "Exposures" report as the action asked to click on blank space in the report', function() {
      PA3MainPage.getReports('Exposures').click().then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 691315', function() {

    it('Should click on the "Wrench" button from the application toolbar', function() {
      PA3MainPage.selectWrenchIcon();
    });

    it('Should click on "Format Options>Portfolio>Display Name" from wrench drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Format Options|Portfolio|Display Name').click().then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should click on the "Wrench" button from the application toolbar', function() {
      PA3MainPage.selectWrenchIcon();
    });

    it('Verify if "Display Name" is selected in "Format Options>Portfolio" from wrench drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Format Options|Portfolio|Display Name').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Display Name" is not present in "Format Options>Portfolio"');
          CommonFunctions.takeScreenShot();
        } else {
          ThiefHelpers.getMenuClassReference(3, true).getRadioState('Display Name').then(function(selected) {
            if (!selected) {
              expect(false).customError('"Display Name" is not selected in "Format Options>Portfolio"');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the report header is "STYLE_BENCH_TEST vs STYLE_BENCH_TEST"', function() {
      PA3MainPage.getHeader().getText().then(function(header) {
        if (header !== 'STYLE_BENCH_TEST vs STYLE_BENCH_TEST') {
          expect(false).customError('Header text is not set as "STYLE_BENCH_TEST vs STYLE_BENCH_TEST"; Found: ' + header);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 691319', function() {

    it('Should select "Region Weights" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Weights', 'Region Weights').then(function(ref) {
        ref.click().then(function() {
        }, function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });

      // Verifying "Region Weights" Report is selected.
      ThiefHelpers.getNavepaneItemReference('Reports', 'Weights', 'Region Weights').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Region Weights" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should click on Portfolio Hamburger icon', function() {
      PA3MainPage.getHamburgerIcon('portfolio').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on Portfolio Hamburger icon');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Portfolio Hamburger drop down is displayed', function() {
      ThiefHelpers.isDropDownOpen(1).then(function(status) {
        if (!status) {
          expect(false).customError('Portfolio Hamburger drop down is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "X" icon next to "SB_TEST" in "Portfolio" widget drop down', function() {
      PA3MainPage.getAccountDeleteButton('Portfolio', 'SB_TEST').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "X" icon next to "SB_TEST" in Portfolio widget drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "SB_TEST" account is removed from Portfolio widget drop down', function() {
      PA3MainPage.getListFromAccountDropdown('Portfolio', true).then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(ref) {
          ref.getText().then(function(text) {
            if (text === 'SB_TEST') {
              expect(false).customError('"SB_TEST" account is not removed from Portfolio widget drop down');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Should select "OK" button to close the "Portfolio" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Portfolio" drop down is closed
      ThiefHelpers.isDropDownOpen().then(function(status) {
        if (status) {
          expect(false).customError('"Portfolio" drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should click on Benchmark Hamburger icon', function() {
      PA3MainPage.getHamburgerIcon('Benchmark').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on Benchmark Hamburger icon');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Benchmark Hamburger drop down is displayed', function() {
      ThiefHelpers.isDropDownOpen(1).then(function(status) {
        if (!status) {
          expect(false).customError('Benchmark Hamburger drop down is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "X" icon next to "Composite Style Benchmark (SB_TEST)" in Benchmark widget drop down', function() {
      // Hover on list item to get the x icon in visible state
      browser.actions().mouseMove(PA3MainPage.getSingleAccountFromList('Benchmark', 'Composite Style Benchmark (SB_TEST)')).perform();

      PA3MainPage.getAccountDeleteButton('Benchmark', 'Composite Style Benchmark (SB_TEST)').click().then(function() {
      }, function(error) {
        expect(false).customError('Unable to click on "X" icon next to "Composite Style Benchmark (SB_TEST)" in ' + 'Benchmark widget drop down. Error found: ' + error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Composite Style Benchmark (SB_TEST)" account is removed from Benchmark widget drop down', function() {
      PA3MainPage.getListFromAccountDropdown('Benchmark', true).then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(ref) {
          ref.getText().then(function(text) {
            if (text === 'Composite Style Benchmark (SB_TEST)') {
              expect(false).customError('"Composite Style Benchmark (SB_TEST)" account is not removed from Benchmark widget drop down');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Should select "OK" button to close the "Benchmark" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Benchmark', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Benchmark" drop down is closed
      ThiefHelpers.isDropDownOpen().then(function(status) {
        if (status) {
          expect(false).customError('"Benchmark" drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

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

    it('Should check "Use Multiple Portfolios" check box', function() {
      var xpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xptahCheckboxFromAccountsDropdown, 'Use Multiple Portfolios');

      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).check();

      // Verifying that "Use Multiple Portfolios" check box is checked
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).isChecked().then(function(value) {
        if (!value) {
          expect(false).customError('"Use Multiple Portfolios" checkbox is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "OK" button from the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('Class').then(function(text) {
        if (text.indexOf('active') > -1) {
          expect(false).customError('"Accounts" drop down is not closed even after clicking on "OK" button');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should enter "DEFAULT" in Benchmark widget and perform enter', function() {
      ThiefHelpers.getTextBoxClassReference('Benchmark', PA3MainPage.xpathBenchmarkWidget).setText('DEFAULT', protractor.Key.ENTER);

      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathBenchmarkWidget).getText().then(function(text) {
        if (text !== 'DEFAULT') {
          expect(false).customError('Benchmark widget is not populated with "DEFAULT". Found ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var arrHeaders = ['COMPOSITE_ASSET vs. DEFAULT', 'TEST_ACCOUNT vs. EIEI'];
    arrHeaders.forEach(function(header) {
      it('Verifying if the column header is "' + header + '"', function() {
        SlickGridFunctions.getMultiHeaderNames('Weights').then(function(headers) {
          if (headers.indexOf(header) < 0) {
            expect(false).customError('"' + header + '" Column header is not displayed in the report.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on the "Wrench" button from the application toolbar', function() {
      PA3MainPage.selectWrenchIcon();
    });

    it('Should verify if "Display Name" is selected in "Format Options>Portfolio" from wrench drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Format Options|Portfolio|Display Name').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Display Name" is not present in "Format Options>Portfolio"');
          CommonFunctions.takeScreenShot();
        } else {
          ThiefHelpers.getMenuClassReference(3, true).getRadioState('Display Name').then(function(selected) {
            if (!selected) {
              expect(false).customError('"Display Name" is not selected in "Format Options>Portfolio"');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 691337', function() {

    // Clicking on 'Region Weights' report to as the action asked to click on blank space in the report
    it('Should click on "Region Weights" report as the action asked to click on blank space in the report', function() {
      PA3MainPage.getReports('Region Weights').click().then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on the "Wrench" button from the application toolbar', function() {
      PA3MainPage.selectWrenchIcon();
    });

    it('Should click on "Format Options>Portfolio>Display Description" from wrench drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Format Options|Portfolio|Display Description').click().then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var arrHeaders = ['COMPOSITE_ASSET vs. DEFAULT', 'Test Account vs. Lipper Equity Income'];
    arrHeaders.forEach(function(header) {
      it('Verifying if the report header is "' + header + '"', function() {
        SlickGridFunctions.getMultiHeaderNames('Weights').then(function(headers) {
          if (headers.indexOf(header) < 0) {
            expect(false).customError('"' + header + '" Column header is not displayed in the report.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 691338', function() {

    it('Should right click on the "Port. Weight" value for "North America" under "Test Account vs. Lipper Equity Income" and select audit Value', function() {
      SlickGridFunctions.getCellReference('Weights', 'North America', '', 'Port. Weight', 'Test Account vs. Lipper Equity Income').then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verify that application is changed to "AUDIT" mode', function() {
      AuditMode.isAuditMode().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Audit Mode" is not appeared on the screen');
        }
      });
    });

    var arrHeaders = ['COMPOSITE_ASSET vs. DEFAULT', 'Test Account vs. Lipper Equity Income'];
    arrHeaders.forEach(function(header) {
      it('Verifying if the report header is "' + header + '"', function() {
        SlickGridFunctions.getMultiHeaderNames('Weights').then(function(headers) {
          if (headers.indexOf(header) < 0) {
            expect(false).customError('"' + header + '" Column header is not displayed in the report.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 691382', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Done" button' + err);
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should click on the "Wrench" button from the application toolbar', function() {
      PA3MainPage.selectWrenchIcon();
    });

    it('Should click on "Format Options>Portfolio>Display Name" from wrench drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Format Options|Portfolio|Display Name').click().then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should right click on the "Port. Weight" value for "North America" under "TEST_ACCOUNT vs. EIEI" and select audit Value', function() {
      SlickGridFunctions.getCellReference('Weights', 'North America', '', 'Port. Weight', 'TEST_ACCOUNT vs. EIEI').then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verify that application is changed to "AUDIT" mode', function() {
      AuditMode.isAuditMode().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Audit Mode" is not appeared on the screen');
        }
      });
    });

    var arrHeaders = ['COMPOSITE_ASSET vs. DEFAULT', 'TEST_ACCOUNT vs. EIEI'];
    arrHeaders.forEach(function(header) {
      it('Verifying if the report header is "' + header + '"', function() {
        SlickGridFunctions.getMultiHeaderNames('Weights').then(function(headers) {
          if (headers.indexOf(header) < 0) {
            expect(false).customError('"' + header + '" Column header is not displayed in the report.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 691383', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Done" button' + err);
      });
    });

    it('Should click the Hamburger icon next to the Portfolio widget', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click();

      // Verifying if Account Drop Down is opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account drop down is not opened.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Test Account" from the list of accounts', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'Test Account')
        .click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Test Account" account is selected
      PA3MainPage.getSingleAccountFromList('Portfolio', 'Test Account')
        .getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Test Account" did not select in Portfolio drop down');
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
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should click on Chart icon available in the "Weights" report Workspace', function() {
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "chart" icon from report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Custom Charts" from the drop down', function() {
      ThiefHelpers.getMenuClassReference(1, true).getSubMenuByText('Custom Charts');
    });

    it('Should select "Column" from the drop down', function() {
      ThiefHelpers.getMenuClassReference(2).selectItemByText('Column');
    });

    it('Verifying that Port. Weight chart is loaded', function() {
      // Verify that Port. Weight chart is loaded
      PA3MainPage.isInChartFormat('Port. Weight').then(function(option) {
        if (option !== true) {
          expect(false).customError('Port. Weight chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Wrench" button from the application toolbar', function() {
      PA3MainPage.selectWrenchIcon();
    });

    it('Verify if "Display Name" is selected in "Format Options>Portfolio" from wrench drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Format Options|Portfolio|Display Name').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Display Name" is not present in "Format Options>Portfolio"');
          CommonFunctions.takeScreenShot();
        } else {
          ThiefHelpers.getMenuClassReference(3, true).getRadioState('Display Name').then(function(selected) {
            if (!selected) {
              expect(false).customError('"Display Name" is not selected in "Format Options>Portfolio"');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Port. Weight - TEST_ACCOUNT" is as the chart legends', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.indexOf('Port. Weight - TEST_ACCOUNT') < 0) {
          expect(false).customError('"Port. Weight - TEST_ACCOUNT" did not present as legend');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 691384', function() {

    // Clicking on 'Region Weights' report to as the action asked to click on blank space in the report
    it('Should click on "Region Weights" report as the action asked to click on blank space in the report', function() {
      PA3MainPage.getReports('Region Weights').click().then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on the "Wrench" button from the application toolbar', function() {
      PA3MainPage.selectWrenchIcon();
    });

    it('Should click on "Format Options>Portfolio>Display Description" from wrench drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Format Options|Portfolio|Display Description').click().then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that Port. Weight chart is loaded', function() {
      // Verify that Port. Weight chart is loaded
      PA3MainPage.isInChartFormat('Port. Weight').then(function(option) {
        if (option !== true) {
          expect(false).customError('Port. Weight chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if only one legend is Price to Earnings', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.length !== 1) {
          expect(false).customError('Only one legend did not present in chart');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Port. Weight - Test Account" is as the chart legends', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.indexOf('Port. Weight - Test Account') < 0) {
          expect(false).customError('"Port. Weight - Test Account" did not present as legend');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 691386', function() {

    it('Should click on Grid icon in the "Port. Weight" chart', function() {
      //Clicking on grid icon
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Port. Weight').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should click on the "Wrench" button from the "Weights" report', function() {
      PA3MainPage.selectWrenchIcon('Weights');

      //Verifying menu drop down is appeared'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Menu drop down list did not display in "Weights" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Transpose" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Transpose').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should check "Portfolios" checkbox from Transpose menu drop down', function() {
      var porfoliosXpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Portfolios');
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).check();

      // Verifying if "Portfolios" is checked
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Portfolios" checkbox did not check');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Apply" button to close the "Menu" drop down', function() {
      ThiefHelpers.getButtonClassReference('Apply').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should click on the "Wrench" button from the application toolbar', function() {
      PA3MainPage.selectWrenchIcon();
    });

    it('Should verify if "Display Description" is selected in "Format Options>Portfolio" from wrench drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Format Options|Portfolio|Display Description').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Display Description" is not present in "Format Options>Portfolio"');
          CommonFunctions.takeScreenShot();
        } else {
          ThiefHelpers.getMenuClassReference(3, true).getRadioState('Display Description').then(function(selected) {
            if (!selected) {
              expect(false).customError('"Display Description" is not selected in "Format Options>Portfolio"');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying two rows are displayed in weights report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(cols) {
        if (cols.length !== 2) {
          expect(false).customError('Number of rows in the Weights report are not two. Found:' + cols.length);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "COMPOSITE_ASSET vs. DEFAULT" and "Test Account vs. Lipper Equity Income" are displayed in weights report', function() {
      //Verifying "COMPOSITE_ASSET vs. DEFAULT" and "Test Account vs. Lipper Equity Income"
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(cols) {
        if (cols.indexOf('COMPOSITE_ASSET vs. DEFAULT') === -1) {
          expect(false).customError('"COMPOSITE_ASSET vs. DEFAULT" is not present in the columns');
          CommonFunctions.takeScreenShot();
        }

        if (cols.indexOf('Test Account vs. Lipper Equity Income') === -1) {
          expect(false).customError('"Test Account vs. Lipper Equity Income" is not present in the columns');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 691387', function() {

    // Clicking on 'Region Weights' report to as the action asked to click on blank space in the report
    it('Should click on "Region Weights" report as the action asked to click on blank space in the report', function() {
      PA3MainPage.getReports('Region Weights').click().then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on the "Wrench" button from the application toolbar', function() {
      PA3MainPage.selectWrenchIcon();
    });

    it('Should click on "Format Options>Portfolio>Display Name" from wrench drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Format Options|Portfolio|Display Name').click().then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying two rows are displayed in weights report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(cols) {
        if (cols.length !== 2) {
          expect(false).customError('Number of rows in the Weights report are not two. Found:' + cols.length);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "COMPOSITE_ASSET vs. DEFAULT" and "TEST_ACCOUNT vs. EIEI" are displayed in weights report', function() {
      //Verifying "COMPOSITE_ASSET vs. DEFAULT" and "TEST_ACCOUNT vs. EIEI"
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(cols) {
        if (cols.indexOf('COMPOSITE_ASSET vs. DEFAULT') === -1) {
          expect(false).customError('"COMPOSITE_ASSET vs. DEFAULT" is not present in the columns');
          CommonFunctions.takeScreenShot();
        }

        if (cols.indexOf('TEST_ACCOUNT vs. EIEI') === -1) {
          expect(false).customError('"TEST_ACCOUNT vs. EIEI" is not present in the columns');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
