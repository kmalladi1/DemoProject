'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: dates', function() {
  // Variable(s)
  var date;
  var month;
  var year;
  var day;
  var todayDate;

  describe('Test Step ID: 544854', function() {

    // Should un-check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should launch the PA3 application with Client:default_doc_auto', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

  });

  describe('Test Step ID: 544855', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Dates');

  });

  describe('Test Step ID: 544856', function() {

    it('Shoul click on report frequesncy dropdown', function() {
      ThiefHelpers.getDropDownSelectClassReference('Report Frequency:').open();
    });

    TileOptionsDates.arrayReportFrequencyOptions.forEach(function(dropdownOption) {
      it('Verifying if the Dropdown contains "' + dropdownOption + '" options', function() {
        ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
          if (options.indexOf(dropdownOption) < 0) {
            expect(false).customError('The dropdown does not contains "' + dropdownOption);
            CommonFunctions.takeScreenShot();
          }

        });
      });
    });

    it('Shoul click on report frequesncy dropdown', function() {
      ThiefHelpers.getDropDownSelectClassReference('Report Frequency:').open();
    });

    it('Should click on "Report Frequency" drop down and select "Monthly" from the drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Monthly', 'Report Frequency:');

      // Verifying if "monthly" is set
      ThiefHelpers.verifySelectedDropDownText('Monthly', 'Report Frequency:');
    });

    var arrOfDatePickers = ['Start Date:', 'End Date:'];

    arrOfDatePickers.forEach(function(datePickerName) {
      it('Verifying if "' + datePickerName + '" widget appeared', function() {
        ThiefHelpers.isPresent('datepicker', datePickerName).then(function(found) {
          if (!found) {
            expect(false).customError('"' + datePickerName + '" datepicker is not present');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 544857', function() {

    it('Should set the "Start date" to "3/25/2013"', function() {
      ThiefHelpers.setDateInCalendar('3/25/2013');
    });

    it('Verify that "Start Date" field is showing "3/25/2013"', function() {
      ThiefHelpers.getDatepickerClassReference('Start Date:').getDate().then(function(text) {
        if (text !== '3/25/2013') {
          expect(false).customError('Start Date is not set to "3/25/2013" instead found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 544858', function() {

    it('Should click on "Today" date button', function() {
      TileOptionsDates.getTodayDateButton('start date').click();
    });

    it('Verify that present date is showing in "Start Date" field', function() {
      // Calculate present date
      date = new Date();
      year = date.getFullYear();
      month = date.getMonth() + 1;
      day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
      todayDate = month + '/' + day + '/' + year;

      // Verify that present Date is showing in 'Start Date' field
      TileOptionsDates.getDateField('start date').getAttribute('value').then(function(date) {
        expect(date === todayDate).customError('Present date is not displayed in "Start Date" field');
        if (date !== todayDate) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should highlighted today date in the calendar', function() {
      // Verify that present date is highlighted

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

      // Check the day
      TileOptionsDates.getSelectedDay('start date').then(function(day) {
        expect(day === date.getDate().toString()).customError('Selected day in the calendar is not today\'s day. ' +
          'Expected: "' + date.getDate().toString() + '", Found: "' + day + '"');
        if (day !== date.getDate().toString()) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 544859', function() {

    it('Should select "Start Date Relative to End Date" check box', function() {
      TileOptionsDates.getCheckBox('Start Date Relative to End Date').click();

      // Verify that check box is selected
      expect(Utilities.isCheckboxSelected(TileOptionsDates.getCheckBox('Start Date Relative to End Date'))).toBeTruthy();
    });

    it('Should select "Use Actual Frequencies" check box', function() {
      TileOptionsDates.getCheckBox('Use Actual Frequencies').click();

      // Verify that check box is selected
      expect(Utilities.isCheckboxSelected(TileOptionsDates.getCheckBox('Use Actual Frequencies'))).toBeTruthy();
    });

  });

  describe('Test Step ID: 704293', function() {

    it('Should click on "Cancel" button from "Tile Options - Weights" header bar', function() {
      TileOptions.getHeaderButton('Cancel').click();
    });

    it('Should launch PA3 application with "DEFAULT" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default');
    });

  });

  describe('Test Step ID: 704294', function() {

    it('Should click on date hyperlink in "Weights" report', function() {
      var xpathInfobox = PA3MainPage.getDateHyperLink('Weights');
      ThiefHelpers.getInfoboxLinkClassReference(xpathInfobox).press().then(function() {
      }, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });
    });

    it('Verifying if infobox drop down is opened', function() {
      element(by.xpath('//tf-infobox[contains(@open,"opened")]')).isPresent().then(function(opened) {
        if (!opened) {
          expect(false).customError('Infobox dropdown is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "End Date" text box contains "Previous Close"', function() {
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(value) {
        if (value !== 'Previous Close') {
          expect(false).customError('"Previous Close" option did not present in End Date text box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var currDate;
    it('Should set Today\'s date in "End Date" calendar', function() {
      // Note current date for future verification.
      Utilities.getCurrentDate('DDMMMYYYY', '-').then(function(date) {
        currDate = date.toLowerCase();
      });
      Utilities.getCurrentDate('MMMDDYYYY', '-').then(function(date) {
        ThiefHelpers.setDateInCalendar(date);
      });
    });

    it('Verify that "End Date" field is showing "Today\'s Date"', function() {
      // Adding wait time as per the Engineer comment in RPD:41035011
      browser.sleep(1000);
      ThiefHelpers.getDatepickerClassReference('End Date:').getDate().then(function(text) {
        if (text.toLowerCase() !== currDate) {
          expect(false).customError('End Date is not set to "' + currDate + '" instead found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the OK button', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if date hyperlink is set to "Today\'s date"', function() {
      PA3MainPage.getDateHyperLink('Weights').getText().then(function(text) {
        if (text.toLowerCase() !== currDate.toLowerCase()) {
          expect(false).customError('Date hyperlink doesnot showing the current date Expected : ' + text + ', Found: ' + currDate);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 704295', function() {

    it('Should click on date hyperlink in "Weights" report', function() {
      var xpathInfobox = PA3MainPage.getDateHyperLink('Weights');
      ThiefHelpers.getInfoboxLinkClassReference(xpathInfobox).press().then(function() {
      }, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });
    });

    it('Verifying if infobox drop down is opened', function() {
      element(by.xpath('//tf-infobox[contains(@open,"opened")]')).isPresent().then(function(opened) {
        if (!opened) {
          expect(false).customError('Infobox dropdown is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should clear and enter "0W" in End Date text box', function() {
      ThiefHelpers.getTextBoxClassReference('End Date:').setText('0W');

      // Adding wait time as per the Engineer comment in RPD:41035011
      browser.sleep(1000);
    });

    it('Verifying if "End Date" text box contains "0W"', function() {
      // Verifying "0W"  is entered in End Date text box
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(value) {
        if (value !== '0W') {
          expect(false).customError('End Date text box did not contain "0W"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the OK button', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on date hyperlink in "Weights" report', function() {
      var xpathInfobox = PA3MainPage.getDateHyperLink('Weights');
      ThiefHelpers.getInfoboxLinkClassReference(xpathInfobox).press().then(function() {
      }, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });
    });

    it('Verifying if infobox drop down is opened', function() {
      element(by.xpath('//tf-infobox[contains(@open,"opened")]')).isPresent().then(function(opened) {
        if (!opened) {
          expect(false).customError('Infobox dropdown is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "End Date" contains text: "0W"', function() {
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(value) {
        if (value !== '0W') {
          expect(false).customError('End Date text box did not contain "0W", Found : ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 704296', function() {

    it('Should click on the Cancel button', function() {
      ThiefHelpers.getButtonClassReference('Cancel').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on date hyperlink in "Weights" report', function() {
      var xpathInfobox = PA3MainPage.getDateHyperLink('Weights');
      ThiefHelpers.getInfoboxLinkClassReference(xpathInfobox).press().then(function() {
      }, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });
    });

    it('Verifying if infobox drop down is opened', function() {
      element(by.xpath('//tf-infobox[contains(@open,"opened")]')).isPresent().then(function(opened) {
        if (!opened) {
          expect(false).customError('Infobox dropdown is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "End Date" text box contains "0W"', function() {
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(value) {
        if (value !== '0W') {
          expect(false).customError('"0W" option did not present in End Date text box, Found : ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should clear and enter "0w" in End Date text box', function() {
      ThiefHelpers.getTextBoxClassReference('End Date:').setText('0w');

      // Adding wait time as per the Engineer comment in RPD:41035011
      browser.sleep(1000);
    });

    it('Verifying "0w" is entered in End Date text box', function() {
      // Verifying "0w"  is entered in End Date text box
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(value) {
        if (value !== '0w') {
          expect(false).customError('End Date text box did not contain "0w"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the OK button', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "wrench" icon in the report', function() {
      PA3MainPage.selectWrenchIcon('Weights');
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

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Weights') {
          expect(false).customError('"Tile Options - Weights" view has not appeared. ' +
            'Expected: "Tile Options - Weights" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "End Date" contains text: "0w"', function() {
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(value) {
        if (value !== '0w') {
          expect(false).customError('End Date text box did not contain "0w", Found : ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 544860', function() {

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile options');

  });

  describe('Test Step ID: 544861', function() {

    it('Should close PA3 application', function() {
      expect(true).toBeTruthy();
    });

  });

});
