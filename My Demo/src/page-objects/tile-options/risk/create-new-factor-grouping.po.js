'use strict';

var CreateNewFactorGrouping = function() {
  this.xpath = '//tf-dialog';
  this.xpathHighLowGroup = '//*[@data-qa-id="button-risk-high-low-group"]';
  this.xpathEditGroupingListBox = '//*[@data-qa-id="listbox-risk-recursive-fg"]';
  this.xpathGroupButton = '//*[@data-qa-id="button-risk-fg-group"]';
  this.xpathGroupNameTextBox = '//*[@data-qa-id="risk-create-box-opened"]//tf-textbox';
  this.xpathEditGroupingContainer = '//tf-dialog//*[@data-qa-id="button-risk-fg-group"]/parent::*//tf-listbox';
  this.xpathOfRequiredFactorFromEditGroupingContainer = this.xpathEditGroupingContainer + '//*[normalize-space(.)="replacingText"]/parent::*/tf-listbox-item-handle';
  this.xpathOfWarningMessage = '//tf-dialog//tf-form-horizontal-item//*[contains(@class, "inline-error")]';
};

/**
 * @function getElementFromEditGrouping
 * @description This function is used to get reference of a particular element from the "Edit Grouping" section.
 * @param {string} parentElementPath Parent element in which required element is present Ex: FactSet|Portfolio|Position Data
 * @param {string} elementName Name of the element you want to get the reference of.
 * @param {string} isTree It is a optional variable. It is set to true if the required element is a tree element
 * @returns {Elementfinder} Returns the reference of a element from the Edit Grouping section
 */
CreateNewFactorGrouping.prototype.getElementFromEditGrouping = function(parentElementPath, elementName, isTree) {
  var xpathParentElement = this.xpath;
  var arrElements;
  if (parentElementPath !== false) {
    arrElements = parentElementPath.split('|');
  } else {
    arrElements = [elementName];
  }

  if (arrElements.length === 1) {
    xpathParentElement = '//tf-listbox-item//*[normalize-space(.)="' + arrElements[0] + '"]' +
      '/ancestor::tf-listbox-item[1]';
  } else {
    for (var i = 0; i < arrElements.length; i++) {
      xpathParentElement += '//tf-listbox-item//*[normalize-space(.)="' + arrElements[i] + '"]';

      if (isTree === undefined) {
        xpathParentElement += '/ancestor::tf-listbox-item[1]';
      }
    }
  }

  if (isTree === undefined && parentElementPath !== false) {
    xpathParentElement += '//tf-listbox-item//*[normalize-space(.)="' + elementName + '"]' +
      '/ancestor::tf-listbox-item[1][last()]';
  }

  return element(by.xpath(xpathParentElement));
};

/**
 * @function getAllElementsFromEditGrouping
 * @description This function is used to get reference of all elements from the "Edit Grouping" section.
 * @returns {Elementfinder} Returns the reference of all elements from the Edit Grouping section
 */
CreateNewFactorGrouping.prototype.getAllElementsFromEditGrouping = function() {
  return element.all(by.xpath('//tf-dialog//tf-listbox-item'));
};

/**
 * @function expandElementTreeInDropDown
 * @description This function is used to expand element from the drop down
 * @param {string} elementPath Path of the tree to be expanded Ex: Unsubscribed Risk Models|APT
 * @param {string} excludeElements elements to be excluded
 */
CreateNewFactorGrouping.prototype.expandElementTreeInDropDown = function(elementPath, excludeElements) {
  // Variable( s )
  var arrElements = elementPath.split('|');
  var xpathExpandButton = '//tf-dropdown//*[contains(@class,"ng-valid")]/ul/li';

  // Sub-function
  var scrollAndExpand = function() {
    // Scroll the element into visibility ( if  not visible )
    Utilities.makeElementVisible(element(by.xpath(xpathExpandButton)));

    element(by.xpath(xpathExpandButton)).getAttribute('class').then(function(attr) {
      if (attr.indexOf('expanded') === -1) {
        element(by.xpath(xpathExpandButton)).click();
      }
    });
  };

  if (excludeElements !== undefined) {
    excludeElements = excludeElements.split('|');
  }

  for (var i = 0; i < arrElements.length; i++) {
    xpathExpandButton += '/div[.="' + arrElements[i] + '"]//a';

    if ((excludeElements === undefined) || (excludeElements.indexOf(arrElements[i]) < 0)) {
      scrollAndExpand();
    } else {
      excludeElements.slice(excludeElements.indexOf(arrElements[i]), 1);
    }

    if (i !== arrElements.length - 1) {
      xpathExpandButton += '/ancestor::li/';
    }
  }
};

/**
 * @function getElementFromDropDown
 * @description  This function is used to get reference of a particular element from the drop down
 * @param {string} parentElementPath parent element in which required element is present. Ex: Unsubscribed Risk Models|APT
 * @param {string} elementName  Name of the element you want to get the reference of.
 * @param (string} isTreeElement Defined when the element to be required is a tree
 * @returns {ElementFinder} Returns the element finder of the the required element
 */
CreateNewFactorGrouping.prototype.getElementFromDropDown = function(parentElementPath, elementName, isTreeElement) {
  // Variable(s)
  var arrElements;
  var xpathParentElement = '//tf-dropdown//*[contains(@class,"ng-valid")]/ul/li';

  if (parentElementPath !== false) {
    arrElements = parentElementPath.split('|');
  } else {
    arrElements = [elementName];
  }

  for (var i = 0; i < arrElements.length; i++) {
    xpathParentElement += '/div[.="' + arrElements[i] + '"]';

    if (isTreeElement === undefined) {
      xpathParentElement += '/ancestor::li/';
    }
  }

  if (isTreeElement === undefined && parentElementPath !== false) {
    xpathParentElement += '/div[.="' + elementName + '"]';
  }

  return element(by.xpath(xpathParentElement));
};

/**
 * @function checkIfExpandedDDElement
 * @description  This function is used to check if the passed in tree elements is/are expanded
 * @param {string} elementPath parent element in which required element is present. Ex: Unsubscribed Risk Models|APT
 * @returns {ElementFinder} Returns the element finder of the the required element
 */
CreateNewFactorGrouping.prototype.checkIfExpandedDDElement = function(elementPath) {
  // Variable(s)
  var arrElements = elementPath.split('|');
  var xpathParentElement;

  // Sub-function
  var isExpanded = function(iterator) {
    if (iterator !== arrElements.length - 1) {
      xpathParentElement += '/div[.="' + arrElements[iterator] + '"]//a/ancestor::li';
      if (iterator === 0) {
        element(by.xpath(xpathParentElement)).getAttribute('class').then(function(classVal) {
          if (classVal.indexOf('expanded') === -1) {
            expect(false).customError('Element is not expanded');
          }
        });
      } else {
        element(by.xpath(xpathParentElement + '[1]')).getAttribute('class').then(function(classVal) {
          if (classVal.indexOf('expanded') === -1) {
            expect(false).customError('Element is not expanded');
          }
        });
      }
    } else {
      xpathParentElement += '//div[.="' + arrElements[iterator] + '"]//a/ancestor::li[1]';
      element(by.xpath(xpathParentElement)).getAttribute('class').then(function(classVal) {
        if (classVal.indexOf('expanded') === -1) {
          expect(false).customError('Element is not expanded');
        }
      });
    }
  };

  if (arrElements.length === 1) {
    xpathParentElement = '//tf-dropdown//*[contains(@class,"treeview ng-empty")]/ul/li/div[.="' + arrElements[0] + '"]' +
      '//a/ancestor::li[1]';
    expect(element(by.xpath(xpathParentElement)).getAttribute('class')).toContain('expanded');
  } else {
    xpathParentElement = '//tf-dropdown//*[contains(@class,"treeview ng-empty")]/ul/li';
    for (var i = 0; i < arrElements.length; i++) {
      isExpanded(i);
    }
  }

  return element(by.xpath(xpathParentElement));
};

/**
 * @function getComboBoxDropDown
 * @description This function is used to get drop down toggle of a combo box
 * @param {string} comboBoxName Name of the Combo Box
 * @returns {ElementFinder} Returns the element finder of drop down toggle of combo box
 */
CreateNewFactorGrouping.prototype.getComboBoxDropDown = function(comboBoxName) {
  var xpathDD = this.xpath;
  if (comboBoxName === 'Column') {
    xpathDD += '//*[@placeholder="Column"]//*[contains(@class,"dropdown") and @icon]';
  }

  return element(by.xpath(xpathDD));
};

/**
 * @function getComboTextBox
 * @description This function is used to get text box of a combo box
 * @param {string} comboBoxName Name of the Combo Box
 * @returns {ElementFinder} Returns the element finder of input box of combo box
 */
CreateNewFactorGrouping.prototype.getComboTextBox = function(comboBoxName) {
  var xpathTextBox = this.xpath;
  if (comboBoxName === 'Column') {
    xpathTextBox += '//*[@placeholder="Column"]//tf-textbox';
  }

  return element(by.xpath(xpathTextBox));
};

/**
 * @function getRemoveOrRenameIconOfGroup
 * @description This function is used to get rename or remove icon of required group.
 * @param {string} groupName Name of the group
 * @param {string} iconName Name of the icon(Ex: rename or remove)
 * @returns {ElementFinder} Returns the element finder of input box of combo box
 */
CreateNewFactorGrouping.prototype.getRemoveOrRenameIconOfGroup = function(groupName, iconName) {

  var xpathOfIcon = '//*[normalize-space(.) = "' + groupName + '"]/parent::*/tf-listbox-item-handle//tf-actions//*[contains(@data-qa-class,"' + iconName.toLocaleLowerCase() + '")]';

  return element(by.xpath(xpathOfIcon));
};

/**
 * @function getSpinner
 * @description This function is used to get reference of a spinner
 * @returns {ElementFinder} Returns the element finder of the spinner
 */
CreateNewFactorGrouping.prototype.getSpinner = function() {
  return element(by.xpath('//tf-dialog//*[@data-qa-class="loading spinner"]'));
};

module.exports = new CreateNewFactorGrouping();
