'use strict';

require(__dirname + '/../../../index.js');

var setDateOrder = function(option) {
  // Click on "Wrench" icon and select "options" from the "wrench" menu
  CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Total Returns', 'Options');

  it('Should click on the "Date" tab from the LHP on tile options', function() {
    ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Dates').select();

    // Verifying if "Date Lagging" is selected in the LHP
    ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Dates').isSelected().then(function(selected) {
      if (!selected) {
        expect(false).customError('"Date" tab is not selected in the LHP.');
        CommonFunctions.takeScreenShot();
      }
    });

  });

  it('Should click on the "Start Date" drop down', function() {
    TileOptionsDates.getDateDropDown('Start Date').click().then(function() {
    }, function(err) {

      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });

  });

  it('Should select "Two Years Ago" from the Start Date drop down', function() {
    TileOptionsDates.getOptionFromDateDropDown('Two Years Ago').click().then(function() {
    }, function(err) {

      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });

    // Verifying that "Two Years ago" is set in Start Date input box
    ThiefHelpers.getTextBoxClassReference('Start Date:').getText().then(function(text) {
      if (text !== 'Two Years Ago') {
        expect(false).customError('"Two Years ago" is not set in "Start Date" input box, Found: ' + text);
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Should click on "Date Order" drop down and select "' + option + '"', function() {
    ThiefHelpers.getDropDownSelectClassReference('Date Order:').open();

    // Selecting Latest to Earliest
    ThiefHelpers.getDropDownSelectClassReference('Date Order:').selectItemByText(option);
  });

  it('Verifying if the "Date Order" drop down is set to "' + option + '"', function() {
    ThiefHelpers.getDropDownSelectClassReference('Date Order:').getSelectedText().then(function(text) {
      if (text !== option) {
        expect(false).customError('"Date Order" drop down did not set to "' + option + '"; Found:' + text);
        CommonFunctions.takeScreenShot();
      }
    });
  });

  CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Total Returns');

  CommonPageObjectsForPA3.verifyIfReportIsCalculated('Total Returns');
};

describe('Test Case: date-order', function() {

  describe('Test Step ID: 507134', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch PA3 application with "DEFAULT" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default');
    });

    it('Should enter "CLIENT:/NEW_PA_TEST_SUITE/PRICING/SPN_SP50_ACCT.ACCT" in "Portfolio" widget', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathPortfolioWidget).setText('CLIENT:/NEW_PA_TEST_SUITE/PRICING/SPN_SP50_ACCT.ACCT');

      // Verifying that "CLIENT:/NEW_PA_TEST_SUITE/PRICING/SPN_SP50_ACCT.ACCT" is entered
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathPortfolioWidget).getText().then(function(text) {
        if (text !== 'CLIENT:/NEW_PA_TEST_SUITE/PRICING/SPN_SP50_ACCT.ACCT') {
          expect(false).customError('Portfolio widget is not populated with "CLIENT:/NEW_PA_TEST_SUITE/PRICING/SPN_SP50_ACCT.ACCT", Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should type "RUSSELL:1000" in the Benchmark widget', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathBenchmarkWidget).setText('RUSSELL:1000');

      PA3MainPage.getWidgetBox('Benchmark').sendKeys(protractor.Key.ENTER);

      // Verifying if RUSSELL:1000 is enetered in the wodget
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathBenchmarkWidget).getText().then(function(val) {
        if (val !== 'RUSSELL:1000') {
          expect(false).customError('Benchmark widget is not populated with "RUSSELL:1000" , Found: ' + val);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');
  });

  describe('Test Step ID: 507135', function() {

    it('Should select "Performance" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Performance', 'Performance').select();

      // Verifying "Weights" Report is selected.
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Performance', 'Performance').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Performance" is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    setDateOrder('Latest to Earliest');

    var startDateArray = [];

    // As start date will anyways be less than end date, fetching only start date for order verification.
    it('Fetching date ranges from first column of "Total Returns" report', function() {
      //Verifying "Finance"
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Total Returns', '', '').then(function(cols) {
        cols.forEach(function(value) {
          if (value !== 'Total') {
            var temp = value.split(' to ')[0];
            startDateArray.push(temp);
          }
        });
      });
    });

    it('Verify if order of dates in the report is displayed in "Latest to Earliest"(Ascending order)', function() {
      Utilities.verifyDatesOrder(startDateArray, 'Ascending');
    });
  });

  describe('Test Step ID: 507136', function() {

    setDateOrder('Earliest to Latest');

    var startDateArray = [];

    // As start date will anyways be less than end date, fetching only start date for order verification.
    it('Fetching date ranges from first column of "Total Returns" report', function() {
      //Verifying "Finance"
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Total Returns', '', '').then(function(cols) {
        cols.forEach(function(value) {
          if (value !== 'Total') {
            var temp = value.split(' to ')[0];
            startDateArray.push(temp);
          }
        });
      });
    });

    it('Verify if order of dates in the report is displayed in "Earliest to Latest"(Descending order)', function() {
      Utilities.verifyDatesOrder(startDateArray, 'Descending');
    });
  });
});
