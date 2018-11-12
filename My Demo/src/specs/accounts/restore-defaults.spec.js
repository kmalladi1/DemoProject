'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: restore-defaults', function() {

  describe('Test Step ID: 548074', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Restore_Def_Doc" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('restore-def-doc');
    });

  });

  describe('Test Step ID: 548113', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Portfolio', 'Prices', 'document options');

    it('Verifying that "Restore Defaults" is grayed out when "Portfolio" option is selected', function() {
      expect(DocumentOptions.getRestoreDefaultsButton().getAttribute('class')).toContain('disabled');
    });

    it('Should click on the "Benchmark" tab from "Prices" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Benchmark', 'Prices').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Benchmark', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Benchmark" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Restore Defaults" is grayed out when "Benchmark" option is selected', function() {
      expect(DocumentOptions.getRestoreDefaultsButton().getAttribute('class')).toContain('disabled');
    });

    it('Should click on the "Advanced" tab from "Prices" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Advanced', 'Prices').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Advanced', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Advanced" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Restore Defaults" is grayed out when "Advanced" option is selected', function() {
      expect(DocumentOptions.getRestoreDefaultsButton().getAttribute('class')).toContain('disabled');
    });

  });

  describe('Test Step ID: 548075', function() {

    it('Should click on the "Analytics Sources" tab from "Fixed Income" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Analytics Sources', 'Fixed Income').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Analytics Sources', 'Fixed Income').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Analytics Sources" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Restore Defaults" is grayed out when "Analytics Sources" option is selected', function() {
      expect(DocumentOptions.getRestoreDefaultsButton().getAttribute('class')).toContain('disabled');
    });

  });

  describe('Test Step ID: 548076', function() {

    it('Should click on the "Databases" tab from LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Databases').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Databases').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Databases" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Restore Defaults" is grayed out when "Databases" option is selected', function() {
      expect(DocumentOptions.getRestoreDefaultsButton().getAttribute('class')).toContain('disabled');
    });

  });

  describe('Test Step ID: 548077', function() {

    it('Should click on the "Date Options" tab from "Dates" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Date Options', 'Dates').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Date Options', 'Dates').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Date Options" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Restore Defaults" is grayed out when "Dates" option is selected', function() {
      expect(DocumentOptions.getRestoreDefaultsButton().getAttribute('class')).toContain('disabled');
    });

  });

  describe('Test Step ID: 548078', function() {

    // Click on "Cancel" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Document Options');

    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights', 'Options');

  });

  describe('Test Step ID: 548079', function() {

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights').then(function(found) {
        if (!found) {
          expect(false).customError('View is not changed to "Tile Options - Weights" mode.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Groupings" tab on the LHP of tile options view', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Groupings').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Groupings').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Groupings" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Restore Defaults" is grayed out when "Groupings" option is selected', function() {
      expect(DocumentOptions.getRestoreDefaultsButton().getAttribute('class')).toContain('disabled');
    });

  });

  describe('Test Step ID: 548080', function() {

    it('Should click on the "Risk Models" tab from "Risk" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Risk Models', 'Risk').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Risk Models', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Risk Models" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Restore Defaults" button is grayed out in "Risk Models" pill', function() {
      expect(TileOptions.getRestoreDefaultsButton().getAttribute('class'))
        .toContain('disabled');
    });

  });

  describe('Test Step ID: 548081', function() {

    // Click on "Cancel" button of header and verify if "Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options');

    it('Should type "Equity_Account" into the "Portfolio" widget and select "Client:/pa3/accounts/EQUITY_ACCOUNT.ACCT"', function() {
      expect(PA3MainPage.setPortfolio('Equity_Account', 'Client:/pa3/accounts/EQUITY_ACCOUNT.ACCT',
        'CLIENT:/PA3/ACCOUNTS/EQUITY_ACCOUNT.ACCT')).toBeTruthy();
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

  });

  describe('Test Step ID: 548082', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Portfolio', 'Prices', 'document options');

    it('Verifying that "Defaults Applied" is displayed when "Portfolio" option is selected', function() {
      DocumentOptions.getDefaultsApplied().isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Defaults Applied" is not displayed when "Portfolio" option is selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Benchmark" tab from "Prices" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Benchmark', 'Prices').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Benchmark', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Benchmark" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Defaults Applied" is displayed when "Benchmark" option is selected', function() {
      DocumentOptions.getDefaultsApplied().isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Defaults Applied" is not displayed when "Benchmark" option is selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Advanced" tab from "Prices" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Advanced', 'Prices').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Advanced', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Advanced" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Defaults Applied" is displayed when "Advanced" option is selected', function() {
      DocumentOptions.getDefaultsApplied().isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Defaults Applied" is not displayed when "Advanced" option is selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 548083', function() {

    it('Should click on the "Analytics Sources" tab from "Fixed Income" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Analytics Sources', 'Fixed Income').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Analytics Sources', 'Fixed Income').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Analytics Sources" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Defaults Applied" is displayed when "Analytics Sources" option is selected', function() {
      DocumentOptions.getDefaultsApplied().isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Defaults Applied" is not displayed when "Analytics Source" option is selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 548084', function() {

    it('Should click on the "Databases" tab from LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Databases').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Databases').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Databases" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Defaults Applied" is displayed when "Databases" option is selected', function() {
      DocumentOptions.getDefaultsApplied().isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Defaults Applied" is not displayed when "Databases" option is selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 548085', function() {

    it('Should click on the "Date Options" tab from "Dates" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Date Options', 'Dates').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Date Options', 'Dates').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Date Options" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Defaults Applied" is displayed when "Dates" option is selected', function() {
      DocumentOptions.getDefaultsApplied().isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Defaults Applied" is not displayed when "Dates" option is selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 548086', function() {

    // Click on "Cancel" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Groupings');

    it('Verifying that "Defaults Applied" is displayed when "Groupings" option is selected', function() {
      DocumentOptions.getDefaultsApplied().isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Defaults Applied" is not displayed when "Groupings" option is selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 548087', function() {

    it('Should click on the "Risk Models" tab from "Risk" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Risk Models', 'Risk').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Risk Models', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Risk Models" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Defaults Applied" is displayed when "Risk Models" pill is selected', function() {
      DocumentOptions.getDefaultsApplied().isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Defaults Applied" is not displayed when "Risk Models" option is selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 548088', function() {

    // Click on "Cancel" button of header and verify if "Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options');

    it('Should enter "CLIENT:/PA3/ACCOUNTS/FIXED_INCOME_ACCOUNT.ACCT" into the "Portfolio" widget', function() {
      // Clear the existing account from Portfolio
      PA3MainPage.getWidgetBox('Portfolio').clear();

      PA3MainPage.setPortfolio('CLIENT:/PA3/ACCOUNTS/FIXED_INCOME_ACCOUNT.ACCT', 'FI ACCT', 'Client:/pa3/accounts/FIXED_INCOME_ACCOUNT.ACCT').then(function(option) {
        if (!option) {
          expect(false).customError('"CLIENT:/PA3/ACCOUNTS/FIXED_INCOME_ACCOUNT.ACCT" is not selected from type ahead.');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

  });

  describe('Test Step ID: 548114', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Portfolio', 'Prices', 'document options');

    it('Verifying that "Defaults Applied" is displayed when "Portfolio" option is selected', function() {
      expect(DocumentOptions.getDefaultsApplied().isPresent()).toBeTruthy();
    });

    it('Should click on the "Benchmark" tab from "Prices" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Benchmark', 'Prices').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Benchmark', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Benchmark" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Defaults Applied" is displayed when "Benchmark" option is selected', function() {
      expect(DocumentOptions.getDefaultsApplied().isPresent()).toBeTruthy();
    });

    it('Should click on the "Advanced" tab from "Prices" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Advanced', 'Prices').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Advanced', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Advanced" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Restore Defaults" is grayed out when "Advanced" option is selected', function() {
      //expect( DocumentOptions.getRestoreDefaultsButton().getAttribute( 'class' ) ).toContain( 'disabled' );
      DocumentOptions.getRestoreDefaultsButton().isPresent().then(function(found) {
        expect(!found).customError('As per Known Issue: RPD:21357544, "Restore Defaults" button is not displayed');
      });
    });

  });

  describe('Test Step ID: 548115', function() {

    it('Should click on the "Analytics Sources" tab from "Fixed Income" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Analytics Sources', 'Fixed Income').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Analytics Sources', 'Fixed Income').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Analytics Sources" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Defaults Applied" is displayed when "Analytics Sources" option is selected', function() {
      expect(DocumentOptions.getDefaultsApplied().isPresent()).toBeTruthy();
    });

  });

  describe('Test Step ID: 548116', function() {

    it('Should click on the "Databases" tab from LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Databases').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Databases').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Databases" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Defaults Applied" is displayed when "Databases" option is selected', function() {
      expect(DocumentOptions.getDefaultsApplied().isPresent()).toBeTruthy();
    });

  });

  describe('Test Step ID: 548117', function() {

    it('Should click on the "Date Options" tab from "Dates" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Date Options', 'Dates').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Date Options', 'Dates').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Date Options" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Defaults Applied" is displayed when "Dates" option is selected', function() {
      expect(DocumentOptions.getDefaultsApplied().isPresent()).toBeTruthy();
    });

  });

  describe('Test Step ID: 548118', function() {

    // Click on "Cancel" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Groupings');

  });

  describe('Test Step ID: 548119', function() {

    it('Should click on the "Risk Models" tab from "Risk" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Risk Models', 'Risk').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Risk Models', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Risk Models" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Defaults Applied" is displayed when "Risk Models" pill is selected', function() {
      expect(TileOptions.getDefaultsApplied().isPresent()).toBeTruthy();
    });

  });

  describe('Test Step ID: 548089', function() {

    // Click on "Cancel" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options');

  });

});
