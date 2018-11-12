'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: full-refresh', function() {

  describe('Test Step ID: 440930', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should open PA3 Application with "Client:/PA3/general/full-refresh" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('full-refresh');
    });

    it('Verifying if "full-refresh" document is opened without any issues', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if Portfolio widget is populated with "SPN:SP50"', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathPortfolioWidget).getText().then(function(val) {
        if (val !== 'SPN:SP50') {
          expect(false).customError('Portfolio widget is not populated with "SPN:SP50"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Benchmark widget is populated with "RUSSELL:1000"', function() {
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
  });

  describe('Test Step ID: 440920', function() {

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    it('Should wait until loading icon in Attribution disappears', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 360000)).toBeTruthy();

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Attribution'), 360000)).toBeTruthy();
    });

    it('Verifying if "Refresh" button is enabled', function() {
      CommonFunctions.isElementEnabled('Button', undefined, PA3MainPage.xpathRefreshBtn).then(function(isEnabled) {
        if (!isEnabled) {
          expect(false).customError('"Refresh" button is enabled');
        }
      });
    });
  });

  describe('Test Step ID: 440925', function() {

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    it('Should wait until loading icon disappears', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 360000)).toBeTruthy();

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Attribution'), 360000)).toBeTruthy();

      // wait for the web element to load
      browser.sleep(3000);
    });

    var tiles = ['Weights', 'Attribution'];
    tiles.forEach(function(element) {
      it('Verifying if "' + element + '" Report calculated without any errors', function() {
        PA3MainPage.isReportCalculated(element, true).then(function(found) {
          if (!found) {
            expect(false).customError('"' + element + '" Report not calculated');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            expect(PA3MainPage.isReportCalculated(element)).toBeTruthy();
          } else {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          }
        });

        // Verifying if Calculation error displayed
        ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
          // Verifying if any error dialog box appeared
          if (option) {
            expect(false).customError('"Calculation Error" dialog appeared');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 440922', function() {

    it('Should click on the "Wrench" icon in the "Attribution" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile Options" page is opened', function() {
      //verifying tile options mode is opened
      TileOptions.isTileOptionsMode().then(function(value) {
        if (!value) {
          expect(false).customError('Tile Options mode is Closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Dates" from the LHP', function() {
      TileOptions.getLHPOption('Dates').click();

      // Verifying if "Dates" is selected in LHP
      TileOptions.getLHPOption('Dates').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Dates" did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "One Year Ago" from the End Date dropdown', function() {
      TileOptionsDates.getDateDropDown('End Date').click();

      // Verifying if drop down opened
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('End Date dropdown is not opened');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Select One Year Ago from the drop down
      ThiefHelpers.getOptionFromDropdown('One Year Ago').click();
    });

    it('Verifying if "One year Ago" is selected from the drop down', function() {
      TileOptionsDates.getDateField('End Date').getAttribute('value').then(function(val) {
        if (val !== 'One Year Ago') {
          expect(false).customError('"One year Ago" is not selected from the drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Can not able to click on OK button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(value) {
        if (value) {
          expect(false).customError('"Tile Options" mode is not Closed');
          CommonFunctions.takeScreenShot();
        }
      }, function() {
      });
    });

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    it('Should wait until loading icon disappears', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 360000)).toBeTruthy();

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Attribution'), 360000)).toBeTruthy();

      // wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if "Attribution" Report calculated', function() {
      PA3MainPage.isReportCalculated('Attribution', true).then(function(found) {
        if (!found) {
          expect(false).customError('"Attribution" Report not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if Calculation error displayed
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    it('Should wait until loading icon in Attribution disappears', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Attribution'), 360000)).toBeTruthy();

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 360000)).toBeTruthy();

      // wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if "Attribution" Report calculated', function() {
      PA3MainPage.isReportCalculated('Attribution', true).then(function(found) {
        if (!found) {
          expect(false).customError('"Attribution" Report not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if Calculation error displayed
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Refresh" button is enabled', function() {
      CommonFunctions.isElementEnabled('Button', undefined, PA3MainPage.xpathRefreshBtn).then(function(isEnabled) {
        if (!isEnabled) {
          expect(false).customError('"Refresh" button is enabled');
        }
      });
    });
  });

  describe('Test Step ID: 440926', function() {

    it('Should hover on Weights and click "Edit Layout" from the Wrench', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Uncategorized', 'Weights').getActions().then(function(actions) {
        actions.triggerAction('edit').then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Verifying if "Edit Report Layout" is opened', function() {
      PA3EditMode.isEditMode().then(function(isMode) {
        if (!isMode) {
          expect(false).customError('"Edit Report Layout" is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click Remove( X ) icon for the "Attribution" report layout', function() {
      PA3EditMode.getTileDeleteButton('Attribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Attribution" tile is removed from Layout', function() {
      PA3EditMode.getTileHeader('Attribution').isDisplayed().then(function(isFound) {
        if (isFound) {
          expect(false).customError('"Attribution" tile is not removed from Layout');
          CommonFunctions.takeScreenShot();
        }
      }, function() {
      });
    });

    it('Should click "OK" button from the Edit Layout page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Edit Report Layout" is closed', function() {
      PA3EditMode.isEditMode().then(function(isMode) {
        if (isMode) {
          expect(false).customError('"Edit Report Layout" is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait until loading icon disappears', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 360000)).toBeTruthy();

      // wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if "Weights" Report calculated', function() {
      PA3MainPage.isReportCalculated('Weights', true).then(function(found) {
        if (!found) {
          expect(false).customError('"Weights" Report not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if Calculation error displayed
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Attribution" tile removed', function() {
      PA3MainPage.getMatrixTile(1, 2).getText().then(function(tileName) {
        if (tileName === 'Attribution') {
          expect(false).customError('"Attribution" tile is not removed from the Weights report layout');
        }
      }, function() {
      });
    });

    it('Verifying if "Refresh" button is enabled', function() {
      CommonFunctions.isElementEnabled('Button', undefined, PA3MainPage.xpathRefreshBtn).then(function(isEnabled) {
        if (!isEnabled) {
          expect(false).customError('"Refresh" button is enabled');
        }
      });
    });
  });

  describe('Test Step ID: 440924', function() {

    it('Should click on the "Wrench" icon in the "Weights" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile Options" page is opened', function() {
      //verifying tile options mode is opened
      TileOptions.isTileOptionsMode().then(function(value) {
        if (!value) {
          expect(false).customError('Tile Options mode is Closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Dates" from the LHP', function() {
      TileOptions.getLHPOption('Dates').click();

      // Verifying if "Dates" is selected in LHP
      TileOptions.getLHPOption('Dates').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Dates" did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Previous Close" from the End Date drop down', function() {
      TileOptionsDates.getDateDropDown('Single\'s End Date').click();

      // Verifying if drop down opened
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('End Date dropdown is not opened');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Select Previous Close from the drop down
      ThiefHelpers.getOptionFromDropdown('Previous Close').click();
    });

    it('Verifying if "Previous Close" is selected from the drop down', function() {
      TileOptionsDates.getDateField('Single\'s End Date').getAttribute('value').then(function(val) {
        if (val !== 'Previous Close') {
          expect(false).customError('"Previous Close" is not selected from the drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Can not able to click on OK button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(value) {
        if (value) {
          expect(false).customError('"Tile Options" mode is not Closed');
          CommonFunctions.takeScreenShot();
        }
      }, function() {
      });
    });

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    it('Should wait until loading icon disappears', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 360000)).toBeTruthy();

      // wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if "Weights" Report calculated', function() {
      PA3MainPage.isReportCalculated('Weights', true).then(function(found) {
        if (!found) {
          expect(false).customError('"Weights" Report not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if Calculation error displayed
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Refresh" button is enabled', function() {
      CommonFunctions.isElementEnabled('Button', undefined, PA3MainPage.xpathRefreshBtn).then(function(isEnabled) {
        if (!isEnabled) {
          expect(false).customError('"Refresh" button is enabled');
        }
      });
    });
  });

  describe('Test Step ID: 440928', function() {

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    it('Should wait until loading icon disappears', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 360000)).toBeTruthy();

      // wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if "Weights" Report calculated', function() {
      PA3MainPage.isReportCalculated('Weights', true).then(function(found) {
        if (!found) {
          expect(false).customError('"Weights" Report not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if Calculation error displayed
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    it('Should wait until loading icon in Weights disappears', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 360000)).toBeTruthy();

      // wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if "Refresh" button is enabled', function() {
      CommonFunctions.isElementEnabled('Button', undefined, PA3MainPage.xpathRefreshBtn).then(function(isEnabled) {
        if (!isEnabled) {
          expect(false).customError('"Refresh" button is enabled');
        }
      });
    });

    it('Verifying if "Weights" Report calculated', function() {
      PA3MainPage.isReportCalculated('Weights', true).then(function(found) {
        if (!found) {
          expect(false).customError('"Weights" Report not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if Calculation error displayed
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
