'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: acct-settings-2', function() {

  describe('Test Step ID: 548105', function() {

    // Should open default document and un-check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should launch the PA3 application with document client:default_doc_auto.', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });

  });

  describe('Test Step ID: 548098', function() {

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Weights', true, 'isSelected');

    it('Should enter the value "CLIENT:/PA3/TEST2.ACCT" into the portfolio widget', function() {

      // Clearing the 'Portfolio' widget box before entering portfolio.
      PA3MainPage.getWidgetBox('Portfolio').clear();

      // Entering portfolio into 'Portfolio' widget.
      PA3MainPage.getWidgetBox('Portfolio').sendKeys('CLIENT:/PA3/TEST2.ACCT', protractor.Key.ENTER, protractor.Key.NULL);

      // Verifying the content enter into the 'portfolio' widget box.
      expect(PA3MainPage.getWidgetBox('Portfolio').getAttribute('value')).toEqual('CLIENT:/PA3/TEST2.ACCT');
    });

    it('Verfying if "Benchmark" is set to "SPN:SPCG_400V_O"', function() {
      expect(PA3MainPage.getWidgetBox('Benchmark').getAttribute('value')).toEqual('SPN:SPCG_400V_O');
    });

  });

  describe('Test Step ID: 548099', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Benchmark', 'Prices', 'document options');

    it('Should click on the item "FTSE" to highlight from "EXCHANGE RATES" section, "Selected" container', function() {
      DocumentOptionsPricesBenchmark.getListItem('FTSE', 'Exchange Rates', 'Selected').click();

      // Verfying if the item 'FTSE' is highlighted.
      expect(DocumentOptionsPricesBenchmark.getListItem('FTSE', 'Exchange Rates',
        'Selected').getAttribute('class')).toContain('selected');
    });

    it('Should click on "left" arrow button to move "FTSE" to "Available" container', function() {
      ThiefHelpers.sendElementToAvailableSection(DocumentOptionsPricesBenchmark.xpathOfExchangeRateTransferbox);

      // Verifying that FTSE is not present in 'Selected' container.
      expect(DocumentOptionsPricesBenchmark.getListItem('FTSE', 'Exchange Rates', 'Selected').isPresent()).toBeFalsy();

      // Verifying if the item 'FTSE' is moved to 'available' container.
      expect(DocumentOptionsPricesBenchmark.getListItem('FTSE', 'Exchange Rates', 'Available').isPresent()).toBeTruthy();
    });

    it('Verifying that "Defaults Applied" is changed to "Restore Defaults" button', function() {
      expect(DocumentOptions.getDefaultsApplied().isPresent()).toBeFalsy();

      // Verfying if 'Restore defaults' button is available.
      expect(DocumentOptions.getRestoreDefaultsButton().isPresent()).toBeTruthy();
    });

  });

  describe('Test Step ID: 548100', function() {

    it('Should click on "Restore Defaults" button', function() {
      DocumentOptions.getRestoreDefaultsButton().click();
    });

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'OK', 'Do you want to replace your current settings with the account defaults?');

    it('Verifying "PRICES"section\'s "Selected" container to contain "FactSet - Options"', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesBenchmark.xpathPricesSelectedContainer, 'FactSet - Options').getText().then(function(text) {
        if (text !== 'FactSet - Options') {
          expect(false).customError('"FactSet - Options" is not shown in the "Selected" container of "PRICES" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"FactSet - Options" is not found in the "Selected" container of "PRICES" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "EXCHANGE RATES" section\'s "Selected" container to contain "FTSE"', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesBenchmark.xpathExchangeRatesSelectedContainer, 'FTSE').getText().then(function(text) {
        if (text !== 'FTSE') {
          expect(false).customError('"FTSE" is not shown in the "Selected" container of "EXCHANGE RATES" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"FTSE" is not found in the "Selected" container of "EXCHANGE RATES" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 548101', function() {

    it('Should click on the "Advanced" tab from "Prices" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Advanced', 'Prices').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Advanced', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Advanced" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should Select "FTSE Global" from "Portfolio Split Source" dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('FTSE Global', 'Portfolio Split Source');
      ThiefHelpers.verifySelectedDropDownText('FTSE Global', 'Portfolio Split Source');
    });

    it('Verifying that "Defaults Applied" is changed to "Restore Defaults" button', function() {
      expect(DocumentOptions.getDefaultsApplied().isPresent()).toBeFalsy();

      // Verifying if Restore Defaults' button is available.
      expect(DocumentOptions.getRestoreDefaultsButton().isPresent()).toBeTruthy();
    });

    it('Should click on "Restore Defaults" button', function() {
      DocumentOptions.getRestoreDefaultsButton().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'OK', 'Do you want to replace your current settings with the account defaults?');

    it('Verifying that "Restore Defaults" button is changed to "Defaults Applied"', function() {
      DocumentOptions.getDefaultsApplied().isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('"Restore Defaults" button is not changed to "Defaults Applied');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if 'Restore Defaults' button is no longer available.
      expect(DocumentOptions.getRestoreDefaultsButton().isPresent()).toBeFalsy();
    });

    it('Verifying the selected value for "Portfolio Split Source" to be "MSCI"', function() {
      ThiefHelpers.verifySelectedDropDownText('MSCI', 'Portfolio Split Source');
    });

  });

  describe('Test Step ID: 548102', function() {

    it('Should click on the "Databases" tab from LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Databases').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Databases').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Databases" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "FUNDAMENTAL" section "Selected" container to contain "Reuters" and "Worldscope"', function() {
      var listReference = DocumentOptionsDatabases.getAllListElements('Fundamental', 'selected');
      var arr = ['Reuters', 'Worldscope'];
      listReference.count().then(function(count) {
        expect(count).toBe(2);
        var i = 0;
        arr.forEach(function(value) {
          expect(listReference.get(i).getText()).toEqual(value);
          i++;
        });
      });
    });

    it('Verifying "ESTIMATES" section "Selected" container to contain "First Call"', function() {
      var listReference = DocumentOptionsDatabases.getAllListElements('Estimates', 'selected');
      var arr = ['First Call'];
      listReference.count().then(function(count) {
        expect(count).toBe(1);
        var i = 0;
        arr.forEach(function(value) {
          expect(listReference.get(i).getText()).toEqual(value);
          i++;
        });
      });
    });

  });

  describe('Test Step ID: 548103', function() {

    it('Should click on the "Date Options" tab from "Dates" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Date Options', 'Dates').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Date Options', 'Dates').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Date Options" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Abu Dhabi" from "Calender" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Abu Dhabi', undefined, DocumentOptionsDates.xpathOfCalenderDropDown);

      ThiefHelpers.verifySelectedDropDownText('Abu Dhabi', undefined, DocumentOptionsDates.xpathOfCalenderDropDown);
    });

    it('Should click on "Restore Defaults" button', function() {
      DocumentOptions.getRestoreDefaultsButton().isPresent().then(function(optionRef) {
        if (optionRef) {
          DocumentOptions.getRestoreDefaultsButton().click();
        } else {
          expect(false).customError('"Restore Defaults" button is not present');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'OK', 'Do you want to replace your current settings with the account defaults?');

    it('Verifying that "Restore Defaults" button is changed to "Defaults Applied"', function() {
      DocumentOptions.getRestoreDefaultsButton().isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Restore Defaults" button is not changed to "Defaults Applied"');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying that 'Defaults Applied' is visible.
      expect(DocumentOptions.getDefaultsApplied().isPresent()).toBeTruthy();
    });

    it('Verifying the value selected for "Calender" dropdown to be "Seven Day"', function() {
      ThiefHelpers.verifySelectedDropDownText('Seven Day', undefined, DocumentOptionsDates.xpathOfCalenderDropDown);
    });

    it('Verifying if "Fiscal year End Month" dropdown is set to "January" by default', function() {
      ThiefHelpers.verifySelectedDropDownText('January', undefined, DocumentOptionsDates.xpathOfFiscalYearEndMonthDropDown);
    });

  });

  describe('Test Step ID: 548104', function() {

    // Click on "Cancel" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Document Options');

    it('Should close the PA3 application', function() {
      expect(true).toBeTruthy();
    });
  });
});
