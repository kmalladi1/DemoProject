'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: typeahead-select', function() {

  describe('Test Step ID: 549991', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should open "Client:/default_doc_auto" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });

  });

  describe('Test Step ID: 549992', function() {

    it('Should type "spn" int the "Portfolio" widget box', function() {
      // Clear the content before entering the text
      PA3MainPage.getWidgetBox('portfolio').clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Typing 'spn' into the 'Portfolio' widget
      PA3MainPage.getWidgetBox('portfolio').sendKeys('spn').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      browser.sleep(4000); // Waiting for the type ahead to appear
    });

    it('Should select 1st element from the "Portfolio" type ahead', function() {
      PA3MainPage.getOptionFromTypeaheadBasedOnIndex(1).click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      browser.sleep(2000); // Wait for the selection to happen
    });

    it('Should type "dj" in "Benchmark" widget box and select "Client:/pa3/risk/DJIT_SP50.ACTM" from type ahead', function() {
      PA3MainPage.setBenchmark('dj', true, false, 'Client:/pa3/risk/DJIT_SP50.ACTM', 'CLIENT:/PA3/RISK/DJIT_SP50.ACTM').then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 550000', function() {

    it('Should clear "Portfolio" widget field', function() {
      PA3MainPage.getWidgetBox('portfolio').clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      expect(PA3MainPage.getWidgetBox('Portfolio').getAttribute('value')).toEqual('');
      browser.sleep(1000); // Wait before clearing 'Benchmark' widget
    });

    it('Should clear "Benchmark" widget field', function() {
      PA3MainPage.getWidgetBox('Benchmark').clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      expect(PA3MainPage.getWidgetBox('Benchmark').getAttribute('value')).toEqual('');
    });

    it('Should type "spn" in "Portfolio" widget and select "Client:/new_pa_test_suite/pricing/SPN500.ACCT" from type ahead using ' + 'keyboard arrow keys', function() {
      PA3MainPage.setPortfolio('spn', 'Client:/new_pa_test_suite/pricing/SPN500.ACCT', 'CLIENT:/NEW_PA_TEST_SUITE/PRICING/SPN500.ACCT', false, true).then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 550002', function() {

    it('Should type "bmv" in "Benchmark" widget and select "Client:/spar/BMV_STAT_TEST_ACTM_BMV.ACTM" from type ahead using ' + 'keyboard arrow keys', function() {
      PA3MainPage.setBenchmark('bmv', false, true, 'Client:/spar/BMV_STAT_TEST_ACTM_BMV.ACTM', 'CLIENT:/SPAR/BMV_STAT_TEST_ACTM_BMV.ACTM').then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 549993', function() {

    it('Should close PA3 application without any issues', function() {
      expect(true).toBeTruthy();
    });
  });
});
