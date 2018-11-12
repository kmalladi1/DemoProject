'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: st-barra', function() {

  describe('Test Step ID: Startup Instructions', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);
  });

  describe('Test Step ID: 625784', function() {

    it('Should open PA3 Application with "Client:/Pa3/Risk/GEM2L_UPDATE"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('gem2l-update');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var arrValues = [{name: 'Portfolio', val: 'BENCH:DJII', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'benchmark', val: 'CASH:USD', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });

    var multiheaders = ['Barra Global Long-Term Model (GEM3L)', 'Barra Global Long-Term Model (GEM2L)', 'NIS US Fundamental Model', 'R-Squared Daily Global Equity Model USD V2'];

    multiheaders.forEach(function(multiheader) {

      it('Verifying if the "Percent Return (Event Wght)" column for "' + multiheader + '" multiheader is not empty', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Percent Return (Event Wght)', multiheader).then(function(values) {
          values.forEach(function(value) {
            if (value === '') {
              expect(false).customError('"Percent Return (Event Wght)" column for "' + multiheader + '" multiheader is empty');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    multiheaders.forEach(function(multiheader) {

      it('Verifying if the "Percent Return (Time Wght)" column for "' + multiheader + '" multiheader is not empty', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Percent Return (Time Wght)', multiheader).then(function(values) {
          values.forEach(function(value) {
            if (value === '') {
              expect(false).customError('"Percent Return (Time Wght)" column for "' + multiheader + '" multiheader is empty');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    multiheaders.forEach(function(multiheader) {

      //Known issue RPD:34262503(Could not classify. PA Asset Type is EQ_EQ_COMMON is displayed but expected was "" )
      it('Verifying if the "Stress Test Uncovered Reason" column for "' + multiheader + '" multiheader is empty', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Stress Test Uncovered Reason', multiheader).then(function(values) {
          values.splice(0, 1);
          values.forEach(function(value, index) {
            if (multiheader === 'NIS US Fundamental Model') {
              if (value === '') {
                expect(true).toBeTruthy();
              }else if (value === 'Could not classify. PA Asset Type is EQ_EQ_COMMON') {
                SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(securities) {
                  if (securities[index + 1] !== 'DowDuPont Inc.') {
                    expect(false).customError('"Stress Test Uncovered Reason" column for "' + multiheader + '" multiheader is not displayed as expected: "Could not classify. PA Asset Type is EQ_EQ_COMMON".' +
                      ' Found: "' + value + '" for "DowDuPont Inc." ');
                    CommonFunctions.takeScreenShot();
                  }
                });
              }else {
                expect(false).customError('"Stress Test Uncovered Reason" column for "' + multiheader + '" multiheader is displayed as expected: "empty" or "Could not classify. PA Asset Type is EQ_EQ_COMMON".' +
                  ' Found: "' + value + '" ');
                CommonFunctions.takeScreenShot();
              }
            }else {
              if (value !== '') {
                expect(false).customError('"Stress Test Uncovered Reason" column for "' + multiheader + '" multiheader is not empty');
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 625819', function() {

    // Select Dates tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Dates');

    it('Should select "Previous Close" from the "End Date" drop down', function() {
      ThiefHelpers.getTextBoxClassReference('End Date:').selectOptionByText('Previous Close').then(function() {
        // Adding delay to wait for request to process(RPD:41035011)
        browser.sleep(2000);
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "One Week Ago" is set in End Date input box
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(text) {
        if (text !== 'Previous Close') {
          expect(false).customError('"Previous Close" is not set in "End Date" input box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if the date range of "Weights" report is displayed', function() {
      PA3MainPage.getDateHyperLink('Weights').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Weights" report did not display date range');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // As per Saadia's suggestion to verify previous close date we need to navigate through dates tab and verify end date there is set to previous close
    // Select Dates tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Dates');

    it('Verifying if the "End Date" drop down is set to "Previous Close"', function() {
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(text) {
        if (text !== 'Previous Close') {
          expect(false).customError('"Previous Close" did not present in the "End Date" field; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var multiheaders = ['Barra Global Long-Term Model (GEM3L)', 'Barra Global Long-Term Model (GEM2L)', 'NIS US Fundamental Model', 'R-Squared Daily Global Equity Model USD V2'];

    multiheaders.forEach(function(multiheader) {

      it('Verifying if the "Percent Return (Event Wght)" column for "' + multiheader + '" multiheader is not empty', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Percent Return (Event Wght)', multiheader).then(function(values) {
          values.forEach(function(value) {
            if (value === '') {
              expect(false).customError('"Percent Return (Event Wght)" column for "' + multiheader + '" multiheader is empty');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    multiheaders.forEach(function(multiheader) {

      it('Verifying if the "Percent Return (Time Wght)" column for "' + multiheader + '" multiheader is not empty', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Percent Return (Time Wght)', multiheader).then(function(values) {
          values.forEach(function(value) {
            if (value === '') {
              expect(false).customError('"Percent Return (Time Wght)" column for "' + multiheader + '" multiheader is empty');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    multiheaders.forEach(function(multiheader) {

      //Known issue RPD:34399858(Could not classify. PA Asset Type is EQ_EQ_COMMON is displayed but expected was "" )
      it('Verifying if the "Stress Test Uncovered Reason" column for "' + multiheader + '" multiheader is empty', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Stress Test Uncovered Reason', multiheader).then(function(values) {
          values.splice(0, 1);
          values.forEach(function(value, index) {
            if (multiheader === 'NIS US Fundamental Model') {
              if (value === '') {
                expect(true).toBeTruthy();
              }else if (value === 'Could not classify. PA Asset Type is EQ_EQ_COMMON') {
                SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(securities) {
                  if (securities[index + 1] !== 'DowDuPont Inc.') {
                    expect(false).customError('"Stress Test Uncovered Reason" column for "' + multiheader + '" multiheader is not displayed as expected: "Could not classify. PA Asset Type is EQ_EQ_COMMON".' +
                      ' Found: "' + value + '" for "DowDuPont Inc." ');
                    CommonFunctions.takeScreenShot();
                  }
                });
              }else {
                expect(false).customError('"Stress Test Uncovered Reason" column for "' + multiheader + '" multiheader is displayed as expected: "empty" or "Could not classify. PA Asset Type is EQ_EQ_COMMON".' +
                  ' Found: "' + value + '" ');
                CommonFunctions.takeScreenShot();
              }
            }else {
              if (value !== '') {
                expect(false).customError('"Stress Test Uncovered Reason" column for "' + multiheader + '" multiheader is not empty');
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });
});
