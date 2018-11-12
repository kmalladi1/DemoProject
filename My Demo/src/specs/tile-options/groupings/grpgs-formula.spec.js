'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: grpgs-formula', function() {

  var xpathOfAvailableSection = CreateEditCustomGroupings.xpathOfGroupInAvailableSection;

  var xpathOfFormulaTextArea = element(by.xpath(CreateEditCustomGroupings.xpathOfFormulaTextArea));

  var indexOfTest1InPersonalBefore;
  var flag1;
  var flag2;
  describe('Test Step ID: 706122', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:default_doc_auto"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

  });

  describe('Test Step ID: 706126', function() {

    // Click on "Economic Sector Hyperlink" and verify if Groupings is selected by default in tile options
    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');

    // Click on the "+" icon next to available section and select the option from the drop-down
    CommonPageObjectsForPA3.clickOnAddButtonAndSelectOptionFromDropdown('New/Reference', 'Groupings');

    it('Verifying if the "New" radio button is selected', function() {
      ThiefHelpers.getRadioClassReference('New').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"New" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Begin typing to enter or search for a formula…" is displayed in the formula section', function() {
      element(by.xpath(CreateEditCustomGroupings.xpathTextArea)).getText().then(function(text) {
        if (text !== 'Begin typing to enter or search for a formula…') {
          expect(false).customError('Expected formula section to display: "Begin typing to enter or search for a formula…" but Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }

      });
    });

  });

  describe('Test Step ID: 706128', function() {

    it('Should click in the Formula section', function() {
      browser.actions().mouseMove(CreateEditCustomGroupings.getTabTextArea('Formula', 'New')).click().perform();
    });

    var arrOfDropdownItems = ['Recently Used', 'Popular Data Items'];
    arrOfDropdownItems.forEach(function(optionName) {
      it('Verify if the drop down appears with "' + optionName + '"', function() {
        // Getting the xpath of the Selected section
        var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(CreateEditCustomGroupings.xpathOfFormulaSectionDropdown, optionName);

        element(by.xpath(xpathOfSelectedSection)).getText().then(function(text) {
          if (text !== optionName) {
            expect(false).customError(optionName + 'option is not present in the drop down.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 706130', function() {

    // Known issue RPD:31942090 and RPD:31969298
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
      element.all(by.xpath(CreateEditCustomGroupings.xpathOfTypeahead)).getText().then(function(arrOfOptions) {
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

  describe('Test Step ID: 706131', function() {

    // Select option from type-ahead and verify the same
    CommonPageObjectsForPA3.selectOptionFromTypeahead('P_PRICE(NOW)');

    // Verify if text is present in the formula section after selection option from type-ahead
    CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror('Formula', undefined, 'P_PRICE(#SD,#CU)', true);

    it('Verify if "Arguments" tab is selected', function() {
      ThiefHelpers.getTabsClassReference(CreateEditCustomGroupings.xpathOfArgumentsTile).getSelectedTabText().getText().then(function(tabName) {
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
      var xpathOfCurrencyTextBox = CommonFunctions.replaceStringInXpath(CreateEditCustomGroupings.xpathOfTextBox, 'Currency');
      ThiefHelpers.getTextBoxClassReference(undefined, xpathOfCurrencyTextBox).getText().then(function(text) {
        if (text !== 'Report Currency') {
          expect(false).customError('"Report Currency" is not present in "Currency" text box. Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 706132', function() {

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

  describe('Test Step ID: 706308', function() {

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

    it('Select first "Dividend Yield" from type-ahead', function() {
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
      CommonFunctions.waitUntilElementAppears(element.all(by.xpath(CreateEditCustomGroupings.xpathOfArgumentsTile)), 4000);
    });

    // Verify if text is present in the formula section after selection option from type-ahead
    CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror('Formula', undefined, 'P_PRICE(#SD,#CU)+P_DIV_YLD', true);
  });

  describe('Test Step ID: 706315', function() {

    // Enter formula into the section, select the option from type ahead and verify the text
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'PMWDB', true, 'Returns data from a specified column/field within a given portfolio', false, 'PMWDB(#PR,"",#SD,B,D,S,#CU,B,FIVEDAYEOM)');

    it('Verify if "Portfolio" is selected in "Portfolio" text box', function() {
      var xpathOfPortfolioTextBox = CommonFunctions.replaceStringInXpath(CreateEditCustomGroupings.xpathOfTextBox, 'Portfolio');
      ThiefHelpers.getTextBoxClassReference(undefined, xpathOfPortfolioTextBox).getText().then(function(text) {
        if (text !== 'Portfolio') {
          expect(false).customError('"Portfolio" is not present in "Portfolio" textbox');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrOfOptions = ['Portfolio', 'Benchmark'];

    it('Verifying if "Portfolio" and "Benchmark" are present in Portfolio drop-down', function() {
      var ref = element.all(by.xpath(CommonFunctions.replaceStringInXpath(CreateEditCustomGroupings.xpathOfTextboxDropdownButton, 'Portfolio')));
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

  describe('Test Step ID: 706316', function() {

    it('Should select "Benchmark" from "Portfolio" drop down ', function() {
      var xpathOfPortfolioTextBox = CommonFunctions.replaceStringInXpath(CreateEditCustomGroupings.xpathOfTextBox, 'Portfolio');
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
    CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror('Formula', undefined, 'PMWDB(#BN,"",#SD,B,D,S,#CU,B,FIVEDAYEOM)', true);
  });

  describe('Test Step ID: 706319', function() {

    it('Clear the text in the Formula section', function() {
      CommonPageObjectsForPA3.clearTextInCodeMirror();
    });

    it('Click on the "Browse" button', function() {
      ThiefHelpers.getButtonClassReference(undefined, CreateEditCustomGroupings.xpathOfBrowseButton).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Browse" button.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify if pop up has appeared after clicking on "Browse" button', function() {
      var refOfPopUp = element(by.xpath(CreateEditCustomGroupings.xpathOfPanel));
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
      ThiefHelpers.getTextBoxClassReference(undefined, CreateEditCustomGroupings.xpathOfPanelTextbox).setText('Sales');

      // Verifying that "Sales" is typed into the search box
      ThiefHelpers.getTextBoxClassReference(undefined, CreateEditCustomGroupings.xpathOfPanelTextbox).getText().then(function(text) {
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
      ThiefHelpers.getButtonClassReference(undefined, CreateEditCustomGroupings.xpathOfOkOrCancelButton).press().then(function() {
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
    CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror('Formula', undefined, 'FF_SALES(ANN_R,#SD,RP,#CU)', true);
  });

  describe('Test Step ID: 706346', function() {

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

    // Verify if text is present in the formula section after selection option from type-ahead
    CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror('Formula', undefined, 'COL1', true);

    // Append text to the existing text in the formula section
    CommonPageObjectsForPA3.appendTextInCodeMirrorAndVerify('+', 'COL1+');

    it('Double click on "COl2: Port. Ending Quantity Held" from the "Formula" tab', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfFormulaTextArea).getItemByText('Col 2: Port. Ending Quantity Held').doubleClick();
    });

    // Verify if text is present in the formula section after selection option from type-ahead
    CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror('Formula', undefined, 'COL1+COL2', true);
  });

  describe('Test Step ID: 706722', function() {

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

    it('Type "Test" into the "Name" field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Test');

      // Verifying that "Test" is typed into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Test') {
          expect(false).customError('"Test" is not present in the "Name" field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on the "Save" button of "Groupings" dialog verify if loading icon is displayed with text Creating custom grouping…
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Groupings', undefined, undefined, undefined, true, 'Creating custom grouping…');

    it('Should expand "Personal" in "Available" section', function() {
      ThiefHelpers.expandGroup(TileOptionsGroupings.xpathOfAvailableContainer, 'Personal');
    });

    it('Hover over "Test" from "Personal" and click on the "Edit" icon', function() {
      TileOptionsGroupings.getEditIconForGroupingsInAvailableSection('Personal', 'Test').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying "Groupings" dialog is displayed', function() {
      ThiefHelpers.isDialogOpen('Groupings').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Groupings" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Enter formula into the section and select the option from type ahead and click on x Close button
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'P_PRICE(0)', undefined, undefined, 'X Close');

    // Click on the "Save" button of "Groupings" dialog verify if loading icon is displayed with text Creating custom column…
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Groupings', undefined, undefined, undefined, true, 'Updating custom grouping…');

    it('Getting the number of Groupings before deleting in "Personal"', function() {
      var group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfAvailableContainer).getGroupByText('Personal');

      var arrOfChildren;
      var countOfColumns = function() {
        arrOfChildren = group.getChildrenText();
        arrOfChildren.then(function(arr) {
          indexOfTest1InPersonalBefore = arr.length;
        });
      };

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          countOfColumns();
        } else {
          group.expand();
          countOfColumns();
        }
      });
    });
  });

  describe('Test Step ID: 706726', function() {

    it('Should expand "Client" in "Available" section select "Date_Lagging_Custom_Grouping"', function() {
      var group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfAvailableContainer).getGroupByText('Personal');
      group.isExpanded().then(function(expanded) {
        if (!expanded) {
          group.expand();
        }
      });
    });

    it('Hover over "Test" from "Personal" and click on the "Edit" icon', function() {
      TileOptionsGroupings.getRemoveIconForGroupingsInAvailableSection('Personal', 'Test').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Verify if dialog appears with expected text and title and click on OK button
    CommonPageObjectsForPA3.verifyAndClickOnOkButtonOfConfirmationDialog('Delete Grouping', 'Are you sure you want to delete this grouping?');

    it('Verifying if "Test" is deleted under Personal', function() {
      var group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfAvailableContainer).getGroupByText('Personal');

      var arrOfChildren;
      var verifyIfDeleted = function() {
        arrOfChildren = group.getChildrenText();
        arrOfChildren.then(function(arr) {
          if (indexOfTest1InPersonalBefore !== arr.length + 1) {
            expect(false).customError('"Test" was not deleted.');
            CommonFunctions.takeScreenShot();
          }
        });
      };

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          verifyIfDeleted();
        } else {
          group.expand();
          verifyIfDeleted();
        }
      });
    });

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile options');
  });
});
