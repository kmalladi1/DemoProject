'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: src-comp-portfolios', function() {

  // Local functions
  var verifyIfSectionsAreDisabledAndExpectedTextIsDisplayed = function(arrOfSectionNames, arrofSectionXpaths, xpathOfDisabledSection) {
    arrOfSectionNames.forEach(function(sectionName, index) {

      it('Verifying if "Sources from Component Portfolios" is displayed in "' + sectionName + '" selected section', function() {
        var group = ThiefHelpers.getListboxClassReference(arrofSectionXpaths[index]);
        var arrOfChildren;
        arrOfChildren = group.getChildrenText();
        arrOfChildren.then(function(childArr) {
          if (childArr[0].text !== 'Sources from Component Portfolios') {
            expect(false).customError('"Sources from Component Portfolios" is not displayed in "' + sectionName + '" selected section');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Verifying if "' + sectionName + '" - Available sections are disabled', function() {
        element(by.xpath(CommonFunctions.replaceStringInXpath(xpathOfDisabledSection, sectionName))).isDisplayed().then(function() {
          expect(true).toBeTruthy();
        }, function(error) {
          expect(false).customError('"' + sectionName + '" - Available sections are disabled' + error);
          CommonFunctions.takeScreenShot();
        });
      });
    });
  };

  var selectLHPItemAndVerifyifCheckboxIsSelected = function(elementName, parentElementPath, checkboxStatus, xpathOfCheckbox) {
    it('Should select "' + elementName + '" tab from LHP', function() {
      ThiefHelpers.getOptionspaneItem(undefined, elementName, parentElementPath).select();

      // Verifying if required is selected in the LHP
      ThiefHelpers.getOptionspaneItem(undefined, elementName, parentElementPath).isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"' + elementName + '" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    if (checkboxStatus !== undefined) {
      it('Verifying if the "Use Portfolio Pricing Sources for Benchmark" checkbox is checked by default', function() {
        ThiefHelpers.verifyStatusOfCheckbox(undefined, xpathOfCheckbox, 'ischecked');
      });
    }
  };

  describe('Test Step ID: 721892', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:;Pa3;Prices;use_sources_component"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('use-sources-component');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    // Verifying if "Exposures Overview" report opens
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Weights', 'Exposures Overview', undefined, 'isSelected');

    it('Verifying if header displays "S&P 500 and Russell 1000 Sources Test"', function() {
      PA3MainPage.getHeader().getText().then(function(text) {
        if (text !== 'S&P 500 and Russell 1000 Sources Test') {
          expect(false).customError('Header of application is not showing "S&P 500 and Russell 1000 Sources Test".' + 'Expected: "S&P 500 and Russell 1000 Sources Test", Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 721893', function() {

    // Click on the wrench icon of application toolbar and select "Document Options"
    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSelectOption('Document Options');

    it('Verifying if "Document Options" page is opened', function() {
      ThiefHelpers.isModeBannerDisplayed('Document Options').then(function(found) {
        if (!found) {
          expect(false).customError('View is not changed to "Document Options".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var xpathOfCheckbox = CommonFunctions.replaceStringInXpath(DocumentOptionsPricesPortfolio.xpathofCheckbox, 'Use Portfolio Pricing Sources for Benchmark');

    // Select "Portfolio" under Prices and verify if checkbox is checked by default
    selectLHPItemAndVerifyifCheckboxIsSelected('Portfolio', 'Prices', true, xpathOfCheckbox);

    it('Verifying if the "Use Sources from Component Portfolios" checkbox is un-checked by default', function() {
      ThiefHelpers.verifyStatusOfCheckbox('Use Sources from Component Portfolios', undefined, 'is unchecked');
    });
  });

  describe('Test Step ID: 721894', function() {

    it('Should check "Use Sources from Component Portfolios" checkbox', function() {
      ThiefHelpers.setCheckBox('Use Sources from Component Portfolios', undefined, true);
    });

    var arrOfSectionNames = ['Prices', 'Exchange-rates'];
    var arrofSectionXpaths = [DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, DocumentOptionsPricesPortfolio.xpathExchangeRatesSelectedContainer];

    // Verify if required sections are disabled
    verifyIfSectionsAreDisabledAndExpectedTextIsDisplayed(arrOfSectionNames, arrofSectionXpaths, DocumentOptionsPricesPortfolio.xpathOfRequiredDisabledTransferBox);
  });

  describe('Test Step ID: 723362', function() {

    var xpathOfCheckbox = CommonFunctions.replaceStringInXpath(DocumentOptionsPricesBenchmark.xpathofCheckbox, 'Use Portfolio Pricing Sources for Benchmark');

    // Select "Benchmark" under Prices and verify if checkbox is checked by default
    selectLHPItemAndVerifyifCheckboxIsSelected('Benchmark', 'Prices', true, xpathOfCheckbox);

    var arrOfSectionNames = ['Prices', 'Exchange-rates'];
    var arrofSectionXpaths = [DocumentOptionsPricesBenchmark.xpathPricesSelectedContainer, DocumentOptionsPricesBenchmark.xpathExchangeRatesSelectedContainer];

    // Verify if required sections are disabled
    verifyIfSectionsAreDisabledAndExpectedTextIsDisplayed(arrOfSectionNames, arrofSectionXpaths, DocumentOptionsPricesBenchmark.xpathOfRequiredDisabledTransferBox);
  });

  describe('Test Step ID: 721895', function() {

    // Select "Advanced" under Prices
    selectLHPItemAndVerifyifCheckboxIsSelected('Advanced', 'Prices');

    it('Verifying if "On Append Error" drop down is set to "Return NA for Risk Data"', function() {
      ThiefHelpers.verifySelectedDropDownText('Sources from Component Portfolios', 'Portfolio Split Source');
    });

    it('Verifying if "Portfolio Split Source" drop-down is disabled', function() {
      DocumentOptionsPricesAdvanced.getPortfolioSplitSourceDropDownButton().getAttribute('class').then(function(text) {
        if (text.indexOf('disabled') < 0) {
          expect(false).customError('"Portfolio Split Source" drop-down is not disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 721900', function() {

    // Select "Analytics Sources" under Fixed Income
    selectLHPItemAndVerifyifCheckboxIsSelected('Analytics Sources', 'Fixed Income');

    var arrOfSectionNames = ['Portfolio', 'Benchmark'];
    var xpathOfPorfolioSelectedSection = CommonFunctions.replaceStringInXpath(DocumentOptionsFixedIncomeAnalyticsSource.xpathPortfolioAvailableOrSelectedSection, 'selected');
    var xpathOfBenchmarkSelectedSection = CommonFunctions.replaceStringInXpath(DocumentOptionsFixedIncomeAnalyticsSource.xpathBenchmarkAvailableOrSelectedSection, 'selected');
    var arrofSectionXpaths = [xpathOfPorfolioSelectedSection, xpathOfBenchmarkSelectedSection];

    // Verify if required sections are disabled
    verifyIfSectionsAreDisabledAndExpectedTextIsDisplayed(arrOfSectionNames, arrofSectionXpaths, DocumentOptionsFixedIncomeAnalyticsSource.xpathOfRequiredDisabledTransferBox);
  });

  describe('Test Step ID: 721901', function() {

    it('Automation work:Ignoring synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = true;
    });

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    it('Verifying loading swirl is displayed ', function() {
      //Verifying loading swirl is displayed
      ThiefHelpers.waitUntilSpinnerAppears(PA3MainPage.getProgressIndicatorClassReference());

      PA3MainPage.getProgressIndicatorClassReference().getProgress().then(function() {}, function() {

        expect(false).customError('loading swirl is not displayed');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Automation work: synchronization to handle loading swirl', function() {
      browser.ignoreSynchronization = false;
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');
  });
});
