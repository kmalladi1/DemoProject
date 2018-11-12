'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: st-custom', function() {

  // Global Variables
  var GEM2L = [];
  var GEM3L = [];
  var Axioma = [];

  describe('Test Step ID: 555930', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:;Pa3;Risk;CUSTOM_STRESS_TEST"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('custom-stress-test');
    });

    it('Verifying if "Calculation Error" dialog is displayed', function() {
      ThiefHelpers.getDialogClassReference('Calculation Error', 1).isOpen().then(function(dialogStatus) {
        if (!dialogStatus) {
          expect(false).customError('"Calculation Error" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in "Calculation Error" dialog', function() {
      ThiefHelpers.getDialogButton('Calculation Error', 'OK', 1).click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in "Calculation Error" dialog');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Calculation Error" dialog is closed', function() {
      ThiefHelpers.getDialogClassReference('Calculation Error', 1).isOpen().then(function(dialogStatus) {
        if (dialogStatus) {
          expect(false).customError('"Calculation Error" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrValues = [{name: 'Portfolio', val: 'US:DJII', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'benchmark', val: 'CASH:USD', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });

    it('Verifying if Weights report is blank', function() {
      PA3MainPage.isReportCalculated('Weights', true).then(function(found) {
        if (found) {
          expect(false).customError('"Weights" report is not blank. Report is calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function() {
      });
    });

  });

  describe('Test Step ID: 555931', function() {

    // Select stress tests tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Stress Tests', 'Risk');

    it('Should expand "FactSet > Factor Stress Tests > FX" and click on "Duplicate" icon of the "USD/CAD FX Rate 30% Decline" item in the "Available" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('FactSet');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Factor Stress Tests').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('FX').then(function(subGroup1) {
                  subGroup1.expand();
                  subGroup1.isExpanded().then(function(expanded) {
                    if (expanded) {
                      subGroup1.getItemByText('USD/CAD FX Rate 30% Decline').then(function(item) {
                        item.select();

                        item.getActions().then(function(actions) {
                          actions.triggerAction('duplicate');
                        });
                      });
                    } else {
                      expect(false).customError('"FX" is not expanded');
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
      ThiefHelpers.getDialogClassReference('Edit Stress Test', 1).isOpen().then(function(dialogStatus) {
        if (!dialogStatus) {
          expect(false).customError('"Edit Stress Test" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if in "Edit Stress Test" dialog the "Name" field is populated with "Copy of USD/CAD FX Rate 30% Decline"', function() {
      ThiefHelpers.getTextBoxClassReference('Name', undefined).getText().then(function(text) {
        if (text !== 'Copy of USD/CAD FX Rate 30% Decline') {
          expect(false).customError('"Edit Stress Test" dialog the "Name" field is  not populated with "Copy of USD/CAD FX Rate 30% Decline"' +
            ' instead "' + text + '" is found');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 555932', function() {

    it('Should enter "Custom_Stress_Test" in "Name" field of "Edit Stress Test" dialog', function() {
      ThiefHelpers.getTextBoxClassReference('Name', undefined).setText('Custom_Stress_Test');
    });

    it('Verifying if the "Name" textbox is set to "IBM_Highest"', function() {
      ThiefHelpers.getTextBoxClassReference('Name', undefined).getText().then(function(text) {
        if (text !== 'Custom_Stress_Test') {
          expect(false).customError('"Name" field is not set with "Custom_Stress_Test" in "Edit Stress Test" dialog' +
            ' instead "' + text + '" is found');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.selectDirectoryAndSubDirectoryAndVerify('Personal', 'Personal');

    it('Should click on "Save" button in "Edit Stress Test" dialog', function() {
      ThiefHelpers.getButtonClassReference('', PA3MainPage.getButton('Save')).press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Save" button in "Edit Stress Test" dialog');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait until loading spinner disappears', function() {

      // Verifying if spinner is displayed
      CreateNewStressTest.getSpinner().isPresent().then(function(spinnerStatus) {
        if (spinnerStatus) {

          // Wait for the loading icon to disappear
          Utilities.waitUntilElementDisappears(CreateNewStressTest.getSpinner(), 120000);
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options - Weights');

  });

  describe('Test Step ID: 555938', function() {

    // Select stress tests tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Stress Tests', 'Risk');

    it('Should select "Custom_Stress_Test" from the "Personal" in available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('Custom_Stress_Test').then(function(item) {
            item.select();

            // Check if 'Custom_Stress_Test' is selected
            item.isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError('"Custom_Stress_Test" did not selected from "Available" section');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Personal" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on right arrow button to move "Custom_Stress_Test" item to selected section', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying if "Custom_Stress_Test" item is available in "Selected" section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          console.log(childArr[i].text);
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Custom_Stress_Test') === -1) {
          expect(false).customError('"Custom_Stress_Test" is not added to selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

  });

  describe('Test Step ID: 555933', function() {

    it('Should Save totals row values for all columns under the "Barra Global Long-Term (GEM3L)" section Header ' +
      'for verification in later test step', function() {
      var arrOfColumns = [];
      var arrOfIndexs = [];
      var columnValues = function(i, j) {
        if (i === arrOfIndexs[j]) {
          SlickGridFunctions.getCellReference('Weights', 'Total', '', arrOfColumns[i], 'Barra Global Long-Term (GEM3L)').then(function(cellRef) {
            cellRef.getText().then(function(value) {
              console.log(value);
              GEM3L.push(value);
            });
          });
        }
      };

      SlickGridFunctions.getColumnNames('Weights').then(function(columnsArray) {
        arrOfColumns = columnsArray;

        // Fetching column index of columns under "Barra Global Long-Term (GEM3L)" section Header
        PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', 'Barra Global Long-Term Model (GEM3L)').then(function(indexsArray) {
          arrOfIndexs = indexsArray;
          for (var i = 1; i < columnsArray.length; i++) {
            for (var j = 0; j < indexsArray.length; j++) {
              columnValues(i, j);
            }
          }
        });

      });
    });

    it('Should Save totals row values for all columns under the "Barra Global Long-Term Model (GEM2L)" section Header ' +
      'for verification in later test step', function() {
      var arrOfColumns = [];
      var arrOfIndexs = [];
      var columnValues = function(i, j) {
        if (i === arrOfIndexs[j]) {
          SlickGridFunctions.getCellReference('Weights', 'Total', '', arrOfColumns[i], 'Barra Global Long-Term Model (GEM2L)').then(function(cellRef) {
            cellRef.getText().then(function(value) {
              GEM2L.push(value);
            });
          });
        }
      };

      SlickGridFunctions.getColumnNames('Weights').then(function(columnsArray) {
        arrOfColumns = columnsArray;

        // Fetching column index of columns under "Barra Global Long-Term Model (GEM2L)" section Header
        PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', 'Barra Global Long-Term Model (GEM2L)').then(function(indexsArray) {
          arrOfIndexs = indexsArray;
          for (var i = 1; i < columnsArray.length; i++) {
            for (var j = 0; j < indexsArray.length; j++) {
              columnValues(i, j);
            }
          }
        });

      });
    });

    it('Should Save totals row values for all columns under the "Axioma World-Wide Fundamental Equity Risk Model MH 2.1" section Headers ' +
      'for verification in later test step', function() {
      var arrOfColumns = [];
      var arrOfIndexs = [];
      var columnValues = function(i, j) {
        if (i === arrOfIndexs[j]) {
          SlickGridFunctions.getCellReference('Weights', 'Total', '', arrOfColumns[i], 'Axioma World-Wide Fundamental Equity Risk Model MH 2.1').then(function(cellRef) {
            cellRef.getText().then(function(value) {
              Axioma.push(value);
            });
          });
        }
      };

      SlickGridFunctions.getColumnNames('Weights').then(function(columnsArray) {
        arrOfColumns = columnsArray;

        // Fetching column index of columns under "Axioma World-Wide Fundamental Equity Risk Model MH 2.1" section Header
        PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', 'Axioma World-Wide Fundamental Equity Risk Model MH 2.1').then(function(indexsArray) {
          arrOfIndexs = indexsArray;
          for (var i = 1; i < columnsArray.length; i++) {
            for (var j = 0; j < indexsArray.length; j++) {
              columnValues(i, j);
            }
          }
        });

      });
    });

    // Select stress tests tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Stress Tests', 'Risk');

    it('Should select "Custom_Stress_Test" item from "Selected" section and verify', function() {
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getItemByText('Custom_Stress_Test').select();

      // Verify if 'Custom_Stress_Test' is selected
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getItemByText('Custom_Stress_Test').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Custom_Stress_Test" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "X" icon of "Custom_Stress_Test" item in "Selected" section', function() {
      var action = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getItemByText('Custom_Stress_Test');

      // Hover on "Custom_Stress_Test" and click on remove button
      return action.getActions().then(function(remove) {
        return remove.triggerAction('remove');
      });
    });

    it('Verifying if still "Custom_Stress_Test" item is available in "Selected" section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Custom_Stress_Test') >= 0) {
          expect(false).customError('"Custom_Stress_Test" is not removed from the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 555934', function() {

    it('Should select "USD/CAD FX Rate 30% Decline" under "FactSet|Factor Stress Tests|FX" from "Available" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('FactSet');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Factor Stress Tests').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('FX').then(function(subGroup1) {
                  subGroup1.expand();
                  subGroup1.isExpanded().then(function(expanded) {
                    if (expanded) {
                      subGroup1.getItemByText('USD/CAD FX Rate 30% Decline').then(function(item) {
                        item.select();

                        // Check if element is selected
                        item.isSelected().then(function(selected) {
                          if (!selected) {
                            expect(false).customError('"USD/CAD FX Rate 30% Decline" did not selected from "Available" section');
                            CommonFunctions.takeScreenShot();
                          }
                        });
                      });
                    } else {
                      expect(false).customError('"FX" is not expanded');
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

    it('Should click on right arrow button to move "USD/CAD FX Rate 30% Decline" item to selected section', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying if "USD/CAD FX Rate 30% Decline" item is available in "Selected" section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        console.log(myArray.indexOf('USD/CAD FX Rate 30% Decline'));

        if (myArray.indexOf('USD/CAD FX Rate 30% Decline') < 0) {
          expect(false).customError('"USD/CAD FX Rate 30% Decline" is not available in selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

  });

  describe('Test Step ID: 555939', function() {

    var GEM3L2 = [];
    var GEM2L2 = [];
    var Axioma2 = [];

    it('Should Save totals row values for all columns under the "Barra Global Long-Term (GEM3L)" section Header ' +
      'for verification in later test step', function() {
      var arrOfColumns = [];
      var arrOfIndexs = [];
      var columnValues = function(i, j) {
        if (i === arrOfIndexs[j]) {
          SlickGridFunctions.getCellReference('Weights', 'Total', '', arrOfColumns[i], 'Barra Global Long-Term (GEM3L)').then(function(cellRef) {
            cellRef.getText().then(function(value) {
              GEM3L2.push(value);
            });
          });
        }
      };

      SlickGridFunctions.getColumnNames('Weights').then(function(columnsArray) {
        arrOfColumns = columnsArray;

        // Fetching column index of columns under "Barra Global Long-Term (GEM3L)" section Header
        PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', 'Barra Global Long-Term Model (GEM3L)').then(function(indexsArray) {
          arrOfIndexs = indexsArray;
          for (var i = 1; i < columnsArray.length; i++) {
            for (var j = 0; j < indexsArray.length; j++) {
              columnValues(i, j);
            }
          }
        });

      });
    });

    it('Should Save totals row values for all columns under the "Barra Global Long-Term Model (GEM2L)" section Header ' +
      'for verification in later test step', function() {
      var arrOfColumns = [];
      var arrOfIndexs = [];
      var columnValues = function(i, j) {
        if (i === arrOfIndexs[j]) {
          SlickGridFunctions.getCellReference('Weights', 'Total', '', arrOfColumns[i], 'Barra Global Long-Term Model (GEM2L)').then(function(cellRef) {
            cellRef.getText().then(function(value) {
              GEM2L2.push(value);
            });
          });
        }
      };

      SlickGridFunctions.getColumnNames('Weights').then(function(columnsArray) {
        arrOfColumns = columnsArray;

        // Fetching column index of columns under "Barra Global Long-Term Model (GEM2L)" section Header
        PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', 'Barra Global Long-Term Model (GEM2L)').then(function(indexsArray) {
          arrOfIndexs = indexsArray;
          for (var i = 1; i < columnsArray.length; i++) {
            for (var j = 0; j < indexsArray.length; j++) {
              columnValues(i, j);
            }
          }
        });

      });
    });

    it('Should Save totals row values for all columns under the "Axioma World-Wide Fundamental Equity Risk Model MH 2.1" section Headers ' +
      'for verification in later test step', function() {
      var arrOfColumns = [];
      var arrOfIndexs = [];
      var columnValues = function(i, j) {
        if (i === arrOfIndexs[j]) {
          SlickGridFunctions.getCellReference('Weights', 'Total', '', arrOfColumns[i], 'Axioma World-Wide Fundamental Equity Risk Model MH 2.1').then(function(cellRef) {
            cellRef.getText().then(function(value) {
              Axioma2.push(value);
            });
          });
        }
      };

      SlickGridFunctions.getColumnNames('Weights').then(function(columnsArray) {
        arrOfColumns = columnsArray;

        // Fetching column index of columns under "Axioma World-Wide Fundamental Equity Risk Model MH 2.1" section Header
        PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', 'Axioma World-Wide Fundamental Equity Risk Model MH 2.1').then(function(indexsArray) {
          arrOfIndexs = indexsArray;
          for (var i = 1; i < columnsArray.length; i++) {
            for (var j = 0; j < indexsArray.length; j++) {
              columnValues(i, j);
            }
          }
        });

      });
    });

    it('Verifying if total values for columns under "Barra Global Long-Term (GEM3L)" section header are matched with' +
      ' values in "GEM3L"', function() {
      var compare = function(i, j) {
        if (i === j) {
          if (GEM3L[i] !== GEM3L2[i]) {
            expect(false).customError('Total values for "' + i + '" column under "Barra Global Long-Term (GEM3L)"' +
              ' section header are not matched with' +
              ' values in "GEM3L", Expected: "' + GEM3L[i] + '" but Found: "' + GEM3L2[i] + '"');
            CommonFunctions.takeScreenShot();
          }
        }
      };

      if (GEM3L.length === GEM3L2.length) {
        for (var i = 0; i < GEM3L.length; i++) {
          for (var j = 0; j < GEM3L2.length; j++) {
            compare(i, j);
          }
        }
      } else {
        expect(false).customError('Number of columns under "Barra Global Long-Term (GEM3L)" section header ' +
          'are not matching with the columns in the previous step');
        CommonFunctions.takeScreenShot();
      }
    });

    it('Verifying if total values for columns under "Barra Global Long-Term (GEM2L)" section header are matched with' +
      ' values in "GEM3L"', function() {
      var compare = function(i, j) {
        if (i === j) {
          if (GEM2L[i] !== GEM2L2[i]) {
            expect(false).customError('Total values for "' + i + '" column under "Barra Global Long-Term (GEM2L)"' +
              ' section header are not matched with' +
              ' values in "GEM3L", Expected: "' + GEM2L[i] + '" but Found: "' + GEM2L2[i] + '"');
            CommonFunctions.takeScreenShot();
          }
        }
      };

      if (GEM2L.length === GEM2L2.length) {
        for (var i = 0; i < GEM2L.length; i++) {
          for (var j = 0; j < GEM2L2.length; j++) {
            compare(i, j);
          }
        }
      } else {
        expect(false).customError('Number of columns under "Barra Global Long-Term (GEM2L)" section header ' +
          'are not matching with the columns in the previous step');
        CommonFunctions.takeScreenShot();
      }
    });

    it('Verifying if total values for columns under "Axioma World-Wide Fundamental Equity Risk Model MH 2.1" section header are matched with' +
      ' values in "Axioma"', function() {
      var compare = function(i, j) {
        if (i === j) {
          if (Axioma[i] !== Axioma2[i]) {
            expect(false).customError('Total values for "' + i + '" column under "Axioma World-Wide Fundamental ' +
              'Equity Risk Model MH 2.1" section header are not matched with' +
              ' values in "GEM3L", Expected: "' + Axioma[i] + '" but Found: "' + Axioma2[i] + '"');
            CommonFunctions.takeScreenShot();
          }
        }
      };

      if (Axioma.length === Axioma2.length) {
        for (var i = 0; i < Axioma.length; i++) {
          for (var j = 0; j < Axioma2.length; j++) {
            compare(i, j);
          }
        }
      } else {
        expect(false).customError('Number of columns under "Axioma World-Wide Fundamental Equity Risk Model MH 2.1" section header ' +
          'are not matching with the columns in the previous step');
        CommonFunctions.takeScreenShot();
      }
    });

  });

  describe('Test Step ID: 555940', function() {

    // Select stress tests tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Stress Tests', 'Risk');

    it('Should click on "wrench" icon next to "Custom_Stress_Test" in "Available" section and select edit from menu', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');
      group.expand();
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(TileOptionsRiskStressTests.xpathAvailableContainer, 'Personal', 'Custom_Stress_Test', 'last').then(function(indexOfElement) {
            var action = group.getItemByIndex(indexOfElement);

            // Click on the "remove" icon
            return action.then(function(remove) {
              return remove.getActions().then(function(val) {
                return val.triggerAction('edit');
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

    it('Verifying if "Edit Stress Test" dialog is displayed', function() {
      ThiefHelpers.getDialogClassReference('Edit Stress Test', 1).isOpen().then(function(dialogStatus) {
        if (!dialogStatus) {
          expect(false).customError('"Edit Stress Test" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "-20.00" in the "Shock" text field', function() {
      ThiefHelpers.getTextBoxClassReference(undefined,
        CreateNewStressTest.getInputBox('Shock')).setText('-20.00');
    });

    it('Verifying if "Shock" input is having value "-20.00"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateNewStressTest.getInputBox('Shock')).getText().then(
        function(val) {
          if (val !== '-20.00') {
            expect(false).customError('"-20.00" is not entered in "Shock" input instead found: ' + val);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Clear the text in the text box', function() {
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).clear();

      // Verifying if "Name" filed is cleared
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).getAttribute('value').then(function(text) {
        if (text !== '') {
          expect(false).customError('The "Factor" textbox is not set to ""; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "VALUE("!XRCAD",(P_PRICE(#SD,#ED,#FR,USD)/P_PRICE(#SD-1#FR,#ED-1#FR,#FR,USD)-1)*10)" in the "Factor" text field', function() {
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).sendKeys('VALUE("!XRCAD",(P_PRICE(#SD,#ED,#FR,USD)/P_PRICE(#SD-1#FR,#ED-1#FR,#FR,USD)-1)*10)').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Factor" input is having "VALUE("!XRCAD",(P_PRICE(#SD,#ED,#FR,USD)/P_PRICE(#SD-1#FR,#ED-1#FR,#FR,USD)-1)*10)"', function() {
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).getAttribute('value').then(
        function(val) {
          if (val !== 'VALUE("!XRCAD",(P_PRICE(#SD,#ED,#FR,USD)/P_PRICE(#SD-1#FR,#ED-1#FR,#FR,USD)-1)*10)') {
            expect(false).customError('"VALUE("!XRCAD",(P_PRICE(#SD,#ED,#FR,USD)/P_PRICE(#SD-1#FR,#ED-1#FR,#FR,USD)-1)*10)" ' +
              'is not entered in "Factor" input and Found: ' + val);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should click on "Save" button in "Edit Stress Test" dialog', function() {
      ThiefHelpers.getButtonClassReference('', PA3MainPage.getButton('Save')).press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Save" button in "Edit Stress Test" dialog');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Saving Stress test.. appears', function() {

      // Verifying if spinner is displayed
      CreateNewStressTest.getSpinner().isPresent().then(function(spinnerStatus) {
        if (spinnerStatus) {

          // Wait for the loading icon to disappear
          Utilities.waitUntilElementDisappears(CreateNewStressTest.getSpinner(), 120000);
        }
      });
    });

  });

  describe('Test Step ID: 555935', function() {

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should open PA3 Application with "Client:;Pa3;Risk;CUSTOM_STRESS_TEST"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('custom-stress-test');
    });

    it('Verifying if "Calculation Error" dialog is displayed', function() {
      ThiefHelpers.getDialogClassReference('Calculation Error', 1).isOpen().then(function(dialogStatus) {
        if (!dialogStatus) {
          expect(false).customError('"Calculation Error" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in "Calculation Error" dialog', function() {
      ThiefHelpers.getDialogButton('Calculation Error', 'OK', 1).click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in "Calculation Error" dialog');
        CommonFunctions.takeScreenShot();
      });
    });

    var arrValues = [{name: 'Portfolio', val: 'US:DJII', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'benchmark', val: 'CASH:USD', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });

    it('Verifying that report header displays "Dow Jones Industrials vs U.S. Dollar Index"', function() {
      PA3MainPage.getHeader().getText().then(function(header) {
        expect(header === 'Dow Jones Industrials vs U.S. Dollar Index').customError('Report header does not ' + 'displays "Dow Jones Industrials vs U.S. Dollar Index"');
        if (header !== 'Dow Jones Industrials vs U.S. Dollar Index') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 555936', function() {

    // Select stress tests tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Stress Tests', 'Risk');

    it('Should select "Custom_Stress_Test" under "Personal" from "Available" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('Custom_Stress_Test').then(function(item) {
            item.select();

            // Check if 'Custom_Stress_Test' is selected
            item.isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError('"Custom_Stress_Test" did not selected from "Available" section');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Personal" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on right arrow button to move "Custom_Stress_Test" item to selected section', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying if "Custom_Stress_Test" item is available in "Selected" section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Custom_Stress_Test') === -1) {
          expect(false).customError('"Custom_Stress_Test" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

  });

  describe('Test Step ID: 555937', function() {

    var GEM3L2 = [];
    var GEM2L2 = [];
    var Axioma2 = [];

    it('Should Save totals row values for all columns under the "Barra Global Long-Term (GEM3L)" section Header ' +
      'for verification in later test step', function() {
      var arrOfColumns = [];
      var arrOfIndexs = [];
      var columnValues = function(i, j) {
        if (i === arrOfIndexs[j]) {
          SlickGridFunctions.getCellReference('Weights', 'Total', '', arrOfColumns[i], 'Barra Global Long-Term (GEM3L)').then(function(cellRef) {
            cellRef.getText().then(function(value) {
              GEM3L2.push(value);
            });
          });
        }
      };

      SlickGridFunctions.getColumnNames('Weights').then(function(columnsArray) {
        arrOfColumns = columnsArray;

        // Fetching column index of columns under "Barra Global Long-Term (GEM3L)" section Header
        PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', 'Barra Global Long-Term Model (GEM3L)').then(function(indexsArray) {
          arrOfIndexs = indexsArray;
          for (var i = 1; i < columnsArray.length; i++) {
            for (var j = 0; j < indexsArray.length; j++) {
              columnValues(i, j);
            }
          }
        });

      });
    });

    it('Should Save totals row values for all columns under the "Barra Global Long-Term Model (GEM2L)" section Header ' +
      'for verification in later test step', function() {
      var arrOfColumns = [];
      var arrOfIndexs = [];
      var columnValues = function(i, j) {
        if (i === arrOfIndexs[j]) {
          SlickGridFunctions.getCellReference('Weights', 'Total', '', arrOfColumns[i], 'Barra Global Long-Term Model (GEM2L)').then(function(cellRef) {
            cellRef.getText().then(function(value) {
              GEM2L2.push(value);
            });
          });
        }
      };

      SlickGridFunctions.getColumnNames('Weights').then(function(columnsArray) {
        arrOfColumns = columnsArray;

        // Fetching column index of columns under "Barra Global Long-Term Model (GEM2L)" section Header
        PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', 'Barra Global Long-Term Model (GEM2L)').then(function(indexsArray) {
          arrOfIndexs = indexsArray;
          for (var i = 1; i < columnsArray.length; i++) {
            for (var j = 0; j < indexsArray.length; j++) {
              columnValues(i, j);
            }
          }
        });

      });
    });

    it('Should Save totals row values for all columns under the "Axioma World-Wide Fundamental Equity Risk Model MH 2.1" section Headers ' +
      'for verification in later test step', function() {
      var arrOfColumns = [];
      var arrOfIndexs = [];
      var columnValues = function(i, j) {
        if (i === arrOfIndexs[j]) {
          SlickGridFunctions.getCellReference('Weights', 'Total', '', arrOfColumns[i], 'Axioma World-Wide Fundamental Equity Risk Model MH 2.1').then(function(cellRef) {
            cellRef.getText().then(function(value) {
              Axioma2.push(value);
            });
          });
        }
      };

      SlickGridFunctions.getColumnNames('Weights').then(function(columnsArray) {
        arrOfColumns = columnsArray;

        // Fetching column index of columns under "Axioma World-Wide Fundamental Equity Risk Model MH 2.1" section Header
        PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', 'Axioma World-Wide Fundamental Equity Risk Model MH 2.1').then(function(indexsArray) {
          arrOfIndexs = indexsArray;
          for (var i = 1; i < columnsArray.length; i++) {
            for (var j = 0; j < indexsArray.length; j++) {
              columnValues(i, j);
            }
          }
        });

      });
    });

    it('Verifying if total values for columns under "Barra Global Long-Term (GEM3L)" section header are not matched with' +
      ' values in "GEM3L"', function() {
      var compare = function(i, j) {
        if (i === j) {
          if (GEM3L[i] === GEM3L2[i]) {
            expect(false).customError('Total values for "' + i + '" column under "Barra Global Long-Term (GEM3L)" section header are matched with' +
              ' values in "GEM3L", Expected: "' + GEM3L[i] + '" but Found: "' + GEM3L2[i] + '"');
            CommonFunctions.takeScreenShot();
          }
        }
      };

      if (GEM3L.length === GEM3L2.length) {
        for (var i = 1; i < GEM3L.length; i++) {
          for (var j = 1; j < GEM3L2.length; j++) {
            compare(i, j);
          }
        }
      } else {
        expect(false).customError('Number of columns under "Barra Global Long-Term (GEM3L)" section header ' +
          'are not matching with the columns in the previous step');
        CommonFunctions.takeScreenShot();
      }
    });

    it('Verifying if total values for columns under "Barra Global Long-Term (GEM2L)" section header are not matched with' +
      ' values in "GEM3L"', function() {
      var compare = function(i, j) {
        if (i === j) {
          if (GEM2L[i] === GEM2L2[i]) {
            expect(false).customError('Total values for "' + i + '" column under "Barra Global Long-Term (GEM2L)" section header are matched with' +
              ' values in "GEM3L", Expected: "' + GEM2L[i] + '" but Found: "' + GEM2L2[i] + '"');
            CommonFunctions.takeScreenShot();
          }
        }
      };

      if (GEM2L.length === GEM2L2.length) {
        for (var i = 1; i < GEM2L.length; i++) {
          for (var j = 1; j < GEM2L2.length; j++) {
            compare(i, j);
          }
        }
      } else {
        expect(false).customError('Number of columns under "Barra Global Long-Term (GEM2L)" section header ' +
          'are not matching with the columns in the previous step');
        CommonFunctions.takeScreenShot();
      }
    });

    it('Verifying if total values for columns under "Axioma World-Wide Fundamental Equity Risk Model MH 2.1" section header are not matched with' +
      ' values in "Axioma"', function() {
      var compare = function(i, j) {
        if (i === j) {
          if (Axioma[i] === Axioma2[i]) {
            expect(false).customError('Total values for "' + i + '" column under "Axioma World-Wide Fundamental Equity Risk Model MH 2.1" section header are matched with' +
              ' values in "GEM3L", Expected: "' + Axioma[i] + '" but Found: "' + Axioma2[i] + '"');
            CommonFunctions.takeScreenShot();
          }
        }
      };

      if (Axioma.length === Axioma2.length) {
        for (var i = 1; i < Axioma.length; i++) {
          for (var j = 1; j < Axioma2.length; j++) {
            compare(i, j);
          }
        }
      } else {
        expect(false).customError('Number of columns under "Axioma World-Wide Fundamental Equity Risk Model MH 2.1" section header ' +
          'are not matching with the columns in the previous step');
        CommonFunctions.takeScreenShot();
      }
    });

  });

  describe('Test Step ID: 555942', function() {

    // Select stress tests tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Stress Tests', 'Risk');

    it('Should click on "X" icon of "Custom_Stress_Test" item in "Selected" section', function() {
      var action = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getItemByText('Custom_Stress_Test');

      // Hover on "Custom_Stress_Test" and click on remove button
      return action.getActions().then(function(remove) {
        return remove.triggerAction('remove');
      });
    });

    it('Verifying if still "Custom_Stress_Test" item is available in "Selected" section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Custom_Stress_Test') >= 0) {
          expect(false).customError('"Custom_Stress_Test" is not removed from the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    it('Should click on "OK" button in "Calculation Error" dialog', function() {
      ThiefHelpers.getDialogButton('Calculation Error', 'OK', 1).click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in "Calculation Error" dialog');
        CommonFunctions.takeScreenShot();
      });
    });

    var arrValues = [{name: 'Portfolio', val: 'US:DJII', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'benchmark', val: 'CASH:USD', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });

    it('Verifying if Weights report is blank', function() {
      PA3MainPage.isReportCalculated('Weights', true).then(function(found) {
        if (found) {
          expect(false).customError('"Weights" report is not blank. Report is calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function() {
      });
    });

  });

  describe('Test Step ID: 555941', function() {

    // Select stress tests tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Stress Tests', 'Risk');

    it('Expand "Personal" from "Available" container and hover on "Custom_Stress_Test" to click on "Remove" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');
      group.expand();
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(TileOptionsRiskStressTests.xpathAvailableContainer, 'Personal', 'Custom_Stress_Test', 'last').then(function(indexOfElement) {
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

    it('Verifying if "Delete Stress Test" dialog is displayed', function() {
      ThiefHelpers.getDialogClassReference('Delete Stress Test', 1).isOpen().then(function(dialogStatus) {
        if (!dialogStatus) {
          expect(false).customError('"Delete Stress Test" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Delete" button in "Delete Stress Test" dialog', function() {
      ThiefHelpers.getDialogButton('Delete Stress Test', 'Delete', 1).click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Delete" button in "Calculation Error" dialog');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Delete Stress Test" dialog is closed', function() {
      ThiefHelpers.getDialogClassReference('Delete Stress Test', 1).isOpen().then(function(dialogStatus) {
        if (dialogStatus) {
          expect(false).customError('"Delete Stress Test" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Custom_Stress_Test" is not available under "Personal" in "Available" section', function() {
      TileOptionsRiskStressTests.getElementFromAvailableSection('Personal', 'Custom_Stress_Test').isPresent().then(function(itemStatus) {
        if (itemStatus) {
          expect().customError('"Custom_Stress_Test" is available under "Personal" in "Available" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 555962', function() {

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options - Weights');

  });

});
