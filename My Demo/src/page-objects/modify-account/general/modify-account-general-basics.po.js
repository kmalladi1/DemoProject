'use strict';

var ModifyAccountGeneralBasics = function() {
  this.xpathTextbox = '//*[normalize-space(.)="replacingText"]/parent::tf-form-vertical-item//tf-textbox';
};

/****************************************************************************************/
/* Function: getInputField                                                              */
/* Description: This function is used to get the reference of input field from          */
/*              General->Basics.                                                        */
/* Params: 1. inputFieldName -> Name of the input field.                                */
/* Return: Returns the reference of the input field.                                    */
/****************************************************************************************/
ModifyAccountGeneralBasics.prototype.getInputField = function(fieldName) {
  var xpathName = '//*[@data-qa-id="modify-account-new-options-container"]//*[normalize-space(.)="' + fieldName + '"]' +
    '//ancestor::tf-form-vertical-item//tf-textbox//input';
  return element(by.xpath(xpathName));
};

/****************************************************************************************/
/* Function: getDropDown                                                                */
/* Description: This function is used to get the reference of drop down field from      */
/*              General->Basics.                                                        */
/* Params: 1. dropDownName -> Name of the Drop Down.                                    */
/* Return: Returns the reference of the drop down.                                      */
/****************************************************************************************/
ModifyAccountGeneralBasics.prototype.getDropDown = function(dropDownName) {
  var xpathName = '//*[@data-qa-id="' + dropDownName.toLowerCase().replace(/\s/g, '-') + '-dropdown"]/tf-button';
  return element(by.xpath(xpathName));
};

/****************************************************************************************/
/* Function: getElementFromDropDown                                                     */
/* Description: This function is used to get the reference of drop down field from      */
/*              General->Basics.                                                        */
/* Params: 1. eleName -> Name of the element required from Drop Down.                   */
/* Return: Returns the reference of element from drop down.                             */
/****************************************************************************************/
ModifyAccountGeneralBasics.prototype.getElementFromDropDown = function(eleName) {
  var xpathName = '//*[@data-qa-class="dropdown-option"][normalize-space(.)="' + eleName + '"]';
  return element(by.xpath(xpathName));
};

module.exports = new ModifyAccountGeneralBasics();
