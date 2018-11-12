'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: cols-apply-groups', function() {
  //Variables
  var arrElements = [{name: 'Portfolio', value: 'CLIENT:/PA3/TEST.ACCT'},
    {name: 'Benchmark', value: 'RUSSELL:1000'},];

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  describe('Test Step ID: 554414', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:default_doc_auto" document', function() {
      PA3MainPage.switchToDocument('default-doc-auto');
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(found) {
        if (!found) {
          expect(false).customError('"Weights" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    arrElements.forEach(function(element) {
      it('Verify if "' + element.value + '" in the "' + element.name + '" widget', function() {
        //Verifying if Portfolio and Benchmark widget has expected values
        PA3MainPage.getWidgetBox(element.name).getAttribute('value').then(function(val) {
          if (val !== element.value) {
            expect(false).customError('"' + element.name + '" widget did not has "' + element.value + '" in it.' +
              ' Found: "' + val + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 554415', function() {

    // Clicking on wrench Icon from 'Weights' report toolbar
    it('Should click on wrench Icon from "Weights" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Clicking on 'Options' from Wrench Menu dropdown.
    it('Should click "Options" from dropdown menu', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Weights') {
          expect(false).customError('"Tile Options - Weights" view has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on Columns LHP item to select.
    it('Should click on Columns from LHP ', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Columns' item is opened.
      TileOptions.getOptionTitle().getText().then(function(title) {
        expect(title === 'Columns').customError('"Columns" item did not select from LHP');
        if (title !== 'Columns') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Port. Ending Weight" from the "Selected" section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Port. Ending Weight').select();

      // Verify if 'Port. Ending Weight' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Port. Ending Weight').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Port. Ending Weight" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "Statistics" section from "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Statistics').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Statistics" section is not expanded from "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrCheckBoxNames = ['Total Portfolio', 'All Groups', 'Economic Sector', 'Industry'];
    arrCheckBoxNames.forEach(function(checkBoxName) {
      it('Verify if "' + checkBoxName + '" checkbox is checked in "Apply To" section', function() {
        ThiefHelpers.getCheckBoxClassReference(checkBoxName).isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('"' + checkBoxName + '" checkbox did not checked in "Apply To" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 554416', function() {

    it('Deselect "All Groups" checkbox in the "Apply To" section', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathStatisticsCheckbox, 'All Groups');
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).uncheck();
    });

    // Clicking on the OK button to close Tile Options Mode
    it('Should click on the "OK" Button', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Verifying if mode is closed.
    it('Should verify "Tile Options" mode is closed', function() {
      expect(TileOptions.isTileOptionsMode()).toBeFalsy();
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(found) {
        if (!found) {
          expect(false).customError('"Weights" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Commercial Services" in "Weights" report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Commercial Services');

      // Verifying that "Commercial Services|Advertising/Marketing Services" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Commercial Services');

      //waiting for the elements to load in the browser.
      browser.sleep(3000);
    });

    var takeScreenShot = 0;
    it('Verifying that all the cells in "Port. Weight" column displays blank and "Total" row is displaying a value',
      function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Port. Weight', '').then(function(colRef) {
          colRef.forEach(function(cellRef, index) {
            // Verifying if Total row is displaying a value
            if (index === 0) {
              if (cellRef === '') {
                expect(false).customError('Cell value of "Total" row did not contain data.' +
                  'Found:"' + cellRef + '" ');
                takeScreenShot = 1;
              }
            } else {
              //Verifying if all cells displaying blank except Total row
              if (cellRef !== '') {
                expect(false).customError('Cell value of "Port. Weight" column contains ' +
                  'data at "' + index + '"th row.Found:"' + cellRef + '"');
                takeScreenShot = 1;
              }
            }
          });

          if (takeScreenShot === 1) {
            CommonFunctions.takeScreenShot();
          }
        });

      });
  });

  describe('Test Step ID: 554420', function() {

    it('Should click on "Economic Sector" hyperlink', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(text) {
        if (text === 'Economic Sector') {
          PA3MainPage.getGroupingsHyperLink('Weights').click();
        } else {
          expect(false).customError('"Economic Sector" hyperlink is not present');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Weights') {
          expect(false).customError('"Tile Options - Weights" view has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Double click on "Asset Class" from the "Available" container', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('FactSet', 'Asset Class')).perform();

      // Verifying if "Asset Class" is added to the "Selected" container
      TileOptionsGroupings.getElementFromSelectedContainer('Asset Class').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Asset Class" is not added to the "Selected" container');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on Columns LHP item to select.
    it('Should click on Columns LHP item to select', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Columns' item is opened.
      TileOptions.getOptionTitle().getText().then(function(title) {
        expect(title === 'Columns').customError('"Columns" item did not select from LHP. Found: "' + title + '"');
        if (title !== 'Columns') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Port. Ending Weight" from the "Selected" section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Port. Ending Weight').select();

      // Verify if 'Port. Ending Weight' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Port. Ending Weight').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Port. Ending Weight" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "Statistics" section from "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Statistics').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Statistics" section is not expanded from "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if "Total Portfolio" checkbox is checked', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathStatisticsCheckbox, 'Total Portfolio');
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Total Portfolio" checkbox is not checked.');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    var arrCheckBoxNames = ['All Groups', 'Economic Sector', 'Industry', 'Asset Class'];
    arrCheckBoxNames.forEach(function(checkBoxName) {
      it('Verifying if "' + checkBoxName + '" checkbox is unchecked', function() {
        var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathStatisticsCheckbox, checkBoxName);
        ThiefHelpers.getCheckBoxClassReference(undefined, xpath).isChecked().then(function(checked) {
          if (checked) {
            expect(false).customError('"' + checkBoxName + '" checkbox is checked.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 554417', function() {

    it('Should check "Asset Class" checkbox in "Apply To" section', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathStatisticsCheckbox, 'Asset Class');
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).check();
    });

    // Clicking on the OK button to close Tile Options Mode
    it('Should click on the "OK" Button', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Verifying if mode is closed.
    it('Should verify "Tile Options" mode is closed', function() {
      expect(TileOptions.isTileOptionsMode()).toBeFalsy();
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(found) {
        if (!found) {
          expect(false).customError('"Weights" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Commercial Services > Personnel Services" from the "Weights" report', function() {
      // commercial services is already expanded in test step 554416
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Personnel Services');

      // Verifying if "Commercial Services > Personnel Services" tree is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Personnel Services');
    });

    var takeScreenShot = 0;
    var equityRowIndex;
    it('Verify if "Port. Weight" column displays blank cells for all rows except for "Equity" row', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Port. Weight', '').then(function(references) {

        // collecting equity row index
        SlickGridFunctions.getRowIndex('Weights', 'Equity', '').then(function(rowIndex) {
          equityRowIndex = rowIndex;
          references.forEach(function(element, index) {

            // "Total" row ( index = 0 ) is displaying values
            if (index !== 0) {

              //Verifying if "Equity Row" is displaying values
              if (index === equityRowIndex) {
                SlickGridFunctions.getCellReference('Weights', 'Equity', '', 'Port. Weight', '').then(function(cellRef) {
                  if (cellRef === '') {
                    expect(false).customError('"Equity" row did not contain data. Found:"' + cellRef + '"');
                    takeScreenShot = 1;
                  }
                });
              } else {
                if (element !== '') {
                  expect(false).customError('"Port. Weight" cell is not blank at "' + index + '" row. ' +
                    'Found:"' + element + '"');
                  takeScreenShot = 1;
                }
              }
            }
          });

          if (takeScreenShot === 1) {
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Total" row is displaying values', function() {
      SlickGridFunctions.getRowData('Weights', 'Total', '').then(function(rowDataRef) {
        rowDataRef.forEach(function(rowCellRef, index) {
          if (rowCellRef === '') {
            expect(false).customError('"Total" row did not contain data at column:"' + index + '". ' +
              'Found:"' + rowCellRef + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 554418', function() {

    it('Should click on "Economic Sector" hyperlink', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(text) {
        if (text === 'Economic Sector') {
          PA3MainPage.getGroupingsHyperLink('Weights').click();
        } else {
          expect(false).customError('"Economic Sector" hyperlink is not present');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Weights') {
          expect(false).customError('"Tile Options - Weights" view has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on Columns LHP item to select.
    it('Should click on Columns LHP item to select', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Columns' item is opened.
      TileOptions.getOptionTitle().getText().then(function(title) {
        expect(title === 'Columns').customError('"Columns" item did not select from LHP');
        if (title !== 'Columns') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Bench. Ending Weight" from "Selected" section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Bench. Ending Weight').select();

      // Verify if 'Bench. Ending Weight' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Bench. Ending Weight').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Bench. Ending Weight" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "Statistics" section from "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Statistics').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Statistics" section is not expanded from "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrCheckBoxNames = ['Total Portfolio', 'All Groups', 'Economic Sector', 'Industry', 'Asset Class'];
    arrCheckBoxNames.forEach(function(checkBoxName) {
      it('Verifying if "' + checkBoxName + '" checkbox is checked', function() {
        var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathStatisticsCheckbox, checkBoxName);
        ThiefHelpers.getCheckBoxClassReference(undefined, xpath).isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('"' + checkBoxName + '" checkbox is not checked.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 554419', function() {

    it('Select "Port. Ending Weight" from "Selected" section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Port. Ending Weight').select();

      // Verify if 'Port. Ending Weight' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Port. Ending Weight').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Port. Ending Weight" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "Statistics" section from "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Statistics').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Statistics" section is not expanded from "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Deselect "Total Portfolio" checkbox in the "Apply To" section', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathStatisticsCheckbox, 'Total Portfolio');
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).uncheck();
    });

    it('Select "All Groups" checkbox in the "All Groups" section', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathStatisticsCheckbox, 'All Groups');
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).check();
    });

    // Clicking on the OK button to close Tile Options Mode
    it('Should click on the "OK" Button', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(found) {
        if (!found) {
          expect(false).customError('"Weights" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var takeScreenShot = 0;
    it('Verifying that all the cells in "Port. Weight" column displays data and "Total" row cell value displays ' +
      'blank', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Port. Weight', '').then(function(colRef) {
        colRef.forEach(function(cellRef, index) {
          // Verifying if Total row is displaying blank cell
          if (index === 0) {
            if (cellRef !== '') {
              expect(false).customError('Cell value of "Total" row contains data. ' +
                'Found:"' + cellRef + '" ');
              takeScreenShot = 1;
            }
          } else {
            // Verifying if all cells displaying data except Total row
            if (cellRef === '') {
              expect(false).customError('Cell value of "Port. Weight" column contains ' +
                'data at "' + index + '"th row.Found:"' + cellRef + '"');
              takeScreenShot = 1;
            }
          }
        });

        if (takeScreenShot === 1) {
          CommonFunctions.takeScreenShot();
        }
      });

    });
  });

  describe('Test Step ID: 554421', function() {

    it('Should click on "Economic Sector" hyperlink', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(text) {
        if (text === 'Economic Sector') {
          PA3MainPage.getGroupingsHyperLink('Weights').click();
        } else {
          expect(false).customError('"Economic Sector" hyperlink is not present');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Weights') {
          expect(false).customError('View has not changed to "Tile Options - Weights" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on Groupings LHP item to select.
    it('Should click on Groupings LHP item to select', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Groupings' item is opened.
      TileOptions.getOptionTitle().getText().then(function(title) {
        expect(title === 'Groupings').customError('"Groupings" item did not select from LHP');
        if (title !== 'Groupings') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Clear all" icon on the tile options', function() {
      ThiefHelpers.getTransferBoxReference().target.clear();
    });

    it('Verifying groupings are removed from selected section', function() {
      // Verifying groupings are removed
      var allElements = TileOptionsColumns.getAllElements('selected');
      allElements.count().then(function(count) {
        if (count !== 0) {
          expect(false).customError('Groupings are not removed from selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on Columns LHP item to select.
    it('Should click on Columns LHP item to select', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Columns' item is opened.
      TileOptions.getOptionTitle().getText().then(function(title) {
        expect(title === 'Columns').customError('"Columns" item did not select from LHP');
        if (title !== 'Columns') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Port. Ending Weight" from the "Selected" section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Port. Ending Weight').select();

      // Verify if 'Port. Ending Weight' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Port. Ending Weight').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Port. Ending Weight" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "Statistics" section from "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Statistics').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Statistics" section is not expanded from "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if "Total Portfolio" checkbox is unchecked', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathStatisticsCheckbox, 'Total Portfolio');
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).isChecked().then(function(checked) {
        if (checked) {
          expect(false).customError('"Total Portfolio" checkbox is checked.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 554422', function() {

    // Clicking on the OK button to close Tile Options Mode
    it('Should click on the "OK" Button', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Verifying if mode is closed.
    it('Should verify "Tile Options" mode is closed', function() {
      expect(TileOptions.isTileOptionsMode()).toBeFalsy();
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(found) {
        if (!found) {
          expect(false).customError('"Weights" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Total" is present at top of the securities column', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '', '').then(function(rowNames) {
        if (rowNames[0] !== 'Total') {
          expect(false).customError('"Total" row is not present in the report at the top');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // "3M Company" is verified (as an example) to ensure that all securities are under Total as per Dheeraj suggestion.
    it('Verifying if "3M Company" is present under Total', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '', '').then(function(rowNames) {
        if (rowNames.indexOf('3M Company') < 1) {
          expect(false).customError('"3M Company" row is not present under Total');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var takeScreenShot = 0;
    it('Verifying that all the cells in "Port. Weight" column displays data and "Total" row cell value displays ' +
      'blank', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Port. Weight', '').then(function(colRef) {
        colRef.forEach(function(cellRef, index) {
          // Verifying if Total row is displaying blank cell
          if (index === 0) {
            if (cellRef !== '') {
              expect(false).customError('Cell value of "Total" row contains data. ' +
                'Found:"' + cellRef + '" ');
              takeScreenShot = 1;
            }
          } else {
            // Verifying if all cells displaying data except Total row
            if (cellRef === '') {
              expect(false).customError('Cell value of "Port. Weight" column displays blank at' +
                ' "' + index + '" row');
              takeScreenShot = 1;
            }
          }
        });

        if (takeScreenShot === 1) {
          CommonFunctions.takeScreenShot();
        }
      });

    });

  });

});
