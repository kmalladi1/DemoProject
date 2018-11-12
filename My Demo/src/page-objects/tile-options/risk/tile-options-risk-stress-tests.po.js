'use strict';

var TestHelpers = require('@fds/thief-angular-testing');

var TileOptionsRiskStressTests = function() {
  this.xpathStressTests = '//*[@data-qa-id="options-container" and not(contains(@class,"ng-hide"))]';
  this.xpathAvailableContainer = this.xpathStressTests + '//tf-transferbox-source-list//tf-virtual-listbox';
  this.xpathSelectedContainer = this.xpathStressTests + '//tf-transferbox-target-list//tf-virtual-listbox';
  this.xpathAddButton = this.xpathStressTests + '//tf-transferbox-source-controls//*[@icon="add"]';
  this.xpathTransferBox = this.xpathStressTests + '//*[@data-qa-id="risk-rm-selected-section"]//tf-transferbox';
  this.xpathSearchBox = this.xpathStressTests + '//tf-transferbox-source-control-search//tf-textbox';
  this.xpathDatePickerButton = '//*[@data-qa-id="risk-st-replacingText-section"]//span[@tf-button][contains(@class,"tf-datepicker-button")]';
  this.xpathClearAllIcon = this.xpathStressTests + '//span[@tf-button][contains(@icon,"remove") and ' +
    'descendant::*[normalize-space(.)="Clear All"]]';
  this.xpathSearchBoxDeleteIcon = this.xpathSearchBox + '//tf-textbox-clear';
  this.xpathCreateNewStressTestDialog = '//tf-dialog[contains(., "Create New Stress Test")]//tf-dialog-wrap';
  this.xpathOfInfoIconInAvailableSection = '//tf-transferbox-source-list//tf-virtual-listbox//tf-virtual-listbox-item-template' +
    '[normalize-space(.)="replacingText"]//tf-icon[@type="info"]/parent::tf-button';
  this.xpathOfAdavacedOptions = '//*[@data-qa-id="risk-st-advanced-options-section"]';
};

/**
 * @function expandElementTree
 * @description This function is used to expand the Tree passed as an argument to the function
 * @param {string} elementPath Path of tree to be expanded.  Ex: FactSet|Portfolio|Position Data
 * @param {string} Specify the elements to be excluded from expanding.
 *  For Example, to exclude "FactSet and Portfolio" from "FactSet|Portfolio|Position Data" then parameter should be "FactSet|Portfolio".
 */
TileOptionsRiskStressTests.prototype.expandElementTree = function(elementPath, excludeElements) {
  var arrElements = elementPath.split('|');
  var arrExcludedElements;
  var xpathExpandButton;

  if (excludeElements === undefined) {
    arrExcludedElements = undefined;
  } else {
    arrExcludedElements = excludeElements.split('|');
  }

  if (arrElements.length === 1) {
    xpathExpandButton = this.xpathAvailableContainer + '//tf-listbox-item//*[normalize-space(.)="' + arrElements[0] + '"]' +
      '/ancestor::*[contains(@class, "selectable-handle")]//*[contains(@class, "icon-tree")]';

    // Make the element visible before expanding
    Utilities.makeElementVisible(element(by.xpath(xpathExpandButton)));

    element(by.xpath(xpathExpandButton)).click();
  } else {
    xpathExpandButton = this.xpathAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      xpathExpandButton += '//tf-listbox-item//*[normalize-space(.)="' + arrElements[i] + '"]' +
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
          '/following-sibling::tf-listbox-children';
      }
    }
  }
};

/**
 * @function getElementFromAvailableSection
 * @description This function is used to get reference of a particular element from the "Available" section container.
 * @param {string} parentElementPath Parent element in which required element is present Ex: FactSet|Portfolio|Position Data
 * @param {string} elementName Name of the element you want to get the reference of.
 * @returns {Elementfinder} Returns the reference of a element from the selected section
 */
TileOptionsRiskStressTests.prototype.getElementFromAvailableSection = function(parentElementPath, elementName) {
  var xpathParentElement;
  var xpathElement;
  var arrElements = parentElementPath.split('|');
  if (arrElements.length === 1) {
    xpathParentElement = this.xpathAvailableContainer + '//tf-listbox-item//*[normalize-space(.)="' + arrElements[0] + '"]' +
      '/ancestor::tf-listbox-item[1]';
  } else {
    xpathParentElement = this.xpathAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      xpathParentElement += '//tf-listbox-item//*[normalize-space(.)="' + arrElements[i] + '"]' +
        '/ancestor::tf-listbox-item[1]';
    }
  }

  xpathElement = xpathParentElement + '//tf-listbox-item//*[normalize-space(.)="' + elementName + '"]' +
    '/ancestor::tf-listbox-item[1][last()]';

  return element(by.xpath(xpathElement));
};

/**
 * @function getElementActionsFromAvailable
 * @description This function is used to get actions of a particular element from the "Available" section container.
 * @param {string} parentElementPath Parent element in which required element is present Ex: FactSet|Portfolio|Position Data
 * @param {string} elementName Name of the element you want to get the reference of actions.
 * @returns {obj} Object of Actions class
 */
TileOptionsRiskStressTests.prototype.getElementActionsFromAvailable = function(parentElementPath, elementName) {
  var xpathParentElement;
  var xpathElement;
  var arrElements = parentElementPath.split('|');
  if (arrElements.length === 1) {
    xpathParentElement = this.xpathAvailableContainer + '//tf-virtual-listbox-group-template//*[normalize-space(.)="' + arrElements[0] + '"]/following-sibling::tf-virtual-listbox-group-children';
  } else {
    xpathParentElement = this.xpathAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      xpathParentElement += '//tf-virtual-listbox-group-template//*[normalize-space(.)="' + arrElements[i] + '"]';

      if (i !== arrElements.length) {
        xpathParentElement += '/following-sibling::tf-virtual-listbox-group-children';
      }
    }
  }

  xpathElement = xpathParentElement + '//tf-virtual-listbox-item-template//*[normalize-space(.)="' + elementName + '"]//tf-actions';

  var ref = element(by.xpath(xpathElement));
  var elementActions = new TestHelpers.Actions(ref);
  return elementActions;
};

/**
 * @function checkIfExpanded
 * @description This function is used to check if given element is expanded.
 * @param {string} elementPath Parent element in which required element is present Ex: FactSet|Portfolio|Position Data
 */
TileOptionsRiskStressTests.prototype.checkIfExpanded = function(elementPath) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var arrElements = elementPath.split('|');
  var xpathParentElement;
  var _this = this;

  // Creating sub-function
  var isExpanded = function(iterator) {
    xpathParentElement = _this.xpathAvailableContainer + '//tf-listbox-item//*[normalize-space(.)="' + arrElements[iterator] + '"]' + '/ancestor::tf-listbox-item[1]';

    element.all(by.xpath(xpathParentElement)).first().getAttribute('class').then(function(text) {
      if (text.indexOf('expanded') > 0) {
        defer.fulfill(true);
      } else {
        defer.fulfill(false);
      }
    });
  };

  if (arrElements.length === 1) {
    xpathParentElement = this.xpathAvailableContainer + '//tf-listbox-item//*[normalize-space(.)="' + arrElements[0] + '"]' +
      '/ancestor::tf-listbox-item[1]';
    element.all(by.xpath(xpathParentElement)).first().getAttribute('class').then(function(text) {
      if (text.indexOf('expanded') > 0) {
        defer.fulfill(true);
      } else {
        defer.fulfill(false);
      }
    });
  } else {
    xpathParentElement = this.xpathAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      isExpanded(i);
    }
  }

  return promise;
};

/**
 * @function getElementFromSelectedContainer
 * @description This function is used to get reference of a particular element from the "Selected" section container.
 * @param {string} elementName Name of the element you want to get the reference of.
 * @returns {Elementfinder} Returns the reference of a element from the selected section
 */
TileOptionsRiskStressTests.prototype.getElementFromSelectedContainer = function(elementName) {
  return element.all(by.xpath(this.xpathSelectedContainer + '//tf-listbox-item[descendant::*' + '//*[normalize-space(text())="' + elementName + '"]]')).last();
};

/**
 * @function VerifyIfExpectedValuesIsPresentUnderGivenCategory
 * @description This function is used to get reference of a particular element from infobox or in options pane.
 * @param {string} parent Name of the element under which expected item is present.
 * @param {string} text Name of the item.
 * @param {boolean} infoPopUp Pass true if verification is from info-box else false.
 * @returns {Elementfinder} Returns the reference of a element
 */
TileOptionsRiskStressTests.prototype.VerifyIfExpectedValuesIsPresentUnderGivenCategory = function(parent, text, infoPopUp) {
  var parentPathItems = parent.toLocaleLowerCase().split(' ');
  var parentName = '';
  var xpathOfItem;

  if (parentPathItems.length > 1) {
    parentName = parentPathItems[0];
    for (var i = 1; i < parentPathItems.length; i++) {
      parentName =  parentName + '-' + parentPathItems[i];
      console.log(parentName);
    }
  } else {
    parentName = parent;
  }

  if (infoPopUp === true) {
    xpathOfItem = '//tf-panel//*[contains(@data-qa-id,"' + parentName + '")]//*[normalize-space(.)="' + text + '"]';
  } else if (infoPopUp === false || infoPopUp === undefined) {
    xpathOfItem = '//*[contains(@data-qa-id,"' + parentName + '")]//*[normalize-space(.)="' + text + '"]';
  }

  return element(by.xpath(xpathOfItem));
};

/**
 * @function getElementRemoveIconFromSelectedContainer
 * @description This function is used to get reference of a particular element remove icon from the "Selected" section container.
 * @param {string} elementName Name of the element you want to get the reference of remove icon.
 * @returns {Elementfinder} Returns the reference of a element remove icon from the selected section
 */
TileOptionsRiskStressTests.prototype.getElementRemoveIconFromSelectedContainer = function(elementName) {
  return element(by.xpath(this.xpathSelectedContainer + '//tf-listbox-item[descendant::*' +
    '//*[normalize-space(text())="' + elementName + '"]]//*[contains(@class,"icon-remove")]'));
};

/**
 * @function getInfoIcon
 * @description This function returns the reference of "Info Icon" from Available section
 * @param {string} parentElementPath Parent element in which required element is present Ex: FactSet|Portfolio|Position Data
 * @param {string} elementName Name of the element you want to get the reference of
 * @returns {Elementfinder} Returns the reference of info icon from the Available section
 */
TileOptionsRiskStressTests.prototype.getInfoIcon = function(parentElementPath, elementName) {
  var infoIcon = this.getElementFromAvailableSection(parentElementPath, elementName).element(by.xpath('.//*[contains(@class, "tf-icon-info")]'));
  return infoIcon;
};

/**
 * @function getInfoBoxData
 * @description This function returns the reference of data from "Information Box" dialog box or RHS Infobox
 * @param {string} sectionName The section name of the info dialog box
 * @param {string} [Optional] dialog If the value is required from infobox then pass a value.
 * Ex: Type or Start Date
 * @returns {Elementfinder} Returns the reference of data in specified section of information box or RHS Infobox
 */
TileOptionsRiskStressTests.prototype.getInfoBoxData = function(sectionName, dialog) {
  var xpathInfoBox;
  if (dialog === undefined) {
    xpathInfoBox = '//tf-form-vertical//*[@data-qa-id="label-risk-st-' + sectionName.toLowerCase().replace(/\s/g, '-') + '"]//*[contains(@class,"spotlight-value")]';
  } else {
    xpathInfoBox = '//tf-panel//*[@data-qa-id="label-risk-st-' + sectionName.toLowerCase().replace(/\s/g, '-') + '"]//*[contains(@class,"spotlight-value")]';
  }

  return element(by.xpath(xpathInfoBox));
};

/**
 * @function getAllElementsFromSelectedSection
 * @description This function returns the reference all the elements present in the Selected
 Section.
 * @returns {Elementfinder} Returns reference of elements from "Selected" section.
 */
TileOptionsRiskStressTests.prototype.getAllElementsFromSelectedSection = function() {
  var xpathElements = '//tf-transferbox-target-list//tf-listbox//tf-listbox-item';

  return element.all(by.xpath(xpathElements));
};

/**
 * @function getEleFromAvailAfterSearch
 * @description This function is used to get all elements from the 'available' list after the search keyword is entered into the search field.
 * @returns {ref} Returns the reference of all filtered elements.
 */
TileOptionsRiskStressTests.prototype.getAllElementsFromAvailAfterSearch = function() {
  // Creating the XPATH of all element references
  var xpathElements;
  xpathElements = this.xpathAvailableContainer + '//tf-listbox-item[not(contains(@class, "parent"))]';
  return element.all(by.xpath(xpathElements));
};

/**
 * @function getIcons
 * @description This function is used to get all the icons of an elements.
 * @returns {ref} Returns the reference of all icons.
 */
TileOptionsRiskStressTests.prototype.getIcons = function(elementName, container) {

  var xpath;
  if (container.toLowerCase() === 'available') {
    xpath = this.xpathAvailableContainer + '//tf-virtual-listbox-item-template[normalize-space()="' + elementName + '"]';
  }else {
    xpath = this.xpathSelectedContainer + '//tf-virtual-listbox-item-template[normalize-space()="' + elementName + '"]';
  }

  var xpathElements =  xpath + '//*[contains(@class, "tf-icon")]';

  return element.all(by.xpath(xpathElements));
};

module.exports = new TileOptionsRiskStressTests();
