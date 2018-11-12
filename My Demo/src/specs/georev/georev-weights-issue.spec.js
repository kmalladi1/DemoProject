'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: georev-weights-issue', function() {

  var arrValuesBefore = [];

  var arrColumns = ['Port. Ending Weight', 'Port. Ending Quantity Held', 'Port. Ending Market Value', 'GeoRev Portfolio Exposure'];

  describe('Test Step ID: 470166', function() {

    var arrElements = ['AAPL', 'BAC', 'CASH_USD', 'GM'];

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:;Pa3;Georev;Weight_Issue" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('weight-issue');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Verifying if report is grouped by "Security Name"', function() {
      PA3MainPage.getGroupingsHyperLink('Contribution').getText().then(function(text) {
        if (text.indexOf('Security Name') < 0) {
          expect(false).customError('Error: "Security Name" is not grouped in the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    arrElements.forEach(function(ticker) {
      it('Verifying if "' + ticker + '" is present in report', function() {
        browser.driver.executeScript(function() {
          var value = [];
          var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
          var rows = slickObject.grid.getDataLength();

          // Getting all rows reference
          for (var i = 1; i < rows; i++) {
            value.push(slickObject.grid.getDataItem(i)[0]);
          }

          return value;
        }, ticker).then(function(value) {
          value.forEach(function(valueRef, index) {
            expect(valueRef.indexOf(arrElements[index]) >= 0).customError('Error: "' + arrElements[index] + '"' + ' is not present in report');
          });
        });
      });
    });

    arrColumns.forEach(function(value) {
      it('Collecting cell value of "CASH_USD" row and "' + value + '"', function() {
        PA3MainPage.getValueFromCalculatedReport('Contribution', 'CASH_USD', value).then(function(value) {
          CommonFunctions.captureScreenShot('ReferenceImageForComparing-470166');
          arrValuesBefore.push(value);
        });
      });
    });
  });

  describe('Test Step ID: 470167', function() {

    it('Should click on "Security Name" hyperlink in the upper left corner', function() {
      PA3MainPage.getGroupingsHyperLink('Contribution').click();
    });

    it('Verifying if "Tile Options" View mode is appeared', function() {
      TileOptions.isTileOptionsMode().then(function() {}, function() {

        expect(false).customError('Error: "Tile Options" view mode is not appeared');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify that view is opened with "Groupings" pane highlighted', function() {
      // Verifying that view displayed is "Groupings"
      TileOptions.getOptionTitle().getText().then(function(text) {
        expect(text.indexOf('Groupings') >= 0).customError('Error: "Groupings" pane is not selected');
      });
    });

    it('Should expand FactSet>Other in available section and select "Security Name"', function() {
      TileOptionsGroupings.expandElementTree('FactSet|Other', 'FactSet');

      // Verifying if tree is expanded
      TileOptionsGroupings.checkIfExpanded('FactSet|Other');

      // Selecting "Security Name" option in available section
      TileOptionsGroupings.getElementFromAvailableSection('FactSet|Other', 'Security Name').click();
    });

    it('Should click on right arrow button', function() {
      TileOptionsGroupings.getArrowButton('right').click();
    });

    it('Verifying if "Security Name" is present in Selected section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Security Name').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('Error: "Security Name" is not present in Selected Section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 470168', function() {

    it('Should expand "FactSet>Country & Region>FactSet" in available', function() {
      TileOptionsGroupings.expandElementTree('FactSet|Country & Region|FactSet', 'FactSet');

      // Verifying if tree is expanded
      TileOptionsGroupings.checkIfExpanded('FactSet|Country & Region|FactSet');
    });

    it('Should double click on "GeoRev Region"', function() {
      // Getting the Reference of required element
      var itemReference = TileOptionsGroupings.getElementFromAvailableSection('FactSet|Country & Region|FactSet', 'GeoRev Region');

      // Double clicking on the element
      browser.actions().mouseMove(itemReference).doubleClick().perform();
    });

    it('Should double click on "GeoRev Country"', function() {
      // Getting the Reference of required element
      var itemReference = TileOptionsGroupings.getElementFromAvailableSection('FactSet|Country & Region|FactSet', 'GeoRev Country');

      // Double clicking on the element
      browser.actions().mouseMove(itemReference).doubleClick().perform();
    });

    it('Verifying if "Security Name" is present in Selected section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Security Name').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('Error: "Security Name" is not present in Selected Section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "GeoRev Region - FactSet" is present in Selected section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('GeoRev Region - FactSet').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('Error: "GeoRev Region - FactSet" is not present in Selected Section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "GeoRev Country - FactSet" is present in Selected section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('GeoRev Country - FactSet').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('Error: "GeoRev Country - FactSet" is not present in Selected Section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 470169', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Should expand [Cash]>[Cash]>[Cash]', function() {
      PA3MainPage.expandTreeInCalculatedReport('Contribution', '[Cash]|[Cash]|[Cash]');

      // Verifying if tree is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Contribution', '[Cash]|[Cash]|[Cash]');
    });

    arrColumns.forEach(function(value, index) {
      it('Verifying the cell value of "CASH_USD" row and "' + value + '" column is matches with values ' + 'noted in stepID: 470166', function() {
        PA3MainPage.getValueFromCalculatedReport('Contribution', 'CASH_USD', value).then(function(val) {
          if (value === 'GeoRev Portfolio Exposure' && val === null) {
            expect(false).customError('Error:"' + value + '" column does not contain any value');
            CommonFunctions.takeScreenShot();
          } else if (value !== 'GeoRev Portfolio Exposure' && val !== arrValuesBefore[index]) {
            expect(false).customError('Error: Value of "' + value + '" column does ' + 'not match with "' + arrValuesBefore[index] + '" previous value for "CASH_USD" row, Found:' + val);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });
});
