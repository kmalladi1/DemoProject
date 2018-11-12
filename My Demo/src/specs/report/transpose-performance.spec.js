'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: transpose-performance', function() {

  var multiheaderDates = [];
  var returnsTypeArr = ['Total Return', 'Total Return Cumulative'];
  var tempArr = [];
  var portfolioArr = ['S&P 500', 'Russell 1000'];

  // Local function(s)
  var xpath = function(location, replacingSrting) {
    return CommonFunctions.replaceStringInXpath(location, replacingSrting);
  };

  var isRowPresent = function(rowName) {
    // Variable(s)
    var xpathTable = '//*[@data-qa-class="tile" and descendant::*[normalize-space(.)="Performance"]]' + '//*[@options="ctrl.grid.options"]/*[contains(@class, "slick-frozen-rows") ' + 'and not(contains(@class, "multi-header"))]';
    var defer = protractor.promise.defer();
    var xpathRow;
    var rowReference;
    var promise = defer.promise;

    // XPATH of required row
    xpathRow = xpathTable + '//*[contains(@class, "slick-pane slick-pane-top slick-pane-left")]' + '//*[contains(@class, "slick-row") and descendant::*[normalize-space(.)="' + rowName + '"]]';

    // Get the reference of required row
    rowReference = element(by.xpath(xpathRow));
    rowReference.isPresent().then(function(isRowPresent) {
      if (!isRowPresent) {
        // If required row is not found reject the promise with error message
        CommonFunctions.takeScreenShot();
        defer.reject('"' + rowName + '" row is not found in the calculated reported.');
      } else {
        // If required row is not found reject the promise with error message
        defer.fulfill(true);
      }
    });

    return promise;
  };

  var getPortfoliosBeneathGrouping = function(groupingName) {
    var defer = protractor.promise.defer();
    var promise = defer.promise;
    var parentID;
    var portfoliosArr = [];
    var groupFound = false;
    browser.driver.executeScript(function() {
      var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
      return slickObject.grid.getData().getItems();
    }).then(function(dataView) {
      if (dataView.length === 0) {
        CommonFunctions.takeScreenShot();
        defer.reject('Grid is Empty');
      } else {
        dataView.forEach(function(rowRef) {
          if (rowRef[0] === groupingName && rowRef.hasChildren === true) {
            groupFound = true;
            parentID = rowRef.id;
            dataView.forEach(function(element) {
              if (parentID === element.parentId) {
                portfoliosArr.push(element[0]);
              }
            });
          }
        });
        if (!groupFound) {
          CommonFunctions.takeScreenShot();
          defer.reject(groupingName + ' grouping is not displayed');
        } else {
          defer.fulfill(portfoliosArr);
        }
      }
    });
    return promise;
  };

  describe('Test Step ID: 559739', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/PA3/Columns/Transpose_Performance" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('transpose-performance');
    });

    it('Waiting for "Performance" report to calculate', function() {
      // Ignoring Synchronization to handel loading
      browser.ignoreSynchronization = false;

      // Wait for report calculation to start
      browser.sleep(5000);

      // Wait for report calculation to finish
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Performance" report appeared without any errors', function() {
      //Verifying Performance reports calculated
      PA3MainPage.isReportCalculated('Performance').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Performance" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Performance')).toBeTruthy();
        } else {
          expect(true).customError(error);
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

    it('Fetching the data of the "Performance" report displayed for future verification', function() {
      returnsTypeArr.forEach(function(rowName) {
        SlickGridFunctions.getRowIndex('Performance', rowName, '').then(function(rowIndex) {
          PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Performance', 1).then(function(multiHeaderNamesOfLevel1) {
            // Storing multi-header dates for future verification
            multiheaderDates = multiHeaderNamesOfLevel1;
            multiHeaderNamesOfLevel1.forEach(function(headerOflevel1) {
              portfolioArr.forEach(function(headerOfLevel2) {
                // Appending header dates and portfolio for future verification
                var temp = headerOflevel1.concat('|' + headerOfLevel2);
                PA3MainPage.getColumnNumberRangeForMultiHeader('Performance', temp).then(function(colIndex) {
                  browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' + '.grid.getCellNode( arguments[0], arguments[1] )', rowIndex, colIndex).then(function(val) {
                    val.getText().then(function(cellValue) {

                      // Pushing report data into tempArr array
                      tempArr.push({path: temp, value: cellValue, Name: rowName});
                    });
                  });
                });
              });
            });
          });
        });
      });
    });

    it('Verifying if multi-headers are displayed in the report', function() {
      if (multiheaderDates.length === 0) {
        expect(false).customError('Multi-headers are not displayed in the report');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test Step ID: 559740', function() {

    var SandP500 = [];

    it('Should click on "wrench" icon from "Performance" report Workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Performance').click().then(function() {

        // Verifying if "Wrench" menu is opened
        ThiefHelpers.isDropDownOpen().then(function(appeared) {
          if (!appeared) {
            expect(false).customError('Menu list  not appeared after clicking on "Wrench" icon from ' + '"Performance" Report Workspace');
            CommonFunctions.takeScreenShot();
          }
        });
      }, function() {
        expect(false).customError('Unable to click on "Wrench" icon');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Transpose" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference(undefined, true).selectItemByText('Transpose').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should check the "Dates" option from the menu', function() {
      //Checking Expand Lot Level Data check box
      ThiefHelpers.getCheckBoxClassReference('undefined', xpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Dates'), true).check();

      //Verifying the checkbox is checked
      ThiefHelpers.getCheckBoxClassReference('undefined', xpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Dates')).isChecked().then(function(bool) {
        if (bool !== true) {
          expect(false).customError('"Dates" option from the "Transpose" menu is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Apply" button', function() {
      ThiefHelpers.getButtonClassReference('Apply').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait until report calculation to finish', function() {
      // Wait for report calculation to start
      browser.sleep(5000);

      // Wait for report calculation to finish
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Performance" report appeared without any errors', function() {
      //Verifying Performance reports calculated
      PA3MainPage.isReportCalculated('Performance').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Performance" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Performance')).toBeTruthy();
        } else {
          expect(true).customError(error);
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

    it('Verifying if dates in previous report header are now displayed as rows', function() {
      multiheaderDates.forEach(function(dates) {
        if (dates !== 'Total') {
          isRowPresent(dates).then(function(bool) {
            if (bool !== true) {
              expect(false).customError(dates + ' is not displayed as row in the current report');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });
    });

    it('Fetching "S&P 500" values of date ranges for verification', function() {
      returnsTypeArr.forEach(function(name) {
        multiheaderDates.forEach(function(rowName) {
          var temp = rowName.concat('|' + 'S&P 500');
          SlickGridFunctions.getCellReference('Performance', rowName, '', 'S&P 500', undefined, name).then(function(cellRef) {
            cellRef.getText().then(function(cellValue) {
              SandP500.push({name: temp, value: cellValue, return: name});
            });
          });
        });
      });
    });

    it('Verifying if "S&P 500" column values of displayed report is matching with previous report values', function() {
      var flag = 0;
      tempArr.forEach(function(ele) {
        SandP500.forEach(function(ele1) {
          if (ele.Name === ele1.return && ele.path === ele1.name) {
            if (ele.value !== ele1.value) {
              flag = 1;
              expect(false).customError(ele.path + ' of "S&P 500" column value did not match with previous' + ' report value, ' + ele.value + ' to be ' + ele1.value);
            }
          }
        });
      });
      if (flag === 1) {
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test Step ID: 559741', function() {

    var totalReturnVaues = [];

    it('Should click on "wrench" icon from "Performance" report Workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Performance').click().then(function() {

        // Verifying if "Wrench" menu is opened
        ThiefHelpers.isDropDownOpen().then(function(appeared) {
          if (!appeared) {
            expect(false).customError('Menu list  not appeared after clicking on "Wrench" icon from ' + '"Performance" Report Workspace');
            CommonFunctions.takeScreenShot();
          }
        });
      }, function() {
        expect(false).customError('Unable to click on "Wrench" icon');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Transpose" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Transpose').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should check the "Columns" option from the menu', function() {
      //Checking Expand Lot Level Data check box
      ThiefHelpers.getCheckBoxClassReference('undefined', xpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Columns')).check();

      //Verifying the checkbox is checked
      ThiefHelpers.getCheckBoxClassReference('undefined', xpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Columns')).isChecked().then(function(bool) {
        if (bool !== true) {
          expect(false).customError('Unable to check "Columns" option from the "Transpose" menu');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Dates" check box is already checked', function() {
      // Verifying the "Dates" checkbox is checked
      ThiefHelpers.getCheckBoxClassReference('undefined', xpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Dates')).isChecked().then(function(bool) {
        if (bool !== true) {
          expect(false).customError('"Dates" option from the "Transpose" menu is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Apply" button', function() {
      ThiefHelpers.getButtonClassReference('Apply').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait until report calculation to finish', function() {
      // Wait for report calculation to start
      browser.sleep(5000);

      // Wait for report calculation to finish
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Performance" report appeared without any errors', function() {
      //Verifying Performance reports calculated
      PA3MainPage.isReportCalculated('Performance').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Performance" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Performance')).toBeTruthy();
        } else {
          expect(true).customError(error);
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

    it('Verifying if "' + multiheaderDates + '" portfolios are now listed in the left most column', function() {
      SlickGridFunctions.getColumnNames('Performance').then(function(arr) {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Performance', arr[0], '').then(function(rowNamesArr) {
          rowNamesArr.forEach(function(rowName) {
            if (multiheaderDates.indexOf(rowName) === -1) {
              expect(false).customError('Portfolios "' + multiheaderDates + '" are not listed in the left most column');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if "' + portfolioArr + '" portfolios are now displayed as report header with "' + returnsTypeArr + '"' + ' columns beneath them', function() {
      PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Performance', 1).then(function(multiHeaderNamesOfLevel1) {
        portfolioArr.forEach(function(portfolio, index) {
          if (multiHeaderNamesOfLevel1.indexOf(portfolio) !== -1) {
            PA3MainPage.getColumnNumberRangeForMultiHeader('Performance', portfolio).then(function(columnNumRange) {
              columnNumRange.forEach(function(columnNum) {
                SlickGridFunctions.getColumnNames('Performance').then(function(arr) {
                  if (returnsTypeArr.indexOf(arr[columnNum]) === -1) {
                    expect(false).customError(returnsTypeArr + ' columns are not displayed under ' + multiHeaderNamesOfLevel1 + ' header');
                    CommonFunctions.takeScreenShot();
                  }
                });
              });
            });
          } else {
            expect(false).customError(portfolioArr[index] + ' is not displayed as report header in the current report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Fetching "Total Return" values for "Russell 1000" from the displayed report for verification', function() {
      PA3MainPage.getColumnNumberRangeForMultiHeader('Performance', 'Russell 1000').then(function(columnNumRange) {
        columnNumRange.forEach(function(columnNum) {
          SlickGridFunctions.getColumnNames('Performance').then(function(arr) {
            if (arr[columnNum] === 'Total Return') {
              multiheaderDates.forEach(function(rowName) {
                SlickGridFunctions.getCellReference('Performance', rowName, '', 'Total Return', 'Russell 1000').then(function(cellRef) {
                  cellRef.getText().then(function(cellvalue) {
                    totalReturnVaues.push(cellvalue);
                  });
                });
              });
            }
          });
        });
      });
    });

    it('Verifying if "Total Returns" values of "Russell 1000" portfolio matches with the previous report values', function() {
      var flag = 0;
      multiheaderDates.forEach(function(element, index) {
        var temp = multiheaderDates[index].concat('|' + 'Russell 1000');
        tempArr.forEach(function(ele) {
          if (ele.path === temp && ele.Name === 'Total Return') {
            if (ele.value !== totalReturnVaues[index]) {
              flag = 1;
              expect(false).customError('"Russell 1000|Total Return" value of "' + multiheaderDates[index] + '" row' + ' is not match with the previous report value, ' + ele.value + ' to be ' + totalReturnVaues[index]);
            }
          }
        });
      });
      if (flag === 1) {
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test Step ID: 559742', function() {

    var totalReturnCumulative = [];

    it('Should click on "wrench" icon from "Performance" report Workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Performance').click().then(function() {

        // Verifying if "Wrench" menu is opened
        ThiefHelpers.isDropDownOpen().then(function(appeared) {
          if (!appeared) {
            expect(false).customError('Menu list  not appeared after clicking on "Wrench" icon from ' + '"Performance" Report Workspace');
            CommonFunctions.takeScreenShot();
          }
        });
      }, function() {
        expect(false).customError('Unable to click on "Wrench" icon');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Transpose" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Transpose').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should un-check the "Dates" option from the menu', function() {
      //Checking Expand Lot Level Data check box
      ThiefHelpers.getCheckBoxClassReference('undefined', xpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Dates')).uncheck();

      //Verifying the checkbox is checked
      ThiefHelpers.getCheckBoxClassReference('undefined', xpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Dates')).isChecked().then(function(bool) {
        if (bool) {
          expect(false).customError('"Dates" option from the "Transpose" menu is checked off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check the "Portfolios" option from the menu', function() {
      //Checking Expand Lot Level Data check box
      ThiefHelpers.getCheckBoxClassReference('undefined', xpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Portfolios')).check();

      //Verifying the checkbox is checked
      ThiefHelpers.getCheckBoxClassReference('undefined', xpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Portfolios')).isChecked().then(function(bool) {
        if (bool !== true) {
          expect(false).customError('Unable to check "Portfolios" option from the "Transpose" menu');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Apply" button', function() {
      ThiefHelpers.getButtonClassReference('Apply').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait until report calculation to finish', function() {
      // Wait for report calculation to start
      browser.sleep(5000);

      // Wait for report calculation to finish
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Performance" report appeared without any errors', function() {
      //Verifying Performance reports calculated
      PA3MainPage.isReportCalculated('Performance').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Performance" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Performance')).toBeTruthy();
        } else {
          expect(true).customError(error);
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

    it('Verifying if "' + portfolioArr + '" portfolios are now listed in the left most column', function() {
      SlickGridFunctions.getColumnNames('Performance').then(function(arr) {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Performance', arr[0], '').then(function(rowNamesArr) {
          rowNamesArr.forEach(function(rowName) {
            if (portfolioArr.indexOf(rowName) === -1) {
              expect(false).customError('Portfolios "' + portfolioArr + '" are not listed in the left most column');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if date ranges "' + multiheaderDates + '" as report header and "' + returnsTypeArr + '" as columns' + ' underneath them', function() {
      PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Performance', 1).then(function(multiHeaderNamesOfLevel1) {
        multiHeaderNamesOfLevel1.forEach(function(multiheader) {
          if (multiheaderDates.indexOf(multiheader) !== -1) {
            PA3MainPage.getColumnNumberRangeForMultiHeader('Performance', multiheader).then(function(columnNumRange) {
              columnNumRange.forEach(function(colNum) {
                SlickGridFunctions.getColumnNames('Performance').then(function(arr) {
                  if (returnsTypeArr.indexOf(arr[colNum]) === -1) {
                    expect(false).customError(returnsTypeArr + ' are not displayed under the ' + multiheaderDates + ' multi-headers');
                    CommonFunctions.takeScreenShot();
                  }
                });
              });
            });
          } else {
            expect(false).customError(multiheaderDates + ' are not displayed as headers in the displayed report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Pushing the "Total Return Cumulative" values of "6/16/2014 to 6/17/2014" date range for verification', function() {
      PA3MainPage.getColumnNumberRangeForMultiHeader('Performance', '6/16/2014 to 6/17/2014').then(function(columnNumRange) {
        columnNumRange.forEach(function(columnNum) {
          SlickGridFunctions.getColumnNames('Performance').then(function(arr) {
            if (arr[columnNum] === 'Total Return Cumulative') {
              portfolioArr.forEach(function(rowName) {
                SlickGridFunctions.getCellReference('Performance', rowName, '', 'Total Return Cumulative', 'Russell 1000').then(function(cellRef) {
                  cellRef.getText().then(function(cellvalue) {
                    totalReturnCumulative.push({
                      path: '6/16/2014 to 6/17/2014|' + rowName,
                      return: 'Total Return Cumulative',
                      value: cellvalue,
                    });
                  });
                });
              });
            }
          });
        });
      });
    });

    it('Verifying if "Total Return Cumulative" values of "6/16/2014 to 6/17/2014" date range matches with the' + ' previous report values', function() {
      var flag = 0;
      totalReturnCumulative.forEach(function(ele1) {
        tempArr.forEach(function(ele) {
          if (ele.path === ele1.path && ele.Name === ele1.return) {
            if (ele.value !== ele1.value) {
              flag = 1;
              expect(false).customError('"6/16/2014 to 6/17/2014|Total Return Cumulative" value of a row' + ' is not match with the previous report value, ' + ele.value + ' to be ' + ele1.value);
            }
          }
        });
      });
      if (flag === 1) {
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test Step ID: 559743', function() {

    var totalReturns = [];

    it('Should click on "wrench" icon from "Performance" report Workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Performance').click().then(function() {

        // Verifying if "Wrench" menu is opened
        ThiefHelpers.isDropDownOpen().then(function(appeared) {
          if (!appeared) {
            expect(false).customError('Menu list  not appeared after clicking on "Wrench" icon from ' + '"Performance" Report Workspace');
            CommonFunctions.takeScreenShot();
          }
        });
      }, function() {
        expect(false).customError('Unable to click on "Wrench" icon');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Transpose" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference(undefined, true).selectItemByText('Transpose').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should check the "Dates" option from the menu', function() {
      //Checking Expand Lot Level Data check box
      ThiefHelpers.getCheckBoxClassReference('undefined', xpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Dates')).check();

      //Verifying the checkbox is checked
      ThiefHelpers.getCheckBoxClassReference('undefined', xpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Dates')).isChecked().then(function(bool) {
        if (bool !== true) {
          expect(false).customError('Unable to check "Dates" option from the "Transpose" menu');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Apply" button', function() {
      ThiefHelpers.getButtonClassReference('Apply').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait until report calculation to finish', function() {
      // Wait for report calculation to start
      browser.sleep(5000);

      // Wait for report calculation to finish
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Performance" report appeared without any errors', function() {
      //Verifying Performance reports calculated
      PA3MainPage.isReportCalculated('Performance').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Performance" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Performance')).toBeTruthy();
        } else {
          expect(true).customError(error);
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

    it('Verifying if "' + multiheaderDates + '" are displaying as groupings having "' + portfolioArr + '" portfolios' + ' listed under it', function() {
      multiheaderDates.forEach(function(headers) {
        getPortfoliosBeneathGrouping(headers).then(function(portfolios) {
          if (portfolios.length === portfolioArr.length) {
            portfolioArr.forEach(function(portfolio) {
              if (portfolios.indexOf(portfolio) === -1) {
                expect(false).customError(portfolio + ' portfolio is not displayed under ' + headers);
                CommonFunctions.takeScreenShot();
              }
            });
          }
        });
      });
    });

    it('Verifying if "' + returnsTypeArr + '" are displayed as columns in the displayed report', function() {
      SlickGridFunctions.getColumnNames('Performance').then(function(columnsArr) {
        returnsTypeArr.forEach(function(columnName) {
          if (columnsArr.indexOf(columnName) === -1) {
            expect(false).customError(columnName + ' is not displayed as column in the displayed report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Pushing "Total Returns" values of displayed report for verification', function() {
      multiheaderDates.forEach(function(dates) {
        portfolioArr.forEach(function(portfolio) {
          SlickGridFunctions.getCellReference('Performance', portfolio, '', 'Total Return', undefined, dates).then(function(cellRef) {
            cellRef.getText().then(function(cellvalue) {
              totalReturns.push({path: dates + '|' + portfolio, value: cellvalue});
            });
          });
        });
      });
    });

    it('Verifying if "Total Returns" values match with previously stored report values', function() {
      var flag = 0;
      tempArr.forEach(function(ele) {
        totalReturns.forEach(function(ele1) {
          if (ele.path === ele1.path && ele.Name === 'Total Return') {
            if (ele.value !== ele1.value) {
              flag = 1;
              expect(false).customError('"Total Return" value did not matched for ' + ele.path + ', ' + ele.value + ' to be ' + ele1.value);
            }
          }
        });
      });
      if (flag === 1) {
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test Step ID: 559744', function() {

    var totalValuesArr = [];

    it('Should click on "wrench" icon from "Performance" report Workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Performance').click().then(function() {

        // Verifying if "Wrench" menu is opened
        ThiefHelpers.isDropDownOpen().then(function(appeared) {
          if (!appeared) {
            expect(false).customError('Menu list  not appeared after clicking on "Wrench" icon from ' + '"Performance" Report Workspace');
            CommonFunctions.takeScreenShot();
          }
        });
      }, function() {
        expect(false).customError('Unable to click on "Wrench" icon');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Transpose" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Transpose').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should un-check the "Columns" option from the menu', function() {
      //Checking Expand Lot Level Data check box
      ThiefHelpers.getCheckBoxClassReference('undefined', xpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Columns')).uncheck();

      //Verifying the checkbox is checked
      ThiefHelpers.getCheckBoxClassReference('undefined', xpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Columns')).isChecked().then(function(bool) {
        if (bool) {
          expect(false).customError('"Columns" option from the "Transpose" menu is checked off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Apply" button', function() {
      ThiefHelpers.getButtonClassReference('Apply').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait until report calculation to finish', function() {
      // Wait for report calculation to start
      browser.sleep(5000);

      // Wait for report calculation to finish
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Performance" report appeared without any errors', function() {
      //Verifying Performance reports calculated
      PA3MainPage.isReportCalculated('Performance').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Performance" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Performance')).toBeTruthy();
        } else {
          expect(true).customError(error);
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

    it('Pushing displayed report values for verification', function() {
      returnsTypeArr.forEach(function(returns) {
        multiheaderDates.forEach(function(dates) {
          var elePath = returns.concat('|' + dates);
          portfolioArr.forEach(function(rowName) {
            // Fetching row index
            SlickGridFunctions.getRowIndex('Performance', rowName, '', elePath).then(function(rowIndex) {
              // Fetching cell value of report
              browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' + '.grid.getCellNode( arguments[0], arguments[1] )', rowIndex, 1).then(function(val) {
                val.getText().then(function(cellValue) {
                  totalValuesArr.push({portfolio: rowName, path: elePath, totalReturn: cellValue});
                });
              });
            });
          });
        });
      });
    });

    it('Verifying if report values match with the previous report values', function() {
      var flag = 0;
      tempArr.forEach(function(ele) {
        var temp = ele.Name.concat('|' + ele.path.split('|')[0]);
        totalValuesArr.forEach(function(ele1) {
          if (temp === ele1.path && ele.path.split('|')[1] === ele1.portfolio) {
            if (ele.value !== ele1.totalReturn) {
              flag = 1;
              expect(false).customError('Return value did not match for ' + ele1.path + ' of "' + ele1.portfolio + '' + ' portfolio is not matched, ' + ele.value + ' to be ' + ele1.value);
            }
          }
        });
      });
      if (flag === 1) {
        CommonFunctions.takeScreenShot();
      }
    });
  });
});
