'use strict';

var ModifyAccountPublisherDiscipline = function() {
};

/****************************************************************************************/
/* Function: getDropDown                                                                */
/* Description: This function is used to get the reference of drop down from            */
/*              Publisher->Discipline.                                                  */
/* Param: dropdownName -> Name of the drop down whose reference is required.            */
/*                        Ex: Size                                                      */
/* Return: Returns the reference of the drop down.                                      */
/****************************************************************************************/
ModifyAccountPublisherDiscipline.prototype.getDropDown = function(dropdownName) {
  var xpathName = '//*[normalize-space(.)="' + dropdownName + '"]/parent::*//tf-dropdown-select/tf-button';
  return element(by.xpath(xpathName));
};

/****************************************************************************************/
/* Function: getDropDownOption                                                          */
/* Description: This function is used to get the reference of options of drop down from */
/*               Publisher->Discipline.                                                 */
/* Param: optionName -> Name of the option whose reference is required.                 */
/*                      Ex: Larde-cap, Mid-cap                                          */
/* Return: Returns the reference of options from the drop down.                         */
/****************************************************************************************/
ModifyAccountPublisherDiscipline.prototype.getDropDownOption = function(optionName) {
  var xpathName = '//tf-dropdown//tf-dropdown-select-item[normalize-space(.)="' + optionName + '"]';
  return element(by.xpath(xpathName));
};

/************************************************************************************************/
/* Function: getTextbox                                                                         */
/* Description: This function is used to get reference of text box from Publisher->Discipline.  */
/* Param: textboxName -> Name of the text box whose reference is required.                      */
/*                       Ex: Style                                                              */
/* Return: the reference of specified text box.                                                 */
/************************************************************************************************/
ModifyAccountPublisherDiscipline.prototype.getTextbox = function(textboxName) {
  return element(by.xpath('//*[normalize-space(.)="' + textboxName + '"]/parent::tf-form-vertical-item//tf-textbox/input'));
};

/************************************************************************************************/
/* Function: getTextArea                                                                        */
/* Description: This function is used to get reference of text area from Publisher->Discipline. */
/* Param: textareaName -> Name of the textarea whose reference is required.                     */
/*                      Ex: Category, Investment Strategy                                       */
/* Return: Promise which resolves to reference of specified text area.                          */
/************************************************************************************************/
ModifyAccountPublisherDiscipline.prototype.getTextArea = function(textareaName) {
  return element(by.xpath('//*[normalize-space(.)="' + textareaName + '"]/parent::tf-form-vertical-item//textarea'));
};

/************************************************************************************************/
/* Function: getButtonFromGuidelineSection                                                      */
/* Description: This function is used to get reference of button from Guidelines section.       */
/* Param: buttonName -> Name of the button whose reference is required.                         */
/*                      Ex: add, up, down, remove                                               */
/* Return: Promise which resolves to reference of specified button.                             */
/************************************************************************************************/
ModifyAccountPublisherDiscipline.prototype.getButtonFromGuidelineSection = function(buttonName) {
  return element(by.xpath('//*[normalize-space(.)="Guidelines"]//tf-button[contains(@icon,"' + buttonName.toLowerCase() + '")]'));
};

/************************************************************************************************/
/* Function: getTextboxFromDropdown                                                             */
/* Description: This function is used to get reference of text box from dropdown.               */
/* Param: textareaName -> Name of the textarea whose reference is required.                     */
/*                      Ex: Guideline                                                           */
/* Return: The reference of text box from dropdown.                                             */
/************************************************************************************************/
ModifyAccountPublisherDiscipline.prototype.getTextboxFromDropdown = function(textboxName) {
  return element(by.xpath('//tf-dropdown//*[normalize-space(.)="' + textboxName + '"]//tf-textbox/input'));
};

/************************************************************************************************/
/* Function: getOkOrCancelButtonFromDropdown                                                    */
/* Description: This function is used to get reference of OK or Cancel button from dropdown.    */
/* Params: 1. buttonNmae ->Name of the button to be selected                                    */
/* Return: Promise which resolves to reference of particular button.                            */
/************************************************************************************************/
ModifyAccountPublisherDiscipline.prototype.getOkOrCancelButtonFromDropdown = function(buttonNmae) {
  return element(by.xpath('//tf-dropdown//tf-button[normalize-space(.)="' + buttonNmae + '"]'));
};

/****************************************************************************************/
/* Function: getAllListItem                                                             */
/* Description: This function is used to get reference of all the items from            */
/*              "Guidelines" container.                                                 */
/* Return: Returns the reference of all the item from "Guidelines" container.           */
/****************************************************************************************/
ModifyAccountPublisherDiscipline.prototype.getAllListItem = function() {
  var xpathItem = '//*[contains(@ng-model,"selectedIndex")]//tf-listbox-item';
  return element.all(by.xpath(xpathItem));
};

/****************************************************************************************/
/* Function: getAllListItem                                                             */
/* Description: This function is used to get reference of all the items from            */
/*              "Guidelines" container.                                                 */
/* Return: Returns the reference of all the item from "Guidelines" container.           */
/****************************************************************************************/
ModifyAccountPublisherDiscipline.prototype.getAllListItem = function() {
  var xpathItem = '//*[contains(@ng-model,"selectedIndex")]//tf-listbox-item';
  return element.all(by.xpath(xpathItem));
};

module.exports = new ModifyAccountPublisherDiscipline();
