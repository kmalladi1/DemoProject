'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: mc-var-columns', function() {

  describe('Test Step ID: 770070', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:/Pa3/Risk/mc_var_columns" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('mc-var-columns');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var arrValues = [{name: 'Portfolio', val: 'US:DJII', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'benchmark', val: 'CASH:USD', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });
  });

  describe('Test Step ID: 770072', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Columns');

    it('Should select "MC % Value at Risk #VD #VT Day,  #VC% #VA" from the "Selected" section', function() {
      // Getting the xpath of the Selected section
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('MC % Value at Risk #VD #VT Day,  #VC% #VA').select();

      // Verify if 'MC % Value at Risk #VD #VT Day,  #VC% #VA' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('MC % Value at Risk #VD #VT Day,  #VC% #VA').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"MC % Value at Risk #VD #VT Day,  #VC% #VA" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Risk" section from "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Risk').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Risk" section is not expanded from "Accordion" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "VaR Confidence Interval (%)" text box is set to "99.00"(Known Issue: RPD:41194106)', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathTextBoxFromRiskSection, 'VaR Confidence Interval (%)');

      // Verifying if the text box is set as expected.
      ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(text) {
        if (text !== '99.0000') {
          expect(false).customError('"VaR Confidence Interval (%)" text box is not set to "99.0000"(Known Issue: RPD:41194106); Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "VaR Days" text box is set to "21"', function() {
      // Verifying if the text box is set as expected.
      ThiefHelpers.getTextBoxClassReference('VaR Days').getText().then(function(text) {
        if (text !== '21') {
          expect(false).customError('"VaR Days" text box is not set to "21"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Calendar Days" drop down is set by default', function() {
      ThiefHelpers.verifySelectedDropDownText('Calendar Days', undefined, TileOptionsColumns.xpathTradingDaysDropdown);
    });

    it('Should verify if "Annualized VaR" check box is checked off', function() {
      // Verifying if "Annualized VaR" checkbox is unchecked
      ThiefHelpers.getCheckBoxClassReference('Annualized VaR').isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Annualized VaR" checkbox is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 770071', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should verify if "MC % Value at Risk 21 Calendar Day, 99% Annualized" column is displayed in the report', function() {
      SlickGridFunctions.getColumnNames('Weights').then(function(column) {
        if (column.indexOf('MC % Value at Risk 21 Calendar Day, 99% Annualized') < 0) {
          expect(false).customError('"MC % Value at Risk 21 Calendar Day, 99% Annualized" column did not display in report');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 770073', function() {

    // Open Tile Options dialog and select columns from LHP
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Columns');

    it('Should select "MC % Value at Risk #VD #VT Day,  #VC% #VA" from the "Selected" section', function() {
      // Getting the xpath of the Selected section
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('MC % Value at Risk #VD #VT Day,  #VC% #VA').select();

      // Verify if 'MC % Value at Risk #VD #VT Day,  #VC% #VA' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('MC % Value at Risk #VD #VT Day,  #VC% #VA').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"MC % Value at Risk #VD #VT Day,  #VC% #VA" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Risk" section from "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Risk').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Risk" section is not expanded from "Accordion" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "95.00" in the  "VaR Confidence Interval (%)" text box', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathTextBoxFromRiskSection, 'VaR Confidence Interval (%)');
      ThiefHelpers.getTextBoxClassReference(undefined, xpath).setText('95.00');

      // Verifying if the text box is set as expected.
      ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(text) {
        if (text !== '95.00') {
          expect(false).customError('"VaR Confidence Interval (%)" text box is not set to "95.00"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "1" in the "VaR Days" text box', function() {
      ThiefHelpers.getTextBoxClassReference('VaR Days').setText('1');

      // Verifying if the text box is set as expected.
      ThiefHelpers.getTextBoxClassReference('VaR Days').getText().then(function(text) {
        if (text !== '1') {
          expect(false).customError('"VaR Days" text box is not set to "1"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Trading Days" drop down and select "Calendar Days"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsColumns.xpathTradingDaysDropdown).selectItemByText('Trading Days');

      // Verifying if "Trading Days" is set to "Trading" drop down
      ThiefHelpers.verifySelectedDropDownText('Trading Days', undefined, TileOptionsColumns.xpathTradingDaysDropdown);
    });

    it('Should un-check "Annualized VaR" check box and verify', function() {
      ThiefHelpers.getCheckBoxClassReference('Annualized VaR').uncheck();

      // Verifying if "Annualized VaR" checkbox is unchecked
      ThiefHelpers.getCheckBoxClassReference('Annualized VaR').isChecked().then(function(boolean) {
        if (boolean) {
          expect(false).customError('"Annualized VaR" checkbox is checked off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should verify if "MC % Value at Risk 1 Trading Day, 95% " column is displayed in the report', function() {
      SlickGridFunctions.getColumnNames('Weights').then(function(column) {
        if (column.indexOf('MC % Value at Risk 1 Trading Day, 95% ') < 0) {
          expect(false).customError('"MC % Value at Risk 1 Trading Day, 95%" column did not display in report');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 770074', function() {

    it('Should close PA3 application', function() {
      // After completing all the test steps protractor will close the browser automatically
      expect(true).toBeTruthy();
    });
  });
});
