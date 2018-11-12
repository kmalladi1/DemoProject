'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: chart-heatmap', function() {

  describe('Test Step ID: 569941', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:default_doc_auto" document', function() {
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

    it('Verifying if "Portfolio" is set to "CLIENT:/PA3/TEST.ACCT"', function() {
      PA3MainPage.getWidgetBox('Portfolio').getAttribute('value').then(function(val) {
        if (val !== 'CLIENT:/PA3/TEST.ACCT') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Portfolio" is not set to "CLIENT:/PA3/TEST.ACCT"');
        }
      });
    });

    it('Verifying if "Benchmark" is set to "RUSSELL:1000"', function() {
      PA3MainPage.getWidgetBox('Benchmark').getAttribute('value').then(function(val) {
        if (val !== 'RUSSELL:1000') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Benchmark" is not set to "RUSSELL:1000"');
        }
      });
    });

  });

  describe('Test Step ID: 569948', function() {

    var ddName = ['Data Item', 'Size Item']; var ddOption = ['Port. Weight', 'Bench. Weight', 'Difference'];

    it('Should right click on "Port. Weight" in "Weights" report and select "Custom Charts > Heat Map" ', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', 'Port. Weight').then(function(cellRef) {
        PA3MainPage.rightClickAndSelectOption(cellRef, 'Custom Charts|Heat Map');
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Waiting for chart to load
      browser.sleep(3000);
    });

    it('Should perform right click on chart', function() {
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
          if (p !== undefined) {
            foundAt = i;
          }
        }

        return foundAt;
      }).then(function(seriesIndex) {
        if (seriesIndex === undefined) {
          expect(false).customError('No Series Index found on chart to perform actions');
          CommonFunctions.takeScreenShot();
        } else {
          // Performing right click on Series index
          ChartHelpers.rightClickOnSeries('[tile-id=tile0] .pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', seriesIndex);
        }
      });

      // Waiting for menu to open
      browser.sleep(2000);
    });

    it('Should select "Change Series" after perform right click', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Change Series').click().then(function() {
      }, function(err) {

        expect(false).customError('Unable to select option, Error: ' + err);
        CommonFunctions.takeScreenShot();
      });
    });

    ddName.forEach(function(name) {
      it('Should verify the "' + name + '" drop down displays', function() {
        ThiefHelpers.getDropDownSelectClassReference(name, undefined, true).open().then(function() {
          ThiefHelpers.getAllOptionsFromDropdown(2).then(function(arrEle) {
            ddOption.forEach(function(option) {
              if (arrEle.indexOf(option) === -1) {
                CommonFunctions.takeScreenShot();
                expect(false).customError(option + ' option is not displayed in ' + name +
                  ' drop down');
              }
            });

            ThiefHelpers.getDropDownSelectClassReference(name).open();
          });
        }, function(err) {

          CommonFunctions.takeScreenShot();
          expect(false).customError('Unable to click on ' + ddName + ' drop down, Error: ' + err);
        });
      });
    });

    it('Should click any where outside to dismiss the drop down menu', function() {
      // Click anywhere to close the drop down
      PA3MainPage.getReports('Weights').click();
    });

  });

  // Unable to automate few steps here due to issue mentioned in RPD: 20773108
  describe('Test Step ID: 569950', function() {

    it('Should perform right click on chart', function() {
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
          if (p !== undefined) {
            foundAt = i;
          }
        }

        return foundAt;
      }).then(function(seriesIndex) {
        if (seriesIndex === undefined) {
          expect(false).customError('No Series Index found on chart to perform actions');
          CommonFunctions.takeScreenShot();
        } else {
          // Performing right click on Series index fetched
          ChartHelpers.rightClickOnSeries('[tile-id=tile0] .pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', seriesIndex);
        }
      });

      // Waiting for menu to open
      browser.sleep(2000);
    });

    it('Should select on "Display Options" after perform right click', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Display Options').click().then(function() {
      }, function(err) {

        expect(false).customError('Unable to select option, Error: ' + err);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 569976', function() {

    it('Should click on maximum drop down', function() {
      ChartingUtilities.getColorPickerButton('Max').press();
    });

    it('Should select yellow color', function() {
      ChartingUtilities.selectColorFrmDD('rgb(255, 255, 77)');

      // Click anywhere to close the drop down
      PA3MainPage.getReports('Weights').click();
    });

    var color = [{color: 'yellow', value: 5111807}, {color: 'white', value: 16777215}];
    it('Verifying if chart loaded with yellow and white colors', function() {
      browser.driver.executeScript(function() {
        return $('[tile-id=tile0] .pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart.getObjectById('ColorMap').getData();
      }).then(function(colorArr) {
        color.forEach(function(chartColor) {
          if (colorArr.indexOf(chartColor.value) === -1) {
            expect(false).customError('Chart is not loaded with ' + chartColor.color + ' color');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    // Known Issue with hoverOnPixel api call : RPD:26461940
    it('Should hover on "Electronic Technology" square and verifying "Security Name", "Sector name(Electronic' +
      ' Technology)", "Port. Weight" and "Size" are displayed', function() {
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
          if ((p !== undefined) && (xData.indexOf('Electronic Technology') !== -1)) {
            foundAt = i;
          }
        }

        return foundAt;
      }).then(function(seriesIndex) {
        if (seriesIndex === undefined || seriesIndex === null) {
          expect(false).customError('No square found with "Electronic Technology"');
          CommonFunctions.takeScreenShot();
        } else {
          // Performing hover on "Electronic Technology"
          ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', seriesIndex);
          ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', seriesIndex);
        }
      });

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').last().text();
      }).then(function(text) {
        if ((text.indexOf('Electronic Technology') === 0) ||
          (text.indexOf('Electronic Technology') === -1) || (text.indexOf('Port. Weight') === -1) ||
          (text.indexOf('Size') === -1)) {
          expect(false).customError('Tool tip is not displayed with "Security Name", "Sector name' +
            ' (Electronic Technology)", "Port. Weight" and "Size" values');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 576165', function() {

    it('Should double click "Electronic Technology" in "Chart"', function() {
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
          if ((p !== undefined) && (xData.indexOf('Electronic Technology') !== -1)) {
            foundAt = i;
          }
        }

        return foundAt;
      }).then(function(seriesIndex) {
        if (seriesIndex === undefined || seriesIndex === null) {
          expect(false).customError('No square found with "Electronic Technology"');
          CommonFunctions.takeScreenShot();
        } else {
          // Performing double click after check hovering on "Electronic Technology"
          ChartHelpers.doubleClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', seriesIndex);
        }
      });

      // Waiting for drill down window to open
      browser.sleep(2000);
    });

    it('Verifying if "Electronic Technology" drill down window is open', function() {
      browser.driver.executeScript(function() {
        return $('[tile-id=tile0] .pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart.getObjectById('Chart').getAttribute('Heading3Text');
      }).then(function(heading) {
        if (heading !== 'Electronic Technology') {
          expect(false).customError('"Electronic Technology" drill down window not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should perform right click on chart', function() {
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
          if (p !== undefined) {
            foundAt = i;
          }
        }

        return foundAt;
      }).then(function(seriesIndex) {
        if (seriesIndex === undefined) {
          expect(false).customError('No Series Index found on chart to perform actions');
          CommonFunctions.takeScreenShot();
        } else {
          // Performing right click on series index fetched
          ChartHelpers.rightClickOnSeries('[tile-id=tile0] .pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', seriesIndex);
        }
      });

      // Waiting for menu to open
      browser.sleep(2000);
    });

    it('Should click on "Change Series" after perform right click', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Change Series').click().then(function() {
      }, function(err) {

        expect(false).customError('Unable to select option, Error: ' + err);
        CommonFunctions.takeScreenShot();
      });
    });

    var ddName = ['Data Item', 'Size Item'];
    ddName.forEach(function(name) {
      it('Verifying if "' + name + '" drop down is set to "Port. Weight"', function() {
        ThiefHelpers.verifySelectedDropDownText('Port. Weight', name, undefined, true);
      });
    });

    var color = [{color: 'yellow', value: 5111807}, {color: 'white', value: 16777215}];
    it('Verifying if chart loaded with yellow and white colors', function() {
      browser.driver.executeScript(function() {
        return $('[tile-id=tile0] .pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart.getObjectById('ColorMap').getData();
      }).then(function(colorArr) {
        color.forEach(function(chartColor) {
          if (colorArr.indexOf(chartColor.value) === -1) {
            expect(false).customError('Chart is not loaded with ' + chartColor.color + ' yellow');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 569977', function() {

    it('Should double click on the white space above the chart to get out of drill down view', function() {

      browser.driver.executeScript(function() {
        //  Creating chart object.
        var chartObject = $('[tile-id=tile0] .pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart;

        // Getting pixel coordinates of the series.
        var p = chartObject.querySeriesPixel('Series 1', 9);

        // Performing double click on the white space above the chart
        chartObject.doubleClickOnPixel(p.x, p.y - p.y);
      });

      // Waiting for drill down window chart to close
      browser.sleep(3000);
    });

    it('Should perform right click on "Energy Minerals"', function() {
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
          if ((p !== undefined) && (xData.indexOf('Energy Minerals') !== -1)) {
            foundAt = i;
          }
        }

        return foundAt;
      }).then(function(seriesIndex) {
        if (seriesIndex === undefined || seriesIndex === null) {
          expect(false).customError('No square found with "Energy Minerals"');
          CommonFunctions.takeScreenShot();
        } else {
          // Performing right click on "Energy Minerals"
          ChartHelpers.rightClickOnSeries('[tile-id=tile0] .pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', seriesIndex);
        }
      });

      // Waiting for drill down window to open
      browser.sleep(2000);
    });

    it('Should click on "Display Options" after perform right click', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Display Options').click().then(function() {
      }, function(err) {

        expect(false).customError('Unable to select option, Error: ' + err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Max" drop down is set to yellow color', function() {
      ChartingUtilities.verifyColorSetToDD('Max', 'rgb(255, 255, 77)');
    });

    it('Verifying if "Depth" drop down is set to "Security"', function() {
      ThiefHelpers.verifySelectedDropDownText('Security', 'Depth', undefined, true);
    });

    var color = [{color: 'yellow', value: 5111807}, {color: 'white', value: 16777215}];
    it('Verifying if chart loaded with yellow and white colors', function() {
      browser.driver.executeScript(function() {
        return $('[tile-id=tile0] .pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart.getObjectById('ColorMap').getData();
      }).then(function(colorArr) {
        color.forEach(function(chartColor) {
          if (colorArr.indexOf(chartColor.value) === -1) {
            expect(false).customError('Chart is not loaded with ' + chartColor.color + ' yellow');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 576117', function() {

    it('Should select "Industry" from "Depth" Section drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Industry', 'Depth');

      // verifying if 'Industry' is selected from "Depth" section drop down
      ThiefHelpers.verifySelectedDropDownText('Industry', 'Depth');
    });

    it('Should click any where outside to dismiss the drop down menu', function() {
      // Click anywhere to close the drop down
      PA3MainPage.getReports('Weights').click();
    });

    it('Should perform right click on chart', function() {
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
          if (p !== undefined) {
            foundAt = i;
          }
        }

        return foundAt;
      }).then(function(seriesIndex) {
        if (seriesIndex === undefined) {
          expect(false).customError('No Series Index found on chart to perform actions');
          CommonFunctions.takeScreenShot();
        } else {
          // Performing right click on series index
          ChartHelpers.rightClickOnSeries('[tile-id=tile0] .pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', seriesIndex);
        }
      });

      // Waiting for menu to open
      browser.sleep(2000);
    });

    it('Should click on "Change Series" after perform right click', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Change Series').click().then(function() {
        // wait until menu displays
        browser.sleep(3000);
      }, function(err) {

        expect(false).customError('Unable to select option, Error: ' + err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select the "Size Item" drop down is set to "Bench. Weight"', function() {
      ThiefHelpers.selectOptionFromDropDown('Bench. Weight', 'Size Item');

      // verifying if 'Bench. Weight' is selected from "Size Item" section drop down
      ThiefHelpers.verifySelectedDropDownText('Bench. Weight', 'Size Item');
    });

    // Known Issue with hoverOnPixel api call : RPD:26461940
    it('Should hover on any(Electronic Technology) square and verifying tool tip displays "Industry name", Sector name, Port. Weight"' +
      ' and "size"', function() {
      browser.driver.executeScript(function() {
        //  Creating chart object.
        var chartObject = $('[tile-id=tile0] .pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart;
        var seriesObject = chartObject.getObjectById('Series 1');
        var size = seriesObject.getData().x.getSize();
        var foundAt;
        for (var i = 0; i <= size; i++) {
          var xData = seriesObject.getData().x.getPoint(i);

          // Getting pixel coordinates of the series.
          var p = chartObject.querySeriesPixel('Series 1', i);
          if ((p !== undefined) && (xData.indexOf('Electronic Technology') !== -1)) {
            foundAt = i;
          }
        }

        return foundAt;
      }).then(function(seriesIndex) {
        if (seriesIndex === undefined || seriesIndex === null) {
          expect(false).customError('No square found with "Electronic Technology"');
          CommonFunctions.takeScreenShot();
        } else {
          // Performing hover on "Electronic Technology"
          ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', seriesIndex);
          ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', seriesIndex);
        }
      });

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').last().text();
      }).then(function(text) {
        if ((text.indexOf('Electronic Technology') === 0) ||
          (text.indexOf('Electronic Technology') === -1) || (text.indexOf('Port. Weight') === -1) ||
          (text.indexOf('Size') === -1)) {
          expect(false).customError('Tool tip is not displayed with "Industry name", Sector name,' +
            ' Port. Weight" and "size"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 576200', function() {

    it('Should select the "Data Item" drop down is set to "Difference"', function() {
      ThiefHelpers.selectOptionFromDropDown('Difference', 'Data Item');

      // verifying if 'Difference' is selected from "Data Item" section drop down
      ThiefHelpers.verifySelectedDropDownText('Difference', 'Data Item');
    });

    it('Should click on wrench icon from the "Difference" report', function() {
      // Click anywhere to close the drop down
      PA3MainPage.getReports('Weights').click();

      PA3MainPage.getWrenchIconFromReportWorkspace('Difference').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Display Options" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Display Options');
    });

    it('Should select "Economic Sector" from "Depth" Section drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Economic Sector', 'Depth');

      // verifying if 'Economic Sector' is selected from "Depth" section drop down
      ThiefHelpers.verifySelectedDropDownText('Economic Sector', 'Depth');
    });

    it('Should click any where outside to dismiss the drop down menu', function() {
      // Click anywhere to close the drop down
      PA3MainPage.getReports('Weights').click();
    });

    // Known Issue with hoverOnPixel api call : RPD:26461940
    it('Should hover on any square and verifying tool tip is displayed with "Sector name", "Difference" and "Size"', function() {
      browser.driver.executeScript(function() {
        //  Creating chart object.
        var chartObject = $('[tile-id=tile0] .pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart;
        var seriesObject = chartObject.getObjectById('Series 1');
        var size = seriesObject.getData().x.getSize();
        var foundAt;
        for (var i = 0; i <= size; i++) {
          var xData = seriesObject.getData().x.getPoint(i);

          // Getting pixel coordinates of the series.
          var p = chartObject.querySeriesPixel('Series 1', i);
          if ((p !== undefined) && (xData.indexOf('Commercial Services') !== -1)) {
            foundAt = i;
          }
        }

        return foundAt;
      }).then(function(seriesIndex) {
        if (seriesIndex === undefined || seriesIndex === null) {
          expect(false).customError('No square found with "Commercial Services"');
          CommonFunctions.takeScreenShot();
        } else {
          // Performing hover on "Commercial services"
          ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', seriesIndex);
          ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', seriesIndex);
        }
      });

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').last().text();
      }).then(function(text) {
        if ((text.indexOf('Commercial Services') === -1) || (text.indexOf('Difference') === -1) ||
          (text.indexOf('Size') === -1)) {
          expect(false).customError('Tool tip is not displayed with Sector name,' +
            ' Difference" and "size"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 576118', function() {

    it('Should double click "Health Technology" in "Chart"', function() {
      var foundAt = null;
      browser.driver.executeScript(function() {
        //  Creating chart object.
        var seriesObject = $('[tile-id=tile0] .pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart.getObjectById('Series 1');
        var size = seriesObject.getData().x.getSize();
        for (var i = 0; i <= size; i++) {
          var xData = seriesObject.getData().x.getPoint(i);
          if ((xData !== undefined) && (xData.indexOf('Health Technology') !== -1)) {
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
      browser.sleep(5000);
    });

    it('Verifying if "Health Technology" drill down window is open', function() {
      browser.driver.executeScript(function() {
        return $('[tile-id=tile0] .pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart.getObjectById('Chart').getAttribute('Heading3Text');
      }).then(function(heading) {
        if (heading !== 'Health Technology') {
          expect(false).customError('"Health Technology" drill down window not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Known Issue with hoverOnPixel api call : RPD:26461940
    it('Should hover on any square and verifying "Biotechnology" is displayed', function() {
      browser.driver.executeScript(function() {
        //  Creating chart object.
        var chartObject = $('[tile-id=tile0] .pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart;
        var seriesObject = chartObject.getObjectById('Series 1');
        var size = seriesObject.getData().x.getSize();
        var foundAt;
        for (var i = 0; i <= size; i++) {
          var xData = seriesObject.getData().x.getPoint(i);

          // Getting pixel coordinates of the series.
          var p = chartObject.querySeriesPixel('Series 1', i);
          if ((p !== undefined) && (xData.indexOf('Biotechnology') !== -1)) {
            foundAt = i;
          }
        }

        return foundAt;
      }).then(function(seriesIndex) {
        if (seriesIndex === undefined || seriesIndex === null) {
          expect(false).customError('No square found with "Biotechnology"');
          CommonFunctions.takeScreenShot();
        } else {
          // Performing hover on "Commercial services"
          ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', seriesIndex);
          ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', seriesIndex);
        }
      });

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Biotechnology') < 0) {
          expect(false).customError('"Biotechnology" did not present in the square');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Known Issue with hoverOnPixel api call : RPD:26461940
    it('Should hover on any square and verifying tool tip is displayed with "Industry Name", "Difference" and' +
      ' "Size" values', function() {
      browser.driver.executeScript(function() {
        //  Creating chart object.
        var chartObject = $('[tile-id=tile0] .pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart;
        var seriesObject = chartObject.getObjectById('Series 1');
        var size = seriesObject.getData().x.getSize();
        var foundAt;
        for (var i = 0; i <= size; i++) {
          var xData = seriesObject.getData().x.getPoint(i);

          // Getting pixel coordinates of the series.
          var p = chartObject.querySeriesPixel('Series 1', i);
          if ((p !== undefined) && (xData.indexOf('Biotechnology') !== -1)) {
            foundAt = i;
          }
        }

        return foundAt;
      }).then(function(seriesIndex) {
        if (seriesIndex === undefined || seriesIndex === null) {
          expect(false).customError('No square found with "Biotechnology"');
          CommonFunctions.takeScreenShot();
        } else {
          // Performing hover on "Biotechnology"
          ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', seriesIndex);
          ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', seriesIndex);
        }
      });

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').last().text();
      }).then(function(text) {
        if ((text.indexOf('Biotechnology') === -1) || (text.indexOf('Difference') === -1) || (text.indexOf('Size') === -1)) {
          expect(false).customError('Tool tip is not displayed with Industry name,' +
            ' Difference" and "size"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 576210', function() {

    it('Should double click on the white space above the chart to get out of drill down view', function() {
      browser.driver.executeScript(function() {
        //  Creating chart object.
        var chartObject = $('[tile-id=tile0] .pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart;

        // Getting pixel coordinates of the series.
        var p = chartObject.querySeriesPixel('Series 1', 0);

        // Performing double click on the white space above the chart
        chartObject.doubleClickOnPixel(p.x, p.y - p.y);
      });

      // Waiting for drill down window chart to close
      browser.sleep(3000);
    });

    // Known Issue:[ RPD:25718390 ] Performing double click and selecting "Show data label" twice as a work around.
    it('Should right click on chart and select "Show data label"', function() {
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
          if (p !== undefined) {
            foundAt = i;
          }
        }

        return foundAt;
      }).then(function(seriesIndex) {
        if (seriesIndex === undefined) {
          expect(false).customError('No Series Index found on chart to perform actions');
          CommonFunctions.takeScreenShot();
        } else {
          // Performing right click on series index
          ChartHelpers.rightClickOnSeries('[tile-id=tile0] .pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', seriesIndex);
        }
      });

      // Waiting for menu to open
      browser.sleep(2000);

      ChartingUtilities.getOptionAfterRightClickOnChart('Show data label').click().then(function() {
      }, function(err) {

        expect(false).customError('Unable to select option, Error: ' + err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should perform right click and select "Show data label"', function() {
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
          if (p !== undefined) {
            foundAt = i;
          }
        }

        return foundAt;
      }).then(function(seriesIndex) {
        if (seriesIndex === undefined) {
          expect(false).customError('No Series Index found on chart to perform actions');
          CommonFunctions.takeScreenShot();
        } else {
          // Performing right click on series index
          ChartHelpers.rightClickOnSeries('[tile-id=tile0] .pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', seriesIndex);
        }
      });

      // Waiting for menu to open
      browser.sleep(2000);

      ChartingUtilities.getOptionAfterRightClickOnChart('Show data label').click().then(function() {
      }, function(err) {

        expect(false).customError('Unable to select option, Error: ' + err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if heat map squares does not displays labels', function() {
      browser.driver.executeScript(function() {
        return $('[tile-id=tile0] .pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart.getObjectById('Series 1').getAttribute('SeriesValue');
      }).then(function(bool) {
        if (bool !== false) {
          expect(false).customError('Heat map squares displays labels');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 576211', function() {

    it('Should click on "Show data label" after perform right click', function() {
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
          if (p !== undefined) {
            foundAt = i;
          }
        }

        return foundAt;
      }).then(function(seriesIndex) {
        if (seriesIndex === undefined) {
          expect(false).customError('No Series Index found on chart to perform actions');
          CommonFunctions.takeScreenShot();
        } else {
          // Performing right click on series index fetched
          ChartHelpers.rightClickOnSeries('[tile-id=tile0] .pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', seriesIndex);
        }
      });

      // Waiting for menu to open
      browser.sleep(2000);

      // Select "Show Data Label"
      ChartingUtilities.getOptionAfterRightClickOnChart('Show data label').click().then(function() {
      }, function(err) {

        expect(false).customError('Unable to select option, Error: ' + err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if heat map squares displays labels', function() {
      browser.driver.executeScript(function() {
        return $('[tile-id=tile0] .pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart.getObjectById('Series 1').getAttribute('SeriesValue');
      }).then(function(bool) {
        if (bool !== true) {
          expect(false).customError('Heat map squares does not displays labels');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 597712', function() {

    it('Should click on "Wrench" icon from "Difference" in Workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Difference').click();
    });

    it('Should select "Geo Heat Map" from the "Chart Type" drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Chart Type|Geo Heat Map').click();
    });

    it('Should wait for "Difference" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Difference'), 180000)).toBeTruthy();
    });

    it('Enter "MSCI_S:WORLD" in Portfolio widget', function() {
      // Entering the value to Banchmark Widget
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathPortfolioWidget).setText('MSCI_S:WORLD');

      PA3MainPage.getWidgetBox('Portfolio').sendKeys(protractor.Key.ENTER);
    });

    it('Should wait until "Geo Heat Map" chart to load with new header', function() {
      // Wait for chart to load
      browser.sleep(5000);
    });

    it('Should wait for "Difference" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Difference'), 180000)).toBeTruthy();
    });

    it('Verifying if Portfolio widget is populated with "MSCI_S:WORLD"', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathPortfolioWidget).getText().then(function(val) {
        if (val !== 'MSCI_S:WORLD') {
          expect(false).customError('Portfolio widget is not populated with "MSCI_S:WORLD"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Note: verifying "Geo heat map" by its draw style: "KMLmap"
    it('Verifying if "Chart" is "Geo Heat Map" chart', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(style) {
        if (style !== 'KMLmap') {
          expect(false).customError('"Chart" did not "KMLmap" chart; Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if header displays "MSCI World Small Cap vs Russell 1000"', function() {
      PA3MainPage.getHeader().getText().then(function(text) {
        if (text !== 'MSCI World Small Cap vs Russell 1000') {
          expect(false).customError('Header of application is not showing "MSCI World Small Cap vs Russell 1000". ' +
            'Expected: "MSCI World Small Cap vs Russell 1000", Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that report is grouped by "Country of Domicile"', function() {
      PA3MainPage.getGroupingsHyperLink('Difference').getText().then(function(refVal) {
        if (refVal.indexOf('Country of Domicile') === -1) {
          expect(false).customError('The report is not grouped by "Country of Domicile"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });
});
