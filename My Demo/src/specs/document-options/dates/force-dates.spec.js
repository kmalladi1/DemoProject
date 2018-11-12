'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: force-dates', function() {

  var tileNames = ['Performance', 'Contribution', 'Weights Difference'];
  var xpathForceStartDateAfterInceptionCheckBox = CommonFunctions.replaceStringInXpath(DocumentOptionsDates.xpathCheckBox, 'Force Start Date After Inception');
  var xpathForceStartDateAfterAlternateInceptionCheckBox = CommonFunctions.replaceStringInXpath(DocumentOptionsDates.xpathCheckBox, 'Force Start Date After Alternate Inception');
  var xpathForceEndDateBeforeTerminationCheckBox = CommonFunctions.replaceStringInXpath(DocumentOptionsDates.xpathCheckBox, 'Force End Date Before Termination');

  describe('Test Step ID: Startup Instructions', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 696590', function() {

    it('Should launch the PA3 application with "Client:/Pa3/dates/inception_2" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('inception-2');
    });

    it('Waiting for the reports to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if the report is loaded with 3 tiles', function() {
      PA3MainPage.getAllTilesFromReport().count().then(function(count) {
        if (count !== 3) {
          expect(false).customError('Report is not loaded with two reports; Found: ' + count);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Performance, Contribution and Weights Difference" tiles are present in the report', function() {
      PA3MainPage.getAllTilesFromReport().then(function(references) {
        references.forEach(function(ref) {
          ref.getText().then(function(text) {
            if (tileNames.indexOf(text) < 0) {
              expect(false).customError('"Performance, Contribution and Weights Difference" tiles are not present in the report');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    tileNames.forEach(function(tileName) {

      it('Verifying if "Calculation Error" for "' + tileName + '" report is not appeared', function() {
        PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
          if (found) {
            expect(false).customError('"Calculation Error" is found during report calculation.');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Verifying if the report header is "TESTING_PA_INCEPTION_1 vs S&P 500"', function() {
      PA3MainPage.getHeader().getText().then(function(value) {
        if (value !== 'TESTING_PA_INCEPTION_1 vs S&P 500') {
          expect(false).customError('Header text is not set as "TESTING_PA_INCEPTION_1 vs S&P 500"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var dates = ['3/18/2016 - 4/29/2016', '3/24/2016 - 5/02/2016', '5/02/2016'];

    tileNames.forEach(function(tile, index) {

      it('Verifying if the "' + tile + '" tile is set with "' + dates[index] + '"', function() {

        // Verifying if dates hyperlink is present
        PA3MainPage.getDateHyperLink(tile).isPresent().then(function(found) {
          if (!found) {
            expect(false).customError('Dates hyperlink is not present in "' + tile + '" report');
            CommonFunctions.takeScreenShot();
          }
        });

        // Verifying if hyperlink is set as expected
        PA3MainPage.getDateHyperLink(tile).getText().then(function(value) {
          if (value !== dates[index]) {
            expect(false).customError('"' + tile + '" tile is not set with "' + dates[index] + '"; Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 696591', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Date Options', 'Dates', 'document options');

    it('Should check "Force Start Date After Inception" check box', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, xpathForceStartDateAfterInceptionCheckBox).isChecked().then(function(checkBox) {
        if (!checkBox) {
          ThiefHelpers.getCheckBoxClassReference(undefined, xpathForceStartDateAfterInceptionCheckBox).check();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Force Start Date After Inception" check box is checked', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, xpathForceStartDateAfterInceptionCheckBox).isChecked().then(function(checkBox) {
        if (!checkBox) {
          expect(false).customError('"Force Start Date After Inception" check box is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    it('Waiting for the reports to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    tileNames.forEach(function(tileName) {

      it('Verifying if "Calculation Error" for "' + tileName + '" report is not appeared', function() {
        PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
          if (found) {
            expect(false).customError('"Calculation Error" is found during report calculation.');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    var dates = ['3/24/2016 - 4/29/2016', '3/24/2016 - 5/02/2016', '5/02/2016'];

    tileNames.forEach(function(tile, index) {

      it('Verifying if the "' + tile + '" tile is set with "' + dates[index] + '"', function() {

        // Verifying if dates hyperlink is present
        PA3MainPage.getDateHyperLink(tile).isPresent().then(function(found) {
          if (!found) {
            expect(false).customError('Dates hyperlink is not present in "' + tile + '" report');
            CommonFunctions.takeScreenShot();
          }
        });

        // Verifying if hyperlink is set as expected
        PA3MainPage.getDateHyperLink(tile).getText().then(function(value) {
          if (value !== dates[index]) {
            expect(false).customError('"' + tile + '" tile is not set with "' + dates[index] + '"; Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 696592', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Date Options', 'Dates', 'document options');

    it('Should check "Force End Date Before Termination" check box', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, xpathForceEndDateBeforeTerminationCheckBox).isChecked().then(function(checkBox) {
        if (!checkBox) {
          ThiefHelpers.getCheckBoxClassReference(undefined, xpathForceEndDateBeforeTerminationCheckBox).check();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Force End Date Before Termination" check box is checked', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, xpathForceEndDateBeforeTerminationCheckBox).isChecked().then(function(checkBox) {
        if (!checkBox) {
          expect(false).customError('"Force End Date Before Termination" check box is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Force Start Date After Alternate Inception" check box is disabled', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, xpathForceStartDateAfterAlternateInceptionCheckBox).isDisabled().then(function(disabled) {
        if (!disabled) {
          expect(false).customError('"Force Start Date After Alternate Inception" check box is not disable');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Document Options" page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for the reports to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    tileNames.forEach(function(tileName) {

      it('Verifying if "Calculation Error" for "' + tileName + '" report is not appeared', function() {
        PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
          if (found) {
            expect(false).customError('"Calculation Error" is found during report calculation.');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    var dates = ['3/24/2016 - 4/25/2016', '3/24/2016 - 4/25/2016', '4/25/2016'];

    tileNames.forEach(function(tile, index) {

      it('Verifying if the "' + tile + '" tile is set with "' + dates[index] + '"', function() {

        // Verifying if dates hyperlink is present
        PA3MainPage.getDateHyperLink(tile).isPresent().then(function(found) {
          if (!found) {
            expect(false).customError('Dates hyperlink is not present in "' + tile + '" report');
            CommonFunctions.takeScreenShot();
          }
        });

        // Verifying if hyperlink is set as expected
        PA3MainPage.getDateHyperLink(tile).getText().then(function(value) {
          if (value !== dates[index]) {
            expect(false).customError('"' + tile + '" tile is not set with "' + dates[index] + '"; Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 696593', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Date Options', 'Dates', 'document options');

    it('Should un check "Force Start Date After Inception" check box', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, xpathForceStartDateAfterInceptionCheckBox).uncheck();
    });

    it('Verifying if "Force Start Date After Inception" check box is not checked', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, xpathForceStartDateAfterInceptionCheckBox).isChecked().then(function(checkBox) {
        if (checkBox) {
          expect(false).customError('"Force Start Date After Inception" check box is checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check "Force Start Date After Alternate Inception" check box', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, xpathForceStartDateAfterAlternateInceptionCheckBox).isChecked().then(function(checkBox) {
        if (!checkBox) {
          ThiefHelpers.getCheckBoxClassReference(undefined, xpathForceStartDateAfterAlternateInceptionCheckBox).check();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Force Start Date After Alternate Inception" check box is checked', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, xpathForceStartDateAfterAlternateInceptionCheckBox).isChecked().then(function(checkBox) {
        if (!checkBox) {
          expect(false).customError('"Force Start Date After Alternate Inception" check box is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Document Options" page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for the reports to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    tileNames.forEach(function(tileName) {

      it('Verifying if "Calculation Error" for "' + tileName + '" report is not appeared', function() {
        PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
          if (found) {
            expect(false).customError('"Calculation Error" is found during report calculation.');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    var dates = ['4/01/2016 - 4/25/2016', '4/01/2016 - 4/25/2016', '4/25/2016'];

    tileNames.forEach(function(tile, index) {

      it('Verifying if the "' + tile + '" tile is set with "' + dates[index] + '"', function() {

        // Verifying if dates hyperlink is present
        PA3MainPage.getDateHyperLink(tile).isPresent().then(function(found) {
          if (!found) {
            expect(false).customError('Dates hyperlink is not present in "' + tile + '" report');
            CommonFunctions.takeScreenShot();
          }
        });

        // Verifying if hyperlink is set as expected
        PA3MainPage.getDateHyperLink(tile).getText().then(function(value) {
          if (value !== dates[index]) {
            expect(false).customError('"' + tile + '" tile is not set with "' + dates[index] + '"; Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 696594', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Date Options', 'Dates', 'document options');

    var checkboxes = ['Force Start Date After Alternate Inception', 'Force End Date Before Termination'];
    var xpathCheckbox = [xpathForceStartDateAfterAlternateInceptionCheckBox, xpathForceEndDateBeforeTerminationCheckBox];

    checkboxes.forEach(function(checkBox, index) {

      it('Should un check "' + checkBox + '" check box', function() {
        ThiefHelpers.getCheckBoxClassReference(undefined, xpathCheckbox[index]).uncheck();
      });

      it('Verifying if "' + checkBox + '" check box is not checked', function() {
        ThiefHelpers.getCheckBoxClassReference(undefined, xpathCheckbox[index]).isChecked().then(function(checkBox) {
          if (checkBox) {
            expect(false).customError('"' + checkBox + '" check box is checked');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should click on "OK" button from "Document Options" page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for the reports to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    tileNames.forEach(function(tileName) {

      it('Verifying if "Calculation Error" for "' + tileName + '" report is not appeared', function() {
        PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
          if (found) {
            expect(false).customError('"Calculation Error" is found during report calculation.');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    var dates = ['3/18/2016 - 4/29/2016', '3/24/2016 - 5/02/2016', '5/02/2016'];

    tileNames.forEach(function(tile, index) {

      it('Verifying if the "' + tile + '" tile is set with "' + dates[index] + '"', function() {

        // Verifying if dates hyperlink is present
        PA3MainPage.getDateHyperLink(tile).isPresent().then(function(found) {
          if (!found) {
            expect(false).customError('Dates hyperlink is not present in "' + tile + '" report');
            CommonFunctions.takeScreenShot();
          }
        });

        // Verifying if hyperlink is set as expected
        PA3MainPage.getDateHyperLink(tile).getText().then(function(value) {
          if (value !== dates[index]) {
            expect(false).customError('"' + tile + '" tile is not set with "' + dates[index] + '"; Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 696595', function() {

    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Contribution', 'Options');

    it('Verifying if view changed to "Tile Options - Performance" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Contribution').then(function(found) {
        if (!found) {
          expect(false).customError('View is not displayed as "Tile Options - Contribution".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Apply To Contribution" hyperlink', function() {
      ThiefHelpers.getButtonClassReference('Apply To Contribution').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Apply To Contribution" hyperlink');
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

    it('Should check "Weights" from the blasting menu', function() {
      ThiefHelpers.getChecklistClassRef().getGroupByText('Weights').isChecked().then(function(checked) {
        if (!checked) {
          ThiefHelpers.getChecklistClassRef().getGroupByText('Weights').toggle();
        }
      });
    });

    it('Verifying if "Weights" check box is checked', function() {
      ThiefHelpers.getChecklistClassRef().getGroupByText('Weights').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Weights" check box is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in "Blasting Menu"', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsDates.getOkOrCancelButtonFromBlastedWindow('OK')).press().then(function() {
      }, function(err) {
        expect(false).customError('Unable to click on "OK" button in "Blasting Menu";' + err);
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

    it('Should click on "OK" button from "Tile Options" page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for the reports to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    tileNames.forEach(function(tileName) {

      it('Verifying if "Calculation Error" for "' + tileName + '" report is not appeared', function() {
        PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
          if (found) {
            expect(false).customError('"Calculation Error" is found during report calculation.');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    var dates = ['3/24/2016 - 5/02/2016', '3/24/2016 - 5/02/2016', '5/02/2016'];

    tileNames.forEach(function(tile, index) {

      it('Verifying if the "' + tile + '" tile is set with "' + dates[index] + '"', function() {

        // Verifying if dates hyperlink is present
        PA3MainPage.getDateHyperLink(tile).isPresent().then(function(found) {
          if (!found) {
            expect(false).customError('Dates hyperlink is not present in "' + tile + '" report');
            CommonFunctions.takeScreenShot();
          }
        });

        // Verifying if hyperlink is set as expected
        PA3MainPage.getDateHyperLink(tile).getText().then(function(value) {
          if (value !== dates[index]) {
            expect(false).customError('"' + tile + '" tile is not set with "' + dates[index] + '"; Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 696596', function() {

    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights Difference', 'Options');

    it('Verifying if view changed to "Tile Options - Weights Difference" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights Difference').then(function(found) {
        if (!found) {
          expect(false).customError('View is not displayed as "Tile Options - Weights Difference".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Termination Date" from the End Date dropdown', function() {
      ThiefHelpers.getDatepickerClassReference('End Date:').selectShortcutByText('Termination Date');

      ThiefHelpers.getDatepickerClassReference('End Date:').getDate().then(function(text) {
        if (text !== 'Termination Date') {
          expect(false).customError('Expected:"Termination Date" but Found: "' + text + '" in the Date text box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Apply To Weights Difference" hyperlink', function() {
      ThiefHelpers.getButtonClassReference('Apply To Weights Difference').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Apply To Weights Difference" hyperlink');
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

    it('Should check "Weights" from the blasting menu', function() {
      ThiefHelpers.getChecklistClassRef().getGroupByText('Weights').isChecked().then(function(checked) {
        if (!checked) {
          ThiefHelpers.getChecklistClassRef().getGroupByText('Weights').toggle();
        }
      });
    });

    it('Verifying if "Weights" check box is checked', function() {
      ThiefHelpers.getChecklistClassRef().getGroupByText('Weights').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Weights" check box is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in "Blasting Menu"', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsDates.getOkOrCancelButtonFromBlastedWindow('OK')).press().then(function() {
      }, function(err) {
        expect(false).customError('Unable to click on "OK" button in "Blasting Menu";' + err);
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

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    it('Waiting for the reports to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    tileNames.forEach(function(tileName) {

      it('Verifying if "Calculation Error" for "' + tileName + '" report is not appeared', function() {
        PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
          if (found) {
            expect(false).customError('"Calculation Error" is found during report calculation.');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    var dates = ['3/24/2016 - 4/25/2016', '3/24/2016 - 4/25/2016', '4/25/2016'];

    tileNames.forEach(function(tile, index) {

      it('Verifying if the "' + tile + '" tile is set with "' + dates[index] + '"', function() {

        // Verifying if dates hyperlink is present
        PA3MainPage.getDateHyperLink(tile).isPresent().then(function(found) {
          if (!found) {
            expect(false).customError('Dates hyperlink is not present in "' + tile + '" report');
            CommonFunctions.takeScreenShot();
          }
        });

        // Verifying if hyperlink is set as expected
        PA3MainPage.getDateHyperLink(tile).getText().then(function(value) {
          if (value !== dates[index]) {
            expect(false).customError('"' + tile + '" tile is not set with "' + dates[index] + '"; Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 696600', function() {

    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Performance', 'Options');

    it('Should click on the "Start Date" dropdown and select "Alternate Inception Date"', function() {
      ThiefHelpers.getDatepickerClassReference('Start Date:').selectShortcutByText('Alternate Inception Date');

      ThiefHelpers.getDatepickerClassReference('Start Date:').getDate().then(function(text) {
        if (text !== 'Alternate Inception Date') {
          expect(false).customError('Expected:"Alternate Inception Date" but Found: "' + text + '" in the Date text box');
          CommonFunctions.takeScreenShot();
        }
      });

      // Adding delay to wait for request to process(RPD:41035011)
      browser.sleep(2000);
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    tileNames.forEach(function(tileName) {

      it('Verifying if "Calculation Error" for "' + tileName + '" report is not appeared', function() {
        PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
          if (found) {
            expect(false).customError('"Calculation Error" is found during report calculation.');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Verifying if the "Performance" tile is set with "4/01/2016 - 4/25/2016"', function() {

      // Verifying if dates hyperlink is present
      PA3MainPage.getDateHyperLink('Performance').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('Dates hyperlink is not present in "Performance" report');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if hyperlink is set as expected
      PA3MainPage.getDateHyperLink('Performance').getText().then(function(value) {
        if (value !== '4/01/2016 - 4/25/2016') {
          expect(false).customError('"Performance" tile is not set with "4/01/2016 - 4/25/2016"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 735035', function() {

    it('Should select "Performance" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Performance').then(function(ref) {
        ref.click();
      }, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });

      // Verifying "Performance" Report is selected.
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Performance').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Performance Overview" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    // Wait and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Performance');

    var arrAccounts = ['Portfolio', 'Benchmark'];

    arrAccounts.forEach(function(name) {

      it('Should click on "Hamburger" icon next to "' + name + '"', function() {
        var xpathOfPortfolioHambergerIcon = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathOfPortfolioOrBenchmarkHambergerIcon, name);

        ThiefHelpers.getButtonClassReference(undefined, xpathOfPortfolioHambergerIcon).press().then(function() {
        }, function() {

          expect(false).customError('Unable to click on "Hamburger" icon next to "' + name + '"');
          CommonFunctions.takeScreenShot();
        });

        ThiefHelpers.isDropDownOpen().then(function(found) {
          if (!found) {
            expect(false).customError('Account dropdown was not opened');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Should click on "Clear All" icon in the "' + name + '" drop down', function() {
        ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.getAccountClearAllButton(name)).press().then(function() {
        }, function(error) {

          expect(false).customError('Unable to click on "Clear All" button. Found error:' + error);
          CommonFunctions.takeScreenShot();
        });
      });

      it('Verifying if "' + name + '" Account Drop Down is empty', function() {
        // Get the total number of accounts in the drop down
        PA3MainPage.getListFromAccountDropdown('Portfolio').count().then(function(count) {
          if (count !== 0) {
            expect(false).customError('"' + name + '" Account Drop Down is not empty even after Clicking on "Clear All" button.');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Should select "OK" button from the "Account" drop down', function() {
        var xpathOfOkButton = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathOfOkOrCancelButton, 'Ok');

        ThiefHelpers.getButtonClassReference(undefined, xpathOfOkButton).press().then(function() {
        }, function() {

          expect(false).customError('Unable to click on "Hamburger" icon next to "' + name + '"');
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

    });

    it('Should type "MSCI:WORLD" in the Portfolio widget textbox and hit enter', function() {
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).setText('MSCI:WORLD');

      // Verifying that "MSCI:WORLD" is typed into the Portfolio text box
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).getText().then(function(text) {
        if (text !== 'MSCI:WORLD') {
          expect(false).customError('"MSCI:WORLD" is not entered in "Portfolio" widget.');
          CommonFunctions.takeScreenShot();
        }
      });
      browser.sleep(5000);
    });

    it('Should Click on Dates Hyperlink', function() {
      PA3MainPage.getDateHyperLink('Performance').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on the "Start Date" dropdown and select "End of Last Year"', function() {
      ThiefHelpers.getTextBoxClassReference('Start Date:').selectOptionByText('End of Last Year').then(function() {
        // Adding delay to wait for request to process(RPD:41035011)
        browser.sleep(5000);
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      ThiefHelpers.getDatepickerClassReference('Start Date:').getDate().then(function(text) {
        if (text !== 'End of Last Year') {
          expect(false).customError('Expected:"End of Last Year" but Found: "' + text + '" in the Date text box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in the date drop down', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    var tempArr = [];
    var previousDate;
    it('Storing dates hyperlink dates for future use', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(date) {
        previousDate = date;
        tempArr = date.split('-');
        CommonFunctions.captureScreenShot('imageForDateReference');
      });
    });

    it('Should Click on Dates Hyperlink', function() {
      PA3MainPage.getDateHyperLink('Performance').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "End Date" drop down button to open the drop down and select End of Last Year', function() {
      ThiefHelpers.getDatepickerClassReference('End Date:').selectShortcutByText('End of Last Year');

      ThiefHelpers.getDatepickerClassReference('End Date:').getDate().then(function(text) {
        if (text !== 'End of Last Year') {
          expect(false).customError('Expected:"End of Last Year" but Found: "' + text + '" in the Date text box');
          CommonFunctions.takeScreenShot();
        }
      });

      // Adding delay to wait for request to process(RPD:41035011)
      browser.sleep(2000);
    });

    it('Should click on "All Date Options" hyperlink', function() {
      element(by.xpath(TileOptionsDates.xpathAllDateOptions)).click().then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Performance" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Performance') {
          expect(false).customError('"Tile Options - Performance" view has not appeared. ' +
            'Expected: "Tile Options - Performance" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });

      // Adding delay to wait for request to process(RPD:41035011)
      browser.sleep(2000);
    });

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Performance');

    var currentDate = [];
    var screenShot = 0;
    var arrDate = ['Start Date', 'End date'];

    // Example: if Start date year is 2017, then after performing actions it will become 12/30/2016
    it('Verifying if Current date shows less than one year of previously collected Date', function() {
      var currentMonth;
      Utilities.getCurrentDate().then(function(val) {
        var date = new Date(val);
        currentMonth = date.getMonth() + 1;
      }).then(function() {
        PA3MainPage.getDateHyperLink().getText().then(function(date) {
          if (currentMonth !== 1) {
            currentDate = date.split('-');
            arrDate.forEach(function(name, index) {
              var date1 = tempArr[index].split('/');
              var year = parseInt(date1[2]) - 1;
              Utilities.getEndOrStartDateOfMonthInAYear(year, 12).then(function(date) {
                Utilities.getBusinessDate(date, '/').then(function(businessDate) {
                  if (currentDate[index].trim() !== businessDate) {
                    expect(false).customError('"' + name + '" is not showing less than one year for Previous Date. ' +
                      'currentDate:' + currentDate[index] + ', Previous Date:' + tempArr[index]);
                    screenShot++;
                    if (screenShot === 1) {
                      CommonFunctions.takeScreenShot();
                    }
                  }
                });
              });
            });
          } else {
            if (previousDate !== date) {
              expect(false).customError('Dates hyperlink displayed in report is not same as previous date range, Displayed: ' + date + ' Expected: ' + previousDate);
              CommonFunctions.takeScreenShot();
            }

          }
        });
      });
    });

  });

});
