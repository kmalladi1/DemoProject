'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: save-change-cache', function() {

  let arrOfTotalValues = [];

  describe('Test Step ID: 654995', function() {

    // Open default document and un-check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:/Pa3/Automation/CACHE_DOC" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('cache-doc');
    });

    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Save As…');

    CommonPageObjectsForPA3.selectPersonalAndEnterDocumentNameInSaveAsDialog(`Save_Changes`, `MMMDDYY`);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

  });

  describe('Test Step ID: 654996', function() {

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Attribution', 'Groupings');

    it('Should hover on "Economic Sector" and click on the "X" icon next to it', function() {
      var item = ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathSelectedContainer, 'Economic Sector - FactSet');
      item.getActions().then(actions => {
        actions.triggerAction('remove');
      });
    });

    it('Should hover on "Economic Sector" and click on the "X" icon next to it', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'Economic Sector - FactSet').getText().then(function(name) {
        expect(false).customError('"Economic Sector - FactSet" is not present in the selected section. Found: "' + name + '".');
        CommonFunctions.takeScreenShot();
      }, function(err) {
        expect(true).toBeTruthy();
      });
    });

    it('Automation Task: Ignoring synchronization to handle Refresh Cancel button', function() {
      browser.ignoreSynchronization = true;
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Attribution');

    it('Wait for the loading icon to display', function() {
      ThiefHelpers.waitUntilSpinnerAppears(PA3MainPage.getProgressIndicatorClassReference('Attribution'), 15000);
    });

    it('Verify if the report is "Attribution"  re-calculating', function() {
      ThiefHelpers.getProgressIndicatorClassReference().getProgress().then(function() { }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Enable wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    it('Should wait until loading icon in Attribution disappears', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Attribution'), 60000)).toBeTruthy();
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    it('Verifying that groupings hyperlink name is displayed as "Industry"', function() {
      PA3MainPage.getGroupingsHyperLink('Attribution').getText().then(function(text) {
        if (text !== 'Industry') {
          expect(false).customError('Hyperlink name is not displayed as "Industry"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should note all the values in "Total" row for future verification', function() {
      SlickGridFunctions.getRowData('Attribution', 'Total', '').then(function(data) {
        arrOfTotalValues = data;
      });
    });
  });

  describe('Test Step ID: 654997', function() {

    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Save');

    CommonPageObjectsForPA3.saveChanges();
  });

  describe('Test Step ID: 654998', function() {

    // Click on the folder icon and select "Open..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption(`Open...`);

    // Select the reuqired document from personal directory
    // Add .toUpperCase() if you want the document name to be in upper case to the function
    CommonPageObjectsForPA3.openRequiredDocumentFromPersonal(`Save_Changes`, `MMMDDYY`);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');

    it('Verifying if text saying "Cached data from" displayed next to "Footnotes"', function() {
      PA3MainPage.getCachedData().isPresent().then(function(option) {
        if (option) {
          PA3MainPage.getCachedData().getText().then(function(text) {
            if (text.indexOf('Cached data from') < 0) {
              expect(false).customError('The message saying ' + '"Cached data from..." is not displayed next to Footnotes.');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('The message saying ' + '"Cached data from..." is not displayed next to Footnotes.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should note all the values in "Total" row for future verification', function() {
      SlickGridFunctions.getRowData('Attribution', 'Total', '').then(function(data) {
        data.forEach((value, index) => {
          if (value !== arrOfTotalValues[index]) {
            expect(false).customError(`Expected: "${arrOfTotalValues[index]}" but Found: "${value}".`);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 762095', function() {

    // Click on the folder icon and select "New" from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption(`New`);

    // Click on the folder icon and select "Delete…" from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption(`Delete…`);

    // Select the reuqired document from personal directory
    // Add .toUpperCase() if you want the document name to be in upper case to the function
    CommonPageObjectsForPA3.deleteRequiredDocumentFromPersonalDirectory(`Save_Changes`, `MMMDDYY`);
  });

});
