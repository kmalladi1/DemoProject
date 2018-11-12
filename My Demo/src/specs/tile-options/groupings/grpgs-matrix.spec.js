'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: grpgs-matrix', function() {

  // Variables
  var arrRegions = [];
  var arrColumns = [];
  var arrValues = [];
  var arrSelectedElements = ['Matrix Region of Domicile - FactSet', 'Country of Domicile - FactSet', 'Currency'];

  // Getting the xpath of the Selected section for columns
  var xpathOfColumnsSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Available');

  describe('Test StepID: 586449', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:Pa3;Grouping;MATRIX-GROUPING" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('matrix-grouping');
    });

    it('Wait for the loading icon to disappear', function() {
      browser.sleep(2000);

      // Wait for the loading icon to disappear
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 200000)).toBeTruthy();
    });

    it('Verifying if "Weights" report is appeared', function() {
      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Weights').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Error:Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "Weights" report is selected in LHP', function() {
      PA3MainPage.getReports('Weights').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') < 0) {
          expect(false).customError('"Weights" report is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test StepID: 586447', function() {

    it('Should note row and column and the corresponding values for future verification', function() {
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 1).each(function(eleRef, index) {
        if (index === 0) {
          CommonFunctions.captureScreenShot();
        }

        eleRef.getText().then(function(rowName) {
          arrRegions.push(rowName);
          PA3MainPage.getAllColumnOfCalculatedReport('Weights').each(function(eleRef) {
            eleRef.getText().then(function(colName) {
              arrColumns.push(colName.replace(/\n/g, ' '));
              PA3MainPage.getValueFromCalculatedReport('Weights', rowName, colName.replace(/\n/g, ' ')).then(function(value) {
                arrValues.push(value);
              });
            });
          });
        });
      });
    });

    it('Verifying if South america is displayed in the report', function() {
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 1).each(function(eleRef, index) {
        if (index === 0) {
          CommonFunctions.captureScreenShot();
        }

        eleRef.getText().then(function(rowName) {
          if (rowName === 'South America') {
            expect(false).customError('Known issue RPD:35798331 is resolved and South America is displayed in the report.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on wrench icon in report', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click();
    });

    it('Should select "Options" from drop down', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {}, function(error) {

        CommonFunctions.takeScreenShot();
        expect(false).customError(error);
      });
    });

    it('Verifying if "Tile Options" View mode is appeared', function() {
      TileOptions.isTileOptionsMode().then(function(found) {
        if (!found) {
          expect(false).customError('Error: "Tile Options" view mode is not appeared');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Grouping" option from LHP', function() {
      TileOptions.getLHPOption('Groupings').click();

      // Verifying that view displayed is "Grouping"
      TileOptions.getOptionTitle().getText().then(function(text) {
        expect(text.indexOf('Groupings') >= 0).customError('Error: "Grouping" pane is not selected');
      });
    });

    it('Should click on "cog" icon next to "Region of Domicile - FactSet" in selected section', function() {
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Region of Domicile - FactSet').click();

      // Verifying if options popup is appeared
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Region of Domicile - FactSet', true).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('Error: Failed to open "Options" popup');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Matrix" radio button in option popup', function() {
      TileOptionsGroupings.getRadioBtnFromOptionsPopup('Matrix').click().then(function() {}, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "OK" button in options popup', function() {
      TileOptionsGroupings.getOkOrCancelButtonOptionsPopuop('ok').click();

      // Verifying if options popup is disappeared
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Region of Domicile - FactSet', true).isPresent().then(function(found) {
        if (found) {
          expect(false).customError('Error: Failed to close "Options" popup');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options - Weights" header bar', function() {
      TileOptions.getHeaderButton('OK').click();
    });

    it('Waiting for reports to calculate', function() {
      browser.sleep(2000);

      // Waiting for loading icon to disappear
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);
    });

    it('Verifying if "Weights" report is appeared', function() {
      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Weights').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Error:Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('Error: "Calculation Error" dialog is seen while "Attribution" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Regions" are displayed in column header', function() {
      SlickGridFunctions.getMultiHeaderNames('Weights').then(function(multiheaderName) {
        arrRegions.forEach(function(name, index) {
          if (name.indexOf(multiheaderName[index]) === -1) {
            expect(false).customError('"' + name + '" is not displayed in the column Header.');
            CommonFunctions.takeScreenShot();
          }
        });

      });
    });

    it('Verifying if "3M Company" security is displayed in rows', function() {
      // Wait until the elements to load
      browser.sleep(2000);

      PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, '3M Company').isPresent().then(function(bool) {
        if (!bool) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"3M Company" security is not displayed in rows');
        }
      });
    });

    it('Verify that the last column section is displayed for "Total"', function() {
      // Wait until the elements to load
      browser.sleep(2000);

      PA3MainPage.getAllMultiHeaderColumns('Weights').count().then(function(colCount) {
        PA3MainPage.getAllMultiHeaderColumns('Weights').get(colCount - 1).getWebElement().then(function(col) {
          Utilities.makeElementVisible(PA3MainPage.getAllMultiHeaderColumns('Weights').get(colCount - 1));
          col.getText().then(function(colName) {
            if (colName !== 'Total') {
              expect(false).customError('The last section for columns is not dispalyed for Total');
            }
          });
        });
      });
    });

    var flag = 0;
    it('Verify that the values noted before are matching with Total row Values', function() {
      arrValues.forEach(function(val, index) {
        PA3MainPage.getCellValueForMultiHeaderColumn('Weights', 'Total', index + 1, 'grid-canvas grid-canvas-top grid-canvas-left', 'grid-canvas grid-canvas-top grid-canvas-right', true).then(function(reference) {
          Utilities.makeElementVisible(reference);
          reference.getText().then(function(value) {
            if (value !== val) {
              flag = flag + 1;
              expect(false).customError(value + 'not Equal to' + val);
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });

  describe('Test StepID: 568448', function() {

    it('Should click on "Region of Domicile" hyperlink in report', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').click();
    });

    it('Verifying if "Tile Options" View mode is appeared', function() {
      // Waiting for loading icon to disappear
      browser.sleep(2000);

      TileOptions.isTileOptionsMode().then(function() {}, function(err) {

        expect(false).customError('Error: "Tile Options" view mode is not appeared' + err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Groupings" option from LHP is selected', function() {
      // Verifying that view displayed is "Groupings"
      TileOptions.getOptionTitle().getText().then(function(text) {
        expect(text.indexOf('Groupings') >= 0).customError('"Groupings" pane is not selected');
      });
    });

    it('Should double click on "Currency" element in "Available" section', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('FactSet', 'Currency')).perform();
    });

    it('Should expand "Country & Region>FactSet" in "Available" section', function() {
      TileOptionsGroupings.expandElementTree('Country & Region|FactSet');

      // Verifying if "Country & Region>FactSet" is expanded
      TileOptionsGroupings.checkIfExpanded('Country & Region|FactSet');
    });

    it('Should double click on "Country of Domicile" under "Country & Region>FactSet" in "Available" section', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('Country & Region|FactSet', 'Country of Domicile')).perform();
    });

    it('Verifying if "Country of Domicile - FactSet" is selected in "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Country of Domicile - FactSet').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Country of Domicile - FactSet" is not selected in "Selected"' + ' section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on up arrow twice', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getArrowButton('up')).perform();
    });

    var flag = 0;
    arrSelectedElements.forEach(function(element, index) {
      it('Verifying if "' + element + '" is present at "' + index + '" position in "Selected" section', function() {
        TileOptionsGroupings.getAllElements('Selected').get(index).getText().then(function(text) {
          if (text.indexOf(element) < 0) {
            flag = flag + 1;
            expect(false).customError('"' + element + '" is not present at "' + index + '" position ' + 'in "Selected" section');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });
  });

  describe('Test StepID: 586453', function() {

    it('Should click on "OK" button from "Tile Options - Cash Flows" header bar', function() {
      TileOptions.getHeaderButton('OK').click();
    });

    it('"Tile Options - Cash Flows" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(found) {
        if (found) {
          expect(false).customError('Error: "Tile Options" view mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for report to calculate', function() {
      browser.sleep(2000);

      // Waiting for loading icon to disappear
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);
    });

    it('Verifying if "Weights" report is appeared', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Error:Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should right click on "United States" and select "Expand > All" option', function() {
      var eleRef = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'United States');

      PA3MainPage.rightClickAndSelectOption(eleRef, 'Expand|All');
    });

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Portfolio', 'Prices', 'document options');

    it('Should check "Use Portfolio Pricing Sources for Benchmark" checkbox', function() {
      DocumentOptionsPricesPortfolio.getUsePortPricingForBenchCheckBox().click().then(function() {}, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });

      // Verifying that 'Use Portfolio Pricing Sources for Benchmark' is checked
      Utilities.isCheckboxSelected(DocumentOptionsPricesPortfolio.getUsePortPricingForBenchCheckBox()).then(function(bool) {
        if (!bool) {
          expect(false).customError('Failed to check "Use Portfolio Pricing Sources for Benchmark" checkbox');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "OK" button in "Document Options" mode', function() {
      DocumentOptions.getHeaderButton('OK').click().then(function() {}, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Weights" report appeared', function() {
      // Verifying "Characteristics - Summary" Report is calculated
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
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

    it('Verifying if "Canada > U.S. Dollar > Thomson Reuters Corporation" is present in row', function() {
      PA3MainPage.getElementFromCalculatedTree('Weights', 'Canada|U.S. Dollar', 'Thomson Reuters Corporation').isDisplayed().then(function(bool) {
        if (!bool) {
          expect(false).customError(' "Canada > U.S. Dollar > Thomson Reuters Corporation" is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Regions" are displayed in column header', function() {
      SlickGridFunctions.getMultiHeaderNames('Weights').then(function(multiheaderName) {
        arrRegions.forEach(function(name, index) {
          if (name.indexOf(multiheaderName[index]) === -1) {
            expect(false).customError('"' + name + '" is not displayed in the column Header.');
            CommonFunctions.takeScreenShot();
          }
        });

      });
    });
  });

  describe('Test StepID: 586450', function() {

    it('Should click on "Region of Domicile" hyperlink in report', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').click();
    });

    it('Verifying if "Tile Options" View mode is appeared', function() {
      // Waiting for loading icon to disappear
      browser.sleep(2000);

      TileOptions.isTileOptionsMode().then(function() {}, function() {

        expect(false).customError('Error: "Tile Options" view mode is not appeared');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Groupings" option from LHP is selected', function() {
      // Verifying that view displayed is "Groupings"
      TileOptions.getOptionTitle().getText().then(function(text) {
        expect(text.indexOf('Groupings') >= 0).customError('"Groupings" pane is not selected');
      });
    });

    it('Should select "Matrix Region of Domicile - FactSet" element in "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Matrix Region of Domicile - FactSet').click();
    });

    it('Should click on down arrow button twice', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getArrowButton('down')).perform();
    });

    var flag = 0;
    arrSelectedElements.forEach(function(element, index) {
      it('Verifying if "' + element + '" is present at "' + index + 1 + '" position in "Selected" section', function() {
        TileOptionsGroupings.getAllElements('Selected').get(index).getText().then(function(text) {
          if (text.indexOf(element) < 0) {
            expect(false).customError('"' + element + '" is not present at "' + index + '" position ' + 'in "Selected" section');
            flag = flag + 1;
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it('Should click on "cog" icon next to "Currency" in "Selected" section', function() {
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Currency').click();

      // Verifying if options popup is appeared
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Currency', true).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('Error: Failed to open "Options" popup');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Divide" option for "Currency" is disabled and deselected by default', function() {
      TileOptionsGroupings.getRadioBtnFromOptionsPopup('Divide', true).getAttribute('class').then(function(cls) {
        if (cls.indexOf('disabled') < 0) {
          expect(false).customError('"Divide" radio button is selected by default');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Matrix" options for "Currency" is enabled by default', function() {
      TileOptionsGroupings.getRadioBtnFromOptionsPopup('Matrix', true).getAttribute('class').then(function(cls) {
        if (cls.indexOf('disabled') >= 0) {
          expect(false).customError('"Matrix" radio button is selected by default');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arr = ['Matrix', 'Divide'];
    arr.forEach(function(arrVal) {
      it('Verifying if "' + arrVal + '" options for "Currency" is deselected by default', function() {
        TileOptionsGroupings.getRadioBtnFromOptionsPopup(arrVal).getAttribute('class').then(function(cls) {
          if (cls.indexOf('selected') > -1) {
            expect(false).customError('"Matrix" radio button is selected by default');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test StepID: 586451', function() {

    it('Should hover over on "Matrix Region of Domicile - FactSet" in "Selected" section', function() {
      // Hovering on "Matrix Region of Domicile - FactSet"
      browser.actions().mouseMove(TileOptionsGroupings.getElementFromSelectedContainer('Matrix Region of Domicile - FactSet')).perform();
    });

    it('Should click on "cog" icon next to "Matrix Region of Domicile - FactSet" in "Selected" section', function() {
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Matrix Region of Domicile - FactSet').click();

      // Verifying if options popup is appeared
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Matrix Region of Domicile - FactSet', true).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('Error: Failed to open "Options" popup');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Remove Matrix" radio button in option popup', function() {
      TileOptionsGroupings.getRadioBtnFromOptionsPopup('Remove Matrix').click();
    });

    it('Should click on "OK" button in options popup', function() {
      TileOptionsGroupings.getOkOrCancelButtonOptionsPopuop('ok').click();

      // Verifying if options popup is disappeared
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Matrix Region of Domicile - FactSet', true).isPresent().then(function(found) {
        if (found) {
          expect(false).customError('Error: Failed to close "Options" popup');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "X" icon next to the "Currency" element in "Selected" section', function() {
      TileOptionsGroupings.getRemoveButtonOfElementInSelectedSection('Currency').click();

      // Verifying if "Currency" element is not present in "Selected" section
      TileOptionsGroupings.getElementFromSelectedContainer('Currency').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('Failed to click on "X" icon next to the "Currency" element in ' + '"Selected" section');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.message.indexOf('Index out of bound') >= 0) {
          expect(true).customError(error);
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "cog" icon next to "Country of Domicile - FactSet" in "Selected" section', function() {
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Country of Domicile - FactSet').click();

      // Verifying if options popup is appeared
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Country of Domicile - FactSet', true).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('Error: Failed to open "Options" popup');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Divide" radio button in option popup', function() {
      TileOptionsGroupings.getRadioBtnFromOptionsPopup('Divide').click().then(function() {}, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "OK" button in options popup', function() {
      TileOptionsGroupings.getOkOrCancelButtonOptionsPopuop('ok').click();

      // Verifying if options popup is disappeared
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Region of Domicile - FactSet', true).isPresent().then(function(found) {
        if (found) {
          expect(false).customError('Error: Failed to close "Options" popup');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrElementsToVerify = ['Region of Domicile - FactSet', 'Divide by Country of Domicile - FactSet'];
    arrElementsToVerify.forEach(function(element) {
      it('Verifying if "' + element + '" element is present in "Selected" section', function() {
        TileOptionsGroupings.getElementFromSelectedContainer(element).isPresent().then(function(found) {
          if (!found) {
            expect(false).customError('"' + element + '" is not present in "Selected" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test StepID: 586454', function() {

    it('Should click on "Cancel" button from "Tile Options - Weights" header bar', function() {
      TileOptions.getHeaderButton('Cancel').click();
    });

    it('Should open Wrench menu in the Application tool bar', function() {
      PA3MainPage.getWrenchIcon().click();

      // Verifying if Wrench menu is opened.
      expect(PA3MainPage.getWrenchIcon(true).isPresent()).toBeTruthy();
    });

    it('Should select "Grouping Overrides" from Wrench menu to open "Grouping Manager" dialog', function() {
      PA3MainPage.getOptionFromWrenchMenu('Grouping Overrides').click();

      // Verify that "Document Options" view appear.
      ThiefHelpers.isDialogOpen('Grouping Manager');
    });

    it('Should click on "3M Company" element under "United States > U.S. Dollar" tree', function() {
      GroupingManager.getElementFromSpecifiedLevel('3', '3M Company').click();
    });

    it('Should click on "Remove All" button in the lower pane', function() {
      GroupingManager.getButton('Remove All').click();
    });

    it('Should select "Canada" option from "Level 1" drop-down in "Grouping Manager"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, GroupingManager.getLevelDropDown('Level 1:', true)).selectOptionByText('Canada');

      ThiefHelpers.getTextBoxClassReference(undefined, GroupingManager.getLevelDropDown('Level 1:', true)).getText().then(function(val) {
        if (val !== 'Canada') {
          expect(false).customError('"Canada" should be selected in "Level 1" drop-down in "Grouping Manager" but found "' + val + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Add" button', function() {
      GroupingManager.getButton('Add').click().then(function() {}, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Apply & Close" button', function() {
      GroupingManager.getButton('Apply & Close').click();
    });

    it('Wait for the loading icon to disappear', function() {
      browser.sleep(2000);

      // Wait for the loading icon to disappear
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 200000)).toBeTruthy();
    });

    it('Should right click on "Canada" and select and "Grouping > Enable Grouping Overrides"', function() {
      PA3MainPage.rightClickAndSelectOption(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Canada'), 'Groupings|Enable Grouping Overrides');
    });

    it('Should click on refresh icon on app toolbar', function() {
      PA3MainPage.getRefreshIcon().click();
    });

    it('Wait for the loading icon to disappear', function() {
      browser.sleep(2000);

      // Wait for the loading icon to disappear
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 200000)).toBeTruthy();

      // Wait for Element to appear
      browser.sleep(3000);
    });

    it('Verifying if "3M Company" is displayed under "Canada > U.S. Dollar"', function() {
      PA3MainPage.getElementFromCalculatedTree('Weights', 'Canada|U.S. Dollar', '3M Company').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"3M Company" is not displayed under "Canada > U.S. Dollar"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test StepID: 586455', function() {

    it('Should click on "Excluded: Finance" hyperlink in report to display Exclusions Info Box.', function() {
      PA3MainPage.getExclusionsHyperLink('Weights').getText().then(function(value) {
        expect(value).toEqual('Excluded: Finance');
        if (value === 'Excluded: Finance') {
          PA3MainPage.getExclusionsHyperLink('Weights').click();
        }
      });

      browser.sleep(2000);

      // Verifying if Info Box is displayed.
      expect(PA3MainPage.getAllItemsFromExcludedInfoBox('Weights').count()).toBeGreaterThan(0);
    });

    it('Should click on "Edit Exclusions" in the info box', function() {
      PA3MainPage.getEditExclusionsHyperlinkFromInfoBox('Weights').click().then(function() {}, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Tile option Mode is opened
      TileOptions.isTileOptionsMode().then(function(found) {
        if (!found) {
          expect(false).customError('"Tile options" mode is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Exclusions" item from "Tile Options" LHP is selected by default', function() {
      // Checking if 'Exclusions' item is opened.
      TileOptions.getOptionTitle().getText().then(function(text) {
        if (text.indexOf('Exclusions') < 0) {
          expect(false).customError('"Exclusions" is not selected by default');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click on "Canada" element in "Available" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Canada');
      group.select();
      group.doubleClick();
    });

    it('Verifying if "Canada" is present under "Country of Domicile > Currency" in "Selected" section', function() {
      var myArray = [];
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Country of Domicile > Currency');
      var children = group.getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Canada') === -1) {
          expect(false).customError('"Canada" is not present under "Country of Domicile > Currency" in "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test StepID: 586456', function() {

    // Local Variables
    var arrVerifyCountries = ['Canada', 'United States'];

    it('Should select "Hidden" in LHP in "Tile Options - Weights"', function() {
      TileOptions.getLHPOption('Hidden').click();

      // Checking if 'Hidden' item is opened.
      TileOptions.getOptionTitle().getText().then(function(text) {
        if (text.indexOf('Hidden') < 0) {
          expect(false).customError('Failed to select "Hidden" from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click on "United States" in Available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('United States');
      group.select();
      group.doubleClick();
    });

    it('Should click on "OK" button from "Tile Options - Weights" header bar', function() {
      TileOptions.getHeaderButton('OK').click();

      // Verifying if "Tile Options" Mode is closed
      TileOptions.isTileOptionsMode().then(function(found) {
        if (found) {
          expect(false).customError('"Tile Options - Weights" is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    arrVerifyCountries.forEach(function(ele) {
      it('Verifying if "' + ele + '" is not present in report', function() {
        PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, ele).isPresent().then(function(found) {
          if (found) {
            expect(false).customError('"' + ele + '" is displayed in the report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test StepID: 586458', function() {

    // Local Variables
    var arrCheckBoxes = ['Performance', 'Attribution'];

    it('Should click on "Region of Domicile" hyperlink in report', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').click();
    });

    it('Verifying if "Tile Options" View mode is appeared', function() {
      // Waiting for loading icon to disappear
      browser.sleep(2000);

      TileOptions.isTileOptionsMode().then(function(found) {
        if (!found) {
          expect(false).customError('"Tile Options" View mode is not appeared');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Groupings" option from LHP is selected', function() {
      // Verifying that view displayed is "Groupings"
      TileOptions.getOptionTitle().getText().then(function(text) {
        expect(text.indexOf('Groupings') >= 0).customError('"Groupings" pane is not selected');
      });
    });

    it('Should click on "Apply to Weights" button on top right in "Tile Options - Weights"', function() {
      TileOptionsGroupings.getApplyToButton().click();

      // Verifying that blasted window appeared
      element(by.xpath(TileOptionsGroupings.xpathBlastingWindow)).isPresent().then(function(bool) {
        if (!bool) {
          expect(false).customError('Blasted window not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    arrCheckBoxes.forEach(function(ele) {
      it('Should select "' + ele + '" checkbox from the blasted window', function() {
        TileOptionsGroupings.getCheckBoxFromBlastWindow(ele).click();

        // Verifying that checkboxes are selected
        Utilities.isCheckboxSelected(TileOptionsGroupings.getCheckBoxFromBlastWindow(ele)).then(function(bool) {
          if (!bool) {
            expect(false).customError('Failed to check "' + ele + '" checkbox from blasted window');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on "OK" button in the blasted window', function() {
      TileOptionsGroupings.getOkOrCancelButtonFromBlastedWindow('OK').click();
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      TileOptions.getHeaderButton('OK').click();
    });

    // Verifying if mode is closed.
    it('Should verify "Tile Options" mode is closed', function() {
      expect(TileOptions.isTileOptionsMode()).toBeFalsy();
    });

    it('Should select "Performance" report from LHP', function() {
      PA3MainPage.getReports('Performance').click();

      // Verifying that "Performance" report is selected
      PA3MainPage.getReports('Performance').getAttribute('class').then(function(ele) {
        if (ele.indexOf('selected') < 0) {
          expect(false).customError('Failed to click on "Performance" report in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Calculation Error" popup appeared in the performance report', function() {
      ThiefHelpers.isDialogOpen('Calculation Error');
    });
  });

  describe('Test StepID: 586459', function() {

    // Local Variables
    var arrCountries = ['Canada', 'United States'];

    it('Should click "OK" on popup', function() {
      PA3MainPage.getButton('OK').click();
    });

    it('Should select "Attribution" from LHP in report', function() {
      PA3MainPage.getReports('Attribution').click();

      // Verifying if "Attribution" report is selected
      PA3MainPage.getReports('Attribution').getAttribute('class').then(function(cls) {
        if (cls.indexOf('selected') < 0) {
          expect(false).customError('Failed to selected "Attribution" report');
        }
      });
    });

    it('Waiting for "Attribution" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(2000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared', function() {
      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Attribution').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Error:Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Regions" are displayed in column header', function() {
      browser.sleep(3000);
      SlickGridFunctions.getMultiHeaderNames('Attribution').then(function(multiheaderName) {
        arrRegions.forEach(function(name, index) {
          if (name.indexOf(multiheaderName[index]) === -1) {
            expect(false).customError('"' + name + '" is not displayed in the column Header.');
            CommonFunctions.takeScreenShot();
          }
        });

      });
    });

    arrCountries.forEach(function(ele) {
      it('Verifying if "' + ele + '" is present in report', function() {
        PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Attribution', 1, ele).isPresent().then(function(found) {
          if (!found) {
            expect(false).customError('"' + ele + '" is not present in report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Chart" icon on the top right of the report is enabled', function() {
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Attribution').getAttribute('class').then(function(cls) {
        if (cls.indexOf('disabled') > -1) {
          expect(false).customError('"Chart" icon is not enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test StepID: 586460', function() {

    var flag = 0;

    it('Should right click on "Port. Total Return" from calculated report', function() {
      PA3MainPage.getAllColumnOfCalculatedReport('Attribution').each(function(element) {
        element.getText().then(function(text) {
          var name = text.replace(/\n/g, ' ');
          if (name === 'Port. Total Return') {
            flag = flag + 1;
            if (flag === 1) {
              PA3MainPage.rightClickOnGivenElement(element);
            }
          }
        });
      });
    });

    it('Verifying that "Custom Charts" option is listed in the menu list', function() {
      PA3MainPage.getOptionFromCustomMenu('Custom Charts').isPresent().then(function(ele) {
        expect(ele).customError('"Custom Charts" option is not listed in the menu list');
        if (!ele) {
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test StepID: 586461', function() {

    // Local Variables
    var arrRemoveElement = ['Variation', 'Attribution Analysis'];

    it('Should select "Column > Add Column" from right click menu', function() {
      PA3MainPage.getOptionFromCustomMenu('Columns|Add Column…').click();

      // Waiting for loading icon to disappear
      browser.sleep(2000);

      // Verifying if "Tile Option" mode is appeared
      TileOptions.isTileOptionsMode().then(function() {}, function() {

        expect(false).customError('Error: "Tile Options" view mode is not appeared');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Columns" is selected by default in LHP', function() {
      TileOptions.getOptionTitle().getText().then(function(text) {
        if (text.indexOf('Columns') < 0) {
          expect(false).customError('"Columns" is not selected by default in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    arrRemoveElement.forEach(function(element) {
      it('Should click on "X" icon next to the "' + element + '" element in "Selected" section', function() {
        var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfColumnsSelectedSection).getGroupByText(element);

        return group.getActions().then(function(actions) {
          return actions.triggerAction('remove');
        });
      });
    });

    it('Verifying if elements is not present in "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection(element).isPresent().then(function(found) {
        if (found) {
          expect(false).customError('Failed to click on "X" icon next to the "Currency" element in ' + '"Selected" section');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.message.indexOf('Index out of bound') >= 0) {
          expect(true).customError(error);
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options" header bar', function() {
      TileOptions.getHeaderButton('OK').click();
    });

    it('Should click on the "Hamburger" icon next to "Portfolio" widget', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click();

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is no open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Use Mutliple Portfolios" checkbox from Portfolio widget', function() {
      PA3MainPage.getCheckBoxFromAccountDropdown('Use Multiple Portfolios').click();
    });

    it('Should click on "OK" button in Portfolio widget', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click();
    });

    it('Waiting for "Attribution" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(2000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();

      // Wait for elements to load
      browser.sleep(2000);
    });

    //var arrRegion = ['North America', 'South America', 'Western Europe'];
    var arrRegion = ['North America', 'Western Europe'];
    arrRegion.forEach(function(region) {
      it('Verifying if "' + region + '" is displayed as top most column sections in the report', function() {
        PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Attribution', 1).then(function(names) {
          if (names.indexOf(region) < 0) {
            expect(false).customError('"' + region + '" is not displayed in top most section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying that "PA3 Testing Vs Russel 1000" is displayed in 2nd level column sections', function() {
      PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Attribution', 2).then(function(names) {
        if (names.indexOf('PA3 Testing vs. Russell 1000') < 0) {
          expect(false).customError('"PA3 Testing Vs Russell 1000" is not displayed in 2nd level column section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrcols = ['PA3 Testing', 'Russell 1000'];
    arrcols.forEach(function(column) {
      it('Verifying if "' + column + '" is displayed in 3rd level column sections', function() {
        PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Attribution', 3).then(function(names) {
          if (names.indexOf(column) < 0) {
            expect(false).customError('"' + column + '" is not displayed in 3rd level column section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var arrCountries = ['Canada', 'United States'];
    arrCountries.forEach(function(ele) {
      it('Verifying if "' + ele + '" is present in report', function() {
        PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Attribution', 1, ele).isPresent().then(function(found) {
          if (!found) {
            expect(false).customError('"' + ele + '" is not present in report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test StepID: 588330', function() {

    it('Should select "Contribution" from LHP in report', function() {
      PA3MainPage.getReports('Contribution').click();

      // Verifying if "Contribution" report is selected
      PA3MainPage.getReports('Contribution').getAttribute('class').then(function(cls) {
        if (cls.indexOf('selected') < 0) {
          expect(false).customError('Failed to selected "Contribution" report');
        }
      });
    });

    it('Waiting for "Contribution" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(2000);

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verify that "Commercial Services" is displayed as row', function() {
      PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Contribution', 1, 'Commercial Services').isPresent().then(function(bool) {
        if (!bool) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Commercial Services" grouping is not displayed in rows');
        }
      });
    });

    it('Verify that "Contribution" report loaded with "PE Quintile" as top most column sections', function() {
      PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Contribution', 1).then(function(names) {
        if (names[0].indexOf('PE Quintile') < 0) {
          expect(false).customError('"PE Quintile" is not displayed at top level of column section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
