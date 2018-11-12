'use strict';

// Requiring PA3 page object files

require(__dirname + '/../../index.js');

// Requiring STU page object files
require(__dirname + '/../../PageObjects/STU/all-page-objects.po.js');

describe('Test Case: bvt-tc', function() {

  describe('Test Step ID: 675504', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:/default_doc_auto" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });

    it('Should wait for "Weights" report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Weights'), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating the "Weights" report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(value) {
        if (!value) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 675505', function() {

    it('Should click on the Wrench icon in the "Weights" report workspace', function() {
      // Clicking wrench icon in "Weights" report workspace
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying wrench menu list is displayed in "Weights" report workspace
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Wrench menu drop down list is not displayed in ' + '"Weights" report workspace.');
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
          expect(false).customError('"Tile Options - Weights" view has not appeared. ' + 'Expected: "Tile Options - Weights" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Dates" is selected in the LHP', function() {
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Dates') {
          expect(false).customError(' "Dates" was not the title of tile options ');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "1/03/2017" in the "End Date" field', function() {
      ThiefHelpers.getTextBoxClassReference('End Date:').setText('1/03/2017');

      // Verifying "1/03/2017"  is entered in End Date text box
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(value) {
        if (value !== '1/03/2017') {
          expect(false).customError('End Date text box did not contain "1/03/2017". Found:"' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from Tile Option Page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button from Tile Options page');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Weights" report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Weights'), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating the "Weights" report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(value) {
        if (!value) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if date hyperlink is set to "1/03/2017"', function() {
      PA3MainPage.getDateHyperLink('Weights').getText().then(function(dateHyperLink) {
        if (dateHyperLink !== '1/03/2017') {
          expect(false).customError('Date hyperlink is not diplaying"1/03/2017"; Found: ' + dateHyperLink);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step:675506', function() {

    it('Should click on wrench icon in the application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(error) {

        expect(false).customError('Error occurred while clicking on wrench icon:' + error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Document Options" from wrench menu', function() {
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click().then(function() {
      }, function(error) {

        expect(false).customError('Error occurred while clicking on Document Options from the displayed ' + 'drop down:' + error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify if view is changed to "Document Options" mode', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Document Options" mode is not appeared');
        }
      });
    });

    it('Should click on the "Date Options" in "Dates tab" from LHP', function() {
      DocumentOptions.getLHPOption('Date Options').click();

      // Verifying if Date Options is selected
      DocumentOptions.getLHPOption('Date Options').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') === -1) {
          expect(false).customError('"Date Options" is not selected in "Date tab"');
        }
      });
    });

    it('Should select on "DD/MM/YYYY" option from "Date Format:" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('DD/MM/YYYY', 'Date Format:');
    });

    it('Verifying "DD/MM/YYYY" option is selected from "Date Format:" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('DD/MM/YYYY', 'Date Format:');
    });

    it('Should click on the "Date Lagging" in "Dates" tab from LHP', function() {
      DocumentOptions.getLHPOption('Date Lagging').click();

      // Verifying if Date Lagging is selected
      DocumentOptions.getLHPOption('Date Lagging').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') === -1) {
          expect(false).customError('"Date Lagging" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should uncheck the checkbox "Port. Prices/Shares"', function() {
      ThiefHelpers.getCheckBoxClassReference('Port. Prices/Shares').uncheck();
    });

    it('Should click on "OK" button of "Document Options" mode header', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying "Document Options" page is closed', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(value) {
        if (value) {
          expect(false).customError('Document Options mode is not Closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(calculated) {
        if (!calculated) {
          expect(false).customError('Calculated data for "Weights" report is not displayed');
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

      // Verifying if there was any "Calculation Error"
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that Date hyperlink is set to "03/01/2017"', function() {
      PA3MainPage.getDateHyperLink('Weights').getText().then(function(value) {
        if (value !== '03/01/2017') {
          expect(false).customError('Dates hyperlink did not set to "03/01/2017". Found:"' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 675507', function() {

    it('Should click on the Wrench icon in the "Weights" report workspace', function() {
      // Clicking wrench icon in "Weights" report workspace
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying wrench menu list is displayed in "Weights" report workspace
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Wrench menu drop down list is not displayed in ' + '"Weights" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from menu drop down of "Weights" report workspace ', function() {
      // Clicking "Options" from menu drop down of "Weights" report workspace
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function() {

        expect(false).customError(' Not able to select "Options" option from "drop down" of "Weights" ' + 'report workspace');
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
          expect(false).customError('"Tile Options - Weights" view has not appeared. ' + 'Expected: "Tile Options - Weights" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Groupings" tab from the LHP', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Groupings" tab from LHP');
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Groupings" tab is selected in LHP
      TileOptions.getLHPOption('Groupings').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Groupings" tab did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Clear All" button from Selected section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsGroupings.xpathRemoveAll).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Clear All" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "OK" button from Tile Option Page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button from Tile Options page');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Weights" report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Weights'), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating the "Weights" report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(value) {
        if (!value) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Weights" report is calculated with "Security Name" hyperlink', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(hyperlink) {
        if (hyperlink !== 'Security Name') {
          expect(false).customError('"Security Name" is not displayed as hyperlink. Found: "' + hyperlink + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 675508 ', function() {

    it('Should click on the Wrench icon in the "Weights" report workspace', function() {
      // Clicking wrench icon in "Weights" report workspace
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying wrench menu list is displayed in "Weights" report workspace
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Wrench menu drop down list is not displayed in ' + '"Weights" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from drop down', function() {
      // Clicking "Options" from menu drop down of "Weights" report workspace
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
          expect(false).customError('"Tile Options - Weights" view has not appeared. ' + 'Expected: "Tile Options - Weights" but Found: "' + value + '"');
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

    it('Hover over "Port. Ending Weight" in "Selected" section and click on the "Remove" icon', function() {
      // Getting the xpath of the Selected section
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Port. Ending Weight');

      item.getActions().then(function(actions) {
        actions.triggerAction('remove');
      });
    });

    var arrElements = [];
    it('Verifying if "Port. Ending Weight" is removed from "Selected" section', function() {
      // Get number of elements in 'Selected' list
      // Getting the xpath of the Selected section
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText().then(function(noOfElements) {
        // Check if 'Lot ID' is removed from 'Selected' list
        noOfElements.forEach(function(listItem) {
          arrElements.push(listItem.text);
        });
        if (arrElements.indexOf('Port. Ending Weight') > -1) {
          expect(false).customError('"Port. Ending Weight" is still present in the "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 675509 ', function() {

    it('Should select "Exclusions" tab from the LHP', function() {
      TileOptions.getLHPOption('Exclusions').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Exclusions" tab from LHP');
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Exclusions" tab is selected in LHP
      TileOptions.getLHPOption('Exclusions').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Exclusions" tab did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click on "3M Company" option from Available section', function() {
      // Getting the xpath of the Available section
      var xpathOfExcluAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Available');

      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfExcluAvailableSection).getItemByText('3M Company');
      group.select();
      group.doubleClick();
    });

    it('Verifying if the element "3M Company" is moved to "Selected" section', function() {
      var arrEle = [];

      // Getting the xpath of the Available section
      var xpathOfExcluSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Selected');
      ThiefHelpers.getVirtualListboxClassReference(xpathOfExcluSelectedSection).getGroupByText('').getChildrenText().then(function(elements) {
        elements.forEach(function(ele) {
          arrEle.push(ele.text);
        });
      }).then(function() {
        if (arrEle.indexOf('3M Company') < 0) {
          expect(false).customError('"3M Company" is not added to "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Hidden" tab from the LHP', function() {
      TileOptions.getLHPOption('Hidden').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Hidden" tab from LHP');
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Hidden" tab is selected in LHP
      TileOptions.getLHPOption('Hidden').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Hidden" tab did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "Adi" into search field in "Available" section', function() {
      // Enter "Adi" into search field
      TileOptionsHidden.getSearchField('Available').sendKeys('Adi');

      // Verifying the text in search field
      TileOptionsHidden.getSearchField('Available').getAttribute('value').then(function(value) {
        if (value !== 'Adi') {
          expect(false).customError('"Adi" is not entered into search field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click on "Adient plc" option from Available section', function() {
      // Getting the xpath of the Available section
      var xpathOfHiddenAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsHidden.xpathOfSelectedOrAvailableSection, 'Available');

      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfHiddenAvailableSection).getItemByText('Adient plc');
      group.select();
      group.doubleClick();
    });

    it('Verifying if the element "Adient plc" is moved to "Selected" section', function() {
      var arrEle = [];

      // Getting the xpath of the Available section
      var xpathOfHiddenSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsHidden.xpathOfSelectedOrAvailableSection, 'Selected');
      ThiefHelpers.getVirtualListboxClassReference(xpathOfHiddenSelectedSection).getGroupByText('').getChildrenText().then(function(elements) {
        elements.forEach(function(ele) {
          arrEle.push(ele.text);
        });
      }).then(function() {
        if (arrEle.indexOf('Adient plc') < 0) {
          expect(false).customError('"Adient plc" is not added to "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
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

    it('Should wait for "Weights" report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Weights'), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating the "Weights" report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(value) {
        if (!value) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Port. Weight" column is not added to the "Weights" report', function() {
      SlickGridFunctions.getColumnNames('Weights').then(function(option) {
        if (option.indexOf('Port. Weight') > -1) {
          expect(false).customError('"Port. Weight" column is added to the Weights report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrRowNames = ['3M Company', 'Adient plc'];
    it('Verifying if "3M Company" and  "Adient plc" are not present in the report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '', '').then(function(rowNames) {
        arrRowNames.forEach(function(rowName) {
          if (rowNames.indexOf(rowName) > -1) {
            expect(false).customError('"' + rowName + '" row is present in the report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 675510 ', function() {

    it('Should select "Pre & Post Trade" report from LHP', function() {
      PA3MainPage.getReports('Pre & Post Trade').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Check if report - 'Pre & Post Trade' is selected
      PA3MainPage.getReports('Pre & Post Trade').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Pre & Post Trade" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Pre & Post Trade" report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Pre & Post Trade'), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating the "Pre & Post Trade" report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Pre & Post Trade" report is calculated', function() {
      PA3MainPage.isReportCalculated('Pre & Post Trade').then(function(value) {
        if (!value) {
          expect(false).customError('Calculated data for "Pre & Post Trade" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Pre & Post Trade')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the Wrench icon in the " Pre & Post Trade " report workspace', function() {
      // Clicking wrench icon in "Pre & Post Trade" report workspace
      PA3MainPage.getWrenchIconFromReportWorkspace('Pre & Post Trade').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying wrench menu list is displayed in "Pre & Post Trade" report workspace
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Wrench menu drop down list is not displayed in ' + '"Pre & Post Trade" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from menu drop down of " Pre & Post Trade " report workspace ', function() {
      // Clicking "Options" from menu drop down of "Pre & Post Trade" report workspace
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function() {

        expect(false).customError(' Not able to select "Options" option from "drop down" of "Pre & Post Trade" ' + 'report workspace');
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

    it('Verifying if view changed to "Tile Options - Pre & Post Trade" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Pre & Post Trade') {
          expect(false).customError('"Tile Options - Pre & Post Trade" view has not appeared. ' + 'Expected: "Tile Options - Pre & Post Trade" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Scenarios and Cash Flows" option from LHP', function() {
      TileOptions.getLHPOption('Scenarios and Cash Flows').isPresent().then(function(found) {
        if (found) {
          TileOptions.getLHPOption('Scenarios and Cash Flows').click().then(function() {
          }, function(error) {

            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
        } else {
          expect(false).customError('"Scenarios and Cash Flows" is not present in the "LHP"');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying that view displayed is "Scenarios and Cash Flows"
      TileOptions.getOptionTitle().getText().then(function(text) {
        expect(text.indexOf('Scenarios and Cash Flows') >= 0).customError('"Scenarios and Cash Flows" option is not selected');
      });
    });

    it('Select "Last Cash Flow" radio button', function() {
      ThiefHelpers.getRadioClassReference('Last Cash Flow').select();

      // Verfying if "Last Cash Flow" radio button is selected
      ThiefHelpers.getRadioClassReference('Last Cash Flow').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Last Cash Flow" radio button is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Universe" tab from the LHP', function() {
      TileOptions.getLHPOption('Universe').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Universe" tab from LHP');
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Universe" tab is selected in LHP
      TileOptions.getLHPOption('Universe').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Universe" tab did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });

      // Waiting for elements to load
      browser.sleep(3000);
    });

    it('Select "Adjustment" radio button', function() {
      var xpath = TileOptionsUniverse.getRadioButton('Adjustment');
      ThiefHelpers.getRadioClassReference(undefined, xpath).select();
    });

    it('Should double click on "Leverage Adjust"', function() {
      browser.actions().doubleClick(TileOptionsUniverse.getElement('Leverage Adjust', 'Available')).perform();
    });

    it('Verifying if  "Leverage Adjust" is added to the selected section', function() {
      TileOptionsUniverse.getElement('Leverage Adjust', 'Selected').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Leverage Adjust" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from Tile Option Page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button from Tile Options page');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Pre & Post Trade" report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Pre & Post Trade'), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating the "Pre & Post Trade" report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Pre & Post Trade" report is calculated', function() {
      PA3MainPage.isReportCalculated('Pre & Post Trade').then(function(value) {
        if (!value) {
          expect(false).customError('Calculated data for "Pre & Post Trade" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Pre & Post Trade')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 675511', function() {

    it('Should select "Performance" report from LHP', function() {
      PA3MainPage.getReports('Performance').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Check if report - 'Performance' is selected
      PA3MainPage.getReports('Performance').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Performance" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Performance" report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Performance'), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating the "Performance" report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Performance" report is calculated', function() {
      PA3MainPage.isReportCalculated('Performance').then(function(value) {
        if (!value) {
          expect(false).customError('Calculated data for "Performance" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Performance')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Wrench" icon in the "Performance" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Performance').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from report workspace.');
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

    it('Verifying if view changed to "Tile Options - Performance" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Performance') {
          expect(false).customError('"Tile Options - Performance" view has not appeared. ' + 'Expected: "Tile Options - Performance" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Risk Models" tab from the LHP', function() {
      TileOptions.getLHPOption('Risk Models').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Risk Models" tab from LHP');
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Risk Models" tab is selected in LHP
      TileOptions.getLHPOption('Risk Models').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Risk Models" tab did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Clear All" button in the Selected section', function() {
      ThiefHelpers.getButtonClassReference('Clear All').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Clear All" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Stress Tests" tab from the LHP', function() {
      TileOptions.getLHPOption('Stress Tests').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Stress Tests" tab from LHP');
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Stress Tests" tab is selected in LHP
      TileOptions.getLHPOption('Stress Tests').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Stress Tests" tab did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on Remove icon next to "S&P 500 -30%" in "Selected" section', function() {
      TileOptionsRiskStressTests.getElementRemoveIconFromSelectedContainer('S&P 500 -30%').click().then(function() {
      }, function() {

        expect(false).customError('Not able to click on "Remove" icon next to "S&P 500 -30%"');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Other Options" tab from the LHP', function() {
      TileOptions.getLHPOption('Other Options').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Other Options" tab from LHP');
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Other Options" tab is selected in LHP
      TileOptions.getLHPOption('Other Options').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Other Options" tab did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should deselect "Show Top Level Factor Groups Only" checkbox.', function() {
      ThiefHelpers.getCheckBoxClassReference('Show Top Level Factor Groups Only').uncheck();
    });

    it('Verifying if the "Show Top Level Factor Groups Only" checkbox is not selected', function() {
      ThiefHelpers.getCheckBoxClassReference('Show Top Level Factor Groups Only').isChecked().then(function(selected) {
        if (selected) {
          expect(false).customError('"Show Top Level Factor Groups Only" checkbox is still selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from Tile Option Page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button from Tile Options page');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Performance" report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Performance'), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating the "Performance" report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Performance" report is calculated', function() {
      PA3MainPage.isReportCalculated('Performance').then(function(value) {
        if (!value) {
          expect(false).customError('Calculated data for "Performance" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Performance')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 675512', function() {

    it('Should click on wrench icon in the application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(error) {

        expect(false).customError('Error occurred while clicking on wrench icon:' + error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Document Options" from wrench menu', function() {
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click().then(function() {
      }, function(error) {

        expect(false).customError('Error occurred while clicking on Document Options from the displayed ' + 'drop down:' + error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify if view is changed to "Document Options" mode', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Document Options" mode is not appeared');
        }
      });
    });

    it('Verifying if "Portfolio" tab is selected from LHP', function() {
      DocumentOptions.getLHPOption('Portfolio').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') === -1) {
          expect(false).customError('"Portfolio" is not selected in LHP');
        }
      });
    });

    it('Should check the checkbox "Use Price Sources"', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Price Sources').check();
    });

    it('Should select "Analytics Sources" from "Fixed Income" in LHP', function() {
      DocumentOptions.getLHPOptionItemFromCategory('Analytics Sources', 'Fixed Income').then(function(optionRef) {
        optionRef.click();
      });

      // Verifying that "Analytics Sources" option is selected
      DocumentOptions.getLHPOptionItemFromCategory('Analytics Sources', 'Fixed Income').then(function(optionRef) {
        expect(optionRef.getAttribute('class')).toContain('selected');
      });
    });

    it('Should check the checkbox "Use Portfolio Sources For Benchmark"', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Portfolio Sources For Benchmark').check();
    });

    it('Should click on "OK" button from Tile Option Page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button from Tile Options page');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Performance" report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Performance'), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating the "Performance" report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Performance" report is calculated', function() {
      PA3MainPage.isReportCalculated('Performance').then(function(value) {
        if (!value) {
          expect(false).customError('Calculated data for "Performance" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Performance')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 675513', function() {

    it('Should select "Contribution" report from LHP', function() {
      PA3MainPage.getReports('Contribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Check if report - 'Contribution' is selected
      PA3MainPage.getReports('Contribution').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Contribution" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Contribution" report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Contribution'), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating the "Contribution" report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Contribution" report is calculated', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(value) {
        if (!value) {
          expect(false).customError('Calculated data for "Contribution" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on wrench icon in the application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(error) {

        expect(false).customError('Error occurred while clicking on wrench icon:' + error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Document Options" from wrench menu', function() {
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click().then(function() {
      }, function(error) {

        expect(false).customError('Error occurred while clicking on Document Options from the displayed ' + 'drop down:' + error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify if view is changed to "Document Options" mode', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Document Options" mode is not appeared');
        }
      });
    });

    it('Should select "Add/Remove" from "Asset Types" in LHP', function() {
      DocumentOptions.getLHPOptionItemFromCategory('Add/Remove', 'Asset Types').then(function(optionRef) {
        optionRef.click().then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });

      // Verifying that "Add/Remove" option is selected
      DocumentOptions.getLHPOptionItemFromCategory('Add/Remove', 'Asset Types').then(function(optionRef) {
        optionRef.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') < 0) {
            expect(false).customError('"Add/Remove" option is not selected in LHP');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying that workspace view is changed to "Asset Types - Add/Remove"', function() {
      DocumentOptions.getOptionTitle().getText().then(function(title) {
        if (title !== 'Asset Types - Add/Remove') {
          expect(false).customError('Workspace view is not changed to "Asset Types - Add/Remove"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check the checkbox "Disable asset type adjustments"', function() {
      ThiefHelpers.getCheckBoxClassReference('Disable asset type adjustments').check();
    });

    it('Should select "Search Order" from "Asset Types" in LHP', function() {
      DocumentOptions.getLHPOptionItemFromCategory('Search Order', 'Asset Types').then(function(optionRef) {
        optionRef.click().then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });

      // Verifying that "Search Order" option is selected
      DocumentOptions.getLHPOptionItemFromCategory('Search Order', 'Asset Types').then(function(optionRef) {
        optionRef.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') < 0) {
            expect(false).customError('"Search Order" option is not selected in LHP');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on "Clear All" button in the Selected section', function() {
      ThiefHelpers.getButtonClassReference(undefined, DocumentOptionsAssetTypeSearchOrder.xpathClearAllIcon).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Clear All" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "OK" button from Tile Option Page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button from Tile Options page');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Contribution" report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Contribution'), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating the "Contribution" report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Contribution" report is calculated', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(value) {
        if (!value) {
          expect(false).customError('Calculated data for "Contribution" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step: 675515', function() {

    it('Should click on wrench icon in the application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(error) {

        expect(false).customError('Error occurred while clicking on wrench icon:' + error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Document Options" from wrench menu', function() {
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click().then(function() {
      }, function(error) {

        expect(false).customError('Error occurred while clicking on Document Options from the displayed ' + 'drop down:' + error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify if view is changed to "Document Options" mode', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Document Options" mode is not appeared');
        }
      });
    });

    it('Should select "Risk" option from LHP', function() {
      DocumentOptions.getLHPOption('Risk').click();

      // Verifying if "Risk" option is selected
      DocumentOptions.getLHPOption('Risk').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Risk" is not selected in the LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check the checkbox "Use benchmark as the market portfolio"', function() {
      ThiefHelpers.getCheckBoxClassReference('Use benchmark as the market portfolio').check();
    });

    it('Should select "Databases" option from LHP', function() {
      DocumentOptions.getLHPOption('Databases').click();

      // Verifying if "Databases" option is selected
      DocumentOptions.getLHPOption('Databases').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Databases" is not selected in the LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click on "Reuters" option from Available section', function() {
      browser.actions().doubleClick(DocumentOptionsDatabases.getElement('Reuters', 'Fundamental', 'Available')).perform().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "OK" button from Tile Option Page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button from Tile Options page');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Contribution" report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Contribution'), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating the "Contribution" report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Contribution" report is calculated', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(value) {
        if (!value) {
          expect(false).customError('Calculated data for "Contribution" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 675516', function() {

    it('Should select "Attribution" report from LHP', function() {
      PA3MainPage.getReports('Attribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Check if report - 'Attribution' is selected
      PA3MainPage.getReports('Attribution').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Attribution" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Attribution" report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Attribution'), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating the "Attribution" report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Attribution" report is calculated', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(value) {
        if (!value) {
          expect(false).customError('Calculated data for "Attribution" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should right click on "Port. Total Return" column and select "Custom Charts|Bar"', function() {

      var eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Attribution');
      eleRefs.each(function(element) {
        element.getText().then(function(text) {
          var name = text.replace(/\n/g, ' ');
          if (name === 'Port. Total Return') {
            PA3MainPage.rightClickAndSelectOption(element, 'Custom Charts|Bar');
          }
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Attribution');
            eleRefs.then(function(references) {
              references.forEach(function(eleRef) {
                eleRef.getText().then(function(text) {
                  var name = text.replace(/\n/g, ' ');
                  if (name === 'Port. Total Return') {
                    PA3MainPage.rightClickAndSelectOption(eleRef, 'Custom Charts|Bar');
                  }
                });
              });
            });
          } else {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying loading swirl is not displayed ', function() {
      // Verifying loading swirl
      PA3MainPage.getProgressIndicatorClassReference().getProgress().then(function() {
        expect(false).customError('loading swirl is displayed ');
        CommonFunctions.takeScreenShot();
      }, function() {
      });
    });

    it('Verify that "Port. Total Return" chart is loaded', function() {
      // Verify that Port. Total Return chart is loaded
      PA3MainPage.isInChartFormat('Port. Total Return').then(function(option) {
        if (option !== true) {
          expect(false).customError('"Port. Total Return" chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should right click on chart and select "Sort > Alphabetical"', function() {
      ChartHelpers.rightClickOnSeries('[tile-id=tile0] .pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');

      //Hover over Sort option
      browser.actions().mouseMove(ChartingUtilities.getOptionAfterRightClickOnChart('Sort')).perform();

      browser.sleep(3000);

      // Select Sort > Alphabetical Order from the drop down
      ChartingUtilities.getOptionAfterRightClickOnChart('Alphabetical').click();
    });

    it('Should hover on first bar data series and verifying "Commercial Services" is displayed on tooltip', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Commercial Services') < 0) {
          expect(false).customError('"Commercial Services" is not appeared in tooltip.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 675520', function() {

    it('Should click on wrench icon next to the "Attribution" report', function() {
      PA3MainPage.selectWrenchIcon('Attribution', true);
    });

    it('Should select "Duplicate" from the menu drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Duplicate').then(function() {
      }, function() {

        expect(false).customError('Unable to select "Duplicate" from the menu drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on edit icon( +/- ) in LHP', function() {
      PA3MainPage.getLHPEditIcon().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify that the LHP is changed to editable mode', function() {
      PA3MainPage.getLHPEditIcon().isPresent().then(function(changed) {
        if (changed) {
          expect(false).customError('The LHP is not changed to editable mode.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click on "Exposures Overview" report', function() {
      browser.actions().mouseMove(PA3EditMode.getReport('Exposures Overview')).doubleClick().perform().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Done" button from "Edit Report List" header bar', function() {
      ThiefHelpers.getButtonClassReference('Done').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Done" button from "Edit Report List" header bar');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should set "Currency" drop down to "U.S. Dollar"', function() {
      ThiefHelpers.selectOptionFromDropDown('U.S. Dollar', undefined, PA3MainPage.xpathCurrencyDropdown, 1);
    });

    it('Verifying if "Attribution" report is displayed two times in LHP', function() {
      var count = 0;
      PA3MainPage.getAllReportsFromGivenGroup('REPORTS', 'Reports').then(function(reports) {
        reports.forEach(function(report) {
          if (report === 'Attribution') {
            count++;
          }
        });

        if (count !== 2) {
          expect(false).customError('"Attribution" report is not displayed two times in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying  if "Exposures Overview" report is selected from LHP', function() {
      // Check if report - 'Exposures Overview' is selected
      PA3MainPage.getReports('Exposures Overview').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Exposures Overriew" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Currency" drop down is set to "U.S. Dollar"', function() {
      // Verify "U.S. Dollar" is selected
      ThiefHelpers.verifySelectedDropDownText('U.S. Dollar', undefined, PA3MainPage.xpathCurrencyDropdown, 1);
    });
  });

  describe('Test Step ID: 675521', function() {

    it('Should click on "Trade Simulation" in the application toolbar', function() {
      PA3MainPage.getTradeSimulationButton().click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should switch to "STU" application', function() {
      expect(STUMainPage.switchToWindow('STU')).toBeTruthy();

      // Wait for the loading icon to disappear
      Utilities.waitUntilElementDisappears(STUMainPage.getAlertLoading(), 120000);
    });

    it('Verifying if "Trader" utility is selected in LHP', function() {
      STUMainPage.getUtilities('Trader').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') === -1) {
          expect(false).customError('"Trader" utility is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Cash Source" drop down', function() {
      STUTraderPage.getDropDown('Cash Source').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Cash Source" drop down appears
      STUTraderPage.getDropDown('Cash Source').getAttribute('class').then(function(text) {
        if (text.indexOf('open') < 0) {
          expect(false).customError('"Cash Source" drop down did not appear even after clicking on it');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Non-Portfolio Cash" from drop down', function() {
      STUTraderPage.getDropDownOption('Non-Portfolio Cash').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Non-Portfolio Cash" drop down option is selected', function() {
      STUTraderPage.getDropDown('Cash Source').getText().then(function(value) {
        if (value !== 'Non-Portfolio Cash') {
          expect(false).customError('"Non-Portfolio Cash" is not selected in "Cash Source" dropdown');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Solver" utility to select', function() {
      STUMainPage.getUtilities('Solver').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Solver" utility is selected
      STUMainPage.getUtilities('Solver').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') < 0) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Solver" utility is not selected');
        }
      });
    });

    it('Should click on "Target" drop down', function() {
      STUSolverPage.getDropDown('Target').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Target" drop down appears
      STUSolverPage.getDropDown('Target').getAttribute('class').then(function(text) {
        if (text.indexOf('open') < 0) {
          expect(false).customError('"Target" drop down is not appeared even after clicking on it.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "YTM" option from drop down', function() {
      STUSolverPage.getDropDownOption('YTM').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "YTM" option is selected', function() {
      STUSolverPage.getDropDown('Target').getText().then(function(val) {
        if (val !== 'YTM') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"YTM" option is not selected');
        }
      });
    });

    it('Should close STU window and switch to "PA3" application', function() {
      // Should close STU window
      browser.driver.close();

      expect(STUMainPage.switchToWindow('PA3')).toBeTruthy();

      // Wait for the loading icon to disappear
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000);

      // Waiting for web elements to load
      browser.sleep(3000);
    });
  });

  describe('Test Step ID: 675519', function() {

    it('Should close PA3 application', function() {
      // After completing all the test steps protractor will close the browser automatically
      expect(true).toBeTruthy();
    });
  });
});
