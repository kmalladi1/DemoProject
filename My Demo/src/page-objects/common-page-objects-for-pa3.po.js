'use strict';

var CommonPageObjectsForPA3 = function() {
  this.xpathOfTitle = '//tf-tab-content//*[normalize-space(.)="replacingText"]';
  this.xpathOfContent = this.xpathOfTitle + '//following-sibling::*';
  this.xpathOfTheTab = '//tf-tab';
  this.xpathOfRequiredTab = '//tf-tab[normalize-space(.)="replacingText"]';
  this.xpathOfDocumentHasChangedDialog = '//*[contains(@class,"dialog-title") and normalize-space(.)="Document has changed"]/parent::*';
  this.xpathOfButtonOfDocumentHasChangedDialog = '//*[contains(@class,"dialog-title")]//*[normalize-space(.)="Document has changed"]/parent::*' +
    '/following-sibling::*[contains(@class,"dialog-button")]//*[normalize-space(.)="replacingText"]';
  this.xpathOptionsPane = '//*[@data-qa-id="options-lhp"]//tf-options-pane';
  this.xpathOfOkOrCancelButtonOfDialog = '//tf-dialog//span[@tf-button][normalize-space(.)="replacingText"]|//tf-dialog//tf-button[normalize-space(.)="replacingText"]';
};

/**
 * @function OpenDefaultDocumentAndSetAutomaticCalculation
 * @description Opens default document and check or un-check Automatic calculation
 * @param {boolean} set Boolean value, TRUE to select, FALSE to deselect
 * @example CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);
 * @return NA
 */
CommonPageObjectsForPA3.prototype.OpenDefaultDocumentAndSetAutomaticCalculation = function(set) {

  it('Should launch PA3 application with default document "#/doc/PA_DOCUMENTS:DEFAULT/report/report0"', function() {

    browser.call(() => {
      PA3MainPage.goToURL('#/doc/PA_DOCUMENTS:DEFAULT/report/report0');
    });

    // Verifying if any Auto Recovery popup appeared
    ThiefHelpers.isDialogOpen('PA_DOCUMENTS:DEFAULT').then(function(found) {
      if (found) {
        PA3MainPage.editOrDiscardReportChanges('Discard Changes');
      }
    });

    // Creating object
    var documentObj = DocumentJson['pa-document-default'];

    // Verify if application is launched
    browser.getTitle().then(function(title) {
      if (title !== documentObj.browserTitle) {
        expect(false).customError('Title of browser did not match. ' + 'Expected: "' + documentObj.browserTitle + '" but Found: "' + title + '".');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  this.clickOnApplicationToolbarWrenchIconAndSetAutomaticCalculation(set);
};

/**
 * @function verifyWidgetBoxText
 * @description This function is used to verify portfolio and benchmark widget text.
 * @param {string} arrOfWidgetBoxXpath xpath of the widget boxes.
 * @param {string} arrOfWidgetBox Array of widget boxes names.
 * @param {string} arrOfExpectedText Array of expected text to be present in widget boxe.
 * @example CommonPageObjectsForPA3.verifyWidgetBoxText(arrOfWidgetXpath, arrOfWidgets, arrOfExpectedText);
 * @return NA
 */
CommonPageObjectsForPA3.prototype.verifyWidgetBoxText = function(arrOfWidgetBoxXpath, arrOfWidgetBox, arrOfExpectedText) {

  arrOfWidgetBoxXpath.forEach(function(xpathOfWidget, index) {
    it('Verifying if "' + arrOfWidgetBox[index] + '" widget is populated with "' + arrOfExpectedText[index] + '"', function() {
      ThiefHelpers.getTextBoxClassReference('', xpathOfWidget).getText().then(function(text) {
        if (text !== arrOfExpectedText[index]) {
          expect(false).customError(arrOfWidgetBox[index] + 'widget is not populated with "' + arrOfExpectedText[index] + '"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });
  });
};

/**
 * @function switchToDocumentAndVerify
 * @description This function is used to switch to the given document and also verify the same.
 * @param {string} documentKey Name of the document to switch to.
 * @example CommonPageObjectsForPA3.switchToDocumentAndVerify('mp-fix');
 * @return NA
 */
CommonPageObjectsForPA3.prototype.switchToDocumentAndVerify = function(documentKey) {
  // Creating object
  var documentObj = DocumentJson[documentKey];

  // Opening document as per given by user
  PA3MainPage.switchToDocument(documentObj.documentPath);

  // Verify if application is launched
  browser.getTitle().then(function(title) {
    if (title !== documentObj.browserTitle) {
      expect(false).customError('Title of browser did not match. Expected: "' + documentObj.browserTitle + '" but Found: "' + title + '".');
      CommonFunctions.takeScreenShot();
    }
  });
};

/**
 * @function verifyIfElementIsPresentInSelectedSection
 * @description This function is used to verify if the element is present in selected section(element in virtual list-box tag)
 * @param elementName {string} Name of the element to be verified if it is present in selected section
 * @param xpathOfSelectedSection {string} xpath of selected section
 * @return NA
 */
CommonPageObjectsForPA3.prototype.verifyIfElementIsPresentInSelectedSection = function(elementName, xpathOfSelectedSection) {

  var arrOfColumns = [];
  var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();

  children.then(function(childArr) {
    for (var i = 0; i < childArr.length; ++i) {
      arrOfColumns.push(childArr[i].text);
    }

    if (arrOfColumns.indexOf(elementName) === -1) {
      expect(false).customError('"' + elementName + '" is not present in the selected section.');
      CommonFunctions.takeScreenShot();
    }
  });
};

/**
 * @function verifyIfReportIsCalculated
 * @description Wait for the loading icon to disappear and verify if the given report is calculated.
 * @param {string} reportName Name of the report whose calculation status has to be verified.
 * @example CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');
 * @return NA
 */
CommonPageObjectsForPA3.prototype.verifyIfReportIsCalculated = function(reportName) {

  it('Waiting for "' + reportName + '" report to calculate', function() {
    Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000).then(function(loaded) {
      if (!loaded) {
        expect(false).customError('Encountered an error during "' + reportName + '" calculation.');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Verifying that "' + reportName + '" report is calculated', function() {
    PA3MainPage.isReportCalculated(reportName).then(function(option) {
      if (!option) {
        expect(false).customError('Calculated data for "' + reportName + '" report appeared with errors.');
        CommonFunctions.takeScreenShot();
      }
    }, function(error) {

      if (error.name === 'StaleElementReferenceError') {
        expect(PA3MainPage.isReportCalculated(reportName)).toBeTruthy();
      } else {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      }
    });

    // Verifying if any error dialog box appeared
    PA3MainPage.getDialog('Calculation Error').isPresent().then(function(appeared) {
      if (appeared) {
        expect(false).customError('"Calculation Error" dialog appeared.');
        CommonFunctions.takeScreenShot();
      }
    });
  });
};

/**
 * @function verifyIfChartIsDisplayed
 * @description Wait for the loading icon to disappear and verify if the given chart is displayed.
 * @param {string} chartName Name of the chart whose status has to be verified.
 * @example  CommonPageObjectsForPA3.verifyIfChartIsDisplayed('Performance');
 * @return NA
 */
CommonPageObjectsForPA3.prototype.verifyIfChartIsDisplayed = function(chartName) {

  it('Waiting for "' + chartName + '" chart to display', function() {
    Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000).then(function(loaded) {
      if (!loaded) {
        expect(false).customError('Encountered an error during "' + chartName + '" calculation.');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Verifying that "' + chartName + '" chart is displayed', function() {
    PA3MainPage.isInChartFormat(chartName).then(function(displayed) {
      expect(displayed).customError('"' + chartName + '" chart is not displayed on the web-page.');
      if (!displayed) {
        CommonFunctions.takeScreenShot();
      }
    }, function(error) {

      if (error.name === 'StaleElementReferenceError') {
        expect(PA3MainPage.isInChartFormat(chartName)).toBeTruthy();
      } else {
        expect(false).customError('Error found while calculating "' + chartName + '" chart: ' + error);
        CommonFunctions.takeScreenShot();
      }
    });

    // Verifying if "Calculation Error" dialog appeared
    PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
      if (option) {
        expect(false).customError('"Calculation Error" dialog appeared');
        CommonFunctions.takeScreenShot();
      }
    });
  });
};

/**
 * @function clickOnReportWrenchIconAndSelectOption
 * @description Select option from report wrench menu list.
 * @param {string} reportName Name of the report.
 * @param {string} optionName Name of the option.
 * @example  CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights', 'Options');
 * @return NA
 */
CommonPageObjectsForPA3.prototype.clickOnReportWrenchIconAndSelectOption = function(reportName, optionName) {

  it('Should click on the "Wrench" icon in the "' + reportName + '" report ', function() {
    PA3MainPage.getWrenchIconFromReportWorkspace(reportName).click().then(function() {
    }, function(err) {

      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });
  });

  it('Verifying if Wrench menu list appeared after clicking on "Wrench" icon in the "' + reportName + '" report', function() {
    ThiefHelpers.isDropDownOpen().then(function(appeared) {
      if (!appeared) {
        expect(false).customError('Menu list did not appear after clicking on "Wrench" icon in the "' + reportName + '" report.');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Should select "' + optionName + '" from the wrench menu list', function() {
    ThiefHelpers.getMenuClassReference().selectItemByText(optionName).then(function() {
    }, function(err) {

      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });
  });
};

/**
 * @function clickOnApplicationToolbarWrenchIconAndSelectOption
 * @description Select option from wrench menu list of application toolbar.
 * @param {string} optionName Name of the option.
 * @example  CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSelectOption('Document Options');
 * @return NA
 */
CommonPageObjectsForPA3.prototype.clickOnApplicationToolbarWrenchIconAndSelectOption = function(optionName) {
  it('Should click on the "Wrench" icon from the application toolbar', function() {
    ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.xpathApplicationWrenchIcon).press().then(function() {
    }, function() {

      expect(false).customError('Unable to click on "wrench" button.');
      CommonFunctions.takeScreenShot();
    });
  });

  it('Verifying if Wrench menu list appeared after clicking on "Wrench" icon of application toolbar', function() {
    ThiefHelpers.isDropDownOpen().then(function(appeared) {
      if (!appeared) {
        expect(false).customError('Wrench menu drop down has not appeared after clicking on "Wrench" icon.');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Should click on "' + optionName + '" from wrench menu drop down', function() {
    ThiefHelpers.getMenuClassReference().selectItemByText(optionName).then(function() {
    }, function(err) {

      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });
  });
};

/**
 * @function waitForTheElementToLoad
 * @description To wait for the element to load in the DOM.
 * @param {string} xpathOrRefence xpath of the lement.
 * @example  waitForTheElementToLoad('//tf-dropdown//tf-menu')
 * @return NA
 */

CommonPageObjectsForPA3.prototype.waitForTheElementToLoad = function(xpathOrRefence) {
  browser.wait(function() {
    return element(by.xpath(xpathOrRefence)).isDisplayed().then(function(isfound) {
      return isfound;
    }, function() {

      return false;
    });
  }, 5000).then(function() {
  }, function() {
  });
};

/**
 * @function clickOnApplicationToolbarWrenchIcon
 * @description Click on the report wrench icon and verify if menu is displayed.
 * @example  CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIcon();
 * @return NA
 */

CommonPageObjectsForPA3.prototype.clickOnApplicationToolbarWrenchIcon = function() {

  var _this = this;

  it('Wait for the menu list to load', function() {
    _this.waitForTheElementToLoad(PA3MainPage.xpathApplicationWrenchIcon);
  });

  var clickOnWrenchIcon = function() {
    ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.xpathApplicationWrenchIcon).press().then(function() {
      console.log('Clicking on Wrench Icon was success.');
    }, function() {

      expect(false).customError('Unable to click on "wrench" button.');
      CommonFunctions.takeScreenShot();
    });
  };

  it('Should click on the "Wrench" icon from the application toolbar', function() {
    clickOnWrenchIcon();
  });

  it('Wait for the menu list to load', function() {
    _this.waitForTheElementToLoad(PA3MainPage.xpathApplicationWrenchIcon);
  });

  it('Verifying if Wrench menu list appeared after clicking on "Wrench" icon', function() {
    ThiefHelpers.isDropDownOpen().then(function(appeared) {
      console.log(appeared + '     First Instance');
      if (!appeared) {
        clickOnWrenchIcon();

        _this.waitForTheElementToLoad(PA3MainPage.xpathApplicationWrenchIcon);

        ThiefHelpers.isDropDownOpen().then(function(appeared) {
          console.log(appeared + '     Second Instance');
          if (!appeared) {
            expect(false).customError('Menu list did not appear after clicking on "Wrench" icon.');
            CommonFunctions.takeScreenShot();
          }
        });
      }
    });
  });
};

/**
 * @function clickOnApplicationToolbarWrenchIconAndsetAutomaticCalculation
 * @description Set Automatic calculation in wrench menu list of application toolbar.
 * @param {boolean} set Boolean value, TRUE to select, FALSE to deselect.
 * @example  CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSelectOption('Document Options');
 * @return NA
 */
CommonPageObjectsForPA3.prototype.clickOnApplicationToolbarWrenchIconAndSetAutomaticCalculation = function(set) {

  var checkOrUncheck = '';
  var _this = this;

  if (set === true) {
    checkOrUncheck = 'check';
  } else {
    checkOrUncheck = 'un-check';
  }

  _this.clickOnApplicationToolbarWrenchIcon();

  it('Should "' + checkOrUncheck + '" "Automatic Calculation" option from menu drop down', function() {
    if (set === true) {
      ThiefHelpers.getMenuClassReference().getCheckedState('Automatic Calculation').then(function(status) {
        if (!status) {
          ThiefHelpers.getMenuClassReference().selectItemByText('Automatic Calculation').then(function() {
          }, function(err) {

            expect(false).customError('Unable to check "Automatic Calculation"' + err);
            CommonFunctions.takeScreenShot();
          });
        }
      });
    } else if (set === false) {
      ThiefHelpers.getMenuClassReference().getCheckedState('Automatic Calculation').then(function(status) {
        if (status) {
          ThiefHelpers.getMenuClassReference().selectItemByText('Automatic Calculation').then(function() {
          }, function(err) {

            expect(false).customError('Unable to un-check "Automatic Calculation"' + err);
            CommonFunctions.takeScreenShot();
          });
        }
      });
    }
  });

  _this.clickOnApplicationToolbarWrenchIcon();

  it('Verify if  "Automatic Calculation" option is"' + checkOrUncheck + '" of menu drop down', function() {
    if (set === true) {
      ThiefHelpers.getMenuClassReference().getCheckedState('Automatic Calculation').then(function(status) {
        if (!status) {
          expect(false).customError('"Automatic Calculation" is "' + checkOrUncheck + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    } else if (set === false) {
      ThiefHelpers.getMenuClassReference().getCheckedState('Automatic Calculation').then(function(status) {
        if (status) {
          expect(false).customError('"Automatic Calculation" is "' + checkOrUncheck + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    }
  });
};

/**
 * @function clickOkOrCancelButtonOfHeader
 * @description Select option from tile header bar and verify if the view is closed.
 * @param {string} buttonName: Name of the button. (Ex: OK, Cancel)
 * @param {string} headerName Name of the view. (Tile options, Document options, Modify account(New) etc)
 * @example CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK','TileOptions-Weights');
 * @return NA
 */
CommonPageObjectsForPA3.prototype.clickOkOrCancelButtonOfHeader = function(buttonName, headerName) {

  it('Should click on "' + buttonName + '" button of "' + headerName + '" header', function() {
    ThiefHelpers.getButtonClassReference(buttonName).press().then(function() {
    }, function() {

      expect(false).customError('Unable to click on "' + buttonName + '" button.');
      CommonFunctions.takeScreenShot();
    });
  });

  it('Should verify "' + headerName + '" mode is closed', function() {
    ThiefHelpers.isModeBannerDisplayed(headerName).then(function(found) {
      if (found) {
        expect(false).customError('View is still displayed as "' + headerName + '".');
        CommonFunctions.takeScreenShot();
      }
    });
  });
};

/**
 * @function clearTextInCodeMirror
 * @description The function is used to clear the text in code-mirror;
 * @example CommonPageObjectsForPA3.clearTextInCodeMirror();
 * @return NA
 */

CommonPageObjectsForPA3.prototype.clearTextInCodeMirror = function() {
  browser.driver.executeScript(function() {
    var code = $('.CodeMirror')[0].CodeMirror;

    // Clearing the existing text before entering the text
    code.setValue('');
  });
};

/**
 * @function sendTextOrVerifyTextInCodeMirror
 * @description Enter text or verify the the text in formula section of create/edit custom column or grouping.
 * @param {string} sectionName: Name of the section. (Ex: Formula, SortFormula)
 * @param {string} formulaName Formula to be entered. (Ex: P_PRICE)
 * @param {string} nameOfFormulaToVerify Text to present after entering the formula or selecting from type ahead. (Ex: P_PRICE(NOW))
 * @param {boolean} onlyVerify Set it to True if you want only verify and true if you want to send text and then verify
 * @example CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror('Formula', undefined, 'PMWDB(#BN,"",#ED,B,D,S,#CU,B,FIVEDAYEOM)', true);
 * @return NA
 */

CommonPageObjectsForPA3.prototype.sendTextOrVerifyTextInCodeMirror = function(sectionName, formulaName, nameOfFormulaToVerify, onlyVerify) {
  if (onlyVerify === false) {
    it('Enter "' + formulaName + '" into the "' + sectionName + '"', function() {
      var xpathOfSection = element(by.xpath('//*[@data-qa-id="fl-workspace-codemirror"]'));

      var options = formulaName;
      browser.driver.executeScript(function(options) {
        var code = $('.CodeMirror')[0].CodeMirror;

        // Clearing the existing text before entering the text
        code.setValue('');

        // Entering the required text
        code.setValue(options);

        code.setCursor(code.lineCount(), 0);
        code.focus();
      }, options);
    });
  }

  it('Verify if "' + nameOfFormulaToVerify + '" is present in "' + sectionName + '" section', function() {
    browser.driver.executeScript(function() {
      var code = $('.CodeMirror')[0].CodeMirror;

      // Getting the text in the code-mirror
      return code.getValue();
    }).then(function(text) {
      if (text !== nameOfFormulaToVerify) {
        expect(false).customError('Expected "' + nameOfFormulaToVerify + '" but found: "' + text + '" in the formula section text area.');
        CommonFunctions.takeScreenShot();
      }
    });
  });
};

/**
 * @function appendTextInCodeMirrorandVerify
 * @description Append new text to the existing text in the formula section
 * @param {string} textToBeAppended: Text that has to be appended to the existing text.
 * @param {string} expectedText Text to present after entering appending.
 * @example CommonPageObjectsForPA3.appendTextInCodeMirrorAndVerify('+', 'COL1+');
 * @return NA
 */

CommonPageObjectsForPA3.prototype.appendTextInCodeMirrorAndVerify = function(textToBeAppended, expectedText) {
  it('Append "' + textToBeAppended + '" to the existing text in the formula section', function() {
    var text = textToBeAppended;
    browser.driver.executeScript(function(text) {
      var code = $('.CodeMirror')[0].CodeMirror;

      // Setting the cursor at the End
      code.setCursor(code.lineCount(), 0);

      // Appending the text to the existing text at the END
      code.replaceSelection(text);
      code.focus();
      return code.getValue();
    }, text).then(function(value) {
      if (value !== expectedText) {
        expect(false).customError('"' + text + '" is not appended in the formula section. Found :"' + value + '"');
        CommonFunctions.takeScreenShot();
      }
    });
  });
};

/**
 * @function selectOptionFromTypeahead
 * @description Select the option from the type-ahead.
 * @param {string} optionName: Name of the option that has to be selected form the type-ahead.
 * @example CommonPageObjectsForPA3.selectOptionFromTypeahead('P_PRICE(NOW)');
 * @return NA
 */

CommonPageObjectsForPA3.prototype.selectOptionFromTypeahead = function(optionName) {

  it('Select "' + optionName + '" from typeahead and verify ', function() {
    var eleRef = ThiefHelpers.getTypeaheadClassReference();
    var item = eleRef.get2dItemByLabel(optionName);
    item.getLabel().then(function(name) {
      if (name !== optionName) {
        expect(false).customError('Expected "' + optionName + '" but found"' + name + '".');
        CommonFunctions.takeScreenShot();
      }
    });

    // select the element from the type - ahead using reference
    var elementReference = item.getElementFinder();
    elementReference.click();

    browser.sleep(1000);
  });

  it('Waiting for the "Arguments" tile to appear', function() {
    CommonFunctions.waitUntilElementAppears(element.all(by.xpath(CreateEditCustomColumns.xpathOfArgumentsTile)), 4000);
  });
};

/**
 * @function sendTextIntoFormulaOrSortformulaSection
 * @description Select option from tile header bar and verify if the view is closed.
 * @param {string} sectionName: Name of the section. (Ex: Formula, SortFormula)
 * @param {string} formulaName Formula to be entered. (Ex: P_PRICE)
 * @param {string} optionName Name of the option to be selected from typehead. (Ex: P_PRICE(NOW))
 * @param {string} closeType The way you want to close the Typeahead. (Ex: X Close, Click outside)
 * @param {string} selectedOption Text to present after entering the formula or selecting from type ahead. (Ex: P_PRICE(NOW))
 * @param {boolean} fromTypeahead Pass true if you want to select the option from type ahead. (Ex: P_PRICE(NOW))
 * @return NA
 */

CommonPageObjectsForPA3.prototype.sendTextIntoFormulaOrSortformulaSection = function(sectionName, formulaName, fromTypeahead, optionName, closeType, selectedOption) {
  var xpathOfTab = element(by.xpath('//*[@data-qa-id="' + sectionName.toLowerCase().replace(/\s/g, '-') + '-tab"]'));

  var closeSection = function() {

    if (closeType !== 'X Close') {
      it('Click outside the type ahead to close it', function() {
        xpathOfTab.click().then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    } else {
      it('Click on the "X Close" button', function() {
        CommonFunctions.waitUntilElementAppears(element.all(by.xpath('//tf-button[normalize-space(.)="Close"]')), 6000);
        ThiefHelpers.getButtonClassReference('Close').press().then(function() {
        }, function() {

          expect(false).customError('Unable to click on "' + closeType + '" button.');
          CommonFunctions.takeScreenShot();
        });
      });
    }
  };

  // Send text into code mirror and verify the same
  this.sendTextOrVerifyTextInCodeMirror(sectionName, formulaName, formulaName, false);

  if (fromTypeahead !== undefined) {

    this.selectOptionFromTypeahead(optionName);

    if (selectedOption !== undefined) {

      this.sendTextOrVerifyTextInCodeMirror(sectionName, undefined, selectedOption, true);
    }

    if (closeType !== false) {
      closeSection();
    }
  } else {
    if (closeType !== undefined) {

      it('Waiting for the "Arguments" tile to appear', function() {
        CommonFunctions.waitUntilElementAppears(element.all(by.xpath(CreateEditCustomColumns.xpathOfArgumentsTile)), 6000);
      });

      closeSection();
    }
  }
};

/**
 * @function verifyAndClickOnOkButtonOfConfirmationDialog
 * @description verify if dialog has appeared with expected dialog content and click on the ok button.
 * @param {string} dialogTitle: Name of the dialog box.
 * @param {string} dialogContent: Text of the dialog that has to be verified.
 * @example  CommonPageObjectsForPA3.verifyAndClickOnOkButtonOfConfirmationDialog('Delete Column', 'Are you sure you want to delete this column?');
 * @return NA
 */

CommonPageObjectsForPA3.prototype.verifyAndClickOnOkButtonOfConfirmationDialog = function(dialogTitle, dialogContent) {
  it('Verifying that "' + dialogTitle + '" dialog box saying "' + dialogContent + '" appears', function() {
    ThiefHelpers.verifyDialogTitle(dialogTitle);

    // Verifying the content
    ThiefHelpers.getDialogClassReference(dialogTitle).getContent().getText().then(function(content) {
      content = content.replace(/\n/g, ' ');
      if (content !== dialogContent) {
        expect(false).customError('Expected dialog box content: "' + dialogContent + '"but Found: "' + content + '"');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Click "OK" on the "Confirmation" dialog', function() {
    ThiefHelpers.getDialogButton(dialogTitle, 'OK').click().then(function() { }, function(err) {
      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });
  });

  it('Waiting for action to be completed', function() {
    expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsColumns.xpathLoadingBox)), 180000)).toBeTruthy();
  });
};

/**
 * @function verifyTheItemsInGroup
 * @description verify if expected items are present inside the group.
 * @param {string} reportName: Name of the report. (Ex: Weights)
 * @param {string} elementPath Element Names which has to be expanded. If multiple element has to be expanded pass
 *                              their names separated by "|" symbol.
 * @param {string} arrOfItems Array of items to be present inside the group.
 * @example CommonPageObjectsForPA3.verifyTheItemsInGroup('RBPAShowTopLevelFactorGroupOnlyDefaultBehavior', 'Compounded Factor Impact', arrOfFactors);
 * @return NA
 */
CommonPageObjectsForPA3.prototype.verifyTheItemsInGroup = function(reportName, elementPath, arrOfItems) {
  it('Verifying the factors under "' + elementPath + '" in "' + reportName + '" report', function() {
    SlickGridFunctions.getElementsFromTree(reportName, '', elementPath, '').then(function(elements) {
      elements.forEach(function(factorName, index) {
        if (factorName !== arrOfItems[index]) {
          expect(false).customError('Expected: "' + arrOfItems[index] + '" but Found: "' + factorName + '" under "' + elementPath + '" in' + reportName);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
};

/**
 * @function verifyExpandedOrCollapsedStateOfGroupInReport
 * @description verify if the group is in expanded or collapsed state.
 * @param {string} reportName: Name of the report. (Ex: Weights)
 * @param {string} elementPath Element Names which has to be expanded. If multiple element has to be expanded pass
 *                              their names separated by "|" symbol.
 * @param {string} expectedStatus To verify if group is expanded pass "is expanded" and for collapse "is collapsed".
 * @param {string} [rowClassName]: This variable is to set the slick class of report that is calculated.
 * @example CommonPageObjectsForPA3.verifyExpandedOrCollapsedStateOfGroupInReport('RBPACollapseFactorGroups', factorPath, 'is collapsed', 'grid-canvas grid-canvas-top grid-canvas-left');
 * @return NA
 */
CommonPageObjectsForPA3.prototype.verifyExpandedOrCollapsedStateOfGroupInReport = function(reportName, elementPath, expectedStatus, rowClassName) {
  var arrElements = elementPath.split('|');
  it('Verifying if "' + arrElements[arrElements.length - 1] + '" factor group "' + expectedStatus + '" in "' + reportName + '" report', function() {
    if (expectedStatus === 'is expanded') {
      PA3MainPage.isTreeExpanded(reportName, elementPath, rowClassName).then(function() {
      }, function(status) {

        if (status === false) {
          expect(false).customError('"' + arrElements[arrElements.length - 1] + '" factor group is collapsed in "' + reportName + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    } else if (expectedStatus === 'is collapsed') {
      PA3MainPage.isTreeExpanded(reportName, elementPath, rowClassName).then(function(status) {
        if (status) {
          expect(false).customError('"' + arrElements[arrElements.length - 1] + '" factor group is expanded in "' + reportName + '".');
          CommonFunctions.takeScreenShot();
        }
      }, function(collapsed) {

        expect(true).toBeTruthy();
      });
    }
  });
};

/**
 * @function clickOnAddButtonAndSelectOptionFromDropdown
 * @description The function is used to click on the "+" icon next to available section and select option and verify if dialog is Open.
 * @param {string} OptionName Name of the option(Ex: New/Reference, Lot Grouping).
 * @param {string} dialogHeaderName Name of the to be displayed after clicking on option(Columns, Groupings).
 * @param {number} [referenceNumber=1] use this variable when you find multiple references with same XPATH
 * @param {string} xpathDialog If dialog is not wrapped using "//tf-dialog" tag then you can pass
 *                      customized XPATH which gets the reference of dialog box. Otherwise you can leave it.
 * @param {boolean} shouldLogError Set this variable to TRUE if you want to log error when element did not appear on screen within 10 seconds
 * @example CommonPageObjectsForPA3.clickOnAddButtonAndSelectOptionFromDropdown('New/Reference', 'Columns');
 * @return NA
 */
CommonPageObjectsForPA3.prototype.clickOnAddButtonAndSelectOptionFromDropdown = function(OptionName, dialogHeaderName, referenceNumber, xpathDialog, shouldLogError) {
  var xpathOfSection;
  var xpathOfAddButton;

  if (dialogHeaderName === 'Groupings') {
    xpathOfSection = '//*[@data-qa-id="groupings-add-remove-available-section"]';
  } else if (dialogHeaderName === 'Columns') {
    xpathOfSection = '//*[@data-qa-class="available-section"]';
  }

  xpathOfAddButton = xpathOfSection + '//ancestor::*/tf-transferbox-source/*[normalize-space(.)="Available"]/parent::*//following-sibling::*[@icon="add"]';

  it('Should click on "+" icon in the "Available" section', function() {
    ThiefHelpers.getButtonClassReference(undefined, xpathOfAddButton).press().then(function() {
    }, function(err) {

      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });
  });

  it('Should select "' + OptionName + '" from the drop down', function() {
    ThiefHelpers.getMenuClassReference().selectItemByText(OptionName).then(function() {
    }, function(err) {

      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });
  });

  it('Verifying "' + dialogHeaderName + '" dialog is displayed', function() {
    ThiefHelpers.isDialogOpen(dialogHeaderName, referenceNumber, xpathDialog, shouldLogError).then(function(flag) {
      if (!flag) {
        expect(false).customError('"' + dialogHeaderName + '" dialog is not displayed');
        CommonFunctions.takeScreenShot();
      }
    });
  });
};

/**
 * @function clickOnEditGroupingButtonAndVerify
 * @description The function is used to Click on the Edit Grouping button next to Available section and verify if dialog is open(Exclusions, Hidden).
 * @example CommonPageObjectsForPA3.clickOnEditGroupingButtonAndVerify();
 * @return NA
 */
CommonPageObjectsForPA3.prototype.clickOnEditGroupingButtonAndVerify = function() {

  var xpathOfEditGroupingButton = '//*[contains(@data-qa-id, "options-container") and not(contains(@class, "ng-hide"))]//tf-button[@data-qa-id="button-exclusions-edit-groupings"]';

  it('Click on "Edit Groupings" button next to available section', function() {
    ThiefHelpers.getButtonClassReference('Edit Groupings', xpathOfEditGroupingButton).press().then(function() {
    }, function() {

      expect(false).customError('Unable to click on "Edit Groupings" button.');
      CommonFunctions.takeScreenShot();
    });
  });

  it('Verifying if "Edit Groupings" dialog opens', function() {
    ThiefHelpers.isDialogOpen('Edit Groupings', undefined, undefined).then(function(bool) {
      if (!bool) {
        expect(false).customError('"Edit Groupings" dialog does not opens.');
        CommonFunctions.takeScreenShot();
      }
    });
  });
};

/**
 * @function dragItemOrGroupFromSourceAndDropUnderTarget
 * @description The function is used to drag the item or group from source and place it in the target position.
 * @param {string} referenceOfSource reference of the source and item (Ex: TileOptionsGroupings.getElementFromAvailableSection('FactSet|Equity', 'Price to Book'))
 * @param {string} referenceOfTarget reference of the target (Ex: TileOptionsGroupings.getElementFromSelectedSection('Divide by GeoRev Region - FactSet', 'Americas'))
 * @example CommonPageObjectsForPA3.dragItemOrGroupFromSourceAndDropUnderTarget(referenceOfSource, referenceOfTarget);
 * @return NA
 */
CommonPageObjectsForPA3.prototype.dragItemOrGroupFromSourceAndDropUnderTarget = function(referenceOfSource, referenceOfTarget) {
  browser.driver.actions().mouseDown(referenceOfSource).mouseMove(referenceOfTarget).mouseUp(referenceOfTarget).perform();
};

/*********************************************************************************************************************/
/*                                                 Tabs                                                              */
/*********************************************************************************************************************/

/**
 * @function verifyIfTabIsPresent
 * @description The function is used verify if tab is present.
 * @param {string} tabName Name of the tab (Ex: Formula)
 * @return NA
 */

CommonPageObjectsForPA3.prototype.verifyIfTabIsPresent = function(tabName) {
  element(by.xpath(CommonFunctions.replaceStringInXpath(this.xpathOfRequiredTab, tabName))).isPresent().then(function(option) {
    if (!option) {
      expect(false).customError('"' + tabName + '" tab is not displayed.');
      CommonFunctions.takeScreenShot();
    }
  });
};

/**
 * @function verifyIfExpectedTabsAreDisplayed
 * @description The function is used verify if expected number and expected tabs are displayed
 * @param {number} count Number of tabs expected to display
 * @param {string} arrOfTabs If more then one tab is expected to display.
 * @param {string} nameOfTab If only one tab is expected to display.
 * @example CommonPageObjectsForPA3.verifyIfExpectedTabsAreDisplayed(1, undefined, 'Formula');, CommonPageObjectsForPA3.verifyIfExpectedTabsAreDisplayed(2, arrTabNames);
 * @return NA
 */

CommonPageObjectsForPA3.prototype.verifyIfExpectedTabsAreDisplayed = function(count, arrOfTabs, nameOfTab) {

  var _this = this;

  element.all(by.xpath(this.xpathOfTheTab)).count().then(function(itemsCount) {
    if (itemsCount === count) {
      if (count > 1) {
        arrOfTabs.forEach(function(tabName) {
          _this.verifyIfTabIsPresent(tabName);
        });
      } else {
        _this.verifyIfTabIsPresent(nameOfTab);
      }
    } else {
      expect(false).customError('Expected count of tabs: "' + count + '" are not displayed.');
      CommonFunctions.takeScreenShot();
    }
  });
};

/**
 * @function verifyIfTitleIsBoldAndExpectedContent
 * @description The function is used verify if title is in Bold and expected content is displayed below title
 * @param {string} title title to be verified
 * @param {string} expectedContent content to be displayed under title
 * @example CommonPageObjectsForPA3.verifyIfTitleIsBoldAndExpectedContent('Grpg help', 'P_PRICE');
 * @return NA
 */

CommonPageObjectsForPA3.prototype.verifyIfTitleIsBoldAndExpectedContent = function(title, expectedContent) {

  var _this = this;

  it('Verifying if "' + title + '" is displayed in bold letters', function() {
    element.all(by.xpath(CommonFunctions.replaceStringInXpath(_this.xpathOfTitle, title))).getAttribute('class').then(function(value) {
      var fontStyle = value[0];
      if (fontStyle.indexOf('font-bold') === -1) {
        expect(false).customError('"' + title + '" title is not displayed in bold letters');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Verifying if the text displayed below "' + title + '" is as expected', function() {
    element.all(by.xpath(CommonFunctions.replaceStringInXpath(_this.xpathOfContent, title))).getText().then(function(value) {
      var content = value[0];
      if (content !== expectedContent) {
        expect(false).customError('Expected text "' + expectedContent + '" but Found: "' + content + '"');
        CommonFunctions.takeScreenShot();
      }
    });
  });
};

/*********************************************************************************************************************/
/*                                          Navigating To Tile Options View                                          */
/*********************************************************************************************************************/

/**
 * @function clickOnOptionsAndNavigateToRequiredTab
 * @description The function is used select the options from the report wrench icon and select required LHP option
 * @param {string} reportName Name of the report
 * @param {string} tabName Name of the LHP option
 * @param {string} parentName Name of the parent element of the LHP option
 * @param {string} optionsType Pass "document options" to navigate to document options view
 * @example CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab(reportName, 'Universe', undefined);
 * @return NA
 */
CommonPageObjectsForPA3.prototype.clickOnOptionsAndNavigateToRequiredTab = function(reportName, tabName, parentName, optionsType) {
  var modeBannerName;
  if (optionsType === undefined) {
    modeBannerName = 'Tile Options - ' + reportName;

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    this.clickOnReportWrenchIconAndSelectOption(reportName, 'Options');
  } else {
    modeBannerName = 'Document Options';

    // Click on "Wrench" icon and select 'Document Options'
    this.clickOnApplicationToolbarWrenchIconAndSelectOption('Document Options');
  }

  it('Verifying if view changed to "' + modeBannerName + '" mode', function() {
    ThiefHelpers.isModeBannerDisplayed(modeBannerName).then(function(found) {
      if (!found) {
        expect(false).customError('View is not changed to "' + modeBannerName + '" mode.');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Should click on the "' + tabName + '" tab on the LHP of tile options view', function() {
    ThiefHelpers.getOptionspaneItem(this.xpathOptionsPane, tabName, parentName).select();

    // Verifying if required tab is selected in the LHP
    ThiefHelpers.getOptionspaneItem(this.xpathOptionsPane, tabName, parentName).isSelected().then(function(selected) {
      if (!selected) {
        expect(false).customError('"' + tabName + '" tab is not selected in the LHP.');
        CommonFunctions.takeScreenShot();
      }
    });
  });
};

/**
 * @function clickUniverseAndClickOnSearchOrderButtonAfterClickingOnOptionInWrench
 * @description The function is to navigate to Universe view after clicking on options in report wrench
 * @param {string} reportName Name of the report
 * @example CommonPageObjectsForPA3.clickUniverseAndClickOnSearchOrderButtonAfterClickingOnOptionInWrench(`Sector Weights`);
 * @return NA
 */
CommonPageObjectsForPA3.prototype.clickUniverseAndClickOnSearchOrderButtonAfterClickingOnOptionInWrench = function(reportName) {

  // Click on report wrench icon and select options and click on required LHP option
  this.clickOnOptionsAndNavigateToRequiredTab(reportName, 'Universe', undefined);

  it('Should click on "Search Order" button located under "Expand Composite Assets"', function() {
    ThiefHelpers.getButtonClassReference(`Search Order`).press().then(function() {
    }, function() {

      expect(false).customError('Unable to click on "Search Order" button located under "Expand Composite Assets".');
      CommonFunctions.takeScreenShot();
    });
  });

  it('Verifying if "Asset Ordering" dialog is displayed after clicking Search Order button', function() {
    ThiefHelpers.isDialogOpen('Asset Ordering').then(function(dialogStatus) {
      if (!dialogStatus) {
        expect(false).customError('"Asset Ordering" dialog is not displayed after clicking Search Order button.');
        CommonFunctions.takeScreenShot();
      }
    });
  });
};

/**
 * @function clickOnGroupingsHyperlink
 * @description The function is used to click on groupigs hyperlink and verify if Groupings tab is selected by default in tile options
 * @param {string} reportName Name of the report
 * @param {string} hyperlinkName Name of the groupings hyperlink
 * @example CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');
 * @return NA
 */

CommonPageObjectsForPA3.prototype.clickOnGroupingsHyperlink = function(reportName, hyperlinkName) {
  var _this = this;
  var modeBannerName = 'Tile Options - ' + reportName;

  it('Should click on "' + hyperlinkName + '" hyperlink', function() {
    PA3MainPage.getGroupingsHyperLink(reportName).click().then(function() {
    }, function(err) {

      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });
  });

  it('Verifying if view changed to "' + modeBannerName + '" mode', function() {
    ThiefHelpers.isModeBannerDisplayed(modeBannerName).then(function(found) {
      if (!found) {
        expect(false).customError('View is not changed to "' + modeBannerName + '" mode');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Verifying if "Groupings" is selected in the LHP', function() {
    ThiefHelpers.getOptionspaneItem(_this.xpathOptionsPane, 'Groupings').isSelected().then(function(selected) {
      if (!selected) {
        expect(false).customError('"Groupings" tab is not selected in the LHP by default.');
        CommonFunctions.takeScreenShot();
      }
    });
  });
};

/**
 * @function clickOnExcludeExclusionsHyperlink
 * @description The function is used to click on Exclusion hyperlink and verify if exclusion pop up appeared and click on Edit Grouping dialog if required
 * @param {string} reportName Name of the report
 * @param {string} hyperlinkName Name of the Exclusions hyperlink
 * @param {boolean} selectEditExclusions pass True if you want to click on Edit Grouping hyperlink
 * @example CommonPageObjectsForPA3.clickOnExcludeExclusionsHyperlink('Weights', 'Excluded: Finance', 'selectEditExclusions');
 * @return NA
 */

CommonPageObjectsForPA3.prototype.clickOnExcludeExclusionsHyperlink = function(reportName, hyperlinkName, selectEditExclusions) {
  var _this = this;
  var modeBannerName = 'Tile Options - ' + reportName;

  it('Should click on "' + hyperlinkName + '" hyperlink in report to display Exclusions Info Box.', function() {
    PA3MainPage.getExclusionsHyperLink(reportName).getText().then(function(value) {
      expect(value).toEqual(hyperlinkName);
      if (value === hyperlinkName) {
        PA3MainPage.getExclusionsHyperLink(reportName).click();
      }
    });

    browser.sleep(2000);

    // Verifying if Info Box is displayed.
    expect(PA3MainPage.getAllItemsFromExcludedInfoBox(reportName).count()).toBeGreaterThan(0);
  });

  if (selectEditExclusions !== undefined) {
    it('Should click on "Edit Exclusions" in the info box', function() {
      PA3MainPage.getEditExclusionsHyperlinkFromInfoBox(reportName).click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "' + modeBannerName + '" mode', function() {
      ThiefHelpers.isModeBannerDisplayed(modeBannerName).then(function(found) {
        if (!found) {
          expect(false).customError('View is not changed to "' + modeBannerName + '" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Exclusions" is selected in the LHP', function() {
      ThiefHelpers.getOptionspaneItem(_this.xpathOptionsPane, 'Exclusions').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Exclusions" tab is not selected in the LHP by default.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  }
};

/**
 * @function clickOnCogIconNextToItemVerifyAndSelectRequiredOption
 * @description The function is used to click on cog wheel next to item, verify and click on the required radio button.
 * @param {string} itemName Name of the item on which you want to click
 * @param {string} arrOfOptions Array of the options to be verified
 * @param {string} optionName Name of the option to be selected form the options menu
 * @param {string} elementPath Path of tree in which element is present.
 * @param {boolean} onlyVerify Pass true if you want to click on cog wheel and only verify options
 * @param {boolean} onlySelect Pass true if you want only select the option from options menu
 * @example CommonPageObjectsForPA3.clickOnExcludeExclusionsHyperlink('Weights', 'Excluded: Finance', 'selectEditExclusions');
 * @return NA
 */

CommonPageObjectsForPA3.prototype.clickOnCogIconNextToItemVerifyAndSelectRequiredOption = function(itemName, arrOfOptions, optionName, onlyVerify, onlySelect, elementPath) {

  if (onlySelect === false || onlySelect === undefined) {

    if (elementPath !== undefined) {

      it('Hover over "' + itemName + '" under "' + elementPath + '" and click on the cog icon next to it', function() {
        browser.actions().mouseMove(TileOptionsGroupings.getDirectChildItemAndActionButton(elementPath, itemName, 'options')).perform();
        TileOptionsGroupings.getDirectChildItemAndActionButton(elementPath, itemName, 'options').click().then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    } else {
      it('Should click on "cog" icon next to "' + itemName + '" in "Selected" section', function() {
        TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection(itemName, undefined).click().then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });

        // Verifying if options popup is appeared
        TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection(itemName, true).isPresent().then(function(found) {
          if (!found) {
            expect(false).customError('Error: Failed to open "Options" popup');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    }

    arrOfOptions.forEach(function(buttonName) {
      it('Verifying if "' + buttonName + '" radio button is displayed', function() {
        ThiefHelpers.isPresent('Radio', buttonName).then(function(present) {
          if (!present) {
            expect(false).customError('"' + buttonName + '" radio button is not displayed');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  }

  if (onlyVerify === false || onlyVerify === undefined) {
    it('Should select "' + optionName + '" under directory', function() {
      ThiefHelpers.getRadioClassReference(optionName).select();

      // Verifying if required option is selected under "Directory"
      ThiefHelpers.getRadioClassReference(optionName).isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"' + optionName + '" radio button is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in options popup', function() {
      TileOptionsGroupings.getOkOrCancelButtonOptionsPopuop('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });
  }
};

/**
 * @function verifyIfSpinnerIconIsDisplayed
 * @description The function is used to verify if spinning icon is displayed with expected text.
 * @param {boolean} spinnerIconType Loading icon or progress indicator.
 * @param {string}  expectedText The text to be verified when loading appeared.
 * @example CommonPageObjectsForPA3.verifyIfSpinnerIconIsDisplayed('loading icon', 'Saving factor grouping...');;
 * @return NA
 */
CommonPageObjectsForPA3.prototype.verifyIfSpinnerIconIsDisplayed = function(spinnerIconType, expectedText) {

  if (spinnerIconType === true || spinnerIconType.toLowerCase() === 'loading icon') {
    it('Verify if the loading icon appears', function() {
      ThiefHelpers.getLoadingIconClassReference().getProgress().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    if (expectedText !== undefined) {
      it('Verify if "' + expectedText + '" is displayed along with loading icon', function() {
        ThiefHelpers.getLoadingIconClassReference().getContent().getText().then(function(text) {
          if (text !== expectedText) {
            expect(false).customError('Expected: "' + expectedText + '" but Found: "' + text + '".');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    }
  } else if (spinnerIconType.toLowerCase() === 'progress indicator') {
    it('Verify if the loading icon appears', function() {
      ThiefHelpers.getProgressIndicatorClassReference().getProgress().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    if (expectedText !== undefined) {
      it('Verify if "' + expectedText + '" is displayed along with loading icon', function() {
        element(by.xpath('//*[@data-qa-class="loading spinner"]//*[contains(@class, "spinner-message")]')).getText().then(function(text) {
          if (text !== expectedText) {
            expect(false).customError('Expected: "' + expectedText + '" but Found: "' + text + '".');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    }
  }

  it('Enabling wait for angular', function() {
    browser.ignoreSynchronization = false;
  });
};

/**
 * @function clickOnSaveOrCancelOrOKButtonAndVerify
 * @description The function is used to click on the button of the dialog and verify if the dialog is closed.
 * @param {string} buttonName Name of the button(Ex: Save, Cancel, Ok).
 * @param {string} dialogTitle Dialog title
 * @param {number} [referenceNumber=1] use this variable when you find multiple references with same XPATH
 * @param {string} [xpathDialog]  If dialog is not wrapped using "//tf-dialog" tag then you can pass
 *                      customized XPATH which gets the reference of dialog box. Otherwise you can leave it.
 * @param {boolean} [shouldLogError] Set this variable to TRUE if you want to log error when element did not appear on screen within 10 seconds
 * @param {boolean} [loadingIcon] Set this variable to TRUE if you want to verify if loading icon appeared.
 * @param {string}  expectedText The text to be verifyed when loading appeared.
 * @example CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Edit Groupings');;
 * @return NA
 */
CommonPageObjectsForPA3.prototype.clickOnSaveOrCancelOrOKButtonAndVerify = function(buttonName, dialogTitle, referenceNumber, xpathDialog, shouldLogError, loadingIcon, expectedText) {

  if (loadingIcon !== undefined) {
    it('Disabling wait for angular', function() {
      browser.ignoreSynchronization = true;
    });
  }

  it('Click on "' + buttonName + '" button in "' + dialogTitle + '" dialog box', function() {
    var ref = element.all(by.xpath('//tf-dialog//tf-button[normalize-space(.)="' + buttonName + '"]')).last();
    ThiefHelpers.getButtonClassReference(buttonName, ref).press().then(function() {
    }, function() {

      expect(false).customError('Unable to click on "' + buttonName + '" button.');
      CommonFunctions.takeScreenShot();
    });
  });

  if (loadingIcon !== undefined) {
    this.verifyIfSpinnerIconIsDisplayed(loadingIcon, expectedText);
  }

  it('Verifying if "' + dialogTitle + '" dialog is closed', function() {
    ThiefHelpers.isDialogOpen(dialogTitle, referenceNumber, xpathDialog, shouldLogError).then(function(dialogStatus) {
      if (dialogStatus) {
        expect(false).customError('"' + dialogTitle + '" dialog is still open.');
        CommonFunctions.takeScreenShot();
      }
    });
  });
};

/**
 * @function clickOnFactorGroupWrenchIconAndSelectOption
 * @description The function is used to click on the wrench icon next to Factor Grouping Drop-down and select the options from menu.
 * @param {string} optionName Name of the option Ex: Remove, Edit, Duplicate
 * @example CommonPageObjectsForPA3.clickOnFactorGroupWrenchIconAndSelectOption('Remove');;
 * @return NA
 */

CommonPageObjectsForPA3.prototype.clickOnFactorGroupWrenchIconAndSelectOption = function(optionName) {
  it('Click on the wrench icon next to Factor Grouping dropdown', function() {
    var ref = element(by.xpath('//tf-transferbox-options//tf-actions'));
    ThiefHelpers.getActionsClassReference(ref).triggerAction('tools').then(function() {
    }, function(err) {
    });
  });

  it('Verifying if Wrench menu list appeared after clicking on "Wrench" icon ', function() {
    ThiefHelpers.isDropDownOpen().then(function(appeared) {
      if (!appeared) {
        expect(false).customError('Menu list did not appear after clicking on "Wrench" icon');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Should select "' + optionName + '" from the wrench menu list', function() {
    ThiefHelpers.getMenuClassReference().selectItemByText(optionName).then(function() {
    }, function(err) {

      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });
  });
};

/**
 * @function clickOnAddGroupAndCreateNewGroup
 * @description The function is used to click on "+ Group" button and enter the required name and verify if the group is present in Factor Grouping dialog.
 * @param {string} groupName Name of the group(Ex: Save, Cancel, Ok).
 * @example CommonPageObjectsForPA3.clickOnAddGroupAndCreateNewGroup('Group A');
 * @return NA
 */

CommonPageObjectsForPA3.prototype.clickOnAddGroupAndCreateNewGroup = function(groupName) {
  it('Should click "Group" button from the "Create New Factor Grouping" dialog', function() {
    ThiefHelpers.getButtonClassReference(undefined, CreateNewFactorGrouping.xpathGroupButton).press().then(function() {
    }, function(err) {

      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });
  });

  it('Verifying if "Create Box" Drop down is opened', function() {
    ThiefHelpers.isDropDownOpen().then(function(appeared) {
      if (!appeared) {
        expect(false).customError('"Create Box" Drop down is not opened');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Should type "' + groupName + '" in the "Group Name" text box and clicking on "+Create" button', function() {
    ThiefHelpers.getTextBoxClassReference(undefined, CreateNewFactorGrouping.xpathGroupNameTextBox).setText(groupName);

    // Thief helpers will hit enter internally which hits the create button. Hence no need of clicking on the button again
  });

  it('Verifying if "' + groupName + '" grouping is displayed in "Edit Grouping" list box of "Create New Factor Grouping" dialog', function() {
    CreateNewFactorGrouping.getElementFromEditGrouping(false, groupName, true).isPresent().then(function(found) {
      if (!found) {
        expect(false).customError('"' + groupName + '" grouping is not displayed in "Create New Factor Grouping" dialog');
        CommonFunctions.takeScreenShot();
      }
    });
  });
};

/**
 * @function expandGroup
 * @description The function is used to expand required groups.
 * @param {string} parentElementPath Path of the tree to be expanded Ex: Unsubscribed Risk Models|APT
 * @param {string} excludeElements elements to be excluded
 * @example CommonPageObjectsForPA3.expandGroup('FactSet|Risk|Standard', 'FactSet|Risk');
 * @return NA
 */

CommonPageObjectsForPA3.prototype.expandGroup = function(parentElementPath, excludeElements) {
  it('Expand "' + parentElementPath + '" from the drop down', function() {
    CreateNewFactorGrouping.expandElementTreeInDropDown(parentElementPath, excludeElements);
  });
};

/**
 * @function clickOnAddHighLow
 * @description The function is used to click on "+ High/Low" button and verify if it is added at the bottom.
 * @example  CommonPageObjectsForPA3.clickOnAddHighLow();
 * @return NA
 */

CommonPageObjectsForPA3.prototype.clickOnAddHighLow = function() {
  it('Should click "High/Low Group" button from the "Create New Factor Grouping" dialog', function() {
    ThiefHelpers.getButtonClassReference(undefined, CreateNewFactorGrouping.xpathHighLowGroup).press().then(function() {
    }, function(err) {

      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });
  });

  it('Verifying if "High/Low (No Column Selected)" is added at bottom of the list', function() {
    CreateNewFactorGrouping.getAllElementsFromEditGrouping().then(function(elements) {
      elements[elements.length - 1].getText().then(function(val) {
        if (val !== 'High/Low (No Column Selected)') {
          expect(false).customError('High/Low (No Column Selected) is not added at the bottom of the list');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
};

/**
 * @function selectHighLowGroupInAvailableSectionAndClickOnColumnDropdown
 * @description The function is used to click on "High/Low" group present at the button and click on the column drop-down.
 * @example  CommonPageObjectsForPA3.selectHighLowGroupInAvailableSectionAndClickOnColumnDropdown();
 * @return NA
 */
CommonPageObjectsForPA3.prototype.selectHighLowGroupInAvailableSectionAndClickOnColumnDropdown = function() {

  it('Select from the "High/Low (No Column Selected)" Edit Grouping container', function() {
    ThiefHelpers.getListboxClassReference(CreateNewFactorGrouping.xpathEditGroupingContainer).getGroupByText('High/Low (No Column Selected)').select();
  });

  it('Should click "Column" drop down from the "Create New Factor Grouping" dialog', function() {
    CreateNewFactorGrouping.getComboBoxDropDown('Column').click().then(function() {
    }, function(err) {

      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });

    // Verifying if drop down opened
    ThiefHelpers.isDropDownOpen().then(function(isOpen) {
      if (!isOpen) {
        expect(false).customError('"Column" drop down is not opened');
        CommonFunctions.takeScreenShot();
      }
    });
  });
};

/**
 * @function clickOnAddHighLowAndSelectOptionFromColumnDropdown
 * @description The function is used to click on "High/Low" group present at the button and click on the column drop-down, expand the groups and select required option.
 * @param {boolean} clickOnHighLow True when want to click.
 * @param {string} parentElementPath Path of the tree to be expanded.
 * @param {string} excludeElements elements to be excluded.
 * @param {string} optionName Name of the option to be selected.
 * @example  CommonPageObjectsForPA3.clickOnAddHighLowAndSelectOptionFromColumnDropdown(undefined, 'FactSet|Risk|Standard|Asset Data', 'FactSet|Risk|Standard', 'Raw Factor Exposure');
 * @return NA
 */
CommonPageObjectsForPA3.prototype.clickOnAddHighLowAndSelectOptionFromColumnDropdown = function(clickOnHighLow, parentElementPath, excludeElements, optionName) {

  if (clickOnHighLow !== undefined) {
    this.clickOnAddHighLow();
    this.selectHighLowGroupInAvailableSectionAndClickOnColumnDropdown();
  }

  this.expandGroup(parentElementPath, excludeElements);

  if (optionName !== undefined) {
    it('Should click "' + parentElementPath + ' > ' + optionName + '" from the dropdown', function() {
      CreateNewFactorGrouping.getElementFromDropDown(parentElementPath, optionName).click();
    });

    it('Verifying if "' + optionName + '" is selected from the drop down', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateNewFactorGrouping.getComboTextBox('Column')).getText().then(function(val) {
        if (val !== optionName) {
          expect(false).customError('"' + optionName + '" is not selected from the drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  }
};

/*********************************************************************************************************************/
/*                                           File Dialog                                                             */
/*********************************************************************************************************************/

/**
 * @function clickOnTheFolderIconAndSelectRequiredOption
 * @description The function is used to click on "Folder" icon and select the required option from the drop-down.
 * @param {boolean} optionName Name of the option to be selected(EX: Open..., New).
 * @example  CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Open...');
 * @return NA
 */
CommonPageObjectsForPA3.prototype.clickOnTheFolderIconAndSelectRequiredOption = function(optionName) {

  it('Should click on the "Folder" icon from the application toolbar', function() {
    ThiefHelpers.getButtonClassReference(undefined, '//*[@data-qa-id="document-menu"]').press().then(function() {
    }, function() {

      expect(false).customError('Unable to click on "Folder" icon.');
      CommonFunctions.takeScreenShot();
    });
  });

  it('Verifying if Wrench menu list appeared after clicking on ', function() {
    ThiefHelpers.isDropDownOpen().then(function(appeared) {
      if (!appeared) {
        expect(false).customError('Menu list did not appear.');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Should select "' + optionName + '" from the wrench menu list', function() {
    ThiefHelpers.getMenuClassReference().selectItemByText(optionName).then(function() {
    }, function(err) {

      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });
  });
};

/**
 * @function verifyIfDocumentIsDisplayed
 * @description The function is used to verify if expected document is present or not.
 * @param {String} documentName Name with which document (Ex: 'Buy_Hold_Test').
 * @param {boolean} present Pass True if you want to verify if document is present else pass false.
 * @example  CommonPageObjectsForPA3.verifyIfDocumentIsDisplayed(fullName, true);
 * @return NA
 */

CommonPageObjectsForPA3.prototype.verifyIfDocumentIsDisplayed = function(rowName, present) {

  // Adding wait time to wait for the grid to load
  browser.sleep(3000);

  browser.driver.executeScript(function() {
    var slickObject;

    slickObject = $('.udms-file-grid').data('grid');

    var rowlength = slickObject.getDataLength();
    var row = [];
    for (var i = 0; i < rowlength; i++) {
      row.push(slickObject.getDataItem(i).title);
    }

    return row;
  }).then(function(rowValue) {

    var documentNamesArray = [];

    // Getting index of required row.
    rowValue.forEach(function(row, index) {
      row = row.replace('<i sort=\'b\' class=\'icon-document\'></i>&nbsp&nbsp', '');

      // Some rows has amp; bydefault in document name
      if (row.indexOf('amp;') >= 0) {
        row = row.replace('amp;', '');
      }

      documentNamesArray.push(row);
    });

    if (present) {
      if (documentNamesArray.indexOf(rowName) === -1) {
        expect(false).customError('"' + rowName + '" is not displayed.');
        CommonFunctions.takeScreenShot();
      }
    } else {
      if (documentNamesArray.indexOf(rowName) > 0) {
        expect(false).customError('"' + rowName + '" is still displayed.');
        CommonFunctions.takeScreenShot();
      }
    }

  });
};

/**
 * @function selectPersonalAndEnterDocumentNameInSaveAsDialog
 * @description The function is used to save the document with required name.
 * @param {String} documentName Name with which document has to be saved (Ex: 'Buy_Hold_Test').
 * @param {String} dateFormat Format f the date to be appended to the document name.
 * @param {boolean} warningStatus Pass True if you want to replace the with the existing document.
 * @example  CommonPageObjectsForPA3.selectPersonalAndEnterDocumentNameInSaveAsDialog(`Georev Grouping`,undefined, true);;
 * @return NA
 */
CommonPageObjectsForPA3.prototype.selectPersonalAndEnterDocumentNameInSaveAsDialog = function(documentName, dateFormat, warningStatus) {
  var _this = this;
  if (warningStatus === undefined) {
    warningStatus = false;
  }

  it('Verifying that "Save Document As" dialog box appears', function() {
    ThiefHelpers.isDialogOpen('Save Document As').then(function(bool) {
      if (!bool) {
        expect(false).customError('"Save Document As" dialog does not open.');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Should select "PERSONAL" group is if not selected', function() {
    ThiefHelpers.getListboxGroup(undefined, 'Personal').isSelected().then(function(selected) {
      if (!selected) {
        ThiefHelpers.getListboxGroup(undefined, 'Personal').select();
      }
    });
  });

  var xpathOfTextBox = '//*[@data-qa-id="file-textbox"]';

  it('Should enter "' + documentName + '" into the "File" text area', function() {
    var fullName;
    if (dateFormat !== undefined) {
      var currentDate;
      Utilities.getCurrentDate(dateFormat, '', true).then(function(val) {
        currentDate = val;
      }).then(function() {
        fullName = documentName + currentDate;
        element(by.xpath(xpathOfTextBox)).sendKeys(documentName + currentDate);
      });
    } else {

      // var p = String(documentName);
      // console.log(p.toUpperCase());
      fullName = documentName;
      element(by.xpath(xpathOfTextBox)).sendKeys(documentName);
    }

    // Verifying that "Formula" text area contains "documentName"
    element(by.xpath(xpathOfTextBox)).getAttribute('value').then(function(text) {
      if (text !== fullName) {
        expect(false).customError('Expected "' + fullName + '" but Found: "' + text + '".');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Click "Save" on the "Save Document As" dialog', function() {
    ThiefHelpers.getDialogButton('Save Document As', 'Save').click().then(function() {
    }, function(err) {

      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });
  });

  if (warningStatus) {
    it('Verifying that "Warning" dialog box appears', function() {
      ThiefHelpers.isDialogOpen('Warning').then(function(bool) {
        if (!bool) {
          expect(true).toBeTruthy();
        } else {
          ThiefHelpers.getDialogButton('Warning', 'OK').click().then(function() {
          }, function(err) {

            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Discard changes if auto recovery popup appears', function() {
      var name = String(documentName);
      var dialogName = 'PERSONAL:' + name.toUpperCase();
      ThiefHelpers.isDialogOpen(dialogName).then(function(found) {
        if (found) {
          PA3MainPage.editOrDiscardReportChanges('Discard Changes');
        }
      });
    });
  }

  it('Verifying that "Save Document As" dialog box disappears', function() {
    ThiefHelpers.isDialogOpen('Save Document As').then(function(bool) {
      if (bool) {
        expect(false).customError('"Save Document As" dialog os still open.');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  _this.clickOnTheFolderIconAndSelectRequiredOption('Open...');

  it('Verifying if document "' + documentName + '" is deleted', function() {
    if (dateFormat !== undefined) {
      var currentDate;
      Utilities.getCurrentDate(dateFormat, '', true).then(function(val) {
        currentDate = val;
      }).then(function() {

        // Add .toUpperCase() if you want the document name to be in upper case
        var fullName = documentName + currentDate;
        _this.verifyIfDocumentIsDisplayed(fullName, true);
      });
    } else {
      _this.verifyIfDocumentIsDisplayed(documentName, true);
    }
  });

  it('Click "Cancel" on the "Save Document As" dialog', function() {
    ThiefHelpers.getButtonClassReference('Cancel').press().then(function() { }, function() {

      expect(false).customError('Unable to click on "Cancel" button.');
      CommonFunctions.takeScreenShot();
    });
  });
};

/**
 * @function openRequiredDocumentFromPersonal
 * @description The function is used to open the required option from Personal directory.
 * @param {String} documentName Name of the document to be selected(EX: Buy_Hold_Test).
 * @example  CommonPageObjectsForPA3.openRequiredDocumentFromPersonal('Buy_Hold_Test');
 * @return NA
 */
CommonPageObjectsForPA3.prototype.openRequiredDocumentFromPersonal = function(documentName, dateFormat) {

  it('Verifying that "Open" dialog box appears', function() {
    ThiefHelpers.isDialogOpen('Open').then(function(bool) {
      if (!bool) {
        expect(false).customError('"Open" dialog does not open.');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Should select "PERSONAL" group if it is not selected', function() {
    ThiefHelpers.getListboxGroup(undefined, 'Personal').isSelected().then(function(selected) {
      if (!selected) {
        ThiefHelpers.getListboxGroup(undefined, 'Personal').select();
      }
    });
  });

  it('Should select the  document "' + documentName + '"', function() {
    if (dateFormat !== undefined) {
      var currentDate;
      Utilities.getCurrentDate(dateFormat, '', true).then(function(val) {
        currentDate = val;
      }).then(function() {

        // Add .toUpperCase() if you want the document name to be in upper case
        var fullName = documentName + currentDate;
        FileDialog.selectDataFromHtmlDialog(fullName);
      });
    } else {
      FileDialog.selectDataFromHtmlDialog(documentName);
    }

  });

  it('Should click on the "Open" button', function() {
    ThiefHelpers.getButtonClassReference('Open').press().then(function() {
      // Waiting till document open
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();

      ThiefHelpers.isDialogOpen(undefined, undefined, '//tf-dialog').then(function(found) {
        if (!found) {
          // Close QA Info Box if it is found
          PA3MainPage.closeQAInfoBox();
        }
      });
    }, function() {

      expect(false).customError('Unable to click on "open" button.');
      CommonFunctions.takeScreenShot();
    });
  });
};

/**
 * @function saveChanges
 * @description The function is used to save the required chnages.
 * @example  CommonPageObjectsForPA3.saveChanges();
 * @return NA
 */
CommonPageObjectsForPA3.prototype.saveChanges = function() {

  let _this = this;

  it('Verifying that "Document has changed" dialog box appears', function() {
    element(by.xpath(_this.xpathOfDocumentHasChangedDialog)).isPresent().then(function(present) {
      if (!present) {
        expect(false).customError('"Document has changed" dialog box has not appeared.');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Click "Save Changes" on the "Document has changed" dialog', function() {
    element(by.xpath(CommonFunctions.replaceStringInXpath(_this.xpathOfButtonOfDocumentHasChangedDialog, 'Save Changes'))).click().then(function() {
    }, function(err) {

      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });
  });

  it('Verifying that "Document has changed" dialog box disappears', function() {
    element(by.xpath(_this.xpathOfDocumentHasChangedDialog)).isPresent().then(function(present) {
      if (present) {
        expect(false).customError('"Document has changed" dialog is still displayed.');
        CommonFunctions.takeScreenShot();
      }
    });
  });
};

/**
 * @function deleteRequiredDocumentFromPersonalDirectory
 * @description The function is used to delete the required document from Personal directory.
 * @param {String} documentName Name of the document to be selected(EX: Buy_Hold_Test).
 * @example  CommonPageObjectsForPA3.openRequiredDocumentFromPersonal('Buy_Hold_Test');
 * @return NA
 */
CommonPageObjectsForPA3.prototype.deleteRequiredDocumentFromPersonalDirectory = function(documentName, dateFormat) {
  var _this = this;

  it('Verifying that "Delete" dialog box appears', function() {
    ThiefHelpers.isDialogOpen('Delete').then(function(bool) {
      if (!bool) {
        expect(false).customError('"Delete" dialog does not open.');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Should select "PERSONAL" group is not selected', function() {
    ThiefHelpers.getListboxGroup(undefined, 'Personal').isSelected().then(function(selected) {
      if (!selected) {
        ThiefHelpers.getListboxGroup(undefined, 'Personal').select();
      }
    });
  });

  it('Wait for dialog box to load', function() {
    // Waiting till document open
    expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
  });

  it('Should select the  document "' + documentName + '"', function() {
    if (dateFormat !== undefined) {
      var currentDate;
      Utilities.getCurrentDate(dateFormat, '', true).then(function(val) {
        currentDate = val;
      }).then(function() {

        // Add .toUpperCase() if you want the document name to be in upper case
        var fullName = documentName + currentDate;
        FileDialog.selectDataFromHtmlDialog(fullName);
      });
    } else {
      FileDialog.selectDataFromHtmlDialog(documentName);
    }
  });

  it('Should click on the "Delete" button', function() {
    ThiefHelpers.getButtonClassReference('Delete').press().then(function() {
    }, function() {

      expect(false).customError('Unable to click on "Delete" button.');
      CommonFunctions.takeScreenShot();
    });
  });

  it('Verifying that "Confirm File Delete" dialog box appears', function() {
    ThiefHelpers.isDialogOpen('Confirm File Delete').then(function(bool) {
      if (!bool) {
        expect(false).customError('"Confirm File Delete" dialog does not open.');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Should click on the "Ok" icon in "Confirm File Delete" dialog box', function() {
    ThiefHelpers.getButtonClassReference('OK').press().then(function() { }, function() {

      expect(false).customError('Unable to click on "OK" button.');
      CommonFunctions.takeScreenShot();
    });
  });

  _this.clickOnTheFolderIconAndSelectRequiredOption('Delete…');

  it('Verifying if document "' + documentName + '" is deleted', function() {
    if (dateFormat !== undefined) {
      var currentDate;
      Utilities.getCurrentDate(dateFormat, '', true).then(function(val) {
        currentDate = val;
      }).then(function() {
        // Add .toUpperCase() if you want the document name to be in upper case
        var fullName = documentName + currentDate;
        _this.verifyIfDocumentIsDisplayed(fullName, false);
      });
    } else {
      _this.verifyIfDocumentIsDisplayed(documentName, false);
    }
  });

  it('Click "Cancel" on the "Save Document As" dialog', function() {
    ThiefHelpers.getButtonClassReference('Cancel').press().then(function() { }, function() {

      expect(false).customError('Unable to click on "Cancel" button.');
      CommonFunctions.takeScreenShot();
    });
  });

};

/*********************************************************************************************************************/
/*                                           LHP Options(NavePane)                                                   */
/*********************************************************************************************************************/

/**
 * @function selectOrVerifyTheStatusOfLHPItem
 * @description The function is used to select the item from Navepane and also to verify the status of the item.
 * @param {string} sectionName Name of the section.
 * @param {string} groupName Name of the group.
 * @param {string} optionName Name of the required option.
 * @param {string} Should Pass "true" if you want to select item.
 * @param {string} statusOfItem Pass "is Selected" to verify if item is selected.
 * @example CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'RBPA', 'RBPA_ExpandCombination', true, 'isSelected');
 * @return NA
 */
CommonPageObjectsForPA3.prototype.selectOrVerifyTheStatusOfLHPItem = function(sectionName, groupName, optionName, select, statusOfItem) {
  if (select !== undefined) {
    it('Should click on "' + optionName + '" report from LHP to select', function() {
      ThiefHelpers.getNavepaneItemReference(sectionName, groupName, optionName).then(function(eleRef) {
        eleRef.click().then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });
  }

  it('Verifying if "' + optionName + ' ' + statusOfItem + '" in the LHP', function() {
    ThiefHelpers.getNavepaneItemReference(sectionName, groupName, optionName).then(function(eleRef) {
      eleRef.getAttribute('class').then(function(elementStatus) {
        if (statusOfItem === 'isSelected') {
          if (elementStatus.indexOf('selected') === -1) {
            expect(false).customError('"' + optionName + '" is not selected from LHP.');
            CommonFunctions.takeScreenShot();
          }
        } else {
          if (elementStatus.indexOf('selected') !== -1) {
            expect(false).customError('"' + optionName + '" is selected from LHP.');
            CommonFunctions.takeScreenShot();
          }
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });
  });
};

/*********************************************************************************************************************/
/*                                          Identifier - LookUp                                                      */
/*********************************************************************************************************************/

/**
 * @function OpenDirectoryAndSelectAccountFromIdentifierLookup
 * @description This function is used to open the required document from Identifier look up.
 * @param {string} directoryName Name of the directory (Ex: Client, Personal).
 * @param {string} documentPath Path of the document which has to be open (Ex: Client:;TEST).
 * @param {string} elementName Name of the required account(Ex: Account (ACCT)).
 * @param {string} buttonName Name of the button(Ex: Ok, Cancel).
 * @param {string} addAsComposite Pass "true" if you want to add the item.
 * @example CommonPageObjectsForPA3.OpenDocumentFromIdentifierLookup('Client', 'Client:;TEST', 'Account (ACCT)', 'OK', true);
 * @return NA
 */
CommonPageObjectsForPA3.prototype.OpenDirectoryAndSelectAccountFromIdentifierLookup = function(directoryName, documentPath, elementName, buttonName, addAsComposite) {

  // Variable
  var arrFilePath = [];
  var _this = this;
  var arrPathName;

  CommonFunctions.waitUntilElementAppears(FileDialog.getDirectory(directoryName));

  // NOTE: Last name in the complete path is the actual document to be selected
  // If "/" symbol is present in the documentPath then splitting on the basis of "/" symbol
  if (documentPath.indexOf('/') >= 0 || documentPath.indexOf(';') >= 0) {
    // Get each directory name separated by "/" or ";" symbol
    arrPathName = documentPath.split(/[\/;]/);
  } else {

    // If "/" symbol is not present in the documentPath then splitting on the basis of ":" symbol
    // Get each directory name separated by ":" symbol
    arrPathName = documentPath.split(':');
  }

  // Remove ":" from directory names, if exists
  for (var i = 0; i < arrPathName.length; i++) {
    // Replacing the : from the text
    arrPathName[i] = arrPathName[i].replace(':', '');

    // Storing all text in one array
    arrFilePath.push(arrPathName[i]);
  }

  // Fetching document name that need to be selected from Grid (RHP)
  var documentName = arrFilePath.splice(arrFilePath.length - 1, 1);

  // Joining all directories in document path by "|" character
  var tempDocumentPath = arrFilePath.join('|');

  if (arrFilePath.length > 1) {
    // Expanding the directory on the basis of passing element
    FileDialog.expandTree(tempDocumentPath);
  } else {
    FileDialog.getDirectory(tempDocumentPath).click().then(function() {
    }, function(error) {

      expect(false).customError('Unable to select directory from lhp, Error: ' + error);
      CommonFunctions.takeScreenShot();
    });
  }

  // Waiting till document name load
  CommonFunctions.waitUntilElementDisappears(FileDialog.getLoadingIconFromHtmlDialog(), 80000);

  if (elementName !== undefined) {
    _this.selectAccountFromIdentifierLookup(documentName[0], elementName);

    if (addAsComposite === true) {
      element(by.xpath('//tf-button[normalize-space(.)="Add as Composite"]')).click();
    }

    element(by.xpath('//*[@data-qa-id="il-dialog-controls"]//tf-button[normalize-space(.)="' + buttonName + '"]')).click();
  } else {
    // Selecting report from the Html dialog
    FileDialog.selectDataFromHtmlDialog(documentName[0]);

    // Clicking on the 'Open' button to open the document
    FileDialog.getButton('Open').click().then(function() {
    }, function(error) {

      expect(false).customError('Unable to perform click on Open button, Error: ' + error);
      CommonFunctions.takeScreenShot();
    });
  }
};

/**
 * @function selectAccountFromIdentifierLookup
 * @description This function is used to select the required account under type from Identifier look up.
 * @param {string} rowName Name of the row.
 * @param {string} elementName Name of the account to be selected under "Type".
 * @example CommonPageObjectsForPA3.OpenDocumentFromIdentifierLookup('Client', 'Client:;TEST', 'Account (ACCT)', 'OK', true);
 * @return NA
 */
CommonPageObjectsForPA3.prototype.selectAccountFromIdentifierLookup = function(rowName, elementName) {

  browser.driver.executeScript(function() {
    var slickObject;

    slickObject = $('.udms-file-grid').data('grid');

    var rowlength = slickObject.getDataLength();
    var row = [];
    for (var i = 0; i < rowlength; i++) {
      row.push(slickObject.getDataItem(i).title);
    }

    return row;
  }).then(function(rowValue) {
    // Getting index of required row.
    rowValue.forEach(function(row, index) {
      row = row.replace('<i sort=\'b\' class=\'icon-document\'></i>&nbsp&nbsp', '');

      // Some rows has amp; bydefault in document name
      if (row.indexOf('amp;') >= 0) {
        row = row.replace('amp;', '');
      }

      if (row === rowName) {
        browser.driver.executeScript(function() {
          var slickObject;
          slickObject = $('.udms-file-grid').data('grid');
          var rowlength = slickObject.getDataLength();
          var row = [];
          for (var i = 0; i < rowlength; i++) {
            row.push(slickObject.getDataItem(i).dftype);
          }

          return row;
        }).then(function(rowValues) {
          rowValues.forEach(function(rowValue, index1) {
            if (rowValue === elementName && index === index1) {
              if (row === rowName) {
                browser.driver.executeScript(function() {
                  var slickObject;
                  slickObject = $('.udms-file-grid').data('grid');
                  slickObject.scrollRowIntoView(arguments[0]);
                  slickObject.setActiveCell(arguments[0], 0);
                }, index1);
              }
            }
          });
        });
      }
    });
  });
};

/*********************************************************************************************************************/
/*                                           Portfolio/Benchmark verification                                        */
/*********************************************************************************************************************/

/**
 * @function verifyPortfolioOrBenchmarkWidgetValue
 * @description The function is used to verify the Benchmark/Portfolio widget values.
 * @param {string} widgetName Name of the widget.
 * @param {string} xpathPortfolioOrBenchmarkWidget xpath/reference of widget.
 * @param {string} expectedValue Value to be set in widget box.
 * @example CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Benchmark', PA3MainPage.xpathBenchmarkWidget, 'SPN:OEX')
 * @return NA
 */
CommonPageObjectsForPA3.prototype.verifyPortfolioOrBenchmarkWidgetValue = function(widgetName, xpathPortfolioOrBenchmarkWidget, expectedValue) {
  it('Verifying if "' + widgetName + '" widget is populated with "' + expectedValue + '"', function() {
    ThiefHelpers.getTextBoxClassReference('', xpathPortfolioOrBenchmarkWidget).getText().then(function(val) {
      if (val !== expectedValue) {
        expect(false).customError(widgetName + ' widget is not populated with "' + expectedValue + '", Found: ' + val);
        CommonFunctions.takeScreenShot();
      }
    }, function(err) {

      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });
  });
};

/**
 * @function selectOptionFromFolderAndVerifyDialogBoxOpened
 * @description The function is used to select option from folder menu and verify the dialog box opened.
 * @param {string} optionName Name of the menu item.
 * @param {string} dialogBoxTitle dialog box title, that should be verified.
 * @example CommonPageObjectsForPA3.selectOptionFromFolderAndVerifyDialogBoxOpened('Save As…','Save Document As')
 * @return NA
 */
CommonPageObjectsForPA3.prototype.selectOptionFromFolderAndVerifyDialogBoxOpened = function(optionName, dialogBoxTitle) {

  it('Should select "' + optionName + '" from the folder menu', function() {
    ThiefHelpers.getMenuClassReference().selectItemByText(optionName).then(function() {
    }, function() {

      expect(false).customError('Not able to select "' + optionName + '" option from folder menu');
      CommonFunctions.takeScreenShot();
    });
  });

  it('Verifying if "' + dialogBoxTitle + '" dialog is opened', function() {
    // Verifying if dialog box is appeared with title
    ThiefHelpers.isDialogOpen(dialogBoxTitle).then(function(found) {
      if (!found) {
        expect(false).customError('"' + dialogBoxTitle + '" dialog is not opened');
        CommonFunctions.takeScreenShot();
      }
    });
  });
};

/**
 * @function selectDirectoryAndSubDirectoryAndVerify
 * @description The function is used to select directory and sub-directory from stress tests dialog box.
 * @param {string} directoryName Name of the directory.
 * @param {string} subDirectoryName Name of sub-directory.
 * @example CommonPageObjectsForPA3.selectDirectoryAndSubDirectoryAndVerify('Personal','Personal')
 * @return NA
 */
CommonPageObjectsForPA3.prototype.selectDirectoryAndSubDirectoryAndVerify = function(directoryName, subDirectoryName) {
  if (directoryName !== undefined) {
    it('Should select "' + directoryName + '" from the "Directory" section', function() {
      ThiefHelpers.getRadioClassReference(directoryName).select();

      // Verifying if mentioned directory is selected under "Directory"
      ThiefHelpers.getRadioClassReference(directoryName).isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"' + directoryName + '" radio button is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  }

  it('Should select "' + subDirectoryName + '" from "Sub-directory:" drop down and verify', function() {
    ThiefHelpers.selectOptionFromDropDown(subDirectoryName, 'Sub-directory:');

    // Verifying if drop down is set to mentioned sub-directory
    ThiefHelpers.verifySelectedDropDownText(subDirectoryName, 'Sub-directory:');
  });
};

/**
 * @function clearAndEnterTextInDateTextBox
 * @description The function is used to clear the text box and enter the text.
 * @param {string} dateWidgetName Name of the Widget.
 * @param {string} setTo Text to be entered.
 * @example CommonPageObjectsForPA3.clearAndEnterTextInDateTextBox('End Date:', '-100D');
 * @return NA
 */
CommonPageObjectsForPA3.prototype.clearAndEnterTextInDateTextBox = function(dateWidgetName, setTo) {
  var xpath;
  if (dateWidgetName.toLocaleLowerCase().indexOf('end date') !== -1) {
    xpath = TileOptionsDates.xpathEndDateTextBox;
  }else {
    xpath = TileOptionsDates.xpathStartDateTextBox;
  }

  it('Should enter "' + setTo + '" from End Date text box', function() {
    element(by.xpath(xpath + '//input')).sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE));
    ThiefHelpers.getTextBoxClassReference(dateWidgetName).setText(setTo);

    browser.sleep(1000);

    // Verifying text box is set to correct text
    ThiefHelpers.getTextBoxClassReference(dateWidgetName).getText().then(function(value) {
      if (value !== setTo) {
        expect(false).customError('"' + dateWidgetName + '" text box did not contain "' + setTo + '", Found: ' + value);
        CommonFunctions.takeScreenShot();
      }
    });
  });
};

/**
 * @function rightClickAndSelectAuditValue
 * @param {string} tileName Name of the tile in which this particular grid/report exists.
 * @param {string} rowName Name of the row where this particular cell exists.
 * @param {string} rowColumnName Column name of given row name.
 * @param {string} colName Name of the column in which this particular cell exists.
 * @param {string} multiHeaderName Name of the multi-header under which this particular cell exists.
 * @param {string} elementPath Element Names which has to be expanded. If multiple element has to be expanded pass
 *                              their names separated by "|" symbol.
 * @example CommonPageObjectsForPA3.rightClickAndSelectAuditValue('Weights','Communication','','Port. Contribution To Return')
 * @return NA
 */
CommonPageObjectsForPA3.prototype.rightClickAndSelectAuditValue = function(tileName, rowName, rowColumnName, colName, multiHeaderName, elementPath) {

  it('Should right click on "' + rowName + '" group value from "' + colName + '" column and select "Audit Value"', function() {
    SlickGridFunctions.getCellReference(tileName, rowName, rowColumnName, colName, multiHeaderName, elementPath).then(function(reference) {
      PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
    });
  });

  it('Should Wait for "Audit" report to calculate', function() {
    Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
  });

  it('Verifying if "Audit Mode" page is opened', function() {
    AuditMode.isAuditMode().then(function(flag) {
      if (!flag) {
        expect(false).customError('"Audit Mode" page did not open');
        CommonFunctions.takeScreenShot();
      }
    });
  });
};

/**
 * @function expandDocumentDirectoriesInFileDialog
 * @param {string} directoryPath Element Names which has to be expanded. If multiple element has to be expanded pass
 *                              their names separated by "|" symbol.
 * @param {string} directoryToCheckStatus Directory name to check its selected status(optional).
 * @example CommonPageObjectsForPA3.expandDocumentDirectoriesInFileDialog('Client|Pa3', 'Risk')
 * @return NA
 */
CommonPageObjectsForPA3.prototype.expandDocumentDirectoriesInFileDialog = function(directoryPath, directoryToCheckStatus) {
  var elements = directoryPath.split('|');
  var expandElement = '//*[@data-qa-id="lefthand-pane"]';

  for (var i = 0; i < elements.length; i++) {
    console.log(i  + ' - ' + elements.length);
    expandElement += '//tf-listbox-item-handle//*[normalize-space(.)="' + elements[i] + '"]/ancestor::' +
      'tf-listbox-item[1]/tf-listbox-item-handle//*[contains(@class,"icon-tree")]';

    // Make the element visible before expanding
    CommonFunctions.scrollElementToVisibility(element(by.xpath(expandElement)));
    CommonFunctions.waitUntilElementAppears(element(by.xpath(expandElement)));

    element.all(by.xpath(expandElement)).first().click();

    if (directoryToCheckStatus !== undefined) {
      console.log(i);
      if (i === (elements.length - 1)) {
        console.log(i);
        expandElement += '/ancestor::tf-listbox-item[1]//tf-listbox-item-handle//*[normalize-space(.)=' +
          '"' + directoryToCheckStatus + '"]/ancestor::' + 'tf-listbox-item[1]/tf-listbox-item-handle//*[contains(@class,"icon-tree")]';
        CommonFunctions.scrollElementToVisibility(element(by.xpath(expandElement)));
      }
    }

    expandElement += '/ancestor::tf-listbox-item[1]';
  }

  if (directoryToCheckStatus !== undefined) {
    element(by.xpath(expandElement)).getAttribute('class').then(function(value) {
      console.log(value);
      if (value.indexOf('selected') === -1) {
        expect(false).customError('"' + directoryToCheckStatus + '" is not selected');
        CommonFunctions.takeScreenShot();
      }
    });
  }
};

/**
 * @function expandDocumentDirectoriesInFileDialog
 * @param {string} directoryPath Element Names which has to be expanded. If multiple element has to be expanded pass
 *                              their names separated by "|" symbol.
 * @param {string} directoryToCheckStatus Directory name to check its selected status(optional).
 * @example CommonPageObjectsForPA3.expandDocumentDirectoriesInFileDialog('Client|Pa3', 'Risk')
 * @return NA
 */
CommonPageObjectsForPA3.prototype.expandDocumentDirectoriesInFileDialog = function(directoryPath, directoryToCheckStatus) {
  var elements = directoryPath.split('|');
  var expandElement = '//*[@data-qa-id="lefthand-pane"]';

  for (var i = 0; i < elements.length; i++) {
    console.log(i  + ' - ' + elements.length);
    expandElement += '//tf-listbox-item-handle//*[normalize-space(.)="' + elements[i] + '"]/ancestor::' +
      'tf-listbox-item[1]/tf-listbox-item-handle//*[contains(@class,"icon-tree")]';

    // Make the element visible before expanding
    CommonFunctions.scrollElementToVisibility(element(by.xpath(expandElement)));
    CommonFunctions.waitUntilElementAppears(element(by.xpath(expandElement)));

    element.all(by.xpath(expandElement)).first().click();

    if (directoryToCheckStatus !== undefined) {
      console.log(i);
      if (i === (elements.length - 1)) {
        console.log(i);
        expandElement += '/ancestor::tf-listbox-item[1]//tf-listbox-item-handle//*[normalize-space(.)=' +
          '"' + directoryToCheckStatus + '"]/ancestor::' + 'tf-listbox-item[1]/tf-listbox-item-handle//*[contains(@class,"icon-tree")]';
        CommonFunctions.scrollElementToVisibility(element(by.xpath(expandElement)));
      }
    }

    expandElement += '/ancestor::tf-listbox-item[1]';
  }

  if (directoryToCheckStatus !== undefined) {
    element(by.xpath(expandElement)).getAttribute('class').then(function(value) {
      console.log(value);
      if (value.indexOf('selected') === -1) {
        expect(false).customError('"' + directoryToCheckStatus + '" is not selected');
        CommonFunctions.takeScreenShot();
      }
    });
  }
};

/**
 * @function clickFolderIconAndAddNewCategory
 * @param {string} categoryName Name of the category to be created
 * @param {string} directory Directory name under which the category to be created.
 * @param {string} subDirectory Sub-directory name under which the category to be created.
 * @param {string} xpathOfFolderIcon Xpath pf folder Icon.
 * @example CommonPageObjectsForPA3.clickFolderIconAndAddNewCategory('Dir_2', 'Personal', 'Personal/Dir_1', TileOptionsRiskStressTests.xpathTransferBox)
 * @return NA
 */
CommonPageObjectsForPA3.prototype.clickFolderIconAndAddNewCategory = function(categoryName, directory, subDirectory, xpathOfFolderIcon) {
  var _this = this;

  it('Should click on folder icon from available section', function() {
    ThiefHelpers.getTransferBoxReference(xpathOfFolderIcon).source.groups();
  });

  it('Should verify if "Add New Category" dialog opened', function() {
    ThiefHelpers.isDialogOpen('Add New Category', undefined, undefined).then(function(bool) {
      if (!bool) {
        expect(false).customError('"Add New Category" dialog is not opened');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  it('Should enter "' + categoryName + '" in the "Category Name" field.', function() {
    ThiefHelpers.getTextBoxClassReference('Category Name:').setText(categoryName);

    // Verifying that categoryName is typed into the input box
    ThiefHelpers.getTextBoxClassReference('Category Name:').getText().then(function(text) {
      if (text !== categoryName) {
        expect(false).customError('"' + categoryName + '" is not typed into the "Category Name" field.');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  // Should select directory radio button and sub-directory from drop down
  _this.selectDirectoryAndSubDirectoryAndVerify(directory, subDirectory);

  it('Click "OK" on the "Add New Category" dialog', function() {
    ThiefHelpers.getDialogButton('Add New Category', 'OK').click().then(function() {
    }, function(err) {
      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });
  });
};

/**
 * @function verifyChartHasAppeared
 * @description This function is used to verify if the chart is successfully calculated
 * @param tileName name of the tile in which particular chart is displayed
 * @returns NA
 */

CommonPageObjectsForPA3.prototype.verifyChartHasAppeared = function(tileName) {

  it(`Verifying if calculated data for ${tileName} chart appeared without any errors`, function() {
    PA3MainPage.isInChartFormat(tileName).then(function(displayed) {
      expect(displayed).customError(`${tileName} chart is not displayed on the webpage.`);
      if (!displayed) {
        CommonFunctions.takeScreenShot();
      }
    }, function(error) {

      if (error.name === 'StaleElementReferenceError') {
        expect(PA3MainPage.isInChartFormat(tileName)).customError('Encountered a stateless error');
        CommonFunctions.takeScreenShot();
      } else {
        expect(false).customError(`Error found while calculating ${tileName} chart: ` + error);
        CommonFunctions.takeScreenShot();
      }
    });
  });

};

/**
 * @function verifyAndClickOnButtonFromDialogBox
 * @description This function is used to verify if dialog has appeared with expected dialog title and click on the required button from the dialog box.
 * @param {string} dialogTitle: Name of the dialog box.
 * @param {string} buttonName: The button which has to be clicked from the dialog box (e.g. OK, Cancel)
 * @param {string} dialogContent: The text which is present in the dialog box.
 * @param {string} [xpathDialog]: If dialog is not wrapped using "//tf-dialog" tag then you can pass
 *                      customized XPATH which gets the reference of dialog box. Otherwise you can leave it.
 * @param {string} [xpathDialogFooter] XPATH of dialog footer. This parameter is required when dialog box is not build using
 *                    thief components (i.e., not using tf-dialog).
 * @return NA
 */

CommonPageObjectsForPA3.prototype.verifyAndClickOnButtonFromDialogBox = function(dialogTitle, buttonName, dialogContent, xpathDialog, xpathDialogFooter) {

  it('Should verify if "' + dialogTitle + '" dialog is displayed', function() {
    ThiefHelpers.verifyDialogTitle(dialogTitle, 1, xpathDialog);
  });

  if (dialogContent !== undefined) {
    it('Should verify if "' + dialogTitle + '" dialog box is displayed with "' + dialogContent + '" message', function() {
      ThiefHelpers.getDialogClassReference(dialogTitle, 1, xpathDialog).getContent().getText().then(function(content) {
        content = content.replace(/\n/g, ' ');
        if (content !== dialogContent) {
          expect(false).customError('Expected dialog box content: "' + dialogContent + '"but Found: "' + content + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  }

  it('Should click on "' + buttonName + '" button from ' + dialogTitle + ' dialog box', function() {
    ThiefHelpers.getDialogButton(dialogTitle, buttonName, 1, xpathDialogFooter).click().then(function() {

    }, function(err) {
      expect(false).customError('Something went wrong while performing click:' + err);
      CommonFunctions.takeScreenShot();
    });
  });

  it('Should verify if ' + dialogTitle + ' dialog box is closed', function() {
    ThiefHelpers.isDialogOpen(dialogTitle, 1, xpathDialog).then(function(found) {
      if (found) {
        expect(false).customError('"' + dialogTitle + '" dialog is still open');
        CommonFunctions.takeScreenShot();
      }
    });
  });
};

/**
 * @function clickOnFirstTabOfWebFrameAndVerifyTitle
 * @description This function is used to click on first from web-frame tab and verify tab is switched appropriately.
 * @return NA
 */
CommonPageObjectsForPA3.prototype.clickOnFirstTabOfWebFrameAndVerifyTitle = function() {

  var referenceOfTab = element.all(by.xpath('//*[@class="primary-tabs-container"]//*[@class="tab"]')).first();

  element.all(by.xpath('//*[@class="primary-tabs-container"]//*[@class="tab"]//a')).first().getText().then(function(text) {
    referenceOfTab.click().then(function() {}, function(err) {

      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });

    // Check if tab is opened
    browser.getTitle().then(function(title) {
      if (title.indexOf(text) === -1) {
        expect(false).customError('"' + text + '" tab is not open');
        CommonFunctions.takeScreenShot();
      }
    });
  });
};

/**
 * @function expandAVirtualListBoxGroupAndDeleteItem
 * @description This function is used to expand a single level group in the Virtual List Box and delete the required item from the group
 * @param {string} groupName: Name of the single level group in the Available section.
 * @param {string} xpathOfAvailableContainer: The xpath of the Available container should be passed.
 * @param {string} item: The item in the single level group item which has to be deleted.
 * @param {string} dialogTitle: The title of the dialog box which appears.
 * @param {string} buttonName: The button name which has to be selected.
 * @return NA
 */

CommonPageObjectsForPA3.prototype.expandAVirtualListBoxGroupAndDeleteItem = function(groupName, xpathOfAvailableContainer, item, dialogTitle, buttonName) {

  var group;
  var newElements = [];
  it('Should expand ' + groupName + ' from "Available" container and delete ' + item, function() {
    group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableContainer).getGroupByText(groupName);

    group.isExpanded().then(function(expanded) {
      if (!expanded) {
        group.expand();
      }
    }).then(function() {
      group.getChildrenText().then(function(childArray) {
        childArray.forEach(function(columnName) {
          if (columnName.text === item) {
            group.getItemByText(item).then(function(item1) {
              item1.getActions().then(function(actions) {
                actions.triggerAction('remove');
                ThiefHelpers.getDialogButton('Delete ' + dialogTitle, buttonName).click().then(function() { }, function(err) {
                  expect(false).customError(err);
                  CommonFunctions.takeScreenShot();
                });
              });
            });
          }
        });
      });
    });

  });

  it('Verifying if the ' + item + ' is removed from the available section', function() {
    ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableContainer).getGroupByText(groupName).getChildrenText().then(function(noOfElements) {
      noOfElements.forEach(function(listItem) {
        newElements.push(listItem.text);
      });
      if (newElements.indexOf(item) > -1) {
        expect(false).customError(item + ' is still present in the "Available" section.');
        CommonFunctions.takeScreenShot();
      }
    });
  });
};

/**
 * @function expandAListBoxGroupAndDeleteItem
 * @description This function is used to expand a single level group in the List Box and delete the required item from the group
 * @param {string} groupName: Name of the single level group in the Available section.
 * @param {string} xpathOfAvailableContainer: The xpath of the Available container should be passed.
 * @param {string} item: The item in the single level group which has to be deleted.
 * @param {string} dialogTitle: The title of the dialog box which appears.
 * @param {string} buttonName: The button name which has to be selected.
 * @return NA
 */

CommonPageObjectsForPA3.prototype.expandAListBoxGroupAndDeleteItem = function(groupName,xpathOfAvailableContainer, item, dialogTitle, buttonName) {

  var group;
  var newElements = [];
  it('Should expand ' + groupName + ' from "Available" container and delete ' + item, function() {
    group = ThiefHelpers.getListboxClassReference(xpathOfAvailableContainer).getGroupByText(groupName);

    group.isExpanded().then(function(expanded) {
      if (!expanded) {
        group.expand();
      }
    }).then(function() {

      group.getChildrenText().then(function(childArray) {
        childArray.forEach(function(columnName) {
          if (columnName.text === item) {
            var item1 = ThiefHelpers.getListboxClassReference(xpathOfAvailableContainer).getGroupByText(groupName).getItemByText(item);

            item1.getActions().then(function(actions) {
              actions.triggerAction('remove');
              ThiefHelpers.getDialogButton('Delete ' + dialogTitle, buttonName).click().then(function() { }, function(err) {
                expect(false).customError(err);
                CommonFunctions.takeScreenShot();
              });
            });

          }
        });
      });
    });
  });

  it('Verifying if the ' + item + ' is deleted from the available section', function() {
    ThiefHelpers.getListboxClassReference(xpathOfAvailableContainer).getGroupByText(groupName).getChildrenText().then(function(noOfElements) {
      noOfElements.forEach(function(listItem) {
        newElements.push(listItem.text);
      });
      if (newElements.indexOf(item) > -1) {
        expect(false).customError(item + ' is still present in the "Available" section.');
        CommonFunctions.takeScreenShot();
      }
    });
  });
};

module.exports = new CommonPageObjectsForPA3();
