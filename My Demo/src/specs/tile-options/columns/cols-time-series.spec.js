'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: cols-time-series', function() {

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  describe('Test Step ID: 406870', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:;test qa"', function() {
      PA3MainPage.switchToDocument('test-qa');
    });

    it('Should wait for the "Weights" report to calculate', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Weights'), 180000).then(function(value) {
        if (!value) {
          expect(false).customError('Error while calculating the "Weights" report');
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
        },

        function(err) {
          if (err.name === 'StaleElementReferenceError') {
            expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });

      //Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Weights" report is selected in LHP ', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Uncategorized', 'Weights').then(function(ele) {
        ele.getAttribute('class').then(function(val) {
          if (val.indexOf('selected') === -1) {
            expect(false).customError('"Weights" report from LHP is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying value in the "Portfolio" widget is CLIENT:/PA3/PA3_TEST2.ACCT', function() {
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).getText().then(function(value) {
        if (value !== 'CLIENT:/PA3/PA3_TEST2.ACCT') {
          expect(false).customError('"CLIENT:/PA3/PA3_TEST2.ACCT" is not displayed in Portfolio Widget.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying value in the "Benchmark" widget is RUSSELL:1000', function() {
      ThiefHelpers.getTextBoxClassReference('Benchmark', PA3MainPage.xpathBenchmarkWidget).getText().then(function(option) {
        if (option !== 'RUSSELL:1000') {
          expect(false).customError('" RUSSELL:1000" is not displayed in Benchmark Widget');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 325402', function() {

    it('Should right click on column header and select menu option as "Columns" and select sub menu option as "Add ' +
      'Column..."', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', 'Difference', '').then(function(cellRef) {
        PA3MainPage.rightClickAndSelectOption(cellRef, 'Columns|Add Column…');
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is opened', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (!option) {
          expect(false).customError('"Tile Options" mode is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "pbk" in the search field', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('pbk');

      //Verifying the text in search field
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(value) {
        if (value !== 'pbk') {
          expect(false).customError('" Text in search field is not pbk');
          CommonFunctions.takeScreenShot();
        }
      });

      // Adding extra time to appear the element
      browser.sleep(2000);
    });

    it('Should hover over "Price to book" and Verifying that Tool tip "FactSet/Valuation" appears on hovering ' +
      'over Price to Book column', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          var action = group.getItemByText('Price to Book');

          // Verifying the tooltip text
          action.then(function(tootiptext) {
            tootiptext.getTooltipText().then(function(tooltipText) {
              if (tooltipText !== 'FactSet/Valuation') {
                expect(false).customError('Tooltip "FactSet/Valuation" has not apeared when hovered on "Price to Book". Found: "' + tooltipText + '"');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Factset" is not expanded.');
          CommonFunctions.takeScreenShot();
        }

      });
    });

  });

  describe('Test Step ID: 548142', function() {

    it('Should select "Price to Book" in available section', function() {
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Price to Book').then(function(item) {
        item.select();
      });

      // Verifying if 'Price to Book' is selected
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Price to Book').then(function(item) {
        item.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Price to Book" is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on right arrow button ', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying that "Price to Book" is added to selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Price to Book') === -1) {
          expect(false).customError('"Price to Book" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand the "Statistics" option and verifying the "Statistics" section is expanded', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Statistics').then(function(option) {
        if (!option) {
          expect(false).customError('"Statistics" section is not expanded ');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 325406', function() {

    it('Verifying "None" option is selected by default in "Frequency" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('None', 'Frequency');
    });

    it('Should click on "Frequency" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference('Frequency').open().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that all the options are displayed in Frequency drop down', function() {
      var flag = false;
      var frequencyDropdownList = ['None', 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Semi-annually', 'Annually'];
      ThiefHelpers.getAllOptionsFromDropdown().then(function(array) {
        array.forEach(function(element, index) {
          if (element !== frequencyDropdownList[index]) {
            flag = true;
            expect(false).customError('"' + frequencyDropdownList[index] + '" did not present in the Frequency drop down; Found: ' + element);
          }
        });

        if (flag) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Statistic" option is grayed out when "Frequency" is set to None', function() {
      ThiefHelpers.getButtonClassReference('Statistic').isDisabled().then(function(status) {
        console.log(status);
        if (!status) {
          expect(false).customError('"Statistic" dropdown is not disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 325407', function() {

    it('Should select "Daily" from "Frequency" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Daily', 'Frequency');
    });

    it('Verifying "Daily" option is selected from "Frequency" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Daily', 'Frequency');
    });

    it('Verifying that Statistic drop down is enabled', function() {
      ThiefHelpers.getButtonClassReference('Statistic').isDisabled().then(function(status) {
        console.log(status);
        if (status) {
          expect(false).customError('"Statistic" dropdown is disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Statistic" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference('Statistic').open().then(function() {
      }, function() {

        expect(false).customError('Not able to click on "Statistic" drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying all the options are displayed in Statistic  drop down', function() {
      var flag = false;
      var statisticDropdownList = ['Average', 'Sum', 'Link', 'Maximum', 'Minimum', 'Standard Deviation',
        'Population Standard Deviation', 'Median', 'Difference', 'First Value', 'Last Value', 'Compound',];
      ThiefHelpers.getAllOptionsFromDropdown().then(function(array) {
        array.forEach(function(element, index) {
          if (element !== statisticDropdownList[index]) {
            flag = true;
            expect(false).customError('"' + statisticDropdownList[index] + '" did not present in the Statistic drop down; Found: ' + element);
          }
        });

        if (flag) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 325430', function() {

    it('Should select "Compound" from Statistic drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Compound', 'Statistic');
    });

    it('Verifying "Compound" option is selected from "Statistic" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Compound', 'Statistic');
    });

    it('Verifying the "Compounding Algorithm" drop down is displayed', function() {
      CommonFunctions.isDisplayed('Drop down', undefined, TileOptionsColumns.xpathCompoundingAlgorithmDropdown).then(function(value) {
        if (!value) {
          expect(false).customError('"Compounding Algorithm" drop down is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying the "Compounding Algorithm" drop down is enabled', function() {
      ThiefHelpers.getButtonClassReference('Compounding Algorithm').isDisabled().then(function(status) {
        console.log(status);
        if (status) {
          expect(false).customError('"Compounding Algorithm" dropdown is disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying the "Smoothing Algorithm" drop down is displayed', function() {
      CommonFunctions.isDisplayed('Drop down', undefined, TileOptionsColumns.xpathSmoothingDropdown).then(function(value) {
        if (!value) {
          expect(false).customError('"Smoothing Algorithm" drop down is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying the "Smoothing Algorithm" drop down is disabled', function() {
      ThiefHelpers.getButtonClassReference('Smoothing').isDisabled().then(function(status) {
        console.log(status);
        if (!status) {
          expect(false).customError('"Smoothing Algorithm" dropdown is enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying the "Target" drop down is displayed', function() {
      CommonFunctions.isDisplayed('Drop down', undefined, TileOptionsColumns.xpathTargetDropDown).then(function(value) {
        if (!value) {
          expect(false).customError('"Target" drop down is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying the "Target" drop down is disabled', function() {
      ThiefHelpers.getButtonClassReference('Target').isDisabled().then(function(status) {
        console.log(status);
        if (!status) {
          expect(false).customError('"Target" dropdown is enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying the "Targets Total Only" drop down is displayed', function() {
      CommonFunctions.isDisplayed('Drop down', undefined, TileOptionsColumns.xpathTargetsTotalOnlyDropDown).then(function(value) {
        if (!value) {
          expect(false).customError('"Targets Total Only" drop down is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying the "Targets Total Only" drop down is disabled', function() {
      ThiefHelpers.getButtonClassReference('Target\'s Total Only').isDisabled().then(function(status) {
        console.log(status);
        if (!status) {
          expect(false).customError('"Targets Total Only" dropdown is enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying the "Additional Effects" drop down is displayed', function() {
      CommonFunctions.isDisplayed('Drop down', undefined, TileOptionsColumns.xpathAdditionalEffectsDropDown).then(function(value) {
        if (!value) {
          expect(false).customError('"Additional Effects" drop down is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying the "Additional Effects" drop down is disabled', function() {
      var xpathRef = element(by.xpath(TileOptionsColumns.xpathAdditionalEffectsDropDown + '//*[@tf-button]'));
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsColumns.xpathAdditionalEffectsDropDown).isDisabled().then(function(status) {
        console.log(status);
        if (!status) {
          expect(false).customError('"Additional Effects" dropdown is enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 325434', function() {

    it('Should click on "Compounding Algorithm" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsColumns.xpathCompoundingAlgorithmDropdown)
        .open().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying all the options are displayed in Compounding Algorithm  drop down', function() {
      var flag = false;
      var compoundingAlgDDList = ['None', 'Basic - Forward Looking', 'Basic - Backward Looking',
        'Residual Free - Portfolio Cumulative', 'Residual Free - Benchmark Cumulative',];
      ThiefHelpers.getAllOptionsFromDropdown().then(function(array) {
        array.forEach(function(element, index) {
          if (element !== compoundingAlgDDList[index]) {
            flag = true;
            expect(false).customError('"' + compoundingAlgDDList[index] + '" did not present in the Compound Algorithm drop down; Found: ' + element);
          }
        });

        if (flag) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 325436', function() {

    it('Should select "Basic-Forward Looking" from "Compounding Algorithm" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Basic - Forward Looking', undefined, TileOptionsColumns.xpathCompoundingAlgorithmDropdown);
    });

    it('Verifying "Basic-Forward Looking" option is selected from "Compounding Algorithm" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Basic - Forward Looking', undefined,
        TileOptionsColumns.xpathCompoundingAlgorithmDropdown);
    });

    it('Should click on "Smoothing Algorithm" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsColumns.xpathSmoothingDropdown).open().then(function() {
      }, function() {

        expect(false).customError('Not able to click on "Smoothing Algorithm" drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying all the options are displayed in Smoothing  Algorithm  drop down', function() {
      var flag = false;
      var smoothingAlgDDList = ['None', 'Basic', 'Proportional'];
      ThiefHelpers.getAllOptionsFromDropdown().then(function(array) {
        array.forEach(function(element, index) {
          if (element !== smoothingAlgDDList[index]) {
            flag = true;
            expect(false).customError('"' + smoothingAlgDDList[index] + '" did not present in the Smoothing drop down; Found: ' + element);
          }
        });

        if (flag) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 325442', function() {

    it('Should select "Basic" from "Smoothing" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Basic', undefined, TileOptionsColumns.xpathSmoothingDropdown);
    });

    it('Verifying "Basic" option is selected from "Smoothing', function() {
      ThiefHelpers.verifySelectedDropDownText('Basic', undefined, TileOptionsColumns.xpathSmoothingDropdown);
    });

    it('Should click on "Target" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsColumns.xpathTargetDropDown).open().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying target drop down options are same as column names that are listed in the Selected section except ' +
      '"Ticker" and "Security Name"', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(targetDropDownOptions) {
        TileOptionsColumns.getAllElements('selected').getText().then(function(selectedSectionOptions) {
          var flag = false;
          var targetDropDownOptionIndex = 0;
          expect(targetDropDownOptions.length).toEqual(selectedSectionOptions.length - 2);
          for (var selectedSectionOptionIndex = 0; selectedSectionOptionIndex < selectedSectionOptions.length; selectedSectionOptionIndex++) {
            if ((selectedSectionOptions[selectedSectionOptionIndex].trim() === 'Ticker') ||
              (selectedSectionOptions[selectedSectionOptionIndex].trim() === 'Security Name')) {
              if (targetDropDownOptions.indexOf(selectedSectionOptions[selectedSectionOptionIndex].trim()) !== -1) {
                flag = true;
                expect(false).customError('' + selectedSectionOptions[selectedSectionOptionIndex].trim() + ' ' +
                  'option is listed in "Target" drop down');
              }
            } else {
              if (targetDropDownOptions[targetDropDownOptionIndex] !== selectedSectionOptions[selectedSectionOptionIndex]) {
                flag = true;
                expect(false).customError('Target drop down option :"' + targetDropDownOptions[targetDropDownOptionIndex] + '" is not present in the selected section ; Option Found in selected section is: ' + selectedSectionOptions[selectedSectionOptionIndex]);
              }

              targetDropDownOptionIndex++;
            }
          }

          if (flag) {
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 325409', function() {

    it('Should select "Daily" from "Frequency" drop down', function() {
      //Selecting "Daily" from Frequency drop down if not already set
      ThiefHelpers.getDropDownSelectClassReference('Frequency').getSelectedText().then(function(selectedText) {
        if (selectedText !== 'Daily') {
          ThiefHelpers.selectOptionFromDropDown('Daily', 'Frequency');
        }
      });
    });

    it('Verifying "Daily" option is selected from "Frequency', function() {
      ThiefHelpers.verifySelectedDropDownText('Daily', 'Frequency');
    });

    it('Should select "Average" from "Statistic" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Average', 'Statistic');
    });

    it('Verifying "Average" option is selected from "Statistic', function() {
      ThiefHelpers.verifySelectedDropDownText('Average', 'Statistic');
    });

    it('Should select "Cumulative" check box', function() {
      ThiefHelpers.getCheckBoxClassReference('Cumulative').check();
    });

    it('Verifying "Cumulative" check box is checked', function() {
      ThiefHelpers.getCheckBoxClassReference('Cumulative').isChecked().then(function(value) {
        if (!value) {
          expect(false).customError('"Cumulative checkbox is not checked"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Dates" in the LHP of tile options', function() {
      TileOptions.getLHPOption('Dates').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Dates" tab is highlighted in LHP ', function() {
      TileOptions.getLHPOption('Dates').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') === -1) {
          expect(false).customError('"Dates" tab is not highlighted in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Dates" tab is opened', function() {
      // Verifying that view changed to "Dates"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Dates') {
          expect(false).customError('"Dates" tab is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 425622', function() {

    it('Should Select option "Daily" from "Report frequency" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Daily', 'Report Frequency:');
    });

    it('Verifying "Daily" option is selected from "Report frequency" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Daily', 'Report frequency');
    });

    it('Should Select october 17 2016 from start date calender widget', function() {
      ThiefHelpers.setDateInCalendar('10/17/2016', 1);

      //Verifying 10/17/2016 date is selected in start date calender widget
      ThiefHelpers.getDatepickerClassReference('Start Date:').getDate().then(function(value) {
        if (value !== '10/17/2016') {
          expect(false).customError('10/17/2016 date is not selected in start date calender widget');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that 10/17/2016 is reflected in start date text box after selecting the date in start date calender ' +
      'widget', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsDates.xpathStartDateTextBox).getText().then(function(value) {
        if (value !== '10/17/2016') {
          expect(false).customError('10/17/2016 date is not reflected in start date text box after selecting ' +
            'the date in start date calender widget');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should Select october 25 2016 from "End date" calender widget', function() {
      ThiefHelpers.setDateInCalendar('10/25/2016', 2);

      //Verifying 10/25/2016 date is selected in end date calender widget
      ThiefHelpers.getDatepickerClassReference('End Date:').getDate().then(function(value) {
        if (value !== '10/25/2016') {
          expect(false).customError('10/25/2016 date is not selected in end date calender widget');
          CommonFunctions.takeScreenShot();
        }
      });

      // Adding wait time as per the Engineer comment in RPD:41035011
      browser.sleep(2000);
    });

    it('Verifying that 10/25/2016 is reflected in end date text box after selecting the date in end date calender widget', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsDates.xpathEndDateTextBox).getText().then(function(value) {
        if (value !== '10/25/2016') {
          expect(false).customError('10/25/2016 date is not reflected in end date calender widget after' +
            ' selecting the date in end date calender widget');
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

      //verifying tile options mode is closed
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for the "Weights" report to calculate', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Weights'), 180000).then(function(value) {
        if (!value) {
          expect(false).customError('Error while calculating the "Weights" report');
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
        },

        function(err) {
          if (err.name === 'StaleElementReferenceError') {
            expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });

      //Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that report calculates for 1 week with Daily frequency.', function() {
      var list = ['10/17/2016', '10/18/2016', '10/19/2016', '10/20/2016', '10/21/2016', '10/24/2016', '10/25/2016'];
      SlickGridFunctions.getMultiHeaderNames('Weights').then(function(tableHeaderName) {
        for (var headerIndex = 0; headerIndex < tableHeaderName.length - 1; headerIndex++) {
          if (tableHeaderName[headerIndex] !== list[headerIndex]) {
            expect(false).customError('"' + list[headerIndex] + '" did not present in the weights report; Found: ' + tableHeaderName[headerIndex]);
          }
        }
      });
    });

  });

});
