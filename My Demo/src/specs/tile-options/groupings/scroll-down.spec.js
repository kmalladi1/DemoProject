'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: scroll-down', function() {

  describe('Test Step ID: 668466', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/PA3/MP_TEST', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('mp-test');
    });

    it('Should wait for "Weight" report to calculate', function() {
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

  });

  describe('Test Step ID: 668467', function() {

    it('Should type "spn" in Portfolio box and select "SPN_SP50_ACCT.ACCT | Client:/new_pa_test_suite/pricing/" from drop down', function() {
      PA3MainPage.setPortfolio('spn', 'SPN_SP50_ACCT.ACCT | Client:/new_pa_test_suite/pricing/', 'Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT').then(function(option) {
        if (!option) {
          expect(false).customError('Not able to Type "spn" into "Portfolio"' +
            ' widget and select "SPN_SP50_ACCT.ACCT | Client:/new_pa_test_suite/pricing/" from type ahead');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Weight" report to calculate', function() {
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

    it('Should right click on "Commercial Services" and select "Expand|All" option', function() {
      var eleRef = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Commercial Services');

      PA3MainPage.rightClickAndSelectOption(eleRef, 'Expand|All');
    });

    it('Wait for the report to load', function() {
      Utilities.waitUntilElementDisappears(element(by.xpath(
        SlickGridFunctions.xpathSlickGridLoadingSpinner)), 40000);

      // Waiting for grid elements to load
      browser.sleep(2000);
    });

    it('Verifying if all groupings are expanded in the report', function() {
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(eleRef, rowIndex) {
          if (eleRef.metadata.type === 'group') {
            if (eleRef.expanded !== true) {
              SlickGridFunctions.scrollRowToTop('Weights', rowIndex - 1);
              CommonFunctions.takeScreenShot();
              expect(false).customError(eleRef[0] + ' grouping is not expanded which is at index(row) ' + rowIndex);
            }
          }
        });
      });
    });

  });

  describe('Test Step ID: 668471', function() {

    it('Click on the "Commercial Services" group collapse button', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Commercial Services');
    });

    it('Verifying if "Commercial Services" group is in collapsed state', function() {
      PA3MainPage.isTreeExpanded('Weights', 'Commercial Services', 'slick-viewport slick-viewport-bottom slick-viewport-left').then(function() {
      }, function(collapsed) {
        if (collapsed) {
          expect(false).customError('"Commercial Services" group is expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Disabling wait for angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Scroll to the bottom of the report', function() {
      browser.driver.executeScript(function() {
        var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
        var rowCount = slickObject.grid.getDataLength();
        return rowCount;
      }).then(function(value) {
        SlickGridFunctions.scrollRowToTop('Weights', value);
      });
    });

    it('Verifying if loading icon is not friezed', function() {
      Utilities.waitUntilElementDisappears(element(by.xpath(
        SlickGridFunctions.xpathSlickGridLoadingSpinner)), 2000);
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

  });

  describe('Test Step ID: 668472', function() {

    it('Should click on "Refresh" icon from application', function() {
      PA3MainPage.getRefreshIcon().click();
    });

    it('Should wait for "Weight" report to calculate', function() {
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

    it('Verifying if all the groups except "Commercial Services"', function() {
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(rowRef, rowIndex) {
          if (rowRef[0] !== 'Commercial Services') {
            if (rowRef.metadata.type === 'group') {
              if (rowRef.expanded !== true) {
                SlickGridFunctions.scrollRowToTop('Weights', rowIndex - 1);
                CommonFunctions.takeScreenShot();
                expect(false).customError(rowRef[0] + ' grouping is not expanded which is at index(row) ' + rowIndex);
              }
            }
          }
        });
      });
    });
  });

  describe('Test Step ID: 668504', function() {
    it('Should close the PA3 application', function() {
      expect(true).toBeTruthy();
    });
  });

});
