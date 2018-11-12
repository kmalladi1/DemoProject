'use strict';

var PA3EditChartMode = function() {
  this.xpathOfColorPickerButton = '//*[contains(@data-qa-class, "bg-style-dropdown")]/parent::*' +
    '/following-sibling::*[@data-qa-class="bg-colorpicker-container"]//tf-colorpicker//tf-button';
  this.xpathEditChart = '//*[@data-qa-id="formatter-adv-pane"]';
  this.xpathOptionsPane = '//tf-options-pane[not(contains(@class,"ng-hide"))]';
  this.xpathBoldButton = '//*[@data-qa-class="bold-button"]';
  this.xpathSeriesNameListBox = '//*[@data-qa-class="series-name-listbox"]';
  this.xpathOKOrCancelButton = '//*[@data-qa-id="replacingText-button"]';
  this.xpathSeriesNameInputBox = '//*[@data-qa-class="text-box"]';
};

/****************************************************************************************/
/* Function: isEditChartMode                                                            */
/* Description: This function is used to verify that the application is in Edit Chart   */
/*              Mode or not                                                             */
/* Return: Returns true if application is Edit Chart Mode otherwise false               */
/****************************************************************************************/
PA3EditChartMode.prototype.isEditChartMode = function() {
  var xpath = '//pa-edit-mode-banner[@mode="charting"]/div[@id="editModeBanner"]/div[contains(text(),"Edit Chart Mode")]';
  return element(by.xpath(xpath)).isPresent();
};

PA3EditChartMode.prototype.getReportCalculationDlg = function() {
  return element(by.xpath('//div[@class="cg-busy cg-busy-animation"]'));
};

/****************************************************************************************/
/* Function: getButton                                                                  */
/* Description: This function is used to get reference of button inside Edit Chart List */
/* Return: Returns the reference of the button.                                        */
/****************************************************************************************/
PA3EditChartMode.prototype.getButton = function(btnName) {
  var xpathButton = '//pa-edit-mode-banner[@mode="charting"]/div[@id="editModeBanner"]//tf-button//span[contains(text(),"' + btnName + '")]';
  return element(by.xpath(xpathButton));
};

PA3EditChartMode.prototype.getChart = function() {
  return element(by.xpath('//an-chart'));
};

PA3EditChartMode.prototype.getReportCalculationDlg = function() {
  return element(by.xpath('//div[@class="cg-busy cg-busy-animation"]'));
};

PA3EditChartMode.prototype.getSectionFromLHP = function(sectionName) {
  return element(by.xpath('//*[@ui-view="lhp"]//*[@section-title="' + sectionName + '"]//tf-accordion-section-heading'));
};

/**********************************************************************************************************************
 * Function getDropdown                                                                                               *
 * Description: This function is used to get the reference of a dropdown menu in the LHP                              *
 * Return: Returns the reference of the dropdown                                                                      *
 * @param sectionName Name of the LHP section                                                                         *
 * @param subSectionName Name of the subsection in the LHP                                                            *
 * @param ddName (Optional) Name of the dropdown.  Must be exact text including any punctuation like colons           *
 * @param index Order of the dropdown in the page (temporary until QAIDS/Classes are in PA3)                          *
 **********************************************************************************************************************/
PA3EditChartMode.prototype.getDropdown = function(sectionName, subSectionName, ddName, index) {

  var xpathDropdown = '';

  if (index === undefined || index === '') {
    index = 0;
  }

  if (ddName === undefined || ddName === '') {
    xpathDropdown = '//*[@ui-view="lhp"]//*[@section-title="' + sectionName + '"]//*[normalize-space(.)="' +
      subSectionName + '"]/following-sibling::*//tf-dropdown-select[ancestor::*//div[not(contains(@class, "ng-hide"))]]';
  } else {
    xpathDropdown = '//*[@ui-view="lhp"]//*[@section-title="' + sectionName + '"]//*[normalize-space(.)="' +
      subSectionName + '"]/following-sibling::*//*[@class="form-group"][.//label[normalize-space(.)="' +
      ddName + '"]]//tf-dropdown-select[ancestor::*//div[not(contains(@class, "ng-hide"))]]';
  }

  return element.all(by.xpath(xpathDropdown)).get(index);
};

PA3EditChartMode.prototype.getDropDownItem = function(item) {
  return element(by.xpath('//*[not(contains(@class, "ng-hide")) and @ng-if]//tf-dropdown-select-item[normalize-space( . )="' + item + '"]'));
};

/**********************************************************************************************************************
 * Function getRadioButton                                                                                            *
 * Description: This function is used to get the reference of a radio button in the LHP                               *
 * Return: Returns the reference of the radio button                                                                  *
 * @param sectionName Name of the LHP section                                                                         *
 * @param subSectionName Name of the subsection in the LHP                                                            *
 * @param rbName Name of the radio button.  Must be exact text including any punctuation like colons                  *
 **********************************************************************************************************************/
PA3EditChartMode.prototype.getRadioButton = function(sectionName, subSectionName, rbName) {

  var xpathRadioButton = '//*[@ui-view="lhp"]//*[@section-title="' + sectionName + '"]//*[normalize-space(.)="' +
    subSectionName + '"]/following-sibling::*//label[normalize-space(.)="' + rbName + '"]' +
    '//tf-radio[ancestor::*//div[not(contains(@class, "ng-hide"))]]';
  return element(by.xpath(xpathRadioButton));
};

/**********************************************************************************************************************
 * Function getCheckbox                                                                                               *
 * Description: This function is used to get the reference of a checkbox in the LHP                                   *
 * Return: Returns the reference of the checkbox                                                                      *
 * @param sectionName Name of the LHP section                                                                         *
 * @param subSectionName Name of the subsection in the LHP                                                            *
 * @param cbName Name of the checkbox.  Must be exact text including any punctuation like colons                      *
 **********************************************************************************************************************/
PA3EditChartMode.prototype.getCheckbox = function(sectionName, subSectionName, cbName) {

  var xpathCheckbox = '//*[@ui-view="lhp"]//*[@section-title="' + sectionName + '"]//*[normalize-space(.)="' +
    subSectionName + '"]/following-sibling::*//tf-checkbox[normalize-space(.)="' + cbName + '" and ' +
    'ancestor::*//div[not(contains(@class, "ng-hide"))]]';

  return element(by.xpath(xpathCheckbox));
};

/**********************************************************************************************************************
 * Function getColorPicker                                                                                            *
 * Description: This function is used to get the reference of a color picker in the LHP                               *
 * Return: Returns the reference of the color picker                                                                  *
 * @param sectionName Name of the LHP section                                                                         *
 * @param subSectionName Name of the subsection in the LHP                                                            *
 * @param index Order of the color picker in the page (temporary until QAIDS/Classes are in PA3)                      *
 **********************************************************************************************************************/
PA3EditChartMode.prototype.getColorPicker = function(sectionName, subSectionName, index) {

  var xpathColorPicker = '//*[@ui-view="lhp"]//*[@section-title="' + sectionName + '"]//*[normalize-space(.)="' +
    subSectionName + '"]/following-sibling::*//*[contains( @class, "color-picker-dropdown" )]' +
    '//*[@class="btn-select-toggle" and ancestor::*//div[not(contains(@class, "ng-hide"))]]';

  return element.all(by.xpath(xpathColorPicker)).get(index);

};

//Hex code for color must be present in the existing list of colors
//Hex code should be formatted with six digits, no # sign, and in all capitals (example: hexColor = FFFFFF)
//If "No Background Color" is desired, call this function with hexColor = transparent
PA3EditChartMode.prototype.getColorPickerOptionByHex = function(hexColor) {
  return element(by.xpath('//div[@class="dropdown-wrap opened"]//li[@data-value="' + hexColor + '"]'));
};

//This function is 1-indexed (i.e. top left element is 1,1)
PA3EditChartMode.prototype.getColorPickerOptionByIndex = function(rowIndex, columnIndex) {
  return element(by.xpath('//div[@class="dropdown-wrap opened"]//ul[position()="' + rowIndex + '"]//li[position()="' + columnIndex + '"]'));
};

/**********************************************************************************************************************
 * Function getTextBox                                                                                                *
 * Description: This function is used to get the reference of a text box in the LHP                                   *
 * Return: Returns the reference of the text box                                                                      *
 * @param sectionName Name of the LHP section                                                                         *
 * @param subSectionName Name of the subsection in the LHP                                                            *
 * @param tbName (Optional) Name of the text box.  Must be exact text including any punctuation like colons           *
 **********************************************************************************************************************/
PA3EditChartMode.prototype.getTextBox = function(sectionName, subSectionName, tbName) {

  var xpathTextBox = '';

  if (tbName === undefined || tbName === '') {
    xpathTextBox = '//*[@ui-view="lhp"]//*[@section-title="' + sectionName + '"]//*[normalize-space(.)="' +
      subSectionName + '"]/following-sibling::*//input[ancestor::*//div[not(contains(@class, "ng-hide"))]]';
  } else {
    xpathTextBox = '//*[@ui-view="lhp"]//*[@section-title="' + sectionName + '"]//*[normalize-space(.)="' +
      subSectionName + '"]/following-sibling::*//*[normalize-space(.)="' +
      tbName + '"]/following-sibling::*//input[ancestor::*//div[not(contains(@class, "ng-hide"))]]';
  }

  return element(by.xpath(xpathTextBox));
};

/**********************************************************************************************************************
 * Function getInputDropdown                                                                                          *
 * Description: This function is used to get the reference of an input dropdown in the LHP                            *
 * Return: Returns the reference of the input dropdown                                                                *
 * @param sectionName Name of the LHP section                                                                         *
 * @param subSectionName Name of the subsection in the LHP                                                            *
 **********************************************************************************************************************/
PA3EditChartMode.prototype.getInputDropdown = function(sectionName, subSectionName) {

  var xpathInputDropdown = '//*[@ui-view="lhp"]//*[@section-title="' + sectionName + '"]//*[normalize-space(.)="' +
    subSectionName + '"]/following-sibling::*//*[contains( @class, "tf-textbox tf-combobox" )]' +
    '//*[@class="btn-box-toggle" and ancestor::*//div[not(contains(@class, "ng-hide"))]]';
  return element(by.xpath(xpathInputDropdown));
};

/**********************************************************************************************************************
 * Function getInputDropdownTextBox                                                                                   *
 * Description: This function is used to get the reference of an input dropdown text box in the LHP                   *
 * Return: Returns the reference of the an input dropdown text box                                                    *
 * @param sectionName Name of the LHP section                                                                         *
 * @param subSectionName Name of the subsection in the LHP                                                            *
 **********************************************************************************************************************/
PA3EditChartMode.prototype.getInputDropdownTextBox = function(sectionName, subSectionName) {

  var xpathInputDropdown = '//*[@ui-view="lhp"]//*[@section-title="' + sectionName + '"]//*[normalize-space(.)="' +
    subSectionName + '"]/following-sibling::*//*[contains( @class, "tf-textbox tf-combobox" )]' +
    '//input[ancestor::*//div[not(contains(@class, "ng-hide"))]]';
  return element(by.xpath(xpathInputDropdown));
};

PA3EditChartMode.prototype.getInputDropDownItem = function(item) {
  return element(by.xpath('//div[@class="dropdown-wrap opened"]//li[normalize-space( . )="' + item + '"]'));
};

/***********************************
 * Multi Chart Data Series Options *s
 * -Column                         *
 * -Columns (Time Series)          *
 * -Custom (Time Series)           *
 * -Lines (Time Series)            *
 * -Bar                            *
 * -Pie                            *
 * -Scatter                        *
 ***********************************/
PA3EditChartMode.prototype.getAddDataItem = function() {
  return element(by.xpath('//*[@id="pa-chart-data-series-widget"]//*[@id="pa-chart-data-series-add-btn"]'));
};

/***********************************
 * Multi Chart Data Series Options *
 * -Column                         *
 * -Columns (Time Series)          *
 * -Custom (Time Series)           *
 * -Lines (Time Series)            *
 * -Bar                            *
 ***********************************/
PA3EditChartMode.prototype.getDataSeriesListBox = function() {
  return element(by.xpath('//*[@id="pa-chart-data-series-widget"]//*[@id="pa-chart-data-series-listbox"]'));
};

PA3EditChartMode.prototype.getDataSeriesListBoxItem = function(dataSeries) {
  return element(by.xpath('//*[@id="pa-chart-data-series-listbox"]//tf-listbox2-item[.//tf-listbox2-item-title[normalize-space(.)="' + dataSeries + '"]]'));
};

PA3EditChartMode.prototype.getDataSeriesListBoxItemConfigureButton = function(dataSeries) {
  return element(by.xpath('//*[@id="pa-chart-data-series-listbox"]//tf-listbox2-item[.//tf-listbox2-item-title[normalize-space(.)="' + dataSeries + '"]]//tf-action-configure'));
};

PA3EditChartMode.prototype.getDataSeriesListBoxItemRemoveButton = function(dataSeries) {
  return element(by.xpath('//*[@id="pa-chart-data-series-listbox"]//tf-listbox2-item[.//tf-listbox2-item-title[normalize-space(.)="' + dataSeries + '"]]//tf-action-remove'));
};

/**
 * @function getSeriesColor
 * @description This Function is used to get background or fore ground color of a series in Chart.
 * @param {string} colorPosition Position of the color you want.
 * Example: Foreground/Background.
 * @param {string} seriesName Name of the series.
 * Example: Series 1.
 * @param {number} [seriesIndex] Index of the series.
 * Example 0, 1.
 * @returns Returns the series color.
 */
PA3EditChartMode.prototype.getSeriesColor = function(seriesName, colorPosition, seriesIndex) {

  // Assigning default value for seriesIndex
  if (seriesIndex === undefined) {
    seriesIndex = 0;
  }

  return browser.executeScript(function(seriesName, colorPosition, seriesIndex) {

    // Variable(s)
    var chartObject = $('#fch-preview-chart').data('chart');

    if (colorPosition.toLowerCase() === 'foreground') {
      return chartObject.getObjectById(seriesName, seriesIndex).getSeriesFGColor();
    } else if (colorPosition.toLowerCase() === 'background') {
      return chartObject.getObjectById(seriesName, seriesIndex).getSeriesBGColor();
    }
  }, seriesName, colorPosition, seriesIndex);
};

/**
 * @function getXorYAxisPropertiesByAttribute
 * @description This Function is used get the x or y axis property based on given attribute.
 * @param {string} axisName Name of the Axis.
 * Example:X or Y.
 * @param {string} attributeName Name of Attribute.
 * Example: Title or TitleText etc
 * @param {number} [axisNumber] Axis number.
 * Example:1/2.
 * @param {string} [plotName] Pass plot name.
 * You don't have to pass this parameter unless plot name is not the "Chart";
 * @returns {promise} Promise which resolve the x or y axis property.
 */
PA3EditChartMode.prototype.getXorYAxisPropertiesByAttribute = function(axisName, attributeName, axisNumber, plotName) {

  var defer = protractor.promise.defer();
  var promise = defer.promise;

  browser.executeScript(function(axisName, attributeName, axisNumber, plotName) {

    // Variable(s)
    var chartObject = $('#fch-preview-chart').data('chart');
    var objectName;

    // Plot name is the "Chart"
    if (plotName === null || plotName === '') {
      // If Only one axis present
      if (axisNumber === null || axisNumber === '') {
        objectName = 'FC_Chart_' + axisName.toUpperCase() + '_AXIS';
      } else {
        // More than one axis present
        objectName = 'FC_Chart_' + axisName.toUpperCase() + axisNumber + '_AXIS';
      }
    } else {
      // Plot name is not the "Chart"
      // If Only one axis present
      if (axisNumber === null || axisNumber === '') {
        objectName = 'FC_' + plotName + '_' + axisName.toUpperCase() + '_AXIS';
      } else {
        // More than one axis present
        objectName = 'FC_' + plotName + '_' + axisName.toUpperCase() + axisNumber + '_AXIS';
      }
    }

    var propertyName = chartObject.getObjectById(objectName).getAttribute(attributeName);

    return propertyName;
  }, axisName, attributeName, axisNumber, plotName).then(function(value) {
    defer.fulfill(value);
  });

  return promise;
};

module.exports = new PA3EditChartMode();
