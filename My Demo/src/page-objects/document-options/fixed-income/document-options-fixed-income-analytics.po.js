'use strict';

var DocumentOptionsFixedIncomeAnalytics = function() {
  this.xpathIncludeAllExpandButton = '//*[@data-qa-id="fi-partial-duration-section"]//*[@data-qa-id="label-include-all"]' +
    '//*[contains(@class, "icon-tree")]';
};

/************************************************************************************************************/
/* Function: getDropDown                                                                                    */
/* Description: This function is used to get reference of specified drop down.                              */
/* Params: ddName -> Name of the drop down whose reference is needed.                                       */
/* Return: Promise which resolves to the reference of required drop down.                                   */
/************************************************************************************************************/
DocumentOptionsFixedIncomeAnalytics.prototype.getDropDown = function(ddName) {
  // Variables(s)
  var xpathDropDown;
  var qaID;

  if (ddName === 'Mixed Currency Options' || ddName === 'Mixed Currency Options:') {
    qaID = 'dropdown-fi-analytics-mixed-currency-options';
  } else if (ddName === 'Analytics for Forwards' || ddName === 'Analytics for Forwards:') {
    qaID = 'dropdown-fi-analytics-for-forwards';
  } else if (ddName === 'Analytics for Cash' || ddName === 'Analytics for Cash:') {
    qaID = 'dropdown-fi-analytics-for-cash';
  } else if (ddName === 'Reference Curve' || ddName === 'Reference Curve:') {
    qaID = 'dropdown-fi-analytics-reference-curve';
  } else if (ddName === 'Analytics for Lot-Level Detail' || ddName === 'Analytics for Lot-Level Detail:') {
    qaID = 'dropdown-analytics-forwards';
  }

  xpathDropDown = '//*[@data-qa-id="' + qaID + '"]//tf-button';

  return element(by.xpath(xpathDropDown));
};

/***************************************************************************************************************/
/* Function: getDropDownItem                                                                                   */
/* Description: This function is used to get reference of option from drop down.                               */
/* Params: optionName -> Name of the option whose reference is needed.                                         */
/* Return: Promise which resolves to the reference of required option from drop down.                          */
/***************************************************************************************************************/
DocumentOptionsFixedIncomeAnalytics.prototype.getDropDownItem = function(optionName) {
  var xpathDropDownItem = '//tf-dropdown//*[@data-qa-class="dropdown-menu-item" and normalize-space(.)="' + optionName + '"]';
  return element(by.xpath(xpathDropDownItem));
};

/***************************************************************************************************************/
/* Function: getAllOptionsFromDropDown                                                                         */
/* Description: This function is used to get reference of all options from drop down.                          */
/* Return: Promise which resolves to array of references for options in drop down.                             */
/***************************************************************************************************************/
DocumentOptionsFixedIncomeAnalytics.prototype.getAllOptionsFromDropDown = function() {
  return element.all(by.xpath('//tf-dropdown//*[@data-qa-class="dropdown-menu-item"]'));
};

/************************************************************************************************************/
/* Function: getCheckBox                                                                                    */
/* Description: This function is used to get the reference of specified checkbox under a tree.              */
/* Params: checkBoxName -> Name of the checkbox Name to get reference.                                      */
/*         treeName -> Name of the parent option.                                                           */
/* Return: Promise which resolves to the reference of specified checkbox.                                   */
/************************************************************************************************************/
DocumentOptionsFixedIncomeAnalytics.prototype.getCheckBox = function(checkBoxName, treeName) {
  var xpathCheckBox = '//*[@data-qa-id="fi-partial-duration-section"]';

  if (treeName !== undefined) {
    xpathCheckBox += '//tf-checklist-group//tf-checkbox[normalize-space(.)="' + treeName + '"]/tf-checkbox-control' +
      '/ancestor::*/following-sibling::*//*[@data-qa-class and normalize-space(.)="' + checkBoxName + '"]' +
      '//tf-checkbox-control';
  } else {
    xpathCheckBox += '//*[normalize-space(text())="' + checkBoxName + '"]/ancestor::tf-checkbox/tf-checkbox-control';
  }

  return element(by.xpath(xpathCheckBox));
};

/************************************************************************************************************/
/* Function: getIncludeAllExpandButton                                                                      */
/* Description: This function is used to get reference of "Include All" expand button.                      */
/* Return: Promise which resolves to reference of "Include All" expand button                               */
/************************************************************************************************************/
DocumentOptionsFixedIncomeAnalytics.prototype.getIncludeAllExpandButton = function() {
  return element(by.xpath(this.xpathIncludeAllExpandButton));
};

/************************************************************************************************************/
/* Function: isTreeExpanded                                                                                 */
/* Description: This function is used to check if Tree is expanded.                                         */
/* Return: Promise which resolves to true if tree expanded                                                  */
/************************************************************************************************************/
DocumentOptionsFixedIncomeAnalytics.prototype.isTreeExpanded = function() {
  // Variable( s )
  var xpathIsExpandTree = this.xpathIncludeAllExpandButton + '[contains(@class, "open")]';
  return element(by.xpath(xpathIsExpandTree)).isPresent();
};

module.exports = new DocumentOptionsFixedIncomeAnalytics();
