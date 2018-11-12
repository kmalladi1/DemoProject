'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: dates-blasting-snapfreq-ts', function() {

  var reports = ['Weights', 'Attribution'];

  describe('Test Step ID: Startup Instructions', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 406918', function() {

    it('Should launch the PA3 application with "Client:/PA3/Dates/DATES_BLASTING_SNAPFREQ" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('dates-blasting-snapfreq');
    });

    reports.forEach(function(report) {
      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(report);
    });

    it('Verifying if the "Weights and Attribution" tiles are present in the report', function() {
      PA3MainPage.getAllTilesFromReport().then(function(references) {
        references.forEach(function(ref) {
          ref.getText().then(function(text) {
            if (reports.indexOf(text) < 0) {
              expect(false).customError('"Weights and Attribution" tiles are not present in the report');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if only two tiles are present in the report', function() {
      PA3MainPage.getAllTilesFromReport().count().then(function(reportCount) {
        if (reportCount !== 2) {
          expect(false).customError('More than two tiles are present in the report; Found: ' + reportCount);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 390424', function() {

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights', 'Options');

    it('Should select "Weekly" from "Report Frequency" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Weekly', 'Report Frequency:');
    });

    it('Verifying if the "Report Frequency" is set to "Weekly"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Report Frequency:').getSelectedText().then(function(text) {
        if (text !== 'Weekly') {
          expect(false).customError('"Report Frequency" is not set to "Weekly"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enter "6/02/2014" in the "Start Date" widget', function() {
      ThiefHelpers.getDatepickerClassReference('Start Date:').setDate('6/02/2014');

      // Verifying if "6/02/2014" is entered into the "Start Date" input field
      ThiefHelpers.getDatepickerClassReference('Start Date:').getDate().then(function(text) {
        if (text !== '6/02/2014') {
          expect(false).customError('"Start Date" is not set to "6/02/2014"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enter "7/02/2014" in the "End Date" widget', function() {
      ThiefHelpers.getDatepickerClassReference('End Date:').setDate('7/02/2014');

      // Verifying if "7/02/2014" is entered into the "End Date" input field
      ThiefHelpers.getDatepickerClassReference('End Date:').getDate().then(function(text) {
        if (text !== '7/02/2014') {
          expect(false).customError('"End Date" is not set to "7/02/2014"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Apply To Weights" hyperlink', function() {
      ThiefHelpers.getButtonClassReference('Apply To Weights').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Apply To Weights" hyperlink');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Blasting" widget is opened', function() {
      ThiefHelpers.isPresent(undefined, undefined, TileOptionsDates.xpathBlastingWindow).then(function(blastWindow) {
        if (!blastWindow) {
          expect(false).customError('"Blasting" widget is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "+" button to expand "Weights" if not already expanded', function() {
      ThiefHelpers.getChecklistClassRef().getGroupByText('Weights').isExpanded().then(function(expanded) {
        if (!expanded) {
          ThiefHelpers.getChecklistClassRef().getGroupByText('Weights').toggleExpandedState().then(function() {
          }, function() {
            expect(false).customError('Unable click on "+" button to expand "Weights"');
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Should check "Attribution" item under "Weights" group in "Blasting" menu', function() {
      ThiefHelpers.getChecklistClassRef().getItemByText('Attribution').toggle();

      // Verifying if the checkbox is checked
      ThiefHelpers.getChecklistClassRef().getItemByText('Attribution').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Weights" item under "Weights" group in "Blasting" menu is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in "Blasting Menu"', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsDates.getOkOrCancelButtonFromBlastedWindow('OK')).press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in "Blasting Menu"');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Blasting" menu is closed', function() {
      ThiefHelpers.isPresent(undefined, undefined, TileOptionsDates.xpathBlastingWindow).then(function(blastWindow) {
        if (blastWindow) {
          expect(false).customError('"Blasting" menu is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    reports.forEach(function(report) {

      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(report);

    });

    it('Should click on "Refresh" Button in app tool bar', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.xpathRefreshBtn).press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for the reports to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    reports.forEach(function(report) {

      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(report);

    });

    reports.forEach(function(report) {

      it('Verify that "' + report + '" report gets calculated with "6/02/2014 - 7/02/2014"', function() {
        PA3MainPage.getDateHyperLink(report).getText().then(function(value) {
          if (value !== '6/02/2014 - 7/02/2014') {
            expect(false).customError('"' + report + '" report is not calculated with "6/02/2014 - 7/02/2014", Found:' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

});
