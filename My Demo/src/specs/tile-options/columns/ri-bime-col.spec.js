'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-bime-col', function() {

  var groupName = [];
  var values = [];
  var values1 = [];
  var values2 = [];
  var values3 = [];
  var getReportNameUnderGroup = function(groupingName) {
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

  describe('Test Step ID: 673979', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Risk/BIME_REFRESH_ERROR', function() {
      PA3MainPage.switchToDocument('bime-refresh-error');
    });

    it('Waiting for "Risk Summary" report to calculate', function() {
      // Waiting for "Risk Summary" report to finish calculation
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Risk Summary" report appeared without any errors', function() {
      // Verifying that the "Risk Summary" reports calculated
      PA3MainPage.isReportCalculated('Risk Summary').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Risk Summary" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Risk Summary')).toBeTruthy();
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

    it('Verifying if "Risk Summary" report is calculated', function() {
      PA3MainPage.isReportCalculated('Risk Summary').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Risk Summary report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should copy group name at first level', function() {
      var allRef = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Risk Summary', 1, 'grid-canvas grid-canvas-top grid-canvas-left expandable');
      allRef.each(function(ref) {
        ref.getText().then(function(text) {
          groupName.push(text);
        });
      });
    });

    it('Verifying if group name is "Barra- Common Factor Variance- Decomposition"', function() {
      var allRef = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Risk Summary', 1, 'grid-canvas grid-canvas-top grid-canvas-left expandable');
      allRef.getText().then(function(arr) {
        if (arr[0] !== 'Barra- Common Factor Variance- Decomposition') {
          expect(false).customError('Group name did not "Barra- Common Factor Variance- Decomposition"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if only one group is presented', function() {
      var allRef = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Risk Summary', 1, 'grid-canvas grid-canvas-top grid-canvas-left expandable');
      allRef.getText().then(function(arr) {
        if (arr.length !== 1) {
          expect(false).customError('Only one group did not present');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arr = ['Risk Indices', 'Industries', 'Market', 'Factor Interaction'];
    arr.forEach(function(rowName) {
      it('Verifying if "' + rowName + '" is displaying in the report', function() {
        groupName.forEach(function(headers) {
          getReportNameUnderGroup(headers).then(function(portfolios) {
            if (portfolios.length === arr.length) {
              arr.forEach(function(portfolio) {
                if (portfolios.indexOf(portfolio) === -1) {
                  expect(false).customError(portfolio + ' row name did not displayed under ' + headers);
                  CommonFunctions.takeScreenShot();
                }
              });
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 673980', function() {

    var arr = ['Risk Indices', 'Industries', 'Market', 'Factor Interaction'];
    arr.forEach(function(rowName) {
      it('Should copying all values under Data column', function() {
        SlickGridFunctions.getCellReference('Risk Summary', rowName, '', 'Data', 'Dow Jones Industrials').then(function(ref) {
          ref.getText().then(function(text) {
            values.push(text);
          });
        });
      });
    });

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Risk Summary" report to calculate', function() {
      // Waiting for "Risk Summary" report to finish calculation
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Risk Summary" report appeared without any errors', function() {
      // Verifying that the "Risk Summary" reports calculated
      PA3MainPage.isReportCalculated('Risk Summary').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Risk Summary" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Risk Summary')).toBeTruthy();
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

    it('Verifying if "Risk Summary" report is calculated', function() {
      PA3MainPage.isReportCalculated('Risk Summary').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Risk Summary report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    arr.forEach(function(rowName, index) {
      it('Verifying if "' + rowName + '" value is matched with copied value', function() {
        SlickGridFunctions.getCellReference('Risk Summary', rowName, '', 'Data', 'Dow Jones Industrials').then(function(ref) {
          ref.getText().then(function(text) {
            if (text !== values[index]) {
              expect(false).customError('Copied value did not match with report value for "' + rowName + '" row. Expected "' + values[index] + '"; Found: ' + text);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 673982', function() {

    var arr = ['Risk Indices', 'Industries', 'Market', 'Factor Interaction'];
    arr.forEach(function(rowName) {
      it('Should copying all values under Data column', function() {
        SlickGridFunctions.getCellReference('Risk Summary', rowName, '', 'Data', 'Dow Jones Industrials').then(function(ref) {
          ref.getText().then(function(text) {
            values1.push(text);
          });
        });
      });
    });

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Risk Summary" report to calculate', function() {
      // Waiting for "Risk Summary" report to finish calculation
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Risk Summary" report appeared without any errors', function() {
      // Verifying that the "Risk Summary" reports calculated
      PA3MainPage.isReportCalculated('Risk Summary').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Risk Summary" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Risk Summary')).toBeTruthy();
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

    it('Verifying if "Risk Summary" report is calculated', function() {
      PA3MainPage.isReportCalculated('Risk Summary').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Risk Summary report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    arr.forEach(function(rowName, index) {
      it('Verifying if "' + rowName + '" value is matched with copied value', function() {
        SlickGridFunctions.getCellReference('Risk Summary', rowName, '', 'Data', 'Dow Jones Industrials').then(function(ref) {
          ref.getText().then(function(text) {
            if (text !== values1[index]) {
              expect(false).customError('Copied value did not match with report value for "' + rowName + '" row. Expected "' + values1[index] + '"; Found: ' + text);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 673983', function() {

    var arr = ['Risk Indices', 'Industries', 'Market', 'Factor Interaction'];
    arr.forEach(function(rowName) {
      it('Should copying all values under Data column', function() {
        SlickGridFunctions.getCellReference('Risk Summary', rowName, '', 'Data', 'Dow Jones Industrials').then(function(ref) {
          ref.getText().then(function(text) {
            values2.push(text);
          });
        });
      });
    });

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Risk Summary" report to calculate', function() {
      // Waiting for "Risk Summary" report to finish calculation
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Risk Summary" report appeared without any errors', function() {
      // Verifying that the "Risk Summary" reports calculated
      PA3MainPage.isReportCalculated('Risk Summary').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Risk Summary" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Risk Summary')).toBeTruthy();
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

    it('Verifying if "Risk Summary" report is calculated', function() {
      PA3MainPage.isReportCalculated('Risk Summary').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Risk Summary report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    arr.forEach(function(rowName, index) {
      it('Verifying if "' + rowName + '" value is matched with copied value', function() {
        SlickGridFunctions.getCellReference('Risk Summary', rowName, '', 'Data', 'Dow Jones Industrials').then(function(ref) {
          ref.getText().then(function(text) {
            if (text !== values2[index]) {
              expect(false).customError('Copied value did not match with report value for "' + rowName + '" row. Expected "' + values2[index] + '"; Found: ' + text);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 674100', function() {

    var arr = ['Risk Indices', 'Industries', 'Market', 'Factor Interaction'];
    arr.forEach(function(rowName) {
      it('Should copying all values under Data column', function() {
        SlickGridFunctions.getCellReference('Risk Summary', rowName, '', 'Data', 'Dow Jones Industrials').then(function(ref) {
          ref.getText().then(function(text) {
            values3.push(text);
          });
        });
      });
    });

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Risk Summary" report to calculate', function() {
      // Waiting for "Risk Summary" report to finish calculation
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Risk Summary" report appeared without any errors', function() {
      // Verifying that the "Risk Summary" reports calculated
      PA3MainPage.isReportCalculated('Risk Summary').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Risk Summary" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Risk Summary')).toBeTruthy();
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

    it('Verifying if "Risk Summary" report is calculated', function() {
      PA3MainPage.isReportCalculated('Risk Summary').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Risk Summary report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    arr.forEach(function(rowName, index) {
      it('Verifying if "' + rowName + '" value is matched with copied value', function() {
        SlickGridFunctions.getCellReference('Risk Summary', rowName, '', 'Data', 'Dow Jones Industrials').then(function(ref) {
          ref.getText().then(function(text) {
            if (text !== values3[index]) {
              expect(false).customError('Copied value did not match with report value for "' + rowName + '" row. Expected "' + values3[index] + '"; Found: ' + text);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });
});
