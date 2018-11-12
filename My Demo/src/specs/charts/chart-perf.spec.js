'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: chart-perf', function() {

  // Variables (s)
  var dateRange;
  var chartData;

  describe('Test Step ID: 414785', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

  });

  describe('Test Step ID: 414787', function() {

    it('Enter "SPN_SP50" in the "Portfolio" widget and select ' +
      '"Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT" from type ahead', function() {
      expect(PA3MainPage.setPortfolio('SPN_SP50', 'Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT',
        'Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT')).toBeTruthy();
    });

    it('Enter "Russell:1000" in the "Benchmark" widget', function() {
      // Clear the widget if some text already exists
      PA3MainPage.getWidgetBox('Benchmark').clear();

      // Enter "Russell:1000" into the "Benchmark" widget
      PA3MainPage.getWidgetBox('Benchmark').sendKeys('Russell:1000', protractor.Key.ENTER);

      // Wait for "Benchmark" to be taken up
      browser.sleep(3000);
    });

    it('Should select "Contribution" report from LHP', function() {
      PA3MainPage.getReports('Contribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying "Contribution" Report is selected.
      expect(PA3MainPage.getReports('Contribution').getAttribute('class')).toContain('selected');
    });

    it('Should wait for "Contribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Contribution'), 180000)).toBeTruthy();
    });

    it('Verifying if "Contribution" report is calculated', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(displayed) {
        expect(displayed).customError('"Contribution" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution')).toBeTruthy();
        } else {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Error found while calculating the "Contribution" report' + error);
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

  describe('Test Step ID: 477320', function() {

    ChartingUtilities.selectChartFromReport('Contribution', 'Multi-Horizon Returns');

    it('Should select "Communications" group from Interactive pane', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference().getGroupByText('Communications');
      group.select();

      // Wait for chart to appear
      browser.sleep(2000);
    });

    it('Verify that the "Multi-Horizons Returns" chart appears for the "Communications" sector', function() {
      ChartingUtilities.hoverOnPixel('Series 1').then(function() {
        browser.driver.executeScript(function() {
          return $('.tf-tooltip').find('div').text();
        }).then(function(name) {
          if (name.indexOf('Communications') < 0) {
            CommonFunctions.takeScreenShot();
            expect(false).customError('"Multi-Horizons Returns" chart is not appeared for "Communications" sector');
          }
        });
      });
    });

    it('Should note the date range of chart', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(value) {
        dateRange = value;
      });
    });

  });

  describe('Test Step ID: 414811', function() {

    it('Should click on "wrench" icon in the report', function() {
      PA3MainPage.selectWrenchIcon('Multi-Horizon Returns');
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

    it('Should click on "Report Frequency" drop down ', function() {
      TileOptionsDates.getReportFrequencyBtn().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Single" from "Report Frequency" dropdown', function() {
      TileOptionsDates.getOption('Single').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verify that "Single" is selected
      TileOptionsDates.getReportFrequencyBtn().getText().then(function(value) {
        if (value !== 'Single') {
          expect(false).customError('"Single" is not selected');
        }
      });
    });

    it('Should click on "OK" button in "Tile Options-Multi Horizon Returns" page', function() {
      TileOptions.getHeaderButton('OK').click();
    });

    it('Should wait for "Multi Horizon Returns" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for chart to appear
      browser.sleep(2000);
    });

    it('Verify that "Multi-Horizon Returns" chart appears', function() {
      PA3MainPage.isInChartFormat('Multi-Horizon Returns').then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Chart" view is not appeared');
        }
      });
    });

    it('Verify that the date range of the chart is same as noted in the previous step', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(value) {
        if (value !== dateRange) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('date range is not matched with previous date:' + dateRange);
        }
      });
    });

    it('Should note the Chart for future verification', function() {
      ChartingUtilities.getChartString().then(function(data) {
        CommonFunctions.captureScreenShot();
        chartData = data;
      });
    });

  });

  describe('Test Step ID: 414791', function() {

    it('Should click on the "Hamburger" icon next to "Portfolio" widget', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account dropdown opened
      ThiefHelpers.isDropDownOpen().then(function(found) {
        if (!found) {
          expect(false).customError('Account dropdown was not opened');
        }
      });
    });

    it('Should click on "X" icon in Account dropdown', function() {
      PA3MainPage.getAccountClearAllButton('Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click();

      // verifying that "Accounts" drop down is closed
      expect(PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('Class')).not.toContain('active');
    });

    it('Enter "PA3_Test.acct" in the "Portfolio" widget and select "PA3_TEST.ACCT | Client:" from type ahead', function() {
      expect(PA3MainPage.setPortfolio('PA3_Test.acct', 'PA3_TEST.ACCT | Client:', 'Client:PA3_TEST.ACCT')).toBeTruthy();
    });

    it('Should wait for "Multi Horizon Returns" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for chart to appear
      browser.sleep(2000);
    });

    it('Verify that "Multi-Horizon Returns" chart appears', function() {
      PA3MainPage.isInChartFormat('Multi-Horizon Returns').then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Chart" view is not appeared');
        }
      });
    });

  });

  describe('Test Step ID: 414792', function() {

    it('Verify that the "Multi Horizon Returns" chart is different with previous chart', function() {
      ChartingUtilities.getChartString().then(function(data) {
        if (data === chartData) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Multi Horizon Returns" chart data is same as the previous chart data');
        }
      });
    });
  });

  describe('Test Step ID: 716606', function() {

    it('Should open "Client:/pa3/charts/CHART_LABLE_RI_COL" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('chart-lable-ri-col');
    });

    it('Waiting for report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);
    });

    it('Verifying if calculated data for "Weights" report appeared', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Weights" report is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
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

    it('Should right click on column header "Value at Risk - 1 Calendar Day, 95%" and select "Custom charts|Column" from list appeared', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', 'Value at Risk - 1 Calendar Day, 95%').then(function(cellRef) {
        PA3MainPage.rightClickAndSelectOption(cellRef, 'Custom Charts|Column');
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on the "Wrench" button from the application toolbar', function() {
      PA3MainPage.selectWrenchIcon('Value at Risk - 1 Calendar Day, 95%');

      //Verifying menu drop down is appeared'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Menu drop down list did not display in "Weights" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Change Series" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Change Series').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying "Change series" dialog is appeared', function() {
      ChangeSeries.getDialog('Change Series').isDisplayed().then(function(flag) {
        if (!flag) {
          expect(false).customError('Change Series dialog did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if chart name is displayed as "Value at Risk - 1 Calendar Day, 95%"', function() {
      PA3MainPage.isInChartFormat('Value at Risk - 1 Calendar Day, 95%').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Value at Risk - 1 Calendar Day, 95%" report did not recalculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Value at Risk - 1 Calendar Day, 95%" is present in the "Selected" section', function() {
      ChangeSeries.getElementsFromSelectedSection('Value at Risk - 1 Calendar Day, 95%').isPresent().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Value at Risk - 1 Calendar Day, 95%" is not present in "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
