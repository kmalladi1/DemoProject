'use strict';

var AuditMode = function() {
  this.xpathAuditDate = '//*[contains(@class, "pa-audit-item")]//*[@class="header-section"]/div[contains(@ng-if, "dateHeader")]';
  this.xpathReportDate = '//*[@id="audit-report-container"]//*[@class="header-section"]//span[contains(@ng-click, "showDatesTab()")]';
  this.xpathReportInputsTable = '//*[contains(@mode, "viewModel.mode")]//*[normalize-space(.)="Report Inputs"]/following-sibling::*//tbody';
  this.columnHelpSectionData = '//*[@data-qa-id="audit-column-help"]//*[contains(@class, "column-information")]';
  this.xpathOfValuesInAuditViewFormulaSection = '//*[@data-qa-id="simple-table-view"]//*[contains(@pa-audit-formula-expression-displayer,"replacingText")]/parent::*';
  this.xpathOfTotal = '//*[@data-qa-id="simple-table-view"]//*[contains(@class,"total")]//*[normalize-space(.)="replacingText"]';
  this.xpathOfArrowButtons = '//*[@data-qa-id="button-replacingText-arrow"]';
  this.xpathOfArrowInAuditReportColumnHeader = '//*[@data-qa-id="group-view-content"]//*[@data-qa-class="slick-grid"]' +
    '//*[contains(@class,"sorted")]//*[contains(@class,"replacingText")]';
  this.xpathOfAuditErrorMessage = '//*[@data-qa-id="audit-unavailable-error"][normalize-space(.)="replacingText"]';
};

/**
 * @function isAuditMode
 * @description This function is used to verify if the PA3 App is opened in "AUDIT" mode.
 * @returns {promise} Promise which resolves to boolean value.
 */
AuditMode.prototype.isAuditMode = function() {
  var xpathAuditBanner = '//*[contains(@class, "audit-banner")]//*[contains(text(),"Audit")]';
  return (element(by.xpath(xpathAuditBanner)).isPresent());
};

/**
 * @function getAuditViewHeader
 * @description This function is used to get the reference of currently auditing Sector or Industry from audit section
 *              of audit mode.
 * @returns {promise} Promise which resolves to the reference of Sector or Industry.
 */
AuditMode.prototype.getAuditViewSubHeader = function() {
  var xpathAuditingSectorOrIndustry = '//*[contains(@data-qa-id,"audit-sub-header")]';
  return (element(by.xpath(xpathAuditingSectorOrIndustry)));
};

/**
 * @function getAuditViewSubHeaderName
 * @description This function is used to get the reference of currently auditing Sector or Industry from audit
 *              section of audit mode.
 * @returns {promise} Promise which resolves to the reference of Sector or IndustryName.
 */
AuditMode.prototype.getAuditViewSubHeaderName = function() {
  var xpathAuditingSectorOrIndustry = '//*[contains(@data-qa-id,"audit-sub-header")]/span[1]';
  return (element(by.xpath(xpathAuditingSectorOrIndustry)));
};

/**
 * @function getAuditViewHeaderValue
 * @description This function is used to get value in title of audit section .
 * @returns {promise} Promise which contains Title of audit section.
 */
AuditMode.prototype.getAuditViewHeaderValue = function() {
  var xpathAuditViewHeaderValue = '//*[contains(@data-qa-id, "audit-header")]/span[2]';
  return (element(by.xpath(xpathAuditViewHeaderValue)));
};

/**
 * @function getAuditViewHeaderName
 * @description This function is used to get title of audit section.
 * @returns {promise} Promise which contains Title of audit section.
 */
AuditMode.prototype.getAuditViewHeaderName = function() {
  var xpathAuditViewHeader = '//*[contains(@data-qa-id, "audit-header")]/span[1]';
  return (element(by.xpath(xpathAuditViewHeader)));
};

/**
 * @function getColumnHelpSectionName
 * @description This function is used to get name of Column Help section.
 * @returns {promise} Promise which resolves to reference of column-help section name from audit section.
 */
AuditMode.prototype.getColumnHelpSectionName = function() {
  var xpathColumnHelpSection = '//*[contains(@class, "column-help-section")]//*[@id="name"]';
  return (element(by.xpath(xpathColumnHelpSection)));
};

/**
 * @function getReportCalculationDlg
 * @description This function is used to get the reference of progress icon.
 * @returns {promise} Promise which resolves to reference of progress icon.
 */
AuditMode.prototype.getReportCalculationDlg = function() {
  var xpathReportCalculation = '//*[contains(@class, "pa-audit-item")]//*[@data-qa-class="progress-indicator"]';
  return element(by.xpath(xpathReportCalculation));
};

/**
 * @function isReportCalculated
 * @description This function is used to check if the given report finished calculation.
 * @param {string} reportName Name of the report whose calculation status has to be verify.
 * @param {boolean} [checkForPresence = false] If this parameter is set to TRUE it'll check for the element existence
 *                                              in the DOM otherwise it'll check if element is visible on the screen.
 * @returns {promise} Promise which resolves to boolean value ie., TRUE if calculated data appeared on web page
 *                      otherwise FALSE. NOTE: Calling isDisplayed() method when element is not present in the DOM will
 *                      throw an Exception.
 */

AuditMode.prototype.isReportCalculated = function(reportName, checkForPresence) {
  var xpathCalculatedData = '//*[@data-qa-id="audit-header"]//*[normalize-space(.) = "' + reportName + '"]//ancestor::*//*[contains(@data-qa-id, "view-header")]' +
    '/following-sibling::*//*[@data-qa-class="slick-grid"]';
  browser.wait(function() {
    return element(by.xpath(xpathCalculatedData)).isDisplayed().then(function(isfound) {
      return isfound;
    }, function() {
      return false;
    });
  }, 3000).then(function() { }, function() { });

  if (!checkForPresence) {
    console.log(reportName);
    return element(by.xpath(xpathCalculatedData)).isDisplayed();
  } else if (checkForPresence) {
    return element(by.xpath(xpathCalculatedData)).isPresent();
  }

};

/**
 * @function verifyIfReportIsCalculated
 * @description Wait for the loading icon to disappear and verify if the given report is calculated.
 * @param {string} reportName Name of the report whose calculation status has to be verified.
 * @example AuditMode.verifyIfReportIsCalculated('Weights');
 * @return NA
 */
AuditMode.prototype.verifyIfReportIsCalculated = function(reportName) {

  var _this = this;

  it('Waiting for "' + reportName + '" report to calculate', function() {
    Utilities.waitUntilElementDisappears(_this.getReportCalculationDlg(), 600000).then(function(loaded) {
      if (!loaded) {
        expect(false).customError('Encountered an error during "' + reportName + '" calculation.');
        CommonFunctions.takeScreenShot();
      }
    });

    // Wait for the element to load
    browser.sleep(3000);
  });

  it('Verifying that "' + reportName + '" report is calculated', function() {
    _this.isReportCalculated(reportName).then(function(option) {
      if (!option) {
        expect(false).customError('Calculated data for "' + reportName + '" report appeared with errors.');
        CommonFunctions.takeScreenShot();
      }
    }, function(error) {
      if (error.name === 'StaleElementReferenceError') {
        expect(_this.isReportCalculated(reportName)).toBeTruthy();
      } else {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      }
    });

  });
};

/**
 * @function getAllElementsFromCalculatedReport
 * @description This function is used to get reference of all the elements from calculated report.
 * @param {string} reportName Name of the report for which calculation is done.
 * @param {boolean} rowClassName Name of the class from DOM in which all the row names exists.
 * Ex: slick-pane slick-pane-top slick-pane-right
 * @returns Promise which resolves to array of references of elements from calculated report.
 */
AuditMode.prototype.getAllElementsFromCalculatedReport = function(reportName, rowClassName) {
  var xpathTable = '//*[@class="header-section"]//*[normalize-space(text())="' + reportName + '"]/ancestor::*[contains' +
    '(@class, "splitter")][1]/descendant::*//*[contains(@class, "tf-slick-grid")]';
  var xpathElements = xpathTable + '//*[contains(@class, "' + rowClassName + '")]//*[contains(@class, "slick-cell")]';

  return element.all(by.xpath(xpathElements));
};

/**
 * @function getValueFromReportOfGivenColumn
 * @description This function is used to get reference of the cell reference from calculated report.
 * @param {string} reportName Name of the report for which calculation is done.
 * @param {string} colName Name of the column.
 * @param {string} colClassName Name of the class from DOM in which all the columns names exists.
 * Ex: slick-pane slick-pane-top slick-pane-left
 * @param {number} rowNum Row number in the calculated report.
 * @param {boolean} [secondSlickgridOption] Pass true if user want reference for second slickgrid.
 * @returns Promise which resolves to array of references of elements from calculated report.
 */
AuditMode.prototype.getValueFromReportOfGivenColumn = function(reportName, colName, colClassName, rowNum, secondSlickgridOption) {
  // Variable(s)
  var defer = protractor.promise.defer();
  var xpathCol;
  var cellReference;
  var promise = defer.promise;
  var indexRef;
  var _this = this;

  var xpathTable;
  if (secondSlickgridOption === undefined) {
    xpathTable = '//*[@class="header-section"]//*[normalize-space(text())="' + reportName + '"]/ancestor::*' +
      '[contains(@class, "splitter")][1]/descendant::*//*[contains(@class, "tf-slick-grid")]';
  } else {
    xpathTable = '//*[normalize-space(text())="' + reportName + '"]/ancestor::*//*[@data-qa-id="group-view-header"]' +
      '/parent::*//*[contains(@class, "tf-slick-grid")]';
  }

  xpathCol = xpathTable + '//*[contains(@class, "' + colClassName + '")]//*[contains(@class, "slick-row") and ' +
    'contains(@style, "top:' + rowNum * 0 + 'px")]';

  if (secondSlickgridOption !== undefined) {
    indexRef = _this.getColumnIndexFromCalculatedReport(reportName, colName, true);
  } else {
    indexRef = _this.getColumnIndexFromCalculatedReport(reportName, colName);
  }

  // Get the column index
  indexRef.then(function(colIndex) {
    xpathCol += '//*[contains(@class, "slick-cell")  and contains(@class, "l' + colIndex + ' r' + colIndex + '")]';

    // Get the reference cells of particular column
    cellReference = element(by.xpath(xpathCol));

    defer.fulfill(cellReference);
  }, function(err) {

    defer.reject(err);
  });

  return promise;

};

/**
 * @function getRowWithIndex
 * @description This function is used to get reference of the elements from calculated report.
 * @param {string} reportName Name of the report for which calculation is done.
 * @param {string} rowClassName Name of the class from DOM in which all the row names exists.
 * Ex: slick-pane slick-pane-top slick-pane-right
 * @param {number} rowNumber Row number in the calculated report.
 * @param {boolean} [secondSlickgridOption] Pass true if user want reference for second slickgrid.
 * @returns Promise which resolves to array of references of elements from calculated report.
 */
AuditMode.prototype.getRowWithIndex = function(reportName, rowClassName, rowNumber, secondSlickgridOption) {
  // Variable(s)
  var defer = protractor.promise.defer();
  var xpathRow;
  var cellReference;
  var promise = defer.promise;
  var xpathTable;
  if (secondSlickgridOption === undefined) {
    xpathTable = '//*[@class="header-section"]//*[normalize-space(text())="' + reportName + '"]/ancestor::*' +
      '[contains(@class, "splitter")][1]/descendant::*//*[contains(@class, "tf-slick-grid")]';
  } else {
    xpathTable = '//*[normalize-space(text())="' + reportName + '"]/ancestor::*//*[@data-qa-id="group-view-header"]' +
      '/parent::*//*[contains(@class, "tf-slick-grid")]';
  }

  xpathRow = xpathTable + '//*[contains(@class, "' + rowClassName + '")]//*[contains(@class, "slick-row") and ' +
    'contains(@style, "top:' + rowNumber * 18 + 'px")]//*[contains(@class, "slick-cell l1 r1")]';

  // Get the reference cells of particular column
  cellReference = element(by.xpath(xpathRow));

  defer.fulfill(cellReference.getText());

  return promise;

};

/**
 * @function getAllColumnOfCalculatedReport
 * @description This function is used to get the reference all columns of calculated report.
 * @param {string} reportName Name of the report for which to calculate All columns.
 * @param {boolean} [secondSlickgridOption] Pass true if user want reference for second slickgrid.
 * @returns Promise which resolves to the array of column references.
 */
AuditMode.prototype.getAllColumnOfCalculatedReport = function(reportName, secondSlickgridOption) {
  var xpathTable;
  if (secondSlickgridOption === undefined) {
    xpathTable = '//*[@class="header-section"]//*[normalize-space(text())="' + reportName + '"]/ancestor::*[contains' +
      '(@class, "splitter")][1]/descendant::*//*[contains(@class, "tf-slick-grid")]';
  } else {
    xpathTable = '//*[normalize-space(text())="' + reportName + '"]/ancestor::*//*[@data-qa-id="group-view-header"]' +
      '/parent::*//*[contains(@class, "tf-slick-grid")]';
  }

  var xpathColumns = xpathTable + '//*[contains(@class, "slick-column-name-text")][text()]';
  return element.all(by.xpath(xpathColumns));
};

/**
 * @function getColumnIndexFromCalculatedReport
 * @description This function is used to get index of column from calculated report.
 * @param {string} reportName Name of the report for which to calculate All columns.
 * @param {string} colName Name of the column whose index has to be found.
 * @returns Promise which resolves index of the given column.
 */
AuditMode.prototype.getColumnIndexFromCalculatedReport = function(reportName, colName, secondSlickgridOption) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  this.getAllColumnOfCalculatedReport(reportName, secondSlickgridOption).map(function(ele, index) {
    Utilities.makeElementVisible(ele);
    return {
      index: index,
      text: ele.getText(),
    };
  }).then(function(items) {
    for (var i = 0; i < items.length; i++) {
      var name = items[i].text.replace(/\n/g, ' ');
      if (colName.indexOf(name) > -1) {
        defer.fulfill(i + 1);
        break;
      }
    }

    defer.reject('"' + colName + '" column not found in the Audit calculated report.');
  });

  return promise;
};

/**
 * @function getValueFromCalculatedReport
 * @description This function is used to get value from specified cell of calculated report.
 * @param {string} reportName Name of the report for which calculation is done.
 * Ex: Report is for Weights.
 * @param {string} rowName Name of the row.
 * Ex: Finance (It is a sector name)
 * @param {string} colName Name of the column.
 * Ex: Port. Weight
 * @param {string} rowClassName Name of the class from DOM in which all the row names exists.
 * Ex: slick-pane slick-pane-top slick-pane-right
 * @param {string} colClassName Name of the class from DOM in which all the column names exists.
 * Ex: slick-pane slick-pane-top slick-pane-left
 * @param {boolean} [needCellReference] Default is set to FALSE. When this is set to true, function returns the
 *                                      reference of cell.
 * @param {boolean} [secondSlickgridOption] Pass true if user want reference for second slickgrid.
 * @returns Promise which resolves to the cell value or reference.
 */
AuditMode.prototype.getValueFromCalculatedReport = function(reportName, rowName, colName, rowClassName, colClassName,
  needCellReference, secondSlickgridOption) {
  var defer = protractor.promise.defer();
  var xpathRow;
  var xpathCol;
  var rowReference;
  var cellReference;
  var promise = defer.promise;
  var xpathTable;
  var _this = this;
  var indexRef;

  // Set values for optional parameter
  if (rowClassName === undefined) {
    rowClassName = 'grid-canvas grid-canvas-bottom grid-canvas-left';
  }

  if (colClassName === undefined) {
    colClassName = 'grid-canvas grid-canvas-bottom grid-canvas-right';
  }

  if (needCellReference === undefined) {
    needCellReference = false;
  }

  if (secondSlickgridOption === undefined) {
    xpathTable = '//*[@class="header-section"]//*[normalize-space(text())="' + reportName + '"]/ancestor::*' +
      '[contains(@class, "splitter")][1]/descendant::*//*[contains(@class, "tf-slick-grid")]';
  } else {
    xpathTable = '//*[normalize-space(text())="' + reportName + '"]/ancestor::*//*[@data-qa-id="group-view-header"]' +
      '/parent::*//*[contains(@class, "tf-slick-grid")]';
  }

  // XPATH of required row
  xpathRow = xpathTable + '//*[contains(@class, "' + rowClassName + '")]' +
    '//*[contains(@class, "slick-row") and descendant::*[normalize-space(.)="' + rowName + '"]]';

  // Get the reference of required row
  rowReference = element(by.xpath(xpathRow));
  rowReference.isPresent().then(function(isRowPresent) {
    if (!isRowPresent) {
      CommonFunctions.takeScreenShot();

      // If required row is not found reject the promise with error message
      defer.reject('"' + rowName + '" row is not found in the calculated report.');
    } else {
      // Get the "style" attribute value of the row
      rowReference.getAttribute('style').then(function(attrValue) {
        xpathCol = xpathTable + '//*[contains(@class, "' + colClassName + '")]' +
          '//div[@style="' + attrValue.replace(/[\s;]/g, '') + '"]';

        if (secondSlickgridOption !== undefined) {
          indexRef = _this.getColumnIndexFromCalculatedReport(reportName, colName, true);
        } else {
          indexRef = _this.getColumnIndexFromCalculatedReport(reportName, colName);
        }

        indexRef.then(function(index) {
          // Get the column index
          xpathCol += '/*[contains(@class, "slick-cell l' + index + ' r' + index + '")]';

          // Get the reference required cell
          cellReference = element(by.xpath(xpathCol));

          // Get the element into visibility
          Utilities.scrollElementToVisibility(cellReference);

          if (!needCellReference) {
            defer.fulfill(cellReference.getText());
          } else {
            defer.fulfill(cellReference);
          }
        });
      });
    }
  });

  return promise;
};

/**
 * @function getValueFromCalculatedMultiHeaderReport
 * @description This function is used to get value from specified cell of calculated report.
 * @param {string} reportName Name of the report for which calculation is done.
 * Ex: Report is for Weights.
 * @param {string} rowName Name of the row.
 * Ex: Finance (It is a sector name)
 * @param {number} colIndex Index of the column.
 * @param {number} rowIndex Index of the column.
 * @param {string} rowClassName Name of the class from DOM in which all the column names exists.
 * Ex: slick-pane slick-pane-top slick-pane-right
 * @param {string} colClassName Name of the class from DOM in which all the column names exists.
 * Ex: slick-pane slick-pane-top slick-pane-left
 * @param {boolean} [needCellReference] Default is set to FALSE. When this is set to true, function returns the
 *                                      reference of cell.
 * @param {boolean} [secondSlickgridOption] Pass true if user want reference for second slickgrid.
 * @returns Promise which resolves to the cell value or reference.
 */
AuditMode.prototype.getValueFromCalculatedMultiHeaderReport = function(reportName, rowName, colIndex, rowIndex, needCellReference,
  rowClassName, colClassName, secondSlickgridOption) {
  // Variable(s)
  var xpathTable;
  if (secondSlickgridOption === undefined) {
    xpathTable = '//*[@class="header-section"]//*[normalize-space(text())="' + reportName + '"]/ancestor::*' +
      '[contains(@class, "splitter")][1]/descendant::*//*[contains(@class, "tf-slick-grid")]';
  } else {
    xpathTable = '//*[normalize-space(text())="' + reportName + '"]/ancestor::*//*[@data-qa-id="group-view-header"]' +
      '/parent::*//*[contains(@class, "tf-slick-grid")]';
  }

  var defer = protractor.promise.defer();
  var xpathRow;
  var xpathCol;
  var rowReference;
  var cellReference;
  var promise = defer.promise;

  // Set values for optional parameter
  if (rowClassName === undefined) {
    rowClassName = 'grid-canvas grid-canvas-bottom grid-canvas-left';
  }

  if (colClassName === undefined) {
    colClassName = 'grid-canvas grid-canvas-bottom grid-canvas-right';
  }

  if (needCellReference === undefined) {
    needCellReference = false;
  }

  if (rowIndex === undefined || rowIndex === 0) {
    rowIndex = 0;
  } else if (rowIndex > 0) {
    rowIndex = rowIndex - 1;
  }

  // XPATH of required row
  xpathRow = xpathTable + '//*[contains(@class, "' + rowClassName + '")]' +
    '//*[contains(@class, "slick-row") and descendant::*[normalize-space(.)="' + rowName + '"]]';

  // Get the reference of required row
  rowReference = element.all(by.xpath(xpathRow)).get(rowIndex);

  // Scrolling row into view based on the index
  rowReference.getAttribute('style').then(function(value) {
    var temp = value.replace(/^\D+/g, '').match(/\d+/)[0];
    var tempRowIndex = temp / 18;
    SlickGridFunctions.scrollRowToTop(reportName, tempRowIndex);
  });

  rowReference.isPresent().then(function(isRowPresent) {
    if (!isRowPresent) {
      // If required row is not found reject the promise with error message
      defer.reject('"' + rowName + '" row is not found in the calculated report.');
    } else {
      // Get the "style" attribute value of the row
      rowReference.getAttribute('style').then(function(attrValue) {

        // XPATH for required column
        xpathCol = xpathTable + '//*[contains(@class, "' + colClassName + '")]' +
          '//div[@style="' + attrValue.replace(/[\s;]/g, '') + '"]';

        xpathCol += '/*[contains(@class, "slick-cell l' + colIndex + ' r' + colIndex + '")]';

        // Get the reference required cell
        cellReference = element(by.xpath(xpathCol));

        if (!needCellReference) {
          defer.fulfill(cellReference.getText());
        } else {
          defer.fulfill(cellReference);
        }

      });
    }
  });

  return promise;
};

/**
 * @function getElementFromSpecifiedLevelOfCalculatedReport
 * @description This function is used to get reference of specified element from calculated report based on the level
 *              specified.
 * @param {string} reportName Name of the report for which calculation is done.
 * Ex: Report is for Weights.
 * @param {number} levelNumber Tree level number. Based on this number all the elements from this level will be collected.
 * @param {string} elementName Name of the element whose reference has to be collected.
 * @param {string} [rowClassName] This variable is used to pass the class name of the rows from the DOM tree.
 *                                Default value is "grid-canvas grid-canvas-bottom grid-canvas-left".
 * @param {boolean} [secondSlickgridOption] Pass true if user want reference for second slickgrid.
 * @returns Promise which resolves to array of references of elements from specified level.
 * NOTE: You can get references only for elements which are visible on the web page
 */
AuditMode.prototype.getElementFromSpecifiedLevelOfCalculatedReport = function(reportName, levelNumber, elementName, rowClassName, secondSlickgridOption) {
  var xpathLevelElements;
  var xpathTable;

  // Set values for optional parameter
  if (rowClassName === undefined) {
    rowClassName = 'grid-canvas grid-canvas-bottom grid-canvas-left';
  }

  if (secondSlickgridOption === undefined) {
    xpathTable = '//*[@class="header-section"]//*[normalize-space(text())="' + reportName + '"]/ancestor::*' +
      '[contains(@class, "splitter")][1]/descendant::*//*[contains(@class, "tf-slick-grid")]';
  } else {
    xpathTable = '//*[normalize-space(text())="' + reportName + '"]/ancestor::*//*[@data-qa-id="group-view-header"]' +
      '/parent::*//*[contains(@class, "tf-slick-grid")]';
  }

  if (levelNumber === 1) {
    xpathLevelElements = xpathTable + '//*[contains(@class, "' + rowClassName + '")]' +
      '//*[@class="indent0"]/ancestor::*[contains(@class, "slick-row") and descendant::*[normalize-space(.)="' + elementName + '"]]';
  } else if (levelNumber === 2) {
    xpathLevelElements = xpathTable + '//*[contains(@class, "' + rowClassName + '")]' +
      '//*[@class="indent" and contains(@style, "width: 40px;")]/ancestor::*[contains(@class, "slick-row") ' +
      'and descendant::*[normalize-space(.)="' + elementName + '"]]';
  } else {
    xpathLevelElements = xpathTable + '//*[contains(@class, "' + rowClassName + '")]' +
      '//*[@class="indent" and contains(@style, "width: ' + (20 * parseInt(levelNumber)) + 'px;")]' +
      '/ancestor::*[contains(@class, "slick-row") and descendant::*[normalize-space(.)="' + elementName + '"]]';
  }

  return element(by.xpath(xpathLevelElements));
};

/**
 * @function expandTreeInCalculatedReport
 * @description This function is used to get reference of specified element from calculated report based on the level
 *              specified.
 * @param {string} reportName Name of the report for which calculation is done.
 * Ex: Report is for Weights.
 * @param {string} elementPath Element Names which has to be expanded. If multiple element has to be expanded pass
 *                               their names separated by "|" symbol.
 * Ex: Commercial Services|Advertising/Marketing Services
 * @param {string} [excludeElements] Name of the element(s) which has to be exclude from expand element list.
 *                                   For excluding multiple element from expanding pass their names separated by "|" symbol.
 * Ex: To exclude 'Commercial Services' from 'Commercial Services|Advertising|Marketing Services' pass this parameter
 * as 'Commercial Services'.
 * @param {string} [rowClassName] Name of the class from DOM in which all the row names exists.
 * Ex: slick-pane slick-pane-top slick-pane-right
 * @param {boolean} [secondSlickgridOption] Pass true if user want reference for second slickgrid.
 * @returns Promise which resolves to boolean value ie., TRUE if calculated data appeared on web page otherwise FALSE.
 */
AuditMode.prototype.expandTreeInCalculatedReport = function(reportName, elementPath, excludeElements, rowClassName, secondSlickgridOption) {
  var arrElements = elementPath.split('|');
  var arrExcludedElements;
  var xpathExpandButton;

  // Set values for optional parameter
  if (rowClassName === undefined) {
    rowClassName = 'grid-canvas grid-canvas-bottom grid-canvas-left';
  }

  var xpathTable;

  if (secondSlickgridOption === undefined) {
    xpathTable = '//*[@class="header-section"]//*[normalize-space(text())="' + reportName + '"]/ancestor::*' +
      '[contains(@class, "splitter")][1]/descendant::*//*[contains(@class, "tf-slick-grid")]';
  } else {
    xpathTable = '//*[normalize-space(text())="' + reportName + '"]/ancestor::*//*[@data-qa-id="group-view-header"]' +
      '/parent::*//*[contains(@class, "tf-slick-grid")]';
  }

  if (excludeElements === undefined) {
    arrExcludedElements = undefined;
  } else {
    arrExcludedElements = excludeElements.split('|');
  }

  if (arrElements.length === 1) {
    xpathExpandButton = xpathTable + '//*[contains(@class, "' + rowClassName + '")]' +
      '//*[contains(@class, "slick-row")][normalize-space(.)="' + arrElements[0] + '"]//i';

    // Get the element into visibility before expanding
    Utilities.scrollElementToVisibility(element(by.xpath(xpathExpandButton)));

    element(by.xpath(xpathExpandButton)).click();
  } else {
    xpathExpandButton = xpathTable + '//*[contains(@class, "' + rowClassName + '")]';
    for (var i = 0; i < arrElements.length; i++) {

      // XPATH for expanding first element
      if (i === 0) {
        xpathExpandButton += '//*[contains(@class, "slick-row")][normalize-space(.)="' + arrElements[0] + '"]//i';
      }

      // XPATH for expanding remaining elements
      if (i > 0) {
        xpathExpandButton += '/ancestor::*[contains(@class, "slick-row")]/following-sibling::*' +
          '//*[normalize-space(.)="' + arrElements[i] + '"]/i';
      }

      if (arrExcludedElements === undefined) {
        // Get the element into visibility before expanding
        Utilities.scrollElementToVisibility(element(by.xpath(xpathExpandButton)));

        element(by.xpath(xpathExpandButton)).click();

      } else if (arrExcludedElements.indexOf(arrElements[i]) < 0) {
        // Get the element into visibility before expanding
        Utilities.scrollElementToVisibility(element(by.xpath(xpathExpandButton)));

        element(by.xpath(xpathExpandButton)).click();
      } else {
        arrExcludedElements.splice(arrExcludedElements.indexOf(arrElements[i]), 1);
      }
    }
  }
};

/**
 * @function getXpath
 * @description This function is used build the XPATH for the given tree in the calculated report in Audit Mode.
 * @param {string} baseXpath This is the XPATH on top of which XPATH for elements in tree form will be formed.
 * @param {string} treePath Element Names which has to be verified. If multiple element has to be verified
 *                            pass their names separated by "|" symbol.
 * Ex: Commercial Services|Advertising/Marketing Services
 * @returns Promise which resolves to the XPATH of given tree.
 */
AuditMode.prototype.getXpath = function(baseXpath, treePath) {
  var xpathExpandButton = baseXpath;
  var arrElements = treePath.split('|');
  var defer = protractor.promise.defer();
  var promise = defer.promise;

  for (var i = 0; i < arrElements.length; i++) {

    // XPATH for expanding first element
    if (i === 0) {
      xpathExpandButton += '//*[contains(@class, "slick-row")][normalize-space(.)="' + arrElements[0] + '"]//i';
    }

    // XPATH for expanding remaining elements
    if (i > 0) {
      xpathExpandButton += '/ancestor::*[contains(@class, "slick-row")]/following-sibling::*' +
        '//*[normalize-space(.)="' + arrElements[i] + '"]/i';
    }

    // Get the element into visibility before verifying
    Utilities.scrollElementToVisibility(element(by.xpath(xpathExpandButton)));
  }

  defer.fulfill(xpathExpandButton);

  return promise;
};

/**
 * @function isTreeExpanded
 * @description This function is used to verify if given tree is expanded or not.
 * @param {string} reportName Name of the report whose tree element has to be verified.
 * @param {string} treePath Element Names which has to be verified. If multiple element has to be verified
 *                  pass their names separated by "|" symbol.
 * @param {string} [rowClassName]: Name of the class from DOM in which all the row names exists.
 * Ex: slick-pane slick-pane-top slick-pane-right
 * @param {boolean} [secondSlickgridOption] Pass true if user want reference for second slickgrid.
 * @returns {promise} Promise which resolves to boolean value ie., TRUE if given path is expanded else FALSE.
 */
AuditMode.prototype.isTreeExpanded = function(reportName, treePath, rowClassName, secondSlickgridOption) {
  var arrElements = treePath.split('|');
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var xpathExpandButton;

  // Set values for optional parameter
  if (rowClassName === undefined) {
    rowClassName = 'grid-canvas grid-canvas-bottom grid-canvas-left';
  }

  var xpathTable;

  if (secondSlickgridOption === undefined) {
    xpathTable = '//*[@class="header-section"]//*[normalize-space(text())="' + reportName + '"]/ancestor::*' +
      '[contains(@class, "splitter")][1]/descendant::*//*[contains(@class, "tf-slick-grid")]';
  } else {
    xpathTable = '//*[normalize-space(text())="' + reportName + '"]/ancestor::*//*[@data-qa-id="group-view-header"]' +
      '/parent::*//*[contains(@class, "tf-slick-grid")]';
  }

  if (arrElements.length === 1) {
    xpathExpandButton = xpathTable + '//*[contains(@class, "' + rowClassName + '")]' +
      '//*[contains(@class, "slick-row")][normalize-space(.)="' + arrElements[0] + '"]//i';

    // Get the element into visibility before expanding
    Utilities.scrollElementToVisibility(element(by.xpath(xpathExpandButton)));

    // Verifying if the tree is expanded
    element(by.xpath(xpathExpandButton)).getAttribute('class').then(function(classValue) {
      if (classValue.indexOf('open') > 0) {
        defer.fulfill(true);
      } else {
        defer.reject(false);
      }
    });
  } else {
    xpathExpandButton = xpathTable + '//*[contains(@class, "' + rowClassName + '")]';

    this.getXpath(xpathExpandButton, treePath).then(function(xpath) {
      element(by.xpath(xpath)).getAttribute('class').then(function(classValue) {
        if (classValue.indexOf('open') > 0) {
          defer.fulfill(true);
        } else {
          defer.reject(false);
        }
      });
    });
  }

  return promise;
};

/**
 * @function checkIfTreeExpandedInCalculatedReport
 * @description This function is used to verify if given tree is expanded or not in calculated report.
 * @param {string} reportName Name of the report whose tree element has to be verified.
 * @param {string} elementPath Element Names which has to be expanded. If multiple element has to be expanded pass
 *                              their names separated by "|" symbol.
 * @param {string} [rowClassName]: Name of the class from DOM in which all the row names exists.
 * Ex: slick-pane slick-pane-top slick-pane-right
 * @param {boolean} [secondSlickgridOption] Pass true if user want reference for second slickgrid.
 * @returns {promise} Promise which resolves to boolean value ie., TRUE if calculated data appeared on
 * web page otherwise FALSE.
 */
AuditMode.prototype.checkIfTreeExpandedInCalculatedReport = function(reportName, elementPath, rowClassName, secondSlickgridOption) {
  var arrElements = elementPath.split('|');
  var xpathExpandButton;

  // Set values for optional parameter
  if (rowClassName === undefined) {
    rowClassName = 'grid-canvas grid-canvas-bottom grid-canvas-left';
  }

  var xpathTable;

  if (secondSlickgridOption === undefined) {
    xpathTable = '//*[@class="header-section"]//*[normalize-space(text())="' + reportName + '"]/ancestor::*' +
      '[contains(@class, "splitter")][1]/descendant::*//*[contains(@class, "tf-slick-grid")]';
  } else {
    xpathTable = '//*[normalize-space(text())="' + reportName + '"]/ancestor::*//*[@data-qa-id="group-view-header"]' +
      '/parent::*//*[contains(@class, "tf-slick-grid")]';
  }

  if (arrElements.length === 1) {
    xpathExpandButton = xpathTable + '//*[contains(@class, "' + rowClassName + '")]' +
      '//*[contains(@class, "slick-row")][normalize-space(.)="' + arrElements[0] + '"]//i';

    // Get the element into visibility before expanding
    Utilities.scrollElementToVisibility(element(by.xpath(xpathExpandButton)));

    // Verifying if the tree is expanded
    expect(element(by.xpath(xpathExpandButton)).getAttribute('class')).toContain('opened');
  } else {
    xpathExpandButton = xpathTable + '//*[contains(@class, "' + rowClassName + '")]';
    for (var i = 0; i < arrElements.length; i++) {

      // XPATH for expanding first element
      if (i === 0) {
        xpathExpandButton += '//*[contains(@class, "slick-row")][normalize-space(.)="' + arrElements[0] + '"]//i';
      }

      // XPATH for expanding remaining elements
      if (i > 0) {
        xpathExpandButton += '/ancestor::*[contains(@class, "slick-row")]/following-sibling::*' +
          '//*[normalize-space(.)="' + arrElements[i] + '"]/i';
      }

      // Get the element into visibility before verifying
      Utilities.scrollElementToVisibility(element(by.xpath(xpathExpandButton)));

      // Verifying if the tree is expanded
      expect(element(by.xpath(xpathExpandButton)).getAttribute('class')).toContain('opened');
    }
  }
};

/**
 * @function getElementFromCalculatedTree
 * @description This function is used to get reference of specified element from tree of calculated report.
 * @param {string} reportName Name of the report for which calculation is done.
 * @param {string} treeName Path of element. Suppose element "C" falls under "B" which in turn falls under "A" then we
 *                          should pass this parameter as "A|B".
 *                          Please note that separate the tree element name with "|" symbol.
 * @param {string} elementName Name of the element whose reference has to be collected.
 * @param {string} [rowClassName = grid-canvas grid-canvas-bottom grid-canvas-left ] This variable is used to pass the
 *                  class name of the rows from the DOM tree.
 * @param {boolean} [secondSlickgridOption] Pass true if user want reference for second slickgrid.
 * @returns {promise} Promise which resolves to element reference from calculated report
 * NOTE: You can get reference only for elements which are visible on the web page.
 */
AuditMode.prototype.getElementFromCalculatedTree = function(reportName, treeName, elementName, rowClassName, secondSlickgridOption) {
  var xpathParents;
  var xpathElement;
  var xpathTable;
  var xpathRows;
  var treeElements = treeName.split('|');

  // Set values for optional parameter
  if (rowClassName === undefined) {
    rowClassName = 'grid-canvas grid-canvas-bottom grid-canvas-left';
  }

  if (secondSlickgridOption === undefined) {
    xpathTable = '//*[@class="header-section"]//*[normalize-space(text())="' + reportName + '"]/ancestor::*' +
      '[contains(@class, "splitter")][1]/descendant::*//*[contains(@class, "tf-slick-grid")]';
  } else {
    xpathTable = '//*[normalize-space(text())="' + reportName + '"]/ancestor::*//*[@data-qa-id="group-view-header"]' +
      '/parent::*//*[contains(@class, "tf-slick-grid")]';
  }

  xpathRows = xpathTable + '//*[contains(@class, "' + rowClassName + '")]';

  if (treeElements.length === 1) {
    xpathParents = xpathRows + '//*[contains(@class, "slick-row") and descendant::*[@class="indent0"]]' +
      '[normalize-space(.)="' + treeElements[0] + '"]';

    xpathElement = xpathParents + '/following-sibling::*[contains(@class, "slick-row") and descendant::*[@class="indent" ' +
      'and contains(@style, "width: 40px;")] and descendant::*[normalize-space(.)="' + elementName + '"]][1]';

  } else if (treeElements.length === 2) {
    xpathParents = xpathRows + '//*[contains(@class, "slick-row") and descendant::*[@class="indent0"]]' +
      '[normalize-space(.)="' + treeElements[0] + '"]/following-sibling::*[contains(@class, "slick-row") and ' +
      'descendant::*[@class="indent" and contains(@style, "width: 40px;")]][normalize-space(.)="' + treeElements[1] + '"][1]';

    xpathElement = xpathParents + '/following-sibling::*[contains(@class, "slick-row") and descendant::*[@class="indent" ' +
      'and contains(@style, "width: 60px;")] and descendant::*[normalize-space(.)="' + elementName + '"]][1]';

  } else {
    xpathParents = xpathRows + '//*[contains(@class, "slick-row") and descendant::*[@class="indent0"]]' +
      '[normalize-space(.)="' + treeElements[0] + '"]/following-sibling::*[contains(@class, "slick-row") and ' +
      'descendant::*[@class="indent" and contains(@style, "width: 40px;")]][normalize-space(.)="' + treeElements[1] + '"][1]';

    for (var i = 0; i < treeElements.length - 2; i++) {
      xpathParents += '/following-sibling::*[contains(@class, "slick-row") and ' +
        'descendant::*[@class="indent" and contains(@style, "width: ' + (20 * parseInt(i + 3)) + 'px;")]]' +
        '[normalize-space(.)="' + treeElements[i + 2] + '"][1]';
    }

    xpathElement = xpathParents + '/following-sibling::*[contains(@class, "slick-row") and descendant::*[@class="indent" ' +
      'and contains(@style, "width: ' + (20 * parseInt(treeElements.length + 1)) + 'px;")] and ' +
      'descendant::*[normalize-space(.)="' + elementName + '"]][1]';
  }

  return element(by.xpath(xpathElement));
};

/**
 * @function getArrowButton
 * @description This function is used to get references of arrow button buttons in audit view.
 * @param {string} btnName name of the arrow button that shows the direction of button in audit section.
 * Ex: right or left
 * @returns {promise} Promise which resolves button reference.
 */
AuditMode.prototype.getArrowButton = function(btnName) {
  var xpathArrowButton = '//*[@ui-view="toolbar"]//*[contains( @icon,"' + btnName.toLowerCase() + '")]';

  return element(by.xpath(xpathArrowButton));
};

/**
 * @function getAllCellsOfGivenColumn
 * @description This function is used to get reference of all the cells from a particular column.
 * @param {string} reportName Name of the report whose report is calculated.
 * @param {string} colName Name of the column Ex: Port. Weight
 * @param {string} colClassName Name of the class from DOM in which all the column names exists.
 *                              Ex: slick-pane slick-pane-top slick-pane-left
 * @param {boolean} [secondSlickgridOption] Pass true if user want reference for second slickgrid.
 * @returns {Promise[]}  Promise which resolves to the array of cell references from the given column.
 */
AuditMode.prototype.getAllCellsOfGivenColumn = function(reportName, colName, colClassName, secondSlickgridOption) {
  // Variable(s)
  var defer = protractor.promise.defer();
  var xpathCol;
  var cellReferences;
  var promise = defer.promise;
  var xpathTable;

  if (secondSlickgridOption === undefined) {
    xpathTable = '//*[@class="header-section"]//*[normalize-space(text())="' + reportName + '"]/ancestor::*' +
      '[contains(@class, "splitter")][1]/descendant::*//*[contains(@class, "tf-slick-grid")]';
  } else {
    xpathTable = '//*[normalize-space(text())="' + reportName + '"]/ancestor::*//*[@data-qa-id="group-view-header"]' +
      '/parent::*//*[contains(@class, "tf-slick-grid")]';
  }

  xpathCol = xpathTable + '//*[contains(@class, "' + colClassName + '")]';

  // Get the column index
  this.getColumnIndexFromCalculatedReport(reportName, colName).then(function(colIndex) {
    xpathCol += '//*[contains(@class, "slick-cell")  and contains(@class, "l' + colIndex + ' r' + colIndex + '")]';

    // Get the reference cells of particular column
    cellReferences = element.all(by.xpath(xpathCol));

    defer.fulfill(cellReferences);
  });

  return promise;
};

/**
 * @function getButton
 * @description This function is used to get the reference of button from any pop-up or dialog box.
 * @param {string} btnName Name of the button whose reference is needed.
 * @returns {promise} Promise which resolves to reference of button.
 */
AuditMode.prototype.getButton = function(btnName) {
  var xpathBtn = '//*[@class="audit-banner"]//tf-button[descendant::*[.="' + btnName + '"]]';
  return element(by.xpath(xpathBtn));
};

/**
 * @function getCachingAlertIcon
 * @description This function is used to get reference of report cache alert icon.
 * @param {string} reportName Name of the report from which alert icon is needed.
 * @returns {promise} Promise which resolves to the reference of alert icon from the specified report.
 * NOTE: You can get the reference only when report is showing the cached data.
 */
AuditMode.prototype.getCachingAlertIcon = function(reportName) {
  var xpathAlertIcon = '//*[normalize-space(text())="' + reportName + '"][contains(@class, "header") and not(@class="closed hide")]/*';
  return element(by.xpath(xpathAlertIcon));
};

/**
 * @function getCacheInfoText
 * @description This function is used to get the text of alert icon.
 * @returns {promise} Promise which resolves to the text of alert icon from the specified report.
 * NOTE: You can get the text only after clicking on alert icon.
 */
AuditMode.prototype.getCacheInfoText = function() {
  var xpathAlertInfo = '//*[contains(@class, "pa-tile-header-infobox")]';
  return element(by.xpath(xpathAlertInfo)).getText();
};

/**
 * @function getAllElementFromSpecifiedLevelOfCalculatedReport
 * @description This function is used to get reference of all the elements from calculated report based on the level
 *              specified.
 * @param {string} reportName Name of the report for which calculation is done.
 * @param {number} levelNumber Tree level number. Based on this number all the elements from this level will be
 *                             collected.
 * @param {boolean} [secondSlickgridOption] Pass true if user want reference for second slickgrid.
 * @returns {Promise[]} Promise which resolves to array of references of elements from specified level.
 * NOTE: You can get references only for elements which are visible on the web page.
 */
AuditMode.prototype.getAllElementFromSpecifiedLevelOfCalculatedReport = function(reportName, levelNumber, secondSlickgridOption) {
  var xpathLevelElements;
  var xpathTable;

  if (secondSlickgridOption === undefined) {
    xpathTable = '//*[@class="header-section"]//*[normalize-space(text())="' + reportName + '"]/ancestor::*' +
      '[contains(@class, "splitter")][1]/descendant::*//*[contains(@class, "tf-slick-grid")]';
  } else {
    xpathTable = '//*[normalize-space(text())="' + reportName + '"]/ancestor::*//*[@data-qa-id="group-view-header"]' +
      '/parent::*//*[contains(@class, "tf-slick-grid")]';
  }

  if (levelNumber === 1) {
    xpathLevelElements = xpathTable + '//*[contains(@class, "grid-canvas grid-canvas-bottom grid-canvas-left")]' +
      '//*[@class="indent0"]/ancestor::*[contains(@class, "slick-cell")][1]';
  } else if (levelNumber === 2) {
    xpathLevelElements = xpathTable + '//*[contains(@class, "grid-canvas grid-canvas-bottom grid-canvas-left")]' +
      '//*[@class="indent" and contains(@style, "width: 40px;")]/ancestor::*[contains(@class, "slick-cell")][1]';
  } else {
    xpathLevelElements = xpathTable + '//*[contains(@class, "grid-canvas grid-canvas-bottom grid-canvas-left")]' +
      '//*[@class="indent" and contains(@style, "width: ' + (20 * parseInt(levelNumber)) + 'px;")]' +
      '/ancestor::*[contains(@class, "slick-cell")][1]';
  }

  return element.all(by.xpath(xpathLevelElements));
};

/**
 * @function getElementFromSpecifiedLevelOfCalculatedReport
 * @description This function is used to get reference of specified element from calculated report based on the level
 *              specified.
 * @param {string} reportName Name of the report for which calculation is done.
 * @param {number} levelNumber Tree level number. Based on this number all the elements from this level will be
 *                             collected.
 * @param {string} elementName Name of the element whose reference has to be collected.
 * @param {string} [rowClassName = grid-canvas grid-canvas-bottom grid-canvas-left ] This variable is used to pass the
 *                  class name of the rows from the DOM tree.
 * @param {boolean} [secondSlickgridOption] Pass true if user want reference for second slickgrid.
 * @returns {promise} Promise which resolves to element reference from specified level of calculated report
 * NOTE: You can get reference only for elements which are visible on the web page.
 */
AuditMode.prototype.getElementFromSpecifiedLevelOfCalculatedReport = function(reportName, levelNumber, elementName, rowClassName, secondSlickgridOption) {
  var xpathLevelElements;
  var xpathTable;

  // Set values for optional parameter
  if (rowClassName === undefined) {
    rowClassName = 'grid-canvas grid-canvas-bottom grid-canvas-left';
  }

  if (secondSlickgridOption === undefined) {
    xpathTable = '//*[@class="header-section"]//*[normalize-space(text())="' + reportName + '"]/ancestor::*' +
      '[contains(@class, "splitter")][1]/descendant::*//*[contains(@class, "tf-slick-grid")]';
  } else {
    xpathTable = '//*[normalize-space(text())="' + reportName + '"]/ancestor::*//*[@data-qa-id="group-view-header"]' +
      '/parent::*//*[contains(@class, "tf-slick-grid")]';
  }

  if (levelNumber === 1) {
    xpathLevelElements = xpathTable + '//*[contains(@class, "' + rowClassName + '")]' +
      '//*[@class="indent0"]/ancestor::*[contains(@class, "slick-row") and descendant::*[normalize-space(.)="' + elementName + '"]]';
  } else if (levelNumber === 2) {
    xpathLevelElements = xpathTable + '//*[contains(@class, "' + rowClassName + '")]' +
      '//*[@class="indent" and contains(@style, "width: 40px;")]/ancestor::*[contains(@class, "slick-row") ' +
      'and descendant::*[normalize-space(.)="' + elementName + '"]]';
  } else {
    xpathLevelElements = xpathTable + '//*[contains(@class, "' + rowClassName + '")]' +
      '//*[@class="indent" and contains(@style, "width: ' + (20 * parseInt(levelNumber)) + 'px;")]' +
      '/ancestor::*[contains(@class, "slick-row") and descendant::*[normalize-space(.)="' + elementName + '"]]';
  }

  return element(by.xpath(xpathLevelElements));
};

/**
 * @function getAllExpandCollapseButtonsFromCalculatedReport
 * @description This function is used to get reference of all Expand/Collapse button from calculated report.
 * @param {string} reportName Name of the report for which calculation is done.
 * @param {string} [rowClassName=grid-canvas grid-canvas-bottom grid-canvas-left] This variable is used to pass the
 *                  class name of the rows from the DOM tree.
 * @param {boolean} [secondSlickgridOption] Pass true if user want reference for second slickgrid.
 * @returns {promise} Promise which resolves to array of references of Expand/Collapse button from calculated report.
 * NOTE: You can get references only for buttons that are visible on the web page.
 */
AuditMode.prototype.getAllExpandCollapseButtonsFromCalculatedReport = function(reportName, rowClassName, secondSlickgridOption) {
  var xpathTable;
  var xpathExpandCollapseButton;

  // Set values for optional parameter
  if (rowClassName === undefined) {
    rowClassName = 'grid-canvas grid-canvas-top grid-canvas-left';
  }

  if (secondSlickgridOption === undefined) {
    xpathTable = '//*[@class="header-section"]//*[normalize-space(text())="' + reportName + '"]/ancestor::*' +
      '[contains(@class, "splitter")][1]/descendant::*//*[contains(@class, "tf-slick-grid")]';
  } else {
    xpathTable = '//*[normalize-space(text())="' + reportName + '"]/ancestor::*//*[@data-qa-id="group-view-header"]' +
      '/parent::*//*[contains(@class, "tf-slick-grid")]';
  }

  xpathExpandCollapseButton = xpathTable + '//*[contains(@class, "' + rowClassName + '")]//*[contains(@class, "slick-row") ' +
    'and descendant::i]//i';

  return element.all(by.xpath(xpathExpandCollapseButton));
};

/**
 * @function getReportDate
 * @description This function is used to get reference of Date inside report view.
 * @param {string} reportName Name of the report in which the date is present.
 * @returns {promise} Returns the reference of Date.
 */
AuditMode.prototype.getReportDate = function(reportName) {
  var xpathDateHyperLink = '//*[contains(@class, "header") and normalize-space(text())="' + reportName + '"]/following-sibling::*//*' +
    '[@ng-click="ctrl.showDatesTab()"]';
  return element(by.xpath(xpathDateHyperLink));
};

/**
 * @function getWrenchIconInAuditView
 * @description This function is used to get the reference button "Wrench" button from the audit view.
 * @returns {promise} Promise which resolves to reference of audit view "Wrench" button.
 */
AuditMode.prototype.getWrenchIconInAuditView = function() {
  var xpathWrenchIcon = '//pa-audit-toolbar//tf-button/*[@type="tools"]';
  return element(by.xpath(xpathWrenchIcon));

};

/**
 * @function getOptionFromWrenchMenuFromAuditView
 * @description This function is used to get the reference of required option from the drop down.
 * @param {string} optionName Name of the item whose reference is needed.
 * @returns {promise} Promise which resolves to reference of given item from the menu list.
 */
AuditMode.prototype.getOptionFromWrenchMenuFromAuditView = function(optionName) {
  var xpathOptionFromWrenchMenu;
  xpathOptionFromWrenchMenu = '//tf-dropdown-content-container//tf-menu-legacy-item[descendant::*[normalize-space(text())="' + optionName + '"]]';
  return element(by.xpath(xpathOptionFromWrenchMenu));
};

/**
 * @function getMultiHeaderColumnNames
 * @description This function is used to get the reference Multiheader columns.
 * @param {string} reportName Name of the report to which the column reference is needed.
 * @param {string} columnName Name of the column for which the reference is needed.
 * @returns {promise} Promise which resolves to reference of required  multiheader column.
 */
AuditMode.prototype.getMultiHeaderColumnNames = function(reportName, columnName) {
  var xpathTopColumnNames = '//*[@class="header-section"]//*[normalize-space(text())="' + reportName + '"]' +
    '/ancestor::*[contains(@class, "splitter")][1]/descendant::*//*[contains(@class, "tf-slick-grid")]' +
    '//table//td[normalize-space(.)="' + columnName + '"]';
  return element(by.xpath(xpathTopColumnNames));
};

/**
 * @function getReportInputsSection
 * @description This function is used to get the reference of "Report Input" section.
 * @param {string} reportName Name of the report to which the column reference is needed.
 * @returns {promise} Promise which resolves to the reference of ReportInput Section.
 */
AuditMode.prototype.getReportInputsSection = function(reportName) {
  var xpathreportInputs = '//*[contains(@class, "pa-audit-item")]//*[contains(@class, "header")]/span[1][normalize-space(text())="' + reportName + '"]' +
    '/ancestor::*//*[normalize-space(.)="Report Inputs"]';
  return element(by.xpath(xpathreportInputs));
};

/**
 * @function getReportInputsSectionValues
 * @description This function is used to get "Report Input" section Values.
 * @param {number} rowNum Name of the report to which the column reference is needed.
 * @param {number} colNum Name of the report to which the column reference is needed.
 * @returns {promise} Promise which resolves to the reference of ReportInput Section value.
 */
AuditMode.prototype.getReportInputsSectionValues = function(rowNum, colNum) {
  var xpathReportInputsSectionValue = this.xpathReportInputsTable + '/tr[' + rowNum + ']/td[' + colNum + ']';
  return element(by.xpath(xpathReportInputsSectionValue));
};

/**
 * @function getFormulaSection
 * @description This function is used to get "formula" section Values.
 * @returns {promise} Promise which resolves to the reference of Formula Section.
 */
AuditMode.prototype.getFormulaSection = function() {
  var xpathFormula = '//*[contains(@class,"pa-audit-item")]//*[contains(@class, "formula-section")]/*[contains(@class,"formula")]/div';
  return element(by.xpath(xpathFormula));
};

/**
 * @function roundAndMatch
 * @description This function is used round upto the smallest decimal place from both values and verify them.
 * @param {number} reportValue value from report view.
 * @param {number} auditValue value from audit view.
 * @returns {promise} Returns error when values did not match.
 */
AuditMode.prototype.roundAndMatch = function(reportValue, auditValue) {

  var val1AfterRounding;
  var val2AfterRounding;
  var val1DecCount;
  var val2DecCount;
  reportValue = reportValue.replace(/\,/g, '');
  auditValue = auditValue.replace(/\,/g, '');

  if (reportValue !== 'NA' && reportValue !== '--') {
    val1DecCount = reportValue.split('.')[1].length;
    val2DecCount = auditValue.split('.')[1].length;
    if (val1DecCount < val2DecCount) {
      val1AfterRounding = parseFloat(reportValue).toFixed(val1DecCount);
      val2AfterRounding = parseFloat(auditValue).toFixed(val1DecCount);
    } else {
      val2AfterRounding = parseFloat(auditValue).toFixed(val2DecCount);
      val1AfterRounding = parseFloat(reportValue).toFixed(val2DecCount);
    }

    if (val1AfterRounding !== val2AfterRounding) {
      CommonFunctions.takeScreenShot();
      expect(false).customError(val1AfterRounding + 'is not equal to ' + val2AfterRounding);
    }
  } else if (reportValue === 'NA' || reportValue === '--') {
    if (auditValue !== 'NA' && parseFloat(auditValue).toFixed(0) !== '0' && auditValue !== '--') {
      CommonFunctions.takeScreenShot();
      expect(false).customError(reportValue + ' is not equal to ' + auditValue);
    }
  }

};

module.exports = new AuditMode();
