'use strict';
var STUSolverPage = function() {
};

/********************************************************************************************/
/* Function: getInputBox                                                                    */
/* Description: This function is used to get reference of any input box of Solver utility   */
/*              page.                                                                       */
/*                                                                                          */
/* Params: 1. inputboxName -> Specifies the name of input box whose reference is needed     */
/*          Example: 'Date', 'Value', 'Currency Value'                                      */
/*                                                                                          */
/* Return: Returns promise which resolves to reference of specified input box.              */
/********************************************************************************************/
STUSolverPage.prototype.getInputBox = function(inputboxName) {
  var xpathInput = '//*[contains( @data-qa-id,"input-' + inputboxName.toLowerCase().replace(/\s/g, '-') + '")]//input';
  return element(by.xpath(xpathInput));
};

/********************************************************************************************/
/* Function: getDropDown                                                                    */
/* Description: This function is used to get reference of any dropdown of Solver utility    */
/*              page.                                                                       */
/*                                                                                          */
/* Params: 1. dropDownName -> Specifies the name of input box whose reference is needed     */
/*          Example: 'Additional Cash', 'Target', 'Trade/Cash Offset', 'Value Type', 'Date' */
/*                                                                                          */
/* Return: Returns promise which resolvea to the reference of specified dropdown.           */
/********************************************************************************************/
STUSolverPage.prototype.getDropDown = function(dropDownName) {
  var xpathDropDown;
  if (dropDownName.toLowerCase() === 'additional cash') {
    xpathDropDown = '//*[@data-qa-id="section-iso"]//*[@data-qa-class="dropdown-currency"]//tf-button' +
      '/ancestor ::tf-dropdown-handle';
  } else if (dropDownName.toLowerCase() === 'trade/cash offset') {
    xpathDropDown = '//*[@data-qa-id="section-trade-cash-offset"]//*[@data-qa-class="dropdown-currency"]//tf-button' +
      '/ancestor ::tf-dropdown-handle';
  } else if (dropDownName.toLowerCase() === 'date') {
    xpathDropDown = '//*[@data-qa-class="dropdown-date"]//tf-button' +
      '/ancestor ::tf-dropdown-handle';
  } else if (dropDownName.toLowerCase() === 'portfolio') {
    xpathDropDown = '//*[@data-qa-class="dropdown-portfolio"]//tf-button' +
      '/ancestor ::tf-dropdown-handle';
  } else {
    xpathDropDown = '//*[@data-qa-id="dropdown-' + dropDownName.toLowerCase().replace(/\s/g, '-') + '"]//tf-button' +
      '/ancestor ::tf-dropdown-handle';
  }

  return element(by.xpath(xpathDropDown));
};

/********************************************************************************************/
/* Function: getButton                                                                      */
/* Description: This function is used to get the reference of specified icon button of      */
/*             Solver utility page.                                                         */
/*                                                                                          */
/* Params: 1. iconButtonName : specifies the name of button name whose reference is needed  */
/*         Example: 'Delete All', 'Clear', 'Calculate', 'Apply&Close'                       */
/*         2. sectionName : specifies the name of section in which button is available. It  */
/*           is a optional input.                                                           */
/*         Example: 'Sell List', 'Buy List', 'Trade Preview'                                */
/*                                                                                          */
/* Return: Promise which resolves to reference of specified icon button                      */
/********************************************************************************************/
STUSolverPage.prototype.getButton = function(iconButtonName, sectionName) {
  var xpathButton = '//*[@data-qa-id="button-' + iconButtonName.toLowerCase().replace(/[&\s/\/]/g, '-') + '"]';
  if (sectionName !== undefined) {
    xpathButton = '//*[@data-qa-id="section-' + sectionName.toLowerCase().replace(/\s/g, '-') + '"]' + xpathButton;
  }

  return element(by.xpath(xpathButton));
};

/********************************************************************************************/
/* Function: getAllSymbolsFromList                                                          */
/* Description: This function is used to get the reference of all the elements from         */
/*              specified list section.                                                     */
/*                                                                                          */
/* Params: 1. listName -> specifies the name of the list whose symbols are needed           */
/*          Example: 'Sell List', 'Buy List'                                                */
/*         2. rowClassName -> Name of the class from DOM in which all the row names exists. */
/*         Example : 'slick-pane slick-pane-top slick-pane-left'                            */
/*                   'slick-pane slick-pane-top slick-pane-right'                           */
/*                                                                                          */
/* Return: Promise which resolves to array of references of elements from specified list.   */
/********************************************************************************************/
STUSolverPage.prototype.getAllSymbolsFromList = function(listName, rowClassName) {
  var xpathElements;
  if (listName.toLowerCase() === 'sell list' || listName.toLowerCase() === 'trade preview') {
    xpathElements = '//*[@data-qa-id="section-' + listName.toLowerCase().replace(/\s/g, '-') + '"]' +
      '//*[@class="' + rowClassName + '"]//*[contains( @class,"slick-cell ")]';
  } else if (listName.toLowerCase() === 'buy list') {
    xpathElements = '//*[@data-qa-id="section-buy-list"]//*[@class="' + rowClassName + '"]' +
      '//*[contains( @class,"slick-cell l1 r1")]';
  }

  return element.all(by.xpath(xpathElements));
};

/********************************************************************************************/
/* Function: getCellValueOfColumn                                                           */
/* Description: This function is used to get the reference of a cell value of specified     */
/*              Column and Row                                                              */
/*                                                                                          */
/* Params: 1. listName -> specifies the name of the list whose cell value is required       */
/*         Example: 'Sell List', 'Buy List'                                                 */
/*         2. rowName -> specifies the name of the row whose cell reference is needed       */
/*         Example: '25466AB', '3133XUMS'                                                   */
/*         3.rowClassName -> specifies the class from DOM in which all the row names exists.*/
/*         Example: 'slick-pane slick-pane-top slick-pane-left'                             */
/*         4. colsClassName -> specifies the class from DOM in which required column exists.*/
/*         Example: 'slick-pane slick-pane-top slick-pane-right'                            */
/*                                                                                          */
/* Return: Promise which resolves to reference of required cell with in a specified row of  */
/*         list.                                                                            */
/********************************************************************************************/
STUSolverPage.prototype.getAllElementsFromRow = function(listName, rowName, rowClassName, colClassName) {
  var defer = protractor.promise.defer();
  var xpathRow;
  var rowReference;
  var xpathCol;
  var cellReference;
  var promise = defer.promise;

  // Set values for optional parameter
  if (rowClassName === undefined) {
    rowClassName = 'slick-pane slick-pane-top slick-pane-left';
  }

  if (colClassName === undefined) {
    colClassName = 'slick-pane slick-pane-top slick-pane-right';
  }

  // XPATH of required row
  xpathRow = '//*[@data-qa-id="section-' + listName.toLowerCase().replace(/\s/g, '-') + '"]//*[contains' +
    '( @class,"' + rowClassName + '")]//*[contains(@class,"slick-row") and descendant::*[normalize-space(.)="' + rowName + '"]]';

  // Get the reference of required row
  rowReference = element(by.xpath(xpathRow));
  rowReference.isPresent().then(function(isRowPresent) {
    if (!isRowPresent) {

      // If required row is not found reject the promise with error message
      defer.reject('"' + rowName + '" row is not found in the list');
    } else {
      // Get the "style" attribute value of the row
      rowReference.getAttribute('style').then(function(attrValue) {
        // XPATH for required column
        xpathCol = '//*[@data-qa-id="section-' + listName.toLowerCase().replace(/\s/g, '-') + '"]' +
          '//*[contains( @class, "' + colClassName + '")]//div[@style="' + attrValue.replace(/[\s;]/g, '') + '"]' +
          '/*[contains(@class,"slick-cell")][text()]';
        cellReference = element.all(by.xpath(xpathCol));
        defer.fulfill(cellReference);
      });
    }
  });
  return promise;
};

/********************************************************************************************/
/* Function: getCellValueOfColumn                                                           */
/* Description: This function is used to get the reference of a cell value of specified     */
/*              Column and Row                                                              */
/*                                                                                          */
/* Params: 1. listName -> specifies the name of the list whose cell value is required       */
/*         Example: 'Sell List', 'Buy List'                                                 */
/*         2. symbolName -> specifies the name of the row whose cell reference is needed    */
/*         Example: '25466AB', '3133XUMS'                                                   */
/*         2. colName  -> specifies the column name whose cell reference is needed          */
/*         Example: 'ISO', 'Price'                                                          */
/*         3. rowClass -> specifies the class from DOM in which all the row names exists.   */
/*         Example: 'slick-pane slick-pane-top slick-pane-left'                             */
/*         4. colsClass -> specifies the class from DOM in which required column exists.    */
/*         Example: 'slick-pane slick-pane-top slick-pane-right'                            */
/*                                                                                          */
/* Return: Promise which resolves to reference of required cell with in a specified row of  */
/*         list.                                                                            */
/********************************************************************************************/
STUSolverPage.prototype.getCellValueOfColumn = function(listName, symbolName, colName, rowClass, colClass) {
  var defer = protractor.promise.defer();
  var xpathRow;
  var rowReference;
  var xpathCol;
  var cellReference;
  var promise = defer.promise;
  var _this = this;

  // Set values for optional parameter
  if (rowClass === undefined) {
    rowClass = 'slick-pane slick-pane-top slick-pane-left';
  }

  if (colClass === undefined) {
    colClass = 'slick-pane slick-pane-top slick-pane-right';
  }

  // XPATH of required row
  xpathRow = '//*[@data-qa-id="section-' + listName.toLowerCase().replace(/\s/g, '-') + '"]//*[contains( @class,"' + rowClass + '")]' +
    '//*[contains(@class,"slick-row") and descendant::*[normalize-space(.)="' + symbolName + '"]]';

  // Get the reference of required row
  rowReference = element(by.xpath(xpathRow));
  rowReference.isPresent().then(function(isRowPresent) {
    if (!isRowPresent) {

      // If required row is not found reject the promise with error message
      defer.reject('"' + symbolName + '" row is not found in the list');
    } else {

      // Get the "style" attribute value of the row
      rowReference.getAttribute('style').then(function(attrValue) {
        // XPATH for required column
        xpathCol = '//*[@data-qa-id="section-' + listName.toLowerCase().replace(/\s/g, '-') + '"]' +
          '//*[contains( @class, "' + colClass + '")]//div[@style="' + attrValue.replace(/[\s;]/g, '') + '"]';

        var colIndex;
        _this.getColumnIndex(listName, colName).then(function(value) {
          if (listName.toLowerCase() === 'buy list') {
            colIndex = value + 1;
          } else {
            colIndex = value;
          }

          xpathCol += '/*[contains(@class, "slick-cell l' + colIndex + ' r' + colIndex + '")]';

          // Get the reference required cell
          cellReference = element(by.xpath(xpathCol));

          defer.fulfill(cellReference);
        });
      });
    }
  });
  return promise;
};

/********************************************************************************************/
/* Function: setSymbolInList                                                                */
/* Description: This function is used to set the symbol value in specified list section     */
/*                                                                                          */
/* Params: 1. listName -> specifies the name of section where need to set the symbol.       */
/*            Example: 'Sell List', 'Buy List'                                              */
/*         2. colName -> Specifies tha name of the column in the list                       */
/*            example: 'Symbol'                                                             */
/*         3. searchKey -> specifies the search key which is need to be provided in input   */
/*            Example: '25466AAB'                                                           */
/*         4. optionToSelect -> represent the name of option to be select from the type     */
/*            ahead section.                                                                */
/*            Example: 'Discover Bank 7% 15-APR-2020'                                       */
/*         5. categoryToSelect -> specifies the name of the category to be selected from    */
/*            from type a head section.                                                     */
/*            Example: 'Private Company'                                                    */
/*                                                                                          */
/* Return: Returns promise which can be resolved to 'true' if symbol is set else resolves to*/
/*         error message.                                                                   */
/********************************************************************************************/
STUSolverPage.prototype.setSymbolInList = function(listName, colName, searchKey, optionToSelect, categoryToSelect) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var _this = this;
  var symbolInputBox;

  _this.getInputFieldFromSymbolColumn(listName, colName).then(function(xpathRef) {
    symbolInputBox = xpathRef;
    symbolInputBox.clear();

    // Enter the text into the Identifier Input Box
    symbolInputBox.sendKeys(searchKey);
  });

  // Wait for the type ahead list to appear
  Utilities.waitUntilElementAppears(element(by.xpath('//div[contains(@class,"dropdown-wrap opened")]')), 10000);

  var typeAhead = element(by.xpath('//div[contains(@class, "dropdown-wrap opened")]'));
  var refOption = element(by.xpath('//li[@class="idwidget-row" ]/*[@class="idwidget-name"]' +
    '[normalize-space(.)="' + optionToSelect + '"]'));
  var xpathSpinner = element(by.xpath('//*[@data-qa-id="section-' + listName.toLowerCase().replace(/\s/g, '-') + '"]' +
    '//div[@class="stu-spinner-outer"]'));

  typeAhead.isPresent().then(function(listFound) {
    if (!listFound) {
      defer.reject('Type ahead did not appear after typing into the identifier.');
    } else {
      if (categoryToSelect !== undefined) {
        var xpathCategory = '//li[@class="idwidget-header"]/span[normalize-space(.)="' + categoryToSelect + '"]';
        var refCategory = element(by.xpath(xpathCategory));
        refCategory.isPresent().then(function(categoryFound) {
          if (!categoryFound) {
            defer.reject('"' + categoryToSelect + '" is not found in the type ahead.');
          } else {
            // Select the required category
            refCategory.click();

            // wait for element to appear
            browser.driver.wait(function() {
              return refOption.isPresent().then(function(isFound) {
                return isFound;
              });
            }, 4000).then(function() {}, function() {});
          }
        });
      }

      // Find the required option in the type ahead list
      refOption.isPresent().then(function(optionFound) {
        // If required option is not found reject the promise
        if (!optionFound) {
          defer.reject('"' + optionToSelect + '" identifier is not found in the type ahead.');
        } else {
          // Select the required identifier
          refOption.click();
          symbolInputBox.sendKeys(protractor.Key.TAB);

          // Verifying input box disappears after setting
          symbolInputBox.isPresent().then(function(inputFound) {
            if (inputFound) {
              defer.reject('Symbol column input box still found in ' + listName);
            }
          });

          // Wait until loading Icons to disappear.
          Utilities.waitUntilElementDisappears(xpathSpinner, 15000);
          defer.fulfill(true);
        }
      });
    }
  });

  return promise;
};

/********************************************************************************************/
/* Function: getInputFieldFromSymbolColumn                                                  */
/* Description: This function is used to set the symbol value in specified list section     */
/*                                                                                          */
/* Params: 1. listName -> specifies the name of section where need to set the symbol.       */
/*            Example: 'Sell List', 'Buy List'                                              */
/*         2. colName -> Specifies tha name of the column in the list                       */
/*            example: 'Symbol'                                                             */
/*                                                                                          */
/* Return: Returns promise which resolve to the promise which resolves to the reference of  */
/*          the input Field                                                                  */
/********************************************************************************************/
STUSolverPage.prototype.getInputFieldFromSymbolColumn = function(listName, colName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var xpathIdentifier;
  var identifierInputBox;
  var _this = this;
  _this.getColumnIndex(listName, colName).then(function(colIndex) {
    if (listName.toLowerCase() === 'buy list') {
      colIndex = colIndex + 1;
    } else {
      colIndex = colIndex;
    }

    xpathIdentifier = '//*[@data-qa-id="section-' + listName.toLowerCase().replace(/\s/g, '-') + '"]' +
      '//*[contains(@class, "l' + colIndex + ' r' + colIndex + '")][normalize-space(.)=""]';

    identifierInputBox = element(by.xpath(xpathIdentifier));

    Utilities.waitUntilElementAppears(identifierInputBox, 3000);

    // Click on inputbox of Identifier
    browser.actions().doubleClick(identifierInputBox).perform();

    // Clear the default Identifier selected (if exists)
    identifierInputBox = element(by.xpath(
      '//*[@data-qa-id="section-' + listName.toLowerCase().replace(/\s/g, '-') + '"]//input'));

    //return element( by.xpath( identifierInputBox ) );
    defer.fulfill(identifierInputBox);
  });

  return promise;
};

/********************************************************************************************/
/* Function: setISOInList                                                                   */
/* Description: This function is used to set the ISO value in specified list section        */
/*                                                                                          */
/* Params: 1. listName -> specifies the name of section where need to set the symbol.       */
/*            Example: 'Sell List', 'Buy List'                                              */
/*         2. symbolName -> Specifies tha name of the symbol in the list                    */
/*            example: '25466AAB'                                                           */
/*         3. colName -> Specifies tha name of the column in the list                       */
/*            example: 'Symbol'                                                             */
/*         4. optionName -> specifies the option name to be set in drop down                */
/*            Example: 'CAD' or 'Canadian Dollar'                                           */
/*                                                                                          */
/* Return: Returns promise which can be resolved to 'true' if ISO is set else resolves to   */
/*         error message.                                                                   */
/********************************************************************************************/
STUSolverPage.prototype.setISOInList = function(listName, symbolName, colName, optionName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;

  this.getCellValueOfColumn(listName, symbolName, colName).then(function(reference) {
    // Click on input box of Identifier
    browser.actions().doubleClick(reference).perform();
  });

  var refDropDown = element(by.xpath('//*[@data-qa-id="section-' + listName.toLowerCase().replace(/\s/g, '-') + '"]' +
    '//button[contains(@class, "btn-select")]'));
  var xpathSpinner = element(by.xpath('//*[@data-qa-id="section-' + listName.toLowerCase().replace(/\s/g, '-') + '"]' +
    '//div[@class="stu-spinner-outer"]'));
  var dropDownOption = element.all(by.xpath('//*[@class="dropdown-wrap opened"]' +
    '//*[@class="currencyItem" and contains(@data-value, "' + optionName + '")]')).get(0);

  Utilities.waitUntilElementAppears(refDropDown, 5000);

  // Click on dropDown of ISO
  refDropDown.click();
  Utilities.waitUntilElementAppears(dropDownOption, 5000);
  if (optionName === undefined) {
    defer.reject('Please specify the dropdown option to be selected');
  } else {
    dropDownOption.isPresent().then(function(itemFound) {
      if (!itemFound) {
        defer.reject('DropDown item not found');
      } else {
        dropDownOption.click();

        //refDropDown.sendKeys( protractor.Key.TAB );

        // Wait for the spinning Icon to appear.
        browser.driver.wait(function() {
          return refDropDown.isPresent().then(function(isFound) {
            return isFound;
          });
        }, 4000).then(function() {}, function() {});

        // Verifying dropdown disappears after setting
        refDropDown.isPresent().then(function(dropDownFound) {
          if (dropDownFound) {
            defer.reject('Dropdown still appears even after setting the specified option ' + optionName);
          }
        });

        // Wait until loading Icons to disappear.
        Utilities.waitUntilElementDisappears(xpathSpinner, 15000);
        defer.fulfill(true);
      }
    });
  }

  return promise;
};

/********************************************************************************************/
/* Function: setInputInList                                                                 */
/* Description: This function is used to set the input field value in specified list section*/
/*                                                                                          */
/* Params: 1. listName -> specifies the name of section where need to set the symbol.       */
/*            Example: 'Sell List', 'Buy List'                                              */
/*         2. symbolName -> Specifies tha name of the symbol in the list                    */
/*            example: '25466AAB'                                                           */
/*         3. colName -> Specifies tha name of the column in the list                       */
/*            example: 'Symbol'                                                             */
/*         4. inputValue -> value which is need to be set.                                  */
/*            Example: '200'                                                                */
/*         5. rowClass -> specifies the class from DOM in which all the row names exists.   */
/*         Example: 'slick-pane slick-pane-top slick-pane-left'                             */
/*         6. colsClass -> specifies the class from DOM in which required column exists.    */
/*         Example: 'slick-pane slick-pane-top slick-pane-right'                            */
/*                                                                                          */
/* Return: Returns promise which can be resolved to 'true' if input is set else resolves to */
/*         error message.                                                                   */
/********************************************************************************************/
STUSolverPage.prototype.setInputInList = function(listName, symbolName, colName, inputValue, rowClass, colClass) {

  var defer = protractor.promise.defer();
  var promise = defer.promise;

  // Set values for optional parameter
  if (rowClass === undefined) {
    rowClass = 'slick-pane slick-pane-top slick-pane-left';
  }

  if (colClass === undefined) {
    colClass = 'slick-pane slick-pane-top slick-pane-right';
  }

  this.getCellValueOfColumn(listName, symbolName, colName, rowClass, colClass).then(function(reference) {
    // Click on inputbox of Identifier
    browser.actions().doubleClick(reference).perform();

    var xpathInput = '//*[@data-qa-id="section-' + listName.toLowerCase().replace(/\s/g, '-') + '"]//input';
    var inputBox = element(by.xpath(xpathInput));
    var xpathSpinner = element(by.xpath('//*[@data-qa-id="section-' + listName.toLowerCase().replace(/\s/g, '-') + '"]' +
      '//div[@class="stu-spinner-outer"]'));
    Utilities.waitUntilElementAppears(inputBox, 10000);

    inputBox.isPresent().then(function(inputFound) {
      if (!inputFound) {
        defer.reject('Input field not found');
      } else {
        // Click on inputbox
        inputBox.click();

        // Clear the default input value (if exists)
        inputBox.clear();

        // Enter the text into the Input Box
        inputBox.sendKeys(inputValue, protractor.Key.ENTER);

        // Clicking on header element
        element(by.xpath('//*[@data-qa-id="section-sell-list"]')).click();

        // Wait for the spinning Icon to appear.
        browser.driver.wait(function() {
          return xpathSpinner.isDisplayed().then(function(isfound) {
            return isfound;
          }, function() {
            return false;
          });
        }, 4000).then(function() {}, function() {});

        // Wait until loading Icons to disappear.
        Utilities.waitUntilElementDisappears(xpathSpinner, 15000);

        // Verifying if value is entered into the value
        reference.getText().then(function(refValue) {
          refValue = refValue.split('.');
          if (refValue[0] === inputValue) {
            defer.fulfill(true);
          } else {
            defer.fulfill(false);
          }
        });
      }
    });
  });

  return promise;
};

/****************************************************************************************************/
/* Function: getRemoveIcon                                                                          */
/* Description: This function is used to get the reference of removeIcon in specified list          */
/*                                                                                                  */
/* Params: 1. listName -> listName specifies the section in which remove icon is needed            */
/*         2. symbolName -> Specifies tha name of the symbol in the list                           */
/*            example: '25466AAB'                                                                  */
/*                                                                                                 */
/* Returns: Returns promise which resolve to the reference of remove icon from the specified list. */
/***************************************************************************************************/
STUSolverPage.prototype.getRemoveIcon = function(listName, symbolName) {
  var xpathColumn = '//*[@data-qa-id="section-' + listName.toLowerCase().replace(/\s/g, '-') + '"]' +
    '//*[contains( @class,"slick-pane slick-pane-top slick-pane-left")]' +
    '//*[contains(@class,"slick-row") and descendant::*[normalize-space(.)="' + symbolName + '"]]';

  // Hover over the required column
  browser.actions().mouseMove(element(by.xpath(xpathColumn))).perform();

  // XPATH of required column's Edit button
  var xpathRemoveButton = xpathColumn + '//*[contains(@class, "icon-remove")]';

  return element(by.xpath(xpathRemoveButton));
};

/********************************************************************************************/
/* Function: getColumnIndex                                                                 */
/* Description: This function is used to get index of column from specified section of      */
/*              'Solver' page                                                               */
/*                                                                                          */
/* Params: 1. sectionName -> specifies the name of the section whose column index is needed */
/*         Example: 'Sell List', 'Buy List'                                                 */
/*         2. colName -> Name of the specific column whose index are required               */
/*         Example: 'ISO', 'Price', 'Min'                                                   */
/*                                                                                          */
/* Return: Returns promise which resolve to the which resolves index of the given column.    */
/********************************************************************************************/
STUSolverPage.prototype.getColumnIndex = function(sectionName, colName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var _this = this;

  this.getAllColumnsHeader(sectionName).map(function(ele, index) {
    // scroll upto the element visible on screen if not already
    _this.scrollColumnToVisibleInTradePreview(colName);
    return {
      index: index,
      text: ele.getText(),
    };
  }).then(function(items) {
    for (var i = 0; i < items.length; i++) {
      var name = items[i].text.replace(/\n/g, ' ');
      if (colName.indexOf(name) > -1) {
        defer.fulfill(i);
        break;
      }
    }

    defer.reject('"' + colName + '" column not found in the ' + sectionName + ' section');
  });
  return promise;
};

/********************************************************************************************/
/* Function: getAllColumnsHeader                                                            */
/* Description: This function is used to get all column headers of specified section        */
/*                                                                                          */
/* Params: 1. sectionName -> specifies the name of the section whose column index is needed */
/*         Example: 'Sell List', 'Buy List'                                                 */
/*                                                                                          */
/* Return: Returns promise which resolve to the array of references for all column headers  */
/*          of 'Trade Preview' section.                                                     */
/********************************************************************************************/
STUSolverPage.prototype.getAllColumnsHeader = function(sectionName) {
  var xpathColumns = '//*[@data-qa-id="section-' + sectionName.toLowerCase().replace(/\s/g, '-') + '"]' +
    '/*[contains(@class,"stu-grid tf-slick-grid")]//*[contains(@class,"slick-column-name-text")][text()]';
  return element.all(by.xpath(xpathColumns));
};

/********************************************************************************************/
/* Function: getDatePicker                                                                  */
/* Description: This function is used to get the reference of date picker button            */
/*                                                                                          */
/* Params: Not Applicable                                                                   */
/*                                                                                          */
/* Return: Returns promise which resolve to the reference of date picker button.            */
/********************************************************************************************/
STUSolverPage.prototype.getDatePicker = function() {
  var xpathDatePicker = '//*[@data-qa-id="input-date"]//button';
  return element(by.xpath(xpathDatePicker));
};

/********************************************************************************************/
/* Function: getNthColumnName                                                               */
/* Description: This function is used to get reference of Nth column name from the table.   */
/* Params: 1. listName -> Specifies the name of the section whose column index is needed    */
/*         Example: 'Sell List', 'Buy List'                                                 */
/*         2. colNumber -> Position at which this column is present.                        */
/* Return: Promise which resolves to reference of column name at given position.            */
/********************************************************************************************/
STUSolverPage.prototype.getNthColumnName = function(listName, colNumber) {
  //var xpathColumnNames = '//*[contains(@ng-class, "sell-list")]/*[@*="sellData"]//*[contains(@class, "column-name-text")]';
  var xpathColumnNames = '//*[contains(@class, "' + listName.toLowerCase().replace(/\s/g, '-') + '")]' +
    '//*[contains(@class,"slick-header")]//*[contains(@class, "column-name-text")]';
  return element.all(by.xpath(xpathColumnNames)).get(colNumber - 1).getText();
};

/********************************************************************************************/
/* Function: getDropDownOption                                                              */
/* Description: This function is used to get reference of any dropdown option of dropdown   */
/*              of Trader utility page.                                                     */
/*                                                                                          */
/* Params: 1. option -> Specifies the dropDownItem whose reference is needed                */
/*          Example: 'YTM','Modified Duration'                                              */
/*                                                                                          */
/* Return: Returns promise which resolve to the reference of specified dropdown option.     */
/********************************************************************************************/
STUSolverPage.prototype.getDropDownOption = function(option) {
  var xpathOption = '//*[contains(@class, "dd-position") and not( contains( @class, "ng-hide") )]' +
    '//*[@data-qa-class="dropdown-option" and normalize-space(.)="' + option + '"][1]';
  return element(by.xpath(xpathOption));
};

/****************************************************************************************/
/* Function: getOptionFromMonthOrYearDropdown                                           */
/* Description: This function is used to get reference of item from the drop down       */
/* Params: option -> Name of the item whose reference is needed.                        */
/*          Example: 'May','2013'                                                       */
/* Return: Promise which resolves to reference of given item from the drop down list    */
/****************************************************************************************/
STUSolverPage.prototype.getOptionFromMonthOrYearDropdown = function(option) {
  var xpathOption = '//div[@class="dropdown-wrap opened"]//li[contains( text(), "' + option + '" )]';
  return element(by.xpath(xpathOption));
};

/**************************************************************************/
/* Function: getMonthOrYearDropDown                                       */
/* Description: Get the reference of MONTH or YEAR drop down.             */
/* Params :  dropdownName -> Name of the item whose reference is needed.  */
/*          Example: 'month' or 'year'                                    */
/* Return: Promise which resolved to reference of drop down button.       */
/**************************************************************************/
STUSolverPage.prototype.getMonthOrYearDropDown = function(dropDownName) {
  var xpathDropDown = '//*[contains( @class, "calendar-' + dropDownName.toLowerCase() + '-select" )]/button';
  return element(by.xpath(xpathDropDown));
};

/****************************************************************************************/
/* Function: getDayFromCalendar                                                         */
/* Description: Get the reference of particular day                                     */
/* Params: day -> day that you need to get the reference of                             */
/* Return: Promise which resolves to reference of given item from the drop down list    */
/****************************************************************************************/
STUSolverPage.prototype.getDayFromCalendar = function(day) {
  var xpathDay = '//tbody//td[@class="day"][.="' + day + '"]';
  return element(by.xpath(xpathDay));
};

/********************************************************************************************/
/* Function: getDialog                                                                      */
/* Description: This function is used to get reference of any dialog box based on its title.*/
/* Params: 1. titleOfDialog -> Pass the title of dialog box to get its reference.           */
/* Return: Promise which resolves to dialog box reference.                                  */
/********************************************************************************************/
STUSolverPage.prototype.getDialog = function(titleOfDialog) {
  var xpathDialog = '//span[.="' + titleOfDialog + '"]/ancestor::div[@role="dialog"]';
  return element(by.xpath(xpathDialog));
};

/******************************************************************************************/
/* Function: getDialogWithText                                                            */
/* Description: This function is used to get reference of dialog box having the text.     */
/* Params: text -> Text displayed inside the dialog box.                                  */
/* Return: Promise which resolves to the reference of dialog.                             */
/******************************************************************************************/
STUSolverPage.prototype.getDialogWithText = function(text) {
  var xpathDialog = '//*[@role="dialog" and descendant::*[normalize-space(.)=normalize-space("' + text + '")]]';
  return element(by.xpath(xpathDialog));
};

/********************************************************************************************/
/* Function: getAllDropDownOptions                                                          */
/* Description: This function is used to get reference of all dropdown options of dropdown  */
/*              of Trader utility page.                                                     */
/*                                                                                          */
/* Return: Returns promise which resolve to the reference of specified dropdown option.     */
/********************************************************************************************/
STUSolverPage.prototype.getAllDropDownOptions = function() {
  var xpathOption = '//*[contains(@class, "dd-position") and not( contains( @class, "ng-hide") )]' +
    '//*[@data-qa-class="dropdown-option"]';
  return element.all(by.xpath(xpathOption));
};

/*********************************************************************************************/
/* Function: getAlertLoading                                                                 */
/* Description: This function is used to get the reference of 'Loading ' Icon in list        */
/* Params: listName -> Specifies the name of the list whose symbols are needed               */
/*          Example: 'Sell List', 'Buy List'                                                 */
/*                                                                                           */
/* Returns: Returns promise which resolve to the reference of 'Loading Screen' icon.         */
/*********************************************************************************************/
STUSolverPage.prototype.getAlertLoading = function(listName) {
  var getAlertLoading = '//*[@data-qa-id="section-' + listName.toLowerCase().replace(/\s/g, '-') + '"]//div[@class="stu-spinner-outer"]';

  // Adding polling wait to wait for loading symbol to appear
  browser.driver.wait(function() {
    return element(by.xpath(getAlertLoading)).isDisplayed().then(function(isfound) {
      return isfound;
    }, function() {
      return false;
    });
  }, 3000).then(function() {}, function() {});

  return element(by.xpath(getAlertLoading));
};

/********************************************************************************************/
/* Function: getWarningIcon                                                              */
/* Description: This function is used to get reference of list cache alert icon.            */
/* Params:  listName -> specifies the name of the list whose cell value is required         */
/*         Example: 'Sell List', 'Buy List'                                                 */
/* Return: Promise which resolves to the reference of alert icon from the specified list.   */
/* NOTE: You can get the reference only when report is showing the cached data.             */
/********************************************************************************************/
STUSolverPage.prototype.getWarningIcon = function(listName) {
  var xpathAlertIcon = '//*[@data-qa-id="section-' + listName.toLowerCase().replace(/\s/g, '-') + '"]' +
    '//*[@ng-show="dirty && value" and not(contains(@class,"ng-hide"))]';
  return element(by.xpath(xpathAlertIcon));
};

/********************************************************************************************/
/* Function: getWarningInfoText                                                               */
/* Description: This function is used to get text of alert icon.                            */
/* Params:  listName -> specifies the name of the list whose cell value is required         */
/*         Example: 'Sell List', 'Buy List'                                                 */
/* Return: Promise which resolves to the text of alert icon from the specified report.      */
/* NOTE: You can get the text only after clicking on alert icon.                            */
/********************************************************************************************/
STUSolverPage.prototype.getWarningInfoText = function(listName) {
  var xpathAlertInfo = '//*[@data-qa-id="section-' + listName.toLowerCase().replace(/\s/g, '-') + '"]' +
    '//*[@ng-show="dirty && value" and not(contains(@class,"ng-hide"))]/*[@data-qa-class="icon-alert"]' +
    '//*[@class="stu-info-error" and descendant::*[not(contains(@class, "subtitle"))]]';
  return element(by.xpath(xpathAlertInfo)).getText();
};

/********************************************************************************************/
/* Function: getButtonFromPopup                                                              */
/* Description: This function is used get the reference of a button from any pop-up or      */
/*              dialog box.                                                                 */
/* Params: 1. btnName -> Name of the button whose reference is needed.                      */
/*                                                                                          */
/* Return: Promise which resolves to reference of a button.                                 */
/********************************************************************************************/
STUSolverPage.prototype.getButtonFromPopup = function(btnName) {
  var xpathBtn = '//*[@role="dialog"]//button[@type="button"][.="' + btnName + '"]';
  return element(by.xpath(xpathBtn));
};

/********************************************************************************************/
/* Function: scrollColumnToVisibleInTradePreview                                             */
/* Description: This function is used to scroll upto the specified column in                */
/*               Trade Preview section.                                                     */
/* Params: colName: Name of the column that has to get into visibility.                     */
/* Return: NA                                                                               */
/********************************************************************************************/
STUSolverPage.prototype.scrollColumnToVisibleInTradePreview = function(colName) {
  browser.driver.executeScript('return $( ".tf-slick-grid:eq(2)" ).data( "$tfSlickGridController" ).grid.getColumns()')
    .then(function(temp) {
      return temp;
    }).then(function(columns) {
    for (var j = 0; j < columns.length; j++) {
      if (columns[j].name === colName) {
        browser.driver.executeScript('return $( ".tf-slick-grid:eq(2)" ).data( "$tfSlickGridController" )' +
          '.grid.scrollCellIntoView( 1, arguments[0] )', j);
      }
    }
  });
};

module.exports = new STUSolverPage();
