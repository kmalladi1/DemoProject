'use strict';

require(__dirname + '/../../../index.js');

var selectTabFromTileOptionsAndVerify = function(tabName, parentTab) {
  it('Should click on the "' + tabName + '" tab on the LHP of tile options', function() {
    ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, tabName, parentTab).select();

    // Verifying if tab is selected in the LHP
    ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, tabName, parentTab).isSelected().then(function(selected) {
      if (!selected) {
        expect(false).customError('"' + tabName + '" tab is not selected in the LHP.');
        CommonFunctions.takeScreenShot();
      }
    });
  });
};

var verifyOrderOfElementsAndItsStatus = function(arrayOfElements) {
  it('Should verify if elements in selected container displayed as "' + arrayOfElements + '" in order and except first other elements are grayed out', function() {
    var childArrayAfter = [];
    return TileOptionsGroupings.getAllElements('Selected').then(function(reference) {
      reference.forEach(function(itemRef, index) {
        itemRef.getText().then(function(itemName) {
          childArrayAfter.push(itemName);
          if (itemName !== arrayOfElements[index]) {
            expect(false).customError(arrayOfElements[index] + ' is expected to display at ' + index + ', Found: ' + itemName);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    }).then(function() {
      childArrayAfter.forEach(function(element, index) {
        if (index === 0) {
          expect(true).toBeTruthy();
        }else {
          TileOptionsGroupings.getSelectedSectionListItem(element, true).getCssValue('color').then(function(color) {
            if (color !== 'rgba(128, 128, 128, 1)') {
              expect(false).customError(element + ' at ' + index + ' is not displayed in gray color, Found: ' + color);
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });
    });
  });
};

describe('Test Case: matrix-tile1', function() {
  var selectedElements = ['Asset Class', 'Currency', 'Country of Exchange - FactSet'];

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  var selectAndVerifyDefaultOptionsSetToDropDown = function(elementToSelect) {

    it('Should select "' + elementToSelect + '" from the "Selected" container', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(elementToSelect);
      item.select();

      // Check if 'Savings Banks' is selected
      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"' + elementToSelect + '" is not selected from "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Correlated Specific Risk" drop down is set to "Disabled" by default in "Risk" section', function() {
      // Verifying if Enabled is selected from the drop down
      ThiefHelpers.verifySelectedDropDownText('Disabled', 'Correlated Specific Risk');
    });

    it('Should verify if "Diagonal Elements" drop down is set to "Ones" by default in "Risk" section', function() {
      // Verifying if Enabled is selected from the drop down
      ThiefHelpers.verifySelectedDropDownText('Ones', 'Diagonal Elements');
    });

    it('Should open "Diagonal Elements" drop down from "Definition" section', function() {
      ThiefHelpers.getDropDownSelectClassReference('Diagonal Elements').open();
    });

    var arrDropDownOptions = ['Ones', 'Standard Deviation'];

    it('Should verify if "' + arrDropDownOptions + '" options are present in the "Diagonal Elements" drop-down', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(ddElements) {
        ddElements.forEach(function(optionName, index) {
          if (optionName !== arrDropDownOptions[index]) {
            expect(false).customError('Expected "' + arrDropDownOptions[index] + '" in drop down but Found: "' + optionName + '".');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    // Performing the below action to dismiss the drop down menu
    it('Should click on the "Columns" tab on the LHP of tile options to dismiss the drop down menu', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').select();

      // Verifying if "Columns" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Columns" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  };

  describe('Test Step ID: 807130', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:/pa3/risk/Matrix_Tile1" document from file dialog', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('matrix-tile1');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Matrix Tile');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var arrValues = [{name: 'Portfolio', val: 'CLIENT:/PA3/RISK/FCM_MM_MLOT_GLOBAL.ACTM', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'Benchmark', val: 'SPN:OEX', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });
  });

  describe('Test Step ID: 807131', function() {

    // Select Dates tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Matrix Tile', 'Dates');

    var checkBoxArray = ['Start Date Relative To End Date', 'Use Actual Frequencies'];

    checkBoxArray.forEach(function(checkBoxName) {
      it('Should verify if "' + checkBoxName + '" checkbox is disabled(grayed out)', function() {
        ThiefHelpers.verifyStatusOfCheckbox(checkBoxName, undefined, 'isdisabled');
      });
    });

    var dropDownArray = ['Report Frequency:', 'Date Order:'];

    dropDownArray.forEach(function(dropDownName) {
      it('Should verify if "' + dropDownName + '" is disabled(grayed out)', function() {
        ThiefHelpers.getDisableableClassReference(ThiefHelpers.getDropDownSelectClassReference(dropDownName)).isDisabled().then(function(disabled) {
          if (!disabled) {
            expect(false).customError('"' + dropDownName + '" is not disabled');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should verify if "Rolling Period" is disabled(grayed out)', function() {
      ThiefHelpers.getDisableableClassReference(ThiefHelpers.getTextBoxClassReference('Rolling Period:')).isDisabled().then(function(disabled) {
        if (!disabled) {
          expect(false).customError('"Rolling Period" is not disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 807132', function() {

    selectTabFromTileOptionsAndVerify('Groupings');

    it('Should double click on "Currency" under "FactSet" directory', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfAvailableContainer, 'Currency', 'FactSet').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Should expand "Sector & Industry > Factset" and double click on "Economic Sector" from the "Available" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(TileOptionsGroupings.xpathAvailableContainer, 'Country of Exchange', 'FactSet|Country & Region|FactSet', 'FactSet').then(function(reference) {
        browser.actions().doubleClick(reference).perform();
      });
    });

    verifyOrderOfElementsAndItsStatus(selectedElements);
  });

  describe('Test Step ID: 807133', function() {
    var updatedElementsAfterDrag1 = ['Currency','Country of Exchange - FactSet', 'Asset Class'];
    var updatedElementsAfterDrag2 = ['Country of Exchange - FactSet', 'Asset Class', 'Currency'];

    it('Should drag "Client Portfolio" to last position in selected container', function() {
      var source = TileOptionsGroupings.getSelectedSectionListItem('Asset Class');
      var target = TileOptionsGroupings.getAllElements('Selected').get(2);

      CommonPageObjectsForPA3.dragItemOrGroupFromSourceAndDropUnderTarget(source, target);
    });

    verifyOrderOfElementsAndItsStatus(updatedElementsAfterDrag1);

    it('Should drag "Client Portfolio" to last position in selected container', function() {
      var source = TileOptionsGroupings.getSelectedSectionListItem('Currency');
      var target = TileOptionsGroupings.getAllElements('Selected').get(2);

      CommonPageObjectsForPA3.dragItemOrGroupFromSourceAndDropUnderTarget(source, target);
    });

    verifyOrderOfElementsAndItsStatus(updatedElementsAfterDrag2);

    it('Should click on "Clear All" button from Selected section', function() {
      ThiefHelpers.getTransferBoxReference(TileOptionsGroupings.xpathOfTransferBox).target.clear();
    });

    it('Should verify if selected container is empty', function() {
      TileOptionsGroupings.getAllElements('Selected').count().then(function(count) {
        if (count !== 0) {
          expect(false).customError('"Selected" section is not empty, Found:' + count);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click on "Asset Class" from "FactSet" directory', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfAvailableContainer, 'Asset Class', 'FactSet').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Should verify is "Warning" icon is not displayed above the selected section', function() {
      ThiefHelpers.isPresent(undefined, undefined, TileOptionsGroupings.xpathSelectedSectionWarningIcon).then(function(isDisplayed) {
        if (isDisplayed) {
          expect(false).customError('"Warning" icon is displayed above the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click on "Currency" from "FactSet" directory', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfAvailableContainer, 'Currency', 'FactSet').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Should verify is "Warning" icon is displayed above the selected section', function() {
      ThiefHelpers.isPresent(undefined, undefined, TileOptionsGroupings.xpathSelectedSectionWarningIcon).then(function(isDisplayed) {
        if (!isDisplayed) {
          expect(false).customError('"Warning" icon is not displayed above the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on warning button(yellow triangle icon)', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsGroupings.xpathSelectedSectionWarningIcon).press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on warning button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if warning info box is displayed with "Some grouping levels in your settings will not be shown in the report." message', function() {
      Utilities.getInfoBoxClassReference().getContent().getText().then(function(text) {
        if (text !== 'Some grouping levels in your settings will not be shown in the report.') {
          expect(false).customError('Info box text is not displayed as expected, Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 807134', function() {
    var benchmarkIdIndex;
    var benchmarkID2;

    selectTabFromTileOptionsAndVerify('Columns');

    var riskCategories = ['Correlation Matrix', 'Covariance Matrix'];

    it('Should verify if "' + riskCategories + '" are displayed under FactSet > Risk', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Risk').then(function(subGroup) {
            subGroup.expand();

            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getChildrenText().then(function(childArray) {
                  if (childArray.length !== 2) {
                    expect(false).customError('FactSet > Risk is expected to display with 2 categories, Found: ' + childArray.length);
                    CommonFunctions.takeScreenShot();
                  } else {
                    riskCategories.forEach(function(columnName, index) {
                      if (childArray[index].group !== true && riskCategories.indexOf(childArray[index].text) !== -1) {
                        expect(false).customError(childArray[index].text + ' is not expected to display or the ' + riskCategories + ' categories are not displayed as groups');
                        CommonFunctions.takeScreenShot();
                      }
                    });
                  }
                });
              } else {
                expect(false).customError('"Risk" is not expanded under "FactSet"');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"FactSet" is not expanded in the "Available" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Clear All" button from Selected section', function() {
      ThiefHelpers.getTransferBoxReference(TileOptionsColumns.xpathOfTransferBox).target.clear();
    });

    var arrOptions = ['Portfolio Specific Covariance Matrix', 'Portfolio Total Covariance Matrix'];
    it('Should perform double click on "' + arrOptions + '" under FactSet -> Risk -> Covariance Matrix ', function() {

      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Risk').then(function(subGroup) {
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Covariance Matrix').then(function(subGroup1) {
                  subGroup1.expand();

                  subGroup1.isExpanded().then(function(isExpanded) {
                    if (isExpanded) {
                      arrOptions.forEach(function(listItemText) {
                        subGroup1.getItemByText(listItemText).then(function(listItem) {
                          listItem.select();
                          listItem.doubleClick();
                        });
                      });
                    }else {
                      expect(false).customError('"Covariance Matrix" is not expanded');
                      CommonFunctions.takeScreenShot();
                    }
                  });
                });
              } else {
                expect(false).customError('"Risk" is not expanded under "FactSet"');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"FactSet" is not expanded in the "Available" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should perform double click on "Benchmark Specific Correlation Matrix" under FactSet -> Risk -> Correlation Matrix', function() {

      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Risk').then(function(subGroup) {
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Correlation Matrix').then(function(subGroup1) {
                  subGroup1.expand();

                  subGroup1.isExpanded().then(function(isExpanded) {
                    if (isExpanded) {
                      subGroup1.getItemByText('Benchmark Specific Correlation Matrix').then(function(listItem) {
                        listItem.select();
                        listItem.doubleClick();
                      });
                    }else {
                      expect(false).customError('"Correlation Matrix" is not expanded');
                      CommonFunctions.takeScreenShot();
                    }
                  });
                });
              } else {
                expect(false).customError('"Risk" is not expanded under "FactSet"');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"FactSet" is not expanded in the "Available" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var selectedItems = ['Portfolio Specific Covariance Matrix', 'Portfolio Total Covariance Matrix', 'Benchmark Specific Correlation Matrix'];

    selectedItems.forEach(function(element) {
      it('Should verify if "' + element + '" from Selected section is displayed as radio button and "Portfolio Specific Covariance Matrix" is selected by default', function() {
        var selectedItem = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(element);

        selectedItem.getSubElement('tf-radio').then(function(radioButtonRef) {
          if (element === 'Portfolio Specific Covariance Matrix') {
            ThiefHelpers.getRadioClassReference(undefined, radioButtonRef).isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError('"Portfolio Specific Covariance Matrix" radio button is not selected by default');
                CommonFunctions.takeScreenShot();
              }
            });
          }
        }, function() {
          expect(false).customError('"' + element + '" is not displayed as radio button');
          CommonFunctions.takeScreenShot();
        });
      });
    });

    var myArray = [];

    it('Should fetch elements from Selected container for future reference', function() {
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }
      });
    });

    it('Should select "Portfolio Specific Covariance Matrix" from the "Selected" container', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Portfolio Specific Covariance Matrix');
      item.select();

      // Verify if 'Portfolio Specific Covariance Matrix' is selected
      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Portfolio Specific Covariance Matrix" did not selected from "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should drag "Portfolio Specific Covariance Matrix" from selected section and drop it all the way to bottom', function() {
      var source = element(by.xpath(CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedSctionsItem, 'Portfolio Specific Covariance Matrix')));
      var target = element(by.xpath(CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedSctionsItem, myArray[myArray.length - 1])));

      ThiefHelpers.dragDrop(source, target, 'into');
    });

    it('Should verify if "Portfolio Specific Covariance Matrix" is moved to bottom of the list in "Selected" section', function() {
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          if (childArr[i].text === 'Portfolio Specific Covariance Matrix') {
            if (i !== (childArr.length - 1)) {
              expect(false).customError('"Portfolio Specific Covariance Matrix" is not moved to bottom of the list');
              CommonFunctions.takeScreenShot();
            }
          }
        }
      });
    });

    selectedItems.forEach(function(element) {
      it('Should verify if "' + selectedItems + '" is not selected in Selected section except "Portfolio Specific Covariance Matrix"', function() {
        var selectedItem = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(element);

        selectedItem.getSubElement('tf-radio').then(function(radioButtonRef) {
          if (element === 'Portfolio Specific Covariance Matrix') {
            ThiefHelpers.getRadioClassReference(undefined, radioButtonRef).isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError('"Portfolio Specific Covariance Matrix" radio button is not selected after performed drag');
                CommonFunctions.takeScreenShot();
              }
            });
          } else {
            ThiefHelpers.getRadioClassReference(undefined, radioButtonRef).isSelected().then(function(selected) {
              if (selected) {
                expect(false).customError('"' + element + '" radio button is selected after performed drag');
                CommonFunctions.takeScreenShot();
              }
            });
          }
        });
      });
    });

    it('Should select radio button of "Portfolio Total Covariance Matrix" from Selected section and verify', function() {
      var selectedItem = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Portfolio Total Covariance Matrix');

      selectedItem.getSubElement('tf-radio').then(function(radioButtonRef) {
        ThiefHelpers.getRadioClassReference(undefined, radioButtonRef).select();
      });
    });

    selectedItems.forEach(function(element) {
      it('Should verify if "' + selectedItems + '" is not selected in Selected section except "Portfolio Total Covariance Matrix"', function() {
        var selectedItem = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(element);

        selectedItem.getSubElement('tf-radio').then(function(radioButtonRef) {
          if (element === 'Portfolio Total Covariance Matrix') {
            // Verifying if "Last Cash Flow" radio button is selected
            ThiefHelpers.getRadioClassReference(undefined, radioButtonRef).isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError('"Portfolio Total Covariance Matrix" radio button is not selected');
                CommonFunctions.takeScreenShot();
              }
            });
          } else {
            ThiefHelpers.getRadioClassReference(undefined, radioButtonRef).isSelected().then(function(selected) {
              if (selected) {
                expect(false).customError('"Portfolio Total Covariance Matrix" is not selected, Found: "' + element + '" is selected');
                CommonFunctions.takeScreenShot();
              }
            });
          }
        });
      });
    });

    it('Should select "Benchmark (ID)" present just above the "Portfolio Total Covariance Matrix" from "Selected" section', function() {
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        childArr.forEach(function(listItem, index) {
          if (listItem.text === 'Portfolio Total Covariance Matrix') {
            benchmarkIdIndex = (index - 1);
          }
        });
      }).then(function() {
        var itemRef = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByIndex(benchmarkIdIndex);
        itemRef.getText().then(function(text) {
          if (text !== 'Benchmark (ID)') {
            expect(false).customError('"Benchmark (ID)" is not displayed above the "Portfolio Total Covariance Matrix", Found: ' + text);
            CommonFunctions.takeScreenShot();
          }else {
            itemRef.select();

            itemRef.isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError('"Benchmark (ID)" is not selected in the "Selected" container');
                CommonFunctions.takeScreenShot();
              }
            });
          }
        });
      });
    });

    it('Should expand "Definition" in "Options" pane', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Definition').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Definition" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should open drop down from "Definition" section', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsColumns.xpathDefinitionDropDown).open();
    });

    var arrDropDownOptions = ['Portfolio vs Benchmark (Name)', 'Portfolio vs Benchmark (ID)', 'Portfolio (Name)', 'Portfolio (ID)', 'Benchmark (Name)', 'Benchmark (ID)'];

    it('Verify if expected options are present in the "Reset Frequency" drop-down', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(ddElements) {
        ddElements.forEach(function(optionName, index) {
          if (optionName !== arrDropDownOptions[index]) {
            expect(false).customError('Expected "' + arrDropDownOptions[index] + '" in drop down but Found: "' + optionName + '".');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should select "Portfolio vs Benchmark (Name)" from "Definition" Section dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Portfolio vs Benchmark (Name)', undefined, TileOptionsColumns.xpathDefinitionDropDown);

      // verifying if 'Portfolio vs Benchmark (Name)' is selected from "Definition" section drop down
      ThiefHelpers.verifySelectedDropDownText('Portfolio vs Benchmark (Name)', undefined, TileOptionsColumns.xpathDefinitionDropDown);
    });

    it('Should verify if "Benchmark (ID)" is change to "Portfolio vs Benchmark (Name)"', function() {
      var itemRef = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByIndex(benchmarkIdIndex);
      itemRef.getText().then(function(text) {
        if (text !== 'Portfolio vs Benchmark (Name)') {
          expect(false).customError('"Benchmark (ID)" is not changed to "Portfolio vs Benchmark (Name)", Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Portfolio Specific Covariance Matrix" is moved to bottom of the list in "Selected" section', function() {
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          if (childArr[i].text === 'Benchmark (ID)') {
            benchmarkID2 = i;
          }
        }
      });
    });

    it('Should select "Benchmark (ID)" from the selected section', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByIndex(benchmarkID2);
      item.select();

      // Verifying if "Benchmark (ID)" is selected in the selected section
      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Benchmark (ID)" is not selected from "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Benchmark (Name)" from "Definition" Section dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Benchmark (Name)', undefined, TileOptionsColumns.xpathDefinitionDropDown);

      // verifying if 'Benchmark (Name)' is selected from "Definition" section drop down
      ThiefHelpers.verifySelectedDropDownText('Benchmark (Name)', undefined, TileOptionsColumns.xpathDefinitionDropDown);
    });

    it('Should verify if "Benchmark (ID)" is change to "Benchmark (Name)"', function() {
      var itemRef = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByIndex(benchmarkID2);
      itemRef.getText().then(function(text) {
        if (text !== 'Benchmark (Name)') {
          expect(false).customError('"Benchmark (ID)" is not changed to "Benchmark (Name)", Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 807135', function() {

    it('Should click on "Clear All" button from Selected section', function() {
      ThiefHelpers.getTransferBoxReference(TileOptionsColumns.xpathOfTransferBox).target.clear();
    });

    // FYI: consolidated actions from this step and automated the step. i.e Added all elements mentioned in step first and verified expected result later

    var selectedItems = ['Active Total Correlation Matrix', 'Active Specific Correlation Matrix', 'Active Factor Correlation Matrix'];

    it('Should double click on "' + selectedItems + '" under FactSet > Risk > Correlation Matrix from available section', function() {

      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Risk').then(function(subGroup) {
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Correlation Matrix').then(function(subGroup1) {
                  subGroup1.isExpanded().then(function(isExpanded) {
                    if (isExpanded) {
                      selectedItems.forEach(function(listItemText) {
                        subGroup1.getItemByText(listItemText).then(function(listItem) {
                          listItem.select();
                          listItem.doubleClick();
                        });
                      });
                    }else {
                      expect(false).customError('"Correlation Matrix" is not expanded');
                      CommonFunctions.takeScreenShot();
                    }
                  });
                });
              } else {
                expect(false).customError('"Risk" is not expanded under "FactSet"');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"FactSet" is not expanded in the "Available" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify "' + selectedItems + '" are added to selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        selectedItems.forEach(function(element) {
          if (myArray.indexOf(element) === -1) {
            expect(false).customError('"' + element + '" is not added to the selected section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should expand "Risk" section from "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Risk').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Risk" section is not expanded from "Accordion" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    selectAndVerifyDefaultOptionsSetToDropDown('Active Total Correlation Matrix');

    selectAndVerifyDefaultOptionsSetToDropDown('Active Specific Correlation Matrix');

    it('Should select "Active Factor Correlation Matrix" from the "Selected" container', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Active Factor Correlation Matrix');
      item.select();

      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Active Factor Correlation Matrix" is not selected from "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Correlated Specific Risk" drop down is not present', function() {
      var xpathOfApplyButton = CommonFunctions.getXpath('dropdown', 'Correlated Specific Risk');
      element(by.xpath(xpathOfApplyButton)).isDisplayed().then(function(found) {
        if (found) {
          expect(false).customError('"Correlated Specific Risk" checkbox is displayed in "Risk" accordion');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Diagonal Elements" drop down is present', function() {
      ThiefHelpers.isPresent('dropdown', 'Diagonal Elements').then(function(found) {
        if (!found) {
          expect(false).customError('"Diagonal Elements" checkbox is not present in "Risk" accordion');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 807136', function() {
    var myArray = [];

    selectTabFromTileOptionsAndVerify('Risk Models', 'Risk');

    it('Should click on "Clear All" button from Selected section', function() {
      ThiefHelpers.getTransferBoxReference(TileOptionsRiskRiskModels.xpathTransferBox).target.clear();
    });

    // FYI: Performed step: 1,2,3 at once and verified their expected result later

    var enterSearchTextAndDoubleClickOnListItem = function(searchText, groupName, itemName) {
      it('Should enter "' + searchText + '" in the search field from Available section', function() {
        ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskRiskModels.xpathSearch).setText(searchText);

        // Verifying that searchText is typed into the search box
        ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskRiskModels.xpathSearch).getText().then(function(text) {
          if (text !== searchText) {
            expect(false).customError(searchText + ' is not typed into the search field.');
            CommonFunctions.takeScreenShot();
          }
        });

        // Wait for the Search Result to appear
        browser.sleep(2000);
      });

      it('Select "' + itemName + '" under "' + groupName + '" from the Available section', function() {
        var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathAvailableContainer).getGroupByText(groupName);

        group.getItemByText(itemName).then(function(item) {
          item.select();
          item.doubleClick();
        });
      });
    };

    enterSearchTextAndDoubleClickOnListItem('USE4L', 'Barra', 'Barra US Long-Term Model (USE4L)');

    enterSearchTextAndDoubleClickOnListItem('GEM3L', 'Barra', 'Barra Global Long-Term Model (GEM3L)');

    enterSearchTextAndDoubleClickOnListItem('FactSet linear', 'FactSet', 'FactSet Linear Multi-Asset Class Monthly Model');

    var selectedItems = ['Barra US Long-Term Model (USE4L)', 'Barra Global Long-Term Model (GEM3L)', 'FactSet Linear Multi-Asset Class Monthly Model'];

    it('Should verify "' + selectedItems + '" are added to selected section', function() {
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        selectedItems.forEach(function(element) {
          if (myArray.indexOf(element) === -1) {
            expect(false).customError('"' + element + '" is not added to the selected section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Select "Barra US Long-Term Model (USE4L)" from the "Selected" container', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByText('Barra US Long-Term Model (USE4L)');
      item.select();

      // Check if 'Savings Banks' is selected
      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Barra US Long-Term Model (USE4L)" did not selected from "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should drag "Barra US Long-Term Model (USE4L)" from available section and drop all the way to bottom of the container', function() {
      var source = element(by.xpath(CommonFunctions.replaceStringInXpath(TileOptionsRiskRiskModels.xpathOfSelectedSctionsItem, 'Barra US Long-Term Model (USE4L)')));
      var target = element(by.xpath(CommonFunctions.replaceStringInXpath(TileOptionsRiskRiskModels.xpathOfSelectedSctionsItem, myArray[myArray.length - 1])));

      ThiefHelpers.dragDrop(source, target, 'into');
    });

    it('Should verify if "Barra US Long-Term Model (USE4L)" is displayed at bottom of the list and still its radio button is selected', function() {
      var itemRef = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByIndex(myArray.length - 1);
      itemRef.getText().then(function(text) {
        if (text !== 'Barra US Long-Term Model (USE4L)') {
          expect(false).customError('"Barra US Long-Term Model (USE4L)" is not moved to bottom of container,Found: ' + text);
          CommonFunctions.takeScreenShot();
        }else {
          itemRef.getSubElement('tf-radio').then(function(radioButtonRef) {
            // Verifying if "Barra US Long-Term Model (USE4L)" radio button is selected
            ThiefHelpers.getRadioClassReference(undefined, radioButtonRef).isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError('"Barra US Long-Term Model (USE4L)" radio button is not selected after it moved to bottom of container');
                CommonFunctions.takeScreenShot();
              }
            });
          }, function() {
            expect(false).customError('"Barra US Long-Term Model (USE4L)" is not displayed as radio button');
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Should select radio button of "Barra Global Long-Term Model (GEM3L)" from Selected section and verify', function() {
      var selectedItem = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByText('Barra Global Long-Term Model (GEM3L)');

      selectedItem.getSubElement('tf-radio').then(function(radioButtonRef) {
        ThiefHelpers.getRadioClassReference(undefined, radioButtonRef).select();

        // Verifying if "Barra Global Long-Term Model (GEM3L)" radio button is selected
        ThiefHelpers.getRadioClassReference(undefined, radioButtonRef).isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Barra Global Long-Term Model (GEM3L)" radio button is not selected.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Matrix Tile');
  });
});
