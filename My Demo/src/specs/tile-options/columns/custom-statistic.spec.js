'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: custom-statistic', function() {

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  describe('Test Step ID: 696400', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:default_doc_auto"', function() {
      PA3MainPage.switchToDocument('default-doc-auto');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

  });

  describe('Test Step ID: 696401', function() {

    it('Should click on the Wrench icon in the "Weights" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying wrench menu list is displayed in "Weights" report workspace
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Wrench menu drop down list is not displayed in ' +
            '"Weights" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from drop down of report workspace ', function() {
      // Clicking "Options" from menu drop down of "Weights" report workspace
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function() {

        expect(false).customError(' Not able to select "Options" option from "drop down" of report workspace');
        CommonFunctions.takeScreenShot();
      });

      // Verifying tile options mode is opened
      TileOptions.isTileOptionsMode().then(function(value) {
        if (!value) {
          expect(false).customError('Tile Options mode is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Weights') {
          expect(false).customError('"Tile Options - Weights" view has not appeared. ' +
            'Expected: "Tile Options - Weights" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" tab from the LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Columns" tab from LHP');
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Columns" tab is selected in LHP
      TileOptions.getLHPOption('Columns').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Columns" tab did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "+" icon in the "Available" section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsColumns.xpathAddNewButton).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "New/Reference" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('New/Reference').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying "Columns" dialog is displayed', function() {
      ThiefHelpers.isDialogOpen('Columns', undefined, undefined).then(function(flag) {
        if (!flag) {
          expect(false).customError('"Columns" dialog did not display');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 696407', function() {

    it('Select the "New" radio button if not already selected', function() {
      ThiefHelpers.getRadioClassReference('New').isSelected().then(function(selected) {
        if (!selected) {
          ThiefHelpers.getRadioClassReference('New').select();
        }
      });
    });

    // Enter formula into the section, click on the X Close button and verify the formula entered
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'P_PRICE(0)', undefined, undefined, 'X Close', 'P_PRICE(0)');

    it('Should type "FDS" into the "Name" field', function() {
      ThiefHelpers.getTextBoxClassReference('name').setText('FDS');

      // Verifying that "FDS" is typed into the "Name" field
      ThiefHelpers.getTextBoxClassReference('name').getText().then(function(text) {
        if (text !== 'FDS') {
          expect(false).customError('"Name" field is not set with "FDS", Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Save" button to save the settings', function() {
      CreateEditCustomColumns.getButton('Save').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(
        CreateEditCustomGroupings.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Expand "Client" from "Available" container and select "FDS"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client');
      group.expand();

      // Verifying if "Document" is expanded
      group.isExpanded().then(function(expanded) {

        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Client', 'FDS', 'last').then(function(indexOfElement) {
            var item = group.getItemByIndex(indexOfElement);
            item.then(function(listItem) {
              listItem.select();
            });
          }, function(error) {
            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"Client" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should click on right arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying that "FDS" is added to selected section', function() {
      TileOptionsColumns.getElementFromSelectedSection('FDS').isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('"FDS" is not added to selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 696410', function() {

    it('Should expand "Statistics" section from "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Statistics').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Statistics" is not expanded in "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should open "Add a statistic..." drop down', function() {
      TileOptionsColumns.getStatisticsDropDown().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Weighted Average" from "Add a statistic..." Dropdown', function() {
      ThiefHelpers.getOptionFromDropdown('Weighted Average').click();

      // Verifying if option is added to the selected list
      TileOptionsColumns.getSelectedStatistic('Weighted Average').isPresent().then(function(isexist) {
        if (!isexist) {
          expect(false).customError('"Weighted Average" is not added');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options - Weights" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Weights" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Weights" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 180000);
    });

    it('Verifying if "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Weights" report: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "FDS" column is present in the "Weights" report', function() {
      SlickGridFunctions.getColumnNames('Weights').then(function(allColumnName) {
        if (allColumnName.indexOf('FDS') < 0) {
          expect(false).customError('"Commercial Services" group is not present in the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 696466 ', function() {

    it('Should click on the Wrench icon in the " Weights " report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying wrench menu list is displayed in "Weights" report workspace
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Wrench menu drop down list is not displayed in ' +
            '"Weights" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function() {

        expect(false).customError(' Not able to select "Options" option from "drop down"');
        CommonFunctions.takeScreenShot();
      });

      // Verifying tile options mode is opened
      TileOptions.isTileOptionsMode().then(function(value) {
        if (!value) {
          expect(false).customError('Tile Options mode is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Weights') {
          expect(false).customError('"Tile Options - Weights" view has not appeared. ' +
            'Expected: "Tile Options - Weights" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" tab from the LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Columns" tab from LHP');
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Columns" tab is selected in LHP
      TileOptions.getLHPOption('Columns').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Columns" tab did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "Client" from "Available" container and select "FDS" and Click on the pencil icon next to FDS', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client');
      group.expand();

      // Verifying if "Client" is expanded
      group.isExpanded().then(function(expanded) {

        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Client', 'FDS', 'last').then(function(indexOfElement) {
            var action = group.getItemByIndex(indexOfElement);

            // Hover on "FDS" and click on the "Edit" icon
            return action.then(function(edit) {
              return edit.getActions().then(function(val) {
                return val.triggerAction('edit');
              });
            });
          }, function(error) {
            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"Client" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Verifying "Columns" dialog is displayed', function() {
      ThiefHelpers.isDialogOpen('Columns', undefined, undefined).then(function(flag) {
        if (!flag) {
          expect(false).customError('"Columns" dialog did not display');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should clear the text in the Formula section', function() {
      browser.actions().mouseMove(CreateEditCustomColumns.getTabTextArea('Formula', 'New')).click().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a',
        protractor.Key.DELETE)).perform();

      // Added the code as the script fails if we try to click and enter the text again in the Formula section
      element(by.xpath(CreateEditCustomColumns.xpathClick)).click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Enter formula into the section and click outside
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'P_PRICE(#SD)', undefined, undefined, 'clickOutside');

    it('Click on "Save" button to save the settings', function() {
      CreateEditCustomColumns.getButton('Save').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(
        CreateEditCustomGroupings.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Should select "FDS" from "Selected" section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('FDS').select();

      // Verify if 'Bench. Ending Weight' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('FDS').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"FDS" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Statistics" section from "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Statistics').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Statistics" is not expanded in "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "Weighted Average" is displayed under "STATISTICS" accordion', function() {
      TileOptionsColumns.getSelectedStatistic('Weighted Average').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Weighted Average" is not displayed under "STATISTICS" accordion');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 698551 ', function() {

    var indexOfFDS;
    var noOfchilds;
    it('Expand "Client" from "Available" container, select "FDS"  and delete it by clicking on cross icon next to it', function() {

      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client');
      group.expand();

      // Verifying if "Client" is expanded
      group.isExpanded().then(function(expanded) {

        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Client', 'FDS', 'last').then(function(indexOfElement) {
            indexOfFDS = indexOfElement;
            var action = group.getItemByIndex(indexOfElement);

            // Note the number of childs under Client
            group.getChildrenText().then(function(childItems) {
              noOfchilds = childItems.length;
            });

            return action.then(function(edit) {
              return edit.getActions().then(function(val) {
                return val.triggerAction('remove');
              });
            });
          }, function(error) {
            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"Client" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Verifying that "Delete Column" dialog box saying "Are you sure you want to delete this column?" appears', function() {
      ThiefHelpers.verifyDialogTitle('Delete Column');

      // Verifying the content
      ThiefHelpers.getDialogClassReference('Delete Column').getContent().getText().then(function(content) {
        if (content !== 'Are you sure you want to delete this column?') {
          expect(false).customError('Expected dialog box content: Are you sure you want to delete this column? ' +
            'but Found: "' + content + '"');
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
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(
        TileOptionsColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verify that "FDS" is removed from selected section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client');
      group.expand();
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getChildrenText().then(function(childItems) {
            if (childItems.length !== noOfchilds - 1) {
              expect(false).customError('"FDS" is not removed, count before deleting FDS : ' + noOfchilds + ', ' +
                'count after deletion:' + childItems.length);
            }
          });
        } else {
          expect(false).customError('"Client" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

});
