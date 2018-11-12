'use strict';

var CreateEditCustomGroupings = function() {
  this.xpathNewReference = '//pa-tile-new-ref-form';
  this.xpathLoadingBox = '//*[@class="tf-alert-loading"]';
  this.xpathGroupingsDialog = '//*[contains(@class,"dialog-title")][normalize-space(.)="Groupings"]';
  this.xpathButtonFromDialog = '//tf-dialog//tf-button[normalize-space(.)="replacingText"]';
  this.xpathTextBoxFromCreateEditCustomLot = '//*[normalize-space(.)="replacingText"]//ancestor::tf-textbox';
  this.xpathOfFormulaTextArea = '//*[@data-qa-id="columns-list"]';
  this.xpathClick = '//tf-dialog//*[normalize-space(.)="Create / Edit Custom Grouping"]/*';
  this.xpathTextArea = '//*[@data-qa-id="fl-workspace-codemirror"]';
  this.xpathOfFormulaSectionDropdown = '//*[@data-qa-id="splash-page-tile"]//*[normalize-space(.)="replacingText"]';
  this.xpathOfTypeahead = '//*[@data-qa-class="fl-data-item"]//*[@data-qa-class="fl-data-item-detail"]//ancestor::tf-typeahead-2ditem-value';
  this.xpathOfArgumentsTile = '//*[@data-qa-id="tabbed-arguments-tile"]//tf-tabs';
  this.xpathOfTextBox = '//tf-tile//*[contains(.,"replacingText")]/tf-textbox';
  this.xpathOfTextboxDropdownButton = '//tf-tile//*[contains(.,"replacingText")]/tf-textbox//span[@tf-button]';
  this.xpathOfPanel = '//tf-dropdown//tf-panel';
  this.xpathOfPanelTextbox = '//tf-panel//tf-textbox';
  this.xpathOfOkOrCancelButton = '//tf-panel-footer//tf-button[normalize-space(.)="OK"]';
  this.xpathOfGroupInAvailableSection = '//*[@data-qa-id="fl-data-items-categories"]';
  this.xpathOfSelectedSectionItem = '//*[@data-qa-id="fl-data-items-list"]';
  this.xpathOfBrowseButton = '//*[@data-qa-class="btn-browse-formula"]';
  this.xpathNameFIeld = '//*[@data-qa-id="name-input-box"]';
};

/****************************************************************************************/
/* Function: getDialogName                                                              */
/* Description: This function is used to get name of the dialog box in which            */
/*              "New/Reference" window is present.                                      */
/* Return: Returns the promise which resolves to the name of the dialog box.            */
/****************************************************************************************/
CreateEditCustomGroupings.prototype.getDialogName = function() {
  var xpathDialogName = this.xpathNewReference + '/ancestor::*//*[@dialog-type="groupings"]//pa-tile-new-ref-form-title';
  return element(by.xpath(xpathDialogName)).getText();
};

/****************************************************************************************/
/* Function: getButton                                                                  */
/* Description: This function is used to get reference of "Save" or "Cancel" button     */
/*              reference.                                                              */
/* Params: btnName -> Name of the button whose reference is required.                   */
/*         Ex: "Save" or "Cancel".                                                      */
/* Return: Returns the reference of button from "New/Reference" window.                 */
/****************************************************************************************/
CreateEditCustomGroupings.prototype.getButton = function(btnName) {
  var xpathButton = this.xpathNewReference + '/ancestor::*/tf-dialog//tf-button[normalize-space(.)="' + btnName + '"]';
  return element(by.xpath(xpathButton));
};

/**
 * @function getDirectChildOfGroupInAvailableSection
 * @description This function is used to get reference of direct child element.
 * @param {string} groupName: Name of the parent.
 * @param {string} childName: Name of the child element.
 * @return Returns the reference of child element.
 */

CreateEditCustomGroupings.prototype.getDirectChildOfGroupInAvailableSection = function(groupName, childName) {

  var xpathOfParent = '//tf-listbox[contains(@class, "categoryTree")]//tf-listbox-item//*[contains(., "' + groupName + '")]';
  var xpathOfChild = xpathOfParent + '/parent::*//tf-listbox-item//*[contains(., "' + childName + '")]';
  return element.all(by.xpath(xpathOfChild));
};

/****************************************************************************************/
/* Function: getRadioButton                                                             */
/* Description: This function is used to get reference of radio button from the window. */
/* Params: btnName -> Name of the button whose reference is required.                   */
/*         Ex: "New", "Reference", "Client", "Personal" or "Super Client".              */
/* Return: Returns the reference of radio button from "New/Reference" window.           */
/****************************************************************************************/
CreateEditCustomGroupings.prototype.getRadioButton = function(btnName) {
  // Variable(s)
  var xpathRadioButton;

  if (btnName.toLowerCase() === 'new') {
    xpathRadioButton = this.xpathNewReference + '//*[@data-qa-id="new-radio-button"]/tf-radio-control';
  } else if (btnName.toLowerCase() === 'reference') {
    xpathRadioButton = this.xpathNewReference + '//*[normalize-space(.)="' + btnName + '"]/descendant::tf-radio-control';
  } else {
    xpathRadioButton = this.xpathNewReference + '//*[@data-qa-id="radio-button-' + btnName.toLowerCase().replace(/\s/g, '-') +
      '"]/tf-radio-control';
  }

  return element(by.xpath(xpathRadioButton));
};

/****************************************************************************************/
/* Function: getTab                                                                     */
/* Description: This function is used to get reference of tab from New/Reference window.*/
/* Params: tabName -> Name of the tab whose reference is required.                      */
/*         Ex: "Formula" or "Sort Formula"                                              */
/* Return: Returns the reference of tab from "New/Reference" window.                    */
/****************************************************************************************/
CreateEditCustomGroupings.prototype.getTab = function(tabName) {
  var xpathTab = this.xpathNewReference + '//*[@data-qa-id="' + tabName.toLowerCase().replace(/\s/g, '-') + '-tab"]';
  return element(by.xpath(xpathTab));
};

/****************************************************************************************/
/* Function: getTabTextArea                                                             */
/* Description: This function is used to get reference of text area reference of a      */
/*              particular tab.                                                         */
/* Return: Returns the reference of text area of specified tab from "New/Reference"     */
/*         window.                                                                      */
/****************************************************************************************/
CreateEditCustomGroupings.prototype.getTabTextArea = function() {
  // Variable(s)
  var xpathTextArea = '//*[@data-qa-id="fl-workspace-codemirror"]';
  return element(by.xpath(xpathTextArea));
};

/****************************************************************************************/
/* Function: getColumnFromFormulaTab                                                    */
/* Description: This function is used to get reference of specific column from the      */
/*              FORMULA tab.                                                            */
/* Params: colName -> Name of the column whose reference is needed.                     */
/* Return: Returns the reference of required column.                                    */
/****************************************************************************************/
CreateEditCustomGroupings.prototype.getColumnFromFormulaTab = function(colName) {
  var xpathColumn = '//*[@data-qa-id="columns-list"]//*[@data-qa-class="column-item" and normalize-space(.)="' + colName + '"]';
  return element(by.xpath(xpathColumn));
};

/****************************************************************************************/
/* Function: getNameField                                                               */
/* Description: This function is used to get reference of "Name" field.                 */
/* Return: Returns the reference of "Name" field from "New/Reference" window.           */
/****************************************************************************************/
CreateEditCustomGroupings.prototype.getNameField = function() {
  var xpathNameField = this.xpathNewReference + '//*[@data-qa-id="name-input-box"]//input';
  return element(by.xpath(xpathNameField));
};

/****************************************************************************************/
/* Function: getCheckbox                                                                */
/* Description: This function is used to get reference of checkbox from New/Reference   */
/*              mode.                                                                   */
/* Params: cbName ->  Name of the checkbox whose reference is needed.                   */
/*         Ex: "Allow Fractiling" or "Allow For Log Definition"                         */
/* Return: Returns the reference of required checkbox.                                  */
/****************************************************************************************/
CreateEditCustomGroupings.prototype.getCheckbox = function(cbName) {
  var xpathCheckbox = this.xpathNewReference + '//*[@data-qa-class="checkbox-' + cbName.toLowerCase().replace(/\s/g, '-') + '"]' +
    '/tf-checkbox-control';

  return element(by.xpath(xpathCheckbox));
};

/****************************************************************************************/
/* Function: getSubDirButton                                                            */
/* Description: This function is used to get reference "Sub-directory" drop down button.*/
/* Params: isOpened (optional) -> Boolean value, TRUE to verify if dropdown is opened.  */
/* Return: Returns the reference of drop down button.                                   */
/****************************************************************************************/
CreateEditCustomGroupings.prototype.getSubDirButton = function(isOpened) {
  var xpathButton = this.xpathNewReference + '//*[@data-qa-id="dropdown-sub-directory"]';

  if (isOpened === true) {
    xpathButton += '/ancestor::*/following-sibling::*[contains(@class, "dd-position") and not(contains(@class, "ng-hide"))]';
  }

  return element(by.xpath(xpathButton));
};

/****************************************************************************************/
/* Function: getOptionFromDropDown                                                      */
/* Description: This function is used to get reference of required option from the drop */
/*              down.                                                                   */
/* Params: optionName -> Name of the option whose reference is required.                */
/* Return: Returns the reference of option from drop down.                              */
/****************************************************************************************/
CreateEditCustomGroupings.prototype.getOptionFromDropDown = function(optionName) {
  var xpathOption = '//tf-dropdown//*[@data-qa-class="sub-directory-option" and normalize-space(.)="' + optionName + '"]';
  return element(by.xpath(xpathOption));
};

/****************************************************************************************/
/* Function: getXIcon                                                                   */
/* Description: This function is used to get reference of X icon on the top right corner*/
/*              of the dialog.                                                          */
/* Return: Returns the reference of X icon on the top right corner of the dialog.       */
/****************************************************************************************/
CreateEditCustomGroupings.prototype.getXIcon = function() {
  var xpathXIcon = '//button[@class="ui-dialog-titlebar-close"]';
  return element(by.xpath(xpathXIcon));
};

/****************************************************************************************/
/* Function: getButtonFromFormulaTab                                                    */
/* Description: This function is used to get reference of button from FORMULA tab.      */
/* Params: btnName -> Name of the button whose reference is needed.                     */
/*         Ex: Add, Equity Formula Lookup or Fixed Income Formula Lookup                */
/* Return: Returns the reference of required button.                                    */
/****************************************************************************************/
CreateEditCustomGroupings.prototype.getButtonFromFormulaTab = function(btnName) {
  var xpathButton;
  if (btnName.toLowerCase() === 'add') {
    xpathButton = '//*[@data-qa-id="button-add"]';
  } else {
    xpathButton = '//*[@class="newRefFormulaButtons"]//*[@data-qa-class="button-' + btnName.toLowerCase().replace(/\s/g, '-') + '"]';
  }

  return element(by.xpath(xpathButton));
};

module.exports = new CreateEditCustomGroupings();
