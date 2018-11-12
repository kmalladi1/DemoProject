'use strict';

var CreateEditCustomColumns = function() {
  this.xpathDialog = '//*[@role="dialog" and descendant::*[normalize-space(.)="Columns"]]';
  this.xpathLoadingBox = '//*[@class="tf-alert-loading"]';
  this.xpathNewReference = '//pa-tile-new-ref-form';
  this.xpathTextBoxFromCreateEditCustomLot = '//*[normalize-space(.)="replacingText"]//ancestor::tf-textbox';
  this.xpathOfFormulaTextArea = '//*[@data-qa-id="columns-list"]';
  this.xpathClick = '//tf-dialog//*[normalize-space(.)="Reference Calculation:"]/*';
  this.xpathTextArea = '//*[@data-qa-id="fl-workspace-codemirror"]';
  this.xpathOfFormulaSectionDropdown = '//*[@data-qa-id="splash-page-tile"]//*[normalize-space(.)="replacingText"]';
  this.xpathOfTypeahead = '//*[@data-qa-class="fl-data-item"]//*[@data-qa-class="fl-data-item-detail"]//ancestor::tf-typeahead-2ditem-value';
  this.xpathOfArgumentsTile = '//*[@data-qa-id="tabbed-arguments-tile"]//tf-tabs';
  this.xpathOfTextBox = '//tf-tile//*[contains(.,"replacingText")]/tf-textbox';
  this.xpathOfTextboxDropdownButton = '//tf-tile//*[contains(.,"replacingText")]/tf-textbox//*[@tf-button]';
  this.xpathOfPanel = '//tf-dropdown//tf-panel';
  this.xpathOfPanelTextbox = '//tf-panel//tf-textbox';
  this.xpathOfOkOrCancelButton = '//tf-panel-footer//tf-button[normalize-space(.)="OK"]';
  this.xpathOfGroupInAvailableSection = '//*[@data-qa-id="fl-data-items-categories"]';
  this.xpathOfSelectedSectionItem = '//*[@data-qa-id="fl-data-items-list"]';
  this.xpathOfBrowseButton = '//*[@data-qa-class="btn-browse-formula"]';
};

/****************************************************************************************/
/* Function: isDialogPresent                                                            */
/* Description: This function is used to get the reference of "Columns" dialog which    */
/*              appears on selecting "New/Reference" from "Columns" option.             */
/* Return: Returns the promise which resolves TRUE if dialog box is present otherwise   */
/*         FALSE.                                                                       */
/****************************************************************************************/
CreateEditCustomColumns.prototype.isDialogPresent = function() {
  return element(by.xpath(this.xpathDialog)).isPresent();
};

/****************************************************************************************/
/* Function: getDialogTitle                                                             */
/* Description: This function is used to get title of the dialog box which appears on   */
/*              selecting "New/Reference" option from "Columns" option.                 */
/* Return: Returns the promise which resolves to the title of the dialog box.           */
/****************************************************************************************/
CreateEditCustomColumns.prototype.getDialogTitle = function() {
  var xpathDialogTitle = '//*[@role="dialog"]//*[contains(@class, "dialog-title") and @id]';
  return element(by.xpath(xpathDialogTitle)).getText();
};

/**
 * @function getDirectChildOfGroupInAvailableSection
 * @description This function is used to get reference of direct child element.
 * @param {string} groupName: Name of the parent.
 * @param {string} childName: Name of the chiled element.
 * @return Returns the reference of child element.
 */

CreateEditCustomColumns.prototype.getDirectChildOfGroupInAvailableSection = function(groupName, childName) {

  var xpathOfParent = '//tf-listbox[contains(@class, "categoryTree")]//tf-listbox-item//*[contains(., "' + groupName + '")]';
  var xpathOfChild = xpathOfParent + '/parent::*//tf-listbox-item//*[contains(., "' + childName + '")]';
  return element.all(by.xpath(xpathOfChild));
};

/****************************************************************************************/
/* Function: getButton                                                                  */
/* Description: This function is used to get reference of "Save" or "Cancel" button     */
/*              reference.                                                              */
/* Params: btnName -> Name of the button whose reference is required.                   */
/*         Ex: "Save" or "Cancel".                                                      */
/* Return: Returns the reference of button from "Columns" window.                       */
/****************************************************************************************/
CreateEditCustomColumns.prototype.getButton = function(btnName) {
  var xpathButton = '//tf-dialog//tf-button[normalize-space(.)="' + btnName + '"]';
  return element(by.xpath(xpathButton));
};

/****************************************************************************************/
/* Function: getRadioButton                                                             */
/* Description: This function is used to get reference of radio button from the window. */
/* Params: btnName -> Name of the button whose reference is required.                   */
/*         Ex: "New", "Reference", "Client", "Personal" or "Super Client".              */
/* Return: Returns the reference of radio button from "Columns" window.                 */
/****************************************************************************************/
CreateEditCustomColumns.prototype.getRadioButton = function(btnName) {
  // Variable(s)
  var xpathRadioButton;

  if (btnName.toLowerCase() === 'new' || btnName.toLowerCase() === 'reference') {
    xpathRadioButton = '//*[@data-qa-id="' + btnName.toLowerCase() + '-radio-button"]/tf-radio-control';
  } else {
    xpathRadioButton = '//*[@data-qa-id="radio-button-' + btnName.toLowerCase().replace(/\s/g, '-') + '"]/tf-radio-control';
  }

  return element(by.xpath(xpathRadioButton));
};

/****************************************************************************************/
/* Function: getTab                                                                     */
/* Description: This function is used to get reference of tab from "Columns" window.    */
/* Params: tabName -> Name of the tab whose reference is required.                      */
/*         Ex: "Formula" or "Sort Formula"                                              */
/* Return: Returns the reference of tab from "Columns" window.                          */
/****************************************************************************************/
CreateEditCustomColumns.prototype.getTab = function(tabName) {
  var xpathTab = '//tf-tab[@data-qa-id="' + tabName.toLowerCase().replace(/\s/g, '-') + '-tab"]';
  return element(by.xpath(xpathTab));
};

/****************************************************************************************/
/* Function: getTabTextArea                                                             */
/* Description: This function is used to get reference of text area reference of a      */
/*              particular tab.                                                         */
/* Return: Returns the reference of text area of specified tab from "Columns" window.   */
/* NOTE: For FORMULA tab, it gets the reference of text area where columns are added.   */
/****************************************************************************************/
CreateEditCustomColumns.prototype.getTabTextArea = function() {
  // Variable(s)
  var xpathTextArea = '//*[@data-qa-id="fl-workspace-codemirror"]';
  return element(by.xpath(xpathTextArea));
};

/****************************************************************************************/
/* Function: getNameField                                                               */
/* Description: This function is used to get reference of "Name" field.                 */
/* Return: Returns the reference of "Name" field from "Columns" window.                 */
/****************************************************************************************/
CreateEditCustomColumns.prototype.getNameField = function() {
  var xpathNameField = '//*[@data-qa-id="name-input-box"]//input';
  return element(by.xpath(xpathNameField));
};

/****************************************************************************************/
/* Function: getAllColumnsFromFormulaTab                                                */
/* Description: This function is used to get reference of all columns from the          */
/*              Formula tab.                                                            */
/* Return: Returns the reference of all the elements from the Formula tab.              */
/* Note: This column list will appear only when "Reference" radio button is selected.   */
/****************************************************************************************/
CreateEditCustomColumns.prototype.getAllColumnsFromFormulaTab = function() {
  var xpathColumn = '//*[@data-qa-id="columns-list"]//*[@data-qa-class="column-item"]';
  return element.all(by.xpath(xpathColumn));
};

/****************************************************************************************/
/* Function: getColumnFromFormulaTab                                                    */
/* Description: This function is used to get reference of specific column from the      */
/*              FORMULA tab.                                                            */
/* Params: colName -> Name of the column whose reference is needed.                     */
/* Return: Returns the reference of required column.                                    */
/****************************************************************************************/
CreateEditCustomColumns.prototype.getColumnFromFormulaTab = function(colName) {
  var xpathColumn = '//*[@data-qa-id="columns-list"]//*[@data-qa-class="column-item" and normalize-space(.)="' + colName + '"]';
  return element(by.xpath(xpathColumn));
};

/****************************************************************************************/
/* Function: getButtonFromFormulaTab                                                    */
/* Description: This function is used to get reference of button from FORMULA tab.      */
/* Params: btnName -> Name of the button whose reference is needed.                     */
/*         Ex: Add, Equity Formula Lookup or Fixed Income Formula Lookup                */
/* Return: Returns the reference of required button.                                    */
/****************************************************************************************/
CreateEditCustomColumns.prototype.getButtonFromFormulaTab = function(btnName) {
  // Variable(s)
  var xpathButton;

  if (btnName.toLowerCase() === 'add') {
    xpathButton = '//*[@id="refFormulaPlaceholder"]//*[@data-qa-id="button-add"]';
  } else {
    xpathButton = '//*[@id="new-ref-formula"]' +
      '//*[@data-qa-class="button-' + btnName.toLowerCase().replace(/\s/g, '-') + '"]';
  }

  return element(by.xpath(xpathButton));
};

/****************************************************************************************/
/* Function: getReferenceCalculationDropDown                                            */
/* Description: This function is used to get reference of "Reference Calculation" drop  */
/*              down.                                                                   */
/* Return: Returns the reference of "Reference Calculation" drop down.                  */
/****************************************************************************************/
CreateEditCustomColumns.prototype.getReferenceCalculationDropDown = function() {
  var xpathDropDown = '//*[@data-qa-id="dropdown-reference-calculation"]//tf-button';
  return element(by.xpath(xpathDropDown));
};

/*********************************************************************************************************/
/* Function: getSubDirectoryDropDown                                                                     */
/* Description: This function is used to get reference of Sub directory dropdown from                    */
/*                   "Create/Edit Custom Dialog" dialog.                                                 */
/* Return: Promise which resolves to reference of sub directory drop down.                               */
/*********************************************************************************************************/
CreateEditCustomColumns.prototype.getSubDirectoryDropDown = function() {
  var xpathSubDirectoryButton = '//*[@data-qa-id="dropdown-sub-directory"]//tf-button';
  return element(by.xpath(xpathSubDirectoryButton));
};

/****************************************************************************************/
/* Function: getOptionFromDropDown                                                      */
/* Description: This function is used to get reference option from drop down.           */
/* Return: Returns the reference of required option from drop down.                     */
/****************************************************************************************/
CreateEditCustomColumns.prototype.getOptionFromDropDown = function(optionName) {
  var xpathOption = '//tf-dropdown//*[@data-qa-class="reference-calculation-item" and normalize-space(.)="' + optionName + '"]';
  return element(by.xpath(xpathOption));
};

/****************************************************************************************/
/* Function: getErrorMessage                                                            */
/* Description: This function is used to get the error message from Columns dialog.     */
/* Return: Returns promise which resolves to the error message.                         */
/****************************************************************************************/
CreateEditCustomColumns.prototype.getErrorMessage = function() {
  var xpathError = '//*[@data-qa-id="formula-error-message"]';
  return element(by.xpath(xpathError)).getText();
};

/**
 * @function getAllColumnNames
 * @description This function is used to get the names of all coulmns from slickgrid.
 * @returns {Promise[]} Promise which resolves to name of all the columns.
 */
CreateEditCustomColumns.prototype.getAllColumnNames = function() {
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

/**
 * @function getColumnData
 * @description This function is used to get all data of a particular column from slickgrid.
 * @param {string} colName name of the column from which data is required
 * @returns {Promise[]}  Promise which resolves to the array of column data.
 */
CreateEditCustomColumns.prototype.getColumnData = function(colName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var colData = [];
  var _this = this;
  var options;
  _this.getColumnIndex(colName).then(function(colIndex) {
    _this.getDataView().then(function(dataView) {
      dataView.forEach(function(temp, index) {
        options = {
          rowIndex: index,
          colIndex: colIndex,
        };
        browser.driver.executeScript(function(options) {
          var slickObject = $('.tf-slick-grid:eq(1)').data('$tfSlickGridController').grid;
          slickObject.scrollCellIntoView(options.rowIndex, options.colIndex);
          return slickObject.getCellNode(options.rowIndex, options.colIndex);
        }, options).then(function(cellRef) {
          cellRef.getText().then(function(text) {
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

/**
 * @function getColumnIndex
 * @description This function is used to get the index of the column whose name is provided.
 * @param {string} colName name of the column whose index required
 * @returns {Promise[]}  Promise which resolves to index of the column.
 */
CreateEditCustomColumns.prototype.getColumnIndex = function(colName) {
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
 * @function getDataView
 * @description This function is used to get the data view from slickgrid.
 * @returns {Promise[]} Promise which resolves to an array of JSON objects of rows of data from slickgrid.
 */
CreateEditCustomColumns.prototype.getDataView = function() {
  var defer = protractor.promise.defer();
  var promise = defer.promise;

  browser.driver.executeScript(function() {
    var slickObject = $('.tf-slick-grid:eq(1)').data('$tfSlickGridController');
    var data = slickObject.grid.getData().getItems();
    return data;
  }).then(function(dataView) {
    defer.fulfill(dataView);
  });

  return promise;
};

/**
 * @function getRowIndex
 * @description This function is used to get index of row dynamically  when a row name  is provided.
 * @param {string} rowName Name of the row whose index is required.
 * @param {string} colName Name of the column.
 * @returns {Promise[]}  Returns promise which resolved to index of row.
 */
CreateEditCustomColumns.prototype.getRowIndex = function(rowName, colName) {
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

/**
 * @function getCellReference
 * @description This function is used to get the reference of specific cell.
 * @param rowIndex Index of row.
 * Example: 0,1.
 * @param colmnName Name of column.
 * Example: Key/ Value.
 * @returns {Promise[]} Promise which resolves to name of all the columns.
 */
CreateEditCustomColumns.prototype.getCellReference = function(rowIndex, colmnName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var _this = this;

  _this.getColumnIndex(colmnName).then(function(colIndex) {
    browser.driver.executeScript('return $( ".tf-slick-grid:eq(1)" ).data( "$tfSlickGridController" )' +
      '.grid.getCellNode( arguments[0], arguments[1] )', rowIndex, colIndex).then(function(ref) {
      defer.fulfill(ref);
    });

  });

  return promise;
};

/**
 * @function getInputBoxFromSlickGridRow
 * @description This function is used to get the reference of input box from slickgrid.
 * @returns {Promise} Promise which resolve the reference of input box.
 */
CreateEditCustomColumns.prototype.getInputBoxFromSlickGridRow = function() {
  return element(by.xpath('//tf-dialog//*[contains(@class,"slick-row")]//input'));
};

/**
 * @function getRemoveIconFromSlickgrid
 * @description This function is used to get the reference of remove icon from slickgrid.
 * @returns {Promise} Promise which resolve the reference of remove icon.
 */
CreateEditCustomColumns.prototype.getRemoveIconFromSlickgrid = function() {
  return element(by.xpath('//tf-dialog//*[contains(@class,"slick-row")]//*[contains(@class, "remove")]'));
};

module.exports = new CreateEditCustomColumns();
