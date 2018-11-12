require(`${__dirname}/../../../index.js`);
describe(`Test Case: st-default-risk-model`, () => {

  describe(`Test Step ID: 762641`, () => {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it(`Should open PA3 Application with "Client:/Pa3/Columns/New_Reference_Testing"`, function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument(`stress-test-sample-frequency`);
    });

    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(`Portfolio`, PA3MainPage.xpathPortfolioWidget, `US:DJII`);

    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(`Benchmark`, PA3MainPage.xpathBenchmarkWidget, `CASH:USD`);
  });

  describe(`Test Step ID: 762642`, () => {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Date Options', 'Dates', 'document options');

    it(`Should open and select "Daily" from "Calculation Frequency" dropdown under "Dates" option`, function() {
      ThiefHelpers.selectOptionFromDropDown(`Daily`, undefined, DocumentOptionsDates.xpathCalculationFrequencyDropDown);
    });

    it(`Verifying if "Calculation Frequency" dropdown is set to "Daily" under "Dates" option`, function() {
      ThiefHelpers.verifySelectedDropDownText(`Daily`, undefined, DocumentOptionsDates.xpathCalculationFrequencyDropDown);
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Dcoument Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab(`Weights`, `Stress Tests`, `Risk`);

    it(`Expand "FactSet > Factset Stress Test > Market"`, () => {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText(`FactSet`);
      group.expand();
      group.isExpanded().then(expanded => {
        if (expanded) {
          group.getGroupByText(`Factor Stress Tests`).then(secondGroup => {
            secondGroup.expand();
            secondGroup.isExpanded().then(expanded => {
              if (expanded) {
                secondGroup.getGroupByText(`Market`).then(thirdGroup => {
                  thirdGroup.expand();
                  thirdGroup.isExpanded().then(expanded => {
                    if (expanded) {
                      var action = thirdGroup.getItemByText(`S&P 500 30% Decline`);

                      // Hover on "S&P 500 30% Decline" and click on the "Edit" icon
                      return action.then(edit => {
                        return edit.getActions().then(val => {
                          return val.triggerAction(`duplicate`);
                        });
                      });
                    }
                  });

                });

              } else {
                expect(false).customError(`"Factor Stress Tests" group was not expanded.`);
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError(`"FactSet" was not expanded from "Available" container.`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it(`Verifying if "Edit Stress Test" dialog is displayed`, () => {
      ThiefHelpers.isDialogOpen(`Edit Stress Test`).then(found => {
        if (!found) {
          expect(false).customError(`"Edit Stress Test" dialog is not displayed.`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it(`Should click to expand "Advanced options" accordian section`, () => {
      element(by.xpath(TileOptionsRiskStressTests.xpathOfAdavacedOptions)).click().then(() => { }, () => {

        expect(false).customError('"Advanced options" accordian section.');
        CommonFunctions.takeScreenShot();
      });
    });

    it(`Should open and select "Daily, if available" from "Sample Frequency" dropdown "Advanced options" accordian section`, function() {
      ThiefHelpers.selectOptionFromDropDown(`Daily, if available`, `Sample Frequency`);
    });

    it(`Verifying if "Sample Frequency" dropdown is set to "Daily, if available" "Advanced options" accordian section`, function() {
      ThiefHelpers.verifySelectedDropDownText(`Daily, if available`, `Sample Frequency`);
    });

    it(`Should click on "Report Date" calender button`, () => {
      const xpath = CommonFunctions.replaceStringInXpath(EditStressTest.xpathDatePickerButton, `Report Date`);

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it(`Should set the date to "01-Mar-2018" in "Report Date" text-box`, () => {
      ThiefHelpers.setDateInCalendar(`01-Mar-2018`, 2);
    });

    it(`Verifying if "Report Date" date-picker text-box is set to "01-Mar-2018"`, () => {
      ThiefHelpers.getTextBoxClassReference(undefined, EditStressTest.getInputBox(`Report Date`)).getText().then(text => {
        if (text !== `01-Mar-2018`) {
          expect(false).customError(`The "Report Date" textbox is not set to "01-Mar-2018"`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on Refresh icon
    EditStressTest.clickOnRefreshButton();

    var arrLabel = ['Shock Percentage', 'Shock Level', 'Current Level'];
    var arrValue = ['-30.00', '3406.4', '4866.3'];

    arrLabel.forEach(function(label, index) {
      it('Verifying if "' + label + '" label value is "' + arrValue[index] + '"', function() {
        EditStressTest.getLabelFromFactorInfoSection(label).getText().then(function(value) {
          if (value.indexOf(arrValue[index]) <= -1) {
            expect(false).customError('The value of "' + label + '" is not "' + arrValue[index] + '" Expected:' +
              ' ' + arrValue[index] + ' Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    var columnNames = ['Date', 'Copy of S&P 500 30% Decline', 'Time Weight', 'Event Weight'];

    it('Verifying if "' + columnNames + '" columns are present in the preview section', function() {
      EditStressTest.getAllColumnNames().then(function(colDataArr) {
        columnNames.forEach(function(column) {
          if (colDataArr.indexOf(column) === -1) {
            expect(false).customError(column + ' column is not present in the Preview section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    let arrOfExpectedValues = ['-1.32', '0.00', '2.00', 20180301];

    it(`Verify if expected values are displayed`, () => {
      EditStressTest.getDataView().then(rowData => {
        let arrOfItems = [rowData[0].TEST0, rowData[0].ewmaWeight, rowData[0].timeWeight, rowData[0].date];
        arrOfItems.forEach((itemName, index) => {
          if (index < 3) {
            if (parseFloat(itemName).toFixed(2) !== arrOfExpectedValues[index]) {
              expect(false).customError(`Expected: "${arrOfExpectedValues[index]}" but Found: "${itemName}".`);
              CommonFunctions.takeScreenShot();
            }
          } else {
            if (rowData[0].date !== arrOfExpectedValues[index]) {
              expect(false).customError(`Expected: "${arrOfExpectedValues[index]}" but Found: "${rowData[0].date}".`);
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

  });

  describe(`Test Step ID: 762644`, () => {

    it('Should click on "Cancel" button of "Edit Stress Test" dialog', function() {
      var xpath = CommonFunctions.replaceStringInXpath(EditStressTest.xpathButtonFromDialog, 'Cancel');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Verify the view changed to "Tile options" mode', function() {
      ThiefHelpers.isModeBannerDisplayed(`Tile Options - Weights`).then(function(found) {
        if (!found) {
          expect(false).customError('View is not changed to "Tile options - Wights" mode.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe(`Test Step ID: 762643`, () => {

    it('Should hover over on  "S&P 500 30% Decline" in the "Available section" under "FactSet|Factor Stress Tests|Market" and click on duplicate icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('FactSet');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Factor Stress Tests').then(function(subGroup) {
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Market').then(function(subGroup1) {
                  subGroup1.isExpanded().then(function(expanded) {
                    if (expanded) {
                      subGroup1.getItemByText('S&P 500 30% Decline').then(function(item) {

                        item.getActions().then(function(actions) {
                          actions.triggerAction('duplicate');
                        });
                      });
                    } else {
                      expect(false).customError('"Market" is not expanded');
                      CommonFunctions.takeScreenShot();
                    }
                  });
                });
              } else {
                expect(false).customError('"Factor Stress Tests" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"FactSet" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Edit Stress Test" dialog is displayed', function() {
      ThiefHelpers.isDialogOpen('Edit Stress Test').then(function(found) {
        if (!found) {
          expect(false).customError('"Edit Stress Test" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it(`Should click to expand "Advanced options" accordian section`, () => {
      element(by.xpath(TileOptionsRiskStressTests.xpathOfAdavacedOptions)).click().then(() => { }, () => {

        expect(false).customError('"Advanced options" accordian section.');
        CommonFunctions.takeScreenShot();
      });
    });

    it(`Should open and select "Monthly, if available" from "Sample Frequency" dropdown "Advanced options" accordian section`, function() {
      ThiefHelpers.selectOptionFromDropDown(`Monthly, if available`, `Sample Frequency`);
    });

    it(`Verifying if "Sample Frequency" dropdown is set to "Monthly, if available" "Advanced options" accordian section`, function() {
      ThiefHelpers.verifySelectedDropDownText(`Monthly, if available`, `Sample Frequency`);
    });

    it(`Should click on "Report Date" calender button`, () => {
      const xpath = CommonFunctions.replaceStringInXpath(EditStressTest.xpathDatePickerButton, `Report Date`);

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it(`Should set the date to "01-Mar-2018" in "Report Date" text-box`, () => {
      ThiefHelpers.setDateInCalendar(`01-Mar-2018`, 2);
    });

    it(`Verifying if "Report Date" date-picker text-box is set to "01-Mar-2018"`, () => {
      ThiefHelpers.getTextBoxClassReference(undefined, EditStressTest.getInputBox(`Report Date`)).getText().then(text => {
        if (text !== `01-Mar-2018`) {
          expect(false).customError(`The "Report Date" textbox is not set to "01-Mar-2018"`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on Refresh icon
    EditStressTest.clickOnRefreshButton();

    var arrLabel = ['Shock Percentage', 'Shock Level', 'Current Level'];
    var arrValue = ['-30.00', '3406.4', '4866.3'];

    arrLabel.forEach(function(label, index) {
      it('Verifying if "' + label + '" label value is "' + arrValue[index] + '"', function() {
        EditStressTest.getLabelFromFactorInfoSection(label).getText().then(function(value) {
          if (value.indexOf(arrValue[index]) <= -1) {
            expect(false).customError('The value of "' + label + '" is not "' + arrValue[index] + '" Expected:' +
              ' ' + arrValue[index] + ' Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    var columnNames = ['Date', 'Copy of S&P 500 30% Decline', 'Time Weight', 'Event Weight'];

    it('Verifying if "' + columnNames + '" columns are present in the preview section', function() {
      EditStressTest.getAllColumnNames().then(function(colDataArr) {
        columnNames.forEach(function(column) {
          if (colDataArr.indexOf(column) === -1) {
            expect(false).customError(column + ' column is not present in the Preview section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    let arrOfExpectedValues = ['-3.69', '0.57', '2.00', 20180228];

    it(`Verify if expected values are displayed`, () => {
      EditStressTest.getDataView().then(rowData => {
        let arrOfItems = [rowData[0].TEST0, rowData[0].ewmaWeight, rowData[0].timeWeight, rowData[0].date];
        arrOfItems.forEach((itemName, index) => {
          if (index < 3) {
            if (parseFloat(itemName).toFixed(2) !== arrOfExpectedValues[index]) {
              expect(false).customError(`Expected: "${arrOfExpectedValues[index]}" but Found: "${itemName}".`);
              CommonFunctions.takeScreenShot();
            }
          } else {
            if (rowData[0].date !== arrOfExpectedValues[index]) {
              expect(false).customError(`Expected: "${arrOfExpectedValues[index]}" but Found: "${rowData[0].date}".`);
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });
  });

  describe(`Test Step ID: 762645`, () => {

    it('Should click on "Cancel" button of "Edit Stress Test" dialog', function() {
      var xpath = CommonFunctions.replaceStringInXpath(EditStressTest.xpathButtonFromDialog, 'Cancel');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Verify the view changed to "Tile options" mode', function() {
      ThiefHelpers.isModeBannerDisplayed(`Tile Options - Weights`).then(function(found) {
        if (!found) {
          expect(false).customError('View is not changed to "Tile options - Wights" mode.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options - Weights');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');
  });

});
