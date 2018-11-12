'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: fdsweb-general-03', function() {

  describe('Test Step ID: 935059', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch PA3 application with "DEFAULT" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default');
    });

    it('Should enter "client:/pa3/test.acct" in "Portfolio" widget', function() {
      // Entering the value to Benchmark Widget
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathPortfolioWidget).setText('client:/pa3/test.acct');

      PA3MainPage.getWidgetBox('Portfolio').sendKeys(protractor.Key.ENTER);

      // Verifying that "client:/pa3/test.acct" is entered
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathPortfolioWidget).getText().then(function(val) {
        if (val !== 'CLIENT:/PA3/TEST.ACCT') {
          expect(false).customError('Portfolio widget is not populated with "CLIENT:/PA3/TEST.ACCT", Found: ' + val);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    CommonPageObjectsForPA3.verifyIfChartIsDisplayed('Weights Difference');

    it('Should click on Dates Hyperlink from "Weights" report', function() {
      PA3MainPage.getDateHyperLink('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "One Week Ago" from the End Date dropdown and verify the same', function() {
      ThiefHelpers.getTextBoxClassReference('End Date:').selectOptionByText('One Week Ago').then(function() { }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Adding wait time as per the Engineer comment in RPD:41035011
      browser.sleep(1000);

      // Verifying that "One Week Ago" is set in End Date input box
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(text) {
        if (text !== 'One Week Ago') {
          expect(false).customError('"One Week Ago" is not set in "End Date" input box, Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in the date dialog', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on folder icon from the application toolbar', function() {
      // Clicking on Folder Icon from application toolbar
      PA3MainPage.getFolderDropDown().click().then(function() {
      }, function(error) {
        CommonFunctions.takeScreenShot();
        expect(false).customError(error);
      });
    });

    // Select option from folder menu and verify if appropriate dialog opened
    CommonPageObjectsForPA3.selectOptionFromFolderAndVerifyDialogBoxOpened('Save As…', 'Save Document As');

    // Select personal directory and enter the document name in document field and click on "save" button.
    CommonPageObjectsForPA3.selectPersonalAndEnterDocumentNameInSaveAsDialog('FDSWeb Save', undefined, true);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    CommonPageObjectsForPA3.verifyIfChartIsDisplayed('Weights Difference');

    // Click on the Folder icon and click and select "New" from drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('New');

    it('Should verify if no dialog box is displayed on report', function() {
      var dialogBoxRef = ThiefHelpers.getDialogClassReference(undefined, undefined, '//tf-dialog');
      dialogBoxRef.isOpen().then(function(dialogStatus) {
        if (dialogStatus) {
          dialogBoxRef.getTitleText().then(function(title) {
            expect(false).customError(title + ' dialog is displayed');
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should click on Dates Hyperlink from "Weights" report', function() {
      PA3MainPage.getDateHyperLink('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if "End Date" is set to "Previous Close"', function() {
      // Verifying that "Previous Close" is set to input box
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(text) {
        if (text !== 'Previous Close') {
          expect(false).customError('"Previous Close" is not set in "End Date" input box, Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 935060', function() {

    // Click on the folder icon and select "Open..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Open...');

    // Select the required document from personal directory
    // Add .toUpperCase() if you want the document name to be in upper case to the function
    CommonPageObjectsForPA3.openRequiredDocumentFromPersonal('FDSWeb Save');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    CommonPageObjectsForPA3.verifyIfChartIsDisplayed('Weights Difference');

    it('Should click on Dates Hyperlink from "Weights" report', function() {
      PA3MainPage.getDateHyperLink('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if "End Date" is set to "One Week Ago"', function() {
      // Verifying that "One Week Ago" is set to input box
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(text) {
        if (text !== 'One Week Ago') {
          expect(false).customError('"One Week Ago" is not set in "End Date" input box, Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 935061', function() {

    // Click on "Economic Sector Hyperlink" and verify if Groupings is selected by default in tile options
    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');

    it('Should hover on "Economic Sector" and click on the "X" icon next to it', function() {
      var item = ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathSelectedContainer, 'Economic Sector - FactSet');
      item.getActions().then(function(actions) {
        actions.triggerAction('remove');
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if "Economic Sector" is not present in selected section', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'Economic Sector - FactSet').getText().then(function(name) {
        expect(false).customError('"Economic Sector - FactSet" is present in the selected section. Found: "' + name + '".');
        CommonFunctions.takeScreenShot();
      }, function(err) {
        expect(true).toBeTruthy();
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should expand "Advertising/Marketing Services" in the report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Advertising/Marketing Services');

      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Advertising/Marketing Services');
    });

    it('Should click on first tab from the top and verify if the tab is opened', function() {
      CommonPageObjectsForPA3.clickOnFirstTabOfWebFrameAndVerifyTitle();
    });

    it('Should click on "Portfolio Analysis" tab and verify if tab is opened', function() {
      browser.waitForAngular().then(function() {
        browser.navigate().back();

        // Check if pa3 is opened
        browser.getTitle().then(function(title) {
          console.log(title);
          if (title.indexOf('Portfolio Analysis') === -1) {
            expect(false).customError('"Portfolio Analysis" tab is not open');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should verify if the loading icon does not appear', function() {
      PA3MainPage.getReportCalculationDlg('Weights').isPresent().then(function(flag) {
        if (flag) {
          expect(false).customError('"Weights" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Advertising/Marketing Services" is still expanded in the report', function() {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Advertising/Marketing Services');
    });

    it('Should verify if "Weights" report is grouped by "Industry"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(refVal) {
        if (refVal.indexOf('Industry') === -1) {
          expect(false).customError('"Weights" report is not grouped by "Industry", Found:' + refVal);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 935062', function() {

    // Click on the folder icon and select "Save" from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Save');

    it('Should verify if "Document has changed" pop up is appeared and click on "Save Changes" button', function() {
      PA3MainPage.getDialog('Document has changed').isPresent().then(function(found) {
        if (found) {
          PA3MainPage.getButton('Save Changes').click().then(function() {
          }, function(error) {

            CommonFunctions.takeScreenShot();
            expect(false).customError(error);
          });
        }else {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Document has changed" dialog is not displayed');
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should open new tab with "PA_DOCUMENTS:DEFAULT" document', function() {
      var url = 'https://pa.apps.factset.com/#/doc/PA_DOCUMENTS:DEFAULT/report/report0';
      return browser.executeScript('return window.open(arguments[0], \'_blank\')', url);
    });

    it('Should verify if "Portfolio window" is displayed', function() {
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

    // // Select the required document from personal directory
    // // Add .toUpperCase() if you want the document name to be in upper case to the function
    CommonPageObjectsForPA3.openRequiredDocumentFromPersonal('FDSWeb Save');

    it('Should verify if no dialog box is displayed on report', function() {
      var dialogBoxRef = ThiefHelpers.getDialogClassReference(undefined, undefined, '//tf-dialog');
      dialogBoxRef.isOpen().then(function(dialogStatus) {
        if (dialogStatus) {
          dialogBoxRef.getTitleText().then(function(title) {
            expect(false).customError(title + ' dialog is displayed');
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Should click on Dates Hyperlink from "Weights" report', function() {
      PA3MainPage.getDateHyperLink('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if "End Date" is set to "One Week Ago"', function() {
      // Verifying that "One Week Ago" is set to input box
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(text) {
        if (text !== 'One Week Ago') {
          expect(false).customError('"One Week Ago" is not set in "End Date" input box, Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Weights" report is grouped by "Industry"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(refVal) {
        if (refVal.indexOf('Industry') === -1) {
          expect(false).customError('"Weights" report is not grouped by "Industry", Found:' + refVal);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 935063', function() {

    it('Should click on dates hyperlink from "Weights Difference" report', function() {
      PA3MainPage.getDateHyperLink('Weights Difference').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should enter "2/15/2018" in the "End Date" field', function() {
      ThiefHelpers.getTextBoxClassReference('End Date:').setText('2/15/2018');

      // Verifying "2/15/2018"  is entered in End Date text box
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(value) {
        if (value !== '2/15/2018') {
          expect(false).customError('End Date text box did not contain "2/15/2018". Found:"' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });

      // Added delay to process the request
      browser.sleep(1000);
    });

    it('Should click on "OK" button in the date dialog', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should open new tab with "PA_DOCUMENTS:DEFAULT" document', function() {
      var url = 'https://pa.apps.factset.com/#/doc/PA_DOCUMENTS:DEFAULT/report/report0';
      return browser.executeScript('return window.open(arguments[0], \'_blank\')', url);
    });

    it('Should verify if "Portfolio window" is displayed', function() {
      browser.getAllWindowHandles().then(function(handles) {
        browser.driver.switchTo().window(handles[2]).then(function() {
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

    // // Select the required document from personal directory
    // // Add .toUpperCase() if you want the document name to be in upper case to the function
    CommonPageObjectsForPA3.openRequiredDocumentFromPersonal('FDSWeb Save');

    it('Should verify if "FDSWeb Save" document auto recovery popup', function() {
      ThiefHelpers.isDialogOpen('PERSONAL:FDSWEB SAVE').then(function(flag) {
        if (!flag) {
          expect(false).customError('"PERSONAL:FDSWEB SAVE" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Continue Editing" button in the pop up', function() {
      PA3MainPage.editOrDiscardReportChanges('Continue Editing');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    CommonPageObjectsForPA3.verifyIfChartIsDisplayed('Weights Difference');

    it('Should click on Dates Hyperlink from "Weights Difference" report', function() {
      PA3MainPage.getDateHyperLink('Weights Difference').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if "End Date" is set to "15-Feb-2018"', function() {
      // Verifying that "15-Feb-2018" is set to input box
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(text) {
        if (text !== '15-Feb-2018') {
          expect(false).customError('"15-Feb-2018" is not set in "End Date" input box, Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 935064', function() {

    // Click on the folder icon and select "Save" from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Save');

    it('Should verify if "Document has changed" pop up is appeared and click on "Save Changes" button', function() {
      PA3MainPage.getDialog('Document has changed').isPresent().then(function(found) {
        if (found) {
          PA3MainPage.getButton('Save Changes').click().then(function() {
          }, function(error) {

            CommonFunctions.takeScreenShot();
            expect(false).customError(error);
          });
        }else {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Document has changed" dialog is not displayed');
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should open new tab with "PA_DOCUMENTS:DEFAULT" document', function() {
      var url = 'https://pa.apps.factset.com/#/doc/PA_DOCUMENTS:DEFAULT/report/report0';
      return browser.executeScript('return window.open(arguments[0], \'_blank\')', url);
    });

    it('Should verify if "Portfolio window" is displayed', function() {
      browser.getAllWindowHandles().then(function(handles) {
        browser.driver.switchTo().window(handles[3]).then(function() {
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

    // // Click on the folder icon and select "Open..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Open...');

    // // Select the required document from personal directory
    // // Add .toUpperCase() if you want the document name to be in upper case to the function
    CommonPageObjectsForPA3.openRequiredDocumentFromPersonal('FDSWeb Save');

    it('Should verify if no dialog box is displayed on report', function() {
      var dialogBoxRef = ThiefHelpers.getDialogClassReference(undefined, undefined, '//tf-dialog');
      dialogBoxRef.isOpen().then(function(dialogStatus) {
        if (dialogStatus) {
          dialogBoxRef.getTitleText().then(function(title) {
            expect(false).customError(title + ' dialog is displayed');
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });
  });

  describe('Test Step ID: 935733', function() {

    // Click on the Folder icon and click and select "New" from drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('New');

    // Click on the Folder icon and click and select "Delete..." from drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Delete…');

    // Select the required document and click on delete button
    // Add .toUpperCase() if you want the document name to be in upper case to the
    CommonPageObjectsForPA3.deleteRequiredDocumentFromPersonalDirectory('FDSWeb Save');
  });
});
