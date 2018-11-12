'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: accounts-general', function() {

  describe('Test Step ID: Start Up', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 614492', function() {

    it('Should launch PA3 Application with "Client:/Pa3/Accounts/ACCTS_DIALOG_DOC" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('accts-dialog-doc');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    var arrValues = [{name: 'Portfolio', val: 'CLIENT:/PA3/ACCOUNTS/ACCTS_DIALOG_DOC.ACCT'}, {
      name: 'benchmark',
      val: 'SPN:OEX',
    },];
    arrValues.forEach(function(values) {
      it('Verifying that "' + values.name + '" widget has "' + values.val + '" ', function() {
        PA3MainPage.getWidgetBox(values.name).getAttribute('value').then(function(value) {
          if (value !== values.val) {
            expect(false).customError('614492: ', '"' + values.name + '" widget did not have ' +
              '"' + values.val + '". Found: "' + value + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 614493', function() {

    it('Should click on the "Hamburger" icon next to "Portfolio" widget', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on the "pencil" icon next to "Accounts Dialog" ', function() {
      PA3MainPage.getAccountEditButton('portfolio', 'Accounts Dialog').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that Modify Account New dialog box appeared', function() {
      ModifyAccountNew.isModifyAccountMode().then(function(flag) {
        if (!flag) {
          expect(flag).customError('614493: ', '"Modify Account (New)" mode is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Basics" tab in General category from LHP', function() {
      ThiefHelpers.expandAndGetOptionspaneItem(undefined, 'Basics', 'General').select();

      ThiefHelpers.getOptionspaneItem(undefined, 'Basics', 'General').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('Basics" is not selected inside "General"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var takeScreenShot = 0;
    var arrayvales = [{name: 'Name', value: 'ACCTS_DIALOG_DOC'}, {name: 'Description', value: 'Accounts Dialog'}];
    arrayvales.forEach(function(text) {
      it('Verifying if "' + text.name + '"input box is set to "' + text.value + '"', function() {
        ModifyAccountGeneralBasics.getInputField(text.name).getAttribute('value').then(function(value) {
          if (value !== text.value) {
            expect(false).customError('614493: ', '"' + text.name + '"input box did not set to "' + text.value + '".' +
              ' Found: "' + value + '"');
            takeScreenShot++;
          }

          if (takeScreenShot === 1) {
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verify if "Currency" DropDown name is "Euro"', function() {
      ThiefHelpers.verifySelectedDropDownText('Euro', 'Base Currency');
    });

  });

  describe('Test Step ID: 614537', function() {

    it('Should select "Holdings" tab in General category from LHP', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Holdings', 'General').select();

      ThiefHelpers.getOptionspaneItem(undefined, 'Holdings', 'General').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('Holdings" is not selected inside "General"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrayvales = [{name: 'Portfolio', value: 'SPN:OEX'}, {name: 'Benchmark', value: 'SPN:OEX'}];
    var takeScreenShot = 0;
    arrayvales.forEach(function(text) {
      it('Verifying if "' + text.name + '"input box is set to "' + text.value + '"', function() {
        ModifyAccountGeneralHoldings.getInputField(text.name).getAttribute('value').then(function(value) {
          if (value !== text.value) {
            expect(false).customError('614537: ', '"' + text.name + '"input box did not set to "' + text.value + '".' +
              ' Found: "' + value + '"');
            takeScreenShot++;
          }

          if (takeScreenShot === 1) {
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 614494', function() {

    it('Should select "Dates" tab in General category from LHP', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Dates', 'General').select();

      ThiefHelpers.getOptionspaneItem(undefined, 'Dates', 'General').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('Dates" is not selected inside "General"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrayvales = [{name: 'Inception Date', value: '09 Aug 2013'}, {
      name: 'Alternate Inception',
      value: '01 Aug 2013',
    },
      {name: 'Termination Date', value: '16 Aug 2014'},];
    var screenShot = 0;
    arrayvales.forEach(function(text) {
      it('Verifying if "' + text.name + '" input box is set to "' + text.value + '"', function() {
        ModifyAccountGeneralDates.getDateTextBox(text.name).getAttribute('value').then(function(value) {
          if (value !== text.value) {
            expect(false).customError('614494: ', '"' + text.name + '"input box did not set to"' + text.value + '".' +
              ' Found: "' + value + '"');
            screenShot++;
          }

          if (screenShot === 1) {
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var arr = [{name: 'Fiscal Year End Month', value: 'March'}, {name: 'Calendar', value: 'Seven Day'}];
    var takeScreenShot = 0;
    arr.forEach(function(text) {
      it('Verifying if "' + text.name + '" drop down is set to "' + text.value + '"', function() {
        ThiefHelpers.verifySelectedDropDownText(text.value, text.name);
      });

    });

  });

  describe('Test Step ID: 614495', function() {

    it('Should select "Additional Options" tab in General category from LHP', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Additional Options', 'General').select();

      ThiefHelpers.getOptionspaneItem(undefined, 'Additional Options', 'General').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('Additional Options" is not selected inside "General"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Exclude from Security Exposures" checkbox is not checked', function() {
      Utilities.isCheckboxSelected(ModifyAccountGeneralAddtionalOptions.getCheckBox('Exclude from Security Exposures')).then(function(flag) {
        if (flag) {
          expect(!flag).customError('614495: ', '"Exclude from Security Exposures" checkbox is still checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 614496', function() {

    it('Should expand "PA|Prices" and select "Portfolio" from LHP in "Modify Account(New)" page', function() {
      ThiefHelpers.expandAndGetOptionspaneItem(undefined, 'Portfolio', 'PA|Prices').select();

      //Verifying if "Portfolio" is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Portfolio', 'PA|Prices').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Portfolio" is not selected inside "PA|Prices"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrValues = [{Name: 'Russell - U.S.', Section: 'Prices'}, {Name: 'FTSE', Section: 'Exchange Rates'}];
    var takeScreenshot = 0;
    arrValues.forEach(function(text) {
      it('verifying "' + text.Name + '" is displayed in "' + text.Section + '" Selected section', function() {
        ModifyAccountPaPricesPortfolio.getListItem(text.Name, text.Section, 'Selected').isPresent().then(function(flag) {
          if (!flag) {
            expect(flag).customError('614496: ', ' "' + text.Name + '" is not displayed ' +
              'in "' + text.Section + '" Selected Section ');
            takeScreenshot++;
          }

          if (takeScreenshot === 1) {
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 614497', function() {

    it('Should expand "PA|Fixed Income" and select "Analytics Source" from LHP in "Modify Account(New)" page', function() {
      ThiefHelpers.expandAndGetOptionspaneItem(undefined, 'Analytics Source', 'PA|Fixed Income', 'PA').select();

      //Verifying if "Portfolio" is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Analytics Source', 'PA|Fixed Income').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Analytics Source" is not selected inside "PA|Fixed Income"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Use Portfolio Analytics Sources for Benchmark" checkbox is checked by default', function() {
      Utilities.isCheckboxSelected(ModifyAccountPaFixedIncomeAnalyticsSource.getCheckboxFromPortfolioSection('Use Portfolio Sources For Benchmark')).then(function(flag) {
        if (!flag) {
          expect(flag).customError('614497: ', '"Use Portfolio Analytics Sources for Benchmark"' +
            ' checkbox is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Client Portfolio" is displayed in "Portfolio" Selected section', function() {
      ThiefHelpers.expandAndGetListBoxItem(ModifyAccountPaFixedIncomeAnalyticsSource.xpathPortfolioSelectedContainer, 'Client Portfolio').getText().then(function(text) {
        if (text !== 'Client Portfolio') {
          expect(false).customError('"Client Portfolio" is not shown in the "Selected" container of "Portfolio" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"Client Portfolio" is not found in the "Selected" container of "Portfolio" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Benchmark" section is disabled', function() {
      ModifyAccountPaFixedIncomeAnalyticsSource.getBenchmarkSection().getAttribute('disabled').then(function(flag) {
        if (!flag) {
          expect(flag).customError('614497: ', ' "Benchmark" section is not disabled ');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 614498', function() {

    it('Should expand "PA|Asset Types" and select "Search Order" from LHP in "Modify Account(New)" page', function() {
      ThiefHelpers.expandAndGetOptionspaneItem(undefined, 'Search Order', 'PA|Asset Types', 'PA').select();

      //Verifying if "Search Order" is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Search Order', 'PA|Asset Types').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('Search Order" is not selected inside "PA|Asset Types"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Factset - Equity & Derivatives" is present in selected section ', function() {
      ModifyAccountPaAssetTypesSearchOrder.getElement('Selected', 'FactSet - Equity & Derivatives')
        .isPresent().then(function(flag) {
        if (!flag) {
          expect(flag).customError('614498: ', '"Factset - Equity & Derivatives" is not present in selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 614499', function() {

    it('Should select Databases tab in PA category from LHP', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Databases', 'PA').select();

      ThiefHelpers.getOptionspaneItem(undefined, 'Databases', 'PA').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('Databases" is not selected inside "PA"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if two are displayed in "Fundamental" Selected Section by default', function() {
      ModifyAccountPaDatabases.getAllListElements('Fundamental', 'Selected').count().then(function(count) {
        if (count !== 2) {
          expect(false).customError('614499: ', 'There are more than two elements in "Fundamental" "Selected" section.');
        }

      });
    });

    var arr = ['NRI', 'Worldscope'];
    var takeScreenShot = 0;
    arr.forEach(function(value) {
      it('Verifying that "' + value + '" is diaplayed in Fundamental Selected Section', function() {
        ModifyAccountPaDatabases.getElement(value, 'Fundamental', 'Selected').isPresent().then(function(flag) {
          if (!flag) {
            expect(flag).customError('614499: ', '"' + value + '" is not present in "Fundamental" Selected Section');
            takeScreenShot++;
          }

          if (takeScreenShot === 1) {
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying that "Reuters" is displayed in "ESTIMATES" Selected Section', function() {
      ModifyAccountPaDatabases.getElement('Reuters', 'Estimates', 'Selected').isPresent().then(function(flag) {
        if (!flag) {
          expect(flag).customError('614499: ', '"Reuters" is not present in Estimates Selected Section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 614500', function() {

    it('Should select "Groupings" tab in PA category from LHP', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Groupings', 'PA').select();

      ThiefHelpers.getOptionspaneItem(undefined, 'Groupings', 'PA').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('Groupings" is not selected inside "PA"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Market Cap" which is present in Selected Section', function() {
      //Verifying "Market Cap" is displayed in selected section
      ModifyAccountNewPaGroupings.getElementFromSelectedContainer('Market Cap').isPresent().then(function(flag) {
        if (!flag) {
          expect(flag).customError('614500: ', '"Market Cap" is not present in "Selected" Section');
          CommonFunctions.takeScreenShot();
        } else {
          //Clicking on "Market Cap" in selected section
          ModifyAccountNewPaGroupings.getElementFromSelectedContainer('Market Cap').click().then(function() {
          }, function(err) {

            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Should expand "Additional Options" from "Options" section', function() {
      ModifyAccountNewPaGroupings.expandSectionInOptionsPane('Additional Options').then(function(flag) {
        if (!flag) {
          expect(flag).customError('614500: ', '"Additional Options" is not expand from "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Group After Exclusions" radio button is selected', function() {
      ModifyAccountNewPaGroupings.getRadioButton('Group after Exclusions').isSelected().then(function(flag) {
        if (!flag) {
          expect(false).customError('614500: ', '"Group After Exclusions" radio button is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 614501', function() {

    it('Should expand "Risk" and select "Risk Models" from LHP in "Modify Account(New)" page', function() {
      ThiefHelpers.expandAndGetOptionspaneItem(undefined, 'Risk Models', 'Risk').select();

      //Verifying if "Risk Models" is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Risk Models', 'Risk').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('Risk Models" is not selected inside "Risk"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "NIS US Fundamental Model" is displayed in selected section', function() {
      ThiefHelpers.getTextBoxClassReference('Selected').getText().then(function(value) {
        if (value !== 'NIS US Fundamental Model') {
          expect(false).customError('614501: ', '"NIS US Fundamental Model" ' +
            'is not displayed in selected section. Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "None" is displayed in Select Factor Grouping', function() {
      ThiefHelpers.verifySelectedDropDownText('None', 'Select Factor Grouping');
    });

  });

  describe('Test Step ID: 614502', function() {

    it('Should select "Universe" tab in Risk category from LHP', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Universe', 'Risk').select();

      ThiefHelpers.getOptionspaneItem(undefined, 'Universe', 'Risk').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('Universe" is not selected inside "Risk"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrElemets = [{Name: 'Market Risk Premium', Value: '6'}, {Name: 'Deannualization Factor', Value: '365'}];
    var takeScreenShot = 0;
    arrElemets.forEach(function(text) {
      it('Verifying that "' + text.Value + '" is displayed in "' + text.Name + '"', function() {
        ModifyAccountRiskUniverse.getNumberInputBox(text.Name).getAttribute('value').then(function(value) {
          if (value !== text.Value) {
            expect(false).customError('614502: ', '"' + text.Name + '" did not display "' + text.Value + '". ' +
              'Found: "' + value + '"');
            takeScreenShot++;
          }

          if (takeScreenShot === 1) {
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID:614504', function() {

    it('Should select Cancel button in Account Dialog', function() {
      ModifyAccountNew.getButtonFromRHP('Cancel').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Modify Account ( New )" dialog box is closed', function() {
      ModifyAccountNew.isModifyAccountMode().then(function(flag) {
        if (flag) {
          expect(false).customError('614504: ', '"Modify Account ( New )" dialog box is not closed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
