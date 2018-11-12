'use strict';

var ModifyAccountGeneralDates = function() {
};

/************************************************************************************************************/
/* Function: getCalenderIcon                                                                                */
/* Description: This function is used to get the reference of calender icon.                                */
/* Param: option -> Name of the Type of date from which Calender icon reference is required.                */
/*                  Ex -> Inception Date                                                                    */
/* Return: Returns the reference of calender icon.                                                          */
/************************************************************************************************************/
ModifyAccountGeneralDates.prototype.getCalenderIcon = function(option) {
  var xpath = '//*[@data-qa-id="' + option.toLowerCase().replace(/\s/g, '-') + '-datepicker"]//tf-button';
  return element(by.xpath(xpath));
};

/************************************************************************************************************/
/* Function: getMonthOrYearDropDown                                                                         */
/* Description: This function is used to get the reference of Month or Year Drop Down.                      */
/* param: monthOrYear -> Name of the drop down whose reference is required.                                 */
/*                      Ex:- Month, Year                                                                    */
/* Return: Returns the reference of Month or year Drop Down.                                                */
/************************************************************************************************************/
ModifyAccountGeneralDates.prototype.getMonthOrYearDropDown = function(monthOrYear) {
  var xpath;

  if (monthOrYear.toLowerCase() === 'month') {
    xpath = '//*[@ng-model="monthSelect"][contains(@class,"tf-dropdown-select")]';
  }

  if (monthOrYear.toLowerCase() === 'year') {
    xpath = '//*[@ng-model="yearSelect"][contains(@class,"tf-dropdown-select")]';
  }

  return element(by.xpath(xpath));
};

/************************************************************************************************************/
/* Function: getMonthOrYearDropDownOption                                                                   */
/* Description: This function is used to get the reference of options from Month or Year drop down.         */
/* param: option -> Name of the option from drop down whose reference is required.                          */
/*                      Ex:- Month, Year                                                                    */
/* Return: Returns the reference of options from Month or Year drop down.                                   */
/************************************************************************************************************/
ModifyAccountGeneralDates.prototype.getMonthOrYearDropDownOption = function(option) {
  var xpath = '//tf-dropdown//*[contains(@class,"tf-selectable")][normalize-space(.)="' + option + '"]';
  return element(by.xpath(xpath));
};

/************************************************************************************************/
/* Function: getDay                                                                             */
/* Description: This function is used to get reference of a day inside the calendar             */
/* Params: 1. day -> day to be selected                                                         */
/* Return: Promise which resolves to reference of particular day                                */
/************************************************************************************************/
ModifyAccountGeneralDates.prototype.getDay = function(day) {
  return element(by.xpath('//*[contains(@ng-model,"calendar")]//*[normalize-space(.)="' + day + '"]' +
    '[not(contains(@class, "past"))][not(contains(@class, "future"))]'));
};

/************************************************************************************************/
/* Function: getDateTextBox                                                                     */
/* Description: This function is used to get reference of a start date text box.                */
/* Return: Promise which resolves to reference of satrt date text box.                          */
/************************************************************************************************/
ModifyAccountGeneralDates.prototype.getDateTextBox = function(option) {
  return element(by.xpath('//*[@data-qa-id="' + option.toLowerCase().replace(/\s/g, '-') + '-datepicker"]//input'));
};

/************************************************************************************************************/
/* Function: getDropDownFromRHP                                                                             */
/* Description: This function is used to get the reference of Drop Down from RHP.                           */
/* param: dropDown -> Name of the drop down whose reference is required.                                    */
/* Return: Returns the reference of Drop Down from RHP.                                                     */
/************************************************************************************************************/
ModifyAccountGeneralDates.prototype.getDropDownFromRHP = function(dropDown) {
  var xpathDropDown = '//*[@data-qa-id="' + dropDown.toLowerCase().replace(/\s/g, '-') + '-dropdown"]/tf-button';
  return element(by.xpath(xpathDropDown));
};

/************************************************************************************************************/
/* Function: getDropDownOption                                                                              */
/* Description: This function is used to get the reference of options from drop Down.                       */
/* param: option -> Name of the option in drop down whose reference is required.                            */
/*        dropDown -> Name of the drop down whose reference is required.                                    */
/* Return: Returns the reference of Month or year Drop Down.                                                */
/************************************************************************************************************/
ModifyAccountGeneralDates.prototype.getDropDownOption = function(dropDown, option) {
  var xpathDropDown = '//*[normalize-space(.)="' + dropDown + '"]/ancestor::*//tf-dropdown' +
    '//span[normalize-space(.)="' + option + '"]';
  return element(by.xpath(xpathDropDown));
};

module.exports = new ModifyAccountGeneralDates();
