'use strict';

var ModifyAccountPaAssetTypesAddRemove = function() {
  this.xpathAvailableContainer = '//*[@data-qa-id="asset-type-transfer-section"]//*[@data-qa-class="available-tree"]';
  this.xpathSelectedContainer = '//*[@data-qa-id="asset-type-transfer-section"]//*[@data-qa-class="selected-tree"]';
  this.xpathAvailableSearchBox = '//*[@data-qa-id="asset-type-transfer-section"]//*[normalize-space(.)="Available"]//tf-textbox';
  this.xpathTransferbox = '//*[@data-qa-id="asset-type-transfer-section"]//tf-transferbox';
  this.xpathTenorDropdown = '//*[@data-qa-id="dropdown-asset-type-options-tenor"]';
};

/****************************************************************************************/
/* Function: getElementInsideTree                                                       */
/* Description: This function is used to get a particular element reference from the    */
/*              "Available" section container.                                          */
/* Params: 1. parentElementPath -> Parent element in which required element is present. */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/*         2. elementName -> Name of the element you want to get the reference of.      */
/*                           Ex: Port. Ending Quantity Held                             */
/*         3. sectionName -> Name of the section from which reference is needed.        */
/*         Ex: Available or Selected.                                                   */
/* Return: Returns the reference of required element.                                   */
/****************************************************************************************/
ModifyAccountPaAssetTypesAddRemove.prototype.getElementInsideTree = function(parentElementPath, elementName, sectionName) {
  // Variable(s)
  var arrElements;
  var xpathParentElement;
  var xpathElement;

  arrElements = parentElementPath.split('|');
  if (sectionName.toLowerCase() === 'available') {
    if (arrElements.length === 1) {
      xpathParentElement = this.xpathAvailableContainer + '//*[@ng-repeat]/tf-listbox-item[descendant::*' +
        '//*[normalize-space(.)="' + arrElements[0] + '"]]/*[contains(@class, "selectable-handle")]';
    } else {
      xpathParentElement = this.xpathAvailableContainer + '//*[@ng-repeat]';
      for (var i = 0; i < arrElements.length; i++) {
        xpathParentElement += '/tf-listbox-item[descendant::*//*[normalize-space(.)="' + arrElements[i] + '"]]' +
          '/*[contains(@class, "selectable-handle")]';

        if (i !== arrElements.length - 1) {
          xpathParentElement += '/following-sibling::*/';
        }
      }
    }
  } else if (sectionName.toLowerCase() === 'selected') {
    if (arrElements.length === 1) {
      xpathParentElement = this.xpathSelectedContainer + '//*[@ng-repeat]/tf-listbox-item[descendant::*' +
        '//*[normalize-space(.)="' + arrElements[0] + '"]]/*[contains(@class, "selectable-handle")]';
    } else {
      xpathParentElement = this.xpathSelectedContainer + '//*[@ng-repeat]/';
      for (var j = 0; j < arrElements.length; j++) {
        xpathParentElement += '/tf-listbox-item[descendant::*//*[normalize-space(.)="' + arrElements[j] + '"]]' +
          '/*[contains(@class, "selectable-handle")]';

        if (j !== arrElements.length - 1) {
          xpathParentElement += '/following-sibling::*/';
        }
      }
    }
  }

  xpathElement = xpathParentElement + '/following-sibling::*//tf-listbox-item[descendant::*' +
    '//*[normalize-space(.)="' + elementName + '"]]';
  return element(by.xpath(xpathElement));
};

/****************************************************************************************/
/* Function: getRadioButtonInViewBy                                                     */
/* Description: This function is used to get reference of radio button from "View By"   */
/*              section of "Asset Types > Add/Remove" option.                           */
/* Params: buttonName -> Name of the radio button.                                      */
/* Return: Returns the reference of required radio button.                              */
/****************************************************************************************/
ModifyAccountPaAssetTypesAddRemove.prototype.getRadioButtonInViewBy = function(buttonName) {
  // Variable(s)
  var xpathRadioButtonInViewBy = '//*[@data-qa-id="radio-button-' + buttonName.toLowerCase().replace(/\s/g, '-') + '"]' +
    '/tf-radio-control';
  return element(by.xpath(xpathRadioButtonInViewBy));
};

/****************************************************************************************/
/* Function: getSearchField                                                             */
/* Description: This function is used to get reference search input box from "Available"*/
/*              section of "Asset Types > Add/Remove".                                  */
/* Params: 1. fieldName -> Name of the field whose reference is required                */
/* Return: Returns the reference of search input box from "Available" section.          */
/****************************************************************************************/
ModifyAccountPaAssetTypesAddRemove.prototype.getSearchField = function(fieldName) {
  var xpathName = '//*[@data-qa-id="asset-type-transfer-section"]//*[normalize-space(.)="' + fieldName + '"]//tf-textbox';
  return element(by.xpath(xpathName));
};

module.exports = new ModifyAccountPaAssetTypesAddRemove();
