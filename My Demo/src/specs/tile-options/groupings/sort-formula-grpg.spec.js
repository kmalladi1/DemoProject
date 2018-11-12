'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: sort-formula-grpg', function() {

  var groupName = [];
  var subGroupName = [];
  var columnValueBeforeSorting;

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  describe('Test Step ID: 673312', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/PA3/grouping/sort_grpg_doc', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('sort-grpg-doc');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var arrOfWidgetXpath = [PA3MainPage.xpathPortfolioWidget, PA3MainPage.xpathBenchmarkWidget];
    var arrOfWidgets = ['Portfolio', 'Benchmark'];
    var arrOfExpectedText = ['LFI:LHMN0001', 'LFI:LHMN0011'];
    CommonPageObjectsForPA3.verifyWidgetBoxText(arrOfWidgetXpath, arrOfWidgets, arrOfExpectedText);

  });

  describe('Test Step ID: 673313', function() {

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Security Name');

    // Click on Add button and select required option
    CommonPageObjectsForPA3.clickOnAddButtonAndSelectOptionFromDropdown('New/Reference', 'Groupings');

    it('Verifying if the "New" radio button is selected', function() {
      ThiefHelpers.getRadioClassReference('New').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"New" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var tabs = ['Formula', 'Sort Formula'];

    tabs.forEach(function(tab) {
      it('Verifying if "' + tab + '" is present', function() {
        CreateEditCustomGroupings.getTab(tab).isPresent().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + tab + '" did not present');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 673314', function() {

    // Enter formula in to the formula section and  click on X Close button
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'LBC_COUNTRY(#SD)', undefined, undefined, 'X Close', 'LBC_COUNTRY(#SD)');

    it('Should select "Sort Formula" tab', function() {
      CreateEditCustomGroupings.getTab('Sort Formula').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Sort Formula" tab is get selected"
      CreateEditCustomGroupings.getTab('Sort Formula').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Sort Formula" tab did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Enter formula in to the formula section and  click on X Close button
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Sort Formula', 'LOOKUP_OFDB_COL("CLIENT:/PA3/Grouping/SORT_COUNTRY_TEST.OFDB",LBC_COUNTRY(#SD),"COUNTRY","SORT")', undefined, undefined, 'X Close',
      'LOOKUP_OFDB_COL("CLIENT:/PA3/Grouping/SORT_COUNTRY_TEST.OFDB",LBC_COUNTRY(#SD),"COUNTRY","SORT")');

    it('Should select "Personal" radio button', function() {
      ThiefHelpers.getRadioClassReference('Personal').select();

      // Verifying if the "Personal" radio button is selected
      ThiefHelpers.getRadioClassReference('Personal').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Personal" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Personal" from the "Sub-directory:" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Personal', 'Sub-directory:');
    });

    it('Verifying if "Personal" is set to "Sub-directory:" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Personal', 'Sub-directory:');
    });

    it('Should enter "Sort Group" in Name field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Sort Group');

      // Verifying that "Name" field is set to "Sort Group"
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Sort Group') {
          expect(false).customError('"Name" field did not set to "Sort Group"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should Click on "Save" button to save the settings', function() {
      CreateEditCustomColumns.getButton('Save').click().then(function() {
      }, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Save" button:' + err);
      });
    });

    it('Should Wait for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(
        CreateEditCustomColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Should expand "Personal" from Available section', function() {
      TileOptionsGroupings.expandElementTree('Personal');
    });

    it('Verifying that "Personal" is expanded', function() {
      TileOptionsGroupings.checkIfExpanded('Personal').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('"Personal" did not get expanded');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Double click on "Sort Group" from the "Available" container', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('Personal', 'Sort Group')).perform();

      // Verifying if "Sort Group" is added to the "Selected" container
      TileOptionsGroupings.getElementFromSelectedContainer('Sort Group').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Sort Group" did not add to the "Selected" container');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');
  });

  describe('Test Step ID: 673320', function() {

    it('Should expand "Brazil" from the report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Brazil');
    });

    it('Verifying if "Brazil" is expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', 'Brazil').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Brazil" did not get expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should perform double click on  blank header above "Total"', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', '').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Should wait for "Weight" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Should copying all first level group name', function() {
      // Get the element into visibility before expanding
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 1).each(function(ref) {
        Utilities.scrollElementToVisibility(ref);
        ref.getText().then(function(name) {
          groupName.push(name);
        });
      });
    });

    var arr = ['Australia', 'Colombia', 'China', 'Chile', 'Canada', 'Panama', 'Norway', 'Netherlands', 'Mexico', 'Japan', 'Italy',
      'Israel', 'Ireland', 'Hungary', 'Germany', 'France', 'Finland', 'Denmark', 'Brazil', 'Bermuda', 'Austria',
      'Peru',];

    arr.forEach(function(item, index) {
      it('Verifying if "' + item + '" group name is present in provided order', function() {
        if (item !== groupName[index]) {
          expect(false).customError('All  group name did not present as specified order"' +
            ' Expected: ' + item + '"; Found: "' + groupName[index] + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if all security name is present in alphabetical order under Brazil(descending)', function() {
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 2).getText().then(function(arrOfElements) {
        var arrElement = arrOfElements;
        arrOfElements.reverse();
        arrElement.forEach(function(item, index) {
          if (item !== arrOfElements[index]) {
            expect(false).customError('All security name did not present in descending order under Brazil; Expected: "' + item + '"; Found: ' + arrOfElements[index]);
            CommonFunctions.takeScreenShot();
          }
        });

      });
    });

  });

  describe('Test Step ID: 673322', function() {

    it('Should perform double click on  blank header above "Total"', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', '').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Should wait for "Weight" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Should copying all first level group name', function() {
      groupName = [];

      // Get the element into visibility before expanding
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 1).each(function(ref) {
        Utilities.scrollElementToVisibility(ref);
        ref.getText().then(function(name) {
          groupName.push(name);
        });
      });
    });

    var arr = ['Peru', 'Austria', 'Bermuda', 'Brazil', 'Denmark', 'Finland', 'France', 'Germany', 'Hungary', 'Ireland', 'Israel',
      'Italy', 'Japan', 'Mexico', 'Netherlands', 'Norway', 'Panama', 'Canada', 'Chile', 'China', 'Colombia', 'Australia',];

    arr.forEach(function(item, index) {
      it('Verifying if "' + item + '" group name is present in provided order', function() {
        if (item !== groupName[index + 13]) {
          expect(false).customError('All  group name did not present as specified order"' +
            ' Expected: ' + item + '"; Found: "' + groupName[index + 13] + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if all security name is present in alphabetical order under Brazil(ascending)', function() {
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 2).getText().then(function(arrOfElements) {
        var arrElement = arrOfElements;
        arrOfElements.sort();
        arrElement.forEach(function(item, index) {
          if (item !== arrOfElements[index]) {
            expect(false).customError('All security name did not present in ascending order under Brazil; Expected: "' + item + '"; Found: ' + arrOfElements[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 673323', function() {

    it('Verifying if grouping name is "Sort Group"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(text) {
        if (text !== 'Sort Group') {
          expect(false).customError('Grouping name is not "Sort Group"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Sort Group" hyperlink', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile-Options" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Tile Options" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Groupings" tab is selected in LHP', function() {
      TileOptions.getLHPOption('Groupings').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Groupings" is not selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if page title is "Groupings"', function() {
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Groupings') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Groupings" option is not selected from LHP');
        }

      });
    });

    it('Should expand "FactSet > Fixed Income" from Available section', function() {
      TileOptionsGroupings.expandElementTree('FactSet|Fixed Income', 'FactSet');
    });

    it('Verifying that "FactSet > Fixed Income" is expanded', function() {
      TileOptionsGroupings.checkIfExpanded('FactSet|Fixed Income').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('"FactSet|Fixed Income" did not get expanded');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Double click on "Credit Rating" from the "Available" container', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('FactSet|Fixed Income', 'Credit Rating')).perform();

      // Verifying if "Credit Rating" is added to the "Selected" container
      TileOptionsGroupings.getElementFromSelectedContainer('Credit Rating').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Credit Rating" did not add to the "Selected" container');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should expand "Canada" from the report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Canada');
    });

    it('Verifying if "Canada" is expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', 'Canada').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Canada" did not get expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should perform double click on  blank header above "Total"', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', '').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Should wait for "Weight" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Should copying all first level group name', function() {
      groupName = [];

      // Get the element into visibility before expanding
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 1).each(function(ref) {
        Utilities.scrollElementToVisibility(ref);
        ref.getText().then(function(name) {
          groupName.push(name);
        });
      });
    });

    var arr = ['Australia', 'Colombia', 'China', 'Chile', 'Canada', 'Panama', 'Norway', 'Netherlands', 'Mexico', 'Japan', 'Italy', 'Israel',
      'Ireland', 'Hungary', 'Germany', 'France', 'Finland', 'Denmark', 'Brazil', 'Bermuda', 'Austria', 'Peru',];

    arr.forEach(function(item, index) {
      it('Verifying if "' + item + '" group name is present in provided order', function() {
        if (item !== groupName[index]) {
          expect(false).customError('All  group name did not present as specified order"' +
            ' Expected: ' + item + '"; Found: "' + groupName[index] + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should copying all second level group name', function() {
      // Get the element into visibility before expanding
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 2).each(function(ref) {
        Utilities.scrollElementToVisibility(ref);
        ref.getText().then(function(name) {
          subGroupName.push(name);
        });
      });
    });

    var arr1 = ['[Unassigned]', 'AAA', 'AA1', 'AA2', 'AA3', 'A1', 'A2', 'A3', 'BBB1', 'BBB2', 'BBB3',];

    arr1.forEach(function(item, index) {
      it('Verifying if "' + item + '" group name is present in provided order under Canada', function() {
        if (item !== subGroupName[index]) {
          expect(false).customError('All  group name did not present as specified order under Canada"' +
            ' Expected: ' + item + '"; Found: "' + subGroupName[index] + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 673324', function() {

    it('Should perform double click on  blank header above "Total"', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', '').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Should wait for "Weight" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Should copying all first level group name', function() {
      groupName = [];

      // Get the element into visibility before expanding
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 1).each(function(ref) {
        Utilities.scrollElementToVisibility(ref);
        ref.getText().then(function(name) {
          groupName.push(name);
        });
      });
    });

    var arr = ['Peru', 'Austria', 'Bermuda', 'Brazil', 'Denmark', 'Finland', 'France', 'Germany', 'Hungary',
      'Ireland', 'Israel', 'Italy', 'Japan', 'Mexico', 'Netherlands', 'Norway', 'Panama', 'Canada', 'Chile', 'China',
      'Colombia', 'Australia',];

    arr.forEach(function(item, index) {
      it('Verifying if "' + item + '" group name is present in provided order', function() {
        if (item !== groupName[index + 13]) {
          expect(false).customError('All  group name did not present as specified order"' +
            ' Expected: ' + item + '"; Found: "' + groupName[index + 13] + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should copying all second level group name', function() {
      subGroupName = [];

      // Get the element into visibility before expanding
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 2).each(function(ref) {
        Utilities.scrollElementToVisibility(ref);
        ref.getText().then(function(name) {
          subGroupName.push(name);
        });
      });
    });

    var arr1 = ['BBB3', 'BBB2', 'BBB1', 'A3', 'A2', 'A1', 'AA3', 'AA2', 'AA1', 'AAA', '[Unassigned]',];

    arr1.forEach(function(item, index) {
      it('Verifying if "' + item + '" group name is present in provided order under Canada', function() {
        if (item !== subGroupName[index + 2]) {
          expect(false).customError('All  group name did not present as specified order under Canada"' +
            ' Expected: ' + item + '"; Found: "' + subGroupName[index + 2] + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 675611', function() {

    it('Should expand "Brazil|BBB3" from the report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Brazil|BBB3');
    });

    it('Verifying if "Brazil|BBB3" is expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', 'Brazil|BBB3').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Brazil|BBB3" did not get expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should copying "Barclays Capital Credit Rating" column value', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Barclays Capital Credit Rating').then(function(columnValues) {
        columnValueBeforeSorting = columnValues;
      });
    });

    it('Should perform double click on  blank header above "Barclays Capital Credit Rating"', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', 'Barclays Capital Credit Rating').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Should wait for "Weight" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if "Barclays Capital Credit Rating" column values are same after performing double click', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Barclays Capital Credit Rating').then(function(columnValues) {
        columnValues.forEach(function(item, index) {
          if (item !== columnValueBeforeSorting[index]) {
            expect(false).customError('Barclays Capital Credit Rating column values changed after perform double click; Expected:' +
              ' "' + columnValueBeforeSorting[index] + '"; Found: ' + item);
            CommonFunctions.takeScreenShot();
          }

          if (columnValueBeforeSorting.length !== columnValues.length) {
            expect(false).customError('Both column length did not same');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should copying all third level group name', function() {
      subGroupName = [];

      // Get the element into visibility before expanding
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 3).each(function(ref) {
        Utilities.scrollElementToVisibility(ref);
        ref.getText().then(function(name) {
          subGroupName.push(name);
        });
      });
    });

    it('Verifying if all security name is present in alphabetical order under Brazil> BBB3(descending)', function() {
      var arrElement = subGroupName;
      subGroupName.reverse();
      arrElement.forEach(function(item, index) {
        if (item !== subGroupName[index]) {
          expect(false).customError('All security name did not present in descending order under Brazil; Expected: "' + item + '"; Found: ' + subGroupName[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 678345', function() {

    it('Verifying if grouping name is "Sort Group"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(text) {
        if (text !== 'Sort Group') {
          expect(false).customError('Grouping name is not "Sort Group"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Sort Group" hyperlink', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile-Options" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Tile Options" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Groupings" tab is selected in LHP', function() {
      TileOptions.getLHPOption('Groupings').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Groupings" is not selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if page title is "Groupings"', function() {
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Groupings') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Groupings" option is not selected from LHP');
        }

      });
    });

    it('Should expand "Personal" from Available section', function() {
      TileOptionsGroupings.expandElementTree('Personal');
    });

    it('Verifying that "Personal" is expanded', function() {
      TileOptionsGroupings.checkIfExpanded('Personal').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('"Personal" did not get expanded');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should perform mouse hover on "Sort Group" and click x icon', function() {
      // Performing mouse hover on "Sort Group"
      var eleReference = TileOptionsGroupings.getElementFromAvailableSection('Personal', 'Sort Group');
      browser.actions().mouseMove(eleReference).perform();

      // Get the reference of delete icon
      TileOptionsGroupings.getRemoveIconForGroupingsInAvailableSection('Personal', 'Sort Group').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if  dialog box with Delete Grouping appeared
      ThiefHelpers.isDialogOpen('Delete Grouping').then(function(option) {
        if (!option) {
          expect(false).customError('"Delete Grouping" dialog did not apear');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should click on "OK" on Dialog box "Delete Grouping" ', function() {
      ThiefHelpers.getDialogButton('Delete Grouping', 'OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "cog" icon next to "Credit Rating" in selected section', function() {
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Credit Rating').click();

      // Verifying if options popup is appeared
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Credit Rating', true).isPresent()
        .then(function(found) {
          if (!found) {
            expect(false).customError('Error: Failed to open "Options" popup');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should select "Matrix" radio button', function() {
      ThiefHelpers.getRadioClassReference('Matrix').select();

      // Verifying if the "Matrix" radio button is selected
      ThiefHelpers.getRadioClassReference('Matrix').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Matrix" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from Tile Option Page', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsGroupings.xpathOKOrCancelButtonFromDropDown, 'OK');
      ThiefHelpers.getButtonClassReference(undefined, xpath).press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button from drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Matrix Credit Rating" is added to the "Selected" container', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Matrix Credit Rating').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Matrix Credit Rating" did not add to the "Selected" container');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 681141', function() {

    it('Should select "Columns" from the LHP', function() {
      TileOptions.getLHPOption('Columns').click();

      // Verifying if "Columns" is selected in LHP
      TileOptions.getLHPOption('Columns').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Columns" did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if page title is "Columns"', function() {
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Columns" option is not selected from LHP');
        }
      });
    });

    it('Hover over "Bloomberg Barclays Capital Credit Rating" in "Selected" section and click on the "Remove" icon', function() {
      var action = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Bloomberg Barclays Capital Credit Rating');

      // Hover on "Bloomberg Barclays Capital Credit Rating" and click on remove button
      return action.getActions().then(function(remove) {
        return remove.triggerAction('remove');
      });
    });

    it('Verifying if "Bloomberg Barclays Capital Credit Rating" is removed from "Selected" section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        console.log(myArray.indexOf('Bloomberg Barclays Capital Credit Rating'));

        if (myArray.indexOf('Bloomberg Barclays Capital Credit Rating') >= 0) {
          expect(false).customError('"Bloomberg Barclays Capital Credit Rating" is not removed from the selected section');
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
      ThiefHelpers.isDialogOpen('Columns').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Columns" dialog did not display');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var tabs = ['Formula', 'Sort Formula'];

    tabs.forEach(function(tab) {
      it('Verifying if "' + tab + '" is present', function() {
        CreateEditCustomColumns.getTab(tab).isPresent().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + tab + '" did not present');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    // Enter formula in to the formula section and  click on X Close button
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'LBC_COUNTRY(#SD)', undefined, undefined, 'X Close', 'LBC_COUNTRY(#SD)');

    it('Should select "Sort Formula" tab', function() {
      CreateEditCustomColumns.getTab('Sort Formula').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Sort Formula" tab is get selected"
      CreateEditCustomColumns.getTab('Sort Formula').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Sort Formula" tab did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Enter formula in to the formula section and  click on X Close button
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Sort Formula', 'LOOKUP_OFDB_COL("CLIENT:/SHARED/SORT_COUNTRY_TEST.OFDB",LBC_COUNTRY(#SD),"COUNTRY","SORT")', undefined, undefined, 'X Close',
      'LOOKUP_OFDB_COL("CLIENT:/SHARED/SORT_COUNTRY_TEST.OFDB",LBC_COUNTRY(#SD),"COUNTRY","SORT")');

    it('Should select "Personal" radio button', function() {
      ThiefHelpers.getRadioClassReference('Personal').select();

      // Verifying if the "Personal" radio button is selected
      ThiefHelpers.getRadioClassReference('Personal').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Personal" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Personal" from the "Sub-directory:" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Personal', 'Sub-directory:');
    });

    it('Verifying if "Personal" is set to "Sub-directory:" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Personal', 'Sub-directory:');
    });

    it('Should enter "Sort Column" in Name field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Sort Column');

      // Verifying that "Name" field is set to "Sort Column"
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Sort Column') {
          expect(false).customError('"Name" field did not set to "Sort Column"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should Click on "Save" button to save the settings', function() {
      CreateEditCustomColumns.getButton('Save').click().then(function() {
      }, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Save" button:' + err);
      });
    });

    it('Should Wait for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(
        CreateEditCustomColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Should expand "Personal" from Available section and double click on "Sort Column"', function() {
      //TileOptionsColumns.expandElementTree('Personal');
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
      group.expand();

      // Verifying if "Personal" is expanding
      group.isExpanded().then(function(expanded) {
        if (expanded) {

          if (expanded) {
            group.getItemByText('Sort Column').then(function(element) {

              // Selecting the element before performing double click as double click function does not work by itself
              element.select();
              element.doubleClick();
            });
          } else {
            expect(false).customError('"Personal" group was not expanded.');
            CommonFunctions.takeScreenShot();
          }
        }

      });
    });

    it('Verifying if "Sort Column" is added to the "Selected" container', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Sort Column') === -1) {
          expect(false).customError('"Sort Column" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

  });

  describe('Test Step ID: 681143', function() {

    it('Verifying if grouping name is "Credit Rating"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(text) {
        if (text !== 'Credit Rating') {
          expect(false).customError('Grouping name is not "Credit Rating"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Credit Rating" hyperlink', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile-Options" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Tile Options" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Groupings" tab is selected in LHP', function() {
      TileOptions.getLHPOption('Groupings').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Groupings" is not selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if page title is "Groupings"', function() {
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Groupings') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Groupings" option is not selected from LHP');
        }

      });
    });

    it('Should select "Columns" from the LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Columns" is selected in LHP
      TileOptions.getLHPOption('Columns').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Columns" did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if page title is "Columns"', function() {
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Columns" option is not selected from LHP');
        }
      });
    });

    it('Should expand "Personal" from Available section hover over "Sort Column" click on the "Remove" icon', function() {
      //TileOptionsColumns.expandElementTree('Personal');
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
      group.expand();

      // Verifying if "Document" is expanded
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          var action = group.getItemByText('Sort Column');

          // Hover on "Sort Column" and click on the "remove" icon
          return action.then(function(remove) {
            return remove.getActions().then(function(val) {
              return val.triggerAction('remove');
            });
          });
        } else {
          expect(false).customError('"Personal" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" on Dialog box "Delete Column" ', function() {
      ThiefHelpers.getDialogButton('Delete Column', 'OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Groupings" from the LHP', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Groupings" is selected in LHP
      TileOptions.getLHPOption('Groupings').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Groupings" did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if page title is "Groupings"', function() {
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Groupings') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Groupings" option is not selected from LHP');
        }
      });
    });

    it('Should click on "Clear All" button from Selected section', function() {
      ThiefHelpers.getTransferBoxReference(TileOptionsGroupings.xpathOfTransferBox).target.clear();
    });

    it('Verifying if all elements remove from Selected section', function() {
      TileOptionsGroupings.getAllElements('Selected').count().then(function(numberOfElement) {
        if (numberOfElement !== 0) {
          expect(false).customError('Selected section did not empty');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

  });

});
