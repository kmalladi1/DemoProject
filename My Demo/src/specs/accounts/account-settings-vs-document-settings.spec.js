'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: account-settings-vs-document-settings', function() {

  describe('Test Step ID: 409430', function() {

    // Should open default document and un-check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:default_doc_OLD" document and verify that the document is opened', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

  });

  describe('Test Step ID: 353212', function() {

    it('Should click on button portfolio lookup icon', function() {
      element(by.xpath(PA3MainPage.xpathPortfolioLookupIcon)).click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying "Identifier Lookup" dialog is displayed', function() {
      ThiefHelpers.isDialogOpen('Identifier Lookup').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Identifier Lookup" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Test" document under "Client:;Pa3" with type "Account(ACCT)" and click on "Add as composite" button and then click "OK" ', function() {
      CommonPageObjectsForPA3.OpenDirectoryAndSelectAccountFromIdentifierLookup('Client', 'Client:;Pa3;TEST', 'Account (ACCT)', 'OK', true);
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var arrValues = [{name: 'Portfolio', val: 'CLIENT:/PA3/TEST.ACCT', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'Benchmark', val: 'RUSSELL:1000', xpath: PA3MainPage.xpathBenchmarkWidget},];

    // Verifying values in portfolio/benchmark values
    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });
  });

  describe('Test Step ID: 353213', function() {

    // Click on the wrench icon of application toolbar and select "Document Options"
    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSelectOption('Document Options');

    it('Verifying if "Document Options" page is opened', function() {
      ThiefHelpers.isModeBannerDisplayed('Document Options').then(function(found) {
        if (!found) {
          expect(false).customError('View is not changed to "Document Options".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Client Provided" from "Prices > Available" section and select "Client Security Master" ' + 'to highlight', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'Client Security Master', 'Client Provided').select();

      // Verifying if the Item 'Client Security Master' is selected.
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'Client Security Master', 'Client Provided', 'Client Provided').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Client Security Master" is not selected in "Available" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Clicking the right arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection(DocumentOptionsPricesPortfolio.getArrowButton('prices'));
    });

    it('Verifying if "Client Security Master" is added to "Selected" container', function() {
      ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, 'Client Security Master').getText().then(function(text) {
        if (text !== 'Client Security Master') {
          expect(false).customError('"Client Security Master" is not shown in the "Selected" container of "PRICES" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"Client Security Master" is not found in the "Selected" container of "PRICES" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 353214', function() {

    it('Should click on the "Databases" tab from LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Databases').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Databases').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Databases" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "MSCI" from the "Available" section', function() {
      // Select to highlight "MSCI"
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsDatabases.xpathFundamentalAvailableContainer, 'MSCI').select();

      // Verifying if the Item 'MSCI' is selected.
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsDatabases.xpathFundamentalAvailableContainer, 'MSCI').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"MSCI" is not selected in "Available section"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Right" arrow button', function() {
      ThiefHelpers.getButtonClassReference(undefined, DocumentOptionsDatabases.getTransferBoxArrowButton('Fundamental', 'Right')).press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on right arrow button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if "MSCI" is listed in the "Selected" container ', function() {
      ThiefHelpers.getListBoxItem(DocumentOptionsDatabases.xpathFundamentalSelectedContainer, 'MSCI').getText().then(function(text) {
        expect(text !== 'MSCI').toBe(false, '"MSCI" is not shown in the "Selected" container;Found: ' + text);
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"MSCI" is not found in the "Selected" container');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 353221', function() {

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Click on the folder icon and select "Save As..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Save As…');

    // Select personal directory and enter the document name
    // Add .toUpperCase() if you want the document name to be in upper case to the function
    CommonPageObjectsForPA3.selectPersonalAndEnterDocumentNameInSaveAsDialog('PRSL_ACCT', undefined, true);

    it('Should verify if "Personal:PRSL_ACCT" document is opened.', function() {
      browser.getTitle().then(function(title) {
        if (title.indexOf('Personal:PRSL_ACCT') === -1) {
          expect(false).customError('"Personal:PRSL_ACCT" is not opened, Found:' + title);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 353222', function() {

    it('Should open new tab with "PA_DOCUMENTS:DEFAULT" document', function() {
      var url = 'https://pa.apps.factset.com/#/doc/PA_DOCUMENTS:DEFAULT/report/report0';
      return browser.executeScript('return window.open(arguments[0], \'_blank\')', url);
    });

    it('Verifying if "Portfolio window" is displayed', function() {
      browser.getAllWindowHandles().then(function(handles) {
        browser.driver.switchTo().window(handles[1]).then(function() {
          browser.driver.wait(function() {
            return browser.driver.getTitle().then(function(title) {
              return title.indexOf('Portfolio Analysis 3.0') > -1;
            });
          }, 30000, '"PA3" application page is not loaded within 30 seconds.').then(function() {
          }, function(error) {

            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
        });
      });
    });

    // Click on the folder icon and select "Open..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Open...');

    // Select the "PRSL_ACCT" document from personal directory
    CommonPageObjectsForPA3.openRequiredDocumentFromPersonal('PRSL_ACCT');

    it('Should verify if "Personal:PRSL_ACCT" document is opened.', function() {
      browser.getTitle().then(function(title) {
        if (title.indexOf('Personal:PRSL_ACCT') === -1) {
          expect(false).customError('"Personal:PRSL_ACCT" is not opened, Found:' + title);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 353224', function() {

    // Click on the wrench icon of application toolbar and select "Document Options"
    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSelectOption('Document Options');

    it('Verifying if "Document Options" page is opened', function() {
      ThiefHelpers.isModeBannerDisplayed('Document Options').then(function(found) {
        if (!found) {
          expect(false).customError('View is not changed to "Document Options".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var array = ['FactSet - Equity', 'Client Portfolio', 'Client Security Master'];

    array.forEach(function(value) {

      it('Verifying if "' + value + '" is displayed in selected section of prices', function() {
        ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, value).getText().then(function(text) {
          if (text !== value) {
            expect(false).customError('"' + value + '" is not shown in the "Selected" container of "PRICES" section;Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + value + '." is not found in the "Selected" container of "PRICES" section');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });

      });

    });
  });

  describe('Test Step ID: 353226', function() {

    it('Should click on the "Databases" tab from LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Databases').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Databases').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Databases" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Fundamental" section "Selected" container to contain "FactSet" and "MSCI"', function() {
      var listReference = DocumentOptionsDatabases.getAllListElements('Fundamental', 'selected');
      var arr = ['FactSet', 'MSCI'];
      listReference.count().then(function(count) {
        expect(count).toBe(2, 'Count of elements in selected container is expected to be 2 but found:' + count);
        var i = 0;
        arr.forEach(function(value) {
          listReference.get(i).getText().then(function(text) {
            if (text !== value) {
              expect(false).customError('Expected "' + value + '" in "Fundamental" section "Selected" container but found "' + text + '"');
              CommonFunctions.takeScreenShot();
            }
          });
          i++;
        });
      });
    });
  });

  describe('Test Step ID: 459982', function() {

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');
  });
});
