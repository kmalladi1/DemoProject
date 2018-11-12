'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: acnt-edit-refresh', function() {

  // Variables
  var allEffect;
  var selEffect;
  var totEffect;
  var allEffectNew;
  var selEffectNew;
  var totEffectNew;

  describe('Test Step ID: 533165', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:REFRESH_QA_TEST" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('refresh-qa-test');
    });

    it('Verifying if "REFRESH_QA_TEST" document is opened without any issues', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Exposures Overview" is selected in LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Weights', 'Exposures Overview').then(function(ele) {
        ele.getAttribute('class').then(function(val) {
          if (val.indexOf('selected') === -1) {
            expect(false).customError('"Exposures Overview" report from LHP is not selected');
          }
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Verifying if Report Header shows "TBR_R_1000 vs MSCI Europe" in RHP', function() {
      PA3MainPage.getHeader().getText().then(function(value) {
        if (value !== 'TBR_R1000 vs MSCI Europe') {
          expect(false).customError('Expected to have "TBR_R1000 vs MSCI Europe" but found ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 533166', function() {

    it('Should click on "2 Factor Brinson Attribution" report from LHP to select', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Attribution', '2 Factor Brinson Attribution').then(function(ele) {
        ele.click();
      });

      // Verifying if 2 Factor Brinson Attribution report is selected
      ThiefHelpers.getNavepaneItemReference('Reports', 'Attribution', '2 Factor Brinson Attribution').then(function(ele) {
        ele.getAttribute('class').then(function(val) {
          if (val.indexOf('selected') === -1) {
            expect(false).customError('"2 Factor Brinson Attribution" report from LHP is not selected');
          }
        }, function(err) {

          expect(false).customError(err);
        });
      });
    });

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();

      // Waiting for Press action to takes place
      browser.sleep(2000);
    });

    it('Should wait until loading icon disappears', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('2 Factor Brinson Attribution'), 360000)).toBeTruthy();

      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('2 Factor Brinson Attribution Over Time'), 360000)).toBeTruthy();
    });

    it('Verifying if "2 Factor Brinson Attribution" report calculated without any errors', function() {
      PA3MainPage.isReportCalculated('2 Factor Brinson Attribution').then(function(found) {
        if (!found) {
          expect(false).customError('"2 Factor Brinson Attribution" Report not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('2 Factor Brinson Attribution')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if Calculation error displayed
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if chart is displayed for "2 Factor Brinson Attribution Over Time" tile appeared without any errors', function() {
      PA3MainPage.isInChartFormat('2 Factor Brinson Attribution Over Time').then(function(displayed) {
        expect(displayed).customError('"2 Factor Brinson Attribution Over Time" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isInChartFormat('2 Factor Brinson Attribution Over Time')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "2 Factor Brinson Attribution Over Time" report: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "Calculation Error" dialog appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

      // Waiting for web elements to load
      browser.sleep(3000);
    });
  });

  describe('Test Step ID: 533167', function() {

    it('Should click "Restore Icon" from the "2 Factor Brinson Attribution" tile to maximize it', function() {
      PA3MainPage.getMaximizeOrMinimizeWindowButton('2 Factor Brinson Attribution').click();
    });

    it('Verifying if "2 Factor Brinson Attribution" report opened without any errors', function() {
      PA3MainPage.isReportCalculated('2 Factor Brinson Attribution').then(function(found) {
        if (!found) {
          expect(false).customError('"2 Factor Brinson Attribution" Report not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('2 Factor Brinson Attribution')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if Calculation error displayed
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    it('Capturing "Attribution Analysis" columns for future reference', function() {
      SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Allocation Effect').then(function(ele) {
        ele.getText().then(function(val) {
          allEffect = val;
        });
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Allocation Effect').then(function(ele) {
            ele.getText().then(function(val) {
              allEffect = val;
            });
          });
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Selection Effect').then(function(ele) {
        ele.getText().then(function(val) {
          selEffect = val;
        });
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Selection Effect').then(function(ele) {
            ele.getText().then(function(val) {
              selEffect = val;
            });
          });
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Total Effect').then(function(ele) {
        ele.getText().then(function(val) {
          totEffect = val;
        });
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Total Effect').then(function(ele) {
            ele.getText().then(function(val) {
              totEffect = val;
            });
          });
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Hamburger" icon next to "Portfolio"', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Account Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is no open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "B&H" dropdown next to the "TBR_R1000"', function() {
      PA3MainPage.getDropdownFromAccountsDropdown('Portfolio', 'TBR_R1000').getText().then(function(val) {
        if (val === 'B&H') {
          PA3MainPage.getDropdownFromAccountsDropdown('Portfolio', 'TBR_R1000').click().then(function() {
          }, function(error) {

            CommonFunctions.takeScreenShot();
            expect(false).customError(error);
          });
        } else {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Dropdown next to the "TBR_R1000" contains text:' + val);
        }
      });
    });

    it('Should select "TBR" from the dropdown', function() {
      PA3MainPage.getOption('TBR').click().then(function() {
      }, function(error) {

        CommonFunctions.takeScreenShot();
        expect(false).customError(error);
      });
    });

    it('Should select "OK" button from the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      expect(PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('Class')).not.toContain('active');
    });

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();

      // Waiting for Press action to takes place
      browser.sleep(2000);
    });

    it('Should wait until loading icon disappears', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('2 Factor Brinson Attribution'), 360000)).toBeTruthy();
    });

    it('Verifying if "2 Factor Brinson Attribution" report calculated without any errors', function() {
      PA3MainPage.isReportCalculated('2 Factor Brinson Attribution').then(function(found) {
        if (!found) {
          expect(false).customError('"2 Factor Brinson Attribution" Report not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('2 Factor Brinson Attribution')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if Calculation error displayed
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    it('Verifying "Attribution Analysis" columns values with values captured before refresh', function() {
      var counter = 0;
      SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Allocation Effect').then(function(ele) {
        ele.getText().then(function(val) {
          if (val === allEffect) {
            counter = 1;
          }
        });
      }).then(function() {
        SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Selection Effect').then(function(ele) {
          ele.getText().then(function(val) {
            if (counter === 1) {
              if (val === selEffect) {
                expect(false).customError('Total values for "Selenium Effect" column is not changed');
                CommonFunctions.takeScreenShot();
              }
            } else {
              counter = 1;
            }
          });
        });
      }).then(function() {
        SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Total Effect').then(function(ele) {
          ele.getText().then(function(val) {
            if (counter === 1) {
              if (val === totEffect) {
                expect(false).customError('Total values for "Selenium Effect" column is not changed');
                CommonFunctions.takeScreenShot();
              }
            } else {
              counter = 1;
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 533168', function() {

    it('Should click on the "Wrench" button on the application toolbar', function() {
      PA3MainPage.getWrenchIcon().click();

      // Verifying if drop down menu appear.
      expect(PA3MainPage.getWrenchIcon(true).isPresent()).toBeTruthy();
    });

    it('Should check "Automatic Calculation" option', function() {
      // Verifying if "Automatic Calculation" option is selected.
      expect(PA3MainPage.setAutomaticCalculation(true)).toBeTruthy();

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    it('Capturing "Attribution Analysis" columns for future reference', function() {
      SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Allocation Effect').then(function(ele) {
        ele.getText().then(function(val) {
          allEffectNew = val;
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Allocation Effect').getText().then(function(val) {
              allEffectNew = val;
            });
          }
        });
      });

      SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Selection Effect').then(function(ele) {
        ele.getText().then(function(val) {
          selEffectNew = val;
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Selection Effect').getText().then(function(val) {
              selEffectNew = val;
            });
          }
        });
      });

      SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Total Effect').then(function(ele) {
        ele.getText().then(function(val) {
          totEffectNew = val;
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Total Effect').getText().then(function(val) {
              totEffectNew = val;
            });
          }
        });
      });
    });

    it('Should click on "Hamburger" icon next to "Portfolio"', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Account Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is no open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "TBR" dropdown next to the "TBR_R1000"', function() {
      PA3MainPage.getDropdownFromAccountsDropdown('Portfolio', 'TBR_R1000').getText().then(function(val) {
        if (val === 'TBR') {
          PA3MainPage.getDropdownFromAccountsDropdown('Portfolio', 'TBR_R1000').click().then(function() {
          }, function(error) {

            CommonFunctions.takeScreenShot();
            expect(false).customError(error);
          });
        } else {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Dropdown next to the "TBR_R1000" contains text:' + val);
        }
      });
    });

    it('Should select "B&H" from the dropdown', function() {
      PA3MainPage.getOption('B&H').click().then(function() {
      }, function(error) {

        CommonFunctions.takeScreenShot();
        expect(false).customError(error);
      });
    });

    it('Should select "OK" button from the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      expect(PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('Class')).not.toContain('active');
    });

    it('Should wait until loading icon disappears', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('2 Factor Brinson Attribution'), 360000)).toBeTruthy();
    });

    it('Verifying if "2 Factor Brinson Attribution" report calculated without any errors', function() {
      PA3MainPage.isReportCalculated('2 Factor Brinson Attribution').then(function(found) {
        if (!found) {
          expect(false).customError('"2 Factor Brinson Attribution" Report not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('2 Factor Brinson Attribution')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if Calculation error displayed
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    it('Verifying "Attribution Analysis" columns with values captured at Test Step: 533167', function() {
      SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Allocation Effect').then(function(ele) {
        ele.getText().then(function(val) {
          if (val !== allEffect) {
            expect(false).customError('Allocation Effect values are not as expected with ' + 'captured values at Test Step: 533167');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Allocation Effect').getText().then(function(val) {
              expect(val).toEqual(allEffect);
            });
          }
        });
      });

      SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Selection Effect').then(function(ele) {
        ele.getText().then(function(val) {
          if (val !== selEffect) {
            expect(false).customError('Selection  Effect values are not as expected with ' + 'captured values at Test Step: 533167');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Selection Effect').getText().then(function(val) {
              expect(val).toEqual(selEffect);
            });
          }
        });
      });

      SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Total Effect').then(function(ele) {
        ele.getText().then(function(val) {
          if (val !== totEffect) {
            expect(false).customError('Total Effect values are not as expected with ' + 'captured values at Test Step: 533167');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Total Effect').getText().then(function(val) {
              expect(val).toEqual(totEffect);
            });
          }
        });
      });
    });
  });

  describe('Test Step ID: 533169', function() {

    it('Should click on "Hamburger" icon next to "Portfolio"', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Account Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is no open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "B&H" dropdown next to the "TBR_R1000"', function() {
      PA3MainPage.getDropdownFromAccountsDropdown('Portfolio', 'TBR_R1000').getText().then(function(val) {
        if (val === 'B&H') {
          PA3MainPage.getDropdownFromAccountsDropdown('Portfolio', 'TBR_R1000').click().then(function() {
          }, function(error) {

            CommonFunctions.takeScreenShot();
            expect(false).customError(error);
          });
        } else {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Dropdown next to the "TBR_R1000" contains text:' + val);
        }
      });
    });

    it('Should select "TBR" from the dropdown', function() {
      PA3MainPage.getOption('TBR').click().then(function() {
      }, function(error) {

        CommonFunctions.takeScreenShot();
        expect(false).customError(error);
      });
    });

    it('Should select "OK" button from the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      expect(PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('Class')).not.toContain('active');
    });

    it('Should wait until loading icon disappears', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('2 Factor Brinson Attribution'), 360000)).toBeTruthy();
    });

    it('Verifying if "2 Factor Brinson Attribution" report calculated without any errors', function() {
      PA3MainPage.isReportCalculated('2 Factor Brinson Attribution').then(function(found) {
        if (!found) {
          expect(false).customError('"2 Factor Brinson Attribution" Report not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('2 Factor Brinson Attribution')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if Calculation error displayed
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });

      // Waiting for web elements to load
      browser.sleep(3000);
    });

    it('Verifying "Attribution Analysis" columns with values captured at Test Step: 533168', function() {
      SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Allocation Effect').then(function(ele) {
        ele.getText().then(function(val) {
          if (val !== allEffectNew) {
            expect(false).customError('Allocation Effect values are not as expected with ' + 'captured values at Test Step: 533168');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Allocation Effect').getText().then(function(val) {
              expect(val).toEqual(allEffectNew);
            });
          }
        });
      });

      SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Selection Effect').then(function(ele) {
        ele.getText().then(function(val) {
          if (val !== selEffectNew) {
            expect(false).customError('Selection Effect values are not as expected with ' + 'captured values at Test Step: 533168');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Selection Effect').getText().then(function(val) {
              expect(val).toEqual(selEffectNew);
            });
          }
        });
      });

      SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Total Effect').then(function(ele) {
        ele.getText().then(function(val) {
          if (val !== totEffectNew) {
            expect(false).customError('Total Effect values are not as expected with ' + 'captured values at Test Step: 533168');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            SlickGridFunctions.getCellReference('2 Factor Brinson Attribution', 'Total', '', 'Total Effect').getText().then(function(val) {
              expect(val).toEqual(totEffectNew);
            });
          }
        });
      });
    });
  });

  var columnValuesOfEndingWeight = [];
  var columnValuesOfContribution = [];

  describe('Test Step ID: 733521', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/PA3/GENERAL/SINGLE_VS_MULTIPORT" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('single-vs-multiport');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should click on "Hamburger" icon next to "Portfolio"', function() {
      var xpathOfPortfolioHambergerIcon = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathOfPortfolioOrBenchmarkHambergerIcon, 'Portfolio');

      ThiefHelpers.getButtonClassReference(undefined, xpathOfPortfolioHambergerIcon).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Hamburger" icon next to "Portfolio"');
        CommonFunctions.takeScreenShot();
      });

      ThiefHelpers.isDropDownOpen().then(function(found) {
        if (!found) {
          expect(false).customError('Account dropdown was not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "AVG_LIFE3" from the list of accounts', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'AVG_LIFE3').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "AVG_LIFE3" account is selected
      expect(PA3MainPage.getSingleAccountFromList('Portfolio', 'AVG_LIFE3').getAttribute('class')).toContain('selected');
    });

    it('Should select "OK" button from the "Account" drop down', function() {
      var xpathOfOkButton = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathOfOkOrCancelButton, 'Ok');

      ThiefHelpers.getButtonClassReference(undefined, xpathOfOkButton).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Hamburger" icon next to "Portfolio"');
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      ThiefHelpers.isDropDownOpen().then(function(found) {
        if (found) {
          expect(false).customError('Account dropdown is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Collecting values in "Port. Ending Weight" column got future use', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Port. Ending Weight').then(function(arrOfValues) {
        arrOfValues.forEach(function(values) {
          columnValuesOfEndingWeight.push(parseFloat(values).toFixed(2));
        });
        CommonFunctions.captureScreenShot();
      });
    });

    it('Collecting values in "Port. Contribution to Ending Coupon Curve Duration" column for future use', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Port. Contribution to Ending Coupon Curve Duration').then(function(arrOfValues) {
        arrOfValues.forEach(function(values) {
          columnValuesOfContribution.push(parseFloat(values).toFixed(2));
        });
      });
    });

    it('Verify if "Average Life Bin" groups are displayed in the report', function() {
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(rowRef) {
          if (rowRef.metadata.type === 'group') {
            if (rowRef[1].indexOf('Average Life Bin') === -1) {
              expect(false).customError('"Average Life Bin" is not present in the "' + rowRef + '".');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    var arrColumnNames = ['Port. Ending Weight', 'Port. Contribution to Ending Coupon Curve Duration'];
    it('verifying if "Port. Ending Weight" and "Port. Contribution to Ending Coupon Curve Duration" columns are present in the report', function() {
      SlickGridFunctions.getColumnNames('Weights').then(function(reportColumnNames) {
        arrColumnNames.forEach(function(columnName) {
          if (reportColumnNames.indexOf(columnName) === -1) {
            expect(false).customError('"' + columnName + '" column is not present in the report.');
            CommonFunctions.takeScreenShot();
          }
        });

      });
    });

  });

  describe('Test Step ID: 733522', function() {

    it('Should click on "Hamburger" icon next to "Portfolio"', function() {
      var xpathOfPortfolioHambergerIcon = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathOfPortfolioOrBenchmarkHambergerIcon, 'Portfolio');

      ThiefHelpers.getButtonClassReference(undefined, xpathOfPortfolioHambergerIcon).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Hamburger" icon next to "Portfolio"');
        CommonFunctions.takeScreenShot();
      });

      ThiefHelpers.isDropDownOpen().then(function(found) {
        if (!found) {
          expect(false).customError('Account dropdown was not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check "Use Multiple Portfolios" check box', function() {
      var xpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xptahCheckboxFromAccountsDropdown, 'Use Multiple Portfolios');

      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).check();

      // Verifying that "Use Multiple Portfolios" check box is checked
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).isChecked().then(function(value) {
        if (!value) {
          expect(false).customError('"Use Multiple Portfolios" checkbox is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "OK" button from the "Account" drop down', function() {
      var xpathOfOkButton = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathOfOkOrCancelButton, 'Ok');

      ThiefHelpers.getButtonClassReference(undefined, xpathOfOkButton).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Hamburger" icon next to "Portfolio"');
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      ThiefHelpers.isDropDownOpen().then(function(found) {
        if (found) {
          expect(false).customError('Account dropdown is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var arrMultiHeaderNames = ['AVG_LIFE1', 'AVG_LIFE2', 'AVG_LIFE3'];
    it('Verifying if "AVG_LIFE1", "AVG_LIFE3" and "AVG_LIFE3" are present in the calculated report', function() {
      SlickGridFunctions.getMultiHeaderNames('Weights').then(function(arrNames) {
        arrMultiHeaderNames.forEach(function(multiheaderName) {
          if (arrNames.indexOf(multiheaderName) === -1) {
            expect(false).customError('"' + multiheaderName + '" is not present in the report.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verify if values in "Port. Ending Weight" column are matching with previous values under AVG_LIFE3 multiheader', function() {
      var needScreenShot = 0;
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Port. Ending Weight', 'AVG_LIFE3').then(function(arrOfValues) {
        arrOfValues.forEach(function(values, index) {
          if (columnValuesOfEndingWeight[index] !== parseFloat(arrOfValues[index]).toFixed(2)) {
            expect(false).customError('Expected "' + columnValuesOfEndingWeight[index] + '" but Found: "' + arrOfValues[index] + '"');
            needScreenShot++;
          }

          if (needScreenShot === 1) {
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verify if values in "Port. Contribution to Ending Coupon Curve Duration" column are matching with previous values under AVG_LIFE3 multiheader', function() {
      var needScreenShot = 0;
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Port. Contribution to Ending Coupon Curve Duration', 'AVG_LIFE3').then(function(arrOfValues) {
        arrOfValues.forEach(function(values, index) {
          if (columnValuesOfContribution[index] !== parseFloat(arrOfValues[index]).toFixed(2)) {
            expect(false).customError('Expected "' + columnValuesOfContribution[index] + '" but Found: "' + arrOfValues[index] + '"');
            needScreenShot++;
          }

          if (needScreenShot === 1) {
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });
});
