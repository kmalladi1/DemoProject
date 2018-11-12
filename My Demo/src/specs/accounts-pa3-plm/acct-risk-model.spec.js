require(__dirname + '/../../index.js');

describe('Test Case: acct-risk-model', function() {

  describe('Test Step ID: 723531', function() {

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

  describe('Test Step ID: 723533', function() {

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

    it('Should expand "Risk" and select "Risk Models" from LHP in "Account(New)" page', function() {
      ThiefHelpers.expandAndGetOptionspaneItem(undefined, 'Risk Models', 'Risk').select();

      //Verifying if "Risk Models" is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Risk Models', 'Risk').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Risk Models" is not selected inside "Risk"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Selected" textbox shows "Axioma Asia-Pacific Fundamental Equity Risk Model MH 2.1"', function() {
      ThiefHelpers.getTextBoxClassReference('Selected', undefined).getText().then(function(value) {
        if (value !== 'Axioma Asia-Pacific Fundamental Equity Risk Model MH 2.1') {
          expect(false).customError('The Selected textbox does not shows "Axioma Asia-Pacific Fundamental Equity Risk Model MH 2.1"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Select Factor Grouping" dropdown is set to "FactSet: Standard"', function() {
      ThiefHelpers.verifySelectedDropDownText('FactSet: Standard', 'Select Factor Grouping', undefined);
    });

    it('Verifying if the metadata section(info box) is loaded with "Axioma Asia-Pacific Fundamental Equity Risk Model MH 2.1"', function() {
      ModifyAccountRiskRiskModels.getValueFromMetadata('Axioma Asia-Pacific Fundamental Equity Risk Model MH 2.1').isPresent().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('The metadata section is not loaded with "Axioma Asia-Pacific Fundamental Equity Risk Model MH 2.1)"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 723541', function() {

    it('Should clear the Selected textbox containing "Axioma Asia-Pacific Fundamental Equity Risk Model MH 2.1"', function() {
      ThiefHelpers.getTextBoxClassReference('Selected', undefined).clearText();
    });

    it('Should enter "Barra" in the Selected textbox', function() {
      ThiefHelpers.getTextBoxClassReference('Selected', undefined).setText('Barra');
      element(by.xpath('//pa-dropdown-select-tree//tf-textbox')).click();

      //Verifying if the Selected textbox is set to "Barra"
      ThiefHelpers.getTextBoxClassReference('Selected', undefined).getText().then(function(text) {
        if (text !== 'Barra') {
          expect(false).customError('The Selected textbox is not set to "Barra"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Barra" tree is in expanded state ', function() {
      ModifyAccountRiskRiskModels.checkIfExpanded('Barra');
    });

  });

  describe('Test Step ID: 723534', function() {

    it('Should select "Barra Brazil Model (BRE2)" from "Barra"', function() {
      ModifyAccountRiskRiskModels.getElementInsideTree('Barra', 'Barra Brazil Model (BRE2)').click();
    });

    it('Verifying if the "Selected" textbox is set to "Barra Brazil Model (BRE2)"', function() {
      ThiefHelpers.getTextBoxClassReference('Selected', undefined).getText().then(function(value) {
        if (value !== 'Barra Brazil Model (BRE2)') {
          expect(false).customError('The Selected textbox is not set to "Barra Brazil Model (BRE2)"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
    it('Verifying if "Select Factor Grouping" dropdown is set to "None"', function() {
      ThiefHelpers.verifySelectedDropDownText('None', 'Select Factor Grouping', undefined);
    });

    it('Verifying if the metadata section(info box) is loaded with "Barra Brazil Model (BRE2)"', function() {
      ModifyAccountRiskRiskModels.getValueFromMetadata('Barra Brazil Model (BRE2)').isPresent().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('The metadata section is not loaded with "Barra Brazil Model (BRE2)"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 723535', function() {

    it('Should click to open "Select Factor Grouping" dropdown', function() {
      ThiefHelpers.getDropDownSelectClassReference('Select Factor Grouping').open();
    });

    var arrDropdownOption = ['None', 'FactSet: Standard'];
    arrDropdownOption.forEach(function(dropdownOption) {
      it('Verifying if the Dropdown contains "' + dropdownOption + '" options', function() {
        ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
          if (options.indexOf(dropdownOption) < 0) {
            expect(false).customError('The dropdown does not contains "' + dropdownOption);
            CommonFunctions.takeScreenShot();
          }

        });
      });
    });
  });

  describe('Test Step ID: 723536', function() {

    it('Should expand "Risk" and select "Universe" from LHP in "Account(New)" page', function() {
      ThiefHelpers.expandAndGetOptionspaneItem(undefined, 'Universe', 'Risk').select();

      //Verifying if "Universe" is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Universe', 'Risk').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Universe" is not selected inside "Risk"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Id typeahed" textbox contains "CLIENT:RUSSELL1000.ACCT"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, ModifyAccountRiskUniverse.xpathIdTypeaheadTextbox).getText().then(function(attr) {
        if (attr !== 'CLIENT:RUSSELL1000.ACCT') {
          expect(false).customError('The "Id typeahead" textbox is not set to "CLIENT:RUSSELL1000.ACCT"');
        }
      });
    });

    var arrTextbox = ['Market Risk Premium (Annual %)', 'Deannualization Factor (Days)'];
    var arrTextboxQAid = ['input-market-risk-premium-annual-percent', 'input-deannual-factor-days'];
    var arrText = ['7', '362'];

    arrTextbox.forEach(function(textbox, index) {

      it('Verifying if "' + textbox + '" textbox contains "' + arrText[index] + '"', function() {
        ThiefHelpers.getTextBoxClassReference(arrTextboxQAid[index]).getText().then(function(attr) {
          if (attr !== arrText[index]) {
            expect(false).customError('The "' + textbox + '" textbox is not set to "' + arrText[index] + '"');
          }
        });
      });
    });

    it('Verifying if "On Append Error" dropdown is set to "Ignore Append Data"', function() {
      ThiefHelpers.verifySelectedDropDownText('Ignore Append Data', 'On Append Error', undefined);
    });

    it('Verifying if the Risk Model column contains "APT Asia Pacific Ex-Japan Local (USD)"', function() {
      ModifyAccountRiskUniverse.getColumnIndex('Risk Model').then(function(colIndex) {
        ModifyAccountRiskUniverse.getCellValue('0', colIndex).then(function(value) {
          if (value !== 'APT Asia Pacific Ex-Japan Local (USD)') {
            expect(false).customError('The slickgrid column "Risk Model" does not displayed "APT Asia Pacific Ex-Japan Local (USD)".' +
              ' "Known Issue https://factset.atlassian.net/browse/PLM-1958"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 723537', function() {

    it('Should click on "x" icon in  the Risk Model column contains "APT Asia Pacific Ex-Japan Local (USD)"', function() {
      ModifyAccountRiskUniverse.getColumnIndex('Risk Model').then(function(colIndex) {
        ModifyAccountRiskUniverse.getCrossIconFromSlickgrid(0, colIndex).click();

      });
    });

    it('Verifying if "APT Asia Pacific Ex-Japan Local (USD)" is removed from the Risk Model column', function() {
      ModifyAccountRiskUniverse.getColumnIndex('Risk Model').then(function(colIndex) {
        ModifyAccountRiskUniverse.getCellValue('0', colIndex).then(function(value) {
          if (value !== '') {
            expect(false).customError('The slickgrid column "Risk Model" does not displayed "APT Asia Pacific Ex-Japan Local (USD)".' +
              ' "Known Issue https://factset.atlassian.net/browse/PLM-1958"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 723539', function() {

    it('Should click twice on "Up" arrow for "Deannualization Factor (Days)" field ', function() {
      var xpath = CommonFunctions.replaceStringInXpath(ModifyAccountRiskUniverse.xpathNumberInput, 'deannual-factor-days');
      for (var i = 0; i < 2; i++) {
        ThiefHelpers.getNumberInputClassReference(xpath).increment();
      }
    });

    it('Verifying if the input box "Deannualization Factor (Days)" is set to "364" ', function() {
      ThiefHelpers.getTextBoxClassReference('input-deannual-factor-days').getText().then(function(text) {
        if (text !== '364') {
          expect(false).customError('The input box "Deannualization Factor (Days)" is not set to "364"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 723538', function() {

    it('Should click on "Down" arrow for "Market Risk Premium (Annual %)" field ', function() {
      var xpath = CommonFunctions.replaceStringInXpath(ModifyAccountRiskUniverse.xpathNumberInput, 'market-risk-premium-annual-percent');
      ThiefHelpers.getNumberInputClassReference(xpath).decrement();
    });

    it('Verifying if the input box "Market Risk Premium (Annual %)" is set to "6" ', function() {
      ThiefHelpers.getTextBoxClassReference('input-market-risk-premium-annual-percent').getText().then(function(text) {
        if (text !== '6') {
          expect(false).customError('The input box "Market Risk Premium (Annual %)" is not set to "6"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 723532', function() {

    it('Should clear "CLIENT:RUSSELL1000.ACCT" from "Id typeahed" textbox and enter "SP" ', function() {
      element(by.xpath(ModifyAccountRiskUniverse.xpathIdTypeaheadTextbox + '//input')).clear();
      element(by.xpath(ModifyAccountRiskUniverse.xpathIdTypeaheadTextbox + '//input')).sendKeys('SP');
    });

    it('Verifying if "Id typeahed" textbox contains "SP"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, ModifyAccountRiskUniverse.xpathIdTypeaheadTextbox).getText().then(function(attr) {
        if (attr !== 'SP') {
          expect(false).customError('The "Id typeahead" textbox is not set to "SP"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrList = [];
    it('Should read all the values from the filtered listbox', function() {
      element.all(by.xpath('//id-typeahead-results//filter-listbox-item')).each(function(ref) {
        ref.getText().then(function(name) {
          arrList.push(name);
        });
      });
    });

    var arrIndex = ['0', '1'];
    arrIndex.forEach(function(item, index) {
      it('Verifying if filtered listbox dropdown displayes the results related to "SP" for first 2 item ', function() {
        if (arrList[index].indexOf('SP') < 0) {
          expect(false).customError('The "Id typeahead" textbox is not set to "SP"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 723544', function() {

    it('Should click on "Index" filter in the dropdown filter listbox ', function() {
      ModifyAccountRiskUniverse.getFilterListboxFilers('Index').click();
    });

    it('Should click to select "S&P 500 SP50" from filter listbox ', function() {
      ModifyAccountRiskUniverse.getFilterListboxItem('S&P 500 SP50').click();
    });

    it('Verifying if "Id typeahed" textbox contains "BENCH:SP50"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, ModifyAccountRiskUniverse.xpathIdTypeaheadTextbox).getText().then(function(attr) {
        if (attr !== 'BENCH:SP50') {
          expect(false).customError('The "Id typeahead" textbox is not set to "BENCH:SP50"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 723549', function() {

    it('Should click on "Cancel" button to close the "Modify Account(New)" dailog', function() {
      ThiefHelpers.clickOnButton('Cancel');
    });

  });

});
