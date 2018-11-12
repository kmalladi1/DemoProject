'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: auo-gov-cash', function() {

  // Variables
  var arrRows = ['Total', 'Government Cash'];
  var arrExpected1 = ['0.05211184', '0.05211184'];
  var arrExpected2 = ['0.10567466', '0.10567466'];
  var arrExpected3 = ['0.01329994', '0.01329994'];

  describe('Test Step ID: Startup Instructions', function() {

    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 492286', function() {

    it('Should launch the PA3 application with "Client:/Pa3/Universe/AUO_GOV_CASH"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('auo-gov-cash');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Contribution`);

    arrRows.forEach(function(row, index) {
      it('Verifying if "' + row + '" under "Port. Total Return ( Local )" is "' + arrExpected1[index] + '"', function() {
        SlickGridFunctions.getCellReference('Contribution', row, '', 'Port. Total Return ( Local )').then(function(cellRef) {
          cellRef.getText().then(function(val) {
            if (val !== arrExpected1[index]) {
              expect(false).customError('"' + row + '" under "Port. Total Return ( Local )" is not ' + '"' + arrExpected1[index] + '"');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 492287', function() {

    it('Should click on "Hamburger" icon next to "Portfolio"', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Account Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is no open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "CASH_1M" from the drop down', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'CASH_1M').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "OK" button from the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      expect(PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('Class')).not.toContain('active');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Contribution`);

    it('Verifying if Header of the report shows "CASH_1M"', function() {
      PA3MainPage.getHeader().getText().then(function(val) {
        if (val !== 'CASH_1M') {
          expect(false).customError('Header of the report do not shows "CASH_1M"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 492289', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Add/Remove', 'Asset Types', 'document options');

    it('Should click "Use Government Cash" inside the "[Cash] > Government Cash" tree from the Selected section', function() {
      DocumentOptionsAssetTypeAddRemove.getElementInsideTree('[Cash]|Government Cash', 'Use Government Cash', 'Selected').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Use Government Cash is selected
      DocumentOptionsAssetTypeAddRemove.getElementInsideTree('[Cash]|Government Cash', 'Use Government Cash', 'Selected').getAttribute('class').then(function(classVal) {
        if (classVal.indexOf('selected') === -1) {
          expect(false).customError('"Use Government Cash" inside the "[Cash] > Government Cash" tree' + ' from the Selected section is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "One Month" from the "Government Cash" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('One Month', 'Government Cash');

      // Verifying if One Month is selected from the drop down
      ThiefHelpers.verifySelectedDropDownText('One Month', 'Government Cash');
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Dcoument Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Contribution`);

    arrRows.forEach(function(row, index) {
      it('Verifying if "' + row + '" under "Port. Total Return ( Local )" is "' + arrExpected2[index] + '"', function() {
        SlickGridFunctions.getCellReference('Contribution', row, '', 'Port. Total Return ( Local )').then(function(cellRef) {
          cellRef.getText().then(function(val) {
            if (val !== arrExpected2[index]) {
              expect(false).customError('"' + row + '" under "Port. Total Return ( Local )" is ' + 'not "' + arrExpected2[index] + '"');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 492345', function() {

    it('Should click on "Hamburger" icon next to "Portfolio"', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Account Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is no open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "CASH_3M" from the drop down', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'CASH_3M').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "OK" button from the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      expect(PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('Class')).not.toContain('active');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Contribution`);

    it('Verifying if Header of the report shows "CASH_3M"', function() {
      PA3MainPage.getHeader().getText().then(function(val) {
        if (val !== 'CASH_3M') {
          expect(false).customError('Header of the report do not shows "CASH_3M"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 492346', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Add/Remove', 'Asset Types', 'document options');

    it('Should click "Use Government Cash" inside the "[Cash] > Government Cash" tree from the Selected section', function() {
      DocumentOptionsAssetTypeAddRemove.getElementInsideTree('[Cash]|Government Cash', 'Use Government Cash', 'Selected').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Use Government Cash is selected
      DocumentOptionsAssetTypeAddRemove.getElementInsideTree('[Cash]|Government Cash', 'Use Government Cash', 'Selected').getAttribute('class').then(function(classVal) {
        if (classVal.indexOf('selected') === -1) {
          expect(false).customError('"Use Government Cash" inside the "[Cash] > Government Cash" tree' + ' from the Selected section is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Three Month" from the "Government Cash" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Three Month', 'Government Cash');

      // Verifying if Three Month is selected from the drop down
      ThiefHelpers.verifySelectedDropDownText('Three Month', 'Government Cash');
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Dcoument Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Contribution`);

    var flag = 0;
    arrRows.forEach(function(row, index) {
      it('Verifying if "' + row + '" under "Port. Total Return ( Local )" is "' + arrExpected3[index] + '"', function() {
        SlickGridFunctions.getCellReference('Contribution', row, '', 'Port. Total Return ( Local )').then(function(cellRef) {
          cellRef.getText().then(function(val) {
            if (val !== arrExpected3[index]) {
              flag = flag + 1;
              expect(false).customError('"' + row + '" under "Port. Total Return ( Local )" is not ' + '"' + arrExpected3[index] + '"');
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });
});
