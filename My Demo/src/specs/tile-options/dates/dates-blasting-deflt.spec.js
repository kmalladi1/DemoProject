'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: dates-blasting-deflt', function() {

  var expectedItems = ['One Quarter Ago',
    'One Week Ago',
    'One Month Ago',];

  describe('Test Step ID: 550529', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

  });

  describe('Test Step ID: 550525', function() {

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Contribution', true, 'isSelected');

    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Contribution', 'Options');

    it('Should type "10/31/2014" in Start Date field', function() {
      TileOptionsDates.getDateField('Start Date').sendKeys(protractor.Key.HOME, protractor.Key.SHIFT, protractor.Key.END,
        protractor.Key.NULL, protractor.Key.DELETE, '10/31/2014');
    });

    it('Should type "12/15/2014" in End Date field', function() {
      TileOptionsDates.getDateField('End Date').sendKeys(protractor.Key.HOME, protractor.Key.SHIFT, protractor.Key.END,
        protractor.Key.NULL, protractor.Key.DELETE, '12/15/2014');
    });

    it('Should click on "Apply To Contribution" button from top right corner of web page', function() {
      TileOptionsDates.getApplyToButton().click();

      // Verifying if popup window if appeared after clicking 'Contribution' hyperlink
      expect(element(by.xpath(TileOptionsDates.xpathBlastingWindow)).isPresent()).toBeTruthy();
    });

    it('Should select "Attribution" checkbox from option', function() {
      TileOptionsDates.getCheckBoxFromBlastWindow('Attribution').click();

      // Verifying if "Attribution" checkbox is selected
      expect(TileOptionsDates.getCheckBoxFromBlastWindow('Attribution').getAttribute('data-checked'))
        .not.toBeUndefined();
    });

    it('Should click on "OK" button from blasting panel', function() {
      TileOptionsDates.getOkOrCancelButtonFromBlastedWindow('OK').click();
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

    it('Verifying that "Contribution" report displays "10/31/2014 to 12/15/2014" as date range', function() {
      expect(PA3MainPage.getDateHyperLink('Contribution').getText()).toEqual('10/31/2014 - 12/15/2014');
    });

  });

  describe('Test Step ID: 550526', function() {

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Attribution', true, 'isSelected');

    it('Verifying if "Attribution" report is displayed for "10/31/2014 to 12/15/2014" date range', function() {
      expect(PA3MainPage.getDateHyperLink('Attribution').getText()).toEqual('10/31/2014 - 12/15/2014');
    });

  });

  describe('Test Step ID: 550527', function() {

    it('Should type "Client:/pa3/test" in portfolio widget and select "CLIENT:/PA3/TEST.ACCT" from the type ahead', function() {
      // Entering portfolio into 'Portfolio' widget.
      expect(PA3MainPage.setPortfolio('Client:/pa3/test', 'Client:/pa3/TEST.ACCT', 'CLIENT:/PA3/TEST.ACCT')).toBeTruthy();
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Attribution`);

    it('Verifying if "Attribution" report is displayed for "10/31/2014 to 12/15/2014" date range', function() {
      expect(PA3MainPage.getDateHyperLink('Attribution').getText()).toEqual('10/31/2014 - 12/15/2014');
    });

  });

  describe('Test Step ID: 550528', function() {

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Contribution', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Verifying if "Contribution" report is displayed for "10/31/2014 to 12/15/2014" date range', function() {
      expect(PA3MainPage.getDateHyperLink('Contribution').getText()).toEqual('10/31/2014 - 12/15/2014');
    });

    it('Verifying that report is grouped by "Economic Sector"', function() {
      expect(PA3MainPage.getGroupingsHyperLink('Contribution').getText()).toEqual('Economic Sector');
    });

  });

  describe('Test Step ID: 719738', function() {

    it('Should open "Client:;Pa3;Dates;Multi Horizon - blasting" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('multi-horizon-blasting');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Should click on "As of: Date" date hyperlink in "Contribution to Return" report', function() {
      var xpathInfobox = PA3MainPage.getDateHyperLink('Contribution to Return');
      ThiefHelpers.getInfoboxLinkClassReference(xpathInfobox).press().then(function() {
      }, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });
    });

    it('Verifying if infobox drop down is opened', function() {
      element(by.xpath('//tf-infobox[contains(@open,"opened")]')).isPresent().then(function(opened) {
        if (!opened) {
          expect(false).customError('Infobox dropdown is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "All Date Options" hyper link from dates pop-up', function() {
      PA3MainPage.getOptionsHyperlink('All Date Options').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "All Date Options" hyper link');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile Options" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Tile Options" page not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Dates" from the LHP if not selected', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Dates').isSelected().then(function(selected) {
        if (!selected) {
          ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Dates').select();
        }
      });
    });

    it('Should select "One Quarter Ago" from the Start Date dropdown and verify the same', function() {
      ThiefHelpers.getTextBoxClassReference('Start Date:').selectOptionByText('One Quarter Ago').then(function() {
        browser.sleep(2000);
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "One Quarter Ago" is set in Start Date input box
      ThiefHelpers.getTextBoxClassReference('Start Date:').getText().then(function(text) {
        if (text !== 'One Quarter Ago') {
          expect(false).customError('"One Quarter Ago" is not set in "Start Date" input box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Add" button', function() {
      TileOptionsDates.getMultiHorizonAddBtn().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if is added to list or not
      TileOptionsDates.getMultiHorizonListItem('One Quarter Ago').isPresent().then(function(value) {
        if (!value) {
          TileOptionsDates.getMultiHorizonAddBtn().click().then(function() {
          }, function(err) {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Should click "End Date" drop down and select "End of Last Month" from menu', function() {
      ThiefHelpers.getTextBoxClassReference('End Date:').selectOptionByText('End of Last Month').then(function() {
      }, function(error) {
        expect(false).customError('Not able to select "End of Last Month", Error: ' + error);
        CommonFunctions.takeScreenShot();
      });

      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(text) {
        if (text !== 'End of Last Month') {
          expect(false).customError('"End of Last Month" is not set in "End Date" input box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Apply To Contribution to Return" hyperlink', function() {
      ThiefHelpers.getButtonClassReference('Apply To Contribution to Return').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Apply To Contribution to Return" hyperlink');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Blasting" widget is opened', function() {
      ThiefHelpers.isPresent(undefined, undefined, TileOptionsDates.xpathBlastingWindow).then(function(blastWindow) {
        if (!blastWindow) {
          expect(false).customError('"Blasting" widget is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check "Contribution to Return 2" from the blasting menu', function() {
      ThiefHelpers.getChecklistClassRef().getItemByText('Contribution to Return 2').isChecked().then(function(checked) {
        if (!checked) {
          ThiefHelpers.getChecklistClassRef().getItemByText('Contribution to Return 2').toggle();
        }
      });
    });

    it('Verifying if "Contribution to Return 2" check box is checked', function() {
      ThiefHelpers.getChecklistClassRef().getItemByText('Contribution to Return 2').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Contribution to Return 2" check box is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in "Blasting Menu"', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsDates.getOkOrCancelButtonFromBlastedWindow('OK')).press().then(function() {
      }, function(err) {
        expect(false).customError('Unable to click on "OK" button in "Blasting Menu";' + err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Blasting" menu is closed', function() {
      ThiefHelpers.isPresent(undefined, undefined, TileOptionsDates.xpathBlastingWindow).then(function(blastWindow) {
        if (blastWindow) {
          expect(false).customError('"Blasting" menu is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "' + expectedItems + '" are displayed in the "Start Date:" section', function() {
      TileOptionsDates.getItemsFromStartDateSection().then(function(elementsArr) {
        if (elementsArr.length !== 3) {
          expect(false).customError('Count of elements displayed in "Start Date:" section are expected to be 3, Found: ' + elementsArr.length);
          CommonFunctions.takeScreenShot();
        } else {
          elementsArr.forEach(function(itemRef) {
            itemRef.getText().then(function(text) {
              if (expectedItems.indexOf(text) === -1) {
                expect(false).customError(text + ' not expected to display in "Start Date:" section');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        }
      });
    });

    it('Verifying if "End Date" is displayed with "End of Last Month" option', function() {
      // Verifying "End of Last Month"  is entered in End Date text box
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(value) {
        if (value !== 'End of Last Month') {
          expect(false).customError('End Date text box did not contain "End of Last Month". Found:"' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 719739', function() {

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

    it('Waiting for reports to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);
    });

    it('Should select "Contribution Detail 2" from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Performance', 'Contribution Detail 2').then(function(multiHorizonRef) {
        multiHorizonRef.click().then(function() {
        }, function() {
          expect(false).customError('Unable to select "Contribution Detail 2" report from LHP');
          CommonFunctions.takeScreenShot();
        });
      });

    });

    it('Should click on "As of: Date" date hyperlink in "Contribution to Return" report', function() {
      var xpathInfobox = PA3MainPage.getDateHyperLink('Contribution to Return 2');
      ThiefHelpers.getInfoboxLinkClassReference(xpathInfobox).press().then(function() {
      }, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });
    });

    it('Verifying if infobox drop down is opened', function() {
      element(by.xpath('//tf-infobox[contains(@open,"opened")]')).isPresent().then(function(opened) {
        if (!opened) {
          expect(false).customError('Infobox dropdown is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "All Date Options" hyper link from dates pop-up', function() {
      PA3MainPage.getOptionsHyperlink('All Date Options').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "All Date Options" hyper link');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile Options" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Tile Options" page not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Tile Option - Contribution to Return 2" is opened with "Dates" tab selected in lhp', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Dates').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Dates" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "' + expectedItems + '" are displayed in the "Start Date:" section', function() {
      TileOptionsDates.getItemsFromStartDateSection().then(function(elementsArr) {
        if (elementsArr.length !== 3) {
          expect(false).customError('Count of elements displayed in "Start Date:" section are expected to be 3, Found: ' + elementsArr.length);
          CommonFunctions.takeScreenShot();
        } else {
          elementsArr.forEach(function(itemRef) {
            itemRef.getText().then(function(text) {
              if (expectedItems.indexOf(text) === -1) {
                expect(false).customError(text + ' not expected to display in "Start Date:" section');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        }
      });
    });

    it('Verifying if "End Date" is displayed with "End of Last Month" option', function() {
      // Verifying "End of Last Month"  is entered in End Date text box
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(value) {
        if (value !== 'End of Last Month') {
          expect(false).customError('End Date text box did not contain "End of Last Month". Found:"' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
