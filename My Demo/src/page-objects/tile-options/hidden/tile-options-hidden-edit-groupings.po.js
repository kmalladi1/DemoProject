'use strict';

var TileOptionsHiddenEditGroupings = function() {
  this.xpathEditGroupings = '//*[@id="edit-exclusions-grouping"]';
  this.xpathAvailableContainer = '//tf-transferbox-source-list//tf-listbox';
  this.xpathSelectedContainer = '//tf-transferbox-target-list//tf-listbox';
};

/****************************************************************************************/
/* Function: getPill                                                                    */
/* Description: This function is used to get reference of pill from "Edit Groupings"    */
/*              window.                                                                 */
/* Params: pillName -> Name of the pill whose reference is required.                    */
/*         Ex: "Add / Remove" or "Options".                                             */
/* Return: Returns the reference of pill from "Edit Groupings" window.                  */
/****************************************************************************************/
TileOptionsHiddenEditGroupings.prototype.getPill = function(pillName) {
  var xpathPill = this.xpathEditGroupings + '//*[@data-qa-id=' +
    '"groupings-' + pillName.toLowerCase().replace(/ /g, '').replace(/\//g, '-') + '-pill"]';
  return element(by.xpath(xpathPill));
};

/****************************************************************************************/
/* Function: getDialogName                                                              */
/* Description: This function is used to get name of the dialog box in which            */
/*              "Edit Groupings" window is present.                                     */
/* Return: Returns the promise which resolves to the name of the dialog box.            */
/****************************************************************************************/
TileOptionsHiddenEditGroupings.prototype.getDialogName = function() {
  var xpathDialogName = this.xpathEditGroupings + '/ancestor::*[@role="dialog"]' +
    '//span[contains(@class, "dialog-title")]';
  return element(by.xpath(xpathDialogName)).getText();
};

/****************************************************************************************/
/* Function: getButton                                                                  */
/* Description: This function is used to get reference of "Save" or "Cancel" button     */
/*              reference.                                                              */
/* Params: btnName -> Name of the button whose reference is required.                   */
/*         Ex: "Save" or "Cancel".                                                      */
/* Return: Returns the reference of button from "Edit Groupings" window.                */
/****************************************************************************************/
TileOptionsHiddenEditGroupings.prototype.getButton = function(btnName) {
  var xpathButton = this.xpathEditGroupings + '/ancestor::*[@role="dialog"]/descendant::button[.="' + btnName + '"]';
  return element(by.xpath(xpathButton));
};

module.exports = new TileOptionsHiddenEditGroupings();
