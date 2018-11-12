'use strict';

var TileOptionsExclusions = function() {
  this.xpathAvailableContainer = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]' +
    '//*[@data-qa-class="exclusions-available-tree"]';
  this.xpathSelectedContainer = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]' +
    '//*[@data-qa-id="exclusions-selected-tree"]';
  this.xpathAvailableSearchField = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]' +
    '//*[@data-qa-id="exclusions-available-search-box"]//input';
  this.xpathSelectedSearchField = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]' +
    '//*[@data-qa-id="exclusions-selected-input-box"]//input';
  this.xpathBlastingWindow = '//*[@id="blastPanelexclusions"]';
  this.xpathDataSpinner = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]' +
    '//*[@data-qa-class="loading-spinner"]';
  this.xpathLoadingSecurities = this.xpathDataSpinner + '//*[normalize-space(text())="Loading securities..."]';
  this.xpathToggleAccountDropDown = '//*[@ng-model="portfolioId"]';

  // Returns: Returns the reference of any list item from Available Section (replacingText : List Item name)
  // Usage: CommonFunctions.replaceStringInXpath( TileOptionsExclusions.xpathOfAvailableSectionListItem, '91288FL9' );
  this.xpathOfAvailableSectionListItem = '//*[@data-qa-id="exclusions-exclude-available-section"]//tf-virtual-listbox//*[normalize-space(text())="replacingText"]';
  this.xpathAssetsNotCoveredbyRiskModelDropdown = '//tf-dropdown-select[@data-qa-id="dropdown-securities-not-covered-by-the-risk-model"]';

  // Returns: Returns the reference of Available or Selected Section (replacingText : section name)
  // Usage: CommonFunctions.replaceStringInXpath( TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'available' );
  this.xpathOfSelectedOrAvailableSection = '//*[@data-qa-id="exclusions-exclude-replacingText-section"]//tf-virtual-listbox';
  this.xpathAvailableSection = '//*[contains(@data-qa-id,"exclusions-exclude-available-section")]';
  this.xpathRemoveAll = '//tf-transferbox-target-control-clear//tf-button';
  this.xpathOfBlastingButtons = '//*[@data-qa-id="blasting-panel"]//tf-button//*[normalize-space(text())="replacingText"]';
  this.xpathExclusionNameTextbox = '//*[@data-qa-id="exclusions-exclude-name-input-box"]';
};

/****************************************************************************************/
/* Function: getEleContainer                                                            */
/* Description: This function is used to get reference of specified container.          */
/* Params: 1. containerName -> Name of the container to get its reference.              */
/*            Ex: Available or Selected                                                 */
/* Return: Promise which resolves to the reference of specified container.              */
/****************************************************************************************/
TileOptionsExclusions.prototype.getEleContainer = function(containerName) {
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
TileOptionsExclusions.prototype.getSearchField = function(sectionName) {
  if (sectionName.toLowerCase() === 'available') {
    return element(by.xpath(this.xpathAvailableSearchField));
  } else if (sectionName.toLowerCase() === 'selected') {
    return element(by.xpath(this.xpathSelectedSearchField));
  }
};

/******************************************************************************************/
/* Function: getClearSearchFieldButton                                                    */
/* Description: This function is used to get reference of clear button from search field  */
/*              of either "Available" or "Selected" section.                              */
/* Params: 1. sectionName -> Name of section from which search field's clear button       */
/*            reference is needed.                                                        */
/*            Ex: Available or Selected                                                   */
/* Return: Promise which resolves to the reference of "X" button of search field from     */
/*         specified section.                                                             */
/******************************************************************************************/
TileOptionsExclusions.prototype.getClearSearchFieldButton = function(sectionName) {
  if (sectionName.toLowerCase() === 'available') {
    return element(by.xpath(this.xpathAvailableSearchField + '/following-sibling::*//*[contains(@class, "remove")]'));
  } else if (sectionName.toLowerCase() === 'selected') {
    return element(by.xpath(this.xpathSelectedSearchField + '/following-sibling::*//*[contains(@class, "remove")]'));
  }
};

/******************************************************************************************/
/* Function: getClearSelectedItemsButton                                                  */
/* Description: This function is used to get reference of button to clear the "Selected"  */
/*              section.                                                                  */
/* Return: Promise which resolves to the reference of "X" button present above "Selected" */
/*         section.                                                                       */
/******************************************************************************************/
TileOptionsExclusions.prototype.getClearSelectedItemsButton = function() {
  var xpathClearButton = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]' +
    '//*[@data-qa-id="button-exclusions-remove-all"]';

  return element(by.xpath(xpathClearButton));
};

/********************************************************************************************/
/* Function: getDialog                                                                      */
/* Description: This function is used to get reference of any dialog box based on its title.*/
/* Params: 1. titleOfDialog -> Pass the title of dialog box to get its reference.           */
/* Return: Promise which resolves to dialog box reference.                                  */
/********************************************************************************************/
TileOptionsExclusions.prototype.getDialog = function(titleOfDialog) {
  var xpathDialog = '//span[.="' + titleOfDialog + '"]/ancestor::div[@role="dialog"]';
  return element(by.xpath(xpathDialog));
};

/******************************************************************************************/
/* Function: getConfirmationDialogWithText                                                */
/* Description: This function is used to get reference of confirmation dialog box.        */
/* Params: text -> Text displayed inside the confirmation dialog box.                     */
/* Return: Promise which resolves to the reference of confirmation dialog.                */
/******************************************************************************************/
TileOptionsExclusions.prototype.getConfirmationDialogWithText = function(text) {
  var xpathDialog = '//*[@role="dialog" and descendant::*[normalize-space(.)="' + text + '"]]';
  return element(by.xpath(xpathDialog));
};

/******************************************************************************************/
/* Function: getButtonFromConfirmationDialog                                              */
/* Description: This function is used to get reference of button from confirmation dialog.*/
/* Params: btnName -> Name of the button from confirmation dialog.                        */
/* Return: Promise which resolves to the reference of button from confirmation dialog.    */
/******************************************************************************************/
TileOptionsExclusions.prototype.getButtonFromConfirmationDialog = function(btnName) {
  var xpathButton = '//*[normalize-space(.)="FactSet Research Systems"]/ancestor::*[@role="dialog"]' +
    '/descendant::button[normalize-space(.)="' + btnName + '"]';

  return element(by.xpath(xpathButton));
};

/******************************************************************************************/
/* Function: getCheckbox                                                                  */
/* Description: This function is used to get reference of check box from the "Selected"   */
/*              section.                                                                  */
/* Params: 1. checkboxName -> Name of checkbox whose reference is required.               */
/*            Ex: Exclude Cash,  Exclude Benchmark or Disable Exclusions                  */
/* Return: Promise which resolves to the reference of checkbox.                           */
/******************************************************************************************/
TileOptionsExclusions.prototype.getCheckbox = function(checkboxName) {
  var xpathCheckbox = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]' +
    '//*[normalize-space(.)="' + checkboxName + '"]//tf-checkbox-control';

  return element(by.xpath(xpathCheckbox));
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
TileOptionsExclusions.prototype.expandElementTree = function(elementPath, excludeElements) {
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
TileOptionsExclusions.prototype.checkIfExpanded = function(elementPath) {
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
TileOptionsExclusions.prototype.getAllElementsFromSpecifiedLevelOfAvailableContainer = function(levelNumber) {
  var xpathLevel = this.xpathAvailableContainer;
  var addXpath = '[contains(@class, "expanded")]/ul/li[not(@data-disabled)]';

  for (var i = 1; i <= levelNumber; i++) {
    if (i === 1) {
      xpathLevel += '/ul/li[not(@data-disabled)]';
    } else {
      xpathLevel += addXpath;
    }
  }

  return element.all(by.xpath(xpathLevel + '/div[text()]'));
};

/****************************************************************************************/
/* Function: getElementFromAvailableSection                                             */
/* Description: This function is used to get a particular element reference from the    */
/*              "Available" section container.                                          */
/* Params: 1. parentElementPath -> Parent element in which required element is present. */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/*         2. elementName -> Name of the element you want to get the reference of.      */
/*                           Ex: Port. Ending Quantity Held                             */
/*         3. isTreeElement(optional) -> It tells whether required element is a tree    */
/*                                       element. Default value is FALSE. If this is set*/
/*                                       to TRUE it gets the reference of tree element. */
/* Return: Returns the reference of required element.                                   */
/* NOTE: Don't specify elementName when you want to get tree element from first level.  */
/****************************************************************************************/
TileOptionsExclusions.prototype.getElementFromAvailableSection = function(parentElementPath, elementName, isTreeElement) {
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
      xpathParentElement += '/ul/li/div[.="' + arrElements[i] + '"]//a/ancestor::li[1]';
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
TileOptionsExclusions.prototype.getFirstLevelTreeElementFromAvailableSection = function(treeEleName) {
  var xpathTreeElement = this.xpathAvailableContainer + '/ul/li/div[.="' + treeEleName + '"]';
  return element(by.xpath(xpathTreeElement));
};

/****************************************************************************************/
/* Function: getElementsListFromSelectedSection                                         */
/* Description: This function is used to get reference of all the elements from         */
/*              "Selected" section.                                                     */
/* Return: Returns the array of references for all elements in "Selected" container.    */
/****************************************************************************************/
TileOptionsExclusions.prototype.getElementsListFromSelectedSection = function() {
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
/*         3. isTreeElement(optional) -> It tells whether required element is a tree    */
/*                                       element. Default value is FALSE. If this is set*/
/*                                       to TRUE it gets the reference of tree element. */
/* Return: Returns the reference of required element.                                   */
/* NOTE: Don't specify elementName when you want to get tree element from first level.  */
/****************************************************************************************/
TileOptionsExclusions.prototype.getElementFromSelectedSection = function(parentElementPath, elementName, isTreeElement) {
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
TileOptionsExclusions.prototype.getArrowButton = function(btnName) {
  // Variable(s)
  var xpathButton = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]' +
    '//*[contains(@class,"icon-arrow-' + btnName.toLowerCase() + '")]/..';

  return element(by.xpath(xpathButton));
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
TileOptionsExclusions.prototype.getRemoveButtonForElementFromSelectedSection = function(parentElementPath, elementName,
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

/****************************************************************************************/
/* Function: getNameField                                                               */
/* Description: This function is used to get reference "Name" input field.              */
/* Return: Returns the reference of "Name" field.                                       */
/****************************************************************************************/
TileOptionsExclusions.prototype.getNameField = function() {
  var xpathNameField = '//*[@data-qa-id="exclusions-exclude-name-input-box"]//input';

  return element(by.xpath(xpathNameField));
};

/****************************************************************************************/
/* Function: getApplyToButton                                                           */
/* Description: This function is used to get reference of "Apply To ..." button from top*/
/*              right corner of web page.                                               */
/* Params: NA                                                                           */
/* Return: Returns the reference of button.                                             */
/****************************************************************************************/
TileOptionsExclusions.prototype.getApplyToButton = function() {
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
TileOptionsExclusions.prototype.getCheckBoxFromBlastWindow = function(checkBoxName) {
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
TileOptionsExclusions.prototype.getOkOrCancelButtonFromBlastedWindow = function(btnName) {
  var xpathButton = '//*[@data-qa-id="blasting-panel"]//*[@data-qa-id and normalize-space(.)="' + btnName + '"]';
  return element(by.xpath(xpathButton));
};

/****************************************************************************************/
/* Function: getEditGroupingsButton                                                     */
/* Description: This function is used to get reference of "Edit Groupings" button.      */
/* Return: Returns the reference of "Edit Groupings" button.                            */
/****************************************************************************************/
TileOptionsExclusions.prototype.getEditGroupingsButton = function() {
  var xpathEditGroupings = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]' +
    '//*[@data-qa-id="button-exclusions-edit-groupings"]';
  return element(by.xpath(xpathEditGroupings));
};

/****************************************************************************************/
/* Function: getLoadingIcon                                                             */
/* Description: This function is used to get reference of "Loading securities..." from  */
/*              Available section.                                                      */
/*                                                                                      */
/* Return: Returns the reference of loading icon from the section.                      */
/****************************************************************************************/
TileOptionsExclusions.prototype.getLoadingIcon = function() {
  return element(by.xpath(this.xpathLoadingSecurities));
};

/****************************************************************************************/
/* Function: getGroupStatus                                                             */
/* Description: This function is used to get the status of group element in the Listbox */
/* Params: 1. elementName -> Name of the element                                        */
/*         2. sectionName -> Name of section from which the element status is needed    */
/*            Ex: Available or Selected                                                 */
/*                                                                                      */
/* Return: Returns the reference of loading icon from the section.                      */
/****************************************************************************************/
TileOptionsExclusions.prototype.getGroupStatus = function(elementName, sectionName) {
  var xpathElement;
  if (sectionName.toLowerCase() === 'available') {
    xpathElement = '//*[@data-qa-id="exclusions-exclude-available-section"]//tf-virtual-listbox//' +
      'tf-virtual-listbox-group-handle[normalize-space(.)="' + elementName + '"]';
  } else {
    xpathElement = '//*[@data-qa-id="exclusions-exclude-selected-section"]//tf-virtual-listbox//' +
      'tf-virtual-listbox-group-handle[normalize-space(.)="' + elementName + '"]';
  }

  return element(by.xpath(xpathElement));
};

module.exports = new TileOptionsExclusions();
