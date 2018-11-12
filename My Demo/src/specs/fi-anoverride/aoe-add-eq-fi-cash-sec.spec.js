'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: aoe-add-eq-fi-cash-sec', function() {

  var overrideAbleColumnArray = [];
  var screenShot = 0;
  var overrideColumns = ['Average Life', 'Port. Beginning Effective Duration', 'Bench. Beginning Effective Duration', 'Port. Beginning Effective Convexity', 'Bench. Beginning Effective Convexity'];

  describe('Test Step ID: Startup Instructions', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 526810', function() {

    it('Should open PA3 Application with "Client:/Pa3/Fixed_income/PA3_FI_ANLTS_OVRDS"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('pa3-fi-anlts-ovrds');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('3 Factor Brinson Attribution');

    it('Verifying if "3 Factor Brinson Attribution" report is set to "26-MAR-2015 - 27-MAR-2015" date', function() {
      PA3MainPage.getDateHyperLink('3 Factor Brinson Attribution').getText().then(function(dateHyperLink) {
        if (dateHyperLink !== '26-MAR-2015 - 27-MAR-2015') {
          expect(false).customError('Expected: "26-MAR-2015 - 27-MAR-2015" date is not displayed instea' + 'd ' + dateHyperLink + ' displayed ');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 526812', function() {

    it('Should click on Wrench icon in the application.', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
        // Verifying if drop down menu appear
        PA3MainPage.getWrenchIcon(true).isPresent().then(function(option) {
          if (!option) {
            expect(false).customError('Menu list did not appear after clicking on Wrench button from application toolbar.');
            CommonFunctions.takeScreenShot();
          }
        });
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should check "Enable Overrides" option in "Analytics Overrides" sub-menu from the Wrench menu.', function() {
      PA3MainPage.setOptionFromWrenchMenu(true, 'Analytics Overrides|Enable Overrides').then(function(boolean) {
        if (!boolean) {
          expect(boolean).customError('Unable to check "Enable Overrides" option in "Analytics Overrides" sub-menu');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('3 Factor Brinson Attribution');

    it('Should click on Wrench icon in the application.', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
        // Verifying if drop down menu appear
        PA3MainPage.getWrenchIcon(true).isPresent().then(function(option) {
          if (!option) {
            expect(false).customError('Menu list did not appear after clicking on Wrench button from application toolbar.');
            CommonFunctions.takeScreenShot();
          }
        });
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should check "Show Only Override Columns" option in "Analytics Overrides" sub-menu from the Wrench menu.', function() {
      PA3MainPage.setOptionFromWrenchMenu(true, 'Analytics Overrides|Show Only Override Columns').then(function(boolean) {
        if (!boolean) {
          expect(boolean).customError('Unable to check "Show Only Override Columns" option in "Analytics ' + 'Overrides" sub-menu');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('3 Factor Brinson Attribution');

    it('Should get "Override-able" columns from "3 Factor Brinson Attribution" report and store it for future use', function() {
      PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('3 Factor Brinson Attribution', 1).then(function(overrideArray) {
        for (var i = 0; i < overrideArray.length; i++) {
          overrideAbleColumnArray.push(overrideArray[i].replace(/<br>/g, ' '));
        }
      });
    });

    it('Verifying if only "Average Life", "Port Beginning Effective Duration", "Bench Beginning Effective Duration",' + '"Port Beginning Effective Convexityzzz" and "Bench Beginning Effective Convexity" "Override-able" columns are displayed' + 'in "3 Factor Brinson Attribution" report', function() {
      overrideColumns.forEach(function(columnName) {
        var column = 0;
        for (var i = 0; i < overrideAbleColumnArray.length; i++) {
          if (columnName === overrideAbleColumnArray[i]) {
            column++;
          }
        }

        if (column === 0) {
          screenShot++;
          expect(false).customError(columnName + ' column is not displayed');
        } else if (column > 1) {
          expect(false).customError(columnName + ' column displayed more than once');
        }
      });

      if (screenShot > 0) {
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test Step ID: 527238', function() {

    it('Should right click on "Average Life value for Corporate group" in "3 Factor Brinson Attribution" report', function() {
      SlickGridFunctions.getCellReference('3 Factor Brinson Attribution', 'Corporate', '', 'Average Life', '').then(function(elementRef) {
        PA3MainPage.rightClickOnGivenElement(elementRef).then(function(clickStatus) {
          if (!clickStatus) {
            expect(false).customError('Unable to right click on "Average Life value for Corporate ' + 'group" in "3 Factor Brinson Attribution" report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Override Security Value" is not displayed in the menu after right clicking', function() {
      PA3MainPage.getOptionAfterRightClickOnReport('Override Security Value').isPresent().then(function(optionStatus) {
        if (optionStatus) {
          expect(false).customError('"Override Security Value" is displayed in the menu after right clicking');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 527240', function() {

    it('Should right click on "Port Beginning Effective Duration" column header in "3 Factor Brinson Attribution"' + ' report', function() {
      SlickGridFunctions.getHeaderCellReference('3 Factor Brinson Attribution', 'Port. Beginning Effective D' + 'uration', '').then(function(columnHeaderRef) {
        PA3MainPage.rightClickOnGivenElement(columnHeaderRef).then(function(clickStatus) {
          if (!clickStatus) {
            expect(false).customError('Unable to right click on "Port Beginning Effective Duration" co' + 'lumn header in "3 Factor Brinson Attribution" report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Override Security Value" is not displayed in the menu after right clicking', function() {
      PA3MainPage.getOptionAfterRightClickOnReport('Override Security Value').isPresent().then(function(optionStatus) {
        if (optionStatus) {
          expect(false).customError('"Override Security Value" is displayed in the menu after right clicking');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 527244', function() {

    it('Should expand "Treasury" in the "3 Factor Brinson Attribution" report', function() {
      PA3MainPage.expandTreeInCalculatedReport('3 Factor Brinson Attribution', 'Treasury');
    });

    it('verifying if "Treasury" is expanded in the "3 Factor Brinson Attribution" report', function() {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('3 Factor Brinson Attribution', 'Treasury');
    });

    it('Should right click on "Average Life column value" for the security - "912828UW" in the ' + '"3 Factor Brinson Attribution" report', function() {
      SlickGridFunctions.getCellReference('3 Factor Brinson Attribution', '912828UW', 'Ticker', 'Averag' + 'e Life', '').then(function(cellRef) {
        PA3MainPage.rightClickOnGivenElement(cellRef).then(function(clickStatus) {
          if (!clickStatus) {
            expect(false).customError('Unable to perform right click operation on "Average Life column value"' + 'for the security - "912828UW" in the "3 Factor Brinson Attribution" report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should select "Override Security Value" in the displayed menu', function() {
      PA3MainPage.getOptionAfterRightClickOnReport('Override Security Value…').isPresent().then(function(optionStatus) {
        if (optionStatus) {
          PA3MainPage.getOptionAfterRightClickOnReport('Override Security Value…').click().then(function() {
          }, function() {

            expect(false).customError('Unable to select "Override Security Value" in the displayed menu');
            CommonFunctions.takeScreenShot();
          });
        } else {
          expect(false).customError('"Override Security Value" is not displayed in the menu');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Analytics Override Editor" dialog has appeared.', function() {
      ThiefHelpers.isDialogOpen('Analytics Override Editor').then(function(dialogBoxStatus) {
        if (!dialogBoxStatus) {
          expect(false).customError('"Analytics Override Editor" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Identifier" widget populates "912828UW"', function() {
      ThiefHelpers.getTextBoxClassReference('Identifier').getText().then(function(text) {
        if (text !== '912828UW') {
          expect(false).customError('"Identifier" widget should populate "912828UW" instead "' + text + '" is displaying');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Start Date" shows "Earliest"', function() {
      ThiefHelpers.getDatepickerClassReference('Start Date').getDate().then(function(date) {
        if (date !== 'Earliest') {
          expect(false).customError('"Start Date" should display "Earliest" instead "' + date + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "End Date" shows "Previous Close"', function() {
      ThiefHelpers.getDatepickerClassReference('End Date').getDate().then(function(date) {
        if (date !== 'Previous Close') {
          expect(false).customError('"End Date" should display "Previous Close" instead "' + date + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Analytic" drop down displays "Average Life"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Analytic').getSelectedText().then(function(drpDwnSelectedItem) {
        if (drpDwnSelectedItem !== 'Average Life') {
          expect(false).customError('"Analytic" drop down should displays "Average Life" inste' + 'ad "' + drpDwnSelectedItem + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 527249', function() {

    it('Should click on "Clear" button in "Analytics Override Editor" dialog', function() {
      ThiefHelpers.getButtonClassReference('Clear').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Clear" button in "Analytics Override Editor" dialog');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should type "FDS-US" in "Identifier" widget', function() {
      ThiefHelpers.getTextBoxClassReference('Identifier').setText('FDS-US');
    });

    it('Verifying if "Identifier" widget populates "FDS-US"', function() {
      ThiefHelpers.getTextBoxClassReference('Identifier').getText().then(function(text) {
        if (text !== 'FDS-USA') {
          expect(false).customError('"Identifier" widget should populate "FDS-US" instead "' + text + '" is displaying');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should set "Start Date" to "15-JUN-2015"', function() {
      ThiefHelpers.getDatepickerClassReference('', AnalyticsOverrideEditor.xpathStartDate).setDate('15-JUN-2015');
    });

    it('Verifying if "Start Date" shows "15-JUN-2015"', function() {
      ThiefHelpers.getDatepickerClassReference('', AnalyticsOverrideEditor.xpathStartDate).getDate().then(function(date) {
        if (date !== '15-JUN-2015') {
          expect(false).customError('"Start Date" date is not set to "15-JUN-2015" instead "' + date + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should set "End Date" to "16-JUN-2015"', function() {
      ThiefHelpers.getDatepickerClassReference('', AnalyticsOverrideEditor.xpathEndDate).setDate('16-JUN-2015');
    });

    it('Verifying if "End Date" shows "16-JUN-2015"', function() {
      ThiefHelpers.getDatepickerClassReference('', AnalyticsOverrideEditor.xpathEndDate).getDate().then(function(date) {
        if (date !== '16-JUN-2015') {
          expect(false).customError('"End Date" date is not set to "16-JUN-2015" instead "' + date + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Analytic" dropdown and select "Effective Duaration"', function() {
      ThiefHelpers.selectOptionFromDropDown('Effective Duration', 'Analytic');
    });

    it('Verifying if "Analytic" drop down displays "Effective Duration"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Analytic').getSelectedText().then(function(drpDwnSelectedItem) {
        if (drpDwnSelectedItem !== 'Effective Duration') {
          expect(false).customError('"Analytic" drop down should displays "Effective Duration" inste' + 'ad "' + drpDwnSelectedItem + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "999.89" in "Value" field', function() {
      ThiefHelpers.getTextBoxClassReference('Value').setText(999.89);
    });

    it('Verifying if "Value" field populates "999.89"', function() {
      ThiefHelpers.getTextBoxClassReference('Value').getText().then(function(text) {
        if (text !== '999.89') {
          expect(false).customError('"Value" field should populate "999.89" instead "' + text + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Add" buutton in "Analytics Override Editor" dialog', function() {
      ThiefHelpers.getButtonClassReference('Add').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Add" button in "Analytics Override Editor" dialog');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Override" is added to the last row in the "Preview section" and is in view', function() {
      // Wating to load new override in the "Preview" section
      browser.sleep(3000);

      // Fetching row count in the grid
      AnalyticsOverrideEditor.getAllRows(true).then(function(rowsCount) {
        // Fetching last row date
        AnalyticsOverrideEditor.getRowData(rowsCount - 1).then(function(rowData) {

          // Please see known issue RPD:23296940
          if (rowData[0] === 'FDS-US') {
            expect(false).customError('Update the code');
          }

          if (rowData[0] === 'FDS-USA') {
            AnalyticsOverrideEditor.getCellReference(rowsCount - 1, 'Identifier').then(function(rowRef) {
              rowRef.isDisplayed().then(function(rowStatus) {
                if (!rowStatus) {
                  expect(rowStatus).customError('Newly added "Override" is not in view');
                  CommonFunctions.takeScreenShot();
                }
              }, function(error) {

                expect(false).customError(error);
              });
            });
          } else {
            expect(false).customError('"Override" is not added');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if newly added "Override" in the "Preview" section shows the fields "Identifier" as "FDS-USA", ' + '"Value" as "999.8900", "Start Date" as "15-JUN-2015" and "End Date"  as "16-JUN-2016"', function() {
      var screenShot = 0;
      browser.executeScript(function() {
        var dataItem;
        var dataItems = $('.tf-slick-grid:eq(1)').data('$tfSlickGridController').grid.getData().getItems();
        dataItems.forEach(function(dataObject) {

          // Please see known issue RPD:23296940
          if (dataObject.sym === 'FDS-US') {
            expect(false).customError('Update the code');
          }

          if (dataObject.sym === 'FDS-USA') {
            dataItem = dataObject;
          }
        });

        return dataItem;
      }).then(function(dataObject) {
        if (dataObject.startDate !== 20150615) {
          expect(false).customError('"Start Date" is not matching exepected: inst' + 'ead "' + dataObject.startDate + '" displayed');
          screenShot++;
        }

        if (dataObject.endDate !== 20150616) {
          expect(false).customError('Newly added ""');
          screenShot++;
        }

        if (dataObject.value !== 999.89) {
          expect(false).customError('Newly added ""');
          screenShot++;
        }
      });

      if (screenShot > 0) {
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test Step ID: 527258', function() {

    it('Should click on "Clear" button in "Analytics Override Editor" dialog', function() {
      ThiefHelpers.getButtonClassReference('Clear').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Clear" button in "Analytics Override Editor" dialog');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should type "KR6009543531" in "Identifier" widget and press "Tab" key', function() {
      ThiefHelpers.getTextBoxClassReference('Identifier').setText('KR6009543531');
    });

    it('Verifying if "Identifier" widget populates "KR6009543531"', function() {
      ThiefHelpers.getTextBoxClassReference('Identifier').getText().then(function(text) {
        if (text !== 'KR6009543531') {
          expect(false).customError('"Identifier" widget should populate "KR6009543531" inste' + 'ad "' + text + '" is displaying');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should set "Start Date" to "15-JUN-2015"', function() {
      ThiefHelpers.getDatepickerClassReference('', AnalyticsOverrideEditor.xpathStartDate).setDate('15-JUN-2015');
    });

    it('Verifying if "Start Date" shows "15-JUN-2015"', function() {
      ThiefHelpers.getDatepickerClassReference('', AnalyticsOverrideEditor.xpathStartDate).getDate().then(function(date) {
        if (date !== '15-JUN-2015') {
          expect(false).customError('"Start Date" date is not set to "15-JUN-2015" instead "' + date + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should set "End Date" to "16-JUN-2015"', function() {
      ThiefHelpers.getDatepickerClassReference('', AnalyticsOverrideEditor.xpathEndDate).setDate('16-JUN-2015');
    });

    it('Verifying if "End Date" shows "16-JUN-2015"', function() {
      ThiefHelpers.getDatepickerClassReference('', AnalyticsOverrideEditor.xpathEndDate).getDate().then(function(date) {
        if (date !== '16-JUN-2015') {
          expect(false).customError('"End Date" date is not set to "16-JUN-2015" instead "' + date + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Analytic" dropdown and select "Effective Duaration"', function() {
      ThiefHelpers.selectOptionFromDropDown('Effective Duration', 'Analytic');
    });

    it('Verifying if "Analytic" drop down displays "Effective Duration"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Analytic').getSelectedText().then(function(drpDwnSelectedItem) {
        if (drpDwnSelectedItem !== 'Effective Duration') {
          expect(false).customError('"Analytic" drop down should displays "Effective Duration" inste' + 'ad "' + drpDwnSelectedItem + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "888.99" in "Value" field', function() {
      ThiefHelpers.getTextBoxClassReference('Value').setText(888.99);
    });

    it('Verifying if "Value" field populates "888.99"', function() {
      ThiefHelpers.getTextBoxClassReference('Value').getText().then(function(text) {
        if (text !== '888.99') {
          expect(false).customError('"Value" field should populate "888.99" instead "' + text + '" is displaying');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Add" button in "Analytics Override Editor" dialog', function() {
      ThiefHelpers.getButtonClassReference('Add').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Add" button in "Analytics Override Editor" dialog');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Override" is added in the "Preview section" and is in view', function() {
      // Fetching row count from the grid
      AnalyticsOverrideEditor.getAllRows(true).then(function(rowsCount) {
        // Fetching last row data
        AnalyticsOverrideEditor.getRowData(rowsCount - 1).then(function(rowData) {
          if (rowData[0] === 'KR6009543531') {
            AnalyticsOverrideEditor.getCellReference(rowsCount - 1, 'Identifier').then(function(rowRef) {
              rowRef.isDisplayed().then(function(rowStatus) {
                if (!rowStatus) {
                  expect(rowStatus).customError('Newly added "Override" is not in view');
                  CommonFunctions.takeScreenShot();
                }
              }, function(error) {

                expect(false).customError(error);
              });
            });
          } else {
            expect(false).customError('"Override" is not added');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if newly added "Override" in the "Preview" section shows the fields "Identifier" as "KR6009543531", ' + '"Value" as "888.8900", "Start Date" as "15-JUN-2015" and "End Date"  as "16-JUN-2016"', function() {
      var screenShot = 0;
      browser.executeScript(function() {
        var dataItem;
        var dataItems = $('.tf-slick-grid:eq(1)').data('$tfSlickGridController').grid.getData().getItems();
        dataItems.forEach(function(dataObject) {
          if (dataObject.sym === 'KR6009543531') {
            dataItem = dataObject;
          }
        });

        return dataItem;
      }).then(function(dataObject) {
        if (dataObject.startDate !== 20150615) {
          expect(false).customError(dataObject.startDate);
          screenShot++;
        }

        if (dataObject.endDate !== 20150616) {
          expect(false).customError(dataObject.endDate);
          screenShot++;
        }

        if (dataObject.value !== 888.99) {
          expect(false).customError(dataObject.value);
          screenShot++;
        }
      });

      if (screenShot > 0) {
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test Step ID: 527275', function() {

    it('Should click on "Clear" button in "Analytics Override Editor" dialog', function() {
      ThiefHelpers.getButtonClassReference('Clear').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Clear" button in "Analytics Override Editor" dialog');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should type "FDS-US" in "Identifier" widget and press "Tab" key', function() {
      ThiefHelpers.getTextBoxClassReference('Identifier').setText('FDS-US');
    });

    it('Verifying if "Identifier" widget populates "FDS-US"', function() {
      ThiefHelpers.getTextBoxClassReference('Identifier').getText().then(function(text) {
        if (text !== 'FDS-USA') {
          expect(false).customError('"Identifier" widget should populate "FDS-US" instead "' + text + '" is displaying');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should set "Start Date" to "15-JUN-2015"', function() {
      ThiefHelpers.getDatepickerClassReference('', AnalyticsOverrideEditor.xpathStartDate).setDate('15-JUN-2015');
    });

    it('Verifying if "Start Date" shows "15-JUN-2015"', function() {
      ThiefHelpers.getDatepickerClassReference('', AnalyticsOverrideEditor.xpathStartDate).getDate().then(function(date) {
        if (date !== '15-JUN-2015') {
          expect(false).customError('"Start Date" date is not set to "15-JUN-2015" instead "' + date + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should set "End Date" to "16-JUN-2015"', function() {
      ThiefHelpers.getDatepickerClassReference('', AnalyticsOverrideEditor.xpathEndDate).setDate('16-JUN-2015');
    });

    it('Verifying if "End Date" shows "16-JUN-2015"', function() {
      ThiefHelpers.getDatepickerClassReference('', AnalyticsOverrideEditor.xpathEndDate).getDate().then(function(date) {
        if (date !== '16-JUN-2015') {
          expect(false).customError('"End Date" date is not set to "16-JUN-2015" instead "' + date + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Analytic" dropdown and select "Effective Duaration"', function() {
      ThiefHelpers.selectOptionFromDropDown('Effective Duration', 'Analytic');
    });

    it('Verifying if "Analytic" drop down displays "Effective Duration"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Analytic').getSelectedText().then(function(drpDwnSelectedItem) {
        if (drpDwnSelectedItem !== 'Effective Duration') {
          expect(false).customError('"Analytic" drop down should displays "Effective Duration" inste' + 'ad "' + drpDwnSelectedItem + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "1000" in "Value" field', function() {
      ThiefHelpers.getTextBoxClassReference('Value').setText(1000);
    });

    it('Verifying if "Value" field populates "1000"', function() {
      ThiefHelpers.getTextBoxClassReference('Value').getText().then(function(text) {
        if (text !== '1000') {
          expect(false).customError('"value" field should populate "1000" instead "' + text + '" is displaying');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Add" button in "Analytics Override Editor" dialog', function() {
      ThiefHelpers.getButtonClassReference('Add').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Add" button in "Analytics Override Editor" dialog');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Analytics Override Editor" dialog box is opened', function() {
      ThiefHelpers.isDialogOpen('Analytics Override Editor', 2).then(function(dialogBoxStatus) {
        if (!dialogBoxStatus) {
          expect().customError('"Analytics Override Editor" dialog is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Analytics Override Editor" dialog box stating "Override data already exists."', function() {
      ThiefHelpers.getDialogClassReference('Analytics Override Editor', 2).getContent().getText().then(function(dialogContent) {
        if (dialogContent !== 'Override data already exists.') {
          expect().customError('"Analytics Override Editor" dialog box should state "Override data already ' + 'exists." instead "' + dialogContent + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Analytics Override Editor" dialog box contains "OK" button', function() {
      ThiefHelpers.getDialogButton('Analytics Override Editor', 'OK', 2).isPresent().then(function(buttonStatus) {
        if (!buttonStatus) {
          expect().customError('"Analytics Override Editor" dialog box does not contains "OK" button');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 527285', function() {

    it('Should click on "OK" button in "Analytics Override Editor" pop-up', function() {
      ThiefHelpers.getDialogButton('Analytics Override Editor', 'OK', 2).click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button in "Analytics Override Editor" pop-up');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Cancel" button in "Analytics Override Editor" dialog', function() {
      ThiefHelpers.getDialogButton('Analytics Override Editor', 'Cancel').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Cancel" button in "Analytics Override Editor" dialog');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Analytics Override Editor" dialog box is closed', function() {
      ThiefHelpers.isDialogOpen('Analytics Override Editor').then(function(dialogBoxStatus) {
        if (dialogBoxStatus) {
          expect(false).customError('"Analytics Override Editor" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 527288', function() {

    // Unable to expand "[Cash]" as a work-around first collapsed "Treasury" and next expanding "[Cash]"
    it('Should collapse "Treasury" in the "3 Factor Brinson Attribution" report', function() {
      PA3MainPage.expandTreeInCalculatedReport('3 Factor Brinson Attribution', 'Treasury');
    });

    it('Should expand "Cash" in the "3 Factor Brinson Attribution" report', function() {
      PA3MainPage.expandTreeInCalculatedReport('3 Factor Brinson Attribution', '[Cash]');
    });

    it('verifying if "Cash" is expanded in the "3 Factor Brinson Attribution" report', function() {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('3 Factor Brinson Attribution', '[Cash]');
    });

    it('Should right click on "Average Life column value" for "Euro" in the ' + '"3 Factor Brinson Attribution" report', function() {
      SlickGridFunctions.getCellReference('3 Factor Brinson Attribution', 'Euro', '', 'Averag' + 'e Life', '').then(function(cellRef) {
        PA3MainPage.rightClickOnGivenElement(cellRef).then(function(clickStatus) {
          if (!clickStatus) {
            expect(false).customError('Unable to perform right click operation on "Average Life column value"' + 'for "Euro" in the "3 Factor Brinson Attribution" report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should select "Override Security Value" in the displayed menu', function() {
      PA3MainPage.getOptionAfterRightClickOnReport('Override Security Value…').isPresent().then(function(optionStatus) {
        if (optionStatus) {
          PA3MainPage.getOptionAfterRightClickOnReport('Override Security Value…').click().then(function() {
          }, function() {

            expect(false).customError('Unable to select "Override Security Value" in the displayed menu');
            CommonFunctions.takeScreenShot();
          });
        } else {
          expect(false).customError('"Override Security Value" is not displayed in the menu');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Analytics Override Editor" dialog has appeared.', function() {
      ThiefHelpers.isDialogOpen('Analytics Override Editor').then(function(dialogBoxStatus) {
        if (!dialogBoxStatus) {
          expect(false).customError('"Analytics Override Editor" dialog is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Identifier" widget populates "CASH_EUR"', function() {
      ThiefHelpers.getTextBoxClassReference('Identifier').getText().then(function(text) {
        if (text !== 'CASH_EUR') {
          expect(false).customError('"Identifier" widget should populate "CASH_EUR" instead "' + text + '" is displaying');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Start Date" shows "Earliest"', function() {
      ThiefHelpers.getDatepickerClassReference('Start Date').getDate().then(function(date) {
        if (date !== 'Earliest') {
          expect(false).customError('"Start Date" should display "Earliest" instead "' + date + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "End Date" shows "Previous Close"', function() {
      ThiefHelpers.getDatepickerClassReference('End Date').getDate().then(function(date) {
        if (date !== 'Previous Close') {
          expect(false).customError('"End Date" should display "Previous Close" instead "' + date + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Analytic" drop down displays "Average Life"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Analytic').getSelectedText().then(function(drpDwnSelectedItem) {
        if (drpDwnSelectedItem !== 'Average Life') {
          expect(false).customError('"Analytic" drop down should displays "Average Life" inste' + 'ad "' + drpDwnSelectedItem + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 527289', function() {

    it('Should enter "333" in  "Value" field', function() {
      ThiefHelpers.getTextBoxClassReference('Value').setText(333);
    });

    it('Should click on "Add" button in "Analytics Override Editor" dialog', function() {
      ThiefHelpers.getButtonClassReference('Add').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Add" button in "Analytics Override Editor" dialog');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Analytics Override Editor" dialog box is opened', function() {
      ThiefHelpers.isDialogOpen('Analytics Override Editor', 2).then(function(dialogBoxStatus) {
        if (!dialogBoxStatus) {
          expect(false).customError('"Analytics Override Editor" dialog is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Analytics Override Editor" dialog box stating "Override not applicable to the selected security."', function() {
      ThiefHelpers.getDialogClassReference('Analytics Override Editor', 2).getContent().getText().then(function(dialogContent) {
        if (dialogContent !== 'Override not applicable to the selected security.') {
          expect(false).customError('"Analytics Override Editor" dialog box should state "Override not applicable' + ' to the selected security." instead "' + dialogContent + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 527291', function() {

    it('Should click on "OK" button in "Analytics Override Editor" pop-up', function() {
      ThiefHelpers.getDialogButton('Analytics Override Editor', 'OK', 2).click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button in "Analytics Override Editor" pop-up');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Cancel" button in "Analytics Override Editor" dialog', function() {
      ThiefHelpers.getDialogButton('Analytics Override Editor', 'Cancel').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Cancel" button in "Analytics Override Editor" dialog');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Analytics Override Editor" dialog box is closed', function() {
      ThiefHelpers.isDialogOpen('Analytics Override Editor').then(function(dialogBoxStatus) {
        if (dialogBoxStatus) {
          expect(false).customError('"Analytics Override Editor" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
