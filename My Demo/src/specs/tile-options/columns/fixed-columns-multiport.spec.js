'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: fixed-columns-multiport', function() {

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  var reportArray = ['Weights', 'Multi-stat', 'Reference Columns', 'Multi-group'];
  var headerArray = ['', '30-DEC-2016'];

  var getAllGroupIndexsFromGivenReport = function(reportName) {
    var groupIndex = [];
    return SlickGridFunctions.getAllRowsFromReport(reportName).then(function(dataView) {
      dataView.forEach(function(rowRef) {
        if (rowRef.metadata.type === 'group') {
          groupIndex.push(rowRef.id);
        }
      });
    }).then(function() {
      return groupIndex;
    });
  };

  //if bool = 0 verification for fixed columns else bool = 1
  var checkGroupLevelAndTotalLevelValuesForFixedAndNotFixed = function(reportName, totalAndGroupingRowIndex, rowColName, arrayOfColumnIndexes, fixedOrNonFixedHeaderIndex) {
    var flag = 0;
    SlickGridFunctions.getRowData(reportName, totalAndGroupingRowIndex, rowColName).then(function(rowData) {
      if (fixedOrNonFixedHeaderIndex === 0) {
        // Fixed Column
        arrayOfColumnIndexes.forEach(function(colIndex) {
          // Excluding First column
          if (colIndex > 0) {
            if (rowData[colIndex] !== '' && rowData[colIndex] !== '--') {
              flag = 1;
              expect(false).customError('Cell value for ' + rowData[0] + ' row at ' + (colIndex + 1) + '" column index is displayed, Found: ' + rowData[colIndex]);
            }
          }
        });
      } else {
        // Non Fixed columns
        arrayOfColumnIndexes.forEach(function(colIndex) {
          if (isNaN(parseFloat(rowData[colIndex])) && rowData[colIndex] !== '--' && rowData[colIndex] != '') {
            flag = 1;
            expect(false).customError('Cell value for ' + rowData[0] + ' row at ' + (colIndex + 1) + '" column index is not as expected, Found: ' + rowData[colIndex]);
          }
        });
      }
    });

    if (flag === 1) {
      CommonFunctions.takeScreenShot();
    }
  };

  describe('Test Step ID: 816679', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    //In the Open document dialog, select Client:/PA3/Fixed Columns w Updated Merging Logic (Stats). Click on Open.
    it('Should launch the PA3 application with "Client:/PA3/Fixed Columns w Updated Merging Logic (Stats)"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('fixed-columns-w-updated-merging-logic-(stats)');
    });

    it('Should verify that document loads with "Weights", "Multi-stat", "Reference Columns" and "Multi-group" tiles', function() {
      PA3MainPage.getAllTilesFromReport().then(function(tileArray) {
        tileArray.forEach(function(tileRef, index) {
          tileRef.getText().then(function(text) {
            if (text !== reportArray[index]) {
              expect(false).customError('"' + text + '" tile is not displayed');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

  });

  describe('Test Step ID: 816680', function() {

    // Click on "Wrench" icon and select "options" from the "wrench" menu and navigate to "Columns" in LHP
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Columns');

    it('Should verify if "Port. Ending Weight" item is present under "Fixed Column" in selected section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Fixed Columns');
      var flag = 0;
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getChildrenText().then(function(children) {
            children.forEach(function(value) {
              if (value.text === 'Port. Ending Weight') {
                flag = 1;
              }
            });
            if (flag === 0) {
              expect(false).customError('"Port. Ending Weight" is not available under "Fixed Column"');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Fixed Columns" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Port. Ending Weight" item in selected section, present under "Fixed Column"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Fixed Columns');
      group.getItemByText('Port. Ending Weight').then(function(item) {
        item.select();

        item.isSelected().then(function(bool) {
          if (!bool) {
            expect(false).customError('"Port. Ending Weight" is not selected from "Selected" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on "Statistics" accordion', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Statistics').then(function(expandStatus) {
        if (!expandStatus) {
          expect(expandStatus).customError('"Statistics" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });

      //verify if "Statistics" accordion is expanded
      TileOptionsColumns.getExpandableElement('Statistics').getAttribute('class').then(function(status) {
        if (status.indexOf('collapsed') > 0) {
          expect(false).customError('"Statistics" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify that "Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox is displayed and is checked', function() {

      //verifying if "Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox is displayed
      ThiefHelpers.isPresent('Checkbox', 'Apply Statistics to Fixed Columns in Multi-Portfolio Mode').then(function(found) {
        if (!found) {
          expect(false).customError('"Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox is not present');
          CommonFunctions.takeScreenShot();
        }
      });

      ThiefHelpers.getCheckBoxClassReference('Apply Statistics to Fixed Columns in Multi-Portfolio Mode').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox is not checked.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 816681', function() {

    it('Should verify if "Market Capitalization" item is present under "Fixed Column" in selected section for three times', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Fixed Columns');
      var flag = 0;
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getChildrenText().then(function(children) {
            children.forEach(function(value) {
              if (value.text === 'Market Capitalization') {
                flag += 1;
              }
            });
            if (flag < 3) {
              expect(false).customError('"Market Capitalization" is not available under "Fixed Column"');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Fixed Columns" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var array = ['first', 'second', 'last'];

    array.forEach(function(value, index) {

      it('Should click on "' + value + '" "Market Capitalization" item in selected section', function() {
        var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Fixed Columns');

        group.isExpanded().then(function(expanded) {
          if (expanded) {
            ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfSelectedSection, 'Fixed Columns', 'Market Capitalization', index + 1).then(function(indexOfElement) {
              var item = group.getItemByIndex(indexOfElement);
              item.then(function(listItem) {
                listItem.select();
              });
            });

            //verifying if Market Capitalization is selected
            ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfSelectedSection, 'Fixed Columns', 'Market Capitalization', index + 1).then(function(indexOfElement) {
              var item = group.getItemByIndex(indexOfElement);
              item.then(function(listItem) {
                listItem.isSelected().then(function(selected) {
                  if (!selected) {
                    expect(false).customError('"Port. Ending Weight" is not selected');
                    CommonFunctions.takeScreenShot();
                  }
                });
              });
            });

          } else {
            expect(false).customError('"Fixed Columns" is not expanded');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Should verify that "Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox is displayed and is checked', function() {

        //verifying if "Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox is displayed
        ThiefHelpers.isPresent('Checkbox', 'Apply Statistics to Fixed Columns in Multi-Portfolio Mode').then(function(found) {
          if (!found) {
            expect(false).customError('"Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox is not present');
            CommonFunctions.takeScreenShot();
          }
        });

        ThiefHelpers.getCheckBoxClassReference('Apply Statistics to Fixed Columns in Multi-Portfolio Mode').isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('"Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox is not checked.');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 816682', function() {

    var array = ['Port. Ending Weight', 'Market Capitalization'];
    array.forEach(function(value) {

      it('Should select "' + value + '" from "Selected" section ', function() {
        ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(value).select();

        // Verify if 'Port. Ending Weight' is selected
        ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(value).isSelected().then(function(seleted) {
          if (!seleted) {
            expect(false).customError('"' + value + '" is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Should verify if "Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox is not displayed', function() {

        //verifying if "Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox is displayed
        ThiefHelpers.isPresent('Checkbox', 'Apply Statistics to Fixed Columns in Multi-Portfolio Mode').then(function(found) {
          if (found) {
            expect(false).customError('"Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox is displayed');
            CommonFunctions.takeScreenShot();
          }
        });

      });

    });

  });

  describe('Test Step ID: 816683', function() {

    it('Should click on "Port. Ending Weight" item in selected section, present under "Fixed Column"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Fixed Columns');
      group.getItemByText('Port. Ending Weight').then(function(item) {
        item.select();
      });

      //verify if selected
      group.getItemByText('Port. Ending Weight').then(function(item) {
        item.isSelected().then(function(bool) {
          if (!bool) {
            expect(false).customError('"Port. Ending Weight" is not selected from "Selected" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on "Statistics" accordion', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Statistics').then(function(expandStatus) {
        if (!expandStatus) {
          expect(expandStatus).customError('"Statistics" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });

      TileOptionsColumns.getExpandableElement('Statistics').getAttribute('class').then(function(status) {
        if (status.indexOf('collapsed') > 0) {
          expect(false).customError('"Statistics" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should un-check "Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox ', function() {
      //verifying if "Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox is displayed
      ThiefHelpers.isPresent('Checkbox', 'Apply Statistics to Fixed Columns in Multi-Portfolio Mode').then(function(found) {
        if (!found) {
          expect(false).customError('"Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox is not present');
          CommonFunctions.takeScreenShot();
        }
      });

      ThiefHelpers.setCheckBox('Apply Statistics to Fixed Columns in Multi-Portfolio Mode', undefined, false);
    });

    var array = ['first', 'second', 'last'];
    array.forEach(function(value, index) {

      it('Should click on "' + value + '" "Market Capitalization" item in selected section', function() {

        var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Fixed Columns');

        group.isExpanded().then(function(expanded) {
          if (expanded) {
            ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfSelectedSection, 'Fixed Columns', 'Market Capitalization', index + 1).then(function(indexOfElement) {
              var item = group.getItemByIndex(indexOfElement);
              item.then(function(listItem) {
                listItem.select();
              });
            });

            //verifying if Market Capitalization is selected
            ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfSelectedSection, 'Fixed Columns', 'Market Capitalization', index + 1).then(function(indexOfElement) {
              var item = group.getItemByIndex(indexOfElement);
              item.then(function(listItem) {
                listItem.isSelected().then(function(selected) {
                  if (!selected) {
                    expect(false).customError('"Port. Ending Weight" is not selected');
                    CommonFunctions.takeScreenShot();
                  }
                });
              });
            });

          } else {
            expect(false).customError('"Fixed Columns" is not expanded');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Should verify that "Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox is displayed and is unchecked', function() {

        var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathStatisticsCheckbox, 'Apply Statistics to Fixed Columns in Multi-Portfolio Mode');

        //verifying if "Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox is displayed
        ThiefHelpers.isPresent('Checkbox', 'Apply Statistics to Fixed Columns in Multi-Portfolio Mode').then(function(found) {
          if (!found) {
            expect(false).customError('"Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox is not present');
            CommonFunctions.takeScreenShot();
          }
        });

        ThiefHelpers.getCheckBoxClassReference('Apply Statistics to Fixed Columns in Multi-Portfolio Mode').isChecked().then(function(checked) {
          if (checked) {
            expect(false).customError('"Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox is not checked.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 816684', function() {

    var indexArrayOfTotalAndGroupingLevelRows = [];

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should click on the "Refresh" icon from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    it('Should get Total level row indexs for future verification', function() {
      SlickGridFunctions.getRowIndex('Weights', 'Total', '').then(function(index) {
        indexArrayOfTotalAndGroupingLevelRows.push(index);
      });
    });

    it('Should get Group level row indexs for future verification', function() {
      getAllGroupIndexsFromGivenReport('Weights').then(function(indexArray) {
        indexArray.forEach(function(groupIndex) {
          indexArrayOfTotalAndGroupingLevelRows.push(groupIndex);
        });
      });
    });

    it('Should verify if Fixed data for groups and total are not displayed and for Non-fixed columns values may or may not not displayed', function() {
      headerArray.forEach(function(multiHeader, fixedOrNonFixedHeaderIndex) {
        PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', multiHeader).then(function(range) {
          indexArrayOfTotalAndGroupingLevelRows.forEach(function(totalOrGroupIndex) {
            checkGroupLevelAndTotalLevelValuesForFixedAndNotFixed('Weights', totalOrGroupIndex, '', range, fixedOrNonFixedHeaderIndex);
          });
        });
      });
    });
  });

  describe('Test Step ID: 816685', function() {

    var groupArray = ['Geometric Average', 'Weight', 'Weighted Average'];
    var indexArrayOfTotalAndGroupingLevelRows = [];

    // Click on "Wrench" icon and select "options" from the "wrench" menu and navigate to "Columns" in LHP
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Multi-stat', 'Columns');

    it('Should verify if "Port. Ending Weight" item is present under "Fixed Column" in selected section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Fixed Columns');
      var flag = 0;
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getChildrenText().then(function(children) {
            children.forEach(function(value) {
              if (value.text === 'Port. Ending Weight') {
                flag = 1;
              }
            });
            if (flag === 0) {
              expect(false).customError('"Port. Ending Weight" is not available under "Fixed Column"');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Fixed Columns" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Port. Ending Weight" item in selected section, present under "Fixed Column"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Fixed Columns');
      group.getItemByText('Port. Ending Weight').then(function(item) {
        item.select();

        item.isSelected().then(function(bool) {
          if (!bool) {
            expect(false).customError('"Port. Ending Weight" is not selected from "Selected" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should click on "Statistics" accordion', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Statistics').then(function(expandStatus) {
        if (!expandStatus) {
          expect(expandStatus).customError('"Statistics" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });

      //verify if "Statistics" accordion is expanded
      TileOptionsColumns.getExpandableElement('Statistics').getAttribute('class').then(function(status) {
        if (status.indexOf('collapsed') > 0) {
          expect(false).customError('"Statistics" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should uncheck "Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox ', function() {

      //verifying if "Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox is displayed
      ThiefHelpers.isPresent('Checkbox', 'Apply Statistics to Fixed Columns in Multi-Portfolio Mode').then(function(found) {
        if (!found) {
          expect(false).customError('"Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox is not present');
          CommonFunctions.takeScreenShot();
        }
      });

      ThiefHelpers.setCheckBox('Apply Statistics to Fixed Columns in Multi-Portfolio Mode', undefined, false);
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Multi-stat');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Multi-stat');

    it('Should click on the "Refresh" icon from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    it('Should get Total level row indexs for future verification', function() {
      groupArray.forEach(function(value) {
        SlickGridFunctions.getRowIndex('Multi-stat', value, '').then(function(rowindex) {
          indexArrayOfTotalAndGroupingLevelRows.push(rowindex);
        });
      });
    });

    it('Should get Group level row indexs for future verification', function() {
      getAllGroupIndexsFromGivenReport('Multi-stat').then(function(indexArray) {
        indexArray.forEach(function(groupIndex) {
          indexArrayOfTotalAndGroupingLevelRows.push(groupIndex);
        });
      });
    });

    it('Should verify if Fixed data for groups and total are not displayed and for Non-fixed columns values may or may not not displayed', function() {
      headerArray.forEach(function(multiHeader, fixedOrNonFixedHeaderIndex) {
        PA3MainPage.getColumnNumberRangeForMultiHeader('Multi-stat', multiHeader).then(function(range) {
          indexArrayOfTotalAndGroupingLevelRows.forEach(function(totalOrGroupIndex) {
            checkGroupLevelAndTotalLevelValuesForFixedAndNotFixed('Multi-stat', totalOrGroupIndex, '', range, fixedOrNonFixedHeaderIndex);
          });
        });
      });
    });

  });

  describe('Test Step ID: 816686', function() {

    var indexArrayOfTotalAndGroupingLevelRows = [];

    // Click on "Wrench" icon and select "options" from the "wrench" menu and navigate to "Columns" in LHP
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Reference Columns', 'Columns');

    it('Should verify if "COL1" item is present under "Fixed Column" in selected section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Fixed Columns');
      var flag = 0;
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getChildrenText().then(function(children) {
            children.forEach(function(value) {
              if (value.text === 'COL1') {
                flag = 1;
              }
            });
            if (flag === 0) {
              expect(false).customError('"COL1" is not available under "Fixed Column"');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Fixed Columns" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "COL1" item in selected section, present under "Fixed Column"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Fixed Columns');
      group.getItemByText('COL1').then(function(item) {
        item.select();
      });

      //verify if selected
      group.getItemByText('COL1').then(function(item) {
        item.isSelected().then(function(bool) {
          if (!bool) {
            expect(false).customError('"COL1" is not selected from "Selected" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on "Statistics" accordion', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Statistics').then(function(expandStatus) {
        if (!expandStatus) {
          expect(expandStatus).customError('"Statistics" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });

      TileOptionsColumns.getExpandableElement('Statistics').getAttribute('class').then(function(status) {
        if (status.indexOf('collapsed') > 0) {
          expect(false).customError('"Statistics" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should uncheck "Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox ', function() {

      //verifying if "Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox is displayed
      ThiefHelpers.isPresent('Checkbox', 'Apply Statistics to Fixed Columns in Multi-Portfolio Mode').then(function(found) {
        if (!found) {
          expect(false).customError('"Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox is not present');
          CommonFunctions.takeScreenShot();
        }
      });

      ThiefHelpers.setCheckBox('Apply Statistics to Fixed Columns in Multi-Portfolio Mode', undefined, false);
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Reference Columns');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Reference Columns');

    it('Should click on the "Refresh" icon from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    it('Should get Total level row indexs for future verification', function() {
      SlickGridFunctions.getRowIndex('Reference Columns', 'Total', '').then(function(index) {
        indexArrayOfTotalAndGroupingLevelRows.push(index);
      });
    });

    it('Should get Group level row indexs for future verification', function() {
      getAllGroupIndexsFromGivenReport('Reference Columns').then(function(indexArray) {
        indexArray.forEach(function(groupIndex) {
          indexArrayOfTotalAndGroupingLevelRows.push(groupIndex);
        });
      });
    });

    it('Should verify if Fixed data for groups and total are not displayed and for Non-fixed columns values may or may not not displayed', function() {
      headerArray.forEach(function(multiHeader, fixedOrNonFixedHeaderIndex) {
        PA3MainPage.getColumnNumberRangeForMultiHeader('Reference Columns', multiHeader).then(function(range) {
          indexArrayOfTotalAndGroupingLevelRows.forEach(function(totalOrGroupIndex) {
            checkGroupLevelAndTotalLevelValuesForFixedAndNotFixed('Reference Columns', totalOrGroupIndex, '', range, fixedOrNonFixedHeaderIndex);
          });
        });
      });
    });

  });

  describe('Test Step ID: 816687', function() {

    var indexArrayOfTotalAndGroupingLevelRows = [];

    // Click on "Wrench" icon and select "options" from the "wrench" menu and navigate to "Columns" in LHP
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Multi-group', 'Columns');

    it('Should verify if "Port. Ending Weight" item is present under "Fixed Column" in selected section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Fixed Columns');
      var flag = 0;
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getChildrenText().then(function(children) {
            children.forEach(function(value) {
              if (value.text === 'Port. Ending Weight') {
                flag = 1;
              }
            });
            if (flag === 0) {
              expect(false).customError('"Port. Ending Weight" is not available under "Fixed Column"');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Fixed Columns" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Port. Ending Weight" item in selected section, present under "Fixed Column"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Fixed Columns');
      group.getItemByText('Port. Ending Weight').then(function(item) {
        item.select();
      });

      //verify if selected
      group.getItemByText('Port. Ending Weight').then(function(item) {
        item.isSelected().then(function(bool) {
          if (!bool) {
            expect(false).customError('"Port. Ending Weight" is not selected from "Selected" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on "Statistics" accordion', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Statistics').then(function(expandStatus) {
        if (!expandStatus) {
          expect(expandStatus).customError('"Statistics" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });

      TileOptionsColumns.getExpandableElement('Statistics').getAttribute('class').then(function(status) {
        if (status.indexOf('collapsed') > 0) {
          expect(false).customError('"Statistics" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should uncheck "Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox ', function() {

      //verifying if "Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox is displayed
      ThiefHelpers.isPresent('Checkbox', 'Apply Statistics to Fixed Columns in Multi-Portfolio Mode').then(function(found) {
        if (!found) {
          expect(false).customError('"Apply Statistics to Fixed Columns in Multi-Portfolio Mode" checkbox is not present');
          CommonFunctions.takeScreenShot();
        }
      });

      ThiefHelpers.setCheckBox('Apply Statistics to Fixed Columns in Multi-Portfolio Mode', undefined, false);
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Multi-group');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Multi-group');

    it('Should click on the "Refresh" icon from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    it('Should get Total level row indexs for future verification', function() {
      SlickGridFunctions.getRowIndex('Multi-group', 'Total', '').then(function(index) {
        indexArrayOfTotalAndGroupingLevelRows.push(index);
      });
    });

    it('Should get Group level row indexs for future verification', function() {
      getAllGroupIndexsFromGivenReport('Multi-group').then(function(indexArray) {
        indexArray.forEach(function(groupIndex) {
          indexArrayOfTotalAndGroupingLevelRows.push(groupIndex);
        });
      });
    });

    it('Should verify if Fixed data for groups and total are not displayed and for Non-fixed columns values may or may not not displayed', function() {
      headerArray.forEach(function(multiHeader, fixedOrNonFixedHeaderIndex) {
        PA3MainPage.getColumnNumberRangeForMultiHeader('Multi-group', multiHeader).then(function(range) {
          indexArrayOfTotalAndGroupingLevelRows.forEach(function(totalOrGroupIndex) {
            checkGroupLevelAndTotalLevelValuesForFixedAndNotFixed('Multi-group', totalOrGroupIndex, '', range, fixedOrNonFixedHeaderIndex);
          });
        });
      });
    });

  });
});
