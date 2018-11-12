'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: multi-sort', function() {

  var values = [];
  var securities = [];
  var bloombergRatingColumn = [];

  // Local functions
  var getRequiredReportColumnData = function() {

    it('Getting the required column values from the report with respect to other columns', function() {
      var group1Found;
      var parentID;
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(rowRef, index) {
          if (rowRef[0] === '1. S&amp;P 100' && rowRef.metadata.type === 'group') {
            SlickGridFunctions.scrollRowToTop('Weights', index);
            group1Found = true;
            parentID = rowRef.id;
            if (rowRef.expanded) {
              dataView.forEach(function(element) {
                if (parentID === element.parentId && element.metadata.type !== 'group') {
                  securities.push(element[0]);
                  values.push(element[2]);
                }
              });
            } else {
              expect(false).customError('"1. S&P 100" grouping is present in the report but it is not expanded by default');
              CommonFunctions.takeScreenShot();
            }
          } else if (rowRef[0] === '2. Bloomberg Barclays US Aggregate' && rowRef.metadata.type === 'group') {
            SlickGridFunctions.scrollRowToTop('Weights', index);
            group1Found = true;
            parentID = rowRef.id;
            if (rowRef.expanded) {
              dataView.forEach(function(element) {
                if (parentID === element.parentId && element.metadata.type !== 'group') {
                  bloombergRatingColumn.push(element[4]);
                }
              });
            } else {
              expect(false).customError('"1. S&P 100" grouping is present in the report but it is not expanded by default');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });
  };

  var selectRequiredDropdownUnderSection = function(optionTitle, existingName, optionName, occurreceNumber) {
    it('Select the option "' + optionName + '" from the "' + optionTitle + '" after verifying the existing option "' + existingName + '"', function() {
      PA3MainPage.getSortDialogOptions('dropdown', optionTitle, existingName).then(function(arrOfReferenceOfDropdown) {
        ThiefHelpers.selectOptionFromDropDown(optionName, undefined, arrOfReferenceOfDropdown[occurreceNumber]);

        ThiefHelpers.verifySelectedDropDownText(optionName, undefined, arrOfReferenceOfDropdown[occurreceNumber]);
      });
    });
  };

  describe('Test Step ID: 694962', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:;Pa3;Columns;multisort_fallback"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('multisort-fallback');
    });

    it('Verifying if header displays "S&P 100 vs Bloomberg Barclays US Aggregate"', function() {
      PA3MainPage.getHeader().getText().then(function(text) {
        if (text !== 'S&P 100 vs Bloomberg Barclays US Aggregate') {
          expect(false).customError('Header of application is not showing "S&P 100 vs Bloomberg Barclays US Aggregate".' +
            'Expected: "S&P 100 vs Bloomberg Barclays US Aggregate", Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 694963', function() {

    // Click on "Wrench" icon and select "Sorting" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights', 'Sorting');

    it('Verifying if "Sorting" dialog appeared', function() {
      ThiefHelpers.isDialogOpen('Sorting').then(function(option) {
        if (!option) {
          expect(false).customError('"Sorting" dialog is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrOfSection = ['Sort Groups by:', 'Sort Securities By:'];
    var arrOfDropdown = ['Market Capitalization', 'Security Name'];
    var arrRadioButtons = ['Ascending', 'Descending'];

    arrOfSection.forEach(function(sectionName, index) {
      it('verifying if "' + arrOfDropdown[index] + '" drop down is present under "' + sectionName + '" section', function() {
        ThiefHelpers.verifySelectedDropDownText(arrOfDropdown[index], sectionName);
      });

      arrRadioButtons.forEach(function(radioButtonName) {
        it('Verify if "' + radioButtonName + '" button is present under "' + sectionName + '" section', function() {
          PA3MainPage.getSortDialogOptions('Radio', sectionName, radioButtonName).isPresent().then(function(status) {
            if (!status) {
              expect(false).customError('"' + radioButtonName + '" radio button not is present under "' + sectionName + '" section');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

      it('Verifying if "Absolute Value" checkbox is present under "' + sectionName + '" section', function() {
        PA3MainPage.getSortDialogOptions('checkbox', sectionName, 'Absolute Value').isPresent().then(function(status) {
          if (!status) {
            expect(false).customError('"Absolute Value" checkbox is not present under "' + sectionName + '" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var arrOfButtonsTypes = ['Dropdown', 'radio', 'radio', 'checkbox'];
    var arrOfButtonNames = ['None', 'Ascending', 'Descending', 'Absolute Value'];

    arrOfButtonsTypes.forEach(function(buttonType, index) {
      it('Verifying if 3 "' + buttonType + '" with "' + arrOfButtonNames[index] + '" name are present in "Sort Securities By:"' +
        ' section under "Then:"', function() {
        PA3MainPage.getSortDialogOptions(buttonType, 'Then by:', arrOfButtonNames[index]).count().then(function(count) {
          if (count !== 3) {
            expect(false).customError('3 "' + buttonType + '"s are present in "Sort Securities By:" section under "Then:".');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 694964', function() {

    // Select the required drop-down options and verify the same
    selectRequiredDropdownUnderSection('Then by:', 'None', 'Security Name', 0);

    // Select the required drop-down options and verify the same
    selectRequiredDropdownUnderSection('Sort Securities By:', 'None', 'Market Capitalization', 0);

    // Select the required drop-down options and verify the same
    selectRequiredDropdownUnderSection('Then by:', 'Security Name', 'Strike Price', 0);

    // Select the required drop-down options and verify the same
    selectRequiredDropdownUnderSection('Then by:', 'None', 'Bloomberg Barclays Capital Credit Rating', 0);

    // Click on the "OK" button in "Sorting" dialog
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('OK', 'Sorting');

    it('Should click on the "1. S&P 100" group collapse button', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', '1. S&P 100');

      // Verifying that "1. S&P 100" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', '1. S&P 100');
    });

    // Getting all the values under "Market Capitalization" from the report
    getRequiredReportColumnData();

    it('Verifying if "Market Capitalization" values are displayed in descending order', function() {
      for (var i = 0; i < values.length - 1; i++) {
        if (Number(values[i]) < Number(values[i + 1])) {
          expect(false).customError('"Bench. Weight" column values did not in descending order; First Value: "' + values[i] + '" Second value "' + values[i + 1] + '"');
          CommonFunctions.takeScreenShot();
        }
      }
    });

    it('Should click on the "1. S&P 100" group collapse button', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', '1. S&P 100');
    });

    // Verifying if NR is displayed at the END of the series
    var verifyIfNRIsDisplayedAtTheEnd = function(index) {
      for (var i = 0; i < bloombergRatingColumn.length - 1; i++) {
        var indexOfNR = index + i;
        if (indexOfNR < bloombergRatingColumn.length) {
          if (bloombergRatingColumn[indexOfNR] !== 'NR') {
            expect(false).customError('Expected: "BA3" to be displayed above "NR" but ' +
              'Found: "' + bloombergRatingColumn[bloombergRatingColumn.length - 1] + '".');
            CommonFunctions.takeScreenShot();
          }
        }
      }
    };

    // Verifying if BA3 is displayed above NR
    var verifySequence = function() {
      for (var i = 0; i < bloombergRatingColumn.length - 1; i++) {
        if (bloombergRatingColumn[i] === 'NR') {
          if (bloombergRatingColumn[i - 1] == 'BA3') {
            verifyIfNRIsDisplayedAtTheEnd(i);
          }
        }
      }
    };

    it('Verifying if "Securities" in the "Bloomberg Barclays US Aggregate" grouping are sorted in Ascending order by ' +
      '"Bloomberg Barclays Capital Credit" rating column From(AAA ...BAA3, Ba3,NR)', function() {
      if (bloombergRatingColumn[0] === 'AAA') {
        if (bloombergRatingColumn[bloombergRatingColumn.length - 1] === 'NR') {

          // Verifying if BA3 is displayed above NR
          verifySequence();
        } else {
          expect(false).customError('Last value is not displayed as "NR". Found: "' + bloombergRatingColumn[bloombergRatingColumn.length - 1] + '"');
          CommonFunctions.takeScreenShot();
        }
      } else {
        expect(false).customError('Expected: "AAA" but Found: "' + bloombergRatingColumn[0] + '".');
        CommonFunctions.takeScreenShot();
      }
    });

    var arrOFFirstElements = [];
    var arrOFSecondElements = [];
    it('Getting the Bloomberg berg column values', function() {
      bloombergRatingColumn.forEach(function(value) {
        if (value[0] === 'A') {
          arrOFFirstElements.push(value);
        } else if (value[0] === 'B') {
          arrOFSecondElements.push(value);
        }
      });
    });

    var arrOFElements = [];
    it('Sorting the column values manually', function() {
      arrOFFirstElements.reverse();
      arrOFFirstElements.reverse();
      arrOFSecondElements.reverse();
      arrOFSecondElements.reverse();
      arrOFElements = arrOFFirstElements.concat(arrOFSecondElements);
    });

    it('Verifying if "Securities" in the "Bloomberg Barclays US Aggregate" grouping are sorted in Ascending order by' +
      ' "Bloomberg Barclays Capital Credit" rating column from(AAA ...BAA3, Ba3,NR)', function() {
      arrOFElements.forEach(function(item, index) {
        if (item !== bloombergRatingColumn[index]) {
          expect(false).customError('Security names are not present in ascending order under Bloomberg Barclays US Aggregate; Expected: "' + item + '"' +
            ' Found: ' + bloombergRatingColumn[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 694965', function() {

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights', 'Options');

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - Weights" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Columns" tab on the LHP of tile options view', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').select();

      // Verifying if "Columns" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Columns" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Hover over "Market Capitalization" from "Selected" section and click on the "Remove" icon', function() {
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

      var action = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Market Capitalization');

      // Hover on "Market Capitalization" and click on remove button
      return action.getActions().then(function(remove) {
        return remove.triggerAction('remove');
      });
    });

    it('Verifying that "Market Capitalization" column is deleted from "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Market Capitalization').isPresent().then(function(option) {
        if (option) {
          expect(option).customError('"Market Capitalization" column was not deleted from "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'Index out of bound') {
          expect(true).toBeTruthy();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should click on the "1. S&P 100" group collapse button', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', '1. S&P 100');

      // Verifying that "1. S&P 100" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', '1. S&P 100');
    });

    // Getting the data from the required column
    getRequiredReportColumnData();

    it('Verifying if "Securities" in the "1. S&P 100" securities are in Ascending order', function() {
      var arrElement = securities;
      securities.sort();
      arrElement.forEach(function(item, index) {
        if (item !== securities[index]) {
          expect(false).customError('All security name did not present in ascending order under 1. S&P 100; Expected: "' + item + '"; Found: ' + securities[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 694966', function() {

    // Click on "Wrench" icon and select "Sorting" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights', 'Sorting');

    it('Verifying if "Sorting" dialog appeared', function() {
      ThiefHelpers.isDialogOpen('Sorting').then(function(option) {
        if (!option) {
          expect(false).customError('"Sorting" dialog is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('verifying if "Security Name" is selected from "Sort Groups by:" section drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Security Name', 'Sort Groups by:');
    });

  });

  describe('Test Step ID: 694982', function() {

    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('OK', 'Sorting');

    it('Expand "1. S&P 100" group in the caculated report', function() {
      PA3MainPage.isTreeExpanded('Weights', '1. S&P 100').then(function() {
      }, function(status) {
        if (status === false) {
          PA3MainPage.expandTreeInCalculatedReport('Weights', '1. S&P 100');

          // Verifying that "1. S&P 100" is expanded
          PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', '1. S&P 100');
        }
      });
    });

    it('Double click on "Port. Ending Weight" column in the "Weights" report to sort descendingly', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', 'Port. Ending Weight').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    // Click on "Wrench" icon and select "Sorting" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights', 'Sorting');

    it('verifying if "Port. Ending Weight" is selected from "Sort Securities By:" section drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Port. Ending Weight', 'Sort Securities By:');
    });

    it('Verify if one "Descending" button is selected in "Sort Securities By:" section', function() {
      PA3MainPage.getSortDialogOptions('Radio', 'Sort Securities By:', 'Descending').then(function(arrOfReferenceOfDropdown) {
        ThiefHelpers.getRadioClassReference(undefined, arrOfReferenceOfDropdown[0]).isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Descending" button is selected in "Sort Securities By:" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 694983', function() {

    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('OK', 'Sorting');

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Performance', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Performance');

    // Double clicking twice as "unable to sort for once" Known issue RPD:31550966
    it('Double click on "Port. Ending Weight" column in the "Weights" report', function() {
      SlickGridFunctions.getHeaderCellReference('Performance', '', '').then(function(ref) {
        for (var i = 0; i < 2; i++) {
          browser.actions().doubleClick(ref).perform();
        }
      });

      // wait for the grid elements to load
      browser.sleep(2000);
    });

    var arrOfFirstDate = [];
    var arrOfLastDate = [];
    var arrOfFirstDateBeforeSort = [];
    var arrOfFirstDateAfterSort = [];
    var arrOfLastDateBeforeSort = [];
    var arrOfLastDateAfterSort = [];
    it('Getting the date column values from the report with respect to other columns', function() {
      SlickGridFunctions.getAllRowsFromReport('Performance').then(function(dataView) {
        dataView.forEach(function(rowRef) {
          if (rowRef[0] !== 'Total') {
            var colvalue = rowRef[0].split(' to ');
            arrOfFirstDateBeforeSort.push(colvalue[0]);
            arrOfFirstDate.push(colvalue[0]);
            arrOfLastDateBeforeSort.push(colvalue[1]);
            arrOfLastDate.push(colvalue[1]);
          }
        });
      });
    });

    it('Sorting date in descending order manually', function() {
      Utilities.sortDates(arrOfFirstDate, 'descending').then(function(date) {

        //Storing sorted date in empty array
        date.forEach(function(sortDate) {
          arrOfFirstDateAfterSort.push(sortDate);
        });
      });

      Utilities.sortDates(arrOfLastDate, 'descending').then(function(date) {

        //Storing sorted date in empty array
        date.forEach(function(sortDate) {
          arrOfLastDateAfterSort.push(sortDate);
        });
      });
    });

    it('Verifying if column data is sorted in descending order', function() {
      var needScreenShot = 0;
      arrOfFirstDateAfterSort.forEach(function(sortedDate, index) {
        if (sortedDate !== arrOfFirstDateBeforeSort[index]) {
          expect(false).customError('Date is not sorted in descending order; Expected: "' + sortedDate + '" Found: ' + arrOfFirstDateBeforeSort[index]);
          needScreenShot++;
          if (needScreenShot === 1) {
            CommonFunctions.takeScreenShot();
          }
        }
      });

      arrOfLastDateAfterSort.forEach(function(sortedDate, index) {
        if (sortedDate !== arrOfLastDateBeforeSort[index]) {
          expect(false).customError('Date is not sorted in descending order; Expected: "' + sortedDate + '" Found: ' + arrOfLastDateBeforeSort[index]);
          needScreenShot++;
          if (needScreenShot === 1) {
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });

  });

});
