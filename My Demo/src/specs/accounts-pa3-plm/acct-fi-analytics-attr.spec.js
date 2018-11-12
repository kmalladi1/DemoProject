require(__dirname + '/../../index.js');

describe('Test Case: acct-fi-analytics-attr', function() {

  describe('Test Step ID: 722917', function() {

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

  describe('Test Step ID: 722918', function() {

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

  });

  describe('Test Step ID: 722933', function() {

    it('Should expand "PA|Fixed Income" and select "Analytics" from LHP in "Account(New)" page', function() {
      ThiefHelpers.expandAndGetOptionspaneItem(undefined, 'Analytics', 'PA|Fixed Income').select();

      //Verifying if "Analytics" is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Analytics', 'PA|Fixed Income').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Analytics" is not selected inside "PA|Fixed Income"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Reference Curve:" dropdown is set to "LIBOR"', function() {
      ThiefHelpers.verifySelectedDropDownText('LIBOR', 'Reference Curve:', undefined);
    });

    var arrChecklistItem = ['5 Year', '3 Month'];
    arrChecklistItem.forEach(function(item) {
      it('Verifying if checklist item "' + item + '" inside "Include All" group under "Partial Duration Points" section checked off', function() {
        // Verifying if the checkbox is checked
        ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').getItemByText(item).isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('The checklist item "' + item + '" inside "Include All" group checklist is unchecked');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var arrDropDown = ['Mixed Currency Options:', 'Analytics for Forwards:', 'Analytics for Cash:', 'Analytics for Lot-Level Detail:'];
    var arrDropDownOption = ['Show per Currency, Portfolio-Only Currencies', 'Include Analytics', 'Include Analytics', 'On Purchase, Security- Level Data After Purchase'];

    arrDropDown.forEach(function(dropDown, index) {

      it('Verifying if "' + dropDown + '" dropdown is selected to "' + arrDropDownOption[index] + '"', function() {
        ThiefHelpers.verifySelectedDropDownText(arrDropDownOption[index], dropDown, undefined);
      });
    });

  });

  describe('Test Step ID: 722909', function() {

    it('Should check "Include All" checklist group under Partial Duration Points', function() {
      ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').toggle();
    });

    it('Verifying if "Include All" group checklist is checked off', function() {
      // Verifying if the checkbox is checked
      ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Include All" group checklist is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var checklistItem = ['1 Month', '3 Month', '6 Month', '1 Year', '2 Year', '3 Year', '4 Year', '5 Year', '6 Year',
      '7 Year', '8 Year', '9 Year', '10 Year', '15 Year', '20 Year', '25 Year', '30 Year',];
    checklistItem.forEach(function(item) {
      it('Verifying if checklist item "' + item + '" inside "Include All" group is checked off', function() {
        // Verifying if the checkbox is checked
        ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').getItemByText(item).isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('The checklist item "' + item + '" inside "Include All" group checklist is unchecked');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 722910', function() {

    it('Should uncheck "Include All" checklist group', function() {
      ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').toggle();
    });

    it('Verifying if "Include All" group checklist is unchecked', function() {
      ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').isChecked().then(function(checked) {
        if (checked) {
          expect(false).customError('"Include All" group checklist is still checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check "1 Year" inside "Include All" group under "Partial Duration Points" checklist item', function() {
      ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').getItemByText('1 Year').toggle();
    });

    it('Verifying if checklist item "1 Year" inside "Include All" group under "Partial Duration Points" section checked off', function() {
      ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').getItemByText('1 Year').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('The checklist item "1 Year" inside "Include All" group checklist is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrDropDown = ['Reference Curve:', 'Mixed Currency Options:', 'Analytics for Forwards:', 'Analytics for Cash:', 'Analytics for Lot-Level Detail:'];
    var arrDropDownOption = ['Government', 'Show per Currency', 'Treat as N/A', 'Treat as Zero', 'Only on Purchase Date'];

    arrDropDown.forEach(function(dropDown, index) {

      it('Should click to select "' + arrDropDownOption[index] + '" option from "' + dropDown + '" dropdown', function() {
        ThiefHelpers.selectOptionFromDropDown(arrDropDownOption[index], dropDown, undefined);
      });

      it('Verifying if "' + dropDown + '" dropdown is set to "' + arrDropDownOption[index] + '"', function() {
        ThiefHelpers.verifySelectedDropDownText(arrDropDownOption[index], dropDown, undefined);
      });
    });

  });

  describe('Test Step ID: 722939', function() {

    it('Should expand "PA|Fixed Income" and select "Attribution" from LHP in "Account(New)" page', function() {
      ThiefHelpers.expandAndGetOptionspaneItem(undefined, 'Attribution', 'PA|Fixed Income').select();

      //Verifying if "Attribution" is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Attribution', 'PA|Fixed Income').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Attribution" is not selected inside "PA|Fixed Income"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Shift Point:" dropdown is selected to "Tenor"', function() {
      ThiefHelpers.verifySelectedDropDownText('Tenor', 'Shift Point:', undefined, undefined);
    });

    var arrChecklistItem = ['6 Month', '1 Year', '3 Year', '5 Year'];
    arrChecklistItem.forEach(function(item) {
      it('Verifying if checklist item "' + item + '" inside "Include All" group is checked', function() {
        // Verifying if the checkbox is checked
        ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').getItemByText(item).isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('The checklist item "' + item + '" inside "Include All" group checklist is checked off');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying "Duration:" dropdown is selected to "Effective"', function() {
      ThiefHelpers.verifySelectedDropDownText('Effective', 'Duration:', undefined, undefined);
    });

    it('Verifying "Treat Cash Return as:" dropdown is set to "Price Return"', function() {
      ThiefHelpers.verifySelectedDropDownText('Income Return', 'Treat Cash Return as:', undefined, undefined);
    });

    it('Verifying if checkbox "Expand Partial Twist" is unchecked', function() {
      // Verifying if the checkbox is unchecked
      ThiefHelpers.getCheckBoxClassReference('Expand Partial Twist').isChecked().then(function(checked) {
        if (checked) {
          expect(false).customError('The checkbox "Expand Partial Twist" is checked off');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 722940', function() {

    it('Should open and select "Portfolio" from "Shift Point:" dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Portfolio', 'Shift Point:', undefined, undefined);
    });

    it('Verifying "Shift Point:" dropdown is set to "Portfolio"', function() {
      ThiefHelpers.verifySelectedDropDownText('Portfolio', 'Shift Point:', undefined, undefined);
    });

    it('Should select the " Portfolio Modified Duration (Float)" radio button', function() {
      ThiefHelpers.getRadioClassReference('Portfolio Modified Duration (Float)').select();
    });

    it('Verifying if the " Portfolio Modified Duration (Float)" radio button selected', function() {
      ThiefHelpers.getRadioClassReference('Portfolio Modified Duration (Float)').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('The radio button " Portfolio Modified Duration (Float)" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrDropdown = ['Duration:', 'Treat Cash Return as:'];
    var arrDropdownOption = ['Modified', 'Price Return'];

    arrDropdown.forEach(function(dropdown, index) {
      it('Should open and select "' + arrDropdownOption[index] + '" from "' + dropdown + '" dropdown', function() {
        ThiefHelpers.selectOptionFromDropDown(arrDropdownOption[index], dropdown, undefined, undefined);
      });

      it('Verifying if "' + dropdown + '" dropdown is set to "' + arrDropdownOption[index] + '"', function() {
        ThiefHelpers.verifySelectedDropDownText(arrDropdownOption[index], dropdown, undefined);
      });
    });

    it('Should check "Expand Partial Twist" checkbox', function() {
      ThiefHelpers.getCheckBoxClassReference('Expand Partial Twist').check();
    });

    it('Verifying if checkbox "Expand Partial Twist" is checked', function() {
      // Verifying if the checkbox is checked
      ThiefHelpers.getCheckBoxClassReference('Expand Partial Twist').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('The checkbox "Expand Partial Twist" is not checked off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 722941', function() {

    it('Should click on "Cancel" button to close the "Modify Account(New)" dailog', function() {
      ThiefHelpers.clickOnButton('Cancel');
    });

  });
});
