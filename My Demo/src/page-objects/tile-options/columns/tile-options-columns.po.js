'use strict';

var TileOptionsColumns = function() {
  this.xpathAvailableContainer = '//*[@data-qa-id="columns-add-remove-available-tree" and not(contains(@class, "ng-hide"))]';
  this.xpathSelectedContainer = '//*[@data-qa-id="columns-add-remove-selected-tree"]';
  this.xpathOptionsContainer = '//*[@data-qa-id="columns-options-section"]';
  this.xpathSearchField = '//*[@data-qa-id="column-avail-tree-search"]//input';
  this.xpathColWeightDropDown = '//*[@data-qa-id="dropdown-column-weights-use-default"]';
  this.xpathFormatHeaderTextArea = '//*[@data-qa-id="column-header-textarea"]';
  this.xpathTimeSeriesFrequencySection = '//*[@data-qa-id="column-ts-frequency-section"]';
  this.xpathLoadingBox = '//*[@class="tf-alert-loading"]';
  this.arrExpandableSections = ['Format', 'Statistics', 'Conditional Formatting', 'OUTLIERS', 'Additional Options'];
  this.arrJustificationOptions = ['Left', 'Center', 'Right'];
  this.arrRiskSubSections = ['History', 'Frequency', 'Fill NAs'];
  this.arrOutliersSubSections = ['MAXIMUM VALUE', 'MINIMUM VALUE', 'APPLY OUTLIER SETTINGS'];
  this.arrOutliersReplaceWith = ['NA', 'NM (not meaningful)', 'Maximum'];
  this.xpathDefinitionDropDown = '//*[@data-qa-id="column-definition-section"]//tf-dropdown-select';
  this.xpathCharactersticsDisplayDropDown = '//*[normalize-space(.)="Characteristics Display"]//ancestor::*[contains(@class,"row")]' +
    '//tf-dropdown-select';
  this.xpathFrequencyDropdown = '//*[@data-qa-id="mpt-frequency-section"]//tf-dropdown-select';
  this.xpathSelectAnOptionDropdown = '//*[@data-qa-id="column-additional-options"]//tf-dropdown-select[normalize-space(.)="Select an option..."]';
  this.xpathCompoundingAlgorithmDropdown = '//*[@data-qa-id="dropdown-col-ts-compounding-algorithm"]';
  this.xpathSmoothingDropdown = '//*[@data-qa-id="dropdown-col-ts-smoothing-algorithm"]';
  this.xpathTargetDropDown = '//*[@data-qa-id="dropdown-col-ts-target"]';
  this.xpathTargetsTotalOnlyDropDown = '//*[@data-qa-id="dropdown-column-ts-opts-res-type"]';
  this.xpathAdditionalEffectsDropDown = '//*[@data-qa-id="column-ts-opts-add-effects"]//tf-dropdown-select';
  this.xpathYearsDropdown = '//*[@data-qa-id="dropdown-column-risk-opts-mpt-period"]';
  this.xpathTradingDaysDropdown = '//*[@data-qa-id="dropdown-column-risk-opts-var-days-year"]';
  this.varConfidenceInterval = '//*[@data-qa-id="input-box-column-risk-opts-var-confidence"]';
  this.xpathAdditionalOptionsDropdown = '//*[@data-qa-id="dropdown-col-return-meth-tm"]';

  // Returns: Returns the reference of any check box from Statistics section (replacingText : Check box Name)
  // Usage: CommonFunctions.replaceStringInXpath( TileOptionsColumns.xpathStatisticsCheckbox, 'All Groups' );
  this.xpathStatisticsCheckbox = '//*[@data-qa-id="column-statistics-section"]//tf-checkbox[normalize-space(.)=' +
    '"replacingText"]';

  // Returns: Returns the reference of any check box from risk section (replacingText : Check box Name)
  // Usage: CommonFunctions.replaceStringInXpath( TileOptionsColumns.xpathRiskCheckbox, 'Multi-Manager Risk' );
  this.xpathRiskCheckbox = '//*[@data-qa-id="column-risk-section"]//tf-checkbox[normalize-space(.)="replacingText"]';

  // Returns: Returns the reference of any text box from risk section
  // Usage: CommonFunctions.replaceStringInXpath( TileOptionsColumns.xpathTextBoxFromRiskSection, 'Risk Aversion' );
  this.xpathTextBoxFromRiskSection = '//*[normalize-space(.)="replacingText"]/following-sibling::tf-textbox';
  this.xpathAddNewButton = '//*[@data-qa-id="column-avail-new-dropdown"]';
  this.xpathDropDown = '//tf-dropdown-select[contains(@data-qa-id, "replacingText")]';
  this.xpathAddConditionButton = '//*[@data-qa-id="button-column-cf-add"]';
  this.xpathEqualsDropdown = '//tf-dropdown-select[contains(@ng-model,"Condition")]';
  this.xpathConstantdropdown = '//tf-dropdown-select[contains(@class,"constant ")]';
  this.xpathConstantTextbox = '//tf-textbox[contains(@ng-model,"conditionValue")]';
  this.xpathColorPickerButton = '//*[normalize-space(.)="replacingText"]//tf-button';
  this.xpathSliderHandle = '//*[normalize-space(.)="replacingText"]//tf-slider//' +
    'tf-slider-handle[contains(@class,"draggable")]';
  this.xpathButtonCheckbox = '//tf-button-checkbox[contains(@class,"replacingText")]';
  this.getXButtonOfConditionalFormatingSection = '//*[normalize-space(.)="replacingText"]/parent::*//tf-icon[@type="remove"]';
  this.xpathOfAdditionalOptionsSubSection = '//*[@data-qa-id="column-additional-options"]//*[normalize-space(.)="replacingText"]/parent::*[contains(@class,"pa-form-legend")]';
  this.xpathOfSetMinHoldingPeriod = '//tf-checkbox[normalize-space(.)="Set Min Holding Period"]';
  this.xpathOfHoldingPeriod = '//*[@data-qa-id="column-additional-options"]//tf-number-input/parent::*//*[normalize-space(.)="Holding Period"]';
  this.xpathOfHoldingFrequency = '//tf-dropdown-select[preceding-sibling::*[normalize-space(.)="Holding Frequency"]]';
  this.xpathOptionsContainerSubLevels = '//*[@data-qa-id="columns-options-section"]//*[@data-qa-id="column-statistics-section"]//tf-virtual-listbox';
  this.xpathOfSelectedOrAvailableSection = '//*[@data-qa-class="replacingText-section"]//tf-virtual-listbox';
  this.xpathHistoricalVaRStartOrEndDateDropDown = '//*[@data-qa-id="button-column-risk-opts-var-replacingText"]//tf-textbox-dropdown-toggle//span[@tf-button]';
  this.xpathHistoricalVaRStartOrEndDateTextBox = '//*[@data-qa-id="button-column-risk-opts-var-replacingText"]//tf-textbox';
  this.xpathXButtonOfDefinitionSection = '//*[@data-qa-class="remove-icon"]';
  this.xpathOfHeader = '//*[@data-qa-id="options-title"]';
  this.xpathNumberInputBox = '//*[contains(@data-qa-id,"replacingText-input-box")]';
  this.xpathDecimalInputButton = '//*[contains(@data-qa-id,"decimals-input-box")]//*[contains(@class,"arrow-replacingText")]';
  this.xpathOfSelectedSctionsItem = '//tf-transferbox-target-content//tf-virtual-listbox//*[normalize-space(text())="replacingText"]';
  this.xpathOfSelectedSectionFolderIcon = '//*[@data-qa-id="column-sel-tree-add-section"]//span[@tf-button]';
  this.xpathOfCreateSectionDialog = '//*[text()[normalize-space()="Create Section"]]/ancestor::tf-dialog';
  this.xpathOfCreateSectionTextBox = '//tf-textbox[@data-qa-id="column-new-section-input-box"]';
  this.xpathOfCreateNewSectionOKOrCancelButton = this.xpathOfCreateSectionDialog + '/ancestor::*/following-sibling::*//*[normalize-space(.)="replacingText"]';
  this.xpathOfAllItemsInSelectedSection = this.xpathSelectedContainer + '//*[@data-qa-class="selected-item" or contains(@class, "group-handle")]';
  this.xpathOfSelectedSectionHiddenItem = '//*[@data-qa-id="columns-add-remove-selected-tree"]//*[@data-qa-class="selected-item"]' +
  '//*[normalize-space(.)="replacingText"]/parent::*//tf-virtual-listbox-item-handle//span[contains(@class, "hidden")]';
  this.xpathOfTransferBox = '//pa-column-selection-transferbox//tf-transferbox';
  this.xpathSelectDropdown = '//tf-dropdown-select[contains(@ng-model,"conditionValue")]';
};

/**
 * @function getItemFromAvailableOrSelectedSection
 * @description This function is used to get the reference of the child item from group item
 * @param containerName {string} name of the container
 * @param parentName {string} Name of the parent element
 * @return Returns the reference of required element.
 */

TileOptionsColumns.prototype.getItemFromAvailableOrSelectedSection = function(containerName, elementName, parentName) {
  var xpathOfItemFromRequiredSection;
  var xpathOfItem;

  xpathOfItem = '//tf-virtual-listbox//*[normalize-space(.)="' + parentName + '"]/parent::*/' +
    'tf-virtual-listbox-group-handle/following-sibling::*//*[normalize-space(text())="' + elementName + '"]';

  if (containerName.toLowerCase() === 'available') {
    xpathOfItemFromRequiredSection = '//tf-transferbox-source' + xpathOfItem;

  } else if (containerName.toLowerCase() === 'selected') {
    xpathOfItemFromRequiredSection = '//tf-transferbox-target' + xpathOfItem;
  }

  return element(by.xpath(xpathOfItemFromRequiredSection));
};

/****************************************************************************************/
/* Function: getEleContainer                                                            */
/* Description: This function is used to get reference of either "Available" or         */
/*              "Selected" container.                                                   */
/* Params: 1. containerName -> Name of the container whose reference is required.       */
/*                                 Ex: Available or Selected.                           */
/****************************************************************************************/
TileOptionsColumns.prototype.getEleContainer = function(containerName) {
  if (containerName.toLowerCase() === 'available') {
    return element(by.xpath(this.xpathAvailableContainer));
  } else if (containerName.toLowerCase() === 'selected') {
    return element(by.xpath(this.xpathSelectedContainer));
  }
};

/****************************************************************************************/
/* Function: checkIfExpanded                                                            */
/* Description: This function is used to check if given element is expanded.            */
/* Params: 1. elementPath -> Path of tree to be to be verified.                         */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/****************************************************************************************/
TileOptionsColumns.prototype.checkIfExpanded = function(elementPath) {
  var arrElements = elementPath.split('|');
  var xpathParentElement;
  if (arrElements.length === 1) {
    xpathParentElement = this.xpathAvailableContainer + '//*[@data-qa-class="available-tree-item"]' +
      '//*[normalize-space(.)="' + arrElements[0] + '" and @tf-renamable-text]' +
      '/ancestor::*[@data-qa-class="available-tree-item"][1]';
    expect(element(by.xpath(xpathParentElement)).getAttribute('class')).toContain('expanded');
  } else {
    xpathParentElement = this.xpathAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      xpathParentElement += '//*[@data-qa-class="available-tree-item"]' +
        '//*[normalize-space(.)="' + arrElements[i] + '" and @tf-renamable-text]' +
        '/ancestor::*[@data-qa-class="available-tree-item"][1]';

      expect(element(by.xpath(xpathParentElement)).getAttribute('class')).toContain('expanded');
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
/*            for Example, to exclude "FactSet and Portfolio" from "FactSet|Portfolio|  */
/*            Position Data" then parameter should be "FactSet|Portfolio".              */
/****************************************************************************************/
TileOptionsColumns.prototype.expandElementTree = function(elementPath, excludeElements) {
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
    xpathExpandButton += '//*[@data-qa-class="available-tree-item"]' +
      '//*[normalize-space(.)="' + arrElements[0] + '" and @tf-renamable-text]' +
      '/ancestor::*[contains(@class, "selectable-handle")]//*[contains(@class, "icon-tree")]';

    // Scroll the element into visibility
    Utilities.makeElementVisible(element(by.xpath(xpathExpandButton)));

    element(by.xpath(xpathExpandButton)).click();

  } else {
    for (var i = 0; i < arrElements.length; i++) {
      xpathExpandButton += '//*[@data-qa-class="available-tree-item"]' +
        '//*[normalize-space(.)="' + arrElements[i] + '" and @tf-renamable-text]' +
        '/ancestor::*[contains(@class, "selectable-handle")]//*[contains(@class, "icon-tree")]';

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
          '/following-sibling::*[@data-qa-class="available-tree-group"]';
      }
    }
  }
};

/****************************************************************************************/
/* Function: getElementFromAvailableSection                                             */
/* Description: This function is used to get a particular element reference from the    */
/*              "Available" section container.                                          */
/* Params: 1. parentElementPath -> Parent element in which required element is present. */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/*         2. elementName -> Name of the element you want to get the reference of.      */
/*                           Ex: Port. Ending Quantity Held                             */
/* Return: Returns the reference of required element.                                   */
/****************************************************************************************/
TileOptionsColumns.prototype.getElementFromAvailableSection = function(parentElementPath, elementName) {
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
      xpathParentElement = xpathParentElement + '//*[@data-qa-class="available-tree-group"]' +
        '//*[normalize-space(.)="' + arrElements[i] + '" and @tf-renamable-text]' +
        '/ancestor::*[@data-qa-class="available-tree-group"][1]';
    }
  }

  xpathElement = xpathParentElement + '//*[@data-qa-class="available-tree-item"]' +
    '//*[normalize-space(.)="' + elementName + '" and @tf-renamable-text]' +
    '/ancestor::*[@data-qa-class="available-tree-item"][1]//tf-virtual-listbox-item-handle';

  // Scroll the element into visibility
  Utilities.makeElementVisible(element.all(by.xpath(xpathElement)).last());

  return element.all(by.xpath(xpathElement)).last();
};

/****************************************************************************************/
/* Function: getEleFromAvailAfterSearch                                                 */
/* Description: This function is used to get a particular element from the 'available'  */
/*              list after the search keyword is entered into the search field.         */
/* Params: elementName -> Name of the element to get the reference of.                  */
/* Param2: parentElementPath -> Parent element in which required element is present. */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/* Return: Returns the reference of required element.                                   */
/****************************************************************************************/
TileOptionsColumns.prototype.getEleFromAvailAfterSearch = function(elementName, parentElementPath) {
  // Creating the XPATH of particular element
  var xpathElement;
  var xpathParentElement;
  var arrElements;

  if (parentElementPath === undefined) {
    xpathElement = this.xpathAvailableContainer + '//*[@ng-repeat]//*[normalize-space(text())="' + elementName + '" ]' +
      '/ancestor::*[@ng-repeat][1]';
  } else {
    // Splitting parentElementPath to get parent elements
    arrElements = parentElementPath.split('|');
    xpathParentElement = this.xpathAvailableContainer;

    for (var i = 0; i < arrElements.length; i++) {
      xpathParentElement += '//*[@ng-repeat]//*[normalize-space(text())="' + arrElements[i] + '" ]' +
        '/ancestor::*[@ng-repeat][1]';
    }

    xpathElement = xpathParentElement + '//*[normalize-space(text())="' + elementName + '" ]/ancestor::*[@ng-repeat][1]';
  }

  return element(by.xpath(xpathElement));
};

/****************************************************************************************/
/* Function: getAllEleFromAvailAfterSearch                                              */
/* Description: This function is used to get a all element from the 'available'         */
/*              list after the search keyword is entered into the search field.         */
/* Return: Returns the reference of all elements.                                       */
/****************************************************************************************/
TileOptionsColumns.prototype.getAllElementsFromAvailAfterSearch = function() {
  var xpathElement = this.xpathAvailableContainer + '//*[contains(@ng-repeat, "column.id")]';
  return element.all(by.xpath(xpathElement));
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
TileOptionsColumns.prototype.getAllElementsFromGroup = function(parentElementPath) {
  // Variable(s)
  var xpathParentElement;
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

  return element.all(by.xpath(xpathParentElement + '//*[@data-qa-class="available-tree-item"]'));
};

/****************************************************************************************/
/* Function: getArrowButton                                                             */
/* Description: This function is used to get reference of particular button.            */
/* Params: btnName -> Name of the button whose reference is required.                   */
/*         Ex: Left, Right, Up or Down.                                                 */
/* Return: Returns the reference of required button.                                    */
/****************************************************************************************/
TileOptionsColumns.prototype.getArrowButton = function(btnName) {
  var xpathButton = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]' +
    '//*[@icon="arrow-' + btnName.toLowerCase() + '-s"]';

  return element(by.xpath(xpathButton));
};

/****************************************************************************************/
/* Function: getAllElements                                                             */
/* Description: This function is used to get reference of all the elements either from  */
/*              Available or Selected section.                                          */
/* Params: sectionName -> Name of the section from which reference of elements are      */
/*                        required.                                                     */
/* Return: Returns the reference of all the elements from the specified section.        */
/****************************************************************************************/
TileOptionsColumns.prototype.getAllElements = function(sectionName) {
  // Variable(s)
  var xpathElements;
  if (sectionName.toLowerCase() === 'available') {
    xpathElements = this.xpathAvailableContainer + '//*[@data-qa-class="available-tree-item"]//*[@tf-renamable-text]';
  } else if (sectionName.toLowerCase() === 'selected') {
    xpathElements = this.xpathSelectedContainer + '//*[@data-qa-class="selected-item" or contains(@ng-repeat, "column")]';
  } else if (sectionName.toLowerCase() === 'options') {
    xpathElements = this.xpathOptionsContainer + '//*[@data-qa-id and ' +
      '(@section-title and not(contains(@class, "ng-hide")))]';
  }

  return element.all(by.xpath(xpathElements));
};

/****************************************************************************************/
/* Function: getElementFromSelectedSection                                              */
/* Description: This function is used to get reference of particular element from the   */
/*              "Selected" section.                                                     */
/* Params: 1. elementName -> Name of the element whose reference is required.           */
/*         Ex: Port. Ending Weight.                                                     */
/*         2. parentElementPath -> Parent element in which required element is present. */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/*         3. occurrenceNumber (Optional) -> Default value is "1". This parameter is    */
/*                    used to get reference of element's particular occurrence number.  */
/* Return: Returns the reference of required element from "Selected" section.           */
/****************************************************************************************/
TileOptionsColumns.prototype.getElementFromSelectedSection = function(elementName, parentElementPath, occurrenceNumber) {
  // Variable(s)
  var arrElements;
  var xpathParentElement;
  var i;
  var xpathElement;

  // Check if "parentElementPath" parameter is passed
  if (parentElementPath === undefined) {
    xpathElement = this.xpathSelectedContainer + '//*[(@data-qa-class="selected-item" or @ng-repeat) ' +
      'and descendant::*//*[normalize-space(.)="' + elementName + '"]]';
  } else {
    arrElements = parentElementPath.split('|');
    xpathParentElement = this.xpathSelectedContainer;

    if (arrElements.length === 1) {
      xpathParentElement += '//*[(@data-qa-class="selected-item" or @ng-repeat) ' +
        'and descendant::*[normalize-space(.)="' + arrElements[0] + '"]]';
    } else {
      for (i = 0; i < arrElements.length; i++) {
        xpathParentElement += '//*[(@data-qa-class="selected-item" or @ng-repeat) ' +
          'and descendant::*[normalize-space(.)="' + arrElements[i] + '"]]';
      }
    }

    // Get element XPATH
    xpathElement = xpathParentElement + '//*[(@data-qa-class="selected-item" or @ng-repeat) ' +
      'and normalize-space(.)="' + elementName + '"]';
  }

  if (occurrenceNumber === undefined) {
    return element.all(by.xpath(xpathElement)).last();
  } else {
    return element.all(by.xpath(xpathElement)).get(occurrenceNumber - 1);
  }

};

/**
 * @function getSelectedSectionElement
 * @description This function is used get the reference of required element..
 * @param {string} parentElement Name of the group from which you want to select the element after search.
 * @param {string} elementName Name of the required element to get its status (enabled or disabled).
 * @returns Returns the reference of required element from "Selected" section.
 */
TileOptionsColumns.prototype.getSelectedSectionElement = function(elementName, parentElementpath) {
  var xpathElement;
  var xpathOfTheElement;
  xpathOfTheElement = '//*[@data-qa-class="selected-item"]' +
    '//*[normalize-space(.)="' + elementName + '"]/parent::*//tf-virtual-listbox-item-handle';

  if (parentElementpath !== undefined) {
    xpathElement = '//tf-virtual-listbox-group-handle[normalize-space(.)="' + parentElementpath + '"]/following-sibling::*' + xpathOfTheElement + '//span[@class]//tf-virtual-template-placeholder//span[@class]';
  } else {
    xpathElement = this.xpathSelectedContainer + '//*[@data-qa-class="selected-item"]' +
      '//*[normalize-space(.)="' + elementName + '"]/parent::*//tf-virtual-listbox-item-handle//span[@class]//tf-virtual-template-placeholder//span[@class]';
  }

  return element(by.xpath(xpathElement));
};

/****************************************************************************************/
/* Function: getIndexFromSelected                                                       */
/* Description: This function is used to get index of a particular element from         */
/*              "Selected" section.                                                     */
/* Params: elementName -> Name of the element whose index is required.                  */
/*         Ex: Port. Ending Weight.                                                     */
/* Return: Returns promise which resolves to the index of element from Selected section.*/
/****************************************************************************************/
TileOptionsColumns.prototype.getIndexFromSelected = function(elementName) {
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
/* Function: getClearListButton                                                             */
/* Description: This function returns the reference of "Clear List" button from Selected    */
/*              section.                                                                    */
/* Return: Returns reference of "Clear List" button.                                        */
/********************************************************************************************/
TileOptionsColumns.prototype.getClearListButton = function() {
  var xpathClearListButton = '//*[normalize-space(text())="Selected"]/following-sibling::*//tf-button[contains(@icon, "remove")]';
  return element(by.xpath(xpathClearListButton));
};

/****************************************************************************************/
/* Function: setSearchKeyword                                                           */
/* Description: This function is used to set given text into the "Available" search box */
/* Params: keyword -> Text to be entered into the Search box.                           */
/* Return: NA                                                                           */
/****************************************************************************************/
TileOptionsColumns.prototype.setSearchKeyword = function(keyword) {
  // Clear the search field
  element.all(by.xpath(this.xpathSearchField)).first().clear();

  // Enter the keyword into the search field
  element.all(by.xpath(this.xpathSearchField)).first().sendKeys(keyword);
};

/****************************************************************************************/
/* Function: getSearchClearButton                                                       */
/* Description: This function returns the reference of Clear button from Available      */
/*              Search field.                                                           */
/****************************************************************************************/
TileOptionsColumns.prototype.getSearchClearButton = function() {
  // XPATH for Search clear button
  var xpathSearchClearButton = this.xpathSearchField + '/following-sibling::' +
    '*/*[contains(@class, "remove")]';
  return element(by.xpath(xpathSearchClearButton));
};

/****************************************************************************************/
/* Function: verifyToolTip                                                              */
/* Description: This function is used verify the tooltip of the given column name either*/
/*              from 'Available' or 'Selected' container.                               */
/* Params: 1. containerName -> Name of the container in which column exists.            */
/*            Ex: Available or Selected                                                 */
/*         2. columnName -> Name of the column to hover over.                           */
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
/*         6. isAfterSearch (optional) -> This parameter takes boolean value. Default   */
/*            value for this variable is FALSE. If this is set to TRUE it gets the      */
/*            element reference from "Available" container after search criteria.       */
/* Return: Promise which resolves to TRUE if tooltip matches otherwise Error Message.   */
/****************************************************************************************/
TileOptionsColumns.prototype.verifyToolTip = function(containerName, columnName, tooltipText, parentPath, isTooltipExpected,
                                                       isAfterSearch) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var elementRef;
  var tooltipRef;

  // Getting tooltip class reference
  tooltipRef = ThiefHelpers.getToolTipClassReference();

  if (isTooltipExpected === undefined) {
    isTooltipExpected = true;
  }

  if (isAfterSearch === undefined) {
    isAfterSearch = false;
  }

  if (containerName.toLowerCase() === 'available') {
    if (isAfterSearch === false) {
      elementRef = this.getElementFromAvailableSection(parentPath, columnName);
    } else if (isAfterSearch === true) {
      elementRef = this.getEleFromAvailAfterSearch(columnName);
    }

    // Perform mouse move action
    browser.actions().mouseMove(elementRef).perform();

    // Wait for 2 seconds for tool tip to appear
    browser.sleep(2000);

    if (isTooltipExpected) {
      // Get the tooltip text from the web page
      tooltipRef.getContent().getText().then(function(actualToolTipText) {
        if (tooltipText !== actualToolTipText) {
          defer.reject('Tool tip text did not match. Expected: ' + tooltipText + ', Found: ' + actualToolTipText);
        } else {
          defer.fulfill(true);
        }
      });
    } else if (!isTooltipExpected) {
      tooltipRef.isOpen().then(function(isFound) {
        if (isFound === true) {
          defer.reject('Tooltip appeared when it is not expected');
        } else if (isFound === false) {
          defer.fulfill(true);
        }
      });
    }
  } else if (containerName.toLowerCase() === 'selected') {
    elementRef = this.getElementFromSelectedSection(columnName);

    browser.actions().mouseMove(elementRef).perform();
    browser.sleep(2000);

    if (isTooltipExpected) {
      // Get the tooltip text from the web page
      tooltipRef.getContent().getText().then(function(actualToolTipText) {
        if (tooltipText !== actualToolTipText) {
          defer.reject('Tool tip text did not match. Expected: ' + tooltipText + ', Found: ' + actualToolTipText);
        } else {
          defer.fulfill(true);
        }
      });
    } else if (!isTooltipExpected) {
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
/* Function: getAddNewButton                                                            */
/* Description: This function is used to get reference of "Add New (+)" button.         */
/* Return: Returns the reference of "Add New (+)" button.                               */
/****************************************************************************************/
TileOptionsColumns.prototype.getAddNewButton = function() {
  var xpathNewRefButton = '//*[@data-qa-id="column-avail-new-dropdown"]//span[@tf-button]';
  return element(by.xpath(xpathNewRefButton));
};

/****************************************************************************************/
/* Function: getDropDownOption                                                          */
/* Description: This function is used to get reference of option from drop down menu.   */
/* Params: 1. optionName -> Name of the option whose reference is required.             */
/*         Ex: New/Reference                                                            */
/*         2. occurrenceNumber (Optional) -> Default value is "1". In some cases, the   */
/*            option may be repeated in the drop down (Example, in currency drop down), */
/*            in such cases specify the occurrence number to get appropriate reference. */
/* Return: Returns the reference of required option from the drop down.                 */
/****************************************************************************************/
TileOptionsColumns.prototype.getDropDownOption = function(optionName, occurrenceNumber) {
  var xpathOption = '//tf-dropdown-legacy-content//*[@ng-repeat and descendant::*[normalize-space(.)="' + optionName + '"]]|' +
    '//tf-dropdown//*[@ng-repeat and descendant::*[normalize-space(.)="' + optionName + '"]]';
  if (occurrenceNumber === undefined) {
    return element.all(by.xpath(xpathOption)).first();
  } else {
    return element.all(by.xpath(xpathOption)).get(occurrenceNumber - 1);
  }
};

/****************************************************************************************/
/* Function: getEditIconForColumnInAvailableSection                                     */
/* Description: This function is used to get a "Edit" icon reference of given "Column"  */
/*              from "Available" section.                                               */
/* Params: 1. parentElementPath -> Parent element in which required column is present.  */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/*         2. colName -> Name of the column whose "Edit" icon reference is required.    */
/*                           Ex: Port. Ending Quantity Held                             */
/* Return: Returns the reference of required column's Edit icon.                        */
/****************************************************************************************/
TileOptionsColumns.prototype.getEditIconForColumnInAvailableSection = function(parentElementPath, colName) {
  // Variable(s)
  var xpathEditButton;
  var arrElements = parentElementPath.split('|');
  var xpathParentElement;
  var xpathColumn;

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

  // Scroll the element into visibility
  Utilities.makeElementVisible(element.all(by.xpath(xpathColumn)).last());

  // Hover over the required column
  browser.actions().mouseMove(element.all(by.xpath(xpathColumn)).last()).perform();

  // XPATH of required column's Edit button
  xpathEditButton = xpathColumn + '//*[contains(@class, "edit")]';

  return element.all(by.xpath(xpathEditButton)).last();

};

/****************************************************************************************/
/* Function: getRemoveIconForColumn                                                     */
/* Description: This function is used to get a "Remove" icon reference of given "Column"*/
/*              either from "Available" or "Selected" section.                          */
/* Params: 1. sectionName -> Name of the section from which reference is needed.        */
/*            Ex: "Available" or "Selected".                                            */
/*         2. colName -> Name of the column whose "Remove" icon reference is required.  */
/*                           Ex: Port. Ending Quantity Held                             */
/*         3. parentElementPath (Optional) -> Parent element in which required column   */
/*                                            is present.                               */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/* Return: Returns the reference of required column's Remove icon.                      */
/****************************************************************************************/
TileOptionsColumns.prototype.getRemoveIconForColumn = function(sectionName, colName, parentElementPath) {
  // Set the optional variable
  if (parentElementPath === undefined) {
    parentElementPath = '';
  }

  // Variable(s)
  var xpathColumn;
  var arrElements = parentElementPath.split('|');
  var xpathParentElement;
  var xpathRemoveButton;

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
    // Xpath for parent element from "Selected" section
    if (arrElements.length === 1 && colName === undefined) {
      xpathColumn = this.xpathSelectedContainer +
        '//tf-listbox-group[./tf-listbox-item-handle//*[normalize-space(.)="' + arrElements[0] + '"]]' + '/tf-listbox-item-handle';
    } else {
      // XPATH for the required column from "Selected" section
      xpathColumn = this.xpathSelectedContainer + '//*[@data-qa-class="selected-item" ' +
        'and normalize-space(.)="' + colName + '"]/*[contains(@class, "selectable-handle")]';
    }

  }

  // Scroll the element into visibility
  Utilities.makeElementVisible(element.all(by.xpath(xpathColumn)).last());

  // Hover over the required column
  browser.actions().mouseMove(element.all(by.xpath(xpathColumn)).last()).perform();

  // XPATH of required column's Edit button
  xpathRemoveButton = xpathColumn + '//*[contains(@class, "remove")]';

  return element.all(by.xpath(xpathRemoveButton)).last();

};

/****************************************************************************************/
/* Function: getRenameIconForColumn                                                     */
/* Description: This function is used to get a "Rename" icon reference of given "Column"*/
/*              either from "Available" or "Selected" section.                          */
/* Params: 1. sectionName -> Name of the section from which reference is needed.        */
/*            Ex: "Available" or "Selected".                                            */
/*         2. colName -> Name of the column whose "Rename" icon reference is required.  */
/*                           Ex: Port. Ending Quantity Held                             */
/*         3. parentElementPath (Optional) -> Parent element in which required column   */
/*                                            is present.                               */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/* Return: Returns the reference of required column's Rename icon.                      */
/****************************************************************************************/
TileOptionsColumns.prototype.getRenameIconForColumn = function(sectionName, colName, parentElementPath) {
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
  xpathRenameButton = xpathColumn + '//*[contains(@class, "rename")]';

  return element.all(by.xpath(xpathRenameButton)).last();

};

/****************************************************************************************/
/* Function: getDeleteConfirmationDialog                                                */
/* Description: This function is used to get reference of Delete confirmation dialog.   */
/* Params: 1. dialogContent (Optional) -> The text displayed in dialog box.If this is   */
/*                                        skipped it'll get dialog based on title.      */
/*         2. dialogTitle (Optional) -> Title of the dialog. If this is skipped it'll   */
/*                                      get dialog reference based on its content.      */
/* Return: Returns the reference of dialog box.                                         */
/****************************************************************************************/
TileOptionsColumns.prototype.getDeleteConfirmationDialog = function(dialogContent, dialogTitle) {
  // Variable(s)
  var xpathDialog;
  if (dialogTitle !== undefined) {
    if (dialogContent === undefined) {
      xpathDialog = '//*[@data-qa-class="confirmation-dialog"]//*[normalize-space(text())="' + dialogTitle + '"]' +
        '//ancestor::tf-dialog-header/following-sibling::*//*[@ng-transclude]//tf-tile-content';
    } else {
      xpathDialog = '//*[@data-qa-class="confirmation-dialog"]//*[normalize-space(text())="' + dialogTitle + '"]' +
        '/following-sibling::*//*[normalize-space(text())="' + dialogContent + '"]';
    }
  } else {
    xpathDialog = '//*[@data-qa-class="confirmation-dialog"]//*[normalize-space(text())="' + dialogContent + '"]';
  }

  return element(by.xpath(xpathDialog));
};

/****************************************************************************************/
/* Function: getButtonFromDeleteConfirmationDialog                                      */
/* Description: This function is used to get reference of either OK or Cancel button    */
/*              from Delete Confirmation dialog box.                                    */
/* Params: 1. dialogContent(Optional) -> The text displayed in dialog box.              */
/*         2. btnName -> Name of the button whose reference is needed.                  */
/* Return: Returns the reference of required button from the dialog box.                */
/****************************************************************************************/
TileOptionsColumns.prototype.getButtonFromDeleteConfirmationDialog = function(dialogContent, btnName) {
  var xpathButton;

  if (dialogContent !== undefined) {
    xpathButton = '//*[@data-qa-class="confirmation-dialog" and descendant::*//*[normalize-space(text())="' + dialogContent + '"]]' +
      '//tf-button[normalize-space(.)="' + btnName + '"] | //tf-dialog//*[normalize-space(text())="' + dialogContent + '"]' +
      '/ancestor::*/following-sibling::*//tf-button//*[normalize-space(text())="' + btnName + '"]';
  } else {
    xpathButton = '//*[@data-qa-class="confirmation-dialog"]//tf-button[normalize-space(.)="' + btnName + '"]';
  }

  return element(by.xpath(xpathButton));
};

/*******************************************************************************************************/
/* Function: getCheckBox                                                                               */
/* Description: This function is used get the reference of specified check box.                        */
/*                                                                                                     */
/* Params: 1. checkboxName -> Specifies the name of checkbox whose reference is needed                 */
/*          Example: 'Interquartile Method', 'Inverse Interquartile'                                   */
/*         2. checkOff -> If  this is TRUE to perform the click operation                              */
/*                                                                                                     */
/* Return: Returns the reference of specified checkbox.                                                */
/*******************************************************************************************************/
TileOptionsColumns.prototype.getCheckBox = function(checkboxName, checkOff) {

  var xpathCheckBox = '//*[normalize-space(.)="' + checkboxName + '"][contains(@data-qa-id, "checkbox")]/tf-checkbox-control';
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

/****************************************************************************************/
/*                                  Options Pane                                        */
/****************************************************************************************/

/****************************************************************************************/
/* Function: getExpandableSectionNames                                                  */
/* Description: This function is used to get reference of all "Expandable" section names*/
/* Params: NA                                                                           */
/* Return: Promise which resolves to reference of all expandable section names.         */
/****************************************************************************************/
TileOptionsColumns.prototype.getExpandableSectionNames = function() {
  return element.all(by.xpath(this.xpathOptionsContainer + '//*[@data-qa-id ' +
    'and (@section-title and not(contains(@class, "ng-hide")))]'));
};

/****************************************************************************************/
/* Function: getExpandableElement                                                       */
/* Description: This function is used to get reference of "Expandable" section from     */
/*              "Options" pane.                                                         */
/* Params: expandableSectionName -> Name of the section whose reference is required.    */
/* Return: Promise which resolves to reference of expandable section.                   */
/****************************************************************************************/
TileOptionsColumns.prototype.getExpandableElement = function(expandableSectionName) {
  var xpathExpandableSection = this.xpathOptionsContainer + '//*[contains(@data-qa-id,' +
    '"column-' + expandableSectionName.toLowerCase().replace(/\s/g, '-') + '")]/*[contains(@open, "isOpen" )]';

  return element(by.xpath(xpathExpandableSection));
};

/****************************************************************************************/
/* Function: expandSectionInOptionsPane                                                 */
/* Description: This function is used expand the given section in 'Options' pane.       */
/* Params: sectionName -> Name of the section to be expanded.                           */
/* Return: Promise which resolves to boolean value                                      */
/****************************************************************************************/
TileOptionsColumns.prototype.expandSectionInOptionsPane = function(sectionName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var _this = this;

  // Check if  section is already expanded, if  not, expand the section
  this.getExpandableElement(sectionName).getAttribute('class').then(function(attrValue) {
    if (attrValue.indexOf('collapsed') > -1) {
      _this.getExpandableElement(sectionName).click();

      // Wait for section to expand
      browser.sleep(2000);

      // Check if  section is expanded
      _this.getExpandableElement(sectionName).getAttribute('class').then(function(attrValue) {
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

/****************************************************************************************/
/* Function: getFormatSubSectionNames                                                   */
/* Description: This function is used to check the sub-sections of 'FORMAT' section.    */
/* Params: NA                                                                           */
/* Return: Array of references of sub-section names                                     */
/****************************************************************************************/
TileOptionsColumns.prototype.getFormatSubSectionNames = function() {
  var xpathSubSectionNames = this.xpathOptionsContainer + '//*[@data-qa-id="column-format-section"]//label';
  return element.all(by.xpath(xpathSubSectionNames));
};

/****************************************************************************************/
/* Function: getFormatHeader                                                            */
/* Description: This function is used to get reference of the 'Header' sub-sections of  */
/*              'FORMAT' section.                                                       */
/* Params: NA                                                                           */
/* Return:  Return reference of format header                                           */
/****************************************************************************************/
TileOptionsColumns.prototype.getFormatHeader = function() {
  var xpathFormatHeader = this.xpathOptionsContainer + this.xpathFormatHeaderTextArea;
  return element(by.xpath(xpathFormatHeader));
};

/****************************************************************************************/
/* Function: getOutliersSubSectionNames                                                 */
/* Description: This function is used to check the sub-sections of 'OUTLIERS' section.  */
/*                                                                                      */
/* Return: Array of references of sub-section names                                     */
/****************************************************************************************/
TileOptionsColumns.prototype.getOutliersSubSectionNames = function() {
  var xpathSubSectionNames = this.xpathOptionsContainer + '//*[contains(@data-qa-class, "label-max") ' +
    'or contains(@data-qa-id, "label-apply")]';
  return element.all(by.xpath(xpathSubSectionNames));
};

/*****************************************************************************************************/
/* Function: getOutliersSubSectionHeader                                                             */
/* Description: This function is used to get the reference of sub-section header from "Outliers"     */
/*              section.                                                                             */
/* Params: 1. subSectionName -> Name of the sub-section whose reference is required.                 */
/*            Example: Maximum, Minimum, Apply Outlier Settings.                                     */
/* Return: Reference of given sub-section's header.                                                  */
/*****************************************************************************************************/
TileOptionsColumns.prototype.getOutliersSubSectionHeader = function(subSectionName) {
  var xpathSubSection = this.xpathOptionsContainer + '//*[(contains(@data-qa-class, "label-max") ' +
    'or contains(@data-qa-id, "label-apply")) and normalize-space(.)="' + subSectionName + '"]';

  return element(by.xpath(xpathSubSection));
};

/****************************************************************************************/
/* Function: getRiskSubSectionNames                                                     */
/* Description: This function is used to check the sub-sections of 'RISK' section.      */
/* Params: NA                                                                           */
/* Return: Array of references of sub-section names                                     */
/****************************************************************************************/
TileOptionsColumns.prototype.getRiskSubSectionNames = function() {
  var xpathSubSectionNames = this.xpathOptionsContainer + '//*[@data-qa-id="column-risk-section"]' +
    '//*[@data-qa-id and not(contains(@class, "ng-hide"))]//label';
  return element.all(by.xpath(xpathSubSectionNames));
};

/****************************************************************************************/
/* Function: getJustificationDropDown                                                   */
/* Description: This function is used to get reference of "Justification" drop down.    */
/* Params: NA                                                                           */
/* Return: Promise which resolves to reference of "Justification" drop down.            */
/****************************************************************************************/
TileOptionsColumns.prototype.getJustificationDropDown = function() {
  var xpathDropDown = '//*[@data-qa-id="dropdown-col-fmt-justification"]//tf-button';

  return element(by.xpath(xpathDropDown));
};

/****************************************************************************************/
/* Function: checkJustificationList                                                     */
/* Description: This function is used to check the list of options under Justification  */
/*              drop down against the elements of "arrJustificationOptions".            */
/* Params: NA                                                                           */
/* Return: NA                                                                           */
/****************************************************************************************/
TileOptionsColumns.prototype.checkJustificationList = function() {
  var arrJustificationOptions = this.arrJustificationOptions;

  // Click on the 'Justification' drop down
  this.getJustificationDropDown().click();

  // Verify the list of options in the drop down
  var i = 0;
  var xpathOptions = '//*[@data-qa-id="dropdown-col-fmt-justification"]//*[@data-qa-class="dropdown-option"]';
  element.all(by.xpath(xpathOptions)).each(function(element) {
    expect(element.getText()).toEqual(arrJustificationOptions[i]);
    i++;
  });

  // Click on the 'Justification' drop down again to collapse the list
  this.getJustificationDropDown().click();
};

/****************************************************************************************/
/* Function: setJustification                                                           */
/* Description: This function is used to select the option from the 'Justification' drop*/
/*              down.                                                                   */
/* Params: justificationValue -> Value to be selected from the drop down.               */
/* Return: NA                                                                           */
/****************************************************************************************/
TileOptionsColumns.prototype.setJustification = function(justificationValue) {
  // Click on the 'Justification' drop down
  this.getJustificationDropDown().click();

  // Select the required option from the list
  var xpathOption = '//tf-dropdown-select-base-list' +
    '//*[@data-qa-class="dropdown-option"][normalize-space(.)="' + justificationValue + '"]';

  element(by.xpath(xpathOption)).click();
};

/*****************************************************************************************/
/* Function: setShowColumnCheckBox                                                       */
/* Description: This function is used to select or de-select 'Show Column' checkbox.     */
/* Params: checkOff -> if  this is TRUE checkbox will be selected, FALSE for de-selecting*/
/* Return: Promise which resolves to boolean value                                       */
/*****************************************************************************************/
TileOptionsColumns.prototype.setShowColumnCheckBox = function(checkOff) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var _this = this;

  if (checkOff) {
    // Check if  "Show Column" is already selected
    this.getCheckBox('Show Column').getAttribute('class').then(function(attValue) {
      if (attValue === null || attValue === '') {   // Select the checkbox if  not selected
        _this.getCheckBox('Show Column').click();

        // Verify if  "Show Column" is selected
        _this.getCheckBox('Show Column').getAttribute('class').then(function(attrValue) {
          if (attrValue === null || attrValue === '') {
            defer.reject(false);
          } else {
            defer.fulfill(true);
          }
        });
      } else {
        defer.fulfill(true);
      }
    });
  } else {
    // Check if  "Show Column" is already de-selected
    this.getCheckBox('Show Column').getAttribute('class').then(function(attValue) {
      if (attValue !== null || attValue !== '') {   // De-Select the checkbox if  selected
        _this.getCheckBox('Show Column').click();

        // Verify if  "Show Column" is de-selected
        _this.getCheckBox('Show Column').getAttribute('class').then(function(attrValue) {
          if (attrValue === '' || attrValue === null) {
            defer.fulfill(true);
          } else {
            defer.reject(false);
          }
        });
      } else {
        defer.fulfill(true);
      }
    });
  }

  return promise;

};

/****************************************************************************************/
/* Function: setOrGetValueInSpinBox                                                     */
/* Description: This function is used to set the value of given spin box.               */
/* Params: 1. spinBoxName -> Name of the spin box.                                      */
/*            Ex: "Width", "Decimals" etc.                                              */
/*         2. valueToBeSet -> Value to set. If no value is passed it'll be set to       */
/*          "undefined" and returns the reference of given spin box's input field.      */
/*         3. typeIntoTheBox -> Boolean Value, if TRUE, it'll directly type into the    */
/*            input field. Default value is TRUE.                                       */
/*         4. changeValueUsingArrowButtons -> if TRUE then arrows are used to set the   */
/*            value. Default value is FALSE.                                            */
/* Return: Reference of spin box's input field.                                         */
/****************************************************************************************/
TileOptionsColumns.prototype.setOrGetValueInSpinBox = function(spinBoxName, valueToBeSet,
                                                                typeIntoTheBox, changeValueUsingArrowButtons) {
  // Variable( s )
  var i;
  var xpathSpinBox;

  // Set the default values for the parameters
  valueToBeSet = valueToBeSet || undefined;
  if (typeIntoTheBox === undefined) {
    typeIntoTheBox = true;
  } else {
    typeIntoTheBox = typeIntoTheBox;
  }

  changeValueUsingArrowButtons = changeValueUsingArrowButtons || false;

  // Get the references of input field and buttons
  if (spinBoxName.toLowerCase() === 'history') {
    xpathSpinBox = '//*[@data-qa-id="input-box-column-risk-opts-mpt-time"]';
  } else if (spinBoxName.toLowerCase() === 'maximum' || spinBoxName.toLowerCase() === 'minimum') {
    xpathSpinBox = '//*[@id="pa-column-outlier-' + spinBoxName.toLowerCase().substr(0, 3) + '"]' +
      '//*[@data-qa-id="column-outlier-limit-value-input-box"]';
  } else if (spinBoxName.toLowerCase() === 'days') {
    xpathSpinBox = '//*[@data-qa-id="column-risk-opts-mpt-calc-days-input-box"]';
  } else if (spinBoxName.toLowerCase() === 'var days') {
    xpathSpinBox = '//*[@data-qa-id="input-box-column-risk-opts-var-days"]';
  } else {
    xpathSpinBox = '//*[@data-qa-id="col-fmt-' + spinBoxName.toLowerCase() + '-input-box"]';
  }

  var inputField = element(by.xpath(xpathSpinBox + '//input'));
  var upArrowButton = element(by.xpath(xpathSpinBox + '//*[contains( @class, "spin-up" )]'));
  var downArrowButton = element(by.xpath(xpathSpinBox + '//*[contains( @class, "spin-down" )]'));

  // Return the reference of input field if  "valueToBeSet" is "undefined"
  if (valueToBeSet === undefined) {
    return inputField;
  }

  // Enter the value directly into the input field if  typeIntoTheBox is true
  if (typeIntoTheBox) {
    inputField.click();
    inputField.sendKeys(protractor.Key.HOME, protractor.Key.SHIFT, protractor.Key.END, protractor.Key.NULL, valueToBeSet);
  } else if (changeValueUsingArrowButtons) {    // Set the value using the arrow buttons
    // Get the initial value present in the input field
    inputField.getAttribute('value').then(function(initialValue) {
      if (initialValue > valueToBeSet) {
        // if  initial value is greater than the value to be set then we have to decrease it using down arrow button
        for (i = 1; i <= Math.abs(initialValue - valueToBeSet); i++) {
          downArrowButton.click();
          downArrowButton = element(by.xpath(xpathSpinBox + '//*[contains( @class, "spin-down" )]'));
        }
      } else if (initialValue < valueToBeSet) {
        var noOfClicks;
        if (initialValue < 0) {
          noOfClicks = valueToBeSet + 1;
        } else {
          noOfClicks = Math.abs(valueToBeSet - initialValue);
        }

        // if  initial value is less than the value to be set then we have to increase it using up arrow button
        for (i = 1; i <= noOfClicks; i++) {
          upArrowButton.click();
          upArrowButton = element(by.xpath(xpathSpinBox + '//*[contains( @class, "spin-up" )]'));
        }
      }
    });
  }

  return inputField;
};

/****************************************************************************************/
/* Function: getLimitOrReplaceDropDown                                                  */
/* Description: This function is used to get the reference of 'Limit' or 'Replace With' */
/*              drop down of specified section of 'MAXIMUM' or 'MINIMUM' Value.         */
/*                                                                                      */
/* Params : 1. sectionName --> Name of the section whose drop down reference is required*/
/*          For example: 'MAXIMUM' or 'MINIMUM'                                         */
/*                                                                                      */
/*          2. dropDownName -->Name of the drop down whose drop down reference is needed*/
/*          For example: 'Limit' or 'Replace With'                                      */
/*          3. isOpened (optional) -> Boolean value, TRUE to verify if dropdown is      */
/*                                    opened.                                           */
/*                                                                                      */
/* Returns: Reference of limit drop down of specified section in 'OUTLIERS'.            */
/****************************************************************************************/
TileOptionsColumns.prototype.getLimitOrReplaceDropDown = function(sectionName, dropDownName, isOpened) {
  var xpathDropDown;
  var replaceSection;
  var replaceDropDownValue;
  if (sectionName.toLowerCase() === 'maximum') {
    replaceSection = 'max';
  } else if (sectionName.toLowerCase() === 'minimum') {
    replaceSection = 'min';
  }

  if (dropDownName.toLowerCase() === 'limit') {
    replaceDropDownValue = 'limit';
  } else if (dropDownName.toLowerCase() === 'replace with') {
    replaceDropDownValue = 'replace-with';
  }

  xpathDropDown = '//*[@id="pa-column-outlier-' + replaceSection + '"]' +
    '//*[@data-qa-id="dropdown-col-options-outliers-' + replaceDropDownValue + '"]//span[@tf-button]';

  if (isOpened === true) {
    xpathDropDown = '//tf-dropdown-select-base-list';
  }

  return element(by.xpath(xpathDropDown));
};

/*******************************************************************************************************/
/* Function: getColumnWeightDropDownFromStatistics                                                     */
/* Description: This function is used get the reference of 'Column Weights' drop down.                 */
/* Return: Reference of "Column Weights" drop down.                                                    */
/*******************************************************************************************************/
TileOptionsColumns.prototype.getColumnWeightDropDownFromStatistics = function() {
  return element(by.xpath(this.xpathColWeightDropDown));
};

/*******************************************************************************************************/
/* Function: setColumnWeightDropDownFromStatistics                                                     */
/* Description: This function is used select option from 'Column Weights' drop down.                   */
/* Params: 1. optionName -> Option to be selected from the 'Column Weights' drop down.                 */
/* Return: Promise which resolves to boolean value.                                                    */
/*******************************************************************************************************/
TileOptionsColumns.prototype.setColumnWeightDropDownFromStatistics = function(optionName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;

  // Click on the "Column weights" drop down
  this.getColumnWeightDropDownFromStatistics().click();

  var xpathOption = '//tf-dropdown-select-base-list//*[@data-qa-class="dropdown-option"]' +
    '[normalize-space(.)="' + optionName + '"]';
  var option = element(by.xpath(xpathOption));

  // Select the option
  option.click();

  // Verifying that passed in option is selected
  var xpathSelectedOption = this.xpathColWeightDropDown + '[descendant::*[normalize-space(.)="' + optionName + '"]]';
  element(by.xpath(xpathSelectedOption)).isPresent().then(function(isPresent) {
    if (!isPresent) {
      defer.reject(false);
    } else {
      defer.fulfill(true);
    }
  });

  return promise;
};

/*******************************************************************************************************/
/* Function: getSelectedWeightFromStatistics                                                           */
/* Description: This function is used get the reference selected weight under 'Column Weights' section.*/
/* Return: Reference of selected weight under "Column Weights" section.                                */
/* NOTE: Use getText() method to get the value of selected weight.                                     */
/*******************************************************************************************************/
TileOptionsColumns.prototype.getSelectedWeightFromStatistics = function() {
  // Xpath of selected weight
  var xpathSelectedWeight = this.xpathOptionsContainer + '//*[@data-qa-id="column-weights-col"]';
  return element(by.xpath(xpathSelectedWeight));
};

/*******************************************************************************************************/
/* Function: getSearchFieldFromStatistics                                                              */
/* Description: This function is used get the reference search field from 'Column Weights' section.    */
/* Return: Reference of Search field from "Column Weights" section.                                    */
/* NOTE: Use sendKeys() method to type into the search field.                                          */
/*******************************************************************************************************/
TileOptionsColumns.prototype.getSearchFieldFromStatistics = function() {
  // Xpath of Search field
  var xpathSearchField = this.xpathOptionsContainer + '//*[@data-qa-id="column-avail-tree-search"]//input';

  return element(by.xpath(xpathSearchField));
};

/****************************************************************************************/
/* Function: getElementFromColumnWeightsTree                                            */
/* Description: This function is used to get a particular element reference from the    */
/*              "Column Weights" header of 'Statistics' section.                        */
/* Params: 1. parentElementPath -> Parent element in which required element is present. */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/*         2. elementName -> Name of the element you want to get the reference of.      */
/*                           Ex: Port. Ending Quantity Held                             */
/* Return: Returns the reference of required element.                                   */
/****************************************************************************************/
TileOptionsColumns.prototype.getElementFromColumnWeightsTree = function(parentElementPath, elementName) {
  var arrElements = parentElementPath.split('|');
  var xpathElement;
  var xpathParentElement = this.xpathOptionsContainer + '//*[@data-qa-id="columns-add-remove-available-tree" ' +
    'and not(contains(@class, "ng-hide"))]';

  if (arrElements.length === 1) {
    xpathParentElement += '//*[@ng-repeat]//*[normalize-space(text())="' + arrElements[0] + '" ]' +
      '/ancestor::*[@ng-repeat][1]';
  } else {
    for (var i = 0; i < arrElements.length; i++) {
      xpathParentElement += '//*[@ng-repeat]//*[normalize-space(text())="' + arrElements[i] + '" ]' +
        '/ancestor::*[@ng-repeat][1]';
    }
  }

  xpathElement = xpathParentElement + '//*[@ng-repeat]//*[normalize-space(text())="' + elementName + '"]' +
    '/ancestor::*[@ng-repeat][1]';

  // Make the tree visible on screen before returning the reference
  Utilities.makeElementVisible(element(by.xpath(xpathElement)));

  return element(by.xpath(xpathElement));
};

/*****************************************************************************************/
/* Function: getSelectedStatistics                                                       */
/* Description:This function is used to get all selected statistics in Statistics section*/
/* Return: Returns the reference of required element.                                    */
/*****************************************************************************************/
TileOptionsColumns.prototype.getSelectedStatistics = function() {
  var xpathSelectedOptions = '//*[@data-qa-id="column-stats-selected"]//*[@ng-model="ctrl.currentItem"]' +
    '/preceding-sibling::*//*[@ng-repeat]';
  return element.all(by.xpath(xpathSelectedOptions));
};

/****************************************************************************************/
/* Function: getSelectedStatistic                                                       */
/* Description: This function is used to get the reference of specific statistic which  */
/*              is already selected from "Add a statistic..." drop down.                */
/* Params: statisticName -> Name of the statistic whose reference is needed.            */
/*         Ex: Median                                                                   */
/* Return: Return reference of specified statistic.                                     */
/****************************************************************************************/
TileOptionsColumns.prototype.getSelectedStatistic = function(statisticName) {
  var xpathRequiredStatistic = '//*[@data-qa-id="column-stats-selected"]//*[@ng-model="ctrl.currentItem"]' +
    '/preceding-sibling::*//*[@ng-repeat and normalize-space(.)="' + statisticName + '"]';

  return element(by.xpath(xpathRequiredStatistic));
};

/************************************************************************************************/
/* Function: getSelectedAdditionalOptions                                                       */
/* Description: This function is used to get selected option from Additional Options section.   */
/* Params: additionalOptionName -> Name of the collection option whose reference                */
/*                                 is needed.                                                   */
/*         Ex: 'Display Total Column'                                                           */
/* Return: Returns the reference of required element.                                           */
/************************************************************************************************/
TileOptionsColumns.prototype.getSelectedAdditionalOptions = function(additionalOptionName) {
  var xpathSelectedOptions = this.xpathOptionsContainer + '//*[@ng-model="ctrl.currentItem"]/preceding-sibling::*' +
    '//*[@ng-repeat and normalize-space(.)="' + additionalOptionName + '"]';
  return element(by.xpath(xpathSelectedOptions));
};

/****************************************************************************************/
/* Function: getStatisticsDropDown                                                      */
/* Description: This function is used to get the reference of "Add a Statistic..." drop */
/*              down button from "Statistics" section.                                  */
/* Return: Promise which resolves reference of "Add a Statistic..." drop down button.   */
/****************************************************************************************/
TileOptionsColumns.prototype.getStatisticsDropDown = function() {
  var xpathAddStatistic = '//*[@data-qa-id="column-stats-selected"]//*[@ng-model="ctrl.currentItem"]';
  return element(by.xpath(xpathAddStatistic));
};

/****************************************************************************************/
/* Function: getAdditionalOptionsDropDown                                               */
/* Description: This function is used to get the reference of "Select an option..." drop*/
/*              down button from "Additional Options" section.                          */
/* Return: Promise which resolves reference of "Select an option..." drop down button.  */
/****************************************************************************************/
TileOptionsColumns.prototype.getAdditionalOptionsDropDown = function() {
  // Variable(s)
  var xpathDropDown;

  xpathDropDown = '//*[contains(@data-qa-id, "column-additional-options")]//*[@ng-model="ctrl.currentItem"]//tf-button';

  return element(by.xpath(xpathDropDown));
};

/*******************************************************************************************************/
/* Function: getDropDownFromAdditionalOptions                                                          */
/* Description: This function is used to get reference of required drop down from Additional Options.  */
/*                                                                                                     */
/* Params: 1) ddName -> Name of the drop down whose reference is needed.                               */
/*                  Example : 'Return Methodology', 'Transfers'                                        */
/*         2) isOpened -> Boolean value, TRUE to verify if dropdown is opened.                         */
/*                                                                                                     */
/* Return: Returns reference of required drop down.                                                    */
/*******************************************************************************************************/
TileOptionsColumns.prototype.getDropDownFromAdditionalOptions = function(ddName, isOpened) {
  // Variable(s)
  var xpathDropDown;
  if (ddName === undefined) {
    xpathDropDown = '//*[@ng-model="ctrl.currentItem"]//tf-button';
  } else if (ddName.toLowerCase() === 'return methodology') {
    xpathDropDown = '//*[@data-qa-id="dropdown-col-return-meth-rm"]//tf-button';
  } else if (ddName.toLowerCase() === 'transfers') {
    xpathDropDown = '//*[@data-qa-id="dropdown-col-return-meth-tm"]//tf-button';
  } else {
    xpathDropDown = '//*[@data-qa-id="dropdown-' + ddName.toLowerCase().replace(/\s/g, '-') + '"]//tf-button';
  }

  if (isOpened === true) {
    xpathDropDown = '//tf-dropdown-select-base-list[contains(@class,"ng-valid")]';
  }

  return element(by.xpath(xpathDropDown));
};

/*******************************************************************************************************/
/* Function: getDropDownFromDefinitionSection                                                          */
/* Description: This function is used to get reference of drop down under 'Definition' section.        */
/* Return: Returns the reference of required drop down.                                                */
/*******************************************************************************************************/
TileOptionsColumns.prototype.getDropDownFromDefinitionSection = function() {
  var xpathDropDown = '//*[@data-qa-id="column-definition-section"]//*[@data-qa-class="dropdown-button"]//span[@tf-button]';
  return element(by.xpath(xpathDropDown));
};

/*******************************************************************************************************/
/* Function: getDropDownOptionFromDefinitionSection                                                    */
/* Description: This function is used to get reference of an element from drop down under 'Definition' */
/*              section.                                                                               */
/* Params: optionName -> the element to which the reference is needed.                                 */
/* Return: Returns the reference of required element from the drop down.                               */
/*******************************************************************************************************/
TileOptionsColumns.prototype.getDropDownOptionFromDefinitionSection = function(optionName) {
  var xpathDropDownOption = '//*[@data-qa-class="dropdown-option" and normalize-space(.)="' + optionName + '"]';
  return element(by.xpath(xpathDropDownOption));
};

/**********************************************************************************************************/
/* Function: getEditOrRemoveFormulaButton                                                                 */
/* Description: This function is used to get reference of "Edit" or "Remove" buttons of 'Formula' section.*/
/* Params: buttonName -> edit or remove(x)                                                                */
/* Return: Returns the reference of required button.                                                      */
/**********************************************************************************************************/
TileOptionsColumns.prototype.getEditOrRemoveFormulaButton = function(buttonName) {
  var xpathButton = '//*[@data-qa-class="' + buttonName.toLowerCase().replace(/\s/g, '-') + '-icon"]';
  return element(by.xpath(xpathButton));
};

/************************************************************************************************************/
/* Function: getFormulaSection                                                                              */
/* Description: This function is used to get reference of "Formula" section from "Definition" section.      */
/* Return: Returns the reference of Formula Section.                                                        */
/************************************************************************************************************/
TileOptionsColumns.prototype.getFormulaSection = function() {
  var xpathFormula = '//*[@data-qa-class="formula-section"]';
  return element(by.xpath(xpathFormula));
};

/**
 * @function getFormulaSectionTextArea
 * @description This function is used to get reference of "Formula" text area from "Definition" section.
 * @return Returns the reference of Formula Section text area.
 */
TileOptionsColumns.prototype.getFormulaSectionTextArea = function() {
  var xpathFormula = '//*[@data-qa-id="formula-textarea"]';
  return element(by.xpath(xpathFormula));
};

/**
 * @function getFormulaInfo
 * @description This function is used get reference of all elements under "Formula" section.
 * @param valueName {String} Name of the label for which you need to retrieve its value
 * @return Returned reference is pointing to value of label in LHS.
 */
TileOptionsColumns.prototype.getFormulaInfo = function(valueName) {
  var xpathFormula = '//*[@data-qa-id="' + valueName.toLowerCase().replace(/\s/g, '-') + '-value"]';
  return element(by.xpath(xpathFormula));
};

/*******************************************************************************************************/
/* Function: getRemoveIconForColumnsInOptionsStatisticsSection                                         */
/* Description: This function is used to get reference of remove icon from statistics section.         */
/* Return: Returns the reference remove icon                                                           */
/*******************************************************************************************************/
TileOptionsColumns.prototype.getRemoveIconForColumnsInOptionsStatisticsSection = function() {
  // Variable(s)
  var xpathRemoveButton;
  var xpathWeight;
  xpathWeight = '//*[@data-qa-id="column-stats-selected"]//div[normalize-space(.)="Weight"]';

  // Get the required grouping into visibility
  Utilities.scrollElementToVisibility(element(by.xpath(xpathWeight)));

  // Hover over the required grouping
  browser.actions().mouseMove(element(by.xpath(xpathWeight))).perform();

  // XPATH of required grouping's Remove button
  xpathRemoveButton = xpathWeight + '//*[contains(@class, "remove")]';

  return element(by.xpath(xpathRemoveButton));
};

/****************************************************************************************/
/* Function: getCalculationOptionsDeleteIcon                                            */
/* Description: This function is used to get the reference of specific Additional Option*/
/*              "X" Icon                                                                */
/*                                                                                      */
/* Params: additionalOptionName -> Name of the statistic whose "X" reference is needed. */
/*                                  Ex: 'Display Total Column'                          */
/*                                                                                      */
/* Return: Return reference of specified statistic.                                     */
/****************************************************************************************/
TileOptionsColumns.prototype.getCalculationOptionsDeleteIcon = function(additionalOptionName) {
  var xpathAdditionalOptionClose = '//*[@ng-model="ctrl.currentItem"]/preceding-sibling::*' +
    '//*[@ng-repeat and normalize-space(.)="' + additionalOptionName + '"]/*[contains(@class, "remove")]';

  return element(by.xpath(xpathAdditionalOptionClose));
};

/*******************************************************************************************************/
/* Function: getAllDropDownOptions                                                                     */
/* Description: This function is used to get reference of all elements under a drop down box.          */
/* Return: Returns reference of items listed under any drop down.                                      */
/*******************************************************************************************************/
TileOptionsColumns.prototype.getAllDropDownOptions = function() {
  // Variable(s)
  var xpathOptions = '//tf-dropdown-select-base-list//*[@ng-repeat]';

  return element.all(by.xpath(xpathOptions));
};

/************************************************************************************************/
/* Function: getNoOptionsSelectedFromAdditionalOptions                                          */
/* Description: This function is used to get to verify if no option selected from Additional    */
/*             Options section.                                                                 */
/* Return: Promise with returns boolean value, TRUE if no option selected                       */
/*          in "Additional Options"                                                             */
/************************************************************************************************/
TileOptionsColumns.prototype.getNoOptionsSelectedFromAdditionalOptions = function() {
  var xpathNoOptionsSelectedOptions = this.xpathOptionsContainer + '//*[@ng-model="ctrl.currentItem"]/preceding-sibling::*' +
    '//*[@ng-show and not(contains(@class, "ng-hide"))]';

  return element(by.xpath(xpathNoOptionsSelectedOptions));
};

/*******************************************************************************************************/
/* Function: verifyDropdownList                                                                        */
/* Description: This function is used to verify the list under any dropdown.                           */
/*                                                                                                     */
/* Params: 1. arrListItems -> An array containing the list of items.                                   */
/*         2. dropdownReference -> Object reference of dropdown button.                                */
/*                                                                                                     */
/* Return: None.                                                                                       */
/*******************************************************************************************************/
TileOptionsColumns.prototype.verifyDropdownList = function(arrListItems, dropdownReference) {
  // Counter variable
  var i = 0;

  // Clicking on the dropdown to get the list.
  dropdownReference.click();

  var eleList = this.getAllDropDownOptions();
  expect(this.getAllDropDownOptions().count()).not.toEqual(0);
  arrListItems.forEach(function(item) {
    expect(eleList.get(i).getText()).toEqual(item);
    i++;
  });

  // Clicking on the dropdown to close the dropdown list.
  dropdownReference.click();
};

/****************************************************************************************/
/* Function: getEditIconForGroupingsInAvailableSection                                  */
/* Description: This function is used to get a "Edit" icon reference of given "Columns"*/
/*              from "Available" section.                                               */
/* Params: 1. parentElementPath -> Parent element in which required grouping is present.*/
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/*         2. grpName -> Name of the grouping whose "Edit" icon reference is required.  */
/*                           Ex: Port. Ending Quantity Held                             */
/* Return: Returns the reference of required grouping's Edit icon.                      */
/****************************************************************************************/
TileOptionsColumns.prototype.getEditIconForGroupingsInAvailableSection = function(parentElementPath, grpName) {
  // Variable(s)
  var xpathEditButton;
  var arrElements = parentElementPath.split('|');
  var xpathParentElement;
  var xpathColumn;

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
    '//*[normalize-space(.)="' + grpName + '" and @tf-renamable-text]' +
    '/ancestor::*[@data-qa-class="available-tree-item"][1]';

  // Scroll the element into visibility
  Utilities.makeElementVisible(element.all(by.xpath(xpathColumn)).last());

  // Hover over the required column
  browser.actions().mouseMove(element.all(by.xpath(xpathColumn)).last()).perform();

  // XPATH of required column's Edit button
  xpathEditButton = xpathColumn + '//*[contains(@class, "edit")]';

  return element.all(by.xpath(xpathEditButton)).last();

};

/**
 * @function getIconFormList
 * @description The function is used to click on remove, edit, rename, i next to the required item in selected and available section
 * @param {string} iconName Name of the icon remove, edit, rename or i
 * @param {string} sectionName Name of the section "Available" or "Selected"
 * @param {string} elementName Name of the item on which you want to perform action
 * @example TileOptionsColumns.getIconFormList('icon', nameOfContainer, itemName);
 * @return Returns the reference of required icon of the given item.
 */

TileOptionsColumns.prototype.getIconFormList = function(iconName, sectionName, elementName) {
  // Variable(s)
  var xpathEditButton;
  var xpathColumn;

  if (sectionName.toLowerCase() === 'available') {

    // XPATH of required column
    xpathColumn = '//*[@data-qa-class="available-section"]//tf-virtual-listbox//tf-virtual-listbox-group-children' +
      '//tf-virtual-listbox-item-template//*[normalize-space(.)="' + elementName + '"]/parent::*//tf-virtual-listbox-item-handle';
  } else {
    xpathColumn = this.xpathSelectedContainer + '//*[@data-qa-class="selected-item"]' +
      '//*[normalize-space(.)="' + elementName + '"]/parent::*//tf-virtual-listbox-item-handle';
  }

  // Scroll the element into visibility
  Utilities.makeElementVisible(element.all(by.xpath(xpathColumn)).last());

  // Hover over the required column
  browser.actions().mouseMove(element.all(by.xpath(xpathColumn)).last()).perform();

  // XPATH of given column's required button
  xpathEditButton = xpathColumn + '//*[contains(@class, "' + iconName + '")]';

  return element.all(by.xpath(xpathEditButton)).last();

};
/****************************************************************************************/
/* Function: getRemoveIconForColumnsSelectedSection                                     */
/* Description: This function is used to get reference of Remove icon.                  */
/* Return: Returns the reference of required button.                                    */
/****************************************************************************************/
TileOptionsColumns.prototype.getRemoveIconForColumnsSelectedSection = function() {
  var xpathCrossIcon = '//*[@data-qa-id="column-sel-tree-clear"]';
  return element(by.xpath(xpathCrossIcon));
};

/**************************************************************************************/
/* Function: getElementsListFromSelectedSection                                       */
/* Description: This function is used to get reference of all the elements from       */
/*                     "Selected" section                                             */
/* Return: Returns the array of references for all elements in "Selected" container.  */
/**************************************************************************************/
TileOptionsColumns.prototype.getElementsListFromSelectedSection = function() {
  var xpathAllElements = '//*[@data-qa-id="columns-add-remove-selected-tree"]//*[contains(@class,"tf-selectable-handle")]';
  return element.all(by.xpath(xpathAllElements));
};

/****************************************************************************************/
/* Function: getColumnRenameFieldFromAvailableSection                                   */
/* Description: This function is used to get the reference of rename input field from   */
/*            "Available" section after selecting "Rename" icon for a column.           */
/* Return: Promise which resolves to rename input field.                                */
/****************************************************************************************/
TileOptionsColumns.prototype.getColumnRenameFieldFromAvailableSection = function() {
  var xpathRenameField = '//tf-textbox[contains(@class,"tf-renamable-input")]//input';
  return element(by.xpath(xpathRenameField));
};

/************************************************************************************************/
/* Function: getFolderIconFromAvailableSection                                                  */
/* Description: This function is used to get the reference of the "New folder" button           */
/*             Options section.                                                                 */
/* Return: Promise with returns the reference of the "Add New Category" button                  */
/*          in "Additional Options"                                                             */
/************************************************************************************************/
TileOptionsColumns.prototype.getFolderIconFromAvailableSection = function() {
  var xpathAddNewCategory = '//*[@data-qa-id="column-avail-add-category"]//span[@tf-button]';
  return element(by.xpath(xpathAddNewCategory));
};

/**
 * @function getCharacteristicsDisplayDropDown
 * @description This function is used to get the reference of Characteristics Display drop down.
 * @return {promise} Promise which resolve the reference of Characteristics Display drop down.
 */

TileOptionsColumns.prototype.getCharacteristicsDisplayDropDown = function() {
  var xpathAddNewCategory = '//*[normalize-space(.)="Characteristics Display"]//ancestor::*[contains(@class,"row")]' +
    '//span[@tf-button]';
  return element(by.xpath(xpathAddNewCategory));
};

/************************************************************************************************/
/* Function: getColorPickerButton                                                               */
/* Description: This function is used to get the reference of the "Color picker" button.        */
/* Param: sectionName -> Name of the "Color picker" whose refernce is required.                 */
/* Return: Promise which returns the reference of the ""Color picker" button.                   */
/************************************************************************************************/
TileOptionsColumns.prototype.getColorPickerButton = function(name) {
  var xpathColorPicker = '//*[normalize-space(.)="' + name + '"]//tf-button//*[contains(@class,"color")]';
  return element(by.xpath(xpathColorPicker));
};

/************************************************************************************************/
/* Function: getSectionFromColorDropdown                                                        */
/* Description: This function is used to get the reference of the "Color Section" from          */
/*             color dropdown.                                                                  */
/* Param: sectionName -> Name of the section whose refernce is required.                        */
/* Return: Promise which returns the reference of the "Color Section" from color dropdown.      */
/************************************************************************************************/
TileOptionsColumns.prototype.getSectionFromColorDropdown = function(sectionName) {
  var xpathColorSection = '//tf-dropdown//tf-combo-palette//*[normalize-space(.)="' + sectionName + '"]';
  return element(by.xpath(xpathColorSection));
};

/************************************************************************************************/
/* Function: getAllColorBoxFromDropdown                                                         */
/* Description: This function is used to get the reference of all color box reference from      */
/*             color dropdown when a particular section reference is provided.                  */
/* Param: sectionName -> Name of the section from which all color box reference is required.    */
/* Return: Promise with returns the reference of all color box from color dropdown.             */
/************************************************************************************************/
TileOptionsColumns.prototype.getAllColorBoxFromDropdown = function(sectionName) {
  var xpathColorSection;
  if (sectionName === undefined) {
    xpathColorSection = '//tf-dropdown//tf-color-palette//tf-color-swatch/*[contains(@class,"color")]';
  } else if (sectionName.toLowerCase() === 'basic colors') {
    xpathColorSection = '//tf-dropdown//tf-combo-palette//*[normalize-space(.)="Basic Colors"]//following-sibling::' + 'tf-color-palette[@ng-model="ctrl.basicColorModel"]//tf-color-swatch';
  } else if (sectionName.toLowerCase() === 'custom colors') {
    xpathColorSection = '//tf-dropdown//tf-combo-palette//*[normalize-space(.)="Custom Colors"]//following-sibling::' + 'tf-color-palette[@ng-model="ctrl.customColorModel"]//tf-color-swatch';
  }

  return element.all(by.xpath(xpathColorSection));
};

/*************************************************************************************************/
/* Function: getRemoveIconFromConditionSection                                                   */
/* Description: This function is used to get the reference of remove icon from "conditionSection"*/
/* Return: Promise with returns the reference of the "remove icon" from "conditionSection"       */
/*************************************************************************************************/
TileOptionsColumns.prototype.getRemoveIconFromConditionSection = function() {
  var xpathRemoveIcon = '//pa-cf-condition//tf-icon[contains(@class,"remove")]';
  return element.all(by.xpath(xpathRemoveIcon));
};

/*************************************************************************************************/
/* Function: getSliderSection                                                                    */
/* Description: This function is used to get the reference of the "slider section"               */
/* Param: sectionName -> Name of the slider section whose reference is required.                 */
/* Return: Promise with returns the reference of the "slider Section".                           */
/*************************************************************************************************/
TileOptionsColumns.prototype.getSliderSection = function(sliderSection) {
  var xpathSliderSection = '//*[normalize-space(.)="' + sliderSection + '"]//tf-slider//tf-slider-selection';
  return element(by.xpath(xpathSliderSection));
};

/**
 * @function selectColumnFromSelectedAndVerifySelectedWeight
 * @description This function is used to select a column from the select section and verify the selected weight from statistics beside weights drop dwon
 * @param columnName {string} name of the column to be selected from the selected section
 * @param nameOfSelectedWeight {string} Name of the selected weight from statistics section to verify
 * @param xpathOfSelectedSection {string} xpath of selected section
 * @return NA
 */
TileOptionsColumns.prototype.selectColumnFromSelectedAndVerifySelectedWeight = function(columnName, nameOfSelectedWeight, xpathOfSelectedSection) {
  var _this = this;

  ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(columnName).select();

  // Verify if required column is selected
  ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(columnName).isSelected().then(function(seleted) {
    if (seleted) {
      _this.getSelectedWeightFromStatistics().getText().then(function(selectedWeight) {
        if (selectedWeight !== nameOfSelectedWeight) {
          expect(false).customError('"' + nameOfSelectedWeight + '" is not displayed next to "Default Weight" drop down. Found "' + selectedWeight + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    } else {
      expect(false).customError('"' + columnName + '" is not selected');
      CommonFunctions.takeScreenShot();
    }
  });
};

/**
 * @function getSelectedItemsOfSelectAnOptionDropdown
 * @description This function is used to fetch all the items that are selected using select an option dropdown in Accordion Additional Options section
 * @returns Returns a promise which resolves into an array of items
 */

TileOptionsColumns.prototype.getSelectedItemsOfSelectAnOptionDropdown =  function() {
  return element.all(by.xpath('//*[@id ="pa-column-adv-opts-eng-opts"]//*[contains(@class,"entered") and not(contains(@class, "empty"))]'));
};

module.exports = new TileOptionsColumns();
