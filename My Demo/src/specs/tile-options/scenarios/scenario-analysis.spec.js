'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: scenario-analysis', function() {

  describe('Test Step ID: 409202', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Fixed_income/FI_SCENARIO_ANALYSIS"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('fi-scenario-analysis');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Valuation');
  });

  describe('Test Step ID: 409210', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Valuation', 'Scenarios and Cash Flows');

    it('Should select the "Scenarios Then Horizons" radio button from Report Layout section', function() {
      TileOptionsScenariosAndCashFlows.getReportLayoutRadioButton('Scenario Analysis', 'Scenarios Then Horizons').click().then(function() { }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying 'Scenarios Then Horizons' radio button is selected
      TileOptionsScenariosAndCashFlows.getReportLayoutRadioButton('Scenario Analysis', 'Scenarios Then Horizons').getAttribute('class').then(function(text) {
        expect(text.indexOf('selected') >= 0).customError('Error:Failed to select "Scenarios Then Horizons"' + 'radio button from Report Layout section');
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Valuation');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Valuation');

    it('Verifying if Scenarios are in "Multi Header" container', function() {
      PA3MainPage.getAllMultiHeaderColumns('Valuation').each(function(element, index) {
        Utilities.scrollElementToVisibility(element);
        element.getText().then(function(text) {
          if (index > 1) {
            expect(text.indexOf('All Curves') >= 0).customError('Error: Scenarios are not in "Multi Header" container');
          }
        });
      });
    });

    it('Verifying if Horizon are in "Column Header" container', function() {
      PA3MainPage.getAllColumnOfCalculatedReport('Valuation').each(function(element, index) {
        Utilities.scrollElementToVisibility(element);
        element.getText().then(function(text) {
          if (index === 1) {
            expect(text).toContain('6 Months');
          } else if (index === 2) {
            expect(text).toContain('1 Year');
          }
        });
      });
    });
  });

  describe('Test Step ID: 409216', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Valuation', 'Scenarios and Cash Flows');

    it('Expand "FactSet" from "Available" section', function() {
      TileOptionsScenariosAndCashFlows.expandElementTree('FactSet');

      // Verifying if "Factset" is expanded in "Available" section
      TileOptionsScenariosAndCashFlows.checkIfExpanded('FactSet');
    });

    it('Select "All Curve Shift down 350bps" present under "FactSet" tree from "Available" section', function() {
      TileOptionsScenariosAndCashFlows.getElementFromAvailableSection('FactSet', 'All Curves Shift down 350 bps').isPresent().then(function(found) {
        if (found) {
          TileOptionsScenariosAndCashFlows.getElementFromAvailableSection('FactSet', 'All Curves Shift down 350 bps').click().then(function() { }, function(error) {

            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
        } else {
          expect(false).customError('"All Curves Shift down 350 bps" is not present in "Available" container');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "All Curves Shift down 350 bps" selected under "Factset" tree from "Available" section
      expect(TileOptionsScenariosAndCashFlows.getElementFromAvailableSection('FactSet', 'All Curves Shift down 350 bps').getAttribute('data-selected')).not.toBeUndefined();
    });

    it('Should click on right arrow button present in "Tile Options" view mode', function() {
      TileOptionsScenariosAndCashFlows.getButton('rightarrow').click().then(function() { }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select the "Horizons Then Scenarios" radio button from Report Layout section', function() {
      TileOptionsScenariosAndCashFlows.getReportLayoutRadioButton('Scenario Analysis', 'Horizons Then Scenarios').click().then(function() { }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "All Curves Shift down 350 bps" is present in "Selected" container', function() {
      TileOptionsScenariosAndCashFlows.getEleFromSelectedList('FactSet:All Curves Shift down 350 bps').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('Error: "All Curves Shift down 350 bps" is not present in "Selected" container');
        }
      });
    });
  });

  describe('Test Step ID: 409219', function() {

    var arrHorizons = [];

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Valuation');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Valuation');

    it('Collect all horizons names from "Multi header" from calculated', function() {
      PA3MainPage.getAllMultiHeaderColumns('Valuation').each(function(element) {
        Utilities.scrollElementToVisibility(element);
        element.getText().then(function(text) {
          arrHorizons.push(text);
        });
      });
    });

    it('Verifying if 4th column in each horizon labeled "All Curves Shift down 350bps"', function() {
      PA3MainPage.getAllColumnOfCalculatedReport('Valuation').each(function(element, index) {
        Utilities.scrollElementToVisibility(element);
        element.getText().then(function(text) {
          if (index % 4 === 0 && index > 0) {
            expect(text.indexOf('All Curves Shift down 350 bps') >= 0).customError('"All Curves Shift down 350 bps" is not labeled in 4th column in each horizon');
          }
        });
      });
    });
  });

  describe('Test Step ID: 409220', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Valuation', 'Scenarios and Cash Flows');

    it('Hover over on "FactSet:All Curves Shift down 350 bps" in "Selected" section and remove it' + ' by clicking the "X"', function() {
      // hovering over "FactSet:All Curves Shift down 350 bps"
      browser.actions().mouseMove(TileOptionsScenariosAndCashFlows.getEleFromSelectedList('FactSet:All Curves Shift down 350 bps')).perform();

      // Removing "FactSet:All Curves Shift down 350 bps" it by clicking on "x" in "Selected" section
      TileOptionsScenariosAndCashFlows.getOptionsDeleteIcon('FactSet:All Curves Shift down 350 bps').click();
    });

    it('Verifying if "All curves Shift down 350 bps" scenario is removed from "Selected" section', function() {
      TileOptionsScenariosAndCashFlows.getEleFromSelectedList('FactSet:All Curves Shift down 350 bps').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('Error: "All Curves Shift down 350 bps" is present in "Selected" container');
        }
      });
    });
  });

  describe('Test Step Id: 409228', function() {

    var addHorizonInHorizonMonthsBox = function(number) {
      it('Should enter "' + number + '" in "Horizon Months" input field', function() {
        ThiefHelpers.isPresent('Textbox', 'Horizon Months:').then(function(present) {
          if (present) {
            ThiefHelpers.getTextBoxClassReference('Horizon Months:').setText(number);
          } else {
            expect(false).customError('"Horizon months" Inputfield is not present on the webpage.');
            CommonFunctions.takeScreenShot();
          }
        });

        // Verifying if horizon is entered in input field of "Horizon Months" box
        ThiefHelpers.getTextBoxClassReference('Horizon Months:').getText().then(function(value) {
          if (value !== number) {
            expect(false).customError('Horizon entered in "Horizon Months:" input field is expected to be "' + number + '" but Found: "' + value + '".');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Should click on "Horizon Months" Add button', function() {
        TileOptionsScenariosAndCashFlows.getHorizonMonthsAddbtn().click().then(function() { }, function(error) {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });

      it('Verifying if the "Horizon Months:" listbox contains the Horizon "' + number + '"', function() {
        ThiefHelpers.getListBoxItem(TileOptionsScenariosAndCashFlows.xpathHorizonListBox, number, undefined).getText().then(function(text) {
          if (text !== number) {
            expect(false).customError('The "Horizon Months:" listbox does not display the horizon "' + number + '" but displayed ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    };

    addHorizonInHorizonMonthsBox('9');
    addHorizonInHorizonMonthsBox('3');

    it('Should remove the horizon "9" from "Horizon Months:" listbox', function() {
      ThiefHelpers.getListBoxItem(TileOptionsScenariosAndCashFlows.xpathHorizonListBox, '9').getActions().then(function(actions) {
        actions.triggerAction('remove');
      });
    });

    it('Verifying if the "Horizon Months:" listbox does not display the horizon "9"', function() {
      ThiefHelpers.getListBoxItem(TileOptionsScenariosAndCashFlows.xpathHorizonListBox, '9', undefined).getText().then(function(text) {
        if (text === '9') {
          expect(false).customError('The "Horizon Months:" listbox displays the Horizon "9"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(true).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 585928', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Valuation');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Valuation');

    it('Verifying if "All Curves Shift down 350 bps" is not present', function() {
      PA3MainPage.getAllColumnOfCalculatedReport('Valuation').each(function(element, index) {
        Utilities.scrollElementToVisibility(element);
        element.getText().then(function(text) {
          if (index > 0) {
            expect(text).not.toEqual('All Curves Shift down 350 bps');
          }
        });
      });
    });

    it('Verifying if Horizon are in "Column Header" container', function() {
      PA3MainPage.getAllMultiHeaderColumns('Valuation').each(function(element, index) {
        Utilities.scrollElementToVisibility(element);
        element.getText().then(function(text) {
          if (index === 2) {
            expect(text).toContain('3 Months');
          } else if (index === 3) {
            expect(text).toContain('6 Months');
          }
        });
      });
    });
  });

  describe('Test Step ID: 409858', function() {

    var arrOptions = [];

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Valuation', 'Scenarios and Cash Flows');

    it('Should click on "X" above the selected box to remove all scenarios', function() {
      TileOptionsScenariosAndCashFlows.getButton('close').click().then(function() { }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      TileOptionsScenariosAndCashFlows.getAllElementsFromSelected().each(function(element) {
        expect(element).toBeNull();
      });
    });

    it('Should type "all curves shift down" in search box', function() {
      TileOptionsScenariosAndCashFlows.getInputField('available').isPresent().then(function(found) {
        if (found) {
          TileOptionsScenariosAndCashFlows.getInputField('available').sendKeys(protractor.Key.HOME, protractor.Key.SHIFT, protractor.Key.END, protractor.Key.NULL, protractor.Key.DELETE, 'all curves shift down');
        } else {
          expect(false).customError(' Input field "available" is not present on the webpage');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if "all curves shift down" is entered in search box
      expect(TileOptionsScenariosAndCashFlows.getInputField('available').getAttribute('value')).toEqual('all curves shift down');
    });

    it('Should select the first 10 options', function() {
      // Hold CONTROL key
      browser.actions().keyDown(protractor.Key.CONTROL).perform();

      // Selecting the Item from 'available' section
      TileOptionsScenariosAndCashFlows.getAllElementsFromAvailableAfterSearch().each(function(element, index) {
        if (index < 10) {
          element.click();
          element.getText().then(function(text) {
            arrOptions.push(text);
          });
        }
      });
      browser.actions().keyUp(protractor.Key.CONTROL).perform();
    });

    it('Should click on right arrow', function() {
      TileOptionsScenariosAndCashFlows.getButton('rightarrow').click().then(function() { }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    arrOptions.forEach(function(element, index) {
      it('Verifying if "' + element + '"options is present in selected section', function() {
        TileOptionsScenariosAndCashFlows.getAllElementsFromSelected().get(index).getText().then(function(text) {
          expect(text.indexOf(element) >= 0).customError('"' + element + '" option is not present in selected section');
        });
      });
    });
  });

  describe('Test Step ID: 409859', function() {

    var arrColumns = [];

    var arrDeleteOptions = ['FactSet:2016 S&P All Curves Shift down 101 bps', 'FactSet:2016 S&P All Curves Shift down 126 bps', 'FactSet:2016 S&P All Curves Shift down 152 bps', 'FactSet:2016 S&P All Curves Shift down 202 bps', 'FactSet:2016 S&P All Curves Shift down 50 bps'];

    arrDeleteOptions.forEach(function(element) {
      it('Hover over on "' + element + '" in selected box and remove it' + ' by clicking the "X"', function() {
        // hovering over options
        browser.actions().mouseMove(TileOptionsScenariosAndCashFlows.getEleFromSelectedList(element)).perform();

        // Removing options it by clicking on "x" from selected section
        TileOptionsScenariosAndCashFlows.getOptionsDeleteIcon(element).click();

        // verifying if option is removed from selected section
        TileOptionsScenariosAndCashFlows.getEleFromSelectedList(element).isPresent().then(function(found) {
          if (found) {
            expect(false).customError('Error: Failed to remove ' + element + ' from the selected section');
          }
        });
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Valuation');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Valuation');

    it('Verifying if Horizon are in "Column Header" container', function() {
      PA3MainPage.getAllColumnOfCalculatedReport('Valuation').each(function(element, index) {
        Utilities.scrollElementToVisibility(element);
        element.getText().then(function(text) {
          if (index > 0) {
            arrColumns.push(text);
          }
        });
      });
    });

    it('Verifying if removed scenario are not shown', function() {
      arrColumns.forEach(function(text) {
        arrDeleteOptions.forEach(function(deletedoptions) {
          expect(text.indexOf(deletedoptions) < 0).customError('Error: "' + deletedoptions + '" scenarios is not removed');
        });
      });
    });

    it('Should close PA3 application', function() {
      expect(true).toBeTruthy();
    });
  });
});
