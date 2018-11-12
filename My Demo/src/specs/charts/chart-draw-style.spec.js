'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: chart-draw-style', function() {

  // Values for pixel was hard coded as due to dynamic variation of pixel in charts

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  describe('Test Step ID: 471694', function() {

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

    it('Verifying if "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 471695', function() {

    it('Should click on "Weights - Sections" report from LHP to select', function() {
      PA3MainPage.getReports('Weights - Sections').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Weights - Sections" reports');
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Weights - Sections" report is highlighted
      PA3MainPage.getReports('Weights - Sections').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('Weights - Sections report did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Weight" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights', true).then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
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
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Should type "spn" in Portfolio box and select "SPN_SP50_ACCT.ACCT | Client:/new_pa_test_suite/pricing/" from drop down', function() {
      PA3MainPage.setPortfolio('spn', 'SPN_SP50_ACCT.ACCT | Client:/new_pa_test_suite/pricing/', 'Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT')
        .then(function(option) {
            if (!option) {
              expect(false).customError('Not able to Type "spn" into "Portfolio"' +
                ' widget and select "SPN_SP50_ACCT.ACCT | Client:/new_pa_test_suite/pricing/" from type ahead');
              CommonFunctions.takeScreenShot();
            }
          },

          function(error) {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
    });

    it('Should wait for "Weight" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights', true).then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
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
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Should right click on "Price to Earnings" column and select Column from Custom Charts menu', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', 'Price to Earnings').then(function(ref) {
        PA3MainPage.rightClickAndSelectOption(ref, 'Custom Charts|Column');
      });
    });

    it('Verifying if report is converted in "Chart" mode', function() {
      PA3MainPage.isInChartFormat('Price to Earnings').then(function(flag) {
        if (!flag) {
          expect(false).customError('Report did not convert in "Chart" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Chart" is "Columns" chart', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(style) {
        if (style !== 'Columns') {
          expect(false).customError('Chart" showed is not "Columns" chart. Instead Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on chart toolbar wrench icon from "Price to Earnings"', function() {
      PA3MainPage.selectWrenchIcon('Price to Earnings');
    });

    it('Verifying if "Menu" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Menu" drop down did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Change Series" from wrench drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Change Series');
    });

    it('Verifying if "Change Series" drop down is opened', function() {
      ChangeSeries.getDialog('Change Series').isDisplayed().then(function(flag) {
        if (!flag) {
          expect(false).customError('Change Series drop down did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should press "Control" key from the keyboard', function() {
      browser.actions().keyDown(protractor.Key.CONTROL).perform();
    });

    var items = ['Price to Earnings using FY1 Est', 'Price to Earnings using FY2 Est'];

    items.forEach(function(item) {

      it('Should  select "' + item + '" from Available section', function() {
        ChangeSeries.getElementFromAvailableSection(item).click().then(function() {
        }, function() {
          expect(false).customError('Unable to click on "' + item + '"');
          CommonFunctions.takeScreenShot();
        });

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
      /*      ChangeSeries.getArrowButton('Right').click().then(function() {
       }, function() {
       expect(false).customError('Unable to click on "Right" arrow button');
       CommonFunctions.takeScreenShot();
       });*/
      ThiefHelpers.getTransferBoxReference().transferToTarget();
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

    it('Should click on "Weights - Sections" report from LHP to close the Change Series drop down', function() {
      PA3MainPage.getReports('Weights - Sections').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Weights - Sections" reports');
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Weights - Sections" report is highlighted
      PA3MainPage.getReports('Weights - Sections').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('Weights - Sections report did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 471699', function() {

    it('Verifying if "Series 1" text is "Price to Earnings"', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Price to Earnings') < 0) {
          expect(false).customError('"Series 1" text did not "Price to Earnings"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should right click on blue Series', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
    });

    it('Verifying if Series 1 color is blue', function() {
      ChartHelpers.getSeriesColor('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 'Background').then(function(color) {
        if (color !== '#00aeef') {
          expect(false).customError('Series did not in blue color; Found: ' + color);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Draw style" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Draw style').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Marker" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Marker').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
      browser.sleep(10000);
    });

    it('Verifying if "Chart" is "Marker" for "Series 1"', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(style) {
        if (style !== 'Marker') {
          expect(false).customError('Chart" showed is not "Marker" chart for Series 1. Instead Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Series 2" text is "Price to Earnings using FY1 Est"', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2');

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Price to Earnings using FY1 Est') < 0) {
          expect(false).customError('"Series 2" text did not "Price to Earnings using FY1 Est"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should right click on green Series', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2');
    });

    it('Verifying if Series 2 color is green', function() {
      ChartHelpers.getSeriesColor('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2', 'Background').then(function(color) {
        if (color !== '#99cc33') {
          expect(false).customError('Series did not in blue color; Found: ' + color);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Draw style" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Draw style').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "2D Stacked" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('2D Stacked').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
      browser.sleep(10000);
    });

    it('Verifying if "Chart" is "Columns" chart for Series 2', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2').then(function(style) {
        if (style !== 'Columns') {
          expect(false).customError('Chart" showed is not "Columns" chart for Series 2. Instead Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Price to Earnings using FY1 Est" Series Columns is stacked to "Price to Earnings using FY2 Est"', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2');

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Price to Earnings using FY1 Est') < 0) {
          expect(false).customError('"Price to Earnings using FY1 Est" Series Columns did not stack to "Price to Earnings using FY2 Est"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Price to Earnings using FY2 Est" Series Columns is stacked to "Price to Earnings using FY1 Est"', function() {
      browser.driver.executeScript(function() {
        var chartObject = $('.pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart;
        var p = chartObject.querySeriesPixel('Series 2');

        // Taking pixel value of Series 3 to calculate difference between two Series pixel for y axis
        var p1 = chartObject.querySeriesPixel('Series 3');
        var pixel = p.y - p1.y;
        chartObject.hoverOnPixel(p.x, p.y - pixel);
      });
      browser.sleep(2000);

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Price to Earnings using FY2 Est') < 0) {
          expect(false).customError('"Price to Earnings using FY2 Est" Series Columns did not stack to "Price to Earnings using FY1 Est"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 471706', function() {

    it('Should click on chart toolbar wrench icon from "Price to Earnings"', function() {
      PA3MainPage.selectWrenchIcon('Price to Earnings');

      browser.sleep(2000);
    });

    it('Verifying if "Menu" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Menu" drop down did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Display Options" option to load from the wrench dropdown', function() {
      browser.wait(function() {
        return PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Display Options').isDisplayed().then(function(found) {
          return found;
        }, function() {
          return false;
        });
      }, 30000, 'Returns section was not expanded');
    });

    it('Should click on "Display Options" from wrench drop down', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Display Options').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Display Options" drop down is opened', function() {
      ChangeSeries.getDialog('Display Options').isDisplayed().then(function(flag) {
        if (!flag) {
          expect(false).customError('Display Options drop down did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Display Values" drop down and select "Totals"', function() {
      ThiefHelpers.selectOptionFromDropDown('Totals', 'Display Values');
    });

    it('Verifying if Display Values drop down is set to "Totals"', function() {
      ThiefHelpers.verifySelectedDropDownText('Totals', 'Display Values');
      browser.sleep(5000);
    });

    it('Verifying if "Chart" is "Marker" for "Series 1"', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(style) {
        if (style !== 'Marker') {
          expect(false).customError('Chart" showed is not "Marker" chart for Series 1. Instead Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should perform right click on "blue" data series', function() {
      browser.driver.executeScript(function() {
        var chartObject = $('.pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart;
        var p = chartObject.querySeriesPixel('Series 1');
        chartObject.rightClickOnPixel(p.x, p.y - 3);
      });
    });

    it('Should select "Draw style" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Draw style').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    var arr = ['2D Stacked', '3D Stacked'];

    arr.forEach(function(name) {
      it('Verifying if "' + name + '" is not present in Draw style drop down', function() {
        ChartingUtilities.getOptionAfterRightClickOnChart(name).isPresent().then(function(flag) {
          if (flag) {
            expect(false).customError('"' + name + '" presented in Draw style drop down');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 472685', function() {

    it('Should click on chart toolbar wrench icon from "Price to Earnings"', function() {
      PA3MainPage.selectWrenchIcon('Price to Earnings');

      browser.sleep(2000);
    });

    it('Verifying if "Menu" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Menu" drop down did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Display Options" option to load from the wrench dropdown', function() {
      browser.wait(function() {
        return PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Display Options').isDisplayed().then(function(found) {
          return found;
        }, function() {
          return false;
        });
      }, 30000, 'Returns section was not expanded');
    });

    it('Should click on "Display Options" from wrench drop down', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Display Options').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Display Options" drop down is opened', function() {
      ChangeSeries.getDialog('Display Options').isDisplayed().then(function(flag) {
        if (!flag) {
          expect(false).customError('Display Options drop down did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Display Values" drop down and select "Top N"', function() {
      ThiefHelpers.selectOptionFromDropDown('Top N', 'Display Values');
    });

    it('Verifying if Display Values drop down is set to "Top N"', function() {
      ThiefHelpers.verifySelectedDropDownText('Top N', 'Display Values');
      browser.sleep(5000);
    });

    it('Should enter "5" in the search field from Available section', function() {
      ThiefHelpers.getTextBoxClassReference('Values').setText('5');

      // Verifying that "5" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Values').getText().then(function(text) {
        if (text !== '5') {
          expect(false).customError('"5" did not type into the search field.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Chart" is "Marker" for "Series 1"', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(style) {
        if (style !== 'Marker') {
          expect(false).customError('Chart" showed is not "Marker" chart for Series 1. Instead Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 474459', function() {

    it('Should click on "Display Values" drop down and select "Totals"', function() {
      ThiefHelpers.selectOptionFromDropDown('Totals', 'Display Values');
    });

    it('Verifying if Display Values drop down is set to "Totals"', function() {
      ThiefHelpers.verifySelectedDropDownText('Totals', 'Display Values');
    });

    it('Should click on "Color By:" drop down and select "Section"', function() {
      ThiefHelpers.selectOptionFromDropDown('Section', 'Color By:');
    });

    it('Verifying if "Color By:" drop down is set to "Section"', function() {
      ThiefHelpers.verifySelectedDropDownText('Section', 'Color By:');
      browser.sleep(5000);
    });

    it('Should click on "Weights - Sections" report from LHP to close Display drop down', function() {
      PA3MainPage.getReports('Weights - Sections').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Weights - Sections" reports');
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Weights - Sections" report is highlighted
      PA3MainPage.getReports('Weights - Sections').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('Weights - Sections report did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Series 1" text is "Price to Earnings"', function() {
      browser.driver.executeScript(function() {
        var chartObject = $('.pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart;
        var p = chartObject.querySeriesPixel('Series 1');
        chartObject.hoverOnPixel(p.x, p.y - 3);
      });
      browser.sleep(2000);

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Price to EarningsValuation:') < 0) {
          expect(false).customError('"Price to EarningsValuation:" did not as Series 1 text');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Series 2" text is "Price to Earnings using FY1 Est"', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2');

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Price to Earnings using FY1 Est') < 0) {
          expect(false).customError('"Price to Earnings using FY1 Est" did not as Series 2 text');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Series 3" text is "Price to Earnings using FY2 Est"', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2', 1);

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Price to Earnings using FY2 Est') < 0) {
          expect(false).customError('"Price to Earnings using FY2 Est" did not as Series 3 text');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var priceToEarnigsFY1Color;
    var priceToEarnigsFY2Color;
    var priceToEarnings;

    it('Should copy "Price to Earnings using FY1 Est" series color', function() {
      ChartHelpers.getSeriesColor('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2', 'Background')
        .then(function(color) {
          priceToEarnigsFY1Color = color;
        });
    });

    it('Should copy "Price to Earnings using FY2 Est" series color', function() {
      ChartHelpers.getSeriesColor('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2', 'Background', 1)
        .then(function(color) {
          priceToEarnigsFY2Color = color;
        });
    });

    it('Verifying if "Price to Earnings using FY1 Est" and "Price to Earnings using FY2 Est" series color are same', function() {
      if (priceToEarnigsFY1Color !== priceToEarnigsFY2Color) {
        expect(false).customError('"Price to Earnings using FY1 Est" and "Price to Earnings using FY2 Est" did not same');
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should copy "Price to Earnings" series color', function() {
      ChartHelpers.getSeriesColor('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 'Background')
        .then(function(color) {
          priceToEarnings = color;
        });
    });

    it('Verifying if "Price to Earnings" and "Price to Earnings using FY1 Est" series color are not same', function() {
      if (priceToEarnings === priceToEarnigsFY2Color) {
        expect(false).customError('"Price to Earnings" and "Price to Earnings using FY2 Est" same');
        CommonFunctions.takeScreenShot();
      }
    });

    var legends = ['Valuation', 'Estimates'];

    legends.forEach(function(legend) {
      it('Verifying if "' + legend + '" is as the chart legend', function() {
        ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
          if (val.indexOf(legend) < 0) {
            expect(false).customError('"' + legend + '" did not present as legend');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if only two legend are presented', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.length !== 2) {
          expect(false).customError('Only two legends did not present in chart');
          CommonFunctions.takeScreenShot();
        }
      });
      browser.sleep(5000);
    });

  });

  describe('Test Step ID: 474463', function() {

    it('Verifying if "Series 1" text is "Price to Earnings"', function() {
      browser.driver.executeScript(function() {
        var chartObject = $('.pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart;
        var series = chartObject.querySeriesPixel('Series 1');
        chartObject.hoverOnPixel(series.x, series.y - 3);
      }).then(function() {
        browser.driver.executeScript(function() {
          return $('.tf-tooltip').find('div').text();
        }).then(function(text) {
          if (text.indexOf('Price to Earnings') < 0) {
            console.log(text);
            expect(false).customError('"Price to Earnings" did not as Series 1 text');
            CommonFunctions.takeScreenShot();
          }
        });
      });
      browser.sleep(2000);
    });

    it('Should perform double click on "Price to Earnings"', function() {
      browser.driver.executeScript(function() {
        var chartObject = $('.pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart;
        var series = chartObject.querySeriesPixel('Series 1');
        chartObject.doubleClickOnPixel(series.x, series.y - 3);
      });
      browser.sleep(3000);
    });

    it('Verifying if all sectors are circle(Marker Chart)', function() {
      var sectors = function(i) {
        ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', i).then(function(style) {
          if (style !== 'Marker') {
            expect(false).customError('"All sectors did not in circle(Marker Chart)"; Found: ' + style);
            CommonFunctions.takeScreenShot();
          }
        });
      };

      ChartHelpers.getSeriesLength('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(seriesLength) {
        for (var i = 0; i < seriesLength; i++) {
          sectors(i);
        }
      });
    });

    it('Should click on chart toolbar wrench icon from "Price to Earnings"', function() {
      PA3MainPage.selectWrenchIcon('Price to Earnings');

      browser.sleep(2000);
    });

    it('Verifying if "Menu" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Menu" drop down did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Display Options" option to load from the wrench dropdown', function() {
      browser.wait(function() {
        return PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Display Options').isDisplayed().then(function(found) {
          return found;
        }, function() {
          return false;
        });
      }, 30000, 'Returns section was not expanded');
    });

    it('Verifying if "Display Options" is disabled in menu drop down', function() {
      ThiefHelpers.getOptionFromDropdown('Display Options').getAttribute('class').then(function(text) {
        if (text.indexOf('disabled') < 0) {
          expect(false).customError('"Display Options" did not disable');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 474464', function() {

    it('Should perform double click on "blank grid" in chart', function() {
      ChartHelpers.doubleClickOnPlot('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart');
      browser.sleep(8000);
    });

    var legends = ['Valuation', 'Estimates'];

    legends.forEach(function(legend) {
      it('Verifying if "' + legend + '" is as the chart legend', function() {
        ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
          if (val.indexOf(legend) < 0) {
            expect(false).customError('"' + legend + '" did not present as legend');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if only two legend are presented', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.length !== 2) {
          expect(false).customError('Only two legends did not present in chart');
          CommonFunctions.takeScreenShot();
        }
      });
      browser.sleep(5000);
    });

    it('Verifying if "Series 2" text is "Price to Earnings using FY1 Est"', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2');

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Price to Earnings using FY1 Est') < 0) {
          expect(false).customError('"Price to Earnings using FY1 Est" did not as Series 2 text');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should perform double click on "Price to Earnings using FY1 Est" in chart', function() {
      ChartHelpers.doubleClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2');
      browser.sleep(8000);
    });

    it('Verifying if "Price to Earnings using FY1 Est" is as the chart legends', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.indexOf('Price to Earnings using FY1 Est') < 0) {
          expect(false).customError('"Price to Earnings using FY1 Est" did not present as legend');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if only one legend is Price to Earnings using FY1 Est', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.length !== 1) {
          expect(false).customError('Only one legend did not present in chart');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if all sectors are displayed as "Price to Earnings using FY1 Est"', function() {
      var sectors = function() {
        browser.driver.executeScript(function() {
          return $('.tf-tooltip').find('div').text();
        }).then(function(text) {
          if (text.indexOf('Price to Earnings using FY1 Est') < 0) {
            expect(false).customError('"Price to Earnings using FY1 Est" did not displayed for all sectors');
            CommonFunctions.takeScreenShot();
          }
        });
      };

      ChartHelpers.getSeriesLength('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(seriesLength) {
        for (var i = 0; i < seriesLength; i++) {
          ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', i);
          sectors();
        }
      });
    });

  });

  describe('Test Step ID: 665640', function() {

    it('Should perform double click on "blank grid" in chart', function() {
      ChartHelpers.doubleClickOnPlot('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart');
      browser.sleep(8000);
    });

    var legends = ['Valuation', 'Estimates'];

    legends.forEach(function(legend) {
      it('Verifying if "' + legend + '" is as the chart legend', function() {
        ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
          if (val.indexOf(legend) < 0) {
            expect(false).customError('"' + legend + '" did not present as legend');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if only two legend are presented', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.length !== 2) {
          expect(false).customError('Only two legends did not present in chart');
          CommonFunctions.takeScreenShot();
        }
      });
      browser.sleep(5000);
    });

    it('Verifying if "Series 1" text is "Price to Earnings"', function() {
      browser.driver.executeScript(function() {
        var chartObject = $('.pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart;
        var p = chartObject.querySeriesPixel('Series 1');
        chartObject.hoverOnPixel(p.x, p.y + 3);
      });
      browser.sleep(2000);

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Price to Earnings') < 0) {
          expect(false).customError('"Price to Earnings" did not as Series 1 text');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should perform right click on "Price to Earnings"', function() {
      browser.driver.executeScript(function() {
        var chartObject = $('.pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart;
        var p = chartObject.querySeriesPixel('Series 1');
        chartObject.rightClickOnPixel(p.x, p.y + 3);
      });
    });

    it('Should select "Draw style" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Draw style').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "2D Column" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('2D Column').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
      browser.sleep(10000);
    });

    it('Verifying if "Chart" is "Columns" for "Series 1"', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(style) {
        if (style !== 'Columns') {
          expect(false).customError('Chart" showed is not "Columns" chart for Series 1. Instead Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var xAxisLabels1 = ['Price to Earnings', 'Price to Earnings using FY1 Est', 'Price to Earnings using FY2 Est'];

    xAxisLabels1.forEach(function(label, index) {
      it('Verifying if "' + label + '" is present in the order', function() {
        ChartHelpers.getXorYAxisLabels('.pa-chart-non-formatting-mode', '$fdsChartController', 'X').then(function(val) {
          if (label !== val[index]) {
            expect(false).customError('"' + label + '" did not present in order');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if only three labels are presented', function() {
      ChartHelpers.getXorYAxisLabels('.pa-chart-non-formatting-mode', '$fdsChartController', 'X').then(function(val) {
        if (val.length !== 3) {
          expect(false).customError('Only three labels did not present in chart');
          CommonFunctions.takeScreenShot();
        }
      });
      browser.sleep(5000);
    });

    it('Should perform right click on Series 1', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
      browser.sleep(2000);
    });

    it('Should select "Sort" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Sort').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Ascending" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Ascending').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
      browser.sleep(10000);
    });

    var legends1 = ['Valuation', 'Estimates'];

    legends1.forEach(function(legend, index) {
      it('Verifying if "' + legend + '" is as the chart legend', function() {
        ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
          if (legend !== val[index]) {
            expect(false).customError('"' + legend + '" did not present as legend');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if only two legend are presented', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.length !== 2) {
          expect(false).customError('Only two legends did not present in chart');
          CommonFunctions.takeScreenShot();
        }
      });
      browser.sleep(5000);
    });

    var xAxisLabels = ['Price to Earnings', 'Price to Earnings using FY2 Est', 'Price to Earnings using FY1 Est'];

    xAxisLabels.forEach(function(label, index) {
      it('Verifying if "' + label + '" is present in the order', function() {
        ChartHelpers.getXorYAxisLabels('.pa-chart-non-formatting-mode', '$fdsChartController', 'X').then(function(val) {
          if (label !== val[index]) {
            expect(false).customError('"' + label + '" did not present in order');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if only three labels are presented', function() {
      ChartHelpers.getXorYAxisLabels('.pa-chart-non-formatting-mode', '$fdsChartController', 'X').then(function(val) {
        if (val.length !== 3) {
          expect(false).customError('Only three labels did not present in chart');
          CommonFunctions.takeScreenShot();
        }
      });
      browser.sleep(5000);
    });

  });

  describe('Test Step ID: 665641', function() {

    it('Should click on chart toolbar wrench icon from "Price to Earnings"', function() {
      PA3MainPage.selectWrenchIcon('Price to Earnings');
    });

    it('Verifying if "Menu" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Menu" drop down did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Change Series" from wrench drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Change Series');
    });

    it('Verifying if "Change Series" drop down is opened', function() {
      ChangeSeries.getDialog('Change Series').isDisplayed().then(function(flag) {
        if (!flag) {
          expect(false).customError('Change Series drop down did not open');
          CommonFunctions.takeScreenShot();
        }
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
      TileOptions.isTileOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Tile Options" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from the LHP', function() {
      TileOptions.getLHPOption('Columns').click();

      // Verifying if "Columns" is selected in LHP
      TileOptions.getLHPOption('Columns').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Columns" did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "port" in the search field from Available section', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('port');

      // Verifying that "port" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== 'port') {
          expect(false).customError('"port" did not type into the search field.');
          CommonFunctions.takeScreenShot();
        }
      });

      // adding sleep time to appear the element
      browser.sleep(5000);
    });

    it('Should double click on "Port. Ending Weight" from Available section', function() {
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Port. Ending Weight').then(function(item) {
        item.select();
        item.doubleClick();
      });

      // Verifying item is moved in to selected section
      TileOptionsColumns.getElementFromSelectedSection('Port. Ending Weight').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Port. Ending Weight" did not move in to the "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from Tile Option Page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button from Tile Options page');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Weight" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if "Calculation Error" error dialog is not present', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should perform right click on Series 1', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
      browser.sleep(2000);
    });

    it('Should select "Sort" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Sort').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Alphabetical" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Alphabetical').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
      browser.sleep(10000);
    });

    it('Verifying if Series 2 is "Port. Ending Weight" text', function() {
      browser.driver.executeScript(function() {
        var chartObject = $('.pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart;
        var p = chartObject.querySeriesPixel('Series 2');
        chartObject.hoverOnPixel(p.x, p.y - 3);
      });
      browser.sleep(2000);
      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Port. Ending Weight') < 0) {
          expect(false).customError('"Port. Ending Weight" did not display for Series 2');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if Series 2 color is green for "Port. Ending Weight"', function() {
      ChartHelpers.getSeriesColor('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2', 'Background').then(function(color) {
        if (color !== '#99cc33') {
          expect(false).customError('Series did not in blue color; Found: ' + color);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var legends = ['Valuation', 'Estimates'];

    legends.forEach(function(legend, index) {
      it('Verifying if "' + legend + '" is as the chart legend', function() {
        ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
          if (legend !== val[index]) {
            expect(false).customError('"' + legend + '" did not present as legend');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if only two legend are presented', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.length !== 2) {
          expect(false).customError('Only two legends did not present in chart');
          CommonFunctions.takeScreenShot();
        }
      });
      browser.sleep(5000);
    });

    var xAxisLabels = ['Price to Earnings', 'Port. Ending Weight', 'Price to Earnings using FY1 Est', 'Price to Earnings using FY2 Est'];

    xAxisLabels.forEach(function(label, index) {
      it('Verifying if "' + label + '" is present in the order', function() {
        ChartHelpers.getXorYAxisLabels('.pa-chart-non-formatting-mode', '$fdsChartController', 'X').then(function(val) {
          if (label !== val[index]) {
            expect(false).customError('"' + label + '" did not present in order');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if only four labels are presented', function() {
      ChartHelpers.getXorYAxisLabels('.pa-chart-non-formatting-mode', '$fdsChartController', 'X').then(function(val) {
        if (val.length !== 4) {
          expect(false).customError('Only four labels did not present in chart');
          CommonFunctions.takeScreenShot();
        }
      });
      browser.sleep(5000);
    });

  });

  describe('Test Step ID: 665642', function() {

    it('Should perform right click on Series 1', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
      browser.sleep(2000);
    });

    it('Should select "Display Options" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Display Options').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Display Options" drop down is opened', function() {
      ChangeSeries.getDialog('Display Options').isDisplayed().then(function(flag) {
        if (!flag) {
          expect(false).customError('Display Options drop down did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Display Values" drop down and select "Top N"', function() {
      ThiefHelpers.selectOptionFromDropDown('Top N', 'Display Values');
    });

    it('Verifying if Display Values drop down is set to "Top N"', function() {
      ThiefHelpers.verifySelectedDropDownText('Top N', 'Display Values');
      browser.sleep(5000);
    });

    it('Should perform right click on Series 1', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
      browser.sleep(2000);
    });

    it('Should select "Draw style" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Draw style').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "2D Stacked" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('2D Stacked').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
      browser.sleep(10000);
    });

    it('Verifying if "Chart" is "Columns" chart for Series 1', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(style) {
        if (style !== 'Columns') {
          expect(false).customError('Chart" showed is not "Columns" chart for Series 1. Instead Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should perform right click on Series 2', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2');
    });

    it('Verifying if Series 2 color is green', function() {
      ChartHelpers.getSeriesColor('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2', 'Background').then(function(color) {
        if (color !== '#99cc33') {
          expect(false).customError('Series did not in blue color; Found: ' + color);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover on "Show Series Y-Axis" after perform right click', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Show Series Y-Axis').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "On Left" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('On Left').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should perform right click on Series 3', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 3');
    });

    it('Verifying if Series 3 color is maroon', function() {
      ChartHelpers.getSeriesColor('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 3', 'Background').then(function(color) {
        if (color !== '#9a3366') {
          expect(false).customError('Series did not in blue color; Found: ' + color);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Draw style" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Draw style').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Marker" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Marker').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
      browser.sleep(10000);
    });

    it('Verifying if "Chart" is "Marker" for "Series 3"', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 3').then(function(style) {
        if (style !== 'Marker') {
          expect(false).customError('Chart" showed is not "Marker" chart for Series 3. Instead Found: :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should perform right click on Circle', function() {
      browser.driver.executeScript(function() {
        var chartObject = $('.pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart;
        var p = chartObject.querySeriesPixel('Series 3', 1);
        chartObject.rightClickOnPixel(p.x, p.y - 8);
      });
    });

    it('Should hover on "Show Series Y-Axis" after perform right click', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Show Series Y-Axis').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "On Left" is selected by default', function() {
      var xpathOf2DIconAfterRightClick = CommonFunctions.replaceStringInXpath(ChartingUtilities.xpathIconAfterRightClick, 'On Left');
      element(by.xpath(xpathOf2DIconAfterRightClick)).isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"On Left" did not active by default');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
