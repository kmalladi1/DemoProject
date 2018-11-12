'use strict';

var ModifyAccountClientContacts = function() {
};

/****************************************************************************************/
/* Function: getListboxItem                                                             */
/* Description: This function is used to get reference of particular items from         */
/*              "Available/Selected" section.                                           */
/* Param: itemName -> Name of the item whose reference is required.                     */
/*        sectionName -> Name of the section from which item reference is required.     */
/* Return: Returns the reference of particular item from "Available/Selected" container.*/
/****************************************************************************************/
ModifyAccountClientContacts.prototype.getListboxItem = function(sectionName, itemName) {
  var xpathItem = '//tf-listbox[contains(@ng-model,"' + sectionName.toLowerCase() + '")]' +
    '/tf-listbox-item[normalize-space(.)="' + itemName + '"]';
  return element(by.xpath(xpathItem));
};

/************************************************************************************************************/
/* Function: getArrowButton                                                                                 */
/* Description: This function is used to get the reference of particular button reference.                  */
/* Param: iconName -> Name of the button whose reference is required.                                       */
/*                    Ex: Right,Left                                                                        */
/* Return: Returns the reference of particular button.                                                      */
/************************************************************************************************************/
ModifyAccountClientContacts.prototype.getArrowButton = function(buttonName) {
  var xpath = '//tf-transferbox//tf-transferbox-transfer-buttons/tf-button[contains(@icon,"' + buttonName.toLowerCase() + '")]';
  return element(by.xpath(xpath));
};

/****************************************************************************************/
/* Function: getRemoveOrOptionIcon                                                      */
/* Description: This function is used to get the reference of remove or option icon.    */
/* Params: 1. sectionName -> Name of the section whose reference is required.           */
/*                                 Ex: Available/Selected                               */
/*          2. itemName -> Name of the item from which icon is required.                */
/*                          Ex: Automated                                               */
/*         3. iconName -> Type of the icon whose reference is required.                 */
/*                                 Ex: Remove, Option                                   */
/* Returns: Returns the reference of remove or option icon.                             */
/****************************************************************************************/
ModifyAccountClientContacts.prototype.getRemoveOrOptionIcon = function(sectionName, itemName, iconName) {
  var xpath = '//tf-listbox[contains(@ng-model,"' + sectionName.toLowerCase() + '")]/tf-listbox-item' +
    '[normalize-space(.)="' + itemName + '"]//tf-icon[contains(@type,"' + iconName.toLowerCase() + '")]';
  return element(by.xpath(xpath));
};

/************************************************************************************************/
/* Function: getTextbox                                                                         */
/* Description: This function is used to get text box from dropdown.                            */
/*Param: textboxName -> Name of the text box whose reference is required.                       */
/*                      Ex: Name, Phone Number                                                  */
/* Return: Returns reference of text box from dropdown.                                         */
/************************************************************************************************/
ModifyAccountClientContacts.prototype.getTextbox = function(textboxName) {
  return element(by.xpath('//tf-dropdown//*[normalize-space(.)="' + textboxName + '"]//tf-textbox/input'));
};

/****************************************************************************************/
/* Function: getOkOrCancelButtonFromDropdown                                            */
/* Description: This function is used to get the reference of OK or Cancel button from  */
/*              Dropdown.                                                               */
/* Params: 1. buttonName -> Name of the button whose reference is required.             */
/*                                 Ex: OK/Cancel                                        */
/* Returns: Returns the reference of OK or Cancel button.                             */
/****************************************************************************************/
ModifyAccountClientContacts.prototype.getOkOrCancelButtonFromDropdown = function(buttonName) {
  var xpath = '//tf-dropdown//tf-button[normalize-space(.)="' + buttonName + '"]';
  return element(by.xpath(xpath));
};

module.exports = new ModifyAccountClientContacts();
