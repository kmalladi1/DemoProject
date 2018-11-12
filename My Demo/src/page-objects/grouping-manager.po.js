'use strict';
/*global XPathResult:true*/

var GroupingManager = function() {
  this.xpathReportDropdown = '//*[@data-qa-id="dropdown-report"]';
  this.xpathOfSaveLocationDropdown = '//*[@data-qa-id="dropdown-save-location"]';

  // replacingText: Should replace with "left" or "right"
  this.xpathDatePickersOfDateOption = '//*[normalize-space(.)="Date:"]/following-sibling::*//*[@data-qa-id="datepicker-replacingText"]//tf-datepicker';
};

/********************************************************************************************/
/* Function: getElementFromSpecifiedLevel                                                   */
/* Description: This function is used to get reference of specified element based on the    */
/*              level specified.                                                            */
/* Params: 1. levelNumber -> Tree level number. Based on this number all the elements from  */
/*            this level will be collected.                                                 */
/*         2. elementName: Name of the element whose reference has to be collected.         */
/*         3. rowClassName(optional) -> This variable is used to pass the class name of the */
/*            rows from the DOM tree.                                                       */
/*            Default value is "grid-canvas grid-canvas-bottom grid-canvas-left".           */
/* Return: Promise which resolves to array of references of elements from specified level.  */
/* NOTE: You can get references only for elements which are visible on the web page.        */
/********************************************************************************************/
GroupingManager.prototype.getElementFromSpecifiedLevel = function(levelNumber, elementName, rowClassName) {
  var xpathLevelElements;
  var xpathTable;

  // Set values for optional parameter
  if (rowClassName === undefined) {
    rowClassName = 'grid-canvas grid-canvas-top grid-canvas-left';
  }

  xpathTable = '//tf-dialog[contains(.,"Grouping Manager")]//*[@data-qa-class="slick-grid" and @options="ctrl.grid.options"]';

  if (levelNumber === 1) {
    xpathLevelElements = xpathTable + '//*[contains(@class, "' + rowClassName + '")]' +
      '//*[@class="indent0"]/ancestor::*[contains(@class, "slick-row") and descendant::*[normalize-space(.)="' + elementName + '"]]';
  } else if (levelNumber === 2) {
    xpathLevelElements = xpathTable + '//*[contains(@class, "' + rowClassName + '")]' +
      '//*[@class="indent" and contains(@style, "width: 40px;")]/ancestor::*[contains(@class, "slick-row") ' +
      'and descendant::*[normalize-space(.)="' + elementName + '"]]';
  } else {
    xpathLevelElements = '//*[contains(@class, "' + rowClassName + '")]' +
      '//*[@class="indent" and contains(@style, "width: ' + (20 * parseInt(levelNumber)) + 'px;")]' +
      '/ancestor::*[contains(@class, "slick-row") and descendant::*[normalize-space(.)="' + elementName + '"]]';
  }

  return element(by.xpath(xpathLevelElements));
};

/****************************************************************************************/
/* Function: getButton                                                                  */
/* Description: This function is used to get the reference of button.                   */
/* Params: btnName -> Name of the Button.                                               */
/*                  Example: Add, 'Apply & Close'                                       */
/* Return: Promise which resolved to reference of button.                               */
/****************************************************************************************/
GroupingManager.prototype.getButton = function(btnName) {
  var xpathButton;

  if (btnName.toLowerCase() === 'add') {
    xpathButton = '//*[@data-qa-id="button-add-override"]';
  } else if (btnName.toLowerCase() === 'remove all') {
    xpathButton = '//*[@data-qa-id="button-remove-all"]';
  }else if (btnName.toLowerCase() === 'download') {
    xpathButton = '//*[@data-qa-id="button-download"]';
  } else {
    xpathButton = '//tf-dialog-footer//tf-button[normalize-space(.)="' + btnName + '"]';
  }

  return element(by.xpath(xpathButton));
};

/****************************************************************************************/
/* Function: getLevelDropDown                                                           */
/* Description: This function is used to reference of Level drop down function.         */
/****************************************************************************************/
GroupingManager.prototype.getLevelDropDown = function(dropDownName, bool) {
  var xpathLevelDropDown;

  if (bool === undefined) {
    bool = false;
  }

  if (bool) {
    xpathLevelDropDown = '//*[@class="gm-content-rhp"]//*[contains(@class, "gm-content-data-row") and ' +
      'descendant::*[normalize-space(.)="' + dropDownName + '"]]//*[@data-qa-id="input-box-level"]';
  } else {
    xpathLevelDropDown = '//*[@class="gm-content-rhp"]//*[contains(@class, "gm-content-data-row") and ' +
      'descendant::*[normalize-space(.)="' + dropDownName + '"]]//*[@data-qa-id="input-box-level"]//*[@tf-button]';
  }

  return element(by.xpath(xpathLevelDropDown));
};

/****************************************************************************************/
/* Function: getLevelDropDownOption                                                     */
/* Description: This function is used to reference of Level drop down option function.  */
/****************************************************************************************/
GroupingManager.prototype.getLevelDropDownOption = function(option) {
  var xpathLevelDropDownOption;

  xpathLevelDropDownOption = '//tf-dropdown//tf-dropdown-select-item[normalize-space(.)="' + option + '"]';

  return element(by.xpath(xpathLevelDropDownOption));
};

/**
 * @function getGridXpath
 * @description This function is used to get the XPATH of the grid present in LHS side of "Grouping Manager"
 * @returns {string} XPATH of grid from LHS side
 */
GroupingManager.prototype.getGridXpath = function() {
  return '//*[@data-qa-class="slick-grid"]';
};

/**
 * @function getAllColumnNamesFromtheSlickGrid
 * @description This function is used get all the column names from grid present in LHS side of "Grouping Manager"
 * @returns {array}  Array which hold names of all columns from present in LHS side of "Grouping Manager"
 */
GroupingManager.prototype.getAllColumnNamesFromtheSlickGrid = function() {
  var xpathTile = this.getGridXpath();
  var options = {
    gridXpath: xpathTile,
  };

  return browser.executeScript(function(options) {
    var gridXpath = options.gridXpath;
    var grid = angular.element(document.evaluate(gridXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
      .singleNodeValue).controller('tfSlickGrid').grid;

    var colNames = _.map(grid.getColumns(), function(colRef) {
      return colRef.name;
    });

    return colNames;
  }, options);
};

/**
 * @function getDataFromRHP
 * @description This function is used to get the value of the data for a element in RHP.
 * @param {string} name It can be "Identifier:" or "Name:" or "Current Grouping:".
 * @returns {string} Returns the value corresponding to the name entered.
 */
GroupingManager.prototype.getDataFromRHP = function(name) {
  var xpathData;
  var elementName;
  var elements = {
    'Identifier:': 'id', 'Name:': 'name', 'Current Grouping:': 'group',
  };
  elementName = elements[name];
  xpathData = '//*[@id="gm-security-' + elementName + '-row"]//*[@class="gm-content-data-right ng-binding"]';
  return element(by.xpath(xpathData));
};

/**
 * @function scrollRowToTop
 * @description This function is used to scroll a row to top of the grid in LHS side of "Grouping Manager".
 * @param {number} index Refers to the row-index.Default value is 0.
 * @returns NA.
 */
GroupingManager.prototype.scrollRowToTop = function(index) {
  var xpathTile = this.getGridXpath();
  var options = {
    gridXpath: xpathTile,
  };

  return browser.executeScript(function(options, index) {
    var gridXpath = options.gridXpath;
    var grid = angular.element(document.evaluate(gridXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
      .singleNodeValue).controller('tfSlickGrid').grid;
    return grid.scrollRowToTop(index);
  }, options, index);
};

/**
 * @function expandTree
 * @description This function is used to expand given element tree from grid in LHS side of Grouping Manager.
 * @param {string} elementPath Element Names which has to be expanded. If multiple element has to be expanded pass
 *                              their names separated by "|" symbol.
 * @param {string} [excludeElements] Name of the element(s) which has to be exclude from expand element list.
 *                                   For excluding multiple element from expanding pass their names separated by
 *                                   "|" symbol.
 *                                   Ex: To exclude 'Commercial Services' from 'Commercial Services|Advertising
 *                                   /Marketing Services' pass this parameter as 'Commercial Services'.
 * @returns {promise} Promise which resolves to boolean value ie., TRUE if calculated data appeared on web page
 *                      otherwise FALSE.
 */
GroupingManager.prototype.expandTree = function(elementPath, excludeElements) {
  var arrElements = elementPath.split('|');
  var arrExcludedElements;
  var xpathExpandButton;
  var _this = this;

  // Setting the slick type
  var slickType = 'grid-canvas grid-canvas-top grid-canvas-left';

  var xpathTable = this.getGridXpath();

  if (excludeElements === undefined) {
    arrExcludedElements = undefined;
  } else {
    arrExcludedElements = excludeElements.split('|');
  }

  if (arrElements.length === 1) {
    xpathExpandButton = xpathTable + '//*[contains(@class, "' + slickType + '")]' + '//*[contains(@class, "slick-row")][normalize-space(.)="' + arrElements[0] + '"]//i';

    var rowReference = element(by.xpath(xpathExpandButton + '/ancestor::*[contains(@class, "slick-row")]'));

    // Scrolling row into view based on the index
    rowReference.getAttribute('style').then(function(value) {
      var temp = value.replace(/^\D+/g, '').match(/\d+/)[0];
      var tempRowIndex = temp / 18;
      _this.scrollRowToTop(tempRowIndex);
    });

    // Get the element into visibility before expanding
    Utilities.makeElementVisible(element.all(by.xpath(xpathExpandButton)).first());

    element.all(by.xpath(xpathExpandButton)).first().click().then(function() {
    }, function(error) {
      if (error.name === 'StaleElementReferenceError') {
        element.all(by.xpath(xpathExpandButton)).first().click();
      } else {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      }
    });
  } else {
    xpathExpandButton = xpathTable + '//*[contains(@class, "' + slickType + '")]';
    for (var i = 0; i < arrElements.length; i++) {

      // XPATH for expanding first element
      if (i === 0) {
        xpathExpandButton += '//*[contains(@class, "slick-row")][normalize-space(.)="' + arrElements[0] + '"]//i';
      }

      // XPATH for expanding remaining elements
      if (i > 0) {
        xpathExpandButton += '/ancestor::*[contains(@class, "slick-row")]/following-sibling::*' + '//*[normalize-space(.)="' + arrElements[i] + '"]/i';
      }

      if (arrExcludedElements === undefined) {
        // Get the element into visibility before expanding
        Utilities.makeElementVisible(element.all(by.xpath(xpathExpandButton)).first());

        element.all(by.xpath(xpathExpandButton)).first().click();
      } else if (arrExcludedElements.indexOf(arrElements[i]) < 0) {
        // Get the element into visibility before expanding
        Utilities.makeElementVisible(element(by.xpath(xpathExpandButton)));

        element.all(by.xpath(xpathExpandButton)).first().click();
      } else {
        arrExcludedElements.splice(arrExcludedElements.indexOf(arrElements[i]), 1);
      }
    }
  }
};

/**
 * @function checkIfTreeExpanded
 * @description This function is used to verify if given tree is expanded or not in LHS grid of "Groupimng Manager"
 * @param {string} elementPath Element Names which are expanded. If multiple element are expanded pass
 *                              their names separated by "|" symbol.
 * @returns {promise} Promise which resolves to boolean value ie., TRUE if calculated data appeared on
 * web page otherwise FALSE.
 */
GroupingManager.prototype.checkIfTreeExpanded = function(elementPath) {
  var arrElements = elementPath.split('|');
  var xpathExpandButton;

  // Setting the slick type
  var slickType = 'grid-canvas grid-canvas-top grid-canvas-left';

  var xpathTable = this.getGridXpath();

  if (arrElements.length === 1) {
    xpathExpandButton = xpathTable + '//*[contains(@class, "' + slickType + '")]' + '//*[contains(@class, "slick-row")][normalize-space(.)="' + arrElements[0] + '"]//i';

    // Get the element into visibility before expanding
    Utilities.makeElementVisible(element.all(by.xpath(xpathExpandButton)).first());

    // Verifying if the tree is expanded
    expect(element(by.xpath(xpathExpandButton)).getAttribute('class')).toContain('opened');
  } else {
    xpathExpandButton = xpathTable + '//*[contains(@class, "' + slickType + '")]';
    for (var i = 0; i < arrElements.length; i++) {

      // XPATH for expanding first element
      if (i === 0) {
        xpathExpandButton += '//*[contains(@class, "slick-row")][normalize-space(.)="' + arrElements[0] + '"]//i';
      }

      // XPATH for expanding remaining elements
      if (i > 0) {
        xpathExpandButton += '/ancestor::*[contains(@class, "slick-row")]/following-sibling::*' + '//*[normalize-space(.)="' + arrElements[i] + '"]/i';
      }

      // Get the element into visibility before verifying
      Utilities.makeElementVisible(element.all(by.xpath(xpathExpandButton)).first());

      // Verifying if the tree is expanded
      expect(element.all(by.xpath(xpathExpandButton)).first().getAttribute('class')).toContain('opened');
    }
  }
};

module.exports = new GroupingManager();
