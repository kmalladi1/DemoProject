'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: grpgs-fractiles', function() {
  // Variable(s)
  var arrFractilesOptions;
  var arrCustomFractileOptions;
  var arrEditModeOptions;
  var cellReference;

  describe('Test Step ID: 551559', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should open "Client:/default_doc_auto" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });
  });

  describe('Test Step ID: 551558', function() {

    it('Verifying that "Weights" report from LHP is selected by default', function() {
      expect(PA3MainPage.getReports('Weights').getAttribute('class')).toContain('selected');
    });

    it('Should click on "Wrench" button in the "Weights" report\'s workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that drop down menu appeared
      expect(PA3MainPage.getWrenchIconFromReportWorkspace('Weights', true).isPresent()).toBeTruthy();
    });

    it('Select "Options" from the wrench menu list', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Checking if the 'Tile Options' mode has opened.
    it('Validating if "Tile Options" mode opened', function() {
      TileOptions.isTileOptionsMode().then(function(displayed) {
        if (!displayed) {
          expect(false).customError('"Tile Options" mode is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on Groupings LHP item to select.
    it('Should click on Groupings LHP item to select', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Groupings' item is opened.
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Groupings') {
          expect(false).customError('"Groupings" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "FactSet > Equity" tree from "Available" container', function() {
      TileOptionsGroupings.expandElementTree('FactSet|Equity', 'FactSet');

      // Verifying that 'FactSet > Equity' tree is expanded
      TileOptionsGroupings.checkIfExpanded('FactSet|Equity');
    });

    it('Select "Price to Earnings" from "FactSet > Equity" tree', function() {
      TileOptionsGroupings.getElementFromAvailableSection('FactSet|Equity', 'Price to Earnings').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that 'Price to Earnings' is selected
      expect(TileOptionsGroupings.getElementFromAvailableSection('FactSet|Equity', 'Price to Earnings').getAttribute('class')).toContain('selected');
    });

    it('Click "Right" arrow button to add "Price to Earnings" to "Selected" container', function() {
      TileOptionsGroupings.getArrowButton('Right').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Price to Earnings" is added to "Selected" container', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Price to Earnings').isPresent().then(function(added) {
        if (!added) {
          expect(false).customError('"Price to Earnings" is not added to "Selected" container');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Price to Earnings" from "Selected" container', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Price to Earnings').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that 'Price to Earnings' is selected
      expect(TileOptionsGroupings.getElementFromSelectedContainer('Price to Earnings').getAttribute('class')).toContain('selected');
    });

    it('Verifying that "Definition" section from "Options" container is expanded', function() {
      expect(TileOptionsGroupings.getExpandableSection('Definition').getAttribute('class')).not.toContain('collapsed');
    });

    it('Verifying that "Latest Twelve Months" drop down exists in "Definition" section', function() {
      TileOptionsGroupings.getDropDownFromDefinitionSection(undefined, false).getText().then(function(name) {
        if (name !== 'Latest Twelve Months') {
          expect(false).customError('"Latest Twelve Months" drop down is not present in "Definition" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Fractiles" drop down exists in "Definition" section', function() {
      TileOptionsGroupings.getDropDownFromDefinitionSection('Fractiles').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Fractiles" drop down is not present in "Definition" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Fractiles" drop down is set to "Quintile" by default', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsGroupings.getDropDownFromDefinitionSection('Fractiles')).getSelectedText().then(function(selectedElement) {
        console.log(selectedElement);
        if (selectedElement !== 'Quintile') {
          expect(false).customError('"Quintile" is not displayed in the "Fractiles" drop down, found ' + selectedElement);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Bins Based On" drop down is set to "Benchmark" by default', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsGroupings.getDropDownFromDefinitionSection('Bins Based On')).getSelectedText().then(function(selectedElement) {
        if (selectedElement !== 'Benchmark') {
          expect(false).customError('"Benchmark" is not displayed in the "Bins Based On" drop down, found ' + selectedElement);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Bins Use Equal" drop down is set to "No. Securities" by default', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsGroupings.getDropDownFromDefinitionSection('Bins Use Equal')).getSelectedText().then(function(selectedElement) {
        if (selectedElement !== 'No. Securities') {
          expect(false).customError('"No. Securities" is not displayed in the "Bins Use Equal" drop down, found ' + selectedElement);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Low Values Rank Higher" checkbox is not checked off by default', function() {
      Utilities.isCheckboxSelected(TileOptionsGroupings.getSectionCheckBox('Definition', 'Low Values Rank Higher')).then(function(checked) {
        if (checked) {
          expect(false).customError();
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Frequency" drop down is set to "Beginning of Period" by default', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsGroupings.getDropDownFromDefinitionSection('Frequency')).getSelectedText().then(function(selectedElement) {
        if (selectedElement !== 'Beginning of Period') {
          expect(false).customError('"Beginning of Period" is not displayed in the "Frequency" drop down, found ' + selectedElement);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 551562', function() {

    it('Should click on "Fractiles" drop down to verify the options', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsGroupings.getDropDownFromDefinitionSection('Fractiles')).open();
    });

    arrFractilesOptions = ['Quartile', 'Quintile', 'Decile', 'Percentile', 'N-Tile', 'Custom'];
    it('Verifying that "' + arrFractilesOptions + '" option is present in the "Fractiles" drop down', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(ddElements) {
        ddElements.forEach(function(optionName, index) {
          if (optionName !== arrFractilesOptions[index]) {
            expect(false).customError('"' + arrFractilesOptions[index] + '" option is not present in the "Fractiles" ' +
              'drop down. Found ' + optionName);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });
  });

  describe('Test Step ID: 551598', function() {

    it('Should select "N-Tile" from "Fractiles" drop down', function() {
      // Select "N-Tile" from the drop down
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsGroupings.getDropDownFromDefinitionSection('Fractiles')).selectItemByText('N-Tile');

      // Verifying that "N-Tile" option is selected
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsGroupings.getDropDownFromDefinitionSection('Fractiles')).getSelectedText().then(function(text) {
        if (text !== 'N-Tile') {
          expect(false).customError('The "Fractiles" drop down is not set to "N-Tile"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "20" into the filed just added under "Fractiles" drop down', function() {
      TileOptionsGroupings.setNTileSpinBox(20).getAttribute('value').then(function(value) {
        if (value !== '20') {
          expect(false).customError('"20" is not entered into the filed just added under "Fractiles" drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that up arrow button is enabled', function() {
      element(by.xpath(TileOptionsGroupings.xpathNTileUpSpinButton)).getAttribute('class').then(function(value) {
        if (value.indexOf('disabled') !== -1) {
          expect(false).customError('Up arrow for "Fractiles" number input is disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 551563', function() {

    it('Should select "Custom" option from "Fractiles" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsGroupings.getDropDownFromDefinitionSection('Fractiles')).open();

      // Select "N-Tile" from the drop down
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsGroupings.getDropDownFromDefinitionSection('Fractiles')).selectItemByText('Custom');

      // Verifying that "Custom" option is selected
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsGroupings.getDropDownFromDefinitionSection('Fractiles')).getSelectedText().then(function(text) {
        if (text !== 'Custom') {
          expect(false).customError('The "Fractiles" drop down is not set to "Custom"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });

      browser.sleep(2000); // Waiting for 'Custom' Fractile fields to appear
    });

    arrCustomFractileOptions = ['Boundary', 'Name', 'Add Button', 'Edit Button', 'Bin Display Box'];
    arrCustomFractileOptions.forEach(function(option) {
      it('Verifying that "' + option + '" got added after selecting "Custom" Fractiles', function() {
        expect(TileOptionsGroupings.getCustomFractilesOptions(option).isPresent()).toBeTruthy();
      });
    });

    it('Verifying that "PE Bin 1 : greater than 0.000" is displayed in the Text Area by default', function() {
      expect(TileOptionsGroupings.getElementFromBinDisplayBox('PE Bin 1 : greater than 0.000').isPresent()).toBeTruthy();
    });
  });

  describe('Test Step ID: 551564', function() {

    it('Click "Boundary\'s" upward spin button to set its value to "1"', function() {
      expect(TileOptionsGroupings.setCustomFractileBoundaryField('1', false, true).getAttribute('value')).toEqual('1');
    });

    it('Should type "Test1" in the "Name" edit box', function() {
      TileOptionsGroupings.getCustomFractilesOptions('Name').clear().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      }); // Clear the text before entering

      // Enter 'Test1'
      TileOptionsGroupings.getCustomFractilesOptions('Name').sendKeys('Test1').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if 'Test1' is entered into the Name field
      expect(TileOptionsGroupings.getCustomFractilesOptions('Name').getAttribute('value')).toEqual('Test1');
    });

    it('Click on "Add" button to add "Test1" to text area', function() {
      TileOptionsGroupings.getCustomFractilesOptions('Add').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Test1(PE Bin 1 : greater than 1.000)" is added to the text area', function() {
      expect(TileOptionsGroupings.getElementFromBinDisplayBox('Test1(PE Bin 1 : greater than 1.000)').isPresent()).toBeTruthy();
    });
  });

  describe('Test Step ID: 551566', function() {

    it('Type "2" into "Boundary\'s" input box', function() {
      expect(TileOptionsGroupings.setCustomFractileBoundaryField('2', true, false).getAttribute('value')).toEqual('2');
    });

    it('Should type "Test2" in the "Name" edit box', function() {
      TileOptionsGroupings.getCustomFractilesOptions('Name').clear().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      }); // Clear the text before entering

      // Enter 'Test2'
      TileOptionsGroupings.getCustomFractilesOptions('Name').sendKeys('Test2').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if 'Test2' is entered into the Name field
      expect(TileOptionsGroupings.getCustomFractilesOptions('Name').getAttribute('value')).toEqual('Test2');
    });

    it('Click on "Add" button to add "Test2" to text area', function() {
      TileOptionsGroupings.getCustomFractilesOptions('Add').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Test2(PE Bin 1 : greater than 2.000)" is added to the text area', function() {
      TileOptionsGroupings.getElementFromBinDisplayBox('Test2(PE Bin 1 : greater than 2.000)').isPresent().then(function(added) {
        if (!added) {
          expect(false).customError(' "Test2(PE Bin 1 : greater than 2.000)" is not added to the text area');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 551560', function() {

    it('Click on "Edit" icon from the "Custom" Fractile section', function() {
      TileOptionsGroupings.getCustomFractilesOptions('Edit').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    arrEditModeOptions = ['Update button', 'Cancel button', 'table'];
    arrEditModeOptions.forEach(function(option) {
      it('Verifying that "' + option + '" exists in edit mode of "Custom Fractiles"', function() {
        expect(TileOptionsGroupings.getCustomFractilesEditModeOptions(option).isPresent()).toBeTruthy();
      });
    });

    it('Verifying that "Update" button is appearing above the table', function() {
      expect(TileOptionsGroupings.isButtonAboveTable('Update')).toBeTruthy();
    });

    it('Verifying that "Cancel" button is appearing above the table', function() {
      expect(TileOptionsGroupings.isButtonAboveTable('Cancel')).toBeTruthy();
    });
  });

  describe('Test Step ID: 551565', function() {

    it('Double click on "Test1" under "Name" column. The cell should be editable now.', function() {
      cellReference = TileOptionsGroupings.getFractileTableCell(2, 2);

      // Double clicking on the cell
      browser.actions().doubleClick(cellReference).perform();

      browser.sleep(2000); // Waiting for the field to become editable

      // Verifying of cell is editable now
      expect(TileOptionsGroupings.getFractileTableCell(2, 2).getAttribute('class')).toContain('editable');
    });

    it('Replace "Test1" with "Test3"', function() {
      TileOptionsGroupings.editCellValue(2, 2, 'Test3');
    });

    it('Verifying if "Test1" is changed to "Test3"', function() {
      expect(TileOptionsGroupings.getFractileTableCell(2, 2).getText()).toEqual('Test3');
    });

    it('Double click on "1" under "Lower Bound" column. The cell should be editable now.', function() {
      cellReference = TileOptionsGroupings.getFractileTableCell(2, 3);

      // Double clicking on the cell
      browser.actions().doubleClick(cellReference).perform();

      browser.sleep(2000); // Waiting for the field to become editable

      // Verifying of cell is editable now
      expect(TileOptionsGroupings.getFractileTableCell(2, 3).getAttribute('class')).toContain('editable');
    });

    it('Replace "1" with "3"', function() {
      TileOptionsGroupings.editCellValue(2, 3, '3');
    });

    it('Verifying if "1" is changed to "3"', function() {
      TileOptionsGroupings.getFractileTableCell(2, 3).getText().then(function(value) {
        if (value !== '3') {
          expect(false).customError(' "1" is not changed to "3"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click "Update" button to update the cell values', function() {
      TileOptionsGroupings.getCustomFractilesEditModeOptions('Update').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Test1(PE Bin 1 : greater than 1.000)" is updated to "Test3(PE Bin 1 : greater than 3.000)" under ' + '"Bin Display Box"', function() {
      TileOptionsGroupings.getElementFromBinDisplayBox('Test3(PE Bin 1 : greater than 3.000)').isPresent().then(function(displayed) {
        if (!displayed) {
          expect(false).customError('"Test1(PE Bin 1 : greater than 1.000)" is not updated to "Test3(PE Bin 1 : greater than 3.000)" under ' + '"Bin Display Box"');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying that 'Test1(PE Bin 1 : greater than 1.000)' is no more visible in 'Bin Display Box'
      TileOptionsGroupings.getElementFromBinDisplayBox('Test1(PE Bin 1 : greater than 1.000)').isPresent().then(function(notDisplayed) {
        if (notDisplayed) {
          expect(false).customError();
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 551567', function() {

    it('Click on "Edit" icon from the "Custom" Fractile section', function() {
      TileOptionsGroupings.getCustomFractilesOptions('Edit').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Hover over the "2nd" row in the table and click on "X" button to delete "Test2" bin', function() {
      // Hovering over the 2nd row
      browser.actions().mouseMove(TileOptionsGroupings.getFractileTableCell(2, 3)).perform();

      // Click on delete button to remove the row
      TileOptionsGroupings.deleteRowButton(2).click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Click "Update" button to update the "Bin Display Box"', function() {
      TileOptionsGroupings.getCustomFractilesEditModeOptions('Update').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Test2(PE Bin 1 : greater than 2.000)" should no longer be available under "Bin Display Box"', function() {
      expect(TileOptionsGroupings.getElementFromBinDisplayBox('Test2(PE Bin 1 : greater than 2.000)').isPresent()).toBeFalsy();
    });
  });

  describe('Test Step ID: 551593', function() {

    it('Click on "Edit" icon from the "Custom" Fractile section', function() {
      TileOptionsGroupings.getCustomFractilesOptions('Edit').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Double click on "Test3" under "Name" column. The cell should be editable now.', function() {
      cellReference = TileOptionsGroupings.getFractileTableCell(1, 2);

      // Double clicking on the cell
      browser.actions().doubleClick(cellReference).perform();

      browser.sleep(2000); // Waiting for the field to become editable

      // Verifying of cell is editable now
      expect(TileOptionsGroupings.getFractileTableCell(1, 2).getAttribute('class')).toContain('editable');
    });

    it('Replace "Test3" with "Test4"', function() {
      TileOptionsGroupings.editCellValue(1, 2, 'Test4');
    });

    it('Verifying if "Test3" is changed to "Test4"', function() {
      TileOptionsGroupings.getFractileTableCell(1, 2).getText().then(function(value) {
        if (value !== 'Test4') {
          expect(false).customError('"Test3" is not changed to "Test4"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Double click on "3" under "Lower Bound" column. The cell should be editable now.', function() {
      cellReference = TileOptionsGroupings.getFractileTableCell(1, 3);

      // Double clicking on the cell
      browser.actions().doubleClick(cellReference).perform();

      browser.sleep(2000); // Waiting for the field to become editable

      // Verifying of cell is editable now
      expect(TileOptionsGroupings.getFractileTableCell(1, 3).getAttribute('class')).toContain('editable');
    });

    it('Replace "3" with "4" using "Up" arrow button', function() {
      TileOptionsGroupings.setLowerBoundValue(4, false, true);
    });

    it('Verifying if "3" is changed to "4"', function() {
      TileOptionsGroupings.setLowerBoundValue().getAttribute('value').then(function(value) {
        if (value !== '4') {
          expect(false).customError();
          CommonFunctions.takeScreenShot();
        }
      });

      // Click "ENTER" to accept value
      TileOptionsGroupings.setLowerBoundValue().sendKeys(protractor.Key.ENTER);
    });

    it('Click "Update" button to update the cell values', function() {
      TileOptionsGroupings.getCustomFractilesEditModeOptions('Update').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Test3(PE Bin 1 : greater than 3.000)" is updated to "Test4(PE Bin 1 : greater than 4.000)" under ' + '"Bin Display Box"', function() {
      TileOptionsGroupings.getElementFromBinDisplayBox('Test4(PE Bin 1 : greater than 4.000)').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Test3(PE Bin 1 : greater than 3.000)" is not updated to "Test4(PE Bin 1 : greater than 4.000)" under ' + '"Bin Display Box"');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying that 'Test3(PE Bin 1 : greater than 3.000)' is no more visible in 'Bin Display Box'
      TileOptionsGroupings.getElementFromBinDisplayBox('Test3(PE Bin 1 : greater than 3.000)').isPresent().then(function(notPresent) {
        if (notPresent) {
          expect(false).customError('"Test3(PE Bin 1 : greater than 3.000)" is  visible in "Bin Display Box"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 551561', function() {

    // Clicking on the Cancel button to close Tile Options Mode
    it('Should click on the "Cancel" Button', function() {
      TileOptions.getHeaderButton('Cancel').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Verifying if mode is closed.
    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should close the PA3 application', function() {
      expect(true).toBeTruthy();
    });
  });
});
