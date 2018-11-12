'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: columns-date-sort', function() {

  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  describe('Test Step ID: 711997', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:;Pa3;Columns;sort date column"', function() {
      PA3MainPage.switchToDocument('columns-date-sort');
    });

    it('Verifying if the "Security Detail" report is calculated', function() {
      PA3MainPage.isReportCalculated('Security Detail').then(function(calculated) {
        if (!calculated) {
          expect(false).customError('"Security Detail" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Security Detail')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any calculation error appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "Not transposed" report is selected from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Fundamental Risk', 'Not transposed').isSelected().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Not transposed" report is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Symbol" column data is already sorted in descending order', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Security Detail', 'Symbol').then(function(arrOfColumnData) {
        // Removing first empty element
        arrOfColumnData.splice(0, 1);
        for (var i = 0; i < arrOfColumnData.length - 1; i++) {
          if (arrOfColumnData[i] < arrOfColumnData[i + 1]) {
            expect(false).customError('"Symbol" column is not in sorted order" Found: ' + arrOfColumnData);
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });

  });

  describe('Test Step ID: 711998', function() {

    it('Should double click on "Maturity Date" column header', function() {
      SlickGridFunctions.getHeaderCellReference('Security Detail', 'Maturity Date').then(function(ref) {
        // Double clicking on the cell
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Verifying if the "Security Detail" report is calculated', function() {
      PA3MainPage.isReportCalculated('Security Detail').then(function(calculated) {
        if (!calculated) {
          expect(false).customError('"Security Detail" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Security Detail')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any calculation error appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var dateBeforeSorting = [];
    var arrOfDate = [];
    var dateAfterSorting = [];

    it('Copying date for later verification', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Security Detail', 'Maturity Date').then(function(arrOfColumnData) {
        // Removing last three @NA
        for (var j = arrOfColumnData.length; j--;) {
          if (arrOfColumnData[j] === '@NA') {
            arrOfColumnData.splice(j, 1);
          }
        }

        // Removing first empty element
        arrOfColumnData.splice(0, 1);

        //Storing date in empty array
        arrOfColumnData.forEach(function(date) {
          dateBeforeSorting.push(date);
          arrOfDate.push(date);
        });
      });
    });

    it('Sorting date in descending order manually', function() {
      Utilities.sortDates(arrOfDate, 'descending').then(function(date) {

        //Storing sorted date in empty array
        date.forEach(function(sortDate) {
          dateAfterSorting.push(sortDate);
        });
      });
    });

    it('Verifying if "Maturity Date" column data is sorted in descending order', function() {
      dateAfterSorting.forEach(function(sortedDate, index) {
        if (sortedDate !== dateBeforeSorting[index]) {
          expect(false).customError('Date is not sorted in descending order; Expected: "' + sortedDate + '" Found: ' + dateBeforeSorting[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 711999', function() {

    it('Should double click on "Maturity Date" column header', function() {
      SlickGridFunctions.getHeaderCellReference('Security Detail', 'Maturity Date').then(function(ref) {
        // Double clicking on the cell
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Verifying if the "Security Detail" report is calculated', function() {
      PA3MainPage.isReportCalculated('Security Detail').then(function(calculated) {
        if (!calculated) {
          expect(false).customError('"Security Detail" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Security Detail')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any calculation error appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var dateBeforeSorting = [];
    var arrOfDate = [];
    var dateAfterSorting = [];

    it('Copying date for later verification', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Security Detail', 'Maturity Date').then(function(arrOfColumnData) {
        // Removing last three @NA
        for (var j = arrOfColumnData.length; j--;) {
          if (arrOfColumnData[j] === '@NA') {
            arrOfColumnData.splice(j, 1);
          }
        }

        // Removing first empty element
        arrOfColumnData.splice(0, 1);

        //Storing date in empty array
        arrOfColumnData.forEach(function(date) {
          dateBeforeSorting.push(date);
          arrOfDate.push(date);
        });
      });
    });

    it('Sorting date in ascending order manually', function() {
      Utilities.sortDates(arrOfDate, 'ascending').then(function(date) {

        //Storing sorted date in empty array
        date.forEach(function(sortDate) {
          dateAfterSorting.push(sortDate);
        });
      });
    });

    it('Verifying if "Maturity Date" column data is sorted in ascending order', function() {
      dateAfterSorting.forEach(function(sortedDate, index) {
        if (sortedDate !== dateBeforeSorting[index]) {
          expect(false).customError('Date is not sorted in descending order; Expected: "' + sortedDate + '" Found: ' + dateBeforeSorting[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 712000', function() {

    it('Should select "Transposed" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Fundamental Risk', 'Transposed').then(function(ele) {
        ele.click();
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Transpose" report selected in LHP
      ThiefHelpers.getNavepaneItemReference('Reports', 'Fundamental Risk', 'Transposed').isSelected().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Not transposed" report is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Security Detail" report is calculated', function() {
      PA3MainPage.isReportCalculated('Security Detail').then(function(calculated) {
        if (!calculated) {
          expect(false).customError('"Security Detail" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Security Detail')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any calculation error appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var dateBeforeSorting = [];
    var arrOfDate = [];
    var dateAfterSorting = [];

    it('Copying date for later verification', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Security Detail', 'Maturity Date').then(function(arrOfColumnData) {
        // Removing last three @NA
        for (var j = arrOfColumnData.length; j--;) {
          if (arrOfColumnData[j] === '@NA') {
            arrOfColumnData.splice(j, 1);
          }
        }

        // Removing first empty element
        arrOfColumnData.splice(0, 1);

        //Storing date in empty array
        arrOfColumnData.forEach(function(date) {
          dateBeforeSorting.push(date);
          arrOfDate.push(date);
        });
      });
    });

    it('Sorting date in descending order manually', function() {
      Utilities.sortDates(arrOfDate, 'descending').then(function(date) {

        //Storing sorted date in empty array
        date.forEach(function(sortDate) {
          dateAfterSorting.push(sortDate);
        });
      });
    });

    it('Verifying if "Maturity Date" column data is sorted in descending order', function() {
      dateAfterSorting.forEach(function(sortedDate, index) {
        if (sortedDate !== dateBeforeSorting[index]) {
          expect(false).customError('Date is not sorted in descending order; Expected: "' + sortedDate + '" Found: ' + dateBeforeSorting[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 712001', function() {

    it('Should double click on "Maturity Date" column header', function() {
      SlickGridFunctions.getHeaderCellReference('Security Detail', 'Maturity Date').then(function(ref) {
        // Double clicking on the cell
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Verifying if the "Security Detail" report is calculated', function() {
      PA3MainPage.isReportCalculated('Security Detail').then(function(calculated) {
        if (!calculated) {
          expect(false).customError('"Security Detail" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Security Detail')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any calculation error appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var dateBeforeSorting = [];
    var arrOfDate = [];
    var dateAfterSorting = [];

    it('Copying date for later verification', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Security Detail', 'Maturity Date').then(function(arrOfColumnData) {
        // Removing last three @NA
        for (var j = arrOfColumnData.length; j--;) {
          if (arrOfColumnData[j] === '@NA') {
            arrOfColumnData.splice(j, 1);
          }
        }

        // Removing first empty element
        arrOfColumnData.splice(0, 1);

        //Storing date in empty array
        arrOfColumnData.forEach(function(date) {
          dateBeforeSorting.push(date);
          arrOfDate.push(date);
        });
      });
    });

    it('Sorting date in ascending order manually', function() {
      Utilities.sortDates(arrOfDate, 'ascending').then(function(date) {

        //Storing sorted date in empty array
        date.forEach(function(sortDate) {
          dateAfterSorting.push(sortDate);
        });
      });
    });

    it('Verifying if "Maturity Date" column data is not sorted in ascending order', function() {
      var flag = 0;
      dateAfterSorting.forEach(function(sortedDate, index) {
        if (sortedDate === dateBeforeSorting[index]) {
          flag++;
          if (index === (dateBeforeSorting.length - 1)) {
            if (flag === dateBeforeSorting.length) {
              expect(false).customError('Dates are sorted in ascending order');
              CommonFunctions.takeScreenShot();
            }
          }
        }
      });
    });

    it('Verifying if "Maturity Date" column data is sorted', function() {
      var flag = 0;
      dateBeforeSorting.forEach(function(ascendOrder, index) {
        if (dateAfterSorting[index] !== ascendOrder) {
          flag++;
          if (index === (dateBeforeSorting.length - 1)) {
            if (flag === 0) {
              expect(false).customError('Dates in report are sorted');
              CommonFunctions.takeScreenShot();
            }
          }
        }
      });
    });

  });

  describe('Test Step ID: 776770', function() {

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Security Detail', 'Security Name');

    it('Should select "Columns" from LHP', function() {
      ThiefHelpers.getOptionsPaneItemReference('Columns').select();
    });

    it('Verifying if "Columns" is selected from LHP', function() {
      // Verifying if "Columns" is selected from LHP
      ThiefHelpers.getOptionsPaneItemReference('Columns').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Columns is not selected in the options pane');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // The below code is a work around for removing any existing groupings

    CommonPageObjectsForPA3.expandAVirtualListBoxGroupAndDeleteItem('Client', xpathOfAvailableSection, 'Edit-col-right', 'Column', 'OK');

    // The below code is a work around for removing any existing groupings

    CommonPageObjectsForPA3.expandAVirtualListBoxGroupAndDeleteItem('Personal', xpathOfAvailableSection, 'col-right', 'Column', 'OK');

    // The below code is a work around for removing any existing groupings

    CommonPageObjectsForPA3.expandAVirtualListBoxGroupAndDeleteItem('Document', xpathOfAvailableSection, 'Refcol-right', 'Column', 'OK');

    CommonPageObjectsForPA3.clickOnAddButtonAndSelectOptionFromDropdown('New/Reference', 'Columns');

    it('Verifying if the "New" radio button is selected', function() {
      ThiefHelpers.getRadioClassReference('New').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"New" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Enter formula into the section, click on the X Close butoon and verify the formula entered
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

    // Enter formula into the section, click on the X Close butoon and verify the formula entered
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Sort Formula', 'LOOKUP_OFDB_COL("CLIENT:/PA3/Grouping/SORT_COUNTRY_TEST.OFDB",LBC_COUNTRY(#SD),"COUNTRY","SORT")', undefined, undefined, 'X Close', 'LOOKUP_OFDB_COL("CLIENT:/PA3/Grouping/SORT_COUNTRY_TEST.OFDB",LBC_COUNTRY(#SD),"COUNTRY","SORT")');

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

    var values = [{name:100,value:'peru'},{name:150,value:'Austria'},{name:200,value:'Belgium'},{name:250,value:'Bermuda'},{name:300,value:'Brazil'},{name:350,value:'Denmark'},{name:400,value:'Finland'},{name:450,value:'France'},{name:500,value:'Germany'},{name:550,value:'Hungary'},{name:600,value:'Ireland'},{name:650,value:'Israel'},{name:700,value:'Italy'},{name:750,value:'Japan'},{name:800,value:'Mexico'},{name:850,value:'Netherlands'},{name:900,value:'Norway'},{name:950,value:'Panama'},{name:1000,value:'Canada'},{name:1050,value:'Chile'},{name:1100,value:'China'},{name:1150,value:'Colombia'},{name:1200,value:'Australia'}];

    values.forEach(function(keyName, index) {
      it('Should enter "' + keyName.name + '" as key name for Key column', function() {
        CreateEditCustomColumns.getCellReference(index, 'Key').then(function(ref) {
          browser.actions().doubleClick(ref).perform();

          // Input specific key value
          CreateEditCustomColumns.getInputBoxFromSlickGridRow().sendKeys(keyName.name, protractor.Key.ENTER);
        });
      });

      it('Should enter "' + values[index].value + '" as value name for Value column', function() {
        CreateEditCustomColumns.getCellReference(index, 'Value').then(function(ref) {
          browser.actions().doubleClick(ref).perform();

          // Input specific key value
          CreateEditCustomColumns.getInputBoxFromSlickGridRow().sendKeys(values[index].value, protractor.Key.ENTER);
        });
      });
    });

    it('Verifying if numeric values are displaying under Key column', function() {
      var flag = 0;
      var errorval;
      var errorindex;
      CreateEditCustomColumns.getColumnData('Key').then(function(columnData) {
        columnData.forEach(function(text,index) {
          if (typeof parseInt(text) !== 'number' && text == values[index].name) {
            flag = 1;
            errorval = text;
            errorindex = index;
          }
        });
        if (flag == 1) {
          expect(false).customError(+errorval + 'did not display as numeric for "Key" column at index' + errorindex);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if Country values are displayed as strings under Value column', function() {
      var flag = 0;
      var errorval;
      var errorindex;
      CreateEditCustomColumns.getColumnData('Value').then(function(columnData) {
        columnData.forEach(function(text,index) {
          if (!isNaN(parseInt(text)) && text !== values[index].value) {
            flag = 1;
            errorval = text;
            errorindex = index;
          }
        });
        if (flag == 1) {
          expect(false).customError(+errorval + 'did not display as string for "Value" column at index' + errorindex);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 776771', function() {

    CommonPageObjectsForPA3.selectDirectoryAndSubDirectoryAndVerify(undefined, 'Client');

    it('Should enter "Edit-col-right" in Name field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Edit-col-right');

      // Verifying that "Name" field is set to "Edit-col-right"
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Edit-col-right') {
          expect(false).customError('"Name" field did not set to "Edit-col-right"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Columns');

    it('Should expand "Client" from "Available" container and double click on "Edit-col-right" to add it to "Selected" section', function() {
      var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Client', 'Edit-col-right', 'last').then(function(indexOfElement) {
            var item = group.getItemByIndex(indexOfElement);
            item.then(function(listItem) {
              listItem.select();
              listItem.doubleClick();
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

    it('Verifying that "Edit-col-right" is added to the "Selected" section', function() {
      var myArray = [];
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Edit-col-right') === -1) {
          expect(false).customError('"Edit-col-right" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Security');

    it('Verifying if "Edit-col-right" column is added to the "Security Detail" report', function() {
      SlickGridFunctions.getColumnNames('Security Detail').then(function(option) {
        if (option.indexOf('Edit-col-right') < 0) {
          expect(false).customError('"Edit-col-right" column is not added to the "Security Detail" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 776772', function() {

    it('Should right click on "Edit-col-right" in "Security Detail" report and select "Columns > Edit Column..." ', function() {
      PA3MainPage.getAllColumnOfCalculatedReport('Security Detail').each(function(element) {
        Utilities.scrollElementToVisibility(element);
        element.getText().then(function(text) {
          var name = text.replace(/\n/g, ' ');
          if (name === 'Edit-col-right') {
            PA3MainPage.rightClickAndSelectOption(element, 'Columns|Edit Column…');
          }
        });
      });
    });

    it('Verifying that "Columns" dialog box appeared', function() {
      ThiefHelpers.isDialogOpen('Columns', undefined, undefined).then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Columns" dialog box has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should clear the text (LBC_COUNTRY(#SD)) in the Formula section', function() {
      CommonPageObjectsForPA3.clearTextInCodeMirror();
    });

    // Enter formula into the section, click on the X Close butoon and verify the formula entered
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'P_PRICE', undefined, undefined, 'X', 'P_PRICE');

    it('Should click outside the type ahead to close it', function() {
      element(by.xpath(CreateEditCustomColumns.xpathClick)).click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Making Ignore Synchronization true to handle loading icon', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click on "Save" button to save the settings', function() {
      ThiefHelpers.getButtonClassReference(undefined, CreateEditCustomColumns.getButton('Save')).press().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Save" button' + err);
      });
    });

    // FYI The below code performs negative testing since the steps in QAI cannot be performed due to known issue FEPA-1336.

    it('Verify if the security report is not recalculated', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Security Detail'), 60000);

      // Verifying report is recalculated
      PA3MainPage.getReportCalculationDlg('Security Detail').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"The Weights report is not getting recalculated. The issue FEPA-1336 is resolved');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Making Ignore Synchronization false', function() {
      browser.ignoreSynchronization = false;
    });

  });

  describe('Test Step ID: 808645', function() {

    it('Should right click on "Edit-col-right" in "Security Detail" report and select "Columns > Edit Column..." ', function() {
      PA3MainPage.getAllColumnOfCalculatedReport('Security Detail').each(function(element) {
        Utilities.scrollElementToVisibility(element);
        element.getText().then(function(text) {
          var name = text.replace(/\n/g, ' ');
          if (name === 'Edit-col-right') {
            PA3MainPage.rightClickAndSelectOption(element, 'Columns|Edit Column…');
          }
        });
      });
    });

    //verify if columns dialog is opened
    it('Verifying that "Columns" dialog box appeared', function() {
      ThiefHelpers.isDialogOpen('Columns', undefined, undefined).then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Columns" dialog box has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror('Formula', undefined, 'P_PRICE', true);

  });

  describe('Test Step ID: 807301', function() {

    CommonPageObjectsForPA3.selectDirectoryAndSubDirectoryAndVerify('Personal', 'Personal');

    it('Should replace "Edit-col-right" with "col-right" from the "Name" field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('col-right');

      // Verifying that "col-right" is typed into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'col-right') {
          expect(false).customError('"col-right" is not present in the "Name" field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save As" button to save the settings', function() {
      ThiefHelpers.getButtonClassReference(undefined, CreateEditCustomColumns.getButton('Save As')).press().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Save As" button' + err);
      });
    });

    it('Making Ignore Synchronization true to handle loading icon', function() {
      browser.ignoreSynchronization = true;
    });

    it('Verifying if the report does not re-calculate.', function() {
      PA3MainPage.getReportCalculationDlg().isPresent().then(function(bool) {
        if (bool) {
          expect(false).customError('The report is recalculating');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Making Ignore Synchronization false', function() {
      browser.ignoreSynchronization = false;
    });

  });

  describe('Test Step ID: 807695', function() {

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Security Detail', 'Security Name');

    it('Should select "Columns" from LHP', function() {
      ThiefHelpers.getOptionsPaneItemReference('Columns').select();

      // Verifying if "Columns" is selected from LHP
      ThiefHelpers.getOptionsPaneItemReference('Columns').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Columns is not selected in the options pane');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var group;
    var arrElements = [];
    it('Should expand "Personal" from "Available" container', function() {
      var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');
      group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
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

    it('Verifying that "col-right" is displayed at the bottom in the "Personal" directory', function() {
      if (arrElements.indexOf('col-right') !== -1) {
        if (arrElements[arrElements.length - 1] !== 'col-right') {
          expect(false).customError('"col-right" is not displayed at the bottom in the "Personal" directory');
          CommonFunctions.takeScreenShot();
        }
      } else {
        expect(false).customError('"col-right" is not present in the "Personal" directory');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test Step Id: 776792', function() {

    CommonPageObjectsForPA3.clickOnAddButtonAndSelectOptionFromDropdown('New/Reference', 'Columns');

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

    it('Should double click on "Col 1: Port. Ending Weight" from the "Formula" tab', function() {
      var xpathOfFormulaTextArea = element(by.xpath(CreateEditCustomColumns.xpathOfFormulaTextArea));
      ThiefHelpers.getVirtualListboxClassReference(xpathOfFormulaTextArea).getItemByText('Col 1: Port. Ending Weight').doubleClick();
    });

    // Verify if text is present in the formula section after selection option from typeahead
    CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror('Formula', undefined, 'COL1', true);

    it('Should enter "Refcol-right" in Name field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Refcol-right');

      // Verifying that "Name" field is set to "Refcol-right"
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Refcol-right') {
          expect(false).customError('"Name" field did not set to "Refcol-right"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Columns');

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Security');

    it('Verifying if "Refcol-right" column is added to the "Security Detail" report', function() {
      SlickGridFunctions.getColumnNames('Security Detail').then(function(option) {
        if (option.indexOf('Refcol-right') < 0) {
          expect(false).customError('"Refcol-right" column is not added to the "Security Detail" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 776777', function() {

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Security Detail', 'Security Name');

    it('Should select "Columns" from LHP', function() {
      ThiefHelpers.getOptionsPaneItemReference('Columns').select();

      // Verifying if "Columns" is selected from LHP
      ThiefHelpers.getOptionsPaneItemReference('Columns').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Columns is not selected in the options pane');
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

    CommonPageObjectsForPA3.expandAVirtualListBoxGroupAndDeleteItem('Client', xpathOfAvailableSection, 'Edit-col-right', 'Column', 'OK');

    CommonPageObjectsForPA3.expandAVirtualListBoxGroupAndDeleteItem('Document', xpathOfAvailableSection, 'Refcol-right', 'Column', 'OK');

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Security');

    it('Verifying that "Edit-col-right and Refcol-right" columns are removed from the calculated report', function() {
      PA3MainPage.getAllColumnOfCalculatedReport('Security Detail').then(function(references) {
        references.forEach(function(eleRef) {
          if (eleRef === 'Edit-col-right' || eleRef === 'Refcol-right') {
            expect(false).customError('"Edit-col-right and Refcol-right" columns are not removed from the calculated report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

});
