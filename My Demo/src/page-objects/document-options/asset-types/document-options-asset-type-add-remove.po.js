'use strict';

var DocumentOptionsAssetTypeAddRemove = function() {
  this.xpathAvailableContainer = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]' +
    '//*[@data-qa-class="available-tree"]';
  this.xpathSelectedContainer = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]' +
    '//*[@data-qa-class="selected-tree"]';
  this.xpathLeverageFactorField = '//*[@data-qa-id="property-name" and normalize-space(.)="Leverage Factor"]' +
    '/following-sibling::*[@data-qa-class="number-input"]//input';
  this.arrAvailableSectionElements = [
    'Generate Offset Cash for',
    'Use Government Cash',
    'Select LIBOR Tenor',
    'Use Zero Interest Cash',
    'ADR/Parent Conversion',
    'Generate Offset Cash for Shorts',
    'Canada/US Conversion',
    'Generate Margin Cash',
    'Use Underlying ID',
    'Convert 144A/Reg S to Registered',
    'Consolidate 144A/Reg S',
    'Adjust Face by Inflation Factor',
    'Multiply Shares By Contract Size',
    'Value Currency Forwards',
    'Value Total Return Swaps',
  ];
  this.xpathSelectedSectionDropdown = '//*[@data-qa-id="property-name" and normalize-space(.)="replacingText"]//tf-dropdown-select';
  this.xpathTransforBox = '//*[@data-qa-id="asset-type-transfer-section"]//tf-transferbox';

};

/****************************************************************************************/
/* Function: getRadioButtonInViewBy                                                     */
/* Description: This function is used to get reference of radio button from "View By"   */
/*              section of "Asset Types > Add/Remove" option.                           */
/* Params: buttonName -> Name of the radio button.                                      */
/* Return: Returns the reference of required radio button.                              */
/****************************************************************************************/
DocumentOptionsAssetTypeAddRemove.prototype.getRadioButtonInViewBy = function(buttonName) {
  // Variable(s)
  var xpathRadioButtonInViewBy = '//*[@data-qa-id="radio-button-' + buttonName.toLowerCase().replace(/\s/g, '-') + '"]' +
    '/tf-radio-control';

  return element(by.xpath(xpathRadioButtonInViewBy));
};

/****************************************************************************************/
/* Function: getAllElements                                                             */
/* Description: This function is used to get reference of all the elements either from  */
/*              "Available" container or from "Selected" container.                     */
/* Params: sectionName -> Name of the section from which element references are needed. */
/* Return: Returns the reference of all the elements from "Available" or "Selected"     */
/*         container.                                                                   */
/****************************************************************************************/
DocumentOptionsAssetTypeAddRemove.prototype.getAllElements = function(sectionName) {
  // Variable(s)
  var xpathElements;

  if (sectionName.toLowerCase() === 'available') {
    xpathElements = this.xpathAvailableContainer + '//*[@ng-repeat]/tf-listbox-item';
  } else if (sectionName.toLowerCase() === 'selected') {
    xpathElements = this.xpathSelectedContainer + '//*[@ng-repeat]//tf-listbox-item';
  }

  return element.all(by.xpath(xpathElements));
};

/****************************************************************************************/
/* Function: getSearchField                                                             */
/* Description: This function is used to get reference search input box from "Available"*/
/*              section of "Asset Types > Add/Remove".                                  */
/* Params: NA                                                                           */
/* Return: Returns the reference of search input box from "Available" section.          */
/****************************************************************************************/
DocumentOptionsAssetTypeAddRemove.prototype.getSearchField = function() {
  var xpathSearchField = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]' +
    '//*[@data-qa-id="asset-type-transfer-section"]//input';
  return element(by.xpath(xpathSearchField));
};

/****************************************************************************************/
/* Function: getAssetTypeListItem                                                       */
/* Description: This function is used to get reference of element which does not have   */
/*              any further elements under it.                                          */
/* Params: 1. itemName -> Name of the element whose reference is required.              */
/*         2. sectionName ->  Name of the section from which element reference is needed*/
/*            Ex: "Available" or "Selected".                                            */
/* Return: Returns the reference of element from the given section.                     */
/****************************************************************************************/
DocumentOptionsAssetTypeAddRemove.prototype.getAssetTypeListItem = function(itemName, sectionName) {
  // Variable(s)
  var xpathSelectItem;
  if (sectionName.toLowerCase() === 'available') {
    xpathSelectItem = this.xpathAvailableContainer + '//*[@ng-repeat]' +
      '//tf-listbox-item[normalize-space(.)="' + itemName + '"]';
  } else if (sectionName.toLowerCase() === 'selected') {
    xpathSelectItem = this.xpathSelectedContainer + '//*[@ng-repeat]' +
      '//tf-listbox-item[normalize-space(.)="' + itemName + '"]';
  }

  return element(by.xpath(xpathSelectItem));
};

/****************************************************************************************/
/* Function: getArrowButton                                                             */
/* Description: This function is used to get reference of arrow button from "Asset Types*/
/*              Add/Remove" options.                                                    */
/* Params: btnName -> Name of the button whose reference is required.                   */
/*         Ex: "Left" or "Right".                                                       */
/* Return: Returns the reference of arrow button.                                       */
/****************************************************************************************/
DocumentOptionsAssetTypeAddRemove.prototype.getArrowButton = function(btnName) {
  // Variable(s)
  var xpathButton = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]' +
    '//*[@data-qa-id="asset-type-transfer-section"]//*[contains(@icon, "arrow-' + btnName.toLowerCase() + '")]';

  return element(by.xpath(xpathButton));
};

/****************************************************************************************/
/* Function: getAssetTypeTreeItem                                                       */
/* Description: This function is used to get reference of element from either Available */
/*              or Selected container which is further having elements under it.        */
/* Params: 1. itemName -> Name of the element whose reference is required.              */
/*         2. sectionName -> Name of the section from which element reference is        */
/*                          required.                                                   */
/* Return: Promise which resolve to the reference of required element.                  */
/****************************************************************************************/
DocumentOptionsAssetTypeAddRemove.prototype.getAssetTypeTreeItem = function(itemName, sectionName) {
  // Variable(s)
  var xpathSelectItem;

  if (sectionName.toLowerCase() === 'available') {
    xpathSelectItem = this.xpathAvailableContainer + '//*[@ng-repeat]/tf-listbox-item[descendant::*' +
      '//*[normalize-space(.)="' + itemName + '"]]/*[contains(@class, "selectable-handle")]';
  } else if (sectionName.toLowerCase() === 'selected') {
    xpathSelectItem = this.xpathSelectedContainer + '//*[@ng-repeat]' +
      '/tf-listbox-item[descendant::*//*[normalize-space(.)="' + itemName + '"]]';
  }

  return element.all(by.xpath(xpathSelectItem)).last();
};

/****************************************************************************************/
/* Function: expandElementTree                                                          */
/* Description: This function is used to expand the tree elements from "Available"      */
/*              section.                                                                */
/* Params: elementPath -> Path of element tree which has to be expanded.                */
/* Return: NA                                                                           */
/****************************************************************************************/
DocumentOptionsAssetTypeAddRemove.prototype.expandElementTree = function(elementPath) {
  // Variable(s)
  var arrElements;
  var xpathExpandButton;

  arrElements = elementPath.split('|');
  xpathExpandButton = this.xpathAvailableContainer + '//*[@ng-repeat]';
  for (var i = 0; i < arrElements.length; i++) {
    xpathExpandButton += '/tf-listbox-item[descendant::*//*[normalize-space(.)="' + arrElements[i] + '"]]' +
      '/*[contains(@class, "selectable-handle")]//*[contains(@class, "icon-tree")]';

    // Click the expand button for each element
    element(by.xpath(xpathExpandButton)).click();

    if (i !== arrElements.length - 1) {
      xpathExpandButton += '/ancestor::*[contains(@class, "selectable-handle")]/following-sibling::*/';
    }
  }
};

/****************************************************************************************/
/* Function: checkIfExpanded                                                            */
/* Description: This function is used to check if the tree elements from "Available"    */
/*              section are expanded.                                                   */
/* Params: elementPath -> Path of element tree which has to be verified.                */
/* Return: NA                                                                           */
/****************************************************************************************/
DocumentOptionsAssetTypeAddRemove.prototype.checkIfExpanded = function(elementPath) {
  // Variable(s)
  var arrElements;
  var xpathParentElement;

  arrElements = elementPath.split('|');
  xpathParentElement = this.xpathAvailableContainer + '//*[@ng-repeat]';

  for (var i = 0; i < arrElements.length; i++) {
    xpathParentElement += '/tf-listbox-item[descendant::*//*[normalize-space(.)="' + arrElements[i] + '"]]' +
      '/*[contains(@class, "selectable-handle")]//*[contains(@class, "icon-tree")]';

    // Click the expand button for each element
    expect(element(by.xpath(xpathParentElement)).getAttribute('class')).toContain('open');

    if (i !== arrElements.length - 1) {
      xpathParentElement += '/ancestor::*[contains(@class, "selectable-handle")]/following-sibling::*/';
    }
  }

  return element(by.xpath(xpathParentElement));
};

/****************************************************************************************/
/* Function: getElementInsideTree                                                       */
/* Description: This function is used to get a particular element reference from the    */
/*              "Available" section container.                                          */
/* Params: 1. parentElementPath -> Parent element in which required element is present. */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/*         2. elementName -> Name of the element you want to get the reference of.      */
/*                           Ex: Port. Ending Quantity Held                             */
/*         3. sectionName -> Name of the section from which reference is needed.        */
/*         Ex: Available or Selected.                                                   */
/* Return: Returns the reference of required element.                                   */
/****************************************************************************************/
DocumentOptionsAssetTypeAddRemove.prototype.getElementInsideTree = function(parentElementPath, elementName, sectionName) {
  // Variable(s)
  var arrElements;
  var xpathParentElement;
  var xpathElement;

  arrElements = parentElementPath.split('|');
  if (sectionName.toLowerCase() === 'available') {
    if (arrElements.length === 1) {
      xpathParentElement = this.xpathAvailableContainer + '//*[@ng-repeat]/tf-listbox-item[descendant::*' +
        '//*[normalize-space(.)="' + arrElements[0] + '"]]/*[contains(@class, "selectable-handle")]';
    } else {
      xpathParentElement = this.xpathAvailableContainer + '//*[@ng-repeat]';
      for (var i = 0; i < arrElements.length; i++) {
        xpathParentElement += '/tf-listbox-item[descendant::*//*[normalize-space(.)="' + arrElements[i] + '"]]' +
          '/*[contains(@class, "selectable-handle")]';

        if (i !== arrElements.length - 1) {
          xpathParentElement += '/following-sibling::*/';
        }
      }
    }
  } else if (sectionName.toLowerCase() === 'selected') {
    if (arrElements.length === 1) {
      xpathParentElement = this.xpathSelectedContainer + '//*[@ng-repeat]/tf-listbox-item[descendant::*' +
        '//*[normalize-space(.)="' + arrElements[0] + '"]]/*[contains(@class, "selectable-handle")]';
    } else {
      xpathParentElement = this.xpathSelectedContainer + '//*[@ng-repeat]/';
      for (var j = 0; j < arrElements.length; j++) {
        xpathParentElement += '/tf-listbox-item[descendant::*//*[normalize-space(.)="' + arrElements[j] + '"]]' +
          '/*[contains(@class, "selectable-handle")]';

        if (j !== arrElements.length - 1) {
          xpathParentElement += '/following-sibling::*/';
        }
      }
    }
  }

  xpathElement = xpathParentElement + '/following-sibling::*//tf-listbox-item[descendant::*' +
    '//*[normalize-space(.)="' + elementName + '"]]';

  return element(by.xpath(xpathElement));
};

/****************************************************************************************/
/* Function: getElement                                                                 */
/* Description: This function is used to get element from 'Asset Types > Add/Remove'    */
/*              options.                                                                */
/* Params: 1. elementName -> Name of the element to be selected.                        */
/*         2. elementType -> Type of element, either tree or list                       */
/*         3. parentElementPath -> Parent element in which required element is present. */
/* Return: Returns the reference of required element.                                   */
/****************************************************************************************/
DocumentOptionsAssetTypeAddRemove.prototype.getElement = function(elementName, elementType, parentElementPath) {
  var xpathElement;

  xpathElement = this.xpathSelectedContainer + '//*[@ng-repeat]/';

  if (parentElementPath !== undefined) {
    var arrElements = parentElementPath.split('|');
    if (arrElements.length === 1) {
      xpathElement += '/tf-listbox-item[descendant::*//*[normalize-space(.)="' + arrElements[0] + '"]]' +
        '/*[contains(@class, "selectable-handle")]';
    } else {
      for (var j = 0; j < arrElements.length; j++) {
        xpathElement += '/tf-listbox-item[descendant::*//*[normalize-space(.)="' + arrElements[j] + '"]]' +
          '/*[contains(@class, "selectable-handle")]';

        if (j !== arrElements.length - 1) {
          xpathElement += '/following-sibling::*/';
        }
      }
    }
  }

  if (elementType.toLowerCase() === 'tree' && parentElementPath === undefined) {
    xpathElement += '/tf-listbox-item[descendant::*//*[normalize-space(.)="' + elementName + '"]]';
  } else if (elementType.toLowerCase() === 'tree') {
    xpathElement += '/following-sibling::*//tf-listbox-item[descendant::*' +
      '//*[normalize-space(.)="' + elementName + '"]]';
  } else if (elementType.toLowerCase() === 'list') {
    xpathElement += '/following-sibling::*//tf-listbox-item[descendant::*' +
      '//*[normalize-space(.)="' + elementName + '"]]';
  }

  return element(by.xpath(xpathElement));
};

/****************************************************************************************/
/* Function: getDeleteIcon                                                              */
/* Description: This function is used to get reference of DELETE icon of an element.    */
/* Params: 1. parentElementPath -> Parent element in which required element is present. */
/*                                 Ex: FactSet|Portfolio|Position Data                  */
/*         2. elementName -> Element name whose delete icon reference is needed.        */
/*                           Ex: Port. Ending Quantity Held                             */
/*         3. sectionName -> Name of the section from which reference is needed.        */
/*         Ex: Available or Selected.                                                   */
/* Return: Returns the reference of delete icon.                                        */
/****************************************************************************************/
DocumentOptionsAssetTypeAddRemove.prototype.getDeleteIcon = function(parentElementPath, elementName, sectionName) {
  return this.getElementInsideTree(parentElementPath, elementName, sectionName).$('.tf-icon-remove-i');
};

/****************************************************************************************/
/* Function: getIndex                                                                   */
/* Description: This function is used to get find the position of given element from    */
/*              "Selected" section.                                                     */
/* Params: elementName -> Element whose position information is required.               */
/* Return: Promise which resolves to the position of given element.                     */
/****************************************************************************************/
DocumentOptionsAssetTypeAddRemove.prototype.getIndex = function(elementName) {
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

/************************************************************************************************************/
/* Function: getCheckBox                                                                                    */
/* Description: This function is used to get reference of checkbox from "Add/Remove" pill.                  */
/* Params: checkBoxName -> Name of the check box whose reference is required.                               */
/*         Ex: "Disable asset type adjustments".                                                            */
/* Return: Promise which resolves to the reference of checkbox.                                             */
/************************************************************************************************************/
DocumentOptionsAssetTypeAddRemove.prototype.getCheckBox = function(checkBoxName) {
  // Variable(s)
  var xpathCheckbox;

  if (checkBoxName.toLowerCase() === 'apply to benchmark') {
    xpathCheckbox = '//*[@data-qa-id="checkbox-apply-to-bench"]/tf-checkbox-control';
  } else {
    xpathCheckbox = '//*[@data-qa-id="checkbox-' + checkBoxName.toLowerCase().replace(/\s/g, '-') + '"]/tf-checkbox-control';
  }

  return element(by.xpath(xpathCheckbox));
};

/************************************************************************************************************/
/* Function: getLeverageFactorField                                                                         */
/* Description: This function is used to get reference of "Leverage Factor" input field.                    */
/* Params: NA                                                                                               */
/* Return: Promise which resolves to the reference of input field.                                          */
/************************************************************************************************************/
DocumentOptionsAssetTypeAddRemove.prototype.getLeverageFactorField = function() {
  return element(by.xpath(this.xpathLeverageFactorField));
};

/****************************************************************************************/
/* Function: setOrGetLeverageFactor                                                     */
/* Description: This function is used to set specified value for Leverage Factor or     */
/*              simply get the default value of "Leverage Factor".                      */
/* Params: 1. valueToBeSet -> Value to set for "Leverage Factor". If no value is passed */
/*            it'll be set to "undefined" and returns the reference of "Leverage Factor"*/
/*            input box.                                                                */
/*         2. typeIntoTheBox -> Boolean Value, if TRUE, it'll directly type into the    */
/*            "Leverage Factor" input box. Default value is TRUE.                       */
/*         3. changeValueUsingArrowButtons -> If TRUE then arrows are used to set the   */
/*            value. Default value is FALSE.                                            */
/* Return: Reference of "Leverage Factor" input box.                                    */
/****************************************************************************************/
DocumentOptionsAssetTypeAddRemove.prototype.setOrGetLeverageFactor = function(valueToBeSet, typeIntoTheBox,
                                                                               changeValueUsingArrowButtons) {
  // Variable(s)
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
  var leverageFactorInputField = element(by.xpath(this.xpathLeverageFactorField));
  var upArrowButton = element(by.xpath('//*[@data-qa-id="property-name" and normalize-space(.)="Leverage Factor"]' +
    '/following-sibling::*[@data-qa-class="number-input"]//*[contains( @class, "spin-up" )]'));
  var downArrowButton = element(by.xpath('//*[@data-qa-id="property-name" and normalize-space(.)="Leverage Factor"]' +
    '/following-sibling::*[@data-qa-class="number-input"]//*[contains( @class, "spin-down" )]'));

  // Return the reference of "Leverage Factor" input box if "valueToBeSet" is "undefined"
  if (valueToBeSet === undefined) {
    return leverageFactorInputField;
  }

  // Enter the value directly into the input field if typeIntoTheBox is true
  if (typeIntoTheBox) {
    leverageFactorInputField.click();
    leverageFactorInputField.sendKeys(protractor.Key.HOME, protractor.Key.SHIFT, protractor.Key.END, protractor.Key.NULL,
      valueToBeSet);
  } else if (changeValueUsingArrowButtons) {    // Set the value of "Leverage Factor" using the arrow buttons
    // Get the initial value present in the input field
    leverageFactorInputField.getAttribute('value').then(function(initialValue) {
      if (initialValue > valueToBeSet) {
        // If initial value is greater than the value to be set then we have to decrease it using down arrow button
        for (i = 1; i <= Math.round(Math.abs(initialValue - valueToBeSet)); i++) {
          downArrowButton.click();
          downArrowButton = element(by.xpath('//*[@data-qa-id="property-name" and normalize-space(.)="Leverage Factor"]' +
            '/following-sibling::*[@data-qa-class="number-input"]//*[contains( @class, "spin-down" )]'));
        }
      } else if (initialValue < valueToBeSet) {
        // If initial value is less than the value to be set then we have to increase it using up arrow button
        for (i = 1; i <= Math.round(Math.abs(valueToBeSet - initialValue)); i++) {
          upArrowButton.click();
          upArrowButton = element(by.xpath('//*[@data-qa-id="property-name" and normalize-space(.)="Leverage Factor"]' +
            '/following-sibling::*[@data-qa-class="number-input"]//*[contains( @class, "spin-up" )]'));
        }
      }
    });
  }

  return leverageFactorInputField;
};

/************************************************************************************************************/
/* Function: getLeverageSpinButton                                                                          */
/* Description: This function is used to get reference of spin button of required label.                    */
/* Params: 1. labelName -> Name of the label whos spin button reference is required.                        */
/*         Ex: Leverage Factor.                                                                             */
/*         2. btnName -> Name of the button whose reference is required.                                    */
/*         Ex: Up or Down.                                                                                  */
/* Return: Promise which resolves to the reference of required button.                                      */
/************************************************************************************************************/
DocumentOptionsAssetTypeAddRemove.prototype.getSpinButton = function(labelName, btnName) {
  var xpathSpinButton = '//*[@data-qa-id="property-name" and normalize-space(.)="' + labelName + '"]' +
    '/following-sibling::*[@data-qa-class="number-input"]//*[contains( @class, "spin-' + btnName.toLowerCase() + '" )]';

  return element(by.xpath(xpathSpinButton));
};

/************************************************************************************************************/
/* Function: getOptionsLabel                                                                                */
/* Description: This function is used to get reference of components' label from "Options" container.       */
/* Params: labelName -> Name of the label whose reference is required.                                      */
/* Return: Promise which resolves to the reference of required label.                                       */
/************************************************************************************************************/
DocumentOptionsAssetTypeAddRemove.prototype.getOptionsLabel = function(labelName) {
  var xpathLabel = '//div[@data-qa-id="asset-type-options-options-section"]' +
    '//*[(@data-qa-id="property-name" or @data-qa-id="option-name") and contains( text(),"' + labelName + '" )]';
  return element(by.xpath(xpathLabel));
};

/************************************************************************************************************/
/* Function: getDropDown                                                                                    */
/* Description: This function is used to get reference of drop down button from "Options" container.        */
/* Params: labelName -> Name of the drop down whose reference is required.                                  */
/* Return: Promise which resolves to the reference of required drop down.                                   */
/************************************************************************************************************/
DocumentOptionsAssetTypeAddRemove.prototype.getDropDown = function(dropDownName) {
  var xpathDropDown = '//div[@data-qa-id="asset-type-options-options-section"]' +
    '//*[contains( text(),"' + dropDownName + '" )]/following-sibling::tf-dropdown-select//tf-button';
  return element(by.xpath(xpathDropDown));
};

/************************************************************************************************************/
/* Function: getOption                                                                                      */
/* Description: This function is used to get reference of option from drop down menu.                       */
/* Params: optionName -> Name of the option to be selected from drop down.                                  */
/* Return: Promise which resolves to the reference of required option.                                      */
/************************************************************************************************************/
DocumentOptionsAssetTypeAddRemove.prototype.getOption = function(optionName) {
  var xpathOption = '//tf-dropdown//*[@ng-repeat and normalize-space(.)="' + optionName + '"]';
  return element(by.xpath(xpathOption));
};

/************************************************************************************************************/
/* Function: getSelectedOptionFromDropDown                                                                  */
/* Description: This function is used to find the current option selected from the drop down.               */
/* Params: dropDownName -> Name of the drop down.                                                           */
/* Return: Promise which resolves to name of selected option.                                               */
/************************************************************************************************************/
DocumentOptionsAssetTypeAddRemove.prototype.getSelectedOptionFromDropDown = function(dropDownName) {
  return element(by.xpath('//*[normalize-space(.)="' + dropDownName + '"]/../*[@data-qa-class]//button')).getText();
};

module.exports = new DocumentOptionsAssetTypeAddRemove();
