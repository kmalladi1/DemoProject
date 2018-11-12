'use strict';
/*global XPathResult:true*/

var AnalyticsOverrideEditor = function() {
  this.xpathAOE = '//*[@data-qa-id="an-override-dialog"]';
  this.xpathStartDate = '//*[contains(@data-qa-id,"start-date")]//tf-datepicker';
  this.xpathEndDate = '//*[contains(@data-qa-id,"end-date")]//tf-datepicker';
  this.arrColumnNames = ['Identifier', 'Security Name', 'Start Date', 'End Date', 'Analytic', 'Value'];
  this.gridXpath = '//*[@data-qa-id="an-override-dialog"]//*[contains(@class, "tf-grid-content")]';
  this.xpathProgressIndicator = '//tf-progress-indicator';
  this.xpathStartDateDD = '//*[@data-qa-id="dropdown-aoe-start-date"]//tf-textbox-dropdown-toggle//span[@tf-button]';
  this.xpathEndDateDD = '//*[@data-qa-id="dropdown-aoe-end-date"]//tf-textbox-dropdown-toggle//span[@tf-button]';
};

/****************************************************************************************/
/* Function: getDropdown                                                                */
/* Description: This function is used to get a toggle reference of the dropdown from    */
/*              Analytics Override Editor dialog.                                       */
/* Params: 1. dropdownName -> Name of the dropdown.                                     */
/*                         Ex: Analytic or Save Location                                */
/* Return: Returns the toggle reference of the dropdown.                                */
/****************************************************************************************/
AnalyticsOverrideEditor.prototype.getDropdown = function(dropdownName) {
  // Variable(s)
  var xpathDropdown = this.xpathAOE;

  // Using regular expression to replace spaces with '-' to be used as QAID.
  if (dropdownName.toLowerCase() === 'save location') {
    dropdownName = 'path';
    xpathDropdown += '//*[@data-qa-id="dropdown-aoe-' + dropdownName.toLowerCase() + '"]//tf-dropdown-select';
  } else if (dropdownName.toLowerCase() === 'preview') {
    xpathDropdown += '//*[@data-qa-id="dropdown-aoe-' + dropdownName.toLowerCase() + '-filter"]';
  } else {
    xpathDropdown += '//*[@data-qa-id="dropdown-aoe-' + dropdownName.toLowerCase() + '"]//tf-dropdown-select';
  }

  // Creating object of "DropdownSelect" class
  var objDropdownSelect = new TestHelpers.DropdownSelect(by.xpath(xpathDropdown));

  return objDropdownSelect;
};

/****************************************************************************************/
/* Function: getInputField                                                              */
/* Description: This function is used to get the reference of input field from          */
/*              Analytics Override Editor dialog.                                       */
/* Params: 1. inputFieldName -> Name of the input field.                                */
/* Return: Returns the reference of the input field.                                    */
/****************************************************************************************/
AnalyticsOverrideEditor.prototype.getInputField = function(inputFieldName) {
  var xpathInputField = this.xpathAOE;

  // Using regular expression to replace spaces with '-' to be used as QAID.
  inputFieldName = inputFieldName.replace(/[\s;]/g, '-');
  if (inputFieldName.toLowerCase() === 'value') {
    xpathInputField += '//*[@data-qa-id="input-box-aoe-value"]//input';
  } else {
    xpathInputField += '//*[@data-qa-id="dropdown-aoe-' + inputFieldName.toLowerCase() + '"]//input';
  }

  return element(by.xpath(xpathInputField));
};

/****************************************************************************************/
/* Function: getOptionFromAnalyticDropdown                                              */
/* Description: This function is used to get reference of an option from "Analytic"     */
/*              dropdown.                                                               */
/* Parameter: optionName -> Name of the option.                                         */
/*            Ex: Spread Duration                                                       */
/* Return: Returns the reference of an option from Analytic dropdown.                   */
/****************************************************************************************/
AnalyticsOverrideEditor.prototype.getOptionFromAnalyticDropdown = function(optionName) {
  var xpathOption = '//tf-dropdown//*[@data-qa-class="dropdown-option" and normalize-space(.)="' + optionName + '"]';

  return element(by.xpath(xpathOption));
};

/****************************************************************************************/
/* Function: getAllOptionsFromAnalyticDropdown                                          */
/* Description: This function is used to get references of all options in "Analytic"    */
/*              dropdown.                                                               */
/* Return: Returns an array of references of all options in Analytic dropdown.          */
/****************************************************************************************/
AnalyticsOverrideEditor.prototype.getAllOptionsFromAnalyticDropdown = function() {
  var xpathOptions = '//tf-dropdown//*[@data-qa-class="dropdown-option"]';

  return element.all(by.xpath(xpathOptions));
};

/****************************************************************************************/
/* Function: getValueFieldXIcon                                                         */
/* Description: This function is used to get the reference of X-icon in the Value field.*/
/* Return: Returns the reference of the X-icon.                                         */
/****************************************************************************************/
AnalyticsOverrideEditor.prototype.getValueFieldXIcon = function() {
  var xpathIcon = this.xpathAOE + '//*[@data-qa-id="input-box-aoe-value"]//*[contains(@class,"remove")]';

  return element(by.xpath(xpathIcon));
};

/****************************************************************************************/
/* Function: getWarningIconFromInputField                                               */
/* Description: This function is used to get the reference of Warning icon in the input */
/*              field.                                                                  */
/* Params: 1. inputFieldName -> Name of the input field.                                */
/* Return: Returns the reference of the X-icon.                                         */
/****************************************************************************************/
AnalyticsOverrideEditor.prototype.getWarningIconFromInputField = function(inputFieldName) {
  var xpathIcon = this.xpathAOE;

  // Using regular expression to replace spaces with '-' to be used as QAID.
  inputFieldName = inputFieldName.replace(/[\s;]/g, '-');
  if (inputFieldName.toLowerCase() === 'value') {
    xpathIcon += '//*[@data-qa-id="input-box-aoe-value"]//*[contains(@class,"icon-alert")]';
  } else {
    xpathIcon += '//*[@data-qa-id="dropdown-aoe-' + inputFieldName.toLowerCase() + '"]//*[contains(@class,"icon-alert")]/..';
  }

  return element(by.xpath(xpathIcon));
};

/****************************************************************************************/
/* Function: getInfoBox                                                                 */
/* Description: This function is used to get the reference of infobox.                  */
/* Return: Returns the reference of the infobox                                         */
/****************************************************************************************/
AnalyticsOverrideEditor.prototype.getInfoBox = function() {
  var xpathInfo = '//tf-textbox-error';

  return element(by.xpath(xpathInfo));
};

/**
 * @function getButtonFromAnalyticsOverrideEditor
 * @description This function is used to get reference of required button from "Analytics Override Editor"
 * @param buttonName {string} Name of the button whose reference is required
 *      Ex: Update, Add, Clear, Apply, Apply & Close or Cancel
 * @returns {promise} Promise which resolves to the reference of button
 */
AnalyticsOverrideEditor.prototype.getButtonFromAnalyticsOverrideEditor = function(buttonName) {
  // Variable(s)
  var xpathButton;
  var baseXpath;

  baseXpath = '//*[@role="dialog" and contains(@style, "display: block")]';

  xpathButton = baseXpath + '//*[@type="button" and normalize-space(.)="' + buttonName + '"]|' + baseXpath + '//*[@data-qa-id="text-button-aoe-' + buttonName.toLowerCase() + '"]';

  return element(by.xpath(xpathButton));
};

/**
 * @function getCloseButtonFromDialogTitlebar
 * @description This function is used to get the reference of "X" button from the dialog's titlebar
 * @returns {Reference} Promise which resolves to the reference of "X" button
 */
AnalyticsOverrideEditor.prototype.getCloseButtonFromDialogTitlebar = function() {
  return element(by.xpath('//tf-dialog[descendant::*//*[normalize-space(text())="Analytics Override Editor"]]//*[text()="×"]'));
};

/**
 * @function setDateUsingCalendar
 * @description This function is used to set the date using the calendar icon
 * @param calendarName {String} Name of the calendar for which you want to set the date
 *                     Ex: Start Date or End Date
 * @param date {object} JavaScript Date Object
 *              Refer this link to create JavaScript Date object:
 *              https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
 */
AnalyticsOverrideEditor.prototype.setDateUsingCalendar = function(calendarName, date) {
  // Variable(s)
  var xpathCalendarButton = '//*[@data-qa-id="dropdown-aoe-' + calendarName.toLowerCase().replace(/\s/g, '-') + '"]' + '//tf-datepicker-dropdown//span[@tf-button]';

  // Click on calendar button to pop the calendar
  element(by.xpath(xpathCalendarButton)).click().then(function() {}, function(error) {
    expect(false).customError(error);
    CommonFunctions.takeScreenShot();
  });

  // Verifying if "Calendar" pop out
  Utilities.isDropDownOpen().then(function(value) {
    if (!value) {
      expect(false).customError('"' + calendarName + '" calendar did not show up after clicking on calendar button.');
      CommonFunctions.takeScreenShot();
    }
  }, function(error) {
    expect(false).customError(error);
    CommonFunctions.takeScreenShot();
  });

  var xpathCalendar = '//tf-dropdown//tf-calendar';

  // Creating object for "Calendar" class
  var objCalendar = new TestHelpers.Calendar(by.xpath(xpathCalendar));

  // Set the given date
  objCalendar.setDate(date);
};

/**
 * @function getButton
 * @description This function is used to get reference of button from "Analytics Override Editor"
 * @param btnName {String} Name of the button whose reference is required
 *                          Ex: Update, Add, Clear, Apply, Apply & Close, Cancel
 * @returns {Promise} Promise which resolves to the reference of required button
 */
AnalyticsOverrideEditor.prototype.getButton = function(btnName) {
  // Variable(s)
  var xpathButton = '//*[@data-qa-id="text-button-aoe-' + btnName.toLowerCase() + '"]|' + '//tf-dialog[@style]//tf-button[normalize-space(.)="' + btnName + '"]';

  return element(by.xpath(xpathButton));
};

/**
 * @function getXIconForGivenCellReference
 * @description This function is used to get reference of "X" icon when you hover over symbol in "Identifier" column
 * @param cellReference {Obj} Reference of cell on which mouse hover action has to be performed
 * @param identifierName {String} Symbol/Identifier name for which "X" icon reference is required
 * @returns {Promise} Promise which resolves to reference of "X" icon
 */
AnalyticsOverrideEditor.prototype.getXIconForGivenCellReference = function(cellReference, identifierName) {
  // Hover over given cell reference
  browser.actions().mouseMove(cellReference).perform();

  // Get xpath of "X" icon
  var xpathIcon = this.gridXpath + '//*[normalize-space(.)="' + identifierName + '"]//*[contains(@class, "remove")]';

  return element(by.xpath(xpathIcon));
};

/**
 * @function getAllRows
 * @description This function is used to get JSon object of all the rows from the grid.
 * @param {boolean} [isCount = false] If set to TRUE, promise resolves to number of rows in grid
 * @returns {promise} Promise which resolves to either JSon object of rows or number of rows in grid
 */
AnalyticsOverrideEditor.prototype.getAllRows = function(isCount) {

  // Variable(s)
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var xpathTile = this.gridXpath;
  var options = {
    gridXpath: xpathTile,
  };

  // Setting the default value of "isCount" parameter
  if (isCount === undefined) {
    isCount = false;
  }

  browser.executeScript(function(options) {
    var gridXpath = options.gridXpath;
    var grid = angular.element(document.evaluate(gridXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue).controller('tfSlickGrid').grid;

    return grid.getData().getItems();
  }, options).then(function(rows) {
    if (!isCount) {
      defer.fulfill(rows);
    } else {
      defer.fulfill(rows.length);
    }
  });

  return promise;
};

/**
 * @function getColumnNames
 * @description Use this function to get the names of all the columns from the calculated report
 * @returns {Promise} Promise which resolves to array holding column names
 */
AnalyticsOverrideEditor.prototype.getColumnNames = function() {
  // Variable(s)
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var arrColNames = [];
  var xpathTile = this.gridXpath;
  var options = {
    gridXpath: xpathTile,
  };

  browser.executeScript(function(options) {
    var gridXpath = options.gridXpath;
    var grid = angular.element(document.evaluate(gridXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue).controller('tfSlickGrid').grid;

    return grid.getColumns();
  }, options).then(function(cols) {
    for (var i = 0; i < cols.length; i++) {
      arrColNames.push(cols[i].name);
    }

    defer.fulfill(arrColNames);
  });

  return promise;
};

/**
 * @function getColumnIndex
 * @description Use this function to get the index of required column
 * @param colName {String} Name of the column whose index is required
 * @returns {Promise} Promise which resolves to the index of required column
 */
AnalyticsOverrideEditor.prototype.getColumnIndex = function(colName) {
  // Variable(s)
  var defer = protractor.promise.defer();
  var promise = defer.promise;

  // Get all column names
  this.getColumnNames().then(function(colNames) {
    for (var i = 0; i < colNames.length; i++) {
      if (colNames[i] === colName) {
        defer.fulfill(i);
        break;
      }
    }
  });

  return promise;
};

/**
 * @function getRowData
 * @description Use this function to get all the values from the row
 * @param rowNumber {Number} Row number for which row data is required.
 * @returns {Promise} Promise which resolves to array holding row values
 */
AnalyticsOverrideEditor.prototype.getRowData = function(rowNumber) {
  // Variable(s)
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var rowData = [];
  var xpathTile = this.gridXpath;
  var _this = this;

  // Get column Names
  _this.getColumnNames().then(function(colNames) {
    colNames.forEach(function(name, index) {
      var options = {
        gridXpath: xpathTile,
        rowIndex: rowNumber,
        colIndex: index,
      };

      browser.executeScript(function(options) {
        var gridXpath = options.gridXpath;
        var grid = angular.element(document.evaluate(gridXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue).controller('tfSlickGrid').grid;

        // Get the cell into visibility
        grid.scrollRowIntoView(options.rowIndex);

        return grid.getCellNode(options.rowIndex, options.colIndex);
      }, options).then(function(cellRef) {
        cellRef.getText().then(function(text) {
          rowData.push(text);
        });
      });
    });
  }).then(function() {
    defer.fulfill(rowData);
  });

  return promise;
};

/**
 * @function getCellReference
 * @description Use this function to get the reference of required cell
 * @param rowNumber {Number} Row number from which cell reference is required
 * @param colName {String} Name of the column in which required cell is present
 * @returns {Promise} Promise which resolves to the reference of required cell
 */
AnalyticsOverrideEditor.prototype.getCellReference = function(rowNumber, colName) {
  // Variable(s)
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var rowData = [];
  var xpathTile = this.gridXpath;
  var _this = this;

  // Get column Names
  _this.getColumnIndex(colName).then(function(colIndex) {
    var options = {
      gridXpath: xpathTile,
      rowIndex: rowNumber,
      colIndex: colIndex,
    };

    browser.executeScript(function(options) {
      var gridXpath = options.gridXpath;
      var grid = angular.element(document.evaluate(gridXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue).controller('tfSlickGrid').grid;

      // Get the cell into visibility
      grid.scrollRowIntoView(options.rowIndex);

      return grid.getCellNode(options.rowIndex, options.colIndex);
    }, options).then(function(cellRef) {
      defer.fulfill(cellRef);
    });
  }).then(function() {
    defer.fulfill(rowData);
  });

  return promise;
};

/**
 * @function scrollToRowNumber
 * @description Use this functon to scroll required row into visibility
 * @param rowNumber {Number} Row number which has to be scroll into visibility
 * @returns {*} NA
 */
AnalyticsOverrideEditor.prototype.scrollToRowNumber = function(rowNumber) {
  // Variable(s)
  var xpathTile = this.gridXpath;
  var options = {
    gridXpath: xpathTile,
    rowIndex: rowNumber,
  };

  browser.executeScript(function(options) {
    var gridXpath = options.gridXpath;
    var grid = angular.element(document.evaluate(gridXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue).controller('tfSlickGrid').grid;

    // Get the cell into visibility
    grid.scrollRowIntoView(options.rowIndex);
  }, options);
};

/**
 * @function getSelectedRows
 * @description Use this function to get row numbers of all the selected row from the grid
 * @returns {Promise} Promise which resolves to array holding row numbers which are selected
 */
AnalyticsOverrideEditor.prototype.getSelectedRows = function() {
  // Variable(s)
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var xpathTile = this.gridXpath;
  var options = {
    gridXpath: xpathTile,
  };

  browser.executeScript(function(options) {
    var gridXpath = options.gridXpath;
    var grid = angular.element(document.evaluate(gridXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue).controller('tfSlickGrid').grid;

    return grid.getSelectionModel().getSelectedRows();
  }, options).then(function(rows) {
    defer.fulfill(rows);
  });

  return promise;
};

module.exports = new AnalyticsOverrideEditor();
