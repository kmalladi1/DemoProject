'use strict';

var ChartingUtilities = function() {
  this.RGBColorJSON = {
    'sky-blue': 'rgb(0, 174, 239)', green: 'rgb(153, 204, 51)', red: 'rgb(255, 55, 55)',
    black: 'rgb(0, 0, 0)',
  };
  this.HexColorJSON = {'sky-blue': '#00AEEF', green: '#99cc33', red: '#ff3737', black: '#000000'};
  this.displayOptionsValuesDD = '//tf-dropdown-select[@data-qa-id="display-values"]';
  this.displayOptionsValuesInput = '//*[@data-qa-id="display-values-value"]';
  this.xpathIconAfterRightClick = '//*[contains(@class,"tf-menu")]//*[normalize-space(text())="replacingText"]/i';
  this.axisTitleXpath = '//tf-dropdown//*[@data-qa-class="text-box"]';
  this.xpathStyleDropdown = '//*[normalize-space(.)="replacingText"]/following-sibling::*//tf-dropdown-select' + '[contains(@data-qa-class,"style-dropdown-button")]';
  this.xpathFontSizeDropDown = '//*[@data-qa-class="font-size-dropdown-button"]';
  this.xpathDropdown = '//*[contains(@data-qa-class, "replacingText-dropdown")]';
  this.xpathOfLineStyleOption = '//*[contains(@class, "fch-replacingText-icon")]/ancestor::tf-dropdown-select-item';
};

/**
 * This function takes in the name of a chart and switches the tile to that chart
 */
ChartingUtilities.prototype.selectChartFromReport = function(reportName, chartName) {

  it('Should click on Chart icon available in Workspace', function() {
    PA3MainPage.getChartMenuButtonFromReportWorkspace(reportName).click();
  });

  it('Should select "' + chartName + '" from the Chart icon drop down', function() {
    PA3MainPage.getOptionFromWrenchMenu(chartName).click().then(function() {
    }, function(err) {

      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });
  });

  it('Wait for "' + chartName + '" to calculate', function() {
    expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
  });
};

/**
 * This function takes in the name of a chart tile and opens edit chart mode for that chart
 */
ChartingUtilities.prototype.openEditChartMode = function(chartName) {

  it('Should wait for the wrench button to be visible', function() {
    expect(Utilities.waitUntilElementAppears(PA3MainPage.getWrenchIconFromReportWorkspace(chartName), 600000)).toBeTruthy();
  });

  it('Should click on "Wrench" button from the "' + chartName + '" workspace and select "Edit Chart"', function() {

    PA3MainPage.getWrenchIconFromReportWorkspace(chartName).click();

    PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Edit Chart').click();
  });

  it('Wait for "' + chartName + '" to calculate', function() {
    expect(Utilities.waitUntilElementDisappears(PA3EditChartMode.getReportCalculationDlg(), 600000)).toBeTruthy();
  });

  it('Verify that the application is changed to Edit Chart Mode', function() {
    expect(PA3EditChartMode.isEditChartMode()).toBeTruthy();
  });
};

/**
 * This function takes in an array of strings corresponding to elements in a dropdown menu and verifies that all the
 * elements exist.  It does not verify the order of the elements, only that they are all present
 */
ChartingUtilities.prototype.verifyDropdownContains = function(menuItemsArray) {
  var deferred = protractor.promise.defer();

  var index;

  menuItemsArray.forEach(function(element, index) {
    it('Should verify that the ' + element + ' option exists', function() {
      expect(PA3EditChartMode.getDropDownItem(element).isPresent()).toBeTruthy();
    });
  });

  return deferred.promise;
};

/**
 * This function takes in an array of strings corresponding to elements in an input dropdown menu and verifies that all the
 * elements exist.  It does not verify the order of the elements, only that they are all present
 */
ChartingUtilities.prototype.verifyInputDropdownContains = function(menuItemsArray) {
  var deferred = protractor.promise.defer();

  var index;

  menuItemsArray.forEach(function(element, index) {
    it('Should verify that the ' + element + ' option exists', function() {
      expect(PA3EditChartMode.getInputDropDownItem(element).isPresent()).toBeTruthy();
    });
  });

  return deferred.promise;
};

/**
 * function: getChartString
 * description: This function is used to get the chart string value
 * returns: promise resolves to the Chart string value
 */
ChartingUtilities.prototype.getChartString = function() {
  var defer = protractor.promise.defer();
  var promise = defer.promise;

  browser.driver.executeScript('return $( ".pa-chart-non-formatting-mode" ).data( "$fdsChartController" )' + '.fdsChart.getPNG()').then(function(data) {
    defer.fulfill(data);
  });

  return promise;
};

/**
 * function: hoverOnPixel
 * description: Hoverovers on the particular series
 * params: 1. seriesId: ID of the series
 *          Ex: 'Series 1'
 *          2. Index( Optional ): Index of the series
 * returns: NA
 */
ChartingUtilities.prototype.hoverOnPixel = function(seriesId, index) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  if (index === undefined) {
    index = 0;
  }

  browser.driver.executeScript(function(seriesId, index) {
    //  Creating chart object.
    var chartObject = $('.pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart;

    // Getting pixel coordinates of the series.
    var p = chartObject.querySeriesPixel(seriesId, index);

    // Hovers on the specified pixel.
    chartObject.hoverOnPixel(p.x, p.y);
  }, seriesId, index).then(function() {

    // Wait for tooltip to appear
    browser.sleep(2000);
  });

  return promise;
};

/**
 * @function getOptionAfterRightClickOnChart
 * @description This function is used to get reference of option from the drop down after right click on chart.
 * @param {string} optionName Name of Option.
 * Ex: Change Series.
 * @returns {promise} Promise which resolve reference of option from the drop down after right click on chart.
 */
ChartingUtilities.prototype.getOptionAfterRightClickOnChart = function(optionName) {
  var xpath;
  xpath = '//*[contains(@class,"tf-menu")]//*[normalize-space(text())="' + optionName + '"]';

  return element(by.xpath(xpath));
};

/**
 * @function getColorPickerButton
 * @description This function is used to get reference of color picker button from the drop down.
 * @param {string} [dropdownName] Name of Drop down.
 * @returns {promise} Promise which resolve reference of color picker button.
 */
ChartingUtilities.prototype.getColorPickerButton = function(dropDownName) {
  var xpath;
  if (dropDownName === undefined) {
    xpath = '//tf-dropdown//tr[not(contains(@class,"ng-hide"))]' + '//*[@data-qa-class="color-picker-dropdown-button"]//tf-button';
  } else if (dropDownName === 'Fill Style') {
    xpath = '//tf-dropdown//*[normalize-space(.)="Fill Style"]/parent::*//*[@data-qa-class="bg-colorpicker-container"]' + '//*[@data-qa-class="color-picker-dropdown-button"]//tf-button';
  } else {
    xpath = '//tf-colorpicker[contains(@ng-model, "' + dropDownName.toLowerCase() + '")]';
  }

  return new TestHelpers.Button(by.xpath(xpath));
};

/**
 * @function selectColorFrmDD
 * @description This function is used to select color from the color picker drop down.
 * @param {string} rgbColor RGB of the color.
 */
ChartingUtilities.prototype.selectColorFrmDD = function(rgbColor) {
  var xpath = '//tf-dropdown//tf-color-swatch[descendant::*[@style="background-color: ' + rgbColor + ';"]]';
  element(by.xpath(xpath)).click().then(function() {
  }, function(err) {

    expect(false).customError(err);
    CommonFunctions.takeScreenShot();
  });
};

/**
 * @function verifyColorSetToDD
 * @description This function is used to verify color set to color picker drop down.
 * @param {string} [dropdownName] Name of Drop down.
 * @param {string} [rgbColor] rgbColor RGB of the color.
 */
ChartingUtilities.prototype.verifyColorSetToDD = function(dropdownName, rgbColor) {

  var xpath = '//tf-colorpicker[contains(@ng-model, "' + dropdownName.toLowerCase() + '")]' + '//*[contains(@class,"select-color-swatch")]';
  element(by.xpath(xpath)).getAttribute('style').then(function(value) {
    if (value.indexOf(rgbColor) === -1) {
      expect(false).customError(dropdownName + 'drop down is not set to ' + rgbColor + ', found : ' + value);
      CommonFunctions.takeScreenShot();
    }
  });
};

/**
 * @function getBoldItalicUnderlineButton
 * @description This function is used to get the reference of bold / italic/ underline button.
 * @param {string} buttonName Name of button.
 * Example: Bold/Italic/Underline
 * @param {string} [rgbColor] rgbColor RGB of the color.
 */
ChartingUtilities.prototype.getBoldItalicUnderlineButton = function(buttonName) {

  var xpath = '//tf-dropdown//*[@data-qa-class="' + buttonName.toLowerCase() + '-button"]';
  return element(by.xpath(xpath));
};

/**
 * @function getElementsFromPanel
 * @description This function is used to get the reference of elements form the panel.
 * @param {string} [sectionName] Name of section.
 * Example: Line Style, Font
 * @param {string} [dropdownName] Name of the dropdown.
 * Example: Line Style, Line Width
 * @returns {promise} Promise which resolve reference of elements.
 */
ChartingUtilities.prototype.getElementsFromPanel = function(sectionName, dropdownName) {
  var xpath;
  if (dropdownName === 'Color Picker') {
    xpath = '//*[@data-qa-class="' + sectionName.replace(/\s/g, '-').toLowerCase() + '-options-section"]//*' +
      '[@data-qa-class="' + dropdownName.replace(/\s/g, '-').toLowerCase() + '-dropdown-button"]//tf-button';
  } else {
    xpath = '//*[@data-qa-class="' + sectionName.replace(/\s/g, '-').toLowerCase() + '-options-section"]//*' +
      '[@data-qa-class="' + dropdownName.replace(/\s/g, '-').toLowerCase() + '-dropdown-button"]//span[@tf-button]';
  }

  return element(by.xpath(xpath));
};

/**
 * @function getToolTipText
 * @description This function is used to get the text from Tooltip populated.
 * @returns {text} Returns Tooltip text.
 */
ChartingUtilities.prototype.getToolTipText = function() {
  return browser.driver.executeScript(function() {
    return $('tf-tooltip').text();
  });
};

/**
 * @function rightClickOnChartAndSelectOption
 * @description This function is used to right click on given chart and select option from it.
 * @param {string} cssSelector Pass css selector for chart.
 * Example pa-chart-non-formatting-mode.
 * @param {string} chartController  Pass Controller which allow access to chart api.
 * NOTE: Controller differ from application to application. Hence, consult engineer to know correct controller.
 * Example $fdsChartController.
 * @param {string} seriesId Give series id.
 * Example Series 1
 * @param {number} [seriesIndex] Index of the series label.
 * Example 0, 1.
 * @param {string} optionName Name of Option.
 * Ex: Change Series.
 */
ChartingUtilities.prototype.rightClickOnChartAndSelectOption = function(cssSelector, chartController, seriesId,
                                                                        seriesIndex, optionName) {
  it('Should right click on Chart', () => {
    ChartHelpers.rightClickOnSeries(cssSelector, chartController, seriesId, seriesIndex);
  });

  it('Should click on the "' + optionName + '" from the menu list which appears after right click on chart', () => {
    this.getOptionAfterRightClickOnChart(optionName).click().then(() => {
    }, function(err) {

      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });
  });

  // Wait till chart to load
  browser.sleep(3000);
};

/**
 * @function getIDsOfSeriesChildren
 * @description This function is used to get a list of series ids
 * @param {string} cssSelector Pass css selector for chart.
 * Example: pa-chart-non-formatting-mode.
 * @param {string} controller  Pass Controller which allow access to chart api.
 * NOTE: Controller differ from application to application. Hence, consult engineer to know correct controller.
 * Example: $fdsChartController.
 * @param {string} plotID pass the plot id of the chart
 * Example: Chart
 * @returns {promise} Promise which resolves to an array of series ids
 */

ChartingUtilities.prototype.getIDsOfSeriesChildren = function(cssSelector, controller, plotID) {

  return browser.driver.executeScript((cssSelector, controller, plotID) => {
    var IDlist = [];
    var chartObject = $(cssSelector).data(controller).fdsChart.getObjectById(plotID).getSeriesChildren();
    var length = chartObject.length;
    for (var i = 0; i < length; i++) {
      IDlist.push(chartObject[i].id);
    }

    return IDlist;
  }, cssSelector, controller, plotID).then(array => {
    return array;
  });

};

module.exports = new ChartingUtilities();
