'use strict';

var TileOptionsExclusionsEditGroupingsAddRemove = function() {
  this.xpathEditGroupings = '//*[@id="edit-exclusions-grouping"]';
  this.xpathAvailableContainer = this.xpathEditGroupings + '//*[@data-qa-id="groupings-add-remove-available-section"]' +
    '//*[@data-qa-id="available-tree" and not(contains(@class, "ng-hide"))]';
  this.xpathSelectedContainer = this.xpathEditGroupings + '//*[@data-qa-id="groupings-add-remove-selected-section"]' +
    '//*[@data-qa-id="groupings-add-remove-selected-tree"]';
  this.xpathRenameTextbox = '//tf-listbox-item-title-container[normalize-space(.)="replacingText"]//tf-textbox';
  this.xpathButtonFromDialogBox = '//*[contains(@class,"dialog")]//*[@type="button"][normalize-space(.)="replacingText"]';
  this.xpathClearAllButton = '//tf-dialog[@style and descendant::*//*[contains(., "Edit Groupings")]]//span[contains(@icon, "remove")]';
};

/****************************************************************************************/
/* Function: getElementFromSelectedContainer                                            */
/* Description: This function is used to get reference of passed element from           */
/*              'Selected' container.                                                   */
/* Params: 1. itemName -> The item name for which reference is needed.                  */
/*                                 Ex: High/Low                                         */
/* Return: Returns reference of required element from the "Selected" container.         */
/****************************************************************************************/
TileOptionsExclusionsEditGroupingsAddRemove.prototype.getElementFromSelectedContainer = function(itemName) {
  var xpathElement = this.xpathSelectedContainer + '//*[@data-qa-class="selected-item" ' +
    'and descendant::*//*[normalize-space(text())="' + itemName + '"]]';
  return element(by.xpath(xpathElement));
};

/****************************************************************************************/
/* Function: getSearchField                                                             */
/* Description: This function is used to get reference of "Search" field from the       */
/*              "Available" container.                                                  */
/* Return: Returns reference of "Search" field from the "Available" container.          */
/****************************************************************************************/
TileOptionsExclusionsEditGroupingsAddRemove.prototype.getSearchField = function() {
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
TileOptionsExclusionsEditGroupingsAddRemove.prototype.getElementFromAvailableSection = function(parentElementPath,
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
TileOptionsExclusionsEditGroupingsAddRemove.prototype.getRemoveButtonOfElementInSelectedSection = function(elementName) {
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
TileOptionsExclusionsEditGroupingsAddRemove.prototype.getAllElementsFromSelectedSection = function() {
  var xpathElements = this.xpathSelectedContainer + '//*[@data-qa-class="selected-item"]';

  return element.all(by.xpath(xpathElements));
};

/****************************************************************************************/
/* Function: checkIfExpanded                                                            */
/* Description: This function is used to check if given element is expanded.            */
/* Params: 1. elementPath -> Path of tree to be to be verified.                         */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/****************************************************************************************/
TileOptionsExclusionsEditGroupingsAddRemove.prototype.checkIfExpanded = function(elementPath) {
  var arrElements = elementPath.split('|');
  var xpathParentElement;
  if (arrElements.length === 1) {
    xpathParentElement = this.xpathAvailableContainer + '//*[@data-qa-class="available-tree-item"]' +
      '//*[normalize-space(.)="' + arrElements[0] + '" and @tf-renamable-text]' +
      '/ancestor::*[@data-qa-class="available-tree-item"][1]';
    expect(element.all(by.xpath(xpathParentElement)).first().getAttribute('class')).toContain('expanded');
  } else {
    xpathParentElement = this.xpathAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      xpathParentElement += '//*[@data-qa-class="available-tree-item"]' +
        '//*[normalize-space(.)="' + arrElements[i] + '" and @tf-renamable-text]' +
        '/ancestor::*[@data-qa-class="available-tree-item"][1]';

      expect(element.all(by.xpath(xpathParentElement)).first().getAttribute('class')).toContain('expanded');
    }
  }

  return element(by.xpath(xpathParentElement));
};

/****************************************************************************************/
/* Function: expandElementTree                                                          */
/* Description: This function is used to expand the Tree passed as an argument to the   */
/*              function.                                                               */
/* Params: 1. elementPath -> Path of tree to be expanded.                               */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/*         2. excludeElements -> Specify the elements to be excluded from expanding.    */
/*            For Example, to exclude "FactSet and Portfolio" from "FactSet|Portfolio|  */
/*            Position Data" then parameter should be "FactSet|Portfolio".              */
/****************************************************************************************/
TileOptionsExclusionsEditGroupingsAddRemove.prototype.expandElementTree = function(elementPath, excludeElements) {
  var arrElements = elementPath.split('|');
  var arrExcludedElements;
  var xpathExpandButton;

  if (excludeElements === undefined) {
    arrExcludedElements = undefined;
  } else {
    arrExcludedElements = excludeElements.split('|');
  }

  if (arrElements.length === 1) {
    xpathExpandButton = this.xpathAvailableContainer + '//*[@data-qa-class="available-tree-item"]' +
      '//*[normalize-space(.)="' + arrElements[0] + '" and @tf-renamable-text]' +
      '/ancestor::*[contains(@class, "selectable-handle")]//*[contains(@class, "icon-tree")]';

    // Make the element visible before expanding
    Utilities.makeElementVisible(element(by.xpath(xpathExpandButton)));

    element(by.xpath(xpathExpandButton)).click();
  } else {
    xpathExpandButton = this.xpathAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      xpathExpandButton += '//*[@data-qa-class="available-tree-item"]' +
        '//*[normalize-space(.)="' + arrElements[i] + '" and @tf-renamable-text]' +
        '/ancestor::*[contains(@class, "selectable-handle")]//*[contains(@class, "icon-tree")]';

      if (arrExcludedElements === undefined) {
        // Make the element visible before expanding
        Utilities.makeElementVisible(element(by.xpath(xpathExpandButton)));

        element(by.xpath(xpathExpandButton)).click();
      } else if (arrExcludedElements.indexOf(arrElements[i]) < 0) {
        // Make the element visible before expanding
        Utilities.makeElementVisible(element(by.xpath(xpathExpandButton)));

        element(by.xpath(xpathExpandButton)).click();
      } else {
        arrExcludedElements.splice(arrExcludedElements.indexOf(arrElements[i]), 1);
      }

      if (i !== arrElements.length - 1) {
        xpathExpandButton += '/ancestor::*[contains(@class, "selectable-handle")]' +
          '/following-sibling::*[@data-qa-class="available-tree-group"]';
      }
    }
  }
};

/****************************************************************************************/
/* Function: getIconFromList                                                            */
/* Description: This function is used to get a "Rename" icon reference of given "Column"*/
/*              either from "Available" or "Selected" section.                          */
/* Params: 1. sectionName -> Name of the section from which reference is needed.        */
/*            Ex: "Available" or "Selected".                                            */
/*         2. colName -> Name of the column whose "Rename" icon reference is required.  */
/*                           Ex: Port. Ending Quantity Held                             */
/*         3. parentElementPath (Optional) -> Parent element in which required column   */
/*                                            is present.                               */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/*         4. iconName -> Name of the icon whose reference is required.                 */
/*                         Ex: option, remove                                           */
/* Return: Returns the reference of required column's icon.                             */
/****************************************************************************************/
TileOptionsExclusionsEditGroupingsAddRemove.prototype.getIconFromList = function(iconName, sectionName, colName, parentElementPath) {
  // Set the optional variable
  if (parentElementPath === undefined) {
    parentElementPath = '';
  }

  // Variable(s)
  var xpathColumn;
  var arrElements = parentElementPath.split('|');
  var xpathParentElement;
  var xpathRenameButton;

  if (sectionName.toLowerCase() === 'available') {
    // Creating the XPATH for the required column from "Available" section
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

    // XPATH of required column
    xpathColumn = xpathParentElement + '//*[@data-qa-class="available-tree-item"]' +
      '//*[normalize-space(.)="' + colName + '" and @tf-renamable-text]' +
      '/ancestor::*[@data-qa-class="available-tree-item"][1]/*[contains(@class, "selectable-handle")]';

  } else if (sectionName.toLowerCase() === 'selected') {
    xpathColumn = this.xpathSelectedContainer + '//*[@data-qa-class="selected-item" ' +
      'and normalize-space(.)="' + colName + '"]/*[contains(@class, "selectable-handle")]';
  }

  // Scroll the element into visibility
  Utilities.makeElementVisible(element.all(by.xpath(xpathColumn)).last());

  // Hover over the required column
  browser.actions().mouseMove(element.all(by.xpath(xpathColumn)).last()).perform();

  // XPATH of required column's Edit button
  xpathRenameButton = xpathColumn + '//*[contains(@class, "' + iconName.toLowerCase() + '")]';

  return element.all(by.xpath(xpathRenameButton)).last();

};

/****************************************************************************************/
/* Function: getRenameBox                                                               */
/* Description: This function is used to get the reference of the rename textbox from   */
/*              "Available" section list item.                                          */
/* Params: 1.  item -> Name of the item from which rename box is required.              */
/*                     Ex: Default Group, PD                                            */
/* Return: Returns the reference of the  rename box from list item.                     */
/****************************************************************************************/
TileOptionsExclusionsEditGroupingsAddRemove.prototype.getRenameBox = function(item) {
  var xpathName = '//tf-listbox-item-title-container[normalize-space(.)="' + item + '"]//tf-textbox/input';
  return element(by.xpath(xpathName));
};

module.exports = new TileOptionsExclusionsEditGroupingsAddRemove();
