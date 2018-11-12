'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: save-change-cache-a', function() {
  // Variable(s)
  var arrSuperHeader = [];
  var arrHeader = [];
  var arrRowNames = [];
  var arrCellValues;
  var arrSuperHeader2 = [];
  var arrHeader2 = [];
  var arrRowNames2 = [];
  var arrCellValues2;

  describe('Test Step ID: 477291', function() {

    it('Should launch the PA3 application with "DEFAULT" document', function() {
      PA3MainPage.goToURL('#/doc/PA_DOCUMENTS:DEFAULT/report/report0');

      // Check if application is launched
      browser.getTitle().then(function(title) {
        expect(title === PA3Json.defaultDocument)
          .customError('Title of browser did not match. ' +
            'Expected: "' + PA3Json.defaultDocument + '", Found: "' + title + '"');
        if (title !== PA3Json.defaultDocument) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should clear the cache before opening "CACHE_DOC" document', function() {
      browser.executeAsyncScript(function(callback) {
        callback(angular.element($('#pa3App')).injector().get('paReportCalcServerCache').deleteServerCache());
      }).then(function(value) {
        expect(value.$$state.status).toEqual(0);
      });
    });

    it('Should click on the "Wrench" button on the application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Menu list appeared.
      Utilities.isDialogOpen().then(function(notAppeared) {
        if (notAppeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Automatic Calculation" option', function() {
      PA3MainPage.setAutomaticCalculation(true).then(function(option) {
        if (!option) {
          expect(false).customError('"Automatic Calculation" was not checked.');
        }
      });
    });

    it('Should open "CACHE_DOC" document', function() {
      PA3MainPage.goToURL('#/doc/Client:;Pa3;Automation;CACHE_DOC/report/report0');

      // Check if application is launched
      browser.getTitle().then(function(title) {
        expect(title === 'Portfolio Analysis 3.0 - Cache Report 1 [Client:/Pa3/Automation/CACHE_DOC]')
          .customError('Title of browser did not match. ' +
            'Expected: "Portfolio Analysis 3.0 - Cache Report 1 [Client:/Pa3/Automation/CACHE_DOC]", Found: "' + title + '"');
        if (title !== 'Portfolio Analysis 3.0 - Cache Report 1 [Client:/Pa3/Automation/CACHE_DOC]') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Attribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any issues', function() {
      // Verifying "Attribution" Report is calculated
      PA3MainPage.isReportCalculated('Attribution').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Attribution" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 472145', function() {

    it('Should click on the "Wrench" icon in the "Attribution" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Wrench menu" list appeared', function() {
      Utilities.isDialogOpen().then(function(notAppeared) {
        if (notAppeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Options" from the wrench menu list', function() {
      Utilities.getOptionFromDropDown('Options').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Attribution" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Attribution') {
          expect(false).customError('"Tile Options - Attribution" view has not appeared. ' +
            'Expected: "Tile Options - Attribution" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Groupings" from LHP', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Groupings"
      TileOptions.getOptionTitle().getText().then(function(view) {
        if (view !== 'Groupings') {
          expect(false).customError('The view has not changed to "Groupings".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover over "Economic Sector - FactSet" from "Selected" section and click on "x" button to remove it', function() {
      // Verifying if "Economic Sector - FactSet" column is present in the "Selected" section
      TileOptionsGroupings.getElementFromSelectedContainer('Economic Sector - FactSet').isPresent().then(function(option) {
        if (!option) {
          expect(option).customError('"Economic Sector - FactSet" column is not present in "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      TileOptionsGroupings.getRemoveButtonOfElementInSelectedSection('Economic Sector - FactSet').click()
        .then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Verifying if "Economic Sector - FactSet" is removed from "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Economic Sector - FactSet').isPresent().then(function(option) {
        if (option) {
          expect(option).customError('"Economic Sector - FactSet" column was not deleted list.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'Index out of bound') {
          expect(true).toBeTruthy();
        }
      });
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Attribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any issues', function() {
      // Verifying "Attribution" Report is calculated
      PA3MainPage.isReportCalculated('Attribution').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Attribution" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Collecting all the values on the web page', function() {
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
        PA3MainPage.getAllElementsFromCalculatedReport('Attribution', 'slick-pane slick-pane-bottom slick-pane-left')
          .each(function(ref) {
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

        // Storing all the cell values of each column
        arrHeader.forEach(function(columnName, index) {
          PA3MainPage.getAllCellsOfGivenColumn('Attribution', columnName, 'slick-pane slick-pane-bottom slick-pane-right')
            .then(function(cellRefs) {
              cellRefs.forEach(function(cell, cellIndex) {
                cell.getText().then(function(value) {
                  arrCellValues[cellIndex][index] = value;
                });
              });
            });
        });
      });
    });

  });

  describe('Test Step ID: 472146', function() {

    it('Should click on "Save" icon from application toolbar', function() {
      PA3MainPage.getSaveIcon().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Document has changed" dialog box appeared', function() {
      PA3MainPage.getDialog('Document has changed').isPresent().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Document has changed" dialog box has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Save Changes" button to save the current changes', function() {
      PA3MainPage.getButton('Save Changes').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that 'Document has changed' dialog box disappeared
      PA3MainPage.getDialog('Document has changed').isPresent().then(function(disappeared) {
        if (disappeared) {
          expect(false).customError('"Document has changed" dialog box is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 472148', function() {

    it('Wait for 180 seconds and re-open the "CACHE_DOC" document', function() {
      // Waiting for 180 seconds (3 minutes)
      browser.sleep(180000);

      // Refresh the web page
      browser.refresh(120);
    });

    it('Waiting for "Attribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any issues', function() {
      // Verifying "Attribution" Report is calculated
      PA3MainPage.isReportCalculated('Attribution').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Attribution" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
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
          expect(false).customError('The message saying ' +
            '"Cached data from..." is not displayed next to Footnotes.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Collecting all the values on the web page after re-opening "CACHE_DOC" document', function() {
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
        PA3MainPage.getAllElementsFromCalculatedReport('Attribution', 'slick-pane slick-pane-bottom slick-pane-left')
          .each(function(ref) {
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

        // Storing all the cell values of each column
        arrHeader2.forEach(function(columnName, index) {
          PA3MainPage.getAllCellsOfGivenColumn('Attribution', columnName, 'slick-pane slick-pane-bottom slick-pane-right')
            .then(function(cellRefs) {
              cellRefs.forEach(function(cell, cellIndex) {
                cell.getText().then(function(value) {
                  arrCellValues2[cellIndex][index] = value;
                });
              });
            });
        });
      });
    });

    it('Verifying that data in calculated report match with the data collected in the second step (472145)', function() {
      var needScreenShot = 0;
      for (var i = 0; i < arrHeader.length; i++) {
        for (var j = 0; j < arrRowNames.length; j++) {
          if (arrCellValues2[j][i] !== arrCellValues[j][i]) {
            expect(false).customError('Value for "' + arrRowNames[j] + '" row, "' + arrHeader[i] + '" column did not match. ' +
              'Expected: "' + arrCellValues[j][i] + '", Found: "' + arrCellValues2[j][i] + '"');
            ++needScreenShot;
            if (needScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        }
      }
    });

  });

  describe('Test Step ID: 477292', function() {

    it('Should click on the "Wrench" icon in the "Attribution" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Verifying if Wrench menu list appeared', function() {
      Utilities.isDialogOpen().then(function(notAppeared) {
        if (notAppeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Options" from the wrench menu list', function() {
      Utilities.getOptionFromDropDown('Options').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Attribution" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Attribution') {
          expect(false).customError('"Tile Options - Attribution" view has not appeared. ' +
            'Expected: "Tile Options - Attribution" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Groupings" from LHP', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Groupings"
      TileOptions.getOptionTitle().getText().then(function(view) {
        if (view !== 'Groupings') {
          expect(false).customError('The view has not changed to "Groupings".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "Economic Sector" into the "Search" field of "Available" section', function() {
      TileOptionsGroupings.getAvailableSectionSearchBox().sendKeys('Economic Sector').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that 'Economic Sector' is entered into the Search field
      TileOptionsGroupings.getAvailableSectionSearchBox().getAttribute('value').then(function(name) {
        if (name !== 'Economic Sector') {
          expect(false).customError('Expected: "Economic Sector" to be entered into the Search field but' +
            ' Found: "' + name + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Economic Sector" from "FactSet > Sector & Industry > FactSet" in "Available" section', function() {
      TileOptionsGroupings.getElementFromAvailableSection('FactSet|Sector & Industry|FactSet', 'Economic Sector').click()
        .then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });

      // Verifying that 'Economic Sector' is selected
      expect(TileOptionsGroupings.getElementFromAvailableSection('FactSet|Sector & Industry|FactSet',
        'Economic Sector').getAttribute('class')).toContain('selected');
    });

    it('Should click on "Right" arrow button to add "Economic Sector" to the "Selected" section', function() {
      TileOptionsGroupings.getArrowButton('Right').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Economic Sector - FactSet" is added to the "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Economic Sector - FactSet').isPresent().then(function(added) {
        if (!added) {
          expect(false).customError('"Economic Sector - FactSet" is not added to the "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Economic Sector - FactSet" from "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Economic Sector - FactSet').click()
        .then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });

      // Verifying that "Economic Sector - FactSet" is selected
      expect(TileOptionsGroupings.getElementFromSelectedContainer('Economic Sector - FactSet')
        .getAttribute('class')).toContain('selected');
    });

    it('Should move "Economic Sector - FactSet" on to the top of "Selected" section', function() {
      var countOfElements;
      TileOptionsGroupings.getAllElements('Selected').count().then(function(noElem) {
        countOfElements = noElem;
      }).then(function() {
        for (var i = 1; i < countOfElements; i++) {
          TileOptionsGroupings.getArrowButton('Up').click();
        }
      });

      // Verifying that "Economic Sector - FactSet" is on the top of "Selected" section
      expect(TileOptionsGroupings.getAllElements('Selected')
        .get(0).getText()).toContain('Economic Sector - FactSet');
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Attribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any issues', function() {
      // Verifying "Attribution" Report is calculated
      PA3MainPage.isReportCalculated('Attribution').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Attribution" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that report is grouped by "Economic Sector"', function() {
      PA3MainPage.getGroupingsHyperLink('Attribution').getText().then(function(name) {
        if (name !== 'Economic Sector') {
          expect(false).customError('The report is Expected to grouped by: "Economic Sector" but Found: "' + name + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save" icon from application toolbar', function() {
      PA3MainPage.getSaveIcon().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Document has changed" dialog box appeared', function() {
      PA3MainPage.getDialog('Document has changed').isPresent().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Document has changed" dialog box has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Save Changes" button to save the current changes', function() {
      PA3MainPage.getButton('Save Changes').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that 'Document has changed' dialog box disappeared
      PA3MainPage.getDialog('Document has changed').isPresent().then(function(disappeared) {
        if (disappeared) {
          expect(false).customError('"Document has changed" dialog box is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Document should be saved with the changes without any issues', function() {
      // Refresh the web page
      browser.refresh(120);

      // Waiting for "Attribution" report to calculate
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any issues', function() {
      // Verifying "Attribution" Report is calculated
      PA3MainPage.isReportCalculated('Attribution').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Attribution" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that report is grouped by "Economic Sector"', function() {
      PA3MainPage.getGroupingsHyperLink('Attribution').getText().then(function(name) {
        if (name !== 'Economic Sector') {
          expect(false).customError('The report is Expected to grouped by: "Economic Sector" but Found: "' + name + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
