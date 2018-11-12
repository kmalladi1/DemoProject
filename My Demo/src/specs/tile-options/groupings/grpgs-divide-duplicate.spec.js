'use strict';

require(__dirname + '/../../../index.js');

describe('grpgs-divide-duplicate', function() {

  describe('Test Step ID: 699218', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with document client:/default_doc_auto.', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });

    it('Verifying that "Portfolio" widget displays "CLIENT:/PA3/TEST.ACCT"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, '//*[@data-qa-id="application-header-lookup-sect' +
        'ion"]//*[@tab="portfolio"]//tf-textbox').getText().then(function(portfolio) {
        if (portfolio !== 'CLIENT:/PA3/TEST.ACCT') {
          expect(false).customError('"Portfolio" widget should display "CLIENT:/PA3/TEST.ACCT"" instead displayed' + portfolio);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Benchmark" widget displays "RUSSELL:1000"', function() {
      expect(PA3MainPage.getWidgetBox('Benchmark').getAttribute('value')).toEqual('RUSSELL:1000');
      ThiefHelpers.getTextBoxClassReference(undefined, '//*[@data-qa-id="application-header-lookup-se' +
        'ction"]//*[@tab="benchmark"]//tf-textbox').getText().then(function(benchmark) {
        if (benchmark !== 'RUSSELL:1000') {
          expect(false).customError('"Benchmark" widget should display "RUSSELL:1000"" instead displayed' + benchmark);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 699223', function() {

    it('Should click on the "Economic Sector" on the Weights report workspace', function() {
      // Clicking Economic Sector hyper link in weights report
      PA3MainPage.getGroupingsHyperLink('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Weights') {
          expect(false).customError('"Tile Options - Weights" view has not appeared. ' +
            'Expected: "Tile Options - Weights" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Groupings" options from LHP', function() {
      TileOptions.getLHPOption('Groupings').click();

      // Checking if 'Groupings' item is opened.
      TileOptions.getOptionTitle().getText().then(function(text) {
        expect(text.indexOf('Groupings') >= 0).customError('Error: "Groupings" pane is not selected');
      });
    });

    it('Should click on COG wheel next to Industry-FactSet', function() {
      var element = TileOptionsGroupings.getElementFromSelectedContainer('Industry - FactSet');

      ThiefHelpers.getActionsClassReference(element).triggerAction('configure').then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Divide" radio button', function() {
      ThiefHelpers.getRadioClassReference('Divide').select();

      // Verifying if the "Divide" radio button is selected
      ThiefHelpers.getRadioClassReference('Divide').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Divide" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on OK on the pop up', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsGroupings.xpathOKOrCancelButtonFromDropDown, 'OK');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button from drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    // After selecting divide radio button, Industry - FactSet will change to Divide by Industry - FactSet
    it('Verify if "Divide by Industry - FactSet" is present in the selected section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Divide by Industry - FactSet').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Divide by Industry - FactSet" is not present in the Selected container');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Expanding the tree from 'Available' container
    it('Should expand the tree from "Available" container for "Sector & Industry|Factset"', function() {
      TileOptionsGroupings.expandElementTree('FactSet|Sector & Industry|FactSet', 'FactSet');

      // Verifying if the tree is expanded through 'Sector&Industry|Factset'
      TileOptionsGroupings.checkIfExpanded('FactSet|Sector & Industry|FactSet', 'FactSet');
    });

    it('Should drag "Industry" from "Sector & Industry|FactSet" and drop over "Airlines" in Selected section', function() {
      var src = TileOptionsGroupings.getElementFromAvailableSection('FactSet|Sector & Industry|FactSet', 'Industry');
      var dest = TileOptionsGroupings.getElementFromSelectedContainer('Airlines');

      browser.actions().mouseMove(src).mouseDown().mouseMove(dest).perform();
      browser.actions().mouseMove({x: 0, y: 5}).perform();
      browser.actions().mouseUp().perform();
    });

    it('Verifying if "Industry-FactSet" is present under "Divide by Industry - FactSet > Airlines" directory', function() {
      TileOptionsGroupings.getElementFromSelectedSection('Divide by Industry - FactSet|Airlines', 'Industry - FactSet').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Industry - FactSet" is not present under "Divide by Industry - FactSet ' +
            '> Airlines" directory');
          CommonFunctions.takeScreenShot();
        }

      });
    });
  });

  describe('Test Step ID: 699229', function() {

    it('Should click on COG wheel next to "Industry - FactSet"', function() {
      var element = TileOptionsGroupings.getElementFromSelectedContainer('Industry - FactSet');

      ThiefHelpers.getActionsClassReference(element).triggerAction('configure').then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Divide" radio button', function() {
      ThiefHelpers.getRadioClassReference('Divide').select();

      // Verifying if the "Divide" radio button is selected
      ThiefHelpers.getRadioClassReference('Divide').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Divide" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on OK on the pop up', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsGroupings.xpathOKOrCancelButtonFromDropDown, 'OK');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button from drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    // After selecting divide radio button, Industry - FactSet will change to Divide by Industry - FactSet
    it('Verifying if "Divide by Industry-FactSet" is present under "Divide by Industry - FactSet > Airlines" directory', function() {
      TileOptionsGroupings.getElementFromSelectedSection('Divide by Industry - FactSet|Airlines', 'Divide by Indus' +
        'try - FactSet').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Divide by Industry-FactSet" is not present under "Divide by Industry - FactSet ' +
            '> Airlines" directory');
          CommonFunctions.takeScreenShot();
        }

      });

    });

  });

  describe('Test Step ID: 699232', function() {

    it('Should drag "Currency" from "FactSet" and drop over "Aerospace & Defense" under second "Divide by ' +
      'Industry - FactSet"in Selected section', function() {
      var src = TileOptionsGroupings.getElementFromAvailableSection('FactSet', 'Currency');
      var dest = TileOptionsGroupings.getElementFromSelectedSection('Divide by Industry - FactSet|Airlines|Divide by Industry ' +
        '- FactSet', 'Aerospace & Defense');

      browser.actions().mouseMove(src).mouseDown().mouseMove(dest).perform();
      browser.actions().mouseMove({x: 0, y: 5}).perform();
      browser.actions().mouseUp().perform();
    });

    it('Verifying if "Currency" is present under second "Divide by Industry - FactSet > Aerospace & Defense" directory', function() {
      TileOptionsGroupings.getElementFromSelectedSection('Divide by Industry - FactSet|Airlines|Divide by Industry ' +
        '- FactSet|Aerospace & Defense', 'Currency').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Currency" is not present under second "Divide by Industry - FactSet > Aerospace & Defense" directory');
          CommonFunctions.takeScreenShot();
        }

      });
    });

  });

  describe('Test Step ID: 712703', function() {

    it('Should click on "Clear All/X" icon from the  selected section', function() {
      ThiefHelpers.getButtonClassReference('Clear All').press();
    });

    it('Should double click on "Currency" in "Available" section', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('FactSet', 'Currency'))
        .perform();
    });

    it('Verifying if "Currency" is added to the "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Currency').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Currency" is not added to the "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on COG wheel next to Currency', function() {
      var element = TileOptionsGroupings.getElementFromSelectedContainer('Currency');

      ThiefHelpers.getActionsClassReference(element).triggerAction('configure').then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Divide" radio button', function() {
      ThiefHelpers.getRadioClassReference('Divide').select();

      // Verifying if the "Divide" radio button is selected
      ThiefHelpers.getRadioClassReference('Divide').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Divide" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on OK on the pop up', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsGroupings.xpathOKOrCancelButtonFromDropDown, 'OK');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button from drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    // After selecting divide radio button, Currency will change to Divide by Currency
    it('Verify if "Divide by Currency" is present in the selected section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Divide by Currency').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Divide by Currency" is not present in the Selected container');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should drag "Industry" from "Sector & Industry|FactSet" and drop over " U.S. Dollar " in Selected section', function() {
      var src = TileOptionsGroupings.getElementFromAvailableSection('FactSet|Sector & Industry|FactSet', 'Industry');
      var dest = TileOptionsGroupings.getElementFromSelectedContainer('U.S. Dollar');

      browser.actions().mouseMove(src).mouseDown().mouseMove(dest).perform();
      browser.actions().mouseMove({x: 0, y: 5}).perform();
      browser.actions().mouseUp().perform();
    });

    it('Verifying if "Industry - FactSet" is present under "Divide by Currency > U.S. Dollar" directory', function() {
      TileOptionsGroupings.getElementFromSelectedSection('Divide by Currency|U.S. Dollar', 'Industry - FactSet').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Industry - FactSet" is not present under "Divide by Currency ' +
            '> U.S. Dollar" directory');
          CommonFunctions.takeScreenShot();
        }

      });
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {
        expect(false).customError('Can not able to click on OK button due to ' + err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Error found while calculating the "Weights" report' + error);
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" popup was appeared');
        }
      });
    });

    it('Should open Wrench menu in the Application tool bar', function() {
      PA3MainPage.getWrenchIcon().click();

      // Verifying if Wrench menu is opened.
      expect(PA3MainPage.getWrenchIcon(true).isPresent()).toBeTruthy();
    });

    it('Should select "Grouping Overrides" from Wrench menu to open "Grouping Manager" dialog', function() {
      PA3MainPage.getOptionFromWrenchMenu('Grouping Overrides').click();

      // Verify that "Grouping Manager" view appear.
      ThiefHelpers.isDialogOpen('Grouping Manager');
    });

    it('Verify "Reports > Weights > Weights" is displayed on reports drop down', function() {
      var xpath = GroupingManager.xpathReportDropdown;
      ThiefHelpers.getDropDownSelectClassReference(undefined, xpath, true).getSelectedText().then(function(selectedText) {
        if (selectedText !== 'Reports > Weights > Weights') {
          expect(false).customError('Drop down option is not an expected one. Expected: "Reports > Weights > Weights", Found: ' + selectedText);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if "U.S. Dollar" is displayed below "Reports > Weights > Weights"', function() {
      GroupingManager.getElementFromSpecifiedLevel(1, 'U.S. Dollar').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"U.S. Dollar" is not displayed below "Reports > Weights > Weights"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
