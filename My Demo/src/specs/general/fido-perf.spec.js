'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: fido-perf', function() {

  describe('Test Step ID: 679168', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Super_client:/Pa3/FIDO_Regression test"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('fido-regression-test');
    });

    it('Verifying if "Industry Exposure (GICS)" report is calculated', function() {
      PA3MainPage.isReportCalculated('Industry Exposure (GICS)').then(function(isCalculated) {
        if (!isCalculated) {
          expect(false).customError('"Industry Exposure (GICS)" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Industry Exposure (GICS)')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Industry - Weights Difference Chart" chart is loaded', function() {
      PA3MainPage.isInChartFormat('Industry - Weights Difference Chart').then(function(displayed) {
        if (!displayed) {
          expect(false).customError('"Industry - Weights Difference Chart" is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var flag = 0;
    it('Verifying if report is opened without any issues', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          flag = flag + 1;
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrValues = ['100.00', '--'];
    var arrCols = ['Port. Weight', 'Difference'];
    arrCols.forEach(function(column, index) {
      it('Verify that "Total" value for "' + column + '" column is "' + arrValues[index] + '"', function() {
        SlickGridFunctions.getCellReference('Industry Exposure (GICS)', 'Total', '', column).then(function(reference) {
          reference.getText().then(function(val) {
            if (val !== arrValues[index]) {
              flag = flag + 1;
              expect(false).customError('"Total" value for "' + column + '" column is not matched ' + 'with"' + arrValues[index] + '", Found: ' + val);
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 679197', function() {

    it('Should select "Country Exposure" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Exposures Reports', 'Country Exposure').then(function(ref) {
        ref.click().then(function() {
        }, function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });

      // Verifying "Country Exposure" Report is selected.
      ThiefHelpers.getNavepaneItemReference('Reports', 'Exposures Reports', 'Country Exposure').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Country Exposure" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should wait for reports to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);
    });

    it('Verifying if "Country Exposure" report is calculated', function() {
      PA3MainPage.isReportCalculated('Country Exposure').then(function(isCalculated) {
        if (!isCalculated) {
          expect(false).customError('"Country Exposure" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Country Exposure')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Country - Weights Difference Chart" chart is loaded', function() {
      PA3MainPage.isInChartFormat('Country - Weights Difference Chart').then(function(displayed) {
        if (!displayed) {
          expect(false).customError('"Country - Weights Difference Chart" is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var flag = 0;
    it('Verifying if the report is opened without any issues', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          flag = flag + 1;
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrValues = ['100.00', '--'];
    var arrCols = ['Port. Weight', 'Difference'];
    arrCols.forEach(function(column, index) {
      it('Verify that "Total" value for "' + column + '" column is "' + arrValues[index] + '"', function() {
        SlickGridFunctions.getCellReference('Country Exposure', 'Total', '', column).then(function(reference) {
          reference.getText().then(function(val) {
            if (val !== arrValues[index]) {
              flag = flag + 1;
              expect(false).customError('"Total" value for "' + column + '" column is not matched ' + 'with"' + arrValues[index] + '", Found: ' + val);
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 679208', function() {

    it('Should select "Security Exposure" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Exposures Reports', 'Security Exposure').then(function(ref) {
        ref.click().then(function() {
        }, function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });

      // Verifying "Security Exposure" Report is selected.
      ThiefHelpers.getNavepaneItemReference('Reports', 'Exposures Reports', 'Security Exposure').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Security Exposure" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Waiting for reports to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);
    });

    var flag = 0;
    it('Verifying if "Security Exposure" report is calculated', function() {
      PA3MainPage.isReportCalculated('Security Exposure').then(function(isCalculated) {
        if (!isCalculated) {
          expect(false).customError('"Security Exposure" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Security Exposure')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          flag = flag + 1;
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrValues = ['100.00', '100.00', '--', '--', '69.00', '82.07', '45.00', '23.27'];
    it('Verify that "Total" values for "Security Exposure" report', function() {
      SlickGridFunctions.getRowData('Security Exposure', 'Total', '').then(function(rowdata) {
        for (var i = 0; i < arrValues.length; i++) {
          if (arrValues[i] !== rowdata[i + 1]) {
            flag = flag + 1;
            expect(false).customError('Total value is not matching with Expected value ' + arrValues[i] + ', found ' + rowdata[i + 1]);
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        }
      });
    });
  });

  describe('Test Step ID: 679216', function() {

    it('Should select "Top 10 Positions" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Top Position Reports', 'Top 10 Positions').then(function(ref) {
        ref.click().then(function() {
        }, function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });

      // Verifying "Top 10 Positions" Report is selected.
      ThiefHelpers.getNavepaneItemReference('Reports', 'Top Position Reports', 'Top 10 Positions').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Top 10 Positions" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Waiting for reports to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);
    });

    var flag = 0;
    it('Verifying if "Top 10 Positions" report is calculated', function() {
      PA3MainPage.isReportCalculated('Top 10 Positions').then(function(isCalculated) {
        if (!isCalculated) {
          expect(false).customError('"Top 10 Positions" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Top 10 Positions')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          flag = flag + 1;
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrValues = ['100.00', '2,411,015,367.07', '', '', ''];
    it('Verify that "Total" values for "Top 10 Positions" report', function() {
      SlickGridFunctions.getRowData('Top 10 Positions', 'Total', '').then(function(rowdata) {
        for (var i = 0; i < arrValues.length; i++) {
          if (arrValues[i] !== rowdata[i + 1]) {
            flag = flag + 1;
            expect(false).customError('Total value is not matching with Expected value ' + arrValues[i] + ', found ' + rowdata[i + 1]);
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        }
      });
    });
  });

  describe('Test Step ID: 679217', function() {

    it('Should select "Ex Ante Risk Analytics" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Risk', 'Ex Ante Risk Analytics').then(function(ref) {
        ref.click().then(function() {
        }, function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });

      // Verifying "EX Ante Risk Analytics" Report is selected.
      ThiefHelpers.getNavepaneItemReference('Reports', 'Risk', 'Ex Ante Risk Analytics').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"EX Ante Risk Analytics" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Waiting for reports to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);
    });

    var flag = 0;
    it('Verifying if "Ex Ante Risk Analytics" report is calculated', function() {
      PA3MainPage.isReportCalculated('Ex Ante Risk Analytics').then(function(isCalculated) {
        if (!isCalculated) {
          expect(false).customError('"Ex Ante Risk Analytics" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Ex Ante Risk Analytics')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          flag = flag + 1;
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrValues = ['', '4.99', '0.82', '15.31', '18.13', '97.09', '', '27.5'];
    var arrRows = ['Risk Characterisitcs', 'Tracking Error', 'Beta ', 'Portfolio Volatility', 'Benchmark Volatility', 'Portfolio Weight Covered by Risk Model', 'Risk Decomposition', '%Contribution- Asset Selection'];
    arrRows.forEach(function(rowName, index) {
      it('Verify the "' + rowName + '" values in "Ex Ante Risk Analytics" report is ' + arrValues[index] + '', function() {
        SlickGridFunctions.getCellReference('Ex Ante Risk Analytics', rowName, '', 'Data', 'FAST EUROPE FUND').then(function(valueRef) {
          valueRef.getText().then(function(value) {
            if (value !== arrValues[index]) {
              flag = flag + 1;
              expect(false).customError('"' + rowName + '" value is not matching with Expected value ' + arrValues[index] + ', ' + 'found ' + value);
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 679218', function() {

    it('Should select "Stock-Level Contributors to Risk" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Risk', 'Stock-Level Contributors to Risk').then(function(ref) {
        ref.click().then(function() {
        }, function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });

      // Verifying "Stock-Level Contributors to Risk" Report is selected.
      ThiefHelpers.getNavepaneItemReference('Reports', 'Risk', 'Stock-Level Contributors to Risk').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Stock-level contributors to Risk" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Waiting for reports to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);
    });

    var flag = 0;
    it('Verifying if "Stock-Level Contributors to Risk" report is calculated', function() {
      PA3MainPage.isReportCalculated('Stock-Level Contributors to Risk').then(function(isCalculated) {
        if (!isCalculated) {
          expect(false).customError('"Stock-Level Contributors to Risk" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Stock-Level Contributors to Risk')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          flag = flag + 1;
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrValues = ['100.00', '100.00', '--', '', '4.985339', '--', '2.615715', '0.275291', '0.724709', '1.000000', '', ''];
    it('Verify that "Total" values for "Stock-Level Contributors to Risk" report', function() {
      SlickGridFunctions.getRowData('Stock-Level Contributors to Risk', 'Total', '').then(function(rowdata) {
        for (var i = 0; i < arrValues.length; i++) {
          if (arrValues[i] !== rowdata[i + 1]) {
            flag = flag + 1;
            expect(false).customError('Total value is not matching with Expected value ' + arrValues[i] + ', found ' + rowdata[i + 1]);
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        }
      });
    });
  });

  describe('Test Step ID: 679219', function() {

    it('Should select "Factor Exposures & Risk" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Risk', 'Factor Exposures & Risk').then(function(ref) {
        ref.click().then(function() {
        }, function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });

      // Verifying "Factor Exposures & Risk" Report is selected.
      ThiefHelpers.getNavepaneItemReference('Reports', 'Risk', 'Factor Exposures & Risk').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Factor Exposures & Risk" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Waiting for reports to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);
    });

    var flag = 0;
    it('Verifying if "Factor Exposures & Risk" report is calculated', function() {
      PA3MainPage.isReportCalculated('Factor Exposures & Risk').then(function(isCalculated) {
        if (!isCalculated) {
          expect(false).customError('"Factor Exposures & Risk" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Factor Exposures & Risk')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          flag = flag + 1;
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify the "Total" values in "Ex Ante Risk Analytics" report is "-0.57"', function() {
      SlickGridFunctions.getCellReference('Factor Exposures & Risk', 'Total', '', 'Active Exposure').then(function(valueRef) {
        valueRef.getText().then(function(value) {
          if (value !== '-0.57') {
            flag = flag + 1;
            expect(false).customError('Total value is not matching with Expected value "-0.57", found ' + value);
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });
  });

  describe('Test Step ID: 679220', function() {

    it('Should select "Beta Decomposition (GICS)" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Additional Reports', 'Beta Decomposition (GICS)').then(function(ref) {
        ref.click().then(function() {
        }, function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });

      // Verifying "Beta Decomposition (GICS)" Report is selected.
      ThiefHelpers.getNavepaneItemReference('Reports', 'Additional Reports', 'Beta Decomposition (GICS)').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Beta Decomposition (GICS)" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Waiting for reports to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);
    });

    var flag = 0;
    it('Verifying if "Beta Decomposition (GICS)" report is calculated', function() {
      PA3MainPage.isReportCalculated('Beta Decomposition').then(function(isCalculated) {
        if (!isCalculated) {
          expect(false).customError('"Beta Decomposition" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Beta Decomposition')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          flag = flag + 1;
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrValues = ['100.00', '100.00', '--', '0.82', '1.00', '-0.03', '-0.06', '-0.09'];
    it('Verify that "Total" values for "Beta Decomposition" report', function() {
      SlickGridFunctions.getRowData('Beta Decomposition', 'Total', '').then(function(rowdata) {
        for (var i = 0; i < arrValues.length; i++) {
          if (arrValues[i] !== rowdata[i + 1]) {
            flag = flag + 1;
            expect(false).customError('Total value is not matching with Expected value ' + arrValues[i] + ', found ' + rowdata[i + 1]);
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        }
      });
    });
  });
});
