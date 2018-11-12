'use strict';

var ModifyAccountGeneralAddtionalOptions = function() {
  this.xpathAvailableContainer = '//*[@data-qa-id="additional-options-available-tree"]';
  this.xpathSelectedContainer = '//*[@data-qa-id="additional-options-selected-tree"]';

};

/************************************************************************************************************/
/* Function: getCheckBox                                                                                    */
/* Description: This function is used to get reference of checkbox from General->Additional options.        */
/* Params: checkBoxName -> Name of the check box whose reference is required.                               */
/* Return: Promise which resolves to the reference of checkbox.                                             */
/************************************************************************************************************/
ModifyAccountGeneralAddtionalOptions.prototype.getCheckBox = function(checkBoxName) {
  var xpathCheckbox;
  if (checkBoxName.toLowerCase() === 'exclude from security exposures') {
    xpathCheckbox = '//*[@data-qa-id="exclude-from-security-exposures-checkbox"]/tf-checkbox-control';
  } else {
    xpathCheckbox = '//tf-checkbox[normalize-space(.)="' + checkBoxName + '"]/tf-checkbox-control';
  }

  return element(by.xpath(xpathCheckbox));
};

/****************************************************************************************/
/* Function: getDropDown                                                                */
/* Description: This function is used to get the reference of drop down field from      */
/*              General->Additional Options.                                            */
/* Params: 1. dropDownName -> Name of the Drop Down.                                    */
/* Return: Returns the reference of the drop down.                                      */
/****************************************************************************************/
ModifyAccountGeneralAddtionalOptions.prototype.getDropDown = function(dropDownName) {
  var xpathName = '//*[@data-qa-id="' + dropDownName.toLowerCase().replace(/\s/g, '-') + '-dropdown"]/tf-button';
  return element(by.xpath(xpathName));
};

/****************************************************************************************/
/* Function: getNumberInputbox                                                          */
/* Description: This function is used to get the reference of number input box from     */
/*              General->Additional options.                                            */
/* Params: 1. textboxName -> Name of the number input box.                              */
/* Return: Returns the reference of the number input box.                               */
/****************************************************************************************/
ModifyAccountGeneralAddtionalOptions.prototype.getNumberInputbox = function(boxName) {
  var xpathName;
  if (boxName.toLowerCase() === '12b-1 fee') {
    xpathName = '//*[@data-qa-id="12b-1-fee-input-box"]//input';
  } else {
    xpathName = '//*[@data-qa-id="' + boxName.toLowerCase().replace(/\s/g, '-') + '-input-box"]//input';
  }

  return element(by.xpath(xpathName));
};

/****************************************************************************************/
/* Function: getTextBox                                                                 */
/* Description: This function is used to get the reference of textbox from              */
/*              General->Additional options.                                            */
/* Params: 1. textboxName -> Name of the textbox.                                       */
/* Return: Returns the reference of the textbox.                                        */
/****************************************************************************************/
ModifyAccountGeneralAddtionalOptions.prototype.getTextBox = function(textboxName) {
  var xpathName = '//tf-form-vertical-item[normalize-space(.)="' + textboxName + '"]//input';
  return element(by.xpath(xpathName));
};

/****************************************************************************************/
/* Function: getDropDownOption                                                          */
/* Description: This function is used to get the reference of options from drop down    */
/*              field from General->Additional Options.                                 */
/* Params: 1. option -> Name of the option from drop down.                              */
/* Return: Returns the reference of the option from drop down.                          */
/****************************************************************************************/
ModifyAccountGeneralAddtionalOptions.prototype.getDropDownOption = function(option) {
  var xpathName = '//*[@data-qa-class="dropdown-option"][normalize-space(.)="' + option + '"]';
  return element(by.xpath(xpathName));
};

/****************************************************************************************/
/* Function: getButtonFromUserDefinedSection                                            */
/* Description: This function is used to get the reference of buttons from User Defined */
/*              values Available section.                                               */
/* Params: 1. buttonName -> Name of the button.                                         */
/* Return: Returns the reference of the button from available section.                  */
/****************************************************************************************/
ModifyAccountGeneralAddtionalOptions.prototype.getButtonFromUserDefinedSection = function(buttonName) {
  var xpathName = '//*[@data-qa-id="additional-options-transfer-section"]';
  if (buttonName.toLowerCase() === 'add') {
    xpathName += '//*[@data-qa-id="add-new-constiable-button"]';
  } else {
    xpathName += '//*[@data-qa-id="add-new-group-button"]';
  }

  return element(by.xpath(xpathName));
};

/****************************************************************************************/
/* Function: getTextboxFromDropDown                                                     */
/* Description: This function is used to get the reference of textbox from              */
/*              Drop down.                                                              */
/*Param: textboxName -> Name of the textbox whose reference is required.                */
/*                      Ex: Field, Group                                                */
/* Return: Returns the reference of the textbox from dropdown.                          */
/****************************************************************************************/
ModifyAccountGeneralAddtionalOptions.prototype.getTextboxFromDropDown = function(textboxName) {
  var xpathName = '//tf-dropdown//*[normalize-space(.)="' + textboxName + '"]//input';
  return element(by.xpath(xpathName));
};

/****************************************************************************************/
/* Function: getOkOrCancelButtonFromDropDown                                            */
/* Description: This function is used to get the reference of buttons from drop down    */
/*              values Available section.                                               */
/* Params: 1. buttonName -> Name of the button.                                         */
/* Return: Returns the reference of the button from drop down.                          */
/****************************************************************************************/
ModifyAccountGeneralAddtionalOptions.prototype.getOkOrCancelButtonFromDropDown = function(buttonName) {
  var xpathName = '//tf-dropdown//tf-button[normalize-space(.)="' + buttonName + '"]';
  return element(by.xpath(xpathName));
};

/****************************************************************************************/
/* Function: getIconFromList                                                            */
/* Description: This function is used to get the reference of specified icon from       */
/*              specified list element.                                                 */
/* Params: 1. elementName -> Name of the element ftom which icon reference is required. */
/*                          Ex: ADF                                                     */
/*         2.  iconName -> Name of the icon whose reference is required.                */
/*                         Ex: option, remove                                           */
/*         3. sectionName -> Name of the section from which element is required.        */
/*                          Ex: Available, Selected                                     */
/* Return: Returns the reference of the icon from list element.                         */
/****************************************************************************************/
ModifyAccountGeneralAddtionalOptions.prototype.getIconFromList = function(iconName, elementName, sectionName) {
  var xpathName;
  if (sectionName.toLowerCase() === 'available') {
    xpathName = this.xpathAvailableContainer +
      '//tf-listbox-item-handle[normalize-space(.)="' + elementName + '"]//tf-icon[contains(@type,"' + iconName.toLowerCase() + '")]';
  } else if (sectionName.toLowerCase() === 'selected') {
    xpathName = this.xpathSelectedContainer +
      '//tf-listbox-item-handle[normalize-space(.)="' + elementName + '"]//tf-icon[contains(@type,"remove")]';
  }

  return element(by.xpath(xpathName));
};

/****************************************************************************************/
/* Function: getElementFromList                                                         */
/* Description: This function is used to get the reference of tree item from "Available"*/
/*              or "Selected" section.                                                  */
/* Params: 1. section -> Name of the section.                                           */
/*            item -> Name of the item.                                                 */
/* Return: Returns the reference of the tree item.                                      */
/****************************************************************************************/
ModifyAccountGeneralAddtionalOptions.prototype.getElementFromList = function(section, item) {
  var xpathName;
  if (section.toLowerCase() === 'available') {
    xpathName = this.xpathAvailableContainer + '//tf-listbox-item' +
      '//*[contains(@class,"tf-selectable-handle")][normalize-space(.)="' + item + '"]';
  } else {
    xpathName = this.xpathSelectedContainer + '//tf-listbox-item' +
      '//*[contains(@class,"tf-selectable-handle")][normalize-space(.)="' + item + '"]';
  }

  return element(by.xpath(xpathName));
};

/****************************************************************************************/
/* Function: getRenameBox                                                               */
/* Description: This function is used to get the reference of the rename textbox from   */
/*              "Available" section list item.                                          */
/* Params: 1.  item -> Name of the item from which rename box is required.              */
/*                     Ex: Default Group, PD                                            */
/* Return: Returns the reference of the  rename box from list item.                     */
/****************************************************************************************/
ModifyAccountGeneralAddtionalOptions.prototype.getRenameBox = function(item) {
  var xpathName = this.xpathAvailableContainer +
    '//*[@data-qa-class="available-tree-item"][normalize-space(.)="' + item + '"]//tf-textbox/input';
  return element(by.xpath(xpathName));
};

/*****************************************************************************************/
/* Function: getOptionFromTypeahead                                                      */
/* Description: This function is used to get the reference of textbox from Add Drop down.*/
/* Params: 1. textboxName -> Name of the textbox.                                        */
/* Return: Returns the reference of the textbox.                                         */
/*****************************************************************************************/
ModifyAccountGeneralAddtionalOptions.prototype.getOptionFromTypeahead = function(value) {
  var xpathName = '//tf-typeahead-items//tf-typeahead-emphasis[normalize-space(.)="' + value + '"]';
  return element(by.xpath(xpathName));
};

/************************************************************************************************************/
/* Function: getRadioButtonFromAddDropDown                                                                  */
/* Description: This function is used to get reference of radio button from Add Drop Down.                  */
/* Params: radioName -> Name of the radio button whose reference is required.                               */
/*                      Ex: Numeric, Text                                                                   */
/* Return: Reference of radio button.                                                                       */
/************************************************************************************************************/
ModifyAccountGeneralAddtionalOptions.prototype.getRadioButtonFromAddDropDown = function(radioName) {
  var xpathRadio = '//*[@data-qa-id="' + radioName.toLowerCase() + '-radio-button"]/tf-radio-control';
  return element(by.xpath(xpathRadio));
};

/************************************************************************************************************/
/* Function: getExpandIconFromList                                                                          */
/* Description: This function is used to get reference of expand tree icon from "available"                 */
/*              or "selected' section.                                                                      */
/* Params: 1. sectionName -> Name of the section from which element reference is required.                  */
/*         2. elementName -> Name of the element from which expand button reference is required.            */
/* Return: Returns reference of the expand icon.                                                            */
/************************************************************************************************************/
ModifyAccountGeneralAddtionalOptions.prototype.getExpandIconFromList = function(sectionName, elementName) {
  var xpathExpander = '//*[@data-qa-id="additional-options-' + sectionName.toLowerCase() + '-tree"]' +
    '//*[normalize-space(.)="' + elementName + '"]//tf-icon[not(contains(@class,"rename"))]';
  return element(by.xpath(xpathExpander));
};
/****************************************************************************************/
/* Function: getElementInsideTree                                                       */
/* Description: This function is used to get a particular element reference from the    */
/*               ListBox.                                                               */
/* Params: 1. parentElement -> Parent element in which required element is present.     */
/*                                 Ex: PD,Default Group                                 */
/*         2. elementName -> Name of the element you want to get the reference of.      */
/*                           Ex: NUMERIC_VALUE                                          */
/*         3. sectionName -> Name of the section from which element is required.        */
/*                           EX: Available/Selected                                     */
/* Return: Returns the reference of required element.                                   */
/****************************************************************************************/
ModifyAccountGeneralAddtionalOptions.prototype.getElementInsideTree = function(sectionName, parentElement, elementName, value) {
  if (sectionName.toLowerCase() === 'selected') {
    elementName = elementName + ':';
  }

  if (value !== undefined) {
    elementName = elementName + ' ' + value;
  }

  var xpathElement = '//tf-listbox[contains(@ng-model,"' + sectionName.toLowerCase() + '")]//tf-listbox-item//tf-listbox-item-handle' +
    '[normalize-space(.)="' + parentElement + '"]/following-sibling::*//tf-listbox-item//tf-listbox-item-handle' +
    '[normalize-space(.)="' + elementName + '"]';
  return element(by.xpath(xpathElement));
};

/****************************************************************************************/
/* Function: getArrowButton                                                             */
/* Description: This function is used to get reference of arrow buttons.                */
/* Params: 1. btnName -> The button for which reference is needed.                      */
/*                                 Ex: Right, left                                      */
/* Return: Return the reference of specified arrow button.                              */
/****************************************************************************************/
ModifyAccountGeneralAddtionalOptions.prototype.getArrowButton = function(btnName) {
  var xpathButton = '//tf-transferbox//tf-transferbox-transfer-buttons/tf-button[contains(@icon,"' + btnName.toLowerCase() + '")]';
  return element(by.xpath(xpathButton));
};

/************************************************************************************************/
/* Function: getErrorIcon                                                                       */
/* Description: This function is used to get the error icon from textbox.                       */
/*Param: textboxName -> Name of the text box from which error icon reference is required.       */
/*                      Ex: Value                                                               */
/* Return: Returns reference of the error icon from textbox.                                    */
/************************************************************************************************/
ModifyAccountGeneralAddtionalOptions.prototype.getErrorIcon = function(textboxName) {
  var xpath = '//tf-transferbox-options//tf-form-vertical-section//*[normalize-space(.)="' + textboxName + '"]' +
    '/parent::*//tf-number-input//tf-infobox-legacy[not(contains(@class,"ng-hide"))]//tf-icon';
  return element(by.xpath(xpath));
};

/************************************************************************************************/
/* Function: getTextFromErrorbox                                                                */
/* Description: This function is used to get the error icon from textbox.                       */
/*Param: textboxName -> Name of the text box from which error icon reference is required.       */
/*                      Ex: Value                                                               */
/* Return: Returns reference of the error icon from textbox.                                    */
/************************************************************************************************/
ModifyAccountGeneralAddtionalOptions.prototype.getErrorTextbox = function() {
  var xpath = '//tf-dropdown-legacy-content//tf-number-input-error/tf-textbox-error';
  return element(by.xpath(xpath));
};

/****************************************************************************************/
/* Function: getTextboxFromContentSection                                               */
/* Description: This function is used to get the reference of textbox from              */
/*              content section.                                                        */
/*Param: textboxName -> Name of the textbox whose reference is required.                */
/*                      Ex: Value                                                       */
/* Return: Returns the reference of the textbox from content section.                   */
/****************************************************************************************/
ModifyAccountGeneralAddtionalOptions.prototype.getTextboxFromContentSection = function(textboxName) {
  var xpathName = '//tf-transferbox-options//tf-form-vertical-section//*[normalize-space(.)="' + textboxName + '"]' +
    '/parent::*//tf-number-input//tf-textbox/input';
  return element(by.xpath(xpathName));
};

module.exports = new ModifyAccountGeneralAddtionalOptions();
