'use strict';

var ModifyAccountEditFee = function() {
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
ModifyAccountEditFee.prototype.getColumnIndex = function(colName) {
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
ModifyAccountEditFee.prototype.getAllColumnNames = function() {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var allColumn = [];
  browser.driver.executeScript(function() {
    var slickObject = $('.tf-slick-grid:eq(1)').data('$tfSlickGridController');
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
ModifyAccountEditFee.prototype.getDataView = function() {
  var defer = protractor.promise.defer();
  var promise = defer.promise;

  browser.driver.executeScript(function() {
    var slickObject = $('.tf-slick-grid:eq(1)').data('$tfSlickGridController');
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
ModifyAccountEditFee.prototype.getColumnData = function(colName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var colData = [];
  var _this = this;
  _this.getColumnIndex(colName).then(function(colIndex) {
    _this.getDataView().then(function(dataView) {
      dataView.forEach(function(temp, index) {
        browser.driver.executeScript('return $( ".tf-slick-grid:eq(1)" ).data( "$tfSlickGridController" )' +
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
ModifyAccountEditFee.prototype.getRowIndex = function(rowName, colName) {
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
ModifyAccountEditFee.prototype.getCellValue = function(rowName, colmnName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var _this = this;

  _this.getColumnIndex(colmnName).then(function(colIndex) {
    _this.getRowIndex(rowName, colmnName).then(function(rowIndex) {
      browser.driver.executeScript('return $( ".tf-slick-grid:eq(1)" ).data( "$tfSlickGridController" )' +
        '.grid.getCellNode( arguments[0], arguments[1] )', rowIndex, colIndex).then(function(val) {
        defer.fulfill(val.getText());
      });
    });

  });
  return promise;
};

/*
 ModifyAccountEditFee.prototype.getColumnIndex = function( colName ) {
 var defer = protractor.promise.defer();
 var promise = defer.promise;
 browser.driver.executeScript( function() {
 var slickObject = $( '.tf-slick-grid[tf-slick-data="ctrl.fee.tiers"]' ).data( '$tfSlickGridController' );
 var col = slickObject.grid.getColumns();
 return col;
 }).then( function( columns ) {
 // Getting index of required column.
 columns.forEach( function( col, index ) {
 var columnName = col.name;
 columnName = columnName.replace( /(?:\r\n|\r|\n|<br \/>)/g, ' ' );
 if ( columnName === colName ) {
 defer.fulfill( index );
 }
 });
 });
 return promise;
 };

 ModifyAccountEditFee.prototype.getCellValueWithIndexes = function( rowIndex, colIndex ) {
 var defer = protractor.promise.defer();
 var promise = defer.promise;
 browser.driver.executeScript( 'return $( ".tf-slick-grid:eq(1)" ).data( "$tfSlickGridController" )' +
 '.grid.getCellNode( arguments[0], arguments[1] )', rowIndex, colIndex ).then( function( val ) {
 defer.fulfill( val.getText());
 });
 return promise;
 };
 */

/************************************************************************************************/
/* Function: getSaveOrCancelButton                                                              */
/* Description: This function is used to get reference of radio button from edit fee dialog.    */
/* Params: 1. buttonNmae -> Radio button to be selected                                         */
/* Return: Promise which resolves to reference of particular radio button.                      */
/************************************************************************************************/
ModifyAccountEditFee.prototype.getSaveOrCancelButton = function(buttonNmae) {
  return element(by.xpath('//tf-dialog-footer//*[@class="tf-button-content"][normalize-space(.)="' + buttonNmae + '"]'));
};

/************************************************************************************************************/
/* Function: getDropDownFromEditFeeDialog                                                                         */
/* Description: This function is used to get the reference Drop Down from Edit fee dialog.                  */
/* param: monthOrYear -> Name of the drop down whose reference is required.                                 */
/*                      Ex:- Frequency, Currency                                                            */
/* Return: Returns the reference of Drop Down.                                                              */
/************************************************************************************************************/
ModifyAccountEditFee.prototype.getDropDownFromEditFeeDialog = function(dropdownName, sectionName) {
  if (sectionName === undefined) {
    sectionName = 'Options';
  }

  var xpathDropDown = '//*[normalize-space(.)="' + sectionName + '"]/parent::tf-form-vertical-section' +
    '//*[normalize-space(.)="' + dropdownName + '"]/following-sibling::*//tf-dropdown-select';
  return element(by.xpath(xpathDropDown));
};

module.exports = new ModifyAccountEditFee();
