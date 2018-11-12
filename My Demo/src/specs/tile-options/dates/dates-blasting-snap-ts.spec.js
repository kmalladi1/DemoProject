'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: dates-blasting-snap-ts', function() {

  var beforeAttributionDate;
  var reportsArr = ['Weights', 'Contribution', 'Attribution', 'Performance'];
  var tilesArr = ['Weights', 'Contribution', 'Attribution', 'Performance'];

  describe('Test Step ID: 406920', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should launch the PA3 application with document "Client:/PA3/Dates/Dates_Multitile"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('dates-multitile');
    });

    it('Verifying if the report displays four tiles', function() {
      PA3MainPage.getAllTilesFromReport().count().then(function(count) {
        if (count !== 4) {
          expect(false).customError('The report is not displaying four tiles; Found: ' + count);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Weights", "Contribution", "Performance" and "Attribution" tiles are present in the view', function() {
      PA3MainPage.getAllTilesFromReport().then(function(references) {
        references.forEach(function(ref, index) {
          ref.getText().then(function(text) {
            if (text.indexOf(tilesArr[index]) < 0) {
              expect(false).customError('"' + tilesArr[index] + '" tile is not present in the view');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    tilesArr.forEach(function(reportName) {
      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);
    });
  });

  describe('Test Step ID: 390450', function() {

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights', 'Options');

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - Weights" mode.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enter "6/10/2014" in the "End Date" widget', function() {
      ThiefHelpers.getDatepickerClassReference('End Date:').setDate('6/10/2014');

      // Verifying if "6/10/2014" is entered into the "End Date" input field
      ThiefHelpers.getDatepickerClassReference('End Date:').getDate().then(function(text) {
        if (text !== '6/10/2014') {
          expect(false).customError('"End Date" is not set to "6/10/2014"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });

      // Adding wait time as per the Engineer comment in RPD:41035011
      browser.sleep(1000);
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Contribution', 'Options');

    it('Verifying if view changed to "Tile Options - Contribution" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Contribution') {
          expect(false).customError('"Tile Options - Contribution" view has not appeared. ' + 'Expected: "Tile Options - Contribution" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enter "5/09/2014" in the "Start Date" widget', function() {
      ThiefHelpers.getDatepickerClassReference('Start Date:').setDate('5/09/2014');

      // Verifying if "5/09/2014" is entered into the "Start Date" input field
      ThiefHelpers.getDatepickerClassReference('Start Date:').getDate().then(function(text) {
        if (text !== '5/09/2014') {
          expect(false).customError('"Start Date" is not set to "5/09/2014"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enter "6/06/2014" in the "End Date" widget', function() {
      ThiefHelpers.getDatepickerClassReference('End Date:').setDate('6/06/2014');

      // Verifying if "6/06/2014" is entered into the "End Date" input field
      ThiefHelpers.getDatepickerClassReference('End Date:').getDate().then(function(text) {
        if (text !== '6/06/2014') {
          expect(false).customError('"End Date" is not set to "6/06/2014"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Attribution', 'Options');

    it('Verifying if view changed to "Tile Options - Attribution" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Attribution') {
          expect(false).customError('"Tile Options - Attribution" view has not appeared. ' + 'Expected: "Tile Options - Attribution" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enter "6/12/2014" in the "Start Date" widget', function() {
      ThiefHelpers.getDatepickerClassReference('Start Date:').setDate('6/12/2014');

      // Verifying if "6/12/2014" is entered into the "Start Date" input field
      ThiefHelpers.getDatepickerClassReference('Start Date:').getDate().then(function(text) {
        if (text !== '6/12/2014') {
          expect(false).customError('"Start Date" is not set to "6/12/2014"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enter "6/30/2014" in the "End Date" widget', function() {
      ThiefHelpers.getDatepickerClassReference('End Date:').setDate('6/30/2014');

      // Verifying if "6/30/2014" is entered into the "End Date" input field
      ThiefHelpers.getDatepickerClassReference('End Date:').getDate().then(function(text) {
        if (text !== '6/30/2014') {
          expect(false).customError('"End Date" is not set to "6/30/2014"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Attribution');

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Performance', 'Options');

    it('Verifying if view changed to "Tile Options - Performance" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Performance') {
          expect(false).customError('"Tile Options - Performance" view has not appeared. ' + 'Expected: "Tile Options - Performance" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enter "5/30/2014" in the "Start Date" widget', function() {
      ThiefHelpers.getDatepickerClassReference('Start Date:').setDate('5/30/2014');

      // Verifying if "5/30/2014" is entered into the "Start Date" input field
      ThiefHelpers.getDatepickerClassReference('Start Date:').getDate().then(function(text) {
        if (text !== '5/30/2014') {
          expect(false).customError('"Start Date" is not set to "5/30/2014"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enter "6/12/2014" in the "End Date" widget', function() {
      ThiefHelpers.getDatepickerClassReference('End Date:').setDate('6/12/2014');

      // Verifying if "6/12/2014" is entered into the "End Date" input field
      ThiefHelpers.getDatepickerClassReference('End Date:').getDate().then(function(text) {
        if (text !== '6/12/2014') {
          expect(false).customError('"End Date" is not set to "6/12/2014"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Performance');

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    tilesArr.forEach(function(reportName) {
      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);
    });

    it('Verifying if "Weights" report gets calculated with "6/10/2014"', function() {
      PA3MainPage.getDateHyperLink('Weights').getText().then(function(value) {
        if (value !== '6/10/2014') {
          expect(false).customError('"Weights" report is not calculated with "6/10/2014", Found:' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Contribution" report gets calculated with "5/09/2014 - 6/06/2014"', function() {
      PA3MainPage.getDateHyperLink('Contribution').getText().then(function(value) {
        if (value !== '5/09/2014 - 6/06/2014') {
          expect(false).customError('"Contribution" report is not calculated with "5/09/2014 - 6/06/2014", Found:' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Attribution" report gets calculated with "6/12/2014 - 6/30/2014"', function() {
      PA3MainPage.getDateHyperLink('Attribution').getText().then(function(value) {
        beforeAttributionDate = value;
        if (value !== '6/12/2014 - 6/30/2014') {
          expect(false).customError('"Attribution" report is not calculated with "6/12/2014 - 6/30/2014", Found:' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "Performance" report gets calculated with "5/30/2014 - 6/12/2014"', function() {
      PA3MainPage.getDateHyperLink('Performance').getText().then(function(value) {
        if (value !== '5/30/2014 - 6/12/2014') {
          expect(false).customError('"Performance" report is not calculated with "5/30/2014 - 6/12/2014", Found:' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 390459', function() {

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights', 'Options');

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - Weights" mode.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Apply to Weights" is changed as "Apply to Multiple Reports"', function() {
      TileOptionsGroupings.getApplyToButton().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
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

    it('Should check "Contribution" item under "Weights" group in "Blasting" menu', function() {
      ThiefHelpers.getChecklistClassRef().getItemByText('Contribution').toggle();
    });

    it('Verifying if "Contribution" item under "Weights" group in "Blasting" menu is checked off', function() {
      // Verifying if the checkbox is checked
      ThiefHelpers.getChecklistClassRef().getItemByText('Contribution').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Contribution" item under "Weights" group in "Blasting" menu is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Contribution" item under "Weights" group in "Blasting" menu is Enabled', function() {
      ThiefHelpers.getChecklistClassRef().getItemByText('Contribution')._checkbox.isDisabled().then(function(bool) {
        if (bool) {
          expect(false).customError('The "Contribution" item under "Weights" group in "Blasting" menu check box is disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check "Performance" item under "Weights" group in "Blasting" menu', function() {
      ThiefHelpers.getChecklistClassRef().getItemByText('Performance').toggle();
    });

    it('Verifying if "Performance" item under "Weights" group in "Blasting" menu is checked off', function() {
      // Verifying if the checkbox is checked
      ThiefHelpers.getChecklistClassRef().getItemByText('Performance').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Performance" item under "Weights" group in "Blasting" menu is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Performance" item under "Weights" group in "Blasting" menu is Enabled', function() {
      ThiefHelpers.getChecklistClassRef().getItemByText('Performance')._checkbox.isDisabled().then(function(bool) {
        if (bool) {
          expect(false).customError('The "Performance" item under "Weights" group in "Blasting" menu check box is disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Weights" item under "Weights" group in "Blasting" menu is checked off', function() {
      // Verifying if the checkbox is checked
      ThiefHelpers.getChecklistClassRef().getItemByText('Weights').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Weights" item under "Weights" group in "Blasting" menu is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Weights" item under "Weights" group in "Blasting" menu is Disabled', function() {
      ThiefHelpers.getChecklistClassRef().getItemByText('Weights')._checkbox.isDisabled().then(function(bool) {
        if (!bool) {
          expect(false).customError('The "Weights" item under "Weights" group in "Blasting" menu check box is enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Attribution" item under "Weights" group in "Blasting" menu is unchecked', function() {
      // Verifying if the checkbox is checked
      ThiefHelpers.getChecklistClassRef().getItemByText('Attribution').isChecked().then(function(checked) {
        if (checked) {
          expect(false).customError('"Attribution" item under "Weights" group in "Blasting" menu is checked off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Attribution" item under "Weights" group in "Blasting" menu is Disabled', function() {
      ThiefHelpers.getChecklistClassRef().getItemByText('Attribution')._checkbox.isDisabled().then(function(bool) {
        if (!bool) {
          expect(false).customError('The "Attribution" item under "Weights" group in "Blasting" menu check box is enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 390460', function() {

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

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    tilesArr.forEach(function(reportName) {
      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);
    });

    it('Verify that "Weights" report gets calculated with "6/10/2014"', function() {
      PA3MainPage.getDateHyperLink('Weights').getText().then(function(value) {
        if (value !== '6/10/2014') {
          expect(false).customError('"Weights" report is not calculated with "6/10/2014", Found:' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "Contribution" report gets calculated with "6/10/2014" as End Date', function() {
      PA3MainPage.getDateHyperLink('Contribution').getText().then(function(value) {
        if (value.split(' - ')[1] !== '6/10/2014') {
          expect(false).customError('"Contribution" report is not calculated with "6/10/2014" as End Date, Found:' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "Attribution" report date link is remain unchanged as previous step', function() {
      PA3MainPage.getDateHyperLink('Attribution').getText().then(function(value) {
        if (value !== beforeAttributionDate) {
          expect(false).customError('"Attribution" report is not calculated with "' + beforeAttributionDate + '", Found:' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "Performance" report gets calculated with "6/10/2014" as End Date', function() {
      PA3MainPage.getDateHyperLink('Performance').getText().then(function(value) {
        if (value.split(' - ')[1] !== '6/10/2014') {
          expect(false).customError('"Performance" report is not calculated with "6/10/2014" as End Date, Found:' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 757654', function() {

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Attribution', true, 'isSelected');

    // Click on report wrench icon and select "Options" from the menu
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Attribution', 'Dates');

    it('Should select Report frequency as "Daily",in "Tile Options - Attribution" view', function() {
      ThiefHelpers.selectOptionFromDropDown('Daily', 'Report Frequency:', undefined, '');

      // Verifying if Daily is selected from the drop down
      ThiefHelpers.verifySelectedDropDownText('Daily', 'Report Frequency:');
    });

    it('Should select "Previous Close" from the "Start Date" drop down', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsDates.xpathOfStartDateDropDownIcon).press();

      ThiefHelpers.getOptionFromDropdown('Previous Close').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should check "Start Date Relative To End Date" checkbox', function() {
      ThiefHelpers.getCheckBoxClassReference('Start Date Relative To End Date').check();

      // Verifying if "Start Date Relative To End Date" checkbox is checked
      ThiefHelpers.getCheckBoxClassReference('Start Date Relative To End Date').isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Start Date Relative To End Date" checkbox did not check off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Attribution');

    it('Should click on "refresh" button', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    it('Verifying that End Date in Dates hyperlink displays current date', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(date) {
        Utilities.getCurrentDate('MMDDYYYY', '/').then(function(todaysDate) {
          Utilities.getBusinessDate(todaysDate, '/').then(function(currentDate) {
            if (date.split('-')[1].trim() !== currentDate) {
              expect(false).customError('End Date in Dates hyperlink did not display current date. ' +
                'Expected date ' + currentDate + ', found ' + date.split('-')[1].trim());
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying that Start Date in Dates hyperlink displays previous working date', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(date) {
        Utilities.getPreviousDate().then(function(previousDate) {
          if (date.split('-')[0].trim() !== previousDate) {
            expect(false).customError('Start Date in Dates hyperlink did not display current date. ' +
              'Expected date ' + previousDate + ', found ' + date.split('-')[0].trim());
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 757655', function() {

    // Click on report wrench icon and select "Options" from the menu and Select Dates tab
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Attribution', 'Dates');

    it('Should select Report frequency as "Single",in "Tile Options - Attribution" view', function() {
      ThiefHelpers.selectOptionFromDropDown('Single', 'Report Frequency:', undefined, '');

      // Verifying if Single is selected from the drop down
      ThiefHelpers.verifySelectedDropDownText('Single', 'Report Frequency:');
    });

    it('Should set "12/31/2017" from "End date" calender widget', function() {
      ThiefHelpers.setDateInCalendar('12/31/2017', 2);

      //Verifying 12/31/2017 date is selected in end date calender widget
      ThiefHelpers.getDatepickerClassReference('End Date:').getDate().then(function(value) {
        if (value !== '12/31/2017') {
          expect(false).customError('12/31/2017 date is not selected in end date calender widget. Found ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that 12/31/2017 is reflected in end date text box after selecting the date in end date calender widget', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsDates.xpathEndDateTextBox).getText().then(function(value) {
        if (value !== '12/31/2017') {
          expect(false).customError('12/31/2017 date is not reflected in end date calender widget after' + ' selecting the date in end date calender widget');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "One Month Ago" from the "Start Date" drop down', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsDates.xpathOfStartDateDropDownIcon).press();

      ThiefHelpers.getOptionFromDropdown('One Month Ago').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "One Month Ago" is set in Start Date input box', function() {
      ThiefHelpers.getTextBoxClassReference('Start Date:').getText().then(function(text) {
        if (text !== 'One Month Ago') {
          expect(false).customError('"One Month Ago" is not set in "Start Date" input box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on highlighted date in Start Date calender', function() {
      TileOptionsDates.getSelectedDay('Start Date').click().then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "11/30/2017" is set in Start Date input box', function() {
      ThiefHelpers.getTextBoxClassReference('Start Date:').getText().then(function(text) {
        if (text !== '11/30/2017') {
          expect(false).customError('"11/30/2017" is not set in "Start Date" input box');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 757656', function() {

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Attribution');

    it('Should click on "refresh" button', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    it('Verifying thatDates hyperlink displays "11/30/2017 - 12/29/2017"', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(date) {
        if (date.trim() !== '11/30/2017 - 12/29/2017') {
          expect(false).customError('Dates hyperlink did not display "11/30/2017 - 12/29/2017". Found ' + date.trim());
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 769603', function() {

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Weights', true, 'isSelected');

    it('Verifying if "Weights" report is displayed with only one tiles', function() {
      PA3MainPage.getAllTilesFromReport().count().then(function(count) {
        if (count !== 4) {
          expect(false).customError('"Weights" report is not displayed one tile, Found:' + count);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    reportsArr.forEach(function(reportName) {
      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);
    });

  });

  describe('Test Step ID: 769606', function() {

    // Check Automatic Calculation
    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSetAutomaticCalculation(true);

    it('Should click on dates hyper link from "Weights" report', function() {
      PA3MainPage.getDateHyperLink('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "All Date Options" hyper link from dates pop-up', function() {
      PA3MainPage.getOptionsHyperlink('All Date Options').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "All Date Options" hyper link');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - Weights" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Contribution', true, 'isSelected');

    it('Should click on the wrench icon next to "Contribution" in LHP', function() {
      PA3MainPage.getReportWrenchButton('Contribution').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Edit Layout" from reports options list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Edit Layout');
    });

    it('Should click on "Delete"(X) icon from "Performance" tile', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3EditMode.getTileDeleteButton('Performance')).press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on delete icon from "Performance" report');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "OK" button of "Edit Layout" mode header', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Edit Report Layout" is closed', function() {
      PA3EditMode.isEditMode().then(function(isMode) {
        if (isMode) {
          expect(false).customError('"Edit Report Layout" is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Contribution" report is displayed with only one tiles', function() {
      PA3MainPage.getAllTilesFromReport().count().then(function(count) {
        if (count !== 1) {
          expect(false).customError('"Contribution" report is not displayed one tile, Found:' + count);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Contribution" report is displayed', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"Contribution" report is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 769607', function() {

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Weights', true, 'isSelected');

    it('Should click on the wrench icon next to "Weights" in LHP', function() {
      PA3MainPage.getReportWrenchButton('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Edit Layout" from reports options list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Edit Layout');
    });

    it('Should click on "Delete"(X) icon from "Attribution" tile', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3EditMode.getTileDeleteButton('Attribution')).press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on delete icon from "Attribution" report');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Cancel" button of "Edit Layout" mode header', function() {
      ThiefHelpers.getButtonClassReference('Cancel').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Edit Report Layout" is closed', function() {
      PA3EditMode.isEditMode().then(function(isMode) {
        if (isMode) {
          expect(false).customError('"Edit Report Layout" is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Weights" report is displayed with only one tiles', function() {
      PA3MainPage.getAllTilesFromReport().count().then(function(count) {
        if (count !== 4) {
          expect(false).customError('"Weights" report is not displayed one tile, Found:' + count);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    reportsArr.forEach(function(reportName) {
      it('Verifying if "' + reportName + '" report is displayed', function() {
        PA3MainPage.isReportCalculated(reportName).then(function(displayed) {
          if (displayed === false) {
            expect(false).customError('"' + reportName + '" report is not displayed');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            expect(PA3MainPage.isReportCalculated(reportName)).toBeTruthy();
          } else {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

});
