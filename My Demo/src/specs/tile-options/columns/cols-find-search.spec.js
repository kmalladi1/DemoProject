'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: cols-find-search', function() {

  var columnNames = ['Ticker', '', 'Port. Weight', 'Bench. Weight', 'Difference'];
  var highlightedElements = [];

  var hittingEnter = function() {
    it('Should hit enter', function() {
      browser.actions().sendKeys(protractor.Key.ENTER).perform();
    });
  };

  var verifySearchBar = function(reportName) {

    var xpathSearchBar = element(by.xpath('//*[@data-qa-class="tile" and descendant::*' + '[normalize-space(.)="' + reportName + '"]]//tf-textbox'));

    it('Verify if Search Bar is appeared for "' + reportName + '" report', function() {
      xpathSearchBar.isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('Search Bar is not appeared for "' + reportName + '" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  };

  describe('Test Step ID: 703060', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "cols-find" document from "Client:/PA3/columns"', function() {
      PA3MainPage.switchToDocument('cols-find');
    });

    it('Waiting for report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);
    });

    it('Verifying if calculated data for "Weights" report appeared', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Weights" report is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Commercial Services|Advertising/Marketing Services" is expanded', function() {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Commercial Services|Advertising/Marketing Services');
    });
  });

  describe('Test Step ID: 703098', function() {

    it('Should click on "Wrench" icon available in Workspace', function() {
      PA3MainPage.selectWrenchIcon('Weights');
    });

    it('Verifying if the "wrench" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Wrench" drop down did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Find" from the wrench menu drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Find').then(function() {
      }, function() {
        expect(false).customError('Unable to select "Find" from menu drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Find" widget is displayed', function() {
      element(by.xpath(PA3MainPage.xpathFindWidget)).isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Find" widget is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "X" icon to close the Find widget', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.xpathFindWidgetCloseButton).press();
    });

    it('Verifying if "Find" widget is not displayed', function() {
      element(by.xpath(PA3MainPage.xpathFindWidget)).isPresent().then(function(flag) {
        if (flag) {
          expect(false).customError('"Find" widget is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Wrench" icon available in Workspace', function() {
      PA3MainPage.selectWrenchIcon('Weights');
    });

    it('Verifying if the "wrench" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Wrench" drop down did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Find" from the wrench menu drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Find').then(function() {
      }, function() {
        expect(false).customError('Unable to select "Find" from menu drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Find" widget is displayed', function() {
      element(by.xpath(PA3MainPage.xpathFindWidget)).isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Find" widget is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "NLSN" in "Find Security or Group.." text box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathFindWidgetTextBox).setText('NLSN');

      // Verifying if NLSN is typed into the text box
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathFindWidgetTextBox).getText().then(function(text) {
        if (text !== 'NLSN') {
          expect(false).customError('"Find Security or Group.." text box is not set as "NLSN"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    columnNames.forEach(function(column) {

      it('Verifying if the row for Ticker "NLSN" is highlighted in red', function() {
        SlickGridFunctions.getCellReference('Weights', 'NLSN', 'Ticker', column).then(function(reference) {
          reference.getCssValue('background-color').then(function(value) {
            if (value !== 'rgba(251, 197, 183, 1)') {
              expect(false).customError('"' + column + '" column for "NLSN" row is not in red color; Found: ' + value);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 703100', function() {

    it('Should clear the text and type "Omnicom Group Inc" in "Find Security or Group.." text box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathFindWidgetTextBox).setText('Omnicom Group Inc');

      // Verifying if Omnicom Group Inc is typed into the text box
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathFindWidgetTextBox).getText().then(function(text) {
        if (text !== 'Omnicom Group Inc') {
          expect(false).customError('"Find Security or Group.." text box is not set as "Omnicom Group Inc"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the security "Omnicom Group Inc" is highlighted in red', function() {
      SlickGridFunctions.getCellReference('Weights', 'Omnicom Group Inc', '', '').then(function(reference) {
        reference.getCssValue('background-color').then(function(value) {
          if (value !== 'rgba(251, 197, 183, 1)') {
            expect(false).customError('" " column for "Omnicom Group Inc" security is not in red color; Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 703102', function() {

    it('Should clear the text and type "Motor Vehicles" in "Find Security or Group.." text box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathFindWidgetTextBox).setText('Motor Vehicles');

      // Verifying if Motor Vehicles is typed into the text box
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathFindWidgetTextBox).getText().then(function(text) {
        if (text !== 'Motor Vehicles') {
          expect(false).customError('"Find Security or Group.." text box is not set as "Motor Vehicles"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Consumer Durables" grouping is expanded', function() {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Consumer Durables');
    });

    columnNames.forEach(function(column) {

      it('Verifying if the row for security "Motor Vehicles" is highlighted in red', function() {
        SlickGridFunctions.getCellReference('Weights', 'Motor Vehicles', '', column).then(function(reference) {
          reference.getCssValue('background-color').then(function(value) {
            if (value !== 'rgba(251, 197, 183, 1)') {
              expect(false).customError('"' + column + '" column for "Motor Vehicles" security row is not in red color; Found: ' + value);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 703104', function() {

    it('Should clear the text and type "T-Mobile US, Inc." in "Find Security or Group.." text box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathFindWidgetTextBox).setText('T-Mobile US, Inc.');

      // Verifying if T-Mobile US, Inc. is typed into the text box
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathFindWidgetTextBox).getText().then(function(text) {
        if (text !== 'T-Mobile US, Inc.') {
          expect(false).customError('"Find Security or Group.." text box is not set as "T-Mobile US, Inc."; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Communications|Wireless Telecommunications" grouping is expanded', function() {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Communications|Wireless Telecommunications');
    });

    columnNames.forEach(function(column) {

      it('Verifying if the row for security "T-Mobile US, Inc." is highlighted in red', function() {
        SlickGridFunctions.getCellReference('Weights', 'T-Mobile US, Inc.', '', column).then(function(reference) {
          reference.getCssValue('background-color').then(function(value) {
            if (value !== 'rgba(251, 197, 183, 1)') {
              expect(false).customError('"' + column + '" column for "T-Mobile US, Inc." security row is not in red color; Found: ' + value);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 703105', function() {

    it('Should right click on "Port. Weight" in "Weights" report and select "Columns > Add Column..." ', function() {
      PA3MainPage.getAllColumnOfCalculatedReport('Weights').each(function(element) {
        Utilities.scrollElementToVisibility(element);
        element.getText().then(function(text) {
          var name = text.replace(/\n/g, ' ');
          if (name === 'Port. Weight') {
            PA3MainPage.rightClickAndSelectOption(element, 'Columns|Add Column…');
          }
        });
      });
    });

    it('Verifying if tile options is opened', function() {
      TileOptions.isTileOptionsMode().then(function(value) {
        if (!value) {
          expect(false).customError('Tile Options mode is Closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

    it('Verifying if "Ticker" is highlighted in Selected section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Ticker').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Ticker" is not selected in the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Show Column" checkbox to un check', function() {
      ThiefHelpers.getCheckBoxClassReference('Show Column').isChecked().then(function(flag) {
        if (flag) {
          ThiefHelpers.getCheckBoxClassReference('Show Column').uncheck();
        }
      });

      // Verifying if "Show Column" is not checked
      ThiefHelpers.getCheckBoxClassReference('Show Column').isChecked().then(function(flag) {
        if (flag) {
          expect(false).customError('"Show Column" checkbox did not un check');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from Tile Option Page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button from Tile Options page');
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should press "CTRL+F" in the calculated report', function() {
      // Hold CTRL+F key
      browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('f').perform();
    });

    it('Verifying if Find widget box is appeared on the report', function() {
      element(by.xpath(PA3MainPage.xpathFindWidgetTextBox)).isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('Find widget box is not appeared on the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should release "CTRL" button', function() {
      // Release CTRL key
      browser.actions().keyUp(protractor.Key.CONTROL).perform();
    });

    it('Should clear the text and type "NLSN" in "Find Security or Group.." text box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathFindWidgetTextBox).setText('NLSN');

      // Verifying if NLSN is typed into the text box
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathFindWidgetTextBox).getText().then(function(text) {
        if (text !== 'NLSN') {
          expect(false).customError('"Find Security or Group.." text box is not set as "NLSN"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on alert symbol and verify if the pop up displays "No Search Results Found!"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathFindWidgetTextBox).getErrors().then(function(text) {
        if (text[0] !== 'No Search Results Found!') {
          expect(false).customError('"No Search Results Found!" is not present as text in alert pop up; Found: ' + text[0]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Ticker" column is not displayed in the report', function() {
      SlickGridFunctions.getColumnNames('Weights').then(function(arrColumnNames) {
        if (arrColumnNames.indexOf('Ticker') >= 0) {
          expect(false).customError('"Ticker" column is present in the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 703130', function() {

    var verifyingColorAndText = function() {

      it('Verifying if the element which is highlighted in "light red" contains "Food" in it', function() {
        var ref = element(by.xpath(PA3MainPage.xpathSearchElementFromSlickGrid));
        ref.getCssValue('background-color').then(function(color) {
          if (color === 'rgba(251, 197, 183, 1)') {
            ref.getText().then(function(text) {

              // Collecting elements which are highlighting for later verification
              highlightedElements.push(text);
              if (text.indexOf('food') < -1 && text.indexOf('Food') < -1) {
                expect(false).customError('The element which is highlighted in red does not contains food; Found: ' + text);
                CommonFunctions.takeScreenShot();
              }
            });
          }
        });
      });
    };

    it('Should right click on "Commercial Services" grouping from calculated report', function() {
      var reference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Commercial Services', 'grid-canvas grid-canvas-bottom grid-canvas-left');
      Utilities.scrollElementToVisibility(reference);
      PA3MainPage.rightClickOnGivenElement(reference).then(function(status) {
        if (!status) {
          expect(false).customError('Menu list did not appear after performing right click on "Commercial Services"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Hover on "Collapse" and should select "Level 1" option from Collapse menu', function() {
      PA3MainPage.getOptionFromCustomMenu('Collapse|Level 1').click().then(function() {
        Utilities.waitUntilElementDisappears(element(by.xpath(SlickGridFunctions.xpathSlickGridLoadingSpinner)), 40000);
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should clear the text and type "Food" in "Find Security or Group.." text box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathFindWidgetTextBox).setText('Food');

      // Verifying if Food is typed into the text box
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathFindWidgetTextBox).getText().then(function(text) {
        if (text !== 'Food') {
          expect(false).customError('"Find Security or Group.." text box is not set as "Food"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Verifying and hitting enter only 4 times in this loop as thief helpers will internally hit enter(enter is hit by thief helpers once in above step).
    for (var i = 0; i < 4; i++) {

      verifyingColorAndText();

      hittingEnter();
    }

    // Verifying 5th element as we did not verify after hitting enter 5th time.
    verifyingColorAndText();
  });

  describe('Test Step ID: 703132', function() {

    var xpathUpArrow = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathFindWidgetUpOrDownArrow, 'Up');

    it('Should reverse the array for verifying if the elements are highlighting from bottom to top for later verification', function() {
      highlightedElements.reverse();
    });

    it('Should click "Up" arrow and verify if the elements are highlighted from bottom to top', function() {
      var ref = element(by.xpath(PA3MainPage.xpathSearchElementFromSlickGrid));

      highlightedElements.forEach(function(element, index) {
        ref.getCssValue('background-color').then(function(color) {
          if (color === 'rgba(251, 197, 183, 1)') {
            ref.getText().then(function(text) {
              if (text !== element) {
                expect(false).customError('The elements did not highlight as expected; Expected: "' + element + '"; Found: "' + text + '"');
                CommonFunctions.takeScreenShot();
              }
            });
          }
        }).then(function() {
          if (index < 4) {
            ThiefHelpers.getButtonClassReference(undefined, xpathUpArrow).press();
          }
        });
      });
    });

    it('Verifying if "Up" arrow is disabled from "Find" Widget', function() {
      ThiefHelpers.getButtonClassReference(undefined, xpathUpArrow).isDisabled().then(function(disabled) {
        if (!disabled) {
          expect(false).customError('"Up" arrow is not disabled from "Find" Widget');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 703138', function() {

    it('Should click on Chart icon available in the "Weights" report Workspace', function() {
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "chart" icon from report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Portfolio Weights" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Portfolio Weights').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Wrench" icon available in Workspace', function() {
      PA3MainPage.selectWrenchIcon('Portfolio Weights');
    });

    it('Verifying if the "wrench" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Wrench" drop down did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Find" option is not displayed in the wrench menu drop down', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
        if (options.indexOf('Find') >= 0) {
          expect(false).customError('"Find" option is displayed in the wrench menu drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 760633', function() {

    it('Should click on the folder icon on app toolbar', function() {
      PA3MainPage.getFolderDropDown().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Should select "New" from list', function() {
      PA3MainPage.getOptionFromFolderMenu('New').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Verifying if "Document has changed" pop up is appeared on the screen', function() {
      PA3MainPage.getDialog('Document has changed').isPresent().then(function(flag) {
        if (flag) {

          // Clicking on Don't Save Changes button from the dialog
          PA3MainPage.getButton('Don\'t Save Changes').click();
        }
      });

      browser.sleep(3000);
    });

    it('Verify if default document is opened without any issues', function() {
      // Creating object
      var documentObj = DocumentJson['pa-document-default'];

      // Verify if application is launched
      browser.getTitle().then(function(title) {
        if (title !== documentObj.browserTitle) {
          expect(false).customError('Title of browser did not match. ' + 'Expected: "' + documentObj.browserTitle + '" but Found: "' + title + '".');
          CommonFunctions.takeScreenShot();
        }
      });

      // Closing Qa info box as it hides search bar in the report
      PA3MainPage.closeQAInfoBox();
    });

    it('Verifying if "Exposures" is selected in the LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Weights', 'Exposures').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Exposures" report is not selected in LHP');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if "Weights Difference" Chart is loaded', function() {
      PA3MainPage.isInChartFormat('Weights Difference').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights Difference" Chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Ctrl+F" from keyboard', function() {
      browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('f').perform();
    });

    verifySearchBar('Weights');

    it('Should release "CTRL" button', function() {
      // Release CTRL key
      browser.actions().keyUp(protractor.Key.CONTROL).perform();
    });

  });

  describe('Test Step ID: 760648', function() {

    it('Should type "Coca-Cola Company" in Search Bar and hit Enter', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathFindWidgetTextBox).setText('Coca-Cola Company');

      // Verifying if Coca-Cola Company is typed into the text box
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathFindWidgetTextBox).getText().then(function(text) {
        if (text !== 'Coca-Cola Company') {
          expect(false).customError('"Coca-Cola Company" is not found in the search bar text box; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    hittingEnter();

    it('Verifying if "Consumer Non-Durables|Beverages: Non-Alcoholic" groupings are expanded', function() {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Consumer Non-Durables|Beverages: Non-Alcoholic');
    });

    var defaultColumnNames = ['', 'Port. Weight', 'Bench. Weight', 'Difference'];
    var takeScreenShot = 0;
    defaultColumnNames.forEach(function(column) {

      it('Verifying if the row for security "Coca-Cola Company" for column "' + column + '" is highlighted in red', function() {
        SlickGridFunctions.getCellReference('Weights', 'Coca-Cola Company', '', column).then(function(reference) {
          reference.getCssValue('background-color').then(function(value) {
            if (value !== 'rgba(251, 197, 183, 1)') {
              expect(false).customError('"' + column + '" column for "Coca-Cola Company" row is not in red color; Found: ' + value);
              takeScreenShot++;
              if (takeScreenShot === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

  });

  describe('Test Step ID: 760658', function() {

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Weights', 'Top Positions', true, 'isSelected');

    var arrReports = ['Top 5 Positions', 'Top/Bottom Relative Positions'];

    arrReports.forEach(function(reportname) {
      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportname);
    });

    it('Verifying if "Position Concentration" Chart is loaded', function() {
      PA3MainPage.isInChartFormat('Position Concentration').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Position Concentration" Chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should press "CTRL+F" in the calculated report', function() {
      // Hold CTRL+F key
      browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('f').perform();
    });

    verifySearchBar('Top 5 Positions');

    it('Should release "CTRL" button', function() {
      // Release CTRL key
      browser.actions().keyUp(protractor.Key.CONTROL).perform();
    });

  });

  describe('Test Step ID: 760661', function() {

    it('Should press "CTRL+F" in the calculated report', function() {
      // Hold CTRL+F key
      browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('f').perform();
    });

    verifySearchBar('Top/Bottom Relative Positions');

    it('Should release "CTRL" button', function() {
      // Release CTRL key
      browser.actions().keyUp(protractor.Key.CONTROL).perform();
    });

  });

  describe('Test Step ID: 760662', function() {

    it('Should press "CTRL+F" in the calculated report', function() {
      // Hold CTRL+F key
      browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('f').perform();
    });

    verifySearchBar('Top 5 Positions');

    it('Should release "CTRL" button', function() {
      // Release CTRL key
      browser.actions().keyUp(protractor.Key.CONTROL).perform();
    });

  });

});
