'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: georev-issuer-parent', function() {

  // Variables
  var temp = 0;

  describe('Test StepID: 467689', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:/pa3/georev/issuer" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('issuer');
    });

    it('Waiting for reports to calculate', function() {
      browser.sleep(2000);

      // Waiting for loading icon to disappear
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);
    });

    it('Verifying if "Weights" report is appeared', function() {
      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Weights').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Error:Calculated report is not visible on the screen');
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
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('Error: "Calculation Error" dialog is seen while "Attribution" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test StepID: 467696', function() {

    // Variables
    var arrTickers = [];
    var arrElements = ['MMM', 'KO', 'INTC', 'IBM', 'MSFT', 'NKE'];

    it('Should expand the grouping tree Americas >Argentina ', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Americas|Argentina', 'Americas');

      //Checking if 'Americas >Argentina' tree is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Americas|Argentina');
    });

    it('Collecting all ticker values', function() {
      browser.driver.executeScript(function() {
        var value = [];
        var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
        var rows = slickObject.grid.getDataLength();

        for (var i = 0; i < rows; i++) {
          value.push(slickObject.grid.getDataItem(i).Ticker);
        }

        return value;
      }).then(function(value) {
        value.forEach(function(val) {
          arrTickers.push(val);
        });
      });
    });

    arrElements.forEach(function(value, index) {
      it('Verifying if ticker column has "' + arrElements[index] + '"', function() {
        expect(value.indexOf(arrTickers) === -1).customError('Error: "' + arrElements[index] + '" is not present in ' + 'the Ticker column');
      });
    });

    it('Verifying if all 3M company have same values', function() {
      browser.driver.executeScript(function() {
        var value = [];
        var parntID;
        var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
        var rows = slickObject.grid.getDataLength();
        var securityName;
        for (var i = 0; i < rows; i++) {
          securityName = slickObject.grid.getDataItem(i)[1];
          var secParentID = slickObject.grid.getDataItem(i).parentId;
          if (securityName === 'Argentina') {
            parntID = slickObject.grid.getDataItem(i).id;
          }

          if (securityName.toLowerCase().indexOf('3m') > -1 && secParentID === parntID) {
            value.push(securityName);
          }
        }

        return value;
      }).then(function(value) {
        value.forEach(function(val) {
          PA3MainPage.getValueFromCalculatedReport('Weights', val, 'GeoRev Company Exposure').then(function(val1) {
            if (temp === 0) {
              temp = val1;
            }

            expect(temp).toEqual(val1);
          });
        });
      });
    });
  });

  describe('Test StepID: 467691', function() {

    it('Should click on "GeoRev Region" hyperlink in the upper left corner', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').click();
    });

    it('Verifying if Tile Options View mode is appeared', function() {
      TileOptions.isTileOptionsMode().then(function(bool) {
        if (!bool) {
          expect(false).customError('Error: "Tile Options" view mode is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Groupings" tab is selected', function() {
      // Verifying if "Groupings" is selected
      TileOptions.getOptionTitle().getText().then(function(text) {
        expect(text.indexOf('Groupings') >= 0).customError('Error: "Groupings" pane is not selected');
      });
    });

    it('Should click on "GeoRev Country - FactSet" in selected section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('GeoRev Country - FactSet').click();

      // Verifying if "GeoRev Country - FactSet" is selected
      TileOptionsGroupings.getElementFromSelectedContainer('GeoRev Country - FactSet').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') === -1) {
          expect(false).customError('Error: Failed to select "GeoRev Country - FactSet" in selected section');
          CommonFunctions.captureScreenShot();
        }
      });
    });

    it('Should expand the "Additional Options"', function() {
      TileOptionsGroupings.getExpandableSection('Additional Options').click();

      // Verifying if "Additional Options" is expanded
      TileOptionsGroupings.getExpandableSection('Additional Options').getAttribute('class').then(function(text) {
        if (text.indexOf('collapsed') >= 0) {
          expect(false).customError('Error: Failed to expand "Additional Options" ');
        }
      });
    });

    it('Should select "Use Ultimate Parent Data" and "Use Immediate Issuer Data" checkboxes', function() {
      TileOptionsGroupings.getSectionCheckBox('Additional Options', 'Use Ultimate Parent Data').getAttribute('class').then(function(text) {
        if (text.indexOf('checked') >= 0) {
          CommonFunctions.captureScreenShot();
        } else {
          TileOptionsGroupings.getSectionCheckBox('Additional Options', 'Use Ultimate Parent Data').click();

          expect(TileOptionsGroupings.getSectionCheckBox('Additional Options', 'Use Ultimate Parent Data').getAttribute('class')).toContain('checked');
        }
      });

      expect(TileOptionsGroupings.getSectionCheckBox('Additional Options', 'Use Immediate Issuer Data', true).getAttribute('class')).toContain('checked');
    });

    it('Should click on "OK" button from "Tile Options - Composition" header bar', function() {
      TileOptions.getHeaderButton('OK').click();
    });

    it('Verifying if Tile Options View mode is disappeared', function() {
      TileOptions.isTileOptionsMode().then(function(bool) {
        if (bool) {
          expect(false).customError('Error: "Tile Options" view mode is not disappeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for reports to calculate', function() {
      browser.sleep(2000);

      // Waiting for loading icon to disappear
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);
    });

    it('Verifying if "Weights" report is appeared', function() {
      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Weights').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Error:Calculated report is not visible on the screen');
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
    });
  });

  describe('Test StepID: 467694', function() {

    it('Verifying if all 3M company have same values has noted in Step ID: 467696', function() {
      browser.driver.executeScript(function() {
        var value = [];
        var parntID;
        var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
        var rows = slickObject.grid.getDataLength();
        var securityName;
        for (var i = 0; i < rows; i++) {
          securityName = slickObject.grid.getDataItem(i)[1];
          var secParentID = slickObject.grid.getDataItem(i).parentId;
          if (securityName === 'Argentina') {
            parntID = slickObject.grid.getDataItem(i).id;
          }

          if (securityName.toLowerCase().indexOf('3m') > -1 && secParentID === parntID) {
            value.push(securityName);
          }
        }

        return value;
      }).then(function(value) {
        value.forEach(function(val) {
          PA3MainPage.getValueFromCalculatedReport('Weights', val, 'GeoRev Company Exposure').then(function(val1) {
            expect(val1).toEqual(temp);
          });
        });
      });
    });
  });
});
