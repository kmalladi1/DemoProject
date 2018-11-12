'use strict';

var ModifyAccountSpar = function() {
  this.xpathTextbox = '//*[contains(@data-qa-id, "replacingText")]';
};

/****************************************************************************************/
/* Function: getTextBox                                                                 */
/* Description: This function is used to get the reference of textbox from SPAR.        */
/* Params: 1. textboxName -> Name of the textbox whose reference is required.           */
/*                           EX:Peer Universe, Style Set                                */
/* Return: Returns the reference of the textbox.                                        */
/****************************************************************************************/
ModifyAccountSpar.prototype.getTextBox = function(textboxName) {
  var xpathName = '//tf-form-vertical-item[normalize-space(.)="' + textboxName + '"]//input';
  return element(by.xpath(xpathName));
};

module.exports = new ModifyAccountSpar();
