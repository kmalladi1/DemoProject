'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-shock-level', function() {
  var shockPercentage;
  var shockLevel;
  var currentLevel;

  describe('Test Step ID: Start Up', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 619414', function() {

    it('Should open PA3 Application with "Client:/Pa3/Risk/SHOCK_GOLD_LEVEL"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('shock-gold-level');
    });

    it('Verifying if "Calculation Error" not appeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog has appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrValues = [{name: 'Portfolio', val: 'CLIENT:/PA3/RISK/GOLD_CHECK.ACCT', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'benchmark', val: 'CASH:USD', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Date Options', 'Dates', 'Document Options');

    it('Should open and select "Monthly" from "Calculation Frequency" dropdown under "Dates" option', function() {
      ThiefHelpers.selectOptionFromDropDown('Monthly', undefined, DocumentOptionsDates.xpathCalculationFrequencyDropDown, undefined);

    });

    it('Verifying if "Calculation Frequency" dropdown is set to "Monthly" under "Dates" option', function() {
      ThiefHelpers.verifySelectedDropDownText('Monthly', undefined, DocumentOptionsDates.xpathCalculationFrequencyDropDown);
    });

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

  });

  describe('Test Step ID: 619415', function() {

    // Select stress tests tab from Tile Options
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

    it('Verifying if "Edit Stress Test" dialog is displayed', function() {
      ThiefHelpers.isDialogOpen('Edit Stress Test').then(function(found) {
        if (!found) {
          expect(false).customError('"Edit Stress Test" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrDropDown = ['Type', 'Shock'];
    var arrDropdownText = ['Identifier', '% Return'];

    arrDropDown.forEach(function(dropdown, index) {
      it('Verifying if "' + arrDropdownText[index] + '" is selected by default form the "' + dropdown + '" drop down', function() {
        ThiefHelpers.verifySelectedDropDownText(arrDropdownText[index], undefined, EditStressTest.getDropDown(dropdown));
      });
    });

    var arrTextbox = ['Report Date', 'Shock'];
    var arrText = ['Latest', '-30.0000'];
    arrTextbox.forEach(function(textbox, index) {
      it('Verifying if "' + textbox + '" textbox is set to "' + arrText[index] + '" by default', function() {
        ThiefHelpers.getTextBoxClassReference(undefined, EditStressTest.getInputBox(textbox)).getText().then(function(text) {
          if (text !== arrText[index]) {
            expect(false).customError('The "' + textbox + '" textbox is not set to "' + arrText[index] + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "SP50.R" is displayed in "Factor" field', function() {
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).getAttribute('value').then(function(text) {
        if (text !== 'SP50.R') {
          expect(false).customError('"SP50.R" is not typed into the Factor field.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 619416', function() {

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

    it('Should  enter "00743A00" in the "Factor" textbox', function() {
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).sendKeys('00743A00').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the "Factor" textbox is set to "00743A00"', function() {
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).getAttribute('value').then(function(text) {
        if (text !== '00743A00') {
          expect(false).customError('The "Factor" textbox is not set to "00743A00"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Report Date" calender button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(EditStressTest.xpathDatePickerButton, 'Report Date');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Should set the date to "05/22/2014" in "Report Date" text-box', function() {
      ThiefHelpers.setDateInCalendar('05/22/2014', 2);
    });

    it('Verifying if "Report Date" date-picker text-box is set to "5/22/2014"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, EditStressTest.getInputBox('Report Date')).getText().then(function(text) {
        if (text !== '5/22/2014') {
          expect(false).customError('The "Report Date" textbox is not set to "5/22/2014"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clear the text in the risk model and click on the dropdown expand the group and select option
    CreateNewStressTest.clearRiskModelTextBoxAndExpandGroupToSelectOption('FactSet', 'FactSet Multi-Asset Class Model (USD)');

    // Click on Refresh icon
    EditStressTest.clickOnRefreshButton();

    var arrDate = [];
    it('Should read all data of "Date" Column', function() {
      EditStressTest.getColumnData('Date').then(function(colData) {
        arrDate = colData;
      });
    });

    var arrFirstDate = ['4/30/2014', '3/31/2014'];
    arrFirstDate.forEach(function(date, index) {
      it('Verifying if index "' + index + '" contains "' + date + '" in the "Date" column of Factor Information', function() {
        if (arrDate[index] !== date) {
          expect(false).customError('index "' + index + '" does not contains "' + date + '" in the "Date" column of Factor Information');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrLastDate = ['7/31/2008', '8/29/2008'];
    arrLastDate.forEach(function(date, index) {
      it('Verifying if last indexes contains "' + date + '" in the "Date" column of Factor Information', function() {
        if (arrDate[arrDate.length - (index + 1)] !== date) {
          expect(false).customError('index "' + (arrDate.length - (index + 1)) + '" does not contains "' + date + '" in the ' +
            '"Date" column of Factor Information');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 619946', function() {

    var arrLabel = ['Shock Percentage', 'Shock Level', 'Current Level'];
    var arrValue = ['-30.00', '906.50', '1295.00'];

    arrLabel.forEach(function(label, index) {
      it('Verifying if "' + label + '" label value is "' + arrValue[index] + '"', function() {
        EditStressTest.getLabelFromFactorInfoSection(label).getText().then(function(value) {
          console.log(value + ' - ' + typeof (value) + ' - ' + typeof (arrValue[index]) + ' - ' + arrValue[index]);
          if (value.indexOf(arrValue[index]) <= -1) {
            expect(false).customError('The value of "' + label + '" is not "' + arrValue[index] + '" Expected:' +
              ' ' + arrValue[index] + ' Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should read "Shock Percentage" label value', function() {
      EditStressTest.getLabelFromFactorInfoSection('Shock Percentage').getText().then(function(value) {
        var text = value.replace(/\n/g, ' ');
        var temp = text.split(' ');
        console.log(value + ' - ' + temp[2]);
        shockPercentage = temp[2];
      });
    });

    it('Should read "Shock Level" label value', function() {
      EditStressTest.getLabelFromFactorInfoSection('Shock Level').getText().then(function(value) {
        var text = value.replace(/\n/g, ' ');
        var temp = text.split(' ');
        shockLevel = temp[2];
      });
    });

    it('Should read "Current Level" label value', function() {
      EditStressTest.getLabelFromFactorInfoSection('Current Level').getText().then(function(value) {
        var text = value.replace(/\n/g, ' ');
        var temp = text.split(' ');
        currentLevel = temp[2];
      });
    });

  });

  describe('Test Step ID: 619417', function() {

    it('Should open and select "Level" from "Shock" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Level', undefined, EditStressTest.getDropDown('Shock'), undefined);
    });

    it('Verifying if "Shock" drop down is set to "Level" ', function() {
      ThiefHelpers.verifySelectedDropDownText('Level', undefined, EditStressTest.getDropDown('Shock'));
    });

    it('Should enter "1000" in the "Shock" textbox', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, EditStressTest.getInputBox('Shock')).setText('1000');
    });

    it('Verifying if the "Shock" textbox is set to "1000"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, EditStressTest.getInputBox('Shock')).getText().then(function(text) {
        if (text !== '1000') {
          expect(false).customError('The "Shock" textbox is not set to "1000"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click to expand "Advanced options" accordian section', function() {
      EditStressTest.getAccordion('Advanced Options').click();
    });

    it('Should check the "Stressed Factor in USD" checkbox from "Advanced options" accordian section', function() {
      var xpath = CommonFunctions.replaceStringInXpath(EditStressTest.xpathCheckBoxFromAccordion, 'Stressed Factor in USD');
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).check();
    });

    it('Verifying if "Stressed Factor in USD" checkbox is checked in "Advanced options" accordian section', function() {
      var xpath = CommonFunctions.replaceStringInXpath(EditStressTest.xpathCheckBoxFromAccordion, 'Stressed Factor in USD');
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Stressed Factor in USD" checkbox is not checked in "Advanced options" accordian section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Report Date" datepicker textbox is set to "5/22/2014"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, EditStressTest.getInputBox('Report Date')).getText().then(function(text) {
        if (text !== '5/22/2014') {
          expect(false).customError('The "Report Date" textbox is not set to "5/22/2014"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on Refresh icon
    EditStressTest.clickOnRefreshButton();

    it('Verifying if "Shock Percentage" label value is changed', function() {
      EditStressTest.getLabelFromFactorInfoSection('Shock Percentage').getText().then(function(value) {
        var text = value.replace(/\n/g, ' ');
        var temp = text.split(' ');
        if (temp[2] === shockPercentage) {
          expect(false).customError('The value of "Shock Percentage" is not changed"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Shock Level" label value is changed', function() {
      EditStressTest.getLabelFromFactorInfoSection('Shock Level').getText().then(function(value) {
        var text = value.replace(/\n/g, ' ');
        var temp = text.split(' ');
        if (temp[2] === shockLevel) {
          expect(false).customError('The value of "Shock Level" is not changed"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Current Level" label value is not changed ', function() {
      EditStressTest.getLabelFromFactorInfoSection('Current Level').getText().then(function(value) {
        var text = value.replace(/\n/g, ' ');
        var temp = text.split(' ');
        if (temp[2] !== currentLevel) {
          expect(false).customError('The value of "Current Level" is changed" Expected: ' + currentLevel + 'Found: ' + temp[2]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 619418', function() {

    it('Should enter "Shock Gold to 1000" in the "Name" textbox', function() {
      ThiefHelpers.getTextBoxClassReference('Name', undefined).setText('Shock Gold to 1000');
    });

    it('Verifying if the "Name" textbox is set to "Shock Gold to 1000"', function() {
      ThiefHelpers.getTextBoxClassReference('Name', undefined).getText().then(function(text) {
        if (text !== 'Shock Gold to 1000') {
          expect(false).customError('The "Name" textbox is not set to "Shock Gold to 1000"');
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
      var xpath = CommonFunctions.replaceStringInXpath(EditStressTest.xpathButtonFromDialog, 'Save');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Should wait for the spinner icon to disappear', function() {
      Utilities.waitUntilElementDisappears(EditStressTest.getSpinner(), 10000);
    });

    it('Verifying if "Edit Stress Test" dialog disappeared', function() {
      ThiefHelpers.isDialogOpen('Edit Stress Test').then(function(option) {
        if (option) {
          expect(false).customError('"Edit Stress Test" dialog has not disappeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click on "Shock Gold to 1000" from "Personal" directory to add it to "selected" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');
      group.expand();
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(TileOptionsRiskStressTests.xpathAvailableContainer, 'Personal', 'Shock Gold to 1000', 'last').then(function(indexOfElement) {
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

    it('Verifying if "Shock Gold to 1000" is present in selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Shock Gold to 1000') === -1) {
          expect(false).customError('"Shock Gold to 1000" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Automation Task: Ignoring synchronization to handle Cancel button', function() {
      browser.ignoreSynchronization = true;
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    it('Should click on "Cancel" button in when PA Report calculates', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg(), 10000);

      ThiefHelpers.getButtonClassReference('Cancel', undefined).press();
    });

    it('Verify that report is not calculated', function() {
      browser.ignoreSynchronization = false;
      PA3MainPage.getReportCachingAlertIcon('Weights').isPresent().then(function(bool) {
        if (!bool) {
          expect(false).customError('The report is calculated as the alert icon in not present');
          CommonFunctions.takeScreenShot();
        }
      });

      browser.sleep(2000);
    });

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Date Options', 'Dates', 'Document Options');

    it('Should open and select "Daily" from "Calculation Frequency" dropdown under "Dates" option', function() {
      ThiefHelpers.selectOptionFromDropDown('Daily', undefined, DocumentOptionsDates.xpathCalculationFrequencyDropDown, undefined);

    });

    it('Verifying if "Calculation Frequency" dropdown is set to "Daily" under "Dates" option', function() {
      ThiefHelpers.verifySelectedDropDownText('Daily', undefined, DocumentOptionsDates.xpathCalculationFrequencyDropDown);
    });

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    var arrMultiheader = ['Shock 00743', 'Shock Gold to 1000'];
    arrMultiheader.forEach(function(header, index) {
      it('Verifying if "Shock Gold to 1000" is displayed next to "Shock 00743" in the multiheader', function() {
        SlickGridFunctions.getMultiHeaderNames('Weights').then(function(multiheader) {
          if (header !== multiheader[index]) {
            CommonFunctions.takeScreenShot();
            expect(false).customError('"Shock Gold to 1000" is not displayed next to "Shock 00743" in the multiheader');
          }
        });
      });
    });

    var arrShock = ['-1.13', '-30.00', '0.29', '0.23', '0.21', '0.14', '0.14', '0.19', '0.42', '0.08', '0.03', '0.16', '0.18', '0.18',
      '0.04', '0.12', '-0.08', '0.14', '0.08', '0.32', '0.17', '0.03', '0.17', '0.30', '0.15', '0.13', '0.31', '0.06', '-0.00',
      '0.26', '0.12', '0.25', '--',];

    var arrShockGold = ['-4.35', '-7.54', '-2.16', '-6.15', '-4.65', '-5.68', '-4.05', '-5.94', '-4.26', '-2.32', '-4.39',
      '-3.13', '-3.14', '-6.58', '-1.93', '-6.42', '-3.26', '-2.55', '-4.48', '-2.08', '-4.62', '-2.82', '-4.66', '-4.16',
      '-0.68', '-2.12', '-2.76', '-5.99', '-3.51', '-4.97', '-3.91', '-3.30', '--',];

    var arrShockRead = [];
    var arrShockGoldRead = [];
    it('Should read all the column value of "Shock 00743" column', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '', '').then(function(rowName) {
        rowName.forEach(function(row) {
          SlickGridFunctions.getCellReference('Weights', row, '', 'Percent Standalone Return (Event Wght)',
            'Shock 00743', undefined).then(function(ref) {
            ref.getText().then(function(text) {
              arrShockRead.push(text);
            });
          });
        });
      });
    });

    it('Should read all the column value of "Shock Gold to 1000" column', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '', '').then(function(rowName) {
        rowName.forEach(function(row) {
          SlickGridFunctions.getCellReference('Weights', row, '', 'Percent Standalone Return (Event Wght)',
            'Shock Gold to 1000', undefined).then(function(ref) {
            ref.getText().then(function(text) {
              arrShockGoldRead.push(text);
            });
          });
        });
      });
    });

    arrShock.forEach(function(value, index) {
      it('Verifying if the value in "' + index + '" index of "Shock 00743" column is "' + value + '"', function() {
        if (value !== arrShockRead[index]) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('The value in "' + index + '" index of "Shock 00743" column is not equal to ' +
            '"' + value + '" Found: ' + arrShockRead[index] + ' Expected: ' + value);
        }
      });
    });

    arrShockGold.forEach(function(value, index) {
      it('Verifying if the value in "' + index + '" index of "Shock Gold to 1000" column is "' + value + '"', function() {
        if (value !== arrShockGoldRead[index]) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('The value in "' + index + '" index of "Shock Gold to 1000" column is not equal to ' +
            '"' + value + '" Found: ' + arrShockGoldRead[index] + ' Expected: ' + value);
        }
      });
    });

  });

  describe('Test Step ID: 620294', function() {

    // Select stress tests tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Stress Tests', 'Risk');

    it('Should hover over on "Shock Gold to 1000" in selected section and click on "X" icon', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getItemByText('Shock Gold to 1000');

      item.getActions().then(function(val) {
        val.triggerAction('remove');
      });
    });

    it('Should click "Shock Gold to 1000" wrench under "Personal" from the Available section and click on "Remove"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(TileOptionsRiskStressTests.xpathAvailableContainer, 'Personal', 'Shock Gold to 1000', 'last').then(function(indexOfElement) {
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

    it('Verifying if "Personal > Shock Gold to 1000" is removed from Available section', function() {
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getChildrenText().then(function(childArr) {
        childArr.forEach(function(element) {
          if (element.text === 'Personal') {
            var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');
            group.expand();

            group.isExpanded().then(function(expanded) {
              if (expanded) {
                group.getChildrenText().then(function(arrObject) {
                  arrObject.forEach(function(listItem) {
                    if (listItem.text === 'Shock Gold to 1000') {
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

  describe('Test Step ID: 620295', function() {

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile options');

  });

});
