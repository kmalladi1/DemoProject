'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-fg-override', function() {
  var riskFactors = [];

  describe('Test Step ID: Startup Instructions', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);
  });

  describe('Test Step ID: 725257', function() {

    it('Should open PA3 Application with "Client:/Pa3/Risk/Override_Account_Default_Risk_Setting"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('override-account-default-risk-setting', 'Discard Changes');
    });

    it('Should verify if the header title is displayed as "Override_account_default_risk_settings vs S&P 100"', function() {
      PA3MainPage.getHeader().getText().then(function(value) {
        if (value !== 'Override_account_default_risk_settings vs S&P 100') {
          expect(false).customError('Header title did not displayed as "Override_account_default_risk_settings vs S&P 100"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Risk" report is displayed with 4 tiles', function() {
      PA3MainPage.getAllTilesFromReport().count().then(function(count) {
        if (count !== 4) {
          expect(false).customError('"Top Positions" report is not displayed 4 tiles');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('RiskSummary');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('FactorSnapshot');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('FactorRBPA');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('SecurityRBPA');
  });

  describe('Test Step ID: 725268', function() {

    // Click on "Wrench" icon and select "options" from the "wrench" menu and select Risk Models from Risk
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('RiskSummary', 'Risk Models', 'Risk');

    it('Should verify if "Barra US Long-Term Model (USE4L)" is present in the selected section', function() {
      ThiefHelpers.getListBoxItem(TileOptionsRiskRiskModels.xpathSelectedContainer, 'Barra US Long-Term Model (USE4L)').getText().then(function(name) {
        if (name !== 'Barra US Long-Term Model (USE4L)') {
          expect(false).customError('"Barra US Long-Term Model (USE4L)" is not present in the selected section. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(true).toBeTruthy();
        } else {
          expect(false).customError('No element found with "Barra US Long-Term Model (USE4L)" in selected container');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 725270', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - RiskSummary');

    riskFactors = ['Risk Indices', 'Industries', 'Market'];

    it('Should verify if "' + riskFactors + '" are displayed under "Barra- Common Factor Risk-Decomposition"', function() {
      SlickGridFunctions.getElementsFromTree('RiskSummary', '', 'Barra- Common Factor Risk-Decomposition', '').then(function(arrElements) {
        riskFactors.forEach(function(element) {
          if (arrElements.indexOf(element) < 0) {
            expect(false).customError(element + 'is not displayed under "Barra- Common Factor Risk-Decomposition" in "RiskSummary" report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should verify if "' + riskFactors + '" are displayed in "FactorSnapshot" report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('FactorSnapshot', '', '').then(function(arrElements) {
        riskFactors.forEach(function(element) {
          if (arrElements.indexOf(element) < 0) {
            expect(false).customError(element + 'is not displayed in "FactorSnapshot" report');
            CommonFunctions.takeScreenShot();
          }
        });
      }).then(function() {
        riskFactors.push('[MARKET TIMING]');
      });
    });

    it('Should verify if "' + riskFactors + ' and [MARKET TIMING]" are displayed in "FactorRBPA" report', function() {
      riskFactors.push('[MARKET TIMING]');
      SlickGridFunctions.getAllCellValuesFromSingleColumn('FactorRBPA', '', '').then(function(arrElements) {
        riskFactors.forEach(function(element) {
          if (arrElements.indexOf(element) < 0) {
            expect(false).customError(element + 'is not displayed in "FactorRBPA" report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 725271', function() {

    // Click on "Wrench" icon and select "options" from the "wrench" menu and select Risk Models from Risk
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('RiskSummary', 'Risk Models', 'Risk');

    it('Should verify if "Defaults Applied" is displayed', function() {
      TileOptions.getDefaultsApplied().isDisplayed().then(function(isFound) {
        if (!isFound) {
          expect(false).customError('"Defaults Applied" button is checked by default');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if "Do not use Risk Factor Grouping account defaults" checkbox is unchecked', function() {
      ThiefHelpers.getCheckBoxClassReference('Do not use Risk Factor Grouping account defaults').isChecked().then(function(checkBox) {
        if (checkBox) {
          expect(false).customError('"Do not use Risk Factor Grouping account defaults" checkbox is checked off');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 725272', function() {

    it('Should select "FactSet: Risk Indices Breakout" option from "Factor Grouping" dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('FactSet: Risk Indices Breakout', 'Factor Grouping');

      // verifying if 'FactSet: Standard' is selected from "Factor Grouping" section drop down
      ThiefHelpers.verifySelectedDropDownText('FactSet: Risk Indices Breakout', 'Factor Grouping');
    });

    it('Should click on "Apply To RiskSummary" button', function() {
      ThiefHelpers.getButtonClassReference('Apply To RiskSummary').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if "Blasting" widget is opened', function() {
      ThiefHelpers.isPresent(undefined, undefined, TileOptionsRiskRiskModels.xpathBlastingWindow).then(function(blastWindow) {
        if (!blastWindow) {
          expect(false).customError('"Blasting" widget is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "All Tiles" to check off', function() {
      ThiefHelpers.getCheckBoxClassReference('All Tiles').check();

      // Verifying if "All Tiles" check box is checked
      ThiefHelpers.getCheckBoxClassReference('All Tiles').isChecked().then(function(isChecked) {
        if (!isChecked) {
          expect(false).customError('"All Tiles" checkbox is un checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from Blasting window', function() {
      var xpathOKButton = CommonFunctions.replaceStringInXpath(TileOptionsRiskRiskModels.xpathOkOrCancelButton, 'OK');
      ThiefHelpers.getButtonClassReference(undefined, xpathOKButton).press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if "Blasting" widget is closed', function() {
      ThiefHelpers.isPresent(undefined, undefined, TileOptionsRiskRiskModels.xpathBlastingWindow).then(function(blastWindow) {
        if (blastWindow) {
          expect(false).customError('"Blasting" widget is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Can not able to click on OK button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if "Risk" report is displayed with 4 tiles', function() {
      PA3MainPage.getAllTilesFromReport().count().then(function(count) {
        if (count !== 4) {
          expect(false).customError('"Top Positions" report is not displayed 4 tiles');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('RiskSummary');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('FactorSnapshot');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('FactorRBPA');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('SecurityRBPA');
  });

  describe('Test Step ID: 725273', function() {

    // Click on the wrench icon of application toolbar and select "Document Options"
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('RiskSummary', 'Risk', undefined, 'Document Options');

    it('Should verify if "Use benchmark as the market portfolio" is check off', function() {
      // Verifying if the checkbox is checked
      ThiefHelpers.verifyStatusOfCheckbox('Use benchmark as the market portfolio', undefined, 'IsChecked');
    });

    it('Should verify if "Defaults Applied" button is displayed', function() {
      DocumentOptions.getDefaultsApplied().isDisplayed().then(function(isFound) {
        if (!isFound) {
          expect(false).customError('"Defaults Applied" button is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 725276', function() {

    it('Should un-check "Use benchmark as the market portfolio" and verify', function() {
      ThiefHelpers.setCheckBox('Use benchmark as the market portfolio', undefined, false);

      // Verifying if the checkbox is checked
      ThiefHelpers.verifyStatusOfCheckbox('Use benchmark as the market portfolio', undefined, 'isUnchecked');
    });

    it('Should verify if the "Restore Defaults" button is displayed in right corner of "Document Options" window', function() {
      DocumentOptions.getRestoreDefaultsButton().isPresent().then(function(enabled) {
        if (!enabled) {
          expect(false).customError('The "Restore Defaults" button is not displayed in right corner of "Document Options" window.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 725293', function() {

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('RiskSummary');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('FactorSnapshot');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('FactorRBPA');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('SecurityRBPA');

    it('Should expand "Barra- %Contribution- Common Factor" from the "RiskSummary" report', function() {
      var rowIndex;

      // Scrolling the row into view
      SlickGridFunctions.getRowIndex('RiskSummary', 'Barra- %Contribution- Common Factor', '').then(function(rowNum) {
        rowIndex = rowNum;
        SlickGridFunctions.scrollRowToTop('RiskSummary', rowNum);
      }).then(function() {
        PA3MainPage.isTreeExpanded('RiskSummary', 'Barra- %Contribution- Common Factor', 'grid-canvas grid-canvas-top grid-canvas-left expandable').then(function() {}, function(expanded) {
          if (!expanded) {
            PA3MainPage.expandTreeInCalculatedReport('RiskSummary', 'Barra- %Contribution- Common Factor', undefined, 'grid-canvas grid-canvas-top grid-canvas-left');
            SlickGridFunctions.scrollRowToTop('RiskSummary', rowIndex);
          }
        });
      });
    });

    it('Should verify if "Barra- %Contribution- Common Factor" is expanded in the "RiskSummary" report', function() {
      // Verifying if tree expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('RiskSummary', 'Barra- %Contribution- Common Factor', 'grid-canvas grid-canvas-top grid-canvas-left');
    });

    var arrGroupsUnderCommonFactor = ['Risk Indices', 'Industries', 'Market', 'Factor Interaction'];
    it('Should verify if "' + arrGroupsUnderCommonFactor + '" are displayed under "Barra- %Contribution- Common Factor"', function() {
      SlickGridFunctions.getElementsFromTree('RiskSummary', '', 'Barra- %Contribution- Common Factor', '').then(function(arrElements) {
        arrGroupsUnderCommonFactor.forEach(function(element) {
          if (arrElements.indexOf(element) < 0) {
            expect(false).customError(element + 'is not displayed in "Barra- %Contribution- Common Factor" report');
            CommonFunctions.takeScreenShot();
          }
        });
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if "Barra - Portfolio Predicted Beta" row is displayed with "--/0"', function() {
      SlickGridFunctions.getCellReference('RiskSummary', 'Barra- Portfolio Predicted Beta', '', 'Data', 'Override_account_default_risk_settings', undefined).then(function(ref) {
        ref.getText().then(function(val) {
          if (val !== '--' && val !== 0) {
            expect(false).customError('Expected to have "0" or "--" for "Barra- Portfolio Predicted Beta" but found "' + val + '" ');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should verify if "MARKET TIMING" is not present in the "FactorRBPA" report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('FactorRBPA', '', '').then(function(rowNames) {
        if (rowNames.indexOf('MARKET TIMING') > -1) {
          expect(false).customError('"MARKET TIMING" row is present in the "FactorRBPA" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if last 2 columns in "FactorSnapshot" report display same "Total" value', function() {
      var totalValuesOfLatTwoCols = [];
      PA3MainPage.getAllColumnOfCalculatedReport('FactorSnapshot').then(function(references) {
        references.forEach(function(eleRef) {
          eleRef.getText().then(function(colName) {
            var tempColName = colName.replace(/\n/g, ' ');
            SlickGridFunctions.getCellReference('FactorSnapshot', 'Total', '', tempColName).then(function(value) {
              value.getText().then(function(text) {
                totalValuesOfLatTwoCols.push(text);
              });
            });
          });
        });
      }).then(function() {
        if (totalValuesOfLatTwoCols[totalValuesOfLatTwoCols.length - 2] !== totalValuesOfLatTwoCols[totalValuesOfLatTwoCols.length - 1]) {
          expect(false).customError('"Total" values of last 2 columns in "FactorSnapshot" report is not same. Found: ' +
            totalValuesOfLatTwoCols[totalValuesOfLatTwoCols.length - 2] + ' and ' + totalValuesOfLatTwoCols[totalValuesOfLatTwoCols.length - 1]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Risk Market Timing Effect" column is displayed with "0/--" values', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('SecurityRBPA', 'Risk Market Timing Effect').then(function(celValues) {
        celValues.forEach(function(cellValue, index) {
          // In DOM, -- will be .0
          if (cellValue !== '.0') {
            expect(false).customError('Expected: "--" but Found "' + cellValue + '" at row index ' + index);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 725294', function() {

    it('Should click on folder icon from the application toolbar', function() {
      // Clicking on Folder Icon from application toolbar
      PA3MainPage.getFolderDropDown().click().then(function() {
      }, function(error) {
        CommonFunctions.takeScreenShot();
        expect(false).customError(error);
      });
    });

    CommonPageObjectsForPA3.selectOptionFromFolderAndVerifyDialogBoxOpened('Save As…', 'Save Document As');

    // Select personal directory and enter the document name
    CommonPageObjectsForPA3.selectPersonalAndEnterDocumentNameInSaveAsDialog('OVERRIDE_ACCOUNT_DEFAULT_RISK_SETTING', undefined, true);

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('RiskSummary');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('FactorSnapshot');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('FactorRBPA');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('SecurityRBPA');

    it('Should verify if Personal:OVERRIDE_ACCOUNT_DEFAULT_RISK_SETTING document is opened.', function() {
      browser.getTitle().then(function(title) {
        if (title.indexOf('Personal:OVERRIDE_ACCOUNT_DEFAULT_RISK_SETTING') === -1) {
          expect(false).customError('Personal:OVERRIDE_ACCOUNT_DEFAULT_RISK_SETTING is not opened, Found:' + title);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Risk" report is displayed with 4 tiles', function() {
      PA3MainPage.getAllTilesFromReport().count().then(function(count) {
        if (count !== 4) {
          expect(false).customError('"Top Positions" report is not displayed 4 tiles');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('RiskSummary');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('FactorSnapshot');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('FactorRBPA');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('SecurityRBPA');

    it('Should expand "Barra- %Contribution- Common Factor" from the "RiskSummary" report', function() {
      // Scrolling the row into view
      SlickGridFunctions.getRowIndex('RiskSummary', 'Barra- %Contribution- Common Factor', '').then(function(rowNum) {
        SlickGridFunctions.scrollRowToTop('RiskSummary', rowNum);
        PA3MainPage.isTreeExpanded('RiskSummary', 'Barra- %Contribution- Common Factor', 'grid-canvas grid-canvas-top grid-canvas-left expandable').then(function() {}, function(err) {
          if (!err) {
            PA3MainPage.expandTreeInCalculatedReport('RiskSummary', 'Barra- %Contribution- Common Factor', undefined, 'grid-canvas grid-canvas-top grid-canvas-left');
          }
        });
      });

      // Verifying if tree expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('RiskSummary', 'Barra- %Contribution- Common Factor', 'grid-canvas grid-canvas-top grid-canvas-left');
    });

    var arrGroupsUnderCommonFactor = ['Risk Indices', 'Industries', 'Market', 'Factor Interaction'];
    it('Should verify if "' + arrGroupsUnderCommonFactor + '" are displayed under "Barra- %Contribution- Common Factor"', function() {
      SlickGridFunctions.getElementsFromTree('RiskSummary', '', 'Barra- %Contribution- Common Factor', '').then(function(arrElements) {
        arrGroupsUnderCommonFactor.forEach(function(element) {
          if (arrElements.indexOf(element) < 0) {
            expect(false).customError(element + 'is not displayed in "Barra- %Contribution- Common Factor" report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should verify if "Barra - Portfolio Predicted Beta" row is displayed with "--/0"', function() {
      SlickGridFunctions.getCellReference('RiskSummary', 'Barra- Portfolio Predicted Beta', '', 'Data', 'Override_account_default_risk_settings', undefined).then(function(ref) {
        ref.getText().then(function(val) {
          if (val !== '--' && val !== 0) {
            expect(false).customError('Expected to have "0" or "--" for "Barra- Portfolio Predicted Beta" but found "' + val + '" ');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should verify if "MARKET TIMING" is not present in the "FactorRBPA" report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('FactorRBPA', '', '').then(function(rowNames) {
        if (rowNames.indexOf('MARKET TIMING') > -1) {
          expect(false).customError('"MARKET TIMING" row is present in the "FactorRBPA" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if last 2 columns in "FactorSnapshot" report are displayed with same "Total" value', function() {
      var totalValuesOfLatTwoCols = [];
      PA3MainPage.getAllColumnOfCalculatedReport('FactorSnapshot').then(function(references) {
        references.forEach(function(eleRef) {
          eleRef.getText().then(function(colName) {
            var tempColName = colName.replace(/\n/g, ' ');
            SlickGridFunctions.getCellReference('FactorSnapshot', 'Total', '', tempColName).then(function(value) {
              value.getText().then(function(text) {
                totalValuesOfLatTwoCols.push(text);
              });
            });
          });
        });
      }).then(function() {
        if (totalValuesOfLatTwoCols[totalValuesOfLatTwoCols.length - 2] !== totalValuesOfLatTwoCols[totalValuesOfLatTwoCols.length - 1]) {
          expect(false).customError('"Total" values of last 2 columns in "FactorSnapshot" report is not same. Found: ' +
            totalValuesOfLatTwoCols[totalValuesOfLatTwoCols.length - 2] + ' and ' + totalValuesOfLatTwoCols[totalValuesOfLatTwoCols.length - 1]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Risk Market Timing Effect" column is displayed with "0/--" values', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('SecurityRBPA', 'Risk Market Timing Effect').then(function(celValues) {
        celValues.forEach(function(cellValue, index) {
          // In DOM, -- will be .0
          if (cellValue !== '.0') {
            expect(false).customError('Expected: "--" but Found "' + cellValue + '" at row index ' + index);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 725296', function() {

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('RiskSummary', 'Options');

    it('Should verify if view changed to "Tile Options - RiskSummary" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - RiskSummary').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - RiskSummary" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Risk Models" tab under "Risk" category in the LHP of tile options', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').select();

      // Verifying if "Risk Models" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Risk Models" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Restore Defaults" button of  header', function() {
      ThiefHelpers.getButtonClassReference('Restore Defaults').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Restore Defaults" button.');
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'OK', 'Do you want to replace your current settings with the account defaults?');

    it('Should click on "Apply To RiskSummary" button', function() {
      ThiefHelpers.getButtonClassReference('Apply To RiskSummary').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if "Blasting" widget is opened', function() {
      ThiefHelpers.isPresent(undefined, undefined, TileOptionsRiskRiskModels.xpathBlastingWindow).then(function(blastWindow) {
        if (!blastWindow) {
          expect(false).customError('"Blasting" widget is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "All Tiles" to check off', function() {
      ThiefHelpers.getCheckBoxClassReference('All Tiles').check();

      // Verifying if "All Tiles" check box is checked
      ThiefHelpers.getCheckBoxClassReference('All Tiles').isChecked().then(function(isChecked) {
        if (!isChecked) {
          expect(false).customError('"All Tiles" checkbox is un checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from Blasting window', function() {
      var xpathOKButton = CommonFunctions.replaceStringInXpath(TileOptionsRiskRiskModels.xpathOkOrCancelButton, 'OK');
      ThiefHelpers.getButtonClassReference(undefined, xpathOKButton).press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if "Blasting" widget is closed', function() {
      ThiefHelpers.isPresent(undefined, undefined, TileOptionsRiskRiskModels.xpathBlastingWindow).then(function(blastWindow) {
        if (blastWindow) {
          expect(false).customError('"Blasting" widget is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - RiskSummary');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('RiskSummary');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('FactorSnapshot');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('FactorRBPA');

    var arrGroupsUnderCommonFactor = ['Risk Indices', 'Industries', 'Market'];
    it('Should verify if "' + arrGroupsUnderCommonFactor + '" are displayed under "Barra- Common Factor Risk-Decomposition"', function() {
      SlickGridFunctions.getElementsFromTree('RiskSummary', '', 'Barra- Common Factor Risk-Decomposition', '').then(function(elements) {
        arrGroupsUnderCommonFactor.forEach(function(element) {
          if (elements.indexOf(element) < 0) {
            expect(false).customError('"' + element + '" is not displayed under "Barra- Common Factor Risk-Decomposition"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should verify if ' + arrGroupsUnderCommonFactor + ' are displayed in "FactorSnapshot" report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('FactorSnapshot', '').then(function(elements) {
        arrGroupsUnderCommonFactor.forEach(function(element) {
          if (elements.indexOf(element) < 0) {
            expect(false).customError('"' + element + '" is not displayed in "FactorSnapshot" report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should verify if ' + arrGroupsUnderCommonFactor + ' are displayed in "FactorRBPA" report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('FactorRBPA', '').then(function(elements) {
        arrGroupsUnderCommonFactor.forEach(function(element) {
          if (elements.indexOf(element) < 0) {
            expect(false).customError('"' + element + '" is not displayed in "FactorRBPA" report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 725300', function() {

    // Click on the wrench icon of application toolbar and select "Document Options"
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('RiskSummary', 'Risk', undefined, 'Document Options');

    it('Should click on "Restore Defaults" button of  header', function() {
      ThiefHelpers.getButtonClassReference('Restore Defaults').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Restore Defaults" button.');
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'OK', 'Do you want to replace your current settings with the account defaults?');

    it('Should verify if "Use benchmark as the market portfolio" is check off', function() {
      // Verifying if the checkbox is checked
      ThiefHelpers.verifyStatusOfCheckbox('Use benchmark as the market portfolio', undefined, 'IsChecked');
    });
  });

  describe('Test Step ID: 725301', function() {

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('RiskSummary');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('FactorSnapshot');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('FactorRBPA');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('SecurityRBPA');
  });
});
