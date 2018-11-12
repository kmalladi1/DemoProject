'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: cond-frmtg-general', function() {

  describe('Test Step ID: 565129', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:/PA3/Formatting/conditional-formatting"', function() {
      PA3MainPage.switchToDocument('conditional-formatting');
    });

    it('Should wait for "Sector Weights" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Sector Weights'), 180000);
    });

    it('Verifying if the "Sector Weights" report is generated', function() {
      PA3MainPage.isReportCalculated('Sector Weights').then(function(calculated) {
        if (!calculated) {
          expect(false).customError('"Sector Weights" report did not get generated');
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

    it('Verifying that the "Sector Weights" report is grouped by "Economic Sector"', function() {
      PA3MainPage.getGroupingsHyperLink('Sector Weights').getText().then(function(text) {
        if (text !== 'Economic Sector') {
          expect(false).customError('The "Sector Weights" report is not grouped by "Economic Sector"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that the "Sector Weights" report is grouped by date "11/03/2015"', function() {
      PA3MainPage.getDateHyperLink('Sector Weights').getText().then(function(text) {
        if (text !== '11/03/2015') {
          expect(false).customError('The "Sector Weights" report is not grouped date "11/03/2015"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 565130', function() {

    it('Should click on the Wrench icon in the "Sector Weights" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Sector Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying wrench menu list is displayed in "Sector Weights" report workspace'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Wrench menu drop down list is not displayed in ' +
            '"Sector Weights" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from menu drop down of "Sector Weights" report workspace ', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function() {
        expect(false).customError(' Not able to select "Options" option from "menu dropdown" of ' +
          '"Sector Weights" report workspace');
        CommonFunctions.takeScreenShot();
      });

      //Verifying tile options mode is opened
      TileOptions.isTileOptionsMode().then(function(value) {
        if (!value) {
          expect(false).customError('Tile Options mode is Closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Columns" on the LHP of tile options', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "Conditional Formatting" section from "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Conditional Formatting').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Conditional Formatting" section is not expanded from "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrDropdown = ['Type', 'Column'];
    var dropdownText = ['Conditions', 'Ticker'];

    arrDropdown.forEach(function(dropdown, index) {

      it('Verifying that the "' + dropdown + '" Dropdown is present', function() {
        ThiefHelpers.isPresent('drop down', dropdown, undefined).then(function(bool) {
          if (!bool) {
            expect(false).customError('The "' + dropdown + '" Dropdown is not present');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Verifying that the "' + dropdown + '" Dropdown is set to "' + dropdownText[index] + '"', function() {
        ThiefHelpers.verifySelectedDropDownText(dropdownText[index], dropdown, undefined);
      });

    });

    var arrCheckbox = ['Group Level', 'Total Level'];

    arrCheckbox.forEach(function(checkbox) {

      it('Verifying that the "' + checkbox + '" checkbox is present', function() {
        ThiefHelpers.isPresent('checkbox', checkbox, undefined).then(function(bool) {
          if (!bool) {
            expect(false).customError('The "' + checkbox + '" checkbox is not present');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Verifying that the "+ Add Condition" Button is present', function() {
      ThiefHelpers.isPresent('button', undefined, TileOptionsColumns.xpathAddConditionButton).then(function(bool) {
        if (!bool) {
          expect(false).customError('The "+ Add Condition" button is not present');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 565132', function() {

    it('Should click to open "Type" Dropdown', function() {
      ThiefHelpers.getDropDownSelectClassReference('Type', undefined).open();
    });

    var arrDropdownOptions = ['Conditions', 'Up/Down', 'Heat Map'];
    var arrOptions = [];

    it('Reading all the options from open dropdown ', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
        arrOptions = options;
      });
    });

    arrDropdownOptions.forEach(function(option, index) {
      it('verifying if "Type" dropdown contains "' + option + '"', function() {
        if (option !== arrOptions[index]) {
          expect(false).customError('The "Type" dropdown does not contains "' + option + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click to close "Type" Dropdown', function() {
      ThiefHelpers.getDropDownSelectClassReference('Type', undefined).open();
    });

  });

  describe('Test Step ID: 565184', function() {

    it('Should click to open "Column" Dropdown', function() {
      ThiefHelpers.getDropDownSelectClassReference('Column', undefined).open();
    });

    var arrDropdownOption = ['Ticker', 'Ending Price', 'Port. Ending Quantity Held', 'Port. Ending Weight',
      'Bench. Ending Quantity Held', 'Bench. Ending Weight', 'Variation in Ending Weight',];
    var arrOptions = [];

    it('Reading all the options from open dropdown ', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
        arrOptions = options;
      });
    });

    arrDropdownOption.forEach(function(option, index) {
      it('verifying if "Column" dropdown contains "' + option + '"', function() {
        if (option !== arrOptions[index]) {
          expect(false).customError('The "Column" dropdown does not contains "' + option + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 565186', function() {

    it('Should select "Port. Ending Weight" from the "Selected" section', function() {
      // Getting the xpath of the Selected section
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');
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

    it('Should open "Column" Dropdown and select "Bench. Ending Weight"', function() {
      ThiefHelpers.selectOptionFromDropDown('Bench. Ending Weight', 'Column', undefined, undefined);
    });

    var arrCheckbox = ['Group Level', 'Total Level'];

    arrCheckbox.forEach(function(checkbox) {

      it('Should check the "' + checkbox + '" checkbox', function() {
        ThiefHelpers.getCheckBoxClassReference(checkbox, undefined).check();
      });

    });

    it('Should click on "+ Add Condition" Button', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsColumns.xpathAddConditionButton).press();
    });

    it('Verifying that the "equals" Dropdown is present', function() {
      ThiefHelpers.isPresent('drop down', undefined, TileOptionsColumns.xpathEqualsDropdown).then(function(bool) {
        if (!bool) {
          expect(false).customError('The "equals" Dropdown is not present');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that the "Constant" Dropdown is present', function() {
      ThiefHelpers.isPresent('drop down', undefined, TileOptionsColumns.xpathConstantdropdown).then(function(bool) {
        if (!bool) {
          expect(false).customError('The "Constant" Dropdown is not present');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrButton = ['Font', 'Cell'];

    arrButton.forEach(function(button) {

      it('Verifying that the "' + button + '" button is present', function() {
        TileOptionsColumns.getColorPickerButton(button).isPresent().then(function(bool) {
          if (!bool) {
            expect(false).customError('The "' + button + '" button is not present');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    var arrButtonCheckbox = ['bold', 'italic', 'underline'];

    arrButtonCheckbox.forEach(function(item) {

      it('Verifying that the "' + item + '" button-checkbox is present', function() {
        ThiefHelpers.isPresent('button checkbox', item, undefined).then(function(bool) {
          if (!bool) {
            expect(false).customError(item);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should click to open "equals" Dropdown', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsColumns.xpathEqualsDropdown).open();
    });

    var arrDropdownOption = ['equals', 'does not equal', 'is greater than', 'is greater than or equal to', 'is less than',
      'is less than or equal to', 'is between', 'is not between',];
    var arrOptions = [];

    it('Reading all the options from open dropdown', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
        arrOptions = options;
      });
    });

    arrDropdownOption.forEach(function(option, index) {
      it('verifying if "equals" dropdown contains "' + option + '"', function() {
        if (option !== arrOptions[index]) {
          expect(false).customError('The "equals" dropdown does not contains "' + option + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click to close "equals" Dropdown', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsColumns.xpathEqualsDropdown).open();
    });

    it('Should click to open "Constant" Dropdown', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsColumns.xpathConstantdropdown).open();
    });

    var arrDropdownOptions = ['Column', 'Constant'];

    it('Reading all the options from open dropdown', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
        arrOptions = options;
      });
    });

    arrDropdownOptions.forEach(function(option, index) {
      it('verifying if "Constant" dropdown contains "' + option + '"', function() {
        if (option !== arrOptions[index]) {
          expect(false).customError('The "Constant" dropdown does not contains "' + option + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that the textbox next to "Constant" dropdown is present', function() {
      ThiefHelpers.isPresent('textbox', undefined, TileOptionsColumns.xpathConstantTextbox).then(function(bool) {
        if (!bool) {
          expect(false).customError('The textbox next to "Constant" dropdown is not present');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click to close "Constant" Dropdown', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsColumns.xpathConstantdropdown).open();
    });

    arrButton.forEach(function(button) {

      it('Should click to open "' + button + '" color picker', function() {
        var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathColorPickerButton, button);

        ThiefHelpers.getButtonClassReference(undefined, xpath).press();
      });

      var arrColorSection = ['Basic Colors', 'Custom Colors'];
      var arrCountofColor = [48, 16];

      arrColorSection.forEach(function(item, index) {

        it('Verifying if "' + item + '" section is present in "' + button + '" Dropdown', function() {
          TileOptionsColumns.getSectionFromColorDropdown(item).isPresent().then(function(bool) {
            if (!bool) {
              expect(false).customError('"' + item + '" section is not present in "' + button + '" Dropdown');
              CommonFunctions.takeScreenShot();
            }
          });
        });

        it('Verifying if count of colors in "' + item + '" section is "' + arrCountofColor[index] + '"', function() {
          TileOptionsColumns.getAllColorBoxFromDropdown(item).count().then(function(count) {
            if (count !== arrCountofColor[index]) {
              expect(false).customError('Count of colors in "' + item + '" section is not "' + arrCountofColor[index] + '');
              CommonFunctions.takeScreenShot();
            }
          });
        });

      });

    });

  });

  describe('Test Step ID: 565243', function() {

    it('Should click on "Remove" icon in condition section', function() {
      TileOptionsColumns.getRemoveIconFromConditionSection().get(0).getWebElement().then(function(ref) {
        ref.click();
      });
      browser.sleep(1000);
    });

    it('Verifying if condition section below "When Bench. Ending Weight" is removed', function() {
      ThiefHelpers.isPresent('drop down', undefined, TileOptionsColumns.xpathEqualsDropdown).then(function(bool) {
        if (bool) {
          expect(false).customError('The condition section below "When Bench. Ending Weight" is not removed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 565185', function() {

    it('Should open and select "Up/Down" from "Type" Dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Up/Down', 'Type', undefined, undefined);
    });

    it('Verifying that the "Column" Dropdown is set to "Bench. Ending Weight"', function() {
      ThiefHelpers.verifySelectedDropDownText('Bench. Ending Weight', 'Column', undefined);
    });

    var arrCheckbox = ['Group Level', 'Total Level'];

    arrCheckbox.forEach(function(checkbox) {

      it('Verifying if "' + checkbox + '" checkbox is checked off', function() {
        ThiefHelpers.getCheckBoxClassReference(checkbox, undefined).isChecked().then(function(bool) {
          if (!bool) {
            expect(false).customError('The "' + checkbox + '" checkbox is unchecked');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    var arrDropdown = ['Up', 'Down'];
    var arrColor = ['rgb(51, 153, 0)', 'rgb(255, 0, 0)'];
    var arrColors = ['Green', 'Red'];

    arrDropdown.forEach(function(button, index) {

      it('Verifying that the "' + button + '" field shows ' + arrColors[index] + ' color', function() {
        TileOptionsColumns.getColorPickerButton(button).getAttribute('style').then(function(value) {
          if (value.indexOf(arrColor[index]) < 0) {
            expect(false).customError('The "' + button + '" field does not shows ' + arrColors[index] + ' color');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Verifying that the "+ Add Condition" Button is not present', function() {
      element(by.xpath(TileOptionsColumns.xpathAddConditionButton)).isDisplayed().then(function(bool) {
        if (bool) {
          expect(false).customError('The "+ Add Condition" button is present');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 565285', function() {

    it('Should click on "Up" dropdown', function() {
      TileOptionsColumns.getColorPickerButton('Up').click();
    });

    it('Should select "pink" color from colorpicker dropdown', function() {
      TileOptionsColumns.getAllColorBoxFromDropdown('Basic Colors').get(23).getWebElement().then(function(ref) {
        ref.click();
      });
    });

    it('Verifying that the "Up" field shows "pink" color', function() {
      TileOptionsColumns.getColorPickerButton('Up').getAttribute('style').then(function(value) {
        if (value.indexOf('rgb(255, 77, 166)') < 0) {
          expect(false).customError('The "Up" field does not shows "pink" color');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Up" dropdown', function() {
      TileOptionsColumns.getColorPickerButton('Up').click();
    });

    it('Should select "No" color from colorpicker dropdown', function() {
      TileOptionsColumns.getAllColorBoxFromDropdown('Basic Colors').get(47).getWebElement().then(function(ref) {
        ref.click();
      });
    });

    it('Verifying that the "Up" field shows "No" color', function() {
      TileOptionsColumns.getColorPickerButton('Up').getAttribute('style').then(function(value) {
        if (value.indexOf('transparent') < 0) {
          expect(false).customError('The "Up" field does not shows "No" color');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 565255', function() {

    it('Should open and select "Heat Map" from "Type" Dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Heat Map', 'Type', undefined, undefined);
    });

    it('Verifying that the "Column" Dropdown is set to "Bench. Ending Weight"', function() {
      ThiefHelpers.verifySelectedDropDownText('Bench. Ending Weight', 'Column', undefined);
    });

    it('Verifying if "Group Level" checkbox is disabled', function() {
      ThiefHelpers.getCheckBoxClassReference('Group Level', undefined).isDisabled().then(function(bool) {
        if (!bool) {
          expect(false).customError('The "Group Level" checkbox is not disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Minimum" dropdown', function() {
      TileOptionsColumns.getColorPickerButton('Minimum').click();
    });

    var arrColorSection = ['Basic Colors', 'Custom Colors'];
    var arrCountofColor = [48, 16];

    arrColorSection.forEach(function(item, index) {

      it('Verifying if "' + item + '" section is present in "Minimum" Dropdown', function() {
        TileOptionsColumns.getSectionFromColorDropdown(item).isPresent().then(function(bool) {
          if (!bool) {
            expect(false).customError('"' + item + '" section is not present in "Minimum" Dropdown');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Verifying if count of colors in "' + item + '" section is "' + arrCountofColor[index] + '"', function() {
        TileOptionsColumns.getAllColorBoxFromDropdown(item).count().then(function(count) {
          if (count !== arrCountofColor[index]) {
            expect(false).customError('Count of colors in "' + item + '" section is not "' + arrCountofColor[index] + '');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should click on "Base" dropdown', function() {
      TileOptionsColumns.getColorPickerButton('Base').click();
    });

    it('Verifying if count of colors in "Base" color picker dropdown is "2""', function() {
      TileOptionsColumns.getAllColorBoxFromDropdown(undefined).count().then(function(count) {
        if (count !== 2) {
          expect(false).customError('Count of colors in "Base" color picker dropdown is not equal to "2"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrColor = ['rgb(255, 255, 255)', 'rgb(0, 0, 0)'];
    var color = ['White', 'Black'];

    arrColor.forEach(function(item, index) {

      it('Verifying if "Base" color picker dropdown contains "' + color[index] + '" color', function() {
        TileOptionsColumns.getAllColorBoxFromDropdown(undefined).get(index).getWebElement().getAttribute('style').then(function(color) {
          if (color.indexOf(item) < 0) {
            expect(false).customError('"Base" color picker dropdown does not contains "' + color[index] + '" color');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should click on "Maximum" dropdown', function() {
      TileOptionsColumns.getColorPickerButton('Maximum').click();
    });

    arrColorSection.forEach(function(item, index) {

      it('Verifying if "' + item + '" section is present in "Maximum" Dropdown', function() {
        TileOptionsColumns.getSectionFromColorDropdown(item).isPresent().then(function(bool) {
          if (!bool) {
            expect(false).customError('"' + item + '" section is not present in "Maximum" Dropdown');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Verifying if count of colors in "' + item + '" section is "' + arrCountofColor[index] + '"', function() {
        TileOptionsColumns.getAllColorBoxFromDropdown(item).count().then(function(count) {
          if (count !== arrCountofColor[index]) {
            expect(false).customError('Count of colors in "' + item + '" section is not "' + arrCountofColor[index] + '');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should click to close "Maximum" dropdown', function() {
      TileOptionsColumns.getColorPickerButton('Maximum').click();
    });

    it('Verifying if "Clamp Data at +/- (Standard Deviation)" input box contains default value as "1.5"', function() {
      ThiefHelpers.getTextBoxClassReference('Clamp Data at +/- (Standard Deviation)', undefined).getText().then(function(text) {
        if (text !== '1.5') {
          expect(false).customError('The "Clamp Data at +/- (Standard Deviation)" input box does not contains default value as "1.5"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Clamp Data at +/- (Standard Deviation)" slider is present', function() {
      ThiefHelpers.isPresent('Slider', 'Clamp Data at +/- (Standard Deviation)').then(function(bool) {
        if (!bool) {
          expect(false).customError('The "Clamp Data at +/- (Standard Deviation)" slider is not present');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that the "Distribution:" Dropdown is set to "Mean"', function() {
      ThiefHelpers.verifySelectedDropDownText('Mean', 'Distribution:', undefined);
    });

    it('Should click to open "Distribution:" Dropdown', function() {
      ThiefHelpers.getDropDownSelectClassReference('Distribution:', undefined).open();
    });

    var arrDropdownOptions = ['Linear', 'Mean'];
    var arrOptions = [];

    it('Reading all the options from open dropdown ', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
        arrOptions = options;
      });
    });

    arrDropdownOptions.forEach(function(option, index) {
      it('verifying if "Distribution:" dropdown contains "' + option + '"', function() {
        if (option !== arrOptions[index]) {
          expect(false).customError('The "Distribution:" dropdown does not contains "' + option + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click to close "Distribution:" Dropdown', function() {
      ThiefHelpers.getDropDownSelectClassReference('Distribution:', undefined).open();
    });

  });

  describe('Test Step ID: 565288', function() {

    it('Should click on the "Clamp Data at +/- (Standard Deviation):" slider to set the value to "2" ', function() {
      ThiefHelpers.getSliderClassReference('Clamp Data at +/- (Standard Deviation)').setValue(2, 'Right');
    });

    it('Should click on the "Clamp Data at +/- (Standard Deviation):" slider handle', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathSliderHandle, 'Clamp Data at +/- (Standard Deviation)');
      element(by.xpath(xpath)).click();
    });

    it('Verifying if "Clamp Data at +/- (Standard Deviation)" input box set to "2"', function() {
      ThiefHelpers.getTextBoxClassReference('Clamp Data at +/- (Standard Deviation)', undefined).getText().then(function(text) {
        if (text !== '2') {
          expect(false).customError('The "Clamp Data at +/- (Standard Deviation)" input box is not set to "2"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "0.2" in the "Clamp Data at +/- (Standard Deviation)" input box', function() {
      ThiefHelpers.getTextBoxClassReference('Clamp Data at +/- (Standard Deviation)', undefined).setText(0.2);
    });

    it('Verifying if "Clamp Data at +/- (Standard Deviation)" input box set to "0.2"', function() {
      ThiefHelpers.getTextBoxClassReference('Clamp Data at +/- (Standard Deviation)', undefined).getText().then(function(text) {
        if (text !== '0.2') {
          expect(false).customError('The "Clamp Data at +/- (Standard Deviation)" input box is not set to "0.2"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Clamp Data at +/- (Standard Deviation):" slider is moved to the left end ', function() {
      TileOptionsColumns.getSliderSection('Clamp Data at +/- (Standard Deviation)').getAttribute('style').then(function(value) {
        if (value.indexOf('left: 0%; right: 93.3333%;') < 0) {
          expect(false).customError('The "Clamp Data at +/- (Standard Deviation):" slider is not moved to the left end' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 565290', function() {

    it('Should click on "Cancel" button from "Tile Options - Sector Weights" header bar', function() {
      TileOptions.getHeaderButton('Cancel').click();
    });

    it('"Tile Options - Sector Weights" view should be closed after clicking on "Cancel" button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - Sector Weights" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if PA3 report does not re-calculate.', function() {
      PA3MainPage.getReportCalculationDlg().isPresent().then(function(bool) {
        if (bool) {
          expect(false).customError('PA3 report re-calculates');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
