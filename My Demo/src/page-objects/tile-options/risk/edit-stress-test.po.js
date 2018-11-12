'use strict';

var EditStressTest = function() {
  this.xpath = '//tf-dialog';
  this.xpathSaveButton = '//tf-button[normalize-space(.)="Save"]';
  this.xpathDatePickerButton = '//*[@data-qa-id="risk-st-preview-replacingText-section"]//tf-datepicker-dropdown' +
    '/span[@tf-button][contains(@class,"tf-datepicker-button")]';
  this.xpathHistoryLimitDrodownButton = '//*[@data-qa-id="risk-st-history-limit-section"]//span[@tf-button]' +
    '[contains(@class,"btn-icon")][not(contains(@class,"datepicker"))]';
  this.xpathDatepickerTextbox = '//*[@data-qa-id="risk-st-replacingText-section"]//tf-textbox';
  this.xpathPreviewDatepickerTextbox = '//*[@data-qa-id="risk-st-preview-replacingText-section"]//tf-textbox';
  this.xpathButtonFromDialog = '//tf-dialog//tf-button[normalize-space(.)="replacingText"]';
  this.xpathCurrencyDropdown = '//*[@data-qa-id="dropdown-risk-st-shock-type"]/following-sibling::*//*[@data-qa-id="dropdown-pricing-currency"]';
  this.xpathCheckBoxFromAccordion = '//tf-accordion//*[@data-qa-id="checkbox-risk-st-replacingText"]';
  this.xpathReportDateDropdownButton = '//*[@data-qa-id="risk-st-preview-report-date-section"]//span[@tf-button]' + '[contains(@class,"btn-icon")][not(contains(@class,"datepicker"))]';
  this.xpathOfRefreshIcon = '//tf-button[contains(@tf-disabled,"ctrl.loadingMessage")]//*[contains(@type,"refresh") and not(contains(@class,"disabled"))]';
  this.xpathOfFactorInformationSection = '//*[@data-qa-id="risk-st-preview-factor-information-section"][not(contains(@class, "ng-hide"))]';
  this.xpathOfFactorTextbox = '//*[@data-qa-id="risk-stress-test-factor-lookup"]//*[@data-qa-id="input-stress-test-factor-lookup"]';
};

/**
 * @function getInputBox
 * @description This function is used to get input box reference
 * @param {string} inputName Name of the input box
 * @param {string} [fromAccordion] Should be defined if required input is from Accordion
 * @returns {ElementFinder} Returns the element finder of input
 */
EditStressTest.prototype.getInputBox = function(inputName, fromAccordion) {
  var xpathInput = this.xpath;
  if (fromAccordion === undefined) {
    xpathInput += '//*[contains(@class,"form-group") and descendant::*[normalize-space(.)="' + inputName + '"]]//tf-textbox';
  } else {
    xpathInput += '//*[@data-qa-id="risk-st-' + inputName.toLowerCase().replace(/\s/g, '-') + '-input-box"]';
  }

  return element(by.xpath(xpathInput));
};

/**
 * @function getDropDown
 * @description This function is used to get drop down reference
 * @param {string} dropDownName Name of the dropdown
 * @param {string} [fromAccordion] Should be defined if required input is from Accordion
 * @returns {ElementFinder} Returns the element finder of dropdown
 * NOTE: If the dropdown button does not have  "tf-dropdown-select" tag please do not use this function.
 */
EditStressTest.prototype.getDropDown = function(dropDownName, fromAccordion) {
  var xpathDD = this.xpath;
  if (fromAccordion === undefined) {
    xpathDD += '//*[contains(@class,"form-group") and descendant::*[normalize-space(.)="' + dropDownName + '"]]//tf-dropdown-select';
  } else {
    xpathDD += '//*[@data-qa-id="dropdown-risk-st-' + dropDownName.toLowerCase().replace(/\s/g, '-') + '"]';
  }

  return element(by.xpath(xpathDD));
};

/**
 * @function getComboBoxDropDown
 * @description This function is used to get drop down toggle of a combo box
 * @param {string} comboBoxName Name of the Combo Box
 * @returns {ElementFinder} Returns the element finder of drop down toggle of combo box
 */
EditStressTest.prototype.getComboBoxDropDown = function(comboBoxName) {
  var xpathDD = this.xpath;
  if (comboBoxName === 'Risk Model') {
    xpathDD += '//*[@data-qa-id="label-risk-st-preview-risk-models"]//*[contains(@class,"dropdown") and @icon]';
  } else {
    xpathDD += '//*[@data-qa-id="risk-st-' + comboBoxName.toLowerCase().replace(/\s/g, '-') + '-section"]' +
      '//*[contains(@class,"btn-icon-toggle")]';
  }

  return element(by.xpath(xpathDD));
};

/**
 * @function getComboTextBox
 * @description This function is used to get text box reference of a combo box
 * @param {string} comboBoxName Name of the Combo Box
 * @returns {ElementFinder} Returns the element finder of text box of combo box
 */
EditStressTest.prototype.getComboTextBox = function(comboBoxName) {
  var xpathDD = this.xpath;
  if (comboBoxName === 'Risk Model') {
    xpathDD += '//*[@data-qa-id="label-risk-st-preview-risk-models"]//tf-textbox';
  } else {
    xpathDD += '//*[@data-qa-id="risk-st-' + comboBoxName.toLowerCase().replace(/\s/g, '-') + '-section"]' +
      '//tf-textbox';
  }

  return element(by.xpath(xpathDD));
};

/**
 * @function getAccordion
 * @description This function is used to getreference of a Accordion
 * @param {string} sectionTitle Section title of the Accordion
 * @returns {ElementFinder} Returns the element finder of the Accordion with the given section title
 */
EditStressTest.prototype.getAccordion = function(sectionTitle) {
  return element(by.xpath('//tf-accordion//*[@section-title="' + sectionTitle + '"]'));
};

/**
 * @function getSpinner
 * @description This function is used to get reference of a spinner
 * @returns {ElementFinder} Returns the element finder of the spinner
 */
EditStressTest.prototype.getSpinner = function() {
  return element(by.xpath('//tf-dialog//pa-risk-spinner'));
};

/**
 * @function expandElementTreeInDropDown
 * @description This function is used to expand element from the drop down
 * @param {string} elementPath Path of the tree to be expanded Ex: Unsubscribed Risk Models|APT
 * @param {string} excludeElements elements to be excluded
 */
EditStressTest.prototype.expandElementTreeInDropDown = function(elementPath, excludeElements) {
  // Variable( s )
  var arrElements = elementPath.split('|');
  var xpathExpandButton = '//tf-dropdown//*[contains(@class,"treeview ng-empty")]/ul/li';

  if (excludeElements !== undefined) {
    excludeElements = excludeElements.split('|');
  }

  // Scroll and Expand element
  var scrollAndExpand = function() {
    // Scroll the element into visibility ( if  not visible )
    Utilities.makeElementVisible(element(by.xpath(xpathExpandButton)));

    element(by.xpath(xpathExpandButton)).getAttribute('class').then(function(attr) {
      if (attr.indexOf('expanded') === -1) {
        element(by.xpath(xpathExpandButton)).click();
      }
    });
  };

  for (var i = 0; i < arrElements.length; i++) {
    xpathExpandButton += '/div[.="' + arrElements[i] + '"]//a';

    if ((excludeElements === undefined) || (excludeElements.indexOf(arrElements[i]) < 0)) {
      scrollAndExpand();
    } else {
      excludeElements.slice(excludeElements.indexOf(arrElements[i]), 1);
    }

    if (i !== arrElements.length - 1) {
      xpathExpandButton += '/ancestor::li/';
    }
  }
};

/**
 * @function getElementFromDropDown
 * @description  This function is used to get reference of a particular element from the drop down
 * @param {string} parentElementPath parent element in which required element is present. Ex: Unsubscribed Risk Models|APT
 * @param {string} elementName  Name of the element you want to get the reference of.
 * @param (string} isTreeElement Defined when the element to be required is a tree
 * @returns {ElementFinder} Returns the element finder of the the required element
 */
EditStressTest.prototype.getElementFromDropDown = function(parentElementPath, elementName, isTreeElement) {
  // Variable(s)
  var arrElements;
  var xpathParentElement = '//tf-dropdown//*[contains(@class,"treeview ng-empty")]/ul/li';

  if (parentElementPath !== false) {
    arrElements = parentElementPath.split('|');
  } else {
    arrElements = [elementName];
  }

  for (var i = 0; i < arrElements.length; i++) {
    xpathParentElement += '/div[.="' + arrElements[i] + '"]';

    if (isTreeElement === undefined) {
      xpathParentElement += '/ancestor::li/';
    }
  }

  if (isTreeElement === undefined && parentElementPath !== false) {
    xpathParentElement += '/div[.="' + elementName + '"]';
  }

  return element(by.xpath(xpathParentElement));
};

/**
 * @function checkIfExpandedDDElement
 * @description  This function is used to check if the passed in tree elements is/are expanded
 * @param {string} elementPath parent element in which required element is present. Ex: Unsubscribed Risk Models|APT
 * @returns {ElementFinder} Returns the element finder of the the required element
 */
EditStressTest.prototype.checkIfExpandedDDElement = function(elementPath) {
  // Variable(s)
  var arrElements = elementPath.split('|');
  var xpathParentElement;

  // Sub-function
  var isExpanded = function(iterator) {
    if (iterator !== arrElements.length - 1) {
      xpathParentElement += '/div[.="' + arrElements[iterator] + '"]//a/ancestor::li';
      if (iterator === 0) {
        element(by.xpath(xpathParentElement)).getAttribute('class').then(function(classVal) {
          if (classVal.indexOf('expanded') === -1) {
            expect(false).customError('Element is not expanded');
          }
        });
      } else {
        element(by.xpath(xpathParentElement + '[1]')).getAttribute('class').then(function(classVal) {
          if (classVal.indexOf('expanded') === -1) {
            expect(false).customError('Element is not expanded');
          }
        });
      }
    } else {
      xpathParentElement += '//div[.="' + arrElements[iterator] + '"]//a/ancestor::li[1]';
      element(by.xpath(xpathParentElement)).getAttribute('class').then(function(classVal) {
        if (classVal.indexOf('expanded') === -1) {
          expect(false).customError('Element is not expanded');
        }
      });
    }
  };

  if (arrElements.length === 1) {
    xpathParentElement = '//tf-dropdown//*[contains(@class,"treeview ng-empty")]/ul/li/div[.="' + arrElements[0] + '"]' +
      '//a/ancestor::li[1]';
    expect(element(by.xpath(xpathParentElement)).getAttribute('class')).toContain('expanded');
  } else {
    xpathParentElement = '//tf-dropdown//*[contains(@class,"treeview ng-empty")]/ul/li';
    for (var i = 0; i < arrElements.length; i++) {
      isExpanded(i);
    }
  }

  return element(by.xpath(xpathParentElement));
};

/**
 * @function getLabelFromFactorInfoSection
 * @description This function is used to get reference of Label from Factor Information Section
 * @param {string} labelName name of the label
 * @returns {ElementFinder} Returns the reference of the Label
 */
EditStressTest.prototype.getLabelFromFactorInfoSection = function(labelName) {
  return element(by.xpath('//*[@data-qa-id="risk-st-preview-factor-information-section"]//*[@data-qa-id="label-risk-st-' +
    'preview-' + labelName.toLowerCase().replace(/\s/g, '-') + '"]'));
};

/**
 * @function getOptionFromDropdown
 * @description This function is used to get reference of an option from the drodown which is opend
 * @param {string} optionName name of the option
 * @returns {ElementFinder} Returns the reference of the option
 */
EditStressTest.prototype.getOptionFromDropdown = function(optionName) {
  var xpathDropdownOption = '//tf-dropdown-select-base-list//tf-dropdown-select-item[normalize-space(.)="' + optionName + '"]';
  return element(by.xpath(xpathDropdownOption));
};

/**
 * @function getOptionFromDropdown
 * @description This function is used to click on refresh button and wait for the Factor Information section to load
 * @returns {} NA
 */

EditStressTest.prototype.clickOnRefreshButton = function() {
  var _this = this;

  // Disabling wait for angular to handle loading icon
  it('Disabling wait for angular', function() {
    browser.ignoreSynchronization = true;
  });

  it('Should click on "refresh" icon in the Edit Stress Test dialog', function() {
    ThiefHelpers.getButtonClassReference(undefined, _this.xpathOfRefreshIcon).press().then(function() {}, function(err) {

      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });
  });

  it('Should wait for the spinner icon to Appear', function() {
    Utilities.waitUntilElementAppears(CreateNewStressTest.getSpinner(), 10000);
  });

  it('Verifying if "Preview" section is updating', function() {
    CreateNewStressTest.getSpinner().isPresent().then(function(bool) {
      if (!bool) {
        expect(false).customError('"Preview" section is not updating');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Should wait for the spinner icon to Disappear', function() {
    Utilities.waitUntilElementDisappears(CreateNewStressTest.getSpinner(), 15000);
  });

  it('Wait for the Factor Information Section to load', function() {
    browser.wait(function() {
      return element(by.xpath(_this.xpathOfFactorInformationSection)).isDisplayed().then(function(isfound) {
        return isfound;
      }, function() {
        return false;
      });
    }, 30000).then(function() {}, function() {});
  });

  it('Enabling wait for angular', function() {
    browser.ignoreSynchronization = false;
  });
};

/**
 * @function getColumnData
 * @description This function is used to get all data of a particular column from slickgrid.
 * @param {string} colName name of the column from which data is required
 * @param {int} gridIndex grid index
 * @returns {Promise[]}  Promise which resolves to the array of column data.
 */
EditStressTest.prototype.getColumnData = function(colName, gridIndex) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var colData = [];
  var _this = this;
  var options;
  _this.getColumnIndex(colName, gridIndex).then(function(colIndex) {
    _this.getDataView(gridIndex).then(function(dataView) {
      dataView.forEach(function(temp, index) {
        options = {
          rowIndex: index,
          colIndex: colIndex,
        };
        browser.driver.executeScript(function(options, gridIndex) {
          var slickObject;

          if (gridIndex === 0) {
            slickObject = $('.tf-slick-grid').data('$tfSlickGridController').grid;
          } else {
            slickObject = $('.tf-slick-grid:eq(1)').data('$tfSlickGridController').grid;
          }

          slickObject.scrollCellIntoView(options.rowIndex, options.colIndex);
          return slickObject.getCellNode(options.rowIndex, options.colIndex);
        }, options, gridIndex).then(function(cellRef) {
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
 * @param {int} gridIndex grid index
 * @returns {Promise[]}  Promise which resolves to index of the column.
 */
EditStressTest.prototype.getColumnIndex = function(colName, gridIndex) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  this.getAllColumnNames(gridIndex).then(function(allColumns) {
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
 * @param {int} gridIndex grid index
 * @returns {Promise[]} Promise which resolves to an array of JSON objects of rows of data from slickgrid.
 */
EditStressTest.prototype.getDataView = function(gridIndex) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;

  browser.driver.executeScript(function(gridIndex) {
    var slickObject;
    if (gridIndex === 0) {
      slickObject = $('.tf-slick-grid').data('$tfSlickGridController').grid;
    } else {
      slickObject = $('.tf-slick-grid:eq(1)').data('$tfSlickGridController').grid;
    }

    var data = slickObject.getData().getItems();
    return data;
  }, gridIndex).then(function(dataView) {
    defer.fulfill(dataView);
  });
  return promise;
};

/**
 * @function getAllColumnNames
 * @description This function is used to get the names of all coulmns from slickgrid.
 * @param {int} gridIndex grid index
 * @returns {Promise[]} Promise which resolves to name of all the columns.
 */
EditStressTest.prototype.getAllColumnNames = function(gridIndex) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var allColumn = [];
  browser.driver.executeScript(function(gridIndex) {
    var slickObject;

    if (gridIndex === 0) {
      slickObject = $('.tf-slick-grid').data('$tfSlickGridController').grid;
    } else {
      slickObject = $('.tf-slick-grid:eq(1)').data('$tfSlickGridController').grid;
    }

    var col = slickObject.getColumns();
    return col;
  }, gridIndex).then(function(columns) {
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

module.exports = new EditStressTest();
