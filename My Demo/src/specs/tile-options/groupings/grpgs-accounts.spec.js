'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: grpgs-accounts', function() {

  describe('Test Step ID: 551551', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:/default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

    it('Should click on "Economic Sector" hyperlink in the report', function() {
      // Verifying if the grouping link name is "Economic Sector"
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(hyperlink) {
        if (hyperlink !== 'Economic Sector') {
          expect(false).customError('Groupings link name is not "Economic Sector". Found: "' + hyperlink + '"');
          CommonFunctions.takeScreenShot();
        }
      });

      // Should click on "Economic Sector" hyperlink in the report
      PA3MainPage.getGroupingsHyperLink('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Tile Options" mode appeared', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (!option) {
          expect(false).customError('"Tile Options" mode is not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Groupings" tab is selected by default in LHP', function() {
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Groupings') {
          expect(false).customError('The view is not changed to "Groupings"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Clear All(X)" icon from the  selected section', function() {
      ThiefHelpers.getButtonClassReference('Clear All').press().then(function() {
      }, function(error) {
        expect(false).customError('Unable to click on "Clear All(X)" icon from the  selected section due to this error."' + error + '"');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying groupings are removed from selected section', function() {
      // Verifying groupings are removed
      var allElements = TileOptionsColumns.getAllElements('selected');
      allElements.count().then(function(count) {
        if (count !== 0) {
          expect(false).customError('Groupings are not removed from selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Double click on "Asset Type" from "FactSet" directory', function() {
      TileOptionsGroupings.getElementFromAvailableSection('FactSet', 'Asset Type').isPresent().then(function(option) {
        if (option) {
          browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('FactSet', 'Asset Type')).perform();
        } else {
          expect(false).customError('"Asset Type" is not present in "FactSet" directory');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Asset Type" is added to the "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Asset Type').isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('"Asset Type" is not added to the "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the OK button', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      // Verifying tile options mode ic closed
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "client:/pa3/test" in portfolio widget and select "CLIENT:/PA3/TEST.ACCT" from type ahead', function() {
      PA3MainPage.setPortfolio('client:/pa3/test', 'Client:/pa3/TEST.ACCT', 'Client:/pa3/TEST.ACCT').then(function(value) {
        if (!value) {
          expect(false).customError('"Client:/pa3/TEST.ACCT" is not found/selected from typeahead.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Portfolio widget is populated with "Client:/pa3/TEST.ACCT"', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathPortfolioWidget).getText().then(function(val) {
        if (val !== 'Client:/pa3/TEST.ACCT') {
          expect(false).customError('Portfolio widget is not populated with "Client:/pa3/TEST.ACCT". Found:"' + val + '"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Weights" report to calculate', function() {
      //Wating until weights reports caculated
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      //Verifying weights reports calculated
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors');
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

      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Grouping" hyperlink is "Asset Type"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(text) {
        if (text !== 'Asset Type') {
          expect(false).customError('"Asset Type" did not set to grouping hyperlink; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 551548', function() {

    it('Should type "spn" in the "Portfolio" widget text box and select "SPN_SP50_ACCT.ACCT|Client/new_pa_test_suite/pricing/" from the type ahead', function() {
      PA3MainPage.setPortfolio('spn', 'SPN_SP50_ACCT.ACCT | Client:/new_pa_test_suite/pricing/', 'Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT').then(function(option) {
        if (!option) {
          expect(false).customError('"SPN_SP50_ACCT.ACCT|Client/new_pa_test_suite/pricing/" is not selected from type ahead.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if Portfolio widget is populated with "Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT"', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathPortfolioWidget).getText().then(function(val) {
        if (val !== 'Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT') {
          expect(false).customError('Portfolio widget is not populated with "Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Weights" report to calculate', function() {
      //Wating until weights reports caculated
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      //Verifying weights reports calculated
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors');
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

      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Grouping" hyperlink is "Asset Type"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(text) {
        if (text !== 'Asset Type') {
          expect(false).customError('"Asset Type" did not set to grouping hyperlink; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on Portfolio Hamburger icon', function() {
      PA3MainPage.getHamburgerIcon('portfolio').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on Portfolio Hamburger icon');
        CommonFunctions.takeScreenShot();
      });
    });

    it('verifying if Portfolio Hamburger drop down is displayed', function() {
      ThiefHelpers.isDropDownOpen(1, true).then(function(status) {
        if (!status) {
          expect(false).customError('Portfolio Hamburger drop down is not displayed');
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

    it('Waiting for "Weights" report to calculate', function() {
      //Wating until weights reports caculated
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      //Verifying weights reports calculated
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors');
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

      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Grouping" hyperlink is "Asset Type"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(text) {
        if (text !== 'Asset Type') {
          expect(false).customError('"Asset Type" did not set to grouping hyperlink; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 551549', function() {

    it('Should click on the "Wrench" button on the application toolbar', function() {
      PA3MainPage.selectWrenchIcon();

      // Verifying if drop down menu appear.
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('Wrench dropdown is not present.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should deselect "Automatic Calculation" option', function() {
      PA3MainPage.setAutomaticCalculation(false).then(function(option) {
        if (!option) {
          expect(false).customError('"Automatic Calculation" is not unchecked.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Wrench" icon in the "Weights\'" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights', true).isPresent().then(function(bol) {
        if (!bol) {
          expect(false).customError('Wrench menu list is not appeared even after clicking on Wrench icon');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Options" from the menu list', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Checking if the 'Tile Options' mode has opened.
    it('Validating if "Tile Options" mode opened', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (!open) {
          expect(false).customError('"Tile Options" view is not opened.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on Groupings LHP item to select.
    it('Should click on Groupings LHP item to select', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Groupings' item is opened.
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Groupings') {
          expect(false).customError('"Groupings" is not selected from LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Restore Defaults" on the top right corner', function() {
      TileOptions.getRestoreDefaultsButton().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'OK');

    it('Verifying that "Restore Defaults" button is changed to "Defaults Applied"', function() {
      expect(TileOptions.getRestoreDefaultsButton().isPresent()).toBeFalsy();

      // Verifying that "Defaults Applied" is visible
      expect(TileOptions.getDefaultsApplied().isPresent()).toBeTruthy();
    });

    var arrayValues = ['Economic Sector - FactSet', 'Industry - FactSet'];
    arrayValues.forEach(function(ele) {
      it('Verifying that "' + ele + '" is present in the "Selected" section', function() {
        TileOptionsGroupings.getElementFromSelectedContainer(ele).isPresent().then(function(option) {
          if (!option) {
            expect(false).customError('"' + ele + '" is not displayed in the "Selected" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 551550', function() {

    // Clicking on the OK button to close Tile Options Mode
    it('Should click on the "OK" Button', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Verifying if mode is closed.
    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Refresh" icon from the application toolbar.', function() {
      PA3MainPage.getRefreshIcon().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Wait for report calculation to start
      browser.sleep(3000);
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 60000);

      // Verifying if Weights report is calculated
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Weights" report: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that data is grouped by "Economic Sector" and "Commercial Services" is present in the report', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(value) {
        if (value !== 'Economic Sector') {
          expect(false).customError('Data is not grouped by "Economic Sector".');
          CommonFunctions.takeScreenShot();
        }
      });

      // Checking if "Commercial Services" is present in the calculated report
      PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Commercial Services').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Commercial Services" is not present in the calculated report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "Commercial Services" and verify that "Advertising/Marketing Services" is displayed under it', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Commercial Services');

      // Verifying that "Commercial Services" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Commercial Services');

      // Verifying that "Advertising/Marketing Services" is present under "Commercial Services"
      PA3MainPage.getElementFromCalculatedTree('Weights', 'Commercial Services', 'Advertising/Marketing ' + 'Services').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Advertising/Marketing Services" is not present under "Commercial Services".');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 551552', function() {

    it('Type "SP_Custom" into the "Portfolio" widget box and select "Client:SP_CUSTOM.ACCT" from type ahead', function() {
      PA3MainPage.setPortfolio('SP_Custom', 'Client:SP_CUSTOM.ACCT', 'CLIENT:SP_CUSTOM.ACCT').then(function(value) {
        if (!value) {
          expect(false).customError('"Client:SP_CUSTOM.ACCT" is not found in typeahead.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Benchmark" widget displays "RUSSELL:1000"', function() {
      PA3MainPage.getWidgetBox('Benchmark').getAttribute('value').then(function(val) {
        if (val !== 'RUSSELL:1000') {
          expect(false).customError('"RUSSELL:1000" is not present in "Benchmark" widget.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Warning" icon is displayed next to "Weights" report tile', function() {
      PA3MainPage.getReportCachingAlertIcon('Weights').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Warning" icon is not displayed next to "Weights" report tile.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 551553', function() {

    it('Should click on the "Wrench" icon in the "Weights\'" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights', true).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('Wrench menu list is not appared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Options" from the menu list', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Checking if the 'Tile Options' mode has opened.
    it('Validating if "Tile Options" mode opened', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (!open) {
          expect(false).customError('"Tile Options" view is not opened.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on Groupings LHP item to select.
    it('Should click on Groupings LHP item to select', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Groupings' item is opened.
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Groupings') {
          expect(false).customError('"Groupings" is not selected from LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Currency" is present in the "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Currency').isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('"Currency" is not displayed in the "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 551554', function() {

    // Clicking on the OK button to close Tile Options Mode
    it('Should click on the "OK" Button', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Verifying if mode is closed.
    it('Should verify "Tile Options" mode is closed', function() {
      expect(TileOptions.isTileOptionsMode()).toBeFalsy();
    });

    it('Click on "Refresh" icon from the application toolbar.', function() {
      PA3MainPage.getRefreshIcon().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Wait for report calculation to start
      browser.sleep(3000);
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();

      // Wait for the Web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Weights" report appeared', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 60000);

      // Verifying if Weights report is calculated
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Weights" report: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that data is grouped by "Currency" and "U.S. Dollar" is present in the report', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(value) {
        if (value !== 'Currency') {
          expect(false).customError('Data is not grouped by "Currency". Expected "Currency" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });

      // Checking if "U.S. Dollar" is present in the calculated report
      PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'U.S. Dollar').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"U.S. Dollar" is not present in the calculated report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 551569', function() {

    it('Should click on the "Wrench" icon in the "Weights\'" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights', true).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('Wrench menu list is not appared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Options" from the menu list', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Checking if the 'Tile Options' mode has opened.
    it('Validating if "Tile Options" mode opened', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (!open) {
          expect(false).customError('"Tile Options" view is not opened.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on Groupings LHP item to select.
    it('Should click on Groupings LHP item to select', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Groupings' item is opened.
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Groupings') {
          expect(false).customError('"Groupings" is not selected from LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Double click on "Asset Type" from "FactSet" in "Available" section', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('FactSet', 'Asset Type')).perform();
    });

    it('Verifying that "Asset Type" is added to the "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Asset Type').isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('"Asset Type" is not added to the "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Asset Type" from "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Asset Type').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Asset Type" is selected
      expect(TileOptionsGroupings.getElementFromSelectedContainer('Asset Type').getAttribute('class')).toContain('selected');
      TileOptionsGroupings.getElementFromSelectedContainer('Asset Type').getAttribute('class').then(function(val) {
        if (val.indexOf('selected') < 0) {
          expect(false).customError('"Asset Type" is not selected even after clicking on it.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "UP" arrow button to place "Asset Type" above "Currency"', function() {
      TileOptionsGroupings.getArrowButton('Up').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Asset Type" is on top of "Currency"
      TileOptionsGroupings.getIndexFromSelected('Asset Type').then(function(indexValue) {
        expect(TileOptionsGroupings.getIndexFromSelected('Currency')).toEqual(indexValue + 1);
      });
    });
  });

  describe('Test Step ID: 551570', function() {

    // Clicking on the OK button to close Tile Options Mode
    it('Should click on the "OK" Button', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Verifying if mode is closed.
    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Refresh" icon from the application toolbar.', function() {
      PA3MainPage.getRefreshIcon().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Wait for report calculation to start
      browser.sleep(3000);
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 60000);

      // Verifying if Weights report is calculated
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that data is grouped by "Asset Type" and "Equity Common" is present in the report', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(value) {
        if (value !== 'Asset Type') {
          expect(false).customError('Data is not grouped by "Asset Type". Expected "Asset Type" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });

      var eleRef = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Equity Common');

      //Adding waitUntilElementAppears() to wait until "Equity Common" appears
      CommonFunctions.waitUntilElementAppears(eleRef, 6000);

      // Checking if "Equity Common" is present in the calculated report
      eleRef.isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Equity Common" is not present in the calculated report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "Equity Common" and verify that "U.S. Dollar" is displayed under it', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Equity Common');

      // Verifying that "Equity Common" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Equity Common');

      // Verifying that "U.S. Dollar" is present under "Equity Common"
      PA3MainPage.getElementFromCalculatedTree('Weights', 'Equity Common', 'U.S. Dollar').isPresent().then(function(value) {
        expect(value).customError('"U.S. Dollar" is not displayed under "Equity Common"');
        if (!value) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.getElementFromCalculatedTree('Weights', 'Equity Common', 'U.S. Dollar').isPresent()).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 551555', function() {

    it('Should enter "CLIENT:/PA3/ACCOUNTS/FIXED_INCOME_ACCOUNT.ACCT" into the "Portfolio" widget', function() {
      PA3MainPage.getWidgetBox('Portfolio').clear();

      // Enter "CLIENT:/PA3/ACCOUNTS/FIXED_INCOME_ACCOUNT.ACCT" into the "Portfolio" widget
      PA3MainPage.getWidgetBox('Portfolio').sendKeys('CLIENT:/PA3/ACCOUNTS/FIXED_INCOME_ACCOUNT.ACCT', protractor.Key.ENTER);

      // Verifying that "CLIENT:/PA3/ACCOUNTS/FIXED_INCOME_ACCOUNT.ACCT" is entered
      PA3MainPage.getWidgetBox('Portfolio').getAttribute('value').then(function(val) {
        if (val !== 'CLIENT:/PA3/ACCOUNTS/FIXED_INCOME_ACCOUNT.ACCT') {
          expect(false).customError('"CLIENT:/PA3/ACCOUNTS/FIXED_INCOME_ACCOUNT.ACCT" is not present in ' + '"Portfolio" widget. Found: "' + val + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Benchmark" widget displays "RUSSELL:1000"', function() {
      PA3MainPage.getWidgetBox('Benchmark').getAttribute('value').then(function(val) {
        if (val !== 'RUSSELL:1000') {
          expect(false).customError('"RUSSELL:1000" is not present in "Benchmark" widget. Found: "' + val + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Refresh" icon from the application toolbar.', function() {
      PA3MainPage.getRefreshIcon().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Wait for report calculation to start
      browser.sleep(3000);
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 240000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 60000);

      // Verifying if Weights report is calculated
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that data is grouped by "Asset Type"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(value) {
        if (value !== 'Asset Type') {
          expect(false).customError('Data is not grouped by "Asset Type". Expected "Asset Type" but ' + 'Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 551556', function() {

    it('Should click on the "Wrench" icon in the "Weights\'" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights', true).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('Wrench menu list is not appared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Options" from the menu list', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Checking if the 'Tile Options' mode has opened.
    it('Validating if "Tile Options" mode opened', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (!open) {
          expect(false).customError('"Tile Options" view is not opened.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on Groupings LHP item to select.
    it('Should click on Groupings LHP item to select', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Groupings' item is opened.
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Groupings') {
          expect(false).customError('"Groupings" is not selected from LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Restore Defaults" button', function() {
      TileOptions.getRestoreDefaultsButton().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'OK', 'Do you want to replace your current settings with the account defaults?');

    // As per the known issue(RPD:32753941) "Restore Defaults" button is not changing to "Defaults Applied"
    it('Verifying that "Restore Defaults" button is changed to "Defaults Applied"', function() {
      TileOptions.getRestoreDefaultsButton().isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Restore Defaults" button should be displayed as per Known Issue(RPD:32753941)');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying that "Defaults Applied" is visible
      TileOptions.getDefaultsApplied().isPresent().then(function(flag) {
        if (flag) {
          expect(false).customError('"Defaults Applied" button should not be displayed as per Known Issue(RPD:32753941)');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Selected" section now displays only "Issuer Name"', function() {
      expect(TileOptionsGroupings.getAllElements('Selected').count()).toEqual(1);

      TileOptionsGroupings.getElementFromSelectedContainer('Issuer Name').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Issuer Name" is not present in the Selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 551557', function() {

    // Clicking on the OK button to close Tile Options Mode
    it('Should click on the "OK" Button', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Verifying if mode is closed.
    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Refresh" icon from the application toolbar.', function() {
      PA3MainPage.getRefreshIcon().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Wait for report calculation to start
      browser.sleep(3000);
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 60000);

      // Verifying if Weights report is calculated
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        }
      });
    });

    it('Verifying that data is grouped by "Issuer Name"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(text) {
        if (text !== 'Issuer Name') {
          expect(false).customError('Data is not grouped by "Issuer Name". Found:"' + text + '" ');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 558457', function() {

    it('Type "RISK_ACCT_TEST" into the "Portfolio" widget box and select "Risk_Univ_Acct1" from type ahead', function() {
      PA3MainPage.setPortfolio('RISK_ACCT_TEST', 'Client:RISK_ACCT_TEST.ACCT', 'CLIENT:RISK_ACCT_TEST.ACCT').then(function(flag) {
        if (!flag) {
          expect(false).customError('Unable to select "CLIENT:RISK_ACCT_TEST.ACCT" from type ahead');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Click on "Refresh" icon from the application toolbar.', function() {
      PA3MainPage.getRefreshIcon().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Wait for report calculation to start
      browser.sleep(3000);
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 60000);

      // Verifying if Weights report is calculated
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        }
      });
    });

    it('Should click on the "Wrench" icon in the "Weights\'" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      expect(PA3MainPage.getWrenchIconFromReportWorkspace('Weights', true).isPresent()).toBeTruthy();
    });

    it('Select "Options" from the menu list', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Checking if the 'Tile Options' mode has opened.
    it('Validating if "Tile Options" mode opened', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (!open) {
          expect(false).customError('"Tile Options" view is not opened.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on Groupings LHP item to select.
    it('Should click on Groupings LHP item to select', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Groupings' item is opened.
      expect(TileOptions.getOptionTitle().getText()).toEqual('Groupings');
    });

    it('Should hover over "Country of Domicile - FactSet" and click on "X" icon', function() {
      /*TileOptionsGroupings.getRemoveButtonOfElementInSelectedSection('Country of Domicile - FactSet').click().then(function() {
       }, function(err) {
       expect(false).customError(err);
       CommonFunctions.takeScreenShot();
       });*/
      TileOptionsGroupings.getElementFromSelectedContainer('Country of Domicile - FactSet').isPresent().then(function(option) {
        if (option) {
          expect(option).customError('"Country of Domicile - FactSet" column is present in the selected container.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'Index out of bound') {
          expect(true).toBeTruthy();
        }
      });
    });

    // Clicking on the OK button to close Tile Options Mode
    it('Should click on the "OK" Button', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Verifying if mode is closed.
    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Refresh" icon from the application toolbar.', function() {
      PA3MainPage.getRefreshIcon().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Wait for report calculation to start
      browser.sleep(3000);
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 60000);

      // Verifying if Weights report is calculated
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        }
      });

      // Wait for the web element to load
      browser.sleep(3000);
    });

    // Until the Known issue RPD:32803862 gets fixed, Expand [Unassigned] grouping
    it('Expand "[Unassigned]" from the calculated report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', '[Unassigned]');

      // Verifying if "[Unassigned]" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', '[Unassigned]');
    });

    // Until the Known issue RPD:32803862 gets fixed, Verify Securities are displayed below [Unassigned]
    it('Verify that no securities are displayed under "[Unassigned]"', function() {
      expect(PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 2).count()).not.toEqual(0);
    });
  });

  describe('Test Step ID: 558458', function() {

    it('Should click on the "Wrench" icon in the "Weights\'" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      expect(PA3MainPage.getWrenchIconFromReportWorkspace('Weights', true).isPresent()).toBeTruthy();
    });

    it('Select "Options" from the menu list', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click();
    });

    // Checking if the 'Tile Options' mode has opened.
    it('Validating if "Tile Options" mode opened', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (!open) {
          expect(false).customError('"Tile Options" view is not opened.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on Groupings LHP item to select.
    it('Should click on Groupings LHP item to select', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Groupings' item is opened.
      expect(TileOptions.getOptionTitle().getText()).toEqual('Groupings');
    });

    it('Should click on "Restore Defaults" button', function() {
      TileOptions.getRestoreDefaultsButton().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'OK', 'Do you want to replace your current settings with the account defaults?');

    it('Verifying that "Restore Defaults" button is changed to "Defaults Applied"', function() {
      expect(TileOptions.getRestoreDefaultsButton().isPresent()).toBeFalsy();

      // Verifying that "Defaults Applied" is visible
      expect(TileOptions.getDefaultsApplied().isPresent()).toBeTruthy();
    });

    var arrListItems = ['Economic Sector - FactSet', 'Industry - FactSet', 'Country of Domicile - FactSet'];

    it('Verifying that "Selected" section now displays "Economic Sector - FactSet", "Industry - FactSet", "Country of ' + 'Domicile - FactSet"', function() {
      // Verifying if there are only 3 groupings in the selected section.
      expect(TileOptionsGroupings.getAllElements('Selected').count()).toEqual(3);

      // Verifying if each grouping is present in the selected section or not
      arrListItems.forEach(function(element) {
        TileOptionsGroupings.getElementFromSelectedContainer(element).isPresent().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + element + '" is not present in the Selected section.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 558459', function() {

    // Clicking on the OK button to close Tile Options Mode
    it('Should click on the "OK" Button', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Verifying if mode is closed.
    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
