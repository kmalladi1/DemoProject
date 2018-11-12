'use strict';

var DocumentOptionsPricesBenchmark = function() {

  // XPATHs for  available and selected prices containers
  this.xpathBenchmarkPricesSection = '//*[@data-qa-id="pricing-benchmark-section"]//*[@data-qa-id="prices-transfer-box-options"]';
  this.xpathBenchmarkExchangeRatesSection = '//*[@data-qa-id="pricing-benchmark-section"]//*[@data-qa-id="exchange-rates-transfer-box-options"]';
  this.xpathPricesSections = '//*[@data-qa-id="pricing-benchmark-section"]//*[@data-qa-id="prices-transfer-box-options"]';
  this.xpathExchangeRatesSections = '//*[@data-qa-id="options-container" and (not(contains(@class,"ng-hide")))]' +
    '//*[@data-qa-id="exchange-rates-section"]//*[@data-qa-id="exchange-rates-transfer-box-options"]';
  this.xpathPricesAvailableContainer = this.xpathPricesSections + '//*[@data-qa-id="price-sources-available"]';
  this.xpathPricesSelectedContainer = this.xpathPricesSections + '//*[@data-qa-id="price-sources-selected"]';
  this.xpathExchangeRatesAvailableContainer = this.xpathExchangeRatesSections + '//*[@data-qa-id="exchange-rates-available"]';
  this.xpathExchangeRatesSelectedContainer = this.xpathExchangeRatesSections + '//*[@data-qa-id="exchange-rates-selected"]';
  this.xpathArrowButtonPricesSection = this.xpathPricesSections + '//tf-transferbox-transfer-buttons';
  this.xpathOfRequiredDisabledTransferBox = '//*[@data-qa-id="pricing-benchmark-section"]//*[@data-qa-id="replacingText-transfer-box-options"]//tf-disabled-shield';
  this.xpathofCheckbox = '//*[@data-qa-id="pricing-benchmark-section"]//tf-checkbox[normalize-space(.)="Use Portfolio Pricing Sources for Benchmark"]';
  this.xpathOfExchangeRateTransferbox = this.xpathExchangeRatesSections + '//tf-transferbox';
  this.xpathPricesSectionSearchBox = this.xpathBenchmarkPricesSection + '//tf-textbox';
};

/* ========================================================================================================= */
/*                                       Common to both Section                                              */
/* ========================================================================================================= */

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
DocumentOptionsPricesBenchmark.prototype.getAllListElements = function(sectionName, containerName) {
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
DocumentOptionsPricesBenchmark.prototype.getListItem = function(itemName, sectionName, containerName) {
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
/* Function: getClearSelectedItemsButton                                                                    */
/* Description: This function is used to get reference of CLEAR button located on top of 'Selected'         */
/*              container of "PRICES", "EXCHANGE RATES" section.                                            */
/* Params: 1. sectionName -> Name of the section in which button exists.                                    */
/*                           Ex: Prices, Exchange Rates.                                                    */
/* Return: Promise which resolves to reference of button.                                                   */
/************************************************************************************************************/
DocumentOptionsPricesBenchmark.prototype.getClearSelectedItemsButton = function(sectionName) {
  // Variable(s)
  var xpathClearListButton;

  if (sectionName.toLowerCase() === 'prices') {
    xpathClearListButton = this.xpathPricesSections + '//*[contains( @class, "target-container" )]' +
      '//span[@tf-button][normalize-space(.)="Clear All"]';
  } else {
    xpathClearListButton = this.xpathExchangeRatesSections + '//*[contains( @class, "target-container" )]' +
      '//span[@tf-button][normalize-space(.)="Clear All"]';
  }

  return element(by.xpath(xpathClearListButton));
};

/************************************************************************************************************/
/* Function: getArrowButton                                                                                 */
/* Description: This function is used to get reference arrow button either from PRICES or EXCHANGE RATES    */
/*              section.                                                                                    */
/* Params: 1. sectionName -> Name of the section in which button exists.                                    */
/*                           Ex: Prices, Exchange Rates.                                                    */
/*         2. btnName -> Name of the button for which reference has to be collected.                        */
/*                       Ex: Right, Left, Up, Down.                                                         */
/* Return: Promise which resolves to reference of button.                                                   */
/************************************************************************************************************/
DocumentOptionsPricesBenchmark.prototype.getArrowButton = function(sectionName, btnName) {
  // Variable(s)
  var xpathArrowButton;

  if (sectionName.toLowerCase() === 'prices') {
    if (btnName.toLowerCase() === 'right') {
      xpathArrowButton = this.xpathPricesSections + '//*[contains(@class, "right")]/parent::tf-button';
    } else if (btnName.toLowerCase() === 'left') {
      xpathArrowButton = this.xpathPricesSections + '//*[contains( @class, "left" )]//parent::tf-button';
    } else if (btnName.toLowerCase() === 'up') {
      xpathArrowButton = this.xpathPricesSections + '//*[contains( @class, "up" )]//parent::tf-button';
    } else if (btnName.toLowerCase() === 'down') {
      xpathArrowButton = this.xpathPricesSections + '//*[contains( @class, "down" )]//parent::tf-button';
    }
  } else if (sectionName.toLowerCase() === 'exchange rates') {
    if (btnName.toLowerCase() === 'right') {
      xpathArrowButton = this.xpathExchangeRatesSections + '//tf-button[contains( @icon, "right" )]';
    } else if (btnName.toLowerCase() === 'left') {
      xpathArrowButton = this.xpathExchangeRatesSections + '//tf-button[contains( @icon, "left" )]';
    } else if (btnName.toLowerCase() === 'up') {
      xpathArrowButton = this.xpathExchangeRatesSections + '//tf-button[contains( @icon, "up" )]';
    } else if (btnName.toLowerCase() === 'down') {
      xpathArrowButton = this.xpathExchangeRatesSections + '//tf-button[contains( @icon, "down" )]/..';
    }
  }

  return element(by.xpath(xpathArrowButton));
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
DocumentOptionsPricesBenchmark.prototype.getElementRemoveButton = function(sectionName, eleName) {
  // Variable(s)
  var xpathElementRemoveButton;

  if (sectionName.toLowerCase() === 'prices') {
    // Hover over the element
    browser.actions().mouseMove(this.getListItem(eleName, sectionName, 'Selected')).perform();

    // Get the XPATH of element's remove icon
    xpathElementRemoveButton = this.xpathPricesSelectedContainer;
  } else if (sectionName.toLowerCase() === 'exchange rates') {
    // Hover over the element
    browser.actions().mouseMove(this.getListItem(eleName, sectionName, 'Selected')).perform();

    // Get the XPATH of element's remove icon
    xpathElementRemoveButton = this.xpathExchangeRatesSelectedContainer;
  }

  xpathElementRemoveButton += '//*[@ng-repeat]/tf-listbox2-item[descendant::*' +
    '//*[normalize-space(.)="' + eleName + '"]]//*[contains(@class, "icon-remove")]';

  return element(by.xpath(xpathElementRemoveButton));
};

/************************************************************************************************************/
/* Function: getSearchField                                                                                 */
/* Description: This function is used to get the  reference of 'Search' box.                                */
/* Params: 1. sectionName -> Name of the section from which reference of search filed has to be collected.  */
/*                           Ex: Prices or Exchange Rates.                                                  */
/* Return: Promise which resolves to the reference of "Search" field.                                       */
/************************************************************************************************************/
DocumentOptionsPricesBenchmark.prototype.getSearchField = function(sectionName) {
  // Variable(s)
  var xpathSearchField;
  if (sectionName.toLowerCase() === 'prices') {
    xpathSearchField = this.xpathPricesSections + '//input';
  } else if (sectionName.toLowerCase() === 'exchange rates') {
    xpathSearchField = this.xpathExchangeRatesSections + '//input';
  }

  return element(by.xpath(xpathSearchField));
};

/****************************************************************************************/
/* Function: getIndexFromItemInSelectedSelectedContainer                                */
/* Description: This function is used to get the index of element from the list passed  */
/*              as parameter from the "Selected" container.                             */
/* Params: 1. elementName -> Name of the element you want to get the index of.          */
/*                           Ex: Client Provided                                        */
/*         2. sectionName -> Name of section                                            */
/*                           Ex: Prices, Exchange Rates                                 */
/* Return: Return a promise that resolves to the index of element from the list         */
/****************************************************************************************/
DocumentOptionsPricesBenchmark.prototype.getIndexFromItemInSelectedSelectedContainer = function(elementName, sectionName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  this.getAllListElements(sectionName, 'selected').map(function(ele, index) {
    return {
      index: index,
      text: ele.getText(),
    };
  }).then(function(items) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].text === elementName) {
        defer.fulfill(i);
        break;
      }
    }

    defer.reject(elementName + ' not found in the "Selected" list.');
  });
  return promise;
};

/* ========================================================================================================= */
/*                                          PRICES Section                                                   */
/* ========================================================================================================= */

/************************************************************************************************************/
/* Function: getUsePortPricingForBenchCheckBox                                                              */
/* Description: This function is used to get the  reference of 'Use Portfolio Pricing Sources for Benchmark'*/
/*              checkbox.                                                                                   */
/* Return: Promise which resolves to the reference of checkbox.                                             */
/************************************************************************************************************/
DocumentOptionsPricesBenchmark.prototype.getUsePortPricingForBenchCheckBox = function() {
  var xpathCheckBox = '//div[@data-qa-id="pricing-benchmark-section"]' +
    '//*[@data-qa-id="checkbox-pricing-use-portfolio-pricing-sources-for-benchmark"]/tf-checkbox-control';
  return element(by.xpath(xpathCheckBox));
};

/****************************************************************************************/
/* Function: getTreeElementReference                                                    */
/* Description: This function is used to get reference of the specified tree element.   */
/* Params: 1. treeName -> Name of the tree for which reference has to be collected.     */
/*                                 Ex: Fixed Income, Derivatives                        */
/* Return: Promise which resolves to reference of specified tree.                       */
/****************************************************************************************/
DocumentOptionsPricesBenchmark.prototype.getTreeElementReference = function(treeName) {
  // Creating XPATH for  the specif ied tree element
  var xpathTreeElement = this.xpathPricesAvailableContainer + '/ul/li' +
    '/*[contains( @class, "tf-treeview-group-content" )][.="' + treeName + '"]';
  return element(by.xpath(xpathTreeElement));
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
DocumentOptionsPricesBenchmark.prototype.expandElementTree = function(elementPath, excludeElements) {
  var arrElements = elementPath.split('|');
  var arrExcludedElements;
  var xpathExpandButton;
  if (excludeElements === undefined) {
    arrExcludedElements = undefined;
  } else {
    arrExcludedElements = excludeElements.split('|');
  }

  if (arrElements.length === 1) {
    xpathExpandButton = this.xpathPricesAvailableContainer + '/ul/li/div[.="' + arrElements[0] + '"]//a';

    // Scroll the element into visibility ( if  not visible )
    Utilities.scrollElementToVisibility(element(by.xpath(xpathExpandButton)));

    element(by.xpath(xpathExpandButton)).click();
  } else {
    xpathExpandButton = this.xpathPricesAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      xpathExpandButton += '/ul/li/div[.="' + arrElements[i] + '"]//a';

      if (arrExcludedElements === undefined) {
        // Scroll the element into visibility ( if  not visible )
        Utilities.scrollElementToVisibility(element(by.xpath(xpathExpandButton)));

        element(by.xpath(xpathExpandButton)).click();
      } else if (arrExcludedElements.indexOf(arrElements[i]) < 0) {
        // Scroll the element into visibility ( if  not visible )
        Utilities.scrollElementToVisibility(element(by.xpath(xpathExpandButton)));

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

/****************************************************************************************/
/* Function: checkIfExpanded                                                            */
/* Description: This function is used to check if the passed in tree elements is/are    */
/*              expanded.                                                               */
/* Params: 1. elementPath -> Tree element(s) (separated by "|") which has to verify.    */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/****************************************************************************************/
DocumentOptionsPricesBenchmark.prototype.checkIfExpanded = function(elementPath) {
  // Variable( s )
  var arrElements;
  var xpathParentElement;

  arrElements = elementPath.split('|');
  if (arrElements.length === 1) {
    xpathParentElement = this.xpathPricesAvailableContainer + '/ul/li/div[.="' + arrElements[0] + '"]//a/ancestor::li';
    expect(element(by.xpath(xpathParentElement)).getAttribute('class')).toContain('expanded');
  } else {
    xpathParentElement = this.xpathPricesAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      if (i !== arrElements.length - 1) {
        xpathParentElement += '/ul/li/div[.="' + arrElements[i] + '"]//a/ancestor::li';
        if (i === 0) {
          expect(element(by.xpath(xpathParentElement)).getAttribute('class')).toContain('expanded');
        } else {
          expect(element(by.xpath(xpathParentElement + '[1]')).getAttribute('class')).toContain('expanded');
        }
      } else {
        xpathParentElement += '/ul/li/div[.="' + arrElements[i] + '"]//a/ancestor::li[1]';
        expect(element(by.xpath(xpathParentElement)).getAttribute('class')).toContain('expanded');
      }
    }
  }

  return element(by.xpath(xpathParentElement));
};

/****************************************************************************************/
/* Function: getElementFromAvailableSection                                             */
/* Description: This function is used to get reference of a particular element          */
/*              from the "Available" container of 'Prices' section.                     */
/* Params: 1. parentElementPath -> Parent element in which required element is present. */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/*         2. elementName -> Name of the element you want to get the reference of.      */
/*                           Ex: Port. Ending Quantity Held                             */
/* Return: Returns the reference of required element.                                   */
/****************************************************************************************/
DocumentOptionsPricesBenchmark.prototype.getElementFromAvailableSection = function(parentElementPath, elementName, isTree) {
  // Variable( s )
  var arrElements;
  var xpathParentElement;

  // Setting the default value for "isTree" parameter
  if (isTree === undefined) {
    isTree = false;
  }

  arrElements = parentElementPath.split('|');
  if (arrElements.length === 1) {
    xpathParentElement = this.xpathPricesAvailableContainer + '/ul/li/div[.="' + arrElements[0] + '"]//a/ancestor::li';
  } else {
    xpathParentElement = this.xpathPricesAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      if (i !== arrElements.length - 1) {
        xpathParentElement += '/ul/li/div[.="' + arrElements[i] + '"]//a/ancestor::li';
      } else {
        xpathParentElement += '/ul/li/div[.="' + arrElements[i] + '"]//a/ancestor::li[1]';
      }
    }
  }

  if (!isTree) {
    return element(by.xpath(xpathParentElement + '/ul/li[normalize-space(.)="' + elementName + '"]'));
  } else {
    return element(by.xpath(xpathParentElement + '/ul/li[descendant::*[normalize-space(.)="' + elementName + '"]]'));
  }

};

/* ========================================================================================================= */
/*                                      EXCHANGE RATES Section                                               */
/* ========================================================================================================= */

/************************************************************************************************************/
/* Function: getUsePriceSources                                                                             */
/* Description: This function is used to get the reference of 'Use Price Sources' checkbox.                 */
/* Return: Promise which resolves to the reference of checkbox.                                             */
/************************************************************************************************************/
DocumentOptionsPricesBenchmark.prototype.getUsePriceSources = function() {
  var xpathUsePriceSources = '//div[@data-qa-id="pricing-benchmark-section"]' +
    '//*[@data-qa-id="checkbox-pricing-exchange-rates-use-price-sources"]/tf-checkbox-control';
  return element(by.xpath(xpathUsePriceSources));
};

module.exports = new DocumentOptionsPricesBenchmark();
