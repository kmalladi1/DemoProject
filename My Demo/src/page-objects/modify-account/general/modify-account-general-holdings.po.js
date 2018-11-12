'use strict';

var ModifyAccountGeneralHoldings = function() {
  this.xpathTextbox = '//*[normalize-space(.)="replacingText"]/parent::tf-form-vertical-item//tf-textbox';
};

/****************************************************************************************/
/* Function: getInputField                                                              */
/* Description: This function is used to get the reference of input field from          */
/*              General->Basics.                                                        */
/* Params: 1. inputFieldName -> Name of the input field.                                */
/* Return: Returns the reference of the input field.                                    */
/****************************************************************************************/
ModifyAccountGeneralHoldings.prototype.getInputField = function(fieldName) {
  var xpathName = '//*[@data-qa-id="modify-account-new-options-container"]//*[normalize-space(.)="' + fieldName + '"]' +
    '//ancestor::tf-form-vertical-item//tf-textbox//input';
  return element(by.xpath(xpathName));
};

module.exports = new ModifyAccountGeneralHoldings();
