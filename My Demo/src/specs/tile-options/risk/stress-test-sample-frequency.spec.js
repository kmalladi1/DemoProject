'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: stress-test-sample-frequency', function() {

  var multiHeaders = ['Axioma US Fundamental Equity Risk Model MH 4', 'Barra US Long-Term Model (USE3L)',
    'NIS US Fundamental Model', 'R-Squared Daily Global Equity Model USD V2', 'FactSet Multi-Asset Class Model (USD)',];

  describe('Test Step ID: 762632', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:/Pa3/Risk/stress_test_sample_frequency" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('stress-test-sample-frequency');
    });

    var arrValues = [{name: 'Portfolio', val: 'US:DJII', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'benchmark', val: 'CASH:USD', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });
  });

  describe('Test Step ID: 762633', function() {

    var elementExists = true;

    // Select Dates tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Dates');

    it('Should type "23-Mar-2018" into the "End Date" field', function() {
      ThiefHelpers.getTextBoxClassReference('End Date:').setText('23-Mar-2018');

      // Verifying that "23-Mar-2018" is typed into the "End Date" field
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(text) {
        if (text !== '23-Mar-2018') {
          expect(false).customError('"23-Mar-2018" did not present in the "End Date" field, Found:' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Stress Tests" tab from "Risk" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Stress Tests', 'Risk').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Stress Tests', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Stress Tests" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "S&P 500 30% Decline" is added to selected container by default', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('S&P 500 30% Decline') === -1) {
          elementExists = false;
        }
      });
    });

    it('Should select "S&P 500 30% Decline" under "FactSet -> Factor Stress Tests -> Market" from "Available" section and perform double click', function() {
      if (!elementExists) {
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
                          item.select();

                          item.doubleClick();
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
            expect(false).customError('"Factset" is not expanded');
            CommonFunctions.takeScreenShot();
          }
        });
      }
    });

    it('Should verify if "S&P 500 30% Decline" item is added to "Selected" section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('S&P 500 30% Decline') === -1) {
          expect(false).customError('"S&P 500 30% Decline" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var values = ['-30.15', '-30.77', '-30.26', '-24.94', '-24.93'];
    it('Should verify id Total row values of "' + multiHeaders + '" header columns', function() {
      multiHeaders.forEach(function(multiheader, index) {
        PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', multiheader).then(function(colindex) {
          PA3MainPage.getCellValueForMultiHeaderColumn('Weights', 'Total', colindex, 'grid-canvas grid-canvas-top ' +
            'grid-canvas-left', 'grid-canvas grid-canvas-top grid-canvas-right').then(function(colValue) {
            if (colValue !== values[index]) {
              expect(false).customError('Cell value for ' + multiheader + ' column "Total" row is not ' +
                'set to "' + values[index] + '"; Found: ' + colValue);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

  });

  describe('Test Step ID: 762634', function() {

    // Navigate to Dates tab of Document Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Date Options', 'Dates', 'document options');

    it('Should select "Monthly" option from the "Calculation Frequency" dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Monthly', undefined, DocumentOptionsDates.xpathCalculationFrequencyDropDown);

      // Verifying if "Monthly" is set
      ThiefHelpers.verifySelectedDropDownText('Monthly', undefined, DocumentOptionsDates.xpathCalculationFrequencyDropDown);
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Dcoument Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var values = ['-31.00', '-30.77', '-30.26', '-0.45', ''];
    it('Should verify Total row values of "' + multiHeaders + '" header columns', function() {
      multiHeaders.forEach(function(multiheader, index) {
        PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', multiheader).then(function(colindex) {
          PA3MainPage.getCellValueForMultiHeaderColumn('Weights', 'Total', colindex, 'grid-canvas grid-canvas-top ' +
            'grid-canvas-left', 'grid-canvas grid-canvas-top grid-canvas-right').then(function(colValue) {
            if (colValue !== values[index]) {
              expect(false).customError('Cell value for ' + multiheader + ' column "Total" row is not ' +
                'set to "' + values[index] + '"; Found: ' + colValue);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 762635', function() {

    // Navigate to Dates tab of Document Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Date Options', 'Dates', 'document options');

    it('Should select "Daily" option from the "Calculation Frequency" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Daily', undefined, DocumentOptionsDates.xpathCalculationFrequencyDropDown);

      // Verifying if "Monthly" is set
      ThiefHelpers.verifySelectedDropDownText('Daily', undefined, DocumentOptionsDates.xpathCalculationFrequencyDropDown);
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Dcoument Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    // Navigate to Stress Tests tab in Tile Options dialog
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Stress Tests', 'Risk');

    it('Should hover over on  "S&P 500 30% Decline" in the "Available section" under "FactSet|Factor Stress Tests|Market" and click on duplicate icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('FactSet');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Factor Stress Tests').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Market').then(function(subGroup1) {
                  subGroup1.expand();
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

    it('Should verify if "Edit Stress Test" dialog is displayed', function() {
      ThiefHelpers.isDialogOpen('Edit Stress Test').then(function(found) {
        if (!found) {
          expect(false).customError('"Edit Stress Test" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click to expand "Advanced options" accordian section', function() {
      EditStressTest.getAccordion('Advanced Options').click();
    });

    it('Should select "Daily, if available" from "Sample Frequency" Section drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Daily, if available', 'Sample Frequency');

      // verifying if 'Daily, if available' is selected from "Sample Frequency" section drop down
      ThiefHelpers.verifySelectedDropDownText('Daily, if available', 'Sample Frequency');
    });

    it('Should enter "S&P 500 30% Decline - Daily Frequency" in the "Name" textbox', function() {
      ThiefHelpers.getTextBoxClassReference('Name', undefined).setText('S&P 500 30% Decline - Daily Frequency');

      // Verifying if "S&P 500 30% Decline - Daily Frequency" is set to text box
      ThiefHelpers.getTextBoxClassReference('Name', undefined).getText().then(function(text) {
        if (text !== 'S&P 500 30% Decline - Daily Frequency') {
          expect(false).customError('The "Name" textbox is not set to "S&P 500 30% Decline - Daily Frequency", Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Client" from the "Directory" section', function() {
      ThiefHelpers.getRadioClassReference('Client').isSelected().then(function(selected) {
        if (!selected) {
          ThiefHelpers.getRadioClassReference('Client').select();
        }
      });
    });

    it('Should click on "Save" button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(EditStressTest.xpathButtonFromDialog, 'Save');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Should wait for the spinner icon to disappear', function() {
      Utilities.waitUntilElementDisappears(EditStressTest.getSpinner(), 10000);
    });

    it('Should verify if "Edit Stress Test" dialog disappeared', function() {
      ThiefHelpers.isDialogOpen('Edit Stress Test').then(function(option) {
        if (option) {
          expect(false).customError('"Edit Stress Test" dialog has not disappeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "S&P 500 30% Decline - Daily Frequency" is present under "Client" in the Available section', function() {
      var arrElements = [];
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Client');
      group.expand();

      group.getChildrenText().then(function(columnName) {
        columnName.forEach(function(listItem) {
          arrElements.push(listItem.text);
        });
        if (arrElements.indexOf('S&P 500 30% Decline - Daily Frequency') === -1) {
          expect(false).customError('"S&P 500 30% Decline - Daily Frequency" is not displayed under "Client"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 762636', function() {

    it('Should hover over on  "S&P 500 30% Decline" in the "Available section" under "FactSet|Factor Stress Tests|Market" and click on duplicate icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('FactSet');

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

    it('Should verify if "Edit Stress Test" dialog is displayed', function() {
      ThiefHelpers.isDialogOpen('Edit Stress Test').then(function(found) {
        if (!found) {
          expect(false).customError('"Edit Stress Test" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click to expand "Advanced options" accordian section', function() {
      EditStressTest.getAccordion('Advanced Options').click();
    });

    it('Should select "Monthly, if available" from "Sample Frequency" Section drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Monthly, if available', 'Sample Frequency');

      // verifying if 'Monthly, if available' is selected from "Sample Frequency" section drop down
      ThiefHelpers.verifySelectedDropDownText('Monthly, if available', 'Sample Frequency');
    });

    it('Should enter "S&P 500 30% Decline - Monthly Frequency" in the "Name" textbox', function() {
      ThiefHelpers.getTextBoxClassReference('Name', undefined).setText('S&P 500 30% Decline - Monthly Frequency');

      // Verifying if "S&P 500 30% Decline - Monthly Frequency" is set to text box
      ThiefHelpers.getTextBoxClassReference('Name', undefined).getText().then(function(text) {
        if (text !== 'S&P 500 30% Decline - Monthly Frequency') {
          expect(false).customError('"Name" text box is not set to "S&P 500 30% Decline - Monthly Frequency", Found:' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Client" from the "Directory" section', function() {
      ThiefHelpers.getRadioClassReference('Client').isSelected().then(function(selected) {
        if (!selected) {
          ThiefHelpers.getRadioClassReference('Client').select();
        }
      });
    });

    it('Should click on "Save" button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(EditStressTest.xpathButtonFromDialog, 'Save');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Should wait for the spinner icon to disappear', function() {
      Utilities.waitUntilElementDisappears(EditStressTest.getSpinner(), 10000);
    });

    it('Should verify if "Edit Stress Test" dialog disappeared', function() {
      ThiefHelpers.isDialogOpen('Edit Stress Test').then(function(option) {
        if (option) {
          expect(false).customError('"Edit Stress Test" dialog has not disappeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "S&P 500 30% Decline - Monthly Frequency" is present under "Client" in the Available section', function() {
      var arrElements = [];
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Client');
      group.expand();

      group.getChildrenText().then(function(columnName) {
        columnName.forEach(function(listItem) {
          arrElements.push(listItem.text);
        });
        if (arrElements.indexOf('S&P 500 30% Decline - Monthly Frequency') === -1) {
          expect(false).customError('"S&P 500 30% Decline - Monthly Frequency" is not displayed under "Client"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 762637', function() {

    it('Should select "S&P 500 30% Decline" under "FactSet -> Factor Stress Tests -> Market" from "Available" section and perform double click', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('FactSet');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Factor Stress Tests').then(function(subGroup) {
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Market').then(function(subGroup1) {
                  subGroup1.isExpanded().then(function(expanded) {
                    if (expanded) {
                      subGroup1.getItemByText('S&P 500 30% Decline').then(function(item) {
                        item.select();

                        item.doubleClick();
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

    it('Should double click on "S&P 500 30% Decline - Daily Frequency" from "Client" directory to add it to "selected" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Client');
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(TileOptionsRiskStressTests.xpathAvailableContainer, 'Client', 'S&P 500 30% Decline - Daily Frequency', 'last').then(function(indexOfElement) {
            var item = group.getItemByIndex(indexOfElement);

            return item.then(function(itemTODoubleClick) {
              itemTODoubleClick.select();
              itemTODoubleClick.doubleClick();
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

    var selectedArray = ['S&P 500 30% Decline', 'S&P 500 30% Decline - Daily Frequency'];

    it('Should verify if "' + selectedArray + '" is present in selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        selectedArray.forEach(function(element) {
          if (myArray.indexOf(element) === -1) {
            expect(false).customError('"' + element + '" is not added to the selected section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var values = ['-30.15', '-30.15', '-30.77', '-30.77', '-30.26', '-30.26', '-24.94', '-24.94', '-24.93', '-24.93'];
    it('Should verify if Total row values of columns under "' + multiHeaders + '" header', function() {
      var valIndex = 0;
      multiHeaders.forEach(function(multiheader, index) {
        PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', multiheader).then(function(colIndexArr) {
          colIndexArr.forEach(function(colindex) {
            SlickGridFunctions.getColumnNames('Weights').then(function(arr) {
              PA3MainPage.getCellValueForMultiHeaderColumn('Weights', 'Total', colindex, 'grid-canvas grid-canvas-top ' +
                'grid-canvas-left', 'grid-canvas grid-canvas-top grid-canvas-right').then(function(colValue) {
                if (colValue !== values[valIndex]) {
                  expect(false).customError('Cell value for ' + multiheader + '|' + arr[colindex] + ' column "Total" row is not ' +
                    'set to "' + values[valIndex] + '"; Found: ' + colValue);
                  CommonFunctions.takeScreenShot();
                }
              }).then(function() {
                valIndex = valIndex + 1;
              });
            });
          });
        });
      });
    });
  });

  describe('Test Step ID: 762638', function() {

    // Navigate to Dates tab of Document Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Date Options', 'Dates', 'document options');

    it('Should select "Monthly" option from the "Calculation Frequency" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Monthly', undefined, DocumentOptionsDates.xpathCalculationFrequencyDropDown);

      // Verifying if "Monthly" is set
      ThiefHelpers.verifySelectedDropDownText('Monthly', undefined, DocumentOptionsDates.xpathCalculationFrequencyDropDown);
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Dcoument Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    // Navigate to Stress Tests tab in Tile Options dialog
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Stress Tests', 'Risk');

    it('Should perform mouse hover on "S&P 500 30% Decline - Daily Frequency" from "Selected" section and Click "X" Icon', function() {
      // Getting the xpath of the Selected section
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsRiskStressTests.xpathSelectedContainer, 'Selected');
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('S&P 500 30% Decline - Daily Frequency');

      item.getActions().then(function(actions) {
        actions.triggerAction('remove');
      });
    });

    it('Should double click on "S&P 500 30% Decline - Monthly Frequency" from "Client" directory to add it to "selected" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Client');
      group.expand();
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(TileOptionsRiskStressTests.xpathAvailableContainer, 'Client', 'S&P 500 30% Decline - Monthly Frequency', 'last').then(function(indexOfElement) {
            var item = group.getItemByIndex(indexOfElement);

            return item.then(function(itemTODoubleClick) {
              itemTODoubleClick.select();
              itemTODoubleClick.doubleClick();
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

    it('Should verify if "S&P 500 30% Decline - Monthly Frequency" item is added to "Selected" section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('S&P 500 30% Decline - Monthly Frequency') === -1) {
          expect(false).customError('"S&P 500 30% Decline - Monthly Frequency" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var values = ['-31.00', '-31.00', '-30.77', '-30.77', '-30.26', '-30.26', '-0.45', '-0.45', '', ''];
    it('Should verify if Total row values of columns under "' + multiHeaders + '" header', function() {
      var valIndex = 0;
      multiHeaders.forEach(function(multiheader, index) {
        PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', multiheader).then(function(colIndexArr) {
          colIndexArr.forEach(function(colindex) {
            SlickGridFunctions.getColumnNames('Weights').then(function(arr) {
              PA3MainPage.getCellValueForMultiHeaderColumn('Weights', 'Total', colindex, 'grid-canvas grid-canvas-top ' +
                'grid-canvas-left', 'grid-canvas grid-canvas-top grid-canvas-right').then(function(colValue) {
                if (colValue !== values[valIndex]) {
                  expect(false).customError('Cell value for ' + multiheader + '|' + arr[colindex] + ' column "Total" row is not ' +
                    'set to "' + values[valIndex] + '"; Found: ' + colValue);
                  CommonFunctions.takeScreenShot();
                }
              }).then(function() {
                valIndex = valIndex + 1;
              });
            });
          });
        });
      });
    });
  });

  describe('Test Step ID: 762639', function() {

    // Navigate to Dates tab of Document Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Date Options', 'Dates', 'document options');

    it('Should select "Daily" option from the "Calculation Frequency" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Daily', undefined, DocumentOptionsDates.xpathCalculationFrequencyDropDown);

      // Verifying if "Monthly" is set
      ThiefHelpers.verifySelectedDropDownText('Daily', undefined, DocumentOptionsDates.xpathCalculationFrequencyDropDown);
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Dcoument Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var values = ['-30.15', '-31.00', '-30.77', '-30.77', '-30.26', '-30.26', '-24.94', '-0.45', '-24.93', ''];
    it('Should verify if Total row values of columns under "' + multiHeaders + '" header', function() {
      var valIndex = 0;
      multiHeaders.forEach(function(multiheader, index) {
        PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', multiheader).then(function(colIndexArr) {
          colIndexArr.forEach(function(colindex) {
            SlickGridFunctions.getColumnNames('Weights').then(function(arr) {
              PA3MainPage.getCellValueForMultiHeaderColumn('Weights', 'Total', colindex, 'grid-canvas grid-canvas-top ' +
                'grid-canvas-left', 'grid-canvas grid-canvas-top grid-canvas-right').then(function(colValue) {
                if (colValue !== values[valIndex]) {
                  expect(false).customError('Cell value for ' + multiheader + '|' + arr[colindex] + ' column "Total" row is not ' +
                    'set to "' + values[valIndex] + '"; Found: ' + colValue);
                  CommonFunctions.takeScreenShot();
                }
              }).then(function() {
                valIndex = valIndex + 1;
              });
            });
          });
        });
      });
    });
  });

  describe('Test Step ID: 762640', function() {

    // Navigate to Stress Tests tab in Tile Options dialog
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Stress Tests', 'Risk');

    var arrElement = ['S&P 500 30% Decline - Daily Frequency', 'S&P 500 30% Decline - Monthly Frequency'];

    arrElement.forEach(function(element) {

      it('Should verify if "Client" from the Available section is expanded by default. If not, expand it', function() {
        var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Client');

        group.isExpanded().then(function(expanded) {
          if (!expanded) {
            group.expand();
          }
        });
      });

      it('Should select "Client > ' + element + '" from the Available section', function() {
        var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Client');
        group.getItemByText(element).then(function(itemRef) {
          itemRef.getActions().then(function(val) {
            val.triggerAction('remove');
          });
        });
      });

      it('Should verify if "Delete Stress Test" appeared', function() {
        ThiefHelpers.isDialogOpen('Delete Stress Test').then(function(option) {
          if (!option) {
            expect(false).customError('"Delete Stress Test" dialog has not appeared');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Should click "Delete" in the Delete Stress Test dialog', function() {
        ThiefHelpers.getDialogButton('Delete Stress Test', 'Delete').click();
      });

      it('Should verify if "Delete Stress Test" dialog closed', function() {
        ThiefHelpers.isDialogOpen('Delete Stress Test').then(function(option) {
          if (option) {
            expect(false).customError('"Delete Stress Test" dialog has not closed');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should verify if "Client > Shock Gold to 1000" is removed from Available section', function() {
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getChildrenText().then(function(childArr) {
        childArr.forEach(function(element) {
          if (element.text === 'Client') {
            var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Client');
            group.isExpanded().then(function(isExpanded) {
              if (!isExpanded) {
                group.expand();
              }
            });

            group.isExpanded().then(function(expanded) {
              if (expanded) {
                group.getChildrenText().then(function(arrObject) {
                  arrObject.forEach(function(listItem) {
                    if (arrElement.indexOf(listItem.text) > -1) {
                      expect(false).customError('"Shock Gold to 1000" is not deleted from "Client" directory');
                      CommonFunctions.takeScreenShot();
                    }
                  });
                });
              } else {
                expect(false).customError('"Client" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          }
        });
      });
    });
  });
});
