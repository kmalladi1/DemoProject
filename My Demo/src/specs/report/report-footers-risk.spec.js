'use strict';

require(__dirname + '/../../index.js');

var openFootNotesAndVerifyData = function(expectedDataAsArray) {
  var footNotesText = [];
  ThiefHelpers.getFootnotesClassReference().withFootnotes(function(footnotesRef1) {
    footnotesRef1.forEach(function(footnoteRef) {
      footnoteRef.getText().then(function(text) {
        footNotesText.push(text);
      });
    });
  }).then(function() {
    var count = 0;
    footNotesText.forEach(function(text, index) {
      if (text !== expectedDataAsArray[index]) {
        expect(false).customError('Footnotes text is not displayed as expected, Expected: ' + expectedDataAsArray[index] + ', Found: ' + text);
        count = count + 1;
      }
    });

    if (count > 0) {
      CommonFunctions.takeScreenShot();
    }
  });
};

describe('Test Case: report-footers-risk', function() {

  var reportDate;
  var latestDate;
  var dataArray = [];

  describe('Test Step ID: 556275', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should clear existing Portfolio', function() {
      PA3MainPage.removeAllPortfolioOrBenchmarkValues('Portfolio');
    });

    it('Should clear existing Benchmark', function() {
      PA3MainPage.removeAllPortfolioOrBenchmarkValues('Benchmark');
    });

    var arrValues = [{name: 'Portfolio', val: '', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'Benchmark', val: '', xpath: PA3MainPage.xpathBenchmarkWidget},];

    // Verifying if Portfolio/Benchmark widgets are blank
    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });

    it('Should verify if footnotes is not displayed in the report', function() {
      ThiefHelpers.getFootnotesClassReference().areHidden().then(function(hidden) {
        if (hidden) {
          expect(false).customError('Footnotes is displayed in the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 527170', function() {

    it('Should open "Client:/pa3/risk/RISK-FOOTERS" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('risk-footers');
    });

    it('Should verify if footnotes is displayed in the report', function() {
      ThiefHelpers.getFootnotesClassReference().areHidden().then(function(hidden) {
        if (!hidden) {
          expect(false).customError('Footnotes is not displayed in the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 556278', function() {

    // Select and verify if report is selected in lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Risk', 'Risk Factor Exposures', true, 'isSelected');

    it('Should verify if "Calculation Error" dialog box is appeared and click "OK" if appeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Calculation Error" dialog did not appeared');
          CommonFunctions.takeScreenShot();
        }else {
          ThiefHelpers.getDialogButton('Calculation Error', 'OK', 1).click().then(function() {
          }, function() {
            expect(false).customError('Unable to click on "OK" button in "Calculation Error" dialog');
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Should verify if "Calculation Error" dialog is closed', function() {
      ThiefHelpers.getDialogClassReference('Calculation Error', 1).isOpen().then(function(dialogStatus) {
        if (dialogStatus) {
          expect(false).customError('"Calculation Error" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Risk Factor Exposures" remains blank', function() {
      PA3MainPage.isReportCalculated('Risk Factor Exposures', true).then(function(displayed) {
        if (displayed) {
          expect(false).customError('"Risk Factor Exposures" report is calculated with data');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 527195', function() {

    // Select Risk Models tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Risk Factor Exposures', 'Risk Models', 'Risk');

    it('Should expand "APT" and perform double click on "APT Asia Pacific Local (USD)" from the available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathAvailableContainer).getGroupByText('APT');
      group.expand();

      // Verifying if "APT" is expanding
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('APT Asia Pacific Local (USD)').then(function(element) {
            element.select();

            element.doubleClick();
          });
        } else {
          expect(false).customError('"APT" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }

      });
    });

    it('Should verify if "APT Asia Pacific Local (USD)" is added to Selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('APT Asia Pacific Local (USD)') === -1) {
          expect(false).customError('"APT Asia Pacific Local (USD)" is not added to selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Blue" icon of "APT Asia Pacific Local (USD)" in selected section to get the Latest Date for future verification', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByText('APT Asia Pacific Local (USD)');

      item.getIcons().then(function(icons) {
        icons.clickIcon('info');
      });
    });

    it('Should fetch the "Latest Date" of "APT Asia Pacific Local (USD)" for future verification', function() {
      TileOptionsRiskRiskModels.getInfoBoxData('Latest Date').getText().then(function(value) {
        latestDate = value;
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Risk Factor Exposures');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Risk Factor Exposures');

    it('Should click on footnotes edit pencil', () => {
      element(by.xpath(Footnotes.xpathEditButton)).isPresent().then((bool) => {
        if (!bool) {
          ThiefHelpers.getFootnotesClassReference().edit();
        } else {
          ThiefHelpers.getButtonClassReference(undefined, Footnotes.xpathEditButton).press().then(() => {
          }, () => {

            expect(false).customError('Unable to click on "Edit" button.');
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Should verify if "Footnotes" dialog box appears', () => {
      ThiefHelpers.isDialogOpen('Footnotes').then((bool) => {
        if (!bool) {
          expect(false).customError('"Footnotes" dialog does not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrListItems = ['Holdings Date - Portfolio', 'Holdings Date - Benchmark', 'Risk Model Date', 'Market Portfolio'];

    it('Should verify if "' + arrListItems + '" are added to selected section', () => {
      arrListItems.forEach((element) => {
        ThiefHelpers.getListBoxItem(Footnotes.xpathSelectedSection, element).getText().then(function(text) {
          if (text !== element) {
            expect(false).customError('"' + element + '" is not shown in the "Selected" container;Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        }, (err) => {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + element + '" is not found in the "Selected" container');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 527203', function() {

    // Click on "OK" button in Footnotes dialog
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Cancel', 'Footnotes');

    // Click "Wrench" icon from app toolbar and select "Document Options" > "Risk" tab from the "Document options" view
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Risk Factor Exposures', 'Risk', undefined, 'Document Options');

    it('Should check the checkbox "Use benchmark as the market portfolio"', function() {
      ThiefHelpers.getCheckBoxClassReference('Use benchmark as the market portfolio').check();

      // Verifying if "Use benchmark as the market portfolio" check box is checked off
      ThiefHelpers.getCheckBoxClassReference('Use benchmark as the market portfolio').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Use benchmark as the market portfolio" checkbox is still un-checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Risk Factor Exposures');

    it('Should fetch report date and add data to dateArray variable for future verification ', function() {
      // Verifying if hyperlink is set as expected
      PA3MainPage.getDateHyperLink('Risk Factor Exposures').getText().then(function(value) {
        reportDate = value;
        dataArray = ['Portfolio Holdings As Of Date: TEST_RISK_MODEL 22-OCT-2010',
          'Benchmark Holdings As Of Date: Russell 1000 ' + reportDate,
          'Risk Model Date: APT Asia Pacific Local (USD)|' + latestDate.toUpperCase(),
        ];
      });
    });

    it('Should click on "Footnotes" and verifying if footnotes text is displayed with expected text mentioned in test step(data stored in dataArray variable)', function() {
      dataArray[3] = 'Risk Market Portfolio: Russell 1000';
      openFootNotesAndVerifyData(dataArray);
    });
  });

  describe('Test Step ID: 527206', function() {

    // Click "Wrench" icon from app toolbar and select "Document Options" > "Risk" tab from the "Document options" view
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Risk Factor Exposures', 'Risk', undefined, 'Document Options');

    it('Should un-check the checkbox "Use benchmark as the market portfolio"', function() {
      ThiefHelpers.getCheckBoxClassReference('Use benchmark as the market portfolio').uncheck();

      // Verifying if "Use benchmark as the market portfolio" check box is checked off
      ThiefHelpers.getCheckBoxClassReference('Use benchmark as the market portfolio').isChecked().then(function(checked) {
        if (checked) {
          expect(false).customError('"Use benchmark as the market portfolio" checkbox is checked off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on Identifier widget lookup button', function() {
      ThiefHelpers.getButtonCheckboxClassReference(undefined, DocumentOptionsRiskTab.xpathIdentifierLookUpButton).check();
    });

    it('Should verify "Identifier Lookup" dialog is displayed', function() {
      ThiefHelpers.isDialogOpen('Identifier Lookup').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Identifier Lookup" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "DJIT_SP50" document under "Client:;Pa3;Risk" of "Account Composite (ACTM)" type and click on "Add as composite" button and then click "OK" ', function() {
      CommonPageObjectsForPA3.OpenDirectoryAndSelectAccountFromIdentifierLookup('Client', 'Client:;Pa3;Risk;DJIT_SP50', 'Account Composite (ACTM)', 'OK', true);
    });

    it('Should verify if "Identifier" widget text box is set to "CLIENT:/PA3/RISK/DJIT_SP50.ACTM"', function() {
      // Verifying if the text box is set as expected.
      ThiefHelpers.getTextBoxClassReference(undefined, DocumentOptionsRiskTab.xpathIdentifierWidgetTextBox).getText().then(function(text) {
        if (text !== 'CLIENT:/PA3/RISK/DJIT_SP50.ACTM') {
          expect(false).customError('"Identifier" widget text box is not set to "CLIENT:/PA3/RISK/DJIT_SP50.ACTM"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Risk Factor Exposures');

    it('Should click on "Footnotes" and verifying if footnotes text is displayed with expected text mentioned in test step(data stored in dataArray variable)', function() {
      dataArray[3] = 'Risk Market Portfolio: DJIT_SP50';
      openFootNotesAndVerifyData(dataArray);
    });
  });

  describe('Test Step ID: 527209', function() {

    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Save As…');

    CommonPageObjectsForPA3.selectPersonalAndEnterDocumentNameInSaveAsDialog('risk_footers_demo', undefined, true);

    it('Should verify if "Personal:risk_footers_demo" document is opened.', function() {
      browser.getTitle().then(function(title) {
        if (title.indexOf('Personal:risk_footers_demo') === -1) {
          expect(false).customError('"Personal:risk_footers_demo" is not opened, Found:' + title);
          CommonFunctions.takeScreenShot();
        }
      });
    });

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

    // Select the required document from personal directory
    // Add .toUpperCase() if you want the document name to be in upper case to the function
    CommonPageObjectsForPA3.openRequiredDocumentFromPersonal('risk_footers_demo');

    // Select and verify if report is selected in lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Risk', 'Risk Factor Exposures', true, 'isSelected');

    it('Should click on "Footnotes" and verifying if footnotes text is displayed with expected text mentioned in test step(data stored in dataArray variable)', function() {
      openFootNotesAndVerifyData(dataArray);
    });
  });

  describe('Test Step ID: 724586', function() {

    it('Should open "Client:pa3;no_write_access" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('no-write-access');
    });

    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('New');

    it('Should verify if "Document has changed" pop up is appeared and click on "Save Changes" button', function() {
      PA3MainPage.getDialog('Document has changed').isPresent().then(function(found) {
        if (found) {
          PA3MainPage.getButton('Save Changes').click().then(function() {
            browser.wait(function() {
              return PA3MainPage.getDialog('Save error').isDisplayed().then(function(found) {
                return found;
              }, function() {
                return false;
              });
            }, 3000, '"Save error" pop up did not appeared even after waiting for 3 seconds');
          }, function(error) {

            CommonFunctions.takeScreenShot();
            expect(false).customError(error);
          });
        }
      });
    });

    it('Should verify if "Save error" pop up is appeared', function() {
      PA3MainPage.getDialog('Save error').isDisplayed().then(function(found) {
        if (!found) {
          expect(false).customError('"Save error" pop up did not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Save error" dialog box is appeared with "Unable to save new document: You do not have write access to "no_write_access"." message', function() {
      PA3MainPage.getDialogContent().getText().then(function(dialogContent) {
        if (dialogContent !== 'Unable to save new document: You do not have write access to "no_write_access".') {
          expect(false).customError('"Save error" popup is not appeared with expected text, Found:' + dialogContent);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 724587', function() {

    it('Should close "Save error" dialog', function() {
      element(by.xpath(PA3MainPage.xpathXIconFromDialog)).click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if "Save error" pop up is closed', function() {
      PA3MainPage.getDialog('Save error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Save error" dialog did not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
