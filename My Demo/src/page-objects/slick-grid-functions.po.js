'use strict';
/*global XPathResult:true*/

/**
 * @module SlickGridFunctions
 * @constructor
 */
var SlickGridFunctions = function() {
  this.xpathSlickGridLoadingSpinner = '//tf-slick-loading-overlay';
};

/**
 * @function getGridXpath
 * @description This function used to create customized XPATH for the "tileName" passed.
 * @param {string} tileName Tile name for which XPATH is required.
 * @returns {string} XPATH of grid from required tile name.
 */
SlickGridFunctions.prototype.getGridXpath = function(tileName) {
  return '//*[@data-qa-class="tile" or @data-qa-id="audit-home-section" or @data-qa-id="audit-away-section"][descendant::*[normalize-space(.)=' +
    '"' + tileName + '"]]//*[contains(@class, "tf-slick-grid")]';
};

/**
 * @function getGridReference
 * @description This function is used to get the reference of grid from required tile.
 * @param {string} tileName Name of the tile for which grid reference is required.
 * @returns {object} Grid object (which is an JSON object)
 */
SlickGridFunctions.prototype.getGridReference = function(tileName) {
  var options = {
    gridXpath: this.getGridXpath(tileName),
  };

  return browser.executeScript(function(options) {
    var gridXpath = options.gridXpath;
    var grid = angular.element(document.evaluate(gridXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
      .singleNodeValue).controller('tfSlickGrid').grid;
    return grid;
  }, options);
};

/**
 * @function getColumnNames
 * @description This function is used get all the column names from given tile.
 * @param {string} tileName Name of tile from which column names are required.
 * @returns {array} Array which hold names of all columns from given tile.
 */
SlickGridFunctions.prototype.getColumnNames = function(tileName) {
  // Xpath of Slick-Grid for given "tileName"
  var xpathTile = this.getGridXpath(tileName);
  var options = {
    gridXpath: xpathTile,
  };

  return browser.executeScript(function(options) {
    var gridXpath = options.gridXpath;
    var grid = angular.element(document.evaluate(gridXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
      .singleNodeValue).controller('tfSlickGrid').grid;

    var colNames = _.map(grid.getColumns(), function(colRef) {
      return colRef.name.replace(/<br>/g, ' ').replace(/&amp;/g, '&');
    });

    return colNames;
  }, options);
};

/**
 * @function getMultiHeaderNames
 * @description This function is used to get all the names of multi-headers. Please note that it can get names only till
 * first level of multi-header.
 * @param {string} tileName Name of tile in which multi-header grid exists.
 * @returns {array} Array which contains names from multi-header.
 */
SlickGridFunctions.prototype.getMultiHeaderNames = function(tileName) {
  // Variable(s)
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var arrNames = [];
  var _this = this;

  // Xpath of Slick-Grid for given "tileName"
  var xpathTile = this.getGridXpath(tileName);
  var options = {
    gridXpath: xpathTile,
  };

  browser.executeScript(function(options) {
    var gridXpath = options.gridXpath;
    var multiHeaderNames = document.evaluate(gridXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
      .singleNodeValue.firstChild.innerText.split(/\t|\n/g);

    return multiHeaderNames;
  }, options).then(function(multiHeaderNames) {
    var len = multiHeaderNames.length;
    multiHeaderNames.forEach(function(name, index) {
      if (index !== (len - 1)) {
        arrNames.push(name.replace(/(\r\n|\n|\r)/gm, ''));
      }
    });
    defer.fulfill(arrNames);
  });

  return promise;
};

/**
 * @function getAllColumnIDs
 * @description This function is used to get the IDs of Columns appearing in the grid.
 * @param {string} tileName Name of the tile from which column ids are required.
 * @returns {promise[]} Promise array which resolves to column ids.
 */
SlickGridFunctions.prototype.getAllColumnIDs = function(tileName) {
  // Xpath of Slick-Grid for given "tileName"
  var xpathTile = this.getGridXpath(tileName);
  var options = {
    gridXpath: xpathTile,
  };

  return browser.executeScript(function(options) {
    var gridXpath = options.gridXpath;
    var grid = angular.element(document.evaluate(gridXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
      .singleNodeValue).controller('tfSlickGrid').grid;

    var colIDs = _.map(grid.getColumns(), function(colRef) {
      return colRef.id;
    });

    return colIDs;
  }, options);
};

/**
 * @function getColumnIndex
 * @description This function is used to get the index of column from the grid. Basically, index here is the position of
 *              column.
 * @param {string} tileName Name of tile from which column index is required.
 * @param {string} colName Name of column whose index is required.
 * @param {string} multiHeaderName Name of multi-header in which this particular column exists.
 * @returns {promise} Promise which resolves to column number/index.
 */
SlickGridFunctions.prototype.getColumnIndex = function(tileName, colName, multiHeaderName) {
  // Variable(s)
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var _this = this;
  var occurrenceNumber = 0;

  // Set the optional parameter (occurrenceNumber) value
  if (multiHeaderName !== undefined) {
    _this.getMultiHeaderNames(tileName).then(function(names) {
      for (var i = 0; i < names.length; i++) {
        if (names[i] === multiHeaderName) {
          occurrenceNumber = i;
          break;
        }
      }
    });
  }

  this.getColumnNames(tileName).then(function(arrColumnNames) {
    Utilities.getAllIndexesOfElementFromArray(arrColumnNames, colName).then(function(indexes) {
      defer.fulfill(indexes[occurrenceNumber]);
    });
  });

  return promise;
};

/**
 * @function getColumnIDValue
 * @description This function is used to get the value of given column id (ID of given column retrieved internally).
 * @param {string} tileName Name of the tile where this particular column exists.
 * @param {string} columnName Name of the column whose ID's value is required.
 * @param {string} multiHeaderName Name of multi-header in which this particular column exists.
 * @returns {promise} Promise which resolves to the Column ID value.
 */
SlickGridFunctions.prototype.getColumnIDValue = function(tileName, columnName, multiHeaderName) {
  // Variable(s)
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var _this = this;

  // Get the index of required column
  this.getColumnIndex(tileName, columnName, multiHeaderName).then(function(columnIndex) {
    // Get the ID value of required column
    _this.getAllColumnIDs(tileName).then(function(arrColumnIDs) {
      defer.fulfill(arrColumnIDs[columnIndex]);
    });
  });

  return promise;
};

/**
 * @function getAllCellValuesFromSingleColumn
 * @description This function is used to get all the values from the given column name.
 * @param {string} tileName Name of tile where this particular column exists.
 * @param {string} columnName Name of the column from which all the values has to be retrieved.
 * @param {string} multiHeaderName Name of multi-header in which this particular column exists.
 * @returns {promise[]} Array of promises which resolves to values collected from given column.
 */
SlickGridFunctions.prototype.getAllCellValuesFromSingleColumn = function(tileName, columnName, multiHeaderName) {
  // Variable(s)
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var columnID;
  var _this = this;

  // Get required column ID value
  this.getColumnIDValue(tileName, columnName, multiHeaderName).then(function(id) {
    columnID = id;
  }).then(function() {
    // Xpath of Slick-Grid for given "tileName"
    var xpathTile = _this.getGridXpath(tileName);
    var options = {
      gridXpath: xpathTile,
      columnID: columnID,
    };

    return options;
  }).then(function(options) {
    return browser.executeScript(function(options) {
      var gridXpath = options.gridXpath;
      var columnID = options.columnID;
      var grid = angular.element(document.evaluate(gridXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        .singleNodeValue).controller('tfSlickGrid').grid;

      var columnValues = _.map(grid.getData().getItems(), function(RowRef) {
        return RowRef[columnID].replace(/&amp;/g, '&');
      });

      return columnValues;
    }, options);
  }).then(function(columnValues) {
    defer.fulfill(columnValues);
  });

  return promise;
};

/**
 * @function getRowIndex
 * @description This function is used to get the index of given row name from the calculated report/grid.
 * @param {string} tileName Name of tile in which this particular grid exists.
 * @param {string} rowName Name of the row whose index is required.
 * @param {string} colName Name of the column in which this particular row exists. If this particular row has no column
 *                 name then pass "" (empty string) as parameter.
 * @param {string} elementPath Element Names which has to be expanded. If multiple element has to be expanded pass
 *                              their names separated by "|" symbol.
 * @returns {promise} Promise which resolves to the index of required row.
 */
SlickGridFunctions.prototype.getRowIndex = function(tileName, rowName, colName, elementPath) {
  // Variable(s)
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var bRowFound = false;
  var xpathTile = this.getGridXpath(tileName);
  var columnID;
  this.getColumnIDValue(tileName, colName).then(function(id) {
    columnID = id;
  });
  var options = {
    gridXpath: xpathTile,
  };
  var parentID;
  var rowIndex;

  // If rows are grouped you'll have "elementPath" variable defined.
  // Thus, we have to calculate row index using different approach
  if (elementPath === undefined) {
    this.getAllCellValuesFromSingleColumn(tileName, colName).then(function(arrayRowNames) {
      arrayRowNames.forEach(function(name, index) {
        if (name === rowName) {
          bRowFound = true;
          defer.fulfill(index);
        }
      });
    }).then(function() {
      if (!bRowFound) {
        defer.reject('"' + rowName + '" row is not found in the calculated report.');
      }
    });
  } else {
    browser.executeScript(function(options) {
      var arrRowReferences = [];
      var gridXpath = options.gridXpath;
      var grid = angular.element(document.evaluate(gridXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        .singleNodeValue).controller('tfSlickGrid').grid;

      var length = grid.getDataLength();
      for (var j = 0; j < length; j++) {
        arrRowReferences.push(grid.getDataItem(j));
      }

      return arrRowReferences;

    }, options).then(function(arrRowRefs) {

      // Splitting parent path to get parent elements
      var parentItems = elementPath.split('|');
      var i = 0;
      var j = 0;
      var rowRef;

      // Fetch parent id of given "rowName"
      while (i < parentItems.length) {
        for (j; j < arrRowRefs.length; j++) {
          rowRef = arrRowRefs[j];
          if (rowRef[columnID] === parentItems[i] && (rowRef.parentId === parentID || rowRef.parentId === null)) {
            parentID = rowRef.id;
            break;
          }
        }

        // Increment "i" value
        i++;
      }

      arrRowRefs.forEach(function(rowRef, index) {
        if (rowRef[columnID].replace(/&amp;/g, '&') === rowName && rowRef.parentId === parentID) {
          rowIndex = index;
        }
      });

      return rowIndex;

    }).then(function(rowIndex) {
      defer.fulfill(rowIndex);
    });
  }

  return promise;
};

/**
 * @function getCellReference
 * @description This function is used to get the reference of required cell from calculated report/grid.
 * @param {string} tileName Name of the tile in which this particular grid/report exists.
 * @param {string} rowName Name of the row where this particular cell exists.
 * @param {string} rowColumnName Column name of given row name.
 * @param {string} colName Name of the column in which this particular cell exists.
 * @param {string} multiHeaderName Name of the multi-header under which this particular cell exists.
 * @param {string} elementPath Element Names which has to be expanded. If multiple element has to be expanded pass
 *                              their names separated by "|" symbol.
 * @returns {promise} Promise which resolves to the cell reference on top of which you can call protractor functions.
 */
SlickGridFunctions.prototype.getCellReference = function(tileName, rowName, rowColumnName, colName, multiHeaderName, elementPath) {
  // Variable(s)
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var rowIndex;
  var colIndex;
  var _this = this;

  // Get Row index
  this.getRowIndex(tileName, rowName, rowColumnName, elementPath).then(function(index) {
    rowIndex = index;
  }).then(function() {
    // Get Column index
    _this.getColumnIndex(tileName, colName, multiHeaderName).then(function(index) {
      colIndex = index;
    });
  }).then(function() {
    // Xpath of Slick-Grid for given "tileName"
    var xpathTile = _this.getGridXpath(tileName);
    var options = {
      gridXpath: xpathTile,
      rowIndex: rowIndex,
      columnIndex: colIndex,
    };

    return options;
  }).then(function(options) {
    return browser.executeScript(function(options) {
      var gridXpath = options.gridXpath;
      var grid = angular.element(document.evaluate(gridXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        .singleNodeValue).controller('tfSlickGrid').grid;

      // Scroll cell into view before collecting its reference
      grid.scrollCellIntoView(options.rowIndex, options.columnIndex);

      var cellReference = grid.getCellNode(options.rowIndex, options.columnIndex);

      return cellReference;
    }, options);
  }).then(function(cellReference) {
    defer.fulfill(cellReference);
  });

  return promise;
};

/**
 * @function scrollCellIntoView
 * @description This function is used to scroll particular cell into visibility.
 * @param {string} tileName Name of the tile in which this particular calculated report/grid exists.
 * @param {string} rowName Name of the row in which this particular cell exists.
 * @param {string} rowColumnName Column name of the given row name.
 * @param {string} colName Name of the column in which this particular cell exists.
 * @param {string} multiHeaderName Name of the multi-header under which this particular cell exists.
 */
SlickGridFunctions.prototype.scrollCellIntoView = function(tileName, rowName, rowColumnName, colName, multiHeaderName) {
  // Variable(s)
  var rowIndex;
  var colIndex;
  var _this = this;

  // Get Row index
  this.getRowIndex(tileName, rowName, rowColumnName).then(function(index) {
    rowIndex = index;
  }).then(function() {
    _this.getColumnIndex(tileName, colName, multiHeaderName).then(function(index) {
      colIndex = index;
    });
  }).then(function() {
    // Xpath of Slick-Grid for given "tileName"
    var xpathTile = _this.getGridXpath(tileName);
    var options = {
      gridXpath: xpathTile,
      rowIndex: rowIndex,
      columnIndex: colIndex,
    };

    return options;
  }).then(function(options) {
    return browser.executeScript(function(options) {
      var gridXpath = options.gridXpath;
      var grid = angular.element(document.evaluate(gridXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        .singleNodeValue).controller('tfSlickGrid').grid;

      grid.scrollCellIntoView(options.rowIndex, options.columnIndex);
    }, options);
  });
};

/**
 * @function getAllColumnFieldValue
 * @description This function is used to get the values of "Field" key for the all the columns.
 * @param {string} tileName Name of the tile in which these column exists.
 * @returns {promise[]} Promise array which resolves to value of "Field" key values.
 */
SlickGridFunctions.prototype.getAllColumnFieldValue = function(tileName) {
  // Xpath of Slick-Grid for given "tileName"
  var xpathTile = this.getGridXpath(tileName);
  var options = {
    gridXpath: xpathTile,
  };

  return browser.executeScript(function(options) {
    var gridXpath = options.gridXpath;
    var grid = angular.element(document.evaluate(gridXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
      .singleNodeValue).controller('tfSlickGrid').grid;

    var colNames = _.map(grid.getColumns(), function(colRef) {
      return colRef.name.replace(/<br>/g, ' ');
    });

    return colNames;
  }, options);

};

/**
 * @function getRowData
 * @description This function is used to get all the values from given row.
 * @param {string} tileName Name of the tile in which this particular calculated report/grid exists.
 * @param {string | number} row Row number or row name for which data is required.
 * @param {string} colName Name of the column in which this particular row exists. If this particular row has no column
 *                 name then pass "" (empty string) as parameter.
 * @returns {promise[]} Array of promises which resolves to the value from that particular row.
 */
SlickGridFunctions.prototype.getRowData = function(tileName, row, colName) {
  // Variable(s)
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var _this = this;
  var options;
  var rowName;
  var rowNumber;
  var rowData = [];
  var xpathTile = this.getGridXpath(tileName);

  // Set the default values of parameters
  if (isNaN(row)) {
    rowName = row;
    _this.getRowIndex(tileName, rowName, colName).then(function(rowIndex) {
      _this.getColumnNames(tileName).then(function(colNames) {
        colNames.forEach(function(name, index) {
          options = {
            gridXpath: xpathTile,
            rowIndex: rowIndex,
            colIndex: index,
          };
          browser.executeScript(function(options) {
            var gridXpath = options.gridXpath;
            var grid = angular.element(document.evaluate(gridXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
              .singleNodeValue).controller('tfSlickGrid').grid;

            // Get the cell into visibility
            grid.scrollCellIntoView(options.rowIndex, options.colIndex);

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
    });
  } else {
    rowNumber = row;
    _this.getColumnNames(tileName).then(function(colNames) {
      colNames.forEach(function(name, index) {
        options = {
          gridXpath: xpathTile,
          rowIndex: rowNumber,
          colIndex: index,
        };
        browser.executeScript(function(options) {
          var gridXpath = options.gridXpath;
          var grid = angular.element(document.evaluate(gridXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
            .singleNodeValue).controller('tfSlickGrid').grid;

          // Get the cell into visibility
          grid.scrollCellIntoView(options.rowIndex, options.colIndex);

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
  }

  return promise;
};

/**
 * @function getHeaderCellReference
 * @description This function is used to get the cell reference of column header.
 * @param {string} tileName Name of the tile in which this particular calculated report/grid exists.
 * @param {string} columnName Name of the column for which cell reference has to fetched.
 * @param {string} multiHeaderName Name of multi-header in which this particular column exists.
 * @returns {promise[]} promise which resolves to the cell reference.
 */
SlickGridFunctions.prototype.getHeaderCellReference = function(tileName, columnName, multiHeaderName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;

  var xpathTile = this.getGridXpath(tileName);
  var options = {
    gridXpath: xpathTile,
    id: null,
  };
  this.getColumnIDValue(tileName, columnName, multiHeaderName).then(function(id) {
    options.id = id;
    return options;
  }, function(err) {
    expect(false).customError(err);
    CommonFunctions.takeScreenShot();
  }).then(function(options) {
    return browser.executeScript(function(options) {

      var gridXpath = options.gridXpath;
      var grid = angular.element(document.evaluate(gridXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        .singleNodeValue).controller('tfSlickGrid').grid;

      return grid.getHeaderCell(options.id);
    }, options);

  }).then(function(cellRef) {
    defer.fulfill(cellRef);
  });

  return promise;
};

/**
 * @function getElementsFromTree
 * @description This function is used to get the elements of given tree
 * @param {string} tileName Name of tile in which this particular grid exists.
 * @param {string} colName Name of the column in which this particular row exists. If this particular row has no column
 *                 name then pass "" (empty string) as parameter.
 * @param {string} elementPath Element Names which has to be expanded. If multiple element has to be expanded pass
 *                              their names separated by "|" symbol.
 * @returns {promise} Promise which resolves to the index of required row.
 */

SlickGridFunctions.prototype.getElementsFromTree = function(tileName, colName, elementPath, multiHeaderName) {
  // Variable(s)
  var defer = protractor.promise.defer();
  var _this = this;
  var promise = defer.promise;
  var arrEles = [];
  var colIndex;
  var xpathTile = this.getGridXpath(tileName);
  var options = {
    gridXpath: xpathTile,
  };
  var parentID;

  _this.getColumnIndex(tileName, colName, multiHeaderName).then(function(index) {
    colIndex = index;
  }).then(function() {
    browser.executeScript(function(options) {
      var arrRowReferences = [];
      var gridXpath = options.gridXpath;
      var grid = angular.element(document.evaluate(gridXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        .singleNodeValue).controller('tfSlickGrid').grid;

      var length = grid.getDataLength();
      for (var j = 0; j < length; j++) {
        arrRowReferences.push(grid.getDataItem(j));
      }

      return arrRowReferences;

    }, options).then(function(arrRowRefs) {

      // Splitting parent path to get parent elements
      var parentItems = elementPath.split('|');
      var i = 0;
      var j = 0;
      var rowRef;

      // Fetch parent id of given "rowName"
      while (i < parentItems.length) {
        for (j; j < arrRowRefs.length; j++) {
          rowRef = arrRowRefs[j];
          if (rowRef[colIndex] === parentItems[i] && (rowRef.parentId === parentID || rowRef.parentId === null)) {
            parentID = rowRef.id;
            break;
          }
        }

        // Increment "i" value
        i++;
      }

      arrRowRefs.forEach(function(rowRef) {
        if (rowRef.parentId === parentID) {
          arrEles.push(rowRef[colIndex].replace(/&amp;/g, '&'));
        }
      });

      return arrEles;

    }).then(function(arrEles) {
      defer.fulfill(arrEles);
    });
  });

  return promise;
};

/**
 * @function scrollGridElements
 * @description This function is used to scroll all elements of the grid to load elements in DOM.
 * @returns NA.
 */
SlickGridFunctions.prototype.scrollGridElements = function() {

  var totalNumberOfRows;
  var numberOfVisibleRows;

  browser.driver.executeScript(function() {

    var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');

    // Collecting visible rows
    var rowItems = slickObject.grid.getData().getItems();

    // Collecting length of total number of rows
    var totalRowCount = slickObject.grid.getDataLength();

    return [rowItems, totalRowCount];

  }).then(function(value) {

    numberOfVisibleRows = value[0].length;
    totalNumberOfRows = value[1];

    // Iterate to load next set of rows
    var loadNextSet = function() {
      browser.driver.executeScript(function() {
        var rowObjects = [];
        var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
        var rowItems = slickObject.grid.getData().getItems();
        for (var i = 1; i < rowItems.length; i++) {
          rowObjects.push(slickObject.grid.getDataItem(i));
        }

        return rowObjects;
      }).then(function(value) {
        browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
          '.grid.scrollRowIntoView( arguments[ 0 ] )', value.length - 1);

        // Waiting for the elements to load
        browser.sleep(3000);

      });

      // Fetching the row number to be scrolled in next iteration
      if (numberOfVisibleRows < totalNumberOfRows) {
        numberOfVisibleRows = numberOfVisibleRows + 300;
      }
    };

    // Iterating to load 300 elements at a time
    while (numberOfVisibleRows < totalNumberOfRows) {
      loadNextSet();
    }
  });

};

/**
 * @function scrollRowToTop
 * @description This function is used to scroll a row to Top of the grid.
 * @returns NA.
 */
SlickGridFunctions.prototype.scrollRowToTop = function(tileName, index) {
  var options = {
    // Xpath of Slick-Grid for given "tileName"
    gridXpath: '//*[@data-qa-class="tile" or @id="audit-report-container" or contains(@class, "pa-audit-group-view")]' +
    '[descendant::*[normalize-space(.)="' + tileName + '"]]//*[contains(@class, "tf-slick-grid")]',
  };

  return browser.executeScript(function(options, index) {
    var gridXpath = options.gridXpath;
    var grid = angular.element(document.evaluate(gridXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
      .singleNodeValue).controller('tfSlickGrid').grid;
    return grid.scrollRowToTop(index);
  }, options, index);
};

/**
 * @function getAllRowsFromReport
 * @description This function is used to get all rows references of a report.
 * @param {string} tileName Name of the tile in which the rows exists.
 * @returns {Object} Promise which resolves to array of objects.
 */
SlickGridFunctions.prototype.getAllRowsFromReport = function(tileName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var rowsLength;
  var rowsRefLength;
  var rowsRefLength1;
  var _this = this;

  // Scrolling first row to top.
  _this.scrollRowToTop(tileName, 1);
  var options = {

    // Xpath of Slick-Grid for given "tileName"
    gridXpath: '//*[@data-qa-class="tile" or @id="audit-report-container" or contains(@class, "pa-audit-group-view")]' +
    '[descendant::*[normalize-space(.)="' + tileName + '"]]//*[contains(@class, "tf-slick-grid")]',
  };

  browser.executeScript(function(options) {
    var gridXpath = options.gridXpath;
    var rows = [];
    var grid = angular.element(document.evaluate(gridXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
      .singleNodeValue).controller('tfSlickGrid').grid;

    var rowItems = grid.getData().getItems();
    var dataLength = grid.getDataLength();
    for (var i = 0; i < rowItems.length; i++) {
      rows.push(grid.getDataItem(i));
    }

    return [rows, dataLength];
  }, options).then(function(dataView) {
    rowsLength = dataView[1];
    rowsRefLength = dataView[0].length;

    // Verifying if grid has elements
    if (dataView[0].length === 0) {
      CommonFunctions.takeScreenShot();
      defer.reject('Grid is Empty');
    } else if (rowsRefLength === rowsLength) {
      defer.fulfill(dataView[0]);
    } else {
      // Scrolling last row in DOM to top of the grid.
      _this.scrollRowToTop(tileName, rowsRefLength);

      // Waiting for loading spinner in the grid to disappear
      Utilities.waitUntilElementDisappears(element(by.xpath(
        _this.xpathSlickGridLoadingSpinner)), 40000);

      // Waiting for data values to load in grid
      browser.sleep(2000);

      // Scroll next set into visibility
      var loadNextSet = function() {
        browser.executeScript(function(options) {
          var gridXpath = options.gridXpath;
          var rows = [];
          var grid = angular.element(document.evaluate(gridXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
            .singleNodeValue).controller('tfSlickGrid').grid;

          var rowItems = grid.getData().getItems();
          var dataLength = grid.getDataLength();
          for (var i = 0; i < rowItems.length; i++) {
            rows.push(grid.getDataItem(i));
          }

          return [rows, dataLength];
        }, options).then(function(dataView) {
          rowsRefLength1 = dataView[0].length;

          // Full fill the promise if the grid data length and fetched rows length is equal
          if (rowsRefLength1 === rowsLength) {
            defer.fulfill(dataView[0]);
          }

          _this.scrollRowToTop(tileName, rowsRefLength1);

          // Waiting for loading spinner in the grid to disappear
          Utilities.waitUntilElementDisappears(element(by.xpath(
            _this.xpathSlickGridLoadingSpinner)), 40000);

          // Waiting for data values to load in grid
          browser.sleep(2000);
        });

        if (rowsRefLength < rowsLength) {
          rowsRefLength = rowsRefLength + 300;
        }
      };

      // Scrolling the rows until the fetched rows length is equal to the grid data length
      while (rowsRefLength < rowsLength) {
        loadNextSet();
      }
    }
  });
  _this.scrollRowToTop(tileName, 1);

  // Waiting for data values to load in grid
  browser.sleep(2000);

  if (rowsRefLength1 !== rowsLength) {
    defer.reject('Fetched rows length of array did not match with grid data length, ' + rowsRefLength1 + ' to be ' + rowsLength);
  }

  return promise;
};

module.exports = new SlickGridFunctions();
