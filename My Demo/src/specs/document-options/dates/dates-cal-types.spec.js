'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: dates-cal-types', function() {

  describe('Test Step ID: 556169', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

  });

  describe('Test Step ID: 556166', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Date Options', 'Dates', 'document options');

  });

  describe('Test Step ID: 556167', function() {

    // Test step specific variables.
    var calendarArr;

    it('Verify that either "Five Day" or "United States" is default selected option for "Calendar" drop down.', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathCalenderDropDown).getSelectedText()
        .then(function(text) {
          if (text !== 'Five Day') {
            if (text !== 'United States') {
              expect(false).customError('"Calendar" drop down did not set to "Five Day" or "United States"; Found:' + text);
              CommonFunctions.takeScreenShot();
            }
          }
        });
    });

    it('Should click on "Calendar" drop down button', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathCalenderDropDown).open();
    });

    var arrOfdropdownOptions = ['Five Day', 'Seven Day'];
    it('Verify that "Five Day" and "Seven Day" are listed as first 2 options in the Calendar dropdown', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(array) {
        arrOfdropdownOptions.forEach(function(option, index) {
          if (option !== array[index]) {
            expect(false).customError('"' + option + '" did not present in the drop down');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 556168', function() {

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Dcoument Options');

  });

});
