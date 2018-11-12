'use strict';
var ModifyAccountPaFixedIncomeAnalyticsSource = function() {
  // XPATHs for  available and selected Portfolio containers
  this.xpathPortfolioSections = '//*[@data-qa-id="fi-as-portfolio-section"]//tf-transferbox';
  this.xpathBenchmarkSections = '//*[@data-qa-id="fi-as-benchmark-section"]//tf-transferbox';
  this.xpathPortfolioAvailableContainer = this.xpathPortfolioSections + '//*[@data-qa-id="analytics-sources-sources-available"]';
  this.xpathPortfolioSelectedContainer = this.xpathPortfolioSections + '//*[@data-qa-id="analytics-sources-sources-selected"]';
  this.xpathBenchmarkAvailableContainer = this.xpathBenchmarkSections + '//*[@data-qa-id="analytics-sources-sources-available"]';
  this.xpathBenchmarkSelectedContainer = this.xpathBenchmarkSections + '//*[@data-qa-id="analytics-sources-sources-selected"]';
};

/**************************************************************************************************************/
/* Function: getCheckboxFromPortfolioSection                                                                  */
/* Description: This function is used to get reference check box by name.                                     */
/* Para: checkboxName-> Check Box Name                                                                        */
/* Return: Returns the reference of check box.                                                                */
/**************************************************************************************************************/
ModifyAccountPaFixedIncomeAnalyticsSource.prototype.getCheckboxFromPortfolioSection = function(checkboxName, option) {
  // Variable(s)
  var xpathCheckbox;
  if (option === undefined) {
    if (checkboxName.toLowerCase() === 'use pricing source hierarchy as source order') {
      xpathCheckbox = '//*[@data-qa-id="checkbox-use-pricing-tab-hierarchy-as-source-order"]/tf-checkbox-control';
    }

    if (checkboxName.toLowerCase() === 'use portfolio sources for benchmark') {
      xpathCheckbox = '//*[@data-qa-id="checkbox-use-portfolio-analytics-sources-for-benchmark"]/tf-checkbox-control';
    }

    if (checkboxName.toLowerCase() === 'apply analytics overrides') {
      xpathCheckbox = '//*[@data-qa-id="checkbox-apply-analytics-overrides"]/tf-checkbox-control';
    }
  } else if (option.toLowerCase() === 'disabled') {
    if (checkboxName.toLowerCase() === 'use portfolio sources for benchmark') {
      xpathCheckbox = '//*[@data-qa-id="checkbox-use-portfolio-analytics-sources-for-benchmark"]';
    }
  }

  return element(by.xpath(xpathCheckbox));
};

/**************************************************************************************************************/
/* Function: getPricingTransferBoxSection                                                                     */
/* Description: This function is used to get reference Pricing Transfer Box Section.                          */
/* Return: Returns the reference of Pricing Transfer Box Section.                                             */
/**************************************************************************************************************/
ModifyAccountPaFixedIncomeAnalyticsSource.prototype.getPricingTransferBoxSection = function(sectionName) {
  // Variable(s)
  var xpathElement;

  if (sectionName.toLowerCase() === 'portfolio') {
    xpathElement = this.xpathPortfolioSections + '//*[@data-qa-class="pricing-transfer-box-section"]';
  }

  if (sectionName.toLowerCase() === 'benchmark') {
    xpathElement = this.xpathBenchmarkSections + '//*[@data-qa-class="pricing-transfer-box-section"]';
  }

  return element(by.xpath(xpathElement));
};

/****************************************************************************************/
/* Function: getElementFromSelectedContainer                                            */
/* Description: This function is used to get reference of passed element from           */
/*              'Selected' container.                                                   */
/* Params: 1. sectionName -> The section name from which element reference is needed.   */
/*                                 Ex: 'portfolio', 'benchmark'                         */
/*         2. itemName -> The item name for which reference is needed.                  */
/*                                 Ex: Fixed income                                     */
/* Return: Returns reference of required element from the "Selected" container.         */
/****************************************************************************************/
ModifyAccountPaFixedIncomeAnalyticsSource.prototype.getElementFromSelectedContainer = function(sectionName, itemName) {
  var xpathElement = '//*[@data-qa-id="fi-as-' + sectionName.toLowerCase() + '-section"]//*[@data-qa-class="pricing-transfer-box-section"]' +
    '//*[contains(@class,"listbox")]//li[normalize-space(.)="' + itemName + '"]';
  return element(by.xpath(xpathElement));
};
/****************************************************************************************/
/* Function: getBenchmarkSection                                                        */
/* Description: This function is used to get Benchmark Section                          */
/* Return: Returns the reference of Benchmark Section.                                  */
/****************************************************************************************/
ModifyAccountPaFixedIncomeAnalyticsSource.prototype.getBenchmarkSection = function() {
  return element(by.xpath('//*[@data-qa-id="fi-as-benchmark-section"][@data-qa-class="pricing-transfer-box-section"]'));
};
/********************************************************************************************************************/
/* Function: isTreeExpanded                                                                                         */
/* Description: This function checks whether the given Tree is expanded in the Shift Point Option box.              */
/*                                                                                                                  */
/* Params: 1. treeName -> Name of the Tree in the Options box.                                                      */
/*                                                                                                                  */
/* Return: Returns promise which refers true if the given Tree is expanded.                                         */
/********************************************************************************************************************/
ModifyAccountPaFixedIncomeAnalyticsSource.prototype.isTreeExpanded = function(treePath) {
  var arrElements = treePath.split('|');
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var xpathExpandButton;

  // Set values for optional parameter
  if (arrElements.length === 1) {
    xpathExpandButton = this.xpathPortfolioAvailableContainer + '/ul/li/div[.="' + arrElements[0] + '"]//a/ancestor::li';

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
    xpathExpandButton = this.xpathPortfolioAvailableContainer;
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
ModifyAccountPaFixedIncomeAnalyticsSource.prototype.expandElementTree = function(elementPath, excludeElements) {
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
    xpathExpandButton = this.xpathPortfolioAvailableContainer + '/ul/li/div[.="' + arrElements[0] + '"]//a';

    // Scroll the element into visibility ( if  not visible )
    Utilities.makeElementVisible(element(by.xpath(xpathExpandButton)));

    element(by.xpath(xpathExpandButton)).click();
  } else {
    xpathExpandButton = this.xpathPortfolioAvailableContainer;
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
ModifyAccountPaFixedIncomeAnalyticsSource.prototype.getListItem = function(itemName, sectionName, containerName) {
  // Variable(s)
  var xpathSelectItem;

  if (sectionName.toLowerCase() === 'portfolio') {
    if (containerName.toLowerCase() === 'available') {
      xpathSelectItem = this.xpathPortfolioAvailableContainer + '//li[@data-value][.="' + itemName + '"]';
    } else if (containerName.toLowerCase() === 'selected') {
      xpathSelectItem = this.xpathPortfolioSelectedContainer + '/li[@data-value][.="' + itemName + '"]';
    }
  } else if (sectionName.toLowerCase() === 'benchmark') {
    if (containerName.toLowerCase() === 'available') {
      xpathSelectItem = this.xpathBenchmarkAvailableContainer + '//li[@data-value][.="' + itemName + '"]';
    } else if (containerName.toLowerCase() === 'selected') {
      xpathSelectItem = this.xpathBenchmarkSelectedContainer + '/li[@data-value][.="' + itemName + '"]';
    }
  }

  return element(by.xpath(xpathSelectItem));
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
ModifyAccountPaFixedIncomeAnalyticsSource.prototype.getArrowButton = function(btnName, sectionName) {
  // Variable(s)
  var xpathArrowButton;
  if (sectionName === undefined) {
    sectionName = 'portfolio';
  }

  if (sectionName.toLowerCase() === 'portfolio') {
    xpathArrowButton = this.xpathPortfolioSections +
      '//*[@class="transfer-source"]//i[contains( @class, "' + btnName.toLowerCase() + '" )]/..';
  } else if (sectionName.toLowerCase() === 'benchmark') {
    xpathArrowButton = this.xpathBenchmarkSections +
      '//div[@class="transfer-target"]//i[contains( @class, "' + btnName.toLowerCase() + '" )]/..';
  }

  return element(by.xpath(xpathArrowButton));
};

/************************************************************************************************************/
/* Function: getAllListElements                                                                             */
/* Description: This function is used to get the reference all the elements either from "Available" or      */
/*              "Selected" container of "Prices" or "Exchange Rates" section.                               */
/* Params: 1. sectionName -> Name of the section from which item references has to be collected.            */
/*                           Ex: Portfolio or Benchmark                                                     */
/*         2. containerName -> Name of the container in which items exists.                                 */
/*                             Ex: Available or Selected.                                                   */
/* Return: Promise which resolves to array of references of all the items from specified container.         */
/* NOTE: This function does not return the reference of tree element from "Available" container of "Prices" */
/*       section. Ex: Fixed Income, Derivatives etc                                                         */
/************************************************************************************************************/
ModifyAccountPaFixedIncomeAnalyticsSource.prototype.getAllListElements = function(sectionName, containerName) {
  if (sectionName.toLowerCase() === 'portfolio') {
    if (containerName.toLowerCase() === 'available') {
      // Return the elements array from the "Available" list
      return element.all(by.xpath(this.xpathPortfolioAvailableContainer + '//tf-listbox-item'));
    } else if (containerName.toLowerCase() === 'selected') {
      // Return the elements array from the "Selected" list
      return element.all(by.xpath(this.xpathPortfolioSelectedContainer + '//tf-listbox-item'));
    }
  }

  if (sectionName.toLowerCase() === 'benchmark') {
    if (containerName.toLowerCase() === 'available') {
      // Return the elements array from the "Available" list
      return element.all(by.xpath(this.xpathBenchmarkAvailableContainer + '//li[text()][@data-value][not( @style )]'));
    } else if (containerName.toLowerCase() === 'selected') {
      // Return the elements array from the "Selected" list
      return element.all(by.xpath(this.xpathBenchmarkSelectedContainer + '//li[text()][@data-value][not( @style )]'));
    }
  }
};

/************************************************************************************************************/
/* Function: getSearchField                                                                                 */
/* Description: This function is used to get the  reference of 'Search' box.                                */
/* Params: 1. sectionName -> Name of the section from which reference of search filed has to be collected.  */
/*                           Ex: Prices or Exchange Rates.                                                  */
/* Return: Promise which resolves to the reference of "Search" field.                                       */
/************************************************************************************************************/
ModifyAccountPaFixedIncomeAnalyticsSource.prototype.getSearchField = function(sectionName) {
  // Variable(s)
  var xpathSearchField;
  if (sectionName.toLowerCase() === 'portfolio') {
    xpathSearchField = this.xpathPortfolioSections + '//tf-textbox';
  } else if (sectionName.toLowerCase() === 'benchmark') {
    xpathSearchField = this.xpathBenchmarkSections + '//tf-textbox';
  }

  return element(by.xpath(xpathSearchField));
};

module.exports = new ModifyAccountPaFixedIncomeAnalyticsSource();
