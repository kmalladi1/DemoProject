'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: chart-sgstd-report-toggle', function() {

  var xpathDeleteDialog = '//tf-dialog//tf-dialog-wrap';

  describe('Test Step ID: 503876', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

    it('Verifying if calculated data for "Weights" report is not appeared', function() {
      // Verifying that the "Weights" reports calculated
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (option) {
          expect(false).customError('Calculated data for "Weights" report appeared on web page');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'NoSuchElementError') {
          expect(true).customError('');
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

  describe('Test Step ID: 503877', function() {

    it('Should type "CLIENT:/NEW_PA_TEST_SUITE/PRICING/SPN_SP50_ACCT.ACCT" in "Portfolio" widget and hit Enter key.', function() {
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).setText('CLIENT:/NEW_PA_TEST_SUITE/PRICING/SPN_SP50_ACCT.ACCT');

      // Verifying that "CLIENT:/NEW_PA_TEST_SUITE/PRICING/SPN_SP50_ACCT.ACCT" is typed into the portfolio widget
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).getText().then(function(text) {
        if (text !== 'CLIENT:/NEW_PA_TEST_SUITE/PRICING/SPN_SP50_ACCT.ACCT') {
          expect(false).customError('"CLIENT:/NEW_PA_TEST_SUITE/PRICING/SPN_SP50_ACCT.ACCT" is not entered in ' + '"Portfolio" widget.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "RUSSELL:1000" in "Benchmark" widget and hit Enter key.', function() {
      ThiefHelpers.getTextBoxClassReference('Benchmark', PA3MainPage.xpathBenchmarkWidget).setText('RUSSELL:1000');

      // Verifying that "RUSSELL:1000" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Benchmark', PA3MainPage.xpathBenchmarkWidget).getText().then(function(text) {
        if (text !== 'RUSSELL:1000') {
          expect(false).customError('"RUSSELL:1000" is not entered in "Benchmark" widget.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(found) {
        if (!found) {
          expect(false).customError('"Weights" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
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

    it('Should click "Attribution" report from LHP', function() {
      PA3MainPage.getReports('Attribution').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Attribution is selected in LHP
      PA3MainPage.getReports('Attribution').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Attribution" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Attribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(found) {
        if (!found) {
          expect(false).customError('"Attribution" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
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
  });

  describe('Test Step ID: 503878', function() {

    // Closing Qa info box as it hides chart icon in the report
    it('Should close QAinfobox', function() {
      PA3MainPage.closeQAInfoBox();
    });

    ChartingUtilities.selectChartFromReport('Attribution', 'Multi-Horizon Returns');

    it('Verifying if "Multi-Horizon Returns" Chart is displayed', function() {
      PA3MainPage.isInChartFormat('Multi-Horizon Returns').then(function(option) {
        if (option !== true) {
          expect(false).customError('"Multi-Horizon Returns" chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 503885', function() {

    it('Should click on "wrench" icon in the report', function() {
      PA3MainPage.selectWrenchIcon('Multi-Horizon Returns');
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

    it('Verifying if the "Dates" tab is selected in LHP', function() {
      // Verifying that 'Dates' is selected in LHP
      TileOptions.getLHPOption('Dates').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Dates" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });

      // Checking if 'Dates' item is opened.
      TileOptions.getOptionTitle().getText().then(function(text) {
        if (text.indexOf('Dates') < 0) {
          expect(false).customError('"Dates" tile did not get opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Tile Option" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Tile Option" page is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Start Date" dropdown', function() {
      TileOptionsDates.getDateDropDown('Start Date').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "End of Last Year" from the Start Date dropdown', function() {
      TileOptionsDates.getOptionFromDateDropDown('End of Last Year').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "End of Last Year" is set in Start Date input box
      ThiefHelpers.getTextBoxClassReference('Start Date:').getText().then(function(text) {
        if (text !== 'End of Last Year') {
          expect(false).customError('"End of Last Year" is not set in "Start Date" input box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options" page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait for "Multi-Horizon Returns" chart to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if "Multi-Horizon Returns" Chart is displayed', function() {
      PA3MainPage.isInChartFormat('Multi-Horizon Returns').then(function(option) {
        if (option !== true) {
          expect(false).customError('"Multi-Horizon Returns" chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hold "CONTROL" key and select "Health Services" and "Communications" groups from Interactive pane', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference();
      group.getGroupByText('Health Services').select();
      group.getGroupByText('Communications').select(true);
    });

    it('Should click on grid icon in the "Multi-Horizon Returns" chart', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Multi-Horizon Returns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Chart has changed" dialog box is not appeared', function() {
      ThiefHelpers.isDialogOpen('Chart has changed').then(function(flag) {
        if (flag) {
          expect(false).customError('"Chart has changed" dialog box is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Attribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(found) {
        if (!found) {
          expect(false).customError('"Attribution" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
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
  });

  describe('Test Step ID: 503886', function() {

    ChartingUtilities.selectChartFromReport('Attribution', 'Multi-Horizon Returns');

    it('Should click on "wrench" icon in the report', function() {
      PA3MainPage.selectWrenchIcon('Multi-Horizon Returns');
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

    it('Should click on "Columns" tab from LHP to select', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that 'Columns' is selected in LHP
      TileOptions.getLHPOption('Columns').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Columns" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });

      // Checking if 'Columns' item is opened.
      TileOptions.getOptionTitle().getText().then(function(text) {
        if (text.indexOf('Columns') < 0) {
          expect(false).customError('"Columns" tile did not get opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "Bench" into the "Search" field of "Available" section', function() {
      TileOptionsColumns.setSearchKeyword('Bench');
    });

    it('Should double click on "Bench. Total Return" from search result', function() {
      var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Bench. Total Return').then(function(item) {
        item.select();
        item.doubleClick();
      });
    });

    it('Verifying if "Bench. Total Return" is added to selected section', function() {
      TileOptionsColumns.getSelectedSectionElement('Bench. Total Return').isPresent().then(function(added) {
        if (!added) {
          expect(false).customError('"Bench. Total Return" did not get added to the "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options" page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait for "Multi-Horizon Returns" chart to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if "Multi-Horizon Returns" Chart is displayed', function() {
      PA3MainPage.isInChartFormat('Multi-Horizon Returns').then(function(option) {
        if (option !== true) {
          expect(false).customError('"Multi-Horizon Returns" chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var legends = ['Port. Total Return - Health Services', 'Port. Total Return - Communications', 'Bench. Total Return - Health Services', 'Bench. Total Return - Communications'];

    legends.forEach(function(value, index) {

      it('Verifying if "' + value + '" legend is present in the "Multi-Horizon Returns" chart', function() {
        ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(arrLegends) {
          if (value !== arrLegends[index]) {
            expect(false).customError('"' + value + '"legend is not present in chart, found: ' + arrLegends[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if only four options are present as legends', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(arrLegends) {
        if (arrLegends.length !== 4) {
          expect(false).customError('Four options are not present as legends, found :' + arrLegends.length);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 503889', function() {

    var fillStyleXpath = CommonFunctions.replaceStringInXpath(ChartingUtilities.xpathStyleDropdown, 'Fill Style');

    it('Should "right" click on chart(white) area', function() {
      browser.executeScript(function() {
        var chartObject = $('.pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart;

        // Fetching pixel co-ordinates of the plot.
        var p = chartObject.queryPlotPixel('Chart', 1);

        // Right clicking on specified pixel.
        chartObject.rightClickOnPixel(p.x, p.y);
      }).then(function() {
      });
    });

    it('Should select on the "Format" from the menu list', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Format...').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the "Chart: Backgrounds & Borders" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('"Chart: Backgrounds & Borders" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Fill Style" drop down in the "Chart: Backgrounds & Borders"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, fillStyleXpath).open();
    });

    it('Should select "Hatch" from the drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, fillStyleXpath).selectItemByText('Hatch');
    });

    it('Verifying if "Hatch" is selected in the drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, fillStyleXpath).getSelectedText().then(function(text) {
        if (text !== 'Hatch') {
          expect(false).customError('"Hatch" is not selected in the drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Color Picker" drop down', function() {
      ChartingUtilities.getColorPickerButton('Fill Style').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Pink" from the color picker', function() {
      ChartingUtilities.selectColorFrmDD('rgb(255, 0, 255)');
    });

    it('Should click "Close" button from the "Chart: Backgrounds & Borders" drop down', function() {
      ThiefHelpers.getButtonClassReference('Close').press();

      // Verifying if drop down closed
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (isOpen) {
          expect(false).customError('"Chart: Backgrounds & Borders" drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Background Style" of the chart is "Hatch" style', function() {
      browser.driver.wait(function() {
        return browser.executeScript(function() {
          var chartObject = $('.pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart;

          // Fetching Plot background style
          var BGstyle = chartObject.getObjectById('Chart').getAttribute('PlotBGStyle');
          if (BGstyle === 2) {
            return true;
          }
        }, function() {
          return false;
        });
      }, 5000, '"Background Style" of the chart is not "Hatch" style');
      CommonFunctions.captureScreenShot();
    });

    it('Verifying if the "Background Color" of the chart is in pink', function() {
      browser.executeScript(function() {
        var chartObject = $('.pa-chart-non-formatting-mode').data('$fdsChartController').fdsChart;

        // Fetching Plot background style
        var style = chartObject.getObjectById('Chart').getAttribute('PlotBGColor');
        return style;
      }).then(function(backgroundStyle) {
        if (backgroundStyle !== 16711935) {
          expect(false).customError('"Background Color" of the chart is not in pink');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 503895', function() {

    it('Should click on "Wrench" icon in the report', function() {
      PA3MainPage.selectWrenchIcon('Multi-Horizon Returns');
    });

    it('Verifying if the "wrench" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Wrench" drop down did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Line" from the "Chart Type" drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Chart Type|Line').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Port. Total Return" Chart is displayed', function() {
      PA3MainPage.isInChartFormat('Port. Total Return').then(function(option) {
        if (option !== true) {
          expect(false).customError('"Port. Total Return" chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should right click on "X-axis"', function() {
      ChartHelpers.rightClickOnXorYAxisLabel('.pa-chart-non-formatting-mode', '$fdsChartController', 'X');
    });

    it('Should select "Show axis label" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Show axis label').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should right click on "X" in "X-axis"', function() {
      ChartHelpers.rightClickOnXorYAxisTitle('.pa-chart-non-formatting-mode', '$fdsChartController', 'X');
    });

    it('Should select on the "Format" from the menu list', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Format...').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should enter "Test" in "Axis Title" text box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, ChartingUtilities.axisTitleXpath).setText('Test');

      // Verifying that "Test" is entered into the search box
      ThiefHelpers.getTextBoxClassReference(undefined, ChartingUtilities.axisTitleXpath).getText().then(function(text) {
        if (text !== 'Test') {
          expect(false).customError('Axis Title text box is not set to "Test"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var fontStyle = CommonFunctions.replaceStringInXpath(ChartingUtilities.xpathStyleDropdown, 'Font');

    it('Should click on "Font" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, fontStyle).open();
    });

    it('Should select "Georgia" from the drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, fontStyle).selectItemByText('Georgia');
    });

    it('Verifying if "Georgia" is selected in the drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, fontStyle).getSelectedText().then(function(text) {
        if (text !== 'Georgia') {
          expect(false).customError('"Georgia" is not selected in the drop down; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Font Size" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, ChartingUtilities.xpathFontSizeDropDown).open();
    });

    it('Should select "24" from the drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, ChartingUtilities.xpathFontSizeDropDown).selectItemByText('24');
    });

    it('Verifying if "24" is selected in the "Font Size" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, ChartingUtilities.xpathFontSizeDropDown).getSelectedText().then(function(text) {
        if (text !== '24') {
          expect(false).customError('"24" is not selected in the "Font Size" drop down; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Color Picker" drop down', function() {
      ChartingUtilities.getColorPickerButton().press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Pink" from the color picker', function() {
      ChartingUtilities.selectColorFrmDD('rgb(255, 0, 255)');
    });

    it('Should click "Close" button from the "Chart: X Axis Title" drop down', function() {
      ThiefHelpers.getButtonClassReference('Close').press();

      // Verifying if drop down closed
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (isOpen) {
          expect(false).customError('"Chart: X Axis Title" drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on grid icon in the "Port. Total Return" chart', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Port. Total Return').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Chart has changed" dialog box appears', function() {
      ThiefHelpers.isDialogOpen('Chart has changed').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Chart has changed" dialog box is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Chart has changed" dialog box displays "Do you want to save your changes as a custom chart?"', function() {
      ThiefHelpers.getDialogClassReference('Chart has changed').getContent().getText().then(function(content) {
        if (content.indexOf('Do you want to save your changes as a custom chart?') < 0) {
          expect(false).customError('"Chart has changed" dialog box did not display "Do you want to save your changes as a custom chart?"; Found: ' + content);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 503896', function() {

    it('Should remove "Port. TotalReturn" from the text box and enter "Multi"', function() {
      ThiefHelpers.getTextBoxClassReference('Chart Name').setText('Multi');

      // Verifying that "Multi" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Chart Name').getText().then(function(text) {
        if (text !== 'Multi') {
          expect(false).customError('"Chart Name" text box is not set to "Multi"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save Changes" button', function() {
      ThiefHelpers.getDialogButton('Chart has changed', 'Save Changes').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the "Chart has changed" dialog is closed', function() {
      ThiefHelpers.isDialogOpen('Chart has changed').then(function(flag) {
        if (flag) {
          expect(false).customError('"Chart has changed" dialog box is not closed even after clicking ' + 'on "Save Changes" button.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Attribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(found) {
        if (!found) {
          expect(false).customError('"Attribution" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
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

    it('Should click on the "Chart" icon in the "Attribution" report', function() {
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Attribution').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying Chart Icon menu is displayed
      ThiefHelpers.isDropDownOpen().then(function(option) {
        if (!option) {
          expect(false).customError('Chart Icon menu is not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Multi" chart is displayed under chart menu', function() {
      PA3MainPage.getOptionFromWrenchMenu('Multi').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Multi" chart is not displayed under chart menu');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 504645', function() {

    it('Should hover over "Multi" from drop down and select sub-menu "Select…"', function() {
      PA3MainPage.getOptionFromWrenchMenu('Multi|Select…').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait for "Multi" chart to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000);
    });

    it('Verifying if "Multi" Chart is displayed', function() {
      PA3MainPage.isInChartFormat('Multi').then(function(option) {
        if (option !== true) {
          expect(false).customError('"Multi" chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var legends = ['Port. Total Return - Health Services', 'Port. Total Return - Communications', 'Bench. Total Return - Health Services', 'Bench. Total Return - Communications'];

    legends.forEach(function(value, index) {

      it('Verifying if "' + value + '" legend is present in the "Multi-Horizon Returns" chart', function() {
        ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(arrLegends) {
          if (value !== arrLegends[index]) {
            expect(false).customError('"' + value + '"legend is not present in chart, found: ' + arrLegends[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if only four options are present as legends', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(arrLegends) {
        if (arrLegends.length !== 4) {
          expect(false).customError('Four options are not present as legends, found :' + arrLegends.length);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 504649', function() {

    it('Should click on grid icon in the "Multi" chart', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Multi').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Attribution" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(found) {
        if (!found) {
          expect(false).customError('"Attribution" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
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

    ChartingUtilities.selectChartFromReport('Attribution', 'Multi|Remove');

    // Known Issue: RPD:24119143 dialog name is not displayed
    it('Verifying if "Delete Chart" dialog is displayed', function() {
      ThiefHelpers.isDialogOpen(undefined, undefined, xpathDeleteDialog).then(function(flag) {
        if (!flag) {
          expect(false).customError('Known Issue: RPD:24119143: "Delete Chart" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Known Issue: RPD:24119143 dialog name is not displayed
    it('Verifying if "Are you sure you want to delete Multi?" is displayed in "Delete Chart" dialog', function() {
      ThiefHelpers.getDialogClassReference(undefined, undefined, xpathDeleteDialog).getContent().getText().then(function(content) {
        if (content !== 'Are you sure you want to delete Multi?') {
          expect(false).customError('Known Issue: RPD:24119143: "Are you sure you want to delete Multi?" is not displayed in ' + '"Delete Chart" dialog; Found: ' + content);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 504660', function() {

    it('Should click on "Delete" button in "Delete Chart" dialog', function() {
      ThiefHelpers.getButtonClassReference('Delete').press();
    });

    it('Should click on the "Chart" icon in the "Attribution" report', function() {
      PA3MainPage.getChartMenuButtonFromReportWorkspace('Attribution').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying Chart Icon menu is displayed
      ThiefHelpers.isDropDownOpen().then(function(option) {
        if (!option) {
          expect(false).customError('Chart Icon menu is not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Multi" chart is not displayed under chart menu', function() {
      PA3MainPage.getOptionFromWrenchMenu('Multi').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Multi" chart is displayed under chart menu');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 506251', function() {

    it('Should select "Weights" from the LHP', function() {
      PA3MainPage.getReports('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait for "Weights" chart to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000);
    });

    it('Verify that "Weights" report is calculated', function() {
      // Verifying if Weights report is calculated
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        }
      });

      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(present) {
        expect(!present).customError('"Calculation Error" dialog box is seen while report calculation.');
        if (present) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Weights" report is selected in LHP', function() {
      PA3MainPage.getReports('Weights').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Weights" is not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    ChartingUtilities.selectChartFromReport('Weights', 'Portfolio Weights');

    it('Verifying if "Portfolio Weights" Chart is displayed', function() {
      PA3MainPage.isInChartFormat('Portfolio Weights').then(function(option) {
        if (option !== true) {
          expect(false).customError('"Portfolio Weights" chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 506252', function() {

    it('Should click on "wrench" icon in the report', function() {
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

    it('Should select "Options" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Dates" tab is selected in LHP', function() {

      // Verifying that Dates is selected in LHP
      TileOptions.getLHPOption('Dates').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Dates" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });

      // Checking if 'Dates' item is opened.
      TileOptions.getOptionTitle().getText().then(function(text) {
        if (text.indexOf('Dates') < 0) {
          expect(false).customError('"Dates" tile did not get opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Monthly" from "Report Frequency" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Monthly', 'Report Frequency:');
    });

    it('Verifying if  "Report Frequency" drop down is set to "Monthly"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Report Frequency:').getSelectedText().then(function(text) {
        if (text !== 'Monthly') {
          expect(false).customError('"Report Frequency:" drop down did not set to "Monthly"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Start Date" dropdown', function() {
      TileOptionsDates.getDateDropDown('Start Date').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "End of Last Quarter" from the Start Date drop down', function() {
      TileOptionsDates.getOptionFromDateDropDown('End of Last Quarter').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      ThiefHelpers.getTextBoxClassReference('Start Date:').getText().then(function(text) {
        if (text !== 'End of Last Quarter') {
          expect(false).customError('"End of Last Quarter" is not set in "Start Date" input box; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options" page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait for "Portfolio Weights" chart to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000);
    });

    it('Verifying if "Portfolio Weights" Chart is displayed', function() {
      PA3MainPage.isInChartFormat('Portfolio Weights').then(function(option) {
        if (option !== true) {
          expect(false).customError('"Portfolio Weights" chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on grid icon in the "Portfolio Weights" chart', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Portfolio Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Chart has changed" dialog box appears', function() {
      ThiefHelpers.isDialogOpen('Chart has changed').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Chart has changed" dialog box is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Chart has changed" dialog box displays "Do you want to save your changes as a custom chart?"', function() {
      ThiefHelpers.getDialogClassReference('Chart has changed').getContent().getText().then(function(content) {
        if (content.indexOf('Do you want to save your changes as a custom chart?') < 0) {
          expect(false).customError('"Chart has changed" dialog box did not display "Do you want to save your changes as a custom chart?"; Found: ' + content);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 506253', function() {

    it('Should remove "Portfolio Weights" from the text box and enter "Demo"', function() {
      ThiefHelpers.getTextBoxClassReference('Chart Name').setText('Demo');

      // Verifying that "Multi" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Chart Name').getText().then(function(text) {
        if (text !== 'Demo') {
          expect(false).customError('"Chart Name" text box is not set to "Demo"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save Changes" button', function() {
      ThiefHelpers.getDialogButton('Chart has changed', 'Save Changes').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the "Chart has changed" dialog is closed', function() {
      ThiefHelpers.isDialogOpen('Chart has changed').then(function(flag) {
        if (flag) {
          expect(false).customError('"Chart has changed" dialog box is not closed even after clicking ' + 'on "Save Changes" button.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for "Weights" chart to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000);
    });

    it('Verify that "Weights" report is calculated', function() {
      // Verifying if Weights report is calculated
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        }
      });

      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(present) {
        expect(!present).customError('"Calculation Error" dialog box is seen while report calculation.');
        if (present) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    ChartingUtilities.selectChartFromReport('Weights', 'Demo|Select…');

    it('Verifying if "Demo" Chart is displayed', function() {
      PA3MainPage.isInChartFormat('Demo').then(function(option) {
        if (option !== true) {
          expect(false).customError('"Demo" chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Communications > Major Telecommunications" and select "AT&T Inc."', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference().getGroupByText('Communications');
      group.expand();
      group.getGroupByText('Major Telecommunications').then(function(childGroup) {
        childGroup.expand();
        childGroup.getItemByText('AT&T Inc.').then(function(listItem) {
          listItem.select();
        });
      });
    });

    it('Verifying if "Communications > Major Telecommunications" is expanded', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference().getGroupByText('Communications');
      group.getGroupByText('Major Telecommunications').then(function(childGroup) {
        childGroup.isExpanded().then(function(bool) {
          if (bool !== true) {
            expect(false).customError('"Major Telecommunications" is not expanded under "Communications" in "Interactive Pane"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on "wrench" icon in the report', function() {
      PA3MainPage.selectWrenchIcon('Demo');
    });

    it('Verifying if the "wrench" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Wrench" drop down did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Save Chart" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Save Chart').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the "wrench" drop down is closed', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (appeared) {
          expect(false).customError('"Wrench" drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 506256', function() {

    it('Should click on grid icon in the "Demo" chart', function() {
      PA3MainPage.getReportViewToggleButtonFromReportWorkspace('Demo').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(found) {
        if (!found) {
          expect(false).customError('"Weights" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
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

    ChartingUtilities.selectChartFromReport('Weights', 'Demo');

    it('Verifying if "Demo" Chart is displayed', function() {
      PA3MainPage.isInChartFormat('Demo').then(function(option) {
        if (option !== true) {
          expect(false).customError('"Demo" chart is not loaded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "AT&T Inc." legend is present in the "Demo" chart', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(arrLegends) {
        if (arrLegends[0] !== 'AT&T Inc.') {
          expect(false).customError('"AT&T Inc." legend is not present in chart, found: ' + arrLegends);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if only one option is present as legends', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(arrLegends) {
        if (arrLegends.length !== 1) {
          expect(false).customError('One option is not present as legend, found :' + arrLegends.length);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
