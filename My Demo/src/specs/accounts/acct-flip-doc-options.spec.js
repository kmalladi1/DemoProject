'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: acct-flip-doc-options', function() {

  var xpathTextBoxcategory;
  var xpathTextBoxName;
  var portfolioWidget;
  xpathTextBoxcategory = '//tf-form-label[contains(.,"Category")]//following-sibling::*//tf-textbox';
  xpathTextBoxName = '//tf-form-label[contains(.,"Name")]//following-sibling::*//tf-textbox';
  var xpathTextBoxPortfolio = '//tf-label[normalize-space(.)=\"Portfolio\"]//parent::*/following-sibling::*//tf-textbox';

  describe('Test Step ID: Start Up', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 614523', function() {

    it('Should launch PA3 Application with "Client:default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

    it('Waiting for "Weights" report to calculate', function() {
      // Wait for report calculation to finish
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('614523: ', '"Weights" report is not displayed on the webpage.');
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
          expect(false).customError('614523: ', '"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Weights" report is grouped by "Economic Sector"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(refVal) {
        if (refVal.indexOf('Economic Sector') === -1) {
          expect(false).customError('The "Weights" report is not grouped by "Economic Sector"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 614524', function() {

    it('Enter "CLIENT:/PA3/ACCOUNTS/FIXED_INCOME_SETTINGS.ACCT" in the "Portfolio" widget and select "Client:/pa3/acc' +
      'ounts/FIXED_INCOME_SETTINGS.ACCT" from type ahead', function() {
      // Selecting the value to portfolio widget
      PA3MainPage.setPortfolio('CLIENT:/PA3/ACCOUNTS/FIXED_INCOME_SETTINGS.ACCT', 'FIXED_INCOME_SETTINGS.ACCT | ' +
        'Client:/pa3/accounts/', 'Client:/pa3/accounts/FIXED_INCOME_SETTINGS.ACCT').then(
        function(option) {
          if (!option) {
            expect(false).customError('"Client:/pa3/accounts/FIXED_INCOME_SETTINGS.ACCT" is not selected from type ahead.');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should save text of "Portfolio" widget text box for future reference', function() {
      PA3MainPage.getWidgetBox('Portfolio').getAttribute('value').then(function(val) {
        portfolioWidget = val;
      });
    });

    it('Should click on the "Hamburger" icon next to "Portfolio" widget', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on the "pencil" icon next to "Fixed Income Settings." ', function() {
      PA3MainPage.getAccountEditButton('portfolio', 'Fixed Income Settings.').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that Modify Account New dialog box appeared', function() {
      ModifyAccountNew.isModifyAccountMode().then(function(flag) {
        if (!flag) {
          expect(flag).customError('614524: ', '"Modify Account (New)" mode is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrValues = ['General', 'PA', 'Risk', 'Publisher'];
    var captureImage = 0;

    arrValues.forEach(function(lhpOption) {
      it('Verify if "' + lhpOption + '" category is displayed', function() {
        ModifyAccountNew.getLHPOptionCategoryExpander(lhpOption).isDisplayed().then(function(flag) {
          if (!flag) {
            expect(flag).customError('614524: ', '"' + lhpOption + '" category did not appear in LHP section');
            captureImage++;
          }

          if (captureImage === 1) {
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var arr = ['SPAR', 'GIPS®'];
    var takeImage = 0;

    arr.forEach(function(lhpOption) {
      it('Verify if "' + lhpOption + '" option is displayed', function() {
        ModifyAccountNew.getLHPOption(lhpOption).isPresent().then(function(flag) {
          if (!flag) {
            expect(flag).customError('614524: ', '"' + lhpOption + '" option did not appear in LHP section');
            takeImage++;
          }

          if (takeImage === 1) {
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 617958', function() {

    it('Should expand "General" category from LHP', function() {
      ModifyAccountNew.expandOrCollapseCategoryFromLHP('General', 'Expand').then(function(flag) {
        if (!flag) {
          expect(flag).customError('617958: ', '"General" category did not expand in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Holdings" tab in "General" category from LHP', function() {
      ModifyAccountNew.selectOptionsFromLHP('Holdings', true);
    });

    it('Should clear "Portfolio" text box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, xpathTextBoxPortfolio).setText('');

      //Verifying if "Portfolio" text is set to Empty
      ThiefHelpers.getTextBoxClassReference(undefined, xpathTextBoxPortfolio).getText().then(function(text) {
        if (text !== '') {
          expect(false).customError('"Portfolio" text box is not Empty.Found:"' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Portfolio" text box red warning icon displays "Account must contain at least one holdings' +
      ' or returns portfolio" when clicked on it', function() {
      //Verifying if "Account must contain at least one holdings or returns portfolio" text is displayed
      // when we click on warning icon
      ThiefHelpers.getTextBoxClassReference(undefined, xpathTextBoxPortfolio).getErrors().then(function(text) {
        if (text[0] !== 'Account must contain at least one holdings or returns portfolio') {
          expect(false).customError('"Account must contain at least one holdings or returns portfolio"' +
            ' text is not displayed when we click on warning icon of "Portfolio" text box.Found:"' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Errors Found" button from "Modify Account(New)" is displayed', function() {
      ThiefHelpers.isPresent('Button', 'Errors Found').then(function(option) {
        if (!option) {
          expect(false).customError('"Errors Found" button is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Errors Found" is display with "2 ERRORS"', function() {
      ThiefHelpers.getButtonClassReference('Errors Found').press().then(function() {
        ThiefHelpers.getAllOptionsFromDropdown().then(function(ddElements) {
          if (ddElements.indexOf('2 Errors') === -1) {
            expect(false).customError('"Errors Found" button is not displayed with "2 Errors"');
            CommonFunctions.takeScreenShot();
          }
        });
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    var arr = ['Holdings', 'Returns'];
    arr.forEach(function(header) {
      it('Verifying if one error is displayed under "' + header + '"', function() {
        ModifyAccountNew.getAllErrorsUnderHeader(header).then(function(errors) {
          if (errors.length !== 1) {
            expect(false).customError('Errors under ' + header + ' are not equal to 1' +
              ' ' + ', Found: ' + errors.length);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 617972', function() {

    it('Should click on an error that is displayed under "Returns"', function() {
      ModifyAccountNew.getAllErrorsUnderHeader('Returns').then(function(errors) {
        errors[0].click().then(function() {
        }, function(err) {

          expect(false).customError('Unable to click on error under "Returns" header' + err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Verifying if "Returns" tab under "General" option is selected', function() {
      ModifyAccountNew.selectAndVerifyOptionFromLHP('General', 'Returns');
    });

    it('Verifying if "Portfolio" text box red warning icon displays "Account must contain at least one holdings' +
      ' or returns portfolio" when clicked on it', function() {
      //Verifying if "Account must contain at least one holdings or returns portfolio" text is displayed
      // when we click on warning icon
      ThiefHelpers.getTextBoxClassReference(undefined, ModifyAccountGeneralReturns.xpathPortfolioTextBox).getErrors().then(function(text) {
        if (text[0] !== 'Account must contain at least one holdings or returns portfolio') {
          expect(false).customError('"Account must contain at least one holdings or returns portfolio"' +
            ' text is not displayed when we click on warning icon of "Portfolio" text box.Found:"' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "General" category from LHP', function() {
      ModifyAccountNew.expandOrCollapseCategoryFromLHP('General', 'Expand').then(function(flag) {
        if (!flag) {
          expect(flag).customError('617972: ', '"General" category did not expand in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Holdings" tab in "General" category from LHP', function() {
      ModifyAccountNew.selectOptionsFromLHP('Holdings', true);
    });

    it('Should enter "CLIENT:/PA3/FIXED_INCOME/FIXED_INC.CSTM" into "Portfolio" text box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, xpathTextBoxPortfolio).setText('CLIENT:/PA3/FIXED_INCOME/FIXED_INC.CSTM');

      //Verifying if "Portfolio" text is set to "CLIENT:/PA3/FIXED_INCOME/FIXED_INC.CSTM"
      ThiefHelpers.getTextBoxClassReference(undefined, xpathTextBoxPortfolio).getText().then(function(text) {
        if (text !== 'CLIENT:/PA3/FIXED_INCOME/FIXED_INC.CSTM') {
          expect(false).customError('"Portfolio" text box is not set with "CLIENT:/PA3/FIXED_INCOME/FIXED_INC.CSTM" text.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Errors Found" button from "Modify Account(New)" is not displayed', function() {
      ThiefHelpers.isPresent('Button', 'Errors Found').then(function(option) {
        if (option) {
          expect(false).customError('"Errors Found" button is displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Returns" tab under "General" option', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Returns', 'General').select();

      // Verifying if "Returns" tab under "General" option is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Returns', 'General').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Returns" is not selected inside "General" group');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Portfolio" text box does not show red warning icon displays', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, ModifyAccountGeneralReturns.xpathPortfolioTextBox).getErrors().then(function(text) {
        if (text.length !== 0) {
          expect(false).customError('Warning icon is displayed in "Portfolio" text box');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 614545', function() {

    it('Should expand "PA|Prices" from LHP in "Account(New)" page', function() {
      ThiefHelpers.expandGroup(undefined, 'PA|Prices', undefined, 'optionspane');
    });

    it('Should  click to select "Benchmark" under "PA|Prices"', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Benchmark', 'PA|Prices').select();

      // Verifying if "Benchmark" tab under "PA|Prices" option is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Benchmark', 'PA|Prices').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Benchmark" is not selected inside "PA|Prices" group');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Use Portfolio Pricing Sources for Benchmark" checkbox under "Prices" section is checked off', function() {
      // Verifying if Use Portfolio Pricing Sources for Benchmark" checkbox is checked off
      ThiefHelpers.getCheckBoxClassReference('Use Portfolio Pricing Sources for Benchmark').isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Use Portfolio Pricing Sources for Benchmark" checkbox is unchecked ' +
            'under "Prices" section by default');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Prices" section is disabled', function() {
      ModifyAccountPaPricesBenchmark.getSection('Prices').getAttribute('class').then(function(attr) {
        if (attr.indexOf('disabled') < 0) {
          expect(false).customError('614545: ', ' "Prices" section did not disable ');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Exchange Rates" section is disabled', function() {
      ModifyAccountPaPricesBenchmark.getSection('Exchange Rates').getAttribute('class').then(function(attr) {
        if (attr.indexOf('disabled') < 0) {
          expect(false).customError('614545: ', ' "Exchange Rates" section did not disable ');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should uncheck "Use Portfolio Pricing Sources for Benchmark" checkbox under "Prices" section', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Portfolio Pricing Sources for Benchmark').uncheck();

      // Verifying if Use Portfolio Pricing Sources for Benchmark" checkbox is unchecked
      ThiefHelpers.getCheckBoxClassReference('Use Portfolio Pricing Sources for Benchmark').isChecked().then(function(boolean) {
        if (boolean) {
          expect(false).customError('"Use Portfolio Pricing Sources for Benchmark" checkbox is checked off ' +
            'under "Prices" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Prices" section is enabled', function() {
      ModifyAccountPaPricesBenchmark.getSection('Prices').getAttribute('class').then(function(attr) {
        if (attr.indexOf('disabled') > 0) {
          expect(false).customError('614545: ', ' "Prices" section is not enable ');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Client Provided" from "Prices-Available" section and select "Client Security Master - FactSet"' +
      ' element', function() {
      ThiefHelpers.expandAndGetListBoxItem(ModifyAccountPaPricesBenchmark.xpathPricesAvailableContainer, 'Client Security' +
        ' Master - FactSet', 'Client Provided').select();
    });

    it('Verifying if "Client Security Master - FactSet" is selected', function() {
      //Verifying if "Client Security Master - FactSet" is selected or not
      ThiefHelpers.getListBoxItem(ModifyAccountPaPricesBenchmark.xpathPricesAvailableContainer, 'Client Security' +
        ' Master - FactSet', 'Client Provided', 'Client Provided').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('614545: ', 'The element "Client Security Master - FactSet" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Right" arrow icon', function() {
      ThiefHelpers.sendElementToSelectedSection(ModifyAccountPaPricesBenchmark.getArrowButton('prices'));
    });

    it('Verify if only one elements are present in the "Prices Selected Section"', function() {
      ModifyAccountPaPricesBenchmark.getAllListElements('Prices', 'Selected').count().then(function(count) {
        if (count !== 1) {
          expect(false).customError('614545: ', 'There more than one element in the "Prices Selected Section"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Client Security Master - FactSet" is present in "Prices Selected Section"', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaPricesBenchmark.xpathPricesSelectedContainer, 'Client Security Master - FactSet')
        .getText().then(function(text) {
        if (text !== 'Client Security Master - FactSet') {
          expect(false).customError('"Client Security Master - FactSet" is not shown in the "Selected" container of ' +
            '"Prices" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"Client Security Master - FactSet" is not found in the "Selected" container of "PRICES" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 614525', function() {

    it('Should click on "Portfolio" tab from "PA > Prices" Category', function() {
      ModifyAccountNew.selectOptionsFromLHP('Portfolio', true);
    });

    it('Should expand "Client Provided" from "Prices-Available" section', function() {
      ThiefHelpers.expandGroup(ModifyAccountPaPricesBenchmark.xpathPricesAvailableContainer, 'Client Provided', undefined, 'Listbox');
    });

    var elementsArr = ['Client Portfolio', 'Client Security Master'];
    elementsArr.forEach(function(element) {
      it('Should select "' + element + '" element from "Client Provided"', function() {
        ThiefHelpers.getListBoxItem(ModifyAccountPaPricesBenchmark.xpathPricesAvailableContainer, element, 'Client Provided',
          'Client Provided').select().then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });

      it('Verifying if "' + element + '" is selected', function() {
        //Verifying if element is selected or not
        ThiefHelpers.getListBoxItem(ModifyAccountPaPricesBenchmark.xpathPricesAvailableContainer, element, 'Client Provided',
          'Client Provided').isSelected().then(function(bool) {
          if (!bool) {
            expect(false).customError('614525: ', 'The element "' + element + '" is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Should click on "Right" arrow icon', function() {
        ThiefHelpers.sendElementToSelectedSection();
      });
    });

    it('Verify if only three elements are present in the "Prices Selected Section" by default', function() {
      ModifyAccountPaPricesPortfolio.getAllListElements('Prices', 'Selected').count().then(function(count) {
        if (count !== 3) {
          expect(false).customError('614525: ', 'There more than three elements in the "Prices Selected Section"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrValues = ['Client Portfolio', 'Client Security Master'];
    arrValues.forEach(function(element) {
      it('Verifying if "' + element + '" is present in "Prices Selected Section"', function() {
        ThiefHelpers.getListBoxItem(ModifyAccountPaPricesPortfolio.xpathPricesSelectedContainer, element)
          .getText().then(function(text) {
          if (text !== element) {
            expect(false).customError('"' + element + '" is not shown in the "Selected" container of "PRICES" section;Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + element + '" is not found in the "Selected" container of "PRICES" section');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on "Save" button from "Modify Account(New) window"', function() {
      ModifyAccountNew.getButtonFromRHP('Save').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying if "Save" dialog box appeared.
      ThiefHelpers.verifyDialogTitle('Save Account');
    });

    var categoryArr = ['CLIENT', 'PERSONAL', 'SUPER_CLIENT'];
    categoryArr.forEach(function(category) {
      it('Verifying if "' + category + '" directory is present from "Category" section', function() {
        //Verify if category present in "Category" section.
        ModifyAccountNew.getCategoryOption(category).isPresent().then(function(present) {
          if (!present) {
            expect(false).customError('614525: ', 'The element "' + category + '" is not present in "Category" section.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 614526', function() {

    it('Should select "PERSONAL" directory from "Category" section', function() {
      //Verify if "PERSONAL" present in "Category" section.
      ModifyAccountNew.getCategoryOption('PERSONAL').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('614526: ', 'The element "PERSONAL" is not present in "Category" section.');
          CommonFunctions.takeScreenShot();
        }
      });

      //Select "PERSONAL" from "Category" section.
      ModifyAccountNew.getCategoryOption('PERSONAL').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify if "Category" text field is set to "PERSONAL"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, xpathTextBoxcategory).getText().then(function(value) {
        if (value !== 'PERSONAL:') {
          expect(false).customError('614526: ', '"Category" of the account does not change to "PERSONAL:".' +
            ' Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should update "Name" of the account to "FIXED_INCOME_APR"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, xpathTextBoxName).setText('FIXED_INCOME_APR');

      //Verify if "FIXED_INCOME_APR" is updated in "Name" filed or not.
      ThiefHelpers.getTextBoxClassReference(undefined, xpathTextBoxName).getText().then(function(value) {
        if (value !== 'FIXED_INCOME_APR') {
          expect(false).customError('614526: ', '"Name" of the account did not change to ' +
            '"ACCTS_DIALOG_DOC_REG". Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save" button', function() {
      ThiefHelpers.getDialogButton('Save Account', 'Save').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "FactSet Research Systems" Pop Up is appeared and click "OK" if Pop Up is present', function() {
      ModifyAccountNew.getDialog('FactSet Research Systems').isPresent().then(function(flag) {
        if (flag) {
          //Verify if pop up contains "overwrite" message in it
          ModifyAccountNew.getDialogWithText('FactSet Research Systems').getText().then(function(text) {
            if (text.indexOf('overwrite it') > -1) {
              //Click on "OK" button
              ModifyAccountNew.getButtonFromFactsetPopUp('OK').click().then(function() {
              }, function(err) {

                expect(false).customError(err);
                CommonFunctions.takeScreenShot();
              });
            } else {
              expect(false).customError('614526: ', '"FactSet Research Systems" pop up with text ' +
                '"overwrite it" is not found');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });
    });

    it('Verifying if settings saved without any errors', function() {
      ModifyAccountNew.getAnyDialog().isPresent().then(function(flag) {
        if (flag) {
          expect(!flag).customError('614526: ', '"Modify Account (New)" mode is still appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Portfolio" is not set to "' + portfolioWidget + '" as original acct', function() {
      PA3MainPage.getWidgetBox('Portfolio').getAttribute('value').then(function(val) {
        if (val === portfolioWidget) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Portfolio" is not set with "PERSONAL:FIXED_INCOME_APR.ACCT", found: ' + val);
        }
      });
    });

    it('Verifying if "Portfolio" is set to "PERSONAL:FIXED_INCOME_APR.ACCT"', function() {
      PA3MainPage.getWidgetBox('Portfolio').getAttribute('value').then(function(val) {
        if (val !== 'PERSONAL:FIXED_INCOME_APR.ACCT') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Portfolio" is not set to "PERSONAL:FIXED_INCOME_APR.ACCT"');
        }
      });
    });
  });

  describe('Test Step ID: 614527', function() {

    it('Should click on the "Wrench" button on the application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down menu appear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(flag) {
        if (!flag) {
          expect(flag).customError('614527: ', 'Drop down menu did not appear.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Document Options" from "Wrench" menu', function() {
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view is changed to "Document Options" mode', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('614527: ', 'View did not change to "Document Options" mode.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Portfolio" from "Prices" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Portfolio', 'Prices').select();

      // Verifying if "Portfolio" tab under "Prices" option is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Portfolio', 'Prices').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Portfolio" is not selected inside "Prices" group');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if only three elements are present in the "Selected" container of "PRICES" section by default', function() {
      DocumentOptionsPricesPortfolio.getAllListElements('Prices', 'Selected').count().then(function(count) {
        if (count !== 3) {
          expect(false).customError('614527: ', 'There more than two elements in the "Selected" container of "PRICES" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrElements = ['Client Portfolio', 'Client Security Master'];
    var takeScreenShot = 0;

    arrElements.forEach(function(value) {
      it('Verifying that "' + value + '" is shown in the "Selected" container of "PRICES" section', function() {
        DocumentOptionsPricesPortfolio.getListItem(value, 'PRICES', 'Selected').isDisplayed().then(function(flag) {
          if (!flag) {
            expect(flag).customError('614527: ', ' "' + value + '" item did not present in "PRICES" "Selected" section.');
            takeScreenShot++;
          }

          if (takeScreenShot === 1) {
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });
});
