'use strict';

var TileOptionsRiskOtherOptions = function() {
  this.xpathDatePickerButton = '//*[@data-qa-id="date-picker-risk-adv-replacingText"]//span[@tf-button][contains(@class,"tf-datepicker-button")]';
  this.xpathDropdownButton = '//*[@data-qa-id="date-picker-risk-adv-replacingText"]//span[@tf-button][contains(@class,"toggle")]';
};

/********************************************************************************************/
/* Function: getDatePickerTextbox                                                           */
/* Description: This function returns the reference of "DatePicker Textbox".                */
/* Return: Promise which resolves to reference of "DatePicker Textbox".                     */
/********************************************************************************************/
TileOptionsRiskOtherOptions.prototype.getDatePickerTextbox = function(textboxName) {
  var xpathtextbox = '//*[@data-qa-id="date-picker-risk-adv-' + textboxName.toLowerCase().replace(/\s/g, '-') + '"]' +
    '//tf-textbox[contains(@class,"tf-datepicker-textbox")]';

  return element(by.xpath(xpathtextbox));
};

/********************************************************************************************/
/* Function: getDropdownItem                                                                */
/* Description: This function returns the reference of dropdown item when the dropdown is   */
/*               open and name of the item is provided.                                     */
/* Param: itemName -> Name of the item whose reference is required.                         */
/* Return: Promise which resolves to reference of item from dropdown.                       */
/********************************************************************************************/
TileOptionsRiskOtherOptions.prototype.getDropdownItem = function(itemName) {
  var xpathtextbox = '//tf-dropdown//tf-dropdown-select-item[normalize-space(.)="' + itemName + '"]';

  return element(by.xpath(xpathtextbox));
};

module.exports = new TileOptionsRiskOtherOptions();
