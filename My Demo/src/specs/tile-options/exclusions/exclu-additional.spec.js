'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: exclu-additional', function() {

  // Variable(s)
  var noOfEleBeforeExclusion;
  var noOfEleAfterExclusion;
  var arrAllElementsFromCalculatedReport = [];
  var arrSecuritiesHavingHyphensInPortWeight = [];
  var arrGroupsHavingHyphensInPortWeight = [];
  var arrColumnStyleAttr = [];
  var arrElementsHavingHyphensInPortWeight = [];
  var xpathAvailableVirtualListBox = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Available');
  var xpathSelectedVirtualListBox = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Selected');

  describe('Test Step ID: 544921', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

    it('Type "demo_eafe" into "Portfolio" widget box and select "Client:/complete_accts/DEMO_EAFE.ACCT" from type ahead', function() {
      PA3MainPage.setPortfolio('demo_eafe', 'Client:/complete_accts/DEMO_EAFE.ACCT', 'CLIENT:/COMPLETE_ACCTS/DEMO_EAFE.ACCT').then(function(option) {
        if (!option) {
          expect(false).customError('Not able to Type "demo_eafe" into "Portfolio"' + ' widget and select "Client:/complete_accts/DEMO_EAFE.ACCT');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Checking for 'Error Setting portfolio' dialog box (if appear)
      expect(PA3MainPage.getDialog('Error Setting portfolio').isPresent()).toBeFalsy();
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Verifying that "Portfolio" widget is displaying "CLIENT:/COMPLETE_ACCTS/DEMO_EAFE.ACCT"', function() {
      PA3MainPage.getWidgetBox('Portfolio').getAttribute('value').then(function(widget) {
        expect(widget === 'Client:/complete_accts/DEMO_EAFE.ACCT').customError('"Portfolio" widget does not displays "CLIENT:/COMPLETE_ACCTS/DEMO_EAFE.ACCT"');
        if (widget !== 'Client:/complete_accts/DEMO_EAFE.ACCT') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Benchmark" widget is displaying "MSCI:EAFE"', function() {
      PA3MainPage.getWidgetBox('Benchmark').getAttribute('value').then(function(widget) {
        expect(widget === 'MSCI:EAFE').customError('"Benchmark" widget does not displays "MSCI:EAFE"');
        if (widget !== 'MSCI:EAFE') {
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 544922', function() {

    it('Collect all the grouping elements into an array', function() {
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 1).count().then(function(value) {
        noOfEleBeforeExclusion = value;
      });
    });

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Exclusions');

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000)).toBeTruthy();
    });

    var arrEle = ['Commercial Services', 'Finance', 'Utilities'];
    var flag = 0;
    it('Hold CTRL key and select "Commercial Services", "Finance" and "Utilities" from "Available" section', function() {
      arrEle.forEach(function(ele) {
        var group = ThiefHelpers.getVirtualListboxClassReference(xpathAvailableVirtualListBox).getGroupByText(ele);
        group.select(true, false);
      });

      arrEle.forEach(function(ele) {
        var group = ThiefHelpers.getVirtualListboxClassReference(xpathAvailableVirtualListBox).getGroupByText(ele);
        group.isSelected().then(function(selected) {
          if (!selected) {
            flag = flag + 1;
            expect(false).customError(ele + ' is not selected from "Available" section');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it('Click "Right" arrow button to add "Commercial Services", "Finance" and "Utilities" to "Selected" section', function() {
      TileOptionsExclusions.getArrowButton('Right').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Commercial Services", "Finance" and "Utilities" are added to "Selected" section', function() {

      var arrElements = [];
      var flag = 0;
      ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Economic Sector > Industry').getChildrenText().then(function(ele) {
        ele.forEach(function(element) {
          arrElements.push(element.text);
        });
      }).then(function() {
        arrEle.forEach(function(element) {
          if (arrElements.indexOf(element) < 0) {
            flag = flag + 1;
            expect(false).customError(element + ' is not found in the selected section');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Verifying that "Commercial Services" sector is not displayed in the calculated report', function() {
      PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Commercial Services').isPresent().then(function(value) {
        if (value) {
          expect(false).customError('"Commercial Services" sector is still displayed in the calculated report.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Commercial Services').isPresent()).toBeFalsy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Finance" sector is not displayed in the calculated report', function() {
      PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Finance').isPresent().then(function(value) {
        if (value) {
          expect(false).customError('"Finance" sector is still displayed in the calculated report.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Finance').isPresent()).toBeFalsy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Utilities" sector is not displayed in the calculated report', function() {
      PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Utilities').isPresent().then(function(value) {
        if (value) {
          expect(false).customError('"Utilities" sector is still displayed in the calculated report.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Utilities').isPresent()).toBeFalsy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "[Cash]" sector is displayed in the calculated report', function() {
      PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, '[Cash]').isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('"[Cash]" sector is not displayed in the calculated report.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, '[Cash]').isPresent()).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying whether all other sectors except "Commercial Services", "Finance" and "Utilities" are also displayed', function() {
      // Verifying whether all the other sectors are also displayed
      noOfEleAfterExclusion = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 1).count();
      expect(noOfEleAfterExclusion).toEqual(noOfEleBeforeExclusion - 3);
    });
  });

  describe('Test Step ID: 544926', function() {

    it('Collect all the grouping elements into an array', function() {
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 1).count().then(function(value) {
        noOfEleBeforeExclusion = value;
      });
    });

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');

    // Clicking on Exclusions LHP item to select.
    it('Should click on Exclusions LHP item to select', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Exclusions').select();

      // Verifying if "Exclusions" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Exclusions').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Exclusions" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000)).toBeTruthy();
    });

    it('Type "Fin" into the search field of "Selected" section', function() {
      TileOptionsExclusions.getSearchField('Selected').sendKeys('Fin');
    });

    it('Verifying that "Selected" section only displays "Finance" under "Economic Sector > Industry" tree', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Economic Sector > Industry').getChildrenText().then(function(columnName) {
        if (columnName.length === 1) {
          if (columnName[0].text !== 'Finance') {
            expect(false).customError('"Finance" is not added to "Selected" section');
            CommonFunctions.takeScreenShot();
          }
        } else {
          expect(false).customError('"Finance" is not the only element displayed in "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 544927', function() {

    it('Hover over "Finance" under "Economic Sector > Industry" from "Selected" section and click remove icon to delete it', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Economic Sector > Industry').getItemByText('Finance').then(function(action) {

        // Hover on "Finance" and click on remove button
        return action.getActions().then(function(actions) {
          return actions.triggerAction('remove');
        });
      });
    });

    it('Clear the word "Fin" in the Search field', function() {
      TileOptionsExclusions.getClearSearchFieldButton('Selected').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Search" field is cleared
      TileOptionsExclusions.getSearchField('Selected').getAttribute('value').then(function(field) {
        expect(field === '').customError('The word "Fin" does not cleared in Search field');
        if (field !== '') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrEle = ['Commercial Services', 'Utilities'];
    it('Verifying that "Selected" section only displays "Commercial Services" and "Utilities" under "Economic Sector > Industry" tree', function() {
      var arrElements = [];
      var flag = 0;
      ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Economic Sector > Industry').getChildrenText().then(function(ele) {
        ele.forEach(function(element) {
          arrElements.push(element.text);
        });
      }).then(function() {
        if (arrEle.length !== 2) {
          flag = flag + 1;
          expect(false).customError('"Economic Sector > Industry" contains more than 2 elements');
          CommonFunctions.takeScreenShot();
        } else {
          arrEle.forEach(function(element) {
            if (arrElements.indexOf(element) < 0) {
              flag = flag + 1;
              expect(false).customError(element + ' is not found in the selected section');
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        }
      });
    });
  });

  describe('Test Step ID: 544928', function() {

    it('Select "Exclude Cash from Universe" from the "Selected" section', function() {
      TileOptionsExclusions.getCheckbox('Exclude Cash from Universe').click();

      // Verifying if "Exclude Cash from Universe from Universe" is selected
      expect(Utilities.isCheckboxSelected(TileOptionsExclusions.getCheckbox('Exclude Cash from Universe'))).toBeTruthy();
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Verifying that "Commercial Services" sector is not displayed in the calculated report', function() {
      PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Commercial Services').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Commercial Services" sector is displayed in the calculated report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Utilities" sector is not displayed in the calculated report', function() {
      PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Utilities').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Utilities" sector is displayed in the calculated report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "[Cash]" sector is not displayed in the calculated report', function() {
      PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, '[Cash]').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"[Cash]" sector is displayed in the calculated report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Finance" sector is displayed in the calculated report', function() {
      PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Finance').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Finance" sector is not displayed in the calculated report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying whether all other sectors except "Commercial Services", "Utilities" and "[Cash]" are also displayed', function() {
      // Verifying whether all the other sectors are also displayed
      noOfEleAfterExclusion = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 1).count();
      expect(noOfEleAfterExclusion).toEqual(noOfEleBeforeExclusion);
    });
  });

  describe('Test Step ID: 544923', function() {

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');

    // Clicking on Exclusions LHP item to select.
    it('Should click on Exclusions LHP item to select', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Exclusions').select();

      // Verifying if "Exclusions" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Exclusions').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Exclusions" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000)).toBeTruthy();
    });

    it('Select "Disable Exclusions" from the "Selected" section', function() {
      TileOptionsExclusions.getCheckbox('Disable Exclusions').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Disable Exclusions" is selected
      expect(Utilities.isCheckboxSelected(TileOptionsExclusions.getCheckbox('Disable Exclusions'))).toBeTruthy();
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    var arrSectors = ['Commercial Services', 'Utilities'];

    it('Verifying that "' + arrSectors + '" sectors are displayed in the calculated report', function() {
      arrSectors.forEach(function(groupName) {
        PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, groupName).isPresent().then(function(found) {
          if (!found) {
            expect(false).customError('"' + groupName + '" is not present in the calculated report.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying that "[Cash]" sector is not displayed in the calculated report', function() {
      PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, '[Cash]').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"[Cash]" is present in the calculated report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 544929', function() {

    it('Set "Portfolio" to "CLIENT:/NEW_PA_TEST_SUITE/RISK/SP100.ACCT"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathPortfolioWidget).setText('CLIENT:/NEW_PA_TEST_SUITE/RISK/SP100.ACCT');

      //Verifying if "Portfolio" text is set to "CLIENT:/NEW_PA_TEST_SUITE/RISK/SP100.ACCT"
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathPortfolioWidget).getText().then(function(text) {
        if (text !== 'CLIENT:/NEW_PA_TEST_SUITE/RISK/SP100.ACCT') {
          expect(false).customError('"Portfolio" text box is not set to "CLIENT:/NEW_PA_TEST_SUITE/RISK/SP100.ACCT". ' +
            'Found:"' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Set "Benchmark" to "Russell:1000"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathBenchmarkWidget).setText('Russell:1000');

      //Verifying if "Benchmark" text is set to "RUSSELL:1000"
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathBenchmarkWidget).getText().then(function(text) {
        if (text !== 'RUSSELL:1000') {
          expect(false).customError('"Benchmark" text box is not set to "RUSSELL:1000". ' +
            'Found:"' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for calculation to start
      browser.sleep(3000);
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Verifying that "Weights" report is calculated for "SP100 vs Russell 1000"', function() {
      PA3MainPage.getHeader().getText().then(function(text) {
        if (text !== 'SP100 vs Russell 1000') {
          expect(false).customError('Header of application is not showing "SP100 vs Russell 1000". ' + 'Expected: "SP100 vs Russell 1000" but Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 544931', function() {

    it('Right click on the "Communications" and select "Exclusions > Edit Exclusions..." from the menu', function() {
      var elementReference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Communications');

      // Right click on "Communications" and select "Exclusions > Edit Exclusions..." from the menu
      PA3MainPage.rightClickAndSelectOption(elementReference, 'Exclusions|Edit Exclusions…');
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights').then(function(found) {
        if (!found) {
          expect(false).customError('View is not changed to "Tile Options - Weights" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Exclusions" is selected in the LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Exclusions').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Exclusions" tab is not selected in the LHP by default.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000)).toBeTruthy();
    });

    it('De-Select "Disable Exclusions" from the "Selected" section', function() {
      TileOptionsExclusions.getCheckbox('Disable Exclusions').click();

      // Verifying if "Disable Exclusions" is de-selected
      expect(Utilities.isCheckboxSelected(TileOptionsExclusions.getCheckbox('Disable Exclusions'))).toBeFalsy();
    });

    it('Click "X" icon in the "Selected" section to delete all the selected items.', function() {
      TileOptionsExclusions.getClearSelectedItemsButton().click();

      // Verifying that all the items from "Selected" section is deleted
      TileOptionsExclusions.getElementsListFromSelectedSection().count().then(function(count) {
        if (count !== 0) {
          expect(false).customError('Count of elemets in the selected section is not zero even after clicking ' +
            'on clear all button. Found count ' + count);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Exclude Benchmark" from the "Selected" section', function() {
      TileOptionsExclusions.getCheckbox('Exclude Benchmark').click();

      // Verifying if "Exclude Benchmark" is selected
      expect(Utilities.isCheckboxSelected(TileOptionsExclusions.getCheckbox('Exclude Benchmark'))).toBeTruthy();
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Verifying that all the cells in "Port. Weight" column displays data', function() {
      PA3MainPage.getAllCellsOfGivenColumn('Weights', 'Port. Weight', 'slick-pane slick-pane-bottom slick-pane-right').then(function(references) {
        references.forEach(function(elements) {
          expect(elements.getText()).toBeNoneOf('', '--', 'NA');
        });
      });
    });

    it('Verifying that all the cells in "Bench. Weight" column displays "Blank" or "Hyphens" or "NA"', function() {
      PA3MainPage.getAllCellsOfGivenColumn('Weights', 'Bench. Weight', 'slick-pane slick-pane-bottom slick-pane-right').then(function(references) {
        references.forEach(function(elements) {
          expect(elements.getText()).toBeOneOf('', '--', 'NA');
        });
      });
    });

    it('Verifying that all the cells in "Difference" column displays "Blank" or "Hyphens" or "NA"', function() {
      PA3MainPage.getAllCellsOfGivenColumn('Weights', 'Difference', 'slick-pane slick-pane-bottom slick-pane-right').then(function(references) {
        references.forEach(function(elements) {
          expect(elements.getText()).toBeOneOf('', '--', 'NA');
        });
      });
    });

    xit('Verifying that report header displays "SP100"', function() {
      // Known Issue: RPD:16523104 Benchmark exclusion is not updated in the report header
      PA3MainPage.getHeader().getText().then(function(header) {
        expect(header === 'SP100 vs Russell 1000').customError('Report header does not displays "SP100 vs Russell"');
        if (header !== 'SP100 vs Russell 1000') {
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 544930', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Exclusions');

    it('De-select "Exclude Benchmark" from the "Selected" section', function() {
      TileOptionsExclusions.getCheckbox('Exclude Benchmark').click();

      // Verifying if "Exclude Benchmark" is de-selected
      expect(Utilities.isCheckboxSelected(TileOptionsExclusions.getCheckbox('Exclude Benchmark'))).toBeFalsy();
    });

    // Clicking on Hidden LHP item to select.
    it('Should click on Hidden LHP item to select', function() {
      TileOptions.getLHPOption('Hidden').click();

      // Checking if 'Hidden' item is opened.
      TileOptions.getOptionTitle().getText().then(function(title) {
        expect(title === 'Hidden').customError('"Hidden" item from "Tile Options" did not select from LHP');
        if (title !== 'Hidden') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Type "AT&" in the "Search" field of "Available" section', function() {
      TileOptionsHidden.getSearchField('Available').sendKeys('AT&');

      // Verifying if "AT&" is typed into the "Search" field
      expect(TileOptionsHidden.getSearchField('Available').getAttribute('value')).toEqual('AT&');
    });

    it('Double click on "AT&T Inc." from the "Available" section to add it to "Selected" section', function() {

      var xpathVirtualListbox = CommonFunctions.replaceStringInXpath(TileOptionsHidden.xpathOfSelectedOrAvailableSection, 'Available');

      var group = ThiefHelpers.getVirtualListboxClassReference(xpathVirtualListbox).getGroupByText('Communications');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Major Telecommunications').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getItemByText('AT&T Inc.').then(function(item) {
                  item.select();

                  // Check if 'AT&T Inc.' is selected
                  item.isSelected().then(function(selected) {
                    if (!selected) {
                      expect(false).customError('"AT&T Inc." is not selected from "Selected" section');
                      CommonFunctions.takeScreenShot();
                    }
                  });

                  item.doubleClick();
                });
              } else {
                expect(false).customError('"Major Telecommunications" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Communications" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "AT&T Inc." is added to the "Selected" section', function() {
      var xpathVirtualListbox = CommonFunctions.replaceStringInXpath(TileOptionsHidden.xpathOfSelectedOrAvailableSection, 'Selected');
      ThiefHelpers.getVirtualListboxClassReference(xpathVirtualListbox).getGroupByText('Economic Sector > Industry').getChildrenText().then(function(columnName) {
        if (columnName[0].text !== 'Communications > Major Telecommunications > AT&T Inc.') {
          expect(false).customError('"Communications > Major Telecommunications > AT&T Inc." is not added to "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    /// Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Expand "Communications > Major Telecommunications" from the calculated report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Communications|Major Telecommunications');

      // Verifying if "Communications > Major Telecommunications" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Communications|Major Telecommunications');
    });

    it('Verifying that all the cells in "Bench. Weight" column displays data', function() {
      PA3MainPage.getAllCellsOfGivenColumn('Weights', 'Bench. Weight', 'slick-pane slick-pane-bottom slick-pane-right').then(function(references) {
        references.forEach(function(elements) {
          elements.getText().then(function(value) {
            if (value === '' && value === 'NA') {
              expect(false).customError('All cells in the "Bench. Weight" column does not displays data."');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying that all the cells in "Difference" column displays data', function() {
      PA3MainPage.getAllCellsOfGivenColumn('Weights', 'Difference', 'slick-pane slick-pane-bottom slick-pane-right').then(function(references) {
        references.forEach(function(elements) {
          elements.getText().then(function(value) {
            if (value === '' && value === 'NA') {
              expect(false).customError('All cells in the "Difference" column does not displays data."');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying that "AT&T Inc." is not displaying under "Communications > Major Telecommunications"', function() {
      PA3MainPage.getElementFromCalculatedTree('Weights', 'Communications|Major Telecommunications', 'AT&T Inc.').isPresent().then(function(bool) {
        if (bool) {
          expect(false).customError('"AT&T Inc." is present inside "Communications|Major Telecommunications"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that report header displays "SP100 vs Russell 1000"', function() {
      PA3MainPage.getHeader().getText().then(function(header) {
        if (header !== 'SP100 vs Russell 1000') {
          expect(false).customError('Report header is not displaying "SP100 vs Russell 1000". Found ' + header);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 544924', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Hidden');

    it('Select "Disable Hidden" from the "Selected" section', function() {
      TileOptionsHidden.getCheckbox('Disable Hidden').click();

      // Verifying if "Disable Hidden" is selected
      expect(Utilities.isCheckboxSelected(TileOptionsHidden.getCheckbox('Disable Hidden'))).toBeTruthy();
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Verifying that "AT&T Inc." is displaying under "Communications > Major Telecommunications"', function() {
      PA3MainPage.getElementFromCalculatedTree('Weights', 'Communications|Major Telecommunications', 'AT&T Inc.').isPresent().then(function(bool) {
        if (!bool) {
          expect(false).customError('"AT&T Inc." is not present inside "Communications|Major Telecommunications"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Collect the names of groupings showing hyphens in "Port. Weight" column', function() {
      PA3MainPage.getColumnCellsHavingSpecifiedValue('Weights', 'Port. Weight', 'slick-pane slick-pane-bottom slick-pane-right', '--').then(function(references) {
        references.forEach(function(element) {
          element.getAttribute('style').then(function(attrValue) {
            arrColumnStyleAttr.push(attrValue.replace(/[\s;]/g, ''));
          });
        });
      }).then(function() {
        arrColumnStyleAttr.forEach(function(attrValue) {
          PA3MainPage.getRowNameHavingSpecifiedAttribute('Weights', 'slick-pane slick-pane-bottom slick-pane-left', 'style', attrValue).then(function(rowName) {
            arrGroupsHavingHyphensInPortWeight.push(rowName);
          });
        });
      });
    });
  });

  describe('Test Step ID: 544925', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Hidden');

    it('De-Select "Disable Hidden" from the "Selected" section', function() {
      TileOptionsHidden.getCheckbox('Disable Hidden').click();

      // Verifying if "Disable Hidden" is de-selected
      expect(Utilities.isCheckboxSelected(TileOptionsHidden.getCheckbox('Disable Hidden'))).toBeFalsy();
    });

    it('Click "X" icon in the "Selected" section to delete all the selected items.', function() {
      TileOptionsHidden.getClearSelectedItemsButton().click();

      var xpathVirtualListbox = CommonFunctions.replaceStringInXpath(TileOptionsHidden.xpathOfSelectedOrAvailableSection, 'Selected');

      // Verifying that all the items from "Selected" section is deleted
      ThiefHelpers.getVirtualListboxClassReference(xpathVirtualListbox).getChildrenText().then(function(ele) {
        if (ele.length !== 0) {
          expect(false).customError('"Available" Section is not cleared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select the checkbox "Hide Benchmark Only" from the "Selected" section', function() {
      TileOptionsHidden.getCheckbox('Hide Benchmark Only').click();

      // Verifying if "Hide Benchmark Only" is selected
      expect(Utilities.isCheckboxSelected(TileOptionsHidden.getCheckbox('Hide Benchmark Only'))).toBeTruthy();
    });

    it('Select "Groups" from "Hide Benchmark Only" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Groups', undefined, TileOptionsHidden.getHideBenchOnlyDropDown());

      // Verifying if "Groups" is selected
      ThiefHelpers.verifySelectedDropDownText('Groups', undefined, TileOptionsHidden.getHideBenchOnlyDropDown());
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Verifying that groupings which had "--" in "Port. Weight" column are not displayed now', function() {
      var elementRef = PA3MainPage.getAllElementsFromCalculatedReport('Weights', 'slick-pane slick-pane-bottom slick-pane-left');
      elementRef.each(function(element) {
        element.getText().then(function() {
        }, function(error) {
          if (error.name === 'StaleElementReferenceError') {
            elementRef = PA3MainPage.getAllElementsFromCalculatedReport('Weights', 'slick-pane slick-pane-bottom slick-pane-left');
          } else {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          }
        });
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          elementRef = PA3MainPage.getAllElementsFromCalculatedReport('Weights', 'slick-pane slick-pane-bottom slick-pane-left');
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Get the names of all the elements displayed in the calculated report
      elementRef.map(function(element) {
        return {
          text: element.getText(),
        };
      }).then(function(rowNames) {
        for (var i = 0; i < rowNames.length; i++) {
          arrAllElementsFromCalculatedReport.push(rowNames[i].text);
        }
      }).then(function() {
        for (var j = 0; j < arrGroupsHavingHyphensInPortWeight.length; j++) {
          for (var k = 0; k < arrAllElementsFromCalculatedReport.length; k++) {
            expect(arrAllElementsFromCalculatedReport[k]).not.toEqual(arrGroupsHavingHyphensInPortWeight[j]);
          }
        }
      });
    });
  });

  describe('Test Step ID: 544932', function() {

    it('Expand "Consumer Services > Cable/Satellite TV" from the calculated report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Consumer Services|Cable/Satellite TV');

      // Verifying if "Consumer Services > Cable/Satellite TV" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Consumer Services|Cable/Satellite TV');
    });

    it('Collect the names of securities showing hyphens in "Port. Weight" column', function() {
      // Clearing the arrays before collecting the new elements
      arrAllElementsFromCalculatedReport = [];
      arrColumnStyleAttr = [];

      PA3MainPage.getColumnCellsHavingSpecifiedValue('Weights', 'Port. Weight', 'slick-pane slick-pane-bottom slick-pane-right', '--').then(function(references) {
        references.forEach(function(element) {
          element.getAttribute('style').then(function(attrValue) {
            arrColumnStyleAttr.push(attrValue.replace(/[\s;]/g, ''));
          });
        });
      }).then(function() {
        arrColumnStyleAttr.forEach(function(attrValue) {
          PA3MainPage.getRowNameHavingSpecifiedAttribute('Weights', 'slick-pane slick-pane-bottom slick-pane-left', 'style', attrValue).then(function(rowName) {
            arrSecuritiesHavingHyphensInPortWeight.push(rowName);
          });
        });
      });
    });

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Hidden');

    it('Select "Securities" from "Hide Benchmark Only" drop down', function() {
      // Click on the drop down to open the menu list
      TileOptionsHidden.getHideBenchOnlyDropDown().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Select "Securities" from the drop down
      TileOptionsHidden.getOptionFromDropDown('Securities').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Securities" is selected
      expect(TileOptionsHidden.getHideBenchOnlyDropDown().getText()).toEqual('Securities');
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Verifying that "Securities" which had "--" in "Port. Weight" column are not displayed now', function() {
      var elementRef = PA3MainPage.getAllElementsFromCalculatedReport('Weights', 'slick-pane slick-pane-bottom slick-pane-left');
      elementRef.each(function(element) {
        element.getText().then(function() {
        }, function(error) {
          if (error.name === 'StaleElementReferenceError') {
            elementRef = PA3MainPage.getAllElementsFromCalculatedReport('Weights', 'slick-pane slick-pane-bottom slick-pane-left');
          } else {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          }
        });
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          elementRef = PA3MainPage.getAllElementsFromCalculatedReport('Weights', 'slick-pane slick-pane-bottom slick-pane-left');
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Get the names of all the elements displayed in the calculated report
      elementRef.map(function(element) {
        return {
          text: element.getText(),
        };
      }).then(function(rowNames) {
        for (var i = 0; i < rowNames.length; i++) {
          arrAllElementsFromCalculatedReport.push(rowNames[i].text);
        }
      }).then(function() {
        for (var j = 0; j < arrSecuritiesHavingHyphensInPortWeight.length; j++) {
          for (var k = 0; k < arrAllElementsFromCalculatedReport.length; k++) {
            expect(arrAllElementsFromCalculatedReport[k]).not.toEqual(arrSecuritiesHavingHyphensInPortWeight[j]);
          }
        }
      });
    });
  });

  describe('Test Step ID: 544933', function() {

    it('Expand "Consumer Durables > Motor Vehicles" from the calculated report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Consumer Durables|Motor Vehicles');

      // Verifying if "Consumer Durables > Motor Vehicles" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Consumer Durables|Motor Vehicles');
    });

    it('Collect the names of "Groupings" and "Securities" showing hyphens in "Port. Weight" column', function() {
      // Clearing the arrays before collecting the new elements
      arrAllElementsFromCalculatedReport = [];
      arrColumnStyleAttr = [];

      PA3MainPage.getColumnCellsHavingSpecifiedValue('Weights', 'Port. Weight', 'slick-pane slick-pane-bottom slick-pane-right', '--').then(function(references) {
        references.forEach(function(element) {
          element.getAttribute('style').then(function(attrValue) {
            arrColumnStyleAttr.push(attrValue.replace(/[\s;]/g, ''));
          });
        });
      }).then(function() {
        arrColumnStyleAttr.forEach(function(attrValue) {
          PA3MainPage.getRowNameHavingSpecifiedAttribute('Weights', 'slick-pane slick-pane-bottom slick-pane-left', 'style', attrValue).then(function(rowName) {
            arrElementsHavingHyphensInPortWeight.push(rowName);
          });
        });
      });
    });

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Hidden');

    it('Select "Securities and Groups" from "Hide Benchmark Only" drop down', function() {
      // Click on the drop down to open the menu list
      TileOptionsHidden.getHideBenchOnlyDropDown().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Select "Securities and Groups" from the drop down
      TileOptionsHidden.getOptionFromDropDown('Securities and Groups').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Securities and Groups" is selected
      TileOptionsHidden.getHideBenchOnlyDropDown().getText().then(function(text) {
        if (text !== 'Securities and Groups') {
          expect(false).customError('"Securities and Groups" option is not selected "Hide Benchmark Only" drop down');
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Verifying that "Groupings" and "Securities" which had "--" in "Port. Weight" column are not displayed now', function() {
      var elementRef = PA3MainPage.getAllElementsFromCalculatedReport('Weights', 'slick-pane slick-pane-bottom slick-pane-left');
      elementRef.each(function(element) {
        element.getText().then(function() {
        }, function(error) {
          if (error.name === 'StaleElementReferenceError') {
            elementRef = PA3MainPage.getAllElementsFromCalculatedReport('Weights', 'slick-pane slick-pane-bottom slick-pane-left');
          } else {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          }
        });
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          elementRef = PA3MainPage.getAllElementsFromCalculatedReport('Weights', 'slick-pane slick-pane-bottom slick-pane-left');
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Get the names of all the elements displayed in the calculated report
      elementRef.map(function(element) {
        return {
          text: element.getText(),
        };
      }).then(function(rowNames) {
        for (var i = 0; i < rowNames.length; i++) {
          arrAllElementsFromCalculatedReport.push(rowNames[i].text);
        }
      }).then(function() {
        for (var j = 0; j < arrElementsHavingHyphensInPortWeight.length; j++) {
          for (var k = 0; k < arrAllElementsFromCalculatedReport.length; k++) {
            expect(arrAllElementsFromCalculatedReport[k]).not.toEqual(arrElementsHavingHyphensInPortWeight[j]);
          }
        }
      });
    });
  });

});
