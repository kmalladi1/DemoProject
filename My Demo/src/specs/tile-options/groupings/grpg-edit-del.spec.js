'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: grpg-edit-del', function() {
  // Variable(s)
  var arrCSElements = [];
  var arrRefValues = [];
  var arrRefsPAWValues = [];
  var countBeforeEdit = 0;
  var countBeforeDelete;
  var noElemBeforeDeletingRef;

  describe('Test Step ID: 551578', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:/default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

    it('Should select "Automatic Calculation" option', function() {
      // Un-check "Automatic Calculation" to force re-check it
      PA3MainPage.getWrenchIcon().click();
      PA3MainPage.setAutomaticCalculation(false);

      // Click on Wrench button to select "Automatic Calculation"
      PA3MainPage.getWrenchIcon().click();
      expect(PA3MainPage.setAutomaticCalculation(true)).toBeTruthy();
    });

    it('Type "Client:/Pa3/test" into the "Portfolio" widget box and select "Client:/pa3/TEST.ACCT" from type ahead', function() {
      PA3MainPage.setPortfolio('Client:/pa3/test', 'Client:/pa3/TEST.ACCT', 'CLIENT:/PA3/TEST.ACCT').then(function(value) {
        if (!value) {
          expect(false).customError('"Client:/pa3/TEST.ACCT" is not found/selected from typeahead.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Weights" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Weights" report appeared without any issues', function() {
      expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();

      // Verifying if any error dialog box appeared
      expect(PA3MainPage.getDialog('Calculation Error').isPresent()).toBeFalsy();
    });

    it('Verifying that "Benchmark" widget displays "RUSSELL:1000"', function() {
      expect(PA3MainPage.getWidgetBox('Benchmark').getAttribute('value')).toEqual('RUSSELL:1000');
    });
  });

  describe('Test Step ID: 551579', function() {

    it('Should select "Attribution" report from LHP', function() {
      PA3MainPage.getReports('Attribution').click();

      // Verifying that "Attribution" report is selected
      expect(PA3MainPage.getReports('Attribution').getAttribute('class')).toContain('selected');
    });

    it('Waiting for "Attribution" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Attribution" report appeared', function() {
      expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
    });

    it('Should click on "Economic Sector" hyperlink in the report', function() {
      PA3MainPage.getGroupingsHyperLink('Attribution').click();
    });

    it('Verifying that "Tile Options" mode appeared', function() {
      expect(TileOptions.isTileOptionsMode()).toBeTruthy();
    });

    // Clicking on Groupings LHP item to select.
    it('Should click on Groupings LHP item to select', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Groupings' item is opened.
      expect(TileOptions.getOptionTitle().getText()).toEqual('Groupings');
    });

    it('Should click on "New" button and select New/Reference', function() {
      TileOptionsGroupings.getNewButton().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Selecting "New/Reference" option from the drop down.
      TileOptionsGroupings.getNewDropDownItem('New/Reference').click();
    });

    it('Verifying that dialog view is changed to "New/Reference" mode', function() {
      expect(element(by.xpath(CreateEditCustomGroupings.xpathNewReference)).isDisplayed()).toBeTruthy();
    });

    it('Select the "New" radio button', function() {
      CreateEditCustomGroupings.getRadioButton('New').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "New" radio button is selected
      expect(CreateEditCustomGroupings.getRadioButton('New').getAttribute('class')).not.toBeNull();
    });

    it('Select "Formula" tab from the "New/Reference" window', function() {
      CreateEditCustomGroupings.getTab('Formula').click().then(function() {
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

    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'P_PRICE', undefined, undefined, 'clickoutside', undefined);

    it('Should select the checkbox "Allow Fractiling"', function() {
      CreateEditCustomGroupings.getCheckbox('Allow Fractiling').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Allow Fractiling" checkbox is selected
      expect(Utilities.isCheckboxSelected(CreateEditCustomGroupings.getCheckbox('Allow Fractiling'))).toBeTruthy();
    });

    it('Type "price grouping" into the "Name" field', function() {
      CreateEditCustomGroupings.getNameField().sendKeys('price grouping').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "price grouping" is typed into the "Name" field
      expect(CreateEditCustomGroupings.getNameField().getAttribute('value')).toEqual('price grouping');
    });

    it('Click on "Save" button to save the settings', function() {
      CreateEditCustomGroupings.getButton('Save').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomGroupings.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "New/Reference" mode is no more displayed', function() {
      element(by.xpath(CreateEditCustomGroupings.xpathNewReference)).isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"New/Reference" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Expand "Client" from "Available" section', function() {
      TileOptionsGroupings.expandElementTree('Client');
    });

    it('Verifying that "Client" is expanded', function() {

      TileOptionsGroupings.checkIfExpanded('Client').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('Error: Client is not expanded');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "price grouping" is displayed at the bottom in the "Client" directory', function() {
      var length;
      var allElements = TileOptionsGroupings.getAllElementsFromGroup('Client');
      allElements.count().then(function(count) {
        length = count;
      }).then(function() {
        // Get the element into visibility
        Utilities.makeElementVisible(allElements.get(length - 1));

        expect(allElements.get(length - 1).getText()).toEqual('price grouping');
      });
    });
  });

  describe('Test Step ID: 551580', function() {

    it('Double click on "price grouping" from "Client" directory', function() {
      TileOptionsGroupings.getElementFromAvailableSection('Client', 'price grouping').isPresent().then(function(option) {
        if (option) {
          browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('Client', 'price grouping')).perform();
        } else {
          expect(false).customError('"price grouping" is not present in "Client" directory');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "price grouping" is added to the "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('price grouping').isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('"price grouping" is not added to the "Selected" section');
          CommonFunctions.takeScreenShot();
        }
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

    it('Waiting for "Attribution" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(errFound) {
        expect(!errFound).customError('"Calculation Error" dialog is found while "Attribution" report was calculating');
      });
    });

    it('Expand "Commercial Services" from the calculated report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Attribution', 'Commercial Services');

      // Verifying if "Commercial Services" tree is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Attribution', 'Commercial Services');
    });

    it('Verifying that "Decile" groupings are displayed under "Commercial Services" ', function() {
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Attribution', 2).each(function(element) {
        element.getText().then(function(text) {
          arrCSElements.push(text);
        });
      }).then(function() {
        for (var i = 0; i < arrCSElements.length; i++) {
          expect(arrCSElements[i].indexOf('Decile') > -1 || arrCSElements[i].indexOf('[N/A]') > -1).customError('It is expected that securities under "Commercial Services" ' + 'should either display "price grouping Decile" or "[N/A]" but Found: "' + arrCSElements[i] + '"');
        }
      });
    });
  });

  describe('Test Step ID: 551581', function() {

    it('Click on "Economic Sector" hyperlink in the report', function() {
      // Verifying that Hyperlink name is "Economic Sector"
      PA3MainPage.getGroupingsHyperLink('Attribution').getText().then(function(text) {
        if (text.indexOf('Economic Sector') > -1) {
          // Click on the "Economic Sector" Hyperlink
          PA3MainPage.getGroupingsHyperLink('Attribution').click();
        }
      });
    });

    it('Validating if "Tile Options" mode opened', function() {
      expect(TileOptions.isTileOptionsMode()).toBeTruthy();
    });

    it('Expand "Client" from "Available" container', function() {
      TileOptionsGroupings.expandElementTree('Client');
    });

    it('Verifying that "Client" is expanded', function() {
      TileOptionsGroupings.checkIfExpanded('Client').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('Error: Client is not expanded');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Get the number of groupings under "Client" directory
      TileOptionsGroupings.getAllElementsFromGroup('Client').count().then(function(count) {
        countBeforeEdit = count;
      });
    });

    it('Hover over "price grouping" from "Client" and click on the "Edit" icon', function() {
      TileOptionsGroupings.getEditIconForGroupingsInAvailableSection('Client', 'price grouping').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that view changes to "New/Reference" mode', function() {
      expect(element(by.xpath(CreateEditCustomGroupings.xpathNewReference)).isPresent()).toBeTruthy();
    });

    it('Should clear the text in the Formula section', function() {
      browser.actions().mouseMove(CreateEditCustomGroupings.getTabTextArea()).click().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a',
        protractor.Key.DELETE)).perform();

      // Added the code as the script fails if we try to click and enter the text again in the Formula section
      element(by.xpath(CreateEditCustomGroupings.xpathClick)).click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'FG_MKT_VALUE', true, 'FG_MKT_VALUE', 'X Close', 'FG_MKT_VALUE(#CU)');

  });

  describe('Test Step ID: 551582', function() {

    it('Should select "Client/QA Test Groupings" from "Sub-directory" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference('Sub-directory:').open();

      ThiefHelpers.getDropDownSelectClassReference('Sub-directory:').selectItemByText('Client/QA Test Groupings');
    });

    it('Verifying if the "Sub-directory" drop down is set to "Client/QA Test Groupings"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Sub-directory:').getSelectedText().then(function(text) {
        if (text !== 'Client/QA Test Groupings') {
          expect(false).customError('"Sub-directory" drop down did not set to "Client/QA Test Groupings"; Found:' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Replace "price grouping" with "client grouping" from the "Name" field', function() {
      // Remove the existing text
      CreateEditCustomGroupings.getNameField().clear().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Type "client grouping" into the "Name" field
      CreateEditCustomGroupings.getNameField().sendKeys('client grouping').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "client grouping" is entered into the "Name" field
      expect(CreateEditCustomGroupings.getNameField().getAttribute('value')).toEqual('client grouping');
    });

    it('Click on "Save" button to save the settings', function() {
      CreateEditCustomGroupings.getButton('Save').click();
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomGroupings.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "Create/Edit Custom Grouping" mode is no more displayed', function() {
      element(by.xpath(CreateEditCustomGroupings.xpathNewReference)).isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Create/Edit Custom Grouping" mode is still displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "QA Test Groupings" under "Client" from "Available" container', function() {
      //Verify if "Client" is expanded before expanding "QA Test Groupings"
      TileOptionsGroupings.checkIfExpanded('Client').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('Error: Client is not expanded');
          CommonFunctions.takeScreenShot();
        } else {
          TileOptionsGroupings.expandElementTree('QA Test Groupings');
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it(' Verifying that "Client > QA Test Groupings" is expanded', function() {
      TileOptionsGroupings.checkIfExpanded('Client|QA Test Groupings').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('Error: QA Test Groupings is not expanded');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "price grouping" is not displayed at the bottom in the "Client" directory', function() {
      var allElements = TileOptionsGroupings.getAllElementsFromGroup('Client');
      allElements.count().then(function(count) {
        expect(count === countBeforeEdit - 1).customError('"price grouping" is displayed at the bottom in the "Client" directory');
        if (count !== countBeforeEdit - 1) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "client grouping" is displayed at the bottom in the "Client > QA Test Groupings" sub-directory', function() {
      var length;
      var allElements = TileOptionsGroupings.getAllElementsFromGroup('Client|QA Test Groupings');
      allElements.count().then(function(count) {
        length = count;
      }).then(function() {
        // Make the element visible
        Utilities.makeElementVisible(allElements.get(length - 1));

        // Verifying if last element in "Client > QA Test Groupings" is "client grouping"
        allElements.get(length - 1).getText().then(function(value) {
          if (value !== 'client grouping') {
            expect(false).customError('The last element in "Client > QA Test Groupings" is not "client grouping');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying that 2nd element in the "Selected" section is "client grouping"', function() {
      TileOptionsGroupings.getAllElements('Selected').get(1).getText().then(function(value) {
        if (value !== 'client grouping') {
          expect(false).customError('The 2nd element in the "Selected" section is not "client grouping"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 551583', function() {

    it('Should select "client grouping" from the "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('client grouping').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "client grouping" is selected
      expect(TileOptionsGroupings.getElementFromSelectedContainer('client grouping').getAttribute('class')).toContain('selected');
    });

    it('Should select "Quartile" from "Fractiles" drop down in "Definition" section', function() {
      // Click on "Fractiles" drop down button
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsGroupings.getDropDownFromDefinitionSection('Fractiles')).open();

      // Select "Quartile" from the drop down
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsGroupings.getDropDownFromDefinitionSection('Fractiles')).selectItemByText('Quartile');

      // Verifying that "Quartile" option is selected
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsGroupings.getDropDownFromDefinitionSection('Fractiles')).getSelectedText().then(function(text) {
        if (text !== 'Quartile') {
          expect(false).customError('The "Fractiles" drop down is not set to "Quartile"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
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

    it('Waiting for "Attribution" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Attribution" report appeared with errors');
          CommonFunctions.takeScreenShot();
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

    it('Verifying that "Quartile" groupings are displayed under "Commercial Services" ', function() {
      arrCSElements = [];
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Attribution', 2).each(function(element) {
        element.getText().then(function(text) {
          arrCSElements.push(text);
        });
      }).then(function() {
        for (var i = 0; i < arrCSElements.length; i++) {
          expect(arrCSElements[i].indexOf('Quartile') > -1 || arrCSElements[i].indexOf('[N/A]') > -1).customError('It is expected that securities under "Commercial Services" ' + 'should either display "client grouping Quartile" or "[N/A]" but Found: "' + arrCSElements[i] + '"');
        }
      });
    });
  });

  describe('Test Step ID: 557193', function() {

    it('Should click on "Economic Sector" hyperlink in the report', function() {
      PA3MainPage.getGroupingsHyperLink('Attribution').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Tile Options" mode appeared', function() {
      expect(TileOptions.isTileOptionsMode()).toBeTruthy();
    });

    it('Expand "Client > QA Test Groupings" from "Available" container', function() {
      TileOptionsGroupings.expandElementTree('Client|QA Test Groupings');
    });

    it('Verifying that "Client > QA Test Groupings" is expanded', function() {
      TileOptionsGroupings.checkIfExpanded('Client|QA Test Groupings').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('Error: QA Test Groupings is not expanded');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Hover over "client grouping" from "Client|QA Test Groupings" and click on the "Edit" icon', function() {
      TileOptionsGroupings.getEditIconForGroupingsInAvailableSection('Client|QA Test Groupings', 'client grouping').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that view changes to "New/Reference" mode', function() {
      expect(element(by.xpath(CreateEditCustomGroupings.xpathNewReference)).isPresent()).toBeTruthy();
    });

    it('Should clear the text in the Formula section', function() {
      browser.actions().mouseMove(CreateEditCustomGroupings.getTabTextArea()).click().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a',
        protractor.Key.DELETE)).perform();

      // Added the code as the script fails if we try to click and enter the text again in the Formula section
      element(by.xpath(CreateEditCustomGroupings.xpathClick)).click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'P_PRICE', undefined, undefined, 'clickOutside', undefined);

  });

  describe('Test Step ID: 557195', function() {

    it('Should select "Client/CSTM2" from "Sub-directory" drop down', function() {
      // Click on "Sub-directory" drop down
      ThiefHelpers.getDropDownSelectClassReference(undefined, CreateEditCustomGroupings.getSubDirButton()).open();

      // Select "Client/CSTM2" from the drop down
      ThiefHelpers.getDropDownSelectClassReference(undefined, CreateEditCustomGroupings.getSubDirButton()).selectItemByText('Client/CSTM2');

      // Verifying that "Client/CSTM2" is selected
      ThiefHelpers.getDropDownSelectClassReference(undefined, CreateEditCustomGroupings.getSubDirButton()).getSelectedText().then(function(text) {
        if (text !== 'Client/CSTM2') {
          expect(false).customError('The "Sub Directory" drop down is not set to "Client/CSTM2"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Type "custom grouping" in the "Name" field', function() {
      // Remove the existing text
      CreateEditCustomGroupings.getNameField().clear().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Type "custom grouping" into the "Name" field
      CreateEditCustomGroupings.getNameField().sendKeys('custom grouping').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "custom grouping" is entered into the "Name" field
      expect(CreateEditCustomGroupings.getNameField().getAttribute('value')).toEqual('custom grouping');
    });

    it('Click on "Save As" button to save the settings', function() {
      CreateEditCustomGroupings.getButton('Save As').click();
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomGroupings.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "Create/Edit Custom Grouping" mode is no more displayed', function() {
      element(by.xpath(CreateEditCustomGroupings.xpathNewReference)).isPresent().then(function() {
      }, function() {
        expect(false).customError('"Create/Edit Custom Grouping" mode is displayed');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Expand "CSTM2" under "Client" from "Available" container', function() {
      //Verify if "Client" is expanded by default before expanding "CSTM2"
      TileOptionsGroupings.checkIfExpanded('Client').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('Client is not expanded');
          CommonFunctions.takeScreenShot();
        } else {
          TileOptionsGroupings.expandElementTree('CSTM2');
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Client > CSTM2" is expanded', function() {
      TileOptionsGroupings.checkIfExpanded('Client|CSTM2').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('CSTM2 is not expanded');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Double click on "custom grouping" from "Client|CSTM2" directory', function() {
      TileOptionsGroupings.getElementFromAvailableSection('Client|CSTM2', 'custom grouping').isPresent().then(function(option) {
        if (option) {
          browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('Client|CSTM2', 'custom grouping')).perform();
        } else {
          expect(false).customError('"custom grouping" is not present in "Client|CSTM2" directory');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "custom grouping" is added to the "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('custom grouping').isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('"custom grouping" is not added to the "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 557196', function() {

    it('Should select "custom grouping" from the "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('custom grouping').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "custom grouping" is selected
      expect(TileOptionsGroupings.getElementFromSelectedContainer('custom grouping').getAttribute('class')).toContain('selected');
    });

    it('Should select "Percentile" from "Fractiles" drop down in "Definition" section', function() {
      // Click on "Fractiles" drop down button
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsGroupings.getDropDownFromDefinitionSection('Fractiles')).open();

      // Select "Percentile" from the drop down
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsGroupings.getDropDownFromDefinitionSection('Fractiles')).selectItemByText('Percentile');

      // Verifying that "Percentile" is selected
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsGroupings.getDropDownFromDefinitionSection('Fractiles')).getSelectedText().then(function(text) {
        if (text !== 'Percentile') {
          expect(false).customError('The "Fractiles" drop down is not set to "Percentile"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
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

    it('Waiting for "Attribution" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(errFound) {
        expect(!errFound).customError('"Calculation Error" dialog is found while "Attribution" report was calculating');
      });
    });

    it('Expand "client grouping" rows from "Commercial Services" sector of the calculated report', function() {
      //Get client grouping text (includes Quartile value)
      arrCSElements = [];
      var clientGroupingText = '';
      var clientGroupingExpandTree = '';
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Attribution', 2).each(function(element) {
        element.getText().then(function(text) {
          arrCSElements.push(text);
        });
      }).then(function() {
        PA3MainPage.checkIfTreeExpandedInCalculatedReport('Attribution', 'Commercial Services');

        clientGroupingText = arrCSElements[0];
        PA3MainPage.expandTreeInCalculatedReport('Attribution', clientGroupingText);

        // Verifying if "client grouping" row is expanded
        clientGroupingExpandTree = 'Commercial Services|' + clientGroupingText;
        PA3MainPage.checkIfTreeExpandedInCalculatedReport('Attribution', clientGroupingExpandTree);
      });
    });

    it('Verifying that "Percentile" groupings are displayed under "Commercial Services > client grouping" ', function() {
      arrCSElements = [];
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Attribution', 3).each(function(element) {
        element.getText().then(function(text) {
          arrCSElements.push(text);
        });
      }).then(function() {
        for (var i = 0; i < arrCSElements.length; i++) {
          expect(arrCSElements[i]).toContain('Percentile');
        }
      });
    });
  });

  describe('Test Step ID: 551584', function() {

    it('Should click on "Economic Sector" hyperlink in the report', function() {
      PA3MainPage.getGroupingsHyperLink('Attribution').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Tile Options" mode appeared', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Tile Options" report appeared with errors');
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
      expect(TileOptions.getOptionTitle().getText()).toEqual('Groupings');
    });

    it('Should click on "+" button and select New/Reference', function() {
      TileOptionsGroupings.getNewButton().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Selecting "New/Reference" option from the drop down.
      TileOptionsGroupings.getNewDropDownItem('New/Reference').click();
    });

    it('Verifying that dialog view is changed to "New/Reference" mode', function() {
      expect(element(by.xpath(CreateEditCustomGroupings.xpathNewReference)).isPresent()).toBeTruthy();
    });

    it('Select the "Reference" radio button', function() {
      ThiefHelpers.getRadioClassReference('Reference').select();

      // Verifying if the "Reference" radio button is selected
      ThiefHelpers.getRadioClassReference('Reference').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Reference" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Formula" tab from the "Groupings" window', function() {
      CreateEditCustomGroupings.getTab('Formula').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Formula" tab is selected
      Utilities.isElementSelected(CreateEditCustomGroupings.getTab('Formula')).then(function(bool) {
        if (!bool) {
          expect(false).customError('"Formula" tab is selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Double click on "Col 1: Port. Average Weight" under "Formula" section', function() {
      ThiefHelpers.getVirtualListboxClassReference().getItemByText('Col 1: Port. Average Weight').doubleClick();
    });

    it('Verifying that "COL1" is added to the text area', function() {
      CreateEditCustomGroupings.getTabTextArea().getText().then(function(value) {
        if (value !== 'COL1') {
          expect(false).customError('"COL1" is not added to the "Formula" field but Found: "' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enter "Ref. Port" into the "Name" field', function() {
      CreateEditCustomGroupings.getNameField().sendKeys('Ref. Port').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Ref. Port" is entered into the Field
      expect(CreateEditCustomGroupings.getNameField().getAttribute('value')).toEqual('Ref. Port');
    });

    it('Click on "Save" button to save the settings', function() {
      CreateEditCustomGroupings.getButton('Save').click();
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomGroupings.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "New/Reference" mode is no more displayed', function() {
      element(by.xpath(CreateEditCustomGroupings.xpathNewReference)).isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"New/Reference" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Expand "Client > CSTM2" from "Available" container', function() {
      TileOptionsGroupings.expandElementTree('Client|CSTM2');
    });

    it('Verifying that "Client > CSTM2" is expanded', function() {
      TileOptionsGroupings.checkIfExpanded('Client|CSTM2').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('CSTM2 is not expanded');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Hover over "custom grouping" from "Client|CSTM2" and click on the "Delete" icon', function() {
      TileOptionsGroupings.getRemoveIconForGroupingsInAvailableSection('Client|CSTM2', 'custom grouping').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Delete Grouping" dialog saying "Are you sure you want to delete this grouping?" appeared', function() {
      //Verifying if "Delete Grouping" dialog appeared
      ThiefHelpers.verifyDialogTitle('Delete Grouping');

      //Verifying if dialog saying "Are you sure you want to delete this grouping?" is appeared
      ThiefHelpers.getDialogClassReference('Delete Grouping').getContent().getText().then(function(text) {
        if (text !== 'Are you sure you want to delete this grouping?') {
          expect(false).customError('"Delete Grouping" dialog saying "Are you sure you want to delete this' + ' grouping?" not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "OK" button in the confirmation dialog box', function() {
      ThiefHelpers.getDialogButton('Delete Grouping', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should expand "Document" from the "Available" section', function() {
      TileOptionsGroupings.expandElementTree('Document');

      // Check if "Document" tree is expanded
      TileOptionsGroupings.checkIfExpanded('Document').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('Error: Document is not expanded');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Ref. Port" is present under "Document"', function() {
      TileOptionsGroupings.getElementFromAvailableSection('Document', 'Ref. Port').isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('"Ref. Port" is not present under "Document"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Ref. Port" is displayed under "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Ref. Port').isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('"Ref. Port" is not displayed under "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "custom grouping" is removed from the "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('custom grouping').isPresent().then(function(value) {
        if (value) {
          expect(false).customError('"custom grouping" is not removed from "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.message.indexOf('Index out of bound') > -1) {
          expect(true).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 551585', function() {

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

    it('Waiting for "Attribution" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Attribution" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "client grouping Quartile" is displayed beneath the "Commercial Services" sector', function() {
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Attribution', 1).get(0).getText().then(function(value) {
        if (value !== 'Commercial Services') {
          expect(false).customError('"client grouping Quartile" is not displayed beneath the "Commercial Services" sector');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying that "client grouping Quartile" fall under "Commercial Services"
      expect(PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Attribution', 2).get(0).getText()).toContain('client grouping Quartile');
    });

    it('Verifying that reference grouping displayed as values beneath "client groupings"', function() {
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Attribution', 3).each(function(element) {
        element.getText().then(function(value) {
          arrRefValues.push(value);
        });
      }).then(function() {
        for (var i = 0; i < arrRefValues.length; i++) {
          expect(isNaN(arrRefValues[i])).toBeFalsy();
        }
      });
    });

    it('Get the reference grouping number corresponding values under "Port. Average Weight"', function() {
      arrRefValues.forEach(function(rowName) {
        PA3MainPage.getValueFromCalculatedReport('Attribution', rowName, 'Port. Average Weight').then(function(value) {
          arrRefsPAWValues.push(value);
        });
      });
    });

    it('Verifying that reference groupings number is matching with the corresponding values under "Port. Average Weight" column', function() {
      arrRefsPAWValues.forEach(function(corresValue, index) {
        if (corresValue !== '--') {
          expect(corresValue).toEqual(parseFloat(arrRefValues[index]).toFixed(2));
        }
      });
    });
  });

  describe('Test Step ID: 551586', function() {

    it('Should click on "Economic Sector" hyperlink in the report', function() {
      PA3MainPage.getGroupingsHyperLink('Attribution').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is open', function() {
      expect(TileOptions.isTileOptionsMode()).toBeTruthy();
    });

    it('Expand "Document" from "Available" container', function() {
      TileOptionsGroupings.expandElementTree('Document');
    });

    it('Verifying that "Document" is expanded', function() {
      TileOptionsGroupings.checkIfExpanded('Document').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('"Document" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Hover over "Ref. Port" from "Document" and click on the "Edit" icon', function() {
      TileOptionsGroupings.getEditIconForGroupingsInAvailableSection('Document', 'Ref. Port').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that view changes to "New/Reference" mode', function() {
      expect(element(by.xpath(CreateEditCustomGroupings.xpathNewReference)).isPresent()).toBeTruthy();
    });

    it('Should clear the text in the Formula section', function() {
      browser.actions().mouseMove(CreateEditCustomGroupings.getTabTextArea()).click().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a',
        protractor.Key.DELETE)).perform();

      // Added the code as the script fails if we try to click and enter the text again in the Formula section
      element(by.xpath(CreateEditCustomGroupings.xpathClick)).click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Formula" Text Area is cleared', function() {
      CreateEditCustomGroupings.getTabTextArea().getText().then(function(value) {
        if (value !== 'Begin typing to enter or search for a formula…') {
          expect(false).customError('Tab text area is not cleared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Formula" tab from the "Groupings" window', function() {
      CreateEditCustomGroupings.getTab('Formula').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Formula" tab is selected
      Utilities.isElementSelected(CreateEditCustomGroupings.getTab('Formula')).then(function(bool) {
        if (!bool) {
          expect(false).customError('"Formula" tab is selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Double click on "Col 2: Port. Total Return" under "Formula" section', function() {
      ThiefHelpers.getVirtualListboxClassReference().getItemByText('Col 2: Port. Total Return').doubleClick();
    });

    it('Verifying that "COL2" is added to the text area', function() {
      CreateEditCustomGroupings.getTabTextArea().getText().then(function(value) {
        if (value !== 'COL2') {
          expect(false).customError('"COL2" is not added to the text area');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Allow Fractiling" checkbox', function() {
      CreateEditCustomGroupings.getCheckbox('Allow Fractiling').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Allow Fractiling" is selected
      expect(Utilities.isCheckboxSelected(CreateEditCustomGroupings.getCheckbox('Allow Fractiling'))).toBeTruthy();
    });

    it('Changed the name from "Ref. Port" to "Ref. Return"', function() {
      CreateEditCustomGroupings.getNameField().clear();

      // Verifying if "Name" filed is cleared
      expect(CreateEditCustomGroupings.getNameField().getAttribute('value')).toEqual('');

      // Enter "Ref. Return" into the "Name' field
      CreateEditCustomGroupings.getNameField().sendKeys('Ref. Return');

      // Verifying that "Ref. Return" is entered
      expect(CreateEditCustomGroupings.getNameField().getAttribute('value')).toEqual('Ref. Return');
    });

    it('Click on "Save" button to save the settings', function() {
      CreateEditCustomGroupings.getButton('Save').click();
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomGroupings.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "New/Reference" mode is no more displayed', function() {
      element(by.xpath(CreateEditCustomGroupings.xpathNewReference)).isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"New/Reference" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "client grouping" from the "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('client grouping').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "client grouping" is selected
      expect(TileOptionsGroupings.getElementFromSelectedContainer('client grouping').getAttribute('class')).toContain('selected');
    });

    it('Move "client grouping" to the bottom of the list', function() {
      TileOptionsGroupings.getArrowButton('Down').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "client grouping" is at the bottom of the list', function() {
      TileOptionsGroupings.getAllElements('Selected').last().getText().then(function(value) {
        if (value !== 'client grouping') {
          expect(false).customError('"client grouping" is not at the bottom of the list');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrSelectedGroupings = ['Economic Sector - FactSet', 'Ref. Return', 'client grouping'];

    arrSelectedGroupings.forEach(function(grpName, index) {
      it('Verifying that "' + grpName + '" is at "' + (index + 1) + '" position', function() {
        TileOptionsGroupings.getIndexFromSelected(grpName).then(function(value) {
          if (value !== index) {
            expect(false).customError('"' + grpName + '" grouping is not at "' + (index + 1) + '" position in the list');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 551587', function() {

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

    it('Waiting for "Attribution" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(errFound) {
        expect(!errFound).customError('"Calculation Error" dialog is found while "Attribution" report was calculating');
        if (errFound) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Ref. Return Decile" is displayed beneath the "Commercial Services" sector', function() {
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Attribution', 1).get(0).getText().then(function(value) {
        if (value.indexOf('Commercial Services') === -1) {
          expect(false).customError('"Commercial Services" is not found in the report');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying that "Ref. Return Decile" fall under "Commercial Services"
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Attribution', 2).get(0).getText().then(function(text) {
        if (text.indexOf('Ref. Return Decile') === -1) {
          expect(false).customError('"Ref. Return Decile" is not found under "Commercial Services"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand first "Ref. Return Decile" from "Commercial Services"', function() {
      browser.actions().doubleClick(PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Attribution', 2).get(0)).perform();
    });

    it('Verifying that "client grouping Quartile" is displayed beneath the "Ref. Return Decile" sector', function() {
      expect(PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Attribution', 3).get(0).getText()).toContain('client grouping Quartile');
    });
  });

  describe('Test Step ID: 557198', function() {

    it('Should click on "Economic Sector" hyperlink in the report', function() {
      PA3MainPage.getGroupingsHyperLink('Attribution').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is open', function() {
      expect(TileOptions.isTileOptionsMode()).toBeTruthy();
    });

    it('Expand "Document" from "Available" container', function() {
      TileOptionsGroupings.expandElementTree('Document');
    });

    it('Verifying that "Document" is expanded', function() {
      TileOptionsGroupings.checkIfExpanded('Document').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('Error: Document is not expanded');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Hover over "Ref. Return" from "Document" and click on the "Edit" icon', function() {
      TileOptionsGroupings.getEditIconForGroupingsInAvailableSection('Document', 'Ref. Return').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that view changes to "New/Reference" mode', function() {
      expect(element(by.xpath(CreateEditCustomGroupings.xpathNewReference)).isPresent()).toBeTruthy();
    });

    it('Should clear the text in the Formula section', function() {
      browser.actions().mouseMove(CreateEditCustomGroupings.getTabTextArea()).click().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a',
        protractor.Key.DELETE)).perform();

      // Added the code as the script fails if we try to click and enter the text again in the Formula section
      element(by.xpath(CreateEditCustomGroupings.xpathClick)).click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Formula" Text Area is cleared', function() {
      CreateEditCustomGroupings.getTabTextArea().getText().then(function(value) {

        // Verifying the text to be "Begin typing to enter or search for a formula…" because we get this text only if it is empty
        if (value !== 'Begin typing to enter or search for a formula…') {
          expect(false).customError('Tab text area is not cleared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Double click on "Col 3: Port. Contribution To Return" under "Formula" section', function() {
      ThiefHelpers.getVirtualListboxClassReference().getItemByText('Col 3: Port. Contribution To Return').doubleClick();
    });

    it('Verifying that "COL3" is added to the text area', function() {
      CreateEditCustomGroupings.getTabTextArea().getText().then(function(value) {
        if (value !== 'COL3') {
          expect(false).customError('"COL3" is not added to the "Formula" field but Found: "' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify that "Allow Fractiling" checkbox is selected', function() {
      // Verifying if "Allow Fractiling" is selected
      expect(Utilities.isCheckboxSelected(CreateEditCustomGroupings.getCheckbox('Allow Fractiling'))).toBeTruthy();
    });

    it('Changed the name from "Ref. Return" to "Ref. Custom"', function() {
      CreateEditCustomGroupings.getNameField().clear();

      // Verifying if "Name" filed is cleared
      expect(CreateEditCustomGroupings.getNameField().getAttribute('value')).toEqual('');

      // Enter "Ref. Custom" into the "Name' field
      CreateEditCustomGroupings.getNameField().sendKeys('Ref. Custom');

      // Verifying that "Ref. Custom" is entered
      expect(CreateEditCustomGroupings.getNameField().getAttribute('value')).toEqual('Ref. Custom');
    });

    it('Click on "Save As" button to save the settings', function() {
      CreateEditCustomGroupings.getButton('Save As').click();
    });

    it('Waiting for changes to be saved', function() {
      Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomGroupings.xpathLoadingBox)), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Problem while saving');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "New/Reference" mode is no more displayed', function() {
      element(by.xpath(CreateEditCustomGroupings.xpathNewReference)).isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"New/Reference" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "client grouping" from the "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('client grouping').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "client grouping" is selected
      expect(TileOptionsGroupings.getElementFromSelectedContainer('client grouping').getAttribute('class')).toContain('selected');
    });

    it('Move "client grouping" to the bottom of the list', function() {
      TileOptionsGroupings.getArrowButton('Down').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "client grouping" is at the bottom of the list', function() {
      TileOptionsGroupings.getAllElements('Selected').last().getText().then(function(value) {
        if (value !== 'client grouping') {
          expect(false).customError('"client grouping" is not at the bottom of the list');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrSelectedGroupings = ['Economic Sector - FactSet', 'Ref. Return', 'Ref. Custom', 'client grouping'];

    arrSelectedGroupings.forEach(function(grpName, index) {
      it('Verifying that "' + grpName + '" is at "' + (index + 1) + '" position', function() {
        TileOptionsGroupings.getIndexFromSelected(grpName).then(function(value) {
          if (value !== index) {
            expect(false).customError('"' + grpName + '" grouping is not at "' + (index + 1) + '" position in the list');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 557200', function() {

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

    it('Waiting for "Attribution" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Attribution" report appeared with errors');
          CommonFunctions.takeScreenShot();
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

  describe('Test Step ID: 551588', function() {

    it('Should click on "Economic Sector" hyperlink in the report', function() {
      PA3MainPage.getGroupingsHyperLink('Attribution').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Tile Options" mode appeared', function() {
      expect(TileOptions.isTileOptionsMode()).toBeTruthy();
    });

    it('Should click on the "Apply to Attribution" button', function() {
      TileOptionsGroupings.getApplyToButton('Attribution').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that blasted window appeared
      expect(element(by.xpath(TileOptionsGroupings.xpathBlastingWindow)).isPresent()).toBeTruthy();
    });

    it('Should select "Weights" checkbox from the blasted window', function() {
      TileOptionsGroupings.getCheckBoxFromBlastWindow('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Weights" checkbox is selected
      expect(Utilities.isCheckboxSelected(TileOptionsGroupings.getCheckBoxFromBlastWindow('Weights'))).toBeTruthy();
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

    it('Should select "Weights" report from LHP', function() {
      PA3MainPage.getReports('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Weights" report is selected
      expect(PA3MainPage.getReports('Weights').getAttribute('class')).toContain('selected');
    });

    it('Waiting for "Weights" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Weights" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors');
          CommonFunctions.takeScreenShot();
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

    it('Should click on "Economic Sector" hyperlink in the report', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Tile Options" mode appeared', function() {
      expect(TileOptions.isTileOptionsMode()).toBeTruthy();
    });

    // Clicking on Groupings LHP item to select.
    it('Should click on Groupings LHP item to select', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Groupings' item is opened.
      expect(TileOptions.getOptionTitle().getText()).toEqual('Groupings');
    });

    var arrSelectedGroupings = ['Economic Sector - FactSet', 'client grouping'];

    arrSelectedGroupings.forEach(function(grpName) {

      it('Verifying that "' + grpName + '" is present in "Selected" section', function() {
        TileOptionsGroupings.getElementFromSelectedContainer(grpName).isPresent().then(function(option) {
          if (!option) {
            expect(false).customError('"' + grpName + '" group is not added to the "Selected" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 551589', function() {

    it('Should click on "Cancel" button of "Tile Options" mode header', function() {
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
          expect(false).customError('"Tile Options" mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Attribution" report from LHP', function() {
      PA3MainPage.getReports('Attribution').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Attribution" report is selected
      expect(PA3MainPage.getReports('Attribution').getAttribute('class')).toContain('selected');
    });

    it('Waiting for "Attribution" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Attribution" report appeared', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Attribution" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on wrench Icon from "Attribution" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that wrench menu appeared
      expect(PA3MainPage.getWrenchIconFromReportWorkspace('Attribution', true).isPresent()).toBeTruthy();
    });

    it('Should click "Options" from drop down menu', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Tile Options" mode appeared', function() {
      expect(TileOptions.isTileOptionsMode()).toBeTruthy();
    });

    // Clicking on Groupings LHP item to select.
    it('Should click on Groupings LHP item to select', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Groupings' item is opened.
      expect(TileOptions.getOptionTitle().getText()).toEqual('Groupings');
    });

    it('Expand "Client > QA Test Groupings" from "Available" container', function() {
      TileOptionsGroupings.expandElementTree('Client|QA Test Groupings');
    });

    it('Verifying that "Client > QA Test Groupings" is expanded', function() {
      TileOptionsGroupings.checkIfExpanded('Client|QA Test Groupings').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('Error: Client|QA Test Groupings is not expanded');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Get the number of elements in "Client > QA Test Groupings" the group
      TileOptionsGroupings.getAllElementsFromGroup('Client|QA Test Groupings').count().then(function(count) {
        countBeforeDelete = count;
      });
    });

    it('Should hover over "client grouping" from "Client > QA Test Groupings" and click on "X" icon', function() {
      TileOptionsGroupings.getRemoveIconForGroupingsInAvailableSection('Client|QA Test Groupings', 'client grouping').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Delete Grouping" dialog saying "Are you sure you want to delete this grouping?" appeared', function() {
      //Verifying if "Delete Grouping" dialog appeared
      ThiefHelpers.verifyDialogTitle('Delete Grouping');

      //Verifying the text saying "Are you sure you want to delete this grouping?" has appeared
      ThiefHelpers.getDialogClassReference('Delete Grouping').getContent().getText().then(function(text) {
        if (text !== 'Are you sure you want to delete this grouping?') {
          expect(false).customError('"Delete Grouping" dialog saying "Are you sure you want to delete this grouping?" ' + 'has not appeared. Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 551590', function() {

    it('Should click on the "OK" button in the confirmation dialog box', function() {
      ThiefHelpers.getDialogButton('Delete Grouping', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait for client grouping to delete', function() {
      Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsGroupings.xpathLoadingBox)), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('"client grouping" is not deleted properly');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "Client > QA Test Groupings"', function() {
      //Verify if "Client|QA Test Groupings" already expanded
      TileOptionsGroupings.checkIfExpanded('Client|QA Test Groupings').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          TileOptionsGroupings.expandElementTree('Client|QA Test Groupings');
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "client grouping" is deleted
      expect(TileOptionsGroupings.getAllElementsFromGroup('Client|QA Test Groupings').count()).toEqual(countBeforeDelete - 1);
    });

    it('Verifying that "client grouping" is deleted from "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('client grouping').isPresent().then(function(value) {
        if (value) {
          expect(false).customError('"client grouping" is not deleted from "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.message.indexOf('Index out of bound') > -1) {
          expect(true).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 705259', function() {

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

    // Getting the xpath of the Selected section
    var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

    it('Hover over "Port. Contribution To Return" from "Selected" section and click on the "Remove" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Portfolio Name');

      // Hover on "Port. Contribution To Return" and click on remove button
      group.getItemByText('Port. Contribution To Return').then(function(item) {
        return item.getActions().then(function(actions) {
          return actions.triggerAction('remove');
        });
      });
    });

    it('Verifying that "Delete Column" dialog box saying "Are you sure you want to delete this column?" appears', function() {
      ThiefHelpers.verifyDialogTitle('Delete Column');

      // Verifying the content
      ThiefHelpers.getDialogClassReference('Delete Column').getContent().getText().then(function(content) {
        if (content !== 'There are reference groupings that reference this column. Do you want to remove this column?') {
          expect(false).customError('Expected dialog box content: Are you sure you want to delete this column? ' + 'but Found: "' + content + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 551592', function() {

    it('Click "Cancel" on the "Delete Confirmation" dilaog', function() {
      ThiefHelpers.getDialogButton('Delete Column', 'Cancel').click().then(function() {
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

    it('Waiting for "Attribution" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Attribution" report appeared with errors');
          CommonFunctions.takeScreenShot();
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

    it('Expand first "Ref. Return Decile" from "Commercial Services"', function() {
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Attribution', 3).get(0).isPresent().then(function(presence) {
        if (!presence) {
          browser.actions().doubleClick(PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Attribution', 2).get(0)).perform();

          // Waiting for expansion.
          browser.sleep(3000);
        }
      }, function(error) {
        if (error.message.indexOf('Index out of bound') > -1) {
          browser.actions().doubleClick(PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Attribution', 2).get(0)).perform();

          // Waiting for expansion.
          browser.sleep(3000);
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Securities" are displayed beneath "Commercial Services > Ref. Return Decile" sector', function() {
      expect(PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Attribution', 3).get(0).getText()).not.toContain('client grouping Quartile');

      // Get the count of number of elements at level-2 before deleting the reference grouping
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Attribution', 2).count().then(function(count) {
        noElemBeforeDeletingRef = count;
      });
    });
  });

  describe('Test Step ID: 551591', function() {

    it('Should click on "Economic Sector" hyperlink in the report', function() {
      PA3MainPage.getGroupingsHyperLink('Attribution').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Tile Options" mode appeared', function() {
      expect(TileOptions.isTileOptionsMode()).toBeTruthy();
    });

    // Clicking on Groupings LHP item to select.
    it('Should click on Groupings LHP item to select', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Groupings' item is opened.
      expect(TileOptions.getOptionTitle().getText()).toEqual('Groupings');
    });

    it('Expand "Document" from "Available" container', function() {
      TileOptionsGroupings.expandElementTree('Document');
    });

    it('Verifying that "Document" is expanded', function() {
      TileOptionsGroupings.checkIfExpanded('Document').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('"Document" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should hover over "Ref. Return" from "Document" and click on "X" icon', function() {
      TileOptionsGroupings.getRemoveIconForGroupingsInAvailableSection('Document', 'Ref. Return').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on the "OK" button in the confirmation dialog box', function() {
      ThiefHelpers.getDialogButton('Delete Grouping', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait for custom grouping to delete', function() {
      Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsGroupings.xpathLoadingBox)), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('"custom grouping" is not deleted properly');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover over "Ref. Custom" from "Document" and click on "X" icon', function() {
      TileOptionsGroupings.getRemoveIconForGroupingsInAvailableSection('Document', 'Ref. Custom').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on the "OK" button in the confirmation dialog box', function() {
      ThiefHelpers.getDialogButton('Delete Grouping', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait for custom grouping to delete', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsGroupings.xpathLoadingBox)), 180000)).toBeTruthy();
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

    it('Waiting for "Attribution" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Attribution" report appeared with errors');
          CommonFunctions.takeScreenShot();
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

    it('Verifying that report re-loaded with data grouped by only "Economic Sector"', function() {
      expect(PA3MainPage.getGroupingsHyperLink('Attribution').getText()).toEqual('Economic Sector');

      // Verifying that data is grouped only by "Economic Sector"
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Attribution', 2).count().then(function(count) {
        expect(count).toBeGreaterThan(noElemBeforeDeletingRef);
      });
    });
  });
});
