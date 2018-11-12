'use strict';
/*global XPathResult:true*/
require(__dirname + '/../../../index.js');

describe('Test Case: mac-hist-sim', function() {

  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  // As already existing function in slickGrid Functions requires column name.
  var getCellValue = function(tileName, rowName, rowColumnName, colIndex) {

    var defer = protractor.promise.defer();
    var promise = defer.promise;
    var rowIndex;

    // Get Row index
    SlickGridFunctions.getRowIndex(tileName, rowName, rowColumnName).then(function(index) {
      rowIndex = index;
    }).then(function() {
      // Xpath of Slick-Grid for given "tileName"
      var xpathTile = SlickGridFunctions.getGridXpath(tileName);
      var options = {
        gridXpath: xpathTile,
        rowIndex: rowIndex,
        columnIndex: colIndex,
      };

      return options;
    }).then(function(options) {
      return browser.executeScript(function(options) {
        var gridXpath = options.gridXpath;
        var grid = angular.element(document.evaluate(gridXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
          .singleNodeValue).controller('tfSlickGrid').grid;

        // Scroll cell into view before collecting its reference
        grid.scrollCellIntoView(options.rowIndex, options.columnIndex);

        var cellReference = grid.getCellNode(options.rowIndex, options.columnIndex);

        return cellReference;
      }, options);
    }).then(function(cellReference) {
      defer.fulfill(cellReference.getText());
    });

    return promise;

  };

  describe('Test Step ID: 695733', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Risk/historical_simulation"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('historical-simulation');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    // Verify the option from the lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Weights', 'Exposure Report', undefined, 'isSelected');

    it('Verifying that report is grouped by "Asset Class"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(name) {
        if (name !== 'Asset Class') {
          expect(false).customError('The report is Expected to grouped by: "Asset Class" but Found: "' + name + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 698376', function() {

    // Select Columns from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Columns');
    var items = ['Hist Sim % Value at Risk #VD #VT Day, #VC% #VA', 'Hist Sim % Benchmark Value at Risk #VD #VT Day, #VC% #VA'];
    var group;

    it('Should expand "FactSet >  Historical Simulation Risk > Portfolio Absolute Risk > Percent Statistics > Value at Risk" from the available section and Select' + items[0] + ' ', function() {
      group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Historical Simulation Risk').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Portfolio Absolute Risk').then(function(subGroup1) {
                  subGroup1.expand();
                  subGroup1.isExpanded().then(function(expanded) {
                    if (expanded) {
                      subGroup1.getGroupByText('Percent Statistics').then(function(subGroup2) {
                        subGroup2.expand();
                        subGroup2.isExpanded().then(function(expanded) {
                            if (expanded) {
                              subGroup2.getGroupByText('Value at Risk').then(function(subGroup3) {
                                subGroup3.expand();
                                subGroup3.isExpanded().then(function(expanded) {
                                  if (expanded) {
                                    subGroup3.getItemByIndex(items[0]).then(function(item) {
                                      item.select();

                                      // Verifying if the item is selected
                                      item.isSelected().then(function(selected) {
                                        if (!selected) {
                                          expect(false).customError(items[0] + ' is not selected');
                                          CommonFunctions.takeScreenShot();
                                        }
                                      });
                                    });

                                  } else {
                                    expect(false).customError('"Value at Risk" is not expanded');
                                    CommonFunctions.takeScreenShot();
                                  }
                                });
                              });
                            } else {
                              expect(false).customError('"Percent Statistics" is not expanded');
                              CommonFunctions.takeScreenShot();
                            }
                          }
                        );
                      });
                    } else {
                      expect(false).customError('"Portfolio Absolute Risk" is not expanded');
                      CommonFunctions.takeScreenShot();
                    }
                  });
                });
              } else {
                expect(false).customError('"Historical Simulation Risk" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"FactSet" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the Right Arrow to add ' + items[0] + ' into Selected Section', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Should expand "FactSet > Historical Simulation Risk > Benchmark Absolute Risk > Percent Statistics > Value at Risk" from the available section and Select' + items[1] + ' ', function() {
      group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Historical Simulation Risk').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Benchmark Absolute Risk').then(function(subGroup1) {
                  subGroup1.expand();
                  subGroup1.isExpanded().then(function(expanded) {
                    if (expanded) {
                      subGroup1.getGroupByText('Percent Statistics').then(function(subGroup2) {
                        subGroup2.expand();
                        subGroup2.isExpanded().then(function(expanded) {
                          if (expanded) {
                            subGroup2.getGroupByText('Value at Risk').then(function(subGroup3) {
                              subGroup3.expand();
                              subGroup3.isExpanded().then(function(expanded) {
                                if (expanded) {
                                  subGroup3.getItemByIndex(items[1]).then(function(item) {
                                    item.select();

                                    // Verifying if the item is selected
                                    item.isSelected().then(function(selected) {
                                      if (!selected) {
                                        expect(false).customError(items[1] + ' is not selected');
                                        CommonFunctions.takeScreenShot();
                                      }
                                    });
                                  });

                                } else {
                                  expect(false).customError('"Value at Risk" is not expanded');
                                  CommonFunctions.takeScreenShot();
                                }
                              });
                            });
                          } else {
                            expect(false).customError('"Percent Statistics" is not expanded');
                            CommonFunctions.takeScreenShot();
                          }
                        });
                      });
                    } else {
                      expect(false).customError('"Benchmark Absolute Risk" is not expanded');
                      CommonFunctions.takeScreenShot();
                    }
                  });
                });
              } else {
                expect(false).customError('"Historical Simulation Risk" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"FactSet" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the Right Arrow to add ' + items[1] + ' into Selected Section', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying if ' + items[0] + ' and ' + items[1] + ' are in the selected section', function() {
      items.forEach(function(item) {
        CommonPageObjectsForPA3.verifyIfElementIsPresentInSelectedSection(item, xpathOfSelectedSection);
      });
    });
  });

  describe('Test Step ID: 695734', function() {

    it('Should select "Hist Sim % Value at Risk #VD #VT Day, #VC% #VA" from the selected section', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Hist Sim % Value at Risk #VD #VT Day, #VC% #VA');
      item.select();

      // Verifying if "Hist Sim % Value at Risk #VD #VT Day, #VC% #VA" is selected in the selcted section
      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Hist Sim % Value at Risk #VD #VT Day, #VC% #VA" is not selected from "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if Header displays "Hist Sim % Value at Risk #VD #VT Day, #VC% #VA" in "Format" accordion', function() {
      TileOptionsColumns.getFormatHeader().getAttribute('value').then(function(val) {
        val = val.replace(/\n/g, ' ');
        if (val !== 'Hist Sim % Value at Risk #VD #VT Day, #VC% #VA') {
          expect(false).customError('Header is not displaying "Hist Sim % Value at Risk #VD #VT Day, #VC% #VA" in "Format" accordion; Found: ' + val);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 695735', function() {

    it('Should select "Hist Sim % Benchmark Value at Risk #VD #VT Day, #VC% #VA" from the selected section', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Hist Sim % Benchmark Value at Risk #VD #VT Day, #VC% #VA');
      item.select();

      // Verifying if "Hist Sim % Benchmark Value at Risk #VD #VT Day, #VC% #VA" is selected in the selcted section
      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Hist Sim % Benchmark Value at Risk #VD #VT Day, #VC% #VA" is not selected from "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if Header displays "Hist Sim % Benchmark Value at Risk #VD #VT Day, #VC% #VA" in "Format" accordion', function() {
      TileOptionsColumns.getFormatHeader().getAttribute('value').then(function(val) {
        val = val.replace(/\n/g, ' ');
        if (val !== 'Hist Sim % Benchmark Value at Risk #VD #VT Day, #VC% #VA') {
          expect(false).customError('Header is not displaying "Hist Sim % Benchmark Value at Risk #VD #VT Day, #VC% #VA" in "Format" accordion; Found: ' + val);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 695736', function() {

    it('Should select "Hist Sim % Value at Risk #VD #VT Day, #VC% #VA" from the selected section', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Hist Sim % Value at Risk #VD #VT Day, #VC% #VA');
      item.select();

      // Verifying if "Hist Sim % Value at Risk #VD #VT Day, #VC% #VA" is selected in the selcted section
      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Hist Sim % Value at Risk #VD #VT Day, #VC% #VA" is not selected from "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Risk" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Risk').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Risk" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "99.0000" in the  "VaR Confidence Interval (%)" text box', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathTextBoxFromRiskSection, 'VaR Confidence Interval (%)');
      ThiefHelpers.getTextBoxClassReference(undefined, xpath).setText('99.0000');

      // Verifying if the text box is set as expected.
      ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(text) {
        if (text !== '99.0000') {
          expect(false).customError('"VaR Confidence Interval (%)" text box is not set to "99.0000"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "5" in the "VaR Days" text box', function() {
      ThiefHelpers.getTextBoxClassReference('VaR Days').setText('5');

      // Verifying if the text box is set as expected.
      ThiefHelpers.getTextBoxClassReference('VaR Days').getText().then(function(text) {
        if (text !== '5') {
          expect(false).customError('"VaR Days" text box is not set to "5"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Trading Days" drop down and select "Calendar Days"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsColumns.xpathTradingDaysDropdown).selectItemByText('Calendar Days');
    });

    it('Verifying if "Calendar Days" is selected from the drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Calendar Days', undefined, TileOptionsColumns.xpathTradingDaysDropdown);
    });

    it('Should click on "Historical VaR Start Date" drop down and select "Three Years Ago"', function() {
      var StartDateDropDown = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathHistoricalVaRStartOrEndDateDropDown, 'Start');
      ThiefHelpers.getButtonClassReference(undefined, StartDateDropDown).press();

      // Selecting Three years ago from the drop down
      ThiefHelpers.getOptionFromDropdown('Three Years Ago').click();
    });

    var StartDateTextBox = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathHistoricalVaRStartOrEndDateTextBox, 'Start');

    it('Verifying if "Three Years Ago" is selected from the drop down', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, StartDateTextBox).getText().then(function(text) {
        if (text !== 'Three Years Ago') {
          expect(false).customError('"Three Years Ago" is not set in "Historical VaR Start Date" drop down; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Hist Sim % Benchmark Value at Risk #VD #VT Day, #VC% #VA" from the selected section', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Hist Sim % Benchmark Value at Risk #VD #VT Day, #VC% #VA');
      item.select();

      // Verifying if "Hist Sim % Benchmark Value at Risk #VD #VT Day, #VC% #VA" is selected in the selcted section
      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Hist Sim % Benchmark Value at Risk #VD #VT Day, #VC% #VA" is not selected from "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "VaR Confidence Interval (%)" text box is set as "95.0000"', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathTextBoxFromRiskSection, 'VaR Confidence Interval (%)');
      ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(text) {
        if (text !== '95.0000') {
          expect(false).customError('"VaR Confidence Interval (%)" text box is not set to "95.0000"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "VaR Days" text box is set to 1', function() {
      ThiefHelpers.getTextBoxClassReference('VaR Days').getText().then(function(text) {
        if (text !== '1') {
          expect(false).customError('"VaR Days" text box is not set to "1"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var EndDateTextBox = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathHistoricalVaRStartOrEndDateTextBox, 'End');

    it('Verifying if "Historical VaR Start Date" drop down is set to "Two Years Ago"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, StartDateTextBox).getText().then(function(text) {
        if (text !== 'Two Years Ago') {
          expect(false).customError('"Two Years Ago" is not set in "Historical VaR Start Date" drop down; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Historical VaR End Date" drop down is set to "Report Date"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, EndDateTextBox).getText().then(function(text) {
        if (text !== 'Report Date') {
          expect(false).customError('"Report Date" is not set in "Historical VaR End Date" drop down; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 695737', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var multiheaderarray = ['30-SEP-2016', '31-OCT-2016'];

    var multiheaderarray1 = ['', 'FactSet Multi-Asset Class Model (USD)', 'Axioma US Fundamental Equity Risk Model SH 2'];

    var valueArray = ['100.00', '100.00', '3.64', '0.13', '4.28', '', '100.00', '100.00', '3.70', '0.12', '4.32', ''];

    var valueArray1 = ['100.00', '--', '3.64', '--', '4.28', '', '100.00', '--', '3.70', '--', '4.32', ''];

    var valueArray2 = ['--', '100.00', '--', '0.13', '--', '', '--', '100.00', '--', '0.12', '--', ''];

    multiheaderarray.forEach(function(multiheaderName) {

      multiheaderarray1.forEach(function(multiheader) {

        it('Verifying if the "Total" row values under "' + multiheaderName + '|' + multiheader + '" multiheader are set as expected', function() {
          PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', multiheaderName + '|' + multiheader).then(function(multiheaderRange) {
            multiheaderRange.forEach(function(colrange) {
              getCellValue('Weights', 'Total', '', colrange).then(function(value) {
                if (value !== valueArray[colrange - 2]) {
                  // Test step says difference greater that 0.1 is expected.
                  if (Math.abs(parseFloat(value) - parseFloat(valueArray[colrange - 2])) > 0.1) {
                    expect(false).customError('The "Total" row value under "' + multiheaderName + '|' + multiheader + '" multiheader for the column index "' + colrange + '" is not set as expected.' +
                      ' Expected: "' + valueArray[colrange - 2] + '"; Found: "' + value + '"');
                    CommonFunctions.takeScreenShot();
                  }
                }
              });
            });
          });
        });

        it('Verifying if the "Equity" row values under "' + multiheaderName + '|' + multiheader + '" multiheader are set as expected', function() {
          PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', multiheaderName + '|' + multiheader).then(function(multiheaderRange) {
            multiheaderRange.forEach(function(colrange) {
              getCellValue('Weights', 'Equity', '', colrange).then(function(value) {
                if (value !== valueArray1[colrange - 2]) {
                  // Test step says difference greater that 0.1 is expected.
                  if (Math.abs(parseFloat(value) - parseFloat(valueArray1[colrange - 2])) > 0.1) {
                    expect(false).customError('The "Equity" row value under "' + multiheaderName + '|' + multiheader + '" multiheader for the column index "' + colrange + '" is not set as expected.' +
                      ' Expected: "' + valueArray1[colrange - 2] + '"; Found: "' + value + '"');
                    CommonFunctions.takeScreenShot();
                  }
                }
              });
            });
          });
        });

        it('Verifying if the "Fixed Income" row values under "' + multiheaderName + '|' + multiheader + '" multiheader are set as expected', function() {
          PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', multiheaderName + '|' + multiheader).then(function(multiheaderRange) {
            multiheaderRange.forEach(function(colrange) {
              getCellValue('Weights', 'Fixed Income', '', colrange).then(function(value) {
                if (value !== valueArray2[colrange - 2]) {
                  // Test step says difference greater that 0.1 is expected.
                  if (Math.abs(parseFloat(value) - parseFloat(valueArray2[colrange - 2])) > 0.1) {
                    expect(false).customError('The "Fixed Income" row value under "' + multiheaderName + '|' + multiheader + '" multiheader for the column index "' + colrange + '" is not set as expected.' +
                      ' Expected: "' + valueArray2[colrange - 2] + '"; Found: "' + value + '"');
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

});
