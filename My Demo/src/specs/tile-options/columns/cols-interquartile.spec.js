'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: cols-interquartile', function() {

  // Variables
  var totalValue1; var totalValue2; var totalValue3; var totalValue4;

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  describe('Test Step ID: 558416', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:default_doc_OLD"', function() {
      PA3MainPage.switchToDocument('default-doc-old');
    });

  });

  describe('Test Step ID: 558410', function() {

    it('Should enter "Client:/new_pa_test_suite/risk/SP500.ACCT" in the "Portfolio" widget ', function() {
      PA3MainPage.getWidgetBox('Portfolio').clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Enter "Client:/new_pa_test_suite/risk/SP500.ACCT" into the "Portfolio" widget
      PA3MainPage.getWidgetBox('Portfolio').sendKeys('Client:/new_pa_test_suite/risk/SP500.ACCT', protractor.Key.ENTER).then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Wait for "Portfolio" to be taken up
      browser.sleep(3000);
    });

    it('Verifying if "Portfolio" is set to "CLIENT:/NEW_PA_TEST_SUITE/RISK/SP500.ACCT" ', function() {
      var portfolio = PA3MainPage.getWidgetBox('Portfolio').getAttribute('value');
      expect(portfolio).toEqual('CLIENT:/NEW_PA_TEST_SUITE/RISK/SP500.ACCT');
    });

    it('Enter "Russell:1000" in the "Benchmark" widget', function() {
      PA3MainPage.getWidgetBox('Benchmark').clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Enter "Russell:1000" into the "Benchmark" widget
      PA3MainPage.getWidgetBox('Benchmark').sendKeys('Russell:1000', protractor.Key.ENTER);

      // Wait for "Benchmark" to be taken up
      browser.sleep(3000);
    });

    it('Verifying if "Benchmark" is set to "Russell:1000" ', function() {
      var benchmark = PA3MainPage.getWidgetBox('Benchmark').getAttribute('value');
      expect(benchmark).toEqual('RUSSELL:1000');
    });

    it('Verifying if "Weights" Report starts calculating', function() {
      expect(PA3MainPage.getReportCalculationDlg('Weights')).toBeTruthy();
    });

    it('Should wait for "Weights" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 180000);
    });

    it('Verifying if "Weights" report is calculated', function() {
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
    });

    it('Verifying if column headers can wrap up to 3 rows if columns names are too long', function() {
      PA3MainPage.getAllColumnOfCalculatedReport('Weights').each(function(element) {
        var stringArray;
        element.getText().then(function(text) {
          stringArray = text.split('\n');
          expect(stringArray.length).toBeInBetween(1, 3);
        });
      });

    });

  });

  describe('Test Step ID: 558411', function() {

    it('Should click on wrench Icon from "Weights" report toolbar', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Wrench menu list items are appeared
      expect(PA3MainPage.getWrenchIconFromReportWorkspace('Weights', true).isPresent()).toBeTruthy();
    });

    it('Should select "Options" from drop down menu', function() {
      Utilities.getOptionFromDropDown('Options').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Weights') {
          expect(false).customError('"Tile Options - Weights" view has not appeared. ' +
            'Expected: "Tile Options - Weights" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP', function() {
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

    it('Should click on "Remove All" from "Selected" list pane', function() {
      ThiefHelpers.getTransferBoxReference().target.clear();
    });

    it('Verifying if "Ticker" column is not removed from "Selected" pane', function() {
      TileOptionsColumns.getElementFromSelectedSection('Ticker').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Ticker" column is not present "Selected" pane.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Security Name" column is not removed from "Selected" pane', function() {
      TileOptionsColumns.getElementFromSelectedSection('Security Name').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Security Name" column is not present "Selected" pane.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if all the columns are removed except "Ticker" and "Security Name" columns', function() {
      expect(TileOptionsColumns.getAllElements('selected').count()).toEqual(2);
    });

  });

  describe('Test Step ID: 558412', function() {

    it('Should enter "earnings" in the search field', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('earnings');

      // Verifying if ewquired text is entered
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(val) {
        if (val !== 'earnings') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"earnings" is not typed into the search field.');
        }
      });

      browser.sleep(2000);
    });

    it('Should select "Price to Earnings" from the "Available" list', function() {
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Price to Earnings').then(function(item) {
        item.select();

        // Check if 'Price to Earnings' is selected
        item.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Price to Earnings" is not selected from "Available" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should click on "Right" arrow button', function() {
      TileOptionsColumns.getArrowButton('right').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Price to Earnings" is added to the "Selected" list', function() {
      TileOptionsColumns.getElementFromSelectedSection('Price to Earnings').isPresent().then(function(added) {
        if (!added) {
          expect(false).customError('"Price to Earnings" is not added to the "Selected" list.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options - Weights" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Weights" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Weights" Report starts calculating', function() {
      expect(PA3MainPage.getReportCalculationDlg('Weights')).toBeTruthy();
    });

    it('Should wait for "Weights" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 180000);
    });

    it('Verifying if "Weights" report is calculated', function() {
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

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    it('Should note the "Price to Earning" "Total" value', function() {
      PA3MainPage.getValueFromCalculatedReport('Weights', 'Total', 'Price to Earnings',
        'slick-pane slick-pane-top slick-pane-left', 'slick-pane slick-pane-top slick-pane-right').then(function(value) {
        totalValue1 = parseFloat(value);
      });
    });

  });

  describe('Test Step ID: 558413', function() {

    it('Should click on wrench Icon from "Weights" report', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Wrench menu list items appears
      expect(PA3MainPage.getWrenchIconFromReportWorkspace('Weights', true).isPresent()).toBeTruthy();
    });

    it('Should select "Options" from drop down menu', function() {
      Utilities.getOptionFromDropDown('Options').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Weights') {
          expect(false).customError('"Tile Options - Weights" view has not appeared.' +
            'Expected: "Tile Options - Weights" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP', function() {
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

    it('Should click on "Price to Earnings" from "Selected" section to highlight', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Price to Earnings');
      item.select();

      // Check if 'Price to Earnings' is selected
      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Price to Earnings" is not selected from "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Statistics" section from "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Statistics').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Statistics" is not expanded in "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Interquartile Method" checkbox to check off', function() {
      expect(Utilities.isCheckboxSelected(TileOptionsColumns.getCheckBox('Interquartile Method', true))).toBeTruthy();
    });

    it('Should click on "OK" button from "Tile Options - Weights" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Weights" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Weights" Report starts calculating', function() {
      expect(PA3MainPage.getReportCalculationDlg('Weights')).toBeTruthy();
    });

    it('Should wait for "Weights" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 180000);
    });

    it('Verifying if "Weights" report is calculated', function() {
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

      // Wait for the elements to load
      browser.sleep(3000);
    });

    it('Should note the "Price to Earning" "Total" value', function() {
      PA3MainPage.getValueFromCalculatedReport('Weights', 'Total', 'Price to Earnings',
        'slick-pane slick-pane-top slick-pane-left', 'slick-pane slick-pane-top slick-pane-right').then(function(value) {
        totalValue2 = parseFloat(value);
      });
    });

    it('Verifying if "Price to Earning" "Total" value changes', function() {
      expect(totalValue1).not.toEqual(totalValue2);
    });

  });

  describe('Test Step ID: 558414', function() {

    it('Should click on wrench Icon from "Weights" report', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Wrench menu list items appears
      expect(PA3MainPage.getWrenchIconFromReportWorkspace('Weights', true).isPresent()).toBeTruthy();
    });

    it('Should select "Options" from drop down menu', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Weights') {
          expect(false).customError('"Tile Options - Weights" view has not appeared.' +
            'Expected: "Tile Options - Weights" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP', function() {
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

    it('Should click on "Price to Earnings" from "Selected" section to highlight', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Price to Earnings');
      item.select();

      // Check if 'Price to Earnings' is selected
      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Price to Earnings" is not selected from "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Statistics" section from "Options" section', function() {
      expect(TileOptionsColumns.expandSectionInOptionsPane('Statistics')).toBeTruthy();
    });

    it('Should click on "Interquartile Method" checkbox to uncheck', function() {
      expect(TileOptionsColumns.getCheckBox('Interquartile Method', true)
        .getAttribute('data-checked')).toBeNull();
    });

    it('Should check "Inverse Interquartile Method" checkbox', function() {
      expect(Utilities.isCheckboxSelected(TileOptionsColumns.getCheckBox('Inverse Interquartile', true))).toBeTruthy();
    });

    it('Should click on "OK" button from "Tile Options - Weights" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Weights" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Weights" report starts calculating', function() {
      expect(PA3MainPage.getReportCalculationDlg('Weights')).toBeTruthy();
    });

    it('Should wait for "Weights" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 180000);
    });

    it('Verifying if "Weights" report is calculated', function() {
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

      // Wait for the elements to load
      browser.sleep(3000);
    });

    it('Should note the "Price to Earning" "Total" value', function() {
      PA3MainPage.getValueFromCalculatedReport('Weights', 'Total', 'Price to Earnings',
        'slick-pane slick-pane-top slick-pane-left', 'slick-pane slick-pane-top slick-pane-right').then(function(value) {
        totalValue3 = parseFloat(value);
        CommonFunctions.captureScreenShot();
      });
    });

    it('Verifying if "Price to Earning" "Total" value changes', function() {
      expect(totalValue2).not.toEqual(totalValue3);
    });

  });

  describe('Test Step ID: 558415', function() {

    it('Should click on wrench icon from "Weights" report', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Wrench menu list items appears
      expect(PA3MainPage.getWrenchIconFromReportWorkspace('Weights', true).isPresent()).toBeTruthy();
    });

    it('Should select "Options" from drop down menu', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Weights') {
          expect(false).customError('"Tile Options - Weights" view has not appeared.' +
            'Expected: "Tile Options - Weights" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP', function() {
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

    it('Should click on "Price to Earnings" from "Selected" section to highlight', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Price to Earnings');
      item.select();

      // Check if 'Price to Earnings' is selected
      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Price to Earnings" is not selected from "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Statistics" section from "Options" section', function() {
      expect(TileOptionsColumns.expandSectionInOptionsPane('Statistics')).toBeTruthy();
    });

    it('Should click on "Interquartile Method" checkbox to check off', function() {
      expect(Utilities.isCheckboxSelected(TileOptionsColumns.getCheckBox('Interquartile Method', true))).toBeTruthy();
    });

    it('Should click on "OK" button from "Tile Options - Weights" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('"Tile Options - Weights" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Weights" Report starts calculating', function() {
      expect(PA3MainPage.getReportCalculationDlg('Weights')).toBeTruthy();
    });

    it('Should wait for "Weights" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 180000);
    });

    it('Verifying if "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the web page.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Error found while calculating the "Weights" report' + error);
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the elements to load
      browser.sleep(3000);
    });

    it('Should note the "Price to Earning" "Total" value', function() {
      PA3MainPage.getValueFromCalculatedReport('Weights', 'Total', 'Price to Earnings',
        'slick-pane slick-pane-top slick-pane-left', 'slick-pane slick-pane-top slick-pane-right').then(function(value) {
        totalValue4 = parseFloat(value);
      });
    });

    it('Verifying if "Price to Earning" "Total" value matches with "Total" value when only "Inverse Interquartile" ' +
      'checkbox is selected', function() {
      if (totalValue4 < totalValue3 - 0.1 || totalValue4 > totalValue3 + 0.1) {
        expect(false).customError('"Price to Earning", "Total" value does not matches with "Total" value when only ' +
          '"Inverse Interquartile" checkbox is selected. Expected to be in ' +
          'between "' + (totalValue3 - 0.1) + '" and "' + (totalValue3 + 0.1) + '"  but found value is "' + totalValue4 + '".');
        CommonFunctions.takeScreenShot();
      }
    });

  });

});
