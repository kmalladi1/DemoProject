'use strict';
var ModifyAccountPaPricesPortfolio = function() {

  this.xpathPricesSections = '//*[@data-qa-id="prices-transfer-box-options"]//tf-transferbox';
  this.xpathExchangeRatesSections = '//*[@data-qa-id="exchange-rates-transfer-box-options"]//tf-transferbox';
  this.xpathPricesAvailableContainer = this.xpathPricesSections + '//*[@data-qa-id="price-sources-available"]';
  this.xpathPricesSelectedContainer = this.xpathPricesSections + '//*[@data-qa-id="price-sources-selected"]';
  this.xpathExchangeRatesAvailableContainer = this.xpathExchangeRatesSections + '//*[@data-qa-id="exchange-rates-available"]';
  this.xpathExchangeRatesSelectedContainer = this.xpathExchangeRatesSections + '//*[@data-qa-id="exchange-rates-selected"]';
};

/************************************************************************************************************/
/* Function: getListItem                                                                                    */
/* Description: This function is used to get reference of specified element either from 'Available' or      */
/*              'Selected' container of 'PRICES' or 'EXCHANGE RATES' section.                               */
/* Params: 1. itemName -> Name of the element for which reference has to be collected.                      */
/*                       Ex: Client Security Master.                                                        */
/*         2. sectionName -> Name of the section in which element exists.                                   */
/*                           Ex: Prices, Exchange Rates.                                                    */
/*         3. containerName -> Name of the container in which element exists.                               */
/*                             Ex: Available or Selected.                                                   */
/* Return: Promise which resolves reference of specified element.                                           */
/************************************************************************************************************/
ModifyAccountPaPricesPortfolio.prototype.getListItem = function(itemName, sectionName, containerName) {
  // Variable(s)
  var xpathSelectItem;

  if (sectionName.toLowerCase() === 'prices') {
    if (containerName.toLowerCase() === 'available') {
      xpathSelectItem = this.xpathPricesAvailableContainer + '//tf-listbox-item[./tf-listbox-item-handle' +
        '//*[normalize-space(.)="' + itemName + '"]]';
    } else if (containerName.toLowerCase() === 'selected') {
      xpathSelectItem = this.xpathPricesSelectedContainer + '//tf-listbox-item[./tf-listbox-item-handle' +
        '//*[normalize-space(.)="' + itemName + '"]]';
    }
  } else if (sectionName.toLowerCase() === 'exchange rates') {
    if (containerName.toLowerCase() === 'available') {
      xpathSelectItem = this.xpathExchangeRatesAvailableContainer + '//tf-listbox-item[./tf-listbox-item-handle' +
        '//*[normalize-space(.)="' + itemName + '"]]';
    } else if (containerName.toLowerCase() === 'selected') {
      xpathSelectItem = this.xpathExchangeRatesSelectedContainer + '//tf-listbox-item[./tf-listbox-item-handle' +
        '//*[normalize-space(.)="' + itemName + '"]]';
    }
  }

  return element(by.xpath(xpathSelectItem));
};

/************************************************************************************************************/
/* Function: getElementRemoveButton                                                                         */
/* Description: This function is used to get reference 'X' icon for specified element from 'Selected'       */
/*              container of "PRICES", "EXCHANGE RATES" section.                                            */
/* Params: 1. sectionName -> Name of the section in which element exists.                                   */
/*                           Ex: Prices, Exchange Rates.                                                    */
/*         2. eleName -> Name of the element for which 'X' icon reference has to be collected.              */
/* Return: Promise which resolves to reference of 'X' icon.                                                 */
/************************************************************************************************************/
ModifyAccountPaPricesPortfolio.prototype.getElementRemoveButton = function(sectionName, eleName) {
  // Variable(s)
  var xpathElementRemoveButton;

  if (sectionName.toLowerCase() === 'prices') {
    // Hover over the element
    browser.actions().mouseMove(this.getListItem(eleName, sectionName, 'Selected')).perform();

    // Get the XPATH of element's remove icon
    xpathElementRemoveButton = this.xpathPricesSelectedContainer + '/li[@data-value][.="' + eleName + '"]' +
      '//*[contains( @class, "remove" )]/..';
  } else if (sectionName.toLowerCase() === 'exchange rates') {
    // Hover over the element
    browser.actions().mouseMove(this.getListItem(eleName, sectionName, 'Selected')).perform();

    // Get the XPATH of element's remove icon
    xpathElementRemoveButton = this.xpathExchangeRatesSelectedContainer + '/li[@data-value][.="' + eleName + '"]' +
      '//*[contains( @class, "remove" )]/..';
  }

  return element(by.xpath(xpathElementRemoveButton));
};

/************************************************************************************************************/
/* Function: getUsePortPricingForBenchCheckBox                                                              */
/* Description: This function is used to get the  reference of 'Use Portfolio Pricing Sources for Benchmark'*/
/*              checkbox.                                                                                   */
/* Return: Promise which resolves to the reference of checkbox.                                             */
/************************************************************************************************************/
ModifyAccountPaPricesPortfolio.prototype.getUsePortPricingForBenchCheckBox = function() {
  var xpathCheckBox = '//*[@data-qa-id="checkbox-pricing-use-portfolio-pricing-sources-for-benchmark"]/tf-checkbox-control';
  return element(by.xpath(xpathCheckBox));
};

/************************************************************************************************************/
/* Function: getAllListElements                                                                             */
/* Description: This function is used to get the reference all the elements either from "Available" or      */
/*              "Selected" container of "Prices" or "Exchange Rates" section.                               */
/* Params: 1. sectionName -> Name of the section from which item references has to be collected.            */
/*                           Ex: Prices or Exchange Rates                                                   */
/*         2. containerName -> Name of the container in which items exists.                                 */
/*                             Ex: Available or Selected.                                                   */
/* Return: Promise which resolves to array of references of all the items from specified container.         */
/* NOTE: This function does not return the reference of tree element from "Available" container of "Prices" */
/*       section. Ex: Fixed Income, Derivatives etc                                                         */
/************************************************************************************************************/
ModifyAccountPaPricesPortfolio.prototype.getAllListElements = function(sectionName, containerName) {
  if (sectionName.toLowerCase() === 'prices') {
    if (containerName.toLowerCase() === 'available') {
      // Return the elements array from the "Available" list
      return element.all(by.xpath(this.xpathPricesAvailableContainer + '//tf-listbox-item'));
    } else if (containerName.toLowerCase() === 'selected') {
      // Return the elements array from the "Selected" list
      return element.all(by.xpath(this.xpathPricesSelectedContainer + '//tf-listbox-item'));
    }
  }

  if (sectionName.toLowerCase() === 'exchange rates') {
    if (containerName.toLowerCase() === 'available') {
      // Return the elements array from the "Available" list
      return element.all(by.xpath(this.xpathExchangeRatesAvailableContainer + '//tf-listbox-item'));
    } else if (containerName.toLowerCase() === 'selected') {
      // Return the elements array from the "Selected" list
      return element.all(by.xpath(this.xpathExchangeRatesSelectedContainer + '//tf-listbox-item'));
    }
  }
};

/************************************************************************************************************/
/* Function: getUsePortPricingForBenchCheckBox                                                              */
/* Description: This function is used to get the  reference of 'Use Portfolio Pricing Sources for Benchmark'*/
/*              checkbox.                                                                                   */
/* Return: Promise which resolves to the reference of checkbox.                                             */
/************************************************************************************************************/
ModifyAccountPaPricesPortfolio.prototype.getUsePriceSourcesCheckBox = function() {
  var xpathUsePriceSources = '//*[@data-qa-id="checkbox-pricing-exchange-rates-use-price-sources"]/tf-checkbox-control';
  return element(by.xpath(xpathUsePriceSources));
};
/****************************************************************************************/
/* Function: expandElementTree                                                          */
/* Description: This function is used to expand the Tree passed as an argument to the   */
/*              function.                                                               */
/* Params: 1. elementPath -> Path of tree to be expanded.                               */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/*         2. excludeElements -> Specify the elements to be excluded from expanding.    */
/*            for Example, to exclude "FactSet and Portfolio" from "FactSet|Portfolio|  */
/*            Position Data" then parameter should be "FactSet|Portfolio".              */
/****************************************************************************************/
ModifyAccountPaPricesPortfolio.prototype.expandElementTree = function(elementPath, excludeElements) {
  // Variable( s )
  var arrElements;
  var arrExcludedElements;
  var xpathExpandButton;

  arrElements = elementPath.split('|');
  if (excludeElements === undefined) {
    arrExcludedElements = undefined;
  } else {
    arrExcludedElements = excludeElements.split('|');
  }

  if (arrElements.length === 1) {
    xpathExpandButton = this.xpathPricesAvailableContainer + '/ul/li/div[.="' + arrElements[0] + '"]//a';

    // Scroll the element into visibility ( if  not visible )
    Utilities.makeElementVisible(element(by.xpath(xpathExpandButton)));

    element(by.xpath(xpathExpandButton)).click();
  } else {
    xpathExpandButton = this.xpathPricesAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      xpathExpandButton += '/ul/li/div[.="' + arrElements[i] + '"]//a';

      if (arrExcludedElements === undefined) {
        // Scroll the element into visibility ( if  not visible )
        Utilities.makeElementVisible(element(by.xpath(xpathExpandButton)));

        element(by.xpath(xpathExpandButton)).click();
      } else if (arrExcludedElements.indexOf(arrElements[i]) < 0) {
        // Scroll the element into visibility ( if  not visible )
        Utilities.makeElementVisible(element(by.xpath(xpathExpandButton)));

        element(by.xpath(xpathExpandButton)).click();
      } else {
        arrExcludedElements.splice(arrExcludedElements.indexOf(arrElements[i]), 1);
      }

      if (i !== arrElements.length - 1) {
        xpathExpandButton += '/ancestor::li';
      }
    }
  }
};
/********************************************************************************************************************/
/* Function: isTreeExpanded                                                                                         */
/* Description: This function checks whether the given Tree is expanded in the Shift Point Option box.              */
/*                                                                                                                  */
/* Params: 1. treePath -> Name of the Tree in the Options box.                                                      */
/*                                                                                                                  */
/* Return: Returns promise which refers true if the given Tree is expanded.                                         */
/********************************************************************************************************************/
ModifyAccountPaPricesPortfolio.prototype.isTreeExpanded = function(treePath) {
  var arrElements = treePath.split('|');
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var xpathExpandButton;

  // Set values for optional parameter
  if (arrElements.length === 1) {
    xpathExpandButton = this.xpathPricesAvailableContainer + '/ul/li/div[.="' + arrElements[0] + '"]//a/ancestor::li';

    // Get the element into visibility before expanding
    Utilities.makeElementVisible(element(by.xpath(xpathExpandButton)));

    // Verifying if the tree is expanded
    element(by.xpath(xpathExpandButton)).getAttribute('class').then(function(clsVal) {
      if (clsVal.indexOf('expanded') > 0) {
        defer.fulfill(true);
      } else {
        defer.fulfill(false);
      }
    });
  } else {
    xpathExpandButton = this.xpathPricesAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      xpathExpandButton += '/ul/li/div[.="' + arrElements[i] + '"]//a/ancestor::li[1]';
    }

    // Verifying
    element(by.xpath(xpathExpandButton)).getAttribute('class').then(function(clsVal) {
      if (clsVal.indexOf('expanded') > 0) {
        defer.fulfill(true);
      } else {
        defer.fulfill(false);
      }
    });
  }

  return promise;
};

/************************************************************************************************************/
/* Function: getArrowButton                                                                                 */
/* Description: This function is used to get reference of arrow button either from PRICES or EXCHANGE RATES */
/*              section.                                                                                    */
/* Params: 1. btnName -> Name of the button for which reference has to be collected.                        */
/*                       Ex: Right, Left, Up, Down.                                                         */
/*         2. sectionName -> Name of the section in which button exists. Default section name is 'Prices'.  */
/*                           Ex: Prices, Exchange Rates.                                                    */
/* Return: Promise which resolves to reference of button.                                                   */
/************************************************************************************************************/
ModifyAccountPaPricesPortfolio.prototype.getArrowButton = function(btnName, sectionName) {
  // Variable(s)
  var xpathArrowButton;
  if (sectionName === undefined) {
    sectionName = 'prices';
  }

  if (sectionName.toLowerCase() === 'prices') {
    xpathArrowButton = this.xpathPricesSections + '//i[contains( @class, "' + btnName.toLowerCase() + '" )]/..';
  } else if (sectionName.toLowerCase() === 'exchange rates') {
    xpathArrowButton = this.xpathExchangeRatesSections + '//i[contains( @class, "' + btnName.toLowerCase() + '" )]/..';
  }

  return element(by.xpath(xpathArrowButton));
};

/************************************************************************************************************/
/* Function: getSearchField                                                                                 */
/* Description: This function is used to get the  reference of 'Search' box.                                */
/* Params: 1. sectionName -> Name of the section from which reference of search filed has to be collected.  */
/*                           Ex: Prices or Exchange Rates.                                                  */
/* Return: Promise which resolves to the reference of "Search" field.                                       */
/************************************************************************************************************/
ModifyAccountPaPricesPortfolio.prototype.getSearchField = function(sectionName) {
  // Variable(s)
  var xpathSearchField;
  if (sectionName.toLowerCase() === 'prices') {
    xpathSearchField = this.xpathPricesSections + '//tf-textbox';
  } else if (sectionName.toLowerCase() === 'exchange rates') {
    xpathSearchField = this.xpathExchangeRatesSections + '//tf-textbox';
  }

  return element(by.xpath(xpathSearchField));
};

module.exports = new ModifyAccountPaPricesPortfolio();
