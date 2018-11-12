'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: bh-bm-tbr', function() {

  describe('Test Step ID: 704213', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Accounts/bh_bm_tbr" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('bh-bm-tbr');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Contribution to Return`);

    it('Verify that "Contribution Detail" report is selected from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Performance', 'Contribution Detail').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Contribution Detail" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if report header contains "TBR Cash Flow Start of Day"', function() {
      PA3MainPage.getHeader().getText().then(function(reportHeader) {
        if (reportHeader.indexOf('TBR Cash Flow Start of Day') < 0) {
          expect(false).customError('Report did not match. ' +
            'Expected: "TBR Cash Flow Start of Day", Found: "' + reportHeader + '"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    var arrRows = ['[Cash]', 'Finance'];
    var flag = 0;
    arrRows.forEach(function(row) {
      it('Verifying if "' + row + '" row, "Purchase" column should contain a Value', function() {
        SlickGridFunctions.getCellReference('Contribution to Return', row, '', 'Purchase').then(function(cellRef) {
          cellRef.getText().then(function(cellValue) {
            if (cellValue === '' || cellValue === null || cellValue === '--') {
              flag = flag + 1;
              expect(false).customError('"' + row + '" doesnot contain value, found :' + cellValue);
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

    it('Verifying if "[Cash]" grouping, "Sale" column should contain a Value', function() {
      SlickGridFunctions.getCellReference('Contribution to Return', '[Cash]', '', 'Sale').then(function(cellRef) {
        cellRef.getText().then(function(cellValue) {
          if (cellValue === '' || cellValue === null || cellValue === '--') {
            flag = flag + 1;
            expect(false).customError('"[Cash]" doesnot contain value, found :' + cellValue);
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

  });

  describe('Test Step ID: 704214', function() {

    it('Should click on Portfolio Hamburger icon', function() {
      PA3MainPage.getHamburgerIcon('portfolio').click().then(function() {}, function() {
        expect(false).customError('Unable to click on Portfolio Hamburger icon');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Portfolio Hamburger drop down is displayed', function() {
      ThiefHelpers.isDropDownOpen(1).then(function(status) {
        if (!status) {
          expect(false).customError('Portfolio Hamburger drop down is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Add Portfolio Variation"/"+" button in Portfolio hamburger drop down', function() {
      element(by.xpath(PA3MainPage.xathAddPortfolioVarationButton)).click().then(function() {}, function() {
        expect(false).customError('Unable to click on "Add Portfolio Variation"/"+" button in Portfolio hamburger drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Portfolio Variation" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen(2).then(function(status) {
        if (!status) {
          expect(false).customError('"Portfolio Variation" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Buy & Hold" from the Variation Type drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Buy & Hold', 'Variation Type');
    });

    it('Verifying if "Buy & Hold" is set to the Variation Type drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Buy & Hold', 'Variation Type');
    });

    it('Should select " TBR Cash Flow Start of Day " from "Portfolios" section in the "Portfolio Variation" dialog', function() {
      ThiefHelpers.getListBoxItem(PA3MainPage.xpathPortfolioVariationListbox, 'TBR Cash Flow Start of Day').select();
    });

    it('Verifying that "TBR Cash Flow Start of Day" is selected under the "Portfolios" section in the "Portfolio Variation" dialog', function() {
      PA3MainPage.getListOfPortfoliosFromAddPortfolioVariations().then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(itemRef) {
          itemRef.getText().then(function(value) {
            if (value === 'TBR Cash Flow Start of Day') {
              itemRef.getAttribute('class').then(function(status) {
                if (status.indexOf('selected') < 0) {
                  expect(false).customError('"TBR Cash Flow Start of Day" is not selected in the "Portfolio Variation" dialog');
                  CommonFunctions.takeScreenShot();
                }
              });
            }
          });
        });
      });
    });

    it('Should click on "OK" button in "Add Portfolio Variation" drop down', function() {
      PA3MainPage.getOkOrCancelButtonInAddPortfolioVaration('OK').click().then(function() {}, function() {
        expect(false).customError('Unable to click on "OK" button in "Add Portfolio Variation" drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      ThiefHelpers.isDropDownOpen().then(function(status) {
        if (status) {
          expect(false).customError('"Portfolio" drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Contribution to Return`);

    it('Verify that "Contribution Detail" report is selected from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Performance', 'Contribution Detail').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Contribution Detail" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if report header contains "TBR Cash Flow Start of Day (Buy & Hold) | As Of: Report Start Date | Rebalance: None"', function() {
      PA3MainPage.getHeader().getText().then(function(reportHeader) {
        if (reportHeader !== 'TBR Cash Flow Start of Day (Buy & Hold) | As Of: Report Start Date | Rebalance: None') {
          expect(false).customError('Report did not match. ' +
            'Expected: "TBR Cash Flow Start of Day (Buy & Hold) | As Of: Report Start Date | Rebalance: None", Found: "' + reportHeader + '"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    var arrCols = ['Purchase', 'Sale'];
    var flag = 0;
    arrCols.forEach(function(colName) {
      it('Verify that the "' + colName + '" column should not contain value', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution to Return', '').then(function(colValues) {
          colValues.forEach(function(rowName) {
            SlickGridFunctions.getCellReference('Contribution to Return', rowName, '', colName).then(
              function(cellRef) {
                cellRef.getText().then(function(value) {
                  if (value !== '--') {
                    flag = flag + 1;
                    expect(false).customError(rowName + ' value for "' + colName + '" column contains value, Found ' + value);
                    if (flag === 1) {
                      CommonFunctions.takeScreenShot();
                    }
                  }
                });
              });
          });
        });
      });
    });

  });

  describe('Test Step ID: 762888', function() {

    it('Should open PA3 Application with "Client:/Pa3/General/TBR Buy & Hold Mode" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('tbr-buy-and-hold-mode');
    });

    var arrGroups = ['TBR BH4 - Sale, no transfer, income - Transactions', 'TBR BH3 -no sale,transfer, income - Transactions'];

    arrGroups.forEach(function(groupName) {
      it('Should expand "' + groupName + '" in the "Contribution" report', function() {
        PA3MainPage.expandTreeInCalculatedReport('Contribution', groupName, undefined, 'grid-canvas grid-canvas-top grid-canvas-left expandable');
      });

      it('verifying if "' + groupName + '" is expanded in the "Contribution" report', function() {
        PA3MainPage.checkIfTreeExpandedInCalculatedReport('Contribution', groupName, 'grid-canvas grid-canvas-top grid-canvas-left expandable');
      });
    });

    it('Verify if security "Vereit Operating Partnership Lp 4.875% 01-jun-2026" under TBR BH4 and TBR BH3 will display the same values for "Port. Total Return" column', function() {
      SlickGridFunctions.getCellReference('Contribution', 'Vereit Operating Partnership Lp 4.875% 01-jun-2026', '',
        'Port. Total Return', undefined, 'TBR BH4 - Sale, no transfer, income - Transactions').then(function(ref1) {
        SlickGridFunctions.getCellReference('Contribution', 'Vereit Operating Partnership Lp 4.875% 01-jun-2026', '',
          'Port. Total Return', undefined, 'TBR BH3 -no sale,transfer, income - Transactions').then(function(ref2) {
          ref1.getText().then(function(text1) {
            ref2.getText().then(function(text2) {
              if (text1 !== text2) {
                expect(false).customError('Values are not same for "Vereit Operating Partnership Lp 4.875% 01-jun-2026" ' +
                  'under TBR BH4 and TBR BH3 for "Port. Total Return" column. Value1 ' + text1 + ' value2 ' + text2);
                CommonFunctions.takeScreenShot();
              }
            });
          });
        });
      });
    });

  });

});
