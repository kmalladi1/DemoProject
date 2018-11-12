'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: buy-hold-bm', function() {

  var arrOfRowNames = ['Sara Lee Corp.', 'PepsiCo, Inc.'];
  var reportNames = ['Testing', 'Contribution-2'];

  var verifyValuesForGivenColumnAndRow = function(arrOfRowIndexes, reportName, columnName, expectedValue, status) {
    it('Verify if values are displayed as expected in the column "' + columnName + '"', function() {
      SlickGridFunctions.getRowData(reportName, columnName, '').then(function(arrOfRowValues) {
        arrOfRowIndexes.forEach(function(index) {
          if (!status) {
            if (arrOfRowValues[index + 1] === expectedValue) {
              expect(false).customError('Expected: value but Found: "' + arrOfRowValues[index + 1] + '".');
              CommonFunctions.takeScreenShot();
            }
          } else {
            if (arrOfRowValues[index + 1] !== expectedValue) {
              expect(false).customError('Expected: "--" but Found: "' + arrOfRowValues[index + 1] + '".');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });
  };

  describe('Test Step ID: 694984', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:/Pa3/Accounts/bh_bms" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('bh-bms');
    });

    reportNames.forEach(function(reportName) {
      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);
    });

  });

  describe('Test Step ID: 694985', function() {

    var testingReportFirstTwoMonthRanges = [];
    var testingReportSecondTwoMonthRangesAndTotal = [];
    it('Should store the "Testing report" values of date ranges for further use', function() {
      SlickGridFunctions.getMultiHeaderNames('Testing').then(function(arrOfMultiHeaderNames) {
        arrOfMultiHeaderNames.forEach(function(multiHeaderName, index) {
          if ((multiHeaderName === '07/01/2011 to 07/04/2011') || (multiHeaderName === '07/04/2011 to 07/05/2011')) {
            testingReportFirstTwoMonthRanges.push(index);
          } else if ((multiHeaderName === '07/05/2011 to 07/06/2011') || (multiHeaderName === '07/06/2011 to 07/07/2011') || (multiHeaderName === 'Total')) {
            testingReportSecondTwoMonthRangesAndTotal.push(index);
          }
        });
      });
    });

    arrOfRowNames.forEach(function(colName) {
      verifyValuesForGivenColumnAndRow(testingReportFirstTwoMonthRanges, 'Testing', colName, '--', false);

      verifyValuesForGivenColumnAndRow(testingReportSecondTwoMonthRangesAndTotal, 'Testing', colName, '--', true);
    });

    verifyValuesForGivenColumnAndRow(testingReportFirstTwoMonthRanges, 'Testing', 'Juniper Networks, Inc.', '--', true);

    verifyValuesForGivenColumnAndRow(testingReportSecondTwoMonthRangesAndTotal, 'Testing', 'Juniper Networks, Inc.', '--', false);

    var arrOfMonths = ['07/06/2011 to 07/07/2011', '07/07/2011 to 07/08/2011', 'Total'];
    var contributionReportFirstTwoMonthRanges = [];
    it('Should store the "contribution report" values of date ranges for further use', function() {
      SlickGridFunctions.getMultiHeaderNames('Testing').then(function(arrOfMultiHeaderNames) {
        arrOfMultiHeaderNames.forEach(function(multiHeaderName, index) {
          if (multiHeaderName.indexOf(arrOfMonths) !== -1) {
            contributionReportFirstTwoMonthRanges.push[index];
          }
        });
      });
    });

    verifyValuesForGivenColumnAndRow(contributionReportFirstTwoMonthRanges, 'Contribution-2', 'Juniper Networks, Inc.', '--', false);

    it('Verify if "Sara Lee Corp." and "" are not displayed under "Consumer Non-Durables" in "Contribution-2" Report', function() {
      SlickGridFunctions.getElementsFromTree('Contribution-2', '', 'Consumer Non-Durables', '').then(function(childNames) {
        childNames.forEach(function(itemName) {
          if (arrOfRowNames.indexOf(itemName) > -1) {
            expect(false).customError('"' + itemName + '" is displayed under "Consumer Non-Durables" in "Contribution-2" Report.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 694986', function() {

    it('Should click on the "Hamburger" icon next to "Portfolio" widget', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Add Portfolio Variation"/"+" button in Portfolio hamburger drop down', function() {
      element(by.xpath(PA3MainPage.xathAddPortfolioVarationButton)).click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Add Portfolio Variation"/"+" button in Portfolio hamburger drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Portfolio Variation" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen(2).then(function(status) {
        if (!status) {
          expect(false).customError('"Portfolio Variation" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Buy & Hold" from the Variation Type drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Buy & Hold', 'Variation Type');
    });

    it('Verifying if "Buy & Hold" is set to the Variation Type drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Buy & Hold', 'Variation Type');
    });

    var arrOfVariations = ['ROTH ACTM', 'Demo-Largecap', 'BH_MN'];
    it('Verifying if "ROTH ACTM", "Demo-Largecap" and "BH_MN" are displayed in "Portfolio" section', function() {
      PA3MainPage.getListOfPortfoliosFromAddPortfolioVariations().then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(itemRef) {
          itemRef.getText().then(function(value) {
            if (arrOfVariations.indexOf(value) === -1) {
              expect(false).customError(' "' + value + '" is not present in the "Portfolio" section.');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if "Report Start Date" is present in the "As Of:" input field', function() {
      ThiefHelpers.getDatepickerClassReference('As Of:').getDate().then(function(text) {
        if (text !== 'Report Start Date') {
          expect(false).customError('"Report Start Date" is not present in the "As Of:" input field.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if calender picker is displayed', function() {
      element(by.xpath(PA3MainPage.xpathCalenderIcon)).isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('Calender picker is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Reset Frequency:" is set to "None"', function() {
      ThiefHelpers.verifySelectedDropDownText('None', 'Reset Frequency:');
    });

    it('Should open "Reset Frequency:" dropdown', function() {
      ThiefHelpers.getDropDownSelectClassReference('Reset Frequency:').open();
    });

    var arrDropdownOptions = ['None', 'Weekly', 'Monthly', 'Quarterly', 'Semi-annually', 'Annually'];

    it('Verify if expected options are present in the "Reset Frequency" drop-down', function() {
      ThiefHelpers.getAllOptionsFromDropdown(3).then(function(ddElements) {
        ddElements.forEach(function(optionName, index) {
          if (optionName !== arrDropdownOptions[index]) {
            expect(false).customError('Expected "' + arrDropdownOptions[index] + '" but Found: "' + optionName + '".');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should close "Reset Frequency:" drop down', function() {
      element(by.xpath(CommonFunctions.replaceStringInXpath(PA3MainPage.xpathOfPortfolioVatiationDropdowns, 'Reset Frequency:'))).click().then(function() {
      }, function() {

        expect(false).customError('"Reset Frequency:"  drop-down is still open.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the "Use Actual Frequencies" checkbox is disabled by default', function() {
      ThiefHelpers.verifyStatusOfCheckbox('Use Actual Frequencies', undefined, 'isdisabled');
    });

    it('Verifying if "Show Benchmark Summary Dates for Tile" is set to "Testing"', function() {
      ThiefHelpers.verifySelectedDropDownText('Testing', 'Show Benchmark Summary Dates for Tile');
    });

  });

  describe('Test Step ID: 694987', function() {

    it('Should select "BH_MN" under the "Portfolios" section in the "Portfolio Variation" dialog', function() {
      PA3MainPage.getListOfPortfoliosFromAddPortfolioVariations().then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(itemRef) {
          itemRef.getText().then(function(value) {
            if (value === 'BH_MN') {
              itemRef.click().then(function() {
              }, function() {

                expect(false).customError('Unable to select "BH_MN" under the "Portfolios" section in the "Portfolio Variation" dialog');
                CommonFunctions.takeScreenShot();
              });
            }
          });
        });
      });
    });

    it('Should click on the "OK" button in portfolio variation dialog ', function() {
      ThiefHelpers.getButtonClassReference(undefined, CommonFunctions.replaceStringInXpath(PA3MainPage.xpathOfPortfolioVatiationOkOrCancelButtons, 'OK')).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button in portfolio variation dialog.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Hover and click on "X" icon next to "BH_MN (Buy & Hold) | As Of: Report Start Date | Rebalance: None" in Portfolio widget drop down', function() {
      PA3MainPage.getAccountDeleteButton('Portfolio', 'BH_MN (Buy & Hold) | As Of: Report Start Date | Rebalance: None').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "X" icon next to "BH_MN (Buy & Hold) | As Of: Report Start Date | Rebalance: None" in Portfolio widget drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "BH_MN (Buy & Hold) | As Of: Report Start Date | Rebalance: None" account is removed from Benchmark widget drop down', function() {
      PA3MainPage.getListFromAccountDropdown('Portfolio', true).then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(ref) {
          ref.getText().then(function(text) {
            if (text === 'BH_MN (Buy & Hold) | As Of: Report Start Date | Rebalance: None') {
              expect(false).customError('"BH_MN (Buy & Hold) | As Of: Report Start Date | Rebalance: None" account is not removed from Portfolio widget drop down');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Should click on "Add Portfolio Variation"/"+" button in Portfolio hamburger drop down', function() {
      element(by.xpath(PA3MainPage.xathAddPortfolioVarationButton)).click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Add Portfolio Variation"/"+" button in Portfolio hamburger drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Portfolio Variation" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen(2).then(function(status) {
        if (!status) {
          expect(false).customError('"Portfolio Variation" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Buy & Hold" from the Variation Type drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Buy & Hold', 'Variation Type');
    });

    it('Verifying if "Buy & Hold" is set to the Variation Type drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Buy & Hold', 'Variation Type');
    });

    it('Should select "BH_MN" under the "Portfolios" section in the "Portfolio Variation" dialog', function() {
      PA3MainPage.getListOfPortfoliosFromAddPortfolioVariations().then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(itemRef) {
          itemRef.getText().then(function(value) {
            if (value === 'BH_MN') {
              itemRef.click().then(function() {
              }, function() {

                expect(false).customError('Unable to select "BH_MN" under the "Portfolios" section in the "Portfolio Variation" dialog');
                CommonFunctions.takeScreenShot();
              });
            }
          });
        });
      });
    });

    it('Should click on the "OK" button in portfolio variation dialog ', function() {
      ThiefHelpers.getButtonClassReference(undefined, CommonFunctions.replaceStringInXpath(PA3MainPage.xpathOfPortfolioVatiationOkOrCancelButtons, 'OK')).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button in portfolio variation dialog.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Portfolio Variation" drop down is closed', function() {
      ThiefHelpers.isDropDownOpen(2, false).then(function(status) {
        if (status) {
          expect(false).customError('"Portfolio Variation" drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in Portfolio hamburger drop down', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button in Portfolio hamburger drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('verifying if Portfolio Hamburger drop down is closed', function() {
      ThiefHelpers.isDropDownOpen(1, false).then(function(status) {
        if (status) {
          expect(false).customError('Portfolio Hamburger drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var reportNames = ['Testing', 'Contribution-2'];

    reportNames.forEach(function(reportName) {
      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);
    });

    arrOfRowNames.forEach(function(rowName) {
      it('Verifying if values are displayed for all the columns in "' + rowName + '" report', function() {
        SlickGridFunctions.getRowData('Testing', rowName, '').then(function(rowData) {
          rowData.forEach(function(val, index) {
            if (index > 0) {
              if ((val === '--') || (val === 'NA')) {
                expect(false).customError('Value us not displayed in "' + index + ' row "in "' + rowName + '" report.');
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

    it('Verify if "Juniper Networks, Inc." is not displayed under "Electronic Technology" in "Testing" Report', function() {
      SlickGridFunctions.getElementsFromTree('Testing', '', 'Electronic Technology', '').then(function(childNames) {
        childNames.forEach(function(itemName) {
          if (itemName === 'Juniper Networks, Inc.') {
            expect(false).customError('"Juniper Networks, Inc." is displayed under "Electronic Technology" in "Testing" Report.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if values are displayed for all the columns in "Juniper Networks, Inc." column in "Contribution-2" Report', function() {
      SlickGridFunctions.getRowData('Contribution-2', 'Juniper Networks, Inc.', '').then(function(rowData) {
        rowData.forEach(function(val, index) {
          if (index > 0) {
            if ((val === '--') || (val === 'NA')) {
              expect(false).customError('Values are not displayed in "' + index + '" row for "Juniper Networks, Inc." column in "Contribution-2" Report.');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it('Verify if "Sara Lee Corp. & PepsiCo, Inc." is not displayed under "Consumer Non-Durables" in "Contribution-2" Report', function() {
      SlickGridFunctions.getElementsFromTree('Contribution-2', '', 'Consumer Non-Durables', '').then(function(childNames) {
        childNames.forEach(function(itemName, index) {
          if (arrOfRowNames.indexOf(itemName) > -1) {
            expect(false).customError('"' + arrOfRowNames[index] + '" is not displayed under "Consumer Non-Durables" in "Contribution-2" Report.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 694988', function() {

    it('Should click on "Portfolio hamburger" icon', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
        expect(true).toBeTruthy();
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Account Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Edit/Pencil" icon beside to "BH_MN (Buy & Hold) | As Of: Report Start Date | Rebalance: None"', function() {
      element(by.xpath(CommonFunctions.replaceStringInXpath(PA3MainPage.xpathOfEditButtonPortfolioDropdown, 'BH_MN ' +
        '(Buy & Hold) | As Of: Report Start Date | Rebalance: None'))).click();
    });

    it('Verifying if "Show Benchmark Summary Dates for Tile" drop down is set to "Contribution-2"', function() {
      ThiefHelpers.selectOptionFromDropDown('Contribution-2', 'Show Benchmark Summary Dates for Tile');

      ThiefHelpers.verifySelectedDropDownText('Contribution-2', 'Show Benchmark Summary Dates for Tile');
    });

    it('Verifying if "Reset Frequency:" is set to "None"', function() {
      ThiefHelpers.verifySelectedDropDownText('None', 'Reset Frequency:');
    });

    it('Verifying if "Report Start Date" is entered into the "As Of:" input field', function() {
      ThiefHelpers.getDatepickerClassReference('As Of:').getDate().then(function(text) {
        if (text !== 'Report Start Date') {
          expect(false).customError('Error: Failed to enter "Report Start Date" into the "End Date" input field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var xpathOfListBoxItem = '//tf-dropdown//tf-form-vertical//tf-listbox';

    it('Verifying if "07/06/2011" item is shown in Benchmark date', function() {
      ThiefHelpers.getListBoxItem(xpathOfListBoxItem, '07/06/2011').getText().then(function(name) {
        if (name !== '07/06/2011') {
          expect(false).customError('"07/06/2011" is not present in Benchmark date. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 694989', function() {

    it('Should click on the "OK" button in portfolio variation dialog ', function() {
      ThiefHelpers.getButtonClassReference(undefined, CommonFunctions.replaceStringInXpath(PA3MainPage.xpathOfOpenHoldDropDownFooterButtons, 'OK')).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button in portfolio variation dialog.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Portfolio Variation" drop down is closed', function() {
      ThiefHelpers.isDropDownOpen(2, false).then(function(status) {
        if (status) {
          expect(false).customError('"Portfolio Variation" drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in Portfolio hamburger drop down', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button in Portfolio hamburger drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('verifying if Portfolio Hamburger drop down is closed', function() {
      ThiefHelpers.isDropDownOpen(1, false).then(function(status) {
        if (status) {
          expect(false).customError('Portfolio Hamburger drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on the "Excluded: [Unassigned]" hyperlink and click on "Edit Groupings" hyper link in the info box
    CommonPageObjectsForPA3.clickOnExcludeExclusionsHyperlink('Testing', 'Excluded: [Unassigned]', 'selectEditExclusions');

    it('Click on "Restore Defaults" button', function() {
      ThiefHelpers.getButtonClassReference('Restore Defaults').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button in Portfolio hamburger drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'OK', 'Do you want to replace your current settings with the account defaults?');

    it('Verifying that confirmation dialog box disappeared', function() {
      expect(TileOptionsExclusions.getDialog('FactSet Research Systems').isPresent()).toBeFalsy();
    });

    it('Verifying that "Restore Defaults" button is changed to "Defaults Applied"', function() {
      expect(TileOptions.getDefaultsApplied().isPresent()).toBeTruthy();
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Testing');

    // Verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Testing');

    // Click on the folder icon and select "Save As..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Save As…');

    // Select personal directory and enter the document name
    // Add .toUpperCase() if you want the document name to be in upper case to the function
    CommonPageObjectsForPA3.selectPersonalAndEnterDocumentNameInSaveAsDialog('Buy_Hold_Test', undefined, true);

    reportNames.forEach(function(reportName) {
      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);
    });

    // Click on the folder icon and select "Open..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Open...');

    // Select the required document from personal directory
    // Add .toUpperCase() if you want the document name to be in upper case to the function
    CommonPageObjectsForPA3.openRequiredDocumentFromPersonal('Buy_Hold_Test');

    reportNames.forEach(function(reportName) {
      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);
    });

  });

  describe('Test Step ID: 695227', function() {

    // Click on the "Exclusions" hyperlink and click on "Edit Groupings" hyper link in the info box
    CommonPageObjectsForPA3.clickOnExcludeExclusionsHyperlink('Testing', 'Excluded: [Unassigned]', 'selectEditExclusions');

    it('Verifying that toolbar shows "Defaults Applied"', function() {
      expect(TileOptions.getDefaultsApplied().isPresent()).toBeTruthy();
    });

    var xpathSelectedVirtualListBox = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Selected');
    it('Verifying if "[Unassigned]" present under "Currency" tree of "Selected" container', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Currency').getChildrenText().then(function(columnName) {
        if (columnName[0].text !== '[Unassigned]') {
          expect(false).customError('"[Unassigned]" is not present in "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 764917', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Testing');

    // Click on the Folder icon and click and select "New" from drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('New');

    // Click on the Folder icon and click and select "Delete..." from drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Delete…');

    // Select the required dpocument and click on delete button
    // Add .toUpperCase() if you want the document name to be in upper case to the function
    CommonPageObjectsForPA3.deleteRequiredDocumentFromPersonalDirectory('Buy_Hold_Test');

  });

});
