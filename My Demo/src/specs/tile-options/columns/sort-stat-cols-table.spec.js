'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: sort-stat-cols-table', function() {

  var columnValueBeforeSorting;
  var columnValuesAfterSorting;
  var columnValues1;

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  describe('Test Step ID: 665763', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Columns/sort_col_doc"', function() {
      PA3MainPage.switchToDocument('sort-col-doc');
    });

    it('Should wait for "Weight" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights', true).then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
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
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if Portfolio widget is populated with "LFI:LHMN0001"', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathPortfolioWidget).getText().then(function(val) {
        if (val !== 'LFI:LHMN0001') {
          expect(false).customError('Portfolio widget is not populated with "LFI:LHMN0001"; Found: ' + val);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Benchmark widget is populated with "LFI:LHMN0011"', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathBenchmarkWidget).getText().then(function(val) {
        if (val !== 'LFI:LHMN0011') {
          expect(false).customError('Benchmark widget is not populated with "LFI:LHMN0011"; Found: ' + val);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 673297', function() {

    it('Should perform double click on  "Barclays Capital Credit Rating" column', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', 'Barclays Capital Credit Rating').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Verifying if "Down" arrow button display next to "Barclays Capital Credit Rating"', function() {
      PA3MainPage.verifyArroButtonDirectionInColumnHeader('Weights', 'Down').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Down" button did not display next to "Barclays Capital Credit Rating" column');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should scroll to the bottom of the grid to load data in the grid', function() {
      SlickGridFunctions.scrollGridElements();
    });

    it('Copying column value and removing duplicate element', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Barclays Capital Credit Rating').then(function(columnValues) {
        columnValues1 = columnValues;
        columnValues.splice(0, 1);
        columnValueBeforeSorting = columnValues.filter(function(item, index, inputArray) {
          return inputArray.indexOf(item) === index;
        });
      });
    });

    var arr = ['BA2', 'BA1', 'BAA3', 'BAA2', 'BAA1', 'A3', 'A2', 'A1', 'AA3', 'AA2', 'AA1', 'AAA'];

    arr.forEach(function(value, index) {
      it('Verifying if "Barclays Capital Credit Rating" column value is present in specified order', function() {
        if (value !== columnValueBeforeSorting[index]) {
          expect(false).customError('"Barclays Capital Credit Rating" column value did not present in specified order; Expected: "' + value + '"; Found: ' + columnValueBeforeSorting[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 673298', function() {

    it('Should scroll slickgrid to top position', function() {
      SlickGridFunctions.scrollRowToTop('Weights', 0);
    });

    it('Should perform double click on  "Barclays Capital Credit Rating" column', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', 'Barclays Capital Credit Rating').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Verifying if "Up" arrow button display next to "Barclays Capital Credit Rating"', function() {
      PA3MainPage.verifyArroButtonDirectionInColumnHeader('Weights', 'Up').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Up" button did not display next to "Barclays Capital Credit Rating" column');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should scroll to the bottom of the grid to load data in the grid', function() {
      SlickGridFunctions.scrollGridElements();
    });

    it('Copying column value and removging duplicate element', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Barclays Capital Credit Rating').then(function(columnValues) {
        columnValues.splice(0, 1);
        columnValuesAfterSorting = columnValues.filter(function(item, index, inputArray) {
          return inputArray.indexOf(item) === index;
        });
      });
    });

    var arr = ['AAA', 'AA1', 'AA2', 'AA3', 'A1', 'A2', 'A3', 'BAA1', 'BAA2', 'BAA3', 'BA1', 'BA2'];

    arr.forEach(function(value, index) {
      it('Verifying if "Barclays Capital Credit Rating" column value is present in specified order', function() {
        if (value !== columnValuesAfterSorting[index]) {
          expect(false).customError('"Barclays Capital Credit Rating" column value did not present in specified order; Expected: "' + value + '"; Found: ' + columnValuesAfterSorting[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 665767', function() {

    it('Verifying if grouping name is "Security Name"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(text) {
        if (text !== 'Security Name') {
          expect(false).customError('Grouping name is not "Security Name"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Security Name" hyperlink', function() {
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

    it('Verifying if the "New" radio button is selected', function() {
      ThiefHelpers.getRadioClassReference('New').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"New" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var tabs = ['Formula', 'Sort Formula', 'Stat Formula', 'Stat Table'];

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
  });

  describe('Test Step ID: 665775', function() {

    it('Should select "Reference" radio button', function() {
      ThiefHelpers.getRadioClassReference('Reference').select();

      // Verifying if the "Reference" radio button is selected
      ThiefHelpers.getRadioClassReference('Reference').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Reference" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var tabs = ['Formula', 'Sort Formula', 'Stat Formula', 'Stat Table'];

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
  });

  describe('Test Step ID: 665777', function() {

    it('Should select "New" radio button', function() {
      ThiefHelpers.getRadioClassReference('New').select();

      // Verifying if the "New" radio button is selected
      ThiefHelpers.getRadioClassReference('New').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"New" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

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

    // Enter formula into the section, click on the X Close butoon and verify the formula entered
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Sort Formula', 'LOOKUP_OFDB_COL("CLIENT:/PA3/Grouping/SORT_COUNTRY_TEST.OFDB",LBC_COUNTRY(#SD),"COUNTRY","SORT")', undefined, undefined, 'X Close', 'LOOKUP_OFDB_COL("CLIENT:/PA3/Grouping/SORT_COUNTRY_TEST.OFDB",LBC_COUNTRY(#SD),"COUNTRY","SORT")');

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
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verify that an error message appears in the UI saying "A formula is required."', function() {
      CreateEditCustomColumns.getErrorMessage().then(function(errText) {
        if (errText !== 'A formula is required.') {
          expect(false).customError('Error message text is not as expected "A formula is required."; Found: ' + errText);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 673300', function() {

    it('Should select "Formula" tab', function() {
      CreateEditCustomColumns.getTab('Formula').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Formula" tab is get selected"
      CreateEditCustomColumns.getTab('Formula').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Formula" tab did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Enter formula into the section, click on the X Close butoon and verify the formula entered
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'LBC_COUNTRY(#SD)', undefined, undefined, 'X Close', 'LBC_COUNTRY(#SD)');

    it('Should Click on "Save" button to save the settings', function() {
      CreateEditCustomColumns.getButton('Save').click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Save" button:' + err);
      });
    });

    it('Should Wait for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Should expand "Personal" from Available section and double click on "Sort Column"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
      group.expand();

      // Verifying if "Personal" is expanding
      group.isExpanded().then(function(expanded) {
        if (expanded) {

          if (expanded) {
            return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Personal', 'Sort Column', 'last').then(function(indexOfElement) {
              var element = group.getItemByIndex(indexOfElement);

              // Selecting the element before performing double click as double click function does not work by itself
              return element.then(function(item) {
                item.select();
                item.doubleClick();
              });
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

    it('Should click on "OK" button from Tile Option Page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button from Tile Options page');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Weight" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights', true).then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
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
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should perform double click on  "Sort Column" column', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', 'Sort Column').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Verifying if "Down" arrow button display next to "Sort Column"', function() {
      PA3MainPage.verifyArroButtonDirectionInColumnHeader('Weights', 'Down').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Down" button did not display next to "Sort Column" column');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should scroll to the bottom of the grid to load data in the grid', function() {
      SlickGridFunctions.scrollGridElements();
    });

    it('Copying column value and removing duplicate element', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Sort Column').then(function(columnValues) {
        columnValues.splice(0, 1);
        columnValuesAfterSorting = columnValues.filter(function(item, index, inputArray) {
          return inputArray.indexOf(item) === index;
        });
      });
    });

    var arr = ['Australia', 'Colombia', 'China', 'Chile', 'Canada', 'Panama', 'Norway', 'Netherlands', 'Mexico', 'Japan', 'Italy', 'Israel', 'Ireland', 'Hungary', 'Germany', 'France', 'Finland', 'Denmark', 'Brazil', 'Bermuda', 'Austria', 'Peru'];

    arr.forEach(function(value, index) {
      it('Verifying if "Sort Column" column value is present in specified order', function() {
        if (value !== columnValuesAfterSorting[index]) {
          expect(false).customError('"Sort Column" column value did not present in specified order; Expected: "' + value + '"; Found: ' + columnValuesAfterSorting[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 673301', function() {

    it('Should scroll slickgrid to top position', function() {
      SlickGridFunctions.scrollRowToTop('Weights', 0);
    });

    it('Should perform double click on  "Sort Column" column', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', 'Sort Column').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Should scroll to the bottom of the grid to load data in the grid', function() {
      SlickGridFunctions.scrollGridElements();
    });

    it('Copying "Sort Column" column value and removing duplicate element', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Sort Column').then(function(columnValues) {
        columnValues.splice(0, 1);
        columnValuesAfterSorting = columnValues.filter(function(item, index, inputArray) {
          return inputArray.indexOf(item) === index;
        });
      });
    });

    var arr = ['Peru', 'Austria', 'Bermuda', 'Brazil', 'Denmark', 'Finland', 'France', 'Germany', 'Hungary', 'Ireland', 'Israel', 'Italy', 'Japan', 'Mexico', 'Netherlands', 'Norway', 'Panama', 'Canada', 'Chile', 'China', 'Colombia', 'Australia'];

    arr.forEach(function(value, index) {
      it('Verifying if "Sort Column" column value is present in specified order', function() {
        if (value !== columnValuesAfterSorting[index]) {
          expect(false).customError('"Sort Column" column value did not present in specified order; Expected: "' + value + '"; Found: ' + columnValuesAfterSorting[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 676187', function() {

    it('Verifying if grouping name is "Security Name"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(text) {
        if (text !== 'Security Name') {
          expect(false).customError('Grouping name is not "Security Name"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Security Name" hyperlink', function() {
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

    it('Should expand "Personal" from Available section hover on "Sort Column" and click on edit icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
      group.expand();

      // Verifying if "Personal" is expanding
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Personal', 'Sort Column', 'last').then(function(indexOfElement) {
            var element = group.getItemByIndex(indexOfElement);

            // Hover on "Sort Column" and click on the "Edit" icon
            return element.then(function(edit) {
              return edit.getActions().then(function(val) {
                return val.triggerAction('edit');
              });
            });
          });
        } else {
          expect(false).customError('"Personal" group was not expanded.');
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

    it('Verifying "Columns" dialog is displayed', function() {
      ThiefHelpers.isDialogOpen('Columns', undefined, undefined).then(function(bool) {
        if (!bool) {
          expect(false).customError('"Columns" dialog did not display');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Stat Formula" tab', function() {
      CreateEditCustomColumns.getTab('Stat Formula').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Stat Formula" tab is get selected"
      CreateEditCustomColumns.getTab('Stat Formula').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Stat Formula" tab did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Enter formula into the section, click on the X Close butoon and verify the formula entered
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Sort Formula', 'LOOKUP_OFDB_COL("CLIENT:/SHARED/SORT_COUNTRY_TEST.OFDB",LBC_COUNTRY(#SD),"COUNTRY","STAT")', undefined, undefined, 'X Close', 'LOOKUP_OFDB_COL("CLIENT:/SHARED/SORT_COUNTRY_TEST.OFDB",LBC_COUNTRY(#SD),"COUNTRY","STAT")');

    it('Should enter "Stat column" in Name field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Stat column');

      // Verifying that "Name" field is set to "Stat column"
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Stat column') {
          expect(false).customError('"Name" field did not set to "Stat column"; Found: ' + text);
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
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Should click on "OK" button from Tile Option Page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button from Tile Options page');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Weight" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights', true).then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
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
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Up" arrow button display next to "Stat column"', function() {
      PA3MainPage.verifyArroButtonDirectionInColumnHeader('Weights', 'Up').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Up" button did not display next to "Stat column" column');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should scroll to the bottom of the grid to load data in the grid', function() {
      SlickGridFunctions.scrollGridElements();
    });

    it('Copying "Stat column" column value and removing duplicate element', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Stat column').then(function(columnValues) {
        columnValues.splice(0, 1);
        columnValuesAfterSorting = columnValues.filter(function(item, index, inputArray) {
          return inputArray.indexOf(item) === index;
        });
      });
    });

    var arr = ['Peru', 'Austria', 'Bermuda', 'Brazil', 'Denmark', 'Finland', 'France', 'Germany', 'Hungary', 'Ireland', 'Israel', 'Italy', 'Japan', 'Mexico', 'Netherlands', 'Norway', 'Panama', 'Canada', 'Chile', 'China', 'Colombia', 'Australia'];

    arr.forEach(function(value, index) {
      it('Verifying if "Stat column" column value is present in specified order', function() {
        if (value !== columnValuesAfterSorting[index]) {
          expect(false).customError('"Stat column" column value did not present in specified order; Expected: "' + value + '"; Found: ' + columnValuesAfterSorting[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Stepo ID: 676188', function() {

    it('Should scroll slickgrid to top position', function() {
      SlickGridFunctions.scrollRowToTop('Weights', 0);
    });

    it('Should perform double click on  "Stat column" column', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', 'Stat column').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Should scroll to the bottom of the grid to load data in the grid', function() {
      SlickGridFunctions.scrollGridElements();
    });

    it('Copying "Stat column" column value and removing duplicate element', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Stat column').then(function(columnValues) {
        columnValues.splice(0, 1);
        columnValuesAfterSorting = columnValues.filter(function(item, index, inputArray) {
          return inputArray.indexOf(item) === index;
        });
      });
    });

    var arr = ['Australia', 'Colombia', 'China', 'Chile', 'Canada', 'Panama', 'Norway', 'Netherlands', 'Mexico', 'Japan', 'Italy', 'Israel', 'Ireland', 'Hungary', 'Germany', 'France', 'Finland', 'Denmark', 'Brazil', 'Bermuda', 'Austria', 'Peru'];

    arr.forEach(function(value, index) {
      it('Verifying if "Stat column" column value is present in specified order', function() {
        if (value !== columnValuesAfterSorting[index]) {
          expect(false).customError('"Stat column" column value did not present in specified order; Expected: "' + value + '"; Found: ' + columnValuesAfterSorting[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 673305', function() {

    it('Verifying if grouping name is "Security Name"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(text) {
        if (text !== 'Security Name') {
          expect(false).customError('Grouping name is not "Security Name"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Security Name" hyperlink', function() {
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

    it('Should expand "Personal" from Available section hover on "Stat column" and click on edit icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
      group.expand();

      // Verifying if "Personal" is expanding
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Personal', 'Stat column', 'last').then(function(indexOfElement) {
            var element = group.getItemByIndex(indexOfElement);

            // Hover on "stat Column" and click on the "Edit" icon
            return element.then(function(edit) {
              return edit.getActions().then(function(val) {
                return val.triggerAction('edit');
              });
            });
          });
        } else {
          expect(false).customError('"Personal" group was not expanded.');
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

    it('Should select "Stat Table" tab', function() {
      CreateEditCustomColumns.getTab('Stat Table').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Stat Table" tab is get selected"
      CreateEditCustomColumns.getTab('Stat Table').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Stat Table" tab did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var key = ['100', '150', '200', '250', '300', '350'];
    var values = ['Peru', 'Austria', 'Belgium', 'Bermuda', 'Brazil', 'Denmark'];

    key.forEach(function(keyName, index) {
      it('Should enter "' + keyName + '" as key name for Key column', function() {
        CreateEditCustomColumns.getCellReference(index, 'Key').then(function(ref) {
          browser.actions().doubleClick(ref).perform();

          // Input specific key value
          CreateEditCustomColumns.getInputBoxFromSlickGridRow().sendKeys(keyName, protractor.Key.ENTER);
        });
      });

      it('Should enter "' + values[index] + '" as value name for Value column', function() {
        CreateEditCustomColumns.getCellReference(index, 'Value').then(function(ref) {
          browser.actions().doubleClick(ref).perform();

          // Input specific key value
          CreateEditCustomColumns.getInputBoxFromSlickGridRow().sendKeys(values[index], protractor.Key.ENTER);
        });
      });
    });

    it('Verifying if numeric values are displaying under Key column', function() {
      CreateEditCustomColumns.getColumnData('Key').then(function(columnData) {
        columnData.forEach(function(text) {
          if (isNaN(parseInt(text))) {
            expect(false).customError('Values did not display as numeric for "Key" column');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if string values are displaying under Value column', function() {
      CreateEditCustomColumns.getColumnData('Value').then(function(columnData) {
        columnData.forEach(function(text) {
          if (isNaN(parseInt(text)) === false) {
            expect(false).customError('Values did not display as string for "Value" column');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 673306', function() {

    it('Should enter "Stat table" in Name field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Stat table');

      // Verifying that "Name" field is set to "Stat table"
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Stat table') {
          expect(false).customError('"Name" field did not set to "Stat table"; Found: ' + text);
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
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Should click on "OK" button from Tile Option Page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button from Tile Options page');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Weight" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights', true).then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
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
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Down" arrow button display next to "Stat table"', function() {
      PA3MainPage.verifyArroButtonDirectionInColumnHeader('Weights', 'Down').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Down" button did not display next to "Stat table" column');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should scroll to the bottom of the grid to load data in the grid', function() {
      SlickGridFunctions.scrollGridElements();
    });

    it('Copying column value and removing duplicate element', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Stat table').then(function(columnValues) {
        columnValues.splice(0, 1);
        columnValuesAfterSorting = columnValues.filter(function(item, index, inputArray) {
          return inputArray.indexOf(item) === index;
        });
      });
    });

    var arr = ['Australia', 'Colombia', 'China', 'Chile', 'Canada', 'Panama', 'Norway', 'Netherlands', 'Mexico', 'Japan', 'Italy', 'Israel', 'Ireland', 'Hungary', 'Germany', 'France', 'Finland', 'Denmark', 'Brazil', 'Bermuda', 'Austria', 'Peru'];

    arr.forEach(function(value, index) {
      it('Verifying if "Stat table" column value is present in specified order', function() {
        if (value !== columnValuesAfterSorting[index]) {
          expect(false).customError('"Stat table" column value did not present in specified order; Expected: "' + value + '"; Found: ' + columnValuesAfterSorting[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 673307', function() {

    it('Should scroll slickgrid to top position', function() {
      SlickGridFunctions.scrollRowToTop('Weights', 0);
    });

    it('Should perform double click on  "Stat table" column', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', 'Stat table').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Verifying if "Up" arrow button display next to "Stat table"', function() {
      PA3MainPage.verifyArroButtonDirectionInColumnHeader('Weights', 'Up').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Up" button did not display next to "Stat table" column');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should scroll to the bottom of the grid to load data in the grid', function() {
      SlickGridFunctions.scrollGridElements();
    });

    it('Copying "Stat table" column value and removing duplicate element', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Stat table').then(function(columnValues) {
        columnValues.splice(0, 1);
        columnValuesAfterSorting = columnValues.filter(function(item, index, inputArray) {
          return inputArray.indexOf(item) === index;
        });
      });
    });

    var arr = ['Peru', 'Austria', 'Bermuda', 'Brazil', 'Denmark', 'Finland', 'France', 'Germany', 'Hungary', 'Ireland', 'Israel', 'Italy', 'Japan', 'Mexico', 'Netherlands', 'Norway', 'Panama', 'Canada', 'Chile', 'China', 'Colombia', 'Australia'];

    arr.forEach(function(value, index) {
      it('Verifying if "Stat table" column value is present in specified order', function() {
        if (value !== columnValuesAfterSorting[index]) {
          expect(false).customError('"Stat table" column value did not present in specified order; Expected: "' + value + '"; Found: ' + columnValuesAfterSorting[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 673309', function() {

    it('Should click on the wrench icon from "Weights" report', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Options" from reports options list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options');
    });

    it('Verifying if "Tile Option" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Tile Option" page did not open');
          CommonFunctions.takeScreenShot();
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

    it('Should expand "Personal" from Available section hover on "Stat table" and click on edit icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
      group.expand();

      // Verifying if "Personal" is expanding
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Personal', 'Stat table', 'last').then(function(indexOfElement) {
            var element = group.getItemByIndex(indexOfElement);

            // Hover on "stat table" and click on the "Edit" icon
            return element.then(function(edit) {
              return edit.getActions().then(function(val) {
                return val.triggerAction('edit');
              });
            });
          });
        } else {
          expect(false).customError('"Personal" group was not expanded.');
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

    it('Should select "Stat Table" tab', function() {
      CreateEditCustomColumns.getTab('Stat Table').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Stat Table" tab is get selected"
      CreateEditCustomColumns.getTab('Stat Table').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Stat Table" tab did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should perform double click on "200" for "Belgium" and enter 210', function() {
      CreateEditCustomColumns.getRowIndex('200', 'Key').then(function(rowIndex) {
        CreateEditCustomColumns.getCellReference(rowIndex, 'Key').then(function(ref) {
          browser.actions().doubleClick(ref).perform();
        });

        // Input specific key value
        CreateEditCustomColumns.getInputBoxFromSlickGridRow().sendKeys('210', protractor.Key.ENTER).then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Belgium" and "210" is present in same row', function() {
      CreateEditCustomColumns.getRowIndex('210', 'Key').then(function(keyRowIndex) {
        CreateEditCustomColumns.getRowIndex('Belgium', 'Value').then(function(valueRowIndex) {
          if (valueRowIndex !== keyRowIndex) {
            expect(false).customError('"210" and "Belgium" did not present in same row');
            CommonFunctions.takeScreenShot();
          }
        });
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
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Should expand "Personal" from Available section hover on "Stat table" and click on edit icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
      group.expand();

      // Verifying if "Personal" is expanding
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Personal', 'Stat table', 'last').then(function(indexOfElement) {
            var element = group.getItemByIndex(indexOfElement);

            // Hover on "stat table" and click on the "Edit" icon
            return element.then(function(edit) {
              return edit.getActions().then(function(val) {
                return val.triggerAction('edit');
              });
            });
          });
        } else {
          expect(false).customError('"Personal" group was not expanded.');
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

    it('Should select "Stat Table" tab', function() {
      CreateEditCustomColumns.getTab('Stat Table').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Stat Table" tab is get selected"
      CreateEditCustomColumns.getTab('Stat Table').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Stat Table" tab did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the Key is displaying 210 for Belgium Value', function() {
      CreateEditCustomColumns.getRowIndex('210', 'Key').then(function(rowIndex) {
        CreateEditCustomColumns.getCellReference(rowIndex, 'Value').then(function(ref) {
          ref.getText().then(function(text) {
            if (text !== 'Belgium') {
              expect(false).customError('For Key values "210" Belgium did not display as Value; Found: ' + text);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if no duplicate row created for "210"', function() {
      CreateEditCustomColumns.getColumnData('Key').then(function(columnData) {
        var count = 0;
        columnData.forEach(function(column) {
          if (column === '210') {
            count = count + 1;
          }
        });

        if (count !== 1) {
          expect(false).customError('"210" did not present only one time; Found : ' + count);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 673310', function() {

    var arr = ['Bermuda', 'Brazil', 'Denmark'];

    arr.forEach(function(name) {
      it('Should hover on "' + name + '" and click on Remove icon', function() {
        CreateEditCustomColumns.getRowIndex(name, 'Value').then(function(rowIndex) {
          CreateEditCustomColumns.getCellReference(rowIndex, 'Value').then(function(ref) {
            browser.actions().mouseMove(ref).perform();

            // Input specific key value
            CreateEditCustomColumns.getRemoveIconFromSlickgrid().click().then(function() {
            }, function(err) {

              expect(false).customError(err);
              CommonFunctions.takeScreenShot();
            });
          }, function(error) {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
        }, function(error) {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
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
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Should expand "Personal" from Available section hover on "Stat table" and click on edit icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
      group.expand();

      // Verifying if "Personal" is expanding
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Personal', 'Stat table', 'last').then(function(indexOfElement) {
            var element = group.getItemByIndex(indexOfElement);

            // Hover on "stat table" and click on the "Edit" icon
            return element.then(function(edit) {
              return edit.getActions().then(function(val) {
                return val.triggerAction('edit');
              });
            });
          });
        } else {
          expect(false).customError('"Personal" group was not expanded.');
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

    it('Should select "Stat Table" tab', function() {
      CreateEditCustomColumns.getTab('Stat Table').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Stat Table" tab is get selected"
      CreateEditCustomColumns.getTab('Stat Table').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Stat Table" tab did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    arr.forEach(function(text) {
      it('Verifying if "' + text + '" row removed from slickgrid', function() {
        CreateEditCustomColumns.getColumnData('Value').then(function(colData) {
          if (colData.indexOf(text) >= 0) {
            expect(false).customError('"' + text + '" row did not delete from the slickgrid');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 673311', function() {

    it('Should select "Stat Formula" tab', function() {
      CreateEditCustomColumns.getTab('Stat Formula').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Stat Formula" tab is get selected"
      CreateEditCustomColumns.getTab('Stat Formula').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Stat Formula" tab did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should clear the formula from Stat Formula text area', function() {
      browser.actions().mouseMove(CreateEditCustomColumns.getTabTextArea('Formula', 'New')).click().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE)).perform();
    });

    it('Should Click on "Save" button to save the settings', function() {
      CreateEditCustomColumns.getButton('Save').click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Save" button:' + err);
      });
    });

    it('Should Wait for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Should click on "OK" button from Tile Option Page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button from Tile Options page');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Weight" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights', true).then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
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
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should set "LION:F0000022PX" as the Portfolio', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathPortfolioWidget).setText('LION:F0000022PX');

      // Verifying if Portfolio widget is populated with "LION:F0000022PX"
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathPortfolioWidget).getText().then(function(val) {
        if (val !== 'LION:F0000022PX') {
          expect(false).customError('Portfolio widget is not populated with "LION:F0000022PX"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Weight" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights', true).then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
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
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should perform double click on  "Stat table" column', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', 'Stat table').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Verifying if "Down" arrow button display next to "Stat table"', function() {
      PA3MainPage.verifyArroButtonDirectionInColumnHeader('Weights', 'Down').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Down" button did not display next to "Stat table" column');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should perform double click on  "Stat table" column', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', 'Stat table').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Verifying if "Up" arrow button display next to "Stat table"', function() {
      PA3MainPage.verifyArroButtonDirectionInColumnHeader('Weights', 'Up').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Up" button did not display next to "Stat table" column');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should scroll to the bottom of the grid to load data in the grid', function() {
      SlickGridFunctions.scrollGridElements();
    });

    it('Verifying if "@NA" display at last position in Stat table column', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Stat table').then(function(colData) {
        var arrLength = colData.length;
        if (colData[arrLength - 1] !== '@NA') {
          expect(false).customError('"@NA" did not display at last position');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 676206', function() {

    it('Verifying if grouping name is "Security Name"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(text) {
        if (text !== 'Security Name') {
          expect(false).customError('Grouping name is not "Security Name"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Security Name" hyperlink', function() {
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

    it('Should expand "Personal" from Available section hover on "stat table" and click on remove button', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
      group.expand();
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Personal', 'Stat table', 'last').then(function(indexOfElement) {
            var action = group.getItemByIndex(indexOfElement);

            // Click on the "remove" icon
            return action.then(function(remove) {
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

    it('Should click on "OK" on Dialog box "Delete Column" ', function() {
      ThiefHelpers.getDialogButton('Delete Column', 'OK').click().then(function() {
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

    it('Should wait for "Weight" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights', true).then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
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
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Stat table" column did not display in the report', function() {
      SlickGridFunctions.getColumnNames('Weights').then(function(colName) {
        if (colName.indexOf('Stat table') > 0) {
          expect(false).customError('"Stat table" column did not remove from the report; Found: ' + colName);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
