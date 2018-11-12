'use strict';

var TileOptionsRiskRiskModels = function() {
  this.xpathRiskModels = '//*[@data-qa-id="options-container" and not(contains(@class,"ng-hide"))]';
  this.xpathAvailableContainer = this.xpathRiskModels + '//tf-transferbox-source-list//tf-virtual-listbox';
  this.xpathSelectedContainer = this.xpathRiskModels + '//tf-transferbox-target-list//tf-virtual-listbox';
  this.xpathSearch = this.xpathRiskModels + '//tf-transferbox-source-control-search//tf-textbox';
  this.xpathTransferBox = this.xpathRiskModels + '//tf-transferbox';
  this.xpathClearAllIcon = this.xpathRiskModels + '//span[@tf-button][contains(@icon,"remove") and ' +
    'descendant::*[normalize-space(.)="Clear All"]]';

  // Returns: Returns the reference of any check box from risk section (replacingText : Check box Name)
  // Usage: CommonFunctions.replaceStringInXpath( TileOptionsRiskRiskModels.xpathCheckboxOfElementFromSelected, 'Barra Global Long-Term Model (GEM3L)' );
  this.xpathCheckboxOfElementFromSelected = this.xpathSelectedContainer + '//tf-virtual-listbox-item-template//*[normalize-space(.)="replacingText"]//tf-checkbox';
  this.xpathVisibleFactors = '//*[@data-qa-id="hide-show-factors-section"]';
  this.xpathBlastingWindow = '//*[@data-qa-id="blasting-panel"]';
  this.xpathOkOrCancelButton = '//*[@data-qa-id="text-button"][normalize-space(.)= "replacingText"]';
  this.xpatcheckboxFromSelectedSection = this.xpathSelectedContainer + '//tf-virtual-listbox-item//*[normalize-space(.)="replacingText"]//tf-checkbox';
  this.xpathSearchBoxDeleteIcon = this.xpathSearch + '//tf-textbox-clear';
  this.xpathAddNewButton = this.xpathRiskModels + '//tf-transferbox-source//tf-transferbox-source-controls' +
    '//tf-transferbox-source-control-items//span[@tf-button][contains(@icon,"add")]';
  this.xpath = '//tf-dialog';
  this.xpathButtonFromDialogBox = this.xpath + '//tf-button[normalize-space(.)="replacingText"]';
  this.xpathProgressIndicator = '//tf-progress-indicator';
  this.xpathHeaderDropdown = '//*[@data-qa-id="options-header"]//tf-dropdown-select';
  this.xpathCheckBox = '//tf-checkbox[normalize-space(.)="replacingText"]';
  this.xpathButton = '//span[@tf-button][normalize-space(.)="replacingText"]';
  this.xpathFactorGroupingButton = '//*[@data-qa-id="dropdown-risk-rm-select-factor-grouping"]//span[@tf-button]';
  this.xpathOfSelectedSctionsItem = '//tf-transferbox-target-content//tf-virtual-listbox//*[normalize-space(text())="replacingText"]';
};

/********************************************************************************************/
/* Function: getAllElementsFromSelectedSection                                              */
/* Description: This function returns the reference all the elements present in the Selected*/
/*              Section.                                                                    */
/* Return: Returns reference of elements from "Selected" section.                           */
/********************************************************************************************/
TileOptionsRiskRiskModels.prototype.getAllElementsFromSelectedSection = function() {
  var xpathElements = '//tf-transferbox-target-list//tf-listbox//tf-listbox-item';

  return element.all(by.xpath(xpathElements));
};

/**
 * @function getElementFromSelectedSection
 * @description This function returns the reference of specific element from Selected section.
 * @param {string} [elementName] Name of the element whose reference is needed.
 * @param {Boolean} [isSelected] To know element is selected or not. Pass "True"
 * @returns {ref} Returns the reference of required element.
 */
TileOptionsRiskRiskModels.prototype.getElementFromSelectedSection = function(elementName, isSelected) {
  var xpathElement;
  if (isSelected) {
    xpathElement = this.xpathSelectedContainer + '//tf-virtual-listbox-item[descendant::*[normalize-space(.)="' + elementName + '"]]';
  } else {
    xpathElement = this.xpathSelectedContainer + '//tf-virtual-listbox-item-handle[normalize-space(.)="' + elementName + '"]';
  }

  browser.driver.wait(function() {
    return element(by.xpath(xpathElement)).isDisplayed().then(function(isfound) {
      return isfound;
    }, function() {
      return false;
    });
  }, 4000).then(function() {
  }, function() {
  });

  return element(by.xpath(xpathElement));
};

/**
 * @function getAllCheckBoxesFromSelectedSection
 * @description This function returns the reference of all checkbox from Selected section.
 * @returns {ref} Returns the reference of all checkboxes from Selected section.
 */
TileOptionsRiskRiskModels.prototype.getAllCheckBoxesFromSelectedSection = function() {
  var xpathElement = this.xpathSelectedContainer + '//tf-virtual-listbox-item-template//tf-virtual-listbox-item-label';
  return element.all(by.xpath(xpathElement));
};

/********************************************************************************************/
/* Function: getFactorGroupingDropDown                                                      */
/* Description: This function returns the reference of "Factor Grouping" drop down.         */
/* Return: Promise which resolves to reference of "Factor Grouping" drop down.              */
/********************************************************************************************/
TileOptionsRiskRiskModels.prototype.getFactorGroupingDropDown = function() {
  var xpathDropDown = '//*[normalize-space(.)="Factor Grouping"]/following-sibling::*[@id="factorGroupingSelect"]//tf-button';

  return element(by.xpath(xpathDropDown));
};

/**
 * @function getFactorGroupingWrenchIcon
 * @description This function returns the reference of wrench icon of the Factors Grouping
 * @returns {elementFinder} Returns the reference of the Factor Groping Wrench.
 */
TileOptionsRiskRiskModels.prototype.getFactorGroupingWrenchIcon = function() {
  var xpathWrench = '//*[@id="factorGroupingSelect"]//*[contains(@class,"tools")]';

  return element(by.xpath(xpathWrench));
};

/**************************************************************************************************/
/* Function: getAllCheckboxFromVisibleFactors                                                     */
/* Description: This function returns the reference of all the checkboxes from "Visible Factors"  */
/*              section.                                                                          */
/* Return: Promise which resolves to reference of all checkboxes.                                 */
/**************************************************************************************************/
TileOptionsRiskRiskModels.prototype.getAllCheckboxFromVisibleFactors = function() {
  // Variable(s)
  var xpathCheckBoxes = '//tf-virtual-checklist-item-template|//tf-virtual-checklist-group-template';

  return element.all(by.xpath(xpathCheckBoxes));
};

/**************************************************************************************************/
/* Function: getCheckboxFromHideShowFactors                                                       */
/* Description: This function returns the reference of specific checkbox from "Hide/Show Factors" */
/*              section.                                                                          */
/* Params: cbName -> Name of the checkbox whose reference is needed.                              */
/* NOTE: Names are Case-Sensitive.                                                                */
/* Return: Promise which resolves to reference of specific checkbox.                              */
/**************************************************************************************************/
TileOptionsRiskRiskModels.prototype.getCheckboxFromHideShowFactors = function(cbName) {
  var xpathCheckBox = '//*[@id="hideShowFactors"]//tf-checkbox[normalize-space(.)="' + cbName + '"]';
  return element(by.xpath(xpathCheckBox));
};

/**
 * @function expandElementTree
 * @description This function is used to expand the Tree passed as an argument to the function.
 * @param {string} [elementPath] Path of tree to be expanded
 *                 Ex:FactSet|Portfolio|Position Data
 * @param {string} [excludeElements] Specify the elements to be excluded from expanding.
 *                 Note:  for Example, to exclude "FactSet and Portfolio" from "FactSet|Portfolio| Position Data" then
 *                 parameter should be "FactSet|Portfolio".
 * @returns {*} NA
 */
TileOptionsRiskRiskModels.prototype.expandElementTree = function(elementPath, excludeElements) {
  var arrElements = elementPath.split('|');
  var xpathExpandButton;
  var arrExcludedElements;
  if (excludeElements === undefined) {
    arrExcludedElements = undefined;
  } else {
    arrExcludedElements = excludeElements.split('|');
  }

  xpathExpandButton = this.xpathAvailableContainer;

  if (arrElements.length === 1) {
    xpathExpandButton += '//*[normalize-space(.)="' + arrElements[0] + '"]//*[contains(@class, "icon-tree")]';

    // Scroll the element into visibility
    Utilities.makeElementVisible(element(by.xpath(xpathExpandButton)));

    element(by.xpath(xpathExpandButton)).click();

  } else {
    for (var i = 0; i < arrElements.length; i++) {
      xpathExpandButton += '//*[normalize-space(.)="' + arrElements[i] + '"]//*[contains(@class, "icon-tree")]';

      if (arrExcludedElements === undefined) {
        // Scroll the element into visibility
        Utilities.makeElementVisible(element(by.xpath(xpathExpandButton)));

        element(by.xpath(xpathExpandButton)).click();
      } else if (arrExcludedElements.indexOf(arrElements[i]) < 0) {
        // Scroll the element into visibility
        Utilities.makeElementVisible(element(by.xpath(xpathExpandButton)));

        element(by.xpath(xpathExpandButton)).click();
      } else {
        arrExcludedElements.splice(arrExcludedElements.indexOf(arrElements[i]), 1);
      }

      if (i !== arrElements.length - 1) {
        xpathExpandButton += '/ancestor::*[contains(@class, "selectable-handle")]' +
          '/following-sibling::*';
      }
    }
  }
};

/**
 * @function checkIfExpanded
 * @description This function is used to check if given element is expanded.
 * @param {string} elementPath Parent element in which required element is present Ex: FactSet|Portfolio|Position Data
 */
TileOptionsRiskRiskModels.prototype.checkIfExpanded = function(elementPath) {
  var arrElements = elementPath.split('|');
  var xpathParentElement;
  if (arrElements.length === 1) {
    xpathParentElement = this.xpathAvailableContainer + '//tf-listbox-item//*[normalize-space(.)="' + arrElements[0] + '"]' +
      '/ancestor::tf-listbox-item[1]';
    expect(element.all(by.xpath(xpathParentElement)).first().getAttribute('class')).toContain('expanded');
  } else {
    xpathParentElement = this.xpathAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      xpathParentElement = this.xpathAvailableContainer + '//tf-listbox-item//*[normalize-space(.)="' + arrElements[i] + '"]' +
        '/ancestor::tf-listbox-item[1]';

      expect(element.all(by.xpath(xpathParentElement)).first().getAttribute('class')).toContain('expanded');
    }
  }
};

/**
 * @function getEleFromAvailAfterSearch
 * @description This function is used to get a particular element from the 'available' list after the search keyword is entered into the search field.
 * @param {string} elementName Name of the element to get the reference of.
 * @returns {ref} Returns the reference of required element.
 */
TileOptionsRiskRiskModels.prototype.getEleFromAvailAfterSearch = function(elementName) {
  // Creating the XPATH of particular element
  var xpathElement;
  xpathElement = this.xpathAvailableContainer + '//*[@ng-repeat]//*[normalize-space(text())="' + elementName + '" ]' +
    '/ancestor::*[@ng-repeat][1]';
  return element(by.xpath(xpathElement));
};

/**
 * @function getEleFromAvailAfterSearch
 * @description This function is used to get all elements from the 'available' list after the search keyword is entered into the search field.
 * @returns {ref} Returns the reference of all filtered elements.
 */
TileOptionsRiskRiskModels.prototype.getAllElementsFromAvailAfterSearch = function() {
  // Creating the XPATH of all element references
  var xpathElements;
  xpathElements = this.xpathAvailableContainer + '//tf-listbox-item[not(contains(@class, "parent"))]';
  return element.all(by.xpath(xpathElements));
};

/**
 * @function getElementFromAvailableSection
 * @description This function is used to get reference of a particular element from the "Available" section.
 * @param {string} [parentElementPath] Parent element in which required element is present
 *                 Ex:FactSet|Portfolio|Position Data
 * @param {string} [elementName] Name of the element you want to get the reference of
 *                 Ex: Port. Ending Quantity Held
 * @param {string} [isSelected] To know element is selected or not. Pass "True"
 * @returns {ref} Returns the reference of required element.
 */
TileOptionsRiskRiskModels.prototype.getElementFromAvailableSection = function(parentElementPath, elementName, isSelected) {
  var xpathParentElement;
  var xpathElement;
  var arrElements = parentElementPath.split('|');
  if (arrElements.length === 1) {
    xpathParentElement = this.xpathAvailableContainer + '//*[normalize-space(.)="' + arrElements[0] + '"]' +
      '/ancestor::*[contains(@class, "selectable-handle")]/following-sibling::*';
  } else {
    xpathParentElement = this.xpathAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      xpathParentElement += '//*[normalize-space(.)="' + arrElements[i] + '"]/ancestor::*[contains(@class,' +
        ' "selectable-handle")]/following-sibling::*';
    }
  }

  if (isSelected) {
    xpathElement = xpathParentElement + '//tf-listbox-item[descendant::*[normalize-space(.)="' + elementName + '"]]';
  } else {
    xpathElement = xpathParentElement + '//tf-listbox-item[normalize-space(.)="' + elementName + '"]';
  }

  // Scroll the element into visibility
  Utilities.makeElementVisible(element(by.xpath(xpathElement)));

  return element(by.xpath(xpathElement));
};

/**
 * @function getGroupElementsFrmOptionsPane
 * @description This function is used to get reference of all "tf-checklist-group" elements from the "Options Pane" section
 * @returns {arrayOfRefs} Returns array of "checklist" group items
 */

TileOptionsRiskRiskModels.prototype.getGroupElementsFrmOptionsPane = function() {
  var xpathGroupElements = '//tf-checklist-group';

  return element.all(by.xpath(xpathGroupElements));
};

/**
 * @function getCheckBox
 * @description This function is used get the reference of specified check box.
 * @param {string} [checkboxName] Specifies the name of checkbox whose reference is needed
 *                 Example: 'Interquartile Method', 'Inverse Interquartile'
 * @param {Boolean} [checkOff] If  this is TRUE to perform the click operation
 * @returns {ref} Returns the reference of specified checkbox.
 */
TileOptionsRiskRiskModels.prototype.getCheckBox = function(checkboxName, checkOff) {

  var xpathCheckBox = '//tf-checkbox-control[ancestor::*[normalize-space(.)="' + checkboxName + '"]]';
  var reference = element(by.xpath(xpathCheckBox));

  // Setting default parameter
  if (checkOff === undefined) {
    checkOff = false;
  }

  if (checkOff) {
    reference.click();
    return reference;
  } else {
    return reference;
  }
};

/**
 * @function getElementRemoveIconFromSelected
 * @description This function is used to get reference of a particular element remove icon from the "Selected" section.
 * @param {string} elementName Name of the element you want to get the reference of remove icon.
 * @returns {Elementfinder} Returns the reference of a element remove icon from the selected section
 */
TileOptionsRiskRiskModels.prototype.getElementRemoveIconFromSelected = function(elementName) {
  return element(by.xpath(this.xpathSelectedContainer + '//tf-listbox-item[descendant::*' +
    '//*[normalize-space(text())="' + elementName + '"]]//*[contains(@class,"icon-remove")]'));
};

/**
 * @function getWrenchActions
 * @description This function is used to get reference of Actions class of the Factor Grouping Wrench
 * @returns {obj} Returns the Class object of Actions class
 */
TileOptionsRiskRiskModels.prototype.getWrenchActions = function() {
  var xpathElement = '//*[@id="factorGroupingSelect"]//tf-actions';

  var ref = element(by.xpath(xpathElement));
  var elementActions = new TestHelpers.Actions(ref);
  return elementActions;
};

/**
 * @function getInfoBoxData
 * @description This function is used to get reference of InfoBox data.
 * @param {string} [labelName] Name of the label you want to get the value from info box.
 * @returns {ElementFinder} Returns the reference of Info box.
 */
TileOptionsRiskRiskModels.prototype.getInfoBoxData = function(labelName) {
  var infoBoxReference;

  infoBoxReference = element(by.xpath('//tf-panel//*[@data-qa-id="risk-rm-metadata-section"]//*[@data-qa-class="label-risk-rm-metadata"]' +
    '//*[contains(@class,"spotlight-label") and contains(text(), "' + labelName + '")]/following-sibling::*[contains(@class,"spotlight-value")]'));

  return infoBoxReference;
};

/**
 * @function getInfoBoxHeader
 * @description This function is used to get reference of InfoBox header.
 * @returns {ElementFinder} Returns the reference of Info box header
 */
TileOptionsRiskRiskModels.prototype.getInfoBoxHeader = function() {
  var elementInfoIcon = '//*[@class= "panel-header"]';
  return element(by.xpath(elementInfoIcon));
};

/********************************************************************************************/
/* Function: getVisibleFactorSection                                                        */
/* Description: This function returns the reference of "Visble Factor" Section.             */
/* Return: Returns the reference of the "Visble Factor" Section.                            */
/********************************************************************************************/
TileOptionsRiskRiskModels.prototype.getVisibleFactorSection = function() {
  var xpathVisibleFactor = '//*[@id="hideShowFactors"]';
  return element(by.xpath(xpathVisibleFactor));
};

/********************************************************************************************/
/* Function: getInfoIcon                                                                   */
/* Description: This function returns the reference of "Info Icon" Dialogbox.              */
/* @param {string} Section Name of the section you want to get the reference of            */
/* Ex: Available, Selected                                                                 */
/* @param {string} elementName Name of the element you want to get the reference of.       */
/* @param {string} Parent element in which required element is present                     */
/* Return: Returns the reference of the Information Box dialogbox.                         */
/********************************************************************************************/
TileOptionsRiskRiskModels.prototype.getInfoIcon = function(sectionName, elementName, parentElementPath) {

  var elementInfoIcon;
  if (sectionName === 'Available') {
    elementInfoIcon = this.getElementFromAvailableSection(parentElementPath, elementName).element(by.xpath('.//*[contains(@class, "tf-icon-info")]'));
  } else if (sectionName === 'Selected') {
    elementInfoIcon = this.getElementFromSelectedSection(elementName, true).element(by.xpath('.//*[contains(@class, "tf-icon-info")]'));
  }

  return elementInfoIcon;
};

/**
 * @function getSpinner
 * @description This function is used to get reference of a spinner
 * @returns {ElementFinder} Returns the element finder of the spinner
 */
TileOptionsRiskRiskModels.prototype.getSpinner = function() {
  return element(by.xpath('//tf-dialog//*[@data-qa-class="loading spinner"]'));
};

/**
 * @function getVisibleFactorExpandAndCollapseAllButton
 * @description This function is used to get reference of expand all and collapse all buttons of visible factors section
 * @param {string} action expand or collapse
 * @returns {ref} Returns reference of expand all or collapse all button
 */
TileOptionsRiskRiskModels.prototype.getVisibleFactorsExpandAndCollapseAllButton = function(action) {
  var xpath = '//*[@id="hideShowFactorsTopBox"]//*[contains(@class, "' + action.toLowerCase() + '-all")]';
  return element(by.xpath(xpath));
};

/**
 * @function getAllElementsUnderGroupFromVisibleFactors
 * @description This function is used to get reference of all child elements of parent element under visible factors section
 * @param parentElement Name of parent element
 * Ex: Market
 * @returns {ElementFinderArray} Returns array of child element references
 */
TileOptionsRiskRiskModels.prototype.getAllElementsUnderGroupFromVisibleFactors = function(parentElement) {
  var xpath = '//*[@data-qa-id="hide-show-factors-section"]//tf-checklist-group-label' +
    '[normalize-space(.)="' + parentElement + '"]/following-sibling::*//tf-checklist-item';
  return element.all(by.xpath(xpath));
};

/**
 * @function getComboBoxDropDown
 * @description This function is used to get drop down toggle of a combo box
 * @param {string} comboBoxName Name of the Combo Box
 * @returns {ElementFinder} Returns the element finder of drop down toggle of combo box
 */
TileOptionsRiskRiskModels.prototype.getComboBoxDropDown = function(comboBoxName) {
  var xpathDD = this.xpath;
  xpathDD += '//tf-label[normalize-space(.)="' + comboBoxName + '"]/parent::*/following-sibling::' +
    'tf-form-control//tf-button[contains(@class,"dropdown-btn")]';
  return element(by.xpath(xpathDD));
};

/**
 * @function getComboTextBox
 * @description This function is used to get text box reference of a combo box
 * @param {string} comboBoxName Name of the Combo Box
 * @returns {ElementFinder} Returns the element finder of text box of combo box
 */
TileOptionsRiskRiskModels.prototype.getComboTextBox = function(comboBoxName) {
  var xpathTextBox = this.xpath;
  xpathTextBox += '//tf-label[normalize-space(.)="' + comboBoxName + '"]/parent::*/following-sibling::' +
    'tf-form-control//tf-textbox[contains(@class,"dropdown-input")]';
  return element(by.xpath(xpathTextBox));
};

/**
 * @function getInputBox
 * @description This function is used to get input box reference
 * @param {string} inputName Name of the input box
 * @returns {ElementFinder} Returns the element finder of input
 */
TileOptionsRiskRiskModels.prototype.getInputBox = function(inputName) {
  var xpathInput = this.xpath;
  xpathInput += '//*[@data-qa-id="risk-custommac-' + inputName.toLowerCase().replace(/\s/g, '') + '"]';
  return element(by.xpath(xpathInput));
};

/**
 * @function expandElementTreeInDropDown
 * @description This function is used to expand element from the drop down
 * @param {string} elementPath Path of the tree to be expanded Ex: Unsubscribed Risk Models|APT
 * @param {string} excludeElements elements to be excluded
 */
TileOptionsRiskRiskModels.prototype.expandElementTreeInDropDown = function(elementPath, excludeElements) {
  // Variable( s )
  var arrElements = elementPath.split('|');
  var xpathExpandButton = '//tf-dropdown//*[contains(@class,"treeview ng-empty")]/ul/li';

  if (excludeElements !== undefined) {
    excludeElements = excludeElements.split('|');
  }

  // Scroll and expand element
  var scrollAndExpand = function() {
    // Scroll the element into visibility ( if  not visible )
    Utilities.makeElementVisible(element(by.xpath(xpathExpandButton)));

    element(by.xpath(xpathExpandButton)).getAttribute('class').then(function(attr) {
      if (attr.indexOf('expanded') === -1) {
        element(by.xpath(xpathExpandButton)).click();
      }
    });
  };

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
TileOptionsRiskRiskModels.prototype.getElementFromDropDown = function(parentElementPath, elementName, isTreeElement) {
  // Variable(s)
  var arrElements;
  var xpathParentElement = '//tf-dropdown//*[contains(@class,"treeview ng-empty")]/ul/li';

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
TileOptionsRiskRiskModels.prototype.checkIfExpandedDDElement = function(elementPath) {
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
 * @function getAllElementsFromGroup
 * @description  This function is used to get reference of all the elements under a particular group.
 * @param {string} [parentElementPath] parent element in which required element is present. Ex: Unsubscribed Risk Models|APT
 * @returns {ElementFinder} Returns the element finder of the the required element
 */
TileOptionsRiskRiskModels.prototype.getAllElementsFromGroup = function(parentElementPath) {
  // Variable(s)
  var xpathParentElement;
  var arrElements = parentElementPath.split('|');

  if (arrElements.length === 1) {
    xpathParentElement = this.xpathAvailableContainer + '//tf-listbox-item//*[normalize-space(.)="' + arrElements[0] +
      '"]/ancestor::*/following-sibling::tf-listbox-children//tf-listbox-item';
  } else {
    xpathParentElement = this.xpathAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      xpathParentElement = this.xpathAvailableContainer + '//tf-listbox-item//*[normalize-space(.)="' + arrElements[i] +
        '"]/ancestor::*/following-sibling::tf-listbox-children//tf-listbox-item';
    }
  }

  return element.all(by.xpath(xpathParentElement));
};

module.exports = new TileOptionsRiskRiskModels();
