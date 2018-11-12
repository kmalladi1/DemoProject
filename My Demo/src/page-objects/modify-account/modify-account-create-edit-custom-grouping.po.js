'use strict';

var ModifyAccountCreateEditCustomGrouping = function() {
  this.xpathNewReference = '//*[@id="pa-grp-new-ref-dlg"]';
  this.xpathLoadingBox = '//*[@class="tf-alert-loading"]';
};

/**********************************************************************************************/
/* Function: getCreateEditCustomGroupingDialog                                                */
/* Description: This function is used get the reference of Create/Edit Cutom Grouping Dialog. */
/**********************************************************************************************/
ModifyAccountCreateEditCustomGrouping.prototype.getCreateEditCustomGroupingDialog = function() {
  var xpathPill = '//*[@id="pa-grp-new-ref-dlg"]//*[@class="hr-header-left"]' +
    '//*[normalize-space(.)="Create / Edit Custom Grouping"]';
  return element(by.xpath(xpathPill));
};

/****************************************************************************************/
/* Function: getNameField                                                               */
/* Description: This function is used to get the reference of the Name field.           */
/* Return: Returns the reference of the Name field.                                     */
/****************************************************************************************/
ModifyAccountCreateEditCustomGrouping.prototype.getNameField = function() {
  var xpath = this.xpathNewReference + '//*[@data-qa-id="name-input-box"]/input';
  return element(by.xpath(xpath));
};

/************************************************************************************************************/
/* Function: getButtonFromRHP                                                                                */
/* Description: This function is used to get reference of SaveAs button.                                    */
/* Params: buttonName -> Name of the button. Ex-> Save,SaveAs,Cancel                                        */
/* Return: Returns the reference of required radio button.                                                  */
/************************************************************************************************************/
ModifyAccountCreateEditCustomGrouping.prototype.getButtonFromRHP = function(btnName) {
  var xpathButton = this.xpathNewReference + '/ancestor::*[@role="dialog"]//*[@class="tf-button-content"]' +
    '//*[normalize-space(.)="' + btnName + '"]';
  return element(by.xpath(xpathButton));
};

/****************************************************************************************/
/* Function: getLoadingBox                                                              */
/* Description: This function is used to get the reference of the loading box.          */
/* Return: Returns the reference of the loading box.                                    */
/****************************************************************************************/
ModifyAccountCreateEditCustomGrouping.prototype.getLoadingBox = function(comment) {
  var xpathLoadingIcon = this.xpathLoadingBox + '//*[normalize-space(.)= "' + comment + '"]';
  return element(by.xpath(xpathLoadingIcon));
};

module.exports = new ModifyAccountCreateEditCustomGrouping();
