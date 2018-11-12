'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: prices-general-1', function() {

  describe('Test Step ID: 404686', function() {

    // Open default document and un-check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should open "Client:/Pa3/Pa3_docs/QA_Analytics_BofA_Merrill" document and verify title', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('qa-analytics-bofa-merrill');
    });

    var arrValues = [{name: 'Portfolio', value: 'MFI:MLUS00'}, {name: 'Benchmark', value: 'MFI:MLGBMI'}];

    arrValues.forEach(function(text) {
      it('Should verify if "' + text.value  + '" set to ' + text.name + ' widget', function() {
        PA3MainPage.getWidgetBox(text.name).getAttribute('value').then(function(att) {
          if (att !== text.value) {
            expect(false).customError('"' + text.name + '" widget does not contain "' + text.value + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 442773', function() {

    it('Should open and select "British Pounds" from "Base Currency" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('British Pounds', undefined, PA3MainPage.xpathCurrencyDropdown, 1);

      // Verify "British Pounds" is selected
      ThiefHelpers.verifySelectedDropDownText('British Pounds', undefined, PA3MainPage.xpathCurrencyDropdown);
    });
  });

  describe('Test Step ID: 404684', function() {

    var selectedElements = ['Client Portfolio', 'Client Security Master', 'Client Security Master - FactSet', 'Super Client Security Master', 'Super Client Security Master - FactSet'];
    var itemsInPricesSelectedSection = [];

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Portfolio', 'Prices', 'Document Options');

    it('Should drag "Client Provided" from "Prices > Available" section and drop it in selected container', function() {
      var source = DocumentOptionsPricesPortfolio.getListItem('Client Provided', 'Prices', 'Available');
      var target = element(by.xpath(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer));

      CommonPageObjectsForPA3.dragItemOrGroupFromSourceAndDropUnderTarget(source, target);
    });

    it('Should verify if "Client Provided" is no longer displayed in the available List', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'Client Provided').then(function() {
        expect(false).customError('"Client Provided" is displayed in the available List');
        CommonFunctions.takeScreenShot();
      }, function(err) {

        if (err.toString().indexOf('No direct child') <= 0) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should fetch all items from the "Prices > Portfolio" selected section"', function() {
      ThiefHelpers.getListboxClassReference(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer).getChildrenText().then(function(childrenArray) {
        childrenArray.forEach(function(listItem) {
          selectedElements.push(listItem.text);
        });
      });
    });

    it('Should verify if elements under "Client Provided" are added to Selected section', function() {
      var count = 0;
      selectedElements.forEach(function(selectedSectionItem) {
        if (itemsInPricesSelectedSection.indexOf(selectedSectionItem) === -1) {
          count = count + 1;
        }
      });

      if (count < 0) {
        expect(false).customError(count + ' elemenst from "' + selectedElements + '" are not added to selected section');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test Step ID: 404673', function() {
    var selectedItems = [];

    it('Should enter "factset - futures" in the "Price - Available" section input box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, DocumentOptionsPricesPortfolio.getSearchField('Prices')).setText('factset - futures');
    });

    it('Should verify if "factset - futures" is entered in the "Price - Available" section input box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, DocumentOptionsPricesPortfolio.getSearchField('Prices')).getText().then(function(value) {
        if (value !== 'factset - futures') {
          expect(false).customError('"factset - futures" is not entered in the "Price - Available" section input box, instead' + ' found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Derivatives" tree is expanded', function() {
      var item = ThiefHelpers.getListboxClassReference(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer).getGroupByText('Derivatives');
      item.isExpanded().then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Derivatives" is not expanded in "Available section"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click on "FactSet - Futures" under Derivatives from "Prices > Available" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'FactSet - Futures', 'Derivatives', 'Derivatives').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    // Verifying if 'FactSet - Futures' is added to the 'Selected' container
    it('Should verify if "FactSet - Futures"  is added to the "Selected" container', function() {
      ThiefHelpers.getListboxClassReference(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer).getChildrenText().then(function(childrenArray) {
        childrenArray.forEach(function(listItem, index) {
          selectedItems.push(listItem.text);
        });
      }).then(function() {
        if (selectedItems.indexOf('FactSet - Futures') === -1) {
          expect(false).customError('"FactSet - Futures" is not added to selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 404674', function() {
    var itemIndex;
    var selectedItems = [];

    it('Should Fetch the position of "Client Security Master" from "Selected" container before moving', function() {
      ThiefHelpers.getListboxClassReference(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer).getChildrenText().then(function(childrenArray) {
        childrenArray.forEach(function(listItem, index) {
          if (listItem.text === 'Client Security Master') {
            itemIndex = index;
          }
        });
      });
    });

    it('Should select "Client Security Master" from the Prices selected section', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'Client Security Master').select();

      // Verifying if the Item 'Client Security Master' is selected.
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'Client Security Master').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Client Security Master" is not selected in "Selected section"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click the "down" arrow button once', function() {
      ThiefHelpers.getButtonClassReference(undefined, DocumentOptionsPricesPortfolio.getButtonFromSelectedSection('Prices', 'Down')).press();
    });

    it('Should verify if the "Client Security Master" is moved down by 1 position (' + (itemIndex + 1) + ' index)', function() {
      DocumentOptionsPricesPortfolio.getIndexFromPricesSelected('Client Security Master').then(function(index) {
        if (index !== (itemIndex + 1)) {
          expect(false).customError('"Client Security Master" is expected to display at ' + (itemIndex + 1) + ' index but found at ' + index);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should fetch all elements from selected container for future reference', function() {
      ThiefHelpers.getListboxClassReference(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer).getChildrenText().then(function(childrenArray) {
        childrenArray.forEach(function(listItem, index) {
          selectedItems.push(listItem.text);
        });
      });
    });

    it('Should drag "Client Portfolio" to last position in selected container', function() {
      var source = DocumentOptionsPricesPortfolio.getListItem('Client Portfolio', 'Prices', 'Selected');
      var target = DocumentOptionsPricesPortfolio.getListItem(selectedItems[selectedItems.length - 1], 'Prices', 'Selected');

      CommonPageObjectsForPA3.dragItemOrGroupFromSourceAndDropUnderTarget(source, target);
    });

    it('Should verify if the "Client Portfolio" is moved last position (' + (selectedItems.length - 1) + ' index)', function() {
      DocumentOptionsPricesPortfolio.getIndexFromPricesSelected('Client Portfolio').then(function(index) {
        if (index !== (selectedItems.length - 1)) {
          expect(false).customError('"Client Portfolio" is expected to display at ' + (selectedItems.length - 1) + ' index(last position) but found at ' + index);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 404685', function() {

    it('Should click on "X(Clear All)" button to clear selected section', function() {
      ThiefHelpers.getButtonClassReference(undefined, DocumentOptionsPricesPortfolio.getClearSelectedItemsButton('Prices')).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "X" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if selected section is empty', function() {
      ThiefHelpers.getListboxClassReference(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer).getChildrenText().then(function(childrenArray) {
        if (childrenArray.length > 0) {
          expect(false).customError('Selected section is not empty, Found: ' + childrenArray.length);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 404675', function() {
    var selectedItems = [];

    it('Should try to select "MSCI" from the Exchange Rates available section', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathExchangeRatesAvailableContainer, 'MSCI').select().then(function() {
        expect(false).customError('Able to select item from exchange rates "Available" section');
        CommonFunctions.takeScreenShot();
      }, function(error) {
      });
    });

    it('Should try to select "FactSet" from the Exchange Rates selected section', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathExchangeRatesSelectedContainer, 'FactSet').select().then(function() {
        expect(false).customError('Able to select item from exchange rates "Selected" section');
        CommonFunctions.takeScreenShot();
      }, function(error) {
      });
    });

    it('Should try to perform click on "X(Clear All)" button to selected section', function() {
      ThiefHelpers.getButtonClassReference(undefined, DocumentOptionsPricesPortfolio.getClearSelectedItemsButton('EXCHANGE RATES')).press().then(function() {
        expect(false).customError('Able to perform click on X(Clear All) button from Exchange Rates section');
        CommonFunctions.takeScreenShot();
      }, function(error) {
      });
    });

    it('Should verify if "Exchange Rates" section is disabled', function() {
      ThiefHelpers.getDisableableClassReference(ThiefHelpers.getTransferBoxReference(DocumentOptionsPricesPortfolio.xpathExchangeRatesSections + '//tf-transferbox')).isDisabled().then(function(disabled) {
        if (!disabled) {
          expect(false).customError('"Exchange Rates" section is not disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should un-check "Use Price Sources" checkbox under "Portfolio" section', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Price Sources').uncheck();

      // Verifying if Use Price Sources" checkbox is unchecked
      ThiefHelpers.getCheckBoxClassReference('Use Price Sources').isChecked().then(function(boolean) {
        if (boolean) {
          expect(false).customError('"Use Price Sources" checkbox is checked off under "Portfolio" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should drag "MSCI" from "Exchange Rates > Available" section to selected container', function() {
      var source = DocumentOptionsPricesPortfolio.getListItem('MSCI', 'Exchange Rates', 'Available');
      var target = element(by.xpath(DocumentOptionsPricesPortfolio.xpathExchangeRatesSelectedContainer));

      CommonPageObjectsForPA3.dragItemOrGroupFromSourceAndDropUnderTarget(source, target);
    });

    it('Should verify if the "MSCI" is added to Selected section', function() {
      ThiefHelpers.getListboxClassReference(DocumentOptionsPricesPortfolio.xpathExchangeRatesSelectedContainer).getChildrenText().then(function(childrenArray) {
        childrenArray.forEach(function(listItem, index) {
          selectedItems.push(listItem.text);
        });
      }).then(function() {
        if (selectedItems.indexOf('MSCI') === -1) {
          expect(false).customError('"MSCI" is not added to selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 404676', function() {

    it('Should un-check "Use Portfolio Pricing Sources for Benchmark" checkbox under "Prices" section', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Portfolio Pricing Sources for Benchmark').uncheck();

      // Verifying if "Use Portfolio Pricing Sources for Benchmark" checkbox is unchecked
      ThiefHelpers.getCheckBoxClassReference('Use Portfolio Pricing Sources for Benchmark').isChecked().then(function(boolean) {
        if (boolean) {
          expect(false).customError('"Use Portfolio Pricing Sources for Benchmark" checkbox is checked off under "Portfolio" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Benchmark" from "Prices" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Benchmark', 'Prices').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(undefined, 'Benchmark', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Benchmark" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Use Portfolio Pricing Sources for Benchmark" checkbox is un-checked under "Benchmark" section', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Portfolio Pricing Sources for Benchmark').isChecked().then(function(boolean) {
        if (boolean) {
          expect(false).customError('"Use Portfolio Pricing Sources for Benchmark" checkbox is checked under "Benchmark" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 444866', function() {

    it('Should check "Use Portfolio Pricing Sources for Benchmark" checkbox under "Advanced" section', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, DocumentOptionsPricesBenchmark.xpathofCheckbox).check();

      // Verifying if "Use Portfolio Pricing Sources for Benchmark" checkbox is unchecked
      ThiefHelpers.getCheckBoxClassReference(undefined, DocumentOptionsPricesBenchmark.xpathofCheckbox).isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Use Portfolio Pricing Sources for Benchmark" checkbox is un-checked under "Benchmark" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Benchmark - Prices" section is disabled(grayed out)', function() {
      ThiefHelpers.getDisableableClassReference(ThiefHelpers.getTransferBoxReference(DocumentOptionsPricesBenchmark.xpathBenchmarkPricesSection + '//tf-transferbox')).isDisabled().then(function(disabled) {
        if (!disabled) {
          expect(false).customError('"Benchmark - Prices" section is not disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 444865', function() {
    var selectedItems = [];

    it('Should un-check "Use Portfolio Pricing Sources for Benchmark" checkbox under "Benchmark" section', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, DocumentOptionsPricesBenchmark.xpathofCheckbox).uncheck();

      // Verifying if "Use Portfolio Pricing Sources for Benchmark" checkbox is unchecked
      ThiefHelpers.getCheckBoxClassReference(undefined, DocumentOptionsPricesBenchmark.xpathofCheckbox).isChecked().then(function(boolean) {
        if (boolean) {
          expect(false).customError('"Use Portfolio Pricing Sources for Benchmark" checkbox is checked off under "Benchmark" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "Equity" in the "Price - Available" section input box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, DocumentOptionsPricesBenchmark.xpathPricesSectionSearchBox).setText('Equity');
    });

    it('Should verify if "Equity" is entered in the "Price - Available" section input box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, DocumentOptionsPricesBenchmark.xpathPricesSectionSearchBox).getText().then(function(value) {
        if (value !== 'Equity') {
          expect(false).customError('"Equity" is not entered in the "Price - Available" section input box, instead' + ' found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Equity > FactSet" tree is expanded', function() {
      var group = ThiefHelpers.getListboxClassReference(DocumentOptionsPricesBenchmark.xpathPricesAvailableContainer).getGroupByText('Equity').getGroupByText('FactSet');
      group.isExpanded().then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Equity > FactSet" is not expanded in "Available section"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the item "FactSet - Equity - Bid" to highlight', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesBenchmark.xpathPricesAvailableContainer, 'FactSet - Equity - Bid', 'Equity|FactSet', 'Equity|FactSet').select();

      // Verifying if the Item 'FactSet - Equity - Bid' is selected.
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesBenchmark.xpathPricesAvailableContainer, 'FactSet - Equity - Bid', 'Equity|FactSet', 'Equity|FactSet').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"FactSet - Equity - Bid" is not selected in "Available section"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click the right arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection(DocumentOptionsPricesBenchmark.xpathArrowButtonPricesSection);
    });

    it('Should verify if the "FactSet - Equity - Bid" is added to Selected section', function() {
      ThiefHelpers.getListboxClassReference(DocumentOptionsPricesBenchmark.xpathPricesSelectedContainer).getChildrenText().then(function(childrenArray) {
        childrenArray.forEach(function(listItem) {
          selectedItems.push(listItem.text);
        });
      }).then(function() {
        if (selectedItems.indexOf('FactSet - Equity - Bid') === -1) {
          expect(false).customError('"FactSet - Equity - Bid" is not added to selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 404677', function() {
    var selectedItems = [];
    var mutualFundsChildren = [];

    it('Should clear in the "Price - Available" section search box', function() {
      var searchBox = ThiefHelpers.getTextBoxClassReference(undefined, DocumentOptionsPricesBenchmark.xpathPricesSectionSearchBox);

      searchBox.clearText().then(function() {
        searchBox.getText().then(function(text) {
          if (text !== '') {
            expect(false).customError('"Price - Available" section input box in Benchmark tab is not cleared, Found: "' + text + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should fetch elements under "Mutual Funds" for future verification', function() {
      var group = ThiefHelpers.getListboxClassReference(DocumentOptionsPricesBenchmark.xpathPricesAvailableContainer).getGroupByText('Mutual Funds');

      group.expand();

      group.getChildrenText().then(function(childrenArray) {
        childrenArray.forEach(function(element) {
          mutualFundsChildren.push(element.text);
        });
      });
    });

    it('Should collapse "Mutual Funds" from available section', function() {
      var group = ThiefHelpers.getListboxClassReference(DocumentOptionsPricesBenchmark.xpathPricesAvailableContainer).getGroupByText('Mutual Funds');
      group.collapse();
    });

    it('Should double click on "FactSet - Futures" under Derivatives from "Prices > Available" section in Benchmark tab', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesBenchmark.xpathPricesAvailableContainer, 'FactSet - Futures', 'Derivatives').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Should drag "Mutual Funds" from "Prices > Available" section to selected container under "FactSet - Futures"', function() {
      var source = DocumentOptionsPricesBenchmark.getListItem('Mutual Funds', 'Prices', 'Available');
      var target = DocumentOptionsPricesBenchmark.getListItem('FactSet - Futures', 'Prices', 'Selected');

      CommonPageObjectsForPA3.dragItemOrGroupFromSourceAndDropUnderTarget(source, target);
    });

    var availableElements = ['Mutual Funds', 'FactSet - Futures'];

    availableElements.forEach(function(listItem) {
      it('Should verify that "' + listItem + '" is no longer displayed in the available List', function() {
        ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesBenchmark.xpathPricesAvailableContainer, listItem).then(function() {
          expect(false).customError('"' + listItem + '" is still displayed in the available List');
          CommonFunctions.takeScreenShot();
        }, function(err) {

          if (err.toString().indexOf('No direct child') <= 0) {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should verify if the "FactSet - Futures" is added to Selected section', function() {
      ThiefHelpers.getListboxClassReference(DocumentOptionsPricesBenchmark.xpathPricesSelectedContainer).getChildrenText().then(function(childrenArray) {
        childrenArray.forEach(function(listItem) {
          selectedItems.push(listItem.text);
        });
      }).then(function() {
        if (selectedItems.indexOf('FactSet - Futures') === -1) {
          expect(false).customError('"FactSet - Futures" is not added to selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if the elements under "Mutual Funds" are added to Selected section', function() {
      ThiefHelpers.getListboxClassReference(DocumentOptionsPricesBenchmark.xpathPricesSelectedContainer).getChildrenText().then(function(childrenArray) {
        childrenArray.forEach(function(listItem) {
          selectedItems.push(listItem.text);
        });
      }).then(function() {
        mutualFundsChildren.forEach(function(listItem) {
          if (selectedItems.indexOf(listItem) === -1) {
            expect(false).customError('"' + listItem + '" under "Mutual Funds" is not added to selected section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 404678', function() {

    var lipperUsIndex;
    var factSetFuturesIndex;
    var selectedItems = [];

    it('Should fetch the position of "Lipper US" and "FactSet - Futures" from "Prices - Selected" container before moving', function() {
      ThiefHelpers.getListboxClassReference(DocumentOptionsPricesBenchmark.xpathPricesSelectedContainer).getChildrenText().then(function(childrenArray) {
        childrenArray.forEach(function(listItem, index) {
          if (listItem.text === 'Lipper US') {
            lipperUsIndex = index;
          }

          if (listItem.text === 'FactSet - Futures') {
            factSetFuturesIndex = index;
          }

          selectedItems.push(listItem.text);
        });
      });
    });

    it('Should select "Lipper US" from the Prices selected section', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesBenchmark.xpathPricesSelectedContainer, 'Lipper US').select();

      // Verifying if the Item 'Lipper US' is selected.
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesBenchmark.xpathPricesSelectedContainer, 'Lipper US').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Lipper US" is not selected in "Selected section"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click the "Up" arrow button twice', function() {
      for (var i = 1; i <= 2; i++) {
        ThiefHelpers.getTransferBoxReference(DocumentOptionsPricesBenchmark.xpathBenchmarkPricesSection + '//tf-transferbox').target.up();
      }
    });

    it('Should verify the position of "Lipper US" from "Selected" container after moving by 2 positions up', function() {
      DocumentOptionsPricesBenchmark.getIndexFromItemInSelectedSelectedContainer('Lipper US', 'Prices').then(function(index) {
        if (index !== (lipperUsIndex - 2)) {
          expect(false).customError('"Lipper US" is expected to display at ' + (lipperUsIndex - 2) + ' index(last position) but found at ' + index);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "FactSet - Futures" from the Prices selected section', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesBenchmark.xpathPricesSelectedContainer, 'FactSet - Futures').select();

      // Verifying if the Item 'FactSet - Futures' is selected.
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesBenchmark.xpathPricesSelectedContainer, 'FactSet - Futures').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"FactSet - Futures" is not selected in "Selected section"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click the "Down" arrow button to to move selected element to last position', function() {
      for (var i = factSetFuturesIndex; i <= (selectedItems.length - 1); i++) {
        ThiefHelpers.getTransferBoxReference(DocumentOptionsPricesBenchmark.xpathBenchmarkPricesSection + '//tf-transferbox').target.down();
      }
    });

    it('Should fetch the position of "FactSet - Futures" from "Selected" container after moving', function() {
      DocumentOptionsPricesBenchmark.getIndexFromItemInSelectedSelectedContainer('FactSet - Futures', 'Prices').then(function(index) {
        if (index !== (selectedItems.length - 1)) {
          expect(false).customError('"FactSet - Futures" is expected to display at ' + (selectedItems.length - 1) + ' index(last position) but found at ' + index);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 404679', function() {

    it('Should click on "X(Clear All)" button to clear Prices selected section', function() {
      ThiefHelpers.getButtonClassReference(undefined, DocumentOptionsPricesBenchmark.getClearSelectedItemsButton('Prices')).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "X" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if Prices selected section is empty', function() {
      ThiefHelpers.getListboxClassReference(DocumentOptionsPricesBenchmark.xpathPricesSelectedContainer).getChildrenText().then(function(childrenArray) {
        if (childrenArray.length > 0) {
          expect(false).customError('Prices selected section is not empty, Found: ' + childrenArray.length);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 404683', function() {
    var xpathOfCheckbox = CommonFunctions.replaceStringInXpath(DocumentOptionsPricesBenchmark.xpathofCheckbox, 'Use Price Sources');

    it('Should click on the "Use Price Sources" checkbox from the Exchange Rates section', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, xpathOfCheckbox).check();

      // Verifying if "Use Price Source" checkbox is checked off
      ThiefHelpers.getCheckBoxClassReference(undefined, xpathOfCheckbox).isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Use Price Source" checkbox" checkbox is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Benchmark - Prices" section is disabled', function() {
      ThiefHelpers.getDisableableClassReference(ThiefHelpers.getTransferBoxReference(DocumentOptionsPricesBenchmark.xpathBenchmarkPricesSection + '//tf-transferbox')).isDisabled().then(function(disabled) {
        if (!disabled) {
          expect(false).customError('"Benchmark - Prices" section is not disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Benchmark - Exchange Rates" section is disabled', function() {
      ThiefHelpers.getDisableableClassReference(ThiefHelpers.getTransferBoxReference(DocumentOptionsPricesBenchmark.xpathBenchmarkExchangeRatesSection + '//tf-transferbox')).isDisabled().then(function(disabled) {
        if (!disabled) {
          expect(false).customError('"Benchmark - Exchange Rates" section is not disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 404681', function() {

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

    it('Should select "FTSE Global" from Portfolio Split Source drop down and verify', function() {
      ThiefHelpers.selectOptionFromDropDown('FTSE Global', 'Portfolio Split Source');

      // Verifying if drop down is set to "FTSE Global"
      ThiefHelpers.verifySelectedDropDownText('FTSE Global', 'Portfolio Split Source');
    });
  });

  describe('Test Step ID: 404687', function() {

    // Click on "Cancel" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Document Options');

    // check automatic calculation from wrench menu
    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSetAutomaticCalculation(true);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');
  });
});
