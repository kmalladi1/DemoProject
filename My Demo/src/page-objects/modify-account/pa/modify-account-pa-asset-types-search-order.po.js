'use strict';

var ModifyAccountPaAssetTypesSearchOrder = function() {
  this.xpathAvailableContainer = '//*[@data-qa-id="asset-type-search-order-view"]//*[@data-qa-class="available-tree"]';
  this.xpathSelectedContainer = '//*[@data-qa-id="asset-type-search-order-view"]//*[@data-qa-class="selected-tree"]';
  this.xpathTransferbox = '//*[@data-qa-id="asset-type-search-order-view"]//tf-transferbox';
};

/************************************************************************************************************/
/* Function: getElement                                                                                     */
/* Description: This function is used to reference of specific element from the mentioned container.        */
/*                                                                                                          */
/* Params: 1. elementName -> Name of the element whose reference is required.                               */
/*                                 Ex: Client Portfolio, Asset Backed                                       */
/*         2. parentElement -> Name of the Parent element from which element reference is required.         */
/*                                 Ex: Fixed income, Additional MSLs                                        */
/*         3. containerName -> Pass the containerName from which the item reference are needed.             */
/*                                 Ex: Available, Selected                                                   */
/* Return: results a promise which resolves to reference of required element.                               */
/************************************************************************************************************/
ModifyAccountPaAssetTypesSearchOrder.prototype.getElement = function(containerName, elementName, parentElement) {
  // Variable(s)
  var xpathElement;

  if (containerName.toLowerCase() === 'available') {
    xpathElement = this.xpathAvailableContainer;
  } else if (containerName.toLowerCase() === 'selected') {
    xpathElement = this.xpathSelectedContainer;
  }

  if (parentElement === undefined) {
    xpathElement += '//*[@ng-repeat]//tf-listbox-item[not(contains(@class,"ng-hide"))][normalize-space(.)=' +
      '"' + elementName + '"]';
  } else {
    xpathElement += '//*[@ng-repeat]//tf-listbox-item[not(contains(@class,"ng-hide"))]' +
      '//*[normalize-space(.)="' + parentElement + '"]//tf-icon';

    element(by.xpath(xpathElement)).click();

    xpathElement += '/ancestor::tf-listbox-item[not(contains(@class,"ng-hide"))]' +
      '//*[normalize-space(.)="' + elementName + '"]//*[contains(@class,"tf-selectable-handle")]';

  }

  return element(by.xpath(xpathElement));
};

/************************************************************************************************************/
/* Function: getAllListItem                                                                                 */
/* Description: This function is used to reference of all element from the mentioned container.             */
/*                                                                                                          */
/* Params: 1. containerName -> Pass the containerName from which the item reference are needed.             */
/*                                 Ex: Available, Selected                                                  */
/* Return: results a promise which resolves to reference of all element.                                    */
/************************************************************************************************************/
ModifyAccountPaAssetTypesSearchOrder.prototype.getAllListItem = function(containerName) {
  // Variable(s)
  var xpathAllElement;

  if (containerName.toLowerCase() === 'available') {
    xpathAllElement = this.xpathAvailableContainer;
  } else if (containerName.toLowerCase() === 'selected') {
    xpathAllElement = this.xpathSelectedContainer;
  }

  xpathAllElement += '//tf-listbox-item[not(contains(@class, "parent"))]';

  return element.all(by.xpath(xpathAllElement));
};

/************************************************************************************************************/
/* Function: getArrowButton                                                                                 */
/* Description: This function is used to get reference of arrow button.                                     */
/* Params: 1. btnName -> Name of the button for which reference has to be collected.                        */
/*                       Ex: Right, Left, Up, Down.                                                         */
/* Return: Promise which resolves to reference of button.                                                   */
/************************************************************************************************************/
ModifyAccountPaAssetTypesSearchOrder.prototype.getArrowButton = function(btnName) {
  // Variable(s)
  var xpathArrowButton = '//*[@data-qa-id="asset-type-search-order-view"]//*[@type="arrow-' + btnName.toLowerCase() + '-s"]';
  return element(by.xpath(xpathArrowButton));
};

/****************************************************************************************/
/* Function: getAllElementFromSelectedContainer                                         */
/* Description: This function is used to get reference of passed element from           */
/*              'Selected' container.                                                   */
/* Return: results a promise which resolves to reference of all elements.               */
/****************************************************************************************/
ModifyAccountPaAssetTypesSearchOrder.prototype.getAllElementFromSelectedContainer = function() {
  var xpathElements = this.xpathSelectedContainer + '//*[@ng-repeat]//tf-listbox-item[not(contains(@class,"ng-hide"))]';
  return element.all(by.xpath(xpathElements));
};

/************************************************************************************************************/
/* Function: getElementRemoveIcon                                                                           */
/* Description: This function is used to reference of specific element remove icon from the mentioned       */
/*              section and container.                                                                      */
/* Params: 1. elementName -> Name of the element whose reference is required.                               */
/* Return: results a promise which resolves to reference of remove icon of required element.                */
/************************************************************************************************************/
ModifyAccountPaAssetTypesSearchOrder.prototype.getElementRemoveIcon = function(elementName) {
  // Variable(s)
  var xpathElement = this.xpathSelectedContainer + '//*[@ng-repeat]//tf-listbox-item[not(contains(@class,"ng-hide"))]' +
    '[normalize-space(.)="' + elementName + '"]//tf-icon';
  return element(by.xpath(xpathElement));
};

/****************************************************************************************/
/* Function: getSearchField                                                             */
/* Description: This function is used to get reference search input box from "Available"*/
/*              section of "Asset Types > Add/Remove".                                  */
/* Params: 1. fieldName -> Name of the field whose reference is required                */
/* Return: Returns the reference of search input box from "Available" section.          */
/****************************************************************************************/
ModifyAccountPaAssetTypesSearchOrder.prototype.getSearchField = function(fieldName) {
  var xpathName = '//*[@data-qa-id="asset-type-search-order-view"]//*[normalize-space(.)="' + fieldName + '"]//tf-textbox';
  return element(by.xpath(xpathName));
};

module.exports = new ModifyAccountPaAssetTypesSearchOrder();
