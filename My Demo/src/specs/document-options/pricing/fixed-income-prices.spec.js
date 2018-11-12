'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: fixed-income-prices', function() {

  // Variable(s)
  var firstElement;
  var derivatives;
  var xpathCurrencyDropDown = CommonFunctions.replaceStringInXpath(DocumentOptionsPricesAdvanced.xpathDropdown, 'Currency');

  describe('Test Step ID: 542552', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should open "Client:/pa3/Auto_New" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('auto-new');
    });
  });

  describe('Test Step ID: 542553', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Portfolio', 'Prices', 'Document Options');

    it('Verifying that "Portfolio" Option has "Prices" section', function() {
      element(by.xpath(DocumentOptionsPricesPortfolio.xpathPortfolioPricesSection)).isPresent().then(function(bool) {
        if (!bool) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Portfolio" Option does not have "Prices" section');
        }
      });
    });

    it('Verifying that "Portfolio" option has "Exchange Rates" section', function() {
      element(by.xpath(DocumentOptionsPricesPortfolio.xpathPortfolioExchangeRatesSection)).isPresent().then(function(bool) {
        if (!bool) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Portfolio" Option does not have "Exchange Rates" section');
        }
      });
    });
  });

  describe('Test Step ID: 542554', function() {

    it('Should double click on "FTSE" from "Exchange Rates > Available" section', function() {
      ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathExchangeRatesAvailableContainer, 'FTSE').then(function(item) {
        browser.actions().doubleClick(item).perform();
      });
    });

    it('Verifying that "FTSE" is not added to "Exchange Rates > Selected" section', function() {
      ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathExchangeRatesSelectedContainer, 'FTSE').getText().then(function(text) {
        if (text === 'FTSE') {
          expect(false).customError('"FTSE" is added to the "selected" container of "Exchange Rates" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(true).toBeTruthy();
        } else {
          expect(false).customError('"FTSE" is added to the "selected" container of "Exchange Rates" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Selecting the first item from the disabled container. It shouldn\'t be selectable.', function() {
      DocumentOptionsPricesPortfolio.getAllListElements('Exchange Rates', 'Available').get(0).click().then(function() {}, function(err) {

        if (err.message.indexOf('not clickable') < 0) {
          expect(true).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying that it is not selected
      DocumentOptionsPricesPortfolio.getAllListElements('Exchange Rates', 'Available').get(0).getAttribute('class').then(function(attr) {
        if (attr.indexOf('selected') > 0) {
          expect(true).customError('Item is selected in the "Exchange Rates" available section');
          CommonFunctions.takeScreenShot();
        }
      });

      // Collecting the name of first element from 'Available' container
      DocumentOptionsPricesPortfolio.getAllListElements('Exchange Rates', 'Available').get(0).getText().then(function(eleName) {
        firstElement = eleName;
      });
    });

    it('Verifying that "Exchange Rates" section is Disabled', function() {
      element(by.xpath(DocumentOptionsPricesPortfolio.xpathExchangeRatesSections + '/ancestor::*[contains(@class,"selected-exchange-rate-sources")]')).getAttribute('disabled').then(function(attr) {
        if (attr.indexOf('disabled') > 0) {
          expect(true).customError(' "Exchange Rates" section is not Disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 542555', function() {

    it('Should clear all items of "Selected" container from "Prices > Selected" section', function() {
      ThiefHelpers.getButtonClassReference(undefined, DocumentOptionsPricesPortfolio.getButtonFromSelectedSection('Prices', 'remove')).press();

      // Verifying that all items are removed from the 'Selected' container
      expect(DocumentOptionsPricesPortfolio.getAllListElements('Prices', 'Selected').count()).toEqual(0);
    });

    it('Should expand "Fixed Income > ICE BofAML" tree from "Prices > Available" section and select ' + '"ICE BofAML"', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'ICE BofAML', 'Fixed Income|ICE BofAML').select();
    });

    it('Should click "Right" arrow button to add "ICE BofAML" to "Selected" container', function() {
      ThiefHelpers.sendElementToSelectedSection(DocumentOptionsPricesPortfolio.getArrowButton('prices'));
    });

    // Known issue: RPD:13926649 - Option added to the Prices Selected section is not highlighted in yellow.
    it('Verifying that "ICE BofAML" is added to "Selected" section', function() {
      ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'ICE BofAML').getText().then(function(text) {
        if (text !== 'ICE BofAML') {
          expect(false).customError('"ICE BofAML" is not shown in the "Selected" container of "PRICES" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"ICE BofAML" is not found in the "Selected" container of "PRICES" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 542556', function() {

    it('Expand "Client Provided" tree from "Prices > Available" section', function() {
      ThiefHelpers.expandGroup(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'Client Provided', undefined, 'Listbox');
    });

    var arrElement = ['Client Portfolio', 'Client Security Master', 'Super Client Security Master'];
    arrElement.forEach(function(element) {
      it('Double click on "' + element + '" item from "Client Provided" tree to add it to "Selected" container', function() {
        ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, element, 'Client Provided').then(function(ref) {
          browser.actions().doubleClick(ref).perform();
        });
      });

      it('Verifying that "' + element + '" is added to "Selected" container', function() {
        ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, element).getText().then(function(text) {
          if (text !== element) {
            expect(false).customError('' + element + '" is not shown in the "Selected" container of "Prices" section;Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + element + '" is not found in the "Selected" container of "Prices" section');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 542557', function() {

    it('Remove "Client Security Master" from "Selected" container of "Prices" section', function() {
      ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'Client Security Master').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });

      // Verifying that 'Client Security Master' is removed from 'Selected' container

      ThiefHelpers.getListboxGroup(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'Client Security Master').getText().then(function(text) {
        if (text === 'Client Security Master') {
          expect(false).customError('"Client Security Master" is still shown in the "Selected" container of "PRICES"' + ' section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(true).toBeTruthy();
        } else {
          expect(false).customError('"Client Security Master" is still found in the "Selected" container of "PRICES" section');
          CommonFunctions.takeScreenShot();
        }
      });
      expect(DocumentOptionsPricesPortfolio.getListItem('Client Security Master', 'Prices', 'Selected').isPresent()).toBeFalsy();
    });
  });

  describe('Test Step ID: 542558', function() {

    it('Should select "Benchmark" from "Prices" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Benchmark', 'Prices').select();

      // Verifying if "Risk Models" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Benchmark', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Benchmark" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should un-check "Use Portfolio Pricing Sources for Benchmark" checkbox', function() {
      DocumentOptionsPricesBenchmark.getUsePortPricingForBenchCheckBox().click();

      // Verifying that 'Use Portfolio Pricing Sources for Benchmark' is un-checked
      Utilities.isCheckboxSelected(DocumentOptionsPricesBenchmark.getUsePortPricingForBenchCheckBox()).then(function(bool) {
        if (bool) {
          expect(false).customError('Failed to un-check "Use Portfolio Pricing Sources for Benchmark" checkbox');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Benchmark" pill has "Prices" section', function() {
      expect(element(by.xpath(DocumentOptionsPricesBenchmark.xpathBenchmarkPricesSection)).isPresent()).toBeTruthy();
    });

    it('Verifying that "Benchmark" pill has "Exchange Rates" section', function() {
      expect(element(by.xpath(DocumentOptionsPricesBenchmark.xpathBenchmarkExchangeRatesSection)).isPresent()).toBeTruthy();
    });
  });

  describe('Test Step ID: 542559', function() {

    it('Should Expand "Fixed Income > ICE BofAML" tree and select "ICE BofAML - FactSet" from it', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesBenchmark.xpathPricesAvailableContainer, 'ICE BofAML - FactSet', 'Fixed Income|ICE BofAML').select();
    });

    it('Verifying if "ICE BofAML - FactSet" from "Fixed Income > ICE BofAML" tree is selected from ' + '"Prices > Available" section', function() {
      ThiefHelpers.getListBoxItem(DocumentOptionsPricesBenchmark.xpathPricesAvailableContainer, 'ICE BofAML - FactSet', 'Fixed Income|ICE BofAML').isSelected().then(function(bool) {
        if (!bool) {
          CommonFunctions.takeScreenShot('"ICE BofAML - FactSet" from "Fixed Income > ICE BofAML" tree ' + 'is not selected from "Prices > Available" section');
          expect(false).customError('');
        }
      });
    });

    it('Click on "Right" arrow button to add "ICE BofAML - FactSet" to "Prices > Selected" section', function() {
      ThiefHelpers.sendElementToSelectedSection(DocumentOptionsPricesBenchmark.xpathArrowButtonPricesSection);
    });

    it('Verifying that "ICE BofAML - FactSet" is added to "Prices > Selected" section', function() {
      ThiefHelpers.getListBoxItem(DocumentOptionsPricesBenchmark.xpathPricesSelectedContainer, 'ICE BofAML - FactSet').getText().then(function(text) {
        if (text !== 'ICE BofAML - FactSet') {
          expect(false).customError('"ICE BofAML - FactSet" is not shown in the "Selected" container of "Prices" ' + 'section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"ICE BofAML - FactSet" is not found in the "Selected" container of "Prices" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 542562', function() {

    it('Select "Derivatives" tree', function() {
      ThiefHelpers.getListboxGroup(DocumentOptionsPricesBenchmark.xpathPricesAvailableContainer, 'Derivatives').select();

      // Verifying that 'Derivatives' tree is selected
      ThiefHelpers.getListboxGroup(DocumentOptionsPricesBenchmark.xpathPricesAvailableContainer, 'Derivatives').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Derivatives" group is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Double click on "Derivatives" to add all of its element to "Selected" section', function() {
      ThiefHelpers.getListboxGroup(DocumentOptionsPricesBenchmark.xpathPricesAvailableContainer, 'Derivatives').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    var arrDerivativeItems = ['FactSet - Options - Ask', 'FactSet - Options - Bid', 'FactSet - Options', 'FactSet - Options (Theoretical)', 'FactSet - Futures'];

    arrDerivativeItems.forEach(function(element) {

      it('Verifying that "' + element + '" is added to the "Prices > Selected" section', function() {
        ThiefHelpers.getListBoxItem(DocumentOptionsPricesBenchmark.xpathPricesSelectedContainer, element).getText().then(function(text) {
          if (text !== element) {
            expect(false).customError('' + element + '" is not shown in the "Selected" container of "Prices" section;Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + element + '" is not found in the "Selected" container of "Prices" section');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    // Known Issue: RPD:12988026 - In the selected section, all the items are not highlighted in yellow.
  });

  describe('Test Step ID: 542560', function() {

    it('Should select "Advanced" from "Prices" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Advanced', 'Prices').select();

      // Verifying if "Risk Models" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Advanced', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Advanced" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Calculate Returns with Missing Accrued Interest" is selected by default', function() {
      expect(Utilities.isCheckboxSelected(DocumentOptionsPricesAdvanced.getCheckbox('Calculate Returns with Missing Accrued Interest'))).toBeTruthy();
    });
  });

  describe('Test Step ID: 542561', function() {

    it('Should select "MSCI" from "Portfolio Split Source" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('MSCI', 'Portfolio Split Source');

      // Verifying if drop down is set to "MSCI"
      ThiefHelpers.verifySelectedDropDownText('MSCI', 'Portfolio Split Source');
    });

    it('Should select "British Pounds" from "Currency" drop down', function() {
      // Click 'Currency' drop down
      ThiefHelpers.selectOptionFromDropDown('British Pounds', undefined, xpathCurrencyDropDown, 1);

      // Verifying that 'British Pounds' is selected
      ThiefHelpers.verifySelectedDropDownText('British Pounds', undefined, xpathCurrencyDropDown, 1);
    });
  });

  describe('Test Step ID: 542563', function() {

    it('Should select "Portfolio" from "Prices" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Portfolio', 'Prices').select();

      // Verifying if "Risk Models" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Portfolio', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Portfolio" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select the check box next to "Use Portfolio Pricing Sources for Benchmark"', function() {
      DocumentOptionsPricesPortfolio.getUsePortPricingForBenchCheckBox().click().then(function() {}, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });

      // Verifying that 'Use Portfolio Pricing Sources for Benchmark' checkbox is selected
      expect(Utilities.isCheckboxSelected(DocumentOptionsPricesPortfolio.getUsePortPricingForBenchCheckBox())).toBeTruthy();
    });

    it('Should select "Benchmark" from "Prices" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Benchmark', 'Prices').select();

      // Verifying if "Risk Models" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Benchmark', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Benchmark" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Prices" section of "Benchmark" option is disabled', function() {
      expect(element(by.xpath(DocumentOptionsPricesBenchmark.xpathPricesSections + '/ancestor::*[contains(@class,' + '"selected-price-sources")]')).getAttribute('disabled')).toBeTruthy();
    });
  });

  describe('Test Step ID: 542564', function() {

    var arrSelectedItems = ['ICE BofAML', 'Client Portfolio', 'Super Client Security Master'];

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Adding the below action as a work around to shift control from Download button.
    it('Should click on "Contribution Detail" from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Uncategorized', 'Weights').then(function(ele) {
        ele.click();
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Portfolio', 'Prices', 'Document Options');

    arrSelectedItems.forEach(function(value) {
      it('Verifying that "' + value + '" is present in "Selected" section', function() {
        DocumentOptionsPricesPortfolio.getListItem(value, 'Prices', 'Selected').isPresent().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + value + '" is not present in "Selected" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying that "Use Portfolio Pricing Sources for Benchmark" checkbox is selected', function() {
      Utilities.isCheckboxSelected(DocumentOptionsPricesPortfolio.getUsePortPricingForBenchCheckBox()).then(function(bool) {
        if (!bool) {
          expect(false).customError('Failed to check "Use Portfolio Pricing Sources for Benchmark" checkbox');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Benchmark" from "Prices" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Benchmark', 'Prices').select();

      // Verifying if "Risk Models" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Benchmark', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Benchmark" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that workspace view is changed to "Prices - Benchmark"', function() {
      expect(DocumentOptions.getOptionTitle().getText()).toEqual('Prices - Benchmark');
    });

    it('Verifying that "Use Portfolio Pricing Sources for Benchmark" checkbox is selected', function() {
      Utilities.isCheckboxSelected(DocumentOptionsPricesBenchmark.getUsePortPricingForBenchCheckBox()).then(function(bool) {
        if (!bool) {
          expect(false).customError('Failed to check "Use Portfolio Pricing Sources for Benchmark" checkbox');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Advanced" from "Prices" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Advanced', 'Prices').select();

      // Verifying if "Risk Models" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Advanced', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Advanced" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Calculate Returns with Missing Accrued Interest" is checked', function() {
      expect(Utilities.isCheckboxSelected(DocumentOptionsPricesAdvanced.getCheckbox('Calculate Returns with Missing Accrued Interest'))).toBeTruthy();
    });

    it('Verifying that "MSCI" is selected for "Portfolio Split Source" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('MSCI', 'Portfolio Split Source');
    });

    it('Verifying that "British Pounds" is selected for "Currency" drop down', function() {
      // Verifying that 'British Pounds' is selected
      ThiefHelpers.verifySelectedDropDownText('British Pounds', undefined, xpathCurrencyDropDown);
    });
  });

  describe('Test Step ID: 542565', function() {

    // Click on "Cancel" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Document Options');

    it('Should close the PA3 application', function() {
      expect(true).toBeTruthy();
    });
  });
});
