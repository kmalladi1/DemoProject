'use strict';

var DocumentOptionsDates = function() {
  this.xpathCalenderDropDown = '//*[@data-qa-id="dropdown-dates-calendar-select-id"]//tf-dropdown-select';
  this.xpathFiscalYearEndMonthDropDown = '//tf-dropdown-select[@data-qa-id="dropdown-dates-fiscal-year-end-month"]';
  this.xpathDateFormatDropDown = '//tf-dropdown-select[@data-qa-id="dropdown-date-format"]';
  this.xpathHoldingsAsOfDropDown = '//tf-dropdown-select[@data-qa-id="dropdown-holdings-as-of"]';
  this.xpathCalculationFrequencyDropDown = '//tf-dropdown-select[@data-qa-id="dropdown-dates-calculation-frequency"]';
  this.xpathCheckBox = '//*[@data-qa-id="options-container" and not(contains(@class, "ng-hide"))]' +
    '//tf-checkbox[normalize-space(.)="replacingText"]';
  this.xpathOfCalenderDropDown = '//*[@data-qa-id="dropdown-dates-calendar-select-id"]//tf-dropdown-select';
  this.xpathOfFiscalYearEndMonthDropDown = '//*[@data-qa-id="dropdown-dates-fiscal-year-end-month"]';
  this.xpathOfDropdowns = '//tf-dropdown-select[preceding-sibling::*[normalize-space(.)="replacingText"]][1]';
  this.xpathOfCheckboxes = '//tf-checkbox[normalize-space(.)="replacingText"][1]';
};

/************************************************************************************************************/
/* Function: getCalenderDropDown                                                                            */
/* Description: This function is used to get reference of 'Calender' dropdown.                              */
/************************************************************************************************************/
DocumentOptionsDates.prototype.getCalenderDropDown = function() {
  return element(by.xpath('//*[@data-qa-id="dropdown-dates-calendar-select-id"]//tf-button'));
};

/************************************************************************************************************/
/* Function: getFiscalYearEndMonthDropDown                                                                  */
/* Description: This function is used to get reference of 'Fiscal Year End Month' dropdown.                 */
/************************************************************************************************************/
DocumentOptionsDates.prototype.getFiscalYearEndMonthDropDown = function() {
  return element(by.xpath('//*[@data-qa-id="dropdown-dates-fiscal-year-end-month"]//tf-button'));
};

/************************************************************************************************************/
/* Function: getDropDownItem                                                                                */
/* Description: This function is used to get reference of a dropdown item from 'Document Options' dialog.   */
/*                                                                                                          */
/* Params: 1. item -> Dropdown item of which reference is needed.                                           */
/*                                 Ex: Seven Day                                                            */
/* Return: Returns the reference of passed element.                                                         */
/************************************************************************************************************/
DocumentOptionsDates.prototype.getDropDownItem = function(item) {
  return element(by.xpath('//tf-dropdown//*[@ng-repeat and normalize-space(.)="' + item + '"]'));
};

/************************************************************************************************************/
/* Function: getRestoreDefaultsButton                                                                       */
/* Description: This function is used to get reference of 'Restore Defaults' button.                        */
/************************************************************************************************************/
DocumentOptionsDates.prototype.getRestoreDefaultsButton = function() {
  return element(by.xpath('//*[@data-qa-class="button-restore-defaults"]//button'));
};

/************************************************************************************************************/
/* Function: getDefaultsApplied                                                                             */
/* Description: This function is used to get reference of 'Defaults Applied' note.                          */
/************************************************************************************************************/
DocumentOptionsDates.prototype.getDefaultsApplied = function() {
  return element(by.xpath('//*[@id="dates-opts-doc-tab"]//*[normalize-space(.)="Defaults Applied"]/i/..'));
};

/************************************************************************************************************/
/* Function: getCheckBox                                                                                    */
/* Description: This function is used to get reference of 'Defaults Applied' note.                          */
/* Params: 1) checkBoxName: name of the check box to get the reference of                                   */
/************************************************************************************************************/
DocumentOptionsDates.prototype.getCheckBox = function(checkBoxName) {
  return element(by.xpath('//*[@data-qa-class="checkbox" ' +
    'and descendant::*[normalize-space(.)="' + checkBoxName + '"]]/tf-checkbox-control'));
};

/************************************************************************************************************/
/* Function: getDropDown                                                                                    */
/* Description: This function is used to get reference of dropdown from Dates tab.                          */
/* Params: 1) dropDownName -> Name of the drop down.                                                        */
/*                            Ex: 'Calendar' or 'Date Format'                                               */
/* Return: Returns the reference of the specific dropdown.                                                  */
/************************************************************************************************************/
DocumentOptionsDates.prototype.getDropDown = function(dropDownName, isOpened) {
  var xpathDropdown;
  dropDownName = dropDownName.toLowerCase();

  // Verifying the drop down name.
  xpathDropdown = '//*[contains(@data-qa-id,"dropdown") and contains(@data-qa-id,"' + dropDownName.replace(/[\s;]/g, '-') +
    '")]//tf-button';

  if (isOpened === true) {
    xpathDropdown = '//*[contains(@data-qa-id,"dropdown") and contains(@data-qa-id,"' + dropDownName.replace(/[\s;]/g, '-') +
      '")]//tf-button[contains(@class, "active")]';
  }

  return element(by.xpath(xpathDropdown));
};

/************************************************************************************************************/
/* Function: getAllDropDownItems                                                                            */
/* Description: This function is used to get all dropdown items references from Dates tab.                  */
/* Return: Returns an of dropdown items references from the specific dropdown.                              */
/************************************************************************************************************/
DocumentOptionsDates.prototype.getAllDropDownItems = function() {
  return element.all(by.xpath('//tf-dropdown//*[@data-qa-class="dropdown-menu-item"]'));
};

module.exports = new DocumentOptionsDates();
