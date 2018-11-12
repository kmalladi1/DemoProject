'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-exclu-asset', function() {

  var arrColNames = ['Port Wgt from Risk Engine', 'Bench Wgt from Risk Engine', 'Active Wgt from Risk Engine',
    'Factor Risk (Variance)', 'Total Risk (Variance)',];
  var arrColNames1 = ['Risk Factors Effect', 'Risk Stock Specific Effect', 'Risk Total Effect', 'Risk Transaction Effect',
    'Total Effect', 'Compounded Factor Impact', 'Compounded Factor Impact', 'Compounded Factor Impact',];
  var arrMultiHeaders = ['Risk Attribution|', 'Risk Attribution|Risk Indices', 'Risk Attribution|Industries', 'Risk Attribution|Market',];
  var arrColIndices = [];
  var arrCompundedFactor = [];
  var riskColIndex;
  var arrSecurities = ['FactSet Research Systems Inc.', 'General Electric Company', 'International Business ' +
  'Machines Corporation', 'Siemens AG', 'Toyota Motor Corp.',];

  describe('Test Step ID: 640743', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Risk/Securities_not_covered_1"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('securities-not-covered');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Asset Detail');

    var flag = 0;
    arrColNames.forEach(function(colName) {
      it('Verify that "Asset Detail" report calculates for column "' + colName + '"', function() {
        SlickGridFunctions.getColumnNames('Asset Detail').then(function(colNames) {
          if (colNames.indexOf(colName) < -1) {
            flag = flag + 1;
            expect(false).customError(colName + ' is not present in the report');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    arrColNames.forEach(function(colName) {
      it('Verify that "Total" row contains value for column "' + colName + '" (except "Active Wgt from Risk Engine")', function() {
        SlickGridFunctions.getCellReference('Asset Detail', 'Total', '', colName).then(function(reference) {
          reference.getText().then(function(value) {
            if (colName === 'Active Wgt from Risk Engine') {
              if (value !== '--') {
                flag = flag + 1;
                expect(false).customError('"Active Wgt from Risk Engine" column doesnot contain "--" for "Total" row');
                if (flag === 1) {
                  CommonFunctions.takeScreenShot();
                }
              }
            } else {
              if (value === null || value === '' || value === '--') {
                expect(false).customError('"' + colName + '" column doesnot contain value for "Total" row, Found"' + value + '"');
                flag = flag + 1;
                if (flag === 1) {
                  CommonFunctions.takeScreenShot();
                }
              }
            }
          });
        });
      });
    });

    arrColNames.forEach(function(colName) {
      it('Verify that "Siemens AG" value for column "' + colName + '" contains value: "--"', function() {
        SlickGridFunctions.getCellReference('Asset Detail', 'Siemens AG', '', colName).then(function(reference) {
          reference.getText().then(function(value) {
            if (value !== '--') {
              flag = flag + 1;
              expect(false).customError('"' + colName + '" column doesnot contain "--" , Found :' + value);
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

    arrColNames.forEach(function(colName) {
      it('Verify that "Toyota Motor Corp." value for column "' + colName + '" contains value', function() {
        SlickGridFunctions.getCellReference('Asset Detail', 'Toyota Motor Corp.', '', colName).then(function(reference) {
          reference.getText().then(function(value) {
            if (value !== '--') {
              flag = flag + 1;
              expect(false).customError('"' + colName + '" column doesnot contain "--" , Found :' + value);
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 640745', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Asset Detail', 'Exclusions');

    it('Verifying if "Include in Report" is selected in "Asset not covered by the risk model" dropdown', function() {
      ThiefHelpers.verifySelectedDropDownText('Include in Report', undefined, TileOptionsExclusions.xpathAssetsNotCoveredbyRiskModelDropdown);
    });

    it('Should change "Asset not covered by the risk model" dropdown value from "Include in Report" to ' +
      '"Exclude from report"', function() {
      ThiefHelpers.selectOptionFromDropDown('Exclude from Report', undefined,
        TileOptionsExclusions.xpathAssetsNotCoveredbyRiskModelDropdown);

      // Verify "Exclude from Report" is selected
      ThiefHelpers.verifySelectedDropDownText('Exclude from Report', undefined,
        TileOptionsExclusions.xpathAssetsNotCoveredbyRiskModelDropdown);
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Asset Detail');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Asset Detail');

    var arrSecurities = ['FactSet Research Systems Inc.', 'General Electric Company', 'International Business Machines Corporation'];
    var flag = 0;
    arrSecurities.forEach(function(element, index) {
      it('Verifying if "' + element + '" security is present in the calculated report', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Asset Detail', '', '').then(function(rowValues) {
          if (rowValues.indexOf(arrSecurities[index]) < 0) {
            flag = flag + 1;
            expect(false).customError('"' + arrSecurities[index] + '" Security is not present in the calculated report');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it('Verifying that only 3 securities are displayed in the calculated report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Asset Detail', '', '').then(function(rowValues) {
        if (rowValues.length !== 4) {
          expect(false).customError('e is not present in the calculated report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    arrSecurities.forEach(function(securityName) {
      arrColNames.forEach(function(colName) {
        it('Verify that "' + securityName + '" row, "' + colName + '" column contains value ( except  General Electric Company &, ' +
          'Port Wgt from Risk Engine)', function() {
          SlickGridFunctions.getCellReference('Asset Detail', securityName, '', colName).then(function(reference) {
            reference.getText().then(function(value) {
              if (securityName === 'General Electric Company' && colName === 'Port Wgt from Risk Engine') {
                if (value !== '--') {
                  flag = flag + 1;
                  expect(false).customError('"Active Wgt from Risk Engine" column doesnot contain "--" for "Total" row');
                  if (flag === 1) {
                    CommonFunctions.takeScreenShot();
                  }
                }
              } else {
                if (value === null || value === '' || value === '--') {
                  expect(false).customError('"' + colName + '" column doesnot contain value for "' + securityName + '" ' +
                    'row, Found"' + value + '"');
                  flag = flag + 1;
                  if (flag === 1) {
                    CommonFunctions.takeScreenShot();
                  }
                }
              }
            });
          });
        });
      });
    });
  });

  describe('Test Step ID: 640659', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Asset Detail', 'Exclusions');

    it('Should change "Asset not covered by the risk model" dropdown value to ' +
      '"Exclude to Stock Specific Effect"', function() {
      ThiefHelpers.selectOptionFromDropDown('Exclude to Stock Specific Effect', undefined,
        TileOptionsExclusions.xpathAssetsNotCoveredbyRiskModelDropdown);

      // Verify "Exclude to Stock Specific Effect" is selected
      ThiefHelpers.verifySelectedDropDownText('Exclude to Stock Specific Effect', undefined,
        TileOptionsExclusions.xpathAssetsNotCoveredbyRiskModelDropdown);
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Asset Detail');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Asset Detail');

    var flag = 0;
    arrSecurities.forEach(function(element) {
      it('Verifying if "' + element + '" security is present in the calculated report', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Asset Detail', '', '').then(function(rowValues) {
          if (rowValues.indexOf(element) < 0) {
            flag = flag + 1;
            expect(false).customError('"' + element + '" Security is not present in the calculated report');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    var arrRows = ['Siemens AG', 'Toyota Motor Corp.',];
    arrRows.forEach(function(securityName) {
      arrColNames.forEach(function(colName) {
        it('Verify that "' + securityName + '" value for column "' + colName + '" contains "--"', function() {
          SlickGridFunctions.getCellReference('Asset Detail', securityName, '', colName).then(function(reference) {
            reference.getText().then(function(value) {
              if (value !== '--') {
                flag = flag + 1;
                expect(false).customError('"' + colName + '" column doesnot contain "--" for "' + securityName + '" row');
                if (flag === 1) {
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          });
        });
      });
    });
  });

  describe('Test Step ID: 640746', function() {

    it('Should click on "Risk Attribution Detail Chart" report from LHP to select', function() {
      PA3MainPage.getReports('Risk Attribution Detail Chart').click().then(function() {
      }, function(err) {
        expect(false).customError('Unable to click on "Risk Attribution Detail Chart" reports' + err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Risk Attribution Detail Chart" report is highlighted
      PA3MainPage.getReports('Risk Attribution Detail Chart').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Risk Attribution Detail Chart" report did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Risk Attribution Detail Chart" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Risk Attribution Detail Chart'), 180000);
    });

    it('Verifying if the "Risk Attribution Detail Chart" report is calculated', function() {
      PA3MainPage.isReportCalculated('Risk Attribution Detail Chart').then(function(calculated) {
        if (!calculated) {
          expect(false).customError('"Risk Attribution Detail Chart" report did not get generated');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Risk Attribution Detail Chart')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any calculation error appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var flag = 0;
    var i = 0;
    it('Verify that "Risk Attribution Detail Chart" report calculates for all column', function() {
      SlickGridFunctions.getColumnNames('Risk Attribution Detail Chart').then(function(cols) {
        arrMultiHeaders.forEach(function(headerOflevel1, index) {
          PA3MainPage.getColumnNumberRangeForMultiHeader('Risk Attribution Detail Chart', headerOflevel1).then(function(arrColIndex) {
            arrColIndex.forEach(function(colIndex) {
              if (index >= 1) {
                arrCompundedFactor.push(colIndex);
              }

              arrColIndices.push(colIndex);
              if (cols[colIndex] !== arrColNames1[i]) {
                flag = flag + 1;
                expect(false).customError(arrColNames1[i] + ' is not present in the report');
                if (flag === 1) {
                  CommonFunctions.takeScreenShot();
                }
              }

              i++;
            });
          });
        });
      });
    });

    arrSecurities.forEach(function(element) {
      it('Verifying if "' + element + '" security is present in the calculated report', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Risk Attribution Detail Chart', '').then(function(rowValues) {
          if (rowValues.indexOf(element) < 0) {
            flag = flag + 1;
            expect(false).customError('"' + element + '" Security is not present in the calculated report');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    var arrRows = ['Siemens AG', 'Toyota Motor Corp.',];
    arrRows.forEach(function(securityName) {
      it('Verify that "' + securityName + '"  for all "Compounded Factor Impact" columns contains "--"', function() {
        SlickGridFunctions.getRowIndex('Risk Attribution Detail Chart', securityName, '').then(function(rowIndex) {
          arrCompundedFactor.forEach(function(colIndex) {
            browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
              '.grid.getCellNode( arguments[0], arguments[1] )', rowIndex, colIndex).then(function(value) {
              value.getText().then(function(cellValue) {
                if (cellValue !== '--') {
                  flag = flag + 1;
                  expect(false).customError('"' + securityName + '" row doesnot contain "--" , Found : ' + cellValue);
                  if (flag === 1) {
                    CommonFunctions.takeScreenShot();
                  }
                }
              });

            });
          });

        });
      });
    });

    arrRows.forEach(function(securityName) {
      it('Verify that "' + securityName + '"  for "Risk Factors Effect" columns contains "--"', function() {
        SlickGridFunctions.getCellReference('Risk Attribution Detail Chart', securityName, '', 'Risk Factors Effect').then(function(value) {
          value.getText().then(function(cellValue) {
            if (cellValue !== '--') {
              flag = flag + 1;
              expect(false).customError('"' + securityName + '" row doesnot contain "--" , Found : ' + cellValue);
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

    arrSecurities.forEach(function(securityName) {
      it('Verify that "' + securityName + '" value for column "Risk Transaction Effect" contains "--"', function() {
        SlickGridFunctions.getCellReference('Risk Attribution Detail Chart', securityName, '', 'Risk Transaction Effect').then(function(reference) {
          reference.getText().then(function(value) {
            if (value !== '--') {
              flag = flag + 1;
              expect(false).customError('"Risk Transaction Effect" column doesnot contain "--" for "' + securityName + '" row');
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

    arrSecurities.forEach(function(securityName) {
      it('Verify that "' + securityName + '"  for "Market > Compounded Factor Impact" column contains "--"', function() {
        SlickGridFunctions.getRowIndex('Risk Attribution Detail Chart', securityName, '').then(function(rowIndex) {
          var colIndex = arrColIndices.length;
          browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
            '.grid.getCellNode( arguments[0], arguments[1] )', rowIndex, colIndex).then(function(value) {
            value.getText().then(function(cellValue) {
              if (cellValue !== '--') {
                flag = flag + 1;
                expect(false).customError('"' + securityName + '" row doesnot contain "--" , Found : ' + cellValue);
                if (flag === 1) {
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          });
        });
      });
    });

    it('Calculating the colIndex for "Risk Transaction Effect" column', function() {
      SlickGridFunctions.getColumnIndex('Risk Attribution Detail Chart', 'Risk Transaction Effect').then(function(index) {
        riskColIndex = index;
      });
    });

    var arrRowNames = ['FactSet Research Systems Inc.', 'General Electric Company', 'International Business '];
    arrRowNames.forEach(function(securityName) {
      it('Verify that "' + securityName + '" row contins value for all columns except columns "Risk Transaction Effect" ' +
        'and "Market > Compounded Factor Impact"', function() {
        arrColIndices.forEach(function(colIndex) {
          if (colIndex !== arrColIndices.length && colIndex !== riskColIndex) {
            browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
              '.grid.getCellNode( arguments[0], arguments[1] )', 0, colIndex).then(function(val) {
              val.getText().then(function(cellValue) {
                if (cellValue === '' || cellValue === null || cellValue === '--') {
                  flag = flag + 1;
                  expect(false).customError('"' + securityName + '" doesnot contain a value for columnIndex "' + colIndex + '", found :' + cellValue);
                  if (flag === 1) {
                    CommonFunctions.takeScreenShot();
                  }
                }
              });
            });
          }
        });
      });
    });

  });

  describe('Test Step ID: 640748', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Risk Attribution Detail Chart', 'Exclusions');

    it('Verifying if "Include in Report" is selected in "Asset not covered by the risk model" dropdown', function() {
      ThiefHelpers.verifySelectedDropDownText('Include in Report', undefined, TileOptionsExclusions.xpathAssetsNotCoveredbyRiskModelDropdown);
    });

    it('Should change "Asset not covered by the risk model" dropdown value from "Include in Report" to ' +
      '"Exclude to Stock Specific Effect"', function() {
      ThiefHelpers.selectOptionFromDropDown('Exclude to Stock Specific Effect', undefined,
        TileOptionsExclusions.xpathAssetsNotCoveredbyRiskModelDropdown);

      // Verify "Exclude to Stock Specific Effect" is selected
      ThiefHelpers.verifySelectedDropDownText('Exclude to Stock Specific Effect', undefined,
        TileOptionsExclusions.xpathAssetsNotCoveredbyRiskModelDropdown);
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Risk Attribution Detail Chart');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Risk Attribution Detail Chart');

    var flag = 0;
    arrSecurities.forEach(function(element) {
      it('Verifying if "' + element + '" security is present in the calculated report', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Risk Attribution Detail Chart', '', '').then(function(rowValues) {
          if (rowValues.indexOf(element) < 0) {
            flag = flag + 1;
            expect(false).customError('"' + element + '" Security is not present in the calculated report');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    arrSecurities.forEach(function(securityName) {
      it('Verify that "' + securityName + '" value for column "Risk Transaction Effect" contains "--"', function() {
        SlickGridFunctions.getCellReference('Risk Attribution Detail Chart', securityName, '', 'Risk Transaction Effect').then(function(reference) {
          reference.getText().then(function(value) {
            if (value !== '--') {
              flag = flag + 1;
              expect(false).customError('"Risk Transaction Effect" column doesnot contain "--" for "' + securityName + '" row');
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

    arrSecurities.forEach(function(securityName) {
      it('Verify that "' + securityName + '"  for "Market > Compounded Factor Impact" column contains "--"', function() {
        SlickGridFunctions.getRowIndex('Risk Attribution Detail Chart', securityName, '').then(function(rowIndex) {
          var colIndex = arrColIndices.length;
          browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
            '.grid.getCellNode( arguments[0], arguments[1] )', rowIndex, colIndex).then(function(value) {
            value.getText().then(function(cellValue) {
              if (cellValue !== '--') {
                flag = flag + 1;
                expect(false).customError('"' + securityName + '" row doesnot contain "--" , Found : ' + cellValue);
                if (flag === 1) {
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          });
        });
      });
    });

    var arrRows = ['Siemens AG', 'Toyota Motor Corp.',];
    arrRows.forEach(function(securityName) {
      it('Verify that "' + securityName + '"  for all "Compounded Factor Impact" columns contains "--"', function() {
        SlickGridFunctions.getRowIndex('Risk Attribution Detail Chart', securityName, '').then(function(rowIndex) {
          arrCompundedFactor.forEach(function(colIndex) {
            browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
              '.grid.getCellNode( arguments[0], arguments[1] )', rowIndex, colIndex).then(function(value) {
              value.getText().then(function(cellValue) {
                if (cellValue !== '--') {
                  flag = flag + 1;
                  expect(false).customError('"' + securityName + '" row doesnot contain "--" , Found : ' + cellValue);
                  if (flag === 1) {
                    CommonFunctions.takeScreenShot();
                  }
                }
              });
            });
          });
        });
      });
    });

    arrRows.forEach(function(securityName) {
      it('Verify that "' + securityName + '"  for "Risk Factors Effect" columns contains "--"', function() {
        SlickGridFunctions.getCellReference('Risk Attribution Detail Chart', securityName, '', 'Risk Factors Effect').then(function(value) {
          value.getText().then(function(cellValue) {
            if (cellValue !== '--') {
              flag = flag + 1;
              expect(false).customError('"' + securityName + '" row doesnot contain "--" , Found : ' + cellValue);
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 691661', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Risk Attribution Detail Chart', 'Exclusions');

    it('Verifying if "Exclude to Stock Specific Effect" is selected in "Asset not covered by the risk model" dropdown', function() {
      ThiefHelpers.verifySelectedDropDownText('Exclude to Stock Specific Effect', undefined, TileOptionsExclusions.xpathAssetsNotCoveredbyRiskModelDropdown);
    });

    it('Should change "Asset not covered by the risk model" dropdown value from "Include in Report" to ' +
      '"Exclude to Transaction Effect"', function() {
      ThiefHelpers.selectOptionFromDropDown('Exclude to Transaction Effect', undefined,
        TileOptionsExclusions.xpathAssetsNotCoveredbyRiskModelDropdown);

      // Verify "Exclude to Transaction Effect" is selected
      ThiefHelpers.verifySelectedDropDownText('Exclude to Transaction Effect', undefined,
        TileOptionsExclusions.xpathAssetsNotCoveredbyRiskModelDropdown);
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Risk Attribution Detail Chart');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Risk Attribution Detail Chart');

    var flag = 0;
    arrSecurities.forEach(function(element) {
      it('Verifying if "' + element + '" security is present in the calculated report', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Risk Attribution Detail Chart', '', '').then(function(rowValues) {
          if (rowValues.indexOf(element) < 0) {
            flag = flag + 1;
            expect(false).customError('"' + element + '" Security is not present in the calculated report');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    arrSecurities.forEach(function(securityName) {
      it('Verify that "' + securityName + '"  for "Market > Compounded Factor Impact" column contains "--"', function() {
        SlickGridFunctions.getRowIndex('Risk Attribution Detail Chart', securityName, '').then(function(rowIndex) {
          var colIndex = arrColIndices.length;
          browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
            '.grid.getCellNode( arguments[0], arguments[1] )', rowIndex, colIndex).then(function(value) {
            value.getText().then(function(cellValue) {
              if (cellValue !== '--') {
                flag = flag + 1;
                expect(false).customError('"' + securityName + '" row doesnot contain "--" , Found : ' + cellValue);
                if (flag === 1) {
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          });
        });
      });
    });

    var arrRows = ['FactSet Research Systems Inc.', 'General Electric Company', 'International Business '];
    arrRows.forEach(function(securityName) {
      it('Verify that "' + securityName + '" row contins value for all columns except columns ' +
        '"Market > Compounded Factor Impact"', function() {
        arrColIndices.forEach(function(colIndex) {
          if (colIndex !== arrColIndices.length) {
            browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
              '.grid.getCellNode( arguments[0], arguments[1] )', 0, colIndex).then(function(val) {
              val.getText().then(function(cellValue) {
                if (cellValue === '' || cellValue === null || cellValue === '--') {
                  flag = flag + 1;
                  expect(false).customError('"' + securityName + '" doesnot contain a value for columnIndex "' + colIndex + '", found :' + cellValue);
                  if (flag === 1) {
                    CommonFunctions.takeScreenShot();
                  }
                }
              });
            });
          }
        });
      });
    });

    var arrRowNames = ['Siemens AG', 'Toyota Motor Corp.',];
    var arrCols = ['Risk Factors Effect', 'Risk Stock Specific Effect', 'Risk Total Effect'];
    arrRowNames.forEach(function(securityName) {
      it('Verify that "' + securityName + '" contains "--" for all "Compounded Factor Impact" columns', function() {
        SlickGridFunctions.getRowIndex('Risk Attribution Detail Chart', securityName, '').then(function(rowIndex) {
          arrCompundedFactor.forEach(function(colIndex) {
            browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
              '.grid.getCellNode( arguments[0], arguments[1] )', rowIndex, colIndex).then(function(value) {
              value.getText().then(function(cellValue) {
                if (cellValue !== '--') {
                  flag = flag + 1;
                  expect(false).customError('"' + securityName + '" row doesnot contain "--" , Found : ' + cellValue);
                  if (flag === 1) {
                    CommonFunctions.takeScreenShot();
                  }
                }
              });
            });
          });
        });
      });
    });

    arrRowNames.forEach(function(securityName) {
      arrCols.forEach(function(colName) {
        it('Verify that "' + securityName + '" contains "--" for  "' + colName + '" column', function() {
          SlickGridFunctions.getCellReference('Risk Attribution Detail Chart', securityName, '', colName).then(function(reference) {
            reference.getText().then(function(value) {
              if (value !== '--') {
                flag = flag + 1;
                expect(false).customError('"' + securityName + '" row doesnot contain "--" , Found : ' + value);
                if (flag === 1) {
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          });
        });
      });
    });
  });

});
