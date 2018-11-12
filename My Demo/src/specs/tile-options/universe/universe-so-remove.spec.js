'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: universe-so-remove', function() {

  var clickUniverseAndClickOnSearchOrderButtonAfterClickingOnOptionInWrench = function() {

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Contribution', 'Options');

    it('Should click on the "Universe" tab on the LHP of tile options view', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Universe').select();

      // Verifying if "Universe" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Universe').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Universe" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Search Order" button located under "Expand Composite Assets"', function() {
      ThiefHelpers.getButtonClassReference('Search Order').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Search Order" button located under "Expand Composite Assets".');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Asset Ordering" dialog is displayed after clicking Search Order button', function() {
      ThiefHelpers.isDialogOpen('Asset Ordering').then(function(dialogStatus) {
        if (!dialogStatus) {
          expect(false).customError('"Asset Ordering" dialog is not displayed after clicking Search Order button');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  };

  describe('Test Step ID: 461285', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open the document "Client:/pa3/universe/Refresh_Test"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('refresh-test');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');
  });

  describe('Test Step ID: 461286', function() {

    // Click on report Wrench icon, select Universe from LHP and click on Search order button
    clickUniverseAndClickOnSearchOrderButtonAfterClickingOnOptionInWrench();

    it('Should click on (X) remove icon next to "Factset:/ETF/" in the ordering section', function() {
      var action = ThiefHelpers.getVirtualListboxClassReference(AssetOrdering.xpathOfOrderingContainer).getItemByText('FactSet:/ETF/');

      // Hover on "Bench.Ending Weight" and click on remove button
      return action.getActions().then(function(remove) {
        return remove.triggerAction('remove');
      });
    });

    var arrOfColumns = ['FactSet:/ETF_INDEX/', 'FactSet:/INDEX_IDS/', 'FactSet:/Mutual_Funds/', 'Client:'];
    it('Verifying that expected columns are present in ordering section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(AssetOrdering.xpathOfOrderingContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.length === 4) {
          arrOfColumns.forEach(function(columnName, index) {
            if (columnName !== myArray[index]) {
              expect(false).customError('Expected: "' + columnName + '" but Found: "' + myArray[index] + '".');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('Expected "4" columns to display but found: "' + myArray.length + '" in ordering section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 467338', function() {

    // Getting the xpath of the Selected section
    var xpathOfClearAllButton = CommonFunctions.replaceStringInXpath(AssetOrdering.xpathOfClearAllButtonFromDialog, 'Clear All');

    it('Should click on "Clear All" button in the Asset ordering dialog', function() {
      ThiefHelpers.getButtonClassReference(undefined, xpathOfClearAllButton).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Clear All" button in the Asset ordering dialog.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that ordering section is empty', function() {
      var children = ThiefHelpers.getVirtualListboxClassReference(AssetOrdering.xpathOfOrderingContainer).getChildrenText();
      children.then(function(childArr) {
        if (childArr.length > 0) {
          expect(false).customError('Ordering section is not displayed blank.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Getting the xpath of the Selected section
    var xpathOfOkButton = CommonFunctions.replaceStringInXpath(AssetOrdering.xpathOfClearAllOrOkOrCancelButton, 'OK');

    it('Should click on "OK" button in the Asset ordering dialog', function() {
      console.log(xpathOfOkButton);
      ThiefHelpers.getButtonClassReference(undefined, xpathOfOkButton).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button in the Asset ordering dialog.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Disabling wait for angular', function() {
      browser.ignoreSynchronization = true;
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

    it('Verify if the report is re-calculating', function() {
      ThiefHelpers.getProgressIndicatorClassReference().getProgress().then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });
  });

  describe('Test Step ID: 467339', function() {

    // Click on report Wrench icon, select Universe from LHP and click on Search order button
    clickUniverseAndClickOnSearchOrderButtonAfterClickingOnOptionInWrench();

    it('Verifying that ordering section is empty in the Asset ordering dialog', function() {
      var children = ThiefHelpers.getVirtualListboxClassReference(AssetOrdering.xpathOfOrderingContainer).getChildrenText();
      children.then(function(childArr) {
        if (childArr.length > 0) {
          expect(false).customError('Ordering section is not displayed blank in the Asset ordering dialog.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Getting the xpath of the Selected section
    var xpathOfOkButton = CommonFunctions.replaceStringInXpath(AssetOrdering.xpathOfClearAllOrOkOrCancelButton, 'OK');

    it('Should click on "OK" button in the Asset ordering dialog', function() {
      ThiefHelpers.getButtonClassReference(undefined, xpathOfOkButton).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button in the Asset ordering dialog.');
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 467341', function() {

    it('Disabling wait for angular', function() {
      browser.ignoreSynchronization = true;
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

    it('Verify if the loading icon does not appear', function() {
      ThiefHelpers.getProgressIndicatorClassReference().getProgress().then(function() {
        expect(false).customError('Report is recalculated.');
        CommonFunctions.takeScreenShot();
      }, function(error) {
        expect(true).toBeTruthy();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });
  });
});
