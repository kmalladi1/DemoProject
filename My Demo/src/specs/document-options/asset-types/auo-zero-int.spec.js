'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: auo-zero-int', function() {

  describe('Test Step ID: Startup Instructions', function() {

    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 492357', function() {

    var tickerArray = ['', '', 'CASH_VND_1DAY', 'CASH_VEB_1DAY', 'CASH_USD_1DAY', 'CASH_UAH_1DAY', 'CASH_THB_1DAY', 'CASH_SGD_1DAY', 'CASH_RUB_1DAY', 'CASH_NZD_1DAY', 'CASH_MAD_1DAY', 'CASH_LVL_1DAY', 'CASH_LTL_1DAY', 'CASH_LKR_1DAY', 'CASH_KRW_1DAY', 'CASH_JPY_1DAY', 'CASH_ISK_1DAY', 'CASH_INR_1DAY', 'CASH_IDR_1DAY', 'CASH_HKD_1DAY', 'CASH_GBP_1DAY', 'CASH_EUR_1DAY', 'CASH_CZK_1DAY', 'CASH_CRC_1DAY', 'CASH_COP_1DAY', 'CASH_CHF_1DAY', 'CASH_CAD_1DAY', 'CASH_ARS_1DAY', 'ABCDEF', '123456'];
    var securitiesArray = ['Total', 'Zero Interest Cash', 'Vietnam Dong', 'Venezuelan Old Bolivar', 'U.S. Dollar', 'Ukraine Hryvnia', 'Thailand Baht', 'Singapore Dollar', 'Russian Rouble', 'New Zealand Dollar', 'Moroccan Dirham', 'Latvian Lats', 'Lithuanian Litas', 'Sri Lanka Rupee', 'South Korean Won', 'Japanese Yen', 'Icelandic Krona', 'Indian Rupee', 'Indonesian Rupiah', 'Hong Kong Dollar', 'British Pounds', 'Euro', 'Czech Koruna', 'Costa Rica Colon', 'Colombian Peso', 'Swiss Franc', 'Canadian Dollar', 'Argentine Peso', '@NA', '@NA'];
    var totalReturnsArray = ['-.117121932783237', '-.117121932783237', '-.0355184080000015', 'NaN', 'NaN', '.137531759999998', '.449585899999994', '.199639799999995', '.462174420000006', '-.864452100000002', '-.126624099999995', '-.0866174700000055', '-.0822663300000026', '.399315359999997', '.086152549999996', '.0254869459999973', '-.553911900000004', '.272274020000007', '.43364763', '.0186920169999993', '.0586628900000052', '-.081259010000001', '.242018700000002', '-.0160038470000012', '.766468050000002', '-.220686199999998', '-.4503429', '-.0647068000000028', '-.081259010000001', 'NaN'];

    it('Should open "AUO_CONV_0INT" document from "Client:/Pa3/Universe/"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('auto-conv-oint');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Contribution`);

    var flag = 0;
    it('Verifying if all the cell in the "Ticker" column is matched with "tickerArray" array data', function() {
      // Fetching "Ticker" column data
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerArray.forEach(function(ticker, index) {

          // Verifying "Ticker" column data
          if (ticker !== tickerColumnData[index]) {
            flag = flag + 1;
            expect(false).customError('In the "' + index + '" row Ticker is not matched with expected.' + ' Expected = "' + tickerColumnData[index] + '", found = "' + ticker + '"');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it('Verifying if all the cell in the "Securities" column is matched with "securitiesArray" array data', function() {
      tickerArray.forEach(function(ticker, index) {

        // Verifying Securities
        if (index > 1) {
          browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' + '.grid.scrollCellIntoView( arguments[0], arguments[1])', index, 2);
          SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', '').then(function(securityRef) {
            securityRef.getText().then(function(securityValue) {
              if (securityValue !== securitiesArray[index]) {
                flag = flag + 1;
                expect(false).customError('In the "' + index + '" row, Security for "' + ticker + '" Ticker is not ' + 'matched with expected. Expected = "' + securitiesArray[index] + '", found = "' + securityValue + '"');
                if (flag === 1) {
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          });
        } else {
          SlickGridFunctions.getRowData('Contribution', index, '').then(function(rowData) {
            if (rowData[1] !== securitiesArray[index]) {
              flag = flag + 1;
              expect(false).customError('In the "' + index + '" row, Security for "' + ticker + '" Ticker is not ' + 'matched with expected. Expected = "' + securitiesArray[index] + '", found = "' + rowData[1] + '"');
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        }
      });
    });

    it('Verifying if all the cell in the "Total Returns" column is matched with "totalReturnsArray" array data', function() {
      tickerArray.forEach(function(ticker, index) {
        if (index > 1) {
          SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Total Return', '').then(function(totalReturnRef) {
            totalReturnRef.getText().then(function(totalReturnValue) {
              if (parseFloat(totalReturnValue).toFixed(6) !== parseFloat(totalReturnsArray[index]).toFixed(6)) {
                flag = flag + 1;
                expect(false).customError('In the "' + index + '" row, "Total Returns" value for "' + ticker + '" Ticker ' + 'is not matched with expected. Expected = "' + parseFloat(totalReturnsArray[index]).toFixed(6) + '",' + ' found = "' + parseFloat(totalReturnValue).toFixed(6) + '"');
                if (flag === 1) {
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          });
        } else {
          SlickGridFunctions.getRowData('Contribution', index, '').then(function(rowData) {
            if (parseFloat(rowData[2]).toFixed(6) !== parseFloat(totalReturnsArray[index]).toFixed(6)) {
              flag = flag + 1;
              expect(false).customError('In the "' + index + '" row, "Total Returns" value for "' + ticker + '" Ticker ' + 'is not matched with expected. Expected = "' + parseFloat(totalReturnsArray[index]).toFixed(6) + '", ' + 'found = "' + parseFloat(rowData[2]).toFixed(6) + '"');
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        }
      });
    });
  });

  describe('Test Step ID: 492358', function() {

    var tickerArray = ['', '', 'CASH_VND_1DAY', 'CASH_VEB_1DAY', 'CASH_USD_1DAY', 'CASH_UAH_1DAY', 'CASH_THB_1DAY', 'CASH_SGD_1DAY', 'CASH_RUB_1DAY', 'CASH_NZD_1DAY', 'CASH_MAD_1DAY', 'CASH_LVL_1DAY', 'CASH_LTL_1DAY', 'CASH_LKR_1DAY', 'CASH_KRW_1DAY', 'CASH_JPY_1DAY', 'CASH_ISK_1DAY', 'CASH_INR_1DAY', 'CASH_IDR_1DAY', 'CASH_HKD_1DAY', 'CASH_GBP_1DAY', 'CASH_EUR_1DAY', 'CASH_CZK_1DAY', 'CASH_CRC_1DAY', 'CASH_COP_1DAY', 'CASH_CHF_1DAY', 'CASH_CAD_1DAY', 'CASH_ARS_1DAY', 'ABCDEF', '123456'];
    var securitiesArray = ['Total', 'Zero Interest Cash', 'Vietnam Dong', 'Venezuelan Old Bolivar', 'U.S. Dollar', 'Ukraine Hryvnia', 'Thailand Baht', 'Singapore Dollar', 'Russian Rouble', 'New Zealand Dollar', 'Moroccan Dirham', 'Latvian Lats', 'Lithuanian Litas', 'Sri Lanka Rupee', 'South Korean Won', 'Japanese Yen', 'Icelandic Krona', 'Indian Rupee', 'Indonesian Rupiah', 'Hong Kong Dollar', 'British Pounds', 'Euro', 'Czech Koruna', 'Costa Rica Colon', 'Colombian Peso', 'Swiss Franc', 'Canadian Dollar', 'Argentine Peso', '@NA', '@NA'];
    var totalReturnsArray = ['-.130572195210643', '-.130572195210643', '-.0284612179999977', '.00340938570000393', '.000287794400000152', '.157368180000006', '.456392770000003', '.20020007999999', '.479328629999998', '-.857716799999997', '-.118362900000002', '-.0864863400000027', '-.0795364400000054', '.42302608', '.0929236399999978', '.0256896020000008', '-.535476199999996', '.29802322000001', '.448906419999995', '.018858909999997', '.0599503499999932', '-.0810802000000055', '.242078300000004', '-.00526308999999614', '.775384899999998', '-.220698119999996', '-.44762492', '-.0411093239999993', 'NA', 'NA'];

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Add/Remove', 'Asset Types', 'document options');

    it('Should check "Disable asset type adjustments" checkbox', function() {
      ThiefHelpers.getCheckBoxClassReference('Disable asset type adjustments').check();
    });

    it('Verifying if the "Disable asset type adjustments" checkbox is checked', function() {
      ThiefHelpers.getCheckBoxClassReference('Disable asset type adjustments').isChecked().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Disable asset type adjustments" checkbox is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() { }, function() {
        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Document Options" dialog is closed', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(status) {
        if (status) {
          expect(false).customError('"Document Options" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Contribution`);

    var flag = 0;
    it('Verifying if all the cell in the "Ticker" column is matched with "tickerArray" array data', function() {
      // Fetching "Ticker" column data
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution', 'Ticker').then(function(tickerColumnData) {
        tickerArray.forEach(function(ticker, index) {

          // Verifying "Ticker" column data
          if (ticker !== tickerColumnData[index]) {
            flag = flag + 1;
            expect(false).customError('In the "' + index + '" row Ticker is not matched with expected.' + ' Expected = "' + tickerColumnData[index] + '", found = "' + ticker + '"');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it('Verifying if all the cell in the "Securities" column is matched with "securitiesArray" array data', function() {
      tickerArray.forEach(function(ticker, index) {

        // Verifying Securities
        if (index > 1) {
          browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' + '.grid.scrollCellIntoView( arguments[0], arguments[1])', index, 2);
          SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', '', '').then(function(securityRef) {
            securityRef.getText().then(function(securityValue) {
              if (securityValue !== securitiesArray[index]) {
                flag = flag + 1;
                expect(false).customError('In the "' + index + '" row, Security for "' + ticker + '" Ticker is not ' + 'matched with expected. Expected = "' + securitiesArray[index] + '", found = "' + securityValue + '"');
                if (flag === 1) {
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          });
        } else {
          SlickGridFunctions.getRowData('Contribution', index, '').then(function(rowData) {
            if (rowData[1] !== securitiesArray[index]) {
              flag = flag + 1;
              expect(false).customError('In the "' + index + '" row, Security for "' + ticker + '" Ticker is not ' + 'matched with expected. Expected = "' + securitiesArray[index] + '", found = "' + rowData[1] + '"');
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        }
      });
    });

    it('Verifying if all the cell in the "Total Returns" column is matched with "totalReturnsArray" array data', function() {
      tickerArray.forEach(function(ticker, index) {
        if (index > 1) {
          SlickGridFunctions.getCellReference('Contribution', ticker, 'Ticker', 'Total Return', '').then(function(totalReturnRef) {
            totalReturnRef.getText().then(function(totalReturnValue) {
              if (parseFloat(totalReturnValue).toFixed(6) !== parseFloat(totalReturnsArray[index]).toFixed(6)) {
                flag = flag + 1;
                expect(false).customError('In the "' + index + '" row, "Total Returns" value for "' + ticker + '" Ticker ' + 'is not matched with expected. Expected = "' + parseFloat(totalReturnsArray[index]).toFixed(6) + '",' + ' found = "' + parseFloat(totalReturnValue).toFixed(6) + '"');
                if (flag === 1) {
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          });
        } else {
          SlickGridFunctions.getRowData('Contribution', index, '').then(function(rowData) {
            if (parseFloat(rowData[2]).toFixed(6) !== parseFloat(totalReturnsArray[index]).toFixed(6)) {
              flag = flag + 1;
              expect(false).customError('In the "' + index + '" row, "Total Returns" value for "' + ticker + '" Ticker ' + 'is not matched with expected. Expected = "' + parseFloat(totalReturnsArray[index]).toFixed(6) + '", ' + 'found = "' + parseFloat(rowData[2]).toFixed(6) + '"');
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        }
      });
    });
  });
});
