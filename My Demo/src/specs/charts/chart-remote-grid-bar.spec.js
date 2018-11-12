'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: chart-remote-grid-bar', function() {

  describe('Test Step ID: 554893', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should select "Performance" from LHP in "Performance" category', function() {
      PA3MainPage.getReports('Performance').click();

      // Verifying if "Performance" is highlighted in LHP
      PA3MainPage.getReports('Performance').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Performance" did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 554894', function() {

    it('Should type "CLIENT:/PA3/ACCOUNTS/EQUITY_ACCOUNT.ACCT" into "Portfolio" widget and select ' +
      '"Client:/pa3/accounts/EQUITY_ACCOUNT.ACCT" from type ahead', function() {
      PA3MainPage.setPortfolio('CLIENT:/PA3/ACCOUNTS/EQUITY_ACCOUNT.ACCT', 'Client:/pa3/accounts/EQUITY_ACCOUNT.ACCT',
        'Client:/pa3/accounts/EQUITY_ACCOUNT.ACCT')
        .then(function(option) {
            if (!option) {
              expect(false).customError('Not able to Type "CLIENT:/PA3/ACCOUNTS/EQUITY_ACCOUNT.ACCT" into "Portfolio"' +
                ' widget and select "Client:/pa3/accounts/EQUITY_ACCOUNT.ACCT" from type ahead');
              CommonFunctions.takeScreenShot();
            }
          },

          function(error) {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
    });

    it('Verifying if "Client:/pa3/accounts/EQUITY_ACCOUNT.ACCT" is set in to the Portfolio text box', function() {
      PA3MainPage.getWidgetBox('Portfolio').getAttribute('value').then(function(text) {
        if (text !== 'Client:/pa3/accounts/EQUITY_ACCOUNT.ACCT') {
          expect(false).customError('"Client:/pa3/accounts/EQUITY_ACCOUNT.ACCT" did not set to ' +
            '"Portfolio" text box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "SPN:OEX" is set in to the Benchmark text box', function() {
      PA3MainPage.getWidgetBox('Benchmark').getAttribute('value').then(function(text) {
        if (text !== 'SPN:OEX') {
          expect(false).customError('"SPN:OEX" did not set to "Benchmark" text box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 554895', function() {

    it('Should click maximize square box in "Performance Over Time" tile', function() {
      PA3MainPage.getMaximizeOrMinimizeWindowButton('Performance Over Time').click();

      // Verifying if Report is maximized
      PA3MainPage.getMaximizeOrMinimizeWindowButton('Performance Over Time').getAttribute('ng-if').then(function(text) {
        if (text.indexOf('maximize') < 0) {
          expect(false).customError('Report did not maximize');
          CommonFunctions.takeScreenShot();
        }
      });

      browser.sleep(5000);
    });

    it('Verifying if "Total" is highlighted in "Interactive pane"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference().getItemByText('Total');
      group.isSelected().then(function(bool) {
        if (bool !== true) {
          expect(false).customError('"Total" did not highlight in "Interactive pane"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 554896', function() {

    var arr = ['MC Quintile 1', 'MC Quintile 2', 'MC Quintile 3', 'MC Quintile 4', 'MC Quintile 5'];
    var arrValues = [];

    it('Should click on "Wrench" icon available in Workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Performance Over Time').click();
    });

    it('Should select "Stacked Area" from the "Chart Type" drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Chart Type|Stacked Area').click();
    });

    it('Fetching complete values values of "' + arr + '" from the report', function() {
      arr.forEach(function(optionName) {
        PA3MainPage.getElementFromInteractivePane('Portfolio Total Return', optionName, true).getText().then(function(text) {
          arrValues.push(text);
        });
      });
    });

    it('Verifying if "' + arr + '" are highlighted in "Interactive pane"', function() {
      arrValues.forEach(function(value, index) {
        ThiefHelpers.getVirtualListboxClassReference().getGroupByText(value).isSelected().then(function(bool) {
          if (bool !== true) {
            expect(false).customError('"' + arr[index] + '" did not highlight in "Interactive pane"');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 554897', function() {

    it('Should click on "MC Quintile 1" to select in Interactive pane', function() {
      PA3MainPage.getElementFromInteractivePane('Portfolio Total Return', 'MC Quintile 1', true).getText().then(function(value) {
        ThiefHelpers.getVirtualListboxClassReference().getGroupByText(value).select();
      });
      browser.sleep(2000);
    });

    it('Verifying if "Value" legend is present in the "Factor Returns" chart', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(arrLegends) {
        if (arrLegends.length === 1) {
          if (arrLegends[0].indexOf('MC Quintile 1') < 0) {
            expect(false).customError('"MC Quintile 1" legend is not present in chart, found: ' + arrLegends);
            CommonFunctions.takeScreenShot();
          }
        } else {
          expect(false).customError('Expected legend length after clicking on MC Quintile 1 is one but found: ' + arrLegends.length);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if only one series is presented in the chart', function() {
      ChartHelpers.getNumberOfSeriesInChart('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart')
        .then(function(count) {
          if (count !== 1) {
            expect(false).customError('Only one series did not present in the chart');
            CommonFunctions.takeScreenShot();
          }
        });
    });

  });

  describe('Test Step ID: 554898', function() {

    var arr = ['MC Quintile 2', 'MC Quintile 3', 'MC Quintile 4', 'MC Quintile 5'];
    var arrValues = [];

    it('Fetching complete text of "' + arr + '" from the report', function() {
      arr.forEach(function(optionName) {
        PA3MainPage.getElementFromInteractivePane('Portfolio Total Return', optionName, true).getText().then(function(text) {
          arrValues.push(text);
        });
      });
    });

    it('Should click on "' + arr + '" from "Interactive pane" holding control key', function() {
      arrValues.forEach(function(value) {
        ThiefHelpers.getVirtualListboxClassReference().getGroupByText(value).select(true);
      });

    });

    it('Fetching "MC Quintile 1" complete text from the report', function() {
      PA3MainPage.getElementFromInteractivePane('Portfolio Total Return', 'MC Quintile 1', true).getText().then(function(text) {
        arrValues.push(text);
      });
    });

    it('Verifying if "' + arr + '" are highlighted in "Interactive pane"', function() {
      arrValues.forEach(function(value) {
        ThiefHelpers.getVirtualListboxClassReference().getGroupByText(value).isSelected().then(function(bool) {
          if (bool !== true) {
            expect(false).customError('"' + value + '" did not highlight in "Interactive pane"');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 554899', function() {

    it('Should click on the "Wrench" icon in the "Portfolio Total Return" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Portfolio Total Return').click().then(function() {
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

    it('Should select year drop down from Start Date widget', function() {
      TileOptionsDates.getMonthOrYearDropDown('Start Date', 'Year').click();
    });

    it('Should select year as "2014" from the year drop down', function() {
      TileOptionsDates.getOption('2014').click();

      // Verifying that Year is selected as "2014"
      TileOptionsDates.getMonthOrYearDropDown('Start Date', 'Year').getText().then(function(text) {
        if (text !== '2014') {
          expect(false).customError('"2014" did not set for "Start Date" Year drop down ; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select month drop down from Start Date Widget', function() {
      TileOptionsDates.getMonthOrYearDropDown('Start Date', 'Month').click();
    });

    it('Should select month as "October"', function() {
      TileOptionsDates.getOption('October').click();

      // Verifying that Year is selected as "October"
      TileOptionsDates.getMonthOrYearDropDown('Start Date', 'Month').getText().then(function(text) {
        if (text !== 'October') {
          expect(false).customError('"October" did not set for "Start Date" Month drop down ; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select day as "24" from the  "Start Date" calender widget', function() {
      TileOptionsDates.getDay('24', 'Start Date').click();

      // Verifying if 24 is highlighted in Calender
      TileOptionsDates.getDay('24', 'Start Date').getAttribute('class').then(function(text) {
        if (text.indexOf('active') < 0) {
          expect(false).customError('"24" did not highlight in "Start Date" Calender');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select year drop down from End Date widget', function() {
      TileOptionsDates.getMonthOrYearDropDown('End Date', 'Year').click();
    });

    it('Should select year as "2015" from year drop down', function() {
      TileOptionsDates.getOption('2015').click();

      // Verifying that Year is selected as "2015"
      TileOptionsDates.getMonthOrYearDropDown('End Date', 'Year').getText().then(function(text) {
        if (text !== '2015') {
          expect(false).customError('"2015" did not set for End Date Year drop down ; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select month drop down from End Date Widget', function() {
      TileOptionsDates.getMonthOrYearDropDown('End Date', 'Month').click();
    });

    it('Should select month as "October"', function() {
      TileOptionsDates.getOption('October').click();

      // Verifying that Year is selected as "October"
      TileOptionsDates.getMonthOrYearDropDown('End Date', 'Month').getText().then(function(text) {
        if (text !== 'October') {
          expect(false).customError('"October" did not set for End Date Month drop down ; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select day as "23" from the calender', function() {
      TileOptionsDates.getDay('23', 'End Date').click();

      // Verifying if 23 is highlighted in Calender
      TileOptionsDates.getDay('23', 'End Date').getAttribute('class').then(function(text) {
        if (text.indexOf('active') < 0) {
          expect(false).customError('"23" did not highlight in "Calender"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options" mode', function() {
      TileOptions.getHeaderButton('OK').click();
    });

    it('Should wait for "Contribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    var arr1 = ['MC Quintile 1', 'MC Quintile 2', 'MC Quintile 3', 'MC Quintile 4', 'MC Quintile 5', '[N/A]'];
    var arrValues = [];

    it('Fetching complete values values of "' + arr1 + '" from the report', function() {
      arr1.forEach(function(optionName) {
        PA3MainPage.getElementFromInteractivePane('Portfolio Total Return', optionName, true).getText().then(function(text) {
          arrValues.push(text);
        }, function(error) {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Verifying if "' + arr1 + '" are highlighted in "Interactive pane"', function() {
      arrValues.forEach(function(value, index) {
        ThiefHelpers.getVirtualListboxClassReference().getGroupByText(value).isSelected().then(function(bool) {
          if (bool !== true) {
            expect(false).customError('"' + arr1[index] + '" did not highlight in "Interactive pane"');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Verifying if only six series is presented in the chart', function() {
      ChartHelpers.getNumberOfSeriesInChart('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart')
        .then(function(count) {
          if (count !== 6) {
            expect(false).customError('Only six series did not present in the chart');
            CommonFunctions.takeScreenShot();
          }
        });
    });

  });

});
