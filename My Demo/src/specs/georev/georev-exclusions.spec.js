'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: georev-exclusions', function() {

  // Variables
  var arrRows = ['Africa & Middle East', 'Americas', 'Asia/Pacific', 'Europe', '[Unassigned]'];

  describe('Test StepID: 467666', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:/pa3/georev/GEOREV_Exclusions" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('georev-exclusions');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    arrRows.forEach(function(val) {
      it('Verifying if "' + val + '" is present in report', function() {
        browser.driver.executeScript(function() {
          var row = [];
          var child = [];
          var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
          var rows = slickObject.grid.getDataLength();

          // Getting all rows reference
          for (var i = 1; i < rows; i++) {
            row = slickObject.grid.getDataItem(i).name;
            if (row === arguments[0]) {
              child.push(slickObject.grid.getDataItem(i).hasChildren);
            }
          }

          return child;
        }, val).then(function(value) {
          value.forEach(function(bool) {
            if (bool !== true) {
              expect(false).customError('Error: "' + val + '" is not grouped');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it(' Verifying if data is seen only "GeoRev Portfolio Exposure", "GeoRevBenchmark Exposure"' + ' and "Georev Active Exposure"', function() {
      PA3MainPage.getAllColumnOfCalculatedReport('Weights').each(function(element) {
        Utilities.scrollElementToVisibility(element);
        element.getText().then(function(val) {
          if (val !== 'GeoRev Portfolio Exposure' && val !== 'GeoRev Benchmark Exposure' && val !== 'GeoRev Active Exposure') {
            PA3MainPage.getAllCellsOfGivenColumn('Weights', val, 'slick-pane slick-pane-bottom slick-pane-right').then(function(element1) {
              element1.forEach(function(val1) {
                expect(val1.getText()).toEqual('');
              });
            });
          } else {
            PA3MainPage.getAllCellsOfGivenColumn('Weights', val, 'slick-pane slick-pane-bottom slick-pane-right').then(function(element1) {
              element1.forEach(function(val1) {
                expect(val1.getText()).not.toEqual('');
              });
            });
          }
        });
      });
    });
  });

  describe('Test StepID: 467670', function() {

    // Variables
    var itemRef;
    var arrValue = [];
    var sum = 0;

    it('Should click on "Americas"', function() {
      itemRef = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Americas');

      // selecting "Americas" element
      itemRef.click().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should right click and select "Exclusions>Exclude selected rows" option', function() {
      PA3MainPage.rightClickAndSelectOption(itemRef, 'Exclusions|Exclude Selected Rows');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if Total for GeoRev Portfolio Exposure column is 100', function() {
      PA3MainPage.getValueFromCalculatedReport('Weights', 'Total', 'GeoRev Portfolio Exposure', 'grid-canvas grid-canvas-top grid-canvas-left', 'grid-canvas grid-canvas-top grid-canvas-right').then(function(val) {
        if (val !== '100.00') {
          expect(false).customError('Error: Total for "GeoRev Portfolio Exposure" column is not "100"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Collecting all cell values of "GeoRev Portfolio Exposure" column', function() {
      PA3MainPage.getAllCellsOfGivenColumn('Weights', 'GeoRev Portfolio Exposure', 'slick-pane slick-pane-bottom slick-pane-right').then(function(element) {
        element.forEach(function(val) {
          val.getText().then(function(val1) {
            arrValue.push(val1);
          });
        });
      });
    });

    it('Adding all cell of "GeoRev Portfolio Exposure" and verifying if sum is upto "100"', function() {
      for (var i = 0; i < arrValue.length; i++) {
        arrValue[i] = parseFloat(arrValue[i]);
        sum += arrValue[i];
      }

      expect(sum).toBeCloseTo(100.00, 1);
    });
  });

  describe('Test StepID: 467674', function() {

    // Variables
    var itemRef;
    var arrValue = [];
    var sum = 0;

    it('Should click on "Europe"', function() {
      itemRef = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Europe');

      // selecting "Europe" element
      itemRef.click().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should right click and select "Exclusions>Hide Selected Rows" option', function() {
      PA3MainPage.rightClickAndSelectOption(itemRef, 'Exclusions|Hide Selected Rows');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if Total for GeoRev Portfolio Exposure column is 100', function() {
      PA3MainPage.getValueFromCalculatedReport('Weights', 'Total', 'GeoRev Portfolio Exposure', 'grid-canvas grid-canvas-top grid-canvas-left', 'grid-canvas grid-canvas-top grid-canvas-right').then(function(val) {
        if (val !== '100.00') {
          expect(false).customError('Error: Total for "GeoRev Portfolio Exposure" column is not "100"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Collecting all cell values of "GeoRev Portfolio Exposure" column', function() {
      PA3MainPage.getAllCellsOfGivenColumn('Weights', 'GeoRev Portfolio Exposure', 'slick-pane slick-pane-bottom slick-pane-right').then(function(element) {
        element.forEach(function(val) {
          val.getText().then(function(val1) {
            arrValue.push(val1);
          });
        });
      });
    });

    it('Adding all cell of "GeoRev Portfolio Exposure" and verifying if sum is less than "100"', function() {
      for (var i = 0; i < arrValue.length; i++) {
        arrValue[i] = parseFloat(arrValue[i]);
        sum += arrValue[i];
      }

      expect(parseInt(sum)).toBeLessThan(parseInt('100'));
    });
  });

  describe('Test StepID: 467677', function() {

    // Variables
    var itemRef;
    var arrValue = [];
    var sum = 0;

    it('Should right click in the report and select "Exclusions>Clear Exclusions"', function() {
      itemRef = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Asia/Pacific');

      // selecting "Asia/Pacific" element
      itemRef.click().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // performing right click operation
      PA3MainPage.rightClickAndSelectOption(itemRef, 'Exclusions|Clear Exclusions');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should right click in the report and select "Exclusions>Clear Hidden"', function() {
      itemRef = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Asia/Pacific');

      // selecting "Asia/Pacific" element
      itemRef.click();

      // performing right click operation
      PA3MainPage.rightClickAndSelectOption(itemRef, 'Exclusions|Clear Hidden');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    arrRows.forEach(function(val) {
      it('Verifying if "' + val + '" is present in report', function() {
        browser.driver.executeScript(function() {
          var row = [];
          var child = [];
          var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
          var rows = slickObject.grid.getDataLength();

          // Getting all rows reference
          for (var i = 1; i < rows; i++) {
            row = slickObject.grid.getDataItem(i).name;
            if (row === arguments[0]) {
              child.push(slickObject.grid.getDataItem(i).hasChildren);
            }
          }

          return child;
        }, val).then(function(value) {
          value.forEach(function(bool) {
            if (bool !== true) {
              expect(false).customError('Error: "' + val + '" is not grouped');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if Total for GeoRev Portfolio Exposure column is 100', function() {
      PA3MainPage.getValueFromCalculatedReport('Weights', 'Total', 'GeoRev Portfolio Exposure', 'grid-canvas grid-canvas-top grid-canvas-left', 'grid-canvas grid-canvas-top grid-canvas-right').then(function(val) {
        if (val !== '100.00') {
          expect(false).customError('Error: Total for "GeoRev Portfolio Exposure" column is not "100"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Collecting all cell values of "GeoRev Portfolio Exposure" column', function() {
      PA3MainPage.getAllCellsOfGivenColumn('Weights', 'GeoRev Portfolio Exposure', 'slick-pane slick-pane-bottom slick-pane-right').then(function(element) {
        element.forEach(function(val) {
          val.getText().then(function(val1) {
            arrValue.push(val1);
          });
        });
      });
    });

    it('Adding all cell of "GeoRev Portfolio Exposure" and verifying if sum is upto "100"', function() {
      for (var i = 0; i < arrValue.length; i++) {
        arrValue[i] = parseFloat(arrValue[i]);
        sum += arrValue[i];
      }

      if (Math.round(sum).toString() !== '100') {
        expect(false).customError('After adding all cell of "GeoRev Portfolio Exposure" the sum is not equal to "100". ' + 'Expected: "100", Found: "' + Math.round(sum).toString() + '"');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test StepID: 467687', function() {

    // Variables
    var algeriaTotal;
    var nestleValue;
    var itemRef;

    it('Should expand "Africa & Middle East > Algeria"', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Africa & Middle East|Algeria');

      // Verifying if "Africa & Middle East > Algeria" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Africa & Middle East|Algeria');
    });

    it('Collecting "Algeria" group total value in "GeoRev Portfolio Exposure "', function() {
      PA3MainPage.getValueFromCalculatedReport('Weights', 'Algeria', 'GeoRev Portfolio Exposure').then(function(value) {
        algeriaTotal = value;
      });
    });

    it('Should select "Nestle S.A." and Collecting "GeoRev Portfolio Exposure" column value of "Nestle S.A."', function() {
      itemRef = PA3MainPage.getElementFromCalculatedTree('Weights', 'Africa & Middle East|Algeria', 'Nestle S.A.');

      itemRef.click();

      // Collecting "Nestle S.A." value
      PA3MainPage.getValueFromCalculatedReport('Weights', 'Nestle S.A.', 'GeoRev Portfolio Exposure').then(function(value) {
        nestleValue = value;
      });
    });

    it('Should right click and select "Exclusions>Exclude Selected Rows"', function() {
      PA3MainPage.rightClickAndSelectOption(itemRef, 'Exclusions|Exclude Selected Rows');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if "Algeria" grouping total value in "GeoRev Portfolio Exposure" is equal to' + 'its previous value minus the value that was noted for "Nest"', function() {
      PA3MainPage.getValueFromCalculatedReport('Weights', 'Algeria', 'GeoRev Portfolio Exposure').then(function(value) {
        if (parseFloat(value) !== parseFloat((algeriaTotal - nestleValue).toFixed(2))) {
          expect(false).customError('Error: "Algeria" grouping total value in "GeoRev Portfolio Exposure" is not equal to' + 'its previous value minus the value that was noted for "Nest", Expected: ' + (algeriaTotal - nestleValue).toFixed(2) + 'Found:' + parseFloat(value));
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test StepID: 467688', function() {

    it('Should expand "Africa & Middle East > Angola" grouping', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Africa & Middle East|Angola', 'Africa & Middle East');

      // Verifying if "Africa & Middle East > Angola" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Africa & Middle East|Angola');
    });

    it('Verifying if "Nestle S.A" security shown under this country', function() {
      PA3MainPage.getElementFromCalculatedTree('Weights', 'Africa & Middle East|Angola', 'Nestle S.A.').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('Error: "Nestle S.A" security show under this Angola');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
