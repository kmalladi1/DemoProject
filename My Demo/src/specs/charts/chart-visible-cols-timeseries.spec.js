'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: chart-visible-cols-timeseries', function() {
  // Getting the xpath of the Selected section for columns
  var xpathOfColumnsSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Available section for columns
  var xpathOfColumnsAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Available');

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Selected');

  describe('Test Step ID: 559624', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with document client:/default_doc_auto.', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });

    it('Wait for weights report to finish calculation', function() {
      //Waiting for report to finish calculation
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating report.');
          CommonFunctions.takeScreenShot();
        }
      });
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

      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Attribution" from the LHP', function() {
      PA3MainPage.getReports('Attribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Attribution" report to finish calculation', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Attribution" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Verifying if "Portfolio" is set to "CLIENT:/PA3/TEST.ACCT"', function() {
      PA3MainPage.getWidgetBox('Portfolio').getAttribute('value').then(function(path) {
        if (path !== 'CLIENT:/PA3/TEST.ACCT') {
          expect(false).customError('"Portfolio" is not set to "CLIENT:/PA3/TEST.ACCT". Expected: "CLIENT:/PA3/TEST.ACCT" ' +
            'but Found: "' + path + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Benchmark" is set to "RUSSELL:1000"', function() {
      PA3MainPage.getWidgetBox('Benchmark').getAttribute('value').then(function(benchmark) {
        if (benchmark !== 'RUSSELL:1000') {
          expect(false).customError('"Benchmark" is not set to "RUSSELL:1000". Expected: "RUSSELL:1000" but ' +
            'Found: "' + benchmark + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 559625', function() {

    it('Should click on the "Wrench" icon in the "Attribution" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Attribution" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Attribution') {
          expect(false).customError('"Tile Options - Attribution" view has not appeared. ' +
            'Expected: "Tile Options - Attribution" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Dates" is selected from LHP by default', function() {
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Dates') {
          expect(false).customError('"Dates" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Monthly" from "Report Frequency" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Monthly', 'Report Frequency:');
    });

    it('Should select "Columns" from LHP in "Tile Options - Attribution" view', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrOfGroups = ['Portfolio Name', 'Benchmark Name', 'Attribution Analysis'];

    arrOfGroups.forEach(function(groupName) {
      it('Should click on the "X" icon next to "' + groupName + '" from "Selected" section', function() {
        var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfColumnsSelectedSection).getGroupByText(groupName);
        return group.getActions().then(function(actions) {
          return actions.triggerAction('remove');
        });
      });
    });

    it('Should click on "OK" button from "Tile Options - Attribution" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Attribution" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - Attribution" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Attribution" report to finish calculation', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Attribution" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should click on Chart icon available in the "Attribution" report Workspace', function() {
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Attribution').click().then(function() {
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

    it('Should select "Variation Comparison" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Variation Comparison').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that loading swirl is not displayed', function() {
      browser.sleep(4000);

      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verifying if calculated data for "Variation Comparison" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Variation Comparison').then(function(displayed) {
        expect(displayed).customError('"Variation Comparison" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Variation Comparison')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Variation Comparison" chart: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });
  });

  describe('Test Step ID: 559626', function() {

    it('Should click on the "Wrench" icon in the "Variation Comparison" chart ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Variation Comparison').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from report workspace.');
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

    it('Verifying if view changed to "Tile Options - Variation Comparison" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Variation Comparison') {
          expect(false).customError('"Tile Options - Variation Comparison" view has not appeared. ' +
            'Expected: "Tile Options - Variation Comparison" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP in "Tile Options - Variation Comparison" view', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "PE" into the search field of "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('PE');

      // Verifying that "PE" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== 'PE') {
          expect(false).customError('"PE" is not present in search field of "Available" section');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the Search Result to appear
      browser.sleep(4000);
    });

    it('Should double click on "Price to Earnings" from search result', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfColumnsAvailableSection).getGroupByText('FactSet');

      group.getItemByText('Price to Earnings').then(function(item) {
        item.select();
        item.doubleClick();
      });
    });

    it('Verifying if "Price to Earnings" is added to "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Price to Earnings').isPresent().then(function(present) {
        if (!present) {
          expect(false).then('"Price to Earnings" is not added to "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options - Variation Comparison" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Variation Comparison" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - Variation Comparison" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if loading swirl is displayed', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Variation Comparison" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Variation Comparison').then(function(displayed) {
        expect(displayed).customError('"Variation Comparison" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Variation Comparison')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Variation Comparison" chart: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });
  });

  describe('Test Step ID: 559627', function() {

    it('Should click on the "Grid" icon in "Variation Comparison" chart', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Variation Comparison').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Chart has changed" dialog box appears', function() {
      ThiefHelpers.isDialogOpen('Chart has changed');

    });

    it('Should click on "Discard Changes" button of "Chart has changed" dialog', function() {
      ThiefHelpers.getDialogButton('Chart has changed', 'Discard Changes').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that loading swirl is not displayed', function() {
      browser.sleep(4000);

      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Attribution" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });

  });

  describe('Test Step ID: 559628', function() {

    it('Should click on the "Wrench" icon in the "Attribution" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Attribution" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Attribution') {
          expect(false).customError('"Tile Options - Attribution" view has not appeared. ' +
            'Expected: "Tile Options - Attribution" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP in "Tile Options - Attribution" view', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "X" icon next to "Price to Earnings" from "Selected" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfColumnsSelectedSection).getGroupByText('Variation');
      group.getItemByText('Price to Earnings').then(function(item) {
        return item.getActions().then(function(actions) {
          return actions.triggerAction('remove');
        });
      });
    });

    it('Should click on "OK" button from "Tile Options - Attribution" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Attribution" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - Attribution" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Attribution" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Attribution'), 180000);

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Attribution" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should click on Chart icon available in the "Attribution" report Workspace', function() {
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Attribution').click().then(function() {
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

    it('Should select "Variation Comparison" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Variation Comparison').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that loading swirl is not displayed', function() {
      browser.sleep(4000);

      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verifying if calculated data for "Variation Comparison" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Variation Comparison').then(function(displayed) {
        expect(displayed).customError('"Variation Comparison" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Variation Comparison')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Variation Comparison" chart: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });
  });

  describe('Test Step ID: 559629', function() {

    it('Click on "Economic Sector" hyperlink in "Variation Comparison" chart', function() {
      // Verifying that Hyperlink name is "Economic Sector"
      PA3MainPage.getGroupingsHyperLink('Variation Comparison').getText().then(function(text) {
        if (text.indexOf('Economic Sector') > -1) {
          // Click on the "Economic Sector" Hyperlink
          PA3MainPage.getGroupingsHyperLink('Variation Comparison').click();
        }
      });

    });

    it('Verifying if view changed to "Tile Options - Variation Comparison" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Variation Comparison') {
          expect(false).customError('"Tile Options - Variation Comparison" view has not appeared. ' +
            'Expected: "Tile Options - Variation Comparison" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Groupings" is selected from LHP by default', function() {
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Groupings') {
          expect(false).customError('"Groupings" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Double click on "Currency" to add it to "Selected" section', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('FactSet', 'Currency'))
        .perform();
    });

    it('Verifying that "Currency" is added to the "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Currency').isPresent().then(function(added) {
        if (!added) {
          expect(false).customError('"Currency" is not added to the "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options - Variation Comparison" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Variation Comparison" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - Variation Comparison" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if loading swirl is displayed', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Variation Comparison" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Variation Comparison').then(function(displayed) {
        expect(displayed).customError('"Variation Comparison" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Variation Comparison')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Variation Comparison" chart: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 559630', function() {

    it('Should click on the "Grid" icon in "Variation Comparison" chart', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Variation Comparison').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that loading swirl is not displayed', function() {
      browser.sleep(4000);

      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Attribution" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });
  });

  describe('Test Step ID: 559631', function() {

    it('Should click on Chart icon available in the "Attribution" report Workspace', function() {
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Attribution').click().then(function() {
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

    it('Should select "Variation Comparison" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Variation Comparison').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Variation Comparison" chart to finish calculation', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Variation Comparison" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Variation Comparison').then(function(displayed) {
        expect(displayed).customError('"Variation Comparison" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Variation Comparison')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Variation Comparison" chart: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Click on "Excluded: Finance" hyperlink in the "Variation Comparison" chart', function() {
      // Verifying that Hyperlink name is "Excluded: Finance"
      PA3MainPage.getExclusionsHyperLink('Variation Comparison').getText().then(function(text) {
        if (text.indexOf('Excluded: Finance') > -1) {
          // Click on the "Excluded: Finance" Hyperlink
          PA3MainPage.getExclusionsHyperLink('Variation Comparison').click();
        }
      });

    });

    it('Click on "Edit Exclusions" hyperlink from the excluded window', function() {
      PA3MainPage.getEditExclusionsHyperlinkFromInfoBox('Variation Comparison').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Variation Comparison" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Variation Comparison') {
          expect(false).customError('"Tile Options - Variation Comparison" view has not appeared. ' +
            'Expected: "Tile Options - Variation Comparison" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Exclusions" is selected from LHP by default', function() {
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Exclusions') {
          expect(false).customError('"Exclusions" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000))
        .toBeTruthy();
    });

    it('Should click on "X" button next "Finance" under "Economic Sector > Industry" from "Selected" section to delete it',
      function() {
        var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Economic Sector > Industry');

        group.isExpanded().then(function(expanded) {
          if (expanded) {
            group.getItemByText('Finance').then(function(item) {
              return item.getActions().then(function(actions) {
                return actions.triggerAction('remove');
              });
            });
          } else {
            expect(false).customError('"Economic Sector > Industry" is not expanded in the "Selected" section.');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    it('Should click on "OK" button from "Tile Options - Variation Comparison" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Variation Comparison" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - Variation Comparison" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if loading swirl is displayed', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Variation Comparison" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Variation Comparison').then(function(displayed) {
        expect(displayed).customError('"Variation Comparison" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Variation Comparison')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Variation Comparison" chart: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 559632', function() {

    it('Should click on the "Grid" icon in "Variation Comparison" chart', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Variation Comparison').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that loading swirl is not displayed', function() {
      browser.sleep(4000);

      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Attribution" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });
  });

  describe('Test Step ID: 559633', function() {

    it('Should click on Chart icon available in the "Attribution" report Workspace', function() {
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Attribution').click().then(function() {
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

    it('Should select "Variation Comparison" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Variation Comparison').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Variation Comparison" chart to finish calculation', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Variation Comparison" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Variation Comparison').then(function(displayed) {
        expect(displayed).customError('"Variation Comparison" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Variation Comparison')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Variation Comparison" chart: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should click on "wrench" icon in the report', function() {
      PA3MainPage.selectWrenchIcon('Variation Comparison');
    });

    it('Verifying if the "wrench" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Wrench" drop down did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Tile Options View mode is appeared', function() {
      TileOptions.isTileOptionsMode().then(function(found) {
        if (!found) {
          expect(false).customError('Error: "Tile Options" view mode is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Start Date" drop down', function() {
      TileOptionsDates.getDateDropDown('Start Date').click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });
    });

    it('Should select "One Month Ago" from options', function() {
      TileOptionsDates.getOptionFromDateDropDown('One Month Ago').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verify if "One Month Ago" is selected in Start Date Field
      ThiefHelpers.getTextBoxClassReference('Start Date:').getText().then(function(text) {
        if (text !== 'One Month Ago') {
          expect(false).customError('"Start Date" drop down is not set to "One Month Ago". Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "End Date" drop down in the "Dates" view', function() {
      TileOptionsDates.getDateDropDown('End Date').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "One Week Ago" option from drop down', function() {
      TileOptionsDates.getOptionFromDateDropDown('One Week Ago').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verify if 'One Week Ago' is selected
      TileOptionsDates.getDateField('End Date').getAttribute('value').then(function(value) {
        if (value !== 'One Week Ago') {
          expect(false).customError('"One Week Ago" option is not selected from drop down.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options - Variation Comparison" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Variation Comparison" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - Variation Comparison" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if loading swirl is displayed', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Variation Comparison" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Variation Comparison').then(function(displayed) {
        expect(displayed).customError('"Variation Comparison" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Variation Comparison')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Variation Comparison" chart: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 559634', function() {

    it('Should click on the "Grid" icon in "Variation Comparison" chart', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Variation Comparison').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that loading swirl is not displayed', function() {
      browser.sleep(4000);

      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Attribution" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });
  });

  describe('Test Step ID: 559635', function() {

    it('Should click on the "Wrench" icon in the "Attribution" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Attribution" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Attribution') {
          expect(false).customError('"Tile Options - Attribution" view has not appeared. ' +
            'Expected: "Tile Options - Attribution" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP in "Tile Options - Attribution" view', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "mpt" into the search field of "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('mpt');

      // Verifying that "mpt" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== 'mpt') {
          expect(false).customError('"mpt" is not present in search field of "Available" section');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the Search Result to appear
      browser.sleep(4000);
    });

    it('Should double click on "Port. MPT Volatility" from search result', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfColumnsAvailableSection).getGroupByText('FactSet');

      group.getItemByText('Port. MPT Volatility').then(function(item) {
        item.select();
        item.doubleClick();
      });
    });

    it('Verifying if "Port. MPT Volatility" is added to "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Port. MPT Volatility').isPresent().then(function(present) {
        if (!present) {
          expect(false).then('"Port. MPT Volatility" is not added to "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options - Attribution" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Attribution" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - Attribution" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Attribution" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Attribution'), 180000);

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Attribution" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should click on Chart icon available in the "Attribution" report Workspace', function() {
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Attribution').click().then(function() {
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

    it('Should select "Variation Comparison" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Variation Comparison').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that loading swirl is not displayed', function() {
      browser.sleep(4000);

      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verifying if calculated data for "Variation Comparison" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Variation Comparison').then(function(displayed) {
        expect(displayed).customError('"Variation Comparison" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Variation Comparison')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Variation Comparison" chart: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });
  });

  describe('Test Step ID: 559636', function() {

    it('Should click on the "Wrench" icon in the "Variation Comparison" chart ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Variation Comparison').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from report workspace.');
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

    it('Verifying if view changed to "Tile Options - Variation Comparison" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Variation Comparison') {
          expect(false).customError('"Tile Options - Variation Comparison" view has not appeared. ' +
            'Expected: "Tile Options - Variation Comparison" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP in "Tile Options - Variation Comparison" view', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "PE" into the search field of "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('PE');

      // Verifying that "PE" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== 'PE') {
          expect(false).customError('"PE" is not present in search field of "Available" section');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the Search Result to appear
      browser.sleep(4000);
    });

    it('Should double click on "Price to Earnings" from search result', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfColumnsAvailableSection).getGroupByText('FactSet');

      group.getItemByText('Price to Earnings').then(function(item) {
        item.select();
        item.doubleClick();
      });
    });

    it('Verifying if "Price to Earnings" is added to "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Price to Earnings').isPresent().then(function(present) {
        if (!present) {
          expect(false).then('"Price to Earnings" is not added to "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options - Variation Comparison" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Variation Comparison" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - Variation Comparison" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if loading swirl is displayed', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Variation Comparison" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Variation Comparison').then(function(displayed) {
        expect(displayed).customError('"Variation Comparison" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Variation Comparison')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Variation Comparison" chart: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });
  });

  describe('Test Step ID: 559637', function() {

    it('Should click on the "Grid" icon in "Variation Comparison" chart', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Variation Comparison').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Chart has changed" dialog box appears', function() {
      ThiefHelpers.isDialogOpen('Chart has changed');

    });

    it('Should click on "Discard Changes" button of "Chart has changed" dialog', function() {
      ThiefHelpers.getDialogButton('Chart has changed', 'Discard Changes').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that loading swirl is not displayed', function() {
      browser.sleep(4000);

      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Attribution" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });
  });

  describe('Test Step ID: 559638', function() {

    it('Should click on the "Wrench" icon in the "Attribution" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Attribution" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Attribution') {
          expect(false).customError('"Tile Options - Attribution" view has not appeared. ' +
            'Expected: "Tile Options - Attribution" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP in "Tile Options - Attribution" view', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "X" icon next to "Price to Earnings" column from "Selected" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfColumnsSelectedSection).getGroupByText('Variation');
      group.getItemByText('Price to Earnings').then(function(item) {
        return item.getActions().then(function(actions) {
          return actions.triggerAction('remove');
        });
      });
    });

    it('Should click on "OK" button from "Tile Options - Attribution" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Attribution" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - Attribution" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Attribution" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Attribution'), 180000);

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Attribution" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should click on Chart icon available in the "Attribution" report Workspace', function() {
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Attribution').click().then(function() {
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

    it('Should select "Variation Comparison" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Variation Comparison').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that loading swirl is not displayed', function() {
      browser.sleep(4000);

      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verifying if calculated data for "Variation Comparison" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Variation Comparison').then(function(displayed) {
        expect(displayed).customError('"Variation Comparison" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Variation Comparison')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Variation Comparison" chart: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });
  });

  describe('Test Step ID: 559639', function() {

    it('Click on "Economic Sector" hyperlink in "Variation Comparison" chart', function() {
      // Verifying that Hyperlink name is "Economic Sector"
      PA3MainPage.getGroupingsHyperLink('Variation Comparison').getText().then(function(text) {
        if (text.indexOf('Economic Sector') > -1) {
          // Click on the "Economic Sector" Hyperlink
          PA3MainPage.getGroupingsHyperLink('Variation Comparison').click();
        }
      });

    });

    it('Verifying if view changed to "Tile Options - Variation Comparison" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Variation Comparison') {
          expect(false).customError('"Tile Options - Variation Comparison" view has not appeared. ' +
            'Expected: "Tile Options - Variation Comparison" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Groupings" is selected from LHP by default', function() {
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Groupings') {
          expect(false).customError('"Groupings" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should on the "X" icon next to "Currency" from "Selected" section', function() {
      TileOptionsGroupings.getRemoveButtonOfElementInSelectedSection('Currency').click()
        .then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Should click on "OK" button from "Tile Options - Variation Comparison" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Variation Comparison" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - Variation Comparison" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if loading swirl is displayed', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Variation Comparison" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Variation Comparison').then(function(displayed) {
        expect(displayed).customError('"Variation Comparison" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Variation Comparison')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Variation Comparison" chart: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 559640', function() {

    it('Should click on the "Grid" icon in "Variation Comparison" chart', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Variation Comparison').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that loading swirl is not displayed', function() {
      browser.sleep(4000);

      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Attribution" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });
  });

  describe('Test Step ID: 559641', function() {

    it('Should click on Chart icon available in the "Attribution" report Workspace', function() {
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Attribution').click().then(function() {
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

    it('Should select "Variation Comparison" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Variation Comparison').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Variation Comparison" chart to finish calculation', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Variation Comparison" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Variation Comparison').then(function(displayed) {
        expect(displayed).customError('"Variation Comparison" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Variation Comparison')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Variation Comparison" chart: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should click on the "Wrench" icon in the "Variation Comparison" chart ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Variation Comparison').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from report workspace.');
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

    it('Verifying if view changed to "Tile Options - Variation Comparison" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Variation Comparison') {
          expect(false).customError('"Tile Options - Variation Comparison" view has not appeared. ' +
            'Expected: "Tile Options - Variation Comparison" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Exclusions" from LHP in "Tile Options - Variation Comparison" view', function() {
      TileOptions.getLHPOption('Exclusions').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Exclusions"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Exclusions') {
          expect(false).customError('"Exclusions" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000))
        .toBeTruthy();
    });

    it('Double click on "Finance" from "Available section"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Finance');
      group.select();
      group.doubleClick();
    });

    var arrItems = [];
    it('Verify if "Finance" is added to the "Selected" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Economic Sector');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getChildrenText().then(function(arrObject) {
            arrObject.forEach(function(element) {
              arrItems.push(element.text);
            });
            if (arrItems.indexOf('Finance') === -1) {
              expect(false).customError('"Finance" is not added to the "Selected" section.');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Economic Sector" is not expanded in "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should click on "OK" button from "Tile Options - Variation Comparison" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Variation Comparison" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - Variation Comparison" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if loading swirl is displayed', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Variation Comparison" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Variation Comparison').then(function(displayed) {
        expect(displayed).customError('"Variation Comparison" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Variation Comparison')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Variation Comparison" chart: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 559642', function() {

    it('Should click on the "Grid" icon in "Variation Comparison" chart', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Variation Comparison').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that loading swirl is not displayed', function() {
      browser.sleep(4000);

      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Attribution" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });
  });

  describe('Test Step ID: 559643', function() {

    it('Should click on Chart icon available in the "Attribution" report Workspace', function() {
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Attribution').click().then(function() {
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

    it('Should select "Variation Comparison" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Variation Comparison').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Variation Comparison" chart to finish calculation', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Variation Comparison" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Variation Comparison').then(function(displayed) {
        expect(displayed).customError('"Variation Comparison" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Variation Comparison')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Variation Comparison" chart: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should click on the "Wrench" icon in the "Port. Weight" chart ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Variation Comparison').click().then(function() {
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

    it('Verifying if Tile Options View mode is appeared', function() {
      TileOptions.isTileOptionsMode().then(function(found) {
        if (!found) {
          expect(false).customError('Error: "Tile Options" view mode is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "End Date" drop down', function() {
      TileOptionsDates.getDateDropDown('End Date').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Previous Close" option from drop down', function() {
      TileOptionsDates.getOptionFromDateDropDown('Previous Close').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verify if 'Previous Close' is selected
      TileOptionsDates.getDateField('End Date').getAttribute('value').then(function(value) {
        if (value !== 'Previous Close') {
          expect(false).customError('"Previous Close" option is not selected from drop down.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options - Variation Comparison" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Variation Comparison" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - Variation Comparison" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if loading swirl is displayed', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Variation Comparison" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Variation Comparison').then(function(displayed) {
        expect(displayed).customError('"Variation Comparison" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Variation Comparison')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Variation Comparison" chart: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 559644', function() {

    it('Should click on the "Grid" icon in "Variation Comparison" chart', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Variation Comparison').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that loading swirl is not displayed', function() {
      browser.sleep(4000);

      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Attribution" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });
  });

  describe('Test Step ID: 560570', function() {

    it('Should click on Chart icon available in the "Attribution" report Workspace', function() {
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Attribution').click();
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "chart" icon from report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Variation: Weight vs. Contribution" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Variation: Weight vs. Contribution').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if loading swirl is displayed', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Variation: Weight vs. Contribution" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Variation: Weight vs. Contribution').then(function(displayed) {
        expect(displayed).customError('"Variation: Weight vs. Contribution" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Variation: Weight vs. Contribution')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Variation: Weight vs. Contribution" chart: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if scattered chart is displayed for "Variation: Weight vs. Contribution" column', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 0).then(function(styleName) {
        if (styleName !== 'Marker') {
          expect(false).customError('Bar chart is not displayed for "Variation: Weight vs. Contribution" column. ' +
            'Expected: "Marker" but Found: "' + styleName + '"');
          CommonFunctions.takeScreenShot();
        }
      });

    });

  });

  describe('Test Step ID: 560571', function() {

    it('Should click on the "Grid" icon in "Variation: Weight vs. Contribution" chart', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Variation: Weight vs. Contribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that loading swirl is not displayed', function() {
      browser.sleep(4000);

      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Attribution" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

    });
  });
});
