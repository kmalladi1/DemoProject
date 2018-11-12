'use strict';

var DocumentOptionsRiskTab = function() {
  this.xpathSpinnerTextBox = '//*[normalize-space(text())="replacingText"]/parent::*//tf-textbox';
  this.xpathIdentifierLookUpButton = '//*[@data-qa-id="risk-universe-market-portfolio-section"]//*[@data-qa-class="button-IdentifierLookup"]';
  this.xpathIdentifierWidgetTextBox = '//*[@data-qa-id="risk-universe-market-portfolio-section"]//*[@data-qa-class="textbox-idWidget"]';
};

// Returns Benchmark tab reference
DocumentOptionsRiskTab.prototype.getPill = function(pillName) {
  // Variable(s)
  var xpathPill;

  if (pillName.toLowerCase() === 'factor groupings') {
    xpathPill = '//div[@id="risk-opts-tab"]//*[@data-qa-id="risk-factor-grouping-pill"]';
  } else if (pillName.toLowerCase() === 'universe') {
    xpathPill = '//div[@id="risk-opts-tab"]//*[@data-qa-id="risk-universe-pill"]';
  }

  return element(by.xpath(xpathPill));
};

//Getting the reference of the content panel of any pill in Document Options dialog
DocumentOptionsRiskTab.prototype.getPillContentPanel = function(pillPanelName) {
  var xpathPillPanel;

  if (pillPanelName.toLowerCase() === 'factor groupings') {
    xpathPillPanel = '//*[@id="risk-edit-factor-groupings-tab" and contains( @class, "ui-tabs-panel" )]';
  } else if (pillPanelName.toLowerCase() === 'universe') {
    xpathPillPanel = '//*[@id="risk-universe-tab" and contains( @class, "ui-tabs-panel" )]';
  }

  return element(by.xpath(xpathPillPanel));
};

/**
 * @function getDataView
 * @description This function is used to get the data view from slickgrid.
 * return {promise} An array of JSON objects resolving to rows of data from slickgrid.
 */
DocumentOptionsRiskTab.prototype.getDataView = function() {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var grid;
  var dv;
  var allData;
  grid = element(by.xpath('//*[contains(@class,"form-group")]//*[contains(@class,"tf-slick-grid")]'));
  grid.getAttribute('tf-slick-data-view').then(function(name) {
    dv = name;
  }).then(function() {
    grid.evaluate(dv + '.getItems()').then(function(rowItems) {
      allData = rowItems;
      defer.fulfill(allData);
    });
  });

  return promise;
};

/**
 * @function getColumnView
 * @description This function is used to get the column view from slickgrid.
 * return {promise} An array of JSON objects resolving to columns details from slickgrid.
 */
DocumentOptionsRiskTab.prototype.getColumnView = function() {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var grid;
  grid = element(by.xpath('//*[contains(@class,"form-group")]//*[contains(@class,"tf-slick-grid")]'));
  grid.evaluate('ctrl.columns').then(function(name) {
    defer.fulfill(name);
  });

  return promise;
};

/**
 * @function getColumnData
 * @description This function is used to get the column data from slickgrid.
 * @param {string} columnName Name of Column.
 * return {promise} An array resolving to column data.
 */
DocumentOptionsRiskTab.prototype.getColumnData = function(columnName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var key1 = 'name';
  var key2 = 'field';
  var fieldValue;
  var _this = this;
  var columnData = [];

  _this.getColumnView().then(function(columnView) {
    columnView.forEach(function(ele, index) {
      if (ele[key1].replace('<br>', ' ').replace('<br>', ' ').replace('<br>', ' ').replace('&lt;', '<') === columnName) {
        fieldValue = ele[key2];
      } else if (columnView.length === index + 1 && fieldValue === undefined) {
        defer.reject('The column ' + columnName + ' is not available');
      }
    });
  }).then(function() {
    _this.getDataView().then(function(dataView) {
      dataView.forEach(function(ele) {
        if (ele[fieldValue][key1] === undefined) {
          columnData.push(ele[fieldValue]);
        } else {
          columnData.push(ele[fieldValue][key1]);
        }
      });
    });
  }).then(function() {
    defer.fulfill(columnData);
  });

  return promise;
};

/**
 * @function setMarketPortfolio
 * @description This function is used to set the portfolio for the document launched.
 * @param {string} portfolioTicker Ticker to be entered into the portfolio input box
 * Ex: spn:sp50.
 * @param {string} optionToSelect Portfolio to be selected from the type ahead list.
 * Ex: Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT
 * @param {string} expectedPortfolioFullName Expected portfolio name that is displayed in the portfolio widget.
 * Ex: Client:/NEW_PA_TEST_SUITE/PRICING/SPN_SP50_ACCT.ACCT
 * @param {string} [selectFromTypeAheadDirectly=true] Accepts boolean value. If you want to select portfolio directly from the
 * type ahead set it to TRUE else FALSE. Default is set to TRUE.
 * @param {string} [selectFromTypeAheadUsingKeyboardArrows=false] Set it to TRUE if you want to to select portfolio using arrow
 * keys from keyboard. Default set to FALSE.
 * @returns {promise} TRUE if portfolio is selected else FALSE
 */
DocumentOptionsRiskTab.prototype.setMarketPortfolio = function(portfolioTicker, optionToSelect, expectedPortfolioFullName,
                                                                selectFromTypeAheadDirectly, selectFromTypeAheadUsingKeyboardArrows) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var xpathPortfolioInputBox = '//*[@data-qa-id="options-container"]//*[@data-qa-class="textbox-idWidget"]//input';
  var portfolioInputBox = element(by.xpath(xpathPortfolioInputBox));

  // Initializing the optional variables
  if (selectFromTypeAheadDirectly === undefined) {
    selectFromTypeAheadDirectly = true;
  }

  if (selectFromTypeAheadUsingKeyboardArrows === undefined) {
    selectFromTypeAheadUsingKeyboardArrows = false;
  }

  // Click into "portfolio" widget
  portfolioInputBox.click();

  // Clear the default portfolio selected (if exists)
  portfolioInputBox.clear();

  // Enter the text into the Portfolio Input Box
  portfolioInputBox.sendKeys(portfolioTicker);

  // Wait for the type ahead box to appear
  var xpathTypeAhead = '//*[@data-qa-class="typeahead-results"]';
  Utilities.waitUntilElementAppears(element(by.xpath(xpathTypeAhead)), 6000);

  // Select the option from the type ahead list if selectFromTypeAheadDirectly == true
  if (selectFromTypeAheadDirectly) {
    // Check if type ahead appeared, if yes, select the required option
    var typeAhead = element(by.xpath(xpathTypeAhead));
    typeAhead.isPresent().then(function(listFound) {
      if (!listFound) {
        defer.reject('Type ahead did not appear after typing into the Portfolio widget.');
      } else {
        // Find the required option in the type ahead list
        var xpathOption = xpathTypeAhead + '//*[@data-qa-class="pa-typeahead-item" ' +
          'and @data-value="' + optionToSelect + '"] | ' + xpathTypeAhead + '//*[@data-qa-class="pa-typeahead-item" ' +
          'and descendant::*//*[normalize-space(.)="' + optionToSelect + '"]]';
        var refOption = element(by.xpath(xpathOption));
        Utilities.scrollElementToVisibility(refOption);
        refOption.isPresent().then(function(optionFound) {
          // If required option is not found reject the promise
          if (!optionFound) {
            defer.reject('"' + optionToSelect + '" Portfolio is not found in the type ahead.');
          } else {
            // Select the required option
            refOption.click();

            // Check if required portfolio is selected
            portfolioInputBox.getAttribute('value').then(function(portfolioValue) {
              if (portfolioValue.toLowerCase() !== expectedPortfolioFullName.toLowerCase()) {
                defer.reject('"' + expectedPortfolioFullName + '" portfolio is not found in the Portfolio widget ' +
                  'on selecting "' + optionToSelect + '" from type ahead.');
              } else {
                defer.fulfill(true);
              }
            });
          }
        });
      }
    });
  } else if (selectFromTypeAheadUsingKeyboardArrows) {
    // Get the reference of all the Portfolios from Type Ahead
    var allPortfolios = element.all(by.xpath(xpathTypeAhead + '//*[@data-qa-class="pa-typeahead-item"]'));

    // Click on keyboard's DOWN arrow button
    portfolioInputBox.sendKeys(protractor.Key.DOWN);

    // Iterate through each element until required portfolio is found
    allPortfolios.map(function(eleRef) {
      return {
        value: eleRef.getAttribute('data-value'),
      };
    }).then(function(items) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].value === optionToSelect) {
          Utilities.scrollElementToVisibility(allPortfolios.get(i));
          allPortfolios.get(i).click();
          defer.fulfill(true);
        } else {
          if (i === items.length - 1) {
            defer.reject('"' + optionToSelect + '" portfolio is not found in the type ahead.');
          } else {
            // Click on keyboard's DOWN arrow button
            portfolioInputBox.sendKeys(protractor.Key.DOWN);
          }
        }
      }
    });
  } else {
    defer.fulfill(true);
  }

  return promise;
};

module.exports = new DocumentOptionsRiskTab();
