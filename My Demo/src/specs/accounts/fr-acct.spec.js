'use strict';

// Requiring PA3 page object files
require(__dirname + '/../../index.js');

describe('Test Case: fr-acct', function() {

  describe('Test Step ID: Startup Instructions', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 682555', function() {

    it('Should open "https://portfoliolistmanager.staging-cauth.factset.com/#/account/general/basics?type=acct&path=' +
      'CLIENT:~2FPA3~2FFULL_REFRESH&name=PLM_TEST.ACCT" URL', function() {
      PA3MainPage.openPLMModifyAccount('CLIENT:~2FPA3~2FFULL_REFRESH', 'PLM_TEST');
    });

    it('Verifying if view changed to "Modify Account (New)"', function() {
      UtilitiesPLM.verifyTitle('Modify Account');
    });

    it('Should click on "Save" button in app tool bar', function() {
      ThiefHelpers.getButtonClassReference('Save').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Save" button in app tool bar');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Save Account" dialog is displayed', function() {
      ThiefHelpers.getDialogClassReference('Save Account', undefined).isOpen().then(function(dialogStatus) {
        if (!dialogStatus) {
          expect(false).customError('"Save Account" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "PLM_TEST_3" in "Name" textbox of "Save Account" dialog box', function() {
      ThiefHelpers.getTextBoxClassReference('', CommonFunctions.replaceStringInXpath(
        PLMSaveAccountAs.xpathTextboxFromSaveDialog, 'Name')).setText('PLM_TEST_3');
    });

    it('Verifying if "PLM_TEST_3" is entered in "Name" textbox of "Save Account" dialog box', function() {
      ThiefHelpers.getTextBoxClassReference('', CommonFunctions.replaceStringInXpath(
        PLMSaveAccountAs.xpathTextboxFromSaveDialog, 'Name')).getText().then(function(value) {
        if (value !== 'PLM_TEST_3') {
          expect(false).customError('"PLM_TEST_3" is not entered in "Name" textbox of "Save Account" dialog box' +
            ' instead "' + value + '" found');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "PLM_TEST_3" in "Description" textbox of "Save Account" dialog box', function() {
      ThiefHelpers.getTextBoxClassReference('', CommonFunctions.replaceStringInXpath(
        PLMSaveAccountAs.xpathTextboxFromSaveDialog, 'Description')).setText('PLM_TEST_3');
    });

    it('Verifying if "PLM_TEST_3" is entered in "Description" textbox of "Save Account" dialog box', function() {
      ThiefHelpers.getTextBoxClassReference('', CommonFunctions.replaceStringInXpath(
        PLMSaveAccountAs.xpathTextboxFromSaveDialog, 'Description')).getText().then(function(value) {
        if (value !== 'PLM_TEST_3') {
          expect(false).customError('"PLM_TEST_3" is not entered in "Description" textbox of "Save Account" dialog ' +
            'box instead "' + value + '" found');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Personal" from Category section in "Save Account" dialog box', function() {
      PLMSaveAccountAs.getElement('Personal').click().then(function() {
      }, function() {

        expect(false).customError('Unable to select "Personal" from Category section in "Save Account" dialog box');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Personal" is selected from Category section in "Save Account" dialog box', function() {
      PLMSaveAccountAs.getElement('Personal').element(by.xpath('.//ancestor::tf-listbox-item[normalize-space(.)="PERSONAL"]'))
        .getAttribute('class').then(function(itemStatus) {
        if (itemStatus.indexOf('selected') < 0) {
          expect(false).customError('"Personal" is not selected from Category section in "Save Account" dialog box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save" button in "Save Account" dialog box', function() {
      ThiefHelpers.getButtonClassReference('', PLMSaveAccountAs.getButtonFromSaveAccountAsPopup('Save')).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Save" button in "Save Account" dialog box');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Save Account" dialog is closed', function() {
      ThiefHelpers.getDialogClassReference('Save Account', undefined).isOpen().then(function(dialogStatus) {
        if (dialogStatus) {
          expect(false).customError('"Save Account" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "FactSet Research Systems" dialog is displayed stating ""PERSONAL:PLM_TEST_3" already exists. ' +
      ' Would you like to overwrite it?". If dialog appears click on "OK"', function() {
      PLMSaveAccountAs.getFactsetPopup().isPresent().then(function(dialogStatus) {
        if (dialogStatus) {
          PLMSaveAccountAs.getFactsetPopup().getText().then(function(text) {
            if (text.indexOf('"PERSONAL:PLM_TEST_3" already exists. Would you like to overwrite it?') > -1) {
              PLMSaveAccountAs.getButtonFromFactsetPopUp('OK').click().then(function() {
                PLMSaveAccountAs.getFactsetPopup().isPresent().then(function(dialogStatus) {
                  if (dialogStatus) {
                    expect().customError('"FactSet Research Systems" dialog is not closed after clicking on "OK" button');
                    CommonFunctions.takeScreenShot();
                  }
                });
              }, function() {

                expect(false).customError('Unable to click on "OK" button in "FactSet Research Systems" dialog box');
                CommonFunctions.takeScreenShot();
              });
            } else {
              expect(false).customError('"FactSet Research Systems" dialog displayed stating "' + text + '"');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });
    });

    it('Should open "https://portfoliolistmanager.staging-cauth.factset.com/#/account/general/basics?type=acct&path=' +
      'PERSONAL&name=PLM_TEST_3.ACCT" url', function() {
      PA3MainPage.openPLMModifyAccount('PERSONAL', 'PLM_TEST_3');
    });

    it('Verifying if "PLM_TEST_3.ACCT" account is saved in personal directory', function() {
      PLMSaveAccountAs.getFactsetPopup().isPresent().then(function(dialogStatus) {
        if (dialogStatus) {
          PLMSaveAccountAs.getFactsetPopup().getText().then(function(text) {
            if (text.indexOf('Failed to load PLM_TEST_3.ACCT') > -1) {
              expect(false).customError('"PLM_TEST_3.ACCT" account is not saved in personal directory');
              CommonFunctions.takeScreenShot();
            } else {
              expect(false).customError('"FactSet Research Systems" dialog displayed stating "' + text + '"');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });
    });

  });

  describe('Test Step ID: 682548', function() {

    it('Should launch the PA3 application', function() {
      PA3MainPage.goToURL('');
    });

    it('Should open html dialog and open the "Client:/Pa3/Full_refresh/Full Refresh- ACCT in PLM" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('full-refresh-acct-in-plm');
    });

    it('Should wait for "Weights" report to calculate', function() {
      // Waiting for "Weights" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Weights'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          expect(false).customError('"Calculation Error" found while report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Weights" report loaded without any error', function() {

      // Verifying if "Weights" report is calculated
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"Weights" report is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          PA3MainPage.isReportCalculated('Weights').then(function() {
          }, function(error) {

            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if report calculates for "PLM_TEST vs S&P 500"', function() {
      PA3MainPage.getHeader().getText().then(function(text) {
        if (text !== 'PLM_TEST vs S&P 500') {
          expect(false).customError('report is not calculated for "PLM_TEST vs S&P 500 instead "' + text + '" found');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that report is grouped by "Country of Domicile"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(groupRef) {
        if (groupRef !== 'Country of Domicile') {
          expect(false).customError('The report is not grouped by "Country of Domicile"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should un-check "Automatic Calculation" option', function() {
      PA3MainPage.setAutomaticCalculation(false).then(function(option) {
        if (!option) {
          expect(false).customError('"Automatic Calculation" is still checked/selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "PLM_TE" into "Portfolio" widget box and select "Personal:PLM_TEST_3.ACCT" from type ahead', function() {
      PA3MainPage.setPortfolio('PLM_TE', 'Personal:PLM_TEST_3.ACCT', 'Personal:PLM_TEST_3.ACCT').then(function(status) {
        if (!status) {
          expect(false).customError('Unable to select "Personal:PLM_TEST_3.ACCT" from type ahead');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Refresh" icon from the application toolbar', function() {
      PA3MainPage.getRefreshIcon().click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Refresh" icon in the application tool bar');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Weights" report to calculate', function() {
      // Waiting for "Weights" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Weights'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          expect(false).customError('"Calculation Error" found while report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Weights" report loaded without any error', function() {

      // Verifying if "Weights" report is calculated
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"Weights" report is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          PA3MainPage.isReportCalculated('Weights').then(function() {
          }, function(error) {

            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if report calculates for "PLM_TEST_3 vs S&P 500"', function() {
      PA3MainPage.getHeader().getText().then(function(text) {
        if (text !== 'PLM_TEST_3 vs S&P 500') {
          expect(false).customError('"Report is not calculated for "PLM_TEST_3 vs S&P 500", Found: "' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 682549', function() {

    it('Should open "https://portfoliolistmanager.staging-cauth.factset.com/#/account/general/basics?type=acct&path=PERSONAL&name=PLM_TEST_3.ACCT"' +
      ' URL', function() {
      PA3MainPage.openPLMModifyAccount('PERSONAL', 'PLM_TEST_3');
    });

    it('Verifying if view changed to "Modify Account (New)"', function() {
      UtilitiesPLM.verifyTitle('Modify Account');
    });

    it('Should expand "General" category in LHP', function() {
      PLMAccount.isCategoryExpanded('General').then(function(categoryStatus) {
        if (!categoryStatus) {
          PLMAccount.getLHPOptionCategoryExpander('General').click().then(function() {
          }, function() {

            expect(false).customError('Unable to expand "General" category in LHP');
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Should select "Holdings" in LHP under "General" category', function() {
      PLMAccount.selectAndVerifyOptionFromLHP('General', 'Holdings', true);
    });

    it('Verifying if view changed to "Holdings"', function() {
      PLMAccount.getModifyAccountTitle().getText().then(function(title) {
        if (title !== 'Holdings') {
          expect(false).customError('View is not changed to "Holdings"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Benchmark" lookup button ', function() {
      var xpath = CommonFunctions.replaceStringInXpath(GeneralBasicsHoldings.xpathLookupIcon, 'Benchmark');
      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Verify if "' + document['dialog-name'].editBenchmark + '" dialog box opened', function() {
      ThiefHelpers.isDialogOpen(document['dialog-name'].editBenchmark, undefined, undefined).then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"' + document['dialog-name'].editBenchmark + '" dialog does not appears');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click on "SPN:SP50" cell', function() {
      EditBenchmark.getCellReference('SPN:SP50', 'Benchmark', '0').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    it('Should select radio button below "No Benchmark"', function() {
      EditBenchmark.getRadioButton().click();
    });

    it('Verifying if radio button below "No Benchmark" is selected', function() {
      UtilitiesPLM.isElementSelected(EditBenchmark.getRadioButton()).then(function(boolean) {
        if (!boolean) {
          expect(false).customError('Radio button below "No Benchmark" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should clear and enter "SPN:OEX" in the textbox next to radio button', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, EditBenchmark.xpathPanelTextbox).setText('SPN:OEX');

      // Verifying if textbox contains "RGT:RGR90651"
      ThiefHelpers.getTextBoxClassReference(undefined, EditBenchmark.xpathPanelTextbox).getText().then(function(attr) {
        if (attr !== 'SPN:OEX') {
          expect(false).customError('The textbox is not set to "SPN:OEX"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Ok" button in panel', function() {
      EditBenchmark.getButtonFromPanel('Ok').click();
    });

    it('Verifying if "Benchmark" cell contains "SPN:OEX" ', function() {
      EditBenchmark.getCellValue('SPN:OEX', 'Benchmark', '0').then(function(rowData) {
        if (rowData !== 'SPN:OEX') {
          expect(false).customError('"Benchmark" does not contains "SPN:OEX"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button on "' + document['dialog-name'].editBenchmark + '" dialog', function() {
      ThiefHelpers.getDialogButton(document['dialog-name'].editBenchmark, 'OK', undefined, undefined).click();
    });

    it('Verifying if "Benchmark" field contains "SPN:OEX"', function() {
      var xpath = CommonFunctions.replaceStringInXpath(GeneralBasicsHoldings.xpathTextbox, 'Benchmark');

      ThiefHelpers.getTextBoxClassReference('Benchmark', xpath).getText().then(function(attr) {
        if (attr !== 'SPN:OEX') {
          expect(false).customError('The "Benchmark" field does not contains to "SPN:OEX"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 682552', function() {

    it('Should expand "PA" category in LHP', function() {
      PLMAccount.isCategoryExpanded('PA').then(function(categoryStatus) {
        if (!categoryStatus) {
          PLMAccount.getLHPOptionCategoryExpander('PA').click().then(function() {
          }, function() {

            expect(false).customError('Unable to expand "PA" category in LHP');
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Should expand "Prices" category under "PA" category in LHP', function() {
      PLMAccount.isCategoryExpanded('Prices').then(function(categoryStatus) {
        if (!categoryStatus) {
          PLMAccount.getLHPOptionCategoryExpander('Prices').click().then(function() {
          }, function() {

            expect(false).customError('Unable to expand "Prices" category under "PA" category in LHP');
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Should select "Portfolio" in LHP under "PA > Prices" category in LHP', function() {
      PLMAccount.selectAndVerifyOptionFromLHP('PA|Prices', 'Portfolio', true);
    });

    it('Should click on "X" icon above "Prices" Selected section', function() {
      ThiefHelpers.getButtonClassReference(undefined, PAPricesPortfolio.getClearSelectedItemsButton('Prices')).press();
    });

    it('Verifying if there are no items in the "Prices" Selected section', function() {
      PAPricesPortfolio.getAllListElements('Prices', 'Selected').count().then(function(count) {
        if (count !== 0) {
          expect(false).customError('Expected: No elements should be there in "Prices" Selected section but,' +
            ' found: "' + count + '" items in the "Prices" selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Equity|FTSE" group in "Prices" Available section and select "FTSE Global"', function() {
      ThiefHelpers.expandAndGetListBoxItem(PAPricesPortfolio.xpathPricesAvailableContainer, 'FTSE Global', 'Equity|FTSE').select();
    });

    it('Verifying if "FTSE Global" is selected under "Equity > FTSE" in "Prices" Available section', function() {
      ThiefHelpers.getListBoxItem(PAPricesPortfolio.xpathPricesAvailableContainer, 'FTSE Global', 'Equity|FTSE').isSelected().then(function(status) {
        if (!status) {
          expect(false).customError('"FTSE Global" is not selected under "Equity > FTSE" in "Prices" Available section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Right" arrow button to move "FTSE Global" to "Prices" selected section', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying if "FTSE Global" is moved to "Prices" selected section', function() {
      ThiefHelpers.getListBoxItem(PAPricesPortfolio.xpathPricesSelectedContainer, 'FTSE Global')
        .getText().then(function(text) {
        if (text !== 'FTSE Global') {
          expect(false).customError('"FTSE Global" is not shown in the "Selected" container of "PRICES" ' +
            'section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"FTSE Global" is not found in the "Selected" container of "PRICES" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "PA" category in LHP', function() {
      PLMAccount.isCategoryExpanded('PA').then(function(categoryStatus) {
        if (!categoryStatus) {
          PLMAccount.getLHPOptionCategoryExpander('PA').click().then(function() {
          }, function() {

            expect(false).customError('Unable to expand "PA" category in LHP');
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Should select "Databases" in LHP under "PA" category', function() {
      PLMAccount.selectAndVerifyOptionFromLHP('PA', 'Databases', true);
    });

    it('Should select "FactSet" from "Fundamental" Available section', function() {
      PADatabases.getElement('FactSet', 'Fundamental', 'Available').isPresent().then(function(itemStatus) {
        if (itemStatus) {
          PADatabases.getElement('FactSet', 'Fundamental', 'Available').click().then(function() {
          }, function() {

            expect(false).customError('Unable to select "FactSet" from "Fundamental" Available section');
            CommonFunctions.takeScreenShot();
          });
        } else {
          expect(false).customError('"FactSet" is not available in "Fundamental" Available section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Right" arrow button to move "FactSet" to "Fundamental" selected section', function() {
      PADatabases.getArrowButton('Right', 'Fundamental').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Right" arrow button to move "FactSet" to "Fundamental" selected section');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "FactSet" is moved to "Fundamental" selected section', function() {
      PADatabases.getAllListElements('Fundamental', 'Selected').count().then(function(count) {
        if (count > 0) {
          PADatabases.getElement('FactSet', 'Fundamental', 'Selected').isPresent().then(function(status) {
            if (!status) {
              expect(false).customError('"FactSet" is not available in "Fundamental" selected section');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"FactSet" is not available in "Fundamental" selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Compustat Industrials" from "Fundamental" Available section', function() {
      PADatabases.getElement('Compustat Industrials', 'Fundamental', 'Available').isPresent().then(function(itemStatus) {
        if (itemStatus) {
          PADatabases.getElement('Compustat Industrials', 'Fundamental', 'Available').click().then(function() {
          }, function() {

            expect(false).customError('Unable to select "Compustat Industrials" from "Fundamental" Available section');
            CommonFunctions.takeScreenShot();
          });
        } else {
          expect(false).customError('"Compustat Industrials" is not available in "Fundamental" Available section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Right" arrow button to move "Compustat Industrials" to "Fundamental" selected section', function() {
      PADatabases.getArrowButton('Right', 'Fundamental').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Right" arrow button to move "Compustat Industrials" to "Fundamental" selected section');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Compustat Industrials" is moved to "Fundamental" selected section', function() {
      PADatabases.getAllListElements('Fundamental', 'Selected').count().then(function(count) {
        if (count > 0) {
          PADatabases.getElement('Compustat Industrials', 'Fundamental', 'Selected').isPresent().then(function(status) {
            if (!status) {
              expect(false).customError('"Compustat Industrials" is not available in "Fundamental" selected section');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Compustat Industrials" is not available in "Fundamental" selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "FactSet" from "Estimates" Available section', function() {
      PADatabases.getElement('FactSet', 'Estimates', 'Available').isPresent().then(function(itemStatus) {
        if (itemStatus) {
          PADatabases.getElement('FactSet', 'Estimates', 'Available').click().then(function() {
          }, function() {

            expect(false).customError('Unable to select "FactSet" from "Estimates" Available section');
            CommonFunctions.takeScreenShot();
          });
        } else {
          expect(false).customError('"FactSet" is not available in "Estimates" Available section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Right" arrow button to move "FactSet" to "Estimates" selected section', function() {
      PADatabases.getArrowButton('Right', 'Estimates').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Right" arrow button to move "FactSet" to "Estimates" selected section');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "FactSet" is moved to "Estimates" selected section ', function() {
      PADatabases.getAllListElements('Estimates', 'Selected').count().then(function(count) {
        if (count > 0) {
          PADatabases.getElement('FactSet', 'Estimates', 'Selected').isPresent().then(function(status) {
            if (!status) {
              expect(false).customError('"FactSet" is not available in "Estimates" selected section');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"FactSet" is not available in "Estimates" selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "First Call" from "Estimates" Available section', function() {
      PADatabases.getElement('First Call', 'Estimates', 'Available').isPresent().then(function(itemStatus) {
        if (itemStatus) {
          PADatabases.getElement('First Call', 'Estimates', 'Available').click().then(function() {
          }, function() {

            expect(false).customError('Unable to select "First Call" from "Estimates" Available section');
            CommonFunctions.takeScreenShot();
          });
        } else {
          expect(false).customError('"First Call" is not available in "Estimates" Available section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Right" arrow button to move "First Call" to "Estimates" selected section', function() {
      PADatabases.getArrowButton('Right', 'Estimates').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Right" arrow button to move "First Call" to "Estimates" selected section');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "First Call" is moved to "Estimates" selected section ', function() {
      PADatabases.getAllListElements('Estimates', 'Selected').count().then(function(count) {
        if (count > 0) {
          PADatabases.getElement('First Call', 'Estimates', 'Selected').isPresent().then(function(status) {
            if (!status) {
              expect(false).customError('"First Call" is not available in "Estimates" selected section');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"First Call" is not available in "Estimates" selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save" button in app tool bar', function() {
      ThiefHelpers.getButtonClassReference('Save').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Save" button in app tool bar');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Save Account" dialog is displayed', function() {
      ThiefHelpers.getDialogClassReference('Save Account', undefined).isOpen().then(function(dialogStatus) {
        if (!dialogStatus) {
          expect(false).customError('"Save Account" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Personal" from Category in "Save Account" dialog box', function() {
      PLMSaveAccountAs.getElement('Personal').click().then(function() {
      }, function() {

        expect(false).customError('Unable to select "Personal" from Category section in "Save Account" dialog box');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Personal" is selected from Category section in "Save Account" dialog box', function() {
      PLMSaveAccountAs.getElement('Personal').element(by.xpath('.//ancestor::tf-listbox-item[normalize-space(.)="PERSONAL"]')).getAttribute('class').then(function(itemStatus) {
        if (itemStatus.indexOf('selected') < 0) {
          expect(false).customError('"Personal" is not selected from Category section in "Save Account" dialog box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save" button in "Save Account" dialog box', function() {
      ThiefHelpers.getButtonClassReference('', PLMSaveAccountAs.getButtonFromSaveAccountAsPopup('Save')).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Save" button in "Save Account" dialog box');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Save Account" dialog is closed', function() {
      ThiefHelpers.getDialogClassReference('Save Account', undefined).isOpen().then(function(dialogStatus) {
        if (dialogStatus) {
          expect(false).customError('"Save Account" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "FactSet Research Systems" dialog is displayed stating ""PERSONAL:PLM_TEST_3" already exists. ' +
      ' Would you like to overwrite it?". If dialog appears click on "OK"', function() {
      PLMSaveAccountAs.getFactsetPopup().isPresent().then(function(dialogStatus) {
        if (dialogStatus) {
          PLMSaveAccountAs.getFactsetPopup().getText().then(function(text) {
            if (text.indexOf('"PERSONAL:PLM_TEST_3" already exists. Would you like to overwrite it?') > -1) {
              PLMSaveAccountAs.getButtonFromFactsetPopUp('OK').click().then(function() {
                PLMSaveAccountAs.getFactsetPopup().isPresent().then(function(dialogStatus) {
                  if (dialogStatus) {
                    expect().customError('"FactSet Research Systems" dialog is not closed after clicking on "OK" button');
                    CommonFunctions.takeScreenShot();
                  }
                });
              }, function() {

                expect(false).customError('Unable to click on "OK" button in "FactSet Research Systems" dialog box');
                CommonFunctions.takeScreenShot();
              });
            } else {
              expect(false).customError('"FactSet Research Systems" dialog displayed stating "' + text + '"');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });
    });

  });

  describe('Test Step ID: 682550', function() {

    it('Should launch the PA3 application', function() {
      PA3MainPage.goToURL('');
    });

    it('Should open html dialog and open the "Client:/Pa3/Full_refresh/Full Refresh- ACCT in PLM" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('full-refresh-acct-in-plm');
    });

    it('Should wait for "Weights" report to calculate', function() {
      // Waiting for "Weights" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Weights'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          expect(false).customError('"Calculation Error" found while report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Weights" report loaded without any error', function() {

      // Verifying if "Weights" report is calculated
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"Weights" report is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          PA3MainPage.isReportCalculated('Weights').then(function() {
          }, function(error) {

            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if report calculates for "PLM_TEST vs S&P 500"', function() {
      PA3MainPage.getHeader().getText().then(function(text) {
        if (text !== 'PLM_TEST vs S&P 500') {
          expect(false).customError('"Portfolio" widget not displayed with "PLM_TEST vs S&P 500" instead "' + text + '" found');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that report is grouped by "Country of Domicile"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(groupRef) {
        if (groupRef !== 'Country of Domicile') {
          expect(false).customError('The report is not grouped by "Country of Domicile"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should un-check "Automatic Calculation" option', function() {
      PA3MainPage.setAutomaticCalculation(false).then(function(option) {
        if (!option) {
          expect(false).customError('"Automatic Calculation" is still checked/selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "PLM_TE" into "Portfolio" widget box and select "Personal:PLM_TEST_3.ACCT" from type ahead', function() {
      PA3MainPage.setPortfolio('PLM_TE', 'Personal:PLM_TEST_3.ACCT', 'Personal:PLM_TEST_3.ACCT').then(function(status) {
        if (!status) {
          expect(false).customError('Unable to select "Personal:PLM_TEST_3.ACCT" from type ahead');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Refresh" icon from the application toolbar', function() {
      PA3MainPage.getRefreshIcon().click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Refresh" icon in the application tool bar');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Weights" report to calculate', function() {
      // Waiting for "Weights" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Weights'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          expect(false).customError('"Calculation Error" found while report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Verifying if "Weights" report loaded without any error', function() {

      // Verifying if "Weights" report is calculated
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"Weights" report is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          PA3MainPage.isReportCalculated('Weights').then(function() {
          }, function(error) {

            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if report calculates for "PLM_TEST_3 vs S&P 100"', function() {
      PA3MainPage.getHeader().getText().then(function(text) {
        if (text !== 'PLM_TEST_3 vs S&P 100') {
          expect(false).customError('"Report is not calculated for "PLM_TEST_3 vs S&P 100" instead "' + text + '" found');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 682553', function() {

    var itemsInPricesSelectedSection = [];
    var itemsInFundamentalSelectedSection = [];
    var itemsInEstimatesSelectedSection = [];
    var itemsInFundamentalSelectedSectionTemp = ['Compustat Industrials', 'FactSet'];
    var itemsInEstimatesSelectedSectionTemp = ['FactSet', 'First Call'];

    it('Should click on the "Wrench" icon in the application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {

        // Verifying if drop down menu appeared
        PA3MainPage.getWrenchIcon(true).isPresent().then(function(found) {
          if (!found) {
            expect(false).customError('Wrench drop down menu is not displayed after clicking on the Wrench Icon');
            CommonFunctions.takeScreenShot();
          }
        });
      }, function() {

        expect(false).customError('Unable to click on "Wrench" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Document Options" option from wrench menu list', function() {
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click().then(function() {
      }, function() {

        expect(false).customError('Unable to select "Document Options" option from wrench menu list');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Document Options" mode', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(status) {
        if (!status) {
          expect(false).customError('View is not changed to "Document Options" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Portfolio" tab under "Prices" in LHP', function() {
      DocumentOptions.getLHPOptionItemFromCategory('Portfolio', 'Prices').then(function(LHPOtionRef) {
        LHPOtionRef.click().then(function() {
        }, function() {

          expect(false).customError('Unable to select "Portfolio" tab under "Prices" in LHP');
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Verifying if view changed to "Prices - Portfolio"', function() {
      DocumentOptions.getOptionTitle().getText().then(function(title) {
        if (title !== 'Prices - Portfolio') {
          expect(false).customError('View is not changed to "Prices - Portfolio" instead "' + title + '" found');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should fetch all items from the ""Prices > Portfolio" selected section"', function() {
      DocumentOptionsPricesPortfolio.getAllListElements('Prices', 'Selected').count().then(function(count) {
        if (count !== 0) {
          DocumentOptionsPricesPortfolio.getAllListElements('Prices', 'Selected').then(function(arrayOfElements) {
            arrayOfElements.forEach(function(elementRef) {
              elementRef.getText().then(function(text) {
                itemsInPricesSelectedSection.push(text);
              });
            });
          });
        } else {
          expect(false).customError('No elements available in the "Prices > Portfolio" selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "FTSE Global" is available in "Prices > Portfolio" selected section', function() {
      var count = 0;
      itemsInPricesSelectedSection.forEach(function(item) {
        if (item === 'FTSE Global') {
          count = count + 1;
        }
      });

      if (count !== 1) {
        expect(false).customError('"FTSE Global" is not available in "Prices > Portfolio" selected section');
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should select "Databases" tab under "Fixed Income" in LHP', function() {
      DocumentOptions.getLHPOption('Databases').click().then(function() {
      }, function() {

        expect(false).customError('Unable to select "Databases" tab under "Fixed Income" in LHP');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Databases"', function() {
      DocumentOptions.getOptionTitle().getText().then(function(title) {
        if (title !== 'Databases') {
          expect(false).customError('View is not changed to "Databases" instead "' + title + '" found');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should fetch all items from "Database > Fundamental" selected section', function() {
      DocumentOptionsDatabases.getAllListElements('Fundamental', 'Selected').count().then(function(count) {
        if (count !== 0) {
          DocumentOptionsDatabases.getAllListElements('Fundamental', 'Selected').then(function(itemsRefArray) {
            itemsRefArray.forEach(function(item) {
              item.getText().then(function(text) {
                itemsInFundamentalSelectedSection.push(text);
              });
            });
          });
        } else {
          expect(false).customError('No elements are available in "Database > Fundamental" selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    itemsInFundamentalSelectedSectionTemp.forEach(function(item) {
      it('Verifying if "' + item + '" is available in "Database > Fundamental" selected section', function() {
        var count = 0;
        itemsInFundamentalSelectedSection.forEach(function(element) {
          if (item === element) {
            count = count + 1;
          }
        });

        if (count !== 1) {
          expect(false).customError('"' + item + '" is not available in "Database > Fundamental" selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should fetch all items from "Database > Estimates" selected section', function() {
      DocumentOptionsDatabases.getAllListElements('Estimates', 'Selected').count().then(function(count) {
        if (count !== 0) {
          DocumentOptionsDatabases.getAllListElements('Estimates', 'Selected').then(function(itemsRefArray) {
            itemsRefArray.forEach(function(item) {
              item.getText().then(function(text) {
                itemsInEstimatesSelectedSection.push(text);
              });
            });
          });
        } else {
          expect(false).customError('No elements are available in "Database > Estimates" selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    itemsInEstimatesSelectedSectionTemp.forEach(function(item) {
      it('Verifying if "' + item + '" is available in "Database > Estimates" selected section', function() {
        var count = 0;
        itemsInEstimatesSelectedSection.forEach(function(element) {
          if (item === element) {
            count = count + 1;
          }
        });

        if (count !== 1) {
          expect(false).customError('"' + item + '" is not available in "Database > Estimates" selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Document Options" dialog is closed', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(status) {
        if (status) {
          expect(false).customError('"Document Options" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
