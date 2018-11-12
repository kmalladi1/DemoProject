require(__dirname + '/../../index.js');

describe('Test Case: chart-transpose', () => {

  var arrGroupsOnAxis = [];
  var arrSeries = ['Series 1', 'Series 2', 'Series 3', 'Series 4', 'Series 5'];
  var arrThreeSeries = ['Series 1', 'Series 2', 'Series 3'];
  var arrXAxisLables = ['Port. Weight - Commercial Services - Large Cap Core Test', 'Port. Weight - Health Technology - Large Cap Core Test', 'Port. Weight - Commercial Services - PA3 Testing',
    'Port. Weight - Health Technology - PA3 Testing', 'Bench. Weight - Commercial Services - Large Cap Core Test', 'Bench. Weight - Health Technology - Large Cap Core Test',
    'Bench. Weight - Commercial Services - PA3 Testing', 'Bench. Weight - Health Technology - PA3 Testing',];

  var rightClickAndVerify = () => {

    it('Should right click on Chart', () => {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
    });

    it('Should hover on "Sort" after perform right click', () => {
      browser.actions().mouseMove(ChartingUtilities.getOptionAfterRightClickOnChart('Sort')).perform();

      // Wait to element appear
      browser.sleep(2000);
    });

    it('Verifying if "Ascending" is selected in "Sort" menu', () => {
      ChartingUtilities.getOptionAfterRightClickOnChart('Ascending').element(by.xpath('./*[contains(@class,"radio")]')).isPresent().then((present) => {
        if (!present) {
          expect(false).customError(`"Ascending" is not selected in "Sort" menu.`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click any where outside to dismiss dropdown menu', () => {
      // Click anywhere to close the pannel
      PA3MainPage.getReports('Weights').click();
    });

    var getBarPositionNumber = (seriesNumber) => {
      return browser.driver.executeScript('return $(".pa-chart-non-formatting-mode").data("$fdsChartController").fdsChart.getObjectById("Chart").getSeriesChildren()[arguments[0]].v.barNumber;', seriesNumber);
    };

    var arrSortedNumbers = [];
    it(`Should hover over all bars and store values`, () => {
      arrSeries.forEach((series, index) => {
        getBarPositionNumber(index).then((barIndex) => {
          ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', arrSeries[barIndex]);
        });

        browser.driver.executeScript(() => {
          return $('.tf-tooltip').find('div').text();
        }).then((text) => {
          var temp = text.split(' ');
          arrSortedNumbers.push(temp[4]);
        });
      });
    });

    it(`Verifying if all groups are sorted in ascending order`, () => {
      for (var i = 0; i < arrSortedNumbers.length - 1; i++) {
        if (Number(arrSortedNumbers[i + 1] < Number(arrSortedNumbers[i]))) {
          expect(false).customError('"X axis" values did not in ascending order from left to right First Value: "' + arrSortedNumbers[i] + '" Second value "' + arrSortedNumbers[i + 1] + '"');
        }
      }
    });
  };

  var hoverAndGetTooltipText = (series, index) => {
    ChartingUtilities.hoverOnPixel(series, index);

    return browser.driver.executeScript(() =>  {
      return $('.tf-tooltip').find('div').text();
    });
  };

  describe('Test Step ID: 715103', () => {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:;PA3;Charts;CHART_DOC', () => {
      PA3MainPage.launchHtmlDialogAndOpenDocument('chart-doc');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying that the header title is "Large Cap Core Test vs Russell 1000"', () => {
      PA3MainPage.getHeader().getText().then((value) => {
        if (value !== 'Large Cap Core Test vs Russell 1000') {
          expect(false).customError('Header title did not displayed as "Large Cap Core Test vs ' + 'Russell 1000"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 716093', () => {

    it('Should right click on "Port. Weight" column  and select Column from Custom Charts menu', () => {
      SlickGridFunctions.getHeaderCellReference('Weights', 'Port. Weight').then((ref) => {
        PA3MainPage.rightClickAndSelectOption(ref, 'Custom Charts|Column');
      });
    });

    it('Verifying if report is converted in "Chart" mode', () => {
      PA3MainPage.isInChartFormat('Port. Weight').then((flag) => {
        if (!flag) {
          expect(false).customError('Report did not convert in "Chart" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Chart" is "Columns" chart', () => {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then((style) => {
        if (style !== 'Columns') {
          expect(false).customError('"Chart" did not "Columns" chart; Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    ChartingUtilities.rightClickOnChartAndSelectOption('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', undefined, 'Display Options');

    it('Verifying if "Display Options" dialog is opened', () => {
      ChangeSeries.getDialog('Display Options').isDisplayed().then((flag) => {
        if (!flag) {
          expect(false).customError('Display Options dialog did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Include Total" to check off', () => {
      ThiefHelpers.getCheckBoxClassReference('Include Total').check();

      // Verifying if "Include Total" check box is checked
      ThiefHelpers.getCheckBoxClassReference('Include Total').isChecked().then((isChecked) => {
        if (!isChecked) {
          expect(false).customError('"Include Total" checkbox is un checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Wrench" button from the "Port. Weight" report', () => {
      PA3MainPage.selectWrenchIcon('Port. Weight');

      //Verifying menu drop down is appeared'
      ThiefHelpers.isDropDownOpen().then((isOpen) => {
        if (!isOpen) {
          expect(false).customError('Menu drop down list did not display in "Port. Weight" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Transpose" option is not listed in wrench menu', () => {
      ThiefHelpers.getAllOptionsFromDropdown().then((array) => {
        array.forEach((element) => {
          if (element === 'Transpose') {
            expect(false).customError('"Transpose" is present in wrench menu');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 716095', () => {

    it('Should select "Display Options" from the Wrench icon drop down', () => {
      ThiefHelpers.getMenuClassReference().selectItemByText('Display Options');

      browser.sleep(5000);
    });

    it('Should uncheck "Include Total" check box', () => {
      ThiefHelpers.getCheckBoxClassReference('Include Total').uncheck();

      // Verifying if "Include Total" check box is checked
      ThiefHelpers.getCheckBoxClassReference('Include Total').isChecked().then((isChecked) => {
        if (isChecked) {
          expect(false).customError('"Include Total" checkbox is checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Display Values" drop down and select "Top N"', () => {
      ThiefHelpers.selectOptionFromDropDown('Top N', 'Display Values');
    });

    it('Verifying if Display Values drop down is set to "Top N"', () => {
      ThiefHelpers.verifySelectedDropDownText('Top N', 'Display Values');

      //browser.sleep(5000);
    });

    it('Should enter "5" in the search field from Available section', () => {
      ThiefHelpers.getTextBoxClassReference('Values').setText('5');

      // Verifying that "5" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Values').getText().then((text) => {
        if (text !== '5') {
          expect(false).customError('"5" did not type into the search field.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click any where outside to dismiss "Display Options" panel', () => {
      // Click anywhere to close the pannel
      PA3MainPage.getReports('Weights').click();
    });

    it('Should store X - Axis label groups', () => {
      ChartHelpers.getXorYAxisLabels('.pa-chart-non-formatting-mode', '$fdsChartController', 'X').then((arr) => {
        arr.forEach((element) => {
          arrGroupsOnAxis.push(element);
        });
      });
    });

    it('Should right click on Chart', () => {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', undefined);
    });

    it('Should click on the "Transpose" from the menu list which appears after right click on chart', () => {
      ChartingUtilities.getOptionAfterRightClickOnChart('Transpose').click().then(() => {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Wait till chart to load
      browser.sleep(3000);
    });

    it('Verifying if five series is presented in the chart', function() {
      ChartHelpers.getNumberOfSeriesInChart('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart')
        .then(function(count) {
          if (count !== 5) {
            expect(false).customError('Five series did not present in the chart. Found count ' + count);
            CommonFunctions.takeScreenShot();
          }
        });

      // waiting one second until chart loads
      browser.sleep(1000);
    });

    arrSeries.forEach((series) => {
      it('Should hover on "' + series + '" data series and verify the group name with previously collected names', () => {
        hoverAndGetTooltipText(series, undefined).then((text) => {
          var screenShot = 1;
          browser.call(() => {
            arrGroupsOnAxis.forEach((groupName) => {
              if (text.indexOf(groupName) > -1) {
                screenShot = 0;
                return groupName;
              }
            });
          }).then((groupName) => {
            if (screenShot === 1) {
              expect(false).customError(`${groupName} is not found in the chart.`);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe(`Test Step ID: 716096`, () => {

    ChartingUtilities.rightClickOnChartAndSelectOption('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', undefined, 'Sort');

    it('Should select "Ascending" from the drop down', () => {
      ChartingUtilities.getOptionAfterRightClickOnChart('Ascending').click().then(() => {
      }, (err) => {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      browser.sleep(10000);
    });

    rightClickAndVerify();

  });

  describe('Test Step ID: 756235', () => {

    // Click on the folder icon and select "Save As..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption(`Save As…`);

    // Select personal directory and enter the document name
    CommonPageObjectsForPA3.selectPersonalAndEnterDocumentNameInSaveAsDialog(`chart-sort`, undefined, true);

    it('Verifying if report is converted in "Chart" mode', () => {
      PA3MainPage.isInChartFormat('Port. Weight').then((flag) => {
        if (!flag) {
          expect(false).customError('Report did not convert in "Chart" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    rightClickAndVerify();

  });

  describe('Test Step ID: 715113', () => {

    it('Should Click on Dates Hyperlink', () => {
      PA3MainPage.getDateHyperLink('Port. Weight').click().then(() => {
      }, (err) => {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Report Frequency" drop down and select "Quarterly"', () => {
      ThiefHelpers.selectOptionFromDropDown('Quarterly', 'Report Frequency:');

      // Verifying if "Monthly" is set
      ThiefHelpers.verifySelectedDropDownText('Quarterly', 'Report Frequency:');

      // wait until option is selected
      browser.sleep(2000);
    });

    it('Should click on the "Start Date" dropdown and select "End of Last Year"', () => {
      ThiefHelpers.getDatepickerClassReference('Start Date:').selectShortcutByText('End of Last Year');

      ThiefHelpers.getDatepickerClassReference('Start Date:').getDate().then((text) => {
        if (text !== 'End of Last Year') {
          expect(false).customError('Expected:"End of Last Year" but Found: "' + text + '" in the Date text box');
          CommonFunctions.takeScreenShot();
        }
      });

      // wait until option is selected
      browser.sleep(3000);
    });

    it('Should click on "OK" button in the date drop down', () => {
      ThiefHelpers.getButtonClassReference('OK').press().then(() => {
      }, () => {

        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });

      // Wait till chart loads
      browser.sleep(3000);
    });

    it('Should select "Commercial Services" group, hold CTRL key and select "Health Technology" from Interactive pane', () => {
      var group = ThiefHelpers.getVirtualListboxClassReference();
      group.getGroupByText('Commercial Services').select();

      group.getGroupByText('Health Technology').select(true);

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it(`Verifying if "Health Technology" and "Commercial Series" are selected in Interactive pane`, () => {
      var arrGroups = ['Commercial Services', 'Health Technology'];
      arrGroups.forEach((groupName) => {
        ThiefHelpers.getVirtualListboxClassReference().getGroupByText(groupName).isSelected().then((selected) => {
          if (!selected) {
            expect(false).customError('"' + groupName + '" is not highlighted in "Interactive pane"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    ChartingUtilities.rightClickOnChartAndSelectOption('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', undefined, 'Transpose');

    var greenSeries;
    it('Should get series of green bar in the chart', () => {
      arrThreeSeries.forEach((series) => {
        ChartHelpers.getSeriesColor('.pa-chart-non-formatting-mode', '$fdsChartController', series, 'Background').then((color) => {
          if (color === '#99cc33') {
            greenSeries = series;
          }
        });
      });
    });

    var hoverText;
    it('Should hover over green bar "Commercial Services" and verify tooltip displays in "DD-MMM-YYYY:HH.MM" format', () =>  {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', greenSeries);

      browser.driver.executeScript(() =>  {
        return $('.tf-tooltip').find('div').text();
      }).then((text) => {
        hoverText = text;
        Utilities.isValidDDMMMYYYY(text.split(':')[0]);

        if (0 >= text.split(':')[2].split('.')[0] && text.split(':')[2].split('.')[0] <= 23) {
          expect(false).customError('Tooltip did not displays DD-MMM-YYYY:HH.MM format. Found ' + text);
          CommonFunctions.takeScreenShot();
        }

        if (0 >= text.split(':')[2].split('.')[0] && text.split(':')[2].split('.')[0] <= 59) {
          expect(false).customError('Tooltip did not displays DD-MMM-YYYY:HH.MM format. Found ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if legends are displayed in DD-MMM-YYYY format and equal to date in tooltip', () =>  {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then((legends) => {
        Utilities.isValidDDMMMYYYY(legends[1]);

        if (legends[1] !== hoverText.split(':')[0]) {
          expect(false).customError('Legend date "' + legends[1] + '" is not equal to hovered date "' + hoverText.split(':')[0] + '". Check second legend date which is in green');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 715114', () =>  {

    var blueSeries;
    it('Should get series of blue bar in the chart', () => {
      arrThreeSeries.forEach((series) => {
        ChartHelpers.getSeriesColor('.pa-chart-non-formatting-mode', '$fdsChartController', series, 'Background').then((color) => {
          if (color === '#00aeef') {
            blueSeries = series;
          }
        });
      });
    });

    it('Should perform right click on "blue" series in chart for Health Technology', () =>  {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', blueSeries, 1);
    });

    it('Should hover on "Show Series Y-Axis" after perform right click', () =>  {
      browser.actions().mouseMove(ChartingUtilities.getOptionAfterRightClickOnChart('Show Series Y-Axis')).perform();

      // Wait to element appear
      browser.sleep(2000);
    });

    it('Should select "On Left" from the drop down', () =>  {
      ChartingUtilities.getOptionAfterRightClickOnChart('On Left').click().then(() =>  {
      }, (err) => {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    var redSeries;
    it('Should get series of red bar in the chart', () => {
      arrThreeSeries.forEach((series) => {
        ChartHelpers.getSeriesColor('.pa-chart-non-formatting-mode', '$fdsChartController', series, 'Background').then((color) => {
          if (color === '#9a3366') {
            redSeries = series;
          }
        });
      });
    });

    it('Should perform right click on "red" series in chart for Commercial Services', () =>  {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', redSeries);
    });

    it('Should hover on "Show Series Y-Axis" after perform right click', () =>  {
      browser.actions().mouseMove(ChartingUtilities.getOptionAfterRightClickOnChart('Show Series Y-Axis')).perform();

      // Wait to element appear
      browser.sleep(2000);
    });

    it('Verifying if "On Left" is selected', () =>  {
      ChartingUtilities.getOptionAfterRightClickOnChart('On Left').element(by.xpath('./i')).isPresent().then(() =>  {
      }, (error) => {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    var options = ['On Right', 'On Both', 'On Neither'];

    options.forEach((option) => {
      it('Verifying if "' + option + '" is displayed after hover mouse', () =>  {
        ChartingUtilities.getOptionAfterRightClickOnChart(option).isPresent().then((flag) => {
          if (!flag) {
            expect(false).customError('"' + option + '" did not present in drop down');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 715143', () =>  {

    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Port. Weight', 'Change Series');

    it('Verifying "Change series" dialog is appeared', () =>  {
      ChangeSeries.getDialog('Change Series').isDisplayed().then((flag) => {
        if (!flag) {
          expect(false).customError('Change Series dialog did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click on the item "Bench. Weight" in Available section', () =>  {
      ThiefHelpers.getListBoxItem(ChangeSeries.xpathAvailableSection, 'Bench. Weight').then((ref) => {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Verifying if "Bench. Weight" is added to "Selected" container', () =>  {
      ThiefHelpers.getListBoxItem(ChangeSeries.xpathSelectedContainer, 'Bench. Weight').getText().then((text) => {
        if (text !== 'Bench. Weight') {
          expect(false).customError('"Bench. Weight" is not found in the "Selected" container;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, (err) => {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"Bench. Weight" is not found in the "Selected" container;Found: ' + text);
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click any where outside to dismiss the pop up', () =>  {
      PA3MainPage.getReports('Weights').click();
    });

    var blueSeries;
    it('Should get series of blue bar in the chart', () => {
      arrThreeSeries.forEach((series) => {
        ChartHelpers.getSeriesColor('.pa-chart-non-formatting-mode', '$fdsChartController', series, 'Background').then((color) => {
          if (color === '#00aeef') {
            blueSeries = series;
          }
        });
      });
    });

    it('Should perform right click on "blue" series in chart for Health Technology', () =>  {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', blueSeries, 1);
    });

    it('Should select "Format" from the drop down', () =>  {
      ChartingUtilities.getOptionAfterRightClickOnChart('Format...').click().then(() =>  {
      }, (err) => {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if drop down is opened', () =>  {
      ThiefHelpers.isDropDownOpen().then((isOpen) => {
        if (!isOpen) {
          expect(false).customError('Drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Advanced" button from the dropdown', () =>  {
      ThiefHelpers.getButtonClassReference('Advanced').press().then(() =>  {
      }, (err) => {

        expect(false).customError('Unable to click on "Advanced" button. Found error ' + err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Series 1" tab is selected from LHP', () =>  {
      ThiefHelpers.getOptionspaneItem(PA3EditChartMode.xpathOptionsPane, 'Series 1', 'Series').isSelected().then((selected) => {
        if (!selected) {
          expect(false).customError('"Series 1" tab is not selected from LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that the application is changed to Edit Chart Mode', () =>  {
      element(by.xpath(PA3EditChartMode.xpathEditChart)).isPresent().then((present) => {
        if (!present) {
          expect(false).customError('Application is not changed to Edit Chart Mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Color Picker" button from the drop down', () =>  {
      ThiefHelpers.getButtonClassReference(undefined, PA3EditChartMode.xpathOfColorPickerButton).press().then(() =>  {
      }, (err) => {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down opened
      ThiefHelpers.isDropDownOpen(1, true).then((isOpen) => {
        if (!isOpen) {
          expect(false).customError('"Color Picker" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Orange" from the color picker', () =>  {
      ChartingUtilities.selectColorFrmDD('rgb(255, 153, 0)');
    });

    it('Should select "X Axis" from "Series" in LHP', () =>  {
      ThiefHelpers.getOptionspaneItem(PA3EditChartMode.xpathOptionsPane, 'X Axis').select();

      ThiefHelpers.getOptionspaneItem(PA3EditChartMode.xpathOptionsPane, 'X Axis').isSelected().then((selected) => {
        if (!selected) {
          expect(false).customError('"X Axis" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "bold" button', () =>  {
      ThiefHelpers.getButtonCheckboxClassReference(undefined, PA3EditChartMode.xpathBoldButton).check();
    });

    it('Verifying "Series 1" is displaying orange color now(Previously it is blue)', () => {
      PA3EditChartMode.getSeriesColor('Series 1', 'Background').then((color) => {
        if (color !== '#ff9900') {
          expect(false).customError('Bar color is not orange, found color ' + color);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if X-Axis labels are in bold', () =>  {
      PA3EditChartMode.getXorYAxisPropertiesByAttribute('x', 'FontWeight').then((number) => {
        if (number !== 700) {
          expect(false).customError('X-Axis labels are not in bold');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 716913', () =>  {

    it('Should select "Legends" from LHP', () =>  {
      ThiefHelpers.getOptionspaneItem(PA3EditChartMode.xpathOptionsPane, 'Legends').select();

      ThiefHelpers.getOptionspaneItem(PA3EditChartMode.xpathOptionsPane, 'Legends').isSelected().then((selected) => {
        if (!selected) {
          expect(false).customError('"Legends" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should click on COG wheel of "Series 1" item in "Series Name In Legend" listbox', () =>  {
      ThiefHelpers.getListBoxItem(PA3EditChartMode.xpathSeriesNameListBox, 'Series 1').getActions().then((actions) => {
        actions.triggerAction('configure');
      });
    });

    it('Should clear and enter "Demo" into the "Name" field', () =>  {
      ThiefHelpers.getTextBoxClassReference('Name', PA3EditChartMode.xpathSeriesNameInputBox).setText('Demo');

      // Verifying that "Demo" is entered into the Field
      ThiefHelpers.getTextBoxClassReference('Name', PA3EditChartMode.xpathSeriesNameInputBox).getText().then((text) => {
        if (text !== 'Demo') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Demo" is not entered to the "Name" field; Found: ' + text);
        }
      });
    });

    // Click on "Ok" button of header and verify if "Edit Chart" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Edit Chart');

    // Click on "Wrench" icon and select "Refresh" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Port. Weight', 'Refresh');

    it('Verifying if report is converted in "Chart" mode', () => {
      PA3MainPage.isInChartFormat('Port. Weight').then((flag) => {
        if (!flag) {
          expect(false).customError('Report did not convert in "Chart" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Series 1" is displaying orange color now(Previously it is blue)', () => {
      ChartHelpers.getSeriesColor('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 'Background').then((hexColor) => {
        if (hexColor !== '#ff9900') {
          expect(false).customError('Column Chart is not updated with orange color bars');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "X-Axis" is in bold', () =>  {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'X', 'FontWeight').then((weight) => {
        if (weight !== 700) {
          expect(false).customError('"X" axis title did not in Bold; Found: ' + weight);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on chart toolbar wrench icon from "Port. Weight"', () =>  {
      PA3MainPage.selectWrenchIcon('Port. Weight');
    });

    it('Verifying if "Menu" drop down is opened', () =>  {
      ThiefHelpers.isDropDownOpen().then((flag) => {
        if (!flag) {
          expect(false).customError('"Menu" drop down did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Display Options" option is not listed in wrench menu', () => {
      ThiefHelpers.getAllOptionsFromDropdown().then((array) => {
        array.forEach((element) => {
          if (element === 'Display Options') {
            expect(false).customError('"Display Options" is present in wrench menu');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Verifying if "Transpose" option is checked from menu drop down', () =>  {
      var xpathOfTranspose = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathActiveOptionFromWrenchMenu, 'Transpose');
      element(by.xpath(xpathOfTranspose)).isPresent().then((flag) => {
        if (!flag) {
          expect(false).customError('"Transpose" option is not checked from menu drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Transpose" is enabled from wrench drop down', () =>  {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Transpose').getAttribute('class').then((value) => {
        if (value.indexOf('disabled') > -1) {
          expect(false).customError('"Transpose" is disabled from wrench drop down');
          CommonFunctions.takeScreenShot();
        }
      }, (err) => {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if updated Legend is displayed as "Demo"', () =>  {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then((legends) => {
        if (legends[0] !== 'Demo') {
          expect(false).customError('Legend is not "Demo". Found ' + legends[0]);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 715147', () =>  {

    it('Should enter "PA3_Test.Acct" in the "Portfolio" widget and select PA3_TEST.ACCT | Client: from the type ahead results', () =>  {
      PA3MainPage.setPortfolio('PA3_Test.Acct', 'PA3_TEST.ACCT | Client:', 'Client:PA3_TEST.ACCT').then((value) => {
        if (!value) {
          expect(false).customError('"PA3_TEST.Acct | Client:" is not selected from type ahead results');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if report is in "Chart" mode', () => {
      PA3MainPage.isInChartFormat('Port. Weight').then((flag) => {
        if (!flag) {
          expect(false).customError('Report did not in "Chart" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Hamburger" icon next to "Portfolio"', () =>  {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(() =>  {
      }, (err) => {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account dropdown opened
      ThiefHelpers.isDropDownOpen().then((found) => {
        if (!found) {
          expect(false).customError('Account dropdown was not opened');
        }
      });
    });

    it('Should check "Use Multiple Portfolios" check box', () =>  {
      var xpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xptahCheckboxFromAccountsDropdown, 'Use Multiple Portfolios');

      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).check();

      // Verifying that "Use Multiple Portfolios" check box is checked
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).isChecked().then((value) => {
        if (!value) {
          expect(false).customError('"Use Multiple Portfolios" checkbox is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "OK" button from the "Account" drop down', () =>  {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(() =>  {
      }, (err) => {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      expect(PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('Class')).not.toContain('active');
    });

    it('Verifying if X Axis labels are seen as expected', () =>  {
      ChartHelpers.getXorYAxisLabels('.pa-chart-non-formatting-mode', '$fdsChartController', 'X').then((arr) => {
        arrXAxisLables.forEach((labelname, index) => {
          if (labelname !== arr[index]) {
            expect(labelname).toBe(arr[index]);
          }
        });
      });
    });

  });

  describe('Test Step ID: 715154', () =>  {

    // Click on the Folder icon and click and select "Save" from drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Save');

    CommonPageObjectsForPA3.saveChanges();

    // Click on the Folder icon and click and select "Open..." from drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Open...');

    // Select the reuqired document from personal directory
    CommonPageObjectsForPA3.openRequiredDocumentFromPersonal(`chart-sort`);

    it('Verifying if report is converted in "Chart" mode', () => {
      PA3MainPage.isInChartFormat('Port. Weight').then((flag) => {
        if (!flag) {
          expect(false).customError('Report did not convert in "Chart" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if X Axis labels are seen as expected', () =>  {
      ChartHelpers.getXorYAxisLabels('.pa-chart-non-formatting-mode', '$fdsChartController', 'X').then((arr) => {
        arrXAxisLables.forEach((labelname, index) => {
          if (labelname !== arr[index]) {
            expect(labelname).toBe(arr[index]);
          }
        });
      });
    });
  });

  describe('Test Step ID: 715158', () =>  {

    it('Should click on chart toolbar wrench icon from "Port. Weight"', () =>  {
      PA3MainPage.selectWrenchIcon('Port. Weight');
    });

    it('Verifying if "Menu" drop down is opened', () =>  {
      ThiefHelpers.isDropDownOpen().then((flag) => {
        if (!flag) {
          expect(false).customError('"Menu" drop down did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Stacked Area" from the "Chart Type" drop down', () =>  {
      PA3MainPage.getOptionFromWrenchMenu('Chart Type|Stacked Area').click();

      // Adding slip time to appear the Pie Chart
      browser.sleep(5000);
    });

    it('Should right click on chart', () =>  {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
    });

    it('Verifying if "Transpose" option is not listed in wrench menu', () => {
      ChartingUtilities.getOptionAfterRightClickOnChart('Transpose').isPresent().then((flag) => {
        if (flag) {
          expect(false).customError('"Transpose" present in the drop down after right click on chart');
          CommonFunctions.takeScreenShot();
        }
      });

    });
  });

  describe('Test Step ID: 715160', () =>  {

    it('Should click on chart toolbar wrench icon from "Port. Weight (Large Cap Core Test vs Russell 1000)"', () =>  {
      PA3MainPage.selectWrenchIcon('Port. Weight (Large Cap Core Test vs Russell 1000)');
    });

    it('Verifying if "Menu" drop down is opened', () =>  {
      ThiefHelpers.isDropDownOpen().then((flag) => {
        if (!flag) {
          expect(false).customError('"Menu" drop down did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Pie" from the "Chart Type" drop down', () =>  {
      PA3MainPage.getOptionFromWrenchMenu('Chart Type|Pie').click();

      // Adding slip time to appear the Pie Chart
      browser.sleep(5000);
    });

    it('Verifying if "Pie chart" is displayed', () =>  {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 0).then((value) => {
        if (value !== '3D Pie') {
          expect(false).customError('Pie Chart is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, (error) => {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should right click on "Pie" chart', () =>  {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
    });

    it('Verifying if "Transpose" is not presented in the drop down after right click', () =>  {
      ChartingUtilities.getOptionAfterRightClickOnChart('Transpose').isPresent().then((flag) => {
        if (flag) {
          expect(false).customError('"Transpose" present in the drop down after right click on chart');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 756236', () =>  {

    // Click on the folder icon and select "New" from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption(`New`);

    it('Click "Don\'t Save Changes" on the "Document has changed" dialog', () =>  {
      element(by.xpath(CommonFunctions.replaceStringInXpath(CommonPageObjectsForPA3.xpathOfButtonOfDocumentHasChangedDialog, `Don't Save Changes`))).click().then(() =>  {
      }, (err) => {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Document has changed" dialog box disappears', () =>  {
      element(by.xpath(CommonPageObjectsForPA3.xpathOfDocumentHasChangedDialog)).isPresent().then((present) => {
        if (present) {
          expect(false).customError('"Document has changed" dialog is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on the Folder icon and click and select "Delete..." from drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Delete…');

    // Select the required document and click on delete button
    // Add .toUpperCase() if you want the document name to be in upper case to the
    CommonPageObjectsForPA3.deleteRequiredDocumentFromPersonalDirectory('chart-sort');

  });
});
