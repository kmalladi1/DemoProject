'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: acct-toggle-general', function() {

  var arrAccounts = ['MULTISTRAT_DEMO_ACCT vs. MSCI USA', 'SP50_ACCT vs. Barclays US Aggregate','BOFA vs. BofA Merrill Lynch Global Broad Market Financial Index'];
  var arrValues = [];

  describe('Test Step ID: 557212', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch "MULTI_PORT_TOGGLE" document from "Client:/PA3/Accounts"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('multi-port-toggle');
    });

    it('Should wait for report to calculate', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(true).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Weights" report is grouped by date "31-DEC-2014"', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(value) {
        if (value !== '31-DEC-2014') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Report was not grouped by date "31-DEC-2014"');
        }
      });
    });

    it('Verifying if "Weights" report is grouped by "Asset Type" grouping', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(value) {
        if (value !== 'Asset Type') {
          expect(false).customError('"Asset Type" grouping is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();

      });
    });

  });

  describe('Test Step ID: 557217', function() {

    it('Should click on the "Wrench" button on the application toolbar', function() {
      PA3MainPage.selectWrenchIcon();

      // Verifying if drop down menu appear.
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('Wrench icon dropdown is not present.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Document Options" from drop down in aplication tool bar', function() {
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if view is changed to "Document Options" mode
      DocumentOptions.isDocumentOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('View did not change to "Document Options" mode.');
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

  describe('Test Step ID: 557471', function() {

    it('Should click on "Toggle Account" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsPricesPortfolio.xpathToggleAccountDropDown).open().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    var dropdownList = ['MULTISTRAT_DEMO_ACCT', 'SP50_ACCT', 'BOFA']; var flag = 0;
    dropdownList.forEach(function(option, index) {
      it('Verifying that "' + option + '" option is displayed in Toggle account drop down', function() {
        ThiefHelpers.getAllOptionsFromDropdown().then(function(array) {
          if (option !== array[index]) {
            flag = flag + 1;
            expect(false).customError(option + ' is not present in the Account Toggle drop down; Found: ' + array[index]);
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

  });

  describe('Test Step ID: 557215', function() {

    it('Should select "Cancel" button from "Document - Options" View', function() {
      DocumentOptions.getHeaderButton('Cancel').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Portfolio" hamburger icon', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.getHamburgerIcon('Portfolio')).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Account Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(found) {
        if (!found) {
          expect(false).customError('"Portfolio" Hamburger icon is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should uncheck "Use Multiple Portfolios" check box', function() {
      var xpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xptahCheckboxFromAccountsDropdown, 'Use Multiple Portfolios');

      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).uncheck();

      // Verifying that "Use Multiple Portfolios" check box is checked
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).isChecked().then(function(value) {
        if (value) {
          expect(false).customError('"Use Multiple Portfolios" checkbox is checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "OK" button from the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      expect(PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('Class')).not.toContain('active');
    });

    it('Should click on  "Wrench" button from application toolbar', function() {
      PA3MainPage.selectWrenchIcon();

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

      // Verifying if view is changed to "Document Options" mode
      DocumentOptions.isDocumentOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('View did not change to "Document Options" mode.');
          CommonFunctions.takeScreenShot();
        }
      });
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

    it('Verifying that "Accounts toggle" drop down is not displayed', function() {
      CommonFunctions.isDisplayed('Drop down', undefined, DocumentOptionsPricesPortfolio.xpathToggleAccountDropDown).then(function(found) {
        if (found) {
          expect(false).customError('"Accounts toggle" drop down is displayed on the screen');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 557216', function() {

    it('Should select "Cancel" button from "Document - Options" View', function() {
      DocumentOptions.getHeaderButton('Cancel').click().then(function() {
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

    it('Should click on "Portfolio" hamburger icon', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.getHamburgerIcon('Portfolio')).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Account Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(found) {
        if (!found) {
          expect(false).customError('"Portfolio" Hamburger icon is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check "Use Multiple Portfolios" check box', function() {
      var xpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xptahCheckboxFromAccountsDropdown, 'Use Multiple Portfolios');

      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).check();

      // Verifying that "Use Multiple Portfolios" check box is checked
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).isChecked().then(function(value) {
        if (!value) {
          expect(false).customError('"Use Multiple Portfolios" checkbox is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "OK" button from the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      expect(PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('Class')).not.toContain('active');
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      //Verifying weights reports calculated
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(true).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var flag = 0;
    arrAccounts.forEach(function(acctName) {
      it('Should verify that "Port. Ending Market Value" column for account "' + acctName + '"', function() {
        SlickGridFunctions.getCellReference('Weights', 'Total', '', 'Port. Ending Market Value', acctName).then(function(reference) {
          reference.getText().then(function(value) {
            if (value === '--' || value === null || value === '') {
              flag = flag + 1;
              expect(false).customError('Total row does not contain value for' + acctName + '", Found ' + value);
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

  });

  describe('Test Step ID: 557222', function() {

    arrAccounts.forEach(function(acctName) {
      it('Should note  "Port. Ending Market Value" column for account "' + acctName + '"', function() {
        SlickGridFunctions.getCellReference('Weights', 'Total', '', 'Port. Ending Market Value', acctName).then(function(reference) {
          reference.getText().then(function(value) {
            arrValues.push(value);
          });
        });
      });
    });

    it('Should click on the "Wrench" button on the application toolbar', function() {
      PA3MainPage.selectWrenchIcon();

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

      // Verifying if view is changed to "Document Options" mode
      DocumentOptions.isDocumentOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('View did not change to "Document Options" mode.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "MULTISTRAT_DEMO_ACCT" is selected from the toggle account dropdown', function() {
      ThiefHelpers.verifySelectedDropDownText('MULTISTRAT_DEMO_ACCT', undefined,
        DocumentOptionsPricesPortfolio.xpathToggleAccountDropDown);
    });

    it('Should select "BOFA" from the toggle account drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('BOFA', undefined, DocumentOptionsPricesPortfolio.xpathToggleAccountDropDown);
    });

    it('Verifying if "BOFA" is selected from the toggle account dropdown', function() {
      ThiefHelpers.verifySelectedDropDownText('BOFA', undefined, DocumentOptionsPricesPortfolio.xpathToggleAccountDropDown);
    });

    it('Verifying if "Defaults Applied" button is displayed after selecting "BOFA"', function() {
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

    it('Should select "SP50_ACCT" from the toggle account drop down ', function() {
      ThiefHelpers.selectOptionFromDropDown('SP50_ACCT', undefined, DocumentOptionsPricesPortfolio.xpathToggleAccountDropDown);
    });

    it('Verifying if "SP50_ACCT" is selected from the toggle account dropdown', function() {
      ThiefHelpers.verifySelectedDropDownText('SP50_ACCT', undefined, DocumentOptionsPricesPortfolio.xpathToggleAccountDropDown);
    });

    it('Verifying if "Defaults Applied" button is displayed after selecting "SP50_ACCT"', function() {
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

  describe('Test Step ID: 557223', function() {

    it('Should click on the "Prices > Benchmark" from LHP', function() {
      DocumentOptions.getLHPOption('Benchmark').click();

      // Verifying if Benchmark is selected
      DocumentOptions.getLHPOption('Benchmark').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') === -1) {
          expect(false).customError('"Prices > Benchmark" is not selected');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
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

  describe('Test Step ID: 557226', function() {

    it('Should click on the "Databases" from LHP', function() {
      DocumentOptions.getLHPOption('Databases').click();

      // Verifying if Databases is selected
      DocumentOptions.getLHPOption('Databases').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') === -1) {
          expect(false).customError('"Databases" is not selected');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "SP50_ACCT" is selected from the toggle account dropdown', function() {
      ThiefHelpers.verifySelectedDropDownText('SP50_ACCT', undefined, DocumentOptionsPricesPortfolio.xpathToggleAccountDropDown);
    });

    it('Verifying if "Restore Defaults" is disabled', function() {
      DocumentOptions.getRestoreDefaultsButton().getAttribute('class').then(function(value) {
        if (value.indexOf('disable') === -1) {
          expect(false).customError('"Restore Defaults" is not disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 557235', function() {

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

    it('Should select "MULTISTRAT_DEMO_ACCT" from the toggle account drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('MULTISTRAT_DEMO_ACCT', undefined, DocumentOptionsPricesPortfolio.xpathToggleAccountDropDown);
    });

    it('Verifying if "MULTISTRAT_DEMO_ACCT" is selected from the toggle account dropdown', function() {
      ThiefHelpers.verifySelectedDropDownText('MULTISTRAT_DEMO_ACCT', undefined, DocumentOptionsPricesPortfolio.xpathToggleAccountDropDown);
    });

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

    it('Verifying if "Restore Defaults" button is enabled', function() {
      ThiefHelpers.getButtonClassReference(undefined, DocumentOptions.getRestoreDefaultsButton()).isDisabled().then(function(status) {
        if (status) {
          expect(false).customError('"Restore Defaults" button is disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 557237', function() {

    it('Should click on the "Prices > Benchmark" from LHP', function() {
      DocumentOptions.getLHPOption('Benchmark').click();

      // Verifying if Benchmark is selected
      DocumentOptions.getLHPOption('Benchmark').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') === -1) {
          expect(false).customError('"Prices > Portfolio" is not selected');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "MULTISTRAT_DEMO_ACCT" is selected from the toggle account dropdown', function() {
      ThiefHelpers.verifySelectedDropDownText('MULTISTRAT_DEMO_ACCT', undefined, DocumentOptionsPricesPortfolio.xpathToggleAccountDropDown);
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

    it('Should select "OK" button from "Document - Options" View', function() {
      DocumentOptions.getHeaderButton('OK').click().then(function() {
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

    it('Should wait for report to calculate', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var flag = 0;
    arrAccounts.forEach(function(acctName) {
      it('Should verify that "Port. Ending Market Value" column for account "' + acctName + '"', function() {
        SlickGridFunctions.getCellReference('Weights', 'Total', '', 'Port. Ending Market Value', acctName).then(function(reference) {
          reference.getText().then(function(value) {
            if (value !== '--') {
              flag = flag + 1;
              expect(false).customError('Total row does not contain "--" value for' + acctName + '", Found ' + value);
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

  });

  describe('Test Step ID: 557243', function() {

    it('Should click on the "Wrench" button on the application toolbar', function() {
      PA3MainPage.selectWrenchIcon();

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

      // Verifying if view is changed to "Document Options" mode
      DocumentOptions.isDocumentOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('View did not change to "Document Options" mode.');
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

    it('Should click "Restore Defaults" button', function() {
      TileOptions.getRestoreDefaultsButton().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'OK');

    var arrElements = ['FactSet - Options', 'FactSet - Futures', 'FactSet - Equity'];
    arrElements.forEach(function(ele) {
      it('Verifying that "' + ele + '" is shown in the "Selected" container of "PRICES" section', function() {
        ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, ele).getText()
          .then(function(text) {
            if (text !== ele) {
              expect(false).customError('"' + ele + '" is not shown in the "Selected" container of "PRICES" section;Found: ' + text);
              CommonFunctions.takeScreenShot();
            }
          }, function(err) {

            if (err.toString().indexOf('No direct child') > 0) {
              expect(false).customError('"' + ele + '" is not found in the "Selected" container of "PRICES" section');
              CommonFunctions.takeScreenShot();
            } else {
              expect(false).customError(err);
              CommonFunctions.takeScreenShot();
            }
          });
      });
    });
  });

  describe('Test Step ID: 557472', function() {

    it('Should select "OK" button from "Document - Options" View', function() {
      DocumentOptions.getHeaderButton('OK').click().then(function() {
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

    var flag = 0;
    arrAccounts.forEach(function(acctName, index) {
      it('Should verify that "Port. Ending Market Value" column for account "' + acctName + '"', function() {
        SlickGridFunctions.getCellReference('Weights', 'Total', '', 'Port. Ending Market Value', acctName).then(function(reference) {
          reference.getText().then(function(value) {
            if (value !== arrValues[index]) {
              flag = flag + 1;
              expect(false).customError('Total row value is differ from previous value[' + arrValues[index] + '], Found ' + value);
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

  });

  describe('Test Step ID: 557246', function() {

    it('Should click on the "Wrench" button on the application toolbar', function() {
      PA3MainPage.selectWrenchIcon();

      // Verifying if drop down menu appear.
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('Wrench icon dropdown is not present.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Document Options" from drop down in aplication tool bar', function() {
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if view is changed to "Document Options" mode
      DocumentOptions.isDocumentOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('View did not change to "Document Options" mode.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Prices > Portfolio" from LHP', function() {
      DocumentOptions.getLHPOption('Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

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

    it('Verifying if "MULTISTRAT_DEMO_ACCT" is selected from the toggle account dropdown', function() {
      ThiefHelpers.verifySelectedDropDownText('MULTISTRAT_DEMO_ACCT', undefined, DocumentOptionsPricesPortfolio.xpathToggleAccountDropDown);
    });

    it('Should select "SP50_ACCT" from the toggle account drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('SP50_ACCT', undefined, DocumentOptionsPricesPortfolio.xpathToggleAccountDropDown);
    });

    it('Verifying if "SP50_ACCT" is selected from the toggle account dropdown', function() {
      ThiefHelpers.verifySelectedDropDownText('SP50_ACCT', undefined, DocumentOptionsPricesPortfolio.xpathToggleAccountDropDown);
    });

    it('Should expand and select "FactSet - Equity - Bid" element from "Equity -> FactSet"', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer,
        'FactSet - Equity - Bid', 'Equity|FactSet').select();
    });

    it('Verifying if "FactSet - Equity - Bid" is selected or not', function() {
      ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer,
        'FactSet - Equity - Bid', 'Equity|FactSet').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('The element "FactSet - Equity - Bid" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Right" arrow icon', function() {
      ThiefHelpers.sendElementToSelectedSection(DocumentOptionsPricesPortfolio.getArrowButton('prices'));
    });

    it('Verifying if "FactSet - Equity - Bid" is added to "Prices Selected Section"', function() {
      ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'FactSet - Equity - Bid')
        .getText().then(function(text) {
        if (text !== 'FactSet - Equity - Bid') {
          expect(false).customError('"FactSet - Equity - Bid" is not shown in the "Selected" container of "PRICES" ' +
            'section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"FactSet - Equity - Bid" is not found in the "Selected" container of "PRICES" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
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

    it('Verifying if "Restore Defaults" button is enabled', function() {
      DocumentOptions.getRestoreDefaultsButton().getAttribute('class').then(function(value) {
        if (value.indexOf('disable') >= 0) {
          expect(false).customError('"Restore Defaults" is  disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 557248', function() {

    it('Should select "OK" button from "Document - Options" View', function() {
      DocumentOptions.getHeaderButton('OK').click().then(function() {
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

    it('Should wait for report to calculate', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(value) {
          if (!value) {
            expect(false).customError('Calculated data for "Weights" report appeared with errors.');
            CommonFunctions.takeScreenShot();
          }
        },

        function(err) {
          if (err.name === 'StaleElementReferenceError') {
            expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });

      //Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Portfolio" hamburger icon', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.getHamburgerIcon('Portfolio')).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Account Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(found) {
        if (!found) {
          expect(false).customError('"Portfolio" Hamburger icon is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "SP50_ACCT" option in the menu', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'SP50_ACCT').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying that "SP50_ACCT" option is selected in the menu
      PA3MainPage.getSingleAccountFromList('Portfolio', 'SP50_ACCT').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') === -1) {
          expect(false).customError('"SP50_ACCT" option is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the OK button', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for the "Weights" report to calculate', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Weights'), 180000).then(function(value) {
        if (!value) {
          expect(false).customError('Error while calculating the "Weights" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(value) {
          if (!value) {
            expect(false).customError('Calculated data for "Weights" report appeared with errors.');
            CommonFunctions.takeScreenShot();
          }
        },

        function(err) {
          if (err.name === 'StaleElementReferenceError') {
            expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });

      //Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Wrench" button on the application toolbar', function() {
      PA3MainPage.selectWrenchIcon();

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

      // Verifying if view is changed to "Document Options" mode
      DocumentOptions.isDocumentOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('View did not change to "Document Options" mode.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "SP50_ACCT" is displayed in toggle account dropdown', function() {
      ThiefHelpers.verifySelectedDropDownText('SP50_ACCT', undefined, DocumentOptionsPricesPortfolio.xpathToggleAccountDropDown);
    });

    it('Verifying if "Toggle Account" dropdown is disabled', function() {
      ThiefHelpers.getButtonClassReference(undefined, DocumentOptionsPricesPortfolio.xpathToggleAccoountButton).isDisabled().then(function(status) {
        if (!status) {
          expect(false).customError('"Toggle Account" button is enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Restore Defaults" button is enabled', function() {
      DocumentOptions.getRestoreDefaultsButton().getAttribute('class').then(function(value) {
        if (value.indexOf('disable') >= 0) {
          expect(false).customError('"Restore Defaults" is  disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 557252', function() {

    it('Should click "Restore Defaults" button', function() {
      TileOptions.getRestoreDefaultsButton().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'OK');

    it('Verifying if "SP50_ACCT" is displayed in toggle account dropdown', function() {
      ThiefHelpers.verifySelectedDropDownText('SP50_ACCT', undefined, DocumentOptionsPricesPortfolio.xpathToggleAccountDropDown);
    });

    it('Verifying if "Toggle Account" dropdown is enabled', function() {
      ThiefHelpers.getButtonClassReference(undefined, DocumentOptionsPricesPortfolio.xpathToggleAccoountButton).isDisabled().then(function(status) {
        if (status) {
          expect(false).customError('"Toggle Account" button is not enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 557255', function() {

    it('Should click on the "Fixed Income > Analytics Sources" from LHP', function() {
      DocumentOptions.getLHPOption('Analytics Sources').click();

      // Verifying if Analytics Sources is selected
      DocumentOptions.getLHPOption('Analytics Sources').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') === -1) {
          expect(false).customError('"Fixed Income > Analytics Sources" is not selected');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Bloomberg Barclays" is shown in the "Selected" container of "Portfolio" section', function() {
      var xpath = CommonFunctions.replaceStringInXpath(DocumentOptionsFixedIncomeAnalyticsSource.
        xpathPortfolioAvailableOrSelectedSection, 'selected');
      ThiefHelpers.getListBoxItem(xpath, 'Bloomberg Barclays', undefined).getText().then(function(text) {
        if (text !== 'Bloomberg Barclays') {
          expect(false).customError('"Bloomberg Barclays" is not shown in the "Selected" container of "Portfolio" ' +
            'section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"Bloomberg Barclays" is not found in the "Selected" container of "Portfolio" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "SP50_ACCT" is displayed in toggle account dropdown', function() {
      ThiefHelpers.verifySelectedDropDownText('SP50_ACCT', undefined, DocumentOptionsPricesPortfolio.xpathToggleAccountDropDown);
    });

    it('Verifying if "Toggle Account" dropdown is enabled', function() {
      ThiefHelpers.getButtonClassReference(undefined, DocumentOptionsPricesPortfolio.xpathToggleAccoountButton).isDisabled().then(function(status) {
        if (status) {
          expect(false).customError('"Toggle Account" button is not enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 557255', function() {

    it('Should select "OK" button from "Document - Options" View', function() {
      DocumentOptions.getHeaderButton('OK').click().then(function() {
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

    it('Should close the browser and verify if closed', function() {
      expect(true).toBeTruthy();
    });

  });
});
