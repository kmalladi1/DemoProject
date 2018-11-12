'use strict';

var ModifyAccountGeneralReturns = function() {
  this.xpathPortfolioTextBox = '//*[normalize-space(.)="Portfolio"]/following-sibling::tf-textbox';
};

/****************************************************************************************/
/* Function: getTypeFromRHP                                                             */
/* Description: This function is used to get the reference of the Type from RHP.        */
/* Params: 1. typeName -> Name of the Type in whose reference is required.              */
/*                                 Ex: NET,GROSS                                        */
/* Returns: Returns the reference of Type.                                              */
/****************************************************************************************/
ModifyAccountGeneralReturns.prototype.getTypeFromRHP = function(typeName) {
  var xpathName = '//tf-listbox[@data-qa-id="returns-type-listbox"]/tf-listbox-item[normalize-space(.)="' + typeName + '"]';
  return element(by.xpath(xpathName));
};

/****************************************************************************************/
/* Function: getAddFeeButton                                                            */
/* Description: This function is used to get the reference of the Add Fee Button.       */
/* Returns: Returns the reference of Add Fee button.                                    */
/****************************************************************************************/
ModifyAccountGeneralReturns.prototype.getAddFeeButton = function() {
  var xpathName = '//tf-panel//tf-button[contains(@icon,"add")]';
  return element(by.xpath(xpathName));
};

/****************************************************************************************/
/* Function: getPortfolioTextBox                                                        */
/* Description: This function is used to get the reference of portfolio text box.       */
/* Returns: Returns the reference of portfolio text box.                                */
/****************************************************************************************/
ModifyAccountGeneralReturns.prototype.getPortfolioTextBox = function() {
  var xpath = '//*[contains(@ng-model,"portfolio")]/input';
  return element(by.xpath(xpath));
};

/****************************************************************************************/
/* Function: getCheckbox                                                                */
/* Description: This function is used to get the reference of any checkbox.             */
/* Param: checkboxName -> Name of the checkbox whose reference is required.             */
/* Returns: Returns the reference of "Set as Default" checkbox.                         */
/****************************************************************************************/
ModifyAccountGeneralReturns.prototype.getCheckbox = function(checkboxName) {
  var xpath = '//tf-panel//tf-checkbox[normalize-space(.)="' + checkboxName + '"]/tf-checkbox-control';
  return element(by.xpath(xpath));
};

/****************************************************************************************/
/* Function: getFeeRow                                                                  */
/* Description: This function is used to get the reference of a particular row.         */
/* Params: 1. rowValue -> Value of the row whose reference is required.                 */
/*                                 Ex: 20 May \'16                                      */
/* Returns: Returns the reference of a particular row.                                  */
/****************************************************************************************/
ModifyAccountGeneralReturns.prototype.getFeeRow = function(rowValue) {
  var xpath = '//*[contains(@class,"slick-row")]//*[normalize-space(.)="' + rowValue + '"]';
  return element(by.xpath(xpath));
};

/****************************************************************************************/
/* Function: getRemoveOrOptionIcon                                                      */
/* Description: This function is used to get the reference of a particular row.         */
/* Params: 1. rowValue -> Value of the row whose reference is required.                 */
/*                                 Ex: 20 May \'16                                      */
/*         2. type -> Type of the icon whose reference is required.                     */
/*                                 Ex: Remove, Option                                   */
/* Returns: Returns the reference of a particular row.                                  */
/****************************************************************************************/
ModifyAccountGeneralReturns.prototype.getRemoveOrOptionIcon = function(rowvalue, type) {
  var xpath = '//*[contains(@class,"slick-row")]//*[normalize-space(.)="' + rowvalue + '"]/parent::*' +
    '//*[contains(@class,"editable")]//tf-icon[contains(@class,"' + type.toLowerCase() + '")]';
  return element(by.xpath(xpath));
};

/****************************************************************************************/
/* Function: getButtonFromBenchmarkSection                                              */
/* Description: This function is used to get the reference of the Add Fee Button.       */
/* Returns: Returns the reference of Add Fee button.                                    */
/****************************************************************************************/
ModifyAccountGeneralReturns.prototype.getButtonFromBenchmarkSection = function(buttonName) {
  var xpathName = '//tf-form-vertical-section//*[normalize-space(.)=\"Benchmarks\"]/parent::*' +
    '//tf-button[contains(@icon,"' + buttonName.toLowerCase() + '")]/tf-icon';
  return element(by.xpath(xpathName));
};

/****************************************************************************************/
/* Function: getListboxItem                                                             */
/* Description: This function is used to get the reference of the particular item from  */
/*              Benchmark Listbox.                                                      */
/* Params: 1. itemName -> Name of the item whose reference is required.                 */
/*                                 Ex:CASH:EUR_EURIBORL1W                               */
/* Returns: Returns the reference of Item.                                              */
/****************************************************************************************/
ModifyAccountGeneralReturns.prototype.getListboxItem = function(itemName) {
  var xpathName = '//tf-listbox[contains(@ng-model,"benchmark")]//tf-listbox-item[normalize-space(.)="' + itemName + '"]';
  return element(by.xpath(xpathName));
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
ModifyAccountGeneralReturns.prototype.getColumnIndex = function(colName) {
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
ModifyAccountGeneralReturns.prototype.getAllColumnNames = function() {
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
ModifyAccountGeneralReturns.prototype.getDataView = function() {
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
ModifyAccountGeneralReturns.prototype.getColumnData = function(colName) {
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
ModifyAccountGeneralReturns.prototype.getRowIndex = function(rowName, colName) {
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
ModifyAccountGeneralReturns.prototype.getCellValue = function(rowName, colmnName) {
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

module.exports = new ModifyAccountGeneralReturns();
