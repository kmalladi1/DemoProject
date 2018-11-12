'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: decision-analysis-columns', function() {
  var arrData1 = [];
  var arrData2 = [];
  var arrData3 = [];
  var arrDataOfUSDollers1 = [];
  var arrDataOfUSDollers2 = [];
  var arrNames1 = [];
  var arrNames2 = [];
  var arrNames3 = [];
  var arrNamesOfUSDollers1 = [];
  var arrNamesOfUSDollers2 = [];
  var arrOfValues1 = [];
  var arrOfValues2 = [];
  var arrOfValues3 = [];
  var arrOfValues4 = [];
  var arrOfValues5 = [];
  var arrOfValues6 = [];
  var arrValuesOfUSDollers1 = []; var arrValuesOfUSDollers2 = [];
  var arrPurchasingDecision1 = []; var arrPurchasingDecision2 = [];

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  describe('Test Step ID: 606205', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:/PA3/Columns/DA_COLUMNS" document', function() {
      PA3MainPage.switchToDocument('da-columns');
    });

    it('Waiting for reports to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Passive Weighted + Passive Purchase'), 180000);

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Passive Weighted + Passive Purchase" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Passive Weighted + Passive Purchase').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Passive Weighted + Passive Purchase" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Passive Weighted + Passive Purchase')).toBeTruthy();
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

  describe('Test Step ID: 606209', function() {

    it('Should click on the "Wrench" icon in the "Passive Weighted + Passive Purchase" report workspace', function() {
      PA3MainPage.selectWrenchIcon('Passive Weighted + Passive Purchase');
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Passive Weighted + Passive Purchase" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Passive Weighted + Passive Purchase') {
          expect(false).customError('"Tile Options - Passive Weighted + Passive Purchase" view has not appeared. ' +
            'Expected: "Tile Options - Passive Weighted + Passive Purchase" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Passive Weighted Total Return" from FactSet|Decision Analysis - Beta|Passive Weighted Portfolio', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');
      group.isExpanded().then(function(expanded) {
        if (expanded) {

          // Expanding "Portfolio"
          group.getGroupByText('Decision Analysis - Beta').then(function(secondGroup) {
            secondGroup.expand();

            //  Verifying if "Portfolio" is expanded
            secondGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                secondGroup.getGroupByText('Passive Weighted Portfolio').then(function(columnName) {
                  columnName.select();

                  // Verifying if "Passive Weighted Portfolio" is selected
                  columnName.isSelected().then(function(selected) {
                    if (!selected) {
                      expect(false).customError();
                      CommonFunctions.takeScreenShot();
                    }
                  });
                });
              }
            });
          });
        }
      });

    });

    it('Should click on right arrow button to add "Passive Weighted Total Return" to "Selected" list', function() {
      // Click on the right arrow button
      TileOptionsColumns.getArrowButton('right').click();
    });

    it('Should check if "Passive Weighted Total Return" is added to the "Selected" list', function() {
      var myArray = [];
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Portfolio Name');
      var children = group.getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Passive Weighted Total Return') === -1) {
          expect(false).customError('"Passive Weighted Total Return" is not added to the selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Passive Purchase Total Return" from FactSet|Decision Analysis - Beta|Passive Purchase Portfolio', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');
      group.isExpanded().then(function(expanded) {
        if (expanded) {

          // Expanding "Portfolio"
          group.getGroupByText('Decision Analysis - Beta').then(function(secondGroup) {

            //  Verifying if "Portfolio" is expanded
            secondGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                secondGroup.getGroupByText('Passive Purchase Portfolio').then(function(columnName) {
                  columnName.select();

                  // Verifying "Passive Purchase Total Return" is selected
                  columnName.isSelected().then(function(selected) {
                    if (!selected) {
                      expect(false).customError();
                      CommonFunctions.takeScreenShot();
                    }
                  });
                });
              }
            });
          });
        }
      });
    });

    it('Should click on right arrow button to add "Passive Purchase Portfolio" to "Selected" list', function() {
      // Click on the right arrow button
      TileOptionsColumns.getArrowButton('right').click();
    });

    it('Should check if "Passive Purchase Portfolio" is added to the "Selected" list', function() {
      var myArray = [];
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Portfolio Name');
      var children = group.getChildrenText();
      children.then(function(childArr) {
        //console.log(childArr);
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Passive Purchase Total Return') === -1) {
          expect(false).customError('"Passive Purchase Total Return" is not added to the selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrTotalReturn = ['Positioning Decision', 'Purchasing Decision', 'Selling Decision'];

    it('Expand "FactSet > Decision Analysis - Beta> Total Return" from "Available" container and select "Positioning Decision", "Purchasing Decision" ' +
      'and "Selling Decision"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');
      group.isExpanded().then(function(expanded) {
        if (expanded) {

          // Expanding "Portfolio"
          group.getGroupByText('Decision Analysis - Beta').then(function(secondGroup) {

            //  Verifying if "Portfolio" is expanded
            secondGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                secondGroup.getGroupByText('Total Return').then(function(thirdGroup) {
                  thirdGroup.expand();
                  arrTotalReturn.forEach(function(columnName) {
                    thirdGroup.getItemByText(columnName).then(function(columnName) {
                      columnName.select();

                      // Verifying element is selected
                      columnName.isSelected().then(function(selected) {
                        if (!selected) {
                          expect(false).customError('"' + columnName + '" is not selected');
                          CommonFunctions.takeScreenShot();
                        } else {
                          TileOptionsColumns.getArrowButton('right').click();
                        }
                      });
                    });
                  });
                });
              }
            });
          });
        }
      });
    });

    var arrExcessReturn = ['Positioning Decision', 'Purchasing Decision', 'Selling Decision'];

    it('Expand "FactSet > Decision Analysis - Beta> Excess Return" from "Available" container and select "Positioning Decision", "Purchasing Decision" ' +
      'and "Selling Decision"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');
      group.isExpanded().then(function(expanded) {
        if (expanded) {

          // Expanding "Portfolio"
          group.getGroupByText('Decision Analysis - Beta').then(function(secondGroup) {

            //  Verifying if "Portfolio" is expanded
            secondGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                secondGroup.getGroupByText('Excess Return').then(function(thirdGroup) {
                  thirdGroup.expand();
                  arrExcessReturn.forEach(function(columnName) {
                    thirdGroup.getItemByText(columnName).then(function(columnName) {
                      columnName.select();

                      // Verifying element is selected
                      columnName.isSelected().then(function(selected) {
                        if (!selected) {
                          expect(false).customError('"' + columnName + '" is not selected');
                          CommonFunctions.takeScreenShot();
                        } else {
                          TileOptionsColumns.getArrowButton('right').click();
                        }
                      });
                    });
                  });
                });
              }
            });
          });
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

    it('Verifying if loading swirl is displayed', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Passive Weighted + Passive Purchase" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Passive Weighted + Passive Purchase').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Passive Weighted + Passive Purchase" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Passive Weighted + Passive Purchase')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

      browser.sleep(3000);

    });

    it('Storing "Total" values for all the securities', function() {
      SlickGridFunctions.getRowData('Passive Weighted + Passive Purchase', 'Total', '').then(function(rowData) {
        rowData.forEach(function(val) {
          arrData1.push(val);
        });
      });

      SlickGridFunctions.getColumnNames('Passive Weighted + Passive Purchase').then(function(columnNames) {
        columnNames.forEach(function(name) {
          arrNames1.push(name);
        });
      });
    });

    it('Storing the values of "Passive Weighted Total Return", "Passive Purchase Total Return","Positioning Decision", "Purchasing Decision" and "Selling Decision" for comparing', function() {
      arrNames1.forEach(function(name, index) {
        if (name === 'Passive Purchase Total Return' || name === 'Purchasing Decision' || name === 'Selling Decision') {
          arrOfValues1.push(arrData1[index]);
        }
      });

      arrNames1.forEach(function(name, index) {
        if (name === 'Passive Weighted Total Return' || name === 'Positioning Decision') {
          arrOfValues2.push(arrData1[index]);
        }
      });

    });
  });

  describe('Test Step ID: 606212', function() {

    it('Should click on the "Wrench" icon in the "Passive Weighted + Passive Purchase" report workspace', function() {
      PA3MainPage.selectWrenchIcon('Passive Weighted + Passive Purchase');
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Passive Weighted + Passive Purchase" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Passive Weighted + Passive Purchase') {
          expect(false).customError('"Tile Options - Passive Weighted + Passive Purchase" view has not appeared. ' +
            'Expected: "Tile Options - Passive Weighted + Passive Purchase" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Passive Weighted Total Return" from Selected section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Portfolio Name');
      group.isExpanded().then(function(expanded) {
        if (expanded) {

          // Select "Passive Weighted Total Return"
          group.getItemByText('Passive Weighted Total Return').then(function(columnName) {
            columnName.select();

            // Verifying "Passive Purchase Total Return" is selected
            columnName.isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError();
                CommonFunctions.takeScreenShot();
              }
            });
          });
        }
      });
    });

    it('Should expand "Additional Options" in "Options" pane', function() {
      expect(TileOptionsColumns.expandSectionInOptionsPane('Additional Options')).toBeTruthy();
    });

    it('Verifying if "Decision Analytics" options is present in the "Additional Options"', function() {
      var xpathOfDecisionAnalysis = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfAdditionalOptionsSubSection, 'DECISION ANALYSIS');
      element(by.xpath(xpathOfDecisionAnalysis)).isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Decision Analytics" options is not present in the "Additional Options"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Holding Period" options is present in the "Additional Options"', function() {
      element(by.xpath(TileOptionsColumns.xpathOfHoldingPeriod)).isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Holding Period" options is not present in the "Additional Options"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Holding Frequency" dropdown is present', function() {
      ThiefHelpers.isPresent('dropdown', 'Holding Frequency').then(function(found) {
        if (!found) {
          expect(false).customError('"Holding Frequency" checkbox is not present');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Fix Cash Weight" checkbox is present', function() {
      ThiefHelpers.isPresent('Checkbox', 'Fix Cash Weight').then(function(found) {
        if (!found) {
          expect(false).customError('"Fix Cash Weight" checkbox is not present');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Set Min Holding Period" checkbox is present', function() {
      ThiefHelpers.isPresent('Checkbox', undefined, TileOptionsColumns.xpathOfSetMinHoldingPeriod).then(function(found) {
        if (!found) {
          expect(false).customError('"Set Min Holding Period" checkbox is not present');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if ""Holding Period"" is grayed out', function() {
      var eleRef = element(by.xpath(TileOptionsColumns.xpathOfHoldingPeriod + '/following-sibling::*'));
      eleRef.getAttribute('class').then(function(flag) {
        if (flag.indexOf('disabled') === -1) {
          expect(false).customError('"Holding Period" section is not grayed out');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Holding Frequency" dropdown is grayed out', function() {
      var eleRef = element(by.xpath(TileOptionsColumns.xpathOfHoldingFrequency));
      eleRef.getAttribute('class').then(function(flag) {
        if (flag.indexOf('disabled') === -1) {
          expect(false).customError('"Holding Frequency" section is not grayed out');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 606213', function() {

    it('Should select "Passive Purchase Total Return" from Selected section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Portfolio Name');
      group.isExpanded().then(function(expanded) {
        if (expanded) {

          // Select "Passive Purchase Total Return"
          group.getItemByText('Passive Purchase Total Return').then(function(columnName) {
            columnName.select();

            // Verifying "Passive Purchase Total Return" is selected from "Selected" section of "Options" pill
            columnName.isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError();
                CommonFunctions.takeScreenShot();
              }
            });
          });
        }
      });
    });

    it('Verifying if ""Holding Period"" is not grayed out', function() {
      var eleRef = element(by.xpath(TileOptionsColumns.xpathOfHoldingPeriod + '/following-sibling::*'));
      eleRef.getAttribute('class').then(function(flag) {
        if (flag.indexOf('disabled') > -1) {
          expect(false).customError('"Holding Period" section is grayed out');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Holding Frequency" dropdown is not grayed out', function() {
      var eleRef = element(by.xpath(TileOptionsColumns.xpathOfHoldingFrequency));
      eleRef.getAttribute('class').then(function(flag) {
        if (flag.indexOf('disabled') > -1) {
          expect(false).customError('"Holding Frequency" section is grayed out');
          CommonFunctions.takeScreenShot();
        }
      });

      // Performing Mouse Move so that "Passive Weighted Total Return" is visible
      browser.actions().mouseMove(element(by.xpath(TileOptionsColumns.xpathOfHoldingFrequency))).perform();
    });
  });

  describe('Test Step ID: 606219', function() {

    it('Should select "Passive Weighted Total Return" from Selected section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Portfolio Name');
      group.isExpanded().then(function(expanded) {
        if (expanded) {

          // Select "Passive Weighted Total Return"
          group.getItemByText('Passive Weighted Total Return').then(function(columnName) {
            columnName.select();

            // Verifying "Passive Purchase Total Return" is selected
            columnName.isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError();
                CommonFunctions.takeScreenShot();
              }
            });
          });
        }
      });
    });

    it('Should select bottom most "Selling Decision" from the selected list By Holding the SHIFT key', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Portfolio Name');
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfSelectedSection, 'Portfolio Name', 'Selling Decision', 'last').then(function(indexOfElement) {
            var element = group.getItemByIndex(indexOfElement);
            element.then(function(ele) {
              ele.select(false, true);
            });

          }, function(error) {
            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"Portfolio Name" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Change the "Holding Period" value to "8"', function() {
      var xpath = TileOptionsColumns.xpathOfHoldingPeriod + '/following-sibling::*//tf-textbox';
      ThiefHelpers.getTextBoxClassReference(undefined, xpath).setText('8');

      // Verifying that "Demo" is typed into the "Name" field
      ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(text) {
        if (text !== '8') {
          expect(false).customError('"Testing" is not present in the "Name" field');
          CommonFunctions.takeScreenShot();
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

    it('Verifying if loading swirl is displayed', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Passive Weighted + Passive Purchase" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Passive Weighted + Passive Purchase').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Passive Weighted + Passive Purchase" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Passive Weighted + Passive Purchase')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

      browser.sleep(3000);

    });

    it('Storing "Total" values for all the securities', function() {
      SlickGridFunctions.getRowData('Passive Weighted + Passive Purchase', 'Total', '').then(function(rowData) {
        rowData.forEach(function(val) {
          arrData2.push(val);
        });
      });

      SlickGridFunctions.getColumnNames('Passive Weighted + Passive Purchase').then(function(columnNames) {
        columnNames.forEach(function(name) {
          arrNames2.push(name);
        });
      });
    });

    it('Storing "U.S Dollar" values for all the securities', function() {
      SlickGridFunctions.getRowData('Passive Weighted + Passive Purchase', 'U.S. Dollar', '').then(function(rowData) {
        rowData.forEach(function(val) {
          arrDataOfUSDollers1.push(val);
        });
      });

      SlickGridFunctions.getColumnNames('Passive Weighted + Passive Purchase').then(function(columnNames) {
        columnNames.forEach(function(name) {
          arrNamesOfUSDollers1.push(name);
        });
      });
    });

    it('Storing the "U.S Doller" values of "Positioning Decision", "Purchasing Decision" and "Selling Decision" for comparing', function() {
      arrNamesOfUSDollers1.forEach(function(name, index) {
        if (name === 'Selling Decision' || name === 'Positioning Decision') {
          arrValuesOfUSDollers1.push(arrDataOfUSDollers1[index]);
        } else if (name === 'Purchasing Decision') {
          arrPurchasingDecision1.push(arrDataOfUSDollers1[index]);
        }
      });

    });

    it('Storing the values "Total" of "Passive Weighted Total Return", "Passive Purchase Total Return","Positioning Decision", "Purchasing Decision" and "Selling Decision" for comparing', function() {
      arrNames2.forEach(function(name, index) {
        if (name === 'Passive Purchase Total Return' || name === 'Purchasing Decision' || name === 'Selling Decision') {
          arrOfValues3.push(arrData2[index]);
        }
      });

      arrNames2.forEach(function(name, index) {
        if (name === 'Passive Weighted Total Return' || name === 'Positioning Decision') {
          arrOfValues4.push(arrData2[index]);
        }
      });

      arrNames2.forEach(function(name, index) {
        if (name === 'Passive Purchase Total Return' || name === 'Purchasing Decision' || name === 'Selling Decision' || name === 'Passive Weighted Total Return' || name === 'Positioning Decision') {
          arrOfValues5.push(arrData2[index]);
        }
      });

    });

    it('Verifying if "Total" values of "Passive Purchase Total Return", "Purchasing Decision" and "Selling Decision" are not same as the values in previous report', function() {
      for (var i = 0; i < arrOfValues1.length; i++) {
        if (arrOfValues1[i] === arrOfValues3[i]) {
          expect(false).customError('Values of "Passive Purchase Total Return", "Purchasing Decision" and "Selling Decision" are same as the values in previous report');
          CommonFunctions.takeScreenShot();
        }
      }
    });

    it('Verifying if values of "Passive Weighted Total Return" and "Positioning Decision" are same as the values in previous report', function() {
      for (var i = 0; i < arrOfValues2.length; i++) {
        if (arrOfValues2[i] !== arrOfValues4[i]) {
          expect(false).customError('Values of "Passive Weighted Total Return" and "Positioning Decision" are not same as the values in previous report');
          CommonFunctions.takeScreenShot();
        }
      }
    });
  });

  describe('Test Step ID: 606221', function() {

    it('Should click on the "Wrench" icon in the "Passive Weighted + Passive Purchase" report workspace', function() {
      PA3MainPage.selectWrenchIcon('Passive Weighted + Passive Purchase');
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Passive Weighted + Passive Purchase" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Passive Weighted + Passive Purchase') {
          expect(false).customError('"Tile Options - Passive Weighted + Passive Purchase" view has not appeared. ' +
            'Expected: "Tile Options - Passive Weighted + Passive Purchase" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Passive Weighted Total Return" from Selected section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Portfolio Name');
      group.isExpanded().then(function(expanded) {
        if (expanded) {

          // Select "Passive Weighted Total Return"
          group.getItemByText('Passive Weighted Total Return').then(function(columnName) {
            columnName.select();

            // Verifying "Passive Purchase Total Return" is selected
            columnName.isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError();
                CommonFunctions.takeScreenShot();
              }
            });
          });
        }
      });
    });

    it('Should select bottom most "Selling Decision" from the selected list By Holding the SHIFT key', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Portfolio Name');
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfSelectedSection, 'Portfolio Name', 'Selling Decision', 'last').then(function(indexOfElement) {
            var element = group.getItemByIndex(indexOfElement);
            element.then(function(element) {
              element.select(false, true);
            });

          }, function(error) {
            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"Portfolio Name" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Additional Options" in "Options" pane', function() {
      expect(TileOptionsColumns.expandSectionInOptionsPane('Additional Options')).toBeTruthy();
    });

    it('Should de-select "Fix Cash Weight" checkbox.', function() {
      ThiefHelpers.getCheckBoxClassReference('Fix Cash Weight').uncheck();
    });

    it('Verifying if the "Fix Cash Weight" checkbox is not selected', function() {
      ThiefHelpers.getCheckBoxClassReference('Fix Cash Weight').isChecked().then(function(selected) {
        if (selected) {
          expect(false).customError('"Fix Cash Weight" checkbox is still selected');
          CommonFunctions.takeScreenShot();
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

    it('Verifying if loading swirl is displayed', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Passive Weighted + Passive Purchase" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Passive Weighted + Passive Purchase').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Passive Weighted + Passive Purchase" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Passive Weighted + Passive Purchase')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

      browser.sleep(3000);

    });

    it('Storing "Total" values for all the securities', function() {
      SlickGridFunctions.getRowData('Passive Weighted + Passive Purchase', 'Total', '').then(function(rowData) {
        rowData.forEach(function(val) {
          arrData3.push(val);
        });
      });

      SlickGridFunctions.getColumnNames('Passive Weighted + Passive Purchase').then(function(columnNames) {
        columnNames.forEach(function(name) {
          arrNames3.push(name);
        });
      });
    });

    it('Storing the values of "Passive Weighted Total Return", "Passive Purchase Total Return","Positioning Decision", "Purchasing Decision" and "Selling Decision" for comparing', function() {
      arrNames3.forEach(function(name, index) {
        if (name === 'Passive Purchase Total Return' || name === 'Purchasing Decision' || name === 'Selling Decision' || name === 'Passive Weighted Total Return' || name === 'Positioning Decision') {
          arrOfValues6.push(arrData3[index]);
        }
      });

    });

    it('Verifying if "Total" values of "Passive Weighted Total Return", "Passive Purchase Total Return","Positioning Decision", "Purchasing Decision" and "Selling Decision" are not same as the values in previous report', function() {
      for (var i = 0; i < arrOfValues5.length; i++) {
        if (arrOfValues5[i] === arrOfValues6[i]) {
          expect(false).customError('Values of "Passive Weighted Total Return", "Passive Purchase Total Return","Positioning Decision", "Purchasing Decision" and "Selling Decision" are same as the values in previous report');
          CommonFunctions.takeScreenShot();
        }
      }
    });

    it('Storing "U.S Dollar" values for all the securities', function() {
      SlickGridFunctions.getRowData('Passive Weighted + Passive Purchase', 'U.S. Dollar', '').then(function(rowData) {
        rowData.forEach(function(val) {
          arrDataOfUSDollers2.push(val);
        });
      });

      SlickGridFunctions.getColumnNames('Passive Weighted + Passive Purchase').then(function(columnNames) {
        columnNames.forEach(function(name) {
          arrNamesOfUSDollers2.push(name);
        });
      });
    });

    it('Storing the "U.S Doller" values of "Positioning Decision", "Purchasing Decision" and "Selling Decision" for comparing', function() {
      arrNamesOfUSDollers2.forEach(function(name, index) {
        if (name === 'Selling Decision' || name === 'Positioning Decision') {
          arrValuesOfUSDollers2.push(arrDataOfUSDollers2[index]);
        } else if (name === 'Purchasing Decision') {
          arrPurchasingDecision2.push(arrDataOfUSDollers2[index]);
        }
      });

    });

    it('Verifying if "U.S Doller" values of "Positioning Decision" and "Selling Decision" are not same as the values in previous report', function() {
      for (var i = 0; i < arrOfValues5.length; i++) {
        if (arrOfValues5[i] === arrOfValues6[i]) {
          expect(false).customError('Values of "Positioning Decision" and "Selling Decision" are same as the values in previous report');
          CommonFunctions.takeScreenShot();
        }
      }
    });

    it('Verifying if "U.S Doller" values of "Purchasing Decision" are not same as the values in previous report', function() {
      if (arrPurchasingDecision1[1] === arrPurchasingDecision2[1]) {
        expect(false).customError('Values of "Purchasing Decision" are same as the values in previous report');
        CommonFunctions.takeScreenShot();
      }
    });

  });

});
