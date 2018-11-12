'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: cond-frmtg-cndtn', function() {

  // styleAttributeRYU: This attribute has Font - Red, Cell color - Yellow and value - Underlined
  var styleAttributeRYU = 'background-color: rgb(255, 255, 77); color: rgb(252, 11, 11); text-decoration: underline;';

  // styleAttributeRYU: This attribute has Font - Orange, Cell color - Pink and value - bold
  var styleAttributeOPB = 'background-color: rgb(255, 77, 255); color: rgb(255, 166, 122); font-weight: bold;';

  // styleAttributeBGI: This attribute has Font - Brown, Cell color - Green and value - italic
  var styleAttributeBGI = 'background-color: rgb(166, 255, 77); color: rgb(255, 166, 122); font-style: italic;';

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  describe('Test Step ID: Start Up', function() {

    it('Should click on the folder icon on app toolbar', function() {
      PA3MainPage.getFolderDropDown().click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking:' + err);
      });
    });

    it('Should select "New" from list', function() {
      PA3MainPage.getOptionFromFolderMenu('New').click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking:' + err);
      });
    });

    it('Verifying if "Document has changed" pop up is appeared on the screen and click on "Don\'t Save Changes" button', function() {
      PA3MainPage.getDialog('Document has changed').isPresent().then(function(found) {
        if (found) {
          PA3MainPage.getButton('Don\'t Save Changes').click().then(function() {
          }, function(error) {

            CommonFunctions.takeScreenShot();
            expect(false).customError(error);
          });

          // Verifying that error pop-up is disappeared
          PA3MainPage.getDialog('Document has changed').isPresent().then(function(found) {
            if (found) {
              expect(false).customError('"Document has changed" dialog is not disappeared');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });
    });
  });

  describe('Test Step ID: 565291', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch application with document "Client:;PA3;Formatting;conditional-formatting"', function() {
      PA3MainPage.switchToDocument('conditional-formatting');
    });

    it('Waiting for "Sector Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Sector Weights" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Sector Weights').then(function(found) {
        if (!found) {
          expect(false).customError('"Sector Weights" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Sector Weights')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that report is grouped by "Economic Sector"', function() {
      PA3MainPage.getGroupingsHyperLink('Sector Weights').getText().then(function(refVal) {
        if (refVal.indexOf('Economic Sector') === -1) {
          expect(false).customError('The report is not grouped by "Economic Sector"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Sector Weights" report is grouped by date: "11/03/2015"', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(value) {
        if (value !== '11/03/2015') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Report was not grouped by date range: "11/03/2015". ' + 'Found: "' + value + '"');
        }
      });
    });
  });

  describe('Test Step ID: 565302', function() {

    // Clicking on wrench Icon from 'Sector Weights' report toolbar
    it('Should click on wrench icon from "Sector Weights" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Sector Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Clicking on 'Options' from Wrench Menu drop down.
    it('Should click "Options" from dropdown menu', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Sector Weights" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Sector Weights') {
          expect(false).customError('"Tile Options - Sector Weights" view has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on Columns LHP item to select.
    it('Should click on Columns from LHP ', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Columns' item is opened.
      TileOptions.getOptionTitle().getText().then(function(title) {
        expect(title === 'Columns').customError('"Columns" item did not select from LHP');
        if (title !== 'Columns') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Port. Ending Weight" from the "Selected" section', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Port. Ending Weight');
      item.select();

      // Check if 'Port. Ending Weight' is selected
      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Port. Ending Weight" did not selected from "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "CONDITIONAL FORMATTING" section from "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('CONDITIONAL FORMATTING').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"CONDITIONAL FORMATTING" section is not expanded from "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Bench. Ending Weight" from "Column" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Bench. Ending Weight', 'Column');

      // Verify if Bench. Ending Weight is selected or not
      ThiefHelpers.getDropDownSelectClassReference('Column').getSelectedText().then(function(text) {
        if (text !== 'Bench. Ending Weight') {
          expect(false).customError('"Column" drop down is not set to "Bench. Ending Weight". ' + 'Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrCheckBoxes = ['Group Level', 'Total Level'];
    arrCheckBoxes.forEach(function(element) {
      it('Should check "' + element + '" check box under "Apply To"', function() {
        ThiefHelpers.getCheckBoxClassReference(element).check();
      });
    });

    it('Should select "+ Add Condition" button', function() {
      ThiefHelpers.getButtonClassReference('Add Condition').press();
    });

    it('Should select "is less than" from "equals" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('is less than', undefined, TileOptionsColumns.xpathEqualsDropdown, undefined);
    });

    it('Verifying that the "equals" drop down is set to "is less than"', function() {
      ThiefHelpers.verifySelectedDropDownText('is less than', undefined, TileOptionsColumns.xpathEqualsDropdown, undefined);
    });

    it('Should enter "6" in the text box next to "Constant" drop down', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsColumns.xpathConstantTextbox).setText('6');

      // Verifying if "6" is present in the text field
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsColumns.xpathConstantTextbox).getText().then(function(text) {
        if (text !== '6') {
          expect(false).customError('The text box next to "Constant" drop down did not set to "6". ' + 'Found:"' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Font" drop down', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathColorPickerButton, 'Font');
      ThiefHelpers.getButtonClassReference(undefined, xpath).press();

      // Verifying if "Font" drop down is opened or not
      element(by.xpath(xpath)).getAttribute('class').then(function(text) {
        if (text.indexOf('active') < 0) {
          expect(false).customError('"Font" drop down did not open even after clicking on it');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Red" from the color picker', function() {
      ChartingUtilities.selectColorFrmDD('rgb(252, 11, 11)');

      // Verifying if "Red" color is selected from drop down
      TileOptionsColumns.getColorPickerButton('Font').getAttribute('style').then(function(value) {
        if (value.indexOf('rgb(252, 11, 11)') < 0) {
          expect(false).customError('The "Font" drop down did not show "Red" color.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Cell" drop down', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathColorPickerButton, 'Cell');
      ThiefHelpers.getButtonClassReference(undefined, xpath).press();

      // Verifying if "Cell" drop down is opened or not
      element(by.xpath(xpath)).getAttribute('class').then(function(text) {
        if (text.indexOf('active') < 0) {
          expect(false).customError('"Cell" drop down did not open even after clicking on it');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Yellow" from the color picker', function() {
      ChartingUtilities.selectColorFrmDD('rgb(255, 255, 77)');

      // Verifying if "Yellow" color is selected from drop down
      TileOptionsColumns.getColorPickerButton('Cell').getAttribute('style').then(function(value) {
        if (value.indexOf('rgb(255, 255, 77)') < 0) {
          expect(false).customError('The "Cell" drop down did not show "Yellow" color.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "U" button', function() {
      ThiefHelpers.getButtonCheckboxClassReference('underline').check();
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {
        expect(false).customError('Not able to click on OK button due to ' + err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Sector Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Sector Weights" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Sector Weights').then(function(found) {
        if (!found) {
          expect(false).customError('"Sector Weights" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Sector Weights')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrRowNames = [];
    it('Collecting row names for future reference', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Sector Weights', '', '').then(function(rowRef) {
        arrRowNames = rowRef;
      });
    });

    var takeScreenShot1 = 0;
    var count = 0;
    var number;
    it('Verifying if "Port. Weight column" cell values for which the corresponding "Bench. Weight" column is less ' + 'than 6 are colored in "Red" with background in "Yellow" and "Underlined"', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Sector Weights', 'Bench. Weight', '').then(function(benchWeightCol) {
        benchWeightCol.forEach(function(benchCellVal, index) {
          if (index !== 1) {
            number = parseFloat(benchCellVal).toFixed(2);

            // Verifying each cell of "Bench. Weight" column which is less than 6
            if (number < 6) {
              // If cell value is less than 6 get the corresponding cell value
              SlickGridFunctions.getCellReference('Sector Weights', arrRowNames[index], '', 'Port. Weight').then(function(ref) {
                // Get style attribute for cell value
                ref.findElement(by.xpath('./div')).getAttribute('style').then(function(val) {
                  if (val.indexOf(styleAttributeRYU) === -1) {
                    takeScreenShot1++;
                    expect(false).customError('"Port. Weight" column cell value for ' + 'corresponding"' + arrRowNames[index] + '" row is not styled as expected.');
                    if (takeScreenShot1 === 1) {
                      CommonFunctions.takeScreenShot();
                    }
                  }
                }, function(error) {
                  expect(false).customError('"Port. Weight" column cell value for ' + 'corresponding"' + arrRowNames[index] + '" row is not styled as expected.');
                  count++;
                  if (count === 1) {
                    CommonFunctions.takeScreenShot();
                  }
                });
              });
            }
          }
        });
      });
    });

    it('Verifying if "Total" value for "Port. Weight" column is not colored', function() {
      SlickGridFunctions.getCellReference('Sector Weights', 'Total', '', 'Port. Weight').then(function(ref) {
        ref.findElement(by.xpath('./div')).getAttribute('style').then(function(att) {
          if (att.indexOf('color') !== -1) {
            expect(false).customError('Total cell value is colored');
            CommonFunctions.takeScreenShot();
          }
        }, function() {
          expect(true).customError('');
        });
      });
    });
  });

  describe('Test Step ID: 565296', function() {

    // Clicking on wrench Icon from 'Sector Weights' report toolbar
    it('Should click on wrench Icon from "Sector Weights" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Sector Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Clicking on 'Options' from Wrench Menu drop down.
    it('Should click "Options" from drop down menu', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Sector Weights" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Sector Weights') {
          expect(false).customError('"Tile Options - Sector Weights" view has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on Columns LHP item to select.
    it('Should click on Columns from LHP ', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Columns' item is opened.
      TileOptions.getOptionTitle().getText().then(function(title) {
        expect(title === 'Columns').customError('"Columns" item did not select from LHP');
        if (title !== 'Columns') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Port. Ending Weight" from the "Selected" section', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Port. Ending Weight');
      item.select();

      // Check if 'Port. Ending Weight' is selected
      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Port. Ending Weight" did not selected from "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "CONDITIONAL FORMATTING" section from "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('CONDITIONAL FORMATTING').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"CONDITIONAL FORMATTING" section is not expanded from "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should un check "Group Level" check box under "Apply To"', function() {
      ThiefHelpers.getCheckBoxClassReference('Group Level').uncheck();
    });

    it('Should select "is greater than" from "is less than" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('is greater than', undefined, TileOptionsColumns.xpathEqualsDropdown, undefined);
    });

    it('Verifying that "is less than" Drop down is set to "is greater than"', function() {
      ThiefHelpers.verifySelectedDropDownText('is greater than', undefined, TileOptionsColumns.xpathEqualsDropdown, undefined);
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {
        expect(false).customError('Not able to click on OK button due to ' + err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Sector Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Sector Weights" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Sector Weights').then(function(found) {
        if (!found) {
          expect(false).customError('"Sector Weights" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Sector Weights')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var screenShot = 0;
    var number;
    it('Verifying if "Port. Weight" column "Total" cell value for which the corresponding "Bench. Weight" is greater ' + 'than 6 is colored in Red with background in Yellow and underlined', function() {
      browser.call(function() {
        SlickGridFunctions.getCellReference('Sector Weights', 'Total', '', 'Bench. Weight').then(function(benchWeightCellValue) {
          benchWeightCellValue.getText().then(function(cellRef) {
            number = parseFloat(cellRef).toFixed(2);
            if (number > 6) {
              SlickGridFunctions.getCellReference('Sector Weights', 'Total', '', 'Port. Weight').then(function(ref) {
                ref.findElement(by.xpath('./div')).getAttribute('style').then(function(val) {
                  if (val.indexOf(styleAttributeRYU) === -1) {
                    screenShot = 1;
                    expect(false).customError('"Total" cell value for corresponding "Port. Weight" column is not styled as expected.');
                  }
                }, function(error) {
                  expect(false).customError('"Total" cell value for corresponding "Port. Weight" column is not styled as expected.');
                  screenShot = 1;
                });
              });
            } else {
              expect(false).customError('"Total" cell value for "Bench. Weight" is less than 6. Found:"' + cellRef + '"');
              screenShot = 1;
            }
          });
        });
      }).then(function() {
        if (screenShot === 1) {
          CommonFunctions.takeScreenShot();
          screenShot = 0;
        }
      });
    });

    it('Verifying if none of the group level values for "Port. Weight" column are colored', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Sector Weights', '').then(function(rowRef) {
        rowRef.forEach(function(rowName, index) {
          if (index !== 0) {
            SlickGridFunctions.getCellReference('Sector Weights', rowName, '', 'Port. Weight').then(function(ref) {
              ref.findElement(by.xpath('./div')).getAttribute('style').then(function(att) {
                if (att.indexOf('color') !== -1) {
                  expect(false).customError('Cell value is colored at "' + index + '" row.');
                  screenShot++;
                  if (screenShot === 1) {
                    CommonFunctions.takeScreenShot();
                  }
                }
              }, function() {
                expect(true).customError('');
              });
            });
          }
        });
      });
    });
  });

  describe('Test Step ID: 565463', function() {

    // Clicking on wrench Icon from 'Sector Weights' report toolbar
    it('Should click on wrench Icon from "Sector Weights" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Sector Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Clicking on 'Options' from Wrench Menu drop down.
    it('Should click "Options" from drop down menu', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Sector Weights" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Sector Weights') {
          expect(false).customError('"Tile Options - Sector Weights" view has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on Columns LHP item to select.
    it('Should click on Columns from LHP ', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Columns' item is opened.
      TileOptions.getOptionTitle().getText().then(function(title) {
        expect(title === 'Columns').customError('"Columns" item did not select from LHP');
        if (title !== 'Columns') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Port. Ending Weight" from the "Selected" section', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Port. Ending Weight');
      item.select();

      // Check if 'Port. Ending Weight' is selected
      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Port. Ending Weight" did not selected from "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "CONDITIONAL FORMATTING" section from "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('CONDITIONAL FORMATTING').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"CONDITIONAL FORMATTING" section is not expanded from "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check "Group Level" check box under "Apply To"', function() {
      ThiefHelpers.getCheckBoxClassReference('Group Level').check();
    });

    it('Should select "+ Add Condition" button', function() {
      ThiefHelpers.getButtonClassReference('Add Condition').press();
    });

    var xpathEqualsDropdown = element.all(by.xpath(TileOptionsColumns.xpathEqualsDropdown)).get(1);
    it('Should select "is less than" from "equals" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('is less than', undefined, xpathEqualsDropdown, undefined);
    });

    it('Verifying that the "equals" drop down is set to "is less than"', function() {
      ThiefHelpers.verifySelectedDropDownText('is less than', undefined, xpathEqualsDropdown, undefined);
    });

    var xpathConstantTextbox = element.all(by.xpath(TileOptionsColumns.xpathConstantTextbox)).get(1);
    it('Should enter "6" in the text box next to "Constant" drop down', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, xpathConstantTextbox).setText('6');

      // Verifying if "6" is present in the text field
      ThiefHelpers.getTextBoxClassReference(undefined, xpathConstantTextbox).getText().then(function(text) {
        if (text !== '6') {
          expect(false).customError('The text box next to "Constant" drop down did not set to "6". ' + 'Found:"' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Font" drop down', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathColorPickerButton, 'Font');
      var xpathColorPickerButton = element.all(by.xpath(xpath)).get(1);
      ThiefHelpers.getButtonClassReference(undefined, xpathColorPickerButton).press();
    });

    it('Should select "Orange" from the color picker', function() {
      ChartingUtilities.selectColorFrmDD('rgb(255, 166, 122)');
    });

    it('Should click on "Cell" drop down', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathColorPickerButton, 'Cell');
      var xpathColorPickerButton = element.all(by.xpath(xpath)).get(1);
      ThiefHelpers.getButtonClassReference(undefined, xpathColorPickerButton).press();
    });

    it('Should select "Pink" from the color picker', function() {
      ChartingUtilities.selectColorFrmDD('rgb(255, 77, 255)');
    });

    it('Should select "bold" button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathButtonCheckbox, 'bold');
      element.all(by.xpath(xpath)).get(1).getWebElement().click().then(function() {
      }, function(err) {
        expect(false).customError('Not able to click on "Bold" button due to ' + err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {
        expect(false).customError('Not able to click on OK button due to ' + err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Sector Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Sector Weights" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Sector Weights').then(function(found) {
        if (!found) {
          expect(false).customError('"Sector Weights" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Sector Weights')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Miscellaneous" group to highlight the row', function() {
      PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Sector Weights', 1, 'Miscellaneous').click().then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    var arrRowNames = [];
    it('Collecting row names for future reference', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Sector Weights', '', '').then(function(colRef) {
        arrRowNames = colRef;
      });
    });

    var takeScreenShot = 0;
    var number;
    it('Verifying if "Port. Weight column" cell values for which the corresponding "Bench. Weight" column greater ' + 'than 6 are colored with font Red with background in Yellow and underlined', function() {
      browser.call(function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Sector Weights', 'Bench. Weight', '').then(function(benchWeightCol) {
          benchWeightCol.forEach(function(benchCellVal, index) {
            number = parseFloat(benchCellVal).toFixed(2);

            // Verifying each cell of "Bench. Weight" column which is less than 6 or not
            if (number > 6) {
              // If cell value is less than 6 get the corresponding cell value
              SlickGridFunctions.getCellReference('Sector Weights', arrRowNames[index], '', 'Port. Weight').then(function(ref) {
                // Get style attribute for cell value
                ref.findElement(by.xpath('./div')).getAttribute('style').then(function(val) {
                  if (val.indexOf(styleAttributeRYU) === -1) {
                    takeScreenShot = 1;
                    expect(false).customError('"Port. Weight" column cell value for ' + 'corresponding "' + arrRowNames[index] + '" row is not styled as expected.');
                  }
                }, function(error) {
                  expect(false).customError('"Port. Weight" column cell value for ' + 'corresponding "' + arrRowNames[index] + '" row is not styled as expected.');
                  takeScreenShot = 1;
                });
              });
            }
          });
        });
      }).then(function() {
        if (takeScreenShot === 1) {
          CommonFunctions.takeScreenShot();
          takeScreenShot = 0;
        }
      });
    });

    it('Verifying if "Port. Weight column" cell values for which the corresponding "Bench. Weight" column is less ' + 'than 6 are colored in "Orange" with background in "Pink" and bold', function() {
      browser.call(function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Sector Weights', 'Bench. Weight', '').then(function(benchWeightCol) {
          benchWeightCol.forEach(function(benchCellVal, index) {
            number = parseFloat(benchCellVal).toFixed(2);

            // Verifying each cell of "Bench. Weight" column which is less than 6 or not
            if (number < 6) {
              // If cell value is less than 6 get the corresponding cell value
              SlickGridFunctions.getCellReference('Sector Weights', arrRowNames[index], '', 'Port. Weight').then(function(ref) {
                // Get style attribute for cell value
                ref.findElement(by.xpath('./div')).getAttribute('style').then(function(val) {
                  if (val.indexOf(styleAttributeOPB) === -1) {
                    takeScreenShot = 1;
                    expect(false).customError('"Port. Weight" column cell value for ' + 'corresponding "' + arrRowNames[index] + '" row is not styled as expected.');
                  }
                }, function(error) {
                  expect(false).customError('"Port. Weight" column cell value for ' + 'corresponding "' + arrRowNames[index] + '" row is not styled as expected.');
                  takeScreenShot = 1;
                });
              });
            }
          });
        });
      }).then(function() {
        if (takeScreenShot === 1) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Miscellaneous" row is highlighted', function() {
      // Verifying all cells class attribute value to verify if "Miscellaneous" group is highlighted
      // "Port. Weight" cell will not be in yellow color, but class attribute will be having text as selected
      SlickGridFunctions.getAllColumnFieldValue('Sector Weights').then(function(arr) {
        arr.forEach(function(columnName) {
          SlickGridFunctions.getCellReference('Sector Weights', 'Miscellaneous', '', columnName, undefined).then(function(eleRef) {
            eleRef.getAttribute('class').then(function(val) {
              if (val.indexOf('selected') === -1) {
                expect(false).customError('"Miscellaneous" row is not highlighted at "' + columnName + '" column.');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        });
      });
    });

    it('Verifying "Port. Weight" cell for "Miscellaneous" row style is still same as previous', function() {
      // I am verifying background color because I observed the style attribute for background color is not
      // changing when the cell background color got changed and also I am not verifying fond and color since it
      // is done in previous it blocks
      SlickGridFunctions.getCellReference('Sector Weights', 'Miscellaneous', '', 'Bench. Weight').then(function(ref) {
        SlickGridFunctions.getCellReference('Sector Weights', 'Miscellaneous', '', 'Port. Weight').then(function(cellRef) {
          // Get style attribute for cell value
          ref.getText().then(function(number) {
            var num = parseFloat(number).toFixed(2);
            if (num < 6) {
              cellRef.findElement(by.xpath('./div')).getCssValue('background-color').then(function(val) {
                if (val !== 'rgba(255, 77, 255, 1)') {
                  CommonFunctions.takeScreenShot();
                  expect(false).customError('"Port. Weight" column cell value for ' + 'corresponding "Miscellaneous" row is ' +
                    'not styled as expected. Expected "rgba(255, 77, 255, 1)", found:' + val);
                }
              }, function(error) {
                expect(false).customError(error);
                CommonFunctions.takeScreenShot();
              });
            } else if (num > 6) {
              cellRef.findElement(by.xpath('./div')).getCssValue('background-color').then(function(val) {
                if (val !== 'rgba(255, 255, 77, 1)') {
                  CommonFunctions.takeScreenShot();
                  expect(false).customError('"Port. Weight" column cell value for ' + 'corresponding "Miscellaneous" row is ' +
                    'not styled as expected. Expected "rgba(255, 255, 77, 1)", found:' + val);
                }
              }, function(error) {
                expect(false).customError(error);
                CommonFunctions.takeScreenShot();
              });
            }
          });
        });
      });
    });

  });

  describe('Test Step ID: 565458', function() {

    it('Should right click on "United States" and select "Expand|All" option', function() {
      var eleRef = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Sector Weights', 1, 'Commercial Services');

      PA3MainPage.rightClickAndSelectOption(eleRef, 'Expand|All');
    });

    it('Wait until loading spinner disappears in the report', function() {
      Utilities.waitUntilElementDisappears(element(by.xpath('//tf-slick-loading-overlay')), 10000);
    });

    var arrRowNames = [];
    it('Collecting row names for future reference', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Sector Weights', '').then(function(arrRow) {
        arrRowNames = arrRow;
      });

      SlickGridFunctions.scrollRowToTop('Sector Weights', 0);
    });

    it('Should click on "Coca-Cola Company" under "Consumer Non- Durables > Beverages: Non-Alcoholic > U.S. Dollar"', function() {
      // Make element visible before clicking on the "Coca-Cola Company" row
      var eleRef = PA3MainPage.getElementFromCalculatedTree('Sector Weights', 'Consumer Non-Durables|Beverages: ' +
        'Non-Alcoholic|U.S. Dollar', 'Coca-Cola Company');
      Utilities.makeElementVisible(eleRef);

      eleRef.click().then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    var screenShot = 0;
    var count = 0;
    var i;
    var number;
    it('Verifying if "Port. Weight column" cell values for which the corresponding "Bench. Weight" column greater ' + 'than 6 are colored with font Red with background in Yellow and Underlined', function() {
      var greaterThaSix = function(i) {
        SlickGridFunctions.getCellReference('Sector Weights', arrRowNames[i], '', 'Bench. Weight').then(function(benchWeightRef) {
          benchWeightRef.getText().then(function(cellRef) {
            number = parseFloat(cellRef).toFixed(2);
            if (number > 6) {
              SlickGridFunctions.getCellReference('Sector Weights', arrRowNames[i], '', 'Port. Weight').then(function(portWeightRef) {
                portWeightRef.findElement(by.xpath('./div')).getAttribute('style').then(function(styleAttribute) {
                  if (styleAttribute.indexOf(styleAttributeRYU) === -1) {
                    count++;
                    expect(false).customError('"Port. Weight" column cell value for ' + 'corresponding "' + arrRowNames[i] + '" row index "' + i + '" is not styled as expected. Found ' + styleAttribute);
                    if (count === 1) {
                      CommonFunctions.takeScreenShot();
                    }
                  }
                }, function(error) {
                  expect(false).customError(error);
                  screenShot++;
                  if (screenShot === 1) {
                    CommonFunctions.takeScreenShot();
                  }
                });
              });
            }
          });
        });
      };

      for (i = 0; i < 40; i++) {
        greaterThaSix(i);
      }
    });

    var takeScreenShot = 0;
    var tempVariable = 0;
    it('Verifying if "Port. Weight column" cell values for which the corresponding "Bench. Weight" column is less ' + 'than 6 are colored in "Orange" with background in "Pink" and bold', function() {
      var lessThanSix = function(i) {
        SlickGridFunctions.getCellReference('Sector Weights', arrRowNames[i], '', 'Bench. Weight').then(function(benchWeightRef) {
          benchWeightRef.getText().then(function(cellRef) {
            number = parseFloat(cellRef).toFixed(2);
            if (number < 6) {
              SlickGridFunctions.getCellReference('Sector Weights', arrRowNames[i], '', 'Port. Weight').then(function(portWeightRef) {
                portWeightRef.findElement(by.xpath('./div')).getAttribute('style').then(function(styleAttribute) {
                  if (styleAttribute.indexOf(styleAttributeOPB) === -1) {
                    takeScreenShot++;
                    expect(false).customError('"Port. Weight" column cell value for ' + 'corresponding "' + arrRowNames[i] + '" row is not styled as expected.');
                    if (takeScreenShot === 1) {
                      CommonFunctions.takeScreenShot();
                    }
                  }
                }, function(error) {
                  expect(false).customError(error);
                  tempVariable++;
                  if (tempVariable === 1) {
                    CommonFunctions.takeScreenShot();
                  }
                });
              });
            }
          });
        });
      };

      for (i = 0; i < 40; i++) {
        lessThanSix(i);
      }
    });

    it('Verifying if "Coca-Cola Company" cell is highlighted', function() {
      PA3MainPage.getElementFromCalculatedTree('Sector Weights', 'Consumer Non-Durables|Beverages: ' +
        'Non-Alcoholic|U.S. Dollar', 'Coca-Cola Company').element(by.xpath('./div')).getAttribute('class').then(function(text) {
        if (text.indexOf('selected') === -1) {
          expect(false).customError('"Coca-Cola Company" cell is not highlighted in the report');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Coca-Cola Company" row is highlighted', function() {
      // I am verifying background color because I observed the style attribute for background color is not
      // changing when the cell background color got changed and also I am not verifying fond and color since it
      // is done in previous it blocks
      PA3MainPage.getAllColumnOfCalculatedReport('Sector Weights').each(function(arr) {
        arr.getText().then(function(columnName) {
          PA3MainPage.getValueFromCalculatedReport('Sector Weights', 'Coca-Cola Company', columnName.replace(/\n/g, ' '), undefined,
            undefined, true).then(function(eleRef) {
            eleRef.getAttribute('class').then(function(val) {
              if (val.indexOf('selected') === -1) {
                expect(false).customError('"Coca-Cola Company" cell is not highlighted at "' + columnName + '" column.');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        });
      });
    });

    it('Verifying "Port. Weight" cell for corresponding "Coca-Cola Company" row is still displayed in previous style', function() {
      // Here we are verifying only back ground color because verification of font and color ia already verified in previous steps.
      // I am verifying background color because I observed the style attribute for background color is not
      // changing when the cell back ground color got changed
      SlickGridFunctions.getCellReference('Sector Weights', 'Coca-Cola Company', '', 'Bench. Weight').then(function(ref) {
        SlickGridFunctions.getCellReference('Sector Weights', 'Coca-Cola Company', '', 'Port. Weight').then(function(cellRef) {
          // Get style attribute for cell value
          ref.getText().then(function(number) {
            var num = parseFloat(number).toFixed(2);
            if (num < 6) {
              cellRef.findElement(by.xpath('./div')).getCssValue('background-color').then(function(val) {
                if (val !== 'rgba(255, 77, 255, 1)') {
                  CommonFunctions.takeScreenShot();
                  expect(false).customError('"Port. Weight" column cell value for ' + 'corresponding "Coca-Cola Company" row is ' +
                    'not styled as expected. Found:' + val);
                }
              }, function(error) {
                expect(false).customError(error);
                CommonFunctions.takeScreenShot();
              });
            } else if (num > 6) {
              cellRef.findElement(by.xpath('./div')).getCssValue('background-color').then(function(val) {
                if (val !== 'rgba(255, 255, 77, 1)') {
                  CommonFunctions.takeScreenShot();
                  expect(false).customError('"Port. Weight" column cell value for ' + 'corresponding "Coca-Cola Company" row is ' +
                    'not styled as expected. Found:' + val);
                }
              }, function(error) {
                expect(false).customError(error);
                CommonFunctions.takeScreenShot();
              });
            }
          });
        });
      });
    });

  });

  describe('Test Step ID: 565464', function() {

    // Clicking on wrench Icon from 'Sector Weights' report toolbar
    it('Should click on wrench icon from "Sector Weights" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Sector Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Clicking on 'Options' from Wrench Menu drop down.
    it('Should click "Options" from drop down menu', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Sector Weights" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Sector Weights') {
          expect(false).customError('"Tile Options - Sector Weights" view has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on Columns LHP item to select.
    it('Should click on Columns from LHP ', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Columns' item is opened.
      TileOptions.getOptionTitle().getText().then(function(title) {
        expect(title === 'Columns').customError('"Columns" item did not select from LHP');
        if (title !== 'Columns') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Bench. Ending Weight" from the "Selected" section', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Bench. Ending Weight');
      item.select();

      // Check if 'Port. Ending Weight' is selected
      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Bench. Ending Weight" did not selected from "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "CONDITIONAL FORMATTING" section from "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('CONDITIONAL FORMATTING').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"CONDITIONAL FORMATTING" section is not expanded from "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should open "Column" Drop down and select "Bench. Ending Weight"', function() {
      ThiefHelpers.selectOptionFromDropDown('Bench. Ending Weight', 'Column', undefined, undefined);
    });

    var arrCheckbox = ['Group Level', 'Total Level'];
    arrCheckbox.forEach(function(checkbox) {
      it('Should check the "' + checkbox + '" checkbox', function() {
        ThiefHelpers.getCheckBoxClassReference(checkbox, undefined).check();
      });
    });

    it('Should select "+ Add Condition" button', function() {
      ThiefHelpers.getButtonClassReference('Add Condition').press();
    });

    var xpathEqualsDropdown = element(by.xpath(TileOptionsColumns.xpathEqualsDropdown));
    it('Should select "is between" from "equals" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('is between', undefined, xpathEqualsDropdown, undefined);
    });

    it('Should enter "3" in the text box next to first "Constant" drop down', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsColumns.xpathConstantTextbox).setText('3');

      // Verifying if "3" is present in the text field
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsColumns.xpathConstantTextbox).getText().then(function(text) {
        if (text !== '3') {
          expect(false).customError('The text box next to first "Constant" drop down did not set to "3". ' + 'Found:"' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var xpathConstantTextbox = element.all(by.xpath(TileOptionsColumns.xpathConstantTextbox)).get(1);
    it('Should enter "8" in the text box next to "Constant" drop down', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, xpathConstantTextbox).setText('8');

      // Verifying if "8" is present in the text field
      ThiefHelpers.getTextBoxClassReference(undefined, xpathConstantTextbox).getText().then(function(text) {
        if (text !== '8') {
          expect(false).customError('The text box next to "Constant" drop down did not set to "8". ' + 'Found:"' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Font" drop down', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathColorPickerButton, 'Font');
      var xpathColorPickerButton = element(by.xpath(xpath));
      ThiefHelpers.getButtonClassReference(undefined, xpathColorPickerButton).press();
    });

    it('Should select "brown" from the color picker', function() {
      ChartingUtilities.selectColorFrmDD('rgb(255, 166, 122)');
    });

    it('Should click on "Cell" drop down', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathColorPickerButton, 'Cell');
      var xpathColorPickerButton = element(by.xpath(xpath));
      ThiefHelpers.getButtonClassReference(undefined, xpathColorPickerButton).press();
    });

    it('Should select "green" from the color picker', function() {
      ChartingUtilities.selectColorFrmDD('rgb(166, 255, 77)');
    });

    it('Should select "italic" button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathButtonCheckbox, 'italic');
      element(by.xpath(xpath)).click();
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {
        expect(false).customError('Not able to click on OK button due to ' + err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Sector Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Sector Weights" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Sector Weights').then(function(found) {
        if (!found) {
          expect(false).customError('"Sector Weights" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Sector Weights')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should right click on "Commercial Services" and select "Collapse All" from the drop down', function() {
      PA3MainPage.rightClickAndSelectOption(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Sector Weights', 1, 'Commercial Services'), 'Collapse|Level 1');
    });

    it('Wait until loading spinner disappears in the report', function() {
      Utilities.waitUntilElementDisappears(element(by.xpath('//tf-slick-loading-overlay')), 10000);
    });

    var arrRowNames = [];
    it('Collecting row names for future reference', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Sector Weights', '').then(function(references) {
        arrRowNames = references;
      });

      SlickGridFunctions.scrollRowToTop('Sector Weights', 0);
    });

    var takeScreenShot = 0;
    var tempVariable = 0;
    var number;
    it('Verifying if "Port. Weight column" cell values for which the corresponding "Bench. Weight" column greater ' + 'than 6 are colored with font Red with background in Yellow and underlined', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Sector Weights', 'Bench. Weight', '').then(function(benchWeightRef) {
        benchWeightRef.forEach(function(benchWeightCellVaue, index) {
          number = parseFloat(benchWeightCellVaue).toFixed(2);
          if (number > 6) {
            SlickGridFunctions.getCellReference('Sector Weights', arrRowNames[index], '', 'Port. Weight').then(function(portWeightRef) {
              portWeightRef.findElement(by.xpath('./div')).getAttribute('style').then(function(styleAttribute) {
                if (styleAttribute.indexOf(styleAttributeRYU) === -1) {
                  takeScreenShot++;
                  expect(false).customError('"Port. Weight" column cell value for ' + 'corresponding "' + arrRowNames[index] + '" row is not styled as expected.');
                  if (takeScreenShot === 1) {
                    CommonFunctions.takeScreenShot();
                  }
                }
              }, function(error) {
                expect(false).customError(error);
                tempVariable++;
                if (tempVariable === 1) {
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          }
        });
      });
    });

    it('Verifying if "Port. Weight column" cell values for which the corresponding "Bench. Weight" column is less ' + 'than 6 are colored in "Orange" with background in "Pink" and bold', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Sector Weights', 'Bench. Weight', '').then(function(benchWeightRef) {
        benchWeightRef.forEach(function(benchWeightCellVaue, index) {
          number = parseFloat(benchWeightCellVaue).toFixed(2);
          if (number < 6) {
            SlickGridFunctions.getCellReference('Sector Weights', arrRowNames[index], '', 'Port. Weight').then(function(portWeightRef) {
              portWeightRef.findElement(by.xpath('./div')).getAttribute('style').then(function(styleAttribute) {
                if (styleAttribute.indexOf(styleAttributeOPB) === -1) {
                  takeScreenShot++;
                  expect(false).customError('"Port. Weight" column cell value for ' + 'corresponding "' + arrRowNames[index] + '" row is not styled as expected.');
                  if (takeScreenShot === 1) {
                    CommonFunctions.takeScreenShot();
                  }
                }
              }, function(error) {
                expect(false).customError(error);
                tempVariable++;
                if (tempVariable === 1) {
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          }
        });
      });
    });

    it('Verifying if "Bench. Weight" column cell values between 3 & 8 are colored in light green with font in ' + 'brown and italicized', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Sector Weights', 'Bench. Weight', '').then(function(benchWeightRef) {
        benchWeightRef.forEach(function(benchWeightCellVaue, index) {
          number = parseFloat(benchWeightCellVaue).toFixed(2);
          if (number > 3 && number < 8) {
            SlickGridFunctions.getCellReference('Sector Weights', arrRowNames[index], '', 'Bench. Weight').then(function(portWeightRef) {
              portWeightRef.findElement(by.xpath('./div')).getAttribute('style').then(function(styleAttribute) {
                if (styleAttribute.indexOf(styleAttributeBGI) === -1) {
                  takeScreenShot++;
                  expect(false).customError('"Port. Weight" column cell value for ' + 'corresponding "' + arrRowNames[index] + '" row is not styled as expected.');
                  if (takeScreenShot === 1) {
                    CommonFunctions.takeScreenShot();
                  }
                }
              }, function(error) {
                expect(false).customError(error);
                tempVariable++;
                if (tempVariable === 1) {
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          }
        });
      });
    });
  });

  describe('Test Step ID: 565472', function() {

    // Clicking on wrench Icon from 'Weights' report toolbar
    it('Should click on wrench Icon from "Sector Weights" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Sector Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Clicking on 'Options' from Wrench Menu dropdown.
    it('Should click "Options" from dropdown menu', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Sector Weights" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Sector Weights') {
          expect(false).customError('"Tile Options - Sector Weights" view has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on Columns LHP item to select.
    it('Should click on Columns from LHP ', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Columns' item is opened.
      TileOptions.getOptionTitle().getText().then(function(title) {
        expect(title === 'Columns').customError('"Columns" item did not select from LHP');
        if (title !== 'Columns') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Port. Ending Weight" from the "Selected" section', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Port. Ending Weight');
      item.select();

      // Check if 'Port. Ending Weight' is selected
      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Port. Ending Weight" did not selected from "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "CONDITIONAL FORMATTING" section from "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('CONDITIONAL FORMATTING').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"CONDITIONAL FORMATTING" section is not expanded from "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.getXButtonOfConditionalFormatingSection, 'When' + ' Bench. Ending Weight');
    it('Should click on "X" button for the first condition below "When Bench. Ending Weight"', function() {
      element.all(by.xpath(xpath)).get(1).click();
    });

    it('Should click on "X" button for the second condition below "When Bench. Ending Weight"', function() {
      element(by.xpath(xpath)).click();
    });

    it('Should select "Bench. Ending Weight" from the "Selected" section', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Bench. Ending Weight');
      item.select();

      // Check if 'Port. Ending Weight' is selected
      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Bench. Ending Weight" did not selected from "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "CONDITIONAL FORMATTING" section from "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('CONDITIONAL FORMATTING').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"CONDITIONAL FORMATTING" section is not expanded from "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "0" in the text box next to first "Constant" drop down', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsColumns.xpathConstantTextbox).setText('0');

      // Verifying if "0" is present in the text field
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsColumns.xpathConstantTextbox).getText().then(function(text) {
        if (text !== '0') {
          expect(false).customError('The text box next to first "Constant" drop down did not set to "0". ' + 'Found:"' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var xpathConstantTextbox = element.all(by.xpath(TileOptionsColumns.xpathConstantTextbox)).get(1);
    it('Should enter "5" in the text box next to "Constant" drop down', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, xpathConstantTextbox).setText('5');

      // Verifying if "5" is present in the text field
      ThiefHelpers.getTextBoxClassReference(undefined, xpathConstantTextbox).getText().then(function(text) {
        if (text !== '5') {
          expect(false).customError('The text box next to "Constant" drop down did not set to "5". ' + 'Found:"' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {
        expect(false).customError('Not able to click on OK button due to ' + err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Sector Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Sector Weights" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Sector Weights').then(function(found) {
        if (!found) {
          expect(false).customError('"Sector Weights" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Sector Weights')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should right click on "United States" and select "Expand|All" option', function() {
      var eleRef = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Sector Weights', 1, 'Commercial Services');

      PA3MainPage.rightClickAndSelectOption(eleRef, 'Expand|All');

      // Weight for securities to load in report
      browser.sleep(2000);
    });

    it('Wait until loading spinner disappears in the report', function() {
      Utilities.waitUntilElementDisappears(element(by.xpath('//tf-slick-loading-overlay')), 10000);
    });

    var arrRowNames = [];
    it('Collecting row names for future reference', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Sector Weights', '').then(function(references) {
        arrRowNames = references;
      });

      SlickGridFunctions.scrollRowToTop('Sector Weights', 0);
    });

    var screenShot = 0;
    var i;
    it('Verifying if "Port. Weight" column is not colored', function() {
      var portWeightColumn = function(i) {
        SlickGridFunctions.getCellReference('Sector Weights', arrRowNames[i], '', 'Port. Weight').then(function(portWeightRef) {
          portWeightRef.findElement(by.xpath('./div')).getAttribute('style').then(function(styleValue) {
            if (styleValue !== undefined) {
              screenShot++;
              expect(false).customError('"Port. Weight" column cell value for ' + 'corresponding "' + arrRowNames[i] + '" row is styled.');
              if (screenShot === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          }, function() {
            expect(true).customError('');
          });
        });
      };

      for (i = 0; i < 40; i++) {
        portWeightColumn(i);
      }
    });

    var screenShot1 = 0;
    var tempVariable = 0;
    var number;
    it('Verifying if "Bench. Weight" column cell values between 0 & 5 are colored in light green with font in ' + 'brown and italicized', function() {
      var benchWeightColumn = function(i) {
        SlickGridFunctions.getCellReference('Sector Weights', arrRowNames[i], '', 'Bench. Weight').then(function(ref) {
          ref.getText().then(function(benchWeightRef) {
            number = parseFloat(benchWeightRef);
            if (number > 0 && number < 5) {
              SlickGridFunctions.getCellReference('Sector Weights', arrRowNames[i], '', 'Bench. Weight').then(function(portWeightRef) {
                portWeightRef.findElement(by.xpath('./div')).getAttribute('style').then(function(styleAttribute) {
                  if (styleAttribute.indexOf(styleAttributeBGI) === -1) {
                    screenShot1++;
                    expect(false).customError('"Bench. Weight" column cell value for ' + 'corresponding "' + arrRowNames[i] + '" row is not styled as expected.');
                    if (screenShot1 === 1) {
                      CommonFunctions.takeScreenShot();
                    }
                  }
                }, function(error) {
                  expect(false).customError(error + 'arrRowNames[i] ' + arrRowNames[i] + 'i' + i);
                  tempVariable++;
                  if (tempVariable === 1) {
                    CommonFunctions.takeScreenShot();
                  }
                });
              });
            }
          });
        });
      };

      for (i = 0; i < 40; i++) {
        benchWeightColumn(i);
      }
    });
  });
});
