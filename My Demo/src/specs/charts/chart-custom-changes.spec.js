'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: chart-custom-changes', function() {

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  describe('Test Step ID: 478427', function() {

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

  });

  describe('Test Step ID: 478428', function() {

    it('Should right click on "Port. Weight" column and select Column from Custom Charts menu', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', 'Port. Weight').then(function(ref) {
        PA3MainPage.rightClickAndSelectOption(ref, 'Custom Charts|Column');
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

    it('Should hover on "Show Series Y-Axis" after perform right click', function() {
      browser.actions().mouseMove(ChartingUtilities.getOptionAfterRightClickOnChart('Show Series Y-Axis')).perform();

      // Wait to element appear
      browser.sleep(2000);
    });

    var options = ['On Left', 'On Right', 'On Both', 'On Neither'];

    options.forEach(function(option) {
      it('Verifying if "' + option + '" is displayed after hover mouse', function() {
        ChartingUtilities.getOptionAfterRightClickOnChart(option).isPresent().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + option + '" did not present in drop down');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "On Right" is selected by default', function() {
      var xpathOf2DIconAfterRightClick = CommonFunctions.replaceStringInXpath(ChartingUtilities.xpathIconAfterRightClick, 'On Right');
      element(by.xpath(xpathOf2DIconAfterRightClick)).isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"On Right" did not active by default');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 478429', function() {

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

    it('Should select "Change Series" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Change Series').then(function() {
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

    it('Should click on "+" icon next to the "Available" section', function() {
      ThiefHelpers.getButtonClassReference(undefined, ChangeSeries.xpathPlusSign).press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile-Options" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (!option) {
          expect(false).customError('"Tile Options" mode did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from the LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Columns" is selected in LHP
      TileOptions.getLHPOption('Columns').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Columns" did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "earnings" in the search field from Available section', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('earnings');

      // Verifying that "earnings" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== 'earnings') {
          expect(false).customError('"earnings" is not typed into the search field.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the Search Result to appear
      browser.sleep(4000);
    });

    it('Should double click on "Price to Earnings using FY1 Est" from Available section', function() {
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Price to Earnings using FY1 Est').then(function(item) {
        item.select();
        item.doubleClick();
      });

      // Verifying if 'Price to Earnings using FY1 Est' is added to selected section
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Price to Earnings using FY1 Est') === -1) {
          expect(false).customError('"Price to Earnings using FY1 Est" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Price to Earnings using FY1 Est" is highlighted in Selected section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Price to Earnings using FY1 Est').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Ticker" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on up arrow button in Decimal spinner info box and set value as 2', function() {
      TileOptionsColumns.setOrGetValueInSpinBox('Decimals', '2', false, true);
    });

    it('Verifying the value to "2" in decimal drop down', function() {
      ThiefHelpers.getTextBoxClassReference('Decimals').getText().then(function(value) {
        if (value !== '2') {
          expect(false).customError('value not equal to "2" in decimal drop down');
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

    it('Should wait for "Weight" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if "Calculation Error" error dialog is not present', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });
      browser.sleep(5000);
    });

    it('Verifying if Series 1 color is blue', function() {
      ChartHelpers.getSeriesColor('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 'Background').then(function(color) {
        if (color !== '#00aeef') {
          expect(false).customError('Series did not in blue color; Found: ' + color);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if Series 2 color is green', function() {
      ChartHelpers.getSeriesColor('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2', 'Background').then(function(color) {
        if (color !== '#99cc33') {
          expect(false).customError('Series did not in blue color; Found: ' + color);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arr = ['Port. Weight', 'Price to Earnings using FY1 Est'];

    arr.forEach(function(legend) {
      it('Verifying if "' + legend + '" is display as legend in chart', function() {
        ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
          if (val.indexOf(legend) < 0) {
            expect(false).customError('"' + legend + '" did not display as Legend');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying only 2 legend are displayed in column chart', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.length !== 2) {
          expect(false).customError('More than 2 legends are displayed in column chart');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 478430', function() {

    it('Should right click on "Y" axis', function() {
      Utilities.scrollElementToVisibility(PA3MainPage.getWrenchIcon());
      ChartHelpers.rightClickOnXorYAxisLabel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y');
    });

    it('Should select "Show axis label" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Show axis label').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should right click on "Y" axis', function() {
      ChartHelpers.rightClickOnXorYAxisTitle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y');
    });

    it('Should select "Format..." from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Format...').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
      browser.sleep(4000);
    });

    it('Verifying if "Chart: Y Axis Title" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Chart: Y Axis Title" drop down did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "Y-Axis" in the Axis Title text box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, ChartingUtilities.axisTitleXpath).setText('Y-Axis');

      // Verifying that "Y-Axis" is typed into the search box
      ThiefHelpers.getTextBoxClassReference(undefined, ChartingUtilities.axisTitleXpath).getText().then(function(text) {
        if (text !== 'Y-Axis') {
          expect(false).customError('"Y-Axis" did not type in Axix Title text box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Bold" icon from the Y Axis drop drop down', function() {
      ChartingUtilities.getBoldItalicUnderlineButton('Bold').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Close" button from Y Axis drop down', function() {
      ThiefHelpers.getButtonClassReference('Close').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Close" button from Y Axis drop down');
        CommonFunctions.takeScreenShot();
      });
      browser.sleep(4000);
    });

    it('Should perform right click on "blue" series in chart', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
    });

    it('Should hover on "Show Series Y-Axis" after perform right click', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Show Series Y-Axis').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "On Second Right" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('On Second Right').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    var seriesName = ['Series 1', 'Series 2'];
    var postions = ['Second Right', 'Right'];

    seriesName.forEach(function(series, index) {
      it('Verifying if "' + series + '" display in "' + postions[index] + '" position', function() {
        ChartHelpers.getYAxisPosition('.pa-chart-non-formatting-mode', '$fdsChartController', series).then(function(value) {
          if (value !== postions[index]) {
            expect(false).customError('"' + series + '" did not display at "' + postions[index] + '" postion; Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if Two axis display in Right side', function() {
      if (postions[0] === postions[1]) {
        expect(false).customError('Two axis did not display at Right side');
      }
    });

    it('Verifying if "Y" axis title text is "Y-Axis"', function() {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y', 'TitleText')
        .then(function(text) {
          if (text !== 'Y-Axis') {
            expect(false).customError('"Y" axis title did not match with "Y-Axis"; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying if "Y-Axis" is in Bold', function() {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y', 'TitleFontWeight')
        .then(function(text) {
          if (text !== 700) {
            expect(false).customError('"Y" axis title did not in Bold; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying if for first Y axis title is not displayed', function() {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y', 'Title', 2)
        .then(function(flag) {
          if (flag) {
            expect(false).customError('For first Y axis Title displayed');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying if for second Y axis title is displayed', function() {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y', 'Title')
        .then(function(flag) {
          if (!flag) {
            expect(false).customError('For second Y axis Title did not displayed');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should perform right click on "green" series in chart', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2');
    });

    it('Should hover on "Show Series Y-Axis" after perform right click', function() {
      browser.actions().mouseMove(ChartingUtilities.getOptionAfterRightClickOnChart('Show Series Y-Axis')).perform();

      // Wait to element appear
      browser.sleep(2000);
    });

    var options = ['On Left', 'On Right', 'On Both', 'On Neither', 'On Second Right'];

    options.forEach(function(option) {
      it('Verifying if "' + option + '" is displayed after hover mouse', function() {
        ChartingUtilities.getOptionAfterRightClickOnChart(option).isPresent().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + option + '" did not present in drop down');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "On Right" is selected by default', function() {
      var xpathOf2DIconAfterRightClick = CommonFunctions.replaceStringInXpath(ChartingUtilities.xpathIconAfterRightClick, 'On Right');
      element(by.xpath(xpathOf2DIconAfterRightClick)).isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"On Right" did not active by default');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 559962', function() {

    it('Should select "On Left" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('On Left').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    var seriesName = ['Series 1', 'Series 2'];
    var postions = ['Second Right', 'Left'];

    seriesName.forEach(function(series, index) {
      it('Verifying if "' + series + '" display in "' + postions[index] + '" position', function() {
        ChartHelpers.getYAxisPosition('.pa-chart-non-formatting-mode', '$fdsChartController', series).then(function(value) {
          if (value !== postions[index]) {
            expect(false).customError('"' + series + '" did not display at "' + postions[index] + '" postion; Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should perform right click on "blue" series in chart', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
    });

    it('Should hover on "Show Series Y-Axis" after perform right click', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Show Series Y-Axis').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should hover on "Show Series Y-Axis" after perform right click', function() {
      browser.actions().mouseMove(ChartingUtilities.getOptionAfterRightClickOnChart('Show Series Y-Axis')).perform();

      // Wait to element appear
      browser.sleep(2000);
    });

    var options = ['On Left', 'On Right', 'On Both', 'On Neither', 'On Second Left', 'On Second Right'];

    options.forEach(function(option) {
      it('Verifying if "' + option + '" is displayed after hover mouse', function() {
        ChartingUtilities.getOptionAfterRightClickOnChart(option).isPresent().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + option + '" did not present in drop down');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "On Second Right" is selected by default', function() {
      var xpathOf2DIconAfterRightClick = CommonFunctions.replaceStringInXpath(ChartingUtilities.xpathIconAfterRightClick, 'On Second Right');
      element(by.xpath(xpathOf2DIconAfterRightClick)).isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"On Second Right" did not active by default');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 559963', function() {

    it('Should select "On Second Left" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('On Second Left').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Should perform right click on "green" series in chart', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2');
    });

    it('Should hover on "Show Series Y-Axis" after perform right click', function() {
      browser.actions().mouseMove(ChartingUtilities.getOptionAfterRightClickOnChart('Show Series Y-Axis')).perform();

      // Wait to element appear
      browser.sleep(2000);
    });

    it('Should select "On Second Left" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('On Second Left').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    var seriesName = ['Series 1', 'Series 2'];
    var postions = ['Second Left', 'Second Left'];

    seriesName.forEach(function(series, index) {

      it('Verifying if "' + series + '" display in "' + postions[index] + '" position', function() {
        ChartHelpers.getYAxisPosition('.pa-chart-non-formatting-mode', '$fdsChartController', series).then(function(value) {
          if (value !== postions[index]) {
            expect(false).customError('"' + series + '" did not display at "' + postions[index] + '" postion; Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if Only one axis display in Left side', function() {
      if (postions[0] !== postions[1]) {
        expect(false).customError('Only one axis did not display at Left side');
      }
    });

  });

  describe('Test Step ID: 559964', function() {

    it('Should perform right click on "green" series in chart', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 2');
    });

    it('Should hover on "Show Series Y-Axis" after perform right click', function() {
      browser.actions().mouseMove(ChartingUtilities.getOptionAfterRightClickOnChart('Show Series Y-Axis')).perform();

      // Wait to element appear
      browser.sleep(2000);
    });

    it('Should select "On Both" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('On Both').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    var seriesName = ['Series 1', 'Series 2'];
    var postions = ['Second Left', 'Both'];

    seriesName.forEach(function(series, index) {

      it('Verifying if "' + series + '" display in "' + postions[index] + '" position', function() {
        ChartHelpers.getYAxisPosition('.pa-chart-non-formatting-mode', '$fdsChartController', series).then(function(value) {
          if (value !== postions[index]) {
            expect(false).customError('"' + series + '" did not display at "' + postions[index] + '" postion; Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if axis displayed in both side', function() {
      if (postions[0] === postions[1]) {
        expect(false).customError('Axis did not display both postion');
      }
    });

  });

  describe('Test Step ID: 559965', function() {

    it('Should perform right click on "blue" series in chart', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
    });

    it('Should hover on "Show Series Y-Axis" after perform right click', function() {
      browser.actions().mouseMove(ChartingUtilities.getOptionAfterRightClickOnChart('Show Series Y-Axis')).perform();

      // Wait to element appear
      browser.sleep(2000);
    });

    it('Should select "On Neither" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('On Neither').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    var seriesName = ['Series 1', 'Series 2'];
    var postions = ['Neither', 'Both'];

    seriesName.forEach(function(series, index) {

      it('Verifying if "' + series + '" display in "' + postions[index] + '" position', function() {
        ChartHelpers.getYAxisPosition('.pa-chart-non-formatting-mode', '$fdsChartController', series).then(function(value) {
          if (value !== postions[index]) {
            expect(false).customError('"' + series + '" did not display at "' + postions[index] + '" postion; Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if axis displayed in both side', function() {
      if (postions[0] === postions[1]) {
        expect(false).customError('Axis did not display both postion');
      }
    });

  });

  describe('Test Step ID: 559967', function() {

    it('Should click on "Grid" icon in the report', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Port. Weight').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Verifying if "Chart has changed" dialog is opened', function() {
      ThiefHelpers.isDialogOpen('Chart has changed').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Chart has changed" dialog did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save Changes" from the "Chart has changed" dialog', function() {
      ThiefHelpers.getDialogButton('Chart has changed', 'Save Changes').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

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

    it('Verifying if "Price to Earnings using FY1 Est" column added in the reports', function() {
      SlickGridFunctions.getColumnNames('Weights').then(function(allColumnName) {
        if (allColumnName.indexOf('Price to Earnings using FY1 Est') < 0) {
          expect(false).customError('"Price to Earnings using FY1 Est" did not present in the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 644828', function() {

    var labelsValuesForYAxis = [];

    it('Should right click on "Price to Earnings using FY1 Est" column and select Bar from Custom Charts menu', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', 'Price to Earnings using FY1 Est').then(function(ref) {
        PA3MainPage.rightClickAndSelectOption(ref, 'Custom Charts|Bar');
      });
    });

    it('Verifying if report is converted in "Chart" mode', function() {
      PA3MainPage.isInChartFormat('Price to Earnings using FY1 Est').then(function(flag) {
        if (!flag) {
          expect(false).customError('Report did not convert in "Chart" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Chart" is "Bars" chart', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(style) {
        if (style !== 'Bars') {
          expect(false).customError('"Chart" did not "Columns" chart; Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Copying Y axis labels value', function() {
      ChartHelpers.getXorYAxisLabels('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y').then(function(labels) {
        labels.forEach(function(text) {
          labelsValuesForYAxis.push(text);
        });
      });
    });

    it('Should click on "wrench" icon in the report', function() {
      PA3MainPage.selectWrenchIcon('Price to Earnings using FY1 Est');
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

    it('Verifying if "Tile Option" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Tile Option" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from the LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Columns" is selected in LHP
      TileOptions.getLHPOption('Columns').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Columns" did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on"Price to Earnings using FY1 Est" in Selected section to highlight', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Price to Earnings using FY1 Est').select();

      // Verify if 'Price to Earnings using FY1 Est' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Price to Earnings using FY1 Est').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Price to Earnings using FY1 Est" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on up arrow button in Decimal spinner info box and set value as 6', function() {
      TileOptionsColumns.setOrGetValueInSpinBox('Decimals', '6', false, true);
    });

    it('Verifying the value to "2" in decimal drop down', function() {
      ThiefHelpers.getTextBoxClassReference('Decimals').getText().then(function(value) {
        if (value !== '6') {
          expect(false).customError('value not equal to "6" in decimal drop down');
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

    it('Should wait for "Weight" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if "Calculation Error" error dialog is not present', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });
      browser.sleep(5000);
    });

    it('Verifying if "Y" axis value is same as copied value', function() {
      ChartHelpers.getXorYAxisLabels('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y').then(function(labels) {
        labels.forEach(function(text, index) {
          if (text !== labelsValuesForYAxis[index]) {
            expect(false).customError('Y axis value did not same as copied value; Expect "' + labelsValuesForYAxis[index] + '"; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });

      });
    });

  });

});
