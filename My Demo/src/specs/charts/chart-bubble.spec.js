'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: chart-bubble', function() {

  describe('Test Step ID: 556516', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:default_doc_auto', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });

    it('Waiting for report to calculate', function() {
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

  describe('Test Step ID: 556507', function() {

    it('Should select "Pre & Post Trade" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Reports', 'Pre & Post Trade').then(function(ref) {
        ref.click();
      }, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });

      // Verifying "Pre & Post Trade" Report is selected.
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Reports', 'Pre & Post Trade').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Pre & Post Trade Overview" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should right click on "Bench. Weight" column under "Pre-Trade" and select Column from Custom Charts menu', function() {
      SlickGridFunctions.getHeaderCellReference('Pre & Post Trade', 'Bench. Weight', 'Pre-Trade').then(function(ref) {
        PA3MainPage.rightClickAndSelectOption(ref, 'Custom Charts|Column');
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

    it('Should click on the "Wrench" button from report', function() {
      PA3MainPage.selectWrenchIcon('Bench. Weight');

      //Verifying menu drop down is appeared'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Menu drop down list did not display in "Bench. Weight" report workspace.');
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

    it('Should select "Bubble" from the "Chart Type" drop down', function() {
      ThiefHelpers.getMenuClassReference(2).selectItemByText('Bubble').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
      browser.sleep(8000);

    });

    it('Verifying if "Chart" is "Bubble" chart', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(style) {
        if (style !== 'Bubble') {
          expect(false).customError('"Chart" did not "Bubble" chart; Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 556508', function() {

    it('Should perform right click on chart', function() {
      ChartHelpers.rightClickOnPlot('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart');
    });

    it('Should select "Change Series" from drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Change Series').click().then(function() {
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

    var elements = ['Port. Ending Weight', 'Variation in Ending Weight'];

    elements.forEach(function(ele) {
      it('Should select "' + ele + '" from selected section under "Post-Trade" section', function() {
        // Getting the xpath of the Selected section
        var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');
        var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Post-Trade');

        group.isExpanded().then(function(expanded) {
          if (expanded) {
            group.getItemByText(ele).then(function(item) {
              item.select(true);

              // Check if element is selected
              item.isSelected().then(function(selected) {
                if (!selected) {
                  expect(false).customError('"' + ele + '" did not selected from "Selected" section');
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          } else {
            expect(false).customError('"Post-Trade" group was not expanded in the Selected section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on "Show Column" checkbox to checkoff if checkbox is unchecked', function() {
      ThiefHelpers.getCheckBoxClassReference('Show Column').isChecked().then(function(boolean) {
        if (!boolean) {
          ThiefHelpers.getCheckBoxClassReference('Show Column').check();
        }
      });
    });

    it('Verifying if "Show Column" checkbox is checked', function() {
      ThiefHelpers.getCheckBoxClassReference('Show Column').isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Show Column" checkbox did not check off');
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

    it('Should wait for report to calculate', function() {
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

    it('Should hover on any bubble from Chart', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {
        var count = text.match(/Bench. Weight:/g).length;

        // Tooltip all values printing 1 time extra
        // Verifying if "Bench. Weight is presented three times"
        if (count !== 6) {
          expect(false).customError('"Bench. Weight" died not present three times');
          CommonFunctions.takeScreenShot();
        }

        // Applying logic to take value from the tooltip value
        var temp = text.split(' ');
        temp[7] = temp[7].replace('Bench.', '');
        temp[9] = temp[9].replace('Commercial', '');

        // Verifying if values are present for all three "Bench. Weight"
        if (temp[4] === '' || temp[4] === null || temp[7] === '' || temp[7] === null || temp[9] === '' || temp[9] === null) {
          expect(false).customError('All threes values are empty fro "Bench. Weight"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 556509', function() {

    it('Should click on the "Wrench" button from report', function() {
      PA3MainPage.selectWrenchIcon('Bench. Weight vs Bench. Weight');

      //Verifying menu drop down is appeared'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Menu drop down list did not display in "Bench. Weight vs Bench. Weight" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Change Series" from the drop down', function() {
      ThiefHelpers.getMenuClassReference(undefined, true).selectItemByText('Change Series').then(function() {
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

    it('Should click on "X Series:" drop down and select "Port. Weight"', function() {
      ThiefHelpers.selectOptionFromDropDown('Port. Weight', 'X Series:', undefined, 2);
    });

    it('Verifying if "X Series:" drop down is set to "Port. Weight"', function() {
      ThiefHelpers.verifySelectedDropDownText('Port. Weight', 'X Series:');
    });

    it('Should click on "Bubble Size:" drop down and select "Difference"', function() {
      ThiefHelpers.selectOptionFromDropDown('Difference', 'Bubble Size:', undefined, 2);
    });

    it('Verifying if "Bubble Size:" drop down is set to "Difference"', function() {
      ThiefHelpers.verifySelectedDropDownText('Difference', 'Bubble Size:');
    });

    it('Should hover on any bubble from Chart', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {

        // Tooltip all values printing 1 time extra
        // Verifying if "Port. Weight" is presented
        if (text.indexOf('Port. Weight:') < 0) {
          expect(false).customError('"Port. Weight:" died not present');
          CommonFunctions.takeScreenShot();
        }

        // Verifying if "Bench. Weight" is presented
        if (text.indexOf('Bench. Weight:') < 0) {
          expect(false).customError('"Bench. Weight:" died not present');
          CommonFunctions.takeScreenShot();
        }

        // Verifying if "Difference" is presented
        if (text.indexOf('Difference') < 0) {
          expect(false).customError('"Difference" died not present');
          CommonFunctions.takeScreenShot();
        }

        // Applying logic to take value from the tooltip value
        var temp = text.split(' ');
        temp[7] = temp[7].replace('Difference', '');
        temp[9] = temp[9].replace('Commercial', '');

        // Verifying if values are present for all three data
        if (temp[4] === '' || temp[4] === null || temp[7] === '' || temp[7] === null || temp[9] === '' || temp[9] === null) {
          expect(false).customError('All threes values are empty fro "Bench. Weight"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 556526', function() {

    it('Should perform right click on "blue" series in chart', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
    });

    it('Should hover on "Show Y-Axis" after perform right click', function() {
      browser.actions().mouseMove(ChartingUtilities.getOptionAfterRightClickOnChart('Show Y-Axis')).perform();

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

    it('Verifying if "Series 1" axis display in "Right" position', function() {
      ChartHelpers.getYAxisPosition('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(value) {
        if (value !== 'Right') {
          expect(false).customError('"Series 1" axis did not display at "Right" position; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Y" axis title text is "Bench. Weight"', function() {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y', 'TitleText')
        .then(function(text) {
          if (text !== 'Bench. Weight') {
            expect(false).customError('"Y" axis title did not match with "Bench. Weight"; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

  });

  describe('Test Step ID: 556513', function() {

    it('Verifying if "Y" axis title text is "Bench. Weight"', function() {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y', 'TitleText')
        .then(function(text) {
          if (text !== 'Bench. Weight') {
            expect(false).customError('"Y" axis title did not match with "Bench. Weight"; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should right click on "Y" axis title "Bench. Weight"', function() {
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

    it('Verifying that "Bench. Weight" is present in text box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, ChartingUtilities.axisTitleXpath).getText().then(function(text) {
        if (text !== 'Bench. Weight') {
          expect(false).customError('"Bench. Weight" did not type in Axix Title text box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should  remove "Bench. Weight" and enter "Y axis - Bubble" in the Axis Title text box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, ChartingUtilities.axisTitleXpath).setText('Y axis - Bubble');

      // Verifying that "Y axis - Bubble" is typed into the search box
      ThiefHelpers.getTextBoxClassReference(undefined, ChartingUtilities.axisTitleXpath).getText().then(function(text) {
        if (text !== 'Y axis - Bubble') {
          expect(false).customError('"Y axis - Bubble" did not type in Axix Title text box');
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

    it('Should perform right click on any bubble', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
    });

    it('Should hover on "Show Y-Axis" after perform right click', function() {
      browser.actions().mouseMove(ChartingUtilities.getOptionAfterRightClickOnChart('Show Y-Axis')).perform();

      // Wait to element appear
      browser.sleep(2000);
    });

    it('Should select "On Left" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('On Left').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on the "Wrench" button from report', function() {
      PA3MainPage.selectWrenchIcon('Port. Weight vs Bench. Weight');

      //Verifying menu drop down is appeared'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Menu drop down list did not display in "Port. Weight vs Bench. Weight" report workspace.');
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

    it('Should select "Scatter" from the "Chart Type" drop down', function() {
      ThiefHelpers.getMenuClassReference(2).selectItemByText('Scatter').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
      browser.sleep(8000);

    });

    it('Verifying if "Chart" is "Scatter(Marker)" chart', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(style) {
        if (style !== 'Marker') {
          expect(false).customError('"Chart" did not "Marker" chart; Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hover on any scatter from Chart', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {

        // Tooltip all values printing 1 time extra
        // Verifying if "Port. Weight" is presented
        if (text.indexOf('Port. Weight:') < 0) {
          expect(false).customError('"Port. Weight:" died not present');
          CommonFunctions.takeScreenShot();
        }

        // Verifying if "Bench. Weight" is presented
        if (text.indexOf('Bench. Weight:') < 0) {
          expect(false).customError('"Bench. Weight:" died not present');
          CommonFunctions.takeScreenShot();
        }

        // Applying logic to take value from the tooltip value
        var temp = text.split(' ');
        temp[7] = temp[7].replace('Commercial', '');

        // Verifying if values are present for all data
        if (temp[4] === '' || temp[4] === null || temp[7] === '' || temp[7] === null) {
          expect(false).customError('All twos values are empty fro "Bench. Weight"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Series 1" axis display in "Right" position', function() {
      ChartHelpers.getYAxisPosition('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(value) {
        if (value !== 'Right') {
          expect(false).customError('"Series 1" axis did not display at "Right" position; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Y" axis title text is "Y axis - Bubble"', function() {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y', 'TitleText')
        .then(function(text) {
          if (text !== 'Y axis - Bubble') {
            expect(false).customError('"Y" axis title did not match with "Y axis - Bubble"; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying if "Y axis - Bubble" is in Bold', function() {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y', 'TitleFontWeight')
        .then(function(text) {
          if (text !== 700) {
            expect(false).customError('"Y" axis title did not in Bold; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

  });

  describe('Test Step ID: 556514', function() {

    it('Should click on the "Wrench" button from report', function() {
      PA3MainPage.selectWrenchIcon('Port. Weight vs Bench. Weight');

      //Verifying menu drop down is appeared'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Menu drop down list did not display in "Port. Weight vs Bench. Weight" report workspace.');
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

    it('Should select "Bubble" from the "Chart Type" drop down', function() {
      ThiefHelpers.getMenuClassReference(2).selectItemByText('Bubble').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
      browser.sleep(8000);

    });

    it('Verifying if "Chart" is "Bubble" chart', function() {
      ChartHelpers.getChartStyle('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(style) {
        if (style !== 'Bubble') {
          expect(false).customError('"Chart" did not "Bubble" chart; Found :' + style);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Wrench" button from report', function() {
      PA3MainPage.selectWrenchIcon('Port. Weight vs Bench. Weight');

      //Verifying menu drop down is appeared'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Menu drop down list did not display in "Bench. Weight vs Bench. Weight" report workspace.');
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

    it('Verifying if "X Series:" drop down is set to "Port. Weight"', function() {
      ThiefHelpers.verifySelectedDropDownText('Port. Weight', 'X Series:');
    });

    it('Verifying if "Y Series:" drop down is set to "Bench. Weight"', function() {
      ThiefHelpers.verifySelectedDropDownText('Bench. Weight', 'Y Series:');
    });

    it('Verifying if "Bubble Size:" drop down is set to "Difference"', function() {
      ThiefHelpers.verifySelectedDropDownText('Difference', 'Bubble Size:');
    });

    it('Verifying if "Series 1" axis  display in "Left" position', function() {
      ChartHelpers.getYAxisPosition('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(value) {
        if (value !== 'Left') {
          expect(false).customError('"Series 1" axis did not display at "Left" position; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Y" axis title text is "Bench. Weight"', function() {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y', 'TitleText', 2)
        .then(function(text) {
          if (text !== 'Bench. Weight') {
            expect(false).customError('"Y" axis title did not match with "Bench. Weight"; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

  });

  describe('Test Step ID: 556528', function() {

    it('Should perform right click on any bubble', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
    });

    it('Should hover on "Show Y-Axis" after perform right click', function() {
      browser.actions().mouseMove(ChartingUtilities.getOptionAfterRightClickOnChart('Show Y-Axis')).perform();

      // Wait to element appear
      browser.sleep(2000);
    });

    it('Should select "On Right" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('On Right').click().then(function() {
        // Wait for chart to load
        browser.sleep(2000);
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Series 1" axis display in "Right" position', function() {
      ChartHelpers.getYAxisPosition('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(value) {
        if (value !== 'Right') {
          expect(false).customError('"Series 1" axis did not display at "Right" position; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Y" axis title text is "Y axis - Bubble"', function() {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y', 'TitleText')
        .then(function(text) {
          if (text !== 'Y axis - Bubble') {
            expect(false).customError('"Y" axis title did not match with "Y axis - Bubble"; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying if "Y axis - Bubble" is in Bold', function() {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y', 'TitleFontWeight')
        .then(function(text) {
          if (text !== 700) {
            expect(false).customError('"Y" axis title did not in Bold; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

  });

  describe('Test Step ID: 556529', function() {

    it('Should perform right click on any bubble', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
    });

    it('Should hover on "Show Y-Axis" after perform right click', function() {
      browser.actions().mouseMove(ChartingUtilities.getOptionAfterRightClickOnChart('Show Y-Axis')).perform();

      // Wait to element appear
      browser.sleep(2000);
    });

    it('Should select "On Neither" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('On Neither').click().then(function() {
        // Wait for chart to load
        browser.sleep(2000);
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Series 1" axis display in "Neither" position', function() {
      ChartHelpers.getYAxisPosition('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(value) {
        if (value !== 'Neither') {
          expect(false).customError('"Series 1" axis did not display at "Neither" position; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 556511', function() {

    it('Should hover on any bubble from Chart', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1', 1);

      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {

        // Tooltip all values printing 1 time extra
        // Verifying if "Port. Weight" is presented"
        if (text.indexOf('Port. Weight:') < 0) {
          expect(false).customError('"Port. Weight:" died not present');
          CommonFunctions.takeScreenShot();
        }

        // Verifying if "Bench. Weight" is presented
        if (text.indexOf('Bench. Weight:') < 0) {
          expect(false).customError('"Bench. Weight:" died not present');
          CommonFunctions.takeScreenShot();
        }

        // Verifying if "Difference" is presented
        if (text.indexOf('Difference') < 0) {
          expect(false).customError('"Difference" died not present');
          CommonFunctions.takeScreenShot();
        }

        // Applying logic to take value from the tooltip value
        var temp = text.split(' ');
        temp[8] = temp[8].replace('Difference', '');
        temp[9] = temp[9].replace('Micron', '');

        // Verifying if values are present for all three data
        if (temp[5] === '' || temp[5] === null || temp[8] === '' || temp[8] === null || temp[9] === '' || temp[9] === null) {
          expect(false).customError('All threes values are empty fro "Bench. Weight"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
