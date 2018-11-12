'use strict';

// Requiring PA3 page object files

require(__dirname + '/../../../index.js');

// Dynamic key value pair
var columnIndexs = {};

var getSecuritiesValueCountHasOne = function(columnName, TotalValue, expectedCount) {
  var count = 1;
  var unassignedSecuritiesValues;
  it('Verifying the "Total" value for [Unassigned] group is displayed as "' + TotalValue + '" and storing the securities with value "1"', function() {
    var group1Found;
    var parentID;

    SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
      dataView.forEach(function(rowRef, index) {
        if (rowRef[0] === '[Unassigned]' && rowRef.metadata.type === 'group') {
          SlickGridFunctions.scrollRowToTop('Weights', index);
          if (rowRef[columnIndexs[columnName]] === TotalValue) {
            group1Found = true;
            parentID = rowRef.id;

            if (rowRef.expanded) {
              dataView.forEach(function(element) {
                if (parentID === element.parentId) {
                  if (element[columnIndexs[columnName]] === '1.0') {
                    unassignedSecuritiesValues = count++;
                  }
                }
              });
            } else {
              expect(false).customError('"[Unassigned]" grouping is present in the report but it is not expanded by default');
              CommonFunctions.takeScreenShot();
            }
          } else {
            expect(false).customError('Total value for "' + columnName + '" is not displayed as "' + TotalValue + '". Found: "' + rowRef[columnIndexs[columnName]] + '"');
            CommonFunctions.takeScreenShot();
          }

        }
      });
    });
  });

  it('Verifying if ' + expectedCount + ' securities under [Unassigned] group have value "1" for "' + columnName + '"', function() {
    if (unassignedSecuritiesValues !== expectedCount) {
      expect(false).customError('Expected: "' + expectedCount + '" but Found "' + unassignedSecuritiesValues + '"');
      CommonFunctions.takeScreenShot();
    }
  });
};

describe('Test Case: mac-comp-asset', function() {

  var sAndPROwValues = [];
  var sAndPROwValuesAfterUnchecking = [];
  var russelRowValues = [];
  var russelRowValuesAfterUnchecking = [];
  var arrOfRows = [sAndPROwValues, russelRowValues];
  var arrOfRowsAfterUncheckingCheckbox = [sAndPROwValuesAfterUnchecking, russelRowValuesAfterUnchecking];
  var arrOfRowNames = ['S&P 500 / Materials -SEC', 'RUSSELL 2000 FUTR Dec08'];

  // Local functions
  var switchToUniverseTabAndCheckOrUncheck = function(checkOrUncheck) {

    var status;
    if (checkOrUncheck === true) {
      status = 'Check';
    } else {
      status = 'Un-Check';
    }

    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights', 'Options');

    it('Should click on the "Universe" tab on the LHP of tile options view', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Universe').select();

      // Verifying if "Universe" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Universe').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Universe" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Search Order" button located under "Expand Composite Assets"', function() {
      ThiefHelpers.getButtonClassReference('Search Order').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Search Order" button located under "Expand Composite Assets".');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Asset Ordering" dialog is displayed after clicking Search Order button', function() {
      ThiefHelpers.isDialogOpen('Asset Ordering').then(function(dialogStatus) {
        if (!dialogStatus) {
          expect(false).customError('"Asset Ordering" dialog is not displayed after clicking Search Order button');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should "' + status + '" "Use Default Ordering" checkbox', function() {
      ThiefHelpers.setCheckBox('Use Default Ordering', undefined, checkOrUncheck);
    });

    // Getting the xpath of the Selected section
    var xpathOfOkButton = CommonFunctions.replaceStringInXpath(AssetOrdering.xpathOfClearAllOrOkOrCancelButton, 'OK');

    it('Should click on "OK" button in the Asset ordering dialog', function() {
      ThiefHelpers.getButtonClassReference(undefined, xpathOfOkButton).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button in the Asset ordering dialog.');
        CommonFunctions.takeScreenShot();
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Scrolling the row to the top', function() {
      SlickGridFunctions.scrollRowToTop('Weights', 200);
    });
  };

  var compareTheReportValues = function(columnName, arrOfColumnValues) {
    arrOfRowNames.forEach(function(rowName, index) {
      it('Verifying that for "' + rowName + '" "' + columnName + '" is displayed as "' + arrOfColumnValues[index] + '"', function() {
        var compare = arrOfRows[index];
        if (compare[columnIndexs[columnName]] !== arrOfColumnValues[index]) {
          expect(false).customError('Expected "' + arrOfColumnValues[index] + '" but Found: "' + compare[columnIndexs[columnName]] +
            '" for "' + rowName);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  };

  describe('Test Step ID: 676661', function() {
    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:;Pa3;Risk;QA_MCVAR_Composite_Asset_Coverage"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('composite-asset-coverage');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if header displays "MCVAR_COMPOSITE_ASSET vs S&P 100"', function() {
      PA3MainPage.getHeader().getText().then(function(text) {
        if (text !== 'MCVAR_COMPOSITE_ASSET vs S&P 100') {
          expect(false).customError('Header of application is not showing "MCVAR_COMPOSITE_ASSET vs S&P 100". Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 676662', function() {

    it('Expand "[Unassigned]" if not already expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', '[Unassigned]', 'grid-canvas grid-canvas-top grid-canvas-left').then(function() {
      }, function(status) {
        if (!status) {
          PA3MainPage.expandTreeInCalculatedReport('Weights', '[Unassigned]', undefined, 'top');
        }
      });
    });

    it('Get the column Names', function() {
      SlickGridFunctions.getColumnNames('Weights').then(function(columnNames) {
        columnNames.forEach(function(name, index) {
          columnIndexs[name] = index;
        });
      });
    });

    arrOfRowNames.forEach(function(rowName, index) {
      it('Should note all the values in a row for "' + rowName + '" security', function() {
        SlickGridFunctions.getRowData('Weights', rowName, '').then(function(rowData) {
          rowData.forEach(function(val) {
            arrOfRows[index].push(val);
          });

        });
      });
    });

    var arrOfAssetTypeColumn = ['Composite Asset', 'Equity/Index Future'];

    // Verifying if "MAC Port/Bench Asset Type" column displayed as expected
    compareTheReportValues('MAC Port/Bench Asset Type', arrOfAssetTypeColumn);
  });

  describe('Test Step ID: 676663', function() {

    // Compare the values of "Port. Coverage Flag" for required column
    var arrOfPortCoverageFlag = ['1', '1'];
    compareTheReportValues('Port. Coverage Flag', arrOfPortCoverageFlag);

    // Compare the values of "Port/Bench Coverage Flag" for required column
    var arrOfPortOrBenchCoverageFlag = ['1', '1'];
    compareTheReportValues('Port/Bench Coverage Flag', arrOfPortOrBenchCoverageFlag);

    // Compare the values of "Port. Ending Market Value" for required column
    arrOfRowNames.forEach(function(rowName, index) {
      it('Verifying that for "' + rowName + '" "Port. Ending Market Value" is not displayed as "--"', function() {
        var compare = arrOfRows[index];
        if (compare[columnIndexs['Port. Ending Market Value']] === '--') {
          expect(false).customError('Expected "Value" but Found: "' + compare[columnIndexs['Port. Ending Market Value']] + '" ');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 676664', function() {

    it('Should right click on "Consumer Discretionary" grouping and click "Expand All"', function() {
      SlickGridFunctions.getCellReference('Weights', 'Consumer Discretionary', '', '').then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Expand All');
        browser.sleep(2000);
      });
    });

    var arrOfPortCoverageFlag = [];
    it('Storing the values in "Port. Coverage Flag" for future use', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Port. Coverage Flag').then(function(cellValues) {
        cellValues.forEach(function(value) {
          arrOfPortCoverageFlag.push(value);
        });
      });
    });

    it('Verify that "1" is displayed in "Port.Coverage Flag" if values are displayed in "Port. Ending Weight" else "--" is displayed in both the columns', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Port. Ending Weight').then(function(cellValues) {
        cellValues.forEach(function(value, index) {
          if (value === '.0') {
            if (arrOfPortCoverageFlag[index] !== '.0') {
              expect(false).customError('Expected: "--" but Found "' + arrOfPortCoverageFlag[index] + '".');
              CommonFunctions.takeScreenShot();
            }
          } else if (value !== '.0') {
            if (arrOfPortCoverageFlag[index] === '1.0') {
              expect(true).toBeTruthy();
            }
          }
        });
      });
    });
  });

  describe('Test Step ID: 676665', function() {

    var arrOfColumns = ['Port. Ending Weight', 'Bench. Ending Weight'];
    var arrOfIndexWithValueEitherInPortOrBench = [];
    var indexOfRUSSELL;

    arrOfColumns.forEach(function(colName) {
      it('Storing the index where "' + colName + '" is not "--"', function() {
        SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
          dataView.forEach(function(eleRef, rowIndex) {
            if (eleRef.metadata.type !== 'group') {
              if (eleRef[columnIndexs[colName]] !== '.0') {
                if (eleRef[0] !== 'Total') {
                  arrOfIndexWithValueEitherInPortOrBench.push(rowIndex);
                }
              }
            }
          });
        });
      });
    });

    it('Sorting the indexes in ascending order', function() {
      arrOfIndexWithValueEitherInPortOrBench.sort(function(a, b) {
        return a - b;
      });
    });

    it('Verifying that "1" is displayed in "Port/Bench Coverage Flag" if value is displayed any of "Port. Ending Weight", ' +
      '"Bench. Ending Weight" columns', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Port/Bench Coverage Flag').then(function(cellValues) {
        arrOfIndexWithValueEitherInPortOrBench.forEach(function(value) {
          if (cellValues[value] !== '1.0') {
            expect(false).customError('Expected to display "1.0" for "Port/Bench Coverage Flag" column if any of "' + arrOfColumns +
              '" columns for security display a value but Found: "' + cellValues[value] + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 676666', function() {

    getSecuritiesValueCountHasOne('Port. Coverage Flag', '8.0', 8);

    getSecuritiesValueCountHasOne('Port/Bench Coverage Flag', '19.0', 19);

    var arr = ['S&P 500 / Materials -SEC', 'RUSSELL 2000 FUTR Dec08'];
    arr.forEach(function(rowName) {
      it('Verifying if "Port/Bench Coverage Flag" column is displayed with "1" for "' + rowName + '" securities', function() {
        SlickGridFunctions.getCellReference('Weights', rowName, '', 'Port/Bench Coverage Flag', undefined, '[Unassigned]').then(function(ref) {
          ref.getText().then(function(text) {
            if (text !== '1') {
              expect(false).customError('"' + rowName + '" row is not displayed with "1" for column "Port/Bench Coverage Flag", Found: "' + text);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

  });

  describe('Test Step ID: 676667', function() {

    // Switch to Universe Tab click on Search order button and un-check "Use Default Ordering" option
    switchToUniverseTabAndCheckOrUncheck(false);

    arrOfRowNames.forEach(function(rowName, index) {
      it('Should note all the values in a row for "' + rowName + '" security', function() {
        SlickGridFunctions.getRowData('Weights', rowName, '').then(function(rowData) {
          rowData.forEach(function(val) {
            arrOfRowsAfterUncheckingCheckbox[index].push(val);
          });

        });
      });
    });

    var arrOfColumnNames = ['MC % Value at Risk 10 Day, 99%', 'Port. Coverage Flag', 'Port/Bench Coverage Flag'];
    arrOfRowNames.forEach(function(rowName, index) {
      it('Verifying that for "' + rowName + '" "Port. Ending Market Value" is displayed as "--"', function() {
        var compare = arrOfRowsAfterUncheckingCheckbox[index];
        arrOfColumnNames.forEach(function(colName) {
          if (compare[columnIndexs[colName]] !== '--') {
            expect(false).customError('Expected "--" but Found: "' + compare[columnIndexs[colName]] + '" ');
            CommonFunctions.takeScreenShot();
          }
        });

      });
    });

  });

  describe('Test Step ID: 676668', function() {

    // Switch to Universe Tab click on Search order button and check "Use Default Ordering" option
    switchToUniverseTabAndCheckOrUncheck(true);

    var sAndPROwValuesAfterChecking = [];
    var russelRowValuesAfterChecking = [];
    var arrOfRowsAfterCheckingCheckbox = [sAndPROwValuesAfterChecking, russelRowValuesAfterChecking];

    arrOfRowNames.forEach(function(rowName, index) {
      it('Should note all the values in a row for "' + rowName + '" security', function() {
        SlickGridFunctions.getRowData('Weights', rowName, '').then(function(rowData) {
          rowData.forEach(function(val) {
            arrOfRowsAfterCheckingCheckbox[index].push(val);
          });

        });
      });
    });

    var valueNotToBe = ['--', '', 'NA', '.0'];
    var arrOfColumnNames = ['MC % Value at Risk 10 Day, 99%', 'Port. Coverage Flag', 'Port/Bench Coverage Flag'];
    arrOfRowNames.forEach(function(rowName, index) {
      it('Verifying that for "' + rowName + '" "Port. Ending Market Value" is not displayed as "--"', function() {
        var compare = arrOfRowsAfterCheckingCheckbox[index];
        arrOfColumnNames.forEach(function(colName) {
          if (valueNotToBe.indexOf(compare[columnIndexs[colName]]) !== -1) {
            expect(false).customError(rowName + ' row is displayed with "' + compare[columnIndexs[colName]] + '" but expected to display value');
            CommonFunctions.takeScreenShot();
          }
        });

      });
    });

  });

});
