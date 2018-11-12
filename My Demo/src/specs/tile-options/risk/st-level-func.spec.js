'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: st-level-func', function() {

  describe('Test Step ID: Start Up', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);
  });

  describe('Test Step ID: 664934', function() {

    it('Should open PA3 Application with "Client:/Pa3/Risk/ST_HIGH_LOW"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('st-high-low');
    });

    it('Verifying if "Calculation Error" not appeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog has appeared');
          CommonFunctions.takeScreenShot();
        }
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

  describe('Test Step ID: 664927', function() {

    // Select stress tests tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Stress Tests', 'Risk');

    it('Verifying if view changed to "Stress Tests" ', function() {
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Risk - Stress Tests') {
          expect(false).customError(' "Risk -> Stress Tests" was not selected from LHP ');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Add" button next to Available section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsRiskStressTests.xpathAddButton).press().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Create New Stress Test" dialog appeared', function() {
      ThiefHelpers.isDialogOpen('Create New Stress Test').then(function(option) {
        if (!option) {
          expect(false).customError('"Create New Stress Test" dialog has not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 664939', function() {

    it('Verifying if "Identifier" is selected form the Type drop down', function() {
      CreateNewStressTest.getDropDown('Type').getText().then(function(val) {
        if (val !== 'Identifier') {
          ThiefHelpers.selectOptionFromDropDown('Identifier', undefined, CreateNewStressTest.getDropDown('Type'));

          // Verifying if Identifier is selected form the drop down
          ThiefHelpers.verifySelectedDropDownText('Identifier', undefined, CreateNewStressTest.getDropDown('Type'));
        }
      });
    });

    it('Clear the text in the text box', function() {
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).clear();

      // Verifying if "Name" filed is cleared
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).getAttribute('value').then(function(text) {
        if (text !== '') {
          expect(false).customError('The "Factor" textbox is not set to "LHMN1570"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "IBM" in the "Factor" textbox', function() {
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).sendKeys('IBM').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the "Factor" textbox is set to "IBM"', function() {
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).getAttribute('value').then(function(text) {
        if (text !== 'IBM') {
          expect(false).customError('The "Factor" textbox is not set to "IBM"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should open and select "Standard Deviation" from "% Return" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Standard Deviation', undefined, CreateNewStressTest.getDropDown('Shock'), undefined);
    });

    it('Verifying if "% Return" drop down is set to "Standard Deviation" ', function() {
      ThiefHelpers.verifySelectedDropDownText('Standard Deviation', undefined, CreateNewStressTest.getDropDown('Shock'));
    });

    it('Should enter "-5" in the "Shock" textbox', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateNewStressTest.getInputBox('Shock')).setText('-5');
    });

    it('Verifying if the "Shock" textbox is set to "-5"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateNewStressTest.getInputBox('Shock')).getText().then(function(text) {
        if (text !== '-5') {
          expect(false).customError('The "Shock" textbox is not set to "-5"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should open and select "By % Change" from "Shock Defined As:" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('By % Change', undefined, CreateNewStressTest.getDropDown('Shock Defined As:'), undefined);
    });

    it('Verifying if "Shock Defined As:" drop down is set to "By % Change"', function() {
      ThiefHelpers.verifySelectedDropDownText('By % Change', undefined, CreateNewStressTest.getDropDown('Shock Defined As:'));
    });
  });

  describe('Test Step ID: 664940', function() {

    it('Click on the x icon under Risk Model to clear the drop-down', function() {
      ThiefHelpers.getTextBoxClassReference('Risk Model', CreateNewStressTest.getComboTextBox('Risk Model')).clearText();
    });

    it('Should enter "R squared" in the "Risk Model" textbox', function() {
      ThiefHelpers.getTextBoxClassReference('Risk Model').setText('R squared');

      //Clicking to get dropdown options
      CreateNewStressTest.getComboTextBox('Risk Model').click();
    });

    it('Should select "R-Squared Daily Global Equity Model USD V2" inside "R squared" tree from "Risk Model" combo drodown', function() {
      CreateNewStressTest.getElementFromDropDown('R-Squared', 'R-Squared Daily Global Equity Model USD V2').click();
    });

    it('Should click on "Report Date" calender button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateNewStressTest.xpathDatePickerButton, 'Report Date');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Should set the date to "11/30/2015" in "Report Date" textbox', function() {
      ThiefHelpers.setDateInCalendar('11/30/2015', 2);
    });

    it('Verifying if "Report Date" datepicker textbox is set to "11/30/2015"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateNewStressTest.getInputBox('Report Date')).getText().then(function(text) {
        if (text !== '11/30/2015') {
          expect(false).customError('The "Report Date" textbox is not set to "11/30/2015"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on Refresh icon
    EditStressTest.clickOnRefreshButton();

    it('Verifying if "Shock Percentage" label contains value "-7.16" ', function() {
      CreateNewStressTest.getLabelFromFactorInfoSection('Shock Percentage').getText().then(function(value) {
        if (value.indexOf('-7.16') <= -1) {
          expect(false).customError('The "Shock Percentage" label does not contains value "-7.16", Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    var arrLabel = ['Shock Level', 'Current Level'];
    var arrValue = ['129.4', '139.4'];
    arrLabel.forEach(function(label, index) {
      it('Verifying if "' + label + '" label contains value "' + arrValue[index] + '" ', function() {
        CreateNewStressTest.getLabelFromFactorInfoSection(label).getText().then(function(value) {
          var text = value.replace(/\n/g, ' ');
          var temp = text.split(' ');
          var num = temp[2].slice(0, temp[2].indexOf('.') + 2);
          if (num !== arrValue[index]) {
            expect(false).customError('The "' + label + '" label does not contains value "' + arrValue[index] + '" ');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });
    });
  });

  describe('Test Step ID: 664952', function() {

    it('Should click to expand "Advanced options" accordian section', function() {
      CreateNewStressTest.getAccordion('Advanced Options').click();
    });

    it('Should click on "History Limit" dropdown button', function() {
      ThiefHelpers.getButtonClassReference(undefined, CreateNewStressTest.xpathHistoryLimitDrodownButton).press();
    });

    it('Should click to select option "Two Years Ago" from Dropdown" ', function() {
      CreateNewStressTest.getOptionFromDropdown('Two Years Ago').click();
    });

    it('Verifying if "History Limit" textbox is set to "Two Years Ago" ', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateNewStressTest.xpathDatepickerTextbox, 'History Limit');

      ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(text) {
        if (text !== 'Two Years Ago') {
          expect(false).customError('The "History Limit" textbox is not set to "Two Years Ago" ');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on Refresh icon
    EditStressTest.clickOnRefreshButton();

    it('Verifying if "Shock Percentage" label contains value "-5.95" ', function() {
      CreateNewStressTest.getLabelFromFactorInfoSection('Shock Percentage').getText().then(function(value) {
        if (value.indexOf('-5.95') <= -1) {
          expect(false).customError('The "Shock Percentage" label does not contains value "-5.95", Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    var arrLabel = ['Shock Level', 'Current Level'];
    var arrValue = ['131.1', '139.4'];
    arrLabel.forEach(function(label, index) {
      it('Verifying if "' + label + '" label contains value "' + arrValue[index] + '" ', function() {
        CreateNewStressTest.getLabelFromFactorInfoSection(label).getText().then(function(value) {
          var text = value.replace(/\n/g, ' ');
          var temp = text.split(' ');
          var num = temp[2].slice(0, temp[2].indexOf('.') + 2);
          if (num !== arrValue[index]) {
            expect(false).customError('The "' + label + '" label does not contains value "' + arrValue[index] + '" ');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });
    });
  });

  describe('Test Step ID: 664928', function() {

    it('Should enter "IBM_STD" in the "Name" textbox', function() {
      ThiefHelpers.getTextBoxClassReference('Name', undefined).setText('IBM_STD');
    });

    it('Verifying if the "Name" textbox is set to "IBM_STD"', function() {
      ThiefHelpers.getTextBoxClassReference('Name', undefined).getText().then(function(text) {
        if (text !== 'IBM_STD') {
          expect(false).customError('The "Name" textbox is not set to "IBM"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Personal" from the "Directory" section', function() {
      ThiefHelpers.getRadioClassReference('Personal').select();

      // Verfying if "Personal" is selected under "Directory"
      ThiefHelpers.getRadioClassReference('Personal').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Personal" radio button is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save" button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateNewStressTest.xpathButtonFromDialog, 'Save');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Should wait for the spinner icon to disappear', function() {
      Utilities.waitUntilElementDisappears(CreateNewStressTest.getSpinner(), 10000);
    });

    it('Verifying if "Create New Stress Test" dialog disappeared', function() {
      ThiefHelpers.isDialogOpen('Create New Stress Test').then(function(option) {
        if (option) {
          expect(false).customError('"Create New Stress Test" dialog has not disappeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "IBM_STD" from "Personal" in Available section and click on "info"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');
      group.expand();
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(TileOptionsRiskStressTests.xpathAvailableContainer, 'Personal', 'IBM_STD', 'last').then(function(indexOfElement) {
            var item = group.getItemByIndex(indexOfElement);

            item.then(function(iconsRef) {
              iconsRef.getIcons().then(function(icons) {
                icons.clickIcon('info');
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

    var arrSection = ['Factor', 'Shock Amount', 'Shock Type', 'Shock Currency'];
    var arrSectionValue = ['IBM', '-5', 'Standard Deviation', 'U.S. Dollar'];

    arrSection.forEach(function(section, index) {
      it('Verifying if "' + section + '" contains "' + arrSectionValue[index] + '"', function() {
        TileOptionsRiskStressTests.getInfoBoxData(section, 'dialog').getText().then(function(value) {
          if (value !== arrSectionValue[index]) {
            expect(false).customError('The "' + section + '" does not contains "' + arrSectionValue[index] + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 664941', function() {

    it('Should double click on "IBM_STD" to add it to "selected" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');
      group.expand();
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(TileOptionsRiskStressTests.xpathAvailableContainer, 'Personal', 'IBM_STD', 'last').then(function(indexOfElement) {
            var item = group.getItemByIndex(indexOfElement);

            return item.then(function(itemTODoubleClick) {
              itemTODoubleClick.select();
              itemTODoubleClick.doubleClick();
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

    it('Verifying if "IBM_STD" is present in selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('IBM_STD') === -1) {
          expect(false).customError('"IBM_STD" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "IBM_STD" is selected in selected section', function() {
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getItemByText('IBM_STD').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"IBM_STD" is not selected in selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrSection = ['Type', 'Factor', 'Shock Amount', 'Shock Type', 'Shock Currency'];
    var arrSectionValue = ['Identifier', 'IBM', '-5', 'Standard Deviation', 'U.S. Dollar'];

    arrSection.forEach(function(section, index) {
      it('Verifying if "' + section + '" contains "' + arrSectionValue[index] + '" in the RHS', function() {
        TileOptionsRiskStressTests.getInfoBoxData(section).getText().then(function(value) {
          if (value !== arrSectionValue[index]) {
            expect(false).customError('The "' + section + '" does not contains "' + arrSectionValue[index] + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 664923', function() {

    it('Should click on "X" icon to remove "IBM_STD" from selected section', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getItemByText('IBM_STD');

      item.getActions().then(function(val) {
        val.triggerAction('remove');
      });
    });

    it('Should click "Add" button next to Available section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsRiskStressTests.xpathAddButton).press().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Create New Stress Test" dialog appeared', function() {
      ThiefHelpers.isDialogOpen('Create New Stress Test').then(function(option) {
        if (!option) {
          expect(false).customError('"Create New Stress Test" dialog has not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Clear the text in the text box', function() {
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).clear();

      // Verifying if "Name" filed is cleared
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).getAttribute('value').then(function(text) {
        if (text !== '') {
          expect(false).customError('The "Factor" textbox is not set to "LHMN1570"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "IBM" in the "Factor" textbox', function() {
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).sendKeys('IBM').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the "Factor" textbox is set to "IBM"', function() {
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).getAttribute('value').then(function(text) {
        if (text !== 'IBM') {
          expect(false).customError('The "Factor" textbox is not set to "IBM"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should open and select "Highest - Level" from "Shock" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Highest - Level', undefined, CreateNewStressTest.getDropDown('Shock'), undefined);
    });

    it('Verifying if "Shock" drop down is set to "Highest - Level" ', function() {
      ThiefHelpers.verifySelectedDropDownText('Highest - Level', undefined, CreateNewStressTest.getDropDown('Shock'));
    });

    it('Click on the x icon under Risk Model to clear the drop-down', function() {
      ThiefHelpers.getTextBoxClassReference('Risk Model', CreateNewStressTest.getComboTextBox('Risk Model')).clearText();
    });

    it('Should enter "R-Squared Daily Global Equity Model USD V2" in the "Risk Model" textbox', function() {
      ThiefHelpers.getTextBoxClassReference('Risk Model').setText('R-Squared Daily Global Equity Model USD V2');

      //Clicking to get dropdown options
      CreateNewStressTest.getComboTextBox('Risk Model').click();
    });

    it('Should select "R-Squared Daily Global Equity Model USD V2" inside "R squared" tree from "Risk Model" combo drop-down', function() {
      CreateNewStressTest.getElementFromDropDown('R-Squared', 'R-Squared Daily Global Equity Model USD V2').click();
    });

    it('Should click on "Report Date" calender button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateNewStressTest.xpathDatePickerButton, 'Report Date');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Should set the date to "11/30/2015" in "Report Date" textbox', function() {
      ThiefHelpers.setDateInCalendar('01/09/2017', 2);
    });

    it('Verifying if "Report Date" datepicker textbox is set to "1/09/2017"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateNewStressTest.getInputBox('Report Date')).getText().then(function(text) {
        if (text !== '1/09/2017') {
          expect(false).customError('The "Report Date" textbox is not set to "1/09/2017"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on Refresh icon
    EditStressTest.clickOnRefreshButton();

    it('Verifying if "Shock Percentage" label contains value "28.72" ', function() {
      CreateNewStressTest.getLabelFromFactorInfoSection('Shock Percentage').getText().then(function(value) {
        if (value.indexOf('28.72') <= -1) {
          expect(false).customError('The "Shock Percentage" label does not contains value "28.72", Found:' + value);
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    var arrLabel = ['Shock Level', 'Current Level'];
    var arrValue = ['215.8', '167.6'];
    arrLabel.forEach(function(label, index) {
      it('Verifying if "' + label + '" label contains value "' + arrValue[index] + '" ', function() {
        CreateNewStressTest.getLabelFromFactorInfoSection(label).getText().then(function(value) {
          var text = value.replace(/\n/g, ' ');
          var temp = text.split(' ');
          var num = temp[2].slice(0, temp[2].indexOf('.') + 2);
          if (num !== arrValue[index]) {
            expect(false).customError('The "' + label + '" label does not contains value "' + arrValue[index] + '" ');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });
    });
  });

  describe('Test Step ID: 664921', function() {

    it('Should open "Shock" currency dropdown and select "Japanese Yen"', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateNewStressTest.xpathCurrencyDropdown, 'Shock');

      ThiefHelpers.selectOptionFromDropDown('Japanese Yen', undefined, xpath, 1);
    });

    it('Verifying if "Shock" currency dropdown is set to "Japanese Yen"', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateNewStressTest.xpathCurrencyDropdown, 'Shock');

      ThiefHelpers.verifySelectedDropDownText('Japanese Yen', undefined, xpath);
    });

    it('Should click on "Report Date" calender button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateNewStressTest.xpathDatePickerButton, 'Report Date');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Should set the date to "11/25/2015" in "Report Date" textbox', function() {
      ThiefHelpers.setDateInCalendar('11/25/2015', 2);
    });

    it('Verifying if "Report Date" datepicker textbox is set to "11/25/2015"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateNewStressTest.getInputBox('Report Date')).getText().then(function(text) {
        if (text !== '11/25/2015') {
          expect(false).customError('The "Report Date" textbox is not set to "11/25/2015"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on Refresh icon
    EditStressTest.clickOnRefreshButton();

    //Known issue: RPD:28593534 PA3 Stress Test Preview window using wrong currency
    var arrLabel = ['Shock Percentage', 'Shock Level', 'Current Level'];
    var arrValue = ['26.9', '21523.4', '16956.7'];
    arrLabel.forEach(function(label, index) {
      it('Verifying if "' + label + '" label contains value "' + arrValue[index] + '" ', function() {
        CreateNewStressTest.getLabelFromFactorInfoSection(label).getText().then(function(value) {
          var text = value.replace(/\n/g, ' ');
          var temp = text.split(' ');
          var num = temp[2].slice(0, temp[2].indexOf('.') + 2);
          if (num !== arrValue[index]) {
            expect(false).customError('The "' + label + '" label does not contains value "' + arrValue[index] + '"' + ' "Known issue : RPD:28593534 may be resolved"');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });
    });
  });

  describe('Test Step ID: 664925', function() {

    it('Should enter "IBM_HighestLevel" in the "Name" textbox', function() {
      ThiefHelpers.getTextBoxClassReference('Name', undefined).setText('IBM_HighestLevel');
    });

    it('Verifying if the "Name" textbox is set to "IBM_HighestLevel"', function() {
      ThiefHelpers.getTextBoxClassReference('Name', undefined).getText().then(function(text) {
        if (text !== 'IBM_HighestLevel') {
          expect(false).customError('The "Name" textbox is not set to "IBM_HighestLevel"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Personal" from the "Directory" section', function() {
      ThiefHelpers.getRadioClassReference('Personal').select();

      // Verfying if "Personal" is selected under "Directory"
      ThiefHelpers.getRadioClassReference('Personal').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Personal" radio button is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save" button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateNewStressTest.xpathButtonFromDialog, 'Save');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Should wait for the spinner icon to disappear', function() {
      Utilities.waitUntilElementDisappears(CreateNewStressTest.getSpinner(), 10000);
    });

    it('Verifying if "Create New Stress Test" dialog disappeared', function() {
      ThiefHelpers.isDialogOpen('Create New Stress Test').then(function(option) {
        if (option) {
          expect(false).customError('"Create New Stress Test" dialog has not disappeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click on "IBM_HighestLevel" from "Personal" to add it to "selected" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');
      group.expand();
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(TileOptionsRiskStressTests.xpathAvailableContainer, 'Personal', 'IBM_HighestLevel', 'last').then(function(indexOfElement) {
            var item = group.getItemByIndex(indexOfElement);

            return item.then(function(itemTODoubleClick) {
              itemTODoubleClick.select();
              itemTODoubleClick.doubleClick();
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

    it('Verifying if "IBM_HighestLevel" is present in selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('IBM_HighestLevel') === -1) {
          expect(false).customError('"IBM_HighestLevel" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "IBM_HighestLevel" is selected in selected section', function() {
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getItemByText('IBM_HighestLevel').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"IBM_HighestLevel" is not selected in selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrSection = ['Type', 'Factor', 'Shock Type', 'Shock Currency'];
    var arrSectionValue = ['Identifier', 'IBM', 'Highest - Level', 'Japanese Yen'];

    arrSection.forEach(function(section, index) {
      it('Verifying if "' + section + '" contains "' + arrSectionValue[index] + '" in the RHS', function() {
        TileOptionsRiskStressTests.getInfoBoxData(section).getText().then(function(value) {
          if (value !== arrSectionValue[index]) {
            expect(false).customError('The "' + section + '" does not contains "' + arrSectionValue[index] + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 664924', function() {

    it('Should click on "X" icon to remove "IBM_HighestLevel" from selected section', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getItemByText('IBM_HighestLevel');

      item.getActions().then(function(val) {
        val.triggerAction('remove');
      });
    });

    it('Should click "Add" button next to Available section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsRiskStressTests.xpathAddButton).press().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Create New Stress Test" dialog appeared', function() {
      ThiefHelpers.isDialogOpen('Create New Stress Test').then(function(option) {
        if (!option) {
          expect(false).customError('"Create New Stress Test" dialog has not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Clear the text in the text box', function() {
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).clear();

      // Verifying if "Name" filed is cleared
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).getAttribute('value').then(function(text) {
        if (text !== '') {
          expect(false).customError('The "Factor" textbox is not set to "LHMN1570"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "IBM" in the "Factor" textbox', function() {
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).sendKeys('IBM').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the "Factor" textbox is set to "IBM"', function() {
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).getAttribute('value').then(function(text) {
        if (text !== 'IBM') {
          expect(false).customError('The "Factor" textbox is not set to "IBM"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should open and select "Highest" from "Shock" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Highest', undefined, CreateNewStressTest.getDropDown('Shock'), undefined);
    });

    it('Verifying if "Shock" drop down is set to "Highest" ', function() {
      ThiefHelpers.verifySelectedDropDownText('Highest', undefined, CreateNewStressTest.getDropDown('Shock'));
    });
  });

  describe('Test Step ID: 664926', function() {

    it('Click on the x icon under Risk Model to clear the drop-down', function() {
      ThiefHelpers.getTextBoxClassReference('Risk Model', CreateNewStressTest.getComboTextBox('Risk Model')).clearText();
    });

    it('Should enter "R-Squared Daily Global Equity Model USD V2" in the "Risk Model" text-box', function() {
      ThiefHelpers.getTextBoxClassReference('Risk Model').setText('R-Squared Daily Global Equity Model USD V2');

      //Clicking to get dropdown options
      CreateNewStressTest.getComboTextBox('Risk Model').click();
    });

    it('Should select "R-Squared Daily Global Equity Model USD V2" inside "R squared" tree from "Risk Model" combo drop-down', function() {
      CreateNewStressTest.getElementFromDropDown('R-Squared', 'R-Squared Daily Global Equity Model USD V2').click();
    });

    it('Should click on "Report Date" calender button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateNewStressTest.xpathDatePickerButton, 'Report Date');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Should set the date to "11/30/2014" in "Report Date" textbox', function() {
      ThiefHelpers.setDateInCalendar('11/30/2014', 2);
    });

    it('Verifying if "Report Date" datepicker textbox is set to "11/30/2014"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateNewStressTest.getInputBox('Report Date')).getText().then(function(text) {
        if (text !== '11/30/2014') {
          expect(false).customError('The "Report Date" textbox is not set to "11/30/2014"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on Refresh icon
    EditStressTest.clickOnRefreshButton();

    var arrLabel = ['Shock Percentage', 'Shock Level', 'Current Level'];
    var arrValue = ['11.5', '180.8', '162.1'];
    arrLabel.forEach(function(label, index) {
      it('Verifying if "' + label + '" label contains value "' + arrValue[index] + '" ', function() {
        CreateNewStressTest.getLabelFromFactorInfoSection(label).getText().then(function(value) {
          var text = value.replace(/\n/g, ' ');
          var temp = text.split(' ');
          var num = temp[2].slice(0, temp[2].indexOf('.') + 2);
          if (num !== arrValue[index]) {
            expect(false).customError('The "' + label + '" label does not contains value "' + arrValue[index] + '"');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });
    });
  });

  describe('Test Step ID: 664989', function() {

    it('Should enter "IBM_Highest" in the "Name" textbox', function() {
      ThiefHelpers.getTextBoxClassReference('Name', undefined).setText('IBM_Highest');
    });

    it('Verifying if the "Name" textbox is set to "IBM_Highest"', function() {
      ThiefHelpers.getTextBoxClassReference('Name', undefined).getText().then(function(text) {
        if (text !== 'IBM_Highest') {
          expect(false).customError('The "Name" textbox is not set to "IBM_Highest"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Personal" from the "Directory" section', function() {
      ThiefHelpers.getRadioClassReference('Personal').select();

      // Verfying if "Personal" is selected under "Directory"
      ThiefHelpers.getRadioClassReference('Personal').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Personal" radio button is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save" button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateNewStressTest.xpathButtonFromDialog, 'Save');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Should wait for the spinner icon to disappear', function() {
      Utilities.waitUntilElementDisappears(CreateNewStressTest.getSpinner(), 10000);
    });

    it('Verifying if "Create New Stress Test" dialog disappeared', function() {
      ThiefHelpers.isDialogOpen('Create New Stress Test').then(function(option) {
        if (option) {
          expect(false).customError('"Create New Stress Test" dialog has not disappeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click on "IBM_Highest" from "Personal" to add it to "selected" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');
      group.expand();
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(TileOptionsRiskStressTests.xpathAvailableContainer, 'Personal', 'IBM_Highest', 'last').then(function(indexOfElement) {
            var item = group.getItemByIndex(indexOfElement);

            return item.then(function(itemTODoubleClick) {
              itemTODoubleClick.select();
              itemTODoubleClick.doubleClick();
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

    it('Verifying if "IBM_Highest" is present in selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('IBM_Highest') === -1) {
          expect(false).customError('"IBM_Highest" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "IBM_Highest" is selected in selected section', function() {
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getItemByText('IBM_Highest').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"IBM_Highest" is not selected in selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrSection = ['Type', 'Factor', 'Shock Type', 'Shock Currency'];
    var arrSectionValue = ['Identifier', 'IBM', 'Highest', 'U.S. Dollar'];

    arrSection.forEach(function(section, index) {
      it('Verifying if "' + section + '" contains "' + arrSectionValue[index] + '" in the RHS', function() {
        TileOptionsRiskStressTests.getInfoBoxData(section).getText().then(function(value) {
          if (value !== arrSectionValue[index]) {
            expect(false).customError('The "' + section + '" does not contains "' + arrSectionValue[index] + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 664990', function() {
    var arrElement = ['IBM_STD', 'IBM_HighestLevel', 'IBM_Highest'];

    arrElement.forEach(function(element) {

      it('Verifying if "Personal" from the Available section is expanded by default. If not, expand it', function() {
        var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');

        group.isExpanded().then(function(expanded) {
          if (!expanded) {
            group.expand();
          }
        });
      });

      it('Should select "Personal > ' + element + '" from the Available section', function() {
        var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');
        group.getItemByText(element).then(function(itemRef) {
          itemRef.getActions().then(function(val) {
            val.triggerAction('remove');
          });
        });
      });

      it('Verifying if "Delete Stress Test" appeared', function() {
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

      it('Verifying if "Delete Stress Test" dialog closed', function() {
        ThiefHelpers.isDialogOpen('Delete Stress Test').then(function(option) {
          if (option) {
            expect(false).customError('"Delete Stress Test" dialog has not closed');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Personal > Shock Gold to 1000" is removed from Available section', function() {
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getChildrenText().then(function(childArr) {
        childArr.forEach(function(element) {
          if (element.text === 'Personal') {
            var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');
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
                      expect(false).customError('"Shock Gold to 1000" is not deleted from "Personal" directory');
                      CommonFunctions.takeScreenShot();
                    }
                  });
                });
              } else {
                expect(false).customError('"Personal" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          }
        });
      });
    });
  });

  describe('Test Step ID: 664922', function() {

    // Click on "Cancel" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options - Weights');
  });
});
