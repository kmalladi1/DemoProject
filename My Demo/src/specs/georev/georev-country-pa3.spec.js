'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: georev-country-pa3', function() {

  describe('Test Step ID: 536871', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:/Pa3/Georev/GeoRev_Country" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('georev-country');
    });

    it('Waiting for reports to calculate', function() {
      browser.sleep(2000);

      // Waiting for loading icon to disappear
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);
    });

    it('Verifying if "Contribution" report is appeared', function() {
      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Contribution').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Error:Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        expect(!found).customError('Error: "Calculation Error" dialog is seen while "Attribution" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 536872', function() {

    it('Should expand the grouping tree Americas > Argentina > Consumer Durables', function() {
      PA3MainPage.expandTreeInCalculatedReport('Contribution', 'Americas|Argentina|Consumer Durables', 'Americas');

      //Checking if 'Americas >Argentina >Commercial Services' tree is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Contribution', 'Americas|Argentina|Consumer Durables');
    });

    it('Verifying if "General Motors Company" security is present under "Americas > Argentina > Consumer Durables"', function() {
      PA3MainPage.getElementFromCalculatedTree('Contribution', 'Americas|Argentina|Consumer Durables', 'General Motors Company').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('Error: "General Motors Company" is not present ' + 'under "Americas > Argentina > Consumer Durables"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "General Motors Company" security value is "Argentina" for the column "GeoRev Country"', function() {
      browser.driver.executeScript(function() {
        var columns = [];var value = [];var rowIndex;

        var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
        columns = slickObject.grid.getColumns();
        var rows = slickObject.grid.getDataLength();

        // Getting rowIndex of "General Motors Company"
        for (var i = 0; i < rows; i++) {
          var row = slickObject.grid.getDataItem(i)[1];
          if (row === 'General Motors Company') {
            rowIndex = i;
          }
        }

        // Getting reference of cell values
        for (var j = 0; j < columns.length; j++) {
          if (columns[j].name.replace(/<br>/g, ' ') === 'GeoRev Country') {
            value.push(slickObject.grid.getCellNode(rowIndex, j));
          }
        }

        return value;
      }).then(function(value) {
        value.forEach(function(val) {
          val.getText().then(function(text) {
            if (text.indexOf('Argentina') < -1) {
              expect(false).customError('Error: "General Motors Company"' + ' security value is not "Argentina" for the column "GeoRev Country"');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 536875', function() {

    it('Should click on Wrench Icon in Report', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Contribution').click().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Options" from the drop down', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Tile Options View mode is appeared', function() {
      TileOptions.isTileOptionsMode().then(function() {}, function() {

        expect(false).customError('Error: "Tile Options" view mode is not appeared');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should navigate to the "Groupings" tab', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Groupings" is selected
      TileOptions.getOptionTitle().getText().then(function(text) {
        if (text.indexOf('Groupings') < -1) {
          expect(false).customError('Error: "Groupings" pane is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "GeoRev Country - FactSet" in selected section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('GeoRev Country - FactSet').click().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "X" Icon on "GeoRev Country - FactSet" element to remove from list', function() {
      TileOptionsGroupings.getRemoveButtonOfElementInSelectedSection('GeoRev Country - FactSet').click().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "GeoRev Country - FactSet" is removed from Selected section
      TileOptionsGroupings.getElementFromSelectedContainer('GeoRev Country - FactSet').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"GeoRev Country - FactSet" is present in "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'Index out of bound') {
          expect(true).toBeTruthy();
        }
      });
    });

    it('Should click on "OK" button in options Dialog', function() {
      TileOptions.getHeaderButton('ok').click().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for reports to calculate', function() {
      browser.sleep(2000);

      // Waiting for loading icon to disappear
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    it('Verifying if "Contribution" report is appeared', function() {
      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Contribution').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Error:Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        expect(!found).customError('Error: "Calculation Error" dialog is seen while "Contribution" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click to expand grouping tree Americas>Consumer Durables', function() {
      var itemReference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Contribution', '2', 'Consumer Durables');

      browser.actions().doubleClick(itemReference).perform();
    });

    it('Verifying if "General Motors Company" security is present under "Americas > Consumer Durables"', function() {
      PA3MainPage.getElementFromCalculatedTree('Contribution', 'Americas|Consumer Durables', 'General Motors Company').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('Error: "General Motors Company" is not present ' + 'under "Americas > Consumer Durables"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "General Motors Company" security value is "@NA" for the column "GeoRev Country"', function() {
      browser.driver.executeScript(function() {
        var columns = [];var value = [];var rowIndex;
        var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
        columns = slickObject.grid.getColumns();
        var rows = slickObject.grid.getDataLength();

        // Getting rowIndex of "General Motors Company"
        for (var i = 0; i < rows; i++) {
          var row = slickObject.grid.getDataItem(i)[1];
          if (row === 'General Motors Company') {
            rowIndex = i;
          }
        }

        // Getting reference of cell values
        for (var j = 0; j < columns.length; j++) {
          if (columns[j].name.replace(/<br>/g, ' ') === 'GeoRev Country') {
            value.push(slickObject.grid.getCellNode(rowIndex, j));
          }
        }

        return value;
      }).then(function(value) {
        value.forEach(function(val) {
          val.getText().then(function(text) {
            if (text.indexOf('@NA') < -1) {
              expect(false).customError('Error: "General Motors Company"' + ' security value is not "@NA" for the column "GeoRev Country"');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });
});
