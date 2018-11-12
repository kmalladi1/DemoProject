require(__dirname + '/../../index.js');

describe('Test Case: acct-asset-types', function() {

  describe('Test Step ID: 722148', function() {

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

  describe('Test Step ID: 722149', function() {

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

    it('Should expand "PA|Asset Types" and select "Add/Remove" from LHP in "Modify Account(New)" page', function() {
      ThiefHelpers.expandAndGetOptionspaneItem(undefined, 'Add/Remove', 'PA|Asset Types').select();

      //Verifying if "Add/Remove" is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Add/Remove', 'PA|Asset Types').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Add/Remove" is not selected inside "PA|Asset Types"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check "Apply to Benchmark" checkbox', function() {
      ThiefHelpers.getCheckBoxClassReference('Apply to Benchmark').check();

      // Verifying if "Apply to Benchmark" checkbox is checked
      ThiefHelpers.getCheckBoxClassReference('Apply to Benchmark').isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Apply to Benchmark" checkbox is not checked off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Adjustment" radio button', function() {
      ThiefHelpers.getRadioClassReference('Adjustment').select();

      // Verifying if "Adjustment" radio button is selected
      ThiefHelpers.getRadioClassReference('Adjustment').isSelected().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Adjustment" Radio button is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should clear and enter "Cash" in the "Available" search box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, ModifyAccountPaAssetTypesAddRemove.getSearchField('Available')).setText('Cash');

      // Verifying if "Available" search field is set to "Cash"
      ThiefHelpers.getTextBoxClassReference(undefined, ModifyAccountPaAssetTypesAddRemove.getSearchField('Available')).getText().then(function(text) {
        if (text !== 'Cash') {
          expect(false).customError('"Available" search field is not set to "Cash"');
          CommonFunctions.takeScreenShot();
        }
      });
      browser.sleep(2000);
    });

    var arrFirstLevelGroup = [];
    it('Automation step: Reading the first level of tree group', function() {
      ThiefHelpers.getListboxClassReference(ModifyAccountPaAssetTypesAddRemove.xpathAvailableContainer).getChildrenText().then(function(childern) {
        childern.forEach(function(arrEle) {
          console.log(arrEle.text);
          arrFirstLevelGroup.push(arrEle.text);
        });
      });
    });

    var arrSecondLevelGroup = [];
    it('Verifying second level group contains "cash" in it', function() {
      arrFirstLevelGroup.forEach(function(group, index) {
        ThiefHelpers.getListboxClassReference(ModifyAccountPaAssetTypesAddRemove.xpathAvailableContainer).getGroupByText(group)
          .getChildrenText().then(function(childern) {
          childern.forEach(function(arrEle) {
            arrSecondLevelGroup.push(arrEle.text);
            if (arrEle.text.toLowerCase().indexOf('cash') < 0) {
              expect(false).customError('The second level group does not contains "cash" in it');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

    });

    it('Verifying third level children items contains "cash" in it', function() {
      arrFirstLevelGroup.forEach(function(group, index) {
        ThiefHelpers.getListboxClassReference(ModifyAccountPaAssetTypesAddRemove.xpathAvailableContainer).getGroupByText(group)
          .getGroupByText(arrSecondLevelGroup[index]).getChildrenText().then(function(childern) {
          childern.forEach(function(arrEle) {
            if (arrEle.text.toLowerCase().indexOf('cash') < 0) {
              expect(false).customError('The second level group does not contains "cash" in it');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

    });

  });

  describe('Test Step ID: 722150', function() {

    it('Should select "LIBOR Cash" inside "Select LIBOR Tenor|[Cash]" from "Available" section ', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaAssetTypesAddRemove.xpathAvailableContainer, 'LIBOR Cash', 'Select LIBOR Tenor|[Cash]').select();

      // Verifying if "LIBOR Cash" from "Available" section is selected
      ThiefHelpers.getListBoxItem(ModifyAccountPaAssetTypesAddRemove.xpathAvailableContainer, 'LIBOR Cash', 'Select LIBOR Tenor|[Cash]').isSelected()
        .then(function(bool) {
          if (!bool) {
            expect(false).customError('LIBOR Cash" inside "Select LIBOR Tenor|[Cash]" from "Available" section is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should click on "Right" arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection(ModifyAccountPaAssetTypesAddRemove.xpathTransferbox);
    });

    it('Verifying if "LIBOR Cash" inside "Select LIBOR Tenor|[Cash]" is displayed in "Selected" section ', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaAssetTypesAddRemove.xpathSelectedContainer, 'LIBOR Cash', 'Select LIBOR Tenor|[Cash]')
        .getText().then(function(text) {
        if (text !== 'LIBOR Cash') {
          expect(false).customError('"LIBOR Cash"  inside "Select LIBOR Tenor|[Cash]" is not shown in the "Selected" listbox list; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"LIBOR Cash" inside "Select LIBOR Tenor|[Cash]" is not found in the "Selected" listbox list');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Equity Common" inside "Canada/US Conversion|Equity" is displayed in "Selected" section ', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaAssetTypesAddRemove.xpathSelectedContainer, 'Equity Common', 'Canada/US Conversion|Equity')
        .getText().then(function(text) {
        if (text !== 'Equity Common') {
          expect(false).customError('"Equity Common" inside "Canada/US Conversion|Equity" is not shown in the "Selected" listbox list; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"Equity Common" inside "Canada/US Conversion|Equity" is not found in the "Selected" listbox list');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 722152', function() {

    it('Should select "Equity" group item inside "Canada/US Conversion" from Selected section ', function() {
      ThiefHelpers.getListboxGroup(ModifyAccountPaAssetTypesAddRemove.xpathSelectedContainer, 'Canada/US Conversion|Equity').select();

      // Verifying if "Equity" group item inside "Canada/US Conversion" from "Selected" section is selected
      ThiefHelpers.getListboxGroup(ModifyAccountPaAssetTypesAddRemove.xpathSelectedContainer, 'Canada/US Conversion|Equity').isSelected()
        .then(function(bool) {
          if (!bool) {
            expect(false).customError('"Equity" group item inside "Canada/US Conversion" from "Selected" section is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    var arrDropdown = ['Computation Method', 'Offset Cash Type', 'Apply To Indirect'];
    var arrDropdownOption = ['Use Total Cost', 'LIBOR Cash', 'Yes'];

    arrDropdown.forEach(function(dropdown, index) {

      it('Should select "' + arrDropdownOption[index] + '" from "' + dropdown + '" drop down', function() {
        ThiefHelpers.selectOptionFromDropDown(arrDropdownOption[index], dropdown, undefined);
      });

      it('Verifying if "' + dropdown + '" drop down is set to "' + arrDropdownOption[index] + '"', function() {
        ThiefHelpers.verifySelectedDropDownText(arrDropdownOption[index], dropdown);
      });
    });

    it('Should select "Four Month" from "Tenor" drop down', function() {
      browser.sleep(2000);
      ThiefHelpers.selectOptionFromDropDown('Four Month', undefined, ModifyAccountPaAssetTypesAddRemove.xpathTenorDropdown);
    });

    it('Verifying if "Tenor" drop down is set to "Four Month"', function() {
      ThiefHelpers.verifySelectedDropDownText('Four Month', undefined, ModifyAccountPaAssetTypesAddRemove.xpathTenorDropdown);
    });

  });

  describe('Test Step ID: 722153', function() {

    it('Should select "Equity Common" inside "Canada/US Conversion|Equity" from "Selected" section ', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaAssetTypesAddRemove.xpathSelectedContainer, 'Equity Common', 'Canada/US Conversion|Equity').select();
    });

    it('Should click on "X" icon in "Equity Common" item in the selected section', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaAssetTypesAddRemove.xpathSelectedContainer, 'Equity Common', 'Canada/US Conversion|Equity')
        .getActions().then(function(actions) {
        actions.triggerAction('remove');
      });
      browser.sleep(2000);
    });

    it('Verifying if the selected section contains only one tree list now', function() {
      ThiefHelpers.getListboxClassReference(ModifyAccountPaAssetTypesAddRemove.xpathSelectedContainer).getChildrenText().then(function(childern) {
          if (childern.length !== 1) {
            expect(false).customError('the selected section contains more the one tree list. Found: ' + childern.length);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying if "LIBOR Cash" inside "Select LIBOR Tenor|[Cash]" is displayed in "Selected" section ', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaAssetTypesAddRemove.xpathSelectedContainer, 'LIBOR Cash', 'Select LIBOR Tenor|[Cash]')
          .getText().then(function(text) {
          if (text !== 'LIBOR Cash') {
            expect(false).customError('"LIBOR Cash"  inside "Select LIBOR Tenor|[Cash]" is not shown in the "Selected" listbox list; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"LIBOR Cash" inside "Select LIBOR Tenor|[Cash]" is not found in the "Selected" listbox list');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
    });

  });

  describe('Test Step ID: 722154', function() {

    it('Should Click on "Clear All" button in selected section', function() {
      ThiefHelpers.getTransferBoxReference(ModifyAccountPaAssetTypesAddRemove.xpathTransferbox).target.clear();
    });

    it('Verifying if "selected container" is now empty', function() {
      ThiefHelpers.getListboxClassReference(ModifyAccountPaAssetTypesAddRemove.xpathSelectedContainer).getChildrenText().then(function(child) {
        child.forEach(function(arrEle) {
          if (arrEle.length !== 0) {
            expect(false).customError('The "selected container" is not empty. Found: ' + arrEle.length);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 722189', function() {

    it('Should check "Disable asset type adjustments" checkbox', function() {
      ThiefHelpers.getCheckBoxClassReference('Disable asset type adjustments').check();

      // Verifying if "Disable asset type adjustments" checkbox is checked
      ThiefHelpers.getCheckBoxClassReference('Disable asset type adjustments').isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Disable asset type adjustments" checkbox is not checked off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Apply to Benchmark" checkbox is disabled(grayed out)', function() {
      ThiefHelpers.getCheckBoxClassReference('Apply to Benchmark').isDisabled().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Apply to Benchmark" checkbox is not disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrRadio = ['Asset Type', 'Adjustment'];

    arrRadio.forEach(function(radio) {
      it('Verifying if "' + radio + '" radio button is disabled(grayed out) in "View By" section', function() {
        ThiefHelpers.getRadioClassReference(radio).isDisabled().then(function(boolean) {
          if (!boolean) {
            expect(false).customError('"' + radio + '" radio button is not disabled');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var arrAvailableOrSelected = [ModifyAccountPaAssetTypesAddRemove.xpathAvailableContainer, ModifyAccountPaAssetTypesAddRemove.xpathSelectedContainer];
    var arrSection = ['Available', 'Selected'];

    arrAvailableOrSelected.forEach(function(item, index) {

      it('Verifying if "' + arrSection[index] + '" section is disabled(grayed out)', function() {
        element(by.xpath(item)).getAttribute('class').then(function(attr) {
          if (attr.indexOf('disabled') < 0) {
            expect(false).customError('"' + arrSection[index] + '" section is not disabled');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 722155', function() {

    it('Should expand "PA|Asset Types" and select "Search Order" from LHP in "Account(New)" page', function() {
      ThiefHelpers.expandAndGetOptionspaneItem(undefined, 'Search Order', 'PA|Asset Types').select();

      //Verifying if "Search Order" is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Search Order', 'PA|Asset Types').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Search Order" is not selected inside "PA|Asset Types"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should clear and enter "client" in the "Available" search box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, ModifyAccountPaAssetTypesSearchOrder.getSearchField('Available')).setText('client');

      // Verifying if "Available" search field is set to "client"
      ThiefHelpers.getTextBoxClassReference(undefined, ModifyAccountPaAssetTypesSearchOrder.getSearchField('Available')).getText().then(function(text) {
        if (text !== 'client') {
          expect(false).customError('"Available" search field is not set to "client"');
          CommonFunctions.takeScreenShot();
        }
      });
      browser.sleep(2000);
    });

    it('Verifying if all the search list item conatins a word "client" in it', function() {
      ModifyAccountPaAssetTypesSearchOrder.getAllListItem('Available').each(function(ref) {
        ref.getText().then(function(text) {
          if (text.toLowerCase().indexOf('client') < 0) {
            expect(false).customError('All the child items does not contains "Client" in it. Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 722157', function() {

    it('Should select "Client Portfolio - FFI Main Sector" from "Available" section ', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaAssetTypesSearchOrder.xpathAvailableContainer, 'Client Portfolio - FFI Main Sector').select();

      // Verifying if "Client Portfolio - FFI Main Sector" from "Available" section is selected
      ThiefHelpers.getListBoxItem(ModifyAccountPaAssetTypesSearchOrder.xpathAvailableContainer, 'Client Portfolio - FFI Main Sector').isSelected()
        .then(function(bool) {
          if (!bool) {
            expect(false).customError('Client Portfolio - FFI Main Sector" from "Available" section is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should click on "Right" arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection(ModifyAccountPaAssetTypesSearchOrder.xpathTransferbox);
    });

    it('Verifying if "Client Portfolio - FFI Main Sector" is displayed in "Selected" section ', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaAssetTypesSearchOrder.xpathSelectedContainer, 'Client Portfolio - FFI Main Sector')
        .getText().then(function(text) {
        if (text !== 'Client Portfolio - FFI Main Sector') {
          expect(false).customError('"Client Portfolio - FFI Main Sector" is not shown in the "Selected" listbox list; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"Client Portfolio - FFI Main Sector" is not found in the "Selected" listbox list');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Portfolio - FFI Main Sector" from "Selected" section ', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaAssetTypesSearchOrder.xpathSelectedContainer, 'Portfolio - FFI Main Sector').select();

      // Verifying if "Portfolio - FFI Main Sector" from "Available" section is selected
      ThiefHelpers.getListBoxItem(ModifyAccountPaAssetTypesSearchOrder.xpathSelectedContainer, 'Portfolio - FFI Main Sector').isSelected()
        .then(function(bool) {
          if (!bool) {
            expect(false).customError('Portfolio - FFI Main Sector" from "Selected" section is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should Click on "down" button in selected section', function() {
      ThiefHelpers.getTransferBoxReference(ModifyAccountPaAssetTypesSearchOrder.xpathTransferbox).target.down();
    });

    var arrList = [];
    it('Should read all the selected container list item', function() {
      ModifyAccountPaAssetTypesSearchOrder.getAllListItem('Selected').each(function(ref) {
        ref.getText().then(function(text) {
          arrList.push(text);
        });
      });
    });

    var arrExpectedList = ['Benchmark - FFI Main Sector', 'Client Portfolio - FFI Main Sector','Portfolio - FFI Main Sector'];

    arrExpectedList.forEach(function(item, index) {
      it('Verifying if the selected list items are in expected order', function() {
        if (item !== arrList[index]) {
          expect(false).customError('The selected container does not contains "' + item + '" at index "' + index + '". Found: ' + arrList[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 722158', function() {

    it('Should select "Portfolio - FFI Main Sector" from "Selected" section ', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaAssetTypesSearchOrder.xpathSelectedContainer, 'Portfolio - FFI Main Sector').select();

      // Verifying if "Portfolio - FFI Main Sector" from "Available" section is selected
      ThiefHelpers.getListBoxItem(ModifyAccountPaAssetTypesSearchOrder.xpathSelectedContainer, 'Portfolio - FFI Main Sector').isSelected()
        .then(function(bool) {
          if (!bool) {
            expect(false).customError('Portfolio - FFI Main Sector" from "Selected" section is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should click on "X" icon in "Portfolio - FFI Main Sector" item in the selected section', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaAssetTypesSearchOrder.xpathSelectedContainer, 'Portfolio - FFI Main Sector')
        .getActions().then(function(actions) {
        actions.triggerAction('remove');
      });
      browser.sleep(2000);
    });

    it('Verifying if "Portfolio - FFI Main Sector" is removed from "Selected" section ', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaAssetTypesSearchOrder.xpathSelectedContainer, 'Portfolio - FFI Main Sector')
        .getText().then(function(text) {
        if (text === 'Portfolio - FFI Main Sector') {
          expect(false).customError('"Portfolio - FFI Main Sector" is still shown in the "Selected" listbox list; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(true).toBeTruthy();
        } else {
          expect(false).customError('"Portfolio - FFI Main Sector" is still shown in the "Selected" listbox list; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 722174', function() {

    it('Should select "Benchmark - FFI Main Sector" from "Selected" section ', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaAssetTypesSearchOrder.xpathSelectedContainer, 'Benchmark - FFI Main Sector').select();

      // Verifying if "Benchmark - FFI Main Sector" from "Available" section is selected
      ThiefHelpers.getListBoxItem(ModifyAccountPaAssetTypesSearchOrder.xpathSelectedContainer, 'Benchmark - FFI Main Sector').isSelected()
        .then(function(bool) {
          if (!bool) {
            expect(false).customError('Benchmark - FFI Main Sector" from "Selected" section is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should click on "Left" arrow button', function() {
      ThiefHelpers.sendElementToAvailableSection(ModifyAccountPaAssetTypesSearchOrder.xpathTransferbox);
    });

    it('Verifying if "Benchmark - FFI Main Sector" is removed from "Selected" section ', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaAssetTypesSearchOrder.xpathSelectedContainer, 'Benchmark - FFI Main Sector')
        .getText().then(function(text) {
        if (text === 'Benchmark - FFI Main Sector') {
          expect(false).customError('"Benchmark - FFI Main Sector" is still shown in the "Selected" listbox list; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(true).toBeTruthy();
        } else {
          expect(false).customError('"Benchmark - FFI Main Sector" is still shown in the "Selected" listbox list; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if only "Client Portfolio - FFI Main Sector" item is present in the selected container', function() {
      ThiefHelpers.getListboxClassReference(ModifyAccountPaAssetTypesSearchOrder.xpathSelectedContainer).getChildrenText().then(function(childern) {
        childern.forEach(function(arrEle) {
          if (arrEle.text !== 'Client Portfolio - FFI Main Sector') {
            expect(false).customError('The selected container does not contains only "Client Portfolio - FFI Main Sector". Found:' + arrEle);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 722156', function() {

    it('Should Click on "Clear All" button in selected section', function() {
      ThiefHelpers.getTransferBoxReference(ModifyAccountPaAssetTypesSearchOrder.xpathTransferbox).target.clear();
    });

    it('Verifying if "Client Portfolio - FFI Main Sector" is removed from "Selected" section ', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaAssetTypesSearchOrder.xpathSelectedContainer, 'Client Portfolio - FFI Main Sector')
        .getText().then(function(text) {
        if (text === 'Client Portfolio - FFI Main Sector') {
          expect(false).customError('"Client Portfolio - FFI Main Sector" is still shown in the "Selected" listbox list; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(true).toBeTruthy();
        } else {
          expect(false).customError('"Client Portfolio - FFI Main Sector" is still shown in the "Selected" listbox list; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 722151', function() {

    it('Should click on "Cancel" button to close the "Modify Account(New)" dailog', function() {
      ThiefHelpers.clickOnButton('Cancel');
    });

  });

});
