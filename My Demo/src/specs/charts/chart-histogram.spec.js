'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: chart-histogram', function() {

  describe('Test Step ID: 563389', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:default_doc_auto', function() {
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

    it('Verifying if "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 563390', function() {

    it('Should perform double click on "Bench. Weight" column', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', 'Bench. Weight').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
      browser.sleep(5000);
    });

    it('Verifying if "Bench. Weight" column values are in descending order', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Bench. Weight').then(function(arr) {
        for (var i = 0; i < arr.length - 1; i++) {
          if (Number(arr[i]) < Number(arr[i + 1])) {
            expect(false).customError('"Bench. Weight" column values did not in descending order; First Value: "' + arr[i] + '" Second value "' + arr[i + 1] + '"');
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });

    it('Disabling wait for Angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should right click on "Bench. Weight" column  and select Histogram from Custom Charts menu', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', 'Bench. Weight').then(function(ref) {
        PA3MainPage.rightClickAndSelectOption(ref, 'Custom Charts|Histogram');
      });
    });

    it('Verifying if Loading icon did not displayed', function() {
      PA3MainPage.getReportCalculationDlg().isPresent().then(function(flag) {
        if (flag) {
          expect(false).customError('"Loading" icon displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for Angular', function() {
      browser.ignoreSynchronization = false;
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

    it('Verifying that grouping hyperlink is not displaying', function() {
      PA3MainPage.getGroupingsHyperLink('Bench. Weight').isPresent().then(function(flag) {
        if (flag) {
          expect(false).customError('Grouping hyperlink is displaying');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if Y axis values are  multiplier by 100', function() {
      ChartHelpers.getXorYAxisLabels('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y').then(function(arr) {
        arr.forEach(function(value) {
          if (value % 100 !== 0) {
            expect(false).customError('"Y axis" values did not multiplier by 100; Found' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Y" axis title text is "Frequency"', function() {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y', 'TitleText')
        .then(function(text) {
          if (text !== 'Frequency') {
            expect(false).customError('"Y" axis title did not match with "Frequency"; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying if X axis values are  display in decimal place', function() {
      ChartHelpers.getXorYAxisLabels('.pa-chart-non-formatting-mode', '$fdsChartController', 'X').then(function(arr) {
        arr.forEach(function(value) {
          if (value.indexOf('.') < 0) {
            expect(false).customError('"X axis" values did not display in decimal place; Found' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if X axis values are in ascending order from left to right', function() {
      ChartHelpers.getXorYAxisLabels('.pa-chart-non-formatting-mode', '$fdsChartController', 'X').then(function(arr) {
        for (var i = 0; i < arr.length - 1; i++) {
          if (Number(arr[i + 1] < Number(arr[i]))) {
            expect(false).customError('"X axis" values did not in ascending order from left to right First Value: "' + arr[i] + '" Second value "' + arr[i + 1] + '"');
          }
        }
      });
    });

    it('Verifying between two bars no space is available', function() {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'X', 'BinFactor').then(function(val) {
        if (val !== 1) {
          expect(false).customError('Space is available between two bars; Found: ' + val);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 563395', function() {

    it('Should perform right click on any bar', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
    });

    it('Should hover on "Histogram type" after perform right click', function() {
      browser.actions().mouseMove(ChartingUtilities.getOptionAfterRightClickOnChart('Histogram type')).perform();

      // Wait to element appear
      browser.sleep(2000);
    });

    it('Should select "Probability" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Probability').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      browser.sleep(8000);
    });

    it('Should hover on any any bar and verifying if x and y values are displaying', function() {
      ChartHelpers.hoverOnPixel('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');

      browser.sleep(2000);
      browser.driver.executeScript(function() {
        return $('.tf-tooltip').find('div').text();
      }).then(function(text) {

        // Splinting tooltip value
        var temp = text.split(':');

        // Removing Probability from text
        temp[1] = temp[1].replace('Probability', '');

        // Removing Bin from text
        temp[2] = temp[2].replace('Bin', '');

        // Verifying if values are present x and y axis
        if (temp[1] === '' || temp[1] === null || temp[2] === '' || temp[2] === null) {
          expect(false).customError('Valued did not present for x and y axis');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if Y axis values are  in percentage', function() {
      ChartHelpers.getXorYAxisLabels('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y').then(function(arr) {
        arr.forEach(function(value) {
          if (value.indexOf('%') < 0) {
            expect(false).customError('"Y axis" values did not display as percentage; Found' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Y" axis title text is "Probability"', function() {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y', 'TitleText')
        .then(function(text) {
          if (text !== 'Probability') {
            expect(false).customError('"Y" axis title did not match with "Probability"; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

  });

  describe('Test Step ID: 563394', function() {

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

    it('Should select "Change Series" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Change Series').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    var items = ['Port. Weight', 'Bench. Weight', 'Difference', 'Add Series'];

    items.forEach(function(ele) {
      it('Verifying if "' + ele + '" is display in Change Series menu drop down', function() {
        ThiefHelpers.getMenuClassReference(2)._getItemByText(ele).isDisplayed().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + ele + '" did not display in Change Series menu drop down');
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {
          expect(false).customError('"' + ele + '" did not display in the drop down due to ' + err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Verifying if "Bench. Weight" is selected by default', function() {
      var xpathOfBenchWeight = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathActiveOptionFromWrenchMenu, 'Bench. Weight');
      element(by.xpath(xpathOfBenchWeight)).isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Bench. Weight" did not get select by default');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 563391', function() {

    it('Should select "Difference" from the drop down', function() {
      ThiefHelpers.getMenuClassReference(2).selectItemByText('Difference').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Verifying if chart name is changed to "Difference"', function() {
      PA3MainPage.isInChartFormat('Difference').then(function(flag) {
        if (!flag) {
          expect(false).customError('Chart name did not change to "Difference"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Difference" is displayed as chart legends', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.indexOf('Difference') === -1) {
          expect(false).customError('"Difference" did not displayed as Legend; Found: ' + val);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying only 1 "Difference" legend is displayed in chart', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.length !== 1) {
          expect(false).customError('More than 1 legends are displayed in chart');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if Y axis values are  in percentage', function() {
      ChartHelpers.getXorYAxisLabels('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y').then(function(arr) {
        arr.forEach(function(value) {
          if (value.indexOf('%') < 0) {
            expect(false).customError('"Y axis" values did not display as percentage; Found' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Y" axis title text is "Probability"', function() {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'Y', 'TitleText')
        .then(function(text) {
          if (text !== 'Probability') {
            expect(false).customError('"Y" axis title did not match with "Probability"; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

  });

  describe('Test Step ID: 563392', function() {

    it('Should perform right click on any bar', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
    });

    it('Should hover on "Change Series" after perform right click', function() {
      browser.actions().mouseMove(ChartingUtilities.getOptionAfterRightClickOnChart('Change Series')).perform();

      // Wait to element appear
      browser.sleep(2000);
    });

    it('Should select "Add Series" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('Add Series').click().then(function() {
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

    it('Should select "Ending Price" from selected section', function() {
      // Getting the xpath of the Selected section
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Ending Price');
      item.select();

      // Check if element is selected
      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Ending Price" did not selected from "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Show Column" checkbox to checkoff', function() {
      ThiefHelpers.getCheckBoxClassReference('Show Column').check();
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

    it('Should wait for "Weight" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Should click on the "Wrench" button from report', function() {
      PA3MainPage.selectWrenchIcon('Difference');

      //Verifying menu drop down is appeared'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Menu drop down list did not display in "Difference" report workspace.');
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

    it('Should select "Price" from the "Chart Type" drop down', function() {
      ThiefHelpers.getMenuClassReference(2).selectItemByText('Price').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
      browser.sleep(8000);

    });

    it('Verifying if chart name is changed to "Price"', function() {
      PA3MainPage.isInChartFormat('Price').then(function(flag) {
        if (!flag) {
          expect(false).customError('Chart name did not change to "Price"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Price" is displayed as chart legends', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.indexOf('Price') === -1) {
          expect(false).customError('"Price" did not displayed as Legend; Found: ' + val);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying only 1 "Price" legend is displayed in chart', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.length !== 1) {
          expect(false).customError('More than 1 legends are displayed in chart');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 563393', function() {

    it('Should click on chart toolbar wrench icon from "Price"', function() {
      PA3MainPage.selectWrenchIcon('Price');

      browser.sleep(2000);
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

    it('Verifying if "Display Options" drop down is opened', function() {
      ChangeSeries.getDialog('Display Options').isDisplayed().then(function(flag) {
        if (!flag) {
          expect(false).customError('Display Options drop down did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Display Values" drop down and select "Greater than"', function() {
      ThiefHelpers.selectOptionFromDropDown('Greater than', 'Display Values');
    });

    it('Verifying if Display Values drop down is set to "Greater than"', function() {
      ThiefHelpers.verifySelectedDropDownText('Greater than', 'Display Values');
    });

    it('Should enter "100" in the search field from Available section', function() {
      ThiefHelpers.getTextBoxClassReference('Values').setText('100');

      // Verifying that "100" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Values').getText().then(function(text) {
        if (text !== '100') {
          expect(false).customError('"100" did not type into the search field.; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if X axis values are greater than 100', function() {
      ChartHelpers.getXorYAxisLabels('.pa-chart-non-formatting-mode', '$fdsChartController', 'X').then(function(arr) {
        arr.forEach(function(value, index) {
          // Excluding first value from array due starting value will always less than 100
          if (index !== 0) {
            if (value < 100) {
              expect(false).customError('"X axis" values did not greater than 100; Found' + value);
              CommonFunctions.takeScreenShot();
            }
          }

        });
      });
    });

  });

  describe('Test Step ID: 563447', function() {

    it('Should click on "Display Values" drop down and select "Less than"', function() {
      ThiefHelpers.selectOptionFromDropDown('Less than', 'Display Values');
    });

    it('Verifying if Display Values drop down is set to "Less than"', function() {
      ThiefHelpers.verifySelectedDropDownText('Less than', 'Display Values');
    });

    it('Verifying if X axis values are less than 100', function() {
      ChartHelpers.getXorYAxisLabels('.pa-chart-non-formatting-mode', '$fdsChartController', 'X').then(function(arr) {
        arr.forEach(function(value) {
          if (value > 100) {
            expect(false).customError('"X axis" values did not less than 100; Found' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 568754', function() {

    it('Should perform right click on any bar in chart', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
    });

    it('Should hover on "Show Series Y-Axis" after perform right click', function() {
      browser.actions().mouseMove(ChartingUtilities.getOptionAfterRightClickOnChart('Show Series Y-Axis')).perform();

      // Wait to element appear
      browser.sleep(2000);
    });

    var options = ['On Left', 'On Right', 'On Neither'];

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

  });

  describe('Test Step ID: 568760', function() {

    it('Should select "On Left" from the drop down', function() {
      ChartingUtilities.getOptionAfterRightClickOnChart('On Left').click().then(function() {
        // Wait 2 seconds until chart loads
        browser.sleep(2000);
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should perform right click on any bar in chart', function() {
      ChartHelpers.rightClickOnSeries('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1');
    });

    it('Should hover on "Show Series Y-Axis" after perform right click', function() {
      browser.actions().mouseMove(ChartingUtilities.getOptionAfterRightClickOnChart('Show Series Y-Axis')).perform();

      // Wait to element appear
      browser.sleep(2000);
    });

    var options = ['On Left', 'On Right', 'On Neither'];

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

    it('Verifying if "On Left" is selected by default', function() {
      var xpathOf2DIconAfterRightClick = CommonFunctions.replaceStringInXpath(ChartingUtilities.xpathIconAfterRightClick, 'On Left');
      element(by.xpath(xpathOf2DIconAfterRightClick)).isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"On Left" did not active by default');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Series 1" axis display in "Left" position', function() {
      ChartHelpers.getYAxisPosition('.pa-chart-non-formatting-mode', '$fdsChartController', 'Series 1').then(function(value) {
        if (value !== 'Left') {
          expect(false).customError('"Series 1" axis did not display at "Left" position; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 563448', function() {

    it('Should click on the "Wrench" icon in the "Price" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Price').click().then(function() {
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

    it('Verifying if view changed to "Tile Options - Price" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Price') {
          expect(false).customError('"Tile Options - Price" view has not appeared. ' +
            'Expected: "Tile Options - Price" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Dates" from LHP', function() {
      TileOptions.getLHPOption('Dates').click();

      // Verifying that view changed to "Dates"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Dates') {
          expect(false).customError('"Dates" is not selected from LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select Report frequency as "Monthly",in "Tile Options - Weights" view', function() {
      ThiefHelpers.selectOptionFromDropDown('Monthly', 'Report Frequency:', undefined, '');

      // Verifying if Monthly is selected from the dropdwn
      ThiefHelpers.verifySelectedDropDownText('Monthly', 'Report Frequency:');
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

    it('Should expand "Energy Minerals>  Integrated Oil" and select "Exxon Mobil Corporation"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference().getGroupByText('Energy Minerals');
      group.expand();
      group.getGroupByText('Integrated Oil').then(function(childGroup) {
        childGroup.expand();
        childGroup.getItemByText('Exxon Mobil Corporation').then(function(listItem) {
          listItem.select();
        });
      });
    });

    it('Verifying if "Energy Minerals>  Integrated Oil" is expanded', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference().getGroupByText('Energy Minerals');
      group.getGroupByText('Integrated Oil').then(function(childGroup) {
        childGroup.isExpanded().then(function(bool) {
          if (bool !== true) {
            expect(false).customError('"Integrated Oil" is not expanded under "Energy Minerals" in "Interactive Pane"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Energy Minerals|Integrated Oil|Exxon Mobil Corporation" is selected', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference().getGroupByText('Energy Minerals');
      group.getGroupByText('Integrated Oil').then(function(childGroup) {
        childGroup.getItemByText('Exxon Mobil Corporation').then(function(childItem) {
          childItem.isSelected().then(function(isSelected) {
            if (!isSelected) {
              expect(false).customError('"Exxon Mobil Corporation" under "Energy Minerals|Integrated Oil" is not selected in "Interactive Pane"');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying "Exxon Mobil Corporation" is displayed as chart legends', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.indexOf('Exxon Mobil Corporation') === -1) {
          expect(false).customError('"Exxon Mobil Corporation" did not displayed as Legend; Found: ' + val);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying only 1 "Exxon Mobil Corporation" legend is displayed in chart', function() {
      ChartHelpers.getLegends('.pa-chart-non-formatting-mode', '$fdsChartController', 'Chart').then(function(val) {
        if (val.length !== 1) {
          expect(false).customError('More than 1 legends are displayed in chart');
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

    it('Verifying between two bars space is available', function() {
      ChartHelpers.getXorYAxisPropertiesByAttribute('.pa-chart-non-formatting-mode', '$fdsChartController', 'X', 'BinFactor').then(function(val) {
        if (val !== 0.8) {
          expect(false).customError('Space is not available between two bars, Found: ' + val);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
