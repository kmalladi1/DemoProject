'use strict';

var STUMainPage = function() {
  this.arrUtilities = ['Trader', 'Solver'];
};

/*********************************************************************************************/
/* Function: switchToWindow                                                                  */
/* Description: This function is used to switch to other application window from one window. */
/*                                                                                           */
/* Params: 1. windowName -> Name of application window which is needed to switch.            */
/*            Example : 'PA3','STU'.                                                         */
/*                                                                                           */
/* Return: Promise which resolves to 'true' if switches to specified window or returns an    */
/*         error message if it fails to switch specified window.                             */
/*********************************************************************************************/
STUMainPage.prototype.switchToWindow = function(windowName) {

  // Variable(s)
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var handlenNum;
  var titleName;

  // Setting the default value of windowName
  if (windowName === 'STU') {
    handlenNum = 1;
    titleName = 'Security Trading Utility';

    // Wait for the STU application window to appear.
    browser.wait(function() {
      return browser.getAllWindowHandles().then(function(handles) {
        return handles.length === 2;
      });
    }, 20000, 'Fails to display STU application window.').then(function() {
    }, function(error) {
      expect(false).customError(error);
      CommonFunctions.takeScreenShot();
    });
  } else {
    handlenNum = 0;
    titleName = 'Portfolio Analysis';
  }

  // Switch to STU application window
  browser.getAllWindowHandles().then(function(handles) {
    if (handles.length >= 1) {
      browser.switchTo().window(handles[handlenNum]).then(function() {
        if (windowName === 'STU') {
          browser.wait(function() {
            return browser.getCurrentUrl().then(function(url) {
              return url.indexOf('#') >= 0;
            });
          }, 120000, 'Fails to load Trader page.');
        }
      }).then(function() {
        browser.getTitle().then(function(title) {
          if (title.indexOf(titleName) > -1) {
            defer.fulfill(true);
          } else {
            defer.reject('Title does not match with "' + titleName + '".');
            CommonFunctions.takeScreenShot();
          }
        });
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    } else {
      defer.reject('Fails to find "' + titleName + '".');
    }
  });

  return promise;
};

/****************************************************************************************/
/* Function: isSTUWindow                                                                */
/* Description: This function is used to verify if the STU App is opened                 */
/* Return: Promise which resolves to boolean value.                                     */
/****************************************************************************************/
STUMainPage.prototype.isSTUWindow = function() {
  var xpathSTUWindow = '//*[@data-qa-id="lhp"]//*[normalize-space(text())="Security Trading Utility"]';
  return (element(by.xpath(xpathSTUWindow)).isPresent());
};

/*********************************************************************************************/
/* Function: getAllColumnsHeader                                                             */
/* Description: This function is used to get all column headers of 'Trade Preview' section   */
/*                                                                                           */
/* Return: Returns the array of references for all column headers of 'Trade Preview' section */
/*********************************************************************************************/
STUMainPage.prototype.getAllColumnsHeader = function() {
  var xpathColumns = '//*[@id="stu-trade-preview"]/*[contains(@class,"stu-grid tf-slick-grid")]' +
    '//*[contains(@class,"slick-column-name-text")][text()]';
  return element.all(by.xpath(xpathColumns));
};

/*********************************************************************************************/
/* Function: getColumnFromTradePreview                                                       */
/* Description: This function is used to get column header of 'Trade Preview' section        */
/* Params: colName -> Name of the specific column whose values are required                  */
/*            Example: 'Identifier', 'Security'                                              */
/*                                                                                           */
/* Return: Returns reference of the column header of 'Trade Preview' section                 */
/*********************************************************************************************/
STUMainPage.prototype.getColumnFromTradePreview = function(colName) {
  var xpathColumn = '//*[@id="stu-trade-preview"]/*[contains(@class,"stu-grid tf-slick-grid")]' +
    '//*[contains(@class,"slick-column-name-text")][normalize-space(text())="' + colName + '"]';
  return element(by.xpath(xpathColumn));
};

/*********************************************************************************************/
/* Function: getAllCellsOfGivenColumn                                                        */
/* Description: This function is used to get reference of all the cells from a particular    */
/*              column of 'Trade Preview' section.                                           */
/*                                                                                           */
/* Params: 1. colName -> Name of the specific column whose values are required               */
/*            Example: 'Identifier', 'Security'                                              */
/*         2. colClassName -> Name of the class from DOM in which all the column names exists*/
/*            Example: 'slick-pane slick-pane-top slick-pane-right',                         */
/*                     'slick-pane slick-pane-top slick-pane-left'                           */
/*                                                                                           */
/* Return: Promise which resolves to the array of cell references from the given column.     */
/*********************************************************************************************/
STUMainPage.prototype.getAllCellsOfGivenColumn = function(colName, colClassName) {
  var defer = protractor.promise.defer();
  var cellReferences;
  var xpathCol;
  var promise = defer.promise;
  this.getColumnIndex(colName).then(function(colIndex) {
    xpathCol = '//*[@id="stu-trade-preview"]/*[contains(@class,"stu-grid tf-slick-grid")]' +
      '//*[contains(@class,"' + colClassName + '")]' +
      '//*[contains(@class,"slick-cell") and contains(@class,"l' + colIndex + ' r' + colIndex + '")]';
    cellReferences = element.all(by.xpath(xpathCol));

    //Utilities.scrollElementToVisibility( cellReferences );
    defer.fulfill(cellReferences);
  });
  return promise;
};

/*********************************************************************************************/
/* Function: getElementFromTradePreview                                                      */
/* Description: This function is used to get reference of all the cells from a particular    */
/*              column of 'Trade Preview' section.                                           */
/*                                                                                           */
/* Params: 1. elementName -> Name of the specific identifier whose values are required       */
/*            Example: '437076BB'                                                            */
/*         2. rowClassName -> Name of the class from DOM in which all the column names exists*/
/*            Example: 'slick-pane slick-pane-top slick-pane-right',                         */
/*                     'slick-pane slick-pane-top slick-pane-left'                           */
/*                                                                                           */
/* Return: Promise which resolves to the element reference from the Trade Preview.           */
/*********************************************************************************************/
STUMainPage.prototype.getElementFromTradePreview = function(elementName, rowClassName) {
  var xpathElement;

  xpathElement = '//*[@id="stu-trade-preview"]/*[contains(@class,"stu-grid tf-slick-grid")]' +
    '//*[contains(@class,"' + rowClassName + '")]' +
    '//*[contains(@class, "slick-row") and descendant::*[normalize-space(.)="' + elementName + '"]][1]';
  return element(by.xpath(xpathElement));
};

/*********************************************************************************************/
/* Function: getColumnIndex                                                                  */
/* Description: This function is used to get index of column from 'Trade Preview' section    */
/*                                                                                           */
/* Params: 1. colName -> Name of the specific column whose values are required               */
/*         Example: 'Price'                                                                  */
/*                                                                                           */
/* Return: Promise which resolves index of the given column.                                 */
/*********************************************************************************************/
STUMainPage.prototype.getColumnIndex = function(colName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  this.getAllColumnsHeader().map(function(ele, index) {
    return {
      index: index,
      text: ele.getText(),
    };
  }).then(function(items) {
    for (var i = 0; i < items.length; i++) {
      var name = items[i].text.replace(/\n/g, ' ');
      if (colName === name) {
        defer.fulfill(i);
        break;
      }
    }

    defer.reject('"' + colName + '" column not found in the Trade Preview');
  });
  return promise;
};

/*********************************************************************************************/
/* Function: getAlertLoading                                                                 */
/* Description: This function is used to get the reference of 'Loading Screen' Icon on page  */
/*                                                                                           */
/* Returns: Returns the reference of 'Loading Screen' icon when page loads                   */
/*********************************************************************************************/
STUMainPage.prototype.getAlertLoading = function() {
  var getAlertLoading = '//div[@class="tf-alert-loading"]|//*[@data-qa-id="section-trade-preview"]//div[@class="stu-spinner-outer"]';

  browser.driver.wait(function() {
    return element(by.xpath(getAlertLoading)).isDisplayed().then(function(isfound) {
      return isfound;
    }, function() {
      return false;
    });
  }, 3000).then(function() {}, function() {});

  return element(by.xpath(getAlertLoading));
};

/*********************************************************************************************/
/* Function: getUtilities                                                                    */
/* Description: This function is used to get the reference of utilities from LHP.            */
/*                                                                                           */
/* Params: 1. utilityName -> Name of the report for which the reference is needed.           */
/*         Example: 'Trader', 'Solver'                                                       */
/*                                                                                           */
/* Return: Promise which resolves to reference of a utility from LHP.                        */
/*********************************************************************************************/
STUMainPage.prototype.getUtilities = function(utilityName) {
  var xpathUtility = '//*[@data-qa-id="lhp"]//*[@data-qa-class="accordion-item" and descendant::*' +
    '//*[normalize-space(.)="' + utilityName + '"]]';
  return element(by.xpath(xpathUtility));
};

/*********************************************************************************************/
/* Function: getUtilitiesHeaderCollapse                                                      */
/* Description: This function is used to get the reference of utilities Header from LHP to   */
/*              expand or collapse the LHP                                                   */
/*                                                                                           */
/* Returns: Promise which resolves to reference of utilities                                 */
/*********************************************************************************************/
STUMainPage.prototype.getUtilitiesHeaderCollapse = function() {
  var xpathUtilitiesHeader = '//*[@data-qa-id="lhp"]//*[@data-qa-class="accordion-category"]' +
    '//tf-navpane-group-heading[normalize-space(.)="Utilities"]';
  return element(by.xpath(xpathUtilitiesHeader));
};

/*********************************************************************************************/
/* Function: getToolBarWrenchIcon                                                            */
/* Description: This function is used to get the reference of wrench icon of STU application */
/*              tool bar                                                                     */
/*                                                                                           */
/* Params: 1. checkForDropDown (Optional) -> Default value is false. When this parameter is  */
/*          set to true function will return the reference of dropdown.                      */
/*         Example: true, false                                                              */
/*                                                                                           */
/* Returns: Promise which resolves to reference of either WRENCH button from STU application */
/*          tool bar or dropdown reference if checkForDropDown parameter is set to true.     */
/*********************************************************************************************/
STUMainPage.prototype.getToolBarWrenchIcon = function(checkForDropDown) {

  // Setting the default parameter
  if (checkForDropDown === undefined) {
    checkForDropDown = false;
  }

  var xpathWrenchIcon = '//*[@data-qa-id="icon-wrench"]//button';
  var xpathWrenchDropDown = xpathWrenchIcon + '/ancestor::*/following-sibling::*[contains(@class,"position-animation")]';
  if (!checkForDropDown) {
    return element(by.xpath(xpathWrenchIcon));
  } else if (checkForDropDown) {
    return element(by.xpath(xpathWrenchDropDown));
  }
};

/*********************************************************************************************/
/* Function: getToolBarDownloadIcon                                                          */
/* Description: This function is used to get the reference of download icon of STU           */
/*              application tool bar                                                         */
/*                                                                                           */
/* Params: 1. checkForDropDown (Optional) -> Default value is false. When this parameter is  */
/*          set to true function will return the reference of dropdown.                      */
/*         Example: true, false                                                              */
/*                                                                                           */
/* Returns: Promise which resolves to reference of either Download icon button from STU      */
/*          application tool bar or dropdown reference if checkForDropDown parameter is set  */
/*          to true.                                                                         */
/*********************************************************************************************/
STUMainPage.prototype.getToolBarDownloadIcon = function(checkForDropDown) {

  // Setting the default parameter
  if (checkForDropDown === undefined) {
    checkForDropDown = false;
  }

  var xpathDownloadIcon = '//*[@data-qa-id="icon-download"]//button';
  var xpathDownloadDropDown = xpathDownloadIcon + '/ancestor::*/following-sibling::*[contains(@class,"position-animation")]';
  if (!checkForDropDown) {
    return element(by.xpath(xpathDownloadIcon));
  } else if (checkForDropDown) {
    return element(by.xpath(xpathDownloadDropDown));
  }
};

/*********************************************************************************************/
/* Function: getToolBarGearIcon                                                              */
/* Description: This function is used to get the reference of gear icon(Options) of STU      */
/*              application toolbar                                                          */
/*                                                                                           */
/* Params: NotApplicable                                                                     */
/*                                                                                           */
/* Returns: Promise which resolves to reference of gear icon                                 */
/*********************************************************************************************/
STUMainPage.prototype.getToolBarGearIcon = function() {
  var xpathGearIcon = '//*[@data-qa-id="icon-gear"]';
  return element(by.xpath(xpathGearIcon));
};

/*********************************************************************************************/
/* Function: getRadioButton                                                                  */
/* Description: This function is used to get the reference of specified radio button         */
/*                                                                                           */
/* Params: 1. buttonName -> specifies the name of the radio button name whose reference is   */
/*         needed.                                                                           */
/*         Example: 'Path', 'Description', 'Comma Separated', 'Point Reversal'               */
/*                                                                                           */
/*Returns: Returns the reference of specified radio button.                                  */
/*********************************************************************************************/
STUMainPage.prototype.getRadioButton = function(buttonName) {
  var xpathRadioButton = '//*[normalize-space(.)="' + buttonName + '"]//*[contains(@data-qa-id, "radio")]';
  return element(by.xpath(xpathRadioButton));
};

/*********************************************************************************************/
/* Function: isDialogPresent                                                                 */
/* Description: This function is used to check if particular dialog box exists or not        */
/*                                                                                           */
/* Params: 1. DialogName -> specifies the name of the dialog box whose presence need to      */
/*          verified.                                                                        */
/*          Example: 'Add/Remove Columns','Options'                                          */
/*                                                                                           */
/* Returns: Return promise which resolve to boolean value. True -> if Dialog box is Present  */
/*          False -> if Dialog box is not Present                                            */
/*********************************************************************************************/
STUMainPage.prototype.isDialogPresent = function(DialogName) {
  var xpathDialog = '//span[.="' + DialogName + '"]/ancestor::div[@role="dialog"]';
  return element(by.xpath(xpathDialog)).isPresent();
};

/*********************************************************************************************/
/* Function: getDialogBoxCloseButton                                                         */
/* Description: This function is used to get the reference of close(X) button of a dialog box*/
/*                                                                                           */
/* Params: 1. DialogName -> specifies the name of the dialog box whose reference of close    */
/*            button of dialog box is needed.                                                */
/*           Example : 'Add/Remove Columns', 'Options'                                       */
/*                                                                                           */
/* Returns: Return promise which resolve to reference of dialog box close button             */
/*********************************************************************************************/
STUMainPage.prototype.getDialogBoxCloseButton = function(DialogName) {
  var xpathDialogClose = '//span[.="' + DialogName + '"]//following-sibling::*[contains(@class,"titlebar-close")]';
  return element(by.xpath(xpathDialogClose));
};

/*********************************************************************************************/
/* Function: getDialogBoxButton                                                              */
/* Description: This function is used to get the reference of specified button of Dialog box */
/*                                                                                           */
/* Params: 1. buttonName -> specifies the name of the button of dialog box whose reference   */
/*         is needed.                                                                        */
/*         Example : 'Ok', 'Save'                                                            */
/*                                                                                           */
/* Returns: Returns promise which resolve to reference of specified dialog box button        */
/*********************************************************************************************/
STUMainPage.prototype.getDialogBoxButton = function(buttonName) {
  var xpathDialogButton = '//*[@dialog-title="\'Options\'"]//*[@data-qa-id="button-' + buttonName.toLowerCase() + '"]';
  return element(by.xpath(xpathDialogButton));
};

/***********************************************************************************************/
/* Function: getTradePreViewHeaderSectionValue                                                 */
/* Description: This function is used to get TradePreView Toolbar(header) Section Value.       */
/*                                                                                             */
/* Params: elementName -> Name of the element in TradePreview toolbar whose reference is needed.*/
/*         Example: 'Residual Cash value is 9,844,078.56 USD'                                  */
/*                                                                                             */
/* Return: Returns the reference of the element.                                               */
/***********************************************************************************************/
STUMainPage.prototype.getTradePreViewHeaderSectionValue = function() {
  var xpathElement = '//*[@data-qa-id="section-trade-preview"]//*[contains(@class,"toolbar-section-left")]';
  return element(by.xpath(xpathElement));
};

/***********************************************************************************************/
/* Function: addColumnInTradePreviewSectoin                                                    */
/* Description: This function is used to get TradePreView Toolbar(header) Section Value.       */
/*                                                                                             */
/* Params: elementName -> Name of the element in TradePreview toolbar whose reference is needed.*/
/*         Example: 'Residual Cash value is 9,844,078.56 USD'                                  */
/*                                                                                             */
/* Return: Returns the reference of the element.                                               */
/***********************************************************************************************/
STUMainPage.prototype.addColumnInTradePreviewSectoin = function() {
  STUSolverPage.getIconButton('Calculate Trades').click();
};

/********************************************************************************************/
/* Function: getCellValueFromTradePreview                                                   */
/* Description: This function is used to get the reference of a cell value of specified     */
/*              Column and Row                                                              */
/*                                                                                          */
/* Params: 1. symbolName -> specifies the name of the row whose cell reference is needed    */
/*         Example: '25466AB', '3133XUMS'                                                   */
/*         2. colName  -> specifies the column name whose cell reference is needed          */
/*         Example: 'ISO', 'Price'                                                          */
/*                                                                                          */
/* Return: Promise which resolves to reference of required cell with in a specified row in  */
/*         trade preview section.                                                           */
/********************************************************************************************/
STUMainPage.prototype.getCellValueFromTradePreview = function(symbolName, colName) {
  var defer = protractor.promise.defer();
  var xpathRow;
  var rowReference;
  var xpathCol;
  var cellReference;
  var promise = defer.promise;
  var _this = this;

  // XPATH of required row
  xpathRow = '//*[@data-qa-id="section-trade-preview"]//*[contains(@class,"slick-row") and ' +
    'descendant::*[normalize-space(.)="' + symbolName + '"]][1]';

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
        xpathCol = '//*[@data-qa-id="section-trade-preview"]//div[@style="' + attrValue.replace(/[\s;]/g, '') + '"]';

        var colIndex;
        _this.getColumnIndex(colName).then(function(value) {
          colIndex = value;
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

/***************************************************************************************************/
/* Function: getSymbolRemoveIconInTradePreview                                                     */
/* Description: This function is used to get the reference of removeIcon in trader preview section */
/*                                                                                                 */
/* Params: 1. symbolName -> Specifies tha name of the symbol in the list                           */
/*            example: '25466AAB'                                                                  */
/*                                                                                                 */
/* Returns: Returns promise which resolve to the reference of remove icon from the specified list. */
/***************************************************************************************************/
STUMainPage.prototype.getSymbolRemoveIconInTradePreview = function(symbolName) {
  var xpathColumn = '//*[@data-qa-id="section-trade-preview"]' +
    '//*[contains( @class,"slick-pane slick-pane-top slick-pane-left")]' +
    '//*[contains(@class,"slick-row") and descendant::*[normalize-space(.)="' + symbolName + '"]]';

  // Hover over the required column
  browser.actions().mouseMove(element(by.xpath(xpathColumn))).perform();

  // XPATH of required column's Edit button
  var xpathRemoveButton = xpathColumn + '//*[contains(@class, "icon-remove")]';

  return element.all(by.xpath(xpathRemoveButton));
};

/********************************************************************************************/
/* Function: getButton                                                                      */
/* Description: This function is used get the reference of a button from any pop-up or      */
/*              dialog box.                                                                 */
/* Params: 1. btnName -> Name of the button whose reference is needed.                      */
/*                                                                                          */
/* Return: Promise which resolves to reference of a button.                                 */
/********************************************************************************************/
STUMainPage.prototype.getButton = function(btnName) {
  var xpathBtn = '//*[@role="dialog"]//button[@type="button"][.="' + btnName + '"]';
  return element(by.xpath(xpathBtn));
};

/********************************************************************************************/
/* Function: getTradeEditorSection                                                          */
/* Description: This function is used to get the reference of trade editor section.         */
/* Return: Returns reference of splitter bar.                                               */
/********************************************************************************************/
STUMainPage.prototype.getTradeEditorSection = function() {
  var xpathSplitterBar = '//*[@data-qa-id="trader-trade-editor-section"]/tf-splitter-home-section';
  return element(by.xpath(xpathSplitterBar));
};

/*********************************************************************************************/
/* Function: getSpinnerIcon                                                                  */
/* Description: This function is used to get the reference of 'Spinning' Icon on page        */
/*                                                                                           */
/* Returns: Returns the reference of 'Spinning' icon                                         */
/*********************************************************************************************/
STUMainPage.prototype.getSpinnerIcon = function() {
  var getSpinner = '//div[@class="stu-spinner-outer"]';
  return element(by.xpath(getSpinner));
};

/********************************************************************************************/
/* Function: getTotalNoOfTradesInTradePreview                                               */
/* Description: This function is used get number of trades in TradePreview Section          */
/*                                                                                          */
/* Return: Promise which resolves to Number of Trades in Trade Preview.                     */
/********************************************************************************************/
STUMainPage.prototype.getTotalNoOfTradesInTradePreview = function() {
  var xpathNoOfTrades = '//*[@data-qa-id="section-trade-preview"]//*[contains(@class, "stu-total-trades")]';
  return element(by.xpath(xpathNoOfTrades)).getText();
};

/********************************************************************************************/
/* Function: getSplitterArrowButton                                                         */
/* Description: This function is used to get the reference of arrow button in the center    */
/*               of splitter bar.                                                           */
/*                                                                                          */
/* Return: Returns reference of splitter arrow button in the center of splitter bar.        */
/********************************************************************************************/
STUMainPage.prototype.getSplitterArrowButton = function() {
  var xpathSplitterArrow = '//*[@data-qa-id="trader-trade-editor-section"]//*[@type="arrow-up-xs"][1]';
  return element(by.xpath(xpathSplitterArrow));
};

/****************************************************************************************/
/* Function: getOptionFromDropdownInTradePreview                                        */
/* Description: This function is used to get reference of item from the drop down       */
/* Params: option -> Name of the item whose reference is needed.                        */
/* Return: Promise which resolves to reference of given item from the drop down list    */
/****************************************************************************************/
STUMainPage.prototype.getOptionFromDropdownInTradePreview = function(option) {
  var xpathOption = '//div[@class="dropdown-wrap opened"]//li[normalize-space(text())="' + option + '"]';
  return element(by.xpath(xpathOption));
};

/****************************************************************************************/
/* Function: getDropdownOrButtonFromTradePreview                                        */
/* Description: Get the reference of dropdown or button from "Trade Preview" section.   */
/* Params:1. utilityName -> name of the utility is selected                             */
/*            example: 'Trader', 'Solver'                                               */
/*        2. symbolName -> specifies the name of the row whose cell reference is needed */
/*         Example: '25466AB', '3133XUMS'                                               */
/*        3. colName  -> specifies the column name whose cell reference is needed       */
/*         Example: 'ISO', 'Price'                                                      */
/* Return: Promise which resolves to reference of given item from the drop down list    */
/****************************************************************************************/
STUMainPage.prototype.getDropdownOrButtonFromTradePreview = function(utilityName, symbolName, colName) {

  UtilitySlickgrid.scrollColumnToVisibleInTradePreview(utilityName, colName);
  this.getCellValueFromTradePreview(symbolName, colName).then(function(reference) {
    // Click on input box of Identifier
    browser.actions().doubleClick(reference).perform();
  });

  return element(by.xpath('//*[@data-qa-id="section-trade-preview"]//*[@options="gridOptions"]//button'));

};

/***********************************************************************************************/
/* Function: isToolTipAppeared                                                                 */
/* Description: This function is used to verify that tool-tip with expected text appeared      */
/* Params: 1. visibleText                                                                      */
/* Return: promise which resolves to true if the tool-tip appeared, otherwise false            */
/***********************************************************************************************/
STUMainPage.prototype.isToolTipAppeared = function(visibleText) {
  return Utilities.waitUntilElementAppears(element(by.xpath('//*[@class="tf-tooltip"]/div[.="' + visibleText + '"]')),
    2000);
};

module.exports = new STUMainPage();
