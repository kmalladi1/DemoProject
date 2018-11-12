'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: acct-toggle-options', function() {

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Available');

  describe('Test Step ID: 557409', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch PA3 application with "Client:;Pa3;Accounts;MPT_DOC" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('mpt-doc');
    });

    it('Verifying if "MPT_DOC" document is opened without any issues', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(found) {
        if (!found) {
          expect(false).customError('"Weights" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Weights" report is displayed with date as "31-DEC-2014"', function() {
      PA3MainPage.getDateHyperLink('Weights').getText().then(function(value) {
        if (value !== '31-DEC-2014') {
          expect(false).customError('"Weights" report is not displayed with date as "31-DEC-2014".');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();

      });
    });

    it('Verifying if "Weights" report is grouped by "Asset Type"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(value) {
        if (value !== 'Asset Type') {
          expect(false).customError('"Weights" report is not grouped by "Asset Type"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();

      });
    });

  });

  describe('Test Step ID: 557412', function() {

    it('Should click on the "Wrench" button on the application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down menu appear.
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('Wrench icon dropdown is not present.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Document Options" from drop down in aplication tool bar', function() {
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click();
    });

    it('Should verify "Documents Options" page is opened', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(option) {
        if (!option) {
          expect(false).customError('"Documents options" mode is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Prices > Portfolio" from LHP', function() {
      DocumentOptions.getLHPOption('Portfolio').click();

      // Verifying if Portfolio is selected
      DocumentOptions.getLHPOption('Portfolio').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') === -1) {
          expect(false).customError('"Prices > Portfolio" is not selected');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "SP50_ACCT" from the toggle account drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('SP50_ACCT', undefined, DocumentOptionsPricesPortfolio.xpathToggleAccountDropDown);
    });

    it('Verifying if "SP50_ACCT" is selected from the toggle account dropdown', function() {
      ThiefHelpers.verifySelectedDropDownText('SP50_ACCT', undefined, DocumentOptionsPricesPortfolio.xpathToggleAccountDropDown);
    });

    it('Verifying if "Defaults Applied" button is displayed', function() {
      DocumentOptions.getDefaultsApplied().isDisplayed().then(function(isFound) {
        if (!isFound) {
          expect(false).customError('"Defaults Applied" button is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 557415', function() {

    it('Should click "X" icon next to Prices Selected from the Prices -  Portfolio section', function() {
      ThiefHelpers.getButtonClassReference(undefined, DocumentOptionsPricesPortfolio.getButtonFromSelectedSection('prices',
        'remove')).press();

      // Verifying that all items are removed from the 'Selected' container
      DocumentOptionsPricesPortfolio.getAllListElements('Prices', 'Selected').count().then(function(count) {
        if (count !== 0) {
          expect(false).customError('All items are not removed from the "Selected" container');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Toggle Account" dropdown is disabled', function() {
      ThiefHelpers.getButtonClassReference(undefined, DocumentOptionsPricesPortfolio.xpathToggleAccoountButton).isDisabled().then(function(status) {
        if (!status) {
          expect(false).customError('"Toggle Account" button is enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Restore Defaults" button is displayed', function() {
      DocumentOptions.getRestoreDefaultsButton().isDisplayed().then(function(isFound) {
        if (!isFound) {
          expect(false).customError('"Restore Defaults" button is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 557418', function() {

    it('Should click on Cancel button in the Document Options dialog', function() {
      ThiefHelpers.getButtonClassReference('Cancel').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Document Options" mode is closed', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(value) {
        if (value) {
          expect(false).customError('Document Options mode is not Closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Wrench" button on the application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down menu appear.
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('Wrench icon dropdown is not present.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Document Options" from drop down in aplication tool bar', function() {
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click();
    });

    it('Should verify "Documents Options" page is opened', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(option) {
        if (!option) {
          expect(false).customError('"Documents options" mode is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Toggle Account" dropdown is enabled', function() {
      ThiefHelpers.getButtonClassReference(undefined, DocumentOptionsPricesPortfolio.xpathToggleAccoountButton).isDisabled().then(function(status) {
        if (status) {
          expect(false).customError('"Toggle Account" button is not enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "MULTISTRAT_DEMO_ACCT" is selected from the toggle account dropdown', function() {
      ThiefHelpers.verifySelectedDropDownText('MULTISTRAT_DEMO_ACCT', undefined,
        DocumentOptionsPricesPortfolio.xpathToggleAccountDropDown);
    });

    it('Verifying if "Defaults Applied" button is displayed', function() {
      DocumentOptions.getDefaultsApplied().isDisplayed().then(function(isFound) {
        if (!isFound) {
          expect(false).customError('"Defaults Applied" button is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 557433', function() {

    it('Should click on cancel button in the Document Options dialog', function() {
      ThiefHelpers.getButtonClassReference('Cancel').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Document Options" mode is closed', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(value) {
        if (value) {
          expect(false).customError('Document Options mode is not Closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Weights" report is calculated without any issues', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(found) {
        if (!found) {
          expect(false).customError('"Weights" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the Wrench icon in the "Weights" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function() {

        expect(false).customError('Not able to  click on the "Wrench icon" in the "Weights" report workspace');
        CommonFunctions.takeScreenShot();
      });

      //Verifying wrench menu list is displayed in "Weights" report workspace'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Wrench menu drop down list is not displayed in "Weights" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from menu drop down of "Weights" report workspace ', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function() {

        expect(false).customError(' Not able to select "Options" option from "menu dropdown" of ' +
          '"Weights" report workspace');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on the "Exclusions" on the LHP of tile options', function() {
      TileOptions.getLHPOption('Exclusions').click().then(function() {
      }, function() {

        expect(false).customError('"Exclusions tab" is not clicked on LHP in tile options');
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Exclusions"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Exclusions') {
          expect(false).customError('Exclusions is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "SP50_ACCT" from the toggle account drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('SP50_ACCT', undefined, DocumentOptionsPricesPortfolio.xpathToggleAccountDropDown);
    });

    it('Verifying if "SP50_ACCT" is selected from the toggle account dropdown', function() {
      ThiefHelpers.verifySelectedDropDownText('SP50_ACCT', undefined, DocumentOptionsPricesPortfolio.xpathToggleAccountDropDown);
    });

    it('Verifying if "Defaults Applied" button is displayed', function() {
      TileOptions.getDefaultsApplied().isDisplayed().then(function(isFound) {
        if (!isFound) {
          expect(false).customError('"Defaults Applied" button is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "[Unassigned] > 3M Company 1.375% 07-AUG-2018" is added to Selected section', function() {
      var myArray = [];
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Currency');
      var children = group.getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('[Unassigned] > 3M Company 1.375% 07-AUG-2018') === -1) {
          expect(false).customError('"[Unassigned] > 3M Company 1.375% 07-AUG-2018" is not added to the selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 557437', function() {

    it('Should expand "Corporate" from the Available Exclusions and click "3i Group Plc 5.75% 03-dec-2032" from the available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Corporate');
      group.expand();

      // Verifying if "Corporate" is expanding
      group.isExpanded().then(function(expanded) {
        if (expanded) {

          if (expanded) {
            group.getItemByText('3i Group Plc 5.75% 03-dec-2032').then(function(element) {
              element.select();

              element.isSelected().then(function(selected) {
                if (!selected) {
                  expect(false).customError('"3i Group Plc 5.75% 03-dec-2032" is not selected');
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          } else {
            expect(false).customError('"Corporate" group was not expanded.');
            CommonFunctions.takeScreenShot();
          }
        }

      });
    });

    it('Should click "Right" arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying if "3i Group Plc 5.75% 03-dec-2032" is added to Selected section', function() {
      var myArray = [];
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Asset Type');
      var children = group.getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Corporate > 3i Group Plc 5.75% 03-dec-2032') === -1) {
          expect(false).customError('"Corporate > 3i Group Plc 5.75% 03-dec-2032" is not added to selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Toggle Account" dropdown is disabled', function() {
      ThiefHelpers.getButtonClassReference(undefined, DocumentOptionsPricesPortfolio.xpathToggleAccoountButton).isDisabled().then(function(status) {
        if (!status) {
          expect(false).customError('"Toggle Account" button is enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Restore Defaults" button is displayed', function() {
      TileOptions.getRestoreDefaultsButton().isDisplayed().then(function(isFound) {
        if (!isFound) {
          expect(false).customError('"Restore Defaults" button is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 557438', function() {

    it('Should click "Restore Defaults" button', function() {
      TileOptions.getRestoreDefaultsButton().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'OK');

    it('Verifying if "Toggle Account" dropdown is enabled', function() {
      ThiefHelpers.getButtonClassReference(undefined, DocumentOptionsPricesPortfolio.xpathToggleAccoountButton).isDisabled().then(function(status) {
        if (status) {
          expect(false).customError('"Toggle Account" button is not enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Defaults Applied" button is displayed', function() {
      TileOptions.getDefaultsApplied().isDisplayed().then(function(isFound) {
        if (!isFound) {
          expect(false).customError('"Defaults Applied" button is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "[Unassigned] > 3M Company 1.375% 07-AUG-2018" is the only exclusion displayed in Selected Section', function() {
      var myArray = [];
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Currency');
      var children = group.getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.length === 1) {
          if (myArray.indexOf('[Unassigned] > 3M Company 1.375% 07-AUG-2018') === -1) {
            expect(false).customError('"[Unassigned] > 3M Company 1.375% 07-AUG-2018" is not displayed in the selected section');
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });

  });

});
