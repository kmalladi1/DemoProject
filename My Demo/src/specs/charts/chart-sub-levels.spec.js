'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: chart-sub-levels', function() {

  describe('Test Step ID: 552112', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/default_doc_auto" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });

    it('Waiting for "Weights" report to calculate', function() {
      // Waiting for "Weights" report to finish calculation
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      // Verifying that the "Weights" reports calculated
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

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if Portfolio widget is populated with "CLIENT:/PA3/TEST.ACCT"', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathPortfolioWidget).getText().then(function(val) {
        if (val !== 'CLIENT:/PA3/TEST.ACCT') {
          expect(false).customError('Portfolio widget is not populated with "CLIENT:/PA3/TEST.ACCT"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Benchmark widget is populated with "RUSSELL:1000"', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathBenchmarkWidget).getText().then(function(val) {
        if (val !== 'RUSSELL:1000') {
          expect(false).customError('Benchmark widget is not populated with "RUSSELL:1000"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 569029', function() {

    it('Should right click on "Port. Weight" column and select Custom Charts|Line', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', 'Port. Weight').then(function(colRef) {
        PA3MainPage.rightClickAndSelectOption(colRef, 'Custom Charts|Line');
      });
    });

    it('Should wait until loading icon disappears', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Should select "Electronic Technology" and "Distribution Services" by holding shift key from the Interactive pane', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference();
      group.getGroupByText('Electronic Technology').select();
      group.getGroupByText('Distribution Services').select(false, true);
    });

    var arrSelectedItems = ['Electronic Technology', 'Distribution Services'];
    arrSelectedItems.forEach(function(element) {
      it('Verifying if "' + element + '" is selected form Interactive pane', function() {
        var group = ThiefHelpers.getVirtualListboxClassReference();

        group.getGroupByText(element).isSelected().then(function(bool) {
          if (bool !== true) {
            expect(false).customError('"' + element + '" did not highlight in "Interactive pane"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should right click on the Blue Series Line', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 0);
    });

    it('Should select "Format..." from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Format...').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Port.Weight - Electronic Technology" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('"Port.Weight - Electronic Technology" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Color Picker" button from the drop down', function() {
      ChartingUtilities.getColorPickerButton().press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down opened
      ThiefHelpers.isDropDownOpen(1).then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('"Port.Weight - Electronic Technology" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Red" from the color picker', function() {
      ChartingUtilities.selectColorFrmDD('rgb(255, 55, 55)');
    });

    it('Should click "Close" button from the drop down', function() {
      ThiefHelpers.getButtonClassReference('Close').press();

      // Verifying if drop down closed
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (isOpen) {
          expect(false).customError('"Port.Weight - Electronic Technology" drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if Chart is displayed', function() {
      browser.driver.wait(function() {
        var xpath = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="Port. Weight"]]' +
          '//*[contains(@class, "fdschartctl")]';
        return element(by.xpath(xpath)).isDisplayed().then(function(isPresent) {
          return isPresent;
        }, function() {

          return false;
        });
      }, 12000, 'Chart is not displayed');
    });

    it('Verifying if Port. Weight - Electronic Technology Color is Red', function() {
      ChartHelpers.getSeriesColor('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1',
        'Foreground').then(function(hexColor) {
        expect(hexColor === ChartingUtilities.HexColorJSON.red).customError('Port. Weight - Electronic ' +
          'Technology Color is Red');
      });
    });

    it('Verifying if Port. Weight - Distribution Services Color is green', function() {
      ChartHelpers.getSeriesColor('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2',
        'Foreground').then(function(hexColor) {
        expect(hexColor === ChartingUtilities.HexColorJSON.green).customError('Port. Weight - ' +
          'Distribution Services Color is not green');
      });
    });

  });

  describe('Test Step ID: 569030', function() {

    it('Should click on "Weights Difference Chart" report from LHP to select', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Weights Difference Chart').then(function(ele) {
        ele.click();
      });

      // Verifying if 'Weights Difference Chart report is selected
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Weights Difference Chart').then(function(ele) {
        ele.getAttribute('class').then(
          function(val) {
            if (val.indexOf('selected') === -1) {
              expect(false).customError('"Weights Difference Chart" report from LHP is not selected');
            }
          }, function(err) {

            expect(false).customError(err);
          });
      });

    });

    it('Waiting for "Weights Difference Chart" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights Difference Chart" report appeared without any issues', function() {
      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Weights" report from LHP to select', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Weights').then(function(ele) {
        ele.click();
      });

      // Verifying if 'Weights' report is selected
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Weights').then(function(ele) {
        ele.getAttribute('class').then(
          function(val) {
            if (val.indexOf('selected') === -1) {
              expect(false).customError('"Weights" report from LHP is not selected');
            }
          }, function(err) {

            expect(false).customError(err);
          });
      });
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if Port. Weight - Electronic Technology Color is Red', function() {
      ChartHelpers.getSeriesColor('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1',
        'Foreground').then(function(hexColor) {
        expect(hexColor === ChartingUtilities.HexColorJSON.red).customError('Port. Weight - Electronic ' +
          'Technology Color is Red');
      });
    });

    it('Verifying if Port. Weight - Distribution Services Color is green', function() {
      ChartHelpers.getSeriesColor('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2',
        'Foreground').then(function(hexColor) {
        expect(hexColor === ChartingUtilities.HexColorJSON.green).customError('Port. Weight - ' +
          'Distribution Services Color is not green');
      });
    });

  });

  describe('Test Step ID: 552113', function() {

    it('Should click on "Valuation - Detail" report from LHP to select', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Valuation - Detail').then(function(ele) {
        ele.click();
      });

      // Verifying if Valuation - Detail report is selected
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Valuation - Detail').then(function(ele) {
        ele.getAttribute('class').then(
          function(val) {
            if (val.indexOf('selected') === -1) {
              expect(false).customError('"Valuation - Detail" report from LHP is not selected');
            }
          }, function(err) {

            expect(false).customError(err);
          });
      });
    });

    it('Waiting for "Valuation - Detail" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Valuation - Detail" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Valuation - Detail').then(function(found) {
        if (!found) {
          expect(false).customError('"Valuation - Detail" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Valuation - Detail')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    ChartingUtilities.selectChartFromReport('Valuation - Detail', 'Portfolio Weights');

    it('Verifying if "Pie chart" is displayed', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 0).then(function(value) {
        if (value !== '3D Pie') {
          expect(false).customError('Pie Chart is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 552114', function() {

    it('Should click on "Wrench" icon available in Workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Portfolio Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Chart Type > Column" from the Chart icon drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Chart Type|Column').click();
    });

    it('Should click on "Wrench" icon available in Valuation - Detail', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Ending Weight').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Display Options" from the Wrench icon drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Display Options').click();

      // Wait for report calculation to start
      browser.sleep(2000);
    });

    it('Should select "Top N" from the Values drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Top N', undefined, ChartingUtilities.displayOptionsValuesDD);
    });

    it('Verifying if "Apply To Sub-Levels" checkbox is present', function() {
      ThiefHelpers.isPresent('Checkbox', 'Apply To Sub-Levels').then(function(found) {
        if (!found) {
          expect(false).customError('"Apply To Sub-Levels" checkbox is not present');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "5" bars( data sets ) are displayed in the chart', function() {
      ChartHelpers.getSeriesLength('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(value) {
        if (value !== 5) {
          expect(false).customError('"5" bars( data sets ) are not displayed in the chart');
          CommonFunctions.takeScreenShot();
        }
      });

    });

  });

  describe('Test Step ID: 552115', function() {

    it('Should enter "4" in the input box of Display Options Panel', function() {
      ThiefHelpers.getTextBoxClassReference('', ChartingUtilities.displayOptionsValuesInput).setText('4');

      // Verifying if 4 is entered in the text box
      ThiefHelpers.getTextBoxClassReference('', ChartingUtilities.displayOptionsValuesInput).getText().then(
        function(val) {
          if (val !== '4') {
            expect(false).customError('4 is not entered in the input box of Display Options Panel');
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Should select the "Apply to Sub - Levels" checkbox ', function() {
      ThiefHelpers.getCheckBoxClassReference('Apply To Sub-Levels').isChecked().then(function(isChecked) {
        if (!isChecked) {
          expect(false).customError('"Apply to Sub - Levels" checkbox is un checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if Values dropdown and text box are enabled', function() {
      CommonFunctions.isElementEnabled('Textbox', 'Display Values Value').then(function(isEnabled) {
        if (!isEnabled) {
          expect(false).customError('Values text box is disabled');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if drop down enabled
      var xpath = ChartingUtilities.displayOptionsValuesDD + '//*[@tf-button]';
      ThiefHelpers.getButtonClassReference(undefined, xpath).isDisabled().then(function(isDisabled) {
        if (isDisabled) {
          expect(false).customError('"Values" dropdown is not enabled');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 552116', function() {

    it('Should click on "Wrench" icon available in Valuation - Detail', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Ending Weight').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      PA3MainPage.getWrenchIconFromReportWorkspace('Ending Weight').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should double click "Health Technology" bar', function() {
      browser.sleep(5000);
      ChartHelpers.doubleClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 0);
    });

    it('Verifying if "Ending Weight" is displayed as Legend', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(
        function(val) {
          if (val.indexOf('Ending Weight') === -1) {
            expect(false).customError('"Ending Weight" is not displayed as Legend');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should click on "Wrench" icon available in Workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Ending Weight').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "4" bars( data sets ) are displayed in the chart for 4 security areas', function() {
      ChartHelpers.getSeriesLength('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(value) {
        if (value !== 4) {
          expect(false).customError('"4" bars( data sets ) are not displayed in the chart');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Display Options" option is disabled in the Drop down', function() {
      ThiefHelpers.getOptionFromDropdown('Display Options').getAttribute('class').then(
        function(classVal) {
          if (classVal.indexOf('disabled') === -1) {
            expect(false).customError('"Display Options" option is not disabled in the Drop down');
            CommonFunctions.takeScreenShot();
          }
        });
    });

  });

  describe('Test Step ID: 552117', function() {

    it('Should double click on the grid bar', function() {
      ChartHelpers.doubleClickOnPlot('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart');
    });

    it('Should click on "Wrench" icon available in Workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Ending Weight').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      PA3MainPage.getWrenchIconFromReportWorkspace('Ending Weight').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "4" bars( data sets ) are displayed in the chart for 4 sectors', function() {
      ChartHelpers.getSeriesLength('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(
        function(value) {
          if (value !== 4) {
            expect(false).customError('"4" bars( data sets ) are not displayed in the chart');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying if "Display Options" option is enabled in the Drop down', function() {
      Utilities.getOptionFromDropDown('Display Options').getAttribute('class').then(
        function(classVal) {
          if (classVal.indexOf('disabled') !== -1) {
            expect(false).customError('"Display Options" option is not disabled in the Drop down');
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
    });

  });

  describe('Test Step ID: 552118', function() {

    it('Should select "Display Options" from the Wrench icon drop down', function() {
      ThiefHelpers.getMenuClassReference(undefined, true).selectItemByText('Display Options');

      // Wait for report calculation to start
      browser.sleep(2000);
    });

    it('Should select the "Apply to Sub - Levels" checkbox ', function() {
      ThiefHelpers.getCheckBoxClassReference('Apply To Sub-Levels').uncheck();

      // Verifying if Apply To Sub-Levels is un checked
      ThiefHelpers.getCheckBoxClassReference('Apply To Sub-Levels').isChecked().then(function(isChecked) {
        if (isChecked) {
          expect(false).customError('"Apply to Sub - Levels" checkbox is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check for "Health Technology" bar and perform double click on it ', function() {
      var foundAt = null;
      browser.driver.executeScript(function() {
        //  Creating chart object.
        var chartObject = $('[tile-id=tile0] .pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart;
        var seriesObject = chartObject.getObjectById('Series 1');
        var size = seriesObject.getData().x.getSize();
        for (var i = 0; i <= size; i++) {
          var xData = seriesObject.getData().x.getPoint(i);

          // Getting pixel coordinates of the series.
          var p = chartObject.querySeriesPixel('Series 1', i);
          if ((p !== undefined) && (xData.indexOf('Health Technology') !== -1)) {
            foundAt = i;
          }
        }

        return foundAt;
      }).then(function(seriesIndex) {
        if (seriesIndex === undefined || seriesIndex === null) {
          expect(false).customError('No square found with "Health Technology"');
          CommonFunctions.takeScreenShot();
        } else {
          // Performing double click after check hovering on "Health Technology"
          ChartHelpers.doubleClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', seriesIndex);
        }
      });

      // Waiting for drill down window to open
      browser.sleep(2000);
    });

    it('Verifying if "Health Technology" drill down window is open', function() {
      browser.driver.executeScript(function() {
        return $('[tile-id=tile0] .pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart.getObjectById('Chart').getAttribute('Heading3Text');
      }).then(function(heading) {
        if (heading !== 'Health Technology') {
          expect(false).customError('"Health Technology" drill down window not opened, Found: ' + heading);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if more that "4" bars( data sets ) are displayed in the chart', function() {
      ChartHelpers.getSeriesLength('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(
        function(value) {
          if (value <= 4) {
            expect(false).customError('Less than "4" bars( data sets ) are displayed in the chart');
            CommonFunctions.takeScreenShot();
          }
        });
    });

  });

  describe('Test Step ID: 552119', function() {

    it('Should double click on the grid bar', function() {
      ChartHelpers.doubleClickOnPlot('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart');
    });

    it('Should click on "Wrench" icon available in Workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Ending Weight').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Display Options" from the Wrench icon drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Display Options');

      browser.sleep(5000);
    });

    it('Should select "All Values" from the Values drop down', function() {
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('"Display Options" drop down is not opened');
          CommonFunctions.takeScreenShot();
        } else {
          ThiefHelpers.selectOptionFromDropDown('All Values', undefined, ChartingUtilities.displayOptionsValuesDD);
          browser.sleep(5000);
        }
      });
    });

    it('Verifying if "Apply To Sub-Levels" checkbox is disappeared', function() {
      CommonFunctions.isDisplayed('Checkbox', 'Apply To Sub-Levels').then(function(found) {
        if (found) {
          expect(false).customError('"Apply To Sub-Levels" checkbox is not disappeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
