'use strict';
var STUTraderPage = function() {
};

/********************************************************************************************/
/* Function: getInputBox                                                                    */
/* Description: This function is used to get reference of any input box of Trader utility   */
/*              page.                                                                       */
/*                                                                                          */
/* Params: 1. inputboxName -> Specifies the name of input box whose reference is needed     */
/*          Example: 'Lot Size','Identifier','Trade ESC','Trade Value'                      */
/*                                                                                          */
/* Return: Returns promise which resolve to the reference of specified input box.           */
/********************************************************************************************/
STUTraderPage.prototype.getInputBox = function(inputboxName) {
  var xpathInput = '//*[contains( @data-qa-id,"input-' + inputboxName.toLowerCase().replace(/\s/g, '-') + '")]//input';
  return element(by.xpath(xpathInput));
};

/********************************************************************************************/
/* Function: getDropDown                                                                    */
/* Description: This function is used to get reference of any dropdown of Trader utility    */
/*              page.                                                                       */
/*                                                                                          */
/* Params: 1. dropDownName -> Specifies the name of input box whose reference is needed     */
/*          Example: 'ISO', 'Trade/Cash Offset', 'Trade Txn Type', 'Trade ESC Input'        */
/*                                                                                          */
/* Return: Returns promise which resolve to the reference of specified dropdown.            */
/********************************************************************************************/
STUTraderPage.prototype.getDropDown = function(dropDownName) {
  var xpathDropDown;
  if (dropDownName.toLowerCase() === 'iso') {
    xpathDropDown = '//*[@data-qa-id="section-iso"]//*[@data-qa-class="dropdown-currency"]//tf-button' +
      '/ancestor ::tf-dropdown-handle';
  } else if (dropDownName.toLowerCase() === 'trade/cash offset') {
    xpathDropDown = '//*[@data-qa-id="section-trade-cash-offset"]//*[@data-qa-class="dropdown-currency"]//tf-button' +
      '/ancestor ::tf-dropdown-handle';
  } else if (dropDownName.toLowerCase() === 'date') {
    xpathDropDown = '//*[@data-qa-class="dropdown-date"]//tf-button' +
      '/ancestor ::tf-dropdown-handle';
  } else {
    xpathDropDown = '//*[@data-qa-id="dropdown-' + dropDownName.toLowerCase().replace(/\s/g, '-') + '"]//tf-button' +
      '/ancestor ::tf-dropdown-handle';
  }

  return element(by.xpath(xpathDropDown));
};

/********************************************************************************************/
/* Function: getDropDownOption                                                              */
/* Description: This function is used to get reference of any dropdown option of dropdown   */
/*              of Trader utility page.                                                     */
/*                                                                                          */
/* Params: 1. option -> Specifies the dropDownItem whose reference is needed                */
/*          Example: 'Current','ZWN Zimbabwe New Dollar'                                    */
/*                                                                                          */
/* Return: Returns promise which resolve to the reference of specified dropdown option.     */
/********************************************************************************************/
STUTraderPage.prototype.getDropDownOption = function(option) {
  var xpathOption = '//*[contains(@class, "dd-position") and not( contains( @class, "ng-hide") )]' +
    '//*[@data-qa-class="dropdown-option" and normalize-space(.)="' + option + '"][1]';
  return element(by.xpath(xpathOption));
};

/********************************************************************************************/
/* Function: getAllDropDownOptions                                                           */
/* Description: This function is used to get reference of all dropdown options of dropdown   */
/*              of Trader utility page.                                                     */
/*                                                                                          */
/* Return: Returns promise which resolve to the reference of specified dropdown option.     */
/********************************************************************************************/
STUTraderPage.prototype.getAllDropDownOptions = function() {
  var xpathOption = '//*[contains(@class, "dd-position") and not( contains( @class, "ng-hide") )]' +
    '//*[@data-qa-class="dropdown-option"]';
  return element.all(by.xpath(xpathOption));
};

/********************************************************************************************/
/* Function: getButton                                                                      */
/* Description: This function is used to get the reference of specified icon button of      */
/*             Trader utility page.                                                         */
/*                                                                                          */
/* Params: 1. iconButtonName : specifies the name of button name whose reference is needed  */
/*           Example: 'Balance', 'Add Allocation', 'Calculate', 'Apply&Close'               */
/*         2. sectionName : specifies the name of section in which button is available. It  */
/*           is a optional input.                                                           */
/*          Example: 'Portfolios', 'Trade Preview'                                          */
/*                                                                                          */
/* Return: Returns promise which resolve to the reference of specified icon button          */
/********************************************************************************************/
STUTraderPage.prototype.getButton = function(iconButtonName, sectionName) {
  var xpathButton = '//*[@data-qa-id="button-' + iconButtonName.toLowerCase().replace(/[&\s/\/]/g, '-') + '"]';
  if (sectionName !== undefined) {
    xpathButton = '//*[@data-qa-id="section-' + sectionName.toLowerCase().replace(/\s/g, '-') + '"]' + xpathButton;
  } else if (iconButtonName === 'Add' || iconButtonName === 'Clear' || iconButtonName === 'Update') {
    xpathButton = '//*[@data-qa-id="button-' + iconButtonName.toLowerCase() + '"]';
  }

  return element(by.xpath(xpathButton));
};

/********************************************************************************************/
/* Function: getDatePicker                                                                  */
/* Description: This function is used to get the reference of date picker button            */
/*                                                                                          */
/* Params: Not Applicable                                                                   */
/*                                                                                          */
/* Return: Returns promise which resolve to the reference of date picker button.            */
/********************************************************************************************/
STUTraderPage.prototype.getDatePicker = function() {
  var xpathDatePicker = '//*[@data-qa-id="input-date"]//button';
  return element(by.xpath(xpathDatePicker));
};

/********************************************************************************************/
/* Function: setIdentifier                                                                  */
/* Description: This function is used to set the input field value in specified list section*/
/*                                                                                          */
/* Params: 1. inputBoxName -> specifies the name of Input where need to set the Value.      */
/*            Example: 'Identifier'                                                         */
/*         2. searchKey -> specifies the search key which is need to be provided in input   */
/*            Example: '37247DAN'                                                           */
/*         3. optionToSelect -> represent the name of option to be selected from the type   */
/*            ahead section.                                                                */
/*            Example: 'Genworth Financial, Inc 7.2% 15-FEB-2021'                           */
/*         4. categoryToSelect -> specifies the name of the category to be selected from    */
/*            from type a head section.                                                     */
/*            Example: 'Equity'                                                             */
/*         5. dataValue -> Data value of the option to be selected from the type ahead      */
/*            section.                                                                      */
/*            Example: 'TGT-US'                                                             */
/*                                                                                          */
/* Return: Returns promise which can be resolved to 'true' if input is set else resolves to */
/*         error message.                                                                   */
/********************************************************************************************/
STUTraderPage.prototype.setIdentifier = function(inputBoxName, identifierText, optionToSelect, categoryToSelect, dataValue) {

  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var xpathIdentiferInput = '//*[contains( @data-qa-id,"input-' + inputBoxName.toLowerCase().replace(/\s/g, '-') + '")]//input';
  var identifierInputBox = element(by.xpath(xpathIdentiferInput));
  var lotsize;
  var refOption;

  // Click on inputbox of Identifier
  identifierInputBox.click();

  // Clear the default Identifier selected (if exists)
  identifierInputBox.clear();

  // Enter the text into the Identifier Input Box
  identifierInputBox.sendKeys(identifierText);

  // Wait for the type ahead list to appear
  Utilities.waitUntilElementAppears(element(by.xpath('//div[contains(@class,"dropdown-wrap open")]')), 6000);

  var xpathTypeAhead = '//div[contains(@class, "dropdown-wrap open")]';
  var typeAhead = element(by.xpath(xpathTypeAhead));

  // Verifying if dataValue is defined.
  if (dataValue === undefined) {
    refOption = element(by.xpath('//*[@class="idwidget-row" and @data-name="' + optionToSelect + '"][1]'));
  } else {
    refOption = element(by.xpath('//*[@class="idwidget-row" and @data-name="' + optionToSelect + '" and ' +
      '@data-value="' + dataValue + '"]'));
  }

  // Verifying if type ahead is appeared.
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

            // Wait for the category list to appear.
            browser.driver.wait(function() {
              return refOption.isDisplayed().then(function(isfound) {
                return isfound;
              }, function() {
                return false;
              });
            }, 4000).then(function() {}, function() {});
          }
        });
      }

      // Select the required identifier
      refOption.isDisplayed().then(function() {
        refOption.click();
      }, function() {
        defer.reject(optionToSelect + 'type a head is not found');
      });

      // Wait for the alertLoad Icon to appear.
      browser.driver.wait(function() {
        return STUMainPage.getAlertLoading().isDisplayed().then(function(isfound) {
          return isfound;
        }, function() {
          return false;
        });
      }, 4000).then(function() {}, function() {});

      // Wait until alertLoad Icon to disappear.
      Utilities.waitUntilElementDisappears(STUMainPage.getAlertLoading(), 120000);

      // Verifying Identifier is set
      element(by.xpath('//*[@id="stu-input-lot-size"]/input')).getAttribute('value').then(function(value) {
        lotsize = value;
      }).then(function() {
        if (lotsize === undefined) {
          defer.reject('Identifier is not set');
        } else {
          defer.fulfill(true);
        }
      });
    }
  });

  return promise;
};

/****************************************************************************************/
/* Function: getOptionFromMonthOrYearDropdown                                           */
/* Description: This function is used to get reference of item from the drop down       */
/* Params: option -> Name of the item whose reference is needed.                        */
/* Return: Promise which resolves to reference of given item from the drop down list    */
/****************************************************************************************/
STUTraderPage.prototype.getOptionFromMonthOrYearDropdown = function(option) {
  var xpathOption = '//div[@class="dropdown-wrap opened"]//li[contains( text(), "' + option + '" )]';
  return element(by.xpath(xpathOption));
};

/**************************************************************************/
/* Function: getMonthOrYearDropDown                                       */
/* Description: Get the reference of MONTH or YEAR drop down.             */
/* Params :  dropdownName ->Name of the item whose reference is needed.   */
/*          Example: month or year                                        */
/* Return: Promise which resolved to reference of drop down button.       */
/**************************************************************************/
STUTraderPage.prototype.getMonthOrYearDropDown = function(dropDownName) {
  var xpathDropDown = '//*[contains( @class, "calendar-' + dropDownName.toLowerCase() + '-select" )]/button';
  return element(by.xpath(xpathDropDown));
};

/****************************************************************************************/
/* Function: getDayFromCalendar                                                         */
/* Description: Get the reference of particular day                                     */
/* Params: day -> day that you need to get the reference of                             */
/* Return: Promise which resolves to reference of given item from the drop down list    */
/****************************************************************************************/
STUTraderPage.prototype.getDayFromCalendar = function(day) {
  var xpathDay = '//tbody//td[@class="day"][.="' + day + '"]';
  return element(by.xpath(xpathDay));
};

/***********************************************************************************************/
/* Function: getResidualFromPortfolioSection                                                   */
/* Description: This function is used to get Portfolio Residual Value.                          */
/* Return: Returns the reference of the element.                                               */
/***********************************************************************************************/
STUTraderPage.prototype.getResidualFromPortfolioSection = function() {
  var xpathResidual = '//*[@data-qa-id="section-portfolios"]//*[@class="pull-left"]/*';
  return element(by.xpath(xpathResidual));
};

/***********************************************************************************************/
/* Function: getcolumnNextToPortfolio                                                          */
/* Description: This function is used to get Column reference next to Portfolio column.        */
/* Return: Returns the reference of the column .                                               */
/***********************************************************************************************/
STUTraderPage.prototype.getcolumnNextToPortfolio = function() {
  var xpathcolumn = '//*[@data-qa-id="section-portfolios"]//th[contains(@class, "column-amount")]';
  return element(by.xpath(xpathcolumn));
};

/***********************************************************************************************/
/* Function: getPortfolioDropdownFromPortfoliosSection                                         */
/* Description: This function is used to get the reference of Portfolio Dropdown from          */
/*              Portfolio section.                                                             */
/* Params :  1.dropdownName ->Name of the dropdown whose reference is needed.                  */
/*          Example: "CLIENT:/PA3/TRADE_SOLVER/FI_DEMO.ACCT"                                   */
/*         2. rowIndex -> Index of the row whose cell value is required.                       */
/* Return: Returns the reference of the dropdown.                                              */
/***********************************************************************************************/
STUTraderPage.prototype.getPortfolioDropdownFromPortfoliosSection = function(dropdownName, rowIndex) {

  var xpathDropdown;

  // Setting the default parameter
  if (rowIndex === undefined) {
    rowIndex = false;
  }

  if (dropdownName === undefined) {
    dropdownName = false;
  }

  if (dropdownName === false && rowIndex === false) {
    xpathDropdown = '//*[@data-qa-class="dropdown-portfolio"]//tf-button';
  } else if (dropdownName !== false && rowIndex === false) {
    xpathDropdown = '//*[@data-qa-class="dropdown-portfolio"]//*[normalize-space(.)="' + dropdownName + '"] /ancestor ::tf-button';
  } else if (rowIndex !== false) {
    xpathDropdown = '//tr[' + rowIndex + ']//*[@class="column-portfolio"]//*[@data-qa-class="dropdown-portfolio"]//tf-button';
  }

  return element(by.xpath(xpathDropdown));
};

/********************************************************************************************/
/* Function: getTradeEditorSection                                                          */
/* Description: This function is used to get the reference of Trade Editor Section          */
/*                                                                                          */
/* Return: Returns reference of Trade Editor Section                                        */
/********************************************************************************************/
STUTraderPage.prototype.getTradeEditorSection = function() {
  var xpathTradeEditorSection = '//*[@data-qa-id="trader-trade-editor-section"]';
  return element(by.xpath(xpathTradeEditorSection));
};

/***********************************************************************************************/
/* Function: getReconcileFromPortfolioSection                                                  */
/* Description: This function is used to get the reference of Portfolio Reconcile              */
/*              (balancing icon) from Portfolio section.                                       */
/* Return: Returns the reference of the Reconcile (balancing icon).                            */
/***********************************************************************************************/
STUTraderPage.prototype.getReconcileFromPortfolioSection = function() {
  var xpathDropdown = '//*[@data-qa-id="button-balance"]//button';

  return element(by.xpath(xpathDropdown));
};

/***********************************************************************************************/
/* Function: getcolumnValueNextToPortfolio                                                     */
/* Description: This function is used to get Column Value reference next to Portfolio column.  */
/* Params :  portfolioName ->Name of the corresponding portfolio whose value is needed.        */
/*          Example: "CLIENT:/PA3/TRADE_SOLVER/FI_DEMO.ACCT"                                   */
/* Return: Returns the reference of the column .                                               */
/***********************************************************************************************/
STUTraderPage.prototype.getcolumnValueNextToPortfolio = function(portfolioName) {

  var xpathColumnValue;

  if (portfolioName === undefined) {
    xpathColumnValue = '//*[@data-qa-id="section-portfolios"]//*[@data-qa-class="input"]/input';
  } else {
    var xpathportfolio = '//*[@data-qa-class="dropdown-portfolio"]//*[normalize-space(.)="' + portfolioName + '"] /ancestor ::tf-button';
    xpathColumnValue = xpathportfolio + '/ancestor::*[@class="column-portfolio"]/following-sibling::*//input';
  }

  return element(by.xpath(xpathColumnValue));

};

/***********************************************************************************************/
/* Function: getCheckbox                                                                       */
/* Description: This function is used to get check box reference of Portfolio.                 */
/* Params :  portfolioName ->Name of the corresponding portfolio whose value is needed.        */
/*          Example: "CLIENT:/PA3/TRADE_SOLVER/FI_DEMO.ACCT"                                   */
/* Return: Returns the reference of the check box.                                             */
/***********************************************************************************************/
STUTraderPage.prototype.getCheckbox = function(PortfolioName) {

  var xpathcheckbox;

  if (PortfolioName.toLowerCase() === 'portfolio') {
    xpathcheckbox = '//*[@data-qa-id="checkbox-select-all"]';
  } else {
    xpathcheckbox = '//*[@data-qa-class="dropdown-portfolio"]//*[normalize-space(.)="' + PortfolioName + '"] /ancestor ::button' +
      '/ancestor::*[@class="column-portfolio"]/preceding-sibling::*//*[@data-qa-class="checkbox"]';
  }

  return element(by.xpath(xpathcheckbox));
};

/********************************************************************************************/
/* Function: getWarningIcon                                                                 */
/* Description: This function is used to get reference of inputBox warning icon.            */
/* Params:  inputBoxName -> specifies the name of the inputBox whose cell value is required */
/*         Example: 'Quantity', 'Price'                                                     */
/* Return: Promise which resolves to the reference of warning icon from the specified input.*/
/* NOTE: You can get the reference only when report is showing the cached data.             */
/********************************************************************************************/
STUTraderPage.prototype.getWarningIcon = function(inputBoxName) {
  var xpathWarningIcon = '//*[@data-qa-id="input-' + inputBoxName.toLowerCase().replace(/\s/g, '-') + '"]' +
    '/*[contains(@class, "icon-alert1")]';
  return element(by.xpath(xpathWarningIcon));
};

/********************************************************************************************/
/* Function: getWarningInfoText                                                             */
/* Description: This function is used to get text of warning icon.                          */
/* Return: Promise which resolves to the text of warning icon from the specified report.    */
/* NOTE: You can get the text only after clicking on alert icon.                            */
/********************************************************************************************/
STUTraderPage.prototype.getWarningInfoText = function() {
  var xpathWarningInfo = '//*[@class="tf-infobox opened right"]';

  return element(by.xpath(xpathWarningInfo)).getText();
};

module.exports = new STUTraderPage();
