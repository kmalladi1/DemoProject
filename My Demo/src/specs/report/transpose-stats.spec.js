'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: transpose-stats', function() {

  // Local function(s)
  var xpath = function(location, replacingSrting) {
    return CommonFunctions.replaceStringInXpath(location, replacingSrting);
  };

  describe('Test Step ID: 690804', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/PA3/Risk/transpose_stats', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('transpose-stats');
    });

    it('Should wait for "Weights" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights', true).then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Exposures" is selected in the LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Weights', 'Exposures').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Exposures" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if only "U.S. Dollar" group is displayed in the report and no "Total row is displayed"', function() {
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(eleRef, rowIndex) {
          if (rowIndex < 1) {
            if (eleRef.metadata.type === 'group') {
              if (eleRef[0] !== 'U.S. Dollar') {
                expect(false).customError('"U.S. Dollar" group is not displayed in the report. Found "' + eleRef[0] + '"');
                CommonFunctions.takeScreenShot();
              }
            }
          } else {
            expect(false).customError('More then one group is displayed in the report.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 690805', function() {

    it('Should click on the "Wrench" icon in the "Weights" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Transpose" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference(undefined, true).selectItemByText('Transpose').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    var transposeCheckboxes = ['Dates', 'Portfolios'];

    transposeCheckboxes.forEach(function(checkboxName) {
      it('Should check the "' + checkboxName + '" option from the menu', function() {
        ThiefHelpers.getCheckBoxClassReference('undefined', xpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, checkboxName), true).check();

        //Verifying the checkbox is checked
        ThiefHelpers.getCheckBoxClassReference('undefined', xpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, checkboxName)).isChecked().then(function(bool) {
          if (bool !== true) {
            expect(false).customError('"' + checkboxName + '" option from the "Transpose" menu is not checked');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on "Apply" button', function() {
      ThiefHelpers.getButtonClassReference('Apply').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Weights" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights', true).then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the web page.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if report is grouped by "24-MAR-2017" ', function() {
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(eleRef, rowIndex) {
          if (rowIndex < 1) {
            if (eleRef.metadata.type === 'group') {
              if (eleRef[0] !== '24-MAR-2017') {
                expect(false).customError('The report is not grouped by "24-MAR-2017". Found "' + eleRef[0] + '"');
                CommonFunctions.takeScreenShot();
              }
            }
          } else {
            expect(false).customError('More then one group is displayed in the report.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Click on the "24-MAR-2017" group collapse button if not already expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', '24-MAR-2017', 'grid-canvas grid-canvas-top grid-canvas-left expandable').then(function() {
      }, function(err) {
        if (!err) {
          PA3MainPage.expandTreeInCalculatedReport('Weights', '24-MAR-2017', undefined, 'grid-canvas grid-canvas-top grid-canvas-left expandable');

          // Verifying that "24-MAR-2017" is expanded
          PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', '24-MAR-2017', 'grid-canvas grid-canvas-top grid-canvas-left expandable');
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "S&P 500 vs. DEFAULT" group and "OMS Portfolio With income - OMS vs. DEFAULT" is displayed in the report', function() {
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(eleRef, rowIndex) {
          if (eleRef.metadata.type === 'group' && rowIndex > 0) {
            if (eleRef[0] !== 'OMS Portfolio With income - OMS vs. DEFAULT' || eleRef[0] !== 'S&P 500 vs. DEFAULT') {
              expect(false).customError('"U.S. Dollar" group is not displayed in the report. Found "' + eleRef[0] + '"');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });
  });

  describe('Test Step ID: 690835', function() {

    it('Should click on the "Wrench" icon in the "Weights" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Transpose" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference(undefined, true).selectItemByText('Transpose').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should check the "Groups" option from the menu', function() {
      ThiefHelpers.getCheckBoxClassReference('undefined', xpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Groups'), true).check();

      //Verifying the checkbox is checked
      ThiefHelpers.getCheckBoxClassReference('undefined', xpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Groups')).isChecked().then(function(bool) {
        if (bool !== true) {
          expect(false).customError('"Groups" option from the "Transpose" menu is not checked');
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

    it('Should wait for "Weights" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights', true).then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the web page.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on the "24-MAR-2017" group collapse button if not already expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', '24-MAR-2017', 'grid-canvas grid-canvas-top grid-canvas-left expandable').then(function() {
      }, function(err) {
        console.log(err);
        if (!err) {
          PA3MainPage.expandTreeInCalculatedReport('Weights', '24-MAR-2017', undefined, 'grid-canvas grid-canvas-top grid-canvas-left expandable');

          // Verifying that "24-MAR-2017" is expanded
          PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', '24-MAR-2017', 'grid-canvas grid-canvas-top grid-canvas-left expandable');
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var pid;
    it('Verifying if portfolios "S&P 500 vs. DEFAULT" and "OMS Portfolio With income - OMS vs. DEFAULT" are grouped by "24-MAR-2017"', function() {
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(eleRef) {
          if (eleRef.hasChildren) {
            pid = eleRef.id;
          } else {
            if (pid !== eleRef.parentId) {
              expect(false).customError('Portfolios "S&P 500 vs. DEFAULT" and "OMS Portfolio With income - OMS vs. DEFAULT" are not grouped by "24-MAR-2017"');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });
  });
});
