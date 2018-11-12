'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: term-date-overlap', function() {

  describe('Test Step ID:444539', function() {

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

    it('Should launch the PA3 application with "TERM_DATE_2" document', function() {
      PA3MainPage.switchToDocument('Client:/Pa3/Dates/TERM_DATE_2');

      // Check if application is launched
      expect(browser.getTitle()).toEqual('Portfolio Analysis 3.0 - Contribution [Client:/Pa3/Dates/TERM_DATE_2]');

    });

    it('Should select "Automatic Calculation" option', function() {
      // Un-check "Automatic Calculation" to force re-check it
      PA3MainPage.getWrenchIcon().click();
      PA3MainPage.setAutomaticCalculation(false);

      // Click on Wrench button to select "Automatic Calculation"
      PA3MainPage.getWrenchIcon().click();
      expect(PA3MainPage.setAutomaticCalculation(true)).toBeTruthy();
    });

    it('Waiting for "Contribution" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);
    });

    it('Verifying that "Contribution" report is calculated', function() {
      expect(PA3MainPage.isReportCalculated('Contribution')).toBeTruthy();
    });

  });

  describe('Test Step ID:444541', function() {

    it('Should click on hamburger icon next to "Portfolio" widget', function() {
      PA3MainPage.getHamburgerIcon('portfolio').click();

      // Verifying that "Account" drop down appeared
      expect(PA3MainPage.getHamburgerIcon('portfolio').$('.dropdown-container').isPresent()).toBeTruthy();

    });

    it('Should select "3_TBR" account from the drop down', function() {
      PA3MainPage.getSingleAccountFromList('portfolio', 'CLIENT:/PA3/DATES/3_TBR').click();

      // Verifying that "3_TBR" account is selected
      expect(PA3MainPage.getSingleAccountFromList('portfolio', 'CLIENT:/PA3/DATES/3_TBR')
        .getAttribute('class')).toContain('active');
    });

    it('Should click on OK to close the account drop down', function() {
      PA3MainPage.getOkOrCancelButton('portfolio', 'OK').click();

      // verifying that Account drop down is closed
      expect(PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('class')).not.toContain('active');
    });

    it('Verify that "Calculation Error" message pop up appeared', function() {
      expect(Utilities.waitUntilElementAppears(PA3MainPage.getDialog('Calculation Error'), 80000)).toBeTruthy();
    });

    it('Verify that Calculation Error pop up having text "Gaps were detected in the portfolio CLIENT:/PA3/DATES' +
      '/2_TBR.ACCT at the following range(s): 09/17/2012 - 09/19/2012', function() {
      expect(PA3MainPage.getDialogWithText('Gaps were detected in the portfolio CLIENT:/PA3/DATES/2_TBR.ACCT' +
        ' at the following range(s): 09/17/2012 - 09/19/2012').isPresent()).toBeTruthy();
    });

  });

  describe('Test Step ID:444549', function() {

    it('Should click "OK" in the "Calculation Error" dialog', function() {
      PA3MainPage.getButton('OK').click();

      // Verify that Calculation Error dialog is closed
      expect(PA3MainPage.getDialog('Calculation Error').isPresent()).toBeFalsy();
    });

    it('Should click on hamburger icon next to "Portfolio" widget', function() {
      PA3MainPage.getHamburgerIcon('portfolio').click();

      // Verifying that "Account" drop down appeared
      expect(PA3MainPage.getHamburgerIcon('portfolio').$('.dropdown-container').isPresent()).toBeTruthy();

    });

    it('Should select "2_TBR" account from the drop', function() {
      PA3MainPage.getSingleAccountFromList('portfolio', 'CLIENT:/PA3/DATES/2_TBR').click();

      // Verifying that "2_TBR" account is selected
      expect(PA3MainPage.getSingleAccountFromList('portfolio', 'CLIENT:/PA3/DATES/2_TBR')
        .getAttribute('class')).toContain('active');
    });

    it('Should click on OK to close account drop down', function() {
      PA3MainPage.getOkOrCancelButton('portfolio', 'OK').click();

      // verifying that Account drop down is closed
      expect(PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('class')).not.toContain('active');
    });

    it('Should click on "Cancel" button in Report calculation dialog', function() {
      PA3MainPage.cancelReportCalculation();

      // verifying that report calculation is stopped
      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verify that report is not calculated', function() {
      expect(PA3MainPage.getReportCachingAlertIcon('Contribution').isPresent()).toBeTruthy();

      browser.sleep(2000);
    });

  });

  describe('Test Step ID:444552', function() {

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

      // Check if "Dates" tab is activated
      expect(DocumentOptionsDialog.getTab('Dates').getAttribute('class')).toContain('active');
    });

    it('Should deselect "Force Start Date after Inception" checkbox', function() {
      DocumentOptionsDatesTab.getCheckBox('Force Start Date after Inception').click();

      // Verifying that check box is deselected
      expect(DocumentOptionsDatesTab.getCheckBox('Force Start Date after Inception').getAttribute('data-checked'))
        .toBeNull();
    });

    it('Should click on "OK" button in "Document Options" dialog', function() {
      DocumentOptionsDialog.getButton('OK').click();
    });

    it('Verify if "Document Options" dialog is closed after clicking on "OK" button', function() {
      expect(DocumentOptionsDialog.isDialogPresent()).toBeFalsy();
    });

    // Note: Please see known issue RPD:17375754
    it('Verify that "Calculation Error" message pop up appeared', function() {
      expect(Utilities.waitUntilElementAppears(PA3MainPage.getDialog('Calculation Error'), 80000)).toBeTruthy();
    });

  });

  describe('Test Step ID:444553', function() {

    // Note: Please see known issue RPD:17375754
    it('Should click "OK" in the "Calculation Error" dialog', function() {
      PA3MainPage.getButton('OK').click();

      // Verify that Calculation Error dialog is closed
      expect(PA3MainPage.getDialog('Calculation Error').isPresent()).toBeFalsy();
    });

    it('Should click on hamburger icon next to "Portfolio" widget', function() {
      PA3MainPage.getHamburgerIcon('portfolio').click();

      // Verifying that "Account" drop down appeared
      expect(PA3MainPage.getHamburgerIcon('portfolio').$('.dropdown-container').isPresent()).toBeTruthy();

    });

    it('Should select "3_TBR" account from the drop down', function() {
      PA3MainPage.getSingleAccountFromList('portfolio', 'CLIENT:/PA3/DATES/3_TBR').click();

      // Verifying that "3_TBR" account is selected
      expect(PA3MainPage.getSingleAccountFromList('portfolio', 'CLIENT:/PA3/DATES/3_TBR')
        .getAttribute('class')).toContain('active');
    });

    it('Should click on OK to close the account drop down', function() {
      PA3MainPage.getOkOrCancelButton('portfolio', 'OK').click();

      // verifying that Account drop down is closed
      expect(PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('class')).not.toContain('active');
    });

    it('Verify that "Calculation Error" message pop up appeared', function() {
      expect(Utilities.waitUntilElementAppears(PA3MainPage.getDialog('Calculation Error'), 80000)).toBeTruthy();
    });

    it('Should click "OK" in the "Calculation Error" dialog', function() {
      PA3MainPage.getButton('OK').click();

      // Verify that Calculation Error dialog is closed
      expect(PA3MainPage.getDialog('Calculation Error').isPresent()).toBeFalsy();
    });

  });

});
