'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: accts-plm-pa-general', function() {

  describe('Test Step ID: Startup Instructions', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 568566', function() {

    it('Should launch the application with "CLIENT:~2FPA3~2FACCOUNTS&name=EQUITY_ACCOUNT.ACCT" in PLM', function() {
      PA3MainPage.openPLMModifyAccount('CLIENT:~2FPA3~2FACCOUNTS', 'EQUITY_ACCOUNT');

      //Check if application is launched
      browser.getTitle().then(function(title) {
        expect(title === 'Modify Account (New)')
          .customError('Title of browser did not match. Expected: "Modify Account (New)", Found: "' + title + '"');
        if (title !== 'Modify Account (New)') {
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 568586', function() {

    it('Should click on the "+" beside PA and expand Prices', function() {
      PLMAccount.expandCategoryTree('PA|Prices');
    });

    it('Verifying "PA" and "Prices" Categorys are expanded', function() {
      PLMAccount.isCategoryExpanded('PA').then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('PA Category is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });

      //Verifying "Prices" Category is expanded.
      PLMAccount.isCategoryExpanded('Prices').then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Prices Category is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Portfolio"in LHP', function() {
      PLMAccount.getLHPOptionFromTree('PA|Prices', 'Portfolio').click().then(function() {
      }, function() {
        expect(false).customError('Not able to select "Portfolio"in LHP');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Portfolio" is highlighted in LHP ', function() {
      PLMAccount.getLHPOptionFromTree('PA|Prices', 'Portfolio').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') === -1) {
          expect(false).customError('"Portfolio" is not highlighted in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Russell - U.S." is displayed in the "Prices - Selected" section', function() {
      ThiefHelpers.getListBoxItem(PAPricesPortfolio.xpathPricesSelectedContainer, 'Russell - U.S.').getText().then(function(text) {
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

    it('Verifying "FTSE" is displayed in the "Exchange Rates - Selected" section', function() {
      ThiefHelpers.getListBoxItem(PAPricesPortfolio.xpathExchangeRatesSelectedContainer, 'FTSE').getText().then(function(text) {
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

  describe('Test Step ID: 568595', function() {

    it('Should click on the "+" beside PA, expand Fixed Prices', function() {
      PLMAccount.expandCategoryTree('PA|Fixed Income');
    });

    it('Verifying "PA" and "Fixed Income" Category are expanded', function() {
      PLMAccount.isCategoryExpanded('PA').then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('PA Category is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });

      //Verifying "Fixed Income" Category is expanded.
      PLMAccount.isCategoryExpanded('Fixed Income').then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Fixed Income Category is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Analytics Source" in LHP', function() {
      PLMAccount.getLHPOptionFromTree('PA|Fixed Income', 'Analytics Source').click().then(function() {
      }, function() {
        expect(false).customError('Not able to select "Analytics Source" in LHP');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Analytics Source" is highlighted in LHP ', function() {
      PLMAccount.getLHPOptionFromTree('PA|Fixed Income', 'Analytics Source').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') === -1) {
          expect(false).customError('"Analytics Source" is not highlighted in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Use Portfolio Sources For Benchmark" checkbox is checked', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Portfolio Sources For Benchmark').isChecked().then(function(value) {
        if (!value) {
          expect(false).customError('"Use Portfolio Sources For Benchmark" checkbox is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Client Portfolio" is displayed in "Portfolio - Selected" section', function() {
      ThiefHelpers.getListBoxItem(PAFixedIncomeAnalyticsSource.xpathPortfolioSelectedContainer, 'Client Portfolio').getText().then(function(text) {
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

    it('Verifying Benchmark Available Section is greyed out.', function() {
      element(by.xpath(PAFixedIncomeAnalyticsSource.xpathBenchmarkAvailableContainer)).getAttribute('class').then(function(value) {
        if (value.indexOf('disabled') < 0) {
          expect(false).customError('Benchmark Available Section is not greyed out');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying Benchmark Selected Section is greyed out.', function() {
      element(by.xpath(PAFixedIncomeAnalyticsSource.xpathBenchmarkSelectedContainer)).getAttribute('class').then(function(value) {
        if (value.indexOf('disabled') < 0) {
          expect(false).customError('Benchmark Selected Section is not greyed out');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 568596', function() {

    it('Should click on the "+" beside PA, expand Asset Types', function() {
      PLMAccount.expandCategoryTree('PA|Asset Types');
    });

    it('Verifying "PA" and "Asset Type" Category are expanded', function() {
      PLMAccount.isCategoryExpanded('PA').then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('PA Category is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });

      //Verifying "Asset Types" Category is expanded.
      PLMAccount.isCategoryExpanded('Asset Types').then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Asset Types Category is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Add/Remove" in LHP', function() {
      PLMAccount.getLHPOptionFromTree('PA|Asset Types', 'Add/Remove').click().then(function() {
      }, function() {

        expect(false).customError('Not able to select "Add/Remove" in LHP');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Add/Remove" is highlighted in LHP ', function() {
      PLMAccount.getLHPOptionFromTree('PA|Asset Types', 'Add/Remove').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') === -1) {
          expect(false).customError('"Add/Remove" is not highlighted in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Asset Type"  radio button is checked', function() {
      PAAssetTypesAddRemove.getRadioButtonInViewBy('Asset Type').getAttribute('class').then(function(val) {
        if (val.indexOf('selected') === -1) {
          expect(false).customError('"Asset Type" radio button is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Derivatives>Forwards>Bond Forward>Generate Offset Cash for Bond Forwards" are displayed in selected section', function() {
      PAAssetTypesAddRemove.getElementInsideTree('Derivatives|Forwards|Bond Forward', 'Generate Offset Cash for Bond Forwards', 'Selected').isDisplayed().then(function(value) {
        if (!value) {
          expect(false).customError('"Derivatives>Forwards>Bond Forward>Generate Offset Cash for Bond Forwards" is not displayed in "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying "Swaps>Total Return Swap>Generate Offset Cash for TRS" are displayed in selected section', function() {
      PAAssetTypesAddRemove.getElementInsideTree('Swaps|Total Return Swap', 'Generate Offset Cash for TRS', 'Selected').isDisplayed().then(function(value) {
        if (!value) {
          expect(false).customError('"Swaps>Total Return Swap>Generate Offset Cash for TRS" is not displayed in "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying "Equity>Equity Common>Generate Offset Cash for Shorts" are displayed in selected section', function() {
      PAAssetTypesAddRemove.getElementInsideTree('Equity|Equity Common', 'Generate Offset Cash for Shorts', 'Selected').isDisplayed().then(function(value) {
        if (!value) {
          expect(false).customError('"Equity>Equity Common>Generate Offset Cash for Shorts" is not displayed in "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 568597', function() {

    it('Should launch the application with "CLIENT:~2FPA3~2FACCOUNTS&name=FIXED_INCOME_ACCOUNT.ACCT" in PLM', function() {
      PA3MainPage.openPLMModifyAccount('CLIENT:~2FPA3~2FACCOUNTS', 'FIXED_INCOME_ACCOUNT');
    });

    it('Should click on the "+" beside PA', function() {
      PLMAccount.expandCategoryTree('PA');
    });

    it('Verifying "PA" Category is expanded', function() {
      PLMAccount.isCategoryExpanded('PA').then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('PA Category is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Databases" in LHP', function() {
      PLMAccount.getLHPOptionFromTree('PA', 'Databases').click().then(function() {
      }, function() {
        expect(false).customError('Not able to click on "Wrench" button in the application toolbar');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Databases" is highlighted in LHP ', function() {
      PLMAccount.getLHPOptionFromTree('PA', 'Databases').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') === -1) {
          expect(false).customError('"Databases" is not highlighted in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "MSCI" is displayed in "Fundamental Selected" section', function() {
      PADatabases.getElement('MSCI', 'Fundamental', 'Selected').isDisplayed().then(function(value) {
        if (!value) {
          expect(false).customError('"MSCI" is not displayed in "Fundamental Selected" section');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying "I/B/E/S Consensus" is displayed in "Estimates Selected" section', function() {
      PADatabases.getElement('MSCI', 'Fundamental', 'Selected').isDisplayed().then(function(value) {
        if (!value) {
          expect(false).customError('"I/B/E/S Consensus" is not displayed in "Estimates Selected" section');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 568598', function() {

    it('Verifying "PA" Category is expanded', function() {
      PLMAccount.isCategoryExpanded('PA').then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('PA Category is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Groupings" in LHP', function() {
      PLMAccount.getLHPOptionFromTree('PA', 'Groupings').click().then(function() {
      }, function() {

        expect(false).customError('Not able to click on "Wrench" button in the application toolbar');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Groupings" is highlighted in LHP', function() {
      PLMAccount.getLHPOptionFromTree('PA', 'Groupings').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') === -1) {
          expect(false).customError('"Add/Remove" is not highlighted in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "ADDITIONAL OPTIONS" next to Selected section', function() {
      PAGroupings.expandSectionInOptionsPane('ADDITIONAL OPTIONS');
    });

    it('Verifying "Issuer Name" is displayed in the Selected section', function() {
      PAGroupings.getElementFromSelectedContainer('Issuer Name').isDisplayed().then(function(value) {
        if (!value) {
          expect(false).customError('"Issuer Name" is not displayed in "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying "Group before Exclusions"  radio button is selected', function() {
      ThiefHelpers.getRadioClassReference('Group before Exclusions', undefined).isSelected().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Group before Exclusions"  radio button is not checked in');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 568600', function() {

    it('Should close the browser and verify if closed', function() {
      expect(true).toBeTruthy();
    });

  });

});
