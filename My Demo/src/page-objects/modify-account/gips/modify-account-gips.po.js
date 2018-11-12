'use strict';

var ModifyAccountGips = function() {
};

/************************************************************************************************************/
/* Function: getCheckBox                                                                                    */
/* Description: This function is used to get reference of checkbox from General->Additional options.        */
/* Params: checkBoxName -> Name of the check box whose reference is required.                               */
/* Return: Reference of checkbox.                                                                           */
/************************************************************************************************************/
ModifyAccountGips.prototype.getCheckBox = function(checkBoxName) {
  var xpathCheckbox = '//tf-checkbox[normalize-space(.)="' + checkBoxName + '"]/tf-checkbox-control';
  return element(by.xpath(xpathCheckbox));
};

/****************************************************************************************/
/* Function: getTextBox                                                                 */
/* Description: This function is used to get the reference of textbox from ModifyAccountGips        */
/* Params: 1. textboxName -> Name of the textbox.                                       */
/* Return: Returns the reference of the textbox.                                        */
/****************************************************************************************/
ModifyAccountGips.prototype.getTextBox = function(textboxName) {
  var xpathName = '//tf-form-vertical-item[normalize-space(.)="' + textboxName + '"]//input';
  return element(by.xpath(xpathName));
};

/****************************************************************************************/
/* Function: getDropDown                                                                */
/* Description: This function is used to get the reference of drop down field from ModifyAccountGips */
/* Params: 1. dropDownName -> Name of the Drop Down.                                    */
/* Return: Returns the reference of the drop down.                                      */
/****************************************************************************************/
ModifyAccountGips.prototype.getDropDown = function(dropDownName) {
  var xpathName = '//tf-label[normalize-space(.)="' + dropDownName + '"]//ancestor::tf-form-vertical-item//tf-button';
  return element(by.xpath(xpathName));
};

/****************************************************************************************/
/* Function: getDropDownOption                                                          */
/* Description: This function is used to get the reference of options from drop down    */
/*              field from ModifyAccountGips.                                                        */
/* Params: 1. option -> Name of the option from drop down.                              */
/* Return: Returns the reference of the option from drop down.                          */
/****************************************************************************************/
ModifyAccountGips.prototype.getDropDownOption = function(option) {
  var xpathName = '//tf-dropdown//tf-dropdown-select-item[normalize-space(.)="' + option + '"]';
  return element(by.xpath(xpathName));
};

/****************************************************************************************/
/* Function: getListboxItem                                                             */
/* Description: This function is used to get reference of particular items from Listbox */
/* Param: itemName -> Name of the item whose reference is required.                     */
/*                          Ex: Discretionary                                           */
/* Return: Returns the reference of particular item from Listbox.                       */
/****************************************************************************************/
ModifyAccountGips.prototype.getListboxItem = function(itemName) {
  var xpathItem = '//tf-listbox//tf-listbox-item[normalize-space(.)="' + itemName + '"]';
  return element(by.xpath(xpathItem));
};

/****************************************************************************************/
/* Function: getAddOrRemoveButton                                                       */
/* Description: This function is used to get the reference of the Add Period Button.    */
/* Returns: Returns the reference of Add Period button.                                 */
/****************************************************************************************/
ModifyAccountGips.prototype.getAddOrRemoveButton = function(buttonName) {
  var xpathName = '//tf-button/tf-icon[contains(@class,"' + buttonName.toLowerCase() + '")]';
  return element(by.xpath(xpathName));
};

/************************************************************************************************************/
/* Function: getCalenderIcon                                                                                */
/* Description: This function is used to get the reference of calender icon.                                */
/* Return: Returns the reference of calender icon.                                                          */
/************************************************************************************************************/
ModifyAccountGips.prototype.getCalenderIcon = function() {
  var xpath = '//tf-dropdown//*[contains(@class,"tf-datepicker-button")]';
  return element(by.xpath(xpath));
};
/************************************************************************************************************/
/* Function: getMonthOrYearDropDown                                                                         */
/* Description: This function is used to get the reference of Month or Year Drop Down.                      */
/* param: monthOrYear -> Name of the drop down whose reference is required.                                 */
/*                      Ex:- Month, Year                                                                    */
/* Return: Returns the reference of Month or year Drop Down.                                                */
/************************************************************************************************************/
ModifyAccountGips.prototype.getMonthOrYearDropDown = function(monthOrYear) {
  var xpath;

  if (monthOrYear.toLowerCase() === 'month') {
    xpath = '//*[contains(@ng-model,"monthSelect")][contains(@class,"tf-dropdown-select")]';
  }

  if (monthOrYear.toLowerCase() === 'year') {
    xpath = '//*[contains(@ng-model,"yearSelect")][contains(@class,"tf-dropdown-select")]';
  }

  return element(by.xpath(xpath));
};

/************************************************************************************************************/
/* Function: getMonthOrYearDropDownOption                                                                   */
/* Description: This function is used to get the reference of options from Month or Year drop down.         */
/* param: option -> Name of the option from drop down whose reference is required.                          */
/*                      Ex:- July, 2016                                                                     */
/* Return: Returns the reference of options from Month or Year drop down.                                   */
/************************************************************************************************************/
ModifyAccountGips.prototype.getMonthOrYearDropDownOption = function(option) {
  var xpath = '//tf-dropdown//*[contains(@class,"tf-selectable")][normalize-space(.)="' + option + '"]';
  return element(by.xpath(xpath));
};

/************************************************************************************************/
/* Function: getDay                                                                             */
/* Description: This function is used to get reference of a day inside the calendar             */
/* Params: 1. day -> day to be selected                                                         */
/* Return: Promise which resolves to reference of particular day                                */
/************************************************************************************************/
ModifyAccountGips.prototype.getDay = function(day) {
  return element(by.xpath('//*[contains(@ng-model,"calendar")]//*[normalize-space(.)="' + day + '"]' +
    '[not(contains(@class, "past"))][not(contains(@class, "future"))]'));
};

/************************************************************************************************/
/* Function: getTextBoxFromDropdown                                                             */
/* Description: This function is used to get reference of a text box from dropdown.             */
/* Param: textboxName -> Name of the textbox whose reference is required.                       */
/*                          Ex: Start Date                                                      */
/* Return: Reference of the specified text box.                                                 */
/************************************************************************************************/
ModifyAccountGips.prototype.getTextBoxFromDropdown = function(textboxName) {
  return element(by.xpath('//tf-dropdown//tf-form-vertical-item[normalize-space(.)="' + textboxName + '"]//input'));
};

/************************************************************************************************/
/* Function: getTextAreaFromDropdown                                                            */
/* Description: This function is used to get reference of a text area from dropdown.            */
/* Param: textareaName -> Name of the textarea whose reference is required.                     */
/*                          Ex: Comment                                                         */
/* Return: Reference of the specified text area.                                                */
/************************************************************************************************/
ModifyAccountGips.prototype.getTextAreaFromDropdown = function(textareaName) {
  return element(by.xpath('//tf-dropdown//tf-form-vertical-item[normalize-space(.)="' + textareaName + '"]//textarea'));
};

/************************************************************************************************/
/* Function: getSaveOrCancelButtonFromDropDown                                                  */
/* Description: This function is used to get reference of Save/Cancel button from dropdown.     */
/* Params: 1. buttonName -> button whose reference is required.                                 */
/* Return: Returns reference of particular button.                                              */
/************************************************************************************************/
ModifyAccountGips.prototype.getSaveOrCancelButtonFromDropDown = function(buttonName) {
  return element(by.xpath('//tf-dropdown//tf-button[normalize-space(.)="' + buttonName + '"]'));
};

/************************************************************************************************/
/* Function: getCheckbox                                                                         */
/* Description: This function is used to get reference of Checkbox.                             */
/* Param: checkboxName -> Name of the checkbox whose reference is required.                     */
/* Return: Returns the reference of Use Base Currency Checkbox.                                 */
/************************************************************************************************/
ModifyAccountGips.prototype.getCheckbox = function(checkboxName) {
  return element(by.xpath('//tf-dropdown//tf-checkbox[normalize-space(.)="' + checkboxName + '"]/tf-checkbox-control'));
};

/****************************************************************************************/
/* Function: getFeeRow                                                                  */
/* Description: This function is used to get the reference of a particular row.         */
/* Params: 1. rowValue -> Value of the row whose reference is required.                 */
/*                                 Ex: 20 May \'16                                      */
/* Returns: Returns the reference of a particular row.                                  */
/****************************************************************************************/
ModifyAccountGips.prototype.getFeeRow = function(rowValue) {
  var xpath = '//*[contains(@class,"slick-row")]//*[normalize-space(.)="' + rowValue + '"]';
  return element(by.xpath(xpath));
};

/****************************************************************************************/
/* Function: getRemoveIcon                                                              */
/* Description: This function is used to get the reference of remove icon.              */
/* Params: 1. rowValue -> Value of the row whose reference is required.                 */
/*                                 Ex: 20 May \'16                                      */
/* Returns: Returns the reference of remove icon.                                       */
/****************************************************************************************/
ModifyAccountGips.prototype.getRemoveIcon = function(rowvalue) {
  var xpath = '//*[contains(@class,"slick-row")]//*[normalize-space(.)="' + rowvalue + '"]/parent::*//tf-icon';
  return element(by.xpath(xpath));
};

/*********************************************************************************************************/
/*                                          SlickGrid Related                                            */
/*********************************************************************************************************/

/****************************************************************************************/
/* Function: getColumnIndex                                                             */
/* Description: This function is used to get index of column dynamically                */
/*              when a column name is provided.                                         */
/* Params: 1. colName -> Name of the column whose index is required.                    */
/*                                 Ex: Start Date, Fee(BPS)                             */
/* Returns: Returns promise which resolved to index of column.                          */
/****************************************************************************************/
ModifyAccountGips.prototype.getColumnIndex = function(colName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  this.getAllColumnNames().then(function(allColumns) {
    allColumns.forEach(function(col, index) {
      if (col === colName) {
        defer.fulfill(index);
      }
    });
  });
  return promise;
};

/****************************************************************************************/
/* Function: getAllColumnNames                                                          */
/* Description: This function is used to get the names of all coulmns from slickgrid.   */
/* Returns: Returns promise which resolved to name of all the columns.                  */
/****************************************************************************************/
ModifyAccountGips.prototype.getAllColumnNames = function() {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var allColumn = [];
  browser.driver.executeScript(function() {
    var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
    var col = slickObject.grid.getColumns();
    return col;
  }).then(function(columns) {
    // Getting index of required column.
    columns.forEach(function(col) {
      var columnName = col.name;
      columnName = columnName.replace(/(?:\r\n|\r|\n|<br \/>)/g, ' ');
      allColumn.push(columnName);
      defer.fulfill(allColumn);

    });
  });
  return promise;
};

/****************************************************************************************/
/* Function: getDataView                                                                */
/* Description: This function is used to get json object of all the data                */
/*              present in data view.                                                   */
/* Returns: Returns promise which resolved to json object of all the data.              */
/****************************************************************************************/
ModifyAccountGips.prototype.getDataView = function() {
  var defer = protractor.promise.defer();
  var promise = defer.promise;

  browser.driver.executeScript(function() {
    var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
    var data = slickObject.grid.getData();
    return data;
  }).then(function(dataView) {
    defer.fulfill(dataView);
  });
  return promise;
};

/****************************************************************************************/
/* Function: getColumnData                                                              */
/* Description: This function is used to get all the data from a particular column.     */
/* Params: 1. colName -> Name of the column whose all data is required.                 */
/*                                 Ex: Start Date, Fee(BPS)                             */
/* Returns: Returns promise which resolved to all the data of particular columns.       */
/****************************************************************************************/
ModifyAccountGips.prototype.getColumnData = function(colName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var colData = [];
  var _this = this;
  _this.getColumnIndex(colName).then(function(colIndex) {
    _this.getDataView().then(function(dataView) {
      dataView.forEach(function(temp, index) {
        browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
          '.grid.getCellNode( arguments[0], arguments[1] )', index, colIndex).then(function(ref) {
          ref.getText().then(function(text) {
            colData.push(text);
          });
        });
      });
    });
  }).then(function() {
    defer.fulfill(colData);
  });

  return promise;
};

/****************************************************************************************/
/* Function: getRowIndex                                                                */
/* Description: This function is used to get index of row dynamically  when a row name  */
/*               is provided.                                                           */
/* Params: 1. rowName -> Name of the row whose index is required.                       */
/*                                 Ex: EARLIEST                                         */
/*         2. colName -> Name of the column.                                            */
/*                                  EX: Start Date, Fee (BPS)                           */
/* Returns: Returns promise which resolved to index of row.                             */
/****************************************************************************************/
ModifyAccountGips.prototype.getRowIndex = function(rowName, colName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  this.getColumnData(colName).then(function(allRow) {
    allRow.forEach(function(text, index) {
      if (text === rowName) {
        defer.fulfill(index);
      }
    });
    defer.reject('slick grid does not contain "' + rowName + '"');
  });
  return promise;
};

/****************************************************************************************/
/* Function: getCellValue                                                               */
/* Description: This function is used to get the particular cell value when  column     */
/*             index and row index is provided.                                         */
/* Params: 1. rowIndex -> index of the row.                                             */
/*         2. colIndex -> index of the column.                                          */
/* Returns: Returns promise which resolved to the value of row and column index.        */
/****************************************************************************************/
ModifyAccountGips.prototype.getCellValue = function(rowName, colmnName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var _this = this;

  _this.getColumnIndex(colmnName).then(function(colIndex) {
    _this.getRowIndex(rowName, colmnName).then(function(rowIndex) {
      browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
        '.grid.getCellNode( arguments[0], arguments[1] )', rowIndex, colIndex).then(function(val) {
        defer.fulfill(val.getText());
      });
    });

  });
  return promise;
};

/****************************************************************************************/
/* Function: getRowCount                                                                */
/* Description: This function is used to get the count of rows from slickgrid.          */
/* Returns: Returns promise which resolved to count no. of rows in the slickgrid.       */
/****************************************************************************************/
ModifyAccountGips.prototype.getRowCount = function() {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  this.getDataView().then(function(arr) {
    defer.fulfill(arr.length);
  });
  return promise;
};

module.exports = new ModifyAccountGips();
