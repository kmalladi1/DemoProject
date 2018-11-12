'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: acct-fx-rates', function() {

  describe('Test Step ID: 679109', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch PA3 Application with "Client:/Pa3/Accounts/FX_DEFAULTS" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('fx-defaults');
    });

    it('Should wait for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Weights" report is not appeared on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrValues = [{name: 'Portfolio', val: 'CLIENT:/PA3/ACCOUNTS/FX_1.ACCT'}, {name: 'benchmark', val: 'SPN:OEX',},];
    arrValues.forEach(function(values) {
      it('Verifying that "' + values.name + '" widget has "' + values.val + '" ', function() {
        PA3MainPage.getWidgetBox(values.name).getAttribute('value').then(function(value) {
          if (value !== values.val) {
            expect(false).customError('"' + values.name + '" widget did not have "' + values.val + '", Found: "' + value + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 679110', function() {

    it('Should click on "Wrench" button from application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if wrench menu list appear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('Menu list did not appear after clicking on Wrench button.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Document Options" from wrench menu', function() {
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click().then(function() {
      }, function(error) {

        expect(false).customError('Error occurred while clicking on Document Options from the displayed ' +
          'drop down:' + error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify if view is changed to "Document Options" mode', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Document Options" mode is not appeared');
        }
      });
    });

    it('Verify that "Prices>Portfolio" option is selected from "Document Options" page', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Portfolio', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Portfolio" tab is not selected in the "Prices" group.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var flag = 0;

    it('Verifying that "FactSet" is shown in the "Selected" container of "EXCHANGE RATES" section', function() {
      ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathExchangeRatesSelectedContainer, 'FactSet')
        .getText().then(function(text) {
        if (text !== 'FactSet') {
          expect(false).customError('"FactSet" is not shown in the "Selected" container of "Exchange Rates" ' +
            'section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"FactSet" is not found in the "Selected" container of "Exchange Rates" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Defaults Applied" button is displayed', function() {
      DocumentOptions.getDefaultsApplied().isPresent().then(function(option) {
        if (!option) {
          flag = flag + 1;
          expect(false).customError('"Defaults Applied" button is not displayed');
          if (flag === 1) {
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });
  });

  describe('Test Step ID: 679112', function() {

    it('Should click on "Cancel" button', function() {
      DocumentOptions.getHeaderButton('Cancel').click().then(function() {}, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking:' + err);
      });
    });

    it('Verify if "Document Options" view is closed after clicking on "Cancel" button', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(found) {
        if (found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Document Options" mode is not closed');
        }
      });
    });

    it('Should click on "Hamburger" icon next to "Portfolio"', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {}, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account dropdown opened
      ThiefHelpers.isDropDownOpen().then(function(found) {
        if (!found) {
          expect(false).customError('Account dropdown was not opened');
        }
      });
    });

    it('Should select "FX_2" from the list of accounts', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'FX_2').click().then(function() {}, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "FX_2" account is selected
      PA3MainPage.getSingleAccountFromList('Portfolio', 'FX_2').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"FX_2" did not select in Portfolio drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "OK" button from the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {}, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      expect(PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('Class')).not.toContain('active');
    });

    it('Should Wait for weights report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Wrench" button from application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {}, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if wrench menu list appear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('Menu list did not appear after clicking on Wrench button.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Document Options" from wrench menu', function() {
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click().then(function() {
      }, function(error) {

        expect(false).customError('Error occurred while clicking on Document Options from the displayed ' +
          'drop down:' + error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify if view is changed to "Document Options" mode', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Document Options" mode is not appeared');
        }
      });
    });

    it('Verify that "Prices>Portfolio" option is selected from "Document Options" page', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Portfolio', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Portfolio" tab is not selected in the "Prices" group.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var selectedPortfolioEle = ['FTSE', 'MSCI',];
    var flag = 0;
    selectedPortfolioEle.forEach(function(ele) {
      it('Verifying if the elements "' + ele + '"is present in "Selected" section', function() {
        ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathExchangeRatesSelectedContainer, ele).getText().then(function(text) {
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

    it('Verifying that "Defaults Applied" button is displayed', function() {
      DocumentOptions.getDefaultsApplied().isPresent().then(function(option) {
        if (!option) {
          flag = flag + 1;
          expect(false).customError('"Defaults Applied" button is not displayed');
          if (flag === 1) {
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });

  });

  describe('Test Step ID: 679113', function() {

    it('Should click on "Cancel" button', function() {
      DocumentOptions.getHeaderButton('Cancel').click().then(function() {}, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking:' + err);
      });
    });

    it('Verify if "Document Options" view is closed after clicking on "Cancel" button', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(found) {
        if (found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Document Options" mode is not closed');
        }
      });
    });

    it('Should click on "Hamburger" icon next to "Portfolio"', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account dropdown opened
      ThiefHelpers.isDropDownOpen().then(function(found) {
        if (!found) {
          expect(false).customError('Account dropdown was not opened');
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

    it('Verify that "Prices>Portfolio" option is selected from "Document Options" page', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Portfolio', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Portfolio" tab is not selected in the "Prices" group.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var selectedPortfolioEle = ['FTSE', 'MSCI',];
    selectedPortfolioEle.forEach(function(ele) {
      it('Verifying if the elements "' + ele + '"is present in "Selected" section', function() {
        ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathExchangeRatesSelectedContainer, ele).getText().then(function(text) {
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

    it('Verifying if "FX_2" is selected from the toggle account dropdown', function() {
      ThiefHelpers.verifySelectedDropDownText('FX_2', undefined, DocumentOptionsPricesPortfolio.xpathToggleAccountDropDown);
    });

  });

  describe('Test Step ID: 679164', function() {

    it('Should click on "Cancel" button', function() {
      DocumentOptions.getHeaderButton('Cancel').click().then(function() {}, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking:' + err);
      });
    });

    it('Verify if "Document Options" view is closed after clicking on "Cancel" button', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(found) {
        if (found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Document Options" mode is not closed');
        }
      });
    });

    it('Should click on "Hamburger" icon next to "Portfolio"', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account dropdown opened
      ThiefHelpers.isDropDownOpen().then(function(found) {
        if (!found) {
          expect(false).customError('Account dropdown was not opened');
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

    it('Should select "FX_1" from the list of accounts', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'FX_1').click().then(function() {}, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "FX_1" account is selected
      PA3MainPage.getSingleAccountFromList('Portfolio', 'FX_1').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"FX_1" did not select in Portfolio drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "OK" button from the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {}, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      expect(PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('Class')).not.toContain('active');
    });

    it('Should Wait for weights report to finish calculation', function() {
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if header text is "FX_1 vs S&P 100"', function() {
      PA3MainPage.getHeader().getText().then(function(value) {
        if (value !== 'FX_1 vs S&P 100') {
          expect(false).customError('Header text did not "FX_1 vs S&P 100"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Wrench" button from application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {}, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if wrench menu list appear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('Menu list did not appear after clicking on Wrench button.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Document Options" from wrench menu', function() {
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click().then(function() {
      }, function(error) {

        expect(false).customError('Error occurred while clicking on Document Options from the displayed ' +
          'drop down:' + error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify if view is changed to "Document Options" mode', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Document Options" mode is not appeared');
        }
      });
    });

    it('Verify that "Prices>Portfolio" option is selected from "Document Options" page', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Portfolio', 'Prices').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Portfolio" tab is not selected in the "Prices" group.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on X icon in "Exchange Rates" to clear the "Selected" section', function() {
      ThiefHelpers.getButtonClassReference(undefined, DocumentOptionsPricesPortfolio.getButtonFromSelectedSection('Exchange rates',
        'remove')).press();

      // Verifying that all items are removed from the 'Selected' container
      DocumentOptionsPricesPortfolio.getAllListElements('Exchange rates', 'Selected').count().then(function(count) {
        if (count !== 0) {
          expect(false).customError('All items are not removed from the Exchange "Selected" container');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrEle = ['FTSE', 'MSCI',];
    var flag = 0;

    arrEle.forEach(function(element) {
      it('Should double click on "' + element + '" from "Exchange Rates > Available" section', function() {
        ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathExchangeRatesAvailableContainer, element,
          undefined).then(function(ref) {
          browser.actions().doubleClick(ref).perform();
        });
      });

      it('Verifying that "' + element + '" is added to "Exchange Rates > Selected" section', function() {
        ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathExchangeRatesSelectedContainer, element)
          .getText().then(function(text) {
          if (text !== element) {
            expect(false).customError('"' + element + '" is not shown in the "Selected" container of "Exchange Rates" ' +
              'section;Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + element + '" is not found in the "Selected" container of "Exchange Rates" section');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying that "Restore Defaults" button is displayed', function() {
      DocumentOptions.getRestoreDefaultsButton().isPresent().then(function(option) {
        if (!option) {
          flag = flag + 1;
          expect(false).customError('"Defaults Applied" button is not displayed');
          if (flag === 1) {
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });
  });

  describe('Test Step ID: 679256', function() {

    it('Should click on "OK" button in Doument Options view', function() {
      DocumentOptions.getHeaderButton('OK').click().then(function() {}, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking:' + err);
      });
    });

    it('Verify if "Document Options" view is closed after clicking on "Cancel" button', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(found) {
        if (found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Document Options" mode is not closed');
        }
      });
    });

    it('Should enter "FX_3" in "Portfolio" widget and select "FX_3.ACCT | Client:/pa3/accounts" from type ahead', function() {
      // Clear the "Portfolio" widget before entering new account name
      PA3MainPage.getWidgetBox('Portfolio').clear();

      PA3MainPage.setPortfolio('FX_3', 'Client:/pa3/accounts/FX_3.ACCT',
        'Client:/pa3/accounts/FX_3.ACCT').then(function(option) {
        if (!option) {
          expect(false).customError('"Client:/pa3/accounts/FX_3.ACCT" is not selected from type ahead.');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if header text is "FX_3 vs S&P 100"', function() {
      PA3MainPage.getHeader().getText().then(function(value) {
        if (value !== 'FX_3 vs S&P 100') {
          expect(false).customError('Header text is not matched with "FX_3 vs S&P 100"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Wrench" button from application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {}, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if wrench menu list appear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('Menu list did not appear after clicking on Wrench button.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Document Options" from wrench menu', function() {
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click().then(function() {
      }, function(error) {

        expect(false).customError('Error occurred while clicking on Document Options from the displayed ' +
          'drop down:' + error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify if view is changed to "Document Options" mode', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Document Options" mode is not appeared');
        }
      });
    });

    var selectedPortfolioEle = ['FTSE', 'MSCI',];
    var flag = 0;
    selectedPortfolioEle.forEach(function(ele) {
      it('Verifying if the elements "' + ele + '"is present in "Selected" section', function() {
        ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathExchangeRatesSelectedContainer, ele).getText()
          .then(function(text) {
            if (text !== ele) {
              expect(false).customError('"' + ele + '" is not shown in the "Selected" container of "Exchange" section;Found: ' + text);
              CommonFunctions.takeScreenShot();
            }
          }, function(err) {

            if (err.toString().indexOf('No direct child') > 0) {
              expect(false).customError('"' + ele + '" is not found in the "Selected" container of "Exchange" section');
              CommonFunctions.takeScreenShot();
            } else {
              expect(false).customError(err);
              CommonFunctions.takeScreenShot();
            }
          });
      });
    });

    it('Verifying that "Restore Defaults" button is displayed', function() {
      DocumentOptions.getRestoreDefaultsButton().isPresent().then(function(option) {
        if (!option) {
          flag = flag + 1;
          expect(false).customError('"Defaults Applied" button is not displayed');
          if (flag === 1) {
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });

  });

  describe('Test Step ID: 679276', function() {

    it('Should click on the "Restore Defaults" button', function() {
      DocumentOptions.getRestoreDefaultsButton().click().then(function() {}, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'OK');

    it('Verifying that "Full_Refresh" is shown in the "Selected" container of "EXCHANGE RATES" section', function() {
      DocumentOptionsPricesPortfolio.getListItem('Full_Refresh', 'EXCHANGE RATES', 'Selected').isDisplayed().then(function(visible) {
        expect(visible).customError('"Full_Refresh" is not found in the selected section');
        if (!visible) {
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "OK" button in Doument Options view', function() {
      DocumentOptions.getHeaderButton('OK').click().then(function() {}, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking:' + err);
      });
    });

    it('Verify if "Document Options" view is closed after clicking on "OK" button', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(found) {
        if (found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Document Options" mode is not closed');
        }
      });
    });

    it('Should wait for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Weights" report is not appeared on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrValues = [{name: 'Portfolio', val: 'Client:/pa3/accounts/FX_3.ACCT'}, {name: 'benchmark', val: 'SPN:OEX',},];
    arrValues.forEach(function(values) {
      it('Verifying that "' + values.name + '" widget has "' + values.val + '" ', function() {
        PA3MainPage.getWidgetBox(values.name).getAttribute('value').then(function(value) {
          if (value !== values.val) {
            expect(false).customError('"' + values.name + '" widget did not have "' + values.val + '", Found: "' + value + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

});
