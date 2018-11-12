'use strict';

var ModifyAccountNew = function() {
  this.xpathOptionsPane = '//*[@data-qa-id="options-lhp"]//tf-options-pane';
  this.xpathHeaderButtons = '//tf-button[@data-qa-id="dialog-replacingText"]';
};

/************************************************************************************************************/
/* Function: isModifyAccountMode                                                                            */
/* Description: This function is used to verify if Modify Account Mode page is opened.                      */
/* Return: Returns true or False.                                                                           */
/************************************************************************************************************/
ModifyAccountNew.prototype.isModifyAccountMode = function() {
  var xpath = '//*[@data-qa-id="modify-account-new-mode-banner"]//*[normalize-space(text())="Modify Account (New)"]';
  return element(by.xpath(xpath)).isPresent();
};

/****************************************************************************************/
/* Function: getAnyDialog                                               */
/* Description: This function is used to get the reference of modify account dialog box.*/
/* Return: Promise which resolves to reference of modify account dialog box.            */
/****************************************************************************************/
ModifyAccountNew.prototype.getAnyDialog = function() {
  var xpathDialog = '//*[@role="dialog"]';
  return element(by.xpath(xpathDialog));
};

/****************************************************************************************/
/* Function: getLHPOptionCategoryExpander                                               */
/* Description: This function is used to get the reference of the expander button       */
/*              on an options category                                                  */
/* Params: 1. categoryName -> name of the options category to get the expander for      */
/* Return: Returns the reference of the specified expander button.                      */
/****************************************************************************************/
ModifyAccountNew.prototype.getLHPOptionCategoryExpander = function(categoryName, click) {
  var xpathExpander = '//*[@data-qa-class="accordion-category"]//*[normalize-space(.)="' + categoryName + '"]' +
    '//*[contains(@class,"tree")]';
  var reference = element(by.xpath(xpathExpander));
  if (click === undefined) {
    click = false;
  }

  if (click) {
    reference.click();
    return reference;
  } else {
    return reference;
  }
};

/****************************************************************************************/
/* Function: getLHPOption                                                               */
/* Description: This function is used to get the reference of an LHP option             */
/* Params: 1. itemName -> name of the options item whose reference is desired.          */
/* Return: Returns the reference of the specified option item.                          */
/****************************************************************************************/

ModifyAccountNew.prototype.getLHPOption = function(itemName) {

  var xpathOption = '//*[normalize-space(.)="' + itemName + '"]/ancestor::*[@data-qa-class="accordion-item"]';
  return element(by.xpath(xpathOption));
};

/************************************************************************************************************/
/* Function: getButtonFromRHP                                                                                  */
/* Description: This function is used to get reference of Save button.                                      */
/* Params: buttonName -> Name of the button.                                                                */
/* Return: Returns the reference of required radio button.                                                  */
/************************************************************************************************************/
ModifyAccountNew.prototype.getButtonFromRHP = function(buttonName) {
  var xpathButton = '//*[@data-qa-class="text-button"][normalize-space(.)="' + buttonName + '"]';
  return element(by.xpath(xpathButton));
};

/**************************************************************************************************/
/* Function: expandOrCollapseCategoryFromLHP                                                      */
/* Description: This function is used to get the reference of expand and collapse button from LHP.*/
/* Param: 1. categoryName -> Name of the category which should be expanded or collapsed.          */
/*                           Ex -> General, PA                                                    */
/*        2. actionName -> Action which should be performed.                                      */
/*                         Ex -> Expand, Collapse                                                 */
/*        3. subCategoryName ( optional ) ->  Name of the subcategory to be expanded or collapsed.*/
/* Return: Promise which resolves to reference ofexpanded or collapsed button.                    */
/**************************************************************************************************/
ModifyAccountNew.prototype.expandOrCollapseCategoryFromLHP = function(categoryName, actionName, subCategoryName) {
  // Variable(s)
  var _this = this;
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var xpathExpander;
  var icon;

  if (subCategoryName === undefined) {
    xpathExpander = '//*[@data-qa-class="accordion-category"][.//*[normalize-space(.)="' + categoryName + '"]]' +
      '//tf-options-pane-expander//tf-icon[contains(@class,"tree")]';
    icon = categoryName;

  } else {
    xpathExpander = '//*[@data-qa-class="accordion-category"][.//*[normalize-space(.)="' + categoryName + '"]]/child::*' +
      '//tf-options-pane-item-title[normalize-space(.)="' + subCategoryName + '"]/preceding-sibling::*//tf-icon[contains(@class,"tree")]';
    icon = subCategoryName;
  }

  var reference = element(by.xpath(xpathExpander));

  _this.isCategoryExpanded(icon).then(function(boolean) {
    if (boolean) { // If category is expanded by default
      if (actionName.toLowerCase() !== 'expand') {  // Category has to be collapsed
        reference.click();

        // Verifying if category is collapsed
        _this.isCategoryExpanded(icon).then(function(expanded) {
          if (expanded) { // Category is still expanded
            defer.fulfill(false);
          } else {    // Category is collapsed
            defer.fulfill(true);
          }
        });
      } else {    // Category is already expanded
        defer.fulfill(true);
      }
    } else {    // Category is collapsed by default
      if (actionName.toLowerCase() === 'expand') {  // Category should be expanded
        reference.click();

        // Verifying if category is expanded
        _this.isCategoryExpanded(icon).then(function(expanded) {
          if (expanded) { // Category is expanded
            defer.fulfill(true);
          } else {    // Category is still collapsed
            defer.fulfill(false);
          }
        });
      } else {
        defer.fulfill(true);
      }
    }
  });

  return promise;

};

/**************************************************************************************************/
/* Function: isCategoryExpanded                                                                   */
/* Description: This function is used to verify if particular category is expanded or not.        */
/* Param: 1. categoryName -> Name of the category which should be which should be verified.       */
/*                           Ex -> General, PA                                                    */
/* Return: Promise which resolves to true or false.                                               */
/**************************************************************************************************/
ModifyAccountNew.prototype.isCategoryExpanded = function(categoryName) {

  // Variable(s)
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var xpathExpander = '//*[@data-qa-class="accordion-category"]//*[normalize-space(.)="' + categoryName + '"]' +
    '//*[contains(@class,"tree")]';

  // Check if the category is collapsed
  element(by.xpath(xpathExpander)).getAttribute('class').then(function(attrValue) {
    if (attrValue.indexOf('closed') > -1) {
      defer.fulfill(false);
    } else {
      defer.fulfill(true);
    }
  });

  return promise;
};

/****************************************************************************************/
/* Function: getLHPOptionFromTree                                                       */
/* Description: This function is used to get the reference of an LHP option             */
/* Params: 1. parentElementPath -> Parent path from which element should be selected    */
/*                                 Ex:- General, PA->Asset Types                        */
/* Param:  2. elementName -> Name of the element which reference is desired             */
/* Return: Returns the reference of the specified option item.                          */
/****************************************************************************************/
ModifyAccountNew.prototype.getLHPOptionFromTree = function(parentElementPath, elementName) {
  // Variable(s)
  var arrElements;
  var xpathParentElement;
  var xpathElement;

  arrElements = parentElementPath.split('|');
  if (arrElements.length === 1) {
    xpathParentElement = '//*[@data-qa-class="accordion-category"]//tf-options-pane-expander//ancestor::*' +
      '[normalize-space(.)="' + arrElements[0] + '"]//span[@tf-icon]';

  } else {
    xpathParentElement = '//*[@data-qa-class="accordion-category"]';
    for (var i = 0; i < arrElements.length; i++) {
      xpathParentElement += '//tf-options-pane-expander//ancestor::*[normalize-space(.)="' + arrElements[i] + '"]//span[@tf-icon]';
      if (i !== arrElements.length - 1) {
        xpathParentElement += '//ancestor::tf-options-pane-item-handle//following-sibling::tf-options-pane-children';
      }
    }
  }

  xpathElement = xpathParentElement + '//ancestor::*[@data-qa-class="accordion-category"]//*[contains(@value,"item")]' +
    '[normalize-space(.)="' + elementName + '"]';

  return element(by.xpath(xpathElement));
};

/****************************************************************************************/
/* Function: selectAndVerifyOptionFromLHP                                               */
/* Description: This function is used to select and verify if the LHP option is selected*/
/* Params: 1. parentElementPath -> Parent path from which element should be selected    */
/*                                 Ex:- General, PA->Asset Types                        */
/* Param:  2. elementName -> Name of the element which reference is desired             */
/* Return: NA.                                                                          */
/****************************************************************************************/
ModifyAccountNew.prototype.selectAndVerifyOptionFromLHP = function(parentElementPath, elementName, click) {
  if (click === true) {
    this.getLHPOptionFromTree(parentElementPath, elementName).click();

    // Verifying if options is selected in LHP after select
    this.getLHPOptionFromTree(parentElementPath, elementName).getAttribute('class').then(function(value) {
      expect(value.indexOf('selected') >= 0).customError('"' + elementName + '" did not selected in LHP');
    });
  } else if (click === undefined) {
    // Verifying if options is selected in LHP
    this.getLHPOptionFromTree(parentElementPath, elementName).getAttribute('class').then(function(value) {
      expect(value.indexOf('selected') >= 0).customError('"' + elementName + '" did not selected in LHP');
    });
  }
};

/****************************************************************************************/
/* Function: expandCategoryTree                                                         */
/* Description: This function is used to get the reference of the expander button       */
/*              on an options category and expand it.                                   */
/* Params: parentElementPath -> Parent path which should be expanded                    */
/*                                 Ex:- General, PA->Asset Types                        */
/* Return: NA.                                                                          */
/****************************************************************************************/
ModifyAccountNew.prototype.expandCategoryTree = function(parentElementPath) {
  var arrElements;
  arrElements = parentElementPath.split('|');
  arrElements.forEach(function(value) {
    var ref = element(by.xpath('//*[@data-qa-class="accordion-category"]//tf-options-pane-expander//ancestor::*' +
      '[normalize-space(.)="' + value + '"]//tf-icon[contains(@class, "tf-icon-tree")]'));
    ref.getAttribute('class').then(function(text) {
      if (text.indexOf('open') < 0) {
        ref.click();
      }
    });
  });

};
/****************************************************************************************/
/* Function: selectOptionsFromLHP                                                       */
/* Description: This function is used to get the reference of an LHP option             */
/* Params: 1. option -> name of the options item desired                                */
/* Param:  2. categoryName -> Name of the category from which option item desired       */
/* Param:  3. click -> click on reference . Example: True.                              */
/* Return: Returns the reference selected or not.                                       */
/****************************************************************************************/
ModifyAccountNew.prototype.selectOptionsFromLHP = function(option, click) {
  if (click === true) {
    this.getLHPOption(option).click();
    this.getLHPOption(option).getAttribute('class').then(function(value) {
      expect(value.indexOf('selected') >= 0).customError('"' + option + '" did not select in LHP');
    });
  } else if (click === undefined) {
    this.getLHPOption(option).getAttribute('class').then(function(value) {
      expect(value.indexOf('selected') >= 0).customError('"' + option + '" did not select in LHP');
    });
  }
};

/* Save As Dialog */
/***************************************************************************************************************/
/* Function: getCategoryOption                                                                                        */
/* Description: This function is used to get reference of element provided.                                    */
/* Param: eleName -> name of the element whose reference is required. Ex -> Client                             */
/* Return: Returns the reference of provided element.                                                          */
/***************************************************************************************************************/
ModifyAccountNew.prototype.getCategoryOption = function(eleName) {
  var xpathElement = '//tf-listbox-item-handle[contains(@class,"tf-selectable")][normalize-space(.)="' + eleName.toUpperCase() + '"]';
  Utilities.scrollElementToVisibility(element(by.xpath(xpathElement)));
  return element(by.xpath(xpathElement));
};
/***************************************************************************************************************/
/* Function: getInputBox                                                                                        */
/* Description: This function is used to get reference of value in textbox.                                    */
/* Param: eleName -> name of the element whose reference is required. Ex -> Name, Description,Category         */
/* Return: Returns the reference of provided element.                                                          */
/***************************************************************************************************************/
ModifyAccountNew.prototype.getInputBoxfromSaveAsDialog = function(eleName) {
  var xpathElement = '//*[@ng-transclude]//tf-form-label[normalize-space(.)="' + eleName + '"]/following-sibling::*//tf-textbox//input';
  return element(by.xpath(xpathElement));
};
/************************************************************************************************************/
/* Function: getButtonFromSaveAsDialog                                                                      */
/* Description: This function is used to get reference of button.                                           */
/* Params: buttonName -> Name of the button.                                                                */
/* Return: Returns the reference of required Button.                                                        */
/************************************************************************************************************/
ModifyAccountNew.prototype.getButtonFromSaveAsDialog = function(buttonName) {
  var xpathButton = '//tf-dialog-footer//*[@data-qa-class=\"text-button\"][normalize-space(.)="' + buttonName + '"]';
  return element(by.xpath(xpathButton));
};
/************************************************************************************************************/
/* Function: getButtonFromFactsetPopUp                                                                                */
/* Description: This function is used to get reference of Factset popup.                                    */
/* Return: Returns the reference of popup.                                                                  */
/************************************************************************************************************/
ModifyAccountNew.prototype.getButtonFromFactsetPopUp = function(buttonName) {
  var xpathButton = '//*[@role="dialog"]//*[contains(@class,"buttonset") and ' +
    'not(contains(@class,"ui-dialog-buttonset-left"))]//*[normalize-space(.)="' + buttonName + '"]';
  return element(by.xpath(xpathButton));
};
/********************************************************************************************/
/* Function: getDialogWithText                                                              */
/* Description: This function is used to get reference of any dialog box based on its title.*/
/* Params: 1. titleOfDialog -> Pass the title of dialog box to get its reference.           */
/* Return: Promise which resolves to dialog box reference.                                  */
/********************************************************************************************/
ModifyAccountNew.prototype.getDialogWithText = function(titleOfDialog) {
  var xpathDialog = '//*[normalize-space(text())="' + titleOfDialog + '"]/ancestor::tf-dialog|' +
    '//span[.="' + titleOfDialog + '"]/ancestor::div[@role="dialog"]//*[contains(@class,"ui-dialog-content")]';
  return element(by.xpath(xpathDialog));
};
/********************************************************************************************/
/* Function: getDialog                                                                      */
/* Description: This function is used to get reference of any dialog box based on its title.*/
/* Params: 1. titleOfDialog -> Pass the title of dialog box to get its reference.           */
/* Return: Promise which resolves to dialog box reference.                                  */
/********************************************************************************************/
ModifyAccountNew.prototype.getDialog = function(titleOfDialog) {
  var xpathDialog = '//*[normalize-space(text())="' + titleOfDialog + '"]/ancestor::tf-dialog|' +
    '//span[.="' + titleOfDialog + '"]/ancestor::div[@role="dialog"]';
  return element(by.xpath(xpathDialog));
};

/************************************************************************************************/
/* Function: getHeaderFromErrorsDropdown                                                        */
/* Description: This function is used to get reference of header from "Errors Found" drop down. */
/* Params: 1. headerName -> Pass the header name.                                               */
/* Return: Promise which resolves to header reference.                                          */
/************************************************************************************************/
ModifyAccountNew.prototype.getHeaderFromErrorsDropdown = function(headerName) {
  return element(by.xpath('//tf-listbox-header[normalize-space(.)="' + headerName + '"]'));
};

/************************************************************************************************/
/* Function: getAllErrorsUnderHeader                                                            */
/* Description: This function is used to get reference of all error under the header.           */
/* Params: 1. headerName -> Pass the header name.                                               */
/* Return: Promise which resolves to array of errors references under header.                   */
/************************************************************************************************/
ModifyAccountNew.prototype.getAllErrorsUnderHeader = function(headerName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var itemReference = null;
  this.getHeaderFromErrorsDropdown(headerName).isDisplayed().then(function(flag) {
    if (flag) {
      itemReference = element.all(by.xpath('//tf-listbox-header[normalize-space(.)="' + headerName + '"]/following-sibling::tf-listbox-item'));
      return itemReference;
    } else {
      expect(false).customError('No header found with ' + headerName);
      CommonFunctions.takeScreenShot();
    }
  }).then(function(listItemRef) {
    defer.fulfill(listItemRef);
  });
  return promise;
};

module.exports = new ModifyAccountNew();
