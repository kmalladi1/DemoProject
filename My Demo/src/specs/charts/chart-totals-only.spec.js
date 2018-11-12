'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: chart-totals-only', function() {

  describe('Test Step ID: 470040', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:;PA3;Charts;CHART_DOC', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('chart-doc');
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

    it('Verifying if "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 470041', function() {

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

    it('Should type "PA3_Test.acct" in Portfolio box and select "PA3_TEST.ACCT | Client:" from drop down', function() {
      PA3MainPage.setPortfolio('PA3_Test.acct', 'PA3_TEST.ACCT | Client:', 'Client:PA3_TEST.ACCT').then(function(option) {
        if (!option) {
          expect(false).customError('Not able to Type "PA3" into "Portfolio"' + ' widget and select "PA3_TEST.ACCT | Client:" from type ahead');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
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

    it('Should right click on "Price to Earnings" column and select "Custom Charts > Column"', function() {
      var eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Weights');
      eleRefs.each(function(ref) {
        ref.getText().then(function(text) {
          var name = text.replace(/\n/g, ' ');
          if (name === 'Price to Earnings') {
            PA3MainPage.rightClickAndSelectOption(ref, 'Custom Charts|Column');
          }
        }, function(error) {
          if (error.name === 'StaleElementReferenceError') {
            eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Weights');
            eleRefs.then(function(references) {
              references.forEach(function(eleRef) {
                eleRef.getText().then(function(text) {
                  var name = text.replace(/\n/g, ' ');
                  if (name === 'Price to Earnings') {
                    PA3MainPage.rightClickAndSelectOption(eleRef, 'Custom Charts|Column');
                  }
                });
              });
            });
          } else {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          }
        });
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

    it('Verifying if "Chart" is "Column" chart', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(style) {
        if (style !== 'Columns') {
          expect(false).customError('"Chart" did not "Column" chart; Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 470048', function() {

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
  });

  describe('Test Step ID: 470130', function() {

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
      ThiefHelpers.getDropDownSelectClassReference('Display Values').getSelectedText().then(function(text) {
        if (text !== 'Totals') {
          expect(false).customError('Display Values drop down did not set to "Totals"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Weights - Sections" report to close the Display drop down', function() {
      PA3MainPage.getReports('Weights - Sections').click();

      // Verifying if "Weights - Sections" report is highlighted
      PA3MainPage.getReports('Weights - Sections').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('Weights - Sections report did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Total" is as the chart legend', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.indexOf('Total') < 0) {
          expect(false).customError('"Total" did not present as legend');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if only one legend is Total', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.length !== 1) {
          expect(false).customError('Only one legend did not present in chart');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover on data series and verifying "Price to EarningsTotal" is series', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 0);
      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Price to EarningsTotal') < 0) {
          expect(false).customError('"Price to EarningsTotal" is not present in the chart');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover on data series and verifying "Price to Earnings using FY1 Est" is series', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 1);
      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Price to Earnings using FY1 Est') < 0) {
          expect(false).customError('"Price to Earnings using FY1 Est" is not present in the chart');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover on data series and verifying "Price to Earnings using FY2 Est" is series', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 2);
      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Price to Earnings using FY2 Est') < 0) {
          expect(false).customError('"Price to Earnings using FY2 Est" is not present in the chart');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 470404', function() {

    it('Should double click "Price Earnings" in "Chart"', function() {
      ChartHelpers.doubleClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
      browser.sleep(8000);
    });

    it('Should wait for the "chart" to load', function() {
      browser.driver.wait(function() {
        return ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
          return val.indexOf('Price to Earnings') >= 0;
        });
      }, 5000, 'Chart was not loaded even after waiting for 5 seconds').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Price to Earnings" is as the chart legends', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.indexOf('Price to Earnings') < 0) {
          expect(false).customError('"Price to Earnings" did not present as legend');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if only one legend is Price to Earnings', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.length !== 1) {
          expect(false).customError('Only one legend did not present in chart');
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

    it('Verifying if "Display Options" is disabled in menu drop down', function() {
      ThiefHelpers.getOptionFromDropdown('Display Options').getAttribute('class').then(function(text) {
        if (text.indexOf('disabled') < 0) {
          expect(false).customError('"Display Options" did not disable');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 474444', function() {

    it('Should click on chart toolbar wrench icon from "Price to Earnings" to close wrench drop down', function() {
      PA3MainPage.selectWrenchIcon('Price to Earnings');
    });

    it('Verifying if "Menu" drop down is closed', function() {
      ThiefHelpers.isDropDownOpen().then(function(flag) {
        if (flag) {
          expect(false).customError('"Menu" drop down did not close');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should perform double click on "blank grid" in chart', function() {
      ChartHelpers.doubleClickOnPlot('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart');
      browser.sleep(8000);
    });

    it('Verifying if "Total" is as the chart legends', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.indexOf('Total') < 0) {
          expect(false).customError('"Total" did not present as legend');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if only one legend is Total', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.length !== 1) {
          expect(false).customError('Only one legend did not present in chart');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should perform double click on "Price to Earnings using FY1 Est" in chart', function() {
      ChartHelpers.doubleClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 1);
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
          expect(false).customError('One legend did not present in chart');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 470414', function() {

    it('Should click on the "Wrench" icon in the "Price to Earnings" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Price to Earnings').click().then(function() {
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

    it('Should select "Monthly" from "Report Frequency:" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Monthly', 'Report Frequency:');
    });

    it('Verifying if  "Report Frequency:" drop down is set to "Monthly"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Report Frequency:').getSelectedText().then(function(text) {
        if (text !== 'Monthly') {
          expect(false).customError('"Report Frequency:" drop down did not set to "Monthly"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should set the "Start date" to "8/31/2016"', function() {
      ThiefHelpers.setDateInCalendar('8/31/2016');
    });

    it('Verify that "Start Date" field is showing "8/31/2016"', function() {
      ThiefHelpers.getDatepickerClassReference('Start Date:').getDate().then(function(text) {
        if (text !== '8/31/2016') {
          expect(false).customError('Start Date is not set to "8/31/2016" instead found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should set the "End date" to "11/30/2016"', function() {
      ThiefHelpers.setDateInCalendar('11/30/2016', 2);
    });

    it('Verify that "End Date" field is showing "11/30/2016"', function() {
      ThiefHelpers.getDatepickerClassReference('End Date:').getDate().then(function(text) {
        if (text !== '11/30/2016') {
          expect(false).customError('End Date is not set to "11/30/2016" instead found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait to process the request (RPD:41035011)
      browser.sleep(2000);
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

    it('Should hover on first "blue" data series and verifying "31-AUG-2016" is part of data series', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('31-AUG-2016') < 0) {
          expect(false).customError('"31-AUG-2016" did not present');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover on second "blue" data series and verifying "30-SEP-2016" is part of data series', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 1);

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('30-SEP-2016') < 0) {
          expect(false).customError('"30-SEP-2016" did not present');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover on third "blue" data series and verifying "31-OCT-2016" is part of data series', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 2);

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('31-OCT-2016') < 0) {
          expect(false).customError('"31-OCT-2016" did not present');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover on fourth "blue" data series and verifying "30-NOV-2016" is part of data series', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 3);

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('30-NOV-2016') < 0) {
          expect(false).customError('"30-NOV-2016" did not present');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Total" is highlighted in "Interactive pane"', function() {
      ThiefHelpers.getVirtualListboxClassReference().getItemByText('Total').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Total" is not highlighted in "Interactive pane"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 470413', function() {

    it('Should click on the "Wrench" icon in the "Price to Earnings" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Price to Earnings').click().then(function() {
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

    it('Should select "Single" from "Report Frequency:" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Single', 'Report Frequency:');
    });

    it('Verifying if  "Report Frequency:" drop down is set to "Single"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Report Frequency:').getSelectedText().then(function(text) {
        if (text !== 'Single') {
          expect(false).customError('"Report Frequency:" drop down did not set to "Single"');
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

    it('Should click on chart toolbar wrench icon from "Price to Earnings"', function() {
      PA3MainPage.selectWrenchIcon('Price to Earnings');

      CommonFunctions.captureScreenShot('AfterClickOnWrench');
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

    it('Verifying if "Display Options" dialog is opened', function() {
      ChangeSeries.getDialog('Display Options').isDisplayed().then(function(flag) {
        if (!flag) {
          expect(false).customError('Display Options drop down did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if Display Values drop down is set to "All Values"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Display Values').getSelectedText().then(function(text) {
        if (text !== 'All Values') {
          expect(false).customError('Display Values drop down did not set to "All Values"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 471265', function() {

    it('Should click on "Display Values" drop down and select "Totals"', function() {
      ThiefHelpers.selectOptionFromDropDown('Totals', 'Display Values');
    });

    it('Verifying if Display Values drop down is set to "Totals"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Display Values').getSelectedText().then(function(text) {
        if (text !== 'Totals') {
          expect(false).customError('Display Values drop down did not set to "Totals"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Color By:" drop down and select "Section"', function() {
      ThiefHelpers.selectOptionFromDropDown('Section', 'Color By:');
    });

    it('Verifying if Color By: drop down is set to "Section"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Color By:').getSelectedText().then(function(text) {
        if (text !== 'Section') {
          expect(false).customError('Color By: drop down did not set to "Section"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Weights - Sections" report to close the Display drop down', function() {
      PA3MainPage.getReports('Weights - Sections').click();

      // Verifying if "Weights - Sections" report is highlighted
      PA3MainPage.getReports('Weights - Sections').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('Weights - Sections report did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var priceToEarnigsFY1Color;
    var priceToEarnigsFY2Color;
    var priceToEarnings;

    it('Should copy "Price to Earnings using FY1 Est" series color', function() {
      ChartHelpers.getSeriesColor('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2', 'Background').then(function(color) {
        priceToEarnigsFY1Color = color;
      });
    });

    it('Should copy "Price to Earnings using FY2 Est" series color', function() {
      ChartHelpers.getSeriesColor('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2', 'Background', 1).then(function(color) {
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
      ChartHelpers.getSeriesColor('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 'Background').then(function(color) {
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

  describe('Test Step ID: 471268', function() {

    it('Should perform right click on chart', function() {
      // Perform right click directly because pixel is not getting by Series name
      browser.driver.executeScript(function() {
        $('.pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart.rightClickOnPixel(512, 273);
      });
    });

    it('Should click on "Change Series" from wrench drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Change Series').click().then(function() {
      }, function(err) {
        expect(false).customError('Unable to click on "Change Series"' + err);
        CommonFunctions.takeScreenShot();
      });
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

    var arr = ['Valuation', 'Estimates'];

    arr.forEach(function(text) {
      it('Should click on "X" icon next to the "' + text + '"', function() {
        // Getting the xpath of the Selected section
        var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');
        var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText(text);
        item.getActions().then(function(actions) {
          actions.triggerAction('remove');
        });
      });

      it('Verifying if "' + text + '" is not presented in Selected section', function() {
        TileOptionsColumns.getElementFromSelectedSection(text).isPresent().then(function(flag) {
          if (flag) {
            expect(false).customError('"' + text + '" presented in Selected section');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {
          if (error.name === 'Index out of bound') {
            expect(false).customError('"' + text + '" is not present under "Client" directory');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should enter "earnings" in the search field from Available section', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('earnings');

      // Verifying that "earnings" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== 'earnings') {
          expect(false).customError('"earnings" did not type into the search field.');
          CommonFunctions.takeScreenShot();
        }
      });

      // adding sleep time to appear the element
      browser.sleep(5000);
    });

    var lists = ['Price to Earnings', 'Price to Earnings using FY1 Est', 'Price to Earnings using FY2 Est'];

    lists.forEach(function(text) {
      it('Should double click on "' + text + '" from Available section', function() {
        // Getting the xpath of the Available section
        var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');
        var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

        group.getItemByText(text).then(function(item) {
          item.select();
          item.doubleClick();
        });
      });
    });

    var items = ['Ticker', 'Security Name', 'Price to Earnings', 'Price to Earnings using FY1 Est', 'Price to Earnings using FY2 Est'];

    items.forEach(function(text) {
      it('Verifying if "' + text + '" is presented in Selected section', function() {
        TileOptionsColumns.getElementFromSelectedSection(text).isPresent().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + text + '" did not present in Selected section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Ticker" is disabled in selected section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Ticker').$('.pa-hidden-col').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Ticker" is not disabled in selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 471269', function() {

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

    it('Verifying if "Color By:" drop down is disabled', function() {
      element(by.xpath(PA3MainPage.xpathOfColorByDropDown)).getAttribute('class').then(function(text) {
        if (text.indexOf('disabled') < 0) {
          expect(false).customError('"Color By:" drop down did not disable');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 470560', function() {

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

    it('Should select "Pie" from the "Chart Type" drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Chart Type|Pie').click();

      // Adding slip time to appear the Pie Chart
      browser.sleep(5000);
    });

    it('Verifying if "Chart" is "3D Pie" chart', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(style) {
        if (style !== '3D Pie') {
          expect(false).customError('"Chart" did not "3D Pie" chart; Found :' + style);
          CommonFunctions.takeScreenShot();
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

    it('Should click on "Display Values" drop down and select "Less than"', function() {
      ThiefHelpers.selectOptionFromDropDown('Less than', 'Display Values');
    });

    it('Verifying if Display Values drop down is set to "Less than"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Display Values').getSelectedText().then(function(text) {
        if (text !== 'Less than') {
          expect(false).customError('Display Values drop down did not set to "Less than"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "20" in the search field from Available section', function() {
      ThiefHelpers.getTextBoxClassReference('Values').setText('20');

      // Verifying that "20" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Values').getText().then(function(text) {
        if (text !== '20') {
          expect(false).customError('"20" did not type into the search field.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "All Sectors" with less than "20%"', function() {
      var sectors = function() {
        browser.driver.executeScript(function() {
          return $('.tf-tooltip').find('div').text();
        }).then(function(text) {
          var temp = text.split(' ');
          if (parseFloat(temp[6]) > 20) {
            expect(false).customError('"All Sectors" did not less than 20');
            CommonFunctions.takeScreenShot();
          }
        });
      };

      ChartHelpers.getSeriesLength('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(numberOfSector) {
        for (var i = 0; i < numberOfSector - 1; i++) {
          ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', i);
          sectors();
        }
      });
    });

    it('Verifying if grouping is displayed "Groups Greater Than 20%"', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 3);

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {

        // Sector value is changing dynamically so We have to change index value dynamically
        if (text.indexOf('Groups Greater Than 20%') < 0) {
          ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 2);

          browser.driver.executeScript(function() {
            return $('.tf-tooltip').find('div').text();
          }).then(function(text) {
            if (text.indexOf('Groups Greater Than 20%') < 0) {
              expect(false).customError('Grouping did not display "Groups Greater Than 20%"');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });
    });
  });

  describe('Test Step ID: 592541', function() {

    it('Should click on "Display Values" drop down and select "Greater than"', function() {
      ThiefHelpers.selectOptionFromDropDown('Greater than', 'Display Values');
    });

    it('Verifying if Display Values drop down is set to "Greater than"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Display Values').getSelectedText().then(function(text) {
        if (text !== 'Greater than') {
          expect(false).customError('Display Values drop down did not set to "Greater than"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "30" in the search field from Available section', function() {
      ThiefHelpers.getTextBoxClassReference('Values').setText('30');

      // Verifying that "30" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Values').getText().then(function(text) {
        if (text !== '30') {
          expect(false).customError('"30" did not type into the search field.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "All Sectors" with greater than "30%"', function() {
      var sectors = function(index) {
        ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', index);
        browser.driver.executeScript(function() {
          return $('.tf-tooltip').find('div').text();
        }).then(function(text) {
          var temp = text.split(' ');
          if (parseFloat(temp[8]) < 30) {
            expect(false).customError('"All Sectors" did not greater than 30');
            CommonFunctions.takeScreenShot();
          }
        });
      };

      ChartHelpers.getSeriesLength('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(numberOfSector) {
        for (var i = 0; i < numberOfSector; i++) {
          sectors(i);
        }
      });
    });

    it('Verifying if grouping is displayed "Groups Less Than 30%"', function() {
      var count = 0;
      var getToolTipText = function() {
        return browser.driver.executeScript(function() {
          return $('.tf-tooltip').find('div').text();
        }).then(function(text) {
          if (text.indexOf('Groups Less Than 30%') !== -1) {
            count = count + 1;
          }
        });
      };

      ChartHelpers.getSeriesLength('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(numberOfSector) {
        for (var i = 0; i < numberOfSector; i++) {
          ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', i);

          getToolTipText();
        }
      }).then(function() {
        if (count < 1) {
          expect(false).customError('Grouping did not display "Groups Less Than 30%"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 592542', function() {

    it('Should click on "Display Values" drop down and select "Top/Bottom N"', function() {
      ThiefHelpers.selectOptionFromDropDown('Top/Bottom N', 'Display Values');
    });

    it('Verifying if Display Values drop down is set to "Top/Bottom N"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Display Values').getSelectedText().then(function(text) {
        if (text !== 'Top/Bottom N') {
          expect(false).customError('Display Values drop down did not set to "Top/Bottom N"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
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

    it('Verifying if "10" sector are displayed in chart', function() {
      ChartHelpers.getSeriesLength('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(sectorNumber) {
        // 1 extra sector for "Remaining Groups"
        if (sectorNumber !== 11) {
          expect(false).customError('"10" sectors did not display');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Remaining Groups" sector is display', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 10);

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Remaining Groups') < 0) {
          expect(false).customError('Grouping did not display "Remaining Groups"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
