'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: term-date-weekend', function() {

  describe('Test Step ID:444517', function() {

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

    it('Should launch the PA3 application with Term_Date_1 document', function() {
      PA3MainPage.switchToDocument('Client:/Pa3/Dates/Term_Date_1');

      // Check if application is launched
      expect(browser.getTitle()).toEqual('Portfolio Analysis 3.0 - Contribution [Client:/Pa3/Dates/Term_Date_1]');
    });

    it('Should select "Automatic Calculation" option', function() {
      // Un-check "Automatic Calculation" to force re-check it
      PA3MainPage.getWrenchIcon().click();
      PA3MainPage.setAutomaticCalculation(false);

      // Click on Wrench button to select "Automatic Calculation"
      PA3MainPage.getWrenchIcon().click();
      expect(PA3MainPage.setAutomaticCalculation(true)).toBeTruthy();
    });

    it('Verify that Calculation Error message pop up appeared', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getDialog('Calculation Error'), 60000);
    });

    it('Verify that Calculation Error pop up having text "Gaps were detected in the portfolio CLIENT:/PA3/DATES/1_TBR.ACCT' +
      ' at the following range(s): 09/17/2012 - 09/28/2012"', function() {
      expect(PA3MainPage.getDialogWithText('Gaps were detected in the portfolio CLIENT:/PA3/DATES/1_TBR.ACCT' +
        ' at the following range(s): 09/17/2012 - 09/28/2012').isPresent()).toBeTruthy();
    });

  });

  describe('Test Step ID:444518', function() {

    it('Should click "OK" in the Calculation Error dialog', function() {
      PA3MainPage.getButton('OK').click();

      // Verify that Calculation Error dialog is closed
      expect(PA3MainPage.getDialog('Calculation Error').isPresent()).toBeFalsy();
    });

    it('Should click on Portfolio Hamburger drop down', function() {
      PA3MainPage.getHamburgerIcon('portfolio').click();
    });

    it('Should select "1_TBR" account from the drop down', function() {
      PA3MainPage.getSingleAccountFromList('portfolio', '1_TBR').click();
    });

    it('Should click on OK to close the drop down', function() {
      PA3MainPage.getOkOrCancelButton('portfolio', 'OK').click();
    });

    it('Verify that Calculation Error message pop up appeared', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getDialog('Calculation Error'), 60000);
    });

    it('Verify that Calculation Error pop up having text "Gaps were detected in the portfolio CLIENT:/PA3/DATES' +
      '/3_TBR.ACCT at the following range(s): 08/31/2012 - 09/14/2012"', function() {
      expect(PA3MainPage.getDialogWithText('Gaps were detected in the portfolio CLIENT:/PA3/DATES/3_TBR.ACCT' +
        ' at the following range(s):\r\n08/31/2012 - 09/14/2012').isPresent()).toBeTruthy();
    });

  });

  describe('Test Step ID:444520', function() {

    it('Should click "OK" in the Calculation Error dialog', function() {
      PA3MainPage.getButton('OK').click();

      // Verify that Calculation Error dialog is closed
      expect(PA3MainPage.getDialog('Calculation Error').isPresent()).toBeFalsy();
    });

    it('Should click on Portfolio Hamburger drop down', function() {
      PA3MainPage.getHamburgerIcon('portfolio').click();
    });

    it('Should select "3_TBR" account from the drop', function() {
      PA3MainPage.getSingleAccountFromList('portfolio', '3_TBR').click();
    });

    it('Should click on OK to close the drop down', function() {
      PA3MainPage.getOkOrCancelButton('portfolio', 'OK').click();
    });

    it('Should click on Cancel button in Report calculaion dialog', function() {
      PA3MainPage.cancelReportCalculation();
    });

    it('Verify that report is not calculated', function() {
      expect(PA3MainPage.isReportCalculated('Contribution', true)).toBeFalsy();
    });

  });

  describe('Test Step ID:444522', function() {

    it('Should click on the "Wrench" icon', function() {
      PA3MainPage.getWrenchIcon().click();

    });

    it('Should select "Document Options" from Wrench menu', function() {
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click();
    });

    it('Verify if "Document Options" Dialog is appeared', function() {
      expect(DocumentOptionsDialog.isDialogPresent()).toBeTruthy();
    });

    it('Should select "Dates" tab in "Document Options" dialog', function() {
      DocumentOptionsDialog.getTab('Dates').click();
    });

    it('Verify if "Dates" Tab is Activated', function() {
      //Check if Asset Type tab is activated
      expect(DocumentOptionsDialog.getTab('Dates').getAttribute('class')).toContain('ui-tabs-active');

      browser.sleep(2000);
    });

    it('Should deselect "Force Start Date after Inception" ', function() {
      DocumentOptionsDatesTab.getCheckBox('Force Start Date after Inception').click();

      // Verifying that check box is deselected
      expect(DocumentOptionsDatesTab.getCheckBox('Force Start Date after Inception').getAttribute('data-checked'))
        .toBeNull();
    });

    it('Should click on "OK" button in Document Options dialog', function() {
      DocumentOptionsDialog.getButton('OK').click();
    });

    it('Verify if "Document Options" dialog is closed after clicking on "OK" button', function() {
      //checking whether Document Options dialog is closed or not
      expect(DocumentOptionsDialog.isDialogPresent()).toBeFalsy();
    });

    //  Note: Please see known issue RPD:17375754
    it('Verify that Calculation Error message pop up appeared', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getDialog('Calculation Error'), 60000);
    });

    it('Verify that report is not calculated', function() {
      expect(PA3MainPage.isReportCalculated('Contribution', true)).toBeFalsy();
    });

  });

  describe('Test Step ID:444524', function() {

    it('Should click "OK" in the Calculation Error dialog', function() {
      PA3MainPage.getButton('OK').click();

      // Verify that Calculation Error dialog is closed
      expect(PA3MainPage.getDialog('Calculation Error').isPresent()).toBeFalsy();
    });

    it('Should click on Portfolio Hamburger drop down', function() {
      PA3MainPage.getHamburgerIcon('portfolio').click();
    });

    it('Should select "1_TBR" account from the drop down', function() {
      PA3MainPage.getSingleAccountFromList('portfolio', '1_TBR').click();
    });

    it('Should click on OK to close the drop down', function() {
      PA3MainPage.getOkOrCancelButton('portfolio', 'OK').click();
    });

    it('Verify that Calculation Error message pop up appeared', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getDialog('Calculation Error'), 60000);
    });

    it('Should click "OK" in the Calculation Error dialog', function() {
      PA3MainPage.getButton('OK').click();

      // Verify that Calculation Error dialog is closed
      expect(PA3MainPage.getDialog('Calculation Error').isPresent()).toBeFalsy();
    });

  });

});
