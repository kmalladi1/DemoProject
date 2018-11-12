require(__dirname + '/../../index.js');

describe('Test Case: acct-pa-data-scene', function() {

  describe('Test Step ID: 723176', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch PA3 Application with "Client:;Pa3;Accounts;ACCT_PA_PLM" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('acct-pa-plm');
    });

    it('Should Wait for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying that "Portfolio" widget is displaying "CLIENT:/PA3/ACCOUNTS/PA_TABS_TEST.ACCT"', function() {
      PA3MainPage.getWidgetBox('Portfolio').getAttribute('value').then(function(val) {
        if (val !== 'CLIENT:/PA3/ACCOUNTS/PA_TABS_TEST.ACCT') {
          expect(false).customError('Portfolio widget bax doesnot contain "CLIENT:/PA3/ACCOUNTS/PA_TABS_TEST.ACCT", Found:' + val);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Benchmark" widget is displaying "CLIENT:RUSSELL1000.ACCT"', function() {
      PA3MainPage.getWidgetBox('Benchmark').getAttribute('value').then(function(val) {
        if (val !== 'CLIENT:RUSSELL1000.ACCT') {
          expect(false).customError('Benchmark widget bax doesnot contain "CLIENT:RUSSELL1000.ACCT", Found:' + val);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 723178', function() {

    it('Should click on "Portfolio" hamburger icon', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.getHamburgerIcon('Portfolio')).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Account Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(found) {
        if (!found) {
          expect(false).customError('"Portfolio" Hamburger icon is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "pencil" icon next to "Tests PA tabs" ', function() {
      PA3MainPage.getAccountEditButton('portfolio', 'Tests PA tabs').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that Modify Account New dialog box appeared', function() {
      ModifyAccountNew.isModifyAccountMode().then(function(flag) {
        if (!flag) {
          expect(flag).customError('"Modify Account (New)" mode is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "PA" and select "Scenarios" from LHP in "Account(New)" page', function() {
      ThiefHelpers.expandAndGetOptionspaneItem(undefined, 'Scenarios', 'PA').select();

      //Verifying if "Scenarios" is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Scenarios', 'PA').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Scenarios" is not selected inside "PA"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Disabling wait for Angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Waiting for loading scenarios.. icon to disappear', function() {
      CommonFunctions.waitUntilElementDisappears(ModifyAccountPaScenarios.getSenarioLoadingIcon(), 180000);
    });

    it('Enabling wait for Angular', function() {
      browser.ignoreSynchronization = false;
    });

    it('Should enter "FactSet in the "Available" search box', function() {
      ModifyAccountPaScenarios.getSearchBox('Available').sendKeys('FactSet');
    });

    it('Verifying if the filtered items have "Factset" in it', function() {
      ModifyAccountPaScenarios.getAllFilteredItem().each(function(ref) {
        ref.getText().then(function(text) {
          if (text.toLowerCase().indexOf('factset') < 0) {
            expect(false).customError('Filtered items does not have "Factset" in it. Found:' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 723179', function() {

    it('Should click to select "FactSet_and_Moodys_spread_shock" from available container', function() {
      ModifyAccountPaScenarios.getAllFilteredItem().each(function(ref) {
        ref.getText().then(function(text) {
          if (text === 'FactSet_and_Moodys_spread_shock') {
            ref.click();
          }
        });
      });
    });

    it('Should click on "Right" arrow', function() {
      ModifyAccountPaScenarios.getTransferButton('Right').click();
    });

    it('Verifying if "Client:FactSet_and_Moodys_spread_shock" is present in the selected section', function() {
      ModifyAccountPaScenarios.getItemFromSelectedSection('Client:FactSet_and_Moodys_spread_shock').isPresent().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Client:FactSet_and_Moodys_spread_shock" is not present in selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should clear and enter "vb" in the "Horizon Months:" field', function() {
      ThiefHelpers.getTextBoxClassReference('Horizon Months:', undefined).setText('vb');

      // Verifying if "Horizon Months:" field contains "vb"
      ThiefHelpers.getTextBoxClassReference('Horizon Months:', undefined).getText().then(function(attr) {
        if (attr !== 'vb') {
          expect(false).customError('The "Horizon Months:" field is not set to "vb"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on Warning icon and verify if the infobox shows "Input must be a number" ', function() {
      ThiefHelpers.getTextBoxClassReference('Horizon Months:', undefined).getErrors().then(function(error) {
        if (error.indexOf('Input must be a number') < 0) {
          expect(false).customError('The infobox does not shows "Input must be a number.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 724390', function() {

    var arrNumbers = ['1', '5', '9'];
    arrNumbers.forEach(function(number) {
      it('Should clear and enter "' + number + '" in the "Horizon Months:" field', function() {
        browser.ignoreSynchronization = false;
        ThiefHelpers.getTextBoxClassReference('Horizon Months:', undefined).setText(number);

        // Verifying if "Horizon Months:" field contains "'+number+'"
        ThiefHelpers.getTextBoxClassReference('Horizon Months:', undefined).getText().then(function(attr) {
          if (attr !== number) {
            expect(false).customError('The "Horizon Months:" field is not set to "' + number + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Should click on "Add" button', function() {
        ThiefHelpers.getButtonClassReference('Add', undefined).press();
      });

      it('Verifying if the "Horizon Months:" listbox contains "' + number + '"', function() {
        ThiefHelpers.getListBoxItem(undefined, number, undefined).getText().then(function(text) {
          if (text !== number) {
            expect(false).customError('The "listbox" does not contains "' + number + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should open and select "Forwards + Spread" from "Reinvestment Assumption" dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Forwards + Spread', 'Reinvestment Assumption', undefined, undefined);
    });

    it('Verifying if "Reinvestment Assumption" dropdown is set to "Forwards + Spread"', function() {
      ThiefHelpers.verifySelectedDropDownText('Forwards + Spread', 'Reinvestment Assumption', undefined);
    });

    it('Should set "bps" textbox to "10"', function() {
      ThiefHelpers.getTextBoxClassReference('bps', undefined).setText('10');

      //Verifying if the "bps" textbox is set to 10
      ThiefHelpers.getTextBoxClassReference('bps', undefined).getText().then(function(text) {
        if (text !== '10') {
          expect(false).customError('the "bps" textbox is not set to "10"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check off the "Use Actual Frequency" checkbox', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Actual Frequency', undefined).check();

      //Verifying if the checkbox is checked off
      ThiefHelpers.getCheckBoxClassReference('Use Actual Frequency').isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Use Actual Frequency" checkbox is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Custom" radio button', function() {
      ThiefHelpers.getRadioClassReference('Custom', undefined).select();
    });

    it('Verifying if "Custom" radio button is selected', function() {
      ThiefHelpers.getRadioClassReference('Custom', undefined).isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('The "Custom" radio button is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Client:FactSet_and_Moodys_spread_shock" is present in the selected section', function() {
      ModifyAccountPaScenarios.getItemFromSelectedSection('Client:FactSet_and_Moodys_spread_shock').isPresent().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Client:FactSet_and_Moodys_spread_shock" is not present in selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Last cash flow" radio button is not selected', function() {
      ThiefHelpers.getRadioClassReference('Last cash flow', undefined).isSelected().then(function(bool) {
        if (bool) {
          expect(false).customError('The "Last cash flow" radio button is selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 724391', function() {

    it('Should check off the "Weekly" checkbox', function() {
      ThiefHelpers.getCheckBoxClassReference('Weekly', undefined).check();

      //Verifying if the checkbox is checked off
      ThiefHelpers.getCheckBoxClassReference('Weekly').isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Weekly" checkbox is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check off "Generate Horizon Cash" checkbox', function() {
      ThiefHelpers.getCheckBoxClassReference('Generate Horizon Cash').check();
    });

    it('Verifying if "Generate Horizon Cash" checkbox is checked off', function() {
      ThiefHelpers.getCheckBoxClassReference('Generate Horizon Cash').isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Generate Horizon Cash" checkbox is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 723180', function() {

    it('Should select "Databases" under "PA" from LHP in "Account(New)" dialog', function() {
      ThiefHelpers.expandAndGetOptionspaneItem(undefined, 'Databases', 'PA').select();

      //Verifying if "Databases" is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Databases', 'PA').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Databases" is not selected inside "PA" group');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should clear and enter "MSCI" in the "Available" textbox', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, ModifyAccountPaDatabases.xpathAvailableSearchBox).setText('MSCI');

      // Verifying if "Available" field contains "MSCI"
      ThiefHelpers.getTextBoxClassReference(undefined, ModifyAccountPaDatabases.xpathAvailableSearchBox).getText().then(function(attr) {
        if (attr !== 'MSCI') {
          expect(false).customError('The "Available" field is not set to "MSCI"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrList = [];
    it('Should read all the children from "Available" list', function() {
      browser.sleep(2000);
      ThiefHelpers.getListboxClassReference(ModifyAccountPaDatabases.xpathFundamentalAvailableContainer).getChildrenText().then(function(children) {
         children.forEach(function(child) {
           arrList.push(child.text);
         });
       });
    });

    it('Verifying if the "Available" list only contains "MSCI"', function() {
      if (arrList.length !== 0 && arrList[0] !== 'MSCI') {
        expect(false).customError('The "Available" list does not only contains "MSCI". Found: ' + arrList);
        CommonFunctions.takeScreenShot();
      }
    });

  });

  describe('Test Step ID: 723181', function() {

    it('Should click to select "MSCI" list item to highlight it', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaDatabases.xpathFundamentalAvailableContainer, 'MSCI').select();
    });

    it('Should double click on "MSCI" list item to move it to selected section', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaDatabases.xpathFundamentalAvailableContainer, 'MSCI').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Should click to select "Compustat Industrials" list item to highlight it', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaDatabases.xpathFundamentalSelectedContainer, 'Compustat Industrials').select();
    });

    it('Should click on the down arrow button', function() {
      var transferBox = ThiefHelpers.getTransferBoxReference(ModifyAccountPaDatabases.xpathFundamentalTransferbox);
      transferBox.target.down();
      browser.sleep(2000);
    });

    var arrList = [];
    it('Should read all the children from "Fundamental" "selected" list', function() {
      ModifyAccountPaDatabases.getAllListElements('Fundamental', 'Selected').each(function(ref) {
        ref.getText().then(function(text) {
          arrList.push(text);
        });
      });

      it('Verifying if the "Fundamental" "Selected" list only contains only 2 items', function() {
        if (arrList.length !== 2) {
          expect(false).customError('The "Selected" list does not only contains only 2 items. Found: ' + arrList.length);
          CommonFunctions.takeScreenShot();
        }
      });

      var arrExpectedList = ['MSCI','Compustat Industrials'];
      arrExpectedList.forEach(function(item,index) {
        it('Verifying if the "Fundamental" "Selected" list contains "' + item + '" at index "' + index + '"', function() {
          if (item !== arrList[index]) {
            expect(false).customError('The "Available" list does not contains "' + item + '" at index "' + index + '", Found:  ' + arrList[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 723182', function() {

    var arrListItem = ['Reuters', 'First Call'];
    arrListItem.forEach(function(item) {
      it('Should click to select "' + item + '" list item from "Estimates" Available section to highlight it', function() {
        ThiefHelpers.getListBoxItem(ModifyAccountPaDatabases.xpathEstimatesAvailableContainer, item).select();
      });

      it('Should click on the "Right Arrow" to move it to selected section', function() {
        ThiefHelpers.sendElementToSelectedSection(ModifyAccountPaDatabases.xpathEstimateTransferbox);
      });

    });

    var arrList = [];
    it('Should read all the children from "Estimate" "Selected" list', function() {
      browser.sleep(2000);
      ModifyAccountPaDatabases.getAllListElements('estimates', 'Selected').each(function(ref) {
        ref.getText().then(function(text) {
          arrList.push(text);
        });
      });
    });

    var arrExpectedList = ['FactSet', 'Reuters', 'First Call'];
    arrExpectedList.forEach(function(item,index) {
      it('Verifying if the "Estimate" "Selected" list contains "' + item + '" at index "' + index + '"', function() {
        if (item !== arrList[index]) {
          expect(false).customError('The "Available" list does not contains "' + item + '" at index "' + index + '", Found:  ' + arrList[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 723500', function() {

    it('Should click to select "First Call" list item to highlight it', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaDatabases.xpathEstimatesSelectedContainer, 'First Call').select();
    });

    it('Should click on the "Up" arrow button twice', function() {
      for (var i = 0; i <= 2; i++) {
        var transferBox = ThiefHelpers.getTransferBoxReference(ModifyAccountPaDatabases.xpathEstimateTransferbox);
        transferBox.target.up();
      }
    });

    var arrList = [];
    it('Should read all the children from "Estimate" "Selected" list', function() {
      browser.sleep(2000);
      ModifyAccountPaDatabases.getAllListElements('estimates', 'Selected').each(function(ref) {
        ref.getText().then(function(text) {
          console.log(text);
          arrList.push(text);
        });
      });
    });

    it('Verifying if the "Estimate" "Selected" list only contains only 3 items', function() {
      if (arrList.length !== 3) {
        expect(false).customError('The "Selected" list does not only contains only 2 items. Found: ' + arrList.length);
        CommonFunctions.takeScreenShot();
      }
    });

    var arrExpectedList = ['First Call', 'FactSet', 'Reuters'];
    arrExpectedList.forEach(function(item,index) {
      it('Verifying if the "Estimate" "Selected" list contains "' + item + '" at index "' + index + '"', function() {
        if (item !== arrList[index]) {
          expect(false).customError('The "Available" list does not contains "' + item + '" at index "' + index + '", Found:  ' + arrList[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 723476', function() {

    it('Should expand "PA" and select "Scenarios" from LHP in "Account(New)" page', function() {
      ThiefHelpers.expandAndGetOptionspaneItem(undefined, 'Scenarios', 'PA').select();

      //Verifying if "Scenarios" is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Scenarios', 'PA').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Scenarios" is not selected inside "PA"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Disabling wait for Angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Waiting for loading scenarios.. icon to disappear', function() {
      CommonFunctions.waitUntilElementDisappears(ModifyAccountPaScenarios.getSenarioLoadingIcon(), 180000);
    });

    it('Enabling wait for Angular', function() {
      browser.ignoreSynchronization = false;
    });

    it('Verifying if "Client:FactSet_and_Moodys_spread_shock" is present in the selected section', function() {
      ModifyAccountPaScenarios.getItemFromSelectedSection('Client:FactSet_and_Moodys_spread_shock').isPresent().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Client:FactSet_and_Moodys_spread_shock" is not present in selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrNumbers = ['1', '5', '9'];
    arrNumbers.forEach(function(number) {
      it('Verifying if "Horizon Months:" listbox contains "' + number + '"', function() {
        it('Verifying if the "Horizon Months:" listbox contains "' + number + '"', function() {
          ThiefHelpers.getListBoxItem(undefined, number, undefined).getText().then(function(text) {
            if (text !== number) {
              expect(false).customError('The "listbox" does not contains "' + number + '"');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if "Reinvestment Assumption" dropdown is set to "Forwards + Spread"', function() {
      ThiefHelpers.verifySelectedDropDownText('Forwards + Spread', 'Reinvestment Assumption', undefined);
    });

    it('Verifying if the "Reinvestment Assumption" "bps" textbox is set to 10', function() {
      ThiefHelpers.getTextBoxClassReference('bps', undefined).getText().then(function(text) {
        if (text !== '10') {
          expect(false).customError('the "bps" textbox is not set to "10"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Use Actual Frequency" checkbox is checked off', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Actual Frequency').isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Use Actual Frequency" checkbox is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Custom" radio button is selected', function() {
      ThiefHelpers.getRadioClassReference('Custom', undefined).isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('The "Custom" radio button is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Weekly" checkbox is checked off', function() {
      ThiefHelpers.getCheckBoxClassReference('Weekly').isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Weekly" checkbox is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Last cash flow" radio button is not selected', function() {
      ThiefHelpers.getRadioClassReference('Last cash flow', undefined).isSelected().then(function(bool) {
        if (bool) {
          expect(false).customError('The "Last cash flow" radio button is selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Generate Horizon Cash" checkbox is checked off', function() {
      ThiefHelpers.getCheckBoxClassReference('Generate Horizon Cash').isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Generate Horizon Cash" checkbox is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 723477', function() {

    it('Should click on "Cancel" button to close the "Modify Account(New)" dailog', function() {
      ThiefHelpers.clickOnButton('Cancel');
    });

  });

});
