'use strict';
/*global XPathResult:true*/
require(__dirname + '/../../index.js');

describe('Test Case: aoe-date', function() {

  // Variables
  var startDate;
  var endDate;

  describe('Test Step ID: 654297', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Fixed_income/PA3_FI_OVERRIDE_EX2"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('pa3-fi-override-ex2');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should click on the "Wrench" button on the application toolbar', function() {
      PA3MainPage.selectWrenchIcon();

      // Verifying if drop down menu appear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('Wrench icon is not present');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check "Enable Overrides" option in "Analytics Overrides" sub-menu from the Wrench menu.', function() {
      PA3MainPage.setOptionFromWrenchMenu(true, 'Analytics Overrides|Enable Overrides').then(function(option) {
        if (!option) {
          expect(false).customError('Not able to check "Enable Overrides" option in "Analytics Overrides" ' +
            'sub-menu from the Wrench menu.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that the "Weights" report is calculated with the Date as "15-JUN-2015 - 26-JUN-2015" ', function() {
      PA3MainPage.getDateHyperLink('15-JUN-2015 - 26-JUN-2015').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"15-JUN-2015 - 26-JUN-2015" grouping is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Security Name" grouping is displayed in "Weights" report', function() {
      PA3MainPage.getGroupingsHyperLink('Security Name').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Security Name" grouping is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 519398', function() {

    it('Should Right Click on "Port. Ending Spread Duration" column value for the first security (88579YAE) in the ' +
      'report list and click "Override Security Value"', function() {
      SlickGridFunctions.getCellReference('Weights', '88579YAE', 'Symbol', 'Port. Ending Spread Duration',
        '').then(function(cellRef) {
        PA3MainPage.rightClickAndSelectOption(cellRef, 'Override Security Value…');
      });
    });

    it('Verifying if "Analytics Override Editor" dialog box appeared', function() {
      ThiefHelpers.isDialogOpen('Analytics Override Editor').then(function(option) {
        if (!option) {
          expect(false).customError('Analytics Override Editor" dialog is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying the existence of "Dropdown control" next to "Start Date" field in "Analytics Override Editor" section', function() {
      CommonFunctions.isDisplayed('Button', undefined, AnalyticsOverrideEditor.xpathStartDateDD).then(function(value) {
        if (!value) {
          expect(false).customError('"Dropdown control" next to "Start Date" field is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying the existence of "Dropdown control" next to "End Date" field in "Analytics Override Editor" section', function() {
      CommonFunctions.isDisplayed('Button', undefined, AnalyticsOverrideEditor.xpathEndDateDD).then(function(value) {
        if (!value) {
          expect(false).customError('"Dropdown control" next to "End Date" field is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Calendar icon" is displayed next to "Start Date" field in "Analytics Override Editor" section', function() {
      CommonFunctions.isDisplayed('Datepicker', 'Start Date').then(function(value) {
        if (!value) {
          expect(false).customError('"Calendar icon" is not displayed next to "Start Date" field in ' +
            '"Analytics Override Editor" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Calendar icon" is displayed next to "End Date" field in "Analytics Override Editor" section', function() {
      CommonFunctions.isDisplayed('Datepicker', 'End Date').then(function(value) {
        if (!value) {
          expect(false).customError('"Calendar icon" is not displayed next to "End Date" field in ' +
            '"Analytics Override Editor" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that the "Start Date" field shows "Earliest"', function() {
      ThiefHelpers.getDatepickerClassReference('Start Date').getDate().then(function(value) {
        if (value !== 'Earliest') {
          expect(false).customError('Start date value is not displayed as Earliest');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that the "End Date" field shows "Previous Close"', function() {
      ThiefHelpers.getDatepickerClassReference('End Date').getDate().then(function(value) {
        if (value !== 'Previous Close') {
          expect(false).customError('End date value is not displayed as Previous Close');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 519399', function() {

    it('Should select first row in the "PREVIEW section" of the "Editor dialog" ', function() {
      AnalyticsOverrideEditor.getCellReference('0', 'Identifier').then(function(element) {
        element.click().then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });

      // Verifying if first row is selected
      AnalyticsOverrideEditor.getCellReference('0', 'Identifier').then(function(element) {
        element.getAttribute('class').then(function(value) {
          if (value.indexOf('active') === -1) {
            expect(false).customError('First row is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      // Storing the "Start Date" value from Analytics dialog and storing it in Variables
      AnalyticsOverrideEditor.getCellReference(0, 'Start Date').then(function(element) {
        element.getText().then(function(value) {
          startDate = value;
        });
      });

      // Storing the "End Date" value from Analytics dialog and storing it in Variables
      AnalyticsOverrideEditor.getCellReference(0, 'End Date').then(function(element) {
        endDate = element.getText().then(function(value) {
          endDate = value;
        });
      });
    });

    it('Verify that "Start Date" now reflect the same as the corresponding date fields in the selected Preview row', function() {
      ThiefHelpers.getDatepickerClassReference('Start Date').getDate().then(function(value) {
        if (startDate !== value) {
          expect(false).customError('"Start date" does not reflect the same as the corresponding date ' +
            'fields in the selected Preview row. Expected: ' + startDate + ', found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify the "End Date" now reflect the same as the corresponding date fields in the selected Preview row', function() {
      ThiefHelpers.getDatepickerClassReference('End Date').getDate().then(function(value) {
        if (endDate !== value) {
          expect(false).customError('"End Date" does not reflect the same as the corresponding date ' +
            'fields in the selected Preview row. Expected: ' + endDate + ', found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should delete the value in the "Start Date" Field', function() {
      ThiefHelpers.getDatepickerClassReference('Start Date').setDate('').then(function() {
        // Verifying if Start Date field is blank
        ThiefHelpers.getDatepickerClassReference('Start Date').getDate().then(function(value) {
          if (value !== '') {
            expect(false).customError('"Start date" value is not deleted');
            CommonFunctions.takeScreenShot();
          }
        });
      }, function() {
      });
    });

    it('Verifying "Red Warning" icon is displayed', function() {
      AnalyticsOverrideEditor.getWarningIconFromInputField('Start Date').isDisplayed().then(function() {
        },

        function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Should click on warning icon and verify popup displayed with "Invalid Date" text', function() {
      ThiefHelpers.getTextBoxClassReference('Start Date').getErrors().then(function(text) {
        if (text[0] !== 'Invalid date') {
          expect(false).customError('"Invalid Date" is not displayed after clicking on "Red Warning Icon"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Closing "Warning Icon"', function() {
      AnalyticsOverrideEditor.getWarningIconFromInputField('Start Date').click().then(function() {
        browser.sleep(4000);
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Clicking on "Drop Down" Icon', function() {
      browser.executeScript(function(xpath) {
        var element = document.evaluate(xpath, document,
          null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        element.click();
      }, AnalyticsOverrideEditor.xpathStartDateDD);
    });

    it('Selecting "Earliest" option from "Start Date" drop down', function() {
      ThiefHelpers.getOptionFromDropdown('Earliest').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify that the "Start Date" field now again shows "Earliest"', function() {
      ThiefHelpers.getDatepickerClassReference('Start Date').getDate().then(function(value) {
        if (value !== 'Earliest') {
          expect(false).customError('Start date value is not displayed as Earliest');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 519433', function() {

    it('Should select 1st June 2015 from the calender', function() {
      AnalyticsOverrideEditor.setDateUsingCalendar('Start Date', '01-Jun-2015');
    });

    it('Verifying that the Start Date field now shows "01-Jun-2015"', function() {
      ThiefHelpers.getDatepickerClassReference('Start Date').getDate().then(function(value) {
        if (value !== '01-Jun-2015') {
          expect(false).customError('Start date value is not displayed as "01-Jun-2015"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 519432', function() {

    it('Should delete the value in the "End Date" Field', function() {
      // Delete the value in Start Date Field
      ThiefHelpers.getDatepickerClassReference('End Date').setDate('').then(function() {
        ThiefHelpers.getDatepickerClassReference('End Date').getDate().then(function(value) {
          if (value !== '') {
            expect(false).customError('End date value is not deleted');
            CommonFunctions.takeScreenShot();
          }
        });
      }, function() {
      });
    });

    it('Verifying "Red Warning" icon is displayed', function() {
      AnalyticsOverrideEditor.getWarningIconFromInputField('End Date').isDisplayed().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on warning icon and verify popup displayed with "Invalid Date" text', function() {
      ThiefHelpers.getTextBoxClassReference('End Date').getErrors().then(function(text) {
        if (text[0] !== 'Invalid date') {
          expect(false).customError('"Invalid Date" is not displayed after clicking on "Red Warning Icon"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Closing "Warning Icon"', function() {
      AnalyticsOverrideEditor.getWarningIconFromInputField('End Date').click().then(function() {
        browser.sleep(4000);
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Clicking on "Drop Down" Icon', function() {
      browser.executeScript(function(xpath) {
        var element = document.evaluate(xpath, document,
          null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        element.click();
      }, AnalyticsOverrideEditor.xpathEndDateDD);
    });

    it('Should select "Previous Close" option from "End Date" drop down', function() {
      ThiefHelpers.getOptionFromDropdown('Previous Close').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that the End Date field now again shows "Previous Close"', function() {
      ThiefHelpers.getDatepickerClassReference('End Date').getDate().then(function(value) {
        if (value !== 'Previous Close') {
          expect(false).customError('End date value is not displayed as Previous Close');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 519434', function() {

    it('Should click on the Calender icon next to End date field ', function() {
      ThiefHelpers.getDatepickerClassReference('End Date');
    });

    it('Should select 5th June 2015 on the calendar that pop up', function() {
      AnalyticsOverrideEditor.setDateUsingCalendar('End Date', '05-Jun-2015');
    });

    it('Verifying that the End Date field now shows "05-Jun-2015"', function() {
      ThiefHelpers.getDatepickerClassReference('End Date').getDate().then(function(value) {
        if (value !== '05-Jun-2015') {
          expect(false).customError('End Date field is not showing "05-Jun-2015"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 532776', function() {

    it('Should Click on "Cancel" button in the "Analytic Override Editor dialog"', function() {
      ThiefHelpers.getButtonClassReference('Cancel').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Analytics Override Editor" dialog box disappears', function() {
      ThiefHelpers.isDialogOpen('Analytics Override Editor').then(function(option) {
        if (option) {
          expect(false).customError('Analytics Override Editor" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Date Options', 'Dates', 'Document Options');

    it('Should select on "YYMMDD" option from "Date Format:" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('YYMMDD', 'Date Format:');
    });

    it('Verifying "YYMMDD" option is selected from "Date Format:" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('YYMMDD', 'Date Format:');
    });

    it('Should click on "OK" button of "Document Options" mode header', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying "Document Options" page is closed', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(value) {
        if (value) {
          expect(false).customError('Document Options mode is not Closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        }
      });
    });

    it('Verifying if any dialog box appeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should right click on Port. Ending Spread Duration column value for 88579YAE and click on ' +
      '"Override Security Value.." ', function() {
      SlickGridFunctions.getCellReference('Weights', '88579YAE', 'Symbol',
        'Port. Ending Spread Duration', '').then(function(cellRef) {
        PA3MainPage.rightClickAndSelectOption(cellRef, 'Override Security Value…');
      });
    });

    it('Verifying if "Analytics Override Editor" dialog box appeared', function() {
      ThiefHelpers.isDialogOpen('Analytics Override Editor').then(function(option) {
        if (!option) {
          expect(false).customError('Analytics Override Editor" dialog is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Start Date" column values are displayed with dates in the format of "YYMMDD"', function() {
      var startDate = function(i) {
        AnalyticsOverrideEditor.getRowData(i).then(function(val) {
          Utilities.isValidYYMMDD(val[2]);
        });
      };

      AnalyticsOverrideEditor.getAllRows(true).then(function(value) {
        for (var i = 0; i < value - 1; i++) {
          startDate(i);
        }
      });
    });

    it('Verifying that "End Date" column values are displayed with dates in the format of "YYMMDD"', function() {
      var endDate = function(i) {
        AnalyticsOverrideEditor.getRowData(i).then(function(val) {
          Utilities.isValidYYMMDD(val[3]);
        });
      };

      AnalyticsOverrideEditor.getAllRows(true).then(function(value) {
        for (var i = 0; i < value - 1; i++) {
          endDate(i);
        }
      });
    });
  });

  describe('Test Step ID: 532778', function() {

    it('Should select "Start Date" as "22 June 2015" from the calender', function() {
      AnalyticsOverrideEditor.setDateUsingCalendar('Start Date', '22-Jun-2015');
    });

    it('Verifying that the "Start Date" field now shows "150622"', function() {
      ThiefHelpers.getDatepickerClassReference('Start Date').getDate().then(function(value) {
        if (value !== '150622') {
          expect(false).customError('Start date value is not showing "150622"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "End Date" as "26-June-2015"', function() {
      AnalyticsOverrideEditor.setDateUsingCalendar('End Date', '26-Jun-2015');
    });

    it('Verifying that the "End Date" field now shows "150626"', function() {
      ThiefHelpers.getDatepickerClassReference('End Date').getDate().then(function(value) {
        if (value !== '150626') {
          expect(false).customError('End date value is not displayed as "150626"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "344444" in "Value" field', function() {
      ThiefHelpers.getTextBoxClassReference('Value').setText('344444');
    });

    it('Verifying that the "Value" field now shows "344444"', function() {
      ThiefHelpers.getTextBoxClassReference('Value').getText().then(function(value) {
        if (value !== '344444') {
          expect(false).customError('Value field is not displaying number as 344444');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying  "Client"  option is selected by default in "Save Location" dropdown', function() {
      ThiefHelpers.verifySelectedDropDownText('Client', 'Save Location');
    });

    it('Should  Click on Add button', function() {
      ThiefHelpers.getButtonClassReference('Add').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that the override-row is added to the end of the list in PREVIEW section ', function() {
      //Verify that the override-row is added to the end of the list in PREVIEW section
      AnalyticsOverrideEditor.getAllRows(true).then(function(value) {
        AnalyticsOverrideEditor.getRowData(value - 1).then(function(val) {
          if (val[0] !== '88579YAE') {
            expect(false).customError('Override-row is not added to the end of the list in PREVIEW section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying that "Start Date" column value shows "150622" for the row that is added to the end of the list ' +
      'in PREVIEW section ', function() {
      AnalyticsOverrideEditor.getAllRows(true).then(function(value) {
        AnalyticsOverrideEditor.getRowData(value - 1).then(function(val) {
          if (val[2] !== '150622') {
            expect(false).customError('"Start Date" column value does not shows "150622" for the row ' +
              'that is added to the end of the list in PREVIEW section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying that "End Date" column value shows "150626" for the row that is added to the end of the list ' +
      'in PREVIEW section ', function() {
      AnalyticsOverrideEditor.getAllRows(true).then(function(value) {
        AnalyticsOverrideEditor.getRowData(value - 1).then(function(val) {
          if (val[3] !== '150626') {
            expect(false).customError('"End Date" column value does not shows "150626" for the row ' +
              'that is added to the end of the list in PREVIEW section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should Click on "Cancel" button in the "Analytic Override Editor dialog"', function() {
      ThiefHelpers.getButtonClassReference('Cancel').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Analytics Override Editor" dialog box disspaears', function() {
      ThiefHelpers.isDialogOpen('Analytics Override Editor').then(function(option) {
        if (option) {
          expect(false).customError('Analytics Override Editor" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
