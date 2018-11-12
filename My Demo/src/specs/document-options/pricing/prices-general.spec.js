'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: prices-general', function() {

  // variables
  var referenceNumber;
  var optionNumber;
  var listElements = [];
  var eleCount = 0;
  var removeElements = [];
  var xpathCurrencyDropDown = CommonFunctions.replaceStringInXpath(DocumentOptionsPricesAdvanced.xpathDropdown, 'Currency');

  // Local function(s)
  var getCellValue = function(rowName, colIndex) {
    // Variable(s)
    var xpathTable = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="Characteristics"]]' + '//*[@options="ctrl.grid.options"]/*[contains(@class, "slick-frozen-rows") ' + 'and not(contains(@class, "multi-header"))]';
    var defer = protractor.promise.defer();
    var xpathRow;
    var xpathCol;
    var rowReference;
    var cellReference;
    var promise = defer.promise;

    // XPATH of required row
    xpathRow = xpathTable + '//*[contains(@class, "slick-pane slick-pane-top slick-pane-left")]' + '//*[contains(@class, "slick-row") and descendant::*[normalize-space(.)="' + rowName + '"]]';

    // Get the reference of required row
    rowReference = element(by.xpath(xpathRow));
    rowReference.isPresent().then(function(isRowPresent) {
      if (!isRowPresent) {
        // If required row is not found reject the promise with error message
        defer.reject('"' + rowName + '" row is not found in the calculated reported.');
      } else {
        // Get the "style" attribute value of the row
        rowReference.getAttribute('style').then(function(attrValue) {
          // XPATH for required column
          xpathCol = xpathTable + '//*[contains(@class, "slick-pane slick-pane-top slick-pane-right")]' + '//div[@style="' + attrValue.replace(/[\s;]/g, '') + '"]';

          xpathCol += '/*[contains(@class, "slick-cell l' + colIndex + ' r' + colIndex + '")]';

          // Get the reference required cell
          cellReference = element(by.xpath(xpathCol));

          defer.fulfill(cellReference.getText());
        });
      }
    });

    return promise;
  };

  describe('Test Step ID: 542566', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should open "Client:/Pa3/Pa3_docs/QA_Analytics_BofA_Merrill" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('qa-analytics-bofa-merrill');
    });

    var arrValues = [{name: 'Portfolio', value: 'MFI:MLUS00'}, {name: 'Benchmark', value: 'MFI:MLGBMI'}];

    arrValues.forEach(function(text) {
      it('Verifying if "MFI:MLUS00" is in portfolio widget and "MFI:MLGBMI" is in benchmark widget.', function() {
        PA3MainPage.getWidgetBox(text.name).getAttribute('value').then(function(att) {
          if (att !== text.value) {
            expect(false).customError('"' + text.name + '" widget does not contain "' + text.value + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 542566', function() {

    it('Should select "Canadian dollar" from "Currency" drop down', function() {
      // Click 'Currency' drop down
      PA3MainPage.getCurrencyDropDown().click().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Select 'Canadian Dollar' from the drop down
      PA3MainPage.getDropDownItem('Canadian Dollar').click().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that 'Canadian Dollar' is selected
      PA3MainPage.getCurrencyDropDown().getText().then(function(val) {
        if (val.indexOf('Canadian Dollar') < 0) {
          expect(false).customError('"Currency" dropdown did not set to "Canadian Dollar" ');
        }
      });
    });
  });

  describe('Test Step ID: 542568', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Portfolio', 'Prices', 'Document Options');

    it('Should double click on "Derivatives" from "Prices > Available" section', function() {
      ThiefHelpers.getListboxGroup(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'Derivatives').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Verifying that "Derivatives" is no longer displayed in the available List', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'Derivatives').then(function() {
        expect(false).customError('"Derivatives" is displayed in the available List');
        CommonFunctions.takeScreenShot();
      }, function(err) {

        if (err.toString().indexOf('No direct child') <= 0) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "Equity" in the "Price - Available" section input box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, DocumentOptionsPricesPortfolio.getSearchField('Prices')).setText('Equity');
    });

    it('Verifying if "Equity" is entered in the "Price - Available" section input box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, DocumentOptionsPricesPortfolio.getSearchField('Prices')).getText().then(function(value) {
        if (value !== 'Equity') {
          expect(false).customError('"Equity" is not entered in the "Price - Available" section input box, instead' + ' found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Equity > FactSet" tree is expanded', function() {
      var group = ThiefHelpers.getListboxClassReference(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer).getGroupByText('Equity').getGroupByText('FactSet');
      group.isExpanded().then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Equity > FactSet" is not expanded in "Available section"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the item "FactSet - Equity - Bid" to highlight', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'FactSet - Equity - Bid', 'Equity|FactSet', 'Equity|FactSet').select();

      // Verifying if the Item 'FactSet - Equity - Bid' is selected.
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'FactSet - Equity - Bid', 'Equity|FactSet', 'Equity|FactSet').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"FactSet - Equity - Bid" is not selected in "Available section"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click the right arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection(DocumentOptionsPricesPortfolio.getArrowButton('prices'));
    });

    it('Should fetch the position of "FactSet - Equity - Bid" from "Selected" container before moving', function() {
      DocumentOptionsPricesPortfolio.getIndexFromPricesSelected('FactSet - Equity - Bid').then(function(index) {
        referenceNumber = index;
      });
    });

    it('Should click on item "FactSet - Equity - Bid" from "Selected" container to highlight', function() {
      DocumentOptionsPricesPortfolio.getListItem('FactSet - Equity - Bid', 'Prices', 'Selected').click().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if the item 'FactSet - Equity - Bid' from 'Selected' container is highlighted.
      DocumentOptionsPricesPortfolio.getListItem('FactSet - Equity - Bid', 'Prices', 'Selected').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') <= 0) {
          expect(false).customError('"FactSet - Equity - Bid" from "Selected" container is highlighted');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should Click the "up" arrow button', function() {
      for (var i = 1; i <= referenceNumber; i++) {
        ThiefHelpers.getButtonClassReference(undefined, DocumentOptionsPricesPortfolio.getButtonFromSelectedSection('Prices', 'up')).press();
      }
    });

    it('Verifying if the "FactSet - Equity - Bid" is moved up to 1st positions', function() {
      DocumentOptionsPricesPortfolio.getAllListElements('Prices', 'Selected').first().getText().then(function(value) {
        expect(value).toEqual('FactSet - Equity - Bid');
      });
    });

    it('Verifying that expected  elements are present in Selected List ', function() {
      var selectedElements = ['FactSet - Equity - Bid', 'ICE BofAML', 'FactSet - Options - Ask', 'FactSet - Options - Bid', 'FactSet - Options', 'FactSet - Options (Theoretical)', 'FactSet - Futures'];
      var elements;

      elements = DocumentOptionsPricesPortfolio.getAllListElements('Prices', 'Selected');
      elements.each(function(array, index) {
        array.getText().then(function(cname) {
          expect(cname).toEqual(selectedElements[index]);
        });
      });
    });
  });

  describe('Test Step ID: 542569', function() {

    it('Should Fetch the position of "Factset - Options" from "Selected" container before moving', function() {
      DocumentOptionsPricesPortfolio.getIndexFromPricesSelected('FactSet - Options').then(function(index) {
        optionNumber = index;
      });
    });

    it('Should select "FactSet - Options from the Prices selected section, " ', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'FactSet - Options').select();

      // Verifying if the Item 'FactSet - Options' is selected.
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'FactSet - Options').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"FactSet - Options" is not selected in "Available section"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should Click the "down" arrow button twice', function() {
      for (var i = 0; i < 2; i++) {
        ThiefHelpers.getButtonClassReference(undefined, DocumentOptionsPricesPortfolio.getButtonFromSelectedSection('Prices', 'Down')).press();
      }
    });

    it('Verifying if the "FactSet - Options" is moved down by 2 positions', function() {
      expect(DocumentOptionsPricesPortfolio.getIndexFromPricesSelected('FactSet - Options')).toEqual(optionNumber + 2);
    });

    it('Should select "ICE BofAML" from the Prices selected section, ', function() {

      // Fetching count of selected section elements
      listElements = DocumentOptionsPricesPortfolio.getAllListElements('Prices', 'Selected');
      listElements.each(function() {
        eleCount++;
      });

      // Selecting required element
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'ICE BofAML').select();

      // Verifying if the Item 'ICE BofAML' is selected.
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'ICE BofAML').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"ICE BofAML" is not selected in "Available section"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click the down arrow button to place the selected element to the last position', function() {
      for (var i = 0; i < eleCount; i++) {
        ThiefHelpers.getButtonClassReference(undefined, DocumentOptionsPricesPortfolio.getButtonFromSelectedSection('Prices', 'Down')).press();
      }
    });

    it('Verifying if the "ICE BofAML" is moved down to last position', function() {
      DocumentOptionsPricesPortfolio.getAllListElements('Prices', 'Selected').last().getText().then(function(value) {
        expect(value).toEqual('ICE BofAML');
      });
    });
  });

  describe('Test Step ID: 542570', function() {

    it('Should Click on the "X" icon next to Selected in the right corner ', function() {
      DocumentOptionsPricesPortfolio.getClearSelectedItemsButton('Prices').click();
    });

    it('Verifying that Prices "Selected" list is empty', function() {
      eleCount = 0;

      listElements = DocumentOptionsPricesPortfolio.getAllListElements('Prices', 'Selected');
      listElements.each(function() {
        eleCount++;
      });

      expect(eleCount).toEqual(0);
    });

    it('Should un-check the "Use Price Source" option from the Exchange Rates section,', function() {
      DocumentOptionsPricesPortfolio.getUsePriceSources().click().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Use Price Source" is unchecked
      expect(DocumentOptionsPricesPortfolio.getUsePriceSources().getAttribute('data-checked')).toBeNull();
    });

    it('Should double Click on the "FTSE" from the Available Exchange Rates section', function() {
      // Double Clicking on 'Derivatives'
      browser.actions().doubleClick(DocumentOptionsPricesPortfolio.getTreeItem('FTSE', 'Exchange Rates', 'Available')).perform();
    });

    it('Verifying whether "FTSE" is displayed in "Exchange Rates > Selected" section', function() {
      DocumentOptionsPricesPortfolio.getListItem('FTSE', 'Exchange Rates', 'Selected').isPresent().then(function(isPresent) {
        if (!isPresent) {
          expect(false).customError('"FTSE" is not displayed in "Exchange Rates > Selected" section');
          CommonFunctions.takeScreenshot();
        }
      });
    });
  });

  describe('Test Step ID: 542571', function() {

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

    it('Should un-check the "Use Portfolio Pricing Sources for Benchmark" ', function() {
      DocumentOptionsPricesBenchmark.getUsePortPricingForBenchCheckBox().click().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying whether "Use Portfolio Pricing Sources for Benchmark" is unchecked
      expect(DocumentOptionsPricesBenchmark.getUsePortPricingForBenchCheckBox().getAttribute('data-checked')).toBeNull();
    });

    it('Should type "Client" in search field of "Prices > Available" section,', function() {
      DocumentOptionsPricesBenchmark.getSearchField('Prices').sendKeys('Client');

      // Wait for search action to execute
      browser.sleep(2000);
    });

    var groups = ['Additional Security Masters', 'Client Provided'];

    groups.forEach(function(groupName) {

      it('Verifying that "' + groupName + '" tree is expanded', function() {
        var group = ThiefHelpers.getListboxClassReference(DocumentOptionsPricesBenchmark.xpathPricesAvailableContainer).getGroupByText(groupName);
        group.isExpanded().then(function(expanded) {
          if (!expanded) {
            expect(false).customError('"' + groupName + '" is not expanded in "Available section"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should select "Client Portfolio" present under "Client Provided"', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesBenchmark.xpathPricesAvailableContainer, 'Client Portfolio', 'Client Provided', 'Client Provided').select();

      // Verifying if the Item 'Client Portfolio' is selected.
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesBenchmark.xpathPricesAvailableContainer, 'Client Portfolio', 'Client Provided', 'Client Provided').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Client Portfolio" is not selected in "Available section"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Right" arrow icon ', function() {
      ThiefHelpers.sendElementToSelectedSection(DocumentOptionsPricesBenchmark.xpathPricesSections);
    });

    it('Should clear the search box', function() {
      DocumentOptionsPricesBenchmark.getSearchField('Prices').sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE), protractor.Key.ENTER);
    });

    it('Should expand "Equity" from Benchmark "Prices > Available" section', function() {
      var group = ThiefHelpers.getListboxClassReference(DocumentOptionsPricesBenchmark.xpathPricesAvailableContainer).getGroupByText('Equity');
      group.expand();

      // Verify if Equity is expanded
      group.isExpanded().then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Equity" is not expanded in "Available section"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "S&P" from the expanded tree of "Equity" ', function() {
      var group = ThiefHelpers.getListboxClassReference(DocumentOptionsPricesBenchmark.xpathPricesAvailableContainer).getGroupByText('Equity').getGroupByText('S&P');
      group.select();

      // Verifying if the Item 'S&P' is selected.
      group.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"S&P" is not selected in "Available section"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Right" arrow icon ', function() {
      ThiefHelpers.sendElementToSelectedSection(DocumentOptionsPricesBenchmark.xpathPricesSections);
    });

    var selectedElements = ['Client Portfolio', 'S&P - U.S.', 'S&P/ASX', 'S&P Global BMI', 'S&P TSX'];

    selectedElements.forEach(function(eleName) {
      it('Verifying that "' + eleName + '" is present in "Prices > Selected" section', function() {
        expect(DocumentOptionsPricesBenchmark.getListItem(eleName, 'Prices', 'Selected').isPresent()).toBeTruthy();
      });
    });
  });

  describe('Test Step ID: 542572', function() {

    // Note: Please see known issue RPD:12284446
    it('Should Remove each option by selecting it manually from the "Selected" list', function() {
      DocumentOptionsPricesBenchmark.getAllListElements('Prices', 'Selected').then(function(references) {

        references.forEach(function(eleRef) {
          eleRef.getText().then(function(value) {
            removeElements.push(value);
          });
        });
      });

      removeElements.forEach(function(value) {
        DocumentOptionsPricesBenchmark.getElementRemoveButton('Prices', value).click().then(function() {}, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });
  });

  describe('Test Step ID: 542573', function() {
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

    it('Verifying if  Exchange Rates Section gets disabled', function() {
      var eleRef = element(by.xpath(DocumentOptionsPricesBenchmark.xpathExchangeRatesSections + '/parent::*'));
      eleRef.getAttribute('disabled').then(function(flag) {
        if (flag.indexOf('true') === -1) {
          expect(false).customError('"Exchange Rates" section is not disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 542574', function() {

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

    it('Should click drop down icon in the "Portfolio Split Source" field', function() {
      ThiefHelpers.getDropDownSelectClassReference('Portfolio Split Source').open().then(function() {}, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    var dropdownArray = [];
    it('Automation Task: Gathering the Portfolio Split Source drop down elements', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
        dropdownArray = options;
      });
    });

    it('Verifying if the drop down contains all the expected elements', function() {
      var arrPortValFromPage = ['FactSet', 'MSCI', 'FTSE Global', 'MSCI GCC - Gross', 'NZX New Zealand Exchange Indices', 'NZX inc Imputation Credits', 'Saudi Arabia - Tadawul Exchange', 'TA-100 Index', 'STOXX - Europe - Net', 'Tokyo Stk Exch', 'Tokyo Stk Exch - Net', 'ATX Prime Capped Series - Net', 'S&P - U.S.', 'S&P/ASX', 'S&P Global BMI', 'S&P Global ' + 'BMI - Net', 'S&P TSX', 'Madrid Stock Exchange'];
      var takeScreenShot = 0;
      for (var i = 0; i < arrPortValFromPage.length; i++) {
        if (dropdownArray.indexOf(arrPortValFromPage[i]) === -1) {
          expect(false).customError('"Portfolio Split Source" Dropdown do not contains "' + arrPortValFromPage[i] + '" ');
          takeScreenShot++;
          if (takeScreenShot === 1) {
            CommonFunctions.takeScreenShot();
          }
        }
      }
    });
  });

  describe('Test Step ID: 542575', function() {

    it('Should select "Tokyo Stk Exch" from Portfolio Split Source drop down and verify', function() {
      ThiefHelpers.selectOptionFromDropDown('Tokyo Stk Exch', 'Portfolio Split Source');

      // Verifying if drop down is set to "Tokyo Stk Exch"
      ThiefHelpers.verifySelectedDropDownText('Tokyo Stk Exch', 'Portfolio Split Source');
    });

    it('Verifying that "Currency" drop down is displaying "Canadian Dollar"', function() {
      // Verifying that 'Canadian Dollar' is selected
      ThiefHelpers.verifySelectedDropDownText('Canadian Dollar', undefined, xpathCurrencyDropDown, 1);
    });

    it('Should select "U.S.Dollar" from currency drop down', function() {
      // Click 'Currency' drop down
      ThiefHelpers.selectOptionFromDropDown('U.S. Dollar', undefined, xpathCurrencyDropDown, 1);

      // Verifying that 'U.S.Dollar' is selected
      ThiefHelpers.verifySelectedDropDownText('U.S. Dollar', undefined, xpathCurrencyDropDown);
    });
  });

  describe('Test Step ID: 542576', function() {

    // Click on "Cancel" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Document Options');

    // Verifying if "Weights" report is selected in lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Characteristics', true, 'isSelected');

    it('Should click on the "refresh" icon from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Characteristics');

    var count = 0;
    it('Verifying all the values in last column are above "99" except last row', function() {
      var eleRefs = PA3MainPage.getAllElementsFromCalculatedReport('Characteristics', 'slick-pane slick-pane-top slick-pane-left');
      eleRefs.each(function(element) {
        element.getText().then(function() {}, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            eleRefs = PA3MainPage.getAllElementsFromCalculatedReport('Characteristics', 'slick-pane slick-pane-top slick-pane-left');
          } else {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          }
        });
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          eleRefs = PA3MainPage.getAllElementsFromCalculatedReport('Characteristics', 'slick-pane slick-pane-top slick-pane-left');
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      eleRefs.then(function(references) {
        count = references.length;
        references.forEach(function(eleRef, index) {
          eleRef.getText().then(function(value) {
            if (index !== count - 1) {
              getCellValue(value, 4).then(function(val) {
                expect(val).toBeGreaterThanOrEqualTo(99);
              });
            }
          });
        });
      });
    });
  });
});
