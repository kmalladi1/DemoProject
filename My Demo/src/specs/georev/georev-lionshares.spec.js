'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: georev-lionshares', function() {

  var unassignedGroup = '[Unassigned]';
  var isExistUnassignedGroup = false;

  describe('Test Step ID: 592328', function() {

    var weightsReportHeaderValue = 'iShares S&P 500 Value ETF vs Russell 1000 Value';

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:/Pa3/georev/lionshares_georev"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('lionshares-georev');
    });

    it('Should wait for the "Weights" report to calculate', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Weights'), 180000).then(function(value) {
        if (!value) {
          expect(false).customError('Error while calculating the "Weights" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(value) {
        if (!value) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      //Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Weights" report header "iShares S&P 500 Values ETF vs Russell 1000" is displayed', function() {
      PA3MainPage.getHeader().getText().then(function(value) {
        if (value.trim() !== weightsReportHeaderValue.trim()) {
          expect(false).customError('Weights report header ' + weightsReportHeaderValue + ' is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand the "[Unassigned]" group if "Weights" report is having an unassigned group', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '', 'Total').then(function(value) {
        value.forEach(function(text) {
          if (text === unassignedGroup) {
            isExistUnassignedGroup = true;

            // Expanding the Unassigned group
            PA3MainPage.expandTreeInCalculatedReport('Weights', unassignedGroup, undefined, undefined);

            // Verifying if Unassigned group is expanded
            PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', unassignedGroup);
          }
        });
      });
    });

    it('Verifying group values in Port. Ending Weight column if "Weights" report is having an unassigned group', function() {
      if (isExistUnassignedGroup) {

        //Verifying the unassigned group total values in Port. Ending Weight column
        SlickGridFunctions.getCellReference('Weights', unassignedGroup, '', 'Port. Ending Weight', '', unassignedGroup).then(function(option) {
          option.getText().then(function(val) {
            if (val === '0.00') {
              expect(false).customError('Port. Ending Weight column value is ' + val + ' in ' + unassignedGroup + ' group');
              CommonFunctions.takeScreenShot();
            }
          });
        });

        isExistUnassignedGroup = false;
      }
    });
  });

  describe('Test Step ID: 592329', function() {

    it('Should click on the hamburger icon next to the Portfolio Lookup', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.xpathHamburgerButton).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if hamburger drop down is opened', function() {
      PA3MainPage.getHamburgerIcon('Portfolio', false).isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('Hamburger drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "iShares MSCI EAFE ETF" option in the menu', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'iShares MSCI EAFE ETF').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying that "iShares MSCI EAFE ETF" option is selected in the menu
      PA3MainPage.getSingleAccountFromList('Portfolio', 'iShares MSCI EAFE ETF').getAttribute('class').then(function(value) {
        if (value.indexOf('tf-state-selected') === -1) {
          expect(false).customError('"iShares MSCI EAFE ETF" option is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the OK button', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for the "Weights" report to calculate', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Weights'), 180000).then(function(value) {
        if (!value) {
          expect(false).customError('Error while calculating the "Weights" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(value) {
        if (!value) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      //Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying group values in Port. Ending Weight column if "Weights" report is having an unassigned group', function() {
      // Verifying if Weights Report is having unassigned group
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '', 'Total').then(function(value) {
        value.forEach(function(text) {
          if (text === unassignedGroup) {
            isExistUnassignedGroup = true;
          }
        });

        return isExistUnassignedGroup;
      }).then(function(isExist) {
        if (isExist) {
          //Verifying the unassigned group total values in Port. Ending Weight column
          SlickGridFunctions.getCellReference('Weights', unassignedGroup, '', 'Port. Ending Weight', '', unassignedGroup).then(function(option) {
            option.getText().then(function(val) {
              if (val === '0.00') {
                expect(false).customError('Port. Ending Weight column value is ' + val + ' in ' + unassignedGroup + ' group');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        }

        isExistUnassignedGroup = false;
      });
    });
  });

  describe('Test Step ID: 592330', function() {

    it('Should click on the hamburger icon next to the Portfolio Lookup', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.xpathHamburgerButton).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if hamburger drop down is opened', function() {
      PA3MainPage.getHamburgerIcon('Portfolio', false).isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('Hamburger drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "iShares Russell 1000 Growth ETF" option in the menu', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'iShares Russell 1000 Growth ETF').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying that "iShares Russell 1000 Growth ETF" option is selected in the menu
      PA3MainPage.getSingleAccountFromList('Portfolio', 'iShares Russell 1000 Growth ETF').getAttribute('class').then(function(value) {
        if (value.indexOf('tf-state-selected') === -1) {
          expect(false).customError('"iShares Russell 1000 Growth ETF" option is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the OK button', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for the "Weights" report to calculate', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Weights'), 180000).then(function(value) {
        if (!value) {
          expect(false).customError('Error while calculating the "Weights" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(value) {
        if (!value) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      //Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying group values in Port. Ending Weight column if "Weights" report is having an unassigned group', function() {

      // Verifying if Weights Report is having unassigned group
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '', 'Total').then(function(value) {
        value.forEach(function(text) {
          if (text === unassignedGroup) {
            isExistUnassignedGroup = true;
          }
        });

        return isExistUnassignedGroup;
      }).then(function(isExist) {
        if (isExist) {

          //Verifying the unassigned group total values in Port. Ending Weight column
          SlickGridFunctions.getCellReference('Weights', unassignedGroup, '', 'Port. Ending Weight', '', unassignedGroup).then(function(option) {
            option.getText().then(function(val) {
              if (val === '0.00') {
                expect(false).customError('Port. Ending Weight column value is ' + val + ' in ' + unassignedGroup + ' group');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        }
      });
    });
  });
});
