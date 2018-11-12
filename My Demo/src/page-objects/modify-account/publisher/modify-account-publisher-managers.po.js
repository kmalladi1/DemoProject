'use strict';

var ModifyAccountPublisherManagers = function() {
};

/****************************************************************************************/
/* Function: getListboxItem                                                             */
/* Description: This function is used to get reference of particular items from         */
/*              "Available/Selected" section.                                           */
/* Param: itemName -> Name of the item whose reference is required.                     */
/*        sectionName -> Name of the section from which item reference is required.     */
/* Return: Returns the reference of particular item from "Available/Selected" container.*/
/****************************************************************************************/
ModifyAccountPublisherManagers.prototype.getListboxItem = function(sectionName, itemName) {
  var xpathItem = '//tf-listbox[contains(@ng-model,"' + sectionName.toLowerCase() + '")]' +
    '/tf-listbox-item[normalize-space(.)="' + itemName + '"]';
  return element(by.xpath(xpathItem));
};

/************************************************************************************************/
/* Function: getTextboxFromContentSection                                                       */
/* Description: This function is used to get text box Content Section.                          */
/*Param: textboxName -> Name of the text box whose reference is required.                       */
/*                      Ex: Fund Tenure                                                         */
/* Return: Returns reference of text box from Content Section.                                  */
/************************************************************************************************/
ModifyAccountPublisherManagers.prototype.getTextboxFromContentSection = function(textboxName) {
  return element(by.xpath('//tf-transferbox-options-content//*[normalize-space(.)="' + textboxName + '"]/parent::*//tf-textbox/input'));
};

/************************************************************************************************/
/* Function: getErrorIcon                                                                       */
/* Description: This function is used to get the error icon from textbox.                       */
/*Param: textboxName -> Name of the text box from which error icon reference is required.       */
/*                      Ex: Fund Tenure                                                         */
/* Return: Returns reference of the error icon from textbox.                                    */
/************************************************************************************************/
ModifyAccountPublisherManagers.prototype.getErrorIcon = function(textboxName) {
  var xpath = '//tf-transferbox-options-content//*[normalize-space(.)="' + textboxName + '"]' +
    '/parent::*//tf-textbox-errors/tf-infobox-legacy[not(contains(@class,"ng-hide"))]//tf-icon';
  return element(by.xpath(xpath));
};

/************************************************************************************************/
/* Function: getCheckboxFromContentSection                                                      */
/* Description: This function is used to get reference of Checkbox.                             */
/* Param: checkboxName -> Name of the checkbox whose reference is required.                     */
/* Return: Returns the reference of Use Base Currency Checkbox.                                 */
/************************************************************************************************/
ModifyAccountPublisherManagers.prototype.getCheckboxFromContentSection = function(checkboxName) {
  return element(by.xpath('//tf-transferbox-options-content//tf-checkbox' +
    '[normalize-space(.)="' + checkboxName + '"]//tf-checkbox-control'));
};

module.exports = new ModifyAccountPublisherManagers();
