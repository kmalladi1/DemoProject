'use strict';

var ModifyAccountRiskUniverse = function() {
  this.xpathOfMarketPremiumAnnualPercentage = '//*[@data-qa-id="input-market-risk-premium-annual-percent"]/parent::*//tf-number-input';
  this.xpathOfDeannualizationFactorDays = '//*[@data-qa-id="input-deannual-factor-days"]/parent::*//tf-number-input';
  this.xpathIdTypeaheadTextbox = '//*[@data-qa-id="risk-universe-market-portfolio-section"]//tf-textbox[contains(@class,"id-typeahead-textbox")]';
  this.xpathNumberInput = '//*[@data-qa-id="input-replacingText"]';
};

/*!****************************************************************************************************************!/
/!* Function: getFilterListboxFilers                                                                              *!/
/!* Description: This function is used to get the reference of the filter listbox filters.                        *!/
/!* Param: filterName: Name of the filter.                                                                        *!/
/!* Return: Returns reference of the filter listbox filters.                                                      *!/
/!****************************************************************************************************************!*/
ModifyAccountRiskUniverse.prototype.getFilterListboxFilers = function(filterName) {
  var xpathFilterListboxFilters = '//id-typeahead-results//filter-listbox-header//filter-listbox-filter[normalize-space(.)="' + filterName + '"]';
  return element(by.xpath(xpathFilterListboxFilters));
};

/*!****************************************************************************************************************!/
/!* Function: getFilterListboxItem                                                                                *!/
/!* Description: This function is used to get the reference of the filter listbox item.                           *!/
/!* Param: itemName: Name of the item whose reference is required.                                                *!/
/!* Return: Returns reference of the filter listbox item.                                                         *!/
/!****************************************************************************************************************!*/
ModifyAccountRiskUniverse.prototype.getFilterListboxItem = function(itemName) {
  var xpathFilterListboxItem = '//*[@data-qa-id="idw-typeahead-results-filter-listbox-container"]//filter-listbox-item' + '//*[normalize-space(.)="' + itemName + '"]';
  return element(by.xpath(xpathFilterListboxItem));
};

/****************************************************************************************/
/* Function: getNumberInputBoxUpDownIcon                                                */
/* Description: This function is used to get reference of control buttons of number     */
/*              input field.                                                            */
/*Param: fieldName ->  Name of field the for which reference has to be collected        */
/*                          Ex: Market Risk Premium, Deannualization Factor             */
/* Return: Returns the reference of control buttons.                                    */
/****************************************************************************************/
ModifyAccountRiskUniverse.prototype.getNumberInputBoxUpDownIcon = function(fieldName, iconName) {
  var xpathNumberInput;
  if (fieldName.toLowerCase() === 'market risk premium') {
    xpathNumberInput = '//*[@data-qa-id="input-market-risk-premium-annual-percent"]//*[contains(@class,"number-input-controls")]' + '//tf-icon[contains(@type, "' + iconName.toLowerCase() + '")]';
  } else if (fieldName.toLowerCase() === 'deannualization factor') {
    xpathNumberInput = '//*[@data-qa-id="input-deannual-factor-days"]//*[contains(@class,"number-input-controls")]' + '//tf-icon[contains(@type, "' + iconName.toLowerCase() + '")]';
  }

  return element(by.xpath(xpathNumberInput));
};

/****************************************************************************************/
/* Function: getNumberInputBox                                                          */
/* Description: This function is used to get reference of number input field            */
/*Param: fieldName ->  Name of field the for which reference has to be collected        */
/*                          Ex: Market Risk Premium, Deannualization Factor             */
/* Return: Returns the reference of horizon month text field.                           */
/****************************************************************************************/
ModifyAccountRiskUniverse.prototype.getNumberInputBox = function(fieldName) {
  var xpathNumberInput;
  if (fieldName.toLowerCase() === 'market risk premium') {
    xpathNumberInput = '//*[@data-qa-id="input-market-risk-premium-annual-percent"]//input';
  } else if (fieldName.toLowerCase() === 'deannualization factor') {
    xpathNumberInput = '//*[@data-qa-id="input-deannual-factor-days"]//input';
  }

  return element(by.xpath(xpathNumberInput));
};
/**
 * @function getCellReference
 * @description This function is used to get the particular cell reference.
 * @param {string} colIndex Index of the column whose reference is required.
 * @param {string} rowIndex  Index of the row whose reference is required.
 * @returns {Promise}  Returns promise which resolved to the reference of the cell.
 */
ModifyAccountRiskUniverse.prototype.getCellReference = function(rowIndex, colIndex) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' + '.grid.getCellNode( arguments[0], arguments[1] )', rowIndex, colIndex).then(function(val) {
    defer.fulfill(val);
  });
  return promise;
};

/**
 * @function getColumnIndex
 * @description This function is used to get index of column dynamically when a column name is provided.
 * @param {string} colName Name of the column whose index is required.
 * @returns {promise} Returns promise which resolved to index of column.
 */
ModifyAccountRiskUniverse.prototype.getColumnIndex = function(colName) {
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

/**
 * @function getAllColumnNames
 * @description This function is used to get the names of all coulmns from slickgrid.
 * @returns {promise} Returns promise which resolved to name of all the columns.
 */
ModifyAccountRiskUniverse.prototype.getAllColumnNames = function() {
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
/* Function: getCellValue                                                               */
/* Description: This function is used to get the particular cell value when  column     */
/*             index and row index is provided.                                         */
/* Params: 1. rowIndex -> index of the row.                                             */
/*         2. colIndex -> index of the column.                                          */
/* Returns: Returns promise which resolved to the value of row and column index.        */
/****************************************************************************************/
ModifyAccountRiskUniverse.prototype.getCellValue = function(rowIndex, colIndex) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' + '.grid.getCellNode( arguments[0], arguments[1] )', rowIndex, colIndex).then(function(val) {
    defer.fulfill(val.getText());
  });
  return promise;
};

/*!****************************************************************************************************************!/
/!* Function: getActiveTextBoxFromSlickGrid                                                                      *!/
/!* Description: This function is used to get the reference of the active input box from slickgrid.              *!/
/!* Return: Returns reference of the active input box from slickgrid.                                            *!/
/!****************************************************************************************************************!*/
ModifyAccountRiskUniverse.prototype.getActiveTextBoxFromSlickGrid = function() {
  return element(by.css('.tf-slick-grid input'));
};

/*!****************************************************************************************************************!/
/!* Function: getActiveTextBoxFromSlickGrid                                                                      *!/
/!* Description: This function is used to get the reference of the active input box from slickgrid.              *!/
/!* Return: Returns reference of the active input box from slickgrid.                                            *!/
/!****************************************************************************************************************!*/
ModifyAccountRiskUniverse.prototype.getCrossIconFromSlickgrid = function(rowIndex, colIndex) {
  var ele = element(by.js(function(rowIndex, colIndex) {
    var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
    return slickObject.grid.getCellNode(rowIndex, colIndex);
  }, rowIndex, colIndex));
  Utilities.scrollElementToVisibility(ele);
  return ele.element(by.xpath('.//*[@id="slick-row-controls"]/*[contains(@class,"remove")]'));
};

module.exports = new ModifyAccountRiskUniverse();
