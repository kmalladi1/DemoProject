'use strict';
var UtilitySlickgrid = function() {
};

/********************************************************************************************/
/* Function: getCellValueFromTradePreview                                                   */
/* Description: This function is used to get the reference of a cell value of specified     */
/*              Column and Row                                                              */
/*                                                                                          */
/* Params:1. utilityName -> name of the utility is selected                                 */
/*            example: 'Trader', 'Solver'                                                   */
/*         2. rowName -> specifies the name of the row whose cell reference is needed       */
/*         Example: '25466AB', '3133XUMS'                                                   */
/*         3. colName  -> specifies the column name whose cell reference is needed          */
/*         Example: 'ISO', 'Price'                                                          */
/*		   4. rowNum -> Index of the row whose required cell value is required.	    		*/
/*                        Example: '1'.                                                     */
/*                                                                                          */
/* Return: Promise which resolves to reference of required cell with in a specified row in  */
/*         trade preview section.                                                           */
/********************************************************************************************/
UtilitySlickgrid.prototype.getCellValueFromTradePreview = function(utilityName, rowName, colName, rowNum) {

  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var rowIndex;
  var colIndex;
  var flag = 0;

  if (rowNum === undefined) {
    rowNum = 1;
  }

  browser.driver.executeScript(function() {
    var slickObject;
    if (arguments[0] === 'Solver') {
      slickObject = $('.tf-slick-grid:eq(2)').data('$tfSlickGridController');
    } else if (arguments[0] === 'Trader') {
      slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
    }

    var col = slickObject.grid.getColumns();
    var rowlength = slickObject.grid.getDataLength();
    var row = [];
    for (var i = 0; i < rowlength; i++) {
      row.push(slickObject.grid.getDataItem(i).sec_id);
    }

    return [col, row];
  }, utilityName).then(function(values) {

    // Getting index of required column.
    values[0].forEach(function(col, index) {
      if (col.name === colName) {
        colIndex = index;
      }
    });

    // Getting index of required row.
    // Flag is used to get the required row if multiple rows having same name.
    values[1].forEach(function(row, index1) {
      if (row === rowName) {
        flag++;
        if (flag === rowNum) {
          rowIndex = index1;
        }
      }
    });

    browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
      '.grid.getCellNode( arguments[0], arguments[1] )', rowIndex, colIndex).then(function(val) {
      defer.fulfill(val.getText());
    });
  });
  return promise;
};

/********************************************************************************************/
/* Function: scrollColumnToVisibleInTradePreview                                            */
/* Description: This function is used to scroll upto the specified column in                */
/*               Trade Preview section.                                                     */
/* Params:1. utilityName -> name of the utility is selected                                 */
/*            example: 'Trader', 'Solver'                                                   */
/*         2. colName: Name of the column that has to get into visibility.                  */
/* Return: NA                                                                               */
/********************************************************************************************/
UtilitySlickgrid.prototype.scrollColumnToVisibleInTradePreview = function(utilityName, colName) {

  browser.driver.executeScript(function() {
    var slickObject;
    if (arguments[0] === 'Solver') {
      slickObject = $('.tf-slick-grid:eq(2)').data('$tfSlickGridController');
    } else if (arguments[0] === 'Trader') {
      slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
    }

    var col = slickObject.grid.getColumns();
    return col;
  }, utilityName).then(function(columns) {
    for (var j = 0; j < columns.length; j++) {
      if (columns[j].name === colName) {
        browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
          '.grid.scrollCellIntoView( 1, arguments[0] )', j);
      }
    }
  });
};

/********************************************************************************************/
/* Function: getColumnIndexFromTradePreview                                                 */
/* Description: This function is used to get index of column from Trade Preview section.    */
/* Params:1. utilityName -> name of the utility is selected                                 */
/*            example: 'Trader', 'Solver'                                                   */
/*         2. colName: Name of the column that has to get into visibility.                  */
/* Return: Promise which resolves index of the given column.                                */
/********************************************************************************************/
UtilitySlickgrid.prototype.getColumnIndexFromTradePreview = function(utilityName, colName) {

  var defer = protractor.promise.defer();
  var promise = defer.promise;

  browser.driver.executeScript(function() {

    var slickObject;
    if (arguments[0] === 'Solver') {
      slickObject = $('.tf-slick-grid:eq(2)').data('$tfSlickGridController');
    } else if (arguments[0] === 'Trader') {
      slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
    }

    var col = slickObject.grid.getColumns();
    return col;
  }, utilityName).then(function(columns) {

    // Getting index of required column.
    columns.forEach(function(col, index) {
      if (col.name === colName) {
        defer.fulfill(index);
      }
    });
  });
  return promise;
};

module.exports = new UtilitySlickgrid();
