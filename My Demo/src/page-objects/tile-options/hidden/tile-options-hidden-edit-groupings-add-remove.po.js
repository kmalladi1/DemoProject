'use strict';

var TileOptionsHiddenEditGroupingsAddRemove = function() {
  this.xpathEditGroupings = '//*[@id="edit-exclusions-grouping"]';
  this.xpathOfDialogTransferBox = '//tf-dialog//tf-transferbox';
  this.xpathAvailableContainer = this.xpathEditGroupings + '//*[@data-qa-id="groupings-add-remove-available-section"]' + '//*[@data-qa-id="available-tree" and not(contains(@class, "ng-hide"))]';
  this.xpathSelectedContainer = this.xpathEditGroupings + '//*[@data-qa-id="groupings-add-remove-selected-section"]' + '//*[@data-qa-id="groupings-add-remove-selected-tree"]';
  this.xpathAvailableSectionSearchBox = '//tf-dialog//*[@data-qa-id="groupings-add-remove-available-search-box"]';
  this.xpathOfAvailableOrSelectedContainerItemsAndGroups = '//tf-dialog//*[@data-qa-id="groupings-add-remove-replacingText-section"]//tf-listbox';
  this.xpathOfSaveOrCancelButton = '//tf-dialog//tf-button[normalize-space(.)="replacingText"]';
};

/****************************************************************************************/
/* Function: getElementFromSelectedContainer                                            */
/* Description: This function is used to get reference of passed element from           */
/*              'Selected' container.                                                   */
/* Params: 1. itemName -> The item name for which reference is needed.                  */
/*                                 Ex: High/Low                                         */
/* Return: Returns reference of required element from the "Selected" container.         */
/****************************************************************************************/
TileOptionsHiddenEditGroupingsAddRemove.prototype.getElementFromSelectedContainer = function(itemName) {
  var xpathElement = this.xpathSelectedContainer + '//*[@data-qa-class="selected-item" ' +
    'and normalize-space(.)="' + itemName + '"]/*[contains(@class, "selectable-handle")]';
  return element(by.xpath(xpathElement));
};

/****************************************************************************************/
/* Function: getSearchField                                                             */
/* Description: This function is used to get reference of "Search" field from the       */
/*              "Available" container.                                                  */
/* Return: Returns reference of "Search" field from the "Available" container.           */
/****************************************************************************************/
TileOptionsHiddenEditGroupingsAddRemove.prototype.getSearchField = function() {
  var xpathSearchField = this.xpathEditGroupings + '//*[@data-qa-id="groupings-add-remove-available-search-box"]//input';
  return element(by.xpath(xpathSearchField));
};

/****************************************************************************************/
/* Function: getElementFromAvailableSection                                             */
/* Description: This function is used to get reference of a particular element          */
/*              from the "Available" section.                                           */
/* Params: 1. parentElementPath -> Parent element in which required element is present. */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/*         2. elementName -> Name of the element you want to get the reference of.      */
/*                           Ex: Port. Ending Quantity Held                             */
/* Return: Returns the reference of required element.                                   */
/****************************************************************************************/
TileOptionsHiddenEditGroupingsAddRemove.prototype.getElementFromAvailableSection = function(parentElementPath,
                                                                                             elementName) {
  var xpathParentElement;
  var xpathElement;
  var arrElements = parentElementPath.split('|');
  if (arrElements.length === 1) {
    xpathParentElement = this.xpathAvailableContainer + '//*[@data-qa-class="available-tree-item"]' +
      '//*[normalize-space(.)="' + arrElements[0] + '" and @tf-renamable-text]' +
      '/ancestor::*[@data-qa-class="available-tree-item"][1]';
  } else {
    xpathParentElement = this.xpathAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      xpathParentElement = this.xpathAvailableContainer + '//*[@data-qa-class="available-tree-item"]' +
        '//*[normalize-space(.)="' + arrElements[i] + '" and @tf-renamable-text]' +
        '/ancestor::*[@data-qa-class="available-tree-item"][1]';
    }
  }

  xpathElement = xpathParentElement + '//*[@data-qa-class="available-tree-item"]' +
    '//*[normalize-space(.)="' + elementName + '" and @tf-renamable-text]' +
    '/ancestor::*[@data-qa-class="available-tree-item"][1][last()]';

  return element(by.xpath(xpathElement));
};

/****************************************************************************************/
/* Function: getRemoveButtonOfElementInSelectedSection                                  */
/* Description: This function is used to get reference of remove button of the given    */
/*              element.                                                                */
/* Params: 1. elementName -> Name of the element whose remove button reference is needed*/
/*                           Ex: Economic Sector - FactSet                              */
/* Return: Returns reference of remove button for required element.                     */
/****************************************************************************************/
TileOptionsHiddenEditGroupingsAddRemove.prototype.getRemoveButtonOfElementInSelectedSection = function(elementName) {
  var xpathElement = this.xpathSelectedContainer + '//*[@data-qa-class="selected-item" ' +
    'and descendant::*//*[normalize-space(text())="' + elementName + '"]]';

  // Hover over the given element
  browser.actions().mouseMove(this.getElementFromSelectedContainer(elementName)).perform();

  // Return the reference of remove element button
  return element(by.xpath(xpathElement + '//*[contains(@class, "remove")]'));
};

/****************************************************************************************/
/* Function: getAllElementsFromSelectedSection                                          */
/* Description: This function is used to get reference of all the elements of Selected  */
/*              section.                                                                */
/* Return: Returns array of reference of all the elements from "Selected" section.      */
/****************************************************************************************/
TileOptionsHiddenEditGroupingsAddRemove.prototype.getAllElementsFromSelectedSection = function() {
  var xpathElements = this.xpathSelectedContainer + '//*[@data-qa-class="selected-item"]' +
    '/*[contains(@class, "selectable-handle")]';

  return element.all(by.xpath(xpathElements));
};

module.exports = new TileOptionsHiddenEditGroupingsAddRemove();
