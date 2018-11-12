'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: chart-custom-changes-carbon', function() {

  describe('Test Step ID: 554434', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:/PA3/Charts/CHART_DOC"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('chart-doc');
    });

    it('Waiting for "Weights" report to calculate', function() {
      // Waiting for "Weights" report to finish calculation
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      // Verifying that the "Weights" reports calculated
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

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that the header title in CHART_DOC page appear as "Large Cap Core Test vs Russell 1000"', function() {
      PA3MainPage.getHeader().getText().then(function(value) {
        if (value !== 'Large Cap Core Test vs Russell 1000') {
          expect(false).customError('Header title is not displayed as "Large Cap Core Test vs ' +
            'Russell 1000"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  }); // 554434 ends here

  describe('Test Step ID: 554435', function() {

    it('Should click on the "Wrench" button from the application toolbar', function() {
      // Clicking on "Wrench" button in the application toolbar
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down menu appear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('Wrench icon drop down is not present.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Format Options|Theme|Carbon" option from wrench menu drop down', function() {
      // Click on "carbon" theme from format options
      PA3MainPage.getOptionFromWrenchMenu('Format Options|Theme|Carbon').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      browser.sleep(3000);

      // Verifying report theme as "carbon"
      element(by.xpath(PA3MainPage.xpathApp)).getAttribute('class').then(function(value) {
        if (value.indexOf('carbon') === -1) {
          expect(false).customError('Report theme is not "carbon"');
        }
      });
    });

    ChartingUtilities.selectChartFromReport('Weights', 'Custom Charts|Column');

    it('Verifying if application is in  chart format', function() {
      PA3MainPage.isInChartFormat('Port. Weight').then(function(found) {
        if (!found) {
          expect(false).customError('"Column" chart is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Column" type of chart is displayed', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 0).then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Column" type of chart is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Port. Weight" is displayed as chart legends', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.indexOf('Port. Weight') === -1) {
          expect(false).customError('"Port. Weight" is not displayed as Legend');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying only 1 "Port. Weight" legend is displayed in column chart', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.length !== 1) {
          expect(false).customError('More than 1 legends are displayed in column chart');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  }); // 554435 ends here

  describe('Test Step ID: 554436', function() {

    it('Should right click on Chart', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 1);
    });

    it('Should click on the "Change Series" from the menu list which appears after right click on chart', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Change Series').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for the "Change Series" dialog to appear', function() {
      browser.driver.wait(function() {
        return ChangeSeries.getDialog('Change Series').isDisplayed().then(function(isFound) {
          return isFound;
        }, function() {

          return false;
        });
      }, 5000, 'Change Series dialog not appeared even after waiting for 5 secons');
    });

    it('Verifying "Change series" dialog is appeared', function() {
      ChangeSeries.getDialog('Change Series').isDisplayed().then(function(flag) {
        if (!flag) {
          expect(false).customError('Change Series dialog did not appear');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "+" icon next to the "Available" section', function() {
      ThiefHelpers.getButtonClassReference(undefined, ChangeSeries.xpathPlusSign).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile-Options" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (!option) {
          expect(false).customError('"Tile Options" mode is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "earnings" in the search field', function() {
      // Enter "earnings" in the search field
      TileOptionsColumns.setSearchKeyword('earnings');

      // Verifying "earnings" is entered in search box or not
      element(by.xpath(TileOptionsColumns.xpathSearchField)).getAttribute('value').then(function(text) {
        if (text !== 'earnings') {
          expect(false).customError('"earnings" is not entered in search box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click on "Price to Earnings using FY1 Est" option from Available section', function() {
      // Getting the xpath of the Available section
      var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      group.getItemByText('Price to Earnings using FY1 Est').then(function(item) {
        item.select();
        item.doubleClick();
      });
    });

    it('Verifying "Price to Earnings using FY1 Est" option is added to selected section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Price to Earnings using FY1 Est').isDisplayed().then(function(present) {
        if (!present) {
          expect(false).customError('"Price to Earnings using FY1 Est" is not added to "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" from "Tile Options" page', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if application is in chart format', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference());

      // Verifying if application is in chart format
      PA3MainPage.isInChartFormat('Port. Weight').then(function(found) {
        if (!found) {
          expect(false).customError('Application is not in Chart mode');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Verifying "Column" type of chart is displayed', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 0).then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" type of chart is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying column chart is updated with "Blue" and "Green" bars', function() {
      // Verifying that the Column chart is updated with blue bars
      ChartHelpers.getSeriesColor('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1',
        'Background').then(function(hexColor) {
        if (hexColor !== '#00aeef') {
          expect(false).customError('Column Chart is not updated with blue color bars');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying that the Column chart is updated with green bars
      ChartHelpers.getSeriesColor('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2',
        'Background').then(function(hexColor) {
        if (hexColor !== '#99cc33') {
          expect(false).customError('Column Chart is not updated with green color bars');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Port.Weight" is displayed as chart legend', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.indexOf('Port. Weight') === -1) {
          expect(false).customError('"Port. Weight" is not displayed as Legend');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Price to Earnings using FY1 Est" is displayed as chart legend', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.indexOf('Price to Earnings using FY1 Est') === -1) {
          expect(false).customError('"Price to Earnings using FY1 Est" is not displayed as Legend');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying only 2 legend are displayed in column chart', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.length !== 2) {
          expect(false).customError('More than 2 legends are displayed in column chart');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  }); // 554436 ends here

  describe('Test Step ID: 554437', function() {

    it('Should click on the "Grid" icon from the "Port. Weight" to open report mode', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Port. Weight').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying "Chart has Changes" Dialog box has appeared or not', function() {
      ThiefHelpers.isDialogOpen('Chart has changed').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Chart has Changed" dialog did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Save Changes" in "Chart Changes" Dialog box', function() {
      ThiefHelpers.getDialogButton('Chart has changed', 'Save Changes').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Weights" report to calculate', function() {
      // Waiting until "Weights" reports calculated
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      // Verifying that the "Weights" reports are calculated
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

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Wrench" button from the application toolbar', function() {
      // Clicking on "Wrench" button in the application toolbar
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down menu appear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('Wrench icon drop down is not present.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Format Options|Theme|Quartz" option from wrench menu drop down', function() {
      // Click on "Quartz" theme from format options
      PA3MainPage.getOptionFromWrenchMenu('Format Options|Theme|Quartz').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying report theme as "Quartz"
      element(by.xpath(PA3MainPage.xpathApp)).getAttribute('class').then(function(value) {
        if (value.indexOf('carbon') === 0) {
          expect(false).customError('Report theme is not "Quartz"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Price to Earnings FY1 Est" column is added to the "Weights" report or not', function() {
      SlickGridFunctions.getColumnNames('Weights').then(function(option) {
        if (option.indexOf('Price to Earnings using FY1 Est') === -1) {
          expect(false).customError('"Price to Earnings FY1 Est" column is not added to the Weights report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  }); // 554437 ends here

});// root describe ends here

