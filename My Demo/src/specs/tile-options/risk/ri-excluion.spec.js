'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-excluion', function() {

  var securityColumnArray = ['UNEXPECTED INFLATION', 'INDUSTRIAL PRODUCTION', 'HOUSING STARTS', 'OIL PRICE', 'EXCHANGE RATE US$',
    'CREDIT RISK PREMIUM', 'SLOPE TERM STRUCTURE', 'RESIDUAL MARKET', 'BLIND FACTOR 2', 'BLIND FACTOR 3', 'BLIND FACTOR 4', 'BLIND FACTOR 5',];
  var count = 0;
  var screenShot = 0;
  var tempSecurityColumnValuesArray = [];
  var allElementsFromAvailableSection = [];

  describe('Test Step ID: 645457', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:;Pa3;Risk;Risk_Exclusions_UI"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('risk-exclusions-ui');
    });

    it('Should wait for "Risk Exposures" report to calculate', function() {
      // Waiting for "Risk Exposures" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Risk Exposures'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          expect(false).customError('"Calculation Error" found while report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Risk Exposures" report loaded without any error', function() {

      // Verifying if "Risk Exposures" report calculated
      PA3MainPage.isReportCalculated('Risk Exposures').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"Risk Exposures" report is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Risk Exposures')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Risk Exposures" report: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Portfolio" widget displays "CLIENT:/PA3/TEST.ACCT"', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathPortfolioWidget).getText().then(function(val) {
        if (val !== 'CLIENT:/PA3/TEST.ACCT') {
          expect(false).customError('"Portfolio" widget is not displayed with "CLIENT:/PA3/TEST.ACCT"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Benchmark" widget displays "RUSSELL:1000"', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathBenchmarkWidget).getText().then(function(val) {
        if (val !== 'RUSSELL:1000') {
          expect(false).customError('"Benchmark" widget is not displayed with "RUSSELL:1000"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if all the values from the first/Security column in the "Risk Exposures" report match with the values in securityColumnArray',
      function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Risk Exposures', '').then(function(securityColumnValuesArray) {
          tempSecurityColumnValuesArray = securityColumnValuesArray;
          for (var i = 0; i < securityColumnArray.length; i++) {
            count = 0;
            for (var j = 0; j < securityColumnValuesArray.length - 1; j++) {
              if (securityColumnArray[i] === securityColumnValuesArray[j]) {
                count = count + 1;
              }
            }

            if (count === 0) {
              expect(false).customError('"' + securityColumnArray[i] + '" security is not displayed in "Risk Exposures" report');
              CommonFunctions.takeScreenShot();
            } else if (count > 1) {
              expect(false).customError('"' + securityColumnArray[i] + '" is displayed more than once in "Risk Exposures" report');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });

  });

  describe('Test Step ID: 645458', function() {

    it('Should click on wrench Icon in "Risk Exposures" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Risk Exposures').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on wrench Icon in "Risk Exposures" report workspace');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Options" from "Wrench" drop down menu', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function() {
        expect(false).customError('Unable to select "Options" from "Wrench" drop down menu');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile Options" mode opened', function() {
      TileOptions.isTileOptionsMode().then(function(status) {
        if (!status) {
          expect(false).customError('Tile Options mode is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Exclusions" tab from "Tile - Options" LHP', function() {
      TileOptions.getLHPOption('Exclusions').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Exclusions" tab from "Tile - Options" LHP');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Exclusions"', function() {
      TileOptions.getOptionTitle().getText().then(function(text) {
        if (text !== 'Exclusions') {
          expect(false).customError('View not changed to "Exclusions" instead "' + text + '" found');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should get all elements from "Available" section', function() {
      TileOptionsExclusions.getAllElementsFromSpecifiedLevelOfAvailableContainer(1).then(function(allElements) {
        allElements.forEach(function(elementRef) {
          elementRef.getText().then(function(text) {
            allElementsFromAvailableSection.push(text);
          });
        });
      });
    });

    it('Verifying if no security is available in "Available" that is available in security column of "Risk Exposures" report', function() {
      for (var i = 0; i < tempSecurityColumnValuesArray.length - 1; i++) {
        count = 0;
        screenShot = 0;
        for (var j = 1; j < allElementsFromAvailableSection.length; j++) {
          if (tempSecurityColumnValuesArray[i] === allElementsFromAvailableSection[j]) {
            count = count + 1;
            screenShot = screenShot + 1;
          }
        }

        if (count > 0) {
          expect(false).customError('"' + tempSecurityColumnValuesArray[i] + '" security is available in "Available" section');
        }
      }

      if (screenShot > 0) {
        CommonFunctions.takeScreenShot();
      }
    });

  });

  describe('Test Step ID: 645460', function() {

    it('Should click on "Cancel" button at the top of "Tile Options - Risk Exposures" dialog', function() {
      ThiefHelpers.getButtonClassReference('Cancel').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Cancel" button at the top');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile Options" dialog is closed', function() {
      TileOptions.isTileOptionsMode().then(function(status) {
        if (status) {
          expect(false).customError('Tile Options mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
