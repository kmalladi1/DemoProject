'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: transpose-cols', function() {

  describe('Test Step ID: 690927', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Columns/CHARS_TRANSPOSE', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('chars-transpose');
    });

    it('Waiting for "Characteristics - Summary" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Characteristics - Summary" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Characteristics - Summary').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Characteristics - Summary" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Characteristics - Summary')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if Portfolio widget is populated with "CLIENT:/PA3/TEST.ACCT"', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathPortfolioWidget).getText().then(function(val) {
        if (val !== 'CLIENT:/PA3/TEST.ACCT') {
          expect(false).customError('Portfolio widget is not populated with "CLIENT:/PA3/TEST.ACCT", Found ' + val);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Benchmark widget is populated with "RUSSELL:1000"', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathBenchmarkWidget).getText().then(function(val) {
        if (val !== 'RUSSELL:1000') {
          expect(false).customError('Benchmark widget is not populated with "RUSSELL:1000", Found ' + val);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 690928', function() {

    it('Should click on the "Wrench" button from the "Characteristics - Summary" report', function() {
      PA3MainPage.selectWrenchIcon('Characteristics - Summary');

      //Verifying menu drop down is appeared'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Menu drop down list did not display in "Weights" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Transpose" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Transpose').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Columns" checkbox from Transpose menu drop down to check off', function() {
      var porfoliosXpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Columns');
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).check();

      // Verifying if "Dates" is checked
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Dates" checkbox did not check off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Disabling wait for Angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should select "Apply" button to close the "Menu" drop down', function() {
      ThiefHelpers.getButtonClassReference('Apply').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should Wait for "Characteristics" report is recalculated', function() {
      ThiefHelpers.waitUntilSpinnerAppears(PA3MainPage.getProgressIndicatorClassReference());

      PA3MainPage.getProgressIndicatorClassReference('Characteristics - Summary').getProgress().then(function(value) {
        if (!value) {
          expect(false).customError('Loading icon did not appeared');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    it('Verifying if calculated data for "Characteristics - Summary" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Characteristics - Summary').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Characteristics - Summary" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Characteristics - Summary')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
