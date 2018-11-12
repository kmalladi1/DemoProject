'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: add-reference-grouping', function() {

  // Variables
  var date = new Date();
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();

  date = mm.toString() + dd.toString() + yyyy.toString();

  describe('Test Step ID: 418216', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:/Pa3/Columns/New_Reference_Testing" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('new-reference-testing');
    });

    it('Should Select "Reference Grouping Test" from LHP', function() {
      PA3MainPage.getReports('Reference Grouping Test').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if the Reference Grouping Test is selected from LHP
      expect(PA3MainPage.getReports('Reference Grouping Test').getAttribute('class')).toContain('selected');
    });

    it('Should wait for "Reference Grouping Test" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Reference Grouping Test" report appeared', function() {
      PA3MainPage.isReportCalculated('Reference Grouping Test', true).then(function(displayed) {
        expect(displayed).customError('"Reference Grouping Test" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Reference Grouping Test')).toBeTruthy();
        } else {
          expect(false).customError(error);
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

  describe('Test Step ID: 418217', function() {

    it('Should click on "Economic Sector" hyperlink in the report', function() {
      // Verifying if the grouping link name is "Economic Sector"
      expect(PA3MainPage.getGroupingsHyperLink('Reference Grouping Test').getText()).toEqual('Economic Sector');

      // Should click on "Economic Sector" hyperlink in the report
      PA3MainPage.getGroupingsHyperLink('Reference Grouping Test').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Tile Options" mode appeared', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (!option) {
          expect(false).customError('"Tile Options" mode is not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on Groupings LHP item to select', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Groupings' option is selected.
      expect(TileOptions.getOptionTitle().getText()).toEqual('Groupings');
    });

    it('Should click on "+" button and select "New/Reference" from the drop down menu', function() {
      TileOptionsGroupings.getNewButton().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Selecting "New/Reference" option from the drop down.
      TileOptionsGroupings.getNewDropDownItem('New/Reference').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that dialog view is changed to "New/Reference" mode', function() {
      element(by.xpath(CreateEditCustomGroupings.xpathNewReference)).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"New/Reference" dialog is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 418218', function() {

    it('Should select the "Reference" radio button', function() {
      ThiefHelpers.getRadioClassReference('Reference', undefined).select();

      // Verifying that "Reference" radio button is selected
      ThiefHelpers.getRadioClassReference('Reference', undefined).isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Reference" radio button is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Formula" tab from the "New/Reference" window', function() {
      CreateEditCustomGroupings.getTab('Formula').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Formula" tab is selected
      Utilities.isElementSelected(CreateEditCustomGroupings.getTab('Formula')).then(function(selected) {
        if (!selected) {
          expect(false).customError('"Formula" tab is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should  click on "Col 5: Bench. Ending Weight" under "Formula" Tab', function() {
      ThiefHelpers.getVirtualListboxClassReference().getItemByText('Col 5: Bench. Ending Weight').select();
    });

    it('Click "Add" button to add "Col 5: Bench. Ending Weight" to text area', function() {
      ThiefHelpers.getButtonClassReference('Add', undefined).press();
    });

    it('Verifying that "COL5" is added to the "Formula" field', function() {
      CreateEditCustomGroupings.getTabTextArea().getText().then(function(text) {
        if (text !== 'COL5') {
          expect(false).customError('"COL5" is not added to the "Formula" field but Found: "' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 418219', function() {

    it('Should enter "Ref Grouping ' + date + '" into the "Name" field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Ref Grouping ' + date);

      // Verifying that "Ref Grouping MMDDYYYY (todays date)" is entered into the Field
      ThiefHelpers.getTextBoxClassReference('Name').getText('Ref Grouping ' + date).then(function(text) {
        if (text !== 'Ref Grouping ' + date) {
          expect(false).customError('Ref Grouping ' + date + ' is not entered into the "Name" field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save" button to save the settings', function() {
      CreateEditCustomGroupings.getButton('Save').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomGroupings.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "New/Reference" mode is no more displayed', function() {
      expect(element(by.xpath(CreateEditCustomGroupings.xpathNewReference)).isPresent()).toBeFalsy();
    });

    it('Verifying if the "Ref Grouping ' + date + '" is added in selected section', function() {
      expect(TileOptionsGroupings.getElementFromSelectedContainer('Ref Grouping ' + date).isPresent()).toBeTruthy();
    });
  });

  describe('Test Step ID: 418220', function() {

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
          expect(false).customError('"Tile Options" mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Reference Grouping Test" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Reference Grouping Test" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Reference Grouping Test', true).then(function(displayed) {
        expect(displayed).customError('"Reference Grouping Test" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Reference Grouping Test')).toBeTruthy();
        } else {
          expect(false).customError(error);
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

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Should expand "Commercial Services > Advertising/Marketing Services" from the calculated report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Reference Grouping Test', 'Commercial Services|Advertising/Marketing Services');

      // Verifying if "Commercial Services > Advertising/Marketing Services" tree is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Reference Grouping Test', 'Commercial Services|Advertising/Marketing Services');
    });

    it('Verifying that third level in the calculated tree is displaying the values', function() {
      expect(PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Reference Grouping Test', 3)).not.toBeNull();

      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Reference Grouping Test', 3).then(function(references) {
        references.forEach(function(element) {
          element.getText().then(function(value) {
            expect(isNaN(value)).toBeFalsy();
          });
        });
      });
    });
  });

  describe('Test Step ID: 418221', function() {

    it('Should Select "New Grouping Test" from LHP', function() {
      PA3MainPage.getReports('New Grouping Test').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if the "New Grouping Test" is selected from LHP
      expect(PA3MainPage.getReports('New Grouping Test').getAttribute('class')).toContain('selected');
    });

    it('Should wait for "New Grouping Test" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "New Grouping Test" report appeared', function() {
      PA3MainPage.isReportCalculated('New Grouping Test', true).then(function(displayed) {
        expect(displayed).customError('"New Grouping Test" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('New Grouping Test')).toBeTruthy();
        } else {
          expect(false).customError(error);
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

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Should click on "Economic Sector" hyperlink in the report', function() {
      // Verifying if the grouping link name is "Economic Sector"
      expect(PA3MainPage.getGroupingsHyperLink('New Grouping Test').getText()).toEqual('Economic Sector');

      // Should click on "Economic Sector" hyperlink in the report
      PA3MainPage.getGroupingsHyperLink('New Grouping Test').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Tile Options" mode appeared', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (!option) {
          expect(false).customError('"Tile Options" mode is not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Document" from "Available" section', function() {
      TileOptionsGroupings.expandElementTree('Document');

      // Verifying that "Document" is expanded
      TileOptionsGroupings.checkIfExpanded('Document');
    });

    it('Verifying that there are no grouping', function() {
      TileOptionsGroupings.getAllElementsFromGroup('Document').then(function(references) {
        expect(references.length).toBe(0);
      });
    });
  });

  describe('Test Step ID: 418222', function() {

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
  });
});
