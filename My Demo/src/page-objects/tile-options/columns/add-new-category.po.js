'use strict';

var AddNewCategory = function() {
  this.xpathLoadingBox = '//*[@data-qa-class="loading-spinner"]//tf-progress-indicator';
};

/*************************************************************************************************/
/* Function: getCategoryNamefield                                                                */
/* Description: This function is used to get reference of the "Category Name" field from         */
/*                 "Add New Category" dialog.                                                    */
/* Return: Promise which resolves to reference of "Category Name" text field.                    */
/*************************************************************************************************/
AddNewCategory.prototype.getCategoryNamefield = function() {
  var xpathCategoryName = '//*[.="Category Name::"]/following-sibling::*[@data-qa-id="column-add-category-name"]/input';
  return element(by.xpath(xpathCategoryName));
};

/*************************************************************************************************/
/* Function: getRadioButtonFromDirectorySection                                                  */
/* Description: This function is used to get reference of radio button from "Directory"          */
/*                    section of "Add New Category" dialog.                                      */
/* Params: btnName -> Name of the button whose reference is required.                            */
/*                   Ex:  "Client", "Personal" or "Super Client".                                */
/* Return: Promise which resolves to reference of required  radio button from Directory section. */
/*************************************************************************************************/
AddNewCategory.prototype.getRadioButtonFromDirectorySection = function(radioButtonName) {
  var xpathRadioButton = '//*[@data-qa-id="radio-button-' + radioButtonName.toLowerCase() + '"]';
  return element(by.xpath(xpathRadioButton));
};

/*********************************************************************************************************/
/* Function: getSubDirectoryDropDown                                                                     */
/* Description: This function is used to get reference of Sub directory dropdown from                    */
/*                   "Add New Category" dialog                                                           */
/* Return: Promise which resolves to reference of sub directory drop down.                               */
/*********************************************************************************************************/
AddNewCategory.prototype.getSubDirectoryDropDown = function() {
  var xpathSubDirectoryButton = '//*[@data-qa-id="dropdown-sub-directory"]//span[@tf-button]';
  return element(by.xpath(xpathSubDirectoryButton));
};

/*******************************************************************************************************/
/* Function: getFooterButton                                                                           */
/*  Description: This function is used to get reference of either OK or Cancel button from             */
/*                             "Add New Category" dialog.                                              */
/* Return: Promise with returns of required button from Footer.                                        */
/*******************************************************************************************************/
AddNewCategory.prototype.getFooterButton = function(buttonName) {
  var xpathButton = '//tf-dialog[@style]//tf-button[normalize-space(.)="' + buttonName + '"]';
  return element(by.xpath(xpathButton));
};

module.exports = new AddNewCategory();
