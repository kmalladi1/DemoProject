'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: chart-new-doc', function() {

  var groupingsHyperlinkText = [];

  describe('Test Step ID: 477302', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should enter "CLIENT:/NEW_PA_TEST_SUITE/PRICING/SPN_SP50_ACCT.ACCT" in "Portfolio" widget and hit Enter key.', function() {
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).setText('CLIENT:/NEW_PA_TEST_SUITE/PRICING/SPN_SP50_ACCT.ACCT');

      // Verifying that "CLIENT:/NEW_PA_TEST_SUITE/PRICING/SPN_SP50_ACCT.ACCT" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).getText().then(function(text) {
        if (text !== 'CLIENT:/NEW_PA_TEST_SUITE/PRICING/SPN_SP50_ACCT.ACCT') {
          expect(false).customError('"CLIENT:/NEW_PA_TEST_SUITE/PRICING/SPN_SP50_ACCT.ACCT" is not entered in ' +
            '"Portfolio" widget.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "RUSSELL:1000" in "Benchmark" widget and hit Enter key.', function() {
      ThiefHelpers.getTextBoxClassReference('Benchmark', PA3MainPage.xpathBenchmarkWidget).setText('RUSSELL:1000');

      // Verifying that "RUSSELL:1000" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Benchmark', PA3MainPage.xpathBenchmarkWidget).getText().then(function(text) {
        if (text !== 'RUSSELL:1000') {
          expect(false).customError('"RUSSELL:1000" is not entered in "Benchmark" widget.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait until "Weights" report and "Weights Difference" chart to calculate.', function() {
      // Wait for chart to appear
      browser.sleep(2000);

      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 200000);
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights Difference'), 200000);
    });

    it('Verify that "Weights" report calculated without any issue.', function() {
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

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "Weights Difference" chart appeared.', function() {
      PA3MainPage.isInChartFormat('Weights Difference').then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Weights Difference" chart view is not appeared');
        }
      });
    });

    var arrreports = ['Weights', 'Weights Difference'];
    arrreports.forEach(function(report) {
      it('Should note the "' + report + '" report groupings hyperlink text for verification', function() {
        PA3MainPage.getGroupingsHyperLink(report).getText().then(function(refVal) {
          console.log(refVal);
          groupingsHyperlinkText.push(refVal);
        });
      });
    });

  });

  describe('Test Step ID: 477303', function() {

    it('Should select "Performance" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Performance', 'Performance').then(function(ref) {
        ref.click();
      }, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });

      // Verifying "Performance" Report is selected.
      ThiefHelpers.getNavepaneItemReference('Reports', 'Performance', 'Performance').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Performance Overview" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should wait until "Total Returns" report and "Performance" chart to calculate.', function() {
      // Wait for chart to appear
      browser.sleep(2000);

      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Total Returns'), 200000);
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Performance Over Time'), 200000);
    });

    it('Verify that "Total Returns" report calculated.', function() {
      PA3MainPage.isReportCalculated('Total Returns').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Error:Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Total Returns')).toBeTruthy();
        } else {
          expect(false).customError(error);
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

    it('Verify that "Performance Over Time" chart appeared.', function() {
      PA3MainPage.isInChartFormat('Performance Over Time').then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Performance Over Time" chart view is not appeared');
        }
      });
    });

  });

  describe('Test Step ID: 477305', function() {

    it('Should select "Exposure" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Weights', 'Exposures').then(function(ref) {
        ref.click();
      }, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });

      // Verifying "Exposures" Report is selected.
      ThiefHelpers.getNavepaneItemReference('Reports', 'Weights', 'Exposures').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Exposure" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on the wrench icon from "Weights" report', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Options" from reports options list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options');
    });

    it('Verifying if "Tile Option" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Tile Option" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Groupings" from LHP', function() {
      TileOptions.getLHPOption('Groupings').click();

      // Verifying if "Groupings" is selected in LHP
      TileOptions.getLHPOption('Groupings').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Groupings" did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover over "Economic Sector - FactSet" from "Selected" section and click on "x" button to remove it', function() {
      // Verifying if "Economic Sector - FactSet" column is present in the "Selected" section
      TileOptionsGroupings.getElementFromSelectedContainer('Economic Sector - FactSet').isPresent().then(function(option) {
        if (!option) {
          expect(option).customError('"Economic Sector - FactSet" column is not present in "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      TileOptionsGroupings.getRemoveButtonOfElementInSelectedSection('Economic Sector - FactSet').click()
        .then(function() {
        }, function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Verifying if "Economic Sector - FactSet" is removed from "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Economic Sector - FactSet').isPresent().then(function(option) {
        if (option) {
          expect(option).customError('"Economic Sector - FactSet" column was not deleted list.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'Index out of bound') {
          expect(true).toBeTruthy();
        }
      });
    });

    it('Should click on "OK" button', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking:' + err);
      });
    });

    it('Verify that "Weights Difference" chart remains unchanged.', function() {
      PA3MainPage.getReportCalculationDlg('Weights Difference').isPresent().then(function(bool) {
        if (bool) {
          expect(false).customError('"Weights Difference" chart is calculated');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait until "Weights" report to calculate.', function() {
      // Wait for chart to appear
      browser.sleep(2000);

      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 200000);
    });

    it('Verify that "Weights" report calculated without any issue.', function() {
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

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that report is grouped by "Industry"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(refVal) {
        if (refVal.indexOf('Industry') === -1) {
          expect(false).customError('The report is not grouped by "Industry"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 477304', function() {

    it('Should click on the folder icon on app toolbar', function() {
      PA3MainPage.getFolderDropDown().click().then(function() {
      }, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking:' + err);
      });
    });

    it('Should select "New" from list', function() {
      PA3MainPage.getOptionFromFolderMenu('New').click().then(function() {
      }, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking:' + err);
      });
    });

    it('Verifying if "Document has changed" pop up is appeared on the screen', function() {
      PA3MainPage.getDialog('Document has changed').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Document has changed" dialog is not seen');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Don\'t Save Changes" button in the popup', function() {
      PA3MainPage.getButton('Don\'t Save Changes').click().then(function() {
      }, function(error) {
        CommonFunctions.takeScreenShot();
        expect(false).customError(error);
      });

      // Verifying that error pop-up is disappeared
      PA3MainPage.getDialog('Document has changed').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Document has changed" dialog is not disappeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait until "Weights" report and "Weights Difference" chart to calculate.', function() {
      // Wait for chart to appear
      browser.sleep(2000);

      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 200000);
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights Difference'), 200000);
    });

    var arrreports = ['Weights', 'Weights Difference'];
    arrreports.forEach(function(report, index) {
      it('Verify that default settings are fetched by "' + report + '" report', function() {
        PA3MainPage.getGroupingsHyperLink(report).getText().then(function(refVal) {
          if (refVal !== groupingsHyperlinkText[index]) {
            CommonFunctions.takeScreenShot();
            expect(false).customError('Default settings are not fetched by "' + report + '" report');
          }
        });
      });
    });

    it('Verify that "Weights" report calculated.', function() {
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

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "Weights Difference" chart appeared.', function() {
      PA3MainPage.isInChartFormat('Weights Difference').then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Weights Difference" chart view is not appeared');
        }
      });
    });

  });

  describe('Test Step ID: 477295', function() {

    it('Should open "CHART_DOC" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('chart-doc');
    });

    it('Waiting for reports to calculate', function() {
      browser.sleep(2000);

      // Waiting for loading icon to disappear
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);
    });

    it('Verifying if "Weights" report is calculated', function() {
      // Check if Calculated report is appeared on the screen
      PA3MainPage.isReportCalculated('Weights').then(function(reportVisible) {
        if (!reportVisible) {
          expect(false).customError('Calculated report is not visible on the screen');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
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

  });

  describe('Test Step ID: 477296', function() {

    it('Should select "Weights - Multi tile" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Weights - Multi tile').then(function(ref) {
        ref.click();
      });

      // Verifying "Weights - Multi tile" Report is selected.
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Weights - Multi tile').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Weights - Multi tile" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on the wrench icon next to "Weights - Multi tile" in LHP', function() {
      PA3MainPage.getReportWrenchButton('Weights - Multi tile').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Edit Layout" from reports options list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Edit Layout');
    });

    var arrReports = ['Contribution Scatter', 'Portfolio Weights'];
    arrReports.forEach(function(tile) {
      it('Should remove "' + tile + '" by clicking on "X"', function() {
        PA3EditMode.getTileDeleteButton(tile).click().then(function() {
        }, function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Should click on "OK" button', function() {
      PA3EditMode.getButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verify that the application is displayed in normal mode
      expect(PA3MainPage.isNormalMode()).toBeTruthy();
    });

    it('Should click on Grid icon in the "Port. Weight" chart', function() {
      //Clicking on grid icon
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Port. Weight').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Known Issue : RPD:27451710
    it('Verifying if "Chart has changed" pop up is appeared on the screen', function() {
      ThiefHelpers.isDialogOpen('Chart has changed').then(function(found) {
        if (!found) {
          expect(false).customError('"Chart has changed" dialog is not seen');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save Changes" button in the popup', function() {
      ThiefHelpers.getDialogButton('Chart has changed', 'Save Changes').click().then(function() {
      }, function(error) {
        CommonFunctions.takeScreenShot();
        expect(false).customError(error);
      });

      // Verifying that error pop-up is disappeared
      expect(PA3MainPage.getDialog('Chart has changed').isPresent()).toBeFalsy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      //Verifying weights reports calculated
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors');
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

      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "Performance" tile is displayed below Weights report.', function() {
      PA3MainPage.getMatrixTile(1, 1).getText().then(function(value) {
        PA3MainPage.getMatrixTile(2, 1).getText().then(function(val) {
          if (val !== 'Performance' && value !== 'Weights') {
            expect(false).customError('"Performance" tile is not displayed below "Weights" report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 477297', function() {

    it('Should click on the "Wrench" icon in the "Weights" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Weights') {
          expect(false).customError('"Tile Options - Weights" view has not appeared. ' +
            'Expected: "Tile Options - New Column Test" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Groupings" from LHP', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Groupings"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Groupings') {
          expect(false).customError('"Groupings" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "X" in the Selected section to remove all groupings', function() {
      // Close QA Info Box if it is found
      PA3MainPage.closeQAInfoBox();

      // TileOptionsGroupings.getRemoveAllButton().click().then(function() {
      // }, function(err) {
      //   CommonFunctions.takeScreenShot();
      //   expect(false).customError('Error found while clicking' + err);
      // });
      ThiefHelpers.getTransferBoxReference().target.clear();
    });

    it('Verifying that "Selected" section is empty', function() {
      TileOptionsGroupings.getAllElements('selected').count().then(function(count) {
        if (count !== 0) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Selected section is not empty');
        }
      });
    });

  });

  describe('Test Step ID: 477298', function() {

    it('Should select "Columns" from LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Groupings" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrColumns = ['Ending Price', 'Port. Ending Quantity Held'];
    arrColumns.forEach(function(col) {
      it('Hover over "' + col + '" from "Selected" section and click on the "Remove" icon', function() {
        // Getting the xpath of the Selected section
        var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');
        var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(col);
        item.getActions().then(function(actions) {
          actions.triggerAction('remove');
        });
      });

      it('Verifying that "' + col + '" column is deleted from "Selected" section', function() {
        TileOptionsColumns.getElementFromSelectedSection(col).isPresent().then(function(option) {
          if (option) {
            expect(option).customError('"' + col + '" column was not deleted from "Selected" section.');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {
          if (error.message.indexOf('Index out of bound') > -1) {
            expect(true).toBeTruthy();
          } else {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 477299', function() {

    it('Should click on "OK" button in options Dialog', function() {
      TileOptions.getHeaderButton('ok').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify that the "Performance" report is dispalyed and not auto calculated ', function() {
      PA3MainPage.getReportCalculationDlg('Performance').isPresent().then(function(found) {
        if (found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('PA3 report is auto calculating');
        }
      });

      // Verifying if Performance chart is displayed
      PA3MainPage.isInChartFormat('Performance').then(function(displayed) {
        expect(displayed).customError('"Performance" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Weights" report is grouped by "Security Name"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(refVal) {
        if (refVal.indexOf('Security Name') === -1) {
          expect(false).customError('The report is not grouped by "Security Name"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 477300', function() {

    it('Should click on the "Wrench" icon in the "Performance" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Performance').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking:' + err);
      });
    });

    it('Verify that "Dates" tab is selected', function() {
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Dates') {
          expect(false).customError('"Dates" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should set "Start date" to 10/03/2016', function() {
      var date = new Date('10/03/2016');
      ThiefHelpers.setDateInCalendar(date);
    });

    it('Should set "End date" to 11/25/2016', function() {
      var date = new Date('11/25/2016');
      ThiefHelpers.setDateInCalendar(date, 2);

      // Wait to process the request (RPD:41035011)
      browser.sleep(2000);
    });

    it('Should click on "OK" button from "Tile Options" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "Weights" report is not auto calculated', function() {
      PA3MainPage.getReportCalculationDlg('Weights').isPresent().then(function(bool) {
        if (bool) {
          expect(false).customError('"Weights" report is calculated');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait  for "Performance" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Performance'), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Performance" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Performance').then(function(displayed) {
        expect(displayed).customError('"Performance" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Performance')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Performance" chart: ' + error);
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

    it('Verify that "Performance" chart gets calculated for the selected End date', function() {
      PA3MainPage.getDateHyperLink('Performance').getText().then(function(value) {
        if (value !== '10/03/2016 - 11/25/2016') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Report was not grouped by date range: "10/03/2016 - 11/25/2016", Found:' + value);
        }
      });

    });

  });

  describe('Test Step ID: 477301', function() {

    it('Should click on the "Folder" icon on app toolbar', function() {
      PA3MainPage.getFolderDropDown().click().then(function() {
      }, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking:' + err);
      });
    });

    it('Should select "New" from list', function() {
      PA3MainPage.getOptionFromFolderMenu('New').click().then(function() {
      }, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking:' + err);
      });
    });

    it('Verifying if "Document has changed" pop up is appeared on the screen', function() {
      PA3MainPage.getDialog('Document has changed').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Document has changed" dialog is not seen');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Don\'t Save Changes" button in the popup', function() {
      PA3MainPage.getButton('Don\'t Save Changes').click().then(function() {
      }, function(error) {
        CommonFunctions.takeScreenShot();
        expect(false).customError(error);
      });

      // Verifying that error pop-up is disappeared
      expect(PA3MainPage.getDialog('Document has changed').isPresent()).toBeFalsy();
    });

    it('Verify that "PA_DOCUMENT:DEFAULT" document is opened.', function() {
      browser.getTitle().then(function(title) {
        expect(title === PA3Json.defaultDocument)
          .customError('Title of browser did not match. ' +
            'Expected: "' + PA3Json.defaultDocument + '", Found: "' + title + '"');
        if (title !== PA3Json.defaultDocument) {
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

});
