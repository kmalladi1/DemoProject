'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: cond-frmtg-updwn-cpy-save', function() {

  var portContRet1 = [];
  var portContRet2 = [];
  var portContRet3 = [];
  var portContRet4 = [];
  var portAvgWt1 = [];
  var portAvgWt2 = [];
  var portAvgWt3 = [];

  var tickerArrayForPortAvgWeightColumn = [];
  var tickerArrayForPortAvgWeightColumn1 = [];
  var tickerArrayForPriceChange = [];
  var tickerArrayForPriceChange1 = [];
  var flag;

  var portAvgWeight = [];
  var beginningPrice = [];
  var portTotalReturn = [];
  var portContToReturn = [];

  //local functions
  var reportFormatVerification = function(portAvgWt, begPrice, portTotRtrn, portContToRtrn, groups) {

    var length = portAvgWt.length;
    var flag = 0;

    for (var i = 0; i < length; i++) {
      if ((portAvgWt[i] !== portAvgWeight[i]) || (begPrice[i] !== beginningPrice[i]) || (portTotRtrn[i] !== portTotalReturn[i]) || (portContToRtrn[i] !== portContToReturn[i])) {
        flag = 1;
        expect(false).customError(groups[i] + ' security is displayed with ' + portAvgWt[i] + ',' + begPrice[i] + ',' + portTotRtrn[i] + ',' + portContToRtrn[i] + ' which are expected to be ' + portAvgWeight[i] + ',' + beginningPrice[i] + ',' + portTotalReturn[i] + ',' + portContToReturn[i] + '(previous values)');
      }
    }

    if (flag === 1) {
      CommonFunctions.takeScreenShot();
    }

  };

  var getcolors = function(reportName, rowValue, colName1, colName2, groupsArray) {
    return SlickGridFunctions.getCellReference(reportName, rowValue, colName1, colName2).then(function(cellRef) {
      return cellRef.getText().then(function(value) {
        if (value === '--') {
          return cellRef.getCssValue('color').then(function(color) {
            return color;
          });
        } else if (groupsArray.indexOf(rowValue) === -1) {
          return cellRef.findElement(by.xpath('./div')).getAttribute('style').then(function(color) {
            return color;
          });
        } else {
          return cellRef.getCssValue('color').then(function(color) {
            return color;
          });
        }
      });
    });

  };

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  describe('Test Step ID: 565475', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:/PA3/Formatting/CF-UP-DOWN"', function() {
      PA3MainPage.switchToDocument('cf-up-down');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Sector Weights');

    // Select the "Contribution" option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Contribution', true, 'isSelected');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Verifying if "9/01/2015 - 11/23/2015" date hyperlink is displayed', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(date) {
        if (date !== '9/01/2015 - 11/23/2015') {
          expect(false).customError('"9/01/2015 - 11/23/2015" date hyperlink is not displayed instead "' + date + '" displayed ');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that the "Contribution" report is grouped by "Economic Sector"', function() {
      PA3MainPage.getGroupingsHyperLink('Contribution').getText().then(function(text) {
        if (text !== 'Economic Sector') {
          expect(false).customError('The "Contribution" report is not grouped by "Economic Sector"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 565477', function() {

    var groupsAndSecurity = [];
    var groups = [];

    // Click on "Wrench" icon and select "options" from the "wrench" menu and navigate to "Columns" in LHP
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Columns');

    it('Should verify if "Port. Contribution To Return" item is present in selected section', function() {
      CommonPageObjectsForPA3.verifyIfElementIsPresentInSelectedSection('Port. Contribution To Return', xpathOfSelectedSection);
    });

    it('Should click on "Port. Contribution To Return" item in selected section', function() {
      var Item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Port. Contribution To Return');
      Item.select();
      if (!Item.isSelected()) {
        expect(false).customError('"Port. Contribution To Return" is not selected');
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should click on "CONDITIONAL FORMATTING" accordion', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Conditional Formatting').then(function(expandStatus) {
        if (!expandStatus) {
          expect(expandStatus).customError('"CONDITIONAL FORMATTING" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "CONDITIONAL FORMATTING" accordion is expanded', function() {
      TileOptionsColumns.getExpandableElement('Conditional Formatting').getAttribute('class').then(function(status) {
        if (status.indexOf('collapsed') > 0) {
          expect(false).customError('"CONDITIONAL FORMATTING" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var dropDownNames = ['Type', 'Column'];
    var options = ['Up/Down', 'Price Change (%)'];

    dropDownNames.forEach(function(dropDownName, index) {

      it('Should select "' + options[index] + '" from "' + dropDownName + '" drop down', function() {
        ThiefHelpers.selectOptionFromDropDown(options[index], dropDownName);

        //verify if option is selected from drop down
        ThiefHelpers.verifySelectedDropDownText(options[index], dropDownName);
      });
    });

    var arrCheckbox = ['Group Level', 'Total Level'];

    arrCheckbox.forEach(function(checkbox) {

      it('Should check the "' + checkbox + '" checkbox', function() {
        ThiefHelpers.getCheckBoxClassReference(checkbox, undefined).check();

        //verifying if checkbox is checked
        ThiefHelpers.getCheckBoxClassReference(checkbox, undefined).isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('The checkbox"' + checkbox + '" is not checked');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    // Group and Total Level 'Port. Average Weight' column values not colored.
    it('Should store Group and Total Level\'s', function() {
      groups.push('Total');
      SlickGridFunctions.getAllRowsFromReport('Contribution').then(dataView => {
        dataView.forEach((rowRef) => {
          if (rowRef.expanded) {
            groups.push(rowRef[1]);
          }
        });
      });
    });

    it('Should store "Port. Contribution To Return" format for verification in next step', function() {
      groups.forEach(function(gData) {
        SlickGridFunctions.getCellReference('Contribution', gData, '', 'Port. Contribution To Return').then(function(cellRef) {
          cellRef.getCssValue('color').then(function(color) {
            portContRet1.push(color);
          });
        });
      });
    });

    // Group and Total Level 'Port. Average Weight' column values not colored.
    it('Should store Group and Total Level\'s', function() {
      groups.push('Total');
      SlickGridFunctions.getAllRowsFromReport('Contribution').then(dataView => {
        dataView.forEach((rowRef) => {
          if (rowRef.expanded) {
            groups.push(rowRef[1]);
          }
        });
      });
    });

    it('Should store "Group and Security" column values', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', '').then(function(cellValue) {
        cellValue.forEach(function(ele) {
          groupsAndSecurity.push(ele);
        });
      });
    });

    it('Should verify if "Port. Contribution To Return" font including Group & Total Level is -> "Red" when "Price Change (%)" column values are negative,' +
      '"Green" when "Price Change (%)" column values are positive,' +
      '"NOT colored" when "Price Change (%)" column values are blanks/NAs', function() {
      flag = 0;
      groupsAndSecurity.forEach(function(groupData) {
        SlickGridFunctions.getCellReference('Contribution', groupData, '', 'Price Change (%)').then(function(cellRef) {
          cellRef.getText().then(function(data) {
            if (parseFloat(data) > 0) {
              SlickGridFunctions.getCellReference('Contribution', groupData, '', 'Port. Contribution To Return').then(function(cellRef1) {
                cellRef1.findElement(by.xpath('./div')).getAttribute('style').then(function(color) {

                  //color holds value = color: rgb(51, 153, 0);  rgb(51, 153, 0) -> Green
                  if (color.split(':')[1].split(';')[0].trim() !== 'rgb(51, 153, 0)') {
                    flag = 1;
                    expect(false).customError('For Group - "' + groupData + '", "Port. Contribution To Return" Font color is not as Expected:rgb(51, 153, 0) -> Red, but found: ' + color);
                  }
                });
              });
            } else if (parseFloat(data) < 0) {
              SlickGridFunctions.getCellReference('Contribution', groupData, '', 'Port. Contribution To Return').then(function(cellRef1) {
                cellRef1.findElement(by.xpath('./div')).getAttribute('style').then(function(color) {

                  //color holds value = color: rgb(255, 0, 0);  rgb(255, 0, 0) -> Red
                  if (color.split(':')[1].split(';')[0].trim() !== 'rgb(255, 0, 0)') {
                    flag = 1;
                    expect(false).customError('For Group - "' + groupData + '", "Port. Contribution To Return" Font color is not as Expected: rgb(255, 0, 0) -> Green, but found: ' + color);
                  }
                });
              });
            } else {
              if (groups.indexOf(groupData) === -1) {
                SlickGridFunctions.getCellReference('Contribution', groupData, '', 'Port. Contribution To Return').then(function(cellRef1) {
                  cellRef1.getCssValue('color').then(function(color) {

                    //rgba(0, 0, 0, 1) -> Black
                    if (color != 'rgba(0, 0, 0, 1)') {
                      flag = 1;
                      expect(false).customError('For Group - "' + groupData + '", "Port. Contribution To Return" Font color is not as Expected: rgba(0, 0, 0, 1) -> black ,but found: ' + color);
                    }
                  });
                });
              } else {
                SlickGridFunctions.getCellReference('Contribution', groupData, '', 'Port. Contribution To Return').then(function(cellRef1) {
                  cellRef1.getCssValue('color').then(function(color) {

                    //rgba(0, 51, 102, 1) -> Navy blue
                    if (color != 'rgba(0, 51, 102, 1)') {
                      flag = 1;
                      expect(false).customError('For Group - "' + groupData + '", "Port. Contribution To Return" Font color is not as Expected:rgba(0, 51, 102, 1) -> blue, but found: ' + color);
                    }
                  });
                });
              }
            }
          });
        });
      });
      if (flag === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

  });

  describe('Test Step ID: 565989', function() {

    var groups = [];

    // Click on "Wrench" icon and select "options" from the "wrench" menu and navigate to "Columns" in LHP
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Columns');

    it('Should verify if "Port. Average Weight" item is present in selected section', function() {
      CommonPageObjectsForPA3.verifyIfElementIsPresentInSelectedSection('Port. Average Weight', xpathOfSelectedSection);
    });

    it('Should click on "Port. Average Weight" item in selected section', function() {
      var Item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Port. Average Weight');
      Item.select();

      // Verfying if the item is selected
      if (!Item.isSelected()) {
        expect(false).customError('"Port. Average Weight" is not selected');
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should click on "CONDITIONAL FORMATTING" accordion', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Conditional Formatting').then(function(expandStatus) {
        if (!expandStatus) {
          expect(expandStatus).customError('"CONDITIONAL FORMATTING" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "CONDITIONAL FORMATTING" accordion is expanded', function() {
      TileOptionsColumns.getExpandableElement('Conditional Formatting').getAttribute('class').then(function(status) {
        if (status.indexOf('collapsed') > 0) {
          expect(false).customError('"CONDITIONAL FORMATTING" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var dropDownNames = ['Type', 'Column'];
    var options = ['Up/Down', 'Port. Average Weight'];

    dropDownNames.forEach(function(dropDownName, index) {

      it('Should select "' + options[index] + '" from "' + dropDownName + '" drop down', function() {
        ThiefHelpers.selectOptionFromDropDown(options[index], dropDownName);

        //verify if option is selected from drop down
        ThiefHelpers.verifySelectedDropDownText(options[index], dropDownName);
      });
    });

    it('Should click on "Up" dropdown', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathColorPickerButton, 'Up');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press().then(function() {
      }, function() {
        expect(false).customError('Unable to press "Up" dromdown');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Pink" from the color picker', function() {
      ChartingUtilities.selectColorFrmDD('rgb(255, 77, 166)');

      // Verifying if "Pink" color is selected from drop down
      TileOptionsColumns.getColorPickerButton('Up').getAttribute('style').then(function(value) {
        if (value.indexOf('rgb(255, 77, 166)') < 0) {
          expect(false).customError('The "Up" drop down did not show "Pink" color.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('should click on "Down" dropdown', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathColorPickerButton, 'Down');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press().then(function() {
      }, function() {
        expect(false).customError('Unable to press "Down" dromdown');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Orange" from the color picker', function() {
      ChartingUtilities.selectColorFrmDD('rgb(255, 166, 122)');

      // Verifying if "Orange" color is selected from drop down
      TileOptionsColumns.getColorPickerButton('Down').getAttribute('style').then(function(value) {
        if (value.indexOf('rgb(255, 166, 122)') < 0) {
          expect(false).customError('The "Down" drop down did not show "Orange" color.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Should get "Ticker" for the corresponding "Port. Average Weight" column cells', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker, index) {

          SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Port. Average Weight').then(function(cellRef) {
            cellRef.getText().then(function(cellValue) {
              if (cellValue === '--') {

                // if Port. Average Weight holds 0\'s/blanks/NAs
                tickerArrayForPortAvgWeightColumn.push(ticker);
              } else if (ticker !== '') {
                tickerArrayForPortAvgWeightColumn1.push(ticker);
              }
            });
          });
        });
      });
      SlickGridFunctions.scrollRowToTop('Contribution', 0);
    });

    it('Should verify "Port. Average Weight" font color is Not colored(Black) if it has value "--" ', function() {
      flag = 0;
      tickerArrayForPortAvgWeightColumn.forEach(function(ticker) {

        SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Port. Average Weight', undefined, undefined).then(function(cellRef) {
          cellRef.getCssValue('color').then(function(color) {

            //rgba(0, 0, 0, 1) -> Black
            if (color != 'rgba(0, 0, 0, 1)') {
              flag = 1;
              expect(false).customError('For Ticker: "' + ticker + '" "Port. Average Weight" font color is not as Expected: rgba(0, 0, 0, 1) -> black, but found:' + color);
            }
          });
        });
      });
      if (flag === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should verify that "Port. Average Weight" font color to be pink if it has positive value and ' +
      'orange if value is negative', function() {
      flag = 0;
      tickerArrayForPortAvgWeightColumn1.forEach(function(ticker, index) {

        if (index > 0) {
          SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Port. Average Weight', undefined, undefined).then(function(cellRef) {
            cellRef.getText().then(function(cellValue) {
              if (parseFloat(cellValue) > 0) {
                cellRef.findElement(by.xpath('./div')).getAttribute('style').then(function(val) {

                  //val is holding value - "color: rgb(255, 77, 166);" rgb(255, 77, 166) -> pink
                  if (val.split(':')[1].split(';')[0].trim() !== 'rgb(255, 77, 166)') {
                    flag = 1;
                    expect(false).customError('For Ticker - "' + ticker + '", "Port. Average Weight" Font color is not as Expected, but found: ' + val.split(':')[1].split(';')[0].trim());
                  }
                });
              } else if (parseFloat(cellValue) < 0) {
                cellRef.findElement(by.xpath('./div')).getAttribute('style').then(function(val) {

                  //val is holding value - "color: rgb(255, 77, 166);"  rgb(255, 77, 166) -> orange
                  if (val.split(':')[1].split(';')[0].trim() !== 'rgb(255, 166, 122)') {
                    flag = 1;
                    expect(false).customError('For Ticker - "' + ticker + '", "Port. Average Weight" Font color is not as Expected, but found: ' + val.split(':')[1].split(';')[0].trim());
                  }
                });
              }
            });
          });
        }
      });
      if (flag === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

    // Group and Total Level 'Port. Average Weight' column values not colored.
    it('Should store Group and Total Level\'s', function() {
      groups.push('Total');
      SlickGridFunctions.getAllRowsFromReport('Contribution').then(dataView => {
        dataView.forEach((rowRef) => {
          if (rowRef.expanded) {
            groups.push(rowRef[1]);
          }
        });
      });
    });

    it('Should verify if Group and Total Level "Port. Average Weight" column values not colored', function() {
      flag = 0;
      groups.forEach(function(group) {

        if (group == 'Total') {
          SlickGridFunctions.getCellReference('Contribution', group, '', 'Port. Average Weight').then(function(cellRef) {
            cellRef.getCssValue('color').then(function(color) {

              if (color !== 'rgba(0, 0, 0, 1)') {
                flag = 1;
                expect(false).customError('For Group "' + group + '", Font color of "Port. Average Weight" is not as Expected:rgba(0, 0, 0, 1) -> black, but found: ' + color);
              }
            });
          });
        } else {
          SlickGridFunctions.getCellReference('Contribution', group, '', 'Port. Average Weight').then(function(cellRef) {
            cellRef.getCssValue('color').then(function(color) {

              if (color !== 'rgba(0, 51, 102, 1)') {
                flag = 1;
                expect(false).customError('For Group "' + group + '", Font color of "Port. Average Weight" is not as Expected:rgba(0, 51, 102, 1) -> blue, but found: ' + color);
              }
            });
          });
        }
      });
      if (flag === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should store Port. Contribution To Return values for verification', function() {
      groups.forEach(function(gData) {
        SlickGridFunctions.getCellReference('Contribution', gData, '', 'Port. Contribution To Return').then(function(cellRef) {
          cellRef.getCssValue('color').then(function(color) {
            portContRet2.push(color);
          });
        });
      });

    });

    it('Should store Port. Average Weight values for verification', function() {
      groups.forEach(function(gData) {
        SlickGridFunctions.getCellReference('Contribution', gData, '', 'Port. Average Weight').then(function(cellRef) {
          cellRef.getCssValue('color').then(function(color) {
            portAvgWt1.push(color);
          });
        });
      });
    });

    it('Should verify if "Port. Contribution To Return" column formating remains the same as the previous step2', function() {
      flag = 0;
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(ColumnData) {
        ColumnData.forEach(function(cData, index) {
          if (portContRet1[index] !== portContRet2[index]) {
            flag = 1;
            expect(false).customError('For Ticker "' + cData + '", "Port. Contribution To Return\'s" current report formating is not matching with previous report value, current value: ' + portContRet2[index] + 'previous value: ' + portContRet1[index]);
          }
        });
      });
      if (flag === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

  });

  describe('Test Step ID: 565992', function() {

    var tickerArray = [];
    var priceChangeArray = [];
    var endingPriceArray = [];
    var groups = [];

    // Click on "Wrench" icon and select "options" from the "wrench" menu and navigate to "Columns" in LHP
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Columns');

    it('Should verify if "Beginning Price" item is present in selected section', function() {
      CommonPageObjectsForPA3.verifyIfElementIsPresentInSelectedSection('Beginning Price', xpathOfSelectedSection);
    });

    it('Should click on "Beginning Price" item in selected section', function() {
      var Item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Beginning Price');
      Item.select();
      if (!Item.isSelected()) {
        expect(false).customError('"Beginning Price" is not selected');
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should click on "CONDITIONAL FORMATTING" accordion', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Conditional Formatting').then(function(expandStatus) {
        if (!expandStatus) {
          expect(expandStatus).customError('"CONDITIONAL FORMATTING" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "CONDITIONAL FORMATTING" accordion is expanded', function() {
      TileOptionsColumns.getExpandableElement('Conditional Formatting').getAttribute('class').then(function(status) {
        if (status.indexOf('collapsed') > 0) {
          expect(false).customError('"CONDITIONAL FORMATTING" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Column" drop down and select "Price Change (%)"', function() {
      ThiefHelpers.selectOptionFromDropDown('Price Change (%)', 'Column');

      //verifying if "Price Change (%)" is selected from"Column" drop down and select "Price Change (%)"
      ThiefHelpers.verifySelectedDropDownText('Price Change (%)', 'Column');
    });

    it('Should check "Group Level" checkbox', function() {
      ThiefHelpers.getCheckBoxClassReference('Group Level').isChecked().then(function(status) {
        if (status) {
          expect(false).customError('"Group Level" checkbox is already checked');
          CommonFunctions.takeScreenShot();
        } else {
          ThiefHelpers.getCheckBoxClassReference('Group Level').check();
        }
      });

      //Verifying if "Group Level" checkbox is checked
      ThiefHelpers.getCheckBoxClassReference('Group Level').isChecked().then(function(status) {
        if (!status) {
          expect(false).customError('"Group Level" checkbox is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "+ Add Condition" button', function() {
      ThiefHelpers.getButtonClassReference('Add Condition').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "is less than or equal to" from "equals" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('is less than or equal to', undefined, TileOptionsColumns.xpathEqualsDropdown, undefined);

      //verifying if "is less than or equal to" is selected from "equals" drop down
      ThiefHelpers.verifySelectedDropDownText('is less than or equal to', undefined, TileOptionsColumns.xpathEqualsDropdown, undefined);
    });

    it('Should select "Column" from "Constant" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Column', undefined, TileOptionsColumns.xpathConstantdropdown, undefined);

      //Verifying if the "Constant" drop down is set to "Column"
      ThiefHelpers.verifySelectedDropDownText('Column', undefined, TileOptionsColumns.xpathConstantdropdown, undefined);
    });

    it('Should select "Ending Price" from "Select" drop down', function() {
      //added xpath for this
      ThiefHelpers.selectOptionFromDropDown('Ending Price', undefined, TileOptionsColumns.xpathSelectDropdown, undefined);

      //Verifying that the "Select" drop down is set to "Ending Price"
      ThiefHelpers.verifySelectedDropDownText('Ending Price', undefined, TileOptionsColumns.xpathSelectDropdown, undefined);
    });

    it('Should click on "Font" drop down', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathColorPickerButton, 'Font');
      ThiefHelpers.getButtonClassReference(undefined, xpath).press();

      // Verifying if "Font" drop down is opened or not
      element(by.xpath(xpath)).getAttribute('class').then(function(text) {
        if (text.indexOf('active') < 0) {
          expect(false).customError('"Font" drop down did not open even after clicking on it');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Red" from the color picker', function() {
      ChartingUtilities.selectColorFrmDD('rgb(252, 11, 11)');

      // Verifying if "Red" color is selected from drop down
      TileOptionsColumns.getColorPickerButton('Font').getAttribute('style').then(function(value) {
        if (value.indexOf('rgb(252, 11, 11)') < 0) {
          //custom error sariga raayi
          expect(false).customError('The "Font" drop down did not show "Red" color.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Cell" drop down', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathColorPickerButton, 'Cell');
      ThiefHelpers.getButtonClassReference(undefined, xpath).press();

      // Verifying if "Cell" drop down is opened or not
      element(by.xpath(xpath)).getAttribute('class').then(function(text) {
        if (text.indexOf('active') < 0) {
          expect(false).customError('"Cell" drop down did not open even after clicking on it');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Yellow" from the color picker', function() {
      ChartingUtilities.selectColorFrmDD('rgb(255, 255, 77)');

      // Verifying if "Yellow" color is selected from drop down
      TileOptionsColumns.getColorPickerButton('Cell').getAttribute('style').then(function(value) {
        if (value.indexOf('rgb(255, 255, 77)') < 0) {
          expect(false).customError('The "Cell" drop down did not show "Yellow" color.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "U" button', function() {
      ThiefHelpers.getButtonCheckboxClassReference('underline').check();

      //verifying if "U" is checked
      ThiefHelpers.getButtonCheckboxClassReference('underline').isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"underline" checkbox" checkbox is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Should store Ticker Values', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker, index) {
          if (index > 0 && ticker != '') {
            tickerArray.push(ticker);
          }
        });
      });
    });

    it('Should store "Price Change (%)" and "Ending Price" column cell values for corresponding Ticker values', function() {
      tickerArray.forEach(function(ticker) {

        //getting "Price Change (%)" column cell values for corresponding ticker
        SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Price Change (%)').then(function(cellRef) {
          cellRef.getText().then(function(cellValue) {
            priceChangeArray.push(cellValue);
          });
        });

        //getting "Ending Price" column cell values for corresponding ticker
        SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Ending Price').then(function(cellRef) {
          cellRef.getText().then(function(cellValue) {
            endingPriceArray.push(cellValue);
          });
        });
      });
    });

    it('Should verify that "Beginning Price" font have Yellow background, Red font color and underlined, if "Price Change (%)" column value less tahn or equal to Ending Price', function() {
      flag = 0;
      tickerArray.forEach(function(ticker, index) {
        var p = parseFloat(priceChangeArray[index]);
        var e = parseFloat(endingPriceArray[index]);
        flag = 0;
        if (!isNaN(p) && !isNaN(e)) {
          if (isNaN(p) || isNaN(e)) {
            flag = 1;
            expect(false).customError('For Ticker: "' + ticker + '", value of "Price Change (%)" and value of "Ending Price" column value are not as expected; but found "Price Change (%)": ' +
              p + ' and "Ending Price": ' + e);
          } else if (p <= e) {
            SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Beginning Price').then(function(cellRef) {
              cellRef.findElement(by.xpath('./div')).getAttribute('style').then(function(val) {

                //val is holding value - "background-color: rgb(255, 255, 77); color: rgb(252, 11, 11); text-decoration: underline;"
                if (val.indexOf('background-color: rgb(255, 255, 77)') === -1 || val.indexOf('color: rgb(252, 11, 11)') === -1 || val.indexOf('text-decoration: underline') === -1) {
                  flag = 1;
                  expect(false).customError('For"Ticker" - ' + ticker + ', "Beginning Price" is expected to have Yellow background, Red font color and underlined');
                }
              });
            });
          } else {
            SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Beginning Price').then(function(cellRef) {
              cellRef.getCssValue('color').then(function(color) {
                if (color !== 'rgba(0, 0, 0, 1)') {
                  flag = 1;
                  expect(false).customError('For"Ticker" - ' + ticker + ', "Beginning Price" font is expected: rgba(0, 0, 0, 1), But found:' + color);
                }
              });
            });
          }
        }
      });
      if (flag === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

    // Group and Total Level 'Port. Average Weight' column values not colored.
    it('Should store Group and Total Level\'s', function() {
      groups.push('Total');
      SlickGridFunctions.getAllRowsFromReport('Contribution').then(dataView => {
        dataView.forEach((rowRef) => {
          if (rowRef.expanded) {
            groups.push(rowRef[1]);
          }
        });
      });
    });

    it('Should store Port. Contribution To Return values for verification', function() {
      groups.forEach(function(gData) {
        SlickGridFunctions.getCellReference('Contribution', gData, '', 'Port. Contribution To Return').then(function(cellRef) {
          cellRef.getCssValue('color').then(function(color) {
            portContRet3.push(color);
          });
        });
      });

    });

    it('Should store Port. Average Weight values for verification', function() {
      groups.forEach(function(gData) {
        SlickGridFunctions.getCellReference('Contribution', gData, '', 'Port. Average Weight').then(function(cellRef) {
          cellRef.getCssValue('color').then(function(color) {
            portAvgWt2.push(color);
          });
        });
      });
    });

    it('Should verify if "Port. Contribution To Return" column values remains the same as the previous step', function() {
      flag = 0;
      var err = '';
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(ColumnData) {
        ColumnData.forEach(function(cData, index) {
          if (portContRet1[index] !== portContRet2[index]) {
            flag = 1;
            expect(false).customError('For Ticker: "' + cData + '", "Port. Contribution To Return" value in current report is not same as in previous report,' +
              'value in current report is - ' + portContRet2[index] + 'value in previous report is - ' + portContRet1[index]);
          }
        });
      });
      if (flag === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should verify if "Port. Average Weight" column values remains the same as the previous step1', function() {
      flag = 0;
      var err = '';
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(ColumnData) {
        ColumnData.forEach(function(cData, index) {
          if (portAvgWt1[index] !== portAvgWt2[index]) {
            flag = 1;
            expect(false).customError('For Ticker: "' + ColumnData + '", "Port. Average Weight" value in current report is not same as in previous report,' +
              'value in current report is - ' + portAvgWt2[index] + 'value in previous report is - ' + portAvgWt1[index]);
          }
        });
      });
      if (flag === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should verify if "Total" value for "Beginning Price" column is not colored', function() {
      SlickGridFunctions.getCellReference('Contribution', 'Total', '', 'Beginning Price').then(function(ref) {
        ref.findElement(by.xpath('./div')).getAttribute('style').then(function(att) {
          if (att.indexOf('color') !== -1) {
            expect(false).customError('Total cell value is colored');
            CommonFunctions.takeScreenShot();
          }
        }, function() {
          expect(true).customError('');
        });
      });
    });

  });

  describe('Test Step ID: 565999', function() {

    var groups = [];

    // Click on "Wrench" icon and select "options" from the "wrench" menu and navigate to "Columns" in LHP
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Columns');

    it('Should verify if "Beginning Price" item is present in selected section', function() {
      CommonPageObjectsForPA3.verifyIfElementIsPresentInSelectedSection('Beginning Price', xpathOfSelectedSection);
    });

    it('Should click on "Beginning Price" item in selected section', function() {
      var Item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Beginning Price');
      Item.select();
      if (!Item.isSelected()) {
        expect(false).customError('"Beginning Price" is not selected');
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should click on "CONDITIONAL FORMATTING" accordion', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Conditional Formatting').then(function(expandStatus) {
        if (!expandStatus) {
          expect(expandStatus).customError('"CONDITIONAL FORMATTING" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "CONDITIONAL FORMATTING" accordion is expanded', function() {
      TileOptionsColumns.getExpandableElement('Conditional Formatting').getAttribute('class').then(function(status) {
        if (status.indexOf('collapsed') > 0) {
          expect(false).customError('"CONDITIONAL FORMATTING" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Type" drop down and select "Up/Down"', function() {
      ThiefHelpers.selectOptionFromDropDown('Up/Down', 'Type');

      //Verifying if "Up/Down" is selected in "Type" drop down
      ThiefHelpers.verifySelectedDropDownText('Up/Down', 'Type');
    });

    it('Should check "Total Level" checkbox', function() {
      ThiefHelpers.getCheckBoxClassReference('Total Level').isChecked().then(function(status) {
        if (status) {
          expect(false).customError('"Total Level" checkbox is already checked');
          CommonFunctions.takeScreenShot();
        } else {
          ThiefHelpers.getCheckBoxClassReference('Total Level').check();
        }
      });

      //Verifying if "Total Level" checkbox is checked
      ThiefHelpers.getCheckBoxClassReference('Total Level').isChecked().then(function(status) {
        if (!status) {
          expect(false).customError('"Total Level" checkbox is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Group Level" checkbox is already checked', function() {
      ThiefHelpers.getCheckBoxClassReference('Group Level').isChecked().then(function(status) {
        if (!status) {
          expect(false).customError('"Group Level" checkbox is not already checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Should get Ticker Values for corresponding "Beginning Price" values', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker, index) {
          if (index > 0 && ticker != '') {
            SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Beginning Price').then(function(cellRef) {
              cellRef.getText().then(function(cellValue) {
                if (cellValue !== '--') {
                  tickerArrayForPriceChange1.push(ticker);
                } else {
                  tickerArrayForPriceChange.push(ticker);
                }
              });
            });
          }
        });
      });
      SlickGridFunctions.scrollRowToTop('Contribution', 0);
    });

    it('Should verify that "Beginning Price" column values font colored to "Red" if "Price Change (%)" value is negative' +
      '"Beginning Price" column values font colored to "green" if "Price Change (%)" value is positive', function() {
      flag = 0;
      tickerArrayForPriceChange1.forEach(function(ticker) {
        SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Price Change (%)').then(function(cellRef) {
          cellRef.getText().then(function(cellvalue) {
            if (parseFloat(cellvalue) > 0) {
              PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Beginning Price', undefined, undefined,
                true, undefined).then(function(ref) {
                Utilities.scrollElementToVisibility(ref);
                Utilities.getFontColor(ref.element(by.xpath('./div'))).then(function(color) {
                  if (color != 'rgba(51, 153, 0, 1)') {
                    flag = 1;
                    expect(false).customError('For Ticker "' + ticker + '", "Beginning Price" font is excepted: rgba(51, 153, 0, 1) -> Red, but found' + color);
                  }
                });
              });
            } else if (parseFloat(cellvalue) < 0) {
              PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Beginning Price', undefined, undefined,
                true, undefined).then(function(ref) {
                Utilities.scrollElementToVisibility(ref);
                Utilities.getFontColor(ref.element(by.xpath('./div'))).then(function(color) {
                  if (color != 'rgba(255, 0, 0, 1)') {
                    flag = 1;
                    expect(false).customError('For Ticker "' + ticker + '", "Beginning Price" font is excepted: rgba(255, 0, 0, 1) -> green, but found' + color);
                  }
                });
              });
            }
          });
        });
      });
      if (flag === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should verify that "Beginning Price" column values font are not colored if values are blanks or NAs or 0\'s', function() {
      flag = 0;
      tickerArrayForPriceChange1.forEach(function(ticker) {
        SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Beginning Price').then(function(cellRef) {
          cellRef.getCssValue('color').then(function(color) {
            if (color !== 'rgba(0, 0, 0, 1)') {
              flag = 1;
              expect(false).customError('For Ticker "' + ticker + '", "Beginning Price" font is excepted: rgba(255, 0, 0, 1) -> green, but found' + color);
            }
          });
        });
      });
      if (flag === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

    // Group and Total Level 'Port. Average Weight' column values not colored.
    it('Should store Group and Total Level\'s', function() {
      groups.push('Total');
      SlickGridFunctions.getAllRowsFromReport('Contribution').then(dataView => {
        dataView.forEach((rowRef) => {
          if (rowRef.expanded) {
            groups.push(rowRef[1]);
          }
        });
      });
    });

    it('Should store Port. Contribution To Return values for verification', function() {
      groups.forEach(function(gData) {
        SlickGridFunctions.getCellReference('Contribution', gData, '', 'Port. Contribution To Return').then(function(cellRef) {
          cellRef.getCssValue('color').then(function(color) {
            portContRet4.push(color);
          });
        });
      });
    });

    it('Should store Port. Average Weight values for verification', function() {
      groups.forEach(function(gData) {
        SlickGridFunctions.getCellReference('Contribution', gData, '', 'Port. Average Weight').then(function(cellRef) {
          cellRef.getCssValue('color').then(function(color) {
            portAvgWt3.push(color);
          });
        });
      });
    });

    it('Should verify if "Port. Contribution To Return" column values remains the same as the previous step', function() {
      flag = 0;
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(ColumnData) {
        ColumnData.forEach(function(cData, index) {
          if (portContRet3[index] !== portContRet4[index]) {
            flag = 1;
            expect(false).customError('For Ticker: "' + cData + '", "Port. Contribution To Return" value in current report is not same as in previous report,' +
              'value in current report is - ' + portContRet4[index] + 'value in previous report is - ' + portContRet3[index]);
          }
        });
      });
      if (flag === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should verify if "Port. Average Weight" column values remains the same as the previous step', function() {
      flag = 0;
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(ColumnData) {
        ColumnData.forEach(function(cData, index) {
          if (portAvgWt2[index] !== portAvgWt3[index]) {
            flag = 1;
            expect(false).customError('For Ticker: "' + cData + '", "Port. Average Weight" value in current report is not same as in previous report,' +
              'value in current report is - ' + portAvgWt3[index] + 'value in previous report is - ' + portAvgWt2[index]);
          }
        });
      });
      if (flag === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

  });

  describe('Test Step ID: 566564', function() {

    var tickerArray1 = [];
    var tickerArray2 = [];
    var groups = [];
    var groupArray = [];

    // Click on "Wrench" icon and select "options" from the "wrench" menu and navigate to "Columns" in LHP
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Columns');

    it('Should click on "CONDITIONAL FORMATTING" accordion', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Conditional Formatting').then(function(expandStatus) {
        if (!expandStatus) {
          expect(expandStatus).customError('"CONDITIONAL FORMATTING" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verifying if "CONDITIONAL FORMATTING" accordion is expanded', function() {
      TileOptionsColumns.getExpandableElement('Conditional Formatting').getAttribute('class').then(function(status) {
        if (status.indexOf('collapsed') > 0) {
          expect(false).customError('"CONDITIONAL FORMATTING" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var array1 = ['Port. Average Weight', 'Port. Total Return'];

    array1.forEach(function(value) {

      it('Should verify if "' + value + '" item is present in selected section', function() {
        CommonPageObjectsForPA3.verifyIfElementIsPresentInSelectedSection(value, xpathOfSelectedSection);
      });

    });

    it('Should click on "Port. Average Weight" and "Port. Total Return" item in selected section', function() {
      var Item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Port. Average Weight');
      Item.select();
      if (!Item.isSelected()) {
        expect(false).customError('"Port. Average Weight" is not selected');
        CommonFunctions.takeScreenShot();
      }

      //Hold control key and click on "Port. Average Weight"
      var Item1 = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Port. Total Return');
      Item1.select(true);
      if (!Item1.isSelected()) {
        expect(false).customError('"Port. Total Return" is not selected');
        CommonFunctions.takeScreenShot();
      }
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Should get "Tickers" from Report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker, index) {
          SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Port. Average Weight').then(function(cellRef) {
            cellRef.getText().then(function(cellValue) {
              if (ticker != '') {
                if (cellValue !== '--') {
                  tickerArray1.push(ticker);
                } else {
                  tickerArray2.push(ticker);
                }
              }
            });
          });
        });
      });
    });

    it('Should verify that "Port. Total Return" is Not colored if "Port. Average Weight" has blanks or NAs or 0\'s values', function() {
      flag = 0;
      tickerArray2.forEach(function(ticker) {
        SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Port. Average Weight').then(function(cellRef) {
          cellRef.getCssValue('color').then(function(color) {
            if (color !== 'rgba(0, 0, 0, 1)') {
              flag = 1;
              expect(false).customError('For Ticker "' + ticker + '", "port.average weight" Font is not as expected, but found: ' + color);
            }
          });
        });
      });
      if (flag === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should verify that "Port. Total Return" font colored to "Pink" if "Port. Average Weight" is positive' +
      'and "Port. Total Return" font colored to "Orange" if "Port. Average Weight" is negative', function() {
      flag = 0;
      tickerArray1.forEach(function(ticker) {
        SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Port. Average Weight').then(function(cellRef) {
          cellRef.getText().then(function(cellValue) {
            if (parseFloat(cellValue) > 0) {

              //verify if color is red
              cellRef.findElement(by.xpath('./div')).getAttribute('style').then(function(color) {
                if (color.indexOf('color: rgb(255, 77, 166);') === -1) {
                  flag = 1;
                  expect(false).customError('For Ticker "' + ticker + '", "port.average weight" Font is not as expectedbut found: ' + color);
                }
              });
            } else if (parseFloat(cellValue) < 0) {

              //verify if color is orange
              cellRef.findElement(by.xpath('./div')).getAttribute('style').then(function(color) {
                if (color.indexOf('color: rgb(255, 166, 122);') === -1) {
                  flag = 1;
                  expect(false).customError('For Ticker "' + ticker + '", "port.average weight" Font is not as expected, but found: ' + color);
                }
              });
            }
          });
        });
      });
      if (flag === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should store Group and Total Level\'s', function() {
      groups.push('Total');
      SlickGridFunctions.getAllRowsFromReport('Contribution').then(dataView => {
        dataView.forEach((rowRef) => {
          if (rowRef.expanded) {
            groups.push(rowRef[1]);
          }
        });
      });
    });

    it('Should verify if Group and Total Level "Port. Total Return" column values not colored', function() {
      flag = 0;
      groups.forEach(function(group, index) {
        SlickGridFunctions.getCellReference('Contribution', group, '', 'Port. Total Return').then(function(cellRef) {
          cellRef.getCssValue('color').then(function(color) {
            if (index === 0 && color !== 'rgba(0, 0, 0, 1)') {
              flag = 1;
              expect(false).customError('For Total, "Port. Total Return" is not as Expected');
            } else if (color !== 'rgba(0, 51, 102, 1)' && index > 0) {
              flag = 1;
              expect(false).customError('For Group "' + group + '"Port. Total Return is not as Expected, but found : ' + color);
            }
          });
        });
      });
      if (flag === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should store second column Values', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', '').then(function(groupColumnData) {
        groupColumnData.forEach(function(group) {
          groupArray.push(group);
        });
      });
    });

    it('Should store all columns for future verification', function() {
      groupArray.forEach(function(group, index) {
        getcolors('Contribution', group, '', 'Port. Average Weight', groups).then(function(color) {
          portAvgWeight.push(color);
        });
        getcolors('Contribution', group, '', 'Beginning Price', groups).then(function(color) {
          beginningPrice.push(color);
        });
        getcolors('Contribution', group, '', 'Port. Total Return', groups).then(function(color) {
          portTotalReturn.push(color);
        });
        getcolors('Contribution', group, '', 'Port. Contribution To Return', groups).then(function(color) {
          portContToReturn.push(color);
        });
      });
    });
  });

  describe('Test Step ID: 606497', function() {

    // Click on "Wrench" icon and select "options" from the "wrench" menu and navigate to "Columns" in LHP
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Columns');

    it('Should click on "Add New (+)" button and select "New/Reference" from the drop down menu', function() {
      TileOptionsColumns.getAddNewButton().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Select "New/Reference" from the drop down menu
      ThiefHelpers.getMenuClassReference().selectItemByText('New/Reference').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify that "Columns" dialog box appear after selecting "New/Reference" option', function() {
      ThiefHelpers.isDialogOpen('Columns', undefined, undefined).then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Columns" dialog box has not appeared after selecting "New/Reference" option.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select the "New" radio button if not already selected', function() {
      ThiefHelpers.getRadioClassReference('New').isSelected().then(function(selected) {
        if (!selected) {
          ThiefHelpers.getRadioClassReference('New').select();
        }
      });
    });

    it('Should verfiy the "New" radio button is selected', function() {
      ThiefHelpers.getRadioClassReference('New').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"New" radio button is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Enter the formula into the section, select the option from typeahead and click outside
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'P_PRICE', undefined, undefined, 'clickOutside');

    CommonPageObjectsForPA3.selectDirectoryAndSubDirectoryAndVerify('Personal', 'Personal');

    it('Should enter "Price column(!&*+}]&$" into the "Name" field', function() {
      ThiefHelpers.getTextBoxClassReference('Name:', undefined).setText('Price column(!&*+}]&$');

      // Verifying that "COL3: Grouping" is entered into the Field
      ThiefHelpers.getTextBoxClassReference('Name:', undefined).getText().then(function(text) {
        if (text !== 'Price column(!&*+}]&$') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Price column(!&*+}]&$" is not entered to the "Name:" field; Found: ' + text);
        }
      });
    });

    // Click on the "Save" button of "Columns" dialog verify if loading icon is displayed with text Creating custom column…
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Columns', undefined, undefined, undefined, true, 'Creating custom column…');

    it('Should expand "Personal" from "Available" container and double click on Price column(!&*+}]&$ to add it to "Selected" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
      group.expand();

      // Verifying if "Personal" is expanding
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('Price column(!&*+}]&$').then(function(element) {

            // Selecting the element before performing double click as double click function does not work by itself
            element.select();
            element.doubleClick();
          });
        } else {
          expect(false).customError('"Personal" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify that "Price column(!&*+}]&$" is added to the "Selected" section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Price column(!&*+}]&$') === -1) {
          expect(false).customError('"Price column(!&*+}]&$" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 606513', function() {

    var priceCol1 = [];
    var priceCol2 = [];
    var tickerArray = [];

    it('Should click on "Add New (+)" button and select "New/Reference" from the drop down menu', function() {
      TileOptionsColumns.getAddNewButton().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Select "New/Reference" from the drop down menu
      ThiefHelpers.getMenuClassReference().selectItemByText('New/Reference').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify that "Columns" dialog box appear after selecting "New/Reference" option', function() {
      ThiefHelpers.isDialogOpen('Columns', undefined, undefined).then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Columns" dialog box has not appeared after selecting "New/Reference" option.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select the "Reference" radio button', function() {
      CreateEditCustomColumns.getRadioButton('Reference').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Reference" radio button is selected
      expect(CreateEditCustomColumns.getRadioButton('Reference').getAttribute('class')).not.toBeNull();
    });

    it('Should select "Formula" tab from the "New/Reference" window', function() {
      CreateEditCustomColumns.getTab('Formula').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Formula" tab is selected
      expect(CreateEditCustomColumns.getTab('Formula').getAttribute('class')).toContain('selected');
    });

    it('Should select "Col 7: Price column(!&*+}]&$" from the "Formula" tab', function() {
      ThiefHelpers.getVirtualListboxClassReference(element(by.xpath(CreateEditCustomColumns.xpathOfFormulaTextArea))).getItemByText('Col 7: Price column(!&*+}]&$').select();

      // Verifying that "Col 6: Price column(!&*+}]&$" is selected
      ThiefHelpers.getVirtualListboxClassReference(element(by.xpath(CreateEditCustomColumns.xpathOfFormulaTextArea))).getItemByText('Col 7: Price column(!&*+}]&$').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Col 7: Price column(!&*+}]&$" was not selected from the' + ' "Formula" tab.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Add" button to add "Col 7: Price column(!&*+}]&$" to text area', function() {
      ThiefHelpers.getButtonClassReference('Add', undefined).press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if "COL7" is added to the text area', function() {
      CreateEditCustomColumns.getTabTextArea().getText().then(function(name) {
        var text = name.trim();
        if (text !== 'COL7') {
          expect(false).customError('Expected: "COL7" but Found: "' + name + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "Pr Col)))((((@@$%" into the "Name" field', function() {

      // Type "Pr Col)))((((@@$%" into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name').setText('Pr Col)))((((@@$%');

      // Verifying that "Pr Col)))((((@@$%" is typed into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(name) {
        if (name !== 'Pr Col)))((((@@$%') {
          expect(false).customError('Entered name is not valid. Expected: "Pr Col)))((((@@$%", Found: "' + name + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save" button to save the settings', function() {
      CreateEditCustomColumns.getButton('Save').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Should verify that "Create/Edit Custom Grouping" mode is no more displayed', function() {
      element(by.xpath(CreateEditCustomColumns.xpathNewReference)).isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Create/Edit Custom Grouping" mode is still displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Should store Ticker values', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker) {
          if (ticker !== '') {
            tickerArray.push(ticker);
          }
        });
      });
    });

    //Verify that Price column(!&*+}]&$' and 'Pr Col)))((((@@$%' is added to the Contribution2 report and both the columns have same values under it
    it('Should store values of "Price column(!&*+}]&$" and "Pr Col)))((((@@$%"', function() {
      tickerArray.forEach(function(ticker) {
        SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Price column(!&*+}]&$').then(function(cellRef) {
          cellRef.getText().then(function(cellValue) {
            priceCol1.push(cellValue);
          });
        });
        SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Pr Col)))((((@@$%').then(function(cellRef) {
          cellRef.getText().then(function(cellValue) {
            priceCol2.push(cellValue);
          });
        });
      });
    });

    it('Should compare values of "Price column(!&*+}]&$" and "Pr Col)))((((@@$%"', function() {
      flag = 0;
      tickerArray.forEach(function(ticker, index) {
        if (priceCol1[index] !== priceCol2[index]) {
          flag = 1;
          expect(false).customError('ERROR For Ticker- "' + ticker + '" Values of "Price column(!&*+}]&$" and "Pr Col)))((((@@$% are not same' +
            '"Price column(!&*+}]&$" value - ' + priceCol1[index] + '"Pr Col)))((((@@$%" value - ' + priceCol2[index]);
        }
      });
      if (flag === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

  });

  describe('Test Step ID: 663850', function() {

    var tickerArray = [];
    var priceCol1 = [];
    var priceCol2 = [];

    it('Should hover on Contribution and click "Duplicate" from the Wrench', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Contribution').getActions().then(function(actions) {
        actions.triggerAction('duplicate').then(function() {
        }, function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Should verify if 2 Contribution options are displayed in the LHP', function() {
      element.all(by.xpath(CommonFunctions.replaceStringInXpath(PA3MainPage.xpathOfLhpReports, 'Contribution'))).count().then(function(count) {
        if (count !== 2) {
          expect(false).customError(' 2 Contribution options are displayed in the LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover on "Contribution" report from LHP and click on wrench Icon', function() {
      browser.actions().mouseMove(PA3MainPage.getReports('Contribution')).perform();

      //Should click on wrench icon next to the "Contribution", report
      PA3MainPage.selectWrenchIcon('Contribution', true);
    });

    it('Should select "Rename" from the menu drop down and enter "Contribution2"', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Rename').then(function() {
      }, function() {
        expect(false).customError('Unable to select "Rename" from the menu drop down');
        CommonFunctions.takeScreenShot();
      });

      //Rename to "Contribution2"
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathOfRenameTextBoxFromLHP).setText('Contribution2');

      //Verifying if "Contribution2" is displayed in the LHP
      element(by.xpath(CommonFunctions.replaceStringInXpath(PA3EditMode.xpathOfLhpReports, 'Contribution2'))).isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Contribution2" is not displayed in the LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if Duplicate "Contribution" is no more visible Weights" is not displayed in the LHP', function() {
      var count = 0;
      element(by.xpath(CommonFunctions.replaceStringInXpath(PA3EditMode.xpathOfLhpReports, 'Contribution'))).isPresent().then(function(present) {
        if (present) {
          count = count + 1;
        }
      });
      if (count == 2) {
        expect(false).customError('Duplicate "Contribution" is visible');
        CommonFunctions.takeScreenShot();
      }
    });

    it('Store Ticker values', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker) {
          if (ticker !== '') {
            tickerArray.push(ticker);
          }
        });
      });
    });

    it('Should store values of "Price column(!&*+}]&$" and "Pr Col)))((((@@$%"', function() {
      tickerArray.forEach(function(ticker) {
        SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Price column(!&*+}]&$').then(function(cellRef) {
          cellRef.getText().then(function(cellValue) {
            priceCol1.push(cellValue);
          });
        });
        SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Pr Col)))((((@@$%').then(function(cellRef) {
          cellRef.getText().then(function(cellValue) {
            priceCol2.push(cellValue);
          });
        });
      });
    });

    //Verify that Price column(!&*+}]&$' and 'Pr Col)))((((@@$%' is added to the Contribution2 report and both the columns have same values
    it('Should compare values of "Price column(!&*+}]&$" and "Pr Col)))((((@@$%"', function() {
      tickerArray.forEach(function(ticker, index) {
        flag = 0;
        if (priceCol1[index] !== priceCol2[index]) {
          flag = 1;
          expect(false).customError('Tickker- "' + ticker + '" values of "Price column(!&*+}]&$" and "Pr Col)))((((@@$%" are not same but found: ' +
            '"Price column(!&*+}]&$" value - ' + priceCol1[index] + '"Pr Col)))((((@@$%" value - ' + priceCol2[index]);
        }

        if (flag === 1) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 566029', function() {

    var groups = [];
    var portAvgWeightTemp = [];
    var beginningPriceTemp = [];
    var portTotalReturnTemp = [];
    var portContToReturnTemp = [];
    var groupArray = [];

    // Click on the folder icon and select "Save As..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Save As…');

    // Add .toUpperCase() if you want the document name to be in upper case to the function
    CommonPageObjectsForPA3.selectPersonalAndEnterDocumentNameInSaveAsDialog('CF-FORMATTED', undefined, true);

    // Click on the folder icon and select "Open..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Open...');

    // Add .toUpperCase() if you want the document name to be in upper case to the function
    CommonPageObjectsForPA3.openRequiredDocumentFromPersonal('CF-FORMATTED');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Sector Weights');

    // Select the "Contribution" option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Contribution', true, 'isSelected');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    var arrcols = ['Price column(!&*+}]&$', 'Pr Col)))((((@@$%'];

    it('Should store Group and Total Level\'s', function() {
      groups.push('Total');
      SlickGridFunctions.getAllRowsFromReport('Contribution').then(dataView => {
        dataView.forEach((rowRef) => {
          if (rowRef.expanded) {
            groups.push(rowRef[1]);
          }
        });
      });
    });

    it('Should store second column Values', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', '').then(function(groupColumnData) {
        groupColumnData.forEach(function(group) {
          groupArray.push(group);
        });
      });
    });

    it('Should store all columns for future verification', function() {
      groupArray.forEach(function(group, index) {

        getcolors('Contribution', group, '', 'Port. Average Weight', groups).then(function(color) {
          portAvgWeightTemp.push(color);
        });
        getcolors('Contribution', group, '', 'Beginning Price', groups).then(function(color) {
          beginningPriceTemp.push(color);
        });
        getcolors('Contribution', group, '', 'Port. Total Return', groups).then(function(color) {
          portTotalReturnTemp.push(color);
        });
        getcolors('Contribution', group, '', 'Port. Contribution To Return', groups).then(function(color) {
          portContToReturnTemp.push(color);
        });
      });

    });

    it('Should verify that format on all columns remain same as in step - 566564', function() {
      reportFormatVerification(portAvgWeightTemp, beginningPriceTemp, portTotalReturnTemp, portContToReturnTemp, groupArray);
    });

    it('Verifying that there are all columns same as the screenshot noted in step-566564, and "Price column(!&*+}]&$" and "Pr Col)))((((@@$%"', function() {
      SlickGridFunctions.getColumnNames('Contribution').then(function(arrColumnNames) {
        flag = 0;
        for (var i = 0; i < 2; i++) {
          if (arrcols[i] !== arrColumnNames[i + 8]) {
            flag = 1;
            expect(false).customError('Column "' + arrcols[i] + '" is not present in Contribution Report');
          }
        }

        if (flag === 1) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Contribution2" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Reports', 'Contribution2').then(function(reportRef) {
        reportRef.click().then(function() {
        }, function() {
          expect(false).customError('Unable to select "Contribution2" from LHP');
          CommonFunctions.takeScreenShot();
        });
      });
    });

    // Select the "Contribution" option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Contribution2', true, 'isSelected');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    //'Price column(!&*+}]&$' and 'Pr Col)))((((@@$%' are still displayed in both the 'Contribution' and 'Contribution2' report.
    it('Should verify that there are all columns same as the screenshot noted in step-566564, and "Price column(!&*+}]&$" and "Pr Col)))((((@@$%"', function() {
      SlickGridFunctions.getColumnNames('Contribution').then(function(arrColumnNames) {
        flag = 0;
        for (var i = 0; i < 2; i++) {
          if (arrcols[i] !== arrColumnNames[i + 8]) {
            flag = 1;
            expect(false).customError('Column "' + arrcols[i] + '" is not present in Contribution2 Report');
          }
        }

        if (flag === 1) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 607056', function() {

    var groups = [];
    var portAvgWeightTemp = [];
    var beginningPriceTemp = [];
    var portTotalReturnTemp = [];
    var portContToReturnTemp = [];
    var groupArray = [];

    // Select the "Contribution" option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Contribution', true, 'isSelected');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    // Click on "Wrench" icon and select "options" from the "wrench" menu and navigate to "Columns" in LHP
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Columns');

    var array1 = ['Document', 'Personal'];
    var array2 = ['Pr Col)))((((@@$%', 'Price column(!&*+}]&$'];
    array1.forEach(function(value, index) {

      it(' Should verify that "' + value + '" is expanded and hover on' + array2[index] + 'to click on "Remove" icon', function() {
        var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText(value);
        group.expand();
        group.isExpanded().then(function(expanded) {
          if (expanded) {
            return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, value, array2[index], 'last').then(function(indexOfElement) {
              var action = group.getItemByIndex(indexOfElement);

              // Click on the "remove" icon
              return action.then(function(remove) {
                return remove.getActions().then(function(val) {
                  return val.triggerAction('remove');
                });
              });
            }, function(error) {
              expect(false).toBe(error);
            });
          } else {
            expect(false).customError('"Test Column Category" group was not expanded.');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      CommonPageObjectsForPA3.verifyAndClickOnOkButtonOfConfirmationDialog('Delete Column', 'Are you sure you want to delete this column?');

    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    var arrcols = ['Ticker', '', 'Port. Average Weight', 'Beginning Price', 'Ending Price', 'Price Change (%)', 'Port. Total Return', 'Port. Contribution To Return'];

    //'Price column(!&*+}]&$' and 'Pr Col)))((((@@$%' are not displayed in the Contribution report.
    it('Should verifying that "Price column(!&*+}]&$" and "Pr Col)))((((@@$%" Columns are not present', function() {
      SlickGridFunctions.getColumnNames('Contribution').then(function(arrColumnNames) {
        if (arrcols.length !== arrColumnNames.length) {
          expect(false).customError('Count of columns are not as expected in Contribution Report');
          CommonFunctions.takeScreenShot();
        }

        for (var i = 0; i < arrcols.length; i++) {
          if (arrcols[i] !== arrColumnNames[i]) {
            expect(false).customError('Column "' + arrcols[i] + '" is not present in Contribution Report');
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });

    it('Should store Group and Total Level\'s', function() {
      groups.push('Total');
      SlickGridFunctions.getAllRowsFromReport('Contribution').then(dataView => {
        dataView.forEach((rowRef) => {
          if (rowRef.expanded) {
            groups.push(rowRef[1]);
          }
        });
      });
    });

    it('Should store second column Values', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', '').then(function(groupColumnData) {
        groupColumnData.forEach(function(group) {
          groupArray.push(group);
        });
      });
    });

    it('Should store all columns for future verification', function() {
      groupArray.forEach(function(group) {

        getcolors('Contribution', group, '', 'Port. Average Weight', groups).then(function(color) {
          portAvgWeightTemp.push(color);
        });
        getcolors('Contribution', group, '', 'Beginning Price', groups).then(function(color) {
          beginningPriceTemp.push(color);
        });
        getcolors('Contribution', group, '', 'Port. Total Return', groups).then(function(color) {
          portTotalReturnTemp.push(color);
        });
        getcolors('Contribution', group, '', 'Port. Contribution To Return', groups).then(function(color) {
          portContToReturnTemp.push(color);
        });
      });

    });

    it('Should verify that format on all columns remain same as in step - 566564', function() {
      reportFormatVerification(portAvgWeightTemp, beginningPriceTemp, portTotalReturnTemp, portContToReturnTemp, groupArray);
    });
  });
});
