'use strict';

var DocumentOptionsFixedIncomeAttribution = function() {
  this.xpathOfDurationDropdown = '//*[@data-qa-id="dropdown-fi-attr-duration"]';
};

/********************************************************************************************************************/
/* Function: getDropDown                                                                                            */
/* Description: This function is used to get reference of given drop down.                                          */
/*                                                                                                                  */
/* Params: 1. dropDownName -> Name of the drop down.                                                                */
/*            Ex: Duration or Shift Point or Treat Cash Return As.                                                  */
/*                                                                                                                  */
/* Return: Returns the reference of given drop down.                                                                */
/********************************************************************************************************************/
DocumentOptionsFixedIncomeAttribution.prototype.getDropDown = function(dropDownName) {
  var xpathDropDown;

  // Create XPATH based on drop down name
  if (dropDownName === 'Duration') {
    xpathDropDown = '//*[@data-qa-id="dropdown-fi-attr-duration"]//tf-button';
  } else if (dropDownName === 'Shift Point') {
    xpathDropDown = '//*[@data-qa-id="dropdown-fi-attr-shift-point"]//tf-button';
  } else if (dropDownName === 'Treat Cash Return As') {
    xpathDropDown = '//*[@data-qa-id="dropdown-treat-cash-return-as"]//tf-button';
  }

  return element(by.xpath(xpathDropDown));
};

/********************************************************************************************************************/
/* Function: getAllDropDownItems                                                                                    */
/* Description: This function is used to get references of all drop down items.                                     */
/*                                                                                                                  */
/* Return: Returns an array of references of drop down items.                                                       */
/********************************************************************************************************************/
DocumentOptionsFixedIncomeAttribution.prototype.getAllDropDownItems = function() {
  var xpathDropDownItems = '//tf-dropdown//*[@data-qa-class="dropdown-option"]';

  return element.all(by.xpath(xpathDropDownItems));
};

/********************************************************************************************************************/
/* Function: isTreeExpanded                                                                                         */
/* Description: This function checks whether the given Tree is expanded in the Shift Point Option box.              */
/*                                                                                                                  */
/* Params: 1. treeName -> Name of the Tree in the Options box.                                                      */
/*                                                                                                                  */
/* Return: Returns promise which refers true if the given Tree is expanded.                                         */
/********************************************************************************************************************/
DocumentOptionsFixedIncomeAttribution.prototype.isTreeExpanded = function(treeName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var xpathTree = '//*[@data-qa-class="checkbox-tree"]//tf-checklist-group[.//*[normalize-space(.)="' + treeName + '"]]' + '//*[contains(@class, "icon-tree")]';

  // If tree is expanded "class" attribute value contains the text "expanded".
  element(by.xpath(xpathTree)).getAttribute('class').then(function(text) {
    if (text.search('open') === -1) {
      defer.fulfill(false);
    } else {
      defer.fulfill(true);
    }
  });

  return promise;
};

/********************************************************************************************************************/
/* Function: expandTree                                                                                             */
/* Description: This function expands the given Tree in the Shift Point Option box.                                 */
/*                                                                                                                  */
/* Params: 1. treeName -> Name of the Tree from Shift Point Option box.                                             */
/*                                                                                                                  */
/* Return: Returns promise which refers true if the given Tree is expanded.                                         */
/********************************************************************************************************************/
DocumentOptionsFixedIncomeAttribution.prototype.expandTree = function(treeName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var _this = this;
  var xpathExpandButton = '//*[@data-qa-class="checkbox-tree"]//tf-checklist-group[.//*[normalize-space(.)="' + treeName + '"]]' + '//*[contains(@class, "icon-tree")]';

  this.isTreeExpanded(treeName).then(function(flag) {
    // Expand the tree if not already expanded
    if (!flag) {
      element(by.xpath(xpathExpandButton)).click();
      _this.isTreeExpanded(treeName).then(function(flag2) {
        // Verify if tree is expanded
        if (flag2) {
          defer.fulfill(true);
        } else {
          defer.reject('"' + treeName + '" Tree is not expanded even after a click on expand button.');
        }
      });
    } else {
      // Fulfill the promise if tree is already expanded
      defer.fulfill(true);
    }
  });

  return promise;
};

/********************************************************************************************************************/
/* Function: getShiftPointCheckbox                                                                                  */
/* Description: This function is used to get the reference of checkbox of the element if specified. Otherwise,      */
/*              gets the reference of the checkbox of specified tree from Shift Point Options Box.                  */
/*                                                                                                                  */
/* Params: 1. treeName -> Name of the tree.                                                                         */
/*            Ex: 'Include All'                                                                                     */
/*         2. elementName (optional) -> Name of the element.                                                        */
/*            Ex: '3 Month'                                                                                         */
/*                                                                                                                  */
/* Return: Returns the reference of checkbox of the element if specified otherwise returns the reference of checkbox*/
/*         of the specific tree.                                                                                    */
/********************************************************************************************************************/
DocumentOptionsFixedIncomeAttribution.prototype.getShiftPointCheckbox = function(treeName, elementName) {
  var xpathCheckbox = '//*[@data-qa-class="checkbox-tree"]';

  // Verify if 'elementName' is defined.
  if (elementName !== undefined && elementName !== '') {
    xpathCheckbox += '//tf-checklist-group//tf-checkbox[normalize-space(.)="' + treeName + '"]/*[contains(@class, "checkbox")]' + '/ancestor::*/following-sibling::*//*[@data-qa-class and normalize-space(.)="' + elementName + '"]' + '//*[contains(@class, "checkbox")]';
  } else {
    xpathCheckbox += '//*[normalize-space(text())="' + treeName + '"]/ancestor::tf-checkbox/*[contains(@class, "checkbox")]';
  }

  return element(by.xpath(xpathCheckbox));
};

/********************************************************************************************************************/
/* Function: getAllShiftPointCheckboxes                                                                             */
/* Description: This function is used to get references of all checkboxes of tree if specified. Otherwise, gets     */
/*              references of all checkboxes from the Shift Point Options Box.                                      */
/*                                                                                                                  */
/* Params: 1. treeName (optional) -> Name of the tree.                                                              */
/*            Ex: 'Include All'                                                                                     */
/*                                                                                                                  */
/* Return: Returns an array of references of checkboxes from Shift Point Options Box.                               */
/********************************************************************************************************************/
DocumentOptionsFixedIncomeAttribution.prototype.getAllShiftPointCheckboxes = function(treeName) {
  var xpathCheckBoxes = '//*[@data-qa-class="checkbox-tree"]';

  // Verify if 'treeName' is defined.
  if (treeName !== undefined && treeName !== '') {
    xpathCheckBoxes += '//*[normalize-space(text())="' + treeName + '"]/ancestor::*[@data-qa-id="label-fi-attr-include-all"]/following-sibling::tf-checklist-children//tf-checkbox';
  }

  return element.all(by.xpath(xpathCheckBoxes));
};

/********************************************************************************************************************/
/* Function: getAllShiftPointElements                                                                               */
/* Description: This function is used to get the references of all elements in tree if specified. Otherwise, gets   */
/*              references of all elements from Shift Point Options Box.                                            */
/*                                                                                                                  */
/* Params: 1. treeName (optional) -> Name of the tree.                                                              */
/*            Ex: 'Include All'                                                                                     */
/*                                                                                                                  */
/* Return: Returns an array of references of elements of specific tree or references of all elements from Shift     */
/*         Point Options Box.                                                                                       */
/********************************************************************************************************************/
DocumentOptionsFixedIncomeAttribution.prototype.getAllShiftPointElements = function(treeName) {
  var xpathElements = '//*[@data-qa-class="checkbox-tree"]';

  // Verify if 'treeName' is defined.
  if (treeName !== undefined && treeName !== '') {
    xpathElements += '//*[normalize-space(text())="' + treeName + '"]/ancestor::*//*[@data-qa-class="checkbox-item" and @ng-repeat]';
  }

  xpathElements += '//*[normalize-space(text())]';

  return element.all(by.xpath(xpathElements));
};

/********************************************************************************************************************/
/* Function: getDropDownItem                                                                                        */
/* Description: This function is used to get reference of drop down item.                                           */
/*                                                                                                                  */
/* Params: 1. optionName -> Name of the item from drop down.                                                        */
/*            Ex: 'Tenor'                                                                                           */
/*                                                                                                                  */
/* Return: Returns the reference of the item from drop down.                                                        */
/********************************************************************************************************************/
DocumentOptionsFixedIncomeAttribution.prototype.getDropDownItem = function(optionName) {
  return element(by.xpath('//tf-dropdown//*[@data-qa-class="dropdown-option" and normalize-space(.)="' + optionName + '"]'));
};

/********************************************************************************************************************/
/* Function: getRadioButton                                                                                         */
/* Description: This function is used to get the reference of the radio button from Shift Point Options box.        */
/*                                                                                                                  */
/* Params: 1. radioButtonName -> Name of the radio button.                                                          */
/*            Ex: 'Port. Effective Duration'                                                                        */
/*                                                                                                                  */
/* Return: Returns the reference of the radio button from the Shift Point Options Box.                              */
/********************************************************************************************************************/
DocumentOptionsFixedIncomeAttribution.prototype.getRadioButton = function(radioButtonName) {
  return element(by.xpath('//*[@class="fi-attribution-radio"]/*[normalize-space(.)="' + radioButtonName + '"]' + '/*[@data-qa-class="radio-button"]/tf-radio-control'));
};

/********************************************************************************************************************/
/* Function: getAllRadioButtonLabels                                                                                */
/* Description: This function is used to get references of all radio button labels from Shift Point Options box.    */
/*                                                                                                                  */
/* Return: Returns an array of references of the radio button labels.                                               */
/********************************************************************************************************************/
DocumentOptionsFixedIncomeAttribution.prototype.getAllRadioButtonLabels = function() {
  return element.all(by.xpath('//*[@class="fi-attribution-radio"]/*[@data-qa-class="label"]'));
};

module.exports = new DocumentOptionsFixedIncomeAttribution();
