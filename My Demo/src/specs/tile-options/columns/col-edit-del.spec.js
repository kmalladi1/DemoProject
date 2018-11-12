'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: col-edit-del', function() {
  // Variable(s)
  var arrIndustries = [];
  var arrIndustryDemoVal = [];
  var arrIndustryDateVal = [];
  var countBeforeDelete;

  // Getting the xpath of Formula text field
  var xpathOfFormulaTextArea = element(by.xpath(CreateEditCustomColumns.xpathOfFormulaTextArea));

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  describe('Test Step ID: 544478', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Columns/New_Reference_Testing"', function() {
      PA3MainPage.switchToDocument('new-reference-testing');
    });

    it('Waiting for "New Column Test" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(5000);

      // Wait for report calculation to finish
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "New Column Test" report appeared', function() {
      PA3MainPage.isReportCalculated('New Column Test').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"New Column Test" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('New Column Test')).toBeTruthy();
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

  describe('Test Step ID: 544479', function() {

    it('Should click on the "Wrench" icon in the "New Column Test" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('New Column Test').click().then(function() {
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

    it('Select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - New Column Test" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - New Column Test') {
          expect(false).customError('"Tile Options - New Column Test" view has not appeared. ' + 'Expected: "Tile Options - New Column Test" but Found: "' + value + '"');
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

    it('Verifying that "Columns" dialog box appear after selecting "New/Reference" option', function() {
      ThiefHelpers.isDialogOpen('Columns', undefined, undefined).then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Columns" dialog box has not appeared after selecting "New/Reference" option.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select the "New" radio button if not already selected', function() {
      ThiefHelpers.getRadioClassReference('New').isSelected().then(function(selected) {
        if (!selected) {
          ThiefHelpers.getRadioClassReference('New').select();
        }
      });
    });

    it('Select "Formula" tab from the "Columns" window', function() {
      CreateEditCustomColumns.getTab('Formula').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Formula" tab is selected
      Utilities.isElementSelected(CreateEditCustomColumns.getTab('Formula')).then(function(bool) {
        if (!bool) {
          expect(false).customError('"Formula" tab is selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Enter formula into the section and click out side
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'Price Test', undefined, undefined, 'clickOutside');

    it('Type "Testing" into the "Name" field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Testing');

      // Verifying that "Demo" is typed into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Testing') {
          expect(false).customError('"Testing" is not present in the "Name" field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Save" button to save the settings', function() {
      ThiefHelpers.getButtonClassReference(undefined, CreateEditCustomColumns.getButton('Save')).press().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Save" button' + err);
      });
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verify that an error message appears in the UI saying "The formula you have entered is not valid"', function() {
      CreateEditCustomColumns.getErrorMessage().then(function(errText) {
        if (errText !== 'The formula you have entered is not valid.') {
          expect(false).customError('Error message text is not as expected');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 544480', function() {

    it('Verify that "Formula" tab from the "Columns" window is selected', function() {
      Utilities.isElementSelected(CreateEditCustomColumns.getTab('Formula')).then(function(bool) {
        if (!bool) {
          expect(false).customError('"Formula" tab is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should clear the text in the Formula section', function() {
      browser.actions().mouseMove(CreateEditCustomColumns.getTabTextArea('Formula', 'New')).click().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a',
        protractor.Key.DELETE)).perform();
    });

    it('Click outside the type ahead to close it', function() {
      element(by.xpath(CreateEditCustomColumns.xpathClick)).click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Enter formula into the section and select the option from type ahead and click on x Close button
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'FG_PRICE', true, 'FG_PRICE', 'X Close', 'FG_PRICE(#ED,#CU)');

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

    it('Type "Demo" into the "Name" field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Demo');

      // Verifying that "Demo" is typed into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Demo') {
          expect(false).customError('"Demo" is not present in the "Name" field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Save" button to save the settings', function() {
      ThiefHelpers.getButtonClassReference(undefined, CreateEditCustomColumns.getButton('Save')).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "Columns" dialog is no more displayed', function() {
      ThiefHelpers.isDialogOpen(undefined, undefined, CreateEditCustomColumns.xpathDialog).then(function(appeared) {
        if (appeared) {
          expect(false).customError('"Columns" dialog box is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 544481', function() {

    it('Expand "Personal" from "Available" container and Select "Demo" from "Personal" directory', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Personal', 'Demo', 'last').then(function(indexOfElement) {
            var item = group.getItemByIndex(indexOfElement);
            item.then(function(listItem) {
              listItem.select();
            });
          }, function(error) {
            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"Personal" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Right" arrow button to add "Demo" to "Selected" section', function() {
      TileOptionsColumns.getArrowButton('Right').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Demo" is added to the "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Demo').isPresent().then(function(added) {
        if (!added) {
          expect(false).customError('"Demo" is not added to the "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options - New Column Test" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - New Column Test" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - New Column Test" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "New Column Test" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "New Column Test" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('New Column Test').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"New Column Test" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('New Column Test')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for WebElement to Load
      browser.sleep(3000);
    });

    it('Expand "Communications > Major Telecommunications" from the calculated report', function() {
      PA3MainPage.expandTreeInCalculatedReport('New Column Test', 'Communications|Major Telecommunications');

      // Verifying if "Communications > Major Telecommunications" tree is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('New Column Test', 'Communications|Major Telecommunications');
    });

    it('Get the industries names from "Communications > Major Telecommunications" tree', function() {
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('New Column Test', 3).map(function(elements) {
        return {
          text: elements.getText(),
        };
      }).then(function(industries) {
        for (var i = 0; i < industries.length; i++) {
          arrIndustries.push(industries[i].text);
        }
      });
    });

    it('Get the value of industries from "Communications > Major Telecommunications" tree for "Demo" column', function() {
      arrIndustries.forEach(function(industry) {
        PA3MainPage.getValueFromCalculatedReport('New Column Test', industry, 'Demo').then(function(value) {
          arrIndustryDemoVal.push(value);
        });
      });
    });
  });

  describe('Test Step ID: 544482', function() {

    it('Should click on the "Wrench" icon in the "New Column Test" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('New Column Test').click().then(function() {
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

    it('Verifying if view changed to "Tile Options - New Column Test" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - New Column Test') {
          expect(false).customError('"Tile Options - New Column Test" view has not appeared. ' + 'Expected: "Tile Options - New Column Test" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP in "Tile Options - New Column Test" view', function() {
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

    it('Expand "Personal" from "Available" container, hover over "Demo" and click on the "Edit" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Personal', 'Demo', 'last').then(function(indexOfElement) {
            var item = group.getItemByIndex(indexOfElement);

            // Click on the "edit" icon
            return item.then(function(edit) {
              edit.select();
              return edit.getActions().then(function(val) {
                return val.triggerAction('edit');
              });
            });
          }, function(error) {
            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"Personal" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Columns" dialog box appear', function() {
      ThiefHelpers.isDialogOpen('Columns', undefined, undefined).then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Columns" dialog box has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Remove "FG_PRICE" from "Formula" section', function() {
      browser.actions().mouseMove(CreateEditCustomColumns.getTabTextArea('Formula', 'New')).click().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a',
        protractor.Key.DELETE)).perform();
    });

    it('Click outside the type ahead to close it', function() {
      element(by.xpath(CreateEditCustomColumns.xpathClick)).click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Enter the formula into the section and click on X Close button
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'P_DATE(#SD)', undefined, undefined, 'X Close');

    it('Replace "Demo" with "Date" from the "Name" field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Date');

      // Verifying that "Date" is typed into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Date') {
          expect(false).customError('"Date" is not present in the "Name" field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Save" button to save the settings', function() {
      ThiefHelpers.getButtonClassReference(undefined, CreateEditCustomColumns.getButton('Save')).press().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Save" button' + err);
      });
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "Columns" dialog is no more displayed', function() {
      ThiefHelpers.isDialogOpen(undefined, undefined, CreateEditCustomColumns.xpathDialog).then(function(appeared) {
        if (appeared) {
          expect(false).customError('"Columns" dialog box is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options - New Column Test" header bar', function() {
      TileOptions.getHeaderButton('OK').click();
    });

    it('"Tile Options - New Column Test" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - New Column Test" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "New Column Test" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "New Column Test" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('New Column Test').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"New Column Test" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('New Column Test')).toBeTruthy();
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

    it('Verifying that "Demo" column name is changed to "Date"', function() {
      PA3MainPage.getColumnIndexFromCalculatedReport('New Column Test', 'Date').then(function(index) {
        expect(index).toEqual(4);
      });
    });

    it('Get the value of industries from "Communications > Major Telecommunications" tree for "Date" column', function() {
      arrIndustries.forEach(function(industry) {
        PA3MainPage.getValueFromCalculatedReport('New Column Test', industry, 'Date').then(function(value) {
          arrIndustryDateVal.push(value);
        });
      });
    });

    arrIndustryDateVal.forEach(function(value) {
      var j = 0;
      it('Verifying that "' + arrIndustries[j] + '" industry from "Communications > Major Telecommunications" tree is ' + 'displaying date in "Date" column', function() {
        expect(value.split('/').length).toEqual(3);
      });
    });
  });

  describe('Test Step ID: 557348', function() {

    it('Should click on the "Wrench" icon in the "New Column Test" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('New Column Test').click().then(function() {
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

    it('Verifying if view changed to "Tile Options - New Column Test" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - New Column Test') {
          expect(false).customError('"Tile Options - New Column Test" view has not appeared. ' + 'Expected: "Tile Options - New Column Test" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP in "Tile Options - New Column Test" view', function() {
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

    it('Expand "Personal" from "Available" container, hover over "Date" and click on the "Edit" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Personal', 'Date', 'last').then(function(indexOfElement) {
            var item = group.getItemByIndex(indexOfElement);

            // Click on the "edit" icon
            return item.then(function(edit) {
              edit.select();
              return edit.getActions().then(function(val) {
                return val.triggerAction('edit');
              });
            });
          }, function(error) {
            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"Personal" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Columns" dialog box appear', function() {
      ThiefHelpers.isDialogOpen('Columns', undefined, undefined).then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Columns" dialog box has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Remove "P_Date(#SD)" from "Formula" section', function() {
      browser.actions().mouseMove(CreateEditCustomColumns.getTabTextArea('Formula', 'New')).click().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a',
        protractor.Key.DELETE)).perform();
    });

    it('Click outside the type ahead to close it', function() {
      element(by.xpath(CreateEditCustomColumns.xpathClick)).click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Enter formula into the section and select the option from type ahead and click on x Close button
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'FG_PRICE', true, 'FG_PRICE', 'X Close', 'FG_PRICE(#ED,#CU)');

    it('Replace "Date" with "Custom" from the "Name" field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Custom');

      // Verifying that "Custom" is typed into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Custom') {
          expect(false).customError('"Custom" is not present in the "Name" field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Save As" button to save the settings', function() {
      ThiefHelpers.getButtonClassReference(undefined, CreateEditCustomColumns.getButton('Save As')).press().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Save As" button' + err);
      });
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "Columns" dialog is no more displayed', function() {
      ThiefHelpers.isDialogOpen('Columns', undefined, undefined).then(function(appeared) {
        if (appeared) {
          expect(false).customError('"Columns" dialog box is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "Personal" from "Available" container and double click on "Custom" to add it to "Selected" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Personal', 'Custom', 'last').then(function(indexOfElement) {
            var item = group.getItemByIndex(indexOfElement);
            item.then(function(listItem) {
              listItem.select();
              listItem.doubleClick();
            });
          }, function(error) {
            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"Personal" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Custom" is added to the "Selected" section', function() {
      expect(TileOptionsColumns.getElementFromSelectedSection('Custom').isPresent()).toBeTruthy();
    });

    it('Should click on "OK" button from "Tile Options - New Column Test" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - New Column Test" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - New Column Test" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "New Column Test" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "New Column Test" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('New Column Test').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"New Column Test" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('New Column Test')).toBeTruthy();
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

    it('Verifying that data is displayed under "Custom" column for the securities from "Communications > ' + 'Major Telecommunications" tree', function() {
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('New Column Test', 3).map(function(elements) {
        return {
          text: elements.getText(),
        };
      }).then(function(industries) {
        for (var i = 0; i < industries.length; i++) {
          expect(industries[i].text).not.toEqual('');
        }
      });
    });
  });

  describe('Test Step ID: 544483', function() {

    it('Should click on the "Wrench" icon in the "New Column Test" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('New Column Test').click().then(function() {
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

    it('Verifying if view changed to "Tile Options - New Column Test" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - New Column Test') {
          expect(false).customError('"Tile Options - New Column Test" view has not appeared. ' + 'Expected: "Tile Options - New Column Test" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP in "Tile Options - New Column Test" view', function() {
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

    it('Expand "Personal" from "Available" container, hover over "Date" and click on the "Remove" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Personal', 'Date', 'last').then(function(indexOfElement) {
            var item = group.getItemByIndex(indexOfElement);

            // Click on the "remove" icon
            return item.then(function(remove) {
              remove.select();
              return remove.getActions().then(function(val) {
                return val.triggerAction('remove');
              });
            });
          }, function(error) {
            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"Personal" is expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Delete Column" dialog box saying "Are you sure you want to delete this column?" appears', function() {
      ThiefHelpers.verifyDialogTitle('Delete Column');

      // Verifying the content
      ThiefHelpers.getDialogClassReference('Delete Column').getContent().getText().then(function(content) {
        if (content !== 'Are you sure you want to delete this column?') {
          expect(false).customError('Expected dialog box content: Are you sure you want to delete this column? ' + 'but Found: "' + content + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click "OK" on the "Delete Column" dialog', function() {
      ThiefHelpers.getDialogButton('Delete Column', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Expand "Personal" from "Available" container, hover over "Custom" and click on the "Remove" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Personal', 'Custom', 'last').then(function(indexOfElement) {
            var item = group.getItemByIndex(indexOfElement);

            // Click on the "remove" icon
            return item.then(function(remove) {
              remove.select();
              return remove.getActions().then(function(val) {
                return val.triggerAction('remove');
              });
            });
          }, function(error) {
            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"Personal" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Delete Column" dialog box saying "Are you sure you want to delete this column?" appears', function() {
      ThiefHelpers.verifyDialogTitle('Delete Column');

      // Verifying the content
      ThiefHelpers.getDialogClassReference('Delete Column').getContent().getText().then(function(content) {
        if (content !== 'Are you sure you want to delete this column?') {
          expect(false).customError('Expected dialog box content: Are you sure you want to delete this column? ' + 'but Found: "' + content + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 544484', function() {

    it('Click "OK" on the "Delete Column" dialog', function() {
      ThiefHelpers.getDialogButton('Delete Column', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for delete action to be completed', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    var arrElements = ['Date', 'Custom'];
    arrElements.forEach(function(element) {
      it('Expand "Personal" from "Available" container and verify that "' + element + '" is removed from "Available" section', function() {
        var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');
        group.expand();

        group.isExpanded().then(function(expanded) {
          if (expanded) {
            group.getGroupByText('Personal').then(function(subGroup) {
              subGroup.expand();
              subGroup.isExpanded().then(function(expanded) {
                if (expanded) {
                  subGroup.getChildrenText().then(function(arrObject) {
                    arrObject.forEach(function(listItem) {
                      if (listItem.text === element) {
                        expect(false).customError('"' + element + '" column is not deleted from "Personal" directory');
                        CommonFunctions.takeScreenShot();
                      }
                    });
                  });
                } else {
                  expect(false).customError('"Personal" is not expanded');
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          } else {
            expect(false).customError('"FactSet"is not expanded');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    arrElements.forEach(function(element) {
      it('Verifying that "' + element + '" column is deleted from "Selected" section', function() {
        TileOptionsColumns.getElementFromSelectedSection(element).isPresent().then(function(option) {
          if (option) {
            expect(option).customError('"' + element + '" column was not deleted from "Selected" section.');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {

          if (error.name === 'Index out of bound') {
            expect(true).toBeTruthy();
          }
        });
      });
    });
  });

  // Making xdescribe for Test Step ID: 544492 and 557350 as the test steps are not shown in QAI
  xdescribe('Test Step ID: 544492', function() {

    it('Should click on "OK" button from "Tile Options - New Column Test" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - New Column Test" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - New Column Test" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "New Column Test" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "New Column Test" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('New Column Test').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"New Column Test" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('New Column Test')).toBeTruthy();
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

    it('Verifying that "Date" column is removed from the calculated report', function() {
      expect(PA3MainPage.getAllColumnOfCalculatedReport('New Column Test').count()).toEqual(4);
    });
  });

  xdescribe('Test Step ID: 557350', function() {

    it('Should click on the "Wrench" icon in the "New Column Test" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('New Column Test').click().then(function() {
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

    it('Verifying if view changed to "Tile Options - New Column Test" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - New Column Test') {
          expect(false).customError('"Tile Options - New Column Test" view has not appeared. ' + 'Expected: "Tile Options - New Column Test" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP in "Tile Options - New Column Test" view', function() {
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

    it('Expand "Personal" from "Available" container', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client');
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Client', 'Sample1', 'last').then(function(indexOfElement) {
            var item = group.getItemByIndex(indexOfElement);

            // Click on the "edit" icon
            return item.then(function(edit) {
              edit.select();
              return edit.getActions().then(function(val) {
                return val.triggerAction('edit');
              });
            });
          }, function(error) {
            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"Client" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Hover over "Custom" from "Personal" and click on the "Remove" icon', function() {
      TileOptionsColumns.getRemoveIconForColumn('Available', 'Custom', 'Personal').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Delete Column" dialog box saying "Are you sure you want to delete this column?" appears', function() {
      ThiefHelpers.verifyDialogTitle('Delete Column');

      // Verifying the content
      ThiefHelpers.getDialogClassReference('Delete Column').getContent().getText().then(function(content) {
        if (content !== 'Are you sure you want to delete this column?') {
          expect(false).customError('Expected dialog box content: Are you sure you want to delete this column? ' + 'but Found: "' + content + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click "OK" on the "Delete Column" dialog', function() {
      ThiefHelpers.getDialogButton('Delete Column', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for delete action to be completed', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Expand "Personal" from "Available" container', function() {
      TileOptionsColumns.expandElementTree('Personal');

      // Verifying that "Personal" is expanded
      TileOptionsColumns.checkIfExpanded('Personal');
    });

    it('Verifying that "Custom" column is deleted from "Personal" directory of "Available" section', function() {
      expect(TileOptionsColumns.getAllElementsFromGroup('Personal').count()).toEqual(countBeforeDelete - 1);
    });

    it('Verifying that "Custom" column is deleted from "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Custom').isPresent().then(function(option) {
        if (option) {
          expect(option).customError('"Custom" column was not deleted from "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'Index out of bound') {
          expect(true).toBeTruthy();
        }
      });
    });
  });

  describe('Test Step ID: 557351', function() {

    it('Should click on "OK" button from "Tile Options - New Column Test" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - New Column Test" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - New Column Test" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "New Column Test" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "New Column Test" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('New Column Test').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"New Column Test" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('New Column Test')).toBeTruthy();
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

    it('Verifying that "Demo and Custom" columns are removed from the calculated report', function() {
      PA3MainPage.getAllColumnOfCalculatedReport('New Column Test').then(function(references) {
        references.forEach(function(eleRef) {
          if (eleRef === 'Demo' || eleRef === 'Custom') {
            expect(false).customError('"Demo and Custom" columns are not removed from the calculated report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 544485', function() {

    it('Select "Reference Column Test" report from LHP', function() {
      PA3MainPage.getReports('Reference Column Test').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Reference Column Test" report is selected
      expect(PA3MainPage.getReports('Reference Column Test').getAttribute('class')).toContain('selected');
    });

    it('Waiting for "Reference Column Test" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Reference Column Test" report appeared', function() {
      PA3MainPage.isReportCalculated('Reference Column Test').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Reference Column Test" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Reference Column Test')).toBeTruthy();
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

    it('Should click on the "Wrench" icon in the "Reference Column Test" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Reference Column Test').click().then(function() {
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

    it('Verifying if view changed to "Tile Options - Reference Column Test" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Reference Column Test') {
          expect(false).customError('"Tile Options - Reference Column Test" view has not appeared. ' + 'Expected: "Tile Options - Reference Column Test" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP in "Tile Options - New Column Test" view', function() {
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

    it('Verifying that "Columns" dialog box appear after selecting "New/Reference" option', function() {
      ThiefHelpers.isDialogOpen('Columns', undefined, undefined).then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Columns" dialog box has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 544493', function() {

    it('Select the "Reference" radio button', function() {
      ThiefHelpers.getRadioClassReference('Reference', undefined).select();

      // Verifying that "Reference" radio button is selected
      ThiefHelpers.getRadioClassReference('Reference', undefined).isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('The "Reference" radio button is selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Formula" tab from the "Columns" window', function() {
      CreateEditCustomColumns.getTab('Formula').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Formula" tab is selected
      Utilities.isElementSelected(CreateEditCustomColumns.getTab('Formula')).then(function(bool) {
        if (!bool) {
          expect(false).customError('"Formula" tab is selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Col 3: Port. Ending Weight" from the "Formula" tab', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfFormulaTextArea).getItemByText('Col 3: Port. Ending Weight').select();

      // Verifying that "Col 3: Port. Ending Weight" is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfFormulaTextArea).getItemByText('Col 3: Port. Ending Weight').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Col 3: Port. Ending Weight" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click "Add" button to add "Col 3: Port. Ending Weight" to text area', function() {
      ThiefHelpers.getButtonClassReference('Add', undefined).press();
    });

    it('Verifying that "COL3" is added to the text area', function() {
      CreateEditCustomColumns.getTabTextArea().getText().then(function(name) {
        var text = name.trim();
        if (text !== 'COL3') {
          expect(false).customError('"Formula" text area does not contain "COL3". ' + 'Expected: "COL3" but Found: "' + name + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 544486', function() {

    it('Select "Reference Calculation at Group Level" from "Reference Calculation" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Reference Calculation at Group Level', 'Reference Calculation:');

      // verifying if 'Ticker-Region' is selected from "Definition" section drop down
      ThiefHelpers.verifySelectedDropDownText('Reference Calculation at Group Level', 'Reference Calculation:');
    });

    it('Type "Reference Demo" into the "Name" field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Reference Demo');

      // Verifying that "Reference Demo" is typed into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Reference Demo') {
          expect(false).customError('"Reference Demo" is not present in the "Name" field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Save" button to save the settings', function() {
      ThiefHelpers.getButtonClassReference(undefined, CreateEditCustomColumns.getButton('Save')).press().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Save" button' + err);
      });
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "Columns" dialog is no more displayed', function() {
      ThiefHelpers.isDialogOpen('Columns', undefined, undefined).then(function(appeared) {
        if (appeared) {
          expect(false).customError('"Columns" dialog box is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Reference Demo" is displayed as the last item under "Selected" section', function() {
      TileOptionsColumns.getAllElements('Selected').last().getText().then(function(text) {
        if (text !== 'Reference Demo') {
          expect(false).customError('"Reference Demo" is not displayed as the last item under "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 544487', function() {

    it('Should click on "OK" button from "Tile Options - Reference Column Test" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Reference Column Test" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - Reference Column Test" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Reference Column Test" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Reference Column Test" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Reference Column Test').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Reference Column Test" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Reference Column Test')).toBeTruthy();
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

    it('Right click on the report and select "Expand > All" from the custom menu', function() {
      var elementRef;
      elementRef = PA3MainPage.getAllElementsFromCalculatedReport('Reference Column Test', 'slick-pane slick-pane-bottom slick-pane-left');
      elementRef.first().getWebElement().then(function() {
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          elementRef = PA3MainPage.getAllElementsFromCalculatedReport('Reference Column Test', 'slick-pane slick-pane-bottom slick-pane-left');
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      PA3MainPage.rightClickAndSelectOption(elementRef.first(), 'Expand|All');
    });

    it('Verifying that all the sectors are expanded', function() {
      PA3MainPage.getAllExpandCollapseButtonsFromCalculatedReport('Reference Column Test', 'slick-pane slick-pane-bottom slick-pane-left').each(function(ref) {
        expect(ref.getAttribute('class')).toContain('opened');
      });
    });

    it('Verifying that cell values in "Port. Weight" column is matching with the cell values in "Reference Demo" column', function() {
      var arrPortVal = [];
      var arrRefVal = [];
      PA3MainPage.getAllCellsOfGivenColumn('Reference Column Test', 'Port. Weight', 'slick-pane slick-pane-bottom slick-pane-right').then(function(portCol) {
        portCol.forEach(function(ref) {
          arrPortVal.push(ref.getText());
        });
      }).then(function() {
        PA3MainPage.getAllCellsOfGivenColumn('Reference Column Test', 'Reference Demo', 'slick-pane slick-pane-bottom slick-pane-right').then(function(refCol) {
          refCol.forEach(function(ref) {
            arrRefVal.push(ref.getText());
          });
        });
      }).then(function() {
        for (var i = 0; i < arrPortVal.length; i++) {
          expect(arrPortVal[i]).toEqual(arrRefVal[i]);
        }
      });
    });
  });

  describe('Test Step ID: 544488', function() {

    it('Should click on the "Wrench" icon in the "Reference Column Test" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Reference Column Test').click().then(function() {
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

    it('Verifying if view changed to "Tile Options - Reference Column Test" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Reference Column Test') {
          expect(false).customError('"Tile Options - Reference Column Test" view has not appeared. ' + 'Expected: "Tile Options - Reference Column Test" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP in "Tile Options - New Column Test" view', function() {
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

    it('Enter "Reference Demo" in the avaialble section search filed', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('Reference Demo');

      //Verifying the text in search field
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(value) {
        if (value !== 'Reference Demo') {
          expect(false).customError('Text in search field is not "Reference Demo"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Reference Demo" in "Document" from the available section after search and click on "edit" button', function() {
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'Document', 'Reference Demo').then(function(item) {
        return item.getActions().then(function(val) {
          return val.triggerAction('edit');
        });
      });
    });

    it('Verifying that "Columns" dialog box appear', function() {
      ThiefHelpers.isDialogOpen('Columns', undefined, undefined).then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Columns" dialog box has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Remove "COL3*2" from Formula selected section', function() {
      browser.actions().mouseMove(CreateEditCustomColumns.getTabTextArea()).click().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a',
        protractor.Key.DELETE)).perform();
    });

    it('Click outside the type ahead to close it', function() {
      element(by.xpath(CreateEditCustomColumns.xpathClick)).click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Enter formula into the section and verify the same
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'COL3*2', undefined, undefined, undefined, 'COL3*2');

    it('Type "Reference Test" into the "Name" field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Reference Test');

      // Verifying that "Reference Test" is typed into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Reference Test') {
          expect(false).customError('"Reference Test" is not present in the "Name" field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Save" button to save the settings', function() {
      ThiefHelpers.getButtonClassReference(undefined, CreateEditCustomColumns.getButton('Save')).press().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Save" button' + err);
      });
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "Columns" dialog is no more displayed', function() {
      ThiefHelpers.isDialogOpen('Columns', undefined, undefined).then(function(appeared) {
        if (appeared) {
          expect(false).customError('"Columns" dialog box is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options - Reference Column Test" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Reference Column Test" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - Reference Column Test" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Reference Column Test" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Reference Column Test" report appeared without any errors', function() {
      // Verifying "Reference Column Test" Report is calculated
      PA3MainPage.isReportCalculated('Reference Column Test').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Reference Column Test" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Reference Column Test')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Reference Demo" column name is changed to "Reference Test"', function() {
      PA3MainPage.getColumnIndexFromCalculatedReport('Reference Column Test', 'Reference Test').then(function(index) {

        expect(index).toEqual(4);
      });
    });

    it('Verifying that cell values of "Port. Weight *  2" is matching with the cell values in "Reference Demo" column', function() {
      var arrPortVal = [];
      var arrRefVal = [];
      PA3MainPage.getAllCellsOfGivenColumn('Reference Column Test', 'Port. Weight', 'slick-pane slick-pane-bottom slick-pane-right').then(function(portCol) {
        portCol.forEach(function(ref) {
          ref.getText().then(function(value) {
            arrPortVal.push(value);
          });
        });
      }).then(function() {
        PA3MainPage.getAllCellsOfGivenColumn('Reference Column Test', 'Reference Test', 'slick-pane slick-pane-bottom slick-pane-right').then(function(refCol) {
          refCol.forEach(function(ref) {
            ref.getText().then(function(value) {
              arrRefVal.push(value);
            });
          });
        });
      }).then(function() {
        for (var i = 0; i < arrPortVal.length; i++) {
          if (arrPortVal[i] === '--' || arrPortVal[i] === '') {
            continue;
          } else {
            var valueToCompare = (arrPortVal[i] * 2).toString();
            var lLimit = (Number(valueToCompare) - 0.01).toString();
            var uLimit = (Number(valueToCompare) + 0.01).toString();
            expect(valueToCompare).toBeInBetween(lLimit, uLimit);
          }
        }
      });
    });
  });

  describe('Test Step ID: 557352', function() {

    it('Should click on the "Wrench" icon in the "Reference Column Test" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Reference Column Test').click().then(function() {
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

    it('Verifying if view changed to "Tile Options - Reference Column Test" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Reference Column Test') {
          expect(false).customError('"Tile Options - Reference Column Test" view has not appeared. ' + 'Expected: "Tile Options - Reference Column Test" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP in "Tile Options - New Column Test" view', function() {
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

    it('Expand "Document" from "Available" container, hover over "Reference Test" and click on the "Edit" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Document');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Document', 'Reference Test', 'last').then(function(indexOfElement) {
            var item = group.getItemByIndex(indexOfElement);

            // Click on the "edit" icon
            return item.then(function(edit) {
              edit.select();
              return edit.getActions().then(function(val) {
                return val.triggerAction('edit');
              });
            });
          }, function(error) {
            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"Document" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Columns" dialog box appear', function() {
      ThiefHelpers.isDialogOpen('Columns', undefined, undefined).then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Columns" dialog box has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Remove "COL3*2" from Formula selected section', function() {
      browser.actions().mouseMove(CreateEditCustomColumns.getTabTextArea()).click().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a',
        protractor.Key.DELETE)).perform();
    });

    it('Double click on "Col 5: Bench. Ending Weight" from the "Formula" tab', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfFormulaTextArea).getItemByText('Col 5: Bench. Ending Weight').doubleClick();
    });

    it('Verifying that "COL5" is added to the text area', function() {
      CreateEditCustomColumns.getTabTextArea().getText().then(function(name) {
        var text = name.trim();
        if (text !== 'COL5') {
          expect(false).customError('"COL5" is not added to the text area');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Type "Ref. Bench Test" into the "Name" field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Ref. Bench Test');

      // Verifying that "Ref. Bench Test" is typed into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Ref. Bench Test') {
          expect(false).customError('"Ref. Bench Test" is not present in the "Name" field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Save As" button to save the settings', function() {
      CreateEditCustomColumns.getButton('Save As').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "Columns" dialog is no more displayed', function() {
      ThiefHelpers.isDialogOpen('Columns', undefined, undefined).then(function(appeared) {
        if (appeared) {
          expect(false).customError('"Columns" dialog box is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options - Reference Column Test" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Reference Column Test" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - Reference Column Test" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Reference Column Test" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Reference Column Test" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Reference Column Test').then(function(found) {
        if (!found) {
          expect(false).customError('"Reference Column Test" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Reference Column Test')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Ref. Bench Test" column is added next to the "Reference Test" column in calculated report', function() {
      PA3MainPage.getAllColumnOfCalculatedReport('Reference Column Test').map(function(element, index) {
        return {
          columnName: element.getText(),
          columnIndex: index,
        };
      }).then(function(arrColumnNames) {

        for (var i = 0; i < arrColumnNames.length; i++) {
          if (arrColumnNames[i].columnName === 'Reference Test') {
            expect(arrColumnNames[i + 1].columnName === 'Ref. Bench Test');
          }
        }
      });
    });

    it('Verifying that cell values in "Bench. Weight" column is matching with the cell values ' + 'in "Ref. Bench Test" column', function() {
      var arrBenchVal = [];
      var arrRefBenchVal = [];
      PA3MainPage.getAllCellsOfGivenColumn('Reference Column Test', 'Bench. Weight', 'slick-pane slick-pane-bottom slick-pane-right').then(function(benchCol) {
        benchCol.forEach(function(ref) {
          arrBenchVal.push(ref.getText());
        });
      }).then(function() {
        PA3MainPage.getAllCellsOfGivenColumn('Reference Column Test', 'Ref. Bench Test', 'slick-pane slick-pane-bottom slick-pane-right').then(function(refBenchCol) {
          refBenchCol.forEach(function(ref) {
            arrRefBenchVal.push(ref.getText());
          });
        });
      }).then(function() {
        arrRefBenchVal.forEach(function(refBenchCell, index) {
          refBenchCell.getText().then(function(refBenchValue) {
            arrBenchVal[index].then(function(benchValue) {
              if (refBenchValue !== '--') {
                expect(refBenchValue).toEqual(benchValue);
              }
            });
          });
        });
      });
    });
  });

  describe('Test Step ID: 544489', function() {

    it('Should click on the "Wrench" icon in the "Reference Column Test" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Reference Column Test').click().then(function() {
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

    it('Verifying if view changed to "Tile Options - Reference Column Test" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Reference Column Test') {
          expect(false).customError('"Tile Options - Reference Column Test" view has not appeared. ' + 'Expected: "Tile Options - Reference Column Test" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP in "Tile Options - New Column Test" view', function() {
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

    it('Expand "Document" from "Available" container, hover over "Reference Test" and click on the "Remove" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Document');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Document', 'Reference Test', 'last').then(function(indexOfElement) {
            var item = group.getItemByIndex(indexOfElement);

            // Click on the "remove" icon
            return item.then(function(remove) {
              remove.select();
              return remove.getActions().then(function(val) {
                return val.triggerAction('remove');
              });
            });
          }, function(error) {
            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"Document" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Delete Column" dialog box saying "Are you sure you want to delete this column?" appears', function() {
      ThiefHelpers.verifyDialogTitle('Delete Column');

      // Verifying the content
      ThiefHelpers.getDialogClassReference('Delete Column').getContent().getText().then(function(content) {
        if (content !== 'Are you sure you want to delete this column?') {
          expect(false).customError('Expected dialog box content: Are you sure you want to delete this column? ' + 'but Found: "' + content + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 544490', function() {

    it('Click "OK" on the "Delete Confirmation" dilaog', function() {
      ThiefHelpers.getDialogButton('Delete Column', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for delete action to be completed', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "Reference Test" column is deleted from "Document" directory of "Available" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Document');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getChildrenText().then(function(arrObject) {
            arrObject.forEach(function(element) {
              if (element.text === 'Reference Test') {
                expect(false).customError('"Reference Test" column is not deleted from "Document" directory');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Document" is not expanded in "Available" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Reference Test" column is deleted from "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Reference Test').isPresent().then(function(option) {
        if (option) {
          expect(option).customError('"Reference Test" column was not deleted from "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'Index out of bound') {
          expect(true).toBeTruthy();
        }
      });
    });
  });

  describe('Test Step ID: 705258', function() {

    it('Hover over "Bench.Ending Weight" from "Selected" section and click on the "Remove" icon', function() {
      var action = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Bench. Ending Weight');

      // Hover on "Bench.Ending Weight" and click on remove button
      return action.getActions().then(function(remove) {
        return remove.triggerAction('remove');
      });
    });

    it('Verifying that "Delete Column" dialog box saying "Are you sure you want to delete this column?" appears', function() {
      ThiefHelpers.verifyDialogTitle('Delete Column');

      // Verifying the content
      ThiefHelpers.getDialogClassReference('Delete Column').getContent().getText().then(function(content) {
        if (content !== 'There are reference columns that reference this column. Do you want to remove this column?') {
          expect(false).customError('Expected dialog box content: Are you sure you want to delete this column? ' + 'but Found: "' + content + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 557353', function() {

    it('Click "OK" on the "Delete Confirmation" dilaog', function() {
      ThiefHelpers.getDialogButton('Delete Column', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Hover over "Ref. Bench Test" from "Document" and click on the "Remove" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Document');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Document', 'Ref. Bench Test', 'last').then(function(indexOfElement) {
            var item = group.getItemByIndex(indexOfElement);

            // Click on the "remove" icon
            return item.then(function(remove) {
              remove.select();
              return remove.getActions().then(function(val) {
                return val.triggerAction('remove');
              });
            });
          }, function(error) {
            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"Document" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Delete Column" dialog box saying "Are you sure you want to delete this column?" appears', function() {
      ThiefHelpers.verifyDialogTitle('Delete Column');

      // Verifying the content
      ThiefHelpers.getDialogClassReference('Delete Column').getContent().getText().then(function(content) {
        if (content !== 'Are you sure you want to delete this column?') {
          expect(false).customError('Expected dialog box content: Are you sure you want to delete this column? ' + 'but Found: "' + content + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click "OK" on the "Delete Confirmation" dilaog', function() {
      ThiefHelpers.getDialogButton('Delete Column', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for delete action to be completed', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "Ref. Bench Test" column is deleted from "Document" directory of "Available" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Document');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getChildrenText().then(function(arrObject) {
            arrObject.forEach(function(element) {
              if (element.text === 'Ref. Bench Test') {
                expect(false).customError('"Ref. Bench Test" column is not deleted from "Document" directory');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Document" is not expanded in "Available" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Ref. Bench Test" column is deleted from "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Ref. Bench Test').isPresent().then(function(option) {
        if (option) {
          expect(option).customError('"Ref. Bench Test" column was not deleted from "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'Index out of bound') {
          expect(true).toBeTruthy();
        }
      });
    });
  });

  describe('Test Step ID: 544491', function() {

    it('Should click on "OK" button from "Tile Options - Reference Column Test" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Reference Column Test" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - Reference Column Test" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Reference Column Test" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Reference Column Test" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Reference Column Test').then(function(found) {
        if (!found) {
          expect(false).customError('"Reference Column Test" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Reference Column Test')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Reference Test" and "Ref. Bench Test" columns are removed from the calculated report', function() {
      expect(PA3MainPage.getAllColumnOfCalculatedReport('Reference Column Test').count()).toEqual(2);
    });
  });
});
