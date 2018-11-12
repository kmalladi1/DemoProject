'use strict';

require(__dirname + '/../../index.js');

describe(' Test Case: chart-visible-cols', function() {

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Available');

  describe('Test Step ID: 556809', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with document client:/default_doc_auto.', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });

    it('Wait for weights report to finish calculation', function() {
      //Waiting for report to finish calculation
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating report.');
          CommonFunctions.takeScreenShot();
        }
      });
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

    it('Verifying if "Portfolio" is set to "CLIENT:/PA3/TEST.ACCT"', function() {
      PA3MainPage.getWidgetBox('Portfolio').getAttribute('value').then(function(path) {
        if (path !== 'CLIENT:/PA3/TEST.ACCT') {
          expect(false).customError('"Portfolio" is not set to "CLIENT:/PA3/TEST.ACCT". Expected: "CLIENT:/PA3/TEST.ACCT" ' +
            'but Found: "' + path + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Benchmark" is set to "RUSSELL:1000"', function() {
      PA3MainPage.getWidgetBox('Benchmark').getAttribute('value').then(function(benchmark) {
        if (benchmark !== 'RUSSELL:1000') {
          expect(false).customError('"Benchmark" is not set to "RUSSELL:1000". Expected: "RUSSELL:1000" but ' +
            'Found: "' + benchmark + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 556825', function() {

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
            'Expected: "Tile Options - Weights" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrOptions = ['Bench. Ending Weight', 'Variation in Ending Weight'];
    arrOptions.forEach(function(value) {
      it('Should Hold the ctrl key and select "' + value + '"', function() {
        // Getting the xpath of the Selected section
        var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');
        var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(value);
        item.select(true);
      });
    });

    it('Click on "Left" arrow button to add columns to "Selected" section', function() {
      TileOptionsColumns.getArrowButton('Left').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "OK" button from "Tile Options - Weights" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Weights" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - Weights" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Weights" report to finish calculation', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Weights" report is not displayed on the webpage.');
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

    it('Should right click on "Port. Weight" in "Weights" report and select "Custom Charts > Bar" ', function() {
      var eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Weights');
      eleRefs.each(function(element) {
        element.getText().then(function(text) {
          var name = text.replace(/\n/g, ' ');
          if (name === 'Port. Weight') {
            PA3MainPage.rightClickAndSelectOption(element, 'Custom Charts|Bar');
          }
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Weights');
            eleRefs.then(function(references) {
              references.forEach(function(eleRef) {
                eleRef.getText().then(function(text) {
                  var name = text.replace(/\n/g, ' ');
                  if (name === 'Port. Weight') {
                    PA3MainPage.rightClickAndSelectOption(eleRef, 'Custom Charts|Bar');
                  }
                });
              });
            });
          } else {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Verifying that loading swirl is not displayed', function() {
      browser.sleep(4000);

      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verifying if calculated data for "Port. Weight" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Port. Weight').then(function(displayed) {
        expect(displayed).customError('"Port. Weight" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Port. Weight')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Port. Weight" chart: ' + error);
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

    it('Verifying if bar chart is displayed for "Port. Weight" column', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 0).then(function(styleName) {
        if (styleName !== 'Bars') {
          expect(false).customError('Bar chart is not displayed for "Port. Weight" column. Expected: "Bars" but' +
            ' Found: "' + styleName + '"');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Port. Weight" legend is displayed
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(legendName) {
        legendName.forEach(function(name) {
          if (name !== 'Port. Weight') {
            expect(false).customError('"Port. Weight" legend is not displayed. Expected: "Port. Weight" but' +
              ' Found: "' + legendName + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 556827', function() {

    it('Should click on the "Wrench" icon in the "Port. Weight" chart ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Port. Weight').click().then(function() {
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
      });
    });

    it('Verifying if view changed to "Tile Options - Port. Weight" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Port. Weight') {
          expect(false).customError('"Tile Options - Port. Weight" view has not appeared. ' +
            'Expected: "Tile Options - Port. Weight" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP in "Tile Options - Port. Weight" view', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "PE" into the search field of "Available" section', function() {
      // performing click on search box
      element(by.xpath(TileOptionsColumns.xpathSearchField)).click();

      ThiefHelpers.getTextBoxClassReference('Available').setText('PE');

      // Verifying that "PE" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== 'PE') {
          expect(false).customError('"PE" is not present in search field of "Available" section');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the Search Result to appear
      browser.sleep(4000);
    });

    it('Should double click on "Price to Earnings" from search result', function() {
      // Getting the xpath of the Available section
      var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      group.getItemByText('Price to Earnings').then(function(item) {
        item.select();
        item.doubleClick();
      });
    });

    it('Verifying if "Price to Earnings" is added to "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Price to Earnings').isPresent().then(function(present) {
        if (!present) {
          expect(false).then('"Price to Earnings" is not added to "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options - Port. Weight" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Port. Weight" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - Weights" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if loading swirl is displayed', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Port. Weight" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Port. Weight').then(function(displayed) {
        expect(displayed).customError('"Port. Weight" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Port. Weight')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Port. Weight" chart: ' + error);
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

    var arrOfColumns = ['Port. Weight', 'Price to Earnings'];
    var arrOfSeries = ['Series 1', 'Series 2'];

    arrOfColumns.forEach(function(columnName, index) {

      it('Verifying if bar chart is displayed for "' + columnName + '" column', function() {
        ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', arrOfSeries[index], 0).then(function(styleName) {
          if (styleName !== 'Bars') {
            expect(false).customError('Bar chart is not displayed for "' + columnName + '" column. Expected: "Bars" but' +
              ' Found: "' + styleName + '"');
            CommonFunctions.takeScreenShot();
          }
        });

        // Verifying if "Port. Weight" and "Price to Earnings" legends are displayed
        ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(legendName, indexs) {
          if (legendName[indexs] !== arrOfColumns[indexs]) {
            expect(false).customError('"' + columnName + '" legend is not displayed. Expected: "' + columnName + '" but' +
              ' Found: "' + legendName + '"');
            CommonFunctions.takeScreenShot();
          }
        });

      });
    });

  });

  describe('Test Step ID: 556828', function() {

    it('Should click on the "Grid" icon in "Port. Weight" chart', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Port. Weight').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Chart has changed" dialog box appears', function() {
      ThiefHelpers.isDialogOpen('Chart has changed');

    });

    it('Should click on "Discard Changes" button of "Chart has changed" dialog', function() {
      ThiefHelpers.getDialogButton('Chart has changed', 'Discard Changes').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that loading swirl is not displayed', function() {
      browser.sleep(4000);

      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Weights" report is not displayed on the webpage.');
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

  });

  describe('Test Step ID: 558834', function() {

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
            'Expected: "Tile Options - Weights" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should on the "X" icon next to "Price to Earnings" from "Selected" section', function() {
      // Getting the xpath of the Selected section
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Price to Earnings');

      item.getActions().then(function(actions) {
        actions.triggerAction('remove');
      });
    });

    it('Should click on "OK" button from "Tile Options - Weights" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Weights" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 180000);

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Weights" report is not displayed on the webpage.');
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

    it('Should right click on "Port. Weight" in "Weights" report and select "Custom Charts > Bar" ', function() {
      var eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Weights');
      eleRefs.each(function(element) {
        element.getText().then(function(text) {
          var name = text.replace(/\n/g, ' ');
          if (name === 'Port. Weight') {
            PA3MainPage.rightClickAndSelectOption(element, 'Custom Charts|Bar');
          }
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Weights');
            eleRefs.then(function(references) {
              references.forEach(function(eleRef) {
                eleRef.getText().then(function(text) {
                  var name = text.replace(/\n/g, ' ');
                  if (name === 'Port. Weight') {
                    PA3MainPage.rightClickAndSelectOption(eleRef, 'Custom Charts|Bar');
                  }
                });
              });
            });
          } else {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Verifying that loading swirl is not displayed', function() {
      browser.sleep(4000);

      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verifying if calculated data for "Port. Weight" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Port. Weight').then(function(displayed) {
        expect(displayed).customError('"Port. Weight" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Port. Weight')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Port. Weight" chart: ' + error);
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

    it('Verifying if bar chart is displayed for "Port. Weight" column', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 0).then(function(styleName) {
        if (styleName !== 'Bars') {
          expect(false).customError('Bar chart is not displayed for "Port. Weight" column. Expected: "Bars" but' +
            ' Found: "' + styleName + '"');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Port. Weight" legend is displayed
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(legendName) {
        legendName.forEach(function(name) {
          if (name !== 'Port. Weight') {
            expect(false).customError('"Port. Weight" legend is not displayed. Expected: "Port. Weight" but' +
              ' Found: "' + legendName + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Verifying if bar chart is not displayed for "Price to Earnings" column', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(legendName) {
        legendName.forEach(function(name) {
          if (name === 'Price to Earnings') {
            expect(false).customError('"Price to Earnings" legend is displayed. Expected: "Price to Earnings" but' +
              ' Found: "' + legendName + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 558835', function() {

    it('Click on "Economic Sector" hyperlink in "Port. Weight" chart', function() {
      // Verifying that Hyperlink name is "Economic Sector"
      PA3MainPage.getGroupingsHyperLink('Port. Weight').getText().then(function(text) {
        if (text.indexOf('Economic Sector') > -1) {
          // Click on the "Economic Sector" Hyperlink
          PA3MainPage.getGroupingsHyperLink('Port. Weight').click();
        }
      });

    });

    it('Verifying if view changed to "Tile Options - Port. Weight" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Port. Weight') {
          expect(false).customError('"Tile Options - Port. Weight" view has not appeared. ' +
            'Expected: "Tile Options - Port. Weight" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Groupings" is selected from LHP by default', function() {
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Groupings') {
          expect(false).customError('"Groupings" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "X" icon next to "Industry - FactSet" from "Selected" section to remove it', function() {
      // Verifying if "Industry - FactSet" column is present in the "Selected" section
      TileOptionsGroupings.getElementFromSelectedContainer('Industry - FactSet').isPresent().then(function(option) {
        if (!option) {
          expect(option).customError('"Industry - FactSet" column is not present in "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      TileOptionsGroupings.getRemoveButtonOfElementInSelectedSection('Industry - FactSet').click()
        .then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Verifying if "Industry - FactSet" is removed from "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Industry - FactSet').isPresent().then(function(option) {
        if (option) {
          expect(option).customError('"Industry - FactSet" column was not deleted list.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'Index out of bound') {
          expect(true).toBeTruthy();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options - Port. Weight" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if loading swirl is displayed', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Port. Weight" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Port. Weight').then(function(displayed) {
        expect(displayed).customError('"Port. Weight" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Port. Weight')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Port. Weight" chart: ' + error);
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
  });

  describe('Test Step ID: 558836', function() {

    it('Should click on the "Grid" icon in "Port. Weight" chart', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Port. Weight').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that loading swirl is not displayed', function() {
      browser.sleep(4000);

      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Weights" report is not displayed on the webpage.');
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

  });

  describe('Test Step ID: 559305', function() {

    it('Should right click on "Port. Weight" in "Weights" report and select "Custom Charts > Bar" ', function() {
      var eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Weights');
      eleRefs.each(function(element) {
        element.getText().then(function(text) {
          var name = text.replace(/\n/g, ' ');
          if (name === 'Port. Weight') {
            PA3MainPage.rightClickAndSelectOption(element, 'Custom Charts|Bar');
          }
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Weights');
            eleRefs.then(function(references) {
              references.forEach(function(eleRef) {
                eleRef.getText().then(function(text) {
                  var name = text.replace(/\n/g, ' ');
                  if (name === 'Port. Weight') {
                    PA3MainPage.rightClickAndSelectOption(eleRef, 'Custom Charts|Bar');
                  }
                });
              });
            });
          } else {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Verifying if calculated data for "Port. Weight" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Port. Weight').then(function(displayed) {
        expect(displayed).customError('"Port. Weight" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Port. Weight')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Port. Weight" chart: ' + error);
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

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    it('Click on "Excluded: Finance" hyperlink in the "Port. Weight" chart', function() {
      // Verifying that Hyperlink name is "Excluded: Finance"
      PA3MainPage.getExclusionsHyperLink('Port. Weight').getText().then(function(text) {
        if (text.indexOf('Excluded: Finance') > -1) {
          // Click on the "Excluded: Finance" Hyperlink
          PA3MainPage.getExclusionsHyperLink('Port. Weight').click();
        }
      });

    });

    it('Click on "Edit Exclusions" hyperlink from the excluded window', function() {
      PA3MainPage.getEditExclusionsHyperlinkFromInfoBox('Port. Weight').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Port. Weight" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Port. Weight') {
          expect(false).customError('"Tile Options - Port. Weight" view has not appeared. ' +
            'Expected: "Tile Options - Port. Weight" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Exclusions" is selected from LHP by default', function() {
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Exclusions') {
          expect(false).customError('"Exclusions" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000))
        .toBeTruthy();
    });

    it('Should click on "X" button next "Finance" under "Economic Sector > Industry" from "Selected" section to delete it',
      function() {
        var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Economic Sector > Industry');

        group.isExpanded().then(function(expanded) {
          if (expanded) {
            group.getItemByText('Finance').then(function(item) {
              return item.getActions().then(function(actions) {
                return actions.triggerAction('remove');
              });
            });
          } else {
            expect(false).customError('"Economic Sector > Industry" is not expanded in the "Selected" section.');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    it('Should click on "OK" button from "Tile Options - Port. Weight" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if loading swirl is displayed', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Port. Weight" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Port. Weight').then(function(displayed) {
        expect(displayed).customError('"Port. Weight" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Port. Weight')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Port. Weight" chart: ' + error);
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
  });

  describe('Test Step ID: 559306', function() {

    it('Should click on the "Grid" icon in "Port. Weight" chart', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Port. Weight').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that loading swirl is not displayed', function() {
      browser.sleep(4000);

      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Weights" report is not displayed on the webpage.');
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
  });

  describe('Test Step ID: 559308', function() {

    it('Should right click on "Port. Weight" in "Weights" report and select "Custom Charts > Bar" ', function() {
      var eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Weights');
      eleRefs.each(function(element) {
        element.getText().then(function(text) {
          var name = text.replace(/\n/g, ' ');
          if (name === 'Port. Weight') {
            PA3MainPage.rightClickAndSelectOption(element, 'Custom Charts|Bar');
          }
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Weights');
            eleRefs.then(function(references) {
              references.forEach(function(eleRef) {
                eleRef.getText().then(function(text) {
                  var name = text.replace(/\n/g, ' ');
                  if (name === 'Port. Weight') {
                    PA3MainPage.rightClickAndSelectOption(eleRef, 'Custom Charts|Bar');
                  }
                });
              });
            });
          } else {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should click on "wrench" icon in the report', function() {
      PA3MainPage.selectWrenchIcon('Port. Weight');
    });

    it('Verifying if the "wrench" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Wrench" drop down did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Tile Options View mode is appeared', function() {
      TileOptions.isTileOptionsMode().then(function(found) {
        if (!found) {
          expect(false).customError('Error: "Tile Options" view mode is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "End Date" drop down in the "Dates" view', function() {
      TileOptionsDates.getDateDropDown('single\'s end date').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Should select "One Week Ago" option from drop down', function() {
      TileOptionsDates.getOptionFromDateDropDown('One Week Ago').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verify if 'One Week Ago' is selected
      TileOptionsDates.getDateField('single\'s end date').getAttribute('value').then(function(value) {
        if (value !== 'One Week Ago') {
          expect(false).customError('"One Week Ago" option is not selected from drop down.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options - Port. Weight" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if loading swirl is displayed', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Port. Weight" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Port. Weight').then(function(displayed) {
        expect(displayed).customError('"Port. Weight" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Port. Weight')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Port. Weight" chart: ' + error);
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

  });

  describe('Test Step ID: 559309', function() {

    it('Should click on the "Grid" icon in "Port. Weight" chart', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Port. Weight').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that loading swirl is not displayed', function() {
      browser.sleep(4000);

      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Weights" report is not displayed on the webpage.');
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
  });

  describe('Test Step ID: 559613', function() {

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
            'Expected: "Tile Options - Weights" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "mpt" into the search field of "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('mpt');

      // Verifying that "mpt" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== 'mpt') {
          expect(false).customError('"mpt" is not present in search field of "Available" section');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the Search Result to appear
      browser.sleep(4000);
    });

    it('Should double click on "Port. MPT Volatility" from search result', function() {
      // Getting the xpath of the Available section
      var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      group.getItemByText('Port. MPT Volatility').then(function(item) {
        item.select();
        item.doubleClick();
      });
    });

    it('Verifying if "Port. MPT Volatility" is added to "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Port. MPT Volatility').isPresent().then(function(present) {
        if (!present) {
          expect(false).then('"Port. MPT Volatility" is not added to "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options - Weights" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Weights" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 180000);

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Weights" report is not displayed on the webpage.');
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

    it('Should right click on "Port. Weight" in "Weights" report and select "Custom Charts > Bar" ', function() {
      var eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Weights');
      eleRefs.each(function(element) {
        element.getText().then(function(text) {
          var name = text.replace(/\n/g, ' ');
          if (name === 'Port. Weight') {
            PA3MainPage.rightClickAndSelectOption(element, 'Custom Charts|Bar');
          }
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Weights');
            eleRefs.then(function(references) {
              references.forEach(function(eleRef) {
                eleRef.getText().then(function(text) {
                  var name = text.replace(/\n/g, ' ');
                  if (name === 'Port. Weight') {
                    PA3MainPage.rightClickAndSelectOption(eleRef, 'Custom Charts|Bar');
                  }
                });
              });
            });
          } else {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Verifying that loading swirl is not displayed', function() {
      browser.sleep(4000);

      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verifying if calculated data for "Port. Weight" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Port. Weight').then(function(displayed) {
        expect(displayed).customError('"Port. Weight" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Port. Weight')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Port. Weight" chart: ' + error);
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

  });

  describe('Test Step ID: 559614', function() {

    it('Should click on the "Wrench" icon in the "Port. Weight" chart ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Port. Weight').click().then(function() {
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
      });
    });

    it('Verifying if view changed to "Tile Options - Port. Weight" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Port. Weight') {
          expect(false).customError('"Tile Options - Port. Weight" view has not appeared. ' +
            'Expected: "Tile Options - Port. Weight" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP in "Tile Options - Port. Weight" view', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "PE" into the search field of "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('PE');

      // Verifying that "PE" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== 'PE') {
          expect(false).customError('"PE" is not present in search field of "Available" section');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the Search Result to appear
      browser.sleep(4000);
    });

    it('Should double click on "Price to Earnings" from search result', function() {
      // Getting the xpath of the Available section
      var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');

      group.getItemByText('Price to Earnings').then(function(item) {
        item.select();
        item.doubleClick();
      });
    });

    it('Verifying if "Price to Earnings" is added to "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Price to Earnings').isPresent().then(function(present) {
        if (!present) {
          expect(false).then('"Price to Earnings" is not added to "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options - Port. Weight" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Port. Weight" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - Weights" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if loading swirl is displayed', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Port. Weight" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Port. Weight').then(function(displayed) {
        expect(displayed).customError('"Port. Weight" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Port. Weight')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Port. Weight" chart: ' + error);
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

    var arrOfColumns = ['Port. Weight', 'Price to Earnings'];
    var arrOfSeries = ['Series 1', 'Series 2'];

    arrOfColumns.forEach(function(columnName, index) {

      it('Verifying if bar chart is displayed for "' + columnName + '" column', function() {
        ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', arrOfSeries[index], 0).then(function(styleName) {
          if (styleName !== 'Bars') {
            expect(false).customError('Bar chart is not displayed for "' + columnName + '" column. Expected: "Bars" but' +
              ' Found: "' + styleName + '"');
            CommonFunctions.takeScreenShot();
          }
        });

        // Verifying if "Port. Weight" and "Price to Earnings" legends are displayed
        ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(legendName, indexs) {
          if (legendName[indexs] !== arrOfColumns[indexs]) {
            expect(false).customError('"' + columnName + '" legend is not displayed. Expected: "' + columnName + '" but' +
              ' Found: "' + legendName + '"');
            CommonFunctions.takeScreenShot();
          }
        });

      });
    });

  });

  describe('Test Step ID: 559616', function() {

    it('Should click on the "Grid" icon in "Port. Weight" chart', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Port. Weight').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Chart has changed" dialog box appears', function() {
      ThiefHelpers.isDialogOpen('Chart has changed');

    });

    it('Should click on "Discard Changes" button of "Chart has changed" dialog', function() {
      ThiefHelpers.getDialogButton('Chart has changed', 'Discard Changes').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that loading swirl is not displayed', function() {
      browser.sleep(4000);

      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Weights" report is not displayed on the webpage.');
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
  });

  describe('Test Step ID: 559617', function() {

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
            'Expected: "Tile Options - Weights" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should on the "X" icon next to "Price to Earnings" from "Selected" section', function() {
      // Getting the xpath of the Selected section
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Price to Earnings');

      item.getActions().then(function(actions) {
        actions.triggerAction('remove');
      });

    });

    it('Should click on "OK" button from "Tile Options - Weights" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Weights" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 180000);

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Weights" report is not displayed on the webpage.');
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

    it('Should right click on "Port. Weight" in "Weights" report and select "Custom Charts > Bar" ', function() {
      var eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Weights');
      eleRefs.each(function(element) {
        element.getText().then(function(text) {
          var name = text.replace(/\n/g, ' ');
          if (name === 'Port. Weight') {
            PA3MainPage.rightClickAndSelectOption(element, 'Custom Charts|Bar');
          }
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Weights');
            eleRefs.then(function(references) {
              references.forEach(function(eleRef) {
                eleRef.getText().then(function(text) {
                  var name = text.replace(/\n/g, ' ');
                  if (name === 'Port. Weight') {
                    PA3MainPage.rightClickAndSelectOption(eleRef, 'Custom Charts|Bar');
                  }
                });
              });
            });
          } else {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Verifying that loading swirl is not displayed', function() {
      browser.sleep(4000);

      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verifying if calculated data for "Port. Weight" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Port. Weight').then(function(displayed) {
        expect(displayed).customError('"Port. Weight" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Port. Weight')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Port. Weight" chart: ' + error);
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

    it('Verifying if bar chart is displayed for "Port. Weight" column', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 0).then(function(styleName) {
        if (styleName !== 'Bars') {
          expect(false).customError('Bar chart is displayed for "Port. Weight" column. Expected: "Bars" but' +
            ' Found: "' + styleName + '"');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Port. Weight" legend is displayed
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(legendName) {
        legendName.forEach(function(name) {
          if (name !== 'Port. Weight') {
            expect(false).customError('"Port. Weight" legend is not displayed. Expected: "Port. Weight" but' +
              ' Found: "' + legendName + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Verifying if bar chart is not displayed for "Price to Earnings" column', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(legendName) {
        legendName.forEach(function(name) {
          if (name === 'Price to Earnings') {
            expect(false).customError('"Price to Earnings" legend is displayed. Expected: "Price to Earnings" but' +
              ' Found: "' + legendName + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });
  });

  describe('Test Step ID: 559618', function() {

    it('Click on "Economic Sector" hyperlink in the "Port. Weight" chart', function() {
      // Verifying that Hyperlink name is "Economic Sector"
      PA3MainPage.getGroupingsHyperLink('Port. Weight').getText().then(function(text) {
        if (text.indexOf('Economic Sector') > -1) {
          // Click on the "Economic Sector" Hyperlink
          PA3MainPage.getGroupingsHyperLink('Port. Weight').click();
        }
      });

    });

    it('Verifying if view changed to "Tile Options - Port. Weight" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Port. Weight') {
          expect(false).customError('"Tile Options - Port. Weight" view has not appeared. ' +
            'Expected: "Tile Options - Port. Weight" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Groupings" is selected from LHP by default', function() {
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Groupings') {
          expect(false).customError('"Groupings" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Double click on "Asset Class" to add it to "Selected" section', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('FactSet', 'Asset Class'))
        .perform();
    });

    it('Verifying that "Asset Class" is added to the "Selected" section', function() {
      expect(TileOptionsGroupings.getElementFromSelectedContainer('Asset Class').isPresent()).toBeTruthy();
    });

    it('Should click on "OK" button from "Tile Options - Port. Weight" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if loading swirl is displayed', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Port. Weight" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Port. Weight').then(function(displayed) {
        expect(displayed).customError('"Port. Weight" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Port. Weight')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Port. Weight" chart: ' + error);
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
  });

  describe('Test Step ID: 559619', function() {

    it('Should click on the "Grid" icon in "Port. Weight" chart', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Port. Weight').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that loading swirl is not displayed', function() {
      browser.sleep(4000);

      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Weights" report is not displayed on the webpage.');
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
  });

  describe('Test Step ID: 559620', function() {

    it('Should right click on "Port. Weight" in "Weights" report and select "Custom Charts > Bar" ', function() {
      var eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Weights');
      eleRefs.each(function(element) {
        element.getText().then(function(text) {
          var name = text.replace(/\n/g, ' ');
          if (name === 'Port. Weight') {
            PA3MainPage.rightClickAndSelectOption(element, 'Custom Charts|Bar');
          }
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Weights');
            eleRefs.then(function(references) {
              references.forEach(function(eleRef) {
                eleRef.getText().then(function(text) {
                  var name = text.replace(/\n/g, ' ');
                  if (name === 'Port. Weight') {
                    PA3MainPage.rightClickAndSelectOption(eleRef, 'Custom Charts|Bar');
                  }
                });
              });
            });
          } else {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should wait for "Port. Weight" chart to finish calculation', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Port. Weight" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Port. Weight').then(function(displayed) {
        expect(displayed).customError('"Port. Weight" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Port. Weight')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Port. Weight" chart: ' + error);
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

    it('Should click on the "Wrench" icon in the "Port. Weight" chart ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Port. Weight').click().then(function() {
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
      });
    });

    it('Verifying if view changed to "Tile Options - Port. Weight" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Port. Weight') {
          expect(false).customError('"Tile Options - Port. Weight" view has not appeared. ' +
            'Expected: "Tile Options - Port. Weight" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Exclusions" from LHP in "Tile Options - Port. Weight" view', function() {
      TileOptions.getLHPOption('Exclusions').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Exclusions"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Exclusions') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000))
        .toBeTruthy();
    });

    it('Double click on "Communications" from "Available section"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Communications');
      group.select();
      group.doubleClick();

    });

    var arrItems = [];
    it('Verify if "Communications" is added to the "Selected" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Economic Sector > Asset Class');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getChildrenText().then(function(arrObject) {
            arrObject.forEach(function(element) {
              arrItems.push(element.text);
            });
            if (arrItems.indexOf('Communications') === -1) {
              expect(false).customError('"Communications" is not present in "Selected" section');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Economic Sector > Asset Class" is not expanded in "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options - Port. Weight" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Port. Weight" view should be closed after clicking on OK button', function() {
      TileOptions.isTileOptionsMode().then(function(open) {
        if (open) {
          expect(false).customError('"Tile Options - Weights" view is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if loading swirl is displayed', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Port. Weight" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Port. Weight').then(function(displayed) {
        expect(displayed).customError('"Port. Weight" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Port. Weight')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Port. Weight" chart: ' + error);
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

  });

  describe('Test Step ID: 559621', function() {

    it('Should click on the "Grid" icon in "Port. Weight" chart', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Port. Weight').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that loading swirl is not displayed', function() {
      browser.sleep(4000);

      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Weights" report is not displayed on the webpage.');
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
  });

  describe('Test Step ID: 559622', function() {

    it('Should right click on "Port. Weight" in "Weights" report and select "Custom Charts > Bar" ', function() {
      var eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Weights');
      eleRefs.each(function(element) {
        element.getText().then(function(text) {
          var name = text.replace(/\n/g, ' ');
          if (name === 'Port. Weight') {
            PA3MainPage.rightClickAndSelectOption(element, 'Custom Charts|Bar');
          }
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Weights');
            eleRefs.then(function(references) {
              references.forEach(function(eleRef) {
                eleRef.getText().then(function(text) {
                  var name = text.replace(/\n/g, ' ');
                  if (name === 'Port. Weight') {
                    PA3MainPage.rightClickAndSelectOption(eleRef, 'Custom Charts|Bar');
                  }
                });
              });
            });
          } else {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should wait for "Port. Weight" chart to finish calculation', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Port. Weight" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Port. Weight').then(function(displayed) {
        expect(displayed).customError('"Port. Weight" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Port. Weight')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Port. Weight" chart: ' + error);
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

    it('Should click on "wrench" icon in the report', function() {
      PA3MainPage.selectWrenchIcon('Port. Weight');
    });

    it('Verifying if the "wrench" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Wrench" drop down did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Tile Options View mode is appeared', function() {
      TileOptions.isTileOptionsMode().then(function(found) {
        if (!found) {
          expect(false).customError('Error: "Tile Options" view mode is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "End Date" drop down', function() {
      TileOptionsDates.getDateDropDown('single\'s end date').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Should select "End of Last Month" option from drop down', function() {
      TileOptionsDates.getOptionFromDateDropDown('End of Last Month').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verify if 'End of Last Month' is selected
      TileOptionsDates.getDateField('single\'s end date').getAttribute('value').then(function(value) {
        if (value !== 'End of Last Month') {
          expect(false).customError('"End of Last Month" option is not selected from drop down.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options - Port. Weight" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if loading swirl is displayed', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Port. Weight" chart appeared without any errors', function() {
      PA3MainPage.isInChartFormat('Port. Weight').then(function(displayed) {
        expect(displayed).customError('"Port. Weight" chart is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Port. Weight')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Port. Weight" chart: ' + error);
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
  });

  describe('Test Step ID: 559623', function() {

    it('Should click on the "Grid" icon in "Port. Weight" chart', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Port. Weight').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that loading swirl is not displayed', function() {
      browser.sleep(4000);

      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Weights" report is not displayed on the webpage.');
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
  });
});
