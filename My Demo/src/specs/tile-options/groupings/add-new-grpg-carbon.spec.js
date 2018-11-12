'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: add-new-grpg-carbon', function() {

  // variables
  var d = new Date();
  var currentDate = d.getMonth() + 1 + '' + d.getDate() + '' + d.getFullYear();
  var testGroupNameWithDate = 'Test Group' + ' ' + currentDate;

  describe('Test Step ID: 554928', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:;PA3;Columns;New_Reference_Testing" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('new-reference-testing');
    });

    it('Wait for "New Column Test" report to finish calculation', function() {
      //Waiting for "New Column Test" report to finish calculation
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('New Column Test'), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating the "New Column Test" report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "New Column Test" report is calculated', function() {
      // Verifying "New Column Test" Report is calculated
      PA3MainPage.isReportCalculated('New Column Test').then(function(value) {
        if (!value) {
          expect(false).customError('Calculated data for "New Column Test" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('New Column Test')).toBeTruthy();
        } else {
          expect(false).customError('Error other than "StaleElementReferenceError" appeared');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "New Column Test" report selected in LHP ', function() {
      //Verifying New Column Test report selected in LHP
      ThiefHelpers.getNavepaneItemReference('Reports', 'Column Testing', 'New Column Test').then(function(ele) {
        ele.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') === -1) {
            expect(false).customError('"New Column Test" report is not selected in LHP');
          }
        });
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 554927', function() {

    it('Should click on the "Wrench" button on the application toolbar', function() {
      //Clicking the wrench button in application tool bar
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function() {

        expect(false).customError('Not able to click on "Wrench" button in the application toolbar');
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down menu appear.
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('Wrench icon dropdown is not present.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover over "Format Options > Theme " option from wrench menu and select "Carbon"', function() {
      // Selecting carbon
      PA3MainPage.getOptionFromWrenchMenu('Format Options|Theme|Carbon').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying report theme has changed "carbon"', function() {
      //Verifying report theme as "carbon
      element(by.xpath(PA3MainPage.xpathApp)).getAttribute('class').then(function(value) {
        if (value.indexOf('carbon') === -1) {
          expect(false).customError('Report theme is not carbon');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "New Grouping Test" in LHP - Reports ', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Groupings Test', 'New Grouping Test').then(function(ele) {
        ele.click();
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying "New Grouping Test" report selected in LHP ', function() {
      //Verifying New Column Test report selected in LHP
      ThiefHelpers.getNavepaneItemReference('Reports', 'Groupings Test', 'New Grouping Test').then(function(ele) {
        ele.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') === -1) {
            expect(false).customError('"New Grouping Test" report not selected in LHP');
          }
        });
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "New Grouping Test" report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('New Grouping Test'), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating "New Grouping Test" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "New Grouping Test" report is calculated', function() {
      // Verifying "New Grouping Test" Report is calculated
      PA3MainPage.isReportCalculated('New Grouping Test').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "New Grouping Test" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('New Grouping Test')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 554929', function() {

    it('Should click on "New Grouping Test" in LHP - Reports Under Grouping Test Section ', function() {
      //Click on "Attribution" in LHP - Reports.
      ThiefHelpers.getNavepaneItemReference('Reports', 'Groupings Test', 'New Grouping Test').then(function(ele) {
        ele.click();
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying "New Grouping Test" report selected in LHP ', function() {
      //Verifying New Column Test report selected in LHP
      ThiefHelpers.getNavepaneItemReference('Reports', 'Groupings Test', 'New Grouping Test').then(function(ele) {
        ele.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') === -1) {
            expect(false).customError('"New Grouping Test" report is not selected in LHP');
          }
        });
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on the Wrench icon in the "New Grouping Test" report workspace', function() {
      // clicking wrench icon in "New Grouping Test" report workspace
      PA3MainPage.getWrenchIconFromReportWorkspace('New Grouping Test').click().then(function() {
      }, function() {

        expect(false).customError('Not able to  click on the "Wrench icon" in the "New Grouping Test" report workspace');
        CommonFunctions.takeScreenShot();
      });

      //Verifying wrench menu list is displayed in "New Grouping Test" report workspace'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Wrench menu drop down list is not displayed in ' + '"New Grouping Test" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from menu drop down of "New Grouping Test" report workspace ', function() {
      //Clicking "Options" from menu drop down of "New Grouping Test" report workspace
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function() {

        expect(false).customError(' Not able to select "Options" option from "menu dropdown" of ' + '"New Grouping Test" report workspace');
        CommonFunctions.takeScreenShot();
      });

      //verifying tile options mode is opened
      TileOptions.isTileOptionsMode().then(function(value) {
        if (!value) {
          expect(false).customError('Tile Options mode is Closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the " Groupings " tab on the LHP on tile options', function() {
      //Clicking Groupings tab from LHP
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to " Groupings " Mode
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Groupings') {
          expect(false).customError('" Groupings " tab is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on Click on the " + " icon in Available transfer box', function() {
      // clicking on the " + " icon in Available transfer box
      ThiefHelpers.getTransferBoxReference().source.items().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying menu list of " + " icon Opened'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError(' menu list of " + " icon is not displayed .');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "New/Reference" option from menu list of " + " icon ', function() {
      //Clicking "New/Reference" option from menu list of " + " icon
      ThiefHelpers.getMenuClassReference().selectItemByText('New/Reference').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying whether Create/Edit Custom Grouping dialog opens.', function() {
      ThiefHelpers.isDialogOpen('Groupings', undefined, undefined).then(function(bool) {
        if (!bool) {
          expect(false).customError('Create/Edit Custom Grouping dialog does not opens');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 554930', function() {

    it('Should select the "New" radio button', function() {
      ThiefHelpers.getRadioClassReference('New').isSelected().then(function(selected) {
        if (!selected) {
          ThiefHelpers.getRadioClassReference('New').select();

          // Verifying if 'New' Radio button is selected
          ThiefHelpers.getRadioClassReference('New').isSelected().then(function(selected) {
            if (!selected) {
              expect(false).customError('New Radio button is not selected');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });
    });

    it('Should select "Formula" tab from the "New/Reference" window', function() {
      CreateEditCustomColumns.getTab('Formula').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Formula" tab is selected
      Utilities.isElementSelected(CreateEditCustomColumns.getTab('Formula')).then(function(selected) {
        if (!selected) {
          expect(false).customError('The "Formula" tab is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'P_PRICE', undefined, undefined, 'clickOutside', undefined);
  });

  describe('Test Step ID: 554936', function() {

    it('Should click "Allow Fractiling" check box', function() {
      // Checking "Allow Fractiling" check box
      ThiefHelpers.getCheckBoxClassReference('Allow Fractiling').check();

      //Verifying the checkbox is checked
      expect(ThiefHelpers.getCheckBoxClassReference('Allow Fractiling').isChecked()).toBeTruthy();
    });

    it('Should select " Client/QA Test Groupings " from Sub-directory: menu drop down ', function() {
      //Clicking "Client/QA Test Groupings " from Sub-directory: menu drop down
      ThiefHelpers.selectOptionFromDropDown('Client/QA Test Groupings', 'Sub-directory:');

      //Verifying "Client/QA Test Groupings " from Sub-directory: menu drop down
      ThiefHelpers.verifySelectedDropDownText('Client/QA Test Groupings', 'Sub-directory:');
    });

    it('Should Type Test Group MMDDYYYY ( todays date ) in the Name field', function() {
      // Type "Test Group MMDDYYYY" into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name:').setText(testGroupNameWithDate);

      // Verifying that "Test Group MMDDYYYY" is typed into the "Name" field
      expect(ThiefHelpers.getTextBoxClassReference('Name:').getText()).toEqual(testGroupNameWithDate);
    });

    it('Should click "save" button', function() {
      // Click on Save button
      CreateEditCustomGroupings.getButton('Save').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that a Creating custom grouping popup appears', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomGroupings.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "Create/Edit Custom Grouping" mode is no more displayed', function() {

      //Verifying Dialog "Create/Edit Custom Grouping"
      CreateEditCustomColumns.isDialogPresent().then(function(present) {
        if (present) {
          expect(false).customError('"Create/Edit Custom Grouping" mode is still displaying');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 554931', function() {

    it('Should expand "Client > QA Test Groupings" in available section', function() {
      //Expanding "Client > QA Test Groupings" in available section
      TileOptionsGroupings.expandElementTree('Client|QA Test Groupings');

      //Verifying Expanding of "Client > QA Test Groupings" in available section
      TileOptionsGroupings.checkIfExpanded('Client|QA Test Groupings').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('"Client > QA Test Groupings" is not expanded from "Available" container.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Test Grouping with date" to add it to "Selected" section', function() {
      //Verifying whether "Test Grouping with date" element was present
      TileOptionsGroupings.getElementFromAvailableSection('Client|QA Test Groupings', testGroupNameWithDate).isPresent().then(function(option) {
        if (option) {
          // Clicking on "Test Grouping with date" to add it to "Selected" section
          browser.actions().click(TileOptionsGroupings.getElementFromAvailableSection('Client|QA Test Groupings', testGroupNameWithDate)).perform();
        } else {
          expect(false).customError('"Test Grouping with date" was not added it to "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "right" arrow button', function() {
      // Clicking on Right arrow  to add "Test Grouping with date" to "Selected" section
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying the Test group MMDDYYYY ( todays date )" is highlighted in selected section', function() {
      // Checking index of Highlighted element
      TileOptionsGroupings.getElementFromSelectedContainer(testGroupNameWithDate).getAttribute('class').then(function(value) {
        browser.sleep(6000);
        if (value.indexOf('selected') === -1) {
          expect(false).customError('"Test group MMDDYYYY ( todays date )" is highlighted in selected section');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying Definition accordian was displayed', function() {
      // Checking Expandable Section "DEFINITION" presence
      TileOptionsGroupings.getExpandableSection('DEFINITION').isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('Wrench icon dropdown is not present.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Decile" selected in Fractiles dropdown', function() {
      // Verifying "Fractiles ( Decile selected in dropdown )" is selected
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsGroupings.getDropDownFromDefinitionSection('Fractiles')).getSelectedText().then(function(selectedElement) {
        console.log(selectedElement);
        if (selectedElement !== 'Decile') {
          expect(false).customError('"Decile" is not displayed in the "Fractiles" drop down, found ' + selectedElement);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Benchmark" selected in "Bins Based on" dropdown', function() {
      // Verifying "Bins Based on ( Benchmark selected in dropdown )" is selected
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsGroupings.getDropDownFromDefinitionSection('Bins Based On')).getSelectedText().then(function(selectedElement) {
        if (selectedElement !== 'Benchmark') {
          expect(false).customError('"Benchmark" is not displayed in the "Bins Based On" drop down, found ' + selectedElement);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "No. Securities" selected in "Bins Use Equal" dropdown', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsGroupings.getDropDownFromDefinitionSection('Bins Use Equal')).getSelectedText().then(function(selectedElement) {
        if (selectedElement !== 'No. Securities') {
          expect(false).customError('"No. Securities" is not displayed in the "Bins Use Equal" drop down, found ' + selectedElement);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 554933', function() {

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      // Clicking ok button in tile options
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      //verifying tile options mode ic closed
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should Wait for "New Grouping Test" report to finish calculation', function() {
      //Waiting for "New Grouping Test" report to finish calculation
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('New Grouping Test'), 180000).then(function(value) {
        if (!value) {
          expect(false).customError('Error while calculating the "New Grouping Test" report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "New Grouping Test" report is calculated', function() {
      // Verifying "New Grouping Test" Report is calculated
      PA3MainPage.isReportCalculated('New Grouping Test').then(function(value) {
        if (!value) {
          expect(false).customError('Calculated data for "New Grouping Test" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('New Grouping Test')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

      browser.sleep(6000);
    });

    it('Should expand Commercial Services > Advertising/Marketing Services', function() {
      // Expand Commercial Services|Advertising/Marketing Services in calculated report
      PA3MainPage.expandTreeInCalculatedReport('New Grouping Test', 'Commercial Services|Advertising/Marketing Services');

      // Verifying if Commercial Services|Advertising/Marketing Services was expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('New Grouping Test', 'Commercial Services|Advertising/Marketing Services');
    });

    it('Verifying if there is third level of grouping labeled as "Test group Decile"', function() {
      //Verifying if third level grouping is empty or not
      expect(PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('New Grouping Test', 3)).not.toBeNull();

      // Verifying third level of grouping labeled as "Test group Decile"
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('New Grouping Test', 3).then(function(references) {
        references.forEach(function(element) {
          element.getText().then(function(value) {
            expect(value).toContain(testGroupNameWithDate + ' Decile');
          });
        });
      });
    });
  });

  describe('Test Step ID: 554934', function() {

    it('Should click on "New Grouping Test" in LHP - Reports ', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Groupings Test', 'Reference Grouping Test').then(function(ele) {
        ele.click();
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying "New Grouping Test" report selected in LHP ', function() {
      //Verifying New Column Test report selected in LHP
      ThiefHelpers.getNavepaneItemReference('Reports', 'Groupings Test', 'Reference Grouping Test').then(function(ele) {
        ele.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') === -1) {
            expect(false).customError('"Reference Grouping Test" report not selected in LHP');
          }
        });
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should Wait for "Reference Grouping Test" report to finish calculation', function() {
      //Waiting for "New Grouping Test" report to finish calculation
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Reference Grouping Test'), 180000).then(function(value) {
        if (!value) {
          expect(false).customError('Error while calculating the "New Grouping Test" report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Reference Grouping Test" report is calculated', function() {
      // Verifying "Reference Grouping Test" Report is calculated
      PA3MainPage.isReportCalculated('Reference Grouping Test').then(function(value) {
        if (!value) {
          expect(false).customError('Calculated data for "Reference Grouping Test" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Reference Grouping Test')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

      browser.sleep(6000);
    });

    it('Should click on the "Economic Sector" on the Reference Grouping Test report workspace', function() {
      // Clicking Economic Sector hyper link in weights report
      PA3MainPage.getGroupingsHyperLink('Reference Grouping Test').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is opened', function() {
      //verifying tile options mode ic closed
      TileOptions.isTileOptionsMode().then(function(option) {
        if (!option) {
          expect(false).customError('"Tile Options" mode is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Client > QA Test Groupings"', function() {
      TileOptionsGroupings.expandElementTree('Client|QA Test Groupings');

      // Verifying expand "Client > QA Test Groupings" from "Available" container'
      TileOptionsGroupings.checkIfExpanded('QA Test Groupings').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('"Client > QA Test Groupings" is not expanded from "Available" container.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Test Grouping with date" to add it to "Selected" section', function() {
      TileOptionsGroupings.getElementFromAvailableSection('Client|QA Test Groupings', testGroupNameWithDate).isPresent().then(function(option) {
        if (option) {
          browser.actions().click(TileOptionsGroupings.getElementFromAvailableSection('Client|QA Test Groupings', testGroupNameWithDate)).perform();
        } else {
          expect(false).customError('"Test Grouping with date" was not added it to "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "right" arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying the Test group MMDDYYYY ( todays date )" is highlighted in selected section', function() {
      // Checking index of Highlighted element
      TileOptionsGroupings.getElementFromSelectedContainer(testGroupNameWithDate).getAttribute('class').then(function(value) {
        browser.sleep(6000);
        if (value.indexOf('selected') === -1) {
          expect(false).customError('"Test group MMDDYYYY ( todays date )" is highlighted in selected section');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 554935', function() {

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      // Clicking ok button in tile options
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      //verifying tile options mode ic closed
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should Wait for "Reference Grouping Test" report to finish calculation', function() {
      //Waiting for "New Grouping Test" report to finish calculation
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Reference Grouping Test'), 180000).then(function(value) {
        if (!value) {
          expect(false).customError('Error while calculating the "New Grouping Test" report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Reference Grouping Test" report is calculated', function() {
      // Verifying "Reference Grouping Test" Report is calculated
      PA3MainPage.isReportCalculated('Reference Grouping Test').then(function(value) {
        if (!value) {
          expect(false).customError('Calculated data for "Reference Grouping Test" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Reference Grouping Test')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

      browser.sleep(6000);
    });

    it('Verifying if expand Commercial Services > Advertising/Marketing Services', function() {
      //Expanding "Commercial Services > Advertising/Marketing Services"
      PA3MainPage.expandTreeInCalculatedReport('Reference Grouping Test', 'Commercial Services|Advertising/Marketing Services');

      //Verifying if  "Commercial Services > Advertising/Marketing Services" was expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Reference Grouping Test', 'Commercial Services|Advertising/Marketing Services');
    });

    it('Verifying if there is third level of grouping labeled as "Test group Decile"', function() {
      // Verifying if third level grouping is empty or not
      expect(PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Reference Grouping Test', 3)).not.toBeNull();

      // Verifying third level of grouping labeled as "Test group Decile"
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Reference Grouping Test', 3).then(function(references) {
        references.forEach(function(element) {
          element.getText().then(function(value) {
            expect(value).toContain(testGroupNameWithDate + ' Decile');
          });
        });
      });
    });
  });

  describe('Test Step ID: 591920', function() {

    it('Should click on the "Economic Sector" hyper link on the Reference Grouping Test report workspace', function() {
      // Clicking Economic Sector hyper link on the Reference Grouping Test report workspace
      PA3MainPage.getGroupingsHyperLink('Reference Grouping Test').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should expand "Client > QA Test Groupings"', function() {
      // Expand "Client > QA Test Groupings" from "Available" container'
      TileOptionsGroupings.expandElementTree('Client|QA Test Groupings');

      // Verifying expand "Client > QA Test Groupings" from "Available" container'
      TileOptionsGroupings.checkIfExpanded('QA Test Groupings').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('"Client > QA Test Groupings" is not expanded from "Available" container.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should perform mouse hover on "Test Group MMDDYYYY" and click x icon', function() {
      // Performing mouse hover on "Test Group MMDDYYYY"
      var eleReference = TileOptionsGroupings.getElementFromAvailableSection('Client|QA Test Groupings', testGroupNameWithDate);
      browser.actions().mouseMove(eleReference).perform();

      // Get the reference of delete icon
      TileOptionsGroupings.getRemoveIconForGroupingsInAvailableSection('Client|QA Test Groupings', testGroupNameWithDate).click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if  dialog box with Delete Grouping appeared
      ThiefHelpers.isDialogOpen('Delete Grouping').then(function(option) {
        // Verifying if any error dialog box appeared
        if (!option) {
          expect(false).customError('"Delete Grouping" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" on Dialog box "Delete Grouping" ', function() {
      // Clicking ok button on Dialog box "Delete Grouping"
      ThiefHelpers.getDialogButton('Delete Grouping', 'OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      // Clicking ok button in tile options
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      //verifying tile options mode ic closed
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should Wait for "Reference Grouping Test" report to finish calculation', function() {
      //Waiting for "New Grouping Test" report to finish calculation
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Reference Grouping Test'), 180000).then(function(value) {
        if (!value) {
          expect(false).customError('Error while calculating the "New Grouping Test" report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Reference Grouping Test" report is calculated', function() {
      // Verifying "Reference Grouping Test" Report is calculated
      PA3MainPage.isReportCalculated('Reference Grouping Test').then(function(value) {
        if (!value) {
          expect(false).customError('Calculated data for "New Grouping Test" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Reference Grouping Test')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

      browser.sleep(6000);
    });

    it('Verifying if "Commercial Services > Advertising/Marketing Services" does not have any groupings ', function() {
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Reference Grouping Test', 3).then(function(references) {
        references.forEach(function(element) {
          element.getText().then(function(value) {
            expect(value).not.toContain(testGroupNameWithDate + ' Decile');
          });
        });
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });
  });
});
