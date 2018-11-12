require(__dirname + '/../../index.js');

describe('Test Case: acct-prices-grp', function() {

  describe('Test Step ID: 721444', function() {

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

  describe('Test Step ID: 721445', function() {

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

    it('Should expand "PA|Prices" and select "Portfolio" from LHP in "Modify Account(New)" page', function() {
      ThiefHelpers.expandAndGetOptionspaneItem(undefined, 'Portfolio', 'PA|Prices').select();

      //Verifying if "Portfolio" is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Portfolio', 'PA|Prices').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Portfolio" is not selected inside "PA|Prices"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should clear and enter "Equity" in the "Prices-Available" search box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, ModifyAccountPaPricesPortfolio.getSearchField('Prices')).setText('Equity');

      // Verifying if "Prices" search field is set to "Equity"
      ThiefHelpers.getTextBoxClassReference(undefined, ModifyAccountPaPricesPortfolio.getSearchField('Prices')).getText().then(function(text) {
        if (text !== 'Equity') {
          expect(false).customError('"Prices" search field is not set to "Equity"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "FactSet - Equity - Bid" from "Prices-Available" section ', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaPricesPortfolio.xpathPricesAvailableContainer, 'FactSet - Equity - Bid', 'Equity|FactSet').select();

      // Verifying if "FactSet - Equity - Bid" from "Prices-Available" section is selected
      ThiefHelpers.getListBoxItem(ModifyAccountPaPricesPortfolio.xpathPricesAvailableContainer, 'FactSet - Equity - Bid', 'Equity|FactSet').isSelected()
        .then(function(bool) {
          if (!bool) {
            expect(false).customError('FactSet - Equity - Bid" from "Prices-Available" section is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should click on "Right" arrow button from "Prices" section', function() {
      ThiefHelpers.sendElementToSelectedSection(ModifyAccountPaPricesPortfolio.xpathPricesSections);
    });

    var arrPricesSelectedItem = ['FactSet - Options - Bid', 'FactSet - Equity', 'MSCI - US Tax Exempt', 'MSCI - Net', 'FactSet - Equity - Bid'];

    arrPricesSelectedItem.forEach(function(item) {
      it('Verifying if "' + item + '" is displayed in "Prices Selected" section ', function() {
        ThiefHelpers.getListBoxItem(ModifyAccountPaPricesPortfolio.xpathPricesSelectedContainer, item)
          .getText().then(function(text) {
          if (text !== item) {
            expect(false).customError('"' + item + '" is not shown in the "Prices Selected" listbox list; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + item + '" is not found in the "Prices Selected" listbox list');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Use Portfolio Pricing Sources for Benchmark" checkbox is checked under "Prices" section', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Portfolio Pricing Sources for Benchmark').isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Use Portfolio Pricing Sources for Benchmark" checkbox is unchecked' +
            'under "Prices" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrPricesSelectedItems = ['FactSet - Options - Bid','FactSet - Equity', 'MSCI - US Tax Exempt', 'MSCI - Net',  'FactSet - Equity - Bid'];

    it('Verifying if Prices "selected contains" contains all the items at expected order', function() {
      ThiefHelpers.getListboxClassReference(ModifyAccountPaPricesPortfolio.xpathPricesSelectedContainer).getChildrenText().then(function(childern) {
        childern.forEach(function(arrEle, index) {
          if (arrEle.text !== arrPricesSelectedItems[index]) {
            expect(false).customError(arrPricesSelectedItems[index] + ' is not found at index "' + index + '". Found: ' + arrEle);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var arrExchangeratesSelectedContainer = ['MSCI', 'FTSE', 'TTM', 'FactSet'];
    it('Verifying if Exchange Rates "selected contains" contains all the items at expected order', function() {
      ThiefHelpers.getListboxClassReference(ModifyAccountPaPricesPortfolio.xpathExchangeRatesSelectedContainer).getChildrenText().then(function(child) {
        child.forEach(function(arrEle, index) {
          if (arrEle.text !== arrExchangeratesSelectedContainer[index]) {
            expect(false).customError(arrExchangeratesSelectedContainer[index] + ' is not found at index "' + index + '". Found: ' + arrEle);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 721446', function() {

    it('Should select "FactSet - Options - Bid" "Prices Selected" section ', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaPricesPortfolio.xpathPricesSelectedContainer, 'FactSet - Options - Bid').select();
    });

    it('Should Click on "down" button in selected section', function() {
      ThiefHelpers.getTransferBoxReference(ModifyAccountPaPricesPortfolio.xpathPricesSections).target.down();
    });

    it('Should select "MSCI - Net" "Prices Selected" section ', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaPricesPortfolio.xpathPricesSelectedContainer, 'MSCI - Net').select();
    });

    it('Should Click on "up" button in selected section', function() {
      ThiefHelpers.getTransferBoxReference(ModifyAccountPaPricesPortfolio.xpathPricesSections).target.up();
      browser.sleep(2000);
    });

    var arrExpectedList = ['FactSet - Equity', 'FactSet - Options - Bid', 'MSCI - Net', 'MSCI - US Tax Exempt', 'FactSet - Equity - Bid'];

    var arrList = [];
    it('Should read all the Prices "selected container" selected list items', function() {
      ModifyAccountPaPricesPortfolio.getAllListElements('Prices', 'Selected').each(function(ref) {
        ref.getText().then(function(text) {
          arrList.push(text);
        });
      });
    });

    arrExpectedList.forEach(function(item,index) {
      it('Verifying if the "Prices" "Selected" list contains "' + item + '" at index "' + index + '"', function() {
        if (item !== arrList[index]) {
          expect(false).customError('The "Selected" list does not contains "' + item + '" at index "' + index + '", Found:  ' + arrList[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "TTM" "Prices Selected" section ', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaPricesPortfolio.xpathExchangeRatesSelectedContainer, 'TTM').select();
    });

    it('Should Click on "down" button in selected section', function() {
      ThiefHelpers.getTransferBoxReference(ModifyAccountPaPricesPortfolio.xpathExchangeRatesSections).target.down();
    });

    it('Should select "FTSE" "Prices Selected" section ', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaPricesPortfolio.xpathExchangeRatesSelectedContainer, 'FTSE').select();
    });

    it('Should Click on "up" button in selected section', function() {
      ThiefHelpers.getTransferBoxReference(ModifyAccountPaPricesPortfolio.xpathExchangeRatesSections).target.up();
    });

    var arrExchangeratesSelectedItem = ['FTSE', 'MSCI', 'FactSet', 'TTM'];

    var arrListExchsnge = [];
    it('Should read all the Exchange Rates "selected" container items', function() {
      ModifyAccountPaPricesPortfolio.getAllListElements('Exchange Rates', 'Selected').each(function(ref) {
        ref.getText().then(function(text) {
          arrListExchsnge.push(text);
        });
      });
    });

    arrExchangeratesSelectedItem.forEach(function(item,index) {
      it('Verifying if the "Exchange" "Selected" list contains "' + item + '" at index "' + index + '"', function() {
        if (item !== arrListExchsnge[index]) {
          expect(false).customError('The "Selected" list does not contains "' + item + '" at index "' + index + '", Found:  ' + arrListExchsnge[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 721454', function() {

    it('Should expand "PA|Prices" and select "Benchmark" from LHP in "Modify Account(New)" page', function() {
      ThiefHelpers.expandAndGetOptionspaneItem(undefined, 'Benchmark', 'PA|Prices').select();

      //Verifying if "Benchmark" is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Benchmark', 'PA|Prices').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Benchmark" is not selected inside "PA|Prices"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should uncheck "Use Portfolio Pricing Sources for Benchmark" checkbox under "Prices" section', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Portfolio Pricing Sources for Benchmark').uncheck();

      // Verifying if "Use Portfolio Pricing Sources for Benchmark" checkbox is unchecked
      ThiefHelpers.getCheckBoxClassReference('Use Portfolio Pricing Sources for Benchmark').isChecked().then(function(boolean) {
        if (boolean) {
          expect(false).customError('"Use Portfolio Pricing Sources for Benchmark" checkbox is checked off ' +
            'under "Prices" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should clear and enter "MSL" in the "Prices -Available" search box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, ModifyAccountPaPricesBenchmark.getSearchField('Prices')).setText('MSL');

      // Verifying if "Prices" search field is set to "MSL"
      ThiefHelpers.getTextBoxClassReference(undefined, ModifyAccountPaPricesBenchmark.getSearchField('Prices')).getText().then(function(text) {
        if (text !== 'MSL') {
          expect(false).customError('"Prices" search field is not set to "MSL"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "MSL_AXR" from "Prices-Available" section ', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaPricesBenchmark.xpathPricesAvailableContainer, 'MSL_AXR', 'Additional Security Masters').select();

      // Verifying if "MSL_AXR" from "Prices-Available" section is selected
      ThiefHelpers.getListBoxItem(ModifyAccountPaPricesBenchmark.xpathPricesAvailableContainer, 'MSL_AXR', 'Additional Security Masters').isSelected()
        .then(function(bool) {
          if (!bool) {
            expect(false).customError('MSL_AXR" from "Prices-Available" section is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should click on "Right" arrow button from "Prices" section', function() {
      ThiefHelpers.sendElementToSelectedSection(ModifyAccountPaPricesBenchmark.xpathPricesSections);
    });

    var arrPricesSelectedList = ['FactSet - Equity', 'MSCI - Net', 'ChinaBond Fixed Income', 'ICE BofAML', 'MSL_AXR'];
    it('Verifying if Prices "selected contains" contains all the items at expected order', function() {
      ThiefHelpers.getListboxClassReference(ModifyAccountPaPricesBenchmark.xpathPricesSelectedContainer).getChildrenText().then(function(childern) {
        childern.forEach(function(arrEle, index) {
          if (arrEle.text !== arrPricesSelectedList[index]) {
            expect(false).customError(arrPricesSelectedList[index] + ' is not found at index "' + index + '". Found: ' + arrEle);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var arrExchangeSelectedList = ['FactSet', 'MSCI'];
    it('Verifying if Exchange "selected contains" contains all the items at expected order', function() {
      ThiefHelpers.getListboxClassReference(ModifyAccountPaPricesBenchmark.xpathExchangeRatesSelectedContainer).getChildrenText().then(function(childern) {
        childern.forEach(function(arrEle, index) {
          if (arrEle.text !== arrExchangeSelectedList[index]) {
            expect(false).customError(arrExchangeSelectedList[index] + ' is not found at index "' + index + '". Found: ' + arrEle);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 721455', function() {

    it('Should select "FactSet - Equity" from "Prices-Available" section ', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaPricesBenchmark.xpathPricesSelectedContainer, 'FactSet - Equity').select();
    });

    it('Should hold "CTRL" key and select "MSCI - Net" from "Prices-Available" section ', function() {
      //pressing "CTRL" key
      browser.actions().sendKeys(protractor.Key.CONTROL).perform();
      ThiefHelpers.getListBoxItem(ModifyAccountPaPricesBenchmark.xpathPricesSelectedContainer, 'MSCI - Net').select();

      //Releasing CTRL key
      browser.actions().sendKeys(protractor.Key.CONTROL).perform();
    });

    it('Should Click on "down" button in selected section', function() {
      ThiefHelpers.getTransferBoxReference(ModifyAccountPaPricesBenchmark.xpathPricesSections).target.down();
    });

    var arrExpectedList = ['ChinaBond Fixed Income', 'FactSet - Equity', 'MSCI - Net', 'ICE BofAML', 'MSL_AXR'];

    var arrList = [];
    it('Should read  all the Prices "selected contaier" list items', function() {
      ModifyAccountPaPricesBenchmark.getAllListElements('Prices', 'Selected').each(function(ref) {
        ref.getText().then(function(text) {
          arrList.push(text);
        });
      });
    });

    arrExpectedList.forEach(function(item,index) {
      it('Verifying if the "Prices" "Selected" list contains "' + item + '" at index "' + index + '"', function() {
        if (item !== arrList[index]) {
          expect(false).customError('The "Selected" list does not contains "' + item + '" at index "' + index + '", Found:  ' + arrList[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "MSCI" from "Exchange Rates selected" section ', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaPricesBenchmark.xpathExchangeRatesSelectedContainer, 'MSCI').select();

      // Verifying if "MSCI" from "Exchange Rates selected" section is selected
      ThiefHelpers.getListBoxItem(ModifyAccountPaPricesBenchmark.xpathExchangeRatesSelectedContainer, 'MSCI').isSelected()
        .then(function(bool) {
          if (!bool) {
            expect(false).customError('MSCI" from "Exchange Rates selected" section is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should click on "Left" arrow button from "Exchange Rates" section', function() {
      ThiefHelpers.sendElementToAvailableSection(ModifyAccountPaPricesBenchmark.xpathExchangeRatesSections);
    });

    it('Verifying if Exchange Rates "selected container" now contains only "FactSet"', function() {
      ThiefHelpers.getListboxClassReference(ModifyAccountPaPricesBenchmark.xpathExchangeRatesSelectedContainer).getChildrenText().then(function(childern) {
        childern.forEach(function(arrEle) {
          if (arrEle.text !== 'FactSet') {
            expect(false).customError('Exchange Rates "selected container" not contains contains only "FactSet". Found:' + arrEle.text);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 721457', function() {

    it('Should check "Use Price Sources" checkbox under the "Exchange Rates" section', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Price Sources').check();

      // Verifying if "Use Price Source" checkbox is checked off
      ThiefHelpers.getCheckBoxClassReference('Use Price Sources').isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Use Price Source" checkbox" checkbox is not checked' +
            ' under the "Exchange Rates" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Exchange Rates" selected and available section is disable/grayed now', function() {
      element(by.xpath(ModifyAccountPaPricesBenchmark.xpathExchangeRatesSections)).getAttribute('class').then(function(attr) {
        if (attr.indexOf('disabled') < 0) {
          expect(false).customError('The "Exchange Rates" selected and available section is not disabled/grayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 721458', function() {

    it('Should uncheck "Use Price Sources" checkbox under the "Exchange Rates" section', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Price Sources').uncheck();

      // Verifying if "Use Price Source" checkbox is unchecked
      ThiefHelpers.getCheckBoxClassReference('Use Price Sources').isChecked().then(function(boolean) {
        if (boolean) {
          expect(false).customError('"Use Price Source" checkbox" checkbox is not unchecked' +
            ' under the "Exchange Rates" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should clear and enter "Fixed" in the search box of "Exchange Rates"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, ModifyAccountPaPricesPortfolio.getSearchField('Exchange Rates')).setText('Fixed');

      // Verifying if "Exchange Rates" search field is set to "Fixed"
      ThiefHelpers.getTextBoxClassReference(undefined, ModifyAccountPaPricesPortfolio.getSearchField('Exchange Rates')).getText().then(function(text) {
        if (text !== 'Fixed') {
          expect(false).customError('"Exchange Rates" search field is not set to "Fixed"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "HSBC Fixed Income" from "Exchange Rates-Available" section ', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaPricesBenchmark.xpathExchangeRatesAvailableContainer, 'HSBC Fixed Income').select();

      // Verifying if "HSBC Fixed Income" from "Exchange Rates-Available" section is selected
      ThiefHelpers.getListBoxItem(ModifyAccountPaPricesBenchmark.xpathExchangeRatesAvailableContainer, 'HSBC Fixed Income').isSelected()
        .then(function(bool) {
          if (!bool) {
            expect(false).customError('HSBC Fixed Income" from "Exchange Rates-Available" section is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should click on "Right" arrow button from "Prices" section', function() {
      ThiefHelpers.sendElementToSelectedSection(ModifyAccountPaPricesBenchmark.xpathExchangeRatesSections);
    });

    it('Should select "HSBC Fixed Income" from "Exchange Rates-Selected" section ', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaPricesBenchmark.xpathExchangeRatesSelectedContainer, 'HSBC Fixed Income').select();

      // Verifying if "HSBC Fixed Income" from "Exchange Rates-Selected" section is selected
      ThiefHelpers.getListBoxItem(ModifyAccountPaPricesBenchmark.xpathExchangeRatesSelectedContainer, 'HSBC Fixed Income').isSelected()
        .then(function(bool) {
          if (!bool) {
            expect(false).customError('HSBC Fixed Income" from "Exchange Rates-Selected" section is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should Click on "up" button in selected section', function() {
      ThiefHelpers.getTransferBoxReference(ModifyAccountPaPricesBenchmark.xpathExchangeRatesSections).target.up();
      browser.sleep(2000);
    });

    var arrList = [];
    it('Sould read all the Exchange Rates "selected container" selected list items', function() {
      ModifyAccountPaPricesBenchmark.getAllListElements('Exchange Rates', 'Selected').each(function(ref) {
        ref.getText().then(function(text) {
          arrList.push(text);
        });
      });
    });

    var arrExpectedList = ['HSBC Fixed Income', 'FactSet'];
    arrExpectedList.forEach(function(item,index) {
      it('Verifying if the "Exchange Rates" "Selected" list contains "' + item + '" at index "' + index + '"', function() {
        if (item !== arrList[index]) {
          expect(false).customError('The Exchange Rates "Selected" list does not contains "' + item + '" at index "' + index + '", Found:  ' + arrList[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 722052', function() {

    it('Should Click on "Clear All" button in selected section', function() {
      ThiefHelpers.getTransferBoxReference(ModifyAccountPaPricesBenchmark.xpathExchangeRatesSections).target.clear();
      browser.sleep(2000);
    });

    it('Verifying if Exchange Rates "selected container" is now empty', function() {
      ThiefHelpers.getListboxClassReference(ModifyAccountPaPricesBenchmark.xpathExchangeRatesSelectedContainer).getChildrenText().then(function(child) {
        child.forEach(function(arrEle) {
          if (arrEle.length !== 0) {
            expect(false).customError('Exchange Rates "selected container" is now empty. Found: ' + arrEle.length);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 722145', function() {

    it('Should expand "PA|Prices" and select "Advanced" from LHP in "Modify Account(New)" dialog', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Advanced', 'PA|Prices').select();

      //Verifying if "Advanced" is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Advanced', 'PA|Prices').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Advanced" is not selected inside "PA" group');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should clear and enter "4" in the Days textbox beside "Map Thai Alien to Parent After" checkbox', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, ModifyAccountPaPricesAdvanced.xpathTextboxThaiAlien).setText('4');

      //Verifying if the "Days" textbox is set to "4"
      ThiefHelpers.getTextBoxClassReference(undefined, ModifyAccountPaPricesAdvanced.xpathTextboxThaiAlien).getText().then(function(text) {
        if (text !== '4') {
          expect(false).customError('The "Days" textbox  beside "Map Thai Alien to Parent After" checkbox is not set to "4"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check the "Fall back on OMS Data" checkbox ', function() {
      ThiefHelpers.getCheckBoxClassReference('Fall back on OMS Data').check();
    });

    it('Verifying if the "Fall back on OMS Data" checkbox is checked', function() {
      ThiefHelpers.getCheckBoxClassReference('Fall back on OMS Data').isChecked().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Fall back on OMS Data" checkbox is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "MSCI" from "portfolio Split Source" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('MSCI', 'Portfolio Split Source');
    });

    it('Verifying if "portfolio Split Source" drop down is set to "MSCI"', function() {
      ThiefHelpers.verifySelectedDropDownText('MSCI', 'Portfolio Split Source');
    });

  });

  describe('Test Step ID: 721488', function() {

    it('Should expand "PA" and select "Groupings" from LHP in "Modify Account(New)" dialog', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Groupings', 'PA').select();

      //Verifying if "Groupings" is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Groupings', 'PA').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Groupings" is not selected inside "PA" group');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Asset Class" from "Available" section ', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountNewPaGroupings.xpathAvailableContainer, 'Asset Class', 'FactSet').select();

      // Verifying if "Asset Class" from "Available" section is selected
      ThiefHelpers.getListBoxItem(ModifyAccountNewPaGroupings.xpathAvailableContainer, 'Asset Class', 'FactSet').isSelected()
        .then(function(bool) {
          if (!bool) {
            expect(false).customError('Asset Class" from "Available" section is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should click on info(i) icon beside Asset class list item', function() {
      browser.ignoreSynchronization = false;
      ModifyAccountNewPaGroupings.getIconFromList('Basic', 'Available', 'Asset Class', 'FactSet').click();
    });

    it('Waiting for spinner icon to disappeared', function() {
      CommonFunctions.waitUntilElementDisappears(ModifyAccountNewPaGroupings.getInfoboxLoadingIcon(), 60000);
    });

    var arrTab = ['Description', 'Formula'];

    arrTab.forEach(function(tab) {

      it('Should select "' + tab + '" Tab', function() {
        browser.ignoreSynchronization = true;
        ThiefHelpers.getTabsClassReference().selectTabByText(tab);

        // Verifying if selected tab is "'+tab+'"
        ThiefHelpers.getTabsClassReference().getSelectedTabText().then(function(tabName) {
          if (tabName !== tab) {
            expect(false).customError('"' + tab + '" tab is not selected.');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Verifying if "Asset Class" is displayed in the content area', function() {
        element(by.xpath('//tf-tab-content//*[contains(@class,"header")]')).getText().then(function(text) {
          if (text !== 'Asset Class') {
            expect(false).customError('"Asset Class" is not displayed in the content area.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 722221', function() {

    it('Should clear and enter "Bloomberg" in the search box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, ModifyAccountNewPaGroupings.getSearchField()).setText('Bloomberg');

      // Verifying if search field is set to "Bloomberg"
      ThiefHelpers.getTextBoxClassReference(undefined, ModifyAccountNewPaGroupings.getSearchField()).getText().then(function(text) {
        if (text !== 'Bloomberg') {
          expect(false).customError('The search field is not set to "Bloomberg"');
          CommonFunctions.takeScreenShot();
        }
      });
      browser.sleep(1000);
    });

    it('Should select "Country" under "FactSet|Country & Region|Bloomberg Barclays" from "Available" section ', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountNewPaGroupings.xpathAvailableContainer, 'Country', 'FactSet|Country & Region|Bloomberg Barclays').select();

      // Verifying if "Country" under "FactSet|Country & Region|Bloomberg Barclays" from "Available" section is selected
      ThiefHelpers.getListBoxItem(ModifyAccountNewPaGroupings.xpathAvailableContainer, 'Country', 'FactSet|' +
        'Country & Region|Bloomberg Barclays').isSelected()
        .then(function(bool) {
          if (!bool) {
            expect(false).customError('Country" under "FactSet|Country & Region|Bloomberg Barclays" from "Available" section is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should click on "Right" arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Should select "Country - Bloomberg Barclays" from "Selected" section ', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountNewPaGroupings.xpathSelectedContainer, 'Country - Bloomberg Barclays').select();

      // Verifying if "Country - Bloomberg Barclays" from "Selected" section is selected
      ThiefHelpers.getListBoxItem(ModifyAccountNewPaGroupings.xpathSelectedContainer, 'Country - Bloomberg Barclays').isSelected()
        .then(function(bool) {
          if (!bool) {
            expect(false).customError('"Country - Bloomberg Barclays" from "Selected" section is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should expand the section "Definition:"', function() {
      ModifyAccountNewPaGroupings.expandSectionInOptionsPane('Definition').then(function(expended) {
        if (!expended) {
          expect(false).customError('"Definition:" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Daily" from "Frequency" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Daily', 'Frequency');
    });

    it('Verifying if "Frequency" drop down is set to "Daily"', function() {
      ThiefHelpers.verifySelectedDropDownText('Daily', 'Frequency');
    });

    it('Should expand "Group Separately" section', function() {
      ModifyAccountNewPaGroupings.expandSectionInOptionsPane('Group Separately').then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Group Separately" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for "Group Separately"" section to expand', function() {
      browser.wait(function() {
        return ThiefHelpers.getCheckBoxClassReference('Cash Offset').getElement().isDisplayed().then(function(found) {
          return found;
        }, function() {
          return false;
        });
      }, 5000, '"Group Separately"" section was not Expanded').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should check off "Cash Offset" checkbox in "Group Separately" section', function() {
      ThiefHelpers.getCheckBoxClassReference('Cash Offset').check();
    });

    it('Verifying if the "Cash Offset" checkbox is checked in "Group Separately" section', function() {
      ThiefHelpers.getCheckBoxClassReference('Cash Offset').isChecked().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Cash Offset" checkbox is not checked in "Group Separately" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Additional Options" section', function() {
      ModifyAccountNewPaGroupings.expandSectionInOptionsPane('Additional Options').then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Additional Options" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for "Additional Options" section to expand', function() {
      browser.wait(function() {
        return ThiefHelpers.getCheckBoxClassReference('Group Relative').getElement().isDisplayed().then(function(found) {
          return found;
        }, function() {
          return false;
        });
      }, 5000, '"Additional Options" section was not Expanded').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should check off "Group Relative" checkbox in "Additional Options" section', function() {
      ThiefHelpers.getCheckBoxClassReference('Group Relative').check();
    });

    it('Verifying if "Group Relative" checkbox in "Additional Options" section is checked', function() {
      ThiefHelpers.getCheckBoxClassReference('Group Relative').isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Group Relative" checkbox in "Additional Options" section is not checked');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    var arrExpectedList = ['Asset Class','Asset Type','High/Low', 'Security Name', 'Country - Bloomberg Barclays'];

    it('Verifying if the Selected section in Groupings shows the expected list Items ', function() {
      ThiefHelpers.getListboxClassReference(ModifyAccountNewPaGroupings.xpathSelectedContainer).getChildrenText().then(function(childern) {
        childern.forEach(function(arrEle, index) {
          if (arrEle.text !== arrExpectedList[index]) {
            expect(false).customError(arrExpectedList[index] + ' is not found at index "' + index + '". Found: ' + arrEle);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Country - Bloomberg Barclays" from "Selected" section is selected', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountNewPaGroupings.xpathSelectedContainer, 'Country - Bloomberg Barclays').isSelected()
        .then(function(bool) {
          if (!bool) {
            expect(false).customError('"Country - Bloomberg Barclays" from "Selected" section is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
    });

  });

  describe('Test Step ID: 722222', function() {

    it('Should click to select "Asset Class" item in the selected section', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountNewPaGroupings.xpathSelectedContainer, 'Asset Class').select();
    });

    it('Should click on "Cog Wheel" icon in "Asset Class" item in the selected section', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountNewPaGroupings.xpathSelectedContainer, 'Asset Class').getActions().then(function(actions) {
        actions.triggerAction('configure');
      });
    });

    it('Should select "Matrix" radio button in the panel', function() {
      ThiefHelpers.getRadioClassReference('Matrix').select();
    });

    it('Should click on "OK" button in the panel', function() {
      ThiefHelpers.getButtonClassReference('OK').press();
    });

    it('Verifying if "Matrix Asset Class" is present in "Selected" section', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountNewPaGroupings.xpathSelectedContainer, 'Matrix Asset Class').getText().then(function(text) {
        if (text !== 'Matrix Asset Class') {
          expect(false).customError('"Matrix Asset Class" is not present in the "selected" listbox list; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"Matrix Asset Class" is not found in the "selected" listbox list');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 721450', function() {

    it('Should click on "Cancel" button to close the "Modify Modify Account(New)" dailog', function() {
      ThiefHelpers.clickOnButton('Cancel');
    });

  });

});
