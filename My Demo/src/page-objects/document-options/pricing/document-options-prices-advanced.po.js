'use strict';

var DocumentOptionsPricesAdvanced = function() {
  this.xpathTaxTableTextbox = '//*[@data-qa-id="options-container"]//*[@data-qa-id="pricing-advanced-section"]' + '//tf-textbox[@name="taxTableTextbox"]';
  this.xpathTextBoxNextToMapThaiAlienCheckBox = '//*[@data-qa-id="checkbox-map-thai-alien-to-parent"]/following-sibling::*//tf-textbox';
  this.xpathDropdown = '//*[@data-qa-id="pricing-advanced-section"]//tf-dropdown-select[contains(@data-qa-id,"replacingText")]';
  this.xpathOfPortfolioSplitSourceDropDownButton = '//*[@data-qa-id="dropdown-pricing-portfolio-split-source"]';
  this.xpathOfCurrencyDropDown = '//*[@data-qa-id="options-container"]//*[@data-qa-id="dropdown-pricing-currency"]';
  this.xpathofCheckbox = '//*[@data-qa-id="pricing-advanced-section"]//tf-checkbox[normalize-space(.)="Use Portfolio Pricing Sources for Benchmark"]';
};

/************************************************************************************************************/
/* Function: getPortfolioSplitSourceInputBox                                                                */
/* Description: This function is used to get reference of 'Portfolio' input box.                            */
/************************************************************************************************************/
DocumentOptionsPricesAdvanced.prototype.getPortfolioSplitSourceInputBox = function() {
  return element(by.xpath('//*[@data-qa-id="dropdown-pricing-portfolio-split-source"]/input'));
};

/************************************************************************************************************/
/* Function: getPortfolioSplitSourceDropDownButton                                                          */
/* Description: This function is used to get reference of 'Portfolio Split Source' Dropdown button.         */
/************************************************************************************************************/
DocumentOptionsPricesAdvanced.prototype.getPortfolioSplitSourceDropDownButton = function() {
  return element(by.xpath('//*[@data-qa-id="dropdown-pricing-portfolio-split-source"]//span[@tf-button]'));
};

/************************************************************************************************************/
/* Function: getCheckbox                                                                                    */
/* Description: This function is used to get reference of specified checkbox in 'Additional Options' pill.  */
/* Params: 1. checkboxName -> Name of the checkbox for which reference is needed.                           */
/*                                 Ex: "Include ADR Currency Return", "Fall back on OMS Data" etc           */
/* Return: Returns the reference specified checkbox.                                                        */
/************************************************************************************************************/
DocumentOptionsPricesAdvanced.prototype.getCheckbox = function(checkboxName) {
  // XPATH of checkbox
  var xpathCheckbox = '//*[@data-qa-id="checkbox-' + checkboxName.replace(/ /g, '-').toLowerCase() + '"]' + '/*[contains(@class, "checkbox")]';
  return element(by.xpath(xpathCheckbox));
};

/***************************************************************************************************************************/
/* Function: getDropDownItem                                                                                               */
/* Description: This function is used to get reference of element from any of the drop down from document options dialog.  */
/* Params: 1. item -> Drop down item for which reference is needed.                                                        */
/*                                 Ex: FactSet, MSCI etc                                                                   */
/* Return: Returns the reference of passed element.                                                                        */
/***************************************************************************************************************************/
DocumentOptionsPricesAdvanced.prototype.getDropDownItem = function(item) {
  var xapthDropDownItem = '//tf-dropdown//*[@ng-repeat and descendant::*//*[normalize-space(.)="' + item + '"]]';
  return element(by.xpath(xapthDropDownItem));
};

/************************************************************************************************************/
/* Function: getAllDropDownItems                                                                            */
/* Description: This function is used to get reference of all drop down items.                              */
/************************************************************************************************************/
DocumentOptionsPricesAdvanced.prototype.getAllDropDownItems = function() {
  var xpathDropDownItems = '//tf-dropdown//*[contains(@class,"tf-selectable-handle") and @tf-selectable-item]';
  return element.all(by.xpath(xpathDropDownItems));
};

/************************************************************************************************************/
/* Function: getCurrencyDropDown                                                                            */
/* Description: This function is used to get reference of "Currency" the drop down.                         */
/* Return: Returns the reference of "Currency" the drop down.                                               */
/************************************************************************************************************/
DocumentOptionsPricesAdvanced.prototype.getCurrencyDropDown = function() {
  // XPATH for "Currency" drop down
  var xpathCurrencyDrop = '//*[@data-qa-id="options-container"]//*[@data-qa-id="dropdown-pricing-currency"]//tf-button';
  return element(by.xpath(xpathCurrencyDrop));
};

/***************************************************************************************************************/
/* Function: getCurrencyDropDownItem                                                                           */
/* Description: This function is used to get reference of option from drop down.                               */
/* Params: optionName -> Name of the option whose reference is needed.                                         */
/* Return: Promise which resolves to the reference of required option from drop down.                          */
/***************************************************************************************************************/
DocumentOptionsPricesAdvanced.prototype.getCurrencyDropDownItem = function(optionName) {
  var xpathDropDownItem = '//*[@data-qa-class="dropdown-option" and normalize-space(.)="' + optionName + '"][1]';

  return element.all(by.xpath(xpathDropDownItem)).first();
};

module.exports = new DocumentOptionsPricesAdvanced();
