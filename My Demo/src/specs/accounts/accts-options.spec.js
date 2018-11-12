'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: accts-options', function() {

  var xpathTextBoxcategory = '//tf-form-label[contains(.,"Category")]//following-sibling::*//tf-textbox';
  var xpathTextBoxName = '//tf-form-label[contains(.,"Name")]//following-sibling::*//tf-textbox';

  describe('Test Step ID: Start Up', function() {
    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 614505', function() {

    it('Should launch PA3 Application with "Client:/Pa3/Accounts/ACCTS_TO_OPTIONS" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('accts-to-options');
    });

    it('Waiting for "Weights" report to calculate', function() {
      // Wait for report calculation to finish
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('614505: ', '"Weights" report is not displayed on the web page.');
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
          expect(false).customError('614505: ', '"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrValues = [{name: 'Portfolio', val: 'CLIENT:/PA3/ACCOUNTS/ACCTS_TO_OPTIONS.ACCT'}, {name: 'benchmark', val: 'SPN:OEX'}];
    arrValues.forEach(function(values) {
      it('Verifying that "' + values.name + '" widget has "' + values.val + '" ', function() {
        PA3MainPage.getWidgetBox(values.name).getAttribute('value').then(function(value) {
          if (value !== values.val) {
            expect(false).customError('614505: ', '"' + values.name + '" widget does not display ' +
              '"' + values.val + '". Found: "' + value + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 614506', function() {

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
          expect(flag).customError('614506: ', '"Modify Account (New)" mode is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

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

    it('Should expand "Client Provided" from "Prices-Available" section and select "Client Security Master"', function() {
      ThiefHelpers.expandAndGetListBoxItem(ModifyAccountPaPricesPortfolio.xpathPricesAvailableContainer, 'Client Security Master', 'Client Provided').select();
    });

    it('Verifying if "Client Security Master" is selected', function() {

      //Verifying if "Client Security Master" is selected or not
      ModifyAccountPaPricesPortfolio.getListItem('Client Security Master', 'Prices', 'Available').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') < 0) {
          expect(false).customError('614506: ', 'The element "Client Security Master" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Right" arrow icon', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verify if only two elements are present in the "Prices Selected Section" by default', function() {
      ModifyAccountPaPricesPortfolio.getAllListElements('Prices', 'Selected').count().then(function(count) {
        if (count !== 2) {
          expect(false).customError('614506: ', 'There more than two elements in the "Prices Selected Section"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrValues = ['Russell - U.S.', 'Client Security Master'];
    arrValues.forEach(function(value) {
      it('Verifying if "' + value + '" is present in "Prices Selected Section"', function() {
        ThiefHelpers.expandAndGetListBoxItem(ModifyAccountPaPricesPortfolio.xpathPricesSelectedContainer, value).getText().then(function(text) {
          if (text !== value) {
            expect(false).customError('"' + value + '" is not shown in the "Selected" container of "PRICES" section;Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {
          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + value + '" is not found in the "Selected" container of "PRICES" section');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 614507', function() {

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

    it('Should expand "Fixed Income -> Bloomberg Barclays" from "Portfolio Available" section and select "Bloomberg Barclays"', function() {
      ThiefHelpers.expandAndGetListBoxItem(ModifyAccountPaFixedIncomeAnalyticsSource.xpathPortfolioAvailableContainer, 'Bloomberg Barclays', 'Fixed Income|Bloomberg Barclays').select();
    });

    it('Should click on "Right" arrow icon', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verify if only two elements are present in the "Prices Selected Section" by default', function() {
      ModifyAccountPaFixedIncomeAnalyticsSource.getAllListElements('Portfolio', 'Selected').count().then(function(count) {
        if (count !== 2) {
          expect(false).customError('614507: ', 'There more than two elements in the "Prices Selected Section"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrValues = ['Client Portfolio', 'Bloomberg Barclays'];
    arrValues.forEach(function(value) {

      it('Verifying if "' + value + '" is present in "Prices Selected Section"', function() {
        ThiefHelpers.expandAndGetListBoxItem(ModifyAccountPaFixedIncomeAnalyticsSource.xpathPortfolioSelectedContainer, value).getText().then(function(text) {
          if (text !== value) {
            expect(false).customError('"' + value + '" is not shown in the "Selected" container of "Portfolio" section;Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {
          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + value + '" is not found in the "Selected" container of "Portfolio" section');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 614508', function() {

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

    it('Should select "Client Portfolio" element from "Available" section', function() {
      ModifyAccountPaAssetTypesSearchOrder.getElement('Available', 'Client Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Client Portfolio" is selected', function() {
      // Verifying if "Client Portfolio" is selected or not
      ModifyAccountPaAssetTypesSearchOrder.getElement('Available', 'Client Portfolio').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') < 0) {
          expect(false).customError('614508: ', 'The element "Client Portfolio" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Right" arrow icon', function() {
      ModifyAccountPaAssetTypesSearchOrder.getArrowButton('Right').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Client Portfolio" is present in "Selected Section"', function() {
      ModifyAccountPaAssetTypesSearchOrder.getElement('Selected', 'Client Portfolio').isPresent().then(function(found) {
        if (!found) {
          expect(found).customError('614508: ', '"Client Portfolio" is not present in Selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 614509', function() {

    it('Should select Databases tab in PA category from LHP', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Databases', 'PA').select();

      ThiefHelpers.getOptionspaneItem(undefined, 'Databases', 'PA').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('Databases" is not selected inside "PA"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "MSCI" element from "Fundamental - Available" section', function() {
      ModifyAccountPaDatabases.getElement('MSCI', 'Fundamental', 'Available').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "MSCI" is selected or not', function() {
      //Verifying if "MSCI" is selected or not
      ModifyAccountPaDatabases.getElement('MSCI', 'Fundamental', 'Available').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') < 0) {
          expect(false).customError('614509: ', 'The element "MSCI" is not selected from "Fundamental" "Available" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Right" arrow icon', function() {
      ModifyAccountPaDatabases.getArrowButton('Right', 'Fundamental').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "MSCI" is present in "Fundamental - Selected Section"', function() {
      ModifyAccountPaDatabases.getElement('MSCI', 'Fundamental', 'Selected').isPresent().then(function(found) {
        if (!found) {
          expect(found).customError('614509: ', '"MSCI" is not present in "Fundamental - Selected Section".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 614510', function() {

    it('Should select "Groupings" tab in PA category from LHP', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Groupings', 'PA').select();

      ThiefHelpers.getOptionspaneItem(undefined, 'Groupings', 'PA').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('Groupings" is not selected inside "PA"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Currency" element from "Available" section', function() {
      //Verifying if "FactSet" is expanded by default
      ModifyAccountNewPaGroupings.checkIfExpanded('FactSet');

      //Select "Currency" element from available section
      ModifyAccountNewPaGroupings.getElementFromAvailableSection('FactSet', 'Currency').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Currency" is selected or not', function() {
      //Verifying if "Client Portfolio" is selected or not
      ModifyAccountNewPaGroupings.getElementFromAvailableSection('FactSet', 'Currency').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') < 0) {
          expect(false).customError('614510: ', 'The element "Currency" is not selected from "Available" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Right" arrow icon', function() {
      ModifyAccountNewPaGroupings.getArrowButton('Right').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify if only two elements are present in the "Selected Section"', function() {
      ModifyAccountNewPaGroupings.getAllElements('Selected').count().then(function(count) {
        if (count !== 2) {
          expect(false).customError('614510: ', 'There more than two elements in the "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrValues = ['Market Cap', 'Currency'];
    var takeScreenShot = 0;
    arrValues.forEach(function(value) {
      it('Verifying if "' + value + '" is present in "Selected Section"', function() {
        ModifyAccountNewPaGroupings.getElementFromSelectedContainer(value).isPresent().then(function(found) {
          if (!found) {
            expect(found).customError('614510: ', '"' + value + '" is not present in "Selected Section".');
            takeScreenShot++;
          }

          if (takeScreenShot === 1) {
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 614511', function() {

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

    it('Verifying that "None" is displayed in Select Factor Grouping', function() {
      ThiefHelpers.selectOptionFromDropDown('FactSet: Model Groups', 'Select Factor Grouping');

      ThiefHelpers.verifySelectedDropDownText('FactSet: Model Groups', 'Select Factor Grouping');
    });

  });

  describe('Test Step ID: 614512', function() {

    it('Should click on "Save" button from "Modify Account(New) window"', function() {
      ModifyAccountNew.getButtonFromRHP('Save').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying if "Save" dialog box appeared.
      ThiefHelpers.verifyDialogTitle('Save Account');
    });

    it('Should select "Personal" directory from "Category" section', function() {
      //Verify if "Personal" present in "Category" section.
      ModifyAccountNew.getCategoryOption('Personal').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('614512: ', 'The element "Personal" is not present in "Category" section.');
          CommonFunctions.takeScreenShot();
        }
      });

      //Select "Personal" from "Category" section.
      ModifyAccountNew.getCategoryOption('Personal').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify if "Category" text field is set to "Personal"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, xpathTextBoxcategory).getText().then(function(value) {
        if (value !== 'PERSONAL:') {
          expect(false).customError('614512: ', '"Category" of the account does not change to "PERSONAL:".' +
            ' Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should update "Name" of the account to "ACCTS_DIALOG_DOC_REG"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, xpathTextBoxName).setText('ACCTS_DIALOG_DOC_REG');

      //Verify if "ACCTS_DIALOG_DOC_REG" is updated in "Name" filed or not.
      ThiefHelpers.getTextBoxClassReference(undefined, xpathTextBoxName).getText().then(function(value) {
        if (value !== 'ACCTS_DIALOG_DOC_REG') {
          expect(false).customError('614512: ', '"Name" of the account did not change to ' +
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
              expect(false).customError('614512: ', '"FactSet Research Systems" pop up with text ' +
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
          expect(!flag).customError('614512: ', '"Modify Account (New)" mode is still appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 614513', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Portfolio', 'Prices', 'document options');

    it('Verify if only two elements are present in the "Selected" container of "PRICES" section by default', function() {
      DocumentOptionsPricesPortfolio.getAllListElements('Prices', 'Selected').count().then(function(count) {
        if (count !== 2) {
          expect(false).customError('614513: ', 'There more than two elements in the "Selected" container of "PRICES" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrElements;
    arrElements = ['Russell - U.S.', 'Client Security Master'];
    var takeScreenShot = 0;
    arrElements.forEach(function(value) {
      it('Verifying that "' + value + '" is shown in the "Selected" container of "PRICES" section', function() {
        DocumentOptionsPricesPortfolio.getListItem(value, 'PRICES', 'Selected').isDisplayed().then(function(flag) {
          if (!flag) {
            expect(flag).customError('614513: ', ' "' + value + '" item did not present in "PRICES" "Selected" section.');
            takeScreenShot++;
          }

          if (takeScreenShot === 1) {
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 614514', function() {

    it('Should select "Analytics Sources" from "Fixed Income" in LHP ', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Analytics Sources', 'Fixed Income').select();

      //Verifying if "Portfolio" is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Analytics Sources', 'Fixed Income').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Analytics Sources" is not selected inside "Fixed Income"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrEle;
    arrEle = ['Client Portfolio', 'Bloomberg Barclays'];
    arrEle.forEach(function(value) {

      it('Verifying that "' + value + '" is shown in the "Selected" container of "Portfolio" section', function() {
        var xpathSelectedContainer = CommonFunctions.replaceStringInXpath(DocumentOptionsFixedIncomeAnalyticsSource.xpathPortfolioAvailableOrSelectedSection, 'Selected');
        ThiefHelpers.expandAndGetListBoxItem(xpathSelectedContainer, value).getText().then(function(text) {
          if (text !== value) {
            expect(false).customError('"' + value + '" is not shown in the "Selected" container of "PORTFOLIO\'S" section;Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {
          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + value + '" is not found in the "Selected" container of "PORTFOLIO\'S" section');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });
  });

  describe('Test Step ID: 614515', function() {

    it('Should select "Search Order" from "Asset Types" in the LHP of "Dcoument Options" page', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Search Order', 'Asset Types').select();

      //Verifying if "Search Order" is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Search Order', 'Asset Types').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('Search Order" is not selected inside "Asset Types"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that workspace view is changed to "Asset Types - Search Order"', function() {
      DocumentOptions.getOptionTitle().getText().then(function(val) {
        if (val !== 'Asset Types - Search Order') {
          expect(false).customError('614515: ', 'Workspace view is not changed to "Asset Types - Search Order"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if "Client Portfolio" is present in "Selected" section', function() {
      DocumentOptionsAssetTypeSearchOrder.getAssetTypeListItem('Client Portfolio', 'selected').isPresent().then(function(flag) {
        if (!flag) {
          expect(flag).customError('614515: ', '"Client Portfolio" does not present in "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 614516', function() {

    it('Should select Databases tab in PA category from LHP', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Databases').select();

      ThiefHelpers.getOptionspaneItem(undefined, 'Databases').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('Databases" is not selected ');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "FUNDAMENTAL" section\'s "Selected" container displays "MSCI"', function() {
      DocumentOptionsDatabases.getElement('MSCI', 'FUNDAMENTAL', 'Selected').isPresent().then(function(flag) {
        if (!flag) {
          expect(flag).customError('614516: ', '"MSCI" is not shown in the "Selected" container ' +
            'of "FUNDAMENTAL" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 614517', function() {

    // Click on "Ok" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Groupings');

    it('Verify if only two elements are present in the "Selected Section" by default', function() {
      TileOptionsGroupings.getAllElements('Selected').count().then(function(count) {
        if (count !== 2) {
          expect(false).customError('614517: ', 'There more than two elements in the "Selected Section"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var takeScreenShot = 0;
    var arrElements = ['Market Cap', 'Currency'];
    arrElements.forEach(function(value) {
      it('Verify if "' + value + '" is present in Selected section', function() {
        TileOptionsGroupings.getElementFromSelectedContainer(value).isPresent().then(function(flag) {
          if (!flag) {
            expect(flag).customError('614517: ', '"' + value + '" is not present in "Selected" section.');
            takeScreenShot++;
          }

          if (takeScreenShot === 1) {
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 614518', function() {

    it('Should click on the "Risk Models" tab from "Risk" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Risk Models', 'Risk').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Risk Models', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Risk Models" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Select Factor Grouping" drop down is set to "FactSet: Model Groups" by default', function() {
      ThiefHelpers.verifySelectedDropDownText('FactSet: Model Groups', 'Select Factor Grouping');
    });
  });

  describe('Test Step ID: 614522', function() {

    // Click on "Cancel" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options');
  });
});
