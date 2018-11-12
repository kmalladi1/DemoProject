'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: dates-super-rel', function() {

  describe('Test Step ID: 406890', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch PA3 application with "Client:;default_doc_dates" document open by default', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-dates');
    });

    it('Verifying if "Calculation Error" error dialog is not present', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 394627', function() {

    // Select Dates tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Dates');

  });

  describe('Test Step ID: 394628', function() {

    it('Verifying if "End Date" text box contains "Latest"', function() {
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(value) {
        if (value !== 'Latest') {
          expect(false).customError('"Latest" option did not present in End Date text box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should clear "Latest" and enter "-1D" from End Date text box', function() {
      ThiefHelpers.getTextBoxClassReference('End Date:').setText('-1D');

      // Verifying "-1D"  is entered in End Date text box
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(value) {
        if (value !== '-1D') {
          expect(false).customError('End Date text box did not contain "-1D"');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Verifying if End Date calendar is showing one day prior to the trading date', function() {
      // Creating date object
      var hour;
      var date = new Date();
      var date1 = new Date();
      hour = date.getHours();

      // Applying logic to start the business
      if (hour < 18) {
        date1.setDate(date.getDate() - 1);
      }

      // Storing day name in variable
      var weekday = date1.getDay();

      // Applying logic for five day calender
      if (weekday === 0 || weekday === 7) {
        // Setting date to Friday if today is Sunday
        date1.setDate(date1.getDate() - 2);
      } else if (weekday === 6) {
        // Setting date to Friday if today is Saturday
        date1.setDate(date1.getDate() - 1);
      }

      // Setting date2 object to one day before the trading day
      date1.setDate(date1.getDate() - 1);

      // Storing day name in variable
      weekday = date1.getDay();

      // Applying logic for five day calender
      if (weekday === 0 || weekday === 7) {
        // Setting date to Friday if one day before trading date is Sunday
        date1.setDate(date1.getDate() - 2);
      } else if (weekday === 6) {
        // Setting date to Friday if one day before trading date is Saturday
        date1.setDate(date1.getDate() - 1);
      }

      var month = date1.getMonth() + 1;

      var year = date1.getFullYear();

      var previousDate = date1.getDate();

      // Verifying if calendar drop down month is current month
      ThiefHelpers.getVirtualDropDownSelectClassReference(undefined, TileOptionsDates.xpathOfEndDateMonthDropDown).getSelectedText()
        .then(function(text) {
          Utilities.getMonthAsPerNumber(month).then(function(mon) {
            if (text !== mon.toString()) {
              expect(false).customError('Month drop down did not set to current month for "End Date"; ' +
                'Expected:' + mon.toString() + ', Found: ' + text);
              CommonFunctions.takeScreenShot();
            }
          });
        });

      // Verifying if calendar drop down year is current year
      ThiefHelpers.getVirtualDropDownSelectClassReference(undefined, TileOptionsDates.xpathOfEndDateYearDropDown).getSelectedText()
        .then(function(text) {
          if (text !== year.toString()) {
            expect(false).customError('Year drop down did not set to current year for "End Date";' +
              ' Expected: ' + year.toString() + ' Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });

      // Verifying if selected date is showing one day prior to working date
      TileOptionsDates.getSelectedDay('Single\'s End Date').getText().then(function(text) {
        if (text !== previousDate.toString()) {
          expect(false).customError('One day prior to working date did not select in calendar; ' +
            'Expected: ' + previousDate.toString() + ' Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 394630', function() {

    CommonPageObjectsForPA3.clearAndEnterTextInDateTextBox('End Date:', '-100D');

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    it('Verifying if "Calculation Error" error dialog is not present', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if date hyperlink is set to prior to 100 days', function() {
      PA3MainPage.getDateHyperLink('Weights').getText().then(function(text) {
        Utilities.getNumberOfDayAgoDateExcludeWeekend('100').then(function(temp) {
          if (text !== temp) {
            expect(false).customError('Date hyperlink is not taking prior to 100 days;' +
              'Expected: ' + temp + ', Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });

      });
    });

  });

  describe('Test Step ID: 394631', function() {

    // Select Dates tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Dates');

    CommonPageObjectsForPA3.clearAndEnterTextInDateTextBox('End Date:', '-1000D');

    it('Verifying if Calender icon is display "1000" day ago month', function() {
      Utilities.getNumberOfDayAgoDateExcludeWeekend('1000').then(function(date) {
        var temp = date.split('/');
        Utilities.getMonthAsPerNumber(temp[0]).then(function(monthName) {
          ThiefHelpers.getVirtualDropDownSelectClassReference(undefined, TileOptionsDates.xpathOfEndDateMonthDropDown)
            .getSelectedText().then(function(text) {
            if (text !== monthName) {
              expect(false).customError('Month drop down did not set to 1000 day ago month for ' +
                '"End Date";Expected:' + monthName + ' Found: ' + text);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if Calender icon is display "1000" day ago year', function() {
      Utilities.getNumberOfDayAgoDateExcludeWeekend('1000').then(function(date) {
        var temp = date.split('/');
        ThiefHelpers.getVirtualDropDownSelectClassReference(undefined, TileOptionsDates.xpathOfEndDateYearDropDown).getSelectedText()
          .then(function(text) {
            if (text !== temp[2]) {
              expect(false).customError('Year drop down did not set to 1000 day ago year for "End Date"; Found: ' + text);
              CommonFunctions.takeScreenShot();
            }
          });
      });
    });

    it('Verifying if Calender icon is display "1000" day ago date', function() {
      Utilities.getNumberOfDayAgoDateExcludeWeekend('1000').then(function(date) {
        var temp = date.split('/');
        temp[1] = temp[1].replace(/^0+/, '');
        TileOptionsDates.getSelectedDay('Single\'s End Date').getText().then(function(text) {
          if (text !== temp[1].toString()) {
            expect(false).customError('Calender icon did not display 1000 day ago date; ' +
              'Expected: ' + temp[1].toString() + ' Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 394632', function() {

    CommonPageObjectsForPA3.clearAndEnterTextInDateTextBox('End Date:', '-100Y');

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    it('Verifying if "Calculation Error" error dialog is not present', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if date hyperlink is set to prior to 100 Years', function() {
      PA3MainPage.getDateHyperLink('Weights').getText().then(function(text) {
        // As per the discussion with Sean we have to take last full year(previous year) prior to 100 years
        Utilities.getEndDateYearsAgo(101).then(function(temp) {
          if (text !== temp) {
            expect(false).customError('Date hyperlink is not taking prior to 100 years; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });

      });
    });

  });

  describe('Test Step ID: 394633', function() {

    // Select Dates tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Dates');

    CommonPageObjectsForPA3.clearAndEnterTextInDateTextBox('End Date:', '-1M+1D');

    it('Verifying if Calender icon is display 1 month ago month', function() {
      Utilities.getFirstDateOfPreviousMonth().then(function(date) {
        var temp = date.split('/');
        Utilities.getMonthAsPerNumber(temp[0]).then(function(monthName) {
          ThiefHelpers.getVirtualDropDownSelectClassReference(undefined, TileOptionsDates.xpathOfEndDateMonthDropDown)
            .getSelectedText().then(function(text) {
            if (text !== monthName) {
              expect(false).customError('Month drop down did not set to 1 month ago month; Found: ' + text);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if Calender icon is display one month ago year', function() {
      Utilities.getFirstDateOfPreviousMonth().then(function(date) {
        var temp = date.split('/');
        ThiefHelpers.getVirtualDropDownSelectClassReference(undefined, TileOptionsDates.xpathOfEndDateYearDropDown).getSelectedText()
          .then(function(text) {
            if (text !== temp[2]) {
              expect(false).customError('Year drop down did not set to 1 month ago year; Found: ' + text);
              CommonFunctions.takeScreenShot();
            }
          });
      });
    });

    it('Verifying if Calender icon is display one month ago date', function() {
      Utilities.getFirstDateOfPreviousMonth().then(function(date) {
        var temp = date.split('/');
        TileOptionsDates.getSelectedDay('Single\'s End Date').getText().then(function(text) {
          if (text !== temp[1].toString()) {
            expect(false).customError('Calender icon did not display 1 month ago date; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 394634', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    it('Verifying if "Calculation Error" error dialog is not present', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

});
