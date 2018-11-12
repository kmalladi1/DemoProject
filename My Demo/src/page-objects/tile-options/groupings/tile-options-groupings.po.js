'use strict';

var TileOptionsGroupings = function() {
  this.xpathOfAvailableOrSelectedContainer = '//*[@data-qa-id="groupings-add-remove-replacingText-section"]//tf-listbox';
  this.xpathAvailableContainer = '//*[@data-qa-id="groupings-add-remove-available-section"]' + '//*[@data-qa-id="available-tree" and not(contains(@class, "ng-hide"))]';
  this.xpathSelectedContainer = '//*[@data-qa-id="groupings-add-remove-selected-section"]' + '//*[@data-qa-id="groupings-add-remove-selected-tree"]';
  this.xpathOptionsContainer = '//tf-transferbox-options';
  this.xpathLoadingBox = '//*[@class="tf-alert-loading"]';

  // XPATHs for Fractiles' "Custom" fields
  this.xpathCustomFractilesSection = '//*[@id="pa-grp-custom-fractile-holder"]';
  this.xpathBoundaryInputField = this.xpathCustomFractilesSection + '//*[@data-qa-id="label-groupings-def-boundary"]' + '/following-sibling::*//*[@data-qa-class="input-box"]//input';
  this.xpathBoundaryUpSpinButton = this.xpathCustomFractilesSection + '//*[@data-qa-id="label-groupings-def-boundary"]' + '/following-sibling::*//*[@data-qa-class="input-box"]//*[contains( @class, "spin-up" )]';
  this.xpathBoundaryDownSpinButton = this.xpathCustomFractilesSection + '//*[@data-qa-id="label-groupings-def-boundary"]' + '/following-sibling::*//*[@data-qa-class="input-box"]//*[contains( @class, "spin-down" )]';
  this.xpathNTileSpinBox = '//*[@data-qa-id="label-groupings-def-fractiles"]/following-sibling::*' + '//tf-number-input';
  this.xpathNTileInputField = this.xpathNTileSpinBox + '//input';
  this.xpathNTileUpSpinButton = this.xpathNTileSpinBox + '//*[contains( @class, "spin-up" )]';
  this.xpathNTileDownSpinButton = this.xpathNTileSpinBox + '//*[contains( @class, "spin-down" )]';
  this.xpathNameInputField = this.xpathCustomFractilesSection + '//*[@data-qa-id="label-groupings-def-name"]' + '/following-sibling::*//*[@data-qa-class="input-box"]//input';
  this.xpathCustomFractileAddButton = this.xpathCustomFractilesSection + '//*[@data-qa-id="button-groupings-def-add"]';
  this.xpathCustomFractileEditButton = this.xpathCustomFractilesSection + '//*[@data-qa-id="button-groupings-def-edit"]';
  this.xpathCustomFractileBinDisplay = this.xpathCustomFractilesSection + '//*[@data-qa-id="groupings-def-listbox"]';

  // XPATHs for Fractiles' "Custom" fields in "Edit" mode
  this.xpathCustomFractileUpdateButton = this.xpathCustomFractilesSection + '//*[@data-qa-id="button-groupings-def-update"]';
  this.xpathCustomFractileCancelButton = this.xpathCustomFractilesSection + '//*[@data-qa-id="button-groupings-def-cancel"]';
  this.xpathEditCustomBinsGrid = this.xpathCustomFractilesSection + '//*[@data-qa-id="edit-custom-bins-grid"]';
  this.xpathGridHeader = this.xpathEditCustomBinsGrid + '//*[contains( @class, "slick-pane-header" )][not( @style=' + '"display: none;" )]';
  this.xpathGridCanvas = this.xpathEditCustomBinsGrid + '//*[@options="grid.options"]';
  this.xpathBlastingWindow = '//*[@id="blastPanelgroupings"]';
  this.xpathAvailableSearchBox = '//tf-textbox[@data-qa-id="groupings-add-remove-available-search-box"]';
  this.getRadioButtonFromOptionsPopup = '//tf-dropdown[@open]//tf-radio[normalize-space(.)="replacingText"]';
  this.xpathRemoveAll = '//tf-transferbox-target//span[@tf-button]//*[normalize-space(.)="Clear All"]/ancestor::*/span[@tf-button]';
  this.xpathNewButton = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]' + '//*[normalize-space(text())="Available"]//ancestor::*//following-sibling::*[@icon="add"]';
  this.xpathFolderIconFromAvailableSection = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]' + '//*[normalize-space(text())="Available"]//ancestor::*//following-sibling::*[@icon="folder-add"]';
  this.xpathButtonFromDialogBox = '//tf-dialog//tf-button[normalize-space(.)="replacingText"]';
  this.xpathButtonFromDialog = ' //*[contains(@class,"dialog")]/*[@type="button"][normalize-space(.)="replacingText"]';
  this.xpathLotGroupingDialogTextbox = '//*[normalize-space(.)="replacingText"]/parent::*/following-sibling::*//tf-textbox';
  this.regionMappingFileTextbox = '//*[@data-qa-id="label-groupings-def-region-mapping-file"]' + '//following-sibling::*[@data-qa-class="input-box"]';
  this.xpathOKOrCancelButtonFromDropDown = '//tf-dropdown//tf-button[normalize-space(.)="replacingText"]';
  this.xpathNumberInput = '//*[@data-qa-id="label-groupings-def-number"]/parent::*//tf-number-input';
  this.xpathAddNewButton = '//tf-transferbox-source//*[normalize-space(.)="Available"]//ancestor::*//following-sibling::*[@icon="add"]';
  this.xpathOfAvailableContainer = '//tf-transferbox-source-list//tf-listbox[not(contains(@class, "ng-hide"))]';
  this.xpathOfSelectedContainer = '//*[@data-qa-id="groupings-add-remove-selected-section"]//tf-listbox';
  this.xpathOfApplyToWeightsButton = '//tf-panel//tf-button[normalize-space(.)="replacingText"]';
  this.xpathOfTransferTargetBoxButtons = '//tf-transferbox-target//span[@tf-button][contains(@icon,"replacingText")]';
  this.xpathOfTransferBox = '//pa-grouping-transfer-box//tf-transferbox';
  this.xpathSelectedSectionWarningIcon = '//*[@data-qa-id="options-container"]//pa-groupings//*[contains(@class, "limit-warning")]';
};

/****************************************************************************************/
/* Function: checkIfExpanded                                                            */
/* Description: This function is used to check if given element is expanded.            */
/* Params: 1. elementPath -> Path of tree to be to be verified.                         */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/****************************************************************************************/
TileOptionsGroupings.prototype.checkIfExpanded = function(elementPath) {
  var arrElements = elementPath.split('|');
  var xpathParentElement;
  if (arrElements.length === 1) {
    xpathParentElement = this.xpathAvailableContainer + '//*[@data-qa-class="available-tree-item"]' + '//*[normalize-space(.)="' + arrElements[0] + '" and @tf-renamable-text]' + '/ancestor::*[@data-qa-class="available-tree-item"][1]';
    expect(element.all(by.xpath(xpathParentElement)).first().getAttribute('class')).toContain('expanded');
  } else {
    xpathParentElement = this.xpathAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      xpathParentElement += '//*[@data-qa-class="available-tree-item"]' + '//*[normalize-space(.)="' + arrElements[i] + '" and @tf-renamable-text]' + '/ancestor::*[@data-qa-class="available-tree-item"][1]';

      expect(element.all(by.xpath(xpathParentElement)).first().getAttribute('class')).toContain('expanded');
    }
  }

  return element(by.xpath(xpathParentElement));
};

/**
 * @function getDirectChildGroup
 * @description The function is used to get the reference of direct child for the given group.
 * @param {string} childName Name of the item.
 * @param {string} groupName Name of the group in which required item is present.
 * @example TileOptionsGroupings.getDirectChildGroup('Divide by Currency', 'U.S. Dollar')
 * @return Returns the reference of required element.
 */

TileOptionsGroupings.prototype.getDirectChildGroup = function(groupName, childName) {
  var xpathOfChild = '//tf-listbox-item//*[normalize-space(.)="' + groupName + '"]/parent::*/tf-listbox-item-handle/following-sibling' +
    '::*//tf-listbox-group//*[normalize-space(.)="' + childName + '"]/parent::*/tf-listbox-item-handle';
  return element(by.xpath(xpathOfChild));
};

/**
 * @function getDirectChildItemAndActionButton
 * @description The function is used to get the reference of direct child and its action item(remove,cog icon,rename) from the given group.
 * @param {string} childName Name of the item.
 * @param {string} groupName Name of the group in which required item is present.
 * @param {string} actionName Name of the action item(Ex: rename, remove, cogIcon -> options ).
 * @example TileOptionsGroupings.getDirectChildItemAndActionButton('North America', 'Currency', 'options')
 * @return Returns the reference of required element.
 */

TileOptionsGroupings.prototype.getDirectChildItemAndActionButton = function(groupName, childName, actionName) {

  var xpathOfChild = '//tf-listbox-group//*[normalize-space(.)= "' + groupName + '"]/parent::*/tf-listbox-item-handle/following-sibling' +
    '::*//tf-listbox-item//*[normalize-space(.)="' + childName + '"]/parent::*/tf-listbox-item-handle';
  var xpathOfItam;

  if (actionName === undefined) {
    xpathOfItam = xpathOfChild;
  } else {
    xpathOfItam = xpathOfChild + '//*[contains(@class, "' + actionName + '")]';
  }

  return element.all(by.xpath(xpathOfItam)).last();
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
TileOptionsGroupings.prototype.expandElementTree = function(elementPath, excludeElements) {
  var arrElements = elementPath.split('|');
  var arrExcludedElements;
  var xpathExpandButton;

  if (excludeElements === undefined) {
    arrExcludedElements = undefined;
  } else {
    arrExcludedElements = excludeElements.split('|');
  }

  if (arrElements.length === 1) {
    xpathExpandButton = this.xpathAvailableContainer + '//*[@data-qa-class="available-tree-item"]' + '//*[normalize-space(.)="' + arrElements[0] + '" and @tf-renamable-text]' + '/ancestor::*[contains(@class, "selectable-handle")]//*[contains(@class, "icon-tree")]';

    // Make the element visible before expanding
    Utilities.makeElementVisible(element(by.xpath(xpathExpandButton)));

    element(by.xpath(xpathExpandButton)).click();
  } else {
    xpathExpandButton = this.xpathAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      xpathExpandButton += '//*[@data-qa-class="available-tree-item"]' + '//*[normalize-space(.)="' + arrElements[i] + '" and @tf-renamable-text]' + '/ancestor::*[contains(@class, "selectable-handle")]//*[contains(@class, "icon-tree")]';

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
        xpathExpandButton += '/ancestor::*[contains(@class, "selectable-handle")]' + '/following-sibling::*[@data-qa-class="available-tree-group"]';
      }
    }
  }
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
TileOptionsGroupings.prototype.getElementFromAvailableSection = function(parentElementPath, elementName) {
  var xpathParentElement;
  var xpathElement;
  var arrElements = parentElementPath.split('|');
  if (arrElements.length === 1) {
    xpathParentElement = this.xpathAvailableContainer + '//*[@data-qa-class="available-tree-item"]' + '//*[normalize-space(.)="' + arrElements[0] + '" and @tf-renamable-text]' + '/ancestor::*[@data-qa-class="available-tree-item"][1]';
  } else {
    xpathParentElement = this.xpathAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      xpathParentElement += '//*[@data-qa-class="available-tree-item"]' + '//*[normalize-space(.)="' + arrElements[i] + '" and @tf-renamable-text]' + '/ancestor::*[@data-qa-class="available-tree-item"][1]';
    }
  }

  xpathElement = xpathParentElement + '//*[@data-qa-class="available-tree-item"]' + '//*[normalize-space(.)="' + elementName + '" and @tf-renamable-text]' + '/ancestor::*[@data-qa-class="available-tree-item"][1][last()]';

  browser.driver.wait(function() {
    return element.all(by.xpath(xpathElement)).last().isPresent().then(function(isPresent) {
      return isPresent;
    }, function() {
      return false;
    });
  }, 5000).then(function() {
  }, function() {
  });

  // Scroll the element into visibility
  Utilities.scrollElementToVisibility(element.all(by.xpath(xpathElement)).last());

  return element.all(by.xpath(xpathElement)).last();
};

/****************************************************************************************/
/* Function: getElementFromSelectedSection                                             */
/* Description: This function is used to get reference of a particular element          */
/*              from the "Selected" section container.                                 */
/* Params: 1. parentElementPath -> Parent element in which required element is present. */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/*         2. elementName -> Name of the element you want to get the reference of.      */
/*                           Ex: Port. Ending Quantity Held                             */
/* Return: Returns the reference of required element.                                   */
/****************************************************************************************/
TileOptionsGroupings.prototype.getElementFromSelectedSection = function(parentElementPath, elementName) {
  var xpathParentElement;
  var xpathElement;
  var arrElements = parentElementPath.split('|');
  if (arrElements.length === 1) {
    xpathParentElement = this.xpathSelectedContainer + '//*[@data-qa-class="selected-item"]' + '//*[normalize-space(.)="' + arrElements[0] + '" and @tf-renamable-text]' + '/ancestor::*[@data-qa-class="selected-item"][1]';
  } else {
    xpathParentElement = this.xpathSelectedContainer;
    for (var i = 0; i < arrElements.length; i++) {
      xpathParentElement += '//*[@data-qa-class="selected-item"]' + '//*[normalize-space(.)="' + arrElements[i] + '" and @tf-renamable-text]' + '/ancestor::*[@data-qa-class="selected-item"][1]';
    }
  }

  xpathElement = xpathParentElement + '//*[@data-qa-class="selected-item"]//*[normalize-space(.)="' + elementName + '"]' + '/ancestor::*[@data-qa-class="selected-item"][1][last()]';

  browser.driver.wait(function() {
    return element.all(by.xpath(xpathElement)).last().isPresent().then(function(isPresent) {
      return isPresent;
    }, function() {
      return false;
    });
  }, 5000).then(function() {
  }, function() {
  });

  // Scroll the element into visibility
  Utilities.scrollElementToVisibility(element.all(by.xpath(xpathElement)).last());

  return element.all(by.xpath(xpathElement)).last();
};

/****************************************************************************************/
/* Function: getAllElementsFromGroup                                                    */
/* Description: This function is used to get reference of all the elements under        */
/*              a particular group.                                                     */
/* Params: 1. parentElementPath -> Parent element from which all the elements reference */
/*            under it is needed.                                                       */
/*            Ex: FactSet|Portfolio|Position Data                                       */
/* Return: Returns the reference of all the elements under a particular tree path.      */
/****************************************************************************************/
TileOptionsGroupings.prototype.getAllElementsFromGroup = function(parentElementPath) {
  var arrElements = parentElementPath.split('|');
  var xpathParentElement;
  var i;
  if (arrElements.length === 1) {
    xpathParentElement = this.xpathAvailableContainer + '//*[@data-qa-class="available-tree-item"]' + '//*[normalize-space(.)="' + arrElements[0] + '" and @tf-renamable-text]' + '/ancestor::*[@data-qa-class="available-tree-item"][1]';
  } else {
    xpathParentElement = this.xpathAvailableContainer;
    for (i = 0; i < arrElements.length; i++) {
      xpathParentElement += '//*[@data-qa-class="available-tree-item"]' + '//*[normalize-space(.)="' + arrElements[i] + '" and @tf-renamable-text]' + '/ancestor::*[@data-qa-class="available-tree-item"][1]';
    }
  }

  return element.all(by.xpath(xpathParentElement + '/*[@data-qa-class="available-tree-group"]' + '/*[@ng-repeat]/*[@data-qa-class="available-tree-item"]'));
};

/****************************************************************************************/
/* Function: getArrowButton                                                             */
/* Description: This function is used to get reference of arrow buttons.                */
/*                                                                                      */
/* Params: 1. btnName -> The button for which reference is needed.                      */
/*                                 Ex: Right, left, up and Down                         */
/* Return: Return the reference of specified arrow button.                              */
/****************************************************************************************/
TileOptionsGroupings.prototype.getArrowButton = function(btnName) {
  // Variable(s)
  var xpathButton = '//pa-grouping-transfer-box//*[contains(@class,"icon-arrow-' + btnName.toLowerCase() + '")]/..';

  return element(by.xpath(xpathButton));
};

/****************************************************************************************/
/* Function: getAllElements                                                             */
/* Description: This function is used to get an array of references to the items listed */
/*              from 'Available' or 'Selected' container.                               */
/* Params: 1. sectionName -> The container from which elements are needed is passes     */
/*                                 Ex: Available or Selected                            */
/*                                                                                      */
/*  Note: The below optional parameters work only if search is performed.               */
/*                                                                                      */
/* Params: 2. isTree (Optional) -> Pass true if you need the reference of tree elements.*/
/*                                 Ex: true                                             */
/* Params: 2. shouldBeVisible (Optional) -> Pass true if you need the reference of only */
/*                                           visible elements.  Ex: true                */
/* Return: Returns an array of element references from either of the container.         */
/****************************************************************************************/
TileOptionsGroupings.prototype.getAllElements = function(sectionName, isTree, shouldBeVisible) {
  // Setting default value for isTree
  if (isTree === undefined) {
    isTree = false;
  }

  // Setting default value for shouldBeVisible
  if (shouldBeVisible === undefined) {
    shouldBeVisible = false;
  }

  if (sectionName.toLowerCase() === 'available') {
    if (!shouldBeVisible) {
      // Return the elements array from the "Available" list
      return element.all(by.xpath(this.xpathAvailableContainer + '//*[@data-qa-class="available-tree-item"]' + '//*[contains(@class, "selectable-handle")]'));
    } else {
      if (!isTree) {
        return element.all(by.xpath(this.xpathAvailableContainer + '//*[@data-qa-class="available-tree-item" ' + 'and not((contains(@class, "children") and contains(@class, "parent")))]/*[contains(@class, "selectable-handle")]'));
      } else {
        return element.all(by.xpath(this.xpathAvailableContainer + '//*[@data-qa-class="available-tree-item" ' + 'and (contains(@class, "children") or contains(@class, "parent"))]/*[contains(@class, "selectable-handle")]'));
      }
    }
  } else if (sectionName.toLowerCase() === 'selected') {
    // Return the elements array from the "Selected" list
    return element.all(by.xpath(this.xpathSelectedContainer + '//*[@data-qa-class="selected-item"]'));
  }
};

/****************************************************************************************/
/* Function: getElementFromSelectedContainer                                            */
/* Description: This function is used to get reference of passed element from           */
/*              'Selected' container.                                                   */
/* Params: 1. itemName -> The item name for which reference is needed.                  */
/*                                 Ex: High/Low                                         */
/* Return: Returns an array of element references from either of the container.         */
/****************************************************************************************/
TileOptionsGroupings.prototype.getElementFromSelectedContainer = function(itemName) {
  return element.all(by.xpath(this.xpathSelectedContainer + '//*[@data-qa-class="selected-item" ' + 'and descendant::*//*[normalize-space(text())="' + itemName + '"]]')).last();
};

/****************************************************************************************/
/* Function: getIndexFromSelected                                                       */
/* Description: This function is used to get index of particular element from 'Selected'*/
/*              section.                                                                */
/* Params: 1. elementName -> Name of the element whose index is needed.                 */
/*                                 Ex: Asset Type                                       */
/* Return: Returns promise which resolves to the index of given element.                */
/****************************************************************************************/
TileOptionsGroupings.prototype.getIndexFromSelected = function(elementName) {
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

/********************************************************************************************/
/* Function: getAvailableSectionSearchBox                                                   */
/* Description: This function returns the reference of search box from 'Available' section  */
/*                                                                                          */
/* Return: Returns reference of search box.                                                 */
/********************************************************************************************/
TileOptionsGroupings.prototype.getAvailableSectionSearchBox = function() {
  return element(by.xpath('//*[@data-qa-id="groupings-add-remove-available-search-box"]//input'));
};

/********************************************************************************************/
/* Function: getSearchBoxClearButton                                                        */
/* Description: This function returns the reference of clear button at the end of the       */
/*              search box.                                                                 */
/* Return: Returns reference of clear button.                                               */
/********************************************************************************************/
TileOptionsGroupings.prototype.getSearchBoxClearButton = function() {
  return element(by.xpath('//*[@data-qa-id="groupings-add-remove-available-search-box"]//*[contains(@class, "remove")]'));
};

/****************************************************************************************/
/* Function: getRemoveButtonOfElementInSelectedSection                                  */
/* Description: This function is used to get reference of remove button of the given    */
/*              element.                                                                */
/* Params: 1. elementName -> Name of the element whose remove button reference is needed*/
/*                           Ex: Economic Sector - FactSet                              */
/* Return: Returns reference of remove button for required element.                     */
/****************************************************************************************/
TileOptionsGroupings.prototype.getRemoveButtonOfElementInSelectedSection = function(elementName) {
  var xpathElement = this.xpathSelectedContainer + '//*[@data-qa-class="selected-item" ' + 'and descendant::*//*[normalize-space(.)="' + elementName + '"]]';

  // Hover over the given element
  browser.actions().mouseMove(this.getElementFromSelectedContainer(elementName)).perform();

  // Return the reference of remove element button
  return element.all(by.xpath(xpathElement + '//*[contains(@class, "remove")]')).last();
};

/****************************************************************************************/
/* Function: getRemoveIconForGroupingsInAvailableSection                                */
/* Description: This function is used to get a "Remove" icon reference of given         */
/*              "Grouping" from "Available" section.                                    */
/* Params: 1. parentElementPath -> Parent element in which required grouping is present.*/
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/*         2. grpName -> Name of the grouping whose "Remove" icon reference is required.*/
/*                           Ex: Port. Ending Quantity Held                             */
/* Return: Returns the reference of required grouping's Remove icon.                    */
/****************************************************************************************/
TileOptionsGroupings.prototype.getRemoveIconForGroupingsInAvailableSection = function(parentElementPath, grpName) {
  // Variable(s)
  var xpathParentElement;
  var xpathGrouping;
  var arrElements = parentElementPath.split('|');
  if (arrElements.length === 1) {
    xpathParentElement = this.xpathAvailableContainer + '//*[@data-qa-class="available-tree-item"]' + '//*[normalize-space(.)="' + arrElements[0] + '" and @tf-renamable-text]' + '/ancestor::*[@data-qa-class="available-tree-item"][1]';
  } else {
    xpathParentElement = this.xpathAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      xpathParentElement += '//*[@data-qa-class="available-tree-item"]' + '//*[normalize-space(.)="' + arrElements[i] + '" and @tf-renamable-text]' + '/ancestor::*[@data-qa-class="available-tree-item"][1]';
    }
  }

  xpathGrouping = xpathParentElement + '//*[@data-qa-class="available-tree-item"]' + '//*[normalize-space(.)="' + grpName + '" and @tf-renamable-text]' + '/ancestor::*[@data-qa-class="available-tree-item"][1]';

  Utilities.scrollElementToVisibility(element.all(by.xpath(xpathGrouping)).last());

  // Hover over the required grouping
  browser.actions().mouseMove(element.all(by.xpath(xpathGrouping)).last()).perform();

  // XPATH of required grouping's Remove button
  var xpathRemoveButton = xpathGrouping + '//*[@action="remove"]';

  return element.all(by.xpath(xpathRemoveButton)).last();
};

/*******************************************************************************************************/
/* Function: getExpandableSection                                                                      */
/* Description: This function is used to get reference of one of the expandable sections               */
/*                                                                                                     */
/* Params: 1. sectionName -> Expandable section which is needed.                                       */
/*                                 Ex: Definition                                                      */
/* Return: Returns the reference of required Expandable section element.                               */
/*******************************************************************************************************/
TileOptionsGroupings.prototype.getExpandableSection = function(sectionName) {
  return element(by.xpath(this.xpathOptionsContainer + '//*[@data-qa-id=' + '"groupings-' + sectionName.toLowerCase().replace(/\s/g, '-') + '-section"]/*[contains(@open, "isOpen" )]'));
};

/********************************************************************************************************/
/* Function: getSectionCheckBox                                                                         */
/* Description: This function is used to get reference of the checkboxes under expandable sections.     */
/*              It also can perform a click action on the checkbox if click = true.                     */
/*                                                                                                      */
/* Params: 1. sectionName -> Expandable section under which checkbox is.                                */
/*                                 Ex: Definition                                                       */
/*         2. Checkbox -> Name of the checkbox which is needed.                                         */
/*                                 Ex: Cash                                                             */
/*         3. click -> pass 'true' if click action is to be performed on the checkbox.                  */
/* Return: Returns the reference of required Checkbox element.                                          */
/********************************************************************************************************/
TileOptionsGroupings.prototype.getSectionCheckBox = function(sectionName, Checkbox, click) {

  // Setting default parameter
  if (click === undefined) {
    click = false;
  }

  // Setting the parameters values in order to create custom XPATH
  sectionName = sectionName.toLowerCase().replace(/\s/g, '-');

  var xpathCheckBox = this.xpathOptionsContainer + '//*[@data-qa-id="groupings-' + sectionName + '-section"]' + '//*[contains(@data-qa-id, "checkbox") and ancestor::*[normalize-space(.)="' + Checkbox + '"][1]]' + '/tf-checkbox-control';

  if (click) {
    element(by.xpath(xpathCheckBox)).click();
    return element(by.xpath(xpathCheckBox));
  } else {
    return element(by.xpath(xpathCheckBox));
  }
};

/********************************************************************************************************/
/* Function: getElementFromDefinitionSectionForHighLow                                                  */
/* Description: This function is used to get reference of elements under 'Definition' section           */
/*                                                                                                      */
/* Params: 1. elementName -> Element reference to be fetched.                                           */
/*                          example:    'select high / low column', 'frequency' etc.                    */
/*                                                                                                      */
/* Return: Returns the reference of required element.                                                   */
/********************************************************************************************************/

// Returns the reference of particular element under 'Definition' Expandable section
TileOptionsGroupings.prototype.getElementFromDefinitionSectionForHighLow = function(elementName) {
  if (elementName.toLowerCase() === 'select high / low column') {
    return element(by.xpath('//*[@data-qa-id="dropdown-hi-low-col"]'));
  }

  if (elementName.toLowerCase() === 'frequency') {
    return element(by.xpath('//*[@data-qa-id="dropdwon-groupings-def-frequency"]'));
  }

  if (elementName.toLowerCase() === 'number') {
    return element(by.xpath('//*[@data-qa-id="label-groupings-def-number"]' + '/following-sibling::*//input'));
  }

  if (elementName.toLowerCase() === 'up arrow button') {
    return element(by.xpath('//*[@data-qa-id="label-groupings-def-number"]' + '/following-sibling::*//*[contains(@class, "spin-up")]'));
  }

  if (elementName.toLowerCase() === 'down arrow button') {
    return element(by.xpath('//*[@data-qa-id="label-groupings-def-number"]' + '/following-sibling::*//*[contains(@class, "spin-down")]'));
  }
};

/*******************************************************************************************************/
/* Function: getAllDropDownOptions                                                                     */
/* Description: This function is used to get reference of all elements under a dropdown box.           */
/*                                                                                                     */
/* Return: Returns reference of items listed under any dropdown.                                       */
/*******************************************************************************************************/
TileOptionsGroupings.prototype.getAllDropDownOptions = function() {
  // Variable(s)
  var xpathOptions = '//tf-dropdown//*[@ng-repeat]';

  return element.all(by.xpath(xpathOptions));
};

/*******************************************************************************************************/
/* Function: getDropDownItem                                                                           */
/* Description: This function is used to get reference of passed item from dropdown list.              */
/*                                                                                                     */
/* Return: Returns the reference of required item.                                                     */
/*******************************************************************************************************/
TileOptionsGroupings.prototype.getDropDownItem = function(itemName) {
  var xpathOption = '//tf-dropdown//*[@ng-repeat and descendant::*//*[normalize-space(.)="' + itemName + '"]]';

  return element(by.xpath(xpathOption));
};

/****************************************************************************************/
/* Function: expandSectionInOptionsPane                                                 */
/* Description: This function is used expand the given section in 'Options' pane.       */
/* Params: sectionName -> Name of the section to be expanded.                           */
/* Return: Promise which resolves to boolean value                                      */
/****************************************************************************************/
TileOptionsGroupings.prototype.expandSectionInOptionsPane = function(sectionName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var _this = this;

  // Check if  section is already expanded, if  not, expand the section
  this.getExpandableSection(sectionName).getAttribute('class').then(function(attrValue) {
    if (attrValue.indexOf('collapsed') > -1) {
      _this.getExpandableSection(sectionName).click();

      // Check if  section is expanded
      _this.getExpandableSection(sectionName).getAttribute('class').then(function(attrValue) {
        if (attrValue.indexOf('collapsed') > -1) {
          defer.reject(false);
        } else {
          defer.fulfill(true);
        }
      });
    } else {
      defer.fulfill(true);
    }
  });

  return promise;
};

/*******************************************************************************************************/
/* Function: verifyDropdownList                                                                        */
/* Description: This function is used to verify the list under any dropdown.                           */
/*                                                                                                     */
/* Params: 1. arrListItems -> An array containing the list of items.                                   */
/*                                                                                                     */
/*         2. dropdownReference -> Object reference of dropdown button.                                */
/*                                                                                                     */
/* Return: None.                                                                                       */
/*******************************************************************************************************/
TileOptionsGroupings.prototype.verifyDropdownList = function(arrListItems, dropdownReference) {
  var i = 0;

  // Clicking on the dropdown to get the list.
  dropdownReference.click();
  expect(this.getAllDropDownOptions().count()).not.toEqual(0);
  this.getAllDropDownOptions().each(function(element) {
    expect(element.getText()).toEqual(arrListItems[i]);
    i++;
  });

  // Clicking on the dropdown to close the dropdown list.
  dropdownReference.click();
};

/*******************************************************************************************************/
/* Function: getSectionRadioBtn                                                                        */
/* Description: This function is used to get reference of the Radio buttons under expandable sections. */
/*              It also can perform a click action on the Radio button if 'true' is passed to 'click'. */
/*                                                                                                     */
/* Params: 1. sectionName -> Expandable section under which Radio button is.                           */
/*                                 Ex: Definition                                                      */
/*         2. RadioBtn -> Name of the Radio button which is needed.                                    */
/*                                 Ex: Cash                                                            */
/*         3. click -> pass 'true' if click action is to be performed on the Radio button.             */
/* Return: Returns the reference of required Radio button element.                                     */
/*******************************************************************************************************/
TileOptionsGroupings.prototype.getSectionRadioBtn = function(sectionName, radioBtn, click) {
  // Setting default parameter
  if (click === undefined) {
    click = false;
  }

  var xpathRadioButton = this.xpathOptionsContainer + '//*[@data-qa-id=' + '"groupings-' + sectionName.toLowerCase().replace(/\s/g, '-') + '-section"]//*[normalize-space(.)="' + radioBtn + '"]' + '//*[contains(@data-qa-id, "radio")]/tf-radio-control';

  if (click) {
    element(by.xpath(xpathRadioButton)).click().then(function() {
    }, function(error) {
      expect(false).customError(error);
      CommonFunctions.takeScreenShot();
    });
    return element(by.xpath(xpathRadioButton));
  } else {
    return element(by.xpath(xpathRadioButton));
  }
};

/*******************************************************************************************************/
/* Function: getEleFromDefinitionSectionForCompositeGroupings                                          */
/* Description: This function is used to get reference of elements under 'Definition' section for      */
/*              'Composite Assets' and 'Composite Components'.                                         */
/* Params: 1. elementName -> Element reference to be fetched.                                          */
/*                          example:    'advanced benchmark options', 'frequency' etc                  */
/*                                                                                                     */
/* Return: Returns the reference of required element.                                                  */
/*******************************************************************************************************/
TileOptionsGroupings.prototype.getEleFromDefinitionSectionForCompositeGroupings = function(elementName) {
  if (elementName.toLowerCase() === 'advanced benchmark options') {
    return element(by.xpath('//*[@data-qa-id="dropdwon-groupings-def-advanced-benchmark-options"]//*[@tf-button]'));
  }

  if (elementName.toLowerCase() === 'frequency') {
    return element(by.model('currentGroup.Attribs.freq'));
  }
};

/*******************************************************************************************************/
/* Function: getDropDownFromDefinitionSection                                                          */
/* Description: This function is used to get reference of drop down under 'Definition' section.        */
/*                                                                                                     */
/* Params: 1. ddName -> Drop Down name whose reference is needed.                                      */
/*            Ex: Fractiles, Bins Based On, Bins Use Equal etc.                                        */
/*         2. isLabeled (optional) -> Default value is TRUE. If this is set to FALSE it'll get the     */
/*                                    reference of unlabeled drop down from the section.               */
/*                                                                                                     */
/* NOTE: When isLabeled = FALSE, you can pass ddName as "undefined".                                   */
/*                                                                                                     */
/* Return: Returns the reference of required drop down.                                                */
/*******************************************************************************************************/
TileOptionsGroupings.prototype.getDropDownFromDefinitionSection = function(ddName, isLabeled) {
  // Variable(s)
  var xpathElement;

  // Setting the default parameter (isLabeled)
  if (isLabeled === undefined) {
    isLabeled = true;
  }

  // Get XPATH of labeled Drop Down
  if (isLabeled) {
    if (ddName.toLowerCase() === 'fractiles') {
      xpathElement = '//*[@data-qa-id="button-fractiles"]';
    } else if (ddName.toLowerCase() === 'frequency') {
      xpathElement = '//*[@data-qa-id="dropdwon-groupings-def-frequency"]';
    } else {
      xpathElement = '//*[@data-qa-id="dropdown-' + ddName.toLowerCase().replace(/\s/g, '-') + '"]';
    }
  } else {
    xpathElement = '//*[@id="grpDefDropDown"]';
  }

  return element(by.xpath(xpathElement));
};

/*******************************************************************************************************/
/* Function: getFractilesOption                                                                        */
/* Description: This function is used to get reference of specific option from 'Fractiles' drop down.  */
/* Params: 1. optionName -> Name of the option for which reference has to be collected.                */
/* Return: Promise which resolves to reference of specific 'Fractiles' option.                         */
/*******************************************************************************************************/
TileOptionsGroupings.prototype.getFractilesOption = function(optionName) {
  var xpathFractilesOption = '//tf-dropdown//*[@ng-repeat and descendant::*//*[normalize-space(.)="' + optionName + '"]]';
  return element(by.xpath(xpathFractilesOption));
};

/****************************************************************************************/
/* Function: setNTileSpinBox                                                            */
/* Description: This function is used to set the "N-Tile" spin box value which appears  */
/*              after selecting 'N-Tile' from "Fractiles" drop down.                    */
/* Params: 1. valueToBeSet -> Value to set for "N-Tile" input box. If no value is       */
/*            passed it'll be set to "undefined" and returns the reference of "N-Tile"  */
/*            input box.                                                                */
/*         2. typeIntoTheBox -> Boolean Value, if TRUE, it'll directly type into the    */
/*            "N-Tile" input box. Default value is TRUE.                                */
/*         3. changeValueUsingArrowButtons -> If TRUE then arrows are used to set the   */
/*            value. Default value is FALSE.                                            */
/* Return: Reference of "N-Tile" input box.                                             */
/****************************************************************************************/
TileOptionsGroupings.prototype.setNTileSpinBox = function(valueToBeSet, typeIntoTheBox, changeValueUsingArrowButtons) {
  // Variables
  var i;
  var _this = this;

  // Set the default values for the parameters
  valueToBeSet = valueToBeSet || undefined;
  if (typeIntoTheBox === undefined) {
    typeIntoTheBox = true;
  } else {
    typeIntoTheBox = typeIntoTheBox;
  }

  changeValueUsingArrowButtons = changeValueUsingArrowButtons || false;

  // Get the references of input field and buttons
  var nTileInputField = element(by.xpath(this.xpathNTileInputField));
  var upArrowButton = element(by.xpath(this.xpathNTileUpSpinButton));
  var downArrowButton = element(by.xpath(this.xpathNTileDownSpinButton));

  // Return the reference of "N-Tile" input box if "valueToBeSet" is "undefined"
  if (valueToBeSet === undefined) {
    return nTileInputField;
  }

  // Enter the value directly into the input field if typeIntoTheBox is true
  if (typeIntoTheBox) {
    nTileInputField.click();
    nTileInputField.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'), valueToBeSet);
  } else if (changeValueUsingArrowButtons) {
    // Set the value of "N-Tile" using the arrow buttons
    // Get the initial value present in the input field
    nTileInputField.getAttribute('value').then(function(initialValue) {
      if (initialValue > valueToBeSet) {
        // If initial value is greater than the value to be set, then we have to decrease it using down arrow button
        for (i = 1; i <= Math.abs(initialValue - valueToBeSet); i++) {
          downArrowButton.click();
          downArrowButton = element(by.xpath(_this.xpathNTileDownSpinButton));
        }
      } else if (initialValue < valueToBeSet) {
        // If initial value is less than the value to be set, then we have to increase it using up arrow button
        for (i = 1; i <= Math.abs(valueToBeSet - initialValue); i++) {
          upArrowButton.click();
          upArrowButton = element(by.xpath(_this.xpathNTileUpSpinButton));
        }
      }
    });
  }

  return nTileInputField;
};

/*******************************************************************************************************/
/* Function: getCustomFractilesOptions                                                                 */
/* Description: This function is used to get specified field reference after selecting 'Custom' for    */
/*              'Fractiles' drop down.                                                                 */
/* Params: 1. optionName -> Name of the option for which reference has to be collected.                */
/* Return: Promise which resolves to reference of specified 'Custom Fractile' field.                   */
/* NOTE: These options are available only when you select 'Custom' from the 'Fractiles' drop down.     */
/*******************************************************************************************************/
TileOptionsGroupings.prototype.getCustomFractilesOptions = function(optionName) {
  var xpathRequiredOption;

  if (optionName.toLowerCase() === 'boundary' || optionName.toLowerCase() === 'boundary:') {
    xpathRequiredOption = this.xpathBoundaryInputField;
  } else if (optionName.toLowerCase() === 'name' || optionName.toLowerCase() === 'name:') {
    xpathRequiredOption = this.xpathNameInputField;
  } else if (optionName.toLowerCase() === 'add' || optionName.toLowerCase() === 'add button') {
    xpathRequiredOption = this.xpathCustomFractileAddButton;
  } else if (optionName.toLowerCase() === 'edit' || optionName.toLowerCase() === 'edit button') {
    xpathRequiredOption = this.xpathCustomFractileEditButton;
  } else if (optionName.toLowerCase() === 'display area' || optionName.toLowerCase() === 'textarea' || optionName.toLowerCase() === 'text area' || optionName.toLowerCase() === 'box' || optionName.toLowerCase() === 'bin display' || optionName.toLowerCase() === 'bin display box') {
    xpathRequiredOption = this.xpathCustomFractileBinDisplay;
  }

  return element(by.xpath(xpathRequiredOption));
};

/****************************************************************************************/
/* Function: setCustomFractileBoundaryField                                             */
/* Description: This function is used to set the "Boundary" field which appears after   */
/*              selecting 'Custom' for "Fractiles" drop down.                           */
/* Params: 1. valueToBeSet -> Value to set for "Boundary" input box. If no value is     */
/*            passed it'll be set to "undefined" and returns the reference of "Boundary"*/
/*            input box.                                                                */
/*         2. typeIntoTheBox -> Boolean Value, if TRUE, it'll directly type into the    */
/*            "Boundary" input box. Default value is TRUE.                              */
/*         3. changeValueUsingArrowButtons -> If TRUE then arrows are used to set the   */
/*            value. Default value is FALSE.                                            */
/* Return: Reference of "Boundary" input box.                                           */
/****************************************************************************************/
TileOptionsGroupings.prototype.setCustomFractileBoundaryField = function(valueToBeSet, typeIntoTheBox, changeValueUsingArrowButtons) {
  // Variables
  var i;
  var _this = this;

  // Set the default values for the parameters
  valueToBeSet = valueToBeSet || undefined;
  if (typeIntoTheBox === undefined) {
    typeIntoTheBox = true;
  } else {
    typeIntoTheBox = typeIntoTheBox;
  }

  changeValueUsingArrowButtons = changeValueUsingArrowButtons || false;

  // Get the references of input field and buttons
  var boundaryInputField = element(by.xpath(this.xpathBoundaryInputField));
  var upArrowButton = element(by.xpath(this.xpathBoundaryUpSpinButton));
  var downArrowButton = element(by.xpath(this.xpathBoundaryDownSpinButton));

  // Return the reference of "Boundary" input box if "valueToBeSet" is "undefined"
  if (valueToBeSet === undefined) {
    return boundaryInputField;
  }

  // Enter the value directly into the input field if typeIntoTheBox is true
  if (typeIntoTheBox) {
    boundaryInputField.clear();
    boundaryInputField.sendKeys(valueToBeSet);
  } else if (changeValueUsingArrowButtons) {
    // Set the value of "Boundary" using the arrow buttons
    // Get the initial value present in the input field
    boundaryInputField.getAttribute('value').then(function(initialValue) {
      if (initialValue > valueToBeSet) {
        // If initial value is greater than the value to be set, then we have to decrease it using down arrow button
        for (i = 1; i <= Math.abs(initialValue - valueToBeSet); i++) {
          downArrowButton.click();
          downArrowButton = element(by.xpath(_this.xpathBoundaryDownSpinButton));
        }
      } else if (initialValue < valueToBeSet) {
        // If initial value is less than the value to be set, then we have to increase it using up arrow button
        for (i = 1; i <= Math.abs(valueToBeSet - initialValue); i++) {
          upArrowButton.click();
          upArrowButton = element(by.xpath(_this.xpathBoundaryUpSpinButton));
        }
      }
    });
  }

  return boundaryInputField;
};

/*******************************************************************************************************/
/* Function: getElementFromBinDisplayBox                                                               */
/* Description: This function is used to get reference of specified element from "Bin Display Box".    */
/* Params: 1. elementName -> Name of the element for which reference has to be collected.              */
/* Return: Promise which resolves to reference of specified element from "Bin Display Box".            */
/*******************************************************************************************************/
TileOptionsGroupings.prototype.getElementFromBinDisplayBox = function(elementName) {
  var xpathElement = this.xpathCustomFractileBinDisplay + '//*[@data-qa-class="listbox-item" and ' + 'normalize-space(.)="' + elementName + '"]';
  return element(by.xpath(xpathElement));
};

/*******************************************************************************************************/
/* Function: getCustomFractilesEditModeOptions                                                         */
/* Description: This function is used to get reference of specified option after changing 'Fractiles'  */
/*               view to edit mode.                                                                    */
/* Params: 1. optionName -> Option name for which reference has to be collected.                       */
/*            Ex: "Update", "Cancel" or "table".                                                       */
/* Return: Promise which resolves to reference of specified option from "Fractiles" edit mode.         */
/*******************************************************************************************************/
TileOptionsGroupings.prototype.getCustomFractilesEditModeOptions = function(optionName) {
  var xpathRequiredOption;
  if (optionName.toLowerCase() === 'update' || optionName.toLowerCase() === 'update button') {
    xpathRequiredOption = this.xpathCustomFractileUpdateButton;
  } else if (optionName.toLowerCase() === 'cancel' || optionName.toLowerCase() === 'cancel button') {
    xpathRequiredOption = this.xpathCustomFractileCancelButton;
  } else if (optionName.toLowerCase() === 'table' || optionName.toLowerCase() === 'tabular') {
    xpathRequiredOption = this.xpathEditCustomBinsGrid;
  }

  return element(by.xpath(xpathRequiredOption));
};

/*******************************************************************************************************/
/* Function: getFractileTableCell                                                                      */
/* Description: This function is used to get reference of specific cell from the table which appear in */
/*              Fractile's edit mode.                                                                  */
/* Params: 1. rowNumber -> Cell's row number.                                                          */
/*         2. columnNumber -> Cell's column number.                                                    */
/* Return: Promise which resolves to reference of specified cell from "Fractile's" edit mode.          */
/*******************************************************************************************************/
TileOptionsGroupings.prototype.getFractileTableCell = function(rowNumber, columnNumber) {
  var xpathRequiredCell = this.xpathGridCanvas + '//*[@style="top:' + Math.abs(rowNumber - 1) * 18 + 'px"]' + '/*[contains( @class, "slick-cell l' + Math.abs(columnNumber - 1) + ' r' + Math.abs(columnNumber - 1) + '" )]';
  return element(by.xpath(xpathRequiredCell));
};

/*******************************************************************************************************/
/* Function: editCellValue                                                                             */
/* Description: This function is used to edit the current value of the specified cell.                 */
/* Params: 1. rowNumber -> Cell's row number.                                                          */
/*         2. columnNumber -> Cell's column number.                                                    */
/*         3. valueToBeReplaced -> Text or Number to be entered into the cell.                         */
/* Return: NA                                                                                          */
/*******************************************************************************************************/
TileOptionsGroupings.prototype.editCellValue = function(rowNumber, columnNumber, valueToBeReplaced) {
  var xpathRequiredCell = this.xpathGridCanvas + '//*[@style="top:' + Math.abs(rowNumber - 1) * 18 + 'px"]' + '/*[contains( @class, "slick-cell l' + Math.abs(columnNumber - 1) + ' r' + Math.abs(columnNumber - 1) + '" )]//input';
  var cellReference = element(by.xpath(xpathRequiredCell));

  // Clearing the content before typing into the field
  cellReference.clear();

  // Enter text
  cellReference.sendKeys(valueToBeReplaced, protractor.Key.ENTER);
};

/****************************************************************************************/
/* Function: setLowerBoundValue                                                         */
/* Description: This function is used to set the value of "Lower Bound" field when      */
/*              "Custom" Fractiles is in edit mode.                                     */
/* Params: 1. valueToBeSet -> Value to set for "Lower Bound" input box. If no value is  */
/*            passed it'll be set to "undefined" and returns the reference of "Lower    */
/*            Bound" input box.                                                         */
/*         2. typeIntoTheBox -> Boolean Value, if TRUE, it'll directly type into the    */
/*            "Lower Bound" input box. Default value is TRUE.                           */
/*         3. changeValueUsingArrowButtons -> If TRUE then arrows are used to set the   */
/*            value. Default value is FALSE.                                            */
/* Return: Reference of "Lower Bound" input box.                                        */
/****************************************************************************************/
TileOptionsGroupings.prototype.setLowerBoundValue = function(valueToBeSet, typeIntoTheBox, changeValueUsingArrowButtons) {
  // Variables
  var i;

  // Set the default values for the parameters
  valueToBeSet = valueToBeSet || undefined;
  if (typeIntoTheBox === undefined) {
    typeIntoTheBox = true;
  } else {
    typeIntoTheBox = typeIntoTheBox;
  }

  changeValueUsingArrowButtons = changeValueUsingArrowButtons || false;

  // Get the references of input field and buttons
  var xpathCell = '//*[@data-qa-id="edit-custom-bins-grid"]//*[contains(@class, "slick-cell") and contains(@class, "editable")]';
  var xpathInputBox = xpathCell + '//input';
  var xpathUpSpinButton = xpathCell + '//*[contains(@class, "upspin")]';
  var xpathDownSpinButton = xpathCell + '//*[contains(@class, "downspin")]';
  var LBInputField = element(by.xpath(xpathInputBox));
  var upArrowButton = element(by.xpath(xpathUpSpinButton));
  var downArrowButton = element(by.xpath(xpathDownSpinButton));

  // Return the reference of "Lower Bound" input box if "valueToBeSet" is "undefined"
  if (valueToBeSet === undefined) {
    return LBInputField;
  }

  // Enter the value directly into the input field if typeIntoTheBox == true
  if (typeIntoTheBox) {
    LBInputField.clear();
    LBInputField.sendKeys(valueToBeSet);
  } else if (changeValueUsingArrowButtons) {
    // Set the value of "Lower Bound" using the arrow buttons
    // Get the initial value present in the input field
    LBInputField.getAttribute('value').then(function(initialValue) {
      if (initialValue > valueToBeSet) {
        // If initial value is greater than the value to be set, then we have to decrease it using down arrow button
        for (i = 1; i <= Math.abs(initialValue - valueToBeSet); i++) {
          downArrowButton.click();
          downArrowButton = element(by.xpath(xpathDownSpinButton));
        }
      } else if (initialValue < valueToBeSet) {
        // If initial value is less than the value to be set, then we have to increase it using up arrow button
        for (i = 1; i <= Math.abs(valueToBeSet - initialValue); i++) {
          upArrowButton.click();
          upArrowButton = element(by.xpath(xpathUpSpinButton));
        }
      }
    });
  }

  return LBInputField;
};

/*******************************************************************************************************/
/* Function: deleteRowButton                                                                           */
/* Description: This function is used to get the reference of delete button for the specified row no.  */
/* Params: 1. rowNumber -> Row number for which delete button reference is needed.                     */
/* Return: Promise which resolves to the reference of delete button for the specified row number.      */
/*******************************************************************************************************/
TileOptionsGroupings.prototype.deleteRowButton = function(rowNumber) {
  var xpathDeleteRowButton = this.xpathGridCanvas + '//*[@style="top:' + Math.abs(rowNumber - 1) * 18 + 'px"]//*[@data-' + 'content="Remove Row"]';
  return element(by.xpath(xpathDeleteRowButton));
};

/*******************************************************************************************************/
/* Function: isButtonAboveTable                                                                        */
/* Description: This function is used check if "Update" and "Cancel" buttons are above the Fractile's  */
/*              table.                                                                                 */
/* Params: 1. btnName -> Name of the button such as 'Update' or 'Cancel'.                              */
/* Return: Promise which resolves to boolean value.                                                    */
/*******************************************************************************************************/
TileOptionsGroupings.prototype.isButtonAboveTable = function(btnName) {
  var xpathRequiredButton;
  if (btnName.toLowerCase() === 'update' || btnName.toLowerCase() === 'update button') {
    xpathRequiredButton = this.xpathEditCustomBinsGrid + '/preceding-sibling::*//*[@data-qa-id="button-groupings-def-update"]';
  } else if (btnName.toLowerCase() === 'cancel' || btnName.toLowerCase() === 'cancel button') {
    xpathRequiredButton = this.xpathEditCustomBinsGrid + '/preceding-sibling::*//*[@data-qa-id="button-groupings-def-cancel"]';
  }

  return element(by.xpath(xpathRequiredButton)).isPresent();
};

/****************************************************************************************/
/* Function: getNewButton                                                               */
/* Description: This function is used to get reference of "New" button.                 */
/* Return: Returns the reference of "New" button.                                       */
/* QAID missing, will be re-added to PA3                                                */
/****************************************************************************************/
TileOptionsGroupings.prototype.getNewButton = function() {
  //QA Attribute XPATH
  //var xpathNewButton = '//*[@data-qa-id="button-groupings-add-remove-new-reference"]';
  var xpathNewRefButton = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]' + '//*[normalize-space(text())="Available"]//ancestor::*//following-sibling::*[@icon="add"]';
  return element(by.xpath(xpathNewRefButton));
};

/******************************************************************************************/
/* Function: getNewDropDownItem                                                           */
/* Description: This function is used to get reference of item from "New' drop down.      */
/* Params: 1. itemName -> Name of the item.                                               */
/* Return: Returns the reference of an item from "New" drop down.                         */
/******************************************************************************************/
TileOptionsGroupings.prototype.getNewDropDownItem = function(itemName) {
  // Variable(s)
  var xpathDropDownItem = '//tf-dropdown//*[@ng-repeat and normalize-space(.)="' + itemName + '"]';
  return element(by.xpath(xpathDropDownItem));
};

/****************************************************************************************/
/* Function: getEditIconForGroupingsInAvailableSection                                  */
/* Description: This function is used to get a "Edit" icon reference of given "Grouping"*/
/*              from "Available" section.                                               */
/* Params: 1. parentElementPath -> Parent element in which required grouping is present.*/
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/*         2. grpName -> Name of the grouping whose "Edit" icon reference is required.  */
/*                           Ex: Port. Ending Quantity Held                             */
/* Return: Returns the reference of required grouping's Edit icon.                      */
/****************************************************************************************/
TileOptionsGroupings.prototype.getEditIconForGroupingsInAvailableSection = function(parentElementPath, grpName) {
  // Variable(s)
  var xpathEditButton;
  var arrElements = parentElementPath.split('|');
  var xpathParentElement;
  var xpathColumn;

  // Creating the XPATH for the required column from "Available" section
  if (arrElements.length === 1) {
    xpathParentElement = this.xpathAvailableContainer + '//*[@data-qa-class="available-tree-item"]' + '//*[normalize-space(.)="' + arrElements[0] + '" and @tf-renamable-text]' + '/ancestor::*[@data-qa-class="available-tree-item"][1]';
  } else {
    xpathParentElement = this.xpathAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      xpathParentElement = this.xpathAvailableContainer + '//*[@data-qa-class="available-tree-item"]' + '//*[normalize-space(.)="' + arrElements[i] + '" and @tf-renamable-text]' + '/ancestor::*[@data-qa-class="available-tree-item"][1]';
    }
  }

  // XPATH of required column
  xpathColumn = xpathParentElement + '//*[@data-qa-class="available-tree-item"]' + '//*[normalize-space(.)="' + grpName + '" and @tf-renamable-text]' + '/ancestor::*[@data-qa-class="available-tree-item"][1]';

  // Scroll the element into visibility
  Utilities.makeElementVisible(element.all(by.xpath(xpathColumn)).last());

  // Hover over the required column
  browser.actions().mouseMove(element.all(by.xpath(xpathColumn)).last()).perform();

  // XPATH of required column's Edit button
  xpathEditButton = xpathColumn + '//*[contains(@class, "edit")]';

  return element.all(by.xpath(xpathEditButton)).last();
};

/****************************************************************************************/
/* Function: verifyToolTip                                                              */
/* Description: This function is used verify the tooltip of the given column name either*/
/*              from 'Available' or 'Selected' container.                               */
/* Params: 1. containerName -> Name of the container in which column exists.            */
/*            Ex: Available or Selected                                                 */
/*         2. groupingName -> Name of the grouping to hover over.                         */
/*            Ex: Bench. Ending Weight (from Selected container)                        */
/*         3. tooltipText -> Text of the expected tooltip. If "isTooltipText" variable  */
/*            is set to FALSE set this variable either to "" or "undefined".            */
/*         4. parentPath (optional) -> This parameter is applicable only when container-*/
/*            Name is 'Available'. You have to pass the parent tree element path in     */
/*            which column exists.                                                      */
/*            Ex: "FactSet|Portfolio|Position Data" as path for column "Port. Ending    */
/*                 Weight".                                                             */
/*         5. isTooltipExpected (optional) -> By default it is set to TRUE. If set to   */
/*            FALSE it has to verify that tooltip did not appear.                       */
/* Return: Promise which resolves to TRUE if tooltip matches otherwise Error Message.   */
/****************************************************************************************/
TileOptionsGroupings.prototype.verifyToolTip = function(containerName, groupingName, tooltipText, parentPath, isTooltipExpected) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;

  var tooltipRef;

  // Getting tooltip class reference
  tooltipRef = ThiefHelpers.getToolTipClassReference();

  if (isTooltipExpected === undefined) {
    isTooltipExpected = true;
  }

  if (containerName.toLowerCase() === 'available') {
    browser.actions().mouseMove(this.getElementFromAvailableSection(parentPath, groupingName).$('tf-listbox-item-title')).perform();
    browser.sleep(2000);

    if (isTooltipExpected === true) {
      // Get the tooltip text from the web page
      tooltipRef.getContent().getText().then(function(actualToolTipText) {
        if (tooltipText !== actualToolTipText) {
          defer.reject('Tool tip text did not match. Expected: ' + tooltipText + ', Found: ' + actualToolTipText);
        } else {
          defer.fulfill(true);
        }
      });
    } else if (isTooltipExpected === false) {
      tooltipRef.isOpen().then(function(isFound) {
        if (isFound === true) {
          defer.reject('Tooltip appeared when it is not expected');
        } else if (isFound === false) {
          defer.fulfill(true);
        }
      });
    }
  } else if (containerName.toLowerCase() === 'selected') {
    browser.actions().mouseMove(this.getElementFromSelectedContainer(groupingName)).perform();
    browser.sleep(2000);

    tooltipRef.isOpen().then(function(tool) {
      if (!tool) {
        defer.reject('Tool tip text has not displayed');
        CommonFunctions.takeScreenShot();
      }
    }, function(err) {
      defer.reject(err);
      CommonFunctions.takeScreenShot();
    });

    if (isTooltipExpected === true) {
      // Get the tooltip text from the web page
      tooltipRef.getContent().getText().then(function(actualToolTipText) {
        if (tooltipText !== actualToolTipText) {
          defer.reject('Tool tip text did not match. Expected: ' + tooltipText + ', Found: ' + actualToolTipText);
        } else {
          defer.fulfill(true);
        }
      });
    } else if (isTooltipExpected === false) {
      tooltipRef.isOpen().then(function(isFound) {
        if (isFound === true) {
          defer.reject('Tooltip appeared when it is not expected');
        } else if (isFound === false) {
          defer.fulfill(true);
        }
      });
    }
  }

  return promise;
};

/****************************************************************************************/
/* Function: getConfirmationDialogWithText                                              */
/* Description: This function is used to get reference of Delete confirmation dialog.   */
/* Params: 1. dialogContent -> The text displayed in dialog box.                        */
/*         2. dialogTitle (Optional) -> Title of the dialog. If this is skipped it'll   */
/*                                      get dialog reference based on its content.      */
/* Return: Returns the reference of dialog box.                                         */
/****************************************************************************************/
TileOptionsGroupings.prototype.getConfirmationDialogWithText = function(dialogContent, dialogTitle) {
  // Variable(s)
  var xpathDialog;

  if (dialogTitle !== undefined && dialogTitle.toLowerCase() !== 'delete grouping') {
    xpathDialog = '//*[@role="dialog" and descendant::*[normalize-space(.)="' + dialogTitle + '"] and ' + 'descendant::*[normalize-space(.)="' + dialogContent + '"]]';
  } else if (dialogTitle !== undefined && dialogTitle.toLowerCase() === 'delete grouping') {
    xpathDialog = '//*[@data-qa-class="confirmation-dialog"]//*[normalize-space(text())="' + dialogTitle + '"]' + '/following-sibling::*//*[normalize-space(text())="' + dialogContent + '"]';
  } else {
    xpathDialog = '//*[@role="dialog" and descendant::*[normalize-space(.)="' + dialogContent + '"]]';
  }

  return element(by.xpath(xpathDialog));
};

/******************************************************************************************/
/* Function: getButtonFromConfirmationDialog                                              */
/* Description: This function is used to get reference of button from confirmation dialog.*/
/* Params: 1. btnName -> Name of the button from confirmation dialog.                     */
/*         2. title (Optional) -> Title of confirmation dialog box. If not passed default */
/*                              value is "FactSet Research Systems".                      */
/* Return: Promise which resolves to the reference of button from confirmation dialog.    */
/******************************************************************************************/
TileOptionsGroupings.prototype.getButtonFromConfirmationDialog = function(btnName, title) {
  // Variable(s)
  var xpathButton;

  // Setting the default value of "title" to "FactSet Research Systems"
  if (title === undefined) {
    title = 'FactSet Research Systems';
  }

  if (title !== undefined && title.toLowerCase() === 'delete grouping') {
    xpathButton = '//*[@data-qa-class="confirmation-dialog" and descendant::*//*[normalize-space(text())="' + title + '"]]' + '//tf-button[normalize-space(.)="' + btnName + '"]';
  } else {
    xpathButton = '//*[normalize-space(.)="' + title + '"]/ancestor::*[@role="dialog"]' + '/descendant::button[normalize-space(.)="' + btnName + '"]';
  }

  return element(by.xpath(xpathButton));
};

/********************************************************************************************/
/* Function: getRemoveAllButton                                                             */
/* Description: This function is used to get the reference of "Remove All" button of        */
/*              Selected section.                                                           */
/*                                                                                          */
/* Return: Returns the reference of Remove All button.                                      */
/* QAID missing, will be re-added to PA3                                                    */
/********************************************************************************************/
TileOptionsGroupings.prototype.getRemoveAllButton = function() {
  //QAID XPATH
  var xpathRemoveAll = '//tf-transferbox-target-control-clear//tf-button';

  return element(by.xpath(xpathRemoveAll));
};

/****************************************************************************************/
/* Function: getApplyToButton                                                           */
/* Description: This function is used to get reference of "Apply To ..." button from top*/
/*              right corner of web page.                                               */
/* Params: NA                                                                           */
/* Return: Returns the reference of button.                                             */
/****************************************************************************************/
TileOptionsGroupings.prototype.getApplyToButton = function() {
  var xpathBlastLink = '//*[@data-qa-id="options-header"]//*[@data-qa-id="blasting-button"]';
  return element(by.xpath(xpathBlastLink));
};

/**
 * @function getAllCheckBoxFromBlastingWindow.
 * @description This function is used to get the reference of all items from the blasting window.
 * @return {promise} Promise wich resolve the array of reference of all items from the blasting window.
 */
TileOptionsGroupings.prototype.getAllCheckBoxFromBlastingWindow = function() {
  var xpathCheckBox = '//*[@data-qa-id="blast-panel-content"]//tf-checkbox';
  return element.all(by.xpath(xpathCheckBox));
};

/****************************************************************************************/
/* Function: getCheckBoxFromBlastWindow                                                 */
/* Description: This function is used to get reference of specified checkbox from the   */
/*              blasted window.                                                         */
/* Params: 1. checkBoxName -> Name of the checkbox whose reference is needed.           */
/* Return: Returns the reference of required checkbox.                                  */
/****************************************************************************************/
TileOptionsGroupings.prototype.getCheckBoxFromBlastWindow = function(checkBoxName) {
  var xpathCheckBox = this.xpathBlastingWindow + '//*[normalize-space(.)="' + checkBoxName + '"]/tf-checkbox-control';
  return element(by.xpath(xpathCheckBox));
};

/****************************************************************************************/
/* Function: getOkOrCancelButtonFromBlastedWindow                                       */
/* Description: This function is used to get reference of specified button from blasted */
/*              window.                                                                 */
/* Params: 1. btnName -> Name of the button whose reference is needed.                  */
/* Return: Returns the reference of required button.                                    */
/****************************************************************************************/
TileOptionsGroupings.prototype.getOkOrCancelButtonFromBlastedWindow = function(btnName) {
  var xpathButton = '//*[@data-qa-id="blasting-panel"]//*[@data-qa-id and normalize-space(.)="' + btnName + '"]';
  return element(by.xpath(xpathButton));
};

/****************************************************************************************/
/* Function: getOptionsButtonOfElementInSelectedSection                                 */
/* Description: This function is used to get reference of options button of the given   */
/*              element.                                                                */
/* Params: 1. elementName -> Name of the element whose remove button reference is needed*/
/*                           Ex: Economic Sector - FactSet                              */
/* Return: Returns reference of options button for required element.                    */
/****************************************************************************************/
TileOptionsGroupings.prototype.getOptionsButtonOfElementInSelectedSection = function(elementName, checkForOptionPopup) {

  // Setting default parameter
  if (checkForOptionPopup === undefined) {
    checkForOptionPopup = false;
  }

  var xpathElement = this.xpathSelectedContainer + '//*[@data-qa-class="selected-item"]' + '//*[normalize-space(.)="' + elementName + '"]';
  var xpathElementOptionBtn = xpathElement + '//*[contains(@class, "options")]';
  var xpathOptionsPopup = '//tf-dropdown[@open]';

  if (!checkForOptionPopup) {
    // Hover over the given element
    browser.actions().mouseMove(this.getElementFromSelectedContainer(elementName)).perform();

    // Return the reference of option element button
    return element.all(by.xpath(xpathElementOptionBtn)).last();
  } else {
    return element(by.xpath(xpathOptionsPopup));
  }
};

/*******************************************************************************************************/
/* Function: getRadioBtnFromOptionsPopup                                                               */
/* Description: This function is used to get reference of the Radio button in Options popup in selected*/
/*              section.                                                                               */
/*                                                                                                     */
/* Params: 1. RadioBtnName -> Name of the radio button in options popup.                               */
/*                                 Ex: Matrix or Divide                                                */
/*          2. isEnabled -> true or false                                                              */
/*            if true, gives the reference to verify whether the given radio button is enabled or not  */
/* Return: Returns the reference of required Radio button element.                                     */
/*******************************************************************************************************/
TileOptionsGroupings.prototype.getRadioBtnFromOptionsPopup = function(RadioBtnName, isEnabled) {

  var xpathOfRadioButton;
  if (isEnabled === undefined || isEnabled === false) {
    xpathOfRadioButton = '//tf-dropdown[@open]//*[normalize-space(.)="' + RadioBtnName + '"]/ancestor::*/tf-radio-control';
  } else {
    xpathOfRadioButton = '//tf-dropdown[@open]//tf-radio[normalize-space(.)="' + RadioBtnName + '"]';
  }

  return element(by.xpath(xpathOfRadioButton));
};

/****************************************************************************************/
/* Function: getOkOrCancelButtonOptionsPopuop                                           */
/* Description: This function is used to get reference of specified button from options */
/*              popup.                                                                  */
/* Params: 1. btnName -> Name of the button whose reference is needed.                  */
/* Return: Returns the reference of required button.                                    */
/****************************************************************************************/
TileOptionsGroupings.prototype.getOkOrCancelButtonOptionsPopuop = function(btnName) {
  var xpathButton = '//tf-dropdown[@open]//tf-button[normalize-space(.)="' + btnName.toUpperCase() + '"]';
  return element(by.xpath(xpathButton));
};

/****************************************************************************************/
/* Function: getSearchField                                                             */
/* Description: This function is used to get reference of "Search" field from the       */
/*              "Available" container.                                                  */
/* Return: Returns reference of "Search" field from the "Available" container.          */
/****************************************************************************************/
TileOptionsGroupings.prototype.getSearchField = function() {
  var xpathSearchField = '//*[@data-qa-id="groupings-add-remove-available-search-box"]//input';
  return element(by.xpath(xpathSearchField));
};

/****************************************************************************************/
/* Function: getIconFromList                                                            */
/* Description: This function is used to get the reference of specified icon from       */
/*              specified list element.                                                 */
/* Params: 1. elementName -> Name of the element ftom which icon reference is required. */
/*                          Ex: ADF                                                     */
/*         2.  iconName -> Name of the icon whose reference is required.                */
/*                         Ex: option, remove                                           */
/*         3. sectionName -> Name of the section from which element is required.        */
/*                          Ex: Available, Selected                                     */
/*         4. parentElementPath (Optional) -> Parent element in which required column   */
/*                                            is present.                               */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/* Return: Returns the reference of the icon from list element.                         */
/****************************************************************************************/
TileOptionsGroupings.prototype.getIconFromList = function(iconName, sectionName, colName, parentElementPath) {
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
      xpathParentElement = this.xpathAvailableContainer + '//*[@data-qa-class="available-tree-item"]' + '//*[normalize-space(.)="' + arrElements[0] + '" and @tf-renamable-text]' + '/ancestor::*[@data-qa-class="available-tree-item"][1]';
    } else {
      xpathParentElement = this.xpathAvailableContainer;
      for (var i = 0; i < arrElements.length; i++) {
        xpathParentElement = this.xpathAvailableContainer + '//*[@data-qa-class="available-tree-item"]' + '//*[normalize-space(.)="' + arrElements[i] + '" and @tf-renamable-text]' + '/ancestor::*[@data-qa-class="available-tree-item"][1]';
      }
    }

    // XPATH of required column
    xpathColumn = xpathParentElement + '//*[@data-qa-class="available-tree-item"]' + '//*[normalize-space(.)="' + colName + '" and @tf-renamable-text]' + '/ancestor::*[@data-qa-class="available-tree-item"][1]/*[contains(@class, "selectable-handle")]';
  } else if (sectionName.toLowerCase() === 'selected') {
    xpathColumn = this.xpathSelectedContainer + '//*[@data-qa-class="selected-item" ' + 'and normalize-space(.)="' + colName + '"]/*[contains(@class, "selectable-handle")]';
  }

  // Scroll the element into visibility
  Utilities.makeElementVisible(element.all(by.xpath(xpathColumn)).last());

  // Hover over the required column
  browser.actions().mouseMove(element.all(by.xpath(xpathColumn)).last()).perform();

  // XPATH of required column's Edit button
  xpathRenameButton = xpathColumn + '//*[contains(@class, "' + iconName.toLowerCase() + '")]';

  return element.all(by.xpath(xpathRenameButton)).last();
};

/************************************************************************************************************/
/* Function: getAllchildrenFromChecklistGroup                                                               */
/* Description: This function is used to get the reference of all checklist items in a specific group.      */
/* Params: groupName -> Name of the checkbox Group to get reference.                                        */
/* Return: Promise which resolves to the reference of children in a specified group which is in expanded    */
/*         state else returns false.                                                                        */
/************************************************************************************************************/
TileOptionsGroupings.prototype.getAllchildrenFromChecklistGroup = function(groupName) {
  var xpathCheckBox = '//*[@data-qa-id="blast-panel-content"]//tf-checkbox[normalize-space(.)="' + groupName + '"]/parent::*/following-sibling::*';
  var defer = protractor.promise.defer();
  var promise = defer.promise;

  element(by.xpath(xpathCheckBox)).getAttribute('class').then(function(value) {
    if (value.indexOf('expanded') !== -1) {
      xpathCheckBox = xpathCheckBox + '//tf-checklist-item';
      defer.fulfill(element.all(by.xpath(xpathCheckBox)));
    } else {
      defer.fulfill(false);
    }
  });

  return promise;
};

/************************************************************************************************************/
/* Function: getSelectedSectionListItem                                                                     */
/* Description: This function is used to get the reference of selected container list item.                 */
/* Params: listItem -> Name of the list item to get reference.                                              */
/*         isHidden -> true if you need to get the reference of hidded item.                                */
/* Return: Promise which resolves to the reference of item from the selected container.                     */
/************************************************************************************************************/
TileOptionsGroupings.prototype.getSelectedSectionListItem = function(listItem, isHidden) {
  var xpathListItem;
  if (isHidden) {
    xpathListItem = '//*[@data-qa-class="selected-item"]//*[contains(@class,"pa-hidden-grp") and normalize-space(.)="' + listItem + '"]';
  }else {
    xpathListItem = '//*[@data-qa-class="selected-item"][normalize-space(.)="' + listItem + '"]';
  }

  return element(by.xpath(xpathListItem));
};

module.exports = new TileOptionsGroupings();
