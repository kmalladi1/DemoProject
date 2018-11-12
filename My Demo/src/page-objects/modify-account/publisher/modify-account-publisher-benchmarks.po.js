'use strict';

var ModifyAccountPublisherBenchmarks = function() {
};

/************************************************************************************************/
/* Function: getTextbox                                                                         */
/* Description: This function is used to get the reference of text box from                     */
/*              Publisher>Publisher Benchmarks.                                                 */
/*Param: sectionName -> Name of the section from which text box reference is required.          */
/*                      Ex: Holdings Benchmarks, Returns Benchmarks                             */
/* Return: Returns reference of text box.                                                       */
/************************************************************************************************/
ModifyAccountPublisherBenchmarks.prototype.getTextbox = function(sectionName) {
  return element(by.xpath('//tf-form-vertical-section//*[normalize-space(.)="' + sectionName + '"]' +
    '/parent::*//tf-textbox/input'));
};

/****************************************************************************************/
/* Function: getListboxItem                                                             */
/* Description: This function is used to get reference of particular items from         */
/*              "Holdings Benchmarks/Returns Benchmark" section.                        */
/* Param: itemName -> Name of the item whose reference is required.                     */
/*                    EX: RUSSELL:1000                                                  */
/*        sectionName -> Name of the section from which item reference is required.     */
/*                       Ex:Holdings Benchmarks, Returns Benchmark                      */
/* Return: Returns the reference of particular item.                                    */
/****************************************************************************************/
ModifyAccountPublisherBenchmarks.prototype.getListboxItem = function(sectionName, itemName) {
  var xpathItem = '//tf-form-vertical-section//*[normalize-space(.)="' + sectionName + '"]' +
    '/parent::*//tf-listbox//tf-listbox-item[normalize-space(.)="' + itemName + '"]';
  return element(by.xpath(xpathItem));
};

/****************************************************************************************/
/* Function: getAllListItem                                                             */
/* Description: This function is used to get reference of all items from                */
/*              "Holdings Benchmarks/Returns Benchmark" section.                        */
/* Param: sectionName -> Name of the section from which all item reference is required. */
/*                       Ex: Holdings Benchmarks, Returns Benchmark                     */
/* Return: Reference of all item from "Holdings Benchmarks/Returns Benchmark".          */
/****************************************************************************************/
ModifyAccountPublisherBenchmarks.prototype.getAllListItem = function(sectionName) {
  var xpathItem = '//tf-form-vertical-section//*[normalize-space(.)="' + sectionName + '"]' +
    '/parent::*//tf-listbox-item';
  return element.all(by.xpath(xpathItem));
};

/****************************************************************************************/
/* Function: getCrossIconFromListboxItem                                                */
/* Description: This function is used to get reference of cross icon of particular item */
/*              from "Holdings Benchmarks/Returns Benchmark" section.                   */
/* Param: itemName -> Name of the item whose reference is required.                     */
/*                    EX: RUSSELL:1000                                                  */
/*        sectionName -> Name of the section from which item reference is required.     */
/*                       Ex:Holdings Benchmarks, Returns Benchmark                      */
/* Return: Returns the reference of cross icon of  particular item.                     */
/****************************************************************************************/
ModifyAccountPublisherBenchmarks.prototype.getCrossIconFromListboxItem = function(sectionName, itemName) {
  var xpathItem = '//tf-form-vertical-section//*[normalize-space(.)="' + sectionName + '"]' +
    '/parent::*//tf-listbox//tf-listbox-item[normalize-space(.)="' + itemName + '"]//tf-icon';
  return element(by.xpath(xpathItem));
};

/****************************************************************************************/
/* Function: getIconFromBenchmark                                                       */
/* Description: This function is used to get reference of icons from                    */
/*              "Holdings Benchmarks/Returns Benchmark" section.                        */
/* Param:  sectionName -> Name of the section from which icon reference is required.    */
/*                       Ex:Holdings Benchmarks, Returns Benchmark                      */
/*         iconName -> Name of the icon whose reference is required.                    */
/*                     Ex: remove, alert, lookup                                        */
/* Return: Returns the reference of icon from particular section.                       */
/****************************************************************************************/
ModifyAccountPublisherBenchmarks.prototype.getIconFromBenchmark = function(sectionName, iconName) {
  var xpathItem = '//tf-form-vertical-section//*[normalize-space(.)="' + sectionName + '"]' +
    '/parent::*//tf-button/tf-icon[contains(@class,"' + iconName.toLowerCase() + '")]';
  return element(by.xpath(xpathItem));
};

module.exports = new ModifyAccountPublisherBenchmarks();
