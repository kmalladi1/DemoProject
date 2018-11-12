'use strict';

var ModifyAccountPaPricesAdvanced = function() {
  this.xpathTextboxThaiAlien = '//tf-textbox[contains(@ng-model,"textboxModel")]';
  this.xpathCurrencyDropdown = '//*[contains(@class,"adv-opt")]//*[@data-qa-id="dropdown-pricing-currency"]';
};

/************************************************************************************************************/
/* Function: getPortfolioSplitSourceDropdown                                                                */
/* Description: This function is used to get reference of 'Portfolio Split Source' Dropdown.                */
/* Return: Returns the reference of the drop down                                                           */
/************************************************************************************************************/
ModifyAccountPaPricesAdvanced.prototype.getPortfolioSplitSourceDropdown = function() {
  var xpathDropDown = '//*[@data-qa-id="dropdown-pricing-portfolio-split-source"]/tf-button';
  return element(by.xpath(xpathDropDown));
};

/**
 * @function getArrowButtonFromInputbox
 * @description This function is used to get the reference of arrow button from input box.
 * @param {string} arrowName Name of the arrow whose reference is required.
 * @returns {obj} returns object of  arrow button from input box.
 */
ModifyAccountPaPricesAdvanced.prototype.getArrowButtonFromInputbox = function(arrowName) {

  var xpathArrouButton = '//*[@class="spinner spin-' + arrowName.toLowerCase() + '"]';

  return element(by.xpath(xpathArrouButton));
};

module.exports = new ModifyAccountPaPricesAdvanced();
