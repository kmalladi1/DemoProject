'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: chart-sgstd-changes', function() {

  describe('Test Step ID: 478419', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:;PA3;Charts;CHART_DOC', function() {
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

  });

  describe('Test Step ID: 478420', function() {

    it('Should click on "Chart" icon available in Workspace', function() {
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Should select "Benchmark Weights" from the Chart drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Benchmark Weights').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Should wait for "Benchmark Weights" chart to finish calculation', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if report is converted in "Chart" mode', function() {
      PA3MainPage.isInChartFormat('Benchmark Weights').then(function(flag) {
        if (!flag) {
          expect(false).customError('Report did not convert in "Chart" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Chart" is "Pie" chart', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(style) {
        if (style !== '3D Pie') {
          expect(false).customError('"Chart" did not "Pie" chart; Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should right click on "Pie" chart', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
    });

    it('Verifying if "Show Y axis" is not presented in the drop down after right click', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Show Y axis').isPresent().then(function(flag) {
        if (flag) {
          expect(false).customError('"Show Y axis" presented in the drop down after right click on chart');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 478421', function() {

    it('Should click on the "Wrench" icon in the "Benchmark Weights" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Benchmark Weights').click().then(function() {
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

    it('Verifying if "Tile Option" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Tile Option" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from the LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Columns" is selected in LHP
      TileOptions.getLHPOption('Columns').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Columns" did not select in LHP');
        }
      });
    });

    it('Should enter "earnings" in the search field from Available section', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('earnings');

      // Verifying that "earnings" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== 'earnings') {
          expect(false).customError('"earnings" is not typed into the search field.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the Search Result to appear
      browser.sleep(4000);
    });

    it('Should double click on "Price to Earning" from Available section', function() {
      // Getting the xpath of the Available section
      var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      group.getItemByText('Price to Earning').then(function(item) {
        item.select();
        item.doubleClick();
      });

    });

    var arr = ['Port. Ending Weight', 'Variation in Ending Weight'];

    arr.forEach(function(item) {

      it('Verifying if "' + item + '" column is enabled in Selected section', function() {
        TileOptionsColumns.getElementFromSelectedSection(item).getAttribute('class').then(function(text) {
          if (text.indexOf('hidden') >= 0) {
            expect(false).customError('"' + item + '" column did not enable in Selected section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Price to Earnings" is not in grey color', function() {
      TileOptionsColumns.getElementFromSelectedSection('Price to Earnings').getCssValue('color').then(function(color) {
        if (color !== 'rgba(0, 0, 0, 1)') {
          expect(false).customError('"Price to Earnings" is in grey color; Found color:' + color);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 478422', function() {

    it('Should click on "OK" button from the header', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Should click on "Grid" icon in the report', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Benchmark Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Verifying if "Chart has changed" dialog is opened', function() {
      ThiefHelpers.isDialogOpen('Chart has changed').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Chart has changed" dialog did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "Demo Chart" in to the "Chart Name" text box', function() {
      ThiefHelpers.getTextBoxClassReference('Chart Name').setText('Demo Chart');

      // Verifying if "Demo Chart" is seted
      ThiefHelpers.getTextBoxClassReference('Chart Name').getText().then(function(text) {
        if (text !== 'Demo Chart') {
          expect(false).customError('"Demo Chart" did not enter into the text box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save Changes" from the "Chart has changed" dialog', function() {
      ThiefHelpers.getDialogButton('Chart has changed', 'Save Changes').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Should wait for "Benchmark Weights" chart to finish calculation', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if report is converted in "Table" mode', function() {
      PA3MainPage.isInChartFormat('Benchmark Weights').then(function(flag) {
        if (flag) {
          expect(false).customError('Report did not convert in "Table" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Price to Earnings" column added in the reports', function() {
      SlickGridFunctions.getColumnNames('Weights').then(function(allColumnName) {
        if (allColumnName.indexOf('Price to Earnings') < 0) {
          expect(false).customError('"Price to Earnings" did not present in the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 478423', function() {

    it('Should click on "Chart" icon available in Workspace', function() {
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      browser.sleep(2000);
    });

    it('Should select "Benchmark Weights" from the Chart drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Benchmark Weights');
    });

    it('Should wait for "Benchmark Weights" chart to finish calculation', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if report is converted in "Chart" mode', function() {
      PA3MainPage.isInChartFormat('Benchmark Weights').then(function(flag) {
        if (!flag) {
          expect(false).customError('Report did not convert in "Chart" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arr = [];

    // "Health Technology" is dynamically changing, hence fetching the pixel dynamically.
    it('Fetching all the sectors tooltips in "Chart"', function() {
      var sectors = function() {
        browser.driver.executeScript(function() {
          return $('.tf-tooltip').find('div').text();
        }).then(function(text) {
          arr.push(text);
        });
      };

      ChartHelpers.getSeriesLength('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(seriesLength) {
        for (var i = 0; i < seriesLength; i++) {
          ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', i);
          sectors();
        }
      });
    });

    it('Should double click "Health Technology" in "Chart"', function() {
      arr.forEach(function(text, index) {
        if (text.indexOf('Health Technology') >= 0) {
          ChartHelpers.doubleClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', index);
        }
      });
    });

    it('Verifying if pie "Chart" is displayed', function() {
      PA3MainPage.isInChartFormat('Benchmark Weights').then(function(flag) {
        if (!flag) {
          expect(false).customError('Report did not convert in "Chart" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover on "blue" data series and verifying "Pharmaceuticals: Major" is displayed', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Pharmaceuticals: Major') < 0) {
          expect(false).customError('"Pharmaceuticals: Major" did not present in pie chart');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 478424', function() {

    it('Should click on "Grid" icon in the report', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Benchmark Weights').click();
    });

    it('Verifying if report is converted in "Table" mode', function() {
      PA3MainPage.isInChartFormat('Benchmark Weights').then(function(flag) {
        if (flag) {
          expect(false).customError('Report did not convert in "Table" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Chart" icon available in Workspace', function() {
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Weights').click();
    });

    it('Should select "Benchmark Weights" from the Chart drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Benchmark Weights');
    });

    it('Should wait for "Benchmark Weights" chart to finish calculation', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if report is converted in "Chart" mode', function() {
      PA3MainPage.isInChartFormat('Benchmark Weights').then(function(flag) {
        if (!flag) {
          expect(false).customError('Report did not convert in "Chart" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover on "blue" data series and verifying "Pharmaceuticals: Major" is displayed', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Pharmaceuticals: Major') < 0) {
          expect(false).customError('"Pharmaceuticals: Major" did not present in pie chart');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 478426', function() {

    it('Should click on "Grid" icon in the report', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Benchmark Weights').click()
        .then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });

    });

    it('Verifying if report is converted in "Table" mode', function() {
      PA3MainPage.isInChartFormat('Benchmark Weights').then(function(flag) {
        if (flag) {
          expect(false).customError('Report did not convert in "Table" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Chart" icon available in Workspace', function() {
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Should select "Weights Over Time" from the Chart drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Weights Over Time').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Verifying if report is converted in "Chart" mode', function() {
      PA3MainPage.isInChartFormat('Weights Over Time').then(function(flag) {
        if (!flag) {
          expect(false).customError('Report did not convert in "Chart" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Grid" icon in the report', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Weights Over Time').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Verifying if report is converted in "Table" mode', function() {
      PA3MainPage.isInChartFormat('Weights Over Time').then(function(flag) {
        if (flag) {
          expect(false).customError('Report did not convert in "Table" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Chart" icon available in Workspace', function() {
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Should select "Benchmark Weights" from the Chart drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Benchmark Weights');
    });

    it('Should wait for "Benchmark Weights" chart to finish calculation', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if report is converted in "Chart" mode', function() {
      PA3MainPage.isInChartFormat('Benchmark Weights').then(function(flag) {
        if (!flag) {
          expect(false).customError('Report did not convert in "Chart" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover on "blue" data series and verifying "Pharmaceuticals: Major" is displayed', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Pharmaceuticals: Major') < 0) {
          expect(false).customError('"Pharmaceuticals: Major" did not present in pie chart');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 501314', function() {

    it('Should click on the folder icon on app toolbar', function() {
      PA3MainPage.getFolderDropDown().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Should select "New" from list', function() {
      PA3MainPage.getOptionFromFolderMenu('New').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Verifying if "Document has changed" pop up is appeared on the screen', function() {
      PA3MainPage.getDialog('Document has changed').isPresent().then(function(flag) {
        if (flag) {

          // Clicking on Don't Save Changes button from the dialog
          PA3MainPage.getButton('Don\'t Save Changes').click();
        }
      });

      browser.sleep(6000);
    });

    it('Should type "CLIENT:/NEW_PA_TEST_SUITE/PRICING/SPN_SP50_ACCT.ACCT" in the Portfolio widget textbox and hit enter', function() {
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).setText('CLIENT:/NEW_PA_TEST_SUITE/PRICING/SPN_SP50_ACCT.ACCT');

      // Verifying that "CLIENT:/NEW_PA_TEST_SUITE/PRICING/SPN_SP50_ACCT.ACCT" is typed into the Portfolio text box
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).getText().then(function(text) {
        if (text !== 'CLIENT:/NEW_PA_TEST_SUITE/PRICING/SPN_SP50_ACCT.ACCT') {
          expect(false).customError('"CLIENT:/NEW_PA_TEST_SUITE/PRICING/SPN_SP50_ACCT.ACCT" is not entered in "Portfolio" widget. Found ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Weights" report is presented', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights report did not present');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Weights Difference" chart is presented', function() {
      PA3MainPage.isInChartFormat('Weights Difference').then(function(flag) {
        if (!flag) {
          expect(false).customError('Chart did not present');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 501315', function() {

    it('Should click on "Chart" icon available in Workspace', function() {
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Should select "Weights Over Time" from the Chart drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Weights Over Time')
        .then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });

    });

    it('Verifying if report is converted in "Chart" mode', function() {
      PA3MainPage.isInChartFormat('Weights Over Time').then(function(flag) {
        if (!flag) {
          expect(false).customError('Report did not convert in "Chart" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on wrench icon from the "Weights Over Time" report', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights Over Time').click();
    });

    it('Should select "Line" from the "Chart Type" drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Chart Type|Line').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Verifying if report is converted in "Chart" mode', function() {
      PA3MainPage.isInChartFormat('Port. Weight').then(function(flag) {
        if (!flag) {
          expect(false).customError('Report did not convert in "Chart" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Chart" is "Line" chart', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(style) {
        if (style !== 'Line') {
          expect(false).customError('"Chart" did not "Line" chart; Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 501319', function() {

    it('Should click on the "Wrench" icon in the "Port. Weight" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Port. Weight').click().then(function() {
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

    it('Verifying if "Tile Option" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Tile Option" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Dates" from LHP', function() {
      TileOptions.getLHPOption('Dates').click();

      // Verifying that view changed to "Dates"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Dates') {
          expect(false).customError('"Dates" is not selected from LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "End of Last Quarter" from the Start Date dropdown', function() {
      ThiefHelpers.getTextBoxClassReference('Start Date:').selectOptionByText('End of Last Quarter').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "End of Last Quarter" is set in Start Date input box
      ThiefHelpers.getTextBoxClassReference('Start Date:').getText().then(function(text) {
        if (text !== 'End of Last Quarter') {
          expect(false).customError('"End of Last Quarter" is not set in "Start Date" input box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from the header', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Should click on "Grid" icon in the report', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Port. Weight').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Verifying if "Chart has changed" dialog is opened', function() {
      ThiefHelpers.isDialogOpen('Chart has changed').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Chart has changed" dialog did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "WOTC" in to the "Chart Name" text box', function() {
      ThiefHelpers.getTextBoxClassReference('Chart Name').setText('WOTC');

      // Verifying if "WOTC" is seted
      ThiefHelpers.getTextBoxClassReference('Chart Name').getText().then(function(text) {
        if (text !== 'WOTC') {
          expect(false).customError('"WOTC" did not enter into the text box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save Changes" from the "Chart has changed" dialog', function() {
      ThiefHelpers.getDialogButton('Chart has changed', 'Save Changes').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Verifying if report is converted in "Table" mode', function() {
      PA3MainPage.isInChartFormat('Benchmark Weights').then(function(flag) {
        if (flag) {
          expect(false).customError('Report did not convert in "Table" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    ChartingUtilities.selectChartFromReport('Weights', 'WOTC|Select…');

    it('Should right click on "green" Line', function() {
      ChartHelpers.rightClickOnSeries('[tile-id=tile0] .pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
    });

    it('Should click on "Show data label" after perform right click', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Show data label').click();
    });

    it('Verifying if "Chart" is "Line" chart', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(style) {
        if (style !== 'Line') {
          expect(false).customError('"Chart" did not "Line" chart; Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if series data label is showed "100.00" at line start point', function() {
      ChartHelpers.getSeriesLabelForXOrYAxis('[tile-id=tile0] .pa-chart-non-formatting-mode', '$fdsChartController',
        'Y', '0', 'Series 1').then(function(text) {
        if (text !== '100.00') {
          expect(false).customError('Series data lable did not show "100.00"; Found :' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if series data label is showed "100.00" at line end point', function() {
      ChartHelpers.getSeriesLabelForXOrYAxis('[tile-id=tile0] .pa-chart-non-formatting-mode', '$fdsChartController',
        'Y', '1', 'Series 1').then(function(text) {
        if (text !== '100.00') {
          expect(false).customError('Series data label did not show "100.00"; Found :' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
