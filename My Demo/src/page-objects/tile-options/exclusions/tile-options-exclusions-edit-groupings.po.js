'use strict';

var TileOptionsExclusionsEditGroupings = function() {
  this.xpathEditGroupings = '//*[@id="edit-exclusions-grouping"]';
  this.xpathOfDialogTransferBox = '//tf-dialog//tf-transferbox';
  this.xpathEditGroupingsDialog = '//*[contains(@class,"dialog-title")][normalize-space(.)="Edit Groupings"]';
  this.xpathAvailableContainer = '//tf-transferbox-source-list//tf-listbox';
  this.xpathSelectedContainer = '//tf-transferbox-target-list//tf-listbox';
  this.xpathOfAvailableOrSelectedContainerItemsAndGroups = '//tf-dialog//*[@data-qa-id="groupings-add-remove-replacingText-section"]//tf-listbox[not(contains(@class, "hide"))]';
  this.xpathAvailableSectionSearchBox = '//tf-dialog//*[@data-qa-id="groupings-add-remove-available-search-box"]';
  this.xpathOfOptionsSelectedSection = '//*[@data-qa-id="selected-section"]//tf-listbox';
  this.xpathOfSelectHighLowColumnDropDown = '//tf-dialog//*[@data-qa-id="dropdown-hi-low-col"]';
  this.xpathOfSaveOrCancelButton = '//tf-dialog//tf-button[normalize-space(.)="replacingText"]';
};

/****************************************************************************************/
/* Function: getPill                                                                    */
/* Description: This function is used to get reference of pill from "Edit Groupings"    */
/*              window.                                                                 */
/* Params: pillName -> Name of the pill whose reference is required.                    */
/*         Ex: "Add / Remove" or "Options".                                             */
/* Return: Returns the reference of pill from "Edit Groupings" window.                  */
/****************************************************************************************/
TileOptionsExclusionsEditGroupings.prototype.getPill = function(pillName) {
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
TileOptionsExclusionsEditGroupings.prototype.getDialogName = function() {
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
TileOptionsExclusionsEditGroupings.prototype.getButton = function(btnName) {
  var xpathButton = this.xpathEditGroupings + '/ancestor::*[@role="dialog"]/descendant::button[.="' + btnName + '"]';
  return element(by.xpath(xpathButton));
};

/****************************************************************************************/
/* Function: getInfoBoxIconOfAnItemFromDialog                                           */
/* Description: This function is used to get reference of "info" icon of an Item        */
/*              reference.                                                              */
/* Params: containerName -> Name of the container.                                      */
/*         Ex: "Available" or "Selected".                                               */
/* Return: Returns the reference of icon from "Edit Groupings" window.                  */
/****************************************************************************************/
TileOptionsExclusionsEditGroupings.prototype.getInfoBoxIconOfAnItemFromDialog = function(containerName, itemName) {
  var xpathOfContainer = '//tf-dialog//*[@data-qa-id="groupings-add-remove-' + containerName.toLowerCase() + '-section"]';
  var xpathItem = xpathOfContainer + '//tf-listbox-item[normalize-space(.)="' + itemName + '"]//tf-icon[contains(@class,"tf-icon-info")]';
  return element(by.xpath(xpathItem));
};

module.exports = new TileOptionsExclusionsEditGroupings();
