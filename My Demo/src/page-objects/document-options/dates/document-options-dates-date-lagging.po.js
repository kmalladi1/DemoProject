'use strict';

var DocumentOptionsDatesDateLagging = function() {
  this.xpathDatesLagging = '//*[@data-qa-id="options-container" and not(contains(@class,"ng-hide"))]';
  this.xpathPortolioReturnCalculation = '//tf-dropdown-select[contains(@ng-model,"Port") and contains(@class,"date-lagging-menu")]';
  this.xpathBenchmarkReturnCalculation = '//tf-dropdown-select[contains(@ng-model,"Bench") and contains(@class,"date-lagging-menu")]';
  this.xpathAvailableContainer = '//*[@data-qa-class="exclusions-available-tree"]';
  this.xpathSelectedContainer = '//*[@data-qa-id="exclusions-selected-tree"]';
  this.xpathDataSpinner = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]' +
    '//*[@data-qa-class="loading-spinner"]';
  this.xpathOfSelectedOrAvailableSection = '//*[@data-qa-id="exclusions-exclude-replacingText-section"]//tf-virtual-listbox';
  this.xpathTransferBox = this.xpathDatesLagging + '//tf-transferbox';
  this.xpathDropdownButton = '//*[normalize-space(.)="replacingText"]/following-sibling::*//span[@tf-button]';
};

/**
 * @function getElementFromSelectedSection
 * @description This function is used to get a particular element reference from the Selected section container.
 * @param {string} parentElementPath Parent element in which required element is present. Ex: Canada|Asset
 * @param {string} elementName Name of the element you want to get the reference of. Ex: Thomson Reuters Corporation
 * @returns {Reference} Promise which resolves to required element.
 */
DocumentOptionsDatesDateLagging.prototype.getElementFromSelectedSection = function(parentElementPath, elementName) {
  var arrElements;
  var xpathParentElement;

  arrElements = parentElementPath.split('|');

  if (arrElements.length === 1) {
    xpathParentElement = this.xpathSelectedContainer + '//*[@data-qa-class="exclusions-selected-item" and ' +
      'descendant::*[normalize-space(.)="' + arrElements[0] + '"]]';
  } else {
    for (var i = 0; i < arrElements.length; i++) {
      xpathParentElement = this.xpathSelectedContainer + '//*[@data-qa-class="exclusions-selected-item" and ' +
        'descendant::*[normalize-space(.)="' + arrElements[0] + '"]]';
    }
  }

  if (elementName === undefined) {
    return element(by.xpath(xpathParentElement));
  } else {
    return element(by.xpath(xpathParentElement + '//li[descendant::*[normalize-space(.)="' + elementName + '"]]'));
  }

};

/**
 * @function getElementFromAvailableSection
 * @description This function is used to get a particular element reference from the "Available" section container.
 * @param {string} parentElementPath Parent element in which required element is present. Ex: FactSet|Portfolio
 * @param {string} elementName Name of the element you want to get the reference of. Ex: Egypt
 * @param {string} [isTreeElement] It tells whether required element is a tree element. Default value is FALSE. If this
 *                  is set to TRUE it gets the reference of tree element.
 * @returns {Reference} Promise which resolves to reference of required element.
 */
DocumentOptionsDatesDateLagging.prototype.getElementFromAvailableSection = function(parentElementPath, elementName, isTreeElement) {
  var arrElements = parentElementPath.split('|');
  var xpathParentElement;
  if (isTreeElement === undefined) {
    isTreeElement = false;
  }

  if (arrElements.length === 1) {
    xpathParentElement = this.xpathAvailableContainer + '/ul/li/div[.="' + arrElements[0] + '"]//a/ancestor::li[1]';
  } else {
    xpathParentElement = this.xpathAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      xpathParentElement += '/ul/li/div[.="' + arrElements[i] + '"]//a/ancestor::li[1]';
    }
  }

  if (isTreeElement) {
    if (elementName !== undefined) {
      return element(by.xpath(xpathParentElement + '/ul/li/div[text()="' + elementName + '"]'));
    } else {
      return element(by.xpath(xpathParentElement));
    }
  } else {
    return element(by.xpath(xpathParentElement + '/ul/li[.="' + elementName + '"]'));
  }

};

/**
 * @function getArrowButton
 * @description Description: This function is used to get reference of arrow button either from PRICES or EXCHANGE RATES
 *            section.
 * @param {string} btnName Name of the button for which reference has to be collected.
 *                Ex: Right, Left, Up, Down.
 * @returns {Reference}Promise which resolves to reference of button.
 */
DocumentOptionsDatesDateLagging.prototype.getArrowButton = function(btnName) {
  // Variable(s)
  var xpathButton = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]' +
    '//*[contains(@class,"icon-arrow-' + btnName.toLowerCase() + '")]/parent::*';

  return element(by.xpath(xpathButton));
};

/**
 * @function expandElementTree
 * @description This function is used to expand the Tree passed as an argument to the function.
 * @param {string} elementPath Path of tree to be expanded
 *                 Ex:FactSet|Portfolio|Position Data
 * @param {string} excludeElements Specify the elements to be excluded from expanding.
 *                 Note:  for Example, to exclude "FactSet and Portfolio" from "FactSet|Portfolio| Position Data" then
 *                 parameter should be "FactSet|Portfolio".
 * @returns {*} NA
 */
DocumentOptionsDatesDateLagging.prototype.expandElementTree = function(elementPath, excludeElements) {
  // Variable( s )
  var arrElements;
  var arrExcludedElements;
  var xpathExpandButton;

  arrElements = elementPath.split('|');
  if (excludeElements === undefined) {
    arrExcludedElements = undefined;
  } else {
    arrExcludedElements = excludeElements.split('|');
  }

  if (arrElements.length === 1) {
    xpathExpandButton = this.xpathAvailableContainer + '/ul/li/div[.="' + arrElements[0] + '"]//a';

    // Scroll the element into visibility ( if  not visible )
    Utilities.makeElementVisible(element(by.xpath(xpathExpandButton)));

    element(by.xpath(xpathExpandButton)).click();
  } else {
    xpathExpandButton = this.xpathAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      xpathExpandButton += '/ul/li/div[.="' + arrElements[i] + '"]//a';

      if (arrExcludedElements === undefined) {

        // Scroll the element into visibility ( if  not visible )
        Utilities.makeElementVisible(element(by.xpath(xpathExpandButton)));

        element(by.xpath(xpathExpandButton)).click();
      } else if (arrExcludedElements.indexOf(arrElements[i]) < 0) {

        // Scroll the element into visibility ( if  not visible )
        Utilities.makeElementVisible(element(by.xpath(xpathExpandButton)));

        element(by.xpath(xpathExpandButton)).click();
      } else {
        arrExcludedElements.splice(arrExcludedElements.indexOf(arrElements[i]), 1);
      }

      if (i !== arrElements.length - 1) {
        xpathExpandButton += '/ancestor::li';
      }
    }
  }
};

/**
 * @function getAllListElements
 * @description This function is used to get the reference all the elements either from "Available" or
 /*              "Selected" container.
 * @param {string} containerName Name of the container in which items exists.
 *                Ex: Available or Selected.
 * @returns {Reference[]} Returns array of references of all the items from specified container.
 * NOTE: This function does not return the reference of tree element from "Available" container of "Prices"
 *         section. Ex: Fixed Income, Derivatives etc
 */
DocumentOptionsDatesDateLagging.prototype.getAllListElements = function(containerName) {
  if (containerName.toLowerCase() === 'available') {
    // Return the elements array from the "Available" list
    return element.all(by.xpath(this.xpathAvailableContainer + '//li[text() and @data-value and not( @style )]'));
  } else if (containerName.toLowerCase() === 'selected') {
    // Return the elements array from the "Selected" list
    return element.all(by.xpath(this.xpathSelectedContainer + '//li[text() and @data-value and not( @style )]'));
  }
};

/**
 * @function checkIfExpanded
 * @description This function is used to check if given element is expanded.
 * @param {string} elementPath Path of tree to be to be verified.
 *                 Ex:FactSet|Portfolio|Position Data
 * @returns {*} NA
 */
DocumentOptionsDatesDateLagging.prototype.checkIfExpanded = function(elementPath) {
  // Variable(s)
  var arrElements;
  var xpathParentElement;

  arrElements = elementPath.split('|');
  if (arrElements.length === 1) {
    xpathParentElement = this.xpathAvailableContainer + '/ul/li/div[.="' + arrElements[0] + '"]//a/ancestor::li';
    expect(element(by.xpath(xpathParentElement)).getAttribute('class')).toContain('expanded');
  } else {
    xpathParentElement = this.xpathAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      if (i !== arrElements.length - 1) {
        xpathParentElement += '/ul/li/div[.="' + arrElements[i] + '"]//a/ancestor::li';
        if (i === 0) {
          expect(element(by.xpath(xpathParentElement)).getAttribute('class')).toContain('expanded');
        } else {
          expect(element(by.xpath(xpathParentElement + '[1]')).getAttribute('class')).toContain('expanded');
        }
      } else {
        xpathParentElement += '/ul/li/div[.="' + arrElements[i] + '"]//a/ancestor::li[1]';
        expect(element(by.xpath(xpathParentElement)).getAttribute('class')).toContain('expanded');
      }
    }
  }

  return element(by.xpath(xpathParentElement));
};

/**
 * @function getElementExpandButton
 * @description Description: This function is used to get reference of expand button for the
 *            specified tree element from "Available" container.
 * @param {string} elementName Name of the element you want to get the reference of.
 *                 Ex: Client Provided
 * @returns {Return}Returns the reference of required element.
 */
DocumentOptionsDatesDateLagging.prototype.getElementExpandButton = function(elementName) {
  return element(by.xpath(this.xpathAvailableContainer + '/ul/li/div[.="' + elementName + '"]//a/ancestor::li'));
};

/**
 * @function getListItem
 * @description Description: This function is used to get reference of specified element either from 'Available' or
 *            'Selected' container of 'PRICES' or 'EXCHANGE RATES' section.
 * @param {string} itemName Name of the element for which reference has to be collected.
 *                 Ex: Client Security Master.
 * @param {string} containerName Name of the section in which element exists.
 *                 Ex: Available or Selected.
 * @returns {Return} Returns the reference of required element.
 */
DocumentOptionsDatesDateLagging.prototype.getListItem = function(itemName, containerName) {
  // Variable(s)
  var xpathSelectItem;

  if (containerName.toLowerCase() === 'available') {
    xpathSelectItem = this.xpathAvailableContainer + '//li[@data-value][normalize-space(.)="' + itemName + '"]';
  } else if (containerName.toLowerCase() === 'selected') {
    xpathSelectItem = this.xpathSelectedContainer + '//li[@data-value][normalize-space(.)="' + itemName + '"]';
  }

  return element(by.xpath(xpathSelectItem));
};

/**
 * @function getElementRemoveButton
 * @description Description: This function is used to get reference 'X' icon for specified element from 'Selected'
 *            container of "PRICES", "EXCHANGE RATES" section.
 * @param {string}  eleName Name of the element for which 'X' icon reference has to be collected.
 * @returns {Return} Returns the reference of 'X' icon.
 */
DocumentOptionsDatesDateLagging.prototype.getElementRemoveButton = function(eleName) {
  // Variable(s)
  var xpathElementRemoveButton;

  // Hover over the element
  browser.actions().mouseMove(this.getListItem(eleName, 'Selected')).perform();

  // Get the XPATH of element's remove icon
  xpathElementRemoveButton = this.xpathSelectedContainer + '//li[@data-value][normalize-space(.)="' + eleName + '"]' +
    '//*[contains( @class, "remove" )]/..';

  return element(by.xpath(xpathElementRemoveButton));
};

module.exports = new DocumentOptionsDatesDateLagging();
