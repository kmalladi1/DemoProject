'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: smart-cache-2', function() {

  // Variable(s)
  var arrTileNames;

  describe('Test Step: 608085', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Automation/SMART_CACHE_2"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('smart-cache-2');
    });

    it('Verifying if "Performance Overview" is selected by default', function() {
      PA3MainPage.getReports('Performance Overview').getAttribute('class').then(function(attrValue) {
        expect(attrValue.indexOf('selected') > -1).customError('"Performance Overview" report is not selected by default.');
        if (attrValue.indexOf('selected') < 0) {
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Waiting for "Total Returns" and "Performance" reports to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Total Returns'), 300000)
        .then(function(present) {
          if (!present) {
            expect(false).customError('"Total Returns" report has not calculated');
            CommonFunctions.takeScreenShot();
          }
        });

      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Performance'), 300000)
        .then(function(present) {
          if (!present) {
            expect(false).customError('"Performance" report has not calculated');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying if "Total Returns" report is calculated', function() {
      PA3MainPage.isReportCalculated('Total Returns').then(function(displayed) {
        expect(displayed).customError('"Total Returns" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Total Returns')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Total Returns" report: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Performance" chart is calculated', function() {
      PA3MainPage.isInChartFormat('Performance').then(function(displayed) {
        expect(displayed).customError('"Performance" chart is not displayed on the web page.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Performance')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Performance" chart: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(dialog) {
        if (dialog) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    arrTileNames = ['Total Returns', 'Performance'];

    arrTileNames.forEach(function(tileName) {

      it('Verifying if text saying "Cached data from" appeared next to "Footnotes" and the timestamp read as todays date for' +
        ' "' + tileName + '" report', function() {
        PA3MainPage.getCachedData(tileName).getText().then(function(text) {
          expect(text.indexOf('Cached data from') > -1).customError('The message saying ' +
            '"Cached data from..." is not displayed next to Footnotes of "' + tileName + '" report.');
          if (text.indexOf('Cached data from') < 0) {
            CommonFunctions.takeScreenShot();
          } else {
            var date = text.substring(text.indexOf('from') + 5, text.lastIndexOf('at') - 1);

            var currentDate;

            Utilities.getCurrentDate().then(function(val) {
              currentDate = val;
            }).then(function() {
              if (date !== currentDate) {
                expect(false).customError('The timestamp in the Cached message is not displaying today\'s date. ' +
                  'Expected: "' + currentDate + '" Found: "' + date + '"');
                CommonFunctions.takeScreenShot();
              }
            });
          }
        }, function() {

          expect(false).customError('The message saying ' +
            '"Cached data from..." is not displayed next to Footnotes of "' + tileName + '" report.');
          CommonFunctions.takeScreenShot();
        });

      });

    });

  });

  describe('Test Step: 608086', function() {

    it('Should click on "3 Factor Attribution - With Currency" in the LHP', function() {
      PA3MainPage.getReports('3 Factor Attribution - With Currency').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Waiting for "3 Factor Attribution with Currency" and "Attribution Over Time - 3 Factor (with currency)" reports to calculate',
      function() {
        Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('3 Factor Attribution with Currency'), 300000)
          .then(function(present) {
            if (!present) {
              expect(false).customError('"3 Factor Attribution with Currency" report has not calculated');
              CommonFunctions.takeScreenShot();
            }
          });

        Utilities.waitUntilElementDisappears(
          PA3MainPage.getReportCalculationDlg('Attribution Over Time - 3 Factor (with currency)'), 300000)
          .then(function(present) {
            if (!present) {
              expect(false).customError('"Attribution Over Time - 3 Factor (with currency)" report has not calculated');
              CommonFunctions.takeScreenShot();
            }
          });

      });

    it('Verifying if "3 Factor Attribution with Currency" report is calculated', function() {
      PA3MainPage.isReportCalculated('3 Factor Attribution with Currency').then(function(displayed) {
        expect(displayed).customError('"3 Factor Attribution with Currency" report is not displayed on the web page.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('3 Factor Attribution with Currency')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "3 Factor Attribution with Currency" report: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Attribution Over Time - 3 Factor (with currency)" chart is calculated', function() {
      PA3MainPage.isInChartFormat('Attribution Over Time - 3 Factor (with currency)').then(function(displayed) {
        expect(displayed).customError('"Attribution Over Time - 3 Factor (with currency)"' +
          ' chart is not displayed on the web page.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Attribution Over Time - 3 Factor (with currency)')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Attribution Over Time - 3 Factor (with currency)" ' +
            'chart: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    arrTileNames = ['3 Factor Attribution with Currency', 'Attribution Over Time - 3 Factor (with currency)'];

    arrTileNames.forEach(function(tileName) {

      it('Verifying if text saying "Cached data from" appeared next to "Footnotes" and the timestamp read as todays date for' +
        ' "' + tileName + '" report', function() {
        PA3MainPage.getCachedData(tileName).getText().then(function(text) {
          expect(text.indexOf('Cached data from') > -1).customError('The message saying ' +
            '"Cached data from..." is not displayed next to Footnotes of "' + tileName + '" report.');
          if (text.indexOf('Cached data from') < 0) {
            CommonFunctions.takeScreenShot();
          } else {
            var date = text.substring(text.indexOf('from') + 5, text.lastIndexOf('at') - 1);

            var currentDate;

            Utilities.getCurrentDate().then(function(val) {
              currentDate = val;
            }).then(function() {
              if (date !== currentDate) {
                expect(false).customError('The timestamp in the Cached message is not displaying today\'s date. ' +
                  'Expected: "' + currentDate + '" Found: "' + date + '"');
                CommonFunctions.takeScreenShot();
              }
            });
          }
        }, function() {

          expect(false).customError('The message saying ' +
            '"Cached data from..." is not displayed next to Footnotes of "' + tileName + '" report.');
          CommonFunctions.takeScreenShot();
        });

      });

    });

  });

  describe('Test Step: 608087', function() {

    it('Should click on "Exposures Over Time Chart" in the LHP', function() {
      PA3MainPage.getReports('Exposures Over Time Chart').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Waiting for "Exposures Over Time Chart" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Exposures Over Time Chart'), 300000)
        .then(function(present) {
          if (!present) {
            expect(false).customError('"Exposures Over Time Chart" report has not calculated');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying if "Exposures Over Time Chart" chart is calculated', function() {
      PA3MainPage.isInChartFormat('Exposures Over Time Chart').then(function(displayed) {
        expect(displayed).customError('"Exposures Over Time Chart" chart is not displayed on the web page.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Exposures Over Time Chart')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Exposures Over Time Chart" chart: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    it('Verifying if text saying "Cached data from" appeared next to "Footnotes" and the timestamp read as todays date for' +
      ' "Exposures Over Time Chart" report', function() {
      PA3MainPage.getCachedData('Exposures Over Time Chart').getText().then(function(text) {
        expect(text.indexOf('Cached data from') > -1).customError('The message saying ' +
          '"Cached data from..." is not displayed next to Footnotes of "Exposures Over Time Chart" report.');
        if (text.indexOf('Cached data from') < 0) {
          CommonFunctions.takeScreenShot();
        } else {
          var date = text.substring(text.indexOf('from') + 5, text.lastIndexOf('at') - 1);

          var currentDate;

          Utilities.getCurrentDate().then(function(val) {
            currentDate = val;
          }).then(function() {
            if (date !== currentDate) {
              expect(false).customError('The timestamp in the Cached message is not displaying today\'s date. ' +
                'Expected: "' + currentDate + '" Found: "' + date + '"');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      }, function() {

        expect(false).customError('The message saying ' +
          '"Cached data from..." is not displayed next to Footnotes of "Exposures Over Time Chart" report.');
        CommonFunctions.takeScreenShot();
      });

    });

  });

  describe('Test Step: 608103', function() {

    it('Should click on the "Hamburger" icon next to "Portfolio" widget', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is not open.');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should select "MULTISTRAT_DEMO_ACCT" from the list of accounts', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'MULTISTRAT_DEMO_ACCT').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "MULTISTRAT_DEMO_ACCT" account is selected
      expect(PA3MainPage.getSingleAccountFromList('Portfolio', 'MULTISTRAT_DEMO_ACCT').getAttribute('class'))
        .toContain('selected');
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      expect(PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('Class')).not.toContain('active');
    });

    it('Verifying if header displays "MULTISTRAT_DEMO_ACCT vs MSCI USA"', function() {
      PA3MainPage.getHeader().getText().then(function(text) {
        //console.log( text );
        if (text !== 'MULTISTRAT_DEMO_ACCT vs MSCI USA') {
          expect(false).customError('Header of application is not showing "MULTISTRAT_DEMO_ACCT vs MSCI USA". ' +
            'Expected: "MULTISTRAT_DEMO_ACCT vs MSCI USA" but Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Waiting for "Exposures Over Time Chart" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Exposures Over Time Chart'), 300000)
        .then(function(present) {
          if (!present) {
            expect(false).customError('"Exposures Over Time Chart" report has not calculated');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying if "Exposures Over Time Chart" chart is calculated', function() {
      PA3MainPage.isInChartFormat('Exposures Over Time Chart').then(function(displayed) {
        expect(displayed).customError('"Exposures Over Time Chart" chart is not displayed on the web page.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Exposures Over Time Chart')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Exposures Over Time Chart" chart: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    it('Verifying if text saying "Cached data from" appeared next to "Footnotes" and the timestamp read as today\'s date for' +
      ' "Exposures Over Time Chart" report', function() {
      PA3MainPage.getCachedData('Exposures Over Time Chart').getText().then(function(text) {
        expect(text.indexOf('Cached data from') > -1).customError('The message saying ' +
          '"Cached data from..." is not displayed next to Footnotes of "Exposures Over Time Chart" report.');
        if (text.indexOf('Cached data from') < 0) {
          CommonFunctions.takeScreenShot();
        } else {
          var date = text.substring(text.indexOf('from') + 5, text.lastIndexOf('at') - 1);

          var currentDate;

          Utilities.getCurrentDate().then(function(val) {
            currentDate = val;
          }).then(function() {
            if (date !== currentDate) {
              expect(false).customError('The timestamp in the Cached message is not displaying today\'s date. ' +
                'Expected: "' + currentDate + '" Found: "' + date + '"');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      }, function() {

        expect(false).customError('The message saying ' +
          '"Cached data from..." is not displayed next to Footnotes of "Exposures Over Time Chart" report.');
        CommonFunctions.takeScreenShot();
      });

    });

  });

  describe('Test Step: 608104', function() {

    it('Should click on "3 Factor Attribution - With Currency" in the LHP', function() {
      PA3MainPage.getReports('3 Factor Attribution - With Currency').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Waiting for "3 Factor Attribution with Currency" and "Attribution Over Time - 3 Factor (with currency)" reports to calculate',
      function() {
        Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('3 Factor Attribution with Currency'), 300000)
          .then(function(present) {
            if (!present) {
              expect(false).customError('"3 Factor Attribution with Currency" report has not calculated');
              CommonFunctions.takeScreenShot();
            }
          });

        Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Attribution Over Time - 3 Factor ' +
          '(with currency)'), 300000).then(function(present) {
          if (!present) {
            expect(false).customError('"Attribution Over Time - 3 Factor (with currency)" report has not calculated');
            CommonFunctions.takeScreenShot();
          }
        });

      });

    it('Verifying if "3 Factor Attribution with Currency" report is calculated', function() {
      PA3MainPage.isReportCalculated('3 Factor Attribution with Currency').then(function(displayed) {
        expect(displayed).customError('"3 Factor Attribution with Currency" report is not displayed on the web page.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('3 Factor Attribution with Currency')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "3 Factor Attribution with Currency" report: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Attribution Over Time - 3 Factor (with currency)" chart is calculated', function() {
      PA3MainPage.isInChartFormat('Attribution Over Time - 3 Factor (with currency)').then(function(displayed) {
        expect(displayed).customError('"Attribution Over Time - 3 Factor (with currency)"' +
          ' chart is not displayed on the web page.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Attribution Over Time - 3 Factor (with currency)')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Attribution Over Time - 3 Factor (with currency)" ' +
            'chart: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(dialog) {
        if (dialog) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    arrTileNames = ['3 Factor Attribution with Currency', 'Attribution Over Time - 3 Factor (with currency)'];

    arrTileNames.forEach(function(tileName) {

      it('Verifying if text saying "Cached data from" appeared next to "Footnotes" and the timestamp read as todays date for' +
        ' "' + tileName + '" report', function() {
        PA3MainPage.getCachedData(tileName).getText().then(function(text) {
          expect(text.indexOf('Cached data from') > -1).customError('The message saying ' +
            '"Cached data from..." is not displayed next to Footnotes of "' + tileName + '" report.');
          if (text.indexOf('Cached data from') < 0) {
            CommonFunctions.takeScreenShot();
          } else {
            var date = text.substring(text.indexOf('from') + 5, text.lastIndexOf('at') - 1);

            var currentDate;

            Utilities.getCurrentDate().then(function(val) {
              currentDate = val;
            }).then(function() {
              if (date !== currentDate) {
                expect(false).customError('The timestamp in the Cached message is not displaying today\'s date. ' +
                  'Expected: "' + currentDate + '" Found: "' + date + '"');
                CommonFunctions.takeScreenShot();
              }
            });
          }
        }, function() {

          expect(false).customError('The message saying ' +
            '"Cached data from..." is not displayed next to Footnotes of "' + tileName + '" report.');
          CommonFunctions.takeScreenShot();
        });

      });

    });

  });

  describe('Test Step: 608105', function() {

    it('Should click on "Performance Overview" in the LHP', function() {
      // Getting the Reference of required element
      var elementReference = PA3MainPage.getReports('Performance Overview');

      // Clicking on the element
      browser.actions().mouseMove(elementReference).click().perform();

    });

    it('Waiting for "Total Returns" and "Performance" reports to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Total Returns'), 300000)
        .then(function(present) {
          if (!present) {
            expect(false).customError('"Total Returns" report has not calculated');
            CommonFunctions.takeScreenShot();
          }
        });

      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Performance'), 300000)
        .then(function(present) {
          if (!present) {
            expect(false).customError('"Performance" report has not calculated');
            CommonFunctions.takeScreenShot();
          }
        });

    });

    it('Verifying if "Total Returns" report is calculated', function() {
      PA3MainPage.isReportCalculated('Total Returns').then(function(displayed) {
        expect(displayed).customError('"Total Returns" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Total Returns')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Total Returns" report: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Performance" chart is calculated', function() {
      PA3MainPage.isInChartFormat('Performance').then(function(displayed) {
        expect(displayed).customError('"Performance" chart is not displayed on the web page.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Performance')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Performance" chart: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    arrTileNames = ['Total Returns', 'Performance'];

    arrTileNames.forEach(function(tileName) {

      it('Verifying if text saying "Cached data from" appeared next to "Footnotes" and the timestamp read as todays date for' +
        ' "' + tileName + '" report', function() {
        PA3MainPage.getCachedData(tileName).getText().then(function(text) {
          expect(text.indexOf('Cached data from') > -1).customError('The message saying ' +
            '"Cached data from..." is not displayed next to Footnotes of "' + tileName + '" report.');
          if (text.indexOf('Cached data from') < 0) {
            CommonFunctions.takeScreenShot();
          } else {
            var date = text.substring(text.indexOf('from') + 5, text.lastIndexOf('at') - 1);

            var currentDate;

            Utilities.getCurrentDate().then(function(val) {
              currentDate = val;
            }).then(function() {
              if (date !== currentDate) {
                expect(false).customError('The timestamp in the Cached message is not displaying today\'s date. ' +
                  'Expected: "' + currentDate + '" Found: "' + date + '"');
                CommonFunctions.takeScreenShot();
              }
            });
          }
        }, function() {

          expect(false).customError('The message saying ' +
            '"Cached data from..." is not displayed next to Footnotes of "' + tileName + '" report.');
          CommonFunctions.takeScreenShot();
        });

      });

    });

  });

});
