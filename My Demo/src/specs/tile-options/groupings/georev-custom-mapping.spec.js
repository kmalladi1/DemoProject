'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: georev-custom-mapping', function() {

  //variables
  var column = ['Africa & Middle East', 'Americas', 'Asia/Pacific', 'Europe', 'Japan', 'North America', 'Southeast Asia', '[Unassigned]'];

  describe('Test Step ID: 464091', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:/pa3/georev/Custom_Lookup"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('custom-lookup');
    });

    it('Should wait for weights report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Weights" report is selected in LHP ', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Reports', 'Weights').then(function(ele) {
        ele.getAttribute('class').then(function(val) {
          if (val.indexOf('selected') === -1) {
            expect(false).customError('"Weights" report from LHP is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying weights report header show as "MOCK_UP vs MOCK_UP"', function() {
      PA3MainPage.getHeader().getText().then(function(value) {
        if (value !== 'MOCK_UP vs MOCK_UP') {
          expect(false).customError('"MOCK_UP vs MOCK_UP" header is not show in weights report');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 464111', function() {

    it('Should click on the "wrench" icon in the "Weights" reports and select options', function() {
      PA3MainPage.selectWrenchIcon('Weights');

      //Verifying wrench menu list is displayed in "Weights" report workspace'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Wrench menu drop down list is not displayed in ' + '"Weights" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from menu drop down of " Weights " report workspace ', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function() {

        expect(false).customError('Not able to select "Options" option from "menu dropdown" of ' + '"Weights" report workspace');
        CommonFunctions.takeScreenShot();
      });

      //Verifying tile options mode is opened
      TileOptions.isTileOptionsMode().then(function(value) {
        if (!value) {
          expect(false).customError('Tile Options mode is Closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Groupings" tab on the LHP of tile options', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Groupings"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Groupings') {
          expect(false).customError('"Groupings" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should Select the "GeoRev Region - factset" from selected section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('GeoRev Region - FactSet').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying "GeoRev Region - factset" is selected
      TileOptionsGroupings.getElementFromSelectedContainer('GeoRev Region - FactSet').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') === -1) {
          expect(false).customError('"GeoRev Region - factset" is not  selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying region Mapping file in the DEFINITION section of the accordion shows ' + '"Client:/Pa3/Georev/LOOKUP_TESTING.OFDB"', function() {
      ThiefHelpers.getTextBoxClassReference('Region Mapping File:', TileOptionsGroupings.regionMappingFileTextbox).getText().then(function(value) {
        if (value !== 'Client:/Pa3/Georev/LOOKUP_TESTING.OFDB') {
          expect(false).customError('"Client:/Pa3/Georev/LOOKUP_TESTING.OFDB" is not showing in ' + 'region mapping file in definition section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "OK" to exit the tile Options- Weights view', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(true).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying the groupings in the expanded "Motor Vehicles" group', function() {
      SlickGridFunctions.getElementsFromTree('Weights', '', 'Consumer Durables|Motor Vehicles').then(function(reference) {
        var arr = [];
        reference.forEach(function(ele) {
          arr.push(ele);
        });

        return arr;
      }).then(function(arr) {
        Utilities.arrayCompare(column, arr);
      });
    });
  });

  describe('Test Step ID: 464112', function() {

    it('Should click on the "wrench" icon in the "Weights" reports and select options', function() {
      PA3MainPage.selectWrenchIcon('Weights');

      //Verifying wrench menu list is displayed in "Weights" report workspace'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Wrench menu drop down list is not displayed in ' + '"Weights" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from menu drop down of " Weights " report workspace ', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function() {

        expect(false).customError('Not able to select "Options" option from "menu dropdown" of ' + '"Weights" report workspace');
        CommonFunctions.takeScreenShot();
      });

      //Verifying tile options mode is opened
      TileOptions.isTileOptionsMode().then(function(value) {
        if (!value) {
          expect(false).customError('Tile Options mode is Closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Groupings" tab on the LHP of tile options', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Groupings"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Groupings') {
          expect(false).customError('"Groupings" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Apply to weights" hyperlink at the top right corner', function() {
      ThiefHelpers.getButtonClassReference('Apply To Weights').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should check Contribution in the blasting menu', function() {
      ThiefHelpers.getCheckBoxClassReference('Contribution').check();

      //Verifying the checkbox is checked
      ThiefHelpers.getCheckBoxClassReference('Contribution').isChecked().then(function(value) {
        if (!value) {
          expect(false).customError('"Contribution" is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "OK" in the blasting menu', function() {
      ThiefHelpers.getButtonClassReference('ok', TileOptionsGroupings.getOkOrCancelButtonFromBlastedWindow('OK')).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click "OK" in the Tile Options - Weights view', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(true).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Contribution" from the LHP', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Reports', 'Contribution').then(function(ele) {
        ele.click();

        // Verifying if Contribution is selected from LHP
        ele.getAttribute('class').then(function(classVal) {
          if (classVal.indexOf('selected') === -1) {
            expect(false).customError('Contribution is not selected in LHP');
          }
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for Contribution report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying the "Contribution" report calculates without issue', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Contribution" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution')).toBeTruthy();
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 464113', function() {

    it('Should expand "Consumer Durables > Motor Vehicles" grouping', function() {
      PA3MainPage.expandTreeInCalculatedReport('Contribution', 'Consumer Durables|Motor Vehicles');

      // Verifying if "Consumer Durables > Motor Vehicles" was expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Contribution', 'Consumer Durables|Motor Vehicles');
    });

    it('Verifying the groupings in the expanded "Consumer Durables > Motor Vehicles" group', function() {
      SlickGridFunctions.getElementsFromTree('Contribution', '', 'Consumer Durables|Motor Vehicles').then(function(reference) {
        var arr = [];
        reference.forEach(function(ele) {
          arr.push(ele);
        });

        return arr;
      }).then(function(arr) {
        Utilities.arrayCompare(column, arr);
      });
    });
  });

  describe('Test Step ID: 464114', function() {

    it('Should click to expand North America grouping', function() {
      PA3MainPage.expandTreeInCalculatedReport('Contribution', 'Consumer Durables|Motor Vehicles|North America', 'Consumer Durables|Motor Vehicles');

      // Verifying if "North America" was expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Contribution', 'Consumer Durables|Motor Vehicles|North America');
    });

    it('Verifying the "Canada, Mexico, and United States" are the options seen in the expanded North America grouping', function() {

      //variables
      var column = ['Canada', 'Mexico', 'United States'];

      SlickGridFunctions.getElementsFromTree('Contribution', '', 'Consumer Durables|Motor Vehicles|North America').then(function(reference) {
        var arr = [];
        reference.forEach(function(ele) {
          arr.push(ele);
        });

        return arr;
      }).then(function(arr) {
        if (arr.length !== 3) {
          expect(false).customError('More than 3 options seen in the expanded North America grouping');
          CommonFunctions.takeScreenShot();
        } else {
          Utilities.arrayCompare(column, arr);
        }
      });
    });
  });
});
