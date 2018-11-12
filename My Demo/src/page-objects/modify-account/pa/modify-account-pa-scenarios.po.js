'use strict';
var ModifyAccountPaScenarios = function() {
  this.xpathAvailableContainer = '//*[@data-qa-id="fi-scenario-section"]//*[@class="tf-treeview"]';
  this.xpathSelectedContainer = '//*[@class="listbox tf-buttons-container"]//*[@tabindex="-1"]';
  this.xpathFrequenciesSection = '//*[@data-qa-id="fi-pcf-frequencies-section"]';
};

/**
 * @function getSearchBox
 * @description This function is used to get the reference of search box textbox.
 * @param {string} sectionName Specify the section name from which search box is required.
 * @returns {obj} returns reference of the textbox.
 */
ModifyAccountPaScenarios.prototype.getSearchBox = function(sectionName) {
  var xpathSearchBox = '//*[@data-qa-id="fi-scenario-section"]//*[normalize-space(.)="' + sectionName + '"]//input';
  return element(by.xpath(xpathSearchBox));
};

/**
 * @function getAllFilteredItem
 * @description This function is used to get the reference of all filtered item from Available list.
 * @returns {obj} returns reference ofall filtered item.
 */
ModifyAccountPaScenarios.prototype.getAllFilteredItem = function() {
  var  xpathAllItem = '//*[@data-qa-id="fi-scenario-section"]//*[contains(@class,"tf-treeview-group tf-state-expanded")]//li[not(@style)]';
  return element.all(by.xpath(xpathAllItem));
};

/**
 * @function getTransferButton
 * @description This function is used to get the reference of the transfer button.
 * @param {string} buttonName Specify the name of the button whose reference is required.
 * @returns {obj} returns reference of transfer button.
 */
ModifyAccountPaScenarios.prototype.getTransferButton = function(buttonName) {
  var  xpathTransferButton = '//*[@class="transfer-buttons"]//button/*[contains(@class,"' + buttonName.toLowerCase() + '")]';
  return element(by.xpath(xpathTransferButton));
};

/**
 * @function getItemFromSelectedSection
 * @description This function is used to get the reference of the iparticular tem.
 * @param {string} itemName Specify the name of the item whose reference is required.
 * @returns {obj} returns reference of item from selected section.
 */
ModifyAccountPaScenarios.prototype.getItemFromSelectedSection = function(itemName) {
  var  xpathSelectedItem = '//*[@class="transfer-target"]//li[normalize-space(.)="' + itemName + '"]';
  return element(by.xpath(xpathSelectedItem));
};

/**
 * @function getSenarioLoadingIcon
 * @description This function is used to get the reference of spinner image.
 * @returns {obj} returns object of progress indicator.
 */
ModifyAccountPaScenarios.prototype.getSenarioLoadingIcon = function() {

  // Variable(s)
  var xpathProcessIndicator = '//*[@data-qa-class="loading spinner"]//*[contains(@class,"data-spinner")]';

  return element(by.xpath(xpathProcessIndicator));
};

/**
 * @function expandElementTree
 * @description This function is used to expand the tree passed as an argument to the function.
 * @param {string} elementPath NPath of tree to be expanded.
 *                             Ex: Commercial Services|Personnel Services
 * @param {string} excludeElements Specify the elements to be excluded from .
 *                 for Example, to exclude "FactSet and Portfolio" from "FactSet|Portfolio|Position Data" then parameter
 *                 should be "FactSet|Portfolio".
 * @returns NA
 */
ModifyAccountPaScenarios.prototype.expandElementTree = function(elementPath, excludeElements) {
  var arrElements = elementPath.split('|');
  var xpathExpandButton;
  var i;
  var arrFIElements;
  if (excludeElements === undefined) {
    arrFIElements = undefined;
  } else {
    arrFIElements = excludeElements.split('|');
  }

  xpathExpandButton = this.xpathAvailableContainer;

  if (arrElements.length === 1) {
    xpathExpandButton += '//ul/li/div[.="' + arrElements[0] + '"]//a';
    element(by.xpath(xpathExpandButton)).click();
  } else {
    for (i = 0; i < arrElements.length; i++) {
      xpathExpandButton += '//ul/li/div[.="' + arrElements[i] + '"]//a';

      if (arrFIElements === undefined) {
        element(by.xpath(xpathExpandButton)).click();
      } else if (arrFIElements.indexOf(arrElements[i]) < 0) {
        element(by.xpath(xpathExpandButton)).click();
      } else {
        arrFIElements.splice(arrFIElements.indexOf(arrElements[i]), 1);
      }

      if (i !== arrElements.length - 1) {
        xpathExpandButton += '/ancestor::li[1]';
      }
    }
  }
};

/**
 * @function checkIfExpanded
 * @description This function is used to verify if given element(s) is/are expanded or not.
 * @param {string} elementPath Path of tree to be verified.
 *                 Ex: Commercial Services|Personnel Services
 *                 In this example, it verifies whether "Commercial Services" and "Personnel  Services" is expanded.
 *                 If not, it fails the expectation.
 * @returns Reference of the element.
 */
ModifyAccountPaScenarios.prototype.checkIfExpanded = function(elementPath) {
  var arrElements = elementPath.split('|');
  var xpathParentElement;
  var i;
  if (arrElements.length === 1) {
    xpathParentElement = this.xpathAvailableContainer + '//ul/li/div[.="' + arrElements[0] + '"]//a/ancestor::li[1]';
    expect(element(by.xpath(xpathParentElement)).getAttribute('class')).toContain('expanded');
  } else {
    xpathParentElement = this.xpathAvailableContainer;
    for (i = 0; i < arrElements.length; i++) {
      if (i !== arrElements.length - 1) {
        xpathParentElement += '//ul/li/div[.="' + arrElements[i] + '"]//a/ancestor::li[1]';
        if (i === 0) {
          expect(element(by.xpath(xpathParentElement)).getAttribute('class')).toContain('expanded');
        } else {
          expect(element(by.xpath(xpathParentElement + '[1]')).getAttribute('class')).toContain('expanded');
        }
      } else {
        xpathParentElement += '//ul/li/div[.="' + arrElements[i] + '"]//a/ancestor::li[1]';
        expect(element(by.xpath(xpathParentElement)).getAttribute('class')).toContain('expanded');
      }
    }
  }

  return element(by.xpath(xpathParentElement));
};

/**
 * @function getElementFromAvailableSection
 * @description This function is used to get a particular element reference from the "Available" section container.
 * @param {string} parentElementPath Parent element in which required element is present.
 *                             Ex: FactSet
 * @param {string} elementName Name of the element you want to get the reference of
 *                 Ex: All Curves Shift down 350 bps
 * @param {string} isTreeElement[optional] It tells whether required element is a tree element. Default value is FALSE.
 *                 If this is set to TRUE it gets the reference of tree element.
 *                             Ex: Commercial Services|Personnel Services
 * @returns Returns the reference of required element.
 */
ModifyAccountPaScenarios.prototype.getElementFromAvailableSection = function(parentElementPath, elementName, isTreeElement) {
  var arrElements = parentElementPath.split('|');
  var xpathParentElement;
  var i;

  if (isTreeElement === undefined) {
    isTreeElement = false;
  }

  if (arrElements.length === 1) {
    xpathParentElement = this.xpathAvailableContainer + '//ul/li/div[.="' + arrElements[0] + '"]//a/ancestor::li[1]';
  } else {
    xpathParentElement = this.xpathAvailableContainer;
    for (i = 0; i < arrElements.length; i++) {
      if (i !== arrElements.length - 1) {
        xpathParentElement += '//ul/li/div[.="' + arrElements[i] + '"]//a/ancestor::li';
      } else {
        xpathParentElement += '//ul/li/div[.="' + arrElements[i] + '"]//a/ancestor::li[1]';
      }
    }
  }

  if (isTreeElement) {
    // If elementName is not passed that means user want reference of parent element
    // This is applicable only for the tree element from 1st level
    if (elementName !== undefined) {
      return element(by.xpath(xpathParentElement + '//ul/li/div[text()="' + elementName + '"]'));
    } else {
      return element(by.xpath(xpathParentElement));
    }
  } else {
    return element(by.xpath(xpathParentElement + '//ul/li[.="' + elementName + '"]'));
  }

};

/**
 * @function getEleFromSelectedList
 * @description This function is used to get reference of particular element from the "Selected" section.
 * @param {string} elementName Name of the element whose reference is required.
 *                 Ex: FactSet All Curves Shift down 205 bps.
 * @returns Returns the reference of required element from "Selected" section.
 */
ModifyAccountPaScenarios.prototype.getEleFromSelectedList = function(elementName) {
  // Return the reference
  return element(by.xpath(this.xpathSelectedContainer + '//li[.="' + elementName + '"]'));
};

/**
 * @function getButton
 * @description This function is used to get reference of particular element from the "Selected" section.
 * @param {string} btnName Name of the button for which reference has to be collected.
 *                 Ex: Right, Left, Up, Down.
 * @returns Promise which resolves to reference of button.
 */
ModifyAccountPaScenarios.prototype.getButton = function(btnName) {
  var xpathButton;
  if (btnName.toLowerCase() === 'left') {
    xpathButton = '//*[@data-qa-id="fi-scenario-section"]//*[@class="icon-arrow-left-s"]/..';
  } else if (btnName.toLowerCase() === 'right') {
    xpathButton = '//*[@data-qa-id="fi-scenario-section"]//*[@class="icon-arrow-right-s"]/..';
  } else if (btnName.toLowerCase() === 'up') {
    xpathButton = '//*[@data-qa-id="fi-scenario-section"]//*[@class="icon-arrow-up"]/..';
  } else if (btnName.toLowerCase() === 'down') {
    xpathButton = '//*[@data-qa-id="fi-scenario-section"]//*[@class="icon-arrow-down"]/..';
  } else if (btnName.toLowerCase() === 'clear') {
    xpathButton = '//*[@data-qa-id="fi-scenario-section"]//*[@class="icon-close-s"]/..';
  }

  return element(by.xpath(xpathButton));
};

/**
 * @function getAllElements
 * @description This function is used to get reference of all the elements either from "Available" container or from
 *              "Selected" container.
 * @param {string} sectionName Name of the section from which element references are needed.
 *                 Ex: Right, Left, Up, Down.
 * @returns Returns the reference of all the elements from "Available" or "Selected" container.
 */
ModifyAccountPaScenarios.prototype.getAllElements = function(sectionName) {
  // Variable(s)
  var xpathElements;

  if (sectionName.toLowerCase() === 'available') {
    xpathElements = this.xpathAvailableContainer + '//li';
  } else if (sectionName.toLowerCase() === 'selected') {
    xpathElements = this.xpathSelectedContainer + '/li';
  }

  return element.all(by.xpath(xpathElements));
};

module.exports = new ModifyAccountPaScenarios();
