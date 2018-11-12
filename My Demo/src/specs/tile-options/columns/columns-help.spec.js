'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: columns-help', function() {

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  var xpathOfFormulaTextArea = element(by.xpath(CreateEditCustomColumns.xpathOfFormulaTextArea));

  // Local functions
  var rightClickOnColumnHeaderAndClickOnColumnsHelp = function(columnName) {
    it('Should right click on "' + columnName + '" column and select Column Help...', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', columnName).then(function(ref) {
        PA3MainPage.rightClickAndSelectOption(ref, 'Column Help…');
      });

      browser.sleep(500);
    });

    it('Verifying that "Column Help" dialog box appears', function() {
      ThiefHelpers.verifyDialogTitle('Column Help');
    });

  };

  var rightClickOnColSelectOptionAndVerifyIfColumnsIsDisplayed = function(reportName, columnName, optionPath, multiHeaderName) {
    var modeBannerName = 'Tile Options - ' + reportName;

    it('Should right click on "' + columnName + '" column and select "' + optionPath + '"', function() {
      SlickGridFunctions.getHeaderCellReference(reportName, columnName, multiHeaderName).then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, optionPath);
      });
    });

    it('Verifying if view changed to "' + modeBannerName + '" mode', function() {
      ThiefHelpers.isModeBannerDisplayed(modeBannerName).then(function(found) {
        if (!found) {
          expect(false).customError('View is not changed to "' + modeBannerName + '" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Columns" is selected in the LHP', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Columns" tab is not selected in the LHP by default.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  };

  var clickOnIIconOfItem = function(itemName, sectionName) {
    var nameOfContainer;
    if (sectionName === undefined) {
      nameOfContainer = 'available';
    } else {
      nameOfContainer = sectionName;
    }

    var ref = TileOptionsColumns.getIconFormList('icon', nameOfContainer, itemName);
    browser.actions().mouseMove(ref).perform();
    ref.click().then(function() {
    }, function(err) {

      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });
  };

  var expandGroupAndClickOnRequiredButtonOfChild = function(parentName, childName, buttonName, expand) {
    it('Expand "' + parentName + '" and hover over "' + childName + '" and click on "' + buttonName + '"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText(parentName);
      if (expand === undefined) {
        group.expand();
      }

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, parentName, childName, 'last').then(function(indexOfElement) {
            var item = group.getItemByIndex(indexOfElement);

            if (buttonName === 'iButton') {

              // Click on "i" button next to item
              clickOnIIconOfItem(childName);

            } else if (buttonName === 'remove') {

              return item.then(function(remove) {
                remove.select();
                return remove.getActions().then(function(val) {
                  return val.triggerAction('remove');
                });
              });
            } else {
              item.then(function(listItem) {
                // Selecting the element before performing double click as double click function does not work by itself
                listItem.select();
                listItem.doubleClick();
              });
            }

          }, function(error) {
            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"' + parentName + '" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  };

  var clickOnCollapseButtonNextToFactset = function() {
    it('Click on "-" button next to FactSet', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');
      group.collapse();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          expect(false).customError('"FactSet is not collapsed."');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  };

  // Verifying the data in the tab( to verify before and after)
  var data1 = function() {

    it('verify if only "Formula" tab is displayed', function() {
      CommonPageObjectsForPA3.verifyIfExpectedTabsAreDisplayed(1, undefined, 'Formula');
    });

    // verify the style of title and content
    CommonPageObjectsForPA3.verifyIfTitleIsBoldAndExpectedContent('Test help', 'P_PRICE');
  };

  // Verifying the data in the tab( to verify before and after)
  var data2 = function() {

    it('verify if only "Formula" tab is displayed', function() {
      CommonPageObjectsForPA3.verifyIfExpectedTabsAreDisplayed(1, undefined, 'Formula');
    });

    // verify the style of title and content
    CommonPageObjectsForPA3.verifyIfTitleIsBoldAndExpectedContent('Ref help', 'COL2');
  };

  describe('Test Step ID: 688397', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:pa3;columns;columns-help"', function() {
      PA3MainPage.switchToDocument('columns-help');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    // Right Click on column Header and click on "Column Help..."
    rightClickOnColumnHeaderAndClickOnColumnsHelp('Port. Weight');

    var arrTabNames = ['Description', 'Formula'];

    it('Verifying if 2 tabs are displayed', function() {
      CommonPageObjectsForPA3.verifyIfExpectedTabsAreDisplayed(2, arrTabNames);
    });

    it('Verify if "Description" tab is selected by default', function() {
      ThiefHelpers.getTabsClassReference().getSelectedTabText().getText().then(function(tabName) {
        if (tabName !== 'Description') {
          expect(false).customError('"Description" tab is not selected by default. Found:"' + tabName + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // verify the style of title and content
    CommonPageObjectsForPA3.verifyIfTitleIsBoldAndExpectedContent('Port. Ending Weight', 'Wf = MVf / ∑MVpf\nWf := portfolio ending weight\nMVf := portfolio' +
      ' ending market value\nMVpf := ending market value of the overall portfolio\nThe portfolio ending weight of a position reflects the value of the' +
      ' position relative to all of the securities in the portfolio as of the end of a report period. It is calculated as the ending market value of a ' +
      'security divided by the total market value of the portfolio.\nStandard portfolio- and group-level weights are the sums of security-level weights.' +
      '\nReal-time streaming data is available for this column. For more information, see Viewing Real-Time Data.');

    it('Verify if a hyperlink is displayed with "Viewing Real-Time Data"', function() {
      element(by.xpath('//tf-tab-content//*[normalize-space(.)="Port. Ending Weight"]//following-sibling::*/p/a')).getText().then(function(value) {
        if (value !== 'Viewing Real-Time Data') {
          expect(false).customError(' Hyperlink is not displayed with "Viewing Real-Time Data"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 688398', function() {

    it('Should select "Formula" tab', function() {
      ThiefHelpers.getTabsClassReference().selectTabByText('Formula');

      ThiefHelpers.getTabsClassReference().getSelectedTabText().getText().then(function(tabName) {
        if (tabName !== 'Formula') {
          expect(false).customError('"Formula" tab is not selected. Found:"' + tabName + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // verify the style of title and content
    CommonPageObjectsForPA3.verifyIfTitleIsBoldAndExpectedContent('Port. Ending Weight', 'No public formula is available.');
  });

  describe('Test Step ID: 688458', function() {

    // Click on the close button in "Column Help" dialog
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Close', 'Column Help');

    // Right Click on column Header and click on required option
    rightClickOnColSelectOptionAndVerifyIfColumnsIsDisplayed('Weights', 'Bench. Weight', 'Columns|Add Column…');

    it('Should enter "Risk" in the search field', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('Risk');

      //Verifying the text in search field
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(value) {
        if (value !== 'Risk') {
          expect(false).customError('Text in search field is not Risk');
          CommonFunctions.takeScreenShot();
        }
      });

      // Adding extra time to appear the element
      browser.sleep(2000);
    });

    it('Should hover over "% Factor Risk" and click on "i"', function() {
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', '% Factor Risk').then(function(item) {
        item.getText().then(function(columnName) {

          // Click on "i" button next to item
          clickOnIIconOfItem(columnName);
        });

      });

    });

    var arrTabNames = ['Description', 'Formula'];

    it('Verifying if 2 tabs is displayed', function() {
      CommonPageObjectsForPA3.verifyIfExpectedTabsAreDisplayed(2, arrTabNames);
    });

    it('Verify if "Description" tab is selected by default', function() {
      ThiefHelpers.getTabsClassReference().getSelectedTabText().getText().then(function(tabName) {
        if (tabName !== 'Description') {
          expect(false).customError('"Description" tab is not selected by default. Found:"' + tabName + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // verify the style of title and content
    CommonPageObjectsForPA3.verifyIfTitleIsBoldAndExpectedContent('% Factor Risk', '%TRsFR = 100 x FRs/TRp\n%TRpFR = 100 x FRp/TRp\n' +
      '%TRsFR := percent factor risk (security level)\n%TRpFR := percent factor risk (portfolio level)\n' +
      'FRs := factor risk (security level)\nFRp = factor risk (portfolio level)\nTRp = total risk (portfolio level)\n' +
      'Returns the percentage of factor risk at the company or portfolio level, relative to total risk at the portfolio level.');
  });

  describe('Test Step ID: 688459', function() {

    it('Should select "Formula" tab', function() {
      ThiefHelpers.getTabsClassReference().selectTabByText('Formula');

      ThiefHelpers.getTabsClassReference().getSelectedTabText().getText().then(function(tabName) {
        if (tabName !== 'Formula') {
          expect(false).customError('"Formula" tab is not selected. Found:"' + tabName + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // verify the style of title and content
    CommonPageObjectsForPA3.verifyIfTitleIsBoldAndExpectedContent('% Factor Risk', 'No public formula is available.');

  });

  describe('Test Step ID: 688488', function() {

    it('Click on the x icon in the search field', function() {
      ThiefHelpers.getTextBoxClassReference('Available').clearText();

      //Verifying the text in search field
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(value) {
        if (value !== '') {
          expect(false).customError('Text in search field is not cleared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on the "+" icon next to available section and select the option from the drop-down
    CommonPageObjectsForPA3.clickOnAddButtonAndSelectOptionFromDropdown('New/Reference', 'Columns');

    it('Verifying if the "New" radio button is selected', function() {
      ThiefHelpers.getRadioClassReference('New').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"New" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Enter formula in to the formula section and  click outside
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'P_PRICE', undefined, undefined, 'Click Outside', 'P_PRICE');

    it('Should select "Personal" under directory', function() {
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

    it('Type "Test help" into the "Name" field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Test help');

      // Verifying that "Grpg help" is typed into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Test help') {
          expect(false).customError('"Test help" is not present in the "Name" field.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on the "Save" button of "Groupings" dialog
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Columns');

    // Click on the collapse button next to "FactSet"
    clickOnCollapseButtonNextToFactset();

    // Expand group and click on "i" button next to item
    expandGroupAndClickOnRequiredButtonOfChild('Personal', 'Test help', 'iButton');

    // Verify if data is displayed as expected
    data1();

  });

  describe('Test Step ID: 688494', function() {

    // Double click on item
    expandGroupAndClickOnRequiredButtonOfChild('Personal', 'Test help', 'doubleClick', false);

    it('Verifying that "Test help" is added to the "Selected" section', function() {
      CommonPageObjectsForPA3.verifyIfElementIsPresentInSelectedSection('Test help', xpathOfSelectedSection);
    });

    // Click on the "+" icon next to available section and select the option from the drop-down
    CommonPageObjectsForPA3.clickOnAddButtonAndSelectOptionFromDropdown('New/Reference', 'Columns');

    it('Select the "Reference" radio button', function() {
      ThiefHelpers.getRadioClassReference('Reference', undefined).select();

      // Verifying that "Reference" radio button is selected
      ThiefHelpers.getRadioClassReference('Reference', undefined).isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('The "Reference" radio button is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Double click on "Col 2: Port. Ending Quantity Held" from the "Formula" tab', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfFormulaTextArea).getItemByText('Col 2: Port. Ending Quantity Held').doubleClick();
    });

    // Verify if text is present in the formula section after selection option from type-ahead
    CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror('Formula', undefined, 'COL2', true);

    it('Type "Ref help" into the "Name" field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Ref help');

      // Verifying that "Ref help" is typed into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Ref help') {
          expect(false).customError('"Ref help" is not present in the "Name" field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on the "Save" button of "Groupings" dialog
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Columns');

    // Click on the collapse button next to "FactSet"
    clickOnCollapseButtonNextToFactset();

    // Expand group and click on "i" button next to item
    expandGroupAndClickOnRequiredButtonOfChild('Document', 'Ref help', 'iButton');

    // Verify if data is displayed as expected
    data2();

    it('Verify if info-box pop is over lapped with edit and remove icon nect to "Ref help"', function() {
      TileOptionsColumns.getIconFormList('remove', 'available', 'Ref help').click().then(function() {

        ThiefHelpers.getDialogButton('Delete Column', 'Cancel').click().then(function() {
        }, function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });

      }, function(err) {
        expect(false).customError('The info-box pop up overlapped with close and edit button.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Ref help" is added to the "Selected" section', function() {
      element(by.xpath(TileOptionsColumns.xpathOfHeader)).click();

      CommonPageObjectsForPA3.verifyIfElementIsPresentInSelectedSection('Ref help', xpathOfSelectedSection);
    });

  });

  describe('Test Step ID: 688598', function() {

    it('Hover over "Ref help" and click on "i" in the selected section', function() {
      clickOnIIconOfItem('Ref help', 'selected');
    });

    // Verify if data is displayed as expected
    data2();

  });

  describe('Test Step ID: 688600', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var arrOfColumns = ['Test help', 'Ref help'];

    arrOfColumns.forEach(function(columnName) {

      // Right Click on column Header and click on "Column Help..."
      rightClickOnColumnHeaderAndClickOnColumnsHelp(columnName);

      // Verify the data in the dialog box matches with the previous one
      if (columnName === 'Test help') {
        data1();
      } else {
        data2();
      }

      // Click on the close button in "Column Help" dialog
      CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Close', 'Column Help');
    });

  });

  describe('Test Step ID: 688649', function() {

    // Right Click on column Header and click on required option
    rightClickOnColSelectOptionAndVerifyIfColumnsIsDisplayed('Weights', 'Test help', 'Columns|Add Column…');

    // Expand group and click on "remove" button next to item
    expandGroupAndClickOnRequiredButtonOfChild('Personal', 'Test help', 'remove');

    // Verify if dialog appears with expected text and title and click on OK button
    CommonPageObjectsForPA3.verifyAndClickOnOkButtonOfConfirmationDialog('Delete Column', 'Are you sure you want to delete this column?');

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if "Test help" column is not displayed in the report', function() {
      SlickGridFunctions.getColumnNames('Weights').then(function(columnNames) {
        if (columnNames.indexOf('Test help') > -1) {
          expect(false).customError('"Test help" column is displayed in the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

});
