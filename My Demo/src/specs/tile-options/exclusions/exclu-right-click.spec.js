'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: exclu-right-click', function() {

  // Local function(s)
  var rightClickAndGetDropDownReference = function(eleRef) {

    var defer = protractor.promise.defer(); var dropDownRef;
    var promise = defer.promise;

    // Right click on the given element reference
    browser.actions().mouseMove(eleRef).perform();    // Move the mouse over the element
    browser.actions().click(protractor.Button.RIGHT).perform();   // Perform right click operation

    var xpathRef = '//*[contains(@class, "context-menu")]';

    // Get the reference required Dropdown
    dropDownRef = element(by.xpath(xpathRef));
    defer.fulfill(dropDownRef);

    return promise;
  };

  describe('Test Step ID: 523783', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:/Pa3/Right_click/RIGHT_CLICK_TEST" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('right-click-test');
    });

    it('Verifying that "Asset Type Grouping" report is selected', function() {
      expect(PA3MainPage.getReports('Asset Type Grouping').getAttribute('class')).toContain('selected');
    });

    it('Verify that "Asset Type Grouping" report is calculated', function() {
      // Wait for report calculation to finish
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000);

      // Verifying if Weights report is calculated
      PA3MainPage.isReportCalculated('Weights').then(function(value) {
        if (!value) {
          expect(false).customError('"Weights" report is not calculated.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load
      browser.sleep(3000);
    });

  });

  describe('Test Step ID: 523786', function() {

    it('Should select "Performance Overview" from the LHP', function() {
      PA3MainPage.getReports('Performance Overview').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Performance Overview" report is selected
      expect(PA3MainPage.getReports('Performance Overview').getAttribute('class')).toContain('selected');
    });

    it('Verify that "Total Returns" report calculated', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000);

      // Verifying if "Total Returns" report is calculated
      PA3MainPage.isReportCalculated('Total Returns').then(function(value) {
        if (!value) {
          expect(false).customError('"Total Returns" report is not calculated.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Total Returns')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Should right Click on any date range in first column of the calculated report and Verify that right click menu ' +
      'does not appear', function() {
      rightClickAndGetDropDownReference(PA3MainPage.getAllElementsFromCalculatedReport('Total Returns',
        'slick-pane slick-pane-bottom slick-pane-left').first()).then(function(dropDownRef) {
        expect(dropDownRef.isPresent()).toBeFalsy();
      });
    });

  });

  describe('Test Step ID: 523789', function() {

    it('Should select "Characteristics Overview" from the LHP', function() {
      PA3MainPage.getReports('Characteristics Overview').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Characteristics Overview" report is selected
      PA3MainPage.getReports('Characteristics Overview').getAttribute('class').then(function(value) {
        expect(value.indexOf('selected') > -1).customError('"Characteristics Overview" is not selected.');
        if (value.indexOf('selected') < 0) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "Summary Characteristics" report is calculated', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000).then(function() {
      }, function(err) {

        expect(false).customError(err);
      });

      // Verifying if "Summary Characteristics" report is calculated
      PA3MainPage.isReportCalculated('Summary Characteristics').then(function(value) {
        if (!value) {
          expect(false).customError('"Summary Characteristics" report is not calculated.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Summary Characteristics')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Should right click on "Market Capitalization" in the first column of the calculated report and Verify that ' +
      'right click menu does not appear.', function() {
      rightClickAndGetDropDownReference(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Summary Characteristics', 1,
        'Market Capitalization', 'slick-pane slick-pane-top slick-pane-left')).then(function(dropDownRef) {
        expect(dropDownRef.isPresent()).toBeFalsy();
      });
    });

  });

  describe('Test Step ID: 524418', function() {

    it('Should click on the "Wrench" icon in the "Summary Characteristics" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Summary Characteristics').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Options" from the menu list', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile Options - Summary Characteristics" view appeared', function() {
      TileOptions.isTileOptionsMode().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Tile Options - Summary Characteristics" mode is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Exclusions" options from LHP', function() {
      TileOptions.getLHPOption('Exclusions').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verify "Exclusions" tab is selected
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Exclusions') {
          expect(false).customError('"Exclusions" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for Available Section Securities to load.', function() {
      Utilities.waitUntilElementDisappears(TileOptionsExclusions.getLoadingIcon(), 20000);
    });

    it('Verify that elements are appeared in "Available" container', function() {
      TileOptionsExclusions.getAllElementsFromSpecifiedLevelOfAvailableContainer(1).each(function(element) {
        expect(element.isPresent()).toBeTruthy();
      });
    });

    it('Should click on the "Cancel" Button', function() {
      TileOptions.getHeaderButton('Cancel').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(notClosed) {
        if (notClosed) {
          expect(false).customError('"Tile Options" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
