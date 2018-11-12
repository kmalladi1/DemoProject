'use strict';

require(__dirname + '/../../index.js');
var fs = require('fs');

describe('Test Case: grpg-ov-save', function() {

  var gridObj;
  var filePath = 'C:/Users/' + process.env.USERNAME + '/Downloads';

  var selectOptionFromLevel1Dropdown = function(optionName) {

    it('Should verify if "Level 1" drop-down is enabled in "Grouping Manager"', function() {
      ThiefHelpers.getButtonClassReference(undefined, GroupingManager.getLevelDropDown('Level 1:')).isDisabled().then(function(status) {
        if (status) {
          expect(false).customError('"Level 1" drop-down button is disabled in Grouping Manager');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "' + optionName + '" option from "Level 1" drop-down in "Grouping Manager"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, GroupingManager.getLevelDropDown('Level 1:', true)).selectOptionByText(optionName);
    });

    it('Should verify that "' + optionName + '" option is selected in the "Level 1" drop-down in "Grouping Manager"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, GroupingManager.getLevelDropDown('Level 1:', true)).getText().then(function(val) {
        if (val !== optionName) {
          expect(false).customError('"' + optionName + '" should be selected in "Level 1" drop-down in "Grouping Manager" but found "' + val + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  };

  var getFilename = function(fileName) {
    var defer = protractor.promise.defer();
    var promise = defer.promise;

    // Wait until the file has been downloaded.
    browser.driver.wait(function() {
      return fs.existsSync('' + filePath + '/' + fileName);
    }, 60000).then(function(value) {
      if (value === true) {
        var files = fs.readdirSync(filePath);
        files.forEach(function(file) {
          if (file === fileName) {
            defer.fulfill(true);
          }
        });
      }
    });
    return promise;
  };

  describe('Test Step ID: 769977', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:/PA3/Grouping/GROUPING-OVERRIDES" document and verify if document is opened', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('grouping-overrides');
    });

    // Wait for the loading icon to disappear and verify if "Weights" report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var arrElements = [{widgetXpath: PA3MainPage.xpathPortfolioWidget, widgetName: 'Portfolio', widgetText: 'CLIENT:/PA3/GOV_TEST.ACCT'},
      {widgetXpath: PA3MainPage.xpathBenchmarkWidget, widgetName: 'Benchmark', widgetText: 'RUSSELL:1000'},];

    arrElements.forEach(function(element) {
      // Should verify Portfolio and Benchmark texts
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(element.widgetName, element.widgetXpath, element.widgetText);
    });
  });

  describe('Test Step ID: 769978', function() {

    var checkOptions;

    // Select the "Override Save test" option from the  and verify if it is selected
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Override Save test', true, 'isSelected');

    // Verify if "Economic test" report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Economic test');

    it('Should right click on "Sysco Corporation" in "Economic test" report', function() {
      var reference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Economic test', 2, 'Sysco Corporation', 'slick-cell l1 r1 grid-just-left');
      PA3MainPage.rightClickOnGivenElement(reference).then(function() {
        checkOptions = true;
      }, function(value) {
        if (!value) {
          expect(false).customError('Menu list did not appear after performing right click on "Sysco Corporation".');
          checkOptions = false;
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify that right click menu does not display the option "Assign Grouping…" in "Economic test" report', function() {
      PA3MainPage.getOptionAfterRightClickOnReport('Assign Grouping…').isPresent().then(function(present) {
        if (present) {
          expect(false).customError('"Assign Grouping…" is present in the menu after right clicking on "Sysco Corporation" in "Economic test" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 769979', function() {

    var checkOptions;

    it('Should verify if "Economic test" report is grouped by "High/low"', function() {
      PA3MainPage.getGroupingsHyperLink('Economic test').getText().then(function(refVal) {
        if (refVal.indexOf('High/Low') === -1) {
          expect(false).customError('The "Economic test" report is not grouped by "High/low"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Should click on "High/low" hyperlink in "Economic test" report and verify if "Groupings" tab is selected in LHP'
    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Economic test', 'High/low');

    it('Should click on Remove "X" icon in the Selected section in "Tile Options-Groupings"', function() {
      ThiefHelpers.getTransferBoxReference().target.clear();
    });

    it('Should verify if "Selected" section is empty in "Tile Options-Groupings"', function() {
      ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer).getChildrenText().then(function(element) {
        if (element.length !== 0) {
          expect(false).customError('Selected section is not empty in "Tile Options-Groupings" and found:' + element.length);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Sector & Industry > Factset" and double click on "Economic Sector" from the "Available" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(TileOptionsGroupings.xpathAvailableContainer, 'Economic Sector', 'FactSet|Sector & Industry|FactSet', 'FactSet').then(function(reference) {
        browser.actions().doubleClick(reference).perform();
      });
    });

    it('Should verify if "Economic Sector - FactSet" is present in the "Selected" section of "Tile Options - Economic test"', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'Economic Sector - FactSet').getText().then(function(text) {
        if (text !== 'Economic Sector - FactSet') {
          expect(false).customError('"Economic Sector - FactSet" is not present in the "Selected" section of "Tile Options - Economic test"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(true).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if the count of elements in selected section is "1"', function() {
      ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathSelectedContainer).getChildrenText().then(function(element) {
        if (element.length !== 1) {
          expect(false).customError('Expected count of elements in selected section is "1" but the count is found to be ' + element.length);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Should Click OK on "Tile Options - Economic test" report
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Economic test');

    // Verify if "Economic test" report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Economic test');

    it('Should right click on "ADT Corporation" under "Commercial Services" grouping in "Economic test" report', function() {
      var reference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Economic test', 2, 'ADT Corporation', 'grid-canvas grid-canvas-bottom grid-canvas-left');
      PA3MainPage.rightClickOnGivenElement(reference).then(function() {
        checkOptions = true;
      }, function(value) {
        if (!value) {
          expect(value).customError('Menu list did not appear after performing right click on "ADT Corporation".');
          checkOptions = false;
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Assign Grouping…" option is present in right click menu of "ADT Corporation"', function() {
      PA3MainPage.getOptionAfterRightClickOnReport('Assign Grouping…').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Assign Grouping…" is not present in the menu after right clicking on "ADT Corporation"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 769980', function() {

    var elementsinRHSpane = ['Identifier:', 'Name:', 'Current Grouping:'];
    var elementsinRHSpaneValues = ['00101J10', 'ADT Corporation', 'Commercial Services'];

    it('Should select the "Assign Grouping…" option in the right click menu of "ADT Corporation" in "Economic test" report', function() {
      PA3MainPage.getOptionFromCustomMenu('Assign Grouping…').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify that "Grouping Manager" dialog opens', function() {
      ThiefHelpers.isDialogOpen('Grouping Manager').then(function(option) {
        if (!option) {
          expect(false).customError('"Grouping Manager" dialog did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if the slickgrid in the "Grouping Manager" contains "Ticker" and "security" columns', function() {
      var columnNamesToBeVerified = ['Ticker', 'security'];

      //Should fetch all column names of slickgrid
      GroupingManager.getAllColumnNamesFromtheSlickGrid().then(function(colNames) {
        columnNamesToBeVerified.forEach(function(element, index) {
          if (element === 'security') {
            if (colNames[index] !== '') {
              expect(false).customError('The Grouping Manager does not contain security column but contains: ' + colNames[index]);
              CommonFunctions.takeScreenShot();
            }
          } else {
            if (element !== colNames[index]) {
              expect(false).customError('The slickgrid does not contain Ticker column but contains ' + colNames[index]);
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    // Known Issue: http://is.factset.com/rpd/summary.aspx?messageid=19098139
    it('Should verify if "ADT Corporation" element is present in the slickgrid of "Grouping Manager"', function() {
      GroupingManager.getElementFromSpecifiedLevel(2, 'ADT Corporation').isPresent().then(function(check) {
        if (!check) {
          expect(false).customError('"ADT Corporation" is not present in the slickgrid of "Grouping Manager"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Known Issue: http://is.factset.com/rpd/summary.aspx?messageid=19098139
    it('Should click on "ADT Corporation" element under "Commercial Services" grouping in "Grouping Manager"', function() {
      GroupingManager.getElementFromSpecifiedLevel(2, 'ADT Corporation').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if the "' + elementsinRHSpane + '" contains the respective values "' + elementsinRHSpaneValues + '" in RHS pane for the security "ADT Corporation"', function() {
      elementsinRHSpane.forEach(function(element, index) {
        GroupingManager.getDataFromRHP(element).getText().then(function(value) {
          if (elementsinRHSpaneValues[index] !== value) {
            expect(false).customError('Expected value for "' + element + '" is "' + elementsinRHSpaneValues[index] + '" but found ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should verify if "Level 1" drop-down is enabled in "Grouping Manager"', function() {
      ThiefHelpers.getButtonClassReference(undefined, GroupingManager.getLevelDropDown('Level 1:')).isDisabled().then(function(status) {
        if (status) {
          expect(false).customError('"Level 1" drop-down button is disabled in Grouping Manager');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify that "Commercial Services" option is selected in the "Level 1" drop-down in "Grouping Manager"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, GroupingManager.getLevelDropDown('Level 1:', true)).getText().then(function(val) {
        if (val !== 'Commercial Services') {
          expect(false).customError('"Commercial Services" should be selected in "Level 1" drop-down in "Grouping Manager" but found "' + val + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 769981', function() {

    var checkOptions;

    selectOptionFromLevel1Dropdown('Energy Minerals');

    it('Should click on "Remove All" button in the lower pane of "Grouping Manager" dialog', function() {
      ThiefHelpers.getButtonClassReference(undefined, GroupingManager.getButton('remove all')).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Add" button in the "Grouping Manager" dialog', function() {
      ThiefHelpers.getButtonClassReference(undefined, GroupingManager.getButton('Add')).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Apply & Close" button in the "Grouping Manager" dialog', function() {
      ThiefHelpers.getButtonClassReference('Apply & Close', undefined).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify that "Grouping Manager" dialog is closed', function() {
      ThiefHelpers.isDialogOpen('Grouping Manager').then(function(option) {
        if (option) {
          expect(false).customError('"Grouping Manager" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should right click on "Commercial Services" grouping in "Economic test" report', function() {
      var reference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Economic test', 1, 'Commercial Services');
      PA3MainPage.rightClickOnGivenElement(reference).then(function() {
        checkOptions = true;
      }, function(value) {
        if (!value) {
          expect(false).customError('Menu list did not appear after performing right click on "Commercial Services".');
          checkOptions = false;
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select the "Groupings>Enable Grouping Overrides" option in the right click menu', function() {
      PA3MainPage.getOptionFromCustomMenu('Groupings|Enable Grouping Overrides').click();
    });

    it('Should click on "refresh" button in application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if "ADT Corporation" is present under the grouping "Energy Minerals" in "Economic test" report', function() {
      var parentID;
      SlickGridFunctions.getAllRowsFromReport('Economic test').then(function(reference) {
        reference.forEach(function(element) {
          if (element.metadata.type === 'group' && element[1] === 'Energy Minerals') {
            parentID = element.id;
          }

          if (element[1] === 'ADT Corporation' && element.metadata.type === 'security') {
            if (parentID === element.parentId) {
              expect(true).toBeTruthy();
            } else {
              expect(false).customError('"ADT Corporation" is not present under the grouping "Energy Minerals"');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });
  });

  describe('Test Step ID: 769982', function() {

    // Click on the folder icon and select "Save As..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Save As…');

    // Select personal directory and enter the document name "grpg-override" in document field and click on "save" button.
    CommonPageObjectsForPA3.selectPersonalAndEnterDocumentNameInSaveAsDialog('grpg-override', undefined, true);

    it('Should open "PA_DOCUMENTS:DEFAULT" document in a new tab', function() {
      var url = 'https://pa.apps.factset.com/';
      return browser.executeScript('return window.open(arguments[0], \'_blank\')', url);
    });

    it('Should verify if "Portfolio window" is displayed', function() {
      browser.getAllWindowHandles().then(function(handles) {
        browser.driver.switchTo().window(handles[1]).then(function() {
          browser.driver.wait(function() {
            return browser.driver.getTitle().then(function(title) {
              return title.indexOf('Portfolio Analysis 3.0') > -1;
            });
          }, 30000, '"PA3" application page is not loaded within 30 seconds.').then(function() {
          }, function(error) {

            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
        });
      });
    });

    // Click on the folder icon and select "Open..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Open...');

    it('Should click on "Don\'t Save Changes" button if "Document has changed" popup appears', function() {
      element(by.xpath(CommonPageObjectsForPA3.xpathOfDocumentHasChangedDialog)).isPresent().then(function(flag) {
        if (flag) {
          element(by.xpath(CommonFunctions.replaceStringInXpath(CommonPageObjectsForPA3.xpathOfButtonOfDocumentHasChangedDialog, 'Don\'t Save Changes'))).click().then(function() {
          }, function(err) {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Should click on "Don\'t Save Changes" button if "Document has changed" popup appears', function() {
      PA3MainPage.getDialog('Document has changed').isPresent().then(function(flag) {
        if (flag) {
          PA3MainPage.getButton('Don\'t Save Changes').click().then(function() {
          }, function(err) {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Should select "Personal" group in LHP if not selected', function() {
      ThiefHelpers.getListboxGroup(undefined, 'Personal').isSelected().then(function(selected) {
        if (!selected) {
          ThiefHelpers.getListboxGroup(undefined, 'Personal').select().then(function() {
          }, function(err) {

            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Should verify if "grpg-override" document is displayed in the "open" file-dialog', function() {
      CommonPageObjectsForPA3.verifyIfDocumentIsDisplayed('grpg-override', true);
    });

    var currentDate;
    var modifiedDate;

    it('Should verify if "grpg-override" document displays "today\'s date" under "Date Modified" column in the "Open" file dialog', function() {

      // Should fetch the "Date Modified" column value for "grpg-override" document in "Open" file dialog
      FileDialog.getDateModified('grpg-override', true).then(function(cell) {
        cell.getText().then(function(dateVal) {
          modifiedDate = dateVal.substring(0, 11);
        });
      }).then(function() {

        Utilities.getCurrentDate('MMMDDYYYY', '-', undefined).then(function(todaysDate) {
          currentDate = todaysDate.substring(0);
          if (currentDate !== modifiedDate) {
            expect(false).customError('"grpg-override" document does not display "' + currentDate + '" under "Modified Date" column but displays ' + modifiedDate);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 769983', function() {

    var parentID;

    it('Should select the document "grpg-override" document', function() {
      FileDialog.selectDataFromHtmlDialog('grpg-override');
    });

    it('Should click on the "Open" button', function() {
      ThiefHelpers.getButtonClassReference('Open').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "open" button.');
        CommonFunctions.takeScreenShot();
      });
    });

    // Select the "Override Save test" option from the  and verify if it is selected
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Override Save test', true, 'isSelected');

    it('Should verify if "ADT Corporation is present under the grouping "Energy Minerals" in "Economic test" report', function() {
      SlickGridFunctions.getAllRowsFromReport('Economic test').then(function(reference) {
        reference.forEach(function(element) {
          if (element.metadata.type === 'group' && element[1] === 'Energy Minerals') {
            parentID = element.id;
          }

          if (element[1] === 'ADT Corporation' && element.metadata.type === 'security') {
            if (parentID === element.parentId) {
              expect(true).toBeTruthy();
            } else {
              expect(false).customError('"ADT Corporation" is not present under the grouping "Energy Minerals" in "Economic test" report');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });
  });

  describe('Test Step ID: 769984', function() {

    it('Should verify "Economic test" report is grouped by "Economic Sector"', function() {
      PA3MainPage.getGroupingsHyperLink('Economic test').getText().then(function(refVal) {
        if (refVal.indexOf('Economic Sector') === -1) {
          expect(false).customError('The "Economic test" report is not grouped by "Economic Sector"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Should click on "Economic Sector" hyperlink in "Economic test" report'
    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Economic test', 'Economic Sector');

    it('Should expand "Sector & Industry > Factset" and double click on "Industry" from the "Available" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(TileOptionsGroupings.xpathOfAvailableContainer, 'Industry', 'FactSet|Sector & Industry|FactSet', 'FactSet').then(function(reference) {
        browser.actions().doubleClick(reference).perform();
      });
    });

    it('Should verify if "Industry - FactSet" is present in the "Selected" section of "Tile Options - Economic test"', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'Industry - FactSet').getText().then(function(text) {
        if (text !== 'Industry - FactSet') {
          expect(false).customError('"Industry - FactSet" is not present in the "Selected" section of "Tile Options - Economic test"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(true).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if the count of elements in selected section is "2"', function() {
      ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathSelectedContainer).getChildrenText().then(function(element) {
        if (element.length !== 2) {
          expect(false).customError('Expected count of elements in selected section is "1" but the count is found to be ' + element.length);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Should Click OK on "Tile Options - Economic test" report
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Economic test');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Economic test');

    it('Should "scroll" down the "Economic test" report to "Energy Minerals > Miscellaneous Commercial Services"', function() {
      SlickGridFunctions.getCellReference('Economic test', 'Oil & Gas Production', '', 'Average Weight');
    });

    it('Should verify if "ADT Corporation" is displayed under the grouping "Energy Minerals > Miscellaneous Commercial Services"', function() {
      PA3MainPage.getElementFromCalculatedTree('Economic test', 'Energy Minerals|Miscellaneous Commercial Services', 'ADT Corporation').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"ADT Corporation" is not displayed under the grouping "Energy Minerals > Miscellaneous Commercial Services"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 769985', function() {

    var checkOptions;

    it('Should right click on "ADT Corporation" in "Economic test" report', function() {
      var reference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Economic test', 3, 'ADT Corporation', 'slick-cell l1 r1 grid-just-left');
      PA3MainPage.rightClickOnGivenElement(reference).then(function() {
        checkOptions = true;
      }, function(value) {

        if (!value) {
          expect(false).customError('Menu list did not appear after performing right click on "ADT Corporation".');
          checkOptions = false;
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Assign Grouping…" option is present in right click menu of "ADT Corporation"', function() {
      PA3MainPage.getOptionAfterRightClickOnReport('Assign Grouping…').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Assign Grouping…" is not present in the menu after right clicking on "ADT Corporation"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select the "Assign Grouping…" option in the right click menu', function() {
      PA3MainPage.getOptionFromCustomMenu('Assign Grouping…').click();
    });

    it('Should verify that "Grouping Manager" dialog opens', function() {
      ThiefHelpers.isDialogOpen('Grouping Manager').then(function(option) {
        if (!option) {
          expect(false).customError('"Grouping Manager" dialog did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Remove All" button in the lower pane of "Grouping Manager" dialog', function() {
      ThiefHelpers.getButtonClassReference(undefined, GroupingManager.getButton('remove all')).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Apply & Close" button in the "Grouping Manager" dialog', function() {
      ThiefHelpers.getButtonClassReference('Apply & Close', undefined).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify that "Grouping Manager" dialog is closed', function() {
      ThiefHelpers.isDialogOpen('Grouping Manager').then(function(option) {
        if (option) {
          expect(false).customError('"Grouping Manager" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "ADT Corporation" is displayed under the grouping "Commercial Services > Miscellaneous Commercial Services" in "Economic test" report', function() {
      PA3MainPage.getElementFromCalculatedTree('Economic test', 'Commercial Services|Miscellaneous Commercial Services', 'ADT Corporation').isDisplayed().then(function(bool) {
        if (!bool) {
          expect(false).customError('"ADT Corporation" is not displayed under the grouping "Commercial Services > Miscellaneous Commercial Services" in "Economic test" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 769986', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:/PA3/Grouping/Download-override-list" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('download-override-list');
    });

    // Wait for the loading icon to disappear and verify if "Weights" report is calculated and opened
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    // Verifying the Portfolio widget text
    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Portfolio', PA3MainPage.xpathPortfolioWidget, 'BENCH:SP50');
  });

  describe('Test Step ID: 769987', function() {

    // Should click on Wrench icon in the Application tool bar and select Grouping Overrides option
    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSelectOption('Grouping Overrides');

    it('Should verify that "Grouping Manager" dialog opens', function() {
      ThiefHelpers.isDialogOpen('Grouping Manager').then(function(option) {
        if (!option) {
          expect(false).customError('"Grouping Manager" dialog did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 769988', function() {

    var expandAndSelect = function(groupName, elementName) {

      it('Should expand "' + groupName + '" under "Consumer Discretionary" in "Grouping Manager" dialog box', function() {
        GroupingManager.expandTree(groupName);

        // Should verify if the tree is expanded
        GroupingManager.checkIfTreeExpanded('Consumer Discretionary|' + groupName);
      });

      it('Should select "' + elementName + '" element under the grouping "' + groupName + '" in "Grouping Manager" dialog box', function() {
        GroupingManager.getElementFromSpecifiedLevel(3, elementName).click();
      });

      selectOptionFromLevel1Dropdown('Energy');
    };

    expandAndSelect('Auto Components', 'Aptiv PLC');

    it('Should click on "Remove All" button in the lower pane of "Grouping Manager" dialog', function() {
      ThiefHelpers.getButtonClassReference(undefined, GroupingManager.getButton('remove all')).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Add" button in the "Grouping Manager" dialog', function() {
      ThiefHelpers.getButtonClassReference(undefined, GroupingManager.getButton('Add')).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    expandAndSelect('Automobiles', 'Ford Motor Company');

    it('Should select "Client" from "Save Location:" drop down in "Grouping Manager" dialog', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, GroupingManager.xpathOfSaveLocationDropdown, true).selectItemByText('Client');

      // Verifying if "Client" is selected in the "Save Location:" dropdown
      ThiefHelpers.getDropDownSelectClassReference(undefined, GroupingManager.xpathOfSaveLocationDropdown, true).getSelectedText().then(function(text) {
        if (text !== 'Client') {
          expect(false).customError('"Client" option is not selected in Level 1: dropdown in Grouping Manager but found ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Add" button in the "Grouping Manager" dialog', function() {
      ThiefHelpers.getButtonClassReference(undefined, GroupingManager.getButton('Add')).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if the bottom section of "Grouping Manager" displays "Four" securities', function() {
      ThiefGridHelpers.getRowCount({
        gridSelector: 'tf-local-grid',
      }).then(function(count) {
        if (count !== 4) {
          expect(false).customError('The bottom section of "Grouping Manager" does not display "Four" securities but displays "' + count + '" securities');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var clientCount = 0;
    var personalCount = 0;
    it('Should verify if the bottom section of "Grouping Manager" displays the securities having 2 "Client" and 2 "Personal"', function() {
      ThiefGridHelpers.getColumnData({
        gridSelector: 'tf-local-grid',
        columnName: 'Save Location',
        returnElement: false,
      }).then(function(element) {
        element.forEach(function(text) {
          if (text === 'Client')
            ++clientCount;
          if (text === 'Personal')
            ++personalCount;
        });
      }).then(function() {
        if (clientCount !== 2 && personalCount !== 2) {
          expect(false).customError('The bottom section of "Grouping Manager" under "Save Location" column does not display the securities having 2 "Client" and 2 "Personal"' + clientCount + ',' + personalCount);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should fetch all the data from the bottom section of "Grouping Manager"', function() {
      ThiefGridHelpers.getRowData({
        gridSelector: 'tf-local-grid',
        columnWhitelist: ['Identifier', 'Name', 'Assigned Grouping', 'Grouping Name', 'Start Date', 'End Date', 'Save Location'],
        rows: 4,
        returnElement: false,
      }).then(function(values) {
        gridObj = values.nonFrozenRowData;
      });
    });
  });

  describe('Test Step ID: 769989', function() {

    it('Should click on "Download" button to download the data from bottom section of "Grouping Manager" dialog', function() {
      ThiefHelpers.getButtonClassReference(undefined, GroupingManager.getButton('download')).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the excel file downloaded with name: Grouping Overrides.xlsx', function() {
      expect(getFilename('Grouping Overrides.xlsx')).toBe(true, 'Error: excel file is not downloaded');
    });

    it('Should extract data from "Grouping Overrides.xlsx" excel sheet and compare with the data present in the bottom section of "Grouping Manager"', function() {
      var excelObj = ExcelUtilities.getDataFromExcelSheet(filePath, 'Grouping Overrides.xlsx', 'Overrides List');

      // Should compare the excel data with the grid data
      Utilities.ObjectArrayCompare(excelObj, gridObj, _.keys(gridObj[0]));
    });
  });

  describe('Test Step ID: 769990', function() {

    it('Should delete the excel file "Grouping Overrides.xsls" from the downloaded location', function() {
      fs.unlinkSync('C:/Users/' + process.env.USERNAME + '/Downloads/Grouping Overrides.xlsx');
    });

    it('Should click on "Cancel" button in "Grouping Manager" dialog', function() {
      ThiefHelpers.getButtonClassReference('Cancel', undefined).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if the "Grouping Manager" dialog is closed', function() {
      ThiefHelpers.isDialogOpen('Grouping Manager').then(function(option) {
        if (option) {
          expect(false).customError('"Grouping Manager" dialog is open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Should verify if "Weights" report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');
  });
});
