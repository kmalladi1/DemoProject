'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: scenarios-pcf', function() {

  var arrColumns = [];
  var count;

  describe('Test Step ID: 407455', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Fixed_income/FI_CASH_FLOW_DEFAULT"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('fi-cash-flow-default');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Cash Flows');
  });

  describe('Test Step ID: 408781', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Cash Flows', 'Scenarios and Cash Flows');

    it('Should click on Reinvestment Assumption dropdown and select "Flat"', function() {
      ThiefHelpers.selectOptionFromDropDown('Flat', 'Reinvestment Assumption');
    });

    it('Verifying if "Flat" is selected from drop down options', function() {
      ThiefHelpers.verifySelectedDropDownText('Flat', 'Reinvestment Assumption');
    });

    it('Verifying if "%" text box is present next to drop down when "Flat" option is selected', function() {
      TileOptionsScenariosAndCashFlows.getCompleteTextBoxOfReinvestmentAssumption('Flat').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"%" text box is not present next to drop down when "Flat" option is selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on Reinvestment Assumption dropdown and select "Forwards"', function() {
      ThiefHelpers.selectOptionFromDropDown('Forwards', 'Reinvestment Assumption');
    });

    it('Verifying if "Forwards" is selected from drop down options', function() {
      ThiefHelpers.verifySelectedDropDownText('Forwards', 'Reinvestment Assumption');
    });

    it('Verifying if "Forwards" option is selected there should be no text box next drop down', function() {
      // Verifying if '%' text box is not present
      TileOptionsScenariosAndCashFlows.getCompleteTextBoxOfReinvestmentAssumption('Flat').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('Error: "%" text box is present next to drop down when "Forwards" option is selected');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if 'bps' text box is not present
      TileOptionsScenariosAndCashFlows.getCompleteTextBoxOfReinvestmentAssumption('Forwards + Spread').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"bps" text box is present next to drop down when "Forwards" option is selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on Reinvestment Assumption dropdown and select "Forwards + Spread"', function() {
      ThiefHelpers.selectOptionFromDropDown('Forwards + Spread', 'Reinvestment Assumption');
    });

    it('Verifying if "Forwards + Spread" is selected from drop down options', function() {
      ThiefHelpers.verifySelectedDropDownText('Forwards + Spread', 'Reinvestment Assumption');
    });

    it('Verifying if "Forward + Spread" option is selected there should be "bps" text box next drop down', function() {
      // Verifying if 'bps' text box is present
      TileOptionsScenariosAndCashFlows.getCompleteTextBoxOfReinvestmentAssumption('Forwards + Spread').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"bps" text box is not present next to drop down when "Forwards" ' + 'option is selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Cash Flows Columns, then Dates" radio button in Report Layout options', function() {
      TileOptionsScenariosAndCashFlows.getReportLayoutRadioButton('Project Cash Flows', 'Cash Flows Columns, then Dates').click();

      // Verifying 'Cash Flows Columns, then Dates' radio button is selected
      TileOptionsScenariosAndCashFlows.getReportLayoutRadioButton('Project Cash Flows', 'Cash Flows Columns, then Dates').getAttribute('class').then(function(text) {
        expect(text.indexOf('selected') >= 0).customError('Error:Failed to select "Cash Flows Columns, then Dates" ' + 'radio button');
      });

      // Verifying 'Cash Flows Dates, then Columns' radio button is not selected
      TileOptionsScenariosAndCashFlows.getReportLayoutRadioButton('Project Cash Flows', 'Cash Flows Dates, then Columns').getAttribute('class').then(function(text) {
        expect(text.indexOf('selected') < 0).customError('Error:"Cash Flows Dates, then Columns"  is selected' + 'radio button');
      });
    });
  });

  describe('Test Step ID: 408782', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Cash Flows');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Cash Flows');

    it('Checking if Cash Flows Columns are in "Multi Header" container', function() {
      // Verifying if "Port" text is present in "Multi Header"
      PA3MainPage.getAllMultiHeaderColumns('Cash Flows').each(function(element, index) {
        Utilities.scrollElementToVisibility(element);
        element.getText().then(function(text) {
          if (index > 0) {
            expect(text.indexOf('Port') >= 0).customError('Error: Cash Flows Columns are not present in "Multi Header" container');
          }
        });
      });
    });

    it('Checking if Dates are in "Normal Header" container', function() {
      PA3MainPage.getAllColumnOfCalculatedReport('Cash Flows').each(function(element, index) {
        Utilities.scrollElementToVisibility(element);
        element.getText().then(function(text) {
          if (index > 0 && index < 3) {
            expect(text.indexOf('12') >= 0).customError('Error: Dates are not present in "Normal Header" container');
          }
        });
      });
    });
  });

  describe('Test Step ID: 408783', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Cash Flows', 'Scenarios and Cash Flows');

    it('Should select the "Custom" radio button in Frequencies', function() {
      TileOptionsScenariosAndCashFlows.getFrequenciesRadioButton('Custom').click();

      // Verifying if 'Custom' Radio button is selected
      TileOptionsScenariosAndCashFlows.getFrequenciesRadioButton('Custom').getAttribute('class').then(function(text) {
        expect(text.indexOf('selected') >= 0).customError('Error: Failed to select "Custom" radio button in Frequencies');
      });
    });

    it('Should check "Daily" check box of custom in frequencies section', function() {
      ThiefHelpers.getCheckBoxClassReference('Daily').check();

      // Verifying if "Daily" check box is selected
      ThiefHelpers.getCheckBoxClassReference('Daily').isChecked().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Daily" checkbox is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter 5 in the "Daily" Text Box of Custom', function() {
      // Getting the xpath of the text box
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsScenariosAndCashFlows.xpathFrequenciesTextbox, 'Daily');

      // Enter "5" in the "Daily" text box
      ThiefHelpers.getTextBoxClassReference(undefined, xpath).setText('5');

      // Verifying if "5" is entered in the text box
      ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(date) {
        if (date !== '5') {
          expect(false).customError('Failed to enter "5" in the "Daily" Test Box of Custom. Found: "' + date + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check "Weekly" check box of custom in frequencies section', function() {
      ThiefHelpers.getCheckBoxClassReference('Weekly').check();

      // Verifying if "Weekly" check box is selected
      ThiefHelpers.getCheckBoxClassReference('Weekly').isChecked().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Weekly" checkbox is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter 1 in the "Weekly" Text Box of Custom', function() {
      // Getting the xpath of the text box
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsScenariosAndCashFlows.xpathFrequenciesTextbox, 'Weekly');

      // Enter "1" in the "Weekly" text box
      ThiefHelpers.getTextBoxClassReference(undefined, xpath).setText('1');

      // Verifying if "1" is entered in the text box
      ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(value) {
        if (value !== '1') {
          expect(false).customError('Failed to enter "1" in the "Weekly" Test Box of Custom. Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check "Monthly" check box of custom in frequencies section', function() {
      ThiefHelpers.getCheckBoxClassReference('Monthly').check();

      // Verifying if "Monthly" check box is selected
      ThiefHelpers.getCheckBoxClassReference('Monthly').isChecked().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Monthly" checkbox is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter 3 in the "Monthly" Text Box of Custom', function() {
      // Getting the xpath of the text box
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsScenariosAndCashFlows.xpathFrequenciesTextbox, 'Monthly');

      // Enter "3" in the "Monthly" text box
      ThiefHelpers.getTextBoxClassReference(undefined, xpath).setText('3');

      // Verifying if "3" is entered in the text box
      ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(value) {
        if (value !== '3') {
          expect(false).customError('Failed to enter "3" in the "Monthly" Test Box of Custom. Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check "Quarterly" check box of custom in frequencies section', function() {
      ThiefHelpers.getCheckBoxClassReference('Quarterly').check();

      // Verifying if "Quarterly" check box is selected
      ThiefHelpers.getCheckBoxClassReference('Quarterly').isChecked().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Quarterly" checkbox is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter 4 in the "Quarterly" Text Box of Custom', function() {
      // Getting the xpath of the text box
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsScenariosAndCashFlows.xpathFrequenciesTextbox, 'Quarterly');

      // Enter "4" in the "Quarterly" text box
      ThiefHelpers.getTextBoxClassReference(undefined, xpath).setText('4');

      // Verifying if "4" is entered in the text box
      ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(value) {
        if (value !== '4') {
          expect(false).customError('Failed to enter "4" in the "Quarterly" Test Box of Custom. Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check "Semi-Annually" check box of custom in frequencies section', function() {
      ThiefHelpers.getCheckBoxClassReference('Semi-Annually').check();

      // Verifying if "Semi-Annually" check box is selected
      ThiefHelpers.getCheckBoxClassReference('Semi-Annually').isChecked().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Semi-Annually" checkbox is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter 2 in the "Semi-annually" Text Box of Custom', function() {
      // Getting the xpath of the text box
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsScenariosAndCashFlows.xpathFrequenciesTextbox, 'Semi-Annually');

      // Enter "2" in the "Semi-Annually" text box
      ThiefHelpers.getTextBoxClassReference(undefined, xpath).setText('2');

      // Verifying if "2" is entered in the text box
      ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(value) {
        if (value !== '2') {
          expect(false).customError('Failed to enter "2" in the "Semi-Annually" Test Box of Custom. Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check "Annually" check box of custom in frequencies section', function() {
      // Verifying if "Annually" check box is selected
      ThiefHelpers.getCheckBoxClassReference('Annually').isChecked().then(function(selected) {
        if (!selected) {
          ThiefHelpers.getCheckBoxClassReference('Annually').check();
        }
      });
    });

    it('Should enter 1 in the "Annually" Text Box of Custom', function() {
      // Getting the xpath of the text box
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsScenariosAndCashFlows.xpathFrequenciesTextbox, 'Annually');

      // Enter "1" in the "Annually" text box
      ThiefHelpers.getTextBoxClassReference(undefined, xpath).setText('1');

      // Verifying if "1" is entered in the text box
      ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(value) {
        if (value !== '1') {
          expect(false).customError('Failed to enter "1" in the "Annually" Test Box of Custom. Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on Reinvestment Assumption dropdown and select "Flat"', function() {
      ThiefHelpers.selectOptionFromDropDown('Flat', 'Reinvestment Assumption');
    });

    it('Verifying if "Flat" is selected from drop down options', function() {
      ThiefHelpers.verifySelectedDropDownText('Flat', 'Reinvestment Assumption');
    });

    it('Verifying if "Flat" text box has "5" in Reinvestment Assumption', function() {
      // Verifying if 'Flat' text box has 5
      TileOptionsScenariosAndCashFlows.getTextBoxOfReinvestmentAssumption('Flat').getAttribute('value').then(function(val) {
        if (val !== '5') {
          expect(false).customError('Error: "Flat" text box does not have "5" in Reinvestment Assumption');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if 'Flat' has '%'
      TileOptionsScenariosAndCashFlows.getCompleteTextBoxOfReinvestmentAssumption('Flat').getText().then(function(text) {
        expect(text.indexOf('%') >= 0).customError('Error: "Flat" does not have "%" in Reinvestment Assumption');
      });
    });
  });

  describe('Test Step ID: 408785', function() {

    // Variables
    var arrayDate = ['7/01/2011', '7/04/2011', '7/05/2011', '7/06/2011', '7/07/2011', '7/08/2011', '7/29/2011', '8/31/2011', '9/30/2011', '12/30/2011', '3/30/2012', '6/29/2012', '9/28/2012', '12/31/2012', '6/28/2013', '12/31/2013'];

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Cash Flows');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Cash Flows');

    it('Collecting all columns from report', function() {
      browser.driver.executeScript(function() {
        var value;
        var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
        value = slickObject.grid.getColumns();
        return value;
      }).then(function(value) {
        value.forEach(function(val, index) {
          if (index > 0 && index <= 16) {
            arrColumns.push(val.name);
          }
        });
      });
    });

    it('Verifying if starting columns is "7/01/2011"', function() {
      var firstColumnRef = PA3MainPage.getAllColumnOfCalculatedReport('Cash Flows').get(0);
      Utilities.scrollElementToVisibility(firstColumnRef);
      firstColumnRef.getText().then(function(text) {
        expect(text).toContain('7/01/2011');
      });

      // Collecting total no.of columns for further use
      PA3MainPage.getAllColumnOfCalculatedReport('Cash Flows').count().then(function(val) {
        count = val;
      });
    });

    it('Verifying if ending columns is "12/31/2013"', function() {
      // Getting last but one column that has "12/31/2013"
      var lastColumnRef = PA3MainPage.getAllColumnOfCalculatedReport('Cash Flows').get(count - 2);
      Utilities.scrollElementToVisibility(lastColumnRef);
      lastColumnRef.getText().then(function(text) {
        expect(text).toContain('12/31/2013');
      });
    });

    arrayDate.forEach(function(element, index) {
      it('Verifying if report header has the ' + element + ' column', function() {
        expect(element.indexOf(arrColumns[index]) >= 0).customError('Report header does not have "' + element + '" column');
      });
    });
  });
});
