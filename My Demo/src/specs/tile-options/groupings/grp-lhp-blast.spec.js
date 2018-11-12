'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: grp-lhp-blast', function() {

  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsGroupings.xpathOfAvailableOrSelectedContainer, 'Available');

  describe('Test Step ID: 703139', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

    it('Type "Client:/pa3/georev/MOCK_UP.ACCT" into the "Portfolio" widget box and select "Client:/pa3/georev/MOCK_UP.ACCT" from type ahead', function() {
      PA3MainPage.setPortfolio('Client:/pa3/georev/MOCK_UP.ACCT', 'Client:/pa3/georev/MOCK_UP.ACCT', 'Client:/pa3/georev/MOCK_UP.ACCT').then(function(value) {
        if (!value) {
          expect(false).customError('"Client:/pa3/TEST.ACCT" is not found/selected from typeahead.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Type "Client:/pa3/georev/MOCK_UP.ACCT" in the "Benchmark" widget and select "Client:/pa3/georev/MOCK_UP.ACCT" ' +
      'from the type ahead', function() {
      PA3MainPage.setBenchmark('Client:/pa3/georev/MOCK_UP.ACCT', true, false, 'Client:/pa3/georev/MOCK_UP.ACCT',
        'Client:/pa3/georev/MOCK_UP.ACCT').then(function(value) {
        expect(value).toBeTruthy();
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any issues', function() {
      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Weights').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Error:Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('Error: "Calculation Error" dialog is seen while "Weights" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if header displays "MOCK_UP vs MOCK_UP" in "Weights" report', function() {
      PA3MainPage.getHeader().getText().then(function(text) {
        if (text !== 'MOCK_UP vs MOCK_UP') {
          expect(false).customError('Header of application is not showing "MOCK_UP vs MOCK_UP". ' +
            'Expected: "MOCK_UP vs MOCK_UP", Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 703140', function() {

    it('Should click on the "Economic Sector" on the weights report workspace', function() {
      // Clicking Economic Sector hyper link in weights report
      PA3MainPage.getGroupingsHyperLink('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is opened', function() {
      //verifying tile options mode is opened
      TileOptions.isTileOptionsMode().then(function(option) {
        if (!option) {
          expect(false).customError('"Tile Options" mode is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should Expand the tree from "Available" container for "FactSet>Country & Region>FactSet"', function() {
      TileOptionsGroupings.expandElementTree('FactSet|Country & Region|FactSet', 'FactSet');
      TileOptionsGroupings.checkIfExpanded('FactSet|Country & Region|FactSet');
    });

    it('Should select the item "GeoRev Region" from "Available" container and clicking the right arrow button', function() {
      TileOptionsGroupings.getElementFromAvailableSection('FactSet|Country & Region|FactSet', 'GeoRev Region').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
      TileOptionsGroupings.getArrowButton('Right').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "GeoRev Region - FactSet" is present in the "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('GeoRev Region - FactSet').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"GeoRev Region - FactSet" is not present in the "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Apply To Weights" button from Tile Options Page', function() {
      ThiefHelpers.getButtonClassReference('Apply To Weights').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Apply To Weights" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Contribution" checkbox from the blasted window', function() {
      TileOptionsGroupings.getCheckBoxFromBlastWindow('Contribution').click();

      // Verifying that checkboxes are selected
      Utilities.isCheckboxSelected(TileOptionsGroupings.getCheckBoxFromBlastWindow('Contribution')).then(function(bool) {
        if (!bool) {
          expect(false).customError('Failed to check "Contribution" checkbox from blasted window');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in the blasted window', function() {
      TileOptionsGroupings.getOkOrCancelButtonFromBlastedWindow('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Verifying if mode is closed.
    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if calculated data for "Weights" report appeared without any issues', function() {
      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Weights').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Error:Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('Error: "Calculation Error" dialog is seen while "Weights" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 703141', function() {

    it('Should click on "Contribution" in the LHP', function() {
      PA3MainPage.getReports('Contribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if calculated data for "Contribution" report appeared without any issues', function() {
      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Contribution').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Error:Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('Error: "Calculation Error" dialog is seen while "Contribution" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if expand Consumer Durables > Motor Vehicles > Americas ', function() {
      PA3MainPage.expandTreeInCalculatedReport('Contribution', 'Consumer Durables|Motor Vehicles|Americas');

      //Verifying if "'Contribution', 'Consumer Durables > Motor Vehicles > Americas'" was expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Contribution', 'Consumer Durables|Motor Vehicles|Americas');
    });

    it('Should click on the "Economic Sector" on the weights report workspace', function() {
      // Clicking Economic Sector hyper link in weights report
      PA3MainPage.getGroupingsHyperLink('Contribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is opened', function() {
      //verifying tile options mode is opened
      TileOptions.isTileOptionsMode().then(function(option) {
        if (!option) {
          expect(false).customError('"Tile Options" mode is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrElements = ['Economic Sector - FactSet', 'Industry - FactSet', 'GeoRev Region - FactSet'];

    arrElements.forEach(function(element) {
      it('Verifying that "' + element + '" is present in the "Selected" section', function() {
        TileOptionsGroupings.getElementFromSelectedContainer(element).isPresent().then(function(present) {
          if (!present) {
            expect(false).customError('"' + element + '" is present in the "Selected" section.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on "Cancel" button of "Tile Options" mode header', function() {
      TileOptions.getHeaderButton('Cancel').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 776811', function() {

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Weights', true, 'isSelected');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');

    // The below code is a work around for removing any existing groupings

    CommonPageObjectsForPA3.expandAListBoxGroupAndDeleteItem('Client', xpathOfAvailableSection, 'Edit-grp-right', 'Grouping', 'OK');

    // The below code is a work around for removing any existing groupings

    CommonPageObjectsForPA3.expandAListBoxGroupAndDeleteItem('Personal', xpathOfAvailableSection, 'grp-right', 'Grouping', 'OK');

    // The below code is a work around for removing any existing groupings

    CommonPageObjectsForPA3.expandAListBoxGroupAndDeleteItem('Client', xpathOfAvailableSection, 'col-grp-right', 'Grouping', 'OK');

    // The below code is a work around for removing any existing groupings

    CommonPageObjectsForPA3.expandAListBoxGroupAndDeleteItem('Document', xpathOfAvailableSection, 'Refgrp-right', 'Grouping', 'OK');

    CommonPageObjectsForPA3.clickOnAddButtonAndSelectOptionFromDropdown('New/Reference', 'Groupings');

    // Enter formula into the section, click on the X Close butoon and verify the formula entered
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'P_PRICE', undefined, undefined, 'X', 'P_PRICE');

    CommonPageObjectsForPA3.selectDirectoryAndSubDirectoryAndVerify(undefined, 'Client');

    it('Should enter "Edit-grp-right" in Name field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Edit-grp-right');

      // Verifying that "Name" field is set to "Edit-grp-right"
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Edit-grp-right') {
          expect(false).customError('"Name" field did not set to "Edit-grp-right"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Edit Groupings');

    var selectedItems = [];
    it('Should expand "Client" in the "Available" section and double click on "Edit-grp-right" to move it to Selected section', function() {
      var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsGroupings.xpathOfAvailableOrSelectedContainer, 'Available');
      var group = ThiefHelpers.getListboxClassReference(xpathOfAvailableSection).getGroupByText('Client');

      // Verifying if the Client in the available section is expanded
      group.isExpanded().then(function(bool) {
        if (!bool) {
          group.expand();
          group.isExpanded.then(function(flag) {
            if (!flag) {
              expect(false).customError('Client is not expanded');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      }).then(function() {
        ThiefHelpers.getListBoxItem(xpathOfAvailableSection, 'Edit-grp-right', 'Client').then(function(ref) {
          browser.actions().doubleClick(ref).perform();
        });
      });
    });

    it('Should verify if the "Edit-grp-right" is added to Selected section', function() {
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsGroupings.xpathOfAvailableOrSelectedContainer, 'Selected');
      ThiefHelpers.getListboxClassReference(xpathOfSelectedSection).getChildrenText().then(function(childrenArray) {
        childrenArray.forEach(function(listItem) {
          selectedItems.push(listItem.text);
        });
      }).then(function() {
        if (selectedItems.indexOf('Edit-grp-right') === -1) {
          expect(false).customError('"Edit-grp-right" is not added to selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

  });

  describe('Test Step ID: 776812', function() {

    it('Should expand "Consumer Durables>Motor Vehicles>Africa & Middle East"', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Consumer Durables|Motor Vehicles|Africa & Middle East');

      // Verifying if "Consumer Durables|Motor Vehicles|Africa & Middle East" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Consumer Durables|Motor Vehicles|Africa & Middle East');
    });

    it('Should right click on added number grouping and select Groupings|Edit Groupings...', function() {
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 4).then(function(references) {
        PA3MainPage.rightClickAndSelectOption(references[0], 'Groupings|Edit Grouping...');
      });
    });

    it('Verifying that view changes to "New/Reference" mode', function() {
      element(by.xpath(CreateEditCustomGroupings.xpathNewReference)).isPresent().then(function(bool) {
        if (!bool) {
          expect(false).customError('The view did not change to New/Reference mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should clear the text in the Formula section', function() {
      CommonPageObjectsForPA3.clearTextInCodeMirror();
    });

    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'FG_PRICE', undefined, undefined, 'clickOutside', undefined);

    it('Making Ignore Synchronization true to handle loading icon', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click on "Save" button to save the settings', function() {
      ThiefHelpers.getButtonClassReference(undefined, CreateEditCustomGroupings.getButton('Save')).press().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Save" button' + err);
      });
    });

    // FYI The below code performs negative testing since the steps in QAI cannot be performed due to known issue FEPA-1336.

    it('Wait for "Weights" report calculation', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Weights'), 20000);

      // Verifying report is recalculated
      PA3MainPage.getReportCalculationDlg('Weights').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"The Weights report is not getting recalculated. The issue FEPA-1336 is resolved');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Making Ignore Synchronization as false', function() {
      browser.ignoreSynchronization = false;
    });

  });

  describe('Test Step ID: 808644', function() {

    it('Should right click on added number grouping and select Groupings|Edit Groupings...', function() {
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 4).then(function(references) {
        PA3MainPage.rightClickAndSelectOption(references[0], 'Groupings|Edit Grouping...');
      });
    });

    it('Verifying that view changes to "New/Reference" mode', function() {
      element(by.xpath(CreateEditCustomGroupings.xpathNewReference)).isPresent().then(function(bool) {
        if (!bool) {
          expect(false).customError('The view did not change to New/Reference mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror('Formula', undefined, 'FG_PRICE', true);

  });

  describe('Test Step ID: 807306', function() {

    CommonPageObjectsForPA3.selectDirectoryAndSubDirectoryAndVerify('Personal', 'Personal');

    it('Should enter "grp-right" in Name field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('grp-right');

      // Verifying that "Name" field is set to "grp-right"
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'grp-right') {
          expect(false).customError('"Name" field did not set to "grp-right"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save As" button to save the settings', function() {
      ThiefHelpers.getButtonClassReference(undefined, CreateEditCustomGroupings.getButton('Save As')).press().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Save As" button' + err);
      });
    });

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');

    var group;
    var arrElements = [];
    it('Should expand "Personal" from "Available" container', function() {
      var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsGroupings.xpathOfAvailableOrSelectedContainer, 'Available');
      group = ThiefHelpers.getListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getChildrenText().then(function(childArray) {
            childArray.forEach(function(columnName) {
              arrElements.push(columnName.text);
            });
          });
        } else {
          expect(false).customError('"Personal" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "grp-right" is displayed at the bottom in the "Personal" directory', function() {
      if (arrElements.indexOf('grp-right') !== -1) {
        if (arrElements[arrElements.length - 1] !== 'grp-right') {
          expect(false).customError('"grp-right" is not displayed at the bottom in the "Personal" directory');
          CommonFunctions.takeScreenShot();
        }
      } else {
        expect(false).customError('"grp-right" is not displayed in the "Personal" directory');
        CommonFunctions.takeScreenShot();
      }
    });

  });

  describe('Test Step ID: 776813', function() {

    CommonPageObjectsForPA3.clickOnAddButtonAndSelectOptionFromDropdown('New/Reference', 'Groupings');

    it('Should select the "Reference" radio button', function() {
      ThiefHelpers.getRadioClassReference('Reference', undefined).select();

      // Verifying that "Reference" radio button is selected
      ThiefHelpers.getRadioClassReference('Reference', undefined).isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('The "Reference" radio button is selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click on "Col 1: Ending Price" under "Formula" section', function() {
      ThiefHelpers.getVirtualListboxClassReference().getItemByText('Col 1: Ending Price').doubleClick();
    });

    // Verifying that "Col 1: Ending Price" is selected
    CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror('Formula', undefined, 'COL1', true);

    it('Should enter "Refgrp-right" in Name field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Refgrp-right');

      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Refgrp-right') {
          expect(false).customError('"Name" field did not set to "Refgrp-right"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Edit Groupings');

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'TileOptions-Weights');

    it('Should expand the first number grouping in the report', function() {
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 4).then(function(references) {
        references[0].getText().then(function(value) {
          PA3MainPage.expandTreeInCalculatedReport('Weights', value);
          PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', value);
        });
      });
    });

    it('Verifying that second number grouping is present under the first number grouping', function() {
      expect(PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 5)).not.toBeNull();

      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 5).then(function(references) {
        references[0].getText().then(function(val) {
          if (isNaN(val) === true) {
            expect(false).customError('The second number grouping is not present under the first number grouping');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 784207', function() {

    it('Should right click on number groupings and select Groupings|Edit Groupings...', function() {
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 4).then(function(references) {
        PA3MainPage.rightClickAndSelectOption(references[0], 'Groupings|Edit Grouping...');
      });
    });

    it('Verifying that "Groupings" dialog box appeared', function() {
      ThiefHelpers.isDialogOpen('Groupings', undefined, undefined).then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Groupings" dialog box has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should replace "grp-right" with "col-grp-right" from the "Name" field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('col-grp-right');

      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'col-grp-right') {
          expect(false).customError('"col-grp-right" is not present in the "Name" field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Making Ignore Synchronization true to handle loading icon', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click on "Save" button to save the settings', function() {
      ThiefHelpers.getButtonClassReference(undefined, CreateEditCustomGroupings.getButton('Save')).press().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Save" button' + err);
      });
    });

    it('Wait for "Weights" report calculation', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Weights'), 20000);

      // Verifying report is recalculated
      PA3MainPage.getReportCalculationDlg('Weights').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"The Weights report is not getting recalculated.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Making Ignore Synchronization as false', function() {
      browser.ignoreSynchronization = false;
    });

  });

  describe('Test Step ID: 776814', function() {
    var storeFirstGroupingVal;
    var storeSecondGroupingVal;

    it('Storing the first number grouping and second number groupings values for future use', function() {
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 4).then(function(references) {
        references[0].getText().then(function(value) {
          PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 5).then(function(arrayval) {
            arrayval[0].getText().then(function(val) {
              storeFirstGroupingVal = value;
              storeSecondGroupingVal = val;
            });
          });
        });
      });
    });

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');

    CommonPageObjectsForPA3.expandAListBoxGroupAndDeleteItem('Client', xpathOfAvailableSection, 'col-grp-right', 'Grouping', 'OK');

    CommonPageObjectsForPA3.expandAListBoxGroupAndDeleteItem('Document', xpathOfAvailableSection, 'Refgrp-right', 'Grouping', 'OK');

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if the first number grouping is removed from the report', function() {
      PA3MainPage.getElementFromCalculatedTree('Weights', 'Africa & Middle East', storeFirstGroupingVal).isPresent().then(function(bool) {
        if (bool) {
          expect(false).customError('The number grouping' + storeFirstGroupingVal + 'is still present');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the second number grouping is removed from the report', function() {
      PA3MainPage.getElementFromCalculatedTree('Weights', 'Africa & Middle East', storeSecondGroupingVal).isPresent().then(function(bool) {
        if (bool) {
          expect(false).customError('The number grouping' + storeSecondGroupingVal + 'is still present');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 795947', function() {

    it('Should open "Client:;Pa3;grouping;RBICS_Focus_groupings"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('rbics-focus-groupings');
    });

    // Should click on the wrench icon in the report and select options and then select Groupings tab in LHP.
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('RBICS Focus', 'Groupings', undefined);

    it('Should double click on "Currency" from "FactSet" directory', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfAvailableContainer, 'Currency', 'FactSet').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Should click on "Market Cap" under the selected section', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'Market Cap').select();

      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'Market Cap').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Market Cap" is not selected from the Selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrListItems = ['RBICS Focus - Economy - RBICS Focus', 'Market Cap', 'Currency'];
    arrListItems.forEach(function(element) {
      it('Verifying if "' + element + '" is present in the selected section', function() {
        ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, element).getText().then(function(name) {
          if (name !== element) {
            expect(false).customError('"' + element + '" is not present in the selected section. Found: "' + name + '".');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Fractiles" drop down is set to "Quintile" by default under definition section', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsGroupings.getDropDownFromDefinitionSection('Fractiles')).getSelectedText().then(function(selectedElement) {
        if (selectedElement !== 'Quintile') {
          expect(false).customError('"Fractiles" drop down is not set to "Quintile" by default, Found: ' + selectedElement);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 795948', function() {

    // Should Click OK on "Tile Options - RBICS Focus" Report
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - RBICS Focus');

    it('Should click on "refresh" button in application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "RBICS Focus" report is grouped by "RBICS Focus - Economy"', function() {
      PA3MainPage.getGroupingsHyperLink('RBICS Focus').getText().then(function(refVal) {
        if (refVal.indexOf('RBICS Focus - Economy') === -1) {
          expect(false).customError('"RBICS Focus" report is not grouped by "RBICS Focus - Economy"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var value = ' ';
    it('Should expand "Business Services>MC Quintile 1>U.S. Dollar" in "RBICS Focus" report', function() {
      PA3MainPage.expandTreeInCalculatedReport('RBICS Focus', 'Business Services');
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('RBICS Focus', 2).then(function(element) {
        element.forEach(function(obj) {
          obj.getText().then(function(text) {
              var str = text.includes('MC Quintile 1');
              if (str === true) {
                value = text;

                //Collapsing the grouping to first level
                PA3MainPage.expandTreeInCalculatedReport('RBICS Focus', 'Business Services');
                var ExpandTree = 'Business Services|' + value + '|U.S. Dollar';
                PA3MainPage.expandTreeInCalculatedReport('RBICS Focus', ExpandTree);
                PA3MainPage.checkIfTreeExpandedInCalculatedReport('RBICS Focus', ExpandTree);
              }
            },
            function(err) {
              if (err.name === 'StaleElementReferenceError') {
                expect(true).toBeTruthy();
              } else {
                expect(false).customError(err);
                CommonFunctions.takeScreenShot();
              }
            });
        });
      });
    });

    it('Verifying that the "RBICS Focus" report has 3 level grouping and securities under it', function() {
      var count = 0;
      SlickGridFunctions.getAllRowsFromReport('RBICS Focus').then(function(dataView) {
        dataView.forEach(function(element) {
          count++;
          if (count > 1 && count <= 4) {
            if (element.metadata.type !== 'group') {
              expect(false).customError('The report does not contain 3 level grouping');
              CommonFunctions.takeScreenShot();
            }
          }

          if (count === 5) {
            if (element.metadata.type !== 'security')
            {
              expect(false).customError('Security is not displayed under Business Services>MC Quintile 1>U.S. Dollar.Instead grouping is displayed');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });
  });

  describe('Test Step ID: 795953', function() {

    var oldCount = 0;

    // Should click on the 'RBICS Focus - Economy' groupings hyperlink in the "RBICS Focus" report
    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('RBICS Focus', 'RBICS Focus - Economy');

    it('Should fetch the count of elements present in "Selected" section for further verification', function() {
      TileOptionsGroupings.getAllElements('Selected').then(function(elementsArr) {
        oldCount = elementsArr.length;
      });
    });

    it('Should enter "RBICS Revenue - Economy" in the "Available" search box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsGroupings.xpathAvailableSearchBox).setText('RBICS Revenue - Economy');

      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsGroupings.xpathAvailableSearchBox).getText().then(function(text) {
        if (text != 'RBICS Revenue - Economy') {
          expect(false).customError('"Available" search field is not set to "RBICS Revenue - Economy"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click on "RBICS Revenue - Economy" in "Available" section', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfAvailableContainer, 'RBICS Revenue - Economy', 'RBICS Revenue')
        .then(function(ref) {
          browser.actions().doubleClick(ref).perform();
        }, function(err) {
          if (err.toString().indexOf('No direct child') > 0) {
            expect(true).toBeTruthy();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying that "RBICS Revenue - Economy" is not  present in the "Selected" section', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'RBICS Revenue - Economy').getText().then(function(text) {
        if (text === 'RBICS Revenue - Economy') {
          expect(false).customError('"RBICS Revenue - Economy" is present in the "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(true).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that the count of elements in selected section is ' + oldCount, function() {
      TileOptionsGroupings.getAllElements('Selected').then(function(elementsArr) {
        if (oldCount !== elementsArr.length) {
          expect(false).customError('Expected count of elements in selected section is ' + oldCount + ' but found ' + elementsArr.length);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 798336', function() {

    it('Disabling wait for angular', function() {
      browser.ignoreSynchronization = true;
    });

    //Should click on Cancel button in 'Tile Options - RBICS Focus' view
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options - RBICS Focus');

    it('Verifying that the "RBICS Focus" report should not reload', function() {
      PA3MainPage.getRefreshIcon().isPresent().then(function(check) {
        if (check !== true) {
          expect(false).customError('The report is refreshing');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });
  });
});
