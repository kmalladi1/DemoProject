'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: aoe-analytic-value', function() {

  describe('Test Step ID: Start Up Instructions', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/PA3/Fixed_income/PA3_FI_OVERRIDE_EX2"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('pa3-fi-override-ex2');
    });

    it('Should click on Wrench icon in the application.', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Wrench menu appeared.
      expect(PA3MainPage.getWrenchIcon(true).isPresent()).toBeTruthy();
    });

    it('Should check off "Enable Overrides" option in "Analytics Overrides" sub-menu from the Wrench menu.', function() {
      PA3MainPage.setOptionFromWrenchMenu(true, 'Analytics Overrides|Enable Overrides').then(function(boolean) {
        expect(boolean).customError('"Enable Overrides" option in "Analytics Overrides" sub-menu did not check off.');
        if (!boolean) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should right click on "Port. Ending Spread Duration" column value for the first security "88579YAE" ' + 'in the report list and select "Override Security Value…" from the custom menu.', function() {
      PA3MainPage.getValueFromCalculatedReport('Weights', '88579YAE', 'Port. Ending Spread Duration', 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right', true).then(function(ref) {
        PA3MainPage.rightClickAndSelectOption(ref, 'Override Security Value…');
      });
    });

    it('Verifying if "Analytics Override Editor" dialog has appeared.', function() {
      ThiefHelpers.isDialogOpen('Analytics Override Editor').then(function(present) {
        if (!present) {
          expect(false).customError('"Analytics Override Editor" dialog is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 548227', function() {

    it('Verifying if "Analytic" drop down is set to "Spread Duration" in Analytics Override Editor section.', function() {
      AnalyticsOverrideEditor.getDropdown('Analytic').getSelectedText().then(function(option) {
        expect(option === 'Spread Duration').customError('"Analytic" drop down did not set to ' + '"Spread Duration" in Analytics Override Editor section.');
        if (option !== 'Spread Duration') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Analytic" dropdown to open.', function() {
      AnalyticsOverrideEditor.getDropdown('Analytic').open();

      // Verifying if "Analytic" dropdown is opened.
      Utilities.isDropDownOpen();
    });

    var arrAnalytic = ['Average Life', 'Convexity To Worst', 'Effective Convexity', 'Convexity', 'Duration To Worst', 'Coupon Curve Duration', 'Effective Duration', 'Modified Duration', 'Modified Duration for Float', 'Real Modified Duration', 'Spread Duration', 'Option Adjusted Spread', 'Real Yield', 'Tax Equivalent Yield', 'Yield to 3 Years', 'Yield to Expected Maturity', 'Yield to Maturity', 'Yield to Worst'];

    arrAnalytic.forEach(function(optionName, index) {

      it('Verifying if "Analytic" dropdown contains "' + optionName + '" option', function() {
        expect(AnalyticsOverrideEditor.getAllOptionsFromAnalyticDropdown().get(index).getText()).toEqual(optionName);
      });
    });

    it('Verifying if "Spread Duration" option is highlighted in Yellow.', function() {
      expect(Utilities.getBgColor(AnalyticsOverrideEditor.getOptionFromAnalyticDropdown('Spread Duration'))).toEqual('rgba(177, 219, 234, 1)');
    });
  });

  describe('Test Step ID: 548228', function() {

    it('Should enter 9999 in the Value field in Analytics Override Editor section', function() {
      ThiefHelpers.getTextBoxClassReference('Value').setText('9999');
    });

    it('Verifying if Value field shows 9999 with a X-icon at the end.', function() {
      ThiefHelpers.getTextBoxClassReference('Value').getText().then(function(inputFieldVal) {
        expect(inputFieldVal === '9999').customError(' "Value" field did not set to "9999". Found:"' + inputFieldVal + '"');
        if (inputFieldVal !== '9999') {
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if X-icon has appeared.
      expect(AnalyticsOverrideEditor.getValueFieldXIcon().isDisplayed()).toBeTruthy();
    });
  });

  describe('Test Step ID: 548229', function() {

    it('Should click on X-icon in the Value field to make input field blank.', function() {
      AnalyticsOverrideEditor.getValueFieldXIcon().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Value input field is blank.
      ThiefHelpers.getTextBoxClassReference('Value').getText().then(function(val) {
        expect(val === '').customError('"Value" field is not blank. Found:"' + val + '"');
        if (val !== '') {
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 548230', function() {

    it('Should enter -23 in the Value field in Analytics Override Editor section', function() {
      ThiefHelpers.getTextBoxClassReference('Value').setText('-23');
    });

    it('Verifying if Value field shows -23 with a X-icon at the end.', function() {
      ThiefHelpers.getTextBoxClassReference('Value').getText().then(function(val) {
        expect(val === '-23').customError('"Value" field did not set to "-23". Found:"' + val + '"');
        if (val !== '-23') {
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying that X-icon is appeared.
      expect(AnalyticsOverrideEditor.getValueFieldXIcon().isDisplayed()).toBeTruthy();
    });
  });

  describe('Test Step ID: 548231', function() {

    it('Should clear and enter *55 in the Value field in Analytics Override Editor section', function() {
      ThiefHelpers.getTextBoxClassReference('Value').setText('*55');
    });

    it('Verifying if "Value" field shows a Red warning icon', function() {
      expect(AnalyticsOverrideEditor.getWarningIconFromInputField('Value').isDisplayed()).toBeTruthy();
    });

    it('Verifying if "Value" field shows X icon', function() {
      expect(AnalyticsOverrideEditor.getValueFieldXIcon().isDisplayed()).toBeTruthy();
    });

    it('Should click on the Warning icon', function() {
      AnalyticsOverrideEditor.getWarningIconFromInputField('Value').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    //Known issue: RPD:24580121
    it('Verifying if an infobox appears with a message "Input must be a number."', function() {
      AnalyticsOverrideEditor.getInfoBox().getText().then(function(value) {
        if (value !== 'Input must be a number') {
          expect(false).customError('The message saying ' + '"Input must be a number" is not appeared in the infobox. Found:"' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: Closing Instructions', function() {

    it('Click on "X" button from "Analytics Override Editor" titlebar', function() {
      ThiefHelpers.getDialogClassReference('Analytics Override Editor').close();
    });

    it('Verifying that "Analytics Override Editor" dialog is closed', function() {
      ThiefHelpers.isDialogOpen('Analytics Override Editor').then(function(present) {
        if (present) {
          expect(false).customError('"Analytics Override Editor" dialog did not close even after ' + 'clicking on "X" icon.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
