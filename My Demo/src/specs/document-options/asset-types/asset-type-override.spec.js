'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: asset-type-override', function() {

  describe('Test Step ID: 477683', function() {

    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Accounts/testingauo" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('testingauo');
    });

    // Verify if "Weights" report is selected from LHP
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Weights', undefined, 'isSelected');

    var arrOfWidgetXpath = [PA3MainPage.xpathPortfolioWidget, PA3MainPage.xpathBenchmarkWidget];
    var arrOfWidgets = ['Portfolio', 'Benchmark'];
    var arrOfExpectedText = ['CLIENT:/PA3/ACCOUNTS/BLANK_SETTINGS.ACCT', 'SPN:OEX'];

    CommonPageObjectsForPA3.verifyWidgetBoxText(arrOfWidgetXpath, arrOfWidgets, arrOfExpectedText);
  });

  describe('Test Step ID: 477685', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Add/Remove', 'Asset Types', 'document options');

    it('Verifying that workspace view is changed to "Asset Types - Add/Remove"', function() {
      DocumentOptions.getOptionTitle().getText().then(function(title) {
        if (title !== 'Asset Types - Add/Remove') {
          expect(false).customError('Workspace view is not changed to "Asset Types - Add/Remove"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if options are not visible in "Selected" section', function() {
      DocumentOptionsAssetTypeAddRemove.getAllElements('selected').count().then(function(options) {
        if (options !== 0) {
          expect(false).customError('Options are visible in "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Restore Defaults" option is grayed out', function() {
      expect(DocumentOptions.getRestoreDefaultsButton().getAttribute('class')).toContain('disabled');
    });
  });

  describe('Test Step ID: 477691', function() {

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Dcoument Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Should click on the "Hamburger" icon next to "portfolio lookup"', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() { }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is no open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "AUO_ACCOUNT" from the drop down', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'AUO_ACCOUNT').click().then(function() { }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click "OK" in the "Accounts" drop down to exit', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() { }, function() {

        expect(false).customError('Unable to click on "OK" from drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);
  });

  describe('Test Step ID: 477686', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Add/Remove', 'Asset Types', 'document options');

    it('Should select "Generate Offset Cash for Shorts" from the "Selected" section', function() {
      DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|Equity Common', 'Generate Offset Cash for Shorts', 'Selected').click().then(function() { }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that 'Generate Offset Cash for Shorts' is selected
      expect(DocumentOptionsAssetTypeAddRemove.getElementInsideTree('Equity|Equity Common', 'Generate Offset Cash for Shorts', 'Selected').getAttribute('class')).toContain('selected');
    });

    it('Should click on "Left Arrow" icon to remove it from "Selected" section', function() {
      DocumentOptionsAssetTypeAddRemove.getArrowButton('Left').click().then(function() { }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Dcoument Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);
  });

  describe('Test Step ID: 477692', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Add/Remove', 'Asset Types', 'document options');

    it('Verifying if the "Restore Defaults" button is enabled', function() {
      DocumentOptions.getRestoreDefaultsButton().isPresent().then(function(enabled) {
        if (!enabled) {
          expect(false).customError('The "Restore Defaults" button is not enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 477693', function() {

    it('Should click on the "Restore Defaults" button', function() {
      DocumentOptions.getRestoreDefaultsButton().click().then(function() { }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'OK', 'Do you want to replace your current settings with the account defaults?');

    it('Verifying that "Defaults Applied" is visible', function() {
      // Verifying that "Restore Defaults" button disappeared
      DocumentOptions.getRestoreDefaultsButton().isPresent().then(function(displayed) {
        if (displayed) {
          expect(false).customError('"Restore Defaults" button is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying that "Defaults Applied" is visible now
      DocumentOptions.getDefaultsApplied().isPresent().then(function(visisble) {
        if (!visisble) {
          expect(false).customError('"Defaults Applied" is not visible.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrassetType = ['ADR/GDR', 'Equity Common'];

    arrassetType.forEach(function(assetType) {
      it('Verifying if "' + assetType + '" is present in the "Selected" section', function() {
        DocumentOptionsAssetTypeAddRemove.getElement(assetType, 'tree', 'Equity').isPresent().then(function(present) {
          if (!present) {
            expect(false).customError('"' + assetType + '" is not present in the "Selected" section.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 477694', function() {

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Dcoument Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);
  });
});
