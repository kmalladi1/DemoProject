'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: refresh-to-cancel', function() {

  // Variables
  var groupingsVal;
  var arrCols = [];
  var arrBothBH = [];
  var arrJustPE = [];
  var headerVal;

  describe('Test Step ID: 422108', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/PA3/PA3_FI_Price_Effect" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('pa3-fi-price-effect');
    });

    it('Verifying if "PA3_FI_Price_Effect" document is opened without any issues', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Portfolio', PA3MainPage.xpathPortfolioWidget, 'CLIENT:/PA3/FIXED_INCOME/FI_TBR.ACCT');

    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Benchmark', PA3MainPage.xpathBenchmarkWidget, 'MFI:MLB0A0');
  });

  describe('Test Step ID: 422101', function() {

    it('Automation Task: Ignoring synchronization to handle Refresh Cancel button', function() {
      browser.ignoreSynchronization = true;
    });

    // Verify the option from the lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Just Price Effect - DV', undefined, 'isSelected');

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    it('Wait for the loading icon to display', function() {
      ThiefHelpers.waitUntilSpinnerAppears(PA3MainPage.getProgressIndicatorClassReference('Just Price Effect - DV'), 15000);
    });

    it('Verifying if "Refresh Cancel ( X )" button is displayed', function() {
      ThiefHelpers.getProgressIndicatorClassReference().getProgress().then(function(value) {
        CommonFunctions.isDisplayed('Button', undefined, PA3MainPage.xpathRefreshToCancelBtn).then(function(found) {
          if (!found) {
            expect(false).customError('"Cancel" button is not displayed');
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {

          expect(false).customError('"Refresh Cancel ( X )" button is not displayed due to ' + err);
          CommonFunctions.takeScreenShot();
        });
      }, function(error) {
        expect(false).customError('"Cancel" button is not displayed.     ' + error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait until loading icon in Just Price Effects appears', function() {
      expect(Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Just Price Effect - DV'), 10000)).toBeTruthy();
    });

    it('Verify if the report is "Just Price Effect - DV"  re-calculating', function() {
      ThiefHelpers.getProgressIndicatorClassReference().getProgress().then(function() {}, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 422102', function() {

    it('Should click "Refresh Cancel ( X )" button from the application header', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.xpathRefreshToCancelBtn).press();
    });

    it('Enable wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Just Price Effect - DV');
  });

  describe('Test Step ID: 422103', function() {

    // Select and verify the option from the lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Just Price Effect - CFSOD', true, 'isSelected');

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Just Price Effect - CFSOD');

    it('Verifying if "Just Price Effect - CFSOD" report is grouped by "Portfolio/Benchmark"', function() {
      PA3MainPage.getGroupingsHyperLink('Just Price Effect - CFSOD').getText().then(function(value) {
        // For the next step
        groupingsVal = value;
        if (value !== 'Portfolio/Benchmark') {
          expect(false).customError(' "Just Price Effect-CFSOD" report is not grouped by ' + '"Portfolio/Benchmark"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 422104', function() {

    it('Saving the Total Row column values', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Just Price Effect - CFSOD', '').then(function(values) {
        values.forEach(function(val) {
          arrCols.push(val);
        });
      });
    });

    // check automatic calculation from wrench menu
    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSetAutomaticCalculation(true);

    it('Should click "Portfolio/Benchmark" hyperlink', function() {
      PA3MainPage.getGroupingsHyperLink('Just Price Effect - CFSOD').click();
    });

    it('Verifying if Tile Options - Just Price Effect - CFSOD page is opened', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Just Price Effect - CFSOD').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - Just Price Effect - CFSOD".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Groupings" is selected in LHP', function() {
      // Verifying if "Groupings" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Groupings').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Groupings" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover over "Portfolio/Benchmark" from the Selected section and click on ( X ) icon', function() {
      browser.actions().mouseMove(TileOptionsGroupings.getElementFromSelectedContainer('Portfolio/Benchmark')).perform();

      // Clicking the Remove icon
      TileOptionsGroupings.getRemoveButtonOfElementInSelectedSection('Portfolio/Benchmark').click();
    });

    it('Automation Task:Ignoring synchronization to handle Refresh Cancel button', function() {
      browser.ignoreSynchronization = true;
    });

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Just Price Effect - CFSOD');

    it('Should click "Refresh Cancel ( X )" button from the application header', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.xpathRefreshToCancelBtn).press();
    });

    it('Verifying if Report stops loading', function() {
      // Making ignoring synchronization to false
      browser.ignoreSynchronization = false;

      PA3MainPage.getReportCalculationDlg().isDisplayed().then(function(found) {
        if (found) {
          expect(false).customError('Report does not stops loading');
          CommonFunctions.takeScreenShot();
        }
      }, function() {
      });
    });

    it('Verifying if "Red Alert" is displayed next to tile name', function() {
      PA3MainPage.getReportCachingAlertIcon('Just Price Effect - CFSOD').isDisplayed().then(function(found) {
        if (!found) {
          expect(false).customError('"Red Alert" is not displayed next to tile name');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying Total Row column values', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Just Price Effect - CFSOD', '').then(function(values) {
        Utilities.arrayCompare(arrCols, values);
      });
    });

    it('Verifying if "Just Price Effect - CFSOD" report is not grouped by "Portfolio/Benchmark"', function() {
      PA3MainPage.getGroupingsHyperLink('Just Price Effect - CFSOD').getText().then(function(value) {
        if (value === 'Portfolio/Benchmark') {
          expect(false).customError(' "Just Price Effect-CFSOD" report is grouped by "Portfolio/Benchmark"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 422112', function() {

    it('Should click on the Red warning icon next to the tile name', function() {
      PA3MainPage.getReportCachingAlertIcon('Just Price Effect - CFSOD').click();
    });

    it('Verifying that warning message saying "Warning: Settings Have Changed Since Report Was Last Calculated."' + ' is displayed', function() {
      Utilities.getInfoBoxText().then(function(val) {
        if (val !== 'Warning: Settings Have Changed Since Report Was Last Calculated.') {
          expect(false).customError('Info box text is not as expected');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 422109', function() {

    // un-check automatic calculation from wrench menu
    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSetAutomaticCalculation(false);

    // Select and verify the option from the lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Both - BH', true, 'isSelected');

    it('Verifying if "Both - BH" and "Just Price Effects" are loaded side by side', function() {
      PA3MainPage.getMatrixTile(1, 1).getText().then(function(val) {
        if (val !== 'Both - BH') {
          expect(false).customError('"Both - BH" and "Just Price Effects" are not loaded side by side');
        }
      });

      PA3MainPage.getMatrixTile(1, 2).getText().then(function(val) {
        if (val !== 'Just Price Effects') {
          expect(false).customError('"Both - BH" and "Just Price Effects" are not loaded side by side');
        }
      });
    });
  });

  describe('Test Step ID: 422110', function() {

    it('Automation Task: Ignoring synchronization to handle Refresh Cancel button', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    it('Should click "Refresh Cancel ( X )" button from the application header', function() {
      browser.sleep(2000);
      ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.xpathRefreshToCancelBtn).press();
    });

    it('Verifying if Report stops loading', function() {
      // Making ignoring synchronization to false
      browser.ignoreSynchronization = false;

      PA3MainPage.getReportCalculationDlg().isDisplayed().then(function(found) {
        if (found) {
          expect(false).customError('Report does not stops loading');
          CommonFunctions.takeScreenShot();
        }
      }, function() {
      });
    });

    it('Verifying if "Both - BH" Report is blank', function() {
      PA3MainPage.isReportCalculated('Both - BH').then(function(found) {
        if (found) {
          expect(false).customError('"Both - BH" is not blank. Report is calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function() {
      });
    });

    it('Verifying if "Just Price Effects" Report is blank', function() {
      PA3MainPage.isReportCalculated('Just Price Effects').then(function(found) {
        if (found) {
          expect(false).customError('Report "Just Price Effects" is not blank. Report is calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function() {
      });
    });
  });

  describe('Test Step ID: 422111', function() {

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    it('Automation Task: Ignoring synchronization to handle Refresh Cancel button', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should wait until loading icon in "Both - BH" appears', function() {
      expect(Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Both - BH'), 4000)).toBeTruthy();
    });

    it('Should click on "Cancel" button in "Both - BH" Report calculation dialog', function() {
      PA3MainPage.cancelReportCalculation('Both - BH');
    });

    it('Verifying if "Both - BH" Report is blank', function() {
      PA3MainPage.isReportCalculated('Both - BH').then(function(found) {
        if (found) {
          expect(false).customError('"Both - BH" is not blank. Report is calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function() {
      });
    });

    it('Automation Task: Ignoring synchronization after handling Refresh button', function() {
      browser.ignoreSynchronization = false;
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Just Price Effects');

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Both - BH');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Just Price Effects');

    it('Verifying if Report Header name is "FI_TBR vs ICE BofAML U.S. Corporate & Government Master"', function() {
      PA3MainPage.getHeader().getText().then(function(val) {
        if (val !== 'FI_TBR vs ICE BofAML U.S. Corporate & Government Master') {
          expect(false).customError('Header value is not as expected ');
          CommonFunctions.takeScreenShot();
        }

        headerVal = val;
      });
    });
  });

  describe('Test Step ID: 422105', function() {

    it('Saving the Total Row column values for Both - BH report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Both - BH', '').then(function(values) {
        values.forEach(function(val) {
          arrBothBH.push(val);
        });
      });
    });

    it('Saving the Total Row column values for Just Price Effects report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Just Price Effects', '').then(function(values) {
        values.forEach(function(val) {
          arrJustPE.push(val);
        });
      });
    });

    it('Should type "Training" in the Portfolio widget and select "TRAINING_DEMO" from the type ahead', function() {
      PA3MainPage.setPortfolio('Training', 'TRAINING_DEMO.ACCT', 'Client:/pv2/demo/TRAINING_DEMO.ACCT');
    });

    it('Should type "RUSSELL:1000" in the Benchmark widget', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathBenchmarkWidget).setText('RUSSELL:1000');

      // Verifying if RUSSELL:1000 is enetered in the wodget
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathBenchmarkWidget).getText().then(function(val) {
        if (val !== 'RUSSELL:1000') {
          expect(false).customError('Benchmark widget is not populated with "RUSSELL:1000"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Automation Task: Ignoring synchronization to handle Refresh Cancel button', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();

      // wait for press action to takes place
      browser.sleep(2000);
    });

    it('Should click "Refresh Cancel ( X )" button from the application header', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.xpathRefreshToCancelBtn).press();
    });

    it('Verifying if Report stops loading', function() {
      // Making ignoring synchronization to false
      browser.ignoreSynchronization = false;

      PA3MainPage.getReportCalculationDlg().isDisplayed().then(function(found) {
        if (found) {
          expect(false).customError('Report does not stops loading');
          CommonFunctions.takeScreenShot();
        }
      }, function() {
      });
    });

    // Known Issue RPD:29153524
    it('Waiting for "Just Price Effects" report to load 6 groupings', function() {
      // Wait for report to load 6 groupings
      browser.wait(function() {
        return PA3MainPage.getAllExpandCollapseButtonsFromCalculatedReport('Just Price Effects', 'grid-canvas grid-canvas-top grid-canvas-left').then(function(ele) {
          return ele.length === 6;
        });
      }, 180000, 'Time out while waiting for 6 groupings to load.').then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    var tiles = ['Both - BH', 'Just Price Effects'];
    tiles.forEach(function(element) {
      it('Verifying if "Red Alert" is displayed next to "' + element + '" tile name', function() {
        PA3MainPage.getReportCachingAlertIcon(element).isDisplayed().then(function(found) {
          if (!found) {
            expect(false).customError('"Red Alert" is not displayed next to "' + element + '"tile name');
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Portfolio', PA3MainPage.xpathPortfolioWidget, 'Client:/pv2/demo/TRAINING_DEMO.ACCT');

    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Benchmark', PA3MainPage.xpathBenchmarkWidget, 'RUSSELL:1000');

    it('Verifying Total Row column values for Both - BH', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Both - BH', '').then(function(values) {
        Utilities.arrayCompare(arrBothBH, values);
      });
    });

    it('Verifying Total Row column values for Just Price Effects', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Just Price Effects', '').then(function(values) {
        Utilities.arrayCompare(arrJustPE, values);
      });
    });

    it('Verifying if the header value is "Training Demo vs RUSSELL:1000"', function() {
      PA3MainPage.getHeader().getText().then(function(val) {
        if (val === headerVal) {
          expect(false).customError('Header value has not changed and it is ' + headerVal);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
