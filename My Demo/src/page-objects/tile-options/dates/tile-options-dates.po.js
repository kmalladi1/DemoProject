'use strict';

var TileOptionsDates = function() {
  this.xpathStartDateCalendarWidget = '//*[@data-qa-id="multi-period-start-datepicker"]';
  this.xpathEndDateCalendarWidget = '//*[@data-qa-id="multi-period-end-datepicker"]';
  this.xpathMultiHorizonEndDateCalendarWidget = '//*[@data-qa-id="single-period-mh-datepicker"]';
  this.xpathSingleEndDateCalendarWidget = '//*[@data-qa-id="single-period-end-datepicker"]';
  this.xpathMultiHorizonDate = '//*[contains(@data-qa-id, "period-mh-datepicker")]';
  this.xpathBlastingWindow = '//*[@id="blastPaneldates"]';
  this.arrayReportFrequencyOptions = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Semi-annually', 'Annually', 'Fiscal Yearly',
    'Single', 'Multi-Horizon',];
  this.arrayMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December',];
  this.arrayEndDateOptions = ['Latest', 'Previous Close', 'One Week Ago', 'End of Last Month', 'One Month Ago', 'End of Last Quarter',
    'End of Last Year', 'One Year Ago', 'Two Years Ago', 'Three Years Ago', 'Four Years Ago', 'Five Years Ago', 'Ten Years Ago',];
  this.xpathOfStartDateDropDownIcon = '//*[normalize-space(.)="Start Date:"]/parent::*//tf-textbox-dropdown-toggle//span[@tf-button]';
  this.xpathOfEndDateDropDownIcon = '//*[normalize-space(.)="End Date:"]/parent::*//tf-textbox-dropdown-toggle//tf-button';
  this.xpathOfDropDownItem = '//tf-dropdown//*[contains(@class,"tf-selectable")]';
  this.xpathOfStartDateMonthDropDown = '//*[normalize-space(.)="Start Date:"]/parent::*//*[contains(@ng-model,"month")]';
  this.xpathOfStartDateYearDropDown = '//*[normalize-space(.)="Start Date:"]/parent::*//*[contains(@ng-model,"year")]';
  this.xpathOfEndDateMonthDropDown = '//*[normalize-space(.)="End Date:"]/parent::*//*[contains(@ng-model,"month")]';
  this.xpathOfEndDateYearDropDown = '//*[normalize-space(.)="End Date:"]/parent::*//*[contains(@ng-model,"year")]';
  this.xpathStartDateTextBox = '//label[normalize-space(.)="Start Date:"]//following-sibling::*[contains(@data-qa-id,"date")]//tf-textbox';
  this.xpathEndDateTextBox = '//label[normalize-space(.)="End Date:"]//following-sibling::*[contains(@data-qa-id,"date")]//tf-textbox';
  this.xpathAllDateOptions = '//*[@data-qa-id="date-options-hyperlink"]';
  this.xpathMultiHorizonListbox = '//*[@data-qa-id="multi-horizon-listbox"]';
  this.xpathOfCalenderButton = '//tf-datepicker-dropdown';
};

/****************************************************************************************/
/* Function: getDropDown                                                                */
/* Description: This function is used to get a particular drop down                     */
/* Params: optionName -> Name of the specified dropdown you want to get reference of.   */
/* Return: Returns the reference of required element.                                   */
/****************************************************************************************/
TileOptionsDates.prototype.getDropDown = function(optionName) {
  var xpathDropDown;
  if (optionName === 'Report Frequency') {
    xpathDropDown = '//*[@data-qa-id="dropdown-dates-report-frequency"]//tf-button';
  } else if (optionName === 'Rolling Period') {
    xpathDropDown = '//*[@data-qa-id="dropdown-dates-rolling-period"]//tf-button';
  } else if (optionName === 'Date Order') {
    xpathDropDown = '//*[@data-qa-id="dropdown-date-order-selection"]//tf-button';
  }

  return element(by.xpath(xpathDropDown));

};

/****************************************************************************************/
/* Function: getOption                                                                  */
/* Description: This function is used to get reference of item from the drop down       */
/* Params: option -> Name of the item whose reference is needed.                        */
/* Return: Promise which resolves to reference of given item from the drop down list    */
/****************************************************************************************/
TileOptionsDates.prototype.getOption = function(option) {

  var xpathOption = ' //*[contains(@class, "dropdown-wrap opened")]//li[@data-value = "' + option + '" ] |' +
    '//*[contains(@class, "dropdown-wrap opened")]//li[contains( text(), "' + option + '" )] | ' +
    '//tf-dropdown//*[@ng-repeat and descendant::*//*[normalize-space(.)="' + option + '"]]';
  return element(by.xpath(xpathOption));
};

/****************************************************************************************/
/* Function: getMultiHorizonDateDropDown                                                */
/* Description: This function is used to get MultiHorizon Date drop down                */
/* Return: Returns the reference of required element.                                   */
/****************************************************************************************/
TileOptionsDates.prototype.getMultiHorizonDateDropDown = function() {
  var xpathMultiHorizonDateDropDown = this.xpathMultiHorizonDate + '//*[contains(@class, "toggle")]';

  return element(by.xpath(xpathMultiHorizonDateDropDown));
};

/****************************************************************************************/
/* Function: getMultiHorizonAddBtn                                                      */
/* Description: This function is used to get MultiHorizon Add Button                    */
/* Return: Returns the reference of MultiHorizon Add Button.                            */
/****************************************************************************************/
TileOptionsDates.prototype.getMultiHorizonAddBtn = function() {
  var xpathMultiHorizonAddBtn;
  xpathMultiHorizonAddBtn = this.xpathMultiHorizonDate + '//*[@data-qa-id="button-multi-horizon-add"]';

  return element(by.xpath(xpathMultiHorizonAddBtn));
};

/**********************************************************************************************/
/* Function: getMultiHorizonListItem                                                          */
/* Description: This function is used to get MultiHorizon date items that are added to list   */
/* Return: Returns the reference of  MultiHorizon dropdown Text Field.                        */
/**********************************************************************************************/
TileOptionsDates.prototype.getMultiHorizonListItem = function(option) {
  var xpathMultiHorizonInputField = this.xpathMultiHorizonDate +
    '//*[@data-qa-class="listbox-item" and normalize-space(.)= "' + option + '"]';

  return element(by.xpath(xpathMultiHorizonInputField));
};

/****************************************************************************************/
/* Function: getMultiHorizonStartDateField                                              */
/* Description: This function is used to get MultiHorizon Date Field                    */
/* Return: Returns the reference of MultiHorizon Date Field.                            */
/****************************************************************************************/
TileOptionsDates.prototype.getMultiHorizonStartDateField = function() {
  var xpathMultiHorizonStartDateField;
  xpathMultiHorizonStartDateField = this.xpathMultiHorizonDate + '//*[contains(@class, "textbox")]//input';

  return element(by.xpath(xpathMultiHorizonStartDateField));
};

/****************************************************************************************/
/* Function: getApplyToButton                                                           */
/* Description: This function is used to get reference of "Apply To ..." button from top*/
/*              right corner of web page.                                               */
/* Params: NA                                                                           */
/* Return: Returns the reference of button.                                             */
/****************************************************************************************/
TileOptionsDates.prototype.getApplyToButton = function() {
  var xpathBlastLink = '//*[@data-qa-id="options-header"]//*[@data-qa-id="blasting-button"]';
  return element(by.xpath(xpathBlastLink));
};

/****************************************************************************************/
/* Function: getCheckBoxFromBlastWindow                                                 */
/* Description: This function is used to get reference of specified checkbox from the   */
/*              blasted window.                                                         */
/* Params: 1. checkBoxName -> Name of the checkbox whose reference is needed.           */
/* Return: Returns the reference of required checkbox.                                  */
/****************************************************************************************/
TileOptionsDates.prototype.getCheckBoxFromBlastWindow = function(checkBoxName) {
  var xpathCheckBox = this.xpathBlastingWindow + '//*[normalize-space(.)="' + checkBoxName + '"]/tf-checkbox-control';
  return element(by.xpath(xpathCheckBox));
};

/****************************************************************************************/
/* Function: getOkOrCancelButtonFromBlastedWindow                                       */
/* Description: This function is used to get reference of specified button from blasted */
/*              window.                                                                 */
/* Params: 1. btnName -> Name of the button whose reference is needed.                  */
/* Return: Returns the reference of required button.                                    */
/****************************************************************************************/
TileOptionsDates.prototype.getOkOrCancelButtonFromBlastedWindow = function(btnName) {
  var xpathButton = '//*[@data-qa-id="blasting-panel"]//*[@data-qa-id and normalize-space(.)="' + btnName + '"]';
  return element(by.xpath(xpathButton));
};

// Get the reference of Report Frequency button
TileOptionsDates.prototype.getReportFrequencyBtn = function() {
  var xpathReportFrequency = '//*[@data-qa-id="dropdown-dates-report-frequency"]//span[@tf-button]';
  return element(by.xpath(xpathReportFrequency));
};

// Get the reference of Calendar widget
// there are 2 Calendar widgets 1)Start Date
//                             2)End Date
TileOptionsDates.prototype.getCalendarWidget = function(widgetName) {
  // Variable(s)
  var xpathCalendarWidget;
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var _this = this;

  // If "Report Frequency" selected is "Single", XPATH for "End Date" calendar differs
  this.getReportFrequencyBtn().getText().then(function(freqValue) {

    if (freqValue.toLowerCase().indexOf('single') > -1) {
      xpathCalendarWidget = _this.xpathSingleEndDateCalendarWidget;
    } else {
      if (widgetName.toLowerCase() === 'start date') {
        xpathCalendarWidget = _this.xpathStartDateCalendarWidget;
      } else if (widgetName.toLowerCase() === 'end date') {
        xpathCalendarWidget = _this.xpathEndDateCalendarWidget;
      }
    }

    defer.fulfill(element(by.xpath(xpathCalendarWidget)));
  });

  return promise;
};

// Get the reference of MONTH or YEAR drop down
// where widgetName can be 1)Start date
//                         2)End Date
//                         3)Single's End Date (Which contains only End Date calendar)
TileOptionsDates.prototype.getMonthOrYearDropDown = function(widgetName, dropDownName) {
  var xpathDropDown;

  // Get the XPATH based on the widgetName
  if (widgetName.toLowerCase() === 'start date') {
    xpathDropDown = this.xpathStartDateCalendarWidget;
  } else if (widgetName.toLowerCase() === 'end date') {
    xpathDropDown = this.xpathEndDateCalendarWidget;
  } else if (widgetName.toLowerCase() === 'single\'s end date') {
    xpathDropDown = this.xpathSingleEndDateCalendarWidget;
  }

  if (dropDownName.toLowerCase() === 'month') {
    xpathDropDown += '//*[contains(@ng-model, "month")]';
  } else if (dropDownName.toLowerCase() === 'year') {
    xpathDropDown += '//*[contains(@ng-model, "year")]';
  }

  return element(by.xpath(xpathDropDown));
};

// Get the reference of Option from MONTH or YEAR drop down
TileOptionsDates.prototype.getMonthOrYear = function(option) {
  var xpathOption = '//tf-dropdown//*[@ng-repeat][normalize-space(.)="' + option + '"]';
  return element(by.xpath(xpathOption));
};

// Get the reference of particular date
// where widgetName can be 1)Start date
//                         2)End Date
//                         3)Single's End Date (Which contains only End Date calendar)
TileOptionsDates.prototype.getDay = function(day, widgetName) {
  var xpathDay;

  // Get the XPATH based on the widgetName
  if (widgetName.toLowerCase() === 'start date') {
    xpathDay = this.xpathStartDateCalendarWidget;
  } else if (widgetName.toLowerCase() === 'end date') {
    xpathDay = this.xpathEndDateCalendarWidget;
  } else if (widgetName.toLowerCase() === 'single\'s end date') {
    xpathDay = this.xpathSingleEndDateCalendarWidget;
  }

  xpathDay = xpathDay + '//tbody//*[contains(@class,"day") and not(contains(@class,"past")) and normalize-space(.)="' + day + '"]';

  return element(by.xpath(xpathDay));
};

// Get the reference of selected date
// where widgetName can be 1)Start date
//                         2)End Date
//                         3)Single's End Date (Which contains only End Date calendar)
TileOptionsDates.prototype.getSelectedDay = function(widgetName) {
  var xpathDay;

  // Get the XPATH based on the widgetName
  if (widgetName.toLowerCase() === 'start date') {
    xpathDay = this.xpathStartDateCalendarWidget;
  } else if (widgetName.toLowerCase() === 'end date') {
    xpathDay = this.xpathEndDateCalendarWidget;
  } else if (widgetName.toLowerCase() === 'single\'s end date') {
    xpathDay = this.xpathSingleEndDateCalendarWidget;
  }

  xpathDay = xpathDay + '//tbody//td[contains(@class,"day") and contains(@class,"active")]';

  return element(by.xpath(xpathDay)).getText();
};

// Get the reference of date text box(start date/end date) which available in top of widget
// where widgetName can be 1)Start date
//                         2)End Date
//                         3)Single's End Date (Which contains only End Date calendar)
TileOptionsDates.prototype.getDateField = function(widgetName) {
  var xpathDateField;

  // Get the XPATH based on the widgetName
  if (widgetName.toLowerCase() === 'start date') {
    xpathDateField = this.xpathStartDateCalendarWidget;
  } else if (widgetName.toLowerCase() === 'end date') {
    xpathDateField = this.xpathEndDateCalendarWidget;
  } else if (widgetName.toLowerCase() === 'single\'s end date') {
    xpathDateField = this.xpathSingleEndDateCalendarWidget;
  } else if (widgetName.toLowerCase() === 'multi-horizon end date') {
    xpathDateField = this.xpathMultiHorizonEndDateCalendarWidget;
  }

  xpathDateField += '//*[contains(@class, "textbox")]//input';

  return element(by.xpath(xpathDateField));
};

// Get the reference of Today Date button
// where widgetName can be 1)Start date
//                         2)End Date
//                         3)Single's End Date (Which contains only End Date calendar)
TileOptionsDates.prototype.getTodayDateButton = function(widgetName) {
  var xpathTodayDate;

  // Get the XPATH based on the widgetName
  if (widgetName.toLowerCase() === 'start date') {
    xpathTodayDate = this.xpathStartDateCalendarWidget;
  } else if (widgetName.toLowerCase() === 'end date') {
    xpathTodayDate = this.xpathEndDateCalendarWidget;
  } else if (widgetName.toLowerCase() === 'single\'s end date') {
    xpathTodayDate = this.xpathSingleEndDateCalendarWidget;
  }

  xpathTodayDate = xpathTodayDate + '//span[@tf-button and contains(@class, "today")]';

  return element(by.xpath(xpathTodayDate));
};

// Get the reference of check box
TileOptionsDates.prototype.getCheckBox = function(name) {
  var xpathCheckbox = '//*[@data-qa-id="checkbox-' + name.toLowerCase().replace(/\s/g, '-') + '"]/tf-checkbox-control';

  return element(by.xpath(xpathCheckbox));
};

// Get the reference of Date drop down(Start Date/End Date)
// where widgetName can be 1)Start date
//                         2)End Date
//                         3)Single Date (Which contains only End Date Calendar)
TileOptionsDates.prototype.getDateDropDown = function(widgetName) {
  var xpathDateDropDown;

  // Get the XPATH based on the widgetName
  if (widgetName.toLowerCase() === 'start date') {
    xpathDateDropDown = this.xpathStartDateCalendarWidget;
  } else if (widgetName.toLowerCase() === 'end date') {
    xpathDateDropDown = this.xpathEndDateCalendarWidget;
  } else if (widgetName.toLowerCase() === 'single\'s end date') {
    xpathDateDropDown = this.xpathSingleEndDateCalendarWidget;
  }

  xpathDateDropDown += '//*[contains(@class, "textbox")]//*[contains(@class, "toggle")]';

  return element(by.xpath(xpathDateDropDown));
};

/****************************************************************************************/
/* Function: getSingleEndDateDropDown                                                   */
/* Description: This function is used to get reference of "End Date" drop down when     */
/*              "Report Frequency" is set to "Single".                                  */
/* Params: isInputField (Optional) -> Default value is set to FALSE. When this is set to*/
/*                TRUE we can get the reference of "End Date's" input field.            */
/* Return: Returns the reference of drop down button else input field.                  */
/****************************************************************************************/
TileOptionsDates.prototype.getSingleEndDateDropDown = function(isInputField) {
  // Variable
  var xpath;

  // Set default value of "isInputField"
  if (isInputField === undefined) {
    isInputField = false;
  }

  if (!isInputField) {
    xpath = this.xpathSingleEndDateCalendarWidget + '//*[contains(@class, "combobox")]/*[contains(@class, "toggle")]';
  } else {
    xpath = this.xpathSingleEndDateCalendarWidget + '//input';
  }

  return element(by.xpath(xpath));
};

// Get the reference of an Option from Date drop down
// "option" can be 1) Start Date
//                 2) End Date
TileOptionsDates.prototype.getOptionFromDateDropDown = function(option) {
  var xpathOptionFromDateDropDown = '//tf-dropdown//*[@ng-repeat and normalize-space(.)="' + option + '"]';
  return element(by.xpath(xpathOptionFromDateDropDown));
};

// Get the reference of all dates available in calender
// where widgetName can be 1)Start date
//                         2)End Date
//                         3)Single's End Date (Which contains only End Date Calendar)
TileOptionsDates.prototype.getAllDays = function(widgetName) {
  var xpathDay;

  // Get the XPATH based on the widgetName
  if (widgetName.toLowerCase() === 'start date') {
    xpathDay = this.xpathStartDateCalendarWidget;
  } else if (widgetName.toLowerCase() === 'end date') {
    xpathDay = this.xpathEndDateCalendarWidget;
  } else if (widgetName.toLowerCase() === 'single\'s end date') {
    xpathDay = this.xpathSingleEndDateCalendarWidget;
  }

  xpathDay = xpathDay + '//tbody//td';

  return element.all(by.xpath(xpathDay));
};

/**********************************************************************************************/
/* Function: getAddButton                                                                     */
/* Description: This function is used to get reference of add button                          */
/* Return: Returns the reference of  Add Button.                                              */
/**********************************************************************************************/
TileOptionsDates.prototype.getAddButton = function() {
  var xpathButton = '//*[@data-qa-id="button-multi-horizon-add"]';
  return element(by.xpath(xpathButton));
};

/****************************************************************************************/
/* Function: getRemoveButtonOfMultiHorizonListElement                                   */
/* Description: This function is used to get reference of remove button of the given    */
/*              element.                                                                */
/* Params: 1. elementName -> Name of the element whose remove button reference is needed*/
/*                           Ex: One Day Ago                                           */
/* Return: Returns reference of remove button for required element.                     */
/****************************************************************************************/
TileOptionsDates.prototype.getRemoveButtonOfMultiHorizonListElement = function(elementName) {
  var xpathElement = this.xpathMultiHorizonDate + '//*[@data-qa-class="listbox-item" and normalize-space(.)= "' + elementName + '"]';

  // Hover over the given element
  browser.actions().mouseMove(this.getMultiHorizonListItem(elementName)).perform();

  // Return the reference of remove element button
  return element.all(by.xpath(xpathElement + '//*[contains(@class, "remove")]')).last();
};

/****************************************************************************************/
/* Function: getCalenderIcon                                                            */
/* Description: This function is used to get reference of calender icon.                */
/*              element.                                                                */
/* Return: Returns reference of calender icon.                                          */
/****************************************************************************************/
TileOptionsDates.prototype.getCalenderIcon = function() {
  var xpathCalenderIcon = '//tf-datepicker-dropdown//tf-button';

  return element(by.xpath(xpathCalenderIcon));
};

/****************************************************************************************/
/* Function: getDateFromCalender                                                        */
/* Description: This function is used to get reference of date.                         */
/* Return: Returns reference of date for calender.                                      */
/****************************************************************************************/
TileOptionsDates.prototype.getSelectedDateFromCalender = function() {

  var xpathGetDate = '//tf-calendar//tbody//*[contains(@class,"active")]';

  return element(by.xpath(xpathGetDate));
};

/******************************************************************************************/
/* Function: getItemsFromStartDateSection                                                 */
/* Description: This function is used to get reference of items in the Start Date section.*/
/* Return: Returns reference of items in the start date section.                          */
/******************************************************************************************/
TileOptionsDates.prototype.getItemsFromStartDateSection = function() {
  var xpathListBox = '//tf-listbox-item/tf-listbox-item-handle';
  return element.all(by.xpath(xpathListBox));
};

/****************************************************************************************/
/* Function: getListBoxItemRenameField                                                  */
/* Description: This function is used to get the reference of rename input field from   */
/*            "Available" section after selecting "Rename" icon for a column.           */
/* Return: Promise which resolves to rename input field.                                */
/****************************************************************************************/
TileOptionsDates.prototype.getListBoxItemRenameField = function() {
  var xpathRenameField = '//tf-textbox[contains(@class,"tf-renamable-input")]';
  return element(by.xpath(xpathRenameField));
};

module.exports = new TileOptionsDates();
