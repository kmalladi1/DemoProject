'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: accounts-overrides', function() {

  describe('Test Step ID: 548057', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:/Pa3/Accounts/Acct_Override_Doc" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('acct-override-doc');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');
  });

  describe('Test Step ID: 548058', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Portfolio', 'Prices', 'document options');

    it('Verifying if "Use Portfolio Pricing Sources for Benchmark" checkbox is not checked under "Prices" section', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Portfolio Pricing Sources for Benchmark').isChecked().then(function(boolean) {
        if (boolean) {
          expect(false).customError('"Use Portfolio Pricing Sources for Benchmark" checkbox is checked' +
            'under "Prices" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Russell - U.S." is shown in the "Selected" container of "PRICES" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'Russell - U.S.').getText().then(function(text) {
        if (text !== 'Russell - U.S.') {
          expect(false).customError('"Russell - U.S." is not shown in the "Selected" container of "PRICES" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"Russell - U.S." is not found in the "Selected" container of "PRICES" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Use Price Sources" checkbox in "EXCHANGE RATES" section is not selected', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Price Sources').isChecked().then(function(boolean) {
        if (boolean) {
          expect(false).customError('"Use Price Sources" checkbox is checked off under "Prices" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "FTSE" is shown in the "Selected" container of "EXCHANGE RATES" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathExchangeRatesSelectedContainer, 'FTSE').getText().then(function(text) {
        if (text !== 'FTSE') {
          expect(false).customError('"FTSE" is not shown in the "Selected" container of "EXCHANGE RATES" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"FTSE" is not found in the "Selected" container of "EXCHANGE RATES" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 548059', function() {

    it('Should click on the "Benchmark" tab from "Prices" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Benchmark', 'Prices').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Benchmark', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Benchmark" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Russell - U.S." is shown in the "Selected" container of "PRICES" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesBenchmark.xpathPricesSelectedContainer, 'Russell - U.S.').getText().then(function(text) {
        if (text !== 'Russell - U.S.') {
          expect(false).customError('"Russell - U.S." is not shown in the "Selected" container of "PRICES" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.indexOf('No direct child') > 0) {
          expect(false).customError('"Russell - U.S." is not found in the "Selected" container of "PRICES" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Use Price Sources" checkbox in "EXCHANGE RATES" section is not selected', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Price Sources').isChecked().then(function(boolean) {
        if (boolean) {
          expect(false).customError('"Use Price Sources" checkbox is checked off under "Prices" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "FTSE" is shown in the "Selected" container of "EXCHANGE RATES" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesBenchmark.xpathExchangeRatesSelectedContainer, 'FTSE').getText().then(function(text) {
        if (text !== 'FTSE') {
          expect(false).customError('"FTSE" is not shown in the "Selected" container of "EXCHANGE RATES" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"FTSE" is not found in the "Selected" container of "EXCHANGE RATES" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 548060', function() {

    it('Should click on the "Advanced" tab from "Prices" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Advanced', 'Prices').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Advanced', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Advanced" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Calculate Returns with Missing Accrued Interest" checkbox is selected', function() {
      expect(Utilities.isCheckboxSelected(DocumentOptionsPricesAdvanced.getCheckbox('Calculate Returns with Missing Accrued Interest'))).toBeTruthy();
    });

    it('Verifying that "Portfolio Split Source" drop down has "FTSE Global" selected by default', function() {
      ThiefHelpers.verifySelectedDropDownText('FTSE Global', 'Portfolio Split Source', DocumentOptionsPricesAdvanced.xpathOfPortfolioSplitSourceDropDownButton);
    });

    it('Verifying that "Currency" drop down has "Euro" selected by default', function() {
      ThiefHelpers.verifySelectedDropDownText('Euro', undefined, DocumentOptionsPricesAdvanced.xpathOfCurrencyDropDown);
    });

  });

  describe('Test Step ID: 548061', function() {

    it('Should click on the "Analytics Sources" tab from "Fixed Income" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Analytics Sources', 'Fixed Income').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Analytics Sources', 'Fixed Income').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Analytics Sources" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Use Portfolio Analytics Sources for Benchmark" checkbox is selected', function() {
      expect(Utilities.isCheckboxSelected(DocumentOptionsFixedIncomeAnalyticsSource.getCheckBox('Use Portfolio Analytics Sources for Benchmark'))).toBeTruthy();
    });

    it('Verifying that "PORTFOLIO" section\'s "Selected" container is displaying "Client Portfolio"', function() {
      var xpathSelectedContainer = CommonFunctions.replaceStringInXpath(DocumentOptionsFixedIncomeAnalyticsSource.xpathPortfolioAvailableOrSelectedSection, 'Selected');
      ThiefHelpers.expandAndGetListBoxItem(xpathSelectedContainer, 'Client Portfolio').getText().then(function(text) {
        if (text !== 'Client Portfolio') {
          expect(false).customError('"Client Portfolio" is not shown in the "Selected" container of "PORTFOLIO\'S" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"Client Portfolio" is not found in the "Selected" container of "PORTFOLIO\'S" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "BENCHMARK" section is disabled', function() {
      expect(DocumentOptionsFixedIncomeAnalyticsSource.getBenchmarkSection().getAttribute('disabled')).not.toBeNull();
    });
  });

  describe('Test Step ID: 548062', function() {

    it('Should click on the "Databases" tab from LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Databases').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Databases').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Databases" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "FUNDAMENTAL" section\'s "Selected" container displays "NRI"', function() {
      expect(DocumentOptionsDatabases.getElement('NRI', 'FUNDAMENTAL', 'Selected').isDisplayed()).toBeTruthy();
    });

    it('Verifying that "FUNDAMENTAL" section\'s "Selected" container displays "Worldscope"', function() {
      expect(DocumentOptionsDatabases.getElement('Worldscope', 'FUNDAMENTAL', 'Selected').isDisplayed()).toBeTruthy();
    });

    it('Verifying that "ESTIMATES" section\'s "Selected" container displays "Reuters"', function() {
      expect(DocumentOptionsDatabases.getElement('Reuters', 'ESTIMATES', 'Selected').isDisplayed()).toBeTruthy();
    });
  });

  describe('Test Step ID: 548063', function() {

    it('Should click on the "Date Options" tab from "Dates" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Date Options', 'Dates').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Date Options', 'Dates').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Date Options" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Calendar" drop down is set to "Seven Day" by default', function() {
      ThiefHelpers.verifySelectedDropDownText('Seven Day', undefined, DocumentOptionsDates.xpathOfCalenderDropDown);
    });

    it('Verifying that "Fiscal Year End Month" drop down is set to "March" by default', function() {
      ThiefHelpers.verifySelectedDropDownText('March', undefined, DocumentOptionsDates.xpathOfFiscalYearEndMonthDropDown);
    });
  });

  describe('Test Step ID: 548064', function() {

    // Click on "Ok" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Groupings');

    it('Verifying that "Market Cap" is present in the "Selected" section by default', function() {
      expect(TileOptionsGroupings.getElementFromSelectedContainer('Market Cap').isPresent()).toBeTruthy();
    });
  });

  describe('Test Step ID: 548065', function() {

    it('Should click on the "Risk Models" tab from "Risk" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Risk Models', 'Risk').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Risk Models', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Risk Models" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "NIS US Fundamental Model" is present in Selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('NIS US Fundamental Model') === -1) {
          expect(false).customError('"NIS US Fundamental Model" is not present in selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that default value shown for "Select Factor Grouping" drop down is "None"', function() {
      ThiefHelpers.verifySelectedDropDownText('None', 'Select Factor Grouping');
    });

    it('Verifying that all the checkboxes from "Visible Factors" section are selected', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getChildrenText().then(function(valArray) {
        valArray.forEach(function(factorGroups) {
          ThiefHelpers.getVirtualChecklistClassReference().getItemByText(factorGroups.text).isChecked().then(function(checked) {
            if (!checked) {
              expect(false).customError('"' + factorGroups.text + '" checkbox is not checked');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 548066', function() {

    // Click on "Cancel" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options');

    it('Enter "CLIENT:/PA3/ACCOUNTS/FIXED_INCOME_ACCOUNT.ACCT" into the "Portfolio" widget', function() {
      // Clear the existing account
      PA3MainPage.getWidgetBox('Portfolio').clear();

      // Enter the new account
      PA3MainPage.getWidgetBox('Portfolio').sendKeys('CLIENT:/PA3/ACCOUNTS/FIXED_INCOME_ACCOUNT.ACCT', protractor.Key.ENTER);
    });

    it('Waiting for "Weights" report to calculate', function() {
      // Wait for the progress spinner to disappear
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        }
      });
    });
  });

  describe('Test Step ID: 548067', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Portfolio', 'Prices', 'document options');

    it('Verifying that "Use Portfolio Pricing Sources for Benchmark" checkbox in "PRICES" section is not selected', function() {
      expect(Utilities.isCheckboxSelected(DocumentOptionsPricesPortfolio.getUsePortPricingForBenchCheckBox())).toBeFalsy();
    });

    it('Verifying that "FactSet FI - Telekurs - FactSet" is shown in the "Selected" container of "PRICES" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'FactSet FI - Telekurs - FactSet').getText().then(function(text) {
        if (text !== 'FactSet FI - Telekurs - FactSet') {
          expect(false).customError('"FactSet FI - Telekurs - FactSet" is not shown in the "Selected" container of "PRICES" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"FactSet FI - Telekurs - FactSet" is not found in the "Selected" container of "PRICES" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Use Price Sources" checkbox in "EXCHANGE RATES" section is not selected', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Price Sources').isChecked().then(function(boolean) {
        if (boolean) {
          expect(false).customError('"Use Price Sources" checkbox is checked off under "Prices" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "HSBC Fixed Income" is shown in the "Selected" container of "EXCHANGE RATES" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathExchangeRatesSelectedContainer, 'HSBC Fixed Income').getText().then(function(text) {
        if (text !== 'HSBC Fixed Income') {
          expect(false).customError('"HSBC Fixed Income" is not shown in the "Selected" container of "EXCHANGE RATES" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"HSBC Fixed Income" is not found in the "Selected" container of "EXCHANGE RATES" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 548068', function() {

    it('Should click on the "Benchmark" tab from "Prices" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Benchmark', 'Prices').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Benchmark', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Benchmark" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "FactSet FI - Telekurs - FactSet" is shown in the "Selected" container of "PRICES" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesBenchmark.xpathPricesSelectedContainer, 'FactSet FI - Telekurs - FactSet').getText().then(function(text) {
        if (text !== 'FactSet FI - Telekurs - FactSet') {
          expect(false).customError('"FactSet FI - Telekurs - FactSet" is not shown in the "Selected" container of "PRICES" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"FactSet FI - Telekurs - FactSet" is not found in the "Selected" container of "PRICES" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Use Price Sources" checkbox in "EXCHANGE RATES" section is not selected', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Price Sources').isChecked().then(function(boolean) {
        if (boolean) {
          expect(false).customError('"Use Price Sources" checkbox is checked off under "Prices" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "HSBC Fixed Income" is shown in the "Selected" container of "EXCHANGE RATES" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesBenchmark.xpathExchangeRatesSelectedContainer, 'HSBC Fixed Income').getText().then(function(text) {
        if (text !== 'HSBC Fixed Income') {
          expect(false).customError('"HSBC Fixed Income" is not shown in the "Selected" container of "EXCHANGE RATES" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"HSBC Fixed Income" is not found in the "Selected" container of "EXCHANGE RATES" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 548069', function() {

    it('Should select "Advanced" from "Prices" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Advanced', 'Prices').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Advanced', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Advanced" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Calculate Returns with Missing Accrued Interest" checkbox is selected', function() {
      expect(Utilities.isCheckboxSelected(DocumentOptionsPricesAdvanced.getCheckbox('Calculate Returns with Missing Accrued Interest'))).toBeTruthy();
    });

    it('Verifying that "Portfolio Split Source" drop down has "FactSet" selected', function() {
      ThiefHelpers.verifySelectedDropDownText('FactSet', 'Portfolio Split Source');
    });

    it('Verifying that "Currency" drop down has "U.S. Dollar" selected by default', function() {
      ThiefHelpers.verifySelectedDropDownText('U.S. Dollar', undefined, DocumentOptionsPricesAdvanced.xpathOfCurrencyDropDown);
    });
  });

  describe('Test Step ID: 548070', function() {

    it('Should select "Analytics Sources" from "Fixed Income" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Analytics Sources', 'Fixed Income').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Analytics Sources', 'Fixed Income').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Analytics Sources" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Use Portfolio Analytics Sources for Benchmark" checkbox is not selected', function() {
      expect(Utilities.isCheckboxSelected(DocumentOptionsFixedIncomeAnalyticsSource.getCheckBox('Use Portfolio Analytics Sources for Benchmark'))).toBeFalsy();
    });

    it('Verifying that "PORTFOLIO" section\'s "Selected" container is displaying "BlackRock FI ETFs - FactSet"', function() {
      var xpathSelectedContainer = CommonFunctions.replaceStringInXpath(DocumentOptionsFixedIncomeAnalyticsSource.xpathPortfolioAvailableOrSelectedSection, 'Selected');
      ThiefHelpers.expandAndGetListBoxItem(xpathSelectedContainer, 'BlackRock FI ETFs - FactSet').getText().then(function(text) {
        if (text !== 'BlackRock FI ETFs - FactSet') {
          expect(false).customError('"BlackRock FI ETFs - FactSet" is not shown in the "Selected" container of "PORTFOLIO\'S" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"BlackRock FI ETFs - FactSet" is not found in the "Selected" container of "PORTFOLIO\'S" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "BENCHMARK" section\'s "Selected" container is displaying "ICE BofAML"', function() {
      var xpathSelectedContainer = CommonFunctions.replaceStringInXpath(DocumentOptionsFixedIncomeAnalyticsSource.xpathBenchmarkAvailableOrSelectedSection, 'Selected');
      ThiefHelpers.expandAndGetListBoxItem(xpathSelectedContainer, 'ICE BofAML').getText().then(function(text) {
        if (text !== 'ICE BofAML') {
          expect(false).customError('"ICE BofAML" is not shown in the "Selected" container of "BENCHMARK\'S" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"ICE BofAML" is not found in the "Selected" container of "BENCHMARK\'S" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 548071', function() {

    it('Should select "Databases" option from LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Databases').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Databases').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Databases" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "FUNDAMENTAL" section\'s "Selected" container displays "MSCI"', function() {
      expect(DocumentOptionsDatabases.getElement('MSCI', 'FUNDAMENTAL', 'Selected').isDisplayed()).toBeTruthy();
    });

    it('Verifying that "ESTIMATES" section\'s "Selected" container displays "I/B/E/S Consensus"', function() {
      expect(DocumentOptionsDatabases.getElement('I/B/E/S Consensus', 'ESTIMATES', 'Selected').isDisplayed()).toBeTruthy();
    });
  });

  describe('Test Step ID: 548129', function() {

    it('Should select "Dates" option from LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Date Options', 'Dates').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Date Options', 'Dates').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Date Options" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Calendar" drop down is set to "Hong Kong" by default', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathCalenderDropDown).getSelectedText()
        .then(function(text) {
          if (text !== 'Hong Kong') {
            expect(false).customError('"Calendar" drop down did not set to "Hong Kong"; Found:' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying that "Fiscal Year End Month" drop down is set to "January" by default', function() {
      ThiefHelpers.verifySelectedDropDownText('January', undefined, DocumentOptionsDates.xpathOfFiscalYearEndMonthDropDown);
    });
  });

  describe('Test Step ID: 548072', function() {

    // Click on "Cancel" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Document Options');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Risk Models', 'Risk');

    it('Verifying if "Barra UK Long-Term Model (UKE7L)" is present in Selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Barra UK Long-Term Model (UKE7L)') === -1) {
          expect(false).customError('"Barra UK Long-Term Model (UKE7L)" is not present in selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that default value shown for "Select Factor Grouping" drop down is "FactSet: Standard"', function() {
      ThiefHelpers.verifySelectedDropDownText('FactSet: Standard', 'Select Factor Grouping');
    });

    it('Verifying that all the checkboxes from "Visible Factors" section are selected', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getChildrenText().then(function(valArray) {
        valArray.forEach(function(factorGroups) {
          ThiefHelpers.getVirtualChecklistClassReference().getGroupByText(factorGroups.text).isChecked().then(function(checked) {
            if (!checked) {
              expect(false).customError('"' + factorGroups + '" checkbox is not checked');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 548073', function() {

    it('Should select "Groupings" from LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Groupings').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Groupings').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Groupings" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Issuer Name" is present in the "Selected" section by default', function() {
      expect(TileOptionsGroupings.getElementFromSelectedContainer('Issuer Name').isPresent()).toBeTruthy();
    });
  });

  describe('Test Step ID: 548120', function() {

    // Click on "Cancel" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options');

    it('Type "Client:/pa3/accounts/" into "Portfolio" widget and select "Client:/pa3/accounts/TEST.ACCT" from type ahead', function() {
      PA3MainPage.setPortfolio('Client:/pa3/accounts/TEST.ACCT', 'TEST.ACCT | Client:/pa3/accounts/', 'CLIENT:/PA3/ACCOUNTS/TEST.ACCT').then(function(optionRef) {
        if (optionRef) {
          expect(PA3MainPage.setPortfolio('Client:/pa3/accounts/TEST.ACCT', 'TEST.ACCT | Client:/pa3/accounts/', 'CLIENT:/PA3/ACCOUNTS/TEST.ACCT')).toBeTruthy();
        } else {
          expect(false).customError('Not able to select "Client:/pa3/accounts/TEST.ACCT" from type ahead');

          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(found) {
        if (!found) {
          expect(false).customError('"Weights" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
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
  });

  describe('Test Step ID: 548121', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Portfolio', 'Prices', 'document options');

    it('Verifying that "FactSet - Equity" is shown in the "Selected" container of "PRICES" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'FactSet - Equity').getText().then(function(text) {
        if (text !== 'FactSet - Equity') {
          expect(false).customError('"FactSet - Equity" is not shown in the "Selected" container of "PRICES" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"FactSet - Equity" is not found in the "Selected" container of "PRICES" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Client Portfolio" is shown in the "Selected" container of "PRICES" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'Client Portfolio').getText().then(function(text) {
        if (text !== 'Client Portfolio') {
          expect(false).customError('"Client Portfolio" is not shown in the "Selected" container of "PRICES" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"Client Portfolio" is not found in the "Selected" container of "PRICES" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Use Price Sources" checkbox in "EXCHANGE RATES" section is not selected', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Price Sources').isChecked().then(function(boolean) {
        if (boolean) {
          expect(false).customError('"Use Price Sources" checkbox is checked off under "Prices" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "FactSet" is shown in the "Selected" container of "EXCHANGE RATES" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathExchangeRatesSelectedContainer, 'FactSet').getText().then(function(text) {
        if (text !== 'FactSet') {
          expect(false).customError('"FactSet" is not shown in the "Selected" container of "EXCHANGE RATES" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"FactSet" is not found in the "Selected" container of "EXCHANGE RATES" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 548122', function() {

    it('Should click on the "Benchmark" tab from "Prices" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Benchmark', 'Prices').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Benchmark', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Benchmark" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "FTSE Global" is shown in the "Selected" container of "PRICES" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesBenchmark.xpathPricesSelectedContainer, 'FTSE Global').getText().then(function(text) {
        if (text !== 'FTSE Global') {
          expect(false).customError('"FTSE Global" is not shown in the "Selected" container of "PRICES" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"FTSE Global" is not found in the "Selected" container of "PRICES" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Use Price Sources" checkbox in "EXCHANGE RATES" section is not selected', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Price Sources').isChecked().then(function(boolean) {
        if (boolean) {
          expect(false).customError('"Use Price Sources" checkbox is checked off under "Prices" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "FTSE" is shown in the "Selected" container of "EXCHANGE RATES" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesBenchmark.xpathExchangeRatesSelectedContainer, 'FTSE').getText().then(function(text) {
        if (text !== 'FTSE') {
          expect(false).customError('"FTSE" is not shown in the "Selected" container of "EXCHANGE RATES" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"FTSE" is not found in the "Selected" container of "EXCHANGE RATES" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 548123', function() {

    it('Should select "Advanced" from "Prices" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Advanced', 'Prices').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Advanced', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Advanced" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Calculate Returns with Missing Accrued Interest" checkbox is selected', function() {
      expect(Utilities.isCheckboxSelected(DocumentOptionsPricesAdvanced.getCheckbox('Calculate Returns with Missing Accrued Interest'))).toBeTruthy();
    });

    it('Verifying that "Portfolio Split Source" drop down has "FactSet" selected', function() {
      ThiefHelpers.verifySelectedDropDownText('FactSet', 'Portfolio Split Source');
    });

    it('Verifying that "Currency" drop down has "Euro" selected by default', function() {
      ThiefHelpers.verifySelectedDropDownText('Euro', undefined, DocumentOptionsPricesAdvanced.xpathOfCurrencyDropDown);
    });
  });

  describe('Test Step ID: 548124', function() {

    it('Should select "Analytics Sources" from "Fixed Income" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Analytics Sources', 'Fixed Income').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Analytics Sources', 'Fixed Income').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Analytics Sources" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Use Portfolio Analytics Sources for Benchmark" checkbox is not selected', function() {
      expect(Utilities.isCheckboxSelected(DocumentOptionsFixedIncomeAnalyticsSource.getCheckBox('Use Portfolio Analytics Sources for Benchmark'))).toBeFalsy();
    });

    it('Verifying that "PORTFOLIO" section\'s "Selected" container is displaying "Client Portfolio"', function() {
      var xpathSelectedContainer = CommonFunctions.replaceStringInXpath(DocumentOptionsFixedIncomeAnalyticsSource.xpathPortfolioAvailableOrSelectedSection, 'Selected');
      ThiefHelpers.expandAndGetListBoxItem(xpathSelectedContainer, 'Client Portfolio').getText().then(function(text) {
        if (text !== 'Client Portfolio') {
          expect(false).customError('"Client Portfolio" is not shown in the "Selected" container of "PORTFOLIO\'S" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"Client Portfolio" is not found in the "Selected" container of "PORTFOLIO\'S" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "BENCHMARK" section\'s "Selected" container is displaying "Bloomberg Barclays"', function() {
      var xpathSelectedContainer = CommonFunctions.replaceStringInXpath(DocumentOptionsFixedIncomeAnalyticsSource.xpathBenchmarkAvailableOrSelectedSection, 'Selected');
      ThiefHelpers.expandAndGetListBoxItem(xpathSelectedContainer, 'Bloomberg Barclays').getText().then(function(text) {
        if (text !== 'Bloomberg Barclays') {
          expect(false).customError('"Bloomberg Barclays" is not shown in the "Selected" container of "BENCHMARK\'S" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"Bloomberg Barclays" is not found in the "Selected" container of "BENCHMARK\'S" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 548125', function() {

    it('Should select "Databases" option from LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Databases').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Databases').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Databases" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "FUNDAMENTAL" section\'s "Selected" container displays "FactSet"', function() {

      DocumentOptionsDatabases.getElement('FactSet', 'FUNDAMENTAL', 'Selected').isDisplayed().then(function(optionRef) {
        if (optionRef) {

          expect(DocumentOptionsDatabases.getElement('FactSet', 'FUNDAMENTAL', 'Selected').isDisplayed()).toBeTruthy();
        } else {

          expect(false).customError('"FactSet" is not displayed in  "FUNDAMENTAL"  section\'s "Selected" container');

          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "ESTIMATES" section\'s "Selected" container displays "First Call"', function() {

      DocumentOptionsDatabases.getElement('First Call', 'ESTIMATES', 'Selected').isDisplayed().then(function(optionRef) {
        if (optionRef) {

          expect(DocumentOptionsDatabases.getElement('First Call', 'ESTIMATES', 'Selected').isDisplayed()).toBeTruthy();
        } else {

          expect(false).customError('"First Call" is not displayed in  "ESTIMATES" section\'s "Selected" container');

          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 548128', function() {

    it('Should select "Dates" option from LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Date Options', 'Dates').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Date Options', 'Dates').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Date Options" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Calendar" drop down is set to "Five Day" by default', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathCalenderDropDown).getSelectedText()
        .then(function(text) {
          if (text !== 'Five Day') {
            expect(false).customError('"Calendar" drop down did not set to "Five Day"; Found:' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying that "Fiscal Year End Month" drop down is set to "February" by default', function() {
      ThiefHelpers.verifySelectedDropDownText('February', undefined, DocumentOptionsDates.xpathOfFiscalYearEndMonthDropDown);
    });
  });

  describe('Test Step ID: 548126', function() {

    // Click on "Cancel" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Document Options');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Risk Models', 'Risk');

    it('Verifying if "NIS US Fundamental Model" is present in Selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('NIS US Fundamental Model') === -1) {
          expect(false).customError('"NIS US Fundamental Model" is not present in selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Defaults Applied" button is displayed when "Risk Models" pill is selected', function() {
      expect(TileOptions.getDefaultsApplied().isPresent()).toBeTruthy();
    });
  });

  describe('Test Step ID: 548127', function() {

    it('Should select "Groupings" from LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Groupings').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Groupings').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Groupings" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Economic Sector - FactSet" is present in the "Selected" section by default', function() {

      TileOptionsGroupings.getAllElements('Selected').get(0).getText().then(function(option) {
        if (option !== 'Economic Sector - FactSet') {
          expect(false).customError(' "Economic Sector - FactSet" is not present in the "Selected" section by default');

          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Industry - FactSet" is present in the "Selected" section by default', function() {

      TileOptionsGroupings.getAllElements('Selected').get(1).getText().then(function(option) {
        if (option !== 'Industry - FactSet') {
          expect(false).customError(' "Industry - FactSet" is not present in the "Selected" section by default');

          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Cancel" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options');
  });
});
