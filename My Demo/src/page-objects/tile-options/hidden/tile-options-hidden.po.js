'use strict';

var TileOptionsHidden = function() {
  this.xpathAvailableContainer = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]//*[@data-qa-class="exclusions-available-tree"]';
  this.xpathSelectedContainer = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]//*[@data-qa-id="exclusions-selected-tree"]';
  this.xpathAvailableSearchField = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]//*[@data-qa-id="exclusions-available-search-box"]//input';
  this.xpathSelectedSearchField = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]//*[@data-qa-id="exclusions-selected-input-box"]//input';
  this.xpathBlastingWindow = '//*[@id="blastPanelhidden"]';
  this.xpathDataSpinner = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]//*[@data-qa-class="loading-spinner"]';
  this.xpathLoadingSecurities = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]//*[@selected-exclusions]//div[not(@*)]' +
    '[normalize-space(.)="Loading securities..."]';

  // Returns: Returns the reference of any list item from Available Section (replacingText : List Item name)
  // Usage: CommonFunctions.replaceStringInXpath( TileOptionsHidden.xpathOfAvailableSectionListItem, 'Adient plc' );
  this.xpathOfAvailableSectionListItem = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]' +
    '//*[@data-qa-id="exclusions-exclude-available-section"]//*[@data-qa-class="exclusions-available-tree"]' +
    '//li[normalize-space(.)="replacingText"]';

  // Returns: Returns the reference of Available or Selected Section (replacingText : section name)
  // Usage: CommonFunctions.replaceStringInXpath( TileOptionsHidden.xpathOfSelectedOrAvailableSection, 'available' );
  this.xpathOfSelectedOrAvailableSection = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]' +
    '//*[@data-qa-id="exclusions-exclude-replacingText-section"]//tf-virtual-listbox';
  this.xpathHiddenNameTextbox = '//*[@data-qa-id="exclusions-hide-name-input-box"]';

};

/****************************************************************************************/
/* Function: getEleContainer                                                            */
/* Description: This function is used to get reference of specified container.          */
/* Params: 1. containerName -> Name of the container to get its reference.              */
/*            Ex: Available or Selected                                                 */
/* Return: Promise which resolves to the reference of specified container.              */
/****************************************************************************************/
TileOptionsHidden.prototype.getEleContainer = function(containerName) {
  if (containerName.toLowerCase() === 'available') {
    return element(by.xpath(this.xpathAvailableContainer));
  } else if (containerName.toLowerCase() === 'selected') {
    return element(by.xpath(this.xpathSelectedContainer));
  }
};

/******************************************************************************************/
/* Function: getSearchField                                                               */
/* Description: This function is used to get reference of search field either from        */
/*              "Available" or "Selected" section.                                        */
/* Params: 1. sectionName -> Name of section from which search field reference is needed. */
/*            Ex: Available or Selected                                                   */
/* Return: Promise which resolves to the reference of search field from specified section.*/
/******************************************************************************************/
TileOptionsHidden.prototype.getSearchField = function(sectionName) {
  if (sectionName.toLowerCase() === 'available') {
    return element(by.xpath(this.xpathAvailableSearchField));
  } else if (sectionName.toLowerCase() === 'selected') {
    return element(by.xpath(this.xpathSelectedSearchField));
  }
};

/******************************************************************************************/
/* Function: getCheckbox                                                                  */
/* Description: This function is used to get reference of check box from the "Selected"   */
/*              section.                                                                  */
/* Params: 1. checkboxName -> Name of checkbox whose reference is required.               */
/*            Ex: Disable Hidden or Hide Benchmark Only                                   */
/* Return: Promise which resolves to the reference of checkbox.                           */
/******************************************************************************************/
TileOptionsHidden.prototype.getCheckbox = function(checkboxName) {
  var xpathCheckbox = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]//*[normalize-space(.)="' + checkboxName + '"]' +
    '//tf-checkbox-control';

  return element(by.xpath(xpathCheckbox));
};

/******************************************************************************************/
/* Function: getHideBenchOnlyDropDown                                                     */
/* Description: This function is used to get reference of drop down next to               */
/*              "Hide Benchmark Only" checkbox.                                           */
/* Params: NA                                                                             */
/* Return: Promise which resolves to the reference of drop down.                          */
/******************************************************************************************/
TileOptionsHidden.prototype.getHideBenchOnlyDropDown = function() {
  // Variable
  var xpathDropDown;

  xpathDropDown = '//*[@data-qa-id="dropdown-hide-benchmark-only"]';

  return element(by.xpath(xpathDropDown));
};

/******************************************************************************************/
/* Function: getOptionFromDropDown                                                        */
/* Description: This function is used to get reference of option from any drop down.      */
/* Params: 1. optionName -> Name of the option whose reference is required.               */
/* Return: Promise which resolves to the reference of option from drop down.              */
/* NOTE: You can get the reference of only when drop down is opened.                      */
/******************************************************************************************/
TileOptionsHidden.prototype.getOptionFromDropDown = function(optionName) {
  var xpathOption = '//tf-dropdown//*[@data-qa-class="dropdown-menu-item" and normalize-space(.)="' + optionName + '"]';

  return element(by.xpath(xpathOption));
};

/****************************************************************************************/
/* Function: expandElementTree                                                          */
/* Description: This function is used to expand the tree passed as an argument to the   */
/*              function.                                                               */
/* Params: 1. elementPath -> Path of tree to be expanded.                               */
/*            Ex: Commercial Services|Personnel Services                                */
/*         2. excludeElements -> Specify the elements to be excluded from expanding.    */
/*            for Example, to exclude "FactSet and Portfolio" from "FactSet|Portfolio|  */
/*            Position Data" then parameter should be "FactSet|Portfolio".              */
/****************************************************************************************/
TileOptionsHidden.prototype.expandElementTree = function(elementPath, excludeElements) {
  var arrElements = elementPath.split('|');
  var xpathExpandButton;
  var i;
  var arrExcludedElements;
  if (excludeElements === undefined) {
    arrExcludedElements = undefined;
  } else {
    arrExcludedElements = excludeElements.split('|');
  }

  xpathExpandButton = this.xpathAvailableContainer;

  if (arrElements.length === 1) {
    xpathExpandButton += '/ul/li/div[.="' + arrElements[0] + '"]//a';
    element(by.xpath(xpathExpandButton)).click();
  } else {
    for (i = 0; i < arrElements.length; i++) {
      xpathExpandButton += '/ul/li/div[.="' + arrElements[i] + '"]//a';

      if (arrExcludedElements === undefined) {
        element(by.xpath(xpathExpandButton)).click();
      } else if (arrExcludedElements.indexOf(arrElements[i]) < 0) {
        element(by.xpath(xpathExpandButton)).click();
      } else {
        arrExcludedElements.splice(arrExcludedElements.indexOf(arrElements[i]), 1);
      }

      if (i !== arrElements.length - 1) {
        xpathExpandButton += '/ancestor::li[1]';
      }
    }
  }
};

/****************************************************************************************/
/* Function: checkIfExpanded                                                            */
/* Description: This function is used to verify if given element(s) is/are expanded or  */
/*              not.                                                                    */
/* Params: 1. elementPath -> Path of tree to be verified.                               */
/*            Ex: Commercial Services|Personnel Services.                               */
/*            In this example, it verifies whether "Commercial Services" and "Personnel */
/*            Services" is expanded. If not, it fails the expectation.                  */
/****************************************************************************************/
TileOptionsHidden.prototype.checkIfExpanded = function(elementPath) {
  var arrElements = elementPath.split('|');
  var xpathParentElement;
  var i;
  if (arrElements.length === 1) {
    xpathParentElement = this.xpathAvailableContainer + '/ul/li/div[.="' + arrElements[0] + '"]//a/ancestor::li[1]';
    expect(element(by.xpath(xpathParentElement)).getAttribute('class')).toContain('expanded');
  } else {
    xpathParentElement = this.xpathAvailableContainer;
    for (i = 0; i < arrElements.length; i++) {
      if (i !== arrElements.length - 1) {
        xpathParentElement += '/ul/li/div[.="' + arrElements[i] + '"]//a/ancestor::li[1]';
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

/****************************************************************************************/
/* Function: getAllElementsFromSpecifiedLevelOfAvailableContainer                       */
/* Description: This function is used to get reference of all the elements from the     */
/*              specified level.                                                        */
/* Params: 1. levelNumber -> It is the number based on which this function get reference*/
/*            of all elements present at that level.                                    */
/* NOTE: If levelNumber >= 2, it gets the reference of elements from level 2 or above   */
/*       only if preceding element is expanded. For example, Suppose "Major Banks" falls*/
/*       under "Finance" tree, thus to get the reference of "Major Banks", "Finance"    */
/*       tree has be expanded.                                                          */
/****************************************************************************************/
TileOptionsHidden.prototype.getAllElementsFromSpecifiedLevelOfAvailableContainer = function(levelNumber) {
  var xpathLevel = this.xpathAvailableContainer;
  var addXpath = '[contains(@class, "expanded")]/ul/li';

  for (var i = 1; i <= levelNumber; i++) {
    if (i === 1) {
      xpathLevel += '/ul/li';
    } else {
      xpathLevel += addXpath;
    }
  }

  return element.all(by.xpath(xpathLevel + '/div'));
};

/****************************************************************************************/
/* Function: getElementFromAvailableSection                                             */
/* Description: This function is used to get a particular element reference from the    */
/*              "Available" section container.                                          */
/* Params: 1. parentElementPath -> Parent element in which required element is present. */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/*         2. elementName -> Name of the element you want to get the reference of.      */
/*                           Ex: Port. Ending Quantity Held                             */
/*         3. isTreeElement(optional) -> Default value is FALSE. If this is set to TRUE */
/*                                       it gets the reference of tree element. It tells*/
/*                                       whether required element is a tree element.    */
/* Return: Returns the reference of required element.                                   */
/* NOTE: Don't specify this element when you want to get tree element from first level. */
/****************************************************************************************/
TileOptionsHidden.prototype.getElementFromAvailableSection = function(parentElementPath, elementName, isTreeElement) {
  var arrElements = parentElementPath.split('|');
  var xpathParentElement;
  var i;
  if (isTreeElement === undefined) {
    isTreeElement = false;
  }

  if (arrElements.length === 1) {
    xpathParentElement = this.xpathAvailableContainer + '/ul/li/div[.="' + arrElements[0] + '"]//a/ancestor::li[1]';
  } else {
    xpathParentElement = this.xpathAvailableContainer;
    for (i = 0; i < arrElements.length; i++) {
      if (i !== arrElements.length - 1) {
        xpathParentElement += '/ul/li/div[.="' + arrElements[i] + '"]//a/ancestor::li';
      } else {
        xpathParentElement += '/ul/li/div[.="' + arrElements[i] + '"]//a/ancestor::li[1]';
      }
    }
  }

  if (isTreeElement) {
    // If elementName is not passed that means user want reference of parent element
    // This is applicable only for the tree element from 1st level
    if (elementName !== undefined) {
      return element(by.xpath(xpathParentElement + '/ul/li/div[text()="' + elementName + '"]'));
    } else {
      return element(by.xpath(xpathParentElement));
    }
  } else {
    return element(by.xpath(xpathParentElement + '/ul/li[.="' + elementName + '"]'));
  }

};

/****************************************************************************************/
/* Function: getFirstLevelTreeElementFromAvailableSection                               */
/* Description: This function is used to get tree element reference from the first level*/
/*              of "Available" section.                                                 */
/* Params: 1. treeEleName -> Tree element name.                                         */
/*                           Ex: Commercial Services or Finance etc.                    */
/* Return: Returns the reference of required tree element.                              */
/****************************************************************************************/
TileOptionsHidden.prototype.getFirstLevelTreeElementFromAvailableSection = function(treeEleName) {
  var xpathTreeElement = this.xpathAvailableContainer + '/ul/li/div[.="' + treeEleName + '"]';
  return element(by.xpath(xpathTreeElement));
};

/****************************************************************************************/
/* Function: getElementsListFromSelectedSection                                         */
/* Description: This function is used to get reference of all the elements from         */
/*              "Selected" section.                                                     */
/* Return: Returns the array of references for all elements in "Selected" container.    */
/****************************************************************************************/
TileOptionsHidden.prototype.getElementsListFromSelectedSection = function() {
  var xpathAllElements = this.xpathSelectedContainer + '//li';
  return element.all(by.xpath(xpathAllElements));
};

/****************************************************************************************/
/* Function: getElementFromSelectedSection                                              */
/* Description: This function is used to get a particular element reference from the    */
/*              "Selected" section container.                                           */
/* Params: 1. parentElementPath -> Parent element in which required element is present. */
/*                                 Ex: Economic Sector > Industry                       */
/*         2. elementName -> Name of the element you want to get the reference of.      */
/*                           Ex: Finance > Savings Banks                                */
/*         3. isTreeElement(optional) -> Default value is FALSE. If this is set to TRUE */
/*                                       it gets the reference of tree element. It tells*/
/*                                       whether required element is a tree element.    */
/* Return: Returns the reference of required element.                                   */
/* NOTE: Don't specify this element when you want to get tree element from first level. */
/****************************************************************************************/
TileOptionsHidden.prototype.getElementFromSelectedSection = function(parentElementPath, elementName, isTreeElement) {
  var arrElements = parentElementPath.split('|');
  var xpathParentElement;
  var i;

  if (isTreeElement === undefined) {
    isTreeElement = false;
  }

  if (arrElements.length === 1) {
    xpathParentElement = this.xpathSelectedContainer + '//*[@data-qa-class="exclusions-selected-item" and ' +
      'descendant::*[normalize-space(.)="' + arrElements[0] + '"]]';
  } else {
    xpathParentElement = this.xpathAvailableContainer;
    for (i = 0; i < arrElements.length; i++) {
      xpathParentElement += '//*[@data-qa-class="exclusions-selected-item" and ' +
        'descendant::*[normalize-space(.)="' + arrElements[i] + '"]]';
    }
  }

  if (isTreeElement) {
    // If elementName is not passed that means user want reference of parent element
    // This is applicable only for the tree element from 1st level
    if (elementName !== undefined) {
      return element(by.xpath(xpathParentElement + '//li[descendant::*[normalize-space(.)="' + elementName + '"]]'));
    } else {
      return element(by.xpath(xpathParentElement));
    }
  } else {
    return element(by.xpath(xpathParentElement + '//li[descendant::*[normalize-space(.)="' + elementName + '"]]'));
  }
};

/****************************************************************************************/
/* Function: getArrowButton                                                             */
/* Description: This function is used to get reference of either LEFT or RIGHT arrow    */
/*              button.                                                                 */
/* Params: 1. btnName -> Button name whose reference is needed.                         */
/*            Ex: Right or Left                                                         */
/* Return: Returns the reference of required arrow button.                              */
/****************************************************************************************/
TileOptionsHidden.prototype.getArrowButton = function(btnName) {
  // Variable(s)
  var xpathButton = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]//*[contains(@class,"icon-arrow-' + btnName.toLowerCase() + '")]/..';

  return element(by.xpath(xpathButton));
};

/****************************************************************************************/
/* Function: getNameField                                                               */
/* Description: This function is used to get reference "Name" input field.              */
/* Return: Returns the reference of "Name" field.                                       */
/****************************************************************************************/
TileOptionsHidden.prototype.getNameField = function() {
  var xpathNameField = '//*[@data-qa-id="exclusions-hide-name-input-box"]//input';

  return element(by.xpath(xpathNameField));
};

/****************************************************************************************/
/* Function: getApplyToButton                                                           */
/* Description: This function is used to get reference of "Apply To ..." button from top*/
/*              right corner of web page.                                               */
/* Params: NA                                                                           */
/* Return: Returns the reference of button.                                             */
/****************************************************************************************/
TileOptionsHidden.prototype.getApplyToButton = function() {
  var xpathBlastLink = '//*[@data-qa-id="options-header"]//*[@data-qa-id="blasting-button"]';
  return element(by.xpath(xpathBlastLink));
};

/****************************************************************************************/
/* Function: getCheckBoxFromBlastWindow                                                 */
/* Description: This function is used to get reference of specified checkbox from the   */
/*              blasted window.                                                         */
/* Params: 1. checkBoxName -> Name of the checkbox whose reference is needed.           */
/* Return: Returns the reference of required checkbox.                                  */
/****************************************************************************************/
TileOptionsHidden.prototype.getCheckBoxFromBlastWindow = function(checkBoxName) {
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
TileOptionsHidden.prototype.getOkOrCancelButtonFromBlastedWindow = function(btnName) {
  var xpathButton = '//*[@data-qa-id="blasting-panel"]//*[@data-qa-id and normalize-space(.)="' + btnName + '"]';
  return element(by.xpath(xpathButton));
};

/****************************************************************************************/
/* Function: getEditGroupingsButton                                                     */
/* Description: This function is used to get reference of "Edit Groupings" button.      */
/* Return: Returns the reference of "Edit Groupings" button.                            */
/****************************************************************************************/
TileOptionsHidden.prototype.getEditGroupingsButton = function() {
  var xpathEditGroupings = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]//*[@data-qa-id="button-exclusions-edit-groupings"]';
  return element(by.xpath(xpathEditGroupings));
};

/****************************************************************************************/
/* Function: getRemoveButtonForElementFromSelectedSection                               */
/* Description: This function is used to get remove button of a particular element from */
/*              "Selected" section.                                                     */
/* Params: 1. parentElementPath -> Parent element in which required element is present. */
/*                                 Ex: Economic Sector > Industry                       */
/*         2. elementName -> Name of the element for which remove button reference is   */
/*                           needed.                                                    */
/*                           Ex: Finance > Savings Banks                                */
/*         3. isTreeElement(optional) -> Default value is FALSE. If this is set to TRUE */
/*                                       it gets the reference of tree element. It tells*/
/*                                       whether required element is a tree element.    */
/* Return: Returns the reference of required element.                                   */
/* NOTE: Don't specify elementName when you want to get tree element from first level.  */
/****************************************************************************************/
TileOptionsHidden.prototype.getRemoveButtonForElementFromSelectedSection = function(parentElementPath, elementName,
                                                                                     isTreeElement) {
  var arrElements = parentElementPath.split('|');
  var xpathParentElement;
  var i;

  if (isTreeElement === undefined) {
    isTreeElement = false;
  }

  if (arrElements.length === 1) {
    xpathParentElement = this.xpathSelectedContainer + '//*[@data-qa-class="exclusions-selected-item" and ' +
      'descendant::*[normalize-space(.)="' + arrElements[0] + '"]]';
  } else {
    xpathParentElement = this.xpathAvailableContainer;
    for (i = 0; i < arrElements.length; i++) {
      xpathParentElement += '//*[@data-qa-class="exclusions-selected-item" and ' +
        'descendant::*[normalize-space(.)="' + arrElements[i] + '"]]';
    }
  }

  if (isTreeElement) {
    // If elementName is not passed that means user want reference of parent element
    // This is applicable only for the tree element from 1st level
    if (elementName !== undefined) {
      return element(by.xpath(xpathParentElement + '//li[descendant::*[normalize-space(.)="' + elementName + '"]]'));
    } else {
      // Hover over element
      browser.actions().mouseMove(element(by.xpath(xpathParentElement))).perform();
      return element(by.xpath(xpathParentElement + '/div//*[contains(@class, "remove")]'));
    }
  } else {
    // Hover over element
    browser.actions().mouseMove(element(by.xpath(xpathParentElement + '//li[descendant::*' +
      '[normalize-space(.)="' + elementName + '"]]'))).perform();
    return element(by.xpath(xpathParentElement + '//li[descendant::*[normalize-space(.)="' + elementName + '"]]' +
      '//*[contains(@class, "remove")]'));
  }
};

/******************************************************************************************/
/* Function: getClearSelectedItemsButton                                                  */
/* Description: This function is used to get reference of button to clear the "Selected"  */
/*              section.                                                                  */
/* Return: Promise which resolves to the reference of "X" button present above "Selected" */
/*         section.                                                                       */
/******************************************************************************************/
TileOptionsHidden.prototype.getClearSelectedItemsButton = function() {
  var xpathClearButton = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]//*[@data-qa-id="button-exclusions-remove-all"]';

  return element(by.xpath(xpathClearButton));
};

module.exports = new TileOptionsHidden();
