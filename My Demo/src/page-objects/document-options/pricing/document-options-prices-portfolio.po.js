'use strict';

var DocumentOptionsPricesPortfolio = function() {

  // XPATHs for  available and selected prices containers
  this.xpathPortfolioPricesSection = '//*[@data-qa-id="pricing-portfolio-section"]//*[@data-qa-id="prices-transfer-box-options"]';
  this.xpathPortfolioExchangeRatesSection = '//*[@data-qa-id="pricing-portfolio-section"]//*[@data-qa-id="exchange-rates-transfer-box-options"]';
  this.xpathPricesSections = '//*[@data-qa-id="pricing-portfolio-section"]//*[@data-qa-id="prices-transfer-box-options"]';
  this.xpathExchangeRatesSections = '//*[@data-qa-id="pricing-portfolio-section"]//*[@data-qa-id="exchange-rates-transfer-box-options"]';
  this.xpathPricesAvailableContainer = this.xpathPricesSections + '//*[@data-qa-id="price-sources-available"]';
  this.xpathPricesSelectedContainer = this.xpathPricesSections + '//*[@data-qa-id="price-sources-selected"]';
  this.xpathExchangeRatesAvailableContainer = this.xpathExchangeRatesSections + '//*[@data-qa-id="exchange-rates-available"]';
  this.xpathExchangeRatesSelectedContainer = this.xpathExchangeRatesSections + '//*[@data-qa-id="exchange-rates-selected"]';
  this.xpathToggleAccountDropDown = '//*[@ng-model="portfolioId"]';
  this.xpathPricesSearchField = this.xpathPricesSections + '//tf-textbox';
  this.xpathExchangeRatesSearchField = this.xpathExchangeRatesSections + '//tf-textbox';
  this.xpathOfRequiredDisabledTransferBox = '//*[@data-qa-id="pricing-portfolio-section"]//*[@data-qa-id="replacingText-transfer-box-options"]//tf-disabled-shield';
  this.xpathofCheckbox = '//*[@data-qa-id="pricing-portfolio-section"]//tf-checkbox[normalize-space(.)="replacingText"]';
  this.xpathToggleAccoountButton = '//*[@ng-model="portfolioId"]//span[@tf-button]';
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
DocumentOptionsPricesPortfolio.prototype.getAllListElements = function(sectionName, containerName) {
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
DocumentOptionsPricesPortfolio.prototype.getListItem = function(itemName, sectionName, containerName) {
  // Variable(s)
  var xpathSelectItem;

  if (sectionName.toLowerCase() === 'prices') {
    if (containerName.toLowerCase() === 'available') {
      xpathSelectItem = this.xpathPricesAvailableContainer + '//tf-listbox-item[./tf-listbox-item-handle' + '//*[normalize-space(.)="' + itemName + '"]]';
    } else if (containerName.toLowerCase() === 'selected') {
      xpathSelectItem = this.xpathPricesSelectedContainer + '//tf-listbox-item[./tf-listbox-item-handle' + '//*[normalize-space(.)="' + itemName + '"]]';
    }
  } else if (sectionName.toLowerCase() === 'exchange rates') {
    if (containerName.toLowerCase() === 'available') {
      xpathSelectItem = this.xpathExchangeRatesAvailableContainer + '//tf-listbox-item[./tf-listbox-item-handle' + '//*[normalize-space(.)="' + itemName + '"]]';
    } else if (containerName.toLowerCase() === 'selected') {
      xpathSelectItem = this.xpathExchangeRatesSelectedContainer + '//tf-listbox-item[./tf-listbox-item-handle' + '//*[normalize-space(.)="' + itemName + '"]]';
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
DocumentOptionsPricesPortfolio.prototype.getClearSelectedItemsButton = function(sectionName) {
  // Variable(s)
  var xpathClearListButton;

  if (sectionName.toLowerCase() === 'prices') {
    xpathClearListButton = this.xpathPricesSections + '//tf-transferbox-target-control-clear//span[@tf-button]';
  } else {
    xpathClearListButton = this.xpathExchangeRatesSections + '//tf-transferbox-target-control-clear//span[@tf-button]';
  }

  return element(by.xpath(xpathClearListButton));
};

/************************************************************************************************************/
/* Function: getButtonFromSelectedSection                                                                   */
/* Description: This function is used to get reference of button located on top of 'Selected'               */
/*              container of "PRICES", "EXCHANGE RATES" section.                                            */
/* Params: 1. sectionName -> Name of the section in which button exists.                                    */
/*                           Ex: Prices, Exchange Rates.                                                    */
/* Params: 2. buttonName -> Name of the button.                                                             */
/*                           Ex: up, down, remove.                                                          */
/* Return: Promise which resolves to reference of button.                                                   */
/************************************************************************************************************/
DocumentOptionsPricesPortfolio.prototype.getButtonFromSelectedSection = function(sectionName, buttonName) {
  // Variable(s)
  var xpathButton;

  if (sectionName.toLowerCase() === 'prices') {
    xpathButton = this.xpathPricesSections + '//tf-transferbox-target-controls//span[@tf-button][contains(@icon,"' + buttonName.toLowerCase() + '")]';
  } else {
    xpathButton = this.xpathExchangeRatesSections + '//tf-transferbox-target-controls//span[@tf-button][contains(@icon,"' + buttonName.toLowerCase() + '")]';
  }

  return element(by.xpath(xpathButton));
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
DocumentOptionsPricesPortfolio.prototype.getArrowButton = function(btnName, sectionName) {
  // Variable(s)
  var xpathArrowButton;

  // Setting the default value of "sectionName"
  sectionName = sectionName;
  if (sectionName === undefined) {
    sectionName = 'prices';
  }

  if (sectionName.toLowerCase() === 'prices') {
    xpathArrowButton = this.xpathPricesSections + '//tf-transferbox-transfer-buttons';
  } else if (sectionName.toLowerCase() === 'exchange rates') {
    xpathArrowButton = this.xpathExchangeRatesSections + '//tf-transferbox-transfer-buttons';
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
DocumentOptionsPricesPortfolio.prototype.getElementRemoveButton = function(sectionName, eleName) {
  // Variable(s)
  var xpathElementRemoveButton;

  if (sectionName.toLowerCase() === 'prices') {
    // Hover over the element
    browser.actions().mouseMove(this.getListItem(eleName, sectionName, 'Selected')).perform();

    // Get the XPATH of element's remove icon
    xpathElementRemoveButton = this.xpathPricesSelectedContainer + '/li[@data-value][.="' + eleName + '"]' + '//*[contains( @class, "remove" )]/..';
  } else if (sectionName.toLowerCase() === 'exchange rates') {
    // Hover over the element
    browser.actions().mouseMove(this.getListItem(eleName, sectionName, 'Selected')).perform();

    // Get the XPATH of element's remove icon
    xpathElementRemoveButton = this.xpathExchangeRatesSelectedContainer + '/li[@data-value][.="' + eleName + '"]' + '//*[contains( @class, "remove" )]/..';
  }

  return element(by.xpath(xpathElementRemoveButton));
};

/************************************************************************************************************/
/* Function: getSearchField                                                                                 */
/* Description: This function is used to get the  reference of 'Search' box.                                */
/* Params: 1. sectionName -> Name of the section from which reference of search filed has to be collected.  */
/*                           Ex: Prices or Exchange Rates.                                                  */
/* Return: Promise which resolves to the reference of "Search" field.                                       */
/************************************************************************************************************/
DocumentOptionsPricesPortfolio.prototype.getSearchField = function(sectionName) {
  // Variable(s)
  var xpathSearchField;
  if (sectionName.toLowerCase() === 'prices') {
    xpathSearchField = this.xpathPricesSections + '//tf-transferbox-source//tf-textbox';
  } else if (sectionName.toLowerCase() === 'exchange rates') {
    xpathSearchField = this.xpathExchangeRatesSections + '//tf-transferbox-source//tf-textbox';
  }

  return element(by.xpath(xpathSearchField));
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
DocumentOptionsPricesPortfolio.prototype.getUsePortPricingForBenchCheckBox = function() {
  var xpathCheckBox = '//div[@data-qa-id="pricing-portfolio-section"]' + '//*[@data-qa-id="checkbox-pricing-use-portfolio-pricing-sources-for-benchmark"]/tf-checkbox-control';
  return element(by.xpath(xpathCheckBox));
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
DocumentOptionsPricesPortfolio.prototype.expandElementTree = function(elementPath, excludeElements) {
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

/****************************************************************************************/
/* Function: getElementExpandButton                                                     */
/* Description: This function is used to get reference of expand button for the         */
/*              specified tree element from "Available" container.                      */
/* Params: 1. elementName -> Name of the element you want to get the reference of.      */
/*                           Ex: Client Provided                                        */
/*                                                                                      */
/* Return: Returns the reference of required element.                                   */
/****************************************************************************************/
DocumentOptionsPricesPortfolio.prototype.getElementExpandButton = function(elementName) {
  return element(by.xpath(this.xpathPricesAvailableContainer + '/ul/li/div[.="' + elementName + '"]//a/ancestor::li'));
};

/****************************************************************************************/
/* Function: getIndexFromPricesSelected                                                 */
/* Description: This function is used to get the index of element from the list passed  */
/*              as parameter from the "Selected" container.                             */
/* Params: 1. elementName -> Name of the element you want to get the index of.          */
/*                           Ex: Client Provided                                        */
/*                                                                                      */
/* Return: Return a promise that resolves to the index of element from the list         */
/****************************************************************************************/
DocumentOptionsPricesPortfolio.prototype.getIndexFromPricesSelected = function(elementName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  this.getAllListElements('prices', 'selected').map(function(ele, index) {
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

/****************************************************************************************/
/* Function: checkIfExpanded                                                            */
/* Description: This function is used to check if the passed in tree elements is/are    */
/*              expanded.                                                               */
/* Params: 1. elementPath -> Tree element(s) (separated by "|") which has to verify.    */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/****************************************************************************************/
DocumentOptionsPricesPortfolio.prototype.checkIfExpanded = function(elementPath) {
  // Variable(s)
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
/*              from the "Available" section container.                                 */
/* Params: 1. parentElementPath -> Parent element in which required element is present. */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/*         2. elementName -> Name of the element you want to get the reference of.      */
/*                           Ex: Port. Ending Quantity Held                             */
/* Return: Returns the reference of required element.                                   */
/****************************************************************************************/
DocumentOptionsPricesPortfolio.prototype.getElementFromAvailableSection = function(parentElementPath, elementName) {
  // Variable(s)
  var arrElements;
  var xpathParentElement;

  arrElements = parentElementPath.split('|');
  if (arrElements.length === 1) {
    xpathParentElement = this.xpathPricesAvailableContainer + '//*[normalize-space(.)="' + arrElements[0] + '"]/ancestor::tf-listbox-item';
  } else {
    xpathParentElement = this.xpathPricesAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      if (i !== arrElements.length - 1) {
        xpathParentElement += '/ul/li/div[.="' + arrElements[i] + '"]//a/ancestor::li[not(@style="display: none;")]';
      } else {
        xpathParentElement += '/ul/li/div[.="' + arrElements[i] + '"]//a/ancestor::li[1][not(@style="display: none;")]';
      }
    }
  }

  return element(by.xpath(xpathParentElement + '/ul/li[.="' + elementName + '" and not(@style="display: none;")]'));
};

/****************************************************************************************/
/* Function: getElementFromPricesSelectedContainer                                      */
/* Description: This function is used to get reference of passed element from           */
/*              'Selected' container for "PRICES" section.                              */
/* Params: 1. itemName -> The item name for which reference is needed.                  */
/*                                 Ex: High/Low                                         */
/* Return: Returns promise which resolves to the reference to the required element.     */
/****************************************************************************************/
DocumentOptionsPricesPortfolio.prototype.getElementFromPricesSelectedContainer = function(itemName) {
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(this.xpathPricesSelectedContainer, 'Selected');
  var xpathElement = xpathOfSelectedSection + '//tf-listbox-item[normalize-space(.)="' + itemName + '"]';

  return element(by.xpath(xpathElement));
};

/* ========================================================================================================= */
/*                                      EXCHANGE RATES Section                                               */
/* ========================================================================================================= */

/************************************************************************************************************/
/* Function: getUsePriceSources                                                                             */
/* Description: This function is used to get the reference of 'Use Price Sources' checkbox.                 */
/* Return: Promise which resolves to the reference of checkbox.                                             */
/************************************************************************************************************/
DocumentOptionsPricesPortfolio.prototype.getUsePriceSources = function() {
  var xpathUsePriceSources = '//div[@data-qa-id="pricing-portfolio-section"]' + '//*[@data-qa-id="checkbox-pricing-exchange-rates-use-price-sources"]/tf-checkbox-control';
  return element(by.xpath(xpathUsePriceSources));
};

/******************************************************************************************/
/* Function: getTreeItem                                                                  */
/* Description: This function is used to get reference of item from Available Container.  */
/* Params: itemName    -> Name of the item from Available Container                       */
/*                        Ex: Equity, Derivatives                                         */
/* Params: sectionName -> Name of the section from which reference of item has to be      */
/*                         collected.                                                     */
/*                        Ex: Prices or Exchange Rates.                                   */
/* Params: containerName-> Name of the container from which reference of item has to be   */
/*                         collected.                                                     */
/*                        Ex: Available or Selected.                                      */
/* Return: Promise which resolves to the reference of button from confirmation dialog.    */
/******************************************************************************************/
DocumentOptionsPricesPortfolio.prototype.getTreeItem = function(itemName, sectionName, containerName) {
  // Variable(s)
  var xpathSelectItem;

  if (sectionName.toLowerCase() === 'prices') {
    if (containerName.toLowerCase() === 'available') {
      xpathSelectItem = this.xpathPricesAvailableContainer + '//tf-listbox-item-handle[normalize-space(.)="' + itemName + '"]';
    } else if (containerName.toLowerCase() === 'selected') {
      xpathSelectItem = this.xpathPricesSelectedContainer + '//tf-listbox-item-handle[normalize-space(.)="' + itemName + '"]';
    }
  } else if (sectionName.toLowerCase() === 'exchange rates') {
    if (containerName.toLowerCase() === 'available') {
      xpathSelectItem = this.xpathExchangeRatesAvailableContainer + '/tf-listbox-item[normalize-space(.)="' + itemName + '"]';
    } else if (containerName.toLowerCase() === 'selected') {
      xpathSelectItem = this.xpathExchangeRatesSelectedContainer + '/tf-listbox-item[normalize-space(.)="' + itemName + '"]';
    }
  }

  return element(by.xpath(xpathSelectItem));
};

module.exports = new DocumentOptionsPricesPortfolio();
