'use strict';

// Requiring PA3 page object files

require(__dirname + '/../index.js');
var PA3MainPage = function() {
  this.xpathBodyAttribute = '//body[contains(@class,"replacingText")]';
  this.xpathApp = '//body';
  this.xpathPortfolioWidget = '//*[@data-qa-id="input-box-portfolio"]//*[@data-qa-class="textbox-idWidget"]';
  this.xpathBenchmarkWidget = '//*[@data-qa-id="input-box-benchmark"]//*[@data-qa-class="textbox-idWidget"]';
  this.xpathRefreshToCancelBtn = '//tf-button[@data-qa-class="refresh-button" and not(contains(@class, "ng-hide")) and ' + 'contains(@icon,"close")]';
  this.xpathRefreshBtn = '//tf-button[@data-qa-class="refresh-button" and not(contains(@class, "ng-hide")) and ' + 'contains(@icon,"refresh")]';
  this.xpathApplicationToolBarWrenchDropDown = '//*[@data-qa-id="application-header"]//*[@data-qa-class="wrench-dropdown-button"]';
  this.xpathCurrencyDropdown = '//tf-dropdown-select[@data-qa-id="dropdown-pricing-currency"]';
  this.xpathOfRenameTextBoxFromLHP = '//*[@data-qa-class="accordion-item"]//tf-textbox';
  this.xpathOfPlusMinusIcon = '//*[@data-qa-id="lhp-container"]//*[@data-qa-id="edit-lhp-report-list"]//tf-button';
  this.xpathConfirmationDialog = '//*[@data-qa-id="dialog-remove-report"]/tf-dialog';
  this.xpathOfColorByDropDown = '//*[normalize-space(.)="Color By:"]/following-sibling::*//tf-dropdown-select//span[@tf-button]';
  this.xpathHamburgerButton = '//*[@data-qa-id="application-header-lookup-section"]//*[@tab="portfolio"][@data-qa-class="icon-button"]';
  this.xpathBAndHDropDown = '//tf-dropdown-select[@data-qa-class="methodology-dropdown-button"]';
  this.xpathCheckboxFromTransposeMenuDropDown = '//tf-dropdown//tf-checkbox[normalize-space(.)="replacingText"]';
  this.xpathChartIconFromReport = '//*[@data-qa-id="workspace"]//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="replacingText"]]' + '//*[@data-qa-class="chart-button"]';
  this.xptahCheckboxFromAccountsDropdown = '//*[@class="dropdown-container"]//*[normalize-space(.)="replacingText"]/tf-checkbox';
  this.xpathActiveOptionFromWrenchMenu = '//tf-dropdown//tf-menu-item[descendant::*//*[normalize-space(.)="replacingText"]]//span[@tf-icon]';
  this.xathAddPortfolioVarationButton = '//tf-dropdown//tf-button[@icon="add"]';
  this.xpathPortfolioVarationButton = '//*[normalize-space(.)="Variation Type"]/parent::*//tf-dropdown-select';
  this.xpathPortfolioVariationListbox = '//tf-dropdown[descendant::*[normalize-space(.)="Portfolio Variation"]]//' + 'tf-listbox[parent::*[preceding-sibling::*[normalize-space(.)="Portfolios"]]]';
  this.xpathFindWidget = '//*[@data-qa-class="tile"]//pa-tile-search-panel';
  this.xpathFindWidgetTextBox = '//*[@data-qa-class="tile"]//tf-textbox';
  this.xpathFindWidgetCloseButton = '//*[@data-qa-class="tile"]//*[contains(@class,"tf-icon-close")]/parent::*';
  this.xpathFindWidgetUpOrDownArrow = '//*[@data-qa-class="tile"]//*[@type="arrow-replacingText"]/parent::*';
  this.xpathSearchElementFromSlickGrid = '//*[contains(@class, "search-result")]//*[contains(@class,"grid-just-left")]';
  this.xpathOfPortfolioOrBenchmarkHambergerIcon = '//*[@data-qa-id="input-box-replacingText"]//*[@data-qa-class="icon-button"]//tf-button';
  this.xpathOfOkOrCancelButton = '//tf-button[@data-qa-id="button-account-dialog-replacingText"]';
  this.xpathRemoveAllIcon = '//*[@data-qa-id="button-account-clear-all"]';
  this.xpathMaximizeOrMinimizeIcon = '//*[@data-qa-id="workspace"]//*[@data-qa-class="tile" and descendant::*' + '[normalize-space(.)="replacingText"]]//*[contains(@class, "screen")]/parent::tf-button';
  this.xpathBenchMarkLookupIcon = '//*[@data-qa-id="input-box-benchmark"]//tf-button-checkbox[@data-qa-class="button-IdentifierLookup"]';
  this.xpathPortfolioLookupIcon = '//*[@data-qa-id="input-box-portfolio"]//tf-button-checkbox[@data-qa-class="button-IdentifierLookup"]';
  this.xpathApplicationWrenchIcon = '//*[@data-qa-id="application-header"]//*[@data-qa-class="wrench-dropdown-button"]';
  this.xpathInputBox = '//input[contains(@data-qa-id, "replacingText-textbox")]';
  this.xpathOfPortfolioOrBenchmarkAccountsEditOrRemove = '//tf-listbox//tf-listbox-item-handle//*[normalize-space(.)="replacingText"]/ancestor::*//tf-listbox-item-handle//tf-actions';
  this.xpathOfLhpReports = '//tf-navpane-item//*[normalize-space(.)="replacingText"]/parent::tf-navpane-item';
  this.xpathOfLhpItems = '//tf-navpane-item';
  this.xpathMenuItem = '//*[@data-qa-class="dropdown-menu-item-document" and normalize-space(.)="replacingText"]';
  this.xpathCalenderIcon = '//tf-datepicker-dropdown//span[@tf-button]';
  this.xpathOfPortfolioVatiationDropdowns = '//*[normalize-space(.)="replacingText"]/parent::*//tf-dropdown-select/*[@tf-button]';
  this.xpathOfPortfolioVatiationOkOrCancelButtons = '//tf-panel//*[normalize-space(.)= "Portfolio Variation"]/parent::*//tf-button//*[normalize-space(text())="replacingText"]/parent::*';
  this.xpathOfEditButtonPortfolioDropdown = '//tf-dropdown//tf-listbox//*[normalize-space(.)="replacingText"]/ancestor::*/tf-listbox-item-handle//*[@tf-icon][contains(@class,"edit")]';
  this.xpathOfOpenHoldDropDownFooterButtons = '//*[contains(@open, "openBuyHoldDropDown")]//tf-panel//tf-panel-footer//tf-button//*[normalize-space(text())="replacingText"]/parent::*';
  this.xpathOfHodingsModeDropDownOfPortfolioDropdown = '//*[@id="portfolio"]//*[@data-qa-class="account-item" ' + 'and descendant::*[normalize-space(.)="replacingText"]]' + '//*[@data-qa-class="methodology-dropdown-button"]/parent::*[contains(@class, "ng-hide")]';
  this.xpathOfOkOrCancelButtonOfDialog = '//tf-dialog//span[@tf-button][normalize-space(.)="replacingText"]|//tf-dialog//tf-button[normalize-space(.)="replacingText"]';
  this.xpathOfHambergeraIconButtons = '//*[@data-qa-id="button-account-dialog-replacingText"]';
  this.xpathExclusionsListBox = '//*[@data-qa-id="exclusions-listbox"]';
  this.xpathXIconFromDialog = '//span[.="Save error"]//following-sibling::*[contains(@class,"titlebar-close")]';
};

/**
 * @function goToURL
 * @description This function is used to launch required URL.
 * @param url {string} URL of the web page
 * @returns NA
 */
PA3MainPage.prototype.goToURL = function(url) {
  // Variable(s)
  var _this = this;
  var serial = FactSetLoginPage.FetchSerialNumber();

  // Prepend url value with "/" if not already exists
  if (url.charAt(0) !== '/') {
    url = '/' + url;
  }

  browser.call(() => {
    // Disabling ignoreSynchronization
    browser.ignoreSynchronization = true;

    // Doing browser.refresh() to refresh the browser to check if login page has appeared
    browser.refresh();

    browser.getTitle().then((title) => {

      // Check if FactSet Login page is appeared
      if (title.indexOf('FactSet Login') > -1) {

        console.log('FactSet login page appeared. Logging in again');

        // If application is redirected to FactSet login page login to application using credentials
        FactSetLoginPage.loginToApplication(serial);

      }

      // enabling ignoreSynchronization
      browser.ignoreSynchronization = false;

      // Navigate to the given URL
      browser.get(url, 120);

    });
  }).then(() => {

    browser.ignoreSynchronization = false;

    // Close QA Info Box if it is found
    _this.closeQAInfoBox();

  });
};

/**
 * @function switchToDocument
 * @description This function is used to switch to the given document.
 * @param {string} documentName Name of the document to switch to.
 * NOTE: Please pass the full path to document.
 * @returns {promise} Promise which resolves to object which is returned after the document is switched.
 */
PA3MainPage.prototype.switchToDocument = function(documentName) {
  // Variable(s)
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var _this = this;

  var docName;
  var documentObj = DocumentJson[documentName];
  if (documentObj) {
    docName = documentObj.documentPath;
  } else {
    docName = documentName;
  }

  docName = docName.replace(/\//g, ';');

  browser.executeScript('return $( "#pa3App" ).injector().get( "paDocumentLoadState" ).go({docId: arguments[0]}, {skipRecover: true})', docName).then(function(ref) {

    // Waiting for report to finish calculation
    ThiefHelpers.waitUntilSpinnerDisappears(_this.getProgressIndicatorClassReference(undefined,
      '//tf-progress-indicator'), 30000).then(function(option) {
      if (!option) {
        expect(false).customError('Error while calculating report.');
        CommonFunctions.takeScreenShot();
      }
    });

    ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
      if (!found) {
        // Close QA Info Box if it is found
        _this.closeQAInfoBox();
      } else {
        defer.reject('Calculation Error Found.');
      }
    });

    // Fulfill the promise
    defer.fulfill(ref);
  });

  return promise;
};

/**
 * @function launchHtmlDialog
 * @description This function is used to open the required document.
 * @param {string} documentPath Path of the document which has to be open.
 * NOTE: Please pass the full path to document. Ex.: "Client:/Pa3/Columns/TRANSPOSE_CHARACTERISTICS"
 * @returns {promise} Promise which resolves to object which is returned after the document is switched.
 */
PA3MainPage.prototype.launchHtmlDialog = function(optionName, buttonName) {
  // Variable(s)
  var _this = this;

  // Clicking on Folder Icon from application toolbar
  _this.getFolderDropDown().click().then(function() {
  }, function(error) {
    CommonFunctions.takeScreenShot();
    expect(false).customError(error);
  });

  // Selecting option from the folder menu
  _this.getOptionFromFolderMenu(optionName).click().then(function() {
  }, function(error) {
    CommonFunctions.takeScreenShot();
    expect(false).customError(error);
  });

  if (buttonName !== undefined) {
    _this.getDialog('Document has changed').isPresent().then(function(found) {
      if (found) {
        // Selecting button from the open dialog
        _this.getButton(buttonName).click().then(function() {
        }, function(error) {
          CommonFunctions.takeScreenShot();
          expect(false).customError(error);
        });
      }
    });
  }
};

/**
 * @function launchHtmlDialogAndOpenDocument
 * @description This function is used to launch html dialog and open the document as per user require.
 * @param {string} documentKey name of the document from document.json page.
 * @param {boolean} recoverChanges set Boolean value, TRUE to continue editing, FALSE to load origin document.
 * @param {boolean} appeared set Boolean value, undefined to continue editing.
 * @param {boolean} clickOnFolderIcon set Boolean value, undefined to click on the folder icon.
 * Example default-doc-auto.
 */
PA3MainPage.prototype.launchHtmlDialogAndOpenDocument = function(documentKey, recoverChanges, appeared, clickOnFolderIcon) {
  var fdsav2Override = TestConfig.FDSAv2_Override;
  var _this = this;
  if (recoverChanges === undefined) {
    recoverChanges = false;
  }

  /*if ((fdsav2Override.indexOf('agaynor-remdata-test') !== -1) || (fdsav2Override.indexOf('pa3_regression') !== -1)) {
   }else {
   CommonPageObjectsForPA3.switchToDocumentAndVerify(documentKey);
   }*/

  // Creating object
  var documentObj = DocumentJson[documentKey];
  var docName = documentObj.documentPath.replace(/;/g, '/').toUpperCase();

  if (clickOnFolderIcon === undefined) {
    // Launching htm dialog
    _this.launchHtmlDialog('Open', 'Don\'t Save Changes');
  }

  // Opening document as per given by user
  FileDialog.openDocument(documentObj.documentPath);

  if (appeared === undefined) {
    // Verifying if any Auto Recovery popup appeared
    ThiefHelpers.isDialogOpen(docName).then(function(found) {
      if (found) {
        if (recoverChanges === true) {
          _this.editOrDiscardReportChanges('Continue Editing');
        } else {
          _this.editOrDiscardReportChanges('Discard Changes');
        }
      }
    });

    // Check if application is launched
    browser.getTitle().then(function(title) {
      if (title !== documentObj.browserTitle) {
        expect(false).customError('Title of browser did not match.Expected: "' + documentObj.browserTitle + '", Found: "' + title + '"');
        CommonFunctions.takeScreenShot();
      }
    });

    // Waiting till document open
    expect(Utilities.waitUntilElementDisappears(_this.getReportCalculationDlg(), 300000)).toBeTruthy();

    ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
      if (!found) {
        // Close QA Info Box if it is found
        _this.closeQAInfoBox();
      }
    });
  }
};

/**
 * @function editOrDiscardReportChanges
 * @description This function is used to get the reference of button in Auto Recovery popup dialog.
 * @param {string} editOrDiscard Name of the button to continue/not with the report changes.
 * @returns {NA}
 */
PA3MainPage.prototype.editOrDiscardReportChanges = function(editOrDiscard) {
  ThiefHelpers.getButtonClassReference(editOrDiscard).press().then(function() {
  }, function(err) {

    expect(false).customError('Unable to click on "' + editOrDiscard + '" button due to the Error: ' + err);
    CommonFunctions.takeScreenShot();
  });
};

/**
 * @function getReports
 * @description This function is used to get the reference of report from LHP
 * @param {string} reportName Name of the report for which the reference is needed
 * @returns {promise} Promise which resolves to reference of a report from LHP
 */
PA3MainPage.prototype.getReports = function(reportName) {
  var xpathReports = '//*[@data-qa-id="lhp"]//*[@data-qa-class="accordion-item" and descendant::*' + '//*[normalize-space(.)="' + reportName + '"]]';
  return element(by.xpath(xpathReports));
};

/**
 * @function getReportWrenchButton
 * @description This function is used to get the reference button "Wrench" button from report's option in LHP
 * @param {string} reportName Name of the report whose wrench button reference is needed
 * @returns {promise} Promise which resolves to reference of report's "Wrench" button from LHP
 */
PA3MainPage.prototype.getReportWrenchButton = function(reportName) {
  var xpathWrenchButton = '//*[@data-qa-id="lhp"]//*[@data-qa-class="accordion-item" and descendant::*' + '//*[normalize-space(.)="' + reportName + '"]]//*[@data-qa-class="wrench-button"]';

  return element(by.xpath(xpathWrenchButton));
};

/**
 * @function getReportRenameField
 * @description This function is used to get the reference of rename field of the report
 * @param {string} reportName Name of the report for which the reference of rename field has to be collected
 * @returns {promise} Promise which resolves to rename field reference of a report
 */
PA3MainPage.prototype.getReportRenameField = function(reportName) {
  var xpathReports = '//*[@data-qa-id="lhp"]//*[@data-qa-class="accordion-item" and descendant::*' + '//*[normalize-space(.)="' + reportName + '"]]//*[contains(@class, "renamable")]//input';

  return element(by.xpath(xpathReports));
};

/**
 * @function getOption
 * @description This function is used to get the reference of required option from the drop down.
 * @param {string} optionName Name of the option for which the reference is needed.
 * @returns {promise} Promise which resolves to reference of required option from the drop down.
 */
PA3MainPage.prototype.getOption = function(optionName) {
  var xpathOption = '//tf-dropdown//*[@ng-repeat and descendant::*//*[normalize-space(.)="' + optionName + '"]]';

  return element(by.xpath(xpathOption));
};

/**
 * @function getWrenchIcon
 * @description This function is used to get the reference of "Wrench" button from app toolbar.
 * @param {string} [checkForDropDown=false] Default value is false. When this parameter is set to TRUE function will
 * return the reference of dropdown.
 * @returns {promise} Promise which resolves to reference of either WRENCH button from app toolbar or
 * dropdown reference if checkForDropDown parameter is set to TRUE.
 */
PA3MainPage.prototype.getWrenchIcon = function(checkForDropDown) {

  // Setting the default parameter
  if (checkForDropDown === undefined) {
    checkForDropDown = false;
  }

  // Adding the below action as a work around to shift control from Download button.
  var reference = element(by.xpath(this.xpathBenchMarkLookupIcon));
  browser.actions().mouseMove(reference).perform();

  var xpathWrenchIcon = '//*[@data-qa-id="application-header"]//*[@data-qa-class="wrench-dropdown-button"]';
  var xpathWrenchDropDown = xpathWrenchIcon + '/ancestor::*/following-sibling::*' + '[descendant::*[@data-qa-class="dropdown-menu-item-document"]]';

  if (!checkForDropDown) {
    return element(by.xpath(xpathWrenchIcon));
  } else if (checkForDropDown) {
    return element(by.xpath(xpathWrenchDropDown));
  }
};

/**
 * @function getRefreshIcon
 * @description This function is used to get the reference of "Refresh" icon.
 * @returns {promise} Promise which resolves to reference of "Refresh" button.
 */
PA3MainPage.prototype.getRefreshIcon = function() {
  var xpathRefreshIcon = '//*[@data-qa-id="application-header"]//*[@data-qa-class="refresh-button" and ' + 'not(contains(@class, "ng-hide")) and ' + 'contains(@icon,"refresh")]';

  return element(by.xpath(xpathRefreshIcon));
};

/**
 * @function getSaveIcon
 * @description This function is used to get the reference of "Save" icon from the app  toolbar
 * @returns {promise} Promise which resolves to reference of "Save" button from app toolbar
 */
PA3MainPage.prototype.getSaveIcon = function() {
  var xpathSaveIcon = '//*[@data-qa-id="application-header"]//*[@data-qa-class="save-button"]';

  return element(by.xpath(xpathSaveIcon));
};

/**
 * @function getOptionFromWrenchMenu
 * @description This function is used to navigate through a path in Wrench menu and fetch the reference of an option
 * @param {string} optionPath Name of the option or path of the option in Wrench menu
 * Ex: Save, Open or Analytics Overrides|Enable Overrides
 * @returns {promise} Returns the reference of the option from Wrench menu
 */
PA3MainPage.prototype.getOptionFromWrenchMenu = function(optionPath) {
  var arrOptions;
  var elementRef;
  var i;
  var submenu;
  arrOptions = optionPath.split('|');

  // If only one option is passing
  if (arrOptions.length === 1) {
    // Getting element reference
    elementRef = ThiefHelpers.getMenuClassReference()._getItemByText(arrOptions[0]);
  } else if (arrOptions.length > 1) {
    // Performing hover on first element
    submenu = ThiefHelpers.getMenuClassReference().getSubMenuByText(arrOptions[0]);
    for (i = 1; i < arrOptions.length - 1; i++) {
      // Performing hover on submenu
      submenu = submenu.getSubMenuByText(arrOptions[i]);
    }

    // Getting reference of last element
    elementRef = ThiefHelpers.getMenuClassReference(arrOptions.length)._getItemByText(arrOptions[arrOptions.length - 1]);
    elementRef.getAttribute('tagName').then(function(tagName) {
      if (tagName.toLowerCase() !== 'tf-menu-item') {
        elementRef = elementRef.element(by.xpath('//tf-menu-item'));
      }
    });
  }

  return elementRef;
};

/**
 * @function isAutomaticCalculationChecked
 * @description This function is used to get the status of "Automatic Calculation" option from "Wrench" menu in application toolbar
 * @returns {promise} Promise which resolves to boolean value. TRUE if "Automatic Calculation" is selected, FALSE otherwise
 */
PA3MainPage.prototype.isAutomaticCalculationChecked = function() {
  var defer = protractor.promise.defer();
  var promise = defer.promise;

  // Check if 'Automatic Calculation' has to be selected
  ThiefHelpers.getMenuClassReference().getCheckedState('Automatic Calculation').then(function(selected) {
    if (selected) {
      defer.fulfill(true);
    } else {
      defer.fulfill(false);
    }
  });

  return promise;
};

/**
 * @function getReportCalculationDlg
 * @description This function is used to get the reference of progress icon
 * @param {string} [tileName] Name of the tile from which you need to get reference of progress icon
 * NOTE: If this parameter is not passed and there are multiple tiles then you'll get ambiguous references. So, to
 * avoid that, please pass the tile name.
 * @returns {promise} Promise which resolves to reference progress icon
 */
PA3MainPage.prototype.getReportCalculationDlg = function(tileName) {
  // Variable(s)
  var xpathReportCalculation;

  // Set the XPATH based on optional parameter
  if (tileName === undefined) {
    xpathReportCalculation = '//*[@data-qa-class="progress-indicator"]';
  } else {
    xpathReportCalculation = '//*[@data-qa-class="tile"]//*[@data-qa-class="tile-header" and descendant::*' + '[normalize-space(.)="' + tileName + '"]]/ancestor::*[@data-qa-class="tile"]' + '/following-sibling::*//*[@data-qa-class="progress-indicator"]';
  }

  browser.driver.wait(function() {
    return element(by.xpath(xpathReportCalculation)).isDisplayed().then(function(isfound) {
      return isfound;
    }, function() {
      return false;
    });
  }, 3000).then(function() {
  }, function() {
  });

  return element(by.xpath(xpathReportCalculation));
};

/**
 * @function getReportCalculationMessage
 * @description This function is used to get the reference of progress message
 * @param {string} [tileName] Name of the tile from which you need to get reference of progress message
 * NOTE: If this parameter is not passed and there are multiple tiles then you'll get ambiguous references. So, to
 * avoid that, please pass the tile name.
 * @returns {promise} Promise which resolves to reference progress message
 */
PA3MainPage.prototype.getReportCalculationMessage = function(tileName) {
  // Variable(s)
  var xpathReportCalculationMessage;

  // Set the XPATH based on optional parameter
  if (tileName === undefined) {
    xpathReportCalculationMessage = '//*[contains(@class,"calc-progress-message")]';
  } else {
    xpathReportCalculationMessage = '//*[@data-qa-class="tile"]//*[@data-qa-class="tile-header" and descendant::*' + '[normalize-space(.)="' + tileName + '"]]/ancestor::*[@data-qa-class="tile"]' + '/following-sibling::*//*[contains(@class,"calc-progress-message")]';
  }

  return element(by.xpath(xpathReportCalculationMessage));
};

/**
 * @function setAutomaticCalculation
 * @description This function is used to check or un-check 'Automatic Calculation'.
 * @param {boolean} set Boolean value, TRUE to select, FALSE to deselect.
 * @returns {promise} Promise which resolved to boolean value.
 */
PA3MainPage.prototype.setAutomaticCalculation = function(set) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var _this = this;

  if (set) {
    // Check if 'Automatic Calculation' has to be selected
    this.isAutomaticCalculationChecked().then(function(selected) {
      // Check if "Automatic Calculation" is already checked?
      // If yes, just fulfill the promise
      if (!selected) {
        ThiefHelpers.getMenuClassReference().selectItemByText('Automatic Calculation');

        // Click the "Wrench" button to get the drop down menu
        _this.selectWrenchIcon();

        // Check if 'Automatic Calculation' is selected
        _this.isAutomaticCalculationChecked().then(function(selected) {
          if (selected) {
            defer.fulfill(true);
          } else {
            defer.reject(false);

            // Taking screenshot
            CommonFunctions.takeScreenShot();
          }
        });

        // Click the "Wrench" button to close the drop down
        _this.selectWrenchIcon();
      } else {
        // Click the "Wrench" button to close the drop down
        _this.selectWrenchIcon();

        defer.fulfill(true);
      }
    });
  } else {
    // Execute this block when you want to un-check "Automatic Calculation"
    this.isAutomaticCalculationChecked().then(function(selected) {
      if (selected) {
        ThiefHelpers.getMenuClassReference().selectItemByText('Automatic Calculation');

        // Click the "Wrench" button to get the drop down menu
        _this.selectWrenchIcon();

        // Check if 'Automatic Calculation' is deselected
        _this.isAutomaticCalculationChecked().then(function(selected) {
          if (!selected) {
            defer.fulfill(true);
          } else {
            defer.reject(false);

            // Taking screenshot
            CommonFunctions.takeScreenShot();
          }
        });

        // Click the "Wrench" button to close the drop down
        _this.selectWrenchIcon();
      } else {
        // Click the "Wrench" button to close the drop down
        _this.selectWrenchIcon();

        defer.fulfill(true);
      }
    });
  }

  return promise;
};

/**
 * @function cancelReportCalculation
 * @description This function is used to cancel the report calculation.
 * @param {string} [tileName] Name of the tile from which you need to get reference of progress icon
 * NOTE: If this parameter is not passed and there are multiple tiles then you'll get ambiguous references. So, to
 * avoid that, please pass the tile name.
 * @returns {promise} Promise which resolved to boolean value
 */
PA3MainPage.prototype.cancelReportCalculation = function(tileName) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var xpathCancelButton;
  var _this = this;
  var reportCalculation = _this.getReportCalculationDlg(tileName);

  // Get the reference of "Report Calculation" dialog box
  reportCalculation.isPresent().then(function(isPresent) {
    if (isPresent) {
      if (tileName === undefined) {
        xpathCancelButton = '//*[@data-qa-class="progress-indicator"]/following-sibling::*' + '[contains(@class,"pa-tile-calc-progress-body")]//tf-button';
      } else {
        xpathCancelButton = '//*[@data-qa-class="tile"]//*[@data-qa-class="tile-header" and ' + 'descendant::*[normalize-space(.)="' + tileName + '"]]/ancestor::*[@data-qa-class="tile"]/following-sibling::*' + '//*[contains(@class,"pa-tile-calc-progress-body")]//tf-button';
      }

      element(by.xpath(xpathCancelButton)).click().then(function() {
        browser.sleep(2000);

        // Check if "Report Calculation" dialog disappeared
        _this.getReportCalculationDlg(tileName).isPresent().then(function(isPresent) {
          if (isPresent) {
            defer.reject(false);
          } else {
            defer.fulfill(true);
          }
        });
      }, function(err) {
        defer.reject(err);
      });
    } else {
      defer.fulfill(true);
    }
  });

  return promise;
};

/**
 * @function getWrenchIconFromReportWorkspace
 * @description This function is used to get reference of WRENCH button from the reports workspace.
 * @param {string} reportName Name of the report/tile from which WRENCH button reference is needed.
 * @param {boolean} [checkForDropDown=false] Default value is false. When this parameter is set to TRUE function will
 * return the reference of dropdown.
 * @returns {string} Promise which resolves to reference of either WRENCH button from app toolbar or dropdown reference
 * if checkForDropDown parameter is set to TRUE.
 */
PA3MainPage.prototype.getWrenchIconFromReportWorkspace = function(reportName, checkForDropDown) {

  // Variable(s)
  var _this = this;

  // Set the default value for "checkForDropDown" parameter
  if (checkForDropDown === undefined) {
    checkForDropDown = false;
  }

  // Close QA Info Box if it is found
  _this.closeQAInfoBox();

  var xpathWrenchIconFromReport = '//*[@data-qa-id="workspace"]//*[@data-qa-class="tile" and ' + 'descendant::*[normalize-space(.)="' + reportName + '"]]//*[@data-qa-class="wrench-button"]';

  var xpathWrenchDropDown = xpathWrenchIconFromReport + '/ancestor::*/following-sibling::tf-dropdown';

  if (!checkForDropDown) {
    return element(by.xpath(xpathWrenchIconFromReport));
  } else if (checkForDropDown) {
    return element(by.xpath(xpathWrenchDropDown));
  }
};

/**
 * @function getChartMenuButtonFromReportWorkspace
 * @description This function is used to get reference of Chart button inside Workspace.
 * @param {string} reportName The name of the report to select the chart button from.
 * @returns {promise} Returns the reference of Chart button.
 */
PA3MainPage.prototype.getChartMenuButtonFromReportWorkspace = function(reportName) {
  var xpathChartButton = '//*[@data-qa-id="workspace"]//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="' + reportName + '"]]' + '//*[@data-qa-class="chart-button"]';
  return element(by.xpath(xpathChartButton));
};

/**
 * @function getChartMenuOption
 * @description This function is used to get the reference of required option from the drop down.
 * @param {string} optionName Name of the option for which the reference is needed.
 * @returns {promise} Promise which resolves to reference of required option from the drop down.
 */
PA3MainPage.prototype.getChartMenuOption = function(optionName) {
  var xpathOption = '//tf-dropdown//tf-menu-item//tf-auto-tooltip[normalize-space(.)="' + optionName + '"]';
  return element(by.xpath(xpathOption));
};

/**
 * @function getReportViewToggleButtonFromReportWorkspace
 * @description This function is used to get reference of Report View toggle button inside Workspace.
 * @param {string} reportName The name of the report to select the report view toggle button from.
 * @returns {promise} Promise which resolves to reference of Report View toggle button.
 */
PA3MainPage.prototype.getReportViewToggleButtonFromReportWorkspace = function(reportName) {
  var xpathReportViewToggleButtonFromReport = '//*[@data-qa-id="workspace"]//*[normalize-space(text())="' + reportName + '"]' + '//ancestor::*[@data-qa-class="tile"]//*[@data-qa-class="toggle-button"]';

  return element(by.xpath(xpathReportViewToggleButtonFromReport));
};

/**
 * @function getOptionFromWrenchMenuFromReportWorkspace
 * @description This function is used to get reference of item from wrench menu list of report's workspace.
 * @param {string} optionName Name of the item whose reference is needed. If item is present as sub-menu item then pass
 * the full path to the item. Ex: Chart|Portfolio Weights Chart
 * @returns {promise} Promise which resolves to reference of given item from the menu list.
 */
PA3MainPage.prototype.getOptionFromWrenchMenuFromReportWorkspace = function(optionName) {
  var items = optionName.split('|');
  var xpathOptionFromWrenchMenuFromReport;

  if (items.length === 1) {
    xpathOptionFromWrenchMenuFromReport = '//tf-dropdown//tf-menu-item[descendant::*//*[normalize-space(.)="' + items[0] + '"]]';
  } else {
    if (items[0].toLowerCase() === 'chart') {
      xpathOptionFromWrenchMenuFromReport = '//div[@class="dropdown-wrap opened"]//li' + '/span[normalize-space(text())="' + items[0] + '"]/ancestor::li[1]';

      // Hover over the item to display sub-menu list
      browser.actions().mouseMove(element(by.xpath(xpathOptionFromWrenchMenuFromReport))).perform();
      browser.sleep(2000); // Waiting for sub-menu list to appear
    } else {
      xpathOptionFromWrenchMenuFromReport = '//div[@class="dropdown-wrap opened"]' + '//li[normalize-space( text() )=normalize-space( "' + items[0] + '" )]';

      // Hover over the item to display sub-menu list
      browser.actions().mouseMove(element(by.xpath(xpathOptionFromWrenchMenuFromReport))).perform();
      browser.sleep(2000); // Waiting for sub-menu list to appear
    }

    for (var i = 1; i < items.length; i++) {
      xpathOptionFromWrenchMenuFromReport += '/ul/li[normalize-space(.)="' + items[i] + '"]';

      // Hover over the item to display sub-menu list
      browser.actions().mouseMove(element(by.xpath(xpathOptionFromWrenchMenuFromReport))).perform();
      browser.sleep(2000); // Waiting for sub-menu list to appear
    }
  }

  return element(by.xpath(xpathOptionFromWrenchMenuFromReport));
};

/**
 * @function getLHPEditIcon
 * @description This function is used to get the reference of Left hand pane edit button.
 * @returns {promise} Promise which resolves to LHP Edit Icon reference
 */
PA3MainPage.prototype.getLHPEditIcon = function() {
  return element(by.xpath('//*[@data-qa-id="edit-lhp-report-list"]'));
};

/**
 * @function getFolderIcon
 * @description This function is used to get the reference of folder icon from LHP.
 * @returns {promise} Promise which resolves to folder icon reference
 */
PA3MainPage.prototype.getFolderIcon = function() {
  return element(by.xpath('//*[@data-qa-id="create-lhp-category"]'));
};

/**
 * @function getLHPSection
 * @description This function is used to get the reference of a section inside LHP.
 * @param {string} sectionName Name of the section for which the reference has to be collected.
 *  Ex: Reports
 * @returns {promise} Promise which resolves to section inside LHP reference.
 */
PA3MainPage.prototype.getLHPSection = function(sectionName) {
  var xpathSection = '//*[@data-qa-id="lhp"]//*[@data-qa-class="accordion-category" and ' + 'descendant::*[normalize-space(.)="' + sectionName + '"]]';
  return element(by.xpath(xpathSection));
};

/**
 * @function isNormalMode
 * @description This function is used to verify that the application is in normal/default mode.
 * @returns {promise} Promise which resolves boolean value.
 */
PA3MainPage.prototype.isNormalMode = function() {
  var xpath = '//*[@data-qa-id="edit-lhp-report-list"]';

  return element(by.xpath(xpath)).isPresent();
};

/**
 * @function setPortfolio
 * @description This function is used to set the portfolio for the document launched.
 * @param {string} portfolioTicker Ticker to be entered into the portfolio input box
 * Ex: spn:sp50.
 * @param {string} optionToSelect Portfolio to be selected from the type ahead list.
 * Ex: Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT
 * @param {string} expectedPortfolioFullName Expected portfolio name that is displayed in the portfolio widget.
 * Ex: Client:/NEW_PA_TEST_SUITE/PRICING/SPN_SP50_ACCT.ACCT
 * @param {string} [selectFromTypeAheadDirectly=true] Accepts boolean value. If you want to select portfolio directly from the
 * type ahead set it to TRUE else FALSE. Default is set to TRUE.
 * @param {string} [selectFromTypeAheadUsingKeyboardArrows=false] Set it to TRUE if you want to to select portfolio using arrow
 * keys from keyboard. Default set to FALSE.
 * @returns {promise} TRUE if portfolio is selected else FALSE
 */
PA3MainPage.prototype.setPortfolio = function(portfolioTicker, optionToSelect, expectedPortfolioFullName, selectFromTypeAheadDirectly, selectFromTypeAheadUsingKeyboardArrows) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var xpathPortfolioInputBox = '//id-widget[@id="portfolio-textbox"]//input';
  var portfolioInputBox = element(by.xpath(xpathPortfolioInputBox));

  // Initializing the optional variables
  if (selectFromTypeAheadDirectly === undefined) {
    selectFromTypeAheadDirectly = true;
  }

  if (selectFromTypeAheadUsingKeyboardArrows === undefined) {
    selectFromTypeAheadUsingKeyboardArrows = false;
  }

  // Click into "portfolio" widget
  portfolioInputBox.click();

  // Clear the default portfolio selected (if exists)
  portfolioInputBox.clear();

  // Enter the text into the Portfolio Input Box
  portfolioInputBox.sendKeys(portfolioTicker);

  // Wait for the type ahead box to appear
  var xpathTypeAhead = '//*[@data-qa-class="typeahead-results"]';
  Utilities.waitUntilElementAppears(element(by.xpath(xpathTypeAhead)), 6000);

  // Select the option from the type ahead list if selectFromTypeAheadDirectly == true
  if (selectFromTypeAheadDirectly) {
    // Check if type ahead appeared, if yes, select the required option
    var typeAhead = element(by.xpath(xpathTypeAhead));
    typeAhead.isPresent().then(function(listFound) {
      if (!listFound) {
        defer.reject('Type ahead did not appear after typing into the Portfolio widget.');
      } else {
        // Find the required option in the type ahead list
        var xpathOption = xpathTypeAhead + '//*[@data-qa-class="pa-typeahead-item" and @data-value="' + optionToSelect + '"]' +
          ' | //*[@data-qa-id="idw-typeahead-results-filter-listbox-container"]//filter-listbox-item//*[normalize-space(.)="' + optionToSelect + '"]';
        var refOption = element(by.xpath(xpathOption));
        Utilities.scrollElementToVisibility(refOption);
        refOption.isPresent().then(function(optionFound) {
          // If required option is not found reject the promise
          if (!optionFound) {
            defer.reject('"' + optionToSelect + '" Portfolio is not found in the type ahead.');
          } else {
            // Select the required option
            refOption.click();

            // Check if required portfolio is selected
            portfolioInputBox.getAttribute('value').then(function(portfolioValue) {
              if (portfolioValue.toLowerCase() !== expectedPortfolioFullName.toLowerCase()) {
                defer.reject('"' + expectedPortfolioFullName + '" portfolio is not found in the Portfolio widget ' + 'on selecting "' + optionToSelect + '" from type ahead.');
              } else {
                defer.fulfill(true);
              }
            });
          }
        });
      }
    });
  } else if (selectFromTypeAheadUsingKeyboardArrows) {
    // Get the reference of all the Portfolios from Type Ahead
    var allPortfolios = element.all(by.xpath(xpathTypeAhead + '//*[@data-qa-class="pa-typeahead-item"]'));

    // Click on keyboard's DOWN arrow button
    portfolioInputBox.sendKeys(protractor.Key.DOWN);

    // Iterate through each element until required portfolio is found
    allPortfolios.map(function(eleRef) {
      return {
        value: eleRef.getAttribute('data-value'),
      };
    }).then(function(items) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].value === optionToSelect) {
          Utilities.scrollElementToVisibility(allPortfolios.get(i));
          allPortfolios.get(i).click();
          defer.fulfill(true);
        } else {
          if (i === items.length - 1) {
            defer.reject('"' + optionToSelect + '" portfolio is not found in the type ahead.');
          } else {
            // Click on keyboard's DOWN arrow button
            portfolioInputBox.sendKeys(protractor.Key.DOWN);
          }
        }
      }
    });
  } else {
    defer.fulfill(true);
  }

  return promise;
};

/**
 * @function setBenchmark
 * @description This function is used to set the Benchmark for the document launched.
 * @param {string} benchmarkText Text to be entered into the Benchmark input box.
 *  Ex: Russell
 * @param {string} [selectFromTypeAheadDirectly=false] Accepts boolean value. If you want to select benchmark directly from the
 * type ahead set it to TRUE else FALSE.
 * @param {string} [selectFromTypeAheadUsingKeyboardArrows=false] Set it to TRUE if you want to to select benchmark using arrow keys from keyboard.
 * @param {string} optionToSelect The benchmark you want to select from the type ahead.
 * Ex: Client:/pa2_pa3_backup/risk/PA3_DJII.ACCT
 * @param {string} expectedSelectedValue Expected value after selecting the benchmark.
 * Ex: CLIENT:/PA2_PA3_BACKUP/RISK/PA3_DJII.ACCT
 * @returns {promise} TRUE if Benchmark is selected else FALSE
 */
PA3MainPage.prototype.setBenchmark = function(benchmarkText, selectFromTypeAheadDirectly, selectFromTypeAheadUsingKeyboardArrows, optionToSelect, expectedSelectedValue) {
  // Declaring variables for creating promise
  var defer = protractor.promise.defer();
  var promise = defer.promise;

  // Initializing the optional variables
  selectFromTypeAheadDirectly = selectFromTypeAheadDirectly || false;
  selectFromTypeAheadUsingKeyboardArrows = selectFromTypeAheadUsingKeyboardArrows || false;
  optionToSelect = optionToSelect || '';

  var xpathBenchmarkInputBox = '//id-widget[@id="benchmark-textbox"]//input';
  var benchmarkInputBox = element(by.xpath(xpathBenchmarkInputBox));
  var xpathTypeAhead = '//*[@data-qa-class="typeahead-results"]';

  // Click into "Benchmark" widget
  benchmarkInputBox.click();

  // Clear the default benchmark selected (if exists)
  benchmarkInputBox.clear();

  // Enter the text into the Benchmark Input Box
  benchmarkInputBox.sendKeys(benchmarkText);

  // Wait for the type ahead box to appear
  Utilities.waitUntilElementAppears(element(by.xpath(xpathTypeAhead)), 6000);

  // Select the option from the type ahead list if selectFromTypeAheadDirectly == true
  if (selectFromTypeAheadDirectly) {
    // Check if type ahead appeared, if yes, select the required option
    var typeAhead = element(by.xpath(xpathTypeAhead));
    typeAhead.isPresent().then(function(listFound) {
      if (!listFound) {
        defer.reject('Type ahead did not appear after typing into the benchmark widget.');
      } else {
        // Find the required option in the type ahead list
        var xpathOption = xpathTypeAhead + '//*[@data-qa-class="pa-typeahead-item" and @data-value="' + optionToSelect + '"]' +
          ' | //*[@data-qa-id="idw-typeahead-results-filter-listbox-container"]//filter-listbox-item//*[normalize-space(.)="' + optionToSelect + '"]';
        var refOption = element(by.xpath(xpathOption));
        refOption.isPresent().then(function(optionFound) {
          // If required option is not found reject the promise
          if (!optionFound) {
            defer.reject('"' + optionToSelect + '" benchmark is not found in the type ahead.');
          } else {
            // Select the required option
            refOption.click();

            // Check if required Benchmark is selected
            benchmarkInputBox.getAttribute('value').then(function(benchmarkValue) {
              if (benchmarkValue.toLowerCase() !== expectedSelectedValue.toLowerCase()) {
                defer.reject('"' + expectedSelectedValue + '" benchmark is not found in the benchmark widget on ' + 'selecting "' + optionToSelect + '" from type ahead.');
              } else {
                defer.fulfill(true);
              }
            });
          }
        });
      }
    });
  } else if (selectFromTypeAheadUsingKeyboardArrows) {
    // Get the reference of all the Benchmarks from Type Ahead
    var allBenchmarks = element.all(by.xpath(xpathTypeAhead + '//*[@data-qa-class="pa-typeahead-item"]'));

    // Click on keyboard's DOWN arrow button
    benchmarkInputBox.sendKeys(protractor.Key.DOWN);

    // Iterate through each element until required benchmark is found
    allBenchmarks.map(function(eleRef) {
      return {
        value: eleRef.getAttribute('data-value'),
      };
    }).then(function(items) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].value === optionToSelect) {
          allBenchmarks.get(i).click();
          defer.fulfill(true);
          break;
        } else {
          if (i === items.length - 1) {
            defer.reject('"' + optionToSelect + '" benchmark is not found in the type ahead.');
            CommonFunctions.takeScreenShot();
          } else {
            // Click on keyboard's DOWN arrow button
            benchmarkInputBox.sendKeys(protractor.Key.DOWN);
          }
        }
      }
    });
  } else {
    defer.fulfill(true);
  }

  return promise;
};

/**
 * @function getSortDialogOptions
 * @description This function is used to get reference of required button.
 * @param {string} optionType Name of the option to be selected (EX: "dropdown", "radio", "checkbox").
 * @param {string} title Name of the section (EX: "Then By:").
 * @param {string} optionName Name of the option (EX: "dropdown Name", "radio button Name").
 * @returns {promise} Promise which resolve to array of references.
 */
PA3MainPage.prototype.getSortDialogOptions = function(optionType, title, optionName) {

  var helperType;

  if (optionType.toLowerCase() === 'dropdown') {
    helperType = 'dropdown-select';
  } else if (optionType.toLowerCase() === 'radio') {
    helperType = 'radio';
  } else if (optionType.toLowerCase() === 'checkbox') {
    helperType = 'checkbox';
  }

  var xpathOfDropdown = '//tf-dialog//tf-form-vertical-group//*[normalize-space(.)="' + title + '"]/parent::*//tf-form-vertical-item' + '//tf-' + helperType + '[ancestor::*[normalize-space(.)= "' + optionName + '"]]';

  return element.all(by.xpath(xpathOfDropdown));
};

/**
 * @function getAllHeadersFromTypeahead
 * @description This function is used to get reference of all the headers within typeahead.
 * @returns {promise} Promise which resolve to array of references representing header names.
 */
PA3MainPage.prototype.getAllHeadersFromTypeahead = function() {
  // Variable(s)
  var xpathHeaderNames = '//*[@data-qa-class="typeahead-results"]//*[contains(@ng-repeat, "availableCategories")]';
  return element.all(by.xpath(xpathHeaderNames));
};

/**
 * @function getHeaderFromTypeahead
 * @description This function is used to get reference of required header from the typeahead.
 * @param {string} headerName Name of the header whose reference is required.
 * @returns {promise} Promise which resolve to reference of required header from typeahead.
 */
PA3MainPage.prototype.getHeaderFromTypeahead = function(headerName) {
  // Variable(s)
  var xpathHeaderName = '//*[@data-qa-class="typeahead-results"]' + '//*[contains(@ng-repeat, "availableCategories") and contains(text(), "' + headerName + '")]';
  return element(by.xpath(xpathHeaderName));
};

/**
 * @function getHamburgerIcon
 * @description This function is used to get the reference of widget's hamburger icon.
 * @param {string} widgetName Name of the widget for which hamburger button's reference has to be collected.
 * Ex: Portfolio, Benchmark
 * @param {boolean} [checkForAccountDropDown=false] Default value is set to FALSE. If this is set to TRUE we can verify
 * if account drop down is  visible or not.
 * @returns {promise} Promise which resolves to Hamburger button reference.
 */
PA3MainPage.prototype.getHamburgerIcon = function(widgetName, checkForAccountDropDown) {
  // Variable(s)
  var xpathHumburger;

  // Setting the default value of "checkForAccountDropDown"
  if (checkForAccountDropDown === undefined) {
    checkForAccountDropDown = false;
  }

  if (!checkForAccountDropDown) {
    xpathHumburger = '//*[@data-qa-id="application-header-lookup-section"]' + '//*[@tab="' + widgetName.toLowerCase() + '"]//*[@data-qa-class="icon-button"]';
  } else {
    xpathHumburger = '//*[@data-qa-id="application-header-lookup-section"]' + '//*[@tab="' + widgetName.toLowerCase() + '"]//*[@data-qa-class="icon-button"]' + '//tf-dropdown-legacy-handle[contains(@class, "open")]';
  }

  return element(by.xpath(xpathHumburger));
};

/**
 * @function getOkOrCancelButton
 * @description This function is used to get the reference of OK/CANCEL button reference.
 * @param {string} accountType Type of account drop down. Ex: Portfolio, Benchmark
 * @param {string} buttonName Name of the button to get its reference. Ex: OK, Cancel
 * @returns {promise} Promise which resolves to Hamburger button reference.
 */
PA3MainPage.prototype.getOkOrCancelButton = function(accountType, buttonName) {
  var xpathButton = '//*[@id="' + accountType.toLowerCase() + '"]/ancestor::*/following-sibling::*//*[@data-qa-id="button-account-dialog-' + buttonName.toLowerCase() + '"]';
  return element(by.xpath(xpathButton));
};

/**
 * @function getListFromAccountDropdown
 * @description This function is used to get references of all accounts from Account drop down.
 * @param {string} accountType Name of the widget for which list of account references has to be collected.
 * Ex: Portfolio, Benchmark
 * @param {boolean} [isTextNodeRefRequired=false] When this is set to TRUE, it'll return the array of references
 * which can fetch the names of account by calling getText() function on each reference.
 * @returns {promise} Promise which resolves to array of element reference
 */
PA3MainPage.prototype.getListFromAccountDropdown = function(accountType, isTextNodeRefRequired) {
  // variable(s)
  var xpathList;

  // Set the default value for "isTextNodeRefRequired" parameter
  if (isTextNodeRefRequired === undefined) {
    isTextNodeRefRequired = false;
  }

  // Decide the XPATH based on "isTextNodeRefRequired" value
  if (isTextNodeRefRequired === false) {
    xpathList = '//*[@id="' + accountType.toLowerCase() + '"]//*[@data-qa-class="account-item" and ' + 'descendant::*[@data-qa-class="account-name"]]';
  } else {
    xpathList = '//*[@id="' + accountType.toLowerCase() + '"]//*[@data-qa-class="account-item"]' + '//*[@data-qa-class="account-name"]//two-row-item-line-one';
  }

  return element.all(by.xpath(xpathList));
};

/**
 * @function getSingleAccountFromList
 * @description This function is used to get reference specified account from Account drop down.
 * @param {string} accountType Name of the widget for which list of account references has to be collected.
 * Ex: Portfolio, Benchmark
 * @returns {promise} Promise which resolves to required Portfolio/Benchmark reference.
 */
PA3MainPage.prototype.getSingleAccountFromList = function(accountType, accountName) {
  var xpathAccount = '//*[@id="' + accountType.toLowerCase() + '"]' + '//*[@data-qa-class="account-item" and descendant::*[normalize-space(.)="' + accountName + '"]]';

  return element(by.xpath(xpathAccount));
};

/**
 * @function getAccountDeleteButton
 * @description This function is used to get references of delete button from Account drop down.
 * @param {string} accountType Account type from which button reference is collected.
 * Ex: Portfolio, Benchmark
 * @param {string} accountName Name of the Portfolio/Benchmark to get it's delete button reference.
 * Ex: DELTA, ALPHA etc.
 * @returns {promise} Promise which resolves to delete button reference.
 */
PA3MainPage.prototype.getAccountDeleteButton = function(accountType, accountName) {
  var xpathDeleteButton = '//*[@id="' + accountType.toLowerCase() + '"]//*[@data-qa-class="account-item" ' + 'and descendant::*[normalize-space(.)="' + accountName + '"]]//*[contains(@class, "tf-icon-remove")]';

  return element(by.xpath(xpathDeleteButton));
};

/**
 * @function getAccountEditButton
 * @description This function is used to get references of "Edit" button from Account drop down.
 * @param {string} accountType Account type from which button reference is collected.
 * Ex: Portfolio, Benchmark
 * @param accountName {string} Name of the Portfolio/Benchmark to get it's "Edit" button reference
 * Ex: DELTA, ALPHA etc
 * @returns {promise} Promise which resolves to "Edit" button reference.
 */
PA3MainPage.prototype.getAccountEditButton = function(accountType, accountName) {
  var xpathEditButton = '//*[@id="' + accountType.toLowerCase() + '"]//*[@data-qa-class="account-item" and ' + 'descendant::*[normalize-space(.)="' + accountName + '"]]//*[@action="edit"]';

  return element(by.xpath(xpathEditButton));
};

/**
 * @function getArrowButton
 * @description This function is used to get references of arrow button from Account drop down.
 * @param {string} accountType Account type from which button reference is collected.
 * Ex: Portfolio, Benchmark
 * @param {string} direction Button's direction.
 * Ex: Left, Right
 * @returns {promise} Promise which resolves button reference.
 */
PA3MainPage.prototype.getArrowButton = function(accountType, direction) {
  var xpathArrowButton = '//*[@id="' + accountType.toLowerCase() + '"]/ancestor::*/following-sibling::*//*[@data-qa-id="button-' + direction.toLowerCase() + '-arrow"]';

  return element(by.xpath(xpathArrowButton));
};

/**
 * @function moveAccountsWithinAccountDropdown
 * @param {string} accountType Name of the widget for which list of account references has to be collected.
 * Ex: Portfolio, Benchmark
 * @param {string} accountName Name of the Portfolio/Benchmark that has to be moved.
 * Ex: DELTA, ALPHA etc
 * @param {string} accountIndex Current position of element which you want to move. Use this parameter if you are not
 *                              concerned about moving specific element.
 *                              Ex: 1, 2, 3 etc
 *                              NOTE: You should pass either accountName or accountIndex but not both. you can pass the
 *                              other parameter as "NA" or "". If both(2 & 3) parameter are not passed it'll move the
 *                              default selected account.
 * @param {string} direction Direction in which Portfolio/Benchmark has to move.
 *                              Ex: Up, Down
 * @param {number} noOfPositions Number of position Portfolio/Benchmark has to move.
 * @returns {promise} Promise which resolves to TRUE or ERROR message.
 */
PA3MainPage.prototype.moveAccountsWithinAccountDropdown = function(accountType, accountName, accountIndex, direction, noOfPositions) {
  // Declaring variables
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var _this = this;
  var accountReference;
  var arrowButton;

  // Check the type of parameter
  if (accountName === '' || accountName === 'NA') {
    accountName = undefined;
  } else if (accountIndex === '' || accountIndex === 'NA') {
    accountIndex = undefined;
  }

  // User can move the account either using the index or name of the account but not both
  // Check if both the parameter is passed
  if (accountName !== undefined && accountIndex !== undefined) {
    defer.reject('Pass either name or Index of account.');
  } else if (accountName !== undefined && accountIndex === undefined) {
    // Moving the account based on the account name
    // Get the reference of required account from the list
    accountReference = this.getSingleAccountFromList(accountType, accountName);

    // Check if required account found
    accountReference.isPresent().then(function(isPresent) {
      if (!isPresent) {
        defer.reject('"' + accountName + '" account not found in account dropdown.');
      } else {
        // Get the element into visibility
        Utilities.scrollElementToVisibility(accountReference);

        // Select the account
        accountReference.click();

        // Get the reference of arrow button based on the "direction" parameter
        var arrowButton = _this.getArrowButton(accountType, direction);

        // Check if button reference is collected
        arrowButton.isPresent().then(function(isPresent) {
          if (!isPresent) {
            defer.reject('"' + direction + '" arrow button is not found.');
          } else {
            for (var i = 0; i < noOfPositions; i++) {
              arrowButton.click();
            }

            defer.fulfill(true);
          }
        });
      }
    });
  } else if (accountName === undefined && accountIndex !== undefined) {
    // Get the reference of all accounts from Account Drop Down
    accountReference = _this.getListFromAccountDropdown(accountType).get(accountIndex - 1);

    // Get the element into visibility
    Utilities.scrollElementToVisibility(accountReference);

    // Select the account
    accountReference.click();

    // Get the reference of arrow button based on the "direction" parameter
    arrowButton = _this.getArrowButton(accountType, direction);

    // Check if button reference is collected
    arrowButton.isPresent().then(function(isPresent) {
      if (!isPresent) {
        defer.reject('"' + direction + '" arrow button is not found.');
      } else {
        for (var i = 0; i < noOfPositions; i++) {
          arrowButton.click();
        }

        defer.fulfill(true);
      }
    });
  } else if (accountName === undefined && accountIndex === undefined) {
    // This case will be used when user want to move the default selection
    // Get the reference of arrow button based on the "direction" parameter
    arrowButton = _this.getArrowButton(accountType, direction);

    // Check if button reference is collected
    arrowButton.isPresent().then(function(isPresent) {
      if (!isPresent) {
        defer.reject('"' + direction + '" arrow button is not found.');
      } else {
        for (var i = 0; i < noOfPositions; i++) {
          arrowButton.click();
        }

        defer.fulfill(true);
      }
    });
  }

  return promise;
};

/**
 * @function getAccountIndex
 * @description This function is used to get the index of account from the Account Drop Down
 * @param {string} accountType Account type from which index has to be collected.
 *                              Ex: Portfolio, Benchmark
 * @param {string} accountName Name of the account to find its index.
 *                              Ex: CLIENT:/DATA/FIRST_TEST_ACCT.ACCT, etc
 * @returns {promise} Promise which resolves to index value of the given account.
 */
PA3MainPage.prototype.getAccountIndex = function(accountType, accountName) {
  // Declaring variables
  var defer = protractor.promise.defer();
  var promise = defer.promise;

  // Get the reference of all the elements from Account Drop Down
  var allAccounts = this.getListFromAccountDropdown(accountType, true);

  // Mapping all each element reference to get the index of required element
  allAccounts.map(function(element, index) {
    return {
      text: element.getText(),
      index: index,
    };
  }).then(function(items) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].text.toLowerCase().trim() === accountName.toLowerCase()) {
        defer.fulfill(i + 1);
        break;
      }
    }

    defer.reject(accountName + ' not found in the "' + accountType + '\'s" "Account Drop Down" list.');
  });

  return promise;
};

/**
 * @function getDateHyperLink
 * @description This function is used to get reference of Date link inside Workspace
 * @param {string} [tileName] Name of the tile in which this hyperlink is present.
 *                            NOTE: When there are multiple tiles in the workspace and you don't pass "tileName" then
 *                            you'll get ambiguous reference.
 * @returns {promise} Returns the reference of Date Hyperlink.
 */
PA3MainPage.prototype.getDateHyperLink = function(tileName) {
  // Variable(s)
  var xpathDateHyperLink;

  if (tileName === undefined) {
    xpathDateHyperLink = '//*[@data-qa-id="workspace"]//*[@data-qa-class="hyperlink-dates"]';
  } else {
    xpathDateHyperLink = '//*[@data-qa-class="tile-header" and descendant::*[normalize-space(.)="' + tileName + '"]]' + '/ancestor::*[@data-qa-class="tile"]//following-sibling::*//*[@data-qa-class="hyperlink-dates"]';
  }

  return element(by.xpath(xpathDateHyperLink));
};

/**
 * @function getGroupingsHyperLink
 * @description This function is used to get reference of Grouping hyperlink from the top-left corner of report
 *               workspace. This is to identify that based on which groupings report is calculated.
 * @param {string} tileName Name of the tile in which this hyperlink is present.
 * @returns {promise} Returns the reference of Groupings Hyperlink.
 */
PA3MainPage.prototype.getGroupingsHyperLink = function(tileName) {
  var xpathGroupingsHyperLink = '//*[@data-qa-class="tile-header" and descendant::*[normalize-space(.)="' + tileName + '"]]' + '/ancestor::*[@data-qa-class="tile"]//following-sibling::*//*[@ng-click="ctrl.showGroupingsTab()"]';

  return element(by.xpath(xpathGroupingsHyperLink));
};

/**
 * @function getExclusionsHyperLink
 * @description This function is used to get reference of Exclusions hyperlink from the top-left corner of report
 *              workspace.
 * @param {string} tileName Name of the tile in which this hyperlink is present.
 * @returns {promise} Returns the reference of Exclusions Hyperlink.
 */
PA3MainPage.prototype.getExclusionsHyperLink = function(tileName) {
  var xpathExclusionsHyperLink = '//*[@data-qa-class="tile-header" and descendant::*[normalize-space(.)="' + tileName + '"]]' + '/ancestor::*[@data-qa-class="tile"]//following-sibling::*//pa-quick-links-exclusions//tf-infobox-link';

  return element(by.xpath(xpathExclusionsHyperLink));
};

/**
 * @function getAllItemsFromExcludedInfoBox
 * @description This function is used to get reference of all the items present in the Excluded InfoBox.
 * @param {string} tileName Name of the tile under which the info box is expected.
 * @returns {promise[]} Returns the array of references for all the items in Excluded InfoBox.
 */
PA3MainPage.prototype.getAllItemsFromExcludedInfoBox = function(tileName) {
  // Setting the default parameter value
  if (tileName === undefined) {
    tileName = '';
  }

  // Variable(s)
  var xpathInfoBoxItems = '//tf-infobox//*[@ng-repeat]';
  return element.all(by.xpath(xpathInfoBoxItems));
};

/**
 * @function getItemFromExcludedInfoBox
 * @description This function is used to get reference of particular item from Excluded Info Box.
 * @param {string} tileName Name of the tile under which the info box is expected.
 * @param {string} itemName Name of the item whose reference is required.
 * @returns {promise} Returns the reference for required item from Excluded InfoBox.
 */
PA3MainPage.prototype.getItemFromExcludedInfoBox = function(tileName, itemName) {
  // Setting the optional parameter
  if (tileName === undefined) {
    tileName = '';
  }

  var xpathItem = '//tf-infobox//*[contains(@class,"ng-valid")]//*[@ng-repeat and normalize-space(.)="' + itemName + '"]';
  return element(by.xpath(xpathItem));
};

/**
 * @function getEditExclusionsHyperlinkFromInfoBox
 * @description This function is used to get reference of "Edit Exclusions" hyperlink from exclusions info box.
 * @param {string} tileName Name of the tile under which the info box is expected.
 * @returns {promise} Returns the reference of "Edit Exclusions" hyperlink from info box.
 */
PA3MainPage.prototype.getEditExclusionsHyperlinkFromInfoBox = function(tileName) {
  // Setting the optional parameter
  if (tileName === undefined) {
    tileName = '';
  }

  var xpathEditExclusion = '//tf-infobox//div[text()="Edit Exclusions"]';
  return element(by.xpath(xpathEditExclusion));
};

/**
 * @function getWidgetBox
 * @description This function is used to get reference of either Portfolio or Benchmark widget.
 * @param {string} widgetName Specify name of the widget.
 *                            Ex: Portfolio or Benchmark
 * @returns {promise} Returns the reference of Widget reference.
 */
PA3MainPage.prototype.getWidgetBox = function(widgetName) {
  // Variable(s)
  var xpathTextBox = '//*[@data-qa-id="application-header-lookup-section"]//*[@tab="' + widgetName.toLowerCase() + '"]//input';
  return element(by.xpath(xpathTextBox));
};

/**
 * @function getTradeSimulationButton
 * @description This function is used to get reference of "Trade Simulation" button from application toolbar.
 * @returns {promise} Promise which resolves to reference of "Trade Simulation" button.
 */
PA3MainPage.prototype.getTradeSimulationButton = function() {
  var xpathButton = '//*[@data-qa-id="application-header-lookup-section"]//tf-button[normalize-space(.)="Trade Simulation"]';
  return element(by.xpath(xpathButton));
};

/**
 * @function getHeader
 * @description This function is used to get reference of header of application where selected Portfolio and Benchmark
 *              name is displayed.
 * @returns {promise} Promise which resolves to header reference.
 */
PA3MainPage.prototype.getHeader = function() {
  return element(by.xpath('//*[@data-qa-id="workspace-header"]'));
};

/**
 * @function getTypeahead
 * @description This function is used to get reference of Typeahead
 * @returns {promise} Promise which resolves to Typeahead reference.
 * Note: This function will return element reference only if the type ahead is visible
 */
PA3MainPage.prototype.getTypeahead = function() {
  return element(by.xpath('//*[@data-qa-class="typeahead-results"]'));
};

/**
 * @function getAllItemsFromTypeahead
 * @description This function is used to get the reference of all the items listed under typeahead
 * @returns {promise[]} Promise which resolve to array of references.
 */
PA3MainPage.prototype.getAllItemsFromTypeahead = function() {
  // Variable(s)
  var xpathTypeaheadList = '//*[@data-qa-id="idw-typeahead-results-filter-listbox-container"]//filter-listbox-item//typeahead-item';
  return element.all(by.xpath(xpathTypeaheadList));
};

/**
 * @function getOptionFromTypeaheadBasedOnIndex
 * @description This function is used to get reference of item based on specified index
 * either from 'Portfolio' or 'Benchmark' type ahead.
 * @param {number} index Specify the indexed value of the option
 * @returns {promise} Promise which resolves to Typeahead reference.
 *                    Note: This function will return element reference only if the type ahead is visible
 */
PA3MainPage.prototype.getOptionFromTypeaheadBasedOnIndex = function(index) {
  return element(by.xpath('//*[@data-qa-class="typeahead-results"]//*[@ng-repeat and @value="item"][' + index + ']'));
};

/**
 * @function getDialog
 * @description This function is used to get reference of any dialog box based on its title.
 * @param {string} titleOfDialog Title of the dialog
 * @returns {promise} Promise which resolves to dialog box reference.
 */
PA3MainPage.prototype.getDialog = function(titleOfDialog) {
  var xpathDialog = '//*[normalize-space(text())="' + titleOfDialog + '"]/ancestor::tf-dialog|' + '//span[.="' + titleOfDialog + '"]/ancestor::div[@role="dialog"]';
  return element(by.xpath(xpathDialog));
};

/**
 * @function getDialogWithText
 * @description This function is used to get reference of dialog box having the text.
 * @param {string} text Text displayed inside the dialog box.
 * @returns {promise} Promise which resolves to the reference of dialog.
 */
PA3MainPage.prototype.getDialogWithText = function(text) {
  var xpathDialog = '//*[@role="dialog" and descendant::*[normalize-space(.)=normalize-space("' + text + '")]]|' + '//*[normalize-space(text())="' + text + '"]/ancestor::tf-dialog';
  return element(by.xpath(xpathDialog));
};

/**
 * @function getButton
 * @description This function is used get the reference of a button from any pop-up or dialog box.
 * @param {string} btnName Name of the button whose reference is needed.
 * @returns {promise} Promise which resolves to reference of a button.
 */
PA3MainPage.prototype.getButton = function(btnName) {
  var xpathBtn = '//tf-dialog//tf-button[normalize-space(.)="' + btnName + '"]|' + '//*[@role="dialog"]//button[@type="button"][.="' + btnName + '"]';
  return element(by.xpath(xpathBtn));
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
PA3MainPage.prototype.isReportCalculated = function(reportName, checkForPresence) {
  // Set the default value for "checkForPresence" parameter
  if (checkForPresence === undefined) {
    checkForPresence = false;
  }

  var xpathCalculatedData = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="' + reportName + '"]]' + '//*[@options="ctrl.grid.options"]/descendant::*[contains(@class, "slick-cell")][1]';

  browser.wait(function() {
    return element(by.xpath(xpathCalculatedData)).isDisplayed().then(function(isfound) {
      return isfound;
    }, function() {
      return false;
    });
  }, 3000).then(function() {
  }, function() {
  });

  if (!checkForPresence) {
    return element(by.xpath(xpathCalculatedData)).isDisplayed();
  } else if (checkForPresence) {
    return element(by.xpath(xpathCalculatedData)).isPresent();
  }
};

/**
 * @function expandTreeInCalculatedReport
 * @description This function is used to expand given element tree from the calculated report
 * @param {string} reportName Name of the report whose tree element has to be expanded.
 * @param {string} elementPath Element Names which has to be expanded. If multiple element has to be expanded pass
 *                              their names separated by "|" symbol.
 * @param {string} [excludeElements] Name of the element(s) which has to be exclude from expand element list.
 *                                   For excluding multiple element from expanding pass their names separated by
 *                                   "|" symbol.
 *                                   Ex: To exclude 'Commercial Services' from 'Commercial Services|Advertising
 *                                   /Marketing Services' pass this parameter as 'Commercial Services'.
 * @param {string} [slickType = canvas ] This variable is to set the slick class of report that is calculated.
 *                                          It has two slick type classes, "Canvas" and "Pane".
 * @returns {promise} Promise which resolves to boolean value ie., TRUE if calculated data appeared on web page
 *                      otherwise FALSE.
 */
PA3MainPage.prototype.expandTreeInCalculatedReport = function(reportName, elementPath, excludeElements, slickType) {
  var arrElements = elementPath.split('|');
  var arrExcludedElements;
  var xpathExpandButton;

  // Setting the slick type
  if (slickType === undefined || slickType.toLowerCase() === 'canvas') {
    slickType = 'grid-canvas grid-canvas-bottom grid-canvas-left';
  } else if (slickType.toLowerCase() === 'pane') {
    slickType = 'slick-pane slick-pane-bottom slick-pane-left';
  } else if (slickType.toLowerCase() === 'top') {
    slickType = 'grid-canvas grid-canvas-top grid-canvas-left';
  }

  var xpathTable = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="' + reportName + '"]]' + '//*[@options="ctrl.grid.options"]/*[contains(@class, "slick-frozen-row") and not(contains(@class, "multi-header"))]';

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
      SlickGridFunctions.scrollRowToTop(reportName, tempRowIndex);
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
 * @function checkIfTreeExpandedInCalculatedReport
 * @description This function is used to verify if given tree is expanded or not in calculated report.
 * @param {string} reportName Name of the report whose tree element has to be verified.
 * @param {string} elementPath Element Names which has to be expanded. If multiple element has to be expanded pass
 *                              their names separated by "|" symbol.
 * @param {string} [slickType = canvas ] This variable is to set the slick class of report that is calculated.
 *                                         It has two slick type classes, "Canvas" and "Pane".
 * @returns {promise} Promise which resolves to boolean value ie., TRUE if calculated data appeared on
 * web page otherwise FALSE.
 */
PA3MainPage.prototype.checkIfTreeExpandedInCalculatedReport = function(reportName, elementPath, slickType) {
  var arrElements = elementPath.split('|');
  var xpathExpandButton;

  // Setting the slick type
  if (slickType === undefined || slickType.toLowerCase() === 'canvas') {
    slickType = 'grid-canvas grid-canvas-bottom grid-canvas-left';
  } else if (slickType.toLowerCase() === 'pane') {
    slickType = 'slick-pane slick-pane-bottom slick-pane-left';
  }

  var xpathTable = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="' + reportName + '"]]' + '//*[@options="ctrl.grid.options"]/*[contains(@class, "slick-frozen-row") and not(contains(@class, "multi-header"))]';

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

/**
 * @function getAllColumnOfCalculatedReport
 * @description This function is used to get the reference all columns of calculated report.
 * @param {string} reportName Name of the report whose column references has to be collected
 * @returns {Promise[]} promise which resolves to the array of column references.
 */
PA3MainPage.prototype.getAllColumnOfCalculatedReport = function(reportName) {
  var xpathTable = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="' + reportName + '"]]' + '//*[@options="ctrl.grid.options"]/*[contains(@class, "slick-frozen-rows") and not(contains(@class, "multi-header"))]';
  var xpathColumns = xpathTable + '//*[contains(@class, "slick-column-name-text")][text()]';
  return element.all(by.xpath(xpathColumns));
};

/**
 * @function getColumnIndexFromCalculatedReport
 * @description This function is used to get index of column from calculated report.
 * @param {string} reportName Name of the report in which you expect the column to be.
 * @param {number} colName Name of the column whose index has to be found.
 * @param {number} [occurrenceNumber=1] As there could be same column repeated in multi-header scenario, we can pass the
 *                                  what occurrence of the column is needed.
 * @returns {promise} Promise which resolves index of the given column.
 */
PA3MainPage.prototype.getColumnIndexFromCalculatedReport = function(reportName, colName, occurrenceNumber) {
  // Variable(s)
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var counter = 1;

  // Setting default value of "occurrenceNumber"
  if (occurrenceNumber === undefined) {
    occurrenceNumber = 1;
  }

  this.getAllColumnOfCalculatedReport(reportName).map(function(ele, index) {
    // Make the element visible on screen if not already
    Utilities.makeElementVisible(ele);
    return {
      index: index,
      text: ele.getText(),
    };
  }).then(function(items) {
    for (var i = 0; i < items.length; i++) {
      var name = items[i].text.replace(/\n/g, ' ');
      if (colName === name) {
        if (occurrenceNumber === counter) {
          defer.fulfill(i + 1);
          break;
        } else {
          counter += 1;
        }
      }
    }

    defer.reject('"' + colName + '" column not found in the "' + reportName + '" calculated report.');
  });
  return promise;
};

/**
 * @function getValueFromCalculatedReport
 * @description This function is used to get value from specified cell of calculated report.
 * @param {string} reportName Name of the report for which calculation is done.
 * @param {string} rowName Name of the row. Ex: Finance ( It is a grouping name )
 * @param {string} colName Name of the column. Ex: Port. Weight
 * @param {string} rowClassName Name of the class from DOM in which all the row names exists.
 *                              Ex: slick-pane slick-pane-top slick-pane-right
 * @param {string} colClassName Name of the class from DOM in which all the column names exists.
 *                              Ex: slick-pane slick-pane-top slick-pane-left
 * @param {string} [needCellReference = false] true : to get the reference of the cell/ false : to get the cell value
 * @param {number} [rowIndex=0] Index of the row whose cell value is required.
 * @returns {promise} Promise which resolves to the cell value.
 */
PA3MainPage.prototype.getValueFromCalculatedReport = function(reportName, rowName, colName, rowClassName, colClassName, needCellReference, rowIndex) {
  var defer = protractor.promise.defer();
  var xpathRow;
  var xpathCol;
  var rowReference;
  var cellReference;
  var promise = defer.promise;
  var _this = this;

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

  var xpathTable = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="' + reportName + '"]]' + '//*[@options="ctrl.grid.options"]/*[contains(@class, "slick-frozen-rows") and not(contains(@class, "multi-header"))]';

  // XPATH of required row
  xpathRow = xpathTable + '//*[contains(@class, "' + rowClassName + '")]' + '//*[contains(@class, "slick-row") and descendant::*[normalize-space(.)="' + rowName + '"]]';

  // Get the reference of required row
  rowReference = element.all(by.xpath(xpathRow)).get(rowIndex);
  rowReference.isPresent().then(function(isRowPresent) {
    if (!isRowPresent) {
      // If required row is not found reject the promise with error message
      defer.reject('"' + rowName + '" row is not found in the calculated reported.');
    } else {
      // Get the "style" attribute value of the row
      var eleRefs = rowReference.getAttribute('style');

      eleRefs.then(function() {
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          eleRefs = rowReference.getAttribute('style');
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      eleRefs.then(function(attrValue) {
        xpathCol = xpathTable + '//*[contains(@class, "' + colClassName + '")]' + '//div[@style="' + attrValue.replace(/[\s;]/g, '') + '"]';

        // Get the column index
        _this.getColumnIndexFromCalculatedReport(reportName, colName).then(function(colIndex) {
          xpathCol += '/*[contains(@class, "slick-cell l' + colIndex + ' r' + colIndex + '")]';

          // Get the reference required cell
          cellReference = element(by.xpath(xpathCol));

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
 * @function getAllElementFromSpecifiedLevelOfCalculatedReport
 * @description This function is used to get reference of all the elements from calculated report based on the level
 *              specified.
 * @param {string} reportName Name of the report for which calculation is done.
 * @param {number} levelNumber Tree level number. Based on this number all the elements from this level will be
 *                             collected.
 * @param {string} [colClassReference] Name of the class from DOM in which all the column names exists.
 *                              Ex: slick-pane slick-pane-top slick-pane-left.
 * @returns {Promise[]} Promise which resolves to array of references of elements from specified level.
 * NOTE: You can get references only for elements which are visible on the web page.
 */
PA3MainPage.prototype.getAllElementFromSpecifiedLevelOfCalculatedReport = function(reportName, levelNumber, colClassReference) {
  var xpathLevelElements;

  if (colClassReference === undefined) {
    colClassReference = 'grid-canvas grid-canvas-bottom grid-canvas-left';
  }

  var xpathTable = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="' + reportName + '"]]' + '//*[@options="ctrl.grid.options"]/*[contains(@class, "expandable") and not(contains(@class, "multi-header"))]';

  if (levelNumber === 1) {
    xpathLevelElements = xpathTable + '//*[contains(@class, "' + colClassReference + '")]' + '//*[@class="indent0"]/ancestor::*[contains(@class, "slick-cell")][1]';
  } else if (levelNumber === 2) {
    xpathLevelElements = xpathTable + '//*[contains(@class, "' + colClassReference + '")]' + '//*[@class="indent" and contains(@style, "width: 40px;")]/ancestor::*[contains(@class, "slick-cell")][1]';
  } else {
    xpathLevelElements = xpathTable + '//*[contains(@class, "' + colClassReference + '")]' + '//*[@class="indent" and contains(@style, "width: ' + 20 * parseInt(levelNumber) + 'px;")]' + '/ancestor::*[contains(@class, "slick-cell")][1]';
  }

  return element.all(by.xpath(xpathLevelElements));
};

/**
 * @function getAllElementsFromCalculatedReport
 * @description This function is used to get reference of all the elements from calculated report
 * @param {string} reportName Name of the report for which calculation is done.
 * @param {string} rowClassName Name of the class from DOM in which all the row names exists.
 *                              Ex: slick-pane slick-pane-top slick-pane-right
 * @returns {Promise[]} Promise which resolves to array of references of elements from calculated report.
 */
PA3MainPage.prototype.getAllElementsFromCalculatedReport = function(reportName, rowClassName) {
  var xpathTable = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="' + reportName + '"]]' + '//*[@options="ctrl.grid.options"]/*[contains(@class, "slick-frozen-rows") and not(contains(@class, "multi-header"))]';
  var xpathElements = xpathTable + '//*[contains(@class, "' + rowClassName + '")]//*[contains(@class, "slick-cell")]';

  return element.all(by.xpath(xpathElements));
};

/**
 * @function getNextElementToGivenTreeElement
 * @description This function is used to get reference next element to the given tree element
 * @param {string} reportName Name of the report for which calculation is done.
 * @param {string} treeElementName  Name of the tree element whose next tree element reference is needed
 * @returns {promise} Promise which resolves reference of next tree element of given tree element.
 */
PA3MainPage.prototype.getNextElementToGivenTreeElement = function(reportName, treeElementName) {
  var xpathNextRow;
  var elements = treeElementName.split('|');
  var xpathTable = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="' + reportName + '"]]' + '//*[@options="ctrl.grid.options"]/*[contains(@class, "expandable") and not(contains(@class, "multi-header"))]';

  // XPATH of required row
  if (elements.length === 1) {
    xpathNextRow = xpathTable + '//*[contains(@class, "grid-canvas grid-canvas-bottom grid-canvas-left")]//*[@class="indent0"]' + '/ancestor::*[contains(@class, "slick-row")][normalize-space(.)="' + elements[0] + '"]' + '/following-sibling::*//*[@class="indent0"]/ancestor::div[contains(@class, "slick-row")][1]';
  } else if (elements.length === 2) {
    xpathNextRow = xpathTable + '//*[contains(@class, "grid-canvas grid-canvas-bottom grid-canvas-left")]//*[@class="indent0"]' + '/ancestor::*[contains(@class, "slick-row")][normalize-space(.)="' + elements[0] + '"]/following-sibling::*//*[@class="indent" ' + 'and contains(@style, "40px")]/ancestor::*[contains(@class, "slick-row")][normalize-space(.)="' + elements[1] + '"]' + '/following-sibling::*//*[@class="indent" and contains(@style, "40px")]/ancestor::*[contains(@class, "slick-row")][1]';
  } else {
    xpathNextRow = xpathTable + '//*[contains(@class, "grid-canvas grid-canvas-bottom grid-canvas-left")]//*[@class="indent0"]' + '/ancestor::*[contains(@class, "slick-row")][normalize-space(.)="' + elements[0] + '"]/following-sibling::*//*[@class="indent" ' + 'and contains(@style, "40px")]/ancestor::*[contains(@class, "slick-row")][normalize-space(.)="' + elements[1] + '"]';

    for (var i = 3; i <= elements.length; i++) {
      xpathNextRow += '/following-sibling::*//*[@class="indent" and contains(@style, "' + 20 * i + 'px")]' + '/ancestor::*[contains(@class, "slick-row")][normalize-space(.)="' + elements[i] + '"]';
    }

    xpathNextRow += '/following-sibling::*//*[@class="indent" and contains(@style, "' + 20 * elements.length + 'px")]' + '/ancestor::*[contains(@class, "slick-row")][1]';
  }

  return element(by.xpath(xpathNextRow));
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
 * @returns {promise} Promise which resolves to element reference from specified level of calculated report
 * NOTE: You can get reference only for elements which are visible on the web page.
 */
PA3MainPage.prototype.getElementFromSpecifiedLevelOfCalculatedReport = function(reportName, levelNumber, elementName, rowClassName) {
  var xpathLevelElements;
  var xpathTable;

  // Set values for optional parameter
  if (rowClassName === undefined) {
    rowClassName = 'grid-canvas grid-canvas-bottom grid-canvas-left';
  }

  xpathTable = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="' + reportName + '"]]' + '//*[@options="ctrl.grid.options"]/*[contains(@class, "slick-frozen-row") and not(contains(@class, "multi-header"))]';

  if (levelNumber === 1) {
    xpathLevelElements = xpathTable + '//*[contains(@class, "' + rowClassName + '")]' + '//*[@class="indent0"]/ancestor::*[contains(@class, "slick-row") and descendant::*[normalize-space(.)="' + elementName + '"]]';
  } else if (levelNumber === 2) {
    xpathLevelElements = xpathTable + '//*[contains(@class, "' + rowClassName + '")]' + '//*[@class="indent" and contains(@style, "width: 40px;")]/ancestor::*[contains(@class, "slick-row") ' + 'and descendant::*[normalize-space(.)="' + elementName + '"]]';
  } else {
    xpathLevelElements = xpathTable + '//*[contains(@class, "' + rowClassName + '")]' + '//*[@class="indent" and contains(@style, "width: ' + 20 * parseInt(levelNumber) + 'px;")]' + '/ancestor::*[contains(@class, "slick-row") and descendant::*[normalize-space(.)="' + elementName + '"]]';
  }

  return element(by.xpath(xpathLevelElements));
};

/**
 * @function getElementFromCalculatedTree
 * @description This function is used to get reference of specified element from tree of calculated report
 * @param {string} reportName Name of the report for which calculation is done.
 * @param {string} treeName Path of element. Suppose element "C" falls under "B" which in turn falls under "A" then we
 *                          should pass this parameter as "A|B".
 *                          Please note that separate the tree element name with "|" symbol.
 * @param {string} elementName Name of the element whose reference has to be collected.
 * @param {string} [rowClassName = grid-canvas grid-canvas-bottom grid-canvas-left ] This variable is used to pass the
 *                  class name of the rows from the DOM tree.
 * @returns {promise} Promise which resolves to element reference from calculated report
 * NOTE: You can get reference only for elements which are visible on the web page.
 */
PA3MainPage.prototype.getElementFromCalculatedTree = function(reportName, treeName, elementName, rowClassName) {
  var xpathParents;
  var xpathElement;
  var xpathTable;
  var xpathRows;
  var treeElements = treeName.split('|');

  // Set values for optional parameter
  if (rowClassName === undefined) {
    rowClassName = 'grid-canvas grid-canvas-bottom grid-canvas-left';
  }

  xpathTable = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="' + reportName + '"]]' + '//*[@options="ctrl.grid.options"]/*[contains(@class, "expandable") and not(contains(@class, "multi-header"))]';

  xpathRows = xpathTable + '//*[contains(@class, "' + rowClassName + '")]';

  if (treeElements.length === 1) {
    xpathParents = xpathRows + '//*[contains(@class, "slick-row") and descendant::*[@class="indent0"]]' + '[normalize-space(.)="' + treeElements[0] + '"]';

    xpathElement = xpathParents + '/following-sibling::*[contains(@class, "slick-row") and descendant::*[@class="indent" ' + 'and contains(@style, "width: 40px;")] and descendant::*[normalize-space(.)="' + elementName + '"]][1]';
  } else if (treeElements.length === 2) {
    xpathParents = xpathRows + '//*[contains(@class, "slick-row") and descendant::*[@class="indent0"]]' + '[normalize-space(.)="' + treeElements[0] + '"]/following-sibling::*[contains(@class, "slick-row") and ' + 'descendant::*[@class="indent" and contains(@style, "width: 40px;")]][normalize-space(.)="' + treeElements[1] + '"][1]';

    xpathElement = xpathParents + '/following-sibling::*[contains(@class, "slick-row") and descendant::*[@class="indent" ' + 'and contains(@style, "width: 60px;")] and descendant::*[normalize-space(.)="' + elementName + '"]][1]';
  } else {
    xpathParents = xpathRows + '//*[contains(@class, "slick-row") and descendant::*[@class="indent0"]]' + '[normalize-space(.)="' + treeElements[0] + '"]/following-sibling::*[contains(@class, "slick-row") and ' + 'descendant::*[@class="indent" and contains(@style, "width: 40px;")]][normalize-space(.)="' + treeElements[1] + '"][1]';

    for (var i = 0; i < treeElements.length - 2; i++) {
      xpathParents += '/following-sibling::*[contains(@class, "slick-row") and ' + 'descendant::*[@class="indent" and contains(@style, "width: ' + 20 * parseInt(i + 3) + 'px;")]]' + '[normalize-space(.)="' + treeElements[i + 2] + '"][1]';
    }

    xpathElement = xpathParents + '/following-sibling::*[contains(@class, "slick-row") and descendant::*[@class="indent" ' + 'and contains(@style, "width: ' + 20 * parseInt(treeElements.length + 1) + 'px;")] and ' + 'descendant::*[normalize-space(.)="' + elementName + '"]][1]';
  }

  return element(by.xpath(xpathElement));
};

/**
 * @function getAllCellsOfGivenColumn
 * @description This function is used to get reference of all the cells from a particular column
 * @param {string} reportName Name of the report whose report is calculated.
 * @param {string} colName Name of the column Ex: Port. Weight
 * @param {string} elementName Name of the element whose reference has to be collected.
 * @param {string} colClassName Name of the class from DOM in which all the column names
 *                              Ex: slick-pane slick-pane-top slick-pane-left
 * @returns {Promise[]}  Promise which resolves to the array of cell references from the given column.
 */
PA3MainPage.prototype.getAllCellsOfGivenColumn = function(reportName, colName, colClassName) {
  // Variable(s)
  var defer = protractor.promise.defer();
  var xpathCol;
  var cellReferences;
  var promise = defer.promise;
  var xpathTable = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="' + reportName + '"]]' + '//*[@options="ctrl.grid.options"]/*[contains(@class, "slick-frozen-rows") and not(contains(@class, "multi-header"))]';

  xpathCol = xpathTable + '//*[contains(@class, "' + colClassName + '")]';

  // Get the column index
  this.getColumnIndexFromCalculatedReport(reportName, colName).then(function(colIndex) {
    xpathCol += '//*[contains(@class, "slick-cell")  and contains(@class, "l' + colIndex + ' r' + colIndex + '")]';

    // Get the reference cells of particular column
    cellReferences = element.all(by.xpath(xpathCol));

    defer.fulfill(cellReferences);
  }, function(err) {
    defer.reject(err);
  });

  return promise;
};

/**
 * @function getColumnCellsHavingSpecifiedValue
 * @description This function is used to get reference of all the cells from a particular column which is
 *              having the specified value.
 * @param {string} reportName Name of the report whose report is calculated.
 * @param {string} colName Name of the column.
 *                  Example: Port. Weight
 * @param {string} colClassName Name of the class from DOM in which all the column names exists.
 *                  Ex: slick-pane slick-pane-top slick-pane-left
 * @param {string} requiredCellValue equired value in the cells.
 * @returns {promise} Promise which resolves to the array of cell references from the given column.
 */
PA3MainPage.prototype.getColumnCellsHavingSpecifiedValue = function(reportName, colName, colClassName, requiredCellValue) {
  // Variable(s)
  var defer = protractor.promise.defer();
  var xpathCol;
  var cellReferences;
  var promise = defer.promise;
  var xpathTable = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="' + reportName + '"]]' + '//*[@options="ctrl.grid.options"]/*[contains(@class, "expandable") and not(contains(@class, "multi-header"))]';

  xpathCol = xpathTable + '//*[contains(@class, "' + colClassName + '")]';

  // Get the column index
  this.getColumnIndexFromCalculatedReport(reportName, colName).then(function(colIndex) {
    xpathCol += '//*[contains(@class, "slick-row") and descendant::*[contains(@class, "l' + colIndex + ' r' + colIndex + '") ' + 'and normalize-space(.)="' + requiredCellValue + '"]]';

    // Get the reference cells of particular column
    cellReferences = element.all(by.xpath(xpathCol));

    defer.fulfill(cellReferences);
  });

  return promise;
};

/**
 * @function getRowNameHavingSpecifiedAttribute
 * @description This function is used to get names of all the rows in calculated report which is having the specific
 *              attribute with specified attribute value.
 * @param {string} reportName Name of the report whose report is calculated.
 * @param {string} rowClassName Name of the class from DOM in which all the row names exists.
 *                  Example: 'slick-pane slick-pane-top slick-pane-left'
 * @param {string} attrName Attribute name of row based on which reference is collected.
 *                  Example: style
 * @param {string} attrValue Value of the attribute.
 * @returns {promise} Promise which resolves to the name of the row.
 */
PA3MainPage.prototype.getRowNameHavingSpecifiedAttribute = function(reportName, rowClassName, attrName, attrValue) {
  var xpathTable = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="' + reportName + '"]]' + '//*[@options="ctrl.grid.options"]/*[contains(@class, "expandable") and not(contains(@class, "multi-header"))]';

  // XPATH of row having the specified attribute
  var xpathRow = xpathTable + '//*[contains(@class, "' + rowClassName + '")]//*[contains(@class, "slick-cell") and ' + 'ancestor::*[contains(@class, "slick-row") and contains(@' + attrName.toLowerCase() + ', "' + attrValue + '")]][text()][1]';

  return element(by.xpath(xpathRow)).getText();
};

/**
 * @function rightClickAndSelectOption
 * @description This function is used to perform right click on the given element and select option
 *              from the menu list that appear.
 * @param {string} eleRef Reference of the element on which right click has to be performed.
 * @param {string} menuItemPath The menu item which has to be selected from the menu list. If you want to select
 *                 item from the sub-menu list then you have to pass the menu item path in which it exists along
 *                 with the item name separated by "|".
 *                 Ex:"Exclusions|Clear Hidden".
 * @returns NA
 */
PA3MainPage.prototype.rightClickAndSelectOption = function(eleRef, menuItemPath) {
  // Variable(s)
  var xpathMenuItem;
  var items = menuItemPath.split('|');

  // Right click on the given element reference
  browser.actions().mouseMove(eleRef).perform(); // Move the mouse over the element
  browser.actions().click(protractor.Button.RIGHT).perform(); // Perform right click operation

  // Last menu item in "items" array would be selected from right click menu
  if (items.length === 1) {
    xpathMenuItem = '//*[contains(@class, "context-menu")]/li[normalize-space(text())="' + items[0] + '"]';
  } else {
    xpathMenuItem = '//*[contains(@class, "context-menu")]/li[normalize-space(text())="' + items[0] + '"]';

    // Hover over the menu element
    browser.actions().mouseMove(element(by.xpath(xpathMenuItem))).perform();
    browser.sleep(5000); // Waiting for sub-menu list to appear

    for (var i = 1; i < items.length; i++) {
      xpathMenuItem += '//li[normalize-space(text())="' + items[i] + '"]';

      // Hover over the menu element
      browser.actions().mouseMove(element(by.xpath(xpathMenuItem))).perform();
      browser.sleep(5000); // Waiting for sub-menu list to appear
    }
  }

  // Click on the menu item
  element(by.xpath(xpathMenuItem)).click().then(function() {
  }, function(error) {
    expect(false).customError(error);
    CommonFunctions.takeScreenShot();
  });
};

/**
 * @function rightClickOnGivenElement
 * @description This function is used to perform right click on the given element.
 * @param {string} eleRef Reference of the element on which right click has to be performed.
 * @returns {promise} Promise which resolves to TRUE if menu list appear otherwise FALSE.
 */
PA3MainPage.prototype.rightClickOnGivenElement = function(eleRef) {
  // Variable(s)
  var defer = protractor.promise.defer();
  var promise = defer.promise;

  // Right click on the given element reference
  browser.actions().mouseMove(eleRef).perform(); // Move the mouse over the element
  browser.actions().click(protractor.Button.RIGHT).perform(); // Perform right click operation

  // Check if menu list appeared after performing right click
  element(by.xpath('//*[contains(@class, "context-menu")]')).isPresent().then(function(menuFound) {
    if (menuFound) {
      defer.fulfill(true);
    } else {
      defer.reject(false);
    }
  });

  return promise;
};

/**
 * @function getOptionFromCustomMenu
 * @description This function is used to get the reference of option from menu list appeared after performing
 *              right click on some element.
 * @param {string} optionPath This variable is used to pass option name. If required option is sub-option then
 *                  you have to pass the option path in which it exists along with the parent option name
 *                  separated by "|". Ex: [ 'Entity Structure', 'Expand All', 'Exclusions|Clear Hidden']
 * @returns {promise} Promise which resolves to the reference of required option.
 */
PA3MainPage.prototype.getOptionFromCustomMenu = function(optionPath) {
  // Variable(s)
  var xpathOption;

  var items = optionPath.split('|');

  // Last menu item in "items" array would be selected from right click menu
  if (items.length === 1) {
    xpathOption = '//*[contains(@class, "context-menu")]/li[normalize-space(text())="' + items[0] + '"]';
  } else {
    xpathOption = '//*[contains(@class, "context-menu")]/li[normalize-space(text())="' + items[0] + '"]';

    for (var i = 1; i < items.length; i++) {
      // Hover over the menu element
      browser.actions().mouseMove(element(by.xpath(xpathOption))).perform();
      browser.sleep(2000); // Waiting for sub-menu list to appear

      xpathOption += '//li[normalize-space(text())="' + items[i] + '"]';
    }
  }

  return element(by.xpath(xpathOption));
};

/**
 * @function getAllExpandCollapseButtonsFromCalculatedReport
 * @description This function is used to get reference of all Expand/Collapse button from calculated report.
 * @param {string} reportName Name of the report for which calculation is done.
 * @param {string} [rowClassName=grid-canvas grid-canvas-bottom grid-canvas-left] This variable is used to pass the
 *                  class name of the rows from the DOM tree.
 * @returns {promise} Promise which resolves to array of references of Expand/Collapse button from
 *                      calculated report
 * NOTE: You can get references only for buttons that are visible on the web page.
 */
PA3MainPage.prototype.getAllExpandCollapseButtonsFromCalculatedReport = function(reportName, rowClassName) {
  var xpathTable;
  var xpathExpandCollapseButton;

  // Set values for optional parameter
  if (rowClassName === undefined) {
    rowClassName = 'grid-canvas grid-canvas-bottom grid-canvas-left';
  }

  xpathTable = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="' + reportName + '"]]' + '//*[@options="ctrl.grid.options"]/*[contains(@class, "expandable") and not(contains(@class, "multi-header"))]';

  xpathExpandCollapseButton = xpathTable + '//*[contains(@class, "' + rowClassName + '")]//*[contains(@class, "slick-row") ' + 'and descendant::i]//i';

  return element.all(by.xpath(xpathExpandCollapseButton));
};

/**
 * @function getReportCachingAlertIcon
 * @description This function is used to get reference of report cache alert icon.
 * @param {string} reportName Name of the report from which alert icon is needed.
 * @returns {promise} Promise which resolves to the reference of alert icon from the specified report.
 * NOTE: You can get the reference only when report is showing the cached data.
 */
PA3MainPage.prototype.getReportCachingAlertIcon = function(reportName) {
  var xpathAlertIcon = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="' + reportName + '"]]' + '//*[@data-qa-class="tile-header"]/*[@ng-show="ctrl.shouldShowTileAlerts()"]//tf-infobox-link';
  return element(by.xpath(xpathAlertIcon));
};

/**
 * @function getCachedData
 * @description This function is used to get reference of report cache text.
 * @param {string} [tileName] Name of the tile from which cached message reference is required
 * @returns {promise} Promise which resolves to reference of cached message next to Footnotes button.
 * NOTE: You can get the reference only when report is showing the cached data.
 */
PA3MainPage.prototype.getCachedData = function(tileName) {
  // Variable(s)
  var xpathCachedData;
  if (tileName === undefined) {
    xpathCachedData = '//*[@data-qa-id="footnotes-button"  and descendant::*[normalize-space(.)="Footnotes"] ]/ancestor::' + '*//following-sibling::*[@data-qa-id="caching-message"]';
  } else {
    xpathCachedData = '//*[@data-qa-class="tile"]//*[@data-qa-class="tile-header" and normalize-space(.)="' + tileName + '"]' + '//ancestor::tf-tile-header-container/following-sibling::*//*[@data-qa-id="footnotes-button"]/ancestor::tf-content-column' + '/following-sibling::*[@data-qa-id="caching-message"]';
  }

  return element(by.xpath(xpathCachedData));
};

/**
 * @function getCurrencyDropDown
 * @description This function is used to get reference of "Currency" the drop down.
 * @returns {promise} Returns the reference of "Currency" the drop down.
 */
PA3MainPage.prototype.getCurrencyDropDown = function() {
  // XPATH for "Currency" drop down
  var xpathCurrencyDropDown = '//*[@data-qa-id="application-header"]//*[@data-qa-id="dropdown-pricing-currency"]';

  return element(by.xpath(xpathCurrencyDropDown));
};

/**
 * @function getDropDownItem
 * @description This function is used to get reference of element from any of the drop down.
 * @param {string} item Drop down item for which reference is needed. Ex: FactSet, MSCI etc
 * @returns {promise} Returns the reference of passed element.
 */
PA3MainPage.prototype.getDropDownItem = function(item) {
  var xpathItem = '//tf-dropdown//*[@data-qa-class="dropdown-option" and normalize-space(.)="' + item + '"][1]';

  return element.all(by.xpath(xpathItem)).first();
};

/**
 * @function getChartHasChangedDialogTextBox
 * @description This function is used to get the reference of the chart name textbox from the "Chart has changed" dialog
 * @returns {promise} Returns the reference for the text box[ Needs QA Attribute ]
 */
PA3MainPage.prototype.getChartHasChangedDialogTextBox = function() {
  var xpathTextBox = '//*[@role="dialog"]//input';
  return element(by.xpath(xpathTextBox));
};

/**
 * @function getChartHasChangedDialogButton
 * @description This function is used get the reference of a button from the "Chart has changed" dialog.
 * @param {string} btnName Name of the button whose reference is needed.
 * @returns {promise} Promise which resolves to reference of a button.
 */
PA3MainPage.prototype.getChartHasChangedDialogButton = function(btnName) {
  var xpathBtn = '//*[@role="dialog"]//*[@class="tf-button-content"]//*[normalize-space(.)="' + btnName + '"]';
  return element(by.xpath(xpathBtn));
};

/**
 * @function getAllMultiHeaderColumns
 * @description This function is used to get reference of all Multi Headers.
 * @param {string} reprotName Name of the report for which calculation is done.
 * @returns {promise} Promise which resolves to array of references of all Multi Headers.
 */
PA3MainPage.prototype.getAllMultiHeaderColumns = function(reportName) {
  // Variable(s)
  var xpathTableWithMultiHeader;
  var xpathAllMultiHeaderColumns;

  xpathTableWithMultiHeader = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="' + reportName + '"]]' + '//*[@options="ctrl.grid.options"]';

  xpathAllMultiHeaderColumns = xpathTableWithMultiHeader + '//*[contains(@class, \"multi-header-slick-row\")]' + '//*[contains(@class, "slick-cell") and text()]';

  return element.all(by.xpath(xpathAllMultiHeaderColumns));
};

/**
 * @function getCellValueForMultiHeaderColumn
 * @description This function is used to get the specific cell value in a calculated report of a given row
 *              which is having multi header in columns.
 * @param {string} reprotName Name of the report for which calculation is done.
 * @param {string} rowName Name of the row whose required cell value is available.
 *                  Example: '7/31/2014 to 8/29/2014'.
 * @param {number} colIndex Index of the column whose required cell value is available. Ex: 1
 * @param {string} rowClass Name of the class from DOM in which all the row names exists.
 *                  Example: 'slick-pane slick-pane-top slick-pane-left'
 * @param {string} colClass Name of the class from DOM in which all the row names exists.
 *                  Example: 'slick-pane slick-pane-top slick-pane-right'
 * @param {boolean} [needCellReference=false] true : to get the reference of the cell, false : to get the cell value
 * @param {number} [rowIndex] Index of the row whose required cell value is required.
 *                  Ex: 1
 * @returns {promise} Promise which resolves to value of required cell value with in a specified row of
 *                      calculated report
 */
PA3MainPage.prototype.getCellValueForMultiHeaderColumn = function(reportName, rowName, colIndex, rowClass, colClass, needCellReference, rowIndex) {
  // Variable(s)
  var xpathTable = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="' + reportName + '"]]' + '//*[@options="ctrl.grid.options"]/*[contains(@class, "slick-frozen-rows") and not(contains(@class, "multi-header"))]';
  var defer = protractor.promise.defer();
  var xpathRow;
  var xpathCol;
  var rowReference;
  var cellReference;
  var promise = defer.promise;

  if (needCellReference === undefined) {
    needCellReference = false;
  }

  if (rowIndex === undefined || rowIndex === 0) {
    rowIndex = 0;
  } else if (rowIndex > 0) {
    rowIndex = rowIndex - 1;
  }

  // XPATH of required row
  xpathRow = xpathTable + '//*[contains(@class, "' + rowClass + '")]' + '//*[contains(@class, "slick-row") and descendant::*[normalize-space(.)="' + rowName + '"]]';

  // Get the reference of required row
  rowReference = element.all(by.xpath(xpathRow)).get(rowIndex);
  rowReference.isPresent().then(function(isRowPresent) {
    if (!isRowPresent) {
      // If required row is not found reject the promise with error message
      defer.reject('"' + rowName + '" row is not found in the calculated reported.');
    } else {
      // Get the "style" attribute value of the row
      rowReference.getAttribute('style').then(function(attrValue) {
        // XPATH for required column
        xpathCol = xpathTable + '//*[contains(@class, "' + colClass + '")]' + '//div[@style="' + attrValue.replace(/[\s;]/g, '') + '"]';

        xpathCol += '/*[contains(@class, "slick-cell l' + colIndex + ' r' + colIndex + '")]';

        // Get the reference required cell
        cellReference = element(by.xpath(xpathCol));

        // Scroll cell reference into visibility.
        Utilities.scrollElementToVisibility(cellReference);

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
 * @function getListofColumnHeaderForJustificationAndWidth
 * @description This function is used to get references of all columns Headers for Justification and Width purpose
 * @param {string} reprotName Name of the report for which headers are required.
 * @returns {promise} Promise which resolves to array of references of all columns of Header.
 */
PA3MainPage.prototype.getListofColumnHeaderForJustificationAndWidth = function(reportName) {

  var xpathColsList = '//*[@class="tile-header" and descendant::*[normalize-space(.)="' + reportName + '"]]' + '/following-sibling::*//*[contains(@class,"slick-header-columns")]/*[contains(@class,"slick-header-column grid")]';
  return element.all(by.xpath(xpathColsList));
};

/**
 * @function setOptionFromWrenchMenu
 * @description This function is used to check or un-check an option in Wrench menu.
 * @param {boolean} set Boolean value, TRUE to select, FALSE to deselect.
 * @param {string} optionPath Complete path of an option in Wrench menu.
 *                  Ex: Analytics Overrides|Enable Overrides
 * @returns {promise} Promise which resolved to boolean value. TRUE if option is checked, FALSE otherwise.
 * Note: Should click Wrench icon before using this function.
 */
PA3MainPage.prototype.setOptionFromWrenchMenu = function(set, optionPath) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var _this = this;

  // Check if option has to be selected.
  if (set) {
    // Verifying if the option is already checked.
    // If yes, just fulfill the promise
    _this.isOptionChecked(optionPath).then(function(selected) {
      if (!selected) {
        _this.getOptionFromWrenchMenu(optionPath).click();

        // Click the "Wrench" button to get the drop down menu.
        _this.getWrenchIcon().click();

        _this.getWrenchIcon(true).isPresent().then(function(result) {
          if (result) {
            // Check if the option is selected.
            _this.isOptionChecked(optionPath).then(function(selected) {
              if (selected) {
                defer.fulfill(true);
              } else {
                CommonFunctions.takeScreenShot('autoCalcNotSelected');
                defer.fulfill(false);
              }

              // Click the "Wrench" button to close the drop down
              _this.getWrenchIcon().click();
            });
          }
        });
      } else {
        defer.fulfill(true);

        // Click the "Wrench" button to close the drop down
        _this.getWrenchIcon().click();
      }
    });
  } else {
    // Execute this block when you want to un-check the option.
    _this.isOptionChecked(optionPath).then(function(selected) {
      if (selected) {
        _this.getOptionFromWrenchMenu(optionPath).click();

        // Click the "Wrench" button to get the drop down menu
        _this.getWrenchIcon().click();

        // Check if option is deselected
        _this.isOptionChecked(optionPath).then(function(selected) {
          if (!selected) {
            defer.fulfill(true);
          } else {
            CommonFunctions.takeScreenShot('autoCalcStateAfterPerformingUnchecking');
            defer.fulfill(false);
          }

          // Click the "Wrench" button to close the drop down
          _this.getWrenchIcon().click();
        });
      } else {
        defer.fulfill(true);

        // Click the "Wrench" button to close the drop down
        _this.getWrenchIcon().click();
      }
    });
  }

  return promise;
};

/**
 * @function isOptionChecked
 * @description This function is used to get the "checked" status of an option from Wrench menu in application toolbar.
 * @param {string} optionPath Complete path of an option in Wrench menu.
 *                  Ex: Analytics Overrides|Enable Overrides
 * @returns {promise} Promise which resolved to boolean value. TRUE if option is checked, FALSE otherwise.
 */
PA3MainPage.prototype.isOptionChecked = function(optionPath) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var _this = this;
  var refOption;

  // Getting option reference.
  refOption = _this.getOptionFromWrenchMenu(optionPath);

  // Verifying if option is checked.
  refOption.getAttribute('tagName').then(function(tagName) {
    if (tagName.toLowerCase() !== 'tf-menu-item') {
      refOption.$('tf-menu-item').getAttribute('icon').then(function(value) {
        if (value !== null && value !== '') {
          defer.fulfill(true);
        } else {
          defer.fulfill(false);
        }
      });
    } else {
      refOption.getAttribute('icon').then(function(value) {
        if (value !== null && value !== '') {
          defer.fulfill(true);
        } else {
          defer.fulfill(false);
        }
      });
    }
  });

  return promise;
};

/**
 * @function getXpath
 * @description This function is used build the XPATH for the given tree in the calculated report.
 * @param {string} baseXpath This is the XPATH on top of which XPATH for elements in tree form will be formed.
 * @param {string} treePath Element Names which has to be verified. If multiple element has to be verified
 *                  pass their names separated by "|" symbol. Ex: Commercial Services|Advertising
 * @returns {promise} Promise which resolves to the XPATH of given tree.
 */
PA3MainPage.prototype.getXpath = function(baseXpath, treePath) {
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
      xpathExpandButton += '/ancestor::*[contains(@class, "slick-row")]/following-sibling::*' + '//*[normalize-space(.)="' + arrElements[i] + '"]/i';
    }

    // Get the element into visibility before verifying
    Utilities.makeElementVisible(element(by.xpath(xpathExpandButton)));
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
 * @param {string} [rowClassName]: This variable is to set the slick class of report that is calculated.
 * @returns {promise} Promise which resolves to boolean value ie., TRUE if given path is expanded else FALSE.
 */
PA3MainPage.prototype.isTreeExpanded = function(reportName, treePath, rowClassName) {
  var arrElements = treePath.split('|');
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var xpathExpandButton;

  // Set values for optional parameter
  if (rowClassName === undefined) {
    rowClassName = 'grid-canvas grid-canvas-bottom grid-canvas-left';
  }

  var xpathTable = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="' + reportName + '"]]' + '//*[@options="ctrl.grid.options"]/*[contains(@class, "expandable") and not(contains(@class, "multi-header"))]';

  if (arrElements.length === 1) {
    xpathExpandButton = xpathTable + '//*[contains(@class, "' + rowClassName + '")]' + '//*[contains(@class, "slick-row")][normalize-space(.)="' + arrElements[0] + '"]//i';

    // Get the element into visibility before expanding
    Utilities.makeElementVisible(element(by.xpath(xpathExpandButton)));

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
 * @function getElementOrElementList
 * @description This function is used to get the reference of required element or set of elements by making the
 *              reference to visibility.
 * @param {number} cvalue value for which cell reference should be searched.
 * @param {number} [pixel=0] Pixel from which the verification needs to be started. It should be multiple of 18.
 * @param {number} count: number of cell values to be fetched.
 * @returns {promise} Promise which resolves to reference of cValue or Promise which resolves to array of references
 *                    to the 1 to count cells
 */
PA3MainPage.prototype.getElementOrElementList = function(cValue, colNum, pixel, count) {
  var aReturn = [];
  var xpathCells;
  var _this = this;
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  if (typeof pixel === 'undefined') {
    pixel = 0;
  }

  xpathCells = '//div[@class="slick-viewport slick-viewport-bottom slick-viewport-left"]' + '//div[contains(@style,"top:' + pixel + 'px")]//div[contains(@class,"l' + (colNum - 1) + ' r' + (colNum - 1) + '")]';
  pixel = pixel + 18;
  element(by.xpath(xpathCells)).then(function(ele) {
    ele.click();
    ele.getText().then(function(value) {
      browser.actions().mouseMove(element(by.xpath(xpathCells))).perform();
      if (cValue !== '') {
        if (value === cValue) {
          defer.fulfill(ele);
          return promise;
        } else {
          _this.getElementOrElementList(cValue, colNum, pixel, count).then(function(ele) {
            defer.fulfill(ele);
          });
        }
      } else {
        aReturn.push(ele);
        if ((pixel - 18) / 18 === count) {
          defer.fulfill(aReturn);
          return promise;
        } else {
          _this.getElementOrElementList(cValue, colNum, pixel, count).then(function(ele) {
            ele.forEach(function(v) {
              aReturn.push(v);
            });
            defer.fulfill(aReturn);
          });
        }
      }
    }, function(err) {
      defer.fulfill(err);
    });
  });
  return promise;
};

/**
 * @function getFolderDropDown
 * @description This function is used to get the reference of "Folder" menu button from app toolbar.
 * @param {string} [checkForDropDown = false] boolean value
 * @returns {promise} Promise which resolves to reference of Folder button from app toolbar if checkForDropDown
 * parameter is set to FALSE else returns the dropdown reference.
 */
PA3MainPage.prototype.getFolderDropDown = function(checkForDropDown) {

  // Setting the default parameter
  if (checkForDropDown === undefined) {
    checkForDropDown = false;
  }

  var xpathFolderIcon = '//*[@data-qa-id="application-header"]//*[@data-qa-id="document-menu"]';
  var xpathFolderDropDown = xpathFolderIcon + '/ancestor::*/following-sibling::*[contains(@class, "dd-position")]';

  if (!checkForDropDown) {
    return element(by.xpath(xpathFolderIcon));
  } else if (checkForDropDown) {
    return element(by.xpath(xpathFolderDropDown));
  }
};

/**
 * @function getOptionFromFolderMenu
 * @description This function is used to select options from Folder dropdown.
 * @param {string} optionPath Name of the option or path of the option in Folder menu.
 * Ex: New,Save,Open or Delete
 * @returns {promise} Promise which resolves to the reference of the option.
 */
PA3MainPage.prototype.getOptionFromFolderMenu = function(optionName) {
  var xpathNewOption = '//*[@data-qa-id="document-menu-' + optionName.toLowerCase().replace(/\s/g, '-') + '"]';

  return element(by.xpath(xpathNewOption));
};

/**
 * @function getButtonFromQAInfoBox
 * @description This function is used to get the reference of button from the QA Info box.
 * @param {string} buttonName Name of the button.
 * Ex: close, up, down.
 * @returns {promise} Promise which resolves to reference of button from QA Info box.
 */
PA3MainPage.prototype.getButtonFromQAInfoBox = function(buttonName) {
  // Variable(s)
  var xpathbutton;

  xpathbutton = CommonFunctions.replaceStringInXpath('//tf-button[contains(@data-qa-id,"replacingText-overlay")]', buttonName);

  return ThiefHelpers.getButtonClassReference(undefined, xpathbutton);
};

/**
 * @function closeQAInfoBox
 * @description This function is used to close the QA-Info box by clicking on X icon.e
 * @returns {promise} Promise which resolves to boolean value.
 */
PA3MainPage.prototype.closeQAInfoBox = function() {
  // Variable(s)
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var _this = this;
  var xpathQAInfoBox = '//*[@id="bas-qa-overlay"]';
  var infoBoxRef = element(by.xpath(xpathQAInfoBox));

  infoBoxRef.isPresent().then(function(dialogFound) {
    if (dialogFound) {
      _this.getButtonFromQAInfoBox('close').press();
      infoBoxRef.isPresent().then(function(dlgFound) {
        expect(!dlgFound).customError('"QA Info box" did not close.');
        if (dlgFound) {
          defer.reject(false);
          CommonFunctions.takeScreenShot();
        } else {
          defer.fulfill(true);
        }
      });
    } else {
      defer.fulfill(true);
    }
  });

  return promise;
};

/**
 * @function getElementFromInteractivePane
 * @description This function is used to get the element from Interactive pane
 * @param {string} ReportName Name of the report for which the reference is needed.
 * Ex: Multi-Horizon Returns
 * @param {string} ElementPath Path of the element you want to get the reference of.
 * Ex: Communications|AT&T Inc.
 * @param {string} [isTreeElement] It tells whether required element is a tree element.If this
 *                  is set to TRUE it gets the reference of tree element.
 * @returns {promise} Promise which resolves to the reference of required Element.
 */
PA3MainPage.prototype.getElementFromInteractivePane = function(ReportName, ElementPath, isTreeElement) {
  var arrElements = ElementPath.split('|');
  var xpathElement;
  var i;

  var xpathPane = '//*[@data-qa-class="tile" and not(contains(@class, "collapsed"))and descendant::*' + '[normalize-space(.)="' + ReportName + '"]]';
  if (isTreeElement) {
    xpathElement = xpathPane + '//tf-virtual-listbox//tf-virtual-listbox-group-handle' + '[contains(.,"' + arrElements[0] + '")]';

    for (i = 1; i < arrElements.length; i++) {

      xpathElement = xpathElement + '/following-sibling::*//tf-virtual-listbox-group-handle[normalize-space(.)="' + arrElements[i] + '"]';
    }
  } else {
    xpathElement = xpathPane + '//tf-virtual-listbox//tf-virtual-listbox-item-handle[contains(.,"' + arrElements[0] + '")]';
  }

  return element(by.xpath(xpathElement));
};

/**
 * @function expandElementFromInteractivePane
 * @description This function is used to expand the element from Interactive pane
 * @param {string} reportName Name of the report for which the reference is needed.
 * Ex: Multi-Horizon Returns
 * @param {string} elementPath Path of the element you want to get the reference of.
 * Ex: Minerals|Coal.
 * @returns {promise} Promise which resolves expand element.
 */
PA3MainPage.prototype.expandElementFromInteractivePane = function(reportName, elementPath, excludeElements) {
  var arrElements = elementPath.split('|');
  var arrExcludedElements;
  var xpathExpandButton;

  var reportXpath = '//*[@data-qa-class="tile" and not(contains(@class, "collapsed"))and descendant::*' + '[normalize-space(.)="' + reportName + '"]]//tf-listbox';

  if (excludeElements === undefined) {
    arrExcludedElements = undefined;
  } else {
    arrExcludedElements = excludeElements.split('|');
  }

  if (arrElements.length === 1) {
    xpathExpandButton = reportXpath + '//*[@tf-selectable-item]' + '//*[normalize-space(.)="' + arrElements[0] + '"]/ancestor::*[@tf-selectable-item][1]//tf-icon';

    var ref = element(by.xpath(xpathExpandButton));

    ref.click();

    ref.getAttribute('class').then(function(text) {
      if (text.indexOf('open') < 0) {
        expect(false).customError('"' + elementPath + '" did not expanded');
      }
    });
  } else {
    xpathExpandButton = reportXpath;
    for (var i = 0; i < arrElements.length; i++) {
      xpathExpandButton += '//*[@tf-selectable-item]' + '//*[normalize-space(.)="' + arrElements[i] + '"]/ancestor::*[@tf-selectable-item][1]//tf-icon';

      if (arrExcludedElements === undefined) {
        // Make the element visible before expanding

        element(by.xpath(xpathExpandButton)).click();
      } else if (arrExcludedElements.indexOf(arrElements[i]) < 0) {

        element(by.xpath(xpathExpandButton)).click();
      } else {
        arrExcludedElements.splice(arrExcludedElements.indexOf(arrElements[i]), 1);
      }

      if (i !== arrElements.length - 1) {
        xpathExpandButton += '/ancestor::*[@tf-selectable-item][1]';
      }
    }
  }
};

/**
 * @function checkIfExpandedFromInteractivePane
 * @description This function is used to check if given element is expanded
 * @param {string} reportName Name of the report for which the reference is needed.
 * Ex: Multi-Horizon Returns
 * @param {string} elementPath Path of the element you want to get the reference of.
 * Ex: Energy Minerals|Coal.
 * @returns {promise} NA.
 */
PA3MainPage.prototype.checkIfExpandedFromInteractivePane = function(reportName, elementPath) {
  var arrElements = elementPath.split('|');
  var xpathParentElement;

  var reportXpath = '//*[@data-qa-class="tile" and not(contains(@class, "collapsed"))and descendant::*' + '[normalize-space(.)="' + reportName + '"]]//tf-listbox';

  var checkIfGroupExpanded = function(iterator) {
    xpathParentElement = reportXpath + '//*[@tf-selectable-item]' + '//*[normalize-space(.)="' + arrElements[iterator] + '"]/ancestor::*[@tf-selectable-item][1]//tf-icon';

    element.all(by.xpath(xpathParentElement)).first().getAttribute('class').then(function(text) {
      if (text.indexOf('open') < 0) {
        expect(false).customError('"' + elementPath + '" did not expanded');
        CommonFunctions.takeScreenShot();
      }
    });
  };

  if (arrElements.length === 1) {
    xpathParentElement = reportXpath + '//*[@tf-selectable-item]' + '//*[normalize-space(.)="' + arrElements[0] + '"]/ancestor::*[@tf-selectable-item][1]//tf-icon';
    element.all(by.xpath(xpathParentElement)).first().getAttribute('class').then(function(text) {
      if (text.indexOf('open') < 0) {
        expect(false).customError('"' + elementPath + '" did not expanded');
        CommonFunctions.takeScreenShot();
      }
    });
  } else {
    xpathParentElement = this.xpathAvailableContainer;
    for (var i = 0; i < arrElements.length; i++) {
      checkIfGroupExpanded(i);
    }
  }

  return element(by.xpath(xpathParentElement));
};

/**
 * @function isInChartFormat
 * @description This function is used to verify if application is in chart format or not.
 * @param {string} ReportName Name of the report for which the reference is needed.
 * Ex: Multi-Horizon Returns
 * @returns {promise} Promise which resolves to boolean value.
 */
PA3MainPage.prototype.isInChartFormat = function(ReportName) {
  var xpath = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="' + ReportName + '"]]//*[contains(@class, "fdschartctl")]';
  return element(by.xpath(xpath)).isPresent();
};

/**
 * @function getAccountClearAllButton
 * @description This function is used to get references of Remove All accounts button from Account Drop Down.
 * @param {string} accountType Account type from which button reference has to be collected.
 * Ex: Portfolio, Benchmark.
 * @returns {promise} Promise which resolves to Clear All accounts button reference.
 */
PA3MainPage.prototype.getAccountClearAllButton = function(accountType) {
  var xpath = '//*[@id="' + accountType.toLowerCase() + '"]/ancestor::*/following-sibling::*//*[@data-qa-id="button-account-clear-all"]';

  return element(by.xpath(xpath));
};

/**
 * @function getCheckBoxFromAccountDropdown
 * @description This function is used to get the checkbox reference from any Account (Portfolio or Benchmark) dropdown.
 * @param {string} checkboxName Name of the checkbox.
 * Ex: Use Multiple Benchmarks,Use Multiple Portfolios
 * @returns {promise} Promise resolves to the reference of the option from Folder menu.
 */
PA3MainPage.prototype.getCheckBoxFromAccountDropdown = function(checkboxName) {

  var xapthCheckbox = '//*[@class="dropdown-container"]//*[normalize-space(.)="' + checkboxName + '"]/tf-checkbox-control';

  return element(by.xpath(xapthCheckbox));
};

/**
 * @function getMultiHeaderColumnView
 * @description This function is used to get the Multi Header column view from slickgrid
 * @param {string} tile Tile name. Ex: Statistics
 * @returns {obj} A multi dimensional array of JSON objects resolving Multi Header column view from slickgrid.
 */
PA3MainPage.prototype.getMultiHeaderColumnView = function(tile) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var dv;
  var keyColumns = 'columns';
  var grid = element(by.xpath('//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="' + tile + '"]]' + '//*[contains(@class, "tf-slick-grid")]'));
  grid.evaluate('ctrl.grid.multiHeader').then(function(name) {
    dv = name;
    defer.fulfill(name[keyColumns]);
  });

  return promise;
};

/**
 * @function getColumnNumberRangeForMultiHeader
 * @description This function is used to get the column number range for multi-header.
 * @param {string} tile Tile name.
 * Ex: Statistics
 * @param {string} multiHeader Multi-Header column name. If the multi header is in two levels we have to give the full
 * path. Ex: Beta|Universe Return
 * @returns {promise} Promise resolving to an array of column number range for multi-header.
 */
PA3MainPage.prototype.getColumnNumberRangeForMultiHeader = function(tile, multiHeader) {
  var defer = protractor.promise.defer();

  // Storing key values in variables to access data from JSON object
  var promise = defer.promise;
  var keyName = 'name';
  var keyChildren = 'children';
  var keyColumnIndex = '_columnIndex';
  var keyID = 'id';
  var _this = this;
  var temp;
  var fieldValuesForMultiHeaders = [];
  var columnNumbers = [];
  var arrMultiHeader = multiHeader.split('|');
  var children2;

  _this.getMultiHeaderColumnView(tile).then(function(multiHeaderView) {

    // Traversing through the JSON array
    multiHeaderView.forEach(function(multiHeaderJSON, index) {

      // Replacing breakline with spaces
      temp = multiHeaderJSON[keyName].replace(/<br>/g, ' ').replace('\n', ' ').replace('&lt;', '<');

      // checking for the necessary multiheader from the list
      if (temp.replace(/<br>/g, ' ').replace('\n', ' ').replace('&lt;', '<') === arrMultiHeader[0]) {

        // Fetching the value of children. This holds the column numbers
        var children = multiHeaderView[index][keyChildren];

        // Traversing though the array
        children.forEach(function(childValue, index) {

          if (childValue[keyColumnIndex] !== undefined) {
            // Reading the array value and pushing into the 'columnNumbers' to be fulfilled and returned
            columnNumbers.push(childValue[keyColumnIndex]);
            fieldValuesForMultiHeaders.push(childValue[keyID]);
          } else {
            // Replacing breakline with spaces
            temp = childValue[keyName].replace(/<br>/g, ' ').replace('\n', ' ').replace('&lt;', '<');

            // checking for the necessary multiheader from the list
            if (temp.replace(/<br>/g, ' ').replace(/&amp;/g, '&').replace('\n', ' ').replace('&lt;', '<') === arrMultiHeader[1]) {

              // Fetching the value of children. This holds the column numbers
              children2 = children[index][keyChildren];

              // Traversing though the array
              children2.forEach(function(childValue) {
                // Reading the array value and pushing into the 'columnNumbers' to be fulfilled
                columnNumbers.push(childValue[keyColumnIndex]);
                fieldValuesForMultiHeaders.push(childValue[keyID]);
              });
            } else if (arrMultiHeader.length === 1) {
              // Fetching the value of children. This holds the column numbers
              children2 = children[index][keyChildren];

              // Traversing though the array
              children2.forEach(function(childValue) {
                // Reading the array value and pushing into the 'columnNumbers' to be fulfilled
                columnNumbers.push(childValue[keyColumnIndex]);
                fieldValuesForMultiHeaders.push(childValue[keyID]);
              });
            }
          }
        });
      }
    });
  }).then(function() {
    defer.fulfill(columnNumbers);
  });

  return promise;
};

/**
 * @function getAllMultiHeaderNamesOfSpecifiedLevel
 * @description This function is used to get multiheader names from the slickgrid.
 * @param {string} tile Tile name.
 * Ex: Statistics
 * @param {number} levelNum Tree level number. Based on this number all the multiheaders.
 * from this level will be collected
 * @returns {promise} Promise which resolved to array of multiheader names.
 */
PA3MainPage.prototype.getAllMultiHeaderNamesOfSpecifiedLevel = function(tile, levelNum) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var _this = this;
  var multiHeaders = [];
  var keyName = 'name';
  var keyChildren = 'children';

  // Fetching the Multi Header view JSON array
  _this.getMultiHeaderColumnView(tile).then(function(multiHeaderView) {

    // Traversing through Multi Header view JSON array to search for the needed Multi Header column
    multiHeaderView.forEach(function(multiHeaderJSON, index) {

      if (multiHeaderJSON[keyName] !== '' && levelNum === 1) {
        multiHeaders.push(multiHeaderJSON[keyName].replace(/&amp;/g, '&').replace(/[\n;]/g, ' ').replace(/<br>/g, ' '));
      }

      var children = multiHeaderView[index][keyChildren];
      if (children !== undefined) {
        children.forEach(function(child, index2) {
          if (child[keyName] !== '' && levelNum === 2) {
            multiHeaders.push(child[keyName].replace(/&amp;/g, '&').replace(/[\n;]/g, ' ').replace(/<br>/g, ' '));
          }

          var children2 = children[index2][keyChildren];
          if (children2 !== undefined) {

            children2.forEach(function(child2) {
              if (child2[keyName] !== '' && levelNum === 3) {
                multiHeaders.push(child2[keyName].replace(/&amp;/g, '&').replace(/[\n;]/g, ' ').replace(/<br>/g, ' '));
              }
            });
          }
        });
      }
    });
  }).then(function() {
    defer.fulfill(multiHeaders);
  });

  return promise;
};

/**
 * @function getDropdownFromAccountsDropdown
 * @description This function is used to get the dropdown reference from any Account (Portfolio or Benchmark) dropdown.
 * @param {string} accountType Account type from which index has to be collected.
 * Ex: Portfolio, Benchmark.
 * @param {string} accountName Name of the Portfolio/Benchmark to get it's dropdown reference.
 * Ex: DELTA, ALPHA etc
 * @returns {promise} Returns the reference of the option from Folder menu.
 */
PA3MainPage.prototype.getDropdownFromAccountsDropdown = function(accountType, accountName) {
  var xpath;
  xpath = '//*[@id="' + accountType.toLowerCase() + '"]//*[@data-qa-class="account-item" ' + 'and descendant::*[normalize-space(.)="' + accountName + '"]]//*[@data-qa-class="methodology-dropdown-button"]';

  return element(by.xpath(xpath));
};

/**
 * @function getMaximizeOrMinimizeWindowButton
 * @description This function is used to get the refrence of maximize or minimize screen button.
 * @param {string} tile Tile name.
 * Ex: Statistics
 * @returns {promise} Returns the reference of the maximize or minimize screen button.
 */
PA3MainPage.prototype.getMaximizeOrMinimizeWindowButton = function(tile) {
  var xpath;
  xpath = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="' + tile + '"]]//tf-button[contains(@icon,"screen")]';

  return element(by.xpath(xpath));
};

/**
 * @function getOptionFromInteractivePane
 * @description This function is used to get the reference of option from Interactive pane.
 * @param {string} tile Tile name.
 * Ex: Statistics
 * @param {string} optionName Pass option name from Interactive pane.
 * Ex: Total
 * @returns {promise} Returns the reference of option from Interactive pane.
 */
PA3MainPage.prototype.getOptionFromInteractivePane = function(tile, optionName) {
  var xpath;
  xpath = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="' + tile + '"]]//tf-listbox-item' + '[contains(.,"' + optionName + '")]';

  return element(by.xpath(xpath));
};

/**
 * @function getOptionAfterRightClickOnReport
 * @description This function is used to get reference of option from the drop down after right click on Report.
 * @param {string} optionName Name of Option.
 * Ex: Columns.
 * @returns {promise} Promise which resolve reference of option from the drop down after right click on Report.
 */
PA3MainPage.prototype.getOptionAfterRightClickOnReport = function(optionName) {
  var xpath;
  xpath = '//*[contains(@class,"tf-menu")]//*[normalize-space(text())="' + optionName + '"]';

  return element(by.xpath(xpath));
};

/**
 * @function getAllReportsFromGivenGroup
 * @description This function is used to get the array of LHP report names under a group.
 * @param {string} sectionName Name of the section.  Ex: Reports.
 * @param {string} groupName Name of the group. Ex: Reports.
 * @returns {Promise} Promise which resolves to the array of LHP report names.
 */
PA3MainPage.prototype.getAllReportsFromGivenGroup = function(sectionName, groupName) {

  return ThiefHelpers.getNavepaneClassReference().getSectionByText(sectionName).getGroupByText(groupName).then(function(groupObj) {
    return groupObj.all(by.xpath('//tf-navpane-group-name[normalize-space(.)="' + groupName + '"]/ancestor::*[@data-qa-class="accordion-category"]' + '//*[@data-qa-class="accordion-item"]')).getText().then(function(values) {
      return values;
    });
  }, function(err) {
    expect(false).customError(err);
    CommonFunctions.takeScreenShot();
  });
};

/**
 * @function getMatrixTile
 * @description This function is used to get the tile using position in the format of a Matrix.
 * @param {number} rowNum Row Index.  Ex: 1 or 2
 * @param {number} colNum Col Index. Ex: 1 or 2.
 * @param {number} [rowNum2] Row Index, Row number from a particular column.  Ex: 1 or 2
 * @param {boolean} [tilesCount] Use this to get the all tiles reference. By default it is set to undefined.
 * @returns {Promise} Promise which resolves to the tile reference as per give position.
 */
PA3MainPage.prototype.getMatrixTile = function(rowNum, colNum, rowNum2, tilesCount) {
  var xpathMatrixTile = '//*[@data-qa-id="workspace"]//*[contains(@id,"layout")]/*[contains(@class,"row")][' + rowNum + ']';

  if (colNum !== undefined) {
    xpathMatrixTile += '//*[contains(@class,"col")][' + colNum + ']';
  }

  if (rowNum2 !== undefined) {
    xpathMatrixTile += '/*[contains(@class,"row")][' + rowNum2 + ']';
  }

  xpathMatrixTile += '//*[@data-qa-class="tile"]//*[@data-qa-class="tile-header"]';

  if (tilesCount !== undefined) {
    return element.all(by.xpath(xpathMatrixTile));
  } else {
    return element(by.xpath(xpathMatrixTile));
  }
};

/**
 * @function getAllTilesFromReport
 * @description This function is used to get all tiles displayed in report view.
 * @returns {promise} Promise which resolves to array of tiles in the repotr.
 */
PA3MainPage.prototype.getAllTilesFromReport = function() {
  var xpathMatrixTile = '//*[@data-qa-id="workspace"]//*[contains(@id,"layout")]//*[@data-qa-class="tile"]' + '//*[@data-qa-class="tile-header"]';
  return element.all(by.xpath(xpathMatrixTile));
};

/**
 * @function getProgressIndicatorClassReference
 * @description This function is used to get the reference of spinner image.
 * @param {string} tileName Name of the report( tile ).  Ex: Weights.
 * @returns {obj} returns object of progress indicator.
 */
PA3MainPage.prototype.getProgressIndicatorClassReference = function(tileName) {

  // Variable(s)
  var xpathReportCalculation;

  // Set the XPATH based on optional parameter
  if (tileName === undefined) {
    xpathReportCalculation = '//*[@data-qa-class="progress-indicator"]';
  } else {
    xpathReportCalculation = '//*[@data-qa-class="tile"]//*[@data-qa-class="tile-header" and descendant::*' + '[normalize-space(.)="' + tileName + '"]]/ancestor::*[@data-qa-class="tile"]' + '/following-sibling::*//tf-progress-indicator[@data-qa-class="progress-indicator"]';
  }

  var progress = new TestHelpers.ProgressIndicator(by.xpath(xpathReportCalculation));
  return progress;
};

/**
 * @function getAllOptionsAfterRightClickOnReport
 * @description This function is used to get the references of all options after the right click on Report.
 * @param {string} option pass menu or submenu as option.
 * Ex: Menu/Submenu
 * @returns {promise[]} Promise which resolves to array of options
 */
PA3MainPage.prototype.getAllOptionsAfterRightClickOnReport = function(option) {

  // Variable(s)
  var xpath;

  if (option.toLowerCase() === 'menu') {
    xpath = '//*[contains(@class, "tf-context")]/li[not(contains(@class, "divider"))]';
  } else if (option.toLowerCase() === 'submenu') {
    xpath = '//*[contains(@class,"tf-state")]//li';
  }

  return element.all(by.xpath(xpath));
};

/**
 * @function isArrowPointingTowardsHyperlink
 * @description This function is used to find if the Infobox arrow is pointing towards hyperlink.
 * @returns {promise} Promise which resolves to boolean value.
 */
PA3MainPage.prototype.isArrowPointingTowardsHyperlink = function() {
  var defer = protractor.promise.defer();
  var promise = defer.promise;
  var xpath = '//*[@data-qa-id="exclusions-info-box"]//tf-info-arrow';

  element(by.xpath(xpath)).getAttribute('side').then(function(text) {
    if (text.indexOf('bottom') >= 0) {
      defer.fulfill(true);
    } else {
      defer.fulfill(false);
    }
  });

  return promise;
};

/**
 * @function selectWrenchIcon
 * @description This function is used to select wrench icon from app tool bar, LHP and from Report workspace.
 * @param {string} [reportNameOrTileName] Pass either report name to get wrench icon from LHP or tile name to get the wrench icon from workspace
 * Ex: Weights.
 * @param {boolean} [isLHPOption] Pass true if you want wrench icon from the LHP to be selected
 * Note: If we do not pass reportName or isLHPOption then it will perform action on app toolbar's wrench icon.
 * @returns NA.
 */
PA3MainPage.prototype.selectWrenchIcon = function(reportNameOrTileName, isLHPOption) {

  // variable(s)
  var xpathWrenchIcon;
  var _this = this;

  // Close QA Info Box if it is found
  _this.closeQAInfoBox();

  if (reportNameOrTileName === undefined && isLHPOption === undefined) {
    xpathWrenchIcon = '//*[@data-qa-id="application-header"]//*[@data-qa-class="wrench-dropdown-button"]';

    // Adding the below action as a work around to shift control from Download button.
    var reference = element(by.xpath(this.xpathBenchMarkLookupIcon));
    browser.actions().mouseMove(reference).perform();
  } else {
    if (isLHPOption === undefined) {
      xpathWrenchIcon = '//*[@data-qa-id="workspace"]//*[@data-qa-class="tile" and descendant::*' + '[normalize-space(.)="' + reportNameOrTileName + '"]]//*[@data-qa-class="wrench-button"]';

      // Close QA Info Box if it is found
      this.closeQAInfoBox();
    } else if (isLHPOption === true) {
      xpathWrenchIcon = '//*[@data-qa-id="lhp"]//*[@data-qa-class="accordion-item" and descendant::*' + '//*[normalize-space(.)="' + reportNameOrTileName + '"]]//*[@data-qa-class="wrench-button"]';
    }
  }

  ThiefHelpers.getButtonClassReference(undefined, xpathWrenchIcon).press().then(function() {
  }, function() {
    expect(false).customError('Unable to click on wrench icon');
    CommonFunctions.takeScreenShot();
  });
};

/**
 *@function getListOfPortfoliosFromAddPortfolioVariations
 *@description This function is used to get the list of references from Portfolios section in "Add Portfolio Varation".
 *@returns {array} returns an array of element reference
 */

PA3MainPage.prototype.getListOfPortfoliosFromAddPortfolioVariations = function() {
  var xpathList = '//tf-dropdown[descendant::*[normalize-space(.)="Portfolio Variation"]]//tf-listbox[parent::*[preceding-sibling::*[normalize-space(.)="Portfolios"]]]//tf-listbox-item';

  return element.all(by.xpath(xpathList));
};

/**
 *@function getOkOrCancelButtonInAddPortfolioVaration
 *@description This function is used to get the reference of OK/CANCEL button reference from "Add Portfolio Varation" dropdown.
 *@param {string} buttonName Name of the button to get its reference.Ex: OK, Cancel
 *@returns {promise} Returns the reference of the button in the drop down
 */

PA3MainPage.prototype.getOkOrCancelButtonInAddPortfolioVaration = function(buttonName) {
  var xpathButton = '//tf-dropdown[descendant::*[normalize-space(.)="Portfolio Variation"]]//tf-button[normalize-space(.)="' + buttonName + '"]';
  return element(by.xpath(xpathButton));
};

/**
 * @function verifyArroButtonDirectionInColumnHeader
 * @description This function is used to verify arrow button direction from Column header.
 * @param {string} reportName Name of report.
 * Example Weights.
 * @param {string} direction Provide Direction.
 * Example : Up/ Down.
 * @returns {promise} Promise which resolves to boolean value.
 */
PA3MainPage.prototype.verifyArroButtonDirectionInColumnHeader = function(reportName, direction) {
  var defer = protractor.promise.defer();
  var promise = defer.promise;

  var xpath;

  if (direction.toLowerCase() === 'up') {
    xpath = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="' + reportName + '"]]' + '//*[@options="ctrl.grid.options"]/*[contains(@class, "slick-frozen-rows") and not(contains(@class, "multi-header"))]' + '//*[contains(@class, "slick-column-name-text")]//*[contains(@class,"slick-sort-indicator-asc")]';
  } else if (direction.toLowerCase() === 'down') {
    xpath = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="' + reportName + '"]]' + '//*[@options="ctrl.grid.options"]/*[contains(@class, "slick-frozen-rows") and not(contains(@class, "multi-header"))]' + '//*[contains(@class, "slick-column-name-text")]//*[contains(@class,"slick-sort-indicator-desc")]';
  }

  element(by.xpath(xpath)).isPresent().then(function(flag) {
    if (flag) {
      defer.fulfill(true);
    } else {
      defer.fulfill(false);
    }
  });

  return promise;
};

/**
 * @function openPLMModifyAccount
 * @description This function is used to navigate to PLM application.
 * @param {string} path Path of the folder.
 * Example : CLIENT:~2FPA3~2FFULL_REFRESH.
 * @param {string} accountName Name of account.
 * Example EQUITY_ACCOUNT.
 */
PA3MainPage.prototype.openPLMModifyAccount = function(path, accountName) {
  var baseUrl;
  var serial = FactSetLoginPage.FetchSerialNumber();
  baseUrl = 'https://portfoliolistmanager.inhouse-cauth.factset.com/';

  browser.call(() => {
    // Disabling ignoreSynchronization
    browser.ignoreSynchronization = true;

    // Doing browser.refresh() to refresh the browser to check if login page has appeared
    browser.refresh();

    browser.getTitle().then((title) => {

      // Check if FactSet Login page is appeared
      if (title.indexOf('FactSet Login') > -1) {

        console.log('FactSet login page appeared. Logging in again');

        // If application is redirected to FactSet login page login to application using credentials
        FactSetLoginPage.loginToApplication(serial);

      }

      // enabling ignoreSynchronization
      browser.ignoreSynchronization = false;

      // Navigate to the given URL
      browser.get(baseUrl + '#/account/general/basics?type=acct&path=' + path + '&name=' + accountName + '.ACCT');

      browser.waitForAngular();

    });
  });
};

/**
 * @function getOptionsHyperlink
 * @description This function is used to get the hyper link of any Option.
 * @param {string} Name of the hyper link.
 * Example: All Date Options
 * @returns {promise} Promise which resolves to the hyper link.
 */
PA3MainPage.prototype.getOptionsHyperlink = function(optionName) {
  var xpathOptionsHyperlink = '//tf-infobox//*[contains(@data-qa-id, "options-hyperlink") and normalize-space(.)="' + optionName + '"]';
  return element(by.xpath(xpathOptionsHyperlink));
};

/**
 * @function isScrollBarPresent
 * @description This function is used to get value from specified cell of calculated report.
 * @param {string} reportName Name of the report for which calculation is done.
 * @param {string} reportViewClassName Name of the class from DOM in which all the row names exists.
 *                              Ex: slick-pane slick-pane-top slick-pane-right
 * @param {string} scrollBarPosition Position of scroll bar.
 *                              Ex: Vertical or Horizontal
 * @param {string} [isPresent = true] true : to verify scroll bar is displayed/ false : to verify scroll bar is not displayed
 * @param {string} [isAuditMode = true] true : if it is audit mode report/ false : if report is in main page
 * @returns {NA}
 */
PA3MainPage.prototype.isScrollBarPresent = function(reportName, reportViewClassName, scrollBarPosition, isPresent, isAuditMode) {
  var xpathOfReport;

  if (isAuditMode) {
    xpathOfReport = '//*[@class="header-section"]//*[normalize-space(text())="' + reportName + '"]/ancestor::*' + '[contains(@class, "splitter")][1]/descendant::*//*[contains(@class, "tf-slick-grid")]';
  } else {
    xpathOfReport = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="' + reportName + '"]]';
  }

  if (isPresent === undefined) {
    isPresent = true;
  }

  // Set values for optional parameter
  if (reportViewClassName === undefined) {
    reportViewClassName = 'slick-viewport slick-viewport-bottom slick-viewport-right';
  }

  var reference = element(by.xpath(xpathOfReport + '//*[@class="' + reportViewClassName + '"]'));

  reference.isPresent().then(function(isExists) {
    if (isExists) {
      reference.getAttribute('style').then(function(styleText) {
        if (isPresent) {
          if (scrollBarPosition.toLocaleLowerCase() === 'horizontal') {
            if (styleText.indexOf('overflow-x: scroll;') === -1 && styleText.indexOf('overflow: scroll;') === -1) {
              expect(false).customError(reportName + ' report is not displayed with ' + scrollBarPosition + ' scroll bar');
              CommonFunctions.takeScreenShot();
            }
          } else if (scrollBarPosition.toLocaleLowerCase() === 'vertical') {
            if (styleText.indexOf('overflow-y: scroll;') === -1 && styleText.indexOf('overflow: scroll;') === -1) {
              expect(false).customError(reportName + ' report is not displayed with ' + scrollBarPosition + ' scroll bar');
              CommonFunctions.takeScreenShot();
            }
          }
        } else {
          if (scrollBarPosition.toLocaleLowerCase() === 'horizontal') {
            if (styleText.indexOf('overflow-x: hidden;') === -1 && styleText.indexOf('overflow: hidden;') === -1) {
              expect(false).customError(reportName + ' report is displayed with ' + scrollBarPosition + ' scroll bar');
              CommonFunctions.takeScreenShot();
            }
          } else if (scrollBarPosition.toLocaleLowerCase() === 'vertical') {
            if (styleText.indexOf('overflow-y: hidden;') === -1 && styleText.indexOf('overflow: hidden;') === -1) {
              expect(false).customError(reportName + ' report is displayed with ' + scrollBarPosition + ' scroll bar');
              CommonFunctions.takeScreenShot();
            }
          }
        }
      });
    } else {
      expect(false).customError(reportName + ' report reference not found');
      CommonFunctions.takeScreenShot();
    }
  });
};

/**
 * @function removeAllPortfolioOrBenchmarkValues
 * @description This function is used to remove all Portfolio or Benchmark values.
 * @param {string} widgetName Name of the widget.
 * Example Portfolio.
 */
PA3MainPage.prototype.removeAllPortfolioOrBenchmarkValues = function(widgetName) {
  var _this = this;
  _this.getHamburgerIcon(widgetName).click().then(function() {
    // Verifying that Account window opened
    ThiefHelpers.isDropDownOpen().then(function(appeared) {
      if (!appeared) {
        expect(false).customError(widgetName + ' Hamburger menu is not open.');
        CommonFunctions.takeScreenShot();
      } else {
        ThiefHelpers.getButtonClassReference(undefined, _this.xpathRemoveAllIcon).press().then(function() {
          _this.getOkOrCancelButton(widgetName, 'OK').click().then(function() {
            // verifying that "Accounts" drop down is closed
            expect(_this.getHamburgerIcon(widgetName).getAttribute('Class')).not.toContain('active');
          }, function(err) {

            expect(false).customError('Unable to perform click on "OK" button, Error: ' + err);
            CommonFunctions.takeScreenShot();
          });
        }, function(err) {

          expect(false).customError('Unable to perform click on "Remove All" button, Error: ' + err);
          CommonFunctions.takeScreenShot();
        });
      }
    });
  }, function(err) {

    expect(false).customError('Unable to perform click on "Hamburger" icon of "' + widgetName + '" widget , Error: ' + err);
    CommonFunctions.takeScreenShot();
  });
};

/**
 * @function verifyDocumentPathInHTMLDialog
 * @description This function is used to verify document path that set in HTML dialog.
 * @param {string} documentPath Path of document that need to be verify.
 * Example Client > Pa3 > Risk.
 */
PA3MainPage.prototype.verifyDocumentPathInHTMLDialog = function(documentPath) {
  var found = 0;
  var breadCrumbArr = [];

  var documentPathInArray = documentPath.split(' > ');

  it('Should verify if document path is set to "' + documentPathInArray + '" in file dialog', function() {

    element(by.xpath('//*[@data-qa-id = "bread-crumb"]')).getText().then(function(text) {
      console.log(text);
      breadCrumbArr.push(text.split('\n'));
      console.log(breadCrumbArr);
      breadCrumbArr[0].forEach(function(value, index) {
        if (value !== documentPathInArray[index]) {
          found = 1;
        }
      });
    }).then(function() {
      if (found >= 1) {
        expect(false).customError(documentPathInArray + ' is not set as document path, Found: ' + breadCrumbArr);
        CommonFunctions.takeScreenShot();
      }
    });

  });
};

/**
 * @function getDialogContent
 * @description This function is used to get the dialog conent.
 * @param {string} xpathOfDialogContent Reference of dialog content.
 */
PA3MainPage.prototype.getDialogContent = function(xpathOfDialogContent) {
  if (xpathOfDialogContent === undefined) {
    xpathOfDialogContent = '//*[@role="dialog"]//*[contains(@class, "dialog-content")]';
  }

  return element(by.xpath(xpathOfDialogContent));
};

module.exports = new PA3MainPage();
