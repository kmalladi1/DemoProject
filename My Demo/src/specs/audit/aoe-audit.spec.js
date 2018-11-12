'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: aoe-audit', function() {

  var arrColIndex = [];

  // Local function
  var getColIndex = function(reportName, rowName, multiHeaderColName, headerColName) {

    var defer = protractor.promise.defer();
    var promise = defer.promise;
    var preColCount = 0;
    var colCount = 0;
    var arrColumns = [];
    var colIndex;

    // Collecting all column headers
    PA3MainPage.getAllColumnOfCalculatedReport(reportName).each(function(ele) {
      Utilities.scrollElementToVisibility(ele);
      ele.getText().then(function(colText) {
        colText = colText.replace(/\n/g, ' ');
        arrColumns.push(colText);
      });
    });

    PA3MainPage.getAllMultiHeaderColumns(reportName).each(function(ele) {
      Utilities.scrollElementToVisibility(ele);
      ele.getText().then(function(text) {

        // Verifying if "Multi Header" column
        if (text === multiHeaderColName) {
          ele.getAttribute('colspan').then(function(col) {
            colCount = preColCount + parseInt(col);
            for (var i = preColCount; i <= colCount; i++) {
              if (arrColumns[i] === headerColName) {
                colIndex = i;
                defer.fulfill(colIndex + 1);
                break;
              }
            }
          });
        } else {
          ele.getAttribute('colspan').then(function(col) {
            preColCount = preColCount + parseInt(col);
          });
        }
      });
    });

    return promise;
  };

  describe('Test Step ID: 568328', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch PA3 Application with "Client:;Pa3;Audit;FI_ANLYT_OVR_AUDIT" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('fi-anlyt-ovr-audit');
    });

    it('Should Wait for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Should click on the "Wrench" button on the application toolbar', function() {
      PA3MainPage.getWrenchIcon().click();

      // Verifying if drop down menu appear
      expect(PA3MainPage.getWrenchIcon(true).isPresent()).toBeTruthy();
    });

    it('Should select "Analytics Overrides>View Overrides"', function() {
      PA3MainPage.getOptionFromWrenchMenu('Analytics Overrides|View Overrides').click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while selecting "Analytics Overrides>View Overrides"' + err);
      });
    });

    it('Verifying if "Weights" report is grouped by date range: "15-JUN-2015 - 26-JUN-2015"', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(value) {
        if (value !== '15-JUN-2015 - 26-JUN-2015') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Report was not grouped by date range: "15-JUN-2015 - 26-JUN-2015"');
        }
      });
    });

    var arrMultiHeaderCols = ['15-JUN-2015', '16-JUN-2015'];
    arrMultiHeaderCols.forEach(function(value) {
      it('Fetching column Index for "' + value + ' > Port. Ending Effective Duration" column', function() {
        getColIndex('Weights', '88579YAE', value, 'Port. Ending Effective Duration').then(function(val) {
          arrColIndex.push(val);
        });

        browser.sleep(3000);
      });
    });

    arrMultiHeaderCols.forEach(function(multiHeaderCol, index) {
      it('Verifying that "Port. Ending Effective Duration" column cell value for the symbol "88579YAE"' + ' under "' + multiHeaderCol + '" is colored in pink', function() {
        // Scroll to the required column
        browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' + '.grid.scrollCellIntoView( 1,  arguments[0] )', arrColIndex[index]);

        PA3MainPage.getCellValueForMultiHeaderColumn('Weights', '88579YAE', arrColIndex[index], 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right', true).then(function(reference) {
          browser.sleep(3000);
          Utilities.getBgColor(reference).then(function(val) {
            if (val !== 'rgba(254, 224, 224, 1)') {
              CommonFunctions.takeScreenShot();
              expect(false).customError('"Port. Ending Effective Duration" cell value is not ' + 'highlighted in pink color');
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 568329', function() {

    it('Should right click on the "Port. Ending Effective Duration" value for "88579YAE" and select "Audit Value"', function() {
      PA3MainPage.getCellValueForMultiHeaderColumn('Weights', '88579YAE', arrColIndex[0], 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right', true).then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verify that Report view  "Port. Ending Effective Duration" under "15-JUN-2015" for the symbol "88579YAE" is' + ' highlighted', function() {
      // Scroll to the required column
      browser.driver.executeScript('return $( ".tf-slick-grid:eq(0)" ).data( "$tfSlickGridController" )' + '.grid.scrollCellIntoView( 1,  arguments[0] )', arrColIndex[0]);

      AuditMode.getValueFromCalculatedMultiHeaderReport('Weights', '88579YAE', arrColIndex[0], undefined, true).then(function(ref) {
        ref.getAttribute('class').then(function(attrValue) {
          if (attrValue.indexOf('selected') < 0) {
            CommonFunctions.takeScreenShot();
            expect(false).customError('"Port. Ending Effective Duration" value is not highlighted');
          }
        });
      });
    });

    it('Verify that Report view  "Port. Ending Effective Duration" value should match with Audit view "Analytics ' + 'Overrides" value', function() {
      AuditMode.getValueFromCalculatedMultiHeaderReport('Weights', '88579YAE', arrColIndex[0], undefined).then(function(reportValue) {
        expect(AuditMode.getReportInputsSectionValues(1, 1).getText()).toEqual('Analytics Overrides');
        AuditMode.getReportInputsSectionValues(1, 2).getText().then(function(auditValue) {
          AuditMode.roundAndMatch(reportValue, auditValue);
        });
      });
    });

    it('Verify that Date range on top of the Audit view should display as "15-JUN-2015"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '15-JUN-2015') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('The Audit date range is not matched with "15-JUN-2015"');
        }
      });
    });
  });

  describe('Test Step ID: 568330', function() {

    it('Should click on the "Port. Ending Effective Duration" value for "88579YAE" in report view', function() {
      browser.driver.executeScript('return $( ".tf-slick-grid:eq(0)" ).data( "$tfSlickGridController" )' + '.grid.scrollCellIntoView( 1, arguments[0] )', arrColIndex[1]);

      AuditMode.getValueFromCalculatedMultiHeaderReport('Weights', '88579YAE', arrColIndex[1], 0, true).then(function(reference) {
        reference.click();
      });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verify that Date range on top of the Audit view should display as "16-JUN-2015"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '16-JUN-2015') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('The Audit date range is not matched with "16-JUN-2015"');
        }
      });
    });

    it('Verify that Report view "Port. Ending Effective Duration" value should match with Audit view  "Analytics Overrides" ' + 'value', function() {
      AuditMode.getValueFromCalculatedMultiHeaderReport('Weights', '88579YAE', arrColIndex[1], undefined).then(function(reportValue) {
        expect(AuditMode.getReportInputsSectionValues(1, 1).getText()).toEqual('Analytics Overrides');
        AuditMode.getReportInputsSectionValues(1, 2).getText().then(function(auditValue) {
          AuditMode.roundAndMatch(reportValue, auditValue);
        });
      });
    });
  });

  describe('Test Step ID: 568331', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Done" button' + err);
      });
    });

    it('Should verify that the report is dispalyed and not auto calculated ', function() {
      PA3MainPage.getReportCalculationDlg().isPresent().then(function(found) {
        if (found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('PA3 report is auto calculating');
        }
      });

      // Waiting for elements to load in DOM
      browser.sleep(2000);

      // Verifying if Weights report is displayed
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 762110', function() {

    it('Should open "Client:/Pa3/Audit/Audit Cutoff_New" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('audit-cutoff-new');
    });

    it('Should click on refresh icon on app toolbar', function() {
      PA3MainPage.getRefreshIcon().click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Should right click on "Contribution to Return" column value and select "Audit Value"', function() {
      SlickGridFunctions.getCellReference('Contribution to Return', '3M Company', '', 'Average Weight').then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);
    });

    it('Verifying if view changed to "Audit" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Audit').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Audit" mode.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var topMonthRange;

    it('Should click on the top months Average weight', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Average Weight', '').then(function(arr) {
        topMonthRange = arr[1];
        SlickGridFunctions.getCellReference('Average Weight', arr[1], '', 'Average Weight').then(function(reference) {
          reference.getText().then(function(val) {
            reference.click();
          });
        });
      });
    });

    it('Should wait until loading icon in Attribution disappears', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Average Weight'), 60000)).toBeTruthy();
    });

    var arrOfFirstDate = [];
    var arrOfLastDate = [];
    var arrOfFirstDateBeforeSort = [];
    var arrOfFirstDateAfterSort = [];
    var arrOfLastDateBeforeSort = [];
    var arrOfLastDateAfterSort = [];
    it('Verifying if daily dates are displayed for selected date range', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Average Weight', '').then(function(arr) {
        arr.forEach(function(rowRef) {
          if (rowRef !== 'Total') {
            var colvalue = rowRef.split(' to ');
            arrOfFirstDateBeforeSort.push(colvalue[0]);
            arrOfFirstDate.push(colvalue[0]);
            arrOfLastDateBeforeSort.push(colvalue[1]);
            arrOfLastDate.push(colvalue[1]);
          }
        });
      });
    });

    it('Sorting date in descending order manually', function() {
      Utilities.sortDates(arrOfFirstDate, 'descending').then(function(date) {

        //Storing sorted date in empty array
        date.forEach(function(sortDate) {
          arrOfFirstDateAfterSort.push(sortDate);
        });
      });

      Utilities.sortDates(arrOfLastDate, 'descending').then(function(date) {

        //Storing sorted date in empty array
        date.forEach(function(sortDate) {
          arrOfLastDateAfterSort.push(sortDate);
        });
      });
    });

    it('Verifying if column data is sorted in descending order', function() {
      var needScreenShot = 0;
      arrOfFirstDateAfterSort.forEach(function(sortedDate, index) {
        if (sortedDate !== arrOfFirstDateBeforeSort[index]) {
          expect(false).customError('Date is not sorted in descending order; Expected: "' + sortedDate + '" Found: ' + arrOfFirstDateBeforeSort[index]);
          needScreenShot++;
          if (needScreenShot === 1) {
            CommonFunctions.takeScreenShot();
          }
        }
      });

      arrOfLastDateAfterSort.forEach(function(sortedDate, index) {
        if (sortedDate !== arrOfLastDateBeforeSort[index]) {
          expect(false).customError('Date is not sorted in descending order; Expected: "' + sortedDate + '" Found: ' + arrOfLastDateBeforeSort[index]);
          needScreenShot++;
          if (needScreenShot === 1) {
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });

    it('Verify if top and bottom date rages are displayed as expected', function() {
      var dateRange = topMonthRange.split(' to ');
      if (arrOfFirstDateBeforeSort[arrOfFirstDateBeforeSort.length - 1] === dateRange[0]) {
        if (arrOfLastDateBeforeSort[0] !== dateRange[1]) {
          expect(false).customError('Expected "' + dateRange[1] + '" but Found: "' + arrOfLastDateAfterSort[arrOfLastDateAfterSort.length - 1] + '"');
          CommonFunctions.takeScreenShot();
        }
      } else {
        expect(false).customError('Expected "' + dateRange[0] + '" but Found: "' + arrOfFirstDateAfterSort[arrOfFirstDateAfterSort.length - 1] + '"');
        CommonFunctions.takeScreenShot();
      }
    });

  });

  describe('Test Step ID: 762132', function() {

    it('Should click on the top months average weight', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Average Weight', '').then(function(arr) {
        SlickGridFunctions.getCellReference('Average Weight', arr[1], '', 'Average Weight').then(function(reference) {
          reference.getText().then(function(val) {
            reference.click();
          });
        });
      });
    });

    var arrOfExpectedNamesInAuditView = ['Port. Beginning Market Value', 'Total Port. Beginning Market Value'];
    it('Should verify if expected text is displayed in the Audit view', function() {
      element.all(by.xpath(CommonFunctions.replaceStringInXpath(AuditMode.xpathOfValuesInAuditViewFormulaSection, 'Port. Beginning Market Value'))).each(function(element, index) {
        element.getText().then(function(name) {
          if (name !== arrOfExpectedNamesInAuditView[index]) {
            expect(false).customError('Expected "' + arrOfExpectedNamesInAuditView[index] + '" but Found: "' + name + '".');
            CommonFunctions.takeScreenShot();
          }
        });

      });
    });

    it('Should verify if expected text is displayed in the Audit view', function() {
      element(by.xpath(CommonFunctions.replaceStringInXpath(AuditMode.xpathOfTotal, 'Average Weight'))).isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Average Weight" is not present in the Audit view.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 762133', function() {

    it('Should click on the left arrow button twice in the audit view', function() {
      for (var i = 0; i < 2; i++) {
        ThiefHelpers.getButtonClassReference(undefined, CommonFunctions.replaceStringInXpath(AuditMode.xpathOfArrowButtons, 'left')).press();
      }
    });

    it('Verifying if view changed to "Audit" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Audit').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Audit" mode.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrOfFirstDateBeforeSort = [];
    var arrOfLastDateBeforeSort = [];
    it('Verifying if daily dates are displayed for selected date range', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Average Weight', '').then(function(arr) {
        arr.forEach(function(rowRef) {
          if (rowRef !== 'Total') {
            var colvalue = rowRef.split(' to ');
            arrOfFirstDateBeforeSort.push(colvalue[0]);
            arrOfLastDateBeforeSort.push(colvalue[1]);
          }
        });
      });
    });

    var monthsInNames = {1:'JAN', 2: 'FEB', 3: 'MAR', 4: 'APR', 5: 'MAY', 6: 'JUN', 7: 'JUL', 8: 'AUG', 9: 'SEP', 10: 'OCT', 11: 'NOV', 12: 'DEC'};
    var monthsInNumber = {JAN: 1, FEB:2, MAR: 3, APR: 4, MAY: 5, JUN: 6, JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV:11, DEC:12};

    it('Verifying if Audit view displays date range in month', function() {
      var needScreenShot = 0;
      arrOfFirstDateBeforeSort.forEach(function(firstDate, index) {
        var month = firstDate.replace(/[^A-Za-z]+/g, '');
        if (month  !== -1) {
          var secondMonth = arrOfLastDateBeforeSort[index].replace(/[^A-Za-z]+/g, '');
          if (month === 'DEC') {
            if (monthsInNames[monthsInNumber[secondMonth]] !== 'JAN') {
              expect(false).customError('Expected "JAN" but Found: "' + monthsInNames[monthsInNumber[secondMonth]] + '".');
              CommonFunctions.takeScreenShot();
            }
          } else {
            if (secondMonth !== monthsInNames[monthsInNumber[month] + 1]) {
              expect(false).customError('Expected "' + monthsInNames[monthsInNumber[month] + 1] + '" but Found: "' + monthsInNames[monthsInNumber[secondMonth]] + '".');
              needScreenShot++;
              if (needScreenShot === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          }
        }
      });
    });
  });
});
