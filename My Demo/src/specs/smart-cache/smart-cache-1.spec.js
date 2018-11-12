'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: smart-cache-1', function() {

  // Variable(s)
  var arrTileNames;

  describe('Test Step: 608066', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Automation/SMART_CACHE_1"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('smart-cache-1');
    });

    it('Verifying if "Top Positions" is selected by default', function() {
      PA3MainPage.getReports('Top Positions').getAttribute('class').then(function(attrValue) {
        expect(attrValue.indexOf('selected') > -1).customError('"Top Positions" report is not selected by default.');
        if (attrValue.indexOf('selected') < 0) {
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Waiting for "Top 5 Positions", "Top/Bottom Relative Positions" and "Position Concentration" reports to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Top 5 Positions'), 300000)
        .then(function(present) {
          if (!present) {
            expect(false).customError('"Top 5 Positions" report has not calculated');
            CommonFunctions.takeScreenShot();
          }
        });

      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Top/Bottom Relative Positions'), 300000)
        .then(function(present) {
          if (!present) {
            expect(false).customError('"Top/Bottom Relative Positions" report has not calculated');
            CommonFunctions.takeScreenShot();
          }
        });

      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Position Concentration'), 300000)
        .then(function(present) {
          if (!present) {
            expect(false).customError('"Position Concentration" report has not calculated');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    arrTileNames = ['Top 5 Positions', 'Top/Bottom Relative Positions'];

    arrTileNames.forEach(function(tileName) {

      it('Verifying if "' + tileName + '" report is calculated', function() {
        PA3MainPage.isReportCalculated(tileName).then(function(displayed) {
          expect(displayed).customError('"' + tileName + '" report is not displayed on the web page.');
          if (!displayed) {
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            expect(PA3MainPage.isReportCalculated(tileName)).toBeTruthy();
          } else {
            expect(false).customError('Error found while calculating "' + tileName + '" report: ' + error);
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
      });

    });

    it('Verifying if "Position Concentration" chart is calculated', function() {
      PA3MainPage.isInChartFormat('Position Concentration').then(function(displayed) {
        expect(displayed).customError('"Position Concentration" chart is not displayed on the web page.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Position Concentration')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Position Concentration" chart: ' + error);
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

    arrTileNames = ['Top 5 Positions', 'Top/Bottom Relative Positions', 'Position Concentration'];

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

  describe('Test Step: 608067', function() {

    it('Should click on "Exposure Overview" in the LHP', function() {
      PA3MainPage.getReports('Exposures Overview').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Weights" and "Weights Difference"reports to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 300000)
        .then(function(present) {
          if (!present) {
            expect(false).customError('"Weights" report has not calculated');
            CommonFunctions.takeScreenShot();
          }
        });

      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights Difference'), 300000)
        .then(function(present) {
          if (!present) {
            expect(false).customError('"Weights Difference" report has not calculated');
            CommonFunctions.takeScreenShot();
          }
        });

    });

    it('Verifying if "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Weights" report: ' + error);
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

    it('Verifying if "Weights Difference" chart is calculated', function() {
      PA3MainPage.isInChartFormat('Weights Difference').then(function(displayed) {
        expect(displayed).customError('"Weights Difference" chart is not displayed on the web page.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Weights Difference')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Weights Difference" chart: ' + error);
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

    arrTileNames = ['Weights', 'Weights Difference'];

    arrTileNames.forEach(function(tileName) {

      it('Verifying if text saying "Cached data from" appeared next to "Footnotes" and the timestamp read as today\'s date for' +
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

  describe('Test Step: 608068', function() {

    it('Should click on "Characteristics Overview" in the LHP', function() {
      PA3MainPage.getReports('Characteristics Overview').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Summary Characteristics", "Characteristics Over Time" ans "Detail Characteristics" reports to calculate',
      function() {
        Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Summary Characteristics'), 300000)
          .then(function(present) {
            if (!present) {
              expect(false).customError('"Summary Characteristic" report has not calculated');
              CommonFunctions.takeScreenShot();
            }
          });

        Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Characteristics Over Time'), 300000)
          .then(function(present) {
            if (!present) {
              expect(false).customError('"Characteristics Over Time" report has not calculated');
              CommonFunctions.takeScreenShot();
            }
          });

        Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Detail Characteristics'), 300000)
          .then(function(present) {
            if (!present) {
              expect(false).customError('"Detail Characteristics" report has not calculated');
              CommonFunctions.takeScreenShot();
            }
          });

      });

    arrTileNames = ['Summary Characteristics', 'Detail Characteristics'];

    arrTileNames.forEach(function(tileName) {

      it('Verifying if "' + tileName + '" report is calculated', function() {
        PA3MainPage.isReportCalculated(tileName).then(function(displayed) {
          expect(displayed).customError('"' + tileName + '" report is not displayed on the web page.');
          if (!displayed) {
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            expect(PA3MainPage.isReportCalculated(tileName)).toBeTruthy();
          } else {
            expect(false).customError('Error found while calculating "' + tileName + '" report: ' + error);
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

    });

    it('Verifying if "Characteristics Over Time" chart is calculated', function() {
      PA3MainPage.isInChartFormat('Characteristics Over Time').then(function(displayed) {
        expect(displayed).customError('"Characteristics Over Time" chart is not displayed on the web page.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Characteristics Over Time')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Characteristics Over Time" chart: ' + error);
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

    arrTileNames = ['Summary Characteristics', 'Characteristics Over Time', 'Detail Characteristics'];

    arrTileNames.forEach(function(tileName) {

      it('Verifying if text saying "Cached data from" appeared next to "Footnotes" and the timestamp read as today\'s date for' +
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

  describe('Test Step: 608084', function() {

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

    it('Should select "Large Cap Core Test" from the list of accounts', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'Large Cap Core Test').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Large Cap Core Test" account is selected
      expect(PA3MainPage.getSingleAccountFromList('Portfolio', 'Large Cap Core Test').getAttribute('class'))
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

    it('Verifying if header displays "Large Cap Core Test vs S&P 500"', function() {
      PA3MainPage.getHeader().getText().then(function(text) {
        if (text !== 'Large Cap Core Test vs S&P 500') {
          expect(false).customError('Header of application is not showing "Large Cap Core Test vs S&P 500". ' +
            'Expected: "Large Cap Core Test vs S&P 500", Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Summary Characteristics", "Characteristics Over Time" ans "Detail Characteristics" reports to calculate',
      function() {
        Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Summary Characteristics'), 300000)
          .then(function(present) {
            if (!present) {
              expect(false).customError('"Summary Characteristic" report has not calculated');
              CommonFunctions.takeScreenShot();
            }
          });

        Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Characteristics Over Time'), 300000)
          .then(function(present) {
            if (!present) {
              expect(false).customError('"Characteristics Over Time" report has not calculated');
              CommonFunctions.takeScreenShot();
            }
          });

        Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Detail Characteristics'), 300000)
          .then(function(present) {
            if (!present) {
              expect(false).customError('"Detail Characteristics" report has not calculated');
              CommonFunctions.takeScreenShot();
            }
          });
      });

    arrTileNames = ['Summary Characteristics', 'Detail Characteristics'];

    arrTileNames.forEach(function(tileName) {

      it('Verifying if "' + tileName + '" report is calculated', function() {
        PA3MainPage.isReportCalculated(tileName).then(function(displayed) {
          expect(displayed).customError('"' + tileName + '" report is not displayed on the web page.');
          if (!displayed) {
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            expect(PA3MainPage.isReportCalculated(tileName)).toBeTruthy();
          } else {
            expect(false).customError('Error found while calculating "' + tileName + '" report: ' + error);
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
      });

    });

    it('Verifying if "Characteristics Over Time" chart is calculated', function() {
      PA3MainPage.isInChartFormat('Characteristics Over Time').then(function(displayed) {
        expect(displayed).customError('"Characteristics Over Time" chart is not displayed on the web page.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Characteristics Over Time')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Characteristics Over Time" chart: ' + error);
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

    arrTileNames = ['Summary Characteristics', 'Characteristics Over Time', 'Detail Characteristics'];

    arrTileNames.forEach(function(tileName) {

      it('Verifying if text saying "Cached data from" appeared next to "Footnotes" and the timestamp read as today\'s date for' +
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

  describe('Test Step: 608107', function() {

    it('Should click on "Exposure Overview" in the LHP', function() {
      PA3MainPage.getReports('Exposures Overview').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Weights" and "Weights Difference"reports to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 300000)
        .then(function(present) {
          if (!present) {
            expect(false).customError('"Weights" report has not calculated');
            CommonFunctions.takeScreenShot();
          }
        });

      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights Difference'), 300000)
        .then(function(present) {
          if (!present) {
            expect(false).customError('"Weights Difference" report has not calculated');
            CommonFunctions.takeScreenShot();
          }
        });

    });

    it('Verifying if "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Weights" report: ' + error);
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

    });

    it('Verifying if "Weights Difference" chart is calculated', function() {
      PA3MainPage.isInChartFormat('Weights Difference').then(function(displayed) {
        expect(displayed).customError('"Weights Difference" chart is not displayed on the web page.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Weights Difference')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Weights Difference" chart: ' + error);
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

    arrTileNames = ['Weights', 'Weights Difference'];

    arrTileNames.forEach(function(tileName) {

      it('Verifying if text saying "Cached data from" appeared next to "Footnotes" and the timestamp read as today\'s date for' +
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

  describe('Test Step: 608108', function() {

    it('Should click on "Characteristics Overview" in the LHP', function() {
      PA3MainPage.getReports('Characteristics Overview').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Summary Characteristics", "Characteristics Over Time" ans "Detail Characteristics" reports to calculate',
      function() {
        Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Summary Characteristics'), 300000)
          .then(function(present) {
            if (!present) {
              expect(false).customError('"Summary Characteristic" report has not calculated');
              CommonFunctions.takeScreenShot();
            }
          });

        Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Characteristics Over Time'), 300000)
          .then(function(present) {
            if (!present) {
              expect(false).customError('"Characteristics Over Time" report has not calculated');
              CommonFunctions.takeScreenShot();
            }
          });

        Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Detail Characteristics'), 300000)
          .then(function(present) {
            if (!present) {
              expect(false).customError('"Detail Characteristics" report has not calculated');
              CommonFunctions.takeScreenShot();
            }
          });

      });

    arrTileNames = ['Summary Characteristics', 'Detail Characteristics'];

    arrTileNames.forEach(function(tileName) {

      it('Verifying if "' + tileName + '" report is calculated', function() {
        PA3MainPage.isReportCalculated(tileName).then(function(displayed) {
          expect(displayed).customError('"' + tileName + '" report is not displayed on the web page.');
          if (!displayed) {
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            expect(PA3MainPage.isReportCalculated(tileName)).toBeTruthy();
          } else {
            expect(false).customError('Error found while calculating "' + tileName + '" report: ' + error);
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
      });

    });

    it('Verifying if "Characteristics Over Time" chart is calculated', function() {
      PA3MainPage.isInChartFormat('Characteristics Over Time').then(function(displayed) {
        expect(displayed).customError('"Characteristics Over Time" chart is not displayed on the web page.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('Characteristics Over Time')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Characteristics Over Time" chart: ' + error);
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

    arrTileNames = ['Summary Characteristics', 'Characteristics Over Time', 'Detail Characteristics'];

    arrTileNames.forEach(function(tileName) {

      it('Verifying if text saying "Cached data from" appeared next to "Footnotes" and the timestamp read as today\'s date for' +
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
