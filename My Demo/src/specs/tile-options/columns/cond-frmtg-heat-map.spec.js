'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: cond-frmtg-heat-map', function() {

  // Global variables
  var tickerArrayForPortAvgWeightColumn = [];
  var tickerArrayForBeginningPriceColumn = [];
  var red = [];
  var green = [];
  var blue = [];
  var alphaChannel = [];
  var tickerArrayForPriceChangeColumn = [];

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  describe('Test Step ID: 565979', function() {

    var priceChangeColumnDataArray = [];
    var temp = [];
    var screenShot = 0;

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "cond-frmtg-heat-map" document from "Client:/PA3/Formatting/"', function() {
      PA3MainPage.switchToDocument('cond-frmtg-heat-map');
    });

    it('Should wait for "Sector Weights" report to calculate', function() {
      // Waiting for "Sector Weights" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Sector Weights'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          expect(false).customError('"Calculation Error" found while report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Sector Weights" report calculated without any error', function() {
      PA3MainPage.isReportCalculated('Sector Weights').then(function(reportStatus) {
        if (reportStatus === false) {
          expect(false).customError('"Sector Weights" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          PA3MainPage.isReportCalculated('Sector Weights').then(function() {
          }, function(error) {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Contribution" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Reports', 'Contribution').then(function(reportRef) {
        reportRef.click().then(function() {
        }, function() {
          expect(false).customError('Unable to select "Contribution" from LHP');
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Should wait for "Contribution" report to calculate', function() {
      // Waiting for "Contribution" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Contribution'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          expect(false).customError('"Calculation Error" found while report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Contribution" report calculated without any error', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(reportStatus) {
        if (reportStatus === false) {
          expect(false).customError('"Contribution" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          PA3MainPage.isReportCalculated('Contribution').then(function() {
          }, function(error) {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "10/26/2015 - 11/13/2015" date hyperlink is displayed', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(date) {
        if (date !== '10/26/2015 - 11/13/2015') {
          expect(false).customError('"10/26/2015 - 11/13/2015" date hyperlink is not displayed instead "' + date + '" display' +
            'ed ');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should get "Price Change (%)" column date', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Price Change (%)').then(function(columnData) {
        columnData.forEach(function(value, index) {
          if ((value !== 'NA') && (index > 0)) {
            priceChangeColumnDataArray.push(parseFloat(value).toFixed(2));
          }
        });
      });
    });

    it('Verifying if "Price Change (%)" column data is sorted in "Descending" order', function() {
      temp = priceChangeColumnDataArray;
      temp.sort(function(a, b) {
        return b - a;
      });
      for (var i = 0; i < priceChangeColumnDataArray.length; i++) {
        if (temp[i] !== priceChangeColumnDataArray[i]) {
          expect(false).customError('"Price Change (%)" column data is not sorted in "Descending" order at row number "' + (i + 1) + '"');
          screenShot++;
        }

        if (screenShot === 1) {
          CommonFunctions.takeScreenShot();
        }
      }
    });

  });

  describe('Test Step ID: 565981', function() {

    var priceChangeColumnDataArray = [];
    var temp = [];
    var screenShot = 0;
    var bgcolorArray = [];

    it('Should click on the Wrench icon in the "Contribution" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Contribution').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying if wrench menu list is displayed in "Contribution" report workspace'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Wrench menu drop down list is not displayed in ' +
            '"Contribution" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from wrench drop down of "Contribution" report workspace', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function() {
        expect(false).customError('Unable to select "Options" from the Wrench drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode appeared', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (!option) {
          expect(false).customError('"Tile Options" mode is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Columns" in the LHP of tile options', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('View not changed to "Columns"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Port. Average Weight" item in selected section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Port. Average Weight').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Port. Average Weight" item in selected section');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should press "Ctrl" key', function() {
      // Holding Ctrl key
      browser.actions().keyDown(protractor.Key.CONTROL).perform();
    });

    it('Should select "Beginning Price"', function() {
      // Select "Beginning Price" item From "Selected" section
      TileOptionsColumns.getElementFromSelectedSection('Beginning Price').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Beginning Price" item in selected section');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should release "Ctrl" key', function() {
      // Releasing the Ctrl key
      browser.actions().keyUp(protractor.Key.CONTROL).perform();
    });

    it('Should click on "CONDITIONAL FORMATTING" accordion', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Conditional Formatting').then(function(expandStatus) {
        if (!expandStatus) {
          expect(expandStatus).customError('"CONDITIONAL FORMATTING" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "CONDITIONAL FORMATTING" accordion is expanded', function() {
      TileOptionsColumns.getExpandableElement('Conditional Formatting').getAttribute('class').then(function(status) {
        if (status.indexOf('collapsed') > 0) {
          expect(false).customError('"CONDITIONAL FORMATTING" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Type" drop down and select "Heat Map"', function() {
      ThiefHelpers.selectOptionFromDropDown('Heat Map', 'Type');
    });

    it('Verifying if "Heat Map" is selected in "Type" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Heat Map', 'Type');
    });

    it('Should click on "Column" drop down and select "Price Change (%)"', function() {
      ThiefHelpers.selectOptionFromDropDown('Price Change (%)', 'Column');
    });

    it('Verifying if "Price Change (%)" is selected in "Column" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Price Change (%)', 'Column');
    });

    it('Should click on "OK" button in "Tile Options -  Contribution"', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in "Tile Options -  Contribution"');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Tile Options" mode disappeared', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is not disappeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Contribution" report to calculate', function() {
      // Waiting for "Contribution" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Contribution'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          expect(false).customError('"Calculation Error" found while report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Contribution" report calculated without any error', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(reportStatus) {
        if (reportStatus === false) {
          expect(false).customError('"Contribution" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          PA3MainPage.isReportCalculated('Contribution').then(function() {
          }, function(error) {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should get "Price Change (%)" column date', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Price Change (%)').then(function(columnData) {
        columnData.forEach(function(value, index) {
          if ((value !== 'NA') && (index > 0)) {
            priceChangeColumnDataArray.push(parseFloat(value).toFixed(2));
          }
        });
      });
    });

    it('Verifying if "Price Change (%)" column data is sorted in "Descending" order', function() {
      temp = priceChangeColumnDataArray;
      temp.sort(function(a, b) {
        return b - a;
      });
      for (var i = 0; i < priceChangeColumnDataArray.length; i++) {
        if (temp[i] !== priceChangeColumnDataArray[i]) {
          expect(false).customError('"Price Change (%)" column data is not sorted in "Descending" order at number "' + i + '"');
          screenShot++;
        }

        if (screenShot === 1) {
          CommonFunctions.takeScreenShot();
        }
      }
    });

    it('Should get "Tickers" for associated "Port. Average Weight" column values which are not null', function() {
      tickerArrayForPortAvgWeightColumn = [];

      // Fetching all cell values from "Ticker" Column
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker, index) {
          if (index > 0) {
            // Fetching cell reference
            SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Port. Average Weight').then(function(cellRef) {
              cellRef.getText().then(function(cellValue) {
                if (cellValue !== '--') {
                  tickerArrayForPortAvgWeightColumn.push(ticker);
                }
              });
            });
          }
        });
      });
    });

    it('Should get the "rgb" values of the "Port. Average Weight" column cells who\'s values are not null', function() {
      tickerArrayForPortAvgWeightColumn.forEach(function(ticker) {
        PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Port. Average Weight', undefined, undefined,
          true, undefined).then(function(ref) {
          Utilities.scrollElementToVisibility(ref);

          // Getting background color for each reference
          Utilities.getBgColor(ref.element(by.xpath('./div'))).then(function(bgcolor) {
            bgcolorArray.push(bgcolor);
          });
        });
      });
    });

    it('Verifying if "Port. Average Weight" column starting cell is colored with brightest green and ending cell is colored' +
      'with brightest red', function() {
      red = [];
      green = [];
      blue = [];
      alphaChannel = [];
      if (bgcolorArray[0] === 'rgba(0, 255, 0, 1)' && bgcolorArray[bgcolorArray.length - 1] === 'rgba(255, 0, 0, 1)') {
        for (var i = 0; i < bgcolorArray.length; i++) {
          var color = bgcolorArray[i].match(/\d+/g);
          red.push(parseInt(color[0]));
          green.push(parseInt(color[1]));
          blue.push(parseInt(color[2]));
          alphaChannel.push(parseInt(color[3]));
        }
      } else {
        if (bgcolorArray[0] !== 'rgba(0, 255, 0, 1)') {
          expect(false).customError('"Port. Average Weight" column starting cell is not colored with brightest green');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError('"Port. Average Weight" column ending cell is colored with brightest red');
          CommonFunctions.takeScreenShot();
        }
      }
    });

    it('Verifying if "Port. Average Weight" column cell values are colored starting from brightest green, fading' +
      ' toward the base color, eventually it will start with slight red toward brightest red at end by using "rgb" values',
      function() {
        var flag = true;
        var temp = 0;
        var screenShot = 0;
        for (var i = 0; i < red.length; i++) {
          if (green[i] === 255 && flag === true) {
            if (red[i] === 255 && blue[i] === 255) {
              flag = false;
              temp = i;
            }

            if (red[i] > red[i + 1] || blue[i] > blue[i + 1]) {
              if (flag === true) {
                expect(false).customError('"Port. Average Weight" column cell color is light color for "' + (i + 1) + '" row when' +
                  ' compared to "' + (i + 2) + '" row');
                screenShot = screenShot + 1;
              }
            }
          }

          if (red[i] === 255 && flag === false && temp !== i) {
            if ((green[i] < green[i + 1]) || (blue[i] < blue[i + 1])) {
              expect(false).customError('"Port. Average Weight" column cell color is brighter for "' + (i + 1) + '" row when' +
                ' compared to "' + (i + 2) + '" row');
              screenShot = screenShot + 1;
            }
          }
        }

        if (screenShot > 0) {
          CommonFunctions.takeScreenShot();
        }

      });

    it('Should get "Tickers" for associated "Beginning Price" column values which are not null', function() {
      tickerArrayForBeginningPriceColumn = [];
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker, index) {
          if (index > 0) {
            SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Beginning Price').then(function(cellRef) {
              cellRef.getText().then(function(cellValue) {
                if (cellValue !== '--') {
                  tickerArrayForBeginningPriceColumn.push(ticker);
                }
              });
            });
          }
        });
      });
    });

    it('Should get the "rgb" values of the "Beginning Price" column cells who\'s values are not null', function() {
      bgcolorArray = [];
      tickerArrayForBeginningPriceColumn.forEach(function(ticker) {
        PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Beginning Price', undefined, undefined,
          true, undefined).then(function(ref) {
          Utilities.scrollElementToVisibility(ref);
          Utilities.getBgColor(ref.element(by.xpath('./div'))).then(function(bgcolor) {
            bgcolorArray.push(bgcolor);
          });
        });
      });
    });

    it('Verifying if Beginning Price column starting cell is colored with brightest green and ending cell is colored' +
      'with brightest red', function() {
      red = [];
      green = [];
      blue = [];
      alphaChannel = [];
      if (bgcolorArray[0] === 'rgba(0, 255, 0, 1)' && bgcolorArray[bgcolorArray.length - 1] === 'rgba(255, 0, 0, 1)') {
        for (var i = 0; i < bgcolorArray.length; i++) {
          var color = bgcolorArray[i].match(/\d+/g);
          red.push(parseInt(color[0]));
          green.push(parseInt(color[1]));
          blue.push(parseInt(color[2]));
          alphaChannel.push(parseInt(color[3]));
        }
      }
    });

    it('Verifying if "Beginning Price" column cell values are colored starting from brightest green, fading' +
      ' toward the base color, eventually it will start with slight red toward brightest red at end by using "rgb" values',
      function() {
        var flag = true;
        var temp = 0;
        var screenShot = 0;
        for (var i = 0; i < red.length; i++) {
          if ((green[i] === 255) && (flag === true)) {

            if ((red[i] === 255) && (blue[i] === 255)) {
              flag = false;
              temp = i;
            }

            if ((red[i] > red[i + 1]) || (blue[i] > blue[i + 1])) {
              if (flag === true) {
                expect(false).customError('"Beginning Price" column cell color is light color for "' + (i + 1) + '" row when' +
                  ' compared to "' + (i + 2) + '" row');
                screenShot = screenShot + 1;
              }
            }
          }

          if ((red[i] === 255) && (flag === false) && (temp !== i)) {
            if ((green[i] < green[i + 1]) || (blue[i] < blue[i + 1])) {
              expect(false).customError('"Beginning Price" column cell color is brighter for "' + (i + 1) + '" row when' +
                ' compared to "' + (i + 2) + '" row');
              screenShot = screenShot + 1;
            }
          }
        }

        if (screenShot > 0) {
          CommonFunctions.takeScreenShot();
        }

      });

    it('Should get "Tickers" for corresponding "Price Change (%)" column values which are blank or NA\'s', function() {
      tickerArrayForPriceChangeColumn = [];
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker, index) {
          if (index > 0) {
            SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Price Change (%)').then(function(cellRef) {
              cellRef.getText().then(function(cellValue) {
                if (cellValue === '--') {
                  tickerArrayForPriceChangeColumn.push(ticker);
                }
              });
            });
          }
        });
      });
    });

    it('Verifying if the "Port. Average Weight" column cells with corresponding "Price Change (%)"' +
      'blank values or NA\'s are not colored', function() {
      tickerArrayForPriceChangeColumn.forEach(function(ticker) {
        PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Port. Average Weight', undefined, undefined,
          true, undefined).then(function(ref) {
          Utilities.scrollElementToVisibility(ref);
          Utilities.getBgColor(ref.element(by.xpath('./div'))).then(function(bgcolor) {
            if (bgcolor !== 'rgba(255, 255, 255, 1)') {
              expect(false).customError('Port. Average Weight" column cell with corresponding ' +
                '"Price Change (%)" blank values or NA\'s of "' + ticker + '" Ticker is colored with "' + bgcolor + '"');
            }
          });
        });
      });
    });

    it('Verifying if the "Beginning Price" column cells with corresponding "Price Change (%)"' +
      'blank values or NA\'s are not colored', function() {
      tickerArrayForPriceChangeColumn.forEach(function(ticker) {
        PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Beginning Price', undefined, undefined,
          true, undefined).then(function(ref) {
          Utilities.scrollElementToVisibility(ref);
          Utilities.getBgColor(ref.element(by.xpath('./div'))).then(function(bgcolor) {
            if (bgcolor !== 'rgba(255, 255, 255, 1)') {
              expect(false).customError('Beginning Price" column cell with corresponding ' +
                '"Price Change (%)" blank values or NA\'s of "' + ticker + '" Ticker is colored with "' + bgcolor + '"');
            }
          });
        });
      });
    });

  });

  describe('Test Step ID: 566779', function() {

    var priceChangeColumnDataArray = [];
    var temp = [];
    var screenShot = 0;
    var bgcolorArray = [];

    it('Should click on the Wrench icon in the "Contribution" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Contribution').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying if wrench menu list is displayed in "Contribution" report workspace'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Wrench menu drop down list is not displayed in ' +
            '"Contribution" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from wrench drop down of "Contribution" report workspace', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function() {
        expect(false).customError('Unable to select "Options" from the Wrench drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode appeared', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (!option) {
          expect(false).customError('"Tile Options" mode is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Columns" on the LHP of tile options', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('View not changed to "Columns"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Beginning Price" item in selected section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Beginning Price').click().then(function() {
        },
        function() {
          expect(false).customError('Unable to click on "Beginning Price" item in selected section');
          CommonFunctions.takeScreenShot();
        });
    });

    it('Should click on "CONDITIONAL FORMATTING" accordion', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Conditional Formatting').then(function(expandStatus) {
        if (!expandStatus) {
          expect(expandStatus).customError('"CONDITIONAL FORMATTING" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "CONDITIONAL FORMATTING" accordion is expanded', function() {
      TileOptionsColumns.getExpandableElement('Conditional Formatting').getAttribute('class').then(function(status) {
        if (status.indexOf('collapsed') > 0) {
          expect(false).customError('"CONDITIONAL FORMATTING" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Distribution" drop down and select "Linear"', function() {
      ThiefHelpers.selectOptionFromDropDown('Linear', 'Distribution:');
    });

    it('Verifying if "Linear" is selected in "Distribution" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Linear', 'Distribution:');
    });

    it('Should click on "OK" button in "Tile Options -  Contribution"', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in "Tile Options -  Contribution"');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Tile Options" mode disappeared', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is not disappeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Contribution" report to calculate', function() {
      // Waiting for "Contribution" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Contribution'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          expect(false).customError('"Calculation Error" found while report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Contribution" report calculated without any error', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(reportStatus) {
        if (reportStatus === false) {
          expect(false).customError('"Contribution" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          PA3MainPage.isReportCalculated('Contribution').then(function() {
          }, function(error) {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should get "Price Change (%)" column date', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Price Change (%)').then(function(columnData) {
        columnData.forEach(function(value, index) {
          if ((value !== 'NA') && (index > 0)) {
            priceChangeColumnDataArray.push(parseFloat(value).toFixed(2));
          }
        });
      });
    });

    it('Verifying if "Price Change (%)" column data is sorted in "Descending" order', function() {
      temp = priceChangeColumnDataArray;
      temp.sort(function(a, b) {
        return b - a;
      });
      for (var i = 0; i < priceChangeColumnDataArray.length; i++) {
        if (temp[i] !== priceChangeColumnDataArray[i]) {
          expect(false).customError('"Price Change (%)" column data is not sorted in "Descending" order at number "' + i + '"');
          screenShot++;
        }

        if (screenShot === 1) {
          CommonFunctions.takeScreenShot();
        }
      }
    });

    it('Should get "Tickers" for the corresponding "Price Change (%)" column which shows "0" or "blanks" values', function() {
      tickerArrayForPriceChangeColumn = [];
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker, index) {
          if (index > 0) {
            SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Price Change (%)').then(function(cellRef) {
              cellRef.getText().then(function(cellValue) {
                if (cellValue === '--' || cellValue === '0.00') {
                  tickerArrayForPriceChangeColumn.push(ticker);
                }
              });
            });
          }
        });
      });

      SlickGridFunctions.scrollRowToTop('Contribution', 0);
    });

    it('Verifying if the "Beginning Price" column cells for the corresponding "Price Change (%)" ' +
      'column which shows "0" or "blanks" values are not colored', function() {
      screenShot = 0;
      tickerArrayForPriceChangeColumn.forEach(function(ticker) {
        PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Beginning Price', undefined, undefined,
          true, undefined).then(function(ref) {
          Utilities.scrollElementToVisibility(ref);
          Utilities.getBgColor(ref.element(by.xpath('./div'))).then(function(bgcolor) {
            if (bgcolor !== 'rgba(255, 255, 255, 1)') {
              expect(false).customError('"Beginning Price" column cells for the corresponding "Price Change (%)"' +
                'column which shows "0" or "blanks" values are colored who\'s corresponding ticker is "' + ticker + '"');
              screenShot = screenShot + 1;
            }
          });
        });
      });
      if (screenShot > 0) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should get "Tickers" for associated "Port. Average Weight" column values which are not null', function() {
      tickerArrayForPortAvgWeightColumn = [];
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker, index) {
          if (index > 0) {
            SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Port. Average Weight').then(function(cellRef) {
              cellRef.getText().then(function(cellValue) {
                if (cellValue !== '--') {
                  tickerArrayForPortAvgWeightColumn.push(ticker);
                }
              });
            });
          }
        });
      });
    });

    it('Should get the "rgb" values of the "Port. Average Weight" column cells who\'s values are not null', function() {
      tickerArrayForPortAvgWeightColumn.forEach(function(ticker) {
        PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Port. Average Weight', undefined, undefined,
          true, undefined).then(function(ref) {
          Utilities.scrollElementToVisibility(ref);
          Utilities.getBgColor(ref.element(by.xpath('./div'))).then(function(bgcolor) {
            bgcolorArray.push(bgcolor);
          });
        });
      });
    });

    it('Verifying if "Port. Average Weight" column starting cell is colored with brightest green and ending cell is colored' +
      'with brightest red', function() {
      red = [];
      green = [];
      blue = [];
      alphaChannel = [];
      if (bgcolorArray[0] === 'rgba(0, 255, 0, 1)' && bgcolorArray[bgcolorArray.length - 1] === 'rgba(255, 0, 0, 1)') {
        for (var i = 0; i < bgcolorArray.length; i++) {
          var color = bgcolorArray[i].match(/\d+/g);
          red.push(parseInt(color[0]));
          green.push(parseInt(color[1]));
          blue.push(parseInt(color[2]));
          alphaChannel.push(parseInt(color[3]));
        }
      } else {
        if (bgcolorArray[0] !== 'rgba(0, 255, 0, 1)') {
          expect(false).customError('"Port. Average Weight" column starting cell is not colored with brightest green');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError('"Port. Average Weight" column ending cell is colored with brightest red');
          CommonFunctions.takeScreenShot();
        }
      }
    });

    it('Verifying if "Port. Average Weight" column cell values are colored starting from brightest green, fading' +
      ' toward the base color, eventually it will start with slight red toward brightest red at end by using "rgb" values',
      function() {
        var flag = true;
        var temp = 0;
        var screenShot = 0;
        for (var i = 0; i < red.length; i++) {
          if (green[i] === 255 && flag === true) {
            if (red[i] === 255 && blue[i] === 255) {
              flag = false;
              temp = i;
            }

            if (red[i] > red[i + 1] || blue[i] > blue[i + 1]) {
              if (flag === true) {
                expect(false).customError('"Port. Average Weight" column cell color is light color for "' + (i + 1) + '" row when' +
                  ' compared to "' + (i + 2) + '" row');
                screenShot = screenShot + 1;
              }
            }
          }

          if (red[i] === 255 && flag === false && temp !== i) {
            if ((green[i] < green[i + 1]) || (blue[i] < blue[i + 1])) {
              expect(false).customError('"Port. Average Weight" column cell color is brighter for "' + (i + 1) + '" row when' +
                ' compared to "' + (i + 2) + '" row');
              screenShot = screenShot + 1;
            }
          }
        }

        if (screenShot > 0) {
          CommonFunctions.takeScreenShot();
        }

      });

    it('Should get "Tickers" for associated "Beginning Price" column values which are not null', function() {
      tickerArrayForBeginningPriceColumn = [];
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker, index) {
          if (index > 0) {
            SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Beginning Price').then(function(cellRef) {
              cellRef.getText().then(function(cellValue) {
                if (cellValue !== '--') {
                  tickerArrayForBeginningPriceColumn.push(ticker);
                }
              });
            });
          }
        });
      });
    });

    it('Should get the "rgb" values of the "Beginning Price" column cells who\'s values are not null', function() {
      bgcolorArray = [];
      tickerArrayForBeginningPriceColumn.forEach(function(ticker) {
        PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Beginning Price', undefined, undefined,
          true, undefined).then(function(ref) {
          Utilities.scrollElementToVisibility(ref);
          Utilities.getBgColor(ref.element(by.xpath('./div'))).then(function(bgcolor) {
            bgcolorArray.push(bgcolor);
          });
        });
      });
    });

    it('Verifying if "Beginning Price" column starting cell is colored with brightest green and ending cell is colored' +
      'with brightest red', function() {
      red = [];
      green = [];
      blue = [];
      alphaChannel = [];
      if (bgcolorArray[0] === 'rgba(0, 255, 0, 1)' && bgcolorArray[bgcolorArray.length - 1] === 'rgba(255, 0, 0, 1)') {
        for (var i = 0; i < bgcolorArray.length; i++) {
          var color = bgcolorArray[i].match(/\d+/g);
          red.push(parseInt(color[0]));
          green.push(parseInt(color[1]));
          blue.push(parseInt(color[2]));
          alphaChannel.push(parseInt(color[3]));
        }
      } else {
        if (bgcolorArray[0] !== 'rgba(0, 255, 0, 1)') {
          expect(false).customError('"Beginning Price" column starting cell is not colored with brightest green');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError('"Beginning Price" column ending cell is colored with brightest red');
          CommonFunctions.takeScreenShot();
        }
      }
    });

    it('Verifying if "Beginning Price" column cell values are colored starting from brightest green, fading' +
      ' toward the base color, eventually it will start with slight red toward brightest red at end by using "rgb" values',
      function() {
        var flag = true;
        var temp = 0;
        var screenShot = 0;
        for (var i = 0; i < red.length; i++) {
          if ((green[i] === 255) && (flag === true)) {

            if ((red[i] === 255) && (blue[i] === 255)) {
              flag = false;
              temp = i;
            }

            if ((red[i] > red[i + 1]) || (blue[i] > blue[i + 1])) {
              if (flag === true) {
                expect(false).customError('"Beginning Price" column cell color is light color for "' + (i + 1) + '" row when' +
                  ' compared to "' + (i + 2) + '" row');
                screenShot = screenShot + 1;
              }
            }
          }

          if ((red[i] === 255) && (flag === false) && (temp !== i)) {
            if ((green[i] < green[i + 1]) || (blue[i] < blue[i + 1])) {
              expect(false).customError('"Beginning Price" column cell color is brighter for "' + (i + 1) + '" row when' +
                ' compared to "' + (i + 2) + '" row');
              screenShot = screenShot + 1;
            }
          }
        }

        if (screenShot > 0) {
          CommonFunctions.takeScreenShot();
        }

      });

  });

  describe('Test Step ID: 566793', function() {

    var bgcolorArray = [];

    it('Should click on the Wrench icon in the "Contribution" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Contribution').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying if wrench menu list is displayed in "Contribution" report workspace'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Wrench menu drop down list is not displayed in ' +
            '"Contribution" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from wrench drop down of "Contribution" report workspace', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function() {
        expect(false).customError('Unable to select "Options" from the Wrench drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode appeared', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (!option) {
          expect(false).customError('"Tile Options" mode is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Columns" on the LHP of tile options', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('View not changed to "Columns"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Conditional Formatting" accordion', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Conditional Formatting').then(function(expandStatus) {
        if (!expandStatus) {
          expect(expandStatus).customError('"Conditional Formatting" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Conditional Formatting" accordion is expanded', function() {
      TileOptionsColumns.getExpandableElement('Conditional Formatting').getAttribute('class').then(function(status) {
        if (status.indexOf('collapsed') > 0) {
          expect(false).customError('"Conditional Formatting" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Beginning Price" item in selected section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Beginning Price').click().then(function() {
        },
        function() {
          expect(false).customError('Unable to click on "Beginning Price" item in selected section');
          CommonFunctions.takeScreenShot();
        });
    });

    it('Should press "Ctrl" key', function() {
      // Holding Ctrl key
      browser.actions().keyDown(protractor.Key.CONTROL).perform();
    });

    it('Should select "Ending Price"', function() {
      // Select "Ending Price" item From "Selected" section
      TileOptionsColumns.getElementFromSelectedSection('Ending Price').click().then(function() {
        },
        function() {
          expect(false).customError('Unable to click on "Ending Price" item in selected section');
          CommonFunctions.takeScreenShot();
        });
    });

    it('Should release "Ctrl" key', function() {
      // Releasing the Ctrl key
      browser.actions().keyUp(protractor.Key.CONTROL).perform();
    });

    it('Should click on "Ending Price" item in selected section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Ending Price').click().then(function() {
        },
        function() {
          expect(false).customError('Unable to click on "Ending Price" item in selected section');
          CommonFunctions.takeScreenShot();
        });
    });

    it('Select the "Clamp Data at +/- (Standard Deviation)" Adjuster and drag it to the far left', function() {
      ThiefHelpers.getSliderClassReference('Clamp Data at +/- (Standard Deviation)').setValue(0);
    });

    it('Should click on the "Clamp Data at +/- (Standard Deviation):" slider handle', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathSliderHandle, 'Clamp Data at +/- (Standard Deviation)');
      element(by.xpath(xpath)).click().then(function() {
      }, function() {
        expect(false).customError('Unable to "Clamp Data at +/- (Standard Deviation)" Adjuster and drag it to the far left');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Clamp Data at +/- (Standard Deviation)" input box set to "0"', function() {
      ThiefHelpers.getTextBoxClassReference('Clamp Data at +/- (Standard Deviation)', undefined).getText().then(function(text) {
        if (text !== '0') {
          expect(false).customError('The "Clamp Data at +/- (Standard Deviation)" input box is not set to "0"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in "Tile Options -  Contribution"', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in "Tile Options -  Contribution"');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Tile Options" mode disappeared', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is not disappeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Contribution" report to calculate', function() {
      // Waiting for "Contribution" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Contribution'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          expect(false).customError('"Calculation Error" found while report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Contribution" report calculated without any error', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(reportStatus) {
        if (reportStatus === false) {
          expect(false).customError('"Contribution" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          PA3MainPage.isReportCalculated('Contribution').then(function() {
          }, function(error) {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should get "Tickers" for the corresponding "Price Change (%)" column which displays values expect "0.00" and "--"', function() {
      tickerArrayForPriceChangeColumn = [];
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker, index) {
          if (index > 0) {
            SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Price Change (%)').then(function(cellRef) {
              cellRef.getText().then(function(cellValue) {
                if (cellValue !== '--') {
                  tickerArrayForPriceChangeColumn.push(ticker);
                }
              });
            });
          }
        });
      });
    });

    it('Verifying if "Ending Price" column starting cell is colored with brightest green and ending cell is colored' +
      ' with brightest red', function() {
      tickerArrayForPriceChangeColumn.forEach(function(ticker, index) {
        PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Ending Price', undefined, undefined,
          true, undefined).then(function(ref) {
          Utilities.scrollElementToVisibility(ref);
          Utilities.getBgColor(ref.element(by.xpath('./div'))).then(function(color) {
            if (index === 1) {
              if (color !== 'rgba(0, 255, 0, 1)') {
                expect(false).customError('"Ending Price" column starting cell is not colored with brightest green');
                CommonFunctions.takeScreenShot();
              }
            } else if (index === tickerArrayForPriceChangeColumn.length - 1) {
              if (color !== 'rgba(255, 0, 0, 1)') {
                expect(false).customError('"Ending Price" column ending cell is not colored with brightest red');
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

    it('Should get "Tickers" for the corresponding "Price Change (%)" column cells which displayed value above 0.00', function() {
      tickerArrayForPriceChangeColumn = [];
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker, index) {
          if (index > 0) {
            SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Price Change (%)').then(function(cellRef) {
              cellRef.getText().then(function(cellValue) {
                if (parseFloat(cellValue) > 0.00) {
                  tickerArrayForPriceChangeColumn.push(ticker);
                }
              });
            });
          }
        });
      });

      SlickGridFunctions.scrollRowToTop('Contribution', 0);
    });

    it('Verifying if the "Ending Price" column cells for the corresponding "Price Change (%)" ' +
      'column which displayed value above "0.00" shows "dark green" color', function() {
      var screenShot = 0;
      tickerArrayForPriceChangeColumn.forEach(function(ticker) {
        PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Ending Price', undefined, undefined,
          true, undefined).then(function(ref) {
          Utilities.scrollElementToVisibility(ref);
          Utilities.getBgColor(ref.element(by.xpath('./div'))).then(function(bgcolor) {
            if (bgcolor !== 'rgba(0, 255, 0, 1)' && ticker !== 'MRK') {
              expect(false).customError('"Ending Price" column cells for the corresponding "Price Change (%)"' +
                'column which displayed value above "0.00" shows "dark green" color who\'s corresponding ticker is "' + ticker + '"');
              screenShot = screenShot + 1;
            } else if (ticker === 'MRK') {
              // Cell corresponding to "MRK" ticker is in light green color
              if (bgcolor !== 'rgba(42, 255, 42, 1)') {
                expect(false).customError('"Ending Price" column cells for the corresponding "Price Change (%)"' +
                  'column which displayed value above "0.00" shows "dark green" color who\'s corresponding ticker is "' + ticker + '"');
                screenShot = screenShot + 1;
              }
            }
          });
        });
      });
      if (screenShot === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should get "Tickers" for the corresponding "Price Change (%)" column cells which displayed value below 0.00', function() {
      tickerArrayForPriceChangeColumn = [];
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker, index) {
          if (index > 0) {
            SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Price Change (%)').then(function(cellRef) {
              cellRef.getText().then(function(cellValue) {
                if (parseFloat(cellValue) < 0.00) {
                  tickerArrayForPriceChangeColumn.push(ticker);
                }
              });
            });
          }
        });
      });

      SlickGridFunctions.scrollRowToTop('Contribution', 0);
    });

    it('Verifying if the "Ending Price" column cells for the corresponding "Price Change (%)" ' +
      'column which displayed value below "0.00" shows "dark red" color', function() {
      var screenShot = 0;
      tickerArrayForPriceChangeColumn.forEach(function(ticker) {
        PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Ending Price', undefined, undefined,
          true, undefined).then(function(ref) {
          Utilities.scrollElementToVisibility(ref);
          Utilities.getBgColor(ref.element(by.xpath('./div'))).then(function(bgcolor) {
            if (bgcolor !== 'rgba(255, 0, 0, 1)' && ticker !== 'ALTR.1') {
              expect(false).customError('"Ending Price" column cells for the corresponding "Price Change (%)"' +
                'column which displayed value below "0.00" shows "dark red" color who\'s corresponding ticker is "' + ticker + '"');
              screenShot = screenShot + 1;
            } else if (ticker === 'ALTR.1') {
              // Cell corresponding to "ALTR" ticker is in light red color
              if (bgcolor !== 'rgba(255, 77, 77, 1)') {
                expect(false).customError('"Ending Price" column cells for the corresponding "Price Change (%)"' +
                  'column which displayed value below "0.00" shows "dark red" color who\'s corresponding ticker is "' + ticker + '"');
                screenShot = screenShot + 1;
              }
            }
          });
        });
      });
      if (screenShot === 1) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should get "Tickers" for the corresponding "Price Change (%)" column which shows "0" or "blanks" values', function() {
      tickerArrayForPriceChangeColumn = [];
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker, index) {
          if (index > 0) {
            SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Price Change (%)').then(function(cellRef) {
              cellRef.getText().then(function(cellValue) {
                if (cellValue === '--' || cellValue === '0.00') {
                  tickerArrayForPriceChangeColumn.push(ticker);
                }
              });
            });
          }
        });
      });

      SlickGridFunctions.scrollRowToTop('Contribution', 0);
    });

    it('Verifying if the "Ending Price" column cells for the corresponding "Price Change (%)" ' +
      'column which shows "0" or "blanks" values are not colored', function() {
      var screenShot = 0;
      tickerArrayForPriceChangeColumn.forEach(function(ticker) {
        PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Ending Price', undefined, undefined,
          true, undefined).then(function(ref) {
          Utilities.scrollElementToVisibility(ref);
          Utilities.getBgColor(ref.element(by.xpath('./div'))).then(function(bgcolor) {
            if (bgcolor !== 'rgba(255, 255, 255, 1)' && ticker !== 'CASH_USD') {
              expect(false).customError('"Ending Price" column cells for the corresponding "Price Change (%)"' +
                'column which shows "0" or "blanks" values are colored who\'s corresponding ticker is "' + ticker + '"');
              screenShot = screenShot + 1;
            } else if (ticker === 'CASH_USD') {
              if (bgcolor !== 'rgba(252, 255, 252, 1)') {
                expect(false).customError('"Ending Price" column cells for the corresponding "Price Change (%)"' +
                  'column which shows "0" or "blanks" values are colored who\'s corresponding ticker is "' + ticker + '"');
                screenShot = screenShot + 1;
              }
            }
          });
        });
      });
      if (screenShot > 0) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should get "Tickers" for associated "Port. Average Weight" column values which are not null', function() {
      tickerArrayForPortAvgWeightColumn = [];
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker, index) {
          if (index > 0) {
            SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Port. Average Weight').then(function(cellRef) {
              cellRef.getText().then(function(cellValue) {
                if (cellValue !== '--') {
                  tickerArrayForPortAvgWeightColumn.push(ticker);
                }
              });
            });
          }
        });
      });
    });

    it('Should get the "rgb" values of the "Port. Average Weight" column cells who\'s values are not null', function() {
      tickerArrayForPortAvgWeightColumn.forEach(function(ticker) {
        PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Port. Average Weight', undefined, undefined,
          true, undefined).then(function(ref) {
          Utilities.scrollElementToVisibility(ref);
          Utilities.getBgColor(ref.element(by.xpath('./div'))).then(function(bgcolor) {
            bgcolorArray.push(bgcolor);
          });
        });
      });
    });

    it('Verifying if "Port. Average Weight" column starting cell is colored with brightest green and ending cell is colored' +
      'with brightest red', function() {
      red = [];
      green = [];
      blue = [];
      alphaChannel = [];
      if (bgcolorArray[0] === 'rgba(0, 255, 0, 1)' && bgcolorArray[bgcolorArray.length - 1] === 'rgba(255, 0, 0, 1)') {
        for (var i = 0; i < bgcolorArray.length; i++) {
          var color = bgcolorArray[i].match(/\d+/g);
          red.push(parseInt(color[0]));
          green.push(parseInt(color[1]));
          blue.push(parseInt(color[2]));
          alphaChannel.push(parseInt(color[3]));
        }
      } else {
        if (bgcolorArray[0] !== 'rgba(0, 255, 0, 1)') {
          expect(false).customError('"Port. Average Weight" column starting cell is not colored with brightest green');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError('"Port. Average Weight" column ending cell is colored with brightest red');
          CommonFunctions.takeScreenShot();
        }
      }
    });

    it('Verifying if "Port. Average Weight" column cell values are colored starting from brightest green, fading' +
      ' toward the base color, eventually it will start with slight red toward brightest red at end by using "rgb" values',
      function() {
        var flag = true;
        var temp = 0;
        var screenShot = 0;
        for (var i = 0; i < red.length; i++) {
          if (green[i] === 255 && flag === true) {
            if (red[i] === 255 && blue[i] === 255) {
              flag = false;
              temp = i;
            }

            if (red[i] > red[i + 1] || blue[i] > blue[i + 1]) {
              if (flag === true) {
                expect(false).customError('"Port. Average Weight" column cell color is light color for "' + (i + 1) + '" row when' +
                  ' compared to "' + (i + 2) + '" row');
                screenShot = screenShot + 1;
              }
            }
          }

          if (red[i] === 255 && flag === false && temp !== i) {
            if ((green[i] < green[i + 1]) || (blue[i] < blue[i + 1])) {
              expect(false).customError('"Port. Average Weight" column cell color is brighter for "' + (i + 1) + '" row when' +
                ' compared to "' + (i + 2) + '" row');
              screenShot = screenShot + 1;
            }
          }
        }

        if (screenShot > 0) {
          CommonFunctions.takeScreenShot();
        }

      });

    it('Should get "Tickers" for associated "Beginning Price" column values which are not null', function() {
      tickerArrayForBeginningPriceColumn = [];
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker, index) {
          if (index > 0) {
            SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Beginning Price').then(function(cellRef) {
              cellRef.getText().then(function(cellValue) {
                if (cellValue !== '--') {
                  tickerArrayForBeginningPriceColumn.push(ticker);
                }
              });
            });
          }
        });
      });
    });

    it('Should get the "rgb" values of the "Beginning Price" column cells who\'s values are not null', function() {
      bgcolorArray = [];
      tickerArrayForBeginningPriceColumn.forEach(function(ticker) {
        PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Beginning Price', undefined, undefined,
          true, undefined).then(function(ref) {
          Utilities.scrollElementToVisibility(ref);
          Utilities.getBgColor(ref.element(by.xpath('./div'))).then(function(bgcolor) {
            bgcolorArray.push(bgcolor);
          });
        });
      });
    });

    it('Verifying if Beginning Price column starting cell is colored with brightest green and ending cell is colored' +
      'with brightest red', function() {
      red = [];
      green = [];
      blue = [];
      alphaChannel = [];
      if (bgcolorArray[0] === 'rgba(0, 255, 0, 1)' && bgcolorArray[bgcolorArray.length - 1] === 'rgba(255, 0, 0, 1)') {
        for (var i = 0; i < bgcolorArray.length; i++) {
          var color = bgcolorArray[i].match(/\d+/g);
          red.push(parseInt(color[0]));
          green.push(parseInt(color[1]));
          blue.push(parseInt(color[2]));
          alphaChannel.push(parseInt(color[3]));
        }
      }
    });

    it('Verifying if "Beginning Price" column starting cell is colored with brightest green and ending cell is colored' +
      'with brightest red', function() {
      red = [];
      green = [];
      blue = [];
      alphaChannel = [];
      if (bgcolorArray[0] === 'rgba(0, 255, 0, 1)' && bgcolorArray[bgcolorArray.length - 1] === 'rgba(255, 0, 0, 1)') {
        for (var i = 0; i < bgcolorArray.length; i++) {
          var color = bgcolorArray[i].match(/\d+/g);
          red.push(parseInt(color[0]));
          green.push(parseInt(color[1]));
          blue.push(parseInt(color[2]));
          alphaChannel.push(parseInt(color[3]));
        }
      } else {
        if (bgcolorArray[0] !== 'rgba(0, 255, 0, 1)') {
          expect(false).customError('"Beginning Price" column starting cell is not colored with brightest green');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError('"Beginning Price" column ending cell is colored with brightest red');
          CommonFunctions.takeScreenShot();
        }
      }
    });

    it('Verifying if "Beginning Price" column cell values are colored starting from brightest green, fading' +
      ' toward the base color, eventually it will start with slight red toward brightest red at end by using "rgb" values',
      function() {
        var flag = true;
        var temp = 0;
        var screenShot = 0;
        for (var i = 0; i < red.length; i++) {
          if ((green[i] === 255) && (flag === true)) {

            if ((red[i] === 255) && (blue[i] === 255)) {
              flag = false;
              temp = i;
            }

            if ((red[i] > red[i + 1]) || (blue[i] > blue[i + 1])) {
              if (flag === true) {
                expect(false).customError('"Beginning Price" column cell color is light color for "' + (i + 1) + '" row when' +
                  ' compared to "' + (i + 2) + '" row');
                screenShot = screenShot + 1;
              }
            }
          }

          if ((red[i] === 255) && (flag === false) && (temp !== i)) {
            if ((green[i] < green[i + 1]) || (blue[i] < blue[i + 1])) {
              expect(false).customError('"Beginning Price" column cell color is brighter for "' + (i + 1) + '" row when' +
                ' compared to "' + (i + 2) + '" row');
              screenShot = screenShot + 1;
            }
          }
        }

        if (screenShot > 0) {
          CommonFunctions.takeScreenShot();
        }

      });

    it('Should get "Tickers" for the corresponding "Price Change (%)" column which shows "0" or "blanks" values', function() {
      tickerArrayForPriceChangeColumn = [];
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker, index) {
          if (index > 0) {
            SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Price Change (%)').then(function(cellRef) {
              cellRef.getText().then(function(cellValue) {
                if (cellValue === '--' || cellValue === '0.00') {
                  tickerArrayForPriceChangeColumn.push(ticker);
                }
              });
            });
          }
        });
      });

      SlickGridFunctions.scrollRowToTop('Contribution', 0);
    });

    it('Verifying if the "Beginning Price" column cells for the corresponding "Price Change (%)" ' +
      'column which shows "0" or "blanks" values are not colored', function() {
      var screenShot = 0;
      tickerArrayForPriceChangeColumn.forEach(function(ticker) {
        PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Beginning Price', undefined, undefined,
          true, undefined).then(function(ref) {
          Utilities.scrollElementToVisibility(ref);
          Utilities.getBgColor(ref.element(by.xpath('./div'))).then(function(bgcolor) {
            if (bgcolor !== 'rgba(255, 255, 255, 1)') {
              expect(false).customError('"Beginning Price" column cells for the corresponding "Price Change (%)"' +
                'column which shows "0" or "blanks" values are colored who\'s corresponding ticker is "' + ticker + '"');
              screenShot = screenShot + 1;
            }
          });
        });
      });
      if (screenShot > 0) {
        CommonFunctions.takeScreenShot();
      }
    });

  });

  describe('Test Step ID: 566920', function() {

    var screenShot = 0;
    var bgcolorArray = [];
    var columnIndex = 0;
    var columnIndexOfPortColumn = 0;

    it('Should click on the Wrench icon in the "Contribution" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Contribution').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying wrench menu list is displayed in "Contribution" report workspace'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Wrench menu drop down list is not displayed in ' +
            '"Contribution" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from wrench drop down of "Contribution" report workspace', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function() {
        expect(false).customError('Unable to select "Options" from the Wrench drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode appeared', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (!option) {
          expect(false).customError('"Tile Options" mode is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Columns" on the LHP of tile options', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('View not changed to "Columns"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Ticker" item in selected section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Ticker').click().then(function() {
        },
        function() {
          expect(false).customError('Unable to click on "Ticker" item in selected section');
          CommonFunctions.takeScreenShot();
        });
    });

    var arrElements = ['Security Name', 'Port. Total Return'];
    arrElements.forEach(function(itemName) {
      it('Should select "' + itemName + '" in the Selected section', function() {
        var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(itemName);
        item.select(true);

        // Verifying if element is selected
        item.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"' + itemName + '" is not selected in the Selected section.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on "Conditional Formatting" accordion', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Conditional Formatting').then(function(expandStatus) {
        if (!expandStatus) {
          expect(expandStatus).customError('"Conditional Formatting" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Conditional Formatting" accordion is expanded', function() {
      TileOptionsColumns.getExpandableElement('Conditional Formatting').getAttribute('class').then(function(status) {
        if (status.indexOf('collapsed') > 0) {
          expect(false).customError('"Conditional Formatting" accordion is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Type" drop down and select "Up/Down"', function() {
      ThiefHelpers.selectOptionFromDropDown('Up/Down', 'Type');
    });

    it('Verifying if "Up/Down" is selected in "Type" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Up/Down', 'Type');
    });

    it('Should click on "Column" drop down and select "Price Change (%)"', function() {
      ThiefHelpers.selectOptionFromDropDown('Price Change (%)', 'Column');
    });

    it('Verifying if "Price Change (%)" is selected in "Column" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Price Change (%)', 'Column');
    });

    it('Should check "Group Level" checkbox', function() {
      ThiefHelpers.getCheckBoxClassReference('Group Level').isChecked().then(function(status) {
        if (status) {
          expect(false).customError('"Group Level" checkbox is already checked');
          CommonFunctions.takeScreenShot();
        } else {
          ThiefHelpers.getCheckBoxClassReference('Group Level').check();
        }
      });
    });

    it('Verifying if "Group Level" checkbox is checked', function() {
      ThiefHelpers.getCheckBoxClassReference('Group Level').isChecked().then(function(status) {
        if (!status) {
          expect(false).customError('"Group Level" checkbox is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check "Total Level" checkbox', function() {
      ThiefHelpers.getCheckBoxClassReference('Total Level').isChecked().then(function(status) {
        if (status) {
          expect(false).customError('"Total Level" checkbox is already checked');
          CommonFunctions.takeScreenShot();
        } else {
          ThiefHelpers.getCheckBoxClassReference('Total Level').check();
        }
      });
    });

    it('Verifying if "Total Level" checkbox is checked', function() {
      ThiefHelpers.getCheckBoxClassReference('Total Level').isChecked().then(function(status) {
        if (!status) {
          expect(false).customError('"Total Level" checkbox is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Price Change (%)" item in selected section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Price Change (%)').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Price Change (%)" item in selected section');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "FORMAT" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('FORMAT').then(function(expandStatus) {
        if (!expandStatus) {
          expect(expandStatus).customError('"FORMAT" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "FORMAT" section is expanded', function() {
      TileOptionsColumns.getExpandableElement('FORMAT').getAttribute('class').then(function(status) {
        if (status.indexOf('collapsed') > 0) {
          expect(false).customError('"FORMAT" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "5" in "FORMAT" accordion "Decimal" field', function() {
      ThiefHelpers.getTextBoxClassReference('Decimal').setText('5');
    });

    it('Verifying if the decimal field is set to "5"', function() {
      ThiefHelpers.getTextBoxClassReference('Decimal').getText().then(function(value) {
        if (value !== '5') {
          expect(false).customError('"FORMAT" accordion "Decimal" field is not set to "5" instead "' + value + '" is found ');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in "Tile Options -  Contribution"', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in "Tile Options -  Contribution"');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Tile Options" mode disappeared', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is not disappeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Contribution" report to calculate', function() {
      // Waiting for "Contribution" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Contribution'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          expect(false).customError('"Calculation Error" found while report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Contribution" report calculated without any error', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(reportStatus) {
        if (reportStatus === false) {
          expect(false).customError('"Contribution" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          PA3MainPage.isReportCalculated('Contribution').then(function() {
          }, function(error) {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should get "Tickers" for the corresponding "Price Change (%)" column which displays values expect "0.00" and "--"', function() {
      tickerArrayForPriceChangeColumn = [];
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker, index) {
          if (index > 0) {
            SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Price Change (%)').then(function(cellRef) {
              cellRef.getText().then(function(cellValue) {
                if (cellValue !== '--') {
                  tickerArrayForPriceChangeColumn.push(ticker);
                }
              });
            });
          }
        });
      });
    });

    it('Verifying if "Ending Price" column starting cell is colored with brightest green and ending cell is colored' +
      'with brightest red', function() {
      tickerArrayForPriceChangeColumn.forEach(function(ticker, index) {
        PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Ending Price', undefined, undefined,
          true, undefined).then(function(ref) {
          Utilities.scrollElementToVisibility(ref);
          Utilities.getBgColor(ref.element(by.xpath('./div'))).then(function(color) {
            if (index === 1) {
              if (color !== 'rgba(0, 255, 0, 1)') {
                expect(false).customError('"Ending Price" column starting cell is not colored with brightest green');
                CommonFunctions.takeScreenShot();
              }
            } else if (index === tickerArrayForPriceChangeColumn.length - 1) {
              if (color !== 'rgba(255, 0, 0, 1)') {
                expect(false).customError('"Ending Price" column ending cell is not colored with brightest red');
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

    it('Should get "Tickers" for the corresponding "Price Change (%)" column cells which displayed positive positive value' +
      ' or above 0.00', function() {
      tickerArrayForPriceChangeColumn = [];
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker) {
          SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Price Change (%)').then(function(cellRef) {
            cellRef.getText().then(function(cellValue) {
              if (parseFloat(cellValue) > 0.00) {
                tickerArrayForPriceChangeColumn.push(ticker);
              }
            });
          });
        });
      });

      SlickGridFunctions.scrollRowToTop('Contribution', 0);
    });

    it('Verifying if the font of "Ticker" column cells including the Group & Total Level are colored in green for the ' +
      'corresponding "Price Change (%)" column values which are positive', function() {
      screenShot = 0;

      // Scroll to the top of the grid.
      browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
        '.grid.scrollRowToTop(0)');
      tickerArrayForPriceChangeColumn.forEach(function(ticker) {
        if (ticker !== '') {
          PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Ticker', undefined, 'grid-canvas grid-canvas-bottom grid-canvas-left',
            true, undefined).then(function(ref) {
            Utilities.scrollElementToVisibility(ref);
            Utilities.getFontColor(ref.element(by.xpath('./div'))).then(function(color) {
              if (color !== 'rgba(51, 153, 0, 1)') {
                expect(false).customError('The font of "' + ticker + '" Ticker column cell for the corresponding "Price Change (%)"' +
                  'column which displayed positive value are not colored in "green"');
                screenShot = screenShot + 1;
              }
            });
          });
        }
      });
      if (screenShot > 0) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Verifying if the font of "Security" column cells including the Group & Total Level are colored in green for the ' +
      'corresponding "Price Change (%)" column values which are positive', function() {
      var temp = [];
      screenShot = 0;
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', '').then(function(securityColumnData) {
        securityColumnData.forEach(function(security) {
          temp.push(security.replace(/&#39;/g, '\'').replace(/&amp;/g, '&'));
        });
      });
      tickerArrayForPriceChangeColumn.forEach(function(ticker) {
        if (ticker !== '') {
          SlickGridFunctions.getRowIndex('Contribution', ticker, 'Ticker').then(function(rowIndex) {
            PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Contribution', 1, temp[rowIndex],
              undefined).element(by.xpath('.//div[contains(@class, "grid-just-left")]/div')).getCssValue('color').then(function(color) {
              if (color !== 'rgba(51, 153, 0, 1)') {
                expect(false).customError('The font of "Security" column cell for "' + ticker + '" Ticker column cell for the corresponding "Price Change (%)"' +
                  ' column which displayed positive value are not colored in "green"');
                screenShot = screenShot + 1;
              }
            });
          });
        } else {
          SlickGridFunctions.getRowIndex('Contribution', ticker, 'Ticker').then(function(rowIndex) {
            PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Contribution', 1, temp[rowIndex],
              'grid-canvas grid-canvas-top grid-canvas-left expandable').element(by.xpath('.//div[contains(@class, "grid-just-left")]/div')).getCssValue('color').then(function(color) {
              if (color !== 'rgba(51, 153, 0, 1)') {
                expect(false).customError('The font of "Security" column cell for "' + ticker + '" Ticker column cell for the corresponding "Price Change (%)"' +
                  ' column which displayed positive value are not colored in "green"');
                screenShot = screenShot + 1;
              }
            });
          });
        }
      });
      if (screenShot > 0) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should get the column index of "Price Change (%)" and "Port. Total Return" columns in "Contribution" report', function() {
      SlickGridFunctions.getColumnNames('Contribution').then(function(columnsArray) {
        for (var i = 0; i < columnsArray.length; i++) {
          if (columnsArray[i] === 'Price Change (%)') {
            columnIndex = i;
          }

          if (columnsArray[i] === 'Port. Total Return') {
            columnIndexOfPortColumn = i;
          }
        }
      });

      SlickGridFunctions.scrollRowToTop('Contribution', 0);
    });

    it('Verifying if the font of "Port. Total Return" column cells including the Group & Total Level are colored in green for the ' +
      'corresponding "Price Change (%)" column values which are positive', function() {
      screenShot = 0;

      // Scroll to the top of the grid.
      browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
        '.grid.scrollRowToTop(0)');
      tickerArrayForPriceChangeColumn.forEach(function(ticker) {
        if (ticker !== '') {
          SlickGridFunctions.getRowData('Contribution', ticker, 'Ticker').then(function(rowData) {
            PA3MainPage.getValueFromCalculatedReport('Contribution', rowData[columnIndex + 1], 'Port. Total Return', 'grid-canvas grid-canvas-bottom grid-canvas-right', undefined,
              true).then(function(ref) {
              Utilities.scrollElementToVisibility(ref);
              Utilities.getFontColor(ref.element(by.xpath('./div'))).then(function(color) {
                if (color !== 'rgba(51, 153, 0, 1)') {
                  expect(false).customError('The font of "Port. Total Return" column cell for "' + ticker + '" Ticker column cell for the corresponding "Price Change (%)"' +
                    'column which displayed positive value are not colored in "green"');
                  screenShot = screenShot + 1;
                }
              });
            });
          });
        } else {
          SlickGridFunctions.getRowData('Contribution', ticker, 'Ticker').then(function(rowData) {
            PA3MainPage.getValueFromCalculatedReport('Contribution', rowData[columnIndex + 1], 'Port. Total Return', 'grid-canvas grid-canvas-top grid-canvas-right', 'grid-canvas-top grid-canvas-right',
              true).then(function(ref) {
              Utilities.scrollElementToVisibility(ref);
              Utilities.getFontColor(ref.element(by.xpath('./div'))).then(function(color) {
                if (color !== 'rgba(51, 153, 0, 1)') {
                  expect(false).customError('The font of "Port. Total Return" column cell for "' + ticker + '" Ticker column cell for the corresponding "Price Change (%)"' +
                    'column which displayed positive value are not colored in "green"');
                  screenShot = screenShot + 1;
                }
              });
            });
          });
        }
      });
      if (screenShot > 0) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should get "Tickers" for the corresponding "Price Change (%)" column cells which displayed negative value or below "0.00" ', function() {
      tickerArrayForPriceChangeColumn = [];
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker) {
          SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Price Change (%)').then(function(cellRef) {
            cellRef.getText().then(function(cellValue) {
              if (parseFloat(cellValue) < 0.00) {
                tickerArrayForPriceChangeColumn.push(ticker);
              }
            });
          });
        });
      });
    });

    it('Verifying if the font of "Ticker" column cells including the Group & Total Level are colored in red for the ' +
      'corresponding "Price Change (%)" column values which are negative', function() {
      screenShot = 0;

      // Scroll to the top of the grid.
      browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
        '.grid.scrollRowToTop(0)');
      tickerArrayForPriceChangeColumn.forEach(function(ticker) {
        if (ticker !== '') {
          PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Ticker', undefined, 'grid-canvas grid-canvas-bottom grid-canvas-left',
            true, undefined).then(function(ref) {
            Utilities.scrollElementToVisibility(ref);
            Utilities.getFontColor(ref.element(by.xpath('./div'))).then(function(color) {
              if (color !== 'rgba(255, 0, 0, 1)') {
                expect(false).customError('The font of "' + ticker + '" Ticker column cell for the corresponding "Price Change (%)"' +
                  'column which displayed negative value are not colored in "red"');
                screenShot = screenShot + 1;
              }
            });
          });
        }
      });
      if (screenShot > 0) {
        CommonFunctions.takeScreenShot();
      }

    });

    it('Verifying if the font of "Security" column cells including the Group & Total Level are colored in red for the ' +
      'corresponding "Price Change (%)" column values which are negative', function() {
      var temp = [];
      screenShot = 0;
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', '').then(function(securityColumnData) {
        securityColumnData.forEach(function(security) {
          temp.push(security.replace(/&#39;/g, '\'').replace(/&amp;/g, '&'));
        });
      });
      tickerArrayForPriceChangeColumn.forEach(function(ticker) {
        if (ticker !== '') {
          SlickGridFunctions.getRowIndex('Contribution', ticker, 'Ticker').then(function(rowIndex) {
            PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Contribution', 1, temp[rowIndex],
              undefined).element(by.xpath('.//div[contains(@class, "grid-just-left")]/div')).getCssValue('color').then(function(color) {
              if (color !== 'rgba(255, 0, 0, 1)') {
                expect(false).customError('The font of "Security" column cell for "' + ticker + '" Ticker column cell for the corresponding "Price Change (%)"' +
                  'column which displayed negative value are not colored in "red"');
                screenShot = screenShot + 1;
              }
            });
          });
        } else {
          SlickGridFunctions.getRowIndex('Contribution', ticker, 'Ticker').then(function(rowIndex) {
            PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Contribution', 1, temp[rowIndex],
              'grid-canvas grid-canvas-top grid-canvas-left expandable').element(by.xpath('.//div[contains(@class, "grid-just-left")]/div')).getCssValue('color').then(function(color) {
              if (color !== 'rgba(255, 0, 0, 1)') {
                expect(false).customError('The font of "Security" column cell for "' + ticker + '" Ticker column cell for the corresponding "Price Change (%)"' +
                  'column which displayed negative value are not colored in "red"');
                screenShot = screenShot + 1;
              }
            });
          });
        }
      });
      if (screenShot > 0) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should get the column index of "Price Change (%)" and "Port. Total Return" columns in "Contribution" report', function() {
      SlickGridFunctions.getColumnNames('Contribution').then(function(columnsArray) {
        for (var i = 0; i < columnsArray.length; i++) {
          if (columnsArray[i] === 'Price Change (%)') {
            columnIndex = i;
          }

          if (columnsArray[i] === 'Port. Total Return') {
            columnIndexOfPortColumn = i;
          }
        }
      });
    });

    it('Verifying if the font of "Port. Total Return" column cells including the Group & Total Level are colored in red for the ' +
      'corresponding "Price Change (%)" column values which are negative', function() {
      screenShot = 0;
      tickerArrayForPriceChangeColumn.forEach(function(ticker) {
        if (ticker !== '' && ticker !== '183658') {
          SlickGridFunctions.getRowData('Contribution', ticker, 'Ticker').then(function(rowData) {
            PA3MainPage.getValueFromCalculatedReport('Contribution', rowData[columnIndex], 'Port. Total Return', 'grid-canvas grid-canvas-bottom grid-canvas-right', undefined,
              true).then(function(ref) {
              Utilities.scrollElementToVisibility(ref);
              Utilities.getFontColor(ref.element(by.xpath('./div'))).then(function(color) {
                if (color !== 'rgba(255, 0, 0, 1)') {
                  expect(false).customError('The font of "Port. Total Return" column cell for "' + ticker + '" Ticker column cell for the corresponding "Price Change (%)"' +
                    'column which displayed negative value are not colored in "red"');
                  screenShot = screenShot + 1;
                }
              });
            });
          });
        } else if (ticker === '') {
          SlickGridFunctions.getRowData('Contribution', 'Total', '').then(function(rowData) {
            PA3MainPage.getValueFromCalculatedReport('Contribution', rowData[columnIndex], 'Port. Total Return', 'grid-canvas grid-canvas-top grid-canvas-right', 'grid-canvas-top grid-canvas-right',
              true).then(function(ref) {
              Utilities.scrollElementToVisibility(ref);
              Utilities.getFontColor(ref.element(by.xpath('./div'))).then(function(color) {
                if (color !== 'rgba(255, 0, 0, 1)') {
                  expect(false).customError('The font of "Port. Total Return" column cell for "' + ticker + '" Ticker column cell for the corresponding "Price Change (%)"' +
                    'column which displayed negative value are not colored in "red"');
                  screenShot = screenShot + 1;
                }
              });
            });
          });
        }
      });
      if (screenShot > 0) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should get "Tickers" for the corresponding "Price Change (%)" column cells which displayed 0\'s/blanks/NAs', function() {
      tickerArrayForPriceChangeColumn = [];

      // Scroll to the top of the grid.
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker) {
          SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Price Change (%)').then(function(cellRef) {
            cellRef.getText().then(function(cellValue) {
              if (parseFloat(cellValue) === 0.00 || cellValue === '--' || cellValue === '') {
                tickerArrayForPriceChangeColumn.push(ticker);
              }
            });
          });
        });
      });
    });

    it('Verifying if the font of "Ticker" column cells including the Group & Total Level are not colored for the ' +
      'corresponding "Price Change (%)" column values which displays 0\'s/blanks/NAs', function() {
      screenShot = 0;
      tickerArrayForPriceChangeColumn.forEach(function(ticker) {
        if (ticker !== '') {
          PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Ticker', undefined, 'grid-canvas grid-canvas-bottom grid-canvas-left',
            true, undefined).then(function(ref) {
            Utilities.scrollElementToVisibility(ref);
            Utilities.getFontColor(ref).then(function(color) {
              if (color !== 'rgba(0, 0, 0, 1)') {
                expect(false).customError('The font of "' + ticker + '" Ticker column cell for the corresponding "Price Change (%)"' +
                  'column cell which displayed  0\'s/blanks/NAs are colored in "' + color + '"');
                screenShot = screenShot + 1;
              }
            });
          });
        }
      });
      if (screenShot > 0) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Verifying if the font of "Security" column cells including the Group & Total Level are not colored for the ' +
      'corresponding "Price Change (%)" column values which displays 0\'s/blanks/NAs', function() {
      var temp = [];
      screenShot = 0;
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', '').then(function(securityColumnData) {
        securityColumnData.forEach(function(security) {
          temp.push(security.replace(/&#39;/g, '\'').replace(/&amp;/g, '&'));
        });
      });
      tickerArrayForPriceChangeColumn.forEach(function(ticker) {
        if (ticker !== '') {
          SlickGridFunctions.getRowIndex('Contribution', ticker, 'Ticker').then(function(rowIndex) {
            PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Contribution', 1, temp[rowIndex],
              undefined).element(by.xpath('.//div[contains(@class, "grid-just-left")]')).getCssValue('color').then(function(color) {
              if (color !== 'rgba(0, 0, 0, 1)') {
                expect(false).customError('The font "' + temp[rowIndex] + '" security in "Security" column and for the corresponding "Price Change (%)"' +
                  'column cell which displayed  0\'s/blanks/NAs are colored in "' + color + '"');
                screenShot = screenShot + 1;
              }
            });
          });
        } else {
          SlickGridFunctions.getRowIndex('Contribution', ticker, 'Ticker').then(function(rowIndex) {
            PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Contribution', 1, temp[rowIndex],
              'grid-canvas grid-canvas-top grid-canvas-left expandable').element(by.xpath('.//div[contains(@class, "grid-just-left")]')).getCssValue('color').then(function(color) {
              if (color !== 'rgba(0, 0, 0, 1)') {
                expect(false).customError('The font "' + temp[rowIndex] + '" security in "Security" column and for the corresponding "Price Change (%)"' +
                  'column cell which displayed  0\'s/blanks/NAs are colored in "' + color + '"');
                screenShot = screenShot + 1;
              }
            });
          });
        }
      });
      if (screenShot > 0) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should get the column index of "Price Change (%)" column in "Contribution" report', function() {
      SlickGridFunctions.getColumnNames('Contribution').then(function(columnsArray) {
        for (var i = 0; i < columnsArray.length; i++) {
          if (columnsArray[i] === 'price Change (%)') {
            columnIndex = i;
          }
        }
      });
    });

    it('Verifying if the font of "Port. Total Return" column cells including the Group & Total Level are not colored for the ' +
      'corresponding "Price Change (%)" column values which displays 0\'s/blanks/NAs', function() {
      screenShot = 0;
      tickerArrayForPriceChangeColumn.forEach(function(ticker) {
        PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Port. Total Return', undefined, undefined,
          true, undefined).then(function(ref) {
          Utilities.scrollElementToVisibility(ref);
          Utilities.getFontColor(ref).then(function(color) {
            if (color !== 'rgba(0, 0, 0, 1)') {
              expect(false).customError('The font of "Port. Total Return" column cell for "' + ticker + '" Ticker column cell for the corresponding "Price Change (%)"' +
                'column which displayed  0\'s/blanks/NAs are colored in "' + color + '"');
              screenShot = screenShot + 1;
            }
          });
        });
      });
      if (screenShot > 0) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should get "Tickers" for the corresponding "Price Change (%)" column cells which displayed value above 0.00', function() {
      tickerArrayForPriceChangeColumn = [];
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker, index) {
          if (index > 0) {
            SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Price Change (%)').then(function(cellRef) {
              cellRef.getText().then(function(cellValue) {
                if (parseFloat(cellValue) > 0.00) {
                  tickerArrayForPriceChangeColumn.push(ticker);
                }
              });
            });
          }
        });
      });

      SlickGridFunctions.scrollRowToTop('Contribution', 0);
    });

    it('Verifying if the "Ending Price" column cells for the corresponding "Price Change (%)" ' +
      'column which displayed value above "0.00" shows "dark green" color', function() {
      screenShot = 0;
      tickerArrayForPriceChangeColumn.forEach(function(ticker) {
        PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Ending Price', undefined, undefined,
          true, undefined).then(function(ref) {
          Utilities.scrollElementToVisibility(ref);
          Utilities.getBgColor(ref.element(by.xpath('./div'))).then(function(bgcolor) {
            if (bgcolor !== 'rgba(0, 255, 0, 1)' && ticker !== 'MRK' && ticker !== 'CASH_USD') {
              expect(false).customError('"Ending Price" column cells for the corresponding "Price Change (%)"' +
                'column which displayed value above "0.00" shows "dark green" color who\'s corresponding ticker is "' + ticker + '"');
              screenShot = screenShot + 1;
            } else if (ticker === 'MRK') {
              if (bgcolor !== 'rgba(42, 255, 42, 1)') {
                expect(false).customError('"Ending Price" column cells for the corresponding "Price Change (%)"' +
                  'column which displayed value above "0.00" shows "dark green" color who\'s corresponding ticker is "' + ticker + '"');
                screenShot = screenShot + 1;
              }
            } else if (ticker === 'CASH_USD') {
              if (bgcolor !== 'rgba(252, 255, 252, 1)') {
                expect(false).customError('"Ending Price" column cells for the corresponding "Price Change (%)"' +
                  'column which displayed value above "0.00" shows "dark green" color who\'s corresponding ticker is "' + ticker + '"');
                screenShot = screenShot + 1;
              }
            }
          });
        });
      });
      if (screenShot > 0) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should get "Tickers" for the corresponding "Price Change (%)" column cells which displayed value below 0.00', function() {
      tickerArrayForPriceChangeColumn = [];
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker, index) {
          if (index > 0) {
            SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Price Change (%)').then(function(cellRef) {
              cellRef.getText().then(function(cellValue) {
                if (parseFloat(cellValue) < 0.00) {
                  tickerArrayForPriceChangeColumn.push(ticker);
                }
              });
            });
          }
        });
      });

      SlickGridFunctions.scrollRowToTop('Contribution', 0);
    });

    it('Verifying if the "Ending Price" column cells for the corresponding "Price Change (%)" ' +
      'column which displayed value below "0.00" shows "dark red" color', function() {
      screenShot = 0;
      tickerArrayForPriceChangeColumn.forEach(function(ticker) {
        PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Ending Price', undefined, undefined,
          true, undefined).then(function(ref) {
          Utilities.scrollElementToVisibility(ref);
          Utilities.getBgColor(ref.element(by.xpath('./div'))).then(function(bgcolor) {
            if (bgcolor !== 'rgba(255, 0, 0, 1)' && ticker !== 'ALTR.1') {
              expect(false).customError('"Ending Price" column cells for the corresponding "Price Change (%)"' +
                'column which displayed value below "0.00" shows "dark red" color who\'s corresponding ticker is "' + ticker + '"');
              screenShot = screenShot + 1;
            } else if (ticker === 'ALTR.1') {
              if (bgcolor !== 'rgba(255, 77, 77, 1)') {
                expect(false).customError('"Ending Price" column cells for the corresponding "Price Change (%)"' +
                  'column which displayed value below "0.00" shows "dark red" color who\'s corresponding ticker is "' + ticker + '"');
                screenShot = screenShot + 1;
              }
            }
          });
        });
      });
      if (screenShot > 0) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should get "Tickers" for the corresponding "Price Change (%)" column which shows "0" or "blanks" values', function() {
      tickerArrayForPriceChangeColumn = [];
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker, index) {
          if (index > 0) {
            SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Price Change (%)').then(function(cellRef) {
              cellRef.getText().then(function(cellValue) {
                if (cellValue === '--' || cellValue === '0.00') {
                  tickerArrayForPriceChangeColumn.push(ticker);
                }
              });
            });
          }
        });
      });
    });

    it('Verifying if the "Ending Price" column cells for the corresponding "Price Change (%)" ' +
      'column which shows "0" or "blanks" values are not colored', function() {
      screenShot = 0;
      tickerArrayForPriceChangeColumn.forEach(function(ticker) {
        PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Ending Price', undefined, undefined,
          true, undefined).then(function(ref) {
          Utilities.scrollElementToVisibility(ref);
          Utilities.getBgColor(ref.element(by.xpath('./div'))).then(function(bgcolor) {
            if (bgcolor !== 'rgba(255, 255, 255, 1)' && ticker !== 'CASH_USD') {
              expect(false).customError('"Ending Price" column cells for the corresponding "Price Change (%)"' +
                'column which shows "0" or "blanks" values are colored who\'s corresponding ticker is "' + ticker + '"');
              screenShot = screenShot + 1;
            }
          });
        });
      });
      if (screenShot > 0) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should get "Tickers" for associated "Port. Average Weight" column values which are not null', function() {
      tickerArrayForPortAvgWeightColumn = [];
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker, index) {
          if (index > 0) {
            SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Port. Average Weight').then(function(cellRef) {
              cellRef.getText().then(function(cellValue) {
                if (cellValue !== '--') {
                  tickerArrayForPortAvgWeightColumn.push(ticker);
                }
              });
            });
          }
        });
      });
    });

    it('Should get the "rgb" values of the "Port. Average Weight" column cells who\'s values are not null', function() {
      tickerArrayForPortAvgWeightColumn.forEach(function(ticker) {
        PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Port. Average Weight', undefined, undefined,
          true, undefined).then(function(ref) {
          Utilities.scrollElementToVisibility(ref);
          Utilities.getBgColor(ref.element(by.xpath('./div'))).then(function(bgcolor) {
            bgcolorArray.push(bgcolor);
          });
        });
      });
    });

    it('Verifying if "Port. Average Weight" column starting cell is colored with brightest green and ending cell is colored' +
      'with brightest red', function() {
      red = [];
      green = [];
      blue = [];
      alphaChannel = [];
      if (bgcolorArray[0] === 'rgba(0, 255, 0, 1)' && bgcolorArray[bgcolorArray.length - 1] === 'rgba(255, 0, 0, 1)') {
        for (var i = 0; i < bgcolorArray.length; i++) {
          var color = bgcolorArray[i].match(/\d+/g);
          red.push(parseInt(color[0]));
          green.push(parseInt(color[1]));
          blue.push(parseInt(color[2]));
          alphaChannel.push(parseInt(color[3]));
        }
      }
    });

    it('Verifying if "Port. Average Weight" column cell values are colored starting from brightest green, fading' +
      ' toward the base color, eventually it will start with slight red toward brightest red at end by using "rgb" values',
      function() {
        var flag = true;
        var temp = 0;
        var screenShot = 0;
        for (var i = 0; i < red.length; i++) {
          if (green[i] === 255 && flag === true) {
            if (red[i] === 255 && blue[i] === 255) {
              flag = false;
              temp = i;
            }

            if (red[i] > red[i + 1] || blue[i] > blue[i + 1]) {
              if (flag === true) {
                expect(false).customError('"Port. Average Weight" column cell color is light color for "' + (i + 1) + '" row when' +
                  ' compared to "' + (i + 2) + '" row');
                screenShot = screenShot + 1;
              }
            }
          }

          if (red[i] === 255 && flag === false && temp !== i) {
            if ((green[i] < green[i + 1]) || (blue[i] < blue[i + 1])) {
              expect(false).customError('"Port. Average Weight" column cell color is brighter for "' + (i + 1) + '" row when' +
                ' compared to "' + (i + 2) + '" row');
              screenShot = screenShot + 1;
            }
          }
        }

        if (screenShot > 0) {
          CommonFunctions.takeScreenShot();
        }

      });

    it('Should get "Tickers" for associated "Beginning Price" column values which are not null', function() {
      tickerArrayForBeginningPriceColumn = [];
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker, index) {
          if (index > 0) {
            SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Beginning Price').then(function(cellRef) {
              cellRef.getText().then(function(cellValue) {
                if (cellValue !== '--') {
                  tickerArrayForBeginningPriceColumn.push(ticker);
                }
              });
            });
          }
        });
      });
    });

    it('Should get the "rgb" values of the "Beginning Price" column cells who\'s values are not null', function() {
      bgcolorArray = [];
      tickerArrayForBeginningPriceColumn.forEach(function(ticker) {
        PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Beginning Price', undefined, undefined,
          true, undefined).then(function(ref) {
          Utilities.scrollElementToVisibility(ref);
          Utilities.getBgColor(ref.element(by.xpath('./div'))).then(function(bgcolor) {
            bgcolorArray.push(bgcolor);
          });
        });
      });
    });

    it('Verifying if Beginning Price column starting cell is colored with brightest green and ending cell is colored' +
      'with brightest red', function() {
      red = [];
      green = [];
      blue = [];
      alphaChannel = [];
      if (bgcolorArray[0] === 'rgba(0, 255, 0, 1)' && bgcolorArray[bgcolorArray.length - 1] === 'rgba(255, 0, 0, 1)') {
        for (var i = 0; i < bgcolorArray.length; i++) {
          var color = bgcolorArray[i].match(/\d+/g);
          red.push(parseInt(color[0]));
          green.push(parseInt(color[1]));
          blue.push(parseInt(color[2]));
          alphaChannel.push(parseInt(color[3]));
        }
      }
    });

    it('Verifying if "Beginning Price" column cell values are colored starting from brightest green, fading' +
      ' toward the base color, eventually it will start with slight red toward brightest red at end by using "rgb" values',
      function() {
        var flag = true;
        var temp = 0;
        var screenShot = 0;
        for (var i = 0; i < red.length; i++) {
          if ((green[i] === 255) && (flag === true)) {

            if ((red[i] === 255) && (blue[i] === 255)) {
              flag = false;
              temp = i;
            }

            if ((red[i] > red[i + 1]) || (blue[i] > blue[i + 1])) {
              if (flag === true) {
                expect(false).customError('"Beginning Price" column cell color is light color for "' + (i + 1) + '" row when' +
                  ' compared to "' + (i + 2) + '" row');
                screenShot = screenShot + 1;
              }
            }
          }

          if ((red[i] === 255) && (flag === false) && (temp !== i)) {
            if ((green[i] < green[i + 1]) || (blue[i] < blue[i + 1])) {
              expect(false).customError('"Beginning Price" column cell color is brighter for "' + (i + 1) + '" row when' +
                ' compared to "' + (i + 2) + '" row');
              screenShot = screenShot + 1;
            }
          }
        }

        if (screenShot > 0) {
          CommonFunctions.takeScreenShot();
        }

      });

    it('Should get "Tickers" for the corresponding "Price Change (%)" column which shows "0" or "blanks" values', function() {
      tickerArrayForPriceChangeColumn = [];
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerColumnData.forEach(function(ticker, index) {
          if (index > 0) {
            SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Price Change (%)').then(function(cellRef) {
              cellRef.getText().then(function(cellValue) {
                if (cellValue === '--' || cellValue === '0.00') {
                  tickerArrayForPriceChangeColumn.push(ticker);
                }
              });
            });
          }
        });
      });
    });

    it('Verifying if the "Beginning Price" column cells for the corresponding "Price Change (%)" ' +
      'column which shows "0" or "blanks" values are not colored', function() {
      screenShot = 0;
      tickerArrayForPriceChangeColumn.forEach(function(ticker) {
        PA3MainPage.getValueFromCalculatedReport('Contribution', ticker, 'Beginning Price', undefined, undefined,
          true, undefined).then(function(ref) {
          Utilities.scrollElementToVisibility(ref);
          Utilities.getBgColor(ref.element(by.xpath('./div'))).then(function(bgcolor) {
            if (bgcolor !== 'rgba(255, 255, 255, 1)') {
              expect(false).customError('"Beginning Price" column cells for the corresponding "Price Change (%)"' +
                'column which shows "0" or "blanks" values are colored who\'s corresponding ticker is "' + ticker + '"');
              screenShot = screenShot + 1;
            }
          });
        });
      });
      if (screenShot > 0) {
        CommonFunctions.takeScreenShot();
      }
    });

  });

});
