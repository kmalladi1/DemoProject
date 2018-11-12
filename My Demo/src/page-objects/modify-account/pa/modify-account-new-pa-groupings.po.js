'use strict';

var ModifyAccountNewPaGroupings = function() {
  this.xpathAvailableContainer = '//*[@data-qa-id="groupings-add-remove-available-section"]' +
    '//*[@data-qa-id="available-tree" and not(contains(@class, "ng-hide"))]';
  this.xpathSelectedContainer = '//*[@data-qa-id="groupings-add-remove-selected-tree"]';
  this.xpathOptionsContainer = '//*[@id="pa-grouping-opts-accordion"]';
  this.xpathFrequencyDropdown = '//*[@data-qa-id="dropdwon-groupings-def-frequency"]';
  this.xpathButtonFromDialogBox = '//tf-dialog//span[@tf-button][normalize-space(.)="replacingText"]';
  this.xpathLoadingBox = '//*[@data-qa-class="loading-spinner"][normalize-space(.)="Deleting category..."]';
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
/* Returns: NA                                                                          */
/****************************************************************************************/
ModifyAccountNewPaGroupings.prototype.expandElementTree = function(elementPath, excludeElements) {
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
/* Function: checkIfExpanded                                                            */
/* Description: This function is used to check if given element is expanded.            */
/* Params: 1. elementPath -> Path of tree to be to be verified.                         */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/****************************************************************************************/
ModifyAccountNewPaGroupings.prototype.checkIfExpanded = function(elementPath) {
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
/* Function: getElementFromAvailableSection                                             */
/* Description: This function is used to get reference of a particular element          */
/*              from the "Available" section container.                                 */
/* Params: 1. parentElementPath -> Parent element in which required element is present. */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/*         2. elementName -> Name of the element you want to get the reference of.      */
/*                           Ex: Port. Ending Quantity Held                             */
/* Return: Returns the reference of required element.                                   */
/****************************************************************************************/
ModifyAccountNewPaGroupings.prototype.getElementFromAvailableSection = function(parentElementPath, elementName) {
  var xpathParentElement;
  var xpathElement;
  var arrElements = parentElementPath.split('|');
  if (arrElements.length === 1) {
    xpathParentElement = this.xpathAvailableContainer + '//*[@data-qa-class="available-tree-item"' +
      'and descendant::*[normalize-space(.)="' + arrElements[0] + '"]]';
  } else {
    xpathParentElement = this.xpathAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      xpathParentElement += '//*[@data-qa-class="available-tree-item" and descendant::*' +
        '[normalize-space(.)="' + arrElements[i] + '"]]';
    }
  }

  xpathElement = xpathParentElement + '//*[@data-qa-class="available-tree-item" and descendant::*' +
    '[normalize-space(.)="' + elementName + '"]]';

  return element(by.xpath(xpathElement));
};

/****************************************************************************************/
/* Function: getAllElements                                                             */
/* Description: This function is used to get reference of all the elements either from  */
/*              "Available" container or from "Selected" container.                     */
/* Params: sectionName -> Name of the section from which element references are needed. */
/* Return: Returns the reference of all the elements from "Available" or "Selected"     */
/*         container.                                                                   */
/****************************************************************************************/
ModifyAccountNewPaGroupings.prototype.getAllElements = function(sectionName) {
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
/* Function: getElementFromSelectedContainer                                            */
/* Description: This function is used to get reference of element from                  */
/*              'Selected' container.                                                   */
/* Params: 1. itemName -> The item name for which reference is needed.                  */
/*                                 Ex: Sector                                           */
/* Return: Returns reference of required element from the "Selected" container.         */
/****************************************************************************************/
ModifyAccountNewPaGroupings.prototype.getElementFromSelectedContainer = function(itemName) {
  var xpathElement = this.xpathSelectedContainer + '//*[@data-qa-class="selected-item" ' +
    'and descendant::*//*[normalize-space(text())="' + itemName + '"]]';
  return element(by.xpath(xpathElement));
};

/****************************************************************************************/
/* Function: getCrossButtonFromSelectedSection                                          */
/* Description: This function is used to get reference of cross(X) icon                 */
/*              from 'Selected' container.                                              */
/* Return: Returns reference of required cross icon from the "Selected" container.      */
/****************************************************************************************/
ModifyAccountNewPaGroupings.prototype.getCrossButtonFromSelectedSection = function() {
  var xpathElement = '//*[@on-clear="removeAllGroupings()"]';
  return element(by.xpath(xpathElement));
};

/****************************************************************************************/
/* Function: getElementEditButtonFromAvailableSection                                   */
/* Description: This function is used to get reference of a particular element          */
/*              from the "Available" section container.                                 */
/* Params: 1. parentElementPath -> Parent element in which required element is present. */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/*         2. elementName -> Name of the element you want to get the reference of.      */
/*                           Ex: Port. Ending Quantity Held                             */
/* Return: Returns the reference of required element.                                   */
/****************************************************************************************/
ModifyAccountNewPaGroupings.prototype.getElementEditButtonFromAvailableSection = function(parentElementPath, elementName) {
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
      xpathParentElement += '//*[@data-qa-class="available-tree-item"]' +
        '//*[normalize-space(.)="' + arrElements[i] + '" and @tf-renamable-text]' +
        '/ancestor::*[@data-qa-class="available-tree-item"][1]';
    }
  }

  xpathElement = xpathParentElement + '//*[@data-qa-class="available-tree-item"]' +
    '//*[normalize-space(.)="' + elementName + '" and @tf-renamable-text]' +
    '/ancestor::*[@data-qa-class="available-tree-item"][1][last()]//tf-actions//*[@action="edit"]';

  // Scroll the element into visibility
  Utilities.makeElementVisible(element.all(by.xpath(xpathElement)).last());

  return element.all(by.xpath(xpathElement)).last();
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
ModifyAccountNewPaGroupings.prototype.getSectionCheckBox = function(sectionName, Checkbox, click) {

  // Setting default parameter
  if (click === undefined) {
    click = false;
  }

  // Setting the parameters values in order to create custom XPATH
  sectionName = sectionName.toLowerCase().replace(/\s/g, '-');

  var xpathCheckBox = this.xpathOptionsContainer + '//*[@data-qa-id="groupings-' + sectionName + '-section"]' +
    '//*[contains(@data-qa-id, "checkbox") and ancestor::*[normalize-space(.)="' + Checkbox + '"][1]]' +
    '/tf-checkbox-control';

  if (click) {
    element(by.xpath(xpathCheckBox)).click();
    return element(by.xpath(xpathCheckBox));
  } else {
    return element(by.xpath(xpathCheckBox));
  }
};

/****************************************************************************************/
/* Function: expandSectionInOptionsPane                                                 */
/* Description: This function is used expand the given section in 'Options' pane.       */
/* Params: sectionName -> Name of the section to be expanded.                           */
/* Return: Promise which resolves to boolean value                                      */
/****************************************************************************************/
ModifyAccountNewPaGroupings.prototype.expandSectionInOptionsPane = function(sectionName) {
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
/* Function: getExpandableSection                                                                      */
/* Description: This function is used to get reference of one of the expandable sections               */
/*                                                                                                     */
/* Params: 1. sectionName -> Expandable section which is needed.                                       */
/*                                 Ex: Definition                                                      */
/* Return: Returns the reference of required Expandable section element.                               */
/*******************************************************************************************************/
ModifyAccountNewPaGroupings.prototype.getExpandableSection = function(sectionName) {
  return element(by.xpath(this.xpathOptionsContainer + '//*[@data-qa-id=' +
    '"groupings-' + sectionName.toLowerCase().replace(/\s/g, '-') + '-section"]/*[contains(@open, "isOpen" )]'));
};

/****************************************************************************************/
/* Function: getFrequencyBtn                                                            */
/* Description: This function is used get the reference of frequency drop down          */
/* Return: Reference of element                                                         */
/****************************************************************************************/
ModifyAccountNewPaGroupings.prototype.getFrequencyBtn = function() {
  var xpathFrequency = '//*[@data-qa-id="dropdwon-groupings-def-frequency"]';
  return element(by.xpath(xpathFrequency));
};

/****************************************************************************************/
/* Function: getElementFromSelectedContainer                                            */
/* Description: This function is used to get reference of element from                  */
/*              'Selected' container.                                                   */
/* Params: 1. itemName -> The item name for which reference is needed.                  */
/*                                 Ex: Sector                                           */
/* Return: Returns reference of required element from the "Selected" container.         */
/****************************************************************************************/
ModifyAccountNewPaGroupings.prototype.getElementFromSelectedContainer = function(itemName) {
  var xpathElement = this.xpathSelectedContainer + '//*[@data-qa-class="selected-item" ' +
    'and descendant::*//*[normalize-space(text())="' + itemName + '"]]';
  return element(by.xpath(xpathElement));
};
/************************************************************************************************************/
/* Function: getArrowButton                                                                                 */
/* Description: This function is used to get reference of arrow button.                                     */
/* Params: 1. btnName -> Name of the button for which reference has to be collected.                        */
/*                       Ex: Right, Left, Up, Down.                                                         */
/* Return: Promise which resolves to reference of button.                                                   */
/************************************************************************************************************/
ModifyAccountNewPaGroupings.prototype.getArrowButton = function(btnName) {
  // Variable(s)
  //var xpathArrowButton = '//*[@data-qa-id="asset-type-search-order-view"]//*[@type="arrow-'+btnName.toLowerCase()+'-s"]';
  var xpathArrowButton = '//*[@data-qa-id="groupings-add-remove-available-section"]' +
    '//ancestor::*//following-sibling::*//*[contains(@icon,"' + btnName.toLowerCase() + '")]';
  return element(by.xpath(xpathArrowButton));
};
/********************************************************************************************/
/* Function: getRadioButton                                                                 */
/* Description: This function is used to get reference of radio button in option tab.     */
/* Params: 1. radioButtonName -> Name of the radio button.                                  */
/* Return: Returns the reference of radio button.                                           */
/********************************************************************************************/
ModifyAccountNewPaGroupings.prototype.getRadioButton = function(radioButtonName) {
  radioButtonName = (radioButtonName.replace(/\s/g, '-')).toLowerCase();
  var xpathRadioButton = '//*[@data-qa-id="radio-button-groupings-ao-' + radioButtonName + '"]';

  // Create object for "Radio" class
  var objRadioButton = new TestHelpers.Radio(by.xpath(xpathRadioButton));

  return objRadioButton;

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
ModifyAccountNewPaGroupings.prototype.getIconFromList = function(iconName, sectionName, colName, parentElementPath) {
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

/************************************************************************************************************/
/* Function: getSearchField                                                                                 */
/* Description: This function is used to get the  reference of 'Search' box.                                */
/* Params: 1. sectionName -> Name of the section from which reference of search filed has to be collected.  */
/*                           Ex: Prices or Exchange Rates.                                                  */
/* Return: Promise which resolves to the reference of "Search" field.                                       */
/************************************************************************************************************/
ModifyAccountNewPaGroupings.prototype.getSearchField = function(sectionName) {
  // Variable(s)
  var xpathSearchField = '//*[@data-qa-id="groupings-add-remove-available-search-box"]';

  return element(by.xpath(xpathSearchField));
};

/**
 * @function getInfoboxLoadingIcon
 * @description This function is used to get the reference of spinner image.
 * @returns {obj} returns object of progress indicator.
 */
ModifyAccountNewPaGroupings.prototype.getInfoboxLoadingIcon = function() {

  // Variable(s)
  var xpathLoadingIcon = '//*[@data-qa-class="loading-spinner"][normalize-space(.)="Loading description..."]//*[@class="data-spinner"]';
  return element(by.xpath(xpathLoadingIcon));
};

module.exports = new ModifyAccountNewPaGroupings();
