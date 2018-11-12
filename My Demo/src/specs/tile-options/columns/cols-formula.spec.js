'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: cols-formula', function() {

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  var xpathOfFormulaTextArea = element(by.xpath(CreateEditCustomColumns.xpathOfFormulaTextArea));

  var indexOfTest1InPersonalBefore;
  var indexofTest2InQACategory;
  var tempText;
  var flag1;
  var flag2;

  // Local functions
  var expandPersonalGetTest1Column = function(actionName) {
    var item;
    var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
    group.expand();

    group.isExpanded().then(function(expanded) {
      if (expanded) {
        return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, undefined, 'Test1', 'last', group).then(function(indexOfElement) {
          item = group.getItemByIndex(indexOfElement);

          if (actionName === 'verify') {
            item.then(function(refOfItem) {
              refOfItem.getText().then(function(text) {
                if (text !== 'Test1') {
                  expect(false).customError('"Test1" is not present under personal');
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          } else {
            // Click on the required icon
            return item.then(function(refOfItem) {
              refOfItem.select();
              return refOfItem.getActions().then(function(val) {
                return val.triggerAction(actionName);
              });
            });
          }

        }, function(error) {
          expect(false).toBe(error);
          CommonFunctions.takeScreenShot();
        });
      } else {
        expect(false).customError('"Personal" is not expanded');
        CommonFunctions.takeScreenShot();
      }
    });
  };

  var expandClientQACategoryAndGetTest1Column = function(actionName) {
    var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client');

    // Expand "Client" frm "Available" container
    group.expand();

    group.isExpanded().then(function(expanded) {
      if (expanded) {
        group.getGroupByText('QA Category').then(function(subGroup) {
          subGroup.expand();
          subGroup.isExpanded().then(function(expanded) {
            if (expanded) {
              subGroup.getItemByText('Test1').then(function(refOfItem) {
                if (actionName === 'verify') {
                  refOfItem.getText().then(function(text) {
                    if (text !== 'Test1') {
                      expect(false).customError('"Test1" is not present under Client/QA Category');
                      CommonFunctions.takeScreenShot();
                    }
                  });
                } else {
                  refOfItem.getText().then(function(text) {
                    if (text !== 'Test1') {
                      expect(false).customError('"Test1" is not present under Client/QA Category');
                      CommonFunctions.takeScreenShot();
                    } else {
                      return refOfItem.getActions().then(function(val) {
                        return val.triggerAction('remove');
                      });
                    }
                  });
                }
              });
            } else {
              expect(false).customError('"QA Category" is not expanded');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      } else {
        expect(false).customError('"Client" is not expanded');
        CommonFunctions.takeScreenShot();
      }
    });

  };

  describe('Test Step ID: 706475', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:default_doc_auto"', function() {
      PA3MainPage.switchToDocument('default-doc-auto');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

  });

  describe('Test Step ID: 706476', function() {

    it('Should click on "Economic Sector" hyperlink', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - Weights" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Columns" tab on the LHP of tile options view', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').select();

      // Verifying if "Columns" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Columns" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicl on the "+" icon next to available section and select the option from the drop-down
    CommonPageObjectsForPA3.clickOnAddButtonAndSelectOptionFromDropdown('New/Reference', 'Columns');

    it('Verifying if the "New" radio button is selected', function() {
      ThiefHelpers.getRadioClassReference('New').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"New" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Begin typing to enter or search for a formula…" is displayed in the formula section', function() {
      element(by.xpath(CreateEditCustomColumns.xpathTextArea)).getText().then(function(text) {
        if (text !== 'Begin typing to enter or search for a formula…') {
          expect(false).customError('Expected formula section to display: "Begin typing to enter or search for a formula…" but Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }

      });
    });

  });

  describe('Test Step ID: 706477', function() {

    it('Should click in the Formula section', function() {
      browser.actions().mouseMove(CreateEditCustomColumns.getTabTextArea('Formula', 'New')).click().perform();
    });

    var arrOfDropdownItems = ['Recently Used', 'Popular Data Items'];
    arrOfDropdownItems.forEach(function(optionName) {
      it('Verify if the drop down appears with "' + optionName + '"', function() {
        // Getting the xpath of the Selected section
        var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(CreateEditCustomColumns.xpathOfFormulaSectionDropdown, optionName);

        element(by.xpath(xpathOfSelectedSection)).getText().then(function(text) {
          if (text !== optionName) {
            expect(false).customError(optionName + 'option is not present in the drop down.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 706478', function() {

    // Send text into the formula section and verify the text
    CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror('Formula', 'p_price', 'p_price', false);

    var categoryCount;

    it('Getting the count of all the options which are categorised by "Client"', function() {
      var eleRef = ThiefHelpers.getTypeaheadClassReference();
      var item = eleRef.get2dItemsByCategory('Client');
      item.then(function(items) {
        categoryCount = items.length;
      });
    });

    it('Verifying if drop down displayed with results having "P_PRICE"', function() {
      element.all(by.xpath(CreateEditCustomColumns.xpathOfTypeahead)).getText().then(function(arrOfOptions) {
        var count = 0;
        arrOfOptions.forEach(function(optionName) {
          if (optionName.indexOf('P_PRICE') === -1) {
            count++;
            if (count > categoryCount) {
              expect(false).customError('Drop down options does not contain "P_PRICE"');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });

    });
  });

  describe('Test Step ID: 706479', function() {

    // Select option from type-ahead and verify the same
    CommonPageObjectsForPA3.selectOptionFromTypeahead('P_PRICE(NOW)');

    // Verify if text is present in the formula section after selection option from typeahead
    CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror('Formula', undefined, 'P_PRICE(#ED,#CU)', true);

    it('Verify if "Arguments" tab is selected', function() {
      ThiefHelpers.getTabsClassReference(CreateEditCustomColumns.xpathOfArgumentsTile).getSelectedTabText().getText().then(function(tabName) {
        if (tabName !== 'Arguments') {
          expect(false).customError('"Arguments" tab is not selected. Found:"' + tabName + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Report Start Date" from "Date" drop down ', function() {
      ThiefHelpers.getDatepickerClassReference('Date').selectShortcutByText('Report Start Date');

      ThiefHelpers.getDatepickerClassReference('Date').getDate().then(function(text) {
        if (text !== 'Report Start Date') {
          expect(false).customError('Expected:"Report Start Date" but Found: "' + text + '" in the Date text box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Verify if text is present in the formula section after selection option from typeahead
    CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror('Formula', undefined, 'P_PRICE(#SD,#CU)', true);

    it('Verify if "Report Currency" is displayed in "Currency" text box', function() {
      var xpathOfCurrencyTextBox = CommonFunctions.replaceStringInXpath(CreateEditCustomColumns.xpathOfTextBox, 'Currency');
      ThiefHelpers.getTextBoxClassReference(undefined, xpathOfCurrencyTextBox).getText().then(function(text) {
        if (text !== 'Report Currency') {
          expect(false).customError('"Report Currency" is not present in "Currency" text box.  Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 706480', function() {

    it('Should select "Report End Date" from "Date" drop down ', function() {
      ThiefHelpers.getDatepickerClassReference('Date').selectShortcutByText('Report End Date');

      ThiefHelpers.getDatepickerClassReference('Date').getDate().then(function(text) {
        if (text !== 'Report End Date') {
          expect(false).customError('Expected:"Report End Date" but Found: "' + text + '" in the Date text box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Verify if text is present in the formula section after selection option from typeahead
    CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror('Formula', undefined, 'P_PRICE(#ED,#CU)', true);
  });

  describe('Test Step ID: 706481', function() {

    it('Should select "Report Start Date" from "Date" drop down ', function() {
      ThiefHelpers.getDatepickerClassReference('Date').selectShortcutByText('Report Start Date');

      ThiefHelpers.getDatepickerClassReference('Date').getDate().then(function(text) {
        if (text !== 'Report Start Date') {
          expect(false).customError('Expected:"Report Start Date" but Found: "' + text + '" in the Date text box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Verify if text is present in the formula section after selection option from typeahead
    CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror('Formula', undefined, 'P_PRICE(#SD,#CU)', true);

    // Append text to the existing text in the formula section
    CommonPageObjectsForPA3.appendTextInCodeMirrorAndVerify('+Dividend Yield', 'P_PRICE(#SD,#CU)+Dividend Yield');

    it('Wait for the type-ahead to appear', function() {
      var dropRef = element(by.xpath('//tf-dropdown'));
      CommonFunctions.waitUntilElementAppears(dropRef, 4000);
    });

    it('Select "Dividend Yield" from type-ahead', function() {
      var elementRef = element.all(by.xpath('//tf-dropdown//tf-typeahead-items//*[normalize-space(.)="Dividend Yield"]'));
      elementRef.click().then(function() {
      }, function(err) {
        if (err === 'stale element reference') {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for the "Arguments" tile to appear', function() {
      CommonFunctions.waitUntilElementAppears(element.all(by.xpath(CreateEditCustomColumns.xpathOfArgumentsTile)), 4000);
    });

    // Verify if text is present in the formula section after selection option from type-ahead
    CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror('Formula', undefined, 'P_PRICE(#SD,#CU)+P_DIV_YLD', true);
  });

  describe('Test Step ID: 706482', function() {

    // Enter formula into the section and select the option from type ahead and click on x Close button
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'PMWDB', true, 'Returns data from a specified column/field within a given portfolio', false, 'PMWDB(#PR,"",#ED,B,D,S,#CU,B,FIVEDAYEOM)');

    it('Verify if "Portfolio" is displayed in "Portfolio" text box', function() {
      var xpathOfPortfolioTextBox = CommonFunctions.replaceStringInXpath(CreateEditCustomColumns.xpathOfTextBox, 'Portfolio');
      ThiefHelpers.getTextBoxClassReference(undefined, xpathOfPortfolioTextBox).getText().then(function(text) {
        if (text !== 'Portfolio') {
          expect(false).customError('"Portfolio" is not present in "Portfolio" textbox');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrOfOptions = ['Portfolio', 'Benchmark'];

    it('Verifying if "Portfolio" and "Benchmark" are present in Portfolio drop-down', function() {
      var ref = element.all(by.xpath(CommonFunctions.replaceStringInXpath(CreateEditCustomColumns.xpathOfTextboxDropdownButton, 'Portfolio')));
      ThiefHelpers.getButtonClassReference(undefined, ref).press().then(function() {
        ThiefHelpers.getAllOptionsFromDropdown().then(function(ddElements) {
          ddElements.forEach(function(optionName) {
            if (arrOfOptions.indexOf(optionName) === -1) {
              expect(false).customError('"' + optionName + '" is not present in the "Portfolio" drop-down.');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      }, function() {

        expect(false).customError('Unable to click on portfolio drop-down.');
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 706483', function() {

    var xpathOfPortfolioTextBox = CommonFunctions.replaceStringInXpath(CreateEditCustomColumns.xpathOfTextBox, 'Portfolio');

    it('Should select "Benchmark" from "Portfolio" drop down ', function() {
      ThiefHelpers.getVirtualDropDownSelectClassReference(undefined, xpathOfPortfolioTextBox, true).selectItemByText('Benchmark').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Benchmark" is set in "Portfolio" input box
      ThiefHelpers.getTextBoxClassReference(undefined, xpathOfPortfolioTextBox).getText().then(function(text) {
        if (text !== 'Benchmark') {
          expect(false).customError('"Benchmark" is not set in "Portfolio" input box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Verify if text is present in the formula section after selection option from type-ahead
    CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror('Formula', undefined, 'PMWDB(#BN,"",#ED,B,D,S,#CU,B,FIVEDAYEOM)', true);

  });

  describe('Test Step ID: 706484', function() {

    it('Clear the text in the Formula section', function() {
      CommonPageObjectsForPA3.clearTextInCodeMirror();
    });

    it('Click on the "Browse" button', function() {
      ThiefHelpers.getButtonClassReference(undefined, CreateEditCustomColumns.xpathOfBrowseButton).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Browse" button.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify if pop up has appeared after clicking on "Browse" button', function() {
      var refOfPopUp = element(by.xpath(CreateEditCustomColumns.xpathOfPanel));
      refOfPopUp.isDisplayed().then(function(displayed) {
        if (!displayed) {
          expect(false).customError('Pop up has not appeared after clicking on "Browse" button');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Financial (NUM)" in "Available" section and Select "FactSet Fundamentals (NUM)" ', function() {
      //NUM = changes dynamically
      var group = ThiefHelpers.getVirtualListboxClassReference(CreateEditCustomGroupings.xpathOfGroupInAvailableSection);
      group.getChildrenText().then(function(tempArray) {
        flag1 = 0;
        tempArray.forEach(function(listItem) {
          if (listItem.text.indexOf('Financial') !== -1) {
            var subGroup = group.getGroupByText(listItem.text);
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getChildrenText().then(function(subGroupTempArray) {
                  flag2 = 0;
                  subGroupTempArray.forEach(function(subListItem) {
                    if (subListItem.text.indexOf('FactSet Fundamentals') !== -1) {
                      subGroup.getItemByText(subListItem.text).then(function(refOfItem) {
                        refOfItem.getText().then(function(text) {
                          if (text !== subListItem.text) {
                            expect(false).customError(subListItem.text + 'is not available');
                            CommonFunctions.takeScreenShot();
                          }
                        });
                        refOfItem.select();
                      });
                      flag2 = 1;
                    }
                  });
                  if (flag2 == 0) {

                    //FactSet Fundamentals (NUM) is not present
                    expect(false).customError('FactSet Fundamentals (NUM) is not present');
                    CommonFunctions.takeScreenShot();
                  }
                });
              } else {
                expect(false).customError('"Financial" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
            flag1 = 1;
          }
        });
        if (flag1 == 0) {

          //"Financial (NUM)" is not displayed in "Available" section
          expect(false).customError('"Financial (NUM)" is not displayed in "Available" section ');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "Sales" into the search field of pop up', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateEditCustomColumns.xpathOfPanelTextbox).setText('Sales');

      // Verifying that "Sales" is typed into the search box
      ThiefHelpers.getTextBoxClassReference(undefined, CreateEditCustomColumns.xpathOfPanelTextbox).getText().then(function(text) {
        if (text !== 'Sales') {
          expect(false).customError('"Sales" is not present in the search field of pop up.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the Search Result to appear
      browser.sleep(4000);
    });

    it('Should select "Sales" from the selected container', function() {
      ThiefHelpers.getVirtualListboxClassReference(CreateEditCustomGroupings.xpathOfSelectedSectionItem).getItemByText('Sales   FactSet Fundamentals').select();
    });

    it('Should select "OK" button of pop up', function() {
      ThiefHelpers.getButtonClassReference(undefined, CreateEditCustomColumns.xpathOfOkOrCancelButton).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Ok" in the ');
        CommonFunctions.takeScreenShot();
      });

      // verifying that drop down is closed
      ThiefHelpers.isDropDownOpen().then(function(found) {
        if (found) {
          expect(false).customError('Pop is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Verify if text is present in the formula section after selection option from typeahead
    CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror('Formula', undefined, 'FF_SALES(ANN_R,#ED,RP,#CU)', true);
  });

  describe('Test Step ID: 706485', function() {

    it('Clear the text in the Formula section', function() {
      CommonPageObjectsForPA3.clearTextInCodeMirror();
    });

    it('Select the "Reference" radio button', function() {
      ThiefHelpers.getRadioClassReference('Reference', undefined).select();

      // Verifying that "Reference" radio button is selected
      ThiefHelpers.getRadioClassReference('Reference', undefined).isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('The "Reference" radio button is selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Double click on "Col 1: Ending Price" from the "Formula" tab', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfFormulaTextArea).getItemByText('Col 1: Ending Price').doubleClick();
    });

    // Verify if text is present in the formula section after selection option from typeahead
    CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror('Formula', undefined, 'COL1', true);

    // Append text to the existing text in the formula section
    CommonPageObjectsForPA3.appendTextInCodeMirrorAndVerify('+', 'COL1+');

    it('Double click on "COl2: Port. Ending Quantity Held" from the "Formula" tab', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfFormulaTextArea).getItemByText('Col 2: Port. Ending Quantity Held').doubleClick();
    });

    // Verify if text is present in the formula section after selection option from typeahead
    CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror('Formula', undefined, 'COL1+COL2', true);
  });

  describe('Test Step ID: 706727', function() {

    it('Clear the text in the Formula section', function() {
      CommonPageObjectsForPA3.clearTextInCodeMirror();
    });

    it('Select the "New" radio button', function() {
      ThiefHelpers.getRadioClassReference('New', undefined).select();

      // Verifying that "New" radio button is selected
      ThiefHelpers.getRadioClassReference('New', undefined).isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('The "New" radio button is selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Enter formula into the section and select the option from type ahead and click on x Close button
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'P_PRICE(#ED)', undefined, undefined, 'X Close');

    it('Select "Personal" directory', function() {
      ThiefHelpers.getRadioClassReference('Personal').select();

      // Verfying if "Personal" is selected under "Directory"
      ThiefHelpers.getRadioClassReference('Personal').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Personal" radio button is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Sub-directory:" drop down is set to "Personal"', function() {
      ThiefHelpers.verifySelectedDropDownText('Personal', 'Sub-directory:');
    });

    it('Type "Test1" into the "Name" field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Test1');

      // Verifying that "Test1" is typed into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Test1') {
          expect(false).customError('"Test1" is not present in the "Name" field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on the "Save" button of "Columns" dialog verify if loading icon is displayed with text Creating custom column…
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Columns', undefined, undefined, undefined, true, 'Creating custom column…');

    it('Expand "Personal > Test1" from "Available" container and click on edit button next to "Test1"', function() {
      expandPersonalGetTest1Column('edit');
    });

    it('Verifying "Columns" dialog is displayed', function() {
      ThiefHelpers.isDialogOpen('Columns').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Columns" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Enter formula into the section and select the option from type ahead and click on x Close button
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'P_PRICE(0)', undefined, undefined, 'X Close');

    // Click on the "Save" button of "Columns" dialog verify if loading icon is displayed with text Creating custom column…
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Columns', undefined, undefined, undefined, true, 'Updating custom column…');

    it('Getting the number of columns before deleting in "Personal"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          var arrOfChildren = group.getChildrenText();
          arrOfChildren.then(function(arr) {
            indexOfTest1InPersonalBefore = arr.length;
          });
        } else {
          expect(false).customError('"Personal" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 706730', function() {

    it('Expand "Personal > Test1" from "Available" container and click on edit button next to "Test1"', function() {
      expandPersonalGetTest1Column('edit');
    });

    it('Verifying "Columns" dialog is displayed', function() {
      ThiefHelpers.isDialogOpen('Columns').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Columns" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Client" directory', function() {
      ThiefHelpers.getRadioClassReference('Client').select();

      // Verifying if "Client" is selected under "Directory"
      ThiefHelpers.getRadioClassReference('Client').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Client" radio button is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Client/QA Category" from "Sub-directory:" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Client/QA Category', 'Sub-directory:');

      // verifying if 'Client/QA Category' is selected from "Sub-directory:" section drop down
      ThiefHelpers.verifySelectedDropDownText('Client/QA Category', 'Sub-directory:');
    });

    // Click on the "Save" button of "Columns" dialog verify if loading icon is displayed with text Creating custom column…
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save As', 'Columns');

    it('Expand "Client > QA Category" from "Available" container and verify if "Test1" is present', function() {
      expandClientQACategoryAndGetTest1Column('verify', true);
    });

    it('Getting the number of columns before deleting in "Client > QA Category"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client');

      // Expand "Client" frm "Available" container
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('QA Category').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                var arrOfChildren = subGroup.getChildrenText();
                arrOfChildren.then(function(arr) {
                  indexofTest2InQACategory = arr.length;
                });
              } else {
                expect(false).customError('"QA Category" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Client" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 728790', function() {

    it('Expand "Client > QA Category" from "Available" container and click on "remove" icon next to "Test1"', function() {
      expandClientQACategoryAndGetTest1Column('remove');
    });

    // Verify if dialog appears with expected text and title and click on OK button
    CommonPageObjectsForPA3.verifyAndClickOnOkButtonOfConfirmationDialog('Delete Column', 'Are you sure you want to delete this column?');

    it('Getting the number of columns after deleting "Client > QA Category"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client');

      // Expand "Client" frm "Available" container
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('QA Category').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                var arrOfChildren = subGroup.getChildrenText();
                arrOfChildren.then(function(arr) {
                  if (indexofTest2InQACategory !== arr.length + 1) {
                    expect(false).customError('"Test1" was not deleted.');
                    CommonFunctions.takeScreenShot();
                  }
                });
              } else {
                expect(false).customError('"QA Category" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Client" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "Personal > Test1" from "Available" container and click on edit button next to "Test1"', function() {
      expandPersonalGetTest1Column('remove');
    });

    // Verify if dialog appears with expected text and title and click on OK button
    CommonPageObjectsForPA3.verifyAndClickOnOkButtonOfConfirmationDialog('Delete Column', 'Are you sure you want to delete this column?');

    it('Getting the number of columns after deleting in "Personal"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          var arrOfChildren = group.getChildrenText();
          arrOfChildren.then(function(arr) {
            if (indexOfTest1InPersonalBefore !== arr.length + 1) {
              expect(false).customError('"Test1" was not deleted.');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Personal" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile options');

  });
});
