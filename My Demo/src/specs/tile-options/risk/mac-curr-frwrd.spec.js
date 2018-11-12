'use strict';

// Requiring PA3 page object files
require(__dirname + '/../../../index.js');

describe('Test Case: mac-curr-frwrd', function() {

  // Global variables
  var temp;

  describe('Test Step ID: Start Up Instructions', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 678809', function() {

    var currencyGroupingsArray = [];
    var count = 0;
    var FixedIncomeValuesArray = [];
    var CashValuesArray = [];

    it('Should open PA3 Application with "Client:;Pa3;Risk;MAC_FWD_EXPOSURE"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('mac-fwd-exposure');
    });

    it('Should wait for "Weights" report to calculate', function() {
      // Waiting for "Weights" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Weights'), 60000);

      // Verifying if "Calculation Error" dialog appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          expect(false).customError('"Calculation Error" found while report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Weights" report loaded without any error', function() {

      // Verifying if "Weights" report calculated
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"Weights" report is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Weights" report: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Weights" report is in focus', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Reports', 'Weights').then(function(reportRef) {
        reportRef.getAttribute('class').then(function(reportStatus) {
          if (reportStatus.indexOf('selected') < 0) {
            expect(false).customError('"Weights" report is not in focus');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if the value of "U.S. Dollar" group is "100" for "Port. Weight" column', function() {
      SlickGridFunctions.getCellReference('Weights', 'U.S. Dollar', '', 'Port. Weight', '').then(function(ref) {
        ref.getText().then(function(value) {
          if (value !== '100.00') {
            expect(false).customError('The expected value of "U.S. Dollar" group is "100" for "Port. Weight" column, ' +
              'but found: "' + value + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if the values of "[CASH]" and "Fixed Income" groups under "U.S. Dollar" are positive', function() {
      var groupFound = false;
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(rowRef) {
          if (rowRef[0] === 'U.S. Dollar' && rowRef.metadata.type === 'group') {
            groupFound = true;
            var parentID = rowRef.id;
            dataView.forEach(function(element) {
              if (parentID === element.parentId) {
                if (element[1] < 0) {
                  expect(false).customError('The expected value of "' + element[0] + '" group under the "U.S. Dollar" group' +
                    'for "Port. Weight" column is to be a positive value but found: "' + element[1] + '"');
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          }
        });
      }).then(function() {
        if (groupFound === false) {
          expect(false).customError('No group found with "U.S. Dollar"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should fetch all the currency from the "Weights" report', function() {
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(rowRef) {
          if (rowRef.metadata.type === 'group' && rowRef.parentId === null) {
            currencyGroupingsArray.push(rowRef[0]);
          }
        });
      });
    });

    it('Verifying if the values of all currency groupings except "U.S. Dollar" are dashes for "Port. Weight" column', function() {
      count = 0;
      currencyGroupingsArray.forEach(function(group) {
        if (group !== 'U.S. Dollar') {
          PA3MainPage.getCellValueForMultiHeaderColumn('Weights', group, 1, 'grid-canvas grid-canvas-bottom grid-canvas-left',
            'grid-canvas grid-canvas-bottom grid-canvas-right',
            undefined, undefined).then(function(value) {
            if (value !== '--') {
              expect(false).customError('"' + group + '" currency group displayed "' + value + '" value for "Port. Weight" ' +
                'column instead of "--"');
              count = count + 1;
              if (count === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        }
      });
    });

    it('Verifying if the values of "Fixed Income" group under all currency groups for "Port. Weight" column is Positive', function() {
      count = 0;
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(rowRef) {
          if (rowRef.metadata.type === 'group' && rowRef.parentId === null && rowRef[0] !== 'U.S. Dollar') {
            var parentID = rowRef.id;
            dataView.forEach(function(element) {
              if (parentID === element.parentId && element[0] === 'Fixed Income') {
                FixedIncomeValuesArray.push(element[1]);
                if (element[1] < 0) {
                  expect(false).customError('The expected value of "Fixed Income" group under "' + rowRef[0] + '" group for "Port. Weight"' +
                    ' column is positive but found: "' + element[1] + '"');
                  count = count + 1;
                  if (count === 1) {
                    CommonFunctions.takeScreenShot();
                  }
                }
              }
            });
          }
        });
      });
    });

    it('Verifying if the values of "[Cash]" group under all currency groups for "Port. Weight" column is negative', function() {
      count = 0;
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(rowRef) {
          if (rowRef.metadata.type === 'group' && rowRef.parentId === null && rowRef[0] !== 'U.S. Dollar') {
            var parentID = rowRef.id;
            dataView.forEach(function(element) {
              if (parentID === element.parentId && element[0] === '[Cash]') {
                CashValuesArray.push(element[1]);
                if (element[1] > 0) {
                  expect(false).customError('The expected value of "[Cash]" group under "' + rowRef[0] + '" group for "Port. Weight"' +
                    ' column is negative but found: "' + element[1] + '"');
                  count = count + 1;
                  if (count === 1) {
                    CommonFunctions.takeScreenShot();
                  }
                }
              }
            });
          }
        });
      });
    });

    it('Verifying if the values for the Fixed income and [CASH] should be same number but opposite sign', function() {
      count = 0;
      var valueOfI;
      var valueOfJ;
      for (var i = 0; i < FixedIncomeValuesArray.length; i++) {
        for (var j = 0; j < CashValuesArray.length; j++) {
          valueOfI = i;
          valueOfJ = j;
        }
      }

      if (valueOfI === valueOfJ) {
        if (parseFloat(FixedIncomeValuesArray[valueOfI]) !== parseFloat(Math.abs(CashValuesArray[valueOfI]))) {
          expect(false).customError('The values for "Fixed Income" and "[Cash]" groups under' +
            ' "' + currencyGroupingsArray[valueOfI] + '" are not same with opposite sign. Instead found: "' + FixedIncomeValuesArray[valueOfI] + '" and' +
            ' "' + CashValuesArray[valueOfI] + '"');
          count = count + 1;
        }
      }

      if (count === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

  });

  describe('Test Step ID: 678810', function() {

    var currencyArray = ['Australian Dollar', 'British Pounds', 'Canadian Dollar', 'Danish Krone', 'Euro', 'Japanese Yen',
      'Swedish Krona', 'Swiss Franc',];
    var FixedIncomeValues = [];
    var FixedIncomeValuesTemp = [];
    var rowIds = [];
    var CashValuesTemp = [];
    var CashValues = [];

    it('Should fetch the values of "Fixed Income" group for particular currency under "Portfolio Exposure" column for multi headers as ' +
      'declared in "CurrencyArray" array', function() {
      var arrValues = function(i) {
        SlickGridFunctions.getCellReference('Weights', 'Fixed Income', '', 'Portfolio Exposure', temp, currencyArray[i]).then(function(ref) {
          ref.getText().then(function(value) {
            FixedIncomeValues.push(value);
          });
        });
      };

      for (var i = 0; i < currencyArray.length; i++) {
        if (currencyArray[i] === 'Danish Krone') {
          temp = 'Euro';
        } else if (currencyArray[i] === 'British Pounds') {
          temp = 'UK Pound';
        } else {
          temp = currencyArray[i];
        }

        arrValues(i);
      }
    });

    it('Should Fetch values of "Fixed Income" group for particular currency under "Port. Weight" column', function() {
      var values = function(i) {
        SlickGridFunctions.getCellReference('Weights', 'Fixed Income', '', 'Port. Weight', '', currencyArray[i]).then(function(ref) {
          ref.getText().then(function(cellValue) {
            FixedIncomeValuesTemp.push(cellValue);
          });
        });
      };

      for (var i = 0; i < currencyArray.length; i++) {
        values(i);
      }
    });

    it('Verifying if value displayed for the Fixed Income group for particular currency in "Portfolio Exposure" column under particular multi header is' +
      ' equal to value displayed for the Fixed Income group for particular currency in "Port. Weight" column divided by 100', function() {
      var count = 0;
      for (var i = 0; i < FixedIncomeValues.length; i++) {
        if (parseFloat(FixedIncomeValues[i]) !== parseFloat(FixedIncomeValuesTemp[i] / 100)) {
          if (currencyArray[i] === 'Danish Krone') {
            temp = 'Euro';
          } else if (currencyArray[i] === 'British Pounds') {
            temp = 'UK Pound';
          } else {
            temp = currencyArray[i];
          }

          expect(false).customError('Value displayed for the Fixed Income group for "' + currencyArray[i] + '" currency in "Portfolio Exposure" ' +
            'column under "' + temp + '" multi header is not equal to value displayed for the Fixed Income group ' +
            'for "' + currencyArray[i] + '" currency in "Port. Weight" column divided by 100. Expected: "' + parseFloat(FixedIncomeValuesTemp[i] / 100) +
            ' but Found: "' + parseFloat(FixedIncomeValues[i]) + '"');
          count = count + 1;
        }

        if (count === 1) {
          CommonFunctions.takeScreenShot();
        }
      }
    });

    it('Should fetch values from "[Cash]" group for particular currency under "Portfolio Exposure" column for multi headers as ' +
      'declared "CurrencyArray" array', function() {
      var arrValues = function(i) {
        SlickGridFunctions.getCellReference('Weights', '[Cash]', '', 'Portfolio Exposure', temp, currencyArray[i]).then(function(ref) {
          ref.getText().then(function(value) {
            CashValues.push(value);
          });
        });
      };

      for (var i = 0; i < currencyArray.length; i++) {
        if (currencyArray[i] === 'Danish Krone') {
          temp = 'Euro';
        } else if (currencyArray[i] === 'British Pounds') {
          temp = 'UK Pound';
        } else {
          temp = currencyArray[i];
        }

        arrValues(i);
      }
    });

    it('Should Fetch values from "[Cash]" group for particular currency under "Port. Weight" column', function() {
      var values = function(i) {
        SlickGridFunctions.getCellReference('Weights', '[Cash]', '', 'Port. Weight', '', currencyArray[i]).then(function(ref) {
          ref.getText().then(function(cellValue) {
            CashValuesTemp.push(cellValue);
          });
        });
      };

      for (var i = 0; i < currencyArray.length; i++) {
        values(i);
      }
    });

    it('Verifying if value displayed for the [Cash] group for particular currency in "Portfolio Exposure" column under particular multi header is' +
      ' equal to value displayed for the [Cash] group for particular currency in "Port. Weight" column divided by 100', function() {
      var count = 0;
      for (var i = 0; i < CashValues.length; i++) {
        if (parseFloat(CashValues[i]) !== parseFloat(CashValuesTemp[i] / 100)) {
          if (currencyArray[i] === 'Danish Krone') {
            temp = 'Euro';
          } else if (currencyArray[i] === 'British Pounds') {
            temp = 'UK Pound';
          } else {
            temp = currencyArray[i];
          }

          expect(false).customError('Value displayed for the [Cash] group for "' + currencyArray[i] + '" currency in "Portfolio Exposure" ' +
            'column under "' + temp + '" multi header is not equal to value displayed for the [Cash] group ' +
            'for "' + currencyArray[i] + '" currency in "Port. Weight" column divided by 100. Expected: "' + parseFloat(CashValuesTemp[i] / 100) +
            ' but Found: "' + parseFloat(CashValues[i]) + '"');
          count = count + 1;
        }

        if (count === 1) {
          CommonFunctions.takeScreenShot();
        }
      }
    });

    it('Should fetch the row index\'s of "Fixed Income" and "[Cash]" groups under "Australian Dollar"', function() {
      rowIds = [];
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(rowRef) {
          if (rowRef[0] === 'Australian Dollar' && rowRef.metadata.type === 'group') {
            var parentID = rowRef.id;
            dataView.forEach(function(element, index) {
              if (parentID === element.parentId) {
                rowIds.push(index);
              }
            });
          }
        });
      });
    });

    it('Verifying if all the cells under "Portfolio Exposure" column of "Australian Dollar" multi header are dashes except for "Fixed Income"' +
      ' and "[Cash]" groups under "Australian Dollar"', function() {
      var count = 0;
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Portfolio Exposure', 'Australian Dollar').then(function(columnData) {
        columnData.forEach(function(cellValue, index) {
          if (index !== rowIds[0] && index !== rowIds[1]) {
            if (cellValue !== '.0') {
              expect(false).customError('The cell value under "Portfolio Exposure" column of "Australian Dollar" multi header is not displayed ' +
                ' dash at row number: "' + index + '". Expected: "--" Found: "' + cellValue + '"');
              count = count + 1;
            }
          }

          if (count === 1) {
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should fetch the row index\'s of "Fixed Income" and "[Cash]" groups under "British Pounds"', function() {
      rowIds = [];
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(rowRef) {
          if (rowRef[0] === 'British Pounds' && rowRef.metadata.type === 'group') {
            var parentID = rowRef.id;
            dataView.forEach(function(element, index) {
              if (parentID === element.parentId) {
                rowIds.push(index);
              }
            });
          }
        });
      });
    });

    it('Verifying if all the cells under "Portfolio Exposure" column of "UK Pound" multi header are dashes except for "Fixed Income"' +
      ' and "[Cash]" groups under "British Pounds"', function() {
      var count = 0;
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Portfolio Exposure', 'UK Pound').then(function(columnData) {
        columnData.forEach(function(cellValue, index) {
          if (index !== rowIds[0] && index !== rowIds[1]) {
            if (cellValue !== '.0') {
              expect(false).customError('The cell value under "Portfolio Exposure" column of "UK Pound" multi header is not displayed ' +
                ' dash at row number: "' + index + '". Expected: "--" Found: "' + cellValue + '"');
              ++count;
            }
          }

          if (count === 1) {
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should fetch the row index\'s of "Fixed Income" and "[Cash]" groups under "Canadian Dollar"', function() {
      rowIds = [];
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(rowRef) {
          if (rowRef[0] === 'Canadian Dollar' && rowRef.metadata.type === 'group') {
            var parentID = rowRef.id;
            dataView.forEach(function(element, index) {
              if (parentID === element.parentId) {
                rowIds.push(index);
              }
            });
          }
        });
      });
    });

    it('Verifying if all the cells under "Portfolio Exposure" column of "Canadian Dollar" multi header are dashes except for "Fixed Income"' +
      ' and "[Cash]" groups under "Canadian Dollar"', function() {
      var count;
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Portfolio Exposure', 'Canadian Dollar').then(function(columnData) {
        columnData.forEach(function(cellValue, index) {
          if (index !== rowIds[0] && index !== rowIds[1]) {
            if (cellValue !== '.0') {
              expect(false).customError('The cell value under "Portfolio Exposure" column of "Canadian Dollar" multi header is not displayed ' +
                ' dash at row number: "' + index + '". Expected: "--" Found: "' + cellValue + '"');
              ++count;
            }
          }

          if (count === 1) {
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should fetch the row index\'s of "Fixed Income" and "[Cash]" groups under "Danish Krone"', function() {
      rowIds = [];
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(rowRef) {
          if (rowRef[0] === 'Danish Krone' && rowRef.metadata.type === 'group') {
            var parentID = rowRef.id;
            dataView.forEach(function(element, index) {
              if (parentID === element.parentId) {
                rowIds.push(index);
              }
            });
          }
        });
      });
    });

    it('Should fetch the row index\'s of "Fixed Income" and "[Cash]" groups under "Euro"', function() {
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(rowRef) {
          if (rowRef[0] === 'Euro' && rowRef.metadata.type === 'group') {
            var parentID = rowRef.id;
            dataView.forEach(function(element, index) {
              if (parentID === element.parentId) {
                rowIds.push(index);
              }
            });
          }
        });
      });
    });

    it('Verifying if all the cells under "Portfolio Exposure" column of "Euro" multi header are dashes except for "Fixed Income"' +
      ' and "[Cash]" groups under "Danish Krone" and "Euro"', function() {
      var count = 0;
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Portfolio Exposure', 'Euro').then(function(columnData) {
        columnData.forEach(function(cellValue, index) {
          if (index !== rowIds[0] && index !== rowIds[1] && index !== rowIds[2] && index !== rowIds[3]) {
            if (cellValue !== '.0') {
              expect(false).customError('The cell value under "Portfolio Exposure" column of "Euro" multi header is not displayed ' +
                ' dash at row number: "' + index + '". Expected: "--" Found: "' + cellValue + '"');
              ++count;
            }
          }

          if (count === 1) {
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should fetch the row index\'s of "Fixed Income" and "[Cash]" groups under "Japanese Yen"', function() {
      rowIds = [];
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(rowRef) {
          if (rowRef[0] === 'Japanese Yen' && rowRef.metadata.type === 'group') {
            var parentID = rowRef.id;
            dataView.forEach(function(element, index) {
              if (parentID === element.parentId) {
                rowIds.push(index);
              }
            });
          }
        });
      });
    });

    it('Verifying if all the cells under "Portfolio Exposure" column of "Japanese Yen" multi header are dashes except for "Fixed Income"' +
      ' and "[Cash]" groups under "Japanese Yen"', function() {
      var count = 0;
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Portfolio Exposure', 'Japanese Yen').then(function(columnData) {
        columnData.forEach(function(cellValue, index) {
          if (index !== rowIds[0] && index !== rowIds[1]) {
            if (cellValue !== '.0') {
              expect(false).customError('The cell value under "Portfolio Exposure" column of "Japanese Yen" multi header is not displayed ' +
                ' dash at row number: "' + index + '". Expected: "--" Found: "' + cellValue + '"');
              ++count;
            }
          }

          if (count === 1) {
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should fetch the row index\'s of "Fixed Income" and "[Cash]" groups under "Swedish Krona"', function() {
      rowIds = [];
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(rowRef) {
          if (rowRef[0] === 'Swedish Krona' && rowRef.metadata.type === 'group') {
            var parentID = rowRef.id;
            dataView.forEach(function(element, index) {
              if (parentID === element.parentId) {
                rowIds.push(index);
              }
            });
          }
        });
      });
    });

    it('Verifying if all the cells under "Portfolio Exposure" column of "Swedish Krona" multi header are dashes except for "Fixed Income"' +
      ' and "[Cash]" groups under "Swedish Krona"', function() {
      var count = 0;
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Portfolio Exposure', 'Swedish Krona').then(function(columnData) {
        columnData.forEach(function(cellValue, index) {
          if (index !== rowIds[0] && index !== rowIds[1]) {
            if (cellValue !== '.0') {
              expect(false).customError('The cell value under "Portfolio Exposure" column of "Swedish Krona" multi header is not displayed ' +
                ' dash at row number: "' + index + '". Expected: "--" Found: "' + cellValue + '"');
              ++count;
            }
          }

          if (count === 1) {
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should fetch the row index\'s of "Fixed Income" and "[Cash]" groups under "Swiss Franc"', function() {
      rowIds = [];
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(rowRef) {
          if (rowRef[0] === 'Swiss Franc' && rowRef.metadata.type === 'group') {
            var parentID = rowRef.id;
            dataView.forEach(function(element, index) {
              if (parentID === element.parentId) {
                rowIds.push(index);
              }
            });
          }
        });
      });
    });

    it('Verifying if all the cells under "Portfolio Exposure" column of "Swiss Franc" multi header are dashes except for "Fixed Income"' +
      ' and "[Cash]" groups under "Swiss Franc"', function() {
      var needScreenshot = 0;
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Portfolio Exposure', 'Swiss Franc').then(function(columnData) {
        columnData.forEach(function(cellValue, index) {
          if (index !== rowIds[0] && index !== rowIds[1]) {
            if (cellValue !== '.0') {
              expect(false).customError('The cell value under "Portfolio Exposure" column of "Swiss Franc" multi header is not displayed ' +
                ' dash at row number: "' + index + '". Expected: "--" Found: "' + cellValue + '"');
              ++needScreenshot;
            }
          }

        });
      });

      if (needScreenshot === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

  });

});
