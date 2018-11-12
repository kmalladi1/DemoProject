'use strict';

var DocumentOptionsAssetTypeSearchOrder = function() {
  this.xpathAvailableContainer = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]' +
    '//*[@data-qa-class="available-tree"]';
  this.xpathSelectedContainer = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]' +
    '//*[@data-qa-class="selected-tree"]';
  this.xpathClearAllIcon = '//*[@data-qa-id="asset-type-search-order-view"]//tf-button[contains(@icon,"remove") and ' +
    'descendant::*[normalize-space(.)="Clear All"]]';
};

/****************************************************************************************/
/* Function: getSearchField                                                             */
/* Description: This function is used to get reference search input box from "Available"*/
/*              section of "Asset Types > Search Order".                                */
/* Params: NA                                                                           */
/* Return: Returns the reference of search input box from "Available" section.          */
/****************************************************************************************/
DocumentOptionsAssetTypeSearchOrder.prototype.getSearchField = function() {
  var xpathSearchField = this.xpathAvailableContainer + '/ancestor::tf-transferbox-source//input';
  return element(by.xpath(xpathSearchField));
};

/****************************************************************************************/
/* Function: getArrowButton                                                             */
/* Description: This function is used to get reference of arrow button from "Asset Types*/
/*              Search Order" options.                                                    */
/* Params: btnName -> Name of the button whose reference is required.                   */
/*         Ex: "Left" or "Right".                                                       */
/* Return: Returns the reference of arrow button.                                       */
/****************************************************************************************/
DocumentOptionsAssetTypeSearchOrder.prototype.getArrowButton = function(btnName) {
  // Variable(s)
  var xpathButton = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]' +
    '//*[contains(@icon, "arrow-' + btnName.toLowerCase() + '")]';

  return element(by.xpath(xpathButton));
};

/****************************************************************************************/
/* Function: getAllElements                                                             */
/* Description: This function is used to get reference of all the elements either from  */
/*              "Available" container or from "Selected" container.                     */
/* Params: sectionName -> Name of the section from which element references are needed. */
/* Return: Returns the reference of all the elements from "Available" or "Selected"     */
/*         container.                                                                   */
/****************************************************************************************/
DocumentOptionsAssetTypeSearchOrder.prototype.getAllElements = function(sectionName) {
  // Variable(s)
  var xpathElements;

  if (sectionName.toLowerCase() === 'available') {
    xpathElements = this.xpathAvailableContainer + '//*[@ng-repeat]/tf-listbox-item[not(contains(@class, "ng-hide"))]';
  } else if (sectionName.toLowerCase() === 'selected') {
    xpathElements = this.xpathSelectedContainer + '//*[@ng-repeat]//tf-listbox-item';
  }

  return element.all(by.xpath(xpathElements));
};

/****************************************************************************************/
/* Function: getIndex                                                                   */
/* Description: This function is used to get find the position of given element from    */
/*              "Selected" section.                                                     */
/* Params: elementName -> Element whose position information is required.               */
/* Return: Promise which resolves to the position of given element.                     */
/****************************************************************************************/
DocumentOptionsAssetTypeSearchOrder.prototype.getIndex = function(elementName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  this.getAllElements('selected').map(function(ele, index) {
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
/* Function: expandElementTree                                                          */
/* Description: This function is used to expand the tree elements from "Available"      */
/*              section.                                                                */
/* Params: elementPath -> Path of element tree which has to be expanded.                */
/* Return: NA                                                                           */
/****************************************************************************************/
DocumentOptionsAssetTypeSearchOrder.prototype.expandElementTree = function(elementPath) {
  // Variable(s)
  var arrElements;
  var xpathExpandButton;

  arrElements = elementPath.split('|');
  xpathExpandButton = this.xpathAvailableContainer + '//*[@ng-repeat]';
  for (var i = 0; i < arrElements.length; i++) {
    xpathExpandButton += '/tf-listbox-item[descendant::*//*[normalize-space(.)="' + arrElements[i] + '"]]' +
      '/*[contains(@class, "selectable-handle")]//*[contains(@class, "icon-tree")]';

    // Click the expand button for each element
    element(by.xpath(xpathExpandButton)).click();

    if (i !== arrElements.length - 1) {
      xpathExpandButton += '/ancestor::*[contains(@class, "selectable-handle")]/following-sibling::*/';
    }
  }
};

/****************************************************************************************/
/* Function: checkIfExpanded                                                            */
/* Description: This function is used to check if the tree elements from "Available"    */
/*              section are expanded.                                                   */
/* Params: elementPath -> Path of element tree which has to be verified.                */
/* Return: NA                                                                           */
/****************************************************************************************/
DocumentOptionsAssetTypeSearchOrder.prototype.checkIfExpanded = function(elementPath) {
  // Variable(s)
  var arrElements;
  var xpathParentElement;

  arrElements = elementPath.split('|');
  xpathParentElement = this.xpathAvailableContainer + '//*[@ng-repeat]';

  for (var i = 0; i < arrElements.length; i++) {
    xpathParentElement += '/tf-listbox-item[descendant::*//*[normalize-space(.)="' + arrElements[i] + '"]]' +
      '/*[contains(@class, "selectable-handle")]//*[contains(@class, "icon-tree")]';

    // Click the expand button for each element
    expect(element(by.xpath(xpathParentElement)).getAttribute('class')).toContain('open');

    if (i !== arrElements.length - 1) {
      xpathParentElement += '/ancestor::*[contains(@class, "selectable-handle")]/following-sibling::*/';
    }
  }

  return element(by.xpath(xpathParentElement));
};

/****************************************************************************************/
/* Function: getElementInsideTree                                                       */
/* Description: This function is used to get a particular element reference from the    */
/*              "Available" section container.                                          */
/* Params: 1. parentElementPath -> Parent element in which required element is present. */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/*         2. elementName -> Name of the element you want to get the reference of.      */
/*                           Ex: Port. Ending Quantity Held                             */
/* Return: Returns the reference of required element.                                   */
/****************************************************************************************/
DocumentOptionsAssetTypeSearchOrder.prototype.getElementInsideTree = function(parentElementPath, elementName) {
  // Variable(s)
  var arrElements;
  var xpathParentElement;
  var xpathElement;

  arrElements = parentElementPath.split('|');
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

  xpathElement = xpathParentElement + '/following-sibling::*//tf-listbox-item[descendant::*' +
    '//*[normalize-space(.)="' + elementName + '"]]';

  return element(by.xpath(xpathElement));
};

/****************************************************************************************/
/* Function: getAssetTypeListItem                                                       */
/* Description: This function is used to get a particular element reference from the    */
/*              "Available" or "Selected" section container.                            */
/* Params: 1. itemName -> Name of the element whose reference is needed.                */
/*                                 Ex: Asset Backed.                                    */
/*         2. sectionName -> Name of the section in which element is present.           */
/*                           Ex: "Available" or "Selected"                              */
/* Return: Returns the reference of required element.                                   */
/* NOTE: This function does not get the reference if the element is having sub-elements.*/
/****************************************************************************************/
DocumentOptionsAssetTypeSearchOrder.prototype.getAssetTypeListItem = function(itemName, sectionName) {
  // Variable(s)
  var xpathSelectItem;
  if (sectionName.toLowerCase() === 'available') {
    xpathSelectItem = this.xpathAvailableContainer + '//*[@ng-repeat]' +
      '//tf-listbox-item[normalize-space(.)="' + itemName + '"]';
  } else if (sectionName.toLowerCase() === 'selected') {
    xpathSelectItem = this.xpathSelectedContainer + '//*[@ng-repeat]' +
      '//tf-listbox-item[normalize-space(.)="' + itemName + '"]';
  }

  return element(by.xpath(xpathSelectItem));
};

module.exports = new DocumentOptionsAssetTypeSearchOrder();
