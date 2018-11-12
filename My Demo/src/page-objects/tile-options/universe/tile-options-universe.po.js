'use strict';

var TileOptionsUniverse = function() {
  this.xpathAvailableContainer = '//*[@class="universe-options-add-remove-full-screen"]//tf-transferbox-source';
  this.xpathSelectedContainer = '//*[@class="universe-options-add-remove-full-screen"]//tf-transferbox-target';
  this.xpathBlastingWindow = '//*[@id="blastPaneluniverse"]';
  this.xpathExpandLotLevelDataCheckBox = '//tf-checkbox[normalize-space(translate(.,"\u00A0", " ")) = "Expand Lot Level Data"]';
  this.xpathExpandCompositeAssetsDropDown = '//*[@data-qa-id="dropdown-universe-composite-assets"]//span[@tf-button]';
  this.xpathDisableAssetTypeAdjustmentsCheckBox = '//*[contains(@class,"universe-options")]//*[@data-qa-id="checkbox-disable-asset-type-adjustments"]';
  this.xpathSearchOrderButton = '//tf-button[@data-qa-id="button-universe-search-order"]';
};

/****************************************************************************************/
/* Function: getElement                                                                 */
/* Description: This function is used to get the reference of an element from           */
/*              particular section.                                                     */
/*  Params: 1. elementPath -> Path of the element you want to get the reference of,     */
/*                            including the element itself.                             */
/*                           Ex: Funds|Exchange Traded Fund                             */
/*          2. sectionName -> Name of the section.                                      */
/*                           Ex: Available or Selected                                  */
/* Return: Returns the reference of required element.                                   */
/* NOTE: Don't need to specify '|' when you want to get tree element from first level.  */
/****************************************************************************************/
TileOptionsUniverse.prototype.getElement = function(elementPath, sectionName) {
  var xpathElement;
  var arrElements = elementPath.split('|');
  var i = 0;

  if (sectionName.toLowerCase() === 'available') {
    xpathElement = this.xpathAvailableContainer + '//tf-listbox-item[./tf-listbox-item-handle//*[normalize-space(.)="' + arrElements[i] + '"]]';
  } else if (sectionName.toLowerCase() === 'selected') {
    xpathElement = this.xpathSelectedContainer + '//tf-listbox-item[./tf-listbox-item-handle//*[normalize-space(.)="' + arrElements[i] + '"]]';
  }

  if (arrElements.length > 1) {
    for (i = 1; i < arrElements.length; ++i) {
      xpathElement += '//tf-listbox-item[./tf-listbox-item-handle//*[normalize-space(.)="' + arrElements[i] + '"]]';
    }
  }

  xpathElement += '/tf-listbox-item-handle';

  return element(by.xpath(xpathElement));
};

/****************************************************************************************/
/* Function: checkIfSelected                                                            */
/* Description: This function is used to check if an element in the Available or        */
/*              Selected sections is selected.                                          */
/*  Params: 1. elementPath -> Path of the element you want to get the reference of,     */
/*                            including the element itself.                             */
/*          2. sectionName -> Name of the section.                                      */
/*                           Ex: Available or Selected                                  */
/****************************************************************************************/
TileOptionsUniverse.prototype.checkIfSelected = function(elementPath, sectionName) {
  var xpathElement;
  var arrElements = elementPath.split('|');
  var i = 0;

  if (sectionName.toLowerCase() === 'available') {
    xpathElement = this.xpathAvailableContainer + '//tf-listbox-item[./tf-listbox-item-handle//*[normalize-space(.)="' + arrElements[i] + '"]]';
  } else if (sectionName.toLowerCase() === 'selected') {
    xpathElement = this.xpathSelectedContainer + '//tf-listbox-item[./tf-listbox-item-handle//*[normalize-space(.)="' + arrElements[i] + '"]]';
  }

  if (arrElements.length > 1) {
    for (i = 1; i < arrElements.length; ++i) {
      xpathElement += '//tf-listbox-item[./tf-listbox-item-handle//*[normalize-space(.)="' + arrElements[i] + '"]]';
    }
  }

  expect(element(by.xpath(xpathElement)).getAttribute('class')).toContain('selected');
};

/********************************************************************************************/
/* Function: getArrowButton                                                                 */
/* Description: This function is used to get reference of the specified  arrow icon from    */
/*              the transfer boxes area.                                                    */
/* Params: buttonName -> Name of the button.                                                */
/*                       Ex: Left or Right                                                  */
/* Return: Returns the reference of an arrow button.                                        */
/********************************************************************************************/
TileOptionsUniverse.prototype.getArrowButton = function(buttonName) {
  var xpathArrow = '//*[@class="universe-options-add-remove-full-screen"]//tf-transferbox-transfer-buttons';
  xpathArrow = xpathArrow + '//*[contains(@class,"arrow-' + buttonName.toLowerCase() + '")]//..';

  return element(by.xpath(xpathArrow));
};

/********************************************************************************************/
/* Function: getAllElements                                                                 */
/* Description: This function is used to get the references of all elements from particular */
/*              section.                                                                    */
/* Params: sectionName -> Name of the section.                                              */
/*                        Ex: Available or Selected                                         */
/* Return: Returns an array of references of all elements from the specific section.        */
/********************************************************************************************/
TileOptionsUniverse.prototype.getAllElements = function(sectionName) {
  var xpathElements;

  if (sectionName.toLowerCase() === 'available') {
    xpathElements = this.xpathAvailableContainer + '//tf-listbox//tf-listbox-item';
  } else if (sectionName.toLowerCase() === 'selected') {
    xpathElements = this.xpathSelectedContainer + '//tf-listbox//tf-listbox-item';
  }

  return element.all(by.xpath(xpathElements));
};

/********************************************************************************************/
/* Function: getIndex                                                                       */
/* Description: This function is used to get index of element present in the particular     */
/*              section.                                                                    */
/* Params: 1. elementName -> Name of the element.                                           */
/*                              Ex: "Funds"                                                 */
/*         2. sectionName -> Name of the section.                                           */
/*                              Ex: Selected or Available                                   */
/* Return: Returns promise which resolves to a number.                                      */
/********************************************************************************************/
TileOptionsUniverse.prototype.getIndex = function(elementName, sectionName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;

  this.getAllElements(sectionName).map(function(ele, index) {
    return {
      index: index,
      text: ele.getText(),
    };
  }).then(function(items) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].text.split('\n')[0] === elementName) {
        defer.fulfill(i);
        break;
      }
    }

    defer.reject('"' + elementName + '" element is not found in ' + sectionName + ' section.');
  });

  return promise;
};

/********************************************************************************************/
/* Function: getExpandCompositeAssetsDropDown                                               */
/* Description: This function is used to get reference of Expand Composite Assets dropdown. */
/* Params: isOpened (optional) -> Boolean value, TRUE to verify if dropdown is opened.      */
/* Return: Returns the reference of a dropdown.                                             */
/********************************************************************************************/
TileOptionsUniverse.prototype.getExpandCompositeAssetsDropDown = function(isOpened) {
  var xpathDropDown = '//*[@data-qa-id="dropdown-universe-composite-assets"]//tf-button';

  if (isOpened === true) {
    xpathDropDown = '//tf-dropdown';
  }

  return element(by.xpath(xpathDropDown));
};

/********************************************************************************************/
/* Function: getDropDownItem                                                                */
/* Description: This function is used to get reference of the item from the dropdown.       */
/* Params: 1. itemName -> Name of the item.                                                 */
/* Return: Returns the reference of item from the dropdown.                                 */
/********************************************************************************************/
TileOptionsUniverse.prototype.getDropDownItem = function(itemName) {
  var xpathDropDownItem = '//tf-dropdown//*[@data-qa-class="dropdown-option" and normalize-space(.)="' + itemName + '"]';

  return element(by.xpath(xpathDropDownItem));
};

/********************************************************************************************/
/* Function: getRadioButton                                                                 */
/* Description: This function is used to get reference of radio button in Universe tab.     */
/* Params: 1. radioButtonName -> Name of the radio button.                                  */
/* Return: Returns the reference of radio button.                                           */
/********************************************************************************************/
TileOptionsUniverse.prototype.getRadioButton = function(radioButtonName) {
  radioButtonName = radioButtonName.replace(/\s/g, '-').toLowerCase();
  var xpathRadioButton = '//*[@class="universe-options-add-remove-full-screen"]//*[@data-qa-id="radio-button-' + radioButtonName + '"]/tf-radio-control';

  return element(by.xpath(xpathRadioButton));
};

/************************************************************************************************************/
/* Function: getCheckBox                                                                                    */
/* Description: This function is used to get reference of checkbox from Universe options                    */
/* Params: checkBoxName -> Name of the check box whose reference is required.                               */
/*         Ex: "Disable asset type adjustments".                                                            */
/* Return: Promise which resolves to the reference of checkbox.                                             */
/************************************************************************************************************/
TileOptionsUniverse.prototype.getCheckBox = function(checkBoxName) {
  var xpathCheckbox = '//*[@class="universe-options-add-remove-full-screen"]' + '//*[@data-qa-id="checkbox-' + checkBoxName.toLowerCase().replace(/\s/g, '-') + '"]/tf-checkbox-control | //tf-checkbox[normalize-spac' + 'e(translate(.,"\u00A0", " ")) = "' + checkBoxName + '"]//tf-checkbox-control';

  return element(by.xpath(xpathCheckbox));
};

/****************************************************************************************/
/* Function: expandElementTree                                                          */
/* Description: This function is used to expand the Tree passed as an argument to the   */
/*              function.                                                               */
/* Params: 1. elementPath -> Path of tree to be expanded.                               */
/*                           Ex: FactSet|Portfolio|Position Data                        */
/*         2. sectionName -> Name of the section.                                       */
/*                           Ex: Available or Selected                                  */
/****************************************************************************************/
TileOptionsUniverse.prototype.expandElementTree = function(elementPath, sectionName) {
  // Variable( s )
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var arrElements;
  var xpathExpandButton;

  arrElements = elementPath.split('|');

  // based on the sectionName passed make the xpath
  if (sectionName.toLowerCase() === 'available') {
    xpathExpandButton = this.xpathAvailableContainer;
  } else if (sectionName.toLowerCase() === 'selected') {
    xpathExpandButton = this.xpathSelectedContainer;
  }

  for (var i = 0; i < arrElements.length; i++) {
    xpathExpandButton += '//tf-listbox-item[./tf-listbox-item-handle//*[normalize-space(.)="' + arrElements[i] + '"]]';

    // Clicking on expand button for each element
    element(by.xpath(xpathExpandButton + '/*/tf-tree-control-expander')).click();
  }

  return promise;
};

/****************************************************************************************/
/* Function: checkifExpanded                                                            */
/* Description: This function is used to check if each element in the "elementPath" is  */
/*              expanded.                                                               */
/* Params: 1. elementPath -> Element path to be checked for expansion.                  */
/*                           Ex: FactSet|Portfolio|Position Data                        */
/*         2. sectionName -> Name of the section.                                       */
/*                           Ex: Available or Selected                                  */
/****************************************************************************************/
TileOptionsUniverse.prototype.checkifExpanded = function(elementPath, sectionName) {
  var xpathParentElement;
  var arrElements = elementPath.split('|');
  var result = 0;

  // based on the sectionName passed make the xpath
  if (sectionName.toLowerCase() === 'available') {
    xpathParentElement = this.xpathAvailableContainer;
  } else if (sectionName.toLowerCase() === 'selected') {
    xpathParentElement = this.xpathSelectedContainer;
  }

  for (var i = 0; i < arrElements.length; i++) {
    xpathParentElement += '//tf-listbox-item[./tf-listbox-item-handle//*[normalize-space(.)="' + arrElements[i] + '"]]';
    expect(element(by.xpath(xpathParentElement + '/*/tf-tree-control-expander//span[@tf-icon][contains(@class,"tf-tactile")]')).getAttribute('class')).toContain('open');
  }
};

/****************************************************************************************/
/* Function: getApplyToButton                                                           */
/* Description: This function is used to get reference of "Apply To ..." button from top*/
/*              right corner of web page.                                               */
/* Params: NA                                                                           */
/* Return: Returns the reference of button.                                             */
/****************************************************************************************/
TileOptionsUniverse.prototype.getApplyToButton = function() {
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
TileOptionsUniverse.prototype.getCheckBoxFromBlastWindow = function(checkBoxName) {
  var xpathCheckBox = this.xpathBlastingWindow + '//*[normalize-space(.)="' + checkBoxName + '"]/*[contains(@class,"checkbox")]';
  return element(by.xpath(xpathCheckBox));
};

/****************************************************************************************/
/* Function: getOkOrCancelButtonFromBlastedWindow                                       */
/* Description: This function is used to get reference of specified button from blasted */
/*              window.                                                                 */
/* Params: 1. btnName -> Name of the button whose reference is needed.                  */
/* Return: Returns the reference of required button.                                    */
/****************************************************************************************/
TileOptionsUniverse.prototype.getOkOrCancelButtonFromBlastedWindow = function(btnName) {
  var xpathButton = '//*[@data-qa-id="blasting-panel"]//*[@data-qa-id and normalize-space(.)="' + btnName + '"]';
  return element(by.xpath(xpathButton));
};

/****************************************************************************************/
/* Function: getRemoveButtonForElementFromSelectedSection                               */
/* Description: This function is used to get reference of remove button of the given    */
/*              element.                                                                */
/* Params: 1. elementName -> Name of the element whose remove button reference is needed*/
/*                           Ex: Equity Options                                         */
/*         2. parentElementPath -> parentElementPath till the elementName which is to be*/
/*                                removed. Ex: Derivatives | Options                    */
/* If Parent Tree element should be removed, then elementName can be optional           */
/* Example: Derivatives or Funds                                                        */
/* Return: Returns reference of remove button for required element.                     */
/****************************************************************************************/

TileOptionsUniverse.prototype.getRemoveButtonForElementFromSelectedSection = function(parentElementPath, elementName) {
  var arrElements = parentElementPath.split('|');
  var xpathParentElement;
  var xpathParentElement2;
  var xpathParentElement1;
  var xpathParentElement12 = this.xpathSelectedContainer;
  if (arrElements.length === 1 && elementName === undefined) {
    xpathParentElement = this.xpathSelectedContainer + '//tf-listbox-item[./tf-listbox-item-handle//*[normalize-space(.)="' + arrElements[0] + '"]]' + '/tf-listbox-item-handle';

    // Hover over element
    browser.actions().mouseMove(element(by.xpath(xpathParentElement))).perform();
    return element(by.xpath(xpathParentElement + '//*[contains(@class, "remove")]'));
  } else {

    arrElements.forEach(function(element1) {
      xpathParentElement1 = xpathParentElement12 + '//tf-listbox-item[./tf-listbox-item-handle' + '// *[normalize-space(.)="' + element1 + '"]]/*/tf-listbox-expander//tf-icon';

      //expect( element( by.xpath( xpathParentElement1 + '/*/tf-listbox-expander//tf-icon' ) )
      //  .getAttribute( 'class' ) ).toContain( 'open' ).customError('Tree is not expanded');

      element(by.xpath(xpathParentElement1)).getAttribute('class').then(function(value1) {
        if (value1.indexOf('open') === -1) {
          expect(false).customError('Tree is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });
    xpathParentElement2 = this.xpathSelectedContainer + '//tf-listbox-item[./tf-listbox-item-handle//*[normalize-space(.)="' + elementName + '"]]/tf-listbox-item-handle';

    // Hover over element
    browser.actions().mouseMove(element(by.xpath(xpathParentElement2))).perform();
    return element(by.xpath(xpathParentElement2 + '//*[contains(@class, "remove")]'));
  }
};

module.exports = new TileOptionsUniverse();
