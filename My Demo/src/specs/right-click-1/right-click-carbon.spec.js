'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: right-click-carbon', function() {

  describe('Test Step ID: 510662', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:/default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

  });

  describe('Test Step ID: 510663', function() {

    it('Enter "testing" in the "Portfolio" widget and select "CLIENT:/PA3/GAP/ACCOUNTS/TESTING5.ACCT" from type ahead', function() {
      PA3MainPage.setPortfolio('testing', 'Client:/pa3/gap_temp/accounts/TESTING5.ACCT', 'Client:/pa3/gap_temp/accounts/TESTING5.ACCT').then(function(selected) {
        if (!selected) {
          expect(false).customError('"CLIENT:/PA3/GAP/ACCOUNTS/TESTING5.ACCT" is not selected from the ' + 'typeahead.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Contribution" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Contribution').then(function(ref) {
        ref.click();
      });

      // Verifying "Contribution" Report is selected.
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Contribution').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Contribution" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on the "Wrench" button from the application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down menu appear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('Wrench icon drop down is not present.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Format Options|Theme|Carbon" option from wrench menu drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Format Options|Theme|Carbon').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that the report theme is "carbon"
      element(by.xpath(PA3MainPage.xpathApp)).getAttribute('class').then(function(value) {
        if (value.indexOf('carbon') === -1) {
          expect(false).customError('Report theme is not "carbon"');
        }
      });
    });

    it('Wait for "Contribution" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 120000);

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying that "Contribution" report is calculated', function() {
      // Verifying if Weights report is calculated
      PA3MainPage.isReportCalculated('Contribution').then(function(displayed) {
        expect(displayed).customError('"Contribution" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Weights" report: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 510664', function() {

    it('Should right click on "Consumer Durables" group', function() {
      SlickGridFunctions.getCellReference('Contribution', 'Consumer Durables', '', '').then(function(reference) {
        PA3MainPage.rightClickOnGivenElement(reference).then(function(bool) {
          if (!bool) {
            expect(false).customError('Right click menu is not appeared');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verify that right click menu  should display in carbon theme', function() {
      Utilities.getBgColor(element(by.xpath('//*[contains(@class, "context-menu")]'))).then(function(color) {
        if (color !== 'rgba(75, 75, 75, 1)') {
          expect(false).customError('Report has displayed with' + color + 'font color');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrListItems = ['Grouping Help...', 'Expand All', 'Collapse All', 'Show All Groups', 'Exclusions', 'Groupings'];
    var flag = 0;
    arrListItems.forEach(function(element, index) {
      it('Should verify that the "' + element + '" item exists in right click menu', function() {
        PA3MainPage.getAllOptionsAfterRightClickOnReport('menu').getText().then(function(items) {
          if (element !== items[index]) {
            flag = flag + 1;
            expect(false).customError(element + 'item does not exists in the menu');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });
  });

  describe('Test Step ID: 510667', function() {

    it('Should right click on any "Average Weight" column value', function() {
      SlickGridFunctions.getCellReference('Contribution', 'Consumer Durables', '', 'Average Weight').then(function(reference) {
        PA3MainPage.rightClickOnGivenElement(reference).then(function(bool) {
          if (!bool) {
            expect(false).customError('Right click menu is not appeared');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var arrListItems = ['Column Help…', 'Columns', 'Custom Charts', 'Audit Value'];
    var flag = 0;
    arrListItems.forEach(function(element, index) {
      it('Should verify that the "' + element + '" item exists in right click menu', function() {
        PA3MainPage.getAllOptionsAfterRightClickOnReport('menu').getText().then(function(items) {
          if (element !== items[index]) {
            flag = flag + 1;
            expect(false).customError(element + 'item does not exists in the menu');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });
  });

  describe('Test Step ID: 510669', function() {

    it('Should right click on "Total" value for any column and select "Columns > Add Column" from the menu.', function() {
      SlickGridFunctions.getCellReference('Contribution', 'Total', '', 'Average Weight').then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Columns|Add Column…');
      });
    });

    it('Verifying if "Tile Options - Contribution" view appeared', function() {
      TileOptions.isTileOptionsMode().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Tile Options - Contribution" view is not appeared');
        }
      });
    });

    it('Verifying if "Tile Options - Contribution" view appeared in "Carbon" theme', function() {
      element(by.xpath(PA3MainPage.xpathApp)).getAttribute('class').then(function(value) {
        if (value.indexOf('carbon') === -1) {
          expect(false).customError('"Tile Options - Contribution" view is not appeared in "Carbon" theme');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 510670', function() {

    it('Should click on "Cancel" button of "Tile Options" mode header', function() {
      ThiefHelpers.getButtonClassReference('Cancel').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Wrench" button from the application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down menu appear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('Wrench icon drop down is not present.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Format Options|Theme|Quartz" option from wrench menu drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Format Options|Theme|Quartz').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that the report theme is "Quartz"
      element(by.xpath(PA3MainPage.xpathApp)).getAttribute('class').then(function(value) {
        if (value.indexOf('carbon') > -1) {
          expect(false).customError('Report theme is not "Quartz"');
        }
      });
    });
  });
});
