'use strict';

var CreateNewStressTest = function() {
  this.xpath = '//tf-dialog';
  this.xpathSaveButton = '//tf-button[normalize-space(.)="Save"]';
  this.xpathDatePickerButton = '//*[@data-qa-id="risk-st-preview-replacingText-section"]//tf-datepicker-dropdown' +
    '/span[@tf-button][contains(@class,"tf-datepicker-button")]';
  this.xpathHistoryLimitDrodownButton = '//*[@data-qa-id="risk-st-history-limit-section"]//span[@tf-button]' +
    '[contains(@class,"btn-icon")][not(contains(@class,"datepicker"))]';
  this.xpathDatepickerTextbox = '//*[@data-qa-id="risk-st-replacingText-section"]//tf-textbox';
  this.xpathButtonFromDialog = '//tf-dialog//tf-button[normalize-space(.)="replacingText"]';
  this.xpathCurrencyDropdown = '//tf-dialog//*[normalize-space(.)="replacingText"]/parent::*//*[@data-qa-id="dropdown-pricing-currency"]';
  this.xpathHistoryLimitDatePickerButton = '//*[@data-qa-id="risk-st-history-limit-section"]//span[@tf-button]' +
    '[contains(@class,"btn-icon")][contains(@class,"datepicker")]';
  this.xpathCheckBoxFromAccordian = '//tf-checkbox[@data-qa-id="checkbox-risk-st-replacingText"]';

};

/**
 * @function getInputBox
 * @description This function is used to get input box reference
 * @param {string} inputName Name of the input box
 * @param {string} [fromAccordion] Should be defined if required input is from Accordion
 * @returns {ElementFinder} Returns the element finder of input
 */
CreateNewStressTest.prototype.getInputBox = function(inputName, fromAccordion) {
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
CreateNewStressTest.prototype.getDropDown = function(dropDownName, fromAccordion) {
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
CreateNewStressTest.prototype.getComboBoxDropDown = function(comboBoxName) {
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
CreateNewStressTest.prototype.getComboTextBox = function(comboBoxName) {
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
CreateNewStressTest.prototype.getAccordion = function(sectionTitle) {
  return element(by.xpath('//tf-accordion//*[@section-title="' + sectionTitle + '"]'));
};

/**
 * @function getSpinner
 * @description This function is used to get reference of a spinner
 * @returns {ElementFinder} Returns the element finder of the spinner
 */
CreateNewStressTest.prototype.getSpinner = function() {
  return element(by.xpath('//tf-dialog//pa-risk-spinner'));
};

/**
 * @function expandElementTreeInDropDown
 * @description This function is used to expand element from the drop down
 * @param {string} elementPath Path of the tree to be expanded Ex: Unsubscribed Risk Models|APT
 * @param {string} excludeElements elements to be excluded
 */
CreateNewStressTest.prototype.expandElementTreeInDropDown = function(elementPath, excludeElements) {
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
CreateNewStressTest.prototype.getElementFromDropDown = function(parentElementPath, elementName, isTreeElement) {
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
CreateNewStressTest.prototype.checkIfExpandedDDElement = function(elementPath) {
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
CreateNewStressTest.prototype.getLabelFromFactorInfoSection = function(labelName) {
  return element(by.xpath('//*[@data-qa-id="risk-st-preview-factor-information-section"]//*[@data-qa-id="label-risk-st-' +
    'preview-' + labelName.toLowerCase().replace(/\s/g, '-') + '"]'));
};

/**
 * @function getOptionFromDropdown
 * @description This function is used to get reference of an option from the drodown which is opend
 * @param {string} optionName name of the option
 * @returns {ElementFinder} Returns the reference of the option
 */
CreateNewStressTest.prototype.getOptionFromDropdown = function(optionName) {
  var xpathDropdownOption = '//tf-dropdown-select-base-list//tf-dropdown-select-item[normalize-space(.)="' + optionName + '"]';
  return element(by.xpath(xpathDropdownOption));
};

/**
 * @function getAllColumnNames
 * @description This function is used to get Column names from the slick grid.
 * @returns Returns the array of column names from the slick grid
 */
CreateNewStressTest.prototype.getAllColumnNames = function() {
  var columnNames = [];
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  browser.driver.executeScript(function() {
    var slickObject;
    slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
    return slickObject.grid.getColumns();
  }).then(function(columnRefs) {
    columnRefs.forEach(function(colReference) {
      columnNames.push(colReference.name);
    });
    defer.fulfill(columnNames);
  });
  return promise;
};

/**
 * @function clearRiskModelTextBoxAndExpandGroupToSelectOption
 * @description This function is used to clear Risk Model text box and select the required option.
 * @param {string} groupName name of the group from which otion has to be selected.
 * @param {string} optionName name of the required option.
 * @returns Returns the array of column names from the slick grid
 */

CreateNewStressTest.prototype.clearRiskModelTextBoxAndExpandGroupToSelectOption = function(groupName, optionName) {

  var _this = this;

  it('Click on the x icon of Risk Model text-box to clear', function() {
    ThiefHelpers.getTextBoxClassReference('Risk Model', _this.getComboTextBox('Risk Model')).clearText();
  });

  it('Should click "Risk Model" drop down to expand it', function() {
    _this.getComboBoxDropDown('Risk Model').click().then(function() {}, function(err) {

      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });

    // Verifying if drop down opened
    ThiefHelpers.isDropDownOpen().then(function(isOpen) {
      if (!isOpen) {
        expect(false).customError('"Risk Model" drop-down is not opened');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Should expand "' + groupName + '" from the drop-down', function() {
    _this.expandElementTreeInDropDown(groupName);

    // Verifying if "group" is expanded
    _this.checkIfExpandedDDElement(groupName);
  });

  it('Should click "' + optionName + '" from the drop-down', function() {
    _this.getElementFromDropDown(groupName, optionName).click().then(function() {}, function(err) {

      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });
  });

  it('Verifying if "' + optionName + '" is selected from the drop down', function() {
    ThiefHelpers.getTextBoxClassReference(undefined, _this.getComboTextBox('Risk Model')).getText().then(function(val) {
      if (val !== optionName) {
        expect(false).customError('"' + optionName + '" is not selected from the drop down');
        CommonFunctions.takeScreenShot();
      }
    });
  });
};

/**
 * @function verifyAllColumnsInGridHasValues
 * @description This function is used to verify all columns in the grid has data.
 * @returns Returns boolean value
 */
CreateNewStressTest.prototype.verifyAllColumnsInGridHasValues = function() {
  return browser.driver.executeScript(function() {
    var slickObject;
    var value;
    var col;
    var columnData = [];
    slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
    value = slickObject.grid.getDataLength();
    col = slickObject.grid.getColumns();
    for (var i = 0; i < value; i++) {
      slickObject.grid.scrollRowIntoView(i);
      for (var j = 0; j < col.length; j++) {
        if (slickObject.grid.getCellNode(i, j) === null || slickObject.grid.getCellNode(i, j) === undefined) {
          return false;
        }
      }
    }

    return true;

  });
};

module.exports = new CreateNewStressTest();
