'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: dates-advance', function() {

  describe('Test Step ID: 556165', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with Client:default_doc_auto', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

  });

  describe('Test Step ID: 556158', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Date Options', 'Dates', 'document options');

  });

  describe('Test Step ID: 556159', function() {

    it('Should open "Date Format" drop down in the "Dates" option', function() {
      ThiefHelpers.getDropDownSelectClassReference('Date Format:').open();
    });

    var dataFormatArr = ['DD-MMM-YYYY', 'M/DD/YYYY', 'DD/MM/YYYY', 'YYYYMMDD', 'DD-MMM-YY', 'M/DD/YY', 'DD/MM/YY', 'YYMMDD'];

    dataFormatArr.forEach(function(dropdownOption, index) {
      it('Verifying if the Dropdown contains "' + dropdownOption + '" options', function() {
        ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
          if (options.indexOf(dropdownOption) < 0) {
            expect(false).customError('The dropdown does not contains "' + dropdownOption);
            CommonFunctions.takeScreenShot();
          }

        });
      });
    });

    it('Should close "Date Format" drop down in the "Dates" option', function() {
      ThiefHelpers.getDropDownSelectClassReference('Date Format:').open();
    });

  });

  describe('Test Step ID: 556160', function() {

    it('Should select "DD-MMM-YYYY" option from the "Date Format" dropdown.', function() {
      ThiefHelpers.selectOptionFromDropDown('DD-MMM-YYYY', 'Date Format:');

      // Verifying if "DD-MMM-YYYY" is set
      ThiefHelpers.verifySelectedDropDownText('DD-MMM-YYYY', 'Date Format:');
    });

    it('Should open "Fiscal Year End Month" drop down under "Dates" option', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathOfFiscalYearEndMonthDropDown).open();
    });

    var fiscalYearEndMonthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
      'November', 'December',];

    fiscalYearEndMonthArr.forEach(function(dropdownOption, index) {
      it('Verifying if the Dropdown contains "' + dropdownOption + '" options', function() {
        ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
          if (options.indexOf(dropdownOption) < 0) {
            expect(false).customError('The dropdown does not contains "' + dropdownOption);
            CommonFunctions.takeScreenShot();
          }

        });
      });
    });

    it('Should close "Fiscal Year End Month" drop down under "Dates" option', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathOfFiscalYearEndMonthDropDown).open();
    });

  });

  describe('Test Step ID: 556161', function() {

    it('Should select "May" option from the "Fiscal Year End Month" dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('May', undefined, DocumentOptionsDates.xpathOfFiscalYearEndMonthDropDown);

      // Verifying if "May" is set
      ThiefHelpers.verifySelectedDropDownText('May', undefined, DocumentOptionsDates.xpathOfFiscalYearEndMonthDropDown);
    });

    it('Should open "Holdings As Of" dropdown under "Dates" option and select "End of Period"', function() {
      ThiefHelpers.selectOptionFromDropDown('End of Period', undefined, DocumentOptionsDates.xpathHoldingsAsOfDropDown);

      // Verifying if "End of Period" is set
      ThiefHelpers.verifySelectedDropDownText('End of Period', undefined, DocumentOptionsDates.xpathHoldingsAsOfDropDown);
    });

  });

  describe('Test Step ID: 556162', function() {

    it('Should open "Calculation Frequency" dropdown under "Dates" option', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathCalculationFrequencyDropDown).open();
    });

    var calculationFrequencyArr = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Semi-annually', 'Annually', 'Fiscal Yearly'];

    calculationFrequencyArr.forEach(function(dropdownOption, index) {
      it('Verifying if the Dropdown contains "' + dropdownOption + '" options', function() {
        ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
          if (options.indexOf(dropdownOption) < 0) {
            expect(false).customError('The dropdown does not contains "' + dropdownOption);
            CommonFunctions.takeScreenShot();
          }

        });
      });
    });

    it('Should close "Calculation Frequency" dropdown under "Dates" option', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathCalculationFrequencyDropDown).open();
    });

  });

  describe('Test Step ID: 556163', function() {

    it('Should select "Semi-annually" option from the "Calculation Frequency" dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Semi-annually', undefined, DocumentOptionsDates.xpathCalculationFrequencyDropDown);

      // Verifying if "Semi-annually" is set
      ThiefHelpers.verifySelectedDropDownText('Semi-annually', undefined, DocumentOptionsDates.xpathCalculationFrequencyDropDown);
    });

    var arrOfCheckboxNames = ['Force Start Date After Inception', 'Force End Date Before Termination'];

    arrOfCheckboxNames.forEach(function(checkboxName) {
      it('Should check off "Force Start Date After Inception" checkbox.', function() {
        var xpathOfCheckBox = CommonFunctions.replaceStringInXpath(DocumentOptionsDates.xpathOfCheckboxes, checkboxName);
        ThiefHelpers.setCheckBox(checkboxName, xpathOfCheckBox, true);
      });
    });

  });

  describe('Test Step ID: 556164', function() {

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Dcoument Options');

  });

});
