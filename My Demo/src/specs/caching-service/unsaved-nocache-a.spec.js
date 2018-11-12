'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: unsaved-nocache-a', function() {
  // Variable(s)
  var arrSuperHeader = [];
  var arrHeader = [];
  var arrRowNames = [];
  var arrCellValues;
  var arrSuperHeader2 = [];
  var arrHeader2 = [];
  var arrRowNames2 = [];
  var arrCellValues2;

  describe('Test Step ID: 537698', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should clear the cache before opening "CACHE_DOC" document', function() {
      browser.executeAsyncScript(function(callback) {
        callback(angular.element($('#pa3App')).injector().get('paReportCalcCache').deleteServerCache());
      }).then(function(value) {
        expect(value.$$state.status).toEqual(0);
      });
    });

    it('Should open "Client:/Pa3/Automation/CACHE_DOC" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('cache-doc');
    });

    it('Should select "Automatic Calculation" option', function() {
      // Un-check "Automatic Calculation" to force re-check it
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      PA3MainPage.setAutomaticCalculation(false);

      // Click on Wrench button to select "Automatic Calculation"
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      PA3MainPage.setAutomaticCalculation(true).then(function(option) {
        if (!option) {
          expect(false).customError('"Automatic Calculation" is not selected.');
        }
      });
    });

    it('Waiting for "Attribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any issues', function() {
      // Check if report calculation indication exist in DOM
      PA3MainPage.isReportCalculated('Attribution', true).then(function(reportExistInDom) {
        if (!reportExistInDom) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Attribution').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is seen while "Attribution" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Collecting the data from the calculated report to compare later', function() {
      var needScreenShot = 0;

      // Get all Super-Header column names
      PA3MainPage.getAllMultiHeaderColumns('Attribution').each(function(ref) {
        ref.getText().then(function(name) {
          arrSuperHeader.push(name);
        });
      }).then(function() {
        // Get the column names
        PA3MainPage.getAllColumnOfCalculatedReport('Attribution').each(function(ref) {
          ref.getText().then(function(name) {
            arrHeader.push(name.replace(/\n/g, ' '));
          });
        });
      }).then(function() {
        // Get all Row Names
        PA3MainPage.getAllElementsFromCalculatedReport('Attribution', 'slick-pane slick-pane-bottom slick-pane-left').each(function(ref) {
          ref.getText().then(function(name) {
            arrRowNames.push(name);
          });
        });
      }).then(function() {
        // Creating array of arrays
        arrCellValues = new Array(arrRowNames.length);
        for (var j = 0; j < arrRowNames.length; j++) {
          arrCellValues[j] = new Array(arrHeader.length);
        }

        // Creating array of arrays to store all the cell values of each column
        arrHeader.forEach(function(columnName, index) {
          PA3MainPage.getAllCellsOfGivenColumn('Attribution', columnName, 'slick-pane slick-pane-bottom slick-pane-right').then(function(cellRefs) {
            cellRefs.forEach(function(cell, cellIndex) {
              cell.getText().then(function(value) {
                arrCellValues[cellIndex][index] = value;
                ++needScreenShot;
                if (needScreenShot === 1) {
                  CommonFunctions.captureScreenShot();
                }
              });
            });
          });
        });
      });
    });
  });

  describe('Test Step ID: 537680', function() {

    it('Should click on the "Wrench" icon in the "Attribution" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution', true).isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('Wrench menu is not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Options" from the wrench menu list', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Attribution" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Attribution') {
          expect(false).customError('"Tile Options - Attribution" view has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Groupings" from LHP to select', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Groupings" is selected.
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Groupings') {
          expect(false).customError('"Groupings" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover over "Industry - FactSet" from "Selected" section and click on "x" button to remove it', function() {
      TileOptionsGroupings.getRemoveButtonOfElementInSelectedSection('Industry - FactSet').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Industry - FactSet" item is removed from "Selected" section
      TileOptionsGroupings.getElementFromSelectedContainer('Industry - FactSet').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Industry - FactSet" item is not removed from "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'Index out of bound') {
          expect(true).toBeTruthy();
        }
      });
    });

    it('Should click on "OK" button in "Tile Options - Attribution" mode header', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Tile Options - Attribution" dialog box is closed
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options - Attribution" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Attribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any issues', function() {
      // Check if report calculation indication exist in DOM
      PA3MainPage.isReportCalculated('Attribution', true).then(function(reportExistInDom) {
        if (!reportExistInDom) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Attribution').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is seen while "Attribution" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 739424', function() {

    it('Should refresh the document', function() {
      // Refresh the web page
      browser.refresh(120);
    });

    it('Waiting for "Attribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any issues', function() {
      // Check if report calculation indication exist in DOM
      PA3MainPage.isReportCalculated('Attribution', true).then(function(reportExistInDom) {
        if (!reportExistInDom) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Attribution').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is seen while "Attribution" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if text saying "Cached data from.." is not appeared next to "Footnotes"', function() {
      PA3MainPage.getCachedData().isPresent().then(function(option) {
        if (option) {
          expect(false).customError('The message saying "Cached data from..." is displayed next to Footnotes.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 537681', function() {

    it('Wait for 180 seconds and re-open the "CACHE_DOC" document', function() {
      // Waiting for 180 seconds (3 minutes)
      browser.sleep(180000);

      PA3MainPage.launchHtmlDialogAndOpenDocument('cache-doc');
    });

    it('Waiting for "Attribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any issues', function() {
      // Check if report calculation indication exist in DOM
      PA3MainPage.isReportCalculated('Attribution', true).then(function(reportExistInDom) {
        if (!reportExistInDom) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Attribution').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is seen while "Attribution" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if text saying "Cached data from" appeared next to "Footnotes"', function() {
      PA3MainPage.getCachedData().isPresent().then(function(option) {
        if (option) {
          PA3MainPage.getCachedData().getText().then(function(text) {
            if (text.indexOf('Cached data from') < 0) {
              expect(false).customError('The message saying ' + '"Cached data from..." is not displayed next to Footnotes.');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('The message saying ' + '"Cached data from..." is not displayed next to Footnotes.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Collecting all the values on the web page after re-opening "CACHE_DOC" document to compare', function() {

      // Get all Super-Header column names
      PA3MainPage.getAllMultiHeaderColumns('Attribution').each(function(ref) {
        ref.getText().then(function(name) {
          arrSuperHeader2.push(name);
        });
      }).then(function() {
        // Get the column names
        PA3MainPage.getAllColumnOfCalculatedReport('Attribution').each(function(ref) {
          ref.getText().then(function(name) {
            arrHeader2.push(name.replace(/\n/g, ' '));
          });
        });
      }).then(function() {
        // Get all Row Names
        PA3MainPage.getAllElementsFromCalculatedReport('Attribution', 'slick-pane slick-pane-bottom slick-pane-left').each(function(ref) {
          ref.getText().then(function(name) {
            arrRowNames2.push(name);
          });
        });
      }).then(function() {
        // Creating array of arrays
        arrCellValues2 = new Array(arrRowNames2.length);
        for (var j = 0; j < arrRowNames2.length; j++) {
          arrCellValues2[j] = new Array(arrHeader2.length);
        }

        // Creating array of arrays to store all the cell values of each column
        arrHeader2.forEach(function(columnName, index) {
          PA3MainPage.getAllCellsOfGivenColumn('Attribution', columnName, 'slick-pane slick-pane-bottom slick-pane-right').then(function(cellRefs) {
            cellRefs.forEach(function(cell, cellIndex) {
              cell.getText().then(function(value) {
                arrCellValues2[cellIndex][index] = value;
              });
            });
          });
        });
      });
    });

    it('Comparing the data collected before caching and after caching', function() {
      var needScreenShot = 0;
      for (var i = 0; i < arrHeader.length; i++) {
        for (var j = 0; j < arrRowNames.length; j++) {
          if (arrCellValues2[j][i] !== arrCellValues[j][i]) {
            expect(false).customError('Value for "' + arrRowNames[j] + '" row, "' + arrHeader[i] + '" column did not match. ' + 'Expected: "' + arrCellValues[j][i] + '", Found: "' + arrCellValues2[j][i] + '"');
            ++needScreenShot;
            if (needScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        }
      }
    });
  });
});
