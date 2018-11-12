'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: chart-general', function() {

  var arrGroupNames = [];
  var count = 0;

  describe('Test Step ID: 499765', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:;PA3;Charts;CHART_DOC', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('chart-doc');
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

    it('Verifying if "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that the header title is "Large Cap Core Test vs Russell 1000"', function() {
      PA3MainPage.getHeader().getText().then(function(value) {
        if (value !== 'Large Cap Core Test vs Russell 1000') {
          expect(false).customError('Header title did not displayed as "Large Cap Core Test vs ' + 'Russell 1000"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Storing row names for future use', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(cols) {
        arrGroupNames = cols;
      });
    });
  });

  describe('Test Step ID: 499768', function() {

    it('Should click on "Chart" icon from report', function() {
      var xpathOfChartIcon = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathChartIconFromReport, 'Weights');
      ThiefHelpers.getButtonClassReference(undefined, xpathOfChartIcon).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on Chart icon');
        CommonFunctions.takeScreenShot();
      });

      //Verifying chart menu drop down is appeared'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Chart menu drop down list did not display in "Weights" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Portfolio Weights" option to load from the wrench dropdown', function() {
      browser.wait(function() {
        return PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Portfolio Weights').isDisplayed().then(function(found) {
          return found;
        }, function() {
          return false;
        });
      }, 30000, 'Returns section was not expanded');
    });

    it('Should click on "Portfolio Weights" from wrench drop down', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Portfolio Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if report is converted in "Chart" mode', function() {
      PA3MainPage.isInChartFormat('Portfolio Weights').then(function(flag) {
        if (!flag) {
          expect(false).customError('Report did not convert in "Chart" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Wrench" button from the report', function() {
      PA3MainPage.selectWrenchIcon('Portfolio Weights');

      //Verifying menu drop down is appeared'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Menu drop down list did not display in "Weights" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Chart Type" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Chart Type').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Column" from the "Chart Type" drop down', function() {
      ThiefHelpers.getMenuClassReference(2).selectItemByText('Column').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if report is converted in "Chart" mode', function() {
      PA3MainPage.isInChartFormat('Port. Weight').then(function(flag) {
        if (!flag) {
          expect(false).customError('Report did not convert in "Chart" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Chart" is "Columns" chart', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(style) {
        if (style !== 'Columns') {
          expect(false).customError('"Chart" did not "Columns" chart; Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should perform right click on "blue" series in chart', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
    });

    it('Should hover on "Draw style" after perform right click', function() {
      browser.actions().mouseMove(ChartingUtilities.getOptionAfterRightClickOnChart('Draw style')).perform();

      // Wait to element appear
      browser.sleep(2000);
    });

    it('Verifying if "2D Column" is selected by default', function() {
      var xpathOf2DIconAfterRightClick = CommonFunctions.replaceStringInXpath(ChartingUtilities.xpathIconAfterRightClick, '2D Column');
      element(by.xpath(xpathOf2DIconAfterRightClick)).isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"2D Column" did not active by default');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 499769', function() {

    it('Should select on "3D Column" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('3D Column').click().then(function() {
      }, function(err) {

        expect(false).customError('Unable to click on "3D Column"' + err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Chart" is "3D Columns" chart', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(style) {
        if (style !== '3D Columns') {
          expect(false).customError('"Chart" did not "3D Columns" chart; Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 499770', function() {

    it('Should perform right click on "blue" series in chart', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
    });

    it('Should hover on "Draw style" after perform right click', function() {
      browser.actions().mouseMove(ChartingUtilities.getOptionAfterRightClickOnChart('Draw style')).perform();

      // Wait to element appear
      browser.sleep(2000);
    });

    it('Should select on "2D Column" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('2D Column').click().then(function() {
      }, function(err) {

        expect(false).customError('Unable to click on "2D Column"' + err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Chart" is "Columns" chart', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(style) {
        if (style !== 'Columns') {
          expect(false).customError('"Chart" did not "Columns" chart; Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Wrench" button from the application toolbar', function() {
      PA3MainPage.selectWrenchIcon('Port. Weight');

      //Verifying menu drop down is appeared'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Menu drop down list did not display in "Weights" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Change Series" option to load from the wrench dropdown', function() {
      browser.wait(function() {
        return PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Change Series').isDisplayed().then(function(found) {
          return found;
        }, function() {
          return false;
        });
      }, 30000, 'Returns section was not expanded');
    });

    it('Should click on "Change Series" from wrench drop down', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Change Series').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying "Change series" dialog is appeared', function() {
      ChangeSeries.getDialog('Change Series').isDisplayed().then(function(flag) {
        if (!flag) {
          expect(false).customError('Change Series dialog did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arr = ['Bench. Weight', 'Difference'];

    arr.forEach(function(item) {
      it('Should double click on "' + item + '" in "Available" section', function() {
        browser.actions().doubleClick(ChangeSeries.getElementFromAvailableSection(item)).perform();

        //Verify if item is added to the selected container
        ChangeSeries.getElementsFromSelectedSection(item).isPresent().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + item + '"did not present in the "Selected" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on chart toolbar wrench icon from "Port. Weight"', function() {
      PA3MainPage.selectWrenchIcon('Port. Weight');
    });

    it('Verifying if "Menu" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Menu" drop down did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Display Options" option to load from the wrench dropdown', function() {
      browser.wait(function() {
        return PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Display Options').isDisplayed().then(function(found) {
          return found;
        }, function() {
          return false;
        });
      }, 30000, 'Returns section was not expanded');
    });

    it('Should click on "Display Options" from wrench drop down', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Display Options').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Display Options" dialog is opened', function() {
      ChangeSeries.getDialog('Display Options').isDisplayed().then(function(flag) {
        if (!flag) {
          expect(false).customError('Display Options dialog did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Include Total" to check off', function() {
      ThiefHelpers.getCheckBoxClassReference('Include Total').check();

      // Verifying if "Include Total" check box is checked
      ThiefHelpers.getCheckBoxClassReference('Include Total').isChecked().then(function(isChecked) {
        if (!isChecked) {
          expect(false).customError('"Include Total" checkbox is un checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Left" radio button to select', function() {
      ThiefHelpers.getRadioClassReference('Left').select();

      // Verifying if "Left" radio button is selected
      ThiefHelpers.getRadioClassReference('Left').isSelected().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Left" radio button did not get select');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover on "blue" data series and verifying "Total" is displayed at first position in Chart', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Total') < 0) {
          expect(false).customError('"Total" did not display at first position in Chart');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 636163', function() {

    it('Should click on "Weights" report to close the Display drop down', function() {
      PA3MainPage.getReports('Weights').click();

      // Verifying if "Weights" report is highlighted
      PA3MainPage.getReports('Weights').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('Weights report did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arr = [];

    var hoverAndGetTooltip = function(i) {

      // Series 2 is working as Series 1
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2', i);
      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        arr.push(text);
      });
    };

    // "Electronic Technology" is dynamically changing, hence fetching the pixel dynamically.
    it('Fetching all the sectors tooltips in "Chart"', function() {
      ChartHelpers.getSeriesLength('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(seriesLength) {
        for (var i = 0; i < seriesLength; i++) {
          hoverAndGetTooltip(i);
        }
      });
    });

    it('Should double click on blue data series for "Electronic Technology"', function() {
      arr.forEach(function(text, index) {
        if (text.indexOf('Electronic Technology') >= 0) {

          // Series 2 is working as Series 1
          ChartHelpers.doubleClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2', index);
          browser.sleep(8000);
        }
      });
    });

    it('Verifying if Chart drills down to the next grouping level or header text is "Electronic Technology"', function() {
      ChartHelpers.getHeaderTextFromChart('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart', '3').then(function(text) {
        if (text !== 'Electronic Technology') {
          expect(false).customError('Header text did not "Electronic Technology"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "All Sectors" are not contain "Total" in blue data series', function() {
      var sectors = function() {
        browser.driver.executeScript(function() {
          return $('.tf-tooltip').find('div').text();
        }).then(function(text) {
          if (text.indexOf('Total') >= 0) {
            expect(false).customError('"All Sectors" contained "Total" value for blue data series');
            CommonFunctions.takeScreenShot();
          }
        });
      };

      ChartHelpers.getSeriesLength('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(numberOfSector) {
        for (var i = 0; i < numberOfSector; i++) {
          ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', i);
          sectors();
        }
      });
    });

    it('Verifying if "All Sectors" are not contain "Total" in green data series', function() {
      var sectors = function() {
        browser.driver.executeScript(function() {
          return $('.tf-tooltip').find('div').text();
        }).then(function(text) {
          if (text.indexOf('Total') >= 0) {
            expect(false).customError('"All Sectors" contained "Total" value for green data series');
            CommonFunctions.takeScreenShot();
          }
        });
      };

      ChartHelpers.getSeriesLength('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2').then(function(numberOfSector) {
        for (var i = 0; i < numberOfSector; i++) {
          ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2', i);
          sectors();
        }
      });
    });

    it('Verifying if "All Sectors" are not contain "Total" in maroon data series', function() {
      var sectors = function() {
        browser.driver.executeScript(function() {
          return $('.tf-tooltip').find('div').text();
        }).then(function(text) {
          if (text.indexOf('Total') >= 0) {
            expect(false).customError('"All Sectors" contained "Total" value for maroon data series');
            CommonFunctions.takeScreenShot();
          }
        });
      };

      ChartHelpers.getSeriesLength('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 3').then(function(numberOfSector) {
        for (var i = 0; i < numberOfSector; i++) {
          ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 3', i);
          sectors();
        }
      });
    });
  });

  describe('Test Step ID: 499775', function() {

    it('Should perform double click on "blank grid" in chart', function() {
      ChartHelpers.doubleClickOnPlot('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart', 1);
      browser.sleep(8000);
    });

    it('Should hover on "blue" data series and verifying series is contain "Total"', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        if (text.indexOf('Total') < 0) {
          expect(false).customError('Series did not contain "Total"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on chart toolbar wrench icon from "Port. Weight"', function() {
      PA3MainPage.selectWrenchIcon('Port. Weight');
    });

    it('Verifying if "Menu" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Menu" drop down did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Display Options" option to load from the wrench dropdown', function() {
      browser.wait(function() {
        return PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Display Options').isDisplayed().then(function(found) {
          return found;
        }, function() {
          return false;
        });
      }, 30000, 'Returns section was not expanded');
    });

    it('Should click on "Display Options" from wrench drop down', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Display Options').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Display Options" dialog is opened', function() {
      ChangeSeries.getDialog('Display Options').isDisplayed().then(function(flag) {
        if (!flag) {
          expect(false).customError('Display Options dialog did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Include Total" to uncheck', function() {
      ThiefHelpers.getCheckBoxClassReference('Include Total').uncheck();

      // Verifying if "Include Total" check box is unchecked
      ThiefHelpers.getCheckBoxClassReference('Include Total').isChecked().then(function(isChecked) {
        if (isChecked) {
          expect(false).customError('"Include Total" checkbox is checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "All Sectors" are not contain "Total" in blue data series', function() {
      var sectors = function() {
        browser.driver.executeScript(function() {
          return $('.tf-tooltip').find('div').text();
        }).then(function(text) {
          if (text.indexOf('Total') >= 0) {
            expect(false).customError('"All Sectors" contained "Total" for blue data series');
            CommonFunctions.takeScreenShot();
          }
        });
      };

      ChartHelpers.getSeriesLength('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(numberOfSector) {
        for (var i = 0; i < numberOfSector; i++) {
          ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', i);
          sectors();
        }
      });
    });

    it('Verifying if "All Sectors" are not contain "Total" in green data series', function() {
      var sectorTooltip = function() {
        browser.driver.executeScript(function() {
          return $('.tf-tooltip').find('div').text();
        }).then(function(text) {
          if (text.indexOf('Total') >= 0) {
            expect(false).customError('"All Sectors" contained "Total" for green data series');
            CommonFunctions.takeScreenShot();
          }
        });
      };

      ChartHelpers.getSeriesLength('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2').then(function(numberOfSector) {
        for (var i = 0; i < numberOfSector; i++) {
          ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2', i);
          sectorTooltip();
        }
      });
    });

    it('Verifying if "All Sectors" are not contain "Total" in maroon data series', function() {
      var sectorName = function() {
        browser.driver.executeScript(function() {
          return $('.tf-tooltip').find('div').text();
        }).then(function(text) {
          if (text.indexOf('Total') >= 0) {
            expect(false).customError('"All Sectors" contained "Total" for maroon data series');
            CommonFunctions.takeScreenShot();
          }
        });
      };

      ChartHelpers.getSeriesLength('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 3').then(function(numberOfSector) {
        for (var i = 0; i < numberOfSector; i++) {
          ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 3', i);
          sectorName();
        }
      });
    });
  });

  describe('Test Step ID: 499784', function() {

    it('Should click on "Display Values" drop down and select "Less than"', function() {
      ThiefHelpers.selectOptionFromDropDown('Less than', 'Display Values');
    });

    it('Verifying if Display Values drop down is set to "Less than"', function() {
      ThiefHelpers.verifySelectedDropDownText('Less than', 'Display Values');
    });

    it('Should enter "10" in the search field from Available section', function() {
      ThiefHelpers.getTextBoxClassReference('Values').setText('10');

      // Verifying that "10" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Values').getText().then(function(text) {
        if (text !== '10') {
          expect(false).customError('"10" did not type into the search field.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Based On:" drop down and select "Bench. Weight"', function() {
      ThiefHelpers.selectOptionFromDropDown('Bench. Weight', 'Based On:');
    });

    it('Verifying if Based On: drop down is set to "Bench. Weight"', function() {
      ThiefHelpers.verifySelectedDropDownText('Bench. Weight', 'Based On:');
    });

    it('Verifying if "All Sectors" are contain less than 10 value for blue data series on X axis', function() {
      var sectorName = function() {
        browser.driver.executeScript(function() {
          return $('.tf-tooltip').find('div').text();
        }).then(function(text) {
          var temp = text.split(' ');
          if (parseFloat(temp[6]) > 10) {
            expect(false).customError('"All Sectors" did not contain less than 10 value for blue data series');
            CommonFunctions.takeScreenShot();
          }
        });
      };

      ChartHelpers.getSeriesLength('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(numberOfSector) {
        for (var i = 0; i < numberOfSector; i++) {
          ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', i);
          sectorName();
        }
      });
    });

    it('Verifying if "All Sectors" are contain less than 10 value for blue data series on X axis', function() {
      var sectorName = function() {
        browser.driver.executeScript(function() {
          return $('.tf-tooltip').find('div').text();
        }).then(function(text) {
          var temp = text.split(' ');
          if (parseFloat(temp[6]) > 10) {
            expect(false).customError('"All Sectors" did not contain less than 10 value for green data series');
            CommonFunctions.takeScreenShot();
          }
        });
      };

      ChartHelpers.getSeriesLength('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2').then(function(numberOfSector) {
        for (var i = 0; i < numberOfSector; i++) {
          ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2', i);
          sectorName();
        }
      });
    });

    it('Verifying if "All Sectors" are contain less than 10 value for blue data series on X axis', function() {
      var sectorName = function() {
        browser.driver.executeScript(function() {
          return $('.tf-tooltip').find('div').text();
        }).then(function(text) {
          var temp = text.split(' ');
          if (parseFloat(temp[6]) > 10) {
            expect(false).customError('"All Sectors" did not contain less than 10 value for maroon data series');
            CommonFunctions.takeScreenShot();
          }
        });
      };

      ChartHelpers.getSeriesLength('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 3').then(function(numberOfSector) {
        for (var i = 0; i < numberOfSector; i++) {
          ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 3', i);
          sectorName();
        }
      });
    });
  });

  describe('Test Step ID: 499785', function() {

    it('Should click on the "Wrench" button from the report', function() {
      PA3MainPage.selectWrenchIcon('Port. Weight');

      //Verifying menu drop down is appeared'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Menu drop down list did not display in "Port. Weight" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Chart Type" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Chart Type').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Pie" from the "Chart Type" drop down', function() {
      ThiefHelpers.getMenuClassReference(2).selectItemByText('Pie').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if report is converted in "Chart" mode', function() {
      PA3MainPage.isInChartFormat('Port. Weight').then(function(flag) {
        if (!flag) {
          expect(false).customError('Report did not convert in "Chart" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Chart" is "3D Pie" chart', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(style) {
        if (style !== '3D Pie') {
          expect(false).customError('"Chart" did not "3D Pie" chart; Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover on any sector and verifying if sector name present with corresponding value', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        var temp = text.split(' ');
        if (text !== '') {
          arrGroupNames.forEach(function(securityName, index) {
            if ((text.indexOf(securityName) > -1)) {
              count = 1;
            }
          });
          if (count !== 1) {
            expect(false).customError('Sector name did not present with corresponding name. Found text:' + text);
            CommonFunctions.takeScreenShot();
          }

          if (parseFloat(temp[6]) < 0) {
            expect(false).customError('Sector name did not present with corresponding value');
            CommonFunctions.takeScreenShot();
          }
        } else {
          expect(false).customError('Found empty text');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 720217', function() {

    it('Should open PA3 Application with "Client:;Pa3;Charts;fixed_col_options', function() {

      PA3MainPage.launchHtmlDialogAndOpenDocument('fixed-col-options');
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

    var arrOptions = ['Column', 'Bar', 'Pie', 'Scatter', 'Bubble', 'Histogram', 'Heat Map', 'Geo Heat Map'];

    it('Should right click on "Port. Weight" in "Weights" report and hover on "Custom Charts" and verify if given' + 'options are present', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', 'Port. Weight', '').then(function(eleRef) {
        PA3MainPage.rightClickOnGivenElement(eleRef);
        browser.sleep(2000);

        // Hover mouse on "Custom Charts"
        browser.actions().mouseMove(PA3MainPage.getOptionAfterRightClickOnReport('Custom Charts')).perform();
        browser.sleep(3000);

        // Verifying if all Options are present
        arrOptions.forEach(function(val) {
          PA3MainPage.getOptionAfterRightClickOnReport(val).isPresent().then(function(present) {
            if (!present) {
              expect(false).customError('"' + val + '" is not present in "Custom Charts" drop down');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 720636', function() {

    it('Should click on "Column" from "Custom Charts" menu', function() {
      PA3MainPage.getOptionFromCustomMenu('Custom Charts|Column').click().then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if report is converted in "Chart" mode', function() {
      PA3MainPage.isInChartFormat('Port. Weight').then(function(flag) {
        if (!flag) {
          expect(false).customError('Report did not convert to "Chart" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Chart" is "Columns" chart', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(style) {
        if (style !== 'Columns') {
          expect(false).customError('"Columns" chart is not found; Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 720218', function() {

    it('Click on "Grid" icon in chart view', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Port. Weight').click();
    });

    it('Should wait for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 180000)).toBeTruthy();
    });

    it('Verifying if "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the web page.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Error found while calculating the "Weights" report' + error);
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should right click on "Bench. Weight" column under "19-SEP-2017" and select Column from Custom Charts menu', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', 'Bench. Weight', '19-SEP-2017').then(function(ref) {
        PA3MainPage.rightClickAndSelectOption(ref, 'Custom Charts|Column (time series)');
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if report is converted in "Chart" mode', function() {
      PA3MainPage.isInChartFormat('Bench. Weight').then(function(flag) {
        if (!flag) {
          expect(false).customError('Report did not convert in "Chart" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Chart" is "Columns" chart', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(style) {
        if (style !== 'Columns') {
          expect(false).customError('"Chart" did not "Columns" chart; Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should right click on Chart', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 1);
    });

    it('Should click on the "Change Series" from the menu list which appears after right click on chart', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Change Series').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for the "Change Series" dialog to appear', function() {
      browser.driver.wait(function() {
        return ChangeSeries.getDialog('Change Series').isDisplayed().then(function(isFound) {
          return isFound;
        }, function() {

          return false;
        });
      }, 5000, 'Change Series dialog not appeared even after waiting for 5 secons');
    });

    it('Verifying "Change series" dialog is appeared', function() {
      ChangeSeries.getDialog('Change Series').isDisplayed().then(function(flag) {
        if (!flag) {
          expect(false).customError('Change Series dialog did not appear');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Port. Weight" is not present in the Available section', function() {
      ChangeSeries.getElementFromAvailableSection('Port. Weight').isPresent().then(function(present) {
        if (present) {
          expect(false).customError('"Port. Weight" is present in the Available section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Bench. Weight" is displayed and grayed out in the Available section', function() {
      ChangeSeries.getElementFromAvailableSection('Bench. Weight').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Bench. Weight" is not present in the Available section');
          CommonFunctions.takeScreenShot();
        } else {
          ChangeSeries.getElementFromAvailableSection('Bench. Weight').getAttribute('class').then(function(value) {
            if (value.indexOf('disabled') < 0) {
              expect(false).customError('"Bench. Weight" is enabled in the Available section');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });
    });

    it('Verifying if "Difference" is displayed and enabled in the Available section', function() {
      ChangeSeries.getElementFromAvailableSection('Difference').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Difference" is not present in the Available section');
          CommonFunctions.takeScreenShot();
        } else {
          ChangeSeries.getElementFromAvailableSection('Difference').getAttribute('class').then(function(value) {
            if (value.indexOf('disabled') > -1) {
              expect(false).customError('"Difference" is not enabled in the Available section');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });
    });

    it('Verifying if "Bench. Weight" is present in the Available section', function() {
      ChangeSeries.getElementsFromSelectedSection('Bench. Weight').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Bench. Weight" is not present in the Available section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 721238', function() {

    it('Should open PA3 Application with "Client:;Pa3;charts;CHART_FACTOR_RETURNS', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('chart-factor-returns');
    });

    it('Verifying if "Factor Returns" report is displayed with two tiles', function() {
      PA3MainPage.getAllTilesFromReport().count().then(function(count) {
        if (count !== 2) {
          expect(false).customError('"Factor Returns" report is not displayed two tiles');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var xpathVirtualListbox = element.all(by.xpath('//tf-virtual-listbox')).first();

    it('Should select "Value" factor from "Value" group from Interactive pane', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathVirtualListbox).getGroupByText('Value');
      group.getItemByText('Value').then(function(item) {
        item.select();

        // Verifying if Value is selected from interative pane
        item.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Value" is not selected from interactive pane');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      // Wait for chart to appear
      browser.sleep(2000);
    });

    it('Verifying if "Value" legend is present in the "Factor Returns" chart', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(arrLegends) {
        if (arrLegends[0] !== 'Value') {
          expect(false).customError('"Value" legend is not present in chart, found: ' + arrLegends);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if Line chart appears in workspace', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(chartName) {
        if (chartName !== 'Line') {
          expect(false).customError('Line chart is not appeared in work space. Found:"' + chartName + '" chart.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
