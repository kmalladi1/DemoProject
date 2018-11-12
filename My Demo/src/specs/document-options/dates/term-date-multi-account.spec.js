'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: term-date-multi-account', function() {

  describe('Test Step ID:444573', function() {

    it('Should launch the PA3 application with default document', function() {
      PA3MainPage.goToURL('#/doc/PA_DOCUMENTS:DEFAULT/report/report0');

      // Check if application is launched
      browser.getTitle().then(function(title) {
        expect(title === PA3Json.defaultDocument)
          .customError('Title of browser did not match. ' +
            'Expected: "' + PA3Json.defaultDocument + '", Found: "' + title + '"');
        if (title !== PA3Json.defaultDocument) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Wrench" button on the application toolbar', function() {
      PA3MainPage.getWrenchIcon().click();

      // Verifying if drop down menu appear
      expect(PA3MainPage.getWrenchIcon(true).isPresent()).toBeTruthy();
    });

    it('Should select "Automatic Calculation" option', function() {
      expect(PA3MainPage.setAutomaticCalculation(true)).toBeTruthy();
    });

    it('Should launch the PA3 application with "TERM_DATE_3" document', function() {
      PA3MainPage.switchToDocument('Client:/Pa3/Dates/TERM_DATE_3');

      // Check if application is launched
      expect(browser.getTitle()).toEqual('Portfolio Analysis 3.0 - Contribution [Client:/Pa3/Dates/TERM_DATE_3]');

    });

    it('Should select "Automatic Calculation" option', function() {
      // Un-check "Automatic Calculation" to force re-check it
      PA3MainPage.getWrenchIcon().click();
      PA3MainPage.setAutomaticCalculation(false);

      // Click on Wrench button to select "Automatic Calculation"
      PA3MainPage.getWrenchIcon().click();
      expect(PA3MainPage.setAutomaticCalculation(true)).toBeTruthy();
    });

    it('Verify that "Calculation Error" pop up appeared', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getDialog('Calculation Error'), 60000);
    });

    it('Verify that Calculation Error pop up having text "Gaps were detected in the portfolio CLIENT:/' +
      'NEW_PA_TEST_SUITE/DATES/5_TBR.ACCT at the following range(s): 09/21/2012 - 09/28/2012', function() {
      expect(PA3MainPage.getDialogWithText('Gaps were detected in the portfolio CLIENT:/' +
        'NEW_PA_TEST_SUITE/DATES/5_TBR.ACCT at the following range(s): 09/21/2012 - 09/28/2012').isPresent()).toBeTruthy();
    });

  });

  describe('Test Step ID:444574', function() {

    it('Click "OK" in the "Calculation Error" dialog', function() {
      PA3MainPage.getButton('OK').click();

      // Verify that Calculation Error dialog is closed
      expect(PA3MainPage.getDialog('Calculation Error').isPresent()).toBeFalsy();
    });

    it('Should click on "Portfolio" account drop down', function() {
      PA3MainPage.getHamburgerIcon('portfolio').click();

      // Verifying that "Account" drop down appeared
      expect(PA3MainPage.getHamburgerIcon('portfolio').$('.dropdown-container').isPresent()).toBeTruthy();
    });

    it('Should select "5_TBR" account from the drop down', function() {
      PA3MainPage.getSingleAccountFromList('portfolio', 'CLIENT:/NEW_PA_TEST_SUITE/DATES/5_TBR').click();

      // Verifying that "5_TBR" account is selected
      expect(PA3MainPage.getSingleAccountFromList('portfolio', 'CLIENT:/NEW_PA_TEST_SUITE/DATES/5_TBR')
        .getAttribute('class')).toContain('active');
    });

    it('Should click on "OK" to close account drop down', function() {
      PA3MainPage.getOkOrCancelButton('portfolio', 'OK').click();
    });

    it('Waiting for "Contribution" report to calculate', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.isReportCalculated('Contribution', true), 120000);
    });

    it('Verify that "Contribution" report is calculated', function() {
      expect(PA3MainPage.isReportCalculated('Contribution')).toBeTruthy();
    });

  });

});
