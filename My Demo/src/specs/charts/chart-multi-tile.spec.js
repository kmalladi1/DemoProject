'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: chart-multi-tile', function() {

  describe('Test Step ID: 499797', function() {

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

  describe('Test Step ID: 477417', function() {

    var col = ['Port. Weight', 'Bench. Weight', 'Difference'];
    var values = ['Column', 'Bar', 'Pie', 'Scatter', 'Bubble',
      'Histogram', 'Heat Map', 'Geo Heat Map', 'Column (time series)', 'Line', 'Stacked Area',];

    it('Should right click on "Column Header" in "Weights" report and hover on "Custom Charts" and verifying' +
      ' options is presented', function() {
      var eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Weights');
      eleRefs.each(function(element) {

        PA3MainPage.rightClickOnGivenElement(element);
        browser.sleep(2000);

        // Hover mouse on "Custom Charts"
        browser.actions().mouseMove(PA3MainPage.getOptionAfterRightClickOnReport('Custom Charts')).perform();
        browser.sleep(3000);

        // Verifying if all Options is presented
        values.forEach(function(val) {
          PA3MainPage.getOptionAfterRightClickOnReport(val).isPresent().then(function(flag) {
            if (!flag) {
              expect(false).customError('"' + val + '" did not present in second drop down');
              CommonFunctions.takeScreenShot();
            }
          });
        });

        // Click anywhere to close the drop down
        PA3MainPage.getReports('Weights').click();

      });

    });

    col.forEach(function(colName) {

      it('Verifying if "' + colName + '" is presented in the slickgrid', function() {
        SlickGridFunctions.getAllColumnFieldValue('Weights').then(function(arr) {
          if (arr.indexOf(colName) < 0) {
            expect(false).customError('"' + colName + '" did not present in the slickgrid');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 499799', function() {

    /*it('Should click on "Chart" icon available in Workspace', function() {
     PA3MainPage.getChartMenuButtonFromReportWorkspace('Weights').click();
     });

     it('Should select "Portfolio Weights" from the Chart drop down', function() {
     ThiefHelpers.getMenuClassReference().selectItemByText('Portfolio Weights');
     });*/

    ChartingUtilities.selectChartFromReport('Weights', 'Portfolio Weights');

    it('Verifying if report is converted in "Chart" mode', function() {
      PA3MainPage.isInChartFormat('Portfolio Weights').then(function(flag) {
        if (!flag) {
          expect(false).customError('Report did not convert in "Chart" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Wrench" icon available in Workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Portfolio Weights').click();
      browser.sleep(2000);
    });

    it('Should select "Column" from the "Chart Type" drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Chart Type|Column').click();
      browser.sleep(5000);
    });

    it('Verifying if "Chart" is "Column" chart', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(style) {
        if (style !== 'Columns') {
          expect(false).customError('"Chart" did not "Column" chart; Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 499800', function() {

    it('Should right click on "Column" chart', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
      browser.sleep(1000);
    });

    it('Should select "Change Series" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Change Series').click();
    });

    it('Should press "Control" key from the keyboard', function() {
      browser.actions().keyDown(protractor.Key.CONTROL).perform();
    });

    var items = ['Bench. Weight', 'Difference'];

    items.forEach(function(item) {

      it('Should  select "' + item + '" from Available section', function() {
        ChangeSeries.getElementFromAvailableSection(item).click();

        // Verifying if element is selected
        ChangeSeries.getElementFromAvailableSection(item).getAttribute('class').then(function(text) {
          if (text.indexOf('selected') < 0) {
            expect(false).customError('"' + item + '" did not highlight in Available section');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should un press "Control" key from the keyboard', function() {
      browser.actions().keyUp(protractor.Key.CONTROL).perform();
    });

    it('Should click "Right" arrow to move the element in selected section', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    items.forEach(function(item) {

      it('Verifying if "' + item + '" is added in "Selected" section', function() {
        ChangeSeries.getElementsFromSelectedSection(item).isPresent().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + item + '" did not present in the "Selected" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should click on "Weights" report in LHP to close the drop down', function() {
      PA3MainPage.getReports('Weights').click();
    });

    var legends = ['Port. Weight', 'Bench. Weight', 'Difference'];

    legends.forEach(function(legend, index) {

      it('Verifying if "' + legend + '" legend is present in the chart', function() {
        ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart')
          .then(function(arrayOfLegends) {
            if (arrayOfLegends[index] !== legend) {
              expect(false).customError('"' + legend + '" legend did not present in the chart; Found: ' +
                '' + arrayOfLegends[index]);
              CommonFunctions.takeScreenShot();
            }
          });
      });

    });

  });

  describe('Test Step ID: 499803', function() {

    it('Should click on "Weights - Multi tile" report in LHP to select the report', function() {
      PA3MainPage.getReports('Weights - Multi tile').click();

      // Verifying if "Weights - Multi tile" is selected in LHP
      PA3MainPage.getReports('Weights - Multi tile').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Weights - Multi tile" report did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Grid" icon in the report', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Contribution Scatter').click();
    });

    it('Should click on "Save Changes" from the "Chart has changed" dialog if dialog is appeared', function() {
      ThiefHelpers.isDialogOpen('Chart has changed').then(function(flag) {
        if (flag) {
          ThiefHelpers.getDialogButton('Chart has changed', 'Save Changes').click();
        }
      });
    });

    it('Verifying if report is converted in "Table" mode', function() {
      PA3MainPage.isInChartFormat('Contribution Scatter').then(function(flag) {
        if (flag) {
          expect(false).customError('Report did not convert in "Table" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 603865', function() {

    it('Should hover mouse "Electronic Technology" from interactive pane', function() {
      browser.actions().mouseMove(PA3MainPage.getElementFromInteractivePane('Performance', 'Electronic Technology', true)).perform();
      browser.sleep(2000);
    });

    it('Verifying if "Tooltip" is appeared', function() {
      ThiefHelpers.getToolTipClassReference().isOpen().then(function(flag) {
        if (!flag) {
          expect(false).customError('Tooltip did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if tooltip text is "Electronic Technology"', function() {
      ThiefHelpers.getToolTipClassReference().getContent().getText().then(function(text) {
        if (text !== 'Electronic Technology') {
          expect(false).customError('Tooltip did not contain text "Electronic Technology"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 499804', function() {

    it('Should hold control key and select "Retail Trade", "Health Services", "Health Technology" from interactive pane', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference();
      group.getGroupByText('Retail Trade').select();
      group.getGroupByText('Health Services').select(true);
      group.getGroupByText('Health Technology').select(true);

      browser.sleep(2000);
    });

    var legends = ['Portfolio Total Return - Retail Trade', 'Portfolio Total Return - Health Services', 'Portfolio ' +
    'Total Return - Health Technology', 'Benchmark Total Return - Retail Trade', 'Benchmark Total Return - Health Services',
      'Benchmark Total Return - Health Technology',];

    legends.forEach(function(legend) {

      it('Verifying if "' + legend + '" legend is present in the chart', function() {
        ChartHelpers.getLegends('[tile-id=tile2] .pa-chart-non-formatting-mode', '$fdsChartController', 'Chart')
          .then(function(arrayOfLegends) {
            if (arrayOfLegends.indexOf(legend) < 0) {
              expect(false).customError('"' + legend + '" legend did not present in the chart');
              CommonFunctions.takeScreenShot();
            }
          });
      });

    });

  });

  describe('Test Step ID: 477420', function() {

    it('Should click on the "Wrench" button from the application toolbar', function() {
      PA3MainPage.getWrenchIcon().click();

      // Verifying if drop down menu appear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('Menu drop down did not open');
          CommonFunctions.takeScreenShot();
        }
      });

      browser.sleep(2000);
    });

    it('Should click on "Format Options>Theme>Carbon" from wrench drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Format Options|Theme|Carbon').click();

      // Wait until theme changes to Carbon mode
      browser.sleep(2000);
    });

    it('Verifying if "Theme" is converted into "Carbon" mode', function() {
      element(by.xpath(PA3MainPage.xpathApp)).getAttribute('class').then(function(text) {
        if (text.indexOf('carbon') < 0) {
          expect(false).customError('Theme did not change into the "Carbon" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover mouse on any series in Chart', function() {
      ChartHelpers.hoverOnPixel('[tile-id=tile1] .pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('%') < 0) {
          expect(false).customError('Tooltip did not contain value');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 557391', function() {

    it('Should click on the "Wrench" button from the application toolbar', function() {
      PA3MainPage.getWrenchIcon().click();

      // Verifying if drop down menu appear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('Menu drop down did not open');
          CommonFunctions.takeScreenShot();
        }
      });

      browser.sleep(2000);
    });

    it('Should click on "Format Options>Theme>Quartz" from wrench drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Format Options|Theme|Quartz').click();
    });

    it('Verifying if "Theme" is converted into "Quartz" mode', function() {
      element(by.xpath(PA3MainPage.xpathApp)).getAttribute('class').then(function(text) {
        if (text.indexOf('carbon') >= 0) {
          expect(false).customError('Theme did not change into the "Quartz" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
