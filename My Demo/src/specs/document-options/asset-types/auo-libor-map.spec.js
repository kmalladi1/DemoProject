'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: auo-libor-map', function() {

  //Global variables
  var arrAssetTypes = ['Government Cash', 'LIBOR Cash'];

  describe('Test Step ID: Startup Instructions', function() {

    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 492347', function() {

    it('Should launch the PA3 application with "Client:/Pa3/Universe/AUO_LIBOR_MAP" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('auo-libor-map');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Duration`);

    arrAssetTypes.forEach(function(element, index) {
      it('Verifying if "' + element + '" Asset type is present in the calculated report', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Duration', '', '').then(function(rowValues) {
          if (rowValues.indexOf(arrAssetTypes[index]) < 0) {
            expect(false).customError('"' + element + '" Asset type is not present in the calculated report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 492348', function() {

    it('Should expand "Government Cash > Effective Duration Bin 6: 0.0 - 1.0"', function() {
      PA3MainPage.expandTreeInCalculatedReport('Duration', 'Government Cash|Effective Duration Bin 6: 0.0 - 1.0', undefined, 'canvas');

      //Verifying if tree is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Duration', 'Government Cash|Effective Duration Bin 6: 0.0 - 1.0');
    });

    it('Should expand "LIBOR Cash > Effective Duration Bin 6: 0.0 - 1.0"', function() {
      PA3MainPage.expandTreeInCalculatedReport('Duration', 'LIBOR Cash|Effective Duration Bin 6: 0.0 - 1.0', 'LIBOR Cash');

      //Verifying if tree is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Duration', 'LIBOR Cash|Effective Duration Bin 6: 0.0 - 1.0');
    });

    it('Verify if total 3 securities are displayed in the report', function() {
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Duration', 3).count().then(function(value) {
        if (value !== 3) {
          expect(false).customError('3 securities are not displayed in the calculated report. ' + 'Found:"' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if only one security is displayed under "Government Cash > Effective Duration Bin 6: 0.0 - 1.0"', function() {
      SlickGridFunctions.getElementsFromTree('Duration', '', 'Government Cash|Effective Duration Bin 6: 0.0 - 1.0', '').then(function(reference) {
        if (reference.length !== 1) {
          expect(false).customError('More than one security is displayed under "Government Cash > ' + 'Effective Duration Bin 6: 0.0 - 1.0"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if only two securities are displayed under "LIBOR Cash > Effective Duration Bin 6: 0.0 - 1.0"', function() {
      SlickGridFunctions.getElementsFromTree('Duration', '', 'LIBOR Cash|Effective Duration Bin 6: 0.0 - 1.0', '').then(function(reference) {
        if (reference.length !== 2) {
          expect(false).customError('More than two securities are displayed under ' + '"LIBOR Cash > Effective Duration Bin 6: 0.0 - 1.0"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var firstCellRef;var i;
    it('Verify if values in "Port. Ending Effective Duration" column for all securities are same', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Duration', 'Port. Ending Effective Duration').then(function(colref) {
        firstCellRef = colref[0];
        for (i = 1; i < colref.length - 1; i++) {
          //Verifying if all cell values is equal to "firstCellRef"
          if (firstCellRef !== colref[i]) {
            expect(false).customError('values in "Port. Ending Effective Duration" column are not same');
            CommonFunctions.takeScreenShot();
            break;
          }
        }
      });
    });
  });
});
