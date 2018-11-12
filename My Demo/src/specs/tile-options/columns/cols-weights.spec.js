'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: cols-weights', function() {

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  describe('Test Step ID: 544436', function() {

    // Should un-check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should launch the PA3 application with "Client:default_doc_auto" document', function() {
      PA3MainPage.switchToDocument('default-doc-auto');
    });

    it('Should un-check "Automatic Calculation" option if not already un-checked', function() {
      expect(PA3MainPage.setAutomaticCalculation(false)).toBeTruthy();
    });

  });

  describe('Test Step ID: 544437', function() {

    it('Should select "Weights" report from LHP', function() {
      PA3MainPage.getReports('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Check if report - 'Weights' is selected
      expect(PA3MainPage.getReports('Weights').getAttribute('class')).toContain('selected');
    });

    it('Should click on the "Wrench" icon in the "Weights\'" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Weights') {
          expect(false).customError('"Tile Options - Weights" view has not appeared. ' +
            'Expected: "Tile Options - Weights" but Found: "' + value + '"');
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

    it('Should select "Variation in Ending Weight" from the "Selected" list', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Variation in Ending Weight').select();

      // Verify if 'Variation in Ending Weight' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Variation in Ending Weight').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Variation in Ending Weight" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 544438', function() {

    it('Should click on "Statistics" expandable section', function() {
      expect(TileOptionsColumns.expandSectionInOptionsPane('Statistics')).toBeTruthy();
    });

  });

  describe('Test Step ID: 544439', function() {

    it('Should select "Default Weight" under "Column Weights" section', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsColumns.xpathColWeightDropDown).selectItemByText('Default Weight');

      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsColumns.xpathColWeightDropDown).getSelectedText().then(function(selectedElement) {
        if (selectedElement !== 'Default Weight') {
          expect(false).customError('"Default Weight" is not displayed on "Column Weights" drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Port. Ending Weight" is displayed next to "Default weight" drop down', function() {
      TileOptionsColumns.getSelectedWeightFromStatistics().getText().then(function(dropdownName) {
        if (dropdownName !== 'Port. Ending Weight') {
          expect(false).customError('"Port. Ending Weight" is not displayed next to "Default Weight" drop down. Found "' + dropdownName + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 544440', function() {

    it('Should select "Custom Weight" from "Defaults Weights" drop down', function() {
      //expect(TileOptionsColumns.setColumnWeightDropDownFromStatistics('Custom Weight')).toBeTruthy();
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsColumns.xpathColWeightDropDown).selectItemByText('Custom Weight');

      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsColumns.xpathColWeightDropDown).getSelectedText().then(function(selectedElement) {
        if (selectedElement !== 'Custom Weight') {
          expect(false).customError('"Custom Weight" is not displayed on dropdown of Column Weights section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Search" field is displayed below "Custom Weight" drop down', function() {
      expect(TileOptionsColumns.getSearchFieldFromStatistics().isPresent()).toBeTruthy();
    });

    it('Should type "Average" into the "Search" field', function() {
      TileOptionsColumns.getSearchFieldFromStatistics().sendKeys('Average');
      browser.sleep(2000);
    });

    it('Should select "Port. Average Weight" from "FactSet"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsColumns.xpathOptionsContainerSubLevels).getGroupByText('FactSet');
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('Port. Average Weight').then(function(value) {
            value.select();

            // Verifying if "Port. Average Weight" is selected
            value.isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError('"Port. Average Weight" is not selected');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Factset" group was not expanded');
          CommonFunctions.takeScreenShot();
        }

      });
    });

    it('Verifying that "Port. Average Weight" is displayed next to "Custom Weights" drop down', function() {
      TileOptionsColumns.getSelectedWeightFromStatistics().getText().then(function(dropdownName) {
        if (dropdownName !== 'Port. Average Weight') {
          expect(false).customError('"Port. Average Weight" is not displayed next to "Custom Weight" drop down. Found "' + dropdownName + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 544441', function() {

    it('Should click on "OK" button from "Tile Options - Weights" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Weights" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - Weights" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Weights" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Weights" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
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

    it('Should click on the "Wrench" icon in the "Weights\'" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Weights') {
          expect(false).customError('"Tile Options - Weights" view has not appeared. ' +
            'Expected: "Tile Options - Weights" but Found: "' + value + '"');
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

    it('Should select "Variation in Ending Weight" from the "Selected" list', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Variation in Ending Weight').select();

      // Verify if 'Variation in Ending Weight' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Variation in Ending Weight').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Variation in Ending Weight" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Statistics" expandable section', function() {
      expect(TileOptionsColumns.expandSectionInOptionsPane('Statistics')).toBeTruthy();
    });

    it('Should select "Default Weight" from "Custom Weights" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsColumns.xpathColWeightDropDown).selectItemByText('Default Weight');

      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsColumns.xpathColWeightDropDown).getSelectedText().then(function(selectedElement) {
        if (selectedElement !== 'Default Weight') {
          expect(false).customError('"Default Weight" is not displayed on drop down "Column Weights" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Custom Weight" from "Default Weight" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsColumns.xpathColWeightDropDown).selectItemByText('Custom Weight');

      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsColumns.xpathColWeightDropDown).getSelectedText().then(function(selectedElement) {
        if (selectedElement !== 'Custom Weight') {
          expect(false).customError('"Custom Weight" is not displayed on dropdown of Column Weights section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Port. Ending Weight" is displayed next to "Custom Weight" drop down', function() {
      TileOptionsColumns.getSelectedWeightFromStatistics().getText().then(function(dropdownName) {
        if (dropdownName !== 'Port. Ending Weight') {
          expect(false).customError('"Port. Ending Weight" is not displayed next to "Custom Weight" drop down. Found "' + dropdownName + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 544494', function() {

    it('Should enter "earnings" into the search filed in "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('earnings');

      // Verifying that "earnings" is typed into the search field
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== 'earnings') {
          expect(false).customError('"earnings" is not typed into the search field.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the element to load
      browser.sleep(2000);
    });

    it('Should double click on "Price to Earnings" from "FactSet"', function() {
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Price to Earnings').then(function(item) {
        item.select();
        item.doubleClick();
      });

    });

    it('Verifying that "Price to Earnings" is added to the "Selected" section', function() {
      CommonPageObjectsForPA3.verifyIfElementIsPresentInSelectedSection('Price to Earnings', xpathOfSelectedSection);
    });

    it('Verifying if "Price to Earnings" is highlighted in the selected section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Price to Earnings').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Price to Earnings" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Statistics" section from "Options" pane', function() {
      expect(TileOptionsColumns.expandSectionInOptionsPane('Statistics')).toBeTruthy();
    });

  });

  describe('Test Step ID: 544495', function() {

    it('Verifying that "Port. Ending Weight" is displayed next to "Default Weight" drop down', function() {
      TileOptionsColumns.getSelectedWeightFromStatistics().getText().then(function(dropdownName) {
        if (dropdownName !== 'Port. Ending Weight') {
          expect(false).customError('"Port. Ending Weight" is not displayed next to "Default Weight" drop down. Found "' + dropdownName + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 544496', function() {

    it('Should select "Custom Weight" from "Default Weight" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsColumns.xpathColWeightDropDown).selectItemByText('Custom Weight');

      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsColumns.xpathColWeightDropDown).getSelectedText().then(function(selectedElement) {
        if (selectedElement !== 'Custom Weight') {
          expect(false).customError('"Custom Weight" is not displayed on dropdown of Column Weights section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Search" field is displayed below "Custom Weight" drop down', function() {
      expect(TileOptionsColumns.getSearchFieldFromStatistics().isPresent()).toBeTruthy();
    });

    it('Should type "market" into the "Search" field', function() {
      TileOptionsColumns.getSearchFieldFromStatistics().sendKeys('market');
      browser.sleep(2000);
    });

    it('Should select "Port. Beginning Market Value" from "FactSet"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsColumns.xpathOptionsContainerSubLevels).getGroupByText('FactSet');
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('Port. Beginning Market Value').then(function(value) {
            value.select();

            // Verifying if "Port. Beginning Market Value" is selected
            value.isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError('"Port. Beginning Market Value" is not selected');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Factset" group was not expanded');
          CommonFunctions.takeScreenShot();
        }

      });
    });

    it('Should select "Variation in Ending Weight" from the "Selected" list', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Variation in Ending Weight').select();

      // Verify if 'Variation in Ending Weight' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Variation in Ending Weight').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Variation in Ending Weight" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should again select "Price to Earnings" from the "Selected" list', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Price to Earnings').select();

      // Verify if 'Price to Earnings' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Price to Earnings').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Price to Earnings" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Port. Beginning Market Value" is displayed next to "Custom Weight" drop down under COLUMN WEIGHTS in "Statistics" accordion', function() {
      TileOptionsColumns.getSelectedWeightFromStatistics().getText().then(function(dropdownName) {
        if (dropdownName !== 'Port. Beginning Market Value') {
          expect(false).customError('"Port. Beginning Market Value" is not displayed next to "Custom Weight" drop down. Found "' + dropdownName + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 544497', function() {

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Weights" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Weights" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
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

    it('Should click on the "Wrench" icon in the "Weights" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Weights') {
          expect(false).customError('"Tile Options - Weights" view has not appeared. ' +
            'Expected: "Tile Options - Weights" but Found: "' + value + '"');
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

    it('Should select "Price to Earnings" from the "Selected" list', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Price to Earnings').select();

      // Verify if 'Price to Earnings' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Price to Earnings').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Price to Earnings" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Statistics" expandable section', function() {
      expect(TileOptionsColumns.expandSectionInOptionsPane('Statistics')).toBeTruthy();
    });

    it('Should select "Custom Weight" from "Column Weights" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsColumns.xpathColWeightDropDown).selectItemByText('Custom Weight');

      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsColumns.xpathColWeightDropDown).getSelectedText().then(function(selectedElement) {
        if (selectedElement !== 'Custom Weight') {
          expect(false).customError('"Custom Weight" is not displayed on dropdown of Column Weights section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Default Weight" from "Custom Weights" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsColumns.xpathColWeightDropDown).selectItemByText('Default Weight');

      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsColumns.xpathColWeightDropDown).getSelectedText().then(function(selectedElement) {
        if (selectedElement !== 'Default Weight') {
          expect(false).customError('"Default Weight" is not displayed on drop down "Column Weights" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Port. Ending Weight" is displayed next to "Custom Weight" drop down', function() {
      expect(TileOptionsColumns.getSelectedWeightFromStatistics().getText()).toEqual('Port. Ending Weight');
    });

  });

  describe('Test Step ID: 716885', function() {

    it('Should enter "Dividend Yield" into the search field in "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('Dividend Yield');

      // Verifying that "Dividend Yield" is typed into the search field
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== 'Dividend Yield') {
          expect(false).customError('"Dividend Yield" is not typed into the search field.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the element to load
      browser.sleep(2000);
    });

    it('Should double click on "Dividend Yield" from "FactSet"', function() {
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Dividend Yield').then(function(item) {
        item.select();
        item.doubleClick();
      });

    });

    it('Verifying that "Dividend Yield" is added to the "Selected" section', function() {
      CommonPageObjectsForPA3.verifyIfElementIsPresentInSelectedSection('Dividend Yield', xpathOfSelectedSection);
    });

    it('Click on "X" button in "Available" search field to clear the search', function() {
      TileOptionsColumns.getSearchClearButton().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if search field is cleared
      expect(element(by.xpath(TileOptionsColumns.xpathSearchField)).getAttribute('value')).toEqual('');

    });

    it('Should enter "Bench. Ending Effective Duration" into the search field in "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('Bench. Ending Effective Duration');

      // Verifying that "Bench. Ending Effective Duration" is typed into the search field
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== 'Bench. Ending Effective Duration') {
          expect(false).customError('"Bench. Ending Effective Duration" is not typed into the search field.; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the element to load
      browser.sleep(2000);
    });

    it('Should double click on "Bench. Ending Effective Duration" from "FactSet"', function() {
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Bench. Ending Effective Duration').then(function(item) {
        item.select();
        item.doubleClick();
      });

    });

    it('Verifying that "Bench. Ending Effective Duration" is added to the "Selected" section', function() {
      CommonPageObjectsForPA3.verifyIfElementIsPresentInSelectedSection('Bench. Ending Effective Duration', xpathOfSelectedSection);
    });

    var arrColumnName = ['Bench. Ending Effective Duration', 'Dividend Yield'];

    var selectedValue = ['Bench. Ending Weight', 'Port. Ending Weight'];

    arrColumnName.forEach(function(columnName, index) {

      it('Click on "' + columnName + '" column and verify if "' + selectedValue[index] + '" is displayed beside "Defaults Weight"', function() {
        TileOptionsColumns.selectColumnFromSelectedAndVerifySelectedWeight(columnName, selectedValue[index], xpathOfSelectedSection);
      });
    });

  });

  describe('Test Step ID: 716886', function() {

    it('Should click on "Cancel" button of "Tile Options" mode header', function() {
      TileOptions.getHeaderButton('Cancel').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Select "Contribution" report from LHP', function() {
      PA3MainPage.getReports('Contribution').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Contribution" report is selected
      expect(PA3MainPage.getReports('Contribution').getAttribute('class')).toContain('selected');
    });

    it('Waiting for "Contribution" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Contribution" report appeared', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Contribution" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution')).toBeTruthy();
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

    it('Should click on the "Wrench" icon in the "Contribution" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Contribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Contribution" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Contribution') {
          expect(false).customError('"Tile Options - Contribution" view has not appeared. ' +
            'Expected: "Tile Options - Contribution" but Found: "' + value + '"');
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

    it('Should enter "Price to Earnings" into the search filed in "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('Price to Earnings');

      // Verifying that "Price to Earnings" is typed into the search field
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== 'Price to Earnings') {
          expect(false).customError('"Price to Earnings" is not typed into the search field.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the element to load
      browser.sleep(2000);
    });

    it('Should double click on "Price to Earnings" from "FactSet"', function() {
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Price to Earnings').then(function(item) {
        item.select();
        item.doubleClick();
      });

    });

    it('Verifying that "Price to Earnings" is added to the "Selected" section', function() {
      CommonPageObjectsForPA3.verifyIfElementIsPresentInSelectedSection('Price to Earnings', xpathOfSelectedSection);
    });

    it('Click on "X" button in "Available" search field to clear the search', function() {
      TileOptionsColumns.getSearchClearButton().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if search field is cleared
      expect(element(by.xpath(TileOptionsColumns.xpathSearchField)).getAttribute('value')).toEqual('');

    });

    it('Should enter "Dividend Yield" into the search filed in "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('Dividend Yield');

      // Verifying that "Dividend Yield" is typed into the search field
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== 'Dividend Yield') {
          expect(false).customError('"Dividend Yield" is not typed into the search field.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the element to load
      browser.sleep(2000);
    });

    it('Should double click on "Dividend Yield" from "FactSet"', function() {
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Dividend Yield').then(function(item) {
        item.select();
        item.doubleClick();
      });

    });

    it('Verifying that "Dividend Yield" is added to the "Selected" section', function() {
      CommonPageObjectsForPA3.verifyIfElementIsPresentInSelectedSection('Dividend Yield', xpathOfSelectedSection);
    });

    it('Click on "X" button in "Available" search field to clear the search', function() {
      TileOptionsColumns.getSearchClearButton().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if search field is cleared
      expect(element(by.xpath(TileOptionsColumns.xpathSearchField)).getAttribute('value')).toEqual('');

    });

    it('Should enter "Effective Duration" into the search field in "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('Effective Duration');

      // Verifying that "Effective Duration" is typed into the search field
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== 'Effective Duration') {
          expect(false).customError('"Effective Duration" is not typed into the search field.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the element to load
      browser.sleep(2000);
    });

    var arrColumnName = ['Port. Ending Effective Duration', 'Bench. Ending Effective Duration'];

    arrColumnName.forEach(function(columnName) {

      it('Should double click on "' + columnName + '" from "FactSet"', function() {
        ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', columnName).then(function(item) {
          item.select();
          item.doubleClick();
        });

      });

      it('Verifying that "' + columnName + '" is added to the "Selected" section', function() {
        CommonPageObjectsForPA3.verifyIfElementIsPresentInSelectedSection(columnName, xpathOfSelectedSection);
      });
    });

    it('Should click on "Statistics" expandable section', function() {
      expect(TileOptionsColumns.expandSectionInOptionsPane('Statistics')).toBeTruthy();
    });

    var columns = ['Price to Earnings', 'Dividend Yield', 'Port. Ending Effective Duration', 'Bench. Ending Effective Duration'];

    var valueDisplayed = ['Port. Beginning Weight', 'Port. Beginning Weight', 'Port. Ending Weight', 'Bench. Ending Weight'];

    columns.forEach(function(colValue, index) {

      it('Click on "' + colValue + '" column and verify if "' + valueDisplayed[index] + '" is displayed beside "Defaults Weight"', function() {
        TileOptionsColumns.selectColumnFromSelectedAndVerifySelectedWeight(colValue, valueDisplayed[index], xpathOfSelectedSection);
      });
    });

  });

});
